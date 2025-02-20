import React, { useEffect, useRef, useState } from 'react';
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
  const [dataRef, setDataRef] = useState(data);

  // Refs to store the speed value and the data
  const speedRef = useRef(0);
  // const dataRef = useRef(data); // Use a ref to store the data
  const itemRefs = useRef({}); // Create ref to store item references
  const itemRefs2 = useRef({}); // Create ref to store item references

  // Function to start the scroll with new data
  const startScroll = (newData) => {
    // Update the dataRef with the new data
    // dataRef.current = newData;
    setDataRef(newData);

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
    setDataRef(newData);
    setActiveItems([
      { id: 0, text: newData[0], position: window.innerWidth },
    ]);
  };

  useEffect(() => {
    function handleMessage(event) {
      if (event.data?.action === "callFunction") {
        startScroll(event.data.data);
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  useEffect(() => {
    const aa = dataRef.map((val, i) => itemRefs2.current[i].offsetWidth);
    console.log(aa)

    const scroll = () => {
      setActiveItems((prevItems) => {
        const updatedItems = prevItems.map((item) => ({
          ...item,
          position: -aa[item.id] + speedRef.current, // Use the speed from the ref
        }));

        // Remove items that are completely out of view
        const visibleItems = updatedItems.filter(
          (item) => 1920 > item.position > 0
        );

        // Add new item if the last item is fully visible
        if (
          visibleItems.length &&
          1920 > visibleItems[visibleItems.length - 1].position > 0

        ) {
          const nextIndex = visibleItems[visibleItems.length - 1].id + 1;
          if (nextIndex < dataRef.length) {
            visibleItems.push({
              id: nextIndex,
              text: dataRef[nextIndex],
              position: -aa[nextIndex] - gap,
            });
          } else {
            visibleItems.push({
              id: 0,
              text: dataRef[0],
              position: -aa[0] - gap,
            });
          }
        }

        return visibleItems;
      });

      requestAnimationFrame(scroll);
    };

    const animationFrame = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrame);
  }, [dataRef]); // Only set this effect once



  return (<div>
    <div>
      {dataRef.map((item, i) => <div
        key={i}
        ref={(el) => (itemRefs2.current[i] = el)}
        style={{
          position: 'absolute',
          left: 0,
          top: window.innerHeight - 500,
          fontSize: 50,
          fontWeight: 'bolder',
          whiteSpace: 'nowrap',
          zIndex: 2,
          color: 'white',
        }}
      >{item}
      </div>)}

    </div>
    <div style={{ backgroundColor: 'blue', minHeight: 80, width: window.innerWidth, position: 'absolute', top: window.innerHeight - 80, }}>
    </div>

    <div>
      {activeItems.length > 0 &&
        activeItems.map((item, i) => (
          <div
            key={`${item.id}-${i}`} // Use both id and position to ensure uniqueness
            ref={(el) => (itemRefs.current[item.id] = el)}
            style={{
              position: 'absolute',
              left: item.position,
              top: window.innerHeight - 80,
              fontSize: 50,
              fontWeight: 'bolder',
              whiteSpace: 'nowrap',
              zIndex: 2,
              color: 'white',
            }}
          >
            {/* {item.text}  */}
            {item.text} <img src={logo} alt='dd logo' width={50} />
          </div>
        ))}
    </div>
  </div>);
};

export default HorizontalScroll;