/**
 * Aquatics - Diving (DV) Broadcast Graphic Templates for games2
 * Focus: DV002, DV003, DV004, DV005, DV006
 * DV006: Officials / Judges Individual List
 */

import * as fabric from 'fabric';
import { generateUniqueId } from '../../common';
import { createFabricFlagObject, getFlagImgHtml } from '../flagHelpers';

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

/**
 * 1-to-1 London 2012 / OBS Diving Pictograph SVG (Pike Pose + Water Waves)
 */
const officialDivingPictographSVG = `
  <svg viewBox="0 0 100 100" width="56" height="56" fill="#ffffff" style="display:block;">
    <path d="M 40 78 L 40 25 C 40 12, 68 10, 72 30 L 68 48 C 65 52, 58 52, 54 46 L 50 32 C 48 24, 46 24, 46 30 L 46 78 Z" fill="#ffffff" />
    <path d="M 64 48 C 56 48, 54 58, 62 66 C 68 72, 74 68, 74 58 C 74 50, 70 48, 64 48 Z" fill="#ffffff" />
    <path d="M 10 92 Q 22 87, 34 92 T 58 92 T 82 92" stroke="#ffffff" stroke-width="4" stroke-linecap="round" fill="none"/>
  </svg>
`;

/**
 * Fabric.js Vector Generator for Diving Templates (DV002, DV003, DV004, DV005, DV006)
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

  const venueStr = (customData.venue || customData.location || 'AQUATICS CENTRE').toUpperCase();

  // ── 1. DV002 - Venue ID ──
  if (normId.includes('DV002') || normId === 'VENUE ID') {
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
      left: 240, top: 755,
      fill: gunGradient, stroke: borderHighlight, strokeWidth: 2,
      shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.7)', blur: 15, offsetX: 0, offsetY: 8 })
    }));
    objects.push(gunBody);

    const pikeBody = new fabric.Path('M 40 78 L 40 25 C 40 12, 68 10, 72 30 L 68 48 C 65 52, 58 52, 54 46 L 50 32 C 48 24, 46 24, 46 30 L 46 78 Z', {
      left: 278, top: 770, fill: '#ffffff', selectable: true
    });
    const headHeart = new fabric.Path('M 64 48 C 56 48, 54 58, 62 66 C 68 72, 74 68, 74 58 C 74 50, 70 48, 64 48 Z', {
      left: 295, top: 792, fill: '#ffffff', selectable: true
    });
    const waterWaves = new fabric.Path('M 10 92 Q 22 87, 34 92 T 58 92 T 82 92', {
      left: 265, top: 825, fill: '', stroke: '#ffffff', strokeWidth: 3.5, strokeLineCap: 'round', selectable: true
    });

    const divingLogoGroup = new fabric.Group([pikeBody, headHeart, waterWaves], {
      left: 265, top: 770,
      id: generateUniqueId({ type: 'divingLogo' }),
      name: 'Official Diving Pike Logo',
      selectable: true, hasControls: true
    });
    objects.push(divingLogoGroup);

    const titleText = new fabric.Textbox(venueStr, createProps('textbox', {
      left: 395, top: 764, fontSize: 30, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: 610, charSpacing: 90
    }));
    objects.push(titleText);

    const olympicRings = createOlympicRingsGroup(1045, 770, 9, 2.2);
    objects.push(olympicRings);

    return new fabric.Group(objects, {
      left: 328, top: 840,
      scaleX: 1.427, scaleY: 1.258,
      subTargetCheck: true,
      id: generateUniqueId({ type: 'divingGroup' }),
      name: `DV002 Venue ID (${normId})`,
      selectable: true, hasControls: true
    });
  }

  // ── 2. DV003 - Event Schedule / Header 3-Tier Banner ──
  if (normId.includes('DV003') || normId.includes('SCHEDULE')) {
    const baseTop = 810;

    let eventStr = (customData.event || customData.title || customData.eventName || '').toUpperCase();
    if (!eventStr || eventStr === "MEN'S 10M PLATFORM") {
      eventStr = "WOMEN'S SYNCHRONISED 10M PLATFORM - FINAL";
    }

    const sportStr = 'DIVING';

    const topBarGradient = new fabric.Gradient({
      type: 'linear', gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: 1260, y2: 0 },
      colorStops: [
        { offset: 0, color: gradientStart },
        { offset: 0.5, color: gradientMid },
        { offset: 1, color: gradientEnd }
      ]
    });

    const topBar = new fabric.Rect(createProps('rect', {
      left: 328, top: baseTop, width: 1260, height: 68,
      fill: topBarGradient, skewX: -12, rx: 6, ry: 6,
      stroke: borderHighlight, strokeWidth: 1.5,
      shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.6)', blur: 16, offsetX: 0, offsetY: 6 })
    }));
    objects.push(topBar);

    const pikeBody = new fabric.Path('M 40 78 L 40 25 C 40 12, 68 10, 72 30 L 68 48 C 65 52, 58 52, 54 46 L 50 32 C 48 24, 46 24, 46 30 L 46 78 Z', {
      left: 355, top: baseTop + 10, fill: '#ffffff', scaleX: 0.75, scaleY: 0.75, selectable: true
    });
    const headHeart = new fabric.Path('M 64 48 C 56 48, 54 58, 62 66 C 68 72, 74 68, 74 58 C 74 50, 70 48, 64 48 Z', {
      left: 370, top: baseTop + 26, fill: '#ffffff', scaleX: 0.75, scaleY: 0.75, selectable: true
    });
    const waterWaves = new fabric.Path('M 10 92 Q 22 87, 34 92 T 58 92 T 82 92', {
      left: 348, top: baseTop + 46, fill: '', stroke: '#ffffff', strokeWidth: 3, strokeLineCap: 'round', selectable: true
    });
    const divingLogoGroup = new fabric.Group([pikeBody, headHeart, waterWaves], {
      left: 348, top: baseTop + 10,
      id: generateUniqueId({ type: 'divingLogo' }),
      name: 'Diving Logo Icon',
      selectable: true, hasControls: true
    });
    objects.push(divingLogoGroup);

    const divingText = new fabric.Textbox(sportStr, createProps('textbox', {
      left: 425, top: baseTop + 14, fontSize: 36, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: 400
    }));
    objects.push(divingText);

    const olympicRings = createOlympicRingsGroup(1470, baseTop + 16, 12, 2.5);
    objects.push(olympicRings);

    const middleGradient = new fabric.Gradient({
      type: 'linear', gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: 1220, y2: 0 },
      colorStops: [
        { offset: 0, color: '#ffffff' },
        { offset: 0.5, color: '#e2e8f0' },
        { offset: 1, color: '#cbd5e1' }
      ]
    });

    const middleStrip = new fabric.Rect(createProps('rect', {
      left: 345, top: baseTop + 70, width: 1220, height: 36,
      fill: middleGradient, skewX: -12, rx: 4, ry: 4,
      stroke: 'rgba(0,0,0,0.2)', strokeWidth: 1
    }));
    objects.push(middleStrip);

    const venueText = new fabric.Textbox(venueStr, createProps('textbox', {
      left: 425, top: baseTop + 76, fontSize: 22, fontWeight: '900', fontStyle: 'italic',
      fill: '#1a2b42', width: 600
    }));
    objects.push(venueText);

    const bottomBarGradient = new fabric.Gradient({
      type: 'linear', gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: 1260, y2: 0 },
      colorStops: [
        { offset: 0, color: '#091d36' },
        { offset: 0.5, color: '#0f2f57' },
        { offset: 1, color: '#071629' }
      ]
    });

    const bottomBar = new fabric.Rect(createProps('rect', {
      left: 328, top: baseTop + 108, width: 1260, height: 50,
      fill: bottomBarGradient, skewX: -12, rx: 6, ry: 6,
      stroke: borderHighlight, strokeWidth: 1.5,
      shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.6)', blur: 16, offsetX: 0, offsetY: 6 })
    }));
    objects.push(bottomBar);

    const eventText = new fabric.Textbox(eventStr, createProps('textbox', {
      left: 355, top: baseTop + 116, fontSize: 28, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: 1180
    }));
    objects.push(eventText);

    return new fabric.Group(objects, {
      left: 328, top: baseTop,
      originX: 'left', originY: 'top',
      scaleX: 1.0, scaleY: 1.0,
      subTargetCheck: true,
      id: generateUniqueId({ type: 'divingGroup' }),
      name: `DV003 Event Header (${normId})`,
      selectable: true, hasControls: true
    });
  }

  // ── 3. DV004 - Start List / Dive Order (Variant A & Variant B) ──
  if (normId.includes('DV004') || normId.includes('START LIST')) {
    const isVariantB = normId.includes('_B') || normId.endsWith('B') || (customData.variant || '').toLowerCase() === 'b';
    const baseLeft = 333;
    const baseTop = 350;
    const bannerWidth = 1250;
    const rowHeight = 54;

    const eventTitle = isVariantB
      ? (customData.event || customData.title || "WOMEN'S SYNCHRONISED 10M PLATFORM").toUpperCase()
      : (customData.event || customData.title || "MEN'S 3M SPRINGBOARD").toUpperCase();

    const roundTitle = isVariantB
      ? (customData.round || "DIVE ORDER - FINAL").toUpperCase()
      : (customData.round || "DIVE ORDER - SEMI-FINAL").toUpperCase();

    // Variant A: Single divers with DNS on row 6
    const defaultEntriesA = [
      { order: 1, noc: 'ITA', name: 'NICOLA MARCONI', status: '' },
      { order: 2, noc: 'RUS', name: 'ALEKSANDR DOBROSKOK', status: '' },
      { order: 3, noc: 'GER', name: 'PAVLO ROZENBERG', status: '' },
      { order: 4, noc: 'AUS', name: 'MATTHEW MITCHAM', status: '' },
      { order: 5, noc: 'COL', name: 'JUAN GUILLERMO URAN', status: '' },
      { order: 6, noc: 'CAN', name: 'REUBEN ROSS', status: 'DNS' },
      { order: 7, noc: 'USA', name: 'TROY DUMAIS', status: '' },
      { order: 8, noc: 'GER', name: 'PATRICK HAUSDING', status: '' },
      { order: 9, noc: 'JPN', name: 'KEN TERAUCHI', status: '' }
    ];

    // Variant B: Synchronised pairs separated by / without DNS badge
    const defaultEntriesB = [
      { order: 1, noc: 'AUS', name: 'COLE B / STRATTON C', status: '' },
      { order: 2, noc: 'CAN', name: 'BENFEITO M / FILION R', status: '' },
      { order: 3, noc: 'CHN', name: 'CHEN R / WANG H', status: '' },
      { order: 4, noc: 'GER', name: 'SUBCHINSKI N / STEUER A', status: '' },
      { order: 5, noc: 'GBR', name: 'BARROW S / COUCH T', status: '' },
      { order: 6, noc: 'MAS', name: 'PAM G P / LEONG M', status: '' },
      { order: 7, noc: 'MEX', name: 'ESPINOSA P / ORTIZ A', status: '' },
      { order: 8, noc: 'PRK', name: 'CHOE H / KIM U', status: '' }
    ];

    const entries = (customData.startList && customData.startList.length > 0)
      ? customData.startList
      : (isVariantB ? defaultEntriesB : defaultEntriesA);

    // 1. Header Blue Banner
    const headGradient = new fabric.Gradient({
      type: 'linear', gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: bannerWidth, y2: 0 },
      colorStops: [
        { offset: 0, color: gradientStart },
        { offset: 0.5, color: gradientMid },
        { offset: 1, color: gradientEnd }
      ]
    });

    const headBar = new fabric.Rect(createProps('rect', {
      left: baseLeft, top: baseTop, width: bannerWidth, height: 88,
      fill: headGradient, skewX: -12, rx: 8, ry: 8,
      stroke: borderHighlight, strokeWidth: 2,
      shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.6)', blur: 20, offsetX: 0, offsetY: 8 })
    }));
    objects.push(headBar);

    // Diving Logo inside Header
    const pikeBody = new fabric.Path('M 40 78 L 40 25 C 40 12, 68 10, 72 30 L 68 48 C 65 52, 58 52, 54 46 L 50 32 C 48 24, 46 24, 46 30 L 46 78 Z', {
      left: baseLeft + 32, top: baseTop + 12, fill: '#ffffff', scaleX: 0.95, scaleY: 0.95, selectable: true
    });
    const headHeart = new fabric.Path('M 64 48 C 56 48, 54 58, 62 66 C 68 72, 74 68, 74 58 C 74 50, 70 48, 64 48 Z', {
      left: baseLeft + 48, top: baseTop + 32, fill: '#ffffff', scaleX: 0.95, scaleY: 0.95, selectable: true
    });
    const waterWaves = new fabric.Path('M 10 92 Q 22 87, 34 92 T 58 92 T 82 92', {
      left: baseLeft + 22, top: baseTop + 58, fill: '', stroke: '#ffffff', strokeWidth: 4, strokeLineCap: 'round', scaleX: 0.95, scaleY: 0.95, selectable: true
    });
    const divingLogoGroup = new fabric.Group([pikeBody, headHeart, waterWaves], {
      left: baseLeft + 22, top: baseTop + 12, id: generateUniqueId({ type: 'divingLogo' }), name: 'Diving Logo', selectable: true
    });
    objects.push(divingLogoGroup);

    // Header Title
    const headTitleText = new fabric.Textbox(eventTitle, createProps('textbox', {
      left: baseLeft + 120, top: baseTop + 18, fontSize: 40, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: 880
    }));
    objects.push(headTitleText);

    // Olympic Rings
    const olympicRings = createOlympicRingsGroup(baseLeft + bannerWidth - 150, baseTop + 22, 16, 3.2);
    objects.push(olympicRings);

    // 2. Sub-Header Silver Metallic Strip
    const subGradient = new fabric.Gradient({
      type: 'linear', gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: bannerWidth - 40, y2: 0 },
      colorStops: [
        { offset: 0, color: '#ffffff' },
        { offset: 0.5, color: '#e2e8f0' },
        { offset: 1, color: '#cbd5e1' }
      ]
    });

    const subBar = new fabric.Rect(createProps('rect', {
      left: baseLeft + 20, top: baseTop + 90, width: bannerWidth - 40, height: 46,
      fill: subGradient, skewX: -12, rx: 5, ry: 5,
      stroke: 'rgba(0,0,0,0.2)', strokeWidth: 1
    }));
    objects.push(subBar);

    const subTitleText = new fabric.Textbox(roundTitle, createProps('textbox', {
      left: baseLeft + 120, top: baseTop + 98, fontSize: 26, fontWeight: '900', fontStyle: 'italic',
      fill: '#1a2b42', width: 750
    }));
    objects.push(subTitleText);

    // 3. Start List Table Rows
    let currentY = baseTop + 140;

    for (let index = 0; index < entries.length; index++) {
      const item = entries[index];
      const isEven = index % 2 === 0;
      const rowFill = isEven ? '#0a1d38' : '#061326';

      // Row Background
      const rowRect = new fabric.Rect(createProps('rect', {
        left: baseLeft, top: currentY, width: bannerWidth, height: rowHeight,
        fill: rowFill, skewX: -12,
        stroke: 'rgba(255,255,255,0.12)', strokeWidth: 1
      }));
      objects.push(rowRect);

      // Order Number directly on row background
      const orderText = new fabric.Textbox(String(item.order || item.n || index + 1), createProps('textbox', {
        left: baseLeft + 16, top: currentY + 10, fontSize: 28, fontWeight: '900', fontStyle: 'italic',
        fill: '#ffffff', width: 45, textAlign: 'center'
      }));
      objects.push(orderText);

      // Country Flag Image (Left: baseLeft + 85)
      const flagImg = await createFabricFlagObject(item.noc || item.country || 'ITA', createProps('image', {
        left: baseLeft + 85,
        top: currentY + 11,
        scaleX: 0.60,
        scaleY: 0.60,
        skewX: -12
      }));
      if (flagImg) {
        objects.push(flagImg);
      } else {
        const nocText = new fabric.Textbox((item.noc || item.country || '').toUpperCase(), createProps('textbox', {
          left: baseLeft + 85, top: currentY + 10, fontSize: 24, fontWeight: '900', fontStyle: 'italic',
          fill: '#ffffff', width: 80
        }));
        objects.push(nocText);
      }

      // Diver / Pair Name(s) — Indented to baseLeft + 240
      const nameText = new fabric.Textbox((item.name || item.athlete || '').toUpperCase(), createProps('textbox', {
        left: baseLeft + 240, top: currentY + 10, fontSize: 30, fontWeight: '900', fontStyle: 'italic',
        fill: '#ffffff', width: 740
      }));
      objects.push(nameText);

      // Status Badge (Rendered for Variant A or whenever status is present)
      if (item.status && item.status.trim() !== '') {
        const dnsBg = new fabric.Rect(createProps('rect', {
          left: baseLeft + bannerWidth - 110, top: currentY + 8, width: 85, height: rowHeight - 16,
          fill: '#ffffff', skewX: -12, rx: 4, ry: 4,
          stroke: 'rgba(0,0,0,0.3)', strokeWidth: 1
        }));
        const dnsText = new fabric.Textbox(item.status.toUpperCase(), createProps('textbox', {
          left: baseLeft + bannerWidth - 105, top: currentY + 12, fontSize: 22, fontWeight: '900', fontStyle: 'italic',
          fill: '#000000', width: 75, textAlign: 'center'
        }));
        objects.push(dnsBg, dnsText);
      }

      currentY += rowHeight + 3;
    }

    return new fabric.Group(objects, {
      left: 333, top: 350,
      originX: 'left', originY: 'top',
      scaleX: 1.0, scaleY: 1.0,
      subTargetCheck: true,
      id: generateUniqueId({ type: 'divingGroup' }),
      name: `DV004 Start List ${isVariantB ? 'Variant B' : 'Variant A'} (${normId})`,
      selectable: true, hasControls: true
    });
  }

  // ── 4. DV005 - Athlete / Pair ID Lower Third (Variants A, B, C, D) ──
  if (normId.includes('DV005') || normId.includes('ATHLETE ID') || normId.includes('PAIR ID')) {
    const rawVariant = (customData.variant || customData.variation || '').toLowerCase();
    let variant = 'a';
    if (rawVariant && rawVariant.length >= 1) {
      variant = rawVariant.charAt(0);
    } else if (normId.endsWith('B') || normId.includes('_B')) {
      variant = 'b';
    } else if (normId.endsWith('C') || normId.includes('_C')) {
      variant = 'c';
    } else if (normId.endsWith('D') || normId.includes('_D')) {
      variant = 'd';
    } else if (normId.endsWith('A') || normId.includes('_A')) {
      variant = 'a';
    }

    // Official OBS Reference Sample Defaults:
    let defaultName = 'ALEKSANDR DOBROSKOK';
    let defaultNoc = 'RUS';
    let defaultStatus = '';

    if (variant === 'b') {
      defaultName = 'JUAN GUILLERMO URAN';
      defaultNoc = 'COL';
      defaultStatus = 'DNS';
    } else if (variant === 'c') {
      defaultName = 'WANG XIN / CHEN RUOLIN';
      defaultNoc = 'CHN';
      defaultStatus = '';
    } else if (variant === 'd') {
      defaultName = 'P. ESPINOSA / T. ORTIZ';
      defaultNoc = 'MEX';
      defaultStatus = 'DSQ';
    }

    const rawName = (customData.name || customData.athlete || customData.athleteName || '').trim();
    const rawNoc = (customData.noc || customData.country || '').trim();

    const isGenericDefaultName = !rawName || rawName.toUpperCase() === 'TOM DALEY';
    const isGenericDefaultNoc = !rawNoc || rawNoc.toUpperCase() === 'GBR';

    const nameStr = (isGenericDefaultName ? defaultName : rawName).toUpperCase();
    const nocCode = (isGenericDefaultNoc ? defaultNoc : rawNoc).toUpperCase();
    const statusStr = (customData.status !== undefined && customData.status !== '' ? customData.status : defaultStatus).toUpperCase();

    const baseLeft = 333;
    const baseTop = 912; // Lower third position matching Y = 966px bottom baseline!
    const stripWidth = 1100;
    const stripHeight = 54;

    // 1. Skewed Dark Blue Gradient Strip
    const stripGradient = new fabric.Gradient({
      type: 'linear', gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: stripWidth, y2: 0 },
      colorStops: [
        { offset: 0, color: gradientStart },
        { offset: 0.5, color: gradientMid },
        { offset: 1, color: gradientEnd }
      ]
    });

    const bodyRect = new fabric.Rect(createProps('rect', {
      left: baseLeft, top: baseTop, width: stripWidth, height: stripHeight,
      fill: stripGradient, skewX: -12, rx: 6, ry: 6,
      stroke: borderHighlight, strokeWidth: 1.5,
      shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.6)', blur: 16, offsetX: 0, offsetY: 6 })
    }));
    objects.push(bodyRect);

    // 2. High-resolution Base64 PNG Country Flag (Scale 0.60, matching DV004!)
    const flagImg = await createFabricFlagObject(nocCode, createProps('image', {
      left: baseLeft + 20,
      top: baseTop + 11,
      scaleX: 0.60,
      scaleY: 0.60,
      skewX: -12
    }));
    if (flagImg) {
      objects.push(flagImg);
    } else {
      const nocText = new fabric.Textbox(nocCode, createProps('textbox', {
        left: baseLeft + 20, top: baseTop + 10, fontSize: 24, fontWeight: '900', fontStyle: 'italic',
        fill: '#ffffff', width: 80
      }));
      objects.push(nocText);
    }

    // 3. Athlete / Pair Name (Font Size 30px, matching DV004!)
    const nameText = new fabric.Textbox(nameStr, createProps('textbox', {
      left: baseLeft + 175, top: baseTop + 10, fontSize: 30, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: (statusStr && statusStr.trim() !== '') ? 660 : 760
    }));
    objects.push(nameText);

    // 4. Status Badge (White rounded rect with black bold text if status present!)
    if (statusStr && statusStr.trim() !== '') {
      const dnsBg = new fabric.Rect(createProps('rect', {
        left: baseLeft + stripWidth - 195, top: baseTop + 8, width: 85, height: stripHeight - 16,
        fill: '#ffffff', skewX: -12, rx: 4, ry: 4,
        stroke: 'rgba(0,0,0,0.3)', strokeWidth: 1
      }));
      const dnsText = new fabric.Textbox(statusStr, createProps('textbox', {
        left: baseLeft + stripWidth - 190, top: baseTop + 12, fontSize: 22, fontWeight: '900', fontStyle: 'italic',
        fill: '#000000', width: 75, textAlign: 'center'
      }));
      objects.push(dnsBg, dnsText);
    }

    // 5. Olympic Rings (Right side of lower third strip)
    const olympicRings = createOlympicRingsGroup(baseLeft + stripWidth - 95, baseTop + 13, 11, 2.4);
    objects.push(olympicRings);

    return new fabric.Group(objects, {
      left: baseLeft, top: baseTop,
      originX: 'left', originY: 'top',
      scaleX: 1.0, scaleY: 1.0,
      subTargetCheck: true,
      id: generateUniqueId({ type: 'divingGroup' }),
      name: `DV005 Athlete ID Variant ${variant.toUpperCase()} (${normId})`,
      selectable: true, hasControls: true
    });
  }

  // ── 5. DV006 - Officials / Judges List ──
  if (normId.includes('DV006') || normId.includes('OFFICIALS')) {
    const bannerWidth = 1250;
    const rowHeight = 54;
    const rowGap = 3;
    const headerHeight = 88;
    const subHeaderHeight = 46;

    const defaultJudges = [
      { name: 'ROLANDO RUIZ PEDREGUERA', role: 'JUDGE 1' },
      { name: 'ANN SISSONS', role: 'JUDGE 2' },
      { name: 'MATHZ LINDBERG', role: 'JUDGE 3' },
      { name: 'FRANCISCUS VAN DE KONIJNENBURG', role: 'JUDGE 4' },
      { name: 'ROBERTO GONCALVES', role: 'JUDGE 5' },
      { name: 'ILDIKO KELEMEN', role: 'JUDGE 6' },
      { name: 'ADRIENNE WILSON', role: 'JUDGE 7' }
    ];

    const judges = (customData.officials && customData.officials.length > 0)
      ? customData.officials
      : (customData.judges && customData.judges.length > 0)
      ? customData.judges
      : defaultJudges;

    const rawEvent = (customData.event || customData.title || '').trim();
    const isDefaultEvent = !rawEvent || 
      rawEvent.toUpperCase().includes('SYNCHRONISED') || 
      rawEvent.toUpperCase().includes('10M PLATFORM') || 
      rawEvent.toUpperCase().includes('10M') ||
      rawEvent.toUpperCase().includes('SPRINGBOARD');
    const eventTitle = (isDefaultEvent ? "MEN'S 3M SPRINGBOARD" : rawEvent).toUpperCase();

    const rawSub = (customData.subtitle || customData.subTitle || '').trim();
    const subTitle = (rawSub ? rawSub : "JUDGES").toUpperCase();

    const totalHeight = headerHeight + subHeaderHeight + 6 + (judges.length * (rowHeight + rowGap));
    const targetBottomY = 966; // Y = 966px bottom baseline!
    const baseLeft = 333;
    const baseTop = targetBottomY - totalHeight;

    // 1. Header Blue Skewed Banner
    const headGradient = new fabric.Gradient({
      type: 'linear', gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: bannerWidth, y2: 0 },
      colorStops: [
        { offset: 0, color: gradientStart },
        { offset: 0.5, color: gradientMid },
        { offset: 1, color: gradientEnd }
      ]
    });

    const headBar = new fabric.Rect(createProps('rect', {
      left: baseLeft, top: baseTop, width: bannerWidth, height: 88,
      fill: headGradient, skewX: -12, rx: 8, ry: 8,
      stroke: borderHighlight, strokeWidth: 2,
      shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.6)', blur: 20, offsetX: 0, offsetY: 8 })
    }));
    objects.push(headBar);

    // Diving Logo Icon inside Header
    const pikeBody = new fabric.Path('M 40 78 L 40 25 C 40 12, 68 10, 72 30 L 68 48 C 65 52, 58 52, 54 46 L 50 32 C 48 24, 46 24, 46 30 L 46 78 Z', {
      left: baseLeft + 32, top: baseTop + 12, fill: '#ffffff', scaleX: 0.95, scaleY: 0.95, selectable: true
    });
    const headHeart = new fabric.Path('M 64 48 C 56 48, 54 58, 62 66 C 68 72, 74 68, 74 58 C 74 50, 70 48, 64 48 Z', {
      left: baseLeft + 48, top: baseTop + 32, fill: '#ffffff', scaleX: 0.95, scaleY: 0.95, selectable: true
    });
    const waterWaves = new fabric.Path('M 10 92 Q 22 87, 34 92 T 58 92 T 82 92', {
      left: baseLeft + 22, top: baseTop + 58, fill: '', stroke: '#ffffff', strokeWidth: 4, strokeLineCap: 'round', scaleX: 0.95, scaleY: 0.95, selectable: true
    });
    const divingLogoGroup = new fabric.Group([pikeBody, headHeart, waterWaves], {
      left: baseLeft + 22, top: baseTop + 12, id: generateUniqueId({ type: 'divingLogo' }), name: 'Diving Logo', selectable: true
    });
    objects.push(divingLogoGroup);

    // Header Title
    const headTitleText = new fabric.Textbox(eventTitle, createProps('textbox', {
      left: baseLeft + 120, top: baseTop + 18, fontSize: 40, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: 880
    }));
    objects.push(headTitleText);

    // Olympic Rings
    const olympicRings = createOlympicRingsGroup(baseLeft + bannerWidth - 150, baseTop + 22, 16, 3.2);
    objects.push(olympicRings);

    // 2. Sub-Header Silver Metallic Strip
    const subGradient = new fabric.Gradient({
      type: 'linear', gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: bannerWidth - 40, y2: 0 },
      colorStops: [
        { offset: 0, color: '#ffffff' },
        { offset: 0.5, color: '#e2e8f0' },
        { offset: 1, color: '#cbd5e1' }
      ]
    });

    const subBar = new fabric.Rect(createProps('rect', {
      left: baseLeft + 20, top: baseTop + 90, width: bannerWidth - 40, height: 46,
      fill: subGradient, skewX: -12, rx: 5, ry: 5,
      stroke: 'rgba(0,0,0,0.2)', strokeWidth: 1
    }));
    objects.push(subBar);

    const subTitleText = new fabric.Textbox(subTitle, createProps('textbox', {
      left: baseLeft + 120, top: baseTop + 98, fontSize: 26, fontWeight: '900', fontStyle: 'italic',
      fill: '#1a2b42', width: 750
    }));
    objects.push(subTitleText);

    // 3. Officials List Table Rows
    let currentY = baseTop + 140;

    for (let index = 0; index < judges.length; index++) {
      const item = judges[index];
      const isEven = index % 2 === 0;
      const rowFill = isEven ? '#0a1d38' : '#061326';

      const rowRect = new fabric.Rect(createProps('rect', {
        left: baseLeft, top: currentY, width: bannerWidth, height: rowHeight,
        fill: rowFill, skewX: -12,
        stroke: 'rgba(255,255,255,0.12)', strokeWidth: 1
      }));
      objects.push(rowRect);

      // Judge Name (Left aligned)
      const judgeNameText = new fabric.Textbox((item.name || item.officialName || '').toUpperCase(), createProps('textbox', {
        left: baseLeft + 40, top: currentY + 10, fontSize: 30, fontWeight: '900', fontStyle: 'italic',
        fill: '#ffffff', width: 800
      }));
      objects.push(judgeNameText);

      // Judge Role (Right aligned, e.g. "JUDGE 1")
      const judgeRoleText = new fabric.Textbox((item.role || item.title || `JUDGE ${index + 1}`).toUpperCase(), createProps('textbox', {
        left: baseLeft + bannerWidth - 250, top: currentY + 10, fontSize: 28, fontWeight: '900', fontStyle: 'italic',
        fill: '#ffffff', width: 200, textAlign: 'right'
      }));
      objects.push(judgeRoleText);

      currentY += rowHeight + 3;
    }

    return new fabric.Group(objects, {
      left: baseLeft, top: baseTop,
      originX: 'left', originY: 'top',
      scaleX: 1.0, scaleY: 1.0,
      subTargetCheck: true,
      id: generateUniqueId({ type: 'divingGroup' }),
      name: `DV006 Officials Individual (${normId})`,
      selectable: true, hasControls: true
    });
  }

  // ── 6. DV007 - Officials / Judges (Synchronised - Execution vs Synch) ──
  if (normId.includes('DV007') || normId.includes('SYNCH')) {
    const isVariantB = normId.includes('_B') || normId.endsWith('B') || (customData.variant || '').toLowerCase() === 'b';
    const bannerWidth = 1250;
    const rowHeight = 54;
    const rowGap = 3;
    const headerHeight = 88;
    const subHeaderHeight = 46;

    const defaultJudgesA = [
      { name: 'ANN SISSONS', role: 'EXECUTION 1' },
      { name: 'YOSHINO YUASA', role: 'EXECUTION 2' },
      { name: 'MATHZ LINDBERG', role: 'EXECUTION 3' },
      { name: 'ADRIENNE WILSON', role: 'EXECUTION 4' },
      { name: 'FELIPE MENDES', role: 'EXECUTION 5' },
      { name: 'LEYLA SAHAN', role: 'EXECUTION 6' }
    ];

    const defaultJudgesB = [
      { name: 'ROLANDO RUIZ PEDREGUERA', role: 'SYNCHRONISATION 1' },
      { name: 'HANA NOVOTNA', role: 'SYNCHRONISATION 2' },
      { name: 'ROBERTO GONCALVES', role: 'SYNCHRONISATION 3' },
      { name: 'OLGA MCCLESKEY', role: 'SYNCHRONISATION 4' },
      { name: 'ILDIKO KELEMEN', role: 'SYNCHRONISATION 5' }
    ];

    const judges = (customData.officials && customData.officials.length > 0)
      ? customData.officials
      : (customData.judges && customData.judges.length > 0)
      ? customData.judges
      : (isVariantB ? defaultJudgesB : defaultJudgesA);

    const rawEvent = (customData.event || customData.title || '').trim();
    const isDefaultEvent = !rawEvent || 
      rawEvent.toUpperCase().includes('SPRINGBOARD') || 
      rawEvent.toUpperCase().includes('10M PLATFORM') || 
      rawEvent.toUpperCase() === "MEN'S 10M PLATFORM";
    const eventTitle = (isDefaultEvent ? "WOMEN'S SYNCHRONISED 10M PLATFORM" : rawEvent).toUpperCase();

    const rawSub = (customData.subtitle || customData.subTitle || '').trim();
    const subTitle = (rawSub ? rawSub : "JUDGES").toUpperCase();

    const totalHeight = headerHeight + subHeaderHeight + 6 + (judges.length * (rowHeight + rowGap));
    const targetBottomY = 966; // Y = 966px bottom baseline!
    const baseLeft = 333;
    const baseTop = targetBottomY - totalHeight;

    // 1. Header Blue Skewed Banner
    const headGradient = new fabric.Gradient({
      type: 'linear', gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: bannerWidth, y2: 0 },
      colorStops: [
        { offset: 0, color: gradientStart },
        { offset: 0.5, color: gradientMid },
        { offset: 1, color: gradientEnd }
      ]
    });

    const headBar = new fabric.Rect(createProps('rect', {
      left: baseLeft, top: baseTop, width: bannerWidth, height: 88,
      fill: headGradient, skewX: -12, rx: 8, ry: 8,
      stroke: borderHighlight, strokeWidth: 2,
      shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.6)', blur: 20, offsetX: 0, offsetY: 8 })
    }));
    objects.push(headBar);

    // Diving Logo Icon inside Header
    const pikeBody = new fabric.Path('M 40 78 L 40 25 C 40 12, 68 10, 72 30 L 68 48 C 65 52, 58 52, 54 46 L 50 32 C 48 24, 46 24, 46 30 L 46 78 Z', {
      left: baseLeft + 32, top: baseTop + 12, fill: '#ffffff', scaleX: 0.95, scaleY: 0.95, selectable: true
    });
    const headHeart = new fabric.Path('M 64 48 C 56 48, 54 58, 62 66 C 68 72, 74 68, 74 58 C 74 50, 70 48, 64 48 Z', {
      left: baseLeft + 48, top: baseTop + 32, fill: '#ffffff', scaleX: 0.95, scaleY: 0.95, selectable: true
    });
    const waterWaves = new fabric.Path('M 10 92 Q 22 87, 34 92 T 58 92 T 82 92', {
      left: baseLeft + 22, top: baseTop + 58, fill: '', stroke: '#ffffff', strokeWidth: 4, strokeLineCap: 'round', scaleX: 0.95, scaleY: 0.95, selectable: true
    });
    const divingLogoGroup = new fabric.Group([pikeBody, headHeart, waterWaves], {
      left: baseLeft + 22, top: baseTop + 12, id: generateUniqueId({ type: 'divingLogo' }), name: 'Diving Logo', selectable: true
    });
    objects.push(divingLogoGroup);

    // Header Title
    const headTitleText = new fabric.Textbox(eventTitle, createProps('textbox', {
      left: baseLeft + 120, top: baseTop + 18, fontSize: 40, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: 880
    }));
    objects.push(headTitleText);

    // Olympic Rings
    const olympicRings = createOlympicRingsGroup(baseLeft + bannerWidth - 150, baseTop + 22, 16, 3.2);
    objects.push(olympicRings);

    // 2. Sub-Header Silver Metallic Strip
    const subGradient = new fabric.Gradient({
      type: 'linear', gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: bannerWidth - 40, y2: 0 },
      colorStops: [
        { offset: 0, color: '#ffffff' },
        { offset: 0.5, color: '#e2e8f0' },
        { offset: 1, color: '#cbd5e1' }
      ]
    });

    const subBar = new fabric.Rect(createProps('rect', {
      left: baseLeft + 20, top: baseTop + 90, width: bannerWidth - 40, height: 46,
      fill: subGradient, skewX: -12, rx: 5, ry: 5,
      stroke: 'rgba(0,0,0,0.2)', strokeWidth: 1
    }));
    objects.push(subBar);

    const subTitleText = new fabric.Textbox(subTitle, createProps('textbox', {
      left: baseLeft + 120, top: baseTop + 98, fontSize: 26, fontWeight: '900', fontStyle: 'italic',
      fill: '#1a2b42', width: 750
    }));
    objects.push(subTitleText);

    // 3. Officials List Table Rows
    let currentY = baseTop + 140;

    for (let index = 0; index < judges.length; index++) {
      const item = judges[index];
      const isEven = index % 2 === 0;
      const rowFill = isEven ? '#0a1d38' : '#061326';

      const rowRect = new fabric.Rect(createProps('rect', {
        left: baseLeft, top: currentY, width: bannerWidth, height: rowHeight,
        fill: rowFill, skewX: -12,
        stroke: 'rgba(255,255,255,0.12)', strokeWidth: 1
      }));
      objects.push(rowRect);

      // Judge Name (Left aligned)
      const judgeNameText = new fabric.Textbox((item.name || item.officialName || '').toUpperCase(), createProps('textbox', {
        left: baseLeft + 40, top: currentY + 10, fontSize: 30, fontWeight: '900', fontStyle: 'italic',
        fill: '#ffffff', width: 700
      }));
      objects.push(judgeNameText);

      // Judge Role (Right aligned, e.g. "EXECUTION 1" or "SYNCHRONISATION 1")
      const judgeRoleText = new fabric.Textbox((item.role || item.title || `JUDGE ${index + 1}`).toUpperCase(), createProps('textbox', {
        left: baseLeft + bannerWidth - 450, top: currentY + 10, fontSize: 28, fontWeight: '900', fontStyle: 'italic',
        fill: '#ffffff', width: 400, textAlign: 'right'
      }));
      objects.push(judgeRoleText);

      currentY += rowHeight + 3;
    }

    return new fabric.Group(objects, {
      left: baseLeft, top: baseTop,
      originX: 'left', originY: 'top',
      scaleX: 1.0, scaleY: 1.0,
      subTargetCheck: true,
      id: generateUniqueId({ type: 'divingGroup' }),
      name: `DV007 Officials Synch ${isVariantB ? 'Variant B' : 'Variant A'} (${normId})`,
      selectable: true, hasControls: true
    });
  }

  // ── 7. DV008 - Dive ID (Variants A, B, C, D) ──
  if (normId.includes('DV008') || normId.includes('DIVE ID')) {
    const rawVariant = (customData.variant || customData.variation || '').toLowerCase();
    let variant = 'a';
    if (rawVariant && rawVariant.length >= 1) {
      variant = rawVariant.charAt(0);
    } else if (normId.endsWith('B') || normId.includes('_B')) {
      variant = 'b';
    } else if (normId.endsWith('C') || normId.includes('_C')) {
      variant = 'c';
    } else if (normId.endsWith('D') || normId.includes('_D')) {
      variant = 'd';
    } else if (normId.endsWith('A') || normId.includes('_A')) {
      variant = 'a';
    }

    let defaultNoc = 'BLR';
    let defaultName = 'SERGEI KUCHMASOV';
    let defaultRound = 'ROUND 1';
    let defaultDifficulty = 'DIFFICULTY 3.4';
    let defaultPosition = 'TUCK POSITION';
    let defaultDiveName = 'INWARD 3½ SOMERSAULT';
    let hasRankStrip = false;
    let defaultAfterRound = '';
    let defaultRank = '';
    let defaultTotalScore = '';

    if (variant === 'b') {
      defaultNoc = 'JPN';
      defaultName = 'KEN TERAUCHI';
      defaultRound = 'ROUND 3';
      defaultDifficulty = 'DIFFICULTY 3.0';
      defaultPosition = 'PIKE POSITION';
      defaultDiveName = 'BACK 2½ SOMERSAULT';
      hasRankStrip = true;
      defaultAfterRound = 'AFTER ROUND 2';
      defaultRank = '6';
      defaultTotalScore = '238.00';
    } else if (variant === 'c') {
      defaultNoc = 'PRK';
      defaultName = 'CHOE KUM HUI / KIM UN HYANG';
      defaultRound = 'ROUND 1';
      defaultDifficulty = 'DIFFICULTY 2.0';
      defaultPosition = 'PIKE POSITION';
      defaultDiveName = 'INWARD DIVE';
      hasRankStrip = false;
    } else if (variant === 'd') {
      defaultNoc = 'GER';
      defaultName = 'A. GAMM / N. SUBSCHINSKI';
      defaultRound = 'ROUND 6';
      defaultDifficulty = 'DIFFICULTY 3.4';
      defaultPosition = 'PIKE POSITION';
      defaultDiveName = 'BACK 2½ SOMERSAULT 1½ TWISTS';
      hasRankStrip = true;
      defaultAfterRound = 'AFTER ROUND 5';
      defaultRank = '4';
      defaultTotalScore = '651.36';
    }

    const rawName = (customData.name || customData.athlete || '').trim();
    const rawNoc = (customData.noc || customData.country || '').trim();
    const isGenericName = !rawName || rawName.toUpperCase() === 'TOM DALEY';
    const isGenericNoc = !rawNoc || rawNoc.toUpperCase() === 'GBR';

    const nameStr = (isGenericName ? defaultName : rawName).toUpperCase();
    const nocCode = (isGenericNoc ? defaultNoc : rawNoc).toUpperCase();

    const roundStr = (customData.round || defaultRound).toUpperCase();
    const diffStr = (customData.difficulty || defaultDifficulty).toUpperCase();
    const posStr = (customData.position || defaultPosition).toUpperCase();
    const diveNameStr = (customData.diveName || customData.dive || defaultDiveName).toUpperCase();

    const afterRoundStr = (customData.afterRound || defaultAfterRound).toUpperCase();
    const rankStr = (customData.rank || defaultRank);
    const scoreStr = (customData.totalScore || customData.score || defaultTotalScore);

    const bannerWidth = 1100;
    const tier1Height = 54;
    const tier2Height = 38;
    const tier3Height = 42;
    const tier4Height = hasRankStrip ? 38 : 0;

    const totalHeight = tier1Height + tier2Height + tier3Height + tier4Height + 6;
    const targetBottomY = 966;
    const baseLeft = 333;
    const baseTop = targetBottomY - totalHeight;

    // 1. Tier 1: Main Dark Blue Athlete/NOC Banner
    const t1Gradient = new fabric.Gradient({
      type: 'linear', gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: bannerWidth, y2: 0 },
      colorStops: [
        { offset: 0, color: gradientStart },
        { offset: 0.5, color: gradientMid },
        { offset: 1, color: gradientEnd }
      ]
    });

    const t1Bar = new fabric.Rect(createProps('rect', {
      left: baseLeft, top: baseTop, width: bannerWidth, height: tier1Height,
      fill: t1Gradient, skewX: -12, rx: 6, ry: 6,
      stroke: borderHighlight, strokeWidth: 1.5,
      shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.6)', blur: 16, offsetX: 0, offsetY: 6 })
    }));
    objects.push(t1Bar);

    const flagImg = await createFabricFlagObject(nocCode, createProps('image', {
      left: baseLeft + 20, top: baseTop + 11, scaleX: 0.60, scaleY: 0.60, skewX: -12
    }));
    if (flagImg) {
      objects.push(flagImg);
    } else {
      const nocText = new fabric.Textbox(nocCode, createProps('textbox', {
        left: baseLeft + 20, top: baseTop + 10, fontSize: 24, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 80
      }));
      objects.push(nocText);
    }

    const nameText = new fabric.Textbox(nameStr, createProps('textbox', {
      left: baseLeft + 175, top: baseTop + 10, fontSize: 30, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: 750
    }));
    objects.push(nameText);

    const olympicRings = createOlympicRingsGroup(baseLeft + bannerWidth - 95, baseTop + 13, 11, 2.4);
    objects.push(olympicRings);

    // 2. Tier 2: Silver Metallic Strip
    const t2Top = baseTop + tier1Height + 2;
    const t2Gradient = new fabric.Gradient({
      type: 'linear', gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: bannerWidth - 30, y2: 0 },
      colorStops: [
        { offset: 0, color: '#ffffff' },
        { offset: 0.5, color: '#e2e8f0' },
        { offset: 1, color: '#cbd5e1' }
      ]
    });

    const t2Bar = new fabric.Rect(createProps('rect', {
      left: baseLeft + 15, top: t2Top, width: bannerWidth - 30, height: tier2Height,
      fill: t2Gradient, skewX: -12, rx: 4, ry: 4,
      stroke: 'rgba(0,0,0,0.2)', strokeWidth: 1
    }));
    objects.push(t2Bar);

    const roundText = new fabric.Textbox(roundStr, createProps('textbox', {
      left: baseLeft + 40, top: t2Top + 7, fontSize: 24, fontWeight: '900', fontStyle: 'italic',
      fill: '#1a2b42', width: 250
    }));
    objects.push(roundText);

    const diffText = new fabric.Textbox(diffStr, createProps('textbox', {
      left: baseLeft + 350, top: t2Top + 7, fontSize: 24, fontWeight: '900', fontStyle: 'italic',
      fill: '#1a2b42', width: 350, textAlign: 'center'
    }));
    objects.push(diffText);

    const posText = new fabric.Textbox(posStr, createProps('textbox', {
      left: baseLeft + bannerWidth - 380, top: t2Top + 7, fontSize: 24, fontWeight: '900', fontStyle: 'italic',
      fill: '#1a2b42', width: 330, textAlign: 'right'
    }));
    objects.push(posText);

    // 3. Tier 3: Dark Blue Strip (Dive Name)
    const t3Top = t2Top + tier2Height + 2;
    const t3Gradient = new fabric.Gradient({
      type: 'linear', gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: bannerWidth, y2: 0 },
      colorStops: [
        { offset: 0, color: '#091d36' },
        { offset: 0.5, color: '#0f2f57' },
        { offset: 1, color: '#071629' }
      ]
    });

    const t3Bar = new fabric.Rect(createProps('rect', {
      left: baseLeft, top: t3Top, width: bannerWidth, height: tier3Height,
      fill: t3Gradient, skewX: -12, rx: 4, ry: 4,
      stroke: borderHighlight, strokeWidth: 1
    }));
    objects.push(t3Bar);

    const diveNameText = new fabric.Textbox(diveNameStr, createProps('textbox', {
      left: baseLeft + 30, top: t3Top + 8, fontSize: 26, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: 1000
    }));
    objects.push(diveNameText);

    // 4. Tier 4: Bottom Rank Strip ("AFTER ROUND X", Red Rank Badge, Total Score)
    if (hasRankStrip && afterRoundStr) {
      const t4Top = t3Top + tier3Height + 2;
      const t4Bar = new fabric.Rect(createProps('rect', {
        left: baseLeft + 15, top: t4Top, width: 420, height: tier4Height,
        fill: t3Gradient, skewX: -12, rx: 4, ry: 4,
        stroke: borderHighlight, strokeWidth: 1
      }));
      objects.push(t4Bar);

      const afterText = new fabric.Textbox(afterRoundStr, createProps('textbox', {
        left: baseLeft + 30, top: t4Top + 8, fontSize: 22, fontWeight: '900', fontStyle: 'italic',
        fill: '#ffffff', width: 200
      }));
      objects.push(afterText);

      if (rankStr) {
        const rankBadge = new fabric.Rect(createProps('rect', {
          left: baseLeft + 240, top: t4Top + 6, width: 36, height: tier4Height - 12,
          fill: '#d32f2f', skewX: -12, rx: 3, ry: 3
        }));
        const rankText = new fabric.Textbox(String(rankStr), createProps('textbox', {
          left: baseLeft + 240, top: t4Top + 8, fontSize: 22, fontWeight: '900', fontStyle: 'italic',
          fill: '#ffffff', width: 36, textAlign: 'center'
        }));
        objects.push(rankBadge, rankText);
      }

      if (scoreStr) {
        const scoreText = new fabric.Textbox(String(scoreStr), createProps('textbox', {
          left: baseLeft + 290, top: t4Top + 7, fontSize: 24, fontWeight: '900', fontStyle: 'italic',
          fill: '#ffffff', width: 130, textAlign: 'center'
        }));
        objects.push(scoreText);
      }
    }

    return new fabric.Group(objects, {
      left: baseLeft, top: baseTop,
      originX: 'left', originY: 'top',
      scaleX: 1.0, scaleY: 1.0,
      subTargetCheck: true,
      id: generateUniqueId({ type: 'divingGroup' }),
      name: `DV008 Dive ID Variant ${variant.toUpperCase()} (${normId})`,
      selectable: true, hasControls: true
    });
  }

  // ── 8. DV009 - Position ID (Synchronised - Side-by-Side Dual Name Tags) ──
  if (normId.includes('DV009') || normId.includes('POSITION ID')) {
    const rawLeftName = (customData.leftName || customData.diver1 || customData.name1 || '').trim();
    const rawRightName = (customData.rightName || customData.diver2 || customData.name2 || '').trim();
    const rawNoc = (customData.noc || customData.country || '').trim();

    const isGenericLeft = !rawLeftName || rawLeftName.toUpperCase() === 'TOM DALEY';
    const isGenericRight = !rawRightName || rawRightName.toUpperCase() === 'TOM DALEY';
    const isGenericNoc = !rawNoc || rawNoc.toUpperCase() === 'GBR';

    const leftNameStr = (isGenericLeft ? 'TATIANA ORTIZ' : rawLeftName).toUpperCase();
    const rightNameStr = (isGenericRight ? 'PAOLA ESPINOSA' : rawRightName).toUpperCase();

    const leftNocCode = (customData.leftNoc || (isGenericNoc ? 'MEX' : rawNoc)).toUpperCase();
    const rightNocCode = (customData.rightNoc || (isGenericNoc ? 'MEX' : rawNoc)).toUpperCase();

    const baseTop = 912;
    const tagWidth = 650;
    const stripHeight = 54;

    const leftX = 240;
    const rightX = 1000;

    const createTagObjects = async (baseLeft, nocCode, diverName) => {
      const tagObjects = [];
      const stripGradient = new fabric.Gradient({
        type: 'linear', gradientUnits: 'pixels',
        coords: { x1: 0, y1: 0, x2: tagWidth, y2: 0 },
        colorStops: [
          { offset: 0, color: gradientStart },
          { offset: 0.5, color: gradientMid },
          { offset: 1, color: gradientEnd }
        ]
      });

      const bodyRect = new fabric.Rect(createProps('rect', {
        left: baseLeft, top: baseTop, width: tagWidth, height: stripHeight,
        fill: stripGradient, skewX: -12, rx: 6, ry: 6,
        stroke: borderHighlight, strokeWidth: 1.5,
        shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.6)', blur: 16, offsetX: 0, offsetY: 6 })
      }));
      tagObjects.push(bodyRect);

      const flagImg = await createFabricFlagObject(nocCode, createProps('image', {
        left: baseLeft + 20, top: baseTop + 11, scaleX: 0.60, scaleY: 0.60, skewX: -12
      }));
      if (flagImg) {
        tagObjects.push(flagImg);
      } else {
        const nocText = new fabric.Textbox(nocCode, createProps('textbox', {
          left: baseLeft + 20, top: baseTop + 10, fontSize: 24, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 80
        }));
        tagObjects.push(nocText);
      }

      const nameText = new fabric.Textbox(diverName, createProps('textbox', {
        left: baseLeft + 175, top: baseTop + 10, fontSize: 30, fontWeight: '900', fontStyle: 'italic',
        fill: '#ffffff', width: 450
      }));
      tagObjects.push(nameText);

      return tagObjects;
    };

    const leftTagObjs = await createTagObjects(leftX, leftNocCode, leftNameStr);
    const rightTagObjs = await createTagObjects(rightX, rightNocCode, rightNameStr);

    objects.push(...leftTagObjs, ...rightTagObjs);

    return new fabric.Group(objects, {
      left: leftX, top: baseTop,
      originX: 'left', originY: 'top',
      scaleX: 1.0, scaleY: 1.0,
      subTargetCheck: true,
      id: generateUniqueId({ type: 'divingGroup' }),
      name: `DV009 Position ID Synch (${normId})`,
      selectable: true, hasControls: true
    });
  }

  // ── 9. DV010 - Scorecard Individual (Variants A & B) ──
  if (normId.includes('DV010') || normId.includes('SCORECARD')) {
    const isVariantA = normId.includes('_A') || normId.endsWith('A') || (customData.variant || '').toUpperCase() === 'A';
    const isVariantB = !isVariantA && (normId.includes('_B') || normId.endsWith('B') || (customData.variant || '').toUpperCase() === 'B');

    let defaultNoc = 'RUS';
    let defaultName = 'ALEKSANDR DOBROSKOK';
    let defaultOrder = '3';
    let defaultRound = 'ROUND 1';
    let defaultDifficulty = 'DIFFICULTY 3.5';
    let defaultPenalty = 'PENALTY 0.00';
    let defaultScore = 'SCORE 78.75';
    let defaultScores = [
      { score: '7.0', struck: true },
      { score: '7.5', struck: false },
      { score: '7.0', struck: true },
      { score: '7.5', struck: false },
      { score: '7.5', struck: false },
      { score: '7.5', struck: false },
      { score: '7.5', struck: false }
    ];
    let defaultTotal = '';

    if (isVariantB) {
      defaultNoc = 'ITA';
      defaultName = 'TOMMASO MARCONI';
      defaultOrder = '28';
      defaultRound = 'ROUND 6';
      defaultDifficulty = 'DIFFICULTY 3.4';
      defaultPenalty = 'PENALTY 2.0';
      defaultScore = 'SCORE 47.30';
      defaultTotal = 'TOTAL 358.15';
      defaultScores = [
        { score: '5.0', struck: false },
        { score: '5.0', struck: false },
        { score: '4.5', struck: true },
        { score: '4.5', struck: false },
        { score: '5.0', struck: true },
        { score: '4.5', struck: false },
        { score: '5.0', struck: false }
      ];
    }

    const rawName = (customData.name || customData.athlete || '').trim();
    const rawNoc = (customData.noc || customData.country || '').trim();
    const isGenericName = !rawName || rawName.toUpperCase() === 'TOM DALEY';
    const isGenericNoc = !rawNoc || rawNoc.toUpperCase() === 'GBR';

    const nameStr = (isGenericName ? defaultName : rawName).toUpperCase();
    const nocCode = (isGenericNoc ? defaultNoc : rawNoc).toUpperCase();
    const orderStr = String(customData.order || customData.startOrder || defaultOrder);

    const rawRound = (customData.round || '').trim();
    const isGenericRound = !rawRound || rawRound.toUpperCase().includes('SYNCHRONISED') || rawRound.toUpperCase().includes('10M PLATFORM') || rawRound.toUpperCase().includes('DIVE 6');
    const roundStr = (isGenericRound ? defaultRound : rawRound).toUpperCase();

    const rawDiff = (customData.difficulty || '').trim();
    let formattedDiff = rawDiff;
    if (formattedDiff && !formattedDiff.toUpperCase().startsWith('DIFFICULTY')) {
      formattedDiff = `DIFFICULTY ${formattedDiff}`;
    }
    const diffStr = (formattedDiff ? formattedDiff : defaultDifficulty).toUpperCase();

    const rawPen = (customData.penalty || '').trim();
    let formattedPen = rawPen;
    if (formattedPen && !formattedPen.toUpperCase().startsWith('PENALTY')) {
      formattedPen = `PENALTY ${formattedPen}`;
    }
    const penaltyStr = (formattedPen ? formattedPen : defaultPenalty).toUpperCase();

    const rawScore = (customData.score || '').trim();
    let formattedScore = rawScore;
    if (formattedScore && !formattedScore.toUpperCase().startsWith('SCORE')) {
      formattedScore = `SCORE ${formattedScore}`;
    }
    const scoreStr = (formattedScore ? formattedScore : defaultScore).toUpperCase();

    const rawTotal = (customData.total || customData.totalScore || '').trim();
    let formattedTotal = rawTotal;
    if (formattedTotal && !formattedTotal.toUpperCase().startsWith('TOTAL')) {
      formattedTotal = `TOTAL ${formattedTotal}`;
    }
    const totalStr = (isVariantB ? (formattedTotal ? formattedTotal : defaultTotal) : '').toUpperCase();

    const scoresList = (customData.scores && customData.scores.length > 0) ? customData.scores : defaultScores;

    const bannerWidth = 1100;
    const tier1Height = 54;
    const tier2Height = 38;
    const tier3Height = 42;

    const totalHeight = tier1Height + tier2Height + tier3Height + 4;
    const targetBottomY = 966; // 114px bottom clearance
    const baseLeft = 333;
    const baseTop = targetBottomY - totalHeight;

    // 0. Top Total Score Tab (Variant B)
    if (totalStr) {
      const tabGradient = new fabric.Gradient({
        type: 'linear', gradientUnits: 'pixels',
        coords: { x1: 0, y1: 0, x2: 240, y2: 0 },
        colorStops: [
          { offset: 0, color: '#ffffff' },
          { offset: 0.5, color: '#e2e8f0' },
          { offset: 1, color: '#cbd5e1' }
        ]
      });

      const tabRect = new fabric.Rect(createProps('rect', {
        left: baseLeft + 45, top: baseTop - 34, width: 240, height: 32,
        fill: tabGradient, skewX: -12, rx: 4, ry: 4,
        stroke: 'rgba(0,0,0,0.2)', strokeWidth: 1
      }));
      const tabText = new fabric.Textbox(totalStr, createProps('textbox', {
        left: baseLeft + 55, top: baseTop - 30, fontSize: 22, fontWeight: '900', fontStyle: 'italic',
        fill: '#1a2b42', width: 220, textAlign: 'center'
      }));
      objects.push(tabRect, tabText);
    }

    // 1. Tier 1: Main Dark Blue Athlete Banner
    const t1Gradient = new fabric.Gradient({
      type: 'linear', gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: bannerWidth, y2: 0 },
      colorStops: [
        { offset: 0, color: gradientStart },
        { offset: 0.5, color: gradientMid },
        { offset: 1, color: gradientEnd }
      ]
    });

    const t1Bar = new fabric.Rect(createProps('rect', {
      left: baseLeft, top: baseTop, width: bannerWidth, height: tier1Height,
      fill: t1Gradient, skewX: -12, rx: 6, ry: 6,
      stroke: borderHighlight, strokeWidth: 1.5,
      shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.6)', blur: 16, offsetX: 0, offsetY: 6 })
    }));
    objects.push(t1Bar);

    // Red Order Number Badge
    const orderBadge = new fabric.Rect(createProps('rect', {
      left: baseLeft + 8, top: baseTop + 6, width: 44, height: tier1Height - 12,
      fill: '#d32f2f', skewX: -12, rx: 4, ry: 4
    }));
    const orderText = new fabric.Textbox(orderStr, createProps('textbox', {
      left: baseLeft + 8, top: baseTop + 10, fontSize: 28, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: 44, textAlign: 'center'
    }));
    objects.push(orderBadge, orderText);

    // Flag Image
    const flagImg = await createFabricFlagObject(nocCode, createProps('image', {
      left: baseLeft + 65, top: baseTop + 11, scaleX: 0.60, scaleY: 0.60, skewX: -12
    }));
    if (flagImg) {
      objects.push(flagImg);
    } else {
      const nocText = new fabric.Textbox(nocCode, createProps('textbox', {
        left: baseLeft + 65, top: baseTop + 10, fontSize: 24, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 80
      }));
      objects.push(nocText);
    }

    // Athlete Name
    const nameText = new fabric.Textbox(nameStr, createProps('textbox', {
      left: baseLeft + 220, top: baseTop + 10, fontSize: 30, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: 700
    }));
    objects.push(nameText);

    // Olympic Rings
    const olympicRings = createOlympicRingsGroup(baseLeft + bannerWidth - 95, baseTop + 13, 11, 2.4);
    objects.push(olympicRings);

    // 2. Tier 2: Silver Metallic Strip (Round, Difficulty, Penalty, Score)
    const t2Top = baseTop + tier1Height + 2;
    const t2Gradient = new fabric.Gradient({
      type: 'linear', gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: bannerWidth - 30, y2: 0 },
      colorStops: [
        { offset: 0, color: '#ffffff' },
        { offset: 0.5, color: '#e2e8f0' },
        { offset: 1, color: '#cbd5e1' }
      ]
    });

    const t2Bar = new fabric.Rect(createProps('rect', {
      left: baseLeft + 15, top: t2Top, width: bannerWidth - 30, height: tier2Height,
      fill: t2Gradient, skewX: -12, rx: 4, ry: 4,
      stroke: 'rgba(0,0,0,0.2)', strokeWidth: 1
    }));
    objects.push(t2Bar);

    // Round Text
    const roundText = new fabric.Textbox(roundStr, createProps('textbox', {
      left: baseLeft + 35, top: t2Top + 7, fontSize: 24, fontWeight: '900', fontStyle: 'italic',
      fill: '#1a2b42', width: 200
    }));
    objects.push(roundText);

    // Difficulty Text
    const diffText = new fabric.Textbox(diffStr, createProps('textbox', {
      left: baseLeft + 250, top: t2Top + 7, fontSize: 24, fontWeight: '900', fontStyle: 'italic',
      fill: '#1a2b42', width: 260
    }));
    objects.push(diffText);

    // Penalty Text
    const penaltyText = new fabric.Textbox(penaltyStr, createProps('textbox', {
      left: baseLeft + 520, top: t2Top + 7, fontSize: 24, fontWeight: '900', fontStyle: 'italic',
      fill: '#1a2b42', width: 260
    }));
    objects.push(penaltyText);

    // Score Text
    const scoreText = new fabric.Textbox(scoreStr, createProps('textbox', {
      left: baseLeft + bannerWidth - 320, top: t2Top + 6, fontSize: 26, fontWeight: '900', fontStyle: 'italic',
      fill: '#1a2b42', width: 280, textAlign: 'right'
    }));
    objects.push(scoreText);

    // 3. Tier 3: Dark Blue Strip (7 Judge Scores with Strikethroughs)
    const t3Top = t2Top + tier2Height + 2;
    const t3Gradient = new fabric.Gradient({
      type: 'linear', gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: bannerWidth, y2: 0 },
      colorStops: [
        { offset: 0, color: '#091d36' },
        { offset: 0.5, color: '#0f2f57' },
        { offset: 1, color: '#071629' }
      ]
    });

    const t3Bar = new fabric.Rect(createProps('rect', {
      left: baseLeft, top: t3Top, width: bannerWidth, height: tier3Height,
      fill: t3Gradient, skewX: -12, rx: 4, ry: 4,
      stroke: borderHighlight, strokeWidth: 1
    }));
    objects.push(t3Bar);

    // Render 7 Scores
    const colWidth = bannerWidth / scoresList.length;
    for (let index = 0; index < scoresList.length; index++) {
      const item = scoresList[index];
      const valStr = typeof item === 'object' ? item.score : String(item);
      const isStruck = typeof item === 'object' ? item.struck : false;

      const colX = baseLeft + (index * colWidth);

      const sText = new fabric.Textbox(valStr, createProps('textbox', {
        left: colX, top: t3Top + 7, fontSize: 26, fontWeight: '900', fontStyle: 'italic',
        fill: '#ffffff', width: colWidth, textAlign: 'center'
      }));
      objects.push(sText);

      if (isStruck) {
        const strikeLine = new fabric.Line([colX + 50, t3Top + 21, colX + colWidth - 50, t3Top + 21], createProps('line', {
          stroke: '#ffffff', strokeWidth: 3, skewX: -12
        }));
        objects.push(strikeLine);
      }
    }

    const groupTop = totalStr ? (baseTop - 34) : baseTop;

    return new fabric.Group(objects, {
      left: baseLeft, top: groupTop,
      originX: 'left', originY: 'top',
      scaleX: 1.0, scaleY: 1.0,
      subTargetCheck: true,
      id: generateUniqueId({ type: 'divingGroup' }),
      name: `DV010 Scorecard Individual ${isVariantB ? 'Variant B' : 'Variant A'} (${normId})`,
      selectable: true, hasControls: true
    });
  }

  // ── 10. DV011 - Scorecard Synch (Variants A & B) ──
  if (normId.includes('DV011') || normId.includes('SYNCH')) {
    const isVariantA = normId.includes('_A') || normId.endsWith('A') || (customData.variant || '').toUpperCase() === 'A';
    const isVariantB = !isVariantA && (normId.includes('_B') || normId.endsWith('B') || (customData.variant || '').toUpperCase() === 'B');

    let defaultNoc = 'AUS';
    let defaultName = 'BRIONY COLE / MELISSA WU';
    let defaultOrder = '3';
    let defaultRound = 'ROUND 1';
    let defaultDifficulty = 'DIFFICULTY 3.4';
    let defaultPenalty = 'PENALTY 0.00';
    let defaultScore = 'SCORE 144.50';
    let defaultTotal = '';
    let defaultScores = [
      { score: '7.5', struck: false },
      { score: '8.0', struck: true },
      { score: '7.0', struck: true },
      { score: '9.0', struck: false },
      { score: '8.5', struck: false },
      { score: '9.0', struck: false },
      { score: '8.5', struck: true },
      { score: '9.0', struck: false },
      { score: '9.0', struck: false },
      { score: '8.5', struck: false },
      { score: '8.5', struck: false }
    ];

    if (isVariantB) {
      defaultNoc = 'CAN';
      defaultName = 'M. BENFEITO / R. FILION';
      defaultOrder = '6';
      defaultRound = 'ROUND 5';
      defaultDifficulty = 'DIFFICULTY 3.4';
      defaultPenalty = 'PENALTY 2.00';
      defaultScore = 'SCORE 118.70';
      defaultTotal = 'TOTAL 583.40';
      defaultScores = [
        { score: '6.0', struck: true },
        { score: '7.0', struck: true },
        { score: '6.5', struck: false },
        { score: '5.0', struck: false },
        { score: '5.5', struck: false },
        { score: '4.5', struck: true },
        { score: '8.0', struck: true },
        { score: '8.0', struck: false },
        { score: '8.0', struck: false },
        { score: '8.0', struck: false },
        { score: '7.5', struck: true }
      ];
    }

    const rawName = (customData.name || customData.pair || customData.athlete || '').trim();
    const rawNoc = (customData.noc || customData.country || '').trim();
    const isGenericName = !rawName || rawName.toUpperCase() === 'TOM DALEY';
    const isGenericNoc = !rawNoc || rawNoc.toUpperCase() === 'GBR';

    const nameStr = (isGenericName ? defaultName : rawName).toUpperCase();
    const nocCode = (isGenericNoc ? defaultNoc : rawNoc).toUpperCase();
    const orderStr = String(customData.order || customData.startOrder || defaultOrder);

    const rawRound = (customData.round || '').trim();
    const isGenericRound = !rawRound || rawRound.toUpperCase().includes('SYNCHRONISED') || rawRound.toUpperCase().includes('10M PLATFORM') || rawRound.toUpperCase().includes('DIVE 6');
    const roundStr = (isGenericRound ? defaultRound : rawRound).toUpperCase();

    const rawDiff = (customData.difficulty || '').trim();
    let formattedDiff = rawDiff;
    if (formattedDiff && !formattedDiff.toUpperCase().startsWith('DIFFICULTY')) {
      formattedDiff = `DIFFICULTY ${formattedDiff}`;
    }
    const diffStr = (formattedDiff ? formattedDiff : defaultDifficulty).toUpperCase();

    const rawPen = (customData.penalty || '').trim();
    let formattedPen = rawPen;
    if (formattedPen && !formattedPen.toUpperCase().startsWith('PENALTY')) {
      formattedPen = `PENALTY ${formattedPen}`;
    }
    const penaltyStr = (formattedPen ? formattedPen : defaultPenalty).toUpperCase();

    const rawScore = (customData.score || '').trim();
    let formattedScore = rawScore;
    if (formattedScore && !formattedScore.toUpperCase().startsWith('SCORE')) {
      formattedScore = `SCORE ${formattedScore}`;
    }
    const scoreStr = (formattedScore ? formattedScore : defaultScore).toUpperCase();

    const rawTotal = (customData.total || customData.totalScore || '').trim();
    let formattedTotal = rawTotal;
    if (formattedTotal && !formattedTotal.toUpperCase().startsWith('TOTAL')) {
      formattedTotal = `TOTAL ${formattedTotal}`;
    }
    const totalStr = (isVariantB ? (formattedTotal ? formattedTotal : defaultTotal) : '').toUpperCase();

    const scoresList = (customData.scores && customData.scores.length === 11) ? customData.scores : defaultScores;

    const bannerWidth = 1100;
    const tier1Height = 54;
    const tier2Height = 38;
    const tier3Height = 28;
    const tier4Height = 38;

    const totalHeight = tier1Height + tier2Height + tier3Height + tier4Height + 6;
    const targetBottomY = 966; // 114px bottom clearance
    const baseLeft = 333;
    const baseTop = targetBottomY - totalHeight;

    // 0. Top Total Score Tab (Variant B)
    if (totalStr) {
      const tabGradient = new fabric.Gradient({
        type: 'linear', gradientUnits: 'pixels',
        coords: { x1: 0, y1: 0, x2: 240, y2: 0 },
        colorStops: [
          { offset: 0, color: '#ffffff' },
          { offset: 0.5, color: '#e2e8f0' },
          { offset: 1, color: '#cbd5e1' }
        ]
      });

      const tabRect = new fabric.Rect(createProps('rect', {
        left: baseLeft + 45, top: baseTop - 34, width: 240, height: 32,
        fill: tabGradient, skewX: -12, rx: 4, ry: 4,
        stroke: 'rgba(0,0,0,0.2)', strokeWidth: 1
      }));
      const tabText = new fabric.Textbox(totalStr, createProps('textbox', {
        left: baseLeft + 55, top: baseTop - 30, fontSize: 22, fontWeight: '900', fontStyle: 'italic',
        fill: '#1a2b42', width: 220, textAlign: 'center'
      }));
      objects.push(tabRect, tabText);
    }

    // 1. Tier 1: Main Dark Blue Athlete Banner
    const t1Gradient = new fabric.Gradient({
      type: 'linear', gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: bannerWidth, y2: 0 },
      colorStops: [
        { offset: 0, color: gradientStart },
        { offset: 0.5, color: gradientMid },
        { offset: 1, color: gradientEnd }
      ]
    });

    const t1Bar = new fabric.Rect(createProps('rect', {
      left: baseLeft, top: baseTop, width: bannerWidth, height: tier1Height,
      fill: t1Gradient, skewX: -12, rx: 6, ry: 6,
      stroke: borderHighlight, strokeWidth: 1.5,
      shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.6)', blur: 16, offsetX: 0, offsetY: 6 })
    }));
    objects.push(t1Bar);

    // Red Order Number Badge
    const orderBadge = new fabric.Rect(createProps('rect', {
      left: baseLeft + 8, top: baseTop + 6, width: 44, height: tier1Height - 12,
      fill: '#d32f2f', skewX: -12, rx: 4, ry: 4
    }));
    const orderText = new fabric.Textbox(orderStr, createProps('textbox', {
      left: baseLeft + 8, top: baseTop + 10, fontSize: 28, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: 44, textAlign: 'center'
    }));
    objects.push(orderBadge, orderText);

    // Flag Image
    const flagImg = await createFabricFlagObject(nocCode, createProps('image', {
      left: baseLeft + 65, top: baseTop + 11, scaleX: 0.60, scaleY: 0.60, skewX: -12
    }));
    if (flagImg) {
      objects.push(flagImg);
    } else {
      const nocText = new fabric.Textbox(nocCode, createProps('textbox', {
        left: baseLeft + 65, top: baseTop + 10, fontSize: 24, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 80
      }));
      objects.push(nocText);
    }

    // Athlete Pair Name
    const nameText = new fabric.Textbox(nameStr, createProps('textbox', {
      left: baseLeft + 220, top: baseTop + 10, fontSize: 30, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: 700
    }));
    objects.push(nameText);

    // Olympic Rings
    const olympicRings = createOlympicRingsGroup(baseLeft + bannerWidth - 95, baseTop + 13, 11, 2.4);
    objects.push(olympicRings);

    // 2. Tier 2: Silver Metallic Strip (Round, Difficulty, Penalty, Score)
    const t2Top = baseTop + tier1Height + 2;
    const t2Gradient = new fabric.Gradient({
      type: 'linear', gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: bannerWidth - 30, y2: 0 },
      colorStops: [
        { offset: 0, color: '#ffffff' },
        { offset: 0.5, color: '#e2e8f0' },
        { offset: 1, color: '#cbd5e1' }
      ]
    });

    const t2Bar = new fabric.Rect(createProps('rect', {
      left: baseLeft + 15, top: t2Top, width: bannerWidth - 30, height: tier2Height,
      fill: t2Gradient, skewX: -12, rx: 4, ry: 4,
      stroke: 'rgba(0,0,0,0.2)', strokeWidth: 1
    }));
    objects.push(t2Bar);

    // Round Text
    const roundText = new fabric.Textbox(roundStr, createProps('textbox', {
      left: baseLeft + 35, top: t2Top + 7, fontSize: 24, fontWeight: '900', fontStyle: 'italic',
      fill: '#1a2b42', width: 200
    }));
    objects.push(roundText);

    // Difficulty Text
    const diffText = new fabric.Textbox(diffStr, createProps('textbox', {
      left: baseLeft + 250, top: t2Top + 7, fontSize: 24, fontWeight: '900', fontStyle: 'italic',
      fill: '#1a2b42', width: 260
    }));
    objects.push(diffText);

    // Penalty Text
    const penaltyText = new fabric.Textbox(penaltyStr, createProps('textbox', {
      left: baseLeft + 520, top: t2Top + 7, fontSize: 24, fontWeight: '900', fontStyle: 'italic',
      fill: '#1a2b42', width: 260
    }));
    objects.push(penaltyText);

    // Score Text
    const scoreText = new fabric.Textbox(scoreStr, createProps('textbox', {
      left: baseLeft + bannerWidth - 320, top: t2Top + 6, fontSize: 26, fontWeight: '900', fontStyle: 'italic',
      fill: '#1a2b42', width: 280, textAlign: 'right'
    }));
    objects.push(scoreText);

    // 3. Tier 3: Headings Strip (EXECUTION & SYNCHRONISATION)
    const t3Top = t2Top + tier2Height + 2;
    const t3Gradient = new fabric.Gradient({
      type: 'linear', gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: bannerWidth, y2: 0 },
      colorStops: [
        { offset: 0, color: '#091d36' },
        { offset: 0.5, color: '#0f2f57' },
        { offset: 1, color: '#071629' }
      ]
    });

    const t3Bar = new fabric.Rect(createProps('rect', {
      left: baseLeft, top: t3Top, width: bannerWidth, height: tier3Height,
      fill: t3Gradient, skewX: -12, rx: 4, ry: 4,
      stroke: borderHighlight, strokeWidth: 1
    }));
    objects.push(t3Bar);

    // Sub-header Titles inside Tier 3
    const execHeader = new fabric.Textbox('EXECUTION', createProps('textbox', {
      left: baseLeft + 15, top: t3Top + 4, fontSize: 18, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: 580, textAlign: 'center'
    }));
    const synchHeader = new fabric.Textbox('SYNCHRONISATION', createProps('textbox', {
      left: baseLeft + 600, top: t3Top + 4, fontSize: 18, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: 480, textAlign: 'center'
    }));
    objects.push(execHeader, synchHeader);

    // 4. Tier 4: Scores Strip (11 Judge Scores)
    const t4Top = t3Top + tier3Height + 2;
    const t4Bar = new fabric.Rect(createProps('rect', {
      left: baseLeft, top: t4Top, width: bannerWidth, height: tier4Height,
      fill: t3Gradient, skewX: -12, rx: 4, ry: 4,
      stroke: borderHighlight, strokeWidth: 1
    }));
    objects.push(t4Bar);

    // Render 11 Scores
    const colWidth = bannerWidth / 11; // 100px per col
    for (let index = 0; index < 11; index++) {
      const item = scoresList[index] || { score: '0.0', struck: false };
      const valStr = typeof item === 'object' ? item.score : String(item);
      const isStruck = typeof item === 'object' ? item.struck : false;

      const colX = baseLeft + (index * colWidth);

      const sText = new fabric.Textbox(valStr, createProps('textbox', {
        left: colX, top: t4Top + 6, fontSize: 26, fontWeight: '900', fontStyle: 'italic',
        fill: '#ffffff', width: colWidth, textAlign: 'center'
      }));
      objects.push(sText);

      if (isStruck) {
        const strikeLine = new fabric.Line([colX + 30, t4Top + 20, colX + colWidth - 30, t4Top + 20], createProps('line', {
          stroke: '#ffffff', strokeWidth: 3, skewX: -12
        }));
        objects.push(strikeLine);
      }
    }

    const groupTop = totalStr ? (baseTop - 34) : baseTop;

    return new fabric.Group(objects, {
      left: baseLeft, top: groupTop,
      originX: 'left', originY: 'top',
      scaleX: 1.0, scaleY: 1.0,
      subTargetCheck: true,
      id: generateUniqueId({ type: 'divingGroup' }),
      name: `DV011 Scorecard Synch ${isVariantB ? 'Variant B' : 'Variant A'} (${normId})`,
      selectable: true, hasControls: true
    });
  }

  // ── 11. DV012 - Winner / Winners / Place ID (Variants A & B) ──
  if (normId.includes('DV012') || normId.includes('WINNER') || normId.includes('PLACE ID')) {
    const isVariantB = normId.includes('_B') || normId.endsWith('B') || (customData.variant || '').toUpperCase() === 'B';

    let defaultEvent = isVariantB ? "WOMEN'S SYNCHRONISED 10M PLATFORM" : "WOMEN'S 10M PLATFORM";
    let defaultSubTitle = isVariantB ? "WINNERS" : "WINNER";
    let defaultNoc = 'CHN';
    let defaultName = isVariantB ? 'WANG XIN / CHEN RUOLIN' : 'CHEN RUOLIN';
    let defaultScore = isVariantB ? '363.54' : 'OR 447.70';

    const rawEvent = (customData.event || customData.title || customData.eventName || '').trim();
    const eventTitle = (rawEvent ? rawEvent : defaultEvent).toUpperCase();

    const rawSub = (customData.subtitle || customData.subTitle || customData.winnerTitle || '').trim();
    const subTitle = (rawSub ? rawSub : defaultSubTitle).toUpperCase();

    const rawName = (customData.name || customData.athlete || customData.winnerName || '').trim();
    const isGenericName = !rawName || rawName.toUpperCase() === 'TOM DALEY';
    const nameStr = (isGenericName ? defaultName : rawName).toUpperCase();

    const rawNoc = (customData.noc || customData.country || '').trim();
    const isGenericNoc = !rawNoc || rawNoc.toUpperCase() === 'GBR';
    const nocCode = (isGenericNoc ? defaultNoc : rawNoc).toUpperCase();

    const rawScore = (customData.score || customData.result || customData.totalScore || '').trim();
    const scoreStr = (rawScore ? rawScore : defaultScore).toUpperCase();

    const bannerWidth = 1100;
    const tier1Height = 54;
    const tier2Height = 38;
    const tier3Height = 54;

    const totalHeight = tier1Height + tier2Height + tier3Height + 4;
    const targetBottomY = 966; // 114px bottom clearance
    const baseLeft = 333;
    const baseTop = targetBottomY - totalHeight; // 816px

    // 1. Tier 1: Header Blue Skewed Banner (Event Title)
    const t1Gradient = new fabric.Gradient({
      type: 'linear', gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: bannerWidth, y2: 0 },
      colorStops: [
        { offset: 0, color: gradientStart },
        { offset: 0.5, color: gradientMid },
        { offset: 1, color: gradientEnd }
      ]
    });

    const t1Bar = new fabric.Rect(createProps('rect', {
      left: baseLeft, top: baseTop, width: bannerWidth, height: tier1Height,
      fill: t1Gradient, skewX: -12, rx: 6, ry: 6,
      stroke: borderHighlight, strokeWidth: 1.5,
      shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.6)', blur: 16, offsetX: 0, offsetY: 6 })
    }));
    objects.push(t1Bar);

    // Diving Pictograph Icon Box
    const pictoBox = new fabric.Rect(createProps('rect', {
      left: baseLeft + 8, top: baseTop + 6, width: 44, height: tier1Height - 12,
      fill: 'rgba(255,255,255,0.15)', skewX: -12, rx: 4, ry: 4
    }));
    const pikeBody = new fabric.Path('M 40 78 L 40 25 C 40 12, 68 10, 72 30 L 68 48 C 65 52, 58 52, 54 46 L 50 32 C 48 24, 46 24, 46 30 L 46 78 Z', {
      left: 12, top: 0, fill: '#ffffff', selectable: false
    });
    const headHeart = new fabric.Path('M 64 48 C 56 48, 54 58, 62 66 C 68 72, 74 68, 74 58 C 74 50, 70 48, 64 48 Z', {
      left: 28, top: 18, fill: '#ffffff', selectable: false
    });
    const waterWaves = new fabric.Path('M 10 92 Q 22 87, 34 92 T 58 92 T 82 92', {
      left: 0, top: 38, fill: '', stroke: '#ffffff', strokeWidth: 3, strokeLineCap: 'round', selectable: false
    });
    const pictoGroup = new fabric.Group([pikeBody, headHeart, waterWaves], {
      left: baseLeft + 12, top: baseTop + 10, scaleX: 0.38, scaleY: 0.38, skewX: -12, selectable: false
    });
    objects.push(pictoBox, pictoGroup);

    // Event Title Text
    const headText = new fabric.Textbox(eventTitle, createProps('textbox', {
      left: baseLeft + 65, top: baseTop + 10, fontSize: 30, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: 850
    }));
    objects.push(headText);

    // Olympic Rings
    const olympicRings = createOlympicRingsGroup(baseLeft + bannerWidth - 95, baseTop + 13, 11, 2.4);
    objects.push(olympicRings);

    // 2. Tier 2: Silver Metallic Sub-Header Strip (WINNER / WINNERS)
    const t2Top = baseTop + tier1Height + 2;
    const t2Gradient = new fabric.Gradient({
      type: 'linear', gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: bannerWidth - 30, y2: 0 },
      colorStops: [
        { offset: 0, color: '#ffffff' },
        { offset: 0.5, color: '#e2e8f0' },
        { offset: 1, color: '#cbd5e1' }
      ]
    });

    const t2Bar = new fabric.Rect(createProps('rect', {
      left: baseLeft + 15, top: t2Top, width: bannerWidth - 30, height: tier2Height,
      fill: t2Gradient, skewX: -12, rx: 4, ry: 4,
      stroke: 'rgba(0,0,0,0.2)', strokeWidth: 1
    }));
    objects.push(t2Bar);

    const subText = new fabric.Textbox(subTitle, createProps('textbox', {
      left: baseLeft + 35, top: t2Top + 7, fontSize: 24, fontWeight: '900', fontStyle: 'italic',
      fill: '#1a2b42', width: 800
    }));
    objects.push(subText);

    // 3. Tier 3: Main Dark Blue Athlete Result Banner
    const t3Top = t2Top + tier2Height + 2;
    const t3Gradient = new fabric.Gradient({
      type: 'linear', gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: bannerWidth, y2: 0 },
      colorStops: [
        { offset: 0, color: gradientStart },
        { offset: 0.5, color: gradientMid },
        { offset: 1, color: gradientEnd }
      ]
    });

    const t3Bar = new fabric.Rect(createProps('rect', {
      left: baseLeft, top: t3Top, width: bannerWidth, height: tier3Height,
      fill: t3Gradient, skewX: -12, rx: 6, ry: 6,
      stroke: borderHighlight, strokeWidth: 1.5,
      shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.6)', blur: 16, offsetX: 0, offsetY: 6 })
    }));
    objects.push(t3Bar);

    // Flag Image
    const flagImg = await createFabricFlagObject(nocCode, createProps('image', {
      left: baseLeft + 20, top: t3Top + 11, scaleX: 0.60, scaleY: 0.60, skewX: -12
    }));
    if (flagImg) {
      objects.push(flagImg);
    } else {
      const nocText = new fabric.Textbox(nocCode, createProps('textbox', {
        left: baseLeft + 20, top: t3Top + 10, fontSize: 24, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 80
      }));
      objects.push(nocText);
    }

    // Athlete Name Text
    const nameText = new fabric.Textbox(nameStr, createProps('textbox', {
      left: baseLeft + 180, top: t3Top + 10, fontSize: 30, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: 620
    }));
    objects.push(nameText);

    // Score / Result Text
    const resultText = new fabric.Textbox(scoreStr, createProps('textbox', {
      left: baseLeft + bannerWidth - 320, top: t3Top + 10, fontSize: 30, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: 280, textAlign: 'right'
    }));
    objects.push(resultText);

    return new fabric.Group(objects, {
      left: baseLeft, top: baseTop,
      originX: 'left', originY: 'top',
      scaleX: 1.0, scaleY: 1.0,
      subTargetCheck: true,
      id: generateUniqueId({ type: 'divingGroup' }),
      name: `DV012 Winner / Place ID ${isVariantB ? 'Variant B' : 'Variant A'} (${normId})`,
      selectable: true, hasControls: true
    });
  }

  // ── 12. DV014 - Top 3-5 (Variants A & B) ──
  if (normId.includes('DV014') || normId.includes('TOP 3') || normId.includes('TOP 5')) {
    const isVariantB = normId.includes('_B') || normId.endsWith('B') || (customData.variant || '').toUpperCase() === 'B';

    let defaultTitle = isVariantB ? 'FINAL' : 'SEMI-FINAL';
    let defaultRows = [
      { rank: '1', noc: 'GER', name: 'P. ROZENBERG', score: '84.00' },
      { rank: '2', noc: 'CAN', name: 'A. DESPATIE', score: '81.00' },
      { rank: '3', noc: 'RUS', name: 'A. DOBROSKOK', score: '78.75' }
    ];

    if (isVariantB) {
      defaultRows = [
        { rank: '1', noc: 'CHN', name: 'WANG X. / CHEN R.', score: '422.28' },
        { rank: '2', noc: 'PRK', name: 'CHOE K.H. / KIM U.H.', score: '409.28' },
        { rank: '3', noc: 'AUS', name: 'B. COLE / M. WU', score: '403.16' },
        { rank: '4', noc: 'GER', name: 'A. GAMM / N. SUBSCHINSKI', score: '390.82' },
        { rank: '5', noc: 'USA', name: 'M. DUNNICHAY / H. ISHIMATSU', score: '382.76' }
      ];
    }

    const rawTitle = (customData.title || customData.round || customData.header || '').trim();
    const tabTitle = (rawTitle ? rawTitle : defaultTitle).toUpperCase();

    const isVariantA = !isVariantB;
    const maxRows = isVariantA ? 3 : 5;

    const rawRows = (customData.rows && customData.rows.length > 0)
      ? customData.rows
      : (customData.standings && customData.standings.length > 0)
      ? customData.standings
      : defaultRows;
    const rowsList = rawRows.slice(0, maxRows);

    const bannerWidth = 1100;
    const tabHeight = 32;
    const rowHeight = 38;
    const rowGap = 3;

    const totalHeight = tabHeight + 2 + (rowsList.length * rowHeight) + ((rowsList.length - 1) * rowGap);
    const targetBottomY = 966; // 114px bottom clearance
    const baseLeft = 333;
    const baseTop = targetBottomY - totalHeight;

    // Top Header Silver Tab
    const tabGradient = new fabric.Gradient({
      type: 'linear', gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: 240, y2: 0 },
      colorStops: [
        { offset: 0, color: '#ffffff' },
        { offset: 0.5, color: '#e2e8f0' },
        { offset: 1, color: '#cbd5e1' }
      ]
    });

    const tabRect = new fabric.Rect(createProps('rect', {
      left: baseLeft + 45, top: baseTop, width: 240, height: tabHeight,
      fill: tabGradient, skewX: -12, rx: 4, ry: 4,
      stroke: 'rgba(0,0,0,0.2)', strokeWidth: 1
    }));
    const tabText = new fabric.Textbox(tabTitle, createProps('textbox', {
      left: baseLeft + 55, top: baseTop + 4, fontSize: 22, fontWeight: '900', fontStyle: 'italic',
      fill: '#1a2b42', width: 220, textAlign: 'center'
    }));
    objects.push(tabRect, tabText);

    // Rows
    for (let i = 0; i < rowsList.length; i++) {
      const item = rowsList[i];
      const rTop = baseTop + tabHeight + 2 + i * (rowHeight + rowGap);
      const rRank = String(item.rank || (i + 1));
      const rNoc = (item.noc || item.country || 'CHN').toUpperCase();
      const rName = (item.name || item.athlete || item.pair || '').toUpperCase();
      const rScore = String(item.score || item.total || item.points || '');

      const rowGradient = new fabric.Gradient({
        type: 'linear', gradientUnits: 'pixels',
        coords: { x1: 0, y1: 0, x2: bannerWidth, y2: 0 },
        colorStops: [
          { offset: 0, color: gradientStart },
          { offset: 0.5, color: gradientMid },
          { offset: 1, color: gradientEnd }
        ]
      });

      const rowBar = new fabric.Rect(createProps('rect', {
        left: baseLeft, top: rTop, width: bannerWidth, height: rowHeight,
        fill: rowGradient, skewX: -12, rx: 4, ry: 4,
        stroke: borderHighlight, strokeWidth: 1
      }));
      objects.push(rowBar);

      // Red Rank Badge
      const rankBadge = new fabric.Rect(createProps('rect', {
        left: baseLeft + 6, top: rTop + 4, width: 32, height: rowHeight - 8,
        fill: '#d32f2f', skewX: -12, rx: 3, ry: 3
      }));
      const rankText = new fabric.Textbox(rRank, createProps('textbox', {
        left: baseLeft + 6, top: rTop + 7, fontSize: 22, fontWeight: '900', fontStyle: 'italic',
        fill: '#ffffff', width: 32, textAlign: 'center'
      }));
      objects.push(rankBadge, rankText);

      // Flag Image
      const flagImg = await createFabricFlagObject(rNoc, createProps('image', {
        left: baseLeft + 55, top: rTop + 6, scaleX: 0.50, scaleY: 0.50, skewX: -12
      }));
      if (flagImg) {
        objects.push(flagImg);
      } else {
        const nocText = new fabric.Textbox(rNoc, createProps('textbox', {
          left: baseLeft + 50, top: rTop + 7, fontSize: 20, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 60
        }));
        objects.push(nocText);
      }

      // Athlete Name Text (with clear gap after Flag Image)
      const nameText = new fabric.Textbox(rName, createProps('textbox', {
        left: baseLeft + 175, top: rTop + 7, fontSize: 24, fontWeight: '900', fontStyle: 'italic',
        fill: '#ffffff', width: 640
      }));
      objects.push(nameText);

      // Score Text
      const scoreText = new fabric.Textbox(rScore, createProps('textbox', {
        left: baseLeft + bannerWidth - 220, top: rTop + 7, fontSize: 24, fontWeight: '900', fontStyle: 'italic',
        fill: '#ffffff', width: 200, textAlign: 'right'
      }));
      objects.push(scoreText);
    }

    return new fabric.Group(objects, {
      left: baseLeft, top: baseTop,
      originX: 'left', originY: 'top',
      scaleX: 1.0, scaleY: 1.0,
      subTargetCheck: true,
      id: generateUniqueId({ type: 'divingGroup' }),
      name: `DV014 Top 3-5 ${isVariantB ? 'Variant B' : 'Variant A'} (${normId})`,
      selectable: true, hasControls: true
    });
  }

  // ── 13. DV015 - Standings / Result (Variants A, B, C, D, E) ──
  if (normId.includes('DV015') || normId.includes('STANDINGS') || normId.includes('RESULT')) {
    let variant = 'a';
    const variantStr = (
      (customData.variant || '') + ' ' + 
      (customData.image || '') + ' ' + 
      (customData.selectedImage || '') + ' ' + 
      (customData.subType || '') + ' ' + 
      (customData.subTemplate || '') + ' ' + 
      (customData.title || '') + ' ' + 
      normId
    ).toLowerCase();

    if (variantStr.includes('_b') || variantStr.endsWith('b') || variantStr.includes('variant b') || variantStr.includes('result_b')) variant = 'b';
    else if (variantStr.includes('_c') || variantStr.endsWith('c') || variantStr.includes('variant c') || variantStr.includes('result_c')) variant = 'c';
    else if (variantStr.includes('_d') || variantStr.endsWith('d') || variantStr.includes('variant d') || variantStr.includes('result_d')) variant = 'd';
    else if (variantStr.includes('_e') || variantStr.endsWith('e') || variantStr.includes('variant e') || variantStr.includes('result_e')) variant = 'e';
    else if (variantStr.includes('_a') || variantStr.endsWith('a') || variantStr.includes('variant a') || variantStr.includes('result_a')) variant = 'a';

    let defaultEvent = "MEN'S 3M SPRINGBOARD";
    let defaultSubTitle = "PRELIMINARY - STANDINGS AFTER ROUND 6";
    let defaultRows = [];

    if (variant === 'a') {
      defaultEvent = "MEN'S 3M SPRINGBOARD";
      defaultSubTitle = "PRELIMINARY - STANDINGS AFTER ROUND 6";
      defaultRows = [
        { rank: '1', noc: 'CHN', name: 'HE CHONG', status: 'Q', score: '515.50' },
        { rank: '2', noc: 'CHN', name: 'QIN KAI', status: 'Q', score: '502.95' },
        { rank: '3', noc: 'MEX', name: 'YAHEL CASTILLO', status: 'Q', score: '480.65' },
        { rank: '4', noc: 'RUS', name: 'DMITRY SAUTIN', status: 'Q', score: '474.85' },
        { rank: '5', noc: 'FIN', name: 'JOONA PUHAKKA', status: 'Q', score: '469.45' },
        { rank: '6', noc: 'AUS', name: 'ROBERT NEWBERY', status: 'Q', score: '465.15' },
        { rank: '7', noc: 'USA', name: 'CHRIS COLWILL', status: 'Q', score: '464.75' },
        { rank: '8', noc: 'UKR', name: 'ILLYA KVASHA', status: 'Q', score: '461.65' },
        { rank: '9', noc: 'CAN', name: 'ALEXANDRE DESPATIE', status: 'Q', score: '453.60' },
        { rank: '10', noc: 'JPN', name: 'KEN TERAUCHI', status: 'Q', score: '452.80' }
      ];
    } else if (variant === 'b') {
      defaultEvent = "WOMEN'S SYNCHRONISED 10M PLATFORM";
      defaultSubTitle = "FINAL - STANDINGS AFTER ROUND 3";
      defaultRows = [
        { rank: '1', noc: 'CHN', name: 'WANG XIN / CHEN RUOLIN', score: '422.28' },
        { rank: '2', noc: 'PRK', name: 'CHOE KUM HUI / KIM UN HYANG', score: '409.28' },
        { rank: '3', noc: 'AUS', name: 'BRIONY COLE / MELISSA WU', score: '403.16' },
        { rank: '4', noc: 'GER', name: 'ANNETT GAMM / NORA SUBSCHINSKI', score: '390.82' },
        { rank: '5', noc: 'USA', name: 'MARYBETH DUNNICHAY / HALEY ISHIMATSU', score: '382.76' },
        { rank: '6', noc: 'MEX', name: 'PAOLA ESPINOSA / TATIANA ORTIZ', score: '370.67' },
        { rank: '7', noc: 'GBR', name: 'TONIA COUCH / STACIE POWELL', score: '351.24' },
        { rank: '8', noc: 'CAN', name: 'MEAGHAN BENFEITO / ROSELINE FILION', score: '336.76' }
      ];
    } else if (variant === 'c') {
      defaultEvent = "MEN'S 3M SPRINGBOARD";
      defaultSubTitle = "RESULT - FINAL";
      defaultRows = [
        { rank: '1', noc: 'CHN', name: 'HE CHONG', score: '572.90' },
        { rank: '2', noc: 'CAN', name: 'ALEXANDRE DESPATIE', score: '536.65' },
        { rank: '3', noc: 'CHN', name: 'QIN KAI', score: '530.10' },
        { rank: '4', noc: 'RUS', name: 'DMITRY SAUTIN', score: '512.65' },
        { rank: '5', noc: 'GER', name: 'PAVLO ROZENBERG', score: '485.60' },
        { rank: '6', noc: 'USA', name: 'TROY DUMAIS', score: '472.50' }
      ];
    } else if (variant === 'd') {
      defaultEvent = "MEN'S 3M SPRINGBOARD";
      defaultSubTitle = "RESULT - FINAL";
      defaultRows = [
        { rank: '7', noc: 'MEX', name: 'YAHEL CASTILLO', score: '462.10' },
        { rank: '8', noc: 'GER', name: 'PATRICK HAUSDING', score: '462.05' },
        { rank: '9', noc: 'AUS', name: 'ROBERT NEWBERY', score: '461.05' },
        { rank: '10', noc: 'COL', name: 'JUAN GUILLERMO URAN', score: '454.50' },
        { rank: '11', noc: 'JPN', name: 'KEN TERAUCHI', score: '442.50' },
        { rank: '', noc: 'USA', name: 'CHRIS COLWILL', score: 'DSQ' }
      ];
    } else if (variant === 'e') {
      defaultEvent = "WOMEN'S SYNCHRONISED 10M PLATFORM";
      defaultSubTitle = "RESULT - FINAL";
      defaultRows = [
        { rank: '1', noc: 'CHN', name: 'WANG XIN / CHEN RUOLIN', score: '703.80' },
        { rank: '2', noc: 'PRK', name: 'CHOE KUM HUI / KIM UN HYANG', score: '682.13' },
        { rank: '3', noc: 'AUS', name: 'BRIONY COLE / MELISSA WU', score: '671.93' },
        { rank: '4', noc: 'GER', name: 'ANNETT GAMM / NORA SUBSCHINSKI', score: '651.36' },
        { rank: '5', noc: 'USA', name: 'MARYBETH DUNNICHAY / HALEY ISHIMATSU', score: '637.93' },
        { rank: '6', noc: 'CAN', name: 'MEAGHAN BENFEITO / ROSELINE FILION', score: '585.40' },
        { rank: '7', noc: 'GBR', name: 'TONIA COUCH / STACIE POWELL', score: '561.26' },
        { rank: '', noc: 'MEX', name: 'PAOLA ESPINOSA / TATIANA ORTIZ', score: 'DSQ' }
      ];
    }

    const rawEvent = (customData.header || customData.event || customData.title || customData.eventName || '').trim();
    const isGenericHeader = !rawEvent || 
      rawEvent.toUpperCase() === 'DIVING' || 
      rawEvent.toUpperCase().includes('DIVE 6') || 
      rawEvent.toUpperCase().includes('10M PLATFORM - FINAL');
    const eventTitle = (isGenericHeader ? defaultEvent : rawEvent).toUpperCase();

    const rawSub = (customData.subHeader || customData.subTitle || customData.subtitle || customData.round || '').trim();
    const isGenericSub = !rawSub || 
      rawSub.toUpperCase() === 'JUDGES' || 
      rawSub.toUpperCase().includes('DIVE 6') || 
      rawSub.toUpperCase().includes('FINAL - DIVE');
    const subTitle = (isGenericSub ? defaultSubTitle : rawSub).toUpperCase();

    let maxRows = 10;
    if (variant === 'a') maxRows = 10;
    else if (variant === 'b') maxRows = 8;
    else if (variant === 'c') maxRows = 6;
    else if (variant === 'd') maxRows = 6;
    else if (variant === 'e') maxRows = 8;

    const inputRows = (customData.rows && customData.rows.length > 0)
      ? customData.rows
      : (customData.standings && customData.standings.length > 0)
      ? customData.standings
      : (customData.results && customData.results.length > 0)
      ? customData.results
      : null;

    // Detect generic dummy standings from gamesData.js defaults and ignore them
    const genericDummyNames = ['CAO YUAN', 'RIKUTO TAMAI', 'TOM DALEY', 'CASPAR CORER', 'OLEKSIY SEREDA', 'ROZENBERG', 'DESPATIE'];
    const isGenericInputRows = inputRows && inputRows.length <= 5 &&
      inputRows.some(r => genericDummyNames.some(d => (r.name || '').toUpperCase().includes(d)));

    const rawRows = (!inputRows || isGenericInputRows) ? defaultRows : inputRows;
    const rowsList = rawRows.slice(0, maxRows);

    const bannerWidth = 1100;
    const tier1Height = 54;
    const tier2Height = 38;
    const rowHeight = 38;
    const rowGap = 3;

    const totalHeight = tier1Height + tier2Height + 4 + (rowsList.length * rowHeight) + (Math.max(0, rowsList.length - 1) * rowGap);
    const targetBottomY = 966; // 114px bottom clearance
    const baseLeft = 333;
    const baseTop = targetBottomY - totalHeight;

    // 1. Tier 1: Header Dark Blue Banner (Event Title + Pictograph + Olympic Rings)
    const t1Gradient = new fabric.Gradient({
      type: 'linear', gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: bannerWidth, y2: 0 },
      colorStops: [
        { offset: 0, color: gradientStart },
        { offset: 0.5, color: gradientMid },
        { offset: 1, color: gradientEnd }
      ]
    });

    const t1Bar = new fabric.Rect(createProps('rect', {
      left: baseLeft, top: baseTop, width: bannerWidth, height: tier1Height,
      fill: t1Gradient, skewX: -12, rx: 6, ry: 6,
      stroke: borderHighlight, strokeWidth: 1.5,
      shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.6)', blur: 16, offsetX: 0, offsetY: 6 })
    }));
    objects.push(t1Bar);

    // Diving Pictograph Box
    const pictoBox = new fabric.Rect(createProps('rect', {
      left: baseLeft + 8, top: baseTop + 6, width: 44, height: tier1Height - 12,
      fill: 'rgba(255,255,255,0.15)', skewX: -12, rx: 4, ry: 4
    }));
    const pikeBody = new fabric.Path('M 40 78 L 40 25 C 40 12, 68 10, 72 30 L 68 48 C 65 52, 58 52, 54 46 L 50 32 C 48 24, 46 24, 46 30 L 46 78 Z', {
      left: 12, top: 0, fill: '#ffffff', selectable: false
    });
    const headHeart = new fabric.Path('M 64 48 C 56 48, 54 58, 62 66 C 68 72, 74 68, 74 58 C 74 50, 70 48, 64 48 Z', {
      left: 28, top: 18, fill: '#ffffff', selectable: false
    });
    const waterWaves = new fabric.Path('M 10 92 Q 22 87, 34 92 T 58 92 T 82 92', {
      left: 0, top: 38, fill: '', stroke: '#ffffff', strokeWidth: 3, strokeLineCap: 'round', selectable: false
    });
    const pictoGroup = new fabric.Group([pikeBody, headHeart, waterWaves], {
      left: baseLeft + 12, top: baseTop + 10, scaleX: 0.38, scaleY: 0.38, skewX: -12, selectable: false
    });
    objects.push(pictoBox, pictoGroup);

    // Event Title Text
    const headText = new fabric.Textbox(eventTitle, createProps('textbox', {
      left: baseLeft + 65, top: baseTop + 10, fontSize: 30, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: 850
    }));
    objects.push(headText);

    // Olympic Rings
    const olympicRings = createOlympicRingsGroup(baseLeft + bannerWidth - 95, baseTop + 13, 11, 2.4);
    objects.push(olympicRings);

    // 2. Tier 2: Silver Metallic Sub-Header Strip
    const t2Top = baseTop + tier1Height + 2;
    const t2Gradient = new fabric.Gradient({
      type: 'linear', gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: bannerWidth - 30, y2: 0 },
      colorStops: [
        { offset: 0, color: '#ffffff' },
        { offset: 0.5, color: '#e2e8f0' },
        { offset: 1, color: '#cbd5e1' }
      ]
    });

    const t2Bar = new fabric.Rect(createProps('rect', {
      left: baseLeft + 15, top: t2Top, width: bannerWidth - 30, height: tier2Height,
      fill: t2Gradient, skewX: -12, rx: 4, ry: 4,
      stroke: 'rgba(0,0,0,0.2)', strokeWidth: 1
    }));
    objects.push(t2Bar);

    const subText = new fabric.Textbox(subTitle, createProps('textbox', {
      left: baseLeft + 35, top: t2Top + 7, fontSize: 22, fontWeight: '900', fontStyle: 'italic',
      fill: '#1a2b42', width: 1000
    }));
    objects.push(subText);

    // 3. Rows
    const rowsStartTop = t2Top + tier2Height + 2;
    for (let i = 0; i < rowsList.length; i++) {
      const item = rowsList[i];
      const rTop = rowsStartTop + i * (rowHeight + rowGap);
      const rRank = item.rank !== undefined ? String(item.rank) : '';
      const rNoc = (item.noc || item.country || 'CHN').toUpperCase();
      const rName = (item.name || item.athlete || item.pair || '').toUpperCase();
      const rScore = String(item.score || item.total || item.result || '');
      const rStatus = (item.status || item.q || '').toUpperCase();

      const rowGradient = new fabric.Gradient({
        type: 'linear', gradientUnits: 'pixels',
        coords: { x1: 0, y1: 0, x2: bannerWidth, y2: 0 },
        colorStops: [
          { offset: 0, color: gradientStart },
          { offset: 0.5, color: gradientMid },
          { offset: 1, color: gradientEnd }
        ]
      });

      const rowBar = new fabric.Rect(createProps('rect', {
        left: baseLeft, top: rTop, width: bannerWidth, height: rowHeight,
        fill: rowGradient, skewX: -12, rx: 4, ry: 4,
        stroke: borderHighlight, strokeWidth: 1
      }));
      objects.push(rowBar);

      // Red Rank Badge (if rank exists)
      if (rRank) {
        const rankBadge = new fabric.Rect(createProps('rect', {
          left: baseLeft + 6, top: rTop + 4, width: 32, height: rowHeight - 8,
          fill: '#d32f2f', skewX: -12, rx: 3, ry: 3
        }));
        const rankText = new fabric.Textbox(rRank, createProps('textbox', {
          left: baseLeft + 6, top: rTop + 7, fontSize: 22, fontWeight: '900', fontStyle: 'italic',
          fill: '#ffffff', width: 32, textAlign: 'center'
        }));
        objects.push(rankBadge, rankText);
      }

      // Flag Image (directly after Rank Badge)
      const flagImg = await createFabricFlagObject(rNoc, createProps('image', {
        left: baseLeft + (rRank ? 55 : 15), top: rTop + 6, scaleX: 0.50, scaleY: 0.50, skewX: -12
      }));
      if (flagImg) {
        objects.push(flagImg);
      }

      // Athlete Name Text (with clear gap after Flag Image)
      const nameText = new fabric.Textbox(rName, createProps('textbox', {
        left: baseLeft + (rRank ? 175 : 135), top: rTop + 7, fontSize: 24, fontWeight: '900', fontStyle: 'italic',
        fill: '#ffffff', width: 640
      }));
      objects.push(nameText);

      // Q Badge (if present)
      if (rStatus === 'Q') {
        const qBadge = new fabric.Rect(createProps('rect', {
          left: baseLeft + bannerWidth - 220, top: rTop + 6, width: 30, height: rowHeight - 12,
          fill: '#2e7d32', skewX: -12, rx: 3, ry: 3
        }));
        const qText = new fabric.Textbox('Q', createProps('textbox', {
          left: baseLeft + bannerWidth - 220, top: rTop + 8, fontSize: 20, fontWeight: '900', fontStyle: 'italic',
          fill: '#ffffff', width: 30, textAlign: 'center'
        }));
        objects.push(qBadge, qText);
      }

      // Score / Result Text
      const scoreText = new fabric.Textbox(rScore, createProps('textbox', {
        left: baseLeft + bannerWidth - 180, top: rTop + 7, fontSize: 24, fontWeight: '900', fontStyle: 'italic',
        fill: '#ffffff', width: 160, textAlign: 'right'
      }));
      objects.push(scoreText);
    }

    return new fabric.Group(objects, {
      left: baseLeft, top: baseTop,
      originX: 'left', originY: 'top',
      scaleX: 1.0, scaleY: 1.0,
      subTargetCheck: true,
      id: generateUniqueId({ type: 'divingGroup' }),
      name: `DV015 Standings / Result Variant ${variant.toUpperCase()} (${normId})`,
      selectable: true, hasControls: true
    });
  }

  // ── DV016 - Ceremony ID ──
  if (normId.includes('DV016')) {
    const baseTop = 876;
    const baseLeft = 328;
    const bannerWidth = 1260;

    const eventTitle = (customData.event || "WOMEN'S SYNCHRONISED 10M PLATFORM").toUpperCase();
    const ceremonyStr = (customData.ceremony || 'VICTORY CEREMONY').toUpperCase();

    // Top bar (blue gradient)
    const topBarGradient = new fabric.Gradient({
      type: 'linear', gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: bannerWidth, y2: 0 },
      colorStops: [
        { offset: 0, color: gradientStart },
        { offset: 0.5, color: gradientMid },
        { offset: 1, color: gradientEnd }
      ]
    });
    const topBar = new fabric.Rect(createProps('rect', {
      left: baseLeft, top: baseTop, width: bannerWidth, height: 54,
      fill: topBarGradient, skewX: -12, rx: 4, ry: 4,
      stroke: borderHighlight, strokeWidth: 1.5,
      shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.6)', blur: 16, offsetX: 0, offsetY: 6 })
    }));
    objects.push(topBar);

    // Picto box accent block
    const pictoBox = new fabric.Rect(createProps('rect', {
      left: baseLeft, top: baseTop, width: 68, height: 54,
      fill: 'rgba(0,0,0,0.25)', skewX: -12
    }));
    objects.push(pictoBox);

    // Diving pictograph (inline SVG path objects)
    const pikeBody = new fabric.Path('M 40 78 L 40 25 C 40 12, 68 10, 72 30 L 68 48 C 65 52, 58 52, 54 46 L 50 32 C 48 24, 46 24, 46 30 L 46 78 Z', {
      left: baseLeft + 14, top: baseTop + 7, fill: '#ffffff', scaleX: 0.65, scaleY: 0.65, selectable: true
    });
    const headCircle = new fabric.Path('M 64 48 C 56 48, 54 58, 62 66 C 68 72, 74 68, 74 58 C 74 50, 70 48, 64 48 Z', {
      left: baseLeft + 26, top: baseTop + 20, fill: '#ffffff', scaleX: 0.65, scaleY: 0.65, selectable: true
    });
    const waves = new fabric.Path('M 10 92 Q 22 87, 34 92 T 58 92 T 82 92', {
      left: baseLeft + 8, top: baseTop + 34, fill: '', stroke: '#ffffff', strokeWidth: 2.5, strokeLineCap: 'round', selectable: true
    });
    objects.push(pikeBody, headCircle, waves);

    // Event title text
    const eventText = new fabric.Textbox(eventTitle, createProps('textbox', {
      left: baseLeft + 76, top: baseTop + 10, fontSize: 28, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: bannerWidth - 200, charSpacing: 20
    }));
    objects.push(eventText);

    // Olympic rings
    const olympicRings = createOlympicRingsGroup(baseLeft + bannerWidth - 110, baseTop + 13, 12, 2.5);
    objects.push(olympicRings);

    // Sub-header bar (light grey)
    const subBarGradient = new fabric.Gradient({
      type: 'linear', gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: 1220, y2: 0 },
      colorStops: [
        { offset: 0, color: '#c8d8ea' },
        { offset: 0.5, color: '#dce8f5' },
        { offset: 1, color: '#b8cce0' }
      ]
    });
    const subBar = new fabric.Rect(createProps('rect', {
      left: baseLeft + 17, top: baseTop + 56, width: 1220, height: 34,
      fill: subBarGradient, skewX: -12, rx: 3, ry: 3,
      stroke: 'rgba(0,0,0,0.15)', strokeWidth: 1
    }));
    objects.push(subBar);

    const ceremonyText = new fabric.Textbox(ceremonyStr, createProps('textbox', {
      left: baseLeft + 90, top: baseTop + 62, fontSize: 20, fontWeight: '900', fontStyle: 'italic',
      fill: '#0a2a5e', width: 900, charSpacing: 60
    }));
    objects.push(ceremonyText);

    return new fabric.Group(objects, {
      left: baseLeft, top: baseTop,
      originX: 'left', originY: 'top',
      scaleX: 1.0, scaleY: 1.0,
      subTargetCheck: true,
      id: generateUniqueId({ type: 'divingGroup' }),
      name: 'DV016 Ceremony ID',
      selectable: true, hasControls: true
    });
  }

  // ── DV017 - Medal ID (Variant A: individual, Variant B: pair/sync) ──
  if (normId.includes('DV017')) {
    const bannerWidth = 850;
    const tier1Height = 42;
    const tier2Height = 32;
    const baseTop = 966 - (tier1Height + tier2Height + 2); // 890
    const baseLeft = 328;

    const isVariantB = normId.includes('_B') || normId.endsWith('B') || (customData.variant || '').toLowerCase() === 'b';

    const isGenericDummy = (customData.athlete || '').toUpperCase() === 'TOM DALEY' || (customData.noc || '').toUpperCase() === 'GBR';
    const finalNoc = isGenericDummy ? null : (customData.noc || customData.country);
    const finalAthlete = isGenericDummy ? null : (customData.athlete || customData.name || customData.pair);
    const finalMedal = isGenericDummy ? null : customData.medal;
    const finalEvent = isGenericDummy ? null : customData.event;

    const nocCode = (finalNoc || (isVariantB ? 'PRK' : 'CHN')).toUpperCase();
    const athleteName = finalAthlete || (isVariantB ? 'CHOE Kum Hui / KIM Un Hyang' : 'HE CHONG');
    const medal = (finalMedal || (isVariantB ? 'SILVER' : 'GOLD')).toUpperCase();
    const eventName = (finalEvent || (isVariantB ? "WOMEN'S SYNCHRONISED 10M PLATFORM" : "MEN'S 3M SPRINGBOARD")).toUpperCase();
    const medalLine = `${medal} - ${eventName}`;

    const medalEmoji = medal.includes('GOLD') ? '🥇' : medal.includes('SILVER') ? '🥈' : '🥉';
    const medalBarColor = medal.includes('GOLD') ? '#b8860b' : medal.includes('SILVER') ? '#607080' : '#7a4a2a';

    const darkGradient = new fabric.Gradient({
      type: 'linear', gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: bannerWidth, y2: 0 },
      colorStops: [{ offset: 0, color: '#091d36' }, { offset: 0.5, color: '#0f2f57' }, { offset: 1, color: '#071629' }]
    });

    // Tier 1
    const topBar = new fabric.Rect(createProps('rect', {
      left: baseLeft, top: baseTop, width: bannerWidth, height: tier1Height,
      fill: darkGradient, skewX: -12, rx: 4, ry: 4,
      stroke: borderHighlight, strokeWidth: 1,
      shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.6)', blur: 16, offsetX: 0, offsetY: 6 })
    }));
    objects.push(topBar);

    // Flag
    const flagObj = await createFabricFlagObject(nocCode, {
      left: baseLeft + 20, top: baseTop + 7, scaleX: 0.45, scaleY: 0.45
    });
    if (flagObj) objects.push(flagObj);

    // Athlete name
    const nameText = new fabric.Textbox(athleteName, createProps('textbox', {
      left: baseLeft + 125, top: baseTop + 9, fontSize: 24, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: bannerWidth - 240, charSpacing: 10
    }));
    objects.push(nameText);

    // Olympic rings
    const olympicRings = createOlympicRingsGroup(baseLeft + bannerWidth - 80, baseTop + 9, 10, 2);
    objects.push(olympicRings);

    // Tier 2
    const t2Top = baseTop + tier1Height + 2;
    const botBar = new fabric.Rect(createProps('rect', {
      left: baseLeft + 17, top: t2Top, width: bannerWidth - 30, height: tier2Height,
      fill: darkGradient, skewX: -12, rx: 3, ry: 3,
      stroke: borderHighlight, strokeWidth: 1
    }));
    objects.push(botBar);

    // Medal circle accent
    const medalCircle = new fabric.Circle(createProps('circle', {
      left: baseLeft + 22, top: t2Top + 3, radius: 13,
      fill: medalBarColor, stroke: '#ffffff', strokeWidth: 1.5
    }));
    objects.push(medalCircle);

    const medalTextObj = new fabric.Textbox(medalLine, createProps('textbox', {
      left: baseLeft + 54, top: t2Top + 6, fontSize: 18, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: bannerWidth - 100, charSpacing: 20
    }));
    objects.push(medalTextObj);

    return new fabric.Group(objects, {
      left: baseLeft, top: baseTop,
      originX: 'left', originY: 'top',
      scaleX: 1.0, scaleY: 1.0,
      subTargetCheck: true,
      id: generateUniqueId({ type: 'divingGroup' }),
      name: `DV017 Medal ID (${normId})`,
      selectable: true, hasControls: true
    });
  }

  // ── DV018 - Medals List (Variant A: individual, Variant B: pair/sync) ──
  if (normId.includes('DV018')) {
    const isVariantB = normId.includes('_B') || normId.endsWith('B') || (customData.variant || '').toLowerCase() === 'b';
    const eventTitle = (customData.event || (isVariantB ? "WOMEN'S SYNCHRONISED 10M PLATFORM" : "MEN'S 3M SPRINGBOARD")).toUpperCase();
    const ceremonyStr = (customData.ceremony || 'VICTORY CEREMONY').toUpperCase();

    // Default 3 rows (Gold, Silver, Bronze)
    let rows = customData.rows || customData.medals || [];
    const isGenericDummy = rows.some(r => (r.name || '').toUpperCase().includes('TOM DALEY'));
    if (rows.length < 3 || isGenericDummy) {
      rows = isVariantB ? [
        { medal: 'GOLD', noc: 'CHN', name: 'WANG XIN / CHEN RUOLIN' },
        { medal: 'SILVER', noc: 'PRK', name: 'CHOE Kum Hui / KIM Un Hyang' },
        { medal: 'BRONZE', noc: 'AUS', name: 'BRIONY COLE / MELISSA WU' }
      ] : [
        { medal: 'GOLD', noc: 'CHN', name: 'HE CHONG' },
        { medal: 'SILVER', noc: 'CAN', name: 'ALEXANDRE DESPATIE' },
        { medal: 'BRONZE', noc: 'CHN', name: 'QIN KAI' }
      ];
    }
    // Limit to 3 max
    rows = rows.slice(0, 3);

    const bannerWidth = 1260;
    const tier1Height = 54;
    const tier2Height = 34;
    const rowHeight = 38;
    const rowGap = 2;

    const totalHeight = tier1Height + tier2Height + 4 + (rows.length * rowHeight) + (Math.max(0, rows.length - 1) * rowGap);
    const targetBottomY = 966;
    const baseLeft = 328;
    const baseTop = targetBottomY - totalHeight;

    // Tier 1 (Header)
    const topBarGradient = new fabric.Gradient({
      type: 'linear', gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: bannerWidth, y2: 0 },
      colorStops: [{ offset: 0, color: gradientStart }, { offset: 0.5, color: gradientMid }, { offset: 1, color: gradientEnd }]
    });
    const topBar = new fabric.Rect(createProps('rect', {
      left: baseLeft, top: baseTop, width: bannerWidth, height: tier1Height,
      fill: topBarGradient, skewX: -12, rx: 4, ry: 4, stroke: borderHighlight, strokeWidth: 1.5,
      shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.6)', blur: 16, offsetX: 0, offsetY: 6 })
    }));
    objects.push(topBar);

    const pictoBox = new fabric.Rect(createProps('rect', {
      left: baseLeft, top: baseTop, width: 68, height: tier1Height,
      fill: 'rgba(0,0,0,0.25)', skewX: -12
    }));
    objects.push(pictoBox);

    const pikeBody = new fabric.Path('M 40 78 L 40 25 C 40 12, 68 10, 72 30 L 68 48 C 65 52, 58 52, 54 46 L 50 32 C 48 24, 46 24, 46 30 L 46 78 Z', {
      left: baseLeft + 14, top: baseTop + 7, fill: '#ffffff', scaleX: 0.65, scaleY: 0.65, selectable: true
    });
    const headCircle = new fabric.Path('M 64 48 C 56 48, 54 58, 62 66 C 68 72, 74 68, 74 58 C 74 50, 70 48, 64 48 Z', {
      left: baseLeft + 26, top: baseTop + 20, fill: '#ffffff', scaleX: 0.65, scaleY: 0.65, selectable: true
    });
    const waves = new fabric.Path('M 10 92 Q 22 87, 34 92 T 58 92 T 82 92', {
      left: baseLeft + 8, top: baseTop + 34, fill: '', stroke: '#ffffff', strokeWidth: 2.5, strokeLineCap: 'round', selectable: true
    });
    objects.push(pikeBody, headCircle, waves);

    const eventText = new fabric.Textbox(eventTitle, createProps('textbox', {
      left: baseLeft + 76, top: baseTop + 10, fontSize: 28, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: bannerWidth - 200, charSpacing: 20
    }));
    objects.push(eventText);

    const olympicRings = createOlympicRingsGroup(baseLeft + bannerWidth - 110, baseTop + 13, 12, 2.5);
    objects.push(olympicRings);

    // Tier 2 (Sub-header)
    const t2Top = baseTop + tier1Height + 2;
    const subBarGradient = new fabric.Gradient({
      type: 'linear', gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: 1220, y2: 0 },
      colorStops: [{ offset: 0, color: '#c8d8ea' }, { offset: 0.5, color: '#dce8f5' }, { offset: 1, color: '#b8cce0' }]
    });
    const subBar = new fabric.Rect(createProps('rect', {
      left: baseLeft + 17, top: t2Top, width: 1220, height: tier2Height,
      fill: subBarGradient, skewX: -12, rx: 3, ry: 3, stroke: 'rgba(0,0,0,0.15)', strokeWidth: 1
    }));
    objects.push(subBar);

    const ceremonyText = new fabric.Textbox(ceremonyStr, createProps('textbox', {
      left: baseLeft + 90, top: t2Top + 6, fontSize: 20, fontWeight: '900', fontStyle: 'italic',
      fill: '#0a2a5e', width: 900, charSpacing: 60
    }));
    objects.push(ceremonyText);

    // Rows
    const rowsStartTop = t2Top + tier2Height + 2;
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const rTop = rowsStartTop + i * (rowHeight + rowGap);
      const isGold = i === 0 || (row.medal || '').toUpperCase().includes('GOLD');
      const isSilver = i === 1 || (row.medal || '').toUpperCase().includes('SILVER');
      
      const medalEmoji = isGold ? '🥇' : isSilver ? '🥈' : '🥉';
      const medalBg = isGold ? '#b8860b' : isSilver ? '#607080' : '#7a4a2a';
      const rNoc = (row.noc || row.country || 'CHN').toUpperCase();
      const rName = row.name || row.athlete || row.pair || '';

      const rowGradient = new fabric.Gradient({
        type: 'linear', gradientUnits: 'pixels',
        coords: { x1: 0, y1: 0, x2: 1210, y2: 0 },
        colorStops: [{ offset: 0, color: '#091d36' }, { offset: 0.5, color: '#0f2f57' }, { offset: 1, color: '#071629' }]
      });
      const rowBar = new fabric.Rect(createProps('rect', {
        left: baseLeft + 27, top: rTop, width: 1210, height: rowHeight,
        fill: rowGradient, skewX: -12, rx: 3, ry: 3, stroke: borderHighlight, strokeWidth: 1
      }));
      objects.push(rowBar);

      // Medal circle
      const medalCircle = new fabric.Circle(createProps('circle', {
        left: baseLeft + 31, top: rTop + 3, radius: 15,
        fill: medalBg, stroke: '#ffffff', strokeWidth: 1.5
      }));
      // Note: we can't easily draw emoji in pure fabric reliably without custom fonts, so we use a text approximation or skip emoji in fabric preview. 
      // We will render it properly in HTML. For Fabric, we'll draw a star or simple text.
      const medalText = new fabric.Textbox(isGold ? '1' : isSilver ? '2' : '3', createProps('textbox', {
        left: baseLeft + 31, top: rTop + 7, fontSize: 16, fontWeight: '900', fill: '#ffffff', width: 30, textAlign: 'center'
      }));
      objects.push(medalCircle, medalText);

      // Flag
      const flagObj = await createFabricFlagObject(rNoc, {
        left: baseLeft + 70, top: rTop + 5, scaleX: 0.45, scaleY: 0.45
      });
      if (flagObj) objects.push(flagObj);

      // Name
      const nameText = new fabric.Textbox(rName, createProps('textbox', {
        left: baseLeft + 160, top: rTop + 7, fontSize: 22, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 900, charSpacing: 20
      }));
      objects.push(nameText);
    }

    return new fabric.Group(objects, {
      left: baseLeft, top: baseTop,
      originX: 'left', originY: 'top',
      scaleX: 1.0, scaleY: 1.0,
      subTargetCheck: true,
      id: generateUniqueId({ type: 'divingGroup' }),
      name: `DV018 Medals List (${normId})`,
      selectable: true, hasControls: true
    });
  }

  // ── DV019 - Medal Presenter ID ──
  if (normId.includes('DV019')) {
    const bannerWidth = 720;
    const tier1Height = 42;
    const tier2Height = 32;
    const baseTop = 966 - (tier1Height + tier2Height + 2); // 890
    const baseLeft = 328;

    const isGenericDummy = (customData.name || '').toUpperCase().includes('TOM DALEY') || (customData.presenter || '').toUpperCase().includes('TOM DALEY');
    const nocCode = isGenericDummy ? null : (customData.noc || customData.country || null);
    const presenterName = isGenericDummy ? 'JACQUES ROGGE' : (customData.name || customData.presenter || 'JACQUES ROGGE');
    const designation = isGenericDummy ? 'IOC PRESIDENT, BELGIUM' : (customData.designation || customData.title || 'IOC PRESIDENT, BELGIUM');

    const topBarGradient = new fabric.Gradient({
      type: 'linear', gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: bannerWidth, y2: 0 },
      colorStops: [
        { offset: 0, color: gradientStart },
        { offset: 0.5, color: gradientMid },
        { offset: 1, color: gradientEnd }
      ]
    });

    const botBarGradient = new fabric.Gradient({
      type: 'linear', gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: bannerWidth - 30, y2: 0 },
      colorStops: [{ offset: 0, color: '#091d36' }, { offset: 0.5, color: '#0f2f57' }, { offset: 1, color: '#071629' }]
    });

    // Tier 1 (Bright Blue)
    const topBar = new fabric.Rect(createProps('rect', {
      left: baseLeft, top: baseTop, width: bannerWidth, height: tier1Height,
      fill: topBarGradient, skewX: -12, rx: 4, ry: 4,
      stroke: borderHighlight, strokeWidth: 1,
      shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.6)', blur: 16, offsetX: 0, offsetY: 6 })
    }));
    objects.push(topBar);

    // Presenter name
    const nameText = new fabric.Textbox(presenterName, createProps('textbox', {
      left: baseLeft + 20, top: baseTop + 9, fontSize: 24, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: bannerWidth - 130, charSpacing: 10
    }));
    objects.push(nameText);

    // Olympic rings
    const olympicRings = createOlympicRingsGroup(baseLeft + bannerWidth - 80, baseTop + 9, 10, 2);
    objects.push(olympicRings);

    // Tier 2 (Dark Navy)
    const t2Top = baseTop + tier1Height + 2;
    const botBar = new fabric.Rect(createProps('rect', {
      left: baseLeft + 17, top: t2Top, width: bannerWidth - 30, height: tier2Height,
      fill: botBarGradient, skewX: -12, rx: 3, ry: 3,
      stroke: borderHighlight, strokeWidth: 1
    }));
    objects.push(botBar);

    const designationText = new fabric.Textbox(designation, createProps('textbox', {
      left: baseLeft + 30, top: t2Top + 6, fontSize: 18, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: bannerWidth - 50, charSpacing: 20
    }));
    objects.push(designationText);

    return new fabric.Group(objects, {
      left: baseLeft, top: baseTop,
      originX: 'left', originY: 'top',
      scaleX: 1.0, scaleY: 1.0,
      subTargetCheck: true,
      id: generateUniqueId({ type: 'divingGroup' }),
      name: `DV019 Medal Presenter ID (${normId})`,
      selectable: true, hasControls: true
    });
  }

  // Return null for unbuilt templates
  return null;
}

/**
 * HTML Broadcast Overlay Generator for Diving Templates (DV002, DV003, DV004, DV005, DV006)
 */
