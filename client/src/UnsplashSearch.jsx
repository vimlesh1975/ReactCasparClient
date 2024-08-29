import React, { useState } from 'react';
import axios from 'axios';
import * as fabric from 'fabric'
import { generateUniqueId, shadowOptions } from './common'

const UnsplashSearch = ({ canvas }) => {
  const [photos, setPhotos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('mobile');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const searchPhotos = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get('https://octopus-app-gzws3.ondigitalocean.app/api/unsplash/search/photos', {
        params: {
          query: searchQuery,
          page: page,
        },
      });

      setPhotos([...response.data.results, ...photos]);
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
      img.crossOrigin = 'Anonymous'; // Enable cross-origin image loading
      img.onload = () => {
        const base64Data = getBase64Image(img);
        fabric.FabricImage.fromURL(base64Data).then(fabricImg => {
          fabricImg.set({
            left: 50,
            top: 50,
            src: base64Data,
            objectCaching: false,
            shadow: shadowOptions,
            id: id, class: id,
          });
          canvas.add(fabricImg);
          canvas.setActiveObject(fabricImg);
          canvas.renderAll();
        });
      };
    }
  };
  const getBase64Image = (img) => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height);

    const dataURL = canvas.toDataURL('image/png');
    return dataURL;
  };
  const loadMorePhotos = () => {
    // Increment the page number and fetch more photos
    const prevPage = page;
    setPage(prevPage + 1);
    searchPhotos(prevPage + 1);
  };

  const handleSearchInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      searchPhotos();
    }
  }

  return (
    <div>
      <div style={{ fontSize: 15, fontWeight: 'bolder' }}>UnsplashSearch API- Search and Click to add on Canvas</div>
      <input
        value={searchQuery}
        onKeyDown={handleSearchInputKeyDown}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for photos..."
      />
      <button disabled={loading} onClick={searchPhotos} >
        {loading ? 'Searching...' : 'Search'}
      </button>
      {loading && <p>Loading...</p>}
      <button onClick={loadMorePhotos} disabled={loading}>
        Load More
      </button>
      <div style={{ display: 'flex', flexWrap: 'wrap', width: 880, maxHeight: 200, overflow: 'auto' }}>
        {photos.map((photo, i) => (
          <img
            title={photo.alt_description}
            key={i}
            src={photo.urls.thumb}
            alt={photo.alt_description || 'Unsplash Photo'}
            onClick={() => handleImageClick(photo)}
            style={{ maxWidth: 100, maxHeight: 80, cursor: 'pointer', margin: '5px' }}
          />
        ))}
      </div>
    </div>
  );
};

export default UnsplashSearch;
