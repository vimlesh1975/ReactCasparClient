import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { fabric } from "fabric";
import { endpoint } from '../common'
import { v4 as uuidv4 } from 'uuid';


const CustomClient = () => {
    const canvasList = useSelector(state => state.canvasListReducer.canvasList);
    const currentscreenSize = useSelector(state => state.currentscreenSizeReducer.currentscreenSize);

    const [pageName, setPageName] = useState('TeamList')
    const [textNodes, settextNodes] = useState([{ key: 'f0', value: 'vimlesh', type: 'text' }])

    const recallPage = (layerNumber, pageName, data) => {
        const index = canvasList.findIndex(val => val.pageName === pageName);
        if (index !== -1) {
            const data1 = data;
            window.automationeditor[0].canvas.loadFromJSON(canvasList[index].pageValue, () => {
                data1.forEach(data2 => {
                    window.automationeditor[0].canvas.getObjects().forEach((element) => {
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
    const addtextNode = () => {
        const aa = [...textNodes]
        const bb = textNodes.length;
        aa.push({ key: 'f' + bb, value: 'vimlesh' + bb, type: 'text' })
        settextNodes([...aa])
    }
    return (
        <div>
            <div style={{ display: 'flex' }}>
                <div>
                    PageName
                    <select onChange={e => setPageName(e.target.value)} value={pageName}>
                        {canvasList.map((val) => { return <option key={uuidv4()} value={val.pageName}>{val.pageName}</option> })}
                    </select>
                    <button onClick={() => { recallPage(96, pageName, textNodes) }}>Show</button>
                    <button onClick={() => updateData(96, pageName, textNodes)}>updateData</button>
                    <button onClick={() => stopGraphics(96)}>Stop</button>
                    <button onClick={addtextNode}>Add Text Node</button>
                    <table border='0'><tbody>
                        {textNodes.map((val, i) => {
                            return (<tr key={i}>
                                <td>Key:<input type='text' style={{ width: 200 }} value={val.key}
                                    onChange={e => {
                                        const updatedKeyframe = textNodes.map((val, index) => {
                                            return (i === index) ? { ...val, key: e.target.value } : val;
                                        });
                                        settextNodes(updatedKeyframe)
                                    }}
                                /></td><td>value:<input style={{ width: 200 }} type='text' value={val.value} onChange={e => {
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
                </div>
            </div>
        </div>
    )
}

export default CustomClient