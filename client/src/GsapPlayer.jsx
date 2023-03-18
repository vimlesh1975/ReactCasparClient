import React from 'react'
import { gsap } from 'gsap';
import { useSelector } from 'react-redux'
import { endpoint, templateLayers, easeTypes, executeScript } from './common'
import { useState } from 'react';
import { FaPlay, FaStop } from "react-icons/fa";

const GsapPlayer = () => {
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const currentscreenSize = useSelector(state => state.currentscreenSizeReducer.currentscreenSize);
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

    const playtoGsapCaspar = (canvas, layerNumber) => {
        const content = JSON.stringify(canvas.toJSON(['id', 'class', 'selectable']));

        const contentforHtml = content.replaceAll('"', '\\"').replaceAll('\\n', '\\\\n');
        const contentforcasparcg = content.replaceAll('"', '\\"').replaceAll('\\n', ' \\\n');

        endpoint(`play ${window.chNumber}-${layerNumber} [html] "http://localhost:10000/ReactCasparClient/CanvasPlayer"`);
        const script = `
        var aa = document.createElement('div');
        aa.style.position='absolute';
        aa.setAttribute('id','divid_' + '${layerNumber}');
        document.body.style.opacity = 0;
        document.body.style.overflow='hidden';
        document.body.style.zoom=(${currentscreenSize * 100}/1920)+'%';
        aa.innerHTML += \`<canvas id='canvas' width='1920' height='1080'></canvas>;\`;
        document.body.appendChild(aa);
        var canvas = new fabric.Canvas('canvas');
        window.canvas=canvas;
        canvas.loadFromJSON(${contentforcasparcg},()=>{
            window.sortedElements = Array.from(canvas.getObjects()).sort(function (a, b) { return a.top - b.top; });
            tl.pause();
            tl.from(sortedElements, { duration: ${duration}, left:-2100, ease: '${ease}', stagger:${stagger}, onUpdate: () => { canvas.requestRenderAll(); } });
                setTimeout(() => {
                    document.body.style.opacity = 1;
                    tl.play();
                }, 100);
        });
        `
        setTimeout(() => {
            endpoint(`call ${window.chNumber}-${layerNumber} "${script}"`)
        }, 100);


        const scriptforHtml = `
        document.getElementById('divid_${layerNumber}')?.remove();
        var aa = document.createElement('div');
        aa.style.position='absolute';
        aa.setAttribute('id','divid_' + '${layerNumber}');
        document.body.style.opacity = 1;
        document.body.style.overflow='hidden';
        document.body.style.zoom=(${currentscreenSize * 100}/1920)+'%';
        aa.innerHTML += \`<canvas id='canvas_${layerNumber}' width='1920' height='1080'></canvas>;\`;
        document.body.appendChild(aa);
        var canvas_${layerNumber} = new fabric.Canvas('canvas_${layerNumber}');
       
        var content =\`${contentforHtml}\`;
        tl.pause();

        canvas_${layerNumber}.loadFromJSON(content,()=>{
            const sortedElements = Array.from(canvas_${layerNumber}.getObjects()).sort(function (a, b) { return a.top - b.top; });
            tl.from(sortedElements, { duration: ${duration}, left:-2100, ease: '${ease}', stagger:${stagger}, onUpdate: () => { canvas_${layerNumber}.requestRenderAll(); } });
            setTimeout(() => {
                document.body.style.opacity = 1;
                tl.play();
            }, 100);
        })
        `
        executeScript(scriptforHtml)
    }

    const stopGsapLayer = (layerNumber) => {
        const script=`
        tl.reverse();
        `;
        endpoint(`call 1-${layerNumber} "
        ${script}
        "`)
        executeScript(script);

    }

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
        document.getElementById('divid_${layerNumber}')?.remove();
        var aa = document.createElement('div');
        aa.style.position='absolute';
        aa.setAttribute('id','divid_' + '${layerNumber}');
        document.body.style.opacity = 1;
        document.body.style.overflow='hidden';
        document.body.style.zoom=(${currentscreenSize * 100}/1920)+'%';
        aa.innerHTML += \`<canvas id='canvas_${layerNumber}' width='1920' height='1080'></canvas>;\`;
        document.body.appendChild(aa);
        var canvas_${layerNumber} = new fabric.Canvas('canvas_${layerNumber}');
       
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
            <button onClick={() => playtoGsapCaspar(canvas, templateLayers.gsap)}><FaPlay /></button>
            <button onClick={() => updateCaspar(canvas, templateLayers.gsap)}>Update</button>
            <button onClick={() => stopGsapLayer(templateLayers.gsap)}><FaStop /></button>

            <div>
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