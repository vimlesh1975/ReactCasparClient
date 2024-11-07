import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import ContextMenu from "./ContextMenu";
import { useState, useEffect, useRef } from "react";
import * as fabric from 'fabric';

import {
  saveCanvasState,
  Uploaddropedfile,
  createTextBoxforDragedText,
} from "./common";

import { useSelector, useDispatch } from "react-redux";

const allelements = [
  "Line",
  "Circle",
  "Triangle",
  "Ellipse",
  "Rect",
  "Polygon",
  "Group",
  "Textbox",
  "Image",
  "Path",
];

export const mousedownandmousemoveevent = (canvas) => {
  canvas.on("mouse:down", function (opt) {
    var evt = opt.e;
    if (evt.ctrlKey === true) {
      this.isDragging = true;
      this.selection = false;
      this.lastPosX = evt.clientX;
      this.lastPosY = evt.clientY;
    }
  });
  canvas.on("mouse:move", function (opt) {
    if (this.isDragging) {
      var e = opt.e;
      var vpt = this.viewportTransform;
      vpt[4] += e.clientX - this.lastPosX;
      vpt[5] += e.clientY - this.lastPosY;
      this.requestRenderAll();
      this.lastPosX = e.clientX;
      this.lastPosY = e.clientY;
    }
  });
};


function handleDrop(e, canvas) {
  if (e.dataTransfer.getData("Text")) {
    createTextBoxforDragedText(
      canvas,
      e.dataTransfer.getData("Text"),
      e.offsetX,
      e.offsetY
    );
  }
  if (e.dataTransfer.items) {
    var ii = 0;
    [...e.dataTransfer.items].forEach((item, i) => {
      // console.log(item, i);
      if (item.kind === "file") {
        const file = item.getAsFile();
        Uploaddropedfile(file, canvas, e.offsetX + ii * 250, e.offsetY + ii * 250);
        ii++;
      }
    });
  } else {
    [...e.dataTransfer.files].forEach((file, i) => {
      console.log(i, file);
    });
  }
}


