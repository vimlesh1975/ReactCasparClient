import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { FaMoon, FaSun, FaShapes, FaSearch } from 'react-icons/fa';

import { animal } from './shapelib/animal.js';
import { arrow } from './shapelib/arrow.js';
import { basic } from './shapelib/basic.js';
import { dialog_balloon } from './shapelib/dialog_balloon.js';
import { electronics } from './shapelib/electronics.js';
import { flowchart } from './shapelib/flowchart.js';
import { game } from './shapelib/game.js';
import { math } from './shapelib/math.js';
import { misc } from './shapelib/misc.js';
import { music } from './shapelib/music.js';
import { object } from './shapelib/object.js';
import { raphael_1 } from './shapelib/raphael_1.js';
import { raphael_2 } from './shapelib/raphael_2.js';
import { symbol } from './shapelib/symbol.js';

import { createShape } from './common';
import IconFinder from './IconFinderApi.jsx';
import UnsplashSearch from './UnsplashSearch.jsx';

const shapeLibs = {
    basic: { name: 'Basic', data: basic.data, size: 0.4 },
    animal: { name: 'Animals', data: animal.data, size: 0.4 },
    arrow: { name: 'Arrows', data: arrow.data, size: 0.4 },
    dialog_balloon: { name: 'Dialog Balloons', data: dialog_balloon.data, size: 0.4 },
    electronics: { name: 'Electronics', data: electronics.data, size: 0.4 },
    flowchart: { name: 'Flowchart', data: flowchart.data, size: 0.4 },
    game: { name: 'Games', data: game.data, size: 0.4 },
    math: { name: 'Math', data: math.data, size: 0.4 },
    misc: { name: 'Misc', data: misc.data, size: 0.4 },
    music: { name: 'Music', data: music.data, size: 0.4 },
    object: { name: 'Objects', data: object.data, size: 0.4 },
    raphael_1: { name: 'Raphael 1', data: raphael_1.data, size: 3 },
    raphael_2: { name: 'Raphael 2', data: raphael_2.data, size: 3 },
    symbol: { name: 'Symbols', data: symbol.data, size: 0.4 },
};

