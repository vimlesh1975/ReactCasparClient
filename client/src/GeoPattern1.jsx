import React, { useRef } from 'react'
import GeoPattern from "geopattern";
import { useState } from "react";
import { useSelector } from 'react-redux'
import * as fabric from 'fabric';

const GeoPattern1 = () => {
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const [color1, setcolor1] = useState("#023020");
    const [string1, setString1] = useState(1180);
    const particlebg = useRef()


    const setPattern = async () => {
        const activeObjects = canvas.getActiveObjects();
        for (const element of activeObjects) {
            try {
                const myImg = await fabric.util.loadImage(
                    GeoPattern.generate(string1, {
                        color: color1,
                    }).toDataUri()
                );

                element.set({
                    fill: new fabric.Pattern({
                        source: myImg,
                        repeat: 'repeat',
                        offsetX: 0,
                        offsetY: 0,
                    }),
                });

                canvas.requestRenderAll();
            } catch (error) {
                console.error("Error loading pattern image:", error);
            }
        }
    };


    const Upload = (e) => {
        if (e.target.files[0]) {
            var reader = new FileReader();
            reader.onload = () => {
                canvas.getActiveObjects().forEach(element => {
                    fabric.util.loadImage(reader.result).then(myImg => {
                        element.set({
                            fill: new fabric.Pattern({
                                source: myImg,
                                repeat: 'repeat',
                                offsetX: 0,
                                offsetY: 0
                            })
                        });
                        canvas.requestRenderAll();
                    });
                });
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    

const changeXoffset = (e) => {
    canvas.getActiveObjects().forEach(element => {
        if (element.fill.repeat !== undefined) {
            element.fill.offsetX = e.target.value
            canvas.requestRenderAll();
        }
    })
}
const changeYoffset = (e) => {
    canvas.getActiveObjects().forEach(element => {
        if (element.fill.repeat !== undefined) {
            element.fill.offsetY = e.target.value
            canvas.requestRenderAll();
        }
    })
}

const changerepeat = (e) => {
    canvas.getActiveObjects().forEach(element => {
        if (element.fill.repeat !== undefined) {
            element.fill.repeat = e.target.checked ? 'repeat' : 'no-repeat'
        }
    })
    canvas.requestRenderAll();
}

return (<div>

    <div
        style={{
            width: 200, height: 200,
            backgroundImage: GeoPattern.generate(string1, {
                color: color1,
            }).toDataUrl()
        }}
    >
    </div>
    <input
        type="color"
        defaultValue={color1}
        onChange={(e) => setcolor1(e.target.value)}
    />
    Change Pattern: <input type={'range'} min={0} max={1920} value={string1} onChange={e => setString1(e.target.value)} />

    <button onClick={setPattern}>Set Pattern</button>

    <div className='drawingToolsRow' >
        <b> Set Pattern from Image: </b>
        <input type="file" accept="image/*" onChange={(e) => Upload(e)} />
        offsetX: <input type={'range'} min={0} max={1920} onChange={e => changeXoffset(e)} />
        offsetY:<input type={'range'} min={0} max={1080} onChange={e => changeYoffset(e)} />
        Repeat:<input type={'checkbox'} onChange={e => changerepeat(e)} />
    </div>
    <div ref={particlebg} style={{ width: 192, height: 108 }}>
        {/* <ParticlesBg type="circle" bg={false} /> */}
    </div>
</div >)
}

export default GeoPattern1