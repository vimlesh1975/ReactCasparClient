import React from 'react'
import { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { fabric } from "fabric";
import { updateText, templateLayers, theatreLayers } from '../common'
import { v4 as uuidv4 } from 'uuid';

const playLayers = [templateLayers.theatrejs, ...theatreLayers]

const CustomClient = ({ importHtml }) => {

    const [selectedOption, setSelectedOption] = useState(166);
    // const showDataUpdatePanel = useSelector(state => state.showDataUpdatePanelReducer.showDataUpdatePanel);

    const canvas = useSelector(state => state.canvasReducer.canvas);
    const canvasList = useSelector(state => state.canvasListReducer.canvasList);
    // const currentscreenSize = useSelector(state => state.currentscreenSizeReducer.currentscreenSize);
    const layers = useSelector(state => state.canvasReducer.canvas?.getObjects());
    const dispatch = useDispatch();

    const [pageName, setPageName] = useState('TeamList')
    const [textNodes, settextNodes] = useState([])
    // const [list1, setList1] = useState([]);
    // const [currentRow, setCurrentRow] = useState(0);
    const refPageName = useRef();
    // const saveList = () => {
    //     const newlist1 = [...list1];
    //     newlist1.push({ pageName: refPageName.current.value, pageValue: textNodes });
    //     setList1([...newlist1]);
    // }
    // const updateList = (index) => {
    //     const updatedList1 = list1.map((val, i) => {
    //         return (index !== i) ? val : { pageName: pageName, pageValue: textNodes }
    //     });

    //     setList1([...updatedList1]);
    // }

    // const recallList1 = (i) => {
    //     const index = canvasList.findIndex(val => val.pageName === list1[i].pageName);
    //     if (index !== -1) {
    //         setPageName(list1[i].pageName)
    //         settextNodes(list1[i].pageValue)
    //         setCurrentRow(i);
    //         dispatch({ type: 'CHANGE_CURRENT_PAGE', payload: index });
    //     }
    //     else { tempAlert('Pagename not avalaible', 1000, "position:absolute;top:40%;left:60%;background-color:white;font-size:40px") }

    // }
    // const deleteData = (index) => {
    //     const updatedList1 = list1.filter((_, i) => {
    //         return (index !== i)
    //     });

    //     setList1([...updatedList1]);
    // }

    // const recallPage = (layerNumber, pageName, data) => {
    //     const index = canvasList.findIndex(val => val.pageName === pageName);
    //     if (index !== -1) {
    //         const data1 = data;
    //         canvas.loadFromJSON(canvasList[index].pageValue, () => {
    //             data1.forEach(data2 => {
    //                 canvas.getObjects().forEach((element) => {
    //                     try {
    //                         if (element.id === data2.key) {
    //                             if (data2.type === 'text') {
    //                                 const originalWidth = element.width;
    //                                 element.set({ objectCaching: false, text: data2.value.toString() })
    //                                 if (element.textLines.length > 1) {
    //                                     do {
    //                                         element.set({ width: element.width + 5 });
    //                                     }
    //                                     while (element.textLines.length > 1);
    //                                     element.set({ scaleX: originalWidth / element.width });
    //                                 }
    //                             }
    //                             else if (data2.type === 'image') {
    //                                 var i = new Image();
    //                                 i.onload = function () {
    //                                     const originalWidth = (element.width) * (element.scaleX);
    //                                     const originalHeight = (element.height) * (element.scaleY);
    //                                     element.set({ objectCaching: false, scaleX: (originalWidth / i.width), scaleY: (originalHeight / i.height) })
    //                                     if (element.type === 'image') {
    //                                         element.setSrc(data2.value)
    //                                     }
    //                                     else if (element.type === 'rect') {
    //                                         element.set({ width: i.width, height: i.height, fill: new fabric.Pattern({ source: data2.value, repeat: 'no-repeat' }) })
    //                                     }
    //                                 };
    //                                 i.src = data2.value;
    //                             }
    //                             else if (data2.type === 'shadow') {
    //                                 element.set({ shadow: { ...element.shadow, ...data2.value } })
    //                             }
    //                             else {
    //                                 element.set({ [data2.type]: data2.value })
    //                             }
    //                         }
    //                     } catch (error) {
    //                     }
    //                 });
    //             });
    //             canvas.requestRenderAll();
    //             setTimeout(() => {
    //                 sendToCasparcg(layerNumber)
    //             }, 1000);
    //         });
    //     }
    //     else { tempAlert('Pagename not avalaible', 1000) }
    // }
    // const sendToCasparcg = (layerNumber) => {
    //     canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);

    //     executeScript(`document.getElementById('divid_${layerNumber}')?.remove()`);

    //     endpoint(`mixer ${window.chNumber}-${layerNumber} fill 0 0 0 1 6 ${window.animationMethod}`)
    //     setTimeout(() => {
    //         endpoint(`play ${window.chNumber}-${layerNumber} [HTML] xyz.html`);
    //     }, 250);

    //     const script = `
    //     var aa = document.createElement('div');
    //     aa.style.position='absolute';
    //     aa.setAttribute('id','divid_' + '${layerNumber}');
    //     aa.style.zIndex = ${layerNumber};
    //     aa.innerHTML=\`${(canvas.toSVG(['id', 'class', 'selectable'])).replaceAll('"', '\\"')}\`;
    //     document.body.appendChild(aa);
    //     document.body.style.margin='0';
    //     document.body.style.padding='0';
    //     aa.style.zoom=(${currentscreenSize * 100}/1920)+'%';
    //     document.body.style.overflow='hidden';
    //     `
    //     executeScript(script);

    //     setTimeout(() => {
    //         endpoint(`call ${window.chNumber}-${layerNumber} "
    //         ${script}
    // "`)
    //     }, 300);
    //     setTimeout(() => {
    //         endpoint(`mixer ${window.chNumber}-${layerNumber} fill 0 0 1 1 10 ${window.animationMethod}`)
    //     }, 800);

    //     setTimeout(() => {
    //         updateGraphics(canvas, layerNumber)
    //     }, 1100);
    // }


    // const updateData = (layerNumber, pageName, data) => {
    //     const index = canvasList.findIndex(val => val.pageName === pageName);
    //     if (index !== -1) {
    //         // dispatch({ type: 'CHANGE_CURRENT_PAGE', payload: index })
    //         const data1 = data;
    //         canvas.loadFromJSON(canvasList[index].pageValue, () => {
    //             data1.forEach(data2 => {
    //                 canvas.getObjects().forEach((element) => {
    //                     // element.set({ selectable: false, strokeUniform: false });
    //                     try {
    //                         if (element.id === data2.key) {
    //                             if (data2.type === 'text') {
    //                                 const originalWidth = element.width;
    //                                 element.set({ objectCaching: false, text: data2.value.toString() })
    //                                 if (element.textLines.length > 1) {
    //                                     do {
    //                                         element.set({ width: element.width + 5 });
    //                                     }
    //                                     while (element.textLines.length > 1);
    //                                     element.set({ scaleX: originalWidth / element.width });
    //                                 }
    //                             }
    //                             else if (data2.type === 'image') {
    //                                 var i = new Image();
    //                                 i.onload = function () {
    //                                     const originalWidth = (element.width) * (element.scaleX);
    //                                     const originalHeight = (element.height) * (element.scaleY);
    //                                     element.set({ objectCaching: false, scaleX: (originalWidth / i.width), scaleY: (originalHeight / i.height) })
    //                                     if (element.type === 'image') {
    //                                         element.setSrc(data2.value)
    //                                     }
    //                                     else if (element.type === 'rect') {
    //                                         element.set({ width: i.width, height: i.height, fill: new fabric.Pattern({ source: data2.value, repeat: 'no-repeat' }) })
    //                                     }
    //                                 };
    //                                 i.src = data2.value;
    //                             }
    //                             else if (data2.type === 'shadow') {
    //                                 element.set({ shadow: { ...element.shadow, ...data2.value } })
    //                             }
    //                             else {
    //                                 element.set({ [data2.type]: data2.value })
    //                             }
    //                         }
    //                     } catch (error) {
    //                     }
    //                 });
    //             });
    //             canvas.requestRenderAll();
    //             setTimeout(() => {
    //                 updateGraphics(canvas, layerNumber)
    //             }, 300);

    //         });
    //     }
    // }
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
                aa.push({ key: element.id, value: element.text, type: 'text', fontFamily: element.fontFamily })
            }
            // if (type === 'image') {
            //     aa.push({ key: element.id, value: element.src, type: 'image' })
            // }
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
            const aa = layers.find((item) => {
                return item.id === val.key
            })
            aa.set({ text: (val.value).toString() })
        })
        canvas.requestRenderAll()
        updateText(canvas, layerNumber)

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
                        {/* <button onClick={() => { dispatch({ type: 'SHOW_DATA_UPDATE', payload: !showDataUpdatePanel }); }}>X</button> */}

                    </div>
                    {/* <button onClick={saveList}>Save List</button>  */}
                    {/* <button onClick={() => updateList(currentRow)}>Update List</button> */}
                    {/* <button onClick={() => { recallPage(templateLayers.customClient, pageName, textNodes) }}><FaPlay /></button> */}
                    <button title='Update Desinger only' onClick={() => {
                        textNodes.forEach((val) => {
                            const aa = layers.find((item) => {
                                return item.id === val.key
                            })
                            aa.set({ text: (val.value).toString() })
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
                    {/* <button onClick={() => stopGraphics(templateLayers.customClient)}><FaStop /></button> */}

                </div>
                <div style={{ maxHeight: 400, minHeight: 400, overflow: 'scroll' }}>

                    <table border='0'><tbody>
                        {textNodes.map((val, i) => {
                            if (val.type === 'text') {
                                return (<tr key={i}>
                                    <td><input disabled type='text' style={{ width: 170 }} value={val.key}
                                        onChange={e => {
                                            const updatedKeyframe = textNodes.map((val, index) => {
                                                return (i === index) ? { ...val, key: e.target.value } : val;
                                            });
                                            settextNodes(updatedKeyframe)
                                        }}
                                    /></td><td>=
                                        {(isNaN(val.value) || (val.value === '')) ? <input style={{ width: 200, fontFamily: val.fontFamily }} type='text' value={val.value} onChange={e => {
                                            const updatednodes = textNodes.map((val, index) => {
                                                return (i === index) ? { ...val, value: e.target.value } : val;
                                            });
                                            settextNodes(updatednodes)
                                        }} /> : <><input style={{ width: 70, fontFamily: val.fontFamily }} type='number' value={val.value} onChange={e => {
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
                                    <td><input disabled type='text' style={{ width: 260 }} value={val.key}
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



                {/* <div style={{ maxHeight: 400, minHeight: 400, overflow: 'scroll' }}>

                    <table border='1'>
                        <tbody>
                            <tr><th></th><th>page Name</th><th>page Value</th></tr>
                            {list1.map((val, i) => {
                                return (
                                    <tr onClick={() => {
                                        recallList1(i);

                                        const index = canvasList.findIndex(val1 => val1.pageName === val.pageName);
                                        if (index !== -1) {
                                            window.editor.canvas.loadFromJSON(canvasList[index].pageValue, () => {
                                                const aa = window.editor.canvas.getObjects();
                                                aa.forEach(element => {
                                                    try {
                                                        element.set({ objectCaching: false });
                                                        var type = (element.type === 'i-text' || element.type === 'textbox' || element.type === 'textbox') ? 'text' : element.type;
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

                                                                    var i = new Image();
                                                                    i.onload = function () {
                                                                        const originalWidth = (element.width) * (element.scaleX);
                                                                        const originalHeight = (element.height) * (element.scaleY);
                                                                        element.set({ objectCaching: false, scaleX: (originalWidth / i.width), scaleY: (originalHeight / i.height) })
                                                                        element.setSrc(element1.value)
                                                                        window.editor.canvas.requestRenderAll();
                                                                    };
                                                                    i.src = element1.value;
                                                                }
                                                            });
                                                        }
                                                    } catch (error) {
                                                        // alert(error);
                                                        return;
                                                    }
                                                });
                                                window.editor.canvas.requestRenderAll();
                                            });
                                        }
                                    }} key={i} style={{ backgroundColor: currentRow === i ? 'green' : '' }}>
                                        <td ><button onClick={() => deleteData(i)}><VscTrash style={{ pointerEvents: 'none' }} /></button></td>  <td >{val.pageName}</td><td title={JSON.stringify(val.pageValue)} style={{ display: 'none1' }}> {(JSON.stringify(val.pageValue)).substring(0, 100)}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div> */}
            </div>
        </div>
    )
}

export default CustomClient