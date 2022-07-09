import React, { useState, useEffect } from 'react'
import { fabric } from "fabric";
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import ColorGradient2 from './ColorGradient2';

const ColorGradient = ({ property1 }) => {
    const [color1, setColor1] = useState('#000000')
    const [color2, setColor2] = useState('#ff0000')
    const [color3, setColor3] = useState('#000000')
    const [offset, setOffset] = useState(0.5);
    const [direction, setDirection] = useState('to bottom')


    const [directionAngle, setDirectionAngle] = useState(179);

    const directions = ['to right', 'to bottom', 'to bottom right', 'to right top'];
    const [useAngle, setUseAngle] = useState(false);
    const [coords1, setCoords1] = useState({ x1: 0, y1: 0, x2: 0, y2: 1 })
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
        coords: useAngle ? { x1: 0, y1: (180 - directionAngle) / 180, x2: 1, y2: (directionAngle) / 180 } : coords1,
        colorStops: [
            { offset: 0, color: color1 },
            { offset: offset, color: color2 },
            { offset: 1, color: color3 }
        ]
    });

   
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
                    { offset: 0.5, color: color2 },
                    { offset: 1, color: color3 }
                ]
            }))
        });
        canvas.requestRenderAll();
    }

    const setGradient2Stroke = canvas => {
        canvas.getActiveObjects().forEach(element => { element.set('stroke', gradient2) });
        canvas.requestRenderAll();
    }

    const onOffsetChange = e => {
        setOffset(e.target.value);
    }
    const ondirectionAngleChange = e => {
        setDirectionAngle(e.target.value);

    }

    // const getGradient = () => {
    //     if (canvas?.getActiveObjects()[0]) {
    //         console.log(canvas.getActiveObjects()[0].fill)

    //         if (canvas.getActiveObjects()[0].fill.colorStops) {
    //             setdirection1(canvas.getActiveObjects()[0].fill.coords)
    //             setOffset(canvas.getActiveObjects()[0].fill.colorStops[1].offset)
    //             setColor1(canvas.getActiveObjects()[0].fill.colorStops[0].color)
    //             setColor2(canvas.getActiveObjects()[0].fill.colorStops[1].color)
    //             setColor3(canvas.getActiveObjects()[0].fill.colorStops[2].color)
    //         }
    //         else {
    //             setColor1(canvas.getActiveObjects()[0].fill)
    //             setColor2(canvas.getActiveObjects()[0].fill)
    //             setColor3(canvas.getActiveObjects()[0].fill)
    //         }
    //     }
    // }
    // const getGradient1 = () => {
    //     if (canvas?.getActiveObjects()[0]) {

    //         if (property1?.colorStops) {
    //             setdirection1(property1.coords)
    //             setOffset(property1.colorStops[1].offset)
    //             setColor1(property1.colorStops[0].color)
    //             setColor2(property1.colorStops[1].color)
    //             setColor3(property1.colorStops[2].color)
    //         }
    //         else {
    //             setColor1(property1)
    //             setColor2(property1)
    //             setColor3(property1)
    //         }
    //     }
    // }


    // window.getGradient1 = getGradient1;
    // const setdirection1 = cords => {
    //     if (JSON.stringify(cords) === JSON.stringify({ x1: 0, y1: 0, x2: 1, y2: 0 })) { setDirection('to right') }
    //     if (JSON.stringify(cords) === JSON.stringify({ x1: 0, y1: 0, x2: 0, y2: 1 })) { setDirection('to bottom') }
    //     if (JSON.stringify(cords) === JSON.stringify({ x1: 0, y1: 0, x2: 1, y2: 1 })) { setDirection('to bottom right') }
    //     if (JSON.stringify(cords) === JSON.stringify({ x1: 0, y1: 1, x2: 1, y2: 0 })) { setDirection('to right top') }
    // }
    // useEffect(() => {
    //     getGradient1()
    //     return () => {
    //         //   second
    //     }
    //     // eslint-disable-next-line 
    // }, [])


    return (<>

        <div>
            <ColorGradient2 />
        </div>

        {/* <button onClick={getGradient}>Get Gradient</button>

        <div style={{ display: 'flex' }}>
            <div>
                <div style={{ margin: 5, border: '2px solid blue', width: 295, height: 100, backgroundImage: `linear-gradient(${direction}, ${color1} 0%, ${color2} ${offset * 100}%, ${color3} 100%)` }} />
                <input style={{ width: 295 }} onChange={e => onOffsetChange(e)} type="range" min='0' max='1' step='.01' value={offset} />
            </div>

            <div>
                <div style={{ margin: 5, border: '2px solid blue', width: 295, height: 100, backgroundImage: `linear-gradient(${directionAngle}deg, ${color1} 0%, ${color2} ${offset * 100}%, ${color3} 100%)` }} />
                <br /> <input style={{ width: 295 }} onChange={e => ondirectionAngleChange(e)} type="range" min='1' max='179' step='1' defaultValue='179' />Angle {directionAngle}
            </div>
        </div>
        <div>
            Color 1 <input type="color" value={color1} onChange={e => changeColor1(e)} />
            Color 2 <input type="color" value={color2} onChange={e => changeColor2(e)} />
            Color 3 <input type="color" value={color3} onChange={e => changeColor3(e)} />
        </div> */}


        {/* {directions.map((val, i) => {
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
        })} */}
        <label><input type="checkbox" checked={useAngle} onChange={e => setUseAngle(val => !val)} />: UseAngle for Direction</label>

        <div style={{ margin: 5 }} >
            <button onClick={() => setGradient2Fill(canvas)}>Set Gradient Fill</button>
            {/* Background is not supported. */}
            <button onClick={() => setGradient2Stroke(canvas)}>Set Gradient Stroke</button>
            <button onClick={() => setGradient3Fill(canvas)}>Set Radial Gradient Fill (Will not work on Casparcg)</button>


        </div>


    </>)
}
export default ColorGradient
