import React, { useEffect, useState, useRef, useCallback } from 'react';
import { addressmysql } from '../common';
import STFSingleLine from './STFSingleLine';

const gap = 50; // Space between items
const categoryWidth = 250;

const HorizontalScrollWithTopic = () => {
  const [data2, setData2] = useState({}); // Data fetched from the API
  const [categories, setCategories] = useState([]); // Categories to scroll
  const [activeItems, setActiveItems] = useState([]); // Items to display in the scroll
  const [currentCategory, setCurrentCategory] = useState(''); // Current category name
  const itemRefs = useRef({}); // Refs for items
  const isScrolling = useRef(false); // Flag for scrolling state
  const animationFrameId = useRef(null); // For canceling the animation
  const speedRef = useRef(6); // Scrolling speed reference

  window.speedRef = speedRef;

  // Function to fetch data and update categories
  const fetchRO = useCallback(async () => {
    try {
      const res = await fetch(addressmysql() + `/show_runorderScroll`);
      const data = await res.json();
      const processedData = {};

      // Process the fetched data and prepare categories
      data.forEach((val) => {
        if (val && val.Script) {
          const splitText = val.Script.replace(/[\r\n]+/g, ' ')
            .replace(/\s+/g, ' ')
            .trim()
            .split('$$$$');

          processedData[val.SlugName] = splitText;
        }
      });

      setData2(processedData);
      setCategories(Object.keys(processedData)); // Update categories based on fetched data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  const startScroll = useCallback(() => {
    if (isScrolling.current || categories.length === 0) return; // Don't start if already scrolling

    isScrolling.current = true; // Set scrolling state to true

    const startCategoryScroll = (categoryIndex) => {
      if (categoryIndex >= categories.length) categoryIndex = 0; // Loop to the first category

      const categoryName = categories[categoryIndex];
      setCurrentCategory(categoryName);

      const items = data2[categoryName];
      setActiveItems([{ id: 0, text: items[0], position: window.innerWidth }]);

      const scroll = () => {
        setActiveItems((prevItems) => {
          const updatedItems = prevItems.map((item) => ({
            ...item,
            position: item.position - speedRef.current, // Scroll items by speed
          }));

          // Remove items that are completely out of view
          const visibleItems = updatedItems.filter(
            (item) => item.position + (itemRefs.current[item.id]?.offsetWidth || 0) > 0
          );

          // Add new items dynamically
          if (visibleItems.length > 0) {
            const lastItem = visibleItems[visibleItems.length - 1];
            const lastItemWidth = itemRefs.current[lastItem.id]?.offsetWidth || 0;
            const nextIndex = lastItem.id + 1;

            if (
              lastItem.position + lastItemWidth <= window.innerWidth + gap &&
              nextIndex < items.length
            ) {
              visibleItems.push({
                id: nextIndex,
                text: items[nextIndex],
                position: lastItem.position + lastItemWidth + gap, // Correct position
              });
            }
          }

          // Transition to the next category if no items remain
          if (visibleItems.length === 0) {
            setTimeout(() => {
              startCategoryScroll(categoryIndex + 1); // Move to next category
            }, 100);
          }

          return visibleItems;
        });

        // Continue scrolling if active
        if (isScrolling.current) {
          animationFrameId.current = requestAnimationFrame(scroll);
        }
      };

      // Cancel any previous animation before starting
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      animationFrameId.current = requestAnimationFrame(scroll);
    };

    startCategoryScroll(0); // Start with the first category
  }, [categories, data2]);

  useEffect(() => {
    fetchRO(); // Fetch data on mount
  }, [fetchRO]);

  useEffect(() => {
    if (Object.keys(data2).length > 0) {
      startScroll(); // Start scrolling when data is ready
    }
  }, [data2, startScroll]);

  useEffect(() => {
    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current); // Clean up
      isScrolling.current = false;
    };
  }, []);

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
        animation: 'fadeIn 0.5s ease-in-out', // Fade-in effect for the entire strip
      }}
    >
      {/* Category Name with Animation */}
      <div
        style={{
          width: categoryWidth,
          height: '100%',
          backgroundColor: '#333',
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 50,
          fontWeight: 'bolder',
          whiteSpace: 'nowrap',
          transform: 'translateX(-100%)', // Start off-screen
          animation: 'slideIn 0.5s ease-in-out forwards', // Slide-in effect
        }}
      >
        <STFSingleLine text={currentCategory} containerWidth={categoryWidth - 10} />
      </div>
  
      {/* Scrolling Items */}
      <div
        style={{
          position: 'relative',
          flexGrow: 1,
          height: '100%',
          overflow: 'hidden',
          animation: 'fadeIn 0.5s ease-in-out', // Optional fade-in for the scrolling strip
        }}
      >
        {activeItems.map((item) => (
          <div
            key={`${currentCategory}-${item.id}`}
            ref={(el) => (itemRefs.current[item.id] = el)}
            style={{
              position: 'absolute',
              left: Math.round(item.position), // Avoid fractional pixels
              fontSize: 50,
              fontWeight: 'bolder',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'clip',
              fontFamily: 'Arial, Helvetica, sans-serif',
              lineHeight: 'normal',
              animation: 'fadeIn 0.5s ease-in-out', // Fade-in effect for each item
            }}
          >
            {item.text + ' | '}
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default HorizontalScrollWithTopic;
