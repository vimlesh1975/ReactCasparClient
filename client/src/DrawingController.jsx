import React, { useEffect, useState } from 'react'

import axios from 'axios';
import { fabric } from "fabric";
import { endpoint, fontLists } from './common'
import { useSelector } from 'react-redux'
import "fabric-history";
import { VscPrimitiveSquare, VscCircleFilled, VscTriangleUp, VscLock, VscUnlock, VscTrash } from "react-icons/vsc";
import { FaAlignLeft, FaAlignRight, FaPlay, FaPause, FaStop } from "react-icons/fa";
import { GrResume } from 'react-icons/gr';
import { AiOutlineVerticalAlignTop, AiOutlineVerticalAlignBottom } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';
import { saveAs } from 'file-saver';
import Tooltip from '@mui/material/Tooltip';
import SavePannel from './SavePannel';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ImageFilterController from './ImageFilterController';
import CasparcgTools from './CasparcgTools';
import Images from './Images';
import SavedStyles from './SavedStyles';

import { options, shadowOptions, changeCurrentColor, changeBackGroundColor, changeStrokeCurrentColor, changeShadowCurrentColor } from './common'



fabric.Object.prototype.noScaleCache = false;
const screenSizes = [1024, 1280, 1920, 2048, 3840, 4096]
const STEP = 5;
var Direction = {
    LEFT: 0,
    UP: 1,
    RIGHT: 2,
    DOWN: 3
};

fabric.util.addListener(document.body, 'keydown', function (options) {
    // if (options.repeat) {
    //     return;
    // }
    var key = options.which || options.keyCode; // key detection
    if (key === 37) { // handle Left key
        moveSelected(Direction.LEFT);
    } else if (key === 38) { // handle Up key
        moveSelected(Direction.UP);
    } else if (key === 39) { // handle Right key
        moveSelected(Direction.RIGHT);
    } else if (key === 40) { // handle Down key
        moveSelected(Direction.DOWN);
    }
});




function moveSelected(direction) {
    var activeObject = window.editor.canvas.getActiveObject();
    if (activeObject) {
        switch (direction) {
            case Direction.LEFT:
                activeObject.set({ left: activeObject.left - STEP });
                break;
            case Direction.UP:
                activeObject.set({ top: activeObject.top - STEP });
                break;
            case Direction.RIGHT:
                activeObject.set({ left: activeObject.left + STEP });
                break;
            case Direction.DOWN:
                activeObject.set({ top: activeObject.top + STEP });
                break;
            default:
            //nothing
        }
        activeObject.setCoords();
        window.editor.canvas.renderAll();

    }
}





export var gradient = new fabric.Gradient({
    type: 'linear',
    // gradientUnits: 'pixels', // or 'percentage'
    gradientUnits: 'percentage', // or 'percentage'
    coords: { x1: 0, y1: 0, x2: 1, y2: 0 },
    colorStops: [
        { offset: 0, color: 'red' },
        { offset: 0.2, color: 'orange' },
        { offset: 0.4, color: 'yellow' },
        { offset: 0.6, color: 'green' },
        { offset: 0.8, color: 'blue' },
        { offset: 1, color: 'purple' }
    ]
});

var clipPath1 = null;
export const setasClipPath = canvas => {
    clipPath1 = canvas.getActiveObjects();
}
export const cliptoPath = canvas => {
    var img = canvas.getActiveObjects();
    if (clipPath1.length > 0 && img.length > 0) {
        clipPath1.forEach(element => {
            element.set({ shadow: { ...shadowOptions, blur: 0 } });
        });
        var group = new fabric.Group([...clipPath1]);
        group.set({ absolutePositioned: true });
        canvas.sendToBack(group);
        img[0].set('clipPath', group)
        clipPath1.forEach(element => {
            canvas.remove(element);
        });
        canvas.requestRenderAll();
    }
}

export const addClock = canvas => {
    const sss = new fabric.Textbox('', {
        shadow: shadowOptions,
        left: 10,
        top: 530,
        width: 100,
        fill: '#ffffff',
        backgroundColor: options.backgroundColor,
        fontFamily: options.currentFont,
        fontWeight: 'bold',
        fontSize: options.currentFontSize,
        editable: true,
        objectCaching: false,
        textAlign: 'center',
        stroke: '',
        strokeWidth: 0,
        id: 'clock1',

    });
    canvas.add(sss).setActiveObject(sss);
    canvas.requestRenderAll();
    setInterval(() => {
        animate(canvas, sss)
    }, 1000);
}

export const addUpTimer = canvas => {
    const sss = new fabric.Textbox('', {
        shadow: shadowOptions,
        left: 10,
        top: 530,
        width: 100,
        fill: '#ffffff',
        backgroundColor: options.backgroundColor,
        fontFamily: options.currentFont,
        fontWeight: 'bold',
        fontSize: options.currentFontSize,
        editable: true,
        objectCaching: false,
        textAlign: 'center',
        stroke: '',
        strokeWidth: 0,
        id: 'uptimer1',
    });
    canvas.add(sss).setActiveObject(sss);
    canvas.requestRenderAll();
    var startTime = new Date();
    setInterval(() => {
        var diff = (new Date()).getTime() - startTime.getTime();
        var date_diff = new Date(diff - 30 * 60 * 1000);
        var ss1 = date_diff.toLocaleString('en-US', { minute: '2-digit', second: '2-digit' }) + ':' + String(date_diff.getMilliseconds()).padStart(3, '0');
        sss.set({
            'text': ss1,
        })
        canvas.requestRenderAll();
    }, 40);
}

function animate(canvas, sss) {
    var ss1 = new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric", second: "numeric" });
    sss.set({
        'text': ss1,
    })
    canvas.requestRenderAll();
}
export const createText = (canvas) => {

    const text = new fabric.Text("दूरदर्शन से विमलेश कुमार Vimlesh Kumar From Doordarshan", {
        shadow: shadowOptions,
        id: 'f0',
        left: 100,
        top: 0,
        width: 480,
        fill: '#ffffff',
        // backgroundColor: options.backgroundColor,
        fontFamily: options.currentFont,
        fontWeight: 'bold',
        fontSize: options.currentFontSize,
        editable: true,
        objectCaching: false,
        textAlign: 'left',
        padding: 5,

    });
    canvas.add(text).setActiveObject(text);
    canvas.renderAll();
    text.animate('top', 243, { onChange: canvas.renderAll.bind(canvas) })
};
export const createIText = (canvas) => {

    const text = new fabric.IText("दूरदर्शन से विमलेश कुमार Vimlesh Kumar From Doordarshan", {
        shadow: shadowOptions,
        id: 'f0',
        left: 100,
        top: 0,
        width: 480,
        fill: '#ffffff',
        // backgroundColor: options.backgroundColor,
        fontFamily: options.currentFont,
        fontWeight: 'bold',
        fontSize: options.currentFontSize,
        editable: true,
        objectCaching: false,
        textAlign: 'left',
        padding: 5,

    });
    canvas.add(text).setActiveObject(text);
    canvas.renderAll();
    text.animate('top', 343, { onChange: canvas.renderAll.bind(canvas) })
};


export const createTextBox = (canvas) => {

    const text = new fabric.Textbox("दूरदर्शन से विमलेश कुमार Vimlesh Kumar From Doordarshan", {
        shadow: shadowOptions,
        id: 'f0',
        left: 100,
        top: 0,
        width: 480,
        fill: '#ffffff',
        // backgroundColor: options.backgroundColor,
        fontFamily: options.currentFont,
        fontWeight: 'bold',
        fontSize: options.currentFontSize,
        editable: true,
        objectCaching: false,
        textAlign: 'left',
        padding: 5,

    });
    canvas.add(text).setActiveObject(text);
    canvas.renderAll();
    text.animate('top', 443, { onChange: canvas.renderAll.bind(canvas) })
};

export const addRoundedCornerImage = (canvas, imageName1) => {

    fabric.util.loadImage(imageName1, myImg => {
        // fabric.Image.fromURL(imageName1,  myImg => {
        if (myImg == null) {
            alert("Error!");
        } else {
            var rect = new fabric.Rect({
                left: 10,
                top: 10,
                stroke: 'red',
                strokeWidth: 3,
                id: 'img1',
                rx: 30,
                objectCaching: false,
                shadow: shadowOptions,
                ry: 30
            });
            canvas.add(rect).setActiveObject(rect);

            rect.set({
                width: myImg.width, height: myImg.height, fill: new fabric.Pattern({ source: myImg, repeat: 'no-repeat' })
            });
            // rect.set({ scaleX: 0.5, scaleY: 0.5 })
            canvas.renderAll();
        }
    });
}



