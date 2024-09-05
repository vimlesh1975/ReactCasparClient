import { VscTrash, VscMove } from "react-icons/vsc";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useSelector, useDispatch } from 'react-redux'
import { useState } from "react";
import { changeCurrentColor, changeBackGroundColor, changeStrokeCurrentColor, changeShadowCurrentColor, moveElement, deleteItemfromtimeline } from './common'
import ComSpeechRecognition from "./ComSpeechRecognition";

const LayersAll = ({ compact }) => {
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const layers = useSelector(state => state.canvasReducer.canvas?.getObjects());
    const activeLayers = useSelector(state => state.canvasReducer.canvas?.getActiveObjects());
    const [textofActiveObject, setTextofActiveObject] = useState('');
    const [idofActiveObject, setIdofActiveObject] = useState('');
    const [fontofInputBox, setFontofInputBox] = useState('Arial')
    const [fontSizeofTexrArea, setFontSizeofTexrArea] = useState(42);
    const dispatch = useDispatch();
    const kf = useSelector((state) => state.kfReducer.kf);
    const xpositions = useSelector((state) => state.xpositionsReducer.xpositions);

    const setText = () => {
        canvas.getActiveObjects().forEach(element => {
            element.set({ text: textofActiveObject });
        });
        canvas.requestRenderAll();
        dispatch({ type: 'CHANGE_CANVAS', payload: canvas });
    }

    const capitalizeText = (formatter) => {
        canvas.getActiveObjects().forEach(element => {
            element.set({ text: formatter(textofActiveObject) });
        });
        canvas.requestRenderAll();
        dispatch({ type: 'CHANGE_CANVAS', payload: canvas });
    }

    const firstLetterCapitalise = () => capitalizeText(text => text.charAt(0).toUpperCase() + text.slice(1));
    const wordCapitalise = () => capitalizeText(text => text.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" "));
    const allCapitalise = () => capitalizeText(text => text.toUpperCase());

    const setId = () => {
        canvas.getActiveObjects().forEach(element => {
            element.id = idofActiveObject;
        });
        canvas.requestRenderAll();
        dispatch({ type: 'CHANGE_CANVAS', payload: canvas })
    }

    const onDragEnd = (result) => {
        if (result.destination) {
            canvas.moveObjectTo(canvas.getObjects()[result.source.index], result.destination.index);
            moveElement(result.source.index, result.destination.index, kf, xpositions, dispatch);
            canvas.requestRenderAll(); // Call this once after moving
            dispatch({ type: 'CHANGE_CANVAS', payload: canvas });
        }
    }

    const deleteLayer = (canvas, i) => {
        canvas.setActiveObject(canvas.item(i));
        deleteItemfromtimeline(kf, xpositions, dispatch);
    }
    const toggleLock = (canvas, i) => {
        try {
            var aa = canvas.item(i);
            aa.set({ selectable: !aa.selectable })
            canvas.discardActiveObject();
            canvas.requestRenderAll();
        } catch (error) {

        }
        dispatch({ type: 'CHANGE_CANVAS', payload: canvas })
    }
    const selectObject = (canvas, i) => {
        try {
            var aa = canvas.item(i);
            canvas.setActiveObject(aa);
            setTextofActiveObject(aa.text ? aa.text : '');
            setIdofActiveObject(aa.id ? aa.id : '');
            setFontofInputBox(aa.fontFamily ? aa.fontFamily : '')
            canvas.requestRenderAll();
        } catch (error) {
        }
    }

    const getHexColor = (colorStr) => {
        if (!colorStr) return '#000000'; // Fallback to black if colorStr is null or undefined
        var a = document.createElement('div');
        a.style.color = colorStr;
        var colors = window.getComputedStyle(document.body.appendChild(a)).color.match(/\d+/g)?.map(Number);
        document.body.removeChild(a);
        return (colors && colors.length === 3)
            ? '#' + ((1 << 24) + (colors[0] << 16) + (colors[1] << 8) + colors[2]).toString(16).slice(1)
            : '#000000'; // Fallback in case the colorStr is invalid
    }

    const putxBeforeId = () => {
        canvas.getObjects().forEach(element => {
            if ((element.id).substring(0, 3) === 'ccg') {
                element.set({ id: 'x' + element.id })
            }
        });
        canvas.requestRenderAll();
        dispatch({ type: 'CHANGE_CANVAS', payload: canvas })
    }
    const removexBeforeId = () => {
        canvas.getObjects().forEach(element => {
            if ((element.id).charAt(0) === 'x') {
                element.set({ id: (element.id).substring(1) })
            }
        });
        canvas.requestRenderAll();
        dispatch({ type: 'CHANGE_CANVAS', payload: canvas })
    }

    return (<div>
        <button onClick={() => dispatch({ type: 'CHANGE_CANVAS', payload: canvas })}>Refresh</button> <b>Total Layers: </b>{layers?.length}
        <button onClick={putxBeforeId}>Put x Before All Id</button>
        <button onClick={removexBeforeId}>Remove x Before All Id</button>
        <div style={{ border: '1px solid black', height: compact ? 300 : 400, width: compact ? 355 : 890, overflow: 'scroll' }} >
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable-1" type="PERSON">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={{ backgroundColor: snapshot.isDraggingOver ? 'yellow' : 'yellowgreen' }}
                            {...provided.droppableProps}
                        >
                            <table border='1'>
                                <thead style={{ position: 'sticky', top: 0, backgroundColor: 'grey' }}>
                                    <tr ><th>N</th><th>M</th><th>Type</th><th>Del</th><th>Id</th><th>Lock</th><th>Text</th><th>Font</th><th>Size</th><th>Style</th><th>Wt</th><th>Color</th><th>BGCLR</th><th>Stroke</th><th>Shadow</th></tr>
                                </thead>
                                <tbody >
                                    {layers?.map((val, i) => {
                                        return (
                                            <Draggable draggableId={"draggable" + i} key={val + i} index={i}>
                                                {(provided, snapshot) => (
                                                    <tr onClick={() => selectObject(canvas, i)}
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        style={{
                                                            ...provided.draggableProps.style,
                                                            backgroundColor: snapshot.isDragging ? 'red' : (activeLayers.includes(val)) ? 'green' : 'white',
                                                            boxShadow: snapshot.isDragging ? "0 0 .4rem #666" : "none",
                                                            verticalAlign: 'top',
                                                            color: snapshot.isDragging ? 'white' : (activeLayers.includes(val)) ? 'white' : '',
                                                            //  marginTop: 100
                                                        }}
                                                    ><td>{i + 1}</td><td  {...provided.dragHandleProps}><VscMove /></td>
                                                        <td style={{ backgroundColor: (activeLayers.includes(val)) ? 'green' : '' }} >{val.type}</td>
                                                        <td><button onClick={() => deleteLayer(canvas, i)}><VscTrash style={{ pointerEvents: 'none' }} /></button></td>
                                                        <td>{val.id}</td>
                                                        <td onClick={() => toggleLock(canvas, i)}>{(!val.selectable).toString()}</td>

                                                        <td style={{ fontFamily: val.fontFamily }} >{val.text}</td>

                                                        <td>{val.fontFamily}</td>
                                                        <td>{val.fontSize}</td>
                                                        <td>{val.fontStyle}</td>
                                                        <td>{val.fontWeight}</td>

                                                        <td><input type="color" value={getHexColor(val.fill)} onChange={e => { changeCurrentColor(e, canvas); dispatch({ type: 'CHANGE_CANVAS', payload: canvas }) }} /></td>
                                                        <td><input type="color" value={getHexColor(val.backgroundColor)} onChange={e => { changeBackGroundColor(e, canvas); dispatch({ type: 'CHANGE_CANVAS', payload: canvas }) }} /></td>
                                                        <td><input type="color" value={getHexColor(val.stroke)} onChange={e => { changeStrokeCurrentColor(e, canvas); dispatch({ type: 'CHANGE_CANVAS', payload: canvas }) }} /></td>
                                                        <td><input type="color" value={getHexColor(val.shadow?.color)} onChange={e => { changeShadowCurrentColor(e, canvas); dispatch({ type: 'CHANGE_CANVAS', payload: canvas }) }} /></td>

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
            <br />  <button onClick={setId}>Set Id</button><input type='text' style={{ width: 300 }} value={idofActiveObject} onChange={e => setIdofActiveObject(e.target.value)} />
            Font Size<input className='inputRangeFontSize' onChange={e => setFontSizeofTexrArea(parseInt(e.target.value))} type="range" min={0} max={100} step={1} defaultValue={25} />{fontSizeofTexrArea}
            <br />  <textarea value={textofActiveObject} onChange={e => setTextofActiveObject(e.target.value)} style={{ width: compact ? 350 : 890, height: 150, fontFamily: fontofInputBox, fontSize: fontSizeofTexrArea }} ></textarea>
            <button onClick={setText}>Set Text</button>
            <button onClick={firstLetterCapitalise}>1st Letter Capitalise</button>
            <button onClick={allCapitalise}>AllCapitalise</button>
            <button onClick={wordCapitalise}>Word Capitalise</button>


        </div>
        <ComSpeechRecognition />

    </div>)
}

export default LayersAll
