import React, { useState } from 'react'
import { endpoint } from './common'
import {  FaStop } from "react-icons/fa";
import { iniBreakingNews } from './hockeyData'
import { useSelector, useDispatch } from 'react-redux'
import { fabric } from "fabric";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { VscMove } from "react-icons/vsc";

const generalayer = 550;

const BreakingNews = () => {
    const [playerList1, setPlayerList1] = useState(iniBreakingNews);
    const [aaa, setAaa] = useState(0);

    var newplayerList1 = [];
    const canvasList = useSelector(state => state.canvasListReducer.canvasList);
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const dispatch = useDispatch();
    const currentscreenSize = localStorage.getItem('RCC_currentscreenSize');
    var iii=0;
    const startBreakingNews = () => {
        setAaa( setInterval(() => {
            recallPage(generalayer, 'BreakingNews', [{ key: 'f0', value: playerList1[iii], type: 'text' }]);
            if (iii<playerList1.length-1){
                iii +=1;
            }
            else{
                iii=0; 
            }
        }, 4000));
    }

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
                                    const aa = (element.width) * (element.scaleX);
                                    element.set({ objectCaching: false, text: data2.value.toString() })
                                    if (element.width > aa) { element.scaleToWidth(aa) }
                                    canvas.requestRenderAll();
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
                            canvas.requestRenderAll();
                        } catch (error) {
                        }
                    });
                });
                sendToCasparcg(layerNumber)
            });
        }
        // else { alert(`${pageName} page not found in canvas list. Make a page with this name, add ${data.length}  text and set id of texts as ${data.map(val => { return val.key })} then update the page`) }
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
        aa.style.zoom=(${currentscreenSize * 100}/1024)+'%';
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

    const updateGraphics = layerNumber => {
        endpoint(`call ${window.chNumber}-${layerNumber} "
            aa.innerHTML='${(canvas.toSVG()).replaceAll('"', '\\"')}';
            "`)
    }
    const stopGraphics = layerNumber => {
        endpoint(`mixer ${window.chNumber}-${layerNumber} fill 0 0 0 1 12 ${window.animationMethod}`)
        setTimeout(() => {
            endpoint(`stop ${window.chNumber}-${layerNumber}`)
        }, 1000);
    }

    return (
        <div>
            <p>PageName: BreakingNews</p>
            <p>id: f0</p>

            <div style={{ display: 'flex', minwidth: 650, margin: 20 }}>
                <div>
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
                                                    <Draggable draggableId={"draggable" + i} key={val + i} index={i}>
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
                                                                <td {...provided.dragHandleProps}><VscMove /></td>
                                                                <td style={{ minWidth: 300 }}><input style={{ minWidth: 650 }} type='text' defaultValue={val}

                                                                    onMouseLeave={e => {
                                                                        newplayerList1 = [...playerList1];
                                                                        newplayerList1[i] = e.target.value;
                                                                        setPlayerList1([...newplayerList1])

                                                                    }}
                                                                />
                                                                </td>
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
                <div>
                    <button style={{ backgroundColor: 'red', width: 200, height: 100 }} onClick={() => { stopGraphics(generalayer); }} ><FaStop /></button>
                    <label>Start Breaking News: <input type='checkbox'  onChange={(e) => {
                        if (e.target.checked===true) {
                            startBreakingNews();
                        }
                        else{
                            clearInterval(aaa);
                            setAaa(0);
                        }
                    }
                    } /></label>
                </div>
            </div>

        </div>
    )
}

export default BreakingNews