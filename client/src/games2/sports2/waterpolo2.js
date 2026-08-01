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

    // Event title font size: 30px (matching DV015 header style)
    const titleText = new fabric.Textbox(venueStr, createProps('textbox', {
      left: baseLeft + 155, top: baseTop + 10, fontSize: 30, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: 610, charSpacing: 90
    }));
    objects.push(titleText);

    // Sub-bar height: 38px (matching DV015 sub-header style)
    const subBarPathData = 'M 28 0 L 778 0 L 778 38 L 0 38 Z';
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
      left: baseLeft + 110, top: baseTop + 53,
      fill: subBarGradient, stroke: 'rgba(0,34,62,0.4)', strokeWidth: 1.2
    }));
    objects.push(subBar);

    // Sub-title font size: 22px (matching DV015 style)
    const subTitleText = new fabric.Textbox(subVenueStr, createProps('textbox', {
      left: baseLeft + 155, top: baseTop + 60, fontSize: 22, fontWeight: '900', fontStyle: 'italic',
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
    const baseTop = 966 - 328; // 638 (54px tier1 + 38px tier2 + gaps & rows)

    const tier1Height = 54;
    const tier2Height = 38; // 38px matching DV015

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

    // Title text font size: 30px (matching DV015 style)
    const titleText = new fabric.Textbox("MEN'S WATER POLO", createProps('textbox', {
      left: baseLeft + 155, top: baseTop + 10, fontSize: 30, fontWeight: '900', fontStyle: 'italic',
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

    // Sub-title font size: 22px (matching DV015 style)
    const subTitleText = new fabric.Textbox("AQUATICS CENTRE - WATER POLO ARENA", createProps('textbox', {
      left: baseLeft + 140, top: t2Top + 7, fontSize: 22, fontWeight: '900', fontStyle: 'italic',
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

    let currentY = t2Top + tier2Height + 3; // 3px gap matching DV015 rowGap

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

        currentY += rowHeight + 3;
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

        // Team Name font size: 24px (matching DV015 style)
        const teamText = new fabric.Textbox(row.name.toUpperCase(), createProps('textbox', {
          left: baseLeft + 160, top: currentY + 7, fontSize: 24, fontWeight: '900', fontStyle: 'italic',
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

        currentY += rowHeight + 3;
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
    const baseLeft = 328;
    const baseTop = 966 - 176; // 790 (95px gun body + 3px gap + 2 rows of 38px with 3px gap)

    const isGenericDummy = (customData.team1 || '').toUpperCase() === 'TOM DALEY' || (customData.teamA || '').toUpperCase() === 'TOM DALEY' || (customData.team1 || '').toUpperCase() === 'SPAIN' || (customData.teamA || '').toUpperCase() === 'CROATIA' || (!customData.team1 && !customData.teamA);

    const matchHeader = isGenericDummy ? (isVariantB ? 'GOLD MEDAL MATCH' : 'PRELIMINARY ROUND - GROUP A') : (customData.header || customData.event || 'PRELIMINARY ROUND - GROUP A');
    const team1Name = isGenericDummy ? (isVariantB ? 'HUNGARY' : 'SPAIN') : (customData.team1 || customData.teamA || 'SPAIN');
    const team2Name = isGenericDummy ? (isVariantB ? 'UNITED STATES' : 'CANADA') : (customData.team2 || customData.teamB || 'CANADA');

    // Auto-map NOC code directly based on team country name to ensure no mismatch
    const team1Noc = getNocCodeForTeam(team1Name) || (isGenericDummy ? (isVariantB ? 'HUN' : 'ESP') : (customData.noc1 || customData.nocA || 'ESP'));
    const team2Noc = getNocCodeForTeam(team2Name) || (isGenericDummy ? (isVariantB ? 'USA' : 'CAN') : (customData.noc2 || customData.nocB || 'CAN'));

    const team1Stats = isGenericDummy ? [7, 0, 1] : (customData.stats1 || customData.statsA || [0,0,0]);
    const team2Stats = isGenericDummy ? [5, 2, 0] : (customData.stats2 || customData.statsB || [0,0,0]);

    // Gun body header
    const gunPathData = 'M 45 0 L 820 0 C 825 0, 830 3, 832 8 L 848 44 C 850 49, 847 54, 842 54 L 140 54 L 115 88 C 112 92, 106 95, 100 95 L 10 95 C 4 95, 0 90, 2 84 L 22 42 L 35 6 C 37 2, 41 0, 45 0 Z';
    const gunGradient = new fabric.Gradient({
      type: 'linear', gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: bannerWidth, y2: 0 },
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

    // Event title font size: 30px (matching DV015 style)
    const titleText = new fabric.Textbox("MEN'S WATER POLO", createProps('textbox', {
      left: baseLeft + 155, top: baseTop + 10, fontSize: 30, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: 610, charSpacing: 90
    }));
    objects.push(titleText);

    const olympicRings = createOlympicRingsGroup(baseLeft + bannerWidth - 85, baseTop + 14, 9, 2.2);
    objects.push(olympicRings);

    // Sub-header (silver strip, height 38px matching DV015 style)
    const subBarPathData = 'M 28 0 L 738 0 L 738 38 L 0 38 Z';
    const subBarGradient = new fabric.Gradient({
      type: 'linear', gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: 738, y2: 0 },
      colorStops: [
        { offset: 0, color: '#d1d5db' },
        { offset: 0.5, color: '#ffffff' },
        { offset: 1, color: '#e2e8f0' }
      ]
    });
    const subBar = new fabric.Path(subBarPathData, createProps('path', {
      left: baseLeft + 110, top: baseTop + 53,
      fill: subBarGradient, stroke: 'rgba(0,34,62,0.4)', strokeWidth: 1.2
    }));
    objects.push(subBar);

    // Sub-title font size: 22px (matching DV015 style)
    const headerText = new fabric.Textbox(matchHeader.toUpperCase(), createProps('textbox', {
      left: baseLeft + 155, top: baseTop + 60, fontSize: 22, fontWeight: '900', fontStyle: 'italic',
      fill: '#0a2a5e', width: 500, charSpacing: 20
    }));
    objects.push(headerText);

    // Variant B column headers W L D (font size 18px)
    if (isVariantB) {
      const statsHeaders = ['W', 'L', 'D'];
      statsHeaders.forEach((sh, idx) => {
        const xPos = baseLeft + bannerWidth - 190 + idx * 50;
        const statText = new fabric.Textbox(sh, createProps('textbox', {
          left: xPos, top: baseTop + 60, fontSize: 18, fontWeight: '900', fontStyle: 'italic',
          fill: '#0a2a5e', width: 30, textAlign: 'center'
        }));
        objects.push(statText);
      });
    }

    // Rows start below the gun shape (at Y = baseTop + 97)
    const rowData = [
      { name: team1Name, noc: team1Noc, cap: 'white', stats: team1Stats },
      { name: team2Name, noc: team2Noc, cap: 'blue', stats: team2Stats }
    ];

    let currentY = baseTop + 97;

    for (let i = 0; i < rowData.length; i++) {
      const rd = rowData[i];
      const rowGrad = new fabric.Gradient({
        type: 'linear', gradientUnits: 'pixels', coords: { x1: 0, y1: 0, x2: bannerWidth - 30, y2: 0 },
        colorStops: [{ offset: 0, color: '#091d36' }, { offset: 0.5, color: '#0f2f57' }, { offset: 1, color: '#071629' }]
      });
      const rowRect = new fabric.Rect(createProps('rect', {
        left: baseLeft + 17, top: currentY, width: bannerWidth - 30, height: 38,
        fill: rowGrad, skewX: -12, rx: 3, ry: 3, stroke: 'rgba(255,255,255,0.15)', strokeWidth: 1
      }));
      objects.push(rowRect);

      // Flag
      const flagObj = await createFabricFlagObject(rd.noc, {
        left: baseLeft + 30, top: currentY + 5, scaleX: 0.45, scaleY: 0.45
      });
      if (flagObj) objects.push(flagObj);

      // Team Name font size: 24px (matching DV015 style)
      const nameTxt = new fabric.Textbox(rd.name.toUpperCase(), createProps('textbox', {
        left: baseLeft + 150, top: currentY + 7, fontSize: 24, fontWeight: '900', fontStyle: 'italic',
        fill: '#ffffff', width: 450, charSpacing: 20
      }));
      objects.push(nameTxt);

      // Stats for Variant B (font size 24px)
      if (isVariantB) {
        rd.stats.forEach((stVal, idx) => {
          const xPos = baseLeft + bannerWidth - 190 + idx * 50;
          const valTxt = new fabric.Textbox(String(stVal), createProps('textbox', {
            left: xPos, top: currentY + 7, fontSize: 24, fontWeight: '900', fontStyle: 'italic',
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

      currentY += 38 + 3; // 3px gap matching DV015 rowGap
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

  // ── WP005 - Group List ──
  if (normId.includes('WP005') || normId === 'GROUP LIST') {
    const bannerWidth = 850;
    const baseLeft = 328;
    const baseTop = 966 - 340; // 626 (95px gun body + 3px gap + 6 rows of 38px with 3px gaps)

    // Gun body header
    const gunPathData = 'M 45 0 L 820 0 C 825 0, 830 3, 832 8 L 848 44 C 850 49, 847 54, 842 54 L 140 54 L 115 88 C 112 92, 106 95, 100 95 L 10 95 C 4 95, 0 90, 2 84 L 22 42 L 35 6 C 37 2, 41 0, 45 0 Z';
    const gunGradient = new fabric.Gradient({
      type: 'linear', gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: bannerWidth, y2: 0 },
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

    // Event title font size: 30px (matching DV015 style)
    const titleText = new fabric.Textbox("MEN'S WATER POLO", createProps('textbox', {
      left: baseLeft + 155, top: baseTop + 10, fontSize: 30, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: 610, charSpacing: 90
    }));
    objects.push(titleText);

    const olympicRings = createOlympicRingsGroup(baseLeft + bannerWidth - 85, baseTop + 14, 9, 2.2);
    objects.push(olympicRings);

    // Sub-header (silver strip, height 38px matching DV015 style)
    const subBarPathData = 'M 28 0 L 738 0 L 738 38 L 0 38 Z';
    const subBarGradient = new fabric.Gradient({
      type: 'linear', gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: 738, y2: 0 },
      colorStops: [
        { offset: 0, color: '#d1d5db' },
        { offset: 0.5, color: '#ffffff' },
        { offset: 1, color: '#e2e8f0' }
      ]
    });
    const subBar = new fabric.Path(subBarPathData, createProps('path', {
      left: baseLeft + 110, top: baseTop + 53,
      fill: subBarGradient, stroke: 'rgba(0,34,62,0.4)', strokeWidth: 1.2
    }));
    objects.push(subBar);

    // Sub-title font size: 22px (matching DV015 style)
    const headerText = new fabric.Textbox((customData.header || customData.event || 'GROUP A').toUpperCase(), createProps('textbox', {
      left: baseLeft + 155, top: baseTop + 60, fontSize: 22, fontWeight: '900', fontStyle: 'italic',
      fill: '#0a2a5e', width: 500, charSpacing: 20
    }));
    objects.push(headerText);

    // Rows start below the gun shape (at Y = baseTop + 97)
    const teams = customData.rows || [
      { name: 'AUSTRALIA', noc: 'AUS' },
      { name: 'CANADA', noc: 'CAN' },
      { name: 'SPAIN', noc: 'ESP' },
      { name: 'GREECE', noc: 'GRE' },
      { name: 'HUNGARY', noc: 'HUN' },
      { name: 'MONTENEGRO', noc: 'MNE' }
    ];

    let currentY = baseTop + 97;

    for (let i = 0; i < teams.length; i++) {
      const t = teams[i];
      const rowGrad = new fabric.Gradient({
        type: 'linear', gradientUnits: 'pixels', coords: { x1: 0, y1: 0, x2: bannerWidth - 30, y2: 0 },
        colorStops: [{ offset: 0, color: '#091d36' }, { offset: 0.5, color: '#0f2f57' }, { offset: 1, color: '#071629' }]
      });
      const rowRect = new fabric.Rect(createProps('rect', {
        left: baseLeft + 17, top: currentY, width: bannerWidth - 30, height: 38,
        fill: rowGrad, skewX: -12, rx: 3, ry: 3, stroke: 'rgba(255,255,255,0.15)', strokeWidth: 1
      }));
      objects.push(rowRect);

      // Auto-map NOC code based on team country name
      const rowNoc = getNocCodeForTeam(t.name) || t.noc;

      // Flag
      const flagObj = await createFabricFlagObject(rowNoc, {
        left: baseLeft + 30, top: currentY + 5, scaleX: 0.45, scaleY: 0.45
      });
      if (flagObj) objects.push(flagObj);

      // Team Name font size: 24px (matching DV015 style)
      const nameTxt = new fabric.Textbox(t.name.toUpperCase(), createProps('textbox', {
        left: baseLeft + 150, top: currentY + 7, fontSize: 24, fontWeight: '900', fontStyle: 'italic',
        fill: '#ffffff', width: 620, charSpacing: 20
      }));
      objects.push(nameTxt);

      currentY += 38 + 3; // 3px gap matching DV015 rowGap
    }

    return new fabric.Group(objects, {
      left: 328, top: 513,
      scaleX: 1.331, scaleY: 1.331,
      subTargetCheck: true,
      id: generateUniqueId({ type: 'waterPoloGroup' }),
      name: `WP005 Group List (${normId})`,
      selectable: true, hasControls: true
    });
  }

  // ── WP006 - Standings ──
  if (normId.includes('WP006') || normId === 'STANDINGS') {
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

    if (variantStr.includes('_b') || variantStr.endsWith('b') || variantStr.includes('variant b')) variant = 'b';
    else if (variantStr.includes('_c') || variantStr.endsWith('c') || variantStr.includes('variant c')) variant = 'c';
    else if (variantStr.includes('_a') || variantStr.endsWith('a') || variantStr.includes('variant a')) variant = 'a';

    const bannerWidth = 850;
    const baseLeft = 328;
    const baseTop = 966 - 340; // 626 (95px gun body + 3px gap + 6 rows of 38px with 3px gaps)

    // Gun body header
    const gunPathData = 'M 45 0 L 820 0 C 825 0, 830 3, 832 8 L 848 44 C 850 49, 847 54, 842 54 L 140 54 L 115 88 C 112 92, 106 95, 100 95 L 10 95 C 4 95, 0 90, 2 84 L 22 42 L 35 6 C 37 2, 41 0, 45 0 Z';
    const gunGradient = new fabric.Gradient({
      type: 'linear', gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: bannerWidth, y2: 0 },
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

    // Event title font size: 30px (matching DV015 style)
    const titleText = new fabric.Textbox("MEN'S WATER POLO", createProps('textbox', {
      left: baseLeft + 155, top: baseTop + 10, fontSize: 30, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: 610, charSpacing: 90
    }));
    objects.push(titleText);

    const olympicRings = createOlympicRingsGroup(baseLeft + bannerWidth - 85, baseTop + 14, 9, 2.2);
    objects.push(olympicRings);

    // Sub-header (silver strip, height 38px matching DV015 style)
    const subBarPathData = 'M 28 0 L 738 0 L 738 38 L 0 38 Z';
    const subBarGradient = new fabric.Gradient({
      type: 'linear', gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: 738, y2: 0 },
      colorStops: [
        { offset: 0, color: '#d1d5db' },
        { offset: 0.5, color: '#ffffff' },
        { offset: 1, color: '#e2e8f0' }
      ]
    });
    const subBar = new fabric.Path(subBarPathData, createProps('path', {
      left: baseLeft + 110, top: baseTop + 53,
      fill: subBarGradient, stroke: 'rgba(0,34,62,0.4)', strokeWidth: 1.2
    }));
    objects.push(subBar);

    const defaultHeader = variant === 'c' ? 'STANDINGS - GROUP B' : 'STANDINGS - GROUP A';
    const headerText = new fabric.Textbox((customData.header || customData.event || defaultHeader).toUpperCase(), createProps('textbox', {
      left: baseLeft + 155, top: baseTop + 60, fontSize: 22, fontWeight: '900', fontStyle: 'italic',
      fill: '#0a2a5e', width: 450, charSpacing: 20
    }));
    objects.push(headerText);

    // Column headers W L T PTS
    const statsHeaders = ['W', 'L', 'T', 'PTS'];
    statsHeaders.forEach((sh, idx) => {
      const xPos = baseLeft + bannerWidth - 220 + idx * 48;
      const statText = new fabric.Textbox(sh, createProps('textbox', {
        left: xPos, top: baseTop + 60, fontSize: 18, fontWeight: '900', fontStyle: 'italic',
        fill: '#0a2a5e', width: 32, textAlign: 'center'
      }));
      objects.push(statText);
    });

    // Default rows
    let defaultRows = [];
    if (variant === 'a') {
      defaultRows = [
        { rank: '1', name: 'HUNGARY', noc: 'HUN', q: '', stats: [3, 0, 0, 6] },
        { rank: '2', name: 'SPAIN', noc: 'ESP', q: '', stats: [3, 0, 0, 6] },
        { rank: '3', name: 'MONTENEGRO', noc: 'MNE', q: '', stats: [2, 1, 0, 4] },
        { rank: '4', name: 'AUSTRALIA', noc: 'AUS', q: '', stats: [2, 1, 0, 4] },
        { rank: '5', name: 'GREECE', noc: 'GRE', q: '', stats: [0, 3, 0, 0] },
        { rank: '6', name: 'CANADA', noc: 'CAN', q: '', stats: [0, 3, 0, 0] }
      ];
    } else if (variant === 'b') {
      defaultRows = [
        { rank: '1', name: 'HUNGARY', noc: 'HUN', q: 'Q', stats: [4, 0, 1, 9] },
        { rank: '2', name: 'SPAIN', noc: 'ESP', q: 'Q', stats: [4, 1, 0, 8] },
        { rank: '3', name: 'MONTENEGRO', noc: 'MNE', q: 'Q', stats: [2, 1, 2, 6] },
        { rank: '4', name: 'AUSTRALIA', noc: 'AUS', q: 'Q', stats: [2, 2, 1, 5] },
        { rank: '5', name: 'GREECE', noc: 'GRE', q: '', stats: [1, 4, 0, 2] },
        { rank: '6', name: 'CANADA', noc: 'CAN', q: '', stats: [0, 5, 0, 0] }
      ];
    } else if (variant === 'c') {
      defaultRows = [
        { rank: '1', name: 'UNITED STATES', noc: 'USA', q: 'Q', stats: [4, 1, 0, 8] },
        { rank: '2', name: 'CROATIA', noc: 'CRO', q: 'Q', stats: [4, 1, 0, 8] },
        { rank: '3', name: 'SERBIA', noc: 'SRB', q: 'Q', stats: [3, 2, 0, 6] },
        { rank: '4', name: 'GERMANY', noc: 'GER', q: 'Q', stats: [2, 3, 0, 4] },
        { rank: '5', name: 'ITALY', noc: 'ITA', q: '', stats: [2, 3, 0, 4] },
        { rank: '', name: 'CHINA', noc: 'CHN', q: '', dsq: true }
      ];
    }

    const inputRows = (customData.rows && customData.rows.length > 0)
      ? customData.rows
      : (customData.standings && customData.standings.length > 0)
      ? customData.standings
      : null;

    // Detect unedited default category variables (e.g. CROATIA default score row) and bypass
    const isGenericInputRows = inputRows && inputRows.length <= 5 &&
      inputRows.some(r => (r.name || '').toUpperCase().includes('CROATIA'));

    const finalRows = (!inputRows || isGenericInputRows) ? defaultRows : inputRows;
    const rowsList = finalRows.slice(0, 6);

    let currentY = baseTop + 97;

    for (let i = 0; i < rowsList.length; i++) {
      const rd = rowsList[i];
      const rowGrad = new fabric.Gradient({
        type: 'linear', gradientUnits: 'pixels', coords: { x1: 0, y1: 0, x2: bannerWidth - 30, y2: 0 },
        colorStops: [{ offset: 0, color: '#091d36' }, { offset: 0.5, color: '#0f2f57' }, { offset: 1, color: '#071629' }]
      });
      const rowRect = new fabric.Rect(createProps('rect', {
        left: baseLeft + 17, top: currentY, width: bannerWidth - 30, height: 38,
        fill: rowGrad, skewX: -12, rx: 3, ry: 3, stroke: 'rgba(255,255,255,0.15)', strokeWidth: 1
      }));
      objects.push(rowRect);

      // Rank Badge
      if (rd.rank) {
        const rankBadge = new fabric.Rect(createProps('rect', {
          left: baseLeft + 30, top: currentY + 5, width: 28, height: 28,
          fill: '#d32f2f', skewX: -12, rx: 2, ry: 2
        }));
        const rankText = new fabric.Textbox(String(rd.rank), createProps('textbox', {
          left: baseLeft + 30, top: currentY + 8, fontSize: 20, fontWeight: '900', fontStyle: 'italic',
          fill: '#ffffff', width: 28, textAlign: 'center'
        }));
        objects.push(rankBadge, rankText);
      }

      // Flag
      const rowNoc = getNocCodeForTeam(rd.name) || rd.noc;
      const flagObj = await createFabricFlagObject(rowNoc, {
        left: baseLeft + (rd.rank ? 68 : 30), top: currentY + 5, scaleX: 0.45, scaleY: 0.45
      });
      if (flagObj) objects.push(flagObj);

      // Name (gap of ~48px visually, dynamic start matching rank)
      const nameTxt = new fabric.Textbox(rd.name.toUpperCase(), createProps('textbox', {
        left: baseLeft + (rd.rank ? 175 : 135), top: currentY + 7, fontSize: 24, fontWeight: '900', fontStyle: 'italic',
        fill: '#ffffff', width: 300, charSpacing: 20
      }));
      objects.push(nameTxt);

      // DSQ or Stats / Q Badge
      if (rd.dsq) {
        // DSQ box (white badge spanning stats columns)
        const dsqBadge = new fabric.Rect(createProps('rect', {
          left: baseLeft + bannerWidth - 220, top: currentY + 5, width: 176, height: 28,
          fill: '#ffffff', skewX: -12, rx: 2, ry: 2
        }));
        const dsqText = new fabric.Textbox('DSQ', createProps('textbox', {
          left: baseLeft + bannerWidth - 220, top: currentY + 8, fontSize: 20, fontWeight: '900', fontStyle: 'italic',
          fill: '#091d36', width: 176, textAlign: 'center'
        }));
        objects.push(dsqBadge, dsqText);
      } else {
        // Q Badge (if present)
        if (rd.q === 'Q') {
          const qBadge = new fabric.Rect(createProps('rect', {
            left: baseLeft + bannerWidth - 265, top: currentY + 5, width: 28, height: 28,
            fill: '#2e7d32', skewX: -12, rx: 2, ry: 2
          }));
          const qText = new fabric.Textbox('Q', createProps('textbox', {
            left: baseLeft + bannerWidth - 265, top: currentY + 8, fontSize: 18, fontWeight: '900', fontStyle: 'italic',
            fill: '#ffffff', width: 28, textAlign: 'center'
          }));
          objects.push(qBadge, qText);
        }

        // Stats values W L T PTS (font size 24px)
        const stats = rd.stats || [0, 0, 0, 0];
        stats.forEach((stVal, idx) => {
          const xPos = baseLeft + bannerWidth - 220 + idx * 48;
          const valTxt = new fabric.Textbox(String(stVal), createProps('textbox', {
            left: xPos, top: currentY + 7, fontSize: 24, fontWeight: '900', fontStyle: 'italic',
            fill: '#ffffff', width: 32, textAlign: 'center'
          }));
          objects.push(valTxt);
        });
      }

      currentY += 38 + 3; // 3px gap matching DV015 rowGap
    }

    return new fabric.Group(objects, {
      left: 328, top: 514,
      scaleX: 1.328, scaleY: 1.328,
      subTargetCheck: true,
      id: generateUniqueId({ type: 'waterPoloGroup' }),
      name: `WP006 Standings (${normId})`,
      selectable: true, hasControls: true
    });
  }

  // ── WP007 - Team ID ──
  if (normId.includes('WP007') || normId === 'TEAM ID') {
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

    if (variantStr.includes('_b') || variantStr.endsWith('b') || variantStr.includes('variant b')) variant = 'b';
    else if (variantStr.includes('_a') || variantStr.endsWith('a') || variantStr.includes('variant a')) variant = 'a';

    const bannerWidth = 850;
    const baseLeft = 328;
    const baseTop = 966 - 54; // 912

    // Background bar
    const barGradient = new fabric.Gradient({
      type: 'linear', gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: bannerWidth, y2: 0 },
      colorStops: [
        { offset: 0, color: gradientStart },
        { offset: 0.5, color: gradientMid },
        { offset: 1, color: gradientEnd }
      ]
    });
    const mainBar = new fabric.Rect(createProps('rect', {
      left: baseLeft, top: baseTop, width: bannerWidth, height: 54,
      fill: barGradient, skewX: -12, rx: 4, ry: 4,
      stroke: borderHighlight, strokeWidth: 1.5,
      shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.6)', blur: 16, offsetX: 0, offsetY: 6 })
    }));
    objects.push(mainBar);

    // Default data mapping
    const isGenericDummy = (customData.team1 || '').toUpperCase() === 'TOM DALEY' || 
                           (customData.teamA || '').toUpperCase() === 'TOM DALEY' || 
                           (customData.teamA || '').toUpperCase() === 'CROATIA' || 
                           (!customData.team1 && !customData.teamA);

    const teamName = isGenericDummy 
      ? (variant === 'b' ? 'CROATIA' : 'CHINA') 
      : (customData.team1 || customData.teamA || 'CHINA');

    const status = isGenericDummy
      ? (variant === 'b' ? 'DSQ' : '')
      : (customData.status || customData.score1 || customData.scoreA || '');

    // Flag
    const rowNoc = getNocCodeForTeam(teamName) || (variant === 'b' ? 'CRO' : 'CHN');
    const flagObj = await createFabricFlagObject(rowNoc, {
      left: baseLeft + 30, top: baseTop + 13, scaleX: 0.45, scaleY: 0.45
    });
    if (flagObj) objects.push(flagObj);

    // Name (gap of ~48px visually, start at baseLeft + 150)
    const nameTxt = new fabric.Textbox(teamName.toUpperCase(), createProps('textbox', {
      left: baseLeft + 150, top: baseTop + 10, fontSize: 30, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: 420, charSpacing: 20
    }));
    objects.push(nameTxt);

    // Status box (white skewed box on right)
    const statusBox = new fabric.Rect({
      left: baseLeft + bannerWidth - 190, top: baseTop + 11, width: 80, height: 32,
      fill: new fabric.Gradient({
        type: 'linear', gradientUnits: 'pixels', coords: { x1: 0, y1: 0, x2: 80, y2: 0 },
        colorStops: [{ offset: 0, color: '#d1d5db' }, { offset: 0.5, color: '#ffffff' }, { offset: 1, color: '#e2e8f0' }]
      }),
      stroke: 'rgba(0,34,62,0.4)', strokeWidth: 1.2, skewX: -12, rx: 2, ry: 2
    });
    objects.push(statusBox);

    if (status) {
      const statusText = new fabric.Textbox(status.toUpperCase(), createProps('textbox', {
        left: baseLeft + bannerWidth - 190, top: baseTop + 16, fontSize: 18, fontWeight: '900', fontStyle: 'italic',
        fill: '#0a2a5e', width: 80, textAlign: 'center'
      }));
      objects.push(statusText);
    }

    // Olympic Rings
    const olympicRings = createOlympicRingsGroup(baseLeft + bannerWidth - 90, baseTop + 15, 9, 2.2);
    objects.push(olympicRings);

    return new fabric.Group(objects, {
      left: 377, top: 880,
      scaleX: 1.136, scaleY: 1.204,
      subTargetCheck: true,
      id: generateUniqueId({ type: 'waterPoloGroup' }),
      name: `WP007 Team ID (${normId})`,
      selectable: true, hasControls: true
    });
  }

  // ── WP008 - Team List ──
  if (normId.includes('WP008') || normId === 'TEAM LIST') {
    const bannerWidth = 850;
    const baseLeft = 328;
    const baseTop = 966 - 425; // 541

    // Background bar
    const barGradient = new fabric.Gradient({
      type: 'linear', gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: bannerWidth, y2: 0 },
      colorStops: [
        { offset: 0, color: gradientStart },
        { offset: 0.5, color: gradientMid },
        { offset: 1, color: gradientEnd }
      ]
    });
    const mainBar = new fabric.Rect(createProps('rect', {
      left: baseLeft, top: baseTop, width: bannerWidth, height: 54,
      fill: barGradient, skewX: -12, rx: 4, ry: 4,
      stroke: borderHighlight, strokeWidth: 1.5,
      shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.6)', blur: 16, offsetX: 0, offsetY: 6 })
    }));
    objects.push(mainBar);

    // Default data mapping
    const isGenericDummy = (customData.team1 || '').toUpperCase() === 'TOM DALEY' || 
                           (customData.teamA || '').toUpperCase() === 'TOM DALEY' || 
                           (customData.teamA || '').toUpperCase() === 'CROATIA' || 
                           (!customData.team1 && !customData.teamA);

    const teamName = isGenericDummy ? 'HUNGARY' : (customData.team1 || customData.teamA || 'HUNGARY');
    const teamNoc = getNocCodeForTeam(teamName) || 'HUN';

    // Flag
    const flagObj = await createFabricFlagObject(teamNoc, {
      left: baseLeft + 30, top: baseTop + 13, scaleX: 0.45, scaleY: 0.45
    });
    if (flagObj) objects.push(flagObj);

    // Name (gap of ~48px visually, start at baseLeft + 150)
    const nameTxt = new fabric.Textbox(teamName.toUpperCase(), createProps('textbox', {
      left: baseLeft + 150, top: baseTop + 10, fontSize: 30, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: 420, charSpacing: 20
    }));
    objects.push(nameTxt);

    // Status box (white skewed box on right)
    const statusBox = new fabric.Rect({
      left: baseLeft + bannerWidth - 190, top: baseTop + 11, width: 80, height: 32,
      fill: new fabric.Gradient({
        type: 'linear', gradientUnits: 'pixels', coords: { x1: 0, y1: 0, x2: 80, y2: 0 },
        colorStops: [{ offset: 0, color: '#d1d5db' }, { offset: 0.5, color: '#ffffff' }, { offset: 1, color: '#e2e8f0' }]
      }),
      stroke: 'rgba(0,34,62,0.4)', strokeWidth: 1.2, skewX: -12, rx: 2, ry: 2
    });
    objects.push(statusBox);

    // Olympic Rings
    const olympicRings = createOlympicRingsGroup(baseLeft + bannerWidth - 90, baseTop + 15, 9, 2.2);
    objects.push(olympicRings);

    // Second bar (silver bar, height 38px)
    const t2Top = baseTop + 54 + 2;
    const botBar = new fabric.Rect(createProps('rect', {
      left: baseLeft + 17, top: t2Top, width: bannerWidth - 30, height: 38,
      fill: new fabric.Gradient({
        type: 'linear', gradientUnits: 'pixels', coords: { x1: 0, y1: 0, x2: bannerWidth - 30, y2: 0 },
        colorStops: [{ offset: 0, color: '#c8d8ea' }, { offset: 0.5, color: '#dce8f5' }, { offset: 1, color: '#b8cce0' }]
      }),
      skewX: -12, rx: 3, ry: 3,
      stroke: 'rgba(0,0,0,0.15)', strokeWidth: 1
    }));
    objects.push(botBar);

    const subTitleText = new fabric.Textbox("TEAM LIST", createProps('textbox', {
      left: baseLeft + 30, top: t2Top + 7, fontSize: 22, fontWeight: '900', fontStyle: 'italic',
      fill: '#0a2a5e', width: 500, charSpacing: 40
    }));
    objects.push(subTitleText);

    // Players list
    const defaultPlayers = [
      { capNumber: '1', name: 'ZOLTAN SZECSI', role: 'GK' },
      { capNumber: '2', name: 'TAMAS VARGA', role: '' },
      { capNumber: '3', name: 'NORBERT MADARAS', role: '' },
      { capNumber: '4', name: 'DENES ANDOR VARGA', role: '' },
      { capNumber: '5', name: 'TAMAS KASAS', role: '' },
      { capNumber: '6', name: 'NORBERT HOSNYANSZKY', role: '' },
      { capNumber: '7', name: 'GERGELY KISS', role: '' },
      { capNumber: '8', name: 'TIBOR BENEDEK', role: 'C' },
      { capNumber: '9', name: 'DANIEL Rudolf VARGA', role: '' },
      { capNumber: '10', name: 'PETER BIROS', role: '' },
      { capNumber: '11', name: 'GABOR KIS', role: '' },
      { capNumber: '12', name: 'TAMAS MOLNAR', role: '' },
      { capNumber: '13', name: 'ISTVAN GERGELY', role: '' }
    ];
    const defaultCoach = 'DENES KEMENY';

    const inputPlayers = customData.players || defaultPlayers;
    const coachName = customData.coach || defaultCoach;

    let currentY = t2Top + 38 + 3;

    for (let r = 0; r < 8; r++) {
      // Row background
      const rowGrad = new fabric.Gradient({
        type: 'linear', gradientUnits: 'pixels', coords: { x1: 0, y1: 0, x2: bannerWidth - 30, y2: 0 },
        colorStops: [{ offset: 0, color: '#091d36' }, { offset: 0.5, color: '#0f2f57' }, { offset: 1, color: '#071629' }]
      });
      const rowRect = new fabric.Rect(createProps('rect', {
        left: baseLeft + 17, top: currentY, width: bannerWidth - 30, height: 38,
        fill: rowGrad, skewX: -12, rx: 3, ry: 3, stroke: 'rgba(255,255,255,0.15)', strokeWidth: 1
      }));
      objects.push(rowRect);

      // Left Column (Player r)
      if (r < inputPlayers.length) {
        const p = inputPlayers[r];
        if (p.capNumber) {
          const numBadge = new fabric.Rect({
            left: baseLeft + 30, top: currentY + 6, width: 24, height: 26,
            fill: '#0055a5', skewX: -12, rx: 2, ry: 2
          });
          const numTxt = new fabric.Textbox(p.capNumber, createProps('textbox', {
            left: baseLeft + 30, top: currentY + 8, fontSize: 16, fontWeight: '900',
            fill: '#ffffff', width: 24, textAlign: 'center'
          }));
          objects.push(numBadge, numTxt);
        }

        const nameStr = p.name.toUpperCase();
        const pNameTxt = new fabric.Textbox(nameStr, createProps('textbox', {
          left: baseLeft + 65, top: currentY + 8, fontSize: 18, fontWeight: '900', fontStyle: 'italic',
          fill: '#ffffff', width: 250
        }));
        objects.push(pNameTxt);

        if (p.role) {
          if (p.role === 'GK') {
            const roleTxt = new fabric.Textbox('GK', createProps('textbox', {
              left: baseLeft + 330, top: currentY + 8, fontSize: 16, fontWeight: '900', fontStyle: 'italic',
              fill: '#00ccff', width: 50
            }));
            objects.push(roleTxt);
          } else if (p.role === 'C') {
            const cBadge = new fabric.Rect({
              left: baseLeft + 330, top: currentY + 6, width: 20, height: 26,
              fill: '#0055a5', skewX: -12, rx: 2, ry: 2
            });
            const cTxt = new fabric.Textbox('C', createProps('textbox', {
              left: baseLeft + 330, top: currentY + 8, fontSize: 16, fontWeight: '900',
              fill: '#ffffff', width: 20, textAlign: 'center'
            }));
            objects.push(cBadge, cTxt);
          }
        }
      }

      // Right Column (Player r + 8 or Coach)
      const rightIdx = r + 8;
      if (r < 5) {
        if (rightIdx < inputPlayers.length) {
          const p = inputPlayers[rightIdx];
          if (p.capNumber) {
            const numBadge = new fabric.Rect({
              left: baseLeft + 435, top: currentY + 6, width: 24, height: 26,
              fill: '#0055a5', skewX: -12, rx: 2, ry: 2
            });
            const numTxt = new fabric.Textbox(p.capNumber, createProps('textbox', {
              left: baseLeft + 435, top: currentY + 8, fontSize: 16, fontWeight: '900',
              fill: '#ffffff', width: 24, textAlign: 'center'
            }));
            objects.push(numBadge, numTxt);
          }

          const nameStr = p.name.toUpperCase();
          const pNameTxt = new fabric.Textbox(nameStr, createProps('textbox', {
            left: baseLeft + 470, top: currentY + 8, fontSize: 18, fontWeight: '900', fontStyle: 'italic',
            fill: '#ffffff', width: 250
          }));
          objects.push(pNameTxt);

          if (p.role) {
            if (p.role === 'GK') {
              const roleTxt = new fabric.Textbox('GK', createProps('textbox', {
                left: baseLeft + 735, top: currentY + 8, fontSize: 16, fontWeight: '900', fontStyle: 'italic',
                fill: '#00ccff', width: 50
              }));
              objects.push(roleTxt);
            } else if (p.role === 'C') {
              const cBadge = new fabric.Rect({
                left: baseLeft + 735, top: currentY + 6, width: 20, height: 26,
                fill: '#0055a5', skewX: -12, rx: 2, ry: 2
              });
              const cTxt = new fabric.Textbox('C', createProps('textbox', {
                left: baseLeft + 735, top: currentY + 8, fontSize: 16, fontWeight: '900',
                fill: '#ffffff', width: 20, textAlign: 'center'
              }));
              objects.push(cBadge, cTxt);
            }
          }
        }
      } else if (r === 6) {
        const coachLabel = new fabric.Textbox("COACH", createProps('textbox', {
          left: baseLeft + 470, top: currentY + 8, fontSize: 18, fontWeight: '900', fontStyle: 'italic',
          fill: '#dfa63b', width: 250
        }));
        objects.push(coachLabel);
      } else if (r === 7) {
        const coachNameTxt = new fabric.Textbox(coachName.toUpperCase(), createProps('textbox', {
          left: baseLeft + 470, top: currentY + 8, fontSize: 18, fontWeight: '900', fontStyle: 'italic',
          fill: '#ffffff', width: 250
        }));
        objects.push(coachNameTxt);
      }

      currentY += 38 + 3; // 3px gap matching DV015 rowGap
    }

    return new fabric.Group(objects, {
      left: 313, top: 398,
      scaleX: 1.497, scaleY: 1.297,
      subTargetCheck: true,
      id: generateUniqueId({ type: 'waterPoloGroup' }),
      name: `WP008 Team List (${normId})`,
      selectable: true, hasControls: true
    });
  }

  // ── WP009 - Previous Results ──
  if (normId.includes('WP009') || normId === 'PREVIOUS RESULTS') {
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

    if (variantStr.includes('_b') || variantStr.endsWith('b') || variantStr.includes('variant b')) variant = 'b';
    else if (variantStr.includes('_a') || variantStr.endsWith('a') || variantStr.includes('variant a')) variant = 'a';

    const bannerWidth = 850;
    const baseLeft = 328;

    // Default data mapping
    const isGenericDummy = (customData.team1 || '').toUpperCase() === 'TOM DALEY' || 
                           (customData.teamA || '').toUpperCase() === 'TOM DALEY' || 
                           (customData.teamA || '').toUpperCase() === 'CROATIA' || 
                           (!customData.team1 && !customData.teamA);

    const teamName = isGenericDummy 
      ? (variant === 'b' ? 'UNITED STATES' : 'HUNGARY') 
      : (customData.team1 || customData.teamA || 'HUNGARY');

    const record = isGenericDummy
      ? (variant === 'b' ? '(6 - 1 - 0)' : '(4 - 0 - 1)')
      : (customData.record || '');

    const headerText = record ? `${teamName.toUpperCase()} ${record}` : teamName.toUpperCase();

    const defaultRowsA = [
      { name: 'Montenegro', phase: 'GROUP A', score: '10-10', outcome: 'D' },
      { name: 'Greece', phase: 'GROUP A', score: '17-6', outcome: 'W' },
      { name: 'Spain', phase: 'GROUP A', score: '8-5', outcome: 'W' },
      { name: 'Australia', phase: 'GROUP A', score: '13-12', outcome: 'W' },
      { name: 'Canada', phase: 'GROUP A', score: '12-3', outcome: 'W' }
    ];

    const defaultRowsB = [
      { name: 'China', phase: 'GROUP B', score: '8-4', outcome: 'W' },
      { name: 'Italy', phase: 'GROUP B', score: '12-11', outcome: 'W' },
      { name: 'Serbia', phase: 'GROUP B', score: '2-4', outcome: 'L' },
      { name: 'Croatia', phase: 'GROUP B', score: '7-5', outcome: 'W' },
      { name: 'Germany', phase: 'GROUP B', score: '8-7', outcome: 'W' },
      { name: 'Australia', phase: 'QF', score: '17-16', outcome: 'W' },
      { name: 'Serbia', phase: 'SF', score: 'DSQ', outcome: 'W' }
    ];

    const rowsData = customData.rows || (variant === 'b' ? defaultRowsB : defaultRowsA);

    const rowCount = rowsData.length;
    const rowsHeight = rowCount * 38 + (rowCount - 1) * 3;
    const totalHeight = 54 + 2 + 38 + 3 + rowsHeight;
    const baseTop = 966 - totalHeight;

    // Background bar
    const barGradient = new fabric.Gradient({
      type: 'linear', gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: bannerWidth, y2: 0 },
      colorStops: [
        { offset: 0, color: gradientStart },
        { offset: 0.5, color: gradientMid },
        { offset: 1, color: gradientEnd }
      ]
    });
    const mainBar = new fabric.Rect(createProps('rect', {
      left: baseLeft, top: baseTop, width: bannerWidth, height: 54,
      fill: barGradient, skewX: -12, rx: 4, ry: 4,
      stroke: borderHighlight, strokeWidth: 1.5,
      shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.6)', blur: 16, offsetX: 0, offsetY: 6 })
    }));
    objects.push(mainBar);

    // Flag
    const teamNoc = getNocCodeForTeam(teamName) || (variant === 'b' ? 'USA' : 'HUN');
    const flagObj = await createFabricFlagObject(teamNoc, {
      left: baseLeft + 30, top: baseTop + 13, scaleX: 0.45, scaleY: 0.45
    });
    if (flagObj) objects.push(flagObj);

    // Name (gap of ~48px visually, start at baseLeft + 150)
    const nameTxt = new fabric.Textbox(headerText, createProps('textbox', {
      left: baseLeft + 150, top: baseTop + 10, fontSize: 30, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: 420, charSpacing: 20
    }));
    objects.push(nameTxt);

    // Status box (white skewed box on right)
    const statusBox = new fabric.Rect({
      left: baseLeft + bannerWidth - 190, top: baseTop + 11, width: 80, height: 32,
      fill: variant === 'b' ? 'transparent' : new fabric.Gradient({
        type: 'linear', gradientUnits: 'pixels', coords: { x1: 0, y1: 0, x2: 80, y2: 0 },
        colorStops: [{ offset: 0, color: '#d1d5db' }, { offset: 0.5, color: '#ffffff' }, { offset: 1, color: '#e2e8f0' }]
      }),
      stroke: variant === 'b' ? '#ffffff' : 'rgba(0,34,62,0.4)', strokeWidth: 1.2, skewX: -12, rx: 2, ry: 2
    });
    objects.push(statusBox);

    // Olympic Rings
    const olympicRings = createOlympicRingsGroup(baseLeft + bannerWidth - 90, baseTop + 15, 9, 2.2);
    objects.push(olympicRings);

    // Second bar (silver bar, height 38px)
    const t2Top = baseTop + 54 + 2;
    const botBar = new fabric.Rect(createProps('rect', {
      left: baseLeft + 17, top: t2Top, width: bannerWidth - 30, height: 38,
      fill: new fabric.Gradient({
        type: 'linear', gradientUnits: 'pixels', coords: { x1: 0, y1: 0, x2: bannerWidth - 30, y2: 0 },
        colorStops: [{ offset: 0, color: '#c8d8ea' }, { offset: 0.5, color: '#dce8f5' }, { offset: 1, color: '#b8cce0' }]
      }),
      skewX: -12, rx: 3, ry: 3,
      stroke: 'rgba(0,0,0,0.15)', strokeWidth: 1
    }));
    objects.push(botBar);

    const subTitleText = new fabric.Textbox("PREVIOUS RESULTS", createProps('textbox', {
      left: baseLeft + 30, top: t2Top + 7, fontSize: 22, fontWeight: '900', fontStyle: 'italic',
      fill: '#0a2a5e', width: 500, charSpacing: 40
    }));
    objects.push(subTitleText);

    // Rows
    let currentY = t2Top + 38 + 3;

    for (let r = 0; r < rowCount; r++) {
      const row = rowsData[r];

      // Row background
      const rowGrad = new fabric.Gradient({
        type: 'linear', gradientUnits: 'pixels', coords: { x1: 0, y1: 0, x2: bannerWidth - 30, y2: 0 },
        colorStops: [{ offset: 0, color: '#091d36' }, { offset: 0.5, color: '#0f2f57' }, { offset: 1, color: '#071629' }]
      });
      const rowRect = new fabric.Rect(createProps('rect', {
        left: baseLeft + 17, top: currentY, width: bannerWidth - 30, height: 38,
        fill: rowGrad, skewX: -12, rx: 3, ry: 3, stroke: 'rgba(255,255,255,0.15)', strokeWidth: 1
      }));
      objects.push(rowRect);

      // Flag
      const rowNoc = getNocCodeForTeam(row.name) || 'HUN';
      const rowFlag = await createFabricFlagObject(rowNoc, {
        left: baseLeft + 30, top: currentY + 6, scaleX: 0.45, scaleY: 0.45
      });
      if (rowFlag) objects.push(rowFlag);

      // Name (gap of ~48px visually, start at baseLeft + 150)
      const rowNameTxt = new fabric.Textbox(row.name.toUpperCase(), createProps('textbox', {
        left: baseLeft + 150, top: currentY + 8, fontSize: 24, fontWeight: '900', fontStyle: 'italic',
        fill: '#ffffff', width: 280
      }));
      objects.push(rowNameTxt);

      // Phase
      const phaseTxt = new fabric.Textbox(row.phase.toUpperCase(), createProps('textbox', {
        left: baseLeft + 420, top: currentY + 8, fontSize: 22, fontWeight: '900', fontStyle: 'italic',
        fill: '#c8d8ea', width: 220, textAlign: 'right'
      }));
      objects.push(phaseTxt);

      // Score
      const scoreTxt = new fabric.Textbox(row.score, createProps('textbox', {
        left: baseLeft + 655, top: currentY + 8, fontSize: 24, fontWeight: '900', fontStyle: 'italic',
        fill: '#ffffff', width: 100, textAlign: 'center'
      }));
      objects.push(scoreTxt);

      // Outcome
      const outcomeTxt = new fabric.Textbox(row.outcome.toUpperCase(), createProps('textbox', {
        left: baseLeft + 760, top: currentY + 8, fontSize: 24, fontWeight: '900', fontStyle: 'italic',
        fill: '#ffffff', width: 40, textAlign: 'center'
      }));
      objects.push(outcomeTxt);

      currentY += 38 + 3;
    }

    const finalLeft = variant === 'b' ? 330 : 313;
    const finalTop = variant === 'b' ? 455 : 566;

    return new fabric.Group(objects, {
      left: finalLeft, top: finalTop,
      scaleX: 1.495, scaleY: 1.327,
      subTargetCheck: true,
      id: generateUniqueId({ type: 'waterPoloGroup' }),
      name: `WP009 Previous Results (${normId})`,
      selectable: true, hasControls: true
    });
  }

  // ── WP010 - Player ID ──
  if (normId.includes('WP010') || normId === 'PLAYER ID') {
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

    if (variantStr.includes('_d') || variantStr.endsWith('d') || variantStr.includes('variant d')) variant = 'd';
    else if (variantStr.includes('_c') || variantStr.endsWith('c') || variantStr.includes('variant c')) variant = 'c';
    else if (variantStr.includes('_b') || variantStr.endsWith('b') || variantStr.includes('variant b')) variant = 'b';
    else if (variantStr.includes('_a') || variantStr.endsWith('a') || variantStr.includes('variant a')) variant = 'a';

    const bannerWidth = 850;
    const baseLeft = 328;

    // Default data mapping
    const isGenericDummy = (customData.playerName || '').toUpperCase() === 'TOM DALEY' || 
                           (customData.name || '').toUpperCase() === 'TOM DALEY' || 
                           (customData.name || '').toUpperCase() === 'NORBERT HOSNYANSZKY' || 
                           (!customData.playerName && !customData.name);

    let teamName = 'HUNGARY';
    let capNumber = '6';
    let playerName = 'NORBERT HOSNYANSZKY';
    let status = '';
    let subText = '';

    if (isGenericDummy) {
      if (variant === 'b') {
        status = 'DSQ';
      } else if (variant === 'c') {
        subText = 'EXCLUSION WITH SUBSTITUTION';
      } else if (variant === 'd') {
        teamName = 'UNITED STATES';
        capNumber = '11';
        playerName = 'JESSE SMITH';
        subText = 'EXCLUSION WITH SUBSTITUTION AFTER 4 MINUTES';
      }
    } else {
      teamName = customData.team1 || customData.teamA || 'HUNGARY';
      capNumber = customData.capNumber || customData.number || '6';
      playerName = customData.playerName || customData.name || 'NORBERT HOSNYANSZKY';
      status = customData.status || '';
      subText = customData.subText || customData.remarks || '';
    }

    const hasSubBar = !!subText;
    const totalHeight = hasSubBar ? (54 + 2 + 38) : 54;
    const baseTop = 966 - totalHeight;

    // Background bar
    const barGradient = new fabric.Gradient({
      type: 'linear', gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: bannerWidth, y2: 0 },
      colorStops: [
        { offset: 0, color: gradientStart },
        { offset: 0.5, color: gradientMid },
        { offset: 1, color: gradientEnd }
      ]
    });
    const mainBar = new fabric.Rect(createProps('rect', {
      left: baseLeft, top: baseTop, width: bannerWidth, height: 54,
      fill: barGradient, skewX: -12, rx: 4, ry: 4,
      stroke: borderHighlight, strokeWidth: 1.5,
      shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.6)', blur: 16, offsetX: 0, offsetY: 6 })
    }));
    objects.push(mainBar);

    // Flag
    const teamNoc = getNocCodeForTeam(teamName) || (variant === 'd' ? 'USA' : 'HUN');
    const flagObj = await createFabricFlagObject(teamNoc, {
      left: baseLeft + 30, top: baseTop + 13, scaleX: 0.45, scaleY: 0.45
    });
    if (flagObj) objects.push(flagObj);

    // Cap Number (cyan)
    const capTxt = new fabric.Textbox(capNumber, createProps('textbox', {
      left: baseLeft + 150, top: baseTop + 10, fontSize: 30, fontWeight: '900', fontStyle: 'italic',
      fill: '#00ccff', width: 60, charSpacing: 10
    }));
    objects.push(capTxt);

    // Name (shifted dynamic right)
    const nameLeft = baseLeft + 150 + (capNumber.length * 22) + 15;
    const nameTxt = new fabric.Textbox(playerName.toUpperCase(), createProps('textbox', {
      left: nameLeft, top: baseTop + 10, fontSize: 30, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: 450, charSpacing: 20
    }));
    objects.push(nameTxt);

    // Status box (white skewed box on right)
    const statusBox = new fabric.Rect({
      left: baseLeft + bannerWidth - 190, top: baseTop + 11, width: 80, height: 32,
      fill: variant === 'd' ? 'transparent' : new fabric.Gradient({
        type: 'linear', gradientUnits: 'pixels', coords: { x1: 0, y1: 0, x2: 80, y2: 0 },
        colorStops: [{ offset: 0, color: '#d1d5db' }, { offset: 0.5, color: '#ffffff' }, { offset: 1, color: '#e2e8f0' }]
      }),
      stroke: variant === 'd' ? '#ffffff' : 'rgba(0,34,62,0.4)', strokeWidth: 1.2, skewX: -12, rx: 2, ry: 2
    });
    objects.push(statusBox);

    if (status) {
      const statusText = new fabric.Textbox(status.toUpperCase(), createProps('textbox', {
        left: baseLeft + bannerWidth - 190, top: baseTop + 16, fontSize: 18, fontWeight: '900', fontStyle: 'italic',
        fill: '#0a2a5e', width: 80, textAlign: 'center'
      }));
      objects.push(statusText);
    }

    // Olympic Rings
    const olympicRings = createOlympicRingsGroup(baseLeft + bannerWidth - 90, baseTop + 15, 9, 2.2);
    objects.push(olympicRings);

    // Sub-bar
    if (hasSubBar) {
      const t2Top = baseTop + 54 + 2;
      const subBar = new fabric.Rect(createProps('rect', {
        left: baseLeft + 17, top: t2Top, width: bannerWidth - 30, height: 38,
        fill: new fabric.Gradient({
          type: 'linear', gradientUnits: 'pixels', coords: { x1: 0, y1: 0, x2: bannerWidth - 30, y2: 0 },
          colorStops: [{ offset: 0, color: '#091d36' }, { offset: 0.5, color: '#0f2f57' }, { offset: 1, color: '#071629' }]
        }),
        skewX: -12, rx: 3, ry: 3,
        stroke: 'rgba(255,255,255,0.15)', strokeWidth: 1
      }));
      objects.push(subBar);

      const subTxtObj = new fabric.Textbox(subText.toUpperCase(), createProps('textbox', {
        left: baseLeft + 30, top: t2Top + 8, fontSize: 18, fontWeight: '900', fontStyle: 'italic',
        fill: '#ffffff', width: 750, charSpacing: 20
      }));
      objects.push(subTxtObj);
    }

    let finalLeft = baseLeft;
    let finalTop = baseTop;
    let finalScaleX = 1.0;
    let finalScaleY = 1.0;

    if (variant === 'd') {
      finalLeft = 360;
      finalTop = 827;
      finalScaleX = 1.436;
      finalScaleY = 1.440;
    } else if (variant === 'c') {
      finalLeft = 352;
      finalTop = 838;
      finalScaleX = 1.440;
      finalScaleY = 1.361;
    } else if (variant === 'a' || variant === 'b') {
      finalLeft = 360;
      finalTop = 878;
      finalScaleX = 1.427;
      finalScaleY = 1.474;
    }

    return new fabric.Group(objects, {
      left: finalLeft, top: finalTop,
      scaleX: finalScaleX, scaleY: finalScaleY,
      subTargetCheck: true,
      id: generateUniqueId({ type: 'waterPoloGroup' }),
      name: `WP010 Player ID (${normId})`,
      selectable: true, hasControls: true
    });
  }

  // ── WP011 - Major Fouls ID ──
  if (normId.includes('WP011') || normId === 'MAJOR FOULS ID') {
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

    if (variantStr.includes('_b') || variantStr.endsWith('b') || variantStr.includes('variant b')) variant = 'b';
    else if (variantStr.includes('_a') || variantStr.endsWith('a') || variantStr.includes('variant a')) variant = 'a';

    const bannerWidth = 850;
    const baseLeft = 328;
    const baseTop = 966 - 94; // 872

    // Default data mapping
    const isGenericDummy = (customData.playerName || '').toUpperCase() === 'TOM DALEY' || 
                           (customData.name || '').toUpperCase() === 'TOM DALEY' || 
                           (customData.name || '').toUpperCase() === 'NORBERT HOSNYANSZKY' || 
                           (!customData.playerName && !customData.name);

    let teamName = 'SERBIA';
    let capNumber = '6';
    let playerName = 'DUSKO PIJETLOVIC';
    let fouls = 1;

    if (isGenericDummy) {
      if (variant === 'b') {
        teamName = 'MONTENEGRO';
        capNumber = '6';
        playerName = 'MILAN TICIC';
        fouls = 3;
      }
    } else {
      teamName = customData.team1 || customData.teamA || 'SERBIA';
      capNumber = customData.capNumber || customData.number || '6';
      playerName = customData.playerName || customData.name || 'DUSKO PIJETLOVIC';
      fouls = parseInt(customData.fouls !== undefined ? customData.fouls : 1, 10);
    }

    // Background bar
    const barGradient = new fabric.Gradient({
      type: 'linear', gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: bannerWidth, y2: 0 },
      colorStops: [
        { offset: 0, color: gradientStart },
        { offset: 0.5, color: gradientMid },
        { offset: 1, color: gradientEnd }
      ]
    });
    const mainBar = new fabric.Rect(createProps('rect', {
      left: baseLeft, top: baseTop, width: bannerWidth, height: 54,
      fill: barGradient, skewX: -12, rx: 4, ry: 4,
      stroke: borderHighlight, strokeWidth: 1.5,
      shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.6)', blur: 16, offsetX: 0, offsetY: 6 })
    }));
    objects.push(mainBar);

    // Flag
    const teamNoc = getNocCodeForTeam(teamName) || (variant === 'b' ? 'MNE' : 'SRB');
    const flagObj = await createFabricFlagObject(teamNoc, {
      left: baseLeft + 30, top: baseTop + 13, scaleX: 0.45, scaleY: 0.45
    });
    if (flagObj) objects.push(flagObj);

    // Cap Number (cyan)
    const capTxt = new fabric.Textbox(capNumber, createProps('textbox', {
      left: baseLeft + 150, top: baseTop + 10, fontSize: 30, fontWeight: '900', fontStyle: 'italic',
      fill: '#00ccff', width: 60, charSpacing: 10
    }));
    objects.push(capTxt);

    // Name (shifted dynamic right)
    const nameLeft = baseLeft + 150 + (capNumber.length * 22) + 15;
    const nameTxt = new fabric.Textbox(playerName.toUpperCase(), createProps('textbox', {
      left: nameLeft, top: baseTop + 10, fontSize: 30, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: 450, charSpacing: 20
    }));
    objects.push(nameTxt);

    // Status box (white skewed box on right)
    const statusBox = new fabric.Rect({
      left: baseLeft + bannerWidth - 190, top: baseTop + 11, width: 80, height: 32,
      fill: new fabric.Gradient({
        type: 'linear', gradientUnits: 'pixels', coords: { x1: 0, y1: 0, x2: 80, y2: 0 },
        colorStops: [{ offset: 0, color: '#d1d5db' }, { offset: 0.5, color: '#ffffff' }, { offset: 1, color: '#e2e8f0' }]
      }),
      stroke: 'rgba(0,34,62,0.4)', strokeWidth: 1.2, skewX: -12, rx: 2, ry: 2
    });
    objects.push(statusBox);

    // Olympic Rings
    const olympicRings = createOlympicRingsGroup(baseLeft + bannerWidth - 90, baseTop + 15, 9, 2.2);
    objects.push(olympicRings);

    // Sub-bar
    const t2Top = baseTop + 54 + 2;
    const subBar = new fabric.Rect(createProps('rect', {
      left: baseLeft + 17, top: t2Top, width: bannerWidth - 30, height: 38,
      fill: new fabric.Gradient({
        type: 'linear', gradientUnits: 'pixels', coords: { x1: 0, y1: 0, x2: bannerWidth - 30, y2: 0 },
        colorStops: [{ offset: 0, color: '#091d36' }, { offset: 0.5, color: '#0f2f57' }, { offset: 1, color: '#071629' }]
      }),
      skewX: -12, rx: 3, ry: 3,
      stroke: 'rgba(255,255,255,0.15)', strokeWidth: 1
    }));
    objects.push(subBar);

    const subTxtObj = new fabric.Textbox("MAJOR FOULS", createProps('textbox', {
      left: baseLeft + 30, top: t2Top + 8, fontSize: 18, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: 200, charSpacing: 20
    }));
    objects.push(subTxtObj);

    // Red foul indicators
    let foulStartLeft = baseLeft + 200;
    for (let f = 0; f < fouls; f++) {
      const redBox = new fabric.Rect({
        left: foulStartLeft, top: t2Top + 7, width: 24, height: 24,
        fill: '#d32f2f', skewX: -12, rx: 2, ry: 2
      });
      const xText = new fabric.Textbox('X', createProps('textbox', {
        left: foulStartLeft, top: t2Top + 10, fontSize: 15, fontWeight: '900',
        fill: '#ffffff', width: 24, textAlign: 'center'
      }));
      objects.push(redBox, xText);
      foulStartLeft += 30; // 24 width + 6 gap
    }

    return new fabric.Group(objects, {
      left: 364, top: 831,
      scaleX: 1.425, scaleY: 1.302,
      subTargetCheck: true,
      id: generateUniqueId({ type: 'waterPoloGroup' }),
      name: `WP011 Major Fouls ID (${normId})`,
      selectable: true, hasControls: true
    });
  }

  // ── WP012 - Captain/Goalkeeper ID ──
  if (normId.includes('WP012') || normId === 'CAPTAIN GOALKEEPER ID') {
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

    if (variantStr.includes('_b') || variantStr.endsWith('b') || variantStr.includes('variant b')) variant = 'b';
    else if (variantStr.includes('_a') || variantStr.endsWith('a') || variantStr.includes('variant a')) variant = 'a';

    const bannerWidth = 850;
    const baseLeft = 328;
    const baseTop = 966 - 94; // 872

    // Default data mapping
    const isGenericDummy = (customData.playerName || '').toUpperCase() === 'TOM DALEY' || 
                           (customData.name || '').toUpperCase() === 'TOM DALEY' || 
                           (customData.name || '').toUpperCase() === 'NORBERT HOSNYANSZKY' || 
                           (!customData.playerName && !customData.name);

    let teamName = 'AUSTRALIA';
    let capNumber = '1';
    let playerName = 'JAMES STANTON';
    let role = 'GOALKEEPER';

    if (isGenericDummy) {
      if (variant === 'b') {
        teamName = 'AUSTRALIA';
        capNumber = '9';
        playerName = 'THOMAS WHALAN';
        role = 'CAPTAIN';
      }
    } else {
      teamName = customData.team1 || customData.teamA || 'AUSTRALIA';
      capNumber = customData.capNumber || customData.number || '1';
      playerName = customData.playerName || customData.name || 'JAMES STANTON';
      role = customData.role || customData.subText || 'GOALKEEPER';
    }

    // Background bar
    const barGradient = new fabric.Gradient({
      type: 'linear', gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: bannerWidth, y2: 0 },
      colorStops: [
        { offset: 0, color: gradientStart },
        { offset: 0.5, color: gradientMid },
        { offset: 1, color: gradientEnd }
      ]
    });
    const mainBar = new fabric.Rect(createProps('rect', {
      left: baseLeft, top: baseTop, width: bannerWidth, height: 54,
      fill: barGradient, skewX: -12, rx: 4, ry: 4,
      stroke: borderHighlight, strokeWidth: 1.5,
      shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.6)', blur: 16, offsetX: 0, offsetY: 6 })
    }));
    objects.push(mainBar);

    // Flag
    const teamNoc = getNocCodeForTeam(teamName) || 'AUS';
    const flagObj = await createFabricFlagObject(teamNoc, {
      left: baseLeft + 30, top: baseTop + 13, scaleX: 0.45, scaleY: 0.45
    });
    if (flagObj) objects.push(flagObj);

    // Cap Number (cyan)
    const capTxt = new fabric.Textbox(capNumber, createProps('textbox', {
      left: baseLeft + 150, top: baseTop + 10, fontSize: 30, fontWeight: '900', fontStyle: 'italic',
      fill: '#00ccff', width: 60, charSpacing: 10
    }));
    objects.push(capTxt);

    // Name (shifted dynamic right)
    const nameLeft = baseLeft + 150 + (capNumber.length * 22) + 15;
    const nameTxt = new fabric.Textbox(playerName.toUpperCase(), createProps('textbox', {
      left: nameLeft, top: baseTop + 10, fontSize: 30, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: 450, charSpacing: 20
    }));
    objects.push(nameTxt);

    // Status box (white skewed box on right)
    const statusBox = new fabric.Rect({
      left: baseLeft + bannerWidth - 190, top: baseTop + 11, width: 80, height: 32,
      fill: new fabric.Gradient({
        type: 'linear', gradientUnits: 'pixels', coords: { x1: 0, y1: 0, x2: 80, y2: 0 },
        colorStops: [{ offset: 0, color: '#d1d5db' }, { offset: 0.5, color: '#ffffff' }, { offset: 1, color: '#e2e8f0' }]
      }),
      stroke: 'rgba(0,34,62,0.4)', strokeWidth: 1.2, skewX: -12, rx: 2, ry: 2
    });
    objects.push(statusBox);

    // Olympic Rings
    const olympicRings = createOlympicRingsGroup(baseLeft + bannerWidth - 90, baseTop + 15, 9, 2.2);
    objects.push(olympicRings);

    // Sub-bar
    const t2Top = baseTop + 54 + 2;
    const subBar = new fabric.Rect(createProps('rect', {
      left: baseLeft + 17, top: t2Top, width: bannerWidth - 30, height: 38,
      fill: new fabric.Gradient({
        type: 'linear', gradientUnits: 'pixels', coords: { x1: 0, y1: 0, x2: bannerWidth - 30, y2: 0 },
        colorStops: [{ offset: 0, color: '#091d36' }, { offset: 0.5, color: '#0f2f57' }, { offset: 1, color: '#071629' }]
      }),
      skewX: -12, rx: 3, ry: 3,
      stroke: 'rgba(255,255,255,0.15)', strokeWidth: 1
    }));
    objects.push(subBar);

    const subTxtObj = new fabric.Textbox(role.toUpperCase(), createProps('textbox', {
      left: baseLeft + 30, top: t2Top + 8, fontSize: 18, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: 750, charSpacing: 20
    }));
    objects.push(subTxtObj);

    return new fabric.Group(objects, {
      left: 358, top: 840,
      scaleX: 1.434, scaleY: 1.341,
      subTargetCheck: true,
      id: generateUniqueId({ type: 'waterPoloGroup' }),
      name: `WP012 Captain/Goalkeeper ID (${normId})`,
      selectable: true, hasControls: true
    });
  }

  // ── WP013 - Coach ID ──
  if (normId.includes('WP013') || normId === 'COACH ID') {
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

    if (variantStr.includes('_b') || variantStr.endsWith('b') || variantStr.includes('variant b')) variant = 'b';
    else if (variantStr.includes('_a') || variantStr.endsWith('a') || variantStr.includes('variant a')) variant = 'a';

    const bannerWidth = 850;
    const baseLeft = 328;
    const baseTop = 966 - 94; // 872

    // Default data mapping
    const isGenericDummy = (customData.playerName || '').toUpperCase() === 'TOM DALEY' || 
                           (customData.name || '').toUpperCase() === 'TOM DALEY' || 
                           (customData.name || '').toUpperCase() === 'NORBERT HOSNYANSZKY' || 
                           (customData.coachName || '').toUpperCase() === 'JOHN FOX' ||
                           (!customData.playerName && !customData.name && !customData.coachName);

    let teamName = 'AUSTRALIA';
    let coachName = 'JOHN FOX';
    let card = '';

    if (isGenericDummy) {
      if (variant === 'b') {
        teamName = 'AUSTRALIA';
        coachName = 'JOHN FOX';
        card = 'red';
      }
    } else {
      teamName = customData.team1 || customData.teamA || 'AUSTRALIA';
      coachName = customData.coachName || customData.playerName || customData.name || 'JOHN FOX';
      card = (customData.card || '').toLowerCase(); // 'red', 'yellow' or ''
    }

    // Background bar
    const barGradient = new fabric.Gradient({
      type: 'linear', gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: bannerWidth, y2: 0 },
      colorStops: [
        { offset: 0, color: gradientStart },
        { offset: 0.5, color: gradientMid },
        { offset: 1, color: gradientEnd }
      ]
    });
    const mainBar = new fabric.Rect(createProps('rect', {
      left: baseLeft, top: baseTop, width: bannerWidth, height: 54,
      fill: barGradient, skewX: -12, rx: 4, ry: 4,
      stroke: borderHighlight, strokeWidth: 1.5,
      shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.6)', blur: 16, offsetX: 0, offsetY: 6 })
    }));
    objects.push(mainBar);

    // Flag
    const teamNoc = getNocCodeForTeam(teamName) || 'AUS';
    const flagObj = await createFabricFlagObject(teamNoc, {
      left: baseLeft + 30, top: baseTop + 13, scaleX: 0.45, scaleY: 0.45
    });
    if (flagObj) objects.push(flagObj);

    // Name (starts exactly at baseLeft + 150)
    const nameTxt = new fabric.Textbox(coachName.toUpperCase(), createProps('textbox', {
      left: baseLeft + 150, top: baseTop + 10, fontSize: 30, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: 450, charSpacing: 20
    }));
    objects.push(nameTxt);

    // Red or Yellow card indicator
    if (card === 'red' || card === 'yellow') {
      const cardColor = card === 'red' ? '#d32f2f' : '#ffc107';
      const cardRect = new fabric.Rect({
        left: baseLeft + bannerWidth - 220, top: baseTop + 13, width: 18, height: 28,
        fill: cardColor, skewX: -12, rx: 2, ry: 2,
        stroke: 'rgba(0,0,0,0.2)', strokeWidth: 1
      });
      objects.push(cardRect);
    }

    // Status box (white skewed box on right)
    const statusBox = new fabric.Rect({
      left: baseLeft + bannerWidth - 190, top: baseTop + 11, width: 80, height: 32,
      fill: new fabric.Gradient({
        type: 'linear', gradientUnits: 'pixels', coords: { x1: 0, y1: 0, x2: 80, y2: 0 },
        colorStops: [{ offset: 0, color: '#d1d5db' }, { offset: 0.5, color: '#ffffff' }, { offset: 1, color: '#e2e8f0' }]
      }),
      stroke: 'rgba(0,34,62,0.4)', strokeWidth: 1.2, skewX: -12, rx: 2, ry: 2
    });
    objects.push(statusBox);

    // Olympic Rings
    const olympicRings = createOlympicRingsGroup(baseLeft + bannerWidth - 90, baseTop + 15, 9, 2.2);
    objects.push(olympicRings);

    // Sub-bar
    const t2Top = baseTop + 54 + 2;
    const subBar = new fabric.Rect(createProps('rect', {
      left: baseLeft + 17, top: t2Top, width: bannerWidth - 30, height: 38,
      fill: new fabric.Gradient({
        type: 'linear', gradientUnits: 'pixels', coords: { x1: 0, y1: 0, x2: bannerWidth - 30, y2: 0 },
        colorStops: [{ offset: 0, color: '#091d36' }, { offset: 0.5, color: '#0f2f57' }, { offset: 1, color: '#071629' }]
      }),
      skewX: -12, rx: 3, ry: 3,
      stroke: 'rgba(255,255,255,0.15)', strokeWidth: 1
    }));
    objects.push(subBar);

    const subTxtObj = new fabric.Textbox("COACH", createProps('textbox', {
      left: baseLeft + 30, top: t2Top + 8, fontSize: 18, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: 750, charSpacing: 20
    }));
    objects.push(subTxtObj);

    return new fabric.Group(objects, {
      left: 364, top: 827,
      scaleX: 1.427, scaleY: 1.440,
      subTargetCheck: true,
      id: generateUniqueId({ type: 'waterPoloGroup' }),
      name: `WP013 Coach ID (${normId})`,
      selectable: true, hasControls: true
    });
  }

  // ── WP014 - Official ID ──
  if (normId.includes('WP014') || normId === 'OFFICIAL ID') {
    const bannerWidth = 850;
    const baseLeft = 328;
    const baseTop = 966 - 94; // 872

    // Default data mapping
    const isGenericDummy = (customData.playerName || '').toUpperCase() === 'TOM DALEY' || 
                           (customData.name || '').toUpperCase() === 'TOM DALEY' || 
                           (customData.name || '').toUpperCase() === 'NORBERT HOSNYANSZKY' || 
                           (customData.officialName || '').toUpperCase() === 'GABOR KISZELLY' ||
                           (!customData.playerName && !customData.name && !customData.officialName);

    let teamName = 'HUNGARY';
    let officialName = 'GABOR KISZELLY';
    let role = 'REFEREE';

    if (isGenericDummy) {
      teamName = 'HUNGARY';
      officialName = 'GABOR KISZELLY';
      role = 'REFEREE';
    } else {
      teamName = customData.team1 || customData.teamA || 'HUNGARY';
      officialName = customData.officialName || customData.playerName || customData.name || 'GABOR KISZELLY';
      role = customData.role || customData.subText || 'REFEREE';
    }

    // Background bar
    const barGradient = new fabric.Gradient({
      type: 'linear', gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: bannerWidth, y2: 0 },
      colorStops: [
        { offset: 0, color: gradientStart },
        { offset: 0.5, color: gradientMid },
        { offset: 1, color: gradientEnd }
      ]
    });
    const mainBar = new fabric.Rect(createProps('rect', {
      left: baseLeft, top: baseTop, width: bannerWidth, height: 54,
      fill: barGradient, skewX: -12, rx: 4, ry: 4,
      stroke: borderHighlight, strokeWidth: 1.5,
      shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.6)', blur: 16, offsetX: 0, offsetY: 6 })
    }));
    objects.push(mainBar);

    // Flag
    const teamNoc = getNocCodeForTeam(teamName) || 'HUN';
    const flagObj = await createFabricFlagObject(teamNoc, {
      left: baseLeft + 30, top: baseTop + 13, scaleX: 0.45, scaleY: 0.45
    });
    if (flagObj) objects.push(flagObj);

    // Name (starts exactly at baseLeft + 150)
    const nameTxt = new fabric.Textbox(officialName.toUpperCase(), createProps('textbox', {
      left: baseLeft + 150, top: baseTop + 10, fontSize: 30, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: 550, charSpacing: 20
    }));
    objects.push(nameTxt);

    // Olympic Rings (shifted slightly left to account for no status box)
    const olympicRings = createOlympicRingsGroup(baseLeft + bannerWidth - 90, baseTop + 15, 9, 2.2);
    objects.push(olympicRings);

    // Sub-bar
    const t2Top = baseTop + 54 + 2;
    const subBar = new fabric.Rect(createProps('rect', {
      left: baseLeft + 17, top: t2Top, width: bannerWidth - 30, height: 38,
      fill: new fabric.Gradient({
        type: 'linear', gradientUnits: 'pixels', coords: { x1: 0, y1: 0, x2: bannerWidth - 30, y2: 0 },
        colorStops: [{ offset: 0, color: '#091d36' }, { offset: 0.5, color: '#0f2f57' }, { offset: 1, color: '#071629' }]
      }),
      skewX: -12, rx: 3, ry: 3,
      stroke: 'rgba(255,255,255,0.15)', strokeWidth: 1
    }));
    objects.push(subBar);

    const subTxtObj = new fabric.Textbox(role.toUpperCase(), createProps('textbox', {
      left: baseLeft + 30, top: t2Top + 8, fontSize: 18, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: 750, charSpacing: 20
    }));
    objects.push(subTxtObj);

    return new fabric.Group(objects, {
      left: 358, top: 846,
      scaleX: 1.425, scaleY: 1.282,
      subTargetCheck: true,
      id: generateUniqueId({ type: 'waterPoloGroup' }),
      name: `WP014 Official ID (${normId})`,
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
            position: absolute; left: 155px; top: 10px; font-size: 30px; font-weight: 900;
            font-style: italic; letter-spacing: 2px; color: #ffffff; text-transform: uppercase;
            white-space: nowrap; z-index: 2;
          }
          .rings-wrapper { position: absolute; right: 25px; top: 12px; z-index: 2; }
          
          .event-sub-bar {
            background: linear-gradient(90deg, #d1d5db 0%, #ffffff 50%, #e2e8f0 100%);
            color: #0a2a5e;
            padding: 0 30px 0 45px;
            clip-path: polygon(30px 0px, 100% 0px, 100% 100%, 0px 100%);
            border-radius: 0 0 4px 0;
            border: 1.2px solid rgba(0,34,62,0.4);
            margin-left: 110px;
            margin-top: -38px;
            width: 778px;
            height: 38px;
            position: relative;
            z-index: 1;
            display: flex;
            align-items: center;
          }
          .event-sub-title {
            font-size: 22px;
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
    const baseTop = 966 - 328; // 638

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

          .schedule-banner { position: absolute; top: ${baseTop}px; left: 328px; display: flex; flex-direction: column; gap: 3px; }
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
          .t1-title { font-size: 30px; font-weight: 900; font-style: italic; color: #ffffff; letter-spacing: 2px; white-space: nowrap; }
          .tier-2 {
            height: 38px; width: 1220px; margin-left: 17px;
            background: linear-gradient(135deg, #c8d8ea 0%, #dce8f5 50%, #b8cce0 100%);
            border: 1px solid rgba(0,0,0,0.15); border-radius: 3px;
            transform: skewX(-12deg); display: flex; align-items: center; padding: 0 24px;
          }
          .t2-text { font-size: 22px; font-weight: 900; font-style: italic; color: #0a2a5e; letter-spacing: 4px; padding-left: 72px; white-space: nowrap; }
          
          .rows-container { display: flex; flex-direction: column; gap: 3px; margin-left: 27px; }
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
          .team-name { font-size: 24px; font-weight: 900; font-style: italic; color: #ffffff; letter-spacing: 1px; flex-grow: 1; text-align: left; }
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
    const baseTop = 966 - 176; // 790

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

          .match-banner { position: absolute; top: ${baseTop}px; left: 328px; display: flex; flex-direction: column; }
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
              45px 0px, 820px 0px, 848px 44px, 842px 54px,
              140px 54px, 115px 88px, 100px 95px, 10px 95px,
              2px 84px, 22px 42px, 35px 6px
            );
            border: 2px solid ${borderHighlight};
          }
          .water-polo-logo { position: absolute; left: 32px; top: 2px; z-index: 2; }
          .gun-barrel-title {
            position: absolute; left: 155px; top: 10px; font-size: 30px; font-weight: 900;
            font-style: italic; letter-spacing: 2px; color: #ffffff; text-transform: uppercase;
            white-space: nowrap; z-index: 2;
          }
          .rings-wrapper { position: absolute; right: 25px; top: 12px; z-index: 2; }
          
          .event-sub-bar {
            background: linear-gradient(90deg, #d1d5db 0%, #ffffff 50%, #e2e8f0 100%);
            color: #0a2a5e;
            padding: 0 30px 0 45px;
            clip-path: polygon(30px 0px, 100% 0px, 100% 100%, 0px 100%);
            border-radius: 0 0 4px 0;
            border: 1.2px solid rgba(0,34,62,0.4);
            margin-left: 110px;
            margin-top: -38px;
            width: 738px;
            height: 38px;
            position: relative;
            z-index: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .event-sub-title {
            font-size: 22px;
            font-weight: 900;
            font-style: italic;
            letter-spacing: 1px;
            text-transform: uppercase;
          }
          .t2-stats-headers { display: flex; gap: 20px; padding-right: 48px; }
          .t2-sh { font-size: 18px; font-weight: 900; font-style: italic; color: #0a2a5e; width: 30px; text-align: center; }

          .rows-container { display: flex; flex-direction: column; gap: 3px; margin-left: 17px; margin-top: 3px; }
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
          .team-name { font-size: 24px; font-weight: 900; font-style: italic; color: #ffffff; letter-spacing: 1px; white-space: nowrap; }
          
          .row-right { display: flex; align-items: center; }
          .stats-values { display: flex; gap: 20px; margin-right: 20px; }
          .stat-val { font-size: 24px; font-weight: 900; font-style: italic; color: #ffffff; width: 30px; text-align: center; }

          .cap-indicator {
            width: 32px; height: 26px; border-radius: 2px; border: 1.5px solid #ffffff;
          }
          .cap-indicator.white { background: #ffffff; }
          .cap-indicator.blue { background: #0a2a5e; }
        </style>
      </head>
      <body>
        <div class="match-banner">
          <div class="event-gun-header">
            <div class="event-gun-body"></div>
            <div class="water-polo-logo">${officialWaterPoloPictographSVG}</div>
            <div class="gun-barrel-title">MEN'S WATER POLO</div>
            <div class="rings-wrapper">${olympicRingsSVG}</div>
          </div>
          
          <div class="event-sub-bar">
            <div class="event-sub-title unskew">${matchHeader}</div>
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

  // ── WP005 - Group List ──
  if (normId.includes('WP005') || normId === 'GROUP LIST') {
    const baseTop = 966 - 340; // 626

    const teams = customData.rows || [
      { name: 'AUSTRALIA', noc: 'AUS' },
      { name: 'CANADA', noc: 'CAN' },
      { name: 'SPAIN', noc: 'ESP' },
      { name: 'GREECE', noc: 'GRE' },
      { name: 'HUNGARY', noc: 'HUN' },
      { name: 'MONTENEGRO', noc: 'MNE' }
    ];

    const rowsHTML = teams.map((t) => {
      const rowNoc = getNocCodeForTeam(t.name) || t.noc;
      const flagHtml = getFlagImgHtml(rowNoc, 'height: 28px; width: auto; border-radius: 2px; transform: skewX(-12deg);');
      return `
        <div class="team-row">
          <div class="row-left unskew">
            <div class="flag-wrap">${flagHtml}</div>
            <div class="team-name">${t.name}</div>
          </div>
        </div>
      `;
    }).join('');

    const groupHeader = (customData.header || customData.event || 'GROUP A').toUpperCase();

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,700;1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .group-banner { position: absolute; top: 513px; left: 328px; transform: scale(1.331); transform-origin: top left; display: flex; flex-direction: column; }
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
              45px 0px, 820px 0px, 848px 44px, 842px 54px,
              140px 54px, 115px 88px, 100px 95px, 10px 95px,
              2px 84px, 22px 42px, 35px 6px
            );
            border: 2px solid ${borderHighlight};
          }
          .water-polo-logo { position: absolute; left: 32px; top: 2px; z-index: 2; }
          .gun-barrel-title {
            position: absolute; left: 155px; top: 10px; font-size: 30px; font-weight: 900;
            font-style: italic; letter-spacing: 2px; color: #ffffff; text-transform: uppercase;
            white-space: nowrap; z-index: 2;
          }
          .rings-wrapper { position: absolute; right: 25px; top: 12px; z-index: 2; }
          
          .event-sub-bar {
            background: linear-gradient(90deg, #d1d5db 0%, #ffffff 50%, #e2e8f0 100%);
            color: #0a2a5e;
            padding: 0 30px 0 45px;
            clip-path: polygon(30px 0px, 100% 0px, 100% 100%, 0px 100%);
            border-radius: 0 0 4px 0;
            border: 1.2px solid rgba(0,34,62,0.4);
            margin-left: 110px;
            margin-top: -38px;
            width: 738px;
            height: 38px;
            position: relative;
            z-index: 1;
          }
          .event-sub-title {
            font-size: 22px;
            font-weight: 900;
            font-style: italic;
            letter-spacing: 1px;
            text-transform: uppercase;
          }

          .rows-container { display: flex; flex-direction: column; gap: 3px; margin-left: 17px; margin-top: 3px; }
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
          .team-name { font-size: 24px; font-weight: 900; font-style: italic; color: #ffffff; letter-spacing: 1px; white-space: nowrap; }
        </style>
      </head>
      <body>
        <div class="group-banner">
          <div class="event-gun-header">
            <div class="event-gun-body"></div>
            <div class="water-polo-logo">${officialWaterPoloPictographSVG}</div>
            <div class="gun-barrel-title">MEN'S WATER POLO</div>
            <div class="rings-wrapper">${olympicRingsSVG}</div>
          </div>
          
          <div class="event-sub-bar">
            <div class="event-sub-title unskew">${groupHeader}</div>
          </div>

          <div class="rows-container">
            ${rowsHTML}
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ── WP006 - Standings ──
  if (normId.includes('WP006') || normId === 'STANDINGS') {
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

    if (variantStr.includes('_b') || variantStr.endsWith('b') || variantStr.includes('variant b')) variant = 'b';
    else if (variantStr.includes('_c') || variantStr.endsWith('c') || variantStr.includes('variant c')) variant = 'c';
    else if (variantStr.includes('_a') || variantStr.endsWith('a') || variantStr.includes('variant a')) variant = 'a';

    const baseTop = 966 - 340; // 626

    let defaultRows = [];
    if (variant === 'a') {
      defaultRows = [
        { rank: '1', name: 'HUNGARY', noc: 'HUN', q: '', stats: [3, 0, 0, 6] },
        { rank: '2', name: 'SPAIN', noc: 'ESP', q: '', stats: [3, 0, 0, 6] },
        { rank: '3', name: 'MONTENEGRO', noc: 'MNE', q: '', stats: [2, 1, 0, 4] },
        { rank: '4', name: 'AUSTRALIA', noc: 'AUS', q: '', stats: [2, 1, 0, 4] },
        { rank: '5', name: 'GREECE', noc: 'GRE', q: '', stats: [0, 3, 0, 0] },
        { rank: '6', name: 'CANADA', noc: 'CAN', q: '', stats: [0, 3, 0, 0] }
      ];
    } else if (variant === 'b') {
      defaultRows = [
        { rank: '1', name: 'HUNGARY', noc: 'HUN', q: 'Q', stats: [4, 0, 1, 9] },
        { rank: '2', name: 'SPAIN', noc: 'ESP', q: 'Q', stats: [4, 1, 0, 8] },
        { rank: '3', name: 'MONTENEGRO', noc: 'MNE', q: 'Q', stats: [2, 1, 2, 6] },
        { rank: '4', name: 'AUSTRALIA', noc: 'AUS', q: 'Q', stats: [2, 2, 1, 5] },
        { rank: '5', name: 'GREECE', noc: 'GRE', q: '', stats: [1, 4, 0, 2] },
        { rank: '6', name: 'CANADA', noc: 'CAN', q: '', stats: [0, 5, 0, 0] }
      ];
    } else if (variant === 'c') {
      defaultRows = [
        { rank: '1', name: 'UNITED STATES', noc: 'USA', q: 'Q', stats: [4, 1, 0, 8] },
        { rank: '2', name: 'CROATIA', noc: 'CRO', q: 'Q', stats: [4, 1, 0, 8] },
        { rank: '3', name: 'SERBIA', noc: 'SRB', q: 'Q', stats: [3, 2, 0, 6] },
        { rank: '4', name: 'GERMANY', noc: 'GER', q: 'Q', stats: [2, 3, 0, 4] },
        { rank: '5', name: 'ITALY', noc: 'ITA', q: '', stats: [2, 3, 0, 4] },
        { rank: '', name: 'CHINA', noc: 'CHN', q: '', dsq: true }
      ];
    }

    const inputRows = (customData.rows && customData.rows.length > 0)
      ? customData.rows
      : (customData.standings && customData.standings.length > 0)
      ? customData.standings
      : null;

    const isGenericInputRows = inputRows && inputRows.length <= 5 &&
      inputRows.some(r => (r.name || '').toUpperCase().includes('CROATIA'));

    const finalRows = (!inputRows || isGenericInputRows) ? defaultRows : inputRows;
    const rowsList = finalRows.slice(0, 6);

    const rowsHTML = rowsList.map((row) => {
      const rowNoc = getNocCodeForTeam(row.name) || row.noc;
      const flagHtml = getFlagImgHtml(rowNoc, 'height: 28px; width: auto; border-radius: 2px; transform: skewX(-12deg);');
      return `
        <div class="team-row">
          <div class="row-left unskew">
            ${row.rank ? `<div class="rank-badge">${row.rank}</div>` : `<div class="rank-badge-placeholder"></div>`}
            <div class="flag-wrap">${flagHtml}</div>
            <div class="team-name">${row.name}</div>
          </div>
          <div class="row-right unskew">
            ${row.dsq ? `
              <div class="dsq-badge">DSQ</div>
            ` : `
              ${row.q === 'Q' ? `<div class="q-badge">Q</div>` : `<div class="q-badge-placeholder"></div>`}
              <div class="stats-values">
                <div class="stat-val">${row.stats ? row.stats[0] : 0}</div>
                <div class="stat-val">${row.stats ? row.stats[1] : 0}</div>
                <div class="stat-val">${row.stats ? row.stats[2] : 0}</div>
                <div class="stat-val font-pts">${row.stats ? row.stats[3] : 0}</div>
              </div>
            `}
          </div>
        </div>
      `;
    }).join('');

    const defaultHeader = variant === 'c' ? 'STANDINGS - GROUP B' : 'STANDINGS - GROUP A';
    const groupHeader = (customData.header || customData.event || defaultHeader).toUpperCase();

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,700;1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .group-banner { position: absolute; top: 514px; left: 328px; transform: scale(1.328); transform-origin: top left; display: flex; flex-direction: column; }
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
              45px 0px, 820px 0px, 848px 44px, 842px 54px,
              140px 54px, 115px 88px, 100px 95px, 10px 95px,
              2px 84px, 22px 42px, 35px 6px
            );
            border: 2px solid ${borderHighlight};
          }
          .water-polo-logo { position: absolute; left: 32px; top: 2px; z-index: 2; }
          .gun-barrel-title {
            position: absolute; left: 155px; top: 10px; font-size: 30px; font-weight: 900;
            font-style: italic; letter-spacing: 2px; color: #ffffff; text-transform: uppercase;
            white-space: nowrap; z-index: 2;
          }
          .rings-wrapper { position: absolute; right: 25px; top: 12px; z-index: 2; }
          
          .event-sub-bar {
            background: linear-gradient(90deg, #d1d5db 0%, #ffffff 50%, #e2e8f0 100%);
            color: #0a2a5e;
            padding: 0 30px 0 45px;
            clip-path: polygon(30px 0px, 100% 0px, 100% 100%, 0px 100%);
            border-radius: 0 0 4px 0;
            border: 1.2px solid rgba(0,34,62,0.4);
            margin-left: 110px;
            margin-top: -38px;
            width: 738px;
            height: 38px;
            position: relative;
            z-index: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .event-sub-title {
            font-size: 22px;
            font-weight: 900;
            font-style: italic;
            letter-spacing: 1px;
            text-transform: uppercase;
          }
          .t2-stats-headers { display: flex; gap: 16px; padding-right: 18px; }
          .t2-sh { font-size: 18px; font-weight: 900; font-style: italic; color: #0a2a5e; width: 32px; text-align: center; }

          .rows-container { display: flex; flex-direction: column; gap: 3px; margin-left: 17px; margin-top: 3px; }
          .team-row {
            height: 38px; width: 820px;
            background: linear-gradient(135deg, #091d36 0%, #0f2f57 50%, #071629 100%);
            border: 1px solid rgba(255,255,255,0.15); border-radius: 3px;
            transform: skewX(-12deg); display: flex; align-items: center; justify-content: space-between;
            padding: 0 12px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.5);
          }
          .row-left { display: flex; align-items: center; }
          .rank-badge {
            width: 28px; height: 28px; background: #d32f2f; border-radius: 2px;
            color: #ffffff; font-size: 20px; font-weight: 900; font-style: italic;
            display: flex; align-items: center; justify-content: center;
            margin-right: 10px; transform: skewX(-12deg);
          }
          .rank-badge-placeholder {
            width: 28px; height: 28px; margin-right: 10px;
          }
          .flag-wrap { display: flex; align-items: center; margin-right: 54px; }
          .team-name { font-size: 24px; font-weight: 900; font-style: italic; color: #ffffff; letter-spacing: 1px; white-space: nowrap; }
          
          .row-right { display: flex; align-items: center; }
          .q-badge {
            width: 28px; height: 28px; background: #2e7d32; border-radius: 2px;
            color: #ffffff; font-size: 18px; font-weight: 900; font-style: italic;
            display: flex; align-items: center; justify-content: center;
            margin-right: 20px; transform: skewX(-12deg);
          }
          .q-badge-placeholder {
            width: 28px; height: 28px; margin-right: 20px;
          }
          .stats-values { display: flex; gap: 16px; padding-right: 18px; }
          .stat-val { font-size: 24px; font-weight: 900; font-style: italic; color: #ffffff; width: 32px; text-align: center; }
          
          .dsq-badge {
            background: #ffffff; color: #091d36; font-size: 20px; font-weight: 900; font-style: italic;
            width: 176px; height: 28px; border-radius: 2px; display: flex; align-items: center; justify-content: center;
            transform: skewX(-12deg); margin-right: 18px;
          }
        </style>
      </head>
      <body>
        <div class="group-banner">
          <div class="event-gun-header">
            <div class="event-gun-body"></div>
            <div class="water-polo-logo">${officialWaterPoloPictographSVG}</div>
            <div class="gun-barrel-title">MEN'S WATER POLO</div>
            <div class="rings-wrapper">${olympicRingsSVG}</div>
          </div>
          
          <div class="event-sub-bar">
            <div class="event-sub-title unskew">${groupHeader}</div>
            <div class="t2-stats-headers unskew">
              <div class="t2-sh">W</div>
              <div class="t2-sh">L</div>
              <div class="t2-sh">T</div>
              <div class="t2-sh">PTS</div>
            </div>
          </div>

          <div class="rows-container">
            ${rowsHTML}
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ── WP007 - Team ID ──
  if (normId.includes('WP007') || normId === 'TEAM ID') {
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

    if (variantStr.includes('_b') || variantStr.endsWith('b') || variantStr.includes('variant b')) variant = 'b';
    else if (variantStr.includes('_a') || variantStr.endsWith('a') || variantStr.includes('variant a')) variant = 'a';

    const baseTop = 966 - 54; // 912

    const isGenericDummy = (customData.team1 || '').toUpperCase() === 'TOM DALEY' || 
                           (customData.teamA || '').toUpperCase() === 'TOM DALEY' || 
                           (customData.teamA || '').toUpperCase() === 'CROATIA' || 
                           (!customData.team1 && !customData.teamA);

    const teamName = isGenericDummy 
      ? (variant === 'b' ? 'CROATIA' : 'CHINA') 
      : (customData.team1 || customData.teamA || 'CHINA');

    const status = isGenericDummy
      ? (variant === 'b' ? 'DSQ' : '')
      : (customData.status || customData.score1 || customData.scoreA || '');

    const rowNoc = getNocCodeForTeam(teamName) || (variant === 'b' ? 'CRO' : 'CHN');
    const flagHtml = getFlagImgHtml(rowNoc, 'height: 28px; width: auto; border-radius: 2px; transform: skewX(-12deg);');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,700;1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .team-id-banner {
            position: absolute; top: 880px; left: 377px; width: 850px; height: 54px;
            background: linear-gradient(90deg, ${gradientStart} 0%, ${gradientMid} 45%, ${gradientEnd} 100%);
            border: 1.5px solid rgba(255,255,255,0.35); border-radius: 4px;
            transform: scale(1.136, 1.204) skewX(-12deg); transform-origin: top left; display: flex; align-items: center; justify-content: space-between;
            padding: 0 16px; box-shadow: 0 6px 16px rgba(0,0,0,0.6);
          }
          .unskew { transform: skewX(12deg); }
          .row-left { display: flex; align-items: center; }
          .flag-wrap { display: flex; align-items: center; margin-right: 48px; }
          .team-name { font-size: 30px; font-weight: 900; font-style: italic; color: #ffffff; letter-spacing: 2px; white-space: nowrap; }

          .row-right { display: flex; align-items: center; }
          .status-box {
            width: 80px; height: 32px;
            background: linear-gradient(135deg, #d1d5db 0%, #ffffff 50%, #e2e8f0 100%);
            border: 1.2px solid rgba(0,34,62,0.4); border-radius: 2px;
            transform: skewX(-12deg); display: flex; align-items: center; justify-content: center;
            font-size: 18px; font-weight: 900; font-style: italic; color: #0a2a5e;
            margin-right: 15px;
          }
          .unskew-text { transform: skewX(12deg); display: inline-block; }
        </style>
      </head>
      <body>
        <div class="team-id-banner">
          <div class="row-left unskew">
            <div class="flag-wrap">${flagHtml}</div>
            <div class="team-name">${teamName}</div>
          </div>
          <div class="row-right unskew">
            <div class="status-box"><span class="unskew-text">${status}</span></div>
            <div>${olympicRingsSVG}</div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ── WP008 - Team List ──
  if (normId.includes('WP008') || normId === 'TEAM LIST') {
    const baseTop = 966 - 425; // 541

    const isGenericDummy = (customData.team1 || '').toUpperCase() === 'TOM DALEY' || 
                           (customData.teamA || '').toUpperCase() === 'TOM DALEY' || 
                           (customData.teamA || '').toUpperCase() === 'CROATIA' || 
                           (!customData.team1 && !customData.teamA);

    const teamName = isGenericDummy ? 'HUNGARY' : (customData.team1 || customData.teamA || 'HUNGARY');
    const teamNoc = getNocCodeForTeam(teamName) || 'HUN';

    const flagHtml = getFlagImgHtml(teamNoc, 'height: 28px; width: auto; border-radius: 2px; transform: skewX(-12deg);');

    const defaultPlayers = [
      { capNumber: '1', name: 'ZOLTAN SZECSI', role: 'GK' },
      { capNumber: '2', name: 'TAMAS VARGA', role: '' },
      { capNumber: '3', name: 'NORBERT MADARAS', role: '' },
      { capNumber: '4', name: 'DENES ANDOR VARGA', role: '' },
      { capNumber: '5', name: 'TAMAS KASAS', role: '' },
      { capNumber: '6', name: 'NORBERT HOSNYANSZKY', role: '' },
      { capNumber: '7', name: 'GERGELY KISS', role: '' },
      { capNumber: '8', name: 'TIBOR BENEDEK', role: 'C' },
      { capNumber: '9', name: 'DANIEL RUDOLF VARGA', role: '' },
      { capNumber: '10', name: 'PETER BIROS', role: '' },
      { capNumber: '11', name: 'GABOR KIS', role: '' },
      { capNumber: '12', name: 'TAMAS MOLNAR', role: '' },
      { capNumber: '13', name: 'ISTVAN GERGELY', role: '' }
    ];
    const defaultCoach = 'DENES KEMENY';

    const inputPlayers = customData.players || defaultPlayers;
    const coachName = customData.coach || defaultCoach;

    let rowsHTML = '';
    for (let r = 0; r < 8; r++) {
      // Left player
      let leftColHTML = '';
      if (r < inputPlayers.length) {
        const p = inputPlayers[r];
        let roleBadge = '';
        if (p.role === 'GK') {
          roleBadge = `<span class="role-gk">GK</span>`;
        } else if (p.role === 'C') {
          roleBadge = `<span class="role-c">C</span>`;
        }

        leftColHTML = `
          <div class="col-half left-col">
            ${p.capNumber ? `<div class="player-num">${p.capNumber}</div>` : `<div class="player-num-placeholder"></div>`}
            <div class="player-name">${p.name} ${roleBadge}</div>
          </div>
        `;
      } else {
        leftColHTML = `<div class="col-half left-col"></div>`;
      }

      // Right player or coach
      let rightColHTML = '';
      const rightIdx = r + 8;
      if (r < 5) {
        if (rightIdx < inputPlayers.length) {
          const p = inputPlayers[rightIdx];
          let roleBadge = '';
          if (p.role === 'GK') {
            roleBadge = `<span class="role-gk">GK</span>`;
          } else if (p.role === 'C') {
            roleBadge = `<span class="role-c">C</span>`;
          }

          rightColHTML = `
            <div class="col-half right-col">
              ${p.capNumber ? `<div class="player-num">${p.capNumber}</div>` : `<div class="player-num-placeholder"></div>`}
              <div class="player-name">${p.name} ${roleBadge}</div>
            </div>
          `;
        } else {
          rightColHTML = `<div class="col-half right-col"></div>`;
        }
      } else if (r === 6) {
        rightColHTML = `
          <div class="col-half right-col">
            <div class="player-num-placeholder"></div>
            <div class="coach-label">COACH</div>
          </div>
        `;
      } else if (r === 7) {
        rightColHTML = `
          <div class="col-half right-col">
            <div class="player-num-placeholder"></div>
            <div class="coach-name">${coachName}</div>
          </div>
        `;
      }

      rowsHTML += `
        <div class="team-list-row">
          <div class="row-content unskew">
            ${leftColHTML}
            ${rightColHTML}
          </div>
        </div>
      `;
    }

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,700;1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .team-list-banner { position: absolute; top: 398px; left: 313px; transform: scale(1.497, 1.297); transform-origin: top left; display: flex; flex-direction: column; }
          .team-id-banner {
            width: 850px; height: 54px;
            background: linear-gradient(90deg, ${gradientStart} 0%, ${gradientMid} 45%, ${gradientEnd} 100%);
            border: 1.5px solid rgba(255,255,255,0.35); border-radius: 4px;
            transform: skewX(-12deg); display: flex; align-items: center; justify-content: space-between;
            padding: 0 16px; box-shadow: 0 6px 16px rgba(0,0,0,0.6);
          }
          .unskew { transform: skewX(12deg); }
          .row-left { display: flex; align-items: center; }
          .flag-wrap { display: flex; align-items: center; margin-right: 48px; }
          .team-name { font-size: 30px; font-weight: 900; font-style: italic; color: #ffffff; letter-spacing: 2px; white-space: nowrap; }

          .row-right { display: flex; align-items: center; }
          .status-box {
            width: 80px; height: 32px;
            background: linear-gradient(135deg, #d1d5db 0%, #ffffff 50%, #e2e8f0 100%);
            border: 1.2px solid rgba(0,34,62,0.4); border-radius: 2px;
            transform: skewX(-12deg); display: flex; align-items: center; justify-content: center;
            margin-right: 15px;
          }

          .event-sub-bar {
            background: linear-gradient(90deg, #c8d8ea 0%, #dce8f5 50%, #b8cce0 100%);
            color: #0a2a5e;
            padding: 0 24px;
            clip-path: polygon(17px 0px, 100% 0px, 100% 100%, 0px 100%);
            border-radius: 0 0 4px 0;
            border: 1.2px solid rgba(0,34,62,0.4);
            margin-left: 17px;
            margin-top: 2px;
            width: 820px;
            height: 38px;
            display: flex;
            align-items: center;
          }
          .event-sub-title {
            font-size: 22px;
            font-weight: 900;
            font-style: italic;
            letter-spacing: 2px;
            text-transform: uppercase;
            padding-left: 12px;
          }

          .rows-container { display: flex; flex-direction: column; gap: 3px; margin-left: 17px; margin-top: 3px; }
          .team-list-row {
            height: 38px; width: 820px;
            background: linear-gradient(135deg, #091d36 0%, #0f2f57 50%, #071629 100%);
            border: 1px solid rgba(255,255,255,0.15); border-radius: 3px;
            transform: skewX(-12deg); display: flex; align-items: center;
            box-shadow: 0 4px 10px rgba(0,0,0,0.5);
          }
          .row-content { display: flex; width: 100%; height: 100%; align-items: center; padding: 0 12px; }
          
          .col-half { display: flex; align-items: center; width: 50%; }
          .player-num {
            width: 24px; height: 26px; background: #0055a5; border-radius: 2px;
            color: #ffffff; font-size: 16px; font-weight: 900; display: flex;
            align-items: center; justify-content: center; transform: skewX(-12deg);
            margin-right: 12px;
          }
          .player-num-placeholder {
            width: 24px; height: 26px; margin-right: 12px;
          }
          .player-name { font-size: 18px; font-weight: 900; font-style: italic; color: #ffffff; white-space: nowrap; }
          
          .role-gk { font-size: 14px; font-weight: 900; color: #00ccff; margin-left: 8px; font-style: italic; }
          .role-c {
            font-size: 14px; font-weight: 900; color: #ffffff; background: #0055a5;
            padding: 1px 5px; border-radius: 2px; margin-left: 8px; transform: skewX(-12deg);
            display: inline-block;
          }

          .coach-label { font-size: 18px; font-weight: 900; font-style: italic; color: #dfa63b; }
          .coach-name { font-size: 18px; font-weight: 900; font-style: italic; color: #ffffff; }
        </style>
      </head>
      <body>
        <div class="team-list-banner">
          <div class="team-id-banner">
            <div class="row-left unskew">
              <div class="flag-wrap">${flagHtml}</div>
              <div class="team-name">${teamName}</div>
            </div>
            <div class="row-right unskew">
              <div class="status-box"></div>
              <div>${olympicRingsSVG}</div>
            </div>
          </div>
          
          <div class="event-sub-bar">
            <div class="event-sub-title unskew">TEAM LIST</div>
          </div>

          <div class="rows-container">
            ${rowsHTML}
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ── WP009 - Previous Results ──
  if (normId.includes('WP009') || normId === 'PREVIOUS RESULTS') {
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

    if (variantStr.includes('_b') || variantStr.endsWith('b') || variantStr.includes('variant b')) variant = 'b';
    else if (variantStr.includes('_a') || variantStr.endsWith('a') || variantStr.includes('variant a')) variant = 'a';

    const baseLeft = 328;

    const isGenericDummy = (customData.team1 || '').toUpperCase() === 'TOM DALEY' || 
                           (customData.teamA || '').toUpperCase() === 'TOM DALEY' || 
                           (customData.teamA || '').toUpperCase() === 'CROATIA' || 
                           (!customData.team1 && !customData.teamA);

    const teamName = isGenericDummy 
      ? (variant === 'b' ? 'UNITED STATES' : 'HUNGARY') 
      : (customData.team1 || customData.teamA || 'HUNGARY');

    const record = isGenericDummy
      ? (variant === 'b' ? '(6 - 1 - 0)' : '(4 - 0 - 1)')
      : (customData.record || '');

    const headerText = record ? `${teamName.toUpperCase()} ${record}` : teamName.toUpperCase();
    const teamNoc = getNocCodeForTeam(teamName) || (variant === 'b' ? 'USA' : 'HUN');
    const flagHtml = getFlagImgHtml(teamNoc, 'height: 28px; width: auto; border-radius: 2px; transform: skewX(-12deg);');

    const defaultRowsA = [
      { name: 'Montenegro', phase: 'GROUP A', score: '10-10', outcome: 'D' },
      { name: 'Greece', phase: 'GROUP A', score: '17-6', outcome: 'W' },
      { name: 'Spain', phase: 'GROUP A', score: '8-5', outcome: 'W' },
      { name: 'Australia', phase: 'GROUP A', score: '13-12', outcome: 'W' },
      { name: 'Canada', phase: 'GROUP A', score: '12-3', outcome: 'W' }
    ];

    const defaultRowsB = [
      { name: 'China', phase: 'GROUP B', score: '8-4', outcome: 'W' },
      { name: 'Italy', phase: 'GROUP B', score: '12-11', outcome: 'W' },
      { name: 'Serbia', phase: 'GROUP B', score: '2-4', outcome: 'L' },
      { name: 'Croatia', phase: 'GROUP B', score: '7-5', outcome: 'W' },
      { name: 'Germany', phase: 'GROUP B', score: '8-7', outcome: 'W' },
      { name: 'Australia', phase: 'QF', score: '17-16', outcome: 'W' },
      { name: 'Serbia', phase: 'SF', score: 'DSQ', outcome: 'W' }
    ];

    const rowsData = customData.rows || (variant === 'b' ? defaultRowsB : defaultRowsA);

    const rowCount = rowsData.length;
    const rowsHeight = rowCount * 38 + (rowCount - 1) * 3;
    const totalHeight = 54 + 2 + 38 + 3 + rowsHeight;
    const baseTop = 966 - totalHeight;

    let rowsHTML = '';
    for (let r = 0; r < rowCount; r++) {
      const row = rowsData[r];
      const rowNoc = getNocCodeForTeam(row.name) || 'HUN';
      const rowFlagHtml = getFlagImgHtml(rowNoc, 'height: 28px; width: auto; border-radius: 2px; transform: skewX(-12deg);');

      rowsHTML += `
        <div class="prev-results-row">
          <div class="row-content unskew">
            <div class="row-left">
              <div class="flag-wrap">${rowFlagHtml}</div>
              <div class="team-name">${row.name}</div>
            </div>
            <div class="row-right">
              <div class="phase-col">${row.phase}</div>
              <div class="score-col">${row.score}</div>
              <div class="outcome-col">${row.outcome}</div>
            </div>
          </div>
        </div>
      `;
    }

    const finalLeft = variant === 'b' ? 330 : 313;
    const finalTop = variant === 'b' ? 455 : 566;

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,700;1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .prev-results-banner { position: absolute; top: ${finalTop}px; left: ${finalLeft}px; transform: scale(1.495, 1.327); transform-origin: top left; display: flex; flex-direction: column; }
          .team-id-banner {
            width: 850px; height: 54px;
            background: linear-gradient(90deg, ${gradientStart} 0%, ${gradientMid} 45%, ${gradientEnd} 100%);
            border: 1.5px solid rgba(255,255,255,0.35); border-radius: 4px;
            transform: skewX(-12deg); display: flex; align-items: center; justify-content: space-between;
            padding: 0 16px; box-shadow: 0 6px 16px rgba(0,0,0,0.6);
          }
          .unskew { transform: skewX(12deg); }
          .row-left { display: flex; align-items: center; }
          .flag-wrap { display: flex; align-items: center; margin-right: 48px; }
          .team-name { font-size: 30px; font-weight: 900; font-style: italic; color: #ffffff; letter-spacing: 2px; white-space: nowrap; }

          .row-right { display: flex; align-items: center; }
          .status-box {
            width: 80px; height: 32px;
            background: ${variant === 'b' ? 'transparent' : 'linear-gradient(135deg, #d1d5db 0%, #ffffff 50%, #e2e8f0 100%)'};
            border: 1.2px solid ${variant === 'b' ? '#ffffff' : 'rgba(0,34,62,0.4)'};
            border-radius: 2px;
            transform: skewX(-12deg); display: flex; align-items: center; justify-content: center;
            margin-right: 15px;
          }

          .event-sub-bar {
            background: linear-gradient(90deg, #c8d8ea 0%, #dce8f5 50%, #b8cce0 100%);
            color: #0a2a5e;
            padding: 0 24px;
            clip-path: polygon(17px 0px, 100% 0px, 100% 100%, 0px 100%);
            border-radius: 0 0 4px 0;
            border: 1.2px solid rgba(0,34,62,0.4);
            margin-left: 17px;
            margin-top: 2px;
            width: 820px;
            height: 38px;
            display: flex;
            align-items: center;
          }
          .event-sub-title {
            font-size: 22px;
            font-weight: 900;
            font-style: italic;
            letter-spacing: 2px;
            text-transform: uppercase;
            padding-left: 12px;
          }

          .rows-container { display: flex; flex-direction: column; gap: 3px; margin-left: 17px; margin-top: 3px; }
          .prev-results-row {
            height: 38px; width: 820px;
            background: linear-gradient(135deg, #091d36 0%, #0f2f57 50%, #071629 100%);
            border: 1px solid rgba(255,255,255,0.15); border-radius: 3px;
            transform: skewX(-12deg); display: flex; align-items: center;
            box-shadow: 0 4px 10px rgba(0,0,0,0.5);
          }
          .row-content { display: flex; width: 100%; height: 100%; align-items: center; justify-content: space-between; padding: 0 12px; }
          
          .phase-col { font-size: 22px; font-weight: 900; font-style: italic; color: #c8d8ea; width: 230px; text-align: right; margin-right: 25px; }
          .score-col { font-size: 24px; font-weight: 900; font-style: italic; color: #ffffff; width: 80px; text-align: center; margin-right: 25px; }
          .outcome-col { font-size: 24px; font-weight: 900; font-style: italic; color: #ffffff; width: 40px; text-align: center; }
        </style>
      </head>
      <body>
        <div class="prev-results-banner">
          <div class="team-id-banner">
            <div class="row-left unskew">
              <div class="flag-wrap">${flagHtml}</div>
              <div class="team-name">${headerText}</div>
            </div>
            <div class="row-right unskew">
              <div class="status-box"></div>
              <div>${olympicRingsSVG}</div>
            </div>
          </div>
          
          <div class="event-sub-bar">
            <div class="event-sub-title unskew">PREVIOUS RESULTS</div>
          </div>

          <div class="rows-container">
            ${rowsHTML}
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ── WP010 - Player ID ──
  if (normId.includes('WP010') || normId === 'PLAYER ID') {
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

    if (variantStr.includes('_d') || variantStr.endsWith('d') || variantStr.includes('variant d')) variant = 'd';
    else if (variantStr.includes('_c') || variantStr.endsWith('c') || variantStr.includes('variant c')) variant = 'c';
    else if (variantStr.includes('_b') || variantStr.endsWith('b') || variantStr.includes('variant b')) variant = 'b';
    else if (variantStr.includes('_a') || variantStr.endsWith('a') || variantStr.includes('variant a')) variant = 'a';

    const baseLeft = 328;

    // Default data mapping
    const isGenericDummy = (customData.playerName || '').toUpperCase() === 'TOM DALEY' || 
                           (customData.name || '').toUpperCase() === 'TOM DALEY' || 
                           (customData.name || '').toUpperCase() === 'NORBERT HOSNYANSZKY' || 
                           (!customData.playerName && !customData.name);

    let teamName = 'HUNGARY';
    let capNumber = '6';
    let playerName = 'NORBERT HOSNYANSZKY';
    let status = '';
    let subText = '';

    if (isGenericDummy) {
      if (variant === 'b') {
        status = 'DSQ';
      } else if (variant === 'c') {
        subText = 'EXCLUSION WITH SUBSTITUTION';
      } else if (variant === 'd') {
        teamName = 'UNITED STATES';
        capNumber = '11';
        playerName = 'JESSE SMITH';
        subText = 'EXCLUSION WITH SUBSTITUTION AFTER 4 MINUTES';
      }
    } else {
      teamName = customData.team1 || customData.teamA || 'HUNGARY';
      capNumber = customData.capNumber || customData.number || '6';
      playerName = customData.playerName || customData.name || 'NORBERT HOSNYANSZKY';
      status = customData.status || '';
      subText = customData.subText || customData.remarks || '';
    }

    const hasSubBar = !!subText;
    const totalHeight = hasSubBar ? (54 + 2 + 38) : 54;
    const baseTop = 966 - totalHeight;

    const teamNoc = getNocCodeForTeam(teamName) || (variant === 'd' ? 'USA' : 'HUN');
    const flagHtml = getFlagImgHtml(teamNoc, 'height: 28px; width: auto; border-radius: 2px; transform: skewX(-12deg);');

    let finalLeft = 328;
    let finalTop = baseTop;
    let transformStr = '';

    if (variant === 'd') {
      finalLeft = 360;
      finalTop = 827;
      transformStr = 'transform: scale(1.436, 1.440); transform-origin: top left;';
    } else if (variant === 'c') {
      finalLeft = 352;
      finalTop = 838;
      transformStr = 'transform: scale(1.440, 1.361); transform-origin: top left;';
    } else if (variant === 'a' || variant === 'b') {
      finalLeft = 360;
      finalTop = 878;
      transformStr = 'transform: scale(1.427, 1.474); transform-origin: top left;';
    }

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,700;1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .player-banner { position: absolute; top: ${finalTop}px; left: ${finalLeft}px; ${transformStr} display: flex; flex-direction: column; }
          .team-id-banner {
            width: 850px; height: 54px;
            background: linear-gradient(90deg, ${gradientStart} 0%, ${gradientMid} 45%, ${gradientEnd} 100%);
            border: 1.5px solid rgba(255,255,255,0.35); border-radius: 4px;
            transform: skewX(-12deg); display: flex; align-items: center; justify-content: space-between;
            padding: 0 16px; box-shadow: 0 6px 16px rgba(0,0,0,0.6);
          }
          .unskew { transform: skewX(12deg); }
          .row-left { display: flex; align-items: center; }
          .flag-wrap { display: flex; align-items: center; margin-right: 48px; }
          
          .cap-number { font-size: 30px; font-weight: 900; font-style: italic; color: #00ccff; margin-right: 15px; }
          .player-name { font-size: 30px; font-weight: 900; font-style: italic; color: #ffffff; letter-spacing: 2px; white-space: nowrap; }

          .row-right { display: flex; align-items: center; }
          .status-box {
            width: 80px; height: 32px;
            background: ${variant === 'd' ? 'transparent' : 'linear-gradient(135deg, #d1d5db 0%, #ffffff 50%, #e2e8f0 100%)'};
            border: 1.2px solid ${variant === 'd' ? '#ffffff' : 'rgba(0,34,62,0.4)'};
            border-radius: 2px;
            transform: skewX(-12deg); display: flex; align-items: center; justify-content: center;
            font-size: 18px; font-weight: 900; font-style: italic; color: #0a2a5e;
            margin-right: 15px;
          }
          .unskew-text { transform: skewX(12deg); display: inline-block; }

          .event-sub-bar {
            background: linear-gradient(135deg, #091d36 0%, #0f2f57 50%, #071629 100%);
            border: 1px solid rgba(255,255,255,0.15);
            margin-left: 17px;
            margin-top: 2px;
            width: 820px;
            height: 38px;
            display: flex;
            align-items: center;
            padding-left: 12px;
          }
          .event-sub-title {
            font-size: 18px;
            font-weight: 900;
            font-style: italic;
            color: #ffffff;
            letter-spacing: 1px;
            text-transform: uppercase;
          }
        </style>
      </head>
      <body>
        <div class="player-banner">
          <div class="team-id-banner">
            <div class="row-left unskew">
              <div class="flag-wrap">${flagHtml}</div>
              <div class="cap-number">${capNumber}</div>
              <div class="player-name">${playerName}</div>
            </div>
            <div class="row-right unskew">
              <div class="status-box"><span class="unskew-text">${status}</span></div>
              <div>${olympicRingsSVG}</div>
            </div>
          </div>
          
          ${hasSubBar ? `
          <div class="event-sub-bar">
            <div class="event-sub-title unskew">${subText}</div>
          </div>
          ` : ''}
        </div>
      </body>
      </html>
    `;
  }

  // ── WP011 - Major Fouls ID ──
  if (normId.includes('WP011') || normId === 'MAJOR FOULS ID') {
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

    if (variantStr.includes('_b') || variantStr.endsWith('b') || variantStr.includes('variant b')) variant = 'b';
    else if (variantStr.includes('_a') || variantStr.endsWith('a') || variantStr.includes('variant a')) variant = 'a';

    const baseLeft = 328;
    const baseTop = 966 - 94; // 872

    // Default data mapping
    const isGenericDummy = (customData.playerName || '').toUpperCase() === 'TOM DALEY' || 
                           (customData.name || '').toUpperCase() === 'TOM DALEY' || 
                           (customData.name || '').toUpperCase() === 'NORBERT HOSNYANSZKY' || 
                           (!customData.playerName && !customData.name);

    let teamName = 'SERBIA';
    let capNumber = '6';
    let playerName = 'DUSKO PIJETLOVIC';
    let fouls = 1;

    if (isGenericDummy) {
      if (variant === 'b') {
        teamName = 'MONTENEGRO';
        capNumber = '6';
        playerName = 'MILAN TICIC';
        fouls = 3;
      }
    } else {
      teamName = customData.team1 || customData.teamA || 'SERBIA';
      capNumber = customData.capNumber || customData.number || '6';
      playerName = customData.playerName || customData.name || 'DUSKO PIJETLOVIC';
      fouls = parseInt(customData.fouls !== undefined ? customData.fouls : 1, 10);
    }

    const teamNoc = getNocCodeForTeam(teamName) || (variant === 'b' ? 'MNE' : 'SRB');
    const flagHtml = getFlagImgHtml(teamNoc, 'height: 28px; width: auto; border-radius: 2px; transform: skewX(-12deg);');

    let foulBadgesHTML = '';
    for (let f = 0; f < fouls; f++) {
      foulBadgesHTML += `<div class="foul-box"><span class="unskew-text">X</span></div>`;
    }

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,700;1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .fouls-banner { position: absolute; top: 831px; left: 364px; transform: scale(1.425, 1.302); transform-origin: top left; display: flex; flex-direction: column; }
          .team-id-banner {
            width: 850px; height: 54px;
            background: linear-gradient(90deg, ${gradientStart} 0%, ${gradientMid} 45%, ${gradientEnd} 100%);
            border: 1.5px solid rgba(255,255,255,0.35); border-radius: 4px;
            transform: skewX(-12deg); display: flex; align-items: center; justify-content: space-between;
            padding: 0 16px; box-shadow: 0 6px 16px rgba(0,0,0,0.6);
          }
          .unskew { transform: skewX(12deg); }
          .row-left { display: flex; align-items: center; }
          .flag-wrap { display: flex; align-items: center; margin-right: 48px; }
          
          .cap-number { font-size: 30px; font-weight: 900; font-style: italic; color: #00ccff; margin-right: 15px; }
          .player-name { font-size: 30px; font-weight: 900; font-style: italic; color: #ffffff; letter-spacing: 2px; white-space: nowrap; }

          .row-right { display: flex; align-items: center; }
          .status-box {
            width: 80px; height: 32px;
            background: linear-gradient(135deg, #d1d5db 0%, #ffffff 50%, #e2e8f0 100%);
            border: 1.2px solid rgba(0,34,62,0.4);
            border-radius: 2px;
            transform: skewX(-12deg); display: flex; align-items: center; justify-content: center;
            margin-right: 15px;
          }
          .unskew-text { transform: skewX(12deg); display: inline-block; }

          .event-sub-bar {
            background: linear-gradient(135deg, #091d36 0%, #0f2f57 50%, #071629 100%);
            border: 1px solid rgba(255,255,255,0.15);
            margin-left: 17px;
            margin-top: 2px;
            width: 820px;
            height: 38px;
            display: flex;
            align-items: center;
            padding-left: 12px;
          }
          .event-sub-title {
            font-size: 18px;
            font-weight: 900;
            font-style: italic;
            color: #ffffff;
            letter-spacing: 1px;
            text-transform: uppercase;
            margin-right: 20px;
          }
          .fouls-container { display: flex; gap: 6px; }
          .foul-box {
            width: 24px; height: 24px; background: #d32f2f; border-radius: 2px;
            color: #ffffff; font-size: 15px; font-weight: 900; display: flex;
            align-items: center; justify-content: center; transform: skewX(-12deg);
          }
        </style>
      </head>
      <body>
        <div class="fouls-banner">
          <div class="team-id-banner">
            <div class="row-left unskew">
              <div class="flag-wrap">${flagHtml}</div>
              <div class="cap-number">${capNumber}</div>
              <div class="player-name">${playerName}</div>
            </div>
            <div class="row-right unskew">
              <div class="status-box"></div>
              <div>${olympicRingsSVG}</div>
            </div>
          </div>
          
          <div class="event-sub-bar">
            <div class="event-sub-title unskew">MAJOR FOULS</div>
            <div class="fouls-container">
              ${foulBadgesHTML}
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ── WP012 - Captain/Goalkeeper ID ──
  if (normId.includes('WP012') || normId === 'CAPTAIN GOALKEEPER ID') {
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

    if (variantStr.includes('_b') || variantStr.endsWith('b') || variantStr.includes('variant b')) variant = 'b';
    else if (variantStr.includes('_a') || variantStr.endsWith('a') || variantStr.includes('variant a')) variant = 'a';

    const baseLeft = 328;
    const baseTop = 966 - 94; // 872

    // Default data mapping
    const isGenericDummy = (customData.playerName || '').toUpperCase() === 'TOM DALEY' || 
                           (customData.name || '').toUpperCase() === 'TOM DALEY' || 
                           (customData.name || '').toUpperCase() === 'NORBERT HOSNYANSZKY' || 
                           (!customData.playerName && !customData.name);

    let teamName = 'AUSTRALIA';
    let capNumber = '1';
    let playerName = 'JAMES STANTON';
    let role = 'GOALKEEPER';

    if (isGenericDummy) {
      if (variant === 'b') {
        teamName = 'AUSTRALIA';
        capNumber = '9';
        playerName = 'THOMAS WHALAN';
        role = 'CAPTAIN';
      }
    } else {
      teamName = customData.team1 || customData.teamA || 'AUSTRALIA';
      capNumber = customData.capNumber || customData.number || '1';
      playerName = customData.playerName || customData.name || 'JAMES STANTON';
      role = customData.role || customData.subText || 'GOALKEEPER';
    }

    const teamNoc = getNocCodeForTeam(teamName) || 'AUS';
    const flagHtml = getFlagImgHtml(teamNoc, 'height: 28px; width: auto; border-radius: 2px; transform: skewX(-12deg);');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,700;1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .captain-banner { position: absolute; top: 840px; left: 358px; transform: scale(1.434, 1.341); transform-origin: top left; display: flex; flex-direction: column; }
          .team-id-banner {
            width: 850px; height: 54px;
            background: linear-gradient(90deg, ${gradientStart} 0%, ${gradientMid} 45%, ${gradientEnd} 100%);
            border: 1.5px solid rgba(255,255,255,0.35); border-radius: 4px;
            transform: skewX(-12deg); display: flex; align-items: center; justify-content: space-between;
            padding: 0 16px; box-shadow: 0 6px 16px rgba(0,0,0,0.63);
          }
          .unskew { transform: skewX(12deg); }
          .row-left { display: flex; align-items: center; }
          .flag-wrap { display: flex; align-items: center; margin-right: 48px; }
          
          .cap-number { font-size: 30px; font-weight: 900; font-style: italic; color: #00ccff; margin-right: 15px; }
          .player-name { font-size: 30px; font-weight: 900; font-style: italic; color: #ffffff; letter-spacing: 2px; white-space: nowrap; }

          .row-right { display: flex; align-items: center; }
          .status-box {
            width: 80px; height: 32px;
            background: linear-gradient(135deg, #d1d5db 0%, #ffffff 50%, #e2e8f0 100%);
            border: 1.2px solid rgba(0,34,62,0.4);
            border-radius: 2px;
            transform: skewX(-12deg); display: flex; align-items: center; justify-content: center;
            margin-right: 15px;
          }
          .unskew-text { transform: skewX(12deg); display: inline-block; }

          .event-sub-bar {
            background: linear-gradient(135deg, #091d36 0%, #0f2f57 50%, #071629 100%);
            border: 1px solid rgba(255,255,255,0.15);
            margin-left: 17px;
            margin-top: 2px;
            width: 820px;
            height: 38px;
            display: flex;
            align-items: center;
            padding-left: 12px;
          }
          .event-sub-title {
            font-size: 18px;
            font-weight: 900;
            font-style: italic;
            color: #ffffff;
            letter-spacing: 1px;
            text-transform: uppercase;
          }
        </style>
      </head>
      <body>
        <div class="captain-banner">
          <div class="team-id-banner">
            <div class="row-left unskew">
              <div class="flag-wrap">${flagHtml}</div>
              <div class="cap-number">${capNumber}</div>
              <div class="player-name">${playerName}</div>
            </div>
            <div class="row-right unskew">
              <div class="status-box"></div>
              <div>${olympicRingsSVG}</div>
            </div>
          </div>
          
          <div class="event-sub-bar">
            <div class="event-sub-title unskew">${role}</div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ── WP013 - Coach ID ──
  if (normId.includes('WP013') || normId === 'COACH ID') {
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

    if (variantStr.includes('_b') || variantStr.endsWith('b') || variantStr.includes('variant b')) variant = 'b';
    else if (variantStr.includes('_a') || variantStr.endsWith('a') || variantStr.includes('variant a')) variant = 'a';

    const baseLeft = 328;
    const baseTop = 966 - 94; // 872

    // Default data mapping
    const isGenericDummy = (customData.playerName || '').toUpperCase() === 'TOM DALEY' || 
                           (customData.name || '').toUpperCase() === 'TOM DALEY' || 
                           (customData.name || '').toUpperCase() === 'NORBERT HOSNYANSZKY' || 
                           (customData.coachName || '').toUpperCase() === 'JOHN FOX' ||
                           (!customData.playerName && !customData.name && !customData.coachName);

    let teamName = 'AUSTRALIA';
    let coachName = 'JOHN FOX';
    let card = '';

    if (isGenericDummy) {
      if (variant === 'b') {
        teamName = 'AUSTRALIA';
        coachName = 'JOHN FOX';
        card = 'red';
      }
    } else {
      teamName = customData.team1 || customData.teamA || 'AUSTRALIA';
      coachName = customData.coachName || customData.playerName || customData.name || 'JOHN FOX';
      card = (customData.card || '').toLowerCase(); // 'red', 'yellow' or ''
    }

    const teamNoc = getNocCodeForTeam(teamName) || 'AUS';
    const flagHtml = getFlagImgHtml(teamNoc, 'height: 28px; width: auto; border-radius: 2px; transform: skewX(-12deg);');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,700;1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .coach-banner { position: absolute; top: 827px; left: 364px; transform: scale(1.427, 1.440); transform-origin: top left; display: flex; flex-direction: column; }
          .team-id-banner {
            width: 850px; height: 54px;
            background: linear-gradient(90deg, ${gradientStart} 0%, ${gradientMid} 45%, ${gradientEnd} 100%);
            border: 1.5px solid rgba(255,255,255,0.35); border-radius: 4px;
            transform: skewX(-12deg); display: flex; align-items: center; justify-content: space-between;
            padding: 0 16px; box-shadow: 0 6px 16px rgba(0,0,0,0.6);
          }
          .unskew { transform: skewX(12deg); }
          .row-left { display: flex; align-items: center; }
          .flag-wrap { display: flex; align-items: center; margin-right: 48px; }
          
          .coach-name-txt { font-size: 30px; font-weight: 900; font-style: italic; color: #ffffff; letter-spacing: 2px; white-space: nowrap; }

          .row-right { display: flex; align-items: center; }
          .card-badge {
            width: 18px; height: 28px;
            background: ${card === 'red' ? '#d32f2f' : '#ffc107'};
            border-radius: 2px; transform: skewX(-12deg);
            margin-right: 12px; box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          }
          .status-box {
            width: 80px; height: 32px;
            background: linear-gradient(135deg, #d1d5db 0%, #ffffff 50%, #e2e8f0 100%);
            border: 1.2px solid rgba(0,34,62,0.4);
            border-radius: 2px;
            transform: skewX(-12deg); display: flex; align-items: center; justify-content: center;
            margin-right: 15px;
          }
          .unskew-text { transform: skewX(12deg); display: inline-block; }

          .event-sub-bar {
            background: linear-gradient(135deg, #091d36 0%, #0f2f57 50%, #071629 100%);
            border: 1px solid rgba(255,255,255,0.15);
            margin-left: 17px;
            margin-top: 2px;
            width: 820px;
            height: 38px;
            display: flex;
            align-items: center;
            padding-left: 12px;
          }
          .event-sub-title {
            font-size: 18px;
            font-weight: 900;
            font-style: italic;
            color: #ffffff;
            letter-spacing: 1px;
            text-transform: uppercase;
          }
        </style>
      </head>
      <body>
        <div class="coach-banner">
          <div class="team-id-banner">
            <div class="row-left unskew">
              <div class="flag-wrap">${flagHtml}</div>
              <div class="coach-name-txt">${coachName}</div>
            </div>
            <div class="row-right unskew">
              ${(card === 'red' || card === 'yellow') ? `<div class="card-badge"></div>` : ''}
              <div class="status-box"></div>
              <div>${olympicRingsSVG}</div>
            </div>
          </div>
          
          <div class="event-sub-bar">
            <div class="event-sub-title unskew">COACH</div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ── WP014 - Official ID ──
  if (normId.includes('WP014') || normId === 'OFFICIAL ID') {
    const baseLeft = 328;
    const baseTop = 966 - 94; // 872

    // Default data mapping
    const isGenericDummy = (customData.playerName || '').toUpperCase() === 'TOM DALEY' || 
                           (customData.name || '').toUpperCase() === 'TOM DALEY' || 
                           (customData.name || '').toUpperCase() === 'NORBERT HOSNYANSZKY' || 
                           (customData.officialName || '').toUpperCase() === 'GABOR KISZELLY' ||
                           (!customData.playerName && !customData.name && !customData.officialName);

    let teamName = 'HUNGARY';
    let officialName = 'GABOR KISZELLY';
    let role = 'REFEREE';

    if (isGenericDummy) {
      teamName = 'HUNGARY';
      officialName = 'GABOR KISZELLY';
      role = 'REFEREE';
    } else {
      teamName = customData.team1 || customData.teamA || 'HUNGARY';
      officialName = customData.officialName || customData.playerName || customData.name || 'GABOR KISZELLY';
      role = customData.role || customData.subText || 'REFEREE';
    }

    const teamNoc = getNocCodeForTeam(teamName) || 'HUN';
    const flagHtml = getFlagImgHtml(teamNoc, 'height: 28px; width: auto; border-radius: 2px; transform: skewX(-12deg);');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,700;1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .official-banner { position: absolute; top: 846px; left: 358px; transform: scale(1.425, 1.282); transform-origin: top left; display: flex; flex-direction: column; }
          .team-id-banner {
            width: 850px; height: 54px;
            background: linear-gradient(90deg, ${gradientStart} 0%, ${gradientMid} 45%, ${gradientEnd} 100%);
            border: 1.5px solid rgba(255,255,255,0.35); border-radius: 4px;
            transform: skewX(-12deg); display: flex; align-items: center; justify-content: space-between;
            padding: 0 16px; box-shadow: 0 6px 16px rgba(0,0,0,0.6);
          }
          .unskew { transform: skewX(12deg); }
          .row-left { display: flex; align-items: center; }
          .flag-wrap { display: flex; align-items: center; margin-right: 48px; }
          
          .official-name-txt { font-size: 30px; font-weight: 900; font-style: italic; color: #ffffff; letter-spacing: 2px; white-space: nowrap; }

          .row-right { display: flex; align-items: center; }

          .event-sub-bar {
            background: linear-gradient(135deg, #091d36 0%, #0f2f57 50%, #071629 100%);
            border: 1px solid rgba(255,255,255,0.15);
            margin-left: 17px;
            margin-top: 2px;
            width: 820px;
            height: 38px;
            display: flex;
            align-items: center;
            padding-left: 12px;
          }
          .event-sub-title {
            font-size: 18px;
            font-weight: 900;
            font-style: italic;
            color: #ffffff;
            letter-spacing: 1px;
            text-transform: uppercase;
          }
        </style>
      </head>
      <body>
        <div class="official-banner">
          <div class="team-id-banner">
            <div class="row-left unskew">
              <div class="flag-wrap">${flagHtml}</div>
              <div class="official-name-txt">${officialName}</div>
            </div>
            <div class="row-right unskew">
              <div>${olympicRingsSVG}</div>
            </div>
          </div>
          
          <div class="event-sub-bar">
            <div class="event-sub-title unskew">${role}</div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  return '';
}
