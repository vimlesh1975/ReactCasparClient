import React, { useState } from 'react'
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
  const [kf, setKf] = useState([[50, 100, 300, 350], [50, 100, 200, 250]]);
  const [xpositions, setXpositions] = useState({
    initialx: 300,
    finalx: 100,
    outx: 300,

    initialy: 300,
    finaly: 100,
    outy: 300,
  })

  const position = {
    delay: kf[0][0] * 10,

    initialx: xpositions.initialx,
    finalx: xpositions.finalx,
    outx: xpositions.outx,

    initialy: xpositions.initialy,
    finaly: xpositions.finaly,
    outy: xpositions.outy,

    initialToFinalDuration: (kf[0][1] - kf[0][0]) * 10,
    stayDuration: (kf[0][2] - kf[0][1]) * 10,
    outDuration: (kf[0][3] - kf[0][2]) * 10
  };


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

  const playtocasparcg = () => {
    play();
    canvas.item(0).set({
      left: position.finalx,
      top: position.finaly,
      opacity: 1
    });
    canvas.requestRenderAll();
    var i = 0
    var type = (canvas?.item(i).type === 'i-text' || canvas?.item(i).type === 'textbox') ? 'text' : canvas?.item(i).type;
    var inAnimation1 = `@keyframes roll-in-left{
      0%{transform:translate(${position.initialx - position.finalx}px,${position.initialy - position.finaly}px);opacity:0}
      100%{transform:translate(0,0);opacity:1}} 
      #${canvas?.item(0).id} ${type} {animation:roll-in-left ${position.initialToFinalDuration / 1000}s ease-out both}`;

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
    var inAnimation1 = `@keyframes roll-in-left1{0%{opacity:1;transform:translate(0,0);}100%{opacity:0;transform:translate(${position.outx - position.finalx}px,${position.outy - position.finaly}px);}} div{animation-name:roll-in-left1; animation-duration:${position.outDuration / 1000}s; animation-timing-function:ease-out;}`;
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
    canvas.item(0).set({ left: position.initialx, top: position.initialy, opacity: 0 });
    canvas.requestRenderAll();

    setTimeout(() => {
      canvas?.item(0).animate({ left: position.finalx, top: position.finaly, opacity: 1 }, {
        onChange: canvas.renderAll.bind(canvas),
        duration: position.initialToFinalDuration,
        easing: fabric.util.ease.linear
      });
    }, position.delay);


    setTimeout(() => {
      canvas?.item(0).animate({ left: position.outx, top: position.outy, opacity: 0 }, {
        onChange: canvas.renderAll.bind(canvas),
        duration: position.outDuration,
        easing: fabric.util.ease.linear
      });
    }, position.delay + position.initialToFinalDuration + position.stayDuration);

  }

  const startPoint = () => {
    setXpositions({ ...xpositions, initialx: canvas.item(0).left, initialy: canvas.item(0).top })
  }
  const finalPoint = () => {
    setXpositions({ ...xpositions, finalx: canvas.item(0).left, finaly: canvas.item(0).top })
  }

  const endPoint = () => {
    setXpositions({ ...xpositions, outx: canvas.item(0).left, outy: canvas.item(0).top })
  }

  const ss = (d) => {
    setCurrentFrame(d.x);
    if (d.x < kf[0][0]) {
      canvas.item(0).set({
        left: position.initialx,
        top: position.initialy,
        opacity: 0,
      });
    }

    if (d.x > kf[0][3]) {
      canvas.item(0).set({
        left: position.outx,
        top: position.outy,
        opacity: 0,
      });
    }

    if ((d.x > kf[0][0]) && (d.x < kf[0][1])) {
      canvas.item(0).set({
        left: position.initialx + (position.finalx - position.initialx) / (kf[0][1] - kf[0][0]) * (d.x - kf[0][0]),
        top: position.initialy + (position.finaly - position.initialy) / (kf[0][1] - kf[0][0]) * (d.x - kf[0][0]),
        opacity: (d.x - kf[0][0]) / (kf[0][1] - kf[0][0])
      });
    }

    if ((d.x > kf[0][1]) && (d.x < kf[0][2])) {
      canvas.item(0).set({ left: position.finalx, top: position.finaly, opacity: 1 });
    }
    if ((d.x > kf[0][2]) && (d.x < kf[0][3])) {
      canvas.item(0).set({
        left: position.finalx + (position.outx - position.finalx) / (kf[0][3] - kf[0][2]) * (d.x - kf[0][2]),
        top: position.finaly + (position.outy - position.finaly) / (kf[0][3] - kf[0][2]) * (d.x - kf[0][2]),
        opacity: 1 - (d.x - kf[0][2]) / (kf[0][3] - kf[0][2])
      });
    }
    canvas.requestRenderAll();
  }

  return (<div>

    <div  >
      <button onClick={startPoint}>Set Start Point</button>
      <button onClick={finalPoint}>Set Final Point</button>
      <button onClick={endPoint}>Set End Point</button>

      <button onClick={preView}>preView</button>
      <button onClick={playtocasparcg}>playtocasparcg</button>
    </div>

    <div>
      {layers?.map((_, i) => {
        return <div key={i} style={{}}>
          <div onClick={(e) => ss({ x: e.screenX - 1040 })} style={{ backgroundColor: 'grey', width: 800, height: 20, marginTop: 1, }} >
            <div style={{ position: 'relative' }}>
              {(i === 0) && <Rnd
                dragAxis='x'
                enableResizing={{}}
                bounds='parent'
                size={{ width: 5, height: 200 }}
                position={{ x: currentFrame, y: 0 }}
                onDrag={(e, d) => {
                  ss(d);
                }}
              >
                <div style={{ width: 5, height: 200, backgroundColor: 'red' }}>
                  {currentFrame}
                </div>
              </Rnd>
              }

              {(i === 0) &&
                <Rnd
                  dragAxis='x'
                  enableResizing={{}}
                  bounds='parent'
                  position={{ x: kf[0][0], y: 0 }}
                  onDrag={(e, d) => {
                    const updatedkf = [kf[0].map((val) => val + d.deltaX)]
                    setKf(updatedkf)
                  }}
                >
                  <div style={{ width: kf[0][1] - kf[0][0], height: 10, backgroundColor: 'yellow' }}></div>
                </Rnd>
              }

              {(i === 0) &&
                <Rnd
                  dragAxis='x'
                  enableResizing={{}}
                  bounds='parent'
                  position={{ x: kf[0][1], y: 0 }}
                  onDrag={(e, d) => {
                    const updatedkf = [kf[0].map((val) => val + d.deltaX)]
                    setKf(updatedkf)
                  }}
                >
                  <div style={{ width: kf[0][2] - kf[0][1], height: 10, backgroundColor: 'green' }}></div>
                </Rnd>
              }
              {(i === 0) &&
                <Rnd
                  dragAxis='x'
                  enableResizing={{}}
                  bounds='parent'
                  position={{ x: kf[0][2], y: 0 }}
                  onDrag={(e, d) => {
                    const updatedkf = [kf[0].map((val) => val + d.deltaX)]
                    setKf(updatedkf)
                  }}
                >
                  <div style={{ width: kf[0][3] - kf[0][2], height: 10, backgroundColor: 'red' }}></div>
                </Rnd>
              }

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