export const Upload = (e, canvas) => {
    if (e.target.files[0]) {
        var reader = new FileReader();
        reader.onload = function (event) {
            var imgObj = new Image();
            imgObj.src = event.target.result;
            imgObj.onload = function () {
                var image = new fabric.Image(imgObj);
                image
                    .set({
                        left: 10,
                        top: 10,
                        shadow: shadowOptions,
                        stroke: 'white',
                        strokeWidth: 3,
                        strokeUniform: true,
                        objectCaching: false,
                        id: 'img1'
                    })
                // .scale(0.5);
                canvas.add(image).setActiveObject(image);
            };
        };
        reader.readAsDataURL(e.target.files[0]);
    }
}

export const setGradientColor = canvas => {
    canvas.getActiveObjects().forEach(element => element.fill = gradient);
    canvas.requestRenderAll();
}

export const createRect = (canvas) => {
    const rect = new fabric.Rect({
        shadow: shadowOptions,
        top: -100,
        left: 90,
        width: 500,
        height: 80,
        opacity: 0.9,
        fill: 'rgb(80, 3, 124)',
        hasRotatingPoint: true,
        objectCaching: false,
        stroke: options.stroke,
        strokeWidth: 3,
        strokeUniform: true,
        rx: 10,
        ry: 10
    });
    canvas.add(rect).setActiveObject(rect);
    canvas.requestRenderAll();
    rect.animate('top', 430, { onChange: canvas.renderAll.bind(canvas) })
};
export const createEllipse = (canvas) => {
    const rect = new fabric.Ellipse({
        shadow: shadowOptions,
        top: -100,
        left: 180,
        rx: 50,
        ry: 80,
        opacity: 0.9,
        fill: 'blue',
        hasRotatingPoint: true,
        objectCaching: false,
        stroke: options.stroke,
        strokeWidth: 3,
        strokeUniform: true,
    });
    canvas.add(rect).setActiveObject(rect);
    canvas.requestRenderAll();
    rect.animate('top', 330, { onChange: canvas.renderAll.bind(canvas) })
};

export const createPentagon = (canvas) => {
    const rect = new fabric.Polygon([{x:207, y:120},{x:307, y:60},{x:407, y:120},{x:407, y:220},{x:307, y:280},{x:207, y:220}], {
        shadow: shadowOptions,
        top: -100,
        left: 180,
        rx: 50,
        ry: 80,
        opacity: 0.9,
        fill: 'blue',
        hasRotatingPoint: true,
        objectCaching: false,
        stroke: options.stroke,
        strokeWidth: 3,
        strokeUniform: true,
    });
    canvas.add(rect).setActiveObject(rect);
    canvas.requestRenderAll();
    rect.animate('top', 330, { onChange: canvas.renderAll.bind(canvas) })
};


export const createLine = (canvas) => {
    const rect = new fabric.Line([500, 450, 800, 450.00001], {
        shadow: { ...shadowOptions, Blur: 10 },
        top: -100,
        left: 90,
        height: 1,
        opacity: 0.9,
        fill: 'blue',
        hasRotatingPoint: true,
        objectCaching: false,
        stroke: 'yellow',
        strokeWidth: 3,
        strokeUniform: true,
    });
    canvas.add(rect).setActiveObject(rect);
    canvas.requestRenderAll();
    rect.animate('top', 230, { onChange: canvas.renderAll.bind(canvas) })
};

export const createCircle = (canvas) => {
    const circle = new fabric.Circle({
        shadow: shadowOptions,
        top: 0,
        left: 0,
        radius: 50,
        fill: 'rgb(80, 3, 124)',
        cornerSize: 7,
        objectCaching: false,
        hasRotatingPoint: true,
        stroke: options.stroke,
        strokeWidth: 3,
        strokeUniform: true,
    });

    canvas.add(circle).setActiveObject(circle);;
    canvas.requestRenderAll();
    circle.animate('left', 150, { onChange: canvas.renderAll.bind(canvas) })
};

export const createTriangle = (canvas) => {
    canvas.isDrawingMode = false;
    const triangle = new fabric.Triangle({
        shadow: shadowOptions,
        top: 50,
        left: -100,
        width: 100,
        height: 100,
        fill: 'rgb(80, 3, 124)',
        cornerSize: 7,
        objectCaching: false,
        hasRotatingPoint: true,
        stroke: options.stroke,
        strokeWidth: 3,
        strokeUniform: true,
    });

    canvas.add(triangle).setActiveObject(triangle);;
    canvas.requestRenderAll();
    triangle.animate('left', 150, { onChange: canvas.renderAll.bind(canvas) })

};
export const alignLeft = canvas => {
    canvas.getActiveObjects().forEach(element => { element.set('textAlign', 'left') });
    canvas.requestRenderAll();

};
export const alignRight = canvas => {
    canvas.getActiveObjects().forEach(element => { element.set('textAlign', 'right') });
    canvas.requestRenderAll();

};
export const alignCenter = canvas => {
    canvas.getActiveObjects().forEach(element => { element.set('textAlign', 'center') });
    canvas.requestRenderAll();
};

export const textUnderline = canvas => {
    canvas.getActiveObjects().forEach(element => { element.set('underline', !element.underline) });
    canvas.requestRenderAll();
};

export const textLineThrough = canvas => {
    canvas.getActiveObjects().forEach(element => { element.set('linethrough', !element.linethrough) });
    canvas.requestRenderAll();
};
export const textItalic = canvas => {
    canvas.getActiveObjects().forEach(element => { element.set('fontStyle', 'italic') });
    canvas.requestRenderAll();
};
export const txtBold = canvas => {
    canvas.getActiveObjects().forEach(element => { element.set('fontWeight', 'bold') });
    canvas.requestRenderAll();
};

export const textNormal = canvas => {
    canvas.getActiveObjects().forEach(element => { element.set('fontWeight', 'normal') });
    canvas.requestRenderAll();
};

export const removeBg = canvas => {
    canvas.getActiveObjects().forEach(element => { element.set('backgroundColor', '') });
    canvas.requestRenderAll();

};

export const removeFill = canvas => {
    canvas.getActiveObjects().forEach(element => { element.set('fill', '') });
    canvas.requestRenderAll();

};
export const removeStroke = canvas => {

    canvas.getActiveObjects().forEach(element => { element.set('strokeWidth', 0) });
    canvas.requestRenderAll();

};
export const removeShadow = canvas => {
    canvas.getActiveObjects().forEach(element => { element.set('shadow', { ...shadowOptions, blur: 0 }) });
    canvas.requestRenderAll();
};
export const gradientFill = canvas => {
    canvas.getActiveObjects().forEach(element => { element.set('fill', gradient) });
    canvas.requestRenderAll();
};
export const gradientStroke = canvas => {
    canvas.getActiveObjects().forEach(element => { element.set('stroke', gradient) });
    canvas.requestRenderAll();
};

export const deleteSelectedItem = canvas => {
    canvas.getActiveObjects().forEach(element => { canvas.remove(element) });
    canvas.discardActiveObject();
    canvas.requestRenderAll();
}

export const swapFaceandStrokeColors = canvas => {
    canvas.getActiveObjects().forEach(element => {
        var oldFill = element.fill;
        var oldStroke = element.stroke;
        element.fill = oldStroke;
        element.stroke = oldFill;
    });
    canvas.requestRenderAll();
}
export const deleteAll = canvas => {
    const aa = canvas.getObjects()
    aa.forEach(element => { canvas.remove(element) });
    canvas.discardActiveObject();
    canvas.requestRenderAll();

}

export const bringToFront = canvas => {
    canvas.getActiveObjects().forEach(element => canvas.bringToFront(element));
    canvas.discardActiveObject();
    canvas.requestRenderAll();
}

export const sendToBack = canvas => {
    canvas.getActiveObjects().forEach(element => canvas.sendToBack(element));
    canvas.discardActiveObject();
    canvas.requestRenderAll();
}


export const undo = canvas => {
    // canvas.extraProps = ['id', 'selectable']
    canvas.undo()
}
export const redo = canvas => canvas.redo()

export const setOpacity = (canvas, val = 0.5) => {
    canvas.getActiveObjects().forEach(element => element.set({ 'opacity': val }));
    canvas.requestRenderAll();
}

