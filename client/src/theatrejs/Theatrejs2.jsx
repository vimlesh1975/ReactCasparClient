import React, { useEffect } from 'react'
import { rgbaObjectToHex, getModifiedObject } from '../common'

const Theatrejs2 = () => {
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
