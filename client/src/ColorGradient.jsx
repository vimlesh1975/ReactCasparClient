import React, { useState } from 'react'
import { fabric } from "fabric";
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';

const ColorGradient = () => {
    const [color1, setColor1] = useState('red')
    const [color2, setColor2] = useState('green')
    const [color3, setColor3] = useState('blue')
    const [offset,setOffset]=useState(0.5);
    // const [directionAngle,setDirectionAngle]=useState(45);
    
    const [direction, setDirection] = useState('to right')
    const directions = ['to right', 'to bottom', 'to bottom right', 'to right top'];
    const [coords1, setCoords1] = useState({ x1: 0, y1: 0, x2: 1, y2: 0 })
    const canvas = useSelector(state => state.canvasReducer.canvas);

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
                case 'to right top':
                    setCoords1({ x1: 0, y1: 1, x2: 1, y2: 0 });
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
            { offset: offset, color: color2 },
            { offset: 1, color: color3 }
        ]
    });

    const changeColor1 = e => {
        setColor1(e.target.value)
    }
    const changeColor2 = e => {
        setColor2(e.target.value)
    }
    const changeColor3 = e => {
        setColor3(e.target.value)
    }
    const setGradient2Fill = canvas => {
        canvas.getActiveObjects().forEach(element => { element.set('fill', gradient2) });
        canvas.requestRenderAll();
    }
    const setGradient3Fill = canvas => {
        canvas.getActiveObjects().forEach(element => {
            element.set('fill', new fabric.Gradient({
                type: 'radial',
                gradientUnits: 'pixel',
                coords: {
                    x1: element.width / 2,
                    y1: element.height / 2,
                    r1: element.width / 8,
                    x2: element.width / 2,
                    y2: element.height / 2,
                    r2: element.width / 2,

                },
                colorStops: [
                    { offset: 0, color: color1 },
                    { offset: 1, color: color2 }
                ]
            }))
        });
        canvas.requestRenderAll();
    }

    const setGradient2Stroke = canvas => {
        canvas.getActiveObjects().forEach(element => { element.set('stroke', gradient2) });
        canvas.requestRenderAll();
    }
  
const onOffsetChange=e=>{
    setOffset(e.target.value);
}
// const ondirectionAngleChange=e=>{
//     setDirectionAngle(e.target.value);

// }

    return (<>
        <div style={{ margin: 5, border: '2px solid blue', width: 295, height: 100, backgroundImage: `linear-gradient(${direction}, ${color1} 0%, ${color2} ${offset*100}%, ${color3} 100%)` }} />
        {/* <div style={{ margin: 5, border: '2px solid blue', width: 295, height: 100, backgroundImage: `linear-gradient(${directionAngle}deg, ${color1} 0%, ${color2} ${offset*100}%, ${color3} 100%)` }} /> */}
        <input style={{width:295}} onChange={e => onOffsetChange(e)} type="range" min='0' max='1' step='.01' defaultValue='0.5' />
        {/* <input style={{width:295}} onChange={e => ondirectionAngleChange(e)} type="range" min='0' max='360' step='1' defaultValue='45' />Angle */}
       
        <div>
            Color 1 <input type="color" defaultValue='#ff0000' onChange={e => changeColor1(e)} />
            Color 2 <input type="color" defaultValue='#00ff00' onChange={e => changeColor2(e)} />
            Color 3 <input type="color" defaultValue='#0000ff' onChange={e => changeColor3(e)} />
        </div>
        {directions.map((val, i) => {
            return (
                <div key={uuidv4()} style={{ margin: 5 }}>
                    <input checked={(direction === val)}
                        onChange={
                            e => {
                                setDirection(e.target.value);
                                setCoords(e.target.value)
                            }
                        } type="radio" value={val} id={val} />
                    <label htmlFor={val}>{val}</label>
                </div>
            )
        })}
        <div style={{ margin: 5 }} >
            <button onClick={() => setGradient2Fill(canvas)}>Set Gradient Fill</button>
            <button onClick={() => setGradient2Stroke(canvas)}>Set Gradient Stroke</button>
            <button onClick={() => setGradient3Fill(canvas)}>Set Radial Gradient Fill</button>
        </div>
        <div>
           
        </div>

    </>)
}
export default ColorGradient
