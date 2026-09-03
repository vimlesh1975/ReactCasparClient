import { useCallback, useState, useEffect } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { endpoint, templateLayers, executeScript, colors } from '../common';
import { useSelector } from 'react-redux';
import * as fabric from 'fabric';
import { FaPlay, FaStop, FaSync, FaUpload, FaMoon, FaSun, FaMagic } from 'react-icons/fa';

const Tsparticles1 = () => {
  const canvas = useSelector(state => state.canvasReducer.canvas);
  const [darkMode, setDarkMode] = useState(true);

  const [opacity, setOpacity] = useState(1);
  const [size, setSize] = useState(20);
  const [number, setNumber] = useState(20);
  const [speed, setSpeed] = useState(6);
  const [polygoneSides, setPolygoneSides] = useState(6);
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [shape, setShape] = useState('polygon');
  const [strokeColor, setStrokeColor] = useState('#ff00ff');
  const [file, setFile] = useState('/ReactCasparClient/img/pine-wood-500x500.jpg');
  const [link, setLink] = useState(false);

  const width = 640;
  const height = 400;

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await container;
  }, []);

  const initialise = (layerNumber) => {
    endpoint(`play 1-${layerNumber} [html] "https://localhost:10000/ReactCasparClient/Tsparticles2"`);
  };

  const options = {
    "particles": {
      "number": {
        "value": parseInt(number, 10) || 20,
        "density": {
          "enable": false,
          "value_area": 400
        }
      },
      "color": {
        value: colors
      },
      "shape": {
        "type": shape,
        "stroke": {
          "width": parseInt(strokeWidth, 10) || 0,
          "color": strokeColor.toString()
        },
        "polygon": {
          "nb_sides": parseInt(polygoneSides, 10) || 5
        },
        "image": {
          "src": file,
          "width": 40,
          "height": 20
        }
      },
      "opacity": {
        "value": parseFloat(opacity) || 1,
        "random": false,
        "anim": {
          "enable": true,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": parseInt(size, 10) || 20,
        "random": true,
        "anim": {
          "enable": true,
          "speed": 1,
          "size_min": 0,
          "sync": true
        }
      },
      "line_linked": {
        "enable": link,
        "distance": 150,
        "opacity": parseFloat(opacity) || 1,
        "width": parseInt(strokeWidth, 10) || 1,
        "color": strokeColor.toString()
      },
      "move": {
        "enable": true,
        "speed": parseInt(speed, 10) || 6,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "bounce",
        "bounce": false,
      }
    },
    "retina_detect": true
  };

  const update = (layerNumber) => {
    const aa = ` tsParticles.load("tsparticles", 
      ${JSON.stringify(options)}
        );`;
    const bb = aa.replaceAll('"', '\\"');
    endpoint(`call 1-${layerNumber} "
        ${bb}
        "`);
    const script = `
        ${aa}
        `;
    executeScript(`
        ${script}
        `);
  };

  const update2 = (layerNumber) => {
    if (!canvas) return;
    canvas.discardActiveObject();
    const sel = new fabric.ActiveSelection(canvas.getObjects(), {
      canvas: canvas,
    });
    canvas.setActiveObject(sel);
    canvas.requestRenderAll();

    const aa = ` tsParticles.load("tsparticles", 
    ${JSON.stringify({
      ...options, fullScreen: {
        enable: false,
        zIndex: 0,
      },
    })}
      );
      var myDiv = document.getElementById('tsparticles');
      myDiv.style.cssText = 'position:absolute;z-index:${-layerNumber}; left: ${sel.getBoundingRect().left - 25}px;top: ${sel.getBoundingRect().top - 25}300px;width: ${sel.getBoundingRect().width + 50}px;height: ${sel.getBoundingRect().height + 50}px;';
      `;
    const bb = aa.replaceAll('"', '\\"');
    endpoint(`call 1-${layerNumber} "
      ${bb}
      "`);
    const script = `
      ${aa}
      `;
    executeScript(`
      ${script}
      `);

    canvas.discardActiveObject();
    canvas.requestRenderAll();
  };

  const stop = (layerNumber) => {
    endpoint(`call 1-${layerNumber} "document.getElementById('tsparticles')?.remove()"`);
    executeScript(`document.getElementById('tsparticles')?.remove()`);
  };

  const setfileforTsparticle = () => {
    var fInput = document.createElement("input");
    fInput.setAttribute("type", "file");
    fInput.setAttribute("accept", "image/*");
    fInput.setAttribute("multiple", false);

    fInput.click();
    fInput.onchange = (e) => {
      if (e.target.files) {
        const reader = new FileReader();
        reader.onload = () => {
          setFile(reader.result);
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    };
  };

  useEffect(() => {
    return () => {
    };
  }, []);

  // Theme Tokens
  const theme = {
    cardBg: darkMode ? '#1e293b' : '#ffffff',
    cardBorder: darkMode ? '#334155' : '#cbd5e1',
    boxBg: darkMode ? '#0f172a' : '#f8fafc',
    boxBorder: darkMode ? '#334155' : '#e2e8f0',
    inputBg: darkMode ? '#1e293b' : '#ffffff',
    inputBorder: darkMode ? '#334155' : '#cbd5e1',
    textColor: darkMode ? '#f8fafc' : '#0f172a',
    subTextColor: darkMode ? '#94a3b8' : '#64748b',
    badgeBg: darkMode ? '#334155' : '#e2e8f0',
    badgeColor: darkMode ? '#94a3b8' : '#475569',
  };

  const cardStyle = {
    backgroundColor: theme.cardBg,
    borderRadius: '8px',
    border: `1px solid ${theme.cardBorder}`,
    padding: '14px',
    color: theme.textColor,
    boxShadow: darkMode ? '0 4px 6px -1px rgba(0, 0, 0, 0.2)' : '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
    boxSizing: 'border-box',
    transition: 'background-color 0.2s ease, border-color 0.2s ease',
  };

  const inputBase = {
    backgroundColor: theme.inputBg,
    border: `1px solid ${theme.inputBorder}`,
    borderRadius: '4px',
    color: theme.textColor,
    padding: '4px 8px',
    fontSize: '12px',
    boxSizing: 'border-box',
    transition: 'all 0.2s ease',
  };

  const btnBase = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    padding: '6px 12px',
    borderRadius: '5px',
    border: 'none',
    fontWeight: '600',
    fontSize: '12px',
    cursor: 'pointer',
    color: '#ffffff',
    transition: 'all 0.15s ease',
    flexShrink: 0,
  };

  return (
    <div style={{ padding: '12px', fontFamily: 'Inter, system-ui, sans-serif', color: theme.textColor, width: '100%', maxHeight: 'calc(100vh - 80px)', overflowY: 'auto', boxSizing: 'border-box' }}>
      
      {/* Top Header Card */}
      <div style={{ ...cardStyle, marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <FaMagic /> tsParticles Generator
          </span>
          <span style={{ fontSize: '11px', backgroundColor: theme.badgeBg, padding: '2px 8px', borderRadius: '10px', color: theme.badgeColor }}>
            Layer: L{templateLayers.Tsparticles1}
          </span>
        </div>

        {/* Action Controls & Dark Mode Toggle */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
          <label
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              cursor: 'pointer',
              padding: '4px 10px',
              borderRadius: '20px',
              backgroundColor: theme.boxBg,
              border: `1px solid ${theme.cardBorder}`,
              color: theme.textColor,
              fontWeight: '500',
              userSelect: 'none',
              marginRight: '6px',
            }}
            title="Toggle Dark / Light Mode"
          >
            <input
              type="checkbox"
              checked={darkMode}
              onChange={e => setDarkMode(e.target.checked)}
              style={{ cursor: 'pointer' }}
            />
            {darkMode ? <FaMoon color="#38bdf8" /> : <FaSun color="#f59e0b" />}
            <span>{darkMode ? 'Dark' : 'Light'}</span>
          </label>

          <button
            style={{ ...btnBase, backgroundColor: '#334155' }}
            onClick={() => initialise(templateLayers.Tsparticles1)}
            title="Initialise background template in CasparCG"
          >
            <FaSync /> Initialise
          </button>
          <button
            style={{ ...btnBase, backgroundColor: '#10b981' }}
            onClick={() => update(templateLayers.Tsparticles1)}
            title="Update fullscreen particle effects"
          >
            <FaPlay /> Update Fullscreen
          </button>
          <button
            style={{ ...btnBase, backgroundColor: '#0284c7' }}
            onClick={() => update2(templateLayers.Tsparticles1)}
            title="Position particles over canvas selection"
          >
            Update Canvas Area
          </button>
          <button
            style={{ ...btnBase, backgroundColor: '#ef4444' }}
            onClick={() => stop(templateLayers.Tsparticles1)}
            title="Stop particle overlay"
          >
            <FaStop /> Stop
          </button>
        </div>
      </div>

      {/* Main Split Grid: Controls on Left, Live Preview on Right */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '12px', alignItems: 'start' }}>
        
        {/* LEFT COLUMN: Particle Configurator */}
        <div style={cardStyle}>
          <div style={{ fontSize: '13px', fontWeight: 'bold', color: theme.textColor, marginBottom: '10px', borderBottom: `1px solid ${theme.boxBorder}`, paddingBottom: '6px' }}>
            Particle Parameters
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            
            {/* Shape */}
            <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11px', color: theme.subTextColor }}>Shape:</span>
              <select
                style={{ ...inputBase, width: '100%', fontWeight: 'bold', color: '#38bdf8' }}
                value={shape}
                onChange={e => setShape(e.target.value)}
              >
                <option value="circle">Circle</option>
                <option value="star">Star</option>
                <option value="polygon">Polygon</option>
                <option value="image">Custom Image</option>
              </select>
            </div>

            {/* Custom Image Upload if Shape is Image */}
            {shape === 'image' && (
              <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr', alignItems: 'center', gap: '8px', backgroundColor: theme.boxBg, padding: '6px', borderRadius: '4px' }}>
                <span style={{ fontSize: '11px', color: theme.subTextColor }}>Image:</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <img
                    src={file}
                    alt="particle"
                    style={{ width: '45px', height: '24px', objectFit: 'contain', border: `1px solid ${theme.cardBorder}`, borderRadius: '4px', backgroundColor: '#0f172a' }}
                  />
                  <button
                    type="button"
                    style={{ ...btnBase, backgroundColor: '#0284c7', padding: '3px 8px', fontSize: '11px' }}
                    onClick={setfileforTsparticle}
                  >
                    <FaUpload /> Upload
                  </button>
                </div>
              </div>
            )}

            {/* Speed */}
            <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr 45px', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11px', color: theme.subTextColor }}>Speed:</span>
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={speed}
                onChange={e => setSpeed(e.target.value)}
                style={{ width: '100%', accentColor: '#38bdf8', cursor: 'pointer' }}
              />
              <span style={{ fontSize: '11px', fontWeight: 'bold', textAlign: 'right' }}>{speed}</span>
            </div>

            {/* Opacity */}
            <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr 45px', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11px', color: theme.subTextColor }}>Opacity:</span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.1}
                value={opacity}
                onChange={e => setOpacity(e.target.value)}
                style={{ width: '100%', accentColor: '#38bdf8', cursor: 'pointer' }}
              />
              <span style={{ fontSize: '11px', fontWeight: 'bold', textAlign: 'right' }}>{opacity}</span>
            </div>

            {/* Size */}
            <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr 45px', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11px', color: theme.subTextColor }}>Size:</span>
              <input
                type="range"
                min={0}
                max={200}
                step={1}
                value={size}
                onChange={e => setSize(e.target.value)}
                style={{ width: '100%', accentColor: '#38bdf8', cursor: 'pointer' }}
              />
              <span style={{ fontSize: '11px', fontWeight: 'bold', textAlign: 'right' }}>{size}</span>
            </div>

            {/* Number of Particles */}
            <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr 45px', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11px', color: theme.subTextColor }}>Count:</span>
              <input
                type="range"
                min={0}
                max={200}
                step={1}
                value={number}
                onChange={e => setNumber(e.target.value)}
                style={{ width: '100%', accentColor: '#38bdf8', cursor: 'pointer' }}
              />
              <span style={{ fontSize: '11px', fontWeight: 'bold', textAlign: 'right' }}>{number}</span>
            </div>

            {/* Polygon Sides */}
            <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr 45px', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11px', color: theme.subTextColor }}>Sides:</span>
              <input
                type="range"
                min={0}
                max={30}
                step={1}
                value={polygoneSides}
                onChange={e => setPolygoneSides(e.target.value)}
                style={{ width: '100%', accentColor: '#38bdf8', cursor: 'pointer' }}
              />
              <span style={{ fontSize: '11px', fontWeight: 'bold', textAlign: 'right' }}>{polygoneSides}</span>
            </div>

            {/* Stroke Width */}
            <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr 45px', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11px', color: theme.subTextColor }}>Stroke:</span>
              <input
                type="range"
                min={0}
                max={200}
                step={1}
                value={strokeWidth}
                onChange={e => setStrokeWidth(e.target.value)}
                style={{ width: '100%', accentColor: '#38bdf8', cursor: 'pointer' }}
              />
              <span style={{ fontSize: '11px', fontWeight: 'bold', textAlign: 'right' }}>{strokeWidth}</span>
            </div>

            {/* Stroke Color & Linked Lines */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', alignItems: 'center', marginTop: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '11px', color: theme.subTextColor }}>Color:</span>
                <input
                  type="color"
                  value={strokeColor}
                  onChange={e => setStrokeColor(e.target.value)}
                  style={{ width: '36px', height: '24px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'transparent' }}
                />
              </div>

              <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', cursor: 'pointer', color: theme.textColor }}>
                <input
                  type="checkbox"
                  checked={link}
                  onChange={() => setLink(val => !val)}
                  style={{ cursor: 'pointer' }}
                />
                <span>Link Particles</span>
              </label>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: Live Interactive Stage Preview */}
        <div style={cardStyle}>
          <div style={{ fontSize: '13px', fontWeight: 'bold', color: theme.textColor, marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Live Effect Preview</span>
            <span style={{ fontSize: '11px', color: theme.subTextColor }}>{width}x{height}</span>
          </div>

          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '380px',
              backgroundColor: darkMode ? '#0f172a' : '#1e293b',
              borderRadius: '6px',
              border: `1px solid ${theme.cardBorder}`,
              overflow: 'hidden',
            }}
          >
            <Particles
              id="tsparticles"
              width={width}
              height={height}
              init={particlesInit}
              loaded={particlesLoaded}
              options={{
                fullScreen: {
                  enable: false,
                },
                ...options,
              }}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Tsparticles1;