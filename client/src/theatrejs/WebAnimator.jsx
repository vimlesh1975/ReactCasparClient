import React, { useEffect, useState } from 'react'

import studio from '@theatre/studio'
import { getProject, types } from '@theatre/core'
import DrawingforTheatrejs from '../DrawingforTheatrejs'
import { useSelector } from 'react-redux'

import { endpoint, templateLayers, shadowOptions } from '../common'

const project = getProject('HTML Animation Tutorial', {})




const sheet = project.sheet('Sheet 1');

const WebAnimator = ({ canvasObjects = { "version": "5.2.4", "objects": [{ "type": "ellipse", "version": "5.2.4", "originX": "left", "originY": "top", "left": 180, "top": 330, "width": 100, "height": 160, "fill": "#0000ff", "stroke": "#ffffff", "strokeWidth": 3, "strokeDashArray": null, "strokeLineCap": "butt", "strokeDashOffset": 0, "strokeLineJoin": "miter", "strokeUniform": true, "strokeMiterLimit": 4, "scaleX": 1, "scaleY": 1, "angle": 0, "flipX": false, "flipY": false, "opacity": 0.9, "shadow": { "color": "black", "blur": 30, "offsetX": 0, "offsetY": 0, "affectStroke": false, "nonScaling": false }, "visible": true, "backgroundColor": "", "fillRule": "nonzero", "paintFirst": "fill", "globalCompositeOperation": "source-over", "skewX": 0, "skewY": 0, "rx": 50, "ry": 80, "id": "ccg_11", "class": "class_11", "selectable": true }, { "type": "circle", "version": "5.2.4", "originX": "left", "originY": "top", "left": 150, "top": 0, "width": 200, "height": 200, "fill": "#0000ff", "stroke": "#ffffff", "strokeWidth": 3, "strokeDashArray": null, "strokeLineCap": "butt", "strokeDashOffset": 0, "strokeLineJoin": "miter", "strokeUniform": true, "strokeMiterLimit": 4, "scaleX": 1, "scaleY": 1, "angle": 0, "flipX": false, "flipY": false, "opacity": 1, "shadow": { "color": "black", "blur": 30, "offsetX": 0, "offsetY": 0, "affectStroke": false, "nonScaling": false }, "visible": true, "backgroundColor": "", "fillRule": "nonzero", "paintFirst": "fill", "globalCompositeOperation": "source-over", "skewX": 0, "skewY": 0, "radius": 100, "startAngle": 0, "endAngle": 360, "id": "ccg_12", "class": "class_12", "selectable": true }] } }) => {
    const [showStudio, setShowStudio] = useState(true)
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const [RCCtheatrepageData, setRCCtheatrepageData] = useState(canvasObjects)
    useEffect(() => {

        studio.initialize()
        studio.ui.restore();
        setRCCtheatrepageData(localStorage.getItem("RCCtheatrepageData"))
        return () => {
            // second  
        }
    }, [])

    const initialiseCore = () => {
        const hexToRGB = hex => {
            const red = parseInt(hex.slice(1, 3), 16)
            const green = parseInt(hex.slice(3, 5), 16)
            const blue = parseInt(hex.slice(5, 7), 16)
            return { r: red / 255, g: green / 255, b: blue / 255, a: 1 } // return an object
        }
        var mouseDown = 0;
        document.body.onmousedown = function () {
            mouseDown = 1;
        }
        document.body.onmouseup = function () {
            mouseDown = 0;
        }
        // const content = { "version": "5.2.4", "objects": [{ "type": "ellipse", "version": "5.2.4", "originX": "left", "originY": "top", "left": 180, "top": 330, "width": 100, "height": 160, "fill": "#0000ff", "stroke": "#ffffff", "strokeWidth": 3, "strokeDashArray": null, "strokeLineCap": "butt", "strokeDashOffset": 0, "strokeLineJoin": "miter", "strokeUniform": true, "strokeMiterLimit": 4, "scaleX": 1, "scaleY": 1, "angle": 0, "flipX": false, "flipY": false, "opacity": 0.9, "shadow": { "color": "black", "blur": 30, "offsetX": 0, "offsetY": 0, "affectStroke": false, "nonScaling": false }, "visible": true, "backgroundColor": "", "fillRule": "nonzero", "paintFirst": "fill", "globalCompositeOperation": "source-over", "skewX": 0, "skewY": 0, "rx": 50, "ry": 80, "id": "ccg_11", "class": "class_11", "selectable": true }, { "type": "circle", "version": "5.2.4", "originX": "left", "originY": "top", "left": 150, "top": 0, "width": 200, "height": 200, "fill": "#0000ff", "stroke": "#ffffff", "strokeWidth": 3, "strokeDashArray": null, "strokeLineCap": "butt", "strokeDashOffset": 0, "strokeLineJoin": "miter", "strokeUniform": true, "strokeMiterLimit": 4, "scaleX": 1, "scaleY": 1, "angle": 0, "flipX": false, "flipY": false, "opacity": 1, "shadow": { "color": "black", "blur": 30, "offsetX": 0, "offsetY": 0, "affectStroke": false, "nonScaling": false }, "visible": true, "backgroundColor": "", "fillRule": "nonzero", "paintFirst": "fill", "globalCompositeOperation": "source-over", "skewX": 0, "skewY": 0, "radius": 100, "startAngle": 0, "endAngle": 360, "id": "ccg_12", "class": "class_12", "selectable": true }] };
        canvas.loadFromJSON(RCCtheatrepageData, () => {
            canvas.getObjects().forEach(element => {
                const obj = sheet.object(element.id, {
                    left: element.left,
                    top: element.top,
                });



                const onMouseMove = (obj, event) => {
                    if (mouseDown === 1) {
                        studio.transaction(({ set }) => {
                            set(obj.props.left, event.target.left);
                            set(obj.props.top, event.target.top);
                            set(obj.props.width, event.target.width);
                            set(obj.props.angle, event.target.angle);
                        });
                    }

                };
                const onScaling = (obj, event) => {
                    // console.log(event)
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

                element.on("mousedown", () => studio.setSelection([obj]), false);
                element.on("mousemove", (e) => onMouseMove(obj, e), false);
                element.on("scaling", (e) => onScaling(obj, e), false);
                element.on("mousedblclick", (e) => onMousedblclick(obj, e), false);

                obj.onValuesChange((obj) => {
                    element.set({
                        left: obj.left,
                        top: obj.top,

                    });
                    console.log(sheet.sequence);
                    element.setCoords();
                    canvas.requestRenderAll();
                });
            })
            project.ready.then(() => {
                sheet.sequence.play({ iterationCount: Infinity, range: [0, 2] });
            });
        })


    }
    const reset = () => {
        localStorage.removeItem("theatre-0.4.persistent");
        window.location.reload();
    }


    const playtoCasparcg = (layerNumber = templateLayers.theatrejs) => {
        endpoint(`stop 1-${layerNumber}`)

        setTimeout(() => {
            endpoint(`play ${1}-${layerNumber} [HTML] xyz.html`);
        }, 100);



        const content = JSON.stringify(canvas.toJSON(['id', 'class', 'selectable']));
        const content2 = content.replaceAll('"', '\\"');
        var script1 = `"
        var script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/fabric.js/6.0.0-rc.1/fabric.min.js';
        document.head.appendChild(script);  
        "`
        setTimeout(() => {
            endpoint(`call 1-166 ${script1}`)
        }, 300);

        var script3 = `"
        document.body.style.overflow='hidden';
        document.body.innerHTML += \`<canvas id='canvas' width='1920' height='1080'></canvas>;\`;
        var canvas = new fabric.Canvas('canvas');
        const content =\`${content2}\`;
        var script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@theatre/browser-bundles@0.6.0-dev.4/dist/core-only.min.js';
        document.head.appendChild(script);
        "`
        setTimeout(() => {
            endpoint(`call 1-166 ${script3}`)
        }, 3000);

        const state1 = (JSON.stringify(studio.createContentOfSaveFile('HTML Animation Tutorial')));

        var script4 = `"
        const hexToRGB = hex => {
            const red = parseInt(hex.slice(1, 3), 16);
            const green = parseInt(hex.slice(3, 5), 16);
            const blue = parseInt(hex.slice(5, 7), 16);
            return { r: red / 255, g: green / 255, b: blue / 255, a: 1 } ;
        };
        canvas.loadFromJSON(content,()=>{
            const { core } = Theatre;
            window.project = core.getProject('HTML Animation Tutorial', {state:${(state1.replaceAll('"', "'")).replaceAll("\\'", '\\"')}});
            window.sheet = project.sheet('Sheet 1');
            project.ready.then(() => {
                sheet.sequence.play({ iterationCount: Infinity, range: [0, 2] });
            });
            canvas.getObjects().forEach(element => {
                const obj = sheet.object(element.id, {
                    left: element.left,
                    top: element.top,
                    width: element.width,
                    height: element.height,
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
                });
                obj.onValuesChange((obj) => {
                        element.set({
                            left: obj.left,
                            top: obj.top,
                            width: obj.width,
                            height: obj.height,
                            opacity: obj.opacity,
                            scaleX: obj.scaleX,
                            scaleY: obj.scaleY,
                            angle: obj.angle,
                            rx: obj.rx,
                            ry: obj.ry,
                            strokeWidth: obj.strokeWidth,
                          
                            fontSize: obj.fontSize,
                            strokeDashArray: [obj.strkdsar, obj.strkdsar],
                            strokeDashOffset: obj.strkDsOfst
                        });
                        element.setCoords();
                        canvas.renderAll();
                });
            });
            console.log(project.isReady);
        });
        "`
        setTimeout(() => {
            endpoint(`call 1-166 ${script4}`)
        }, 5000);

    }

    const stopGraphics1 = (layerNumber) => {
        endpoint(`stop 1-${layerNumber}`)
    }
    return (<>

        <div style={{ textAlign: 'center' }}>
            <button onClick={() => {
                if (showStudio) {
                    studio.ui.hide();
                }
                else {
                    studio.ui.restore();
                }
                setShowStudio(val => !val);

            }}>{showStudio ? 'Hide Studio' : 'Show Studio'}</button>
            <button onClick={() => initialiseCore()}>initialiseCore</button>
            <button onClick={() => reset()}>Reset</button>
            <button onClick={() => playtoCasparcg(templateLayers.theatrejs)}>Play</button>
            <button onClick={() => stopGraphics1(templateLayers.theatrejs)}>Stop</button>

            <DrawingforTheatrejs />
        </div>
    </>)
}

export default WebAnimator