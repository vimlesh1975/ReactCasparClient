import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { saveFile, templateLayers, stopGraphics, updateGraphics, startGraphics, playtoGsapCaspar, stopGsapLayer } from '../common'
import Papa from "papaparse";
import * as fabric from 'fabric';
import Timer from './Timer';
import { VscMove, VscTrash } from "react-icons/vsc";
import { FaPlay, FaStop } from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const EditableTable = () => {
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const currentscreenSize = useSelector(state => state.currentscreenSizeReducer.currentscreenSize);

    const dispatch = useDispatch();
    const [data1, setData1] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [useGspPlayer, setUseGspPlayer] = useState(true);
    const [dataLayer, setDataLayer] = useState(templateLayers.data);
    const [counter, setCounter] = useState(0);

    const handleChange = (e, key, rowIndex) => {
        const aa = [...data1];
        aa[rowIndex][key] = e.target.value;
        setData1(aa);
    };
    const setText = (rowIndex) => {
        const rowData = data1[rowIndex];
        if (!rowData) return;
        canvas.getObjects().forEach(element => {
            element.set({ objectCaching: false });
            const dataValue = rowData[element.id];
            if (!dataValue) return;
            if (element.type === 'textbox') {
                element.set({ text: dataValue.toString() });
                canvas.requestRenderAll();
            } else if (element.type === 'image') {
                fabric.FabricImage.fromURL(dataValue).then(img => {
                    img.set({
                        scaleX: element.width / img.width,
                        scaleY: element.height / img.height
                    });
                    element.setSrc(img.cloneAsImage().getSrc()).then(() => {
                        element.set({ visible: true });
                        canvas.requestRenderAll();
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

        // Check if counter exceeds the new maximum value
        if (counter >= updatedData.length) {
            // Adjust counter to the new maximum value
            setCounter(updatedData.length - 1);
        }
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
        saveFile(options, csvData)
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

    const deleteColumn = (columnId) => {
        setData1(data1.map(row => {
            const newRow = { ...row };
            delete newRow[columnId];
            return newRow;
        }).filter(row => Object.keys(row).length > 0)); // Remove rows without any data
        setHeaders(headers.filter(header => header !== columnId));
    };

    const stop = () => {
        if (useGspPlayer) {
            stopGsapLayer(dataLayer)
        }
        else {
            stopGraphics(dataLayer);
        }
    }

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const reorderedData = Array.from(data1);
        const [movedItem] = reorderedData.splice(result.source.index, 1);
        reorderedData.splice(result.destination.index, 0, movedItem);

        setData1(reorderedData);
    };

    return (
        <div>
            <div>
                <button onClick={createTable}>Create Table</button>
                <button onClick={addRows}>Add Rows</button>
                <button onClick={createCSV}>Create CSV</button>
                <button onClick={openCSV}>Open CSV</button>
                <button onClick={reArrangeColumns}>Re Arrange Columns</button>
                Layer:<input type='number' value={dataLayer} onChange={e => setDataLayer(e.target.value)} style={{ width: 50 }} />
                <button style={{ fontSize: 25, backgroundColor: 'red' }} onClick={stop}><FaStop /></button>
                <input
                    type="checkbox"
                    checked={useGspPlayer}
                    onChange={() => setUseGspPlayer((val) => !val)}
                /><label>Use Gsap Player</label>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided) => (
                        <div style={{ maxWidth: 900, maxHeight: 600, height: 580, overflow: 'auto' }} {...provided.droppableProps} ref={provided.innerRef}>
                            <table border='1'>
                                <thead>
                                    <tr>
                                        <th>sr</th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        {headers?.map((val, i) => <th key={i}>
                                            {val} <br />
                                            <button onClick={() => deleteColumn(val)}><VscTrash /></button>
                                        </th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {data1.map((row, rowIndex) => (
                                        <Draggable key={rowIndex} draggableId={String(rowIndex)} index={rowIndex}>
                                            {(provided) => (
                                                <tr
                                                    key={rowIndex}
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    // {...provided.dragHandleProps}
                                                    style={{ ...provided.draggableProps.style, backgroundColor: (counter === rowIndex) ? 'grey' : '' }}
                                                >
                                                    <td>{rowIndex}</td>
                                                    <td title='Move' {...provided.dragHandleProps}><VscMove /></td>
                                                    <td><button onClick={() => deleteData(rowIndex)}><VscTrash /></button></td>
                                                    <td><button title='Preview' onClick={() => setText(rowIndex)}>Set</button></td>
                                                    <td><button title='Set+Play' style={{ backgroundColor: 'darkgreen', color: 'white' }} onClick={() => {
                                                        setAndPlay(rowIndex);
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
                                                                        style={{ width: 50, height: 30, cursor: 'pointer' }}
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
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </tbody>
                            </table>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <div>
                <Timer setAndPlay={setAndPlay} dataLength={data1.length} stop={stop} counter={counter} setCounter={setCounter} />
            </div>
        </div>
    );
};

export default EditableTable;
