import React from 'react'
import { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fabric } from "fabric";
import { templateLayers, theatreLayers, endpoint, executeScript } from '../common'
import { v4 as uuidv4 } from 'uuid';
import { changePropOfObject, getPropOfObject } from './WebAnimator'

const playLayers = [templateLayers.theatrejs, ...theatreLayers]
const DataUpdatePanel = ({ importHtml }) => {
    const [selectedOption, setSelectedOption] = useState(166);
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const canvasList = useSelector(state => state.canvasListReducer.canvasList);
    const layers = useSelector(state => state.canvasReducer.canvas?.getObjects());
    const dispatch = useDispatch();
    const [pageName, setPageName] = useState('TeamList')
    const [textNodes, settextNodes] = useState([])
    const refPageName = useRef();

    const getAllKeyValue = () => {
        const aa = [];
        layers.forEach((element) => {
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
        settextNodes(aa)
    }

    const recallPage2 = (json, canvas, i, jsfilename1, cssfilename1, jsfilename2, cssfilename2, animationTheatrejs) => {
        dispatch({ type: 'CHANGE_CURRENT_PAGE', payload: i });

        dispatch({ type: 'CHANGE_JSFILENAME', payload: (jsfilename1 === undefined) ? 'main' : jsfilename1 });;
        dispatch({ type: 'CHANGE_CSSFILENAME', payload: (cssfilename1 === undefined) ? 'main' : cssfilename1 });

        dispatch({ type: 'CHANGE_JSFILENAME2', payload: (jsfilename2 === undefined) ? 'main2' : jsfilename2 });;
        dispatch({ type: 'CHANGE_CSSFILENAME2', payload: (cssfilename2 === undefined) ? 'main2' : cssfilename2 });

        importHtml(json, animationTheatrejs)

        dispatch({ type: 'SHOW_EXTENSIONPANNEL', payload: false });
    }

    const updateText2 = (canvas, layerNumber) => {
        textNodes.forEach((val) => {
            const element = layers.find((item) => {
                return item.id === val.key
            })
            if (val.type === 'text' || val.type === 'textarea') {
                element.set({ text: (val.value).toString() })
            }
            if (val.type === 'image') {
                fabric.Image.fromURL(val.value, img => {
                    img.set({ scaleX: element.width / img.width, scaleY: (element.height / img.height) })
                    img.cloneAsImage(img1 => {
                        element.setSrc(img1.getSrc(), () => {
                            element.set({ visible: true });
                            setTimeout(() => {
                                changePropOfObject(val.key, 'scaleX', getPropOfObject(val.key, 'scaleX') + 0.00001);
                            }, 10);
                            canvas.requestRenderAll();
                        })
                    })
                })
            }
        })
        canvas.requestRenderAll();

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
                const bb = textNodes.find((textNode) => textNode.key === element.id);
                const ff = bb.value;
                const script = `fabric.Image.fromURL('${ff}', img => {
                    img.set({ scaleX: ${element.width} / img.width, scaleY: (${element.height} / img.height) });
                    img.cloneAsImage(img1 => {
                        canvas_${layerNumber}.getObjects()[${i}].setSrc(img1.getSrc(), () => {
                            canvas_${layerNumber}.getObjects()[${i}].set({ visible: true });
                            setTimeout(() => {
                                changePropOfObject('${element.id}', 'scaleX', getPropOfObject('${element.id}', 'scaleX') + 0.00001);
                            }, 10);
                            canvas_${layerNumber}.requestRenderAll();
                        })
                    })
                })`
                endpoint(
                    `call ${window.chNumber}-${layerNumber} "${script}";`
                );
                executeScript(script);
            }
        });

    };
    const handleSelectionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    return (
        <div>
            <div >
                <div >
                    <div>
                        <span>PageName</span> <select ref={refPageName} onChange={e => {
                            setPageName(canvasList[e.target.selectedIndex].pageName);
                            const val = canvasList[e.target.selectedIndex]
                            recallPage2(val.pageValue, window.editor.canvas, e.target.selectedIndex, val.jsfilename, val.cssfilename, val.jsfilename2, val.cssfilename2, val.animationTheatrejs);
                        }} value={pageName}>
                            {canvasList.map((val, i) => { return <option key={uuidv4()} value={val.pageName}>{val.pageName}</option> })}
                        </select>
                        <button onClick={getAllKeyValue}>getAllKeyValue</button>
                    </div>
                    <button title='Update Desinger only' onClick={() => {
                        textNodes.forEach((val) => {
                            const element = layers.find((item) => {
                                return item.id === val.key
                            })
                            if (val.type === 'text' || val.type === 'textarea') {
                                element.set({ text: (val.value).toString() })
                            }
                            if (val.type === 'image') {
                                fabric.Image.fromURL(val.value, img => {
                                    img.set({ scaleX: element.width / img.width, scaleY: (element.height / img.height) })
                                    img.cloneAsImage(img1 => {
                                        element.setSrc(img1.getSrc(), () => {
                                            element.set({ visible: true });
                                            setTimeout(() => {
                                                changePropOfObject(val.key, 'scaleX', getPropOfObject(val.key, 'scaleX') + 0.00001);
                                            }, 10);
                                            canvas.requestRenderAll();
                                        })
                                    })
                                })
                            }
                        })
                        canvas.requestRenderAll()
                    }}>Update Desinger only</button>
                    <label htmlFor="myComboBox">Layer:</label>
                    <select id="myComboBox" value={selectedOption} onChange={handleSelectionChange}>
                        {playLayers.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <button title='Update Desinger and Output' onClick={() => {
                        updateText2(canvas, selectedOption)
                    }}>Update Desinger and Output</button>

                </div>
                <div style={{ maxHeight: 400, minHeight: 400, overflow: 'scroll' }}>

                    <table border='0'><tbody>
                        {textNodes.map((val, i) => {
                            if (val.type === 'text' || val.type === 'textarea') {
                                return (<tr key={i}>
                                    <td><input disabled type='text' style={{ width: 170 }} value={val.key}
                                        onChange={e => {
                                            const updatedKeyframe = textNodes.map((val, index) => {
                                                return (i === index) ? { ...val, key: e.target.value } : val;
                                            });
                                            settextNodes(updatedKeyframe)
                                        }}
                                    /></td><td>=
                                        {(isNaN(val.value) || (val.value === '')) ?
                                            ((val.type === 'text') ? <input style={{ width: 200, fontFamily: val.fontFamily }} value={val.value} onChange={e => {
                                                const updatednodes = textNodes.map((val, index) => {
                                                    return (i === index) ? { ...val, value: e.target.value } : val;
                                                });
                                                settextNodes(updatednodes)
                                            }} /> :
                                                <textarea style={{ width: 200, fontFamily: val.fontFamily }} value={val.value} onChange={e => {
                                                    const updatednodes = textNodes.map((val, index) => {
                                                        return (i === index) ? { ...val, value: e.target.value } : val;
                                                    });
                                                    settextNodes(updatednodes)
                                                }} />
                                            )
                                            : <><input style={{ width: 70, fontFamily: val.fontFamily }} type='number' value={val.value} onChange={e => {
                                                const updatednodes = textNodes.map((val, index) => {
                                                    return (i === index) ? { ...val, value: e.target.value } : val;
                                                });
                                                settextNodes(updatednodes);
                                            }} /><button onClick={() => {
                                                const updatednodes = textNodes.map((val, index) => {
                                                    return (i === index) ? { ...val, value: parseFloat(val.value) + 1 } : val;
                                                });
                                                settextNodes(updatednodes);
                                            }
                                            }>+</button></>}
                                    </td>
                                </tr>)
                            }
                            else if (val.type === 'image') {
                                return (<tr key={i}>
                                    <td><input disabled type='text' style={{ width: 170 }} value={val.key}
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
        </div>
    )
}

export default DataUpdatePanel