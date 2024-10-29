import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import * as fabric from 'fabric';

const DataUpdater = () => {
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const [textNodes, settextNodes] = useState([])
    const updateData = (data) => {
        data.forEach(data2 => {
            canvas.getObjects().forEach((element) => {
                // element.set({ selectable: false, strokeUniform: false });
                try {
                    if (element.id === data2.key) {
                        if (data2.type === 'text') {
                            const originalWidth = element.width;
                            element.set({ objectCaching: false, text: data2.value.toString() })
                            if (element.textLines.length > 1) {
                                do {
                                    element.set({ width: element.width + 5 });
                                }
                                while (element.textLines.length > 1);
                                element.set({ scaleX: originalWidth / element.width });
                            }
                        }
                        else if (data2.type === 'textarea') {
                            element.set({ objectCaching: false, text: data2.value.toString() })
                        }
                        else if (data2.type === 'image') {
                            var i = new Image();
                            i.onload = function () {
                                const originalWidth = (element.width) * (element.scaleX);
                                const originalHeight = (element.height) * (element.scaleY);
                                element.set({ objectCaching: false, scaleX: (originalWidth / i.width), scaleY: (originalHeight / i.height) })
                                if (element.type === 'image') {
                                    element.setSrc(data2.value)
                                }
                                else if (element.type === 'rect') {
                                    element.set({ width: i.width, height: i.height, fill: new fabric.Pattern({ source: data2.value, repeat: 'no-repeat' }) })
                                }
                            };
                            i.src = data2.value;
                        }
                        else if (data2.type === 'shadow') {
                            element.set({ shadow: { ...element.shadow, ...data2.value } })
                        }
                        else {
                            element.set({ [data2.type]: data2.value })
                        }
                    }
                } catch (error) {
                }
            });
        })
        canvas.requestRenderAll();
    }

    const getAllKeyValue = () => {
        const aa = []
        canvas.getObjects().forEach((element) => {
            var type = (element.type === 'i-text' || element.type === 'textbox' || element.type === 'text') ? 'text' : element.type;
            if (type === 'text') {
                if (element.textLines.length > 1) {
                    aa.push({ key: element.id, value: element.text, type: 'textarea', fontFamily: element.fontFamily });
                }
                else {
                    aa.push({ key: element.id, value: element.text, type: 'text', fontFamily: element.fontFamily });
                }
            }
            if (type === 'image') {
                aa.push({ key: element.id, value: element.src, type: 'image' })
            }
        });
        settextNodes(aa);
    }

    return (
        <div >
            <div >
                <button onClick={getAllKeyValue}>Get All Key Value</button>
                <button onClick={() => updateData(textNodes)}>update on Preview</button>
            </div>
            <div style={{ maxHeight: 730, minHeight: 730, minWidth: 430, overflow: 'scroll' }}>
                <table border='0'><tbody>
                    {textNodes.map((val, i) => {
                        if (val.type === 'text' || val.type === 'textarea') {
                            return (
                                <tr key={i}>
                                    <td>
                                        <input
                                            disabled
                                            type='text'
                                            style={{ width: 80 }}
                                            value={val.key}
                                        />
                                    </td>
                                    <td>=
                                        {
                                            (isNaN(val.value) || (val.value === '')) ?
                                                ((val.type === 'text') ?
                                                    <input
                                                        style={{ width: 290, fontFamily: val.fontFamily }}
                                                        type='text'
                                                        value={val.value}
                                                        onChange={e => {
                                                            const updatednodes = textNodes.map((node, index) => (
                                                                (i === index) ? { ...node, value: e.target.value } : node
                                                            ));
                                                            settextNodes(updatednodes);
                                                        }}
                                                    /> :
                                                    <textarea
                                                        style={{ width: 290, fontFamily: val.fontFamily }}
                                                        type='text'
                                                        value={val.value}
                                                        onChange={e => {
                                                            const updatednodes = textNodes.map((node, index) => (
                                                                (i === index) ? { ...node, value: e.target.value } : node
                                                            ));
                                                            settextNodes(updatednodes);
                                                        }}
                                                    />

                                                )
                                                : (
                                                    <>
                                                        <input
                                                            style={{ width: 50, fontFamily: val.fontFamily }}
                                                            type='number'
                                                            value={val.value}
                                                            onChange={e => {
                                                                const updatednodes = textNodes.map((node, index) => (
                                                                    (i === index) ? { ...node, value: e.target.value } : node
                                                                ));
                                                                settextNodes(updatednodes);
                                                            }}
                                                        />
                                                        <button onClick={() => {
                                                            const updatednodes = textNodes.map((node, index) => (
                                                                (i === index) ? { ...node, value: parseFloat(node.value) + 1 } : node
                                                            ));
                                                            settextNodes(updatednodes);
                                                        }}>
                                                            +
                                                        </button>
                                                    </>
                                                )
                                        }
                                    </td>
                                </tr>
                            )
                        }
                        else if (val.type === 'image') {
                            return (<tr key={i}>
                                <td><input disabled type='text' style={{ width: 80 }} value={val.key}
                                    onChange={e => {
                                        const updatedKeyframe = textNodes.map((val, index) => {
                                            return (i === index) ? { ...val, key: e.target.value } : val;
                                        });
                                        settextNodes(updatedKeyframe)
                                    }}
                                /></td>
                                <td>
                                    =<img src={val.value} alt={val.key} style={{ width: 40, height: 30 }} onClick={(e) => {
                                        var input = document.createElement('input');
                                        input.type = 'file';
                                        input.addEventListener('change', function () {
                                            var file = this.files[0];
                                            var reader = new FileReader();
                                            reader.onload = function () {
                                                const updatedKeyframe = textNodes.map((val, index) => {
                                                    return (i === index) ? { ...val, value: reader.result } : val;
                                                });
                                                settextNodes(updatedKeyframe)
                                            }
                                            reader.readAsDataURL(file);
                                        });
                                        input.click();
                                    }
                                    } />
                                </td>
                            </tr>)
                        }
                        else return null
                    })}
                </tbody></table>
            </div>
        </div>
    )
}

export default DataUpdater