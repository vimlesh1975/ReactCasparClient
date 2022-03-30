import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Rnd } from 'react-rnd';
import { endpoint } from './common';
import { fabric } from "fabric";

var cf = 250;
var aa;
const TimeLine1 = () => {
  const [currentFrame, setCurrentFrame] = useState(200);
  const canvas = useSelector(state => state.canvasReducer.canvas);
  const layers = useSelector(state => state.canvasReducer.canvas?.getObjects());
  // const activeLayers = useSelector(state => state.canvasReducer.canvas?.getActiveObjects());
  const [kf, setKf] = useState([[50, 100, 300, 350], [50, 100, 200, 250]]);
  // const [kf, setKf] = useState(layers?.map((val,i)=>[50, 100, 300, 350]));

  const position = { delay: kf[0][0] * 10, initialx: 300, finalx: 100, outx: 300, initialToFinalDuration: (kf[0][1] - kf[0][0]) * 10, stayDuration: (kf[0][2] - kf[0][1]) * 10, outDuration: (kf[0][3] - kf[0][2]) * 10 };

  const addKF = i => {
    const updatedkf = [...kf];
    updatedkf[i].push(currentFrame);
    setKf(updatedkf);
  }

  // useEffect(() => {
  //   const bb = layers?.map((val, i) => [50, 100, 300, 350])
  //   setKf(bb)
  // }, [])

  const modifyKf = (e, d, i, kfi) => {
    const updatedkf = [...kf];
    var xmin
    var xmax
    if (kfi === 0) {
      xmin = 0;
      xmax = kf[i][kfi + 1];
    }
    else if (kfi === 3) {
      xmin = kf[i][kfi - 1];;
      xmax = 750;
    }
    else {
      xmin = kf[i][kfi - 1];
      xmax = kf[i][kfi + 1];
    }
    if ((xmin < d.x) && (xmax > d.x)) {
      updatedkf[i][kfi] = d.x;
      setKf(updatedkf);
    }
  }
  const play = () => {
    cf = 0;
    setCurrentFrame(0);
    clearInterval(aa);
    aa = setInterval(() => {
      if (cf < kf[0][3]) {
        cf = cf + 1;
        setCurrentFrame(val => val + 1);
      }
      else {
        cf = 0;
        setCurrentFrame(0);
        clearInterval(aa);
      }
    }, 10);
  }

  const pause = () => {
    clearInterval(aa);
  }


  const playtocasparcg = () => {
    play();
    canvas.item(0).set({ left: position.finalx, opacity: 1 });
    canvas.requestRenderAll();
    var inAnimation1 = `@keyframes roll-in-left{
      0%{transform:translateX(${position.initialx}px);opacity:0}
      100%{transform:translateX(0);opacity:1}} 
      div {animation:roll-in-left ${position.initialToFinalDuration / 1000}s ease-out both}`;

    // var inAnimation2 = ``;
    // layers.forEach((element, i) => {
    //   var type = (canvas?.item(i).type === 'i-text' || canvas?.item(i).type === 'textbox') ? 'text' : canvas?.item(i).type;
    //   inAnimation2 = inAnimation2 + `@keyframes ${type}${canvas?.item(i).id} 
    //   {
    //   from {transform:translateX(${keyFrames[i].initial.left - keyFrames[i].final.left}px)}
    //   to {transform:translateX(0px) translateY(0px);}
    //   } 
    //  #${canvas?.item(i).id} ${type} {animation-name: ${type}${canvas?.item(i).id};  animation-duration: 1s;animation-timing-function:linear; }`
    // });

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
        style.textContent = '${inAnimation1}';
        document.head.appendChild(style);
        "`);
      setTimeout(() => {
        stopfromocasparcg()
      }, position.initialToFinalDuration + position.stayDuration);
    }, position.delay);
  }

  const stopfromocasparcg = () => {
    var inAnimation1 = `@keyframes roll-in-left1{0%{opacity:1;transform:translateX(0px);}100%{opacity:0;transform:translateX(${position.outx}px);}} div{animation-name:roll-in-left1; animation-duration:${position.outDuration / 1000}s; animation-timing-function:ease-out;}`;
    endpoint(`call ${window.chNumber}-${108} "
        style.textContent = '${inAnimation1}';
        "`);
    setTimeout(() => {
      endpoint(`call ${window.chNumber}-${108} "
      aa.innerHTML = '';
      "`);
    }, position.outDuration - 10);
  }
  const preView = () => {
    play();
    canvas.item(0).set({ left: position.initialx, opacity: 0 });
    canvas.requestRenderAll();

    setTimeout(() => {
      canvas?.item(0).animate({ left: position.finalx, opacity: 1 }, {
        onChange: canvas.renderAll.bind(canvas),
        duration: position.initialToFinalDuration,
        easing: fabric.util.ease.linear
      });
    }, position.delay);


    setTimeout(() => {
      canvas?.item(0).animate({ left: position.outx, opacity: 0 }, {
        onChange: canvas.renderAll.bind(canvas),
        duration: position.outDuration,
        easing: fabric.util.ease.linear
      });
    }, position.delay + position.initialToFinalDuration + position.stayDuration);

  }

  const startPoint = () => {
    console.log(canvas.item(0).left);
    // position.initialx = canvas.item(0).left;
  }

  return (<div>

    <div className="playback-and-actions-panel" >
      <button onClick={playtocasparcg}>playtocasparcg</button>
      <button onClick={stopfromocasparcg}>stopfromocasparcg</button>
      <button onClick={preView}>preView</button>

      <button onClick={startPoint}>Start Point</button>
      {/* <button onClick={finalPoint}>Final Point</button>
      <button onClick={endPoint}>End Point</button> */}

      <button onClick={play}>Play</button>
      <button onClick={pause}>pause</button>
      <button>Stop</button>
      <button>Loop Play</button>
    </div>

    <div>
      {layers?.map((_, i) => {
        return <div key={i} style={{}}>
          <div style={{ backgroundColor: 'grey', width: 800, height: 20, marginTop: 1, }} >
            <div style={{ position: 'relative' }}>
              {(i === 0) && <Rnd
                dragAxis='x'
                enableResizing={{}}
                bounds='parent'
                size={{ width: 5, height: 200 }}
                position={{ x: currentFrame, y: 0 }}
                onDrag={(e, d) => {
                  setCurrentFrame(d.x);
                  if ((d.x < kf[0][0]) || (d.x > kf[0][3])) {
                    canvas.item(0).set({ opacity: 0 });
                  }
                  if ((d.x > kf[0][0]) && (d.x < kf[0][1])) {
                    canvas.item(0).set({
                      left: position.initialx + (position.finalx - position.initialx) / (kf[0][1] - kf[0][0]) * (d.x - kf[0][0]),
                      opacity: (d.x - kf[0][0]) / (kf[0][1] - kf[0][0])
                    });
                  }

                  if ((d.x > kf[0][1]) && (d.x < kf[0][2])) {
                    canvas.item(0).set({ left: position.finalx, opacity: 1 });
                  }
                  if ((d.x > kf[0][2]) && (d.x < kf[0][3])) {
                    canvas.item(0).set({
                      left: position.finalx + (position.outx - position.finalx) / (kf[0][3] - kf[0][2]) * (d.x - kf[0][2]),
                      opacity: 1 - (d.x - kf[0][2]) / (kf[0][3] - kf[0][2])
                    });
                  }
                  canvas.requestRenderAll();

                }}
              >
                <div style={{ width: 5, height: 200, backgroundColor: 'red' }}>
                  {currentFrame}
                </div>
              </Rnd>}

              {(kf[i])?.map((val, kfi) =>
                <Rnd
                  key={kfi}
                  dragAxis='x'
                  enableResizing={{}}
                  bounds='parent'
                  position={{ x: val, y: 0 }}
                  onDrag={(e, d) => {
                    modifyKf(e, d, i, kfi)
                  }}
                > <div style={{ backgroundColor: 'yellow', width: 10, height: 10, textAlign: 'center', marginTop: 5, fontSize: 10, }}>{kfi}</div>
                </Rnd>
              )}
            </div>
          </div>
        </div>
      })}
    </div>
  </div>)
}

export default TimeLine1