import React, { } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fabric } from "fabric";
import { v4 as uuidv4 } from 'uuid';
import { shadowOptions, options } from './common'

var currentValue = [];
var temprect;

export const startPath = () => {
    window.editor.canvas.off('mouse:down');
    currentValue = [];
    setTimeout(() => {
        window.editor.canvas.on('mouse:down', eventHandlerMouseDown);
        window.editor.canvas.on('mouse:move', eventHandlerMouseMove);
    }, 1000);
}
const eventHandlerMouseMove = e => {
    if (currentValue.length > 0) {
        console.log(e.pointer.x, e.pointer.y)
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
            strokeUniform: true,
            strokeLineJoin: 'round',
            originX: 'center',
            originY: 'center',
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

var points = [{
    x: 3, y: 4
}, {
    x: 16, y: 3
}, {
    x: 30, y: 5
}, {
    x: 25, y: 55
}, {
    x: 19, y: 44
}, {
    x: 15, y: 30
}, {
    x: 15, y: 55
}, {
    x: 9, y: 55
}, {
    x: 6, y: 53
}, {
    x: -2, y: 55
}, {
    x: -4, y: 40
}, {
    x: 0, y: 20
}]
var polygon = new fabric.Polygon(points, {
    left: 100,
    top: 50,
    fill: '#D81B60',
    strokeWidth: 4,
    stroke: 'green',
    scaleX: 4,
    scaleY: 4,
    objectCaching: false,
    transparentCorners: false,
    cornerColor: 'blue',
});
// window.editor.canvas.viewportTransform = [0.7, 0, 0, 0.7, -50, 50];
// window.editor.canvas.add(polygon);


// define a function that can locate the controls.
// this function will be used both for drawing and for interaction.
function polygonPositionHandler(dim, finalMatrix, fabricObject) {
    var x = (fabricObject.path[0][1] - fabricObject.pathOffset.x),
        y = (fabricObject.path[0][2] - fabricObject.pathOffset.y);
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
    polygon.path[0] = finalPointPosition;
    return true;
}

// define a function that can keep the polygon in the same position when we change its
// width/height/top/left.
function anchorWrapper(anchorIndex, fn) {
    return function (eventData, transform, x, y) {
        var fabricObject = transform.target,
            absolutePoint = fabric.util.transformPoint({
                x: (fabricObject.path[0].x - fabricObject.pathOffset.x),
                y: (fabricObject.path[0].y - fabricObject.pathOffset.y),
            }, fabricObject.calcTransformMatrix()),
            actionPerformed = fn(eventData, transform, x, y),
            newDim = fabricObject._setPositionDimensions({}),
            polygonBaseSize = fabricObject._getNonTransformedDimensions(),
            newX = (fabricObject.points[anchorIndex].x - fabricObject.pathOffset.x) / polygonBaseSize.x,
            newY = (fabricObject.points[anchorIndex].y - fabricObject.pathOffset.y) / polygonBaseSize.y;
        fabricObject.setPositionByOrigin(absolutePoint, newX + 0.5, newY + 0.5);
        return actionPerformed;
    }
}





const PathModifier = () => {
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const path1 = useSelector(state => state.path1Reducer.path1);
    const dispatch = useDispatch();

    const xyz = () => {
        console.log('gdfghdfghgfh')
        // clone what are you copying since you
        // may want copy and paste on different moment.
        // and you do not want the changes happened
        // later to reflect on the copy.
        var poly = window.editor.canvas.getObjects()[0];
        window.editor.canvas.setActiveObject(poly);
        poly.edit = !poly.edit;
        if (poly.edit) {
            var lastControl = poly.path.length - 1;
            poly.cornerStyle = 'circle';
            poly.cornerColor = 'rgba(0,0,255,0.5)';
            poly.controls = poly.path.reduce(function (acc, point, index) {
                acc['p' + index] = new fabric.Control({
                    positionHandler: polygonPositionHandler,
                    actionHandler: anchorWrapper(index > 0 ? index - 1 : lastControl, actionHandler),
                    actionName: 'modifyPolygon',
                    pointIndex: index
                });
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

    const addCirclestoPath = () => {
        console.log('gdfghdfghgfh')

        if (canvas.getActiveObjects()[0]?.type === 'path') {
            makecircles(canvas.getActiveObjects()[0], canvas.getActiveObjects()[0].id)
        }
    }

    const removeCirclesfromPath = () => {
        if (canvas.getActiveObjects()[0]?.type === 'path') {
            (canvas.getObjects()).forEach(element => {
                if (element.id === (canvas.getActiveObjects()[0].id + '__')) {
                    canvas.remove(element);
                }
            });
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

            makecircles(rect, id1);

            rect.on('mousedown', rectMouseDown);
            rect.on('mouseup', rectMouseUp);
            // rect.on('scaled', onScaled)
            // function onScaled() {
            //     // console.log(this.getScaledWidth());
            //     // const delta = this.getCenterPoint().subtract(this.origPos);
            //     // console.log(delta);
            //     var m = this.calcTransformMatrix();
            //     var point = new fabric.Point({ x: this.left, y: this.top });
            //     var canvasPoint = fabric.util.transformPoint(point, m);
            //     console.log(point)

            // }

            function rectMouseDown() {
                console.log('down');

                this.origPos = this.getCenterPoint();
                const aa1 = canvas?.getActiveObjects()[0]?.path;
                currentValue = aa1;
            }
            function rectMouseUp() {
                console.log('up');

                const delta = this.getCenterPoint().subtract(this.origPos);
                if ((delta.x !== 0) || (delta.y !== 0)) {
                    canvas.getObjects().forEach(element => {
                        if (element.id === (canvas.getActiveObjects()[0].id + '__')) {
                            element.left += delta.x;
                            element.top += delta.y;
                        }
                    });

                    const updatedPath = currentValue.map((val, index1) => {
                        return val.map((val1, index2) => {
                            return (0 === index2) ? val1 : ((index2 === 1) || (index2 === 3)) ? val1 + delta.x : val1 + delta.y;
                        })
                    })
                    currentValue = updatedPath;
                    dispatch({ type: 'CHANGE_PATH1', payload: updatedPath })
                    // setPath1(updatedPath);

                    canvas.getActiveObjects()[0].set({ path: updatedPath });
                    calcDimensions(this) //to update bounding rectangle

                    canvas?.requestRenderAll();
                }

            }

            canvas.requestRenderAll();
        }
        window.editor.canvas.off('mouse:down');
        window.editor.canvas.off('mouse:move');

    }

    window.closePath = closePath;
    const calcDimensions = (aa) => {
        console.log('calcDimensions')
        var dims = aa._calcDimensions()
        aa.set({
            width: dims.width,
            height: dims.height,
            left: dims.left + dims.width / 2,
            top: dims.top + dims.height / 2,
            pathOffset: {
                x: dims.width / 2 + dims.left,
                y: dims.height / 2 + dims.top,

            },
            dirty: true
        })
        aa.setCoords()

    }

    const makecircles = (rect1, id) => {
        currentValue.forEach((element, i) => {
            if (i < currentValue.length - 1) {
                const circle = new fabric.Circle({
                    id: id + '__',
                    shadow: shadowOptions,
                    left: (element.length < 4) ? element[1] - 4 : element[3] - 4,
                    top: (element.length < 4) ? element[2] - 4 : element[4] - 4,
                    radius: 4,
                    fill: 'yellow',
                    cornerSize: 7,
                    stroke: options.stroke,
                    strokeWidth: 1,
                    strokeUniform: true,
                    hasControls: false,
                    originX: 'center',
                    originY: 'center',
                })

                canvas.add(circle);

                circle.on('mouseover', function (e) {
                    e.target.set('fill', 'black');
                    canvas.renderAll();
                });

                circle.on('mouseout', function (e) {
                    e.target.set('fill', 'yellow');
                    canvas.renderAll();
                });


                circle.on('moving', (e) => {
                    var updatedPath;
                    if (i === 0) {
                        updatedPath = currentValue.map((val, index1) => {
                            return (i !== index1) ? val : val.map((val1, index2) => {
                                return (index2 === 0) ? val1 : ((index2 === 1) ? e.pointer.x : e.pointer.y)
                            })
                        })
                    }

                    else {
                        updatedPath = currentValue.map((val, index1) => {
                            return (i !== index1) ? val : val.map((val1, index2) => {
                                return (index2 < 3) ? val1 : ((index2 === 3) ? e.pointer.x : e.pointer.y)
                            })
                        })
                    }

                    rect1.set({ path: updatedPath });
                    dispatch({ type: 'CHANGE_PATH1', payload: updatedPath })
                    // setPath1(updatedPath);

                    canvas?.requestRenderAll();
                    currentValue = updatedPath;
                })
            }
        });
        //for anchor points
        currentValue.forEach((element, i) => {
            if ((i < currentValue.length - 1) && (i !== 0)) {
                const circle = new fabric.Circle({
                    id: id + '__',
                    shadow: shadowOptions,
                    left: element[1] - 4,
                    top: element[2] - 4,
                    radius: 4,
                    fill: 'white',
                    cornerSize: 7,
                    stroke: options.stroke,
                    strokeWidth: 1,
                    strokeUniform: true,
                    hasControls: false,
                    originX: 'center',
                    originY: 'center',
                })

                canvas.add(circle);

                circle.on('mouseover', function (e) {
                    e.target.set('fill', 'black');
                    console.log(e.target)
                    canvas.renderAll();
                });

                circle.on('mouseout', function (e) {
                    e.target.set('fill', 'white');
                    canvas.renderAll();
                });

                circle.on('moving', (e) => {
                    var updatedPath;

                    updatedPath = currentValue.map((val, index1) => {
                        return (i !== index1) ? val : val.map((val1, index2) => {
                            return ((index2 === 0) || (index2 > 2)) ? val1 : ((index2 === 1) ? e.pointer.x : e.pointer.y)
                        })
                    })

                    rect1.set({ path: updatedPath });
                    dispatch({ type: 'CHANGE_PATH1', payload: updatedPath })
                    // setPath1(updatedPath);
                    canvas?.requestRenderAll();
                    currentValue = updatedPath;
                })
            }
        });
    }
    const showpaths = () => {
        if (canvas.getActiveObjects()[0]?.type === 'path') {
            const aa1 = canvas?.getActiveObjects()[0]?.path;
            currentValue = aa1;
            dispatch({ type: 'CHANGE_PATH1', payload: currentValue })
            // setPath1(currentValue);

        }
    }
    const deleteValuePoint = i => {
        if (canvas.getActiveObjects()[0]?.type === 'path') {
            const updatedPath = path1.filter((val, index1) => {
                return (i !== index1)
            })
            currentValue = updatedPath;
            dispatch({ type: 'CHANGE_PATH1', payload: updatedPath });
            // setPath1(updatedPath);
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
            // setPath1(updatedPath);
            canvas.getActiveObjects()[0].set({ path: updatedPath });
            canvas?.requestRenderAll();
        }
    }

    const redrawCircles = () => {
        canvas.getObjects().forEach(element => {
            if (element.id === (canvas.getActiveObjects()[0].id + '__')) {
                canvas.remove(element);
            }
        });

        makecircles(canvas.getActiveObjects()[0], canvas.getActiveObjects()[0].id);
    }

    const updatePath1 = (i, ii, e) => {
        if (canvas.getActiveObjects()[0]?.type === 'path') {
            const updatedPath = path1.map((val, index1) => {
                return (i !== index1) ? val : val.map((val1, index2) => {
                    return (ii !== index2) ? val1 : parseInt(e.target.value)
                })
            })

            redrawCircles();

            dispatch({ type: 'CHANGE_PATH1', payload: updatedPath });
            // setPath1(updatedPath);
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

                <button onClick={addCirclestoPath}>Add circles to selected path</button>
                <button onClick={removeCirclesfromPath}>Remove circles from selected path</button>
                <button onClick={showpaths}>Initialise path of already made path</button>
                {/* <button id="edit" onClick={xyz}>Toggle editing polygon</button> */}
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
                                {(ii > 0) ? <><input style={{ width: 400 }} onChange={e => updatePath1(i, ii, e)} type="range" min={-1000} max={1000} step='1' value={vv} />
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