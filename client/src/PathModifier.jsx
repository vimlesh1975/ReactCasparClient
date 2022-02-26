import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { fabric } from "fabric";
import { v4 as uuidv4 } from 'uuid';
import { shadowOptions } from './common'


var bb;
var cc = [];


const PathModifier = () => {
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const [path1, setPath1] = useState([]);

    const showpaths = () => {
        if (canvas.getActiveObjects()[0]?.type === 'path') {
            const aa1 = [...canvas?.getActiveObjects()[0]?.path];
            bb = JSON.stringify(aa1);
            setPath1([...aa1]);
        }
    }
    const resetPaths = () => {
        if (canvas.getActiveObjects()[0]?.type === 'path') {
            setPath1(JSON.parse(bb));
            canvas.getActiveObjects()[0].set({ path: JSON.parse(bb) });
            canvas?.requestRenderAll();
        }
    }

    const resetValue = (i, ii) => {
        if (canvas.getActiveObjects()[0]?.type === 'path') {
            const aa2 = [...path1];
            aa2[i][ii] = JSON.parse(bb)[i][ii];
            setPath1([...aa2]);
            canvas.getActiveObjects()[0].set({ path: aa2 });
            canvas?.requestRenderAll();
        }
    }
    const resetValuePoint = i => {
        if (canvas.getActiveObjects()[0]?.type === 'path') {
            const aa2 = [...path1];
            aa2[i] = JSON.parse(bb)[i];
            setPath1([...aa2]);
            canvas.getActiveObjects()[0].set({ path: aa2 });
            canvas?.requestRenderAll();
        }
    }

    const updatePath1 = (i, ii, e) => {
        if (canvas.getActiveObjects()[0]?.type === 'path') {
            const aa2 = [...path1];
            aa2[i][ii] = parseInt(e.target.value);
            setPath1([...aa2]);
            canvas.getActiveObjects()[0].set({ path: aa2 });
            canvas?.requestRenderAll();
        }
    }

    const startPath = () => {
        window.editor.canvas.off('mouse:down');
        cc = [];
        setTimeout(() => {
            window.editor.canvas.on('mouse:down', eventHandlerMouseDown);
        }, 1000);
    }
    const eventHandlerMouseDown = (e) => {
        if (cc.length === 0) {
            cc.push(['M', e.pointer.x, e.pointer.y])
        }
        else {
            if (cc[cc.length - 1][0] === 'M') {
                cc.push(['Q', (cc[cc.length - 1][1] + e.pointer.x) / 2, (cc[cc.length - 1][2] + e.pointer.y) / 2, e.pointer.x, e.pointer.y])
            }
            else {
                cc.push(['Q', (cc[cc.length - 1][3] + e.pointer.x) / 2, (cc[cc.length - 1][4] + e.pointer.y) / 2, e.pointer.x, e.pointer.y])
            }
        }
    }

    const cornerRound = (i) => {
        // console.log(cc)
        if (canvas.getActiveObjects()[0]?.type === 'path') {
            const aa2 = [...path1];
            // aa2[i] = ['Q', aa2[i][1], aa2[i][2], aa2[i][1], aa2[i][2]];
            aa2[i] = ['Q', (cc[cc.length - 2][3] + aa2[i][1]) / 2, (cc[cc.length - 2][4] + aa2[i][2]) / 2, aa2[i][1], aa2[i][2]];
            bb = JSON.stringify(aa2);
            setPath1([...aa2]);
            canvas.getActiveObjects()[0].set({ path: aa2 });
            canvas?.requestRenderAll();
        }
    }

    const closePath = () => {
        if (cc.length !== 0) {
            cc.push(['z'])
            const rect = new fabric.Path(cc, {
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
            // rect.set({ path: createdPath })
            canvas.requestRenderAll();
        }

        window.editor.canvas.off('mouse:down');
        // cc = [];

    }

    return (<div>
        <div style={{ paddingBottom: 10 }}>
            <div>
                <button onClick={showpaths}>Show Paths and Remember</button>
                <button onClick={resetPaths}>Reset path</button>
            </div>
            <div>
                <button onClick={startPath}>Start Drawing Path by clicking on canvas</button>
                <button onClick={closePath}>Finish Drawing path</button>
            </div>
        </div>
        <div style={{ maxHeight: 800, border: '1px solid grey', overflow: 'scroll' }}>

            {path1?.map((val, i) => {
                return (<div key={i} style={{ maxWidth: 800, border: '1px solid grey', marginBottom: 10, paddingBottom: 10 }}>
                    Point {i + 1}/{path1.length} <button onClick={() => resetValuePoint(i)} >Reset</button> {(i === 0) ? <button onClick={() => cornerRound(i)} >Corner Round</button> : ''}
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