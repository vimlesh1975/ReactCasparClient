import React, { useState } from "react";
import { Rnd } from "react-rnd";
import * as fabric from 'fabric';
import { useSelector } from 'react-redux';
import { rgbaCol } from './common'
import ColorPattern from './ColorPattern'
import GeoPattern1 from "./GeoPattern1";
const ColorGradient2 = () => {
    const canvas = useSelector(state => state.canvasReducer.canvas);

    const width1 = 295;
    const [colors, setColors] = useState(["#850000", "#ff0000", "#850000"]);
    const [opacity1, setOpacity1] = useState([0.2, 1, 0.2]);

    const positions = colors.map((color, i) => {
        return (width1 * i) / (colors.length - 1);
    });

    const [positions1, setpositions1] = useState([...positions]);


    const [directionAngle, setDirectionAngle] = useState(180);
    const [loaded, setLoaded] = useState(false);

    const changeColor = (e, i) => {
        const updatedColors = [...colors];
        updatedColors[i] = e.target.value;
        setColors(updatedColors);
    };


    const addColorwithlocation = (i, location) => {
        const updatedColors = [...colors];
        updatedColors.splice(i + 1, 0, '#' + (Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6));
        setColors(updatedColors);

        const updatedpositions1 = [...positions1];
        updatedpositions1.splice(i + 1, 0, location - 20);
        setpositions1(updatedpositions1);

        const updatedOpacity1 = [...opacity1];
        updatedOpacity1.splice(i + 1, 0, 1);
        setOpacity1(updatedOpacity1);
    };
    const deleteColor = (i) => {
        const updatedColors = [...colors];
        updatedColors.splice(i, 1);
        setColors(updatedColors);

        const updatedpositions1 = [...positions1];
        updatedpositions1.splice(i, 1);
        setpositions1(updatedpositions1);

        const updatedOpacity1 = [...opacity1];
        updatedOpacity1.splice(i, 1);
        setOpacity1(updatedOpacity1);
    };

    const ondirectionAngleChange = (e) => {
        setDirectionAngle(e.target.value);
    };


    const ondrag1 = (e, d, i) => {
        const updatedpositions1 = [...positions1];
        updatedpositions1[i] = d.x;
        setpositions1(updatedpositions1);
    };

    const gerCords = (angle) => {
        if (angle === 0) {
            return {
                x1: 0,
                y1: 1,
                x2: 0,
                y2: 0
            }
        }
        if (angle !== 180) {
            return {
                x1: 0,
                y1: (180 - angle) / 180,
                x2: 1,
                y2: angle / 180
            }
        }
        if (angle === 180) {
            return {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
            }
        }
    }

    const backgroundImagetoFabricGradient = new fabric.Gradient({
        type: "linear",
        gradientUnits: "percentage",
        coords: gerCords(parseInt(directionAngle)),
        colorStops: colors.map((color, i) => {
            return { offset: positions1[i] / width1, color: color, opacity: opacity1[i] };
        })
    });

    const fabricGradienttoBackgroundImage = (gradient) => {
        setDirectionAngle(gradient.coords.y2 * 180);
        setColors(gradient.colorStops.map((colorStop) => colorStop.color));
        setpositions1(gradient.colorStops.map((colorStop) => (colorStop.offset) * width1));
        setOpacity1(gradient.colorStops.map((colorStop) => colorStop.opacity))
    };

    window.fabricGradienttoBackgroundImage = fabricGradienttoBackgroundImage;

    return (
        <>
            <div onMouseOver={() => setLoaded(true)}>
                <button onClick={() => fabricGradienttoBackgroundImage(canvas?.getActiveObjects()[0]?.fill)}>getGradient Fill</button>
                <button onClick={() => fabricGradienttoBackgroundImage(canvas?.getActiveObjects()[0]?.stroke)}>getGradient Stroke</button>
                <button onClick={() => {
                    canvas.getActiveObjects().forEach(element => { element.set('fill', backgroundImagetoFabricGradient) });
                    canvas.requestRenderAll();
                }}>SetGradient Fill</button>

                <button onClick={() => {
                    canvas.getActiveObjects().forEach(element => { element.set('stroke', backgroundImagetoFabricGradient) });
                    canvas.requestRenderAll();
                }}>SetGradient Stroke</button>
                <div style={{ display: "flex" }}>
                    <div style={{ border: "2px solid grey" }}>
                        <div
                            style={{
                                backgroundColor: 'grey',
                                margin: 5,
                                border: "2px solid blue",
                                width: width1,
                                height: 100,
                                backgroundImage: `linear-gradient(${90}deg,${colors.map(
                                    (color, i) => {
                                        return `${rgbaCol(color, opacity1[i])}  ${100 * (positions1[i] / width1)}%`;
                                    }
                                )}`
                            }}
                        />
                        <br />{" "}
                        {loaded ? <div
                            onClick={(e) => {
                                const aa = positions1.filter((position) => {
                                    return position < e.clientX - 1024;
                                });
                                const max = Math.max(...aa);
                                const index = aa.indexOf(max);
                                addColorwithlocation(index, e.clientX - 1024);
                            }}
                            style={{ backgroundColor: "darkgray", height: 20, width: width1 }}
                        >
                            {colors.map((color, i) => {
                                return (
                                    <Rnd
                                        key={i}
                                        dragAxis="x"
                                        bounds="parent"
                                        enableResizing={false}
                                        position={{ x: positions1[i], y: 0 }}
                                        onDrag={(e, d) => ondrag1(e, d, i)}
                                    >
                                        <div
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                            style={{
                                                width: 20,
                                                height: 20,
                                                backgroundColor: color,
                                                color: "white",
                                                textAlign: "center",
                                            }}
                                        >
                                            {i}
                                        </div>
                                    </Rnd>
                                );
                            })}
                        </div> : ''}
                    </div>
                    <div style={{ marginLeft: 20, border: "2px solid grey" }}>
                        <div
                            style={{
                                backgroundColor: 'grey',
                                margin: 5,
                                border: "2px solid blue",
                                width: width1,
                                height: 100,
                                backgroundImage: `linear-gradient(${directionAngle}deg,${colors.map(
                                    (color, i) => {
                                        return `${rgbaCol(color, opacity1[i])}  ${100 * (positions1[i] / width1)}%`;
                                    }
                                )}`
                            }}
                        />
                        <div>
                            <input
                                style={{ width: width1 - 20, marginTop: 20, marginBottom: 20 }}
                                onChange={(e) => ondirectionAngleChange(e)}
                                type="range"
                                min="0"
                                max="180"
                                step="1"
                                value={directionAngle}
                            />
                            {directionAngle}
                        </div>
                    </div>
                    <div style={{ marginLeft: 20 }}>
                        {colors.map((color, i) => {
                            return (
                                <div key={i}>
                                    {i}{" "}
                                    <input
                                        type="color"
                                        value={color}
                                        onChange={(e) => changeColor(e, i)}
                                    />
                                    <button onClick={() => deleteColor(i)}>Delete</button>
                                    <input style={{ width: 70 }} type='range' min={0} max={1} step={0.1} value={opacity1[i]} onChange={(e) => {
                                        const updatedOpacity1 = [...opacity1];
                                        updatedOpacity1[i] = (e.target.value);
                                        setOpacity1(updatedOpacity1);
                                    }} />
                                    <label>{opacity1[i]}</label>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>


            < ColorPattern />
            <div style={{ marginTop: 50 }}>
                <GeoPattern1 />

            </div>

        </>
    );
};
export default ColorGradient2;
