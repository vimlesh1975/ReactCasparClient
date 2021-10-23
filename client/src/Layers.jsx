import { VscTrash, VscMove } from "react-icons/vsc";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from 'react-redux'
import { useState } from "react";
import { changeCurrentColor, changeBackGroundColor, changeStrokeCurrentColor, changeShadowCurrentColor } from './common'

const Layers = () => {
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const layers = useSelector(state => state.canvasReducer.canvas?.getObjects());
    const activeLayers = useSelector(state => state.canvasReducer.canvas?.getActiveObjects());


    const [textofActiveObject, setTextofActiveObject] = useState('');

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
        try {
            canvas.setActiveObject(canvas.item(e.target.getAttribute('key1')));
            if (canvas.item(e.target.getAttribute('key1')).text) {
                setTextofActiveObject(canvas.item(e.target.getAttribute('key1')).text);
            }
            else {
                setTextofActiveObject('');
            }
            console.log(canvas.item(e.target.getAttribute('key1')))
            canvas.requestRenderAll();
        } catch (error) {

        }

    }

    const setText = () => {
        canvas.getActiveObjects().forEach(element => {
            element.text = textofActiveObject;
            canvas.requestRenderAll();
        dispatch({ type: 'CHANGE_CANVAS', payload: canvas })

        });
    }
    return (<div>
        <button onClick={() => dispatch({ type: 'CHANGE_CANVAS', payload: canvas })}>Refresh</button> <b>Total Layers: </b>{layers?.length}
        <div style={{ height: 280, width: 830, overflow: 'scroll', border: '1px solid black' }}>
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
                                    <tr><th>N</th><th>M</th><th>Type</th><th>Del</th><th>Text</th><th>Font</th><th>Size</th><th>Style</th><th>Wt</th><th>Color</th><th>BGCLR</th><th>Stroke</th><th>Shadow</th></tr>
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
                                                    ><td key1={i} onClick={(e) => selectObject(e, canvas)}>{i + 1}</td><td  {...provided.dragHandleProps}><VscMove key1={i} onClick={(e) => selectObject(e, canvas)} /></td>
                                                        <td style={{backgroundColor:(activeLayers.includes(val))?'green':''}} key1={i} onClick={(e) => selectObject(e, canvas)} >{val.type}</td>
                                                        <td><button key1={i} onClick={(e) => deleteLayer(e, window.editor?.canvas)}><VscTrash style={{ pointerEvents: 'none' }} /></button></td>
                                                        {/* <td key1={i} onClick={(e) => selectObject(e, canvas)}>{(val.text)?.slice(0, 40)}</td> */}
                                                        <td key1={i} onClick={(e) => selectObject(e, canvas)}>{val.text}</td>

                                                        <td key1={i} onClick={(e) => selectObject(e, canvas)}>{val.fontFamily}</td>
                                                        <td key1={i} onClick={(e) => selectObject(e, canvas)}>{val.fontSize}</td>
                                                        <td key1={i} onClick={(e) => selectObject(e, canvas)}>{val.fontStyle}</td>
                                                        <td key1={i} onClick={(e) => selectObject(e, canvas)}>{val.fontWeight}</td>
                                                        <td><input key1={i} onClick={(e) => selectObject(e, canvas)} type="color" defaultValue={val.fill} onChange={e => changeCurrentColor(e, canvas)} /></td>
                                                        <td><input key1={i} onClick={(e) => selectObject(e, canvas)} type="color" defaultValue={val.backgroundColor} onChange={e => changeBackGroundColor(e, canvas)} /></td>
                                                        <td><input key1={i} onClick={(e) => selectObject(e, canvas)} type="color" defaultValue={val.stroke} onChange={e => changeStrokeCurrentColor(e, canvas)} /></td>
                                                        <td><input key1={i} onClick={(e) => selectObject(e, canvas)} type="color" defaultValue={val.shadow.color} onChange={e => changeShadowCurrentColor(e, canvas)} /></td>
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
            <br /> <button onClick={setText}>Set Text</button>
            <br />  <textarea cols='40' rows='30' value={textofActiveObject} onChange={e => setTextofActiveObject(e.target.value)}></textarea>
        </div>
    </div>)
}

export default Layers
