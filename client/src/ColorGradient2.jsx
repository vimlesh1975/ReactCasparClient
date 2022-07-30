import React, { useState } from "react";
import { Rnd } from "react-rnd";
import { fabric } from "fabric";
import { useSelector } from 'react-redux';

const ColorGradient2 = () => {
    const canvas = useSelector(state => state.canvasReducer.canvas);

    const width1 = 295;
    const [colors, setColors] = useState(["#000000", "#ff0000", "#000000"]);

    const [directionAngle, setDirectionAngle] = useState(180);
    const [loaded, setLoaded] = useState(false);

    const changeColor = (e, i) => {
        const updatedColors = [...colors];
        updatedColors[i] = e.target.value;
        setColors(updatedColors);
    };

    const addColorwithlocation = (i, location) => {
        const updatedColors = [...colors];
        updatedColors.splice(i + 1, 0, "#0000ff");
        setColors(updatedColors);

        const updatedpositions1 = [...positions1];
        updatedpositions1.splice(i + 1, 0, location - 20);
        setpositions1(updatedpositions1);
    };
    const deleteColor = (i) => {
        const updatedColors = [...colors];
        updatedColors.splice(i, 1);
        setColors(updatedColors);

        const updatedpositions1 = [...positions1];
        updatedpositions1.splice(i, 1);
        setpositions1(updatedpositions1);
    };

    const ondirectionAngleChange = (e) => {
        setDirectionAngle(e.target.value);
    };
    const positions = colors.map((color, i) => {
        return (width1 * i) / (colors.length - 1);
    });
    const [positions1, setpositions1] = useState([...positions]);

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
            return { offset: positions1[i] / width1, color: color };
        })
    });

    const fabricGradienttoBackgroundImage = (gradient) => {
        setDirectionAngle(gradient.coords.y2 * 180);
        setColors(gradient.colorStops.map((colorStop) => colorStop.color));
        setpositions1(gradient.colorStops.map((colorStop) => (colorStop.offset) * width1));
    };

    window.fabricGradienttoBackgroundImage=fabricGradienttoBackgroundImage;


    return (
        <>
            <div onMouseOver={() => setLoaded(true)}>
                <button onClick={() => fabricGradienttoBackgroundImage(canvas?.getActiveObjects()[0]?.fill)}>getGradient Fill</button>
                <button onClick={() => fabricGradienttoBackgroundImage(canvas?.getActiveObjects()[0]?.stroke)}>getGradient Stroke</button>

                <div style={{ display: "flex" }}>
                    <div style={{ border: "2px solid grey" }}>
                        <div
                            style={{
                                margin: 5,
                                border: "2px solid blue",
                                width: width1,
                                height: 100,
                                backgroundImage: `linear-gradient(${90}deg,${colors.map(
                                    (color, i) => {
                                        return `${color} ${100 * (positions1[i] / width1)}%`;
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
                                margin: 5,
                                border: "2px solid blue",
                                width: width1,
                                height: 100,
                                backgroundImage: `linear-gradient(${directionAngle}deg,${colors.map(
                                    (color, i) => {
                                        return `${color} ${100 * (positions1[i] / width1)}%`;
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
                </div>
            </div>
            <div>
                <button onClick={() => {
                    canvas.getActiveObjects().forEach(element => { element.set('fill', backgroundImagetoFabricGradient) });
                    canvas.requestRenderAll();
                }}>SetGradient Fill</button>
                <br />
                <button onClick={() => {
                    canvas.getActiveObjects().forEach(element => { element.set('stroke', backgroundImagetoFabricGradient) });
                    canvas.requestRenderAll();
                }}>SetGradient Stroke</button>
            </div>
            <div style={{ marginTop: 20 }}>
                {colors.map((color, i) => {
                    return (
                        <div key={i}>
                            {i}{" "}
                            <input
                                type="color"
                                value={colors[i]}
                                onChange={(e) => changeColor(e, i)}
                            />
                            <button onClick={() => deleteColor(i)}>Delete color</button>
                        </div>
                    );
                })}
            </div>
        </>
    );
};
export default ColorGradient2;
