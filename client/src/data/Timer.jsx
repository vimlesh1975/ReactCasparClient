import React, { useState, useEffect, useRef } from 'react';
import { FaPlay, FaStop, FaUndo, FaClock } from 'react-icons/fa';

const Timer = ({ setAndPlay, dataLength, stop, counter, setCounter, darkMode = true }) => {
    const [isActive, setIsActive] = useState(false);
    const [intervalDuration, setIntervalDuration] = useState(3000);
    const intervalId = useRef(null);

    useEffect(() => {
        if (isActive) {
            intervalId.current = setInterval(() => {
                setCounter(prevCounter => {
                    const newCounter = (prevCounter < dataLength - 1) ? prevCounter + 1 : 0;
                    setAndPlay(newCounter);
                    return newCounter;
                });
            }, intervalDuration);
        } else if (intervalId.current) {
            clearInterval(intervalId.current);
        }

        return () => clearInterval(intervalId.current);
    }, [isActive, intervalDuration, setAndPlay, dataLength, setCounter]);

    const handleStart = () => {
        setAndPlay(counter);
        setIsActive(true);
    };

    const handleStop = () => {
        setIsActive(false);
        stop();
    };

    const resetCounter = () => {
        setCounter(0);
    };

    const handleIntervalChange = (e) => {
        setIntervalDuration(Number(e.target.value));
    };

    const handleCounterChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value >= 0 && value < dataLength) {
            setCounter(value);
        }
    };

    const inputBase = {
        backgroundColor: darkMode ? '#0f172a' : '#ffffff',
        border: `1px solid ${darkMode ? '#334155' : '#cbd5e1'}`,
        borderRadius: '4px',
        color: darkMode ? '#ffffff' : '#0f172a',
        padding: '3px 6px',
        fontSize: '12px',
        textAlign: 'center',
        fontWeight: 'bold',
    };

    const btnBase = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px',
        padding: '4px 10px',
        borderRadius: '4px',
        border: 'none',
        fontWeight: '600',
        fontSize: '11px',
        cursor: 'pointer',
        color: '#ffffff',
    };

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '8px',
            backgroundColor: darkMode ? '#0f172a' : '#f8fafc',
            border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
            borderRadius: '6px',
            padding: '8px 12px',
            marginTop: '10px'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <FaClock /> Auto Sequence Playout:
                </span>
                
                <label style={{ fontSize: '11px', color: darkMode ? '#94a3b8' : '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Index:
                    <input
                        type="number"
                        value={counter}
                        onChange={handleCounterChange}
                        min={0}
                        max={Math.max(0, dataLength - 1)}
                        style={{ ...inputBase, width: '45px' }}
                    />
                    <span style={{ fontSize: '10px' }}>/ {Math.max(0, dataLength - 1)}</span>
                </label>

                <label style={{ fontSize: '11px', color: darkMode ? '#94a3b8' : '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Interval (ms):
                    <input
                        type="number"
                        value={intervalDuration}
                        onChange={handleIntervalChange}
                        step="500"
                        min="500"
                        style={{ ...inputBase, width: '60px' }}
                    />
                </label>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <button style={{ ...btnBase, backgroundColor: '#10b981' }} onClick={handleStart} title="Start Auto Playout">
                    <FaPlay /> Start
                </button>
                <button style={{ ...btnBase, backgroundColor: '#ef4444' }} onClick={handleStop} title="Stop Auto Playout">
                    <FaStop /> Stop
                </button>
                <button style={{ ...btnBase, backgroundColor: darkMode ? '#334155' : '#64748b' }} onClick={resetCounter} title="Reset to Index 0">
                    <FaUndo /> Reset
                </button>

                <span style={{
                    fontSize: '11px',
                    fontWeight: 'bold',
                    padding: '2px 8px',
                    borderRadius: '10px',
                    backgroundColor: isActive ? '#065f46' : (darkMode ? '#334155' : '#e2e8f0'),
                    color: isActive ? '#34d399' : (darkMode ? '#94a3b8' : '#64748b'),
                }}>
                    {isActive ? '● Running' : '○ Idle'}
                </span>
            </div>
        </div>
    );
};

export default Timer;
