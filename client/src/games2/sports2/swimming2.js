/**
 * Swimming (SW) Broadcast Graphic Templates for games2
 * Exact 1-to-1 visual implementation for:
 *  - SW002 (Venue ID) matching SW002_Venue_ID_a.jpg
 *  - SW003 (Event Schedule) matching SW003_Event_Schedule_a.jpg
 *  - SW004 (Event ID) matching SW004_Event_ID_a.jpg
 *  - SW005 (Start List) matching SW005_Start_List_a.jpg (Single strip per row, 80px width country flags)
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
 * Fabric.js Vector Generator for Swimming Templates (SW002, SW003, SW004, SW005)
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
  const eventTitle = (customData.event || "WOMEN'S 200M BUTTERFLY").toUpperCase();
  const phaseTitle = (customData.phase || 'START LIST - HEAT 5').toUpperCase();

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

  // ── SW005 / Start List Layout ──
  else if (normId.includes('SW005') || normId.includes('SW105') || normId.includes('START LIST')) {
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

    const eventTitleText = new fabric.Textbox(eventTitle, createProps('textbox', {
      left: startX + 110, top: startY + 8, fontSize: 26, fontWeight: '900', fontStyle: 'italic',
      fill: '#ffffff', width: 550, charSpacing: 90
    }));

    const c1 = new fabric.Circle(createProps('circle', { left: startX + 760, top: startY + 12, radius: 8, fill: '', stroke: '#ffffff', strokeWidth: 2 }));
    const c2 = new fabric.Circle(createProps('circle', { left: startX + 774, top: startY + 12, radius: 8, fill: '', stroke: '#ffffff', strokeWidth: 2 }));
    const c3 = new fabric.Circle(createProps('circle', { left: startX + 788, top: startY + 12, radius: 8, fill: '', stroke: '#ffffff', strokeWidth: 2 }));
    const c4 = new fabric.Circle(createProps('circle', { left: startX + 767, top: startY + 19, radius: 8, fill: '', stroke: '#ffffff', strokeWidth: 2 }));
    const c5 = new fabric.Circle(createProps('circle', { left: startX + 781, top: startY + 19, radius: 8, fill: '', stroke: '#ffffff', strokeWidth: 2 }));

    // 2. Sub-Header Bar (START LIST - HEAT 5)
    const subBar = new fabric.Rect(createProps('rect', {
      left: startX + 10, top: startY + 52, width: bannerWidth - 20, height: 30,
      fill: '#e2e8f0', skewX: -12, rx: 4, ry: 4
    }));

    const phaseTitleText = new fabric.Textbox(phaseTitle, createProps('textbox', {
      left: startX + 120, top: startY + 57, fontSize: 16, fontWeight: '900', fontStyle: 'italic',
      fill: '#00223e', width: 500, charSpacing: 60
    }));

    objects.push(headerBar, swimmerIcon, eventTitleText, c1, c2, c3, c4, c5, subBar, phaseTitleText);

    // 3. Eight Athlete Single Strip Rows with Alternate Dark/Light Blue Colors and Fully Selectable Flags
    const defaultAthletes = [
      { lane: '1', noc: 'KOR', name: 'CHOI HYERA' },
      { lane: '2', noc: 'AUS', name: 'SAMANTHA HAMILL' },
      { lane: '3', noc: 'USA', name: 'ELAINE BREEDEN' },
      { lane: '4', noc: 'POL', name: 'OTYLIA JEDRZEJCZAK' },
      { lane: '5', noc: 'FRA', name: 'AURORE MONGEL' },
      { lane: '6', noc: 'CHN', name: 'JIAO LIUYANG' },
      { lane: '7', noc: 'HUN', name: 'BEATRIX BOULSEVICZ' },
      { lane: '8', noc: 'BRA', name: 'JOANNA MARANHAO' }
    ];

    const athletesList = customData.athletes || defaultAthletes;
    let currentY = startY + 86;

    const sliceList = athletesList.slice(0, 8);
    for (let idx = 0; idx < sliceList.length; idx++) {
      const ath = sliceList[idx];
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

      // Athlete Name Text
      const nameText = new fabric.Textbox(ath.name.toUpperCase(), createProps('textbox', {
        left: startX + 148, top: currentY + 7, fontSize: 17, fontWeight: '900', fontStyle: 'italic',
        fill: '#ffffff', width: bannerWidth - 178
      }));

      objects.push(nameText);
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

    const eventTitleText = new fabric.Textbox(eventTitle, createProps('textbox', {
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
 * 1920x1080 HTML Broadcast Overlay for Swimming SW002, SW003, SW004, SW005
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
  const eventTitle = (customData.event || "WOMEN'S 200M BUTTERFLY").toUpperCase();
  const phaseTitle = (customData.phase || 'START LIST - HEAT 5').toUpperCase();

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

  // ── SW005 / Start List Layout ──
  else if (normId.includes('SW005') || normId.includes('SW105') || normId.includes('START LIST')) {
    const defaultAthletes = [
      { lane: '1', noc: 'KOR', name: 'CHOI HYERA' },
      { lane: '2', noc: 'AUS', name: 'SAMANTHA HAMILL' },
      { lane: '3', noc: 'USA', name: 'ELAINE BREEDEN' },
      { lane: '4', noc: 'POL', name: 'OTYLIA JEDRZEJCZAK' },
      { lane: '5', noc: 'FRA', name: 'AURORE MONGEL' },
      { lane: '6', noc: 'CHN', name: 'JIAO LIUYANG' },
      { lane: '7', noc: 'HUN', name: 'BEATRIX BOULSEVICZ' },
      { lane: '8', noc: 'BRA', name: 'JOANNA MARANHAO' }
    ];

    const athletesList = customData.athletes || defaultAthletes;

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
              <span>${eventTitle}</span>
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
            <div class="startlist-sub-title">${phaseTitle}</div>
          </div>
          ${athletesList.slice(0, 8).map((ath, idx) => {
            const flagUrl = getFlagBase64(ath.noc);
            return `
              <div class="startlist-single-strip ${idx % 2 === 1 ? 'strip-alt' : ''}">
                <div class="strip-lane-num"><span class="unskew">${ath.lane}</span></div>
                <div class="strip-flag-container">
                  ${flagUrl ? `<img src="${flagUrl}" class="strip-flag-img" />` : ''}
                </div>
                <div class="strip-athlete-name"><span class="unskew">${ath.name}</span></div>
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
            <div class="event-sub-title">${eventTitle}</div>
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
