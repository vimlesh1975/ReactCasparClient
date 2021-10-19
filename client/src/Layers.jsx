import { VscTrash, VscMove } from "react-icons/vsc";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from 'react-redux'

const Layers = () => {
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const layers = useSelector(state => state.canvasReducer.canvas?.getObjects());

    const dispatch = useDispatch();
    const onDragEnd = (result) => {
        if (result.destination != null) {
            canvas.moveTo(canvas.getObjects()[result.source?.index], result.destination?.index);
            canvas.requestRenderAll();
            dispatch({ type: 'CHANGE_CANVAS', payload: canvas })
        }
    }
    const deleteLayer = (e, canvas) => {
        canvas.remove(canvas.getObjects()[e.target.getAttribute('key1')]);
        dispatch({ type: 'CHANGE_CANVAS', payload: canvas })
        canvas.requestRenderAll();

    }
    const selectObject = (e, canvas) => {
        canvas.setActiveObject(canvas.item(e.target.getAttribute('key1')));
        canvas.requestRenderAll();
    }
    return (<div>
       <b>Total Layers: </b>{layers?.length}
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
