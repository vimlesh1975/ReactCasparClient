import React, { useEffect, useRef } from 'react';

const ScaledText = ({ text, containerWidth, containerHeight }) => {
  const textRef = useRef(null);
  const containerRef = useRef(null);

  const adjustScaleX = () => {
    if (!textRef.current || !containerRef.current) return;

    const textElement = textRef.current;
    const containerElement = containerRef.current;

    const containerWidth = containerElement.offsetWidth;
    const textWidth = textElement.offsetWidth;

    if (textWidth > containerWidth) {
      const scale = containerWidth / textWidth; // Calculate scaleX ratio
      textElement.style.transform = `scaleX(${scale})`;
    } else {
      textElement.style.transform = 'scaleX(1)'; // Reset scaling if text fits
    }
  };

  useEffect(() => {
    // Adjust scaling on mount and when the window is resized
    adjustScaleX();
    window.addEventListener('resize', adjustScaleX);

    return () => {
      window.removeEventListener('resize', adjustScaleX);
    };
  }, [text]);

  return (
    <div
      ref={containerRef}
      style={{
        width: `${containerWidth}px`,
        height: `${containerHeight}px`,
        // border: '2px solid black',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        // backgroundColor: '#fff',
      }}
    >
      <div
        ref={textRef}
        style={{
          whiteSpace: 'nowrap',
          textAlign: 'center',
          transformOrigin: 'center center',
        //   fontSize: '16px', // You can customize this
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default ScaledText;
