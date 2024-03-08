import React from 'react'
import { rgbaObjectToHex, getModifiedObject } from '../common'

const Theatrejs2 = () => {
    window.hexToRGB = hex => {
        const red = parseInt(hex.slice(1, 3), 16)
        const green = parseInt(hex.slice(3, 5), 16)
        const blue = parseInt(hex.slice(5, 7), 16)
        return { r: red / 255, g: green / 255, b: blue / 255, a: 1 } // return an object
    }

    window.rgbaObjectToHex = rgbaObjectToHex;
    window.getModifiedObject = getModifiedObject;
    window.CRLFtobackslashn = (str) => {
        return str.replace(/CRLF/g, '\n');
    }

    return (
        <div></div>
    )
}

export default Theatrejs2