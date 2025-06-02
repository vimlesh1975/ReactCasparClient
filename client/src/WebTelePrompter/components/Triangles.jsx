import React from 'react';

const triangleStyle = {
  width: 0,
  height: 0,
  borderLeft: '50px solid transparent',   // 20 × 4
  borderRight: '50px solid transparent',  // 20 × 4
  borderBottom: '100px solid rgb(255, 0, 34)', // 40 × 4
  transform: 'rotate(90deg)', // Removed scale
};

const Triangles = () => {
  return (
    <div>
      <div style={triangleStyle}></div>
    </div>
  );
};

export default Triangles;
