import React from 'react'
import { VscTrash, VscMove, VscLock, VscUnlock, VscEye, VscEyeClosed } from "react-icons/vsc";
import { useDispatch, useSelector } from 'react-redux'
import { visibleInVisible, lockUnlock, moveElement, deleteItemfromtimeline } from '../common'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const ExtensionPannel = ({ sheet, arrObject, studio }) => {
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const kf = useSelector(state => state.kfReducer.kf);
    const xpositions = useSelector(state => state.xpositionsReducer.xpositions);
    const activeLayers = useSelector(state => state.canvasReducer.canvas?.getActiveObjects());


    const dispatch = useDispatch();

    const selectObject = (e) => {
        try {
            var aa = canvas.item(e.target.getAttribute('key1'));
            canvas.setActiveObject(aa);
            studio.setSelection([arrObject[e.target.getAttribute('key1')]])
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
    }
    return (
        <div style={{ height: 240, maxHeight: 240, width: 200, overflowY: 'scroll1', overflowX: 'hidden1' }}>
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
                                                    <div style={{ minWidth: 40 }}> <span >{element.type}</span></div>
                                                    <div {...provided.dragHandleProps}><VscMove key1={i} onClick={(e) => selectObject(e)} /> </div>
                                                    <div>  <button title='visible selected' onClick={() => visibleInVisible(canvas, i, dispatch)}> {element.visible ? < VscEye /> : < VscEyeClosed style={{ opacity: 0.1 }} />}</button></div>
                                                    <div> <button title='Lock selected' onClick={() => {
                                                        canvas.discardActiveObject();
                                                        lockUnlock(canvas, i, dispatch);
                                                    }}
                                                    >{element.selectable ? < VscUnlock /> : < VscLock style={{ opacity: 0.5 }} />}</button></div>

                                                    <div> <button key1={i} onClick={(e) => {
                                                        selectObject(e);
                                                        deleteItemfromtimeline(kf, xpositions, dispatch);
                                                        sheet.detachObject(element.id);

                                                    }}><VscTrash style={{ pointerEvents: 'none' }} /></button></div>
                                                    <div><label>{element.id}</label></div>
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
        </div>)
}

export default ExtensionPannel