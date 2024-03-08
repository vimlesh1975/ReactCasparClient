import React, { useState } from 'react';
import axios from 'axios';
// import { fabric } from 'fabric';

import { importSvgCode } from './common'


const IconFinder = ({ canvas }) => {
    const [icons, setIcons] = useState([]);
    const [searchQuery, setSearchQuery] = useState('mobile');
    const [loading, setLoading] = useState(false);

    const apiUrl = 'https://octopus-app-gzws3.ondigitalocean.app/api/iconfinder'; // Update this with your actual API endpoint

    const fetchIcons = async () => {
        setLoading(true);

        try {
            const response = await axios.get(apiUrl, {
                params: { query: searchQuery },
            });

            const nonPremiumIcons = response.data.icons
                .filter((icon) => !icon.is_premium)
                .filter((icon) => icon.vector_sizes && icon.vector_sizes.length > 0); // Exclude icons without vector_sizes[0]
            // console.log(nonPremiumIcons)

            // Fetch SVG content for each icon and add it to the icon object
            const iconsWithSvg = await Promise.all(
                nonPremiumIcons.map(async (icon) => {
                    const svgResponse = await fetchSvgContent(icon.vector_sizes[0].formats[0].download_url);
                    return {
                        id: icon.icon_id,
                        url: icon.raster_sizes[0].formats[0].preview_url,
                        svg_url: icon.vector_sizes[0].formats[0].download_url,
                        svgContent: svgResponse,
                    };
                })
            );

            setIcons([...iconsWithSvg, ...icons]);
        } catch (error) {
            console.error('Error fetching icons:', error);
        } finally {
            setLoading(false);
        }
    };
    const fetchSvgContent = async (svgUrl) => {
        try {
            const response = await fetch('https://octopus-app-gzws3.ondigitalocean.app/api/iconfinder/getSvg', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ svgUrl }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return response.text();
        } catch (error) {
            console.error('Error fetching SVG:', error);
            return null;
        }
    };

    const handleIconClick = (icon) => {
        const { svgContent } = icon;

        importSvgCode(svgContent, canvas)

    }
    const handleSearchInputKeyDown = (e) => {
        if (e.key === 'Enter') {
            fetchIcons();
        }
    };
    return (
        <div>
            <div style={{ fontSize: 15, fontWeight: 'bolder' }}>Iconfinder API- Search and Click to add on Canvas- Icons may be added as very small at left top corner</div>
            <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={handleSearchInputKeyDown} />
            <button disabled={loading} onClick={fetchIcons}>
                {loading ? 'Searching...' : 'Search'}
            </button>
            {loading && <p>Loading...</p>}
            <div style={{ width: 880, maxHeight: 150, overflow: 'auto' }}>
                {icons.map((icon, i) => (
                    <img src={`data:image/svg+xml,${encodeURIComponent(icon.svgContent)}`} style={{ maxWidth: 40, maxHeight: 40, cursor: 'pointer' }} id={icon.id} key={i} alt={`Icon ${icon.id}`} onClick={() => handleIconClick(icon)} />
                ))}
            </div>
        </div>
    );
};

export default IconFinder;
