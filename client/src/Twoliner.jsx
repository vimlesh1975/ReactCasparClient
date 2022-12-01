import React, { useState } from 'react'
import { endpoint, stopGraphics, updateGraphics } from './common'
import { FaPlay, FaStop } from "react-icons/fa";
import { iniTwoLiner } from './hockeyData'
import { useSelector, useDispatch } from 'react-redux'
import { fabric } from "fabric";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { VscMove } from "react-icons/vsc";

const generalayer = 500;

const Twoliner = () => {
    const [playerList1, setPlayerList1] = useState(iniTwoLiner)
    var newplayerList1 = [];
    const [pageName, setPageName] = useState('Twoliner');

    const canvasList = useSelector(state => state.canvasListReducer.canvasList);
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const dispatch = useDispatch();
    const currentscreenSize = localStorage.getItem('RCC_currentscreenSize');
    const onDragEnd1 = (result) => {
        const aa = [...playerList1]
        if (result.destination != null) {
            aa.splice(result.destination?.index, 0, aa.splice(result.source?.index, 1)[0])
            setPlayerList1(aa);
        }
    }
    const recallPage = (layerNumber, pageName, data) => {
        const index = canvasList.findIndex(val => val.pageName === pageName);
        if (index !== -1) {
            dispatch({ type: 'CHANGE_CURRENT_PAGE', payload: index })
            const data1 = data;
            canvas.loadFromJSON(canvasList[index].pageValue, () => {
                data1.forEach(data2 => {
                    canvas.getObjects().forEach((element) => {
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
                                        canvas.requestRenderAll();
                                    };
                                    i.src = data2.value;
                                }
                            }
                        } catch (error) {
                        }
                    });
                });
                canvas.requestRenderAll();
                sendToCasparcg(layerNumber)
            });
        }
        else { alert(`${pageName} page not found in canvas list. Make a page with this name, add ${data.length}  text and set id of texts as ${data.map(val => { return val.key })} then update the page`) }
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
        aa.innerHTML='${(canvas.toSVG()).replaceAll('"', '\\"')}';
        document.body.appendChild(aa);
        document.body.style.margin='0';
        document.body.style.padding='0';
        aa.style.zoom=(${currentscreenSize * 100}/1920)+'%';
        document.body.style.overflow='hidden';
        "`)
        }, 300);
        setTimeout(() => {
            endpoint(`mixer ${window.chNumber}-${layerNumber} fill 0 0 1 1 10 ${window.animationMethod}`)
        }, 800);

        setTimeout(() => {
            updateGraphics(canvas, layerNumber);
        }, 1100);
    }

    // const updateGraphics = layerNumber => {
    //     endpoint(`call ${window.chNumber}-${layerNumber} "
    //         aa.innerHTML='${(canvas.toSVG()).replaceAll('"', '\\"')}';
    //         "`)
    // }
    // const stopGraphics = layerNumber => {
    //     endpoint(`mixer ${window.chNumber}-${layerNumber} fill 0 0 0 1 12 ${window.animationMethod}`)
    //     setTimeout(() => {
    //         endpoint(`stop ${window.chNumber}-${layerNumber}`)
    //     }, 1000);
    // }

    return (
        <div>
            <p>PageName: <input type='text' value={pageName} onChange={e => setPageName(e.target.value)} /></p>
            <p>id: f0 and f1</p>

            <div style={{ display: 'flex', width: 830, margin: 20 }}>
                <div>
                    <DragDropContext onDragEnd={onDragEnd1}>
                        <Droppable droppableId="droppable-1" type="PERSON1">
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    style={{ backgroundColor: snapshot.isDraggingOver ? 'yellow' : 'yellowgreen' }}
                                    {...provided.droppableProps}
                                >
                                    {playerList1.map((val, i) => {
                                        return (
                                            <Draggable draggableId={val.id} key={val.id} index={i}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        style={{
                                                            ...provided.draggableProps.style,
                                                            backgroundColor: snapshot.isDragging ? 'red' : 'white',
                                                            boxShadow: snapshot.isDragging ? "0 0 .4rem #666" : "none",
                                                            display: 'flex',

                                                            // margin: '1px'
                                                        }}
                                                    >
                                                        <div style={{ border: '1px solid black', borderBottom: (i === playerList1.length - 1) ? '1px solid black' : 'none', borderRight: 'none' }} {...provided.dragHandleProps}><VscMove /></div>
                                                        <div style={{ border: '1px solid black', borderBottom: (i === playerList1.length - 1) ? '1px solid black' : 'none', minWidth: 300, borderRight: 'none' }}><input style={{ border: 'none', borderWidth: 0, minWidth: 300 }} type='text' value={val.name}

                                                            onChange={e => {
                                                                newplayerList1 = [...playerList1];
                                                                newplayerList1[i].name = e.target.value;
                                                                setPlayerList1([...newplayerList1])
                                                            }}
                                                        />
                                                        </div>
                                                        <div style={{ border: '1px solid black', borderBottom: (i === playerList1.length - 1) ? '1px solid black' : 'none', minWidth: 300 }}><input style={{ border: 'none', borderWidth: 0, minWidth: 300 }} type='text' value={val.designation}
                                                            onChange={e => {
                                                                newplayerList1 = [...playerList1];
                                                                newplayerList1[i].designation = e.target.value;
                                                                setPlayerList1([...newplayerList1])
                                                            }}
                                                        />
                                                        </div>
                                                        <div><button onClick={() => recallPage(generalayer, pageName, [{ key: 'f0', value: val.name, type: 'text' }, { key: 'f1', value: val.designation, type: 'text' }])}> <FaPlay /></button></div>
                                                    </div>
                                                )
                                                }
                                            </Draggable>
                                        )
                                    })}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
                <div>
                    <button style={{ backgroundColor: 'red', width: 100, height: 50 }} onClick={() => { stopGraphics(generalayer); }} ><FaStop /></button>
                </div>
            </div>
        </div>
    )
}

export default Twoliner