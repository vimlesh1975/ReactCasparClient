import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useState, useEffect, useCallback, useRef } from "react";

import { languagelist } from './languages'

import useCanvasStore from './store/zustandStore';

const languages = [
    "en-US",
    "hi-IN",
    "te-IN",
    "ta-IN",
    "mr-IN",
    "gu-IN",
    "	kn-IN",
    "ml-IN",
    "pa-Guru-IN",
    "ur-IN",
    "ar-SA",
    "bn-BD",
    "bn-IN",
    "cs-CZ",
    "da-DK",
    "de-AT",
    "de-CH",
    "de-DE",
    "el-GR",
    "en-AU",
    "en-CA",
    "en-GB",
    "en-IE",
    "en-IN",
    "en-NZ",
    "en-US",
    "en-ZA",
    "es-AR",
    "es-CL",
    "es-CO",
    "es-ES",
    "es-MX",
    "es-US",
    "fi-FI",
    "fr-BE",
    "fr-CA",
    "fr-CH",
    "fr-FR",
    "he-IL",
    "hi-IN",
    "hu-HU",
    "id-ID",
    "it-CH",
    "it-IT",
    "jp-JP",
    "ko-KR",
    "nl-BE",
    "nl-NL",
    "no-NO",
    "pl-PL",
    "pt-BR",
    "pt-PT",
    "ro-RO",
    "ru-RU",
    "sk-SK",
    "sv-SE",
    "ta-IN",
    "ta-LK",
    "th-TH",
    "tr-TR",
    "ur_PK",
    "zh-CN",
    "zh-HK",
    "zh-TW",
    "bh-IN"
];

function SpeechToText() {
    const { transcript, listening, resetTranscript } = useSpeechRecognition();
    const [currentLanguage, setcurrentLanguage] = useState('en-US');
    const [directtoScript, setDirecttoScript] = useState(true);

    const [lastTranscript, setLastTranscript] = useState('');
    const debounceTimer = useRef(null);

    const [targetLanguage, setTargetLanguage] = useState('hi');
    const [loading, setLoading] = useState(false);
    const activeText = useCanvasStore((state) => state.activeText);
    const setTranscript = useCanvasStore((state) => state.setTranscript);
    const setResetTranscript = useCanvasStore((state) => state.setResetTranscript);

    useEffect(() => {
        // Store the function in Zustand
        console.log('resetTranscript stored in Zustand');
        setResetTranscript(() => resetTranscript());
    }, [resetTranscript, setResetTranscript]);

    useEffect(() => {
        if (transcript === lastTranscript) return;

        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }
        debounceTimer.current = setTimeout(() => {
            if (directtoScript) {
                const aa = transcript.slice(lastTranscript.length);
                setTranscript({ text: aa, replace: false });
                setLastTranscript(transcript);
            }
        }, 500);
        return () => clearTimeout(debounceTimer.current);
    }, [transcript, lastTranscript, directtoScript, setTranscript]);


    const handleTranslate = useCallback(async () => {
        const text = activeText; // Wait for responseclg
        console.log(text)
        if (!text || !targetLanguage) {
            console.log('returning')
            return;
        }
        setLoading(true);
        try {
            const response = await fetch('https://localhost:9000/translate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text, targetLanguage }),
            });

            if (response.ok) {
                const { translatedText } = await response.json();
                setTranscript({ text: translatedText, replace: true });
                console.log(translatedText)
            } else {
                alert('Translation failed. Please try again.');
            }
        } catch (error) {
            console.error('Error translating text:', error);
            alert('Error translating text.');
        } finally {
            setLoading(false);
        }
    }, [targetLanguage, activeText, setTranscript]); // Add all dependencies

    return (<div style={{ border: '1px solid red', minHeight: 57 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: 875, maxWidth: 875 }}>
            <div >
                <b>Languages:</b> <input style={{ width: 70 }} value={currentLanguage} onChange={e => {
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
                <span> Put to Text: </span> <input type="checkbox" checked={directtoScript} onChange={e => {
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
                <span>Target Language</span>
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
        <div>
            <span>Transcript: {transcript}</span>****
            <span>activeText: {activeText}</span>
        </div>
    </div>);
}

export default SpeechToText;