import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { FaSync, FaCrop, FaUndo, FaMoon, FaSun } from 'react-icons/fa';

const Crop = () => {
    const canvas = useSelector((state) => state.canvasReducer.canvas);
    const [darkMode, setDarkMode] = useState(true);
    const [cropValues, setCropValues] = useState({
        cropX: 0,
        cropY: 0,
        width: 200,
        height: 200,
    });

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCropValues((prev) => {
            const updatedValues = { ...prev, [name]: parseInt(value, 10) || 0 };
            applyCrop(updatedValues);
            return updatedValues;
        });
    };

    // Apply cropping whenever crop values change
    const applyCrop = (value) => {
        if (!canvas) return;
        const { cropX, cropY, width, height } = value;
        canvas.getActiveObjects().forEach(element => {
            element.set({
                cropX: parseInt(cropX, 10) || 0,
                cropY: parseInt(cropY, 10) || 0,
                width: parseInt(width, 10) || 0,
                height: parseInt(height, 10) || 0,
            });
            element.setCoords();
        });
        canvas.requestRenderAll();
    };

    const getwidthandHeight = () => {
        if (!canvas) return;
        const element = canvas.getActiveObjects()[0];
        if (element && element.type === 'image') {
            const newValues = {
                cropX: element.cropX || 0,
                cropY: element.cropY || 0,
                width: element.width || 200,
                height: element.height || 200
            };
            setCropValues(newValues);
        }
    };

    const resetValues = () => {
        const zeroValues = { cropX: 0, cropY: 0, width: 1920, height: 1080 };
        setCropValues(zeroValues);
        applyCrop(zeroValues);
    };

    // Theme tokens based on darkMode state
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
        statusBg: darkMode ? '#0f172a' : '#f1f5f9',
    };

    const cardStyle = {
        backgroundColor: theme.cardBg,
        borderRadius: '8px',
        border: `1px solid ${theme.cardBorder}`,
        padding: '14px',
        color: theme.textColor,
        boxShadow: darkMode ? '0 4px 6px -1px rgba(0, 0, 0, 0.2)' : '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        maxWidth: '750px',
        boxSizing: 'border-box',
        marginBottom: '12px',
        transition: 'background-color 0.2s ease, border-color 0.2s ease',
    };

    const controlBoxStyle = {
        backgroundColor: theme.boxBg,
        borderRadius: '6px',
        border: `1px solid ${theme.boxBorder}`,
        padding: '12px',
        marginBottom: '10px',
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
        textAlign: 'center',
        fontWeight: 'bold',
        transition: 'background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease',
    };

    const btnBase = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        padding: '6px 14px',
        borderRadius: '5px',
        border: 'none',
        fontWeight: '600',
        fontSize: '12px',
        cursor: 'pointer',
        color: '#ffffff',
        transition: 'all 0.15s ease',
    };

    return (
        <div style={{ padding: '12px', fontFamily: 'Inter, system-ui, sans-serif', color: theme.textColor, width: '100%', maxHeight: 'calc(100vh - 80px)', overflowY: 'auto', boxSizing: 'border-box' }}>
            
            {/* Header & Main Actions */}
            <div style={cardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '12px', borderBottom: `1px solid ${theme.cardBorder}`, paddingBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <FaCrop /> Fabric.js Image Cropping
                        </span>
                        <span style={{ fontSize: '11px', backgroundColor: theme.badgeBg, padding: '2px 8px', borderRadius: '10px', color: theme.badgeColor }}>
                            Canvas Image Tool
                        </span>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                        {/* Dark Mode Toggle Switch */}
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
                            <span>{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
                        </label>

                        <button
                            style={{ ...btnBase, backgroundColor: '#0284c7' }}
                            onClick={getwidthandHeight}
                            title="Fetch crop coordinates from selected image on canvas"
                        >
                            <FaSync /> Get Active Values
                        </button>
                        <button
                            style={{ ...btnBase, backgroundColor: darkMode ? '#475569' : '#64748b' }}
                            onClick={resetValues}
                            title="Reset crop bounds"
                        >
                            <FaUndo /> Reset
                        </button>
                    </div>
                </div>

                <div style={{ fontSize: '12px', color: theme.subTextColor, marginBottom: '12px' }}>
                    Select an image on the canvas, then adjust the crop offset (<b style={{ color: '#38bdf8' }}>Crop X / Y</b>) and dimensions (<b style={{ color: '#38bdf8' }}>Width / Height</b>) below in real-time.
                </div>

                {/* 4-Directional Crop Control Matrix */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    
                    {/* TOP: Crop Y */}
                    <div style={controlBoxStyle}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                            <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#38bdf8' }}>Top Offset (Crop Y)</span>
                            <span style={{ fontSize: '11px', color: theme.subTextColor }}>-1000px to 1000px</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px', alignItems: 'center', gap: '10px' }}>
                            <input
                                style={{ width: '100%', accentColor: '#38bdf8', cursor: 'pointer' }}
                                onChange={handleInputChange}
                                type="range"
                                name="cropY"
                                min="-1000"
                                max="1000"
                                step="1"
                                value={cropValues.cropY}
                            />
                            <input
                                style={{ ...inputBase, width: '100%' }}
                                type="number"
                                name="cropY"
                                value={cropValues.cropY}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    {/* HORIZONTAL: Left (Crop X) & Width */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px' }}>
                        {/* LEFT: Crop X */}
                        <div style={controlBoxStyle}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                                <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#10b981' }}>Left Offset (Crop X)</span>
                                <span style={{ fontSize: '11px', color: theme.subTextColor }}>-1000px to 1000px</span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px', alignItems: 'center', gap: '10px' }}>
                                <input
                                    style={{ width: '100%', accentColor: '#10b981', cursor: 'pointer' }}
                                    onChange={handleInputChange}
                                    type="range"
                                    name="cropX"
                                    min="-1000"
                                    max="1000"
                                    step="1"
                                    value={cropValues.cropX}
                                />
                                <input
                                    style={{ ...inputBase, width: '100%' }}
                                    type="number"
                                    name="cropX"
                                    value={cropValues.cropX}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        {/* WIDTH */}
                        <div style={controlBoxStyle}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                                <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#f59e0b' }}>Visible Width</span>
                                <span style={{ fontSize: '11px', color: theme.subTextColor }}>-1920px to 1920px</span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px', alignItems: 'center', gap: '10px' }}>
                                <input
                                    style={{ width: '100%', accentColor: '#f59e0b', cursor: 'pointer' }}
                                    onChange={handleInputChange}
                                    type="range"
                                    name="width"
                                    min="-1920"
                                    max="1920"
                                    step="1"
                                    value={cropValues.width}
                                />
                                <input
                                    style={{ ...inputBase, width: '100%' }}
                                    type="number"
                                    name="width"
                                    value={cropValues.width}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* BOTTOM: Height */}
                    <div style={controlBoxStyle}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                            <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#ec4899' }}>Visible Height</span>
                            <span style={{ fontSize: '11px', color: theme.subTextColor }}>-1000px to 1000px</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px', alignItems: 'center', gap: '10px' }}>
                            <input
                                style={{ width: '100%', accentColor: '#ec4899', cursor: 'pointer' }}
                                onChange={handleInputChange}
                                type="range"
                                name="height"
                                min="-1000"
                                max="1000"
                                step="1"
                                value={cropValues.height}
                            />
                            <input
                                style={{ ...inputBase, width: '100%' }}
                                type="number"
                                name="height"
                                value={cropValues.height}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                </div>

                {/* Status Footer */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: theme.statusBg, padding: '8px 12px', borderRadius: '6px', border: `1px solid ${theme.cardBorder}`, marginTop: '6px' }}>
                    <span style={{ fontSize: '11px', color: theme.subTextColor }}>Current Bounds:</span>
                    <span style={{ fontSize: '12px', fontFamily: 'monospace', color: '#38bdf8' }}>
                        X: {cropValues.cropX}px | Y: {cropValues.cropY}px | W: {cropValues.width}px | H: {cropValues.height}px
                    </span>
                </div>

            </div>
        </div>
    );
};

export default Crop;