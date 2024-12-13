import React, { useEffect, useRef, useState } from 'react';

const DynamicFontSizeText = ({ text, containerWidth, containerHeight }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [fontSize, setFontSize] = useState(120); // Default font size

  const adjustFontSize = () => {
    if (!containerRef.current || !textRef.current) return;

    const textElement = textRef.current;

    let currentFontSize = fontSize;
    textElement.style.fontSize = `${currentFontSize}px`;

    // Reduce font size until the text fits within the container height
    while (textElement.scrollHeight > containerHeight && currentFontSize > 1) {
      currentFontSize -= 1;
      textElement.style.fontSize = `${currentFontSize}px`;
    }

    setFontSize(currentFontSize);
  };

  useEffect(() => {
    adjustFontSize();
    window.addEventListener('resize', adjustFontSize);

    return () => {
      window.removeEventListener('resize', adjustFontSize);
    };
  }, [text, containerHeight, containerWidth]);

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
        position: 'relative',
        // backgroundColor: '#fff',
      }}
    >
      <div
        ref={textRef}
        style={{
          whiteSpace: 'normal', // Allow multi-line text
          textAlign: 'center', // Center-align text
          fontSize: `${fontSize}px`,
          // lineHeight: '1.2', // Adjust line spacing
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default DynamicFontSizeText;
