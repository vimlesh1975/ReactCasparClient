import { VscTrash, VscMove } from "react-icons/vsc";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useSelector, useDispatch } from 'react-redux'
import { useState } from "react";
import { changeCurrentColor, changeBackGroundColor, changeStrokeCurrentColor, changeShadowCurrentColor, moveElement, deleteItemfromtimeline } from './common'
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const Layers = () => {
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const layers = useSelector(state => state.canvasReducer.canvas?.getObjects());
    const kf = useSelector((state) => state.kfReducer.kf);
    const xpositions = useSelector((state) => state.xpositionsReducer.xpositions);
    const activeLayers = useSelector(state => state.canvasReducer.canvas?.getActiveObjects());
    const [textofActiveObject, setTextofActiveObject] = useState('');
    const [idofActiveObject, setIdofActiveObject] = useState('');
    const [fontofInputBox, setFontofInputBox] = useState('Arial')
    const [fontSizeofTexrArea, setFontSizeofTexrArea] = useState(42);
    const [replace1, setReplace1] = useState(true);

    const { transcript, listening, resetTranscript } = useSpeechRecognition();

    const currentLanguage = useSelector(state => state.speechRecognitionReducer.currentLanguage);
    const continuous1 = useSelector(state => state.speechRecognitionReducer.continuous1);
    const dispatch = useDispatch();


    const setText = () => {
        canvas.getActiveObjects().forEach(element => {
            element.text = textofActiveObject;
        });
        canvas.requestRenderAll();
        dispatch({ type: 'CHANGE_CANVAS', payload: canvas })
    }

    const firstLetterCapitalise = () => {
        canvas.getActiveObjects().forEach(element => {
            element.text = textofActiveObject[0].toUpperCase() + textofActiveObject.slice(1);;
        });
        canvas.requestRenderAll();
        dispatch({ type: 'CHANGE_CANVAS', payload: canvas })
    }

    const wordCapitalise = () => {
        canvas.getActiveObjects().forEach(element => {
            const aa = textofActiveObject.split(" ");
            const bb = aa.map((val) => val[0].toUpperCase() + val.slice(1))
            const cc = bb.join(" ");
            element.text = cc
        });
        canvas.requestRenderAll();
        dispatch({ type: 'CHANGE_CANVAS', payload: canvas })
    }
    const allCapitalise = () => {
        canvas.getActiveObjects().forEach(element => {
            element.text = textofActiveObject.toUpperCase()
            canvas.requestRenderAll();
            dispatch({ type: 'CHANGE_CANVAS', payload: canvas })

        });
    }


    const setTextfromMic = (replace) => {
        canvas.getActiveObjects().forEach(element => {
            if (replace) {
                element.text = transcript;
            }
            else {
                if (element.text === "") {
                    element.text += transcript;
                }
                else {
                    element.text += " " + transcript;
                }
            }
        });
        canvas.requestRenderAll();
        dispatch({ type: 'CHANGE_CANVAS', payload: canvas })
    }

    const setId = () => {
        canvas.getActiveObjects().forEach(element => {
            element.id = idofActiveObject;
        });
        canvas.requestRenderAll();
        dispatch({ type: 'CHANGE_CANVAS', payload: canvas });
    }

    const onDragEnd = (result) => {
        if (result.destination != null) {
            canvas.moveObjectTo(canvas.getObjects()[result.source?.index], result.destination?.index);
            canvas.requestRenderAll();
            dispatch({ type: 'CHANGE_CANVAS', payload: canvas })

            moveElement(result.source?.index, result.destination?.index, kf, xpositions, dispatch);
        }
    }


    const deleteLayer = (e, canvas) => {
        canvas.setActiveObject(canvas.item(e.target.getAttribute('key1')))
        deleteItemfromtimeline(kf, xpositions, dispatch);
    }
    const toggleLock = (e, canvas) => {
        try {
            var aa = canvas.item(e.target.getAttribute('key1'));
            aa.set({ selectable: !aa.selectable })
            canvas.discardActiveObject();
            canvas.requestRenderAll();
        } catch (error) {
        }
        dispatch({ type: 'CHANGE_CANVAS', payload: canvas })
    }
    const selectObject = (e, canvas) => {
        try {
            var aa = canvas.item(e.target.getAttribute('key1'));
            canvas.setActiveObject(aa);
            setTextofActiveObject(aa.text ? aa.text : '');
            setIdofActiveObject(aa.id ? aa.id : '');
            setFontofInputBox(aa.fontFamily ? aa.fontFamily : '')
            canvas.requestRenderAll();
        } catch (error) {
            //dummy
        }
    }
    const selectObject1 = (e, canvas) => {
        try {
            var aa = canvas.item(e.target.getAttribute('key1'));
            canvas.setActiveObject(aa);
            canvas.requestRenderAll();
        } catch (error) {
            //dummy
        }
    }
    const getHexColor = (colorStr) => {
        var a = document.createElement('div');
        a.style.color = colorStr;
        var colors = window.getComputedStyle(document.body.appendChild(a)).color.match(/\d+/g).map(function (a) { return parseInt(a, 10); });
        document.body.removeChild(a);
        return (colors.length >= 3) ? '#' + (((1 << 24) + (colors[0] << 16) + (colors[1] << 8) + colors[2]).toString(16).substr(1)) : false;
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
        <div style={{ border: '1px solid black', height: 580, width: 835, overflow: 'scroll' }} >
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
                                                    <tr
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
                                                    >
                                                        <td key1={i} onClick={(e) => selectObject(e, canvas)}>{i + 1}</td><td  {...provided.dragHandleProps}><VscMove key1={i} onClick={(e) => selectObject(e, canvas)} /></td>
                                                        <td style={{ backgroundColor: (activeLayers.includes(val)) ? 'green' : '' }} key1={i} onClick={(e) => selectObject(e, canvas)} >{val.type}</td>
                                                        <td><button key1={i} onClick={(e) => deleteLayer(e, window.editor?.canvas)}><VscTrash style={{ pointerEvents: 'none' }} /></button></td>
                                                        <td key1={i} onClick={(e) => selectObject(e, canvas)}>{val.id}</td>
                                                        <td key1={i} onClick={(e) => toggleLock(e, canvas)}>{(!val.selectable).toString()}</td>

                                                        <td style={{ fontFamily: val.fontFamily }} key1={i} onClick={(e) => selectObject(e, canvas)}>{val.text}</td>

                                                        <td key1={i} onClick={(e) => selectObject(e, canvas)}>{val.fontFamily}</td>
                                                        <td key1={i} onClick={(e) => selectObject(e, canvas)}>{val.fontSize}</td>
                                                        <td key1={i} onClick={(e) => selectObject(e, canvas)}>{val.fontStyle}</td>
                                                        <td key1={i} onClick={(e) => selectObject(e, canvas)}>{val.fontWeight}</td>

                                                        <td><input key1={i} onClick={(e) => selectObject1(e, canvas)} type="color" value={getHexColor(val.fill)} onChange={e => { changeCurrentColor(e, canvas); dispatch({ type: 'CHANGE_CANVAS', payload: canvas }) }} /></td>
                                                        <td><input key1={i} onClick={(e) => selectObject1(e, canvas)} type="color" value={getHexColor(val.backgroundColor)} onChange={e => { changeBackGroundColor(e, canvas); dispatch({ type: 'CHANGE_CANVAS', payload: canvas }) }} /></td>
                                                        <td><input key1={i} onClick={(e) => selectObject1(e, canvas)} type="color" value={getHexColor(val.stroke)} onChange={e => { changeStrokeCurrentColor(e, canvas); dispatch({ type: 'CHANGE_CANVAS', payload: canvas }) }} /></td>
                                                        <td><input key1={i} onClick={(e) => selectObject1(e, canvas)} type="color" value={getHexColor(val.shadow?.color)} onChange={e => { changeShadowCurrentColor(e, canvas); dispatch({ type: 'CHANGE_CANVAS', payload: canvas }) }} /></td>
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
            <button onClick={setId}>Set Id</button><input type='text' style={{ width: 300 }} value={idofActiveObject} onChange={e => setIdofActiveObject(e.target.value)} />

            Size<input className='inputRangeFontSize' onChange={e => setFontSizeofTexrArea(parseInt(e.target.value))} type="range" min={0} max={100} step={1} defaultValue={42} />{fontSizeofTexrArea}
            <button onClick={setText}>Set Text</button>
            <button onClick={firstLetterCapitalise}>1st Letter Capitalise</button>
            <button onClick={allCapitalise}>AllCapitalise</button>
            <button onClick={wordCapitalise}>Word Capitalise</button>

            <br />  <textarea value={textofActiveObject} onChange={e => setTextofActiveObject(e.target.value)} style={{ width: 820, height: 100, fontFamily: fontofInputBox, fontSize: fontSizeofTexrArea }} ></textarea>
            <div style={{ border: '1px solid red' }}>
                <span> <b>Speech Recognition </b></span>
                <span>Microphone: {listening ? "ON " : "OFF "}</span>
                <button
                    onClick={() => {
                        SpeechRecognition.startListening({
                            continuous: continuous1,
                            language: currentLanguage
                        });
                    }}
                >
                    Start
                </button>
                {listening === false && transcript !== "" && (
                    <button
                        onClick={() => {
                            SpeechRecognition.stopListening();
                            setTextfromMic(replace1);
                            resetTranscript();
                        }}
                    >
                        Set
                    </button>
                )}
                {listening && continuous1 && <button
                    onClick={() => {
                        SpeechRecognition.stopListening();
                        // setTextfromMic(replace1);
                        // resetTranscript();
                    }}
                >
                    Stop
                </button>
                }

                <span> Replace: </span> <input type="checkbox" checked={replace1} onChange={e => setReplace1(val => !val)} />
                <span> Continuous: </span> <input type="checkbox" checked={continuous1} onChange={e => dispatch({ type: 'CHANGE_CONTINUOUS1', payload: !continuous1 })} />

                <div> {transcript}</div>
            </div>
        </div>
    </div>)
}

export default Layers