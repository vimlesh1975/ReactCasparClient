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
      left: 240, top: 855,
      fill: gunGradient,
      stroke: borderHighlight,
      strokeWidth: 2,
      shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.7)', blur: 15, offsetX: 0, offsetY: 8 })
    }));

    const swimmerIcon = new fabric.Textbox('🏊', createProps('textbox', {
      left: 275, top: 886, fontSize: 42, fill: '#ffffff', width: 65, textAlign: 'center'
    }));

    const titleText = new fabric.Textbox(venueTitle, createProps('textbox', {
      left: 395, top: 864, fontSize: 30, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: 610, charSpacing: 90
    }));

    const c1 = new fabric.Circle(createProps('circle', { left: 1045, top: 870, radius: 9, fill: '', stroke: '#ffffff', strokeWidth: 2.2 }));
    const c2 = new fabric.Circle(createProps('circle', { left: 1061, top: 870, radius: 9, fill: '', stroke: '#ffffff', strokeWidth: 2.2 }));
    const c3 = new fabric.Circle(createProps('circle', { left: 1077, top: 870, radius: 9, fill: '', stroke: '#ffffff', strokeWidth: 2.2 }));
    const c4 = new fabric.Circle(createProps('circle', { left: 1053, top: 878, radius: 9, fill: '', stroke: '#ffffff', strokeWidth: 2.2 }));
    const c5 = new fabric.Circle(createProps('circle', { left: 1069, top: 878, radius: 9, fill: '', stroke: '#ffffff', strokeWidth: 2.2 }));

    objects.push(gunBody, swimmerIcon, titleText, c1, c2, c3, c4, c5);
  }

  // ── SW007 / Team List by Lane Layout (SW007a, SW007b, SW007c) ──
  else if (normId.includes('SW007') || normId.includes('SW107') || normId.includes('TEAM LIST BY LANE')) {
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
    const startY = 740;
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
      } catch (e) {}
    }

    const teamText = new fabric.Textbox(teamName, createProps('textbox', {
      left: startX + 200, top: startY + 8, fontSize: 22, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: 450
    }));
    objects.push(teamText);

    // Olympic Rings
    const c1 = new fabric.Circle(createProps('circle', { left: startX + 665, top: startY + 12, radius: 7.5, fill: '', stroke: '#ffffff', strokeWidth: 1.8 }));
    const c2 = new fabric.Circle(createProps('circle', { left: startX + 678, top: startY + 12, radius: 7.5, fill: '', stroke: '#ffffff', strokeWidth: 1.8 }));
    const c3 = new fabric.Circle(createProps('circle', { left: startX + 691, top: startY + 12, radius: 7.5, fill: '', stroke: '#ffffff', strokeWidth: 1.8 }));
    const c4 = new fabric.Circle(createProps('circle', { left: startX + 671.5, top: startY + 18.5, radius: 7.5, fill: '', stroke: '#ffffff', strokeWidth: 1.8 }));
    const c5 = new fabric.Circle(createProps('circle', { left: startX + 684.5, top: startY + 18.5, radius: 7.5, fill: '', stroke: '#ffffff', strokeWidth: 1.8 }));
    objects.push(c1, c2, c3, c4, c5);

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
    const startY = 740;
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

    const c1 = new fabric.Circle(createProps('circle', { left: startX + 665, top: startY + 12, radius: 7.5, fill: '', stroke: '#ffffff', strokeWidth: 1.8 }));
    const c2 = new fabric.Circle(createProps('circle', { left: startX + 678, top: startY + 12, radius: 7.5, fill: '', stroke: '#ffffff', strokeWidth: 1.8 }));
    const c3 = new fabric.Circle(createProps('circle', { left: startX + 691, top: startY + 12, radius: 7.5, fill: '', stroke: '#ffffff', strokeWidth: 1.8 }));
    const c4 = new fabric.Circle(createProps('circle', { left: startX + 671.5, top: startY + 18.5, radius: 7.5, fill: '', stroke: '#ffffff', strokeWidth: 1.8 }));
    const c5 = new fabric.Circle(createProps('circle', { left: startX + 684.5, top: startY + 18.5, radius: 7.5, fill: '', stroke: '#ffffff', strokeWidth: 1.8 }));

    // 2. Sub-Header Metallic Silver Bar (Event Title)
    const subBar = new fabric.Rect(createProps('rect', {
      left: startX + 15, top: startY + 44, width: barWidth - 30, height: 28,
      fill: '#e2e8f0', skewX: -12, rx: 3, ry: 3
    }));

    const subTitleText = new fabric.Textbox(eventTitleTextVal, createProps('textbox', {
      left: startX + 35, top: startY + 48, fontSize: 16, fontWeight: '900', fontStyle: 'italic',
      fill: '#00223e', width: 500, charSpacing: 60
    }));

    objects.push(headerBar, swimmerIcon, sportTitleText, c1, c2, c3, c4, c5, subBar, subTitleText);

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
        } catch (e) {}
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
      left: 280, top: 900, width: badgeWidth, height: badgeHeight,
      fill: badgeGradient, skewX: -12, rx: 5, ry: 5,
      stroke: '#00223e', strokeWidth: 1.5,
      shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.6)', blur: 10, offsetX: 0, offsetY: 4 })
    }));

    const bottomText = new fabric.Textbox(bottomLaneTextVal.toUpperCase(), createProps('textbox', {
      left: 280, top: 905, fontSize: 18, fontWeight: '900', fontStyle: 'italic',
      fill: '#00223e', width: badgeWidth, textAlign: 'center'
    }));

    objects.push(topBg, topText, bottomBg, bottomText);
  }

  // ── SW011 / Winner / Winners / Place ID Layout (SW011a, SW011b, SW011c) ──
  else if (normId.includes('SW011') || normId.includes('SW111') || normId.includes('WINNER') || normId.includes('PLACE ID')) {
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
    const startY = winnersList.length > 1 ? 780 : 820;
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

    const c1 = new fabric.Circle(createProps('circle', { left: startX + 665, top: startY + 12, radius: 7.5, fill: '', stroke: '#ffffff', strokeWidth: 1.8 }));
    const c2 = new fabric.Circle(createProps('circle', { left: startX + 678, top: startY + 12, radius: 7.5, fill: '', stroke: '#ffffff', strokeWidth: 1.8 }));
    const c3 = new fabric.Circle(createProps('circle', { left: startX + 691, top: startY + 12, radius: 7.5, fill: '', stroke: '#ffffff', strokeWidth: 1.8 }));
    const c4 = new fabric.Circle(createProps('circle', { left: startX + 671.5, top: startY + 18.5, radius: 7.5, fill: '', stroke: '#ffffff', strokeWidth: 1.8 }));
    const c5 = new fabric.Circle(createProps('circle', { left: startX + 684.5, top: startY + 18.5, radius: 7.5, fill: '', stroke: '#ffffff', strokeWidth: 1.8 }));

    // 2. Sub-Header Metallic Silver Bar
    const subBar = new fabric.Rect(createProps('rect', {
      left: startX + 15, top: startY + 44, width: barWidth - 30, height: 28,
      fill: '#e2e8f0', skewX: -12, rx: 3, ry: 3
    }));

    const subTitleText = new fabric.Textbox(subTitleVal, createProps('textbox', {
      left: startX + 35, top: startY + 48, fontSize: 16, fontWeight: '900', fontStyle: 'italic',
      fill: '#00223e', width: 500, charSpacing: 60
    }));

    objects.push(headerBar, swimmerIcon, sportTitleText, c1, c2, c3, c4, c5, subBar, subTitleText);

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
        } catch (e) {}
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
      { pos: '',  noc: 'GRE', name: 'GREECE', time: '', record: 'DSQ' },
    ];
    const resultsList = customData.athletes || customData.results || (isB ? defaultResultsB : defaultResultsA);

    const startX = 280;
    const bannerWidth = 780;
    // Header
    const hGrad = new fabric.Gradient({ type: 'linear', gradientUnits: 'pixels', coords: { x1: 0, y1: 0, x2: bannerWidth, y2: 0 }, colorStops: [{ offset: 0, color: gradientStart }, { offset: 0.5, color: gradientMid }, { offset: 1, color: gradientEnd }] });
    const numRows = Math.min(resultsList.length, 8);
    const totalH = 42 + 28 + numRows * 34 + (numRows - 1) * 4;
    const startY = Math.max(100, 1080 - 100 - totalH);

    const headerBar = new fabric.Rect(createProps('rect', { left: startX, top: startY, width: bannerWidth, height: 42, fill: hGrad, skewX: -12, rx: 5, ry: 5, stroke: borderHighlight, strokeWidth: 1.5, shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.6)', blur: 12, offsetX: 0, offsetY: 6 }) }));
    const swimIcon = new fabric.Textbox('🏊', createProps('textbox', { left: startX + 15, top: startY + 5, fontSize: 32, fill: '#ffffff', width: 50 }));
    const hTitle = new fabric.Textbox(headerTitle, createProps('textbox', { left: startX + 60, top: startY + 9, fontSize: 21, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 600, charSpacing: 40 }));
    const c1r = new fabric.Circle(createProps('circle', { left: startX + 700, top: startY + 8, radius: 9, fill: '', stroke: '#ffffff', strokeWidth: 2.2 }));
    const c2r = new fabric.Circle(createProps('circle', { left: startX + 716, top: startY + 8, radius: 9, fill: '', stroke: '#ffffff', strokeWidth: 2.2 }));
    const c3r = new fabric.Circle(createProps('circle', { left: startX + 732, top: startY + 8, radius: 9, fill: '', stroke: '#ffffff', strokeWidth: 2.2 }));
    const c4r = new fabric.Circle(createProps('circle', { left: startX + 708, top: startY + 18, radius: 9, fill: '', stroke: '#ffffff', strokeWidth: 2.2 }));
    const c5r = new fabric.Circle(createProps('circle', { left: startX + 724, top: startY + 18, radius: 9, fill: '', stroke: '#ffffff', strokeWidth: 2.2 }));

    const subBarR = new fabric.Rect(createProps('rect', { left: startX + 15, top: startY + 44, width: bannerWidth - 15, height: 26, fill: '#e2e8f0', skewX: -12, rx: 3, ry: 3, stroke: 'rgba(0,34,62,0.3)', strokeWidth: 1 }));
    const subTitleR = new fabric.Textbox(subTitle, createProps('textbox', { left: startX + 30, top: startY + 48, fontSize: 15, fontWeight: '900', fontStyle: 'italic', fill: '#00223e', width: 500 }));

    objects.push(headerBar, swimIcon, hTitle, c1r, c2r, c3r, c4r, c5r, subBarR, subTitleR);

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
        } catch (e) {}
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
    const startY = Math.max(100, 1080 - 100 - totalH13);

    const hGrad13 = new fabric.Gradient({ type: 'linear', gradientUnits: 'pixels', coords: { x1: 0, y1: 0, x2: bannerWidth, y2: 0 }, colorStops: [{ offset: 0, color: gradientStart }, { offset: 0.5, color: gradientMid }, { offset: 1, color: gradientEnd }] });
    const headerBar13 = new fabric.Rect(createProps('rect', { left: startX, top: startY, width: bannerWidth, height: 42, fill: hGrad13, skewX: -12, rx: 5, ry: 5, stroke: borderHighlight, strokeWidth: 1.5, shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.6)', blur: 12, offsetX: 0, offsetY: 6 }) }));
    const swimIcon13 = new fabric.Textbox('🏊', createProps('textbox', { left: startX + 15, top: startY + 5, fontSize: 32, fill: '#ffffff', width: 50 }));
    const hTitle13 = new fabric.Textbox(headerTitle, createProps('textbox', { left: startX + 60, top: startY + 9, fontSize: 21, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 600 }));
    const c1a = new fabric.Circle(createProps('circle', { left: startX + 700, top: startY + 8, radius: 9, fill: '', stroke: '#ffffff', strokeWidth: 2.2 }));
    const c2a = new fabric.Circle(createProps('circle', { left: startX + 716, top: startY + 8, radius: 9, fill: '', stroke: '#ffffff', strokeWidth: 2.2 }));
    const c3a = new fabric.Circle(createProps('circle', { left: startX + 732, top: startY + 8, radius: 9, fill: '', stroke: '#ffffff', strokeWidth: 2.2 }));
    const c4a = new fabric.Circle(createProps('circle', { left: startX + 708, top: startY + 18, radius: 9, fill: '', stroke: '#ffffff', strokeWidth: 2.2 }));
    const c5a = new fabric.Circle(createProps('circle', { left: startX + 724, top: startY + 18, radius: 9, fill: '', stroke: '#ffffff', strokeWidth: 2.2 }));

    const subBar13 = new fabric.Rect(createProps('rect', { left: startX + 15, top: startY + 44, width: bannerWidth - 15, height: 26, fill: '#e2e8f0', skewX: -12, rx: 3, ry: 3 }));
    const subTitle13 = new fabric.Textbox(subTitle, createProps('textbox', { left: startX + 30, top: startY + 48, fontSize: 15, fontWeight: '900', fontStyle: 'italic', fill: '#00223e', width: 500 }));

    objects.push(headerBar13, swimIcon13, hTitle13, c1a, c2a, c3a, c4a, c5a, subBar13, subTitle13);

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
        } catch (e) {}
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
    const startY = 940;
    const barWidth = 780;

    const hGrad15 = new fabric.Gradient({ type: 'linear', gradientUnits: 'pixels', coords: { x1: 0, y1: 0, x2: barWidth, y2: 0 }, colorStops: [{ offset: 0, color: gradientStart }, { offset: 0.5, color: gradientMid }, { offset: 1, color: gradientEnd }] });
    const headerBar15 = new fabric.Rect(createProps('rect', { left: startX, top: startY, width: barWidth, height: 42, fill: hGrad15, skewX: -12, rx: 5, ry: 5, stroke: borderHighlight, strokeWidth: 1.5, shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.6)', blur: 12, offsetX: 0, offsetY: 6 }) }));
    const swimIcon15 = new fabric.Textbox('🏊', createProps('textbox', { left: startX + 15, top: startY + 5, fontSize: 32, fill: '#ffffff', width: 50 }));
    const hTitle15 = new fabric.Textbox(eventTitle, createProps('textbox', { left: startX + 60, top: startY + 9, fontSize: 21, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 600 }));
    const c1_15 = new fabric.Circle(createProps('circle', { left: startX + 700, top: startY + 8, radius: 9, fill: '', stroke: '#ffffff', strokeWidth: 2.2 }));
    const c2_15 = new fabric.Circle(createProps('circle', { left: startX + 716, top: startY + 8, radius: 9, fill: '', stroke: '#ffffff', strokeWidth: 2.2 }));
    const c3_15 = new fabric.Circle(createProps('circle', { left: startX + 732, top: startY + 8, radius: 9, fill: '', stroke: '#ffffff', strokeWidth: 2.2 }));
    const c4_15 = new fabric.Circle(createProps('circle', { left: startX + 708, top: startY + 18, radius: 9, fill: '', stroke: '#ffffff', strokeWidth: 2.2 }));
    const c5_15 = new fabric.Circle(createProps('circle', { left: startX + 724, top: startY + 18, radius: 9, fill: '', stroke: '#ffffff', strokeWidth: 2.2 }));
    const subBar15 = new fabric.Rect(createProps('rect', { left: startX + 15, top: startY + 44, width: barWidth - 15, height: 26, fill: '#e2e8f0', skewX: -12, rx: 3, ry: 3 }));
    const subTitle15 = new fabric.Textbox(ceremonyLabel, createProps('textbox', { left: startX + 30, top: startY + 48, fontSize: 15, fontWeight: '900', fontStyle: 'italic', fill: '#00223e', width: 500 }));
    objects.push(headerBar15, swimIcon15, hTitle15, c1_15, c2_15, c3_15, c4_15, c5_15, subBar15, subTitle15);
  }

  // ── SW016 / Medal ID ──
  else if (normId.includes('SW016') || normId.includes('SW121') || normId.includes('MEDAL ID')) {
    const isB = normId.endsWith('B') || normId.includes('SW016B');
    const nocCode16 = (customData.noc || (isB ? 'GBR' : 'CHN')).toUpperCase();
    const athleteName16 = (customData.name || customData.team || (isB ? 'GREAT BRITAIN' : 'LIU ZIGE')).toUpperCase();
    const medalColor = (customData.medal || (isB ? 'SILVER' : 'GOLD')).toUpperCase();
    const eventLabel16 = (customData.event || (isB ? "MEN'S 4X200M FREESTYLE RELAY" : "WOMEN'S 200M BUTTERFLY")).toUpperCase();

    const startX = 280;
    const startY = 940;
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
      } catch (e) {}
    }

    const hTitle16 = new fabric.Textbox(athleteName16, createProps('textbox', { left: startX + 100, top: startY + 9, fontSize: 22, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 560 }));
    const c1_16 = new fabric.Circle(createProps('circle', { left: startX + 700, top: startY + 8, radius: 9, fill: '', stroke: '#ffffff', strokeWidth: 2.2 }));
    const c2_16 = new fabric.Circle(createProps('circle', { left: startX + 716, top: startY + 8, radius: 9, fill: '', stroke: '#ffffff', strokeWidth: 2.2 }));
    const c3_16 = new fabric.Circle(createProps('circle', { left: startX + 732, top: startY + 8, radius: 9, fill: '', stroke: '#ffffff', strokeWidth: 2.2 }));
    const c4_16 = new fabric.Circle(createProps('circle', { left: startX + 708, top: startY + 18, radius: 9, fill: '', stroke: '#ffffff', strokeWidth: 2.2 }));
    const c5_16 = new fabric.Circle(createProps('circle', { left: startX + 724, top: startY + 18, radius: 9, fill: '', stroke: '#ffffff', strokeWidth: 2.2 }));
    objects.push(hTitle16, c1_16, c2_16, c3_16, c4_16, c5_16);

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
      { medal: 'GOLD',   noc: 'CHN', name: 'LIU ZIGE' },
      { medal: 'SILVER', noc: 'CHN', name: 'JIAO LIUYANG' },
      { medal: 'BRONZE', noc: 'AUS', name: 'JESSICAH SCHIPPER' },
    ];
    const defaultMedalsB = [
      { medal: 'GOLD',   noc: 'USA', name: 'UNITED STATES' },
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
    const c1_17 = new fabric.Circle(createProps('circle', { left: startX + 700, top: startY17 + 8, radius: 9, fill: '', stroke: '#ffffff', strokeWidth: 2.2 }));
    const c2_17 = new fabric.Circle(createProps('circle', { left: startX + 716, top: startY17 + 8, radius: 9, fill: '', stroke: '#ffffff', strokeWidth: 2.2 }));
    const c3_17 = new fabric.Circle(createProps('circle', { left: startX + 732, top: startY17 + 8, radius: 9, fill: '', stroke: '#ffffff', strokeWidth: 2.2 }));
    const c4_17 = new fabric.Circle(createProps('circle', { left: startX + 708, top: startY17 + 18, radius: 9, fill: '', stroke: '#ffffff', strokeWidth: 2.2 }));
    const c5_17 = new fabric.Circle(createProps('circle', { left: startX + 724, top: startY17 + 18, radius: 9, fill: '', stroke: '#ffffff', strokeWidth: 2.2 }));
    const subBar17 = new fabric.Rect(createProps('rect', { left: startX + 15, top: startY17 + 44, width: bannerWidth - 15, height: 26, fill: '#e2e8f0', skewX: -12, rx: 3, ry: 3 }));
    const subTitle17 = new fabric.Textbox(ceremonyLabel17, createProps('textbox', { left: startX + 30, top: startY17 + 48, fontSize: 15, fontWeight: '900', fontStyle: 'italic', fill: '#00223e', width: 500 }));
    objects.push(headerBar17, swimIcon17, hTitle17, c1_17, c2_17, c3_17, c4_17, c5_17, subBar17, subTitle17);

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
        } catch (e) {}
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
    const startY = 940;
    const barWidth = 780;

    const hGrad18 = new fabric.Gradient({ type: 'linear', gradientUnits: 'pixels', coords: { x1: 0, y1: 0, x2: barWidth, y2: 0 }, colorStops: [{ offset: 0, color: gradientStart }, { offset: 0.5, color: gradientMid }, { offset: 1, color: gradientEnd }] });
    const headerBar18 = new fabric.Rect(createProps('rect', { left: startX, top: startY, width: barWidth, height: 42, fill: hGrad18, skewX: -12, rx: 5, ry: 5, stroke: borderHighlight, strokeWidth: 1.5, shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.6)', blur: 12, offsetX: 0, offsetY: 6 }) }));
    const nameText18 = new fabric.Textbox(presenterName, createProps('textbox', { left: startX + 20, top: startY + 9, fontSize: 22, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 660 }));
    const c1_18 = new fabric.Circle(createProps('circle', { left: startX + 700, top: startY + 8, radius: 9, fill: '', stroke: '#ffffff', strokeWidth: 2.2 }));
    const c2_18 = new fabric.Circle(createProps('circle', { left: startX + 716, top: startY + 8, radius: 9, fill: '', stroke: '#ffffff', strokeWidth: 2.2 }));
    const c3_18 = new fabric.Circle(createProps('circle', { left: startX + 732, top: startY + 8, radius: 9, fill: '', stroke: '#ffffff', strokeWidth: 2.2 }));
    const c4_18 = new fabric.Circle(createProps('circle', { left: startX + 708, top: startY + 18, radius: 9, fill: '', stroke: '#ffffff', strokeWidth: 2.2 }));
    const c5_18 = new fabric.Circle(createProps('circle', { left: startX + 724, top: startY + 18, radius: 9, fill: '', stroke: '#ffffff', strokeWidth: 2.2 }));
    const subBar18 = new fabric.Rect(createProps('rect', { left: startX + 15, top: startY + 44, width: barWidth - 15, height: 26, fill: darkTabColor, skewX: -12, rx: 3, ry: 3 }));
    const titleText18 = new fabric.Textbox(presenterTitle, createProps('textbox', { left: startX + 30, top: startY + 48, fontSize: 14, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 680 }));
    objects.push(headerBar18, nameText18, c1_18, c2_18, c3_18, c4_18, c5_18, subBar18, titleText18);
  }

  // ── SW019 / Flower Presenter ID ──
  else if (normId.includes('SW019') || normId.includes('SW124') || normId.includes('FLOWER PRESENTER')) {
    const presenterName19 = (customData.name || customData.presenter || 'MR BILL MATSON').toUpperCase();
    const presenterTitle19 = (customData.title || customData.designation || 'VICE PRESIDENT, FINA').toUpperCase();

    const startX = 280;
    const startY = 940;
    const barWidth = 780;

    const hGrad19 = new fabric.Gradient({ type: 'linear', gradientUnits: 'pixels', coords: { x1: 0, y1: 0, x2: barWidth, y2: 0 }, colorStops: [{ offset: 0, color: gradientStart }, { offset: 0.5, color: gradientMid }, { offset: 1, color: gradientEnd }] });
    const headerBar19 = new fabric.Rect(createProps('rect', { left: startX, top: startY, width: barWidth, height: 42, fill: hGrad19, skewX: -12, rx: 5, ry: 5, stroke: borderHighlight, strokeWidth: 1.5, shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.6)', blur: 12, offsetX: 0, offsetY: 6 }) }));
    const nameText19 = new fabric.Textbox(presenterName19, createProps('textbox', { left: startX + 20, top: startY + 9, fontSize: 22, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 660 }));
    const c1_19 = new fabric.Circle(createProps('circle', { left: startX + 700, top: startY + 8, radius: 9, fill: '', stroke: '#ffffff', strokeWidth: 2.2 }));
    const c2_19 = new fabric.Circle(createProps('circle', { left: startX + 716, top: startY + 8, radius: 9, fill: '', stroke: '#ffffff', strokeWidth: 2.2 }));
    const c3_19 = new fabric.Circle(createProps('circle', { left: startX + 732, top: startY + 8, radius: 9, fill: '', stroke: '#ffffff', strokeWidth: 2.2 }));
    const c4_19 = new fabric.Circle(createProps('circle', { left: startX + 708, top: startY + 18, radius: 9, fill: '', stroke: '#ffffff', strokeWidth: 2.2 }));
    const c5_19 = new fabric.Circle(createProps('circle', { left: startX + 724, top: startY + 18, radius: 9, fill: '', stroke: '#ffffff', strokeWidth: 2.2 }));
    const subBar19 = new fabric.Rect(createProps('rect', { left: startX + 15, top: startY + 44, width: barWidth - 15, height: 26, fill: darkTabColor, skewX: -12, rx: 3, ry: 3 }));
    const titleText19 = new fabric.Textbox(presenterTitle19, createProps('textbox', { left: startX + 30, top: startY + 48, fontSize: 14, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 680 }));
    objects.push(headerBar19, nameText19, c1_19, c2_19, c3_19, c4_19, c5_19, subBar19, titleText19);
  }

  // ── SW020 / Race Clock ──
  else if (normId.includes('SW020') || normId.includes('SW125') || normId.includes('RACE CLOCK')) {
    const timeVal = customData.time || '15.4';
    const startX = 1450;
    const startY = 960;

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
    const c1 = new fabric.Circle(createProps('circle', { left: startX + 172, top: startY + 10, radius: 6, fill: '', stroke: '#ffffff', strokeWidth: 1.5 }));
    const c2 = new fabric.Circle(createProps('circle', { left: startX + 183, top: startY + 10, radius: 6, fill: '', stroke: '#ffffff', strokeWidth: 1.5 }));
    const c3 = new fabric.Circle(createProps('circle', { left: startX + 194, top: startY + 10, radius: 6, fill: '', stroke: '#ffffff', strokeWidth: 1.5 }));
    const c4 = new fabric.Circle(createProps('circle', { left: startX + 177.5, top: startY + 16, radius: 6, fill: '', stroke: '#ffffff', strokeWidth: 1.5 }));
    const c5 = new fabric.Circle(createProps('circle', { left: startX + 188.5, top: startY + 16, radius: 6, fill: '', stroke: '#ffffff', strokeWidth: 1.5 }));

    objects.push(clockBody, timeText, ringsTab, c1, c2, c3, c4, c5);
  }

  // ── SW021 / Race Clock before Split Point ──
  else if (normId.includes('SW021') || normId.includes('SW128') || normId.includes('BEFORE SPLIT')) {
    const splitRecord = (customData.splitRecord || 'WR').toUpperCase();
    const splitTime = customData.splitTime || '22.44';
    const distanceVal = (customData.distance || '50M').toUpperCase();
    const clockTime = customData.time || '19.4';

    const leftX = 280;
    const leftY = 960;
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

    const rightX = 1450;
    const rightY = 960;

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
    const c1 = new fabric.Circle(createProps('circle', { left: rightX + 172, top: rightY + 10, radius: 6, fill: '', stroke: '#ffffff', strokeWidth: 1.5 }));
    const c2 = new fabric.Circle(createProps('circle', { left: rightX + 183, top: rightY + 10, radius: 6, fill: '', stroke: '#ffffff', strokeWidth: 1.5 }));
    const c3 = new fabric.Circle(createProps('circle', { left: rightX + 194, top: rightY + 10, radius: 6, fill: '', stroke: '#ffffff', strokeWidth: 1.5 }));
    const c4 = new fabric.Circle(createProps('circle', { left: rightX + 177.5, top: rightY + 16, radius: 6, fill: '', stroke: '#ffffff', strokeWidth: 1.5 }));
    const c5 = new fabric.Circle(createProps('circle', { left: rightX + 188.5, top: rightY + 16, radius: 6, fill: '', stroke: '#ffffff', strokeWidth: 1.5 }));

    objects.push(distTab, distText, clockBody, timeText, ringsTab, c1, c2, c3, c4, c5);
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
        } catch (e) {}
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
    const leftY = 960;
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

    const rightX = 1450;
    const rightY = 960;
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
    const c1 = new fabric.Circle(createProps('circle', { left: rightX + 172, top: rightY + 10, radius: 6, fill: '', stroke: '#ffffff', strokeWidth: 1.5 }));
    const c2 = new fabric.Circle(createProps('circle', { left: rightX + 183, top: rightY + 10, radius: 6, fill: '', stroke: '#ffffff', strokeWidth: 1.5 }));
    const c3 = new fabric.Circle(createProps('circle', { left: rightX + 194, top: rightY + 10, radius: 6, fill: '', stroke: '#ffffff', strokeWidth: 1.5 }));
    const c4 = new fabric.Circle(createProps('circle', { left: rightX + 177.5, top: rightY + 16, radius: 6, fill: '', stroke: '#ffffff', strokeWidth: 1.5 }));
    const c5 = new fabric.Circle(createProps('circle', { left: rightX + 188.5, top: rightY + 16, radius: 6, fill: '', stroke: '#ffffff', strokeWidth: 1.5 }));

    objects.push(distTab, distText, clockBody, timeText, ringsTab, c1, c2, c3, c4, c5);
  }

  // ── SW023 / Race Clock before Finish & SW024 / Race Clock at Finish ──
  else if (normId.includes('SW023') || normId.includes('SW024') || normId.includes('SW130') || normId.includes('FINISH')) {
    const wrTime = customData.wrTime || (normId.includes('SW024') ? '3:40.08' : '47.24');
    const orTime = customData.orTime || (normId.includes('SW024') ? '3:40.59' : '47.27');
    const clockTime = customData.time || (normId.includes('SW024') ? '3:41.60' : '47.1');

    const leftX = 280;
    const leftY = 920;

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

    const rightX = 1450;
    const rightY = 960;
    const clockBody = new fabric.Rect(createProps('rect', {
      left: rightX, top: rightY, width: 170, height: 38, fill: '#d1d5db', skewX: -12, rx: 5, ry: 5, stroke: '#0088cc', strokeWidth: 1.5
    }));
    const timeText = new fabric.Textbox(clockTime, createProps('textbox', {
      left: rightX + 10, top: rightY + 6, fontSize: 22, fontWeight: '900', fontStyle: 'italic', fill: '#00192e', width: 140, textAlign: 'center'
    }));
    const ringsTab = new fabric.Rect(createProps('rect', {
      left: rightX + 160, top: rightY, width: 80, height: 38, fill: '#00192e', skewX: -12, rx: 5, ry: 5, stroke: '#0088cc', strokeWidth: 1.5
    }));
    const c1 = new fabric.Circle(createProps('circle', { left: rightX + 172, top: rightY + 10, radius: 6, fill: '', stroke: '#ffffff', strokeWidth: 1.5 }));
    const c2 = new fabric.Circle(createProps('circle', { left: rightX + 183, top: rightY + 10, radius: 6, fill: '', stroke: '#ffffff', strokeWidth: 1.5 }));
    const c3 = new fabric.Circle(createProps('circle', { left: rightX + 194, top: rightY + 10, radius: 6, fill: '', stroke: '#ffffff', strokeWidth: 1.5 }));
    const c4 = new fabric.Circle(createProps('circle', { left: rightX + 177.5, top: rightY + 16, radius: 6, fill: '', stroke: '#ffffff', strokeWidth: 1.5 }));
    const c5 = new fabric.Circle(createProps('circle', { left: rightX + 188.5, top: rightY + 16, radius: 6, fill: '', stroke: '#ffffff', strokeWidth: 1.5 }));

    objects.push(clockBody, timeText, ringsTab, c1, c2, c3, c4, c5);
  }

  // ── SW103 / Weather ──
  else if (normId.includes('SW103') || normId.includes('WEATHER')) {
    const airTemp = customData.airTemp || '21°C';
    const waterTemp = customData.waterTemp || '28°C';
    const humidity = customData.humidity || '83%';
    const windDir = (customData.windDir || 'EAST SOUTH EAST').toUpperCase();
    const windSpeed = customData.windSpeed || '5KM/H';

    const gunPathData = 'M 45 0 L 888 0 C 892 0, 895 3, 893 8 L 872 44 C 870 49, 865 54, 860 54 L 140 54 L 115 88 C 112 92, 106 95, 100 95 L 10 95 C 4 95, 0 90, 2 84 L 22 42 L 35 6 C 37 2, 41 0, 45 0 Z';

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
      fill: '#ffffff', width: 610, charSpacing: 90
    }));

    const c1 = new fabric.Circle(createProps('circle', { left: 1045, top: 595, radius: 9, fill: '', stroke: '#ffffff', strokeWidth: 2.2 }));
    const c2 = new fabric.Circle(createProps('circle', { left: 1061, top: 595, radius: 9, fill: '', stroke: '#ffffff', strokeWidth: 2.2 }));
    const c3 = new fabric.Circle(createProps('circle', { left: 1077, top: 595, radius: 9, fill: '', stroke: '#ffffff', strokeWidth: 2.2 }));
    const c4 = new fabric.Circle(createProps('circle', { left: 1053, top: 603, radius: 9, fill: '', stroke: '#ffffff', strokeWidth: 2.2 }));
    const c5 = new fabric.Circle(createProps('circle', { left: 1069, top: 603, radius: 9, fill: '', stroke: '#ffffff', strokeWidth: 2.2 }));

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

    const subBarPathData = 'M 28 0 L 778 0 L 766 34 L 0 34 Z';

    const subBar = new fabric.Path(subBarPathData, createProps('path', {
      left: 350, top: 635,
      fill: subBarGradient,
      stroke: 'rgba(0,34,62,0.5)',
      strokeWidth: 1.2
    }));

    const weatherSubTitle = new fabric.Textbox('WEATHER', createProps('textbox', {
      left: 395, top: 640, fontSize: 21, fontWeight: '900', fontStyle: 'italic',
      fill: '#00223e', width: 720, charSpacing: 40
    }));

    objects.push(gunHeaderBody, weatherIcon, sportTitleText, c1, c2, c3, c4, c5, subBar, weatherSubTitle);

    const rows = [
      { icon: '🌡️', label: 'AIR TEMPERATURE', val: airTemp },
      { icon: '🌊', label: 'WATER TEMPERATURE', val: waterTemp },
      { icon: '💦', label: 'HUMIDITY', val: humidity },
      { icon: '🧭', label: 'WIND DIRECTION', val: windDir },
      { icon: '🌬️', label: 'WIND SPEED', val: windSpeed }
    ];

    const rowPathData = 'M 24 0 L 888 0 L 888 34 L 0 34 Z';
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
        left: 650, top: ry + 7, fontSize: 17, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 460, textAlign: 'right'
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
    const startY = 940;
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
      } catch (e) {}
    }

    const numText = new fabric.Textbox(athNum, createProps('textbox', {
      left: startX + 98, top: startY + 9, fontSize: 22, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 45, textAlign: 'center'
    }));
    const nameText = new fabric.Textbox(nameVal, createProps('textbox', {
      left: startX + 150, top: startY + 9, fontSize: 22, fontWeight: '900', fontStyle: 'italic', fill: '#ffffff', width: 510
    }));

    const c1 = new fabric.Circle(createProps('circle', { left: startX + 700, top: startY + 8, radius: 9, fill: '', stroke: '#ffffff', strokeWidth: 2.2 }));
    const c2 = new fabric.Circle(createProps('circle', { left: startX + 716, top: startY + 8, radius: 9, fill: '', stroke: '#ffffff', strokeWidth: 2.2 }));
    const c3 = new fabric.Circle(createProps('circle', { left: startX + 732, top: startY + 8, radius: 9, fill: '', stroke: '#ffffff', strokeWidth: 2.2 }));
    const c4 = new fabric.Circle(createProps('circle', { left: startX + 708, top: startY + 18, radius: 9, fill: '', stroke: '#ffffff', strokeWidth: 2.2 }));
    const c5 = new fabric.Circle(createProps('circle', { left: startX + 724, top: startY + 18, radius: 9, fill: '', stroke: '#ffffff', strokeWidth: 2.2 }));

    objects.push(numText, nameText, c1, c2, c3, c4, c5);
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
    const startY = 900;
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
      } catch (e) {}
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
    const c1 = new fabric.Circle(createProps('circle', { left: startX + 665, top: startY + 12, radius: 7.5, fill: '', stroke: '#ffffff', strokeWidth: 1.8 }));
    const c2 = new fabric.Circle(createProps('circle', { left: startX + 678, top: startY + 12, radius: 7.5, fill: '', stroke: '#ffffff', strokeWidth: 1.8 }));
    const c3 = new fabric.Circle(createProps('circle', { left: startX + 691, top: startY + 12, radius: 7.5, fill: '', stroke: '#ffffff', strokeWidth: 1.8 }));
    const c4 = new fabric.Circle(createProps('circle', { left: startX + 671.5, top: startY + 18.5, radius: 7.5, fill: '', stroke: '#ffffff', strokeWidth: 1.8 }));
    const c5 = new fabric.Circle(createProps('circle', { left: startX + 684.5, top: startY + 18.5, radius: 7.5, fill: '', stroke: '#ffffff', strokeWidth: 1.8 }));
    objects.push(c1, c2, c3, c4, c5);

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

    const c1 = new fabric.Circle(createProps('circle', { left: startX + 760, top: startY + 12, radius: 8, fill: '', stroke: '#ffffff', strokeWidth: 2 }));
    const c2 = new fabric.Circle(createProps('circle', { left: startX + 774, top: startY + 12, radius: 8, fill: '', stroke: '#ffffff', strokeWidth: 2 }));
    const c3 = new fabric.Circle(createProps('circle', { left: startX + 788, top: startY + 12, radius: 8, fill: '', stroke: '#ffffff', strokeWidth: 2 }));
    const c4 = new fabric.Circle(createProps('circle', { left: startX + 767, top: startY + 19, radius: 8, fill: '', stroke: '#ffffff', strokeWidth: 2 }));
    const c5 = new fabric.Circle(createProps('circle', { left: startX + 781, top: startY + 19, radius: 8, fill: '', stroke: '#ffffff', strokeWidth: 2 }));

    // 2. Sub-Header Bar (START LIST - HEAT 5 or START LIST - FINAL)
    const subBar = new fabric.Rect(createProps('rect', {
      left: startX + 10, top: startY + 52, width: bannerWidth - 20, height: 30,
      fill: '#e2e8f0', skewX: -12, rx: 4, ry: 4
    }));

    const phaseTitleText = new fabric.Textbox(phaseTitleTextVal, createProps('textbox', {
      left: startX + 120, top: startY + 57, fontSize: 16, fontWeight: '900', fontStyle: 'italic',
      fill: '#00223e', width: 500, charSpacing: 60
    }));

    objects.push(headerBar, swimmerIcon, eventTitleText, c1, c2, c3, c4, c5, subBar, phaseTitleText);

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
        } catch (e) {}
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

    const c1 = new fabric.Circle(createProps('circle', { left: 1045, top: 835, radius: 9, fill: '', stroke: '#ffffff', strokeWidth: 2.2 }));
    const c2 = new fabric.Circle(createProps('circle', { left: 1061, top: 835, radius: 9, fill: '', stroke: '#ffffff', strokeWidth: 2.2 }));
    const c3 = new fabric.Circle(createProps('circle', { left: 1077, top: 835, radius: 9, fill: '', stroke: '#ffffff', strokeWidth: 2.2 }));
    const c4 = new fabric.Circle(createProps('circle', { left: 1053, top: 843, radius: 9, fill: '', stroke: '#ffffff', strokeWidth: 2.2 }));
    const c5 = new fabric.Circle(createProps('circle', { left: 1069, top: 843, radius: 9, fill: '', stroke: '#ffffff', strokeWidth: 2.2 }));

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

    objects.push(gunHeaderBody, swimmerIcon, sportTitleText, c1, c2, c3, c4, c5, subBar, eventTitleText);
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

    const c1 = new fabric.Circle(createProps('circle', { left: startX + 760, top: startY + 12, radius: 8, fill: '', stroke: '#ffffff', strokeWidth: 2 }));
    const c2 = new fabric.Circle(createProps('circle', { left: startX + 774, top: startY + 12, radius: 8, fill: '', stroke: '#ffffff', strokeWidth: 2 }));
    const c3 = new fabric.Circle(createProps('circle', { left: startX + 788, top: startY + 12, radius: 8, fill: '', stroke: '#ffffff', strokeWidth: 2 }));
    const c4 = new fabric.Circle(createProps('circle', { left: startX + 767, top: startY + 19, radius: 8, fill: '', stroke: '#ffffff', strokeWidth: 2 }));
    const c5 = new fabric.Circle(createProps('circle', { left: startX + 781, top: startY + 19, radius: 8, fill: '', stroke: '#ffffff', strokeWidth: 2 }));

    const subBar = new fabric.Rect(createProps('rect', {
      left: startX + 10, top: startY + 52, width: bannerWidth - 20, height: 30,
      fill: '#e2e8f0', skewX: -12, rx: 4, ry: 4
    }));

    const subTitleText = new fabric.Textbox(venueTitle, createProps('textbox', {
      left: startX + 120, top: startY + 57, fontSize: 16, fontWeight: '900', fontStyle: 'italic',
      fill: '#00223e', width: 500, charSpacing: 60
    }));

    objects.push(headerBar, swimmerIcon, sportTitleText, c1, c2, c3, c4, c5, subBar, subTitleText);

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

  const groupId = generateUniqueId({ type: 'group' });
  const group = new fabric.Group(objects, {
    id: groupId,
    class: groupId,
    subTargetCheck: true,
    objectCaching: false
  });

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
            bottom: 120px;
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

  // ── SW007 / Team List by Lane Layout ──
  else if (normId.includes('SW007') || normId.includes('SW107') || normId.includes('TEAM LIST BY LANE')) {
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
  else if (normId.includes('SW011') || normId.includes('SW111') || normId.includes('WINNER') || normId.includes('PLACE ID')) {
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
      { pos: '',  noc: 'GRE', name: 'GREECE', time: '', record: 'DSQ' },
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
            bottom: 120px;
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
            bottom: 120px;
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
            bottom: 120px;
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

  return `<div>Unknown Swimming Template</div>`;
}
