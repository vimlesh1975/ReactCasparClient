import React, { useEffect, useRef, useState, useCallback } from 'react';
import { addressmysql } from '../common'
import logo from './doordarshan-logo.png'

var data = [
  '1   दिल्ली में',
  '2   मुख्यमंत्री योगी आदित्यनाथ',
  '3   चलने नहीं देंगे रामायण',
  '4   मंत्रिमंडल विस्तार ',
  '5   Shaurya Chakra:',
  '6   पाक को खदेड़ने ',
];
var gap = 50;

const HorizontalScroll = () => {

  // State for active items
  const [activeItems, setActiveItems] = useState([]);

  // Refs to store the speed value and the data
  const speedRef = useRef(0);
  const dataRef = useRef(data); // Use a ref to store the data
  const itemRefs = useRef({}); // Create ref to store item references

  // Function to start the scroll with new data
  const startScroll = (newData) => {
    // Update the dataRef with the new data
    dataRef.current = newData;

    // Reset active items to reflect only the new data
    setActiveItems([
      { id: 0, text: newData[0], position: window.innerWidth },
    ]);

    speedRef.current = 6; // Reset the speed
  };

  window.setSpeed = (newSpeed) => {
    speedRef.current = newSpeed; // Update the speedRef value
  };

  window.startScroll = startScroll;

  window.setData1 = (newData) => {
    // Update dataRef and reset active items when new data is passed
    dataRef.current = newData;
    setActiveItems([
      { id: 0, text: newData[0], position: window.innerWidth },
    ]);
  };

  const fetchRO = useCallback(async () => {
    try {
      const res = await fetch(
        addressmysql() + `/show_runorderScroll`
      );
      const data = await res.json();
      const aa = [];
      data.forEach((val) => {
        if (val && val.Script) {
          const splitText = (val.Script)?.split("$$$$");
          splitText.forEach((item) => {
            aa.push(`${item.replaceAll("'", "")}`);
          });
        }
      });

      startScroll(aa);

    } catch (error) {
      // console.error('Error fetching data:', error);
    }
  }, []);

  useEffect(() => {
    fetchRO();
  }, [fetchRO]);

  useEffect(() => {
    const scroll = () => {
      setActiveItems((prevItems) => {
        const updatedItems = prevItems.map((item) => ({
          ...item,
          position: item.position - speedRef.current, // Use the speed from the ref
        }));

        // Remove items that are completely out of view
        const visibleItems = updatedItems.filter(
          (item) => item.position + (itemRefs.current[item.id]?.offsetWidth || 0) > 0
        );

        // Add new item if the last item is fully visible
        if (
          visibleItems.length &&
          visibleItems[visibleItems.length - 1].position <=
          window.innerWidth - (itemRefs.current[visibleItems[visibleItems.length - 1].id]?.offsetWidth || 0)
        ) {
          const nextIndex = visibleItems[visibleItems.length - 1].id + 1;
          if (nextIndex < dataRef.current.length) {
            visibleItems.push({
              id: nextIndex,
              text: dataRef.current[nextIndex],
              position: window.innerWidth + gap,
            });
          } else {
            visibleItems.push({
              id: 0,
              text: dataRef.current[0],
              position: window.innerWidth + gap,
            });
          }
        }

        return visibleItems;
      });

      requestAnimationFrame(scroll);
    };

    const animationFrame = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrame);
  }, []); // Only set this effect once

  return (<div>
    <div style={{ backgroundColor: 'blue', minHeight: 80, width: window.innerWidth, position: 'absolute', top: window.innerHeight - 80, }}>
    </div>

    <div>
      {activeItems.length > 0 &&
        activeItems.map((item) => (
          <div
            key={`${item.id}-${item.position}`} // Use both id and position to ensure uniqueness
            ref={(el) => (itemRefs.current[item.id] = el)}
            style={{
              position: 'absolute',
              left: item.position,
              top: window.innerHeight - 80,
              fontSize: 50,
              fontWeight:'bolder',
              whiteSpace: 'nowrap',
              zIndex: 2,
              color: 'white',
            }}
          >
            {item.text} <img src={logo} alt='dd logo' width={50}/>
          </div>
        ))}

      <div style={{ display: (window.screen.colorDepth === 0) ? 'none' : 'block' }}>
        <button onClick={() => speedRef.current += 1}>Increase Speed</button>
        <button onClick={() => speedRef.current -= 1}>Decrease Speed</button>
        <button onClick={() => startScroll(['New Data 1', 'New Data 2', 'New Data 3'])}>
          Set New Data and Start Scroll
        </button>
        <div>Current Speed: {speedRef.current} activeItems={activeItems.length}</div>
      </div>
    </div>
  </div>);
};

export default HorizontalScroll;
