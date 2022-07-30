import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Rnd } from 'react-rnd';
import { endpoint } from './common';
import { fabric } from "fabric";
import { selectAll } from './DrawingController';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { VscTrash, VscMove } from "react-icons/vsc";

const timelineWidth = 860;
var cf = 0;
var aa;
var inAnimation2;
var stopCommand;
var html;
const TimeLine1 = ({deleteItemfromtimeline}) => {

  const dispatch = useDispatch();
  const canvasList = useSelector(state => state.canvasListReducer.canvasList);
  const currentPage = useSelector(state => state.currentPageReducer.currentPage);
  const currentscreenSize = useSelector(state => state.currentscreenSizeReducer.currentscreenSize);

  const [currentFrame, setCurrentFrame] = useState(0);
  const canvas = useSelector(state => state.canvasReducer.canvas);
  const layers = useSelector(state => state.canvasReducer.canvas?.getObjects());
  const activeLayers = useSelector(state => state.canvasReducer.canvas?.getActiveObjects());
  const [tobecopiedAnimation, setTobecopiedAnimation] = useState(0);
  const pannelEnable = useSelector(state => state.pannelEnableReducer.pannelEnable);

  const [autoOut, setAutoOut] = useState(true);
  const [htmlfileHandle, sethtmlfileHandle] = useState();
  const [htmlpageHandle, sethtmlpageHandle] = useState();

  const jsfilename = useSelector(state => state.jsfilenameReducer.jsfilename);
  const cssfilename = useSelector(state => state.cssfilenameReducer.cssfilename);

  const kf = useSelector(state => state.kfReducer.kf);
  const xpositions = useSelector(state => state.xpositionsReducer.xpositions);

  const [timelineScale, settimelineScale] = useState(1);

  const position = i => ({
    delay: kf[i][0] * 10 * timelineScale,

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

    finalOpacity: xpositions[i].finalOpacity,

    initialToFinalDuration: (kf[i][1] - kf[i][0]) * 10 * timelineScale,
    stayDuration: (kf[i][2] - kf[i][1]) * 10 * timelineScale,
    outDuration: (kf[i][3] - kf[i][2]) * 10 * timelineScale
  });
 
  const updatePageAndAnimation = () => {
    const updatedcanvasList = canvasList.map((val, i) => {
      return (i === currentPage) ? { ...val, 'pageValue': canvas.toJSON(['id', 'selectable']), animation: { kf: kf, xpositions: xpositions } } : val;
    });
    dispatch({ type: 'CHANGE_CANVAS_LIST', payload: [...updatedcanvasList] });
  }

  const recallPageAndAnimation = () => {
    if (canvasList[currentPage].animation !== '') {
      dispatch({ type: 'CHANGE_KF', payload: canvasList[currentPage].animation.kf });
      dispatch({ type: 'CHANGE_XPOSITIONS', payload: canvasList[currentPage].animation.xpositions });
    }

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
      xmax = timelineWidth;
    }
    else {
      xmin = kf[i][kfi - 1];
      xmax = kf[i][kfi + 1];
    }
    if ((xmin < d.x) && (xmax > d.x)) {
      updatedkf[i][kfi] = d.x;
      dispatch({ type: 'CHANGE_KF', payload: updatedkf });
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
    }, 10 * timelineScale);
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

        opacity: position(i).finalOpacity,
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
        element.animate({ left: position(i).finalx, top: position(i).finaly, scaleX: position(i).finalScaleX, scaleY: position(i).finalScaleY, angle: position(i).finalAngle, opacity: position(i).finalOpacity }, {
          onChange: canvas.renderAll.bind(canvas),
          duration: position(i).initialToFinalDuration,
          easing: fabric.util.ease.linear
        });
      }, (position(i).delay));


      setTimeout(() => {
        element.animate({ left: position(i).outx, top: position(i).outy, scaleX: position(i).outScaleX, scaleY: position(i).outScaleY, angle: position(i).outAngle, opacity: 0 }, {
          onChange: canvas.renderAll.bind(canvas),
          duration: position(i).outDuration,
          easing: fabric.util.ease.linear
        });
      }, (position(i).delay + position(i).initialToFinalDuration + position(i).stayDuration));
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
        dispatch({ type: 'CHANGE_XPOSITIONS', payload: updatedxpositions });

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
          updatedxpositions[i] = { ...updatedxpositions[i], finalx: finalPosition.x, finaly: finalPosition.y, finalScaleX: element.scaleX, finalScaleY: element.scaleY, finalAngle: element.angle, finalMatrix: getMatrix(element, finalPosition.x, finalPosition.y), finalOpacity: element.opacity };
        }
        else {
          updatedxpositions[i] = { ...updatedxpositions[i], finalx: element.left, finaly: element.top, finalScaleX: element.scaleX, finalScaleY: element.scaleY, finalAngle: element.angle, finalMatrix: getMatrix(element), finalOpacity: element.opacity };
        }
        dispatch({ type: 'CHANGE_XPOSITIONS', payload: updatedxpositions });

      }
    })
  }

  const lastPoint = () => {
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
        dispatch({ type: 'CHANGE_XPOSITIONS', payload: updatedxpositions });
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
        element.set({ left: position(i).finalx, top: position(i).finaly, scaleX: position(i).finalScaleX, scaleY: position(i).finalScaleY, angle: position(i).finalAngle, opacity: position(i).finalOpacity });
      }
      if ((d.x > kf[i][2]) && (d.x < kf[i][3])) {
        element.set({
          left: position(i).finalx + (position(i).outx - position(i).finalx) / (kf[i][3] - kf[i][2]) * (d.x - kf[i][2]),
          top: position(i).finaly + (position(i).outy - position(i).finaly) / (kf[i][3] - kf[i][2]) * (d.x - kf[i][2]),
          scaleX: position(i).finalScaleX + (position(i).outScaleX - position(i).finalScaleX) / (kf[i][3] - kf[i][2]) * (d.x - kf[i][2]),
          scaleY: position(i).finalScaleY + (position(i).outScaleY - position(i).finalScaleY) / (kf[i][3] - kf[i][2]) * (d.x - kf[i][2]),
          angle: position(i).finalAngle + (position(i).outAngle - position(i).finalAngle) / (kf[i][3] - kf[i][2]) * (d.x - kf[i][2]),
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
    dispatch({ type: 'CHANGE_KF', payload: updatedkf });
  }

  const pasteAnimationtoAllLayers = () => {
    const updatedkf = [...kf];
    layers.forEach((element, i) => {
      updatedkf[i] = kf[tobecopiedAnimation];
    });
    dispatch({ type: 'CHANGE_KF', payload: updatedkf });
  }
  const test = () => {
    console.log(canvas.item(0))
  }

  const ResetAnimation = () => {
    dispatch({ type: 'CHANGE_KF', payload: Array.from(Array(200).keys()).map((val, i) => [20, 60, 260, 300]) });
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
  function setstopCommand() {
    var Delay = [];
    for (let i = 0; i < layers?.length; i++) {
      Delay.push(position(i).delay + position(i).initialToFinalDuration + position(i).stayDuration);
    }
    const minDeley = Math.min(...Delay);
    var ss = '';
    canvas.forEachObject((element, i) => {
      ss = ss + `
    document.getElementsByTagName('g')[${i}].style.animationPlayState='running,running';
    document.getElementsByTagName('g')[${i}].style.animationDelay ='0s,${(position(i).delay + position(i).initialToFinalDuration + position(i).stayDuration - minDeley) / 1000}s';
    `
    });
    stopCommand = ss;
  }

  const setHtmlString = () => {
    html = `<!DOCTYPE html>
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

      if (screen.colorDepth === 0) {
        var css = '[id^=ccg] {display: none; }',
            head = document.head || document.getElementsByTagName('head')[0],
            style = document.createElement('style');
        head.appendChild(style);
        style.type = 'text/css';
        if (style.styleSheet) {
            // This is required for IE8 and below.
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
    }

    const elementToObserve = document.body;
    const observer = new MutationObserver(() => {
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.body.style.overflow = 'hidden';
        var aa = document.getElementsByTagName('div')[0];
        aa.style.zoom=(${currentscreenSize * 100}/1024)+'%';
        observer.disconnect();
    });
    observer.observe(elementToObserve, { subtree: true, childList: true })

    function outAnimation() {
    ${stopCommand};
    }
    var dataCaspar = {};

    function escapeHtml(unsafe) {
    return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }
    // Parse templateData into an XML object
    function parseCaspar(str) {
    var xmlDoc;
    if (window.DOMParser) {
      parser = new DOMParser();
      xmlDoc = parser.parseFromString(str, "text/xml");
    }
    dataCaspar = XML2JSON(xmlDoc.documentElement.childNodes);
    }

    // Make the XML templateData message into a more simple key:value object
    function XML2JSON(node) {
    var data = {}; // resulting object
    for (k = 0; k < node.length; k++) {
      var idCaspar = node[k].getAttribute("id");
      var valCaspar = node[k].childNodes[0].getAttribute("value");
      if (idCaspar != undefined && valCaspar != undefined) {
        data[idCaspar] = valCaspar;
      };
    }
    return data;
    }

    // Main function to insert data
    function dataInsert(dataCaspar) {
    for (var idCaspar in dataCaspar) {
      var idTemplate = document.getElementById(idCaspar);
      if (idTemplate != undefined) {
        var idtext = idTemplate.getElementsByTagName('text')[0];
        var idimage = idTemplate.getElementsByTagName('image')[0];
        if (idtext != undefined) {
          idTemplate.getElementsByTagName('text')[0].getElementsByTagName('tspan')[0].innerHTML = escapeHtml(dataCaspar[idCaspar]);
          idTemplate.style.display = "block";
          if (idTemplate.getElementsByTagName('extraproperty')[0] != undefined) {
              var textalign1 = idTemplate.getElementsByTagName('extraproperty')[0].getAttribute('textalign');
              var width1 = idTemplate.getElementsByTagName('extraproperty')[0].getAttribute('width');
              var originalFontSize =  idTemplate.getElementsByTagName('extraproperty')[0].getAttribute('originalfontsize');
              if (textalign1 == 'center') {
                  idTemplate.getElementsByTagName('text')[0].setAttribute('xml:space', 'preserve1');
                  idTemplate.getElementsByTagName('text')[0].style.whiteSpace = "normal";
                  idTemplate.getElementsByTagName('text')[0].getElementsByTagName('tspan')[0].setAttribute('x', '0');
                  idTemplate.getElementsByTagName('text')[0].getElementsByTagName('tspan')[0].setAttribute('text-anchor', 'middle');
              }
              if (textalign1 == 'right') {
                  idTemplate.getElementsByTagName('text')[0].setAttribute('xml:space', 'preserve1');
                  idTemplate.getElementsByTagName('text')[0].style.whiteSpace = 'normal';
                  idTemplate.getElementsByTagName('text')[0].getElementsByTagName('tspan')[0].setAttribute('x', width1 / 2);
                  idTemplate.getElementsByTagName('text')[0].getElementsByTagName('tspan')[0].setAttribute('text-anchor', 'end');
              }
              idTemplate.getElementsByTagName('text')[0].setAttribute('font-size', originalFontSize);
              do {
                  var dd = idTemplate.getElementsByTagName('text')[0].getAttribute('font-size');
                  idTemplate.getElementsByTagName('text')[0].setAttribute('font-size', dd - 1);
                  var width2 = idTemplate.getElementsByTagName('text')[0].getElementsByTagName('tspan')[0].getBBox().width;
              } while (width2 > width1);
          }

      }
        else if (idimage != undefined) {
          idTemplate.getElementsByTagName('image')[0].setAttribute('xlink:href', escapeHtml(dataCaspar[idCaspar]));
          idTemplate.getElementsByTagName('image')[0].setAttribute('preserveAspectRatio', 'none');
          idTemplate.style.display = "block";
        }
      }
    }
    }

    // Call for a update of data from CasparCG client
    function update(str) {
    parseCaspar(str); // Parse templateData into an XML object
    dataInsert(dataCaspar); // Insert data
    }

    // insert data from CasparCg client when activated
    function play(str) {
    parseCaspar(str); // Parse templateData into an XML object
    dataInsert(dataCaspar); // Insert data
    // gwd.actions.timeline.gotoAndPlay('document.body', 'start');
    }
    function stop() {
    outAnimation() ;
    }
    function updatestring(str1, str2) {
      document.getElementById(str1).getElementsByTagName('text')[0].getElementsByTagName('tspan')[0].innerHTML = str2;
      document.getElementById(str1).style.display = "block";
      if (document.getElementById(str1).getElementsByTagName('extraproperty')[0] != undefined) {
          var textalign1 = document.getElementById(str1).getElementsByTagName('extraproperty')[0].getAttribute('textalign');
          var width1 = document.getElementById(str1).getElementsByTagName('extraproperty')[0].getAttribute('width');
          var originalFontSize =  document.getElementById(str1).getElementsByTagName('extraproperty')[0].getAttribute('originalfontsize');
          if (textalign1 == 'center') {
              document.getElementById(str1).getElementsByTagName('text')[0].setAttribute('xml:space', 'preserve1');
              document.getElementById(str1).getElementsByTagName('text')[0].style.whiteSpace = "normal";
              document.getElementById(str1).getElementsByTagName('text')[0].getElementsByTagName('tspan')[0].setAttribute('x', '0');
              document.getElementById(str1).getElementsByTagName('text')[0].getElementsByTagName('tspan')[0].setAttribute('text-anchor', 'middle');
          }
          if (textalign1 == 'right') {
              document.getElementById(str1).getElementsByTagName('text')[0].setAttribute('xml:space', 'preserve1');
              document.getElementById(str1).getElementsByTagName('text')[0].style.whiteSpace = 'normal';
              document.getElementById(str1).getElementsByTagName('text')[0].getElementsByTagName('tspan')[0].setAttribute('x', width1 / 2);
              document.getElementById(str1).getElementsByTagName('text')[0].getElementsByTagName('tspan')[0].setAttribute('text-anchor', 'end');
          }
          document.getElementById(str1).getElementsByTagName('text')[0].setAttribute('font-size', originalFontSize);
          do {
              var dd = document.getElementById(str1).getElementsByTagName('text')[0].getAttribute('font-size');
              document.getElementById(str1).getElementsByTagName('text')[0].setAttribute('font-size', dd - 1);
              var width2 = document.getElementById(str1).getElementsByTagName('text')[0].getElementsByTagName('tspan')[0].getBBox().width;
          } while (width2 > width1);
      }
  }
    function updateimage(str1, str2) {
      document.getElementById(str1).getElementsByTagName('image')[0].setAttribute('xlink:href', str2);
      document.getElementById(str1).getElementsByTagName('image')[0].setAttribute('preserveAspectRatio', 'none');
      document.getElementById(str1).style.display = "block";
    }
    </script>
      <div> ${canvas.toSVG(['id', 'selectable'])}  </div>
      </body>
      <link rel="stylesheet" href="${cssfilename}.css">
      <script src="${jsfilename}.js"></script>
      </html>`;
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
    setstopCommand();
    selectAll(canvas);
    getNewFileHandle(canvas)
  }
  async function getNewFileHandle(canvas) {
    var ss = new Date().toLocaleTimeString('en-US', { year: "numeric", month: "numeric", day: "numeric", hour12: false, hour: "numeric", minute: "numeric", second: "numeric" });
    const options = {
      suggestedName: ss + '.html',
      types: [{
        description: 'Html file',
        accept: { 'text/html': ['.html'] },
      }],
    };
    const aa = await window.showSaveFilePicker(options);
    sethtmlfileHandle(aa)

    const writable = await aa.createWritable();
    setHtmlString();
    const file = new Blob([html], { type: 'text/html' });

    await writable.write(file);
    await writable.close();

    exportPage(canvas, aa)
  }

  async function exportPage(canvas, aa) {
    const options1 = {
      suggestedName: (aa.name).split(".")[0],
      types: [{
        description: 'Text file',
        accept: { 'text/plain': ['.txt'] },
      }],
    };


    const aa1 = await window.showSaveFilePicker(options1);
    sethtmlpageHandle(aa1)
    const writable1 = await aa1.createWritable();
    const bb = JSON.stringify({ pageName: aa1.name, pageValue: canvas.toJSON(['id', 'selectable']), animation: { kf: kf, xpositions: xpositions } }) + '\r\n';
    const file1 = new Blob([bb], { type: 'text/plain' });

    await writable1.write(file1);
    await writable1.close();
  }

  async function OverrightHtml(canvas) {
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
    setstopCommand();

    selectAll(canvas);

    const writable = await htmlfileHandle.createWritable();
    setHtmlString();
    const file = new Blob([html], { type: 'text/html' });
    await writable.write(file);
    await writable.close();

    if (htmlpageHandle) {
      const writable1 = await htmlpageHandle.createWritable();
      const bb = JSON.stringify({ pageName: htmlpageHandle.name, pageValue: canvas.toJSON(['id', 'selectable']), animation: { kf: kf, xpositions: xpositions } }) + '\r\n';

      const file1 = new Blob([bb], { type: 'text/plain' });
      await writable1.write(file1);
      await writable1.close();
    }
  }
  const onDragEnd = (result) => {
    if (result.destination != null) {

      const sourceIndex = result.source?.index;
      const destinationIndex = result.destination?.index;

      canvas.moveTo(canvas.getObjects()[sourceIndex], destinationIndex);
      canvas.requestRenderAll();
      dispatch({ type: 'CHANGE_CANVAS', payload: canvas });

      moveElement(sourceIndex, destinationIndex);
    }
  }

  const moveElement = (sourceIndex, destinationIndex) => {
    const updatedkf = [...kf]
    updatedkf.splice(destinationIndex, 0, updatedkf.splice(sourceIndex, 1)[0]);
    dispatch({ type: 'CHANGE_KF', payload: updatedkf });

    const updatedxpositions = [...xpositions];
    updatedxpositions.splice(destinationIndex, 0, updatedxpositions.splice(sourceIndex, 1)[0]);
    dispatch({ type: 'CHANGE_XPOSITIONS', payload: updatedxpositions });
  }

  const selectObject = (e) => {
    try {
      var aa = canvas.item(e.target.getAttribute('key1'));
      canvas.setActiveObject(aa);
      canvas.requestRenderAll();
    } catch (error) {
      //dummy
    }
  }
  return (<div>
    {pannelEnable && <div>
      <div >
        <button onClick={() => startPoint()}>Set Start Point</button>
        <button onClick={finalPoint}>Set Final Point</button>
        <button onClick={lastPoint}>Set End Point</button>

        <button onClick={preView}>Preview</button>
        <button onClick={playtocasparcg}>Play</button>
        <label> Auto Out: <input type="checkbox" checked={autoOut} onChange={() => setAutoOut(val => !val)} /></label>
        <button onClick={stopFromCasprtcg}>Stop</button>

        <button onClick={updatePageAndAnimation}>Save</button>
        <button onClick={recallPageAndAnimation}>Recall</button>
        <button onClick={copyAnimation}>Copy</button>
        <button onClick={pasteAnimationtoAllLayers}>Paste to All layers</button>
        <button onClick={pasteAnimation}>Paste</button>
        <button onClick={() => exportHTML1(canvas)}>Expor HTML</button>
        Js file:<input type='text' size={3} value={jsfilename} onChange={e => dispatch({ type: 'CHANGE_JSFILENAME', payload: e.target.value })} />
        css file:<input size={3} type='text' value={cssfilename} onChange={e => dispatch({ type: 'CHANGE_CSSFILENAME', payload: e.target.value })} />

        {htmlfileHandle && <button onClick={() => OverrightHtml(canvas)}>Overwrite HTML</button>}
        <button onClick={ResetAnimation}>Reset Animation</button>
        <button onClick={test}>Console Log</button>
      </div>
      <div style={{ height: 740, width: 860, overflowY: 'scroll', overflowX: 'hidden' }}>
        <div style={{ width: { timelineWidth }, backgroundColor: 'lightgrey', display: 'flex', }}>
          {Array.from(Array(parseInt(9 * parseFloat(timelineScale))).keys()).map((val, i) => { return (<div key={i} style={{ textAlign: 'center', fontSize: 8, fontWeight: 'bold', marginRight: parseInt(90 / parseFloat(timelineScale)) }}>{(i < 10) ? '0' + i : i}</div>) })}
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable-1" type="PERSON">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={{ backgroundColor: snapshot.isDraggingOver ? 'yellow' : 'yellowgreen' }}
                {...provided.droppableProps}
              >

                {layers?.map((element, i) => {
                  return (
                    <Draggable draggableId={"draggable" + i} key={element + i} index={i}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          style={{
                            ...provided.draggableProps.style,
                            backgroundColor: snapshot.isDragging ? 'red' : (activeLayers.includes(element)) ? 'darkgray' : 'white',
                            boxShadow: snapshot.isDragging ? "0 0 .4rem #666" : "none",
                            verticalAlign: 'top',
                            // color: snapshot.isDragging ? 'white' : 'black' ,
                             marginTop: 1
                          }}
                        >
                          <div style={{ display: 'flex', backgroundColor: (activeLayers.includes(element)) ? 'grey' : 'darkgray', }}>
                            <div onClick={(e) => {
                              ss({ x: e.screenX - 1040 });
                              canvas.setActiveObject(canvas.item(i));
                            }} style={{ width: timelineWidth - 125, height: 20, marginTop: 1, }} >
                              <div style={{ position: 'relative' }}>
                                <Rnd
                                  dragAxis='x'
                                  enableResizing={{}}
                                  bounds='parent'
                                  position={{ x: kf[i][0], y: 0 }}
                                  onDrag={(e, d) => {
                                    const updatedkf = [...kf]
                                    updatedkf[i] = kf[i].map((val) => val + d.deltaX)
                                    dispatch({ type: 'CHANGE_KF', payload: updatedkf });
                                  }}
                                >
                                  <div style={{ width: (kf[i][1] - kf[i][0]), height: 20, marginTop: 0, backgroundColor: 'yellowgreen' }}></div>
                                </Rnd>
                                <Rnd
                                  dragAxis='x'
                                  enableResizing={{}}
                                  bounds='parent'
                                  position={{ x: kf[i][1], y: 0 }}
                                  onDrag={(e, d) => {
                                    const updatedkf = [...kf]
                                    updatedkf[i] = kf[i].map((val) => val + d.deltaX)
                                    dispatch({ type: 'CHANGE_KF', payload: updatedkf });
                                  }}
                                >
                                  <div style={{ marginTop: 0, width: (kf[i][2] - kf[i][1]), height: 20, backgroundColor: 'green' }}></div>
                                </Rnd>
                                <Rnd
                                  dragAxis='x'
                                  enableResizing={{}}
                                  bounds='parent'
                                  position={{ x: kf[i][2], y: 0 }}
                                  onDrag={(e, d) => {
                                    const updatedkf = [...kf]
                                    updatedkf[i] = kf[i].map((val) => val + d.deltaX)
                                    dispatch({ type: 'CHANGE_KF', payload: updatedkf });
                                  }}
                                >
                                  <div style={{ marginTop: 0, width: (kf[i][3] - kf[i][2]), height: 20, backgroundColor: 'red' }}></div>
                                </Rnd>
                                {(kf[i])?.map((val, kfi) =>
                                  <Rnd
                                    key={kfi}
                                    dragAxis='x'
                                    enableResizing={{}}
                                    bounds='parent'
                                    position={{ x: val, y: 0 }}
                                    onDragStop={(e, d) => {
                                      modifyKf(e, d, i, kfi)
                                    }}
                                  > <div style={{ backgroundColor: 'yellow', width: 10, height: 10, textAlign: 'center', marginTop: 5, fontSize: 10, lineHeight: 1 }}>{kfi}</div>
                                  </Rnd>
                                )}
                              </div>
                            </div>
                            <div  {...provided.dragHandleProps}><VscMove key1={i} onClick={(e) => selectObject(e)} />
                            </div>
                            <div> <button key1={i} onClick={(e) => {
                              selectObject(e);
                              deleteItemfromtimeline();
                            }}><VscTrash style={{ pointerEvents: 'none' }} /></button></div>
                            <div>{(element.type)}</div>

                          </div>
                        </div>
                      )
                      }
                    </Draggable>
                  )
                })}
                {provided.placeholder}

              </div>
            )}
          </Droppable>
        </DragDropContext>

        <Rnd
          dragAxis='x'
          enableResizing={{}}
          bounds='parent'
          size={{ width: 5, height: 200 }}
          position={{ x: currentFrame, y: 0 }}
          onDrag={(e, d) => {
            ss(d);
          }}
        >
          <div style={{ width: 5, minHeight: 200, height: ((layers.length) * 21) + 30, backgroundColor: 'red', fontWeight: 'bold' }}>
            {((currentFrame * timelineScale) / (25 * 4)).toFixed(1)}
          </div>
        </Rnd>
      </div>
    </div>
    }
    <div>
      Timeline Scale: <input width={200} onChange={e => {
        dispatch({ type: 'CHANGE_KF', payload: kf.map((val) => val.map((val1) => val1 * timelineScale / e.target.value)) });
        settimelineScale(e.target.value);
      }} type="range" min='1' max='10.0' step='0.1' value={timelineScale} />{timelineScale}
      <h3>Animate Only position, size and Rotation.</h3>
    </div>
  </div>)
}

export default TimeLine1