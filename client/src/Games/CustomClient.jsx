import React from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fabric } from "fabric";
import { endpoint } from '../common'
import { v4 as uuidv4 } from 'uuid';


const CustomClient = () => {
    const canvasList = useSelector(state => state.canvasListReducer.canvasList);
    const currentscreenSize = useSelector(state => state.currentscreenSizeReducer.currentscreenSize);
    // const canvas = useSelector(state => state.canvasReducer.canvas);
    const layers = useSelector(state => state.canvasReducer.canvas?.getObjects());
    const dispatch = useDispatch();

    const [pageName, setPageName] = useState('TeamList')
    const [textNodes, settextNodes] = useState([{ key: 'f0', value: 'vimlesh', type: 'text' }])
    const [list1, setList1] = useState([]);
    const [currentRow, setCurrentRow] = useState(0);

    const saveList = () => {
        const newlist1 = [...list1];
        newlist1.push({ pageName: pageName, pageValue: textNodes });
        setList1([...newlist1]);
    }
    const recallList1 = (i) => {
        setPageName(list1[i].pageName)
        settextNodes(list1[i].pageValue)
    }


    const recallPage = (layerNumber, pageName, data) => {
        const index = canvasList.findIndex(val => val.pageName === pageName);
        if (index !== -1) {
            const data1 = data;
            window.automationeditor[0].canvas.loadFromJSON(canvasList[index].pageValue, () => {
                data1.forEach(data2 => {
                    window.automationeditor[0].canvas.getObjects().forEach((element) => {
                        element.set({ selectable: false, strokeUniform: false });
                        try {
                            if (element.id === data2.key) {
                                if (data2.type === 'text') {
                                    element.set({ text: data2.value.toString() })
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
                });
                sendToCasparcg(layerNumber)
            });
        }
    }
    const sendToCasparcg = (layerNumber) => {
        endpoint(`mixer ${window.chNumber}-${layerNumber} fill 0 0 0 1 6 ${window.animationMethod}`)
        setTimeout(() => {
            endpoint(`play ${window.chNumber}-${layerNumber} [HTML] xyz.html`);
        }, 250);
        setTimeout(() => {
            endpoint(`call ${window.chNumber}-${layerNumber} "
    var aa = document.createElement('div');
    aa.style.position='absolute';
    aa.innerHTML='${(window.automationeditor[0].canvas.toSVG()).replaceAll('"', '\\"')}';
    document.body.appendChild(aa);
    document.body.style.margin='0';
    document.body.style.padding='0';
    aa.style.zoom=(${currentscreenSize * 100}/309)+'%';
    document.body.style.overflow='hidden';
    "`)
        }, 300);
        setTimeout(() => {
            endpoint(`mixer ${window.chNumber}-${layerNumber} fill 0 0 1 1 10 ${window.animationMethod}`)
        }, 800);

        setTimeout(() => {
            updateGraphics(layerNumber);
        }, 1100);
    }
    //aa.innerHTML=\\"<img src='${(window.automationeditor[0].canvas.toDataURL('png'))}' />\\" ; png method
    const updateGraphics = layerNumber => {
        endpoint(`call ${window.chNumber}-${layerNumber} "
    aa.innerHTML='${(window.automationeditor[0].canvas.toSVG()).replaceAll('"', '\\"')}';
        "`)
    }
    const stopGraphics = layerNumber => {
        endpoint(`mixer ${window.chNumber}-${layerNumber} fill 0 0 0 1 12 ${window.animationMethod}`)
        setTimeout(() => {
            endpoint(`stop ${window.chNumber}-${layerNumber}`)
        }, 1000);
    }
    const updateData = (layerNumber, pageName, data) => {
        const index = canvasList.findIndex(val => val.pageName === pageName);
        if (index !== -1) {
            // dispatch({ type: 'CHANGE_CURRENT_PAGE', payload: index })
            const data1 = data;
            window.automationeditor[0].canvas.loadFromJSON(canvasList[index].pageValue, () => {
                data1.forEach(data2 => {
                    window.automationeditor[0].canvas.getObjects().forEach((element) => {
                        element.set({ selectable: false, strokeUniform: false });
                        try {
                            if (element.id === data2.key) {
                                if (data2.type === 'text') {
                                    element.set({ text: data2.value.toString() })
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
                });
                setTimeout(() => {
                    updateGraphics(layerNumber)
                }, 300);

            });
        }
    }
    // const addtextNode = () => {
    //     const aa = [...textNodes]
    //     const bb = textNodes.length;
    //     aa.push({ key: 'f' + bb, value: 'vimlesh' + bb, type: 'text' })
    //     settextNodes([...aa])
    // }
    const getAllKeyValue = () => {
        const aa = []
        layers.forEach((element, i) => {
            var type = (element.type === 'i-text' || element.type === 'textbox' || element.type === 'text') ? 'text' : element.type;
            if (type === 'text') {
                aa.push({ key: element.id, value: element.text, type: 'text' })
            }
        });
        settextNodes([...aa])
    }

    return (
        <div>
            <div>
                <div>
                    PageName
                    <select onChange={e => {
                        setPageName(canvasList[e.target.selectedIndex].pageName);
                        dispatch({ type: 'CHANGE_CURRENT_PAGE', payload: e.target.selectedIndex });
                        window.editor.canvas.loadFromJSON(canvasList[e.target.selectedIndex].pageValue, () => {
                            const aa = window.editor.canvas.getObjects();
                            aa.forEach(element => {
                                try {
                                    element.set({ objectCaching: false })
                                } catch (error) {
                                    alert(error);
                                    return;
                                }
                            });
                            window.editor.canvas.requestRenderAll();
                        });

                    }} value={pageName}>
                        {canvasList.map((val, i) => { return <option key={uuidv4()} value={val.pageName}>{val.pageName}</option> })}
                    </select>
                    <button onClick={() => { recallPage(96, pageName, textNodes) }}>Show</button>
                    <button onClick={() => updateData(96, pageName, textNodes)}>updateData</button>
                    <button onClick={() => stopGraphics(96)}>Stop</button>
                    {/* <button onClick={addtextNode}>Add Text Node</button> */}
                    <button onClick={getAllKeyValue}>getAllKeyValue</button>
                    <table border='0'><tbody>
                        {textNodes.map((val, i) => {
                            return (<tr key={i}>
                                <td>Key:<input disabled type='text' style={{ width: 260 }} value={val.key}
                                    onChange={e => {
                                        const updatedKeyframe = textNodes.map((val, index) => {
                                            return (i === index) ? { ...val, key: e.target.value } : val;
                                        });
                                        settextNodes(updatedKeyframe)
                                    }}
                                /></td><td>value:<input style={{ width: 400 }} type='text' value={val.value} onChange={e => {
                                    const updatedKeyframe = textNodes.map((val, index) => {
                                        return (i === index) ? { ...val, value: e.target.value } : val;
                                    });
                                    settextNodes(updatedKeyframe)
                                }} /></td>
                            </tr>)
                        })}
                    </tbody></table>

                </div>
                <div>
                    <button onClick={saveList}>Save List</button>
                    <table border='1'>
                        <tbody>
                            <tr><th>page Name</th><th>page Value</th></tr>
                            {list1.map((val, i) => {
                                return (
                                    <tr onClick={() => {
                                        recallList1(i);
                                        setCurrentRow(i);

                                        dispatch({ type: 'CHANGE_CURRENT_PAGE', payload: i });
                                        const index = canvasList.findIndex(val1 => val1.pageName === val.pageName);
                                        window.editor.canvas.loadFromJSON(canvasList[index].pageValue, () => {
                                            const aa = window.editor.canvas.getObjects();
                                            aa.forEach(element => {
                                                try {
                                                    element.set({ objectCaching: false });
                                                    var type = (element.type === 'i-text' || element.type === 'textbox' || element.type === 'textbox') ? 'text' : element.type;
                                                    if (type === 'text') {
                                                        val.pageValue.forEach(element1 => {
                                                            if (element.id === element1.key) {
                                                                element.set({text:element1.value});
                                                            }
                                                        });
                                                    }
                                                } catch (error) {
                                                    alert(error);
                                                    return;
                                                }
                                            });
                                            window.editor.canvas.requestRenderAll();
                                        });
                                    }} key={i} style={{ backgroundColor: currentRow === i ? 'green' : '' }}>
                                        <td >{val.pageName}</td><td> {JSON.stringify(val.pageValue)}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default CustomClient