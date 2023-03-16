import React from 'react'
import { gsap } from 'gsap';

const CanvasPlayer = () => {
    window.gsap = gsap;
    return (
        <div></div>
    )
}

export default CanvasPlayer