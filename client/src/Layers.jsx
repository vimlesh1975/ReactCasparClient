import React, { useState } from 'react'
// import { v4 as uuidv4 } from 'uuid';
import { VscTrash, VscMove } from "react-icons/vsc";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Layers = () => {
    const [layers, setLayers] = useState(window.editor?.canvas.getObjects())
    const onDragEnd = (result) => {
        const aa = [...layers]
        if (result.destination != null) {
            aa.splice(result.destination?.index, 0, aa.splice(result.source?.index, 1)[0])
            setLayers(aa)
        }
        window.editor?.canvas.moveTo(window.editor?.canvas.getObjects()[result.source?.index], result.destination?.index);
        window.editor?.canvas.requestRenderAll();
    }
    const deleteLayer = (e, canvas) => {
        canvas.remove(canvas.getObjects()[e.target.getAttribute('key1')]);
        canvas.requestRenderAll();
        const updatedLayers = layers.filter((_, i) => {
            return (parseInt(e.target.getAttribute('key1')) !== i)
        });
        setLayers([...updatedLayers])
    }
    const selectObject = (e, canvas) => {
        canvas.setActiveObject(canvas.item(e.target.getAttribute('key1')));
        canvas.requestRenderAll();

    }


    return (<div>
        <button onClick={() => setLayers(window.editor?.canvas.getObjects())}>Refresh</button>{layers?.length}

        <div style={{ height: 280, width: 330, overflow: 'scroll', border: '1px solid black' }}>

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable-1" type="PERSON">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={{ backgroundColor: snapshot.isDraggingOver ? 'yellow' : 'yellowgreen' }}
                            {...provided.droppableProps}
                        >

                            <table border='1'>
                                <tbody>
                                    {layers?.map((val, i) => {
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
                                                    ><td>{i + 1}</td><td {...provided.dragHandleProps}><VscMove /></td><td key1={i} onClick={(e) => selectObject(e, window.editor.canvas)} style={{ minWidth: 225 }}>{val.type}</td><td><button key1={i} onClick={(e) => deleteLayer(e, window.editor?.canvas)}><VscTrash style={{ pointerEvents: 'none' }} /></button></td>
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
    </div>)
}

export default Layers
