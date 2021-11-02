import { VscTrash, VscMove } from "react-icons/vsc";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from 'react-redux'
import { useState } from "react";
import { changeCurrentColor, changeBackGroundColor, changeStrokeCurrentColor, changeShadowCurrentColor } from './common'

const Layers = () => {
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const layers = useSelector(state => state.canvasReducer.canvas?.getObjects());
    const activeLayers = useSelector(state => state.canvasReducer.canvas?.getActiveObjects());

    const canvasList = useSelector(state => state.canvasListReducer.canvasList);
    const currentPage = useSelector(state => state.currentPageReducer.currentPage);

    const [textofActiveObject, setTextofActiveObject] = useState('');
    const [idofActiveObject, setIdofActiveObject] = useState('');

    const updatePage = () => {
        const updatedcanvasList = canvasList.map((val, i) => {
            return (i === currentPage) ? { 'pageName': val.pageName, 'pageValue': canvas.toJSON(['id', 'selectable']) } : val;
        });
        dispatch({ type: 'CHANGE_CANVAS_LIST', payload: [...updatedcanvasList] })
    }

    const setText = () => {
        canvas.getActiveObjects().forEach(element => {
            element.text = textofActiveObject;
            canvas.requestRenderAll();
            dispatch({ type: 'CHANGE_CANVAS', payload: canvas })

        });
    }

    const setId = () => {
        canvas.getActiveObjects().forEach(element => {
            element.id = idofActiveObject;
            canvas.requestRenderAll();
            dispatch({ type: 'CHANGE_CANVAS', payload: canvas })

        });
    }

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
            setTextofActiveObject(canvas.item(e.target.getAttribute('key1')).text ? canvas.item(e.target.getAttribute('key1')).text : '');
            setIdofActiveObject(canvas.item(e.target.getAttribute('key1')).id ? canvas.item(e.target.getAttribute('key1')).id : '');
            console.log(canvas.item(e.target.getAttribute('key1'))._originalElement.currentSrc)
            canvas.requestRenderAll();
        } catch (error) {
            //dummy
        }
    }


    return (<div>
        <button onClick={() => dispatch({ type: 'CHANGE_CANVAS', payload: canvas })}>Refresh</button> <b>Total Layers: </b>{layers?.length}
        <button onClick={updatePage}>Update Page</button>


        <div style={{ height: 580, width: 830, overflow: 'scroll', border: '1px solid black' }}>
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
                                    <tr><th>N</th><th>M</th><th>Type</th><th>Del</th><th>Id</th><th>Text</th><th>Font</th><th>Size</th><th>Style</th><th>Wt</th><th>Color</th><th>BGCLR</th><th>Stroke</th><th>Shadow</th></tr>
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
                                                        <td style={{ backgroundColor: (activeLayers.includes(val)) ? 'green' : '' }} key1={i} onClick={(e) => selectObject(e, canvas)} >{val.type}</td>
                                                        <td><button key1={i} onClick={(e) => deleteLayer(e, window.editor?.canvas)}><VscTrash style={{ pointerEvents: 'none' }} /></button></td>
                                                        <td key1={i} onClick={(e) => selectObject(e, canvas)}>{val.id}</td>
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
            <br /> <button onClick={setText}>Set Text</button> <button onClick={setId}>Set Id</button><input type='text' value={idofActiveObject} onChange={e => setIdofActiveObject(e.target.value)} />
            <br />  <textarea cols='110' rows='10' value={textofActiveObject} onChange={e => setTextofActiveObject(e.target.value)}></textarea>
        </div>
    </div>)
}

export default Layers
