import React, { useState, useRef } from "react";
// import { useEffect } from "react";
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { endpoint } from './common'

var interval;
var left = 0;
const TimeLine1 = () => {
  const canvas = useSelector(state => state.canvasReducer.canvas);
  const layers = useSelector(state => state.canvasReducer.canvas?.getObjects());
  // var aaa=[layers.length];

  // const canvasList = useSelector(state => state.canvasListReducer.canvasList);
  // const [left, setLeft] = useState(0)

  const [keyFrames, setkeyFrames] = useState({ keyFrame0: [{initial:0},{ final:500}], keyFrame1: [{initial:0},{ final:500}] })
  const refCanvasItem = useRef([]);
  refCanvasItem.current = [];

  const addtoRefs = el => {
    if (el && !refCanvasItem.current.includes(el)) {
      refCanvasItem.current.push(el);
    }
  }


  // useEffect(()=>{
  //  console.log(aaa);  
  // //  setkeyFrames([...layers])
  // },[aaa])

  const aa = (e) => {
    left = parseInt(e.target.value);
    canvas?.item(e.target.getAttribute('key1')).set({ left: parseInt(e.target.value) });
    // console.log((refCanvasItem.current[e.target.getAttribute('key1')]?.value));
    canvas?.requestRenderAll();
  }
  const setInitial = (i) => {
    if (i === 0) {
      setkeyFrames({ ...keyFrames, keyFrame0: [...keyFrames.keyFrame0, { initial: left }] })
    }
    else {
      setkeyFrames({ ...keyFrames, keyFrame1: [...keyFrames.keyFrame1, { initial: left }] })

    }
  }

  const setFinal = (i) => {
    if (i === 0) {
      setkeyFrames({ ...keyFrames, keyFrame0: [...keyFrames.keyFrame0, { final: left }] })
    }
    else {
      setkeyFrames({ ...keyFrames, keyFrame1: [...keyFrames.keyFrame1, { final: left }] })

    }
  }


  const playTimeline = (i) => {
    clearInterval(interval)
    canvas?.item(i).set({ left: keyFrames[i].initial });
    canvas?.requestRenderAll();
    setTimeout(() => {
      interval = setInterval(() => {
        if (left < keyFrames[1].final) {
          left = left + 10;
          canvas?.item(i).set({ left: left });
          canvas?.requestRenderAll();
        }
        else {
          clearInterval(interval)
        }
        refCanvasItem.current[i].value = left;
      }, 10);
    }, 1000);


  }
  const stopTimeline = (i) => {
    clearInterval(interval)
  }
  const playtocasparcg = () => {

    canvas?.item(0).set({ left: keyFrames.keyFrame0.final });
    canvas?.item(1).set({ left: keyFrames.keyFrame1.final });
    canvas?.requestRenderAll();
    // const inAnimation2 = `@keyframes slide-in-bck-center {0%{transform:translateX(-1000px) rotate(-720deg);filter:blur(50px);opacity:0}100%{transform:translateX(0) rotate(0deg);filter:blur(0);opacity:1}}text, rect, image,circle, path {animation-name:slide-in-bck-center; animation-duration:0.65s; animation-timing-function:cubic-bezier(.23,1.000,.32,1.000); animation-fill-mode:both}`
    const inAnimation1 = `@keyframes example 
    {
    from {transform:translateX(${keyFrames.keyFrame0[0].initial}px)}
    to {transform:translateX(0px)}
    } 
    @keyframes example2 
    {
    from {transform:translateX(${keyFrames.keyFrame1[0].initial}px)}
    to {transform:translateX(0px)}
    } 
  text {animation-name: example;  animation-duration: .5s;animation-timing-function:cubic-bezier(0.250, 0.460, 0.450, 0.940); }
  rect {animation-name: example2;  animation-duration: .5s;animation-timing-function:cubic-bezier(0.250, 0.460, 0.450, 0.940); }
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
    }, 100);

  }
  return (<div>

    {layers?.map((element, i) => {
      return (<div key={uuidv4()} >
        {element.type}<input ref={addtoRefs} key1={i} style={{ width: 500 }} onChange={e => aa(e)} type="range" min={-1024} max={2048} step={1} defaultValue={0} />
        <div style={{ width: 500, display: 'flex', justifyContent: 'space-around' }}>
        {keyFrames.keyFrame0.map((val) =>

            <div> <button onClick={e => {
              canvas?.item(i).set({ left: val.initial });
              canvas?.requestRenderAll();
              refCanvasItem.current[i].value = val.initial;
            }
            }>{val.initial}</button>
            <button onClick={e => {
              canvas?.item(i).set({ left: val.final });
              canvas?.requestRenderAll();
              refCanvasItem.current[i].value = val.final;
            }
            }>{val.final}</button>
            </div>
            
          )}
        </div>
        <button onClick={() => setInitial(i)} >set Initial</button>
        <button onClick={() => setFinal(i)} >set Final</button>

        <button onClick={() => playTimeline(i)}>Play</button>
        <button onClick={() => stopTimeline(i)}>Stop</button>
      </div>)
    })
    }

    <div>

    </div>
    <div>
    </div>
    <button onClick={playtocasparcg}>Play to casparcg</button>
  </div>)

}

export default TimeLine1;