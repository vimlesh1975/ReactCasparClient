import React, { useRef } from 'react';
import { fabric } from "fabric";
var filters = ['grayscale', 'invert', 'remove-color', 'sepia', 'brownie',
    'brightness', 'contrast', 'saturation', 'vibrance', 'noise', 'vintage',
    'pixelate', 'blur', 'sharpen', 'emboss', 'technicolor',
    'polaroid', 'blend-color', 'gamma', 'kodachrome',
    'blackwhite', 'blend-image', 'hue', 'resize'];
const ImageFilterController = ({ canvas }) => {
    const refBrightness = useRef();
    const refBlur = useRef();
    const refHue = useRef();


    const setBrightness = e => {
        canvas.getActiveObjects().forEach(element => {
            if (element.type === 'image') {
                var filter = new fabric.Image.filters.Brightness({
                    brightness: refBrightness.current.value
                });
                if (e.target.type === 'checkbox') {
                    if (e.target.checked) {
                        element.filters[5] = filter;
                    } else {
                        element.filters[5] = '';
                    }
                }
                else {
                    element.filters[5] = filter;
                }
                element.applyFilters();
                canvas.requestRenderAll();
            }
        });
    }
    const setBlur = e => {
        canvas.getActiveObjects().forEach(element => {
            if (element.type === 'image') {
                var filter = new fabric.Image.filters.Blur({
                    blur: refBlur.current.value
                });
                if (e.target.type === 'checkbox') {
                    if (e.target.checked) {
                        element.filters[11] = filter;
                    } else {
                        element.filters[11] = '';
                    }
                }
                else {
                    element.filters[11] = filter;
                }
                element.applyFilters();
                canvas.requestRenderAll();
            }
        });
    }

    const setBlackwhite = e => {
        canvas.getActiveObjects().forEach(element => {
            if (element.type === 'image') {
                var filter = new fabric.Image.filters.BlackWhite({
                    blackwhite: e.target.checked
                });
                if (e.target.checked) {
                    element.filters[19] = filter;
                } else {
                    element.filters[19] = '';
                }
                element.applyFilters();
                canvas.requestRenderAll();
            }
        });
    }

    const setHue = e => {
        canvas.getActiveObjects().forEach(element => {
            if (element.type === 'image') {
                var filter = new fabric.Image.filters.HueRotation({
                    rotation: refHue.current.value
                });
                if (e.target.type === 'checkbox') {
                    if (e.target.checked) {
                        element.filters[21] = filter;
                    } else {
                        element.filters[21] = '';
                    }
                }
                else {
                    element.filters[21] = filter;
                }
                element.applyFilters();
                canvas.requestRenderAll();
            }
        });
    }

    return (
        <div>
            <table border='1'>
                <tr><td><b>Brightness:</b></td><td><input onChange={setBrightness} type="checkbox" id="brightness" /></td><td><input ref={refBrightness} className='inputRange' onChange={setBrightness} type="range" min='-1' max='1' step='0.1' defaultValue='0' /></td></tr>
                <tr><td><b>Blur:</b> </td><td><input onChange={setBlur} type="checkbox" id="blur" /></td><td><input ref={refBlur} className='inputRange' onChange={setBlur} type="range" min='0' max='1' step='0.1' defaultValue='0' /></td></tr>
                <tr><td><b>Black/White:</b></td><td>  <input onChange={setBlackwhite} type="checkbox" id="blackwhite" /></td></tr>
                <tr><td><b>Hue:</b> </td><td><input onChange={setHue} type="checkbox" id="hue" /></td><td><input ref={refHue} className='inputRange' onChange={setHue} type="range" min='-2' max='2' step='0.002' defaultValue='0' /></td></tr>
            
            
            </table>
        </div>
    )
}

export default ImageFilterController
