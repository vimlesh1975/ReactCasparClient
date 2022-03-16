import React, { } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fabric } from "fabric";
import { v4 as uuidv4 } from 'uuid';
import { shadowOptions } from './common'

var currentValue = [];
var temprect;

export const startPath = () => {
    window.editor.canvas.off('mouse:down');
    window.editor.canvas.off('mouse:move');
    currentValue = [];
    // setTimeout(() => {
    window.editor.canvas.on('mouse:down', eventHandlerMouseDown);
    window.editor.canvas.on('mouse:move', eventHandlerMouseMove);
    // }, 1000);
}
const eventHandlerMouseMove = e => {
    if (currentValue.length > 0) {
        // console.log(e.pointer.x, e.pointer.y)
        currentValue.push(['L', e.pointer.x, e.pointer.y]);
        window.editor.canvas.remove(temprect);
        temprect = new fabric.Path(currentValue, {
            shadow: shadowOptions,
            opacity: 1,
            fill: 'red',
            hasRotatingPoint: true,
            objectCaching: false,
            stroke: 'yellow',
            strokeWidth: 2,
        });
        currentValue.pop();
        window.editor.canvas.add(temprect);
        window.editor.canvas.requestRenderAll();
    }
}

const eventHandlerMouseDown = (e) => {
    if (currentValue.length === 0) {
        currentValue.push(['M', e.pointer.x, e.pointer.y])
    }
    else {
        if (currentValue[currentValue.length - 1][0] === 'M') {
            currentValue.push(['Q', (currentValue[currentValue.length - 1][1] + e.pointer.x) / 2, (currentValue[currentValue.length - 1][2] + e.pointer.y) / 2, e.pointer.x, e.pointer.y])
        }
        else {
            currentValue.push(['Q', (currentValue[currentValue.length - 1][3] + e.pointer.x) / 2, (currentValue[currentValue.length - 1][4] + e.pointer.y) / 2, e.pointer.x, e.pointer.y])
        }
    }
    if (currentValue.length > 0) {
        if (currentValue.length > 1) {
            window.editor.canvas.remove(temprect);
        }
        temprect = new fabric.Path(currentValue, {
            shadow: shadowOptions,
            opacity: 1,
            fill: 'red',
            hasRotatingPoint: true,
            objectCaching: false,
            stroke: 'yellow',
            strokeWidth: 2,
            strokeUniform: true,
            strokeLineJoin: 'round',
            originX: 'center',
            originY: 'center',
        });
        window.editor.canvas.add(temprect);
        window.editor.canvas.requestRenderAll();
    }

}




