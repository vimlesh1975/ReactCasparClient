/**
 * Swimming (SW) Broadcast Graphic Templates for games2
 * Exact 1-to-1 visual implementation for:
 *  - SW002 (Venue ID) matching SW002_Venue_ID_a.jpg
 *  - SW003 (Event Schedule) matching SW003_Event_Schedule_a.jpg
 *  - SW004 (Event ID) matching SW004_Event_ID_a.jpg
 *  - SW005 / SW005B (Start List) matching SW005_Start_List_a.jpg & SW005_Start_List_b.jpg (DNS white badge)
 *  - SW006 (Lane ID) matching SW006_Lane_ID_a.jpg to SW006_Lane_ID_e.jpg (5 distinct variants)
 *  - SW007 (Team List by Lane) matching SW007_Team_List_by_Lane_a.jpg to c.jpg (3 distinct variants)
 */

import * as fabric from 'fabric';
import { generateUniqueId } from '../../common';
import { FLAGS_BASE64 } from '../../GamesAIPanel/flagsBase64';

/**
 * Helper to retrieve base64 flag URL for NOC code
 */
export function getFlagBase64(nocCode) {
  const code = (nocCode || '').toUpperCase();
  return FLAGS_BASE64[code] || null;
}

/**
 * Helper function to create a unified, named Olympic Rings Group in Fabric.js
 */
