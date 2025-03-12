import React, { useState } from 'react'
import { useSelector } from "react-redux";

const style = { width: 60, textAlign: 'center' };
const Crop = () => {
    const canvas = useSelector((state) => state.canvasReducer.canvas);
    const [cropValues, setCropValues] = useState({
        cropX: 0,
        cropY: 0,
        width: 200,
        height: 200,
    });
    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCropValues((prev) => {
            const updatedValues = { ...prev, [name]: value };
            applyCrop(updatedValues); // Apply crop whenever a value changes
            return updatedValues;
        });
    };

    // Apply cropping whenever crop values change
    const applyCrop = (value) => {
        const { cropX, cropY, width, height } = value;
        canvas.getActiveObjects().forEach(element => {
            element.set({
                cropX: parseInt(cropX, 10),
                cropY: parseInt(cropY, 10),
                width: parseInt(width, 10),
                height: parseInt(height, 10),
            });
        })
        canvas.requestRenderAll();
    };

    const getwidthandHeight = () => {
        const element = canvas.getActiveObjects()[0];
        if (element) {
            if (element.type === 'image') {
                setCropValues({ cropX: element.cropX, cropY: element.cropY, width: element.width, height: element.height })
            }
        }
    }

    return (
        <div className="App">
            <h1>Fabric.js Image Cropping</h1>
            <p>After selecting an Image Click get values button</p>
            <button onClick={getwidthandHeight}>Get Values</button>
            <div style={{ border: '1px solid red', marginLeft: 10 }}>
                <div>
                    <label style={{ marginLeft: 350 }}>Top:</label>
                    <div>
                        <input style={{ width: 200, textAlign: 'center', marginLeft: 300, marginTop: 10 }}
                            onChange={handleInputChange}
                            type="range"
                            name="cropY"
                            min="-1000"
                            max="1000"
                            step="1"
                            value={cropValues.cropY}
                        />
                    </div>
                </div>
                <div>
                    <input style={{ width: 60, textAlign: 'center', marginLeft: 350, marginBottom: 10 }}
                        type="number"
                        name="cropY"
                        value={cropValues.cropY}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label style={{ marginLeft: 50 }}>Left:</label>

                    <input style={{ width: 200, textAlign: 'center', marginLeft: 0, marginTop: 10 }}
                        onChange={handleInputChange}
                        type="range"
                        name="cropX"
                        min="-1000"
                        max="1000"
                        step="1"
                        value={cropValues.cropX}
                    />
                    <input style={style}
                        type="number"
                        name="cropX"
                        value={cropValues.cropX}
                        onChange={handleInputChange}
                    />

                    <input style={{ width: 60, textAlign: 'center', marginLeft: 60 }}
                        type="number"
                        name="width"
                        value={cropValues.width}
                        onChange={handleInputChange}
                    />


                    <input style={{ width: 200, textAlign: 'center', marginLeft: 20, marginTop: 10 }}
                        onChange={handleInputChange}
                        type="range"
                        name="width"
                        min="-1920"
                        max="1920"
                        step="1"
                        value={cropValues.width}
                    />


                    <label>Right</label>
                </div>
                <div>
                    <input style={{ width: 60, textAlign: 'center', marginLeft: 350, marginTop: 10 }}
                        type="number"
                        name="height"
                        value={cropValues.height}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <div>
                        <input style={{ width: 200, textAlign: 'center', marginLeft: 300, marginTop: 10 }}
                            onChange={handleInputChange}
                            type="range"
                            name="height"
                            min="-1000"
                            max="1000"
                            step="1"
                            value={cropValues.height}
                        />
                    </div>
                    <label style={{ marginLeft: 350 }}>Bottom:</label>
                </div>

            </div>
        </div>
    );
}

export default Crop