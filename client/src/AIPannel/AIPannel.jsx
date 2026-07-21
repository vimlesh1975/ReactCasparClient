import React, { useState, useRef, useEffect } from 'react';
import { FiSend, FiMic, FiTrash2 } from 'react-icons/fi';
import { presetPrompts } from './presetPrompts';
import { creativeModes } from './CreativeModes';
import { stylePresets } from './StylePresets';
import { buildSystemPrompt } from './PromptEngine';
import { dispatchCommand, postProcessCommands } from './CommandDispatcher';

const AIPannel = ({ generateTheatreID, deleteTheatreID }) => {
    const [prompt, setPrompt] = useState('blue rectangle with the text "Vimlesh Kumar"');
    const [creativeMode, setCreativeMode] = useState('Professional');
    const [stylePreset, setStylePreset] = useState('BBC News');
    const [chatHistory, setChatHistory] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        try {
            const savedPrompt = localStorage.getItem('ai_temp_prompt');
            const savedChat = localStorage.getItem('ai_temp_chat');
            if (savedPrompt) {
                setPrompt(savedPrompt);
                localStorage.removeItem('ai_temp_prompt');
            }
            if (savedChat) {
                setChatHistory(JSON.parse(savedChat));
                localStorage.removeItem('ai_temp_chat');
            }
        } catch(e){}
    }, []);
    const [status, setStatus] = useState('idle'); // idle | generating | error | done
    const [isListening, setIsListening] = useState(false);
    
    const chatContainerRef = useRef(null);

    // Auto-scroll chat to bottom
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]);

    const handleListen = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Your browser does not support speech recognition.");
            return;
        }
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => setIsListening(true);
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setPrompt(transcript);
        };
        recognition.onerror = (event) => {
            console.error("Speech recognition error", event.error);
            setIsListening(false);
        };
        recognition.onend = () => setIsListening(false);

        recognition.start();
    };

    const getCanvasState = (canvas) => {
        if (!canvas) return '[]';
        const objects = canvas.getObjects().map((obj, i) => {
            // Auto-inject a unique ID if it doesn't exist to help the AI target it
            if (!obj.id_) {
                obj.set('id_', `obj_${i}_${Date.now()}`);
            }
            return {
                id_: obj.id_,
                type: obj.type,
                left: obj.left,
                top: obj.top,
                width: obj.width * (obj.scaleX || 1),
                height: obj.height * (obj.scaleY || 1),
                fill: obj.fill,
                text: obj.text || undefined,
            };
        });
        return JSON.stringify(objects, null, 2);
    };

    const handleGenerate = async (customPrompt = null) => {
        const textToGenerate = typeof customPrompt === 'string' ? customPrompt : prompt;
        if (!textToGenerate.trim()) return;
        setStatus('generating');
        setErrorMessage('');
        
        const canvas = window.editor?.canvas;
        if (!canvas) {
            console.error('Fabric canvas not available');
            setStatus('error');
            return;
        }

        const currentPrompt = textToGenerate;
        // Add user message to UI immediately
        setChatHistory(prev => [...prev, { role: 'user', content: currentPrompt }]);

        try {
            // Extract Canvas State
            const canvasStateJSON = getCanvasState(canvas);
            const systemPrompt = buildSystemPrompt(creativeMode, stylePreset, canvasStateJSON);
            const apiUrl = 'https://octopus-app-gzws3.ondigitalocean.app/api/ai/component';

            // Construct payload with limited history (last 6 messages to save tokens)
            const recentHistory = chatHistory.slice(-6).map(msg => ({
                role: msg.role,
                content: msg.content
            }));

            const messages = [
                { role: 'system', content: systemPrompt },
                ...recentHistory,
                { role: 'user', content: currentPrompt }
            ];

            const resp = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'openai/gpt-4o-mini',
                    temperature: 1.2,
                    messages: messages
                }),
            });

            if (!resp.ok) {
                const errText = await resp.text();
                throw new Error(`OpenRouter API error ${resp.status}: ${errText}`);
            }

            const contentType = resp.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") === -1) {
                throw new Error("Server returned HTML instead of JSON. Did you restart the backend Node server after the update?");
            }

            const data = await resp.json();
            let content = data.choices?.[0]?.message?.content || '[]';
            content = content.replace(/```json/g, '').replace(/```/g, '').trim();

            let commands = [];
            try {
                commands = JSON.parse(content);
            } catch (e) {
                console.error("Failed to parse LLM response:", content);
                throw new Error("Invalid JSON from LLM");
            }

            commands.forEach(cmd => {
                dispatchCommand(canvas, cmd, generateTheatreID, deleteTheatreID);
            });

            postProcessCommands(canvas);
            
            // Add AI response to history
            setChatHistory(prev => [...prev, { role: 'assistant', content: `Executed ${commands.length} actions.` }]);
            setStatus('done');
        } catch (e) {
            console.error('AI generation failed', e);
            setErrorMessage(e.message || String(e));
            setChatHistory(prev => [...prev, { role: 'assistant', content: `Error: ${e.message || String(e)}` }]);
            setStatus('error');
        }
    };

    return (
        <div className="aiPanel" style={{ padding: '12px', background: 'rgba(20,20,20,0.9)', borderRadius: '8px', color: '#fff', display: 'flex', flexDirection: 'column', height: '100%', maxHeight: '600px' }}>
            <h3 style={{ margin: '0 0 8px 0' }}>AI Studio</h3>
            
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <select
                    style={{ flex: 1, padding: '6px', borderRadius: '4px', background: '#333', color: '#fff', border: '1px solid #555' }}
                    value={creativeMode}
                    onChange={(e) => setCreativeMode(e.target.value)}
                    title="Creative Mode"
                >
                    {Object.keys(creativeModes).map(mode => (
                        <option key={mode} value={mode}>{mode} Mode</option>
                    ))}
                </select>
                <select
                    style={{ flex: 1, padding: '6px', borderRadius: '4px', background: '#333', color: '#fff', border: '1px solid #555' }}
                    value={stylePreset}
                    onChange={(e) => setStylePreset(e.target.value)}
                    title="Style Preset"
                >
                    {Object.keys(stylePresets).map(preset => (
                        <option key={preset} value={preset}>{preset}</option>
                    ))}
                </select>
            </div>

            <select
                style={{ width: '100%', marginBottom: '8px', padding: '6px', borderRadius: '4px', background: '#333', color: '#fff', border: '1px solid #555' }}
                onChange={(e) => {
                    if (e.target.value && e.target.value !== "Select a template...") {
                        setPrompt(e.target.value);
                    }
                }}
            >
                <option value="Select a template...">Select a template...</option>
                {Object.keys(presetPrompts).map((category, i) => (
                    <optgroup key={i} label={category}>
                        {presetPrompts[category].map((p, j) => (
                            <option key={j} value={p}>{p}</option>
                        ))}
                    </optgroup>
                ))}
            </select>

            <div 
                ref={chatContainerRef}
                style={{ flex: 1, overflowY: 'auto', background: '#222', borderRadius: '4px', padding: '8px', marginBottom: '8px', display: 'flex', flexDirection: 'column', gap: '8px', minHeight: '150px' }}
            >
                {chatHistory.length === 0 ? (
                    <div style={{ color: '#888', textAlign: 'center', margin: 'auto' }}>No chat history yet.<br/>Start generating graphics!</div>
                ) : (
                    chatHistory.map((msg, idx) => (
                        <div key={idx} style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', background: msg.role === 'user' ? '#0055cc' : '#444', padding: '6px 10px', borderRadius: '8px', maxWidth: '85%', fontSize: '12px', wordWrap: 'break-word' }}>
                            {msg.content}
                        </div>
                    ))
                )}
            </div>

            <textarea
                rows={2}
                style={{ width: '100%', resize: 'vertical', marginBottom: '8px', borderRadius: '4px', padding: '6px', minHeight: '60px' }}
                placeholder={'Describe the Fabric component you want (e.g., "red rectangle with shadow")'}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleGenerate();
                    }
                }}
            />
            
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
                <button
                    onClick={() => handleGenerate("Analyze the current canvas state and improve the layout, spacing, and typography without changing the text content.")}
                    style={{ flex: 1, padding: '4px', background: '#333', color: '#00cc66', border: '1px solid #00cc66', borderRadius: '4px', cursor: 'pointer', fontSize: '11px' }}
                >
                    ✨ Improve Design
                </button>
                <button
                    onClick={() => handleGenerate("Upgrade the current canvas state to a premium broadcast aesthetic. Add subtle gradients, drop shadows, and high-contrast accent lines.")}
                    style={{ flex: 1, padding: '4px', background: '#333', color: '#ffcc00', border: '1px solid #ffcc00', borderRadius: '4px', cursor: 'pointer', fontSize: '11px' }}
                >
                    💎 Make Premium
                </button>
                <button
                    onClick={() => handleGenerate("Do NOT just copy the existing objects. Generate 3 DISTINCT and UNIQUE stylistic variations of the current graphic. Radically change the shapes, colors, typography, and layout for each variation. Distribute them vertically across the canvas so they do not overlap.")}
                    style={{ flex: 1, padding: '4px', background: '#333', color: '#0099ff', border: '1px solid #0099ff', borderRadius: '4px', cursor: 'pointer', fontSize: '11px' }}
                >
                    🔀 Variations
                </button>
                <button
                    onClick={() => {
                        const lastUserMessage = [...chatHistory].reverse().find(m => m.role === 'user');
                        if (lastUserMessage) handleGenerate(lastUserMessage.content);
                    }}
                    style={{ flex: 1, padding: '4px', background: '#333', color: '#ccc', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', fontSize: '11px' }}
                >
                    🔄 Regenerate
                </button>
            </div>
            
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button
                    onClick={handleGenerate}
                    disabled={status === 'generating'}
                    style={{ flex: 1, padding: '6px 12px', background: '#0066ff', color: '#fff', border: 'none', borderRadius: '4px', cursor: status === 'generating' ? 'wait' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '100px' }}
                >
                    <FiSend style={{ marginRight: '4px' }} />
                    {status === 'generating' ? 'Generating…' : 'Generate'}
                </button>
                <button
                    onClick={handleListen}
                    title="Voice Input"
                    style={{ padding: '6px 12px', background: isListening ? '#ff3333' : '#444', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <FiMic size={16} />
                </button>
                <button
                    onClick={() => {
                        setPrompt('');
                        setChatHistory([]);
                        localStorage.removeItem('ai_temp_prompt');
                        localStorage.removeItem('ai_temp_chat');
                    }}
                    title="Clear Chat History"
                    style={{ padding: '6px 12px', background: '#333', color: '#fff', border: '1px solid #555', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <FiTrash2 size={16} />
                </button>
                <button
                    onClick={() => {
                        const canvas = window.editor?.canvas;
                        if (canvas) {
                            canvas.getObjects().forEach(obj => {
                                if (deleteTheatreID) deleteTheatreID(obj.id);
                                canvas.remove(obj);
                            });
                            canvas.requestRenderAll();
                            setChatHistory(prev => [...prev, { role: 'assistant', content: 'Canvas cleared.' }]);
                        }
                    }}
                    title="Clear Canvas"
                    style={{ padding: '6px 12px', background: '#cc0000', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <FiTrash2 size={16} />
                </button>
            </div>
            {errorMessage && (
                <div style={{ marginTop: '8px', color: '#ff4444', fontSize: '12px', background: '#330000', padding: '8px', borderRadius: '4px', wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
                    {errorMessage}
                </div>
            )}
        </div>
    );
};

export default AIPannel;
