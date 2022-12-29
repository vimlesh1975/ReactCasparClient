import React, { useState, useEffect } from 'react'
import { endpoint, stopGraphics, updateGraphics, executeScript } from './common'
import { iniBreakingNews } from './hockeyData'
import { useSelector } from 'react-redux'
import { fabric } from "fabric";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { VscMove } from "react-icons/vsc";
import { FaPlay, FaStop } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';
import { isEqual } from "lodash";

var iii = 0;
const OnelinerAndBreakingNews = () => {

    const [playerList1, setPlayerList1] = useState(iniBreakingNews);
    const [aaa, setAaa] = useState(0);
    const [currentRow, setCurrentRow] = useState(0);
    const [generalayer, setGeneralayer] = useState(550);
    const [variableName, setVariableName] = useState('f0');
    const [pageName, setPageName] = useState('BreakingNews');
    const [timeInterval, setTimeInterval] = useState(4000);

    const [newplayerList1, setNewplayerList1] = useState([...playerList1]);
    const canvasList = useSelector(state => state.canvasListReducer.canvasList);
    const currentscreenSize = useSelector(state => state.currentscreenSizeReducer.currentscreenSize);

    const startBreakingNews = () => {
        setAaa(setInterval(() => {
            while (playerList1[iii].use1 === false) {
                if (iii < playerList1.length - 1) {

                    iii += 1;
                }
                else {
                    iii = 0;
                }
                continue;
            }
            setCurrentRow(iii);
            recallPage(generalayer, pageName, [{ key: variableName, value: playerList1[iii].data1, type: 'text' }]);
            if (iii < playerList1.length - 1) {

                iii += 1;
            }
            else {
                iii = 0;
            }
        }, timeInterval));
    }

    useEffect(() => {
        if (aaa !== 0) {
            clearInterval(aaa);
            setAaa(0);
            startBreakingNews();
        }
        return () => {
            clearInterval(aaa); //cleanup
            setAaa(0);
        }
        // eslint-disable-next-line
    }, [generalayer, pageName, variableName, playerList1, timeInterval])

    const updateplayerList1 = () => {
        setPlayerList1([...newplayerList1])
    }

    const onDragEnd1 = (result) => {
        const aa = [...playerList1]
        if (result.destination != null) {
            aa.splice(result.destination?.index, 0, aa.splice(result.source?.index, 1)[0])
            setPlayerList1(aa);
            setNewplayerList1(aa)
        }
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
        executeScript(`document.getElementById('divid_${layerNumber}')?.remove()`);

        endpoint(`mixer ${window.chNumber}-${layerNumber} fill 0 0 0 1 6 ${window.animationMethod}`)
        setTimeout(() => {
            endpoint(`play ${window.chNumber}-${layerNumber} [HTML] xyz.html`);
        }, 250);

        const script = `
        var aa = document.createElement('div');
        aa.style.position='absolute';
        aa.setAttribute('id','divid_' + '${layerNumber}');
        aa.style.zIndex = ${layerNumber};
        aa.innerHTML=\`${(window.automationeditor[0].canvas.toSVG()).replaceAll('"', '\\"')}\`;
        document.body.appendChild(aa);
        document.body.style.margin='0';
        document.body.style.padding='0';
        aa.style.zoom=(${currentscreenSize * 100}/309)+'%';
        document.body.style.overflow='hidden';
        `
        executeScript(script);

        setTimeout(() => {
            endpoint(`call ${window.chNumber}-${layerNumber} "
        ${script}
        "`)
        }, 300);
        setTimeout(() => {
            endpoint(`mixer ${window.chNumber}-${layerNumber} fill 0 0 1 1 10 ${window.animationMethod}`)
        }, 800);

        setTimeout(() => {
            updateGraphics(window.automationeditor[0].canvas, layerNumber);
        }, 1100);
    }
    // const updateGraphics = layerNumber => {
    //     const script = `
    //     aa.innerHTML=\`${(window.automationeditor[0].canvas.toSVG()).replaceAll('"', '\\"')}\`;
    //     `
    //     executeScript(script);
    //     endpoint(`call ${window.chNumber}-${layerNumber} "
    //     ${script}
    //         "`)

    // }
    // const stopGraphics = layerNumber => {
    //     endpoint(`mixer ${window.chNumber}-${layerNumber} fill 0 0 0 1 12 ${window.animationMethod}`)
    //     setTimeout(() => {
    //         endpoint(`stop ${window.chNumber}-${layerNumber}`)
    //     }, 1000);
    // }
    const deletePage = e => {
        if (playerList1.length === 1) {
            return
        }
        const aa = [...playerList1]
        aa.splice(parseInt(e.target.getAttribute('key1')), 1);
        setPlayerList1(aa);
        setNewplayerList1(aa)
    }
    const addPage = e => {
        const aa = [...playerList1]
        aa.splice(parseInt(e.target.getAttribute('key1')) + 1, 0, { id: uuidv4(), data1: '', use1: false });
        setPlayerList1(aa);
        setNewplayerList1(aa)

    }

    const drawingFileSaveAs = () => {
        const element = document.createElement("a");
        var aa = ''
        playerList1.forEach(val => {
            aa += JSON.stringify({ id: val.id, data1: val.data1, use1: val.use1 }) + '\r\n'
        });
        const file = new Blob([aa], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        var ss = new Date().toLocaleTimeString('en-US', { year: "numeric", month: "numeric", day: "numeric", hour12: false, hour: "numeric", minute: "numeric", second: "numeric" });

        var retVal = prompt("Enter  file name to save : ", 'Oneliner_' + ss);

        if (retVal !== null) {
            element.download = retVal;
            document.body.appendChild(element); // Required for this to work in FireFox
            element.click();
        }
    }
    let fileReader;

    const handleFileChosen = (file) => {
        if (file) {
            fileReader = new FileReader();
            fileReader.onloadend = handleFileRead;
            fileReader.readAsText(file);
        }
    }
    const handleFileRead = (e) => {
        const content = fileReader.result;
        var aa = content.split('\r\n')
        aa.splice(-1)
        var updatedcanvasList = []
        aa.forEach(element => {
            var cc = JSON.parse(element)
            updatedcanvasList.push({ id: cc.id, data1: cc.data1, use1: cc.use1 })
        });
        setPlayerList1(updatedcanvasList)
        setNewplayerList1(updatedcanvasList)
    };

    const updateData = (layerNumber, data) => {
        const data1 = data;
        data1.forEach(data2 => {
            window.automationeditor[0].canvas.getObjects().forEach((element) => {
                try {
                    if (element.id === data2.key) {
                        if (data2.type === 'text') {
                            const aa = (element.width) * (element.scaleX);
                            element.set({ objectCaching: false, text: data2.value.toString() })
                            if (element.width > aa) { element.scaleToWidth(aa) }
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
                    }
                } catch (error) {
                }
            });
        });
        setTimeout(() => {
            updateGraphics(window.automationeditor[0].canvas, layerNumber)
        }, 300);

    }
    return (
        <div>
            <div style={{ border: '1px solid red' }}>
                <table border='1'>
                    <tbody >
                        <tr><td>Page Name</td><td><input size="10" type='text' defaultValue={pageName} onChange={e => setPageName(e.target.value)} /></td><td>Variable Name</td><td><input size="2" type='text' defaultValue={variableName} onChange={e => setVariableName(e.target.value)} /></td>
                            <td>Layer No.</td><td><input size="2" type='text' defaultValue={generalayer} onChange={e => setGeneralayer(e.target.value)} /></td><td>Time Interval</td><td><input size="2" type='text' defaultValue={timeInterval} onChange={e => setTimeInterval(e.target.value)} /></td>
                            <td><label>Start Breaking News: <input type='checkbox' onChange={(e) => {
                                if (e.target.checked === true) {
                                    startBreakingNews();
                                }
                                else {
                                    clearInterval(aaa);
                                    setAaa(0);
                                }
                            }
                            } /></label></td>
                            <td><button style={{ backgroundColor: 'red' }} onClick={() => { stopGraphics(generalayer); }} ><FaStop /></button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div style={{ display: 'flex1' }}>
                <table border='0'>
                    <tbody >
                        <tr>
                            <td><button onClick={drawingFileSaveAs}>Save</button></td>
                            <td><span>Open File:</span><input
                                type='file'
                                id='file'
                                className='input-file'
                                accept='.txt'
                                onChange={e => {
                                    handleFileChosen(e.target.files[0]);
                                }}
                            /></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <button style={{ display: (isEqual(newplayerList1, playerList1)) ? 'none' : 'inline', backgroundColor: 'red' }} onClick={updateplayerList1}>Update Data</button>
            <div style={{ display: 'flex', minwidth: 650, margin: 20 }}>
                <div style={{ backgroundColor: 'grey', height: 650, width: 850, overflow: 'auto' }}>
                    <DragDropContext onDragEnd={onDragEnd1}>
                        <Droppable droppableId="droppable-1" type="PERSON1">
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    style={{ backgroundColor: snapshot.isDraggingOver ? 'yellow' : 'yellowgreen' }}
                                    {...provided.droppableProps}
                                >
                                    <table >
                                        <tbody>
                                            {playerList1.map((val, i) => {
                                                return (
                                                    <Draggable draggableId={val.id} key={val.id} index={i}>
                                                        {(provided, snapshot) => (
                                                            <tr
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                style={{
                                                                    ...provided.draggableProps.style,
                                                                    backgroundColor: snapshot.isDragging ? 'red' : 'white',
                                                                    boxShadow: snapshot.isDragging ? "0 0 .4rem #666" : "none",
                                                                    // margin: '10px'
                                                                }}
                                                            >
                                                                <td style={{ textAlign: 'center' }}>{i}</td>
                                                                <td {...provided.dragHandleProps}><VscMove /></td>
                                                                <td style={{ minWidth: 300 }}><input style={{ backgroundColor: (currentRow === i) ? 'green' : '', border: 'none', borderWidth: 0, minWidth: 620 }} type='text' defaultValue={val.data1}
                                                                    onChange={e => {
                                                                        newplayerList1[i] = { ...newplayerList1[i], data1: e.target.value };
                                                                        setNewplayerList1([...newplayerList1])
                                                                    }}
                                                                />
                                                                </td>
                                                                <td><input defaultChecked={val.use1} type='checkbox' onChange={(e) => {
                                                                    newplayerList1[i] = { ...newplayerList1[i], use1: e.target.checked };
                                                                    setNewplayerList1([...newplayerList1]);
                                                                    setPlayerList1([...newplayerList1]);
                                                                }
                                                                } /></td>
                                                                <td><button onClick={() => recallPage(generalayer, pageName, [{ key: variableName, value: val.data1, type: 'text' }])}> <FaPlay /></button></td>
                                                                <td><button onClick={() => updateData(generalayer, [{ key: variableName, value: val.data1, type: 'text' }])}> Update</button></td>
                                                                <td><button key1={i} onClick={(e) => deletePage(e)}>-</button></td>
                                                                <td><button key1={i} onClick={(e) => addPage(e)}>+</button></td>
                                                            </tr>
                                                        )
                                                        }
                                                    </Draggable>
                                                )
                                            })}
                                            {provided.placeholder}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            </div>

        </div>
    )
}

export default OnelinerAndBreakingNews