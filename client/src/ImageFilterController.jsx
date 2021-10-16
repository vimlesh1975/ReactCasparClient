import React, { useRef } from 'react';
import { fabric } from "fabric";
var filters = ['grayscale', 'invert', 'remove-color', 'sepia', 'brownie',
    'brightness', 'contrast', 'saturation', 'vibrance', 'noise', 'vintage',
    'pixelate', 'blur', 'sharpen', 'emboss', 'technicolor',
    'polaroid', 'blend-color', 'gamma', 'kodachrome',
    'blackwhite', 'blend-image', 'hue', 'resize'];
    var f=fabric.Image.filters;
const ImageFilterController = ({ canvas }) => {
    const refBrightness = useRef();
    const refBlur = useRef();
    const refHue = useRef();
    const refPixelate = useRef();
    const refSaturation = useRef();
    const refContrast = useRef();
    const refNoise = useRef();
    const refVibrance = useRef();

    
    

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
                var filter = new fabric.Image.filters.BlackWhite();
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
    const setInvert = e => {
        canvas.getActiveObjects().forEach(element => {
            if (element.type === 'image') {
                var filter = new fabric.Image.filters.Invert();
                if (e.target.checked) {
                    element.filters[1] = filter;
                } else {
                    element.filters[1] = '';
                }
                element.applyFilters();
                canvas.requestRenderAll();
            }
        });
    }

    const setSepia = e => {
        canvas.getActiveObjects().forEach(element => {
            if (element.type === 'image') {
                var filter = new fabric.Image.filters.Sepia();
                if (e.target.checked) {
                    element.filters[3] = filter;
                } else {
                    element.filters[3] = '';
                }
                element.applyFilters();
                canvas.requestRenderAll();
            }
        });
    }

    const setSharpen = e => {
        canvas.getActiveObjects().forEach(element => {
            if (element.type === 'image') {
                var filter = new fabric.Image.filters.Convolute({
                    matrix: [  0, -1,  0,
                        -1,  5, -1,
                         0, -1,  0 ]
                });
                if (e.target.checked) {
                    element.filters[12] = filter;
                } else {
                    element.filters[12] = '';
                }
                element.applyFilters();
                canvas.requestRenderAll();
            }
        });
    }
    const setBrownie = e => {
        canvas.getActiveObjects().forEach(element => {
            if (element.type === 'image') {
                var filter = new fabric.Image.filters.Brownie();
                if (e.target.checked) {
                    element.filters[4] = filter;
                } else {
                    element.filters[4] = '';
                }
                element.applyFilters();
                canvas.requestRenderAll();
            }
        });
    }
    const setVintage = e => {
        canvas.getActiveObjects().forEach(element => {
            if (element.type === 'image') {
                var filter = new fabric.Image.filters.Vintage();
                if (e.target.checked) {
                    element.filters[9] = filter;
                } else {
                    element.filters[9] = '';
                }
                element.applyFilters();
                canvas.requestRenderAll();
            }
        });
    }
    
    const setFilter=(e,filterIndex,filterName)=>{
        canvas.getActiveObjects().forEach(element => {
            if (element.type === 'image') {
                element.filters[filterIndex]=e.target.checked?filterName:'';
                element.applyFilters();
                canvas.requestRenderAll();
            }
        });
    }
    const setEmboss = e => {
        canvas.getActiveObjects().forEach(element => {
            if (element.type === 'image') {
                var filter = new fabric.Image.filters.Convolute({
                    matrix: [ 1,   1,  1,
                        1, 0.7, -1,
                       -1,  -1, -1 ]
                });
                if (e.target.checked) {
                    element.filters[13] = filter;
                } else {
                    element.filters[13] = '';
                }
                element.applyFilters();
                canvas.requestRenderAll();
            }
        });
    }
    const setPixelate = e => {
        canvas.getActiveObjects().forEach(element => {
            if (element.type === 'image') {
                var filter = new fabric.Image.filters.Pixelate({
                    blocksize: parseInt(refPixelate.current.value, 10)
                });
                if (e.target.type === 'checkbox') {
                    if (e.target.checked) {
                        element.filters[10] = filter;
                    } else {
                        element.filters[10] = '';
                    }
                }
                else {
                    element.filters[10] = filter;
                }
                element.applyFilters();
                canvas.requestRenderAll();
            }
        });
    }
    const setSaturation = e => {
        canvas.getActiveObjects().forEach(element => {
            if (element.type === 'image') {
                var filter = new fabric.Image.filters.Saturation({
                    saturation: parseFloat(refSaturation.current.value)
                });
                if (e.target.type === 'checkbox') {
                    if (e.target.checked) {
                        element.filters[7] = filter;
                    } else {
                        element.filters[7] = '';
                    }
                }
                else {
                    element.filters[7] = filter;
                }
                element.applyFilters();
                canvas.requestRenderAll();
            }
        });
    }
    const setContrast = e => {
        canvas.getActiveObjects().forEach(element => {
            if (element.type === 'image') {
                var filter = new fabric.Image.filters.Contrast({
                    contrast: parseFloat(refContrast.current.value)
                });
                if (e.target.type === 'checkbox') {
                    if (e.target.checked) {
                        element.filters[6] = filter;
                    } else {
                        element.filters[6] = '';
                    }
                }
                else {
                    element.filters[6] = filter;
                }
                element.applyFilters();
                canvas.requestRenderAll();
            }
        });
    }
    const setNoise = e => {
        canvas.getActiveObjects().forEach(element => {
            if (element.type === 'image') {
                var filter = new fabric.Image.filters.Noise({
                    noise: parseInt(refNoise.current.value,10)
                });
                if (e.target.type === 'checkbox') {
                    if (e.target.checked) {
                        element.filters[9] = filter;
                    } else {
                        element.filters[9] = '';
                    }
                }
                else {
                    element.filters[9] = filter;
                }
                element.applyFilters();
                canvas.requestRenderAll();
            }
        });
    }
    const setVibrance = e => {
        canvas.getActiveObjects().forEach(element => {
            if (element.type === 'image') {
                var filter = new fabric.Image.filters.Vibrance({
                    vibrance: parseFloat(refVibrance.current.value)
                });
                if (e.target.type === 'checkbox') {
                    if (e.target.checked) {
                        element.filters[8] = filter;
                    } else {
                        element.filters[8] = '';
                    }
                }
                else {
                    element.filters[8] = filter;
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
               
                <tr><td><b>Hue:</b> </td><td><input onChange={setHue} type="checkbox" id="hue" /></td><td><input ref={refHue} className='inputRange' onChange={setHue} type="range" min='-2' max='2' step='0.002' defaultValue='0' /></td></tr>
                <tr><td><b>Saturation:</b> </td><td><input onChange={setSaturation} type="checkbox" id="Saturation" /></td><td><input ref={refSaturation} className='inputRange' onChange={setSaturation} type="range" min='-1' max='1' step='0.003921' defaultValue='0' /></td></tr>
                <tr><td><b>Contrast:</b> </td><td><input onChange={setContrast} type="checkbox" id="Contrast" /></td><td><input ref={refContrast} className='inputRange' onChange={setContrast} type="range" min='-1' max='1' step='0.003921' defaultValue='0' /></td></tr>
               
                <tr><td><b>Noise:</b> </td><td><input onChange={setNoise} type="checkbox" id="Noise" /></td><td><input ref={refNoise} className='inputRange' onChange={setNoise} type="range" min='0' max='1000' step='1' defaultValue='0' /></td></tr>
                <tr><td><b>Pixelate:</b> </td><td><input onChange={setPixelate} type="checkbox" id="Pixelate" /></td><td><input ref={refPixelate} className='inputRange' onChange={setPixelate} type="range" min='1' max='500' step='1' defaultValue='0' /></td></tr>
                <tr><td><b>Vibrance:</b> </td><td><input onChange={setVibrance} type="checkbox" id="Vibrance" /></td><td><input ref={refVibrance} className='inputRange' onChange={setVibrance} type="range" min='-1' max='1' step='0.003921' defaultValue='0' /></td></tr>
               
                
                
               
                <tr><td><b>Blur:</b> </td><td><input onChange={setBlur} type="checkbox" id="blur" /></td><td><input ref={refBlur} className='inputRange' onChange={setBlur} type="range" min='0' max='1' step='0.1' defaultValue='0' /></td></tr>
                <tr><td><b>Black/White:</b></td><td>  <input onChange={setBlackwhite} type="checkbox" id="blackwhite" /></td><td></td></tr>
                <tr><td><b>Invert:</b></td><td>  <input onChange={setInvert} type="checkbox" id="Invert" /></td><td></td></tr>
                <tr><td><b>Sharpen:</b></td><td>  <input onChange={setSharpen} type="checkbox" id="Sharpen" /></td><td></td></tr>
                <tr><td><b>Emboss:</b></td><td>  <input onChange={setEmboss} type="checkbox" id="Emboss" /></td><td></td></tr>
                <tr><td><b>Sepia:</b></td><td>  <input onChange={setSepia} type="checkbox" id="Sepia" /></td><td></td></tr>
                <tr><td><b>Brownie:</b></td><td>  <input onChange={setBrownie} type="checkbox" id="Brownie" /></td><td></td></tr>
                <tr><td><b>Vintage:</b></td><td>  <input onChange={setVintage} type="checkbox" id="Vintage" /></td><td></td></tr>
                <tr><td><b>Kodachrome:</b></td><td>  <input onChange={(e)=>setFilter(e,18, new f.Kodachrome())} type="checkbox" id="Kodachrome" /></td><td></td></tr>
                
                
                
            </table>
        </div>
    )
}

export default ImageFilterController
