import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { endpoint, templateLayers, executeScript, stopGraphics, clieentPublicFolder } from '../common';
import { FaPlay, FaStop, FaRandom } from "react-icons/fa";

const GenerativeArts = () => {
    const layerNumber = templateLayers.GenerativeArts;
    const currentscreenSize = useSelector(state => state.currentscreenSizeReducer.currentscreenSize);

    const [sides, setSides] = useState(6);
    const [maxLevel, setMaxLevel] = useState(5);
    const [scale, setScale] = useState(0.8);
    const [spread, setSpread] = useState(0.4);
    const [lineWidth, setLineWidth] = useState(6);
    const [colorMode, setColorMode] = useState('radial');
    const [color, setColor] = useState('#00ffcc');
    const [color2, setColor2] = useState('#ff007f');
    const [hueShift, setHueShift] = useState(0);
    const [shadowBlur, setShadowBlur] = useState(10);
    const [numberOfParticles, setNumberOfParticles] = useState(10);
    const [speed, setSpeed] = useState(1.5);
    const [autoUpdate, setAutoUpdate] = useState(false);

    const randomize = () => {
        setSides(Math.floor(Math.random() * 6 + 3));
        setMaxLevel(Math.floor(Math.random() * 3 + 3));
        setScale(parseFloat((Math.random() * 0.4 + 0.5).toFixed(2)));
        setSpread(parseFloat((Math.random() * 0.6 + 0.2).toFixed(2)));
        setLineWidth(Math.floor(Math.random() * 10 + 2));
        const modes = ['radial', 'depth', 'dual', 'single'];
        setColorMode(modes[Math.floor(Math.random() * modes.length)]);
        setHueShift(Math.floor(Math.random() * 360));
        setColor(`hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`);
        setColor2(`hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`);
        setNumberOfParticles(Math.floor(Math.random() * 20 + 5));
        setSpeed(parseFloat((Math.random() * 3 + 0.5).toFixed(1)));
    };

    const getParams = () => ({
        sides, maxLevel, scale, spread, lineWidth, colorMode, color, color2, hueShift, shadowBlur, numberOfParticles, speed
    });

    const buildScript = (layer, params) => {
        return `
        document.getElementById('divid_' + '${layer}')?.remove();
        window.gaAnimationRunning = false;

        const gadiv = document.createElement('div');
        gadiv.style.position = 'absolute';
        gadiv.style.top = '0';
        gadiv.style.left = '0';
        gadiv.style.width = '1920px';
        gadiv.style.height = '1080px';
        gadiv.style.zoom = (${currentscreenSize * 100} / 1920) + '%';
        gadiv.setAttribute('id', 'divid_' + '${layer}');
        gadiv.style.zIndex = ${-layer};
        document.body.appendChild(gadiv);
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.body.style.overflow = 'hidden';

        function createCanvas(canvasId) {
            const canvas = document.createElement('canvas');
            canvas.id = canvasId;
            gadiv.appendChild(canvas);
        }
        createCanvas('canvas2');
        createCanvas('canvas1');

        const style = document.createElement('style');
        style.innerHTML = '#canvas2 { position: absolute; top: 0; left: 0; width: 1920px; height: 1080px; } #canvas1 { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }';
        document.head.appendChild(style);

        const canvas1 = document.getElementById('canvas1');
        const ctx1 = canvas1.getContext('2d');
        canvas1.width = 900;
        canvas1.height = 900;

        const canvas2 = document.getElementById('canvas2');
        const ctx2 = canvas2.getContext('2d');
        canvas2.width = 1920;
        canvas2.height = 1080;

        class Fractal {
            constructor(w, h, p) {
                this.w = w;
                this.h = h;
                this.size = Math.min(w, h) * 0.3;
                this.setParams(p);
            }
            setParams(p) {
                this.maxLevel = p.maxLevel;
                this.scale = p.scale;
                this.spread = p.spread;
                this.colorMode = p.colorMode || 'single';
                this.color = p.color || '#00ffcc';
                this.color2 = p.color2 || '#ff007f';
                this.hueShift = p.hueShift || 0;
                this.lineWidth = p.lineWidth;
                this.sides = p.sides;
                this.shadowBlur = p.shadowBlur;
            }
            interpolateColor(c1, c2, factor) {
                const parse = (c) => {
                    if (typeof c === 'string' && c.startsWith('#')) {
                        let hex = c.slice(1);
                        if (hex.length === 3) hex = hex.split('').map(x => x + x).join('');
                        return [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16)];
                    }
                    return [0, 255, 204];
                };
                const rgb1 = parse(c1);
                const rgb2 = parse(c2);
                const r = Math.round(rgb1[0] + factor * (rgb2[0] - rgb1[0]));
                const g = Math.round(rgb1[1] + factor * (rgb2[1] - rgb1[1]));
                const b = Math.round(rgb1[2] + factor * (rgb2[2] - rgb1[2]));
                return 'rgb(' + r + ',' + g + ',' + b + ')';
            }
            getBranchColor(level, side) {
                if (this.colorMode === 'radial') {
                    const h = (this.hueShift + (side * 360 / this.sides)) % 360;
                    return 'hsl(' + h + ', 100%, 55%)';
                }
                if (this.colorMode === 'depth') {
                    const h = (this.hueShift + (level * 360 / (this.maxLevel + 1))) % 360;
                    return 'hsl(' + h + ', 100%, 55%)';
                }
                if (this.colorMode === 'dual') {
                    const factor = this.maxLevel > 0 ? (level / this.maxLevel) : 0;
                    return this.interpolateColor(this.color, this.color2, factor);
                }
                return this.color;
            }
            drawBranch(level, side, ctx) {
                if (level > this.maxLevel) return;

                const branchCol = this.getBranchColor(level, side);
                ctx.strokeStyle = branchCol;
                ctx.fillStyle = branchCol;

                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(this.size, 0);
                ctx.stroke();
                
                ctx.save();
                ctx.translate(this.size * 0.1, 0);
                ctx.scale(this.scale, this.scale);
                ctx.save();
                ctx.rotate(this.spread);
                this.drawBranch(level + 1, side, ctx);
                ctx.restore();
                ctx.restore();

                ctx.save();
                ctx.translate(this.size * 0.5, 0);
                ctx.scale(this.scale, this.scale);
                ctx.save();
                ctx.rotate(this.spread * 1.5);
                this.drawBranch(level + 1, side, ctx);
                ctx.restore();
                ctx.restore();

                ctx.save();
                ctx.translate(this.size * 0.6, 0);
                ctx.scale(this.scale * 0.3, this.scale * 0.3);
                ctx.save();
                ctx.rotate(this.spread * 0.5);
                this.drawBranch(level + 1, side, ctx);
                ctx.restore();
                ctx.restore();

                ctx.beginPath();
                ctx.arc(this.size * 1.1, 0, this.size * 0.09, 0, Math.PI * 2);
                ctx.fill();
            }
            draw(ctx) {
                ctx.clearRect(0, 0, this.w, this.h);
                ctx.lineCap = 'round';
                ctx.shadowColor = 'rgba(0,0,0,0.7)';
                ctx.shadowOffsetX = 10;
                ctx.shadowOffsetY = 5;
                ctx.shadowBlur = this.shadowBlur;
                ctx.lineWidth = this.lineWidth;

                ctx.save();
                ctx.translate(this.w / 2, this.h / 2);
                for (let i = 0; i < this.sides; i++) {
                    ctx.save();
                    ctx.rotate((Math.PI * 2) * i / this.sides);
                    this.drawBranch(0, i, ctx);
                    ctx.restore();
                }
                ctx.restore();
            }
        }

        class Particle {
            constructor(cw, ch, img, baseSpeed) {
                this.cw = cw;
                this.ch = ch;
                this.img = img;
                this.sizeMod = Math.random() * 0.4 + 0.1;
                this.w = img.width * this.sizeMod;
                this.h = img.height * this.sizeMod;
                this.x = Math.random() * cw;
                this.y = Math.random() * ch;
                this.speed = (Math.random() * 1.2 + 0.8) * baseSpeed;
                this.angle = 0;
                this.va = Math.random() * 0.05 - 0.025;
            }
            update(baseSpeed) {
                this.angle += this.va;
                if (this.y < -this.h) {
                    this.y = this.ch + this.h;
                    this.x = Math.random() * (this.cw - this.w);
                    this.angle = 0;
                } else {
                    this.y -= this.speed * (baseSpeed / 1.5);
                }
            }
            draw(ctx) {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.angle);
                ctx.drawImage(this.img, -this.w / 2, -this.h / 2, this.w, this.h);
                ctx.restore();
            }
        }

        window.gaFractal = new Fractal(canvas1.width, canvas1.height, ${JSON.stringify(params)});
        window.gaFractal.draw(ctx1);

        window.gaParticles = [];
        window.gaFractalImg = new Image();
        window.gaFractalImg.src = canvas1.toDataURL();
        window.gaCurrentSpeed = ${params.speed};
        window.gaCurrentParticles = ${params.numberOfParticles};

        window.updateGenerativeParams = function(newParams) {
            if (!window.gaFractal) return;
            window.gaFractal.setParams(newParams);
            window.gaFractal.draw(ctx1);
            window.gaCurrentSpeed = newParams.speed;
            window.gaCurrentParticles = newParams.numberOfParticles;
            window.gaFractalImg.src = canvas1.toDataURL();
        };

        window.gaFractalImg.onload = function() {
            if (window.gaParticles.length !== window.gaCurrentParticles) {
                window.gaParticles = [];
                for (let i = 0; i < window.gaCurrentParticles; i++) {
                    window.gaParticles.push(new Particle(canvas2.width, canvas2.height, window.gaFractalImg, window.gaCurrentSpeed));
                }
            } else {
                window.gaParticles.forEach(p => { p.img = window.gaFractalImg; });
            }

            if (!window.gaAnimationRunning) {
                window.gaAnimationRunning = true;
                function animate() {
                    if (!window.gaAnimationRunning) return;
                    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
                    if (window.gaParticles) {
                        if (window.gaParticles.length !== window.gaCurrentParticles) {
                            window.gaParticles = [];
                            for (let i = 0; i < window.gaCurrentParticles; i++) {
                                window.gaParticles.push(new Particle(canvas2.width, canvas2.height, window.gaFractalImg, window.gaCurrentSpeed));
                            }
                        }
                        window.gaParticles.forEach(p => {
                            p.draw(ctx2);
                            p.update(window.gaCurrentSpeed);
                        });
                    }
                    requestAnimationFrame(animate);
                }
                animate();
            }
        };
        `;
    };

    const sendcode = (layer = layerNumber) => {
        const params = getParams();
        const script = buildScript(layer, params);
        executeScript(script);

        endpoint(`play ${window.chNumber}-${layer} [HTML] ${clieentPublicFolder()}/xyz.html`);

        setTimeout(() => {
            endpoint(`play ${window.chNumber}-${layer} [HTML] ${clieentPublicFolder()}/xyz.html`);
        }, 250);

        setTimeout(() => {
            endpoint(`call ${window.chNumber}-${layer} "
                ${script.replaceAll('"', '\\"').replaceAll("`", "\\`").replaceAll("$", "\\$")}
            "`);
        }, 300);
    };

    const updateLive = () => {
        const params = getParams();
        const updateCall = `if(window.updateGenerativeParams){window.updateGenerativeParams(${JSON.stringify(params)});}else{${buildScript(layerNumber, params)}}`;

        executeScript(updateCall);

        endpoint(`call ${window.chNumber}-${layerNumber} "if(window.updateGenerativeParams){window.updateGenerativeParams(${JSON.stringify(params).replaceAll('"', '\\"')});}"`);
    };

    useEffect(() => {
        if (autoUpdate) {
            updateLive();
        }
        // eslint-disable-next-line
    }, [sides, maxLevel, scale, spread, lineWidth, colorMode, color, color2, hueShift, shadowBlur, numberOfParticles, speed]);

    return (
        <div style={{ padding: 15, fontFamily: 'sans-serif', maxWidth: 650 }}>
            <h3 style={{ margin: '0 0 15px 0' }}>Generative Arts Playout & Live Controller</h3>

            <div style={{ display: 'flex', gap: 10, marginBottom: 15, alignItems: 'center' }}>
                <button
                    style={{ padding: '8px 16px', background: '#28a745', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
                    onClick={() => sendcode(layerNumber)}
                >
                    <FaPlay /> Play / Send
                </button>
                <button
                    style={{ padding: '8px 16px', background: '#007bff', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}
                    onClick={updateLive}
                >
                    Update Live
                </button>
                <button
                    style={{ padding: '8px 16px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
                    onClick={() => stopGraphics(layerNumber)}
                >
                    <FaStop /> Stop
                </button>
                <button
                    style={{ padding: '8px 16px', background: '#6c757d', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
                    onClick={randomize}
                >
                    <FaRandom /> Randomize
                </button>
                <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', marginLeft: 10 }}>
                    <input type="checkbox" checked={autoUpdate} onChange={e => setAutoUpdate(e.target.checked)} />
                    Auto Update
                </label>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <tbody>
                    <tr style={{ borderBottom: '1px solid #ddd', height: 38 }}>
                        <td style={{ width: 170, fontWeight: 600 }}>Color Mode</td>
                        <td colSpan="2">
                            <select
                                value={colorMode}
                                onChange={e => setColorMode(e.target.value)}
                                style={{ padding: '4px 8px', fontSize: 14, borderRadius: 4 }}
                            >
                                <option value="radial">🌈 Radial Rainbow (by Petal)</option>
                                <option value="depth">🌈 Depth Rainbow (by Level)</option>
                                <option value="dual">🎨 2-Color Blend / Gradient</option>
                                <option value="single">🎯 Single Color</option>
                            </select>
                        </td>
                    </tr>

                    {(colorMode === 'radial' || colorMode === 'depth') && (
                        <tr style={{ borderBottom: '1px solid #ddd', height: 38 }}>
                            <td style={{ fontWeight: 600 }}>Rainbow Hue Shift ({hueShift}°)</td>
                            <td>
                                <input
                                    type="range"
                                    min="0"
                                    max="360"
                                    step="1"
                                    value={hueShift}
                                    onChange={e => setHueShift(parseInt(e.target.value))}
                                    style={{ width: '80%' }}
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    min="0"
                                    max="360"
                                    value={hueShift}
                                    onChange={e => setHueShift(parseInt(e.target.value) || 0)}
                                    style={{ width: 50 }}
                                />
                            </td>
                        </tr>
                    )}

                    {(colorMode === 'single' || colorMode === 'dual') && (
                        <tr style={{ borderBottom: '1px solid #ddd', height: 38 }}>
                            <td style={{ fontWeight: 600 }}>{colorMode === 'dual' ? 'Color 1 (Root)' : 'Color'}</td>
                            <td colSpan="2">
                                <input
                                    type="color"
                                    value={color.startsWith('#') ? color : '#00ffcc'}
                                    onChange={e => setColor(e.target.value)}
                                    style={{ marginRight: 10, verticalAlign: 'middle', cursor: 'pointer' }}
                                />
                                <span style={{ fontSize: 13, color: '#555' }}>{color}</span>
                            </td>
                        </tr>
                    )}

                    {colorMode === 'dual' && (
                        <tr style={{ borderBottom: '1px solid #ddd', height: 38 }}>
                            <td style={{ fontWeight: 600 }}>Color 2 (Tips)</td>
                            <td colSpan="2">
                                <input
                                    type="color"
                                    value={color2.startsWith('#') ? color2 : '#ff007f'}
                                    onChange={e => setColor2(e.target.value)}
                                    style={{ marginRight: 10, verticalAlign: 'middle', cursor: 'pointer' }}
                                />
                                <span style={{ fontSize: 13, color: '#555' }}>{color2}</span>
                            </td>
                        </tr>
                    )}

                    <tr style={{ borderBottom: '1px solid #ddd', height: 38 }}>
                        <td style={{ fontWeight: 600 }}>Symmetry Sides ({sides})</td>
                        <td>
                            <input
                                type="range"
                                min="2"
                                max="16"
                                step="1"
                                value={sides}
                                onChange={e => setSides(parseInt(e.target.value))}
                                style={{ width: '80%' }}
                            />
                        </td>
                        <td style={{ width: 60 }}>
                            <input
                                type="number"
                                min="2"
                                max="16"
                                value={sides}
                                onChange={e => setSides(parseInt(e.target.value) || 2)}
                                style={{ width: 50 }}
                            />
                        </td>
                    </tr>

                    <tr style={{ borderBottom: '1px solid #ddd', height: 38 }}>
                        <td style={{ fontWeight: 600 }}>Fractal Depth / Max Level ({maxLevel})</td>
                        <td>
                            <input
                                type="range"
                                min="1"
                                max="6"
                                step="1"
                                value={maxLevel}
                                onChange={e => setMaxLevel(parseInt(e.target.value))}
                                style={{ width: '80%' }}
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                min="1"
                                max="6"
                                value={maxLevel}
                                onChange={e => setMaxLevel(parseInt(e.target.value) || 1)}
                                style={{ width: 50 }}
                            />
                        </td>
                    </tr>

                    <tr style={{ borderBottom: '1px solid #ddd', height: 38 }}>
                        <td style={{ fontWeight: 600 }}>Branch Spread ({spread})</td>
                        <td>
                            <input
                                type="range"
                                min="0.1"
                                max="1.5"
                                step="0.02"
                                value={spread}
                                onChange={e => setSpread(parseFloat(e.target.value))}
                                style={{ width: '80%' }}
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                min="0.1"
                                max="1.5"
                                step="0.05"
                                value={spread}
                                onChange={e => setSpread(parseFloat(e.target.value) || 0.1)}
                                style={{ width: 50 }}
                            />
                        </td>
                    </tr>

                    <tr style={{ borderBottom: '1px solid #ddd', height: 38 }}>
                        <td style={{ fontWeight: 600 }}>Scale ({scale})</td>
                        <td>
                            <input
                                type="range"
                                min="0.3"
                                max="0.95"
                                step="0.02"
                                value={scale}
                                onChange={e => setScale(parseFloat(e.target.value))}
                                style={{ width: '80%' }}
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                min="0.3"
                                max="0.95"
                                step="0.05"
                                value={scale}
                                onChange={e => setScale(parseFloat(e.target.value) || 0.3)}
                                style={{ width: 50 }}
                            />
                        </td>
                    </tr>

                    <tr style={{ borderBottom: '1px solid #ddd', height: 38 }}>
                        <td style={{ fontWeight: 600 }}>Line Width ({lineWidth}px)</td>
                        <td>
                            <input
                                type="range"
                                min="1"
                                max="20"
                                step="1"
                                value={lineWidth}
                                onChange={e => setLineWidth(parseInt(e.target.value))}
                                style={{ width: '80%' }}
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                min="1"
                                max="20"
                                value={lineWidth}
                                onChange={e => setLineWidth(parseInt(e.target.value) || 1)}
                                style={{ width: 50 }}
                            />
                        </td>
                    </tr>

                    <tr style={{ borderBottom: '1px solid #ddd', height: 38 }}>
                        <td style={{ fontWeight: 600 }}>Shadow Blur ({shadowBlur}px)</td>
                        <td>
                            <input
                                type="range"
                                min="0"
                                max="30"
                                step="1"
                                value={shadowBlur}
                                onChange={e => setShadowBlur(parseInt(e.target.value))}
                                style={{ width: '80%' }}
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                min="0"
                                max="30"
                                value={shadowBlur}
                                onChange={e => setShadowBlur(parseInt(e.target.value) || 0)}
                                style={{ width: 50 }}
                            />
                        </td>
                    </tr>

                    <tr style={{ borderBottom: '1px solid #ddd', height: 38 }}>
                        <td style={{ fontWeight: 600 }}>Particle Count ({numberOfParticles})</td>
                        <td>
                            <input
                                type="range"
                                min="1"
                                max="50"
                                step="1"
                                value={numberOfParticles}
                                onChange={e => setNumberOfParticles(parseInt(e.target.value))}
                                style={{ width: '80%' }}
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                min="1"
                                max="50"
                                value={numberOfParticles}
                                onChange={e => setNumberOfParticles(parseInt(e.target.value) || 1)}
                                style={{ width: 50 }}
                            />
                        </td>
                    </tr>

                    <tr style={{ borderBottom: '1px solid #ddd', height: 38 }}>
                        <td style={{ fontWeight: 600 }}>Float Speed ({speed})</td>
                        <td>
                            <input
                                type="range"
                                min="0.2"
                                max="8"
                                step="0.1"
                                value={speed}
                                onChange={e => setSpeed(parseFloat(e.target.value))}
                                style={{ width: '80%' }}
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                min="0.2"
                                max="8"
                                step="0.2"
                                value={speed}
                                onChange={e => setSpeed(parseFloat(e.target.value) || 0.2)}
                                style={{ width: 50 }}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default GenerativeArts;



