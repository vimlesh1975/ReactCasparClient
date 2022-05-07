import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Rnd } from 'react-rnd';
import { endpoint } from './common';
import { fabric } from "fabric";
import { selectAll } from './DrawingController';
import { saveAs } from 'file-saver';

var cf = 0;
var aa;
var inAnimation2;

const TimeLine1 = () => {
  const dispatch = useDispatch();
  const canvasList = useSelector(state => state.canvasListReducer.canvasList);
  const currentPage = useSelector(state => state.currentPageReducer.currentPage);
  const currentscreenSize = useSelector(state => state.currentscreenSizeReducer.currentscreenSize);

  const [currentFrame, setCurrentFrame] = useState(0);
  const canvas = useSelector(state => state.canvasReducer.canvas);
  const layers = useSelector(state => state.canvasReducer.canvas?.getObjects());
  const activeLayers = useSelector(state => state.canvasReducer.canvas?.getActiveObjects());
  const [tobecopiedAnimation, setTobecopiedAnimation] = useState(0);
  const [pannelEnable, setPannelEnable] = useState(false);
  const [autoOut, setOutoOut] = useState(true);

  const [kf, setKf] = useState(Array.from(Array(200).keys()).map((val, i) => [0, 0, 0, 0]));
  // const [kf, setKf] = useState(layers.map((val, i) => [0, 0, 0, 0]));
  const [xpositions, setXpositions] = useState(Array.from(Array(200).keys()).map((val, i) => ({
    initialx: 0,
    finalx: 100,
    outx: 700,

    initialy: 500,
    finaly: 250,
    outy: 400,

    initialScaleX: 1,
    finalScaleX: 1,
    outScaleX: 1,

    initialScaleY: 1,
    finalScaleY: 1,
    outScaleY: 1,

    initialAngle: 0,
    finalAngle: 0,
    outAngle: 0,
    initialMatrix: 'matrix(1,0,0,1,300,200)',
    finalMatrix: 'matrix(1,0,0,1,400,400)',
    outMatrix: 'matrix(1,0,0,1,200,100)',


  })))

  const position = i => ({
    delay: kf[i][0] * 10,

    initialx: xpositions[i].initialx,
    finalx: xpositions[i].finalx,
    outx: xpositions[i].outx,

    initialy: xpositions[i].initialy,
    finaly: xpositions[i].finaly,
    outy: xpositions[i].outy,

    initialScaleX: xpositions[i].initialScaleX,
    finalScaleX: xpositions[i].finalScaleX,
    outScaleX: xpositions[i].outScaleX,

    initialScaleY: xpositions[i].initialScaleY,
    finalScaleY: xpositions[i].finalScaleY,
    outScaleY: xpositions[i].outScaleY,

    initialAngle: xpositions[i].initialAngle,
    finalAngle: xpositions[i].finalAngle,
    outAngle: xpositions[i].outAngle,

    initialMatrix: xpositions[i].initialMatrix,
    finalMatrix: xpositions[i].finalMatrix,
    outMatrix: xpositions[i].outMatrix,


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
    if (canvasList[currentPage].animation !== '') {
      setKf(canvasList[currentPage].animation.kf);
      setXpositions(canvasList[currentPage].animation.xpositions)
    }

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
    const ff = kf.map((val) => val[3]);

    cf = 0;
    setCurrentFrame(0);
    clearInterval(aa);
    aa = setInterval(() => {
      if (cf < Math.max(...ff)) {
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

  const setinAnimation2 = () => {
    inAnimation2 = ``;
    canvas.forEachObject((element, i) => {
      var type = (element.type === 'i-text' || element.type === 'textbox') ? 'text' : element.type;

      inAnimation2 = inAnimation2 + `
        @keyframes ${type}${canvas?.item(i).id}in
        {
          0%{transform: ${position(i).initialMatrix} ;opacity:0}
        } 
        @keyframes ${type}${canvas?.item(i).id}out
        {
          100%{transform: ${position(i).outMatrix} ;opacity:0}
        } 
        #${canvas?.item(i).id} {
          animation:
        ${type}${canvas?.item(i).id}in ${position(i).initialToFinalDuration / 1000}s linear ${position(i).delay / 1000}s backwards, 
        ${type}${canvas?.item(i).id}out ${position(i).outDuration / 1000}s linear ${(position(i).delay + position(i).initialToFinalDuration + position(i).stayDuration) / 1000}s ${autoOut ? 'running' : 'paused'} forwards}
         `
    });

  }

  const stopFromCasprtcg = () => {
    if (!autoOut) {
      var Delay = [];
      for (let i = 0; i < layers?.length; i++) {
        Delay.push(position(i).delay + position(i).initialToFinalDuration + position(i).stayDuration);
      }
      const minDeley = Math.min(...Delay);
      canvas.forEachObject((element, i) => {
        endpoint(`
      call ${window.chNumber}-${108} "
      document.getElementsByTagName('g')[${i}].style.animationPlayState='running,running';
      document.getElementsByTagName('g')[${i}].style.animationDelay ='0s,${(position(i).delay + position(i).initialToFinalDuration + position(i).stayDuration - minDeley) / 1000}s';
      "`);
      });
    }
  }

  const playtocasparcg = () => {
    play();
    canvas.discardActiveObject();
    canvas.forEachObject((element, i) => {
      element.set({
        left: position(i).finalx,
        top: position(i).finaly,

        scaleX: position(i).finalScaleX,
        scaleY: position(i).finalScaleY,
        angle: position(i).finalAngle,

        opacity: 1
      })
    });

    canvas.requestRenderAll();
    setinAnimation2();

    endpoint(`play ${window.chNumber}-${108} [html] xyz.html`);
    endpoint(`call ${window.chNumber}-${108} "
        var style = document.createElement('style');
        style.textContent = '${inAnimation2}';
        document.head.appendChild(style);
        var bb = document.createElement('div');
        document.body.appendChild(bb);
        var aa = document.createElement('div');
        aa.style.position='absolute';
        aa.innerHTML='${(canvas.toSVG()).replaceAll('"', '\\"')}';
        bb.appendChild(aa);
        document.body.style.margin='0';
        document.body.style.padding='0';
        aa.style.zoom=(${currentscreenSize * 100}/1024)+'%';
        document.body.style.overflow='hidden';
        "`);
  }

  const preView = () => {
    play();
    canvas.discardActiveObject();
    canvas.forEachObject((element, i) => {
      element.set({ left: position(i).initialx, top: position(i).initialy, scaleX: position(i).initialScaleX, scaleY: position(i).initialScaleY, angle: position(i).initialAngle, opacity: 0 });
      canvas.requestRenderAll();

      setTimeout(() => {
        element.animate({ left: position(i).finalx, top: position(i).finaly, scaleX: position(i).finalScaleX, scaleY: position(i).finalScaleY, angle: position(i).finalAngle, opacity: 1 }, {
          onChange: canvas.renderAll.bind(canvas),
          duration: position(i).initialToFinalDuration,
          easing: fabric.util.ease.linear
        });
      }, position(i).delay);


      setTimeout(() => {
        element.animate({ left: position(i).outx, top: position(i).outy, scaleX: position(i).outScaleX, scaleY: position(i).outScaleY, angle: position(i).outAngle, opacity: 0 }, {
          onChange: canvas.renderAll.bind(canvas),
          duration: position(i).outDuration,
          easing: fabric.util.ease.linear
        });
      }, position(i).delay + position(i).initialToFinalDuration + position(i).stayDuration);
    });

  }
  const getMatrix = (element) => {
    const aa1 = element.calcTransformMatrix();
    const bb = [...aa1];
    return ('matrix(' + bb.toString() + ')')
  }

  const startPoint = () => {
    var updatedxpositions = [...xpositions];
    if (activeLayers.length > 1) { deselectAndSelectAgain(); }

    layers.forEach((element, i) => {
      if (activeLayers.includes(element)) {
        if (activeLayers.length > 1) {
          var activeSelection = canvas.getActiveObject();
          var matrix = activeSelection.calcTransformMatrix();
          var objectPosition = { x: element.left, y: element.top };
          var finalPosition = fabric.util.transformPoint(objectPosition, matrix);
          updatedxpositions[i] = { ...updatedxpositions[i], initialx: finalPosition.x, initialy: finalPosition.y, initialScaleX: element.scaleX, initialScaleY: element.scaleY, initialAngle: element.angle, initialMatrix: getMatrix(element) };
        }
        else {
          updatedxpositions[i] = { ...updatedxpositions[i], initialx: element.left, initialy: element.top, initialScaleX: element.scaleX, initialScaleY: element.scaleY, initialAngle: element.angle, initialMatrix: getMatrix(element) };
        }
        setXpositions(updatedxpositions);
      }
    })
  }

  const finalPoint = () => {
    var updatedxpositions = [...xpositions];
    if (activeLayers.length > 1) { deselectAndSelectAgain(); }

    layers.forEach((element, i) => {
      if (activeLayers.includes(element)) {
        if (activeLayers.length > 1) {
          var activeSelection = canvas.getActiveObject();
          var matrix = activeSelection.calcTransformMatrix();
          var objectPosition = { x: element.left, y: element.top };
          var finalPosition = fabric.util.transformPoint(objectPosition, matrix);
          updatedxpositions[i] = { ...updatedxpositions[i], finalx: finalPosition.x, finaly: finalPosition.y, finalScaleX: element.scaleX, finalScaleY: element.scaleY, finalAngle: element.angle, finalMatrix: getMatrix(element, finalPosition.x, finalPosition.y) };
        }
        else {
          updatedxpositions[i] = { ...updatedxpositions[i], finalx: element.left, finaly: element.top, finalScaleX: element.scaleX, finalScaleY: element.scaleY, finalAngle: element.angle, finalMatrix: getMatrix(element) };
        }
        setXpositions(updatedxpositions);
      }
    })
  }

  const endPoint = () => {
    var updatedxpositions = [...xpositions];
    if (activeLayers.length > 1) { deselectAndSelectAgain(); }
    layers.forEach((element, i) => {
      if (activeLayers.includes(element)) {
        if (activeLayers.length > 1) {
          var activeSelection = canvas.getActiveObject();
          var matrix = activeSelection.calcTransformMatrix();
          var objectPosition = { x: element.left, y: element.top };
          var finalPosition = fabric.util.transformPoint(objectPosition, matrix);
          updatedxpositions[i] = { ...updatedxpositions[i], outx: finalPosition.x, outy: finalPosition.y, outScaleX: element.scaleX, outScaleY: element.scaleY, outAngle: element.angle, outMatrix: getMatrix(element, finalPosition.x, finalPosition.y) };
        }
        else {
          updatedxpositions[i] = { ...updatedxpositions[i], outx: element.left, outy: element.top, outScaleX: element.scaleX, outScaleY: element.scaleY, outAngle: element.angle, outMatrix: getMatrix(element) };
        }
        setXpositions(updatedxpositions);
      }
    })
  }

  const ss = (d) => {
    setCurrentFrame(d.x);
    canvas.discardActiveObject();

    canvas.forEachObject((element, i) => {
      if (d.x < kf[i][0]) {
        element.set({
          left: position(i).initialx,
          top: position(i).initialy,

          scaleX: position(i).initialScaleX,
          scaleY: position(i).initialScaleY,
          angle: position(i).initialAngle,

          // opacity: 0,
          opacity: 1,
        });
      }

      if (d.x > kf[i][3]) {
        element.set({
          left: position(i).outx,
          top: position(i).outy,

          scaleX: position(i).outScaleX,
          scaleY: position(i).outScaleY,

          angle: position(i).outAngle,

          // opacity: 0,
          opacity: 1,
        });
      }

      if ((d.x > kf[i][0]) && (d.x < kf[i][1])) {
        element.set({
          left: position(i).initialx + (position(i).finalx - position(i).initialx) / (kf[i][1] - kf[i][0]) * (d.x - kf[i][0]),
          top: position(i).initialy + (position(i).finaly - position(i).initialy) / (kf[i][1] - kf[i][0]) * (d.x - kf[i][0]),

          scaleX: position(i).initialScaleX + (position(i).finalScaleX - position(i).initialScaleX) / (kf[i][1] - kf[i][0]) * (d.x - kf[i][0]),
          scaleY: position(i).initialScaleY + (position(i).finalScaleY - position(i).initialScaleY) / (kf[i][1] - kf[i][0]) * (d.x - kf[i][0]),

          angle: position(i).initialAngle + (position(i).finalAngle - position(i).initialAngle) / (kf[i][1] - kf[i][0]) * (d.x - kf[i][0]),

          // opacity: (d.x - kf[i][0]) / (kf[i][1] - kf[i][0]);
          opacity: 1
        });
      }

      if ((d.x > kf[i][1]) && (d.x < kf[i][2])) {
        element.set({ left: position(i).finalx, top: position(i).finaly, scaleX: position(i).finalScaleX, scaleY: position(i).finalScaleY, angle: position(i).finalAngle, opacity: 1 });
      }
      if ((d.x > kf[i][2]) && (d.x < kf[i][3])) {
        element.set({
          left: position(i).finalx + (position(i).outx - position(i).finalx) / (kf[i][3] - kf[i][2]) * (d.x - kf[i][2]),
          top: position(i).finaly + (position(i).outy - position(i).finaly) / (kf[i][3] - kf[i][2]) * (d.x - kf[i][2]),

          scaleX: position(i).finalScaleX + (position(i).outScaleX - position(i).finalScaleX) / (kf[i][3] - kf[i][2]) * (d.x - kf[i][2]),
          scaleY: position(i).finalScaleY + (position(i).outScaleY - position(i).finalScaleY) / (kf[i][3] - kf[i][2]) * (d.x - kf[i][2]),

          angle: position(i).finalAngle + (position(i).outAngle - position(i).finalAngle) / (kf[i][3] - kf[i][2]) * (d.x - kf[i][2]),

          // opacity: 1 - (d.x - kf[i][2]) / (kf[i][3] - kf[i][2])
          opacity: 1
        });
      }
    })
    canvas.requestRenderAll();
  }


  const copyAnimation = () => {
    layers.forEach((element, i) => {
      if (activeLayers.includes(element)) {
        setTobecopiedAnimation(i)
        return;
      }
    });

  }
  const pasteAnimation = () => {
    const updatedkf = [...kf];
    layers.forEach((element, i) => {
      if (activeLayers.includes(element)) {
        updatedkf[i] = [...kf[tobecopiedAnimation]];
      }
    });
    setKf(updatedkf)
  }


  const pasteAnimationtoAllLayers = () => {
    const updatedkf = [...kf];
    layers.forEach((element, i) => {
      updatedkf[i] = kf[tobecopiedAnimation];
    });
    setKf(updatedkf)
  }
  const test = () => {
    console.log(canvas.item(0))
  }

  const deselectAndSelectAgain = () => {
    const aa1 = activeLayers;
    canvas.discardActiveObject();
    var sel = new fabric.ActiveSelection(aa1, {
      canvas: canvas,
    });
    canvas.setActiveObject(sel);
    canvas.requestRenderAll();
  }

  const exportHTML1 = canvas => {
    canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);

    canvas.discardActiveObject();
    canvas.forEachObject((element, i) => {
      element.set({
        left: position(i).finalx,
        top: position(i).finaly,

        scaleX: position(i).finalScaleX,
        scaleY: position(i).finalScaleY,
        angle: position(i).finalAngle,

        opacity: 1
      })
    });

    setinAnimation2();
    selectAll(canvas);
    var ss = new Date().toLocaleTimeString('en-US', { year: "numeric", month: "numeric", day: "numeric", hour12: false, hour: "numeric", minute: "numeric", second: "numeric" });
    var retVal = prompt("Enter  file name to save : ", ss + "_FileName");
    if (retVal !== null) {
      var aa = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body>
            <script>
            var style = document.createElement('style');
            style.textContent = \`${inAnimation2}\`;
            document.head.appendChild(style);

            const elementToObserve = document.body;
            const observer = new MutationObserver(() => {
            if (screen.colorDepth === 0) {
                var ccg = document.querySelectorAll('[id^="ccg"]');
                var i;
                for (i = 0; i < ccg.length; i++) {
                    document.getElementById(ccg[i].id).style.display = "none"
                }
            }
            document.body.style.margin = '0';
            document.body.style.padding = '0';
            document.body.style.overflow = 'hidden';
            var aa = document.getElementsByTagName('div')[0];
            aa.style.zoom=(${currentscreenSize * 100}/1024)+'%';
            observer.disconnect();
        });
        observer.observe(elementToObserve, { subtree: true, childList: true })

        function escapeHtml(unsafe) {
            return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
        }

        function updatestring(str1, str2) {
            document.getElementById(str1).getElementsByTagName('text')[0].getElementsByTagName('tspan')[0].innerHTML = str2;
            document.getElementById(str1).style.display = "block";
        }
        function updateimage(str1, str2) {
            document.getElementById(str1).getElementsByTagName('image')[0].setAttribute('xlink:href', str2);
            document.getElementById(str1).getElementsByTagName('image')[0].setAttribute('preserveAspectRatio', 'none');
            document.getElementById(str1).style.display = "block";
        }
           </script>
            <div> ${canvas.toSVG(['id', 'selectable'])}  </div>
             </body>
            
            </html>`
      const file = new Blob([aa], { type: 'text/html' });
      saveAs(file, retVal + '.html')
    }
  }

  return (<div>
    <span> Pannel Enable:</span>  <input type="checkbox" checked={pannelEnable} onChange={e => setPannelEnable(val => !val)} />
    {pannelEnable && <div>
      <div >
        <button onClick={() => startPoint()}>Set Start Point</button>
        <button onClick={finalPoint}>Set Final Point</button>
        <button onClick={endPoint}>Set End Point</button>

        <button onClick={preView}>Preview</button>
        <button onClick={playtocasparcg}>Play</button>
        <label> Auto Out: <input type="checkbox" checked={autoOut} onChange={e => setOutoOut(val => !val)} /></label>
        <button onClick={stopFromCasprtcg}>Stop</button>

        <button onClick={updatePageAndAnimation}>Save</button>
        <button onClick={recallPageAndAnimation}>Recall</button>
        <button onClick={copyAnimation}>Copy</button>
        <button onClick={pasteAnimationtoAllLayers}>Paste to All layers</button>
        <button onClick={pasteAnimation}>Paste</button>
        <button onClick={() => exportHTML1(canvas)}>Expor HTML</button>
        <button onClick={test}>Console Log</button>

      </div>

      <div>
        {layers?.map((element, i) => {
          return <div
            key={i} style={{}}>
            <div onClick={(e) => {
              ss({ x: e.screenX - 1040 });
              canvas.setActiveObject(canvas.item(i));
            }} style={{ backgroundColor: (activeLayers.includes(element)) ? 'grey' : 'darkgray', width: 800, height: 20, marginTop: 1, }} >
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
                  <div style={{ width: kf[i][1] - kf[i][0], height: 20, marginTop: 0, backgroundColor: 'yellowgreen' }}></div>
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
                    position={{ x: val, y: 0 }}
                    onDrag={(e, d) => {
                      modifyKf(e, d, i, kfi)
                    }}
                  > <div style={{ backgroundColor: 'yellow', width: 10, height: 10, textAlign: 'center', marginTop: 5, fontSize: 10, lineHeight: 1 }}>{kfi}</div>
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
                  <div style={{ width: 5, height: 200, backgroundColor: 'red', fontWeight: 'bold' }}>
                    {currentFrame / 25}
                  </div>
                </Rnd>
                }
              </div>
            </div>

          </div>
        })}
      </div>
    </div>
    }
    <div style={{ width: 100, height: 500 }}>
      {/* blank space */}
    </div>
    <div>
      <h3>Animate Only position size and Rotation.</h3>
    </div>
  </div>)
}

export default TimeLine1