export const lock = canvas => {
    canvas.getActiveObjects().forEach(element => element.selectable = false);
    canvas.discardActiveObject();
    canvas.requestRenderAll();

}


export const unlockAll = canvas => {
    const aa = canvas.getObjects()
    aa.forEach(element => element.selectable = true);
}

const ErasedGroup = fabric.util.createClass(fabric.Group, {
    original: null,
    ErasedPath: null,
    initialize: function (original, ErasedPath, options, isAlreadyGrouped) {
        this.original = original;
        this.ErasedPath = ErasedPath;
        this.callSuper('initialize', [this.original, this.ErasedPath], options, isAlreadyGrouped);
    },

    _calcBounds: function (onlyWidthHeight) {
        const aX = [],
            aY = [],
            props = ['tr', 'br', 'bl', 'tl'],
            jLen = props.length,
            ignoreZoom = true;

        let o = this.original;
        o.setCoords(ignoreZoom);
        for (let j = 0; j < jLen; j++) {
            var prop = props[j];
            aX.push(o.oCoords[prop].x);
            aY.push(o.oCoords[prop].y);
        }

        this._getBounds(aX, aY, onlyWidthHeight);
    },
});
const EraserBrush = fabric.util.createClass(fabric.PencilBrush, {

    /**
     * On mouseup after drawing the path on contextTop canvas
     * we use the points captured to create an new fabric path object
     * and add it to the fabric canvas.
     */
    _finalizeAndAddPath: function () {
        var ctx = this.canvas.contextTop;
        ctx.closePath();
        if (this.decimate) {
            this._points = this.decimatePoints(this._points, this.decimate);
        }
        var pathData = this.convertPointsToSVGPath(this._points).join('');
        if (pathData === 'M 0 0 Q 0 0 0 0 L 0 0') {
            // do not create 0 width/height paths, as they are
            // rendered inconsistently across browsers
            // Firefox 4, for example, renders a dot,
            // whereas Chrome 10 renders nothing
            this.canvas.requestRenderAll();
            return;
        }

        // use globalCompositeOperation to 'fake' Eraser
        var path = this.createPath(pathData);
        path.globalCompositeOperation = 'destination-out';
        path.selectable = false;
        path.evented = false;
        path.absolutePositioned = true;

        // grab all the objects that intersects with the path
        const objects = this.canvas.getObjects().filter((obj) => {
            // if (obj instanceof fabric.Textbox) return false;
            // if (obj instanceof fabric.IText) return false;
            if ((obj instanceof fabric.Rect) && (obj.id === 'rectwithimg')) { return false }
            if (!obj.intersectsWithObject(path)) return false;
            return true;
        });

        if (objects.length > 0) {
            // merge those objects into a group
            const mergedGroup = new fabric.Group(objects);
            const newPath = new ErasedGroup(mergedGroup, path);
            const left = newPath.left;
            const top = newPath.top;
            // convert it into a dataURL, then back to a fabric image
            const newData = newPath.toDataURL({
                withoutTransform: true
            });
            fabric.Image.fromURL(newData, (fabricImage) => {
                fabricImage.set({
                    left: left,
                    top: top,
                    shadow: { ...shadowOptions, blur: 0 },
                });
                // remove the old objects then add the new image
                this.canvas.remove(...objects);
                this.canvas.add(fabricImage);
            });
        }

        this.canvas.clearContext(this.canvas.contextTop);
        this.canvas.renderAll();
        this._resetShadow();
    },
});


const putat00 = (canvas) => {
    // canvas.setZoom(1)
    canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
    selectAll(canvas);
    canvas.getActiveObject()?.set({ left: 0, top: 0 });
}
const alignAllLeft = (canvas) => {
    const arr = [];
    canvas.getActiveObjects().forEach(item => {
        arr.push(item.left)
    })
    const min = Math.min(...arr);
    canvas.getActiveObjects().forEach(item => {
        item.left = min;
    })
    canvas.requestRenderAll();
}

const alignAllTop = (canvas) => {
    const arr = [];
    canvas.getActiveObjects().forEach(item => {
        arr.push(item.top)
    })
    const min = Math.min(...arr);
    canvas.getActiveObjects().forEach(item => {
        item.top = min;
    })
    canvas.requestRenderAll();
}

const alignAllRight = (canvas) => {
    const arr = [];
    canvas.getActiveObjects().forEach(item => {
        arr.push(item.left + (item.width * item.scaleX))
    })
    const max = Math.max(...arr);
    canvas.getActiveObjects().forEach(item => {
        item.left = max - (item.width * item.scaleX);
    })
    canvas.requestRenderAll();
}
const alignAllButtom = (canvas) => {
    const arr = [];
    canvas.getActiveObjects().forEach(item => {
        arr.push(item.top + (item.height * item.scaleY))
    })
    const max = Math.max(...arr);
    canvas.getActiveObjects().forEach(item => {
        item.top = max - (item.height * item.scaleY);
    })
    canvas.requestRenderAll();
}


export const groupObjects = (canvas, shouldGroup) => {
    if (shouldGroup) {
        if (!canvas.getActiveObject()) {
            return;
        }
        if (canvas.getActiveObject().type !== 'activeSelection') {
            return;
        }
        canvas.getActiveObject().toGroup().set({ shadow: shadowOptions });
        canvas.requestRenderAll();

    }
    else {
        if (!canvas.getActiveObject()) {
            return;
        }
        if (canvas.getActiveObject().type !== 'group') {
            return;
        }
        canvas.getActiveObject().toActiveSelection();
        const aa = canvas.getObjects();
        aa.forEach(element => element.set({ objectCaching: false, shadow: shadowOptions }));
        canvas.requestRenderAll();
    }
};


export const selectAll = (canvas) => {
    canvas.discardActiveObject();
    var sel = new fabric.ActiveSelection(canvas.getObjects(), {
        canvas: canvas,
    });
    canvas.setActiveObject(sel);
    canvas.requestRenderAll();
}
export const deSelectAll = (canvas) => {
    canvas.discardActiveObject();
    canvas.requestRenderAll();
}

var _clipboard;
export const copy = (canvas) => {
    canvas?.getActiveObject()?.clone(cloned => {
        _clipboard = cloned;
    }, ['id']);
}

export const paste = (canvas) => {
    try {
        _clipboard?.clone(clonedObj => {
            canvas?.discardActiveObject();
            clonedObj.set({
                left: clonedObj.left + 10,
                top: clonedObj.top + 10,
                evented: true,
                objectCaching: false,
            });
            if (clonedObj.type === 'activeSelection') {
                // active selection needs a reference to the canvas.
                clonedObj.canvas = canvas;
                clonedObj.forEachObject(obj => {
                    canvas?.add(obj);
                });
                // this should solve the unselectability
                clonedObj.setCoords();
            } else {
                canvas?.add(clonedObj);
            }
            _clipboard.top += 10;
            _clipboard.left += 10;
            canvas?.setActiveObject(clonedObj);
            canvas?.requestRenderAll();
        }, ['id']);
    } catch (error) {
        // alert(error)
    }
}

