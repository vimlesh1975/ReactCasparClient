import React, { useEffect, useState } from 'react'

import studio from '@theatre/studio'
import { getProject, types, val, onChange } from '@theatre/core'
import DrawingforTheatrejs from '../DrawingforTheatrejs'
import { useSelector, useDispatch } from 'react-redux'
import { fabric } from "fabric";
import { FaPlay, FaPause, FaStop } from "react-icons/fa";


import { endpoint, templateLayers, shadowOptions, executeScript } from '../common'

studio.initialize();
studio.ui.hide();


var project = getProject('HTML Animation Tutorial')

var mouseDown = 0;
document.body.onmousedown = function () {
    mouseDown = 1;
}
document.body.onmouseup = function () {
    mouseDown = 0;
}

const arrObject = [];

const WebAnimator = ({ canvasObjects = { "version": "5.2.4", "objects": [{ "type": "ellipse", "version": "5.2.4", "originX": "left", "originY": "top", "left": 180, "top": 330, "width": 100, "height": 160, "fill": "#0000ff", "stroke": "#ffffff", "strokeWidth": 3, "strokeDashArray": null, "strokeLineCap": "butt", "strokeDashOffset": 0, "strokeLineJoin": "miter", "strokeUniform": true, "strokeMiterLimit": 4, "scaleX": 1, "scaleY": 1, "angle": 0, "flipX": false, "flipY": false, "opacity": 0.9, "shadow": { "color": "#000000", "blur": 30, "offsetX": 0, "offsetY": 0, "affectStroke": false, "nonScaling": false }, "visible": true, "backgroundColor": "", "fillRule": "nonzero", "paintFirst": "fill", "globalCompositeOperation": "source-over", "skewX": 0, "skewY": 0, "rx": 50, "ry": 80, "id": "ccg_11", "class": "class_11", "selectable": true }, { "type": "circle", "version": "5.2.4", "originX": "left", "originY": "top", "left": 150, "top": 0, "width": 200, "height": 200, "fill": "#0000ff", "stroke": "#ffffff", "strokeWidth": 3, "strokeDashArray": null, "strokeLineCap": "butt", "strokeDashOffset": 0, "strokeLineJoin": "miter", "strokeUniform": true, "strokeMiterLimit": 4, "scaleX": 1, "scaleY": 1, "angle": 0, "flipX": false, "flipY": false, "opacity": 1, "shadow": { "color": "#000000", "blur": 30, "offsetX": 0, "offsetY": 0, "affectStroke": false, "nonScaling": false }, "visible": true, "backgroundColor": "", "fillRule": "nonzero", "paintFirst": "fill", "globalCompositeOperation": "source-over", "skewX": 0, "skewY": 0, "radius": 100, "startAngle": 0, "endAngle": 360, "id": "ccg_12", "class": "class_12", "selectable": true }] } }) => {
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const [RCCtheatrepageData, setRCCtheatrepageData] = useState(canvasObjects)
    const [duration, setDuration] = useState(2);
    const [loopcount, setLoopcount] = useState(0);
    const [fabric1, setFabric1] = useState('');
    const [coreAndStudio1, setCoreAndStudio1] = useState('');
    const [projectId, setProjectId] = useState('HTML Animation Tutorial')
    const [htmlfileHandle, sethtmlfileHandle] = useState();

    const clientId = useSelector(state => state.clientIdReducer.clientId);
    window.clientId = clientId;

    var sheet = project.sheet('Sheet 1');
    project.ready.then(() => {
        sheet.sequence.play({ iterationCount: Infinity, range: [0, 2] });
    });

    const dispatch = useDispatch();

    useEffect(() => {
        document.title = "RCC Web Animator"
        studio.ui.restore();

        setRCCtheatrepageData(localStorage.getItem('RCCtheatrepageData'));
        return () => {
            // second  
        }
    }, [])

    useEffect(() => {
        if (canvas) {
            studio.onSelectionChange((newSelection) => {
                const aa = canvas.getObjects().filter((item) => {
                    return newSelection[0].address.objectKey === item.id;
                })
                canvas.setActiveObject(aa[0]);
                canvas.requestRenderAll()
            })
        }
        return () => {
            // second
        }
    }, [canvas])


    useEffect(() => {
        setTimeout(() => {
            var fetchfabricjs;
            if (window.location.origin !== 'https://vimlesh1975.github.io') {
                fetchfabricjs = `${process.env.PUBLIC_URL}/js/fabric.min.js`;
            }
            else {
                fetchfabricjs = `/ReactCasparClient/js/fabric.min.js`;
            }
            fetch(fetchfabricjs)
                .then((r) => r.text())
                .then(text => {
                    setFabric1(text);
                })
        }, 2000);

        setTimeout(() => {
            var fetchcoreAndStudio1;
            if (window.location.origin !== 'https://vimlesh1975.github.io') {
                fetchcoreAndStudio1 = `${process.env.PUBLIC_URL}/js/core-and-studio.js`;
            }
            else {
                fetchcoreAndStudio1 = `/ReactCasparClient/js/core-and-studio.js`;
            }
            fetch(fetchcoreAndStudio1)
                .then((r) => r.text())
                .then(text => {
                    setCoreAndStudio1(text);
                })
        }, 3000);

        return () => {
            // cleanup
        }
        // eslint-disable-next-line
    }, [])

    const hexToRGB = hex => {
        const red = parseInt(hex.slice(1, 3), 16)
        const green = parseInt(hex.slice(3, 5), 16)
        const blue = parseInt(hex.slice(5, 7), 16)
        return { r: red / 255, g: green / 255, b: blue / 255, a: 1 } // return an object
    }


    const deleteAllObjects = () => {
        canvas.getObjects().forEach(element => {
            project.sheet('Sheet 1').detachObject(element.id);
        })
        // studio.transaction((api) => {
        //     api.__experimental_forgetObject(project.sheet('Sheet 1').object(element.id, {}, { reconfigure: true }));
        // })
        // studio.transaction((api) => {
        //     // calling this will make it as if you never set values for this object or put it in a sequence
        //     // api.__experimental_forgetObject(object)

        //     // calling this will make it as if you never set values for _any_ object in this sheet, and you never created a sequence either.
        //     api.__experimental_forgetSheet(sheet)

        //     // note that if you're calling __experimental_forgetSheet(), then there is no need to call __experimental_forgetObject() in case that object belongs in that sheet.
        // })

        canvas.requestRenderAll()
    }


    const initialiseCore = (jsonContent, importing = false) => {

        canvas.loadFromJSON(jsonContent, () => {

            canvas.getObjects().forEach((element, i) => {
                // console.log(element.fill);
                // console.log(element.stroke);
                // console.log(element.shadow.color);

                if ((element.fill === null) || ((element.fill).toString().startsWith("rgb"))) {
                    element.set({ fill: '#555252' })
                }
                if (element.stroke === null) {
                    element.set({ stroke: '#000000' })
                }

                var obj1 = {};
                var isColorObjectfill;
                var isColorObjectStroke;

                if (importing) {
                    isColorObjectfill = (element.fill.type !== 'linear');
                    isColorObjectStroke = (element.stroke.type !== 'linear');

                    if (isColorObjectfill) {
                        obj1 = {
                            ...obj1,
                            fill: types.rgba(element.fill),
                        };
                    }

                    if (isColorObjectStroke) {
                        obj1 = {
                            ...obj1,
                            stroke: types.rgba(element.stroke),
                        };
                    }
                    obj1 = {
                        ...obj1,
                        shadow: { ...element.shadow, color: types.rgba(element.shadow.color) },
                    };

                }
                else {
                    if (!element.shadow.color.toString().startsWith("#")) {
                        element.set({ shadow: { ...element.shadow, color: '#ffffff' } })
                    }
                    isColorObjectfill = (typeof (element.fill) !== 'object');
                    isColorObjectStroke = (typeof (element.stroke) !== 'object');
                    if (isColorObjectfill) {
                        obj1 = {
                            ...obj1,
                            fill: types.rgba(hexToRGB(element.fill ? element.fill : '#ff0000')),
                        };
                    }

                    if (isColorObjectStroke) {
                        obj1 = {
                            ...obj1,
                            stroke: types.rgba(hexToRGB(element.stroke ? element.stroke : '#000000')),
                        };
                    }
                    obj1 = {
                        ...obj1,
                        shadow: { ...shadowOptions, color: types.rgba(hexToRGB(element.shadow.color)), blur: types.number(parseInt(element.shadow.blur), { range: [0, 100] }) },
                    };

                }

                arrObject[i] = sheet.object(element.id, {
                    left: element.left,
                    top: element.top,
                    opacity: types.number(element.opacity, { range: [0, 1] }),
                    scaleX: types.number(element.scaleX, { nudgeMultiplier: 0.01 }),
                    scaleY: types.number(element.scaleY, { nudgeMultiplier: 0.01 }),
                    angle: element.angle,
                    rx: types.number(element.rx ? element.rx : 10, { range: [0, 100] }),
                    ry: types.number(element.ry ? element.rx : 10, { range: [0, 100] }),
                    strokeWidth: types.number(element.strokeWidth, { range: [0, 100] }),
                    fontSize: types.number(element.fontSize ? parseInt(element.fontSize) : 30, { range: [0, 100] }),
                    strkdsar: types.number(element.strokeDashArray ? parseInt(element.strokeDashArray) : 0, { range: [0, 1000] }),
                    strkDsOfst: types.number(element.strokeDashOffset ? parseInt(element.strokeDashOffset) : 0, { range: [-1000, 1000] }),
                    ...obj1,

                    skewX: types.number(element.skewX, { range: [-88, 88] }),
                    skewY: types.number(element.skewY, { range: [-60, 60] }),
                });

                arrObject[i].onValuesChange((val) => {
                    var obj2 = {};
                    if (isColorObjectfill) {
                        obj2 = {
                            ...obj2,
                            fill: val.fill,
                        };
                    }
                    if (isColorObjectStroke) {
                        obj2 = {
                            ...obj2,
                            stroke: val.stroke,
                        };
                    }
                    element.set({
                        left: val.left,
                        top: val.top,
                        opacity: val.opacity,
                        scaleX: val.scaleX,
                        scaleY: val.scaleY,
                        angle: val.angle,
                        rx: val.rx,
                        ry: val.ry,
                        strokeWidth: val.strokeWidth,
                        fontSize: val.fontSize,
                        strokeDashArray: [val.strkdsar, val.strkdsar],
                        strokeDashOffset: val.strkDsOfst,
                        shadow: val.shadow,
                        ...obj2,
                        skewX: val.skewX,
                        skewY: val.skewY,
                    });
                    element.setCoords();
                    canvas.requestRenderAll();
                });
                const onMouseMove = (obj, event) => {
                    if (mouseDown === 1) {
                        studio.transaction(({ set }) => {
                            set(obj.props.left, event.target.left);
                            set(obj.props.top, event.target.top);
                            set(obj.props.angle, event.target.angle);
                        });
                    }
                };
                const onScaling = (obj, event) => {
                    studio.transaction(({ set }) => {
                        set(obj.props.scaleX, event.transform.target.scaleX);
                        set(obj.props.scaleY, event.transform.target.scaleY);
                    });
                };
                const onMousedblclick = (obj, event) => {
                    studio.transaction(({ unset }) => {
                        unset(obj.props);
                    });
                };
                element.on('mousedown', () => studio.setSelection([arrObject[i]]), false);
                element.on('mousemove', (e) => onMouseMove(arrObject[i], e), false);
                element.on('scaling', (e) => onScaling(arrObject[i], e), false);
                element.on('mousedblclick', (e) => onMousedblclick(arrObject[i], e), false);
            })
        })
    }
    const reset = () => {
        localStorage.removeItem('theatre-0.4.persistent');
        window.location.reload();
    }

    const pause = layerNumber => {
        endpoint(`call 1-${layerNumber} sheet.sequence.pause()`);
        executeScript(`sheet.sequence.pause()`);
    }
    const resume = layerNumber => {
        endpoint(`call 1-${layerNumber} sheet.sequence.play({ iterationCount: ${(parseInt(loopcount) === 0) ? Infinity : parseInt(loopcount)}, range: [0, ${duration}] });
        `)
        executeScript(`sheet.sequence.play({ iterationCount: ${(parseInt(loopcount) === 0) ? Infinity : parseInt(loopcount)}, range: [0, ${duration}] })`);

    }
    const playtoCasparcg = (layerNumber = templateLayers.theatrejs) => {
        const content = JSON.stringify(canvas.toJSON(['id', 'class', 'selectable']));
        const content2 = content.replaceAll('"', '\\"');
        const state1 = (JSON.stringify(studio.createContentOfSaveFile(projectId)));

        const scriptforCasparcg = `
       
        localStorage.removeItem('theatre-0.4.persistent');
        var mouseDown = 0;
        document.body.onmousedown = function () {
            mouseDown = 1;
        };
        document.body.onmouseup = function () {
            mouseDown = 0;
        };
        
        document.getElementById('divid_${layerNumber}')?.remove();
        var aa = document.createElement('div');
        aa.style.position='absolute';
        aa.setAttribute('id','divid_' + '${layerNumber}');
        document.body.style.overflow='hidden';
        aa.innerHTML += \`<canvas id='canvas' width='1920' height='1080'></canvas>;\`;
        document.body.appendChild(aa);
        var canvas = new fabric.Canvas('canvas');
        window.canvas=canvas;
        canvas.preserveObjectStacking = true;
        const content =\`${content2}\`;
        const shadowOptions = {
            color: '#000000',
            blur: 30,
            offsetX: 0,
            offsetY: 0,
            affectStroke: false
        };
       
        __TheatreJS_StudioBundle._studio.initialize();
        __TheatreJS_StudioBundle._studio.ui.hide();
        const arrObject = [];
        window.changePropOfObject = (id, str1, str2) => {
            const objs = arrObject.filter(object => {
                return (object.address.objectKey === id)
            });
            if (objs[0]) {
                const obj = objs[0];
                window.studio.transaction(({ set }) => {
                    set(obj.props[str1], str2);
                });
            }
        };
        canvas.loadFromJSON(content,()=>{
            const { core } = __TheatreJS_StudioBundle._coreBundle._studio;
            const { _studio } = __TheatreJS_StudioBundle._coreBundle;
            window.studio=_studio;
           
            window.project = core.getProject('${'project' + fabric.Object.__uid++}', {state:${(state1.replaceAll('"', "'")).replaceAll("\\'", '\\"')}});
            window.sheet = project.sheet('Sheet 1');
            project.ready.then(() => {
                sheet.sequence.play({ iterationCount: ${(parseInt(loopcount) === 0) ? Infinity : parseInt(loopcount)}, range: [0, ${duration}] });
            });
           
            canvas.getObjects().forEach((element,i) => {
              var obj1 = {};
              const isnotGradientfill = (element.fill.type!=='linear');
              if (isnotGradientfill) {
                  obj1 = {
                      ...obj1,
                      fill: core.types.rgba(element.fill),
                  };
              }
              const isnotGradientstroke= (element.stroke.type!=='linear');
              if (isnotGradientstroke) {
                  obj1 = {
                      ...obj1,
                      stroke: core.types.rgba(element.stroke),
                  };
              }
              arrObject[i] = sheet.object(element.id, {
                    left: element.left,
                    top: element.top,
                    opacity: core.types.number(element.opacity, { nudgeMultiplier: 0.1 }),
                    scaleX: core.types.number(element.scaleX, { nudgeMultiplier: 0.01 }),
                    scaleY: core.types.number(element.scaleY, { nudgeMultiplier: 0.01 }),
                    angle: element.angle,
                    rx: core.types.number(element.rx ? element.rx : 10, { range: [0, 100] }),
                    ry: core.types.number(element.ry ? element.rx : 10, { range: [0, 100] }),
                    strokeWidth: core.types.number(element.strokeWidth, { range: [0, 100] }),
                    fontSize: core.types.number(element.fontSize ? parseInt(element.fontSize) : 30, { range: [0, 100] }),
                    strkdsar: core.types.number(element.strokeDashArray ? parseInt(element.strokeDashArray) : 0, { range: [0, 1000] }),
                    strkDsOfst: core.types.number(element.strokeDashOffset ? parseInt(element.strokeDashOffset) : 0, { range: [-1000, 1000] }),
                    shadow: { ...shadowOptions, color:(core.types.rgba(element.shadow.color)) , blur: core.types.number(parseInt(element.shadow.blur), { range: [0, 100] }) },
                    ...obj1,
                    skewX: core.types.number(element.skewX, { range: [-60, 60] }),
                    skewY: core.types.number(element.skewY, { range: [-60, 60] }),

                });
                arrObject[i].onValuesChange((val) => {
                    var obj2 = {};
                    if (isnotGradientfill) {
                        obj2 = {
                            ...obj2,
                            fill: val.fill,
                        };
                    }
                    if (isnotGradientstroke) {
                        obj2 = {
                            ...obj2,
                            stroke: val.stroke,
                        };
                    }
                        element.set({
                            left: val.left,
                            top: val.top,
                          
                            opacity: val.opacity,
                            scaleX: val.scaleX,
                            scaleY: val.scaleY,
                            angle: val.angle,
                            rx: val.rx,
                            ry: val.ry,
                            strokeWidth: val.strokeWidth,
                            fontSize: val.fontSize,
                            strokeDashArray: [val.strkdsar, val.strkdsar],
                            strokeDashOffset: val.strkDsOfst,
                            shadow: val.shadow,
                           ...obj2,
                            skewX: val.skewX,
                            skewY: val.skewY,
                        });
                        element.setCoords();
                        canvas.requestRenderAll();
                });
                        const onMouseMove = (obj, event) => {
                            if (mouseDown === 1) {
                                studio.transaction(({ set }) => {
                                    set(obj.props.left, event.target.left);
                                    set(obj.props.top, event.target.top);
                                    set(obj.props.angle, event.target.angle);
                                });
                            }
                        };
                        const onScaling = (obj, event) => {
                            studio.transaction(({ set }) => {
                                set(obj.props.scaleX, event.transform.target.scaleX);
                                set(obj.props.scaleY, event.transform.target.scaleY);
                            });
                        };
                        const onMousedblclick = (obj, event) => {
                            studio.transaction(({ unset }) => {
                                unset(obj.props);
                            });
                        };
                        const onMousedown = (obj, event) => {
                            studio.setSelection(obj, false);
                        };
                        element.on('mousedown', (e) => onMousedown(arrObject[i], e), false);
                        element.on('mousemove', (e) => onMouseMove(arrObject[i], e), false);
                        element.on('scaling', (e) => onScaling(arrObject[i], e), false);
                        element.on('mousedblclick', (e) => onMousedblclick(arrObject[i], e), false);
            });
        });
        `

        executeScript(scriptforCasparcg);
        endpoint(`play 1-${layerNumber} [html] "http://localhost:10000/ReactCasparClient/Theatrejs2"`);
        endpoint(`call 1-${layerNumber} "${scriptforCasparcg}"`)
    }

    const stopGraphics1 = (layerNumber) => {
        endpoint(`stop 1-${layerNumber}`);
        executeScript(`document.getElementById('divid_${layerNumber}')?.remove();`);

    }
    const exportHtml = async (overRide = false) => {
        const xx4 = `
        const arrObject = [];
        window.changePropOfObject = (id, str1, str2) => {
            const objs = arrObject.filter(object => {
                return (object.address.objectKey === id)
            });
            if (objs[0]) {
                const obj = objs[0];
                window.studio.transaction(({ set }) => {
                    set(obj.props[str1], str2);
                });
            }
        };
        canvas.getObjects().forEach((element,i) => {
            if(window.caspar || window.casparcg || window.tickAnimations)  {
                if ((element.id).startsWith("ccg")){
                    element.set({visible: false});
                }
            }
            var obj1 = {};
            const isnotGradientfill = (element.fill.type!=='linear');
            if (isnotGradientfill) {
                obj1 = {
                    ...obj1,
                    fill: core.types.rgba(element.fill),
                };
            }
            const isnotGradientstroke= (element.stroke.type!=='linear');
            if (isnotGradientstroke) {
                obj1 = {
                    ...obj1,
                    stroke: core.types.rgba(element.stroke),
                };
            }
            arrObject[i] = sheet.object(element.id, {
                left: element.left,
                left: element.left,
                top: element.top,
                opacity: core.types.number(element.opacity, { nudgeMultiplier: 0.1 }),
                scaleX: core.types.number(element.scaleX, { nudgeMultiplier: 0.01 }),
                scaleY: core.types.number(element.scaleY, { nudgeMultiplier: 0.01 }),
                angle: element.angle,
               
                rx: core.types.number(element.rx ? element.rx : 10, { range: [0, 100] }),
                ry: core.types.number(element.ry ? element.rx : 10, { range: [0, 100] }),
                strokeWidth: core.types.number(element.strokeWidth, { range: [0, 100] }),
               
                fontSize: core.types.number(element.fontSize ? parseInt(element.fontSize) : 30, { range: [0, 100] }),
                strkdsar: core.types.number(element.strokeDashArray ? parseInt(element.strokeDashArray) : 0, { range: [0, 1000] }),
                strkDsOfst: core.types.number(element.strokeDashOffset ? parseInt(element.strokeDashOffset) : 0, { range: [-1000, 1000] }),
                shadow: { ...shadowOptions, color: core.types.rgba(element.shadow.color), blur: core.types.number(parseInt(element.shadow.blur), { range: [0, 100] }) },
                ...obj1,
                skewX: core.types.number(element.skewX, { range: [-60, 60] }),
                skewY: core.types.number(element.skewY, { range: [-60, 60] }),
            });`

        const xx5 = ` arrObject[i].onValuesChange((val) => {
            var obj2 = {};
            if (isnotGradientfill) {
                obj2 = {
                    ...obj2,
                    fill: val.fill,
                };
            }
            if (isnotGradientstroke) {
                obj2 = {
                    ...obj2,
                    stroke: val.stroke,
                };
            }
                        element.set({
                            left: val.left,
                            top: val.top,
                            opacity: val.opacity,
                            scaleX: val.scaleX,
                            scaleY: val.scaleY,
                            angle: val.angle,
                            rx: val.rx,
                            ry: val.ry,
                            strokeWidth: val.strokeWidth,
                            fontSize: val.fontSize,
                            strokeDashArray: [val.strkdsar, val.strkdsar],
                            strokeDashOffset: val.strkDsOfst,
                            shadow: val.shadow,
                           ...obj2,
                            skewX: val.skewX,
                            skewY: val.skewY,
                });
                element.setCoords();
                canvas.requestRenderAll();
            });
            const onMouseMove = (obj, event) => {
                if (mouseDown === 1) {
                    studio.transaction(({ set }) => {
                        set(obj.props.left, event.target.left);
                        set(obj.props.top, event.target.top);
                        set(obj.props.angle, event.target.angle);
                    });
                }
            };
            const onScaling = (obj, event) => {
                studio.transaction(({ set }) => {
                    set(obj.props.scaleX, event.transform.target.scaleX);
                    set(obj.props.scaleY, event.transform.target.scaleY);
                });
            };
            const onMousedblclick = (obj, event) => {
                studio.transaction(({ unset }) => {
                    unset(obj.props);
                });
            };
            element.on('mousedown', () => studio.setSelection([arrObject[i]]), false);
            element.on('mousemove', (e) => onMouseMove(arrObject[i], e), false);
            element.on('scaling', (e) => onScaling(arrObject[i], e), false);
            element.on('mousedblclick', (e) => onMousedblclick(arrObject[i], e), false);
            `

        const aa =
            `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
                <script>${fabric1}<//script>
                <script>${coreAndStudio1}<//script>
        </head>

        <body style='overflow:hidden'>

    <div><canvas id='canvas' width='1920' height='1080'></canvas></div>
    <script type="module">
        localStorage.removeItem('theatre-0.4.persistent');
        var mouseDown = 0;
        document.body.onmousedown = function () {
            mouseDown = 1;
        };
        document.body.onmouseup = function () {
            mouseDown = 0;
        };
    const hexToRGB = hex => {
        const red = parseInt(hex.slice(1, 3), 16)
        const green = parseInt(hex.slice(3, 5), 16)
        const blue = parseInt(hex.slice(5, 7), 16)
        return {r:red/255, g:green/255, b:blue/255, a:1} // return an object
        // return [ r, g, b ]
    }
         const shadowOptions = {
            color: '#000000',
            blur: 30,
            offsetX: 0,
            offsetY: 0,
            affectStroke: false
        };
        var canvas = new fabric.Canvas('canvas');
        window.canvas=canvas;
        canvas.preserveObjectStacking = true;
        const content =${JSON.stringify(canvas.toJSON(['id', 'class', 'selectable']))};
        const { core, studio } = Theatre;
        studio.initialize();
        studio.ui.hide();
        window.studio=studio;
        const project = core.getProject('${projectId}', {state:${JSON.stringify(studio.createContentOfSaveFile(projectId))}});
        const sheet = project.sheet('Sheet 1')
        canvas.loadFromJSON(content, ()=> {
            ${xx4}
            ${xx5}
        })
        });
        project.ready.then(() => {
            sheet.sequence.play({ iterationCount: ${(parseInt(loopcount) === 0) ? Infinity : parseInt(loopcount)}, range: [0, ${duration}] });
        })
         <//script>
         <script>
         var dataCaspar = {};
         function escapeHtml(unsafe) {
             return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
         }
         function parseCaspar(str) {
             var xmlDoc;
             if (window.DOMParser) {
                 parser = new DOMParser();
                 xmlDoc = parser.parseFromString(str, "text/xml");
             }
             dataCaspar = XML2JSON(xmlDoc.documentElement.childNodes);
         }
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
         function dataInsert(dataCaspar) {
             for (var idCaspar in dataCaspar) {
                 const aa = canvas.getObjects().filter((item) => {
                     return item.id === idCaspar;
                 })
                 const element = aa[0];
                 if (element.type === 'image') {
                    fabric.Image.fromURL( escapeHtml(dataCaspar[idCaspar]), img => {
                        img.set({ scaleX: element.width / img.width, scaleY: (element.height / img.height) })
                        img.cloneAsImage(img1 => {
                            element.setSrc(img1.getSrc(), () => {
                                element.set({ visible: true });
                                canvas.requestRenderAll();
                            })
                        })
                    })
                }
                 else {
                     const originalWidth = element.width;
                     element.set({ text: escapeHtml(dataCaspar[idCaspar]),objectCaching: false });
                     element.set({visible: true});

                    if (element.textLines.length > 1) {
                    do {
                        element.set({ width: element.width + 5 });
                    }
                    while (element.textLines.length > 1);
                    element.set({ scaleX: originalWidth / element.width });
                    }
                 }
                 canvas.requestRenderAll()
             }
         }
 
         function update(str) {
             parseCaspar(str); // Parse templateData into an XML object
             dataInsert(dataCaspar); // Insert data
         }
 
         function play(str) {
             parseCaspar(str); // Parse templateData into an XML object
             dataInsert(dataCaspar); // Insert data
         }
         function stop() {
             document.body.innerHTML = '';
         }
 
         function updatestring(str1, str2) {
            const aa = canvas.getObjects().filter((item) => {
              return item.id === str1;
            })
            const element = aa[0];
            const originalWidth = element.width;
            element.set({ objectCaching: false, text: str2, visible: true })
            if (element.textLines.length > 1) {
              do {
                element.set({ width: element.width + 5 });
              }
              while (element.textLines.length > 1);
              element.set({ scaleX: originalWidth / element.width });
            }
            canvas.requestRenderAll();
          }
        function updateimage(str1, str2) {
            const aa = canvas.getObjects().filter((item) => {
                return item.id === str1;
            })
            const element = aa[0];
            fabric.Image.fromURL(str2, img => {
                img.set({ scaleX: element.width / img.width, scaleY: (element.height / img.height) })
                img.cloneAsImage(img1 => {
                    element.setSrc(img1.getSrc(), () => {
                        element.set({ visible: true });
                        canvas.requestRenderAll();
                    })
                })
            })
        }
     <//script>
         </body>
     </html>`

        const bb = aa.replaceAll('<//', '</')
        const file = new Blob([bb], { type: 'text/html' });
        var ss = new Date().toLocaleTimeString('en-US', { year: "numeric", month: "numeric", day: "numeric", hour12: false, hour: "numeric", minute: "numeric", second: "numeric" });
        const options = {
            suggestedName: ss,
            types: [{
                description: 'Html file',
                accept: { 'text/html': ['.html'] },
            }],
        };
        var aa1;
        if (overRide) {
            aa1 = htmlfileHandle;
        }
        else {
            aa1 = await window.showSaveFilePicker(options);
        }
        sethtmlfileHandle(aa1)
        const writable = await aa1.createWritable();
        await writable.write(file);
        await writable.close();
    }

    const importHtml = async () => {


        const [aa] = await window.showOpenFilePicker();

        if (aa) {

            sethtmlfileHandle(aa);
            deleteAllObjects()
            const file = await aa.getFile();
            const content = await file.text();
            var canvasContent = content.split('const content =')[1].split(']};')[0] + ']}';

            // console.log(canvasContent)
            var animationContetent = content.split('{state:')[1].split('});')[0];

            // console.log(animationContetent);
            const pid = `project${fabric.Object.__uid++}`;
            project = getProject(pid, { state: JSON.parse(animationContetent) });
            setProjectId(pid)

            sheet = project.sheet('Sheet 1');
            project.ready.then(() => {
                sheet.sequence.play({ iterationCount: Infinity, range: [0, 2] });
            });

            initialiseCore(canvasContent, true);
        }

    }

    // const changePropOfObject = (id, str1, str2) => {
    //     const objs = arrObject.filter(object => {
    //         return object?.address?.objectKey === id
    //     })
    //     if (objs[0]) {
    //         const obj = objs[0];
    //         studio.transaction(({ set }) => {
    //             set(obj.props[str1], str2);
    //             set(obj.props.fill, { r: 1, g: 1, b: 0, a: 1 });
    //         });
    //     }
    // }

    // eslint-disable-next-line 
    const goto = () => {
        sheet.sequence.position = 0.5
        studio.transaction(({ set }) => {
            set(arrObject[0].props.scaleX, 0.5)
        })
        sheet.sequence.play();
        console.log(arrObject[0].value.left)
        onChange(arrObject[0].props.left, (left) => {
            console.log(left)
        })
        console.log('current left is', val(arrObject[0].props.left))
    }

    return (<>

        <div style={{ textAlign: 'center' }}>

            <button onClick={() => {
                deleteAllObjects();
                initialiseCore(RCCtheatrepageData);
            }}>Data from RCC</button>
            <button onClick={() => reset()}>Reset</button>
            <span>Caspar Control:</span>
            <button onClick={() => playtoCasparcg(templateLayers.theatrejs)}><FaPlay /></button>
            <button onClick={() => pause(templateLayers.theatrejs)}><FaPause /></button>
            <button title='Resume' onClick={() => resume(templateLayers.theatrejs)}><FaPause /><FaPlay /></button>

            <button onClick={() => stopGraphics1(templateLayers.theatrejs)}><FaStop /></button>
            <span>Duration:</span><input type="number" value={duration} style={{ width: 30 }} onChange={e => setDuration(e.target.value)} />

            <span title="Put 0 for Infinity">Loop Count:</span><input title="Put 0 for Infinity" type="number" value={loopcount} style={{ width: 30 }} onChange={e => setLoopcount(e.target.value)} />

            <button onClick={() => exportHtml()}>Export Html</button>
            {htmlfileHandle && <button onClick={() => exportHtml(true)}>Overwrite</button>}
            {htmlfileHandle?.name}
            <button onClick={() => importHtml()}>Import Html</button>
            {/* <button onClick={() => goto()}>goto</button> */}
            {/* <button onClick={() => changePropOfObject(studio.selection[0]?.address?.objectKey, 'top', 100)}>changePropOfObject</button> */}


            Client Id<input title='Put Unique Id so that other may not interfere' style={{ width: 100 }} type={'text'} value={clientId} onChange={e => {
                dispatch({ type: 'CHANGE_CLIENTID', payload: e.target.value })
            }} />

            {projectId}

            <DrawingforTheatrejs />
        </div>
    </>)
}

export default WebAnimator