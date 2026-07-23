import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { OLYMPIC_GAMES_DATA, getSportTemplates } from './gamesData';
import { generateBroadcastHTML, createFabricGraphicGroup } from './TemplateGenerator';
import { FaPlus } from 'react-icons/fa';
import './GamesAIPanel.css';

const GamesAIPanel = ({ generateTheatreID, deleteTheatreID }) => {
  const canvas = useSelector((state) => state.canvasReducer.canvas);

  const [selectedTemplateType, setSelectedTemplateType] = useState(null);
  const [selectedTemplateObj, setSelectedTemplateObj] = useState(null);

  // Helper to map sub-category to template type keyword understood by generateBroadcastHTML
  const mapSubCatToType = (subCat) => {
    if (!subCat) return '';
    const upper = subCat.toUpperCase();
    if (upper.includes('LOWER')) return 'lower-third';
    if (upper.includes('SPLITS')) return 'split-times';
    if (upper.includes('SCORES')) return 'scoreboard';
    if (upper.includes('RESULTS')) return 'results-table';
    if (upper.includes('RECORDS') || upper.includes('BUG')) return 'event-bug';
    return '';
  };

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

  const iframeRef = useRef(null);
  const previewContainerRef = useRef(null);
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

    // ResizeObserver fires on initial layout AND whenever the element resizes
    const ro = new ResizeObserver(() => updateScale());
    if (previewContainerRef.current) {
      ro.observe(previewContainerRef.current);
    }

    // Fallback immediate call + short delay for first paint
    updateScale();
    const timer = setTimeout(updateScale, 50);

    return () => {
      clearTimeout(timer);
      ro.disconnect();
    };
  }, []);

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
      }
    }
  }, [selectedSport]);

  // Derive the semantic template category from the selected template's subCat
  const resolvedTemplateType = selectedTemplateObj
    ? mapSubCatToType(selectedTemplateObj.subCat)
    : (selectedTemplateType || '');

  // Generate current HTML
  const currentHTML = generateBroadcastHTML(
    selectedSport,
    resolvedTemplateType,
    customFields,
    customColors,
    selectedTemplateType,
    selectedTemplateObj?.name || ''
  );


  const handleAddToCanvas = () => {
    if (!canvas) {
      alert('Canvas is not initialized yet. Please open the Drawing tab first!');
      return;
    }
    const templateInfo = filteredTemplates.find(t => t.id === selectedTemplateType);
    const resolvedType = templateInfo ? mapSubCatToType(templateInfo.subCat) : selectedTemplateType;
    const group = createFabricGraphicGroup(
      selectedSport,
      resolvedType,
      customFields,
      customColors,
      selectedTemplateType,
      templateInfo?.name || ''
    );

    canvas.add(group);
    canvas.setActiveObject(group);
    canvas.requestRenderAll();

    if (generateTheatreID) {
      generateTheatreID(group.id, group);
    }
  };

  return (
    <div className="games-ai-container">

      {/* ── Top Row: Sport list (left) + Template grid (right) ── */}
      <div className="top-section-row">

        {/* Left Column: Select Sport */}
        <div className="sidebar-panel">
          <div className="section-label">1. Select Sport</div>
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
                key={sport.id}
                className={`sport-item ${selectedSport.id === sport.id ? 'active' : ''}`}
                onClick={() => setSelectedSport(sport)}
              >
                <span>{sport.name}</span>
                <span className="sport-code-badge">{sport.code}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Templates */}
        <div className="templates-panel">
          <div className="section-label">2. Select Template</div>
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
                onClick={() => { setSelectedTemplateType(tt.id); setSelectedTemplateObj(tt); }}
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

          {/* Add to Canvas lives here, at the bottom of the template panel */}
          <button className="action-btn btn-add" style={{ width: '100%', justifyContent: 'center', marginTop: 'auto' }} onClick={handleAddToCanvas}>
            <FaPlus /> Add to Canvas
          </button>
        </div>

      </div>

      {/* ── Bottom: Graphics / Preview Area ── */}
      <div className="main-preview-area">

        {/* Live Preview */}
        <div className="preview-frame-container" ref={previewContainerRef}>
          <span className="preview-res-badge">1920 × 1080</span>
          <iframe
            ref={iframeRef}
            className="preview-iframe"
            title="Graphic Preview"
            sandbox="allow-scripts"
            srcDoc={currentHTML}
            style={{
              width: '1920px',
              height: '1080px',
              border: 'none',
              transformOrigin: 'top left',
              transform: `scale(${previewScale})`,
              display: 'block',
              pointerEvents: 'none'
            }}
          />
        </div>



      </div>

    </div>
  );
};

export default GamesAIPanel;
