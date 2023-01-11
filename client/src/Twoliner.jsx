import React, { useState } from 'react'
import { stopGraphics, recallPage, templateLayers } from './common'
import { FaPlay, FaStop } from "react-icons/fa";
import { iniTwoLiner } from './hockeyData'
import { useSelector } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { VscMove } from "react-icons/vsc";


const Twoliner = () => {
    const [playerList1, setPlayerList1] = useState(iniTwoLiner)
    var newplayerList1 = [];
    const [pageName, setPageName] = useState('Twoliner');

    const canvasList = useSelector(state => state.canvasListReducer.canvasList);
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const currentscreenSize = localStorage.getItem('RCC_currentscreenSize');
    const onDragEnd1 = (result) => {
        const aa = [...playerList1]
        if (result.destination != null) {
            aa.splice(result.destination?.index, 0, aa.splice(result.source?.index, 1)[0])
            setPlayerList1(aa);
        }
    }

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
                                                        <div><button onClick={() => recallPage(templateLayers.twoliner, pageName, [{ key: 'f0', value: val.name, type: 'text' }, { key: 'f1', value: val.designation, type: 'text' }], canvasList, canvas, currentscreenSize)}> <FaPlay /></button></div>
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
                    <button style={{ backgroundColor: 'red', width: 100, height: 50 }} onClick={() => { stopGraphics(templateLayers.twoliner); }} ><FaStop /></button>
                </div>
            </div>
        </div>
    )
}

export default Twoliner