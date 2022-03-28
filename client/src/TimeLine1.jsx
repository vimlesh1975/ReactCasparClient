import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Rnd } from 'react-rnd';

var cf=250;
const TimeLine1 = () => {
  const [currentFrame, setCurrentFrame] = useState(250);
  const canvas = useSelector(state => state.canvasReducer.canvas);
  const layers = useSelector(state => state.canvasReducer.canvas?.getObjects());
  const activeLayers = useSelector(state => state.canvasReducer.canvas?.getActiveObjects());
  const [kf, setKf] = useState([[150, 350], [100, 250]]);
  const addKF = i => {
    const updatedkf = [...kf];
    updatedkf[i].push(currentFrame);
    setKf(updatedkf);
  }
  const modifyKf = (e, d, i, kfi) => {
    const updatedkf = [...kf];
    updatedkf[i][kfi]=d.x;
    setKf(updatedkf);
  }
  const play = () => {
   setInterval(() => {
     if(cf<350){
       cf=cf+1;
      setCurrentFrame(val=>val+1);
     }
     else{
       cf=200;
      setCurrentFrame(200);
     }
   }, 10);
  }
  return (<div>
    
    <div className="playback-and-actions-panel" >
      <button onClick={play}>Play</button>
      <button>pause</button>
      <button>Stop</button>
      <button>Loop Play</button>
    </div>

    <div style={{ position: 'relative' }}>
      <Rnd
        dragAxis='x'
        enableResizing={{}}
        bounds='parent'
        size={{ width: 5, height: 200 }}
        position={{ x: currentFrame, y: 0 }}
        onDrag={(e, d) => {
          setCurrentFrame(d.x);
        }}
      >
        <div style={{ width: 5, height: 200, backgroundColor: 'red' }}>
        {currentFrame}
        </div>
      </Rnd>
      <div>
        {layers?.map((_, i) => {
          return <div key={i} style={{ display: 'flex', }}>
            <div> <button onClick={() => addKF(i)} style={{ marginRight: 5 }}>KF</button></div>
            <div style={{ display: 'inline', backgroundColor: 'grey', width: 800, marginTop: 1, }} >
              {i}
              <div style={{ position: 'relative' }}>
                {(kf[i])?.map((val, kfi) => <Rnd
                  dragAxis='x'
                  enableResizing={{}}
                  bounds='parent'
                  position={{ x: val, y: -25 }}
                  onDrag={(e, d) => {
                    modifyKf(e, d, i, kfi)
                  }}
                > <button style={{ width: 5, height: 10 }}></button></Rnd>)}
              </div>
            </div>
          </div>
        })}
      </div>
    </div>


  </div>)
}

export default TimeLine1