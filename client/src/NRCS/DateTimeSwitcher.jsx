import React, { useState, useEffect } from 'react';

const DateTimeSwitcher = () => {
  const [isShowingDate, setIsShowingDate] = useState(true); // Toggle state for date and time
  const [currentTime, setCurrentTime] = useState(new Date());
  const [fadeState, setFadeState] = useState('fade-in'); // Track animation state

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Change to 1 second for continuous second updates

    // Switch between date and time every 5 seconds
    const switcher = setInterval(() => {
      setFadeState('fade-out'); // Start fade-out effect
      setTimeout(() => {
        setIsShowingDate((prev) => !prev); // Toggle display
        setFadeState('fade-in'); // Start fade-in effect
      }, 500); // Match fade-out duration
    }, 5000);

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

  const formatTime = (date) =>
    date.toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

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
        color: '#252525ff',
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
