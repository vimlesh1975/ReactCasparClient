import React, { useRef } from 'react';
import { fabric } from "fabric";
// var filters = ['grayscale', 'invert', 'remove-color', 'sepia', 'brownie',
//     'brightness', 'contrast', 'saturation', 'vibrance', 'noise', 'vintage',
//     'pixelate', 'blur', 'sharpen', 'emboss', 'technicolor',
//     'polaroid', 'blend-color', 'gamma', 'kodachrome',
//     'blackwhite', 'blend-image', 'hue', 'resize'];

var f = fabric.Image.filters;
const ImageFilterController = ({ canvas }) => {
    const refBrightness = useRef();
    const refBlur = useRef();
    const refHue = useRef();
    const refPixelate = useRef();
    const refSaturation = useRef();
    const refContrast = useRef();
    const refNoise = useRef();
    const refVibrance = useRef();

    const applyFilter = (e, filterIndex, filterName) => {
        canvas.getActiveObjects().forEach(element => {
            if (element.type === 'image') {
                element.filters[filterIndex] = e.target.checked ? filterName : '';
                element.applyFilters();
                canvas.requestRenderAll();
            }
        });
    }
    const applyFilterValue = ( filterIndex, filterName, filterValue) => {
        canvas.getActiveObjects().forEach(element => {
            if (element.type === 'image') {
                if (element.filters[filterIndex]) {
                        element.filters[filterIndex][filterName] = filterValue;
                }
                element.applyFilters();
                canvas.requestRenderAll();
            }
        });
    }
    const removeFilter = () => {
        canvas.getActiveObjects().forEach(element => {
            if (element.type === 'image') {
                element.filters = []
                element.applyFilters();
                canvas.requestRenderAll();
            }
        });
    }
    return (
        <div>
            <table border='1'>
            <tr><td>Prperty</td><td><button onClick={removeFilter}  id="AllFlter" >All Remove</button></td><td>Value</td></tr>
                <tr><td><b>Brightness:</b></td><td><input onChange={e=>applyFilter(e,5,new f.Brightness({'brightness':refBrightness.current.value}))} type="checkbox" id="brightness" /></td><td><input ref={refBrightness} className='inputRange' onChange={()=>applyFilterValue(5,'brightness',refBrightness.current.value)} type="range" min='-1' max='1' step='0.1' defaultValue='0' /></td></tr>
                <tr><td><b>Blur:</b> </td><td><input onChange={e=>applyFilter(e,11,new f.Blur({'blur':refBlur.current.value}))} type="checkbox" id="blur" /></td><td><input ref={refBlur} className='inputRange' onChange={()=>applyFilterValue(11,'blur',refBlur.current.value)} type="range" min='0' max='1' step='0.1' defaultValue='0' /></td></tr>
                <tr><td><b>Hue:</b> </td><td><input onChange={e=>applyFilter(e,21,new f.HueRotation({'rotation':refHue.current.value}))} type="checkbox" id="hue" /></td><td><input ref={refHue} className='inputRange' onChange={()=>applyFilterValue(21,'rotation',refHue.current.value)} type="range" min='-2' max='2' step='0.002' defaultValue='0' /></td></tr>
                <tr><td><b>Contrast:</b> </td><td><input onChange={e=>applyFilter(e,6,new f.Contrast({'contrast':parseFloat(refContrast.current.value,10)}))} type="checkbox" id="Contrast" /></td><td><input ref={refContrast} className='inputRange' onChange={e=>applyFilterValue(6,'contrast',parseFloat(refContrast.current.value,10))} type="range" min='-1' max='1' step='0.003921' defaultValue='0' /></td></tr>
                <tr><td><b>Saturation:</b> </td><td><input onChange={e=>applyFilter(e,7,new f.Saturation({'saturation':parseFloat(refSaturation.current.value,10)}))} type="checkbox" id="Saturation" /></td><td><input ref={refSaturation} className='inputRange' onChange={e=>applyFilterValue(7,'saturation',parseFloat(refSaturation.current.value,10))} type="range" min='-1' max='1' step='0.003921' defaultValue='0' /></td></tr>
                <tr><td><b>Noise:</b> </td><td><input onChange={e=>applyFilter(e,9,new f.Noise({'noise':parseInt(refNoise.current.value,10)}))} type="checkbox" id="Noise" /></td><td><input ref={refNoise} className='inputRange' onChange={e=>applyFilterValue(9,'noise',parseInt(refNoise.current.value,10))} type="range" min='0' max='1000' step='1' defaultValue='0' /></td></tr>
                <tr><td><b>Pixelate:</b> </td><td><input onChange={e=>applyFilter(e,10,new f.Pixelate({'blocksize':parseInt(refPixelate.current.value,10)}))} type="checkbox" id="Pixelate" /></td><td><input ref={refPixelate} className='inputRange' onChange={()=>applyFilterValue(10,'blocksize',parseInt(refPixelate.current.value,10))} type="range" min='1' max='500' step='1' defaultValue='0' /></td></tr>
                <tr><td><b>Vibrance:</b> </td><td><input onChange={e=>applyFilter(e,8,new f.Vibrance({'vibrance':refVibrance.current.value}))} type="checkbox" id="Vibrance" /></td><td><input ref={refVibrance} className='inputRange' onChange={e=>applyFilterValue(8,'vibrance',refVibrance.current.value)} type="range" min='-1' max='1' step='0.003921' defaultValue='0' /></td></tr>
                <tr><td><b>Black/White:</b></td><td>  <input onChange={(e) => applyFilter(e, 19, new f.BlackWhite())} type="checkbox" id="blackwhite" /></td><td></td></tr>
                <tr><td><b>Invert:</b></td><td>  <input onChange={(e) => applyFilter(e, 1, new f.Invert())} type="checkbox" id="Invert" /></td><td></td></tr>
                <tr><td><b>Sharpen:</b></td><td>  <input onChange={(e) => applyFilter(e, 12, new f.Convolute({
                    matrix: [0, -1, 0,
                        -1, 5, -1,
                        0, -1, 0]
                }))} type="checkbox" id="Sharpen" /></td><td></td></tr>
                <tr><td><b>Emboss:</b></td><td>  <input onChange={(e) => applyFilter(e, 13, new f.Convolute({
                    matrix: [1, 1, 1,
                        1, 0.7, -1,
                        -1, -1, -1]
                }))} type="checkbox" id="Emboss" /></td><td></td></tr>
                <tr><td><b>Sepia:</b></td><td>  <input onChange={(e) => applyFilter(e, 3, new f.Sepia())} type="checkbox" id="Sepia" /></td><td></td></tr>
                <tr><td><b>Brownie:</b></td><td>  <input onChange={(e) => applyFilter(e, 4, new f.Brownie())} type="checkbox" id="Brownie" /></td><td></td></tr>
                <tr><td><b>Vintage:</b></td><td>  <input onChange={(e) => applyFilter(e, 9, new f.Vintage())} type="checkbox" id="Vintage" /></td><td></td></tr>
                <tr><td><b>Kodachrome:</b></td><td>  <input onChange={(e) => applyFilter(e, 18, new f.Kodachrome())} type="checkbox" id="Kodachrome" /></td><td></td></tr>
            </table>
        </div>
    )
}

export default ImageFilterController
