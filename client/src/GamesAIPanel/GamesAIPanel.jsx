import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { OLYMPIC_GAMES_DATA, TEMPLATE_TYPES } from './gamesData';
import { generateBroadcastHTML, createFabricGraphicGroup } from './TemplateGenerator';
import { FaPlus, FaMagic } from 'react-icons/fa';
import './GamesAIPanel.css';

const GamesAIPanel = () => {
  const canvas = useSelector((state) => state.canvasReducer.canvas);

  const [selectedSport, setSelectedSport] = useState(OLYMPIC_GAMES_DATA[0]);
  const [selectedTemplateType, setSelectedTemplateType] = useState('lower-third');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [aiPrompt, setAiPrompt] = useState('Gold lower third Usain Bolt JAM 9.63s');
  const [customFields, setCustomFields] = useState({});
  const [customColors, setCustomColors] = useState({
    primaryColor: OLYMPIC_GAMES_DATA[0].primaryColor,
    secondaryColor: OLYMPIC_GAMES_DATA[0].secondaryColor,
    accentColor: OLYMPIC_GAMES_DATA[0].accentColor
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
    updateScale();
    const timer = setTimeout(updateScale, 150);
    window.addEventListener('resize', updateScale);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateScale);
    };
  }, []);

  // Filter sports list
  const filteredSports = OLYMPIC_GAMES_DATA.filter(sport => {
    const matchesSearch = sport.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          sport.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          sport.venue.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = categoryFilter === 'ALL' || sport.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  // When sport changes, update fields & default colors
  useEffect(() => {
    if (selectedSport) {
      setCustomFields({ ...selectedSport.dataFields });
      setCustomColors({
        primaryColor: selectedSport.primaryColor,
        secondaryColor: selectedSport.secondaryColor,
        accentColor: selectedSport.accentColor
      });
    }
  }, [selectedSport]);

  // Generate current HTML
  const currentHTML = generateBroadcastHTML(
    selectedSport,
    selectedTemplateType,
    customFields,
    customColors
  );

  const [isGenerating, setIsGenerating] = useState(false);

  // Advanced OpenRouter + Local NLP AI Prompt Generator
  const handleGenerateAI = async (overridePrompt) => {
    const targetPrompt = typeof overridePrompt === 'string' ? overridePrompt : aiPrompt;
    if (!targetPrompt || !targetPrompt.trim()) return;
    setIsGenerating(true);

    try {
      const response = await fetch('/api/ai/component', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'google/gemini-pro',
          messages: [
            {
              role: 'user',
              content: `Analyze this sports broadcast graphic request: "${targetPrompt}".
Return strictly a valid JSON object (with no markdown block or extra text) with these keys:
{
  "templateType": "lower-third",
  "primaryColor": "#hexColor",
  "secondaryColor": "#hexColor",
  "accentColor": "#hexColor",
  "fields": {
    "athlete": "Athlete Name",
    "country": "Country Code",
    "event": "Event Title",
    "rank": "Rank",
    "time": "Time",
    "scoreA": "0",
    "scoreB": "0",
    "teamA": "Team A",
    "teamB": "Team B"
  }
}`
            }
          ]
        })
      });

      if (response.ok) {
        const result = await response.json();
        const rawContent = result?.choices?.[0]?.message?.content || result?.code || "";
        const cleanJsonStr = rawContent.replace(/```json/g, '').replace(/```/g, '').trim();
        if (cleanJsonStr.startsWith('{')) {
          const parsed = JSON.parse(cleanJsonStr);
          if (parsed.templateType) setSelectedTemplateType(parsed.templateType);
          if (parsed.primaryColor || parsed.accentColor) {
            setCustomColors(prev => ({
              primaryColor: parsed.primaryColor || prev.primaryColor,
              secondaryColor: parsed.secondaryColor || prev.secondaryColor,
              accentColor: parsed.accentColor || prev.accentColor
            }));
          }
          if (parsed.fields && typeof parsed.fields === 'object') {
            setCustomFields(prev => ({ ...prev, ...parsed.fields }));
          }
          setIsGenerating(false);
          return;
        }
      }
    } catch (err) {
      console.warn("OpenRouter API endpoint unavailable, using local AI NLP parser fallback");
    }

    // Fallback: Intelligent Local NLP & Regex Extractor
    const lowerPrompt = targetPrompt.toLowerCase();
    let newColors = { ...customColors };
    let newFields = { ...customFields };
    let newTemplateType = selectedTemplateType;

    if (lowerPrompt.includes('score') || lowerPrompt.includes('match') || lowerPrompt.includes('vs') || lowerPrompt.includes('football') || lowerPrompt.includes('basketball')) {
      newTemplateType = 'scoreboard';
    } else if (lowerPrompt.includes('start list') || lowerPrompt.includes('lineup') || lowerPrompt.includes('lanes')) {
      newTemplateType = 'start-list';
    } else if (lowerPrompt.includes('medal') || lowerPrompt.includes('tally') || lowerPrompt.includes('standing')) {
      newTemplateType = 'medal-tally';
    } else if (lowerPrompt.includes('result') || lowerPrompt.includes('winner') || lowerPrompt.includes('1st') || lowerPrompt.includes('gold silver')) {
      newTemplateType = 'results-table';
    } else if (lowerPrompt.includes('bug') || lowerPrompt.includes('logo') || lowerPrompt.includes('watermark')) {
      newTemplateType = 'event-bug';
    } else if (lowerPrompt.includes('lower third') || lowerPrompt.includes('name') || lowerPrompt.includes('athlete')) {
      newTemplateType = 'lower-third';
    }

    if (lowerPrompt.includes('gold') || lowerPrompt.includes('yellow')) {
      newColors.accentColor = '#f1c40f';
    } else if (lowerPrompt.includes('blue') || lowerPrompt.includes('cyan')) {
      newColors.primaryColor = '#0284c7';
      newColors.secondaryColor = '#0369a1';
      newColors.accentColor = '#38bdf8';
    } else if (lowerPrompt.includes('red') || lowerPrompt.includes('crimson')) {
      newColors.primaryColor = '#dc2626';
      newColors.secondaryColor = '#991b1b';
      newColors.accentColor = '#fca5a5';
    } else if (lowerPrompt.includes('green') || lowerPrompt.includes('emerald')) {
      newColors.primaryColor = '#16a34a';
      newColors.secondaryColor = '#15803d';
      newColors.accentColor = '#86efac';
    } else if (lowerPrompt.includes('purple') || lowerPrompt.includes('violet')) {
      newColors.primaryColor = '#7c3aed';
      newColors.secondaryColor = '#5b21b6';
      newColors.accentColor = '#ddd6fe';
    } else if (lowerPrompt.includes('dark') || lowerPrompt.includes('night') || lowerPrompt.includes('black')) {
      newColors.primaryColor = '#0f172a';
      newColors.secondaryColor = '#1e293b';
      newColors.accentColor = '#38bdf8';
    }

    const countryMatch = targetPrompt.match(/\b([A-Z]{3})\b/);
    if (countryMatch) newFields.country = countryMatch[1];

    const timeMatch = targetPrompt.match(/(\d+[:.]\d+s?|\d+\.\d+s)/i);
    if (timeMatch) newFields.time = timeMatch[1];

    const scoreMatch = targetPrompt.match(/(\d+)\s*[-:]\s*(\d+)/);
    if (scoreMatch) {
      newFields.scoreA = scoreMatch[1];
      newFields.scoreB = scoreMatch[2];
    }

    const nameMatch = targetPrompt.match(/"([^"]+)"/) || targetPrompt.match(/\b([A-Z][a-z]+\s+[A-Z][a-z]+)\b/);
    if (nameMatch) {
      newFields.athlete = nameMatch[1];
      newFields.athleteA = nameMatch[1];
    }

    setSelectedTemplateType(newTemplateType);
    setCustomColors(newColors);
    setCustomFields(newFields);
    setIsGenerating(false);
  };

  const handleFieldChange = (key, value) => {
    setCustomFields(prev => ({ ...prev, [key]: value }));
  };

  const handleAddToCanvas = () => {
    if (!canvas) {
      alert("Canvas is not initialized yet. Please open the Drawing tab first!");
      return;
    }
    const group = createFabricGraphicGroup(
      selectedSport,
      selectedTemplateType,
      customFields,
      customColors
    );

    canvas.add(group);
    canvas.setActiveObject(group);
    canvas.requestRenderAll();
  };

  const categories = ['ALL', 'Aquatics', 'Athletics', 'Ball Sports', 'Combat', 'Cycling', 'Gymnastics', 'Water', 'Precision', 'Multi-Sport'];

  return (
    <div className="games-ai-container">
      <div className="games-ai-header">
        <h2>
          <span>🏆 Olympic Games AI Panel</span>
        </h2>
        <div className="header-badge">OBS London 2012 Specs • 1920x1080 25fps</div>
      </div>

      <div className="games-ai-grid">
        {/* Sidebar: Sport Selection & Template Types */}
        <div className="sidebar-panel">
          <div>
            <div className="section-label">1. Select Olympic Sport</div>
            <input
              type="text"
              className="search-input"
              placeholder="Search sports or venues..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                style={{
                  padding: '3px 8px',
                  borderRadius: '12px',
                  border: '1px solid #334155',
                  background: categoryFilter === cat ? '#38bdf8' : '#0f172a',
                  color: categoryFilter === cat ? '#000' : '#94a3b8',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

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

          <div>
            <div className="section-label">2. Template Type</div>
            <div className="template-types-grid">
              {TEMPLATE_TYPES.map(tt => (
                <button
                  key={tt.id}
                  className={`template-type-btn ${selectedTemplateType === tt.id ? 'active' : ''}`}
                  onClick={() => setSelectedTemplateType(tt.id)}
                >
                  <span>{tt.icon}</span>
                  <span>{tt.name.split('/')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Area: AI Controls & Live Preview */}
        <div className="main-preview-area">
          <div className="ai-controls-box">
            <div className="section-label">3. AI Style & Data Generator</div>
            <div className="prompt-bar">
              <input
                type="text"
                className="prompt-input"
                placeholder="Type AI prompt e.g. 'Gold lower third Usain Bolt JAM 9.63s'..."
                value={aiPrompt}
                onChange={e => setAiPrompt(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleGenerateAI()}
              />
              <button className="generate-btn" onClick={() => handleGenerateAI()} disabled={isGenerating}>
                <FaMagic /> {isGenerating ? 'Generating...' : 'Generate'}
              </button>
            </div>

            <div className="sample-prompts-container" style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 'bold' }}>QUICK TEST PROMPTS:</span>
              {[
                'Gold lower third Usain Bolt JAM 9.63s',
                'Blue scoreboard BRA vs ARG 2-1',
                'Red start list Swimming 100m',
                'Dark medal tally USA 46 China 38 GBR 29'
              ].map((sample, idx) => (
                <button
                  key={idx}
                  className="sample-prompt-pill"
                  style={{
                    background: '#1e293b',
                    border: '1px solid #334155',
                    color: '#38bdf8',
                    fontSize: '10px',
                    padding: '2px 8px',
                    borderRadius: '10px',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    setAiPrompt(sample);
                    handleGenerateAI(sample);
                  }}
                >
                  {sample}
                </button>
              ))}
            </div>

            <div className="field-inputs-grid">
              {Object.keys(customFields).map(key => (
                <div key={key} className="field-input-group">
                  <label>{key}</label>
                  <input
                    type="text"
                    value={customFields[key] || ''}
                    onChange={e => handleFieldChange(key, e.target.value)}
                  />
                </div>
              ))}
              <div className="field-input-group">
                <label>Primary Color</label>
                <input
                  type="color"
                  value={customColors.primaryColor}
                  onChange={e => setCustomColors(prev => ({ ...prev, primaryColor: e.target.value }))}
                />
              </div>
              <div className="field-input-group">
                <label>Accent Color</label>
                <input
                  type="color"
                  value={customColors.accentColor}
                  onChange={e => setCustomColors(prev => ({ ...prev, accentColor: e.target.value }))}
                />
              </div>
            </div>
          </div>

          {/* Live 1920x1080 Scaled Broadcast Preview Canvas */}
          <div ref={previewContainerRef} className="preview-frame-container">
            <div className="preview-res-badge">1920 × 1080 (25 FPS)</div>
            <iframe
              ref={iframeRef}
              srcDoc={currentHTML}
              className="preview-iframe"
              title="Broadcast Preview"
              style={{
                width: '1920px',
                height: '1080px',
                transform: `scale(${previewScale})`,
                transformOrigin: '0 0',
                position: 'absolute',
                top: 0,
                left: 0,
                border: 'none'
              }}
            />
          </div>

          {/* Canvas Actions Bar */}
          <div className="playout-actions-bar">
            <button className="action-btn btn-add" style={{ width: '100%' }} onClick={handleAddToCanvas}>
              <FaPlus /> ADD TO CANVAS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamesAIPanel;
