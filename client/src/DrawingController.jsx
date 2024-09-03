import React, { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";
import * as fabric from "fabric";
import { generateUniqueId } from "./common";
import {
  resizeTextWidth,
  deleteAll,
  lock,
  undo,
  unlockAll,
  swapFaceandStrokeColors,
  sameSizeIMG,
  sameWidth,
  sameWidthIMG,
  sameHeightIMG,
  txtBold,
  textItalic,
  textUnderline,
  textLineThrough,
  createVLine,
  putatCenter,
  selectedatCenter,
  moveSelected,
  selectedatCenterH,
  options,
  selectedatCenterV,
  shadowOptions,
  alignAllRight,
  alignAllButtom,
  alignAllLeft,
  alignAllTop,
  changeCurrentColor,
  changeBackGroundColor,
  changeStrokeCurrentColor,
  changeShadowCurrentColor,
  setasClipPath,
  cliptoPath,
  selectAll,
  deSelectAll,
  copy,
  paste,
  makeHorizontalEquidistant,
  makeVerticalEquidistant,
  createTriangle,
  createHLine,
  createCircle,
  createRect,
  createRandomeStrip,
  createPentagon,
  cloneAsImage,
  createTextBox,
  addUpTimer,
  addClock,
  Direction,
  rgbaCol,
  listglobalCompositeOperation,
  getGdd,
  endpoint,
  fontLists,
  stopGraphics,
  startGraphics,
  updateGraphics,
  templateLayers,
  executeScript,
  checkIdUniqueness,
  rgbaObjectToHex,
  sendToBack,
  bringToFront,
  bringForward,
  sendBackward,
  deleteItemfromtimeline,
  saveFile,
  generalFileName,
  address1,
  setclipPathWhileImporting,
} from "./common";
import { useSelector, useDispatch } from "react-redux";
// import "fabric-history";
import {
  VscPrimitiveSquare,
  VscCircleFilled,
  VscTriangleUp,
  VscLock,
  VscUnlock,
  VscTrash,
} from "react-icons/vsc";
import {
  FaAlignLeft,
  FaAlignRight,
  FaPlay,
  FaPause,
  FaStop,
} from "react-icons/fa";
import { GrResume } from "react-icons/gr";
import {
  AiOutlineVerticalAlignTop,
  AiOutlineVerticalAlignBottom,
} from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import SavePannel from "./SavePannel";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Images from "./Images";
import SavedStyles from "./SavedStyles";

import Layers2 from "./Layers2";
import CasparcgTools from "./CasparcgTools";

import GsapPlayer from "./GsapPlayer";
import VerticalScrollPlayer from "./VerticalScrollPlayer";


var intervalGameTimer1;
var intervalGameTimer2;
var html;

fabric.FabricObject.prototype.noScaleCache = false;
// fabric.FabricObject.prototype.cornerSize = 18;
// fabric.disableStyleCopyPaste = true;

class ErasedGroup extends fabric.Group {
  constructor(original, ErasedPath, options, isAlreadyGrouped) {
    super([original, ErasedPath], options, isAlreadyGrouped);
    this.original = original;
    this.ErasedPath = ErasedPath;
  }

  _calcBounds(onlyWidthHeight) {
    const aX = [],
      aY = [],
      props = ["tr", "br", "bl", "tl"],
      jLen = props.length,
      ignoreZoom = true;

    let o = this.original;
    o.setCoords(ignoreZoom);

    for (let j = 0; j < jLen; j++) {
      const prop = props[j];
      aX.push(o.oCoords[prop].x);
      aY.push(o.oCoords[prop].y);
    }

    this._getBounds(aX, aY, onlyWidthHeight);
  }
}

// const EraserBrush = fabric.util.createClass(fabric.PencilBrush, {
//   /**
//    * On mouseup after drawing the path on contextTop canvas
//    * we use the points captured to create an new fabric path object
//    * and add it to the fabric canvas.
//    */
//   _finalizeAndAddPath: function () {
//     var ctx = this.canvas.contextTop;
//     ctx.closePath();
//     if (this.decimate) {
//       this._points = this.decimatePoints(this._points, this.decimate);
//     }
//     var pathData = this.convertPointsToSVGPath(this._points).join("");
//     if (pathData === "M 0 0 Q 0 0 0 0 L 0 0") {
//       // do not create 0 width/height paths, as they are
//       // rendered inconsistently across browsers
//       // Firefox 4, for example, renders a dot,
//       // whereas Chrome 10 renders nothing
//       this.canvas.requestRenderAll();
//       return;
//     }

//     // use globalCompositeOperation to 'fake' Eraser
//     var path = this.createPath(pathData);
//     path.globalCompositeOperation = "destination-out";
//     path.selectable = false;
//     path.evented = false;
//     path.absolutePositioned = true;

//     // grab all the objects that intersects with the path
//     const objects = this.canvas.getObjects().filter((obj) => {
//       // if (obj instanceof fabric.Textbox) return false;
//       // if (obj instanceof fabric.IText) return false;
//       if (obj instanceof fabric.Rect && obj.id === "rectwithimg") {
//         return false;
//       }
//       if (!obj.intersectsWithObject(path)) return false;
//       return true;
//     });

//     if (objects.length > 0) {
//       // merge those objects into a group
//       const mergedGroup = new fabric.Group(objects);
//       const newPath = new ErasedGroup(mergedGroup, path);
//       const left = newPath.left;
//       const top = newPath.top;
//       // convert it into a dataURL, then back to a fabric image
//       const newData = newPath.toDataURL({
//         withoutTransform: true,
//       });
//       fabric.Image.fromURL(newData, (fabricImage) => {
//         fabricImage.set({
//           id: "ccg_" + fabric.Object.__uid,
//           class: "class_" + fabric.Object.__uid,
//           left: left,
//           top: top,
//           shadow: { ...shadowOptions, blur: 0 },
//         });
//         // remove the old objects then add the new image
//         this.canvas.remove(...objects);
//         this.canvas.add(fabricImage);
//       });
//     }

//     this.canvas.clearContext(this.canvas.contextTop);
//     this.canvas.renderAll();
//     this._resetShadow();
//   },
// });

class EraserBrush extends fabric.PencilBrush {
  /**
   * On mouseup after drawing the path on contextTop canvas
   * we use the points captured to create a new fabric path object
   * and add it to the fabric canvas.
   */
  _finalizeAndAddPath() {
    const ctx = this.canvas.contextTop;
    ctx.closePath();

    if (this.decimate) {
      this._points = this.decimatePoints(this._points, this.decimate);
    }

    const pathData = this.convertPointsToSVGPath(this._points).join("");
    if (pathData === "M 0 0 Q 0 0 0 0 L 0 0") {
      this.canvas.requestRenderAll();
      return;
    }

    // Use globalCompositeOperation to 'fake' Eraser
    const path = this.createPath(pathData);
    path.globalCompositeOperation = "destination-out";
    path.selectable = false;
    path.evented = false;
    path.absolutePositioned = true;

    // Grab all the objects that intersect with the path
    const objects = this.canvas.getObjects().filter((obj) => {
      if (obj instanceof fabric.Rect && obj.id === "rectwithimg") {
        return false;
      }
      return obj.intersectsWithObject(path);
    });

    if (objects.length > 0) {
      // Merge those objects into a group
      const mergedGroup = new fabric.Group(objects);
      const newPath = new ErasedGroup(mergedGroup, path);
      const { left, top } = newPath;

      // Convert it into a dataURL, then back to a fabric image
      const newData = newPath.toDataURL({
        withoutTransform: true,
      });
      const id = generateUniqueId({ type: "image" });
      fabric.FabricImage.fromURL(newData).then(fabricImage => {
        fabricImage.set({
          id: id,
          class: id,
          left: left,
          top: top,
          shadow: { ...shadowOptions, blur: 0 },
        });

        // Remove the old objects, then add the new image
        this.canvas.remove(...objects);
        this.canvas.add(fabricImage);
      });
    }

    this.canvas.clearContext(this.canvas.contextTop);
    this.canvas.renderAll();
    this._resetShadow();
  }
}

const DrawingController = () => {
  const showId = useSelector((state) => state.showIdReducer.showId);
  const clientId = useSelector((state) => state.clientIdReducer.clientId);

  window.clientId = clientId;

  const refShadowColor = useRef();
  const refAffectStroke = useRef(false);
  const refBlur = useRef();
  const refOffsetX = useRef();
  const refOffsetY = useRef();

  const [fontList, setFontList] = useState(fontLists);
  const [currentFont, setCurrentFont] = useState("Arial");
  const [currentglobalCompositeOperation, setCurrentglobalCompositeOperation] =
    useState("source-over");
  const canvas = useSelector((state) => state.canvasReducer.canvas);
  const canvasList = useSelector((state) => state.canvasListReducer.canvasList);

  const currentPage = useSelector(
    (state) => state.currentPageReducer.currentPage
  );
  const currentscreenSize = useSelector(
    (state) => state.currentscreenSizeReducer.currentscreenSize
  );

  const jsfilename = useSelector((state) => state.jsfilenameReducer.jsfilename);
  const cssfilename = useSelector(
    (state) => state.cssfilenameReducer.cssfilename
  );

  const jsfilename2 = useSelector(
    (state) => state.jsfilenameReducer2.jsfilename2
  );
  const cssfilename2 = useSelector(
    (state) => state.cssfilenameReducer2.cssfilename2
  );

  const [horizontalSpeed, setHorizontalSpeed] = useState(1.0);
  const [horizontalSpeed2, setHorizontalSpeed2] = useState(1.0);
  const [ltr, setLtr] = useState(false);
  const [ltr2, setLtr2] = useState(false);

  const strokeLineCaps = ["butt", "round", "square"];
  const [currentstrokeLineCap, setCurrentstrokeLineCap] = useState("round");

  const [solidcaption2, setSolidcaption2] = useState("");
  const [solidcaption3, setSolidcaption3] = useState("");
  const [logo, setLogo] = useState("");
  const [locationBand, setLocationBand] = useState("");

  const [horizontalScroll, setHorizontalScroll] = useState("");
  const [horizontalScroll2, setHorizontalScroll2] = useState("");
  const [clock, setClock] = useState("");
  const [upTimer, setUpTimer] = useState("");
  const modes = ["Pencil", "Spray", "Erase", "none"];

  const [currentMode, setCurrentMode] = useState("none");
  const [fontSize, setFontSize] = useState(25);
  const [opacity, setOpacity] = useState(1.0);
  const [charSpacing, setCharSpacing] = useState(1);

  const [strokeWidth, setStrokeWidth] = useState(1);

  const [skewXSize, setSkewXSize] = useState(0);
  const [skewYSize, setSkewYSize] = useState(0);

  const [skewRX, setSkewRX] = useState(0);
  const [skewRY, setSkewRY] = useState(0);

  const [cropX, setCropX] = useState(0);
  const [cropY, setCropY] = useState(0);

  const [initialMinute, setInitilaMinute] = useState(45);
  const [initialSecond, setInitialSecond] = useState(0);
  const [initialSecond2, setInitialSecond2] = useState(24);
  const [countUp, setCountUp] = useState(false);
  const [countUp2, setCountUp2] = useState(false);

  const dispatch = useDispatch();
  const [htmlfileHandle, sethtmlfileHandle] = useState();
  const [htmlpageHandle, sethtmlpageHandle] = useState();
  const [scaleX, setscaleX] = useState(1);
  const [scaleY, setscaleY] = useState(1);

  const [x, setX] = useState(800);
  const [y, setY] = useState(500);

  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(500);

  const [angle, setangle] = useState(0);
  const [itallicnormal, setitallicnormal] = useState("normal");
  const [fontWeight1, setfontWeight1] = useState("normal");
  const [underline1, setunderline1] = useState("");
  const [linethrough1, setlinethrough1] = useState("");

  const [strokedashoffset, setstrokedashoffset] = useState(0);
  const [strokedasharray, setstrokedasharray] = useState([0, 0]);
  const [currentFillColor, setCurrentFillColor] = useState("#000000");

  const kf = useSelector((state) => state.kfReducer.kf);
  const xpositions = useSelector((state) => state.xpositionsReducer.xpositions);

  const handleKeyDown = useCallback(
    (event) => {
      const { key, keyCode, ctrlKey, altKey } = event;
      const activeObjects = window.editor.canvas?.getActiveObjects();
      if (document.activeElement === window.editor.canvas.wrapperEl) {
        switch (keyCode) {
          case 37: // Left arrow key
            moveSelected(Direction.LEFT);
            break;
          case 38: // Up arrow key
            moveSelected(Direction.UP);
            break;
          case 39: // Right arrow key
            moveSelected(Direction.RIGHT);
            break;
          case 40: // Down arrow key
            moveSelected(Direction.DOWN);
            break;
          default:
            break;
        }

        if (key === "Delete") {
          activeObjects.forEach((item) => {
            if (!(item.type === "textbox" && item.isEditing)) {
              deleteItemfromtimeline(kf, xpositions, dispatch);
            }
          });
        } else if (ctrlKey) {
          if (key.toLowerCase() === "c") {
            const item = activeObjects[0];
            if (!(item?.type === "textbox" && item?.isEditing)) {
              copy(window.editor.canvas);
            }
          } else if (key.toLowerCase() === "v") {
            const item = activeObjects[0];
            if (!(item?.type === "textbox" && item?.isEditing)) {
              paste(window.editor.canvas);
            }
          } else if (key.toLowerCase() === "z") {
            window.editor.canvas && undo(window.editor.canvas);

          } else if (key.toLowerCase() === "a") {
            event.preventDefault();
            selectAll(window.editor.canvas);
          } else if (key === "Enter") {
            previewHtml(window.editor.canvas);
          } else if (altKey) {
            window.editor.canvas.getObjects().forEach((item) => {
              item.set("centeredScaling", true);
            });
          }
        }
      }
    },
    [kf, xpositions, dispatch]
  );

  const handleKeyUp = useCallback((event) => {
    const { altKey } = event;
    if (altKey) {
      window.editor.canvas.getObjects().forEach((item) => {
        item.set("centeredScaling", false);
      });
      window.editor.canvas.renderAll();
    }
  }, []);

  useEffect(() => {
    document.body.addEventListener("keydown", handleKeyDown);
    document.body.addEventListener("keyup", handleKeyUp);
    return () => {
      document.body.removeEventListener("keydown", handleKeyDown);
      document.body.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  const pauseClock = (layerNumber) => {
    clearInterval(intervalGameTimer1);
    endpoint(`call ${window.chNumber}-${layerNumber} "
        clearInterval(intervalGameTimer1);
        "`);
    executeScript(`clearInterval(intervalGameTimer1)`);
  };

  const showClock = (layerNumber) => {
    executeScript(`if(window.intervalGameTimer1){clearInterval(intervalGameTimer1)};
                        document.getElementById('divid_${layerNumber}')?.remove();`);

    canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
    selectAll(canvas);
    //for form
    var startTime = new Date();
    startTime.setMinutes(initialMinute);
    startTime.setSeconds(initialSecond);

    const script = `
        window.aaGameTimer1 = document.createElement('div');
        aaGameTimer1.style.position='absolute';
        aaGameTimer1.setAttribute('id','divid_' + '${layerNumber}');
        aaGameTimer1.style.zIndex = ${layerNumber};
        aaGameTimer1.innerHTML=\`${canvas
        .toSVG(["id", "class", "selectable"])
        .replaceAll('"', '\\"')}\`;
        document.body.appendChild(aaGameTimer1);
        document.body.style.margin='0';
        document.body.style.padding='0';
        aaGameTimer1.style.zoom=(${currentscreenSize * 100}/1920)+'%';
        document.body.style.overflow='hidden';
        window.ccGameTimer1=document.getElementById('gameTimer1').getElementsByTagName('tspan')[0];
        ccGameTimer1.textContent='${initialMinute}:${initialSecond
        .toString()
        .padStart(2, 0)}';
        window.startTimeGameTimer1 = new Date();
        startTimeGameTimer1.setMinutes(${initialMinute});
        startTimeGameTimer1.setSeconds(${initialSecond});
        window.intervalGameTimer1=null;
        `;

    executeScript(script); //for html

    endpoint(
      `mixer ${window.chNumber}-${layerNumber} fill 0 0 0 1 6 ${window.animationMethod}`
    );
    setTimeout(() => {
      endpoint(
        `play ${window.chNumber}-${layerNumber} [HTML] https://localhost:10000/ReactCasparClient/xyz.html`
      );
    }, 250);
    setTimeout(() => {
      endpoint(`call ${window.chNumber}-${layerNumber} "
               ${script}
                "`);
    }, 300);

    setTimeout(() => {
      endpoint(
        `mixer ${window.chNumber}-${layerNumber} fill 0 0 1 1 10 ${window.animationMethod}`
      );
    }, 800);
  };

  const stopClock = (layerNumber) => {
    clearInterval(intervalGameTimer1);
    stopGraphics(layerNumber);
    executeScript(`if(window.intervalGameTimer1){clearInterval(intervalGameTimer1)};
        document.getElementById('divid_${layerNumber}')?.remove();`);
  };
  const resumeClock = (layerNumber) => {
    //for form
    var startTimeGameTimer1 = new Date();
    startTimeGameTimer1.setMinutes(initialMinute);
    startTimeGameTimer1.setSeconds(initialSecond);
    clearInterval(intervalGameTimer1);
    intervalGameTimer1 = setInterval(() => {
      countUp
        ? startTimeGameTimer1.setSeconds(startTimeGameTimer1.getSeconds() + 1)
        : startTimeGameTimer1.setSeconds(startTimeGameTimer1.getSeconds() - 1);
      setInitilaMinute(startTimeGameTimer1.getMinutes());
      setInitialSecond(startTimeGameTimer1.getSeconds());
    }, 1000);
    //for form
    const script = `startTimeGameTimer1.setMinutes(${initialMinute});
        startTimeGameTimer1.setSeconds(${initialSecond});
        clearInterval(intervalGameTimer1);
        intervalGameTimer1=setInterval(()=>{
        startTimeGameTimer1.setSeconds(startTimeGameTimer1.getSeconds() ${countUp ? "+" : "-"
      } 1);
        var ss3 =  ((startTimeGameTimer1.getMinutes()).toString()).padStart(2, '0') + ':' + ((startTimeGameTimer1.getSeconds()).toString()).padStart(2, '0');
        ccGameTimer1.textContent  =ss3;
        }, 1000);`;

    executeScript(script);

    endpoint(`call ${window.chNumber}-${layerNumber} "
        ${script}
        "`);
  };

  const pauseClock2 = (layerNumber) => {
    clearInterval(intervalGameTimer2);
    endpoint(`call ${window.chNumber}-${layerNumber} "
        clearInterval(intervalGameTimer2);
        "`);
    executeScript(`clearInterval(intervalGameTimer2)`);
  };

  const showClock2 = (layerNumber) => {
    executeScript(`if(window.intervalGameTimer2){clearInterval(intervalGameTimer2)};
                        document.getElementById('divid_${layerNumber}')?.remove();`);

    canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
    selectAll(canvas);

    var startTimeGameTimer2 = new Date();
    startTimeGameTimer2.setSeconds(initialSecond2);

    endpoint(
      `mixer ${window.chNumber}-${layerNumber} fill 0 0 0 1 6 ${window.animationMethod}`
    );
    setTimeout(() => {
      endpoint(
        `play ${window.chNumber}-${layerNumber} [HTML] https://localhost:10000/ReactCasparClient/xyz.html`
      );
    }, 250);
    const script = `
        window.aaGameTimer2 = document.createElement('div');
        aaGameTimer2.style.position='absolute';
        aaGameTimer2.setAttribute('id','divid_' + '${layerNumber}');
        aaGameTimer2.style.zIndex = ${layerNumber};
        aaGameTimer2.innerHTML=\`${canvas
        .toSVG(["id", "class", "selectable"])
        .replaceAll('"', '\\"')}\`;
        document.body.appendChild(aaGameTimer2);
        document.body.style.margin='0';
        document.body.style.padding='0';
        aaGameTimer2.style.zoom=(${currentscreenSize * 100}/1920)+'%';
        document.body.style.overflow='hidden';
        window.ccGameTimer2=document.getElementById('gameTimer2').getElementsByTagName('tspan')[0];
        ccGameTimer2.textContent=${initialSecond2};
        window.startTimeGameTimer2 = new Date();
        window.intervalGameTimer2=null;
        startTimeGameTimer2.setSeconds(${initialSecond2});
        `;
    setTimeout(() => {
      endpoint(`call ${window.chNumber}-${layerNumber} "
            ${script}
                "`);
    }, 300);

    executeScript(script);

    setTimeout(() => {
      endpoint(
        `mixer ${window.chNumber}-${layerNumber} fill 0 0 1 1 10 ${window.animationMethod}`
      );
    }, 800);
  };

  const stopClock2 = (layerNumber) => {
    clearInterval(intervalGameTimer2);
    endpoint(
      `mixer ${window.chNumber}-${layerNumber} fill 0 0 0 1 12 ${window.animationMethod}`
    );
    setTimeout(() => {
      endpoint(`stop ${window.chNumber}-${layerNumber}`);
    }, 1000);
    executeScript(`if(window.intervalGameTimer2){clearInterval(intervalGameTimer2)};
        document.getElementById('divid_${layerNumber}')?.remove();`);
  };
  const resumeClock2 = (layerNumber) => {
    //for form
    var startTimeGameTimer2 = new Date();
    startTimeGameTimer2.setSeconds(initialSecond2);
    clearInterval(intervalGameTimer2);
    intervalGameTimer2 = setInterval(() => {
      countUp2
        ? startTimeGameTimer2.setSeconds(startTimeGameTimer2.getSeconds() + 1)
        : startTimeGameTimer2.getSeconds() > 0
          ? startTimeGameTimer2.setSeconds(startTimeGameTimer2.getSeconds() - 1)
          : startTimeGameTimer2.setSeconds(0);
      setInitialSecond2(startTimeGameTimer2.getSeconds());
    }, 1000);
    //for form
    const script = `
            startTimeGameTimer2.setSeconds(${initialSecond2});
            clearInterval(intervalGameTimer2);
            intervalGameTimer2=setInterval(()=>{
                ${countUp2}  ? startTimeGameTimer2.setSeconds(startTimeGameTimer2.getSeconds() + 1) : (startTimeGameTimer2.getSeconds()>0)? startTimeGameTimer2.setSeconds(startTimeGameTimer2.getSeconds() - 1):startTimeGameTimer2.setSeconds(0) ;
                var ss4 =((startTimeGameTimer2.getSeconds()).toString()).padStart(2, '0');
                ccGameTimer2.textContent  =ss4;
            }, 1000);
            `;
    endpoint(`call ${window.chNumber}-${layerNumber} "
        ${script}
        "`);
    executeScript(script);
  };

  const setOpacity1 = (canvas, e) => {
    setOpacity(e.target.value);
    canvas
      .getActiveObjects()
      .forEach((element) => element.set({ opacity: e.target.value }));
    canvas.requestRenderAll();
  };

  const setCHRSpacing = (canvas, e) => {
    setCharSpacing(e.target.value);
    canvas.getActiveObjects().forEach((element) => {
      element.set({ charSpacing: e.target.value });
    });

    canvas.requestRenderAll();
  };

  const addGameTimer = (canvas) => {
    const sss = new fabric.Textbox(
      `${initialMinute.toString().padStart(2, "0")}:${initialSecond
        .toString()
        .padStart(2, "0")}`,
      {
        shadow: shadowOptions,
        left: 10 * 1.87,
        top: 530 * 1.87,
        width: 100 * 1.87,
        fill: "#ffffff",
        backgroundColor: options.backgroundColor,
        fontFamily: options.currentFont,
        fontWeight: "bold",
        fontSize: options.currentFontSize,
        editable: true,
        objectCaching: false,
        textAlign: "center",
        stroke: "#000000",
        strokeWidth: 0,
        id: "gameTimer1",
        class: "class_" + fabric.Object.__uid,
      }
    );
    canvas.add(sss).setActiveObject(sss);
    canvas.requestRenderAll();
  };

  const addGameTimer2 = (canvas) => {
    const sss = new fabric.Textbox(
      `${initialSecond2.toString().padStart(2, "0")}`,
      {
        shadow: shadowOptions,
        left: 10,
        top: 530,
        width: 100,
        fill: "#ffffff",
        backgroundColor: options.backgroundColor,
        fontFamily: options.currentFont,
        fontWeight: "bold",
        fontSize: options.currentFontSize,
        editable: true,
        objectCaching: false,
        textAlign: "center",
        stroke: "#000000",
        strokeWidth: 0,
        id: "gameTimer2",
        class: "class_" + fabric.Object.__uid,
      }
    );
    canvas.add(sss).setActiveObject(sss);
    canvas.requestRenderAll();
  };

  const onSizeChange = (e, canvas) => {
    options.currentFontSize = e.target.value;
    setFontSize(e.target.value);
    canvas
      .getActiveObjects()
      .forEach((item) => (item.fontSize = e.target.value));
    canvas.requestRenderAll();
  };
  const makeFullScreen = () => {
    canvas?.getActiveObjects().forEach((element) => {
      element.set({
        scaleX: 1920 / element.width,
        scaleY: 1080 / element.height,
        left: 0,
        top: 0,
        strokeWidth: 0,
        rx: 0,
        ry: 0,
      });
    });
    canvas?.requestRenderAll();
  };

  const onDrawingModeChange = (mode, canvas) => {
    setCurrentMode(mode);
    if (mode === "none") {
      canvas.isDrawingMode = false;
      canvas.getObjects().forEach((item) => {
        if (!item.id) {
          const id = generateUniqueId({ type: "id" });
          item.set({
            objectCaching: false,
            id: "id_" + id,
            class: "class_" + id,
          });
        }
      });
      return;
    } else {
      canvas.isDrawingMode = true;
    }
    fabric.BaseBrush.width = options.strokeWidth;
    fabric.PencilBrush.width = options.strokeWidth;
    fabric.SprayBrush.width = options.strokeWidth;
    EraserBrush.width = options.strokeWidth;


    fabric.BaseBrush.color = options.stroke;
    fabric.PencilBrush.color = options.stroke;
    fabric.SprayBrush.color = options.stroke;
    EraserBrush.color = options.stroke;




    if (mode === "Pencil") {
      canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
      canvas.freeDrawingBrush.color = options.stroke;
      canvas.freeDrawingBrush.width = options.strokeWidth;
    } else if (mode === "Spray") {
      canvas.freeDrawingBrush = new fabric.SprayBrush(canvas);
      canvas.freeDrawingBrush.color = options.stroke;
      canvas.freeDrawingBrush.width = options.strokeWidth;
    } else if (mode === "Erase") {
      canvas.freeDrawingBrush = new EraserBrush(canvas);
      canvas.freeDrawingBrush.color = "white";
      canvas.freeDrawingBrush.width = options.strokeWidth;
    }
    canvas.freeDrawingBrush.strokeLineCap = currentstrokeLineCap;
  };
  window.onDrawingModeChange = onDrawingModeChange;

  const onFontChange = (e) => {
    options.currentFont = e.target.value;
    setCurrentFont(e.target.value);
    canvas
      .getActiveObjects()
      .forEach((item) => (item.fontFamily = e.target.value));
    canvas.requestRenderAll();
  };

  const onglobalCompositeOperationChange = (e) => {
    // options.currentFont = e.target.value;
    setCurrentglobalCompositeOperation(e.target.value);
    canvas
      .getActiveObjects()
      .forEach((item) =>
        item.set({ globalCompositeOperation: e.target.value, strokeWidth: 0 })
      );
    canvas.requestRenderAll();
  };

  const onstrokeLineCapChange = (e) => {
    canvas.freeDrawingBrush.strokeLineCap = e.target.value;
    setCurrentstrokeLineCap(e.target.value);
  };

  let fileReader;

  const importJSON = (file) => {
    if (file) {
      fileReader = new FileReader();
      fileReader.onloadend = () => handleFileReadJSON(canvas);
      fileReader.readAsText(file);
    }
  };

  const handleFileReadJSON = () => {
    const preCanvas = canvas
      .toSVG(["id", "class", "selectable"])
      .replaceAll('"', "'");
    const content = fileReader.result;
    canvas.loadFromJSON(content).then(() => {
      setclipPathWhileImporting(canvas);
    });
    importSvgCode(preCanvas);
  };
  const importSvgCode = (ss) => {
    if (ss) {
      fabric.loadSVGFromString(ss, function (objects) {
        objects?.forEach((element) => {
          canvas.add(element);
          element.set({
            objectCaching: false,
            shadow: element.shadow ? element.shadow : shadowOptions,
            id: "id_" + fabric.Object.__uid,
            class: "class_" + fabric.Object.__uid,
          });
          if (element.type === "text") {
            element.set({
              left: element.left - (element.width * element.scaleX) / 2,
              top: element.top + (element.height * element.scaleY) / 4,
            });
            element.set({ type: "textbox" });
            var textobj = element.toObject();
            var clonedtextobj = JSON.parse(JSON.stringify(textobj));
            var aa = new fabric.Textbox(element.text, clonedtextobj);
            aa.set({
              id: element.id,
              class: element.class,
              objectCaching: false,
              shadow: element.shadow ? element.shadow : shadowOptions,
              width: 1000,
            });
            canvas.remove(element);
            canvas.add(aa);
          }
        });
      });
      canvas.requestRenderAll();
    }
  };

  const resetZommandPan = () => {
    canvas.setZoom(1);
    dispatch({ type: "CHANGE_CANVAS_ZOOM", payload: 1 });

    canvas.setViewportTransform([
      canvas.getZoom(),
      0,
      0,
      canvas.getZoom(),
      0,
      0,
    ]);
  };
  const onBlurSizeChange = (value) => {
    shadowOptions.blur = value;
    canvas.getActiveObjects().forEach((item) => {
      if (item.shadow) {
        item.shadow.blur = value;
      }
    });
    canvas.requestRenderAll();
  };
  const onoffsetXChange = (value) => {
    shadowOptions.offsetX = value;
    canvas.getActiveObjects().forEach((item) => {
      if (item.shadow) {
        item.shadow.offsetX = value;
      }
    });
    canvas.requestRenderAll();
  };

  const onoffsetYChange = (value) => {
    shadowOptions.offsetY = value;
    canvas.getActiveObjects().forEach((item) => {
      if (item.shadow) {
        item.shadow.offsetY = value;
      }
    });
    canvas.requestRenderAll();
  };
  const affectStroke = (e) => {
    shadowOptions.affectStroke = e.target.checked;
    canvas.getActiveObjects().forEach((item) => {
      if (item.shadow) {
        item.shadow.affectStroke = e.target.checked;
      }
    });
    canvas.requestRenderAll();
  };
  const onstrokeSizeChange = (e) => {
    options.strokeWidth = parseInt(e.target.value);
    setStrokeWidth(parseInt(e.target.value));
    // canvas.freeDrawingBrush.width = parseInt(e.target.value);
    fabric.BaseBrush.width = parseInt(e.target.value);
    fabric.PencilBrush.width = parseInt(e.target.value);
    fabric.SprayBrush.width = parseInt(e.target.value);
    EraserBrush.width = parseInt(e.target.value);
    canvas
      .getActiveObjects()
      .forEach((item) => (item.strokeWidth = parseInt(e.target.value)));
    canvas.requestRenderAll();
  };
  const onstrokedasharraychange = (e) => {
    setstrokedasharray([parseInt(e.target.value)]);
    canvas
      .getActiveObjects()
      .forEach(
        (item) =>
        (item.strokeDashArray = [
          parseInt(e.target.value),
          parseInt(e.target.value),
        ])
      );
    canvas.requestRenderAll();
  };
  const onstrokedashoffsetchange = (e) => {
    setstrokedashoffset(parseInt(e.target.value));
    canvas
      .getActiveObjects()
      .forEach((item) => (item.strokeDashOffset = [parseInt(e.target.value)]));
    canvas.requestRenderAll();
  };
  const onSkewXSizeChange = (e) => {
    setSkewXSize(parseInt(e.target.value));
    canvas
      .getActiveObjects()
      .forEach((item) => (item.skewX = parseInt(e.target.value)));
    canvas.requestRenderAll();
  };
  const onSkewYSizeChange = (e) => {
    setSkewYSize(parseInt(e.target.value));
    canvas
      .getActiveObjects()
      .forEach((item) => (item.skewY = parseInt(e.target.value)));
    canvas.requestRenderAll();
  };
  const onRxSizeChange = (e) => {
    setSkewRX(parseInt(e.target.value));
    canvas.getActiveObjects().forEach((item) => {
      item.rx = parseInt(e.target.value);
    });
    canvas.requestRenderAll();
  };
  const onRySizeChange = (e) => {
    setSkewRY(parseInt(e.target.value));
    canvas
      .getActiveObjects()
      .forEach((item) => (item.ry = parseInt(e.target.value)));
    canvas.requestRenderAll();
  };

  const onCropX = (e) => {
    setCropX(parseInt(e.target.value));
    canvas
      .getActiveObjects()
      .forEach((item) => (item.cropX = parseInt(e.target.value)));
    canvas.requestRenderAll();
  };
  const onCropY = (e) => {
    setCropY(parseInt(e.target.value));
    canvas
      .getActiveObjects()
      .forEach((item) => (item.cropY = parseInt(e.target.value)));
    canvas.requestRenderAll();
  };

  const onHorizontalSpeedChange = (e) => {
    setHorizontalSpeed(e.target.value);
    localStorage.setItem("RCC_horizontalSpeed", e.target.value);
    endpoint(
      `call ${window.chNumber}-${templateLayers.horizontalScroll} "horizontalSpeed=${e.target.value}"`
    );
    executeScript(`horizontalSpeed=${e.target.value}`);
  };
  const onHorizontalSpeedChange2 = (e) => {
    setHorizontalSpeed2(e.target.value);
    localStorage.setItem("RCC_horizontalSpeed2", e.target.value);
    endpoint(
      `call ${window.chNumber}-${templateLayers.horizontalScroll2} "horizontalSpeed2=${e.target.value}"`
    );
    executeScript(`horizontalSpeed2=${e.target.value}`);
  };
  const exportSVG = (canvas) => {
    const options = {
      fileExtension: ".svg",
      suggestedName: generalFileName(),
      types: [
        {
          description: "svg file",
          accept: { "image/svg+xml": [".svg"] },
        },
      ],
    };
    const data = new Blob([canvas.toSVG(["id", "class", "selectable"])], {
      type: "text/xml",
    });
    saveFile(options, data);
  };

  const exportJSON = (canvas) => {
    const options = {
      fileExtension: ".json",
      suggestedName: generalFileName(),
      types: [
        {
          description: "JSON Files",
          accept: {
            "application/json": [".json"],
          },
        },
      ],
    };
    const data = new Blob(
      [JSON.stringify(canvas.toJSON(["id", "class", "selectable"]))],
      { type: "text/xml" }
    );
    saveFile(options, data);
  };

  const exportJSONforTheatrejs = (canvas) => {
    if (checkIdUniqueness(canvas)) {
      var aa1 = JSON.stringify(canvas.toJSON(["id", "class", "selectable"]));
      localStorage.setItem("RCCpageData", aa1);
      window.open("/ReactCasparClient/WebAnimator");
    } else {
      alert("All elements must have unique id");
    }
  };

  const openGdd = () => {
    window.open("/ReactCasparClient/GddTemplatePlayer");
  };
  const saveToLocalStorage = (canvas) => {
    if (checkIdUniqueness(canvas)) {
      var aa1 = JSON.stringify(canvas.toJSON(["id", "class", "selectable"]));
      localStorage.setItem("RCCpageData", aa1);
    } else {
      alert("All elements must have unique id");
    }
  };

  const getFromLocalStorage = (canvas) => {
    const aa1 = localStorage.getItem("TheatrepageData");
    canvas.loadFromJSON(aa1).then(() => {
      setclipPathWhileImporting(canvas);

      const aa = canvas.getObjects();
      aa.forEach((element) => {
        if (
          typeof element.fill === "object" &&
          element.fill !== null &&
          "r" in element.fill &&
          "g" in element.fill &&
          "b" in element.fill &&
          "a" in element.fill
        ) {
          element.set({ fill: rgbaObjectToHex(element.fill) });
        }
        if (
          typeof element.stroke === "object" &&
          element.stroke !== null &&
          "r" in element.stroke &&
          "g" in element.stroke &&
          "b" in element.stroke &&
          "a" in element.stroke
        ) {
          element.set({ stroke: rgbaObjectToHex(element.stroke) });
        }
        if (
          typeof element.shadow.color === "object" &&
          element.shadow.color !== null &&
          "r" in element.shadow.color &&
          "g" in element.shadow.color &&
          "b" in element.shadow.color &&
          "a" in element.shadow.color
        ) {
          element.set({
            shadow: {
              ...element.shadow,
              color: rgbaObjectToHex(element.shadow.color),
            },
          });
        }
      });
      canvas.requestRenderAll();
    });
  };

  const sdToHD = () => {
    canvas.getObjects().forEach((element) => {
      if (
        element.type === "image" ||
        element.type === "path" ||
        element.type === "group" ||
        element.type === "rect"
      ) {
        element.set({
          left: element.left * 1.87,
          top: element.top * 1.87,
          scaleX: element.scaleX * 1.89,
          scaleY: element.scaleY * 1.88,
        });
      } else {
        element.set({
          left: element.left * 1.87,
          top: element.top * 1.87,
          width: element.width * 1.88,
          height: element.height * 1.88,
          fontSize: element.fontSize * 1.88,
        });
      }
    });
    canvas.requestRenderAll();
  };

  const deleteSelectedItem = () => {
    deleteItemfromtimeline(kf, xpositions, dispatch);
  };

  const roundedCorners = (cornerRadius) => {
    canvas.getActiveObjects().forEach((fabricObject) => {
      const aa1 = new fabric.Rect({
        width: fabricObject.width,
        height: fabricObject.height,
        rx: cornerRadius / fabricObject.scaleX,
        ry: cornerRadius / fabricObject.scaleY,
        left: -fabricObject.width / 2,
        top: -fabricObject.height / 2,
        // objectCaching: false
      });
      fabricObject.set({ clipPath: aa1 });
      // fabricObject.set({ objectCaching: false });
    });
    canvas.requestRenderAll();
  };

  const importSVG = (file) => {
    if (file) {
      var site_url = URL.createObjectURL(file);
      fabric.loadSVGFromURL(site_url).then((o) => {
        o?.objects.forEach((element) => {
          canvas.add(element);
          element.set({ objectCaching: false, shadow: { ...shadowOptions } });
          console.log(element.type);
          if (element.type === "text") {
            element.set({
              left: element.left - (element.width * element.scaleX) / 2,
              top: element.top + (element.height * element.scaleY) / 4,
            });
            // element.set({ type: "i-text" });
            var textobj = element.toObject();
            var clonedtextobj = JSON.parse(JSON.stringify(textobj));
            var aa = new fabric.IText(element.text, clonedtextobj);
            aa.set({
              id: element.id,
              objectCaching: false,
              shadow: { ...shadowOptions },
            });
            canvas.remove(element);
            canvas.add(aa);
          }
        });
      });
      canvas.renderAll();
    }
  };

  const exportPDF = async () => {
    var aa = "";
    for (const val of canvasList) {
      // eslint-disable-next-line
      await new Promise((resolve) => {
        canvas.loadFromJSON(val.pageValue).then(() => {
          selectAll(canvas);
          var ww = canvas.getActiveObject()?.getBoundingRect().width + 100;
          var hh = canvas.getActiveObject()?.getBoundingRect().height + 100;
          // Modify the viewBox before converting to SVG
          canvas.setDimensions({
            width: ww > 1920 ? ww : 1920,
            height: hh > 1080 ? hh : 1080,
          }); // Change the canvas dimensions
          canvas.renderAll(); // Render the canvas with the new dimensions

          aa += `<div> ${canvas.toSVG()}</div> `;
          if (ww > 1920 || hh > 1080) {
            // reset the viewBox after converting to SVG
            canvas.setDimensions({ width: 1920, height: 1080 }); // Change the canvas dimensions
            canvas.renderAll(); // Render the canvas with the new dimensions
          }

          canvas.renderAll();
          resolve();
        });
      });
    }
    canvas.discardActiveObject();
    canvas.requestRenderAll();
    await new Promise((resolve) => setTimeout(resolve, 2000));
    var myWindow = window.open("", "MsgWindow", "width=1920,height=1080");
    myWindow.document.body.innerHTML = aa;
  };

  const setHtmlString = () => {
    const gdd = getGdd(canvas, "RCC");
    html = `<!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>Document</title>
                            ${gdd}
                            <link rel="stylesheet" href="${cssfilename}.css">
                                <link rel="stylesheet" href="${cssfilename2}.css">
                                </head>
                                <body>
                                    <script>
                                        document.body.addEventListener('keypress', function(e) {
                if(e.key.toUpperCase() === "S") {stop(); }
              });
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
                                        aa.style.zoom=(${currentscreenSize * 100
      }/1920)+'%';
                                        observer.disconnect();
            });
                                        observer.observe(elementToObserve, {subtree: true, childList: true })

                                        var dataCaspar = { };

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
            var data = { }; // resulting object
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
                                                  const lines =idTemplate.getElementsByTagName('extraproperty')[0].getAttribute('lines');
                                                  if (lines === '1') {
                                                      idTemplate.getElementsByTagName('text')[0].getElementsByTagName('tspan')[0].innerHTML = escapeHtml(dataCaspar[idCaspar]);
                                                      idTemplate.style.display = "block";
                                                      if (idTemplate.getElementsByTagName('extraproperty')[0] != undefined) {
                                                          var textalign1 = idTemplate.getElementsByTagName('extraproperty')[0].getAttribute('textalign');
                                                          var width1 = idTemplate.getElementsByTagName('extraproperty')[0].getAttribute('width');
                                                          var originalFontSize = idTemplate.getElementsByTagName('extraproperty')[0].getAttribute('originalfontsize');
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
                                                  else {
                                                    idTemplate.style.display = "block";
                                                    var textElement = idTemplate.getElementsByTagName('text')[0];
                                                    var existingTspans = Array.from(textElement.getElementsByTagName('tspan'));
                                                    var initialX = existingTspans[0].getAttribute('x');
                                                    var initialY = existingTspans[0].getAttribute('y');
                                                    var initialDy = existingTspans[1].getAttribute('y') - existingTspans[0].getAttribute('y');
                                                    var newData = escapeHtml(dataCaspar[idCaspar]);
                                                    var dataSegments = newData.split('CRLF');
                                                    var maxWidth = idTemplate.getElementsByTagName('extraproperty')[0].getAttribute('width');
                        
                                                    function splitTextIntoLines(text, maxWidth) {
                                                        var words = text.split(' ');
                                                        var lines = [];
                                                        var currentLine = '';
                                                        words.forEach(function (word) {
                                                            var testLine = currentLine.length === 0 ? word : currentLine + ' ' + word;
                                                            var testWidth = textElement.getSubStringLength(0, testLine.length);
                        
                                                            if (testWidth > maxWidth) {
                                                                lines.push(currentLine);
                                                                currentLine = word;
                                                            } else {
                                                                currentLine = testLine;
                                                            }
                                                        });
                                                        lines.push(currentLine);
                                                        return lines;
                                                    }
                        
                                                    var tspans = [];
                                                    var previoustxtlines = 0;
                        
                                                    dataSegments.forEach(function (segment, i) {
                                                        if (segment.trim() === '') {
                                                          segment=' ';
                                                        }
                                                        textElement.innerHTML = segment;
                                                        var txtlines = splitTextIntoLines(segment, maxWidth);
                                                        txtlines.forEach(function (line, j) {
                                                            var tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                                                            tspan.textContent = line;
                                                            tspan.setAttribute('x', initialX);
                                                            tspan.setAttribute('y', parseInt(initialY) + (parseInt(initialDy) * (previoustxtlines + j)));
                                                            tspans.push(tspan);
                                                        });
                                                        previoustxtlines += txtlines.length;
                                                    });
                                                    textElement.innerHTML = '';
                                                    if (tspans.length === 1) {
                                                        var tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                                                        tspan.textContent = ' ';
                                                        tspan.setAttribute('x', initialX);
                                                        tspan.setAttribute('y', parseInt(initialY) + parseInt(initialDy));
                                                        tspans.push(tspan);
                                                    }
                        
                                                    tspans.forEach(function (tspan) {
                                                        textElement.appendChild(tspan);
                                                    });
                        
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
                                        document.body.innerHTML = '' ;
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
                                <div> ${canvas.toSVG([
        "id",
        "class",
        "selectable",
      ])}  </div>
                            </body>
                            <script src="${jsfilename}.js"></script>
                            <script src="${jsfilename2}.js"></script>
                        </html>`;
  };

  function previewHtml(canvas) {
    var myWindow = window.open("", "MsgWindow", "width=200,height=100");
    // setHtmlString()
    myWindow.document.body.innerHTML = "";
    myWindow.document.write(canvas.toSVG());
  }

  async function exportHTML(canvas) {
    canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
    selectAll(canvas);
    var ss = generalFileName();
    const options = {
      suggestedName: canvasList[currentPage]
        ? canvasList[currentPage].pageName
        : ss,
      types: [
        {
          description: "Html file",
          accept: { "text/html": [".html"] },
        },
      ],
    };
    setHtmlString();
    const data = new Blob([html], { type: "text/html" });

    const aa = await saveFile(options, data);
    sethtmlfileHandle(aa);

    exportPage(canvas, aa);
    deSelectAll(canvas);
  }
  async function exportPage(canvas, aa) {
    const options1 = {
      suggestedName: aa.name.split(".")[0],
      types: [
        {
          description: "Text file",
          accept: { "text/plain": [".txt"] },
        },
      ],
    };

    const aa1 = await window.showSaveFilePicker(options1);
    sethtmlpageHandle(aa1);
    const writable1 = await aa1.createWritable();
    const bb =
      JSON.stringify({
        pageName: aa1.name,
        pageValue: canvas.toJSON(["id", "class", "selectable"]),
        animation: "",
        jsfilename: jsfilename,
        cssfilename: cssfilename,
        jsfilename2: jsfilename2,
        cssfilename2: cssfilename2,
      }) + "\r\n";
    const file1 = new Blob([bb], { type: "text/plain" });

    await writable1.write(file1);
    await writable1.close();
  }

  async function OverrightHtml(canvas) {
    canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
    selectAll(canvas);
    // const writable = await htmlfileHandle.createWritable();
    setHtmlString();
    const data = new Blob([html], { type: "text/html" });
    // await writable.write(file);
    // await writable.close();
    saveFile(null, data, htmlfileHandle);

    if (htmlpageHandle) {
      const writable1 = await htmlpageHandle.createWritable();
      const bb =
        JSON.stringify({
          pageName: htmlpageHandle.name,
          pageValue: canvas.toJSON(["id", "class", "selectable"]),
          animation: "",
          jsfilename: jsfilename,
          cssfilename: cssfilename,
          jsfilename2: jsfilename2,
          cssfilename2: cssfilename2,
        }) + "\r\n";

      const file1 = new Blob([bb], { type: "text/plain" });
      await writable1.write(file1);
      await writable1.close();
    }
    deSelectAll(canvas);
  }

  const exportPng = async (canvas) => {
    canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
    selectAll(canvas);
    var br = canvas.getActiveObject()?.getBoundingRect();
    var ss = generalFileName();
    const options = {
      fileExtension: ".png",
      suggestedName: ss,
      types: [
        {
          description: "png file",
          accept: {
            "image/png": [".png"],
          },
        },
      ],
    };
    const data1 = canvas.toDataURL({
      format: "png",
      left: br.left,
      top: br.top,
      width: br.width,
      height: br.height,
    });
    const data = await (await fetch(data1)).blob();
    saveFile(options, data);
  };

  const exportPngFullPage = (canvas) => {
    canvas.discardActiveObject();
    canvas.renderAll();
    canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
    var ss = generalFileName();
    const options = {
      fileExtension: ".png",
      suggestedName: ss,
      types: [
        {
          description: "png file",
          accept: {
            "image/png": [".png"],
          },
        },
      ],
    };
    canvas.getElement().toBlob((data) => {
      saveFile(options, data);
    });
  };

  const exportAllPngFullPage = async (canvas) => {
    try {
      const ss = generalFileName().replace(/[^a-z0-9_\\-]/gi, "_");
      canvas.discardActiveObject();
      canvas.renderAll();
      canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
      let iii = 1;
      const directoryHandle = await window.showDirectoryPicker();

      for (const val of canvasList) {
        // Load the JSON and wait for it to fully render
        await new Promise((resolve) => {
          canvas.loadFromJSON(val.pageValue).then(() => {
            canvas.renderAll(); // Ensure the canvas is fully rendered
            resolve();
          });
        });

        // Convert the canvas to a Blob and save it
        const data = await new Promise((resolve) => {
          canvas.getElement().toBlob(resolve);
        });

        const fileHandle = await directoryHandle.getFileHandle(
          `${ss}_${iii}.png`,
          { create: true }
        );
        const writable = await fileHandle.createWritable();
        await writable.write(data);
        await writable.close();
        iii++;
      }
    } catch (err) {
      console.error("Folder selection or file save failed:", err);
    }
  };

  const exportAllPng = async (canvas) => {
    try {
      const ss = generalFileName().replace(/[^a-z0-9_\\-]/gi, "_");
      canvas.discardActiveObject();
      canvas.renderAll();
      canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
      let iii = 1;
      const directoryHandle = await window.showDirectoryPicker();

      for (const val of canvasList) {
        // Load the JSON and wait for it to fully render
        await new Promise((resolve) => {
          canvas.loadFromJSON(val.pageValue).then(() => {
            canvas.renderAll(); // Ensure the canvas is fully rendered
            resolve();
          });
        });

        selectAll(canvas);
        var br = canvas.getActiveObject()?.getBoundingRect();

        // Convert the canvas to a Blob and save it
        // const data = await new Promise((resolve) => {
        //   canvas.getElement().toBlob(resolve);
        // });

        const data1 = canvas.toDataURL({
          format: "png",
          left: br.left,
          top: br.top,
          width: br.width,
          height: br.height,
        });
        const data = await (await fetch(data1)).blob();

        const fileHandle = await directoryHandle.getFileHandle(
          `${ss}_${iii}.png`,
          { create: true }
        );
        const writable = await fileHandle.createWritable();
        await writable.write(data);
        await writable.close();
        iii++;
      }
    } catch (err) {
      console.error("Folder selection or file save failed:", err);
    }
  };

  const exportHorizontalScrollAsHTML = (canvas) => {
    canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
    selectAll(canvas);
    var hh = canvas.getActiveObject()?.getBoundingRect().width + 100;
    var aa = `<!DOCTYPE html>
                                    <html lang="en">
                                        <head>
                                            <meta charset="UTF-8">
                                                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                                                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                                        <title>Document</title>
                                                    </head>
                                                    <body>
                                                        `;
    aa += "<div>" + canvas.toSVG(["id", "class", "selectable"]) + "</div>";
    aa += `
                                                        <script>
                                                            var aa = document.getElementsByTagName('div')[0];
                                                            aa.style.position='absolute';
                                                            document.getElementsByTagName('svg')[0].style.width='${hh}';
                                                            document.getElementsByTagName('svg')[0].setAttribute('viewBox','0 0 ${hh} 1080');
                                                            aa.style.zoom=(${currentscreenSize *
      100
      }/1920)+'%';
                                                            document.body.style.overflow='hidden';
                                                            var speed=${horizontalSpeed};
                                                            if (${!ltr}){
                                                                aa.style.left = '100%';
                                                            setInterval(function(){
                                                                aa.style.left = (aa.getBoundingClientRect().left - speed) + 'px';
                                                            if (aa.getBoundingClientRect().left < -${hh}){aa.style.left = '100%'};
           }, 1);
        }
                                                            else{
                                                                aa.style.left = '-${hh}px';
                                                            setInterval(function(){
                                                                aa.style.left = (aa.getBoundingClientRect().left + speed) + 'px';
                if (aa.getBoundingClientRect().left >${hh}){aa.style.left = '-${hh}px'};
             }, 1);
        }
        const elementToRemove = document.getElementById('scroll1_strip');
		if (elementToRemove) {
			const svgElement = document.getElementsByTagName('svg')[0];
			const clonedSvg = svgElement.cloneNode(true);

			Array.from(clonedSvg.children).forEach((child) => {
				if (child.id !== 'scroll1_strip') {
					child.remove();
				}
			});

			const clonedScrollStrip = clonedSvg.getElementById('scroll1_strip');
			clonedScrollStrip.setAttribute('id', 'new_scroll1_strip');

			const newDiv = document.createElement('div');
			newDiv.setAttribute('id', 'div_${templateLayers.scroll1_strip}');
      newDiv.style.zoom=(${currentscreenSize * 100}/1920)+'%';
			newDiv.appendChild(clonedSvg);
			document.body.appendChild(newDiv);

			elementToRemove.remove();

		}                                               
        </script>
                                                        `;
    aa += `
                                                    </body>
                                                </html>`;
    const data = new Blob([aa], { type: "text/html" });
    const options = {
      suggestedName: generalFileName(),
      types: [
        {
          description: "HTML Files",
          accept: {
            "text/html": [".html"],
          },
        },
      ],
    };
    saveFile(options, data);
  };
  const exportHorizontalScrollAsHTML2 = (canvas) => {
    canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
    selectAll(canvas);
    var hh = canvas.getActiveObject()?.getBoundingRect().width + 100;
    var aa = `<!DOCTYPE html>
                                                <html lang="en">
                                                    <head>
                                                        <meta charset="UTF-8">
                                                            <meta http-equiv="X-UA-Compatible" content="IE=edge">
                                                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                                                    <title>Document</title>
                                                                </head>
                                                                <body>
                                                                    `;
    aa += "<div>" + canvas.toSVG(["id", "class", "selectable"]) + "</div>";
    aa += `
                                                                    <script>
                                                                        var aa = document.getElementsByTagName('div')[0];
                                                                        aa.style.position='absolute';
                                                                        document.getElementsByTagName('svg')[0].style.width='${hh}';
                                                                        document.getElementsByTagName('svg')[0].setAttribute('viewBox','0 0 ${hh} 1080');
                                                                        aa.style.zoom=(${currentscreenSize *
      100
      }/1920)+'%';
                                                                        document.body.style.overflow='hidden';
                                                                        var speed=${horizontalSpeed2};
                                                                        if (${!ltr2}){
                                                                            aa.style.left = '100%';
                                                                        setInterval(function(){
                                                                            aa.style.left = (aa.getBoundingClientRect().left - speed) + 'px';
                                                                        if (aa.getBoundingClientRect().left < -${hh}){aa.style.left = '100%'};
           }, 1);
        }
                                                                        else{
                                                                            aa.style.left = '-${hh}px';
                                                                        setInterval(function(){
                                                                            aa.style.left = (aa.getBoundingClientRect().left + speed) + 'px';
                if (aa.getBoundingClientRect().left >${hh}){aa.style.left = '-${hh}px'};
             }, 1);
        }
        const elementToRemove = document.getElementById('scroll2_strip');
        if (elementToRemove) {
          const svgElement = document.getElementsByTagName('svg')[0];
          const clonedSvg = svgElement.cloneNode(true);
    
          Array.from(clonedSvg.children).forEach((child) => {
            if (child.id !== 'scroll2_strip') {
              child.remove();
            }
          });
    
          const clonedScrollStrip = clonedSvg.getElementById('scroll2_strip');
          clonedScrollStrip.setAttribute('id', 'new_scroll2_strip');
    
          const newDiv = document.createElement('div');
          newDiv.setAttribute('id', 'div_${templateLayers.scroll2_strip}');
          newDiv.style.zoom=(${currentscreenSize * 100}/1920)+'%';
          newDiv.appendChild(clonedSvg);
          document.body.appendChild(newDiv);
    
          elementToRemove.remove();
       
        }             
                                                                    </script>
                                                                    `;
    aa += `
                                                                </body>
                                                            </html>`;
    const data = new Blob([aa], { type: "text/html" });
    const options = {
      suggestedName: generalFileName(),
      types: [
        {
          description: "HTML Files",
          accept: {
            "text/html": [".html"],
          },
        },
      ],
    };
    saveFile(options, data);
  };

  const exportClockAsHTML = (canvas) => {
    canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
    var aa = `<!DOCTYPE html>
                                                            <html lang="en">
                                                                <head>
                                                                    <meta charset="UTF-8">
                                                                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                                                                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                                                                <title>Document</title>
                                                                            </head>

                                                                            <body>
                                                                                `;
    aa += "<div>" + canvas.toSVG(["id", "class", "selectable"]) + "</div>";
    aa += `
                                                                            </body>
                                                                            <script>

                                                                                document.body.style.margin='0';
                                                                                document.body.style.padding='0';
                                                                                document.body.style.overflow='hidden';

                                                                                var aa = document.getElementsByTagName('div')[0];
                                                                                aa.style.position='absolute';
                                                                                aa.style.zoom=(${currentscreenSize *
      100
      }/1920)+'%';
                                                                                var cc=document.getElementsByTagName('tspan')[0];
                                                                                cc.textContent='';
                                                                                setInterval(function() {
                var ss1 = new Date().toLocaleTimeString('en-US', {hour12: false, hour: 'numeric', minute: 'numeric', second: 'numeric' });
                                                                                cc.textContent  =ss1;
              }, 1000);
                                                                            </script>
                                                                        </html>`;
    const data = new Blob([aa], { type: "text/html" });
    const options = {
      suggestedName: generalFileName(),
      types: [
        {
          description: "HTML Files",
          accept: {
            "text/html": [".html"],
          },
        },
      ],
    };
    saveFile(options, data);
  };

  const exportUpTimerAsHTML = (canvas) => {
    canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
    var aa = `<!DOCTYPE html>
                                                                        <html lang="en">
                                                                            <head>
                                                                                <meta charset="UTF-8">
                                                                                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                                                                                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                                                                            <title>Document</title>
                                                                                        </head>

                                                                                        <body>
                                                                                            `;
    aa += "<div>" + canvas.toSVG(["id", "class", "selectable"]) + "</div>";
    aa += `
                                                                                        </body>
                                                                                        <script>
                                                                                            document.body.style.margin='0';
                                                                                            document.body.style.padding='0';
                                                                                            document.body.style.overflow='hidden';
                                                                                            var aa = document.getElementsByTagName('div')[0];
                                                                                            aa.style.position='absolute';
                                                                                            aa.style.zoom=(${currentscreenSize *
      100
      }/1920)+'%';
                                                                                            var cc=document.getElementsByTagName('tspan')[0];
                                                                                            cc.textContent='';
                                                                                            var startTime = new Date();
                                                                                            setInterval(function() {
            var diff = (new Date()).getTime() - startTime.getTime();
                                                                                            var date_diff = new Date(diff - 30 * 60 * 1000);
                                                                                            var ss1 = date_diff.toLocaleString('en-US', {minute: '2-digit', second: '2-digit' }) + ':' + String(date_diff.getMilliseconds()).padStart(3, '0');
                                                                                            cc.textContent  =ss1;
          }, 40);
                                                                                        </script>
                                                                                    </html>`;
    const data = new Blob([aa], { type: "text/html" });
    const options = {
      suggestedName: generalFileName(),
      types: [
        {
          description: "HTML Files",
          accept: {
            "text/html": [".html"],
          },
        },
      ],
    };
    saveFile(options, data);
  };

  const startHorizontalScroll = (layerNumber) => {
    executeScript(`if(window.intervalHorizontalScroll1){clearInterval(intervalHorizontalScroll1)};
        document.getElementById('divid_${layerNumber}')?.remove();
        document.getElementById('divid_${templateLayers.scroll1_strip}')?.remove();
        `);

    canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
    selectAll(canvas);
    var hh = canvas.getActiveObject()?.getBoundingRect().width + 200;
    endpoint(
      `play ${window.chNumber}-${layerNumber} [HTML] https://localhost:10000/ReactCasparClient/xyz.html`
    );
    const script = `
                                                                                    window.aaHorizontal1 = document.createElement('div');
                                                                                    aaHorizontal1.style.position='absolute';
                                                                                    aaHorizontal1.setAttribute('id','divid_' + '${layerNumber}');
                                                                                    aaHorizontal1.style.zIndex = ${layerNumber};
                                                                                    aaHorizontal1.innerHTML=\`${canvas
        .toSVG(
          [
            "id",
            "class",
            "selectable",
          ]
        )
        .replaceAll(
          '"',
          '\\"'
        )}\`;
                                                                                    document.body.appendChild(aaHorizontal1);
                                                                                    document.getElementById('divid_${layerNumber}').getElementsByTagName('svg')[0].style.width='${hh}';
                                                                                    document.getElementById('divid_${layerNumber}').getElementsByTagName('svg')[0].setAttribute('viewBox','0 0 ${hh} 1080');
                                                                                    aaHorizontal1.style.zoom=(${currentscreenSize *
      100
      }/1920)+'%';
                                                                                    document.body.style.overflow='hidden';
                                                                                    window.horizontalSpeed=${horizontalSpeed};
                                                                                    if (${!ltr}){
                                                                                        aaHorizontal1.style.left = '100%';
                                                                                    window.intervalHorizontalScroll1=setInterval(function() {
                                                                                        aaHorizontal1.style.left = (aaHorizontal1.getBoundingClientRect().left - horizontalSpeed) + 'px';
                                                                                    if (aaHorizontal1.getBoundingClientRect().left < -${hh}){aaHorizontal1.style.left = '100%'};
                    }, 1);
                    }
                                                                                    else{
                                                                                        aaHorizontal1.style.left = -${hh}+'px';
                                                                                    window.intervalHorizontalScroll1=setInterval(function() {
                                                                                        aaHorizontal1.style.left = (aaHorizontal1.getBoundingClientRect().left + horizontalSpeed) + 'px';
            if (aaHorizontal1.getBoundingClientRect().left > ${currentscreenSize}){aaHorizontal1.style.left = -${hh} +'px'};
            }, 1);
        }
        const elementToRemove1 = document.getElementById('divid_' + '${layerNumber}').querySelector('#scroll1_strip');
        if (elementToRemove1) {
          const svgElement1 = document.getElementById('divid_' + '${layerNumber}').querySelectorAll('svg')[0];
          const clonedSvg1 = svgElement1.cloneNode(true);
    
          Array.from(clonedSvg1.children).forEach((child) => {
            if (child.id !== 'scroll1_strip') {
              child.remove();
            }
          });
    
          const clonedScrollStrip1 = clonedSvg1.getElementById('scroll1_strip');
          clonedScrollStrip1.setAttribute('id', 'new_strip');
    
          const newDiv1 = document.createElement('div');
          newDiv1.style.position='absolute';
          newDiv1.setAttribute('id', 'divid_${templateLayers.scroll1_strip}');
			    newDiv1.style.zoom=(${currentscreenSize * 100}/1920)+'%';
          newDiv1.appendChild(clonedSvg1);
          document.body.appendChild(newDiv1);
          elementToRemove1.remove();
        }             
                                                                                    `;
    endpoint(`call ${window.chNumber}-${layerNumber} "
                                                                                    ${script}
                                                                                    "`);
    executeScript(script);
  };
  const startHorizontalScroll2 = (layerNumber) => {
    executeScript(`if(window.intervalHorizontalScroll2){clearInterval(intervalHorizontalScroll2)};
                        document.getElementById('divid_${layerNumber}')?.remove();
                        document.getElementById('divid_${templateLayers.scroll2_strip}')?.remove();
        `);
    canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
    selectAll(canvas);
    var hh = canvas.getActiveObject()?.getBoundingRect().width + 200;
    endpoint(
      `play ${window.chNumber}-${layerNumber} [HTML] https://localhost:10000/ReactCasparClient/xyz.html`
    );
    const script = `
                                                                                    window.aaHorizontal2 = document.createElement('div');
                                                                                    aaHorizontal2.style.position='absolute';
                                                                                    aaHorizontal2.setAttribute('id','divid_' + '${layerNumber}');
                                                                                    aaHorizontal2.style.zIndex = ${layerNumber};
                                                                                    aaHorizontal2.innerHTML=\`${canvas
        .toSVG(
          [
            "id",
            "class",
            "selectable",
          ]
        )
        .replaceAll(
          '"',
          '\\"'
        )}\`;
                                                                                    document.body.appendChild(aaHorizontal2);
                                                                                    document.getElementById('divid_${layerNumber}').getElementsByTagName('svg')[0].style.width='${hh}';
                                                                                    document.getElementById('divid_${layerNumber}').getElementsByTagName('svg')[0].setAttribute('viewBox','0 0 ${hh} 1080');
                                                                                    aaHorizontal2.style.zoom=(${currentscreenSize *
      100
      }/1920)+'%';
                                                                                    document.body.style.overflow='hidden';
                                                                                    window.horizontalSpeed2=${horizontalSpeed2};
                                                                                    if (${!ltr2}){
                                                                                        aaHorizontal2.style.left = '100%';
                    window.intervalHorizontalScroll2=setInterval(()=>{
                                                                                        aaHorizontal2.style.left = aaHorizontal2.getBoundingClientRect().left - horizontalSpeed2 + 'px';
                                                                                    if (aaHorizontal2.getBoundingClientRect().left < -${hh}){aaHorizontal2.style.left = '100%'};
                    }, 1);
                    }
                                                                                    else{
                                                                                        aaHorizontal2.style.left = -${hh}+'px';
            window.intervalHorizontalScroll2=setInterval(()=>{
                                                                                        aaHorizontal2.style.left = aaHorizontal2.getBoundingClientRect().left + horizontalSpeed2 + 'px';
            if (aaHorizontal2.getBoundingClientRect().left > ${currentscreenSize}){aaHorizontal2.style.left = -${hh}+'px'};
            }, 1);
        }
        const elementToRemove2 = document.getElementById('divid_' + '${layerNumber}').querySelector('#scroll2_strip');
        if (elementToRemove2) {
          const svgElement2 = document.getElementById('divid_' + '${layerNumber}').querySelectorAll('svg')[0];
          const clonedSvg2 = svgElement2.cloneNode(true);
    
          Array.from(clonedSvg2.children).forEach((child) => {
            if (child.id !== 'scroll2_strip') {
              child.remove();
            }
          });
    
          const clonedScrollStrip2 = clonedSvg2.getElementById('scroll2_strip');
          clonedScrollStrip2.setAttribute('id', 'new_strip2');
    
          const newDiv2 = document.createElement('div');
          newDiv2.style.position='absolute';
          newDiv2.style.zoom=(${currentscreenSize * 100}/1920)+'%';
          newDiv2.setAttribute('id', 'divid_${templateLayers.scroll2_strip}');

          newDiv2.appendChild(clonedSvg2);
          document.body.appendChild(newDiv2);
    
          elementToRemove2.remove();
        }                                                                                      `;
    endpoint(`call ${window.chNumber}-${layerNumber} "
                                                                                    ${script}
                                                                                    "`);
    executeScript(script);
  };
  const startClock = (layerNumber) => {
    executeScript(`if(window.xxxClock){clearInterval(xxxClock)};
                        document.getElementById('divid_${layerNumber}')?.remove();`);

    canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
    selectAll(canvas);

    endpoint(
      `play ${window.chNumber}-${layerNumber} [HTML] https://localhost:10000/ReactCasparClient/xyz.html`
    );
    const script = `
                                                                                    window.aaClock = document.createElement('div');
                                                                                    aaClock.style.position='absolute';
                                                                                    aaClock.setAttribute('id','divid_' + '${layerNumber}');
                                                                                    aaClock.style.zIndex = ${layerNumber};
                                                                                    aaClock.innerHTML=\`${canvas
        .toSVG(
          [
            "id",
            "class",
            "selectable",
          ]
        )
        .replaceAll(
          '"',
          '\\"'
        )}\`;
                                                                                    document.body.appendChild(aaClock);

                                                                                    document.body.style.margin='0';
                                                                                    document.body.style.padding='0';
                                                                                    aaClock.style.zoom=(${currentscreenSize *
      100
      }/1920)+'%';
                                                                                    document.body.style.overflow='hidden';

                                                                                    window.ccClock=document.getElementById('clock1').getElementsByTagName('tspan')[0];
                                                                                    ccClock.textContent='';
        window.xxxClock=setInterval(()=>{
            var ss1 = new Date().toLocaleTimeString('en-US', {hour12: false, hour: 'numeric', minute: 'numeric', second: 'numeric' });
                                                                                    ccClock.textContent  =ss1;
        }, 1000);
                                                                                    `;
    endpoint(`call ${window.chNumber}-${layerNumber} "
                                                                                    ${script}
                                                                                    "`);
    executeScript(script);
  };
  const startUpTimer = (layerNumber) => {
    executeScript(`
        if(window.xxxUpTimer){clearInterval(xxxUpTimer)};
        document.getElementById('divid_${layerNumber}')?.remove();
        `);

    canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
    selectAll(canvas);
    endpoint(
      `play ${window.chNumber}-${layerNumber} [HTML] https://localhost:10000/ReactCasparClient/xyz.html`
    );
    const script = `
                                                                                    window.aaUpTimer = document.createElement('div');
                                                                                    aaUpTimer.style.position='absolute';
                                                                                    aaUpTimer.setAttribute('id','divid_' + '${layerNumber}');
                                                                                    aaUpTimer.style.zIndex = ${layerNumber};
                                                                                    aaUpTimer.innerHTML=\`${canvas
        .toSVG(
          [
            "id",
            "class",
            "selectable",
          ]
        )
        .replaceAll(
          '"',
          '\\"'
        )}\`;
                                                                                    document.body.appendChild(aaUpTimer);
                                                                                    document.body.style.margin='0';
                                                                                    document.body.style.padding='0';
                                                                                    aaUpTimer.style.zoom=(${currentscreenSize *
      100
      }/1920)+'%';
                                                                                    document.body.style.overflow='hidden';
                                                                                    window.ccUpTimer=document.getElementById('uptimer1').getElementsByTagName('tspan')[0];
                                                                                    ccUpTimer.textContent='00:00:000';
                                                                                    window.xxxUpTimer=null;
                                                                                    window.diff=null;
                                                                                    window.diffLast=0;
                                                                                    window.date_diff=null;
                                                                                    window.ss2=null ;
                                                                                    `;
    endpoint(`call ${window.chNumber}-${layerNumber} "
                                                                                    ${script}
                                                                                    "`);
    executeScript(script);
  };
  const resumeUpTimer = () => {
    const script = `
                                                                                    window.startTime = new Date();
                                                                                    if(window.xxxUpTimer){clearInterval(xxxUpTimer)};
                                                                                    xxxUpTimer=setInterval(function() {
                                                                                        diff = diffLast + (new Date()).getTime() - startTime.getTime();
                                                                                    date_diff = new Date(diff - 30 * 60 * 1000);
                                                                                    ss2 = date_diff.toLocaleString('en-US', {minute: '2-digit', second: '2-digit' }) + ':' + String(date_diff.getMilliseconds()).padStart(3, '0');
                                                                                    ccUpTimer.textContent  =ss2;
         }, 40);
                                                                                    `;
    endpoint(`call ${window.chNumber}-${templateLayers.countUpTimer} "
                                                                                    ${script}
                                                                                    "`);
    executeScript(script);
  };

  const pauseUpTimer = () => {
    const script = `
                                                                                    clearInterval(xxxUpTimer);
                                                                                    diffLast=diff;
                                                                                    `;
    endpoint(`call ${window.chNumber}-${templateLayers.countUpTimer} "
                                                                                    ${script}
                                                                                    "`);
    executeScript(script);
  };

  useEffect(() => {
    if (localStorage.getItem("RCC_currentscreenSize")) {
      dispatch({
        type: "CHANGE_CURRENTSCREENSIZE",
        payload: parseInt(localStorage.getItem("RCC_currentscreenSize")),
      });
    }
    setSolidcaption2(localStorage.getItem("RCC_solidCaption2"));
    setSolidcaption3(localStorage.getItem("RCC_solidCaption3"));
    setLogo(localStorage.getItem("RCC_logo"));
    setLocationBand(localStorage.getItem("RCC_locationBand"));
    setClock(localStorage.getItem("RCC_clock"));
    // setVerticalScroll(localStorage.getItem("RCC_verticalScroll"));
    setHorizontalScroll(localStorage.getItem("RCC_horizontalScroll"));
    setHorizontalSpeed(localStorage.getItem("RCC_horizontalSpeed"));
    setHorizontalScroll2(localStorage.getItem("RCC_horizontalScroll2"));
    setHorizontalSpeed2(localStorage.getItem("RCC_horizontalSpeed2"));

    if (window.location.origin !== "https://vimlesh1975.github.io") {
      axios
        .post(address1 + "/getfonts")
        .then((aa) => {
          setFontList(aa.data);
        })
        .catch((aa) => {
          console.log("Error", aa);
        });
    }
    return () => { };
    // eslint-disable-next-line
  }, []);

  const onTabChange = (index, prevIndex) => {
    switch (index) {
      case 0:
      case 4:
        setTimeout(() => {
          window.dispatchEvent(new Event("resize"));
        }, 100);
        break;
      default:
      //nothing
    }
  };
  const getvalues = () => {
    try {
      if (canvas?.getActiveObjects()?.[0]) {
        const element = canvas?.getActiveObjects()?.[0];
        if (element.rx !== null) {
          setSkewRX(element.rx);
        }
        if (element.ry !== null) {
          setSkewRY(element.ry);
        }
        if (element.skewX !== null) {
          setSkewXSize(element.skewX.toFixed(0));
        }
        // if (element.skewX !== null) {setSkewXSize(element.skewX); }
        if (element.skewY !== null) {
          setSkewYSize(element.skewY.toFixed(0));
        }
        if (element.fontFamily !== null) {
          setCurrentFont(element.fontFamily);
        }
        if (element.fontSize !== null) {
          setFontSize(element.fontSize);
        }
        if (element.strokeWidth !== null) {
          setStrokeWidth(element.strokeWidth);
        }

        if (element.opacity !== null) {
          setOpacity(parseFloat(element.opacity).toFixed(1));
        }
        if (element.charSpacing !== null) {
          setCharSpacing(element.charSpacing);
        }

        if (element.scaleX !== null) {
          setscaleX(element.scaleX);
        }
        if (element.scaleY !== null) {
          setscaleY(element.scaleY);
        }

        if (element.left !== null) {
          setX(parseInt(element.left));
        }
        if (element.top !== null) {
          setY(parseInt(element.top));
        }

        if (element.width !== null) {
          setWidth(parseInt(element.width));
        }
        if (element.height !== null) {
          setHeight(parseInt(element.height));
        }

        if (element.angle !== null) {
          setangle(parseInt(element.angle));
        }

        if (element.fontStyle !== null) {
          setitallicnormal(element.fontStyle);
        }
        if (element.fontWeight !== null) {
          setfontWeight1(element.fontWeight);
        }

        if (element.undeline !== null) {
          setunderline1(element.underline ? "underline" : "");
        }
        if (element.undeline !== null) {
          setlinethrough1(element.linethrough ? "line-through" : "");
        }

        setCurrentFillColor(element.fill);

        if (element.strokeDashArray !== null) {
          setstrokedasharray(element.strokeDashArray);
        } else {
          setstrokedasharray([0, 0]);
        }
        if (element.strokeDashOffset !== null) {
          setstrokedashoffset(element.strokeDashOffset);
        }
        if (element.shadow !== null) {
          refShadowColor.current.value = element.shadow.color;
          refBlur.current.value = element.shadow.blur;
          refOffsetX.current.value = element.shadow.offsetX;
          refOffsetY.current.value = element.shadow.offsetY;
          refAffectStroke.current.checked = element.shadow.affectStroke;
        }
      }
    } catch (error) {

    }

  };

  const clientAddress = () => {
    const aa = window.location.href + "/html/" + clientId;
    return aa.replaceAll("//", "/");
  };
  const openClientAddress = () => {
    const aa = clientAddress();
    window.open(new URL(aa), "_blank");
    // setTimeout(() => {
    //     sendtohtml(canvas);
    // }, 1000);
  };

  window.getvalues = getvalues;
  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          width: 495,
          height: 900,
          backgroundColor: "#f4f0e7",
          overflow: "scroll",
        }}
      >
        <div style={{ backgroundColor: "#eff4f6", border: "2px solid yellow" }}>
          <div className="drawingToolsRow">
            <b>Elements: </b>
            <button title="Rectangle" onClick={() => createRect(canvas)}>
              {" "}
              <VscPrimitiveSquare />
            </button>
            <button
              title="Randome Size Strip"
              onClick={() => createRandomeStrip(canvas)}
            >
              RS
            </button>
            <button
              title="Multi Line Editable Text"
              onClick={() => createTextBox(canvas)}
            >
              T
            </button>
            {/* <button title="Single Line Editable Text" onClick={() => createIText(canvas)}>IT</button>
                        <button title="Single Line Non Editable Text" onClick={() => createText(canvas)}>T</button> */}
            <button title="Circle" onClick={() => createCircle(canvas)}>
              {" "}
              <VscCircleFilled />
            </button>
            {/* <button title="Ellipse" onClick={() => createEllipse(canvas)}>
              Ellipse
            </button> */}
            <button title="Triangle" onClick={() => createTriangle(canvas)}>
              <VscTriangleUp />
            </button>
            <button title="Pentagon" onClick={() => createPentagon(canvas)}>
              Penta
            </button>
            <button title="Line" onClick={() => createHLine(canvas)}>
              HLine
            </button>
            <button title="Line" onClick={() => createVLine(canvas)}>
              VLine
            </button>
            <button title="Shapes" onClick={() => window.changeTab(8)}>
              Shapes
            </button>
          </div>
          <div className="drawingToolsRow">
            <b> Free Drawing: </b>
            Type:{" "}
            <select
              onChange={(e) => onDrawingModeChange(e.target.value, canvas)}
              value={currentMode}
            >
              {modes.map((val) => {
                return (
                  <option key={uuidv4()} value={val}>
                    {val}
                  </option>
                );
              })}
            </select>
            End:{" "}
            <select
              onChange={(e) => onstrokeLineCapChange(e)}
              value={currentstrokeLineCap}
            >
              {strokeLineCaps.map((val) => {
                return (
                  <option key={uuidv4()} value={val}>
                    {val}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div
          style={{
            backgroundColor: "rgb(235, 232, 200)",
            border: "2px solid blue",
          }}
        >
          <div className="drawingToolsRow">
            <b>Tools: </b>
            <button onClick={() => resetZommandPan(canvas)}>
              Reset Zoom, Pan
            </button>
            <button onClick={() => putatCenter(canvas)}>All at Center</button>
            <button onClick={() => selectedatCenter(canvas)}>Center</button>
            <button onClick={() => selectedatCenterH(canvas)}>H Center</button>
            <button onClick={() => selectedatCenterV(canvas)}>V Center</button>
          </div>
          <div className="drawingToolsRow">
            <button title="Align Left" onClick={() => alignAllLeft(canvas)}>
              <FaAlignLeft />
            </button>
            <button title="Align Right" onClick={() => alignAllRight(canvas)}>
              <FaAlignRight />
            </button>
            <button title="Align Top" onClick={() => alignAllTop(canvas)}>
              <AiOutlineVerticalAlignTop /> <AiOutlineVerticalAlignTop />{" "}
            </button>
            <button title="Align Bottom" onClick={() => alignAllButtom(canvas)}>
              <AiOutlineVerticalAlignBottom />
              <AiOutlineVerticalAlignBottom />
            </button>
            <button
              title=" Make Vertical Equidistant"
              onClick={() => makeVerticalEquidistant(canvas)}
            >
              =
            </button>
            <button
              title=" Make Horizontal Equidistant"
              onClick={() => makeHorizontalEquidistant(canvas)}
            >
              ||
            </button>
            <button
              title="Bold"
              style={{ fontWeight: fontWeight1 === "bold" ? "bold" : "normal" }}
              onClick={() => {
                txtBold(canvas);
                setfontWeight1(fontWeight1 === "bold" ? "normal" : "bold");
              }}
            >
              B
            </button>
            <button
              title="Ittalic"
              style={{
                fontStyle: itallicnormal === "italic" ? "italic" : "normal",
              }}
              onClick={() => {
                textItalic(canvas);
                setitallicnormal(
                  itallicnormal === "italic" ? "normal" : "italic"
                );
              }}
            >
              I{" "}
            </button>
            <button
              title="Underline"
              style={{
                textDecoration: underline1 === "underline" ? "underline" : "",
              }}
              onClick={() => {
                textUnderline(canvas);
                setunderline1(underline1 === "underline" ? "" : "underline");
              }}
            >
              U
            </button>
            <button
              title="Linethrough"
              style={{
                textDecoration:
                  linethrough1 === "line-through" ? "line-through" : "",
              }}
              onClick={() => {
                textLineThrough(canvas);
                setlinethrough1(
                  linethrough1 === "line-through" ? "" : "line-through"
                );
              }}
            >
              S
            </button>
            <button
              title="Delete Selected"
              onClick={() => deleteSelectedItem()}
            >
              <VscTrash /> Selected
            </button>
            <button title="Delete All" onClick={() => deleteAll(canvas)}>
              <VscTrash />
              All
            </button>
            <button title="Lock selected" onClick={() => lock(canvas)}>
              <VscLock />
            </button>
            <button title="Unlock All" onClick={() => unlockAll(canvas)}>
              <VscUnlock />
              All
            </button>
            <button onClick={() => undo(canvas)}>Undo</button>
            <button onClick={() => copy(canvas)}>Copy</button>
            <button onClick={() => paste(canvas)}>Paste</button>
            <button onClick={() => cloneAsImage(canvas)}>CloneAsImage</button>
            <button onClick={() => selectAll(canvas)}>Select All</button>
            <button onClick={() => deSelectAll(canvas)}>Deselect All</button>
            <button
              onClick={() => sendToBack(canvas, kf, xpositions, dispatch)}
            >
              Send To BK
            </button>
            <button
              onClick={() => sendBackward(canvas, kf, xpositions, dispatch)}
            >
              Send -1
            </button>
            <button
              onClick={() => bringToFront(canvas, kf, xpositions, dispatch)}
            >
              Bring to F
            </button>
            <button
              onClick={() => bringForward(canvas, kf, xpositions, dispatch)}
            >
              Bring +1
            </button>
            <button onClick={() => resizeTextWidth(canvas)}>Text Fit</button>
            <button onClick={() => sameWidth(canvas)}>Same Width Text</button>
            <div>
              <b> Images: or Rects</b>
              <button onClick={() => sameWidthIMG(canvas)}>Same Width</button>
              <button onClick={() => sameHeightIMG(canvas)}>Same Height</button>
              <button onClick={() => sameSizeIMG(canvas)}>Same size</button>
            </div>
            <button onClick={makeFullScreen}>Make full Screen</button>
            <button onClick={sdToHD}>sdtoHD</button>
            <b> Image Round:</b>
            <input
              type={"number"}
              min={0}
              max={1920}
              step={1}
              style={{ width: 60 }}
              defaultValue={0}
              onChange={(e) => roundedCorners(e.target.value)}
            />
            <span> Show ID:</span>{" "}
            <input
              type="checkbox"
              checked={showId}
              onChange={(e) => dispatch({ type: "SHOW_ID", payload: !showId })}
            />
          </div>
          <div className="drawingToolsRow">
            <b> Export: </b>
            <button onClick={() => exportHTML(canvas)}>HTML & Page</button>
            Js:
            <input
              type="text"
              size={2}
              value={jsfilename}
              onChange={(e) =>
                dispatch({ type: "CHANGE_JSFILENAME", payload: e.target.value })
              }
            />
            css:
            <input
              size={2}
              type="text"
              value={cssfilename}
              onChange={(e) =>
                dispatch({
                  type: "CHANGE_CSSFILENAME",
                  payload: e.target.value,
                })
              }
            />
            Js2:
            <input
              type="text"
              size={2}
              value={jsfilename2}
              onChange={(e) =>
                dispatch({
                  type: "CHANGE_JSFILENAME2",
                  payload: e.target.value,
                })
              }
            />
            css2:
            <input
              size={2}
              type="text"
              value={cssfilename2}
              onChange={(e) =>
                dispatch({
                  type: "CHANGE_CSSFILENAME2",
                  payload: e.target.value,
                })
              }
            />
            {htmlfileHandle && htmlfileHandle.name}{" "}
            {htmlfileHandle && (
              <button onClick={() => OverrightHtml(canvas)}>Overwrite</button>
            )}
            <button onClick={() => exportPng(canvas)}>PNG(Shape)</button>
            <button onClick={() => exportAllPng(canvas)}>All PNG(Shape)</button>
            <button onClick={() => exportPngFullPage(canvas)}>
              PNG(FullPage)
            </button>
            <button onClick={() => exportAllPngFullPage(canvas)}>
              All PNG(FullPage)
            </button>
            <button onClick={() => exportSVG(canvas)}>SVG</button>
            <button onClick={() => exportJSON(canvas)}>JSON</button>
            <button onClick={() => exportPDF(canvas)}>Pdf</button>
            <button onClick={() => saveToLocalStorage(canvas)}>
              saveToLocalStorage
            </button>
            <button onClick={() => getFromLocalStorage(canvas)}>
              Get from LocalStorage
            </button>
            <button onClick={() => exportJSONforTheatrejs(canvas)}>
              Web Animator
            </button>
            <button onClick={openGdd}>Gdd Template Player</button>
          </div>
          <div className="drawingToolsRow">
            Client Id
            <input
              title="Put Unique Id so that other may not iterfere"
              style={{ width: 100 }}
              type={"text"}
              value={clientId}
              onChange={(e) => {
                dispatch({ type: "CHANGE_CLIENTID", payload: e.target.value });
              }}
            />
            <button title={clientAddress()} onClick={openClientAddress}>
              Open Client Address
            </button>
          </div>
          <div className="drawingToolsRow">
            <b> Import: </b>
            <label
              style={{
                border: "1px solid #000000",
                borderRadius: "3px",
                backgroundColor: "ButtonFace",
              }}
              htmlFor="importsvg"
            >
              Svg{" "}
              <input
                id="importsvg"
                style={{ display: "none" }}
                type="file"
                className="input-file"
                accept=".xml,.svg"
                onChange={(e) => importSVG(e.target.files[0])}
              />
            </label>
            <label
              style={{
                border: "1px solid #000000",
                borderRadius: "3px",
                backgroundColor: "ButtonFace",
              }}
              htmlFor="importjson"
            >
              {" "}
              Json{" "}
              <input
                id="importjson"
                style={{ display: "none" }}
                type="file"
                className="input-file"
                accept=".json"
                onChange={(e) => importJSON(e.target.files[0])}
              />
            </label>
          </div>
        </div>

        <div style={{ backgroundColor: "#eff4f6", border: "2px solid green" }}>
          <div className="drawingToolsRow">
            <b>globalCompositeOperation: </b>{" "}
            <select
              onChange={(e) => onglobalCompositeOperationChange(e)}
              value={currentglobalCompositeOperation}
            >
              {listglobalCompositeOperation.map((val) => {
                return (
                  <option key={uuidv4()} value={val}>
                    {val}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="drawingToolsRow">
            <table border="1">
              <tbody>
                <tr>
                  <td>
                    {" "}
                    <b>Opacity: </b>
                    <input
                      className="inputRange"
                      onChange={(e) => setOpacity1(canvas, e)}
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={opacity}
                    />{" "}
                    {opacity}
                  </td>
                  <td>
                    {" "}
                    <b>Chr Spacing: </b>
                    <input
                      className="inputRange"
                      onChange={(e) => setCHRSpacing(canvas, e)}
                      type="range"
                      min="-10000"
                      max="10000"
                      step="10"
                      value={charSpacing}
                    />
                    <button
                      onClick={() => {
                        setCharSpacing(0);
                        canvas
                          .getActiveObjects()
                          .forEach((item) => (item.charSpacing = 0));
                        canvas.requestRenderAll();
                      }}
                    >
                      R
                    </button>
                    {charSpacing}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="drawingToolsRow">
            <b> Font: </b>{" "}
            <select onChange={(e) => onFontChange(e)} value={currentFont}>
              {fontList.map((val) => {
                return (
                  <option key={uuidv4()} value={val}>
                    {val}
                  </option>
                );
              })}
            </select>
            Size
            <input
              value={fontSize}
              className="inputRangeFontSize"
              onChange={(e) => onSizeChange(e, canvas)}
              type="range"
              min="0"
              max="100"
              step="1"
            />
            {parseInt(fontSize)?.toFixed(0)}
          </div>

          <div className="drawingToolsRow">
            <b> Colors: </b>
            Fill{" "}
            {canvas?.getActiveObjects()[0]?.fill?.colorStops ? (
              <span
                onClick={() => {
                  window.changeTab(4);
                  window.fabricGradienttoBackgroundImage(
                    canvas?.getActiveObjects()[0]?.fill
                  );
                }}
                style={{
                  display: "inline-block",
                  marginTop: 6,
                  marginLeft: 7,
                  marginRight: 6,
                  border: "1px solid black",
                  width: 35,
                  height: 12,
                  backgroundImage: `linear-gradient(${canvas?.getActiveObjects()[0]?.fill?.coords.y2 * 180
                    }deg,${canvas
                      ?.getActiveObjects()[0]
                      ?.fill?.colorStops.map((colorStop, i) => {
                        return `${rgbaCol(colorStop.color, colorStop.opacity)} ${colorStop.offset * 100
                          }%`;
                      })}`,
                }}
              />
            ) : (
              <input
                type="color"
                value={currentFillColor}
                onChange={(e) => {
                  changeCurrentColor(e, canvas);
                  // setCurrentFillColor(e.target.value);
                }}
              />
            )}
            BG
            <input
              type="color"
              value={canvas?.getActiveObjects()[0]?.backgroundColor}
              onChange={(e) => changeBackGroundColor(e, canvas)}
            />
            Strk{" "}
            {canvas?.getActiveObjects()[0]?.stroke?.colorStops ? (
              <span
                onClick={() => {
                  window.changeTab(4);
                  window.fabricGradienttoBackgroundImage(
                    canvas?.getActiveObjects()[0]?.stroke
                  );
                }}
                style={{
                  display: "inline-block",
                  marginTop: 6,
                  marginLeft: 7,
                  marginRight: 6,
                  border: "1px solid black",
                  width: 35,
                  height: 12,
                  backgroundImage: `linear-gradient(${canvas?.getActiveObjects()[0]?.stroke?.coords.y2 * 180
                    }deg,${canvas
                      ?.getActiveObjects()[0]
                      ?.stroke?.colorStops.map((colorStop, i) => {
                        return `${rgbaCol(colorStop.color, colorStop.opacity)} ${colorStop.offset * 100
                          }%`;
                      })}`,
                }}
              />
            ) : (
              <input
                type="color"
                value={canvas?.getActiveObjects()[0]?.stroke}
                onChange={(e) => changeStrokeCurrentColor(e, canvas)}
              />
            )}
            <button
              title="Swap Face/Stroke Color"
              onClick={() => swapFaceandStrokeColors(canvas)}
            >
              Swap Face/Strk Color
            </button>
            Strk/Brs W:
            <input
              style={{ width: "40px" }}
              onChange={(e) => {
                onstrokeSizeChange(e);
              }}
              type="number"
              min="0"
              max="50"
              step="1"
              value={strokeWidth}
            />
            <span>
              ScaleX:
              <input
                style={{ width: "40px" }}
                onChange={(e) => {
                  setscaleX(e.target.value);
                  canvas
                    .getActiveObjects()
                    .forEach((item) => item.set({ scaleX: e.target.value }));
                  canvas.requestRenderAll();
                }}
                type="number"
                min="-100.00"
                max="100.00"
                step="0.01"
                value={scaleX}
              />
              ScaleY:
              <input
                style={{ width: "40px" }}
                onChange={(e) => {
                  setscaleY(e.target.value);
                  canvas
                    .getActiveObjects()
                    .forEach((item) => item.set({ scaleY: e.target.value }));
                  canvas.requestRenderAll();
                }}
                type="number"
                min="-100.00"
                max="100.00"
                step="0.01"
                value={scaleY}
              />
              X:{" "}
              <input
                style={{ width: "50px" }}
                onChange={(e) => {
                  setX(parseInt(e.target.value));
                  canvas
                    .getActiveObjects()
                    .forEach((item) =>
                      item.set({ left: parseInt(e.target.value) })
                    );
                  canvas.requestRenderAll();
                }}
                type="number"
                min={-100}
                max={1100}
                step={1}
                value={x}
              />
              Y:{" "}
              <input
                style={{ width: "50px" }}
                onChange={(e) => {
                  setY(parseInt(e.target.value));
                  canvas
                    .getActiveObjects()
                    .forEach((item) =>
                      item.set({ top: parseInt(e.target.value) })
                    );
                  canvas.requestRenderAll();
                }}
                type="number"
                min={-100}
                max={1100}
                step={1}
                value={y}
              />
              Angle:{" "}
              <input
                style={{ width: "40px" }}
                onChange={(e) => {
                  setangle(e.target.value);
                  canvas
                    .getActiveObjects()
                    .forEach((item) => item.rotate(e.target.value));
                  canvas.requestRenderAll();
                }}
                type="number"
                min="0"
                max="360"
                step="1"
                value={angle}
              />{" "}
            </span>
            strk-dsar:{" "}
            <input
              style={{ width: 40 }}
              onChange={(e) => onstrokedasharraychange(e)}
              type="number"
              min="0"
              max="1000"
              step="1"
              value={strokedasharray[0]}
            />
            ofst:{" "}
            <input
              style={{ width: 40 }}
              onChange={(e) => onstrokedashoffsetchange(e)}
              type="number"
              min="-1000"
              max="1000"
              step="1"
              value={strokedashoffset}
            />
            W:
            <input
              style={{ width: 55 }}
              onChange={(e) => {
                canvas?.getActiveObjects().forEach((element) => {
                  element.width = parseInt(e.target.value);
                  setWidth(parseInt(e.target.value));
                  canvas.requestRenderAll();
                });
              }}
              type="number"
              min="0"
              max={2000}
              step="1"
              value={width}
            />
            H:
            <input
              style={{ width: 55 }}
              onChange={(e) => {
                canvas?.getActiveObjects().forEach((element) => {
                  element.height = parseInt(e.target.value);
                  setHeight(parseInt(e.target.value));
                  canvas.requestRenderAll();
                });
              }}
              type="number"
              min="0"
              max={2000}
              step="1"
              value={height}
            />
          </div>
          <div style={{ display: "flex" }}>
            <div>
              <table border="1" width="220">
                <tbody>
                  <tr>
                    <td colSpan="2">
                      <b> Shadow: </b>color{" "}
                      <input
                        ref={refShadowColor}
                        type="color"
                        defaultValue="#000000"
                        onChange={(e) => changeShadowCurrentColor(e, canvas)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      affectStroke
                      <input
                        ref={refAffectStroke}
                        type="checkbox"
                        onChange={(e) => affectStroke(e)}
                        defaultChecked={false}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Blur</td>
                    <td>
                      {" "}
                      <input
                        ref={refBlur}
                        className="inputRangeshadow"
                        onChange={(e) => onBlurSizeChange(e.target.value)}
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        defaultValue="30"
                      />
                      <button onClick={() => onBlurSizeChange(0)}>R</button>
                    </td>
                  </tr>
                  <tr>
                    <td>offsetX</td>
                    <td>
                      {" "}
                      <input
                        ref={refOffsetX}
                        className="inputRangeshadow"
                        onChange={(e) => onoffsetXChange(e.target.value)}
                        type="range"
                        min="-400"
                        max="400"
                        step="1"
                        defaultValue="0"
                      />
                      <button onClick={() => onoffsetXChange(0)}>R</button>
                    </td>
                  </tr>
                  <tr>
                    <td> offsetY</td>
                    <td>
                      <input
                        ref={refOffsetY}
                        className="inputRangeshadow"
                        onChange={(e) => onoffsetYChange(e.target.value)}
                        type="range"
                        min="-200"
                        max="200"
                        step="1"
                        defaultValue="0"
                      />
                      <button onClick={() => onoffsetYChange(0)}>R</button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <button onClick={() => setasClipPath(canvas)}>
                        SetAsCipPath
                      </button>
                    </td>
                    <td>
                      <button onClick={() => cliptoPath(canvas)}>
                        Clip to Path
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <table
                border="1"
                width="255"
                style={{ minWidth: 255, maxWidth: 255 }}
              >
                <tbody>
                  <tr>
                    <td>SkewX:</td>
                    <td>
                      {" "}
                      <input
                        className="inputRange"
                        onChange={(e) => onSkewXSizeChange(e)}
                        type="range"
                        min="-88"
                        max="88"
                        step="1"
                        value={skewXSize}
                      />
                      <button
                        onClick={() => {
                          setSkewXSize(0);
                          canvas
                            .getActiveObjects()
                            .forEach((item) => (item.skewX = 0));
                          canvas.requestRenderAll();
                        }}
                      >
                        R
                      </button>
                      {skewXSize}
                    </td>
                  </tr>
                  <tr>
                    <td>SkewY:</td>
                    <td>
                      {" "}
                      <input
                        className="inputRange"
                        onChange={(e) => onSkewYSizeChange(e)}
                        type="range"
                        min="-60"
                        max="60"
                        step="1"
                        value={skewYSize}
                      />
                      <button
                        onClick={() => {
                          setSkewYSize(0);
                          canvas
                            .getActiveObjects()
                            .forEach((item) => (item.skewY = 0));
                          canvas.requestRenderAll();
                        }}
                      >
                        R
                      </button>
                      {skewYSize}
                    </td>
                  </tr>
                  <tr>
                    <td>RX:</td>
                    <td>
                      {" "}
                      <input
                        className="inputRange"
                        onChange={(e) => onRxSizeChange(e)}
                        type="range"
                        id="RX"
                        min="-360"
                        max="360"
                        step="1"
                        value={skewRX}
                      />
                      <button
                        onClick={() => {
                          setSkewRX(0);
                          canvas
                            .getActiveObjects()
                            .forEach((item) => (item.rx = 0));
                          canvas.requestRenderAll();
                        }}
                      >
                        R
                      </button>
                      {skewRX}
                    </td>
                  </tr>
                  <tr>
                    <td> RY:</td>
                    <td>
                      <input
                        className="inputRange"
                        onChange={(e) => onRySizeChange(e)}
                        type="range"
                        id="RY"
                        min="-360"
                        max="360"
                        step="1"
                        value={skewRY}
                      />
                      <button
                        onClick={() => {
                          setSkewRY(0);
                          canvas
                            .getActiveObjects()
                            .forEach((item) => (item.ry = 0));
                          canvas.requestRenderAll();
                        }}
                      >
                        R
                      </button>
                      {skewRY}
                    </td>
                  </tr>

                  <tr>
                    <td> cropX:</td>
                    <td>
                      <input
                        className="inputRange"
                        onChange={(e) => onCropX(e)}
                        type="range"
                        id="cropX"
                        min="0"
                        max="2360"
                        step="1"
                        value={cropX}
                      />
                      <button
                        onClick={() => {
                          setCropX(0);
                          canvas
                            .getActiveObjects()
                            .forEach((item) => (item.cropX = 0));
                          canvas.requestRenderAll();
                        }}
                      >
                        R
                      </button>
                      {cropX}
                    </td>
                  </tr>

                  <tr>
                    <td> cropY:</td>
                    <td>
                      <input
                        className="inputRange"
                        onChange={(e) => onCropY(e)}
                        type="range"
                        id="cropY"
                        min="0"
                        max="2360"
                        step="1"
                        value={cropY}
                      />
                      <button
                        onClick={() => {
                          setCropY(0);
                          canvas
                            .getActiveObjects()
                            .forEach((item) => (item.cropY = 0));
                          canvas.requestRenderAll();
                        }}
                      >
                        R
                      </button>
                      {cropY}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div
          style={{
            backgroundColor: "rgb(235, 232, 200)",
            border: "2px solid red",
          }}
        >
          <div className="drawingToolsRow">
            <b> Solid Cap 2: </b>
            <button
              onClick={() => {
                startGraphics(
                  canvas,
                  templateLayers.solidCaption2,
                  currentscreenSize
                );
                setSolidcaption2(canvasList[currentPage]?.pageName);
                localStorage.setItem(
                  "RCC_solidCaption2",
                  canvasList[currentPage]?.pageName
                );
              }}
            >
              <FaPlay />{" "}
            </button>{" "}
            <button
              onClick={() =>
                updateGraphics(canvas, templateLayers.solidCaption2)
              }
            >
              Update
            </button>
            <button
              onClick={() => {
                stopGraphics(templateLayers.solidCaption2);
                setSolidcaption2("");
                localStorage.setItem("RCC_solidCaption2", "");
              }}
            >
              <FaStop />
            </button>
            <span> {solidcaption2} </span>
          </div>
          <div className="drawingToolsRow">
            <b> Solid Cap 3: </b>
            <button
              onClick={() => {
                startGraphics(
                  canvas,
                  templateLayers.solidCaption3,
                  currentscreenSize
                );
                setSolidcaption3(canvasList[currentPage]?.pageName);
                localStorage.setItem(
                  "RCC_solidCaption3",
                  canvasList[currentPage]?.pageName
                );
              }}
            >
              <FaPlay />{" "}
            </button>{" "}
            <button
              onClick={() =>
                updateGraphics(canvas, templateLayers.solidCaption3)
              }
            >
              Update
            </button>
            <button
              onClick={() => {
                stopGraphics(templateLayers.solidCaption3);
                setSolidcaption3("");
                localStorage.setItem("RCC_solidCaption3", "");
              }}
            >
              <FaStop />
            </button>
            <span> {solidcaption3} </span>
          </div>
          <div
            className="drawingToolsRow"
            style={{ border: "1px solid black" }}
          >
            <GsapPlayer layer1={templateLayers.gsap} inline={false} />
          </div>
          <div className="drawingToolsRow">
            <b> Logo: </b>

            <button
              onClick={() => {
                startGraphics(canvas, templateLayers.logo, currentscreenSize);
                setLogo(canvasList[currentPage]?.pageName);
                localStorage.setItem(
                  "RCC_logo",
                  canvasList[currentPage]?.pageName
                );
              }}
            >
              <FaPlay />{" "}
            </button>
            <button onClick={() => updateGraphics(canvas, templateLayers.logo)}>
              Update
            </button>
            <button
              onClick={() => {
                stopGraphics(templateLayers.logo);
                setLogo("");
                localStorage.setItem("RCC_logo", "");
              }}
            >
              <FaStop />
            </button>
            <span> {logo} </span>
          </div>
          <div className="drawingToolsRow">
            <b> Location Band: </b>
            <button
              onClick={() => {
                startGraphics(
                  canvas,
                  templateLayers.locationBand,
                  currentscreenSize
                );
                setLocationBand(canvasList[currentPage]?.pageName);
                localStorage.setItem(
                  "RCC_locationBand",
                  canvasList[currentPage]?.pageName
                );
              }}
            >
              <FaPlay />{" "}
            </button>
            <button
              onClick={() =>
                updateGraphics(canvas, templateLayers.locationBand)
              }
            >
              Update
            </button>
            <button
              onClick={() => {
                stopGraphics(templateLayers.locationBand);
                setLocationBand("");
                localStorage.setItem("RCC_locationBand", "");
              }}
            >
              <FaStop />
            </button>
            <span> {locationBand} </span>
          </div>
          <VerticalScrollPlayer showTemplate={true} />

          <div className="drawingToolsRow">
            <b> H Scroll: </b>
            <button
              onClick={() => {
                startHorizontalScroll(templateLayers.horizontalScroll);
                setHorizontalScroll(canvasList[currentPage]?.pageName);
                localStorage.setItem(
                  "RCC_horizontalScroll",
                  canvasList[currentPage]?.pageName
                );
              }}
            >
              <FaPlay />
            </button>
            <button
              onClick={() => {
                endpoint(
                  `call ${window.chNumber}-${templateLayers.horizontalScroll} "horizontalSpeed=0"`
                );
                executeScript("horizontalSpeed=0");
              }}
            >
              {" "}
              <FaPause />
            </button>
            <button
              onClick={() => {
                endpoint(
                  `call ${window.chNumber}-${templateLayers.horizontalScroll} "horizontalSpeed=${horizontalSpeed}"`
                );
                executeScript(`horizontalSpeed=${horizontalSpeed}`);
              }}
            >
              {" "}
              <GrResume />
            </button>
            <button
              onClick={() => {
                endpoint(
                  `stop ${window.chNumber}-${templateLayers.horizontalScroll}`
                );
                setHorizontalScroll("");
                localStorage.setItem("RCC_horizontalScroll", "");
                executeScript(
                  `if(window.intervalHorizontalScroll1){clearInterval(intervalHorizontalScroll1)}`
                );
                executeScript(
                  `document.getElementById('divid_${templateLayers.horizontalScroll}')?.remove();
                  document.getElementById('divid_${templateLayers.scroll1_strip}')?.remove();
                  `
                );
              }}
            >
              <FaStop />
            </button>
            S:
            <input
              style={{ width: "40px" }}
              onChange={(e) => onHorizontalSpeedChange(e)}
              type="number"
              min="0"
              max="5"
              step="0.01"
              value={horizontalSpeed}
            />
            <button onClick={() => exportHorizontalScrollAsHTML(canvas)}>
              To HTML
            </button>
            <span> LTR:</span>{" "}
            <input
              type="checkbox"
              checked={ltr}
              onChange={() => setLtr((val) => !val)}
            />
            <span> {horizontalScroll} </span>
          </div>
          <div className="drawingToolsRow">
            <b> H Scroll2: </b>
            <button
              onClick={() => {
                startHorizontalScroll2(templateLayers.horizontalScroll2);
                setHorizontalScroll2(canvasList[currentPage]?.pageName);
                localStorage.setItem(
                  "RCC_horizontalScroll2",
                  canvasList[currentPage]?.pageName
                );
              }}
            >
              <FaPlay />
            </button>
            <button
              onClick={() => {
                endpoint(
                  `call ${window.chNumber}-${templateLayers.horizontalScroll2} "horizontalSpeed2=0"`
                );
                executeScript("horizontalSpeed2=0");
              }}
            >
              {" "}
              <FaPause />
            </button>
            <button
              onClick={() => {
                endpoint(
                  `call ${window.chNumber}-${templateLayers.horizontalScroll2} "horizontalSpeed2=${horizontalSpeed2}"`
                );
                executeScript(`horizontalSpeed2=${horizontalSpeed2}`);
              }}
            >
              {" "}
              <GrResume />
            </button>
            <button
              onClick={() => {
                endpoint(
                  `stop ${window.chNumber}-${templateLayers.horizontalScroll2}`
                );
                setHorizontalScroll2("");
                localStorage.setItem("RCC_horizontalScroll2", "");
                executeScript(
                  `if(window.intervalHorizontalScroll2){clearInterval(intervalHorizontalScroll2)}`
                );
                executeScript(
                  `document.getElementById('divid_${templateLayers.horizontalScroll2}').remove();
                  document.getElementById('divid_${templateLayers.scroll2_strip}')?.remove();
                  `
                );
              }}
            >
              <FaStop />
            </button>
            S:
            <input
              style={{ width: "40px" }}
              onChange={(e) => onHorizontalSpeedChange2(e)}
              type="number"
              min="0"
              max="5"
              step="0.01"
              value={horizontalSpeed2}
            />
            <button onClick={() => exportHorizontalScrollAsHTML2(canvas)}>
              To HTML
            </button>
            <span> LTR:</span>{" "}
            <input
              type="checkbox"
              checked={ltr2}
              onChange={() => setLtr2((val) => !val)}
            />
            <span> {horizontalScroll2} </span>
          </div>

          <div className="drawingToolsRow">
            <b>Clock: </b>
            <button onClick={() => addClock(canvas)}>Add to Preview</button>
            <button
              onClick={() => {
                startClock(templateLayers.clock);
                setClock(canvasList[currentPage]?.pageName);
                localStorage.setItem(
                  "RCC_clock",
                  canvasList[currentPage]?.pageName
                );
              }}
            >
              <FaPlay />
            </button>
            <button
              onClick={() => {
                endpoint(`stop ${window.chNumber}-${templateLayers.clock}`);
                setClock("");
                localStorage.setItem("RCC_clock", "");
                executeScript(`if(window.xxxClock){clearInterval(xxxClock)}`);
                executeScript(
                  `document.getElementById('divid_${templateLayers.clock}')?.remove()`
                );
              }}
            >
              <FaStop />
            </button>
            <button onClick={() => exportClockAsHTML(canvas)}>To HTML</button>
            <span> {clock} </span>
          </div>
          <div className="drawingToolsRow">
            <b>Count Up Tmr: </b>
            <button onClick={() => addUpTimer(canvas)}>Add to Preview</button>
            <button
              title="Play in Puased mode"
              onClick={() => {
                startUpTimer(templateLayers.countUpTimer);
                setUpTimer(canvasList[currentPage]?.pageName);
                localStorage.setItem(
                  "RCC_upTimer",
                  canvasList[currentPage]?.pageName
                );
              }}
            >
              <FaPlay />
            </button>
            <button
              title="Resume"
              onClick={() => {
                resumeUpTimer();
              }}
            >
              <GrResume />
            </button>
            <button title="Pause" onClick={() => pauseUpTimer()}>
              {" "}
              <FaPause />
            </button>
            <button
              onClick={() => {
                endpoint(
                  `stop ${window.chNumber}-${templateLayers.countUpTimer}`
                );
                setUpTimer("");
                executeScript(`clearInterval(xxxUpTimer);`);
                executeScript(
                  `document.getElementById('divid_${templateLayers.countUpTimer}').remove()`
                );

                localStorage.setItem("RCC_upTimer", "");
              }}
            >
              <FaStop />
            </button>
            <button onClick={() => exportUpTimerAsHTML(canvas)}>To HTML</button>
            <span> {upTimer} </span>
          </div>

          <div className="drawingToolsRow">
            <b>Game Tmr:</b>
            <button onClick={() => addGameTimer(canvas)}>Add to Preview</button>
            <span> M</span>
            <input
              type="text"
              style={{ width: 15 }}
              value={initialMinute}
              onChange={(e) => setInitilaMinute(e.target.value)}
            />
            <span> S</span>
            <input
              type="text"
              style={{ width: 15 }}
              value={initialSecond}
              onChange={(e) => setInitialSecond(e.target.value)}
            />
            <span> Up</span>
            <input
              type="checkbox"
              checked={countUp}
              onChange={(e) => setCountUp((val) => !val)}
            />
            <button
              title="Play in Puased mode"
              onClick={() => showClock(templateLayers.gameTimer)}
            >
              <FaPlay />
            </button>
            <button
              title="Resume"
              onClick={() => resumeClock(templateLayers.gameTimer)}
            >
              {" "}
              <GrResume />{" "}
            </button>
            <button
              title="Pause"
              onClick={() => pauseClock(templateLayers.gameTimer)}
            >
              {" "}
              <FaPause />
            </button>
            <button onClick={() => stopClock(templateLayers.gameTimer)}>
              <FaStop />
            </button>
          </div>
          <div className="drawingToolsRow">
            <b>Game Tmr2:</b>
            <button onClick={() => addGameTimer2(canvas)}>
              Add to Preview
            </button>
            <span> S</span>
            <input
              type="text"
              style={{ width: 15 }}
              value={initialSecond2}
              onChange={(e) => setInitialSecond2(e.target.value)}
            />
            <span> Up</span>
            <input
              type="checkbox"
              checked={countUp2}
              onChange={(e) => setCountUp2((val) => !val)}
            />
            <button
              title="Play in Puased mode"
              onClick={() => showClock2(templateLayers.gameTimer2)}
            >
              <FaPlay />
            </button>
            <button
              title="Resume"
              onClick={() => resumeClock2(templateLayers.gameTimer2)}
            >
              {" "}
              <GrResume />{" "}
            </button>
            <button
              title="Pause"
              onClick={() => pauseClock2(templateLayers.gameTimer2)}
            >
              {" "}
              <FaPause />
            </button>
            <button onClick={() => stopClock2(templateLayers.gameTimer2)}>
              <FaStop />
            </button>
          </div>
        </div>
      </div>
      <div style={{ width: 380, backgroundColor: "#ddf0db" }}>
        <Tabs
          selectedTabClassName="selectedTab"
          forceRenderTabPanel={true}
          onSelect={(index, prevIndex) => onTabChange(index, prevIndex)}
        >
          <TabList>
            <Tab>Save</Tab>
            <Tab>Layer</Tab>
            <Tab>CCG Tool</Tab>
            <Tab>Image/Fltr</Tab>
            <Tab>Style</Tab>
          </TabList>
          <TabPanel>
            <SavePannel />
          </TabPanel>
          <TabPanel>
            <Layers2 />
          </TabPanel>
          <TabPanel>
            <CasparcgTools />
          </TabPanel>
          <TabPanel>
            <Images />
          </TabPanel>
          <TabPanel>
            <SavedStyles />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default DrawingController;
