import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { saveFile, templateLayers, stopGraphics, updateGraphics, startGraphics } from '../common'
import Papa from "papaparse";
import { fabric } from "fabric";
import Timer from './Timer';

import {
    FaPlay,
    FaStop,
} from "react-icons/fa";
import GsapPlayer from "../GsapPlayer";


const EditableTable = () => {
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const currentscreenSize = useSelector(state => state.currentscreenSizeReducer.currentscreenSize);

    const dispatch = useDispatch();
    const [data1, setData1] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [dataLayer, setDataLayer] = useState(templateLayers.data);

    const handleChange = (e, key, rowIndex) => {
        const aa = [...data1];
        aa[rowIndex][key] = e.target.value;
        setData1(aa);
    };

    const setText = (rowIndex) => {
        canvas.getObjects().forEach((element, i) => {
            if (element.type === 'textbox') {
                element.text = data1[rowIndex][element.id];
            }
            if (element.type === 'image') {
                const myelement = element;
                fabric.Image.fromURL(data1[rowIndex][element.id], img => {
                    img.set({ scaleX: myelement.width / img.width, scaleY: (myelement.height / img.height) })
                    img.cloneAsImage(img1 => {
                        myelement.setSrc(img1.getSrc(), () => {
                            myelement.set({ visible: true });
                            canvas.requestRenderAll();
                        })
                    })
                })
            }
        });
        canvas.requestRenderAll();
        dispatch({ type: 'CHANGE_CANVAS', payload: canvas })
    }


    const createTable = () => {
        setHeaders(
            canvas.getObjects()
                .filter((element) => (element.type === 'textbox' || element.type === 'image') && element.id != null)
                .map((element) => element.id)
        );

        const aa = canvas.getObjects().reduce((acc, element) => {
            if ((element.type === 'textbox' || element.type === 'image') && element.id != null) {
                if (element.type === 'textbox') {
                    acc[element.id] = element.text + '0';
                }
                if (element.type === 'image') {
                    acc[element.id] = element.src;
                }

            }
            return acc;
        }, {});
        setData1([aa]);
    }

    const addRows = () => {
        const aa = canvas.getObjects().reduce((acc, element) => {
            if ((element.type === 'textbox' || element.type === 'image') && element.id != null) {
                if (element.type === 'textbox') {
                    acc[element.id] = element.text + data1.length;
                }
                if (element.type === 'image') {
                    acc[element.id] = element.src;
                }

            }
            return acc;
        }, {});
        setData1([...data1, aa]);
    }

    const deleteData = (rowIndex) => {
        const aa = [...data1];
        aa.splice(rowIndex, 1);
        setData1(aa);
    }
    const createCSV = () => {
        // const rows = data1.map(row => headers.map(header => row[header]).join(','));
        const rows = data1.map(row => {
            return headers.map(header => {
                const value = row[header];
                // Escape values containing commas by enclosing them in double quotes
                return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
            }).join(',');
        });
        const data = [headers.join(','), ...rows].join('\n')
        const ss = new Date().toLocaleTimeString('en-US', { year: "numeric", month: "numeric", day: "numeric", hour12: false, hour: "numeric", minute: "numeric", second: "numeric" });

        const options = {
            fileExtension: '.txt',
            suggestedName: ss,
            types: [{
                description: 'text file',
                accept: { 'text/plain': ['.txt'] },
            }],
        };
        saveFile(options, data,)
    };

    const openCSV = async () => {
        if (window.showOpenFilePicker) {
            const options = {
                multiple: false,
                types: [
                    {
                        description: 'Text and CSV Files',
                        accept: {
                            'text/plain': ['.txt'],
                            'text/csv': ['.csv'],
                        },
                    },
                ],
            };
            const [aa] = await window.showOpenFilePicker(options);
            const file = await aa.getFile();
            Papa.parse(file, {
                header: true,
                complete: responses => {
                    setData1(responses.data);
                    setHeaders(Object.keys(responses.data[0]))
                }
            });
        }
    };

    const handleImageChange = (e, rowIndex, key) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setData1(prevData => {
                    const newData = [...prevData];
                    newData[rowIndex][key] = reader.result;
                    return newData;
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageDoubleClick = (rowIndex, key) => {
        // Trigger the hidden file input click
        document.getElementById(`fileInput-${rowIndex}-${key}`).click();
    };

    const setAndPlay = (rowIndex) => {
        setText(rowIndex);
        setTimeout(() => {
            startGraphics(canvas, dataLayer, currentscreenSize);
        }, 1000);
    }


    return (<div>
        <div>
            <button onClick={createTable}>Create Table</button>
            <button onClick={addRows}>Add Rows</button>
            <button onClick={createCSV}>Create CSV</button>
            <button onClick={openCSV}>Open CSV</button>
            Layer:<input type='number' value={dataLayer} onChange={e => setDataLayer(e.target.value)} style={{ width: 50 }} />
            <button style={{ fontSize: 25, backgroundColor: 'red' }} onClick={() => stopGraphics(dataLayer)}><FaStop /></button>


        </div>

        <div style={{ maxWidth: 900, maxHeight: 600, height: 580, overflow: 'auto' }}>
            <table border='1' >
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        {headers?.map((val, i) => <th key={i}>{val}</th>)}
                        {/* <th>Set</th> */}
                    </tr>
                </thead>
                <tbody>
                    {data1.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            <td><button onClick={() => deleteData(rowIndex)}>Delete</button></td>
                            <td><button title='Preview' onClick={() => setText(rowIndex)}>Set</button></td>
                            <td><button title='Set+Play' style={{ backgroundColor: 'darkgreen', color: 'white' }} onClick={() => {

                                setAndPlay(rowIndex, canvas, dataLayer, currentscreenSize);

                            }}><FaPlay /></button></td>
                            <td><button onClick={() => {
                                setText(rowIndex);
                                setTimeout(() => {
                                    updateGraphics(canvas, dataLayer);
                                }, 1000);
                            }}>Update</button></td>
                            {Object.entries(row).map(([key, value]) => (
                                <td key={key}>
                                    {typeof value === 'string' && value.startsWith('data:image/') ? (
                                        <>
                                            <img
                                                src={value}
                                                alt="Profile"
                                                style={{ width: 30, height: 25, cursor: 'pointer' }}
                                                onClick={() => handleImageDoubleClick(rowIndex, key)}
                                            />
                                            <input
                                                type="file"
                                                id={`fileInput-${rowIndex}-${key}`}
                                                style={{ display: 'none' }}
                                                onChange={(e) => handleImageChange(e, rowIndex, key)}
                                            />
                                        </>
                                    ) : (
                                        <input
                                            type="text"
                                            value={value}
                                            onChange={e => handleChange(e, key, rowIndex)}
                                        />
                                    )}
                                </td>
                            ))}


                        </tr>
                    ))}
                </tbody>
            </table >
        </div>
        <div>
            <Timer setAndPlay={setAndPlay} dataLength={data1.length} />
        </div>
        <div style={{ border: '1px solid black', width: 680 }}>
            <GsapPlayer layer1={dataLayer} inline={true} />
        </div>

    </div>);
};

export default EditableTable;
