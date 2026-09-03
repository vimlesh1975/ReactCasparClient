import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { templateLayers, recallPage, updateData, stopGraphics } from '../common';

const Cricket = () => {
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const canvasList = useSelector(state => state.canvasListReducer.canvasList);
    const currentscreenSize = useSelector(state => state.currentscreenSizeReducer.currentscreenSize);

    const [team1, setTeam1] = useState('ONGC Cricket');
    const [info1, setInfo1] = useState('This Over 2 1 0 6 0 1');
    const [info2, setInfo2] = useState('Target 225');
    const [run, setRun] = useState(125);
    const [wicket, setWicket] = useState(2);
    const [over, setOver] = useState(3.2);
    const [autoUpdate, setAutoUpdate] = useState(false);

    const dataCricket = [
        { key: 'teamName', value: team1, type: 'text' },
        { key: 'info1', value: info1, type: 'text' },
        { key: 'info2', value: info2, type: 'text' },
        { key: 'score', value: run + '/' + wicket + '(' + over + ')', type: 'text' },
        { key: 'Wicket', value: wicket, type: 'text' },
        { key: 'overDecimal', value: (over - Math.floor(over)).toFixed(1) * 10, type: 'text' },
    ];

    useEffect(() => {
        if (autoUpdate) {
            updateData(templateLayers.cricketScore, 'cricket_score', dataCricket, canvasList, canvas);
        }
        // eslint-disable-next-line
    }, [run, wicket, over, team1, info1, info2]);

    const addOver = () => {
        const currentOver = parseFloat(over || 0);
        const ball = Math.round((currentOver % 1) * 10);
        if (ball >= 5) {
            setOver(parseFloat((Math.floor(currentOver) + 1).toFixed(1)));
        } else {
            setOver(parseFloat((currentOver + 0.1).toFixed(1)));
        }
    };

    const subtractOver = () => {
        const currentOver = parseFloat(over || 0);
        if (currentOver <= 0) return;
        const ball = Math.round((currentOver % 1) * 10);
        if (ball === 0) {
            setOver(parseFloat((Math.floor(currentOver) - 1 + 0.5).toFixed(1)));
        } else {
            setOver(parseFloat((currentOver - 0.1).toFixed(1)));
        }
    };

    // Styling
    const cardStyle = {
        backgroundColor: '#1e293b',
        borderRadius: '8px',
        border: '1px solid #334155',
        padding: '14px',
        color: '#f8fafc',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
        maxWidth: '650px',
        boxSizing: 'border-box',
    };

    const inputBase = {
        backgroundColor: '#0f172a',
        border: '1px solid #334155',
        borderRadius: '4px',
        color: '#ffffff',
        padding: '4px 8px',
        fontSize: '12px',
        boxSizing: 'border-box',
    };

    const stepperBtn = {
        width: '28px',
        height: '28px',
        backgroundColor: '#334155',
        color: '#ffffff',
        border: '1px solid #475569',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '13px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
    };

    const quickBtn = {
        padding: '3px 8px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#0284c7',
        color: '#ffffff',
        cursor: 'pointer',
        fontSize: '11px',
        fontWeight: 'bold',
    };

    const actionBtn = {
        padding: '5px 12px',
        borderRadius: '5px',
        border: 'none',
        fontWeight: '600',
        fontSize: '12px',
        cursor: 'pointer',
        color: '#ffffff',
    };

    return (
        <div style={{ padding: '12px', fontFamily: 'Inter, system-ui, sans-serif', color: '#f8fafc', width: '100%', maxHeight: 'calc(100vh - 80px)', overflowY: 'auto', boxSizing: 'border-box' }}>
            <div style={cardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid #334155', paddingBottom: '8px' }}>
                    <h3 style={{ margin: 0, fontSize: '16px', color: '#38bdf8' }}>Cricket Score Control</h3>
                    <span style={{ fontSize: '11px', backgroundColor: '#334155', padding: '2px 8px', borderRadius: '10px', color: '#94a3b8' }}>
                        Layer: L{templateLayers.cricketScore}
                    </span>
                </div>

                {/* Match Information Inputs */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', alignItems: 'center', gap: '8px' }}>
                        <label style={{ fontSize: '11px', color: '#94a3b8' }}>Team Name:</label>
                        <input
                            type="text"
                            value={team1}
                            onChange={e => setTeam1(e.target.value)}
                            style={{ ...inputBase, width: '100%', fontWeight: 'bold' }}
                        />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', alignItems: 'center', gap: '8px' }}>
                        <label style={{ fontSize: '11px', color: '#94a3b8' }}>Info 1:</label>
                        <input
                            type="text"
                            value={info1}
                            onChange={e => setInfo1(e.target.value)}
                            style={{ ...inputBase, width: '100%' }}
                        />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', alignItems: 'center', gap: '8px' }}>
                        <label style={{ fontSize: '11px', color: '#94a3b8' }}>Info 2:</label>
                        <input
                            type="text"
                            value={info2}
                            onChange={e => setInfo2(e.target.value)}
                            style={{ ...inputBase, width: '100%' }}
                        />
                    </div>
                </div>

                {/* Score Controls (Runs, Wickets, Overs) */}
                <div style={{ backgroundColor: '#0f172a', padding: '10px', borderRadius: '6px', border: '1px solid #334155', marginBottom: '12px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px', alignItems: 'center' }}>
                        {/* Runs */}
                        <div>
                            <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>Runs</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                                <button style={stepperBtn} onClick={() => setRun(val => Math.max(0, parseInt(val || 0) - 1))}>-</button>
                                <input
                                    type="number"
                                    value={run}
                                    onChange={e => setRun(parseInt(e.target.value) || 0)}
                                    style={{ ...inputBase, width: '55px', textAlign: 'center', fontWeight: 'bold', fontSize: '15px', color: '#38bdf8' }}
                                />
                                <button style={stepperBtn} onClick={() => setRun(val => parseInt(val || 0) + 1)}>+</button>
                            </div>
                            <div style={{ display: 'flex', gap: '4px' }}>
                                <button style={quickBtn} onClick={() => setRun(val => parseInt(val || 0) + 4)}>+4</button>
                                <button style={{ ...quickBtn, backgroundColor: '#10b981' }} onClick={() => setRun(val => parseInt(val || 0) + 6)}>+6</button>
                            </div>
                        </div>

                        {/* Wickets */}
                        <div>
                            <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>Wickets (0-10)</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <button style={stepperBtn} onClick={() => setWicket(val => Math.max(0, parseInt(val || 0) - 1))}>-</button>
                                <input
                                    type="number"
                                    min={0}
                                    max={10}
                                    value={wicket}
                                    onChange={e => setWicket(Math.min(10, Math.max(0, parseInt(e.target.value) || 0)))}
                                    style={{ ...inputBase, width: '55px', textAlign: 'center', fontWeight: 'bold', fontSize: '15px', color: '#ef4444' }}
                                />
                                <button style={stepperBtn} onClick={() => setWicket(val => Math.min(10, parseInt(val || 0) + 1))}>+</button>
                            </div>
                        </div>

                        {/* Overs */}
                        <div>
                            <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>Overs</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <button style={stepperBtn} onClick={subtractOver}>-</button>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={over}
                                    onChange={e => setOver(parseFloat(e.target.value) || 0)}
                                    style={{ ...inputBase, width: '55px', textAlign: 'center', fontWeight: 'bold', fontSize: '15px', color: '#fbbf24' }}
                                />
                                <button style={stepperBtn} onClick={addOver}>+</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Playout Actions Bar */}
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <button
                        style={{ ...actionBtn, backgroundColor: '#10b981' }}
                        onClick={() => recallPage(templateLayers.cricketScore, 'cricket_score', dataCricket, canvasList, canvas, currentscreenSize)}
                    >
                        Play
                    </button>
                    <button
                        style={{ ...actionBtn, backgroundColor: '#0284c7' }}
                        onClick={() => updateData(templateLayers.cricketScore, 'cricket_score', dataCricket, canvasList, canvas)}
                    >
                        Update
                    </button>
                    <button
                        style={{ ...actionBtn, backgroundColor: '#ef4444' }}
                        onClick={() => stopGraphics(templateLayers.cricketScore)}
                    >
                        Stop
                    </button>
                    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12px', cursor: 'pointer', marginLeft: 'auto' }}>
                        <input type="checkbox" checked={autoUpdate} onChange={e => setAutoUpdate(e.target.checked)} />
                        Auto Update
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Cricket;