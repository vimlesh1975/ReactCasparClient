import React, { useState, useRef } from "react";
import { endpoint, stopGraphics, templateLayers, executeScript } from "./common";
import { useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid';
import { selectAll } from './common';
import "pattern.css";

const ColorPattern = () => {
    const refPattern = useRef();
    const refcopiedDiv = useRef();

    const [color1, setColor1] = useState('#0C7A90');
    const [color2, setColor2] = useState('#08A974');
    const [color2Transparent, setColor2Transparent] = useState(true);
    const [patternSize, setPatternSize] = useState('lg');
    const patternSizes = ['sm', 'md', 'lg', 'xl']
    const [patternType, setPatternType] = useState('diagonal-stripes');
    const patternTypes = ['checks', 'grid', 'dots', 'cross-dots', 'diagonal-lines', 'horizontal-lines', 'vertical-lines', 'diagonal-stripes', 'horizontal-stripes', 'vertical-stripes', 'triangles', 'zigzag']

    const currentscreenSize = useSelector(state => state.currentscreenSizeReducer.currentscreenSize);
    const canvas = useSelector(state => state.canvasReducer.canvas);

    const sendPattern = (layerNumber) => {
        const classPattern = '.pattern-checks-sm{background-image:repeating-linear-gradient(45deg, currentColor 25%, transparent 25%, transparent 75%, currentColor 75%, currentColor),repeating-linear-gradient(45deg, currentColor 25%, transparent 25%, transparent 75%, currentColor 75%, currentColor);background-position:0 0,10px 10px;background-size:calc(2 * 10px) calc(2 * 10px)}.pattern-checks-md{background-image:repeating-linear-gradient(45deg, currentColor 25%, transparent 25%, transparent 75%, currentColor 75%, currentColor),repeating-linear-gradient(45deg, currentColor 25%, transparent 25%, transparent 75%, currentColor 75%, currentColor);background-position:0 0,25px 25px;background-size:calc(2 * 25px) calc(2 * 25px)}.pattern-checks-lg{background-image:repeating-linear-gradient(45deg, currentColor 25%, transparent 25%, transparent 75%, currentColor 75%, currentColor),repeating-linear-gradient(45deg, currentColor 25%, transparent 25%, transparent 75%, currentColor 75%, currentColor);background-position:0 0,50px 50px;background-size:calc(2 * 50px) calc(2 * 50px)}.pattern-checks-xl{background-image:repeating-linear-gradient(45deg, currentColor 25%, transparent 25%, transparent 75%, currentColor 75%, currentColor),repeating-linear-gradient(45deg, currentColor 25%, transparent 25%, transparent 75%, currentColor 75%, currentColor);background-position:0 0,100px 100px;background-size:calc(2 * 100px) calc(2 * 100px)}.pattern-grid-sm{background-image:linear-gradient(currentColor 1px, transparent 1px),linear-gradient(to right, currentColor 1px, transparent 1px);background-size:10px 10px}.pattern-grid-md{background-image:linear-gradient(currentColor 1px, transparent 1px),linear-gradient(to right, currentColor 1px, transparent 1px);background-size:25px 25px}.pattern-grid-lg{background-image:linear-gradient(currentColor 1px, transparent 1px),linear-gradient(to right, currentColor 1px, transparent 1px);background-size:50px 50px}.pattern-grid-xl{background-image:linear-gradient(currentColor 1px, transparent 1px),linear-gradient(to right, currentColor 1px, transparent 1px);background-size:100px 100px}.pattern-dots-sm{background-image:radial-gradient(currentColor .5px, transparent .5px);background-size:calc(10 * .5px) calc(10 * .5px)}.pattern-dots-md{background-image:radial-gradient(currentColor 1px, transparent 1px);background-size:calc(10 * 1px) calc(10 * 1px)}.pattern-dots-lg{background-image:radial-gradient(currentColor 1.5px, transparent 1.5px);background-size:calc(10 * 1.5px) calc(10 * 1.5px)}.pattern-dots-xl{background-image:radial-gradient(currentColor 2px, transparent 2px);background-size:calc(10 * 2px) calc(10 * 2px)}.pattern-cross-dots-sm{background-image:radial-gradient(currentColor .5px, transparent .5px),radial-gradient(currentColor .5px, transparent .5px);background-size:calc(20 * .5px) calc(20 * .5px);background-position:0 0,calc(10 * .5px) calc(10 * .5px)}.pattern-cross-dots-md{background-image:radial-gradient(currentColor 1px, transparent 1px),radial-gradient(currentColor 1px, transparent 1px);background-size:calc(20 * 1px) calc(20 * 1px);background-position:0 0,calc(10 * 1px) calc(10 * 1px)}.pattern-cross-dots-lg{background-image:radial-gradient(currentColor 1.5px, transparent 1.5px),radial-gradient(currentColor 1.5px, transparent 1.5px);background-size:calc(20 * 1.5px) calc(20 * 1.5px);background-position:0 0,calc(10 * 1.5px) calc(10 * 1.5px)}.pattern-cross-dots-xl{background-image:radial-gradient(currentColor 2px, transparent 2px),radial-gradient(currentColor 2px, transparent 2px);background-size:calc(20 * 2px) calc(20 * 2px);background-position:0 0,calc(10 * 2px) calc(10 * 2px)}.pattern-vertical-lines-sm{background-image:repeating-linear-gradient(to right, currentColor, currentColor 1px, transparent 1px, transparent);background-size:10px 10px}.pattern-horizontal-lines-sm{background-image:repeating-linear-gradient(0deg, currentColor, currentColor 1px, transparent 1px, transparent);background-size:10px 10px}.pattern-diagonal-lines-sm{background-image:repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%);background-size:10px 10px}.pattern-vertical-lines-md{background-image:repeating-linear-gradient(to right, currentColor, currentColor 1px, transparent 1px, transparent);background-size:25px 25px}.pattern-horizontal-lines-md{background-image:repeating-linear-gradient(0deg, currentColor, currentColor 1px, transparent 1px, transparent);background-size:25px 25px}.pattern-diagonal-lines-md{background-image:repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%);background-size:25px 25px}.pattern-vertical-lines-lg{background-image:repeating-linear-gradient(to right, currentColor, currentColor 1px, transparent 1px, transparent);background-size:50px 50px}.pattern-horizontal-lines-lg{background-image:repeating-linear-gradient(0deg, currentColor, currentColor 1px, transparent 1px, transparent);background-size:50px 50px}.pattern-diagonal-lines-lg{background-image:repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%);background-size:50px 50px}.pattern-vertical-lines-xl{background-image:repeating-linear-gradient(to right, currentColor, currentColor 1px, transparent 1px, transparent);background-size:100px 100px}.pattern-horizontal-lines-xl{background-image:repeating-linear-gradient(0deg, currentColor, currentColor 1px, transparent 1px, transparent);background-size:100px 100px}.pattern-diagonal-lines-xl{background-image:repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%);background-size:100px 100px}.pattern-vertical-stripes-sm{background-image:linear-gradient(90deg, transparent 50%, currentColor 50%);background-size:10px 10px}.pattern-horizontal-stripes-sm{background-image:linear-gradient(0deg, transparent 50%, currentColor 50%);background-size:10px 10px}.pattern-diagonal-stripes-sm{background:repeating-linear-gradient(45deg, transparent, transparent 10px, currentColor 10px, currentColor calc(2 * 10px))}.pattern-vertical-stripes-md{background-image:linear-gradient(90deg, transparent 50%, currentColor 50%);background-size:25px 25px}.pattern-horizontal-stripes-md{background-image:linear-gradient(0deg, transparent 50%, currentColor 50%);background-size:25px 25px}.pattern-diagonal-stripes-md{background:repeating-linear-gradient(45deg, transparent, transparent 25px, currentColor 25px, currentColor calc(2 * 25px))}.pattern-vertical-stripes-lg{background-image:linear-gradient(90deg, transparent 50%, currentColor 50%);background-size:50px 50px}.pattern-horizontal-stripes-lg{background-image:linear-gradient(0deg, transparent 50%, currentColor 50%);background-size:50px 50px}.pattern-diagonal-stripes-lg{background:repeating-linear-gradient(45deg, transparent, transparent 50px, currentColor 50px, currentColor calc(2 * 50px))}.pattern-vertical-stripes-xl{background-image:linear-gradient(90deg, transparent 50%, currentColor 50%);background-size:100px 100px}.pattern-horizontal-stripes-xl{background-image:linear-gradient(0deg, transparent 50%, currentColor 50%);background-size:100px 100px}.pattern-diagonal-stripes-xl{background:repeating-linear-gradient(45deg, transparent, transparent 100px, currentColor 100px, currentColor calc(2 * 100px))}.pattern-zigzag-sm{background:linear-gradient(135deg, currentColor 25%, transparent 25%) -10px 0,linear-gradient(225deg, currentColor 25%, transparent 25%) -10px 0,linear-gradient(315deg, currentColor 25%, transparent 25%),linear-gradient(45deg, currentColor 25%, transparent 25%);background-size:calc(2 * 10px) calc(2 * 10px)}.pattern-zigzag-md{background:linear-gradient(135deg, currentColor 25%, transparent 25%) -25px 0,linear-gradient(225deg, currentColor 25%, transparent 25%) -25px 0,linear-gradient(315deg, currentColor 25%, transparent 25%),linear-gradient(45deg, currentColor 25%, transparent 25%);background-size:calc(2 * 25px) calc(2 * 25px)}.pattern-zigzag-lg{background:linear-gradient(135deg, currentColor 25%, transparent 25%) -50px 0,linear-gradient(225deg, currentColor 25%, transparent 25%) -50px 0,linear-gradient(315deg, currentColor 25%, transparent 25%),linear-gradient(45deg, currentColor 25%, transparent 25%);background-size:calc(2 * 50px) calc(2 * 50px)}.pattern-zigzag-xl{background:linear-gradient(135deg, currentColor 25%, transparent 25%) -100px 0,linear-gradient(225deg, currentColor 25%, transparent 25%) -100px 0,linear-gradient(315deg, currentColor 25%, transparent 25%),linear-gradient(45deg, currentColor 25%, transparent 25%);background-size:calc(2 * 100px) calc(2 * 100px)}.pattern-triangles-sm{background-image:linear-gradient(45deg, currentColor 50%, transparent 50%);background-size:10px 10px}.pattern-triangles-md{background-image:linear-gradient(45deg, currentColor 50%, transparent 50%);background-size:25px 25px}.pattern-triangles-lg{background-image:linear-gradient(45deg, currentColor 50%, transparent 50%);background-size:50px 50px}.pattern-triangles-xl{background-image:linear-gradient(45deg, currentColor 50%, transparent 50%);background-size:100px 100px}.text-pattern{-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}.pattern-w-sm{width:10px}.pattern-h-sm{height:10px}.pattern-w-md{width:25px}.pattern-h-md{height:25px}.pattern-w-lg{width:50px}.pattern-h-lg{height:50px}.pattern-w-xl{width:100px}.pattern-h-xl{height:100px}'
        refcopiedDiv.current.innerHTML = '';
        var clone = refPattern.current.cloneNode(true);
        refcopiedDiv.current.append(clone);
        const inAnimation = `@keyframes example {from {height:-50%} to {height:-20%}} @keyframes example2 {to {width:0%}} div {animation: example 0.2s forwards }`

        setTimeout(() => {
            endpoint(`play ${window.chNumber}-${layerNumber} [HTML] https://localhost:10000/ReactCasparClient/xyz.html`);
            endpoint(`play ${window.chNumber}-${layerNumber + 1} [HTML] https://localhost:10000/ReactCasparClient/xyz.html`);
        }, 250);

        canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
        selectAll(canvas);
        var br = (canvas.getActiveObject())?.getBoundingRect();
        executeScript(`document.getElementById('divid_${layerNumber}')?.remove();`);
        executeScript(`document.getElementById('divid_${layerNumber + 1}')?.remove();`);

        setTimeout(() => {
            endpoint(`call ${window.chNumber}-${layerNumber} "
            var bb = document.createElement('div');
            bb.style.perspective='1920px';
            bb.style.transformStyle='preserve-3d';
            document.body.appendChild(bb);
            var aa = document.createElement('div');
            aa.setAttribute('id','divid_' + '${layerNumber}');
            aa.style.zIndex = ${layerNumber};
            aa.style.position='absolute';
            aa.innerHTML='${(refcopiedDiv.current.innerHTML).replaceAll('"', '\\"')}';
            bb.appendChild(aa);
            document.body.style.margin='0';
            document.body.style.padding='0';
            aa.style.zoom=(${currentscreenSize * 1000}/1920)+'%';
            aa.style.left='${(br.left / 10) - 2}px';
            aa.style.top='${(br.top / 10) - 2}px';
            aa.style.width='10% !important';
            aa.style.height='10% !important';
            document.body.style.overflow='hidden';
            var style = document.createElement('style');
            style.textContent ='${classPattern} ${inAnimation}';
            document.head.appendChild(style);
            "`);
        }, 300);

        setTimeout(() => {
            endpoint(`call ${window.chNumber}-${layerNumber + 1} "
            var bb = document.createElement('div');
            bb.style.perspective='1920px';
            bb.style.transformStyle='preserve-3d';
            document.body.appendChild(bb);
            var aa = document.createElement('div');
            aa.setAttribute('id','divid_' + '${layerNumber + 1}');
            aa.style.zIndex = ${layerNumber + 1};
            aa.style.position='absolute';
            aa.innerHTML=\`'${(canvas.toSVG()).replaceAll('"', '\\"')}'\`;
            bb.appendChild(aa);
            document.body.style.margin='0';
            document.body.style.padding='0';
            aa.style.zoom=(${currentscreenSize * 100}/1920)+'%';
            document.body.style.overflow='hidden';
            var style = document.createElement('style');
            style.textContent ='${classPattern} ${inAnimation}';
            document.head.appendChild(style);
            "`);
        }, 300);

    }


    return (<>
        <div>
            <b>pattern Type</b><select onChange={e => setPatternType(e.target.value)} value={patternType}>
                {patternTypes.map((val) => { return <option key={uuidv4()} value={val}>{val}</option> })}
            </select>
            <b>Size</b><select onChange={e => setPatternSize(e.target.value)} value={patternSize}>
                {patternSizes.map((val) => { return <option key={uuidv4()} value={val}>{val}</option> })}
            </select>

            <div style={{ border: '1px solid red' }}>
                Color1: <input type='color' value={color1} onChange={e => setColor1(e.target.value)} />
                Color2 <input type='color' value={color2} onChange={e => setColor2(e.target.value)} />
                <label> <input type="checkbox" checked={color2Transparent} onChange={() => setColor2Transparent(!color2Transparent)} />Transparent</label>
            </div>


            <button onClick={() => sendPattern(templateLayers.patternLayer)}>Play</button>
            <button onClick={() => {
                stopGraphics(templateLayers.patternLayer);
                stopGraphics(templateLayers.patternLayer + 1);
            }}>Stop</button>
        </div>
        <div
            ref={refPattern}
            style={{
                width: 192,
                height: 108,
                color: color1,
                backgroundColor: color2Transparent ? "transparent" : color2

            }}
            className={"pattern-" + patternType + "-" + patternSize}
        >


        </div>


        <div style={{ display: 'none' }} ref={refcopiedDiv}>

        </div>

    </>)
}

export default ColorPattern