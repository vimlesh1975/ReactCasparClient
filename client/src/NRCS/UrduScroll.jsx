import React, { useEffect, useRef } from 'react';
let position = window.innerWidth; // Start from 1920px

const UrduScroll = () => {
    const aa = useRef(null);

    const scroll = () => {
        if (aa.current) {
            position -= 20; // Move left smoothly
            
            // Reset position when it moves completely off-screen
            if (position + aa.current.offsetWidth < 0) {
                position = window.innerWidth; // Reset to the right edge
            }

            aa.current.style.left = `${position}px`;
            requestAnimationFrame(scroll);
        }
    };

    useEffect(() => {
        if (aa.current) {
            aa.current.style.left = `${position}px`;
            scroll();
        }
    }, [ scroll]);


    return (
        <div ref={aa} style={{ position: 'absolute', whiteSpace: 'nowrap', fontSize: '24px' }}>
            UrduScroll
        </div>
    );
};

export default UrduScroll;
