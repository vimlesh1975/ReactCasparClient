import React, { useState } from 'react'
import { VscTrash, VscMove, VscLock, VscUnlock, VscEye, VscEyeClosed } from "react-icons/vsc";
import { useDispatch, useSelector } from 'react-redux'
import { visibleInVisible, lockUnlock, moveElement, deleteItemfromtimeline } from '../common'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const ExtensionPannel = ({ sheet, arrObject, studio, importHtml }) => {

    const canvas = useSelector(state => state.canvasReducer.canvas);
    const kf = useSelector(state => state.kfReducer.kf);
    const xpositions = useSelector(state => state.xpositionsReducer.xpositions);
    const activeLayers = useSelector(state => state.canvasReducer.canvas?.getActiveObjects());
    const dispatch = useDispatch();

    const [timeoutId, setTimeoutId] = useState(null); // Store the timeout ID
    const handleChange = (e) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        const newTimeoutId = setTimeout(() => {
            changeId(e.target.value)
        }, 1000);
        setTimeoutId(newTimeoutId);
    };
    const changeId = async (newid) => {
        try {
            const oldId = studio.selection[0].address.objectKey
            if (newid !== null) {
                // console.log(oldId, newid)
                newid = newid.replace(/\s*\/\s*/g, ' / ')
                console.log(newid)
                const modifiedcanvasContent = (JSON.stringify(canvas.toJSON(['id', 'class', 'selectable']))).replaceAll(oldId, newid)
                const modifiedAnimationContent = (JSON.stringify(studio.createContentOfSaveFile(sheet.address.projectId))).replaceAll(oldId, newid)
                await importHtml(modifiedcanvasContent, modifiedAnimationContent)
            }

        } catch (error) {
            console.log(error)
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

            canvas.moveTo(canvas.getObjects()[sourceIndex], destinationIndex);
            canvas.requestRenderAll();
            dispatch({ type: 'CHANGE_CANVAS', payload: canvas });

            moveElement(sourceIndex, destinationIndex,
                kf,
                xpositions,
                dispatch);
        }
        const modifiedcanvasContent = (JSON.stringify(canvas.toJSON(['id', 'class', 'selectable'])))
        const modifiedAnimationContent = (JSON.stringify(studio.createContentOfSaveFile(sheet.address.projectId)))
        importHtml(modifiedcanvasContent, modifiedAnimationContent)
    }

    return (<>
        <div style={{ zIndex: 201, position: 'absolute', left: 500, top: 30, border: '2px solid white', height: 900, overflowY: 'auto' }}>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable-1" type="PERSON">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={{ backgroundColor: snapshot.isDraggingOver ? 'yellow' : 'yellowgreen' }}
                            {...provided.droppableProps}
                        >
                            {(canvas?.getObjects())?.map((element, i) => {
                                return (
                                    <Draggable draggableId={"draggable" + i} key={element + i} index={i}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                style={{
                                                    ...provided.draggableProps.style,
                                                    backgroundColor: snapshot.isDragging ? 'red' : (activeLayers.includes(element)) ? 'darkgray' : 'white',
                                                    boxShadow: snapshot.isDragging ? "0 0 .4rem #666" : "none",
                                                    verticalAlign: 'top',
                                                    marginTop: 1
                                                }}
                                            >
                                                <div style={{ display: 'flex', backgroundColor: (activeLayers.includes(element)) ? 'grey' : 'darkgray', }}>
                                                    <div onClick={() => selectObject(i)} style={{ minWidth: 60, textAlign: 'left' }}> <span>{element.type}</span></div>
                                                    <div {...provided.dragHandleProps}><VscMove onClick={() => selectObject(i)} /> </div>
                                                    <div>  <button title='visible selected' onClick={() => visibleInVisible(canvas, i, dispatch)}> {element.visible ? < VscEye /> : < VscEyeClosed style={{ opacity: 0.1 }} />}</button></div>
                                                    <div> <button title='Lock selected' onClick={() => {
                                                        canvas.discardActiveObject();
                                                        lockUnlock(canvas, i, dispatch);
                                                    }}
                                                    >{element.selectable ? < VscUnlock /> : < VscLock style={{ opacity: 0.5 }} />}</button></div>

                                                    <div> <button onClick={() => {
                                                        selectObject(i);
                                                        deleteItemfromtimeline(kf, xpositions, dispatch);
                                                        sheet.detachObject(element.id);

                                                    }}><VscTrash style={{ pointerEvents: 'none' }} /></button></div>
                                                    {/* <div onClick={() => selectObject(i)} style={{ minWidth: 100 }}><label >{element.id}</label></div> */}
                                                    <div onClick={() => selectObject(i)}><input type='text' defaultValue={element.id} onChange={e => {
                                                        handleChange(e, element);
                                                    }} /></div>
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
    </>)
}

export default ExtensionPannel