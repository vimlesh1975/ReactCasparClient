import React, { useState } from 'react';
import axios from 'axios';
import { FaSearch, FaSpinner, FaKey, FaExclamationTriangle } from 'react-icons/fa';
import { importSvgCode } from './common';

const IconFinder = ({ canvas, darkMode = true }) => {
    const [icons, setIcons] = useState([]);
    const [searchQuery, setSearchQuery] = useState('mobile');
    const [loading, setLoading] = useState(false);
    const [provider, setProvider] = useState('iconify'); // 'iconify' | 'iconfinder'
    const [customApiKey, setCustomApiKey] = useState('');
    const [showKeyInput, setShowKeyInput] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [iconSize, setIconSize] = useState(120); // Default placement dimension in px

    const iconfinderProxyUrl = 'https://octopus-app-gzws3.ondigitalocean.app/api/iconfinder';

    const fetchIconifyIcons = async () => {
        setLoading(true);
        setErrorMessage('');
        try {
            const res = await axios.get(`https://api.iconify.design/search?query=${encodeURIComponent(searchQuery)}&limit=36`);
            const iconNames = res.data.icons || [];

            if (iconNames.length === 0) {
                setErrorMessage(`No icons found for "${searchQuery}". Try another keyword.`);
                setIcons([]);
                return;
            }

            const iconsData = await Promise.all(
                iconNames.map(async (fullName) => {
                    const [prefix, name] = fullName.split(':');
                    const svgUrl = `https://api.iconify.design/${prefix}/${name}.svg`;
                    try {
                        const svgRes = await fetch(svgUrl);
                        const svgContent = await svgRes.text();
                        return {
                            id: fullName,
                            name: name || fullName,
                            source: 'Iconify',
                            svgContent: svgContent,
                        };
                    } catch (e) {
                        return null;
                    }
                })
            );

            setIcons(iconsData.filter(Boolean));
        } catch (err) {
            console.error('Error fetching Iconify icons:', err);
            setErrorMessage('Failed to search Iconify icons. Check internet connection.');
        } finally {
            setLoading(false);
        }
    };

    const fetchIconfinderIcons = async () => {
        setLoading(true);
        setErrorMessage('');

        try {
            let resData;
            if (customApiKey.trim()) {
                // Direct request using user's custom API key
                const response = await axios.get('https://api.iconfinder.com/v4/icons/search', {
                    params: { query: searchQuery, count: 25 },
                    headers: { Authorization: `Bearer ${customApiKey.trim()}` },
                });
                resData = response.data;
            } else {
                // Request via backend proxy
                const response = await axios.get(iconfinderProxyUrl, {
                    params: { query: searchQuery },
                });
                resData = response.data;
            }

            const nonPremiumIcons = (resData.icons || [])
                .filter((icon) => !icon.is_premium)
                .filter((icon) => icon.vector_sizes && icon.vector_sizes.length > 0);

            if (nonPremiumIcons.length === 0) {
                setErrorMessage('No free vector icons found on Iconfinder. Try searching with Open Vector Icons (Iconify) instead.');
                setIcons([]);
                return;
            }

            const iconsWithSvg = await Promise.all(
                nonPremiumIcons.map(async (icon) => {
                    const downloadUrl = icon.vector_sizes[0].formats[0].download_url;
                    let svgContent = '';
                    if (customApiKey.trim()) {
                        const svgRes = await fetch(downloadUrl, {
                            headers: { Authorization: `Bearer ${customApiKey.trim()}` },
                        });
                        svgContent = await svgRes.text();
                    } else {
                        const svgRes = await fetch('https://octopus-app-gzws3.ondigitalocean.app/api/iconfinder/getSvg', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ svgUrl: downloadUrl }),
                        });
                        svgContent = await svgRes.text();
                    }

                    return {
                        id: icon.icon_id,
                        name: `icon-${icon.icon_id}`,
                        source: 'Iconfinder',
                        svgContent: svgContent,
                    };
                })
            );

            setIcons(iconsWithSvg.filter(Boolean));
        } catch (error) {
            console.error('Error fetching Iconfinder icons:', error);
            const status = error.response ? error.response.status : null;
            if (status === 500 || status === 401) {
                setErrorMessage('Iconfinder API Error: Backend server API key is missing, expired, or invalid. Enter your custom API key or use "Open Vector Icons" above.');
            } else {
                setErrorMessage(`Iconfinder Error: ${error.message}`);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        if (!searchQuery.trim()) return;
        if (provider === 'iconify') {
            fetchIconifyIcons();
        } else {
            fetchIconfinderIcons();
        }
    };

    const handleIconClick = (icon) => {
        const { svgContent } = icon;
        if (svgContent && canvas) {
            importSvgCode(svgContent, canvas, iconSize);
        }
    };

    const handleSearchInputKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const theme = {
        cardBg: darkMode ? '#1e293b' : '#ffffff',
        border: darkMode ? '#334155' : '#cbd5e1',
        boxBg: darkMode ? '#0f172a' : '#f8fafc',
        textColor: darkMode ? '#f8fafc' : '#0f172a',
        subTextColor: darkMode ? '#94a3b8' : '#64748b',
        inputBg: darkMode ? '#0f172a' : '#ffffff',
        itemBg: darkMode ? '#0f172a' : '#ffffff',
    };

    return (
        <div style={{
            backgroundColor: theme.cardBg,
            border: `1px solid ${theme.border}`,
            borderRadius: '8px',
            padding: '10px 12px',
            marginBottom: '10px',
            boxSizing: 'border-box'
        }}>
            {/* Header & Provider Selector */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <FaSearch size={12} /> Online Vector Icons Search
                    </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                    {/* Size Selector */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: theme.boxBg, padding: '2px 6px', borderRadius: '6px', border: `1px solid ${theme.border}` }}>
                        <span style={{ fontSize: '10px', color: theme.subTextColor }}>Size:</span>
                        {[60, 120, 200, 300].map((sz) => (
                            <button
                                key={sz}
                                onClick={() => setIconSize(sz)}
                                style={{
                                    border: 'none',
                                    backgroundColor: iconSize === sz ? '#0284c7' : 'transparent',
                                    color: iconSize === sz ? '#ffffff' : theme.subTextColor,
                                    padding: '1px 5px',
                                    borderRadius: '3px',
                                    fontSize: '9px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                }}
                            >
                                {sz}px
                            </button>
                        ))}
                    </div>

                    {/* Source Switcher */}
                    <div style={{ display: 'flex', backgroundColor: theme.boxBg, padding: '2px', borderRadius: '6px', border: `1px solid ${theme.border}` }}>
                        <button
                            onClick={() => setProvider('iconify')}
                            style={{
                                border: 'none',
                                backgroundColor: provider === 'iconify' ? '#0284c7' : 'transparent',
                                color: provider === 'iconify' ? '#ffffff' : theme.subTextColor,
                                padding: '2px 8px',
                                borderRadius: '4px',
                                fontSize: '10px',
                                fontWeight: '600',
                                cursor: 'pointer',
                            }}
                            title="200k+ Free Open Source Icons (No API key required)"
                        >
                            Open Icons (Iconify)
                        </button>
                        <button
                            onClick={() => setProvider('iconfinder')}
                            style={{
                                border: 'none',
                                backgroundColor: provider === 'iconfinder' ? '#0284c7' : 'transparent',
                                color: provider === 'iconfinder' ? '#ffffff' : theme.subTextColor,
                                padding: '2px 8px',
                                borderRadius: '4px',
                                fontSize: '10px',
                                fontWeight: '600',
                                cursor: 'pointer',
                            }}
                            title="Iconfinder API (Requires API Key)"
                        >
                            Iconfinder API
                        </button>
                    </div>

                    {provider === 'iconfinder' && (
                        <button
                            onClick={() => setShowKeyInput(val => !val)}
                            style={{
                                border: `1px solid ${theme.border}`,
                                backgroundColor: showKeyInput ? '#0284c7' : theme.boxBg,
                                color: showKeyInput ? '#ffffff' : theme.textColor,
                                padding: '3px 6px',
                                borderRadius: '4px',
                                fontSize: '11px',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                            }}
                            title="Set custom Iconfinder API Key"
                        >
                            <FaKey size={10} /> Key
                        </button>
                    )}
                </div>
            </div>

            {/* Optional Custom API Key Row for Iconfinder */}
            {provider === 'iconfinder' && showKeyInput && (
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '8px', backgroundColor: theme.boxBg, padding: '6px 8px', borderRadius: '4px', border: `1px solid ${theme.border}` }}>
                    <span style={{ fontSize: '11px', color: theme.subTextColor, whiteSpace: 'nowrap' }}>API Key:</span>
                    <input
                        type="password"
                        value={customApiKey}
                        onChange={e => setCustomApiKey(e.target.value)}
                        placeholder="Paste your Iconfinder API Token here..."
                        style={{
                            flex: 1,
                            backgroundColor: theme.inputBg,
                            border: `1px solid ${theme.border}`,
                            borderRadius: '4px',
                            padding: '3px 6px',
                            color: theme.textColor,
                            fontSize: '11px',
                            outline: 'none',
                        }}
                    />
                </div>
            )}

            {/* Search Input Bar */}
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '8px' }}>
                <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearchInputKeyDown}
                    placeholder={`Search ${provider === 'iconify' ? '200,000+ free open vector icons' : 'Iconfinder vector icons'} (e.g. user, arrow, star, sound)...`}
                    style={{
                        flex: 1,
                        backgroundColor: theme.inputBg,
                        border: `1px solid ${theme.border}`,
                        borderRadius: '4px',
                        padding: '5px 8px',
                        color: theme.textColor,
                        fontSize: '12px',
                        outline: 'none',
                    }}
                />
                <button
                    disabled={loading}
                    onClick={handleSearch}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        backgroundColor: '#0284c7',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '6px 12px',
                        fontSize: '12px',
                        fontWeight: '600',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        opacity: loading ? 0.7 : 1,
                    }}
                >
                    {loading ? <FaSpinner className="fa-spin" /> : <FaSearch />}
                    <span>{loading ? 'Searching...' : 'Search'}</span>
                </button>
            </div>

            {/* Error / Diagnostic Alert */}
            {errorMessage && (
                <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '6px',
                    padding: '6px 10px',
                    borderRadius: '4px',
                    backgroundColor: darkMode ? '#451a1a' : '#fee2e2',
                    border: '1px solid #ef4444',
                    color: darkMode ? '#fca5a5' : '#991b1b',
                    fontSize: '11px',
                    marginBottom: '8px',
                }}>
                    <FaExclamationTriangle style={{ marginTop: '2px', flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                        <span>{errorMessage}</span>
                        {provider === 'iconfinder' && (
                            <button
                                onClick={() => {
                                    setProvider('iconify');
                                    fetchIconifyIcons();
                                }}
                                style={{
                                    marginLeft: '8px',
                                    backgroundColor: '#0284c7',
                                    color: '#ffffff',
                                    border: 'none',
                                    borderRadius: '3px',
                                    padding: '2px 6px',
                                    fontSize: '10px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                }}
                            >
                                Switch to Open Icons (Iconify)
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Icons Grid */}
            <div
                style={{
                    maxHeight: '160px',
                    minHeight: icons.length > 0 ? '60px' : '0px',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '6px',
                    backgroundColor: theme.boxBg,
                    border: icons.length > 0 ? `1px solid ${theme.border}` : 'none',
                    borderRadius: '6px',
                    padding: icons.length > 0 ? '6px' : '0px',
                }}
            >
                {icons.map((icon, i) => (
                    <div
                        key={i}
                        onClick={() => handleIconClick(icon)}
                        title={`Click to add "${icon.name || icon.id}" to Canvas`}
                        style={{
                            width: '42px',
                            height: '42px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: theme.itemBg,
                            border: `1px solid ${theme.border}`,
                            borderRadius: '4px',
                            cursor: 'pointer',
                            padding: '4px',
                            boxSizing: 'border-box',
                            transition: 'all 0.15s ease',
                        }}
                    >
                        <div
                            style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            dangerouslySetInnerHTML={{ __html: icon.svgContent }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IconFinder;
