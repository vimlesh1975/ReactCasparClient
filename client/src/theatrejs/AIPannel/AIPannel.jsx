import React, { useState } from 'react';
import { FiSend, FiMic, FiX, FiTrash2 } from 'react-icons/fi';
import { createRect, createCircle, createTriangle, createTextBox, gradient, gradient2, resizeTextWidth, setPrimitivePropAsSequenced } from '../../common';
import { presetPrompts } from './presetPrompts';



const AIPannel = ({ generateTheatreID }) => {
    // Default prompt now creates a blue circle with optional text
    const [prompt, setPrompt] = useState('blue reactangle with the text "Vimlesh Kumar"');
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

            const systemPrompt = `You are an expert TV broadcast graphics component generator for a React Fabric.js canvas (Resolution: 1920x1080).
The user wants to generate graphics based on their natural language prompt.
Instead of returning raw Fabric JSON, you must return a JSON array of commands that map to local utility functions.

Available functions:
- createRect
- createCircle
- createTriangle
- createTextBox (takes "text" parameter)
- animate (Creates Theatre.js keyframe animations for an object by ID. Specify properties like left, top, scaleX, scaleY, opacity, etc.)

For modification, use "modify" action and specify "type" (rect, circle, triangle, textbox, i-text, text) or omit to modify the active object.
For deletion, use "delete" action and specify "type", or omit for active object.

Standard Game Graphics Guidelines:
1. Lower Third: Usually placed bottom-left (e.g. left: 100, top: 850). Needs a wide background rect for the main name, a smaller rect below or beside for the title, and high-contrast text.
2. Football Score Bug: Usually placed top-left (e.g., left: 100, top: 80). Needs a dark background rect for the clock, two colored rects for team abbreviations (e.g. "MUN", "CHE"), and small rects for scores. Use high-contrast text.
3. Cricket Score Bug: Usually placed bottom-center (e.g., left: 960, top: 950, centered). Needs a wide background bar. Include text for the batting team score (e.g., "IND 152/3"), overs ("OVERS 15.2"), and current batsmen.
4. Cricket Lineup: Usually placed on the left or center. First, create a large background rect. Then create the title ("PLAYING XI") and 11 text boxes vertically. DO NOT set arbitrary large 'width' values on text boxes. Left-align all text (including the header) using 'originX': 'left' and consistent 'left' coordinates. At the very end of your JSON array, you MUST add the command {"action": "autoFitAll", "padding": 40} to resize the background rect perfectly!
5. Swimming Graphics: Center or left-aligned leaderboard. Create a title background and multiple narrow horizontal rects representing lanes, with text boxes for lane number, swimmer name, and time. Use {"action": "autoFitAll", "padding": 30} at the end if you want the main background to fit the list.
6. Tennis Score Bug: Bottom-left or bottom-right. Create a compact grid-like background with rects. Include text for player names, sets won, and current game points (e.g. "15", "30", "40").
7. Volleyball Scoreboard: Usually top-center. Create rects for team names, current set score (large font), and sets won (small font below or beside).
8. TV Breaking News Ticker: A very wide, thin rect at the absolute bottom (e.g., top: 1000, width: 1920) with scrolling or static text. Use bright reds or yellows.
9. TV Live Bug: Top-right corner (e.g., left: 1700, top: 80). A small red rect with white text 'LIVE', often paired with another rect for the location.
10. Split-Screen Interview Layout: Two or more large, transparent rectangles with thick borders (stroke) to frame camera feeds, plus nameplates below each frame.

Format strictly as a JSON array of objects:
[
  { 
    "action": "createRect", 
    "options": { "fill": "gradient", "left": 100, "top": 100, "width": 1920, "height": 1080 } 
  },
  { 
    "action": "createTextBox", 
    "text": "Welcome to Football Participants", 
    "options": { "id": "main_text", "fill": "white", "left": 960, "top": 540, "fontSize": 80 } 
  },
  {
    "action": "animate",
    "id": "main_text",
    "keyframes": {
      "left": [{ "time": 0, "value": 500 }, { "time": 0.5, "value": 960 }, { "time": 6, "value": 960 }, { "time": 6.5, "value": 1500 }],
      "opacity": [{ "time": 0, "value": 0 }, { "time": 0.5, "value": 1 }, { "time": 6, "value": 1 }, { "time": 6.5, "value": 0 }]
    }
  }
]

Note: You can use "gradient" for a rainbow gradient fill, "gradient2" for a random gradient fill, or standard hex colors/names for fill.
IMPORTANT: BE EXTREMELY CREATIVE AND PREMIUM! Use multi-layered shapes, accent lines, varying opacities, rounded corners (rx, ry), rotations (angle), and distinct font weights/styles to construct visually stunning, professional broadcast graphics. Avoid flat, boring rectangles. Combine multiple overlapping shapes to create depth. For colors, mostly prefer dark themes (e.g., dark grays, blacks, deep blues, dark gradients) with bright, high-contrast text. When generating text content, always use realistic, authentic names for players, teams, and cities (e.g., "Marcus Johnson", "Manchester", "Eagles") rather than generic placeholders (like "Player 1", "Team A", or "City 1").
CRITICAL LAYOUT RULE: You MUST carefully calculate 'left' and 'top' coordinates so text falls securely INSIDE its background plate. TIP: For perfect alignment inside a rect, set the text's 'originX': 'center' and 'originY': 'center', and set its 'left' and 'top' to the exact center coordinates of the rect (e.g. rect.left + rect.width/2).
BROADCAST ANIMATION RULE: You MUST animate EVERY SINGLE GRAPHIC ELEMENT you create! Do not leave any element static. Even if the user doesn't ask for it, you must add an 'animate' action for every single object ID. Assume a 25fps timeline. Animate the intro VERY FAST from 0 to 0.5 seconds (0-12 frames). The graphic should hold in place until 6 seconds. The outro should animate out VERY FAST from 6 seconds to 6.5 seconds. Always set an ID in 'options' for objects. For the animation style, ALWAYS make elements slide in from the left (e.g. animate 'left' property from a negative value to its final position) and slide out to the right (e.g. animate 'left' from its final position to a large positive value off-screen). Combine this sliding motion with opacity fades (0 to 1, then 1 to 0).
Do not include markdown blocks or any other text. Output ONLY valid JSON array.`;

            const isOnline = window.location.origin.includes('github.io');
            const apiUrl = isOnline
                ? 'https://octopus-app-gzws3.ondigitalocean.app/api/ai/component'
                : `https://${window.location.hostname}:9000/api/ai/component`;

            const resp = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'openai/gpt-4o-mini',
                    temperature: 1.2,
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

            const colorToHex = (color) => {
                if (!color || color === 'gradient' || color === 'gradient2') return color;
                const ctx = document.createElement('canvas').getContext('2d');
                ctx.fillStyle = color;
                return ctx.fillStyle; // Natively converts any valid CSS color name or short-hex into standard #RRGGBB hex
            };

            const applyOptions = (obj, options = {}) => {
                if (options.fill) {
                    if (options.fill === 'gradient') obj.set('fill', gradient);
                    else if (options.fill === 'gradient2') obj.set('fill', gradient2());
                    else obj.set('fill', colorToHex(options.fill));
                }
                if (options.left !== undefined && options.left !== null) obj.set('left', options.left);
                if (options.top !== undefined && options.top !== null) obj.set('top', options.top);
                if (options.width !== undefined && options.width !== null) obj.set('width', options.width);
                if (options.height !== undefined && options.height !== null) obj.set('height', options.height);
                if (options.radius !== undefined && options.radius !== null) obj.set('radius', options.radius);
                if (options.opacity !== undefined && options.opacity !== null) obj.set('opacity', options.opacity);
                if (options.stroke !== undefined && options.stroke !== null) obj.set('stroke', colorToHex(options.stroke));
                if (options.strokeWidth !== undefined && options.strokeWidth !== null) obj.set('strokeWidth', options.strokeWidth);
                if (options.angle !== undefined && options.angle !== null) obj.set('angle', options.angle);
                if (options.rx !== undefined && options.rx !== null) obj.set('rx', options.rx);
                if (options.ry !== undefined && options.ry !== null) obj.set('ry', options.ry);
                if (options.originX !== undefined && options.originX !== null) obj.set('originX', options.originX);
                if (options.originY !== undefined && options.originY !== null) obj.set('originY', options.originY);

                // Sanitize ID and class names (replace spaces with _ and remove special characters)
                const sanitizeString = (str) => String(str).replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');

                if (options.id !== undefined && options.id !== null) { 
                    obj.set('id', sanitizeString(options.id)); 
                    obj.set('id_', sanitizeString(options.id)); 
                }
                if (options.id_ !== undefined && options.id_ !== null) obj.set('id_', sanitizeString(options.id_));
                if (options.className !== undefined && options.className !== null) obj.set('className', sanitizeString(options.className));
                if (options.class !== undefined && options.class !== null) obj.set('className', sanitizeString(options.class));

                // Fallback: forcefully sanitize the object's existing id, class, id_ and className if they were derived from text with spaces/special characters
                if (obj.id) obj.set('id', sanitizeString(obj.id));
                if (obj.class) obj.set('class', sanitizeString(obj.class));
                if (obj.id_) obj.set('id_', sanitizeString(obj.id_));
                if (obj.className) obj.set('className', sanitizeString(obj.className));

                // Text specific options
                if (options.fontFamily !== undefined && options.fontFamily !== null) obj.set('fontFamily', options.fontFamily);
                if (options.fontWeight !== undefined && options.fontWeight !== null) obj.set('fontWeight', options.fontWeight);
                if (options.fontStyle !== undefined && options.fontStyle !== null) obj.set('fontStyle', options.fontStyle);
                if (options.textAlign !== undefined && options.textAlign !== null) obj.set('textAlign', options.textAlign);

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
                    if (obj) { applyOptions(obj, cmd.options); if (generateTheatreID && obj.id) generateTheatreID(obj.id); }
                } else if (cmd.action === 'createCircle') {
                    createCircle(canvas);
                    const obj = canvas.getActiveObject();
                    if (obj) { applyOptions(obj, cmd.options); if (generateTheatreID && obj.id) generateTheatreID(obj.id); }
                } else if (cmd.action === 'createTriangle') {
                    createTriangle(canvas);
                    const obj = canvas.getActiveObject();
                    if (obj) { applyOptions(obj, cmd.options); if (generateTheatreID && obj.id) generateTheatreID(obj.id); }
                } else if (cmd.action === 'createTextBox') {
                    createTextBox(canvas, cmd.text || 'Text');
                    const obj = canvas.getActiveObject();
                    if (obj) { applyOptions(obj, cmd.options); if (generateTheatreID && obj.id) generateTheatreID(obj.id); }
                } else if (cmd.action === 'modify') {
                    getTargetObjects(cmd.type).forEach(obj => applyOptions(obj, cmd.options));
                } else if (cmd.action === 'delete') {
                    getTargetObjects(cmd.type).forEach(obj => canvas.remove(obj));
                } else if (cmd.action === 'autoFitAll') {
                    const objects = canvas.getObjects();
                    let maxArea = 0;
                    let bgRect = null;
                    objects.filter(o => o.type === 'rect').forEach(r => {
                        const area = r.width * r.height;
                        if (area > maxArea) { maxArea = area; bgRect = r; }
                    });

                    if (bgRect) {
                        const textObjects = objects.filter(o => o.type === 'textbox' || o.type === 'i-text' || o.type === 'text');

                        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
                        textObjects.forEach(o => {
                            const br = o.getBoundingRect();
                            if (br.left < minX) minX = br.left;
                            if (br.top < minY) minY = br.top;
                            if (br.left + br.width > maxX) maxX = br.left + br.width;
                            if (br.top + br.height > maxY) maxY = br.top + br.height;
                        });
                        const padding = cmd.padding || 30;
                        if (minX !== Infinity) {
                            bgRect.set({
                                left: minX - padding,
                                top: minY - padding,
                                width: (maxX - minX) + (padding * 2),
                                height: (maxY - minY) + (padding * 2)
                            });
                            bgRect.setCoords();
                        }
                    }
                } else if (cmd.action === 'animate') {
                    const { id, keyframes } = cmd;
                    if (id && keyframes) {
                        const sanitizedId = String(id).replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
                        setTimeout(() => {
                            if (!window.arrObject || !window.studio || !window.sheet) return;
                            const theatreObj = window.arrObject.find(o => o.address.objectKey === sanitizedId);
                            if (theatreObj) {
                                Object.keys(keyframes).forEach(prop => {
                                    if (theatreObj.props[prop] !== undefined) {
                                        setPrimitivePropAsSequenced(theatreObj, theatreObj.props[prop]);
                                        keyframes[prop].forEach(kf => {
                                            window.sheet.sequence.position = kf.time;
                                            window.studio.transaction(({ set }) => {
                                                set(theatreObj.props[prop], kf.value);
                                            });
                                        });
                                    }
                                });
                                window.sheet.sequence.position = 0;
                            }
                        }, 250);
                    }
                }
            });

            const allTextObjects = canvas.getObjects().filter(o => o.type === 'textbox' || o.type === 'i-text' || o.type === 'text');
            if (allTextObjects.length > 0) {
                resizeTextWidth(canvas, allTextObjects);
                allTextObjects.forEach(o => o.setCoords());
            }

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
                <button
                    onClick={() => {
                        const canvas = window.editor?.canvas;
                        if (canvas) {
                            const objects = [...canvas.getObjects()];
                            objects.forEach(obj => {
                                // 1. Detach from Theatre sheet
                                if (window.sheet && obj.id) {
                                    window.sheet.detachObject(obj.id);
                                }
                                // 2. Forget object in Theatre studio
                                if (window.studio && window.arrObject && obj.id) {
                                    const theatreObj = window.arrObject.find(o => o.address.objectKey === obj.id);
                                    if (theatreObj) {
                                        window.studio.transaction((api) => {
                                            api.__experimental_forgetObject(theatreObj);
                                        });
                                    }
                                }
                                // 3. Remove from Fabric canvas
                                canvas.remove(obj);
                            });
                            canvas.requestRenderAll();
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
            {responseMessage && (
                <div style={{ marginTop: '8px', color: '#00cc66', fontSize: '10px', background: '#002200', padding: '8px', borderRadius: '4px', wordBreak: 'break-word', whiteSpace: 'pre-wrap', maxHeight: '150px', overflowY: 'auto' }}>
                    {responseMessage}
                </div>
            )}
        </div>
    );
};

export default AIPannel;
