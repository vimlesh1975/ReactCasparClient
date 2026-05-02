import React, { useEffect } from 'react'
import { gsap } from 'gsap';
window.gsap = gsap;
window.tl = gsap.timeline();

const CanvasPlayer = () => {

    useEffect(() => {
        document.documentElement.style.background = 'transparent';
        document.body.style.background = 'transparent';
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.body.style.overflow = 'hidden';
        const root = document.getElementById('root');
        if (root) {
            root.style.background = 'transparent';
        }
    }, []);

    return (
        <div></div>
    )
}

export default CanvasPlayer