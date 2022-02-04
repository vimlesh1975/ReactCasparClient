import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

var interval;
var left = 0;
const TimeLine1 = () => {
  const canvas = useSelector(state => state.canvasReducer.canvas);
  const layers = useSelector(state => state.canvasReducer.canvas?.getObjects());
  // var aaa=[layers.length];

  // const canvasList = useSelector(state => state.canvasListReducer.canvasList);
  // const [left, setLeft] = useState(0)

  const [keyFrames, setkeyFrames] = useState({keyFrame0:[], keyFrame1:[]})
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
  const addkeyFrame = (i) => {
    setkeyFrames({    ...keyFrames,keyFrame0:[...keyFrames.keyFrame0, {left:left}]         } )
  }



  const playTimeline = (i) => {
    clearInterval(interval)
    canvas?.item(i).set({ left: keyFrames[i].left });
    canvas?.requestRenderAll();
    setTimeout(() => {
      interval = setInterval(() => {
        if (left < keyFrames[1].left) {
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

  return (<div>

    {layers?.map((element, i) => {
      return (<div key={uuidv4()} >
        {element.type}<input ref={addtoRefs} key1={i} style={{ width: 500 }} onChange={e => aa(e)} type="range" min={0} max={1024} step={1} defaultValue={0} />
        <div style={{ width: 500, display: 'flex', justifyContent: 'space-around' }}>
          {keyFrames.keyFrame0.map((val) =>
            <div> <button onClick={() => {
              // aa(val.left)
              // refCanvasItem[i].current.value = val.left;

            }
            }>{val.left}</button></div>
          )}
        </div>
        <button onClick={()=>addkeyFrame(i)} >Add KeyFrame</button>

        <button onClick={() => playTimeline(i)}>Play</button>
        <button onClick={() => stopTimeline(i)}>Stop</button>
      </div>)
    })
    }

    <div>

    </div>
    <div>
    </div>
  </div>)

}

export default TimeLine1;