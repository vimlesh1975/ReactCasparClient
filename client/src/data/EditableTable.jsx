import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { saveFile, templateLayers, stopGraphics, updateGraphics, startGraphics, playtoGsapCaspar, stopGsapLayer } from '../common'
import Papa from "papaparse";
import { fabric } from "fabric";
import Timer from './Timer';



import {
    FaPlay,
    FaStop,
} from "react-icons/fa";


const EditableTable = () => {
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const currentscreenSize = useSelector(state => state.currentscreenSizeReducer.currentscreenSize);

    const dispatch = useDispatch();
    const [data1, setData1] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [useGspPlayer, setUseGspPlayer] = useState(true);
    const [dataLayer, setDataLayer] = useState(templateLayers.data);

    const handleChange = (e, key, rowIndex) => {
        const aa = [...data1];
        aa[rowIndex][key] = e.target.value;
        setData1(aa);
    };

    const setText = (rowIndex) => {
        const rowData = data1[rowIndex];

        if (!rowData) return;

        canvas.getObjects().forEach(element => {
            const dataValue = rowData[element.id];

            if (!dataValue) return;

            if (element.type === 'textbox') {
                element.text = dataValue.toString();
            } else if (element.type === 'image') {
                fabric.Image.fromURL(dataValue, img => {
                    img.set({
                        scaleX: element.width / img.width,
                        scaleY: element.height / img.height
                    });
                    img.cloneAsImage(clonedImg => {
                        element.setSrc(clonedImg.getSrc(), () => {
                            element.set({ visible: true });
                            canvas.requestRenderAll();
                        });
                    });
                });
            }
        });

        canvas.requestRenderAll();
        dispatch({ type: 'CHANGE_CANVAS', payload: canvas });
    };



    const createTable = () => {
        const newHeaders = canvas.getObjects()
            .filter(element => (element.type === 'textbox' || element.type === 'image') && element.id != null)
            .map(element => element.id);

        setHeaders(newHeaders);

        const initialData = canvas.getObjects().reduce((acc, element) => {
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
        setData1([initialData]);
    }

    const addRows = () => {
        const newRow = canvas.getObjects().reduce((acc, element) => {
            if (element.type === 'textbox' && element.id != null) {
                acc[element.id] = element.text + data1.length;
            } else if (element.type === 'image' && element.id != null) {
                acc[element.id] = element.src;
            }
            return acc;
        }, {});

        setData1([...data1, newRow]);
    };

    const deleteData = (rowIndex) => {
        const updatedData = [...data1];
        updatedData.splice(rowIndex, 1);
        setData1(updatedData);
    };

    const createCSV = () => {
        const rows = data1.map(row => {
            return headers.map(header => {
                const value = row[header];
                return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
            }).join(',');
        });
        const csvData = [headers.join(','), ...rows].join('\n')
        const timestamp = new Date().toLocaleTimeString('en-US', { year: "numeric", month: "numeric", day: "numeric", hour12: false, hour: "numeric", minute: "numeric", second: "numeric" });

        const options = {
            fileExtension: '.csv',
            suggestedName: timestamp,
            types: [{
                description: 'csv file',
                accept: { 'text/csv': ['.csv'] },
            }],
        };
        saveFile(options, csvData,)
    };

    const openCSV = async () => {
        if (window.showOpenFilePicker) {
            const options = {
                multiple: false,
                types: [
                    {
                        description: 'CSV Files',
                        accept: {
                            'text/csv': ['.csv'],
                        },
                    },
                ],
            };
            const [fileHandle] = await window.showOpenFilePicker(options);
            const file = await fileHandle.getFile();
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
            if (useGspPlayer) {
                playtoGsapCaspar(canvas, dataLayer, currentscreenSize)
            }
            else {
                startGraphics(canvas, dataLayer, currentscreenSize);
            }
        }, 1000);
    }
    const reArrangeColumns = () => {
        const newHeaders = canvas.getObjects()
            .filter(element => (element.type === 'textbox' || element.type === 'image') && element.id != null)
            .map(element => element.id);

        const updatedData = data1.map(row => {
            const updatedRow = {};
            newHeaders.forEach(header => {
                const element = canvas.getObjects().find(element => element.id === header);
                if (row[header] === undefined) {
                    if (element.type === 'image') {
                        updatedRow[header] = element.src;
                    } else if (element.type === 'textbox') {
                        updatedRow[header] = element.text; // Default value for text elements
                    }
                } else {
                    updatedRow[header] = row[header];
                }
            });
            return updatedRow;
        });

        setHeaders(newHeaders);
        setData1(updatedData);
    };




    return (<div>
        <div>
            <button onClick={createTable}>Create Table</button>
            <button onClick={addRows}>Add Rows</button>
            <button onClick={createCSV}>Create CSV</button>
            <button onClick={openCSV}>Open CSV</button>
            <button onClick={reArrangeColumns}>Re Arrange Colums</button>
            Layer:<input type='number' value={dataLayer} onChange={e => setDataLayer(e.target.value)} style={{ width: 50 }} />
            <button style={{ fontSize: 25, backgroundColor: 'red' }} onClick={() => {
                if (useGspPlayer) {
                    stopGsapLayer(dataLayer)
                }
                else {
                    stopGraphics(dataLayer);
                }

            }}><FaStop /></button>
            <input
                type="checkbox"
                checked={useGspPlayer}
                onChange={() => setUseGspPlayer((val) => !val)}
            /><label>Use Gsap Player</label>
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
                            {headers.map(key => (
                                <td key={key}>
                                    {typeof row[key] === 'string' && row[key].startsWith('data:image/') ? (
                                        <>
                                            <img
                                                src={row[key]}
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
                                        <textarea
                                            cols={4}
                                            rows={2}
                                            value={row[key]}
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

    </div>);
};

export default EditableTable;
