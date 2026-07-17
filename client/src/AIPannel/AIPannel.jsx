// src/AIPannel/AIPannel.jsx
import React, { useState } from 'react';
import { FiSend, FiMic, FiX } from 'react-icons/fi';
import { createRect, createCircle, createTriangle, createTextBox, gradient, gradient2 } from '../common';



const AIPannel = () => {
    // Default prompt now creates a blue circle with optional text
    const [prompt, setPrompt] = useState('blue circle with the text "Hello"');
    const [status, setStatus] = useState('idle'); // idle | generating | error | done
    const [errorMessage, setErrorMessage] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [isListening, setIsListening] = useState(false);

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

    const handleGenerate = async () => {
        if (!prompt.trim()) return;
        setStatus('generating');
        setErrorMessage('');
        setResponseMessage('');
        const canvas = window.editor?.canvas;
        if (!canvas) {
            console.error('Fabric canvas not available');
            setStatus('error');
            return;
        }
        try {
            // Key is now handled securely on the backend

            const systemPrompt = `You are a graphics component generator for a React Fabric.js canvas.
The user wants to generate graphics based on their natural language prompt.
Instead of returning raw Fabric JSON, you must return a JSON array of commands that map to local utility functions.

Available functions:
- createRect
- createCircle
- createTriangle
- createTextBox (takes "text" parameter)

For modification, use "modify" action and specify "type" (rect, circle, triangle, textbox, i-text, text) or omit to modify the active object.
For deletion, use "delete" action and specify "type", or omit for active object.

Format strictly as a JSON array of objects:
[
  { 
    "action": "createRect", 
    "options": { "fill": "gradient", "left": 100, "top": 100, "width": 1920, "height": 1080 } 
  },
  { 
    "action": "createTextBox", 
    "text": "Welcome to Football Participants", 
    "options": { "fill": "gradient2", "left": 960, "top": 540, "fontSize": 80 } 
  }
]

Note: You can use "gradient" for a rainbow gradient fill, or "gradient2" for a random gradient fill.
Do not include markdown blocks or any other text. Output ONLY valid JSON array.`;

            const resp = await fetch(`https://${window.location.hostname}:9000/api/ai/component`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'openai/gpt-4o-mini',
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: prompt }
                    ]
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

            const getTargetObjects = (typeStr) => {
                if (!typeStr) {
                    const active = canvas.getActiveObject();
                    return active ? [active] : [];
                }
                const active = canvas.getActiveObject();
                if (active && active.type === typeStr) return [active];
                return canvas.getObjects().filter(o => o.type === typeStr);
            };

            const applyOptions = (obj, options = {}) => {
                if (options.fill) {
                    if (options.fill === 'gradient') obj.set('fill', gradient);
                    else if (options.fill === 'gradient2') obj.set('fill', gradient2());
                    else obj.set('fill', options.fill);
                }
                if (options.left !== undefined && options.left !== null) obj.set('left', options.left);
                if (options.top !== undefined && options.top !== null) obj.set('top', options.top);
                if (options.width !== undefined && options.width !== null) obj.set('width', options.width);
                if (options.height !== undefined && options.height !== null) obj.set('height', options.height);
                if (options.radius !== undefined && options.radius !== null) obj.set('radius', options.radius);
                if (options.fontSize !== undefined && options.fontSize !== null) {
                    if (obj.type === 'textbox' || obj.type === 'i-text' || obj.type === 'text') {
                        obj.set('fontSize', options.fontSize);
                    } else if (obj.type === 'circle') {
                        obj.set('radius', options.fontSize);
                    } else {
                        obj.set({ width: options.fontSize, height: options.fontSize });
                    }
                }
                obj.setCoords();
            };

            commands.forEach(cmd => {
                if (cmd.action === 'createRect') {
                    createRect(canvas);
                    const obj = canvas.getActiveObject();
                    if (obj) applyOptions(obj, cmd.options);
                } else if (cmd.action === 'createCircle') {
                    createCircle(canvas);
                    const obj = canvas.getActiveObject();
                    if (obj) applyOptions(obj, cmd.options);
                } else if (cmd.action === 'createTriangle') {
                    createTriangle(canvas);
                    const obj = canvas.getActiveObject();
                    if (obj) applyOptions(obj, cmd.options);
                } else if (cmd.action === 'createTextBox') {
                    createTextBox(canvas, cmd.text || 'Text');
                    const obj = canvas.getActiveObject();
                    if (obj) applyOptions(obj, cmd.options);
                } else if (cmd.action === 'modify') {
                    getTargetObjects(cmd.type).forEach(obj => applyOptions(obj, cmd.options));
                } else if (cmd.action === 'delete') {
                    getTargetObjects(cmd.type).forEach(obj => canvas.remove(obj));
                }
            });

            canvas.requestRenderAll();
            setStatus('done');
        } catch (e) {
            console.error('AI generation failed', e);
            setErrorMessage(e.message || String(e));
            setResponseMessage("Failed before completing.");
            setStatus('error');
        }
    };

    return (
        <div className="aiPanel" style={{ padding: '12px', background: 'rgba(20,20,20,0.9)', borderRadius: '8px', color: '#fff' }}>
            <h3 style={{ margin: '0 0 8px 0' }}>AI Component Generator</h3>
            <textarea
                rows={3}
                style={{ width: '100%', resize: 'vertical', marginBottom: '8px', borderRadius: '4px', padding: '6px' }}
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
            <div style={{ display: 'flex', gap: '8px' }}>
                <button
                    onClick={handleGenerate}
                    disabled={status === 'generating'}
                    style={{ flex: 1, padding: '6px 12px', background: '#0066ff', color: '#fff', border: 'none', borderRadius: '4px', cursor: status === 'generating' ? 'wait' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
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
                    onClick={() => setPrompt('')}
                    title="Clear Prompt"
                    style={{ padding: '6px 12px', background: '#444', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <FiX size={16} />
                </button>
            </div>
            {errorMessage && (
                <div style={{ marginTop: '8px', color: '#ff4444', fontSize: '12px', background: '#330000', padding: '8px', borderRadius: '4px', wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
                    {errorMessage}
                </div>
            )}
            {responseMessage && (
                <div style={{ marginTop: '8px', color: '#00cc66', fontSize: '10px', background: '#002200', padding: '8px', borderRadius: '4px', wordBreak: 'break-word', whiteSpace: 'pre-wrap', maxHeight: '150px', overflowY: 'auto' }}>
                    {responseMessage}
                </div>
            )}
        </div>
    );
};

export default AIPannel;
