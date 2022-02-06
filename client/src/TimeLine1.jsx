import React, { useState, useRef } from "react";
// import { useEffect } from "react";
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { endpoint } from './common';
import { fabric } from "fabric";

const TimeLine1 = () => {
  const canvas = useSelector(state => state.canvasReducer.canvas);
  const layers = useSelector(state => state.canvasReducer.canvas?.getObjects());
  const [keyFrames, setkeyFrames] = useState({ initial: { left: -500, fill: 'green' }, final: { left: 500, fill: 'white' } })
  const refCanvasItem = useRef([]);
  refCanvasItem.current = [];

  const addtoRefs = el => {
    if (el && !refCanvasItem.current.includes(el)) {
      refCanvasItem.current.push(el);
    }
  }

  const aa = (e) => {
    const val = parseInt(e.target.value);

    canvas?.item(e.target.getAttribute('key1')).set({ left: val });
    // canvas?.item(e.target.getAttribute('key1')).set({ fill:val });
    canvas?.requestRenderAll();
  }

  const setInitial = () => {
    setkeyFrames({ ...keyFrames, initial: { ...keyFrames.initial, left: canvas?.item(0).left, fill: canvas?.item(0).fill } })
  }

  const setFinal = () => {
    setkeyFrames({ ...keyFrames, final: { ...keyFrames.final, left: canvas?.item(0).left, fill: canvas?.item(0).fill } })
  }

  const preView = () => {
    canvas?.item(0).set({ left: keyFrames.initial.left, fill: keyFrames.initial.fill });
    canvas?.item(0).animate('left', keyFrames.final.left, {
      onChange: canvas.renderAll.bind(canvas),
      duration: 1000,
      easing: fabric.util.ease.linear
    }
    );
    canvas?.item(0).animate('fill', keyFrames.final.fill, {
      onChange: canvas.renderAll.bind(canvas),
      duration: 1000,
      easing: fabric.util.ease.linear
    });
  }

  const playtocasparcg = () => {

    canvas?.item(0).set({ left: keyFrames.final.left, fill: keyFrames.final.fill });
    canvas?.requestRenderAll();
    const inAnimation1 = `@keyframes example 
    {
    from {transform:translateX(${keyFrames.initial.left - keyFrames.final.left}px);opacity:0);fill:${keyFrames.initial.fill}}
    to {transform:translateX(0px);opacity:100; fill:${keyFrames.final.fill}}
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
            <button onClick={() => setInitial()} >set Initial</button> <button onClick={e => {
              canvas?.item(i).set({ left: keyFrames.initial.left, fill: keyFrames.initial.fill });
              canvas?.requestRenderAll();
            }
            }>Go to{JSON.stringify(keyFrames.initial)}</button>  <button onClick={e => {
              canvas?.item(i).set({ left: keyFrames.final.left, fill: keyFrames.final.fill });
              canvas?.requestRenderAll();
            }
            }>Go to {JSON.stringify(keyFrames.final)}</button> <button onClick={() => setFinal()} >set Final</button>
          </div>
        </div>
      </div>)
    })
    }
    <div>
    </div>
    <button onClick={preView}>Preview</button>
    <br /> <button onClick={playtocasparcg}>Play to casparcg</button>
  </div>)

}

export default TimeLine1;