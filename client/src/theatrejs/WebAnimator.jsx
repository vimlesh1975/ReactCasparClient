import React, { useEffect } from 'react'

import studio from '@theatre/studio'
import { getProject, types } from '@theatre/core'
import DrawingforTheatrejs from '../DrawingforTheatrejs'
import { useSelector } from 'react-redux'

import { shadowOptions } from '../common'
import { useState } from 'react'
/**
 * Theatre.js
 */
const project = getProject('HTML Animation Tutorial', {

})
const sheet = project.sheet('Sheet 1');

const WebAnimator = ({ canvasObjects = { "version": "5.2.4", "objects": [{ "type": "ellipse", "version": "5.2.4", "originX": "left", "originY": "top", "left": 180, "top": 330, "width": 100, "height": 160, "fill": "#0000ff", "stroke": "#ffffff", "strokeWidth": 3, "strokeDashArray": null, "strokeLineCap": "butt", "strokeDashOffset": 0, "strokeLineJoin": "miter", "strokeUniform": true, "strokeMiterLimit": 4, "scaleX": 1, "scaleY": 1, "angle": 0, "flipX": false, "flipY": false, "opacity": 0.9, "shadow": { "color": "black", "blur": 30, "offsetX": 0, "offsetY": 0, "affectStroke": false, "nonScaling": false }, "visible": true, "backgroundColor": "", "fillRule": "nonzero", "paintFirst": "fill", "globalCompositeOperation": "source-over", "skewX": 0, "skewY": 0, "rx": 50, "ry": 80, "id": "ccg_11", "class": "class_11", "selectable": true }, { "type": "circle", "version": "5.2.4", "originX": "left", "originY": "top", "left": 150, "top": 0, "width": 200, "height": 200, "fill": "#0000ff", "stroke": "#ffffff", "strokeWidth": 3, "strokeDashArray": null, "strokeLineCap": "butt", "strokeDashOffset": 0, "strokeLineJoin": "miter", "strokeUniform": true, "strokeMiterLimit": 4, "scaleX": 1, "scaleY": 1, "angle": 0, "flipX": false, "flipY": false, "opacity": 1, "shadow": { "color": "black", "blur": 30, "offsetX": 0, "offsetY": 0, "affectStroke": false, "nonScaling": false }, "visible": true, "backgroundColor": "", "fillRule": "nonzero", "paintFirst": "fill", "globalCompositeOperation": "source-over", "skewX": 0, "skewY": 0, "radius": 100, "startAngle": 0, "endAngle": 360, "id": "ccg_12", "class": "class_12", "selectable": true }] } }) => {
    const [showStudio, setShowStudio] = useState(true)
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const [RCCtheatrepageData, setRCCtheatrepageData] = useState(canvasObjects)
    useEffect(() => {

        studio.initialize()
        // studio.ui.hide()
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
            // return [ r, g, b ]
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
                    width: element.width,
                    height: element.height,
                    opacity: types.number(element.opacity, { nudgeMultiplier: 0.1 }),
                    scaleX: types.number(element.scaleX, { nudgeMultiplier: 0.01 }),
                    scaleY: types.number(element.scaleY, { nudgeMultiplier: 0.01 }),
                    angle: element.angle,
                    fill: types.rgba(hexToRGB(element.fill ? element.fill : '#ff0000')),
                    rx: types.number(element.rx ? element.rx : 10, { range: [0, 100] }),
                    ry: types.number(element.ry ? element.rx : 10, { range: [0, 100] }),
                    strokeWidth: types.number(element.strokeWidth, { range: [0, 100] }),
                    stroke: types.rgba(element.stroke ? hexToRGB(element.stroke) : hexToRGB('#000000')),
                    shadow: { ...shadowOptions, color: types.rgba(hexToRGB(element.shadow.color)), blur: types.number(parseInt(element.shadow.blur), { range: [0, 100] }) },
                    fontSize: types.number(element.fontSize ? parseInt(element.fontSize) : 30, { range: [0, 100] }),
                    strkdsar: types.number(element.strokeDashArray ? parseInt(element.strokeDashArray) : 0, { range: [0, 1000] }),
                    strkDsOfst: types.number(element.strokeDashOffset ? parseInt(element.strokeDashOffset) : 0, { range: [-1000, 1000] }),
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
                        width: obj.width,
                        height: obj.height,
                        opacity: obj.opacity,
                        scaleX: obj.scaleX,
                        scaleY: obj.scaleY,
                        angle: obj.angle,
                        fill: obj.fill,
                        rx: obj.rx,
                        ry: obj.ry,
                        strokeWidth: obj.strokeWidth,
                        stroke: obj.stroke,
                        shadow: obj.shadow,
                        fontSize: obj.fontSize,
                        strokeDashArray: [obj.strkdsar, obj.strkdsar],
                        strokeDashOffset: obj.strkDsOfst
                    });
                    element.setCoords();
                    canvas.requestRenderAll();
                });

            })
        })


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

            <DrawingforTheatrejs />
        </div>
    </>)
}

export default WebAnimator