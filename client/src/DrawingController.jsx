import React, { useEffect, useRef, useState } from 'react'

import axios from 'axios';
import { fabric } from "fabric";
import { endpoint, fontLists, stopGraphics, updateGraphics, templateLayers } from './common'
import { useSelector, useDispatch } from 'react-redux'
import "fabric-history";
import { VscPrimitiveSquare, VscCircleFilled, VscTriangleUp, VscLock, VscUnlock, VscTrash } from "react-icons/vsc";
import { FaAlignLeft, FaAlignRight, FaPlay, FaPause, FaStop } from "react-icons/fa";
import { GrResume } from 'react-icons/gr';
import { AiOutlineVerticalAlignTop, AiOutlineVerticalAlignBottom } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';
import { saveAs } from 'file-saver';
import SavePannel from './SavePannel';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ImageFilterController from './ImageFilterController';
import CasparcgTools from './CasparcgTools';
import Images from './Images';
import SavedStyles from './SavedStyles';
import { animation } from './animation.js'

import { options, shadowOptions, changeCurrentColor, changeBackGroundColor, changeStrokeCurrentColor, changeShadowCurrentColor } from './common'
var xxx;
var html;

fabric.Object.prototype.noScaleCache = false;
const STEP = 5;
var Direction = {
    LEFT: 0,
    UP: 1,
    RIGHT: 2,
    DOWN: 3
};




fabric.util.addListener(document.body, 'keydown', function (options) {
    if (options.target.nodeName === 'BODY') {
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

        //--------------
        if (options.repeat) {
            return;
        }

        if (options.key === 'Delete') {
            window.editor.canvas?.getActiveObjects().forEach(item => {
                //  alert(item.type);
                if (!((item.type === 'textbox') && item.isEditing)) {
                    window.editor.canvas?.remove(item);
                    window.editor.canvas?.discardActiveObject();
                    window.editor.canvas?.requestRenderAll();
                }
            });
        }
        if (options.ctrlKey && options.key.toLowerCase() === 'c') {
            const item = window.editor.canvas?.getActiveObjects()[0];
            if (!((item?.type === 'textbox') && item?.isEditing)) { copy(window.editor.canvas) }
        }
        if (options.ctrlKey && options.key.toLowerCase() === 'v') {
            const item = window.editor.canvas?.getActiveObjects()[0];
            if (!((item?.type === 'textbox') && item?.isEditing)) { paste(window.editor.canvas) }
        }
        if (options.ctrlKey && options.key.toLowerCase() === 'z') {
            // window.editor.canvas?.undo();
            window.editor.canvas && undo(window.editor.canvas)
        }
        if (options.ctrlKey && options.key.toLowerCase() === 'r') {
            options.preventDefault();
            window.editor.canvas && redo(window.editor.canvas)
        }
        if (options.ctrlKey && options.key.toLowerCase() === 'a') {
            options.preventDefault();
            selectAll(window.editor.canvas);
        }
    }
})




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
        group.set({
            id: 'id_' + uuidv4(),
            absolutePositioned: true
        });
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

    const text = new fabric.Text("अगला प्रशिक्षण 06 जून 2022 से है| Next Training is from 06 Jun 2022.", {
        id: 'ccg_' + uuidv4(),
        shadow: shadowOptions,
        left: 100,
        top: 0,
        width: 480,
        fill: options.currentColor,
        fontFamily: options.currentFont,
        fontWeight: 'bold',
        fontSize: options.currentFontSize,
        editable: true,
        objectCaching: false,
        textAlign: 'left',
        stroke: options.stroke,
        strokeWidth: options.strokeWidth,
    });
    canvas.add(text).setActiveObject(text);
    canvas.renderAll();
    text.animate('top', 243, { onChange: canvas.renderAll.bind(canvas) })
};
export const createIText = (canvas) => {

    const text = new fabric.IText("अगला प्रशिक्षण 06 जून 2022 से है| Next Training is from 06 Jun 2022.", {
        shadow: shadowOptions,
        id: 'ccg_' + uuidv4(),
        left: 100,
        top: 0,
        width: 480,
        fill: options.currentColor,
        fontFamily: options.currentFont,
        fontWeight: 'bold',
        fontSize: options.currentFontSize,
        editable: true,
        objectCaching: false,
        textAlign: 'left',
        stroke: options.stroke,
        strokeWidth: options.strokeWidth,

    });
    canvas.add(text).setActiveObject(text);
    canvas.renderAll();
    text.animate('top', 343, { onChange: canvas.renderAll.bind(canvas) })
};


