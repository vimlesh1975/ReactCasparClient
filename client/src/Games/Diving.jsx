import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaPlay, FaStop, FaPlus, FaCalculator } from 'react-icons/fa';
import { endpoint, stopGraphics, templateLayers } from '../common';
import { createFabricGraphicGroup2 as createFabricGraphicGroup } from '../games2/TemplateGenerator2';

const Diving = () => {
  const canvas = useSelector(state => state.canvasReducer.canvas);

  const [eventName, setEventName] = useState("Men's 10m Platform");
  const [roundStr, setRoundStr] = useState("Final - Dive 6");
  const [athleteName, setAthleteName] = useState("");
  const [country, setCountry] = useState("");
  const [flag, setFlag] = useState("");

  const [diveCode, setDiveCode] = useState("107B");
  const [diveDesc, setDiveDesc] = useState("Forward 3½ Somersaults");
  const [position, setPosition] = useState("Pike");
  const [dd, setDd] = useState("3.0");
  const [rank, setRank] = useState("3rd");

  const [jScores, setJScores] = useState(["8.5", "9.0", "8.5", "9.0", "8.5", "9.0", "8.5"]);
  const [diveScore, setDiveScore] = useState("76.50");
  const [totalScore, setTotalScore] = useState("556.95");

  const sportInfo = {
    id: "aquatics-diving",
    name: "Aquatics - Diving",
    code: "DV",
    primaryColor: "#005b96",
    secondaryColor: "#6497b1",
    accentColor: "#ffd700",
    venue: "Aquatics Centre"
  };

  const calculateScore = () => {
    const scores = jScores.map(s => parseFloat(s) || 0).sort((a, b) => a - b);
    if (scores.length >= 7) {
      // Drop highest 2 and lowest 2, take middle 3 scores (or for 7 judges standard: drop 2 high, 2 low)
      const middleScores = scores.slice(2, 5);
      const sum = middleScores.reduce((acc, v) => acc + v, 0);
      const calculated = (sum * parseFloat(dd || 1)).toFixed(2);
      setDiveScore(calculated);
    } else if (scores.length >= 5) {
      const middleScores = scores.slice(1, 4);
      const sum = middleScores.reduce((acc, v) => acc + v, 0);
      const calculated = (sum * parseFloat(dd || 1)).toFixed(2);
      setDiveScore(calculated);
    }
  };

  const handleJudgeChange = (index, value) => {
    const newScores = [...jScores];
    newScores[index] = value;
    setJScores(newScores);
  };

  const getCustomFields = () => ({
    athlete: athleteName,
    country,
    flag,
    event: eventName,
    round: roundStr,
    diveCode,
    diveDesc,
    position,
    dd,
    jScores,
    diveScore,
    totalScore,
    rank,
    score: totalScore
  });

  const sendToCanvas = async (templateId) => {
    const activeCanvas = canvas || window.editor?.canvas || window.canvas;
    if (!activeCanvas) {
      alert("Canvas is not initialized yet. Please open the Drawing tab first!");
      return;
    }
    const group = await createFabricGraphicGroup(
      sportInfo,
      'lower-third',
      getCustomFields(),
      { primaryColor: sportInfo.primaryColor, secondaryColor: sportInfo.secondaryColor, accentColor: sportInfo.accentColor },
      templateId,
      'Diving Playout'
    );
    if (group) {
      activeCanvas.add(group);
      activeCanvas.setActiveObject(group);
      activeCanvas.requestRenderAll();
    }
  };

  const playGraphic = (templateId) => {
    // CasparCG AMCP playout endpoint fallback
    endpoint(`CG 1-20 ADD 1 "DV005_Athlete_ID" 1 "${JSON.stringify(getCustomFields()).replace(/"/g, '\\"')}"`);
  };

  return (
    <div style={{ padding: '20px', background: '#0b1d3a', color: '#ffffff', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', minHeight: '600px' }}>
      <h2 style={{ color: '#ffd700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span>🏊‍♂️</span> Aquatics - Diving Playout Controller
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        {/* Left Column: Event & Athlete Info */}
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <h3 style={{ borderBottom: '1px solid #6497b1', paddingBottom: '6px', marginBottom: '12px' }}>Event & Diver Info</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ fontSize: '12px', color: '#6497b1' }}>Event Name</label>
              <input type="text" value={eventName} onChange={e => setEventName(e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: '12px', color: '#6497b1' }}>Round</label>
              <input type="text" value={roundStr} onChange={e => setRoundStr(e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: '12px', color: '#6497b1' }}>Diver Name</label>
              <input type="text" value={athleteName} onChange={e => setAthleteName(e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: '12px', color: '#6497b1' }}>NOC & Flag</label>
              <div style={{ display: 'flex', gap: '6px' }}>
                <input type="text" value={flag} onChange={e => setFlag(e.target.value)} style={{ ...inputStyle, width: '45px' }} />
                <input type="text" value={country} onChange={e => setCountry(e.target.value)} style={inputStyle} />
              </div>
            </div>
            <div>
              <label style={{ fontSize: '12px', color: '#6497b1' }}>Current Rank</label>
              <input type="text" value={rank} onChange={e => setRank(e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: '12px', color: '#6497b1' }}>Total Score</label>
              <input type="text" value={totalScore} onChange={e => setTotalScore(e.target.value)} style={inputStyle} />
            </div>
          </div>
        </div>

        {/* Right Column: Dive Specification */}
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <h3 style={{ borderBottom: '1px solid #6497b1', paddingBottom: '6px', marginBottom: '12px' }}>Dive Specification</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ fontSize: '12px', color: '#6497b1' }}>Dive Code</label>
              <input type="text" value={diveCode} onChange={e => setDiveCode(e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: '12px', color: '#6497b1' }}>Position</label>
              <input type="text" value={position} onChange={e => setPosition(e.target.value)} style={inputStyle} />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ fontSize: '12px', color: '#6497b1' }}>Description</label>
              <input type="text" value={diveDesc} onChange={e => setDiveDesc(e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: '12px', color: '#6497b1' }}>Degree of Difficulty (DD)</label>
              <input type="text" value={dd} onChange={e => setDd(e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: '12px', color: '#6497b1' }}>Calculated Dive Score</label>
              <input type="text" value={diveScore} readOnly style={{ ...inputStyle, color: '#ffd700', fontWeight: 'bold' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Judges Scoring Matrix */}
      <div style={{ background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h3 style={{ margin: 0 }}>Judges Scoring Panel (J1–J7)</h3>
          <button onClick={calculateScore} style={btnCalcStyle}>
            <FaCalculator /> Calculate Score
          </button>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          {jScores.map((score, idx) => (
            <div key={idx} style={{ flex: 1, textAlign: 'center' }}>
              <label style={{ fontSize: '12px', color: '#6497b1', display: 'block', marginBottom: '4px' }}>J{idx + 1}</label>
              <input
                type="text"
                value={score}
                onChange={e => handleJudgeChange(idx, e.target.value)}
                style={{ ...inputStyle, textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Playout & Canvas Action Controls */}
      <div style={{ background: 'rgba(255,255,255,0.08)', padding: '18px', borderRadius: '8px', display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
        <h4 style={{ width: '100%', color: '#ffd700', margin: '0 0 8px 0' }}>Broadcast & Canvas Controls</h4>
        <button onClick={() => sendToCanvas('DV005_A')} style={btnCanvasStyle}>
          <FaPlus /> DV005 Var A (Single)
        </button>
        <button onClick={() => sendToCanvas('DV005_B')} style={btnCanvasStyle}>
          <FaPlus /> DV005 Var B (DNS)
        </button>
        <button onClick={() => sendToCanvas('DV005_C')} style={btnCanvasStyle}>
          <FaPlus /> DV005 Var C (Pair)
        </button>
        <button onClick={() => sendToCanvas('DV005_D')} style={btnCanvasStyle}>
          <FaPlus /> DV005 Var D (DSQ)
        </button>
        <button onClick={() => sendToCanvas('DV006')} style={btnCanvasStyle}>
          <FaPlus /> Add DV006 Officials (Indiv)
        </button>
        <button onClick={() => sendToCanvas('DV007_A')} style={btnCanvasStyle}>
          <FaPlus /> DV007 Var A (Exec)
        </button>
        <button onClick={() => sendToCanvas('DV007_B')} style={btnCanvasStyle}>
          <FaPlus /> DV007 Var B (Synch)
        </button>
        <button onClick={() => sendToCanvas('DV008_A')} style={btnCanvasStyle}>
          <FaPlus /> DV008 Var A (Single 3-Tier)
        </button>
        <button onClick={() => sendToCanvas('DV008_B')} style={btnCanvasStyle}>
          <FaPlus /> DV008 Var B (Single 4-Tier Rank)
        </button>
        <button onClick={() => sendToCanvas('DV008_C')} style={btnCanvasStyle}>
          <FaPlus /> DV008 Var C (Pair 3-Tier)
        </button>
        <button onClick={() => sendToCanvas('DV008_D')} style={btnCanvasStyle}>
          <FaPlus /> DV008 Var D (Pair 4-Tier Rank)
        </button>
        <button onClick={() => sendToCanvas('DV010')} style={btnCanvasStyle}>
          <FaPlus /> Add Scorecard to Canvas
        </button>
        <button onClick={() => sendToCanvas('DV012')} style={btnCanvasStyle}>
          <FaPlus /> Add Standings to Canvas
        </button>
        <button onClick={() => playGraphic('DV005')} style={btnPlayStyle}>
          <FaPlay /> On Air (CasparCG)
        </button>
        <button onClick={() => stopGraphics(templateLayers.Graphic)} style={btnStopStyle}>
          <FaStop /> Clear Graphics
        </button>
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '8px 12px',
  background: '#041021',
  border: '1px solid rgba(255,255,255,0.25)',
  borderRadius: '4px',
  color: '#ffffff',
  fontSize: '14px'
};

const btnCanvasStyle = {
  padding: '10px 16px',
  background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
  color: '#ffffff',
  border: 'none',
  borderRadius: '6px',
  fontWeight: 'bold',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
};

const btnPlayStyle = {
  padding: '10px 16px',
  background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
  color: '#ffffff',
  border: 'none',
  borderRadius: '6px',
  fontWeight: 'bold',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
};

const btnStopStyle = {
  padding: '10px 16px',
  background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
  color: '#ffffff',
  border: 'none',
  borderRadius: '6px',
  fontWeight: 'bold',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
};

const btnCalcStyle = {
  padding: '6px 14px',
  background: '#ffd700',
  color: '#000000',
  border: 'none',
  borderRadius: '4px',
  fontWeight: 'bold',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '6px'
};

export default Diving;
