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
            <div style={{ border: '1px solid red', width: 290, marginLeft: 10 }}>
                <div>
                    <label style={{ marginLeft: 115 }}>Top:</label>
                </div>
                <div>
                    <input style={{ width: 60, textAlign: 'center', marginLeft: 100, marginBottom: 10 }}
                        type="number"
                        name="cropY"
                        value={cropValues.cropY}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Left:</label>
                    <input style={style}
                        type="number"
                        name="cropX"
                        value={cropValues.cropX}
                        onChange={handleInputChange}
                    />

                    <input style={{ width: 60, textAlign: 'center', marginLeft: 80 }}
                        type="number"
                        name="width"
                        value={cropValues.width}
                        onChange={handleInputChange}
                    />
                    <label>Right</label>
                </div>
                <div>
                    <input style={{ width: 60, textAlign: 'center', marginLeft: 100, marginTop: 10 }}
                        type="number"
                        name="height"
                        value={cropValues.height}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label style={{ marginLeft: 115 }}>Bottom:</label>
                </div>

            </div>
        </div>
    );
}

export default Crop