import React, { useState, useRef, useEffect } from 'react';
import { FiSend, FiMic, FiTrash2, FiImage, FiX } from 'react-icons/fi';
import { presetPrompts } from './presetPrompts';
import { BROADCAST_THEMES } from './Themes';
import { buildSystemPrompt } from './PromptEngine';
import { dispatchCommand, postProcessCommands } from './CommandDispatcher';

const AIPannel = ({ generateTheatreID, deleteTheatreID }) => {
    const [prompt, setPrompt] = useState('');
    const [selectedTheme, setSelectedTheme] = useState('Default (Auto)');
    const [chatHistory, setChatHistory] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [attachedImage, setAttachedImage] = useState(null); // base64 string

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
    const fileInputRef = useRef(null);
    const isProcessingRef = useRef(false);

    // Auto-scroll chat to bottom
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]);

    const handlePaste = (e) => {
        if (isProcessingRef.current) return;
        const items = e.clipboardData?.items;
        if (items) {
            for (let i = 0; i < items.length; i++) {
                if (items[i].type.indexOf('image') !== -1) {
                    const file = items[i].getAsFile();
                    if (file) {
                        e.preventDefault();
                        e.stopPropagation();
                        processImageFile(file);
                        break;
                    }
                }
            }
        }
    };

    const processImageFile = (file) => {
        if (!file || isProcessingRef.current) return;
        isProcessingRef.current = true;
        const reader = new FileReader();
        reader.onload = (event) => {
            const imageResult = event.target.result;
            setAttachedImage(imageResult);
            setPrompt('');
            // Automatically generate without needing a text prompt!
            handleGenerate(null, imageResult);
        };
        reader.readAsDataURL(file);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            processImageFile(file);
        }
    };

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

    const handleHistoryDoubleClick = (msg) => {
        if (!msg || isProcessingRef.current || status === 'generating') return;
        if (msg.image) {
            setAttachedImage(msg.image);
            handleGenerate(msg.content || '', msg.image);
        } else if (msg.content && !msg.content.startsWith('Executed') && !msg.content.startsWith('Error:')) {
            setPrompt(msg.content);
            handleGenerate(msg.content, null);
        }
    };

    const handleGenerate = async (customPrompt = null, customImage = null) => {
        const imageToUse = customImage || attachedImage;
        let textToGenerate = typeof customPrompt === 'string' ? customPrompt : prompt;
        
        if (imageToUse && (!textToGenerate.trim() || textToGenerate === 'blue rectangle with the text "Vimlesh Kumar"')) {
            textToGenerate = "Analyze this screenshot and recreate identical TV broadcast canvas graphics matching its layout, background shapes, text content, colors, and typography.";
        }

        if (!textToGenerate.trim() && !imageToUse) return;
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
        const userDisplayMsg = imageToUse ? (currentPrompt || 'Recreating graphics from pasted screenshot...') : currentPrompt;
        setChatHistory(prev => [...prev, { role: 'user', content: userDisplayMsg, image: imageToUse }]);

        try {
            // Extract Canvas State
            const canvasStateJSON = getCanvasState(canvas);
            const systemPrompt = buildSystemPrompt(canvasStateJSON, selectedTheme);
            const apiUrl = 'https://octopus-app-gzws3.ondigitalocean.app/api/ai/component';

            // Construct payload with limited history (last 6 messages to save tokens)
            const recentHistory = chatHistory.slice(-6).map(msg => ({
                role: msg.role,
                content: msg.content
            }));

            const userPayloadContent = imageToUse ? [
                { type: 'text', text: currentPrompt },
                { type: 'image_url', image_url: { url: imageToUse } }
            ] : currentPrompt;

            const messages = [
                { role: 'system', content: systemPrompt },
                ...recentHistory,
                { role: 'user', content: userPayloadContent }
            ];

            const resp = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: imageToUse ? 'google/gemini-2.5-flash' : 'openai/gpt-4o-mini',
                    temperature: 1.2,
                    messages: messages
                }),
            });

            if (!resp.ok) {
                const errText = await resp.text();
                throw new Error(`AI API error ${resp.status}: ${errText}`);
            }

            const contentType = resp.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") === -1) {
                throw new Error("Server returned HTML instead of JSON.");
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
            setAttachedImage(null); // Reset image after generation
        } catch (e) {
            console.error('AI generation failed', e);
            setErrorMessage(e.message || String(e));
            setChatHistory(prev => [...prev, { role: 'assistant', content: `Error: ${e.message || String(e)}` }]);
            setStatus('error');
        } finally {
            isProcessingRef.current = false;
        }
    };

    return (
        <div 
            className="aiPanel" 
            onPaste={handlePaste}
            style={{ padding: '12px', background: 'rgba(20,20,20,0.9)', borderRadius: '8px', color: '#fff', display: 'flex', flexDirection: 'column', height: '100%', maxHeight: '650px' }}
        >
            <h3 style={{ margin: '0 0 8px 0' }}>AI Studio</h3>

            <div style={{ marginBottom: '8px' }}>
                <label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '3px' }}>🎨 Select Broadcast Theme (10 Themes):</label>
                <select
                    style={{ width: '100%', padding: '6px', borderRadius: '4px', background: '#2a2a2a', color: '#ffcc00', border: '1px solid #ffcc00', fontWeight: 'bold' }}
                    value={selectedTheme}
                    onChange={(e) => setSelectedTheme(e.target.value)}
                    title="Broadcast Theme"
                >
                    {Object.keys(BROADCAST_THEMES).map(tName => (
                        <option key={tName} value={tName}>🎭 {tName}</option>
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
                style={{ flex: 1, overflowY: 'auto', background: '#222', borderRadius: '4px', padding: '8px', marginBottom: '8px', display: 'flex', flexDirection: 'column', gap: '8px', minHeight: '120px' }}
            >
                {chatHistory.length === 0 ? (
                    <div style={{ color: '#888', textAlign: 'center', margin: 'auto', fontSize: '12px' }}>
                        No chat history yet.<br/>
                        💡 <b>Tip:</b> Paste a screenshot (Ctrl+V) directly here to recreate graphics from an image!
                    </div>
                ) : (
                    chatHistory.map((msg, idx) => (
                        <div 
                            key={idx} 
                            onDoubleClick={() => handleHistoryDoubleClick(msg)}
                            title="💡 Double-click to regenerate this graphic!"
                            style={{ 
                                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', 
                                background: msg.role === 'user' ? '#0055cc' : '#444', 
                                padding: '8px 10px', 
                                borderRadius: '8px', 
                                maxWidth: '90%', 
                                fontSize: '12px', 
                                wordWrap: 'break-word',
                                cursor: 'pointer',
                                transition: 'transform 0.1s ease',
                                border: '1px solid transparent'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.borderColor = '#ffcc00'}
                            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
                        >
                            {msg.image && (
                                <div style={{ marginBottom: '6px' }}>
                                    <img 
                                        src={msg.image} 
                                        alt="Pasted Screenshot" 
                                        style={{ width: '100%', maxWidth: '280px', maxHeight: '180px', borderRadius: '6px', objectFit: 'contain', border: '1px solid #ffcc00', display: 'block' }} 
                                    />
                                </div>
                            )}
                            <div>{msg.content}</div>
                        </div>
                    ))
                )}
            </div>

            {attachedImage && (
                <div style={{ position: 'relative', marginBottom: '8px', display: 'inline-block', background: '#111', padding: '4px', borderRadius: '4px', border: '1px dashed #ffcc00' }}>
                    <img 
                        src={attachedImage} 
                        alt="Attached Screenshot" 
                        style={{ maxHeight: '90px', maxWidth: '100%', borderRadius: '4px', objectFit: 'contain', display: 'block' }} 
                    />
                    <button
                        onClick={() => setAttachedImage(null)}
                        title="Remove screenshot"
                        style={{ position: 'absolute', top: '4px', right: '4px', background: 'rgba(0,0,0,0.8)', color: '#ff4444', border: 'none', borderRadius: '50%', width: '22px', height: '22px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <FiX size={14} />
                    </button>
                    <div style={{ fontSize: '10px', color: '#ffcc00', marginTop: '2px', textAlign: 'center' }}>📷 Screenshot attached — Vision AI active</div>
                </div>
            )}

            <input 
                type="file" 
                ref={fileInputRef} 
                accept="image/*" 
                style={{ display: 'none' }} 
                onChange={handleImageUpload} 
            />

            <textarea
                rows={2}
                style={{ width: '100%', resize: 'vertical', marginBottom: '8px', borderRadius: '4px', padding: '6px', minHeight: '55px', background: '#111', color: '#fff', border: '1px solid #444' }}
                placeholder={'Describe or paste screenshot (Ctrl+V) e.g., "Recreate this lower third"'}
                value={prompt}
                onPaste={handlePaste}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleGenerate();
                    }
                }}
            />
            
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
                <button
                    onClick={() => handleGenerate("Analyze the current canvas state and improve the layout, spacing, and typography without changing the text content.")}
                    style={{ flex: 1, padding: '4px', background: '#333', color: '#00cc66', border: '1px solid #00cc66', borderRadius: '4px', cursor: 'pointer', fontSize: '11px' }}
                >
                    ✨ Improve
                </button>
                <button
                    onClick={() => handleGenerate("Upgrade the current canvas state to a premium broadcast aesthetic. Add subtle gradients, drop shadows, and high-contrast accent lines.")}
                    style={{ flex: 1, padding: '4px', background: '#333', color: '#ffcc00', border: '1px solid #ffcc00', borderRadius: '4px', cursor: 'pointer', fontSize: '11px' }}
                >
                    💎 Premium
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
                    onClick={() => handleGenerate()}
                    disabled={status === 'generating'}
                    style={{ flex: 1, padding: '6px 12px', background: '#0066ff', color: '#fff', border: 'none', borderRadius: '4px', cursor: status === 'generating' ? 'wait' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '100px' }}
                >
                    <FiSend style={{ marginRight: '4px' }} />
                    {status === 'generating' ? 'Generating…' : 'Generate'}
                </button>
                <button
                    onClick={() => fileInputRef.current?.click()}
                    title="Attach Screenshot Image"
                    style={{ padding: '6px 12px', background: attachedImage ? '#ffcc00' : '#444', color: attachedImage ? '#000' : '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <FiImage size={16} />
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
                        setAttachedImage(null);
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
