'use client'
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useState, useEffect, useCallback, useRef } from "react";

import { languagelist } from '../common';
import { languages } from '../common.js';



function SpeechToText() {
    const { transcript, listening, resetTranscript } = useSpeechRecognition();
    const [currentLanguage, setcurrentLanguage] = useState('en-US');
    const [directtoScript, setDirecttoScript] = useState(true);

    const [lastTranscript, setLastTranscript] = useState('');
    const debounceTimer = useRef(null);

    const [targetLanguage, setTargetLanguage] = useState('hi');
    const [loading, setLoading] = useState(false);

    // const punctuate = (text) => {
    //     if (!text.trim()) return '';
    //     let result = text.trim();
    //     result = result.charAt(0).toUpperCase() + result.slice(1);
    //     if (!/[.?!]$/.test(result)) {
    //         result += '.';
    //     }
    //     return result + ' ';
    // };
    useEffect(() => {
        if (transcript === lastTranscript) return;

        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }
        debounceTimer.current = setTimeout(() => {
            if (directtoScript) {
                const newPart = transcript.slice(lastTranscript.length);
                // const punctuated = punctuate(newPart);
                const punctuated = newPart;
                // window.parent.postMessage({ replace: false, value: punctuated }, (window.location.origin).split(':4000')[0]);
                window.parent.postMessage({ replace: false, value: punctuated }, '*');
                setLastTranscript(transcript);
            }
        }, 500);
        return () => clearTimeout(debounceTimer.current);
    }, [transcript, lastTranscript, directtoScript]);


    const requestParentText = () => {
        return new Promise((resolve) => {
            const handleMessage = (event) => {
                // if (event.origin === (window.location.origin).split(':4000')[0]) {
                // console.log("Received from parent:", event.data);
                if (event.data.textareaValue) {
                    resolve(event.data.textareaValue);
                }
                window.removeEventListener("message", handleMessage);
            }
            // };

            window.addEventListener("message", handleMessage);

            // Send request to parent
            // console.log(window.location.origin);
            // window.parent.postMessage("request_textarea_content", (window.location.origin).split(':4000')[0]);
            window.parent.postMessage("request_textarea_content", '*');
        });
    };


    const handleTranslate = useCallback(async () => {
        const text = await requestParentText(); // Wait for responseclg
        if (!text || !targetLanguage) {
            console.log('returning')
            return;
        }
        setLoading(true);
        try {
            // const response = await fetch('/api/translate', {
            const response = await fetch('https://teleprompter-chi.vercel.app/api/translate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text, targetLanguage }),
            });

            if (response.ok) {
                const { translatedText } = await response.json();
                // window.parent.postMessage({ replace: true, value: translatedText }, (window.location.origin).split(':4000')[0]);
                window.parent.postMessage({ replace: true, value: translatedText }, "*");

            } else {
                alert('Translation failed. Please try again.');
            }
        } catch (error) {
            console.error('Error translating text:', error);
            alert('Error translating text.');
        } finally {
            setLoading(false);
        }
    }, [targetLanguage]); // Add all dependencies

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: 940, maxHeight: 100 }}>
            <div >
                <b>Langs:</b> <input style={{ width: 70 }} value={currentLanguage} onChange={e => {
                    setcurrentLanguage(e.target.value)
                    if (listening) {
                        SpeechRecognition.startListening({
                            continuous: true,
                            language: e.target.value
                        });
                    }
                }

                } />
                <select style={{ width: 70 }} value={currentLanguage}
                    onChange={(e) => {
                        setcurrentLanguage(e.target.value)
                        if (listening) {
                            SpeechRecognition.startListening({
                                continuous: true,
                                language: e.target.value
                            });
                        }
                    }
                    }
                >
                    {(languages.filter((value, index, self) => { return self.indexOf(value) === index })).map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>

            </div>
            <div>
                <span> Put to Script: </span> <input type="checkbox" checked={directtoScript} onChange={e => {
                    setDirecttoScript(val => !val);
                    resetTranscript();
                }} />
            </div>
            <div>
                <span style={{ backgroundColor: listening ? 'green' : 'red' }}>Microphone: {listening ? "ON " : "OFF "}</span>
                {!listening && <button
                    onClick={() => {
                        SpeechRecognition.startListening({
                            continuous: true,
                            language: currentLanguage
                        });
                        resetTranscript();
                    }}
                >
                    Start
                </button>}
                {listening && <button
                    onClick={() => {
                        SpeechRecognition.stopListening();
                    }}
                >
                    Stop
                </button>
                }
            </div>
            <div>
                <span>Target Lang</span>
                {languagelist.length > 0 ? (
                    <select value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}>
                        {languagelist.map((lang) => (
                            <option key={lang.code} value={lang.code}>
                                {lang.code}{lang.name ? -lang.name : ''}
                            </option>
                        ))}
                    </select>
                ) : (
                    <p>Loading languagelist...</p>
                )}
                <button onClick={handleTranslate} disabled={loading}>
                    {loading ? 'Translating...' : 'Translate'}
                </button>
            </div>
        </div>
    );
}

export default SpeechToText;