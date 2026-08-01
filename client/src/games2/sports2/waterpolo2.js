import * as fabric from 'fabric';
import { generateUniqueId } from '../../common';
import { createFabricFlagObject, getFlagImgHtml } from '../flagHelpers';

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
  <svg class="olympic-rings" viewBox="0 0 100 45" width="90" height="40" style="fill:none; stroke:#ffffff; stroke-width:3.5;">
    <circle cx="15" cy="16" r="11"/>
    <circle cx="38" cy="16" r="11"/>
    <circle cx="61" cy="16" r="11"/>
    <circle cx="84" cy="16" r="11"/>
    <circle cx="26.5" cy="27" r="11"/>
    <circle cx="49.5" cy="27" r="11"/>
    <circle cx="72.5" cy="27" r="11"/>
  </svg>
`;

const officialWaterPoloPictographSVG = `
  <svg viewBox="0 0 100 100" width="56" height="56" fill="#ffffff" style="display:block;">
    <path d="M 15 80 Q 28 73, 40 80 T 65 80 T 90 80" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round" fill="none"/>
    <path d="M 5 88 Q 23 83, 41 88 T 68 88 T 95 88" stroke="#ffffff" stroke-width="3" stroke-linecap="round" fill="none"/>
    <path d="M 38 72 C 38 60, 48 55, 52 50 C 56 45, 52 35, 42 37" fill="none" stroke="#ffffff" stroke-width="6.5" stroke-linecap="round"/>
    <circle cx="45" cy="27" r="8" fill="#ffffff"/>
    <path d="M 52 50 C 62 46, 68 38, 68 25" fill="none" stroke="#ffffff" stroke-width="5.5" stroke-linecap="round"/>
    <circle cx="68" cy="14" r="6" fill="#ffffff"/>
    <path d="M 32 62 C 22 65, 16 70, 16 76" fill="none" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round"/>
  </svg>
