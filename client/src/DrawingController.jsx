import React, { useEffect, useState } from 'react'

import axios from 'axios';
import { fabric } from "fabric";
import { endpoint } from './common'
import { useDispatch, useSelector } from 'react-redux'
import "fabric-history";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { VscPrimitiveSquare, VscCircleFilled, VscTriangleUp, VscLock, VscUnlock, VscTrash, VscMove } from "react-icons/vsc";
import { FaAlignLeft, FaAlignRight, FaSave, FaPlay, FaPause, FaStop } from "react-icons/fa";
import { GrResume } from 'react-icons/gr';
import { AiOutlineVerticalAlignTop, AiOutlineVerticalAlignBottom, AiOutlineRedo, AiOutlineUndo } from "react-icons/ai";
import { FiFile } from "react-icons/fi";
import { v4 as uuidv4 } from 'uuid';
import { saveAs } from 'file-saver';
import Tooltip from '@mui/material/Tooltip';

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

const options = {
    currentMode: "",
    currentColor: "#ffffff",
    currentFont: 'Arial',
    currentFontSize: 25,
    backgroundColor: "#50037c",
    // currentWidth: 5,
    group: {},
    stroke: '#ffffff',
    strokeWidth: 3,
};

export const shadowOptions = {
    color: 'black',
    blur: 30,
    offsetX: 0,
    offsetY: 0,
    affectStroke: false
};

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
                id: 'rectwithimg',
                rx: 30,
                objectCaching: false,
                shadow: shadowOptions,
                ry: 30
            });
            canvas.add(rect).setActiveObject(rect);

            rect.set({
                width: myImg.width, height: myImg.height, fill: new fabric.Pattern({ source: myImg, repeat: 'no-repeat' })
            });
            rect.set({ scaleX: 0.5, scaleY: 0.5 })
            canvas.renderAll();
        }
    });
}

const Upload = e => {
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
                })
                .scale(0.5);

            window.editor.canvas.add(image).setActiveObject(image);
        };
    };
    reader.readAsDataURL(e.target.files[0]);

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
    // circle.animate('left', 150, { onChange: canvas.renderAll.bind(canvas) })
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


export const undo = canvas => canvas.undo()
export const redo = canvas => canvas.redo()

