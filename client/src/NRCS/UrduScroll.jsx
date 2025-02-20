import React, { useEffect, useRef, useState } from "react";

const UrduScroll = () => {
    const textRef = useRef(null);
    const positionRef = useRef(window.innerWidth); // Start from the right edge
    // const [rtl, setRtl] = useState(true); // State for Right-to-Left direction
    const [rtl, setRtl] = useState(false); // State for Right-to-Left direction

    useEffect(() => {
        let animationFrameId;

        const scroll = () => {
            if (textRef.current) {
                positionRef.current += rtl ? -12 : 12; // Move left for RTL, right for LTR

                if (rtl && positionRef.current  < - textRef.current.offsetWidth) {
                    positionRef.current = window.innerWidth; // Reset for RTL
                } else if (!rtl && positionRef.current > window.innerWidth) {
                    positionRef.current = -textRef.current.offsetWidth; // Reset for LTR
                }

                textRef.current.style.left = `${positionRef.current}px`;
                animationFrameId = requestAnimationFrame(scroll);
            }
        };

        animationFrameId = requestAnimationFrame(scroll);

        return () => cancelAnimationFrame(animationFrameId); // Cleanup on unmount
    }, [rtl]); // Restart animation when direction changes

    return (
        <div>
            <button 
                onClick={() => setRtl((prev) => !prev)} 
                style={{ position: "absolute", top: "20px", left: "20px", padding: "8px 16px" }}
            >
                Toggle Direction
            </button>

            <div
                ref={textRef}
                style={{
                    position: "absolute",
                    whiteSpace: "nowrap",
                    fontSize: "24px",
                    left: `${window.innerWidth}px`, // Start from the right
                }}
            >
                UrduScroll
            </div>
        </div>
    );
};

export default UrduScroll;
