import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { templateLayers, stopGraphics, updateGraphics, startGraphics, playtoGsapCaspar, stopGsapLayer } from '../common';
import * as fabric from 'fabric';
import * as XLSX from 'xlsx';
import ExcelJS from 'exceljs';
import Timer from './Timer';
import { VscMove, VscTrash } from "react-icons/vsc";
import { FaPlay, FaStop, FaPlus, FaTable, FaFolderOpen, FaFileExcel, FaColumns, FaMoon, FaSun, FaSync } from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const EditableTable = () => {
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const currentscreenSize = useSelector(state => state.currentscreenSizeReducer.currentscreenSize);

    const dispatch = useDispatch();
    const [darkMode, setDarkMode] = useState(true);
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
        if (!rowData || !canvas) return;
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
        if (!canvas) return;
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
    };

    const addRows = () => {
        if (!canvas) return;
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

        if (counter >= updatedData.length) {
            setCounter(Math.max(0, updatedData.length - 1));
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

                    worksheet.getColumn(colIndex + 1).width = 40;

                    const dim = await getImageDimensions(value);
                    const imgRatio = dim.width / dim.height;

                    const colPx = worksheet.getColumn(colIndex + 1).width * 7 + 5;
                    const rowPx = addedRow.height * (96 / 72);

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

                    const colPadPx = ((1 - wFrac) / 2) * colPx;
                    const rowPadPx = ((1 - hFrac) / 2) * rowPx;
                    const EMU_PER_PIXEL = 9525;
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
            console.warn("ExcelJS load failed, falling back to XLSX:", excelJsError);
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
                if (e.name === 'AbortError') return;
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
        document.getElementById(`fileInput-${rowIndex}-${key}`).click();
    };

    const setAndPlay = (rowIndex) => {
        setText(rowIndex);
        setTimeout(() => {
            if (useGspPlayer) {
                playtoGsapCaspar(canvas, dataLayer, currentscreenSize);
            } else {
                startGraphics(canvas, dataLayer, currentscreenSize);
            }
        }, 1000);
    };

    const reArrangeColumns = () => {
        if (!canvas) return;
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
                        updatedRow[header] = element.text;
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
        }).filter(row => Object.keys(row).length > 0));
        setHeaders(headers.filter(header => header !== columnId));
    };

    const stop = () => {
        if (useGspPlayer) {
            stopGsapLayer(dataLayer);
        } else {
            stopGraphics(dataLayer);
        }
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;
        const reorderedData = Array.from(data1);
        const [movedItem] = reorderedData.splice(result.source.index, 1);
        reorderedData.splice(result.destination.index, 0, movedItem);
        setData1(reorderedData);
    };

    // Adaptive Theme Tokens
    const theme = {
        cardBg: darkMode ? '#1e293b' : '#ffffff',
        cardBorder: darkMode ? '#334155' : '#cbd5e1',
        boxBg: darkMode ? '#0f172a' : '#f8fafc',
        boxBorder: darkMode ? '#334155' : '#e2e8f0',
        inputBg: darkMode ? '#0f172a' : '#ffffff',
        inputBorder: darkMode ? '#334155' : '#cbd5e1',
        textColor: darkMode ? '#f8fafc' : '#0f172a',
        subTextColor: darkMode ? '#94a3b8' : '#64748b',
        tableHeaderBg: darkMode ? '#0f172a' : '#f1f5f9',
        rowHoverBg: darkMode ? '#1e293b88' : '#f8fafc',
        rowActiveBg: darkMode ? '#1e3a5f' : '#e0f2fe',
        badgeBg: darkMode ? '#334155' : '#e2e8f0',
        badgeColor: darkMode ? '#94a3b8' : '#475569',
    };

    const cardStyle = {
        backgroundColor: theme.cardBg,
        borderRadius: '8px',
        border: `1px solid ${theme.cardBorder}`,
        padding: '12px',
        color: theme.textColor,
        boxShadow: darkMode ? '0 4px 6px -1px rgba(0, 0, 0, 0.2)' : '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        boxSizing: 'border-box',
        transition: 'all 0.2s ease',
    };

    const btnBase = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '5px',
        padding: '5px 10px',
        borderRadius: '4px',
        border: 'none',
        fontWeight: '600',
        fontSize: '11px',
        cursor: 'pointer',
        color: '#ffffff',
        transition: 'all 0.15s ease',
        flexShrink: 0,
    };

    const iconActionBtn = {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '3px 5px',
        borderRadius: '3px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    return (
        <div
            style={{
                padding: '10px',
                fontFamily: 'Inter, system-ui, sans-serif',
                color: theme.textColor,
                width: '100%',
                maxWidth: '100%',
                minWidth: 0,
                height: 'calc(100vh - 80px)',
                display: 'flex',
                flexDirection: 'column',
                boxSizing: 'border-box',
                overflow: 'hidden'
            }}
        >
            {/* Inline Scrollbar Styles for Self-Contained Theming */}
            <style>{`
                .editable-table-scroll::-webkit-scrollbar {
                    width: 12px;
                    height: 12px;
                }
                .editable-table-scroll::-webkit-scrollbar-track {
                    background: ${darkMode ? '#0f172a' : '#e2e8f0'};
                    border-radius: 6px;
                }
                .editable-table-scroll::-webkit-scrollbar-thumb {
                    background: ${darkMode ? '#0284c7' : '#0369a1'};
                    border-radius: 6px;
                    border: 2px solid ${darkMode ? '#0f172a' : '#e2e8f0'};
                }
                .editable-table-scroll::-webkit-scrollbar-thumb:hover {
                    background: #38bdf8;
                }
                .editable-table-scroll::-webkit-scrollbar-corner {
                    background: ${darkMode ? '#0f172a' : '#e2e8f0'};
                }
            `}</style>
            
            {/* Top Toolbar Card */}
            <div style={{ ...cardStyle, width: '100%', maxWidth: '100%', minWidth: 0, flexShrink: 0, marginBottom: '8px', boxSizing: 'border-box' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '8px', borderBottom: `1px solid ${theme.cardBorder}`, paddingBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                        <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
                            <FaTable /> Data Playout & Spreadsheets
                        </span>
                        <span style={{ fontSize: '11px', backgroundColor: theme.badgeBg, padding: '2px 8px', borderRadius: '10px', color: theme.badgeColor, whiteSpace: 'nowrap' }}>
                            {data1.length} Rows | {headers.length} Cols
                        </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        {/* Dark Mode Switch */}
                        <label
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                fontSize: '11px',
                                cursor: 'pointer',
                                padding: '3px 8px',
                                borderRadius: '16px',
                                backgroundColor: theme.boxBg,
                                border: `1px solid ${theme.cardBorder}`,
                                color: theme.textColor,
                                userSelect: 'none',
                                whiteSpace: 'nowrap',
                            }}
                            title="Toggle Dark / Light Mode"
                        >
                            <input
                                type="checkbox"
                                checked={darkMode}
                                onChange={e => setDarkMode(e.target.checked)}
                                style={{ cursor: 'pointer' }}
                            />
                            {darkMode ? <FaMoon color="#38bdf8" /> : <FaSun color="#f59e0b" />}
                            <span>{darkMode ? 'Dark' : 'Light'}</span>
                        </label>

                        <label style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', cursor: 'pointer', color: theme.textColor, whiteSpace: 'nowrap' }}>
                            <input
                                type="checkbox"
                                checked={useGspPlayer}
                                onChange={() => setUseGspPlayer(val => !val)}
                            />
                            Use GSAP Player
                        </label>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
                            <span style={{ fontSize: '11px', color: theme.subTextColor }}>Layer:</span>
                            <input
                                type="number"
                                value={dataLayer}
                                onChange={e => setDataLayer(parseInt(e.target.value) || 0)}
                                style={{ width: '45px', backgroundColor: theme.inputBg, border: `1px solid ${theme.inputBorder}`, color: theme.textColor, borderRadius: '4px', padding: '2px 4px', textAlign: 'center', fontSize: '11px' }}
                            />
                        </div>

                        <button style={{ ...btnBase, backgroundColor: '#ef4444', padding: '4px 10px' }} onClick={stop} title="Stop Graphics Playout">
                            <FaStop /> Stop
                        </button>
                    </div>
                </div>

                {/* Spreadsheet Action Buttons */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <button style={{ ...btnBase, backgroundColor: '#0284c7' }} onClick={createTable} title="Generate headers & row from active canvas items">
                        <FaTable /> Create Table
                    </button>
                    <button style={{ ...btnBase, backgroundColor: '#10b981' }} onClick={addRows} title="Append row with incremented index">
                        <FaPlus /> Add Row
                    </button>
                    <button style={{ ...btnBase, backgroundColor: '#4f46e5' }} onClick={openExcel} title="Import .xlsx, .xls, or .csv spreadsheet">
                        <FaFolderOpen /> Open Excel
                    </button>
                    <input
                        type="file"
                        ref={excelFileInputRef}
                        style={{ display: 'none' }}
                        accept=".xlsx, .xls, .csv"
                        onChange={handleExcelFileChange}
                    />
                    <button style={{ ...btnBase, backgroundColor: '#059669' }} onClick={createExcel} title="Export data & embedded images as .xlsx spreadsheet">
                        <FaFileExcel /> Export Excel
                    </button>
                    <button style={{ ...btnBase, backgroundColor: darkMode ? '#334155' : '#64748b' }} onClick={reArrangeColumns} title="Sync columns with active canvas objects">
                        <FaColumns /> Re-Arrange Cols
                    </button>
                </div>
            </div>

            {/* Drag and Drop Data Table Card */}
            <div style={{ ...cardStyle, width: '100%', maxWidth: '100%', minWidth: 0, flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', boxSizing: 'border-box', overflow: 'hidden' }}>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided) => (
                            <div
                                className="editable-table-scroll"
                                style={{
                                    flex: 1,
                                    minHeight: 0,
                                    width: '100%',
                                    maxWidth: '100%',
                                    minWidth: 0,
                                    overflowX: 'auto',
                                    overflowY: 'auto',
                                    scrollbarWidth: 'auto',
                                    scrollbarColor: `${darkMode ? '#0284c7 #0f172a' : '#0369a1 #e2e8f0'}`,
                                    backgroundColor: theme.boxBg,
                                    border: `1px solid ${theme.boxBorder}`,
                                    borderRadius: '6px',
                                    boxSizing: 'border-box',
                                    display: 'block',
                                }}
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {data1.length === 0 ? (
                                    <div style={{ padding: '30px', textAlign: 'center', color: theme.subTextColor, fontSize: '12px' }}>
                                        No data table created yet. Click <b>"Create Table"</b> or <b>"Open Excel"</b> to get started.
                                    </div>
                                ) : (
                                    <table style={{ width: 'max-content', minWidth: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
                                        <thead>
                                            <tr style={{ backgroundColor: theme.tableHeaderBg, borderBottom: `1px solid ${theme.cardBorder}`, color: theme.subTextColor, fontSize: '11px', position: 'sticky', top: 0, zIndex: 2 }}>
                                                <th style={{ width: '30px', padding: '6px', textAlign: 'center' }}>#</th>
                                                <th style={{ width: '25px', padding: '6px', textAlign: 'center' }}></th>
                                                <th style={{ width: '30px', padding: '6px', textAlign: 'center' }}>Del</th>
                                                <th style={{ width: '40px', padding: '6px', textAlign: 'center' }}>Set</th>
                                                <th style={{ width: '45px', padding: '6px', textAlign: 'center' }}>Play</th>
                                                <th style={{ width: '55px', padding: '6px', textAlign: 'center' }}>Update</th>
                                                {headers?.map((val, i) => (
                                                    <th key={i} style={{ padding: '6px', borderLeft: `1px solid ${theme.cardBorder}`, minWidth: '170px', width: '170px', boxSizing: 'border-box' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4px' }}>
                                                            <span style={{ fontWeight: 'bold', color: '#38bdf8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{val}</span>
                                                            <button
                                                                style={{ ...iconActionBtn, color: '#ef4444' }}
                                                                onClick={() => deleteColumn(val)}
                                                                title={`Delete column ${val}`}
                                                            >
                                                                <VscTrash size={12} />
                                                            </button>
                                                        </div>
                                                    </th>
                                                ))}
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
                                                            style={{
                                                                ...provided.draggableProps.style,
                                                                backgroundColor: (counter === rowIndex) ? theme.rowActiveBg : (snapshot.isDragging ? (darkMode ? '#334155' : '#e2e8f0') : 'transparent'),
                                                                borderBottom: `1px solid ${theme.cardBorder}`,
                                                            }}
                                                        >
                                                            <td style={{ padding: '4px', textAlign: 'center', fontWeight: 'bold', color: theme.subTextColor }}>
                                                                {rowIndex + 1}
                                                            </td>
                                                            <td style={{ padding: '4px', textAlign: 'center', cursor: 'grab' }} title="Drag to reorder row" {...provided.dragHandleProps}>
                                                                <VscMove color={theme.subTextColor} />
                                                            </td>
                                                            <td style={{ padding: '4px', textAlign: 'center' }}>
                                                                <button
                                                                    style={{ ...iconActionBtn, color: '#ef4444' }}
                                                                    onClick={() => deleteData(rowIndex)}
                                                                    title="Delete Row"
                                                                >
                                                                    <VscTrash />
                                                                </button>
                                                            </td>
                                                            <td style={{ padding: '4px', textAlign: 'center' }}>
                                                                <button
                                                                    style={{ ...btnBase, backgroundColor: '#0284c7', padding: '2px 6px', fontSize: '10px' }}
                                                                    title="Preview on Canvas"
                                                                    onClick={() => setText(rowIndex)}
                                                                >
                                                                    Set
                                                                </button>
                                                            </td>
                                                            <td style={{ padding: '4px', textAlign: 'center' }}>
                                                                <button
                                                                    style={{ ...btnBase, backgroundColor: '#10b981', padding: '3px 8px', fontSize: '10px' }}
                                                                    title="Set + Play Graphics"
                                                                    onClick={() => setAndPlay(rowIndex)}
                                                                >
                                                                    <FaPlay size={9} />
                                                                </button>
                                                            </td>
                                                            <td style={{ padding: '4px', textAlign: 'center' }}>
                                                                <button
                                                                    style={{ ...btnBase, backgroundColor: darkMode ? '#334155' : '#64748b', padding: '2px 6px', fontSize: '10px' }}
                                                                    onClick={() => {
                                                                        setText(rowIndex);
                                                                        setTimeout(() => {
                                                                            updateGraphics(canvas, dataLayer);
                                                                        }, 1000);
                                                                    }}
                                                                    title="Update live graphics"
                                                                >
                                                                    <FaSync size={9} />
                                                                </button>
                                                            </td>

                                                            {headers.map(key => (
                                                                <td key={key} style={{ padding: '4px', borderLeft: `1px solid ${theme.cardBorder}`, minWidth: '170px', width: '170px', boxSizing: 'border-box' }}>
                                                                    {typeof row[key] === 'string' && row[key].startsWith('data:image/') ? (
                                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                                            <img
                                                                                src={row[key]}
                                                                                alt="thumbnail"
                                                                                style={{ width: '45px', height: '28px', objectFit: 'contain', border: `1px solid ${theme.cardBorder}`, borderRadius: '4px', backgroundColor: '#0f172a', cursor: 'pointer' }}
                                                                                title="Click to replace image"
                                                                                onClick={() => handleImageDoubleClick(rowIndex, key)}
                                                                            />
                                                                            <input
                                                                                type="file"
                                                                                id={`fileInput-${rowIndex}-${key}`}
                                                                                style={{ display: 'none' }}
                                                                                onChange={(e) => handleImageChange(e, rowIndex, key)}
                                                                            />
                                                                        </div>
                                                                    ) : (
                                                                        <textarea
                                                                            rows={2}
                                                                            value={row[key] || ''}
                                                                            onChange={e => handleChange(e, key, rowIndex)}
                                                                            style={{
                                                                                width: '100%',
                                                                                minWidth: '160px',
                                                                                backgroundColor: theme.inputBg,
                                                                                border: `1px solid ${theme.inputBorder}`,
                                                                                borderRadius: '4px',
                                                                                color: theme.textColor,
                                                                                padding: '3px 5px',
                                                                                fontSize: '11px',
                                                                                fontFamily: 'inherit',
                                                                                resize: 'vertical',
                                                                                boxSizing: 'border-box',
                                                                                overflow: 'auto',
                                                                            }}
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
                                )}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>

                {/* Integrated Timer Component */}
                <div style={{ flexShrink: 0, marginTop: '8px' }}>
                    <Timer
                        setAndPlay={setAndPlay}
                        dataLength={data1.length}
                        stop={stop}
                        counter={counter}
                        setCounter={setCounter}
                        darkMode={darkMode}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditableTable;
