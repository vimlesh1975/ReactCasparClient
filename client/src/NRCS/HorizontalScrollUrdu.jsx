import React, { useEffect, useRef, useState } from 'react';
import logo from './doordarshan-logo.png'

// var data = [
//   '1   दिल्ली में',
//   '2   मुख्यमंत्री योगी आदित्यनाथ',
//   '3   चलने नहीं देंगे रामायण',
//   '4   मंत्रिमंडल विस्तार ',
//   '5   Shaurya Chakra:',
//   '6   पाक को खदेड़ने ',
// ];
var gap = 100;

const HorizontalScrollUrdu = () => {

  const [activeItems, setActiveItems] = useState([]);
  const dataRef = useRef([]);
  const [widths, setWidths] = useState([]);

  const speedRef = useRef(6);
  // const dataRef = useRef(data); // Use a ref to store the data
  const itemRefs = useRef({}); // Create ref to store item references
  const itemRefs2 = useRef({}); // Create ref to store item references

  const startScroll = (newData) => {
    dataRef.current = newData;
    setActiveItems([
      { id: 0, text: newData[0], position: (-gap - itemRefs2.current[0]?.offsetWidth) || -4000 },
    ]);
  };

  window.setSpeed = (newSpeed) => {
    speedRef.current = newSpeed; // Update the speedRef value
  };

  window.startScroll = startScroll;

  window.setData1 = (newData) => {
    dataRef.current = newData;
    setActiveItems([
      { id: 0, text: newData[0], position: (-gap - itemRefs2.current[0]?.offsetWidth) || -4000 },
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
    setTimeout(() => {
      setWidths(dataRef.current.map((_, i) => itemRefs2.current[i]?.offsetWidth || 100));
    }, 2500);
  }, []);

  useEffect(() => {
    const scroll = () => {
      if (widths.length === 0) return;
      setActiveItems((prevItems) => {
        const updatedItems = prevItems.map((item, i) => ({
          ...item,
          position: item.position + speedRef.current
        }));

        const visibleItems = updatedItems.filter(
          (item) => 1920 > item.position
        );

        if (visibleItems.length) {
          const lastItem = visibleItems[visibleItems.length - 1];
          if (lastItem.position > 0) {
            const nextIndex = (lastItem.id + 1) % dataRef.current.length;
            visibleItems.push({
              id: nextIndex,
              text: dataRef.current[nextIndex],
              position: -widths[nextIndex] - gap,
            });
          }
        }
        return visibleItems;
      });

      requestAnimationFrame(scroll);
    };

    const animationFrame = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrame);
  }, [widths]);



  return (<div>
    <div style={{ position: 'absolute', visibility: 'hidden' }}>
      {dataRef.current.map((item, i) => <div
        key={i}
        ref={(el) => (itemRefs2.current[i] = el)}
        style={{
          position: 'absolute',
          // left: 500,
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
            {/* {item.text} */}
            {item.text} <img src={logo} alt='dd logo' width={50} />
          </div>
        ))}
    </div>
  </div>);
};

export default HorizontalScrollUrdu;