import React, { useState, useRef } from "react";
import { useSelector } from 'react-redux'
var interval;
var left=0;
const TimeLine1 = () => {
  const canvas = useSelector(state => state.canvasReducer.canvas);
  // const canvasList = useSelector(state => state.canvasListReducer.canvasList);
  // const [left, setLeft] = useState(0)

  const [keyFrames,setkeyFrames]=useState([])
const refCanvasItem0=useRef();
  const aa = (val) => {
    // setLeft(val)
    left=val;
    canvas?.item(0).set({left:val});
    canvas?.requestRenderAll();

  }
 const  addKeyFrame=()=>{
  setkeyFrames([...keyFrames, { left: left}])
 }
  const playTimeline = () => {
    clearInterval(interval)
    canvas?.item(0).set({left:keyFrames[0].left});
    canvas?.requestRenderAll();
setTimeout(() => {
  interval = setInterval(() => {
    if (left < keyFrames[1].left) {
       left=left+10;
       canvas?.item(0).set({left:left});
       canvas?.requestRenderAll();
      }
    else {
      clearInterval(interval)
    }
    refCanvasItem0.current.value=left;
  }, 10);
}, 1000);

   
  }
  const stopTimeline = () => {
    clearInterval(interval)
  }

  return (<div>
   
    Size<input ref={refCanvasItem0} style={{width:500}} onChange={e => aa(parseInt(e.target.value))} type="range" min={0} max={1024} step={1} defaultValue={0} />
    <button onClick={playTimeline}>Play</button>
    <button onClick={stopTimeline}>Stop</button>
    <div>
    <div style={{ width:500,display:'flex', justifyContent:'space-around'}}>
    {keyFrames.map((val)=>
     <div> <button onClick={()=>{
      aa(val.left)
      refCanvasItem0.current.value=val.left;

     }
    }>{val.left}</button></div>
    )}
    </div>


    </div>
    <div>
    <button onClick={addKeyFrame}>Add KeyFrame</button>
    </div>
  </div>)

}

export default TimeLine1;