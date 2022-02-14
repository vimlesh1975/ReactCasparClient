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
  const [keyFrames, setkeyFrames] = useState([{ initial: { left: 50 },final: { left: 1000 } },{ initial: { left: 150 },final: { left: 800 } }])
  // const [keyFrames, setkeyFrames] = useState([]);


  const refCanvasItem = useRef([]);
  refCanvasItem.current = [];
  const addtoRefs = el => {
    if (el && !refCanvasItem.current.includes(el)) {
      refCanvasItem.current.push(el);
    }
  }

  const addTimeline = () => {
    const aa = [...keyFrames];
    aa.push({ initial: { left: 50 } ,final: { left: 1000 }})
    setkeyFrames([...aa]);
  }

  const updateAnimation = () => {
    layers.forEach((element, i) => {
      canvas?.item(i).set({ left: keyFrames[i].final.left});
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
      canvas?.item(i).set({ left: val });
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
        canvas?.item(i).set({ left: val});
        canvas?.requestRenderAll();
      });
    } catch (error) {
      console.log(error);
    }

  }

  const setInitial = (i) => {
    const updatedKeyframe = keyFrames.map((val, index) => {
      return (i === index) ? { ...val, initial: { ...keyFrames[i].initial, left: canvas?.item(i).left} } : val;
    });
    setkeyFrames(updatedKeyframe)
  }

  const setFinal = (i) => {
    const updatedKeyframe = keyFrames.map((val, index) => {
      return (i === index) ? { ...val, final: { ...keyFrames[i].final, left: canvas?.item(i).left} } : val;
    });
    setkeyFrames(updatedKeyframe)
    // setkeyFrames([{ ...keyFrames[i], final: { ...keyFrames[i].final, left: canvas?.item(i).left, top: canvas?.item(i).top, fill: canvas?.item(i).fill, scaleX: canvas?.item(i).scaleX } }])
  }

  const preView = (i) => {
    canvas?.item(i).set({ left: keyFrames[i].initial.left});
   
    canvas?.item(i).animate('left', keyFrames[i].final.left, {
      onChange: canvas.renderAll.bind(canvas),
      duration: 1000,
      easing: fabric.util.ease.linear
    });
    // canvas?.item(i).animate('top', keyFrames[i].final.top, {
    //   onChange: canvas.renderAll.bind(canvas),
    //   duration: 1000,
    //   easing: fabric.util.ease.linear
    // });
    // canvas?.item(i).animate('fill', keyFrames[i].final.fill, {
    //   onChange: canvas.renderAll.bind(canvas),
    //   duration: 1000,
    //   easing: fabric.util.ease.linear
    // });
    // canvas?.item(i).animate('scaleX', keyFrames[i].final.scaleX, {
    //   onChange: canvas.renderAll.bind(canvas),
    //   duration: 1000,
    //   easing: fabric.util.ease.linear
    // });
  }

  const allPreview = () => {
    layers.forEach((element, i) => {
      preView(i);
    });
  }

  const playtocasparcg = () => {
    layers.forEach((element, i) => {
      canvas?.item(i).set({ left: keyFrames[i].final.left });
    });

    canvas?.requestRenderAll();
    var  inAnimation1 = `@keyframes roll-in-left{0%{transform:translateZ(+800px);opacity:0}100%{transform:translateZ(0);opacity:1}} div{animation:roll-in-left .6s ease-out both}`;
    
    
    var inAnimation2 = ``;
    layers.forEach((element, i) => {
      var type = (canvas?.item(i).type === 'i-text' || canvas?.item(i).type === 'textbox') ? 'text' : canvas?.item(i).type;
      inAnimation2 = inAnimation2 + `@keyframes ${type}${canvas?.item(i).id} 
      {
      from {transform:translateX(${keyFrames[i].initial.left - keyFrames[i].final.left}px)}
      to {transform:translateX(0px) translateY(0px);}
      } 
     #${canvas?.item(i).id} ${type} {animation-name: ${type}${canvas?.item(i).id};  animation-duration: 1s;animation-timing-function:linear; }`
    });

    setTimeout(() => {
      endpoint(`play ${window.chNumber}-${108} [html] xyz.html`);
      endpoint(`call ${window.chNumber}-${108} "
      var bb = document.createElement('div');
      bb.style.perspective='1920px';
      bb.style.transformStyle='preserve-3d';
      document.body.appendChild(bb);
  var aa = document.createElement('div');
  aa.style.position='absolute';
  aa.innerHTML='${(canvas.toSVG()).replaceAll('"', '\\"')}';
  bb.appendChild(aa);
  document.body.style.margin='0';
  document.body.style.padding='0';
  aa.style.zoom=(${1920 * 100}/1024)+'%';
  document.body.style.overflow='hidden';
  var style = document.createElement('style');
  style.textContent = '${inAnimation2}';
  document.head.appendChild(style);
  "`);
    }, 10);

  }
  return (<div>

    {keyFrames && layers?.map((element, i) => {
      return (<div key={uuidv4()} style={{border:'1px solid black', marginTop:10}}>
      <input ref={addtoRefs} key1={i} style={{ width: 500,direction: (keyFrames[i].final.left>keyFrames[i].initial.left)?'':'rtl' }} onChange={e => scrubTimeline(e)} type="range" min={(keyFrames[i].final.left>keyFrames[i].initial.left)?keyFrames[i].initial.left:keyFrames[i].final.left} max={(keyFrames[i].final.left<keyFrames[i].initial.left)?keyFrames[i].initial.left:keyFrames[i].final.left} step={1} defaultValue={0} />
        <div style={{ width: 800, display: 'flex', justifyContent: 'space-around' }}>
          <div>
            <button onClick={() => setInitial(i)} >set Initial</button> <button onClick={e => {
              canvas?.item(i).set({ left: keyFrames[i]?.initial.left});
              canvas?.requestRenderAll();
            }
            }>Go to{JSON.stringify(keyFrames[i]?.initial)}</button> 

          <div> 
             <button onClick={() => setFinal(i)} >set Final</button> <button onClick={e => {
              canvas?.item(i).set({ left: keyFrames[i]?.final.left });
              canvas?.requestRenderAll();
            }
            }>Go to {JSON.stringify(keyFrames[i]?.final)}</button> 
          </div>
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
    } type="range" min={0} max={1024} step={1} defaultValue={0} /></> : ''}
    <br /> <button onClick={allPreview}>All Preview</button>
    <br /> <button onClick={playtocasparcg}>Play to casparcg</button>
    <br /> <button onClick={updateAnimation}>Save Animation</button>
    <br /> <button onClick={recallAnimation}>Recall Animation</button>
    <br /> <button onClick={addTimeline}>add Timeline</button>
  </div>)

}

export default TimeLine1;