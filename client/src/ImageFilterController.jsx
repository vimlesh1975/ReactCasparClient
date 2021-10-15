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

    const setBrightness = e => {
        canvas.getActiveObjects().forEach(element => {
            if (element.type === 'image') {
                if (e.target.type === 'checkbox') {
                    if (e.target.checked) {
                        element.filters[5] = new fabric.Image.filters.Brightness({
                            brightness: refBrightness.current.value
                        });;
                    } else {
                        element.filters[5] = '';
                    }
                    element.applyFilters();
                    canvas.requestRenderAll();
                    // console.log(element.filters)
                }
                else {
                    element.filters[5] = new fabric.Image.filters.Brightness({
                        brightness: refBrightness.current.value
                    });
                    element.applyFilters();
                    canvas.requestRenderAll();
                }
            }
        });
    }

    const setBlur = e => {
        canvas.getActiveObjects().forEach(element => {
            if (element.type === 'image') {
                if (e.target.type === 'checkbox') {
                    if (e.target.checked) {
                        element.filters[12] = new fabric.Image.filters.Blur({
                            blur: refBlur.current.value
                        });;
                    } else {
                        element.filters[12] = '';
                    }
                    element.applyFilters();
                    canvas.requestRenderAll();
                    // console.log(element.filters)
                }
                else {
                    element.filters[12] = new fabric.Image.filters.Blur({
                        blur: refBlur.current.value
                    });
                    element.applyFilters();
                    canvas.requestRenderAll();
                }
            }
        });
    }

    return (
        <div>
            <b>Brightness:</b> <input onChange={setBrightness} type="checkbox" id="brightness" /><input ref={refBrightness} className='inputRange' onChange={setBrightness} type="range" min='-1' max='1' step='0.1' defaultValue='0' />
            <br />
            <b>Blur:</b> <input onChange={setBlur} type="checkbox" id="blur" /><input ref={refBlur} className='inputRange' onChange={setBlur} type="range" min='0' max='1' step='0.1' defaultValue='0' />

        </div>
    )
}

export default ImageFilterController
