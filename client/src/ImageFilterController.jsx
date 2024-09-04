import React, { useRef } from 'react';
import * as fabric from 'fabric';
import { useSelector } from 'react-redux';

const ImageFilterController = () => {
    const canvas = useSelector(state => state.canvasReducer.canvas);

    const refBrightness = useRef();
    const refBlur = useRef();
    const refHue = useRef();
    const refPixelate = useRef();
    const refSaturation = useRef();
    const refContrast = useRef();
    const refNoise = useRef();
    const refVibrance = useRef();
    const refColorRemove = useRef();
    const refDistance = useRef();

    const removeFilter = () => {
        canvas.getActiveObjects().forEach(element => {
            if (element.type === 'image') {
                element.filters = [];
                element.applyFilters();
                canvas.requestRenderAll();
            }
        });
    }

    const applyFilter = (e, filterIndex, FilterClass, options = {}) => {
        canvas.getActiveObjects().forEach(element => {
            if (element.type === 'image') {
                if (e.target.checked) {
                    element.filters[filterIndex] = new FilterClass(options);
                } else {
                    element.filters[filterIndex] = undefined;
                }
                element.applyFilters();
                canvas.requestRenderAll();
            }
        });
    }

    const applyFilterValue = (filterIndex, optionName, value) => {
        canvas.getActiveObjects().forEach(element => {
            if (element.type === 'image' && element.filters[filterIndex]) {
                element.filters[filterIndex][optionName] = value;
                element.applyFilters();
                canvas.requestRenderAll();
            }
        });
    }

    return (
        <div>
            <div style={{}}>
                <table border='1'>
                    <tbody>
                        <tr>
                            <td>Property</td>
                            <td><button onClick={removeFilter} id="AllFlter">All Remove</button></td>
                            <td>Value</td>
                        </tr>
                        <tr>
                            <td><b>Brightness:</b></td>
                            <td><label><input onChange={e => applyFilter(e, 5, fabric.filters.Brightness, { brightness: refBrightness.current.value })} type="checkbox" /></label></td>
                            <td><input ref={refBrightness} type="range" min='-1' max='1' step='0.1' defaultValue='0' onChange={() => applyFilterValue(5, 'brightness', refBrightness.current.value)} /></td>
                        </tr>
                        <tr>
                            <td><b>Blur:</b></td>
                            <td><label><input onChange={e => applyFilter(e, 11, fabric.filters.Blur, { blur: refBlur.current.value })} type="checkbox" /></label></td>
                            <td><input ref={refBlur} type="range" min='0' max='1' step='0.1' defaultValue='0' onChange={() => applyFilterValue(11, 'blur', refBlur.current.value)} /></td>
                        </tr>
                        <tr>
                            <td><b>Hue:</b></td>
                            <td><label><input onChange={e => applyFilter(e, 21, fabric.filters.HueRotation, { rotation: refHue.current.value })} type="checkbox" /></label></td>
                            <td><input ref={refHue} type="range" min='-2' max='2' step='0.002' defaultValue='0' onChange={() => applyFilterValue(21, 'rotation', refHue.current.value)} /></td>
                        </tr>
                        <tr>
                            <td><b>Contrast:</b></td>
                            <td><label><input onChange={e => applyFilter(e, 6, fabric.filters.Contrast, { contrast: parseFloat(refContrast.current.value, 10) })} type="checkbox" /></label></td>
                            <td><input ref={refContrast} type="range" min='-1' max='1' step='0.003921' defaultValue='0' onChange={() => applyFilterValue(6, 'contrast', parseFloat(refContrast.current.value, 10))} /></td>
                        </tr>
                        <tr>
                            <td><b>Saturation:</b></td>
                            <td><label><input onChange={e => applyFilter(e, 7, fabric.filters.Saturation, { saturation: parseFloat(refSaturation.current.value, 10) })} type="checkbox" /></label></td>
                            <td><input ref={refSaturation} type="range" min='-1' max='1' step='0.003921' defaultValue='0' onChange={() => applyFilterValue(7, 'saturation', parseFloat(refSaturation.current.value, 10))} /></td>
                        </tr>
                        <tr>
                            <td><b>Noise:</b></td>
                            <td><label><input onChange={e => applyFilter(e, 9, fabric.filters.Noise, { noise: parseInt(refNoise.current.value, 10) })} type="checkbox" /></label></td>
                            <td><input ref={refNoise} type="range" min='0' max='1000' step='1' defaultValue='0' onChange={() => applyFilterValue(9, 'noise', parseInt(refNoise.current.value, 10))} /></td>
                        </tr>
                        <tr>
                            <td><b>Pixelate:</b></td>
                            <td><label><input onChange={e => applyFilter(e, 10, fabric.filters.Pixelate, { blocksize: parseInt(refPixelate.current.value, 10) })} type="checkbox" /></label></td>
                            <td><input ref={refPixelate} type="range" min='1' max='500' step='1' defaultValue='0' onChange={() => applyFilterValue(10, 'blocksize', parseInt(refPixelate.current.value, 10))} /></td>
                        </tr>
                        <tr>
                            <td><b>Vibrance:</b></td>
                            <td><label><input onChange={e => applyFilter(e, 8, fabric.filters.Vibrance, { vibrance: refVibrance.current.value })} type="checkbox" /></label></td>
                            <td><input ref={refVibrance} type="range" min='-1' max='1' step='0.003921' defaultValue='0' onChange={() => applyFilterValue(8, 'vibrance', refVibrance.current.value)} /></td>
                        </tr>
                        <tr>
                            <td><b>Remove Color:</b></td>
                            <td><label><input onChange={e => applyFilter(e, 2, fabric.filters.RemoveColor, { color: refColorRemove.current.value, distance: refDistance.current.value })} type="checkbox" /></label><input ref={refColorRemove} type='color' onChange={() => applyFilterValue(2, 'color', refColorRemove.current.value)} /></td>
                            <td><input ref={refDistance} type="range" min='0' max='1' step='0.01' defaultValue='0' onChange={() => applyFilterValue(2, 'distance', refDistance.current.value)} /></td>
                        </tr>
                        <tr>
                            <td><b>Black/White:</b></td>
                            <td><label><input onChange={e => applyFilter(e, 19, fabric.filters.BlackWhite)} type="checkbox" /></label></td>
                        </tr>
                        <tr>
                            <td><b>Invert:</b></td>
                            <td><label><input onChange={e => applyFilter(e, 1, fabric.filters.Invert)} type="checkbox" /></label></td>
                        </tr>
                        <tr>
                            <td><b>Sharpen:</b></td>
                            <td><label><input onChange={e => applyFilter(e, 12, fabric.filters.Convolute, { matrix: [0, -1, 0, -1, 5, -1, 0, -1, 0] })} type="checkbox" /></label></td>
                        </tr>
                        <tr>
                            <td><b>Emboss:</b></td>
                            <td><label><input onChange={e => applyFilter(e, 13, fabric.filters.Convolute, { matrix: [1, 1, 1, 1, 0.7, -1, -1, -1, -1] })} type="checkbox" /></label></td>
                        </tr>
                        <tr>
                            <td><b>Emboss (Alt):</b></td>
                            <td><label><input onChange={e => applyFilter(e, 14, fabric.filters.Convolute, { matrix: [-2, -1, 0, -1, 1, 1, 0, 1, 2] })} type="checkbox" /></label></td>
                        </tr>
                        <tr>
                            <td><b>Brownie:</b></td>
                            <td><label><input onChange={e => applyFilter(e, 15, fabric.filters.Brownie)} type="checkbox" /></label></td>
                        </tr>
                        <tr>
                            <td><b>Vintage:</b></td>
                            <td><label><input onChange={e => applyFilter(e, 16, fabric.filters.Vintage)} type="checkbox" /></label></td>
                        </tr>
                        <tr>
                            <td><b>Kodachrome:</b></td>
                            <td><label><input onChange={e => applyFilter(e, 17, fabric.filters.Kodachrome)} type="checkbox" /></label></td>
                        </tr>
                        <tr>
                            <td><b>Technicolor:</b></td>
                            <td><label><input onChange={e => applyFilter(e, 18, fabric.filters.Technicolor)} type="checkbox" /></label></td>
                        </tr>
                        <tr>
                            <td><b>Polaroid:</b></td>
                            <td><label><input onChange={e => applyFilter(e, 20, fabric.filters.Polaroid)} type="checkbox" /></label></td>
                        </tr>
                        <tr>
                            <td><b>Sepia:</b></td>
                            <td><label><input onChange={e => applyFilter(e, 3, fabric.filters.Sepia)} type="checkbox" /></label></td>
                        </tr>
                        <tr>
                            <td><b>Gamma:</b></td>
                            <td><label><input onChange={e => applyFilter(e, 4, fabric.filters.Gamma, { gamma: [0.2, 0.4, 0.8] })} type="checkbox" /></label></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ImageFilterController;
