import React, { useState } from 'react'
import { fabric } from "fabric";
import { v4 as uuidv4 } from 'uuid';


const ColorGradient = () => {
    const [color1, setColor1] = useState('red')
    const [color2, setColor2] = useState('green')
    const [direction, setDirection] = useState('to right')
    const directions = ['to right', 'to bottom', 'to bottom right'];
    const [coords1, setCoords1] = useState({ x1: 0, y1: 0, x2: 1, y2: 0 })

    function setCoords(direction1) {
        switch (direction1) {
            case 'to right':
                setCoords1({ x1: 0, y1: 0, x2: 1, y2: 0 });
                break;
            case 'to bottom':
                setCoords1({ x1: 0, y1: 0, x2: 0, y2: 1 });
                break;
            case 'to bottom right':
                setCoords1({ x1: 0, y1: 0, x2: 1, y2: 1 });
                break;
            default:
            //nothing
        }
    }

    const gradient2 = new fabric.Gradient({
        type: 'linear',
        gradientUnits: 'percentage',
        coords: coords1,
        colorStops: [
            { offset: 0, color: color1 },
            { offset: 1, color: color2 }
        ]
    });

    const gradient3 = new fabric.Gradient({
        type: 'radial',
        gradientUnits: 'percentage',
        coords: {
            x1: 25,
            y1: 33,
            x2: 5,
            y2: 25,
            r1: 20,
            r2: 80,
           
        },
        colorStops: [
            { offset: 0, color: color1 },
            { offset: 1, color: color2 }
        ]
    });

    const changeColor1 = e => {
        setColor1(e.target.value)
    }
    const changeColor2 = e => {
        setColor2(e.target.value)
    }
    const setGradient2Fill = canvas => {
        canvas.getActiveObjects().forEach(element => { element.set('fill', gradient2) });
        canvas.requestRenderAll();
    }
    const setGradient3Fill = canvas => {
        canvas.getActiveObjects().forEach(element => { element.set('fill', new fabric.Gradient({
            type: 'radial',
            gradientUnits: 'pixel',
            coords: {
                x1:element.width/2,
                y1:element.height/2,
                r1:element.width/8,
                x2:element.width/2,
                y2:element.height/2,
                r2:element.width/2,
               
            },
            colorStops: [
                { offset: 0, color: color1 },
                { offset: 1, color: color2 }
            ]
        })) });
        canvas.requestRenderAll();
    }

    const setGradient2Stroke = canvas => {
        canvas.getActiveObjects().forEach(element => { element.set('stroke', gradient2) });
        canvas.requestRenderAll();
    }
    return (<>
        <b>Color Gradient</b>
        <div style={{ margin: 5, border: '2px solid blue', width: 295, height: 100, backgroundImage: `linear-gradient(${direction}, ${color1}, ${color2})` }} />
        <div>
            Color 1 <input type="color" defaultValue='#ff0000' onChange={e => changeColor1(e)} />
            Color 2 <input type="color" defaultValue='#00ff00' onChange={e => changeColor2(e)} />
        </div>
        {directions.map((val, i) => {
            return (<>
                <div style={{ margin: 5 }}>
                    <input checked={direction === val}
                        onChange={
                            e => {
                                setDirection(e.target.value);
                                setCoords(e.target.value)
                            }
                        } type="radio" value={val} id={val} key={uuidv4()} />
                    <label key={uuidv4()} htmlFor={val}>{val}</label>
                </div>
            </>)
        })}
        <div style={{ margin: 5 }} >
            <button on onClick={() => setGradient2Fill(window.editor.canvas)}>Set Gradient Fill</button>
            <button on onClick={() => setGradient2Stroke(window.editor.canvas)}>Set Gradient Stroke</button>

            <button on onClick={() => setGradient3Fill(window.editor.canvas)}>Set Radial Gradient Fill</button>


        </div>
    </>)
}

export default ColorGradient