export const setOpacity = (canvas, val = 0.5) => {
    canvas.getActiveObjects().forEach(element => element.set({ 'opacity': val }));
    canvas.requestRenderAll();
}
export const setOpacity1 = (canvas, e) => {
    canvas.getActiveObjects().forEach(element => element.set({ 'opacity': e.target.value }));
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

const changeCurrentColor = (e) => {
    options.currentColor = e.target.value;
    window.editor.canvas.getActiveObjects().forEach(item => item.fill = e.target.value)
    window.editor.canvas.requestRenderAll();
};

const changeBackGroundColor = (e) => {
    options.backgroundColor = e.target.value;
    window.editor.canvas.getActiveObjects().forEach(item => item.backgroundColor = e.target.value)
    window.editor.canvas.requestRenderAll();
}

const changeStrokeCurrentColor = e => {
    options.stroke = e.target.value;
    window.editor.canvas.freeDrawingBrush.color = e.target.value;
    window.editor.canvas.getActiveObjects().forEach(item => item.stroke = e.target.value)
    window.editor.canvas.requestRenderAll();
}

const changeShadowCurrentColor = e => {
    shadowOptions.color = e.target.value;
    window.editor.canvas.getActiveObjects().forEach(item => { if (item.shadow) { item.shadow.color = e.target.value } })
    window.editor.canvas.requestRenderAll();
}
const onBlurSizeChange = e => {
    shadowOptions.blur = e.target.value;
    window.editor.canvas.getActiveObjects().forEach(item => { if (item.shadow) { item.shadow.blur = e.target.value } })
    window.editor.canvas.requestRenderAll();
}
const onoffsetXChange = e => {
    shadowOptions.offsetX = e.target.value;
    window.editor.canvas.getActiveObjects().forEach(item => { if (item.shadow) { item.shadow.offsetX = e.target.value } })
    window.editor.canvas.requestRenderAll();
}

const onoffsetYChange = e => {
    shadowOptions.offsetY = e.target.value;
    window.editor.canvas.getActiveObjects().forEach(item => { if (item.shadow) { item.shadow.offsetY = e.target.value } })
    window.editor.canvas.requestRenderAll();
}
const affectStroke = e => {
    shadowOptions.affectStroke = e.target.checked;
    window.editor.canvas.getActiveObjects().forEach(item => { if (item.shadow) { item.shadow.affectStroke = e.target.checked } })
    window.editor.canvas.requestRenderAll();
}
const onstrokeSizeChange = e => {
    options.strokeWidth = parseInt(e.target.value);
    window.editor.canvas.freeDrawingBrush.width = parseInt(e.target.value);
    window.editor.canvas.getActiveObjects().forEach(item => item.strokeWidth = parseInt(e.target.value))
    window.editor.canvas.requestRenderAll();
}
const onSkewXSizeChange = e => {
    window.editor.canvas.getActiveObjects().forEach(item => item.skewX = parseInt(e.target.value))
    window.editor.canvas.requestRenderAll();
}
const onSkewYSizeChange = e => {
    window.editor.canvas.getActiveObjects().forEach(item => item.skewY = parseInt(e.target.value))
    window.editor.canvas.requestRenderAll();
}
const onRxSizeChange = e => {
    window.editor.canvas.getActiveObjects().forEach(item => {
        item.rx = parseInt(e.target.value)
    })
    window.editor.canvas.requestRenderAll();
}
const onRySizeChange = e => {
    window.editor.canvas.getActiveObjects().forEach(item => item.ry = parseInt(e.target.value))
    window.editor.canvas.requestRenderAll();
}
const putat00 = (canvas) => {
    // canvas.setZoom(1)
    canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
    selectAll(canvas);
    canvas.getActiveObject()?.set({ left: 0, top: 0 });
}
const alignAllLeft = () => {
    const arr = [];
    window.editor.canvas.getActiveObjects().forEach(item => {
        arr.push(item.left)
    })
    const min = Math.min(...arr);
    window.editor.canvas.getActiveObjects().forEach(item => {
        item.left = min;
    })
    window.editor.canvas.requestRenderAll();
}

const alignAllTop = () => {
    const arr = [];
    window.editor.canvas.getActiveObjects().forEach(item => {
        arr.push(item.top)
    })
    const min = Math.min(...arr);
    window.editor.canvas.getActiveObjects().forEach(item => {
        item.top = min;
    })
    window.editor.canvas.requestRenderAll();
}

const alignAllRight = () => {
    const arr = [];
    window.editor.canvas.getActiveObjects().forEach(item => {
        arr.push(item.left + (item.width * item.scaleX))
    })
    const max = Math.max(...arr);
    window.editor.canvas.getActiveObjects().forEach(item => {
        item.left = max - (item.width * item.scaleX);
    })
    window.editor.canvas.requestRenderAll();
}
const alignAllButtom = () => {
    const arr = [];
    window.editor.canvas.getActiveObjects().forEach(item => {
        arr.push(item.top + (item.height * item.scaleY))
    })
    const max = Math.max(...arr);
    window.editor.canvas.getActiveObjects().forEach(item => {
        item.top = max - (item.height * item.scaleY);
    })
    window.editor.canvas.requestRenderAll();
}
const onSizeChange = (e) => {
    options.currentFontSize = e.target.value
    window.editor.canvas.getActiveObjects().forEach(item => item.fontSize = e.target.value)
    window.editor.canvas.requestRenderAll();
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

export const savetoCasparcgStore = (layerNumber) => {
    var dd = window.editor.canvas.toJSON(['id'])
    const data = (JSON.stringify(dd)).replaceAll('"', String.fromCharCode(2)).replaceAll(' ', String.fromCharCode(3)).replaceAll('/', String.fromCharCode(4)).replaceAll('%', String.fromCharCode(5))

    endpoint(`mixer ${window.chNumber}-${layerNumber} fill 0 0 0 1 12 ${window.animationMethod}`)
    setTimeout(() => {
        endpoint(`call ${window.chNumber}-${layerNumber} store.dispatch({type:'CHANGE_CANVAS1',payload:'${data}'})`)
    }, 100);

    setTimeout(() => {
        endpoint(`call ${window.chNumber}-${layerNumber} ReadToCasparcgfromStore()`)
    }, 1000);
    setTimeout(() => {
        endpoint(`mixer ${window.chNumber}-${layerNumber} fill 0 0 1 1 12 ${window.animationMethod}`)
    }, 1100);
}

export const savetoCasparcgStoreClock = () => {
    var dd = window.editor.canvas.toJSON()
    const data = (JSON.stringify(dd)).replaceAll('"', String.fromCharCode(2)).replaceAll(' ', String.fromCharCode(3)).replaceAll('/', String.fromCharCode(4)).replaceAll('%', String.fromCharCode(5))
    endpoint(`call ${window.chNumber}-120 store.dispatch({type:'CHANGE_CANVAS1',payload:'${data}'})`)
    setTimeout(() => {
        endpoint(`mixer ${window.chNumber}-120 fill 0 0 0 1 12 ${window.animationMethod}`)
    }, 200);

    setTimeout(() => {
        endpoint(`call ${window.chNumber}-120 ReadToCasparcgfromStore()`)
    }, 680);
    setTimeout(() => {
        endpoint(`mixer ${window.chNumber}-120 fill 0 0 1 1 12 ${window.animationMethod}`)
    }, 700);
}


export const updatetoCasparcgStore = (layerNumber) => {
    var dd = window.editor.canvas.toJSON(['id'])
    const data = (JSON.stringify(dd)).replaceAll('"', String.fromCharCode(2)).replaceAll(' ', String.fromCharCode(3)).replaceAll('/', String.fromCharCode(4)).replaceAll('%', String.fromCharCode(5))
    endpoint(`call ${window.chNumber}-${layerNumber} store.dispatch({type:'CHANGE_CANVAS1',payload:'${data}'})`)

    setTimeout(() => {
        endpoint(`call ${window.chNumber}-${layerNumber} ReadToCasparcgfromStore()`)
    }, 200);

}
// const removeFromCaspar = (layerNumber) => {
//     endpoint(`mixer ${window.chNumber}-${layerNumber} fill 0 0 0 1 12 ${window.animationMethod}`)
// }

const changeText = (key, val) => {
    window.editor.canvas.getObjects().forEach((element) => {
        if (element.id === key) {
            element.set({ text: val.toString() })
            window.editor.canvas.requestRenderAll();
        }
    })
    endpoint(`call ${window.chNumber}-109 "window.editor.canvas.getObjects().forEach((element)=>{if(element.id==='${key}'){element.set({text:'${val}'});window.editor.canvas.requestRenderAll();}})"`)

}
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
export const copy = () => {
    window.editor.canvas.getActiveObject()?.clone(cloned => {
        _clipboard = cloned;
    }, ['id']);
}

export const paste = () => {
    try {


        _clipboard?.clone(clonedObj => {
            window.editor.canvas.discardActiveObject();
            clonedObj.set({
                left: clonedObj.left + 10,
                top: clonedObj.top + 10,
                evented: true,
                objectCaching: false,
            });
            if (clonedObj.type === 'activeSelection') {
                // active selection needs a reference to the canvas.
                clonedObj.canvas = window.editor.canvas;
                clonedObj.forEachObject(obj => {
                    window.editor.canvas.add(obj);
                });
                // this should solve the unselectability
                clonedObj.setCoords();
            } else {
                window.editor.canvas.add(clonedObj);
            }
            _clipboard.top += 10;
            _clipboard.left += 10;
            window.editor.canvas.setActiveObject(clonedObj);
            window.editor.canvas.requestRenderAll();
        }, ['id']);
    } catch (error) {
        alert(error)
    }
}

const DrawingController = ({ chNumber }) => {
    const [fontList, setFontList] = useState([
        'Helvetica',
        'Calibri',
        'Futura',
        'Garamond',
        'Times New Roman',
        'Arial',
        'Cambria',
        'Verdana',
        'Rockwell',
        'Franklin Gothic',
        'ARVO',
        'Gigi'
    ])

    const [currentFont, setCurrentFont] = useState('Arial')
    var ss = new Date().toLocaleTimeString('en-US', { year: "numeric", month: "numeric", day: "numeric", hour12: false, hour: "numeric", minute: "numeric", second: "numeric" });
    const [canvaslist, setCanvaslist] = useState([{ 'pageName': ss + '_pageName', 'pageValue': '' }])

    const [currentPage, setCurentPage] = useState(0)
    const [currentscreenSize, setCurrentscreenSize] = useState(1024)
    const [f0, setF0] = useState('Ganesh Tiwari');
    const [f1, setF1] = useState('Suresh Malhotra');
    const [f2, setF2] = useState('Mahesh prasad');
    const [onlineImageUrl, setOnlineImageUrl] = useState('https://fixthephoto.com/images/content/shirt-fabric-texture-471614080378.jpg')
    const [verticalSpeed, setVerticalSpeed] = useState(0.3)
    const [horizontalSpeed, setHorizontalSpeed] = useState(0.3)
    const [ltr, setLtr] = useState(false);

    const strokeLineCaps = ["butt", "round", "square"];
    const [currentstrokeLineCap, setCurrentstrokeLineCap] = useState('round');





    const [solidcaption1, setSolidcaption1] = useState('');
    const [solidcaption2, setSolidcaption2] = useState('');
    const [logo, setLogo] = useState('');
    const [locationBand, setLocationBand] = useState('');

    const [verticalScroll, setVerticalScroll] = useState('');
    const [horizontalScroll, setHorizontalScroll] = useState('');
    const [clock, setClock] = useState('');
    const [upTimer, setUpTimer] = useState('');
    const modes = ['Pencil', 'Spray', 'Erase', 'none'];

    const [currentMode, setCurrentMode] = useState('none');
    // window.currentMode = currentMode;

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

    const id = 'f0';

    const onFontChange = (e) => {
        options.currentFont = e.target.value;
        setCurrentFont(e.target.value);
        window.editor.canvas.getActiveObjects().forEach(item => item.fontFamily = e.target.value)
        window.editor.canvas.requestRenderAll();
    }
    const onstrokeLineCapChange = e => {
        window.editor.canvas.freeDrawingBrush.strokeLineCap = e.target.value;
        setCurrentstrokeLineCap(e.target.value);
    }

    const onDragEnd = (result) => {
        const aa = [...canvaslist]
        if (result.destination != null) {
            aa.splice(result.destination?.index, 0, aa.splice(result.source?.index, 1)[0])
            setCanvaslist(aa)
            if (currentPage === result.source?.index) {
                setCurentPage(result.destination?.index)
            }
            else if ((currentPage >= result.destination?.index) && (currentPage < result.source?.index)) {
                setCurentPage(currentPage => currentPage + 1)
            }
            else if ((currentPage <= result.destination?.index) && (currentPage > result.source?.index)) {
                setCurentPage(currentPage => currentPage - 1)
            }
        }
    }

    const drawingFileSave = () => {
        updatePage(window.editor.canvas);
        const element = document.createElement("a");
        var aa = ''
        canvaslist.forEach(val => {
            aa += JSON.stringify({ 'pageName': val.pageName, 'pageValue': val.pageValue }) + '\r\n'
        });
        const file = new Blob([aa], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        var ss
        if (currentFile === 'new') {
            ss = new Date().toLocaleTimeString('en-US', { year: "numeric", month: "numeric", day: "numeric", hour12: false, hour: "numeric", minute: "numeric", second: "numeric" });
        } else {
            ss = currentFile;
        }

        var retVal = prompt("Enter  file name to save : ", ss + "_FileName");
        if (retVal !== null) {
            element.download = retVal;
            document.body.appendChild(element); // Required for this to work in FireFox
            element.click();
        }
    }
    const drawingFileNew = () => {
        setCanvaslist([]);
    }

    let fileReader;
    const handleFileRead = (e) => {
        const content = fileReader.result;
        var aa = content.split('\r\n')
        aa.splice(-1)
        var bb = []
        aa.forEach(element => {
            var cc = JSON.parse(element)
            bb.push(cc)
        });
        setCanvaslist([...bb])
    };
    var currentFile = 'new';

    const handleFileChosen = (file) => {
        currentFile = file.name
        if (file) {
            setCurentPage('')
            fileReader = new FileReader();
            fileReader.onloadend = handleFileRead;
            fileReader.readAsText(file);
        }
    };

    const handleFileChosen2 = (file) => {
        if (file) {
            setCurentPage('')
            fileReader = new FileReader();
            fileReader.onloadend = handleFileRead2;
            fileReader.readAsText(file);
        }
    };
    const importJSON = (file, canvas) => {
        if (file) {
            // setCurentPage('')
            fileReader = new FileReader();
            fileReader.onloadend = () => handleFileReadJSON(canvas);
            fileReader.readAsText(file);
        }
    };

    const handleFileReadJSON = canvas => {
        const content = fileReader.result;
        canvas.loadFromJSON(content, canvas.renderAll.bind(canvas), function (o, object) {
        })

    };


    const handleFileRead2 = (e) => {
        const content = fileReader.result;
        var aa = content.split('\r\n')
        aa.splice(-1)
        var bb = [...canvaslist]
        aa.forEach(element => {
            var cc = JSON.parse(element)
            bb.push(cc)
        });
        setCanvaslist([...bb])
    };

    const onVerticalSpeedChange = (e) => {
        setVerticalSpeed(e.target.value)
        endpoint(`call ${window.chNumber}-110 "speed=${e.target.value}"`);
    }
    const onHorizontalSpeedChange = (e) => {
        setHorizontalSpeed(e.target.value)
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
                    window.editor.canvas.add(element);
                    element.objectCaching = false;
                    element.shadow = shadowOptions;
                });
            });
            window.editor.canvas.renderAll();
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


    const startVerticalScroll = (canvas) => {
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

    const startHorizontalScroll = (canvas) => {
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

    const startClock = (canvas) => {
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

        var cc=document.getElementsByTagName('tspan')[0];
        cc.textContent='';
        setInterval(function() {
            var ss1 = new Date().toLocaleTimeString('en-US', { hour12: false, hour: 'numeric', minute: 'numeric', second: 'numeric' });
         cc.textContent  =ss1;
          }, 1000);
        "`)
    }
    const startUpTimer = (canvas) => {
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
        var cc=document.getElementsByTagName('tspan')[0];
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
        // selectAll(canvas);
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

    const dispatch = useDispatch()
    // eslint-disable-next-line
    const canvasToJson = (canvas) => {
        dispatch({ type: 'CHANGE_CANVAS1', payload: (JSON.stringify(canvas.toJSON(['id']))) })
    };

    const state1 = useSelector(state => state.canvas1Reducer.aa)
    // eslint-disable-next-line
    const canvasFromJson = (canvas) => {
        var state2 = state1.replace(new RegExp('asdfgh', "g"), ' ')
        const data = JSON.parse(state2);
        canvas.loadFromJSON(data);
        canvas.requestRenderAll();
    };
    const recallPage = (json, canvas, i) => {
        setCurentPage(i)
        canvas.loadFromJSON(json, function () {
            const aa = canvas.getObjects();
            aa.forEach(element => {
                try {
                    element.set({ objectCaching: false })
                } catch (error) {
                    alert(error);
                    return;
                }
            });
            canvas.renderAll();
        });

    }
    const updatePage = (canvas) => {
        const updatedCanvasList = canvaslist.map((val, i) => {
            return (i === currentPage) ? { 'pageName': val.pageName, 'pageValue': canvas.toJSON(['id']) } : val;
        });
        setCanvaslist([...updatedCanvasList])
    }

    const updatePageName = e => {
        const updatedCanvasList = canvaslist.map((val, i) => {
            return (i === parseInt(e.target.getAttribute('key1'))) ? { 'pageName': e.target.innerText, 'pageValue': val.pageValue } : val;
        });
        setCanvaslist([...updatedCanvasList])
    }
    const onDoubleClickPageName = (event) => {
        event.preventDefault();
        var sel = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(event.target);
        sel.removeAllRanges();
        sel.addRange(range);
    }
    const deletePage = e => {
        if (currentPage > e.target.getAttribute('key1')) {
            setCurentPage(currentPage => currentPage - 1)
        }
        else if (currentPage === parseInt(e.target.getAttribute('key1'))) {
            setCurentPage(null)
        }
        const updatedCanvasList = canvaslist.filter((_, i) => {
            return (parseInt(e.target.getAttribute('key1')) !== i)
        });
        setCanvaslist([...updatedCanvasList])
    }
    useEffect(() => {
        setCurrentscreenSize(localStorage.getItem('RCC_currentscreenSize'))
        axios.post('http://localhost:8080/getfonts').then((aa) => {
            setFontList(aa.data)
        }).catch((aa) => { console.log('Error', aa) });
        return () => {
        }
    }, [])


    // useEffect(() => {
    //     const autoPageUpdate = setInterval((
    //     ) => {
    //         updatePage(window.editor?.canvas)
    //     }, 1000);
    //     return () => {
    //         clearInterval(autoPageUpdate)
    //     }
    // }, [])


    useEffect(() => {
        window.addEventListener('keydown', e => {
            // console.log(e.key);
            if (e.repeat) {
                return;
            }

            if (e.key === 'Delete') {
                window.editor.canvas.getActiveObjects().forEach(item => {
                    //  alert(item.type);
                    if (!((item.type === 'textbox') && item.isEditing)) { window.editor.canvas.remove(item); }
                });
            }
            if (e.ctrlKey && e.key === 'c') {
                const item = window.editor.canvas.getActiveObjects()[0];
                if (!((item?.type === 'textbox') && item?.isEditing)) { copy() }
            }
            if (e.ctrlKey && e.key === 'v') {
                const item = window.editor.canvas.getActiveObjects()[0];
                if (!((item?.type === 'textbox') && item?.isEditing)) { paste() }
            }
            if (e.ctrlKey && e.key === 'z') {
                window.editor.canvas.undo();
            }

        });
        return () => {
            window.removeEventListener('keydown', null)
        }
    }, [])

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: 475, backgroundColor: '#f4f0e7' }}>
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
                        startGraphics(window.editor.canvas, 108);
                        setSolidcaption1(canvaslist[currentPage]?.pageName);
                    }
                    }><FaPlay /></button>
                    <button onClick={() => updateGraphics(window.editor.canvas, 108)}>Update</button>
                    <button className='stopButton' onClick={() => {
                        stopGraphics(108);
                        setSolidcaption1('');

                    }} ><FaStop /></button>
                    <span> {solidcaption1} </span>
                </div>
                <div className='drawingToolsRow' >
                    <b> Solid Caption 2: </b>
                    <button onClick={() => {
                        startGraphics(window.editor.canvas, 109);
                        setSolidcaption2(canvaslist[currentPage]?.pageName);
                    }
                    }><FaPlay />  </button>  <button onClick={() => updateGraphics(window.editor.canvas, 109)}>Update</button>
                    <button className='stopButton' onClick={() => {
                        stopGraphics(109);
                        setSolidcaption2('');
                    }} ><FaStop /></button>
                    <span> {solidcaption2} </span>
                </div>

                <div className='drawingToolsRow' >
                    <b> Logo: </b>

                    <button onClick={() => {
                        startGraphics(window.editor.canvas, 215);
                        setLogo(canvaslist[currentPage]?.pageName);
                    }
                    }><FaPlay />  </button>
                    <button onClick={() => updateGraphics(window.editor.canvas, 215)}>Update</button>
                    <button className='stopButton' onClick={() => {
                        stopGraphics(215);
                        setLogo('');
                    }} ><FaStop /></button>
                    <span> {logo} </span>

                </div>
                <div className='drawingToolsRow' >
                    <b> Location Band: </b>
                    <button onClick={() => {
                        startGraphics(window.editor.canvas, 210);
                        setLocationBand(canvaslist[currentPage]?.pageName);
                    }
                    }><FaPlay />  </button>
                    <button onClick={() => updateGraphics(window.editor.canvas, 210)}>Update</button>
                    <button className='stopButton' onClick={() => {
                        stopGraphics(210);
                        setLocationBand('');
                    }} ><FaStop /></button>
                    <span> {locationBand} </span>
                </div>

                <div className='drawingToolsRow' >
                    <b> V Scroll: </b>  <button onClick={() => {
                        startVerticalScroll(window.editor?.canvas);
                        setVerticalScroll(canvaslist[currentPage]?.pageName)
                    }}><FaPlay /> </button>
                    <button onClick={() => endpoint(`call ${window.chNumber}-110 "speed=0"`)}><FaPause /></button>
                    <button onClick={() => endpoint(`call ${window.chNumber}-110 "speed=${verticalSpeed}"`)}> <GrResume /></button>
                    <button className='stopButton' onClick={() => {
                        endpoint(`stop ${window.chNumber}-110`);
                        setVerticalScroll('')
                    }} ><FaStop /></button>
                    Speed:<input style={{ width: '40px' }} onChange={e => onVerticalSpeedChange(e)} type="number" min='0' max='5' step='0.01' defaultValue='0.3' />

                    <button onClick={() => exportVerticalScrollAsHTML(window.editor.canvas)}>To HTML</button>
                    <span> {verticalScroll} </span>
                </div>
                <div className='drawingToolsRow' >
                    <b> H Scroll: </b>
                    <button onClick={() => {
                        startHorizontalScroll(window.editor?.canvas);
                        setHorizontalScroll(canvaslist[currentPage]?.pageName);
                    }}><FaPlay /></button>
                    <button onClick={() => endpoint(`call ${window.chNumber}-111 "speed=0"`)}> <FaPause /></button>
                    <button onClick={() => endpoint(`call ${window.chNumber}-111 "speed=${horizontalSpeed}"`)}> <GrResume /></button>
                    <button className='stopButton' onClick={() => {
                        endpoint(`stop ${window.chNumber}-111`);
                        setHorizontalScroll('');
                    }} ><FaStop /></button>
                    Speed:<input style={{ width: '40px' }} onChange={e => onHorizontalSpeedChange(e)} type="number" min='0' max='5' step='0.01' defaultValue='0.3' />
                    <button onClick={() => exportHorizontalScrollAsHTML(window.editor.canvas)}>To HTML</button>
                    <br /> <span> Left to Right:</span>  <input type="checkbox" value={ltr} onChange={e => setLtr(val => !val)} />
                    <span> {horizontalScroll} </span>
                </div>
                <div className='drawingToolsRow' >
                    <b>Clock: </b>
                    <button onClick={() => addClock(window.editor.canvas)}>Add to Preview</button>
                    <button onClick={() => {
                        startClock(window.editor.canvas);
                        setClock(canvaslist[currentPage]?.pageName);
                    }}><FaPlay /></button>
                    <button className='stopButton' onClick={() => {
                        endpoint(`stop ${window.chNumber}-112`);
                        setClock('');
                    }} ><FaStop /></button>
                    <button onClick={() => exportClockAsHTML(window.editor.canvas)}>To HTML</button>
                    <span> {clock} </span>
                </div>
                <div className='drawingToolsRow' >
                    <b>Count Up Timer: </b>
                    <button onClick={() => addUpTimer(window.editor.canvas)}>Add to Preview</button>
                    <button onClick={() => {
                        startUpTimer(window.editor.canvas);
                        setUpTimer(canvaslist[currentPage]?.pageName);
                    }}><FaPlay /></button>
                    <button className='stopButton' onClick={() => {
                        endpoint(`stop ${window.chNumber}-115`);
                        setUpTimer('');
                    }} ><FaStop /></button>
                    <button onClick={() => exportUpTimerAsHTML(window.editor.canvas)}>To HTML</button>
                    <span> {upTimer} </span>
                </div>
                <div className='drawingToolsRow' >
                    <b> Drawing Elements: </b>
                    <button onClick={() => createRect(window.editor.canvas)}> <VscPrimitiveSquare /></button>
                    <Tooltip title="MutliLine Text Box"><button onClick={() => createTextBox(window.editor.canvas)}>TB</button></Tooltip>
                    <Tooltip title="Single Line Text Box"><button onClick={() => createIText(window.editor.canvas)}>IT</button></Tooltip>
                    <Tooltip title="Single Line Text Box Not Editable"><button onClick={() => createText(window.editor.canvas)}>T</button></Tooltip>
                    <button onClick={() => createCircle(window.editor?.canvas)}>  <VscCircleFilled /></button>
                    <button onClick={() => createTriangle(window.editor.canvas)}><VscTriangleUp /></button>
                    <button onClick={() => createEllipse(window.editor.canvas)}>Ellipse</button>
                    <button onClick={() => createLine(window.editor.canvas)}>Line</button>


                </div>
                <div className='drawingToolsRow' >
                    <b>Opacity: </b><input className='inputRange' onChange={e => setOpacity1(window.editor.canvas, e)} type="range" min='0' max='1' step='0.1' defaultValue='1' />
                </div>
                <div className='drawingToolsRow' >
                    <b> Font: </b>
                    Name:  <select onChange={e => onFontChange(e)} value={currentFont}>
                        {fontList.map((val) => { return <option key={uuidv4()} value={val}>{val}</option> })}
                    </select>
                    <br />  Size<input className='inputRange' onChange={e => onSizeChange(e)} type="range" min='0' max='100' step='1' defaultValue='25' />
                </div>
                <div className='drawingToolsRow' >
                    <b> Free Drawing: </b>
                    Type:  <select onChange={e => onDrawingModeChange(e.target.value, window.editor.canvas)} value={currentMode}>
                        {modes.map((val) => { return <option key={uuidv4()} value={val}>{val}</option> })}
                    </select>

                    End:  <select onChange={e => onstrokeLineCapChange(e)} value={currentstrokeLineCap}>
                        {strokeLineCaps.map((val) => { return <option key={uuidv4()} value={val}>{val}</option> })}
                    </select>
                </div>

                <div className='drawingToolsRow' >
                    <b> Colors: </b>
                    Fill <input type="color" defaultValue='#ffffff' onChange={e => changeCurrentColor(e)} />
                    BG <input type="color" defaultValue='#40037c' onChange={e => changeBackGroundColor(e)} />
                    Stroke<input type="color" defaultValue='#ffffff' onChange={e => changeStrokeCurrentColor(e)} />
                    <button onClick={() => swapFaceandStrokeColors(window.editor.canvas)}>Swap Face/Stroke Color</button>
                    Stroke/Brush width:
                    <input className='inputRange' onChange={e => onstrokeSizeChange(e)} type="range" id='strokeSizeOSD' min='0' max='100' step='1' defaultValue='3' />
                </div>
                <div style={{ display: 'flex' }}>
                    <div  >
                        <table border='1'>
                            <tbody>
                                <tr><td> <b> Shadow: </b></td><td>color <input type="color" defaultValue='#000000' onChange={e => changeShadowCurrentColor(e)} />   </td></tr>
                                <tr><td>affectStroke</td><td><input type="checkbox" onChange={(e) => affectStroke(e)} /></td></tr>
                                <tr><td>Blur</td><td> <input className='inputRange' onChange={e => onBlurSizeChange(e)} type="range" min='0' max='100' step='1' defaultValue='30' /> </td></tr>
                                <tr><td>offsetX</td><td> <input className='inputRange' onChange={e => onoffsetXChange(e)} type="range" min='-400' max='400' step='1' defaultValue='0' /></td></tr>
                                <tr><td> offsetY</td><td><input className='inputRange' onChange={e => onoffsetYChange(e)} type="range" min='-200' max='200' step='1' defaultValue='0' /></td></tr>
                            </tbody>
                        </table>
                    </div>

                    <div  >

                        <table border='1'>
                            <tbody>
                                <tr><td colSpan='2'> <b> Skew: </b></td></tr>
                                <tr><td>SkewX:</td><td> <input className='inputRange' onChange={e => onSkewXSizeChange(e)} type="range" id='skewX' min='-60' max='60' step='1' defaultValue='0' /></td></tr>
                                <tr><td>SkewY:</td><td> <input className='inputRange' onChange={e => onSkewYSizeChange(e)} type="range" id='skewY' min='-60' max='60' step='1' defaultValue='0' /></td></tr>
                                <tr><td>RX:</td><td>  <input className='inputRange' onChange={e => onRxSizeChange(e)} type="range" id='RX' min='-360' max='360' step='1' defaultValue='30' />   </td></tr>
                                <tr><td> RY:</td><td><input className='inputRange' onChange={e => onRySizeChange(e)} type="range" id='RY' min='-360' max='360' step='1' defaultValue='30' /></td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>



                <div className='drawingToolsRow' >
                    <b>Zoom and Pan: </b>
                    <button onClick={() => window.editor.canvas.setZoom(1)}>Reset Zoom</button>
                    <button onClick={() => window.editor.canvas.setViewportTransform([window.editor.canvas.getZoom(), 0, 0, window.editor.canvas.getZoom(), 0, 0])}>Reset Pan</button>
                    <button onClick={() => putat00(window.editor.canvas)}>Select All and Put at 0 0</button>

                </div>
                <div className='drawingToolsRow' >
                    <b>Tools: </b>
                    <button onClick={() => alignAllLeft()}><FaAlignLeft /></button>
                    <button onClick={() => alignAllRight()}><FaAlignRight /></button>
                    <button onClick={() => alignAllTop()}><AiOutlineVerticalAlignTop /> <AiOutlineVerticalAlignTop /> </button>
                    <button onClick={() => alignAllButtom()}><AiOutlineVerticalAlignBottom /><AiOutlineVerticalAlignBottom /></button>
                    <button onClick={() => deleteSelectedItem(window.editor.canvas)}><VscTrash /> Selected</button>
                    <button onClick={() => deleteAll(window.editor.canvas)}><VscTrash /> All</button>
                    <button onClick={() => lock(window.editor.canvas)}><VscLock /></button>
                    <button onClick={() => unlockAll(window.editor.canvas)}><VscUnlock /> All</button>
                    <button onClick={() => undo(window.editor.canvas)}><AiOutlineUndo /> Undo</button>
                    <button onClick={() => redo(window.editor.canvas)}><AiOutlineRedo /> Redo</button>
                    <button onClick={() => copy(window.editor.canvas)}> Copy</button>
                    <button onClick={() => paste(window.editor.canvas)}> Paste</button>
                    <button onClick={() => selectAll(window.editor.canvas)}> Select All</button>
                    <button onClick={() => deSelectAll(window.editor.canvas)}> Deselect All</button>

                    <button onClick={() => sendToBack(window.editor.canvas)}> Send To Back</button>
                    <button onClick={() => bringToFront(window.editor.canvas)}> Bring To Front</button>

                </div>


                <div className='drawingToolsRow' >
                    <b> Image from URL: </b>
                    <input onChange={(e) => setOnlineImageUrl(e.target.value)} size="55" type='text' defaultValue={onlineImageUrl}></input>
                    <button onClick={() => addRoundedCornerImage(window.editor.canvas, onlineImageUrl)}>Add</button>
                </div>
                <div className='drawingToolsRow' >
                    <b> Image from Local PC: </b>
                    <input type="file" accept="image/*" onChange={e => Upload(e)} />
                </div>
                <div className='drawingToolsRow' >
                    <b> Export Import: </b>
                    <button onClick={() => exportHTML1(window.editor.canvas)}>To HTML</button>
                    <button onClick={() => exportPng(window.editor.canvas)}>To PNG</button>
                    <button onClick={() => exportSVG(window.editor.canvas)}>To SVG</button>
                    <button onClick={() => exportJSON(window.editor.canvas)}>To JSON</button>

                    <br /> <span>Import SVG</span> <input type='file' className='input-file' accept='.xml,.svg' onChange={e => importSVG(e.target.files[0])} />
                    <br /> <span>Import JSON</span> <input type='file' className='input-file' accept='.json' onChange={e => importJSON(e.target.files[0], window.editor.canvas)} />

                </div>
                <div className='drawingToolsRow' >
                    <button onClick={() => setasClipPath(window.editor.canvas)}>Set as CipPath</button>
                    <button onClick={() => cliptoPath(window.editor.canvas)}>Clip to Path</button>
                </div>
                <div style={{ display: 'none' }}>
                    <input type='text' size="10" onChange={(e) => setF0(e.target.value)} value={f0}></input>   <button onClick={() => changeText(id, f0)}>Update {id} value</button> <br />
                    <input type='text' size="10" onChange={(e) => setF1(e.target.value)} value={f1}></input>   <button onClick={() => changeText(id, f1)}>Update {id} value</button><br />
                    <input type='text' size="10" onChange={(e) => setF2(e.target.value)} value={f2}></input>   <button onClick={() => changeText(id, f2)}>Update {id} value</button><br />
                </div>
            </div>
            <div style={{ width: 400, backgroundColor: '#ddf0db' }}>
                <div>
                    <div className='drawingToolsRow' >
                        <b> Save: </b>
                        <button onClick={() => drawingFileNew(window.editor.canvas)}>File New <FiFile /></button>
                        <button onClick={() => drawingFileSave(window.editor.canvas)}>File Save <FaSave /></button><br />
                    </div>
                    <div className='drawingToolsRow' >
                        <span>Open File:</span>  <input
                            type='file'
                            id='file'
                            className='input-file'
                            accept='.txt'
                            onChange={e => handleFileChosen(e.target.files[0])}
                        /><br />
                    </div>
                    <div className='drawingToolsRow' >
                        <span>Add File:</span>  <input
                            type='file'
                            id='file'
                            className='input-file'
                            accept='.txt'
                            onChange={e => handleFileChosen2(e.target.files[0])}
                        /><br />
                    </div>
                    <div className='drawingToolsRow' >

                        <b> Pages: </b>
                        <button onClick={() => {
                            var ss = new Date().toLocaleTimeString('en-US', { year: "numeric", month: "numeric", day: "numeric", hour12: false, hour: "numeric", minute: "numeric", second: "numeric" });
                            var retVal = prompt("Enter  page name to save : ", ss + "_pageName");
                            if (retVal !== null) {
                                deleteAll(window.editor?.canvas);
                                setCanvaslist([...canvaslist, { 'pageName': retVal, 'pageValue': `${JSON.stringify((window.editor?.canvas.toJSON(['id'])))}` }]);

                                setCurentPage(canvaslist.length)
                            }
                        }}
                        > Add Blank Page</button>

                        <button onClick={() => {
                            var ss = new Date().toLocaleTimeString('en-US', { year: "numeric", month: "numeric", day: "numeric", hour12: false, hour: "numeric", minute: "numeric", second: "numeric" });
                            var retVal = prompt("Enter  page name to save : ", ss + "_pageName");
                            if (retVal !== null) {
                                setCanvaslist([...canvaslist, { 'pageName': retVal, 'pageValue': `${JSON.stringify((window.editor?.canvas.toJSON(['id'])))}` }]);
                                setCurentPage(canvaslist.length)
                            }
                        }}

                        ><FaSave /> in New Page</button>

                        <button onClick={() => updatePage(window.editor?.canvas)}>Update Page</button>
                    </div>
                </div>
                <div style={{ height: 800, width: 400, overflow: 'scroll', border: '1px solid black' }}>

                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="droppable-1" type="PERSON">
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    style={{ backgroundColor: snapshot.isDraggingOver ? 'yellow' : 'yellowgreen' }}
                                    {...provided.droppableProps}
                                >
                                    <table border='1'>
                                        <tbody>
                                            {canvaslist.map((val, i) => {
                                                return (
                                                    <Draggable draggableId={"draggable" + i} key={val + i} index={i}>
                                                        {(provided, snapshot) => (
                                                            <tr
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                style={{
                                                                    ...provided.draggableProps.style,
                                                                    backgroundColor: snapshot.isDragging ? 'red' : 'white',
                                                                    boxShadow: snapshot.isDragging ? "0 0 .4rem #666" : "none",
                                                                    // margin: '10px'
                                                                }}
                                                            >
                                                                <td {...provided.dragHandleProps}><VscMove /></td><td style={{ minWidth: '300px', backgroundColor: currentPage === i ? 'green' : 'white', color: currentPage === i ? 'white' : 'black' }} onClick={(e) => {
                                                                    recallPage(val.pageValue, window.editor.canvas, i);
                                                                }} key1={i} key2={'vimlesh'} onDoubleClick={onDoubleClickPageName} suppressContentEditableWarning={true} contentEditable onMouseOut={updatePageName}>{val.pageName}</td><td><button key1={i} onClick={(e) => deletePage(e)}>  <VscTrash style={{ pointerEvents: 'none' }} /></button ></td>
                                                            </tr>
                                                        )
                                                        }
                                                    </Draggable>
                                                )
                                            })}
                                            {provided.placeholder}
                                        </tbody>
                                    </table>

                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
                Current Page:  {canvaslist[currentPage]?.pageName}
            </div>
        </div >
    )
}

export default DrawingController
