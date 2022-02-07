import React, { useState, useRef } from "react";
// import { useEffect } from "react";
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { endpoint } from './common';
import { fabric } from "fabric";

function colorMix(color_1, color_2, weight) {
  var d2h = function (d) { return d.toString(16); }  // convert a decimal value to hex
  var h2d = function (h) { return parseInt(h, 16); }  // convert a hex value to decimal 
  weight = (typeof (weight) !== 'undefined') ? weight : 50; // set the weight to 50%, if that argument is omitted
  var color = '#';
  for (var i = 0; i <= 5; i += 2) { // loop through each of the 3 hex pairs—red, green, and blue
    var v1 = h2d(color_1.substr(i, 2)), // extract the current pairs
      v2 = h2d(color_2.substr(i, 2)), // combine the current pairs from each source color, according to the specified weight
      val = d2h(Math.floor(v2 + (v1 - v2) * (weight / 100.0)));
    while (val.length < 2) { val = '0' + val; } // prepend a '0' if val results in a single digit
    color += val; // concatenate val to our new color string
  }
  return color;
};

const TimeLine1 = () => {
  const canvas = useSelector(state => state.canvasReducer.canvas);
  const layers = useSelector(state => state.canvasReducer.canvas?.getObjects());
  const [keyFrames, setkeyFrames] = useState({ initial: { left: 50, top: 50, fill: '#00ff00', scaleX: .2 }, final: { left: 500, top: 500, fill: '#0000ff', scaleX: 1 } })
  const refCanvasItem = useRef([]);
  refCanvasItem.current = [];

  const addtoRefs = el => {
    if (el && !refCanvasItem.current.includes(el)) {
      refCanvasItem.current.push(el);
    }
  }

  const aa = (e) => {
    try {
      const val = parseInt(e.target.value);
      const factor = (val - keyFrames.initial.left) * 100 / Math.abs(keyFrames.initial.left - keyFrames.final.left);
      canvas?.item(e.target.getAttribute('key1')).set({ left: val, top: (keyFrames.initial.top + (keyFrames.final.top - keyFrames.initial.top) * factor / 100), fill: colorMix(keyFrames.final.fill.substring(1), keyFrames.initial.fill.substring(1), factor), scaleX: keyFrames.initial.scaleX + (keyFrames.final.scaleX - keyFrames.initial.scaleX) * factor / 100 });
      canvas?.requestRenderAll();
    } catch (error) {
      console.log(error);
    }

  }

  const setInitial = (i) => {
    setkeyFrames({ ...keyFrames, initial: { ...keyFrames.initial, left: canvas?.item(i).left, top: canvas?.item(i).top, fill: canvas?.item(i).fill, scaleX: canvas?.item(i).scaleX } })
  }

  const setFinal = (i) => {
    setkeyFrames({ ...keyFrames, final: { ...keyFrames.final, left: canvas?.item(i).left, top: canvas?.item(i).top, fill: canvas?.item(i).fill, scaleX: canvas?.item(i).scaleX } })
  }

  const preView = (i) => {
    canvas?.item(i).set({ left: keyFrames.initial.left, top: keyFrames.initial.top, fill: keyFrames.initial.fill, scaleX: keyFrames.initial.scaleX });
    canvas?.item(i).animate('left', keyFrames.final.left, {
      onChange: canvas.renderAll.bind(canvas),
      duration: 1000,
      easing: fabric.util.ease.linear
    });
    canvas?.item(i).animate('top', keyFrames.final.top, {
      onChange: canvas.renderAll.bind(canvas),
      duration: 1000,
      easing: fabric.util.ease.linear
    });
    canvas?.item(i).animate('fill', keyFrames.final.fill, {
      onChange: canvas.renderAll.bind(canvas),
      duration: 1000,
      easing: fabric.util.ease.linear
    });
    canvas?.item(i).animate('scaleX', keyFrames.final.scaleX, {
      onChange: canvas.renderAll.bind(canvas),
      duration: 1000,
      easing: fabric.util.ease.linear
    });
  }

  const allPreview = () => {
    layers.forEach((element, i) => {
      preView(i);
      preView(i)
    });


  }

  const playtocasparcg = () => {

    canvas?.item(0).set({ left: keyFrames.final.left, top: keyFrames.final.top, fill: keyFrames.final.fill, scaleX: keyFrames.final.scaleX });
    canvas?.requestRenderAll();
    const inAnimation1 = `@keyframes example 
    {
    from {transform:translateX(${keyFrames.initial.left - keyFrames.final.left}px) translateY(${keyFrames.initial.top - keyFrames.final.top}px);opacity:0);fill:${keyFrames.initial.fill};width:${canvas?.item(0).width * keyFrames.initial.scaleX}}
    to {transform:translateX(0px) translateY(0px);opacity:1; fill:${keyFrames.final.fill}; width:${canvas?.item(0).width * keyFrames.final.scaleX}}
    } 
  rect, text {animation-name: example;  animation-duration: 1s;animation-timing-function:linear; }
  `
    setTimeout(() => {
      endpoint(`play ${window.chNumber}-${108} [html] xyz.html`);
      endpoint(`call ${window.chNumber}-${108} "
  var aa = document.createElement('div');
  aa.style.position='absolute';
  aa.innerHTML='${(canvas.toSVG()).replaceAll('"', '\\"')}';
  document.body.appendChild(aa);
  document.body.style.margin='0';
  document.body.style.padding='0';
  aa.style.zoom=(${1920 * 100}/1024)+'%';
  document.body.style.overflow='hidden';
  var style = document.createElement('style');
  style.textContent = '${inAnimation1}';
  document.head.appendChild(style);
  "`);
    }, 10);

  }
  return (<div>

    {layers?.map((element, i) => {
      return (<div key={uuidv4()} >
        {element.type}<input ref={addtoRefs} key1={i} style={{ width: 500 }} onChange={e => aa(e)} type="range" min={keyFrames.initial.left} max={keyFrames.final.left} step={1} defaultValue={(keyFrames.initial.left + keyFrames.final.left) / 2} />
        <div style={{ width: 800, display: 'flex', justifyContent: 'space-around' }}>
          <div>
            <button onClick={() => setInitial(i)} >set Initial</button> <button onClick={e => {
              canvas?.item(i).set({ left: keyFrames.initial.left, top: keyFrames.initial.top, fill: keyFrames.initial.fill, scaleX: keyFrames.initial.scaleX });
              canvas?.requestRenderAll();
            }
            }>Go to{JSON.stringify(keyFrames.initial)}</button>  <button onClick={e => {
              canvas?.item(i).set({ left: keyFrames.final.left, top: keyFrames.final.top, fill: keyFrames.final.fill, scaleX: keyFrames.final.scaleX });
              canvas?.requestRenderAll();
            }
            }>Go to {JSON.stringify(keyFrames.final)}</button> <button onClick={() => setFinal(i)} >set Final</button>
          </div>
          <button onClick={() => preView(i)}>Preview</button>
        </div>
      </div>)
    })
    }
    <div>
    </div>
    <br /> <button onClick={allPreview}>All Preview</button>
    <br /> <button onClick={playtocasparcg}>Play to casparcg</button>
  </div>)

}

export default TimeLine1;