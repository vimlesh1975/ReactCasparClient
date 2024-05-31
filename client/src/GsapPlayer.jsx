import React from 'react'
import { gsap } from 'gsap';
import { useSelector } from 'react-redux'
import { endpoint, easeTypes, executeScript, playtoGsapCaspar, stopGsapLayer } from './common'
import { useState } from 'react';
import { FaPlay, FaStop } from "react-icons/fa";


const GsapPlayer = ({ layer1, inline }) => {
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const currentscreenSize = useSelector(
        (state) => state.currentscreenSizeReducer.currentscreenSize
    );
    const [duration, setDuration] = useState(1);
    const [stagger, setStagger] = useState(0.03);
    const [ease, setEase] = useState('back.inOut');
    const preview = canvas => {
        const sortedElements = Array.from(canvas.getObjects()).sort(function (a, b) { return a.top - b.top; });
        var tl = gsap.timeline();
        tl.pause();
        tl.from(sortedElements, { duration: duration, left: -2100, ease: ease, stagger: stagger, onUpdate: () => { canvas.requestRenderAll(); } });
        tl.play();
    }

    // const stopGsapLayer = (layerNumber) => {
    //     const scriptforhtml = `
    //     const sortedElements = Array.from(canvas_${layerNumber}.getObjects()).sort(function (a, b) { return a.top - b.top; });
    //     tl.to(sortedElements, { duration: ${duration}, left:-2100, ease: '${ease}', stagger:${stagger}, onUpdate: () => { canvas_${layerNumber}.requestRenderAll(); } });
    //         tl.play();
    //     `;
    //     executeScript(scriptforhtml);

    //     const scriptforCasparcg = `
    //     const sortedElements = Array.from(canvas.getObjects()).sort(function (a, b) { return a.top - b.top; });
    //     tl.to(sortedElements, { duration: ${duration}, left:-2100, ease: '${ease}', stagger:${stagger}, onUpdate: () => { canvas.requestRenderAll(); } });
    //         tl.play();
    //     `;

    //     endpoint(`call ${window.chNumber}-${layerNumber} "
    //     ${scriptforCasparcg}
    //     "`)

    // }

    const updateCaspar = (canvas, layerNumber) => {
        const content = JSON.stringify(canvas.toJSON(['id', 'class', 'selectable']));

        const contentforHtml = content.replaceAll('"', '\\"').replaceAll('\\n', '\\\\n');
        const contentforcasparcg = content.replaceAll('"', '\\"').replaceAll('\\n', ' \\\n');

        // endpoint(`play ${window.chNumber}-${layerNumber} [html] "http://localhost:10000/ReactCasparClient/CanvasPlayer"`);
        const script = `

        canvas.loadFromJSON(${contentforcasparcg},()=>{
           
        });
        `
        setTimeout(() => {
            endpoint(`call ${window.chNumber}-${layerNumber} "${script}"`)
        }, 100);


        const scriptforHtml = `
      
        var content =\`${contentforHtml}\`;

        canvas_${layerNumber}.loadFromJSON(content,()=>{
           
        })
        `
        executeScript(scriptforHtml)
    }

    return (
        <div>
            <b> GsapPlayer: </b>
            <button onClick={() => preview(canvas)}>Preview</button>
            <button onClick={() => playtoGsapCaspar(canvas, layer1, currentscreenSize, duration, ease, stagger)}><FaPlay /></button>
            <button onClick={() => updateCaspar(canvas, layer1)}>Update</button>
            <button onClick={() => stopGsapLayer(layer1, duration, ease, stagger)}><FaStop /></button>

            <div style={{ display: inline ? 'inline' : '' }}>
                <span>Duration:</span><input type="number" value={duration} step={0.1} style={{ width: 45 }} onChange={e => setDuration(e.target.value)} />
                <span>stagger:</span><input type="number" value={stagger} step={0.01} style={{ width: 45 }} onChange={e => setStagger(e.target.value)} />
                <span> ease: </span> <select onChange={e => setEase(e.target.value)} value={ease}>
                    {easeTypes.map((val, i) => { return <option key={i} value={val}>{val}</option> })}
                </select>
            </div>


        </div>
    )
}

export default GsapPlayer