/**
 * Aquatics - Diving (DV) Broadcast Graphic Templates for games2
 * Focus: DV002 Venue ID Template
 * Exact Reference Match:
 *  - Exact Gun-Shaped Layout matching swimming2.js
 *  - Official 1-to-1 London 2012 / OBS Diving Pike-Position Pictograph Logo
 */

import * as fabric from 'fabric';
import { generateUniqueId } from '../../common';

/**
 * Helper function to create a unified, named Olympic Rings Group in Fabric.js
 */
export function createOlympicRingsGroup(left = 0, top = 0, radius = 13, strokeWidth = 2.8, options = {}) {
  const scale = radius / 9;
  const dx1 = 16 * scale;
  const dx2 = 32 * scale;
  const dx3 = 8 * scale;
  const dx4 = 24 * scale;
  const dy = 8 * scale;

  const c1 = new fabric.Circle({ left: 0, top: 0, radius, fill: '', stroke: '#ffffff', strokeWidth });
  const c2 = new fabric.Circle({ left: dx1, top: 0, radius, fill: '', stroke: '#ffffff', strokeWidth });
  const c3 = new fabric.Circle({ left: dx2, top: 0, radius, fill: '', stroke: '#ffffff', strokeWidth });
  const c4 = new fabric.Circle({ left: dx3, top: dy, radius, fill: '', stroke: '#ffffff', strokeWidth });
  const c5 = new fabric.Circle({ left: dx4, top: dy, radius, fill: '', stroke: '#ffffff', strokeWidth });

  return new fabric.Group([c1, c2, c3, c4, c5], {
    left,
    top,
    id: generateUniqueId({ type: 'olympicRings' }),
    name: 'Olympic Logo',
    selectable: true,
    hasControls: true,
    ...options
  });
}

const olympicRingsSVG = `
  <svg class="olympic-rings" viewBox="0 0 100 45" width="70" height="32" style="fill:none; stroke:#ffffff; stroke-width:3.5;">
    <circle cx="15" cy="16" r="11"/>
    <circle cx="38" cy="16" r="11"/>
    <circle cx="61" cy="16" r="11"/>
    <circle cx="84" cy="16" r="11"/>
    <circle cx="26.5" cy="27" r="11"/>
    <circle cx="49.5" cy="27" r="11"/>
    <circle cx="72.5" cy="27" r="11"/>
  </svg>
`;

/**
 * 1-to-1 London 2012 / OBS Diving Pictograph SVG (Pike Pose + Water Waves)
 */
const officialDivingPictographSVG = `
  <svg viewBox="0 0 100 100" width="48" height="48" fill="#ffffff" style="display:block;">
    <path d="M 40 78 L 40 25 C 40 12, 68 10, 72 30 L 68 48 C 65 52, 58 52, 54 46 L 50 32 C 48 24, 46 24, 46 30 L 46 78 Z" fill="#ffffff" />
    <path d="M 64 48 C 56 48, 54 58, 62 66 C 68 72, 74 68, 74 58 C 74 50, 70 48, 64 48 Z" fill="#ffffff" />
    <path d="M 10 92 Q 22 87, 34 92 T 58 92 T 82 92" stroke="#ffffff" stroke-width="4" stroke-linecap="round" fill="none"/>
  </svg>
`;

/**
 * Fabric.js Vector Generator for Diving DV002 Venue ID (Exact Gun-Shaped Layout)
 */