`;

export async function generateWaterPolo2Fabric(
  templateId = '',
  customData = {},
  styleOptions = {}
) {
  const normId = (templateId || '').toUpperCase();
  const primaryColor = customData.primaryColor || styleOptions.primaryColor || '#004080';

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

  const venueStr = (customData.venue || customData.location || 'AQUATICS CENTRE').toUpperCase();
  const subVenueStr = (customData.subVenue || customData.subLocation || 'WATER POLO ARENA').toUpperCase();

  // ── WP002 - Venue ID ──
  if (normId.includes('WP002') || normId === 'VENUE ID') {
    const baseLeft = 328;
    const baseTop = 966 - 95; // 871

    // Gun shape header body (contains top bar and left tab)
    const gunPathData = 'M 45 0 L 860 0 C 865 0, 870 3, 872 8 L 888 44 C 890 49, 887 54, 882 54 L 140 54 L 115 88 C 112 92, 106 95, 100 95 L 10 95 C 4 95, 0 90, 2 84 L 22 42 L 35 6 C 37 2, 41 0, 45 0 Z';
    const gunGradient = new fabric.Gradient({
      type: 'linear', gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: 890, y2: 0 },
      colorStops: [
        { offset: 0, color: gradientStart },
        { offset: 0.4, color: gradientMid },
        { offset: 1, color: gradientEnd }
      ]
    });
    const gunBody = new fabric.Path(gunPathData, createProps('path', {
      left: baseLeft, top: baseTop,
      fill: gunGradient, stroke: borderHighlight, strokeWidth: 2,
      shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.7)', blur: 15, offsetX: 0, offsetY: 8 })
    }));
    objects.push(gunBody);

    // Water Polo Logo
    const wave1 = new fabric.Path('M 15 80 Q 28 73, 40 80 T 65 80 T 90 80', { fill: '', stroke: '#ffffff', strokeWidth: 4.5, strokeLineCap: 'round', selectable: true });
    const wave2 = new fabric.Path('M 5 88 Q 23 83, 41 88 T 68 88 T 95 88', { fill: '', stroke: '#ffffff', strokeWidth: 3, strokeLineCap: 'round', selectable: true });
    const body = new fabric.Path('M 38 72 C 38 60, 48 55, 52 50 C 56 45, 52 35, 42 37', { fill: '', stroke: '#ffffff', strokeWidth: 6.5, strokeLineCap: 'round', selectable: true });
    const head = new fabric.Circle({ left: 37, top: 19, radius: 8, fill: '#ffffff', selectable: true });
    const arm = new fabric.Path('M 52 50 C 62 46, 68 38, 68 25', { fill: '', stroke: '#ffffff', strokeWidth: 5.5, strokeLineCap: 'round', selectable: true });
    const ball = new fabric.Circle({ left: 62, top: 8, radius: 6, fill: '#ffffff', selectable: true });
    const leftArm = new fabric.Path('M 32 62 C 22 65, 16 70, 16 76', { fill: '', stroke: '#ffffff', strokeWidth: 4.5, strokeLineCap: 'round', selectable: true });

    const waterPoloLogoGroup = new fabric.Group([wave1, wave2, body, head, arm, ball, leftArm], {
      left: baseLeft + 35, top: baseTop + 12, scaleX: 0.65, scaleY: 0.65,
      id: generateUniqueId({ type: 'waterPoloLogo' }),
      name: 'Water Polo Logo',
      selectable: true, hasControls: true
    });
    objects.push(waterPoloLogoGroup);

    const titleText = new fabric.Textbox(venueStr, createProps('textbox', {
      left: baseLeft + 155, top: baseTop + 8, fontSize: 32, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: 610, charSpacing: 90
    }));
    objects.push(titleText);

    // Adjusted below white strip (sub-bar) - matches SW004 style
    const subBarPathData = 'M 28 0 L 778 0 L 778 34 L 0 34 Z';
    const subBarGradient = new fabric.Gradient({
      type: 'linear', gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: 778, y2: 0 },
      colorStops: [
        { offset: 0, color: '#d1d5db' },
        { offset: 0.5, color: '#ffffff' },
        { offset: 1, color: '#e2e8f0' }
      ]
    });
    const subBar = new fabric.Path(subBarPathData, createProps('path', {
      left: baseLeft + 110, top: baseTop + 55,
      fill: subBarGradient, stroke: 'rgba(0,34,62,0.4)', strokeWidth: 1.2
    }));
    objects.push(subBar);

    const subTitleText = new fabric.Textbox(subVenueStr, createProps('textbox', {
      left: baseLeft + 155, top: baseTop + 60, fontSize: 20, fontWeight: '900', fontStyle: 'italic',
      fill: '#0a2a5e', width: 720, charSpacing: 40
    }));
    objects.push(subTitleText);

    const olympicRings = createOlympicRingsGroup(baseLeft + 805, baseTop + 14, 9, 2.2);
    objects.push(olympicRings);

    return new fabric.Group(objects, {
      left: baseLeft, top: baseTop,
      scaleX: 1.0, scaleY: 1.0,
      subTargetCheck: true,
      id: generateUniqueId({ type: 'waterPoloGroup' }),
      name: `WP002 Venue ID (${normId})`,
      selectable: true, hasControls: true
    });
  }

  return null;
}

export function generateWaterPolo2HTML(
  templateId = '',
  customData = {},
  styleOptions = {}
) {
  const normId = (templateId || '').toUpperCase();
  const font = styleOptions.fontFamily || "'Outfit', 'Roboto Condensed', 'Segoe UI', sans-serif";
  const primaryColor = customData.primaryColor || styleOptions.primaryColor || '#004080';

  const gradientStart = '#061325';
  const gradientMid = primaryColor;
  const gradientEnd = '#031526';
  const borderHighlight = 'rgba(255,255,255,0.35)';

  const venueStr = (customData.venue || customData.location || 'AQUATICS CENTRE').toUpperCase();
  const subVenueStr = (customData.subVenue || customData.subLocation || 'WATER POLO ARENA').toUpperCase();

  // ── WP002 - Venue ID ──
  if (normId.includes('WP002') || normId === 'VENUE ID') {
    const baseTop = 966 - 95; // 871

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
            position: absolute; top: ${baseTop}px; left: 328px; width: 890px;
            filter: drop-shadow(0 12px 25px rgba(0,0,0,0.8));
          }
          .event-gun-header {
            position: relative;
            width: 100%;
            height: 95px;
          }
          .event-gun-body {
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
          .water-polo-logo { position: absolute; left: 32px; top: 2px; z-index: 2; }
          .gun-barrel-title {
            position: absolute; left: 155px; top: 8px; font-size: 32px; font-weight: 900;
            font-style: italic; letter-spacing: 2px; color: #ffffff; text-transform: uppercase;
            white-space: nowrap; z-index: 2;
          }
          .rings-wrapper { position: absolute; right: 35px; top: 14px; z-index: 2; }
          
          .event-sub-bar {
            background: linear-gradient(90deg, #d1d5db 0%, #ffffff 50%, #e2e8f0 100%);
            color: #0a2a5e;
            padding: 8px 30px 8px 45px;
            clip-path: polygon(30px 0px, 100% 0px, 100% 100%, 0px 100%);
            border-radius: 0 0 4px 0;
            border: 1.2px solid rgba(0,34,62,0.4);
            margin-left: 110px;
            margin-top: -38px;
            width: 778px;
            position: relative;
            z-index: 1;
          }
          .event-sub-title {
            font-size: 20px;
            font-weight: 900;
            font-style: italic;
            letter-spacing: 1px;
            text-transform: uppercase;
          }
        </style>
      </head>
      <body>
        <div class="gun-banner-container">
          <div class="event-gun-header">
            <div class="event-gun-body"></div>
            <div class="water-polo-logo">${officialWaterPoloPictographSVG}</div>
            <div class="gun-barrel-title">${venueStr}</div>
            <div class="rings-wrapper">${olympicRingsSVG}</div>
          </div>
          <div class="event-sub-bar">
            <div class="event-sub-title">${subVenueStr}</div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  return '';
}