export function createOlympicRingsGroup(left = 0, top = 0, radius = 9, strokeWidth = 2.2, options = {}) {
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

/**
 * Fabric.js Vector Generator for Swimming Templates (SW002 - SW007)
 */
export async function generateSwimming2Fabric(
  templateId = '',
  customData = {},
  styleOptions = {}
) {
  const normId = (templateId || '').toUpperCase();

  const darkTabColor = '#00192e';
  const altRowColor = '#002e4d';
  const gradientStart = '#00223e';
  const gradientMid = '#00355c';
  const gradientEnd = '#00477a';
  const borderHighlight = '#0088cc';
  const venueTitle = (customData.venue || 'AQUATICS CENTRE').toUpperCase();
  const sportTitle = (customData.sport || 'SWIMMING').toUpperCase();

  const objects = [];
  const createProps = (type, extra = {}) => ({
    id: generateUniqueId({ type }),
    selectable: true,
    hasControls: true,
    objectCaching: false,
    ...extra
  });

  // ── SW002 / Venue ID Gun-Shaped Layout ──
  if (normId.includes('SW002') || normId.includes('SW102') || normId === 'VENUE ID') {
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

    const swimmerIcon = new fabric.Textbox('🏊', createProps('textbox', {
      left: 275, top: 786, fontSize: 42, fill: '#ffffff', width: 65, textAlign: 'center'
    }));

    const titleText = new fabric.Textbox(venueTitle, createProps('textbox', {
      left: 395, top: 764, fontSize: 30, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: 610, charSpacing: 90
    }));

    const olympicRings = createOlympicRingsGroup(1045, 770, 9, 2.2);
    objects.push(gunBody, swimmerIcon, titleText, olympicRings);
  }

  // ── SW007 / Team List by Lane Layout (SW007a, SW007b, SW007c) ──
  else if (normId.includes('SW007') || normId.includes('TEAM LIST BY LANE')) {
    const isB = normId.endsWith('B') || normId.includes('SW007B') || normId.includes('SW107B');
    const isC = normId.endsWith('C') || normId.includes('SW007C') || normId.includes('SW107C');

    const laneNum = customData.lane || (isB ? '2' : isC ? '4' : '5');
    const nocCode = (customData.noc || (isB ? 'RSA' : isC ? 'USA' : 'AUS')).toUpperCase();
    const teamName = (customData.team || (isB ? 'SOUTH AFRICA' : isC ? 'UNITED STATES' : 'AUSTRALIA')).toUpperCase();

    const defaultSwimmersA = ['NICK FFROST', 'GRANT BRITS', 'KIRK PALMER', 'LEITH BRODIE'];
    const defaultSwimmersB = ['JEAN BASSON', 'DARIAN TOWNSEND', 'JAN VENTER', 'SEBASTIEN ROUSSEAU'];
    const defaultSwimmersC = ['DAVID WALTERS', 'RICKY BERENS', 'ERIK VENDT', 'KLETE KELLER'];

    const swimmers = customData.members || customData.swimmers || (isB ? defaultSwimmersB : isC ? defaultSwimmersC : defaultSwimmersA);

    const timeResult = (isB || isC) ? (customData.time || (isB ? '7:08.04' : '7:04.66')) : '';
    const hasOrRecord = isC || (isB && customData.record === 'OR');
    const hasQBadge = isB || isC;

    const startX = 280;
    const startY = 640;
    const barWidth = 780;
    const headerHeight = 42;

    // 1. Header Bar (5 AUS AUSTRALIA + Olympic Rings)
    const headerGradient = new fabric.Gradient({
      type: 'linear',
      gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: barWidth, y2: 0 },
      colorStops: [
        { offset: 0, color: gradientStart },
        { offset: 0.5, color: gradientMid },
        { offset: 1, color: gradientEnd }
      ]
    });

    const headerBar = new fabric.Rect(createProps('rect', {
      left: startX, top: startY, width: barWidth, height: headerHeight,
      fill: headerGradient, skewX: -12, rx: 5, ry: 5,
      stroke: borderHighlight, strokeWidth: 1.5,
      shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.6)', blur: 12, offsetX: 0, offsetY: 6 })
    }));

    const laneText = new fabric.Textbox(laneNum, createProps('textbox', {
      left: startX + 22, top: startY + 8, fontSize: 22, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: 25, textAlign: 'center'
    }));

    const nocText = new fabric.Textbox(nocCode, createProps('textbox', {
      left: startX + 50, top: startY + 9, fontSize: 18, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: 45
    }));

    objects.push(headerBar, laneText, nocText);

    // Country Flag Image (80px x 22px - Selectable & Unlocked)
    const flagBase64 = getFlagBase64(nocCode);
    if (flagBase64) {
      try {
        const imgObj = await fabric.Image.fromURL(flagBase64);
        imgObj.set({
          id: generateUniqueId({ type: 'image' }),
          left: startX + 102,
          top: startY + 10,
          scaleX: 80 / (imgObj.width || 32),
          scaleY: 22 / (imgObj.height || 20),
          skewX: -12,
          selectable: true,
          hasControls: true
        });
        objects.push(imgObj);
      } catch (e) { }
    }

    const teamText = new fabric.Textbox(teamName, createProps('textbox', {
      left: startX + 200, top: startY + 8, fontSize: 22, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: 450
    }));
    objects.push(teamText);

    // Olympic Rings
    const olympicRings = createOlympicRingsGroup(startX + 665, startY + 12, 7.5, 1.8);
    objects.push(olympicRings);

    // 2. 4 Swimmer Member Sub-Rows
    let currentY = startY + 44;
    swimmers.slice(0, 4).forEach((swimmerName, idx) => {
      const rowFill = idx % 2 === 0 ? darkTabColor : altRowColor;

      const rowBar = new fabric.Rect(createProps('rect', {
        left: startX + 15, top: currentY, width: barWidth - 30, height: 32,
        fill: rowFill, skewX: -12, rx: 3, ry: 3,
        stroke: 'rgba(0,136,204,0.6)', strokeWidth: 1
      }));

      const nameText = new fabric.Textbox((swimmerName || '').toUpperCase(), createProps('textbox', {
        left: startX + 35, top: currentY + 6, fontSize: 17, fontWeight: '900', fontStyle: 'italic',
        fill: '#ffffff', width: barWidth - 80
      }));

      objects.push(rowBar, nameText);
      currentY += 34;
    });

    // 3. Bottom Result/Time Sub-Bar (SW007b & SW007c)
    if (timeResult) {
      let subTabWidth = 150;
      if (hasOrRecord && hasQBadge) subTabWidth = 210;
      else if (hasQBadge || hasOrRecord) subTabWidth = 170;

      const subBar = new fabric.Rect(createProps('rect', {
        left: startX + 15, top: currentY, width: subTabWidth, height: 24,
        fill: '#00192e', skewX: -12, rx: 3, ry: 3,
        stroke: borderHighlight, strokeWidth: 1
      }));

      const timeText = new fabric.Textbox(timeResult, createProps('textbox', {
        left: startX + 25, top: currentY + 3, fontSize: 15, fontWeight: '900', fontStyle: 'italic',
        fill: '#ffffff', width: 90
      }));

      objects.push(subBar, timeText);
      let pillX = startX + 115;

      if (hasOrRecord) {
        const orBg = new fabric.Rect(createProps('rect', {
          left: pillX, top: currentY + 2, width: 30, height: 20,
          fill: '#e2e8f0', rx: 2, ry: 2, skewX: -12
        }));
        const orText = new fabric.Textbox('OR', createProps('textbox', {
          left: pillX, top: currentY + 4, fontSize: 13, fontWeight: '900', fontStyle: 'italic',
          fill: '#00223e', width: 30, textAlign: 'center'
        }));
        objects.push(orBg, orText);
        pillX += 34;
      }

      if (hasQBadge) {
        const qBg = new fabric.Rect(createProps('rect', {
          left: pillX, top: currentY + 2, width: 24, height: 20,
          fill: '#16a34a', rx: 2, ry: 2, skewX: -12
        }));
        const qText = new fabric.Textbox('Q', createProps('textbox', {
          left: pillX, top: currentY + 4, fontSize: 13, fontWeight: '900', fontStyle: 'italic',
          fill: '#ffffff', width: 24, textAlign: 'center'
        }));
        objects.push(qBg, qText);
      }
    }
  }

  // ── SW008 / Records Layout (SW008a, SW008b) ──
  else if (normId.includes('SW008') || normId.includes('RECORDS')) {
    const isB = normId.endsWith('B') || normId.includes('SW008B');
    const eventTitleTextVal = (customData.event || (isB ? "MEN'S 4X200M FREESTYLE RELAY" : "WOMEN'S 200M BUTTERFLY")).toUpperCase();

    const defaultRecordsA = [
      { noc: 'AUS', name: 'JESSICAH SCHIPPER', year: '2006', record: 'WR', time: '2:05.40' },
      { noc: 'USA', name: 'MISTY HYMAN', year: '2000', record: 'OR', time: '2:05.88' }
    ];

    const defaultRecordsB = [
      { noc: 'USA', name: 'UNITED STATES', year: '2007', record: 'WR', time: '7:03.24' },
      { noc: 'USA', name: 'UNITED STATES', year: '2012', record: 'OR', time: '7:04.66' }
    ];

    const recordsList = customData.records || (isB ? defaultRecordsB : defaultRecordsA);

    const startX = 280;
    const startY = 640;
    const barWidth = 780;
    const headerHeight = 42;

    // 1. Header Bar (SWIMMING + Olympic Rings)
    const headerGradient = new fabric.Gradient({
      type: 'linear',
      gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: barWidth, y2: 0 },
      colorStops: [
        { offset: 0, color: gradientStart },
        { offset: 0.5, color: gradientMid },
        { offset: 1, color: gradientEnd }
      ]
    });

    const headerBar = new fabric.Rect(createProps('rect', {
      left: startX, top: startY, width: barWidth, height: headerHeight,
      fill: headerGradient, skewX: -12, rx: 5, ry: 5,
      stroke: borderHighlight, strokeWidth: 1.5,
      shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.6)', blur: 12, offsetX: 0, offsetY: 6 })
    }));

    const swimmerIcon = new fabric.Textbox('🏊', createProps('textbox', {
      left: startX + 22, top: startY + 6, fontSize: 24, fill: '#ffffff', width: 40
    }));

    const sportTitleText = new fabric.Textbox(sportTitle, createProps('textbox', {
      left: startX + 100, top: startY + 8, fontSize: 24, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: 450, charSpacing: 90
    }));

    const olympicRings = createOlympicRingsGroup(startX + 665, startY + 12, 7.5, 1.8);

    // 2. Sub-Header Metallic Silver Bar (Event Title)
    const subBar = new fabric.Rect(createProps('rect', {
      left: startX + 15, top: startY + 44, width: barWidth - 30, height: 28,
      fill: '#e2e8f0', skewX: -12, rx: 3, ry: 3
    }));

    const subTitleText = new fabric.Textbox(eventTitleTextVal, createProps('textbox', {
      left: startX + 35, top: startY + 48, fontSize: 16, fontWeight: '900', fontStyle: 'italic',
      fill: '#00223e', width: 500, charSpacing: 60
    }));

    objects.push(headerBar, swimmerIcon, sportTitleText, olympicRings, subBar, subTitleText);

    // 3. 2 Record Rows (WR and OR)
    let currentY = startY + 74;
    const sliceRecords = recordsList.slice(0, 2);
    for (let idx = 0; idx < sliceRecords.length; idx++) {
      const rec = sliceRecords[idx];
      const rowFill = idx % 2 === 0 ? darkTabColor : altRowColor;

      const rowBar = new fabric.Rect(createProps('rect', {
        left: startX + 15, top: currentY, width: barWidth - 30, height: 34,
        fill: rowFill, skewX: -12, rx: 3, ry: 3,
        stroke: 'rgba(0,136,204,0.6)', strokeWidth: 1
      }));

      objects.push(rowBar);

      // Country flag image placed directly at left of row strip
      const nocCode = (rec.noc || rec.flag || rec.country || '').toUpperCase();
      const flagBase64 = getFlagBase64(nocCode);
      if (flagBase64) {
        try {
          const imgObj = await fabric.Image.fromURL(flagBase64);
          imgObj.set({
            id: generateUniqueId({ type: 'image' }),
            left: startX + 35,
            top: currentY + 6,
            scaleX: 80 / (imgObj.width || 32),
            scaleY: 22 / (imgObj.height || 20),
            skewX: -12,
            selectable: true,
            hasControls: true
          });
          objects.push(imgObj);
        } catch (e) { }
      }

      const nameText = new fabric.Textbox((rec.name || '').toUpperCase(), createProps('textbox', {
        left: startX + 130, top: currentY + 7, fontSize: 17, fontWeight: '900', fontStyle: 'italic',
        fill: '#ffffff', width: 370
      }));

      const yearText = new fabric.Textbox(rec.year || '', createProps('textbox', {
        left: startX + 510, top: currentY + 7, fontSize: 16, fontWeight: '900', fontStyle: 'italic',
        fill: '#ffffff', width: 50, textAlign: 'center'
      }));

      objects.push(nameText, yearText);

      // Badge (WR gold or OR silver)
      const isWR = rec.record === 'WR';
      const badgeBg = new fabric.Rect(createProps('rect', {
        left: startX + 570, top: currentY + 6, width: 32, height: 22,
        fill: isWR ? '#fbbf24' : '#e2e8f0', rx: 2, ry: 2, skewX: -12
      }));
      const badgeText = new fabric.Textbox(rec.record || '', createProps('textbox', {
        left: startX + 570, top: currentY + 8, fontSize: 13, fontWeight: '900', fontStyle: 'italic',
        fill: '#00223e', width: 32, textAlign: 'center'
      }));

      const timeText = new fabric.Textbox(rec.time || '', createProps('textbox', {
        left: startX + 615, top: currentY + 7, fontSize: 17, fontWeight: '900', fontStyle: 'italic',
        fill: '#ffffff', width: 130, textAlign: 'right'
      }));

      objects.push(badgeBg, badgeText, timeText);
      currentY += 36;
    }
  }

  // ── SW009 / Lane Indicator Layout (SW009a, SW009b) ──
  else if (normId.includes('SW009') || normId.includes('LANE INDICATOR')) {
    const isB = normId.endsWith('B') || normId.includes('SW009B');

    const topLaneTextVal = customData.topLane || 'LANE 1';
    const bottomLaneTextVal = customData.bottomLane || (isB ? 'LANE 9' : 'LANE 8');

    const badgeWidth = 140;
    const badgeHeight = 30;

    const badgeGradient = new fabric.Gradient({
      type: 'linear',
      gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: badgeWidth, y2: 0 },
      colorStops: [
        { offset: 0, color: '#d1d5db' },
        { offset: 0.5, color: '#ffffff' },
        { offset: 1, color: '#cbd5e1' }
      ]
    });

    // Top Badge (LANE 1)
    const topBg = new fabric.Rect(createProps('rect', {
      left: 280, top: 180, width: badgeWidth, height: badgeHeight,
      fill: badgeGradient, skewX: -12, rx: 5, ry: 5,
      stroke: '#00223e', strokeWidth: 1.5,
      shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.6)', blur: 10, offsetX: 0, offsetY: 4 })
    }));

    const topText = new fabric.Textbox(topLaneTextVal.toUpperCase(), createProps('textbox', {
      left: 280, top: 185, fontSize: 18, fontWeight: '900', fontStyle: 'italic',
      fill: '#00223e', width: badgeWidth, textAlign: 'center'
    }));

    // Bottom Badge (LANE 8 / LANE 9)
    const bottomBg = new fabric.Rect(createProps('rect', {
      left: 280, top: 660, width: badgeWidth, height: badgeHeight,
      fill: badgeGradient, skewX: -12, rx: 5, ry: 5,
      stroke: '#00223e', strokeWidth: 1.5,
      shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.6)', blur: 10, offsetX: 0, offsetY: 4 })
    }));

    const bottomText = new fabric.Textbox(bottomLaneTextVal.toUpperCase(), createProps('textbox', {
      left: 280, top: 665, fontSize: 18, fontWeight: '900', fontStyle: 'italic',
      fill: '#00223e', width: badgeWidth, textAlign: 'center'
    }));

    objects.push(topBg, topText, bottomBg, bottomText);
  }

  // ── SW011 / Winner / Winners / Place ID Layout (SW011a, SW011b, SW011c) ──
  else if (normId.includes('SW011') || (!normId.includes('SW114') && (normId.includes('WINNER') || normId.includes('PLACE ID')))) {
    const isB = normId.endsWith('B') || normId.includes('SW011B');
    const isC = normId.endsWith('C') || normId.includes('SW011C');

    const headerTitleVal = (customData.headerTitle || customData.sport || (isB ? "WOMEN'S 200M BUTTERFLY" : "SWIMMING")).toUpperCase();
    const subTitleVal = (customData.subTitle || (isB ? "3RD PLACE - HEAT 5" : isC ? "WINNERS - MEN'S 4X200M FREESTYLE RELAY" : "WINNER - MEN'S 4X200M FREESTYLE RELAY")).toUpperCase();

    const defaultWinnersA = [
      { noc: 'USA', name: 'UNITED STATES', time: '6:58.56', record: 'WR' }
    ];

    const defaultWinnersB = [
      { noc: 'POL', name: 'OTYLIA JEDRZEJCZAK', time: '2:06.91', record: '' }
    ];

    const defaultWinnersC = [
      { noc: 'USA', name: 'UNITED STATES', time: '6:58.56', record: 'WR' },
      { noc: 'GBR', name: 'GREAT BRITAIN', time: '6:58.56', record: 'WR' }
    ];

    const winnersList = customData.winners || customData.athletes || (isB ? defaultWinnersB : isC ? defaultWinnersC : defaultWinnersA);

    const startX = 280;
    const startY = winnersList.length > 1 ? 680 : 720;
    const barWidth = 780;
    const headerHeight = 42;

    // 1. Header Bar
    const headerGradient = new fabric.Gradient({
      type: 'linear',
      gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: barWidth, y2: 0 },
      colorStops: [
        { offset: 0, color: gradientStart },
        { offset: 0.5, color: gradientMid },
        { offset: 1, color: gradientEnd }
      ]
    });

    const headerBar = new fabric.Rect(createProps('rect', {
      left: startX, top: startY, width: barWidth, height: headerHeight,
      fill: headerGradient, skewX: -12, rx: 5, ry: 5,
      stroke: borderHighlight, strokeWidth: 1.5,
      shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.6)', blur: 12, offsetX: 0, offsetY: 6 })
    }));

    const swimmerIcon = new fabric.Textbox('🏊', createProps('textbox', {
      left: startX + 22, top: startY + 6, fontSize: 24, fill: '#ffffff', width: 40
    }));

    const sportTitleText = new fabric.Textbox(headerTitleVal, createProps('textbox', {
      left: startX + 100, top: startY + 8, fontSize: 24, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: 450, charSpacing: 90
    }));

    const olympicRings = createOlympicRingsGroup(startX + 665, startY + 12, 7.5, 1.8);

    // 2. Sub-Header Metallic Silver Bar
    const subBar = new fabric.Rect(createProps('rect', {
      left: startX + 15, top: startY + 44, width: barWidth - 30, height: 28,
      fill: '#e2e8f0', skewX: -12, rx: 3, ry: 3
    }));

    const subTitleText = new fabric.Textbox(subTitleVal, createProps('textbox', {
      left: startX + 35, top: startY + 48, fontSize: 16, fontWeight: '900', fontStyle: 'italic',
      fill: '#00223e', width: 500, charSpacing: 60
    }));

    objects.push(headerBar, swimmerIcon, sportTitleText, olympicRings, subBar, subTitleText);

    // 3. Winner / Place Rows
    let currentY = startY + 74;
    for (let idx = 0; idx < winnersList.length; idx++) {
      const w = winnersList[idx];
      const rowFill = idx % 2 === 0 ? darkTabColor : altRowColor;

      const rowBar = new fabric.Rect(createProps('rect', {
        left: startX + 15, top: currentY, width: barWidth - 30, height: 34,
        fill: rowFill, skewX: -12, rx: 3, ry: 3,
        stroke: 'rgba(0,136,204,0.6)', strokeWidth: 1
      }));

      objects.push(rowBar);

      // Flag image placed directly at left end of row strip
      const nocCode = (w.noc || w.flag || w.country || '').toUpperCase();
      const flagBase64 = getFlagBase64(nocCode);
      if (flagBase64) {
        try {
          const imgObj = await fabric.Image.fromURL(flagBase64);
          imgObj.set({
            id: generateUniqueId({ type: 'image' }),
            left: startX + 35,
            top: currentY + 6,
            scaleX: 80 / (imgObj.width || 32),
            scaleY: 22 / (imgObj.height || 20),
            skewX: -12,
            selectable: true,
            hasControls: true
          });
          objects.push(imgObj);
        } catch (e) { }
      }

      const nameText = new fabric.Textbox((w.name || '').toUpperCase(), createProps('textbox', {
        left: startX + 130, top: currentY + 7, fontSize: 17, fontWeight: '900', fontStyle: 'italic',
        fill: '#ffffff', width: 410
      }));

      objects.push(nameText);

      // Record Pill (WR gold or OR silver if present)
      if (w.record) {
        const isWR = w.record === 'WR';
        const badgeBg = new fabric.Rect(createProps('rect', {
          left: startX + 560, top: currentY + 6, width: 32, height: 22,
          fill: isWR ? '#fbbf24' : '#e2e8f0', rx: 2, ry: 2, skewX: -12
        }));
        const badgeText = new fabric.Textbox(w.record, createProps('textbox', {
          left: startX + 560, top: currentY + 8, fontSize: 13, fontWeight: '900', fontStyle: 'italic',
          fill: '#00223e', width: 32, textAlign: 'center'
        }));
        objects.push(badgeBg, badgeText);
      }

      const timeText = new fabric.Textbox(w.time || '', createProps('textbox', {
        left: startX + 600, top: currentY + 7, fontSize: 17, fontWeight: '900', fontStyle: 'italic',
        fill: '#ffffff', width: 140, textAlign: 'right'
      }));

      objects.push(timeText);
      currentY += 36;
    }
  }

  // ── SW012 / Result Layout ──
  else if (normId.includes('SW012') || normId.includes('RESULT')) {
    const isB = normId.endsWith('B') || normId.includes('SW012B');
    const headerTitle = (customData.headerTitle || customData.event || (isB ? "MEN'S 4X200M FREESTYLE RELAY" : "WOMEN'S 200M BUTTERFLY")).toUpperCase();
    const subTitle = (customData.subTitle || (isB ? 'RESULT - FINAL' : 'RESULT - SEMI-FINAL 2')).toUpperCase();

    const defaultResultsA = [
      { pos: '1', noc: 'CHN', name: 'LIU ZIGE', time: '2:06.25', record: '' },
      { pos: '2', noc: 'AUS', name: 'JESSICAH SCHIPPER', time: '2:06.34', record: '' },
      { pos: '3', noc: 'POL', name: 'OTYLIA JEDRZEJCZAK', time: '2:06.78', record: '' },
      { pos: '4', noc: 'JPN', name: 'YUKO NAKANISHI', time: '2:06.96', record: '' },
      { pos: '4', noc: 'USA', name: 'KATHLEEN HERSEY', time: '2:06.96', record: '' },
      { pos: '6', noc: 'USA', name: 'ELAINE BREEDEN', time: '2:07.73', record: '' },
      { pos: '7', noc: 'AUS', name: 'SAMANTHA HAMILL', time: '2:09.58', record: '' },
      { pos: '8', noc: 'GBR', name: 'ELLEN GANDY', time: '2:10.60', record: '' },
    ];
    const defaultResultsB = [
      { pos: '1', noc: 'USA', name: 'UNITED STATES', time: '6:58.56', record: 'WR' },
      { pos: '2', noc: 'GBR', name: 'GREAT BRITAIN', time: '7:03.70', record: '' },
      { pos: '3', noc: 'POL', name: 'POLAND', time: '7:04.98', record: '' },
      { pos: '4', noc: 'AUS', name: 'AUSTRALIA', time: '7:05.35', record: '' },
      { pos: '5', noc: 'RSA', name: 'SOUTH AFRICA', time: '7:05.77', record: '' },
      { pos: '6', noc: 'AUT', name: 'AUSTRIA', time: '7:05.92', record: '' },
      { pos: '7', noc: 'HUN', name: 'HUNGARY', time: '7:10.31', record: '' },
      { pos: '', noc: 'GRE', name: 'GREECE', time: '', record: 'DSQ' },
    ];
    const resultsList = customData.athletes || customData.results || (isB ? defaultResultsB : defaultResultsA);

    const startX = 280;
    const bannerWidth = 780;
    // Header
    const hGrad = new fabric.Gradient({ type: 'linear', gradientUnits: 'pixels', coords: { x1: 0, y1: 0, x2: bannerWidth, y2: 0 }, colorStops: [{ offset: 0, color: gradientStart }, { offset: 0.5, color: gradientMid }, { offset: 1, color: gradientEnd }] });
    const numRows = Math.min(resultsList.length, 8);
    const totalH = 42 + 28 + numRows * 34 + (numRows - 1) * 4;
    const startY = customData.posY ? Number(customData.posY) : (numRows > 4 ? 380 : 480);

    const headerBar = new fabric.Rect(createProps('rect', { left: startX, top: startY, width: bannerWidth, height: 42, fill: hGrad, skewX: -12, rx: 5, ry: 5, stroke: borderHighlight, strokeWidth: 1.5, shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.6)', blur: 12, offsetX: 0, offsetY: 6 }) }));
    const swimIcon = new fabric.Textbox('🏊', createProps('textbox', { left: startX + 15, top: startY + 5, fontSize: 32, fill: '#ffffff', width: 50 }));
    const hTitle = new fabric.Textbox(headerTitle, createProps('textbox', { left: startX + 60, top: startY + 9, fontSize: 21, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 600, charSpacing: 40 }));
    const olympicRingsR = createOlympicRingsGroup(startX + 700, startY + 8, 9, 2.2);

    const subBarR = new fabric.Rect(createProps('rect', { left: startX + 15, top: startY + 44, width: bannerWidth - 15, height: 26, fill: '#e2e8f0', skewX: -12, rx: 3, ry: 3, stroke: 'rgba(0,34,62,0.3)', strokeWidth: 1 }));
    const subTitleR = new fabric.Textbox(subTitle, createProps('textbox', { left: startX + 30, top: startY + 48, fontSize: 15, fontWeight: '900', fontStyle: 'italic', fill: '#00223e', width: 500 }));

    objects.push(headerBar, swimIcon, hTitle, olympicRingsR, subBarR, subTitleR);

    let cy = startY + 74;
    for (let idx = 0; idx < resultsList.length && idx < 8; idx++) {
      const r = resultsList[idx];
      const rowFill = idx % 2 === 0 ? darkTabColor : altRowColor;
      const rowBar = new fabric.Rect(createProps('rect', { left: startX + 15, top: cy, width: bannerWidth - 30, height: 32, fill: rowFill, skewX: -12, rx: 3, ry: 3, stroke: 'rgba(0,136,204,0.5)', strokeWidth: 1 }));
      objects.push(rowBar);

      // Position badge (red skewed box on far left)
      if (r.pos) {
        const posBg = new fabric.Rect(createProps('rect', { left: startX + 15, top: cy, width: 28, height: 32, fill: '#c00000', skewX: -12, rx: 2, ry: 2 }));
        const posText = new fabric.Textbox(r.pos, createProps('textbox', { left: startX + 18, top: cy + 6, fontSize: 16, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 22, textAlign: 'center' }));
        objects.push(posBg, posText);
      }

      // Flag
      const nocCode = (r.noc || '').toUpperCase();
      const flagBase64 = getFlagBase64(nocCode);
      if (flagBase64) {
        try {
          const imgObj = await fabric.Image.fromURL(flagBase64);
          imgObj.set({ id: generateUniqueId({ type: 'image' }), left: startX + 52, top: cy + 5, scaleX: 70 / (imgObj.width || 32), scaleY: 22 / (imgObj.height || 20), skewX: -12, selectable: true, hasControls: true });
          objects.push(imgObj);
        } catch (e) { }
      }

      const nameText = new fabric.Textbox((r.name || '').toUpperCase(), createProps('textbox', { left: startX + 135, top: cy + 6, fontSize: 16, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 400 }));
      objects.push(nameText);

      // WR/OR record badge or DSQ badge
      if (r.record === 'WR' || r.record === 'OR') {
        const badgeBg = new fabric.Rect(createProps('rect', { left: startX + 560, top: cy + 4, width: 40, height: 22, fill: r.record === 'WR' ? '#f59e0b' : '#cbd5e1', skewX: -12, rx: 2, ry: 2 }));
        const badgeText = new fabric.Textbox(r.record, createProps('textbox', { left: startX + 562, top: cy + 7, fontSize: 12, fontWeight: '900', fontStyle: 'italic', fill: '#00223e', width: 38, textAlign: 'center' }));
        objects.push(badgeBg, badgeText);
      }
      if (r.record === 'DSQ') {
        const dBg = new fabric.Rect(createProps('rect', { left: startX + 580, top: cy + 4, width: 55, height: 22, fill: '#cbd5e1', skewX: -12, rx: 2, ry: 2 }));
        const dText = new fabric.Textbox('DSQ', createProps('textbox', { left: startX + 582, top: cy + 7, fontSize: 12, fontWeight: '900', fontStyle: 'italic', fill: '#00223e', width: 52, textAlign: 'center' }));
        objects.push(dBg, dText);
      }

      if (r.time) {
        const tText = new fabric.Textbox(r.time, createProps('textbox', { left: startX + 625, top: cy + 6, fontSize: 16, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 120, textAlign: 'right' }));
        objects.push(tText);
      }

      cy += 36;
    }
  }

  // ── SW013 / Advance All to Phase Layout ──
  else if (normId.includes('SW013') || normId.includes('ADVANCE ALL')) {
    const isB = normId.endsWith('B') || normId.includes('SW013B');
    const headerTitle = (customData.headerTitle || customData.event || (isB ? "MEN'S 4X200M FREESTYLE RELAY" : "WOMEN'S 200M BUTTERFLY")).toUpperCase();
    const fromPhase = (customData.fromPhase || (isB ? 'HEATS' : 'SEMI-FINALS')).toUpperCase();
    const toPhase = (customData.toPhase || 'FINAL').toUpperCase();
    const subTitle = `${fromPhase} → ${toPhase}`;

    const defaultAdvA = [
      { pos: '1', noc: 'CHN', name: 'LIU ZIGE', time: '2:06.25' },
      { pos: '2', noc: 'AUS', name: 'JESSICAH SCHIPPER', time: '2:06.34' },
      { pos: '3', noc: 'CHN', name: 'JIAO LIUYANG', time: '2:06.78' },
      { pos: '4', noc: 'POL', name: 'OTYLIA JEDRZEJCZAK', time: '2:06.96' },
      { pos: '4', noc: 'JPN', name: 'YUKO NAKANISHI', time: '2:06.96' },
      { pos: '6', noc: 'USA', name: 'KATHLEEN HERSEY', time: '2:07.73' },
      { pos: '7', noc: 'FRA', name: 'AURORE MONGEL', time: '2:09.58' },
      { pos: '8', noc: 'USA', name: 'ELAINE BREEDEN', time: '2:10.60' },
    ];
    const defaultAdvB = [
      { pos: '1', noc: 'USA', name: 'UNITED STATES', time: '7:04.66', record: 'OR' },
      { pos: '2', noc: 'ITA', name: 'ITALY', time: '7:07.84' },
      { pos: '3', noc: 'RUS', name: 'RUSSIAN FEDERATION', time: '7:07.86' },
      { pos: '4', noc: 'GBR', name: 'GREAT BRITAIN', time: '7:07.89' },
      { pos: '5', noc: 'CAN', name: 'CANADA', time: '7:08.04' },
      { pos: '6', noc: 'AUS', name: 'AUSTRALIA', time: '7:08.41' },
      { pos: '7', noc: 'JPN', name: 'JAPAN', time: '7:09.12' },
      { pos: '8', noc: 'RSA', name: 'SOUTH AFRICA', time: '7:10.91' },
    ];
    const advList = customData.athletes || customData.results || (isB ? defaultAdvB : defaultAdvA);

    const startX = 280;
    const bannerWidth = 780;
    const numRows13 = Math.min(advList.length, 8);
    const totalH13 = 42 + 28 + numRows13 * 34 + (numRows13 - 1) * 4;
    const startY = customData.posY ? Number(customData.posY) : (numRows13 > 4 ? 380 : 480);

    const hGrad13 = new fabric.Gradient({ type: 'linear', gradientUnits: 'pixels', coords: { x1: 0, y1: 0, x2: bannerWidth, y2: 0 }, colorStops: [{ offset: 0, color: gradientStart }, { offset: 0.5, color: gradientMid }, { offset: 1, color: gradientEnd }] });
    const headerBar13 = new fabric.Rect(createProps('rect', { left: startX, top: startY, width: bannerWidth, height: 42, fill: hGrad13, skewX: -12, rx: 5, ry: 5, stroke: borderHighlight, strokeWidth: 1.5, shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.6)', blur: 12, offsetX: 0, offsetY: 6 }) }));
    const swimIcon13 = new fabric.Textbox('🏊', createProps('textbox', { left: startX + 15, top: startY + 5, fontSize: 32, fill: '#ffffff', width: 50 }));
    const hTitle13 = new fabric.Textbox(headerTitle, createProps('textbox', { left: startX + 60, top: startY + 9, fontSize: 21, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 600 }));
    const olympicRings13 = createOlympicRingsGroup(startX + 700, startY + 8, 9, 2.2);

    const subBar13 = new fabric.Rect(createProps('rect', { left: startX + 15, top: startY + 44, width: bannerWidth - 15, height: 26, fill: '#e2e8f0', skewX: -12, rx: 3, ry: 3 }));
    const subTitle13 = new fabric.Textbox(subTitle, createProps('textbox', { left: startX + 30, top: startY + 48, fontSize: 15, fontWeight: '900', fontStyle: 'italic', fill: '#00223e', width: 500 }));

    objects.push(headerBar13, swimIcon13, hTitle13, olympicRings13, subBar13, subTitle13);

    let cy13 = startY + 74;
    for (let idx = 0; idx < advList.length && idx < 8; idx++) {
      const r = advList[idx];
      const rowFill = idx % 2 === 0 ? darkTabColor : altRowColor;
      const rowBar = new fabric.Rect(createProps('rect', { left: startX + 15, top: cy13, width: bannerWidth - 30, height: 32, fill: rowFill, skewX: -12, rx: 3, ry: 3, stroke: 'rgba(0,136,204,0.5)', strokeWidth: 1 }));
      objects.push(rowBar);
      if (r.pos) {
        const posBg = new fabric.Rect(createProps('rect', { left: startX + 15, top: cy13, width: 28, height: 32, fill: '#c00000', skewX: -12, rx: 2, ry: 2 }));
        const posText = new fabric.Textbox(r.pos, createProps('textbox', { left: startX + 18, top: cy13 + 6, fontSize: 16, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 22, textAlign: 'center' }));
        objects.push(posBg, posText);
      }
      const nocCode13 = (r.noc || '').toUpperCase();
      const flag13 = getFlagBase64(nocCode13);
      if (flag13) {
        try {
          const imgObj = await fabric.Image.fromURL(flag13);
          imgObj.set({ id: generateUniqueId({ type: 'image' }), left: startX + 52, top: cy13 + 5, scaleX: 70 / (imgObj.width || 32), scaleY: 22 / (imgObj.height || 20), skewX: -12, selectable: true, hasControls: true });
          objects.push(imgObj);
        } catch (e) { }
      }
      const nameText13 = new fabric.Textbox((r.name || '').toUpperCase(), createProps('textbox', { left: startX + 135, top: cy13 + 6, fontSize: 16, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 400 }));
      objects.push(nameText13);
      if (r.record === 'OR' || r.record === 'WR') {
        const bBg = new fabric.Rect(createProps('rect', { left: startX + 560, top: cy13 + 4, width: 40, height: 22, fill: r.record === 'WR' ? '#f59e0b' : '#cbd5e1', skewX: -12, rx: 2, ry: 2 }));
        const bTxt = new fabric.Textbox(r.record, createProps('textbox', { left: startX + 562, top: cy13 + 7, fontSize: 12, fontWeight: '900', fontStyle: 'italic', fill: '#00223e', width: 38, textAlign: 'center' }));
        objects.push(bBg, bTxt);
      }
      if (r.time) {
        const tText13 = new fabric.Textbox(r.time, createProps('textbox', { left: startX + 625, top: cy13 + 6, fontSize: 16, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 120, textAlign: 'right' }));
        objects.push(tText13);
      }
      cy13 += 36;
    }
  }

  // ── SW014 / Non-Competition Area Indicator ──
  else if (normId.includes('SW014') || normId.includes('NON-COMPETITION') || normId.includes('NON COMPETITION')) {
    const isB = normId.endsWith('B') || normId.includes('SW014B');
    const areaLabel = (customData.area || customData.label || (isB ? 'CALL ROOM' : 'WARM UP POOL')).toUpperCase();

    const pillGrad = new fabric.Gradient({ type: 'linear', gradientUnits: 'pixels', coords: { x1: 0, y1: 0, x2: 200, y2: 0 }, colorStops: [{ offset: 0, color: '#bdc9d4' }, { offset: 0.5, color: '#ffffff' }, { offset: 1, color: '#9fb5c2' }] });
    const pill = new fabric.Rect(createProps('rect', { left: 280, top: 150, width: 200, height: 32, fill: pillGrad, skewX: -12, rx: 14, ry: 14, stroke: '#7a8fa0', strokeWidth: 1.5 }));
    const pillText = new fabric.Textbox(areaLabel, createProps('textbox', { left: 284, top: 156, fontSize: 17, fontWeight: '900', fontStyle: 'italic', fill: '#00223e', width: 194, textAlign: 'center' }));
    objects.push(pill, pillText);
  }

  // ── SW015 / Ceremony ID ──
  else if (normId.includes('SW015') || normId.includes('SW120') || normId.includes('CEREMONY ID')) {
    const eventTitle = (customData.event || customData.headerTitle || "WOMEN'S 200M BUTTERFLY").toUpperCase();
    const ceremonyLabel = (customData.ceremony || 'VICTORY CEREMONY').toUpperCase();

    const startX = 280;
    const startY = 840;
    const barWidth = 780;

    const hGrad15 = new fabric.Gradient({ type: 'linear', gradientUnits: 'pixels', coords: { x1: 0, y1: 0, x2: barWidth, y2: 0 }, colorStops: [{ offset: 0, color: gradientStart }, { offset: 0.5, color: gradientMid }, { offset: 1, color: gradientEnd }] });
    const headerBar15 = new fabric.Rect(createProps('rect', { left: startX, top: startY, width: barWidth, height: 42, fill: hGrad15, skewX: -12, rx: 5, ry: 5, stroke: borderHighlight, strokeWidth: 1.5, shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.6)', blur: 12, offsetX: 0, offsetY: 6 }) }));
    const swimIcon15 = new fabric.Textbox('🏊', createProps('textbox', { left: startX + 15, top: startY + 5, fontSize: 32, fill: '#ffffff', width: 50 }));
    const hTitle15 = new fabric.Textbox(eventTitle, createProps('textbox', { left: startX + 60, top: startY + 9, fontSize: 21, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 600 }));
    const olympicRings15 = createOlympicRingsGroup(startX + 700, startY + 8, 9, 2.2);
    const subBar15 = new fabric.Rect(createProps('rect', { left: startX + 15, top: startY + 44, width: barWidth - 15, height: 26, fill: '#e2e8f0', skewX: -12, rx: 3, ry: 3 }));
    const subTitle15 = new fabric.Textbox(ceremonyLabel, createProps('textbox', { left: startX + 30, top: startY + 48, fontSize: 15, fontWeight: '900', fontStyle: 'italic', fill: '#00223e', width: 500 }));
    objects.push(headerBar15, swimIcon15, hTitle15, olympicRings15, subBar15, subTitle15);
  }

  // ── SW016 / Medal ID ──
  else if (normId.includes('SW016') || normId.includes('SW121') || normId.includes('MEDAL ID')) {
    const isB = normId.endsWith('B') || normId.includes('SW016B');
    const nocCode16 = (customData.noc || (isB ? 'GBR' : 'CHN')).toUpperCase();
    const athleteName16 = (customData.name || customData.team || (isB ? 'GREAT BRITAIN' : 'LIU ZIGE')).toUpperCase();
    const medalColor = (customData.medal || (isB ? 'SILVER' : 'GOLD')).toUpperCase();
    const eventLabel16 = (customData.event || (isB ? "MEN'S 4X200M FREESTYLE RELAY" : "WOMEN'S 200M BUTTERFLY")).toUpperCase();

    const startX = 280;
    const startY = 840;
    const barWidth = 780;

    const hGrad16 = new fabric.Gradient({ type: 'linear', gradientUnits: 'pixels', coords: { x1: 0, y1: 0, x2: barWidth, y2: 0 }, colorStops: [{ offset: 0, color: gradientStart }, { offset: 0.5, color: gradientMid }, { offset: 1, color: gradientEnd }] });
    const headerBar16 = new fabric.Rect(createProps('rect', { left: startX, top: startY, width: barWidth, height: 42, fill: hGrad16, skewX: -12, rx: 5, ry: 5, stroke: borderHighlight, strokeWidth: 1.5, shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.6)', blur: 12, offsetX: 0, offsetY: 6 }) }));

    // Push headerBar FIRST so flag and text render on top
    objects.push(headerBar16);

    const flag16 = getFlagBase64(nocCode16);
    if (flag16) {
      try {
        const imgObj = await fabric.Image.fromURL(flag16);
        imgObj.set({ id: generateUniqueId({ type: 'image' }), left: startX + 18, top: startY + 9, scaleX: 70 / (imgObj.width || 32), scaleY: 22 / (imgObj.height || 20), selectable: true, hasControls: true });
        objects.push(imgObj);
      } catch (e) { }
    }

    const hTitle16 = new fabric.Textbox(athleteName16, createProps('textbox', { left: startX + 100, top: startY + 9, fontSize: 22, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 560 }));
    const olympicRings16 = createOlympicRingsGroup(startX + 700, startY + 8, 9, 2.2);
    objects.push(hTitle16, olympicRings16);

    // Sub bar with medal emoji + event
    const medalEmoji = medalColor === 'GOLD' ? '🥇' : medalColor === 'SILVER' ? '🥈' : '🥉';
    const subBar16 = new fabric.Rect(createProps('rect', { left: startX + 15, top: startY + 44, width: barWidth - 15, height: 26, fill: darkTabColor, skewX: -12, rx: 3, ry: 3 }));
    const medalIcon16 = new fabric.Textbox(medalEmoji, createProps('textbox', { left: startX + 18, top: startY + 46, fontSize: 18, fill: '#ffffff', width: 28 }));
    const subLabel16 = new fabric.Textbox(`${medalColor} - ${eventLabel16}`, createProps('textbox', { left: startX + 50, top: startY + 48, fontSize: 14, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 680 }));
    objects.push(subBar16, medalIcon16, subLabel16);
  }

  // ── SW017 / Medals List ──
  else if (normId.includes('SW017') || normId.includes('SW122') || normId.includes('MEDALS LIST')) {
    const isB = normId.endsWith('B') || normId.includes('SW017B');
    const eventTitle17 = (customData.event || customData.headerTitle || (isB ? "MEN'S 4X200M FREESTYLE RELAY" : "WOMEN'S 200M BUTTERFLY")).toUpperCase();
    const ceremonyLabel17 = (customData.ceremony || 'VICTORY CEREMONY').toUpperCase();

    const defaultMedalsA = [
      { medal: 'GOLD', noc: 'CHN', name: 'LIU ZIGE' },
      { medal: 'SILVER', noc: 'CHN', name: 'JIAO LIUYANG' },
      { medal: 'BRONZE', noc: 'AUS', name: 'JESSICAH SCHIPPER' },
    ];
    const defaultMedalsB = [
      { medal: 'GOLD', noc: 'USA', name: 'UNITED STATES' },
      { medal: 'SILVER', noc: 'GBR', name: 'GREAT BRITAIN' },
      { medal: 'BRONZE', noc: 'POL', name: 'POLAND' },
    ];
    const medalsList = customData.medals || customData.athletes || (isB ? defaultMedalsB : defaultMedalsA);
    const numRows17 = Math.min(medalsList.length, 3);
    const totalH17 = 42 + 28 + numRows17 * 34 + (numRows17 - 1) * 4;
    const startX = 280;
    const bannerWidth = 780;
    const startY17 = Math.max(700, 1080 - 120 - totalH17);

    const hGrad17 = new fabric.Gradient({ type: 'linear', gradientUnits: 'pixels', coords: { x1: 0, y1: 0, x2: bannerWidth, y2: 0 }, colorStops: [{ offset: 0, color: gradientStart }, { offset: 0.5, color: gradientMid }, { offset: 1, color: gradientEnd }] });
    const headerBar17 = new fabric.Rect(createProps('rect', { left: startX, top: startY17, width: bannerWidth, height: 42, fill: hGrad17, skewX: -12, rx: 5, ry: 5, stroke: borderHighlight, strokeWidth: 1.5, shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.6)', blur: 12, offsetX: 0, offsetY: 6 }) }));
    const swimIcon17 = new fabric.Textbox('🏊', createProps('textbox', { left: startX + 15, top: startY17 + 5, fontSize: 32, fill: '#ffffff', width: 50 }));
    const hTitle17 = new fabric.Textbox(eventTitle17, createProps('textbox', { left: startX + 60, top: startY17 + 9, fontSize: 21, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 600 }));
    const olympicRings17 = createOlympicRingsGroup(startX + 700, startY17 + 8, 9, 2.2);
    const subBar17 = new fabric.Rect(createProps('rect', { left: startX + 15, top: startY17 + 44, width: bannerWidth - 15, height: 26, fill: '#e2e8f0', skewX: -12, rx: 3, ry: 3 }));
    const subTitle17 = new fabric.Textbox(ceremonyLabel17, createProps('textbox', { left: startX + 30, top: startY17 + 48, fontSize: 15, fontWeight: '900', fontStyle: 'italic', fill: '#00223e', width: 500 }));
    objects.push(headerBar17, swimIcon17, hTitle17, olympicRings17, subBar17, subTitle17);

    let cy17 = startY17 + 74;
    const medalEmojis = { GOLD: '🥇', SILVER: '🥈', BRONZE: '🥉' };
    for (let idx = 0; idx < medalsList.length && idx < 3; idx++) {
      const m = medalsList[idx];
      const rowFill = darkTabColor;
      const rowBar17 = new fabric.Rect(createProps('rect', { left: startX + 15, top: cy17, width: bannerWidth - 30, height: 32, fill: rowFill, skewX: -12, rx: 3, ry: 3 }));
      const emojiText = new fabric.Textbox(medalEmojis[(m.medal || 'GOLD').toUpperCase()] || '🥇', createProps('textbox', { left: startX + 18, top: cy17 + 5, fontSize: 22, fill: '#ffffff', width: 32 }));
      objects.push(rowBar17, emojiText);

      const nocCode17 = (m.noc || '').toUpperCase();
      const flag17 = getFlagBase64(nocCode17);
      if (flag17) {
        try {
          const imgObj = await fabric.Image.fromURL(flag17);
          imgObj.set({ id: generateUniqueId({ type: 'image' }), left: startX + 58, top: cy17 + 5, scaleX: 70 / (imgObj.width || 32), scaleY: 22 / (imgObj.height || 20), skewX: -12, selectable: true, hasControls: true });
          objects.push(imgObj);
        } catch (e) { }
      }

      const mName17 = new fabric.Textbox((m.name || '').toUpperCase(), createProps('textbox', { left: startX + 145, top: cy17 + 6, fontSize: 17, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 590 }));
      objects.push(mName17);
      cy17 += 36;
    }
  }

  // ── SW018 / Medal Presenter ID ──
  else if (normId.includes('SW018') || normId.includes('SW123') || normId.includes('MEDAL PRESENTER')) {
    const presenterName = (customData.name || customData.presenter || 'JACQUES ROGGE').toUpperCase();
    const presenterTitle = (customData.title || customData.designation || 'IOC PRESIDENT, BELGIUM').toUpperCase();

    const startX = 280;
    const startY = 840;
    const barWidth = 780;

    const hGrad18 = new fabric.Gradient({ type: 'linear', gradientUnits: 'pixels', coords: { x1: 0, y1: 0, x2: barWidth, y2: 0 }, colorStops: [{ offset: 0, color: gradientStart }, { offset: 0.5, color: gradientMid }, { offset: 1, color: gradientEnd }] });
    const headerBar18 = new fabric.Rect(createProps('rect', { left: startX, top: startY, width: barWidth, height: 42, fill: hGrad18, skewX: -12, rx: 5, ry: 5, stroke: borderHighlight, strokeWidth: 1.5, shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.6)', blur: 12, offsetX: 0, offsetY: 6 }) }));
    const nameText18 = new fabric.Textbox(presenterName, createProps('textbox', { left: startX + 20, top: startY + 9, fontSize: 22, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 660 }));
    const olympicRings18 = createOlympicRingsGroup(startX + 700, startY + 8, 9, 2.2);
    const subBar18 = new fabric.Rect(createProps('rect', { left: startX + 15, top: startY + 44, width: barWidth - 15, height: 26, fill: darkTabColor, skewX: -12, rx: 3, ry: 3 }));
    const titleText18 = new fabric.Textbox(presenterTitle, createProps('textbox', { left: startX + 30, top: startY + 48, fontSize: 14, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 680 }));
    objects.push(headerBar18, nameText18, olympicRings18, subBar18, titleText18);
  }

  // ── SW019 / Flower Presenter ID ──
  else if (normId.includes('SW019') || normId.includes('SW124') || normId.includes('FLOWER PRESENTER')) {
    const presenterName19 = (customData.name || customData.presenter || 'MR BILL MATSON').toUpperCase();
    const presenterTitle19 = (customData.title || customData.designation || 'VICE PRESIDENT, FINA').toUpperCase();

    const startX = 280;
    const startY = 840;
    const barWidth = 780;

    const hGrad19 = new fabric.Gradient({ type: 'linear', gradientUnits: 'pixels', coords: { x1: 0, y1: 0, x2: barWidth, y2: 0 }, colorStops: [{ offset: 0, color: gradientStart }, { offset: 0.5, color: gradientMid }, { offset: 1, color: gradientEnd }] });
    const headerBar19 = new fabric.Rect(createProps('rect', { left: startX, top: startY, width: barWidth, height: 42, fill: hGrad19, skewX: -12, rx: 5, ry: 5, stroke: borderHighlight, strokeWidth: 1.5, shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.6)', blur: 12, offsetX: 0, offsetY: 6 }) }));
    const nameText19 = new fabric.Textbox(presenterName19, createProps('textbox', { left: startX + 20, top: startY + 9, fontSize: 22, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 660 }));
    const olympicRings19 = createOlympicRingsGroup(startX + 700, startY + 8, 9, 2.2);
    const subBar19 = new fabric.Rect(createProps('rect', { left: startX + 15, top: startY + 44, width: barWidth - 15, height: 26, fill: darkTabColor, skewX: -12, rx: 3, ry: 3 }));
    const titleText19 = new fabric.Textbox(presenterTitle19, createProps('textbox', { left: startX + 30, top: startY + 48, fontSize: 14, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 680 }));
    objects.push(headerBar19, nameText19, olympicRings19, subBar19, titleText19);
  }

  // ── SW020 / Race Clock ──
  else if (normId.includes('SW020') || normId.includes('SW125') || normId.includes('RACE CLOCK')) {
    const timeVal = customData.time || '15.4';
    const startX = 1450;
    const startY = 860;

    const clockBody = new fabric.Rect(createProps('rect', {
      left: startX, top: startY, width: 170, height: 38,
      fill: '#d1d5db', skewX: -12, rx: 5, ry: 5,
      stroke: '#0088cc', strokeWidth: 1.5,
      shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.6)', blur: 10, offsetX: 0, offsetY: 4 })
    }));
    const timeText = new fabric.Textbox(timeVal, createProps('textbox', {
      left: startX + 10, top: startY + 6, fontSize: 22, fontWeight: '900', fontStyle: 'italic',
      fill: '#00192e', width: 140, textAlign: 'center'
    }));

    const ringsTab = new fabric.Rect(createProps('rect', {
      left: startX + 160, top: startY, width: 80, height: 38,
      fill: '#00192e', skewX: -12, rx: 5, ry: 5,
      stroke: '#0088cc', strokeWidth: 1.5
    }));
    const olympicRings = createOlympicRingsGroup(startX + 172, startY + 10, 6, 1.5);
    objects.push(clockBody, timeText, ringsTab, olympicRings);
  }

  // ── SW021 / Race Clock before Split Point ──
  else if (normId.includes('SW021') || normId.includes('SW128') || normId.includes('BEFORE SPLIT')) {
    const splitRecord = (customData.splitRecord || 'WR').toUpperCase();
    const splitTime = customData.splitTime || '22.44';
    const distanceVal = (customData.distance || '50M').toUpperCase();
    const clockTime = customData.time || '19.4';

    const leftX = 280;
    const leftY = 650;
    const recBg = new fabric.Rect(createProps('rect', {
      left: leftX, top: leftY, width: 230, height: 38,
      fill: '#00192e', skewX: -12, rx: 5, ry: 5, stroke: '#0088cc', strokeWidth: 1.5
    }));
    const badgeTab = new fabric.Rect(createProps('rect', {
      left: leftX + 5, top: leftY + 4, width: 45, height: 30,
      fill: splitRecord === 'WR' ? '#eab308' : '#e2e8f0', skewX: -12, rx: 3, ry: 3
    }));
    const badgeText = new fabric.Textbox(splitRecord, createProps('textbox', {
      left: leftX + 5, top: leftY + 9, fontSize: 16, fontWeight: '900', fontStyle: 'italic',
      fill: '#00192e', width: 45, textAlign: 'center'
    }));
    const splitLabel = new fabric.Textbox('SPLIT', createProps('textbox', {
      left: leftX + 58, top: leftY + 8, fontSize: 18, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: 60
    }));
    const splitTimeText = new fabric.Textbox(splitTime, createProps('textbox', {
      left: leftX + 125, top: leftY + 8, fontSize: 18, fontWeight: '900', fontStyle: 'italic',
      fill: '#e2e8f0', width: 95, textAlign: 'right'
    }));
    objects.push(recBg, badgeTab, badgeText, splitLabel, splitTimeText);

    const rightX = 950;
    const rightY = 650;

    const distTab = new fabric.Rect(createProps('rect', {
      left: rightX + 60, top: rightY - 26, width: 100, height: 24,
      fill: '#e2e8f0', skewX: -12, rx: 3, ry: 3
    }));
    const distText = new fabric.Textbox(distanceVal, createProps('textbox', {
      left: rightX + 60, top: rightY - 22, fontSize: 15, fontWeight: '900', fontStyle: 'italic',
      fill: '#00192e', width: 100, textAlign: 'center'
    }));

    const clockBody = new fabric.Rect(createProps('rect', {
      left: rightX, top: rightY, width: 170, height: 38,
      fill: '#d1d5db', skewX: -12, rx: 5, ry: 5, stroke: '#0088cc', strokeWidth: 1.5
    }));
    const timeText = new fabric.Textbox(clockTime, createProps('textbox', {
      left: rightX + 10, top: rightY + 6, fontSize: 22, fontWeight: '900', fontStyle: 'italic',
      fill: '#00192e', width: 140, textAlign: 'center'
    }));
    const ringsTab = new fabric.Rect(createProps('rect', {
      left: rightX + 160, top: rightY, width: 80, height: 38,
      fill: '#00192e', skewX: -12, rx: 5, ry: 5, stroke: '#0088cc', strokeWidth: 1.5
    }));
    const olympicRings = createOlympicRingsGroup(rightX + 172, rightY + 10, 6, 1.5);
    objects.push(distTab, distText, clockBody, timeText, ringsTab, olympicRings);
  }

  // ── SW022 / Race Clock at Split Point with Standings ──
  else if (normId.includes('SW022') || normId.includes('SW129') || normId.includes('SPLIT POINT WITH STANDINGS')) {
    const isB = normId.endsWith('B') || normId.includes('SW022B') || normId.includes('SW129B');
    const isC = normId.endsWith('C') || normId.includes('SW022C') || normId.includes('SW129C');
    const isD = normId.endsWith('D') || normId.includes('SW022D') || normId.includes('SW129D');
    const isE = normId.endsWith('E') || normId.includes('SW022E') || normId.includes('SW129E');
    const isA = !isB && !isC && !isD && !isE;

    const defaultStandingsA = [{ lane: '4', noc: 'AUS', name: 'SULLIVAN', gap: '' }];
    const defaultStandingsB = [{ lane: '3', noc: 'KOR', name: 'PARK', gap: '' }];
    const defaultStandingsC = [{ lane: '6', noc: 'TUN', name: 'MELLOULI', gap: '' }];
    const defaultStandingsD = [
      { lane: '6', noc: 'TUN', name: 'MELLOULI', gap: '' },
      { lane: '2', noc: 'CHN', name: 'SUN', gap: '+1.36' }
    ];
    const defaultStandingsE = [
      { lane: '6', noc: 'TUN', name: 'MELLOULI', gap: '' },
      { lane: '2', noc: 'CHN', name: 'SUN', gap: '+1.36' },
      { lane: '4', noc: 'POL', name: 'SAWRYMOWICZ', gap: '+4.95' }
    ];

    const standings = customData.standings || customData.athletes || (
      isE ? defaultStandingsE : isD ? defaultStandingsD : isC ? defaultStandingsC : isB ? defaultStandingsB : defaultStandingsA
    );

    const splitRecord = (customData.splitRecord || 'WR').toUpperCase();
    const splitTime = customData.splitTime || (isE || isD || isC ? '13:37.89' : isB ? '2:45.43' : '22.48');
    const diffTime = customData.diffTime || (isE || isD || isC ? '+12.74' : isB ? '0.00' : '-0.01');
    const distanceVal = (customData.distance || (isE || isD || isC ? '1400M' : isB ? '300M' : '50M')).toUpperCase();
    const clockTime = customData.time || (isE || isD || isC ? '13:50.63' : isB ? '2:45.43' : '22.47');

    const topX = 350;
    let topY = 60;
    const maxRows = isE ? 3 : isD ? 2 : 1;

    for (let idx = 0; idx < standings.length && idx < maxRows; idx++) {
      const p = standings[idx];
      const topBg = new fabric.Rect(createProps('rect', {
        left: topX, top: topY, width: 420, height: 34,
        fill: '#00192e', skewX: -12, rx: 4, ry: 4, stroke: '#0088cc', strokeWidth: 1.5
      }));
      const laneText = new fabric.Textbox(p.lane || '', createProps('textbox', {
        left: topX + 12, top: topY + 6, fontSize: 19, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 25, textAlign: 'center'
      }));
      objects.push(topBg, laneText);

      const flagBase64 = getFlagBase64(p.noc);
      if (flagBase64) {
        try {
          const imgObj = await fabric.Image.fromURL(flagBase64);
          imgObj.set({
            id: generateUniqueId({ type: 'image' }), left: topX + 42, top: topY + 7, scaleX: 65 / (imgObj.width || 32), scaleY: 20 / (imgObj.height || 20), skewX: -12, selectable: true, hasControls: true
          });
          objects.push(imgObj);
        } catch (e) { }
      }

      const nameText = new fabric.Textbox((p.name || '').toUpperCase(), createProps('textbox', {
        left: topX + 115, top: topY + 6, fontSize: 18, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 210
      }));
      objects.push(nameText);

      if (p.gap) {
        const gapText = new fabric.Textbox(p.gap, createProps('textbox', {
          left: topX + 330, top: topY + 6, fontSize: 18, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 75, textAlign: 'right'
        }));
        objects.push(gapText);
      }

      topY += 38;
    }

    const leftX = 280;
    const leftY = 650;
    const recBg = new fabric.Rect(createProps('rect', {
      left: leftX, top: leftY, width: 230, height: 38,
      fill: '#00192e', skewX: -12, rx: 5, ry: 5, stroke: '#0088cc', strokeWidth: 1.5
    }));
    const badgeTab = new fabric.Rect(createProps('rect', {
      left: leftX + 5, top: leftY + 4, width: 45, height: 30,
      fill: splitRecord === 'WR' ? '#eab308' : '#e2e8f0', skewX: -12, rx: 3, ry: 3
    }));
    const badgeText = new fabric.Textbox(splitRecord, createProps('textbox', {
      left: leftX + 5, top: leftY + 9, fontSize: 16, fontWeight: '900', fontStyle: 'italic', fill: '#00192e', width: 45, textAlign: 'center'
    }));
    const splitLabel = new fabric.Textbox('SPLIT', createProps('textbox', {
      left: leftX + 58, top: leftY + 8, fontSize: 18, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 60
    }));
    const splitTimeText = new fabric.Textbox(splitTime, createProps('textbox', {
      left: leftX + 125, top: leftY + 8, fontSize: 18, fontWeight: '900', fontStyle: 'italic', fill: '#e2e8f0', width: 95, textAlign: 'right'
    }));

    const diffBgColor = (isA && diffTime.startsWith('-')) ? '#16a34a' : '#0284c7';

    const diffBg = new fabric.Rect(createProps('rect', {
      left: leftX + 235, top: leftY, width: 85, height: 38,
      fill: diffBgColor, skewX: -12, rx: 4, ry: 4
    }));
    const diffText = new fabric.Textbox(diffTime, createProps('textbox', {
      left: leftX + 235, top: leftY + 8, fontSize: 18, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 85, textAlign: 'center'
    }));

    objects.push(recBg, badgeTab, badgeText, splitLabel, splitTimeText, diffBg, diffText);

    const rightX = 950;
    const rightY = 650;
    const distTab = new fabric.Rect(createProps('rect', {
      left: rightX + 60, top: rightY - 26, width: 100, height: 24, fill: '#e2e8f0', skewX: -12, rx: 3, ry: 3
    }));
    const distText = new fabric.Textbox(distanceVal, createProps('textbox', {
      left: rightX + 60, top: rightY - 22, fontSize: 15, fontWeight: '900', fontStyle: 'italic', fill: '#00192e', width: 100, textAlign: 'center'
    }));

    const clockBody = new fabric.Rect(createProps('rect', {
      left: rightX, top: rightY, width: 170, height: 38, fill: '#d1d5db', skewX: -12, rx: 5, ry: 5, stroke: '#0088cc', strokeWidth: 1.5
    }));
    const timeText = new fabric.Textbox(clockTime, createProps('textbox', {
      left: rightX + 10, top: rightY + 6, fontSize: 22, fontWeight: '900', fontStyle: 'italic', fill: '#00192e', width: 140, textAlign: 'center'
    }));
    const ringsTab = new fabric.Rect(createProps('rect', {
      left: rightX + 160, top: rightY, width: 80, height: 38, fill: '#00192e', skewX: -12, rx: 5, ry: 5, stroke: '#0088cc', strokeWidth: 1.5
    }));
    const olympicRings = createOlympicRingsGroup(rightX + 172, rightY + 10, 6, 1.5);
    objects.push(distTab, distText, clockBody, timeText, ringsTab, olympicRings);
  }

  // ── SW023 / Race Clock before Finish & SW024 / Race Clock at Finish ──
  else if (normId.includes('SW023') || normId.includes('SW024') || normId.includes('SW130') || normId.includes('FINISH')) {
    const wrTime = customData.wrTime || (normId.includes('SW024') ? '3:40.08' : '47.24');
    const orTime = customData.orTime || (normId.includes('SW024') ? '3:40.59' : '47.27');
    const clockTime = customData.time || (normId.includes('SW024') ? '3:41.60' : '47.1');

    const leftX = 280;
    const leftY = 610;

    const wrBg = new fabric.Rect(createProps('rect', {
      left: leftX, top: leftY, width: 190, height: 32, fill: '#00192e', skewX: -12, rx: 4, ry: 4, stroke: '#0088cc', strokeWidth: 1
    }));
    const wrBadge = new fabric.Rect(createProps('rect', {
      left: leftX + 4, top: leftY + 3, width: 40, height: 26, fill: '#eab308', skewX: -12, rx: 2, ry: 2
    }));
    const wrBadgeText = new fabric.Textbox('WR', createProps('textbox', {
      left: leftX + 4, top: leftY + 7, fontSize: 14, fontWeight: '900', fontStyle: 'italic', fill: '#00192e', width: 40, textAlign: 'center'
    }));
    const wrTimeText = new fabric.Textbox(wrTime, createProps('textbox', {
      left: leftX + 50, top: leftY + 6, fontSize: 17, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 130, textAlign: 'right'
    }));

    const orBg = new fabric.Rect(createProps('rect', {
      left: leftX, top: leftY + 36, width: 190, height: 32, fill: '#00192e', skewX: -12, rx: 4, ry: 4, stroke: '#0088cc', strokeWidth: 1
    }));
    const orBadge = new fabric.Rect(createProps('rect', {
      left: leftX + 4, top: leftY + 39, width: 40, height: 26, fill: '#e2e8f0', skewX: -12, rx: 2, ry: 2
    }));
    const orBadgeText = new fabric.Textbox('OR', createProps('textbox', {
      left: leftX + 4, top: leftY + 43, fontSize: 14, fontWeight: '900', fontStyle: 'italic', fill: '#00192e', width: 40, textAlign: 'center'
    }));
    const orTimeText = new fabric.Textbox(orTime, createProps('textbox', {
      left: leftX + 50, top: leftY + 42, fontSize: 17, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 130, textAlign: 'right'
    }));

    objects.push(wrBg, wrBadge, wrBadgeText, wrTimeText, orBg, orBadge, orBadgeText, orTimeText);

    const rightX = 950;
    const rightY = 650;
    const clockBody = new fabric.Rect(createProps('rect', {
      left: rightX, top: rightY, width: 170, height: 38, fill: '#d1d5db', skewX: -12, rx: 5, ry: 5, stroke: '#0088cc', strokeWidth: 1.5
    }));
    const timeText = new fabric.Textbox(clockTime, createProps('textbox', {
      left: rightX + 10, top: rightY + 6, fontSize: 22, fontWeight: '900', fontStyle: 'italic', fill: '#00192e', width: 140, textAlign: 'center'
    }));
    const ringsTab = new fabric.Rect(createProps('rect', {
      left: rightX + 160, top: rightY, width: 80, height: 38, fill: '#00192e', skewX: -12, rx: 5, ry: 5, stroke: '#0088cc', strokeWidth: 1.5
    }));
    const olympicRings = createOlympicRingsGroup(rightX + 172, rightY + 10, 6, 1.5);
    objects.push(clockBody, timeText, ringsTab, olympicRings);

    const isB = normId.endsWith('B') || normId.includes('SW024B') || normId.includes('SW130B');
    const isC = normId.endsWith('C') || normId.includes('SW024C') || normId.includes('SW130C');

    if (isB) {
      const newRecordTag = customData.newRecord || 'NEW OR';
      const newBg = new fabric.Rect(createProps('rect', {
        left: rightX + 60, top: rightY - 26, width: 90, height: 26, fill: '#e2e8f0', skewX: -12, rx: 3, ry: 3
      }));
      const newText = new fabric.Textbox(newRecordTag, createProps('textbox', {
        left: rightX + 60, top: rightY - 23, fontSize: 16, fontWeight: '900', fontStyle: 'italic', fill: '#00192e', width: 90, textAlign: 'center'
      }));
      objects.push(newBg, newText);
    }

    if (isC) {
      const laneNum = customData.lane || '3';
      const laneBg = new fabric.Rect(createProps('rect', {
        left: rightX - 45, top: rightY, width: 55, height: 38, fill: '#00192e', skewX: -12, rx: 5, ry: 5, stroke: '#0088cc', strokeWidth: 1.5
      }));
      const laneText = new fabric.Textbox(laneNum, createProps('textbox', {
        left: rightX - 45, top: rightY + 6, fontSize: 22, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 55, textAlign: 'center'
      }));
      objects.push(laneBg, laneText);
    }
  }

  // ── SW103 / Weather ──
  else if (normId.includes('SW103') || normId.includes('WEATHER')) {
    const airTemp = customData.airTemp || '21°C';
    const waterTemp = customData.waterTemp || '28°C';
    const humidity = customData.humidity || '83%';
    const windDir = (customData.windDir || 'EAST SOUTH EAST').toUpperCase();
    const windSpeed = customData.windSpeed || '5KM/H';

    const gunPathData = 'M 45 0 L 488 0 C 492 0, 495 3, 493 8 L 472 44 C 470 49, 465 54, 460 54 L 140 54 L 115 88 C 112 92, 106 95, 100 95 L 10 95 C 4 95, 0 90, 2 84 L 22 42 L 35 6 C 37 2, 41 0, 45 0 Z';

    const gunGradient = new fabric.Gradient({
      type: 'linear',
      gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: 490, y2: 0 },
      colorStops: [
        { offset: 0, color: gradientStart },
        { offset: 0.4, color: gradientMid },
        { offset: 1, color: gradientEnd }
      ]
    });

    const gunHeaderBody = new fabric.Path(gunPathData, createProps('path', {
      left: 240, top: 580,
      fill: gunGradient,
      stroke: borderHighlight,
      strokeWidth: 2,
      shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.7)', blur: 15, offsetX: 0, offsetY: 8 })
    }));

    const weatherIcon = new fabric.Textbox('🌧️', createProps('textbox', {
      left: 275, top: 611, fontSize: 42, fill: '#ffffff', width: 65, textAlign: 'center'
    }));

    const sportTitleText = new fabric.Textbox(sportTitle, createProps('textbox', {
      left: 395, top: 589, fontSize: 30, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: 220, charSpacing: 40
    }));

    const olympicRings = createOlympicRingsGroup(645, 595, 9, 2.2);

    const subBarGradient = new fabric.Gradient({
      type: 'linear',
      gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: 378, y2: 0 },
      colorStops: [
        { offset: 0, color: '#d1d5db' },
        { offset: 0.5, color: '#ffffff' },
        { offset: 1, color: '#e2e8f0' }
      ]
    });

    const subBarPathData = 'M 28 0 L 378 0 L 366 34 L 0 34 Z';

    const subBar = new fabric.Path(subBarPathData, createProps('path', {
      left: 350, top: 635,
      fill: subBarGradient,
      stroke: 'rgba(0,34,62,0.5)',
      strokeWidth: 1.2
    }));

    const weatherSubTitle = new fabric.Textbox('WEATHER', createProps('textbox', {
      left: 395, top: 640, fontSize: 21, fontWeight: '900', fontStyle: 'italic',
      fill: '#00223e', width: 320, charSpacing: 20
    }));

    objects.push(gunHeaderBody, weatherIcon, sportTitleText, olympicRings, subBar, weatherSubTitle);

    const rows = [
      { icon: '🌡️', label: 'AIR TEMPERATURE', val: airTemp },
      { icon: '🌊', label: 'WATER TEMPERATURE', val: waterTemp },
      { icon: '💦', label: 'HUMIDITY', val: humidity },
      { icon: '🧭', label: 'WIND DIRECTION', val: windDir },
      { icon: '🌬️', label: 'WIND SPEED', val: windSpeed }
    ];

    const rowPathData = 'M 24 0 L 488 0 L 488 34 L 0 34 Z';
    let ry = 675;
    rows.forEach((r, idx) => {
      const rowFill = idx % 2 === 0 ? darkTabColor : altRowColor;
      const rBar = new fabric.Path(rowPathData, createProps('path', {
        left: 240, top: ry, fill: rowFill, stroke: 'rgba(0,136,204,0.6)', strokeWidth: 1
      }));
      const iText = new fabric.Textbox(r.icon, createProps('textbox', {
        left: 272, top: ry + 5, fontSize: 18, fill: '#ffffff', width: 28
      }));
      const lText = new fabric.Textbox(r.label, createProps('textbox', {
        left: 308, top: ry + 7, fontSize: 17, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 350
      }));
      const vText = new fabric.Textbox(r.val, createProps('textbox', {
        left: 450, top: ry + 7, fontSize: 17, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 250, textAlign: 'right'
      }));
      objects.push(rBar, iText, lText, vText);
      ry += 38;
    });
  }

  // ── SW106 / Athlete ID (Open Water) ──
  else if (normId.includes('SW106') || normId.includes('ATHLETE ID')) {
    const athNum = customData.num || customData.lane || '17';
    const nocCode = (customData.noc || 'NED').toUpperCase();
    const nameVal = (customData.name || customData.team || 'MAARTEN VAN DER WEIJDEN').toUpperCase();

    const startX = 280;
    const startY = 840;
    const barW = 780;

    const mainBar = new fabric.Rect(createProps('rect', {
      left: startX, top: startY, width: barW, height: 42, fill: gradientStart, skewX: -12, rx: 5, ry: 5, stroke: borderHighlight, strokeWidth: 1.5
    }));
    objects.push(mainBar);

    const flagBase64 = getFlagBase64(nocCode);
    if (flagBase64) {
      try {
        const imgObj = await fabric.Image.fromURL(flagBase64);
        imgObj.set({
          id: generateUniqueId({ type: 'image' }), left: startX + 18, top: startY + 9, scaleX: 70 / (imgObj.width || 32), scaleY: 22 / (imgObj.height || 20), skewX: -12, selectable: true, hasControls: true
        });
        objects.push(imgObj);
      } catch (e) { }
    }

    const numText = new fabric.Textbox(athNum, createProps('textbox', {
      left: startX + 98, top: startY + 9, fontSize: 22, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 45, textAlign: 'center'
    }));
    const nameText = new fabric.Textbox(nameVal, createProps('textbox', {
      left: startX + 150, top: startY + 9, fontSize: 22, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 510
    }));

    const olympicRings = createOlympicRingsGroup(startX + 700, startY + 8, 9, 2.2);
    objects.push(numText, nameText, olympicRings);
  }

  // ── SW107 / Position on Screen Layout ──
  else if (normId.includes('SW107') || normId.includes('POSITION ON SCREEN')) {
    const defaultAthletes = [
      { noc: 'UKR', num: '4', name: 'I. CHERVYNSKIY' },
      { noc: 'USA', num: '18', name: 'M. WARKENTIN' }
    ];

    const athletes = customData.athletes || customData.members || (
      (customData.name || customData.noc || customData.num)
        ? [{ noc: customData.noc || 'UKR', num: customData.num || customData.bib || customData.lane || '4', name: customData.name || 'I. CHERVYNSKIY' }]
        : defaultAthletes
    );

    let startX = customData.posX ? Number(customData.posX) : 280;
    const startY = customData.posY ? Number(customData.posY) : 960;
    const bugW = 390;
    const bugH = 34;

    for (let idx = 0; idx < athletes.length && idx < 2; idx++) {
      const p = athletes[idx];
      const nocCode = (p.noc || (idx === 0 ? 'UKR' : 'USA')).toUpperCase();
      const bibNum = p.num || p.bib || p.lane || (idx === 0 ? '4' : '18');
      const nameVal = (p.name || (idx === 0 ? 'I. CHERVYNSKIY' : 'M. WARKENTIN')).toUpperCase();

      const mainBar = new fabric.Rect(createProps('rect', {
        left: startX, top: startY, width: bugW, height: bugH,
        fill: '#00192e', skewX: -12, rx: 4, ry: 4,
        stroke: borderHighlight, strokeWidth: 1.5,
        shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.7)', blur: 10, offsetX: 0, offsetY: 5 })
      }));
      objects.push(mainBar);

      const flagBase64 = getFlagBase64(nocCode);
      if (flagBase64) {
        try {
          const imgObj = await fabric.Image.fromURL(flagBase64);
          imgObj.set({
            id: generateUniqueId({ type: 'image' }),
            left: startX + 12, top: startY + 8,
            scaleX: 55 / (imgObj.width || 32),
            scaleY: 18 / (imgObj.height || 20),
            skewX: -12, selectable: true, hasControls: true
          });
          objects.push(imgObj);
        } catch (e) { }
      }

      const bibText = new fabric.Textbox(bibNum, createProps('textbox', {
        left: startX + 82, top: startY + 6, fontSize: 18, fontWeight: '900', fontStyle: 'italic', fill: '#0088cc', width: 45, textAlign: 'center'
      }));

      const nameText = new fabric.Textbox(nameVal, createProps('textbox', {
        left: startX + 137, top: startY + 6, fontSize: 18, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 240
      }));

      objects.push(bibText, nameText);
      startX += bugW + 40;
    }
  }

  // ── SW108 / In-Race ID ──
  else if (normId.includes('SW108') || normId.includes('IN-RACE ID')) {
    const bibNum = customData.num || customData.bib || customData.lane || '18';
    const nocCode = (customData.noc || 'USA').toUpperCase();
    const nameVal = (customData.name || customData.team || 'MARK WARKENTIN').toUpperCase();

    const startX = customData.posX ? Number(customData.posX) : 280;
    const startY = customData.posY ? Number(customData.posY) : 940;
    const mainBar = new fabric.Rect(createProps('rect', {
      left: startX, top: startY, width: 540, height: 42, fill: gradientStart, skewX: -12, rx: 5, ry: 5, stroke: borderHighlight, strokeWidth: 1.5
    }));
    objects.push(mainBar);

    const flagBase64 = getFlagBase64(nocCode);
    if (flagBase64) {
      try {
        const imgObj = await fabric.Image.fromURL(flagBase64);
        imgObj.set({
          id: generateUniqueId({ type: 'image' }), left: startX + 16, top: startY + 10,
          scaleX: 60 / (imgObj.width || 32), scaleY: 20 / (imgObj.height || 20), skewX: -12
        });
        objects.push(imgObj);
      } catch (e) { }
    }

    const bibText = new fabric.Textbox(bibNum, createProps('textbox', {
      left: startX + 85, top: startY + 9, fontSize: 20, fontWeight: '900', fontStyle: 'italic', fill: '#0088cc', width: 45, textAlign: 'center'
    }));

    const nameText = new fabric.Textbox(nameVal, createProps('textbox', {
      left: startX + 140, top: startY + 9, fontSize: 20, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 380
    }));

    objects.push(bibText, nameText);
  }

  // ── SW109 / In-Race Place ID ──
  else if (normId.includes('SW109') || normId.includes('IN-RACE PLACE ID')) {
    const bibNum = customData.num || customData.bib || customData.lane || '14';
    const nocCode = (customData.noc || 'RUS').toUpperCase();
    const nameVal = (customData.name || customData.team || 'EVGENY DRATTSEV').toUpperCase();
    const placeVal = (customData.place || customData.badge || '2ND PLACE').toUpperCase();

    const startX = customData.posX ? Number(customData.posX) : 280;
    const startY = customData.posY ? Number(customData.posY) : 940;

    const mainBar = new fabric.Rect(createProps('rect', {
      left: startX, top: startY, width: 540, height: 42, fill: gradientStart, skewX: -12, rx: 5, ry: 5, stroke: borderHighlight, strokeWidth: 1.5
    }));
    objects.push(mainBar);

    const flagBase64 = getFlagBase64(nocCode);
    if (flagBase64) {
      try {
        const imgObj = await fabric.Image.fromURL(flagBase64);
        imgObj.set({
          id: generateUniqueId({ type: 'image' }), left: startX + 16, top: startY + 10,
          scaleX: 60 / (imgObj.width || 32), scaleY: 20 / (imgObj.height || 20), skewX: -12
        });
        objects.push(imgObj);
      } catch (e) { }
    }

    const bibText = new fabric.Textbox(bibNum, createProps('textbox', {
      left: startX + 85, top: startY + 9, fontSize: 20, fontWeight: '900', fontStyle: 'italic', fill: '#0088cc', width: 45, textAlign: 'center'
    }));

    const nameText = new fabric.Textbox(nameVal, createProps('textbox', {
      left: startX + 140, top: startY + 9, fontSize: 20, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 380
    }));

    const subBar = new fabric.Rect(createProps('rect', {
      left: startX, top: startY + 45, width: 160, height: 26, fill: '#ffffff', skewX: -12, rx: 4, ry: 4, stroke: '#ffffff', strokeWidth: 1
    }));
    const subText = new fabric.Textbox(placeVal, createProps('textbox', {
      left: startX + 10, top: startY + 49, fontSize: 15, fontWeight: '900', fontStyle: 'italic', fill: '#00192e', width: 140, textAlign: 'center'
    }));

    objects.push(bibText, nameText, subBar, subText);
  }

  // ── SW110 / Group Indicator ──
  else if (normId.includes('SW110') || normId.includes('GROUP INDICATOR')) {
    const titleVal = (customData.title || customData.group || 'LEADERS').toUpperCase();
    const startX = customData.posX ? Number(customData.posX) : 280;
    const startY = customData.posY ? Number(customData.posY) : 960;

    const mainBar = new fabric.Rect(createProps('rect', {
      left: startX, top: startY, width: 180, height: 34, fill: '#ffffff', skewX: -12, rx: 4, ry: 4, stroke: '#0088cc', strokeWidth: 1.5
    }));
    const mainText = new fabric.Textbox(titleVal, createProps('textbox', {
      left: startX + 10, top: startY + 6, fontSize: 17, fontWeight: '900', fontStyle: 'italic', fill: '#00192e', width: 160, textAlign: 'center'
    }));

    objects.push(mainBar, mainText);
  }

  // ── SW111 / Group Members ──
  else if (normId.includes('SW111') || normId.includes('GROUP MEMBERS')) {
    const titleVal = (customData.title || customData.group || 'LEADERS').toUpperCase();
    const defaultMembers = [
      { noc: 'UKR', num: '4', name: 'I. CHERVYNSKIY' },
      { noc: 'ESP', num: '2', name: 'F.J. HERVAS' },
      { noc: 'VEN', num: '9', name: 'E.MALDONADO SAVERA' }
    ];
    const members = customData.members || customData.athletes || defaultMembers;

    const startX = customData.posX ? Number(customData.posX) : 280;
    let startY = customData.posY ? Number(customData.posY) : 830;

    const headerBar = new fabric.Rect(createProps('rect', {
      left: startX + 50, top: startY, width: 200, height: 26, fill: '#ffffff', skewX: -12, rx: 4, ry: 4, stroke: '#0088cc', strokeWidth: 1.5
    }));
    const headerText = new fabric.Textbox(titleVal, createProps('textbox', {
      left: startX + 50, top: startY + 4, fontSize: 16, fontWeight: '900', fontStyle: 'italic', fill: '#00192e', width: 200, textAlign: 'center'
    }));
    objects.push(headerBar, headerText);
    startY += 30;

    for (let idx = 0; idx < members.length && idx < 5; idx++) {
      const p = members[idx];
      const nocCode = (p.noc || 'UKR').toUpperCase();
      const bibNum = p.num || p.bib || p.lane || '';
      const nameVal = (p.name || '').toUpperCase();

      const rBar = new fabric.Rect(createProps('rect', {
        left: startX, top: startY, width: 380, height: 32, fill: '#002f5a', skewX: -12, rx: 3, ry: 3, stroke: '#0088cc', strokeWidth: 1.5
      }));
      objects.push(rBar);

      const flagBase64 = getFlagBase64(nocCode);
      if (flagBase64) {
        try {
          const imgObj = await fabric.Image.fromURL(flagBase64);
          imgObj.set({
            id: generateUniqueId({ type: 'image' }), left: startX + 15, top: startY + 8,
            scaleX: 34 / (imgObj.width || 32), scaleY: 16 / (imgObj.height || 20), skewX: -12
          });
          objects.push(imgObj);
        } catch (e) { }
      }

      const bibText = new fabric.Textbox(bibNum, createProps('textbox', {
        left: startX + 65, top: startY + 6, fontSize: 16, fontWeight: '900', fontStyle: 'italic', fill: '#00e5ff', width: 30
      }));
      objects.push(bibText);

      const nameText = new fabric.Textbox(nameVal, createProps('textbox', {
        left: startX + 100, top: startY + 6, fontSize: 16, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 260
      }));
      objects.push(nameText);

      startY += 34;
    }
  }

  // ── SW112 / Gap between 2 Groups (SW112A & SW112B) ──
  else if (normId.includes('SW112') || normId.includes('GAP BETWEEN 2 GROUPS')) {
    const isB = normId.endsWith('B') || normId.includes('SW112B');
    const group1 = (customData.group1 || (isB ? 'PACK' : 'LEADER')).toUpperCase();
    const gapTime = customData.gap || customData.time || '1:15';
    const group2 = (customData.group2 || (isB ? 'LEADER' : 'PACK')).toUpperCase();

    let startX = customData.posX ? Number(customData.posX) : 315;
    const startY = customData.posY ? Number(customData.posY) : 975;

    const silverGradient = new fabric.Gradient({
      type: 'linear',
      gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: 240, y2: 0 },
      colorStops: [
        { offset: 0, color: '#cbd5e1' },
        { offset: 0.5, color: '#ffffff' },
        { offset: 1, color: '#e2e8f0' }
      ]
    });

    // Left group pill (White / Metallic silver capsule)
    const b1 = new fabric.Rect(createProps('rect', {
      left: startX, top: startY, width: 240, height: 48, fill: silverGradient, skewX: -12, rx: 24, ry: 24, stroke: '#00223e', strokeWidth: 2
    }));
    const t1 = new fabric.Textbox(group1, createProps('textbox', {
      left: startX + 10, top: startY + 6, fontSize: 30, fontWeight: '900', fontStyle: 'italic', fill: '#00192e', width: 220, textAlign: 'center'
    }));

    // Center time pill (Dark Blue with White text)
    const b2 = new fabric.Rect(createProps('rect', {
      left: startX + 252, top: startY, width: 115, height: 48, fill: '#00192e', skewX: -12, rx: 6, ry: 6, stroke: borderHighlight, strokeWidth: 2
    }));
    const t2 = new fabric.Textbox(gapTime, createProps('textbox', {
      left: startX + 257, top: startY + 6, fontSize: 30, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 105, textAlign: 'center'
    }));

    // Right group pill (White / Metallic silver capsule)
    const b3 = new fabric.Rect(createProps('rect', {
      left: startX + 379, top: startY, width: 240, height: 48, fill: silverGradient, skewX: -12, rx: 24, ry: 24, stroke: '#00223e', strokeWidth: 2
    }));
    const t3 = new fabric.Textbox(group2, createProps('textbox', {
      left: startX + 389, top: startY + 6, fontSize: 30, fontWeight: '900', fontStyle: 'italic', fill: '#00192e', width: 220, textAlign: 'center'
    }));

    objects.push(b1, t1, b2, t2, b3, t3);
  }

  // ── SW113 / Gap between 3 Groups ──
  else if (normId.includes('SW113') || normId.includes('GAP BETWEEN 3 GROUPS')) {
    const group1 = (customData.group1 || 'LEADER').toUpperCase();
    const gap1 = customData.gap1 || '0:13';
    const group2 = (customData.group2 || 'CHASE').toUpperCase();
    const gap2 = customData.gap2 || '0:25';
    const group3 = (customData.group3 || 'PACK').toUpperCase();

    let startX = customData.posX ? Number(customData.posX) : 100;
    const startY = customData.posY ? Number(customData.posY) : 900;

    const silverGradient = new fabric.Gradient({
      type: 'linear',
      gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: 260, y2: 0 },
      colorStops: [
        { offset: 0, color: '#cbd5e1' },
        { offset: 0.5, color: '#ffffff' },
        { offset: 1, color: '#e2e8f0' }
      ]
    });

    const items = [
      { type: 'group', val: group1, w: 260 },
      { type: 'gap', val: gap1, w: 120 },
      { type: 'group', val: group2, w: 260 },
      { type: 'gap', val: gap2, w: 120 },
      { type: 'group', val: group3, w: 260 }
    ];

    items.forEach(it => {
      if (it.type === 'group') {
        const bg = new fabric.Rect(createProps('rect', {
          left: startX, top: startY, width: it.w, height: 64, fill: silverGradient, skewX: -12, rx: 32, ry: 32, stroke: '#00223e', strokeWidth: 2.5
        }));
        const tx = new fabric.Textbox(it.val, createProps('textbox', {
          left: startX + 10, top: startY + 11, fontSize: 32, fontWeight: '900', fontStyle: 'italic', fill: '#00192e', width: it.w - 20, textAlign: 'center'
        }));
        objects.push(bg, tx);
      } else {
        const bg = new fabric.Rect(createProps('rect', {
          left: startX, top: startY, width: it.w, height: 64, fill: '#00192e', skewX: -12, rx: 8, ry: 8, stroke: borderHighlight, strokeWidth: 2.5
        }));
        const tx = new fabric.Textbox(it.val, createProps('textbox', {
          left: startX + 5, top: startY + 11, fontSize: 32, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: it.w - 10, textAlign: 'center'
        }));
        objects.push(bg, tx);
      }
      startX += it.w + 18;
    });
  }

  // ── SW114 / Winner/Winners/Place ID ──
  else if (normId.includes('SW114')) {
    const isC = normId.endsWith('C') || normId.includes('SW114C');
    const categoryTitle = (customData.title || customData.event || (isC ? "WINNERS - MEN'S MARATHON 10KM" : "WINNER - MEN'S MARATHON 10KM")).toUpperCase();

    const defaultWinnersA = [
      { num: '17', noc: 'NED', name: 'MAARTEN VAN DER WEIJDEN', time: '1:51:51.6' }
    ];
    const defaultWinnersC = [
      { num: '17', noc: 'NED', name: 'MAARTEN VAN DER WEIJDEN', time: '1:51:51.6' },
      { num: '10', noc: 'GBR', name: 'DAVID DAVIES', time: '1:51:51.6' }
    ];

    const athletes = customData.athletes || customData.winners || (isC ? defaultWinnersC : defaultWinnersA);

    const startX = 280;
    const startY = athletes.length > 1 ? 680 : 720;
    const barWidth = 780;
    const headerHeight = 42;

    const headerGradient = new fabric.Gradient({
      type: 'linear', gradientUnits: 'pixels', coords: { x1: 0, y1: 0, x2: barWidth, y2: 0 },
      colorStops: [ { offset: 0, color: gradientStart }, { offset: 0.5, color: gradientMid }, { offset: 1, color: gradientEnd } ]
    });

    const headerBar = new fabric.Rect(createProps('rect', {
      left: startX, top: startY, width: barWidth, height: headerHeight,
      fill: headerGradient, skewX: -12, rx: 5, ry: 5, stroke: borderHighlight, strokeWidth: 1.5,
      shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.6)', blur: 12, offsetX: 0, offsetY: 6 })
    }));

    const swimmerIcon = new fabric.Textbox('🏊', createProps('textbox', {
      left: startX + 22, top: startY + 6, fontSize: 24, fill: '#ffffff', width: 40
    }));

    const sportTitleText = new fabric.Textbox(sportTitle, createProps('textbox', {
      left: startX + 100, top: startY + 8, fontSize: 24, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 450, charSpacing: 90
    }));

    const olympicRings = createOlympicRingsGroup(startX + 665, startY + 12, 7.5, 1.8);

    const subBar = new fabric.Rect(createProps('rect', {
      left: startX + 15, top: startY + 44, width: barWidth - 30, height: 26, fill: '#e2e8f0', skewX: -12, rx: 3, ry: 3, stroke: 'rgba(0,34,62,0.3)', strokeWidth: 1
    }));

    const subText = new fabric.Textbox(categoryTitle, createProps('textbox', {
      left: startX + 35, top: startY + 48, fontSize: 16, fontWeight: '900', fontStyle: 'italic', fill: '#00223e', width: 680, charSpacing: 60
    }));

    objects.push(headerBar, swimmerIcon, sportTitleText, olympicRings, subBar, subText);

    let cy = startY + 74;
    for (let i = 0; i < athletes.length; i++) {
      const athlete = athletes[i];
      const athNum = (athlete.num || athlete.lane || '').toString();
      const nocCode = (athlete.noc || '').toUpperCase();
      const athleteName = (athlete.name || athlete.team || '').toUpperCase();
      const timeVal = athlete.time || '';

      const rowFill = i % 2 === 0 ? darkTabColor : altRowColor;

      const rowBar = new fabric.Rect(createProps('rect', {
        left: startX + 15, top: cy, width: barWidth - 30, height: 32, fill: rowFill, skewX: -12, rx: 3, ry: 3, stroke: 'rgba(0,136,204,0.5)', strokeWidth: 1
      }));
      objects.push(rowBar);

      const flagBase64 = getFlagBase64(nocCode);
      if (flagBase64) {
        try {
          const imgObj = await fabric.Image.fromURL(flagBase64);
          imgObj.set({
            id: generateUniqueId({ type: 'image' }), left: startX + 26, top: cy + 5,
            scaleX: 70 / (imgObj.width || 32), scaleY: 22 / (imgObj.height || 20), skewX: -12
          });
          objects.push(imgObj);
        } catch (e) { }
      }

      const bibText = new fabric.Textbox(athNum, createProps('textbox', {
        left: startX + 105, top: cy + 6, fontSize: 16, fontWeight: '900', fontStyle: 'italic', fill: '#0088cc', width: 45, textAlign: 'center'
      }));

      const nameText = new fabric.Textbox(athleteName, createProps('textbox', {
        left: startX + 158, top: cy + 6, fontSize: 16, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 420
      }));

      const timeText = new fabric.Textbox(timeVal, createProps('textbox', {
        left: startX + 625, top: cy + 6, fontSize: 16, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 120, textAlign: 'right'
      }));

      objects.push(bibText, nameText, timeText);
      cy += 36;
    }
  }

  // ── SW117 / MF Standings ──
  else if (normId.includes('SW117') || normId.includes('MF STANDINGS')) {
    const subTitle = (customData.title || customData.subtitle || 'LAP 3 OF 6').toUpperCase();
    const defaultRows = [
      { rank: '1', noc: 'NED', num: '17', name: 'M. VAN DER WEIJDEN', time: '55:55.8' },
      { rank: '2', noc: 'GBR', num: '10', name: 'D. DAVIES', time: '+0.8' },
      { rank: '2', noc: 'GER', num: '6', name: 'T. LURZ', time: '+0.8' },
      { rank: '4', noc: 'ITA', num: '3', name: 'V. CLERI', time: '+8.0' },
      { rank: '5', noc: 'RUS', num: '14', name: 'E. DRATTSEV', time: '+8.7' }
    ];
    const rowsList = customData.rows || customData.standings || defaultRows;

    const startX = customData.posX ? Number(customData.posX) : 280;
    let startY = customData.posY ? Number(customData.posY) : 740;

    const headerBar = new fabric.Rect(createProps('rect', {
      left: startX + 40, top: startY, width: 180, height: 26, fill: '#ffffff', skewX: -12, rx: 4, ry: 4, stroke: '#0088cc', strokeWidth: 1.5
    }));
    const headerText = new fabric.Textbox(subTitle, createProps('textbox', {
      left: startX + 50, top: startY + 4, fontSize: 15, fontWeight: '900', fontStyle: 'italic', fill: '#00192e', width: 160, textAlign: 'center'
    }));
    objects.push(headerBar, headerText);
    startY += 30;

    for (let idx = 0; idx < rowsList.length; idx++) {
      const r = rowsList[idx];
      const rBar = new fabric.Rect(createProps('rect', {
        left: startX, top: startY, width: 480, height: 32, fill: idx === 0 ? darkTabColor : altRowColor, skewX: -12, rx: 3, ry: 3, stroke: borderHighlight, strokeWidth: 1
      }));

      const rBadge = new fabric.Rect(createProps('rect', {
        left: startX, top: startY, width: 32, height: 32, fill: '#dc2626', skewX: -12, rx: 3, ry: 3
      }));
      const rText = new fabric.Textbox(r.rank || '', createProps('textbox', {
        left: startX + 2, top: startY + 5, fontSize: 16, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 28, textAlign: 'center'
      }));

      const flagBase64 = getFlagBase64(r.noc);

      const numText = new fabric.Textbox(r.num || r.bib || '', createProps('textbox', {
        left: startX + 95, top: startY + 6, fontSize: 16, fontWeight: '900', fontStyle: 'italic', fill: '#0088cc', width: 35, textAlign: 'center'
      }));

      const nameText = new fabric.Textbox((r.name || '').toUpperCase(), createProps('textbox', {
        left: startX + 137, top: startY + 6, fontSize: 16, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 225
      }));

      const valText = new fabric.Textbox(r.time || r.val || '', createProps('textbox', {
        left: startX + 365, top: startY + 6, fontSize: 16, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 100, textAlign: 'right'
      }));

      objects.push(rBar, rBadge, rText, numText, nameText, valText);

      if (flagBase64) {
        try {
          const imgObj = await fabric.Image.fromURL(flagBase64);
          imgObj.set({
            id: generateUniqueId({ type: 'image' }), left: startX + 42, top: startY + 8,
            scaleX: 45 / (imgObj.width || 32), scaleY: 16 / (imgObj.height || 20), skewX: -12
          });
          objects.push(imgObj);
        } catch (e) { }
      }

      startY += 34;
    }
  }

  // ── SW118 / Standings & SW119 / Standings at Finish ──
  else if (normId.includes('SW118') || normId.includes('SW119') || (normId.includes('STANDINGS') && normId.includes('OPEN WATER'))) {
    const isFinish = normId.includes('SW119') || normId.includes('FINISH');
    const subTitle = customData.subtitle || (isFinish ? 'STANDINGS AT FINISH' : 'STANDINGS - LAP 3 OF 6');

    const defaultRows118 = [
      { rank: '1', noc: 'NED', num: '17', name: 'MAARTEN VAN DER WEIJDEN', time: '55:55.8' },
      { rank: '2', noc: 'GBR', num: '10', name: 'DAVID DAVIES', time: '+0.8' },
      { rank: '2', noc: 'GER', num: '6', name: 'THOMAS LURZ', time: '+0.8' },
      { rank: '4', noc: 'ITA', num: '3', name: 'VALERIO CLERI', time: '+8.0' },
      { rank: '5', noc: 'RUS', num: '14', name: 'EVGENY DRATTSEV', time: '+8.7' },
      { rank: '6', noc: 'BUL', num: '21', name: 'PETAR STOYCHEV', time: '+8.8' },
      { rank: '7', noc: 'BEL', num: '8', name: 'BRIAN RYCKEMAN', time: '+9.6' },
      { rank: '7', noc: 'USA', num: '18', name: 'MARK WARKENTIN', time: '+9.6' },
      { rank: '', noc: 'RSA', num: '5', name: 'CHAD HO', time: 'DNF' }
    ];

    const defaultRows119 = [
      { rank: '1', noc: 'NED', num: '17', name: 'MAARTEN VAN DER WEIJDEN', time: '1:51:51.6' },
      { rank: '2', noc: 'GBR', num: '10', name: 'DAVID DAVIES', time: '1:51:53.1' },
      { rank: '3', noc: 'GER', num: '6', name: 'THOMAS LURZ', time: '1:51:53.6' },
      { rank: '4', noc: 'ITA', num: '3', name: 'VALERIO CLERI', time: '1:52:07.5' },
      { rank: '', noc: 'RUS', num: '14', name: 'EVGENY DRATTSEV', time: 'PHOTO' },
      { rank: '', noc: 'BUL', num: '21', name: 'PETAR STOYCHEV', time: 'PHOTO' },
      { rank: '7', noc: 'BEL', num: '8', name: 'BRIAN RYCKEMAN', time: '1:52:10.7' },
      { rank: '8', noc: 'USA', num: '18', name: 'MARK WARKENTIN', time: '1:52:13.0' },
      { rank: '9', noc: 'RSA', num: '5', name: 'CHAD HO', time: '1:52:13.1' }
    ];

    const rowsList = customData.rows || customData.standings || (isFinish ? defaultRows119 : defaultRows118);

    const startX = 280;
    let startY = 580;

    const mainHeader = new fabric.Rect(createProps('rect', {
      left: startX, top: startY, width: 780, height: 42, fill: gradientStart, skewX: -12, rx: 4, ry: 4, stroke: borderHighlight, strokeWidth: 1.5
    }));
    const sportText = new fabric.Textbox(customData.title ? customData.title.toUpperCase() : "MEN'S MARATHON 10KM", createProps('textbox', {
      left: startX + 20, top: startY + 8, fontSize: 22, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 740
    }));

    const subBar = new fabric.Rect(createProps('rect', {
      left: startX + 40, top: startY + 46, width: 740, height: 26, fill: '#ffffff', skewX: -12, rx: 4, ry: 4, stroke: borderHighlight, strokeWidth: 1
    }));
    const subText = new fabric.Textbox(subTitle.toUpperCase(), createProps('textbox', {
      left: startX + 50, top: startY + 50, fontSize: 15, fontWeight: '900', fontStyle: 'italic', fill: '#00192e', width: 720
    }));

    objects.push(mainHeader, sportText, subBar, subText);
    startY += 76;

    for (let idx = 0; idx < rowsList.length; idx++) {
      const r = rowsList[idx];
      const rBar = new fabric.Rect(createProps('rect', {
        left: startX, top: startY, width: 780, height: 32, fill: idx % 2 === 0 ? darkTabColor : altRowColor, skewX: -12, rx: 3, ry: 3, stroke: borderHighlight, strokeWidth: 1
      }));
      objects.push(rBar);

      if (r.rank) {
        const rBadge = new fabric.Rect(createProps('rect', {
          left: startX, top: startY, width: 34, height: 32, fill: '#dc2626', skewX: -12, rx: 3, ry: 3
        }));
        const rText = new fabric.Textbox(r.rank, createProps('textbox', {
          left: startX + 2, top: startY + 5, fontSize: 16, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 30, textAlign: 'center'
        }));
        objects.push(rBadge, rText);
      }

      const nocText = new fabric.Textbox((r.noc || '').toUpperCase(), createProps('textbox', {
        left: startX + 42, top: startY + 6, fontSize: 16, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 45
      }));

      const numText = new fabric.Textbox(r.num || r.bib || '', createProps('textbox', {
        left: startX + 140, top: startY + 6, fontSize: 16, fontWeight: '900', fontStyle: 'italic', fill: '#0088cc', width: 35, textAlign: 'center'
      }));

      const nameText = new fabric.Textbox((r.name || '').toUpperCase(), createProps('textbox', {
        left: startX + 185, top: startY + 6, fontSize: 16, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 380
      }));

      const valText = new fabric.Textbox(r.time || r.val || '', createProps('textbox', {
        left: startX + 580, top: startY + 6, fontSize: 16, fontWeight: '900', fontStyle: 'italic', fill: r.time === 'DNF' ? '#ef4444' : r.time === 'PHOTO' ? '#0088cc' : '#ffffff', width: 180, textAlign: 'right'
      }));

      objects.push(nocText, numText, nameText, valText);

      const flagBase64 = getFlagBase64(r.noc);
      if (flagBase64) {
        try {
          const imgObj = await fabric.Image.fromURL(flagBase64);
          imgObj.set({
            id: generateUniqueId({ type: 'image' }), left: startX + 90, top: startY + 7,
            scaleX: 45 / (imgObj.width || 32), scaleY: 16 / (imgObj.height || 20), skewX: -12
          });
          objects.push(imgObj);
        } catch (e) { }
      }

      startY += 36;
    }
  }

  // ── SW006 / Lane ID Layout (5 Distinct Variants SW006a to SW006e) ──
  else if (normId.includes('SW006') || normId.includes('SW106') || normId.includes('LANE ID')) {
    const isB = normId.endsWith('B') || normId.includes('SW006B') || normId.includes('SW106B');
    const isC = normId.endsWith('C') || normId.includes('SW006C') || normId.includes('SW106C');
    const isD = normId.endsWith('D') || normId.includes('SW006D') || normId.includes('SW106D');
    const isE = normId.endsWith('E') || normId.includes('SW006E') || normId.includes('SW106E');

    const laneNum = customData.lane || (isB ? '5' : isC ? '7' : isD ? '7' : isE ? '4' : '4');
    const nocCode = (customData.noc || (isB ? 'FRA' : isC ? 'HUN' : isD || isE ? 'USA' : 'POL')).toUpperCase();
    const athleteName = (customData.name || customData.team || (isB ? 'FRANCE' : isC ? 'BEATRIX BOULSEVICZ' : isD ? 'KATHLEEN HERSEY' : isE ? 'UNITED STATES' : 'OTYLIA JEDRZEJCZAK')).toUpperCase();
    const topBadge = customData.topBadge || (isC ? 'FALSE START' : '');
    const statusBadge = customData.status || (isC ? 'DSQ' : '');

    // Bottom sub-bar is STRICTLY ONLY shown on Variant D and Variant E!
    const timeResult = (isD || isE) ? (customData.time || (isD ? '2:06.96' : '7:04.66')) : '';
    const hasOrRecord = isE || (isD && customData.record === 'OR');
    const hasQBadge = isD || isE;

    const startX = 280;
    const startY = 800;
    const barWidth = 780;
    const barHeight = 42;

    // 1. Top Badge (SW006c FALSE START tab above left)
    if (topBadge) {
      const topTab = new fabric.Rect(createProps('rect', {
        left: startX + 40, top: startY - 24, width: 140, height: 22,
        fill: '#e2e8f0', rx: 3, ry: 3, skewX: -12,
        stroke: '#ffffff', strokeWidth: 1
      }));
      const topTabText = new fabric.Textbox(topBadge, createProps('textbox', {
        left: startX + 50, top: startY - 21, fontSize: 13, fontWeight: '900', fontStyle: 'italic',
        fill: '#00223e', width: 120, textAlign: 'center'
      }));
      objects.push(topTab, topTabText);
    }

    // 2. Main Angled Strip
    const mainGradient = new fabric.Gradient({
      type: 'linear',
      gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: barWidth, y2: 0 },
      colorStops: [
        { offset: 0, color: gradientStart },
        { offset: 0.5, color: gradientMid },
        { offset: 1, color: gradientEnd }
      ]
    });

    const mainBar = new fabric.Rect(createProps('rect', {
      left: startX, top: startY, width: barWidth, height: barHeight,
      fill: mainGradient, skewX: -12, rx: 5, ry: 5,
      stroke: borderHighlight, strokeWidth: 1.5,
      shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.6)', blur: 12, offsetX: 0, offsetY: 6 })
    }));

    // Lane Number
    const laneText = new fabric.Textbox(laneNum, createProps('textbox', {
      left: startX + 22, top: startY + 8, fontSize: 22, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: 25, textAlign: 'center'
    }));

    // NOC Code
    const nocText = new fabric.Textbox(nocCode, createProps('textbox', {
      left: startX + 50, top: startY + 9, fontSize: 18, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: 45
    }));

    objects.push(mainBar, laneText, nocText);

    // Country Flag Image (80px x 22px)
    const flagBase64 = getFlagBase64(nocCode);
    if (flagBase64) {
      try {
        const imgObj = await fabric.Image.fromURL(flagBase64);
        imgObj.set({
          id: generateUniqueId({ type: 'image' }),
          left: startX + 102,
          top: startY + 10,
          scaleX: 80 / (imgObj.width || 32),
          scaleY: 22 / (imgObj.height || 20),
          skewX: -12,
          selectable: true,
          hasControls: true
        });
        objects.push(imgObj);
      } catch (e) { }
    }

    // Athlete or Team Name
    const nameText = new fabric.Textbox(athleteName, createProps('textbox', {
      left: startX + 200, top: startY + 8, fontSize: 22, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: statusBadge ? 360 : 450
    }));
    objects.push(nameText);

    // Right Status Badge (SW006c DSQ White Angled Rectangle Badge)
    if (statusBadge) {
      const statusBg = new fabric.Rect(createProps('rect', {
        left: startX + 575, top: startY + 8, width: 65, height: 26,
        fill: '#ffffff', skewX: -12, rx: 3, ry: 3,
        stroke: borderHighlight, strokeWidth: 1
      }));
      const statusText = new fabric.Textbox(statusBadge.toUpperCase(), createProps('textbox', {
        left: startX + 575, top: startY + 12, fontSize: 15, fontWeight: '900', fontStyle: 'italic',
        fill: '#00223e', width: 65, textAlign: 'center'
      }));
      objects.push(statusBg, statusText);
    }

    // Far Right Olympic Rings
    const olympicRings = createOlympicRingsGroup(startX + 665, startY + 12, 7.5, 1.8);
    objects.push(olympicRings);

    // 3. Sub-Bar Result/Time Badge below (SW006d 2:06.96 Q or SW006e 7:04.66 OR Q) — ONLY for Variant D & E
    if (timeResult) {
      let subTabWidth = 150;
      if (hasOrRecord && hasQBadge) subTabWidth = 210;
      else if (hasQBadge || hasOrRecord) subTabWidth = 170;

      const subBar = new fabric.Rect(createProps('rect', {
        left: startX + 15, top: startY + 40, width: subTabWidth, height: 24,
        fill: '#00192e', skewX: -12, rx: 3, ry: 3,
        stroke: borderHighlight, strokeWidth: 1
      }));

      const timeText = new fabric.Textbox(timeResult, createProps('textbox', {
        left: startX + 25, top: startY + 43, fontSize: 15, fontWeight: '900', fontStyle: 'italic',
        fill: '#ffffff', width: 90
      }));

      objects.push(subBar, timeText);
      let pillX = startX + 115;

      // OR (Olympic Record) metallic pill for SW006e
      if (hasOrRecord) {
        const orBg = new fabric.Rect(createProps('rect', {
          left: pillX, top: startY + 42, width: 30, height: 20,
          fill: '#e2e8f0', rx: 2, ry: 2, skewX: -12
        }));
        const orText = new fabric.Textbox('OR', createProps('textbox', {
          left: pillX, top: startY + 44, fontSize: 13, fontWeight: '900', fontStyle: 'italic',
          fill: '#00223e', width: 30, textAlign: 'center'
        }));
        objects.push(orBg, orText);
        pillX += 34;
      }

      // Q (Qualification) green pill for SW006d & SW006e
      if (hasQBadge) {
        const qBg = new fabric.Rect(createProps('rect', {
          left: pillX, top: startY + 42, width: 24, height: 20,
          fill: '#16a34a', rx: 2, ry: 2, skewX: -12
        }));
        const qText = new fabric.Textbox('Q', createProps('textbox', {
          left: pillX, top: startY + 44, fontSize: 13, fontWeight: '900', fontStyle: 'italic',
          fill: '#ffffff', width: 24, textAlign: 'center'
        }));
        objects.push(qBg, qText);
      }
    }
  }

  // ── SW005 / SW005B Start List Layout ──
  else if (normId.includes('SW005') || normId.includes('SW105') || normId.includes('START LIST')) {
    const isB = normId.includes('SW005B') || normId.includes('SW105B');
    const eventTitleTextVal = (customData.event || (isB ? "MEN'S 4x200M FREESTYLE RELAY" : "WOMEN'S 200M BUTTERFLY")).toUpperCase();
    const phaseTitleTextVal = (customData.phase || (isB ? "START LIST - FINAL" : "START LIST - HEAT 5")).toUpperCase();

    const startX = 280;
    const startY = 460;
    const bannerWidth = 860;

    // 1. Header Dark Blue Gradient Bar
    const headerGradient = new fabric.Gradient({
      type: 'linear',
      gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: bannerWidth, y2: 0 },
      colorStops: [
        { offset: 0, color: gradientStart },
        { offset: 0.5, color: gradientMid },
        { offset: 1, color: gradientEnd }
      ]
    });

    const headerBar = new fabric.Rect(createProps('rect', {
      left: startX, top: startY, width: bannerWidth, height: 48,
      fill: headerGradient, skewX: -12, rx: 6, ry: 6,
      stroke: borderHighlight, strokeWidth: 1.5
    }));

    const swimmerIcon = new fabric.Textbox('🏊', createProps('textbox', {
      left: startX + 25, top: startY + 8, fontSize: 24, fill: '#ffffff', width: 40
    }));

    const eventTitleText = new fabric.Textbox(eventTitleTextVal, createProps('textbox', {
      left: startX + 110, top: startY + 8, fontSize: 26, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: 550, charSpacing: 90
    }));

    const olympicRings = createOlympicRingsGroup(startX + 760, startY + 12, 8, 2);

    // 2. Sub-Header Bar (START LIST - HEAT 5 or START LIST - FINAL)
    const subBar = new fabric.Rect(createProps('rect', {
      left: startX + 10, top: startY + 52, width: bannerWidth - 20, height: 30,
      fill: '#e2e8f0', skewX: -12, rx: 4, ry: 4
    }));

    const phaseTitleText = new fabric.Textbox(phaseTitleTextVal, createProps('textbox', {
      left: startX + 120, top: startY + 57, fontSize: 16, fontWeight: '900', fontStyle: 'italic',
      fill: '#00223e', width: 500, charSpacing: 60
    }));

    objects.push(headerBar, swimmerIcon, eventTitleText, olympicRings, subBar, phaseTitleText);

    // 3. Default Athlete lists for SW005a (Individual) vs SW005b (Relay with DNS)
    const defaultAthletesA = [
      { lane: '1', noc: 'KOR', name: 'CHOI HYERA' },
      { lane: '2', noc: 'AUS', name: 'SAMANTHA HAMILL' },
      { lane: '3', noc: 'USA', name: 'ELAINE BREEDEN' },
      { lane: '4', noc: 'POL', name: 'OTYLIA JEDRZEJCZAK' },
      { lane: '5', noc: 'FRA', name: 'AURORE MONGEL' },
      { lane: '6', noc: 'CHN', name: 'JIAO LIUYANG' },
      { lane: '7', noc: 'HUN', name: 'BEATRIX BOULSEVICZ' },
      { lane: '8', noc: 'BRA', name: 'JOANNA MARANHAO' }
    ];

    const defaultAthletesB = [
      { lane: '1', noc: 'HUN', name: 'HUNGARY' },
      { lane: '2', noc: 'RSA', name: 'SOUTH AFRICA', status: 'DNS' },
      { lane: '3', noc: 'GBR', name: 'GREAT BRITAIN' },
      { lane: '4', noc: 'USA', name: 'UNITED STATES' },
      { lane: '5', noc: 'AUS', name: 'AUSTRALIA' },
      { lane: '6', noc: 'AUT', name: 'AUSTRIA' },
      { lane: '7', noc: 'POL', name: 'POLAND' },
      { lane: '8', noc: '', name: '' }
    ];

    const athletesList = customData.athletes || (isB ? defaultAthletesB : defaultAthletesA);
    let currentY = startY + 86;

    const sliceList = athletesList.slice(0, 8);
    for (let idx = 0; idx < sliceList.length; idx++) {
      const ath = sliceList[idx];
      if (!ath.lane && !ath.name && !ath.noc) continue;

      const rowFill = idx % 2 === 0 ? darkTabColor : altRowColor;

      // Single continuous row background bar
      const rowBar = new fabric.Rect(createProps('rect', {
        left: startX + 15, top: currentY, width: bannerWidth - 30, height: 34,
        fill: rowFill, skewX: -12, rx: 4, ry: 4,
        stroke: 'rgba(0,136,204,0.6)', strokeWidth: 1
      }));

      // Direct Lane Number Text
      const laneText = new fabric.Textbox(ath.lane, createProps('textbox', {
        left: startX + 25, top: currentY + 6, fontSize: 18, fontWeight: '900', fontStyle: 'italic',
        fill: '#ffffff', width: 25, textAlign: 'center'
      }));

      objects.push(rowBar, laneText);

      // Base64 Country Flag Image (80px x 22px - Fully Selectable & Unlocked)
      const flagBase64 = getFlagBase64(ath.noc);
      if (flagBase64) {
        try {
          const imgObj = await fabric.Image.fromURL(flagBase64);
          imgObj.set({
            id: generateUniqueId({ type: 'image' }),
            left: startX + 55,
            top: currentY + 6,
            scaleX: 80 / (imgObj.width || 32),
            scaleY: 22 / (imgObj.height || 20),
            skewX: -12,
            selectable: true,
            hasControls: true
          });
          objects.push(imgObj);
        } catch (e) { }
      }

      // Athlete / Team Name Text
      const nameText = new fabric.Textbox(ath.name.toUpperCase(), createProps('textbox', {
        left: startX + 148, top: currentY + 7, fontSize: 17, fontWeight: '900', fontStyle: 'italic',
        fill: '#ffffff', width: ath.status ? bannerWidth - 280 : bannerWidth - 178
      }));

      objects.push(nameText);

      // White Rectangle Status Badge (e.g. DNS, DSQ) on right end of row strip
      if (ath.status) {
        const badgeWidth = 65;
        const badgeBar = new fabric.Rect(createProps('rect', {
          left: startX + bannerWidth - 105,
          top: currentY + 4,
          width: badgeWidth,
          height: 26,
          fill: '#ffffff',
          skewX: -12,
          rx: 3,
          ry: 3,
          stroke: borderHighlight,
          strokeWidth: 1
        }));

        const badgeText = new fabric.Textbox(ath.status.toUpperCase(), createProps('textbox', {
          left: startX + bannerWidth - 105,
          top: currentY + 8,
          fontSize: 15,
          fontWeight: '900',
          fontStyle: 'italic',
          fill: '#00223e',
          width: badgeWidth,
          textAlign: 'center'
        }));

        objects.push(badgeBar, badgeText);
      }

      currentY += 38;
    }
  }

  // ── SW004 / Event ID Layout ──
  else if (normId.includes('SW004') || normId.includes('SW103') || normId.includes('EVENT ID')) {
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

    const gunHeaderBody = new fabric.Path(gunPathData, createProps('path', {
      left: 240, top: 820,
      fill: gunGradient,
      stroke: borderHighlight,
      strokeWidth: 2,
      shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.7)', blur: 15, offsetX: 0, offsetY: 8 })
    }));

    const swimmerIcon = new fabric.Textbox('🏊', createProps('textbox', {
      left: 275, top: 851, fontSize: 42, fill: '#ffffff', width: 65, textAlign: 'center'
    }));

    const sportTitleText = new fabric.Textbox(sportTitle, createProps('textbox', {
      left: 395, top: 829, fontSize: 30, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: 610, charSpacing: 90
    }));

    const olympicRings = createOlympicRingsGroup(1045, 835, 9, 2.2);

    const subBarGradient = new fabric.Gradient({
      type: 'linear',
      gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: 778, y2: 0 },
      colorStops: [
        { offset: 0, color: '#d1d5db' },
        { offset: 0.5, color: '#ffffff' },
        { offset: 1, color: '#e2e8f0' }
      ]
    });

    const subBarPathData = 'M 28 0 L 778 0 L 778 34 L 0 34 Z';

    const subBar = new fabric.Path(subBarPathData, createProps('path', {
      left: 350, top: 875,
      fill: subBarGradient,
      stroke: 'rgba(0,34,62,0.5)',
      strokeWidth: 1.2
    }));

    const eventTitleText = new fabric.Textbox(customData.event || "WOMEN'S 200M BUTTERFLY", createProps('textbox', {
      left: 395, top: 880, fontSize: 21, fontWeight: '900', fontStyle: 'italic',
      fill: '#00223e', width: 720, charSpacing: 40
    }));

    objects.push(gunHeaderBody, swimmerIcon, sportTitleText, olympicRings, subBar, eventTitleText);
  }

  // ── SW003 / Event Schedule Layout ──
  else if (normId.includes('SW003') || normId.includes('SW104') || normId.includes('SCHEDULE')) {
    const startX = 280;
    const startY = 480;
    const bannerWidth = 860;

    const headerGradient = new fabric.Gradient({
      type: 'linear',
      gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: bannerWidth, y2: 0 },
      colorStops: [
        { offset: 0, color: gradientStart },
        { offset: 0.5, color: gradientMid },
        { offset: 1, color: gradientEnd }
      ]
    });

    const headerBar = new fabric.Rect(createProps('rect', {
      left: startX, top: startY, width: bannerWidth, height: 48,
      fill: headerGradient, skewX: -12, rx: 6, ry: 6,
      stroke: borderHighlight, strokeWidth: 1.5
    }));

    const swimmerIcon = new fabric.Textbox('🏊', createProps('textbox', {
      left: startX + 25, top: startY + 8, fontSize: 24, fill: '#ffffff', width: 40
    }));

    const sportTitleText = new fabric.Textbox(sportTitle, createProps('textbox', {
      left: startX + 110, top: startY + 8, fontSize: 26, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: 480, charSpacing: 90
    }));

    const olympicRings = createOlympicRingsGroup(startX + 760, startY + 12, 8, 2);

    const subBar = new fabric.Rect(createProps('rect', {
      left: startX + 10, top: startY + 52, width: bannerWidth - 20, height: 30,
      fill: '#e2e8f0', skewX: -12, rx: 4, ry: 4
    }));

    const subTitleText = new fabric.Textbox(venueTitle, createProps('textbox', {
      left: startX + 120, top: startY + 57, fontSize: 16, fontWeight: '900', fontStyle: 'italic',
      fill: '#00223e', width: 500, charSpacing: 60
    }));

    objects.push(headerBar, swimmerIcon, sportTitleText, olympicRings, subBar, subTitleText);

    const defaultEvents = [
      "MEN'S 50M FREESTYLE - HEATS",
      "WOMEN'S 200M FREESTYLE - HEATS",
      "MEN'S 4x100M FREESTYLE RELAY - HEATS",
      "WOMEN'S 50M BUTTERFLY - SEMI-FINALS",
      "MEN'S 100M BREASTSTROKE - HEATS",
      "WOMEN'S 200M BUTTERFLY - SEMI-FINALS",
      "MEN'S 400M INDIVIDUAL MEDLEY - FINAL",
      "WOMEN'S 200M BUTTERFLY - HEATS"
    ];

    const eventsList = customData.events || defaultEvents;
    let currentY = startY + 86;

    eventsList.slice(0, 8).forEach((eventName, idx) => {
      const rowBar = new fabric.Rect(createProps('rect', {
        left: startX + 15, top: currentY, width: bannerWidth - 30, height: 34,
        fill: darkTabColor, skewX: -12, rx: 3, ry: 3,
        stroke: 'rgba(0,136,204,0.6)', strokeWidth: 1
      }));

      const rowText = new fabric.Textbox(eventName.toUpperCase(), createProps('textbox', {
        left: startX + 35, top: currentY + 7, fontSize: 17, fontWeight: '900', fontStyle: 'italic',
        fill: '#ffffff', width: bannerWidth - 60
      }));

      objects.push(rowBar, rowText);
      currentY += 38;
    });
  }

  if (objects.length === 0) return null;

  // Attach double-click path node editing listener & disable object caching for all elements
  objects.forEach((obj) => {
    if (obj) {
      obj.set({ objectCaching: false });
      if (obj.type === 'path' || obj instanceof fabric.Path) {
        obj.on('mousedblclick', () => {
          if (window.editor?.canvas) {
            window.editor.canvas.setActiveObject(obj);
          }
          if (window.edit) {
            window.edit(window.dispatch);
          }
        });
      }
    }
  });

  const groupId = generateUniqueId({ type: 'group' });
  const group = new fabric.Group(objects, {
    id: groupId,
    class: groupId,
    subTargetCheck: true,
    objectCaching: false,
    scaleX: 1.5,
    scaleY: 1.5
  });

  // Apply layout overrides copied from UI
  if (normId.includes('SW002') || normId === 'VENUE ID') {
    group.set({
      left: 319,
      top: 673,
      scaleX: 1.600,
      scaleY: 1.592
    });
  } else if (normId.includes('SW102')) {
    group.set({
      left: 330,
      top: 821,
      scaleX: 1.440,
      scaleY: 1.592
    });
  } else if (normId.includes('SW003') || normId === 'EVENT SCHEDULE') {
    group.set({
      left: 293,
      top: 388,
      scaleX: 1.500,
      scaleY: 1.500
    });
  } else if (normId.includes('SW103')) {
    group.set({
      left: 311,
      top: 558,
      scaleX: 1.654,
      scaleY: 1.445
    });
  } else if (normId.includes('SW104')) {
    group.set({
      left: 257,
      top: 351,
      scaleX: 1.500,
      scaleY: 1.500
    });
  } else if (normId.includes('SW005') || normId === 'START LIST') {
    group.set({
      left: 312,
      top: 391,
      scaleX: 1.500,
      scaleY: 1.500
    });
  } else if (normId.includes('SW105')) {
    group.set({
      left: 304,
      top: 350,
      scaleX: 1.500,
      scaleY: 1.587
    });
  } else if (normId.includes('SW006') || normId === 'LANE IDENT') {
    group.set({
      left: 334,
      top: 892,
      scaleX: 1.500,
      scaleY: 1.500
    });
  } else if (normId.includes('SW106')) {
    group.set({
      left: 364,
      top: 900,
      scaleX: 1.553,
      scaleY: 1.500
    });
  } else if (normId.includes('SW007') || normId.includes('TEAM LIST BY LANE')) {
    group.set({
      left: 329,
      top: 666,
      scaleX: 1.609,
      scaleY: 1.662
    });
  } else if (normId.includes('SW107')) {
    group.set({
      left: 314,
      top: 962,
      scaleX: 1.609,
      scaleY: 1.662
    });
  } else if (normId.includes('SW008') || normId === 'RESULTS') {
    group.set({
      left: 336,
      top: 739,
      scaleX: 1.590,
      scaleY: 1.600
    });
  } else if (normId.includes('SW108')) {
    group.set({
      left: 332,
      top: 895,
      scaleX: 1.773,
      scaleY: 1.600
    });
  } else if (normId.includes('SW009') || normId === 'MEDALS') {
    group.set({
      left: 306,
      top: 64,
      scaleX: 1.500,
      scaleY: 1.873
    });
  } else if (normId.includes('SW109')) {
    group.set({
      left: 336,
      top: 883,
      scaleX: 1.777,
      scaleY: 1.873
    });
  } else if (normId.includes('SW110')) {
    group.set({
      left: 318,
      top: 969,
      scaleX: 1.500,
      scaleY: 1.500
    });
  } else if (normId.includes('SW011') || normId === 'LOWER THIRD') {
    group.set({
      left: 334,
      top: 793,
      scaleX: 1.581,
      scaleY: 1.600
    });
  } else if (normId.includes('SW111')) {
    group.set({
      left: 330,
      top: 772,
      scaleX: 1.669,
      scaleY: 1.600
    });
  } else if (normId.includes('SW012') || normId === 'RECORDS') {
    group.set({
      left: 321,
      top: 399,
      scaleX: 1.607,
      scaleY: 1.564
    });
  } else if (normId.includes('SW112')) {
    group.set({
      left: 312,
      top: 958,
      scaleX: 1.030,
      scaleY: 1.564
    });
  } else if (normId.includes('SW114C')) {
    group.set({
      left: 328,
      top: 733,
      scaleX: 1.596,
      scaleY: 1.600
    });
  } else if (normId.includes('SW114')) {
    group.set({
      left: 332,
      top: 787,
      scaleX: 1.596,
      scaleY: 1.600
    });
  } else if (normId.includes('SW013') || normId === 'RECORD TAG') {
    group.set({
      left: 329,
      top: 406,
      scaleX: 1.607,
      scaleY: 1.574
    });
  } else if (normId.includes('SW113')) {
    group.set({
      left: 312,
      top: 953,
      scaleX: 0.933,
      scaleY: 1.081
    });
  } else if (normId.includes('SW114')) {
    group.set({
      left: 332,
      top: 787,
      scaleX: 1.596,
      scaleY: 1.600
    });
  } else if (normId.includes('SW014') || normId === 'NAME SUPER') {
    group.set({
      left: 340,
      top: 69,
      scaleX: 1.500,
      scaleY: 1.500
    });
  } else if (normId.includes('SW015') || normId.includes('SW115') || normId === 'WINNER') {
    group.set({
      left: 342,
      top: 849,
      scaleX: 1.574,
      scaleY: 1.665
    });
  } else if (normId.includes('SW118')) {
    group.set({
      left: 342,
      top: 351,
      scaleX: 1.555,
      scaleY: 1.549
    });
  } else if (normId.includes('SW018') || normId === 'POINT TABLE') {
    group.set({
      left: 353,
      top: 844,
      scaleX: 1.555,
      scaleY: 1.770
    });
  } else if (normId.includes('SW016') || normId.includes('SW116') || normId === 'MEDAL TALLY') {
    group.set({
      left: 361,
      top: 842,
      scaleX: 1.564,
      scaleY: 1.717
    });
  } else if (normId.includes('SW117') || normId.includes('MF STANDINGS')) {
    group.set({
      left: 330,
      top: 683,
      scaleX: 1.368,
      scaleY: 1.434
    });
  } else if (normId.includes('SW017') || normId === 'TOP MEDAL TALLY') {
    group.set({
      left: 316,
      top: 673,
      scaleX: 1.605,
      scaleY: 1.634
    });
  } else if (normId.includes('SW019') || normId.includes('SW119') || normId === 'RECORDS TAG') {
    group.set({
      left: 364,
      top: 844,
      scaleX: 1.541,
      scaleY: 1.691
    });
  } else if (normId.includes('SW020') || normId.includes('SW120') || normId === 'BUG') {
    group.set({
      left: 1283,
      top: 956,
      scaleX: 1.266,
      scaleY: 1.500
    });
  } else if (normId.includes('SW021') || normId.includes('SW128') || normId.includes('BEFORE SPLIT')) {
    group.set({
      left: 323,
      top: 924,
      scaleX: 1.475,
      scaleY: 1.500
    });
  } else if (normId.includes('SW022') || normId.includes('SW129') || normId.includes('SPLIT POINT WITH STANDINGS')) {
    group.set({
      left: 252,
      top: 68,
      scaleX: 1.515,
      scaleY: 1.515
    });
  } else if (normId.includes('SW023') || normId.includes('SW024') || normId.includes('SW130') || normId.includes('FINISH')) {
    group.set({
      left: 325,
      top: 912,
      scaleX: 1.428,
      scaleY: 1.500
    });
  }

  return group;
}

