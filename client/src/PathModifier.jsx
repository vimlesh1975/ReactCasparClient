import React, { useState } from 'react'
import { useSelector } from 'react-redux'


const PathModifier = () => {
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const [path1, setPath1] = useState([]);
    const [path2, setPath2] = useState([]);

    const showpaths = () => {
        const aa = [...canvas?.getActiveObjects()[0]?.path];
        setPath1([...aa]);
        setPath2([...aa]);
    }
    const resetPaths = () => {
        console.log(path2);
        setPath1([...path2]);
    }
    const resetValue = (i, ii) => {
        console.log(path2);
        setPath1([...path2]);
    }

    const updatePath1 = (i, ii, e) => {
        const aa = [...path1];
        aa[i][ii] = parseInt(e.target.value);
        setPath1([...aa]);
        canvas.getActiveObjects()[0].set({ path: [...path1] });
        canvas?.requestRenderAll();
        // console.log(path1[i][ii]);
        // console.log(path2[i][ii]);
    }

    return (<div>
        <button onClick={showpaths}>showpaths</button>  <button onClick={resetPaths}>Reset path</button>

        <div style={{ maxHeight: 800, border: '1px solid grey', overflow: 'scroll' }}>

            {path1?.map((val, i) => {
                return (<div key={i} style={{ maxWidth: 800, border: '1px solid grey', marginBottom: 10, paddingBottom: 10 }}>
                    Point {i + 1}/{path1.length} {val.map((vv, ii) => {
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