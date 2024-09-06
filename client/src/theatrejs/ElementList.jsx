import React, { useState } from 'react'
import { VscTrash, VscMove, VscLock, VscUnlock, VscEye, VscEyeClosed } from "react-icons/vsc";
import { useDispatch, useSelector } from 'react-redux'
import { visibleInVisible, moveElement, deleteItemfromtimeline, lockUnlock1 } from '../common'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Rnd } from 'react-rnd';

const ElementList = ({ sheet, arrObject, studio, importHtml }) => {
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const layers = useSelector(state => state.canvasReducer.canvas?.getObjects());
    const kf = useSelector(state => state.kfReducer.kf);
    const xpositions = useSelector(state => state.xpositionsReducer.xpositions);
    const dispatch = useDispatch();
    const onDoubleClickLabel = (newValue, i) => {
        var newid = window.prompt('Please enter New Id:', newValue);
        const oldId = studio.selection[0].address.objectKey
        if (newid !== null && newid !== "") {
            newid = newid.replace(/\s*\/\s*/g, ' / ')
            const modifiedcanvasContent = (JSON.stringify(canvas.toJSON(['id', 'class', 'selectable']))).replaceAll(oldId, newid)
            const modifiedAnimationContent = (JSON.stringify(studio.createContentOfSaveFile(sheet.address.projectId))).replaceAll(oldId, newid)
            importHtml(modifiedcanvasContent, modifiedAnimationContent)
            selectObject(i);
        } else {
            console.log('User cancelled the input.');
        }
    }

    const selectObject = (i) => {
        try {
            var aa = canvas.item(i);
            canvas.setActiveObject(aa);
            studio.setSelection([arrObject[i]])
            canvas.requestRenderAll();
        } catch (error) {
            //dummy
        }
    }

    const onDragEnd = (result) => {
        if (result.destination != null) {
            const sourceIndex = result.source?.index;
            const destinationIndex = result.destination?.index;
            canvas.moveObjectTo(canvas.getObjects()[sourceIndex], destinationIndex);
            moveElement(sourceIndex, destinationIndex,
                kf,
                xpositions,
                dispatch);
            const modifiedcanvasContent = (JSON.stringify(canvas.toJSON(['id', 'class', 'selectable'])))
            const modifiedAnimationContent = (JSON.stringify(studio.createContentOfSaveFile(sheet.address.projectId)))
            importHtml(modifiedcanvasContent, modifiedAnimationContent)
            studio.setSelection([arrObject[destinationIndex]])
        }
    }
    const [searchQuery, setSearchQuery] = useState('')

    return (<>
        <Rnd enableResizing={{}}
            default={{
                x: 500,
                y: 70,
            }}
            dragHandleClassName='ggg'
        >
            <div style={{ display: 'flex' }}>
                <div className='ggg' style={{ border: '2px solid grey', backgroundColor: 'white', }}><span>Objects List_________</span></div>
                <input style={{ width: 150 }} placeholder='Search Id' type='text' value={searchQuery} onChange={e => setSearchQuery(e.target.value)} /><button style={{ textAlign: 'right' }} onClick={() => dispatch({ type: 'SHOW_EXTENSIONPANNEL', payload: false })}>X</button>
            </div>
            <div style={{ border: '2px solid white', maxHeight: 870, overflowY: 'auto' }}>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable-1" type="PERSON">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={{ backgroundColor: snapshot.isDraggingOver ? 'yellow' : 'yellowgreen' }}
                                {...provided.droppableProps}
                            >
                                {layers?.map((element, i) => {
                                    return (
                                        <Draggable draggableId={"draggable" + i} key={element + i} index={i}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    style={{
                                                        ...provided.draggableProps.style,
                                                        left: 0,
                                                        top: i * 24 + 24,
                                                        backgroundColor: snapshot.isDragging ? 'red' : (canvas?.getActiveObjects().includes(element)) ? 'darkgray' : 'white',
                                                        boxShadow: snapshot.isDragging ? "0 0 .4rem #666" : "none",
                                                        verticalAlign: 'top',
                                                        marginTop: 1
                                                    }}
                                                >
                                                    <div style={{ display: 'flex', backgroundColor: (canvas?.getActiveObjects().includes(element)) ? 'grey' : 'darkgray', }}>
                                                        {element.id.includes(searchQuery) ? <div style={{ display: 'flex', }}>
                                                            <div onClick={() => selectObject(i)} style={{ minWidth: 60, textAlign: 'left', marginLeft: 2 }}> <span> {element.type}</span></div>
                                                            <div {...provided.dragHandleProps}><VscMove onClick={() => selectObject(i)} /> </div>
                                                            <div>  <button title='visible selected' onClick={() => visibleInVisible(canvas, i, dispatch)}> {element.visible ? < VscEye /> : < VscEyeClosed style={{ opacity: 0.1 }} />}</button></div>
                                                            <div> <button title='Lock selected' onClick={() => {
                                                                canvas.discardActiveObject();
                                                                lockUnlock1(canvas, i, dispatch);
                                                            }}
                                                            >{element.selectable ? < VscUnlock /> : < VscLock style={{ opacity: 0.5 }} />}</button></div>
                                                            <div> <button onClick={() => {
                                                                selectObject(i);
                                                                deleteItemfromtimeline(kf, xpositions, dispatch);
                                                                sheet.detachObject(element.id);
                                                            }}><VscTrash style={{ pointerEvents: 'none' }} /></button></div>
                                                            <div title='Double Click to Change' onClick={() => selectObject(i)} onDoubleClick={() => onDoubleClickLabel(element.id, i)} style={{ width: 150, textAlign: 'left', marginLeft: 2 }}>{element.id}</div>
                                                        </div> : <div {...provided.dragHandleProps}><VscMove onClick={() => selectObject(i)} /> </div>}
                                                    </div>
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
        </Rnd>
    </>)
}

export default ElementList