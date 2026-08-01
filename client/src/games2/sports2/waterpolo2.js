import * as fabric from 'fabric';
import { generateUniqueId } from '../../common';
import { createFabricFlagObject, getFlagImgHtml } from '../flagHelpers';

export function getNocCodeForTeam(teamName) {
  const name = (teamName || '').trim().toUpperCase();
  if (name.includes('MONTENEGRO')) return 'MNE';
  if (name.includes('SERBIA')) return 'SRB';
  if (name.includes('HUNGARY')) return 'HUN';
  if (name.includes('UNITED STATES') || name.includes('USA')) return 'USA';
  if (name.includes('SPAIN')) return 'ESP';
  if (name.includes('CANADA')) return 'CAN';
  if (name.includes('CROATIA')) return 'CRO';
  if (name.includes('ITALY')) return 'ITA';
  if (name.includes('CHINA')) return 'CHN';
  if (name.includes('JAPAN')) return 'JPN';
  if (name.includes('GREAT BRITAIN') || name === 'GBR') return 'GBR';
  if (name.includes('FRANCE') || name === 'FRA') return 'FRA';
  if (name.includes('GREECE') || name === 'GRE') return 'GRE';
  if (name.includes('AUSTRALIA') || name === 'AUS') return 'AUS';
  return null;
}

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
    const topBody = new fabric.Path(gunPathData, createProps('path', {
      left: baseLeft, top: baseTop,
      fill: gunGradient, stroke: borderHighlight, strokeWidth: 2,
      shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.7)', blur: 15, offsetX: 0, offsetY: 8 })
    }));
    objects.push(topBody);

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

  // ── WP003 - Event Schedule ──
  if (normId.includes('WP003') || normId === 'EVENT SCHEDULE') {
    const baseLeft = 328;
    const baseTop = 966 - 314; // 652

    const tier1Height = 54;
    const tier2Height = 34;

    const hGrad = new fabric.Gradient({
      type: 'linear', gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: 1260, y2: 0 },
      colorStops: [
        { offset: 0, color: gradientStart },
        { offset: 0.5, color: gradientMid },
        { offset: 1, color: gradientEnd }
      ]
    });

    // Tier 1 Header
    const topBar = new fabric.Rect(createProps('rect', {
      left: baseLeft, top: baseTop, width: 1260, height: tier1Height,
      fill: hGrad, skewX: -12, rx: 6, ry: 6,
      stroke: borderHighlight, strokeWidth: 1.5,
      shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.6)', blur: 16, offsetX: 0, offsetY: 6 })
    }));
    objects.push(topBar);

    // Water Polo Logo
    const wave1 = new fabric.Path('M 15 80 Q 28 73, 40 80 T 65 80 T 90 80', { fill: '', stroke: '#ffffff', strokeWidth: 4.5, strokeLineCap: 'round', selectable: true });
    const wave2 = new fabric.Path('M 5 88 Q 23 83, 41 88 T 68 88 T 95 88', { fill: '', stroke: '#ffffff', strokeWidth: 3, strokeLineCap: 'round', selectable: true });
    const body = new fabric.Path('M 38 72 C 38 60, 48 55, 52 50 C 56 45, 52 35, 42 37', { fill: '', stroke: '#ffffff', strokeWidth: 6.5, strokeLineCap: 'round', selectable: true });
    const head = new fabric.Circle({ left: 37, top: 19, radius: 8, fill: '#ffffff', selectable: true });
    const arm = new fabric.Path('M 52 50 C 62 46, 68 38, 68 25', { fill: '', stroke: '#ffffff', strokeWidth: 5.5, strokeLineCap: 'round', selectable: true });
    const ball = new fabric.Circle({ left: 62, top: 8, radius: 6, fill: '#ffffff', selectable: true });
    const leftArm = new fabric.Path('M 32 62 C 22 65, 16 70, 16 76', { fill: '', stroke: '#ffffff', strokeWidth: 4.5, strokeLineCap: 'round', selectable: true });

    const waterPoloLogoGroup = new fabric.Group([wave1, wave2, body, head, arm, ball, leftArm], {
      left: baseLeft + 25, top: baseTop + 14, scaleX: 0.55, scaleY: 0.55,
      id: generateUniqueId({ type: 'waterPoloLogo' }),
      name: 'Water Polo Logo',
      selectable: true, hasControls: true
    });
    objects.push(waterPoloLogoGroup);

    const titleText = new fabric.Textbox("MEN'S WATER POLO", createProps('textbox', {
      left: baseLeft + 155, top: baseTop + 8, fontSize: 32, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: 800, charSpacing: 90
    }));
    objects.push(titleText);

    const olympicRings = createOlympicRingsGroup(baseLeft + 1165, baseTop + 12, 9, 2.2);
    objects.push(olympicRings);

    // Tier 2 Venue
    const t2Top = baseTop + tier1Height + 2;
    const botBar = new fabric.Rect(createProps('rect', {
      left: baseLeft + 17, top: t2Top, width: 1220, height: tier2Height,
      fill: new fabric.Gradient({
        type: 'linear', gradientUnits: 'pixels', coords: { x1: 0, y1: 0, x2: 1220, y2: 0 },
        colorStops: [{ offset: 0, color: '#c8d8ea' }, { offset: 0.5, color: '#dce8f5' }, { offset: 1, color: '#b8cce0' }]
      }),
      skewX: -12, rx: 3, ry: 3,
      stroke: 'rgba(0,0,0,0.15)', strokeWidth: 1
    }));
    objects.push(botBar);

    const subTitleText = new fabric.Textbox("AQUATICS CENTRE - WATER POLO ARENA", createProps('textbox', {
      left: baseLeft + 140, top: t2Top + 6, fontSize: 20, fontWeight: '900', fontStyle: 'italic',
      fill: '#0a2a5e', width: 900, charSpacing: 40
    }));
    objects.push(subTitleText);

    // Rows
    const rows = customData.rows || [
      { type: 'header', text: 'BRONZE MEDAL MATCH' },
      { type: 'team', name: 'MONTENEGRO', noc: 'MNE', cap: 'white' },
      { type: 'team', name: 'SERBIA', noc: 'SRB', cap: 'blue' },
      { type: 'header', text: 'GOLD MEDAL MATCH' },
      { type: 'team', name: 'HUNGARY', noc: 'HUN', cap: 'white' },
      { type: 'team', name: 'UNITED STATES', noc: 'USA', cap: 'blue' }
    ];

    let currentY = t2Top + tier2Height + 2;

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      if (row.type === 'header') {
        const rowHeight = 32;
        const rowGrad = new fabric.Gradient({
          type: 'linear', gradientUnits: 'pixels', coords: { x1: 0, y1: 0, x2: 1210, y2: 0 },
          colorStops: [{ offset: 0, color: '#051224' }, { offset: 1, color: '#0c223c' }]
        });
        const headerRect = new fabric.Rect(createProps('rect', {
          left: baseLeft + 27, top: currentY, width: 1210, height: rowHeight,
          fill: rowGrad, skewX: -12, rx: 2, ry: 2, stroke: borderHighlight, strokeWidth: 1
        }));
        objects.push(headerRect);

        const headerText = new fabric.Textbox(row.text.toUpperCase(), createProps('textbox', {
          left: baseLeft + 60, top: currentY + 6, fontSize: 18, fontWeight: '900', fontStyle: 'italic',
          fill: '#ffffff', width: 1100, charSpacing: 20
        }));
        objects.push(headerText);

        currentY += rowHeight + 2;
      } else {
        const rowHeight = 38;
        const rowGrad = new fabric.Gradient({
          type: 'linear', gradientUnits: 'pixels', coords: { x1: 0, y1: 0, x2: 1210, y2: 0 },
          colorStops: [{ offset: 0, color: '#091d36' }, { offset: 0.5, color: '#0f2f57' }, { offset: 1, color: '#071629' }]
        });
        const teamRect = new fabric.Rect(createProps('rect', {
          left: baseLeft + 27, top: currentY, width: 1210, height: rowHeight,
          fill: rowGrad, skewX: -12, rx: 3, ry: 3, stroke: 'rgba(255,255,255,0.15)', strokeWidth: 1
        }));
        objects.push(teamRect);

        // Flag NOC code auto-mapping
        const finalNoc = getNocCodeForTeam(row.name) || row.noc;

        // Flag
        const flagObj = await createFabricFlagObject(finalNoc, {
          left: baseLeft + 70, top: currentY + 5, scaleX: 0.45, scaleY: 0.45
        });
        if (flagObj) objects.push(flagObj);

        // Team Name (without country code text, matching rule)
        const teamText = new fabric.Textbox(row.name.toUpperCase(), createProps('textbox', {
          left: baseLeft + 160, top: currentY + 8, fontSize: 20, fontWeight: '900', fontStyle: 'italic',
          fill: '#ffffff', width: 900, charSpacing: 20
        }));
        objects.push(teamText);

        // Cap indicator
        const capRect = new fabric.Rect({
          left: baseLeft + 1180, top: currentY + 6, width: 32, height: 26,
          fill: row.cap === 'white' ? '#ffffff' : '#0a2a5e',
          stroke: '#ffffff', strokeWidth: 1.5, skewX: -12, rx: 2, ry: 2
        });
        objects.push(capRect);

        currentY += rowHeight + 2;
      }
    }

    return new fabric.Group(objects, {
      left: baseLeft, top: baseTop,
      scaleX: 1.0, scaleY: 1.0,
      subTargetCheck: true,
      id: generateUniqueId({ type: 'waterPoloGroup' }),
      name: `WP003 Event Schedule (${normId})`,
      selectable: true, hasControls: true
    });
  }

  // ── WP004 - Match ID ──
  if (normId.includes('WP004') || normId === 'MATCH ID') {
    const isVariantB = normId.includes('_B') || normId.endsWith('B') || (customData.variant || '').toLowerCase() === 'b';
    const bannerWidth = 850;
    const tier1Height = 42;
    const tier2Height = 32;
    const rowHeight = 38;
    const totalHeight = tier1Height + tier2Height + 4 + (2 * rowHeight) + 2; // 156
    const baseLeft = 328;
    const baseTop = 966 - totalHeight; // 810

    const isGenericDummy = (customData.team1 || '').toUpperCase() === 'TOM DALEY' || (customData.teamA || '').toUpperCase() === 'TOM DALEY' || (customData.team1 || '').toUpperCase() === 'SPAIN' || (customData.teamA || '').toUpperCase() === 'CROATIA' || (!customData.team1 && !customData.teamA);

    const matchHeader = isGenericDummy ? (isVariantB ? 'GOLD MEDAL MATCH' : 'PRELIMINARY ROUND - GROUP A') : (customData.header || customData.event || 'PRELIMINARY ROUND - GROUP A');
    const team1Name = isGenericDummy ? (isVariantB ? 'HUNGARY' : 'SPAIN') : (customData.team1 || customData.teamA || 'SPAIN');
    const team2Name = isGenericDummy ? (isVariantB ? 'UNITED STATES' : 'CANADA') : (customData.team2 || customData.teamB || 'CANADA');

    // Auto-map NOC code directly based on team country name to ensure no mismatch
    const team1Noc = getNocCodeForTeam(team1Name) || (isGenericDummy ? (isVariantB ? 'HUN' : 'ESP') : (customData.noc1 || customData.nocA || 'ESP'));
    const team2Noc = getNocCodeForTeam(team2Name) || (isGenericDummy ? (isVariantB ? 'USA' : 'CAN') : (customData.noc2 || customData.nocB || 'CAN'));

    const team1Stats = isGenericDummy ? [7, 0, 1] : (customData.stats1 || customData.statsA || [0,0,0]);
    const team2Stats = isGenericDummy ? [5, 2, 0] : (customData.stats2 || customData.statsB || [0,0,0]);

    // Top tier
    const topGradient = new fabric.Gradient({
      type: 'linear', gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: bannerWidth, y2: 0 },
      colorStops: [
        { offset: 0, color: gradientStart },
        { offset: 0.5, color: gradientMid },
        { offset: 1, color: gradientEnd }
      ]
    });
    const topBar = new fabric.Rect(createProps('rect', {
      left: baseLeft, top: baseTop, width: bannerWidth, height: tier1Height,
      fill: topGradient, skewX: -12, rx: 4, ry: 4,
      stroke: borderHighlight, strokeWidth: 1,
      shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.6)', blur: 16, offsetX: 0, offsetY: 6 })
    }));
    objects.push(topBar);

    // Water Polo Logo
    const wave1 = new fabric.Path('M 15 80 Q 28 73, 40 80 T 65 80 T 90 80', { fill: '', stroke: '#ffffff', strokeWidth: 4.5, strokeLineCap: 'round', selectable: true });
    const wave2 = new fabric.Path('M 5 88 Q 23 83, 41 88 T 68 88 T 95 88', { fill: '', stroke: '#ffffff', strokeWidth: 3, strokeLineCap: 'round', selectable: true });
    const body = new fabric.Path('M 38 72 C 38 60, 48 55, 52 50 C 56 45, 52 35, 42 37', { fill: '', stroke: '#ffffff', strokeWidth: 6.5, strokeLineCap: 'round', selectable: true });
    const head = new fabric.Circle({ left: 37, top: 19, radius: 8, fill: '#ffffff', selectable: true });
    const arm = new fabric.Path('M 52 50 C 62 46, 68 38, 68 25', { fill: '', stroke: '#ffffff', strokeWidth: 5.5, strokeLineCap: 'round', selectable: true });
    const ball = new fabric.Circle({ left: 62, top: 8, radius: 6, fill: '#ffffff', selectable: true });
    const leftArm = new fabric.Path('M 32 62 C 22 65, 16 70, 16 76', { fill: '', stroke: '#ffffff', strokeWidth: 4.5, strokeLineCap: 'round', selectable: true });

    const waterPoloLogoGroup = new fabric.Group([wave1, wave2, body, head, arm, ball, leftArm], {
      left: baseLeft + 20, top: baseTop + 7, scaleX: 0.45, scaleY: 0.45,
      id: generateUniqueId({ type: 'waterPoloLogo' }),
      name: 'Water Polo Logo',
      selectable: true, hasControls: true
    });
    objects.push(waterPoloLogoGroup);

    const titleText = new fabric.Textbox("MEN'S WATER POLO", createProps('textbox', {
      left: baseLeft + 105, top: baseTop + 9, fontSize: 24, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: bannerWidth - 200, charSpacing: 90
    }));
    objects.push(titleText);

    const olympicRings = createOlympicRingsGroup(baseLeft + bannerWidth - 80, baseTop + 9, 10, 2);
    objects.push(olympicRings);

    // Second tier
    const t2Top = baseTop + tier1Height + 2;
    const botBar = new fabric.Rect(createProps('rect', {
      left: baseLeft + 17, top: t2Top, width: bannerWidth - 30, height: tier2Height,
      fill: new fabric.Gradient({
        type: 'linear', gradientUnits: 'pixels', coords: { x1: 0, y1: 0, x2: bannerWidth - 30, y2: 0 },
        colorStops: [{ offset: 0, color: '#c8d8ea' }, { offset: 0.5, color: '#dce8f5' }, { offset: 1, color: '#b8cce0' }]
      }),
      skewX: -12, rx: 3, ry: 3,
      stroke: 'rgba(0,0,0,0.15)', strokeWidth: 1
    }));
    objects.push(botBar);

    const headerText = new fabric.Textbox(matchHeader.toUpperCase(), createProps('textbox', {
      left: baseLeft + 30, top: t2Top + 6, fontSize: 18, fontWeight: '900', fontStyle: 'italic',
      fill: '#0a2a5e', width: 500, charSpacing: 20
    }));
    objects.push(headerText);

    // Variant B column headers W L D
    if (isVariantB) {
      const statsHeaders = ['W', 'L', 'D'];
      statsHeaders.forEach((sh, idx) => {
        const xPos = baseLeft + bannerWidth - 190 + idx * 50;
        const statText = new fabric.Textbox(sh, createProps('textbox', {
          left: xPos, top: t2Top + 6, fontSize: 18, fontWeight: '900', fontStyle: 'italic',
          fill: '#0a2a5e', width: 30, textAlign: 'center'
        }));
        objects.push(statText);
      });
    }

    // Rows
    const rowData = [
      { name: team1Name, noc: team1Noc, cap: 'white', stats: team1Stats },
      { name: team2Name, noc: team2Noc, cap: 'blue', stats: team2Stats }
    ];

    let currentY = t2Top + tier2Height + 2;

    for (let i = 0; i < rowData.length; i++) {
      const rd = rowData[i];
      const rowGrad = new fabric.Gradient({
        type: 'linear', gradientUnits: 'pixels', coords: { x1: 0, y1: 0, x2: bannerWidth - 30, y2: 0 },
        colorStops: [{ offset: 0, color: '#091d36' }, { offset: 0.5, color: '#0f2f57' }, { offset: 1, color: '#071629' }]
      });
      const rowRect = new fabric.Rect(createProps('rect', {
        left: baseLeft + 17, top: currentY, width: bannerWidth - 30, height: rowHeight,
        fill: rowGrad, skewX: -12, rx: 3, ry: 3, stroke: 'rgba(255,255,255,0.15)', strokeWidth: 1
      }));
      objects.push(rowRect);

      // Flag
      const flagObj = await createFabricFlagObject(rd.noc, {
        left: baseLeft + 30, top: currentY + 5, scaleX: 0.45, scaleY: 0.45
      });
      if (flagObj) objects.push(flagObj);

      // Name (no NOC code text, gap of ~35px)
      const nameTxt = new fabric.Textbox(rd.name.toUpperCase(), createProps('textbox', {
        left: baseLeft + 150, top: currentY + 7, fontSize: 20, fontWeight: '900', fontStyle: 'italic',
        fill: '#ffffff', width: 450, charSpacing: 20
      }));
      objects.push(nameTxt);

      // Stats for Variant B
      if (isVariantB) {
        rd.stats.forEach((stVal, idx) => {
          const xPos = baseLeft + bannerWidth - 190 + idx * 50;
          const valTxt = new fabric.Textbox(String(stVal), createProps('textbox', {
            left: xPos, top: currentY + 7, fontSize: 20, fontWeight: '900', fontStyle: 'italic',
            fill: '#ffffff', width: 30, textAlign: 'center'
          }));
          objects.push(valTxt);
        });
      }

      // Cap color box
      const capColorRect = new fabric.Rect({
        left: baseLeft + bannerWidth - 45, top: currentY + 6, width: 32, height: 26,
        fill: rd.cap === 'white' ? '#ffffff' : '#0a2a5e',
        stroke: '#ffffff', strokeWidth: 1.5, skewX: -12, rx: 2, ry: 2
      });
      objects.push(capColorRect);

      currentY += rowHeight + 2;
    }

    return new fabric.Group(objects, {
      left: baseLeft, top: baseTop,
      scaleX: 1.0, scaleY: 1.0,
      subTargetCheck: true,
      id: generateUniqueId({ type: 'waterPoloGroup' }),
      name: `WP004 Match ID (${normId})`,
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
          .rings-wrapper { position: absolute; right: 25px; top: 12px; z-index: 2; }
          
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

  // ── WP003 - Event Schedule ──
  if (normId.includes('WP003') || normId === 'EVENT SCHEDULE') {
    const baseTop = 966 - 314; // 652

    const rows = customData.rows || [
      { type: 'header', text: 'BRONZE MEDAL MATCH' },
      { type: 'team', name: 'MONTENEGRO', noc: 'MNE', cap: 'white' },
      { type: 'team', name: 'SERBIA', noc: 'SRB', cap: 'blue' },
      { type: 'header', text: 'GOLD MEDAL MATCH' },
      { type: 'team', name: 'HUNGARY', noc: 'HUN', cap: 'white' },
      { type: 'team', name: 'UNITED STATES', noc: 'USA', cap: 'blue' }
    ];

    const rowsHTML = rows.map((row) => {
      if (row.type === 'header') {
        return `
          <div class="header-row">
            <div class="header-text unskew">${row.text}</div>
          </div>
        `;
      } else {
        const finalNoc = getNocCodeForTeam(row.name) || row.noc;
        const flagHtml = getFlagImgHtml(finalNoc, 'height: 24px; width: auto; border-radius: 2px; transform: skewX(-12deg);');
        return `
          <div class="team-row">
            <div class="flag-wrap unskew" style="margin-left: 20px; margin-right: 48px;">${flagHtml}</div>
            <div class="team-name unskew">${row.name}</div>
            <div class="cap-indicator unskew ${row.cap}"></div>
          </div>
        `;
      }
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

          .schedule-banner { position: absolute; top: ${baseTop}px; left: 328px; display: flex; flex-direction: column; gap: 2px; }
          .tier-1 {
            height: 54px; width: 1260px;
            background: linear-gradient(135deg, ${gradientStart} 0%, ${primaryColor} 60%, ${gradientEnd} 100%);
            border: 1.5px solid rgba(255,255,255,0.35); border-radius: 6px;
            transform: skewX(-12deg); display: flex; align-items: center; justify-content: space-between;
            padding: 0 24px 0 0; box-shadow: 0 10px 24px rgba(0,0,0,0.6); overflow: hidden;
          }
          .unskew { transform: skewX(12deg); }
          .t1-left { display: flex; align-items: center; gap: 14px; }
          .water-polo-logo {
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
          .header-row {
            height: 32px; width: 1210px;
            background: linear-gradient(135deg, #051224 0%, #0c223c 100%);
            border: 1px solid rgba(255,255,255,0.2); border-radius: 2px;
            transform: skewX(-12deg); display: flex; align-items: center; padding-left: 33px;
          }
          .header-text { font-size: 18px; font-weight: 900; font-style: italic; color: #ffffff; letter-spacing: 1px; }

          .team-row {
            height: 38px; width: 1210px;
            background: linear-gradient(135deg, #091d36 0%, #0f2f57 50%, #071629 100%);
            border: 1px solid rgba(255,255,255,0.15); border-radius: 3px;
            transform: skewX(-12deg); display: flex; align-items: center; padding-left: 4px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.5); justify-content: space-between;
            padding-right: 35px;
          }
          .flag-wrap { display: flex; align-items: center; }
          .team-name { font-size: 20px; font-weight: 900; font-style: italic; color: #ffffff; letter-spacing: 1px; flex-grow: 1; text-align: left; }
          .cap-indicator {
            width: 32px; height: 26px; border-radius: 2px; border: 1.5px solid #ffffff;
          }
          .cap-indicator.white { background: #ffffff; }
          .cap-indicator.blue { background: #0a2a5e; }
        </style>
      </head>
      <body>
        <div class="schedule-banner">
          <div class="tier-1">
            <div class="t1-left unskew">
              <div class="water-polo-logo">${officialWaterPoloPictographSVG}</div>
              <div class="t1-title">MEN'S WATER POLO</div>
            </div>
            <div class="unskew">${olympicRingsSVG}</div>
          </div>
          <div class="tier-2">
            <div class="t2-text unskew">${subVenueStr}</div>
          </div>
          <div class="rows-container">
            ${rowsHTML}
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ── WP004 - Match ID ──
  if (normId.includes('WP004') || normId === 'MATCH ID') {
    const isVariantB = normId.includes('_B') || normId.endsWith('B') || (customData.variant || '').toLowerCase() === 'b';
    const tier1Height = 42;
    const tier2Height = 32;
    const rowHeight = 38;
    const totalHeight = tier1Height + tier2Height + 4 + (2 * rowHeight) + 2; // 156
    const baseTop = 966 - totalHeight; // 810

    const isGenericDummy = (customData.team1 || '').toUpperCase() === 'TOM DALEY' || (customData.teamA || '').toUpperCase() === 'TOM DALEY' || (customData.team1 || '').toUpperCase() === 'SPAIN' || (customData.teamA || '').toUpperCase() === 'CROATIA' || (!customData.team1 && !customData.teamA);

    const matchHeader = isGenericDummy ? (isVariantB ? 'GOLD MEDAL MATCH' : 'PRELIMINARY ROUND - GROUP A') : (customData.header || customData.event || 'PRELIMINARY ROUND - GROUP A');
    const team1Name = isGenericDummy ? (isVariantB ? 'HUNGARY' : 'SPAIN') : (customData.team1 || customData.teamA || 'SPAIN');
    const team2Name = isGenericDummy ? (isVariantB ? 'UNITED STATES' : 'CANADA') : (customData.team2 || customData.teamB || 'CANADA');

    // Auto-map NOC code directly based on team country name to ensure no mismatch
    const team1Noc = getNocCodeForTeam(team1Name) || (isGenericDummy ? (isVariantB ? 'HUN' : 'ESP') : (customData.noc1 || customData.nocA || 'ESP'));
    const team2Noc = getNocCodeForTeam(team2Name) || (isGenericDummy ? (isVariantB ? 'USA' : 'CAN') : (customData.noc2 || customData.nocB || 'CAN'));

    const team1Stats = isGenericDummy ? [7, 0, 1] : (customData.stats1 || customData.statsA || [0,0,0]);
    const team2Stats = isGenericDummy ? [5, 2, 0] : (customData.stats2 || customData.statsB || [0,0,0]);

    const flag1Html = getFlagImgHtml(team1Noc, 'height: 28px; width: auto; border-radius: 2px; transform: skewX(-12deg);');
    const flag2Html = getFlagImgHtml(team2Noc, 'height: 28px; width: auto; border-radius: 2px; transform: skewX(-12deg);');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,700;1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .match-banner { position: absolute; top: ${baseTop}px; left: 328px; display: flex; flex-direction: column; gap: 2px; }
          .tier-1 {
            height: 42px; width: 850px;
            background: linear-gradient(135deg, ${gradientStart} 0%, ${primaryColor} 60%, ${gradientEnd} 100%);
            border: 1px solid rgba(255,255,255,0.35); border-radius: 4px;
            transform: skewX(-12deg); display: flex; align-items: center; justify-content: space-between;
            padding: 0 16px 0 0; box-shadow: 0 6px 16px rgba(0,0,0,0.6); overflow: hidden;
          }
          .unskew { transform: skewX(12deg); }
          .t1-left { display: flex; align-items: center; padding-left: 20px; }
          .water-polo-logo { position: absolute; left: 20px; top: 2px; }
          .t1-title { font-size: 24px; font-weight: 900; font-style: italic; color: #ffffff; letter-spacing: 1px; padding-left: 60px; white-space: nowrap; }
          
          .tier-2 {
            height: 32px; width: 820px; margin-left: 17px; margin-top: 2px;
            background: linear-gradient(135deg, #c8d8ea 0%, #dce8f5 50%, #b8cce0 100%);
            border: 1px solid rgba(255,255,255,0.2); border-radius: 3px;
            transform: skewX(-12deg); display: flex; align-items: center; justify-content: space-between;
            padding: 0 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.5);
          }
          .t2-title { font-size: 18px; font-weight: 900; font-style: italic; color: #0a2a5e; letter-spacing: 2px; padding-left: 10px; white-space: nowrap; }
          .t2-stats-headers { display: flex; gap: 20px; padding-right: 48px; }
          .t2-sh { font-size: 18px; font-weight: 900; font-style: italic; color: #0a2a5e; width: 30px; text-align: center; }

          .rows-container { display: flex; flex-direction: column; gap: 2px; margin-left: 17px; }
          .team-row {
            height: 38px; width: 820px;
            background: linear-gradient(135deg, #091d36 0%, #0f2f57 50%, #071629 100%);
            border: 1px solid rgba(255,255,255,0.15); border-radius: 3px;
            transform: skewX(-12deg); display: flex; align-items: center; justify-content: space-between;
            padding: 0 12px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.5);
          }
          .row-left { display: flex; align-items: center; }
          .flag-wrap { display: flex; align-items: center; margin-right: 48px; }
          .team-name { font-size: 20px; font-weight: 900; font-style: italic; color: #ffffff; letter-spacing: 1px; white-space: nowrap; }
          
          .row-right { display: flex; align-items: center; }
          .stats-values { display: flex; gap: 20px; margin-right: 20px; }
          .stat-val { font-size: 20px; font-weight: 900; font-style: italic; color: #ffffff; width: 30px; text-align: center; }

          .cap-indicator {
            width: 32px; height: 26px; border-radius: 2px; border: 1.5px solid #ffffff;
          }
          .cap-indicator.white { background: #ffffff; }
          .cap-indicator.blue { background: #0a2a5e; }
        </style>
      </head>
      <body>
        <div class="match-banner">
          <div class="tier-1">
            <div class="t1-left unskew">
              <div class="water-polo-logo">${officialWaterPoloPictographSVG}</div>
              <div class="t1-title">MEN'S WATER POLO</div>
            </div>
            <div class="unskew">${olympicRingsSVG}</div>
          </div>
          
          <div class="tier-2">
            <div class="t2-title unskew">${matchHeader}</div>
            ${isVariantB ? `
              <div class="t2-stats-headers unskew">
                <div class="t2-sh">W</div>
                <div class="t2-sh">L</div>
                <div class="t2-sh">D</div>
              </div>
            ` : ''}
          </div>

          <div class="rows-container">
            <div class="team-row">
              <div class="row-left unskew">
                <div class="flag-wrap">${flag1Html}</div>
                <div class="team-name">${team1Name}</div>
              </div>
              <div class="row-right unskew">
                ${isVariantB ? `
                  <div class="stats-values">
                    <div class="stat-val">${team1Stats[0]}</div>
                    <div class="stat-val">${team1Stats[1]}</div>
                    <div class="stat-val">${team1Stats[2]}</div>
                  </div>
                ` : ''}
                <div class="cap-indicator white"></div>
              </div>
            </div>

            <div class="team-row">
              <div class="row-left unskew">
                <div class="flag-wrap">${flag2Html}</div>
                <div class="team-name">${team2Name}</div>
              </div>
              <div class="row-right unskew">
                ${isVariantB ? `
                  <div class="stats-values">
                    <div class="stat-val">${team2Stats[0]}</div>
                    <div class="stat-val">${team2Stats[1]}</div>
                    <div class="stat-val">${team2Stats[2]}</div>
                  </div>
                ` : ''}
                <div class="cap-indicator blue"></div>
              </div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  return '';
}
