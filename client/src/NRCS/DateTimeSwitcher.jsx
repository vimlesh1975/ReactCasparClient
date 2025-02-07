import React, { useState, useEffect } from 'react';

const DateTimeSwitcher = () => {
  const [isShowingDate, setIsShowingDate] = useState(true); // Toggle state for date and time
  const [currentTime, setCurrentTime] = useState(new Date());
  const [fadeState, setFadeState] = useState('fade-in'); // Track animation state

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Switch between date and time every 2 seconds
    const switcher = setInterval(() => {
      // Trigger fade-out animation before switching
      setFadeState('fade-out');
      setTimeout(() => {
        setIsShowingDate((prev) => !prev); // Switch content
        setFadeState('fade-in'); // Trigger fade-in animation
      }, 500); // Match fade-out duration
    }, 5000);

    // Cleanup intervals on unmount
    return () => {
      clearInterval(timer);
      clearInterval(switcher);
    };
  }, []);

  // Format the date in Indian style (e.g., 27 Dec 2024)
  const formatDate = (date) =>
    date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

  const formatTime = (date) => date.toLocaleTimeString();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        height: 80,
        top: window.innerHeight - 80,
        left: window.innerWidth - 300,
        fontSize: 50,
        minWidth: 300,
        fontWeight: 'bolder',
        fontFamily: 'Arial, sans-serif',
        color: 'black',
        backgroundColor: 'white',
      }}
    >
      <div
        style={{
          transition: 'opacity 0.5s ease', // Animation duration and easing
          opacity: fadeState === 'fade-in' ? 1 : 0, // Apply fade-in/out effect
        }}
      >
        {isShowingDate ? formatDate(currentTime) : formatTime(currentTime)}
      </div>
    </div>
  );
};

export default DateTimeSwitcher;
