import React from 'react'
import { gsap } from 'gsap';
import { useSelector } from 'react-redux'
import { endpoint, templateLayers } from './common'
import { useState } from 'react';
const easeTypes = [
    "none",
    "power1.in",
    "power1.out",
    "power1.inOut",
    "power2.in",
    "power2.out",
    "power2.inOut",
    "power3.in",
    "power3.out",
    "power3.inOut",
    "power4.in",
    "power4.out",
    "power4.inOut",
    "linear",
    "back.in",
    "back.out",
    "back.inOut",
    "bounce.in",
    "bounce.out",
    "bounce.inOut",
    "elastic.in",
    "elastic.out",
    "elastic.inOut",
    "rough",
    "slow",
    "stepped",
    "circ.in",
    "circ.out",
    "circ.inOut",
    "expo.in",
    "expo.out",
    "expo.inOut",
    "sine.in",
    "sine.out",
    "sine.inOut"
];


const GsapPlayer = () => {
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const currentscreenSize = useSelector(state => state.currentscreenSizeReducer.currentscreenSize);

    const [duration, setDuration] = useState(0.5);
    const [stagger, setStagger] = useState(0.03);
    const [ease, setEase] = useState('power2.out');


    const preview = canvas => {
        const sortedElements = Array.from(canvas.getObjects()).sort(function (a, b) { return a.top - b.top; });
        // gsap.from(sortedElements, { duration: duration, left: -2100, ease: ease, stagger: stagger, onUpdate: () => { canvas.requestRenderAll(); } });
        var tl = gsap.timeline();
        tl.pause();
        tl.from(sortedElements, { duration: duration, left: -2100, ease: ease, stagger: stagger, onUpdate: () => { canvas.requestRenderAll(); }  });
        tl.play();

        // setTimeout(() => {
        //     tl.reverse();
        //   }, 8000);

    }

    const testGsapCaspar = (canvas, layerNumber) => {
        const content = JSON.stringify(canvas.toJSON(['id', 'class', 'selectable']));
        const contentforcasparcg = content.replaceAll('"', '\\"').replaceAll('\\n', ' \\\n');

        endpoint(`play 1-${layerNumber} [html] "http://localhost:10000/ReactCasparClient/CanvasPlayer"`);
        endpoint(`call 1-${layerNumber} "
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
        window.tl = gsap.timeline();
        tl.pause();
        tl.from(sortedElements, { duration: ${duration}, left:-2100, ease: '${ease}', stagger:${stagger}, onUpdate: () => { canvas.requestRenderAll(); } });
            setTimeout(() => {
                document.body.style.opacity = 1;
            }, 50);
        });
        tl.play();
        "`)
    }
    const stopGsapLayer = (layerNumber) => {
        endpoint(`call 1-${layerNumber} "
        tl.reverse();
        "`)
    }
    return (
        <div>
            <div>
                <span>Duration:</span><input type="number" value={duration} step={0.1} style={{ width: 60 }} onChange={e => setDuration(e.target.value)} />
                <span>stagger:</span><input type="number" value={stagger} step={0.01} style={{ width: 60 }} onChange={e => setStagger(e.target.value)} />
                <span> ease: </span> <select onChange={e => setEase(e.target.value)} value={ease}>
                    {easeTypes.map((val, i) => { return <option key={i} value={val}>{val}</option> })}
                </select>
            </div>
            <button onClick={() => preview(canvas)}>Preview</button>
            <button onClick={() => testGsapCaspar(canvas, templateLayers.gsap)}>Play to Caspar</button>
            <button onClick={() => stopGsapLayer(templateLayers.gsap)}>Stop</button>
        </div>
    )
}

export default GsapPlayer