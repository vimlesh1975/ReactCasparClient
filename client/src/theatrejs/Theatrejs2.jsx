import React from 'react'
import { rgbaObjectToHex } from '../common'

const Theatrejs2 = () => {
    window.hexToRGB = hex => {
        const red = parseInt(hex.slice(1, 3), 16)
        const green = parseInt(hex.slice(3, 5), 16)
        const blue = parseInt(hex.slice(5, 7), 16)
        return { r: red / 255, g: green / 255, b: blue / 255, a: 1 } // return an object
    }

    // window.rgbaObjectToHex = (rgba) => {
    //     let r = Math.round(rgba.r * 255).toString(16).padStart(2, "0");
    //     let g = Math.round(rgba.g * 255).toString(16).padStart(2, "0");
    //     let b = Math.round(rgba.b * 255).toString(16).padStart(2, "0");
    //     let hex = "#" + r + g + b;
    //     return hex;
    // }
    window.rgbaObjectToHex = rgbaObjectToHex;
    return (
        <div></div>
    )
}

export default Theatrejs2