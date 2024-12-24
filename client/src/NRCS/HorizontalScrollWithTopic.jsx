import React, { useEffect, useState, useRef, useCallback } from 'react';
import { addressmysql } from '../common';
import STFSingleLine from './STFSingleLine'
// import logo from './doordarshan-logo.png'




const HorizontalScrollWithTopic = () => {
  const [data2, setData2] = useState({}); // Data fetched from the API
  const [categories, setCategories] = useState([]); // Categories to scroll
  const [activeItems, setActiveItems] = useState([]); // Items to display in the scroll
  const [currentCategory, setCurrentCategory] = useState(''); // Current category name
  const itemRefs = useRef({}); // Refs for items
  const isScrolling = useRef(false); // Flag for scrolling state
  const animationFrameId = useRef(null); // For canceling the animation
  var gap = 50;

  const speed = 6; // Set a constant speed value for scrolling
  window.speed = speed;
  // Function to fetch data and update categories
  const fetchRO = useCallback(async () => {
    try {
      // const res = await fetch(addressmysql() + `/show_runorderBreakingNews`);
      const res = await fetch(addressmysql() + `/show_runorderScroll`);
      const data = await res.json();
      const aa = {};

      // Process the fetched data and prepare categories
      data.forEach((val) => {
        if (val && val.Script) {
          // const splitText = val.Script.split('$$$$');
          // const splitText = val.Script.replace(/[\r\n]+/g, '').split('$$$$');
          const splitText = ((val.Script)
            .replace(/[\r\n]+/g, ' ')
            .replace(/\s+/g, ' ')
            .trim()
          )
            .split('$$$$');

          aa[val.SlugName] = splitText;
        }
      });

      setData2(aa);
      setCategories(Object.keys(aa)); // Update categories based on fetched data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  // Memoize the scroll logic with useCallback
  const startScroll = useCallback(() => {
    if (isScrolling.current || categories.length === 0) return; // Don't start if already scrolling

    isScrolling.current = true; // Set the scrolling state to true

    const startCategoryScroll = (categoryIndex) => {
      if (categoryIndex >= categories.length) {
        // Loop back to the first category
        categoryIndex = 0;
      }

      const categoryName = categories[categoryIndex];
      setCurrentCategory(categoryName);

      const items = data2[categoryName];
      setActiveItems([{ id: 0, text: items[0], position: window.innerWidth }]);

      const scroll = () => {
        setActiveItems((prevItems) => {
          const updatedItems = prevItems.map((item) => ({
            ...item,
            position: item.position - speed, // Use constant speed
          }));

          // Remove items that are out of view
          const visibleItems = updatedItems.filter(
            (item) => item.position + (itemRefs.current[item.id]?.offsetWidth || 0) > 0
          );

          // Add new items when the last one is fully visible
          if (visibleItems.length > 0) {
            const lastItem = visibleItems[visibleItems.length - 1];
            if (lastItem.position <= window.innerWidth - (itemRefs.current[lastItem.id]?.offsetWidth || 0)) {
              const nextIndex = lastItem.id + 1;
              if (nextIndex < items.length) {
                visibleItems.push({
                  id: nextIndex,
                  text: items[nextIndex],
                  position: window.innerWidth + gap,
                });
              }
            }
          }

          // If no more items are visible, move to the next category
          if (visibleItems.length === 0) {
            // Loop back to the first category after reaching the last one
            setTimeout(() => {
              startCategoryScroll(categoryIndex + 1); // Transition to next category
            }, 10);
          }

          return visibleItems;
        });

        // Keep animating if scrolling
        if (isScrolling.current) {
          animationFrameId.current = requestAnimationFrame(scroll); // Continue the animation
        }
      };

      // Cancel any previous animation frame before starting a new one
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      animationFrameId.current = requestAnimationFrame(scroll); // Start the scroll animation
    };

    // Start scrolling from the first category
    startCategoryScroll(0);
  }, [categories, data2, gap]); // Dependencies: categories and data2

  // Trigger the scroll once data is available
  useEffect(() => {
    fetchRO(); // Fetch data when the component mounts
  }, [fetchRO]);

  // Trigger the scroll once data is available
  useEffect(() => {
    if (Object.keys(data2).length > 0) {
      startScroll(); // Start scrolling automatically after the data is fetched
    }
  }, [data2, startScroll]); // Ensure startScroll is included in dependencies

  // Clean up and cancel the animation when the component unmounts or scrolling stops
  useEffect(() => {
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current); // Cancel any ongoing animation frame
      }
      isScrolling.current = false; // Stop scrolling
    };
  }, []); // Empty dependency array means this effect runs once when the component unmounts

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 80,
        position: 'absolute',
        top: window.innerHeight - 80,
        backgroundColor: 'black',
        color: 'white',
        overflow: 'hidden',
      }}
    >
      {/* Category Name */}
      <div
        style={{
          width: 200,
          height: '100%',
          backgroundColor: '#333',
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 50,
          fontWeight: 'bolder',
          whiteSpace: 'nowrap',

        }}
      >
        {/* {currentCategory} */}
        <STFSingleLine text={currentCategory} containerWidth={200} />

      </div>

      {/* Scrolling Items */}
      <div
        style={{
          position: 'relative',
          flexGrow: 1,
          height: '100%',
          overflow: 'hidden',
        }}
      >
        {activeItems.map((item) => (
          <div
            key={`${currentCategory}-${item.id}`}
            ref={(el) => (itemRefs.current[item.id] = el)}
            style={{
              position: 'absolute',
              left: item.position,
              fontSize: 50,
              fontWeight: 'bolder',
              whiteSpace: 'nowrap',
              overflow: 'hidden',   // Hide overflowing content
            }}
          >
            {/* {item.text} <img src={logo} alt='dd logo' width={50} /> */}
            {item.text + ' | '} 
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalScrollWithTopic;
