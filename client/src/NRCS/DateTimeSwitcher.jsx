import React, { useState, useEffect } from 'react';

const DateTimeSwitcher = () => {
  const [isShowingDate, setIsShowingDate] = useState(true); // Toggle state for date and time
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Switch between date and time every 2 seconds
    const switcher = setInterval(() => {
      setIsShowingDate((prev) => !prev);
    }, 2000);

    // Cleanup intervals on unmount
    return () => {
      clearInterval(timer);
      clearInterval(switcher);
    };
  }, []);

  const formatDate = (date) => date.toLocaleDateString();
  const formatTime = (date) => date.toLocaleTimeString();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position:'absolute',
        height: 80,
        top:window.innerHeight-80,
        left:window.innerWidth - 300,
        fontSize: 50,
        minWidth:300,
        fontWeight: 'bolder',
        fontFamily: 'Arial, sans-serif',
        color: 'white',
        backgroundColor:'blue'
      }}
    >
      {isShowingDate ? formatDate(currentTime) : formatTime(currentTime)}
    </div>
  );
};

export default DateTimeSwitcher;
