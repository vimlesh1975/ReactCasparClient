import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { stopGraphics, recallPage, updateData, templateLayers } from '../common';

const Tennis = () => {
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const canvasList = useSelector(state => state.canvasListReducer.canvasList);
    const currentscreenSize = useSelector(state => state.currentscreenSizeReducer.currentscreenSize);

    const [t1Set, setT1Set] = useState(1);
    const [t2Set, setT2Set] = useState(2);

    const [t1game, setT1game] = useState(3);
    const [t2game, setT2game] = useState(4);

    const [t1point, setT1point] = useState(15);
    const [t2point, setT2point] = useState(30);

    const [showService, setShowService] = useState(true);
    const [service, setService] = useState(true);
    const [badminton, setBadminton] = useState(false);
    const [autoUpdate, setAutoUpdate] = useState(false);

    const team1pointincrease = () => {
        if (badminton) {
            setT1point(val => parseInt(val) + 1);
            setService(true);
            return;
        }
        if ((t1point === '40') && (t2point === '40')) {
            setT1point('AD');
        } else if (t1point === 'AD') {
            setT1point('0');
            setT2point('0');
            setT1game(val => parseInt(val) + 1);
        } else if ((t1point === '40') && (t2point !== '40') && (t2point !== 'AD')) {
            setT1point('0');
            setT2point('0');
            setT1game(val => parseInt(val) + 1);
        } else if ((t1point === '40') && (t2point === 'AD')) {
            setT2point('40');
        } else if (parseInt(t1point) === 30) {
            setT1point('40');
        } else {
            setT1point(val => parseInt(val) + 15);
        }
    };

    const team2pointincrease = () => {
        if (badminton) {
            setT2point(val => parseInt(val) + 1);
            setService(false);
            return;
        }
        if ((t1point === '40') && (t2point === '40')) {
            setT2point('AD');
        } else if (t2point === 'AD') {
            setT2point('0');
            setT1point('0');
            setT2game(val => parseInt(val) + 1);
        } else if ((t2point === '40') && (t1point !== '40') && (t1point !== 'AD')) {
            setT2point('0');
            setT1point('0');
            setT2game(val => parseInt(val) + 1);
        } else if ((t2point === '40') && (t1point === 'AD')) {
            setT1point('40');
        } else if (parseInt(t2point) === 30) {
            setT2point('40');
        } else {
            setT2point(val => parseInt(val) + 15);
        }
    };

    const team1pointDecrease = () => {
        if (badminton) {
            return setT1point(val => parseInt(val) - 1);
        }
        if (t1point === 'AD') {
            setT1point('40');
        } else if (t1point === '40') {
            setT1point('30');
        } else if (parseInt(t1point) !== 0) {
            setT1point(val => parseInt(val) - 15);
        }
    };

    const team2pointDecrease = () => {
        if (badminton) {
            return setT2point(val => parseInt(val) - 1);
        }
        if (t2point === 'AD') {
            setT2point('40');
        } else if (t2point === '40') {
            setT2point('30');
        } else if (parseInt(t2point) !== 0) {
            setT2point(val => parseInt(val) - 15);
        }
    };

    const resetData = () => {
        setT1Set(0);
        setT2Set(0);
        setT1game(0);
        setT2game(0);
        setT1point(0);
        setT2point(0);
    };

    const getScoreData = () => [
        { key: 'service1', value: (showService && service) ? 1 : 0, type: 'opacity' },
        { key: 'service2', value: (showService && !service) ? 1 : 0, type: 'opacity' },
        { key: 't1set', value: t1Set, type: 'text' },
        { key: 't2set', value: t2Set, type: 'text' },
        { key: 't1game', value: t1game, type: 'text' },
        { key: 't2game', value: t2game, type: 'text' },
        { key: 't1point', value: t1point, type: 'text' },
        { key: 't2point', value: t2point, type: 'text' },
    ];

    useEffect(() => {
        if (autoUpdate) {
            updateData(templateLayers.tennisScore, 'Crunch Scoreboard', getScoreData(), canvasList, canvas);
        }
        // eslint-disable-next-line
    }, [showService, service, t1Set, t2Set, t1game, t2game, t1point, t2point]);

    const inputStyle = {
        width: '45px',
        backgroundColor: '#0f172a',
        color: '#ffffff',
        border: '1px solid #334155',
        borderRadius: '4px',
        padding: '3px 5px',
        textAlign: 'center',
        fontSize: '13px',
    };

    const btnStyle = {
        padding: '3px 8px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#0284c7',
        color: '#ffffff',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '12px',
    };

    const actionBtn = {
        padding: '5px 12px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '12px',
    };

    return (
        <div style={{ padding: '12px', fontFamily: 'Inter, system-ui, sans-serif', color: '#f8fafc', width: '100%', boxSizing: 'border-box' }}>
            <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', padding: '14px', maxWidth: '650px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)' }}>
                <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#38bdf8' }}>Tennis / Racquet Score Control</h3>
                
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '12px', textAlign: 'center' }}>
                    <thead>
                        <tr style={{ color: '#94a3b8', fontSize: '12px', borderBottom: '1px solid #334155' }}>
                            <th style={{ padding: '6px' }}>Team</th>
                            <th>Set</th>
                            <th>Game</th>
                            <th>Point</th>
                            <th>+</th>
                            <th>-</th>
                            <th style={{ textAlign: 'center' }}>
                                <label style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'pointer', fontSize: '11px', color: '#cbd5e1' }}>
                                    <input type="checkbox" checked={showService} onChange={() => setShowService(val => !val)} />
                                    Show Service
                                </label>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{ borderBottom: '1px solid #1e293b' }}>
                            <td style={{ padding: '6px', fontWeight: 'bold', color: '#38bdf8', textAlign: 'left' }}>Team 1</td>
                            <td><input style={inputStyle} type="text" onChange={e => setT1Set(e.target.value)} value={t1Set} /></td>
                            <td><input style={inputStyle} type="text" onChange={e => setT1game(e.target.value)} value={t1game} /></td>
                            <td><input style={inputStyle} type="text" onChange={e => setT1point(e.target.value)} value={t1point} /></td>
                            <td><button style={btnStyle} onClick={team1pointincrease}>+</button></td>
                            <td><button style={{ ...btnStyle, backgroundColor: '#475569' }} onClick={team1pointDecrease}>-</button></td>
                            <td><input onChange={() => setService(true)} type="radio" checked={service} value="t1" name="tennis_service" style={{ cursor: 'pointer' }} /></td>
                        </tr>
                        <tr>
                            <td style={{ padding: '6px', fontWeight: 'bold', color: '#f43f5e', textAlign: 'left' }}>Team 2</td>
                            <td><input style={inputStyle} type="text" onChange={e => setT2Set(e.target.value)} value={t2Set} /></td>
                            <td><input style={inputStyle} type="text" onChange={e => setT2game(e.target.value)} value={t2game} /></td>
                            <td><input style={inputStyle} type="text" onChange={e => setT2point(e.target.value)} value={t2point} /></td>
                            <td><button style={btnStyle} onClick={team2pointincrease}>+</button></td>
                            <td><button style={{ ...btnStyle, backgroundColor: '#475569' }} onClick={team2pointDecrease}>-</button></td>
                            <td><input onChange={() => setService(false)} type="radio" checked={!service} value="t2" name="tennis_service" style={{ cursor: 'pointer' }} /></td>
                        </tr>
                    </tbody>
                </table>

                {/* Actions Bar */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '10px' }}>
                    <button
                        style={{ ...actionBtn, backgroundColor: '#10b981', color: '#ffffff' }}
                        onClick={() => recallPage(templateLayers.tennisScore, 'Crunch Scoreboard', getScoreData(), canvasList, canvas, currentscreenSize)}
                    >
                        Show
                    </button>
                    <button
                        style={{ ...actionBtn, backgroundColor: '#0284c7', color: '#ffffff' }}
                        onClick={() => updateData(templateLayers.tennisScore, 'Crunch Scoreboard', getScoreData(), canvasList, canvas)}
                    >
                        Update Data
                    </button>
                    <button
                        style={{ ...actionBtn, backgroundColor: '#ef4444', color: '#ffffff' }}
                        onClick={() => stopGraphics(templateLayers.tennisScore)}
                    >
                        Stop
                    </button>
                    <button
                        style={{ ...actionBtn, backgroundColor: '#475569', color: '#ffffff' }}
                        onClick={resetData}
                    >
                        Reset Data
                    </button>
                    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12px', cursor: 'pointer', marginLeft: 'auto' }}>
                        <input type="checkbox" checked={autoUpdate} onChange={e => setAutoUpdate(e.target.checked)} />
                        Auto Update
                    </label>
                </div>

                <div style={{ paddingTop: '8px', borderTop: '1px solid #334155' }}>
                    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', cursor: 'pointer', color: '#94a3b8' }}>
                        <input type="checkbox" checked={badminton} onChange={() => setBadminton(val => !val)} />
                        Badminton Mode
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Tennis;