export async function generateDiving2Fabric(
  templateId = '',
  customData = {},
  styleOptions = {}
) {
  const normId = (templateId || '').toUpperCase();
  const primaryColor = customData.primaryColor || styleOptions.primaryColor || '#005b96';

  const gradientStart = '#061325';
  const gradientMid = primaryColor;
  const gradientEnd = '#031526';
  const borderHighlight = 'rgba(255,255,255,0.35)';

  const objects = [];
  const createProps = (type, customProps = {}) => ({
    id: generateUniqueId({ type }),
    name: `${type.charAt(0).toUpperCase() + type.slice(1)} Object`,
    selectable: true,
    hasControls: true,
    ...customProps
  });

  const venueStr = (customData.venue || 'AQUATICS CENTRE').toUpperCase();

  // 1. Exact Gun-Shaped Vector Path from swimming2.js
  const gunPathData = 'M 45 0 L 860 0 C 865 0, 870 3, 872 8 L 888 44 C 890 49, 887 54, 882 54 L 140 54 L 115 88 C 112 92, 106 95, 100 95 L 10 95 C 4 95, 0 90, 2 84 L 22 42 L 35 6 C 37 2, 41 0, 45 0 Z';

  const gunGradient = new fabric.Gradient({
    type: 'linear',
    gradientUnits: 'pixels',
    coords: { x1: 0, y1: 0, x2: 890, y2: 0 },
    colorStops: [
      { offset: 0, color: gradientStart },
      { offset: 0.4, color: gradientMid },
      { offset: 1, color: gradientEnd }
    ]
  });

  const gunBody = new fabric.Path(gunPathData, createProps('path', {
    left: 240, top: 755,
    fill: gunGradient,
    stroke: borderHighlight,
    strokeWidth: 2,
    shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.7)', blur: 15, offsetX: 0, offsetY: 8 })
  }));
  objects.push(gunBody);

  // 2. Exact Diving Pike Pictograph Logo in Lower Stock Handle
  const pikeBody = new fabric.Path('M 40 78 L 40 25 C 40 12, 68 10, 72 30 L 68 48 C 65 52, 58 52, 54 46 L 50 32 C 48 24, 46 24, 46 30 L 46 78 Z', {
    left: 278, top: 770, fill: '#ffffff', selectable: false
  });
  const headHeart = new fabric.Path('M 64 48 C 56 48, 54 58, 62 66 C 68 72, 74 68, 74 58 C 74 50, 70 48, 64 48 Z', {
    left: 295, top: 792, fill: '#ffffff', selectable: false
  });
  const waterWaves = new fabric.Path('M 10 92 Q 22 87, 34 92 T 58 92 T 82 92', {
    left: 265, top: 825, fill: '', stroke: '#ffffff', strokeWidth: 3.5, strokeLineCap: 'round', selectable: false
  });

  const divingLogoGroup = new fabric.Group([pikeBody, headHeart, waterWaves], {
    left: 265, top: 770,
    id: generateUniqueId({ type: 'divingLogo' }),
    name: 'Official Diving Pike Logo',
    selectable: true, hasControls: true
  });
  objects.push(divingLogoGroup);

  // 3. Venue Title Text on Upper Barrel of Gun-Shape
  const titleText = new fabric.Textbox(venueStr, createProps('textbox', {
    left: 395, top: 764, fontSize: 30, fontWeight: '900', fontStyle: 'italic',
    fill: '#ffffff', width: 610, charSpacing: 90
  }));
  objects.push(titleText);

  // 4. Olympic Rings Logo Group on Far Right of Gun-Barrel
  const olympicRings = createOlympicRingsGroup(1045, 770, 9, 2.2);
  objects.push(olympicRings);

  const group = new fabric.Group(objects, {
    left: 328, top: 840,
    scaleX: 1.427, scaleY: 1.258,
    id: generateUniqueId({ type: 'divingGroup' }),
    name: `DV002 Venue ID (${normId})`,
    selectable: true, hasControls: true
  });

  return group;
}

/**
 * HTML Broadcast Overlay Generator for Diving DV002 Venue ID
 */
export function generateDiving2HTML(
  templateId = '',
  customData = {},
  styleOptions = {}
) {
  const font = styleOptions.fontFamily || "'Outfit', 'Roboto Condensed', 'Segoe UI', sans-serif";
  const venueStr = (customData.venue || 'AQUATICS CENTRE').toUpperCase();

  const primaryColor = customData.primaryColor || styleOptions.primaryColor || '#005b96';

  const gradientStart = '#061325';
  const gradientMid = primaryColor;
  const gradientEnd = '#031526';
  const borderHighlight = 'rgba(255,255,255,0.35)';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,800;1,900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

        .gun-banner-container {
          position: absolute;
          bottom: 220px;
          left: 240px;
          width: 890px;
          height: 95px;
          filter: drop-shadow(0 10px 20px rgba(0,0,0,0.7));
        }

        .gun-banner-body {
          position: absolute;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, ${gradientStart} 0%, ${gradientMid} 45%, ${gradientEnd} 100%);
          clip-path: polygon(
            45px 0px, 860px 0px, 888px 44px, 882px 54px,
            140px 54px, 115px 88px, 100px 95px, 10px 95px,
            2px 84px, 22px 42px, 35px 6px
          );
          border: 2px solid ${borderHighlight};
        }

        .aquatics-logo {
          position: absolute;
          left: 32px;
          bottom: 6px;
          z-index: 2;
        }

        .gun-barrel-title {
          position: absolute;
          left: 155px;
          top: 8px;
          font-size: 32px;
          font-weight: 900;
          font-style: italic;
          letter-spacing: 2px;
          color: #ffffff;
          text-transform: uppercase;
          white-space: nowrap;
          z-index: 2;
        }

        .rings-wrapper {
          position: absolute;
          right: 25px;
          top: 12px;
          z-index: 2;
        }
      </style>
    </head>
    <body>
      <div class="gun-banner-container">
        <div class="gun-banner-body"></div>
        <div class="aquatics-logo">
          ${officialDivingPictographSVG}
        </div>
        <div class="gun-barrel-title">${venueStr}</div>
        <div class="rings-wrapper">
          ${olympicRingsSVG}
        </div>
      </div>
    </body>
    </html>
  `;
}
