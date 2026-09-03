import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { templateLayers, stopGraphics, recallPage, updateData } from '../common';

const Kabaddi = () => {
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const canvasList = useSelector(state => state.canvasListReducer.canvasList);
    const currentscreenSize = useSelector(state => state.currentscreenSizeReducer.currentscreenSize);

    const [team1, setteam1] = useState('MUMBAI');
    const [score1, setScore1] = useState(22);
    const [team1Status1, setteam1Status1] = useState(4);
    const [autoUpdate, setAutoUpdate] = useState(false);

    const [team2, setteam2] = useState('BANGALORE');
    const [score2, setScore2] = useState(32);
    const [team2Status1, setteam2Status1] = useState(5);

    const [half, setHalf] = useState('1ST');

    const dataKabaddi = [
        { key: 'TEAM1', value: team1, type: 'text' },
        { key: 'TEAM2', value: team2, type: 'text' },
        { key: 'SCORE1', value: score1, type: 'text' },
        { key: 'SCORE2', value: score2, type: 'text' },
        { key: 'HALF', value: half, type: 'text' },
        { key: '10', value: (team1Status1 > 6) ? '#0DDF1A' : 'red', type: 'fill' },
        { key: '11', value: (team1Status1 > 5) ? '#0DDF1A' : 'red', type: 'fill' },
        { key: '12', value: (team1Status1 > 4) ? '#0DDF1A' : 'red', type: 'fill' },
        { key: '13', value: (team1Status1 > 3) ? '#0DDF1A' : 'red', type: 'fill' },
        { key: '14', value: (team1Status1 > 2) ? '#0DDF1A' : 'red', type: 'fill' },
        { key: '15', value: (team1Status1 > 1) ? '#0DDF1A' : 'red', type: 'fill' },
        { key: '16', value: (team1Status1 > 0) ? '#0DDF1A' : 'red', type: 'fill' },

        { key: '20', value: (team2Status1 > 6) ? '#0DDF1A' : 'red', type: 'fill' },
        { key: '21', value: (team2Status1 > 5) ? '#0DDF1A' : 'red', type: 'fill' },
        { key: '22', value: (team2Status1 > 4) ? '#0DDF1A' : 'red', type: 'fill' },
        { key: '23', value: (team2Status1 > 3) ? '#0DDF1A' : 'red', type: 'fill' },
        { key: '24', value: (team2Status1 > 2) ? '#0DDF1A' : 'red', type: 'fill' },
        { key: '25', value: (team2Status1 > 1) ? '#0DDF1A' : 'red', type: 'fill' },
        { key: '26', value: (team2Status1 > 0) ? '#0DDF1A' : 'red', type: 'fill' },
    ];

    useEffect(() => {
        if (autoUpdate) {
            updateData(templateLayers.kabaddiScore, 'kabaddi', dataKabaddi, canvasList, canvas);
        }
        // eslint-disable-next-line
    }, [team1Status1, team2Status1, score1, score2, team1, team2, half]);

    // Team 1 Scoring Handlers
    const team1RaidPoint = () => {
        if (team2Status1 > 1) {
            setScore1(val => parseInt(val || 0) + 1);
            if (team1Status1 < 7) setteam1Status1(val => parseInt(val || 0) + 1);
            setteam2Status1(val => parseInt(val || 0) - 1);
        } else {
            setScore1(val => parseInt(val || 0) + 1 + 2); // 1 raid point + 2 all out points
            setteam2Status1(7);
        }
    };

    const team1TacklePoint = () => {
        if (team1Status1 > 1) {
            setScore2(val => parseInt(val || 0) + 1);
            if (team2Status1 < 7) setteam2Status1(val => parseInt(val || 0) + 1);
            setteam1Status1(val => parseInt(val || 0) - 1);
        } else {
            setScore2(val => parseInt(val || 0) + 1 + 2);
            setteam1Status1(7);
        }
    };

    const team1BonusPoint = () => {
        setScore1(val => parseInt(val || 0) + 1);
    };

    // Team 2 Scoring Handlers
    const team2RaidPoint = () => {
        if (team1Status1 > 1) {
            setScore2(val => parseInt(val || 0) + 1);
            if (team2Status1 < 7) setteam2Status1(val => parseInt(val || 0) + 1);
            setteam1Status1(val => parseInt(val || 0) - 1);
        } else {
            setScore2(val => parseInt(val || 0) + 1 + 2);
            setteam1Status1(7);
        }
    };

    const team2TacklePoint = () => {
        if (team2Status1 > 1) {
            setScore1(val => parseInt(val || 0) + 1);
            if (team1Status1 < 7) setteam1Status1(val => parseInt(val || 0) + 1);
            setteam2Status1(val => parseInt(val || 0) - 1);
        } else {
            setScore1(val => parseInt(val || 0) + 1 + 2);
            setteam2Status1(7);
        }
    };

    const team2BonusPoint = () => {
        setScore2(val => parseInt(val || 0) + 1);
    };

    // Styles
    const cardStyle = {
        backgroundColor: '#1e293b',
        borderRadius: '8px',
        border: '1px solid #334155',
        padding: '14px',
        color: '#f8fafc',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
        maxWidth: '750px',
        boxSizing: 'border-box',
    };

    const teamBoxStyle = {
        backgroundColor: '#0f172a',
        borderRadius: '6px',
        border: '1px solid #334155',
        padding: '10px',
        flex: 1,
        minWidth: 0,
    };

    const inputBase = {
        backgroundColor: '#1e293b',
        border: '1px solid #334155',
        borderRadius: '4px',
        color: '#ffffff',
        padding: '4px 8px',
        fontSize: '12px',
        boxSizing: 'border-box',
    };

    const scoreBtn = {
        padding: '5px 10px',
        borderRadius: '4px',
        border: 'none',
        fontWeight: 'bold',
        fontSize: '12px',
        cursor: 'pointer',
        color: '#ffffff',
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
                    <h3 style={{ margin: 0, fontSize: '16px', color: '#38bdf8' }}>Kabaddi Playout Control</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '11px', color: '#94a3b8' }}>HALF:</span>
                        <input
                            onChange={e => setHalf(e.target.value)}
                            style={{ ...inputBase, width: '50px', textAlign: 'center', fontWeight: 'bold' }}
                            type="text"
                            value={half}
                        />
                    </div>
                </div>

                {/* Teams & Score Control Grid */}
                <div style={{ display: 'flex', gap: '12px', alignItems: 'stretch', marginBottom: '12px', flexWrap: 'wrap' }}>
                    {/* TEAM 1 */}
                    <div style={teamBoxStyle}>
                        <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#38bdf8', marginBottom: '6px' }}>TEAM 1</div>
                        <input
                            onChange={e => setteam1(e.target.value)}
                            style={{ ...inputBase, width: '100%', textAlign: 'center', fontWeight: 'bold', marginBottom: '8px' }}
                            type="text"
                            value={team1}
                        />
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ fontSize: '11px', color: '#94a3b8' }}>Score:</span>
                            <input
                                onChange={e => setScore1(parseInt(e.target.value) || 0)}
                                style={{ ...inputBase, width: '50px', textAlign: 'center', fontWeight: 'bold', fontSize: '16px', color: '#38bdf8' }}
                                type="number"
                                value={score1}
                            />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span style={{ fontSize: '11px', color: '#94a3b8' }}>Players (0-7):</span>
                            <input
                                style={{ ...inputBase, width: '45px', textAlign: 'center', fontWeight: 'bold' }}
                                type="number"
                                min={0}
                                max={7}
                                value={team1Status1}
                                onChange={e => setteam1Status1(Math.min(7, Math.max(0, parseInt(e.target.value) || 0)))}
                            />
                        </div>

                        {/* Visual Player Dots */}
                        <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', marginBottom: '10px' }}>
                            {[1, 2, 3, 4, 5, 6, 7].map(num => (
                                <span
                                    key={num}
                                    style={{
                                        width: '10px',
                                        height: '10px',
                                        borderRadius: '50%',
                                        backgroundColor: num <= team1Status1 ? '#0DDF1A' : '#ef4444',
                                        display: 'inline-block',
                                    }}
                                />
                            ))}
                        </div>

                        {/* Team 1 Point Triggers */}
                        <div style={{ display: 'flex', gap: '4px' }}>
                            <button style={{ ...scoreBtn, flex: 1, backgroundColor: '#10b981' }} onClick={team1RaidPoint} title="Touch / Raid Point (+1 / Revive)">
                                +1
                            </button>
                            <button style={{ ...scoreBtn, flex: 1, backgroundColor: '#ef4444' }} onClick={team1TacklePoint} title="Player Out">
                                Out
                            </button>
                            <button style={{ ...scoreBtn, flex: 1, backgroundColor: '#f59e0b' }} onClick={team1BonusPoint} title="Bonus Point (+1)">
                                Bonus
                            </button>
                        </div>
                    </div>

                    {/* TEAM 2 */}
                    <div style={teamBoxStyle}>
                        <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#f43f5e', marginBottom: '6px' }}>TEAM 2</div>
                        <input
                            onChange={e => setteam2(e.target.value)}
                            style={{ ...inputBase, width: '100%', textAlign: 'center', fontWeight: 'bold', marginBottom: '8px' }}
                            type="text"
                            value={team2}
                        />
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ fontSize: '11px', color: '#94a3b8' }}>Score:</span>
                            <input
                                onChange={e => setScore2(parseInt(e.target.value) || 0)}
                                style={{ ...inputBase, width: '50px', textAlign: 'center', fontWeight: 'bold', fontSize: '16px', color: '#f43f5e' }}
                                type="number"
                                value={score2}
                            />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span style={{ fontSize: '11px', color: '#94a3b8' }}>Players (0-7):</span>
                            <input
                                style={{ ...inputBase, width: '45px', textAlign: 'center', fontWeight: 'bold' }}
                                type="number"
                                min={0}
                                max={7}
                                value={team2Status1}
                                onChange={e => setteam2Status1(Math.min(7, Math.max(0, parseInt(e.target.value) || 0)))}
                            />
                        </div>

                        {/* Visual Player Dots */}
                        <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', marginBottom: '10px' }}>
                            {[1, 2, 3, 4, 5, 6, 7].map(num => (
                                <span
                                    key={num}
                                    style={{
                                        width: '10px',
                                        height: '10px',
                                        borderRadius: '50%',
                                        backgroundColor: num <= team2Status1 ? '#0DDF1A' : '#ef4444',
                                        display: 'inline-block',
                                    }}
                                />
                            ))}
                        </div>

                        {/* Team 2 Point Triggers */}
                        <div style={{ display: 'flex', gap: '4px' }}>
                            <button style={{ ...scoreBtn, flex: 1, backgroundColor: '#10b981' }} onClick={team2RaidPoint} title="Touch / Raid Point (+1 / Revive)">
                                +1
                            </button>
                            <button style={{ ...scoreBtn, flex: 1, backgroundColor: '#ef4444' }} onClick={team2TacklePoint} title="Player Out">
                                Out
                            </button>
                            <button style={{ ...scoreBtn, flex: 1, backgroundColor: '#f59e0b' }} onClick={team2BonusPoint} title="Bonus Point (+1)">
                                Bonus
                            </button>
                        </div>
                    </div>
                </div>

                {/* Playout & Graphics Actions Bar */}
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <button
                        style={{ ...actionBtn, backgroundColor: '#10b981' }}
                        onClick={() => recallPage(templateLayers.kabaddiScore, 'kabaddi', dataKabaddi, canvasList, canvas, currentscreenSize)}
                    >
                        Play
                    </button>
                    <button
                        style={{ ...actionBtn, backgroundColor: '#0284c7' }}
                        onClick={() => updateData(templateLayers.kabaddiScore, 'kabaddi', dataKabaddi, canvasList, canvas)}
                    >
                        Update
                    </button>
                    <button
                        style={{ ...actionBtn, backgroundColor: '#ef4444' }}
                        onClick={() => stopGraphics(templateLayers.kabaddiScore)}
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

export default Kabaddi;