const DrawingController = () => {
    const [fontList, setFontList] = useState(fontLists);
    const [currentFont, setCurrentFont] = useState('Arial')
    const canvas = useSelector(state => state.canvasReducer.canvas);

    const canvasList = useSelector(state => state.canvasListReducer.canvasList);

    const currentPage = useSelector(state => state.currentPageReducer.currentPage);

    const [currentscreenSize, setCurrentscreenSize] = useState(1024)

    const [verticalSpeed, setVerticalSpeed] = useState(0.3)
    const [horizontalSpeed, setHorizontalSpeed] = useState(0.3)
    const [ltr, setLtr] = useState(false);

    const strokeLineCaps = ["butt", "round", "square"];
    const [currentstrokeLineCap, setCurrentstrokeLineCap] = useState('round');

    const [solidcaption1, setSolidcaption1] = useState('');
    const [solidcaption2, setSolidcaption2] = useState('');
    const [solidcaption3, setSolidcaption3] = useState('');
    const [logo, setLogo] = useState('');
    const [locationBand, setLocationBand] = useState('');

    const [verticalScroll, setVerticalScroll] = useState('');
    const [horizontalScroll, setHorizontalScroll] = useState('');
    const [clock, setClock] = useState('');
    const [upTimer, setUpTimer] = useState('');
    const modes = ['Pencil', 'Spray', 'Erase', 'none'];

    const [currentMode, setCurrentMode] = useState('none');
    const [fontSize, setFontSize] = useState(25);
    const [opacity, setOpacity] = useState(1);
    const [strokeWidth, setStrokeWidth] = useState(1);

    const [skewXSize, setSkewXSize] = useState(0);
    const [skewYSize, setSkewYSize] = useState(0);

    const [skewRX, setSkewRX] = useState(0);
    const [skewRY, setSkewRY] = useState(0);

    const [cropX, setCropX] = useState(0);
    const [cropY, setCropY] = useState(0);

    const setOpacity1 = (canvas, e) => {
        setOpacity(e.target.value)
        canvas.getActiveObjects().forEach(element => element.set({ 'opacity': e.target.value }));
        canvas.requestRenderAll();
    }

    const onSizeChange = (e, canvas) => {
        options.currentFontSize = e.target.value
        setFontSize(e.target.value)
        canvas.getActiveObjects().forEach(item => item.fontSize = e.target.value)
        canvas.requestRenderAll();
    }
    const makeFullScreen = () => {
        canvas?.getActiveObjects().forEach(element => {
            element.set({ scaleX: (1024 / element.width), scaleY: (576 / element.height), left: 0, top: 0 })
        });
        canvas?.requestRenderAll();
    }
    const removeBorder = () => {
        canvas?.getActiveObjects().forEach(element => {
            element.set({ strokeWidth: 0 })
        });
        canvas?.requestRenderAll();
    }
    const removeCornerCurve = () => {
        canvas?.getActiveObjects().forEach(element => {
            element.set({ rx: 0, ry: 0 })
        });
        canvas?.requestRenderAll();
    }

    const onDrawingModeChange = (mode, canvas) => {
        setCurrentMode(mode);
        if (mode === 'none') {
            canvas.isDrawingMode = false;
            return;
        } else {
            canvas.isDrawingMode = true;
        }

        if (mode === 'Pencil') {
            canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
            canvas.freeDrawingBrush.color = options.stroke;
            canvas.freeDrawingBrush.width = options.strokeWidth;
        }
        else if (mode === 'Spray') {
            canvas.freeDrawingBrush = new fabric.SprayBrush(canvas);
            canvas.freeDrawingBrush.color = options.stroke;
            canvas.freeDrawingBrush.width = options.strokeWidth;
        }

        else if (mode === 'Erase') {
            canvas.freeDrawingBrush = new EraserBrush(canvas);
            canvas.freeDrawingBrush.color = 'white';
            canvas.freeDrawingBrush.width = options.strokeWidth;
        }
        canvas.freeDrawingBrush.strokeLineCap = currentstrokeLineCap;

    }
    window.onDrawingModeChange = onDrawingModeChange;
    const toggleModeDrawing = (canvas) => {
        canvas.isDrawingMode = false;
        setCurrentMode('none');
    }
    window.toggleModeDrawing = toggleModeDrawing;

    const onFontChange = (e) => {
        options.currentFont = e.target.value;
        setCurrentFont(e.target.value);
        canvas.getActiveObjects().forEach(item => item.fontFamily = e.target.value)
        canvas.requestRenderAll();
    }
    const onstrokeLineCapChange = e => {
        canvas.freeDrawingBrush.strokeLineCap = e.target.value;
        setCurrentstrokeLineCap(e.target.value);
    }

    let fileReader;

    const importJSON = (file, canvas) => {
        if (file) {
            fileReader = new FileReader();
            fileReader.onloadend = () => handleFileReadJSON(canvas);
            fileReader.readAsText(file);
        }
    };

    const handleFileReadJSON = () => {
        const content = fileReader.result;
        canvas.loadFromJSON(content, canvas.renderAll.bind(canvas), function (o, object) {
        })

    };

    const onBlurSizeChange = e => {
        shadowOptions.blur = e.target.value;
        canvas.getActiveObjects().forEach(item => { if (item.shadow) { item.shadow.blur = e.target.value } })
        canvas.requestRenderAll();
    }
    const onoffsetXChange = e => {
        shadowOptions.offsetX = e.target.value;
        canvas.getActiveObjects().forEach(item => { if (item.shadow) { item.shadow.offsetX = e.target.value } })
        canvas.requestRenderAll();
    }

    const onoffsetYChange = e => {
        shadowOptions.offsetY = e.target.value;
        canvas.getActiveObjects().forEach(item => { if (item.shadow) { item.shadow.offsetY = e.target.value } })
        canvas.requestRenderAll();
    }
    const affectStroke = e => {
        shadowOptions.affectStroke = e.target.checked;
        canvas.getActiveObjects().forEach(item => { if (item.shadow) { item.shadow.affectStroke = e.target.checked } })
        canvas.requestRenderAll();
    }
    const onstrokeSizeChange = e => {
        options.strokeWidth = parseInt(e.target.value);
        setStrokeWidth(parseInt(e.target.value))
        canvas.freeDrawingBrush.width = parseInt(e.target.value);
        canvas.getActiveObjects().forEach(item => item.strokeWidth = parseInt(e.target.value))
        canvas.requestRenderAll();
    }
    const onSkewXSizeChange = e => {
        setSkewXSize(parseInt(e.target.value))
        canvas.getActiveObjects().forEach(item => item.skewX = parseInt(e.target.value))
        canvas.requestRenderAll();
    }
    const onSkewYSizeChange = e => {
        setSkewYSize(parseInt(e.target.value))
        canvas.getActiveObjects().forEach(item => item.skewY = parseInt(e.target.value))
        canvas.requestRenderAll();
    }
    const onRxSizeChange = e => {
        setSkewRX(parseInt(e.target.value))
        canvas.getActiveObjects().forEach(item => {
            item.rx = parseInt(e.target.value)
        })
        canvas.requestRenderAll();
    }
    const onRySizeChange = e => {
        setSkewRY(parseInt(e.target.value))
        canvas.getActiveObjects().forEach(item => item.ry = parseInt(e.target.value))
        canvas.requestRenderAll();
    }

    const onCropX = e => {
        setCropX(parseInt(e.target.value))
        canvas.getActiveObjects().forEach(item => item.cropX = parseInt(e.target.value))
        canvas.requestRenderAll();
    }
    const onCropY = e => {
        setCropY(parseInt(e.target.value))
        canvas.getActiveObjects().forEach(item => item.cropY = parseInt(e.target.value))
        canvas.requestRenderAll();
    }

    const onVerticalSpeedChange = (e) => {
        setVerticalSpeed(e.target.value)
        localStorage.setItem('RCC_verticalSpeed', e.target.value)

        endpoint(`call ${window.chNumber}-110 "speed=${e.target.value}"`);
    }
    const onHorizontalSpeedChange = (e) => {
        setHorizontalSpeed(e.target.value)
        localStorage.setItem('RCC_horizontalSpeed', e.target.value)
        endpoint(`call ${window.chNumber}-111 "speed=${e.target.value}"`);
    }
    const exportSVG = canvas => {
        const element = document.createElement("a");
        var aa = canvas.toSVG()
        const file = new Blob([aa], { type: 'text/xml' });
        element.href = URL.createObjectURL(file);
        var ss = new Date().toLocaleTimeString('en-US', { year: "numeric", month: "numeric", day: "numeric", hour12: false, hour: "numeric", minute: "numeric", second: "numeric" });
        var retVal = prompt("Enter  file name to save : ", ss + "_FileName");
        if (retVal !== null) {
            element.download = retVal;
            document.body.appendChild(element); // Required for this to work in FireFox
            element.click();
        }
    }
    const exportJSON = canvas => {
        const element = document.createElement("a");
        var aa = JSON.stringify(canvas.toJSON());
        const file = new Blob([aa], { type: 'text/json' });
        element.href = URL.createObjectURL(file);
        var ss = new Date().toLocaleTimeString('en-US', { year: "numeric", month: "numeric", day: "numeric", hour12: false, hour: "numeric", minute: "numeric", second: "numeric" });
        var retVal = prompt("Enter  file name to save : ", ss + "_FileName");
        if (retVal !== null) {
            element.download = retVal + '.json';
            document.body.appendChild(element); // Required for this to work in FireFox
            element.click();
        }
    }

    const importSVG = file => {
        if (file) {
            var site_url = URL.createObjectURL(file);
            fabric.loadSVGFromURL(site_url, function (objects) {
                objects?.forEach(element => {
                    canvas.add(element);
                    element.objectCaching = false;
                    element.shadow = shadowOptions;
                });
            });
            canvas.renderAll();
        }
    }

    const exportHTML1 = canvas => {
        canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
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
                <div> ${canvas.toSVG()}  </div>
                 </body>
                 <script>
                document.body.style.margin='0';
                document.body.style.padding='0';
                document.body.style.overflow='hidden';
                var aa = document.getElementsByTagName('div')[0];
                aa.style.zoom=(${currentscreenSize * 100}/1024)+'%';
                </script>
                </html>`
            const file = new Blob([aa], { type: 'text/html' });
            saveAs(file, retVal + '.html')
        }
    }
    const exportPng = canvas => {
        canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
        selectAll(canvas);
        var br = (canvas.getActiveObject())?.getBoundingRect();
        var ss = new Date().toLocaleTimeString('en-US', { year: "numeric", month: "numeric", day: "numeric", hour12: false, hour: "numeric", minute: "numeric", second: "numeric" });
        var retVal = prompt("Enter file name to save : ", ss + "_FileName");
        if (retVal !== null) {
            try {
                saveAs(canvas.toDataURL({
                    format: 'png',
                    left: br.left,
                    top: br.top,
                    width: br.width,
                    height: br.height
                }), retVal + '.png')

            } catch (error) {
                alert(error)
            }
        }
    }

    const exportVerticalScrollAsHTML = canvas => {
        canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
        selectAll(canvas);
        var hh = (canvas.getActiveObject())?.getBoundingRect().height + 100;
        const element = document.createElement("a");
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
        aa += '<div>' + canvas.toSVG() + '</div>';
        aa += `
         <script>
        var aa = document.getElementsByTagName('div')[0];
        aa.style.position='absolute';
        document.getElementsByTagName('svg')[0].style.height='${hh}';
        document.getElementsByTagName('svg')[0].setAttribute('viewBox','0 0 1024 ${hh}');
        aa.style.top='100%';
        aa.style.zoom=(${currentscreenSize * 100}/1024)+'%';
       document.body.style.overflow='hidden';
       var speed=${verticalSpeed};
          setInterval(function(){
              aa.style.top =(aa.getBoundingClientRect().top-speed)+'px';
             }, 1);
         </script>
         `;
        aa += `
            </body>
            </html>`
        const file = new Blob([aa], { type: 'text/html' });
        element.href = URL.createObjectURL(file);
        var ss = new Date().toLocaleTimeString('en-US', { year: "numeric", month: "numeric", day: "numeric", hour12: false, hour: "numeric", minute: "numeric", second: "numeric" });
        var retVal = prompt("Enter  file name to save : ", ss + "_FileName");
        if (retVal !== null) {
            element.download = retVal + '.html';
            document.body.appendChild(element); // Required for this to work in FireFox
            element.click();
        }
    }
    const exportHorizontalScrollAsHTML = canvas => {
        canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
        selectAll(canvas);
        var hh = (canvas.getActiveObject())?.getBoundingRect().width + 100;
        const element = document.createElement("a");
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
        aa += '<div>' + canvas.toSVG() + '</div>';
        aa += `
         <script>
        var aa = document.getElementsByTagName('div')[0];
        aa.style.position='absolute';
        document.getElementsByTagName('svg')[0].style.width='${hh}';
        document.getElementsByTagName('svg')[0].setAttribute('viewBox','0 0 ${hh} 576');
        aa.style.zoom=(${currentscreenSize * 100}/1024)+'%';
       document.body.style.overflow='hidden';
       var speed=${horizontalSpeed};
        if (${!ltr}){
          aa.style.left='100%';
          setInterval(function(){
              aa.style.left =(aa.getBoundingClientRect().left-speed)+'px';
              if (aa.getBoundingClientRect().left < -${hh}){aa.style.left='100%'};
           }, 1);
        }
        else{
            aa.style.left=-${hh};
            setInterval(function(){
                aa.style.left =(aa.getBoundingClientRect().left+speed)+'px';
                if (aa.getBoundingClientRect().left >${hh}){aa.style.left=-${hh}};
             }, 1);
        }
         </script>
         `;
        aa += `
            </body>
            </html>`
        const file = new Blob([aa], { type: 'text/html' });
        element.href = URL.createObjectURL(file);
        var ss = new Date().toLocaleTimeString('en-US', { year: "numeric", month: "numeric", day: "numeric", hour12: false, hour: "numeric", minute: "numeric", second: "numeric" });
        var retVal = prompt("Enter  file name to save : ", ss + "_FileName");
        if (retVal !== null) {
            element.download = retVal + '.html';
            document.body.appendChild(element); // Required for this to work in FireFox
            element.click();
        }
    }
    const exportClockAsHTML = canvas => {
        canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
        const element = document.createElement("a");
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
        aa += '<div>' + canvas.toSVG() + '</div>';
        aa += `
            </body>
            <script>

            document.body.style.margin='0';
            document.body.style.padding='0';
            document.body.style.overflow='hidden';

            var aa = document.getElementsByTagName('div')[0];
            aa.style.position='absolute';
            aa.style.zoom=(${currentscreenSize * 100}/1024)+'%';
            var cc=document.getElementsByTagName('tspan')[0];
            cc.textContent='';
            setInterval(function() {
                var ss1 = new Date().toLocaleTimeString('en-US', { hour12: false, hour: 'numeric', minute: 'numeric', second: 'numeric' });
             cc.textContent  =ss1;
              }, 1000);
              </script>
            </html>`
        const file = new Blob([aa], { type: 'text/html' });
        element.href = URL.createObjectURL(file);
        var ss = new Date().toLocaleTimeString('en-US', { year: "numeric", month: "numeric", day: "numeric", hour12: false, hour: "numeric", minute: "numeric", second: "numeric" });
        var retVal = prompt("Enter  file name to save : ", ss + "_FileName");
        if (retVal !== null) {
            element.download = retVal + '.html';
            document.body.appendChild(element); // Required for this to work in FireFox
            element.click();
        }
    }
    const exportUpTimerAsHTML = canvas => {
        canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
        const element = document.createElement("a");
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
        aa += '<div>' + canvas.toSVG() + '</div>';
        aa += `
            </body>
            <script>
            document.body.style.margin='0';
            document.body.style.padding='0';
            document.body.style.overflow='hidden';
            var aa = document.getElementsByTagName('div')[0];
            aa.style.position='absolute';
            aa.style.zoom=(${currentscreenSize * 100}/1024)+'%';
            var cc=document.getElementsByTagName('tspan')[0];
            cc.textContent='';
            var startTime = new Date();
        setInterval(function() {
            var diff = (new Date()).getTime() - startTime.getTime();
            var date_diff = new Date(diff - 30 * 60 * 1000);
            var ss1 = date_diff.toLocaleString('en-US', { minute: '2-digit', second: '2-digit' }) + ':' + String(date_diff.getMilliseconds()).padStart(3, '0');
            cc.textContent  =ss1;
          }, 40);
              </script>
            </html>`
        const file = new Blob([aa], { type: 'text/html' });
        element.href = URL.createObjectURL(file);
        var ss = new Date().toLocaleTimeString('en-US', { year: "numeric", month: "numeric", day: "numeric", hour12: false, hour: "numeric", minute: "numeric", second: "numeric" });
        var retVal = prompt("Enter  file name to save : ", ss + "_FileName");
        if (retVal !== null) {
            element.download = retVal + '.html';
            document.body.appendChild(element); // Required for this to work in FireFox
            element.click();
        }
    }


    const startVerticalScroll = () => {
        canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
        selectAll(canvas);
        var hh = (canvas.getActiveObject())?.getBoundingRect().height + 100;
        endpoint(`play ${window.chNumber}-110 [HTML] xyz.html`);
        endpoint(`call ${window.chNumber}-110 "
        var aa = document.createElement('div');
        aa.style.position='absolute';
        aa.innerHTML='${(canvas.toSVG()).replaceAll('"', '\\"')}';
        document.body.appendChild(aa);
        document.getElementsByTagName('svg')[0].style.height='${hh}';
        document.getElementsByTagName('svg')[0].setAttribute('viewBox','0 0 1024 ${hh}');
        aa.style.top='100%';
        aa.style.zoom=(${currentscreenSize * 100}/1024)+'%';
       document.body.style.overflow='hidden';
       var speed=${verticalSpeed};
       setInterval(function() {
         aa.style.top =aa.getBoundingClientRect().top-speed;
          }, 1);
        "`)
    }

    const startHorizontalScroll = () => {
        canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
        selectAll(canvas);
        var hh = (canvas.getActiveObject())?.getBoundingRect().width;
        endpoint(`play ${window.chNumber}-111 [HTML] xyz.html`);
        endpoint(`call ${window.chNumber}-111 "
        var aa = document.createElement('div');
        aa.style.position='absolute';
        aa.innerHTML='${(canvas.toSVG()).replaceAll('"', '\\"')}';
        document.body.appendChild(aa);
        document.getElementsByTagName('svg')[0].style.width='${hh}';
        document.getElementsByTagName('svg')[0].setAttribute('viewBox','0 0 ${hh} 576');
        aa.style.zoom=(${currentscreenSize * 100}/1024)+'%';
        document.body.style.overflow='hidden';
        var speed=${horizontalSpeed};
        if (${!ltr}){
                    aa.style.left='100%';
                    setInterval(function() {
                    aa.style.left =aa.getBoundingClientRect().left-speed;
                    if (aa.getBoundingClientRect().left < -${hh}){aa.style.left='100%'};
                    }, 1);
                    }
        else{
            aa.style.left=-${hh};
            setInterval(function() {
            aa.style.left =aa.getBoundingClientRect().left+speed;
            if (aa.getBoundingClientRect().left > ${currentscreenSize}){aa.style.left=-${hh}};
            }, 1);
        }
        "`)
    }

    const startClock = () => {
        canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
        selectAll(canvas);

        endpoint(`play ${window.chNumber}-112 [HTML] xyz.html`);
        endpoint(`call ${window.chNumber}-112 "
        var aa = document.createElement('div');
        aa.style.position='absolute';
        aa.innerHTML='${(canvas.toSVG()).replaceAll('"', '\\"')}';
        document.body.appendChild(aa);

        document.body.style.margin='0';
        document.body.style.padding='0';
        aa.style.zoom=(${currentscreenSize * 100}/1024)+'%';
        document.body.style.overflow='hidden';

        var cc=document.getElementById('clock1').getElementsByTagName('tspan')[0];
        cc.textContent='';
        setInterval(function() {
            var ss1 = new Date().toLocaleTimeString('en-US', { hour12: false, hour: 'numeric', minute: 'numeric', second: 'numeric' });
         cc.textContent  =ss1;
          }, 1000);
        "`)
    }
    const startUpTimer = () => {
        canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
        selectAll(canvas);
        endpoint(`play ${window.chNumber}-115 [HTML] xyz.html`);
        endpoint(`call ${window.chNumber}-115 "
        var aa = document.createElement('div');
        aa.style.position='absolute';
        aa.innerHTML='${(canvas.toSVG()).replaceAll('"', '\\"')}';
        document.body.appendChild(aa);
        document.body.style.margin='0';
        document.body.style.padding='0';
        aa.style.zoom=(${currentscreenSize * 100}/1024)+'%';
        document.body.style.overflow='hidden';
        var cc=document.getElementById('uptimer1').getElementsByTagName('tspan')[0];
        cc.textContent='';
        var startTime = new Date();
        setInterval(function() {
            var diff = (new Date()).getTime() - startTime.getTime();
            var date_diff = new Date(diff - 30 * 60 * 1000);
            var ss1 = date_diff.toLocaleString('en-US', { minute: '2-digit', second: '2-digit' }) + ':' + String(date_diff.getMilliseconds()).padStart(3, '0');
            cc.textContent  =ss1;
          }, 40);
        "`)
    }

    const startGraphics = (canvas, layerNumber) => {

        canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
        endpoint(`mixer ${window.chNumber}-${layerNumber} fill 0 0 0 1 6 ${window.animationMethod}`)
        setTimeout(() => {
            endpoint(`play ${window.chNumber}-${layerNumber} [HTML] xyz.html`);
        }, 250);

        setTimeout(() => {
            endpoint(`call ${window.chNumber}-${layerNumber} "
            var aa = document.createElement('div');
            aa.style.position='absolute';
            aa.innerHTML='${(canvas.toSVG()).replaceAll('"', '\\"')}';
            document.body.appendChild(aa);
            document.body.style.margin='0';
            document.body.style.padding='0';
            aa.style.zoom=(${currentscreenSize * 100}/1024)+'%';
            document.body.style.overflow='hidden';
            "`)
        }, 300);

        setTimeout(() => {
            endpoint(`mixer ${window.chNumber}-${layerNumber} fill 0 0 1 1 10 ${window.animationMethod}`)
        }, 800);
        setTimeout(() => {
            updateGraphics(canvas, layerNumber);
        }, 1100);
    }

    const updateGraphics = (canvas, layerNumber) => {
        endpoint(`call ${window.chNumber}-${layerNumber} "
            aa.innerHTML='${(canvas.toSVG()).replaceAll('"', '\\"')}';
            "`)
    }
    const stopGraphics = layerNumber => {
        endpoint(`mixer ${window.chNumber}-${layerNumber} fill 0 0 0 1 12 ${window.animationMethod}`)
        setTimeout(() => {
            endpoint(`stop ${window.chNumber}-${layerNumber}`)
        }, 1000);

    }

    useEffect(() => {
        setCurrentscreenSize(localStorage.getItem('RCC_currentscreenSize'));
        setSolidcaption1(localStorage.getItem('RCC_solidCaption1'));
        setSolidcaption2(localStorage.getItem('RCC_solidCaption2'));
        setSolidcaption3(localStorage.getItem('RCC_solidCaption3'));
        setLogo(localStorage.getItem('RCC_logo'));
        setLocationBand(localStorage.getItem('RCC_locationBand'));
        setClock(localStorage.getItem('RCC_clock'));
        setVerticalScroll(localStorage.getItem('RCC_verticalScroll'));
        setHorizontalScroll(localStorage.getItem('RCC_horizontalScroll'));
        setHorizontalSpeed(localStorage.getItem('RCC_horizontalSpeed'));
        setVerticalSpeed(localStorage.getItem('RCC_verticalSpeed'));

        axios.post('http://localhost:8080/getfonts').then((aa) => {
            setFontList(aa.data)

        }).catch((aa) => { console.log('Error', aa) });
        return () => {
        }
    }, [])


    useEffect(() => {
        window.addEventListener('keydown', e => {
            // console.log(e.key);
            if (e.repeat) {
                return;
            }

            if (e.key === 'Delete') {
                canvas?.getActiveObjects().forEach(item => {
                    //  alert(item.type);
                    if (!((item.type === 'textbox') && item.isEditing)) { canvas?.remove(item); }
                });
            }
            if (e.ctrlKey && e.key === 'c') {
                const item = canvas?.getActiveObjects()[0];
                if (!((item?.type === 'textbox') && item?.isEditing)) { copy(canvas) }
            }
            if (e.ctrlKey && e.key === 'v') {
                const item = canvas?.getActiveObjects()[0];
                if (!((item?.type === 'textbox') && item?.isEditing)) { paste(canvas) }
            }
            if (e.ctrlKey && e.key === 'z') {
                canvas?.undo();
            }

        });
        return () => {
            window.removeEventListener('keydown', null)
        }
    }, [canvas])


    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: 495, height: 900, backgroundColor: '#f4f0e7', overflow: 'scroll' }}>
                <div className='drawingToolsRow' >
                    <b> Screen Setup: </b>
                    Casparcg Screen Sizes  <select value={currentscreenSize} onChange={e => {
                        setCurrentscreenSize(e.target.value);
                        localStorage.setItem('RCC_currentscreenSize', e.target.value)
                    }
                    }>  {screenSizes.map((val) => { return <option key={uuidv4()} value={val}>{val}</option> })} </select>
                </div>
                <div className='drawingToolsRow' >
                    <b> Solid Caption 1: </b>
                    <button onClick={() => {
                        startGraphics(canvas, 108);
                        setSolidcaption1(canvasList[currentPage]?.pageName);
                        localStorage.setItem('RCC_solidCaption1', canvasList[currentPage]?.pageName);
                    }
                    }><FaPlay /></button>  <button onClick={() => updateGraphics(canvas, 108)}>Update</button>

                    <button onClick={() => {
                        stopGraphics(108);
                        setSolidcaption1('');
                        localStorage.setItem('RCC_solidCaption1', '');


                    }} ><FaStop /></button>
                    <span> {solidcaption1} </span>
                </div>
                <div className='drawingToolsRow' >
                    <b> Solid Caption 2: </b>
                    <button onClick={() => {
                        startGraphics(canvas, 109);
                        setSolidcaption2(canvasList[currentPage]?.pageName);
                        localStorage.setItem('RCC_solidCaption2', canvasList[currentPage]?.pageName);

                    }
                    }><FaPlay />  </button>  <button onClick={() => updateGraphics(canvas, 109)}>Update</button>
                    <button onClick={() => {
                        stopGraphics(109);
                        setSolidcaption2('');
                        localStorage.setItem('RCC_solidCaption2', '');

                    }} ><FaStop /></button>
                    <span> {solidcaption2} </span>
                </div>
                <div className='drawingToolsRow' >
                    <b> Solid Caption 3: </b>
                    <button onClick={() => {
                        startGraphics(canvas, 110);
                        setSolidcaption3(canvasList[currentPage]?.pageName);
                        localStorage.setItem('RCC_solidCaption3', canvasList[currentPage]?.pageName);

                    }
                    }><FaPlay />  </button>  <button onClick={() => updateGraphics(canvas, 110)}>Update</button>
                    <button onClick={() => {
                        stopGraphics(110);
                        setSolidcaption3('');
                        localStorage.setItem('RCC_solidCaption3', '');

                    }} ><FaStop /></button>
                    <span> {solidcaption3} </span>
                </div>

                <div className='drawingToolsRow' >
                    <b> Logo: </b>

                    <button onClick={() => {
                        startGraphics(canvas, 215);
                        setLogo(canvasList[currentPage]?.pageName);
                        localStorage.setItem('RCC_logo', canvasList[currentPage]?.pageName);

                    }
                    }><FaPlay />  </button>
                    <button onClick={() => updateGraphics(canvas, 215)}>Update</button>
                    <button onClick={() => {
                        stopGraphics(215);
                        setLogo('');
                        localStorage.setItem('RCC_logo', '');

                    }} ><FaStop /></button>
                    <span> {logo} </span>

                </div>
                <div className='drawingToolsRow' >
                    <b> Location Band: </b>
                    <button onClick={() => {
                        startGraphics(canvas, 210);
                        setLocationBand(canvasList[currentPage]?.pageName);
                        localStorage.setItem('RCC_locationBand', canvasList[currentPage]?.pageName);

                    }
                    }><FaPlay />  </button>
                    <button onClick={() => updateGraphics(canvas, 210)}>Update</button>
                    <button onClick={() => {
                        stopGraphics(210);
                        setLocationBand('');
                        localStorage.setItem('RCC_locationBand', '');

                    }} ><FaStop /></button>
                    <span> {locationBand} </span>
                </div>

                <div className='drawingToolsRow' >
                    <b> V Scroll: </b>  <button onClick={() => {
                        startVerticalScroll();
                        setVerticalScroll(canvasList[currentPage]?.pageName)
                        localStorage.setItem('RCC_verticalScroll', canvasList[currentPage]?.pageName);

                    }}><FaPlay /> </button>
                    <button onClick={() => endpoint(`call ${window.chNumber}-110 "speed=0"`)}><FaPause /></button>
                    <button onClick={() => endpoint(`call ${window.chNumber}-110 "speed=${verticalSpeed}"`)}> <GrResume /></button>
                    <button onClick={() => {
                        endpoint(`stop ${window.chNumber}-110`);
                        setVerticalScroll('')
                        localStorage.setItem('RCC_verticalScroll', '');

                    }} ><FaStop /></button>
                    Speed:<input style={{ width: '40px' }} onChange={e => onVerticalSpeedChange(e)} type="number" min='0' max='5' step='0.01' value={verticalSpeed} />

                    <button onClick={() => exportVerticalScrollAsHTML(canvas)}>To HTML</button>
                    <span> {verticalScroll} </span>
                </div>
                <div className='drawingToolsRow' >
                    <b> H Scroll: </b>
                    <button onClick={() => {
                        startHorizontalScroll(window.editor?.canvas);
                        setHorizontalScroll(canvasList[currentPage]?.pageName);
                        localStorage.setItem('RCC_horizontalScroll', canvasList[currentPage]?.pageName);

                    }}><FaPlay /></button>
                    <button onClick={() => endpoint(`call ${window.chNumber}-111 "speed=0"`)}> <FaPause /></button>
                    <button onClick={() => endpoint(`call ${window.chNumber}-111 "speed=${horizontalSpeed}"`)}> <GrResume /></button>
                    <button onClick={() => {
                        endpoint(`stop ${window.chNumber}-111`);
                        setHorizontalScroll('');
                        localStorage.setItem('RCC_horizontalScroll', '');

                    }} ><FaStop /></button>
                    Speed:<input style={{ width: '40px' }} onChange={e => onHorizontalSpeedChange(e)} type="number" min='0' max='5' step='0.01' value={horizontalSpeed} />
                    <button onClick={() => exportHorizontalScrollAsHTML(canvas)}>To HTML</button>
                    <span> LTR:</span>  <input type="checkbox" value={ltr} onChange={e => setLtr(val => !val)} />
                    <span> {horizontalScroll} </span>
                </div>
                <div className='drawingToolsRow' >
                    <b>Clock: </b>
                    <button onClick={() => addClock(canvas)}>Add to Preview</button>
                    <button onClick={() => {
                        startClock();
                        setClock(canvasList[currentPage]?.pageName);
                        localStorage.setItem('RCC_clock', canvasList[currentPage]?.pageName);

                    }}><FaPlay /></button>
                    <button onClick={() => {
                        endpoint(`stop ${window.chNumber}-112`);
                        setClock('');
                        localStorage.setItem('RCC_clock', '');

                    }} ><FaStop /></button>
                    <button onClick={() => exportClockAsHTML(canvas)}>To HTML</button>
                    <span> {clock} </span>
                </div>
                <div className='drawingToolsRow' >
                    <b>Count Up Timer: </b>
                    <button onClick={() => addUpTimer(canvas)}>Add to Preview</button>
                    <button onClick={() => {
                        startUpTimer();
                        setUpTimer(canvasList[currentPage]?.pageName);
                        localStorage.setItem('RCC_upTimer', canvasList[currentPage]?.pageName);

                    }}><FaPlay /></button>
                    <button onClick={() => {
                        endpoint(`stop ${window.chNumber}-115`);
                        setUpTimer('');
                        localStorage.setItem('RCC_upTimer', '');

                    }} ><FaStop /></button>
                    <button onClick={() => exportUpTimerAsHTML(canvas)}>To HTML</button>
                    <span> {upTimer} </span>
                </div>
                <div className='drawingToolsRow' >
                    <b> Drawing Elements: </b>
                    <button onClick={() => createRect(canvas)}> <VscPrimitiveSquare /></button>
                    <Tooltip title="MutliLine Text Box"><button onClick={() => createTextBox(canvas)}>TB</button></Tooltip>
                    <Tooltip title="Single Line Text Box"><button onClick={() => createIText(canvas)}>IT</button></Tooltip>
                    <Tooltip title="Single Line Text Box Not Editable"><button onClick={() => createText(canvas)}>T</button></Tooltip>
                    <button onClick={() => createCircle(canvas)}>  <VscCircleFilled /></button>
                    <button onClick={() => createTriangle(canvas)}><VscTriangleUp /></button>
                    <button onClick={() => createEllipse(canvas)}>Ellipse</button>
                    <button onClick={() => createPentagon(canvas)}>Pentagon</button>
                    <button onClick={() => createLine(canvas)}>Line</button>


                </div>
                <div className='drawingToolsRow' >
                    <b>Opacity: </b><input className='inputRange' onChange={e => setOpacity1(canvas, e)} type="range" min='0' max='1' step='0.1' defaultValue='1' /> {opacity}
                </div>
                <div className='drawingToolsRow' >
                    <b> Font: </b> <select onChange={e => onFontChange(e)} value={currentFont}>
                        {fontList.map((val) => { return <option key={uuidv4()} value={val}>{val}</option> })}
                    </select>
                    Size<input className='inputRangeFontSize' onChange={e => onSizeChange(e, canvas)} type="range" min='0' max='100' step='1' defaultValue='25' />
                    {fontSize}
                </div>
                <div className='drawingToolsRow' >
                    <b> Free Drawing: </b>
                    Type:  <select onChange={e => onDrawingModeChange(e.target.value, canvas)} value={currentMode}>
                        {modes.map((val) => { return <option key={uuidv4()} value={val}>{val}</option> })}
                    </select>

                    End:  <select onChange={e => onstrokeLineCapChange(e)} value={currentstrokeLineCap}>
                        {strokeLineCaps.map((val) => { return <option key={uuidv4()} value={val}>{val}</option> })}
                    </select>
                </div>

                <div className='drawingToolsRow' >
                    <b> Colors: </b>
                    Fill <input type="color" defaultValue='#ffffff' onChange={e => changeCurrentColor(e, canvas)} />
                    BG <input type="color" defaultValue='#40037c' onChange={e => changeBackGroundColor(e, canvas)} />
                    Stroke<input type="color" defaultValue='#ffffff' onChange={e => changeStrokeCurrentColor(e, canvas)} />
                    <button onClick={() => swapFaceandStrokeColors(canvas)}>Swap Face/Stroke Color</button>
                    Stroke/Brush width:
                    <input className='inputRangeStroke' onChange={e => onstrokeSizeChange(e)} type="range" id='strokeSizeOSD' min='0' max='50' step='1' defaultValue='1' /> {strokeWidth}
                </div>
                <div style={{ display: 'flex' }}>
                    <div  >
                        <table border='1' width='220'>
                            <tbody>
                                <tr><td colSpan='2'><b> Shadow: </b>color <input type="color" defaultValue='#000000' onChange={e => changeShadowCurrentColor(e, canvas)} /></td></tr>
                                <tr><td colSpan='2'>affectStroke<input type="checkbox" onChange={(e) => affectStroke(e)} defaultChecked={false} /></td></tr>
                                <tr><td>Blur</td><td> <input className='inputRange' onChange={e => onBlurSizeChange(e)} type="range" min='0' max='100' step='1' defaultValue='30' /> </td></tr>
                                <tr><td>offsetX</td><td> <input className='inputRange' onChange={e => onoffsetXChange(e)} type="range" min='-400' max='400' step='1' defaultValue='0' /></td></tr>
                                <tr><td> offsetY</td><td><input className='inputRange' onChange={e => onoffsetYChange(e)} type="range" min='-200' max='200' step='1' defaultValue='0' /></td></tr>
                                <tr><td><button onClick={() => setasClipPath(canvas)}>SetAsCipPath</button></td><td><button onClick={() => cliptoPath(canvas)}>Clip to Path</button></td></tr>

                            </tbody>
                        </table>
                    </div>
                    <div  >
                        <table border='1' width='255' style={{ minWidth: 255, maxWidth: 255 }}>
                            <tbody>

                                <tr><td>SkewX:</td><td> <input className='inputRange' onChange={e => onSkewXSizeChange(e)} type="range" min='-60' max='60' step='1' value={skewXSize} /><button onClick={() => {
                                    setSkewXSize(0);
                                    canvas.getActiveObjects().forEach(item => item.skewX = 0)
                                    canvas.requestRenderAll();
                                }}>R</button>{skewXSize}</td></tr>
                                <tr><td>SkewY:</td><td> <input className='inputRange' onChange={e => onSkewYSizeChange(e)} type="range" min='-60' max='60' step='1' value={skewYSize} /><button onClick={() => {
                                    setSkewYSize(0);
                                    canvas.getActiveObjects().forEach(item => item.skewY = 0)
                                    canvas.requestRenderAll();
                                }}>R</button>{skewYSize}</td></tr>
                                <tr><td >RX:</td><td>  <input className='inputRange' onChange={e => onRxSizeChange(e)} type="range" id='RX' min='-360' max='360' step='1' value={skewRX} /><button onClick={() => {
                                    setSkewRX(0);
                                    canvas.getActiveObjects().forEach(item => item.rx = 0)
                                    canvas.requestRenderAll();
                                }}>R</button>{skewRX}</td></tr>
                                <tr><td> RY:</td><td><input className='inputRange' onChange={e => onRySizeChange(e)} type="range" id='RY' min='-360' max='360' step='1' value={skewRY} /><button onClick={() => {
                                    setSkewRY(0);
                                    canvas.getActiveObjects().forEach(item => item.ry = 0)
                                    canvas.requestRenderAll();
                                }}>R</button>{skewRY}</td></tr>

                                <tr><td> cropX:</td><td><input className='inputRange' onChange={e => onCropX(e)} type="range" id='cropX' min='0' max='2360' step='1' value={cropX} /><button onClick={() => {
                                    setCropX(0);
                                    canvas.getActiveObjects().forEach(item => item.cropX = 0)
                                    canvas.requestRenderAll();
                                }}>R</button>{cropX}</td></tr>


                                <tr><td> cropY:</td><td><input className='inputRange' onChange={e => onCropY(e)} type="range" id='cropY' min='0' max='2360' step='1' value={cropY} /><button onClick={() => {
                                    setCropY(0);
                                    canvas.getActiveObjects().forEach(item => item.cropY = 0)
                                    canvas.requestRenderAll();
                                }}>R</button>{cropY}</td></tr>

                            </tbody>
                        </table>
                    </div>
                </div>

                <div className='drawingToolsRow' >
                    <b>Zoom and Pan: </b>
                    <button onClick={() => canvas.setZoom(1)}>Reset Zoom</button>
                    <button onClick={() => canvas.setViewportTransform([canvas.getZoom(), 0, 0, canvas.getZoom(), 0, 0])}>Reset Pan</button>
                    <button onClick={() => putat00(canvas)}>Select All and Put at 0 0</button>

                </div>
                <div className='drawingToolsRow' >
                    <b>Tools: </b>
                    <button onClick={() => alignAllLeft(canvas)}><FaAlignLeft /></button>
                    <button onClick={() => alignAllRight(canvas)}><FaAlignRight /></button>
                    <button onClick={() => alignAllTop(canvas)}><AiOutlineVerticalAlignTop /> <AiOutlineVerticalAlignTop /> </button>
                    <button onClick={() => alignAllButtom(canvas)}><AiOutlineVerticalAlignBottom /><AiOutlineVerticalAlignBottom /></button>
                    <button onClick={() => deleteSelectedItem(canvas)}><VscTrash /> Selected</button>
                    <button onClick={() => deleteAll(canvas)}><VscTrash />All</button>
                    <button onClick={() => lock(canvas)}><VscLock /></button>
                    <button onClick={() => unlockAll(canvas)}><VscUnlock />All</button>
                    <button onClick={() => undo(canvas)}>Undo</button>
                    <button onClick={() => redo(canvas)}>Redo</button>
                    <button onClick={() => copy(canvas)}>Copy</button>
                    <button onClick={() => paste(canvas)}>Paste</button>
                    <button onClick={() => selectAll(canvas)}>Select All</button>
                    <button onClick={() => deSelectAll(canvas)}>Deselect All</button>
                    <button onClick={() => sendToBack(canvas)}>Send To BK</button>
                    <button onClick={() => bringToFront(canvas)}>Bring to F</button>
                </div>

                <div className='drawingToolsRow' >
                    <b> Export Import: </b>
                    <button onClick={() => exportHTML1(canvas)}>To HTML</button>
                    <button onClick={() => exportPng(canvas)}>To PNG</button>
                    <button onClick={() => exportSVG(canvas)}>To SVG</button>
                    <button onClick={() => exportJSON(canvas)}>To JSON</button>

                    <br /> <span>Import SVG</span> <input type='file' className='input-file' accept='.xml,.svg' onChange={e => importSVG(e.target.files[0])} />
                    <br /> <span>Import JSON</span> <input type='file' className='input-file' accept='.json' onChange={e => importJSON(e.target.files[0], canvas)} />

                </div>

                <div className='drawingToolsRow' >
                    <button onClick={makeFullScreen}>Make full Screen</button>
                    <button onClick={removeBorder}>Remove Border</button>
                    <button onClick={removeCornerCurve}>Remove Border Curve</button>
                </div>

            </div>
            <div style={{ width: 380, backgroundColor: '#ddf0db' }}>
                <Tabs forceRenderTabPanel={true}>
                    <TabList>
                        <Tab>Save</Tab>
                        <Tab>Filter</Tab>
                        <Tab>CCG Tools</Tab>
                        <Tab>Images</Tab>
                        <Tab>Styles</Tab>
                    </TabList>
                    <TabPanel>
                        <SavePannel />
                    </TabPanel>
                    <TabPanel>
                        <ImageFilterController />
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
        </div >
    )
}

export default DrawingController
