'use client';

import { useState, useEffect, useRef } from "react";
import ScrollViewforcasparcg from '../components/ScrollViewforcasparcg';
const scrollWidth = 782;
const scrollHeight = 440;

const Page = () => {
  const [scaleX, setScaleX] = useState(0.41);
  const [scaleY, setScaleY] = useState(0.43);
  const [isMaximized, setIsMaximized] = useState(false);
  const container = useRef(null);
  const handleRightClick = (event) => {
    event.preventDefault(); // Prevent the default context menu from appearing
    console.log('Right-click detected, flipping content');

    if (container.current.style.transform.includes('rotateY(180deg)')) {
      container.current.style.transform = container.current.style.transform.replace('rotateY(180deg)', 'rotateY(0deg)');
    } else {
      container.current.style.transform = container.current.style.transform + ' rotateY(180deg)';
    }
  };


  const toggleScaleAndMaximize = () => {
    console.log('double clicked')
    if (!isMaximized) {
      // Maximize window (only works for popups)
      window.moveTo(0, 0);
      window.resizeTo(window.screen.width, window.screen.height);
      const screenHeight = window.screen.height;

      const knownOrigins = {
        1080: 160,
        1050: 165,
        1024: 160,
        960: 153,
        900: 155,
        864: 155,
        800: 150,
        768: 150,
        720: 140,
        664: 145,
        600: 135,
      };
      const sf = (screenHeight - (knownOrigins[screenHeight] || 150)) / 1080;
      setScaleX(window.innerWidth / 1920);
      setScaleY(sf);

    } else {
      window.resizeTo(scrollWidth, scrollHeight + 130);
      setScaleX(0.41);
      setScaleY(0.43);
    }
    setIsMaximized(!isMaximized);
  };

  useEffect(() => {
    const handleResize = () => {
      setScaleX(window.innerWidth / 1920);
      setScaleY(document.documentElement.clientHeight / 1080);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMaximized]);

  return (
    <div
      onDoubleClick={toggleScaleAndMaximize}
      onContextMenu={handleRightClick}
      ref={container}
    >
      <div
        style={{
          transform: `scale(${scaleX}, ${scaleY})`,
          transformOrigin: "top left",
          width: scrollWidth,
          height: scrollHeight,
        }}
      >
        <ScrollViewforcasparcg />
      </div>
    </div>
  );
};

export default Page;