export const createTextBox = (canvas) => {

    const text = new fabric.Textbox("अगला प्रशिक्षण Next Training", {
        shadow: shadowOptions,
        id: 'ccg_' + uuidv4(),
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
    text.animate('top', 455, { onChange: canvas.renderAll.bind(canvas) })
};

export const addRoundedCornerImage = (canvas, imageName1) => {

    fabric.util.loadImage(imageName1, myImg => {
        // fabric.Image.fromURL(imageName1,  myImg => {
        if (myImg == null) {
            alert("Error!");
        } else {
            var rect = new fabric.Rect({
                id: 'ccg_' + uuidv4(),
                left: 10,
                top: 10,
                stroke: 'red',
                strokeWidth: 3,
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
                        id: 'ccg_' + uuidv4(),
                        left: 10,
                        top: 10,
                        shadow: shadowOptions,
                        stroke: 'white',
                        strokeWidth: 3,
                        strokeUniform: true,
                        objectCaching: false,
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
const gradient2 = () => {
    return new fabric.Gradient({
        type: 'linear',
        gradientUnits: 'percentage',
        coords: { x1: 0, y1: 0, x2: 0, y2: 1 },
        colorStops: [
            { offset: 0, color: 'black' },
            { offset: 0.5, color: `hsl(${Math.floor(Math.random() * 360 + 1)}, 100%, 50%)` },
            { offset: 1, color: 'black' }
        ]
    })
}
export const createRect = (canvas) => {
    const rect = new fabric.Rect({
        id: 'id_' + uuidv4(),
        shadow: shadowOptions,
        top: -100,
        left: 90,
        width: 500,
        height: 80,
        opacity: 0.9,
        fill: gradient2(),
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
        id: 'id_' + uuidv4(),
        shadow: shadowOptions,
        top: -100,
        left: 180,
        rx: 50,
        ry: 80,
        opacity: 0.9,
        fill: '#0000ff',
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
    const rect = new fabric.Polygon([{ x: 290, y: 124 }, { x: 390, y: 190 }, { x: 354, y: 297 }, { x: 226, y: 297 }, { x: 192, y: 190 }], {
        id: 'id_' + uuidv4(),
        shadow: shadowOptions,
        top: -100,
        left: 80,
        rx: 50,
        ry: 80,
        opacity: 0.9,
        fill: '#0000ff',
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

// export const createHexagon = (canvas) => {
//     const rect = new fabric.Polygon([{ x: 207, y: 120 }, { x: 307, y: 60 }, { x: 407, y: 120 }, { x: 407, y: 220 }, { x: 307, y: 280 }, { x: 207, y: 220 }], {
//         id: 'id_' + uuidv4(),
//         shadow: shadowOptions,
//         top: -100,
//         left: 300,
//         rx: 50,
//         ry: 80,
//         opacity: 0.9,
//         fill: '#00ff00',
//         hasRotatingPoint: true,
//         objectCaching: false,
//         stroke: options.stroke,
//         strokeWidth: 3,
//         strokeUniform: true,
//     });
//     canvas.add(rect).setActiveObject(rect);
//     canvas.requestRenderAll();
//     rect.animate('top', 330, { onChange: canvas.renderAll.bind(canvas) })
// };

export const createLine = (canvas) => {
    const rect = new fabric.Line([500, 450, 800, 450.00001], {
        id: 'id_' + uuidv4(),
        shadow: { ...shadowOptions, Blur: 10 },
        top: -100,
        left: 90,
        height: 1,
        opacity: 0.9,
        fill: '#0000ff',
        hasRotatingPoint: true,
        objectCaching: false,
        stroke: '#0000ff',
        strokeWidth: 3,
        strokeUniform: true,
    });
    canvas.add(rect).setActiveObject(rect);
    canvas.requestRenderAll();
    rect.animate('top', 230, { onChange: canvas.renderAll.bind(canvas) })
};

export const createCircle = (canvas) => {
    const circle = new fabric.Circle({
        id: 'id_' + uuidv4(),
        shadow: shadowOptions,
        top: 0,
        left: 0,
        radius: 50,
        fill: '#0000ff',
        cornerSize: 7,
        objectCaching: false,
        hasRotatingPoint: true,
        stroke: options.stroke,
        strokeWidth: 3,
        strokeUniform: true,
    });

    canvas.add(circle).setActiveObject(circle);
    // circle.onSelect(e=>console.log(e))
    canvas.requestRenderAll();
    circle.animate('left', 150, { onChange: canvas.renderAll.bind(canvas) })
};

export const createTriangle = (canvas) => {
    canvas.isDrawingMode = false;
    const triangle = new fabric.Triangle({
        id: 'id_' + uuidv4(),
        shadow: shadowOptions,
        top: 50,
        left: -100,
        width: 100,
        height: 100,
        fill: '#ff00ff',
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
    canvas.getActiveObjects().forEach(element => { element.set('fontStyle', (element.fontStyle === 'italic') ? '' : 'italic') });
    canvas.requestRenderAll();
};
export const txtBold = canvas => {
    canvas.getActiveObjects().forEach(element => { element.set('fontWeight', (element.fontWeight === 'normal') ? 'bold' : 'normal') });
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
    canvas.undo()
    canvas.getObjects().forEach(element => {
        element.set({ 'objectCaching': false }
        )
    });
    canvas.requestRenderAll();
}

export const redo = canvas => {
    canvas.redo();
    canvas.getObjects().forEach(element => {
        element.set({ 'objectCaching': false }
        )
    });
    canvas.requestRenderAll();
}

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
    canvas.forEachObject(element => element.selectable = true);
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
                    id: 'ccg_' + uuidv4(),
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


const putatCenter = (canvas) => {
    canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
    selectAll(canvas);
    canvas.centerObject(canvas.getActiveObject());
    canvas.requestRenderAll();
}
const selectedatCenter = (canvas) => {
    canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
    const selectedItems = canvas.getActiveObjects();
    canvas.discardActiveObject();
    selectedItems.forEach(item => item.center());
    var sel = new fabric.ActiveSelection(selectedItems, { canvas: canvas, });
    canvas.setActiveObject(sel);
    canvas.requestRenderAll();
}
const selectedatCenterH = (canvas) => {
    canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
    const selectedItems = canvas.getActiveObjects();
    canvas.discardActiveObject();
    selectedItems.forEach(item => item.centerH());
    var sel = new fabric.ActiveSelection(selectedItems, { canvas: canvas, });
    canvas.setActiveObject(sel);
    canvas.requestRenderAll();
}

const selectedatCenterV = (canvas) => {
    canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
    const selectedItems = canvas.getActiveObjects();
    canvas.discardActiveObject();
    selectedItems.forEach(item => item.centerV());
    var sel = new fabric.ActiveSelection(selectedItems, { canvas: canvas, });
    canvas.setActiveObject(sel);
    canvas.requestRenderAll();
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
    }
    else {
        if (!canvas.getActiveObject()) {
            return;
        }
        if (canvas.getActiveObject().type !== 'group') {
            return;
        }
        canvas.getActiveObject().toActiveSelection();//ungroup
        canvas.forEachObject(element => element.set({ objectCaching: false, shadow: shadowOptions }));
    }
    canvas.requestRenderAll();
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
                id: 'id_' + uuidv4(),
            });
            if (clonedObj.type === 'activeSelection') {
                // active selection needs a reference to the canvas.
                clonedObj.canvas = canvas;
                clonedObj.forEachObject(obj => {

                    canvas?.add(obj);
                    obj.set({
                        evented: true,
                        objectCaching: false,
                        id: 'id_' + uuidv4(),
                    });
                });
                // this should solve the unselectability
                clonedObj.setCoords();
            } else {
                canvas?.add(clonedObj);
            }



            _clipboard.top += 10;
            _clipboard.left += 10;
            canvas?.setActiveObject(clonedObj);
            clonedObj.on('mousedblclick', () => {
                window.edit();
            })
            canvas?.requestRenderAll();
        }, ['id']);
    } catch (error) {
        // alert(error)
    }
}
export const createShape = (canvas, shape, size = 0.4) => {

    const rect = new fabric.Path(shape, {
        id: 'id_' + uuidv4(),
        shadow: shadowOptions,
        top: -100,
        left: (Math.random()) * 1000,
        scaleX: size,
        scaleY: size,
        opacity: 0.9,
        fill: gradient2(),
        objectCaching: false,
        stroke: options.stroke,
        strokeWidth: 2,

    });
    canvas.add(rect).setActiveObject(rect);
    rect.on('mousedblclick', () => {
        window.edit();
    })
    canvas.requestRenderAll();
    rect.animate('top', (Math.random()) * 500, { onChange: canvas.renderAll.bind(canvas) })
}

const DrawingController = () => {
    const refStrokeColor = useRef();
    const refFillColor = useRef();
    const refBgColor = useRef();

    const refShadowColor = useRef();
    const refAffectStroke = useRef(false);
    const refBlur = useRef();
    const refOffsetX = useRef();
    const refOffsetY = useRef();



    const [fontList, setFontList] = useState(fontLists);
    const [currentFont, setCurrentFont] = useState('Arial')
    const canvas = useSelector(state => state.canvasReducer.canvas);

    const canvasList = useSelector(state => state.canvasListReducer.canvasList);

    const currentPage = useSelector(state => state.currentPageReducer.currentPage);
    const currentscreenSize = useSelector(state => state.currentscreenSizeReducer.currentscreenSize);

    const jsfilename = useSelector(state => state.jsfilenameReducer.jsfilename);
    const cssfilename = useSelector(state => state.cssfilenameReducer.cssfilename);

    const [verticalSpeed, setVerticalSpeed] = useState(0.3)
    const [horizontalSpeed, setHorizontalSpeed] = useState(0.3)
    const [horizontalSpeed2, setHorizontalSpeed2] = useState(0.3)
    const [ltr, setLtr] = useState(false);
    const [ltr2, setLtr2] = useState(false);

    const strokeLineCaps = ["butt", "round", "square"];
    const [currentstrokeLineCap, setCurrentstrokeLineCap] = useState('round');

    const [solidcaption2, setSolidcaption2] = useState('');
    const [solidcaption3, setSolidcaption3] = useState('');
    const [logo, setLogo] = useState('');
    const [locationBand, setLocationBand] = useState('');

    const [verticalScroll, setVerticalScroll] = useState('');
    const [horizontalScroll, setHorizontalScroll] = useState('');
    const [horizontalScroll2, setHorizontalScroll2] = useState('');
    const [clock, setClock] = useState('');
    const [upTimer, setUpTimer] = useState('');
    const modes = ['Pencil', 'Spray', 'Erase', 'none'];

    const [currentMode, setCurrentMode] = useState('none');
    const [fontSize, setFontSize] = useState(25);
    const [opacity, setOpacity] = useState(1);
    const [charSpacing, setCharSpacing] = useState(1);

    const [strokeWidth, setStrokeWidth] = useState(1);

    const [skewXSize, setSkewXSize] = useState(0);
    const [skewYSize, setSkewYSize] = useState(0);

    const [skewRX, setSkewRX] = useState(0);
    const [skewRY, setSkewRY] = useState(0);

    const [cropX, setCropX] = useState(0);
    const [cropY, setCropY] = useState(0);

    const [initialMinute, setInitilaMinute] = useState(45)
    const [initialSecond, setInitialSecond] = useState(0)
    const [countUp, setCountUp] = useState(false);

    const dispatch = useDispatch();
    const [htmlfileHandle, sethtmlfileHandle] = useState();
    const [htmlpageHandle, sethtmlpageHandle] = useState();
    const [scaleX, setscaleX] = useState(1);
    const [scaleY, setscaleY] = useState(1);
    const [angle, setangle] = useState(0);
    const [strokedashoffset, setstrokedashoffset] = useState(0);
    const [strokedasharray, setstrokedasharray] = useState([0, 0]);



    const pauseClock = (layerNumber) => {
        clearInterval(xxx)
        endpoint(`call ${window.chNumber}-${layerNumber} "
        clearInterval(xxx);
        "`)
    }
    const showClock = (layerNumber) => {
        //for form
        var startTime = new Date();
        startTime.setMinutes(initialMinute);
        startTime.setSeconds(initialSecond);
        clearInterval(xxx)
        xxx = setInterval(() => {
            countUp ? startTime.setSeconds(startTime.getSeconds() + 1) : startTime.setSeconds(startTime.getSeconds() - 1);
            setInitilaMinute(startTime.getMinutes())
            setInitialSecond(startTime.getSeconds())
        }, 1000);
        //for form

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
                var cc=document.getElementById('gameTimer1').getElementsByTagName('tspan')[0];
                cc.textContent='';
                var startTime = new Date();
                startTime.setMinutes(${initialMinute});
                startTime.setSeconds(${initialSecond});
                var xxx=setInterval(()=>{
                   startTime.setSeconds(startTime.getSeconds() ${countUp ? '+' : '-'} 1);
                    var ss1 =  ((startTime.getMinutes()).toString()).padStart(2, '0') + ':' + ((startTime.getSeconds()).toString()).padStart(2, '0');
                    cc.textContent  =ss1;
                  }, 1000);
                "`)
        }, 300);

        setTimeout(() => {
            endpoint(`mixer ${window.chNumber}-${layerNumber} fill 0 0 1 1 10 ${window.animationMethod}`)
        }, 800);
    }

    const stopClock = layerNumber => {
        clearInterval(xxx)
        endpoint(`mixer ${window.chNumber}-${layerNumber} fill 0 0 0 1 12 ${window.animationMethod}`)
        setTimeout(() => {
            endpoint(`stop ${window.chNumber}-${layerNumber}`)
        }, 1000);
    }
    const resumeClock = (layerNumber) => {

        //for form
        var startTime = new Date();
        startTime.setMinutes(initialMinute);
        startTime.setSeconds(initialSecond);
        clearInterval(xxx);
        xxx = setInterval(() => {
            countUp ? startTime.setSeconds(startTime.getSeconds() + 1) : startTime.setSeconds(startTime.getSeconds() - 1);
            setInitilaMinute(startTime.getMinutes())
            setInitialSecond(startTime.getSeconds())
        }, 1000);
        //for form

        endpoint(`call ${window.chNumber}-${layerNumber} "
        startTime.setMinutes(${initialMinute});
        startTime.setSeconds(${initialSecond});
        clearInterval(xxx);
        xxx=setInterval(()=>{
            startTime.setSeconds(startTime.getSeconds() ${countUp ? '+' : '-'} 1);
             var ss1 =  ((startTime.getMinutes()).toString()).padStart(2, '0') + ':' + ((startTime.getSeconds()).toString()).padStart(2, '0');
             cc.textContent  =ss1;
           }, 1000);
        "`)
    }
    const setOpacity1 = (canvas, e) => {
        setOpacity(e.target.value)
        canvas.getActiveObjects().forEach(element => element.set({ 'opacity': e.target.value }));
        canvas.requestRenderAll();
    }

    const setCHRSpacing = (canvas, e) => {
        setCharSpacing(e.target.value);
        canvas.getActiveObjects().forEach(element => {
            element.set({ 'charSpacing': e.target.value });
        });

        canvas.requestRenderAll();
    }

    // startTime.getMinutes()).toString()).padStart(2, '0')
    const addGameTimer = canvas => {
        const sss = new fabric.Textbox(`${initialMinute.toString().padStart(2, '0')}:${initialSecond.toString().padStart(2, '0')}`, {
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
            id: 'gameTimer1',

        });
        canvas.add(sss).setActiveObject(sss);
        canvas.requestRenderAll();
    }


    const onSizeChange = (e, canvas) => {
        options.currentFontSize = e.target.value
        setFontSize(e.target.value)
        canvas.getActiveObjects().forEach(item => item.fontSize = e.target.value)
        canvas.requestRenderAll();
    }
    // const makeFullScreen = () => {
    //     canvas?.getActiveObjects().forEach(element => {
    //         element.set({ scaleX: (1024 / element.width), scaleY: (576 / element.height), left: 0, top: 0 })
    //     });
    //     canvas?.requestRenderAll();
    // }
    // const removeBorderandCurve = () => {
    //     canvas?.getActiveObjects().forEach(element => {
    //         element.set({ strokeWidth: 0, rx: 0, ry: 0 })
    //     });
    //     canvas?.requestRenderAll();
    // }

    // const attachToPath = () => {
    //     const paths = canvas.getObjects().filter((obj) => (obj.type === 'path'))
    //     if (paths[0]) {
    //         canvas.getActiveObjects(0).forEach(element => {
    //             paths[0].set({ fill: 'transparent', strokeWidth: 0 })
    //             element.set('path', paths[0]);
    //             canvas.remove(paths[0]);
    //         });
    //         canvas?.requestRenderAll();
    //     }
    // }



    const onDrawingModeChange = (mode, canvas) => {
        setCurrentMode(mode);
        if (mode === 'none') {
            canvas.isDrawingMode = false;
            canvas.getObjects().forEach((item) => item.set({ objectCaching: false }))
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

    const importJSON = (file) => {
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

    const resetZommandPan = () => {
        canvas.setZoom(1);
        dispatch({ type: 'CHANGE_CANVAS_ZOOM', payload: 1 })

        canvas.setViewportTransform([canvas.getZoom(), 0, 0, canvas.getZoom(), 0, 0])
    }
    const onBlurSizeChange = value => {
        shadowOptions.blur = value;
        canvas.getActiveObjects().forEach(item => { if (item.shadow) { item.shadow.blur = value } })
        canvas.requestRenderAll();
    }
    const onoffsetXChange = value => {
        shadowOptions.offsetX = value;
        canvas.getActiveObjects().forEach(item => { if (item.shadow) { item.shadow.offsetX = value } })
        canvas.requestRenderAll();
    }

    const onoffsetYChange = value => {
        shadowOptions.offsetY = value;
        canvas.getActiveObjects().forEach(item => { if (item.shadow) { item.shadow.offsetY = value } })
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
    const onstrokedasharraychange = e => {
        setstrokedasharray([parseInt(e.target.value)])
        canvas.getActiveObjects().forEach(item => item.strokeDashArray = [parseInt(e.target.value), parseInt(e.target.value)])
        canvas.requestRenderAll();
    }
    const onstrokedashoffsetchange = e => {
        setstrokedashoffset(parseInt(e.target.value))
        canvas.getActiveObjects().forEach(item => item.strokeDashOffset = [parseInt(e.target.value)])
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

        endpoint(`call ${window.chNumber}-${templateLayers.verticalScroll} "speed=${e.target.value}"`);
    }
    const onHorizontalSpeedChange = (e) => {
        setHorizontalSpeed(e.target.value)
        localStorage.setItem('RCC_horizontalSpeed', e.target.value)
        endpoint(`call ${window.chNumber}-${templateLayers.horizontalScroll} "speed=${e.target.value}"`);
    }
    const onHorizontalSpeedChange2 = (e) => {
        setHorizontalSpeed2(e.target.value)
        localStorage.setItem('RCC_horizontalSpeed2', e.target.value)
        endpoint(`call ${window.chNumber}-${templateLayers.horizontalScroll2} "speed=${e.target.value}"`);
    }
    const exportSVG = canvas => {
        const element = document.createElement("a");
        var aa = canvas.toSVG(['id', 'selectable'])
        const file = new Blob([aa], { type: 'text/xml' });
        element.href = URL.createObjectURL(file);
        var ss = new Date().toLocaleTimeString('en-US', { year: "numeric", month: "numeric", day: "numeric", hour12: false, hour: "numeric", minute: "numeric", second: "numeric" });
        var retVal = prompt("Enter  file name to save : ", ss + "_FileName");
        if (retVal !== null) {
            element.download = retVal + '.svg';;
            document.body.appendChild(element); // Required for this to work in FireFox
            element.click();
        }
    }
    const exportJSON = canvas => {
        const element = document.createElement("a");
        var aa = JSON.stringify(canvas.toJSON(['id', 'selectable']));
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
                    element.set({ objectCaching: false, shadow: { ...shadowOptions } });
                    if (element.type === 'text') {
                        element.set({ left: (element.left - ((element.width) * element.scaleX / 2)), top: (element.top + ((element.height) * element.scaleY / 4)) })
                        element.set({ type: 'i-text' })
                        var textobj = element.toObject();
                        var clonedtextobj = JSON.parse(JSON.stringify(textobj));
                        var aa = new fabric.IText(element.text, clonedtextobj);
                        canvas.remove(element)
                        canvas.add(aa);
                        aa.set({ objectCaching: false, shadow: { ...shadowOptions } })
                    }
                });
            });
            canvas.renderAll();
        }
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
            document.body.innerHTML='' ;
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
            </html>`

    }

    async function exportHTML(canvas) {
        canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
        selectAll(canvas);
        var ss = new Date().toLocaleTimeString('en-US', { year: "numeric", month: "numeric", day: "numeric", hour12: false, hour: "numeric", minute: "numeric", second: "numeric" });
        const options = {
            suggestedName: ss,
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
        const bb = JSON.stringify({ pageName: aa1.name, pageValue: canvas.toJSON(['id', 'selectable']), animation: '' }) + '\r\n';
        const file1 = new Blob([bb], { type: 'text/plain' });

        await writable1.write(file1);
        await writable1.close();
    }


    async function OverrightHtml(canvas) {
        canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
        selectAll(canvas);
        const writable = await htmlfileHandle.createWritable();
        setHtmlString();
        const file = new Blob([html], { type: 'text/html' });
        await writable.write(file);
        await writable.close();

        if (htmlpageHandle) {
            const writable1 = await htmlpageHandle.createWritable();
            const bb = JSON.stringify({ pageName: htmlpageHandle.name, pageValue: canvas.toJSON(['id', 'selectable']), animation: '' }) + '\r\n';

            const file1 = new Blob([bb], { type: 'text/plain' });
            await writable1.write(file1);
            await writable1.close();
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
                }),
                    retVal + '.png')
            } catch (error) {
                alert(error)
            }
        }
    }
    const exportPngFullPage = canvas => {
        canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
        selectAll(canvas);
        // deSelectAll(canvas);
        var ss = new Date().toLocaleTimeString('en-US', { year: "numeric", month: "numeric", day: "numeric", hour12: false, hour: "numeric", minute: "numeric", second: "numeric" });
        var retVal = prompt("Enter file name to save : ", ss + "_FileName");

        if (retVal !== null) {
            try {
                canvas.getElement().toBlob(blob => {
                    saveAs(blob,
                        retVal + '.png')
                })
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
    const exportHorizontalScrollAsHTML2 = canvas => {
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
       var speed=${horizontalSpeed2};
        if (${!ltr2}){
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
        var hh = (canvas.getActiveObject())?.getBoundingRect().height + 200;
        endpoint(`play ${window.chNumber}-${templateLayers.verticalScroll} [HTML] xyz.html`);
        endpoint(`call ${window.chNumber}-${templateLayers.verticalScroll} "
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
        var hh = (canvas.getActiveObject())?.getBoundingRect().width + 200;
        endpoint(`play ${window.chNumber}-${templateLayers.horizontalScroll} [HTML] xyz.html`);
        endpoint(`call ${window.chNumber}-${templateLayers.horizontalScroll} "
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
    const startHorizontalScroll2 = () => {
        canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
        selectAll(canvas);
        var hh = (canvas.getActiveObject())?.getBoundingRect().width + 200;
        endpoint(`play ${window.chNumber}-${templateLayers.horizontalScroll2} [HTML] xyz.html`);
        endpoint(`call ${window.chNumber}-${templateLayers.horizontalScroll2} "
        var aa = document.createElement('div');
        aa.style.position='absolute';
        aa.innerHTML='${(canvas.toSVG()).replaceAll('"', '\\"')}';
        document.body.appendChild(aa);
        document.getElementsByTagName('svg')[0].style.width='${hh}';
        document.getElementsByTagName('svg')[0].setAttribute('viewBox','0 0 ${hh} 576');
        aa.style.zoom=(${currentscreenSize * 100}/1024)+'%';
        document.body.style.overflow='hidden';
        var speed=${horizontalSpeed2};
        if (${!ltr2}){
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

        endpoint(`play ${window.chNumber}-${templateLayers.clock} [HTML] xyz.html`);
        endpoint(`call ${window.chNumber}-${templateLayers.clock} "
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
        endpoint(`play ${window.chNumber}-${templateLayers.countUpTimer} [HTML] xyz.html`);
        endpoint(`call ${window.chNumber}-${templateLayers.countUpTimer} "
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
        var inAnimation;
        if (window.inAnimationMethod === 'mix') {
            inAnimation = `@keyframes example {from {opacity:0} to {opacity:1}} div {animation-name: example;  animation-duration: .5s; }`
        }

        else if (((animation.map(val => val.name)).findIndex(val => val === window.inAnimationMethod)) !== -1) {
            inAnimation = animation[((animation.map(val => val.name)).findIndex(val => val === window.inAnimationMethod))].value;
        }
        else if (window.inAnimationMethod === 'lefttoright') {
            inAnimation = ``
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
            var style = document.createElement('style');
            style.textContent = '${inAnimation}';
            document.head.appendChild(style);
            "`)
            }, 300);

            setTimeout(() => {
                endpoint(`mixer ${window.chNumber}-${layerNumber} fill 0 0 1 1 10 ${window.animationMethod}`)
            }, 800);
            setTimeout(() => {
                updateGraphics(canvas, layerNumber);
            }, 1100);
            return
        }

        canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
        endpoint(`play ${window.chNumber}-${layerNumber} [HTML] xyz.html`);
        endpoint(`call ${window.chNumber}-${layerNumber} "
            var aa = document.createElement('div');
            aa.style.position='absolute';
            aa.innerHTML='${(canvas.toSVG()).replaceAll('"', '\\"')}';
            document.body.appendChild(aa);
            document.body.style.margin='0';
            document.body.style.padding='0';
            aa.style.zoom=(${currentscreenSize * 100}/1024)+'%';
            document.body.style.overflow='hidden';
            var style = document.createElement('style');
            style.textContent = '${inAnimation}';
            document.head.appendChild(style);
            "`)
    }


    useEffect(() => {
        fabric.Textbox.prototype._toSVG = (function (_toSVG) {
            return function () {
                var svg = _toSVG.call(this);
                if (this.textAlign) {
                    svg.splice(1, 0, `<extraproperty textAlign="${this.textAlign}" width="${this.width}" originalFontSize="${this.fontSize}"></extraproperty>\n`);
                }
                return svg;
            }
        })(fabric.Textbox.prototype._toSVG)

        fabric.IText.prototype._toSVG = (function (_toSVG) {
            return function () {
                var svg = _toSVG.call(this);
                if (this.textAlign) {
                    svg.splice(1, 0, `<extraproperty textAlign="${this.textAlign}" width="${this.width}" originalFontSize="${this.fontSize}"></extraproperty>\n`);
                }
                return svg;
            }
        })(fabric.IText.prototype._toSVG)

        fabric.Text.prototype._toSVG = (function (_toSVG) {
            return function () {
                var svg = _toSVG.call(this);
                if (this.textAlign) {
                    svg.splice(1, 0, `<extraproperty textAlign="${this.textAlign}" width="${this.width}" originalFontSize="${this.fontSize}"></extraproperty>\n`);
                }
                return svg;
            }
        })(fabric.Text.prototype._toSVG)

        return () => {
            fabric.Textbox.prototype._toSVG = (function (_toSVG) {
                return function () {
                    var svg = _toSVG.call(this);
                    if (this.textAlign) {
                        svg.splice(1, 1);
                    }
                    return svg;
                }
            })(fabric.Textbox.prototype._toSVG)

            fabric.IText.prototype._toSVG = (function (_toSVG) {
                return function () {
                    var svg = _toSVG.call(this);
                    if (this.textAlign) {
                        svg.splice(1, 1);
                    }
                    return svg;
                }
            })(fabric.IText.prototype._toSVG)
            fabric.Text.prototype._toSVG = (function (_toSVG) {
                return function () {
                    var svg = _toSVG.call(this);
                    if (this.textAlign) {
                        svg.splice(1, 1);
                    }
                    return svg;
                }
            })(fabric.Text.prototype._toSVG)
        }
        // eslint-disable-next-line
    }, [])


    useEffect(() => {
        if (localStorage.getItem('RCC_currentscreenSize')) { dispatch({ type: 'CHANGE_CURRENTSCREENSIZE', payload: parseInt(localStorage.getItem('RCC_currentscreenSize')) }) }
        setSolidcaption2(localStorage.getItem('RCC_solidCaption2'));
        setSolidcaption3(localStorage.getItem('RCC_solidCaption3'));
        setLogo(localStorage.getItem('RCC_logo'));
        setLocationBand(localStorage.getItem('RCC_locationBand'));
        setClock(localStorage.getItem('RCC_clock'));
        setVerticalScroll(localStorage.getItem('RCC_verticalScroll'));
        setHorizontalScroll(localStorage.getItem('RCC_horizontalScroll'));
        setHorizontalSpeed(localStorage.getItem('RCC_horizontalSpeed'));
        setHorizontalScroll2(localStorage.getItem('RCC_horizontalScroll2'));
        setHorizontalSpeed2(localStorage.getItem('RCC_horizontalSpeed2'));

        setVerticalSpeed(localStorage.getItem('RCC_verticalSpeed'));

        axios.post('http://localhost:8080/getfonts').then((aa) => {
            setFontList(aa.data)

        }).catch((aa) => { console.log('Error', aa) });
        return () => {
        }
        // eslint-disable-next-line
    }, [])

    const onTabChange = (index, prevIndex) => {
        switch (index) {
            case 0:
            case 4:
                setTimeout(() => {
                    window.dispatchEvent(new Event('resize'))
                }, 100);
                break;
            default:
            //nothing
        }
    }
    const getvalues = () => {
        if (canvas?.getActiveObjects()?.[0]) {
            // console.log(canvas?.getActiveObjects()?.[0]);
            const element = canvas?.getActiveObjects()?.[0];
            if (element.rx !== null) { setSkewRX(element.rx); }
            if (element.ry !== null) { setSkewRY(element.ry); }
            if (element.skewX !== null) { setSkewXSize(element.skewX); }
            if (element.skewY !== null) { setSkewYSize(element.skewY); }
            if (element.fontFamily !== null) { setCurrentFont(element.fontFamily); }
            if (element.fontSize !== null) { setFontSize(element.fontSize); }
            if (element.strokeWidth !== null) { setStrokeWidth(element.strokeWidth); }

            if (element.stroke !== null) { (refStrokeColor.current.value = element.stroke); }
            if (element.fill !== null) { (refFillColor.current.value = element.fill); }
            if (element.backgroundColor !== null) { (refBgColor.current.value = element.backgroundColor); }
            if (element.opacity !== null) { setOpacity(element.opacity); }
            if (element.charSpacing !== null) { setCharSpacing(element.charSpacing); }
            if (element.scaleX !== null) { setscaleX(element.scaleX); }
            if (element.scaleY !== null) { setscaleY(element.scaleY); }
            if (element.angle !== null) { setangle(element.angle); }

            if (element.strokeDashArray !== null) {
                setstrokedasharray(element.strokeDashArray);
            }
            else {
                setstrokedasharray([0, 0]);
            }
            if (element.strokeDashOffset !== null) { setstrokedashoffset(element.strokeDashOffset); }


            if (element.shadow !== null) {
                refShadowColor.current.value = element.shadow.color;
                refBlur.current.value = element.shadow.blur;
                refOffsetX.current.value = element.shadow.offsetX;
                refOffsetY.current.value = element.shadow.offsetY;
                refAffectStroke.current.checked = element.shadow.affectStroke;
            }
        }
    }
    window.getvalues = getvalues;
    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: 495, height: 900, backgroundColor: '#f4f0e7', overflow: 'scroll' }}>

                <div style={{ backgroundColor: '#eff4f6', border: '2px solid yellow' }}>

                    <div className='drawingToolsRow' >
                        <b>Elements: </b>
                        <button onClick={() => createRect(canvas)}> <VscPrimitiveSquare /></button>
                        <button title="Multi Line Editable Text" onClick={() => createTextBox(canvas)}>TB</button>
                        <button title="Single Line Editable Text" onClick={() => createIText(canvas)}>IT</button>
                        <button title="Single Line Non Editable Text" onClick={() => createText(canvas)}>T</button>
                        <button title="Line" onClick={() => createLine(canvas)}>Line</button>
                        <button title="Circle" onClick={() => createCircle(canvas)}>  <VscCircleFilled /></button>
                        <button title="Ellipse" onClick={() => createEllipse(canvas)}>Ellipse</button>
                        <button title="Triangle" onClick={() => createTriangle(canvas)}><VscTriangleUp /></button>
                        <button title="Pentagon" onClick={() => createPentagon(canvas)}>Penta</button>
                        <button title="Shapes" onClick={() => window.changeTab(8)}>Shapes</button>
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
                </div>

                <div style={{ backgroundColor: 'rgb(235, 232, 200)', border: '2px solid red' }}>
                    <div className='drawingToolsRow' >
                        <b> Solid Cap 2: </b>
                        <button onClick={() => {
                            startGraphics(canvas, templateLayers.solidCaption2);
                            setSolidcaption2(canvasList[currentPage]?.pageName);
                            localStorage.setItem('RCC_solidCaption2', canvasList[currentPage]?.pageName);

                        }
                        }><FaPlay />  </button>  <button onClick={() => updateGraphics(canvas, templateLayers.solidCaption2)}>Update</button>
                        <button onClick={() => {
                            stopGraphics(templateLayers.solidCaption2);
                            setSolidcaption2('');
                            localStorage.setItem('RCC_solidCaption2', '');

                        }} ><FaStop /></button>
                        <span> {solidcaption2} </span>
                    </div>
                    <div className='drawingToolsRow' >
                        <b> Solid Cap 3: </b>
                        <button onClick={() => {
                            startGraphics(canvas, templateLayers.solidCaption3);
                            setSolidcaption3(canvasList[currentPage]?.pageName);
                            localStorage.setItem('RCC_solidCaption3', canvasList[currentPage]?.pageName);

                        }
                        }><FaPlay />  </button>  <button onClick={() => updateGraphics(canvas, templateLayers.solidCaption3)}>Update</button>
                        <button onClick={() => {
                            stopGraphics(templateLayers.solidCaption3);
                            setSolidcaption3('');
                            localStorage.setItem('RCC_solidCaption3', '');

                        }} ><FaStop /></button>
                        <span> {solidcaption3} </span>
                    </div>

                    <div className='drawingToolsRow' >
                        <b> Logo: </b>

                        <button onClick={() => {
                            startGraphics(canvas, templateLayers.logo);
                            setLogo(canvasList[currentPage]?.pageName);
                            localStorage.setItem('RCC_logo', canvasList[currentPage]?.pageName);

                        }
                        }><FaPlay />  </button>
                        <button onClick={() => updateGraphics(canvas, templateLayers.logo)}>Update</button>
                        <button onClick={() => {
                            stopGraphics(templateLayers.logo);
                            setLogo('');
                            localStorage.setItem('RCC_logo', '');

                        }} ><FaStop /></button>
                        <span> {logo} </span>

                    </div>
                    <div className='drawingToolsRow' >
                        <b> Location Band: </b>
                        <button onClick={() => {
                            startGraphics(canvas, templateLayers.locationBand);
                            setLocationBand(canvasList[currentPage]?.pageName);
                            localStorage.setItem('RCC_locationBand', canvasList[currentPage]?.pageName);

                        }
                        }><FaPlay />  </button>
                        <button onClick={() => updateGraphics(canvas, templateLayers.locationBand)}>Update</button>
                        <button onClick={() => {
                            stopGraphics(templateLayers.locationBand);
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
                        <button onClick={() => endpoint(`call ${window.chNumber}-${templateLayers.verticalScroll} "speed=0"`)}><FaPause /></button>
                        <button onClick={() => endpoint(`call ${window.chNumber}-${templateLayers.verticalScroll} "speed=${verticalSpeed}"`)}> <GrResume /></button>
                        <button onClick={() => {
                            endpoint(`stop ${window.chNumber}-${templateLayers.verticalScroll}`);
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
                        <button onClick={() => endpoint(`call ${window.chNumber}-${templateLayers.horizontalScroll} "speed=0"`)}> <FaPause /></button>
                        <button onClick={() => endpoint(`call ${window.chNumber}-${templateLayers.horizontalScroll} "speed=${horizontalSpeed}"`)}> <GrResume /></button>
                        <button onClick={() => {
                            endpoint(`stop ${window.chNumber}-${templateLayers.horizontalScroll}`);
                            setHorizontalScroll('');
                            localStorage.setItem('RCC_horizontalScroll', '');

                        }} ><FaStop /></button>
                        Speed:<input style={{ width: '40px' }} onChange={e => onHorizontalSpeedChange(e)} type="number" min='0' max='5' step='0.01' value={horizontalSpeed} />
                        <button onClick={() => exportHorizontalScrollAsHTML(canvas)}>To HTML</button>
                        <span> LTR:</span>  <input type="checkbox" value={ltr} onChange={e => setLtr(val => !val)} />
                        <span> {horizontalScroll} </span>
                    </div>
                    <div className='drawingToolsRow' >
                        <b> H Scroll2: </b>
                        <button onClick={() => {
                            startHorizontalScroll2(window.editor?.canvas);
                            setHorizontalScroll2(canvasList[currentPage]?.pageName);
                            localStorage.setItem('RCC_horizontalScroll2', canvasList[currentPage]?.pageName);

                        }}><FaPlay /></button>
                        <button onClick={() => endpoint(`call ${window.chNumber}-${templateLayers.horizontalScroll2} "speed=0"`)}> <FaPause /></button>
                        <button onClick={() => endpoint(`call ${window.chNumber}-${templateLayers.horizontalScroll2} "speed=${horizontalSpeed2}"`)}> <GrResume /></button>
                        <button onClick={() => {
                            endpoint(`stop ${window.chNumber}-${templateLayers.horizontalScroll2}`);
                            setHorizontalScroll2('');
                            localStorage.setItem('RCC_horizontalScroll2', '');

                        }} ><FaStop /></button>
                        Speed:<input style={{ width: '40px' }} onChange={e => onHorizontalSpeedChange2(e)} type="number" min='0' max='5' step='0.01' value={horizontalSpeed2} />
                        <button onClick={() => exportHorizontalScrollAsHTML2(canvas)}>To HTML</button>
                        <span> LTR:</span>  <input type="checkbox" value={ltr2} onChange={e => setLtr2(val => !val)} />
                        <span> {horizontalScroll2} </span>
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
                            endpoint(`stop ${window.chNumber}-${templateLayers.clock}`);
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
                            endpoint(`stop ${window.chNumber}-${templateLayers.countUpTimer}`);
                            setUpTimer('');
                            localStorage.setItem('RCC_upTimer', '');

                        }} ><FaStop /></button>
                        <button onClick={() => exportUpTimerAsHTML(canvas)}>To HTML</button>
                        <span> {upTimer} </span>
                    </div>

                    <div className='drawingToolsRow' >
                        <b>Game Timer:</b>
                        <button onClick={() => addGameTimer(canvas)}>Add to Preview</button>
                        <span> M</span><input type='text' style={{ width: 15 }} value={initialMinute} onChange={e => setInitilaMinute(e.target.value)} />
                        <span> S</span><input type='text' style={{ width: 15 }} value={initialSecond} onChange={e => setInitialSecond(e.target.value)} />
                        <span> Up</span><input type='checkbox' checked={countUp} onChange={e => setCountUp(val => !val)} />
                        <button onClick={() => showClock(templateLayers.gameTimer)}><FaPlay /></button>
                        <button onClick={() => pauseClock(templateLayers.gameTimer)}> <FaPause /></button>
                        <button onClick={() => resumeClock(templateLayers.gameTimer)}> <GrResume /> </button>
                        <button onClick={() => stopClock(templateLayers.gameTimer)} ><FaStop /></button>
                    </div>
                </div>
                <div style={{ backgroundColor: '#eff4f6', border: '2px solid green' }}>

                    <div className='drawingToolsRow' >
                        <table border='1'>
                            <tbody>
                                <tr><td> <b>Opacity: </b><input className='inputRange' onChange={e => setOpacity1(canvas, e)} type="range" min='0' max='1' step='0.1' value={opacity} /> {opacity}</td><td> <b>Chr Spacing: </b><input className='inputRange' onChange={e => setCHRSpacing(canvas, e)} type="range" min='-10000' max='10000' step='10' value={charSpacing} /><button onClick={() => {
                                    setCharSpacing(0);
                                    canvas.getActiveObjects().forEach(item => item.charSpacing = 0)
                                    canvas.requestRenderAll();
                                }}>R</button>{charSpacing}</td></tr>
                            </tbody>
                        </table>



                    </div>
                    <div className='drawingToolsRow' >
                        <b> Font: </b> <select onChange={e => onFontChange(e)} value={currentFont}>
                            {fontList.map((val) => { return <option key={uuidv4()} value={val}>{val}</option> })}
                        </select>
                        Size<input value={fontSize} className='inputRangeFontSize' onChange={e => onSizeChange(e, canvas)} type="range" min='0' max='100' step='1' />
                        {fontSize}
                    </div>


                    <div className='drawingToolsRow' >
                        <b> Colors: </b>
                        Fill <input ref={refFillColor} type="color" defaultValue='#ffffff' onChange={e => changeCurrentColor(e, canvas)} />
                        BG <input ref={refBgColor} type="color" defaultValue='#40037c' onChange={e => changeBackGroundColor(e, canvas)} />
                        Stroke<input ref={refStrokeColor} type="color" defaultValue='#ffffff' onChange={e => changeStrokeCurrentColor(e, canvas)} />
                        <button onClick={() => swapFaceandStrokeColors(canvas)}>Swap Face/Stroke Color</button>
                        Stroke/Brush W: {strokeWidth}
                        <input className='inputRangeStroke' onChange={e => onstrokeSizeChange(e)} type="range" id='strokeSizeOSD' min='0' max='50' step='1' defaultValue='1' />
                        <span> ScaleX : {scaleX.toFixed(1)} ScaleY  : {scaleY.toFixed(1)} Angle  : {angle.toFixed(1)}</span>
                        <br /> stroke-dasharray: <input className='inputRangeshadow' onChange={e => onstrokedasharraychange(e)} type="range" min='0' max='100' step='1' value={strokedasharray[0]} />{strokedasharray[0]}
                        stroke-dash-offset: <input className='inputRangeshadow' onChange={e => onstrokedashoffsetchange(e)} type="range" min='0' max='100' step='1' value={strokedashoffset} /> {strokedashoffset}

                    </div>
                    <div style={{ display: 'flex' }}>
                        <div  >
                            <table border='1' width='220'>
                                <tbody>
                                    <tr><td colSpan='2'><b> Shadow: </b>color <input ref={refShadowColor} type="color" defaultValue='#000000' onChange={e => changeShadowCurrentColor(e, canvas)} /></td></tr>
                                    <tr><td colSpan='2'>affectStroke<input ref={refAffectStroke} type="checkbox" onChange={(e) => affectStroke(e)} defaultChecked={false} /></td></tr>
                                    <tr><td>Blur</td><td> <input ref={refBlur} className='inputRangeshadow' onChange={e => onBlurSizeChange(e.target.value)} type="range" min='0' max='100' step='1' defaultValue='30' /><button onClick={() => onBlurSizeChange(0)}>R</button></td></tr>
                                    <tr><td>offsetX</td><td> <input ref={refOffsetX} className='inputRangeshadow' onChange={e => onoffsetXChange(e.target.value)} type="range" min='-400' max='400' step='1' defaultValue='0' /><button onClick={() => onoffsetXChange(0)}>R</button></td></tr>
                                    <tr><td> offsetY</td><td><input ref={refOffsetY} className='inputRangeshadow' onChange={e => onoffsetYChange(e.target.value)} type="range" min='-200' max='200' step='1' defaultValue='0' /><button onClick={() => onoffsetYChange(0)}>R</button></td></tr>
                                    <tr><td><button onClick={() => setasClipPath(canvas)}>SetAsCipPath</button></td><td><button onClick={() => cliptoPath(canvas)}>Clip to Path</button></td></tr>

                                </tbody>
                            </table>
                        </div>
                        <div  >
                            <table border='1' width='255' style={{ minWidth: 255, maxWidth: 255 }}>
                                <tbody>

                                    <tr><td>SkewX:</td><td> <input className='inputRange' onChange={e => onSkewXSizeChange(e)} type="range" min='-88' max='88' step='1' value={skewXSize} /><button onClick={() => {
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
                </div>
                <div style={{ backgroundColor: 'rgb(235, 232, 200)', border: '2px solid blue' }}>
                    <div className='drawingToolsRow' >
                        <b>Center: </b>
                        <button onClick={() => resetZommandPan(canvas)}>Reset Zoom, Pan</button>
                        <button onClick={() => putatCenter(canvas)}>All at Center</button>
                        <button onClick={() => selectedatCenter(canvas)}>Center</button>
                        <button onClick={() => selectedatCenterH(canvas)}>H Center</button>
                        <button onClick={() => selectedatCenterV(canvas)}>V Center</button>
                    </div>
                    <div className='drawingToolsRow' >
                        <b>Tools: </b>
                        <button title='Align Left' onClick={() => alignAllLeft(canvas)}><FaAlignLeft /></button>
                        <button title='Align Right' onClick={() => alignAllRight(canvas)}><FaAlignRight /></button>
                        <button title='Align Top' onClick={() => alignAllTop(canvas)}><AiOutlineVerticalAlignTop /> <AiOutlineVerticalAlignTop /> </button>
                        <button title='Align Bottom' onClick={() => alignAllButtom(canvas)}><AiOutlineVerticalAlignBottom /><AiOutlineVerticalAlignBottom /></button>

                        <button title='Bold' style={{ fontWeight: 'bold' }} onClick={() => txtBold(canvas)}>B</button>
                        <button title='Ittalic' style={{ fontStyle: 'italic' }} onClick={() => textItalic(canvas)}>I</button>
                        <button title='Underline' style={{ textDecoration: 'underline' }} onClick={() => textUnderline(canvas)}>U</button>
                        <button title='Linethrough' style={{ textDecoration: 'line-through' }} onClick={() => textLineThrough(canvas)}>S</button>


                        <button title='Delete Seleted' onClick={() => deleteSelectedItem(canvas)}><VscTrash /> Selected</button>
                        <button title='Delete All' onClick={() => deleteAll(canvas)}><VscTrash />All</button>
                        <button title='Lock selected' onClick={() => lock(canvas)}><VscLock /></button>
                        <button title='Unlock All' onClick={() => unlockAll(canvas)}><VscUnlock />All</button>
                        <button onClick={() => undo(canvas)}>Undo</button>
                        <button onClick={() => redo(canvas)}>Redo</button>
                        <button onClick={() => copy(canvas)}>Copy</button>
                        <button onClick={() => paste(canvas)}>Paste</button>
                        <button onClick={() => selectAll(canvas)}>Select All</button>
                        <button onClick={() => deSelectAll(canvas)}>Deselect All</button>
                        <button onClick={() => sendToBack(canvas)}>Send To BK</button>
                        <button onClick={() => bringToFront(canvas)}>Bring to F</button>
                        <label style={{border:'1px solid #000000',borderRadius:'3px', backgroundColor:'ButtonFace'}} for="importsvg">Import SVG <input id="importsvg" style={{ display: 'none' }} type='file' className='input-file' accept='.xml,.svg' onChange={e => importSVG(e.target.files[0])} /></label>
                        <label style={{border:'1px solid #000000',borderRadius:'3px', backgroundColor:'ButtonFace'}}for="importjson"> Import JSON<input id="importjson" style={{ display: 'none' }} type='file' className='input-file' accept='.json' onChange={e => importJSON(e.target.files[0])} /></label>



                        {/* <button onClick={makeFullScreen}>Make full Screen</button> */}
                        {/* <button onClick={removeBorderandCurve}>Remove Border and curve</button> */}
                        {/* <button onClick={attachToPath}>Attach Text to first path</button> */}
                    </div>
                    <div className='drawingToolsRow' >
                        <b> Export: </b>
                        <button onClick={() => exportHTML(canvas)}>HTML and Page</button>
                        Js file:<input type='text' size={3} value={jsfilename} onChange={e => dispatch({ type: 'CHANGE_JSFILENAME', payload: e.target.value })} />
                        css file:<input size={3} type='text' value={cssfilename} onChange={e => dispatch({ type: 'CHANGE_CSSFILENAME', payload: e.target.value })} />
                        {htmlfileHandle && <button onClick={() => OverrightHtml(canvas)}>Overwrite</button>}

                        <button onClick={() => exportPng(canvas)}>PNG (Only Shape)</button>
                        <button onClick={() => exportPngFullPage(canvas)}>PNG (FullPage)</button>
                        <button onClick={() => exportSVG(canvas)}>SVG</button>
                        <button onClick={() => exportJSON(canvas)}>JSON</button>
                    </div>
                </div>
            </div>
            <div style={{ width: 380, backgroundColor: '#ddf0db' }}>
                <Tabs selectedTabClassName='selectedTab' forceRenderTabPanel={true} onSelect={(index, prevIndex) => onTabChange(index, prevIndex)} >
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