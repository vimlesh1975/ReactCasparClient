import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { saveFile, saveFilecsv, templateLayers, stopGraphics, updateGraphics, startGraphics, playtoGsapCaspar, stopGsapLayer } from '../common'
import Papa from "papaparse";
import * as fabric from 'fabric';
import * as XLSX from 'xlsx';
import ExcelJS from 'exceljs';
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

    const getImageDimensions = (base64) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                resolve({ width: img.width || 100, height: img.height || 60 });
            };
            img.onerror = () => {
                resolve({ width: 100, height: 60 });
            };
            img.src = base64;
        });
    };

    const createExcel = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Data');

        const headerRow = worksheet.addRow(headers);
        headerRow.font = { bold: true };

        for (let rIdx = 0; rIdx < data1.length; rIdx++) {
            const row = data1[rIdx];
            const rowValues = [];
            const imagesInRow = [];

            headers.forEach((header, colIndex) => {
                const value = row[header];
                if (typeof value === 'string' && value.startsWith('data:image/')) {
                    rowValues.push("");
                    imagesInRow.push({ colIndex, value });
                } else {
                    rowValues.push(value !== undefined && value !== null ? value : "");
                }
            });

            const addedRow = worksheet.addRow(rowValues);
            const currentRowIndex = addedRow.number;

            if (imagesInRow.length > 0) {
                addedRow.height = 150;
            }

            for (const { colIndex, value } of imagesInRow) {
                try {
                    let extension = 'png';
                    if (value.includes('image/jpeg') || value.includes('image/jpg')) {
                        extension = 'jpeg';
                    } else if (value.includes('image/gif')) {
                        extension = 'gif';
                    }

                    const base64Parts = value.split(',');
                    if (base64Parts.length < 2) continue;
                    const base64Data = base64Parts[1];

                    const imageId = workbook.addImage({
                        base64: base64Data,
                        extension: extension
                    });

                    // Set column width (character units) and row height (points) earlier
                    worksheet.getColumn(colIndex + 1).width = 40; // larger width for better fit

                    const dim = await getImageDimensions(value);
                    const imgRatio = dim.width / dim.height;

                    // Actual pixel size of the cell.
                    // Column width (chars) -> px: chars * 7 + 5 (default Calibri 11 metric).
                    // Row height (pts) -> px: 1pt = 96/72 px at 96 DPI.
                    const colPx = worksheet.getColumn(colIndex + 1).width * 7 + 5;
                    const rowPx = addedRow.height * (96 / 72);

                    // "Contain" fit: scale the image to the largest size that fits
                    // inside the actual cell while preserving aspect ratio.
                    let finalW, finalH;
                    if (imgRatio >= colPx / rowPx) {
                        finalW = colPx;
                        finalH = Math.round(colPx / imgRatio);
                    } else {
                        finalH = rowPx;
                        finalW = Math.round(rowPx * imgRatio);
                    }

                    const wFrac = finalW / colPx;
                    const hFrac = finalH / rowPx;

                    // Pixel offset (not fraction!) to center the image within the cell.
                    // NOTE: exceljs has a known bug where fractional col/row values in
                    // tl/br (twoCellAnchor) produce malformed drawing XML that Excel
                    // flags as corrupt and "repairs" on open. Using nativeCol/nativeColOff
                    // (raw EMU offsets) with an explicit ext size avoids that entirely.
                    const colPadPx = ((1 - wFrac) / 2) * colPx;
                    const rowPadPx = ((1 - hFrac) / 2) * rowPx;
                    const EMU_PER_PIXEL = 9525; // at 96 DPI
                    const pxToEmu = (px) => Math.round(px * EMU_PER_PIXEL);

                    worksheet.addImage(imageId, {
                        tl: {
                            nativeCol: colIndex,
                            nativeColOff: pxToEmu(colPadPx),
                            nativeRow: currentRowIndex - 1,
                            nativeRowOff: pxToEmu(rowPadPx),
                        },
                        ext: { width: finalW, height: finalH },
                        editAs: 'oneCell',
                    });
                } catch (e) {
                    console.error('Error adding image to excel:', e);
                }
            }
        }

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        const timestamp = new Date().toLocaleTimeString('en-US', { year: "numeric", month: "numeric", day: "numeric", hour12: false, hour: "numeric", minute: "numeric", second: "numeric" }).replace(/:/g, '-');

        if (window.showSaveFilePicker) {
            try {
                const handle = await window.showSaveFilePicker({
                    suggestedName: timestamp + '.xlsx',
                    types: [{ description: 'Excel', accept: { 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'] } }]
                });
                const writable = await handle.createWritable();
                await writable.write(blob);
                await writable.close();
                return;
            } catch (e) {
                console.error("Save cancelled or failed:", e);
            }
        }

        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = `${timestamp}.xlsx`;
        anchor.click();
        window.URL.revokeObjectURL(url);
    };

    const excelFileInputRef = useRef(null);

    const formatCellValue = (val) => {
        if (val === undefined || val === null) return "";
        if (typeof val === 'object') {
            if (val.text !== undefined) return String(val.text);
            if (val.result !== undefined) return String(val.result);
            if (Array.isArray(val.richText)) return val.richText.map(t => t.text).join('');
            if (val instanceof Date) return val.toISOString();
        }
        return String(val);
    };

    const processExcelBuffer = async (buffer) => {
        try {
            const workbook = new ExcelJS.Workbook();
            await workbook.xlsx.load(buffer);
            const worksheet = workbook.worksheets[0];

            if (worksheet && worksheet.rowCount > 0) {
                const rawRows = [];
                worksheet.eachRow({ includeEmpty: true }, (row) => {
                    const rowVals = [];
                    row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
                        rowVals[colNumber - 1] = formatCellValue(cell.value);
                    });
                    rawRows.push(rowVals);
                });

                if (rawRows.length > 0) {
                    const fileHeaders = rawRows[0].map((h, i) => (h ? h.trim() : `Header_${i + 1}`));

                    const imageMap = {};
                    const images = worksheet.getImages ? worksheet.getImages() : [];
                    for (const img of images) {
                        try {
                            const imgData = workbook.getImage(img.imageId);
                            if (imgData && imgData.buffer) {
                                const ext = imgData.extension || 'png';
                                const mimeType = (ext === 'jpeg' || ext === 'jpg') ? 'image/jpeg' : `image/${ext}`;
                                const blob = new Blob([imgData.buffer], { type: mimeType });
                                const dataUrl = await new Promise((resolve) => {
                                    const r = new FileReader();
                                    r.onload = () => resolve(r.result);
                                    r.readAsDataURL(blob);
                                });

                                const tl = img.range ? img.range.tl : null;
                                if (tl) {
                                    const rowIdx = (tl.nativeRow !== undefined ? tl.nativeRow : (tl.row !== undefined ? tl.row : 0)) - 1;
                                    const colIdx = tl.nativeCol !== undefined ? tl.nativeCol : (tl.col !== undefined ? tl.col : 0);
                                    if (rowIdx >= 0 && colIdx >= 0) {
                                        imageMap[`${rowIdx}_${colIdx}`] = dataUrl;
                                    }
                                }
                            }
                        } catch (err) {
                            console.error("Error reading image from excel:", err);
                        }
                    }

                    const parsedData = [];
                    for (let r = 1; r < rawRows.length; r++) {
                        const rowObj = {};
                        const rowData = rawRows[r] || [];
                        fileHeaders.forEach((header, c) => {
                            const imgKey = `${r - 1}_${c}`;
                            if (imageMap[imgKey]) {
                                rowObj[header] = imageMap[imgKey];
                            } else {
                                rowObj[header] = rowData[c] !== undefined ? rowData[c] : "";
                            }
                        });
                        parsedData.push(rowObj);
                    }

                    if (parsedData.length > 0) {
                        setData1(parsedData);
                        setHeaders(fileHeaders);
                        return;
                    }
                }
            }
        } catch (excelJsError) {
            console.warn("ExcelJS load failed or binary file format, falling back to XLSX:", excelJsError);
        }

        try {
            const wb = XLSX.read(new Uint8Array(buffer), { type: 'array' });
            const sheetName = wb.SheetNames[0];
            const worksheet = wb.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

            if (jsonData.length > 0) {
                setData1(jsonData);
                setHeaders(Object.keys(jsonData[0]));
            }
        } catch (err) {
            console.error("Failed to parse excel file with XLSX:", err);
        }
    };

    const openExcel = async () => {
        if (window.showOpenFilePicker) {
            try {
                const options = {
                    multiple: false,
                    types: [
                        {
                            description: 'Excel Files',
                            accept: {
                                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
                                'application/vnd.ms-excel': ['.xls'],
                                'text/csv': ['.csv']
                            },
                        },
                    ],
                };
                const [fileHandle] = await window.showOpenFilePicker(options);
                const file = await fileHandle.getFile();
                const arrayBuffer = await file.arrayBuffer();
                await processExcelBuffer(arrayBuffer);
                return;
            } catch (e) {
                if (e.name === 'AbortError') {
                    return;
                }
                console.warn("showOpenFilePicker failed, falling back to input element:", e);
            }
        }
        if (excelFileInputRef.current) {
            excelFileInputRef.current.value = null;
            excelFileInputRef.current.click();
        }
    };

    const handleExcelFileChange = (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async (evt) => {
                const buffer = evt.target.result;
                await processExcelBuffer(buffer);
            };
            reader.readAsArrayBuffer(file);
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
                <button onClick={createExcel}>Create Excel</button>
                <button onClick={openExcel}>Open Excel</button>
                <input
                    type="file"
                    ref={excelFileInputRef}
                    style={{ display: 'none' }}
                    accept=".xlsx, .xls, .csv"
                    onChange={handleExcelFileChange}
                />
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