export function generateDiving2HTML(
  templateId = '',
  customData = {},
  styleOptions = {}
) {
  const normId = (templateId || '').toUpperCase();
  const font = styleOptions.fontFamily || "'Outfit', 'Roboto Condensed', 'Segoe UI', sans-serif";
  const venueStr = (customData.venue || customData.location || 'AQUATICS CENTRE').toUpperCase();

  const primaryColor = customData.primaryColor || styleOptions.primaryColor || '#005b96';
  const gradientStart = '#061325';
  const gradientMid = primaryColor;
  const gradientEnd = '#031526';
  const borderHighlight = 'rgba(255,255,255,0.35)';

  // ── 1. DV002 - Venue ID ──
  if (normId.includes('DV002') || normId === 'VENUE ID') {
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
            position: absolute; bottom: 220px; left: 240px; width: 890px; height: 95px;
            filter: drop-shadow(0 10px 20px rgba(0,0,0,0.7));
          }
          .gun-banner-body {
            position: absolute; width: 100%; height: 100%;
            background: linear-gradient(90deg, ${gradientStart} 0%, ${gradientMid} 45%, ${gradientEnd} 100%);
            clip-path: polygon(
              45px 0px, 860px 0px, 888px 44px, 882px 54px,
              140px 54px, 115px 88px, 100px 95px, 10px 95px,
              2px 84px, 22px 42px, 35px 6px
            );
            border: 2px solid ${borderHighlight};
          }
          .aquatics-logo { position: absolute; left: 32px; bottom: 6px; z-index: 2; }
          .gun-barrel-title {
            position: absolute; left: 155px; top: 8px; font-size: 32px; font-weight: 900;
            font-style: italic; letter-spacing: 2px; color: #ffffff; text-transform: uppercase;
            white-space: nowrap; z-index: 2;
          }
          .rings-wrapper { position: absolute; right: 25px; top: 12px; z-index: 2; }
        </style>
      </head>
      <body>
        <div class="gun-banner-container">
          <div class="gun-banner-body"></div>
          <div class="aquatics-logo">${officialDivingPictographSVG}</div>
          <div class="gun-barrel-title">${venueStr}</div>
          <div class="rings-wrapper">${olympicRingsSVG}</div>
        </div>
      </body>
      </html>
    `;
  }

  // ── 2. DV003 - Event Header 3-Tier Banner ──
  if (normId.includes('DV003') || normId.includes('SCHEDULE')) {
    let eventStr = (customData.event || customData.title || customData.eventName || '').toUpperCase();
    if (!eventStr || eventStr === "MEN'S 10M PLATFORM") {
      eventStr = "WOMEN'S SYNCHRONISED 10M PLATFORM - FINAL";
    }

    const sportStr = 'DIVING';

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,700;1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .banner-3tier { position: absolute; top: 810px; left: 328px; display: flex; flex-direction: column; gap: 2px; }
          .tier-1 {
            height: 68px; width: 1260px;
            background: linear-gradient(135deg, ${gradientStart} 0%, ${primaryColor} 60%, ${gradientEnd} 100%);
            border: 1.5px solid rgba(255,255,255,0.35); border-radius: 8px;
            transform: skewX(-12deg); display: flex; align-items: center; justify-content: space-between;
            padding: 0 32px; box-shadow: 0 10px 24px rgba(0,0,0,0.6);
          }
          .unskew { transform: skewX(12deg); }
          .t1-left { display: flex; align-items: center; gap: 18px; }
          .t1-title { font-size: 36px; font-weight: 900; font-style: italic; color: #ffffff; letter-spacing: 2px; }
          .tier-2 {
            height: 36px; width: 1220px; margin-left: 17px; margin-top: 2px;
            background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #cbd5e1 100%);
            border: 1px solid rgba(0,0,0,0.2); border-radius: 4px;
            transform: skewX(-12deg); display: flex; align-items: center; padding: 0 28px;
          }
          .t2-text { font-size: 22px; font-weight: 900; font-style: italic; color: #1a2b42; letter-spacing: 1.5px; padding-left: 65px; }
          .tier-3 {
            height: 50px; width: 1260px; margin-top: 2px;
            background: linear-gradient(135deg, #091d36 0%, #0f2f57 50%, #071629 100%);
            border: 1.5px solid rgba(255,255,255,0.35); border-radius: 8px;
            transform: skewX(-12deg); display: flex; align-items: center; padding: 0 32px;
            box-shadow: 0 10px 24px rgba(0,0,0,0.6);
          }
          .t3-text { font-size: 28px; font-weight: 900; font-style: italic; color: #ffffff; letter-spacing: 1px; }
        </style>
      </head>
      <body>
        <div class="banner-3tier">
          <div class="tier-1">
            <div class="t1-left unskew">
              <div style="width:40px; height:40px;">${officialDivingPictographSVG}</div>
              <div class="t1-title">${sportStr}</div>
            </div>
            <div class="unskew">${olympicRingsSVG}</div>
          </div>
          <div class="tier-2">
            <div class="t2-text unskew">${venueStr}</div>
          </div>
          <div class="tier-3">
            <div class="t3-text unskew">${eventStr}</div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ── 3. DV004 - Start List / Dive Order ──
  if (normId.includes('DV004') || normId.includes('START LIST')) {
    const isVariantB = normId.includes('_B') || normId.endsWith('B') || (customData.variant || '').toLowerCase() === 'b';

    const eventTitle = isVariantB
      ? (customData.event || customData.title || "WOMEN'S SYNCHRONISED 10M PLATFORM").toUpperCase()
      : (customData.event || customData.title || "MEN'S 3M SPRINGBOARD").toUpperCase();

    const roundTitle = isVariantB
      ? (customData.round || "DIVE ORDER - FINAL").toUpperCase()
      : (customData.round || "DIVE ORDER - SEMI-FINAL").toUpperCase();

    const defaultEntriesA = [
      { order: 1, noc: 'ITA', name: 'NICOLA MARCONI', status: '' },
      { order: 2, noc: 'RUS', name: 'ALEKSANDR DOBROSKOK', status: '' },
      { order: 3, noc: 'GER', name: 'PAVLO ROZENBERG', status: '' },
      { order: 4, noc: 'AUS', name: 'MATTHEW MITCHAM', status: '' },
      { order: 5, noc: 'COL', name: 'JUAN GUILLERMO URAN', status: '' },
      { order: 6, noc: 'CAN', name: 'REUBEN ROSS', status: 'DNS' },
      { order: 7, noc: 'USA', name: 'TROY DUMAIS', status: '' },
      { order: 8, noc: 'GER', name: 'PATRICK HAUSDING', status: '' },
      { order: 9, noc: 'JPN', name: 'KEN TERAUCHI', status: '' }
    ];

    const defaultEntriesB = [
      { order: 1, noc: 'AUS', name: 'COLE B / STRATTON C', status: '' },
      { order: 2, noc: 'CAN', name: 'BENFEITO M / FILION R', status: '' },
      { order: 3, noc: 'CHN', name: 'CHEN R / WANG H', status: '' },
      { order: 4, noc: 'GER', name: 'SUBCHINSKI N / STEUER A', status: '' },
      { order: 5, noc: 'GBR', name: 'BARROW S / COUCH T', status: '' },
      { order: 6, noc: 'MAS', name: 'PAM G P / LEONG M', status: '' },
      { order: 7, noc: 'MEX', name: 'ESPINOSA P / ORTIZ A', status: '' },
      { order: 8, noc: 'PRK', name: 'CHOE H / KIM U', status: '' }
    ];

    const entries = (customData.startList && customData.startList.length > 0)
      ? customData.startList
      : (isVariantB ? defaultEntriesB : defaultEntriesA);

    const rowsHTML = entries.map((item, index) => {
      const isEven = index % 2 === 0;
      const bg = isEven ? 'linear-gradient(90deg, #0a1d38 0%, #08162b 100%)' : 'linear-gradient(90deg, #061326 0%, #040d1c 100%)';
      const flagImgHtml = getFlagImgHtml(item.noc || item.country || 'ITA', 'height: 40px; width: auto; border-radius: 4px; transform: skewX(-12deg);');
      return `
        <div class="start-row" style="background: ${bg};">
          <div class="unskew row-content">
            <div class="order-number">${item.order || index + 1}</div>
            <div class="flag-icon">${flagImgHtml || item.noc || ''}</div>
            <div class="diver-name">${(item.name || item.athlete || '').toUpperCase()}</div>
            ${(item.status && item.status.trim() !== '') ? `<div class="status-badge-white">${item.status.toUpperCase()}</div>` : ''}
          </div>
        </div>
      `;
    }).join('');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,700;1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .start-list-container {
            position: absolute; top: 350px; left: 333px; width: 1250px;
            display: flex; flex-direction: column; gap: 3px;
          }
          .unskew { transform: skewX(12deg); }

          .head-bar {
            height: 88px; width: 1250px;
            background: linear-gradient(135deg, ${gradientStart} 0%, ${primaryColor} 50%, ${gradientEnd} 100%);
            border: 2px solid rgba(255,255,255,0.35); border-radius: 8px;
            transform: skewX(-12deg); display: flex; align-items: center; justify-content: space-between;
            padding: 0 36px; box-shadow: 0 12px 28px rgba(0,0,0,0.6);
          }
          .head-left { display: flex; align-items: center; gap: 20px; }
          .head-title { font-size: 40px; font-weight: 900; font-style: italic; color: #ffffff; letter-spacing: 2px; }

          .sub-bar {
            height: 46px; width: 1210px; margin-left: 20px; margin-top: 2px;
            background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #cbd5e1 100%);
            border: 1px solid rgba(0,0,0,0.2); border-radius: 5px;
            transform: skewX(-12deg); display: flex; align-items: center; padding: 0 32px;
          }
          .sub-title { font-size: 26px; font-weight: 900; font-style: italic; color: #1a2b42; letter-spacing: 1.5px; padding-left: 80px; }

          .start-row {
            height: 54px; width: 1250px; margin-top: 2px;
            border: 1px solid rgba(255,255,255,0.12);
            transform: skewX(-12deg); display: flex; align-items: center; padding: 0 16px;
          }
          .row-content { display: flex; align-items: center; width: 100%; gap: 28px; }
          .order-number {
            width: 40px; height: 38px;
            display: flex; align-items: center; justify-content: center;
            font-size: 28px; font-weight: 900; font-style: italic; color: #ffffff;
          }
          .flag-icon { display: flex; align-items: center; justify-content: center; width: 80px; margin-right: 40px; }
          .diver-name { font-size: 30px; font-weight: 900; font-style: italic; color: #ffffff; flex-grow: 1; }
          .status-badge-white {
            background: #ffffff; color: #000000; font-size: 22px; font-weight: 900; font-style: italic;
            padding: 4px 18px; border-radius: 5px; margin-right: 20px; box-shadow: 0 2px 6px rgba(0,0,0,0.4);
          }
        </style>
      </head>
      <body>
        <div class="start-list-container">
          <div class="head-bar">
            <div class="head-left unskew">
              <div style="width:48px; height:48px;">${officialDivingPictographSVG}</div>
              <div class="head-title">${eventTitle}</div>
            </div>
            <div class="unskew">${olympicRingsSVG}</div>
          </div>
          <div class="sub-bar">
            <div class="sub-title unskew">${roundTitle}</div>
          </div>
          ${rowsHTML}
        </div>
      </body>
      </html>
    `;
  }

  // ── 4. DV005 - Athlete / Pair ID Lower Third (HTML Variants A, B, C, D) ──
  if (normId.includes('DV005') || normId.includes('ATHLETE ID') || normId.includes('PAIR ID')) {
    const rawVariant = (customData.variant || customData.variation || '').toLowerCase();
    let variant = 'a';
    if (rawVariant && rawVariant.length >= 1) {
      variant = rawVariant.charAt(0);
    } else if (normId.endsWith('B') || normId.includes('_B')) {
      variant = 'b';
    } else if (normId.endsWith('C') || normId.includes('_C')) {
      variant = 'c';
    } else if (normId.endsWith('D') || normId.includes('_D')) {
      variant = 'd';
    } else if (normId.endsWith('A') || normId.includes('_A')) {
      variant = 'a';
    }

    let defaultName = 'ALEKSANDR DOBROSKOK';
    let defaultNoc = 'RUS';
    let defaultStatus = '';

    if (variant === 'b') {
      defaultName = 'JUAN GUILLERMO URAN';
      defaultNoc = 'COL';
      defaultStatus = 'DNS';
    } else if (variant === 'c') {
      defaultName = 'WANG XIN / CHEN RUOLIN';
      defaultNoc = 'CHN';
      defaultStatus = '';
    } else if (variant === 'd') {
      defaultName = 'P. ESPINOSA / T. ORTIZ';
      defaultNoc = 'MEX';
      defaultStatus = 'DSQ';
    }

    const rawName = (customData.name || customData.athlete || customData.athleteName || '').trim();
    const rawNoc = (customData.noc || customData.country || '').trim();

    const isGenericDefaultName = !rawName || rawName.toUpperCase() === 'TOM DALEY';
    const isGenericDefaultNoc = !rawNoc || rawNoc.toUpperCase() === 'GBR';

    const nameStr = (isGenericDefaultName ? defaultName : rawName).toUpperCase();
    const nocCode = (isGenericDefaultNoc ? defaultNoc : rawNoc).toUpperCase();
    const statusStr = (customData.status !== undefined && customData.status !== '' ? customData.status : defaultStatus).toUpperCase();
    const flagImgHtml = getFlagImgHtml(nocCode, 'height: 40px; width: auto; border-radius: 4px; transform: skewX(-12deg);');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,700;1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .lower-third-container {
            position: absolute; top: 912px; left: 333px; width: 1100px; height: 54px;
            background: linear-gradient(135deg, ${gradientStart} 0%, ${primaryColor} 50%, ${gradientEnd} 100%);
            border: 1.5px solid rgba(255,255,255,0.35); border-radius: 8px;
            transform: skewX(-12deg); display: flex; align-items: center; justify-content: space-between;
            padding: 0 20px; box-shadow: 0 10px 24px rgba(0,0,0,0.6);
          }
          .unskew { transform: skewX(12deg); }
          .lt-left { display: flex; align-items: center; gap: 36px; }
          .flag-icon { display: flex; align-items: center; justify-content: center; width: 75px; }
          .athlete-name { font-size: 30px; font-weight: 900; font-style: italic; color: #ffffff; letter-spacing: 1px; }
          .lt-right { display: flex; align-items: center; gap: 18px; }
          .status-badge-white {
            background: #ffffff; color: #000000; font-size: 22px; font-weight: 900; font-style: italic;
            padding: 4px 18px; border-radius: 5px; box-shadow: 0 2px 6px rgba(0,0,0,0.4);
          }
        </style>
      </head>
      <body>
        <div class="lower-third-container">
          <div class="lt-left unskew">
            <div class="flag-icon">${flagImgHtml || nocCode}</div>
            <div class="athlete-name">${nameStr}</div>
          </div>
          <div class="lt-right unskew">
            ${(statusStr && statusStr.trim() !== '') ? `<div class="status-badge-white">${statusStr}</div>` : ''}
            <div>${olympicRingsSVG}</div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ── 5. DV006 - Officials / Judges List ──
  if (normId.includes('DV006') || normId.includes('OFFICIALS')) {
    const rawEvent = (customData.event || customData.title || '').trim();
    const isDefaultEvent = !rawEvent || 
      rawEvent.toUpperCase().includes('SYNCHRONISED') || 
      rawEvent.toUpperCase().includes('10M PLATFORM') || 
      rawEvent.toUpperCase().includes('10M') ||
      rawEvent.toUpperCase().includes('SPRINGBOARD');
    const eventTitle = (isDefaultEvent ? "MEN'S 3M SPRINGBOARD" : rawEvent).toUpperCase();

    const rawSub = (customData.subtitle || customData.subTitle || '').trim();
    const subTitle = (rawSub ? rawSub : "JUDGES").toUpperCase();

    const defaultJudges = [
      { name: 'ROLANDO RUIZ PEDREGUERA', role: 'JUDGE 1' },
      { name: 'ANN SISSONS', role: 'JUDGE 2' },
      { name: 'MATHZ LINDBERG', role: 'JUDGE 3' },
      { name: 'FRANCISCUS VAN DE KONIJNENBURG', role: 'JUDGE 4' },
      { name: 'ROBERTO GONCALVES', role: 'JUDGE 5' },
      { name: 'ILDIKO KELEMEN', role: 'JUDGE 6' },
      { name: 'ADRIENNE WILSON', role: 'JUDGE 7' }
    ];

    const judges = (customData.officials && customData.officials.length > 0)
      ? customData.officials
      : (customData.judges && customData.judges.length > 0)
      ? customData.judges
      : defaultJudges;

    const totalHeight = 88 + 46 + 6 + (judges.length * 57);
    const baseTop = 966 - totalHeight;

    const rowsHTML = judges.map((item, index) => {
      const isEven = index % 2 === 0;
      const bg = isEven ? 'linear-gradient(90deg, #0a1d38 0%, #08162b 100%)' : 'linear-gradient(90deg, #061326 0%, #040d1c 100%)';
      return `
        <div class="start-row" style="background: ${bg};">
          <div class="unskew row-content">
            <div class="judge-name">${(item.name || item.officialName || '').toUpperCase()}</div>
            <div class="judge-role">${(item.role || item.title || `JUDGE ${index + 1}`).toUpperCase()}</div>
          </div>
        </div>
      `;
    }).join('');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,700;1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .start-list-container {
            position: absolute; top: ${baseTop}px; left: 333px; width: 1250px;
            display: flex; flex-direction: column; gap: 3px;
          }
          .unskew { transform: skewX(12deg); }

          .head-bar {
            height: 88px; width: 1250px;
            background: linear-gradient(135deg, ${gradientStart} 0%, ${primaryColor} 50%, ${gradientEnd} 100%);
            border: 2px solid rgba(255,255,255,0.35); border-radius: 8px;
            transform: skewX(-12deg); display: flex; align-items: center; justify-content: space-between;
            padding: 0 36px; box-shadow: 0 12px 28px rgba(0,0,0,0.6);
          }
          .head-left { display: flex; align-items: center; gap: 20px; }
          .head-title { font-size: 40px; font-weight: 900; font-style: italic; color: #ffffff; letter-spacing: 2px; }

          .sub-bar {
            height: 46px; width: 1210px; margin-left: 20px; margin-top: 2px;
            background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #cbd5e1 100%);
            border: 1px solid rgba(0,0,0,0.2); border-radius: 5px;
            transform: skewX(-12deg); display: flex; align-items: center; padding: 0 32px;
          }
          .sub-title { font-size: 26px; font-weight: 900; font-style: italic; color: #1a2b42; letter-spacing: 1.5px; padding-left: 65px; }

          .start-row {
            height: 54px; width: 1250px; margin-top: 2px;
            border: 1px solid rgba(255,255,255,0.12);
            transform: skewX(-12deg); display: flex; align-items: center; padding: 0 30px;
          }
          .row-content { display: flex; align-items: center; justify-content: space-between; width: 100%; }
          .judge-name { font-size: 30px; font-weight: 900; font-style: italic; color: #ffffff; }
          .judge-role { font-size: 28px; font-weight: 900; font-style: italic; color: #ffffff; text-align: right; }
        </style>
      </head>
      <body>
        <div class="start-list-container">
          <div class="head-bar">
            <div class="head-left unskew">
              <div style="width:48px; height:48px;">${officialDivingPictographSVG}</div>
              <div class="head-title">${eventTitle}</div>
            </div>
            <div class="unskew">${olympicRingsSVG}</div>
          </div>
          <div class="sub-bar">
            <div class="sub-title unskew">${subTitle}</div>
          </div>
          ${rowsHTML}
        </div>
      </body>
      </html>
    `;
  }

  // ── 6. DV007 - Officials / Judges List (Synchronised - Execution vs Synch) ──
  if (normId.includes('DV007') || normId.includes('SYNCH')) {
    const isVariantB = normId.includes('_B') || normId.endsWith('B') || (customData.variant || '').toLowerCase() === 'b';

    const defaultJudgesA = [
      { name: 'ANN SISSONS', role: 'EXECUTION 1' },
      { name: 'YOSHINO YUASA', role: 'EXECUTION 2' },
      { name: 'MATHZ LINDBERG', role: 'EXECUTION 3' },
      { name: 'ADRIENNE WILSON', role: 'EXECUTION 4' },
      { name: 'FELIPE MENDES', role: 'EXECUTION 5' },
      { name: 'LEYLA SAHAN', role: 'EXECUTION 6' }
    ];

    const defaultJudgesB = [
      { name: 'ROLANDO RUIZ PEDREGUERA', role: 'SYNCHRONISATION 1' },
      { name: 'HANA NOVOTNA', role: 'SYNCHRONISATION 2' },
      { name: 'ROBERTO GONCALVES', role: 'SYNCHRONISATION 3' },
      { name: 'OLGA MCCLESKEY', role: 'SYNCHRONISATION 4' },
      { name: 'ILDIKO KELEMEN', role: 'SYNCHRONISATION 5' }
    ];

    const judges = (customData.officials && customData.officials.length > 0)
      ? customData.officials
      : (customData.judges && customData.judges.length > 0)
      ? customData.judges
      : (isVariantB ? defaultJudgesB : defaultJudgesA);

    const rawEvent = (customData.event || customData.title || '').trim();
    const isDefaultEvent = !rawEvent || 
      rawEvent.toUpperCase().includes('SPRINGBOARD') || 
      rawEvent.toUpperCase().includes('10M PLATFORM') || 
      rawEvent.toUpperCase() === "MEN'S 10M PLATFORM";
    const eventTitle = (isDefaultEvent ? "WOMEN'S SYNCHRONISED 10M PLATFORM" : rawEvent).toUpperCase();

    const rawSub = (customData.subtitle || customData.subTitle || '').trim();
    const subTitle = (rawSub ? rawSub : "JUDGES").toUpperCase();

    const totalHeight = 88 + 46 + 6 + (judges.length * 57);
    const baseTop = 966 - totalHeight;

    const rowsHTML = judges.map((item, index) => {
      const isEven = index % 2 === 0;
      const bg = isEven ? 'linear-gradient(90deg, #0a1d38 0%, #08162b 100%)' : 'linear-gradient(90deg, #061326 0%, #040d1c 100%)';
      return `
        <div class="start-row" style="background: ${bg};">
          <div class="unskew row-content">
            <div class="judge-name">${(item.name || item.officialName || '').toUpperCase()}</div>
            <div class="judge-role">${(item.role || item.title || `JUDGE ${index + 1}`).toUpperCase()}</div>
          </div>
        </div>
      `;
    }).join('');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,700;1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .start-list-container {
            position: absolute; top: ${baseTop}px; left: 333px; width: 1250px;
            display: flex; flex-direction: column; gap: 3px;
          }
          .unskew { transform: skewX(12deg); }

          .head-bar {
            height: 88px; width: 1250px;
            background: linear-gradient(135deg, ${gradientStart} 0%, ${primaryColor} 50%, ${gradientEnd} 100%);
            border: 2px solid rgba(255,255,255,0.35); border-radius: 8px;
            transform: skewX(-12deg); display: flex; align-items: center; justify-content: space-between;
            padding: 0 36px; box-shadow: 0 12px 28px rgba(0,0,0,0.6);
          }
          .head-left { display: flex; align-items: center; gap: 20px; }
          .head-title { font-size: 40px; font-weight: 900; font-style: italic; color: #ffffff; letter-spacing: 2px; }

          .sub-bar {
            height: 46px; width: 1210px; margin-left: 20px; margin-top: 2px;
            background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #cbd5e1 100%);
            border: 1px solid rgba(0,0,0,0.2); border-radius: 5px;
            transform: skewX(-12deg); display: flex; align-items: center; padding: 0 32px;
          }
          .sub-title { font-size: 26px; font-weight: 900; font-style: italic; color: #1a2b42; letter-spacing: 1.5px; padding-left: 65px; }

          .start-row {
            height: 54px; width: 1250px; margin-top: 2px;
            border: 1px solid rgba(255,255,255,0.12);
            transform: skewX(-12deg); display: flex; align-items: center; padding: 0 30px;
          }
          .row-content { display: flex; align-items: center; justify-content: space-between; width: 100%; }
          .judge-name { font-size: 30px; font-weight: 900; font-style: italic; color: #ffffff; }
          .judge-role { font-size: 28px; font-weight: 900; font-style: italic; color: #ffffff; text-align: right; }
        </style>
      </head>
      <body>
        <div class="start-list-container">
          <div class="head-bar">
            <div class="head-left unskew">
              <div style="width:48px; height:48px;">${officialDivingPictographSVG}</div>
              <div class="head-title">${eventTitle}</div>
            </div>
            <div class="unskew">${olympicRingsSVG}</div>
          </div>
          <div class="sub-bar">
            <div class="sub-title unskew">${subTitle}</div>
          </div>
          ${rowsHTML}
        </div>
      </body>
      </html>
    `;
  }

  // ── 8. DV009 - Position ID (Synchronised - Side-by-Side Dual Name Tags) ──
  if (normId.includes('DV009') || normId.includes('POSITION ID')) {
    const rawLeftName = (customData.leftName || customData.diver1 || customData.name1 || '').trim();
    const rawRightName = (customData.rightName || customData.diver2 || customData.name2 || '').trim();
    const rawNoc = (customData.noc || customData.country || '').trim();

    const isGenericLeft = !rawLeftName || rawLeftName.toUpperCase() === 'TOM DALEY';
    const isGenericRight = !rawRightName || rawRightName.toUpperCase() === 'TOM DALEY';
    const isGenericNoc = !rawNoc || rawNoc.toUpperCase() === 'GBR';

    const leftNameStr = (isGenericLeft ? 'TATIANA ORTIZ' : rawLeftName).toUpperCase();
    const rightNameStr = (isGenericRight ? 'PAOLA ESPINOSA' : rawRightName).toUpperCase();

    const leftNocCode = (customData.leftNoc || (isGenericNoc ? 'MEX' : rawNoc)).toUpperCase();
    const rightNocCode = (customData.rightNoc || (isGenericNoc ? 'MEX' : rawNoc)).toUpperCase();

    const leftFlagImgHtml = getFlagImgHtml(leftNocCode, 'height: 40px; width: auto; border-radius: 4px; transform: skewX(-12deg);');
    const rightFlagImgHtml = getFlagImgHtml(rightNocCode, 'height: 40px; width: auto; border-radius: 4px; transform: skewX(-12deg);');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,700;1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .position-tag {
            position: absolute; top: 912px; width: 650px; height: 54px;
            background: linear-gradient(135deg, ${gradientStart} 0%, ${primaryColor} 50%, ${gradientEnd} 100%);
            border: 1.5px solid rgba(255,255,255,0.35); border-radius: 8px;
            transform: skewX(-12deg); display: flex; align-items: center; justify-content: flex-start;
            padding: 0 20px; box-shadow: 0 10px 24px rgba(0,0,0,0.6); gap: 36px;
          }
          .tag-left { left: 240px; }
          .tag-right { left: 1000px; }
          .unskew { transform: skewX(12deg); }
          .flag-icon { display: flex; align-items: center; justify-content: center; width: 75px; }
          .athlete-name { font-size: 30px; font-weight: 900; font-style: italic; color: #ffffff; letter-spacing: 1px; }
        </style>
      </head>
      <body>
        <div class="position-tag tag-left">
          <div class="flag-icon unskew">${leftFlagImgHtml || leftNocCode}</div>
          <div class="athlete-name unskew">${leftNameStr}</div>
        </div>
        <div class="position-tag tag-right">
          <div class="flag-icon unskew">${rightFlagImgHtml || rightNocCode}</div>
          <div class="athlete-name unskew">${rightNameStr}</div>
        </div>
      </body>
      </html>
    `;
  }

  // ── 9. DV010 - Scorecard Individual (HTML Generator) ──
  if (normId.includes('DV010') || normId.includes('SCORECARD')) {
    const isVariantA = normId.includes('_A') || normId.endsWith('A') || (customData.variant || '').toUpperCase() === 'A';
    const isVariantB = !isVariantA && (normId.includes('_B') || normId.endsWith('B') || (customData.variant || '').toUpperCase() === 'B');

    let defaultNoc = 'RUS';
    let defaultName = 'ALEKSANDR DOBROSKOK';
    let defaultOrder = '3';
    let defaultRound = 'ROUND 1';
    let defaultDifficulty = 'DIFFICULTY 3.5';
    let defaultPenalty = 'PENALTY 0.00';
    let defaultScore = 'SCORE 78.75';
    let defaultScores = [
      { score: '7.0', struck: true },
      { score: '7.5', struck: false },
      { score: '7.0', struck: true },
      { score: '7.5', struck: false },
      { score: '7.5', struck: false },
      { score: '7.5', struck: false },
      { score: '7.5', struck: false }
    ];
    let defaultTotal = '';

    if (isVariantB) {
      defaultNoc = 'ITA';
      defaultName = 'TOMMASO MARCONI';
      defaultOrder = '28';
      defaultRound = 'ROUND 6';
      defaultDifficulty = 'DIFFICULTY 3.4';
      defaultPenalty = 'PENALTY 2.0';
      defaultScore = 'SCORE 47.30';
      defaultTotal = 'TOTAL 358.15';
      defaultScores = [
        { score: '5.0', struck: false },
        { score: '5.0', struck: false },
        { score: '4.5', struck: true },
        { score: '4.5', struck: false },
        { score: '5.0', struck: true },
        { score: '4.5', struck: false },
        { score: '5.0', struck: false }
      ];
    }

    const rawName = (customData.name || customData.athlete || '').trim();
    const rawNoc = (customData.noc || customData.country || '').trim();
    const isGenericName = !rawName || rawName.toUpperCase() === 'TOM DALEY';
    const isGenericNoc = !rawNoc || rawNoc.toUpperCase() === 'GBR';

    const nameStr = (isGenericName ? defaultName : rawName).toUpperCase();
    const nocCode = (isGenericNoc ? defaultNoc : rawNoc).toUpperCase();
    const orderStr = String(customData.order || customData.startOrder || defaultOrder);

    const rawRound = (customData.round || '').trim();
    const isGenericRound = !rawRound || rawRound.toUpperCase().includes('SYNCHRONISED') || rawRound.toUpperCase().includes('10M PLATFORM') || rawRound.toUpperCase().includes('DIVE 6');
    const roundStr = (isGenericRound ? defaultRound : rawRound).toUpperCase();

    const rawDiff = (customData.difficulty || '').trim();
    let formattedDiff = rawDiff;
    if (formattedDiff && !formattedDiff.toUpperCase().startsWith('DIFFICULTY')) {
      formattedDiff = `DIFFICULTY ${formattedDiff}`;
    }
    const diffStr = (formattedDiff ? formattedDiff : defaultDifficulty).toUpperCase();

    const rawPen = (customData.penalty || '').trim();
    let formattedPen = rawPen;
    if (formattedPen && !formattedPen.toUpperCase().startsWith('PENALTY')) {
      formattedPen = `PENALTY ${formattedPen}`;
    }
    const penaltyStr = (formattedPen ? formattedPen : defaultPenalty).toUpperCase();

    const rawScore = (customData.score || '').trim();
    let formattedScore = rawScore;
    if (formattedScore && !formattedScore.toUpperCase().startsWith('SCORE')) {
      formattedScore = `SCORE ${formattedScore}`;
    }
    const scoreStr = (formattedScore ? formattedScore : defaultScore).toUpperCase();

    const rawTotal = (customData.total || customData.totalScore || '').trim();
    let formattedTotal = rawTotal;
    if (formattedTotal && !formattedTotal.toUpperCase().startsWith('TOTAL')) {
      formattedTotal = `TOTAL ${formattedTotal}`;
    }
    const totalStr = (isVariantB ? (formattedTotal ? formattedTotal : defaultTotal) : '').toUpperCase();

    const scoresList = (customData.scores && customData.scores.length > 0) ? customData.scores : defaultScores;

    const flagImgHtml = getFlagImgHtml(nocCode, 'height: 40px; width: auto; border-radius: 4px; transform: skewX(-12deg);');

    const totalHeight = 54 + 38 + 42 + 4;
    const baseTop = 966 - totalHeight;

    const scoresHTML = scoresList.map((item) => {
      const valStr = typeof item === 'object' ? item.score : String(item);
      const isStruck = typeof item === 'object' ? item.struck : false;
      return `<div class="score-val ${isStruck ? 'struck' : ''}">${valStr}</div>`;
    }).join('');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,700;1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .scorecard-container {
            position: absolute; top: ${totalStr ? (baseTop - 34) : baseTop}px; left: 333px; width: 1100px;
            display: flex; flex-direction: column; gap: 2px;
          }
          .unskew { transform: skewX(12deg); }

          .total-tab {
            height: 32px; width: 240px; margin-left: 45px; margin-bottom: 2px;
            background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #cbd5e1 100%);
            border: 1px solid rgba(0,0,0,0.2); border-radius: 4px;
            transform: skewX(-12deg); display: flex; align-items: center; justify-content: center;
            font-size: 22px; font-weight: 900; font-style: italic; color: #1a2b42;
          }

          .t1-bar {
            height: 54px; width: 1100px;
            background: linear-gradient(135deg, ${gradientStart} 0%, ${primaryColor} 50%, ${gradientEnd} 100%);
            border: 1.5px solid rgba(255,255,255,0.35); border-radius: 8px;
            transform: skewX(-12deg); display: flex; align-items: center; justify-content: space-between;
            padding: 0 20px; box-shadow: 0 10px 24px rgba(0,0,0,0.6);
          }
          .t1-left { display: flex; align-items: center; gap: 16px; }
          .order-badge-red {
            background: #d32f2f; color: #ffffff; font-size: 28px; font-weight: 900; font-style: italic;
            padding: 2px 14px; border-radius: 4px;
          }
          .noc-code { font-size: 24px; font-weight: 900; font-style: italic; color: #ffffff; }
          .flag-icon { display: flex; align-items: center; justify-content: center; width: 75px; }
          .athlete-name { font-size: 30px; font-weight: 900; font-style: italic; color: #ffffff; }

          .t2-bar {
            height: 38px; width: 1070px; margin-left: 15px;
            background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #cbd5e1 100%);
            border: 1px solid rgba(0,0,0,0.2); border-radius: 4px;
            transform: skewX(-12deg); display: flex; align-items: center; justify-content: space-between;
            padding: 0 24px;
          }
          .t2-text { font-size: 24px; font-weight: 900; font-style: italic; color: #1a2b42; }

          .t3-bar {
            height: 42px; width: 1100px;
            background: linear-gradient(135deg, #091d36 0%, #0f2f57 50%, #071629 100%);
            border: 1.5px solid rgba(255,255,255,0.35); border-radius: 4px;
            transform: skewX(-12deg); display: flex; align-items: center; justify-content: space-around;
            padding: 0 10px;
          }
          .score-val {
            font-size: 26px; font-weight: 900; font-style: italic; color: #ffffff; position: relative;
          }
          .score-val.struck::after {
            content: ''; position: absolute; left: -4px; right: -4px; top: 50%; height: 3px;
            background: #ffffff; transform: translateY(-50%) skewX(-12deg);
          }
        </style>
      </head>
      <body>
        <div class="scorecard-container">
          ${totalStr ? `<div class="total-tab"><div class="unskew">${totalStr}</div></div>` : ''}
          <div class="t1-bar">
            <div class="t1-left unskew">
              <div class="order-badge-red">${orderStr}</div>
              <div class="noc-code">${nocCode}</div>
              <div class="flag-icon">${flagImgHtml}</div>
              <div class="athlete-name">${nameStr}</div>
            </div>
            <div class="unskew">${olympicRingsSVG}</div>
          </div>
          <div class="t2-bar">
            <div class="t2-text unskew">${roundStr}</div>
            <div class="t2-text unskew">${diffStr}</div>
            <div class="t2-text unskew">${penaltyStr}</div>
            <div class="t2-text unskew" style="font-size:26px;">${scoreStr}</div>
          </div>
          <div class="t3-bar unskew">
            ${scoresHTML}
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ── 10. DV011 - Scorecard Synch (HTML Generator) ──
  if (normId.includes('DV011') || normId.includes('SYNCH')) {
    const isVariantA = normId.includes('_A') || normId.endsWith('A') || (customData.variant || '').toUpperCase() === 'A';
    const isVariantB = !isVariantA && (normId.includes('_B') || normId.endsWith('B') || (customData.variant || '').toUpperCase() === 'B');

    let defaultNoc = 'AUS';
    let defaultName = 'BRIONY COLE / MELISSA WU';
    let defaultOrder = '3';
    let defaultRound = 'ROUND 1';
    let defaultDifficulty = 'DIFFICULTY 3.4';
    let defaultPenalty = 'PENALTY 0.00';
    let defaultScore = 'SCORE 144.50';
    let defaultTotal = '';
    let defaultScores = [
      { score: '7.5', struck: false },
      { score: '8.0', struck: true },
      { score: '7.0', struck: true },
      { score: '9.0', struck: false },
      { score: '8.5', struck: false },
      { score: '9.0', struck: false },
      { score: '8.5', struck: true },
      { score: '9.0', struck: false },
      { score: '9.0', struck: false },
      { score: '8.5', struck: false },
      { score: '8.5', struck: false }
    ];

    if (isVariantB) {
      defaultNoc = 'CAN';
      defaultName = 'M. BENFEITO / R. FILION';
      defaultOrder = '6';
      defaultRound = 'ROUND 5';
      defaultDifficulty = 'DIFFICULTY 3.4';
      defaultPenalty = 'PENALTY 2.00';
      defaultScore = 'SCORE 118.70';
      defaultTotal = 'TOTAL 583.40';
      defaultScores = [
        { score: '6.0', struck: true },
        { score: '7.0', struck: true },
        { score: '6.5', struck: false },
        { score: '5.0', struck: false },
        { score: '5.5', struck: false },
        { score: '4.5', struck: true },
        { score: '8.0', struck: true },
        { score: '8.0', struck: false },
        { score: '8.0', struck: false },
        { score: '8.0', struck: false },
        { score: '7.5', struck: true }
      ];
    }

    const rawName = (customData.name || customData.pair || customData.athlete || '').trim();
    const rawNoc = (customData.noc || customData.country || '').trim();
    const isGenericName = !rawName || rawName.toUpperCase() === 'TOM DALEY';
    const isGenericNoc = !rawNoc || rawNoc.toUpperCase() === 'GBR';

    const nameStr = (isGenericName ? defaultName : rawName).toUpperCase();
    const nocCode = (isGenericNoc ? defaultNoc : rawNoc).toUpperCase();
    const orderStr = String(customData.order || customData.startOrder || defaultOrder);

    const rawRound = (customData.round || '').trim();
    const isGenericRound = !rawRound || rawRound.toUpperCase().includes('SYNCHRONISED') || rawRound.toUpperCase().includes('10M PLATFORM') || rawRound.toUpperCase().includes('DIVE 6');
    const roundStr = (isGenericRound ? defaultRound : rawRound).toUpperCase();

    const rawDiff = (customData.difficulty || '').trim();
    let formattedDiff = rawDiff;
    if (formattedDiff && !formattedDiff.toUpperCase().startsWith('DIFFICULTY')) {
      formattedDiff = `DIFFICULTY ${formattedDiff}`;
    }
    const diffStr = (formattedDiff ? formattedDiff : defaultDifficulty).toUpperCase();

    const rawPen = (customData.penalty || '').trim();
    let formattedPen = rawPen;
    if (formattedPen && !formattedPen.toUpperCase().startsWith('PENALTY')) {
      formattedPen = `PENALTY ${formattedPen}`;
    }
    const penaltyStr = (formattedPen ? formattedPen : defaultPenalty).toUpperCase();

    const rawScore = (customData.score || '').trim();
    let formattedScore = rawScore;
    if (formattedScore && !formattedScore.toUpperCase().startsWith('SCORE')) {
      formattedScore = `SCORE ${formattedScore}`;
    }
    const scoreStr = (formattedScore ? formattedScore : defaultScore).toUpperCase();

    const rawTotal = (customData.total || customData.totalScore || '').trim();
    let formattedTotal = rawTotal;
    if (formattedTotal && !formattedTotal.toUpperCase().startsWith('TOTAL')) {
      formattedTotal = `TOTAL ${formattedTotal}`;
    }
    const totalStr = (isVariantB ? (formattedTotal ? formattedTotal : defaultTotal) : '').toUpperCase();

    const scoresList = (customData.scores && customData.scores.length === 11) ? customData.scores : defaultScores;

    const flagImgHtml = getFlagImgHtml(nocCode, 'height: 40px; width: auto; border-radius: 4px; transform: skewX(-12deg);');

    const totalHeight = 54 + 38 + 28 + 38 + 6;
    const baseTop = 966 - totalHeight;

    const scoresHTML = scoresList.map((item) => {
      const valStr = typeof item === 'object' ? item.score : String(item);
      const isStruck = typeof item === 'object' ? item.struck : false;
      return `<div class="score-val ${isStruck ? 'struck' : ''}">${valStr}</div>`;
    }).join('');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,700;1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .scorecard-container {
            position: absolute; top: ${totalStr ? (baseTop - 34) : baseTop}px; left: 333px; width: 1100px;
            display: flex; flex-direction: column; gap: 2px;
          }
          .unskew { transform: skewX(12deg); }

          .total-tab {
            height: 32px; width: 240px; margin-left: 45px; margin-bottom: 2px;
            background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #cbd5e1 100%);
            border: 1px solid rgba(0,0,0,0.2); border-radius: 4px;
            transform: skewX(-12deg); display: flex; align-items: center; justify-content: center;
            font-size: 22px; font-weight: 900; font-style: italic; color: #1a2b42;
          }

          .t1-bar {
            height: 54px; width: 1100px;
            background: linear-gradient(135deg, ${gradientStart} 0%, ${primaryColor} 50%, ${gradientEnd} 100%);
            border: 1.5px solid rgba(255,255,255,0.35); border-radius: 8px;
            transform: skewX(-12deg); display: flex; align-items: center; justify-content: space-between;
            padding: 0 20px; box-shadow: 0 10px 24px rgba(0,0,0,0.6);
          }
          .t1-left { display: flex; align-items: center; gap: 16px; }
          .order-badge-red {
            background: #d32f2f; color: #ffffff; font-size: 28px; font-weight: 900; font-style: italic;
            padding: 2px 14px; border-radius: 4px;
          }
          .noc-code { font-size: 24px; font-weight: 900; font-style: italic; color: #ffffff; }
          .flag-icon { display: flex; align-items: center; justify-content: center; width: 75px; }
          .athlete-name { font-size: 30px; font-weight: 900; font-style: italic; color: #ffffff; }

          .t2-bar {
            height: 38px; width: 1070px; margin-left: 15px;
            background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #cbd5e1 100%);
            border: 1px solid rgba(0,0,0,0.2); border-radius: 4px;
            transform: skewX(-12deg); display: flex; align-items: center; justify-content: space-between;
            padding: 0 24px;
          }
          .t2-text { font-size: 24px; font-weight: 900; font-style: italic; color: #1a2b42; }

          .t3-headings-bar {
            height: 28px; width: 1100px;
            background: linear-gradient(135deg, #091d36 0%, #0f2f57 50%, #071629 100%);
            border: 1px solid rgba(255,255,255,0.35); border-radius: 4px;
            transform: skewX(-12deg); display: flex; align-items: center; justify-content: space-between;
            padding: 0 10px; font-size: 18px; font-weight: 900; font-style: italic; color: #ffffff; letter-spacing: 1px;
          }

          .t4-scores-bar {
            height: 38px; width: 1100px;
            background: linear-gradient(135deg, #091d36 0%, #0f2f57 50%, #071629 100%);
            border: 1px solid rgba(255,255,255,0.35); border-radius: 4px;
            transform: skewX(-12deg); display: flex; align-items: center; justify-content: space-around;
            padding: 0 10px;
          }
          .score-val {
            font-size: 26px; font-weight: 900; font-style: italic; color: #ffffff; position: relative;
            width: 90px; text-align: center;
          }
          .score-val.struck::after {
            content: ''; position: absolute; left: 15px; right: 15px; top: 50%; height: 3px;
            background: #ffffff; transform: translateY(-50%) skewX(-12deg);
          }
        </style>
      </head>
      <body>
        <div class="scorecard-container">
          ${totalStr ? `<div class="total-tab"><div class="unskew">${totalStr}</div></div>` : ''}
          <div class="t1-bar">
            <div class="t1-left unskew">
              <div class="order-badge-red">${orderStr}</div>
              <div class="noc-code">${nocCode}</div>
              <div class="flag-icon">${flagImgHtml}</div>
              <div class="athlete-name">${nameStr}</div>
            </div>
            <div class="unskew">${olympicRingsSVG}</div>
          </div>
          <div class="t2-bar">
            <div class="t2-text unskew">${roundStr}</div>
            <div class="t2-text unskew">${diffStr}</div>
            <div class="t2-text unskew">${penaltyStr}</div>
            <div class="t2-text unskew" style="font-size:26px;">${scoreStr}</div>
          </div>
          <div class="t3-headings-bar">
            <div class="unskew" style="width: 580px; text-align: center;">EXECUTION</div>
            <div class="unskew" style="width: 480px; text-align: center;">SYNCHRONISATION</div>
          </div>
          <div class="t4-scores-bar unskew">
            ${scoresHTML}
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ── 11. DV012 - Winner / Winners / Place ID (HTML Generator) ──
  if (normId.includes('DV012') || normId.includes('WINNER') || normId.includes('PLACE ID')) {
    const isVariantB = normId.includes('_B') || normId.endsWith('B') || (customData.variant || '').toUpperCase() === 'B';

    let defaultEvent = isVariantB ? "WOMEN'S SYNCHRONISED 10M PLATFORM" : "WOMEN'S 10M PLATFORM";
    let defaultSubTitle = isVariantB ? "WINNERS" : "WINNER";
    let defaultNoc = 'CHN';
    let defaultName = isVariantB ? 'WANG XIN / CHEN RUOLIN' : 'CHEN RUOLIN';
    let defaultScore = isVariantB ? '363.54' : 'OR 447.70';

    const rawEvent = (customData.event || customData.title || customData.eventName || '').trim();
    const eventTitle = (rawEvent ? rawEvent : defaultEvent).toUpperCase();

    const rawSub = (customData.subtitle || customData.subTitle || customData.winnerTitle || '').trim();
    const subTitle = (rawSub ? rawSub : defaultSubTitle).toUpperCase();

    const rawName = (customData.name || customData.athlete || customData.winnerName || '').trim();
    const isGenericName = !rawName || rawName.toUpperCase() === 'TOM DALEY';
    const nameStr = (isGenericName ? defaultName : rawName).toUpperCase();

    const rawNoc = (customData.noc || customData.country || '').trim();
    const isGenericNoc = !rawNoc || rawNoc.toUpperCase() === 'GBR';
    const nocCode = (isGenericNoc ? defaultNoc : rawNoc).toUpperCase();

    const rawScore = (customData.score || customData.result || customData.totalScore || '').trim();
    const scoreStr = (rawScore ? rawScore : defaultScore).toUpperCase();

    const flagImgHtml = getFlagImgHtml(nocCode, 'height: 40px; width: auto; border-radius: 4px; transform: skewX(-12deg);');

    const totalHeight = 54 + 38 + 54 + 4;
    const baseTop = 966 - totalHeight; // 816px

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,700;1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .winner-container {
            position: absolute; top: ${baseTop}px; left: 333px; width: 1100px;
            display: flex; flex-direction: column; gap: 2px;
          }
          .unskew { transform: skewX(12deg); }

          .t1-bar {
            height: 54px; width: 1100px;
            background: linear-gradient(135deg, ${gradientStart} 0%, ${primaryColor} 50%, ${gradientEnd} 100%);
            border: 1.5px solid rgba(255,255,255,0.35); border-radius: 8px;
            transform: skewX(-12deg); display: flex; align-items: center; justify-content: space-between;
            padding: 0 20px; box-shadow: 0 10px 24px rgba(0,0,0,0.6);
          }
          .t1-left { display: flex; align-items: center; gap: 16px; }
          .picto-box {
            background: rgba(255,255,255,0.15); width: 44px; height: 42px; border-radius: 4px;
            display: flex; align-items: center; justify-content: center;
          }
          .head-title { font-size: 30px; font-weight: 900; font-style: italic; color: #ffffff; letter-spacing: 1px; }

          .t2-bar {
            height: 38px; width: 1070px; margin-left: 15px;
            background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #cbd5e1 100%);
            border: 1px solid rgba(0,0,0,0.2); border-radius: 4px;
            transform: skewX(-12deg); display: flex; align-items: center; justify-content: flex-start;
            padding: 0 24px;
          }
          .sub-title { font-size: 24px; font-weight: 900; font-style: italic; color: #1a2b42; letter-spacing: 1px; }

          .t3-bar {
            height: 54px; width: 1100px;
            background: linear-gradient(135deg, ${gradientStart} 0%, ${primaryColor} 50%, ${gradientEnd} 100%);
            border: 1.5px solid rgba(255,255,255,0.35); border-radius: 8px;
            transform: skewX(-12deg); display: flex; align-items: center; justify-content: space-between;
            padding: 0 20px; box-shadow: 0 10px 24px rgba(0,0,0,0.6);
          }
          .t3-left { display: flex; align-items: center; gap: 20px; }
          .noc-code { font-size: 24px; font-weight: 900; font-style: italic; color: #ffffff; }
          .flag-icon { display: flex; align-items: center; justify-content: center; width: 75px; }
          .athlete-name { font-size: 30px; font-weight: 900; font-style: italic; color: #ffffff; }
          .score-text { font-size: 30px; font-weight: 900; font-style: italic; color: #ffffff; letter-spacing: 1px; }
        </style>
      </head>
      <body>
        <div class="winner-container">
          <div class="t1-bar">
            <div class="t1-left unskew">
              <div class="picto-box">${officialDivingPictographSVG}</div>
              <div class="head-title">${eventTitle}</div>
            </div>
            <div class="unskew">${olympicRingsSVG}</div>
          </div>
          <div class="t2-bar">
            <div class="sub-title unskew">${subTitle}</div>
          </div>
          <div class="t3-bar">
            <div class="t3-left unskew">
              <div class="noc-code">${nocCode}</div>
              <div class="flag-icon">${flagImgHtml}</div>
              <div class="athlete-name">${nameStr}</div>
            </div>
            <div class="score-text unskew">${scoreStr}</div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ── 12. DV014 - Top 3-5 (HTML Generator) ──
  if (normId.includes('DV014') || normId.includes('TOP 3') || normId.includes('TOP 5')) {
    const isVariantB = normId.includes('_B') || normId.endsWith('B') || (customData.variant || '').toUpperCase() === 'B';

    let defaultTitle = isVariantB ? 'FINAL' : 'SEMI-FINAL';
    let defaultRows = [
      { rank: '1', noc: 'GER', name: 'P. ROZENBERG', score: '84.00' },
      { rank: '2', noc: 'CAN', name: 'A. DESPATIE', score: '81.00' },
      { rank: '3', noc: 'RUS', name: 'A. DOBROSKOK', score: '78.75' }
    ];

    if (isVariantB) {
      defaultRows = [
        { rank: '1', noc: 'CHN', name: 'WANG X. / CHEN R.', score: '422.28' },
        { rank: '2', noc: 'PRK', name: 'CHOE K.H. / KIM U.H.', score: '409.28' },
        { rank: '3', noc: 'AUS', name: 'B. COLE / M. WU', score: '403.16' },
        { rank: '4', noc: 'GER', name: 'A. GAMM / N. SUBSCHINSKI', score: '390.82' },
        { rank: '5', noc: 'USA', name: 'M. DUNNICHAY / H. ISHIMATSU', score: '382.76' }
      ];
    }

    const rawTitle = (customData.title || customData.round || customData.header || '').trim();
    const tabTitle = (rawTitle ? rawTitle : defaultTitle).toUpperCase();

    const isVariantA = !isVariantB;
    const maxRows = isVariantA ? 3 : 5;

    const rawRows = (customData.rows && customData.rows.length > 0)
      ? customData.rows
      : (customData.standings && customData.standings.length > 0)
      ? customData.standings
      : defaultRows;
    const rowsList = rawRows.slice(0, maxRows);

    const totalHeight = 32 + 2 + (rowsList.length * 38) + ((rowsList.length - 1) * 3);
    const baseTop = 966 - totalHeight;

    const rowsHTML = rowsList.map((item, index) => {
      const rRank = String(item.rank || (index + 1));
      const rNoc = (item.noc || item.country || 'CHN').toUpperCase();
      const rName = (item.name || item.athlete || item.pair || '').toUpperCase();
      const rScore = String(item.score || item.total || item.points || '');
      const flagImgHtml = getFlagImgHtml(rNoc, 'height: 30px; width: auto; border-radius: 3px; transform: skewX(-12deg);');

      return `
        <div class="row-bar">
          <div class="row-left unskew">
            <div class="rank-badge">${rRank}</div>
            <div class="flag-icon">${flagImgHtml}</div>
            <div class="athlete-name">${rName}</div>
          </div>
          <div class="score-text unskew">${rScore}</div>
        </div>
      `;
    }).join('');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,700;1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .top35-container {
            position: absolute; top: ${baseTop}px; left: 333px; width: 1100px;
            display: flex; flex-direction: column; gap: 3px;
          }
          .unskew { transform: skewX(12deg); }

          .header-tab {
            height: 32px; width: 240px; margin-left: 45px; margin-bottom: 2px;
            background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #cbd5e1 100%);
            border: 1px solid rgba(0,0,0,0.2); border-radius: 4px;
            transform: skewX(-12deg); display: flex; align-items: center; justify-content: center;
            font-size: 22px; font-weight: 900; font-style: italic; color: #1a2b42; letter-spacing: 1px;
          }

          .row-bar {
            height: 38px; width: 1100px;
            background: linear-gradient(135deg, ${gradientStart} 0%, ${primaryColor} 50%, ${gradientEnd} 100%);
            border: 1px solid rgba(255,255,255,0.35); border-radius: 4px;
            transform: skewX(-12deg); display: flex; align-items: center; justify-content: space-between;
            padding: 0 20px; box-shadow: 0 6px 16px rgba(0,0,0,0.5);
          }
          .row-left { display: flex; align-items: center; gap: 20px; }
          .rank-badge {
            background: #d32f2f; color: #ffffff; font-size: 22px; font-weight: 900; font-style: italic;
            padding: 1px 10px; border-radius: 3px;
          }
          .flag-icon { display: flex; align-items: center; justify-content: center; width: 75px; }
          .athlete-name { font-size: 24px; font-weight: 900; font-style: italic; color: #ffffff; margin-left: 15px; }
          .score-text { font-size: 24px; font-weight: 900; font-style: italic; color: #ffffff; letter-spacing: 1px; }
        </style>
      </head>
      <body>
        <div class="top35-container">
          <div class="header-tab"><div class="unskew">${tabTitle}</div></div>
          ${rowsHTML}
        </div>
      </body>
      </html>
    `;
  }

  // ── 13. DV015 - Standings / Result (HTML Generator) ──
  if (normId.includes('DV015') || normId.includes('STANDINGS') || normId.includes('RESULT')) {
    let variant = 'a';
    const variantStr = (
      (customData.variant || '') + ' ' + 
      (customData.image || '') + ' ' + 
      (customData.selectedImage || '') + ' ' + 
      (customData.subType || '') + ' ' + 
      (customData.subTemplate || '') + ' ' + 
      (customData.title || '') + ' ' + 
      normId
    ).toLowerCase();

    if (variantStr.includes('_b') || variantStr.endsWith('b') || variantStr.includes('variant b') || variantStr.includes('result_b')) variant = 'b';
    else if (variantStr.includes('_c') || variantStr.endsWith('c') || variantStr.includes('variant c') || variantStr.includes('result_c')) variant = 'c';
    else if (variantStr.includes('_d') || variantStr.endsWith('d') || variantStr.includes('variant d') || variantStr.includes('result_d')) variant = 'd';
    else if (variantStr.includes('_e') || variantStr.endsWith('e') || variantStr.includes('variant e') || variantStr.includes('result_e')) variant = 'e';
    else if (variantStr.includes('_a') || variantStr.endsWith('a') || variantStr.includes('variant a') || variantStr.includes('result_a')) variant = 'a';

    let defaultEvent = "MEN'S 3M SPRINGBOARD";
    let defaultSubTitle = "PRELIMINARY - STANDINGS AFTER ROUND 6";
    let defaultRows = [];

    if (variant === 'a') {
      defaultEvent = "MEN'S 3M SPRINGBOARD";
      defaultSubTitle = "PRELIMINARY - STANDINGS AFTER ROUND 6";
      defaultRows = [
        { rank: '1', noc: 'CHN', name: 'HE CHONG', status: 'Q', score: '515.50' },
        { rank: '2', noc: 'CHN', name: 'QIN KAI', status: 'Q', score: '502.95' },
        { rank: '3', noc: 'MEX', name: 'YAHEL CASTILLO', status: 'Q', score: '480.65' },
        { rank: '4', noc: 'RUS', name: 'DMITRY SAUTIN', status: 'Q', score: '474.85' },
        { rank: '5', noc: 'FIN', name: 'JOONA PUHAKKA', status: 'Q', score: '469.45' },
        { rank: '6', noc: 'AUS', name: 'ROBERT NEWBERY', status: 'Q', score: '465.15' },
        { rank: '7', noc: 'USA', name: 'CHRIS COLWILL', status: 'Q', score: '464.75' },
        { rank: '8', noc: 'UKR', name: 'ILLYA KVASHA', status: 'Q', score: '461.65' },
        { rank: '9', noc: 'CAN', name: 'ALEXANDRE DESPATIE', status: 'Q', score: '453.60' },
        { rank: '10', noc: 'JPN', name: 'KEN TERAUCHI', status: 'Q', score: '452.80' }
      ];
    } else if (variant === 'b') {
      defaultEvent = "WOMEN'S SYNCHRONISED 10M PLATFORM";
      defaultSubTitle = "FINAL - STANDINGS AFTER ROUND 3";
      defaultRows = [
        { rank: '1', noc: 'CHN', name: 'WANG XIN / CHEN RUOLIN', score: '422.28' },
        { rank: '2', noc: 'PRK', name: 'CHOE KUM HUI / KIM UN HYANG', score: '409.28' },
        { rank: '3', noc: 'AUS', name: 'BRIONY COLE / MELISSA WU', score: '403.16' },
        { rank: '4', noc: 'GER', name: 'ANNETT GAMM / NORA SUBSCHINSKI', score: '390.82' },
        { rank: '5', noc: 'USA', name: 'MARYBETH DUNNICHAY / HALEY ISHIMATSU', score: '382.76' },
        { rank: '6', noc: 'MEX', name: 'PAOLA ESPINOSA / TATIANA ORTIZ', score: '370.67' },
        { rank: '7', noc: 'GBR', name: 'TONIA COUCH / STACIE POWELL', score: '351.24' },
        { rank: '8', noc: 'CAN', name: 'MEAGHAN BENFEITO / ROSELINE FILION', score: '336.76' }
      ];
    } else if (variant === 'c') {
      defaultEvent = "MEN'S 3M SPRINGBOARD";
      defaultSubTitle = "RESULT - FINAL";
      defaultRows = [
        { rank: '1', noc: 'CHN', name: 'HE CHONG', score: '572.90' },
        { rank: '2', noc: 'CAN', name: 'ALEXANDRE DESPATIE', score: '536.65' },
        { rank: '3', noc: 'CHN', name: 'QIN KAI', score: '530.10' },
        { rank: '4', noc: 'RUS', name: 'DMITRY SAUTIN', score: '512.65' },
        { rank: '5', noc: 'GER', name: 'PAVLO ROZENBERG', score: '485.60' },
        { rank: '6', noc: 'USA', name: 'TROY DUMAIS', score: '472.50' }
      ];
    } else if (variant === 'd') {
      defaultEvent = "MEN'S 3M SPRINGBOARD";
      defaultSubTitle = "RESULT - FINAL";
      defaultRows = [
        { rank: '7', noc: 'MEX', name: 'YAHEL CASTILLO', score: '462.10' },
        { rank: '8', noc: 'GER', name: 'PATRICK HAUSDING', score: '462.05' },
        { rank: '9', noc: 'AUS', name: 'ROBERT NEWBERY', score: '461.05' },
        { rank: '10', noc: 'COL', name: 'JUAN GUILLERMO URAN', score: '454.50' },
        { rank: '11', noc: 'JPN', name: 'KEN TERAUCHI', score: '442.50' },
        { rank: '', noc: 'USA', name: 'CHRIS COLWILL', score: 'DSQ' }
      ];
    } else if (variant === 'e') {
      defaultEvent = "WOMEN'S SYNCHRONISED 10M PLATFORM";
      defaultSubTitle = "RESULT - FINAL";
      defaultRows = [
        { rank: '1', noc: 'CHN', name: 'WANG XIN / CHEN RUOLIN', score: '703.80' },
        { rank: '2', noc: 'PRK', name: 'CHOE KUM HUI / KIM UN HYANG', score: '682.13' },
        { rank: '3', noc: 'AUS', name: 'BRIONY COLE / MELISSA WU', score: '671.93' },
        { rank: '4', noc: 'GER', name: 'ANNETT GAMM / NORA SUBSCHINSKI', score: '651.36' },
        { rank: '5', noc: 'USA', name: 'MARYBETH DUNNICHAY / HALEY ISHIMATSU', score: '637.93' },
        { rank: '6', noc: 'CAN', name: 'MEAGHAN BENFEITO / ROSELINE FILION', score: '585.40' },
        { rank: '7', noc: 'GBR', name: 'TONIA COUCH / STACIE POWELL', score: '561.26' },
        { rank: '', noc: 'MEX', name: 'PAOLA ESPINOSA / TATIANA ORTIZ', score: 'DSQ' }
      ];
    }

    const rawEvent = (customData.header || customData.event || customData.title || customData.eventName || '').trim();
    const isGenericHeader = !rawEvent || 
      rawEvent.toUpperCase() === 'DIVING' || 
      rawEvent.toUpperCase().includes('DIVE 6') || 
      rawEvent.toUpperCase().includes('10M PLATFORM - FINAL');
    const eventTitle = (isGenericHeader ? defaultEvent : rawEvent).toUpperCase();

    const rawSub = (customData.subHeader || customData.subTitle || customData.subtitle || customData.round || '').trim();
    const isGenericSub = !rawSub || 
      rawSub.toUpperCase() === 'JUDGES' || 
      rawSub.toUpperCase().includes('DIVE 6') || 
      rawSub.toUpperCase().includes('FINAL - DIVE');
    const subTitle = (isGenericSub ? defaultSubTitle : rawSub).toUpperCase();

    let maxRows = 10;
    if (variant === 'a') maxRows = 10;
    else if (variant === 'b') maxRows = 8;
    else if (variant === 'c') maxRows = 6;
    else if (variant === 'd') maxRows = 6;
    else if (variant === 'e') maxRows = 8;

    const inputRows = (customData.rows && customData.rows.length > 0)
      ? customData.rows
      : (customData.standings && customData.standings.length > 0)
      ? customData.standings
      : (customData.results && customData.results.length > 0)
      ? customData.results
      : null;

    // Detect generic dummy standings from gamesData.js defaults and ignore them
    const genericDummyNames = ['CAO YUAN', 'RIKUTO TAMAI', 'TOM DALEY', 'CASPAR CORER', 'OLEKSIY SEREDA', 'ROZENBERG', 'DESPATIE'];
    const isGenericInputRows = inputRows && inputRows.length <= 5 &&
      inputRows.some(r => genericDummyNames.some(d => (r.name || '').toUpperCase().includes(d)));

    const rawRows = (!inputRows || isGenericInputRows) ? defaultRows : inputRows;
    const rowsList = rawRows.slice(0, maxRows);

    const totalHeight = 54 + 38 + 4 + (rowsList.length * 38) + (Math.max(0, rowsList.length - 1) * 3);
    const baseTop = 966 - totalHeight;

    const rowsHTML = rowsList.map((item, index) => {
      const rRank = item.rank !== undefined ? String(item.rank) : '';
      const rNoc = (item.noc || item.country || 'CHN').toUpperCase();
      const rName = (item.name || item.athlete || item.pair || '').toUpperCase();
      const rScore = String(item.score || item.total || item.result || '');
      const rStatus = (item.status || item.q || '').toUpperCase();

      const flagImgHtml = getFlagImgHtml(rNoc, 'height: 30px; width: auto; border-radius: 3px; transform: skewX(-12deg);');

      return `
        <div class="row-bar">
          <div class="row-left unskew">
            ${rRank ? `<div class="rank-badge">${rRank}</div>` : '<div style="width: 32px;"></div>'}
            <div class="flag-icon">${flagImgHtml}</div>
            <div class="athlete-name">${rName}</div>
          </div>
          <div class="row-right unskew">
            ${rStatus === 'Q' ? '<div class="q-badge">Q</div>' : ''}
            <div class="score-text">${rScore}</div>
          </div>
        </div>
      `;
    }).join('');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,700;1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .standings-container {
            position: absolute; top: ${baseTop}px; left: 333px; width: 1100px;
            display: flex; flex-direction: column; gap: 3px;
          }
          .unskew { transform: skewX(12deg); }

          .t1-bar {
            height: 54px; width: 1100px; margin-bottom: 2px;
            background: linear-gradient(135deg, ${gradientStart} 0%, ${primaryColor} 50%, ${gradientEnd} 100%);
            border: 1.5px solid rgba(255,255,255,0.35); border-radius: 8px;
            transform: skewX(-12deg); display: flex; align-items: center; justify-content: space-between;
            padding: 0 20px; box-shadow: 0 10px 24px rgba(0,0,0,0.6);
          }
          .t1-left { display: flex; align-items: center; gap: 16px; }
          .picto-box {
            background: rgba(255,255,255,0.15); width: 44px; height: 42px; border-radius: 4px;
            display: flex; align-items: center; justify-content: center;
          }
          .head-title { font-size: 30px; font-weight: 900; font-style: italic; color: #ffffff; letter-spacing: 1px; }

          .t2-bar {
            height: 38px; width: 1070px; margin-left: 15px; margin-bottom: 2px;
            background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #cbd5e1 100%);
            border: 1px solid rgba(0,0,0,0.2); border-radius: 4px;
            transform: skewX(-12deg); display: flex; align-items: center; justify-content: flex-start;
            padding: 0 24px;
          }
          .sub-title { font-size: 22px; font-weight: 900; font-style: italic; color: #1a2b42; letter-spacing: 1px; }

          .row-bar {
            height: 38px; width: 1100px;
            background: linear-gradient(135deg, ${gradientStart} 0%, ${primaryColor} 50%, ${gradientEnd} 100%);
            border: 1px solid rgba(255,255,255,0.35); border-radius: 4px;
            transform: skewX(-12deg); display: flex; align-items: center; justify-content: space-between;
            padding: 0 20px; box-shadow: 0 6px 16px rgba(0,0,0,0.5);
          }
          .row-left { display: flex; align-items: center; gap: 20px; }
          .rank-badge {
            background: #d32f2f; color: #ffffff; font-size: 22px; font-weight: 900; font-style: italic;
            padding: 1px 10px; border-radius: 3px; width: 32px; text-align: center;
          }
          .flag-icon { display: flex; align-items: center; justify-content: center; width: 75px; }
          .athlete-name { font-size: 24px; font-weight: 900; font-style: italic; color: #ffffff; margin-left: 15px; }

          .row-right { display: flex; align-items: center; gap: 16px; }
          .q-badge {
            background: #2e7d32; color: #ffffff; font-size: 20px; font-weight: 900; font-style: italic;
            padding: 2px 10px; border-radius: 3px;
          }
          .score-text { font-size: 24px; font-weight: 900; font-style: italic; color: #ffffff; letter-spacing: 1px; }
        </style>
      </head>
      <body>
        <div class="standings-container">
          <div class="t1-bar">
            <div class="t1-left unskew">
              <div class="picto-box">${officialDivingPictographSVG}</div>
              <div class="head-title">${eventTitle}</div>
            </div>
            <div class="unskew">${olympicRingsSVG}</div>
          </div>
          <div class="t2-bar">
            <div class="sub-title unskew">${subTitle}</div>
          </div>
          ${rowsHTML}
        </div>
      </body>
      </html>
    `;
  }

  // ── DV016 - Ceremony ID ──
  if (normId.includes('DV016')) {
    const eventTitle = (customData.event || "WOMEN'S SYNCHRONISED 10M PLATFORM").toUpperCase();
    const ceremonyStr = (customData.ceremony || 'VICTORY CEREMONY').toUpperCase();

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,700;1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .ceremony-banner { position: absolute; top: 876px; left: 328px; display: flex; flex-direction: column; gap: 2px; }
          .tier-1 {
            height: 54px; width: 1260px;
            background: linear-gradient(135deg, ${gradientStart} 0%, ${primaryColor} 60%, ${gradientEnd} 100%);
            border: 1.5px solid rgba(255,255,255,0.35); border-radius: 6px;
            transform: skewX(-12deg); display: flex; align-items: center; justify-content: space-between;
            padding: 0 24px 0 0; box-shadow: 0 10px 24px rgba(0,0,0,0.6);
          }
          .unskew { transform: skewX(12deg); }
          .t1-left { display: flex; align-items: center; gap: 14px; }
          .picto-box {
            width: 68px; height: 54px; background: rgba(0,0,0,0.25);
            display: flex; align-items: center; justify-content: center;
            padding: 0 10px; flex-shrink: 0; margin-left: -1px;
          }
          .t1-title { font-size: 28px; font-weight: 900; font-style: italic; color: #ffffff; letter-spacing: 2px; white-space: nowrap; }
          .tier-2 {
            height: 34px; width: 1220px; margin-left: 17px; margin-top: 2px;
            background: linear-gradient(135deg, #c8d8ea 0%, #dce8f5 50%, #b8cce0 100%);
            border: 1px solid rgba(0,0,0,0.15); border-radius: 3px;
            transform: skewX(-12deg); display: flex; align-items: center; padding: 0 24px;
          }
          .t2-text { font-size: 20px; font-weight: 900; font-style: italic; color: #0a2a5e; letter-spacing: 4px; padding-left: 72px; white-space: nowrap; }
        </style>
      </head>
      <body>
        <div class="ceremony-banner">
          <div class="tier-1">
            <div class="t1-left unskew">
              <div class="picto-box">${officialDivingPictographSVG}</div>
              <div class="t1-title">${eventTitle}</div>
            </div>
            <div class="unskew">${olympicRingsSVG}</div>
          </div>
          <div class="tier-2">
            <div class="t2-text unskew">${ceremonyStr}</div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ── DV017 - Medal ID ──
  if (normId.includes('DV017')) {
    const isVariantB = normId.includes('_B') || normId.endsWith('B') || (customData.variant || '').toLowerCase() === 'b';

    const isGenericDummy = (customData.athlete || '').toUpperCase() === 'TOM DALEY' || (customData.noc || '').toUpperCase() === 'GBR';
    const finalNoc = isGenericDummy ? null : (customData.noc || customData.country);
    const finalAthlete = isGenericDummy ? null : (customData.athlete || customData.name || customData.pair);
    const finalMedal = isGenericDummy ? null : customData.medal;
    const finalEvent = isGenericDummy ? null : customData.event;

    const nocCode = (finalNoc || (isVariantB ? 'PRK' : 'CHN')).toUpperCase();
    const athleteName = finalAthlete || (isVariantB ? 'CHOE Kum Hui / KIM Un Hyang' : 'HE CHONG');
    const medal = (finalMedal || (isVariantB ? 'SILVER' : 'GOLD')).toUpperCase();
    const eventName = (finalEvent || (isVariantB ? "WOMEN'S SYNCHRONISED 10M PLATFORM" : "MEN'S 3M SPRINGBOARD")).toUpperCase();
    const medalLine = `${medal} - ${eventName}`;
    const medalEmoji = medal.includes('GOLD') ? '🥇' : medal.includes('SILVER') ? '🥈' : '🥉';
    const medalBg = medal.includes('GOLD') ? '#b8860b' : medal.includes('SILVER') ? '#607080' : '#7a4a2a';
    const flagHtml = getFlagImgHtml(nocCode, 'height: 32px; width: auto; border-radius: 2px; transform: skewX(-12deg);');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,700;1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .medal-banner { position: absolute; top: 890px; left: 328px; display: flex; flex-direction: column; gap: 2px; }
          .tier-1 {
            height: 42px; width: 850px;
            background: linear-gradient(135deg, #091d36 0%, #0f2f57 50%, #071629 100%);
            border: 1px solid rgba(255,255,255,0.35); border-radius: 4px;
            transform: skewX(-12deg); display: flex; align-items: center; justify-content: space-between;
            padding: 0 16px 0 0; box-shadow: 0 6px 16px rgba(0,0,0,0.6); overflow: hidden;
          }
          .unskew { transform: skewX(12deg); }
          .t1-left { display: flex; align-items: center; padding-left: 20px; }
          .flag-wrap { display: flex; align-items: center; margin-right: 32px; }
          .athlete-name { font-size: 24px; font-weight: 900; font-style: italic; color: #ffffff; letter-spacing: 1px; white-space: nowrap; }
          .tier-2 {
            height: 32px; width: 820px; margin-left: 17px; margin-top: 2px;
            background: linear-gradient(135deg, #091d36 0%, #0f2f57 50%, #071629 100%);
            border: 1px solid rgba(255,255,255,0.2); border-radius: 3px;
            transform: skewX(-12deg); display: flex; align-items: center; padding: 0 12px; gap: 10px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.5);
          }
          .medal-circle {
            width: 26px; height: 26px; border-radius: 50%;
            background: ${medalBg}; border: 1.5px solid #fff;
            display: flex; align-items: center; justify-content: center; flex-shrink: 0;
            font-size: 14px;
          }
          .medal-line { font-size: 18px; font-weight: 900; font-style: italic; color: #ffffff; letter-spacing: 2px; white-space: nowrap; }
        </style>
      </head>
      <body>
        <div class="medal-banner">
          <div class="tier-1">
            <div class="t1-left unskew">
              <div class="flag-wrap">${flagHtml}</div>
              <div class="athlete-name">${athleteName}</div>
            </div>
            <div class="unskew">${olympicRingsSVG}</div>
          </div>
          <div class="tier-2">
            <div class="unskew" style="display:flex;align-items:center;gap:10px;">
              <div class="medal-circle">${medalEmoji}</div>
              <div class="medal-line">${medalLine}</div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ── DV018 - Medals List ──
  if (normId.includes('DV018')) {
    const isVariantB = normId.includes('_B') || normId.endsWith('B') || (customData.variant || '').toLowerCase() === 'b';
    const eventTitle = (customData.event || (isVariantB ? "WOMEN'S SYNCHRONISED 10M PLATFORM" : "MEN'S 3M SPRINGBOARD")).toUpperCase();
    const ceremonyStr = (customData.ceremony || 'VICTORY CEREMONY').toUpperCase();

    let rows = customData.rows || customData.medals || [];
    const isGenericDummy = rows.some(r => (r.name || '').toUpperCase().includes('TOM DALEY'));
    if (rows.length < 3 || isGenericDummy) {
      rows = isVariantB ? [
        { medal: 'GOLD', noc: 'CHN', name: 'WANG XIN / CHEN RUOLIN' },
        { medal: 'SILVER', noc: 'PRK', name: 'CHOE Kum Hui / KIM Un Hyang' },
        { medal: 'BRONZE', noc: 'AUS', name: 'BRIONY COLE / MELISSA WU' }
      ] : [
        { medal: 'GOLD', noc: 'CHN', name: 'HE CHONG' },
        { medal: 'SILVER', noc: 'CAN', name: 'ALEXANDRE DESPATIE' },
        { medal: 'BRONZE', noc: 'CHN', name: 'QIN KAI' }
      ];
    }
    rows = rows.slice(0, 3);

    const bannerWidth = 1260;
    const tier1Height = 54;
    const tier2Height = 34;
    const rowHeight = 38;
    const rowGap = 2;
    const totalHeight = tier1Height + tier2Height + 4 + (rows.length * rowHeight) + (Math.max(0, rows.length - 1) * rowGap);
    const targetBottomY = 966;
    const baseTop = targetBottomY - totalHeight;

    const rowsHTML = rows.map((row, i) => {
      const isGold = i === 0 || (row.medal || '').toUpperCase().includes('GOLD');
      const isSilver = i === 1 || (row.medal || '').toUpperCase().includes('SILVER');
      const medalEmoji = isGold ? '🥇' : isSilver ? '🥈' : '🥉';
      const medalBg = isGold ? '#b8860b' : isSilver ? '#607080' : '#7a4a2a';
      const noc = (row.noc || row.country || 'CHN').toUpperCase();
      const name = row.name || row.athlete || row.pair || '';
      const flagHtml = getFlagImgHtml(noc, 'height: 24px; width: auto; border-radius: 2px; transform: skewX(-12deg);');

      return `
        <div class="medal-row">
          <div class="medal-circle unskew">${medalEmoji}</div>
          <div class="flag-wrap unskew" style="margin-left: 10px; margin-right: 24px;">${flagHtml}</div>
          <div class="athlete-name unskew">${name}</div>
        </div>
      `;
    }).join('');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,700;1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .medals-list { position: absolute; top: ${baseTop}px; left: 328px; display: flex; flex-direction: column; gap: 2px; }
          .tier-1 {
            height: 54px; width: 1260px;
            background: linear-gradient(135deg, ${gradientStart} 0%, ${primaryColor} 60%, ${gradientEnd} 100%);
            border: 1.5px solid rgba(255,255,255,0.35); border-radius: 6px;
            transform: skewX(-12deg); display: flex; align-items: center; justify-content: space-between;
            padding: 0 24px 0 0; box-shadow: 0 10px 24px rgba(0,0,0,0.6); overflow: hidden;
          }
          .unskew { transform: skewX(12deg); }
          .t1-left { display: flex; align-items: center; gap: 14px; }
          .picto-box {
            width: 68px; height: 54px; background: rgba(0,0,0,0.25);
            display: flex; align-items: center; justify-content: center;
            padding: 0 10px; flex-shrink: 0; margin-left: -1px;
          }
          .t1-title { font-size: 28px; font-weight: 900; font-style: italic; color: #ffffff; letter-spacing: 2px; white-space: nowrap; }
          .tier-2 {
            height: 34px; width: 1220px; margin-left: 17px;
            background: linear-gradient(135deg, #c8d8ea 0%, #dce8f5 50%, #b8cce0 100%);
            border: 1px solid rgba(0,0,0,0.15); border-radius: 3px;
            transform: skewX(-12deg); display: flex; align-items: center; padding: 0 24px;
          }
          .t2-text { font-size: 20px; font-weight: 900; font-style: italic; color: #0a2a5e; letter-spacing: 4px; padding-left: 72px; white-space: nowrap; }
          
          .rows-container { display: flex; flex-direction: column; gap: 2px; margin-left: 27px; }
          .medal-row {
            height: 38px; width: 1210px;
            background: linear-gradient(135deg, #091d36 0%, #0f2f57 50%, #071629 100%);
            border: 1px solid rgba(255,255,255,0.2); border-radius: 3px;
            transform: skewX(-12deg); display: flex; align-items: center; padding-left: 4px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.5);
          }
          .medal-circle {
            width: 28px; height: 28px; border-radius: 50%; border: 1.5px solid #fff;
            display: flex; align-items: center; justify-content: center; flex-shrink: 0;
            font-size: 14px; margin-right: 8px; z-index: 2;
          }
          .medal-row:nth-child(1) .medal-circle { background: #b8860b; }
          .medal-row:nth-child(2) .medal-circle { background: #607080; }
          .medal-row:nth-child(3) .medal-circle { background: #7a4a2a; }
          .flag-wrap { display: flex; align-items: center; }
          .athlete-name { font-size: 22px; font-weight: 900; font-style: italic; color: #ffffff; letter-spacing: 1px; white-space: nowrap; }
        </style>
      </head>
      <body>
        <div class="medals-list">
          <div class="tier-1">
            <div class="t1-left unskew">
              <div class="picto-box">${officialDivingPictographSVG}</div>
              <div class="t1-title">${eventTitle}</div>
            </div>
            <div class="unskew">${olympicRingsSVG}</div>
          </div>
          <div class="tier-2">
            <div class="t2-text unskew">${ceremonyStr}</div>
          </div>
          <div class="rows-container">
            ${rowsHTML}
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ── DV019 - Medal Presenter ID ──
  if (normId.includes('DV019')) {
    const isGenericDummy = (customData.name || '').toUpperCase().includes('TOM DALEY') || (customData.presenter || '').toUpperCase().includes('TOM DALEY');
    const presenterName = isGenericDummy ? 'JACQUES ROGGE' : (customData.name || customData.presenter || 'JACQUES ROGGE');
    const designation = isGenericDummy ? 'IOC PRESIDENT, BELGIUM' : (customData.designation || customData.title || 'IOC PRESIDENT, BELGIUM');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,700;1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .presenter-banner { position: absolute; top: 890px; left: 328px; display: flex; flex-direction: column; gap: 2px; }
          .tier-1 {
            height: 42px; width: 720px;
            background: linear-gradient(135deg, ${gradientStart} 0%, ${primaryColor} 60%, ${gradientEnd} 100%);
            border: 1px solid rgba(255,255,255,0.35); border-radius: 4px;
            transform: skewX(-12deg); display: flex; align-items: center; justify-content: space-between;
            padding: 0 16px 0 0; box-shadow: 0 6px 16px rgba(0,0,0,0.6); overflow: hidden;
          }
          .unskew { transform: skewX(12deg); }
          .t1-left { display: flex; align-items: center; padding-left: 20px; }
          .flag-wrap { display: flex; align-items: center; margin-right: 32px; }
          .presenter-name { font-size: 24px; font-weight: 900; font-style: italic; color: #ffffff; letter-spacing: 1px; white-space: nowrap; }
          .tier-2 {
            height: 32px; width: 690px; margin-left: 17px; margin-top: 2px;
            background: linear-gradient(135deg, #091d36 0%, #0f2f57 50%, #071629 100%);
            border: 1px solid rgba(255,255,255,0.2); border-radius: 3px;
            transform: skewX(-12deg); display: flex; align-items: center; padding: 0 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.5);
          }
          .designation-line { font-size: 18px; font-weight: 900; font-style: italic; color: #ffffff; letter-spacing: 2px; padding-left: 10px; white-space: nowrap; }
        </style>
      </head>
      <body>
        <div class="presenter-banner">
          <div class="tier-1">
            <div class="t1-left unskew">
              <div class="presenter-name">${presenterName}</div>
            </div>
            <div class="unskew">${olympicRingsSVG}</div>
          </div>
          <div class="tier-2">
            <div class="designation-line unskew">${designation}</div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  return '';
}