/**
 * 1920x1080 HTML Broadcast Overlay for Swimming SW002 - SW007
 */
export function generateSwimming2HTML(
  templateId = '',
  customData = {},
  styleOptions = {}
) {
  const normId = (templateId || '').toUpperCase();
  const font = styleOptions.fontFamily || "'Outfit', 'Roboto Condensed', sans-serif";

  const darkTabColor = '#00192e';
  const altRowColor = '#002e4d';
  const gradientStart = '#00223e';
  const gradientMid = '#00355c';
  const gradientEnd = '#00477a';
  const borderHighlight = '#0088cc';
  const venueTitle = (customData.venue || 'AQUATICS CENTRE').toUpperCase();
  const sportTitle = (customData.sport || 'SWIMMING').toUpperCase();

  // ── SW002 / Venue ID Layout ──
  if (normId.includes('SW002') || normId.includes('SW102') || normId === 'VENUE ID') {
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
            left: 36px;
            bottom: 4px;
            color: #ffffff;
            font-size: 42px;
            line-height: 1;
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

          .gun-barrel-rings {
            position: absolute;
            right: 35px;
            top: 14px;
            fill: none;
            stroke: #ffffff;
            stroke-width: 3.2;
            z-index: 2;
          }
        </style>
      </head>
      <body>
        <div class="gun-banner-container">
          <div class="gun-banner-body"></div>
          <div class="aquatics-logo">🏊</div>
          <div class="gun-barrel-title">${venueTitle}</div>
          <svg class="gun-barrel-rings" viewBox="0 0 100 45" width="56" height="26">
            <circle cx="15" cy="16" r="11"/>
            <circle cx="38" cy="16" r="11"/>
            <circle cx="61" cy="16" r="11"/>
            <circle cx="84" cy="16" r="11"/>
            <circle cx="26.5" cy="27" r="11"/>
            <circle cx="49.5" cy="27" r="11"/>
            <circle cx="72.5" cy="27" r="11"/>
          </svg>
        </div>
      </body>
      </html>
    `;
  }

  // ── SW108 / In-Race ID ──
  else if (normId.includes('SW108') || normId.includes('IN-RACE ID')) {
    const bibNum = customData.num || customData.bib || customData.lane || '18';
    const nocCode = (customData.noc || 'USA').toUpperCase();
    const flagUrl = getFlagBase64(nocCode);
    const nameVal = (customData.name || customData.team || 'MARK WARKENTIN').toUpperCase();

    const posX = customData.posX || '280px';
    const posY = customData.posY || '940px';

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .in-race-bar {
            position: absolute; left: ${posX}; top: ${posY}; width: 540px; height: 42px;
            background: linear-gradient(90deg, ${gradientStart} 0%, ${gradientMid} 45%, ${gradientEnd} 100%);
            color: #ffffff; padding: 0 20px; transform: skewX(-12deg);
            border-radius: 6px; border: 1.5px solid ${borderHighlight};
            display: flex; align-items: center; justify-content: space-between;
            filter: drop-shadow(0 15px 30px rgba(0,0,0,0.8));
          }
          .in-race-content { transform: skewX(12deg); display: flex; align-items: center; gap: 14px; }
          .in-race-flag { width: 60px; height: 20px; object-fit: cover; border-radius: 2px; border: 1px solid rgba(255,255,255,0.6); }
          .in-race-num { font-size: 20px; font-weight: 900; font-style: italic; color: #0088cc; }
          .in-race-name { font-size: 20px; font-weight: 900; font-style: italic; letter-spacing: 1px; }
        </style>
      </head>
      <body>
        <div class="in-race-bar">
          <div class="in-race-content">
            ${flagUrl ? `<img class="in-race-flag" src="${flagUrl}" alt="${nocCode}" />` : ''}
            <div class="in-race-num">${bibNum}</div>
            <div class="in-race-name">${nameVal}</div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ── SW109 / In-Race Place ID ──
  else if (normId.includes('SW109') || normId.includes('IN-RACE PLACE ID')) {
    const bibNum = customData.num || customData.bib || customData.lane || '14';
    const nocCode = (customData.noc || 'RUS').toUpperCase();
    const flagUrl = getFlagBase64(nocCode);
    const nameVal = (customData.name || customData.team || 'EVGENY DRATTSEV').toUpperCase();
    const placeVal = (customData.place || customData.badge || '2ND PLACE').toUpperCase();

    const posX = customData.posX || '280px';
    const posY = customData.posY || '940px';

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .in-race-place-container {
            position: absolute; left: ${posX}; top: ${posY};
            filter: drop-shadow(0 15px 30px rgba(0,0,0,0.8));
          }
          .in-race-bar {
            width: 540px; height: 42px;
            background: linear-gradient(90deg, ${gradientStart} 0%, ${gradientMid} 45%, ${gradientEnd} 100%);
            color: #ffffff; padding: 0 20px; transform: skewX(-12deg);
            border-radius: 6px; border: 1.5px solid ${borderHighlight};
            display: flex; align-items: center;
          }
          .in-race-content { transform: skewX(12deg); display: flex; align-items: center; gap: 14px; }
          .in-race-flag { width: 60px; height: 20px; object-fit: cover; border-radius: 2px; border: 1px solid rgba(255,255,255,0.6); }
          .in-race-num { font-size: 20px; font-weight: 900; font-style: italic; color: #0088cc; }
          .in-race-name { font-size: 20px; font-weight: 900; font-style: italic; letter-spacing: 1px; }

          .in-race-sub-bar {
            width: 160px; height: 26px; margin-top: 3px;
            background: #ffffff;
            transform: skewX(-12deg); border-radius: 4px; border: 1px solid #ffffff;
            display: flex; align-items: center; justify-content: center;
          }
          .in-race-sub-title { transform: skewX(12deg); font-size: 15px; font-weight: 900; font-style: italic; color: #00192e; }
        </style>
      </head>
      <body>
        <div class="in-race-place-container">
          <div class="in-race-bar">
            <div class="in-race-content">
              ${flagUrl ? `<img class="in-race-flag" src="${flagUrl}" alt="${nocCode}" />` : ''}
              <div class="in-race-num">${bibNum}</div>
              <div class="in-race-name">${nameVal}</div>
            </div>
          </div>
          <div class="in-race-sub-bar">
            <div class="in-race-sub-title">${placeVal}</div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ── SW110 / Group Indicator ──
  else if (normId.includes('SW110') || normId.includes('GROUP INDICATOR')) {
    const titleVal = (customData.title || customData.group || 'LEADERS').toUpperCase();
    const posX = customData.posX || '280px';
    const posY = customData.posY || '960px';

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .group-ind-pill {
            position: absolute; left: ${posX}; top: ${posY}; min-width: 180px; height: 34px;
            background: #ffffff;
            transform: skewX(-12deg); border-radius: 4px; border: 1.5px solid #0088cc;
            display: flex; align-items: center; justify-content: center; padding: 0 16px;
            filter: drop-shadow(0 10px 20px rgba(0,0,0,0.8));
          }
          .group-ind-text { transform: skewX(12deg); font-size: 17px; font-weight: 900; font-style: italic; color: #00192e; }
        </style>
      </head>
      <body>
        <div class="group-ind-pill">
          <div class="group-ind-text">${titleVal}</div>
        </div>
      </body>
      </html>
    `;
  }

  // ── SW111 / Group Members ──
  else if (normId.includes('SW111') || normId.includes('GROUP MEMBERS')) {
    const titleVal = (customData.title || customData.group || 'LEADERS').toUpperCase();
    const defaultMembers = [
      { noc: 'UKR', num: '4', name: 'I. CHERVYNSKIY' },
      { noc: 'ESP', num: '2', name: 'F.J. HERVAS' },
      { noc: 'VEN', num: '9', name: 'E.MALDONADO SAVERA' }
    ];
    const members = customData.members || customData.athletes || defaultMembers;

    const posX = customData.posX || '280px';
    const posY = customData.posY || '830px';

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .group-members-container {
            position: absolute; left: ${posX}; top: ${posY};
            display: flex; flex-direction: column; gap: 4px;
            filter: drop-shadow(0 15px 30px rgba(0,0,0,0.8));
          }
          .group-members-header {
            width: 200px; height: 26px; margin-left: 50px;
            background: #ffffff;
            transform: skewX(-12deg); border-radius: 4px; border: 1.5px solid #0088cc;
            display: flex; align-items: center; justify-content: center;
          }
          .group-header-text { transform: skewX(12deg); font-size: 16px; font-weight: 900; font-style: italic; color: #00192e; }

          .group-member-row {
            width: 380px; height: 32px; background: #002f5a;
            transform: skewX(-12deg); border-radius: 3px; border: 1.5px solid #0088cc;
            display: flex; align-items: center; padding: 0 15px;
          }
          .group-member-content { transform: skewX(12deg); display: flex; align-items: center; }
          .gm-flag { width: 34px; height: 16px; object-fit: cover; border-radius: 2px; border: 1px solid rgba(255,255,255,0.6); margin-right: 15px; }
          .gm-num { font-size: 16px; font-weight: 900; font-style: italic; color: #00e5ff; width: 30px; }
          .gm-name { font-size: 16px; font-weight: 900; font-style: italic; color: #ffffff; }
        </style>
      </head>
      <body>
        <div class="group-members-container">
          <div class="group-members-header">
            <div class="group-header-text">${titleVal}</div>
          </div>
          ${members.slice(0, 5).map(m => {
      const nocCode = (m.noc || '').toUpperCase();
      const fUrl = getFlagBase64(nocCode);
      const flagTag = fUrl ? '<img class="gm-flag" src="' + fUrl + '" />' : '<div style="width:49px;"></div>';
      return `
              <div class="group-member-row">
                <div class="group-member-content">
                  ${flagTag}
                  <div class="gm-num">${m.num || m.bib || ''}</div>
                  <div class="gm-name">${(m.name || '').toUpperCase()}</div>
                </div>
              </div>
            `;
    }).join('')}
        </div>
      </body>
      </html>
    `;
  }

  // ── SW112 / Gap between 2 Groups (SW112A & SW112B) ──
  else if (normId.includes('SW112') || normId.includes('GAP BETWEEN 2 GROUPS')) {
    const isB = normId.endsWith('B') || normId.includes('SW112B');
    const group1 = (customData.group1 || (isB ? 'PACK' : 'LEADER')).toUpperCase();
    const gapTime = customData.gap || customData.time || '1:15';
    const group2 = (customData.group2 || (isB ? 'LEADER' : 'PACK')).toUpperCase();

    const posX = customData.posX || '315px';
    const posY = customData.posY || '975px';

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .gap-2groups-container {
            position: absolute; left: ${posX}; top: ${posY};
            display: flex; align-items: center; gap: 12px;
            filter: drop-shadow(0 10px 20px rgba(0,0,0,0.8));
          }
          .gap-group-pill {
            min-width: 240px; height: 48px;
            background: linear-gradient(90deg, #cbd5e1 0%, #ffffff 50%, #e2e8f0 100%);
            transform: skewX(-12deg); border-radius: 24px; border: 2px solid #00223e;
            display: flex; align-items: center; justify-content: center; padding: 0 20px;
          }
          .gap-group-text { transform: skewX(12deg); font-size: 30px; font-weight: 900; font-style: italic; color: #00192e; }

          .gap-time-pill {
            min-width: 115px; height: 48px; background: #00192e;
            transform: skewX(-12deg); border-radius: 6px; border: 2px solid ${borderHighlight};
            display: flex; align-items: center; justify-content: center; padding: 0 14px;
          }
          .gap-time-text { transform: skewX(12deg); font-size: 30px; font-weight: 900; font-style: italic; color: #ffffff; }
        </style>
      </head>
      <body>
        <div class="gap-2groups-container">
          <div class="gap-group-pill"><div class="gap-group-text">${group1}</div></div>
          <div class="gap-time-pill"><div class="gap-time-text">${gapTime}</div></div>
          <div class="gap-group-pill"><div class="gap-group-text">${group2}</div></div>
        </div>
      </body>
      </html>
    `;
  }

  // ── SW113 / Gap between 3 Groups ──
  else if (normId.includes('SW113') || normId.includes('GAP BETWEEN 3 GROUPS')) {
    const group1 = (customData.group1 || 'LEADER').toUpperCase();
    const gap1 = customData.gap1 || '0:13';
    const group2 = (customData.group2 || 'CHASE').toUpperCase();
    const gap2 = customData.gap2 || '0:25';
    const group3 = (customData.group3 || 'PACK').toUpperCase();

    const posX = customData.posX || '100px';
    const posY = customData.posY || '900px';

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .gap-3groups-container {
            position: absolute; left: ${posX}; top: ${posY};
            display: flex; align-items: center; gap: 18px;
            filter: drop-shadow(0 10px 20px rgba(0,0,0,0.8));
          }
          .gap-group-pill {
            min-width: 260px; height: 64px;
            background: linear-gradient(90deg, #cbd5e1 0%, #ffffff 50%, #e2e8f0 100%);
            transform: skewX(-12deg); border-radius: 32px; border: 2.5px solid #00223e;
            display: flex; align-items: center; justify-content: center; padding: 0 24px;
          }
          .gap-group-text { transform: skewX(12deg); font-size: 32px; font-weight: 900; font-style: italic; color: #00192e; }

          .gap-time-pill {
            min-width: 120px; height: 64px; background: #00192e;
            transform: skewX(-12deg); border-radius: 8px; border: 2.5px solid ${borderHighlight};
            display: flex; align-items: center; justify-content: center; padding: 0 16px;
          }
          .gap-time-text { transform: skewX(12deg); font-size: 32px; font-weight: 900; font-style: italic; color: #ffffff; }
        </style>
      </head>
      <body>
        <div class="gap-3groups-container">
          <div class="gap-group-pill"><div class="gap-group-text">${group1}</div></div>
          <div class="gap-time-pill"><div class="gap-time-text">${gap1}</div></div>
          <div class="gap-group-pill"><div class="gap-group-text">${group2}</div></div>
          <div class="gap-time-pill"><div class="gap-time-text">${gap2}</div></div>
          <div class="gap-group-pill"><div class="gap-group-text">${group3}</div></div>
        </div>
      </body>
      </html>
    `;
  }

  // ── SW114 / Winner/Winners/Place ID ──
  else if (normId.includes('SW114') || normId.includes('WINNER') || normId.includes('PLACE ID')) {
    const categoryTitle = (customData.title || customData.event || "WINNER - MEN'S MARATHON 10KM").toUpperCase();
    const athNum = customData.num || customData.lane || '17';
    const nocCode = (customData.noc || 'NED').toUpperCase();
    const flagUrl = getFlagBase64(nocCode);
    const athleteName = (customData.name || customData.team || 'MAARTEN VAN DER WEIJDEN').toUpperCase();
    const timeVal = customData.time || '1:51:51.6';

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .winner-container {
            position: absolute; left: 280px; top: 870px; width: 780px;
            filter: drop-shadow(0 15px 30px rgba(0,0,0,0.8));
          }
          .winner-gun-header {
            position: relative; width: 780px; height: 44px;
            display: flex; align-items: center; justify-content: space-between; padding: 0 20px;
          }
          .winner-gun-body {
            position: absolute; left: 0; top: 0; width: 100%; height: 100%;
            background: linear-gradient(90deg, ${gradientStart} 0%, ${gradientMid} 45%, ${gradientEnd} 100%);
            clip-path: polygon(45px 0px, 860px 0px, 888px 44px, 882px 54px, 140px 54px, 115px 88px, 100px 95px, 10px 95px, 2px 84px, 22px 42px, 35px 6px);
            border: 1.5px solid ${borderHighlight}; z-index: 1;
          }
          .winner-picto-icon { position: relative; z-index: 2; font-size: 24px; margin-left: 30px; }
          .winner-header-title { position: relative; z-index: 2; font-size: 24px; font-weight: 900; font-style: italic; color: #ffffff; margin-left: 10px; flex: 1; }
          .winner-rings { position: relative; z-index: 2; fill: none; stroke: #ffffff; stroke-width: 3; }

          .winner-sub-bar {
            width: 710px; height: 26px; margin: 2px 0 3px 70px;
            background: linear-gradient(90deg, #cbd5e1 0%, #ffffff 100%);
            transform: skewX(-12deg); border-radius: 4px; border: 1px solid #ffffff;
            display: flex; align-items: center; padding: 0 16px;
          }
          .winner-sub-title { transform: skewX(12deg); font-size: 16px; font-weight: 900; font-style: italic; color: #00192e; }

          .winner-row-bar {
            width: 780px; height: 38px; background: ${darkTabColor};
            transform: skewX(-12deg); border-radius: 4px; border: 1.5px solid ${borderHighlight};
            display: flex; align-items: center; justify-content: space-between; padding: 0 20px;
          }
          .winner-row-left { transform: skewX(12deg); display: flex; align-items: center; gap: 14px; }
          .winner-noc { font-size: 18px; font-weight: 900; font-style: italic; color: #ffffff; }
          .winner-flag { width: 60px; height: 20px; object-fit: cover; border-radius: 2px; border: 1px solid rgba(255,255,255,0.6); }
          .winner-num { font-size: 20px; font-weight: 900; font-style: italic; color: #0088cc; }
          .winner-name { font-size: 20px; font-weight: 900; font-style: italic; letter-spacing: 1px; }
          .winner-time { transform: skewX(12deg); font-size: 20px; font-weight: 900; font-style: italic; color: #ffffff; }
        </style>
      </head>
      <body>
        <div class="winner-container">
          <div class="winner-gun-header">
            <div class="winner-gun-body"></div>
            <div class="winner-picto-icon">🏊</div>
            <div class="winner-header-title">${sportTitle}</div>
            <svg class="winner-rings" viewBox="0 0 100 45" width="52" height="24">
              <circle cx="15" cy="16" r="11"/><circle cx="38" cy="16" r="11"/>
              <circle cx="61" cy="16" r="11"/><circle cx="84" cy="16" r="11"/>
              <circle cx="26.5" cy="27" r="11"/><circle cx="49.5" cy="27" r="11"/>
              <circle cx="72.5" cy="27" r="11"/>
            </svg>
          </div>
          <div class="winner-sub-bar">
            <div class="winner-sub-title">${categoryTitle}</div>
          </div>
          <div class="winner-row-bar">
            <div class="winner-row-left">
              <div class="winner-noc">${nocCode}</div>
              ${flagUrl ? `<img class="winner-flag" src="${flagUrl}" alt="${nocCode}" />` : ''}
              <div class="winner-num">${athNum}</div>
              <div class="winner-name">${athleteName}</div>
            </div>
            <div class="winner-time">${timeVal}</div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ── SW117 / MF Standings ──
  else if (normId.includes('SW117') || normId.includes('MF STANDINGS')) {
    const subTitle = (customData.title || customData.subtitle || 'LAP 3 OF 6').toUpperCase();
    const defaultRows = [
      { rank: '1', noc: 'NED', num: '17', name: 'M. VAN DER WEIJDEN', time: '55:55.8' },
      { rank: '2', noc: 'GBR', num: '10', name: 'D. DAVIES', time: '+0.8' },
      { rank: '2', noc: 'GER', num: '6', name: 'T. LURZ', time: '+0.8' },
      { rank: '4', noc: 'ITA', num: '3', name: 'V. CLERI', time: '+8.0' },
      { rank: '5', noc: 'RUS', num: '14', name: 'E. DRATTSEV', time: '+8.7' }
    ];
    const rowsList = customData.rows || customData.standings || defaultRows;

    const posX = customData.posX || '280px';
    const posY = customData.posY || '740px';

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .mf-standings-container {
            position: absolute; left: ${posX}; top: ${posY};
            display: flex; flex-direction: column; gap: 4px;
            filter: drop-shadow(0 15px 30px rgba(0,0,0,0.8));
          }
          .mf-header-pill {
            width: 180px; height: 26px; margin-left: 40px;
            background: #ffffff;
            transform: skewX(-12deg); border-radius: 4px; border: 1.5px solid #0088cc;
            display: flex; align-items: center; justify-content: center;
          }
          .mf-header-text { transform: skewX(12deg); font-size: 15px; font-weight: 900; font-style: italic; color: #00192e; }

          .mf-row {
            width: 480px; height: 32px; background: ${darkTabColor};
            transform: skewX(-12deg); border-radius: 3px; border: 1px solid ${borderHighlight};
            display: flex; align-items: center; justify-content: space-between; padding-right: 16px;
          }
          .mf-row.row-alt { background: ${altRowColor}; }

          .mf-left { transform: skewX(12deg); display: flex; align-items: center; gap: 8px; }
          .mf-rank {
            width: 32px; height: 32px; background: #dc2626; border-radius: 3px 0 0 3px;
            display: flex; align-items: center; justify-content: center;
            font-size: 16px; font-weight: 900; font-style: italic; color: #ffffff;
          }
          .mf-noc { font-size: 15px; font-weight: 900; font-style: italic; color: #ffffff; width: 36px; margin-left: 2px; }
          .mf-flag { width: 45px; height: 16px; object-fit: cover; border-radius: 2px; border: 1px solid rgba(255,255,255,0.6); margin-left: 2px; }
          .gm-num { font-size: 16px; font-weight: 900; font-style: italic; color: #0088cc; width: 25px; text-align: center; }
          .mf-name { font-size: 16px; font-weight: 900; font-style: italic; letter-spacing: 1px; }
          .mf-val { transform: skewX(12deg); font-size: 16px; font-weight: 900; font-style: italic; color: #ffffff; }
        </style>
      </head>
      <body>
        <div class="mf-standings-container">
          <div class="mf-header-pill">
            <div class="mf-header-text">${subTitle}</div>
          </div>
          ${rowsList.map((r, idx) => {
      const nocCode = (r.noc || '').toUpperCase();
      const fUrl = getFlagBase64(nocCode);
      return `
              <div class="mf-row ${idx > 0 ? 'row-alt' : ''}">
                <div class="mf-left">
                  <div class="mf-rank">${r.rank || ''}</div>
                  ${fUrl ? `<img class="mf-flag" src="${fUrl}" alt="${nocCode}" />` : `<div class="mf-noc">${nocCode}</div>`}
                  <div class="gm-num">${r.num || r.bib || ''}</div>
                  <div class="mf-name">${(r.name || '').toUpperCase()}</div>
                </div>
                <div class="mf-val">${r.time || r.val || ''}</div>
              </div>
            `;
    }).join('')}
        </div>
      </body>
      </html>
    `;
  }

  // ── SW118 / Standings & SW119 / Standings at Finish ──
  else if (normId.includes('SW118') || normId.includes('SW119') || (normId.includes('STANDINGS') && normId.includes('OPEN WATER'))) {
    const isFinish = normId.includes('SW119') || normId.includes('FINISH');
    const subTitle = customData.subtitle || (isFinish ? 'STANDINGS AT FINISH' : 'STANDINGS - LAP 3 OF 6');

    const defaultRows118 = [
      { rank: '1', noc: 'NED', num: '17', name: 'MAARTEN VAN DER WEIJDEN', time: '55:55.8' },
      { rank: '2', noc: 'GBR', num: '10', name: 'DAVID DAVIES', time: '+0.8' },
      { rank: '2', noc: 'GER', num: '6', name: 'THOMAS LURZ', time: '+0.8' },
      { rank: '4', noc: 'ITA', num: '3', name: 'VALERIO CLERI', time: '+8.0' },
      { rank: '5', noc: 'RUS', num: '14', name: 'EVGENY DRATTSEV', time: '+8.7' },
      { rank: '6', noc: 'BUL', num: '21', name: 'PETAR STOYCHEV', time: '+8.8' },
      { rank: '7', noc: 'BEL', num: '8', name: 'BRIAN RYCKEMAN', time: '+9.6' },
      { rank: '7', noc: 'USA', num: '18', name: 'MARK WARKENTIN', time: '+9.6' },
      { rank: '', noc: 'RSA', num: '5', name: 'CHAD HO', time: 'DNF' }
    ];

    const defaultRows119 = [
      { rank: '1', noc: 'NED', num: '17', name: 'MAARTEN VAN DER WEIJDEN', time: '1:51:51.6' },
      { rank: '2', noc: 'GBR', num: '10', name: 'DAVID DAVIES', time: '1:51:53.1' },
      { rank: '3', noc: 'GER', num: '6', name: 'THOMAS LURZ', time: '1:51:53.6' },
      { rank: '4', noc: 'ITA', num: '3', name: 'VALERIO CLERI', time: '1:52:07.5' },
      { rank: '', noc: 'RUS', num: '14', name: 'EVGENY DRATTSEV', time: 'PHOTO' },
      { rank: '', noc: 'BUL', num: '21', name: 'PETAR STOYCHEV', time: 'PHOTO' },
      { rank: '7', noc: 'BEL', num: '8', name: 'BRIAN RYCKEMAN', time: '1:52:10.7' },
      { rank: '8', noc: 'USA', num: '18', name: 'MARK WARKENTIN', time: '1:52:13.0' },
      { rank: '9', noc: 'RSA', num: '5', name: 'CHAD HO', time: '1:52:13.1' }
    ];

    const rowsList = customData.rows || customData.standings || (isFinish ? defaultRows119 : defaultRows118);

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .board-container {
            position: absolute; left: 280px; top: 580px; width: 780px;
            filter: drop-shadow(0 15px 30px rgba(0,0,0,0.8));
          }
          .board-gun-header {
            position: relative; width: 780px; height: 42px; margin-bottom: 4px;
            background: linear-gradient(90deg, ${gradientStart} 0%, ${gradientMid} 45%, ${gradientEnd} 100%);
            transform: skewX(-12deg); border-radius: 4px; border: 1.5px solid ${borderHighlight};
            display: flex; align-items: center; justify-content: space-between; padding: 0 20px;
          }
          .board-picto-icon { transform: skewX(12deg); font-size: 24px; margin-right: 10px; }
          .board-header-title { transform: skewX(12deg); font-size: 22px; font-weight: 900; font-style: italic; color: #ffffff; flex: 1; }
          .board-rings { transform: skewX(12deg); fill: none; stroke: #ffffff; stroke-width: 3; }

          .board-sub-bar {
            width: 740px; height: 26px; margin-left: 40px; margin-bottom: 4px;
            background: #ffffff;
            transform: skewX(-12deg); border-radius: 4px; border: 1.5px solid ${borderHighlight};
            display: flex; align-items: center; padding: 0 16px;
          }
          .board-sub-title { transform: skewX(12deg); font-size: 15px; font-weight: 900; font-style: italic; color: #00192e; }

          .board-rows-stack { display: flex; flex-direction: column; gap: 4px; }
          .board-row {
            width: 780px; height: 32px; background: ${darkTabColor};
            transform: skewX(-12deg); border-radius: 3px; border: 1px solid ${borderHighlight};
            display: flex; align-items: center; justify-content: space-between; padding-right: 20px;
          }
          .board-row.row-alt { background: ${altRowColor}; }

          .board-left { transform: skewX(12deg); display: flex; align-items: center; gap: 10px; }
          .board-rank {
            width: 34px; height: 32px; background: #dc2626; border-radius: 3px 0 0 3px;
            display: flex; align-items: center; justify-content: center;
            font-size: 16px; font-weight: 900; font-style: italic; color: #ffffff;
          }
          .board-rank.no-rank { background: transparent; }
          .board-noc { font-size: 16px; font-weight: 900; font-style: italic; color: #ffffff; width: 42px; margin-left: 4px; }
          .board-flag { width: 45px; height: 16px; object-fit: cover; border-radius: 2px; border: 1px solid rgba(255,255,255,0.6); }
          .board-num { font-size: 16px; font-weight: 900; font-style: italic; color: #0088cc; width: 30px; text-align: center; }
          .board-name { font-size: 16px; font-weight: 900; font-style: italic; letter-spacing: 1px; }

          .board-val { transform: skewX(12deg); font-size: 16px; font-weight: 900; font-style: italic; color: #ffffff; }
          .board-val.dnf-val { color: #ef4444; }
          .board-val.photo-val { color: #0088cc; }
        </style>
      </head>
      <body>
        <div class="board-container">
          <div class="board-gun-header">
            <div class="board-picto-icon">🏊</div>
            <div class="board-header-title">${customData.title ? customData.title.toUpperCase() : "MEN'S MARATHON 10KM"}</div>
            <svg class="board-rings" viewBox="0 0 100 45" width="52" height="24">
              <circle cx="15" cy="16" r="11"/><circle cx="38" cy="16" r="11"/>
              <circle cx="61" cy="16" r="11"/><circle cx="84" cy="16" r="11"/>
              <circle cx="26.5" cy="27" r="11"/><circle cx="49.5" cy="27" r="11"/>
              <circle cx="72.5" cy="27" r="11"/>
            </svg>
          </div>
          <div class="board-sub-bar">
            <div class="board-sub-title">${subTitle.toUpperCase()}</div>
          </div>
          <div class="board-rows-stack">
            ${rowsList.map((r, idx) => {
      const nocCode = (r.noc || '').toUpperCase();
      const fUrl = getFlagBase64(nocCode);
      const isDNF = r.time === 'DNF';
      const isPhoto = r.time === 'PHOTO';
      return `
                <div class="board-row ${idx % 2 === 1 ? 'row-alt' : ''}">
                  <div class="board-left">
                    <div class="board-rank ${!r.rank ? 'no-rank' : ''}">${r.rank || ''}</div>
                    <div class="board-noc">${nocCode}</div>
                    ${fUrl ? `<img class="board-flag" src="${fUrl}" alt="${nocCode}" />` : ''}
                    <div class="board-num">${r.num || r.bib || ''}</div>
                    <div class="board-name">${(r.name || '').toUpperCase()}</div>
                  </div>
                  <div class="board-val ${isDNF ? 'dnf-val' : isPhoto ? 'photo-val' : ''}">${r.time || r.val || ''}</div>
                </div>
              `;
    }).join('')}
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ── SW007 / Team List by Lane Layout ──
  else if (normId.includes('SW007') || normId.includes('TEAM LIST BY LANE')) {
    const isB = normId.endsWith('B') || normId.includes('SW007B') || normId.includes('SW107B');
    const isC = normId.endsWith('C') || normId.includes('SW007C') || normId.includes('SW107C');

    const laneNum = customData.lane || (isB ? '2' : isC ? '4' : '5');
    const nocCode = (customData.noc || (isB ? 'RSA' : isC ? 'USA' : 'AUS')).toUpperCase();
    const teamName = (customData.team || (isB ? 'SOUTH AFRICA' : isC ? 'UNITED STATES' : 'AUSTRALIA')).toUpperCase();

    const defaultSwimmersA = ['NICK FFROST', 'GRANT BRITS', 'KIRK PALMER', 'LEITH BRODIE'];
    const defaultSwimmersB = ['JEAN BASSON', 'DARIAN TOWNSEND', 'JAN VENTER', 'SEBASTIEN ROUSSEAU'];
    const defaultSwimmersC = ['DAVID WALTERS', 'RICKY BERENS', 'ERIK VENDT', 'KLETE KELLER'];

    const swimmers = customData.members || customData.swimmers || (isB ? defaultSwimmersB : isC ? defaultSwimmersC : defaultSwimmersA);

    const timeResult = (isB || isC) ? (customData.time || (isB ? '7:08.04' : '7:04.66')) : '';
    const hasOrRecord = isC || (isB && customData.record === 'OR');
    const hasQBadge = isB || isC;
    const flagUrl = getFlagBase64(nocCode);

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .team-list-container {
            position: absolute;
            bottom: 100px;
            left: 280px;
            width: 780px;
            display: flex;
            flex-direction: column;
            gap: 3px;
            filter: drop-shadow(0 12px 25px rgba(0,0,0,0.8));
          }

          .team-main-header {
            background: linear-gradient(90deg, ${gradientStart} 0%, ${gradientMid} 45%, ${gradientEnd} 100%);
            color: #ffffff;
            height: 42px;
            transform: skewX(-12deg);
            border-radius: 5px;
            border: 1.5px solid ${borderHighlight};
            display: flex;
            align-items: center;
            padding: 0 16px;
            justify-content: space-between;
          }

          .team-left-section {
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .team-lane-num {
            font-size: 22px;
            font-weight: 900;
            font-style: italic;
            width: 25px;
            text-align: center;
          }

          .team-noc {
            font-size: 18px;
            font-weight: 900;
            font-style: italic;
          }

          .team-flag-img {
            width: 80px;
            height: 22px;
            object-fit: cover;
            border-radius: 3px;
            border: 1.5px solid rgba(255,255,255,0.6);
            transform: skewX(12deg);
            display: block;
          }

          .team-name {
            font-size: 22px;
            font-weight: 900;
            font-style: italic;
            letter-spacing: 1px;
            text-transform: uppercase;
            margin-left: 10px;
          }

          .team-rings {
            transform: skewX(12deg);
            fill: none;
            stroke: #ffffff;
            stroke-width: 3;
          }

          .team-member-row {
            background: ${darkTabColor};
            color: #ffffff;
            height: 32px;
            transform: skewX(-12deg);
            border-radius: 3px;
            border: 1px solid rgba(0, 136, 204, 0.6);
            display: flex;
            align-items: center;
            padding: 0 20px;
            margin-left: 15px;
            width: 750px;
          }

          .team-member-row.row-alt {
            background: ${altRowColor};
          }

          .team-member-name {
            transform: skewX(12deg);
            font-size: 17px;
            font-weight: 900;
            font-style: italic;
            letter-spacing: 1px;
            text-transform: uppercase;
          }

          .team-sub-bar {
            background: #00192e;
            color: #ffffff;
            transform: skewX(-12deg);
            border-radius: 0 0 4px 4px;
            border: 1px solid ${borderHighlight};
            width: fit-content;
            padding: 3px 14px;
            margin-left: 15px;
            margin-top: -2px;
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .team-time-text {
            font-size: 15px;
            font-weight: 900;
            font-style: italic;
          }

          .team-or-badge {
            background: linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%);
            color: #00223e;
            font-size: 13px;
            font-weight: 900;
            font-style: italic;
            padding: 1px 6px;
            border-radius: 2px;
          }

          .team-q-badge {
            background: #16a34a;
            color: #ffffff;
            font-size: 13px;
            font-weight: 900;
            font-style: italic;
            padding: 1px 6px;
            border-radius: 2px;
          }

          .unskew {
            transform: skewX(12deg);
          }
        </style>
      </head>
      <body>
        <div class="team-list-container">
          <div class="team-main-header">
            <div class="team-left-section">
              <div class="team-lane-num"><span class="unskew">${laneNum}</span></div>
              <div class="team-noc"><span class="unskew">${nocCode}</span></div>
              ${flagUrl ? `<img src="${flagUrl}" class="team-flag-img" />` : ''}
              <div class="team-name"><span class="unskew">${teamName}</span></div>
            </div>
            <svg class="team-rings" viewBox="0 0 100 45" width="48" height="22">
              <circle cx="15" cy="16" r="11"/>
              <circle cx="38" cy="16" r="11"/>
              <circle cx="61" cy="16" r="11"/>
              <circle cx="84" cy="16" r="11"/>
              <circle cx="26.5" cy="27" r="11"/>
              <circle cx="49.5" cy="27" r="11"/>
              <circle cx="72.5" cy="27" r="11"/>
            </svg>
          </div>
          ${swimmers.slice(0, 4).map((swimmer, idx) => `
            <div class="team-member-row ${idx % 2 === 1 ? 'row-alt' : ''}">
              <div class="team-member-name"><span class="unskew">${(swimmer || '').toUpperCase()}</span></div>
            </div>
          `).join('')}
          ${timeResult ? `
            <div class="team-sub-bar">
              <div class="team-time-text"><span class="unskew">${timeResult}</span></div>
              ${hasOrRecord ? `<div class="team-or-badge"><span class="unskew">OR</span></div>` : ''}
              ${hasQBadge ? `<div class="team-q-badge"><span class="unskew">Q</span></div>` : ''}
            </div>
          ` : ''}
        </div>
      </body>
      </html>
    `;
  }

  // ── SW008 / Records Layout (SW008a, SW008b) ──
  else if (normId.includes('SW008') || normId.includes('RECORDS')) {
    const isB = normId.endsWith('B') || normId.includes('SW008B');
    const eventTitleTextVal = (customData.event || (isB ? "MEN'S 4X200M FREESTYLE RELAY" : "WOMEN'S 200M BUTTERFLY")).toUpperCase();

    const defaultRecordsA = [
      { noc: 'AUS', name: 'JESSICAH SCHIPPER', year: '2006', record: 'WR', time: '2:05.40' },
      { noc: 'USA', name: 'MISTY HYMAN', year: '2000', record: 'OR', time: '2:05.88' }
    ];

    const defaultRecordsB = [
      { noc: 'USA', name: 'UNITED STATES', year: '2007', record: 'WR', time: '7:03.24' },
      { noc: 'USA', name: 'UNITED STATES', year: '2012', record: 'OR', time: '7:04.66' }
    ];

    const recordsList = customData.records || (isB ? defaultRecordsB : defaultRecordsA);

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .records-container {
            position: absolute;
            bottom: 100px;
            left: 280px;
            width: 780px;
            display: flex;
            flex-direction: column;
            gap: 3px;
            filter: drop-shadow(0 12px 25px rgba(0,0,0,0.8));
          }

          .records-header {
            background: linear-gradient(90deg, ${gradientStart} 0%, ${gradientMid} 45%, ${gradientEnd} 100%);
            color: #ffffff;
            height: 42px;
            transform: skewX(-12deg);
            border-radius: 5px;
            border: 1.5px solid ${borderHighlight};
            display: flex;
            align-items: center;
            padding: 0 16px;
            justify-content: space-between;
          }

          .records-left-section {
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .records-sport-title {
            font-size: 24px;
            font-weight: 900;
            font-style: italic;
            letter-spacing: 2px;
            text-transform: uppercase;
          }

          .records-rings {
            transform: skewX(12deg);
            fill: none;
            stroke: #ffffff;
            stroke-width: 3;
          }

          .records-sub-bar {
            background: #e2e8f0;
            color: #00223e;
            height: 28px;
            transform: skewX(-12deg);
            border-radius: 3px;
            display: flex;
            align-items: center;
            padding: 0 20px;
            margin-left: 15px;
            width: 750px;
          }

          .records-sub-title {
            transform: skewX(12deg);
            font-size: 16px;
            font-weight: 900;
            font-style: italic;
            letter-spacing: 1px;
          }

          .records-row {
            background: ${darkTabColor};
            color: #ffffff;
            height: 34px;
            transform: skewX(-12deg);
            border-radius: 3px;
            border: 1px solid rgba(0, 136, 204, 0.6);
            display: flex;
            align-items: center;
            padding: 0 16px;
            margin-left: 15px;
            width: 750px;
            justify-content: space-between;
          }

          .records-row.row-alt {
            background: ${altRowColor};
          }

          .records-row-left {
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .records-noc {
            font-size: 16px;
            font-weight: 900;
            font-style: italic;
          }

          .records-flag-img {
            width: 80px;
            height: 22px;
            object-fit: cover;
            border-radius: 3px;
            border: 1.5px solid rgba(255,255,255,0.6);
            transform: skewX(12deg);
            display: block;
          }

          .records-name {
            font-size: 17px;
            font-weight: 900;
            font-style: italic;
            letter-spacing: 1px;
            text-transform: uppercase;
          }

          .records-row-right {
            display: flex;
            align-items: center;
            gap: 14px;
          }

          .records-year {
            font-size: 16px;
            font-weight: 900;
            font-style: italic;
          }

          .records-wr-badge {
            background: linear-gradient(180deg, #fbbf24 0%, #f59e0b 100%);
            color: #00223e;
            font-size: 13px;
            font-weight: 900;
            font-style: italic;
            padding: 1px 6px;
            border-radius: 2px;
          }

          .records-or-badge {
            background: linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%);
            color: #00223e;
            font-size: 13px;
            font-weight: 900;
            font-style: italic;
            padding: 1px 6px;
            border-radius: 2px;
          }

          .records-time {
            font-size: 18px;
            font-weight: 900;
            font-style: italic;
            min-width: 90px;
            text-align: right;
          }

          .unskew {
            transform: skewX(12deg);
          }
        </style>
      </head>
      <body>
        <div class="records-container">
          <div class="records-header">
            <div class="records-left-section">
              <span style="font-size:24px;transform:skewX(12deg);">🏊</span>
              <div class="records-sport-title"><span class="unskew">${sportTitle}</span></div>
            </div>
            <svg class="records-rings" viewBox="0 0 100 45" width="48" height="22">
              <circle cx="15" cy="16" r="11"/>
              <circle cx="38" cy="16" r="11"/>
              <circle cx="61" cy="16" r="11"/>
              <circle cx="84" cy="16" r="11"/>
              <circle cx="26.5" cy="27" r="11"/>
              <circle cx="49.5" cy="27" r="11"/>
              <circle cx="72.5" cy="27" r="11"/>
            </svg>
          </div>
          <div class="records-sub-bar">
            <div class="records-sub-title"><span class="unskew">${eventTitleTextVal}</span></div>
          </div>
          ${recordsList.slice(0, 2).map((rec, idx) => {
      const nocCode = (rec.noc || rec.flag || rec.country || '').toUpperCase();
      const flagUrl = getFlagBase64(nocCode);
      const isWR = rec.record === 'WR';
      return `
              <div class="records-row ${idx % 2 === 1 ? 'row-alt' : ''}">
                <div class="records-row-left">
                  ${flagUrl ? `<img src="${flagUrl}" class="records-flag-img" />` : ''}
                  <div class="records-name"><span class="unskew">${rec.name.toUpperCase()}</span></div>
                </div>
                <div class="records-row-right">
                  <div class="records-year"><span class="unskew">${rec.year}</span></div>
                  <div class="${isWR ? 'records-wr-badge' : 'records-or-badge'}"><span class="unskew">${rec.record}</span></div>
                  <div class="records-time"><span class="unskew">${rec.time}</span></div>
                </div>
              </div>
            `;
    }).join('')}
        </div>
      </body>
      </html>
    `;
  }

  // ── SW009 / Lane Indicator Layout ──
  else if (normId.includes('SW009') || normId.includes('LANE INDICATOR')) {
    const isB = normId.endsWith('B') || normId.includes('SW009B');

    const topLaneTextVal = customData.topLane || 'LANE 1';
    const bottomLaneTextVal = customData.bottomLane || (isB ? 'LANE 9' : 'LANE 8');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .lane-badge {
            position: absolute;
            width: 140px;
            height: 30px;
            background: linear-gradient(90deg, #d1d5db 0%, #ffffff 50%, #cbd5e1 100%);
            color: #00223e;
            transform: skewX(-12deg);
            border-radius: 5px;
            border: 1.5px solid #00223e;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            font-weight: 900;
            font-style: italic;
            filter: drop-shadow(0 8px 16px rgba(0,0,0,0.6));
          }

          .lane-badge-top {
            top: 180px;
            left: 280px;
          }

          .lane-badge-bottom {
            top: 900px;
            left: 280px;
          }

          .unskew {
            transform: skewX(12deg);
          }
        </style>
      </head>
      <body>
        <div class="lane-badge lane-badge-top"><span class="unskew">${topLaneTextVal.toUpperCase()}</span></div>
        <div class="lane-badge lane-badge-bottom"><span class="unskew">${bottomLaneTextVal.toUpperCase()}</span></div>
      </body>
      </html>
    `;
  }

  // ── SW011 / Winner / Winners / Place ID Layout ──
  else if (normId.includes('SW011') || normId.includes('WINNER') || normId.includes('PLACE ID')) {
    const isB = normId.endsWith('B') || normId.includes('SW011B');
    const isC = normId.endsWith('C') || normId.includes('SW011C');

    const headerTitleVal = (customData.headerTitle || customData.sport || (isB ? "WOMEN'S 200M BUTTERFLY" : "SWIMMING")).toUpperCase();
    const subTitleVal = (customData.subTitle || (isB ? "3RD PLACE - HEAT 5" : isC ? "WINNERS - MEN'S 4X200M FREESTYLE RELAY" : "WINNER - MEN'S 4X200M FREESTYLE RELAY")).toUpperCase();

    const defaultWinnersA = [
      { noc: 'USA', name: 'UNITED STATES', time: '6:58.56', record: 'WR' }
    ];

    const defaultWinnersB = [
      { noc: 'POL', name: 'OTYLIA JEDRZEJCZAK', time: '2:06.91', record: '' }
    ];

    const defaultWinnersC = [
      { noc: 'USA', name: 'UNITED STATES', time: '6:58.56', record: 'WR' },
      { noc: 'GBR', name: 'GREAT BRITAIN', time: '6:58.56', record: 'WR' }
    ];

    const winnersList = customData.winners || customData.athletes || (isB ? defaultWinnersB : isC ? defaultWinnersC : defaultWinnersA);

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .winner-container {
            position: absolute;
            bottom: 100px;
            left: 280px;
            width: 780px;
            display: flex;
            flex-direction: column;
            gap: 3px;
            filter: drop-shadow(0 12px 25px rgba(0,0,0,0.8));
          }

          .winner-header {
            background: linear-gradient(90deg, ${gradientStart} 0%, ${gradientMid} 45%, ${gradientEnd} 100%);
            color: #ffffff;
            height: 42px;
            transform: skewX(-12deg);
            border-radius: 5px;
            border: 1.5px solid ${borderHighlight};
            display: flex;
            align-items: center;
            padding: 0 16px;
            justify-content: space-between;
          }

          .winner-left-section {
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .winner-sport-title {
            font-size: 24px;
            font-weight: 900;
            font-style: italic;
            letter-spacing: 2px;
            text-transform: uppercase;
          }

          .winner-rings {
            transform: skewX(12deg);
            fill: none;
            stroke: #ffffff;
            stroke-width: 3;
          }

          .winner-sub-bar {
            background: #e2e8f0;
            color: #00223e;
            height: 28px;
            transform: skewX(-12deg);
            border-radius: 3px;
            display: flex;
            align-items: center;
            padding: 0 20px;
            margin-left: 15px;
            width: 750px;
          }

          .winner-sub-title {
            transform: skewX(12deg);
            font-size: 16px;
            font-weight: 900;
            font-style: italic;
            letter-spacing: 1px;
          }

          .winner-row {
            background: ${darkTabColor};
            color: #ffffff;
            height: 34px;
            transform: skewX(-12deg);
            border-radius: 3px;
            border: 1px solid rgba(0, 136, 204, 0.6);
            display: flex;
            align-items: center;
            padding: 0 16px;
            margin-left: 15px;
            width: 750px;
            justify-content: space-between;
          }

          .winner-row.row-alt {
            background: ${altRowColor};
          }

          .winner-row-left {
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .winner-noc {
            font-size: 16px;
            font-weight: 900;
            font-style: italic;
          }

          .winner-flag-img {
            width: 80px;
            height: 22px;
            object-fit: cover;
            border-radius: 3px;
            border: 1.5px solid rgba(255,255,255,0.6);
            transform: skewX(12deg);
            display: block;
          }

          .winner-name {
            font-size: 17px;
            font-weight: 900;
            font-style: italic;
            letter-spacing: 1px;
            text-transform: uppercase;
          }

          .winner-row-right {
            display: flex;
            align-items: center;
            gap: 14px;
          }

          .winner-wr-badge {
            background: linear-gradient(180deg, #fbbf24 0%, #f59e0b 100%);
            color: #00223e;
            font-size: 13px;
            font-weight: 900;
            font-style: italic;
            padding: 1px 6px;
            border-radius: 2px;
          }

          .winner-or-badge {
            background: linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%);
            color: #00223e;
            font-size: 13px;
            font-weight: 900;
            font-style: italic;
            padding: 1px 6px;
            border-radius: 2px;
          }

          .winner-time {
            font-size: 18px;
            font-weight: 900;
            font-style: italic;
            min-width: 90px;
            text-align: right;
          }

          .unskew {
            transform: skewX(12deg);
          }
        </style>
      </head>
      <body>
        <div class="winner-container">
          <div class="winner-header">
            <div class="winner-left-section">
              <span style="font-size:24px;transform:skewX(12deg);">🏊</span>
              <div class="winner-sport-title"><span class="unskew">${headerTitleVal}</span></div>
            </div>
            <svg class="winner-rings" viewBox="0 0 100 45" width="48" height="22">
              <circle cx="15" cy="16" r="11"/>
              <circle cx="38" cy="16" r="11"/>
              <circle cx="61" cy="16" r="11"/>
              <circle cx="84" cy="16" r="11"/>
              <circle cx="26.5" cy="27" r="11"/>
              <circle cx="49.5" cy="27" r="11"/>
              <circle cx="72.5" cy="27" r="11"/>
            </svg>
          </div>
          <div class="winner-sub-bar">
            <div class="winner-sub-title"><span class="unskew">${subTitleVal}</span></div>
          </div>
          ${winnersList.map((w, idx) => {
      const nocCode = (w.noc || w.flag || w.country || '').toUpperCase();
      const flagUrl = getFlagBase64(nocCode);
      const isWR = w.record === 'WR';
      return `
              <div class="winner-row ${idx % 2 === 1 ? 'row-alt' : ''}">
                <div class="winner-row-left">
                  ${flagUrl ? `<img src="${flagUrl}" class="winner-flag-img" />` : ''}
                  <div class="winner-name"><span class="unskew">${(w.name || '').toUpperCase()}</span></div>
                </div>
                <div class="winner-row-right">
                  ${w.record ? `<div class="${isWR ? 'winner-wr-badge' : 'winner-or-badge'}"><span class="unskew">${w.record}</span></div>` : ''}
                  <div class="winner-time"><span class="unskew">${w.time}</span></div>
                </div>
              </div>
            `;
    }).join('')}
        </div>
      </body>
      </html>
    `;
  }

  // ── SW012 / Result ──
  else if (normId.includes('SW012') || normId.includes('RESULT')) {
    const isB = normId.endsWith('B') || normId.includes('SW012B');
    const headerTitle = (customData.headerTitle || customData.event || (isB ? "MEN'S 4X200M FREESTYLE RELAY" : "WOMEN'S 200M BUTTERFLY")).toUpperCase();
    const subTitle = (customData.subTitle || (isB ? 'RESULT - FINAL' : 'RESULT - SEMI-FINAL 2')).toUpperCase();
    const defaultResultsA = [
      { pos: '1', noc: 'CHN', name: 'LIU ZIGE', time: '2:06.25', record: '' },
      { pos: '2', noc: 'AUS', name: 'JESSICAH SCHIPPER', time: '2:06.34', record: '' },
      { pos: '3', noc: 'POL', name: 'OTYLIA JEDRZEJCZAK', time: '2:06.78', record: '' },
      { pos: '4', noc: 'JPN', name: 'YUKO NAKANISHI', time: '2:06.96', record: '' },
      { pos: '4', noc: 'USA', name: 'KATHLEEN HERSEY', time: '2:06.96', record: '' },
      { pos: '6', noc: 'USA', name: 'ELAINE BREEDEN', time: '2:07.73', record: '' },
      { pos: '7', noc: 'AUS', name: 'SAMANTHA HAMILL', time: '2:09.58', record: '' },
      { pos: '8', noc: 'GBR', name: 'ELLEN GANDY', time: '2:10.60', record: '' },
    ];
    const defaultResultsB = [
      { pos: '1', noc: 'USA', name: 'UNITED STATES', time: '6:58.56', record: 'WR' },
      { pos: '2', noc: 'GBR', name: 'GREAT BRITAIN', time: '7:03.70', record: '' },
      { pos: '3', noc: 'POL', name: 'POLAND', time: '7:04.98', record: '' },
      { pos: '4', noc: 'AUS', name: 'AUSTRALIA', time: '7:05.35', record: '' },
      { pos: '5', noc: 'RSA', name: 'SOUTH AFRICA', time: '7:05.77', record: '' },
      { pos: '6', noc: 'AUT', name: 'AUSTRIA', time: '7:05.92', record: '' },
      { pos: '7', noc: 'HUN', name: 'HUNGARY', time: '7:10.31', record: '' },
      { pos: '', noc: 'GRE', name: 'GREECE', time: '', record: 'DSQ' },
    ];
    const resultsList = customData.athletes || customData.results || (isB ? defaultResultsB : defaultResultsA);
    return `<!DOCTYPE html><html><head><meta charset="utf-8">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,800;1,900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }
        .result-container { position: absolute; bottom: 80px; left: 280px; width: 780px; display: flex; flex-direction: column; gap: 3px; filter: drop-shadow(0 12px 25px rgba(0,0,0,0.8)); }
        .result-header { background: linear-gradient(90deg, ${gradientStart} 0%, ${gradientMid} 45%, ${gradientEnd} 100%); height: 42px; transform: skewX(-12deg); border-radius: 5px; border: 1.5px solid ${borderHighlight}; display: flex; align-items: center; padding: 0 16px; justify-content: space-between; }
        .result-sub-bar { background: #e2e8f0; height: 26px; transform: skewX(-12deg); border-radius: 3px; display: flex; align-items: center; padding: 0 20px; margin-left: 15px; width: 750px; }
        .result-sub-title { transform: skewX(12deg); font-size: 15px; font-weight: 900; font-style: italic; color: #00223e; }
        .result-row { background: ${darkTabColor}; color: #fff; height: 32px; transform: skewX(-12deg); border-radius: 3px; border: 1px solid rgba(0,136,204,0.5); display: flex; align-items: center; margin-left: 15px; width: 750px; justify-content: space-between; overflow: hidden; }
        .result-row.row-alt { background: ${altRowColor}; }
        .result-pos { background: #c00000; width: 30px; height: 32px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .result-pos span { transform: skewX(12deg); font-size: 16px; font-weight: 900; font-style: italic; }
        .result-left { display: flex; align-items: center; gap: 8px; padding-left: 6px; }
        .result-flag-img { width: 70px; height: 22px; object-fit: cover; border-radius: 2px; border: 1px solid rgba(255,255,255,0.5); transform: skewX(12deg); display: block; }
        .result-name { font-size: 16px; font-weight: 900; font-style: italic; }
        .result-right { display: flex; align-items: center; gap: 8px; padding-right: 12px; }
        .result-badge-wr { background: #f59e0b; color: #00223e; font-size: 12px; font-weight: 900; font-style: italic; padding: 1px 5px; border-radius: 2px; }
        .result-badge-or { background: #cbd5e1; color: #00223e; font-size: 12px; font-weight: 900; font-style: italic; padding: 1px 5px; border-radius: 2px; }
        .result-badge-dsq { background: #cbd5e1; color: #00223e; font-size: 12px; font-weight: 900; font-style: italic; padding: 1px 5px; border-radius: 2px; }
        .result-time { font-size: 16px; font-weight: 900; font-style: italic; min-width: 80px; text-align: right; }
        .unskew { transform: skewX(12deg); display: block; }
        .h-title { transform: skewX(12deg); font-size: 20px; font-weight: 900; font-style: italic; color: #fff; }
        .rings { transform: skewX(12deg); fill: none; stroke: #fff; stroke-width: 2.5; }
      </style></head><body>
        <div class="result-container">
          <div class="result-header">
            <div style="display:flex;align-items:center;gap:10px;"><span style="font-size:28px;transform:skewX(12deg);">🏊</span><div class="h-title">${headerTitle}</div></div>
            <svg class="rings" viewBox="0 0 100 45" width="48" height="22"><circle cx="15" cy="16" r="11"/><circle cx="38" cy="16" r="11"/><circle cx="61" cy="16" r="11"/><circle cx="84" cy="16" r="11"/><circle cx="26.5" cy="27" r="11"/><circle cx="49.5" cy="27" r="11"/><circle cx="72.5" cy="27" r="11"/></svg>
          </div>
          <div class="result-sub-bar"><div class="result-sub-title">${subTitle}</div></div>
          ${resultsList.slice(0, 8).map((r, idx) => {
      const nocCode = (r.noc || '').toUpperCase();
      const flagUrl = getFlagBase64(nocCode);
      return `<div class="result-row ${idx % 2 === 1 ? 'row-alt' : ''}">
              <div class="result-pos"><span>${r.pos || ''}</span></div>
              <div class="result-left">${flagUrl ? `<img src="${flagUrl}" class="result-flag-img" />` : ''}<div class="result-name"><span class="unskew">${(r.name || '').toUpperCase()}</span></div></div>
              <div class="result-right">${r.record === 'WR' ? `<div class="result-badge-wr"><span class="unskew">WR</span></div>` : ''}${r.record === 'OR' ? `<div class="result-badge-or"><span class="unskew">OR</span></div>` : ''}${r.record === 'DSQ' ? `<div class="result-badge-dsq"><span class="unskew">DSQ</span></div>` : ''}${r.time ? `<div class="result-time"><span class="unskew">${r.time}</span></div>` : ''}</div>
            </div>`;
    }).join('')}
        </div>
      </body></html>`;
  }

  // ── SW013 / Advance All to Phase ──
  else if (normId.includes('SW013') || normId.includes('ADVANCE ALL')) {
    const isB = normId.endsWith('B') || normId.includes('SW013B');
    const headerTitle13 = (customData.headerTitle || customData.event || (isB ? "MEN'S 4X200M FREESTYLE RELAY" : "WOMEN'S 200M BUTTERFLY")).toUpperCase();
    const subTitle13 = `${(customData.fromPhase || (isB ? 'HEATS' : 'SEMI-FINALS')).toUpperCase()} → ${(customData.toPhase || 'FINAL').toUpperCase()}`;
    const defA13 = [
      { pos: '1', noc: 'CHN', name: 'LIU ZIGE', time: '2:06.25' }, { pos: '2', noc: 'AUS', name: 'JESSICAH SCHIPPER', time: '2:06.34' },
      { pos: '3', noc: 'CHN', name: 'JIAO LIUYANG', time: '2:06.78' }, { pos: '4', noc: 'POL', name: 'OTYLIA JEDRZEJCZAK', time: '2:06.96' },
      { pos: '4', noc: 'JPN', name: 'YUKO NAKANISHI', time: '2:06.96' }, { pos: '6', noc: 'USA', name: 'KATHLEEN HERSEY', time: '2:07.73' },
      { pos: '7', noc: 'FRA', name: 'AURORE MONGEL', time: '2:09.58' }, { pos: '8', noc: 'USA', name: 'ELAINE BREEDEN', time: '2:10.60' },
    ];
    const defB13 = [
      { pos: '1', noc: 'USA', name: 'UNITED STATES', time: '7:04.66', record: 'OR' }, { pos: '2', noc: 'ITA', name: 'ITALY', time: '7:07.84' },
      { pos: '3', noc: 'RUS', name: 'RUSSIAN FEDERATION', time: '7:07.86' }, { pos: '4', noc: 'GBR', name: 'GREAT BRITAIN', time: '7:07.89' },
      { pos: '5', noc: 'CAN', name: 'CANADA', time: '7:08.04' }, { pos: '6', noc: 'AUS', name: 'AUSTRALIA', time: '7:08.41' },
      { pos: '7', noc: 'JPN', name: 'JAPAN', time: '7:09.12' }, { pos: '8', noc: 'RSA', name: 'SOUTH AFRICA', time: '7:10.91' },
    ];
    const advList13 = customData.athletes || customData.results || (isB ? defB13 : defA13);
    return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
        @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,800;1,900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }
        .result-container { position: absolute; bottom: 80px; left: 280px; width: 780px; display: flex; flex-direction: column; gap: 3px; filter: drop-shadow(0 12px 25px rgba(0,0,0,0.8)); }
        .result-header { background: linear-gradient(90deg, ${gradientStart} 0%, ${gradientMid} 45%, ${gradientEnd} 100%); height: 42px; transform: skewX(-12deg); border-radius: 5px; border: 1.5px solid ${borderHighlight}; display: flex; align-items: center; padding: 0 16px; justify-content: space-between; }
        .result-sub-bar { background: #e2e8f0; height: 26px; transform: skewX(-12deg); border-radius: 3px; display: flex; align-items: center; padding: 0 20px; margin-left: 15px; width: 750px; }
        .result-sub-title { transform: skewX(12deg); font-size: 15px; font-weight: 900; font-style: italic; color: #00223e; }
        .result-row { background: ${darkTabColor}; color: #fff; height: 32px; transform: skewX(-12deg); border-radius: 3px; border: 1px solid rgba(0,136,204,0.5); display: flex; align-items: center; margin-left: 15px; width: 750px; justify-content: space-between; overflow: hidden; }
        .result-row.row-alt { background: ${altRowColor}; }
        .result-pos { background: #c00000; width: 30px; height: 32px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .result-pos span { transform: skewX(12deg); font-size: 16px; font-weight: 900; font-style: italic; }
        .result-left { display: flex; align-items: center; gap: 8px; padding-left: 6px; }
        .result-flag-img { width: 70px; height: 22px; object-fit: cover; border-radius: 2px; border: 1px solid rgba(255,255,255,0.5); transform: skewX(12deg); display: block; }
        .result-name { font-size: 16px; font-weight: 900; font-style: italic; }
        .result-right { display: flex; align-items: center; gap: 8px; padding-right: 12px; }
        .result-badge-or { background: #cbd5e1; color: #00223e; font-size: 12px; font-weight: 900; font-style: italic; padding: 1px 5px; border-radius: 2px; }
        .result-time { font-size: 16px; font-weight: 900; font-style: italic; min-width: 80px; text-align: right; }
        .unskew { transform: skewX(12deg); display: block; }
        .h-title { transform: skewX(12deg); font-size: 20px; font-weight: 900; font-style: italic; color: #fff; }
        .rings { transform: skewX(12deg); fill: none; stroke: #fff; stroke-width: 2.5; }
      </style></head><body>
        <div class="result-container">
          <div class="result-header">
            <div style="display:flex;align-items:center;gap:10px;"><span style="font-size:28px;transform:skewX(12deg);">🏊</span><div class="h-title">${headerTitle13}</div></div>
            <svg class="rings" viewBox="0 0 100 45" width="48" height="22"><circle cx="15" cy="16" r="11"/><circle cx="38" cy="16" r="11"/><circle cx="61" cy="16" r="11"/><circle cx="84" cy="16" r="11"/><circle cx="26.5" cy="27" r="11"/><circle cx="49.5" cy="27" r="11"/><circle cx="72.5" cy="27" r="11"/></svg>
          </div>
          <div class="result-sub-bar"><div class="result-sub-title">${subTitle13}</div></div>
          ${advList13.slice(0, 8).map((r, idx) => {
      const nocCode = (r.noc || '').toUpperCase();
      const flagUrl = getFlagBase64(nocCode);
      return `<div class="result-row ${idx % 2 === 1 ? 'row-alt' : ''}">
              <div class="result-pos"><span>${r.pos || ''}</span></div>
              <div class="result-left">${flagUrl ? `<img src="${flagUrl}" class="result-flag-img" />` : ''}<div class="result-name"><span class="unskew">${(r.name || '').toUpperCase()}</span></div></div>
              <div class="result-right">${r.record === 'OR' || r.record === 'WR' ? `<div class="result-badge-or"><span class="unskew">${r.record}</span></div>` : ''}${r.time ? `<div class="result-time"><span class="unskew">${r.time}</span></div>` : ''}</div>
            </div>`;
    }).join('')}
        </div>
      </body></html>`;
  }

  // ── SW014 / Non-Competition Area Indicator ──
  else if (normId.includes('SW014') || normId.includes('NON-COMPETITION') || normId.includes('NON COMPETITION')) {
    const isB14 = normId.endsWith('B') || normId.includes('SW014B');
    const areaLabel14 = (customData.area || customData.label || (isB14 ? 'CALL ROOM' : 'WARM UP POOL')).toUpperCase();
    return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
        @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,800;1,900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }
        .pill { position: absolute; top: 150px; left: 280px; width: 220px; height: 34px; background: linear-gradient(90deg, #bdc9d4 0%, #ffffff 50%, #9fb5c2 100%); transform: skewX(-12deg); border-radius: 15px; border: 1.5px solid #7a8fa0; display: flex; align-items: center; justify-content: center; filter: drop-shadow(0 6px 14px rgba(0,0,0,0.5)); }
        .pill-text { transform: skewX(12deg); font-size: 17px; font-weight: 900; font-style: italic; color: #00223e; }
      </style></head><body><div class="pill"><div class="pill-text">${areaLabel14}</div></div></body></html>`;
  }

  // ── SW015 / Ceremony ID ──
  else if (normId.includes('SW015') || normId.includes('SW120') || normId.includes('CEREMONY ID')) {
    const eventTitle15 = (customData.event || customData.headerTitle || "WOMEN'S 200M BUTTERFLY").toUpperCase();
    const ceremonyLabel15 = (customData.ceremony || 'VICTORY CEREMONY').toUpperCase();
    return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
        @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,800;1,900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }
        .cer-container { position: absolute; bottom: 60px; left: 280px; width: 780px; display: flex; flex-direction: column; gap: 2px; filter: drop-shadow(0 12px 25px rgba(0,0,0,0.8)); }
        .cer-header { background: linear-gradient(90deg, ${gradientStart} 0%, ${gradientMid} 45%, ${gradientEnd} 100%); height: 42px; transform: skewX(-12deg); border-radius: 5px; border: 1.5px solid ${borderHighlight}; display: flex; align-items: center; padding: 0 16px; justify-content: space-between; }
        .cer-sub-bar { background: #e2e8f0; height: 26px; transform: skewX(-12deg); border-radius: 3px; margin-left: 15px; width: 750px; display: flex; align-items: center; padding: 0 20px; }
        .cer-sub-title { transform: skewX(12deg); font-size: 15px; font-weight: 900; font-style: italic; color: #00223e; }
        .h-title { transform: skewX(12deg); font-size: 20px; font-weight: 900; font-style: italic; color: #fff; }
        .rings { transform: skewX(12deg); fill: none; stroke: #fff; stroke-width: 2.5; }
      </style></head><body>
        <div class="cer-container">
          <div class="cer-header">
            <div style="display:flex;align-items:center;gap:10px;"><span style="font-size:28px;transform:skewX(12deg);">🏊</span><div class="h-title">${eventTitle15}</div></div>
            <svg class="rings" viewBox="0 0 100 45" width="48" height="22"><circle cx="15" cy="16" r="11"/><circle cx="38" cy="16" r="11"/><circle cx="61" cy="16" r="11"/><circle cx="84" cy="16" r="11"/><circle cx="26.5" cy="27" r="11"/><circle cx="49.5" cy="27" r="11"/><circle cx="72.5" cy="27" r="11"/></svg>
          </div>
          <div class="cer-sub-bar"><div class="cer-sub-title">${ceremonyLabel15}</div></div>
        </div>
      </body></html>`;
  }

  // ── SW016 / Medal ID ──
  else if (normId.includes('SW016') || normId.includes('SW121') || normId.includes('MEDAL ID')) {
    const isB16 = normId.endsWith('B') || normId.includes('SW016B');
    const nocCode16 = (customData.noc || (isB16 ? 'GBR' : 'CHN')).toUpperCase();
    const athleteName16 = (customData.name || customData.team || (isB16 ? 'GREAT BRITAIN' : 'LIU ZIGE')).toUpperCase();
    const medalColor16 = (customData.medal || (isB16 ? 'SILVER' : 'GOLD')).toUpperCase();
    const eventLabel16 = (customData.event || (isB16 ? "MEN'S 4X200M FREESTYLE RELAY" : "WOMEN'S 200M BUTTERFLY")).toUpperCase();
    const flagUrl16 = getFlagBase64(nocCode16);
    const medalEmoji16 = medalColor16 === 'GOLD' ? '🥇' : medalColor16 === 'SILVER' ? '🥈' : '🥉';
    return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
        @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,800;1,900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }
        .medal-id-container { position: absolute; bottom: 60px; left: 280px; width: 780px; display: flex; flex-direction: column; gap: 2px; filter: drop-shadow(0 12px 25px rgba(0,0,0,0.8)); }
        .medal-id-header { background: linear-gradient(90deg, ${gradientStart} 0%, ${gradientMid} 45%, ${gradientEnd} 100%); height: 42px; transform: skewX(-12deg); border-radius: 5px; border: 1.5px solid ${borderHighlight}; display: flex; align-items: center; padding: 0 16px; justify-content: space-between; overflow: visible; }
        .medal-id-sub { background: ${darkTabColor}; height: 26px; transform: skewX(-12deg); border-radius: 3px; margin-left: 15px; width: 750px; display: flex; align-items: center; padding: 0 16px; gap: 8px; }
        .flag-img { width: 70px; height: 22px; object-fit: cover; border-radius: 2px; border: 1px solid rgba(255,255,255,0.5); display: block; flex-shrink: 0; }
        .h-name { transform: skewX(12deg); font-size: 22px; font-weight: 900; font-style: italic; color: #fff; }
        .sub-text { transform: skewX(12deg); font-size: 14px; font-weight: 900; font-style: italic; color: #fff; }
        .rings { transform: skewX(12deg); fill: none; stroke: #fff; stroke-width: 2.5; }
        .header-left { display: flex; align-items: center; gap: 12px; transform: skewX(12deg); }
      </style></head><body>
        <div class="medal-id-container">
          <div class="medal-id-header">
            <div class="header-left">${flagUrl16 ? `<img src="${flagUrl16}" class="flag-img" />` : ''}<div style="font-size:22px;font-weight:900;font-style:italic;color:#fff;">${athleteName16}</div></div>
            <svg class="rings" viewBox="0 0 100 45" width="48" height="22"><circle cx="15" cy="16" r="11"/><circle cx="38" cy="16" r="11"/><circle cx="61" cy="16" r="11"/><circle cx="84" cy="16" r="11"/><circle cx="26.5" cy="27" r="11"/><circle cx="49.5" cy="27" r="11"/><circle cx="72.5" cy="27" r="11"/></svg>
          </div>
          <div class="medal-id-sub"><span style="font-size:18px;transform:skewX(12deg);">${medalEmoji16}</span><div class="sub-text">${medalColor16} - ${eventLabel16}</div></div>
        </div>
      </body></html>`;
  }

  // ── SW017 / Medals List ──
  else if (normId.includes('SW017') || normId.includes('SW122') || normId.includes('MEDALS LIST')) {
    const isB17 = normId.endsWith('B') || normId.includes('SW017B');
    const eventTitle17 = (customData.event || customData.headerTitle || (isB17 ? "MEN'S 4X200M FREESTYLE RELAY" : "WOMEN'S 200M BUTTERFLY")).toUpperCase();
    const ceremonyLabel17 = (customData.ceremony || 'VICTORY CEREMONY').toUpperCase();
    const defA17 = [{ medal: 'GOLD', noc: 'CHN', name: 'LIU ZIGE' }, { medal: 'SILVER', noc: 'CHN', name: 'JIAO LIUYANG' }, { medal: 'BRONZE', noc: 'AUS', name: 'JESSICAH SCHIPPER' }];
    const defB17 = [{ medal: 'GOLD', noc: 'USA', name: 'UNITED STATES' }, { medal: 'SILVER', noc: 'GBR', name: 'GREAT BRITAIN' }, { medal: 'BRONZE', noc: 'POL', name: 'POLAND' }];
    const medalsList17 = customData.medals || customData.athletes || (isB17 ? defB17 : defA17);
    const medalEmojis17 = { GOLD: '🥇', SILVER: '🥈', BRONZE: '🥉' };
    return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
        @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,800;1,900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }
        .ml-container { position: absolute; bottom: 80px; left: 280px; width: 780px; display: flex; flex-direction: column; gap: 3px; filter: drop-shadow(0 12px 25px rgba(0,0,0,0.8)); }
        .ml-header { background: linear-gradient(90deg, ${gradientStart} 0%, ${gradientMid} 45%, ${gradientEnd} 100%); height: 42px; transform: skewX(-12deg); border-radius: 5px; border: 1.5px solid ${borderHighlight}; display: flex; align-items: center; padding: 0 16px; justify-content: space-between; }
        .ml-sub-bar { background: #e2e8f0; height: 26px; transform: skewX(-12deg); border-radius: 3px; margin-left: 15px; width: 750px; display: flex; align-items: center; padding: 0 20px; }
        .ml-sub-title { transform: skewX(12deg); font-size: 15px; font-weight: 900; font-style: italic; color: #00223e; }
        .ml-row { background: ${darkTabColor}; color: #fff; height: 32px; transform: skewX(-12deg); border-radius: 3px; border: 1px solid rgba(0,136,204,0.5); display: flex; align-items: center; margin-left: 15px; width: 750px; overflow: hidden; }
        .ml-medal { width: 36px; height: 32px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 20px; }
        .ml-flag-img { width: 70px; height: 22px; object-fit: cover; border-radius: 2px; border: 1px solid rgba(255,255,255,0.5); transform: skewX(12deg); display: block; margin-left: 8px; }
        .ml-name { font-size: 17px; font-weight: 900; font-style: italic; margin-left: 10px; }
        .unskew { transform: skewX(12deg); display: block; }
        .h-title { transform: skewX(12deg); font-size: 20px; font-weight: 900; font-style: italic; color: #fff; }
        .rings { transform: skewX(12deg); fill: none; stroke: #fff; stroke-width: 2.5; }
      </style></head><body>
        <div class="ml-container">
          <div class="ml-header">
            <div style="display:flex;align-items:center;gap:10px;"><span style="font-size:28px;transform:skewX(12deg);">🏊</span><div class="h-title">${eventTitle17}</div></div>
            <svg class="rings" viewBox="0 0 100 45" width="48" height="22"><circle cx="15" cy="16" r="11"/><circle cx="38" cy="16" r="11"/><circle cx="61" cy="16" r="11"/><circle cx="84" cy="16" r="11"/><circle cx="26.5" cy="27" r="11"/><circle cx="49.5" cy="27" r="11"/><circle cx="72.5" cy="27" r="11"/></svg>
          </div>
          <div class="ml-sub-bar"><div class="ml-sub-title">${ceremonyLabel17}</div></div>
          ${medalsList17.slice(0, 3).map((m) => {
      const noc17 = (m.noc || '').toUpperCase();
      const flagUrl17 = getFlagBase64(noc17);
      const emoji17 = medalEmojis17[(m.medal || 'GOLD').toUpperCase()] || '🥇';
      return `<div class="ml-row">
              <div class="ml-medal"><span style="transform:skewX(12deg)">${emoji17}</span></div>
              ${flagUrl17 ? `<img src="${flagUrl17}" class="ml-flag-img" />` : ''}
              <div class="ml-name"><span class="unskew">${(m.name || '').toUpperCase()}</span></div>
            </div>`;
    }).join('')}
        </div>
      </body></html>`;
  }

  // ── SW018 / Medal Presenter ID ──
  else if (normId.includes('SW018') || normId.includes('SW123') || normId.includes('MEDAL PRESENTER')) {
    const presenterName18 = (customData.name || customData.presenter || 'JACQUES ROGGE').toUpperCase();
    const presenterTitle18 = (customData.title || customData.designation || 'IOC PRESIDENT, BELGIUM').toUpperCase();
    return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
        @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,800;1,900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }
        .presenter-container { position: absolute; bottom: 60px; left: 280px; width: 700px; display: flex; flex-direction: column; gap: 2px; filter: drop-shadow(0 12px 25px rgba(0,0,0,0.8)); }
        .pres-header { background: linear-gradient(90deg, ${gradientStart} 0%, ${gradientMid} 45%, ${gradientEnd} 100%); height: 42px; transform: skewX(-12deg); border-radius: 5px; border: 1.5px solid ${borderHighlight}; display: flex; align-items: center; padding: 0 16px; justify-content: space-between; }
        .pres-sub { background: ${darkTabColor}; height: 26px; transform: skewX(-12deg); border-radius: 3px; margin-left: 15px; width: 670px; display: flex; align-items: center; padding: 0 20px; }
        .pres-name { transform: skewX(12deg); font-size: 22px; font-weight: 900; font-style: italic; color: #fff; }
        .pres-title-text { transform: skewX(12deg); font-size: 14px; font-weight: 900; font-style: italic; color: #fff; }
        .rings { transform: skewX(12deg); fill: none; stroke: #fff; stroke-width: 2.5; }
      </style></head><body>
        <div class="presenter-container">
          <div class="pres-header"><div class="pres-name">${presenterName18}</div><svg class="rings" viewBox="0 0 100 45" width="48" height="22"><circle cx="15" cy="16" r="11"/><circle cx="38" cy="16" r="11"/><circle cx="61" cy="16" r="11"/><circle cx="84" cy="16" r="11"/><circle cx="26.5" cy="27" r="11"/><circle cx="49.5" cy="27" r="11"/><circle cx="72.5" cy="27" r="11"/></svg></div>
          <div class="pres-sub"><div class="pres-title-text">${presenterTitle18}</div></div>
        </div>
      </body></html>`;
  }

  // ── SW019 / Flower Presenter ID ──
  else if (normId.includes('SW019') || normId.includes('SW124') || normId.includes('FLOWER PRESENTER')) {
    const presenterName19 = (customData.name || customData.presenter || 'MR BILL MATSON').toUpperCase();
    const presenterTitle19 = (customData.title || customData.designation || 'VICE PRESIDENT, FINA').toUpperCase();
    return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
        @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,800;1,900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }
        .presenter-container { position: absolute; bottom: 60px; left: 280px; width: 700px; display: flex; flex-direction: column; gap: 2px; filter: drop-shadow(0 12px 25px rgba(0,0,0,0.8)); }
        .pres-header { background: linear-gradient(90deg, ${gradientStart} 0%, ${gradientMid} 45%, ${gradientEnd} 100%); height: 42px; transform: skewX(-12deg); border-radius: 5px; border: 1.5px solid ${borderHighlight}; display: flex; align-items: center; padding: 0 16px; justify-content: space-between; }
        .pres-sub { background: ${darkTabColor}; height: 26px; transform: skewX(-12deg); border-radius: 3px; margin-left: 15px; width: 670px; display: flex; align-items: center; padding: 0 20px; }
        .pres-name { transform: skewX(12deg); font-size: 22px; font-weight: 900; font-style: italic; color: #fff; }
        .pres-title-text { transform: skewX(12deg); font-size: 14px; font-weight: 900; font-style: italic; color: #fff; }
        .rings { transform: skewX(12deg); fill: none; stroke: #fff; stroke-width: 2.5; }
      </style></head><body>
        <div class="presenter-container">
          <div class="pres-header"><div class="pres-name">${presenterName19}</div><svg class="rings" viewBox="0 0 100 45" width="48" height="22"><circle cx="15" cy="16" r="11"/><circle cx="38" cy="16" r="11"/><circle cx="61" cy="16" r="11"/><circle cx="84" cy="16" r="11"/><circle cx="26.5" cy="27" r="11"/><circle cx="49.5" cy="27" r="11"/><circle cx="72.5" cy="27" r="11"/></svg></div>
          <div class="pres-sub"><div class="pres-title-text">${presenterTitle19}</div></div>
        </div>
      </body></html>`;
  }

  // ── SW006 / Lane ID Layout (5 Distinct Variants SW006a to SW006e) ──
  else if (normId.includes('SW006') || normId.includes('SW106') || normId.includes('LANE ID')) {
    const isB = normId.endsWith('B') || normId.includes('SW006B') || normId.includes('SW106B');
    const isC = normId.endsWith('C') || normId.includes('SW006C') || normId.includes('SW106C');
    const isD = normId.endsWith('D') || normId.includes('SW006D') || normId.includes('SW106D');
    const isE = normId.endsWith('E') || normId.includes('SW006E') || normId.includes('SW106E');

    const laneNum = customData.lane || (isB ? '5' : isC ? '7' : isD ? '7' : isE ? '4' : '4');
    const nocCode = (customData.noc || (isB ? 'FRA' : isC ? 'HUN' : isD || isE ? 'USA' : 'POL')).toUpperCase();
    const athleteName = (customData.name || customData.team || (isB ? 'FRANCE' : isC ? 'BEATRIX BOULSEVICZ' : isD ? 'KATHLEEN HERSEY' : isE ? 'UNITED STATES' : 'OTYLIA JEDRZEJCZAK')).toUpperCase();
    const topBadge = customData.topBadge || (isC ? 'FALSE START' : '');
    const statusBadge = customData.status || (isC ? 'DSQ' : '');

    // Bottom sub-bar is STRICTLY ONLY shown on Variant D and Variant E!
    const timeResult = (isD || isE) ? (customData.time || (isD ? '2:06.96' : '7:04.66')) : '';
    const hasOrRecord = isE || (isD && customData.record === 'OR');
    const hasQBadge = isD || isE;
    const flagUrl = getFlagBase64(nocCode);

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .lane-id-container {
            position: absolute;
            bottom: 100px;
            left: 280px;
            width: 780px;
            filter: drop-shadow(0 12px 25px rgba(0,0,0,0.8));
          }

          .lane-top-badge {
            background: linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%);
            color: #00223e;
            font-size: 13px;
            font-weight: 900;
            font-style: italic;
            padding: 3px 16px;
            transform: skewX(-12deg);
            border-radius: 4px 4px 0 0;
            width: fit-content;
            margin-left: 30px;
            margin-bottom: -2px;
            border: 1px solid #ffffff;
          }

          .lane-main-bar {
            background: linear-gradient(90deg, ${gradientStart} 0%, ${gradientMid} 45%, ${gradientEnd} 100%);
            color: #ffffff;
            height: 42px;
            transform: skewX(-12deg);
            border-radius: 5px;
            border: 1.5px solid ${borderHighlight};
            display: flex;
            align-items: center;
            padding: 0 16px;
            justify-content: space-between;
          }

          .lane-left-section {
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .lane-num {
            font-size: 22px;
            font-weight: 900;
            font-style: italic;
            width: 25px;
            text-align: center;
          }

          .lane-noc {
            font-size: 18px;
            font-weight: 900;
            font-style: italic;
          }

          .lane-flag-img {
            width: 80px;
            height: 22px;
            object-fit: cover;
            border-radius: 3px;
            border: 1.5px solid rgba(255,255,255,0.6);
            transform: skewX(12deg);
            display: block;
          }

          .lane-name {
            font-size: 22px;
            font-weight: 900;
            font-style: italic;
            letter-spacing: 1px;
            text-transform: uppercase;
            margin-left: 10px;
          }

          .lane-right-section {
            display: flex;
            align-items: center;
            gap: 16px;
          }

          .lane-status-badge {
            background: #ffffff;
            color: #00223e;
            font-size: 15px;
            font-weight: 900;
            font-style: italic;
            padding: 2px 12px;
            border-radius: 3px;
            border: 1px solid ${borderHighlight};
            display: inline-block;
            transform: skewX(-12deg);
          }

          .lane-rings {
            transform: skewX(12deg);
            fill: none;
            stroke: #ffffff;
            stroke-width: 3;
          }

          .lane-sub-bar {
            background: #00192e;
            color: #ffffff;
            transform: skewX(-12deg);
            border-radius: 0 0 4px 4px;
            border: 1px solid ${borderHighlight};
            width: fit-content;
            padding: 3px 14px;
            margin-left: 15px;
            margin-top: -3px;
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .lane-time-text {
            font-size: 15px;
            font-weight: 900;
            font-style: italic;
          }

          .lane-or-badge {
            background: linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%);
            color: #00223e;
            font-size: 13px;
            font-weight: 900;
            font-style: italic;
            padding: 1px 6px;
            border-radius: 2px;
          }

          .lane-q-badge {
            background: #16a34a;
            color: #ffffff;
            font-size: 13px;
            font-weight: 900;
            font-style: italic;
            padding: 1px 6px;
            border-radius: 2px;
          }

          .unskew {
            transform: skewX(12deg);
          }
        </style>
      </head>
      <body>
        <div class="lane-id-container">
          ${topBadge ? `<div class="lane-top-badge"><span class="unskew">${topBadge}</span></div>` : ''}
          <div class="lane-main-bar">
            <div class="lane-left-section">
              <div class="lane-num"><span class="unskew">${laneNum}</span></div>
              <div class="lane-noc"><span class="unskew">${nocCode}</span></div>
              ${flagUrl ? `<img src="${flagUrl}" class="strip-flag-img" style="width:80px;height:22px;object-fit:cover;border-radius:3px;border:1.5px solid rgba(255,255,255,0.6);transform:skewX(12deg);" />` : ''}
              <div class="lane-name"><span class="unskew">${athleteName}</span></div>
            </div>
            <div class="lane-right-section">
              ${statusBadge ? `<div class="lane-status-badge"><span class="unskew">${statusBadge.toUpperCase()}</span></div>` : ''}
              <svg class="lane-rings" viewBox="0 0 100 45" width="48" height="22">
                <circle cx="15" cy="16" r="11"/>
                <circle cx="38" cy="16" r="11"/>
                <circle cx="61" cy="16" r="11"/>
                <circle cx="84" cy="16" r="11"/>
                <circle cx="26.5" cy="27" r="11"/>
                <circle cx="49.5" cy="27" r="11"/>
                <circle cx="72.5" cy="27" r="11"/>
              </svg>
            </div>
          </div>
          ${timeResult ? `
            <div class="lane-sub-bar">
              <div class="lane-time-text"><span class="unskew">${timeResult}</span></div>
              ${hasOrRecord ? `<div class="lane-or-badge"><span class="unskew">OR</span></div>` : ''}
              ${hasQBadge ? `<div class="lane-q-badge"><span class="unskew">Q</span></div>` : ''}
            </div>
          ` : ''}
        </div>
      </body>
      </html>
    `;
  }

  // ── SW005 / SW005B Start List Layout ──
  else if (normId.includes('SW005') || normId.includes('SW105') || normId.includes('START LIST')) {
    const isB = normId.includes('SW005B') || normId.includes('SW105B');
    const eventTitleTextVal = (customData.event || (isB ? "MEN'S 4x200M FREESTYLE RELAY" : "WOMEN'S 200M BUTTERFLY")).toUpperCase();
    const phaseTitleTextVal = (customData.phase || (isB ? "START LIST - FINAL" : "START LIST - HEAT 5")).toUpperCase();

    const defaultAthletesA = [
      { lane: '1', noc: 'KOR', name: 'CHOI HYERA' },
      { lane: '2', noc: 'AUS', name: 'SAMANTHA HAMILL' },
      { lane: '3', noc: 'USA', name: 'ELAINE BREEDEN' },
      { lane: '4', noc: 'POL', name: 'OTYLIA JEDRZEJCZAK' },
      { lane: '5', noc: 'FRA', name: 'AURORE MONGEL' },
      { lane: '6', noc: 'CHN', name: 'JIAO LIUYANG' },
      { lane: '7', noc: 'HUN', name: 'BEATRIX BOULSEVICZ' },
      { lane: '8', noc: 'BRA', name: 'JOANNA MARANHAO' }
    ];

    const defaultAthletesB = [
      { lane: '1', noc: 'HUN', name: 'HUNGARY' },
      { lane: '2', noc: 'RSA', name: 'SOUTH AFRICA', status: 'DNS' },
      { lane: '3', noc: 'GBR', name: 'GREAT BRITAIN' },
      { lane: '4', noc: 'USA', name: 'UNITED STATES' },
      { lane: '5', noc: 'AUS', name: 'AUSTRALIA' },
      { lane: '6', noc: 'AUT', name: 'AUSTRIA' },
      { lane: '7', noc: 'POL', name: 'POLAND' },
      { lane: '8', noc: '', name: '' }
    ];

    const athletesList = customData.athletes || (isB ? defaultAthletesB : defaultAthletesA);

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .startlist-container {
            position: absolute;
            top: 180px;
            left: 280px;
            width: 860px;
            display: flex;
            flex-direction: column;
            gap: 4px;
            filter: drop-shadow(0 15px 30px rgba(0,0,0,0.8));
          }

          .startlist-header {
            background: linear-gradient(90deg, ${gradientStart} 0%, ${gradientMid} 45%, ${gradientEnd} 100%);
            color: #ffffff;
            padding: 12px 24px;
            transform: skewX(-12deg);
            border-radius: 6px;
            border: 1.5px solid ${borderHighlight};
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .startlist-header-title {
            transform: skewX(12deg);
            font-size: 28px;
            font-weight: 900;
            font-style: italic;
            letter-spacing: 2px;
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .startlist-rings {
            transform: skewX(12deg);
            fill: none;
            stroke: #ffffff;
            stroke-width: 3.2;
          }

          .startlist-sub-bar {
            background: #e2e8f0;
            color: #00223e;
            padding: 6px 24px;
            transform: skewX(-12deg);
            border-radius: 4px;
            margin-bottom: 4px;
          }

          .startlist-sub-title {
            transform: skewX(12deg);
            font-size: 16px;
            font-weight: 900;
            font-style: italic;
            letter-spacing: 1.5px;
          }

          /* Single continuous row strip */
          .startlist-single-strip {
            background: linear-gradient(90deg, ${darkTabColor} 0%, ${gradientStart} 40%, ${gradientMid} 100%);
            color: #ffffff;
            transform: skewX(-12deg);
            border-radius: 4px;
            border: 1px solid rgba(0, 136, 204, 0.6);
            display: flex;
            align-items: center;
            padding: 0 16px;
            height: 34px;
            overflow: hidden;
            margin-bottom: 2px;
          }

          .startlist-single-strip.strip-alt {
            background: linear-gradient(90deg, ${altRowColor} 0%, #00375c 40%, #004d80 100%);
          }

          /* Direct lane numbering */
          .strip-lane-num {
            background: transparent;
            color: #ffffff;
            font-size: 18px;
            font-weight: 900;
            font-style: italic;
            width: 25px;
            text-align: center;
          }

          .strip-flag-container {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 14px;
          }

          /* Balanced 80px x 22px country flag image */
          .strip-flag-img {
            width: 80px;
            height: 22px;
            object-fit: cover;
            border-radius: 3px;
            border: 1.5px solid rgba(255,255,255,0.6);
            transform: skewX(12deg);
            display: block;
          }

          .strip-athlete-name {
            font-size: 17px;
            font-weight: 900;
            font-style: italic;
            letter-spacing: 1px;
            text-transform: uppercase;
            color: #ffffff;
            white-space: nowrap;
          }

          .strip-status-badge {
            background: #ffffff;
            color: #00223e;
            font-size: 15px;
            font-weight: 900;
            font-style: italic;
            padding: 2px 12px;
            border-radius: 3px;
            margin-left: auto;
            margin-right: 8px;
            border: 1px solid ${borderHighlight};
            display: inline-block;
          }

          .unskew {
            transform: skewX(12deg);
          }
        </style>
      </head>
      <body>
        <div class="startlist-container">
          <div class="startlist-header">
            <div class="startlist-header-title">
              <span>🏊</span>
              <span>${eventTitleTextVal}</span>
            </div>
            <svg class="startlist-rings" viewBox="0 0 100 45" width="52" height="24">
              <circle cx="15" cy="16" r="11"/>
              <circle cx="38" cy="16" r="11"/>
              <circle cx="61" cy="16" r="11"/>
              <circle cx="84" cy="16" r="11"/>
              <circle cx="26.5" cy="27" r="11"/>
              <circle cx="49.5" cy="27" r="11"/>
              <circle cx="72.5" cy="27" r="11"/>
            </svg>
          </div>
          <div class="startlist-sub-bar">
            <div class="startlist-sub-title">${phaseTitleTextVal}</div>
          </div>
          ${athletesList.slice(0, 8).map((ath, idx) => {
      if (!ath.lane && !ath.name && !ath.noc) return '';
      const flagUrl = getFlagBase64(ath.noc);
      return `
              <div class="startlist-single-strip ${idx % 2 === 1 ? 'strip-alt' : ''}">
                <div class="strip-lane-num"><span class="unskew">${ath.lane}</span></div>
                <div class="strip-flag-container">
                  ${flagUrl ? `<img src="${flagUrl}" class="strip-flag-img" />` : ''}
                </div>
                <div class="strip-athlete-name"><span class="unskew">${ath.name}</span></div>
                ${ath.status ? `<div class="strip-status-badge"><span class="unskew">${ath.status.toUpperCase()}</span></div>` : ''}
              </div>
            `;
    }).join('')}
        </div>
      </body>
      </html>
    `;
  }

  // ── SW004 / Event ID Layout ──
  else if (normId.includes('SW004') || normId.includes('SW103') || normId.includes('EVENT ID')) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .event-id-container {
            position: absolute;
            bottom: 220px;
            left: 240px;
            width: 890px;
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

          .event-picto-icon {
            position: absolute;
            left: 36px;
            bottom: 4px;
            color: #ffffff;
            font-size: 42px;
            line-height: 1;
            z-index: 2;
          }

          .event-header-title {
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

          .event-rings {
            position: absolute;
            right: 35px;
            top: 14px;
            fill: none;
            stroke: #ffffff;
            stroke-width: 3.2;
            z-index: 2;
          }

          .event-sub-bar {
            background: linear-gradient(90deg, #d1d5db 0%, #ffffff 50%, #e2e8f0 100%);
            color: #00223e;
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
        <div class="event-id-container">
          <div class="event-gun-header">
            <div class="event-gun-body"></div>
            <div class="event-picto-icon">🏊</div>
            <div class="event-header-title">${sportTitle}</div>
            <svg class="event-rings" viewBox="0 0 100 45" width="56" height="26">
              <circle cx="15" cy="16" r="11"/>
              <circle cx="38" cy="16" r="11"/>
              <circle cx="61" cy="16" r="11"/>
              <circle cx="84" cy="16" r="11"/>
              <circle cx="26.5" cy="27" r="11"/>
              <circle cx="49.5" cy="27" r="11"/>
              <circle cx="72.5" cy="27" r="11"/>
            </svg>
          </div>
          <div class="event-sub-bar">
            <div class="event-sub-title">${customData.event || "WOMEN'S 200M BUTTERFLY"}</div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ── SW020 / Race Clock ──
  else if (normId.includes('SW020') || normId.includes('SW125') || normId.includes('RACE CLOCK')) {
    const timeVal = customData.time || '15.4';
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }
          .clock-box {
            position: absolute; right: 280px; bottom: 80px;
            display: flex; align-items: center; gap: 0;
            filter: drop-shadow(0 10px 20px rgba(0,0,0,0.8));
          }
          .clock-time-body {
            background: linear-gradient(180deg, #f3f4f6 0%, #d1d5db 100%);
            color: #00192e; font-size: 26px; font-weight: 900; font-style: italic;
            padding: 6px 20px; transform: skewX(-12deg); border-radius: 5px 0 0 5px;
            border: 1.5px solid #0088cc; border-right: none; min-width: 150px; text-align: center;
          }
          .clock-time-text { transform: skewX(12deg); }
          .clock-rings-body {
            background: #00192e; padding: 6px 16px; transform: skewX(-12deg);
            border-radius: 0 5px 5px 0; border: 1.5px solid #0088cc; border-left: none;
            display: flex; align-items: center; justify-content: center;
          }
          .clock-rings-svg { transform: skewX(12deg); fill: none; stroke: #ffffff; stroke-width: 2.5; }
        </style>
      </head>
      <body>
        <div class="clock-box">
          <div class="clock-time-body"><span class="clock-time-text">${timeVal}</span></div>
          <div class="clock-rings-body">
            <svg class="clock-rings-svg" viewBox="0 0 100 45" width="48" height="22">
              <circle cx="15" cy="16" r="11"/><circle cx="38" cy="16" r="11"/>
              <circle cx="61" cy="16" r="11"/><circle cx="84" cy="16" r="11"/>
              <circle cx="26.5" cy="27" r="11"/><circle cx="49.5" cy="27" r="11"/>
              <circle cx="72.5" cy="27" r="11"/>
            </svg>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ── SW021 / Race Clock before Split Point ──
  else if (normId.includes('SW021') || normId.includes('SW128') || normId.includes('BEFORE SPLIT')) {
    const splitRecord = (customData.splitRecord || 'WR').toUpperCase();
    const splitTime = customData.splitTime || '22.44';
    const distanceVal = (customData.distance || '50M').toUpperCase();
    const clockTime = customData.time || '19.4';
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }
          .left-split-badge {
            position: absolute; left: 280px; bottom: 80px;
            background: #00192e; color: #ffffff; transform: skewX(-12deg);
            border-radius: 5px; border: 1.5px solid #0088cc;
            display: flex; align-items: center; gap: 12px; padding: 6px 16px;
            filter: drop-shadow(0 10px 20px rgba(0,0,0,0.8));
          }
          .split-badge-tag {
            background: ${splitRecord === 'WR' ? '#eab308' : '#e2e8f0'};
            color: #00192e; font-size: 15px; font-weight: 900; font-style: italic;
            padding: 2px 8px; border-radius: 3px;
          }
          .split-badge-content { transform: skewX(12deg); display: flex; align-items: center; gap: 10px; }
          .split-label { font-size: 18px; font-weight: 900; font-style: italic; letter-spacing: 1px; }
          .split-val { font-size: 18px; font-weight: 900; font-style: italic; color: #e2e8f0; }

          .right-clock-group {
            position: absolute; right: 280px; bottom: 80px;
            display: flex; flex-direction: column; align-items: flex-end; gap: 4px;
            filter: drop-shadow(0 10px 20px rgba(0,0,0,0.8));
          }
          .dist-tab {
            background: #e2e8f0; color: #00192e; font-size: 14px; font-weight: 900; font-style: italic;
            padding: 3px 14px; transform: skewX(-12deg); border-radius: 3px; margin-right: 60px;
          }
          .dist-tab-text { transform: skewX(12deg); }
          .clock-box { display: flex; align-items: center; }
          .clock-time-body {
            background: linear-gradient(180deg, #f3f4f6 0%, #d1d5db 100%);
            color: #00192e; font-size: 26px; font-weight: 900; font-style: italic;
            padding: 6px 20px; transform: skewX(-12deg); border-radius: 5px 0 0 5px;
            border: 1.5px solid #0088cc; border-right: none; min-width: 140px; text-align: center;
          }
          .clock-time-text { transform: skewX(12deg); }
          .clock-rings-body {
            background: #00192e; padding: 6px 16px; transform: skewX(-12deg);
            border-radius: 0 5px 5px 0; border: 1.5px solid #0088cc; border-left: none;
            display: flex; align-items: center; justify-content: center;
          }
          .clock-rings-svg { transform: skewX(12deg); fill: none; stroke: #ffffff; stroke-width: 2.5; }
        </style>
      </head>
      <body>
        <div class="left-split-badge">
          <div class="split-badge-content">
            <div class="split-badge-tag">${splitRecord}</div>
            <div class="split-label">SPLIT</div>
            <div class="split-val">${splitTime}</div>
          </div>
        </div>
        <div class="right-clock-group">
          <div class="dist-tab"><span class="dist-tab-text">${distanceVal}</span></div>
          <div class="clock-box">
            <div class="clock-time-body"><span class="clock-time-text">${clockTime}</span></div>
            <div class="clock-rings-body">
              <svg class="clock-rings-svg" viewBox="0 0 100 45" width="48" height="22">
                <circle cx="15" cy="16" r="11"/><circle cx="38" cy="16" r="11"/>
                <circle cx="61" cy="16" r="11"/><circle cx="84" cy="16" r="11"/>
                <circle cx="26.5" cy="27" r="11"/><circle cx="49.5" cy="27" r="11"/>
                <circle cx="72.5" cy="27" r="11"/>
              </svg>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ── SW022 / Race Clock at Split Point with Standings ──
  else if (normId.includes('SW022') || normId.includes('SW129') || normId.includes('SPLIT POINT WITH STANDINGS')) {
    const isB = normId.endsWith('B') || normId.includes('SW022B') || normId.includes('SW129B');
    const isC = normId.endsWith('C') || normId.includes('SW022C') || normId.includes('SW129C');
    const isD = normId.endsWith('D') || normId.includes('SW022D') || normId.includes('SW129D');
    const isE = normId.endsWith('E') || normId.includes('SW022E') || normId.includes('SW129E');
    const isA = !isB && !isC && !isD && !isE;

    const defaultStandingsA = [{ lane: '4', noc: 'AUS', name: 'SULLIVAN', gap: '' }];
    const defaultStandingsB = [{ lane: '3', noc: 'KOR', name: 'PARK', gap: '' }];
    const defaultStandingsC = [{ lane: '6', noc: 'TUN', name: 'MELLOULI', gap: '' }];
    const defaultStandingsD = [
      { lane: '6', noc: 'TUN', name: 'MELLOULI', gap: '' },
      { lane: '2', noc: 'CHN', name: 'SUN', gap: '+1.36' }
    ];
    const defaultStandingsE = [
      { lane: '6', noc: 'TUN', name: 'MELLOULI', gap: '' },
      { lane: '2', noc: 'CHN', name: 'SUN', gap: '+1.36' },
      { lane: '4', noc: 'POL', name: 'SAWRYMOWICZ', gap: '+4.95' }
    ];

    const standings = customData.standings || customData.athletes || (
      isE ? defaultStandingsE : isD ? defaultStandingsD : isC ? defaultStandingsC : isB ? defaultStandingsB : defaultStandingsA
    );

    const splitRecord = (customData.splitRecord || 'WR').toUpperCase();
    const splitTime = customData.splitTime || (isE || isD || isC ? '13:37.89' : isB ? '2:45.43' : '22.48');
    const diffTime = customData.diffTime || (isE || isD || isC ? '+12.74' : isB ? '0.00' : '-0.01');
    const distanceVal = (customData.distance || (isE || isD || isC ? '1400M' : isB ? '300M' : '50M')).toUpperCase();
    const clockTime = customData.time || (isE || isD || isC ? '13:50.63' : isB ? '2:45.43' : '22.47');

    const maxRows = isE ? 3 : isD ? 2 : 1;
    const sliceStandings = standings.slice(0, maxRows);
    const diffBgColor = (isA && diffTime.startsWith('-')) ? '#16a34a' : '#0284c7';

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .top-standings-container {
            position: absolute; left: 350px; top: 60px;
            display: flex; flex-direction: column; gap: 4px;
            filter: drop-shadow(0 10px 20px rgba(0,0,0,0.8)); min-width: 420px;
          }
          .top-standings-row {
            background: #00192e; color: #ffffff; transform: skewX(-12deg);
            border-radius: 5px; border: 1.5px solid #0088cc;
            display: flex; align-items: center; justify-content: space-between;
            padding: 5px 16px; height: 34px;
          }
          .top-row-left { transform: skewX(12deg); display: flex; align-items: center; gap: 12px; }
          .top-lane { font-size: 20px; font-weight: 900; font-style: italic; min-width: 20px; }
          .top-flag-img { width: 65px; height: 20px; object-fit: cover; border-radius: 3px; border: 1px solid rgba(255,255,255,0.6); }
          .top-name { font-size: 19px; font-weight: 900; font-style: italic; letter-spacing: 1px; }
          .top-gap { transform: skewX(12deg); font-size: 18px; font-weight: 900; font-style: italic; color: #ffffff; }

          .left-split-group {
            position: absolute; left: 280px; bottom: 80px;
            display: flex; align-items: center; gap: 4px;
            filter: drop-shadow(0 10px 20px rgba(0,0,0,0.8));
          }
          .left-split-badge {
            background: #00192e; color: #ffffff; transform: skewX(-12deg);
            border-radius: 5px; border: 1.5px solid #0088cc;
            display: flex; align-items: center; gap: 12px; padding: 6px 16px;
          }
          .split-badge-tag {
            background: ${splitRecord === 'WR' ? '#eab308' : '#e2e8f0'};
            color: #00192e; font-size: 15px; font-weight: 900; font-style: italic;
            padding: 2px 8px; border-radius: 3px;
          }
          .split-badge-content { transform: skewX(12deg); display: flex; align-items: center; gap: 10px; }
          .split-label { font-size: 18px; font-weight: 900; font-style: italic; }
          .split-val { font-size: 18px; font-weight: 900; font-style: italic; color: #e2e8f0; }
          .diff-badge {
            background: ${diffBgColor};
            color: #ffffff; font-size: 18px; font-weight: 900; font-style: italic;
            padding: 6px 14px; transform: skewX(-12deg); border-radius: 4px;
          }
          .diff-text { transform: skewX(12deg); }

          .right-clock-group {
            position: absolute; right: 280px; bottom: 80px;
            display: flex; flex-direction: column; align-items: flex-end; gap: 4px;
            filter: drop-shadow(0 10px 20px rgba(0,0,0,0.8));
          }
          .dist-tab {
            background: #e2e8f0; color: #00192e; font-size: 14px; font-weight: 900; font-style: italic;
            padding: 3px 14px; transform: skewX(-12deg); border-radius: 3px; margin-right: 60px;
          }
          .dist-tab-text { transform: skewX(12deg); }
          .clock-box { display: flex; align-items: center; }
          .clock-time-body {
            background: linear-gradient(180deg, #f3f4f6 0%, #d1d5db 100%);
            color: #00192e; font-size: 26px; font-weight: 900; font-style: italic;
            padding: 6px 20px; transform: skewX(-12deg); border-radius: 5px 0 0 5px;
            border: 1.5px solid #0088cc; border-right: none; min-width: 140px; text-align: center;
          }
          .clock-time-text { transform: skewX(12deg); }
          .clock-rings-body {
            background: #00192e; padding: 6px 16px; transform: skewX(-12deg);
            border-radius: 0 5px 5px 0; border: 1.5px solid #0088cc; border-left: none;
            display: flex; align-items: center; justify-content: center;
          }
          .clock-rings-svg { transform: skewX(12deg); fill: none; stroke: #ffffff; stroke-width: 2.5; }
        </style>
      </head>
      <body>
        <div class="top-standings-container">
          ${sliceStandings.map(s => {
      const fUrl = getFlagBase64(s.noc);
      return `
              <div class="top-standings-row">
                <div class="top-row-left">
                  <div class="top-lane">${s.lane || ''}</div>
                  ${fUrl ? `<img class="top-flag-img" src="${fUrl}" alt="${s.noc || ''}" />` : ''}
                  <div class="top-name">${(s.name || '').toUpperCase()}</div>
                </div>
                ${s.gap ? `<div class="top-gap">${s.gap}</div>` : ''}
              </div>
            `;
    }).join('')}
        </div>
        <div class="left-split-group">
          <div class="left-split-badge">
            <div class="split-badge-content">
              <div class="split-badge-tag">${splitRecord}</div>
              <div class="split-label">SPLIT</div>
              <div class="split-val">${splitTime}</div>
            </div>
          </div>
          <div class="diff-badge"><span class="diff-text">${diffTime}</span></div>
        </div>
        <div class="right-clock-group">
          <div class="dist-tab"><span class="dist-tab-text">${distanceVal}</span></div>
          <div class="clock-box">
            <div class="clock-time-body"><span class="clock-time-text">${clockTime}</span></div>
            <div class="clock-rings-body">
              <svg class="clock-rings-svg" viewBox="0 0 100 45" width="48" height="22">
                <circle cx="15" cy="16" r="11"/><circle cx="38" cy="16" r="11"/>
                <circle cx="61" cy="16" r="11"/><circle cx="84" cy="16" r="11"/>
                <circle cx="26.5" cy="27" r="11"/><circle cx="49.5" cy="27" r="11"/>
                <circle cx="72.5" cy="27" r="11"/>
              </svg>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ── SW023 / Race Clock before Finish & SW024 / Race Clock at Finish ──
  else if (normId.includes('SW023') || normId.includes('SW024') || normId.includes('SW130') || normId.includes('FINISH')) {
    const wrTime = customData.wrTime || (normId.includes('SW024') ? '3:40.08' : '47.24');
    const orTime = customData.orTime || (normId.includes('SW024') ? '3:40.59' : '47.27');
    const clockTime = customData.time || (normId.includes('SW024') ? '3:41.60' : '47.1');
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .left-records-stack {
            position: absolute; left: 280px; bottom: 80px;
            display: flex; flex-direction: column; gap: 4px;
            filter: drop-shadow(0 10px 20px rgba(0,0,0,0.8));
          }
          .record-row {
            background: #00192e; color: #ffffff; transform: skewX(-12deg);
            border-radius: 4px; border: 1px solid #0088cc;
            display: flex; align-items: center; gap: 10px; padding: 4px 12px; width: 190px; justify-content: space-between;
          }
          .record-row-content { transform: skewX(12deg); display: flex; align-items: center; gap: 10px; width: 100%; justify-content: space-between; }
          .rec-tag-wr { background: #eab308; color: #00192e; font-size: 13px; font-weight: 900; font-style: italic; padding: 2px 6px; border-radius: 2px; }
          .rec-tag-or { background: #e2e8f0; color: #00192e; font-size: 13px; font-weight: 900; font-style: italic; padding: 2px 6px; border-radius: 2px; }
          .rec-val { font-size: 17px; font-weight: 900; font-style: italic; }

          .right-clock-group {
            position: absolute; right: 280px; bottom: 80px;
            display: flex; align-items: center; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.8));
          }
          .clock-time-body {
            background: linear-gradient(180deg, #f3f4f6 0%, #d1d5db 100%);
            color: #00192e; font-size: 26px; font-weight: 900; font-style: italic;
            padding: 6px 20px; transform: skewX(-12deg); border-radius: 5px 0 0 5px;
            border: 1.5px solid #0088cc; border-right: none; min-width: 140px; text-align: center;
          }
          .clock-time-text { transform: skewX(12deg); }
          .clock-rings-body {
            background: #00192e; padding: 6px 16px; transform: skewX(-12deg);
            border-radius: 0 5px 5px 0; border: 1.5px solid #0088cc; border-left: none;
            display: flex; align-items: center; justify-content: center;
          }
          .clock-rings-svg { transform: skewX(12deg); fill: none; stroke: #ffffff; stroke-width: 2.5; }
        </style>
      </head>
      <body>
        <div class="left-records-stack">
          <div class="record-row">
            <div class="record-row-content">
              <div class="rec-tag-wr">WR</div>
              <div class="rec-val">${wrTime}</div>
            </div>
          </div>
          <div class="record-row">
            <div class="record-row-content">
              <div class="rec-tag-or">OR</div>
              <div class="rec-val">${orTime}</div>
            </div>
          </div>
        </div>
        <div class="right-clock-group">
          <div class="clock-time-body"><span class="clock-time-text">${clockTime}</span></div>
          <div class="clock-rings-body">
            <svg class="clock-rings-svg" viewBox="0 0 100 45" width="48" height="22">
              <circle cx="15" cy="16" r="11"/><circle cx="38" cy="16" r="11"/>
              <circle cx="61" cy="16" r="11"/><circle cx="84" cy="16" r="11"/>
              <circle cx="26.5" cy="27" r="11"/><circle cx="49.5" cy="27" r="11"/>
              <circle cx="72.5" cy="27" r="11"/>
            </svg>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ── SW103 / Weather ──
  else if (normId.includes('SW103') || normId.includes('WEATHER')) {
    const airTemp = customData.airTemp || '21°C';
    const waterTemp = customData.waterTemp || '28°C';
    const humidity = customData.humidity || '83%';
    const windDir = (customData.windDir || 'EAST SOUTH EAST').toUpperCase();
    const windSpeed = customData.windSpeed || '5KM/H';
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .weather-container {
            position: absolute; left: 240px; bottom: 80px;
            display: flex; flex-direction: column; gap: 0;
            filter: drop-shadow(0 15px 30px rgba(0,0,0,0.8));
          }
          .weather-gun-header {
            position: relative; width: 890px; height: 55px;
            display: flex; align-items: center; justify-content: space-between;
            padding: 0 45px 0 35px; color: #ffffff;
          }
          .weather-gun-body {
            position: absolute; inset: 0;
            background: linear-gradient(90deg, ${gradientStart} 0%, ${gradientMid} 45%, ${gradientEnd} 100%);
            clip-path: polygon(45px 0, 100% 0, calc(100% - 18px) 54px, 140px 54px, 115px 95px, 0 95px, 20px 42px);
            border: 2px solid ${borderHighlight}; border-radius: 6px; z-index: -1;
          }
          .weather-picto-icon { font-size: 38px; transform: rotate(-5deg); margin-left: 20px; }
          .weather-header-title { font-size: 30px; font-weight: 900; font-style: italic; letter-spacing: 3px; }
          .weather-rings { fill: none; stroke: #ffffff; stroke-width: 3.2; }

          .weather-sub-bar {
            background: linear-gradient(90deg, #d1d5db 0%, #ffffff 50%, #e2e8f0 100%);
            color: #00223e; height: 34px; padding: 0 24px;
            margin-left: 110px; margin-top: -38px; width: 778px;
            clip-path: polygon(28px 0, 100% 0, calc(100% - 12px) 100%, 0 100%);
            border: 1.2px solid rgba(0,34,62,0.5);
            display: flex; align-items: center; position: relative; z-index: 1;
          }
          .weather-sub-title { font-size: 20px; font-weight: 900; font-style: italic; letter-spacing: 1px; }

          .weather-rows-stack {
            margin-left: 0; margin-top: 4px; width: 890px;
            display: flex; flex-direction: column; gap: 4px;
          }
          .weather-row {
            background: ${darkTabColor}; color: #ffffff;
            clip-path: polygon(24px 0, 100% 0, 100% 100%, 0 100%);
            border: 1px solid rgba(0, 136, 204, 0.6);
            display: flex; align-items: center; justify-content: space-between;
            padding: 0 20px 0 34px; height: 34px;
          }
          .weather-row.row-alt { background: ${altRowColor}; }
          .weather-row-left {
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .weather-row-icon {
            font-size: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 24px;
          }
          .weather-label { font-size: 16px; font-weight: 900; font-style: italic; }
          .weather-val { font-size: 16px; font-weight: 900; font-style: italic; color: #e2e8f0; }
        </style>
      </head>
      <body>
        <div class="weather-container">
          <div class="weather-gun-header">
            <div class="weather-gun-body"></div>
            <div class="weather-picto-icon">🌧️</div>
            <div class="weather-header-title">${sportTitle}</div>
            <svg class="weather-rings" viewBox="0 0 100 45" width="56" height="26">
              <circle cx="15" cy="16" r="11"/>
              <circle cx="38" cy="16" r="11"/>
              <circle cx="61" cy="16" r="11"/>
              <circle cx="84" cy="16" r="11"/>
              <circle cx="26.5" cy="27" r="11"/>
              <circle cx="49.5" cy="27" r="11"/>
              <circle cx="72.5" cy="27" r="11"/>
            </svg>
          </div>
          <div class="weather-sub-bar">
            <div class="weather-sub-title">WEATHER</div>
          </div>
          <div class="weather-rows-stack">
            <div class="weather-row">
              <div class="weather-row-left">
                <span class="weather-row-icon">🌡️</span>
                <span class="weather-label">AIR TEMPERATURE</span>
              </div>
              <div class="weather-val">${airTemp}</div>
            </div>
            <div class="weather-row row-alt">
              <div class="weather-row-left">
                <span class="weather-row-icon">🌊</span>
                <span class="weather-label">WATER TEMPERATURE</span>
              </div>
              <div class="weather-val">${waterTemp}</div>
            </div>
            <div class="weather-row">
              <div class="weather-row-left">
                <span class="weather-row-icon">💦</span>
                <span class="weather-label">HUMIDITY</span>
              </div>
              <div class="weather-val">${humidity}</div>
            </div>
            <div class="weather-row row-alt">
              <div class="weather-row-left">
                <span class="weather-row-icon">🧭</span>
                <span class="weather-label">WIND DIRECTION</span>
              </div>
              <div class="weather-val">${windDir}</div>
            </div>
            <div class="weather-row">
              <div class="weather-row-left">
                <span class="weather-row-icon">🌬️</span>
                <span class="weather-label">WIND SPEED</span>
              </div>
              <div class="weather-val">${windSpeed}</div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ── SW106 / Athlete ID (Open Water) ──
  else if (normId.includes('SW106') || normId.includes('ATHLETE ID')) {
    const athNum = customData.num || customData.lane || '17';
    const nocCode = (customData.noc || 'NED').toUpperCase();
    const flagUrl = getFlagBase64(nocCode);
    const nameVal = (customData.name || customData.team || 'MAARTEN VAN DER WEIJDEN').toUpperCase();
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .athlete-id-container {
            position: absolute; left: 280px; bottom: 80px; width: 780px;
            filter: drop-shadow(0 15px 30px rgba(0,0,0,0.8));
          }
          .athlete-id-bar {
            background: linear-gradient(90deg, ${gradientStart} 0%, ${gradientMid} 45%, ${gradientEnd} 100%);
            color: #ffffff; padding: 10px 24px; transform: skewX(-12deg);
            border-radius: 6px; border: 1.5px solid ${borderHighlight};
            display: flex; align-items: center; justify-content: space-between;
          }
          .athlete-id-left { transform: skewX(12deg); display: flex; align-items: center; gap: 14px; }
          .athlete-flag-img { width: 70px; height: 22px; object-fit: cover; border-radius: 3px; border: 1.5px solid rgba(255,255,255,0.6); }
          .athlete-num { font-size: 22px; font-weight: 900; font-style: italic; }
          .athlete-name { font-size: 22px; font-weight: 900; font-style: italic; letter-spacing: 1px; }
          .athlete-rings { transform: skewX(12deg); fill: none; stroke: #ffffff; stroke-width: 3; }
        </style>
      </head>
      <body>
        <div class="athlete-id-container">
          <div class="athlete-id-bar">
            <div class="athlete-id-left">
              ${flagUrl ? `<img class="athlete-flag-img" src="${flagUrl}" alt="${nocCode}" />` : ''}
              <div class="athlete-num">${athNum}</div>
              <div class="athlete-name">${nameVal}</div>
            </div>
            <svg class="athlete-rings" viewBox="0 0 100 45" width="52" height="24">
              <circle cx="15" cy="16" r="11"/><circle cx="38" cy="16" r="11"/>
              <circle cx="61" cy="16" r="11"/><circle cx="84" cy="16" r="11"/>
              <circle cx="26.5" cy="27" r="11"/><circle cx="49.5" cy="27" r="11"/>
              <circle cx="72.5" cy="27" r="11"/>
            </svg>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ── SW107 / Position on Screen ──
  else if (normId.includes('SW107') || normId.includes('POSITION ON SCREEN')) {
    const defaultAthletes = [
      { noc: 'UKR', num: '4', name: 'I. CHERVYNSKIY' },
      { noc: 'USA', num: '18', name: 'M. WARKENTIN' }
    ];

    const athletes = customData.athletes || customData.members || (
      (customData.name || customData.noc || customData.num)
        ? [{ noc: customData.noc || 'UKR', num: customData.num || customData.bib || customData.lane || '4', name: customData.name || 'I. CHERVYNSKIY' }]
        : defaultAthletes
    );

    const sliceAthletes = athletes.slice(0, 2);
    const posX = customData.posX || '280px';
    const posY = customData.posY || '960px';

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .pos-screen-container {
            position: absolute; left: ${posX}; top: ${posY};
            display: flex; flex-direction: row; gap: 40px; align-items: center;
            filter: drop-shadow(0 10px 20px rgba(0,0,0,0.8));
          }
          .pos-screen-bug {
            background: #00192e; color: #ffffff; transform: skewX(-12deg);
            border-radius: 4px; border: 1.5px solid #0088cc;
            display: flex; align-items: center; gap: 10px; padding: 5px 16px;
            min-width: 390px; height: 34px;
          }
          .pos-content { transform: skewX(12deg); display: flex; align-items: center; gap: 10px; }
          .pos-flag-img { width: 55px; height: 18px; object-fit: cover; border-radius: 2px; border: 1px solid rgba(255,255,255,0.6); }
          .pos-bib { font-size: 18px; font-weight: 900; font-style: italic; color: #0088cc; margin-left: 4px; }
          .pos-name { font-size: 18px; font-weight: 900; font-style: italic; letter-spacing: 1px; }
        </style>
      </head>
      <body>
        <div class="pos-screen-container">
          ${sliceAthletes.map((a, idx) => {
      const nocCode = (a.noc || (idx === 0 ? 'UKR' : 'USA')).toUpperCase();
      const fUrl = getFlagBase64(nocCode);
      const bibNum = a.num || a.bib || a.lane || (idx === 0 ? '4' : '18');
      const nameVal = (a.name || (idx === 0 ? 'I. CHERVYNSKIY' : 'M. WARKENTIN')).toUpperCase();
      return `
              <div class="pos-screen-bug">
                <div class="pos-content">
                  ${fUrl ? `<img class="pos-flag-img" src="${fUrl}" alt="${nocCode}" />` : ''}
                  <div class="pos-bib">${bibNum}</div>
                  <div class="pos-name">${nameVal}</div>
                </div>
              </div>
            `;
    }).join('')}
        </div>
      </body>
      </html>
    `;
  }

  // ── SW003 / Event Schedule Layout ──
  else if (normId.includes('SW003') || normId.includes('SW104') || normId.includes('SCHEDULE')) {
    const defaultEvents = [
      "MEN'S 50M FREESTYLE - HEATS",
      "WOMEN'S 200M FREESTYLE - HEATS",
      "MEN'S 4x100M FREESTYLE RELAY - HEATS",
      "WOMEN'S 50M BUTTERFLY - SEMI-FINALS",
      "MEN'S 100M BREASTSTROKE - HEATS",
      "WOMEN'S 200M BUTTERFLY - SEMI-FINALS",
      "MEN'S 400M INDIVIDUAL MEDLEY - FINAL",
      "WOMEN'S 200M BUTTERFLY - HEATS"
    ];

    const eventsList = customData.events || defaultEvents;

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .schedule-container {
            position: absolute;
            top: 180px;
            left: 280px;
            width: 860px;
            display: flex;
            flex-direction: column;
            gap: 4px;
            filter: drop-shadow(0 15px 30px rgba(0,0,0,0.8));
          }

          .schedule-header {
            background: linear-gradient(90deg, ${gradientStart} 0%, ${gradientMid} 45%, ${gradientEnd} 100%);
            color: #ffffff;
            padding: 12px 24px;
            transform: skewX(-12deg);
            border-radius: 6px;
            border: 1.5px solid ${borderHighlight};
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .schedule-header-title {
            transform: skewX(12deg);
            font-size: 28px;
            font-weight: 900;
            font-style: italic;
            letter-spacing: 2px;
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .schedule-rings {
            transform: skewX(12deg);
            fill: none;
            stroke: #ffffff;
            stroke-width: 3.2;
          }

          .schedule-sub-bar {
            background: #e2e8f0;
            color: #00223e;
            padding: 6px 24px;
            transform: skewX(-12deg);
            border-radius: 4px;
            margin-bottom: 4px;
          }

          .schedule-sub-title {
            transform: skewX(12deg);
            font-size: 16px;
            font-weight: 900;
            font-style: italic;
            letter-spacing: 1.5px;
          }

          .schedule-row {
            background: ${darkTabColor};
            color: #ffffff;
            transform: skewX(-12deg);
            border-radius: 4px;
            border: 1px solid rgba(0, 136, 204, 0.6);
            display: flex;
            align-items: center;
            padding: 0 20px;
            height: 34px;
          }

          .schedule-row-text {
            transform: skewX(12deg);
            font-size: 17px;
            font-weight: 900;
            font-style: italic;
            letter-spacing: 1px;
            text-transform: uppercase;
          }
        </style>
      </head>
      <body>
        <div class="schedule-container">
          <div class="schedule-header">
            <div class="schedule-header-title">
              <span>🏊</span>
              <span>${sportTitle}</span>
            </div>
            <svg class="schedule-rings" viewBox="0 0 100 45" width="52" height="24">
              <circle cx="15" cy="16" r="11"/>
              <circle cx="38" cy="16" r="11"/>
              <circle cx="61" cy="16" r="11"/>
              <circle cx="84" cy="16" r="11"/>
              <circle cx="26.5" cy="27" r="11"/>
              <circle cx="49.5" cy="27" r="11"/>
              <circle cx="72.5" cy="27" r="11"/>
            </svg>
          </div>
          <div class="schedule-sub-bar">
            <div class="schedule-sub-title">${venueTitle}</div>
          </div>
          ${eventsList.slice(0, 8).map(ev => `
            <div class="schedule-row">
              <div class="schedule-row-text">${ev}</div>
            </div>
          `).join('')}
        </div>
      </body>
      </html>
    `;
  }

  // ── SW120 / Ceremony ID ──
  else if (normId.includes('SW120') || normId.includes('CEREMONY ID')) {
    const titleVal = (customData.title || 'VICTORY CEREMONY').toUpperCase();
    const eventVal = (customData.event || "MEN'S MARATHON 10KM").toUpperCase();
    const posX = customData.posX || '280px', posY = customData.posY || '880px';
    return `
      <!DOCTYPE html><html><head><meta charset="utf-8">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,800;1,900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { width: 1920px; height: 1080px; overflow: hidden; font-family: ${font}; }
        .cer-container { position: absolute; left: ${posX}; top: ${posY}; filter: drop-shadow(0 15px 30px rgba(0,0,0,0.8)); }
        .cer-bar { width: 700px; height: 42px; background: linear-gradient(90deg, ${gradientStart}, ${gradientEnd}); color: #fff; transform: skewX(-12deg); border-radius: 5px; border: 1.5px solid ${borderHighlight}; display: flex; align-items: center; padding: 0 20px; }
        .cer-title { transform: skewX(12deg); font-size: 22px; font-weight: 900; font-style: italic; }
        .cer-sub { width: 660px; height: 26px; background: #fff; transform: skewX(-12deg); margin-top: 3px; border-radius: 4px; display: flex; align-items: center; padding: 0 20px; }
        .cer-sub-text { transform: skewX(12deg); font-size: 16px; font-weight: 900; font-style: italic; color: #00192e; }
      </style></head><body>
        <div class="cer-container">
          <div class="cer-bar"><div class="cer-title">${titleVal}</div></div>
          <div class="cer-sub"><div class="cer-sub-text">${eventVal}</div></div>
        </div>
      </body></html>
    `;
  }

  // ── SW121 / Medal ID ──
  else if (normId.includes('SW121') || normId.includes('MEDAL ID')) {
    const nocCode = (customData.noc || 'NED').toUpperCase();
    const flagUrl = getFlagBase64(nocCode);
    const nameVal = (customData.name || 'MAARTEN VAN DER WEIJDEN').toUpperCase();
    const medalVal = (customData.medal || 'GOLD MEDALLIST').toUpperCase();
    const posX = customData.posX || '280px', posY = customData.posY || '940px';
    return `
      <!DOCTYPE html><html><head><meta charset="utf-8">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,800;1,900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { width: 1920px; height: 1080px; overflow: hidden; font-family: ${font}; }
        .m-container { position: absolute; left: ${posX}; top: ${posY}; filter: drop-shadow(0 15px 30px rgba(0,0,0,0.8)); }
        .m-bar { width: 540px; height: 42px; background: linear-gradient(90deg, ${gradientStart}, ${gradientEnd}); color: #fff; transform: skewX(-12deg); border-radius: 5px; border: 1.5px solid ${borderHighlight}; display: flex; align-items: center; padding: 0 16px; }
        .m-content { transform: skewX(12deg); display: flex; align-items: center; gap: 14px; width: 100%; }
        .m-noc { font-size: 18px; font-weight: 900; font-style: italic; }
        .m-flag { width: 60px; height: 20px; object-fit: cover; border: 1px solid rgba(255,255,255,0.6); }
        .m-name { font-size: 20px; font-weight: 900; font-style: italic; }
        .m-sub { width: 220px; height: 26px; background: #fff; transform: skewX(-12deg); margin-top: 3px; border-radius: 4px; display: flex; align-items: center; justify-content: center; }
        .m-sub-text { transform: skewX(12deg); font-size: 15px; font-weight: 900; font-style: italic; color: #00192e; }
      </style></head><body>
        <div class="m-container">
          <div class="m-bar"><div class="m-content">
            <div class="m-noc">${nocCode}</div>
            ${flagUrl ? `<img class="m-flag" src="${flagUrl}" />` : ''}
            <div class="m-name">${nameVal}</div>
          </div></div>
          <div class="m-sub"><div class="m-sub-text">${medalVal}</div></div>
        </div>
      </body></html>
    `;
  }

  // ── SW122 / Medals List ──
  else if (normId.includes('SW122') || normId.includes('MEDALS LIST')) {
    const eventVal = (customData.event || "MEN'S MARATHON 10KM").toUpperCase();
    const medals = customData.medals || [
      { noc: 'NED', name: 'M. VAN DER WEIJDEN', medal: 'GOLD' },
      { noc: 'GBR', name: 'DAVID DAVIES', medal: 'SILVER' },
      { noc: 'GER', name: 'THOMAS LURZ', medal: 'BRONZE' }
    ];
    return `
      <!DOCTYPE html><html><head><meta charset="utf-8">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,800;1,900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { width: 1920px; height: 1080px; overflow: hidden; font-family: ${font}; }
        .ml-container { position: absolute; left: 280px; top: 700px; filter: drop-shadow(0 15px 30px rgba(0,0,0,0.8)); }
        .ml-header { width: 700px; height: 42px; background: linear-gradient(90deg, ${gradientStart}, ${gradientEnd}); color: #fff; transform: skewX(-12deg); border-radius: 5px; border: 1.5px solid ${borderHighlight}; display: flex; align-items: center; padding: 0 20px; }
        .ml-title { transform: skewX(12deg); font-size: 22px; font-weight: 900; font-style: italic; }
        .ml-sub { width: 660px; height: 26px; background: #fff; transform: skewX(-12deg); margin-top: 3px; border-radius: 4px; display: flex; align-items: center; padding: 0 20px; margin-bottom: 15px; }
        .ml-sub-text { transform: skewX(12deg); font-size: 16px; font-weight: 900; font-style: italic; color: #00192e; }
        .ml-row { width: 700px; height: 40px; background: ${altRowColor}; transform: skewX(-12deg); border: 1px solid ${borderHighlight}; display: flex; align-items: center; padding: 0 20px; margin-top: 2px; color: #fff; }
        .ml-row-content { transform: skewX(12deg); display: flex; align-items: center; gap: 14px; width: 100%; font-size: 18px; font-weight: 900; font-style: italic; }
        .ml-row-medal { width: 24px; height: 24px; border-radius: 50%; border: 2px solid rgba(0,0,0,0.3); }
        .gold { background: radial-gradient(circle, #fceabb 0%, #f8b500 100%); }
        .silver { background: radial-gradient(circle, #e0e0e0 0%, #9e9e9e 100%); }
        .bronze { background: radial-gradient(circle, #f5d3b3 0%, #cc8855 100%); }
        .ml-flag { width: 60px; height: 20px; object-fit: cover; border: 1px solid rgba(255,255,255,0.6); }
      </style></head><body>
        <div class="ml-container">
          <div class="ml-header"><div class="ml-title">VICTORY CEREMONY</div></div>
          <div class="ml-sub"><div class="ml-sub-text">MEDALLISTS - ${eventVal}</div></div>
          ${medals.map(m => {
      const f = getFlagBase64(m.noc);
      const mClass = (m.medal || '').toLowerCase().includes('gold') ? 'gold' : (m.medal || '').toLowerCase().includes('silver') ? 'silver' : 'bronze';
      const flagTag = f ? '<img class="ml-flag" src="' + f + '" />' : '';
      return '<div class="ml-row"><div class="ml-row-content">' +
        '<div class="ml-row-medal ' + mClass + '"></div>' +
        '<div>' + m.noc + '</div>' +
        flagTag +
        '<div>' + m.name + '</div>' +
        '</div></div>';
    }).join('')}
        </div>
      </body></html>
    `;
  }

  // ── SW123 / Medal Presenter ID & SW124 / Flower Presenter ID ──
  else if (normId.includes('SW123') || normId.includes('SW124') || normId.includes('PRESENTER')) {
    const isFlower = normId.includes('SW124') || normId.includes('FLOWER');
    const roleVal = (customData.role || (isFlower ? 'FLOWERS PRESENTED BY' : 'MEDALS PRESENTED BY')).toUpperCase();
    const nameVal = (customData.name || 'JACQUES ROGGE').toUpperCase();
    const titleVal = (customData.title || 'IOC PRESIDENT').toUpperCase();
    return `
      <!DOCTYPE html><html><head><meta charset="utf-8">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,800;1,900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { width: 1920px; height: 1080px; overflow: hidden; font-family: ${font}; }
        .p-container { position: absolute; left: 280px; top: 840px; filter: drop-shadow(0 15px 30px rgba(0,0,0,0.8)); }
        .p-bar { width: 700px; height: 42px; background: linear-gradient(90deg, ${gradientStart}, ${gradientEnd}); color: #fff; transform: skewX(-12deg); border-radius: 5px; border: 1.5px solid ${borderHighlight}; display: flex; align-items: center; padding: 0 20px; }
        .p-title { transform: skewX(12deg); font-size: 20px; font-weight: 900; font-style: italic; }
        .p-sub { width: 660px; height: 26px; background: #fff; transform: skewX(-12deg); margin-top: 3px; border-radius: 4px; display: flex; align-items: center; padding: 0 20px; }
        .p-sub-text { transform: skewX(12deg); font-size: 15px; font-weight: 900; font-style: italic; color: #00192e; }
      </style></head><body>
        <div class="p-container">
          <div class="p-bar"><div class="p-title">${nameVal}</div></div>
          <div class="p-sub"><div class="p-sub-text">${roleVal} - ${titleVal}</div></div>
        </div>
      </body></html>
    `;
  }

  // ── SW125 to SW130 / Race Clocks ──
  else if (normId.match(/SW125|SW126|SW128|SW129|SW130|CLOCK/)) {
    const isFinish = normId.includes('SW130') || normId.includes('FINISH');
    const hasDelta = normId.includes('SW126') || normId.includes('DELTA');
    const hasStandings = normId.includes('SW129') || normId.includes('SW130');
    const clockVal = customData.clock || '1:45:23';
    const deltaVal = customData.delta || '+0:12';
    const startY = hasStandings ? '840px' : '940px';
    const rows = isFinish ? ['NED 1 M.VAN DER WEIJDEN', 'GBR 2 DAVID DAVIES'] : ['LEADER NED M.VAN DER WEIJDEN', 'CHASE GBR DAVID DAVIES'];

    return `
      <!DOCTYPE html><html><head><meta charset="utf-8">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,800;1,900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { width: 1920px; height: 1080px; overflow: hidden; font-family: ${font}; }
        .c-container { position: absolute; left: 280px; top: ${startY}; filter: drop-shadow(0 15px 30px rgba(0,0,0,0.8)); display: flex; flex-direction: column; gap: 8px; }
        .c-top { display: flex; gap: 10px; }
        .c-main { width: 180px; height: 42px; background: #000; color: #fff; transform: skewX(-12deg); border: 2px solid #fff; border-radius: 5px; display: flex; align-items: center; justify-content: center; }
        .c-main-t { transform: skewX(12deg); font-size: 24px; font-weight: 900; font-style: italic; }
        .c-delta { width: 120px; height: 42px; background: #00192e; color: #ffcc00; transform: skewX(-12deg); border: 1.5px solid ${borderHighlight}; display: flex; align-items: center; justify-content: center; }
        .c-delta-t { transform: skewX(12deg); font-size: 20px; font-weight: 900; font-style: italic; }
        .c-row { width: 500px; height: 35px; background: linear-gradient(90deg, ${gradientStart}, ${gradientEnd}); color: #fff; transform: skewX(-12deg); border: 1.5px solid ${borderHighlight}; display: flex; align-items: center; padding: 0 20px; margin-top: -4px; }
        .c-row-t { transform: skewX(12deg); font-size: 16px; font-weight: 900; font-style: italic; }
      </style></head><body>
        <div class="c-container">
          <div class="c-top">
            <div class="c-main"><div class="c-main-t">${clockVal}</div></div>
            ${hasDelta ? '<div class="c-delta"><div class="c-delta-t">' + deltaVal + '</div></div>' : ''}
          </div>
          ${hasStandings ? rows.map(r => '<div class="c-row"><div class="c-row-t">' + r + '</div></div>').join('') : ''}
        </div>
      </body></html>
    `;
  }

  // ── SW131 / Location ──
  else if (normId.includes('SW131') || normId.includes('LOCATION')) {
    const locVal = (customData.location || 'HYDE PARK').toUpperCase();
    return `
      <!DOCTYPE html><html><head><meta charset="utf-8">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,800;1,900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { width: 1920px; height: 1080px; overflow: hidden; font-family: ${font}; }
        .l-container { position: absolute; left: 280px; top: 840px; filter: drop-shadow(0 15px 30px rgba(0,0,0,0.8)); }
        .l-bar { width: 400px; height: 42px; background: linear-gradient(90deg, ${gradientStart}, ${gradientEnd}); color: #fff; transform: skewX(-12deg); border-radius: 5px; border: 1.5px solid ${borderHighlight}; display: flex; align-items: center; justify-content: center; }
        .l-title { transform: skewX(12deg); font-size: 20px; font-weight: 900; font-style: italic; }
      </style></head><body>
        <div class="l-container">
          <div class="l-bar"><div class="l-title">${locVal}</div></div>
        </div>
      </body></html>
    `;
  }

  return `<div>Unknown Swimming Template</div>`;
}
