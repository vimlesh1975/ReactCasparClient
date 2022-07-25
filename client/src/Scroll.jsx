import React, { useState } from 'react'
import { iniBreakingNews } from './hockeyData'
import { useSelector } from 'react-redux'
import { fabric } from "fabric";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { VscMove } from "react-icons/vsc";
import { v4 as uuidv4 } from 'uuid';
import { isEqual } from "lodash";
import { shadowOptions, options } from './common'

const Scroll = () => {

    const [playerList1, setPlayerList1] = useState(iniBreakingNews);
    const [delemeter, setDelemeter] = useState('⏺️')

    const [newplayerList1, setNewplayerList1] = useState([...playerList1]);
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const [scrollTextProperties,setScrollTextProperties]=useState({
        shadow: shadowOptions,
        top: 521,
        fill: options.currentColor,
        fontFamily: options.currentFont,
        fontWeight: 'bold',
        fontSize: options.currentFontSize,
        editable: true,
        objectCaching: false,
        textAlign: 'left',
        stroke: options.stroke,
        strokeWidth: options.strokeWidth,
    })

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

    const deletePage = e => {
        if (playerList1.length===1){
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
            aa += JSON.stringify({ id: val.id, data1: val.data1, use1: val.use1, delemeterLogo: val.delemeterLogo }) + '\r\n'
        });
        const file = new Blob([aa], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        var ss = new Date().toLocaleTimeString('en-US', { year: "numeric", month: "numeric", day: "numeric", hour12: false, hour: "numeric", minute: "numeric", second: "numeric" });

        var retVal = prompt("Enter  file name to save : ", 'Scroll_' + ss);
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
            updatedcanvasList.push({ id: cc.id, data1: cc.data1, use1: cc.use1, delemeterLogo: cc.delemeterLogo })
        });
        setPlayerList1(updatedcanvasList)
        setNewplayerList1(updatedcanvasList)
    };

    const setAsScrollText = () => {
        var aa = '';
        playerList1.forEach(element => {
            if (element.use1 === true) { aa += ` ${delemeter} ` + element.data1 };
        });
        const text = new fabric.IText(aa, {
            id: 'id_' + uuidv4(),
            left: 0,
            ...scrollTextProperties
        });
        canvas.add(text);
        canvas.requestRenderAll();
    }

    const setAsScrollText2 = () => {
        var left1 = 0;
        playerList1.forEach((element, i) => {
            if (element.use1 === true) {
                fabric.Image.fromURL(playerList1[i].delemeterLogo, myImg => {
                    if (myImg == null) {
                        alert("Error!");
                    } else {
                        // myImg.scaleToWidth(25);
                        myImg.scaleToHeight(25);
                        canvas.add(myImg).setActiveObject(myImg);
                        myImg.set({
                            left: left1,
                            top: scrollTextProperties.top,
                        })
                        canvas.renderAll();
                        left1 += 15 + canvas.getActiveObjects()[0].width * canvas.getActiveObjects()[0].scaleX;

                        const text = new fabric.IText(element.data1, {
                            id: 'id_' + uuidv4(),
                            left: left1,
                            ...scrollTextProperties
                        });
                        canvas.add(text).setActiveObject(text);
                        canvas.renderAll();
                        left1 += 15 + canvas.getActiveObjects()[0].width;
                    }
                });
            };
        });
        canvas.requestRenderAll();
    }

    return (
        <div>
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
                <div style={{ border: '1px solid red' }}>

                    <table border='0'>
                        <tbody >
                            <tr>
                                <td><button onClick={()=>{
                                    const selectedObject=canvas.getActiveObjects()[0];
                                    if (selectedObject){
                                    setScrollTextProperties({
                                        shadow:selectedObject.shadow,
                                        top: selectedObject.top,
                                        fill: selectedObject.fill,
                                        fontFamily: selectedObject.fontFamily,
                                        fontWeight: selectedObject.fontWeight,
                                        fontSize: selectedObject.fontSize,
                                        editable: true,
                                        objectCaching: false,
                                        textAlign: 'left',
                                        stroke: selectedObject.stroke,
                                        strokeWidth: selectedObject.strokeWidth,
                                    })}
                                }}>Set text Properties as selected object</button></td>
                                <td><button onClick={setAsScrollText}>Set as Scroll Text with delemeter</button></td>
                                <td>Delemeter for scroll text</td>
                                <td><input style={{ width: 40, textAlign: 'center' }} onChange={(e) => setDelemeter(e.target.value)} value={delemeter} /></td>
                            </tr>
                        </tbody>
                    </table>
                    <table border='0'>
                        <tbody >
                            <tr>
                                <td>
                                    <label>
                                        <img src={playerList1[0]?.delemeterLogo} alt='' width='20' height='20' style={{ border: '1px solid red' }} />
                                        <input type="file" onChange={e => {
                                            var reader = new FileReader();
                                            reader.onloadend = () => {
                                                const aa = [...playerList1];
                                                aa[0] = { ...aa[0], delemeterLogo: reader.result };
                                                setPlayerList1(aa);
                                                setNewplayerList1(aa)
                                            }
                                            reader.readAsDataURL(e.target.files[0]);
                                        }} style={{ display: 'none' }} />
                                    </label>
                                </td>
                                <td> <button onClick={() => {
                                    const updateddelemeterlogo = playerList1.map((val, i) => ({ ...val, delemeterLogo: playerList1[0].delemeterLogo }));
                                    setPlayerList1(updateddelemeterlogo);
                                    setNewplayerList1(updateddelemeterlogo)


                                }}>Set all logo as first logo</button> <button onClick={setAsScrollText2}>Set As ScrollText with logo</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <button style={{ display: (isEqual(newplayerList1, playerList1)) ? 'none' : 'inline', backgroundColor: 'red' }} onClick={updateplayerList1}>Update Data</button>
            <div style={{ display: 'flex', minwidth: 650, margin: 20 }}>
                <div style={{ backgroundColor: 'grey', height: 700, width: 800, overflow: 'auto' }}>
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

                                                                <td>
                                                                    <label>
                                                                        <img src={val.delemeterLogo} alt='' width='20' height='20' style={{ border: '1px solid red' }} />
                                                                        <input type="file" onChange={e => {
                                                                            var reader = new FileReader();
                                                                            reader.onloadend = () => {
                                                                                const aa = [...playerList1];
                                                                                aa[i] = { ...aa[i], delemeterLogo: reader.result };
                                                                                setPlayerList1(aa);
                                                                                setNewplayerList1(aa)
                                                                            }
                                                                            reader.readAsDataURL(e.target.files[0]);
                                                                        }} style={{ display: 'none' }} />
                                                                    </label>
                                                                </td>
                                                                <td style={{ minWidth: 300 }}><input style={{ border: 'none', borderWidth: 0, minWidth: 620 }} type='text' defaultValue={val.data1}
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

export default Scroll