const Shapes = () => {
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const [darkMode, setDarkMode] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [shapeSearch, setShapeSearch] = useState('');
    const [activeTab, setActiveTab] = useState('shapes'); // 'shapes' | 'icons' | 'unsplash'

    const theme = {
        cardBg: darkMode ? '#1e293b' : '#ffffff',
        cardBorder: darkMode ? '#334155' : '#cbd5e1',
        boxBg: darkMode ? '#0f172a' : '#f8fafc',
        boxBorder: darkMode ? '#334155' : '#e2e8f0',
        inputBg: darkMode ? '#0f172a' : '#ffffff',
        textColor: darkMode ? '#f8fafc' : '#0f172a',
        subTextColor: darkMode ? '#94a3b8' : '#64748b',
        shapeFill: darkMode ? '#38bdf8' : '#0284c7',
        badgeBg: darkMode ? '#334155' : '#e2e8f0',
        itemBg: darkMode ? '#1e293b' : '#ffffff',
        itemHover: darkMode ? '#334155' : '#e0f2fe',
    };

    const cardStyle = {
        backgroundColor: theme.cardBg,
        borderRadius: '8px',
        border: `1px solid ${theme.cardBorder}`,
        padding: '10px 12px',
        color: theme.textColor,
        boxSizing: 'border-box',
    };

    // Filter shapes based on selected category and search term
    const filteredCategories = useMemo(() => {
        const query = shapeSearch.trim().toLowerCase();
        const result = {};

        Object.keys(shapeLibs).forEach((catKey) => {
            if (selectedCategory !== 'all' && selectedCategory !== catKey) {
                return;
            }

            const lib = shapeLibs[catKey];
            const matchingShapes = {};

            Object.entries(lib.data).forEach(([shapeName, shapePath]) => {
                if (!query || shapeName.toLowerCase().includes(query)) {
                    matchingShapes[shapeName] = shapePath;
                }
            });

            if (Object.keys(matchingShapes).length > 0) {
                result[catKey] = {
                    ...lib,
                    filteredData: matchingShapes,
                };
            }
        });

        return result;
    }, [selectedCategory, shapeSearch]);

    return (
        <div style={{
            padding: '10px',
            fontFamily: 'Inter, system-ui, sans-serif',
            color: theme.textColor,
            width: '100%',
            maxWidth: '100%',
            minWidth: 0,
            height: 'calc(100vh - 80px)',
            display: 'flex',
            flexDirection: 'column',
            boxSizing: 'border-box',
            overflowY: 'auto',
            overflowX: 'hidden'
        }}>
            {/* Header & Controls Card */}
            <div style={{ ...cardStyle, marginBottom: '10px', flexShrink: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '8px', borderBottom: `1px solid ${theme.cardBorder}`, paddingBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <FaShapes /> Shapes & Vector Media
                        </span>
                        <span style={{ fontSize: '11px', color: theme.subTextColor }}>(Click any item to add to Canvas)</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {/* Section Switcher Tabs */}
                        <div style={{ display: 'flex', backgroundColor: theme.boxBg, padding: '2px', borderRadius: '6px', border: `1px solid ${theme.cardBorder}` }}>
                            <button
                                onClick={() => setActiveTab('shapes')}
                                style={{
                                    border: 'none',
                                    backgroundColor: activeTab === 'shapes' ? '#0284c7' : 'transparent',
                                    color: activeTab === 'shapes' ? '#ffffff' : theme.subTextColor,
                                    padding: '3px 8px',
                                    borderRadius: '4px',
                                    fontSize: '11px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                }}
                            >
                                Shapes
                            </button>
                            <button
                                onClick={() => setActiveTab('icons')}
                                style={{
                                    border: 'none',
                                    backgroundColor: activeTab === 'icons' ? '#0284c7' : 'transparent',
                                    color: activeTab === 'icons' ? '#ffffff' : theme.subTextColor,
                                    padding: '3px 8px',
                                    borderRadius: '4px',
                                    fontSize: '11px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                }}
                            >
                                IconFinder
                            </button>
                            <button
                                onClick={() => setActiveTab('unsplash')}
                                style={{
                                    border: 'none',
                                    backgroundColor: activeTab === 'unsplash' ? '#0284c7' : 'transparent',
                                    color: activeTab === 'unsplash' ? '#ffffff' : theme.subTextColor,
                                    padding: '3px 8px',
                                    borderRadius: '4px',
                                    fontSize: '11px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                }}
                            >
                                Unsplash
                            </button>
                        </div>

                        {/* Dark Mode Switch */}
                        <label
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                fontSize: '11px',
                                cursor: 'pointer',
                                padding: '3px 8px',
                                borderRadius: '16px',
                                backgroundColor: theme.boxBg,
                                border: `1px solid ${theme.cardBorder}`,
                                color: theme.textColor,
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
                            <span>{darkMode ? 'Dark' : 'Light'}</span>
                        </label>
                    </div>
                </div>

                {/* Sub-panels when Icons or Unsplash tab is active */}
                {activeTab === 'icons' && <IconFinder canvas={canvas} darkMode={darkMode} />}
                {activeTab === 'unsplash' && <UnsplashSearch canvas={canvas} darkMode={darkMode} />}

                {/* Vector Shapes Search & Category Pills (Shown when shapes or all are selected) */}
                {activeTab === 'shapes' && (
                    <div>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: 1, backgroundColor: theme.boxBg, border: `1px solid ${theme.cardBorder}`, borderRadius: '4px', padding: '3px 8px' }}>
                                <FaSearch size={11} color={theme.subTextColor} />
                                <input
                                    type="text"
                                    value={shapeSearch}
                                    onChange={e => setShapeSearch(e.target.value)}
                                    placeholder="Search vector shapes by name (e.g. star, arrow, bubble, heart)..."
                                    style={{
                                        border: 'none',
                                        background: 'transparent',
                                        color: theme.textColor,
                                        fontSize: '11px',
                                        width: '100%',
                                        outline: 'none',
                                    }}
                                />
                            </div>
                        </div>

                        {/* Category Filter Pills */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                            <button
                                onClick={() => setSelectedCategory('all')}
                                style={{
                                    border: `1px solid ${selectedCategory === 'all' ? '#0284c7' : theme.cardBorder}`,
                                    backgroundColor: selectedCategory === 'all' ? '#0284c7' : theme.boxBg,
                                    color: selectedCategory === 'all' ? '#ffffff' : theme.subTextColor,
                                    padding: '2px 8px',
                                    borderRadius: '12px',
                                    fontSize: '10px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                }}
                            >
                                All Shapes
                            </button>
                            {Object.entries(shapeLibs).map(([catKey, lib]) => (
                                <button
                                    key={catKey}
                                    onClick={() => setSelectedCategory(catKey)}
                                    style={{
                                        border: `1px solid ${selectedCategory === catKey ? '#0284c7' : theme.cardBorder}`,
                                        backgroundColor: selectedCategory === catKey ? '#0284c7' : theme.boxBg,
                                        color: selectedCategory === catKey ? '#ffffff' : theme.subTextColor,
                                        padding: '2px 8px',
                                        borderRadius: '12px',
                                        fontSize: '10px',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {lib.name}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Vector Shapes Library Grid */}
            {activeTab === 'shapes' && (
                <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', paddingRight: '4px' }}>
                    {Object.entries(filteredCategories).length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '30px', color: theme.subTextColor, fontSize: '12px' }}>
                            No vector shapes found matching "{shapeSearch}".
                        </div>
                    ) : (
                        Object.entries(filteredCategories).map(([catKey, lib]) => (
                            <div key={catKey} style={{ ...cardStyle, marginBottom: '10px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', borderBottom: `1px solid ${theme.cardBorder}`, paddingBottom: '4px' }}>
                                    <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                        {lib.name}
                                    </span>
                                    <span style={{ fontSize: '10px', color: theme.subTextColor }}>
                                        {Object.keys(lib.filteredData).length} items
                                    </span>
                                </div>

                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                    {Object.entries(lib.filteredData).map(([shapeName, shapePath]) => (
                                        <button
                                            key={shapeName}
                                            onClick={() => createShape(canvas, shapePath, lib.size)}
                                            title={`Add ${shapeName} to Canvas`}
                                            style={{
                                                width: '72px',
                                                height: '68px',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '2px',
                                                backgroundColor: theme.boxBg,
                                                border: `1px solid ${theme.boxBorder}`,
                                                borderRadius: '6px',
                                                cursor: 'pointer',
                                                padding: '4px',
                                                boxSizing: 'border-box',
                                                color: theme.textColor,
                                                transition: 'all 0.15s ease',
                                            }}
                                        >
                                            <div style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                {catKey.startsWith('raphael') ? (
                                                    <svg style={{ width: '28px', height: '28px' }} viewBox="0 0 40 40">
                                                        <path d={shapePath} fill={theme.shapeFill} />
                                                    </svg>
                                                ) : (
                                                    <svg style={{ width: '32px', height: '32px' }} viewBox="0 0 400 400">
                                                        <path d={shapePath} fill={theme.shapeFill} />
                                                    </svg>
                                                )}
                                            </div>
                                            <span style={{
                                                fontSize: '9px',
                                                color: theme.subTextColor,
                                                width: '100%',
                                                textAlign: 'center',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                            }}>
                                                {shapeName}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default Shapes;
