import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Rnd } from 'react-rnd';
import { endpoint } from './common';
import { fabric } from "fabric";

var cf = 250;
var aa;

const TimeLine1 = () => {
  const dispatch = useDispatch();
  const canvasList = useSelector(state => state.canvasListReducer.canvasList);
  const currentPage = useSelector(state => state.currentPageReducer.currentPage);

  const [currentFrame, setCurrentFrame] = useState(200);
  const canvas = useSelector(state => state.canvasReducer.canvas);
  const layers = useSelector(state => state.canvasReducer.canvas?.getObjects());
  const [kf, setKf] = useState(Array.from(Array(500).keys()).map((val, i) => [50, 100, 300, 350]));
  const activeLayers = useSelector(state => state.canvasReducer.canvas?.getActiveObjects());

  const [xpositions, setXpositions] = useState(Array.from(Array(500).keys()).map((val, i) => ({
    initialx: 300,
    finalx: 100,
    outx: 300,

    initialy: 300,
    finaly: 100,
    outy: 300,
  })))

  const position = i => ({
    delay: kf[i][0] * 10,

    initialx: xpositions[i].initialx,
    finalx: xpositions[i].finalx,
    outx: xpositions[i].outx,

    initialy: xpositions[i].initialy,
    finaly: xpositions[i].finaly,
    outy: xpositions[i].outy,

    initialToFinalDuration: (kf[i][1] - kf[i][0]) * 10,
    stayDuration: (kf[i][2] - kf[i][1]) * 10,
    outDuration: (kf[i][3] - kf[i][2]) * 10
  });

  const updatePageAndAnimation = () => {
    const updatedcanvasList = canvasList.map((val, i) => {
      return (i === currentPage) ? { ...val, 'pageValue': canvas.toJSON(['id', 'selectable']), animation: { kf: kf, xpositions: xpositions } } : val;
    });
    dispatch({ type: 'CHANGE_CANVAS_LIST', payload: [...updatedcanvasList] });
  }

  const recallPageAndAnimation = () => {
    setKf(canvasList[currentPage].animation.kf);
    setXpositions(canvasList[currentPage].animation.xpositions)
    // console.log(canvasList[currentPage].animation)
  }
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
      if (cf < 800) {
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
    // setTimeout(() => {
    play();
    // }, 2000);
    canvas.forEachObject((element, i) => {
      element.set({
        left: position(i).finalx,
        top: position(i).finaly,
        opacity: 1
      })
      console.log(position(i))
    });

    canvas.requestRenderAll();

    var inAnimation2 = ``;
    canvas.forEachObject((element, i) => {
      var type = (element.type === 'i-text' || element.type === 'textbox') ? 'text' : element.type;
      inAnimation2 = inAnimation2 + `@keyframes ${type}${canvas?.item(i).id}
      {
        0%{transform:translate(${position(i).initialx - position(i).finalx}px,${position(i).initialy - position(i).finaly}px);opacity:0}
        100% {transform:translate(0px,0px);opacity:1}
      } 
      @keyframes ${type}${canvas?.item(i).id}out
      {
        0% {transform:translate(0px,0px);opacity:1}
        100%{transform:translate(${position(i).outx - position(i).finalx}px,${position(i).outy - position(i).finaly}px);opacity:0}
      } 
      #${canvas?.item(i).id} ${type} {animation:
      ${type}${canvas?.item(i).id} ${position(i).initialToFinalDuration / 1000}s linear ${position(i).delay / 1000}s backwards, 
      ${type}${canvas?.item(i).id}out ${position(i).outDuration / 1000}s linear ${(position(i).delay + position(i).initialToFinalDuration + position(i).stayDuration) / 1000}s forwards}`
    });

    endpoint(`play ${window.chNumber}-${108} [html] xyz.html`);
    endpoint(`call ${window.chNumber}-${108} "
        var style = document.createElement('style');
        style.textContent = '${inAnimation2}';
        document.head.appendChild(style);
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
        "`);
  }

  const preView = () => {
    play();
    canvas.forEachObject((element, i) => {

      element.set({ left: position(i).initialx, top: position(i).initialy, opacity: 0 });
      canvas.requestRenderAll();

      setTimeout(() => {
        element.animate({ left: position(i).finalx, top: position(i).finaly, opacity: 1 }, {
          onChange: canvas.renderAll.bind(canvas),
          duration: position(i).initialToFinalDuration,
          easing: fabric.util.ease.linear
        });
      }, position(i).delay);


      setTimeout(() => {
        element.animate({ left: position(i).outx, top: position(i).outy, opacity: 0 }, {
          onChange: canvas.renderAll.bind(canvas),
          duration: position(i).outDuration,
          easing: fabric.util.ease.linear
        });
      }, position(i).delay + position(i).initialToFinalDuration + position(i).stayDuration);
    });

  }

  const startPoint = () => {
    var updatedxpositions = [...xpositions];
    layers.forEach((element, i) => {
      if (activeLayers.includes(element)) {
        console.log(updatedxpositions[i]);
        updatedxpositions[i] = { ...updatedxpositions[i], initialx: element.left, initialy: element.top };
        console.log(updatedxpositions[i]);
      }
    });
    setXpositions(updatedxpositions);
  }

  const finalPoint = () => {
    var updatedxpositions = [...xpositions];
    layers.forEach((element, i) => {
      if (activeLayers.includes(element)) {
        updatedxpositions[i] = { ...updatedxpositions[i], finalx: element.left, finaly: element.top };
      }
    });
    setXpositions(updatedxpositions);
  }

  const endPoint = () => {
    var updatedxpositions = [...xpositions];
    layers.forEach((element, i) => {
      if (activeLayers.includes(element)) {
        updatedxpositions[i] = { ...updatedxpositions[i], outx: element.left, outy: element.top };
      }
    });
    setXpositions(updatedxpositions);
  }

  const ss = (d) => {
    setCurrentFrame(d.x);
    canvas.forEachObject((element, i) => {
      if (d.x < kf[i][0]) {
        element.set({
          left: position(i).initialx,
          top: position(i).initialy,
          opacity: 0,
        });
      }

      if (d.x > kf[i][3]) {
        element.set({
          left: position(i).outx,
          top: position(i).outy,
          opacity: 0,
        });
      }

      if ((d.x > kf[i][0]) && (d.x < kf[i][1])) {
        element.set({
          left: position(i).initialx + (position(i).finalx - position(i).initialx) / (kf[i][1] - kf[i][0]) * (d.x - kf[i][0]),
          top: position(i).initialy + (position(i).finaly - position(i).initialy) / (kf[i][1] - kf[i][0]) * (d.x - kf[i][0]),
          opacity: (d.x - kf[i][0]) / (kf[i][1] - kf[i][0])
        });
      }

      if ((d.x > kf[i][1]) && (d.x < kf[i][2])) {
        element.set({ left: position(i).finalx, top: position(i).finaly, opacity: 1 });
      }
      if ((d.x > kf[i][2]) && (d.x < kf[i][3])) {
        element.set({
          left: position(i).finalx + (position(i).outx - position(i).finalx) / (kf[i][3] - kf[i][2]) * (d.x - kf[i][2]),
          top: position(i).finaly + (position(i).outy - position(i).finaly) / (kf[i][3] - kf[i][2]) * (d.x - kf[i][2]),
          opacity: 1 - (d.x - kf[i][2]) / (kf[i][3] - kf[i][2])
        });
      }
    })
    canvas.requestRenderAll();
  }

  return (<div>

    <div  >
      <button onClick={() => startPoint()}>Set Start Point</button>
      <button onClick={finalPoint}>Set Final Point</button>
      <button onClick={endPoint}>Set End Point</button>

      <button onClick={preView}>preView</button>
      <button onClick={playtocasparcg}>playtocasparcg</button>
      <button onClick={recallPageAndAnimation}>recall</button>
      <button onClick={updatePageAndAnimation}>Update</button>


    </div>

    <div>
      {layers?.map((_, i) => {
        return <div key={i} style={{}}>
          <div onClick={(e) => {
            ss({ x: e.screenX - 1040 });
            canvas.setActiveObject(canvas.item(i));
          }} style={{ backgroundColor: (activeLayers.includes(_)) ? 'grey' : 'darkgray', width: 800, height: 20, marginTop: 1, }} >
            <div style={{ position: 'relative' }}>



              <Rnd
                dragAxis='x'
                enableResizing={{}}
                bounds='parent'
                position={{ x: kf[i][0], y: 0 }}
                onDrag={(e, d) => {
                  const updatedkf = [...kf]
                  updatedkf[i] = kf[i].map((val) => val + d.deltaX)
                  setKf(updatedkf)
                }}
              >
                <div style={{ marginTop: 0, width: kf[i][1] - kf[i][0], height: 20, backgroundColor: 'yellowgreen' }}></div>
              </Rnd>



              <Rnd
                dragAxis='x'
                enableResizing={{}}
                bounds='parent'
                position={{ x: kf[i][1], y: 0 }}
                onDrag={(e, d) => {
                  const updatedkf = [...kf]
                  updatedkf[i] = kf[i].map((val) => val + d.deltaX)
                  setKf(updatedkf)
                }}
              >
                <div style={{ marginTop: 0, width: kf[i][2] - kf[i][1], height: 20, backgroundColor: 'green' }}></div>
              </Rnd>


              <Rnd
                dragAxis='x'
                enableResizing={{}}
                bounds='parent'
                position={{ x: kf[i][2], y: 0 }}
                onDrag={(e, d) => {
                  const updatedkf = [...kf]
                  updatedkf[i] = kf[i].map((val) => val + d.deltaX)
                  setKf(updatedkf)
                }}
              >
                <div style={{ marginTop: 0, width: kf[i][3] - kf[i][2], height: 20, backgroundColor: 'red' }}></div>
              </Rnd>


              {(kf[i])?.map((val, kfi) =>
                <Rnd
                  key={kfi}
                  dragAxis='x'
                  enableResizing={{}}
                  bounds='parent'
                  position={{ x: val, y: i * 3 }}
                  onDrag={(e, d) => {
                    modifyKf(e, d, i, kfi)
                  }}
                > <div style={{ backgroundColor: 'yellow', width: 10, height: 10, textAlign: 'center', marginTop: 5, fontSize: 10, }}>{kfi}</div>
                </Rnd>
              )}
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
            </div>
          </div>
        </div>
      })}
    </div>

  </div>)
}

export default TimeLine1