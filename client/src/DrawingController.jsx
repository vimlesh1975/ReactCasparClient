import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { fabric } from "fabric";
import { endpoint } from './common'
import { useDispatch, useSelector } from 'react-redux'
import "fabric-history";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { VscPrimitiveSquare, VscCircleFilled, VscTriangleUp, VscEdit, VscLock, VscUnlock, VscTrash, VscMove } from "react-icons/vsc";

import { FaAlignLeft, FaAlignRight, FaSave } from "react-icons/fa";
import { AiOutlineVerticalAlignTop, AiOutlineVerticalAlignBottom, AiOutlineRedo, AiOutlineUndo } from "react-icons/ai";

import { FiFile } from "react-icons/fi";
import Casparlogo from './casparlogo.png'

import { v4 as uuidv4 } from 'uuid';

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



export const addClock = canvas => {

    const sss = new fabric.Textbox('', {
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

function animate(canvas, sss) {
    var ss1 = new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric", second: "numeric" });
    sss.set({
        'text': ss1,
    })
    canvas.requestRenderAll();
}
export const createText = (canvas) => {

    const text = new fabric.Textbox("दूरदर्शन से विमलेश कुमार Vimlesh Kumar From Doordarshan", {
        id: 'f0',
        left: 100,
        top: 0,
        width: 500,
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

export const addImage = canvas => {
    fabric.Image.fromURL(window.imageName, myImg => {
        myImg.scaleToWidth(160);
        myImg.scaleToHeight(90);
        myImg.set({ left: 0, top: 0, stroke: 'yellow', strokeWidth: 2, strokeUniform: true });
        canvas.add(myImg);
        canvas.renderAll();

        // }, { crossOrigin: 'anonymous' });
    });

}

const addImagefromUrl = (canvas, url) => {
    fabric.Image.fromURL(url, myImg => {
        myImg.scaleToWidth(320);
        myImg.scaleToHeight(180);
        myImg.set({ left: 100, top: 100, stroke: '#ffffff', strokeWidth: 2, strokeUniform: true });

        canvas.add(myImg).setActiveObject(myImg);
        canvas.renderAll();
    });
}


export const setGradientColor = canvas => {
    if (window.editor.canvas.getActiveObject()) { canvas.getActiveObject().fill = gradient };
}

export const createRect = (canvas) => {
    const rect = new fabric.Rect({
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
    });
    canvas.add(rect).setActiveObject(rect);
    canvas.requestRenderAll();
    rect.animate('top', 430, { onChange: canvas.renderAll.bind(canvas) })
};

export const createCircle = (canvas) => {
    const circle = new fabric.Circle({
        top: 160,
        left: -100,
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
export const alignLeft = canvas => { if (window.editor.canvas.getActiveObject()) canvas.getActiveObject().textAlign = 'left' };
export const alignRight = canvas => { if (window.editor.canvas.getActiveObject()) canvas.getActiveObject().textAlign = 'right' };
export const alignCenter = canvas => { if (window.editor.canvas.getActiveObject()) canvas.getActiveObject().textAlign = 'center' };

export const textUnderline = canvas => { if (window.editor.canvas.getActiveObject()) canvas.getActiveObject().underline = !canvas.getActiveObject().underline };
export const textLineThrough = canvas => { if (window.editor.canvas.getActiveObject()) canvas.getActiveObject().linethrough = !canvas.getActiveObject().linethrough };
export const textItalic = canvas => { if (window.editor.canvas.getActiveObject()) canvas.getActiveObject().fontStyle = 'italic' };
export const txtBold = canvas => { if (window.editor.canvas.getActiveObject()) canvas.getActiveObject().fontWeight = 'bold' };
export const textNormal = canvas => { if (window.editor.canvas.getActiveObject()) canvas.getActiveObject().fontWeight = 'normal' };

export const removeBg = canvas => { if (window.editor.canvas.getActiveObject()) canvas.getActiveObject().set('backgroundColor', '') };



export const deleteSelectedItem = canvas => {
    const aa = canvas.getActiveObjects()
    aa.forEach(element => { canvas.remove(element) });
}
export const deleteAll = canvas => {
    const aa = canvas.getObjects()
    aa.forEach(element => { canvas.remove(element) });
}

export const bringToFront = canvas => canvas.bringToFront(canvas.getActiveObject())
export const sendToBack = canvas => canvas.sendToBack(canvas.getActiveObject())
export const undo = canvas => canvas.undo()
export const redo = canvas => canvas.redo()

export const setOpacity = (canvas, val = 0.5) => {
    const aa = canvas.getActiveObjects()
    aa.forEach(element => element.set({ 'opacity': val }));
}

export const lock = canvas => {
    const aa = canvas.getActiveObjects()
    aa.forEach(element => element.selectable = false);
}


export const unlockAll = canvas => {
    const aa = canvas.getObjects()
    aa.forEach(element => element.selectable = true);
}

export const toggleMode = (mode, canvas) => {
    canvas.freeDrawingBrush.color = options.stroke;
    canvas.freeDrawingBrush.width = options.strokeWidth;

    canvas.isDrawingMode = !(canvas.isDrawingMode);
};

const changeCurrentColor = (e) => {
    options.currentColor = e.target.value;
    window.editor.canvas.freeDrawingBrush.color = e.target.value;
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
    window.editor.canvas.getActiveObjects().forEach(item => item.stroke = e.target.value)
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
        canvas.getActiveObject().toGroup();
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
        aa.forEach(element => element.set({ objectCaching: false }));
        canvas.requestRenderAll();
    }
};

export const savetoCasparcgStore = () => {
    var dd = window.editor.canvas.toJSON(['id'])
    const data = (JSON.stringify(dd)).replaceAll('"', String.fromCharCode(2)).replaceAll(' ', String.fromCharCode(3)).replaceAll('/', String.fromCharCode(4)).replaceAll('%', String.fromCharCode(5))
    endpoint(`call ${window.chNumber}-109 store.dispatch({type:'CHANGE_CANVAS1',payload:'${data}'})`)
    setTimeout(() => {
        endpoint(`mixer ${window.chNumber}-109 fill 0 0 0 1 12 ${window.animationMethod}`)
    }, 200);

    setTimeout(() => {
        endpoint(`call ${window.chNumber}-109 ReadToCasparcgfromStore()`)
    }, 800);
    setTimeout(() => {
        endpoint(`mixer ${window.chNumber}-109 fill 0 0 1 1 12 ${window.animationMethod}`)
    }, 1000);
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


export const updatetoCasparcgStore = () => {
    var dd = window.editor.canvas.toJSON(['id'])
    const data = (JSON.stringify(dd)).replaceAll('"', String.fromCharCode(2)).replaceAll(' ', String.fromCharCode(3)).replaceAll('/', String.fromCharCode(4)).replaceAll('%', String.fromCharCode(5))
    endpoint(`call ${window.chNumber}-109 store.dispatch({type:'CHANGE_CANVAS1',payload:'${data}'})`)

    setTimeout(() => {
        endpoint(`call ${window.chNumber}-109 ReadToCasparcgfromStore()`)
    }, 200);

}
const removeFromCaspar = () => {
    endpoint(`mixer ${window.chNumber}-109 fill 0 0 0 1 12 ${window.animationMethod}`)
}

const changeText = (key, val) => {
    window.editor.canvas.getObjects().forEach((element) => {
        if (element.id === key) {
            element.set({ text: val.toString() })
            window.editor.canvas.requestRenderAll();
        }
    })
    endpoint(`call ${window.chNumber}-109 "window.editor.canvas.getObjects().forEach((element)=>{if(element.id==='${key}'){element.set({text:'${val}'});window.editor.canvas.requestRenderAll();}})"`)

}

var _clipboard;
export const copy = () => {
    window.editor.canvas.getActiveObject()?.clone(cloned => {
        _clipboard = cloned;
    }, ['id']);
}

export const selectAll = (canvas) => {
    canvas.discardActiveObject();
    var sel = new fabric.ActiveSelection(canvas.getObjects(), {
        canvas: canvas,
    });
    canvas.setActiveObject(sel);
    canvas.requestRenderAll();
}

export const paste = () => {
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
}

const DrawingController = ({ chNumber }) => {
    const [fontList, setFontList] = useState([])
    const [currentFont, setCurrentFont] = useState('Arial')
    const [canvaslist, setCanvaslist] = useState([])
    const [currentPage, setCurentPage] = useState()
    const [currentscreenSize, setCurrentscreenSize] = useState(1024)
    const [f0, setF0] = useState('Ganesh Tiwari');
    const [f1, setF1] = useState('Suresh Malhotra');
    const [f2, setF2] = useState('Mahesh prasad');
    const [onlineImageUrl, setOnlineImageUrl] = useState('https://fixthephoto.com/images/content/shirt-fabric-texture-471614080378.jpg')
    const [verticalSpeed, setVerticalSpeed] = useState(0.25)
    const [horizontalSpeed, setHorizontalSpeed] = useState(2)


    const id = 'f0';

    const onFontChange = (e) => {
        options.currentFont = e.target.value;
        setCurrentFont(e.target.value);
        window.editor.canvas.getActiveObjects().forEach(item => item.fontFamily = e.target.value)
        window.editor.canvas.requestRenderAll();
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
        const element = document.createElement("a");
        var aa = ''
        canvaslist.forEach(val => {
            aa += JSON.stringify({ 'pageName': val.pageName, 'pageValue': val.pageValue }) + '\r\n'
        });
        const file = new Blob([aa], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        var ss = new Date().toLocaleTimeString('en-US', { year: "numeric", month: "numeric", day: "numeric", hour12: false, hour: "numeric", minute: "numeric", second: "numeric" });
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

    const handleFileChosen = (file) => {
        if (file) {
            setCurentPage('')
            fileReader = new FileReader();
            fileReader.onloadend = handleFileRead;
            fileReader.readAsText(file);
        }
    };

    const onVerticalSpeedChange = (e) => {
        setVerticalSpeed(e.target.value)
        endpoint(`call ${window.chNumber}-110 "speed=${e.target.value}"`);
    }
    const onHorizontalSpeedChange = (e) => {
        setHorizontalSpeed(e.target.value)
        endpoint(`call ${window.chNumber}-111 "speed=${e.target.value}"`);
    }
    const startVerticalScroll = (canvas) => {
        // console.log(canvas.toSVG());
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
       setInterval(() => {
         aa.style.top =aa.getBoundingClientRect().top-speed;
          }, 1);
        "`)
    }

    const startHorizontalScroll = (canvas) => {
        console.log(canvas.toSVG());
        canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
        selectAll(canvas);
        var hh = (canvas.getActiveObject())?.getBoundingRect().width + 100;
        endpoint(`play ${window.chNumber}-111 [HTML] xyz.html`);
        endpoint(`call ${window.chNumber}-111 "
        var aa = document.createElement('div');
        aa.style.position='absolute';
        aa.innerHTML='${(canvas.toSVG()).replaceAll('"', '\\"')}';
        document.body.appendChild(aa);
        document.getElementsByTagName('svg')[0].style.width='${hh}';
        document.getElementsByTagName('svg')[0].setAttribute('viewBox','0 0 ${hh} 576');
        aa.style.left='100%';
        aa.style.zoom=(${currentscreenSize * 100}/1024)+'%';
        document.body.style.overflow='hidden';
        var speed=${horizontalSpeed};
        setInterval(() => {
         aa.style.left =aa.getBoundingClientRect().left-speed;
         if (aa.getBoundingClientRect().left < -${hh}){aa.style.left='100%'};
          }, 1);
        "`)
    }

    const startClock = (canvas) => {
        console.log(canvas.toSVG());
        canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
        selectAll(canvas);

        endpoint(`play ${window.chNumber}-112 [HTML] xyz.html`);
        endpoint(`call ${window.chNumber}-112 "
        var aa = document.createElement('div');
        aa.style.position='absolute';
        aa.innerHTML='${(canvas.toSVG()).replaceAll('"', '\\"')}';
        document.body.appendChild(aa);
      
        aa.style.zoom=(${currentscreenSize * 100}/1024)+'%';
        document.body.style.overflow='hidden';
        var cc=document.getElementsByTagName('tspan')[0];

        setInterval(() => {
            var ss1 = new Date().toLocaleTimeString('en-US', { hour12: false, hour: 'numeric', minute: 'numeric', second: 'numeric' });
         cc.textContent  =ss1;
          }, 1000);
        "`)
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
            aa.forEach(element => element.set({ objectCaching: false }));
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

                window.editor.canvas.getActiveObjects().forEach(item => {
                    //  alert(item.type);
                    if (!((item.type === 'textbox' || item.type === 'i-text') && item.isEditing)) { window.editor.canvas.remove(item); }
                });
            }
            if (e.ctrlKey && e.key === 'c') {
                var item = window.editor.canvas.getActiveObjects()[0];
                if (!((item?.type === 'textbox' || item?.type === 'i-text') && item?.isEditing)) { copy() }
            }
            if (e.ctrlKey && e.key === 'v') {
                var item = window.editor.canvas.getActiveObjects()[0];
                if (!((item?.type === 'textbox' || item?.type === 'i-text') && item?.isEditing)) { paste() }
            }
            if (e.ctrlKey && e.key === 'z') {
                window.editor.canvas.undo();
            }
            if (e.key === 'F2') {
                savetoCasparcgStore();
            }

        });
        return () => {
            window.removeEventListener('keydown', null)
        }
    }, [])



    return (<div style={{ display: 'flex' }}>
        <div>
            <div style={{ border: '1px solid black' }}>
                <b> Screen Setup: </b>
                Casparcg Screen Sizes  <select onChange={e => setCurrentscreenSize(e.target.value)}>  {screenSizes.map((val) => { return <option key={val} value={val}>{val}</option> })} </select>
                <button className='stopButton' onClick={() => endpoint(`call ${window.chNumber}-109 window.editor.canvas.setZoom(${currentscreenSize}/1024)`)}>Set</button>
            </div>
            <div style={{ border: '1px solid black' }}>
                <b> Solid Caption: </b>
                <button onClick={() => { endpoint(`play ${window.chNumber}-109 [html] http://${window.location.host}${process.env.PUBLIC_URL}/drawing`) }} >Initialise</button>
                <button onClick={() => savetoCasparcgStore()}>Show To Casparcg <img src={Casparlogo} alt='' style={{ width: 15, height: 15 }} /></button>
                <button onClick={() => updatetoCasparcgStore()}>Update To Casparcg</button>
                <button className='stopButton' onClick={() => removeFromCaspar()}>Out Animation</button>
                <button className='stopButton' onClick={() => endpoint(`stop ${window.chNumber}-109`)}>Stop</button>

            </div>

            <div style={{ border: '1px solid black' }}>
                <b> Vertical  Scroll: </b>  <button onClick={() => startVerticalScroll(window.editor?.canvas)}>Start </button>
                Speed:<input style={{ width: '50px' }} onChange={e => onVerticalSpeedChange(e)} type="number" min='0' max='5' step='0.01' defaultValue='0.25' />
                <button onClick={() => endpoint(`call ${window.chNumber}-110 "speed=0"`)}>Pause</button>
                <button onClick={() => endpoint(`call ${window.chNumber}-110 "speed=${verticalSpeed}"`)}>Resume</button>
                <button className='stopButton' onClick={() => endpoint(`stop ${window.chNumber}-110`)}>Stop</button>
                <br />
                <b> Horizntl Scroll: </b>
                <button onClick={() => startHorizontalScroll(window.editor?.canvas)}>Start</button>
                Speed:<input style={{ width: '50px' }} onChange={e => onHorizontalSpeedChange(e)} type="number" min='0' max='5' step='0.01' defaultValue='2.0' />
                <button onClick={() => endpoint(`call ${window.chNumber}-111 "speed=0"`)}>Pause</button>
                <button onClick={() => endpoint(`call ${window.chNumber}-111 "speed=${horizontalSpeed}"`)}>Resume</button>
                <button className='stopButton' onClick={() => endpoint(`stop ${window.chNumber}-111`)}>Stop</button>
            </div>
            <div style={{ border: '1px solid black' }}>
                <b>Clock: </b>
                <button onClick={() => addClock(window.editor.canvas)}>Add to Preview</button>
                <button onClick={() => startClock(window.editor.canvas)}>Show On Casparcg</button>
                <button className='stopButton' onClick={() => endpoint(`stop ${window.chNumber}-112`)}>Stop</button>
            </div>
            <div style={{ border: '1px solid black' }}>
                <b> Drawing Tools: </b>
                <button onClick={() => createRect(window.editor.canvas)}> <VscPrimitiveSquare /></button>
                <button onClick={() => createText(window.editor.canvas)}>T</button>
                <button onClick={() => createCircle(window.editor?.canvas)}>  <VscCircleFilled /></button>
                <button onClick={() => createTriangle(window.editor.canvas)}><VscTriangleUp /></button>
                <button onClick={() => toggleMode("drawing", window.editor.canvas)}>Toggle<VscEdit /></button>

            </div>
            <div style={{ border: '1px solid black' }}>
                <b> Colors: </b>
                Face <input type="color" defaultValue='#ffffff' onChange={e => changeCurrentColor(e)} />
                BG <input type="color" defaultValue='#50037c' onChange={e => changeBackGroundColor(e)} />
                stroke<input type="color" defaultValue='#ffffff' onChange={e => changeStrokeCurrentColor(e)} />
                Stroke/Brush width:<input style={{ width: '50px' }} onChange={e => onstrokeSizeChange(e)} type="number" id='strokeSizeOSD' min='0' max='100' step='1' defaultValue='3' />
                <div style={{ border: '1px solid black' }}>
                    <b> Skew: </b>
                    SkewX:<input style={{ width: '50px' }} onChange={e => onSkewXSizeChange(e)} type="number" id='skewX' min='-360' max='360' step='1' defaultValue='0' />
                    SkewY:<input style={{ width: '50px' }} onChange={e => onSkewYSizeChange(e)} type="number" id='skewX' min='-360' max='360' step='1' defaultValue='0' />
                </div>
                <div style={{ border: '1px solid black' }}>
                    <b>Zoom and Pan: </b>
                    <button onClick={() => window.editor.canvas.setZoom(1)}>Reset Zomm of Screen</button>
                    <button onClick={() => window.editor.canvas.setViewportTransform([window.editor.canvas.getZoom(), 0, 0, window.editor.canvas.getZoom(), 0, 0])}>Reset Pan of Screen</button>
                </div>
                <div>
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



                </div>
            </div>
            <div style={{ border: '1px solid black' }}>
                <b> Font: </b>
                Name:  <select onChange={e => onFontChange(e)} value={currentFont}>
                    {fontList.map((val) => { return <option key={uuidv4()} value={val}>{val}</option> })}
                </select>
                Size<input style={{ width: '35px' }} onChange={e => onSizeChange(e)} type="number" id='fontSizeOSD' min='0' max='100' step='2' defaultValue='25' />
            </div>
            <div>

                <div style={{ border: '1px solid black' }}>
                    <b> Save: </b>
                    <button onClick={() => drawingFileNew(window.editor.canvas)}>File New <FiFile /></button>
                    <button onClick={() => drawingFileSave(window.editor.canvas)}>File Save <FaSave /></button>

                    <input
                        type='file'
                        id='file'
                        className='input-file'
                        accept='.txt'
                        onChange={e => handleFileChosen(e.target.files[0])}
                    />
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


                    <div style={{ height: 200, overflow: 'scroll', border: '2px solid black' }}>

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
                                                                <tr ref={provided.innerRef}
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
                                                            )}
                                                        </Draggable>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </div>

                    <div style={{ border: '1px solid black' }}>
                        <b> Image from URL: </b>
                        <input onChange={(e) => setOnlineImageUrl(e.target.value)} size="65" type='text' defaultValue={onlineImageUrl}></input>
                        <button onClick={() => addImagefromUrl(window.editor.canvas, onlineImageUrl)}>Add</button>

                    </div>

                </div>
            </div>
        </div>
        <div>
            <input type='text' size="10" onChange={(e) => setF0(e.target.value)} value={f0}></input>   <button onClick={() => changeText(id, f0)}>Update {id} value</button> <br />
            <input type='text' size="10" onChange={(e) => setF1(e.target.value)} value={f1}></input>   <button onClick={() => changeText(id, f1)}>Update {id} value</button><br />
            <input type='text' size="10" onChange={(e) => setF2(e.target.value)} value={f2}></input>   <button onClick={() => changeText(id, f2)}>Update {id} value</button><br />
        </div>
    </div >)
}

export default DrawingController
