import React, { useEffect, useRef, useState } from 'react';
import logo from './doordarshan-logo.png'
import { useParams } from 'react-router-dom';


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
  const { data } = useParams();
  // try {
  //   lines2 = JSON.parse(decodeURIComponent(data)); // Decode & Parse JSON
  // } catch (error) {
  //   console.error("Error parsing URL data:", error);
  // }

  const [activeItems, setActiveItems] = useState([]);
  const [data1, setData1] = useState(JSON.parse(decodeURIComponent(data)));
  const [widths, setWidths] = useState([]);

  const speedRef = useRef(6);
  const itemRefs = useRef({});
  const itemRefs2 = useRef({});
  const animationRef = useRef(null);

  window.setSpeed = (newSpeed) => {
    speedRef.current = newSpeed; // Update the speedRef value
  };

  
  window.setData1=(newData)=>{
    setData1(newData);
  }

  useEffect(() => {
    function handleMessage(event) {
      if (event.data?.action === "callFunction") {
        setData1(event.data.data);
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);


  useEffect(() => {
    requestAnimationFrame(() => {
      setActiveItems([
        { id: 0, text: data1[0], position: (-gap - itemRefs2.current[0].offsetWidth) },
      ]);
      setWidths(data1.map((_, i) => itemRefs2.current[i].offsetWidth));
    });
  }, [data1]);

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
            const nextIndex = (lastItem.id + 1) % data1.length;
            visibleItems.push({
              id: nextIndex,
              text: data1[nextIndex],
              position: -widths[nextIndex] - gap,
            });
          }
        }
        return visibleItems;
      });
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      animationRef.current = requestAnimationFrame(scroll);
    };

    animationRef.current = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationRef.current);
  }, [widths, data1]);





  return (<div>
    <div style={{ position: 'absolute', visibility: 'hidden' }}>
      {data1.map((item, i) => <div
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