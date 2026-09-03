import React, { useState } from 'react';
import axios from 'axios';
import * as fabric from 'fabric';
import { FaSearch, FaSpinner, FaPlus, FaImage } from 'react-icons/fa';
import { generateUniqueId, shadowOptions } from './common';

const UnsplashSearch = ({ canvas, darkMode = true }) => {
    const [photos, setPhotos] = useState([]);
    const [searchQuery, setSearchQuery] = useState('nature');
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    const searchPhotos = async (newPage = 1) => {
        if (!searchQuery.trim()) return;
        setLoading(true);
        try {
            const response = await axios.get('https://octopus-app-gzws3.ondigitalocean.app/api/unsplash/search/photos', {
                params: {
                    query: searchQuery,
                    page: newPage,
                },
            });

            if (newPage === 1) {
                setPhotos(response.data.results || []);
            } else {
                setPhotos(prev => [...prev, ...(response.data.results || [])]);
            }
            setPage(newPage);
        } catch (error) {
            console.error('Error fetching photos:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageClick = (photo) => {
        const id = generateUniqueId({ type: "image" });

        if (canvas) {
            const img = new Image();
            img.src = `${photo.urls.regular}`;
            img.crossOrigin = 'Anonymous';
            img.onload = () => {
                const base64Data = getBase64Image(img);
                fabric.FabricImage.fromURL(base64Data).then(fabricImg => {
                    fabricImg.set({
                        left: 50,
                        top: 50,
                        src: base64Data,
                        objectCaching: false,
                        shadow: shadowOptions,
                        id: id,
                        class: id,
                    });
                    canvas.add(fabricImg);
                    canvas.setActiveObject(fabricImg);
                    canvas.renderAll();
                });
            };
        }
    };

    const getBase64Image = (img) => {
        const canvasEl = document.createElement('canvas');
        canvasEl.width = img.width;
        canvasEl.height = img.height;

        const ctx = canvasEl.getContext('2d');
        ctx.drawImage(img, 0, 0, img.width, img.height);

        const dataURL = canvasEl.toDataURL('image/png');
        return dataURL;
    };

    const loadMorePhotos = () => {
        searchPhotos(page + 1);
    };

    const handleSearchInputKeyDown = (e) => {
        if (e.key === 'Enter') {
            searchPhotos(1);
        }
    };

    const theme = {
        cardBg: darkMode ? '#1e293b' : '#ffffff',
        border: darkMode ? '#334155' : '#cbd5e1',
        boxBg: darkMode ? '#0f172a' : '#f8fafc',
        textColor: darkMode ? '#f8fafc' : '#0f172a',
        subTextColor: darkMode ? '#94a3b8' : '#64748b',
        inputBg: darkMode ? '#0f172a' : '#ffffff',
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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <FaImage size={12} /> Unsplash Stock Photos
                    </span>
                    <span style={{ fontSize: '10px', color: theme.subTextColor }}>(Click to add high-res image to canvas)</span>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap' }}>
                <input
                    value={searchQuery}
                    onKeyDown={handleSearchInputKeyDown}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search photos (e.g. nature, studio, background, city)..."
                    style={{
                        flex: 1,
                        minWidth: '160px',
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
                    onClick={() => searchPhotos(1)}
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
                    <span>Search</span>
                </button>
                {photos.length > 0 && (
                    <button
                        onClick={loadMorePhotos}
                        disabled={loading}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            backgroundColor: darkMode ? '#334155' : '#64748b',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '4px',
                            padding: '6px 12px',
                            fontSize: '12px',
                            fontWeight: '600',
                            cursor: loading ? 'not-allowed' : 'pointer',
                        }}
                    >
                        <FaPlus size={10} /> Load More
                    </button>
                )}
            </div>

            {/* Photos Grid */}
            <div
                style={{
                    maxHeight: '160px',
                    minHeight: photos.length > 0 ? '80px' : '0px',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '6px',
                    backgroundColor: theme.boxBg,
                    border: photos.length > 0 ? `1px solid ${theme.border}` : 'none',
                    borderRadius: '6px',
                    padding: photos.length > 0 ? '6px' : '0px',
                }}
            >
                {photos.map((photo, i) => (
                    <div
                        key={i}
                        onClick={() => handleImageClick(photo)}
                        title={photo.alt_description || 'Click to add photo to canvas'}
                        style={{
                            width: '80px',
                            height: '50px',
                            borderRadius: '4px',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            border: `1px solid ${theme.border}`,
                            position: 'relative',
                            transition: 'all 0.15s ease',
                        }}
                    >
                        <img
                            src={photo.urls.thumb}
                            alt={photo.alt_description || 'Photo'}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UnsplashSearch;
