import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { fabric } from "fabric";
import { v4 as uuidv4 } from 'uuid';
import { shadowOptions, options } from './common'

var currentValue = [];

const PathModifier = () => {
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const [path1, setPath1] = useState([]);
    const [initialValue, setInitialValue] = useState([]);

    const showpaths = () => {
        if (canvas.getActiveObjects()[0]?.type === 'path') {
            const aa1 = canvas?.getActiveObjects()[0]?.path;
            setInitialValue(aa1);
            setPath1(aa1);
        }
    }
    const resetPaths = () => {
        if (canvas.getActiveObjects()[0]?.type === 'path') {
            currentValue = initialValue;
            setPath1(initialValue);
            canvas.getActiveObjects()[0].set({ path: initialValue });
            canvas?.requestRenderAll();
        }
    }

    const resetValue = (i, ii) => {
        if (canvas.getActiveObjects()[0]?.type === 'path') {
            const updatedPath = path1.map((val, index1) => {
                return (i !== index1) ? val : val.map((val1, index2) => {
                    return (ii !== index2) ? val1 : initialValue[i][ii]
                })
            })
            currentValue = updatedPath;
            setPath1(updatedPath);
            canvas.getActiveObjects()[0].set({ path: updatedPath });
            canvas?.requestRenderAll();
        }
    }
    const resetValuePoint = i => {
        if (canvas.getActiveObjects()[0]?.type === 'path') {

            const updatedPath = path1.map((val, index1) => {
                return (i !== index1) ? val : initialValue[i]
            })
            currentValue = updatedPath;
            setPath1(updatedPath);
            canvas.getActiveObjects()[0].set({ path: updatedPath });
            canvas?.requestRenderAll();
        }
    }
    const deleteValuePoint = i => {
        if (canvas.getActiveObjects()[0]?.type === 'path') {
            const updatedPath = path1.filter((val, index1) => {
                return (i !== index1)
            })
            currentValue = updatedPath;
            setPath1(updatedPath);
            setInitialValue(updatedPath);
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
            setInitialValue(updatedPath);
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
            setPath1(updatedPath);
            currentValue = updatedPath;
            canvas.getActiveObjects()[0].set({ path: updatedPath });
            canvas?.requestRenderAll();
        }
    }

    const startPath = () => {
        window.editor.canvas.off('mouse:down');
        currentValue = [];
        setTimeout(() => {
            window.editor.canvas.on('mouse:down', eventHandlerMouseDown);
        }, 1000);
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
    }

    const closePath = () => {
        if (currentValue.length !== 0) {
            currentValue.push(['z'])
            const rect = new fabric.Path(currentValue, {
                id: 'id_' + uuidv4(),
                shadow: shadowOptions,
                opacity: 1,
                fill: 'red',
                hasRotatingPoint: true,
                objectCaching: false,
                stroke: 'yellow',
                strokeWidth: 2,
                strokeUniform: true,
                strokeLineJoin: 'round',
            });
            canvas.add(rect).setActiveObject(rect);

            currentValue.forEach((element, i) => {
                const circle = new fabric.Circle({
                    id: 'id_' + uuidv4(),
                    shadow: shadowOptions,
                    left: (element.length < 4) ? element[1] - 8 : element[3] - 8,
                    top: (element.length < 4) ? element[2] - 8 : element[4] - 8,
                    radius: 8,
                    fill: 'rgb(80, 3, 124)',
                    cornerSize: 7,
                    lockRotation: true,
                    hasRotatingPoint: false,
                    lockScalingX: true,
                    lockScalingY: true,

                    stroke: options.stroke,
                    strokeWidth: 1,
                    strokeUniform: true,
                })

                canvas.add(circle);
                circle.setControlsVisibility({
                    mt: false,
                    mb: false,
                    ml: false,
                    mr: false,
                    bl: false,
                    br: false,
                    tl: false,
                    tr: false,
                    mtr: false,
                });
                circle.on('moving', (e) => {
                    const updatedPath = currentValue.map((val, index1) => {
                        return (i !== index1) ? val : val.map((val1, index2) => {
                            return (index2 < 3) ? val1 : ((index2 === 3) ? e.pointer.x : e.pointer.y)
                        })
                    })
                    setPath1(updatedPath);
                    rect.set({ path: updatedPath });
                    canvas?.requestRenderAll();
                    currentValue = updatedPath;
                    // console.log( e.pointer.x)
                    // console.log(currentValue[0])
                })

            });

            canvas.requestRenderAll();
        }
        window.editor.canvas.off('mouse:down');

    }
    const ChangetoQpoint = (i) => {
        if (canvas.getActiveObjects()[0]?.type === 'path') {
            const aa2 = [...path1];
            aa2[i] = ['Q', (aa2[aa2.length - 2][3] + aa2[i][1]) / 2, (aa2[aa2.length - 2][4] + aa2[i][2]) / 2, aa2[i][1], aa2[i][2]];
            setInitialValue(aa2);
            setPath1([...aa2]);
            currentValue = aa2;
            canvas.getActiveObjects()[0].set({ path: aa2 });
            canvas?.requestRenderAll();
        }
    }
    // const addPointbyClickingonCanvas=()=>{
    //     window.editor.canvas.on('mouse:down', eventHandlerMouseDown2);

    // }
    // const eventHandlerMouseDown2 = (e) => {
    //     console.log(e.pointer.x, e.pointer.y)
    //     window.editor.canvas.off('mouse:down');

    // }

    return (<div>
        <div style={{ paddingBottom: 10 }}>
            <div>
                <button onClick={showpaths}>Show Paths and Remember</button>
                <button onClick={resetPaths}>Reset path</button>
                {/* <button onClick={addPointbyClickingonCanvas}>Add point by clicking on canvas</button> */}
            </div>
            <div>
                <button onClick={startPath}>Start Drawing Path by clicking on canvas</button>
                <button onClick={closePath}>Finish Drawing path</button>
            </div>
        </div>
        <div style={{ maxHeight: 800, border: '1px solid grey', overflow: 'scroll' }}>

            {path1?.map((val, i) => {
                return (<div key={i} style={{ maxWidth: 800, border: '1px solid grey', marginBottom: 10, paddingBottom: 10 }}>
                    Point {i + 1}/{path1.length}
                    {(i !== path1.length - 1) && <>
                        <button onClick={() => resetValuePoint(i)} >Reset</button>
                        <button onClick={() => deleteValuePoint(i)} >Delete</button>
                        <button onClick={() => addValuePoint(i)} >Add</button>
                    </>}
                    {(i === 0) && (path1[0][0] === 'M') && <button onClick={() => ChangetoQpoint(i)} >Change to Q point</button>}
                    {val.map((vv, ii) => {
                        return (<div key={ii} >
                            {(ii === 0) ? <><label style={{ width: 40 }} > {vv}</label></> : ''}
                            {(ii > 0) ? <><input style={{ width: 400 }} onChange={e => updatePath1(i, ii, e)} type="range" min={-1000} max={1000} step='1' value={vv} />
                                <input style={{ width: 50 }} onChange={e => updatePath1(i, ii, e)} type="number" min={-1000} max={1000} step='1' value={vv.toFixed(0)} /> <button onClick={() => resetValue(i, ii)} >Reset</button>
                            </> : ''}
                        </div>)
                    })}
                </div>)
            })
            }
        </div>
    </div>)
}

export default PathModifier