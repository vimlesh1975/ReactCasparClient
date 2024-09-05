import React, { useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useSelector, useDispatch } from 'react-redux'

const ComSpeechRecognition = () => {
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const dispatch = useDispatch();
    const [replace1, setReplace1] = useState(true);
    const currentLanguage = useSelector(state => state.speechRecognitionReducer.currentLanguage);
    const continuous1 = useSelector(state => state.speechRecognitionReducer.continuous1);
    const { transcript, listening, resetTranscript } = useSpeechRecognition();
    const setTextfromMic = (replace) => {
        canvas.getActiveObjects().forEach(element => {
            if (replace) {
                element.set({ text: transcript });
            }
            else {
                if (element.text === "") {
                    element.set({ text: element.text + transcript });
                }
                else {
                    element.set({ text: element.text + " " + transcript });
                }
            }
        });
        canvas.requestRenderAll();
        dispatch({ type: 'CHANGE_CANVAS', payload: canvas })
    }

    return (
        <div>
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
    )
}

export default ComSpeechRecognition
