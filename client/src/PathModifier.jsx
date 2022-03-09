import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { fabric } from "fabric";
import { v4 as uuidv4 } from 'uuid';
import { shadowOptions, options } from './common'

var currentValue = [];

const PathModifier = () => {
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const [path1, setPath1] = useState([]);

    const startPath = () => {
        window.editor.canvas.off('mouse:down');
        currentValue = [];
        setTimeout(() => {
            window.editor.canvas.on('mouse:down', eventHandlerMouseDown);
            window.editor.canvas.on('mouse:move', eventHandlerMouseMove);
        }, 1000);
    }
    var temprect;

    const eventHandlerMouseMove = (e) => {
        if (currentValue.length > 0) {
            console.log(e.pointer.x, e.pointer.y)
            currentValue.push(['L', e.pointer.x, e.pointer.y]);
            canvas.remove(temprect);
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
            canvas.add(temprect);
            canvas.requestRenderAll();
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
                canvas.remove(temprect);
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
            canvas.add(temprect);
            canvas.requestRenderAll();
        }

    }

    const addCirclestoPath = () => {
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
                strokeWidth: 2,
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
                    setPath1(updatedPath);

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
    const calcDimensions = (aa) => {
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
                    setPath1(updatedPath);

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
                    setPath1(updatedPath);
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
            setPath1(currentValue);

        }
    }
    const deleteValuePoint = i => {
        if (canvas.getActiveObjects()[0]?.type === 'path') {
            const updatedPath = path1.filter((val, index1) => {
                return (i !== index1)
            })
            currentValue = updatedPath;
            setPath1(updatedPath);
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
            setPath1(updatedPath);
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

            setPath1(updatedPath);
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