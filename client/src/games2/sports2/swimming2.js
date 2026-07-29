/**
 * Swimming (SW) Broadcast Graphic Templates for games2
 * Exact 1-to-1 visual implementation for:
 *  - SW002 (Venue ID) matching SW002_Venue_ID_a.jpg
 *  - SW003 (Event Schedule) matching SW003_Event_Schedule_a.jpg
 *  - SW004 (Event ID) matching SW004_Event_ID_a.jpg
 *  - SW005 / SW005B (Start List) matching SW005_Start_List_a.jpg & SW005_Start_List_b.jpg (DNS white badge)
 *  - SW006 (Lane ID) matching SW006_Lane_ID_a.jpg to SW006_Lane_ID_e.jpg (5 distinct variants)
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
 * Fabric.js Vector Generator for Swimming Templates (SW002, SW003, SW004, SW005, SW006)
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
 * 1920x1080 HTML Broadcast Overlay for Swimming SW002, SW003, SW004, SW005, SW006
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