const PathModifier = () => {
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const path1 = useSelector(state => state.path1Reducer.path1);
    const dispatch = useDispatch();


    
// define a function that can locate the controls.
// this function will be used both for drawing and for interaction.
function polygonPositionHandler(dim, finalMatrix, fabricObject) {
    var pathObj = fabricObject.path[this.pointIndex]
    var x = (pathObj[1] - fabricObject.pathOffset.x),
        y = (pathObj[2] - fabricObject.pathOffset.y);
    return fabric.util.transformPoint(
        { x: x, y: y },
        fabric.util.multiplyTransformMatrices(
            fabricObject.canvas.viewportTransform,
            fabricObject.calcTransformMatrix()
        )
    );
}
function polygonPositionHandler2(dim, finalMatrix, fabricObject) {
    var pathObj = fabricObject.path[this.pointIndex]
    var x = (pathObj[3] - fabricObject.pathOffset.x),
        y = (pathObj[4] - fabricObject.pathOffset.y);
    return fabric.util.transformPoint(
        { x: x, y: y },
        fabric.util.multiplyTransformMatrices(
            fabricObject.canvas.viewportTransform,
            fabricObject.calcTransformMatrix()
        )
    );
}
function polygonPositionHandler3(dim, finalMatrix, fabricObject) {
    var pathObj = fabricObject.path[this.pointIndex]
    var x = (pathObj[5] - fabricObject.pathOffset.x),
        y = (pathObj[6] - fabricObject.pathOffset.y);
    return fabric.util.transformPoint(
        { x: x, y: y },
        fabric.util.multiplyTransformMatrices(
            fabricObject.canvas.viewportTransform,
            fabricObject.calcTransformMatrix()
        )
    );
}
// define a function that will define what the control does
// this function will be called on every mouse move after a control has been
// clicked and is being dragged.
// The function receive as argument the mouse event, the current trasnform object
// and the current position in canvas coordinate
// transform.target is a reference to the current object being transformed,
function actionHandler(eventData, transform, x, y) {
    var polygon = transform.target,
        currentControl = polygon.controls[polygon.__corner],
        mouseLocalPosition = polygon.toLocalPoint(new fabric.Point(x, y), 'center', 'center'),
        polygonBaseSize = polygon._getNonTransformedDimensions(),
        size = polygon._getTransformedDimensions(0, 0),
        finalPointPosition = {
            x: mouseLocalPosition.x * polygonBaseSize.x / size.x + polygon.pathOffset.x,
            y: mouseLocalPosition.y * polygonBaseSize.y / size.y + polygon.pathOffset.y
        };
    polygon.path[currentControl.pointIndex][1] = finalPointPosition.x;
    polygon.path[currentControl.pointIndex][2] = finalPointPosition.y;
    dispatch({ type: 'CHANGE_PATH1', payload: polygon.path });

    return true;
}
function actionHandler2(eventData, transform, x, y) {
    var polygon = transform.target,
        currentControl = polygon.controls[polygon.__corner],
        mouseLocalPosition = polygon.toLocalPoint(new fabric.Point(x, y), 'center', 'center'),
        polygonBaseSize = polygon._getNonTransformedDimensions(),
        size = polygon._getTransformedDimensions(0, 0),
        finalPointPosition = {
            x: mouseLocalPosition.x * polygonBaseSize.x / size.x + polygon.pathOffset.x,
            y: mouseLocalPosition.y * polygonBaseSize.y / size.y + polygon.pathOffset.y
        };
    polygon.path[currentControl.pointIndex][3] = finalPointPosition.x;
    polygon.path[currentControl.pointIndex][4] = finalPointPosition.y;
    dispatch({ type: 'CHANGE_PATH1', payload: polygon.path });

    return true;
}
function actionHandler3(eventData, transform, x, y) {
    var polygon = transform.target,
        currentControl = polygon.controls[polygon.__corner],
        mouseLocalPosition = polygon.toLocalPoint(new fabric.Point(x, y), 'center', 'center'),
        polygonBaseSize = polygon._getNonTransformedDimensions(),
        size = polygon._getTransformedDimensions(0, 0),
        finalPointPosition = {
            x: mouseLocalPosition.x * polygonBaseSize.x / size.x + polygon.pathOffset.x,
            y: mouseLocalPosition.y * polygonBaseSize.y / size.y + polygon.pathOffset.y
        };
    polygon.path[currentControl.pointIndex][5] = finalPointPosition.x;
    polygon.path[currentControl.pointIndex][6] = finalPointPosition.y;
    dispatch({ type: 'CHANGE_PATH1', payload: polygon.path });

    return true;
}
// define a function that can keep the polygon in the same position when we change its
// width/height/top/left.
function anchorWrapper(anchorIndex, fn) {
    return function (eventData, transform, x, y) {
        var fabricObject = transform.target,
            pathObj = fabricObject.path[anchorIndex],
            absolutePoint = fabric.util.transformPoint({
                x: (pathObj[1] - fabricObject.pathOffset.x),
                y: (pathObj[2] - fabricObject.pathOffset.y),
            }, fabricObject.calcTransformMatrix()),
            actionPerformed = fn(eventData, transform, x, y),
           /* eslint-disable no-unused-vars */
            newDim = fabricObject._setPath(fabricObject.path),
            /* eslint-disable no-unused-vars */
            polygonBaseSize = fabricObject._getNonTransformedDimensions(),
            newX = (pathObj[1] - fabricObject.pathOffset.x) / polygonBaseSize.x,
            newY = (pathObj[2] - fabricObject.pathOffset.y) / polygonBaseSize.y;
        fabricObject.setPositionByOrigin(absolutePoint, newX + 0.5, newY + 0.5);
        dispatch({ type: 'CHANGE_PATH1', payload: fabricObject.path });

        return actionPerformed;
    }
}
function anchorWrapper2(anchorIndex, fn) {
    return function (eventData, transform, x, y) {
        var fabricObject = transform.target,
            pathObj = fabricObject.path[anchorIndex],
            absolutePoint = fabric.util.transformPoint({
                x: (pathObj[3] - fabricObject.pathOffset.x),
                y: (pathObj[4] - fabricObject.pathOffset.y),
            }, fabricObject.calcTransformMatrix()),
            actionPerformed = fn(eventData, transform, x, y),
            newDim = fabricObject._setPath(fabricObject.path),
            polygonBaseSize = fabricObject._getNonTransformedDimensions(),
            newX = (pathObj[3] - fabricObject.pathOffset.x) / polygonBaseSize.x,
            newY = (pathObj[4] - fabricObject.pathOffset.y) / polygonBaseSize.y;
        fabricObject.setPositionByOrigin(absolutePoint, newX + 0.5, newY + 0.5);
        dispatch({ type: 'CHANGE_PATH1', payload: fabricObject.path });

        return actionPerformed;
    }
}
function anchorWrapper3(anchorIndex, fn) {
    return function (eventData, transform, x, y) {
        var fabricObject = transform.target,
            pathObj = fabricObject.path[anchorIndex],
            absolutePoint = fabric.util.transformPoint({
                x: (pathObj[5] - fabricObject.pathOffset.x),
                y: (pathObj[6] - fabricObject.pathOffset.y),
            }, fabricObject.calcTransformMatrix()),
            actionPerformed = fn(eventData, transform, x, y),
            newDim = fabricObject._setPath(fabricObject.path),
            polygonBaseSize = fabricObject._getNonTransformedDimensions(),
            newX = (pathObj[5] - fabricObject.pathOffset.x) / polygonBaseSize.x,
            newY = (pathObj[6] - fabricObject.pathOffset.y) / polygonBaseSize.y;
        fabricObject.setPositionByOrigin(absolutePoint, newX + 0.5, newY + 0.5);
        dispatch({ type: 'CHANGE_PATH1', payload: fabricObject.path });

        return actionPerformed;
    }
}

  function renderIcon(icon) {
    return function renderIcon(ctx, left, top, styleOverride, fabricObject) {
      var size = this.cornerSize;
      ctx.save();
    //   ctx.translate(left, top);
    //   ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
      ctx.font = "15px Georgia";
      ctx.textAlign = "center";
      ctx.fillText(icon,left,top)
      ctx.restore();
    }
  }

function edit() {
    // clone what are you copying since you
    // may want copy and paste on different moment.
    // and you do not want the changes happened
    // later to reflect on the copy.
    if (window.editor.canvas.getActiveObjects()[0]?.type === 'path') {
        var poly = window.editor.canvas.getActiveObjects()[0];
        window.editor.canvas.setActiveObject(poly);
        poly.edit = !poly.edit;
        if (poly.edit) {
            var lastControl = poly.path.length - 2;
            poly.cornerStyle = 'circle';
            poly.cornerColor = 'black';
            poly.transparentCorners = false;
            poly.controls = poly.path.reduce(function (acc, point, index) {
                if (index < poly.path.length - 1) {
                    acc['p1st' + index] = new fabric.Control({
                        positionHandler: polygonPositionHandler,
                        actionHandler: anchorWrapper(index > 0 ? index - 1 : lastControl, actionHandler),
                        actionName: 'modifyPolygon',
                        pointIndex: index,
                        render:renderIcon(`${index+1}0`)

                    });
                    if ((point[0] === 'Q') || (point[0] === 'C')) {
                        acc['p2nd' + index] = new fabric.Control({
                            positionHandler: polygonPositionHandler2,
                            actionHandler: anchorWrapper2(index > 1 ? index - 1 : lastControl, actionHandler2),
                            actionName: 'modifyPolygon',
                            pointIndex: index,
                            render:renderIcon(`${index+1}1`)
                        });
                    }
                    if (point[0] === 'C') {
                        acc['p3rd' + index] = new fabric.Control({
                            positionHandler: polygonPositionHandler3,
                            actionHandler: anchorWrapper3(index > 1 ? index - 1 : lastControl, actionHandler3),
                            actionName: 'modifyPolygon',
                            pointIndex: index,
                            render:renderIcon(`${index+1}2`)
                        });
                    }
                }
                return acc;
            }, {});
        } else {
            poly.cornerColor = 'blue';
            poly.cornerStyle = 'rect';
            poly.controls = fabric.Object.prototype.controls;
        }
        poly.hasBorders = !poly.edit;
        window.editor.canvas.requestRenderAll();
    }
}

    const closePath = () => {

        if (currentValue.length !== 0) {
            canvas.remove(temprect);
            currentValue.push(['z'])
            const id1 = 'id_' + uuidv4();
            const rect = new fabric.Path(currentValue, {
                id: id1,
                shadow: shadowOptions,
                opacity: 1,
                fill: 'red',
                hasRotatingPoint: true,
                objectCaching: false,
                stroke: 'yellow',
                strokeWidth: 4,
                strokeUniform: true,
                strokeLineJoin: 'round',
                originX: 'center',
                originY: 'center',
            });
            canvas.add(rect).setActiveObject(rect);
            canvas.requestRenderAll();
        }
        window.editor.canvas.off('mouse:down');
        window.editor.canvas.off('mouse:move');

    }

    window.closePath = closePath;


    const showpaths = () => {
        if (canvas.getActiveObjects()[0]?.type === 'path') {
            const aa1 = canvas?.getActiveObjects()[0]?.path;
            currentValue = aa1;
            dispatch({ type: 'CHANGE_PATH1', payload: currentValue })
        }
    }
    const deleteValuePoint = i => {
        if (canvas.getActiveObjects()[0]?.type === 'path') {
            const updatedPath = path1.filter((val, index1) => {
                return (i !== index1)
            })
            currentValue = updatedPath;
            dispatch({ type: 'CHANGE_PATH1', payload: updatedPath });
            canvas.getActiveObjects()[0].set({ path: updatedPath });
            canvas?.requestRenderAll();
        }
    }

    const addValuePoint = i => {
        if (canvas.getActiveObjects()[0]?.type === 'path') {

            const updatedPath = [...path1];
            if ((i === 0) && (updatedPath[0][0]) === 'M') {
                updatedPath.splice(i + 1, 0, ['Q', updatedPath[i][1] + 20, updatedPath[i][2] + 20, updatedPath[i][1] + 40, updatedPath[i][2] + 40]);
            }
            else {
                updatedPath.splice(i + 1, 0, ['Q', updatedPath[i][3] + 20, updatedPath[i][4] + 20, updatedPath[i][3] + 40, updatedPath[i][4] + 40]);
            }

            currentValue = updatedPath;
            dispatch({ type: 'CHANGE_PATH1', payload: updatedPath });
            canvas.getActiveObjects()[0].set({ path: updatedPath });
            canvas?.requestRenderAll();
        }
    }


    const updatePath1 = (i, ii, e) => {
        if (canvas.getActiveObjects()[0]?.type === 'path') {
            const updatedPath = path1.map((val, index1) => {
                return (i !== index1) ? val : val.map((val1, index2) => {
                    return (ii !== index2) ? val1 : parseInt(e.target.value)
                })
            })

            dispatch({ type: 'CHANGE_PATH1', payload: updatedPath });
            currentValue = updatedPath;
            canvas.getActiveObjects()[0].set({ path: updatedPath });
            canvas?.requestRenderAll();
        }
    }

    return (<div>
        <div style={{ paddingBottom: 10 }}>

            <div>
                <button onClick={startPath}>Start Drawing Path by clicking on canvas</button>
                <button onClick={closePath}>Finish Drawing path</button>
            </div>
            <div>

                <button onClick={showpaths}>Initialise path of already made path</button>
                <button id="edit" onClick={edit}>Toggle editing Path</button>
            </div>

            <div style={{ maxHeight: 800, border: '1px solid grey', overflow: 'scroll' }}>

                {path1?.map((val, i) => {
                    return (<div key={i} style={{ maxWidth: 800, border: '1px solid grey', marginBottom: 10, paddingBottom: 10 }}>
                        Point {i + 1}/{path1.length}
                        {(i !== path1.length - 1) && <>
                            <button onClick={() => deleteValuePoint(i)} >Delete</button>
                            <button onClick={() => addValuePoint(i)} >Add</button>
                        </>}
                        {/* {(i === 0) && (path1[0][0] === 'M') && <button onClick={() => ChangetoQpoint(i)} >Change to Q point</button>} */}
                        {val.map((vv, ii) => {
                            return (<div key={ii} >
                                {(ii === 0) ? <><label style={{ width: 40 }} > {vv}</label></> : ''}
                                {(ii > 0) ? <>
                                {(ii===1)&&`${i+1}0x`}
                                {(ii===2)&&`${i+1}0y`}
                                {(ii===3)&&`${i+1}1x`}
                                {(ii===4)&&`${i+1}1y`}
                                {(ii===5)&&`${i+1}2x`}
                                {(ii===6)&&`${i+1}2y`}

                                <input style={{ width: 400 }} onChange={e => updatePath1(i, ii, e)} type="range" min={-1000} max={1000} step='1' value={vv} />
                                  <input style={{ width: 50 }} onChange={e => updatePath1(i, ii, e)} type="number" min={-1000} max={1000} step='1' value={vv.toFixed(0)} />
                                </> : ''}
                            </div>)
                        })}
                    </div>)
                })
                }
            </div>

        </div>

    </div>)
}

export default PathModifier