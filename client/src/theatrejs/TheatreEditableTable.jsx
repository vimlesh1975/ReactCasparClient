import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import { executeScript, stopGraphics1, loopDirection, saveFile, templateLayers, endpoint } from '../common'
import Papa from "papaparse";
import * as fabric from 'fabric';
import TheatreTimer from './TheatreTimer';
import { VscMove, VscTrash, } from "react-icons/vsc";
import { FaPlay, FaStop, } from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';



const TheatreEditableTable = ({ playtoCasparcg }) => {
    const canvas = useSelector(state => state.canvasReducer.canvas);

    // const dispatch = useDispatch();
    const [data1, setData1] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [dataLayer, setDataLayer] = useState(templateLayers.data);
    const [counter, setCounter] = useState(0);

    const [duration, setDuration] = useState(1);

    const [loopAnimationStart, setLoopAnimationStart] = useState(0.7);
    const [loopAnimationEnd, setLoopAnimationEnd] = useState(1.5);
    const [enableLoopAnimation, setEnableLoopAnimation] = useState(false);
    const [selectedOption, setSelectedOption] = useState('alternate');

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleChange = (e, key, rowIndex) => {
        const aa = [...data1];
        aa[rowIndex][key] = e.target.value;
        setData1(aa);
    };

    const updateText2 = (canvas, layerNumber) => {

        canvas.getObjects().forEach((element, i) => {
            if (element.type === 'textbox') {
                endpoint(
                    `call ${window.chNumber}-${layerNumber} "canvas.getObjects()[${i}].set({text:CRLFtobackslashn(\\"${(element.text).replace(/\n/g, 'CRLF')}\\")});canvas.requestRenderAll();"`
                );
                executeScript(`canvas_${layerNumber}.getObjects()[${i}].set({text:"${(element.text).replace(/\n/g, 'CRLF')}"});
                canvas_${layerNumber}.requestRenderAll();
                `);
            }

            if (element.type === 'image') {
                // const bb = textNodes.find((textNode) => textNode.key === element.id);
                const ff = element.src;
                console.log(ff)
                const scriptforhtml = `fabric.FabricImage.fromURL('${ff}').then(img => {
                    img.set({ scaleX: ${element.width} / img.width, scaleY: (${element.height} / img.height) });
                        canvas_${layerNumber}.getObjects()[${i}].setSrc(img.cloneAsImage().getSrc()).then(() => {
                            canvas_${layerNumber}.getObjects()[${i}].set({ visible: true });
                            setTimeout(() => {
                                changePropOfObject('${element.id}', 'scaleX', getPropOfObject('${element.id}', 'scaleX') + 0.00001);
                            }, 100);
                            canvas_${layerNumber}.requestRenderAll();
                        })
                })`;
                const scriptforcaspar = `fabric.FabricImage.fromURL('${ff}').then(img => {
                    img.set({ scaleX: ${element.width} / img.width, scaleY: (${element.height} / img.height) });
                        canvas.getObjects()[${i}].setSrc(img.cloneAsImage().getSrc()).then(() => {
                            canvas.getObjects()[${i}].set({ visible: true });
                            setTimeout(() => {
                                changePropOfObject('${element.id}', 'scaleX', getPropOfObject('${element.id}', 'scaleX') + 0.00001);
                            }, 100);
                            canvas.requestRenderAll();
                        })
                })`;
                endpoint(
                    `call ${window.chNumber}-${layerNumber} "${scriptforcaspar}";`
                );
                executeScript(scriptforhtml);
            }
        });

    };
    // const setTextold = (rowIndex) => {
    //     const rowData = data1[rowIndex];
    //     if (!rowData) return;
    //     canvas.getObjects().forEach(element => {
    //         element.set({ objectCaching: false });

    //         const dataValue = rowData[element.id];
    //         if (!dataValue) return;
    //         if (element.type === 'textbox') {
    //             element.set({ text: dataValue.toString() });
    //             canvas.requestRenderAll();
    //         } else if (element.type === 'image') {
    //             fabric.FabricImage.fromURL(dataValue).then(img => {
    //                 img.set({
    //                     scaleX: element.width / img.width,
    //                     scaleY: element.height / img.height
    //                 });
    //                 element.setSrc(img.cloneAsImage().getSrc()).then(() => {
    //                     element.set({ visible: true });
    //                     canvas.requestRenderAll();
    //                 });
    //             });
    //         }
    //     });

    //     canvas.requestRenderAll();
    //     // dispatch({ type: 'CHANGE_CANVAS', payload: canvas });
    // };

    const setText = (rowIndex) => {
        return new Promise((resolve, reject) => {
            try {
                const rowData = data1[rowIndex];
                if (!rowData) return resolve();

                const promises = canvas.getObjects().map(element => {
                    element.set({ objectCaching: false });

                    const dataValue = rowData[element.id];
                    if (!dataValue) return Promise.resolve();

                    if (element.type === 'textbox') {
                        element.set({ text: dataValue.toString() });
                        return Promise.resolve();
                    } else if (element.type === 'image') {
                        return fabric.FabricImage.fromURL(dataValue)
                            .then(img => {
                                img.set({
                                    scaleX: element.width / img.width,
                                    scaleY: element.height / img.height
                                });
                                return element.setSrc(img.cloneAsImage().getSrc())
                                    .then(() => {
                                        element.set({ visible: true, src: img.cloneAsImage().getSrc() });
                                    });
                            });
                    } else {
                        return Promise.resolve();
                    }
                });

                // Once all promises are resolved, request render and resolve the setText promise
                Promise.all(promises).then(() => {
                    canvas.requestRenderAll();
                    resolve();
                });
            } catch (error) {
                reject(error);
            }
        });
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
            playtoCasparcg(dataLayer, 1, duration, enableLoopAnimation, loopAnimationStart, loopAnimationEnd, selectedOption)
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
        stopGraphics1(dataLayer)
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

    return (<div>
        <div>
            <button onClick={createTable}>Create Table</button>
            <button onClick={addRows}>Add Rows</button>
            <button onClick={createCSV}>Create CSV</button>
            <button onClick={openCSV}>Open CSV</button>
            <button onClick={reArrangeColumns}>Re Arrange Colums</button>

            <span title='Duration'>D:</span><input title='Time in second' type="number" value={duration} style={{ width: 50 }} onChange={e => setDuration(e.target.value)} />
            Layer:<input type='number' value={dataLayer} onChange={e => setDataLayer(e.target.value)} style={{ width: 50 }} />
            <button title='Reverse Play and Remove' onClick={() => stopGraphics1(dataLayer)}><FaStop /></button>
            <div>
                <input type='checkbox' checked={enableLoopAnimation} onChange={() => setEnableLoopAnimation(val => !val)} /><span>Enable Loop Anim</span>
                <span >Start:</span><input title='Time in second' type="number" value={loopAnimationStart} style={{ width: 50 }} onChange={e => { if (e.target.value < loopAnimationEnd) setLoopAnimationStart(e.target.value) }} />
                <span >End:</span><input title='Time in second' type="number" value={loopAnimationEnd} style={{ width: 50 }} onChange={e => { if (e.target.value > loopAnimationStart) setLoopAnimationEnd(e.target.value) }} />
            </div>
            <div>
                {loopDirection.map((option, index) => (
                    <label key={index}>
                        <input
                            type="radio"
                            value={option}
                            checked={selectedOption === option}
                            onChange={handleOptionChange}
                        />
                        {option}
                    </label>
                ))}
            </div>


        </div>

        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided) => (
                    <div style={{ maxWidth: 1700, maxHeight: 600, height: 580, overflow: 'auto' }} {...provided.droppableProps} ref={provided.innerRef}>
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
                                        {(provided, snapshot) => (
                                            <tr
                                                key={rowIndex}
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                // style={{
                                                //     ...provided.draggableProps.style, backgroundColor: (counter === rowIndex) ? 'grey' : '', transform: snapshot.isDragging ? `translate(${0}px, ${-300 + snapshot.draggingOverWith ? provided.draggableProps.style.y : 0}px)` : `translate(${0}px, ${0}px)`,
                                                // }}
                                                style={{
                                                    ...provided.draggableProps.style, backgroundColor: (counter === rowIndex) ? 'grey' : '', left: "auto !important",
                                                    top: "auto !important",
                                                }}
                                            >
                                                <td>{rowIndex}</td>
                                                <td title='Move' {...provided.dragHandleProps}><VscMove /></td>
                                                <td><button onClick={() => deleteData(rowIndex)}><VscTrash /></button></td>
                                                <td><button title='Preview' onClick={() => setText(rowIndex)}>Set</button></td>

                                                <td><button title='Set+Play' style={{ backgroundColor: 'darkgreen', color: 'white' }} onClick={() => {
                                                    setAndPlay(rowIndex);
                                                }}><FaPlay /></button></td>
                                                <td><button title='Preview and Update' onClick={() => {
                                                    setText(rowIndex).then(() => {
                                                        updateText2(canvas, dataLayer);
                                                    });
                                                    // setTimeout(() => {
                                                    //     updateText2(canvas, dataLayer);
                                                    // }, 1000);
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
            <TheatreTimer dataLayer={dataLayer} setText={setText} updateText2={updateText2} setAndPlay={setAndPlay} dataLength={data1.length} stop={stop} counter={counter} setCounter={setCounter} />
        </div>

    </div>);
};

export default TheatreEditableTable;
