import React, { useState, useRef } from "react";
// import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
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
  const canvasList = useSelector(state => state.canvasListReducer.canvasList);
  const currentPage = useSelector(state => state.currentPageReducer.currentPage);
  const dispatch = useDispatch();

  const layers = useSelector(state => state.canvasReducer.canvas?.getObjects());
  // const [keyFrames, setkeyFrames] = useState([{ initial: { left: 50, top: 50, fill: '#00ff00', scaleX: .2 }, final: { left: 500, top: 500, fill: '#0000ff', scaleX: 1 } }])
  const [keyFrames, setkeyFrames] = useState([]);


  const refCanvasItem = useRef([]);
  refCanvasItem.current = [];
  const addtoRefs = el => {
    const aa = [...keyFrames];
    if (el && !refCanvasItem.current.includes(el)) {
      refCanvasItem.current.push(el);
      aa.push({ initial: { left: 50, top: 50, fill: '#00ff00', scaleX: .2 }, final: { left: 500, top: 500, fill: '#0000ff', scaleX: 1 } })
    }
    // setkeyFrames([...aa]);
  }

  const addTimeline = () => {
    const aa = [...keyFrames];
    aa.push({ initial: { left: 50, top: 50, fill: '#00ff00', scaleX: .2 }, final: { left: 500, top: 500, fill: '#0000ff', scaleX: 1 } })
    setkeyFrames([...aa]);
  }

  const updateAnimation = () => {
    layers.forEach((element, i) => {
      canvas?.item(i).set({ left: keyFrames[i].final.left, top: keyFrames[i].final.top, fill: keyFrames[i].final.fill, scaleX: keyFrames[i].final.scaleX });
    });
    canvas?.requestRenderAll();
    const updatedcanvasList = canvasList.map((val, i) => {
      return (i === currentPage) ? { ...val, pageValue: canvas.toJSON(['id', 'selectable']), animation: keyFrames } : val;
    });
    dispatch({ type: 'CHANGE_CANVAS_LIST', payload: [...updatedcanvasList] })
  }
  const recallAnimation = () => {
    // console.log(canvasList[currentPage].animation);
    canvasList[currentPage].animation && setkeyFrames(canvasList[currentPage].animation);
  }
  const scrubTimeline = (e) => {
    try {
      const i = e.target.getAttribute('key1')
      const val = parseInt(e.target.value);
      const factor = (val - keyFrames[i].initial.left) * 100 / Math.abs(keyFrames[i].initial.left - keyFrames[i].final.left);
      canvas?.item(i).set({ left: val, top: (keyFrames[i].initial.top + (keyFrames[i].final.top - keyFrames[i].initial.top) * factor / 100), fill: colorMix(keyFrames[i].final.fill.substring(1), keyFrames[i].initial.fill.substring(1), factor), scaleX: keyFrames[i].initial.scaleX + (keyFrames[i].final.scaleX - keyFrames[i].initial.scaleX) * factor / 100 });
      canvas?.requestRenderAll();
    } catch (error) {
      console.log(error);
    }

  }

  const scrubTimelineAll = (e) => {
    try {
      layers.forEach((element, i) => {
        const val = parseInt(e.target.value);
        const factor = (val - keyFrames[i].initial.left) * 100 / Math.abs(keyFrames[i].initial.left - keyFrames[i].final.left);
        canvas?.item(i).set({ left: val, top: (keyFrames[i].initial.top + (keyFrames[i].final.top - keyFrames[i].initial.top) * factor / 100), fill: colorMix(keyFrames[i].final.fill.substring(1), keyFrames[i].initial.fill.substring(1), factor), scaleX: keyFrames[i].initial.scaleX + (keyFrames[i].final.scaleX - keyFrames[i].initial.scaleX) * factor / 100 });
        canvas?.requestRenderAll();
      });
    } catch (error) {
      console.log(error);
    }

  }

  const setInitial = (i) => {
    const updatedKeyframe = keyFrames.map((val, index) => {
      return (i === index) ? { ...val, initial: { ...keyFrames[i].initial, left: canvas?.item(i).left, top: canvas?.item(i).top, fill: canvas?.item(i).fill, scaleX: canvas?.item(i).scaleX } } : val;
    });
    setkeyFrames(updatedKeyframe)
  }

  const setFinal = (i) => {
    const updatedKeyframe = keyFrames.map((val, index) => {
      return (i === index) ? { ...val, final: { ...keyFrames[i].final, left: canvas?.item(i).left, top: canvas?.item(i).top, fill: canvas?.item(i).fill, scaleX: canvas?.item(i).scaleX } } : val;
    });
    setkeyFrames(updatedKeyframe)
    // setkeyFrames([{ ...keyFrames[i], final: { ...keyFrames[i].final, left: canvas?.item(i).left, top: canvas?.item(i).top, fill: canvas?.item(i).fill, scaleX: canvas?.item(i).scaleX } }])
  }

  const preView = (i) => {
    canvas?.item(i).set({ left: keyFrames[i].initial.left, top: keyFrames[i].initial.top, fill: keyFrames[i].initial.fill, scaleX: keyFrames[i].initial.scaleX });
    canvas?.item(i).animate('left', keyFrames[i].final.left, {
      onChange: canvas.renderAll.bind(canvas),
      duration: 1000,
      easing: fabric.util.ease.linear
    });
    canvas?.item(i).animate('top', keyFrames[i].final.top, {
      onChange: canvas.renderAll.bind(canvas),
      duration: 1000,
      easing: fabric.util.ease.linear
    });
    canvas?.item(i).animate('fill', keyFrames[i].final.fill, {
      onChange: canvas.renderAll.bind(canvas),
      duration: 1000,
      easing: fabric.util.ease.linear
    });
    canvas?.item(i).animate('scaleX', keyFrames[i].final.scaleX, {
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
    layers.forEach((element, i) => {
      canvas?.item(i).set({ left: keyFrames[i].final.left, top: keyFrames[i].final.top, fill: keyFrames[i].final.fill, scaleX: keyFrames[i].final.scaleX });
    });

    canvas?.requestRenderAll();
    var  inAnimation1 = `@keyframes roll-in-left{0%{transform:translateX(-800px) rotate(-540deg);opacity:0}100%{transform:translateX(0) rotate(0deg);opacity:1}} rect,text{animation:roll-in-left .6s ease-out both}`;
    var  inAnimation1 = `@keyframes roll-in-left{0%{transform:translateY(-45px);animation-timing-function:ease-in;opacity:1}24%{opacity:1}40%{transform:translateY(-24px);animation-timing-function:ease-in}65%{transform:translateY(-12px);animation-timing-function:ease-in}82%{transform:translateY(-6px);animation-timing-function:ease-in}93%{transform:translateY(-4px);animation-timing-function:ease-in}25%,55%,75%,87%{transform:translateY(0);animation-timing-function:ease-out}100%{transform:translateY(0);animation-timing-function:ease-out;opacity:1}} rect,text{animation:roll-in-left .6s ease-out both}`;
    
    
    var inAnimation2 = ``;
    layers.forEach((element, i) => {
      var type = (canvas?.item(i).type === 'i-text' || canvas?.item(i).type === 'textbox') ? 'text' : canvas?.item(i).type;
      inAnimation2 = inAnimation2 + `@keyframes ${type}${canvas?.item(i).id} 
      {
      from {transform:translateX(${keyFrames[i].initial.left - keyFrames[i].final.left}px) translateY(${keyFrames[i].initial.top - keyFrames[i].final.top}px);opacity:0);fill:${keyFrames[i].initial.fill};width:${canvas?.item(i).width * keyFrames[i].initial.scaleX}}
      to {transform:translateX(0px) translateY(0px);opacity:1; fill:${keyFrames[i].final.fill}; width:${canvas?.item(i).width * keyFrames[i].final.scaleX}}
      } 
     #${canvas?.item(i).id} ${type} {animation-name: ${type}${canvas?.item(i).id};  animation-duration: 1s;animation-timing-function:linear; }`
    });

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

    {keyFrames && layers?.map((element, i) => {
      return (<div key={uuidv4()} >
        {element.type}:{element.id}<input ref={addtoRefs} key1={i} style={{ width: 500 }} onChange={e => scrubTimeline(e)} type="range" min={keyFrames[i]?.initial.left} max={keyFrames[i]?.final.left} step={1} defaultValue={(keyFrames[i]?.initial.left + keyFrames[i]?.final.left) / 2} />
        <div style={{ width: 800, display: 'flex', justifyContent: 'space-around' }}>
          <div>
            <button onClick={() => setInitial(i)} >set Initial</button> <button onClick={e => {
              canvas?.item(i).set({ left: keyFrames[i]?.initial.left, top: keyFrames[i]?.initial.top, fill: keyFrames[i]?.initial.fill, scaleX: keyFrames[i]?.initial.scaleX });
              canvas?.requestRenderAll();
            }
            }>Go to{JSON.stringify(keyFrames[i]?.initial)}</button>  <button onClick={e => {
              canvas?.item(i).set({ left: keyFrames[i]?.final.left, top: keyFrames[i]?.final.top, fill: keyFrames[i]?.final.fill, scaleX: keyFrames[i]?.final.scaleX });
              canvas?.requestRenderAll();
            }
            }>Go to {JSON.stringify(keyFrames[i]?.final)}</button> <button onClick={() => setFinal(i)} >set Final</button>
          </div>
          <button onClick={() => preView(i)}>Preview</button>
        </div>
      </div>)
    })
    }

    <div>
    </div>
    {keyFrames ? <>Master: <input style={{ width: 500 }} onChange={
      e => {
        scrubTimelineAll(e);
      }
    } type="range" min={keyFrames[0]?.initial.left} max={keyFrames[0]?.final.left} step={1} defaultValue={(keyFrames[0]?.initial.left + keyFrames[0]?.final.left) / 2} /></> : ''}
    <br /> <button onClick={allPreview}>All Preview</button>
    <br /> <button onClick={playtocasparcg}>Play to casparcg</button>
    <br /> <button onClick={updateAnimation}>Save Animation</button>
    <br /> <button onClick={recallAnimation}>Recall Animation</button>
    <br /> <button onClick={addTimeline}>add Timeline</button>
  </div>)

}

export default TimeLine1;