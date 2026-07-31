/**
 * Aquatics - Diving (DV) Broadcast Graphic Templates for games2
 * Focus: DV002, DV003, DV004, DV005, DV006
 * DV006: Officials / Judges Individual List
 */

import * as fabric from 'fabric';
import { generateUniqueId } from '../../common';
import { createFabricFlagObject, getFlagImgHtml } from '../../GamesAIPanel/TemplateGenerator';

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
    const baseTop = 920; // Lower third position matching DV004 bottom distance!
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
    const targetBottomY = 997; // Exact DV004 bottom edge (83px clearance from 1080 screen bottom)!
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
    const targetBottomY = 997; // DV004 bottom edge (83px clearance from 1080 screen bottom)!
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
    const targetBottomY = 997;
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
            position: absolute; top: 920px; left: 333px; width: 1100px; height: 54px;
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
    const baseTop = 997 - totalHeight;

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
    const baseTop = 997 - totalHeight;

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

  return '';
}
