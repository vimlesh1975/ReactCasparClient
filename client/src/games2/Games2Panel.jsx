import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import * as fabric from 'fabric';
import { OLYMPIC_GAMES_DATA, getSportTemplates } from '../GamesAIPanel/gamesData';
import { createFabricGraphicGroup2 } from './TemplateGenerator2';
import { FaPlus } from 'react-icons/fa';
import './Games2Panel.css';

const Games2Panel = ({ generateTheatreID, deleteTheatreID }) => {
  const canvas = useSelector((state) => state.canvasReducer.canvas);

  const [selectedTemplateType, setSelectedTemplateType] = useState(null);
  const [selectedTemplateObj, setSelectedTemplateObj] = useState(null);
  const [selectedVariationIndex, setSelectedVariationIndex] = useState(0);
  const [enlargedImage, setEnlargedImage] = useState(null);
  const [selectedSport, setSelectedSport] = useState(OLYMPIC_GAMES_DATA[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [templateSearchTerm, setTemplateSearchTerm] = useState('');
  const [customFields, setCustomFields] = useState({});
  const [customColors, setCustomColors] = useState({
    primaryColor: OLYMPIC_GAMES_DATA[0].primaryColor,
    secondaryColor: OLYMPIC_GAMES_DATA[0].secondaryColor,
    accentColor: OLYMPIC_GAMES_DATA[0].accentColor
  });

  const sportTemplates = getSportTemplates(selectedSport);
  const filteredTemplates = sportTemplates.filter(t => {
    if (!templateSearchTerm || !templateSearchTerm.trim()) return true;
    const term = templateSearchTerm.toLowerCase().trim();
    return (t.id || '').toLowerCase().includes(term) ||
           (t.name || '').toLowerCase().includes(term) ||
           (t.subCat || '').toLowerCase().includes(term);
  });

  const previewContainerRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const fabricInstanceRef = useRef(null);
  const [previewScale, setPreviewScale] = useState(0.27);

  useEffect(() => {
    const updateScale = () => {
      if (previewContainerRef.current) {
        const containerWidth = previewContainerRef.current.clientWidth;
        if (containerWidth > 50) {
          setPreviewScale(containerWidth / 1920);
        }
      }
    };

    const ro = new ResizeObserver(() => updateScale());
    if (previewContainerRef.current) {
      ro.observe(previewContainerRef.current);
    }

    updateScale();
    const timer = setTimeout(updateScale, 50);

    return () => {
      clearTimeout(timer);
      ro.disconnect();
    };
  }, []);

  // Close enlarged reference image on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) {
        setEnlargedImage(null);
      }
    };
    if (enlargedImage) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [enlargedImage]);

  // Filter sports list
  const filteredSports = OLYMPIC_GAMES_DATA.filter(sport =>
    sport.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sport.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sport.venue.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // When sport changes, update fields, default colors & sport-specific templates
  useEffect(() => {
    if (selectedSport) {
      setCustomFields({
        venue: selectedSport.venue || 'Olympic Stadium',
        location: 'London, UK',
        ...selectedSport.dataFields
      });
      setCustomColors({
        primaryColor: selectedSport.primaryColor,
        secondaryColor: selectedSport.secondaryColor,
        accentColor: selectedSport.accentColor
      });

      setTemplateSearchTerm('');
      const newTemplates = getSportTemplates(selectedSport);
      if (newTemplates && newTemplates.length > 0) {
        setSelectedTemplateType(newTemplates[0].id);
        setSelectedTemplateObj(newTemplates[0]);
        setSelectedVariationIndex(0);
      }
    }
  }, [selectedSport]);

  const variations = selectedTemplateObj?.variations || [];
  const activeVariation = variations[selectedVariationIndex] || variations[0];
  const referenceImagePath = activeVariation?.image || selectedTemplateObj?.images?.[0];

  const effectiveTemplateId = (activeVariation && activeVariation.label && activeVariation.label.length === 1)
    ? `${selectedTemplateType}${activeVariation.label.toLowerCase()}`
    : selectedTemplateType;

  // Fabric Canvas Preview Renderer
  useEffect(() => {
    let isMounted = true;
    if (fabricCanvasRef.current) {
      if (!fabricInstanceRef.current) {
        fabricInstanceRef.current = new fabric.Canvas(fabricCanvasRef.current, {
          width: 1920,
          height: 1080,
          selection: true
        });
      }
      
      if (selectedSport && selectedTemplateType) {
        const previewCanvas = fabricInstanceRef.current;
        previewCanvas.clear();
        previewCanvas.backgroundColor = 'transparent';

        createFabricGraphicGroup2(
          selectedSport,
          selectedTemplateType,
          customFields,
          customColors,
          effectiveTemplateId,
          selectedTemplateObj?.name || ''
        ).then(group => {
          if (isMounted && group) {
            previewCanvas.clear();
            previewCanvas.add(group);
            previewCanvas.requestRenderAll();
          } else {
            previewCanvas.clear();
            previewCanvas.requestRenderAll();
          }
        });
      }
    }
    return () => { isMounted = false; };
  }, [selectedSport, selectedTemplateType, selectedVariationIndex, customFields, customColors, effectiveTemplateId, filteredTemplates, selectedTemplateObj]);

  const handleAddToCanvas = async () => {
    const activeCanvas = canvas || window.editor?.canvas || window.canvas;
    if (!activeCanvas) {
      alert('Canvas is not initialized yet. Please open the Drawing tab first!');
      return;
    }
    const group = await createFabricGraphicGroup2(
      selectedSport,
      selectedTemplateType,
      customFields,
      customColors,
      effectiveTemplateId,
      selectedTemplateObj?.name || ''
    );

    if (group) {
      activeCanvas.add(group);
      activeCanvas.setActiveObject(group);
      activeCanvas.requestRenderAll();

      if (generateTheatreID) {
        generateTheatreID(group.id, group);
      }
    }
  };

  const getFullImageUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${process.env.PUBLIC_URL || ''}${cleanPath}`;
  };

  return (
    <div className="games-ai-container">

      {/* ── Top Row: Left Sidebar (Sport 50% + Templates 50%) + Reference Image (Right) ── */}
      <div className="top-section-row">

        {/* Left Column: Sport list (top 50%) + Template list (bottom 50%) */}
        <div className="left-sidebar-col">

          {/* Top 50%: Select Sport */}
          <div className="sidebar-panel">
            <div className="section-label">1. Select Sport ({filteredSports.length})</div>
            <input
              type="text"
              className="search-input"
              placeholder="Search sports or venues..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <div className="sports-list">
              {filteredSports.map(sport => (
                <div
                  key={sport.id || sport.code}
                  className={`sport-item ${selectedSport.code === sport.code ? 'active' : ''}`}
                  onClick={() => setSelectedSport(sport)}
                >
                  <span>{sport.name}</span>
                  <span className="sport-code-badge">{sport.code}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom 50%: Select Template */}
          <div className="templates-panel">
            <div className="section-label">2. Select Template ({filteredTemplates.length})</div>
            <input
              type="text"
              className="search-input"
              placeholder="Search templates..."
              value={templateSearchTerm}
              onChange={e => setTemplateSearchTerm(e.target.value)}
            />
            <div className="template-types-grid">
              {filteredTemplates.map(tt => (
                <button
                  key={tt.id}
                  className={`template-type-btn ${selectedTemplateType === tt.id ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedTemplateType(tt.id);
                    setSelectedTemplateObj(tt);
                    setSelectedVariationIndex(0);
                  }}
                  title={tt.name}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    <span>{tt.icon}</span>
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{tt.name}</span>
                  </span>
                  <span className="sport-code-badge">{tt.id}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Reference Guide Image Panel */}
        <div className="reference-guide-panel">
          <div className="reference-header-row">
            <div className="section-label">🖼️ Reference Guide Image</div>
            {variations.length > 1 && (
              <div className="variations-pills">
                <span className="variation-label">Variation:</span>
                {variations.map((v, idx) => (
                  <button
                    key={idx}
                    className={`variation-pill ${selectedVariationIndex === idx ? 'active' : ''}`}
                    onClick={() => setSelectedVariationIndex(idx)}
                  >
                    Variant {v.label.toUpperCase()} {v.page ? `(p.${v.page})` : ''}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="reference-image-wrapper">
            {referenceImagePath ? (
              <img
                src={getFullImageUrl(referenceImagePath)}
                alt={selectedTemplateObj?.title || 'Graphic Reference'}
                className="reference-preview-image"
                style={{ cursor: 'pointer' }}
                title="Double-click to view full size"
                onDoubleClick={() => setEnlargedImage(getFullImageUrl(referenceImagePath))}
                onError={(e) => {
                  console.error('Failed to load image:', e.target.src);
                }}
              />
            ) : (
              <div className="no-reference-msg">No Reference Image Available</div>
            )}
          </div>
        </div>

      </div>

      {/* ── Bottom: Live Fabric Vector Canvas Preview ── */}
      <div className="main-preview-area">

        {/* Preview Frame */}
        <div className="preview-frame-container" ref={previewContainerRef}>
          <button
            className="action-btn btn-add"
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              zIndex: 20,
              boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
              cursor: 'pointer'
            }}
            onClick={handleAddToCanvas}
          >
            <FaPlus /> Add to Canvas
          </button>
          
          <div
            style={{
              width: '1920px',
              height: '1080px',
              transformOrigin: 'top left',
              transform: `scale(${previewScale})`,
              display: 'block',
              pointerEvents: 'auto'
            }}
          >
            <canvas ref={fabricCanvasRef} width={1920} height={1080} />
          </div>
        </div>

      </div>

      {/* ── Enlarged Reference Image Lightbox Modal ── */}
      {enlargedImage && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            boxSizing: 'border-box'
          }}
          onClick={() => setEnlargedImage(null)}
        >
          <div style={{ position: 'relative', width: '98vw', height: '96vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={e => e.stopPropagation()}>
            <button
              style={{
                position: 'absolute',
                top: '10px',
                right: '15px',
                background: '#ef4444',
                color: '#ffffff',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                fontSize: '20px',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.8)',
                zIndex: 100000
              }}
              onClick={() => setEnlargedImage(null)}
              title="Close (Esc)"
            >
              ✕
            </button>
            <img
              src={enlargedImage}
              alt="Enlarged Reference Guide"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 10px 50px rgba(0,0,0,0.95)',
                border: '2px solid #38bdf8'
              }}
            />
          </div>
        </div>
      )}

    </div>
  );
};

export default Games2Panel;
