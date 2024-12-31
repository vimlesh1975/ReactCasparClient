import React, { useEffect, useRef, useState, useCallback } from 'react';

const STFMultine = ({ text, containerWidth, containerHeight, fs }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [fontSize, setFontSize] = useState(fs); // Default font size

  const adjustFontSize = useCallback(() => {
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
  }, [fontSize, containerHeight]);

  useEffect(() => {
    adjustFontSize();
    const debounce = (func, delay) => {
      let timeout;
      return () => {
        clearTimeout(timeout);
        timeout = setTimeout(func, delay);
      };
    };
    const debouncedAdjustFontSize = debounce(adjustFontSize, 200); // Debounce resize by 200ms

    window.addEventListener('resize', debouncedAdjustFontSize);

    return () => {
      window.removeEventListener('resize', debouncedAdjustFontSize);
    };
  }, [adjustFontSize, containerWidth, containerHeight, text]); // Use memoized version

  return (
    <div
      ref={containerRef}
      style={{
        width: `${containerWidth}px`,
        height: `${containerHeight}px`,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <div
        ref={textRef}
        style={{
          whiteSpace: 'normal', // Allow multi-line text
          textAlign: 'center', // Center-align text
          fontSize: `${fontSize}px`,
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default STFMultine;
