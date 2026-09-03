import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as fabric from 'fabric';
import { endpoint, tempAlert, stopGraphics, updateGraphics, executeScript, templateLayers, clieentPublicFolder } from '../common';
import { v4 as uuidv4 } from 'uuid';
import { FaPlay, FaStop, FaPlus, FaSave, FaSync } from 'react-icons/fa';
import { VscTrash } from 'react-icons/vsc';

const CustomClient = () => {
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const canvasList = useSelector(state => state.canvasListReducer.canvasList);
    const currentscreenSize = useSelector(state => state.currentscreenSizeReducer.currentscreenSize);
    const layers = useSelector(state => state.canvasReducer.canvas?.getObjects());
    const dispatch = useDispatch();

    const [pageName, setPageName] = useState('TeamList');
    const [textNodes, settextNodes] = useState([]);
    const [list1, setList1] = useState([]);
    const [currentRow, setCurrentRow] = useState(0);
    const refPageName = useRef();

    const saveList = () => {
        const newlist1 = [...list1];
        newlist1.push({ pageName: refPageName.current.value, pageValue: textNodes });
        setList1([...newlist1]);
    };

    const updateList = (index) => {
        const updatedList1 = list1.map((val, i) => {
            return (index !== i) ? val : { pageName: pageName, pageValue: textNodes };
        });
        setList1([...updatedList1]);
    };

    const recallList1 = (i) => {
        const index = canvasList.findIndex(val => val.pageName === list1[i].pageName);
        if (index !== -1) {
            setPageName(list1[i].pageName);
            settextNodes(list1[i].pageValue);
            setCurrentRow(i);
            dispatch({ type: 'CHANGE_CURRENT_PAGE', payload: index });
        } else {
            tempAlert('Pagename not available', 1000, "position:absolute;top:40%;left:60%;background-color:white;font-size:40px");
        }
    };

    const deleteData = (index) => {
        const updatedList1 = list1.filter((_, i) => (index !== i));
        setList1([...updatedList1]);
    };

    const recallPage = (layerNumber, targetPageName, data) => {
        const index = canvasList.findIndex(val => val.pageName === targetPageName);
        if (index !== -1) {
            const data1 = data;
            canvas.loadFromJSON(canvasList[index].pageValue).then(() => {
                data1.forEach(data2 => {
                    canvas.getObjects().forEach((element) => {
                        try {
                            if (element.id === data2.key) {
                                if (data2.type === 'text') {
                                    const originalWidth = element.width;
                                    element.set({ objectCaching: false, text: data2.value.toString() });
                                    if (element.textLines.length > 1) {
                                        do {
                                            element.set({ width: element.width + 5 });
                                        } while (element.textLines.length > 1);
                                        element.set({ scaleX: originalWidth / element.width });
                                    }
                                } else if (data2.type === 'textarea') {
                                    element.set({ objectCaching: false, text: data2.value.toString() });
                                } else if (data2.type === 'image') {
                                    var i = new Image();
                                    i.onload = function () {
                                        const originalWidth = (element.width) * (element.scaleX);
                                        const originalHeight = (element.height) * (element.scaleY);
                                        element.set({ objectCaching: false, scaleX: (originalWidth / i.width), scaleY: (originalHeight / i.height) });
                                        if (element.type === 'image') {
                                            element.setSrc(data2.value);
                                        } else if (element.type === 'rect') {
                                            element.set({ width: i.width, height: i.height, fill: new fabric.Pattern({ source: data2.value, repeat: 'no-repeat' }) });
                                        }
                                    };
                                    i.src = data2.value;
                                } else if (data2.type === 'shadow') {
                                    element.set({ shadow: { ...element.shadow, ...data2.value } });
                                } else {
                                    element.set({ [data2.type]: data2.value });
                                }
                            }
                        } catch (error) {
                        }
                    });
                });
                canvas.requestRenderAll();
                setTimeout(() => {
                    sendToCasparcg(layerNumber);
                }, 1000);
            });
        } else {
            tempAlert('Pagename not available', 1000);
        }
    };

    const sendToCasparcg = (layerNumber) => {
        canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
        executeScript(`document.getElementById('divid_${layerNumber}')?.remove()`);

        endpoint(`mixer ${window.chNumber}-${layerNumber} fill 0 0 0 1 6 ${window.animationMethod}`);
        setTimeout(() => {
            endpoint(`play ${window.chNumber}-${layerNumber} [HTML] ${clieentPublicFolder()}/xyz.html`);
        }, 250);

        const scriptforhtml = `
        var aa = document.createElement('div');
        aa.style.position='absolute';
        aa.style.top=0;
        aa.setAttribute('id','divid_' + '${layerNumber}');
        aa.style.zIndex = ${layerNumber};
        aa.innerHTML=\`${(canvas.toSVG(['id', 'class', 'selectable'])).replaceAll('"', '\\"').replaceAll("`", "\\`").replaceAll("$", "\\$")}\`;
        document.body.appendChild(aa);
        document.body.style.margin='0';
        document.body.style.padding='0';
        aa.style.zoom=(${currentscreenSize * 100}/1920)+'%';
        document.body.style.overflow='hidden';
        `;
        executeScript(scriptforhtml);

        const scriptforcaspar = `
        var aa = document.createElement('div');
        aa.style.position='absolute';
        aa.style.top=0;
        aa.setAttribute('id','divid_' + '${layerNumber}');
        aa.style.zIndex = ${layerNumber};
        aa.innerHTML=\`${(canvas.toSVG(['id', 'class', 'selectable'])).replaceAll('"', '\\"').replaceAll("`", "\\`").replaceAll("$", "\\\\$")}\`;
        document.body.appendChild(aa);
        document.body.style.margin='0';
        document.body.style.padding='0';
        aa.style.zoom=(${currentscreenSize * 100}/1920)+'%';
        document.body.style.overflow='hidden';
        `;

        setTimeout(() => {
            endpoint(`call ${window.chNumber}-${layerNumber} "${scriptforcaspar}"`);
        }, 300);
        setTimeout(() => {
            endpoint(`mixer ${window.chNumber}-${layerNumber} fill 0 0 1 1 10 ${window.animationMethod}`);
        }, 800);

        setTimeout(() => {
            updateGraphics(canvas, layerNumber);
        }, 1100);
    };

    const updateData = (layerNumber, targetPageName, data) => {
        const index = canvasList.findIndex(val => val.pageName === targetPageName);
        if (index !== -1) {
            const data1 = data;
            canvas.loadFromJSON(canvasList[index].pageValue).then(() => {
                data1.forEach(data2 => {
                    canvas.getObjects().forEach((element) => {
                        try {
                            if (element.id === data2.key) {
                                if (data2.type === 'text') {
                                    const originalWidth = element.width;
                                    element.set({ objectCaching: false, text: data2.value.toString() });
                                    if (element.textLines.length > 1) {
                                        do {
                                            element.set({ width: element.width + 5 });
                                        } while (element.textLines.length > 1);
                                        element.set({ scaleX: originalWidth / element.width });
                                    }
                                } else if (data2.type === 'textarea') {
                                    element.set({ objectCaching: false, text: data2.value.toString() });
                                } else if (data2.type === 'image') {
                                    var i = new Image();
                                    i.onload = function () {
                                        const originalWidth = (element.width) * (element.scaleX);
                                        const originalHeight = (element.height) * (element.scaleY);
                                        element.set({ objectCaching: false, scaleX: (originalWidth / i.width), scaleY: (originalHeight / i.height) });
                                        if (element.type === 'image') {
                                            element.setSrc(data2.value);
                                        } else if (element.type === 'rect') {
                                            element.set({ width: i.width, height: i.height, fill: new fabric.Pattern({ source: data2.value, repeat: 'no-repeat' }) });
                                        }
                                    };
                                    i.src = data2.value;
                                } else if (data2.type === 'shadow') {
                                    element.set({ shadow: { ...element.shadow, ...data2.value } });
                                } else {
                                    element.set({ [data2.type]: data2.value });
                                }
                            }
                        } catch (error) {
                        }
                    });
                });
                canvas.requestRenderAll();
                setTimeout(() => {
                    updateGraphics(canvas, layerNumber);
                }, 300);
            });
        }
    };

    const getAllKeyValue = () => {
        const aa = [];
        if (layers) {
            layers.forEach((element) => {
                var type = (element.type === 'i-text' || element.type === 'textbox' || element.type === 'text') ? 'text' : element.type;
                if (type === 'text') {
                    if (element.textLines && element.textLines.length > 1) {
                        aa.push({ key: element.id, value: element.text, type: 'textarea', fontFamily: element.fontFamily });
                    } else {
                        aa.push({ key: element.id, value: element.text, type: 'text', fontFamily: element.fontFamily });
                    }
                }
                if (type === 'image') {
                    aa.push({ key: element.id, value: element.src, type: 'image' });
                }
            });
        }
        settextNodes([...aa]);
    };

    // Styling
    const cardStyle = {
        backgroundColor: '#1e293b',
        borderRadius: '8px',
        border: '1px solid #334155',
        padding: '12px',
        color: '#f8fafc',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
        boxSizing: 'border-box',
        minWidth: 0,
    };

    const inputBase = {
        backgroundColor: '#0f172a',
        border: '1px solid #334155',
        borderRadius: '4px',
        color: '#ffffff',
        padding: '4px 8px',
        fontSize: '12px',
        boxSizing: 'border-box',
    };

    const btnBase = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px',
        padding: '5px 10px',
        borderRadius: '4px',
        border: 'none',
        fontWeight: '600',
        fontSize: '12px',
        cursor: 'pointer',
        color: '#ffffff',
        transition: 'all 0.15s ease',
        flexShrink: 0,
    };

    return (
        <div style={{ padding: '12px', fontFamily: 'Inter, system-ui, sans-serif', color: '#f8fafc', width: '100%', maxHeight: 'calc(100vh - 80px)', overflowY: 'auto', boxSizing: 'border-box' }}>
            
            {/* Top Toolbar / Control Header */}
            <div style={{ ...cardStyle, marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#38bdf8' }}>
                        Custom Client
                    </span>
                    <span style={{ fontSize: '11px', backgroundColor: '#334155', padding: '2px 8px', borderRadius: '10px', color: '#94a3b8' }}>
                        Layer: L{templateLayers.customClient}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <span style={{ fontSize: '11px', color: '#94a3b8' }}>Page:</span>
                        <select
                            ref={refPageName}
                            style={{ ...inputBase, fontWeight: 'bold', color: '#38bdf8' }}
                            value={pageName}
                            onChange={e => {
                                setPageName(canvasList[e.target.selectedIndex].pageName);
                                dispatch({ type: 'CHANGE_CURRENT_PAGE', payload: e.target.selectedIndex });
                                if (window.editor?.canvas) {
                                    window.editor.canvas.loadFromJSON(canvasList[e.target.selectedIndex].pageValue).then(() => {
                                        const aa = window.editor.canvas.getObjects();
                                        aa.forEach(element => {
                                            try {
                                                element.set({ objectCaching: false });
                                            } catch (error) {
                                                alert(error);
                                                return;
                                            }
                                        });
                                        window.editor.canvas.requestRenderAll();
                                    });
                                }
                            }}
                        >
                            {canvasList.map(val => <option key={uuidv4()} value={val.pageName}>{val.pageName}</option>)}
                        </select>
                    </div>

                    <button style={{ ...btnBase, backgroundColor: '#0284c7' }} onClick={getAllKeyValue} title="Inspect canvas objects and populate fields">
                        <FaSync /> Get All Keys
                    </button>
                    <button style={{ ...btnBase, backgroundColor: '#334155' }} onClick={saveList} title="Save current keys to preset list">
                        <FaSave /> Save List
                    </button>
                    <button style={{ ...btnBase, backgroundColor: '#475569' }} onClick={() => updateList(currentRow)} title="Update active preset row">
                        Update List
                    </button>
                </div>

                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <button style={{ ...btnBase, backgroundColor: '#10b981', padding: '6px 14px' }} onClick={() => recallPage(templateLayers.customClient, pageName, textNodes)} title="Play Custom Client Graphic">
                        <FaPlay /> Play
                    </button>
                    <button style={{ ...btnBase, backgroundColor: '#0284c7', padding: '6px 12px' }} onClick={() => updateData(templateLayers.customClient, pageName, textNodes)} title="Update Graphic Data">
                        Update
                    </button>
                    <button style={{ ...btnBase, backgroundColor: '#ef4444', padding: '6px 14px' }} onClick={() => stopGraphics(templateLayers.customClient)} title="Stop Custom Client Playout">
                        <FaStop /> Stop
                    </button>
                </div>
            </div>

            {/* 2-Column Split Workspace: Dynamic Key-Value Editor & Preset Lists */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '12px', alignItems: 'start' }}>
                
                {/* LEFT CARD: Dynamic Key & Value Node Editor */}
                <div style={cardStyle}>
                    <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                        <span>Key & Value Editor</span>
                        <span style={{ fontSize: '11px', color: '#64748b' }}>({textNodes.length} fields)</span>
                    </div>

                    <div style={{ maxHeight: '340px', minHeight: '160px', overflowY: 'auto', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '6px', padding: '6px' }}>
                        {textNodes.length === 0 ? (
                            <div style={{ padding: '20px', textAlign: 'center', color: '#64748b', fontSize: '12px' }}>
                                Click <b>"Get All Keys"</b> above to load editable elements from the active canvas page.
                            </div>
                        ) : (
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <tbody>
                                    {textNodes.map((val, i) => {
                                        if (val.type === 'text' || val.type === 'textarea') {
                                            return (
                                                <tr key={i} style={{ borderBottom: '1px solid #1e293b' }}>
                                                    <td style={{ padding: '4px', verticalAlign: 'middle', width: '35%' }}>
                                                        <input
                                                            disabled
                                                            type="text"
                                                            style={{ ...inputBase, width: '100%', backgroundColor: '#1e293b', color: '#94a3b8' }}
                                                            value={val.key || ''}
                                                        />
                                                    </td>
                                                    <td style={{ padding: '4px', verticalAlign: 'middle' }}>
                                                        {(isNaN(val.value) || val.value === '') ? (
                                                            (val.type === 'text') ? (
                                                                <input
                                                                    style={{ ...inputBase, width: '100%', fontFamily: val.fontFamily }}
                                                                    type="text"
                                                                    value={val.value}
                                                                    onChange={e => {
                                                                        const updated = textNodes.map((node, index) => (
                                                                            (i === index) ? { ...node, value: e.target.value } : node
                                                                        ));
                                                                        settextNodes(updated);
                                                                    }}
                                                                />
                                                            ) : (
                                                                <textarea
                                                                    style={{ ...inputBase, width: '100%', height: '50px', fontFamily: val.fontFamily, resize: 'vertical' }}
                                                                    value={val.value}
                                                                    onChange={e => {
                                                                        const updated = textNodes.map((node, index) => (
                                                                            (i === index) ? { ...node, value: e.target.value } : node
                                                                        ));
                                                                        settextNodes(updated);
                                                                    }}
                                                                />
                                                            )
                                                        ) : (
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                                <input
                                                                    style={{ ...inputBase, width: '70px', fontFamily: val.fontFamily, textAlign: 'center' }}
                                                                    type="number"
                                                                    value={val.value}
                                                                    onChange={e => {
                                                                        const updated = textNodes.map((node, index) => (
                                                                            (i === index) ? { ...node, value: e.target.value } : node
                                                                        ));
                                                                        settextNodes(updated);
                                                                    }}
                                                                />
                                                                <button
                                                                    type="button"
                                                                    style={{ ...btnBase, backgroundColor: '#334155', width: '26px', height: '26px', padding: 0 }}
                                                                    onClick={() => {
                                                                        const updated = textNodes.map((node, index) => (
                                                                            (i === index) ? { ...node, value: parseFloat(node.value || 0) + 1 } : node
                                                                        ));
                                                                        settextNodes(updated);
                                                                    }}
                                                                >
                                                                    <FaPlus size={10} />
                                                                </button>
                                                            </div>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        } else if (val.type === 'image') {
                                            return (
                                                <tr key={i} style={{ borderBottom: '1px solid #1e293b' }}>
                                                    <td style={{ padding: '4px', verticalAlign: 'middle', width: '35%' }}>
                                                        <input
                                                            disabled
                                                            type="text"
                                                            style={{ ...inputBase, width: '100%', backgroundColor: '#1e293b', color: '#94a3b8' }}
                                                            value={val.key || ''}
                                                        />
                                                    </td>
                                                    <td style={{ padding: '4px', verticalAlign: 'middle' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                            <img
                                                                src={val.value}
                                                                alt={val.key}
                                                                style={{ width: '45px', height: '30px', objectFit: 'contain', border: '1px solid #475569', borderRadius: '4px', backgroundColor: '#0f172a', cursor: 'pointer' }}
                                                                title="Click to replace image"
                                                                onClick={() => {
                                                                    var input = document.createElement('input');
                                                                    input.type = 'file';
                                                                    input.addEventListener('change', function () {
                                                                        var file = this.files[0];
                                                                        var reader = new FileReader();
                                                                        reader.onload = function () {
                                                                            const updated = textNodes.map((node, index) => (
                                                                                (i === index) ? { ...node, value: reader.result } : node
                                                                            ));
                                                                            settextNodes(updated);
                                                                        };
                                                                        reader.readAsDataURL(file);
                                                                    });
                                                                    input.click();
                                                                }}
                                                            />
                                                            <span style={{ fontSize: '11px', color: '#64748b' }}>Click to upload</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        }
                                        return null;
                                    })}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

                {/* RIGHT CARD: Saved List Presets */}
                <div style={cardStyle}>
                    <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                        <span>Saved List Presets</span>
                        <span style={{ fontSize: '11px', color: '#64748b' }}>({list1.length} saved)</span>
                    </div>

                    <div style={{ maxHeight: '340px', minHeight: '160px', overflowY: 'auto', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '6px', padding: '4px' }}>
                        {list1.length === 0 ? (
                            <div style={{ padding: '20px', textAlign: 'center', color: '#64748b', fontSize: '12px' }}>
                                No presets saved yet. Click <b>"Save List"</b> to store the current data state.
                            </div>
                        ) : (
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead>
                                    <tr style={{ color: '#94a3b8', fontSize: '11px', borderBottom: '1px solid #334155' }}>
                                        <th style={{ width: '30px', padding: '4px' }}></th>
                                        <th style={{ padding: '4px' }}>Page Name</th>
                                        <th style={{ padding: '4px' }}>Data Preview</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {list1.map((val, i) => (
                                        <tr
                                            key={i}
                                            onClick={() => {
                                                recallList1(i);
                                                const index = canvasList.findIndex(val1 => val1.pageName === val.pageName);
                                                if (index !== -1 && window.editor?.canvas) {
                                                    window.editor.canvas.loadFromJSON(canvasList[index].pageValue).then(() => {
                                                        const aa = window.editor.canvas.getObjects();
                                                        aa.forEach(element => {
                                                            try {
                                                                element.set({ objectCaching: false });
                                                                var type = (element.type === 'i-text' || element.type === 'textbox') ? 'text' : element.type;
                                                                if (type === 'text') {
                                                                    val.pageValue.forEach(element1 => {
                                                                        if (element.id === element1.key) {
                                                                            element.set({ text: element1.value.toString() });
                                                                        }
                                                                    });
                                                                }
                                                                if (type === 'image') {
                                                                    val.pageValue.forEach(element1 => {
                                                                        if (element.id === element1.key) {
                                                                            var imgObj = new Image();
                                                                            imgObj.onload = function () {
                                                                                const originalWidth = (element.width) * (element.scaleX);
                                                                                const originalHeight = (element.height) * (element.scaleY);
                                                                                element.set({ objectCaching: false, scaleX: (originalWidth / imgObj.width), scaleY: (originalHeight / imgObj.height) });
                                                                                element.setSrc(element1.value);
                                                                                window.editor.canvas.requestRenderAll();
                                                                            };
                                                                            imgObj.src = element1.value;
                                                                        }
                                                                    });
                                                                }
                                                            } catch (error) {
                                                                return;
                                                            }
                                                        });
                                                        window.editor.canvas.requestRenderAll();
                                                    });
                                                }
                                            }}
                                            style={{
                                                backgroundColor: currentRow === i ? '#1e3a5f' : '#1e293b77',
                                                borderBottom: '1px solid #1e293b',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            <td style={{ padding: '4px', textAlign: 'center' }}>
                                                <button
                                                    type="button"
                                                    style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '2px', display: 'inline-flex', alignItems: 'center' }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        deleteData(i);
                                                    }}
                                                    title="Delete Preset"
                                                >
                                                    <VscTrash />
                                                </button>
                                            </td>
                                            <td style={{ padding: '4px', fontSize: '12px', fontWeight: 'bold', color: '#38bdf8' }}>
                                                {val.pageName}
                                            </td>
                                            <td style={{ padding: '4px', fontSize: '11px', color: '#94a3b8' }} title={JSON.stringify(val.pageValue)}>
                                                {(JSON.stringify(val.pageValue)).substring(0, 50)}...
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CustomClient;