const Drawing = ({ canvasOutput }) => {
  const { editor, onReady } = useFabricJSEditor();

  const dispatch = useDispatch();

  const [dlgText, setDlgText] = useState("");
  const [styleDlg, setStyleDlg] = useState({ display: "none" });

  const showId = useSelector((state) => state.showIdReducer.showId);
  const showIdRef = useRef(showId);
  window.editor = editor;
  function cancelZoomAndPan(canvas) {
    canvas.off("mouse:wheel");
    // canvas.off("mouse:down");
    // canvas.off("mouse:move");
    canvas.off("mouse:up");
  }
  function xyz(canvas) {
    canvas.on({
      "selection:updated": window.getvalues,
      "selection:created": window.getvalues,
      "object:modified": () => {
        window.getvalues();
        saveCanvasState(canvas);
      },
      // 'object:moving': window.getvalues,
      "object:scaling": window.getvalues,
      "object:rotating": window.getvalues,
      // 'object:skewing': window.getvalues,
      "object:resizing": window.getvalues,
    });
  }

  function setZoomAndPan(canvas) {
    canvas.on("mouse:wheel", function (opt) {
      var delta = opt.e.deltaY;
      var zoom = canvas.getZoom();
      zoom *= 0.999 ** delta;
      if (zoom > 20) zoom = 20;
      if (zoom < 0.01) zoom = 0.01;

      dispatch({ type: "CHANGE_CANVAS_ZOOM", payload: zoom });

      canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
      opt.e.preventDefault();
      opt.e.stopPropagation();
    });

    mousedownandmousemoveevent(canvas);

    canvas.on("mouse:up", function (opt) {
      // on mouse up we want to recalculate new interaction
      // for all objects, so we call setViewportTransform
      this.setViewportTransform(this.viewportTransform);
      this.isDragging = false;
      this.selection = true;
    });
  }
  const extendproperty = () => {
    allelements.forEach((val) => {
      if (fabric[val].prototype) {
        fabric[val].prototype._toSVG = (function (_toSVG) {
          return function () {
            var svg = _toSVG.call(this);
            if (val === "Textbox") {
              if (this.textAlign) {
                svg.splice(
                  1,
                  0,
                  `<extraproperty textAlign="${this.textAlign}" width="${this.width}" originalFontSize="${this.fontSize}" lines='${this.textLines.length}' height="${this.height}"></extraproperty>\n`
                );
              }
              if (this.class) {
                svg.splice(3, 0, 'class="' + this.class + '" ');
              }
            } else {
              if (this.class) {
                svg.splice(2, 0, 'class="' + this.class + '" ');
              }
            }
            return svg;
          };
        })(fabric[val].prototype._toSVG);
      }
    });
  };
  const removeExtendproperty = () => {
    allelements.forEach((val) => {
      if (fabric[val].prototype) {
        fabric[val].prototype._toSVG = (function (_toSVG) {
          return function () {
            var svg = _toSVG.call(this);
            if (val === "Textbox") {
              if (this.textAlign) {
                svg.splice(1, 1);
              }
              if (this.class) {
                svg.splice(2, 1);
              }
            } else {
              if (this.class) {
                svg.splice(2, 1);
              }
            }
            return svg;
          };
        })(fabric[val].prototype._toSVG);
      }
    });
  };

  useEffect(() => {
    showIdRef.current = showId;
  }, [showId]);

  useEffect(() => {
    const initCanvas = () => {
      const { canvas } = window.editor;
      canvas.extraProps = ["id", "selectable", "class"];
      extendproperty();
      setZoomAndPan(canvas);
      canvas.preserveObjectStacking = true;
      xyz(canvas);
      ddd(canvas);
    };

    const timeoutId = setTimeout(initCanvas, 3000);

    return () => {
      clearTimeout(timeoutId); // Clear timeout if component unmounts before timeout ends
      cancelZoomAndPan(window.editor.canvas);
      removeExtendproperty();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch({ type: "CHANGE_CANVAS", payload: editor?.canvas });
    // eslint-disable-next-line
  }, [editor?.canvas._objects.length, editor?.canvas.getActiveObjects()]);

  const ddd = (canvas) => {
    canvas.on("mouse:over", (e) => {
      if (e.target && showIdRef.current) {
        setStyleDlg({
          left: e.target.left * 0.533 - 100,
          top: e.target.top * 0.533,
        });
        setDlgText(e.target.id);
        setTimeout(() => {
          setStyleDlg({ display: "none" });
        }, 2000);
      }
    });
    canvas.on("mouse:out", (e) => {
      if (e.target) {
        setStyleDlg({ display: "none" });
      }
    });
    canvas.on("mouse:move", (e) => {
      if (e.target && showIdRef.current) {
        setStyleDlg({
          left: e.target.left * 0.533 - 100,
          top: e.target.top * 0.533,
        });
      }
    });
    // canvas.on("drop", (e) => handleDrop(e.e, canvas), false);
    // Add event listeners to the canvas element
    canvas.getElement().parentNode.addEventListener('dragover', (e) => {
      e.preventDefault(); // Prevent default behavior to allow drop
      // e.dataTransfer.dropEffect = 'copy'; // Show a copy cursor
      // console.log(e)
    });

    canvas.getElement().parentNode.addEventListener('drop', (e) => {
      e.preventDefault(); // Prevent default browser behavior
      handleDrop(e, canvas);
      // Process the drop event here
      // For example, handle files or other data
    });

  };

  return (
    <div>
      <FabricJSCanvas
        className={canvasOutput ? "canvasOutput" : "canvas"}
        onReady={(canvas) => {
          onReady(canvas);
          canvas.wrapperEl.setAttribute("tabindex", "1");
        }}
      />
      {/* <div style={{ zoom: zoom }}> <svg width={1920 * 0.533} height={1080 * 0.533}> <rect x='100' y='100' width="800" height="400" style={{ fill: 'transparent', stroke: "red", strokeWidth: 2 }} /></svg></div> */}
      <ContextMenu
        canvas={editor?.canvas}
      />
      {showId &&
        <span
          style={{
            backgroundColor: "black",
            fontSize: 18,
            fontWeight: "bold",
            padding: "0px 5px 6px 5px",
            position: "absolute",
            color: "white",
            ...styleDlg,
          }}
        >
          {dlgText}
        </span>
      }
    </div>
  );
};
export default Drawing;
