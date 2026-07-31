/**
 * Aquatics - Diving (DV) Broadcast Graphic Templates
 * Official OBS / London 2012 Style - Dark Premium Broadcast Theme
 * 1-to-1 HTML Broadcast Overlay and Fabric.js Vector Canvas Integration for DV002 through DV019
 */

import { generateUniqueId } from '../../common';
import { generateDiving2Fabric, generateDiving2HTML } from '../../games2/sports2/diving2';

export function generateDivingHTML(templateId = '', templateName = '', customData = {}, sport = {}, styleOptions = {}) {
  const font = styleOptions.fontFamily || "'Outfit', 'Roboto Condensed', 'Segoe UI', sans-serif";
  const normId = (templateId || "").toLowerCase();
  const normName = (templateName || "").toLowerCase();

  if (normId.includes('dv002') || normId.includes('dv003') || normId.includes('dv004') || normId.includes('dv005') || normId.includes('dv006') || normId.includes('dv007')) {
    const html = generateDiving2HTML(templateId, customData, styleOptions);
    if (html) return html;
  }

  const primaryColor = customData.primaryColor || sport.primaryColor || '#005b96';
  const secondaryColor = customData.secondaryColor || sport.secondaryColor || '#6497b1';
  const accentColor = customData.accentColor || sport.accentColor || '#ffd700';

  const olympicRingsSVG = `
    <svg class="olympic-rings" viewBox="0 0 100 45" width="48" height="22" style="fill:none; stroke:#ffffff; stroke-width:3.5;">
      <circle cx="15" cy="16" r="11"/>
      <circle cx="38" cy="16" r="11"/>
      <circle cx="61" cy="16" r="11"/>
      <circle cx="84" cy="16" r="11"/>
      <circle cx="26.5" cy="27" r="11"/>
      <circle cx="49.5" cy="27" r="11"/>
      <circle cx="72.5" cy="27" r="11"/>
    </svg>
  `;

  const diverPictographSVG = `
    <svg viewBox="0 0 100 100" width="30" height="30" style="fill:none; stroke:#ffffff; stroke-width:5; stroke-linecap:round; stroke-linejoin:round;">
      <circle cx="70" cy="20" r="7" fill="#ffffff" stroke="none"/>
      <path d="M 65 30 L 45 45 L 20 70 M 45 45 L 30 85 M 25 25 Q 40 15 65 25" />
    </svg>
  `;

  // Ã¢â€â‚¬Ã¢â€â‚¬ 1. DV002 - Venue ID Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  if (normId.includes("dv002") || (normName.includes("venue") && !normId.includes("dv003"))) {
    const venueStr = (customData.venue || sport.venue || "AQUATICS CENTRE").toUpperCase();
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,700;1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .venue-container {
            position: absolute; bottom: 120px; left: 140px;
            display: flex; align-items: center; gap: 0;
          }
          .pictograph-badge {
            background: linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%);
            border: 2px solid rgba(255,255,255,0.6);
            border-radius: 8px 0 0 8px;
            width: 65px; height: 60px;
            display: flex; align-items: center; justify-content: center;
            transform: skewX(-12deg);
            z-index: 2; box-shadow: -4px 6px 16px rgba(0,0,0,0.5);
          }
          .venue-bar {
            height: 60px; width: 640px;
            background: linear-gradient(135deg, #061325 0%, ${primaryColor} 60%, #031526 100%);
            border: 1px solid rgba(255,255,255,0.25);
            border-left: none;
            border-radius: 0 8px 8px 0;
            transform: skewX(-12deg);
            display: flex; align-items: center; justify-content: space-between;
            padding: 0 24px; margin-left: -6px;
            box-shadow: 4px 6px 20px rgba(0,0,0,0.6);
          }
          .unskew-text { transform: skewX(12deg); display: flex; align-items: center; justify-content: space-between; width: 100%; }
          .venue-title { font-size: 26px; font-weight: 900; color: #ffffff; letter-spacing: 2px; text-transform: uppercase; }
          .sport-tag { font-size: 14px; font-weight: 800; color: ${accentColor}; letter-spacing: 1.5px; text-transform: uppercase; margin-right: 12px; }
        </style>
      </head>
      <body>
        <div class="venue-container">
          <div class="pictograph-badge">
            <div style="transform: skewX(12deg);">${diverPictographSVG}</div>
          </div>
          <div class="venue-bar">
            <div class="unskew-text">
              <div class="venue-title">${venueStr}</div>
              <div style="display:flex; align-items:center; gap:16px;">
                <span class="sport-tag">AQUATICS - DIVING</span>
                ${olympicRingsSVG}
              </div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // Ã¢â€â‚¬Ã¢â€â‚¬ 2. DV003 / DV004 - Event Schedule & Start List Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  if (normId.includes("dv003") || normId.includes("dv004") || normName.includes("schedule") || normName.includes("start list")) {
    const eventName = (customData.event || "MEN'S 10M PLATFORM").toUpperCase();
    const roundStr = (customData.round || "FINAL").toUpperCase();
    const venueStr = (customData.venue || sport.venue || "AQUATICS CENTRE").toUpperCase();

    const startEntries = [
      { order: "1", noc: "CHN", flag: "Ã°Å¸â€¡Â¨Ã°Å¸â€¡Â³", name: "CAO YUAN", dive: "107B", pos: "PIKE", dd: "3.0" },
      { order: "2", noc: "JPN", flag: "Ã°Å¸â€¡Â¯Ã°Å¸â€¡Âµ", name: "RIKUTO TAMAI", dive: "207C", pos: "TUCK", dd: "3.3" },
      { order: "3", noc: "GBR", flag: "Ã°Å¸â€¡Â¬Ã°Å¸â€¡Â§", name: "TOM DALEY", dive: "307C", pos: "TUCK", dd: "3.4" },
      { order: "4", noc: "USA", flag: "Ã°Å¸â€¡ÂºÃ°Å¸â€¡Â¸", name: "CARSON TYLER", dive: "407C", pos: "TUCK", dd: "3.2" },
      { order: "5", noc: "UKR", flag: "Ã°Å¸â€¡ÂºÃ°Å¸â€¡Â¦", name: "OLEKSIY SEREDA", dive: "5255B", pos: "PIKE", dd: "3.6" },
      { order: "6", noc: "MEX", flag: "Ã°Å¸â€¡Â²Ã°Å¸â€¡Â½", name: "OSMAR OLVERA", dive: "109C", pos: "TUCK", dd: "3.7" }
    ];

    const rows = startEntries.map((ath, idx) => `
      <div class="sl-row ${idx % 2 === 0 ? 'even-row' : ''}">
        <div class="sl-ord">${ath.order}</div>
        <div class="sl-noc"><span>${ath.flag}</span> ${ath.noc}</div>
        <div class="sl-name">${ath.name}</div>
        <div class="sl-dive"><span class="dive-code-tag">${ath.dive}</span> (${ath.pos})</div>
        <div class="sl-dd">DD ${ath.dd}</div>
      </div>
    `).join('');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,700;0,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .startlist-card {
            position: absolute; top: 100px; left: 140px;
            width: 880px; background: rgba(5, 18, 36, 0.96);
            border: 2px solid rgba(255,255,255,0.3); border-radius: 12px;
            box-shadow: 0 16px 40px rgba(0,0,0,0.75); overflow: hidden;
          }
          .sl-header {
            background: linear-gradient(90deg, ${primaryColor} 0%, ${secondaryColor} 100%);
            padding: 14px 24px; display: flex; align-items: center; justify-content: space-between;
            color: #ffffff;
          }
          .sl-title { font-size: 22px; font-weight: 900; letter-spacing: 1.5px; }
          .sl-sub { font-size: 14px; font-weight: 800; color: ${accentColor}; text-transform: uppercase; margin-top: 2px; }

          .sl-table-head {
            background: rgba(255,255,255,0.08); padding: 8px 20px;
            display: flex; align-items: center; gap: 16px;
            color: ${accentColor}; font-size: 12px; font-weight: 800; letter-spacing: 1px;
            border-bottom: 1px solid rgba(255,255,255,0.15);
          }
          .th-ord { width: 35px; text-align: center; }
          .th-noc { width: 70px; }
          .th-name { flex: 1; }
          .th-dive { width: 140px; text-align: center; }
          .th-dd { width: 70px; text-align: right; }

          .sl-body { padding: 8px 12px; display: flex; flex-direction: column; gap: 6px; }
          .sl-row {
            background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
            border-radius: 6px; height: 46px; padding: 0 14px;
            display: flex; align-items: center; gap: 16px; color: #ffffff;
          }
          .even-row { background: rgba(255,255,255,0.07); }
          .sl-ord { width: 35px; font-weight: 900; font-size: 18px; color: ${accentColor}; text-align: center; }
          .sl-noc { width: 70px; font-weight: 900; font-size: 15px; background: rgba(255,255,255,0.15); padding: 3px 8px; border-radius: 4px; display: flex; align-items: center; gap: 6px; }
          .sl-name { flex: 1; font-weight: 800; font-size: 18px; letter-spacing: 0.5px; }
          .sl-dive { width: 140px; font-weight: 700; font-size: 14px; color: #ffffff; text-align: center; }
          .dive-code-tag { color: ${accentColor}; font-weight: 900; font-size: 16px; }
          .sl-dd { width: 70px; font-weight: 900; font-size: 15px; color: ${accentColor}; text-align: right; }

          .sl-footer {
            background: rgba(255,255,255,0.05); padding: 8px 24px;
            display: flex; align-items: center; justify-content: space-between;
            color: rgba(255,255,255,0.6); font-size: 12px; font-weight: 700;
            border-top: 1px solid rgba(255,255,255,0.1);
          }
        </style>
      </head>
      <body>
        <div class="startlist-card">
          <div class="sl-header">
            <div>
              <div class="sl-title">${eventName}</div>
              <div class="sl-sub">START LIST Ã¢â‚¬â€ ${roundStr}</div>
            </div>
            ${olympicRingsSVG}
          </div>
          <div class="sl-table-head">
            <span class="th-ord">ORD</span>
            <span class="th-noc">NOC</span>
            <span class="th-name">ATHLETE NAME</span>
            <span class="th-dive">1ST DIVE</span>
            <span class="th-dd">DD</span>
          </div>
          <div class="sl-body">
            ${rows}
          </div>
          <div class="sl-footer">
            <span>VENUE: ${venueStr}</span>
            <span>TOTAL DIVES: 6 PER ATHLETE</span>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // Ã¢â€â‚¬Ã¢â€â‚¬ 2. DV005 / DV008 - Athlete ID & Dive ID Lower Third Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  if (normId.includes("dv005") || normId.includes("dv008") || normName.includes("athlete") || normName.includes("dive id")) {
    const athleteName = (customData.athlete || "TOM DALEY").toUpperCase();
    const country = (customData.country || "GBR").toUpperCase();
    const flag = customData.flag || "Ã°Å¸â€¡Â¬Ã°Å¸â€¡Â§";
    const eventName = (customData.event || "MEN'S 10M PLATFORM").toUpperCase();
    const roundStr = (customData.round || "FINAL - DIVE 6").toUpperCase();
    const diveCode = customData.diveCode || "107B";
    const diveDesc = customData.diveDesc || "FORWARD 3Ã‚Â½ SOMERSAULTS";
    const position = customData.position || "PIKE";
    const dd = customData.dd || "3.0";
    const rank = customData.rank || "3rd";
    const totalScore = customData.totalScore || customData.score || "556.95";

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,700;0,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .lower-third-card {
            position: absolute; bottom: 100px; left: 140px;
            display: flex; flex-direction: column; gap: 4px;
          }
          .header-stripe {
            background: linear-gradient(90deg, ${primaryColor} 0%, ${secondaryColor} 100%);
            height: 34px; padding: 0 20px; width: 620px;
            transform: skewX(-12deg); border-radius: 6px 6px 0 0;
            display: flex; align-items: center; justify-content: space-between;
            border: 1px solid rgba(255,255,255,0.3);
            box-shadow: 0 4px 12px rgba(0,0,0,0.4);
          }
          .header-text { transform: skewX(12deg); color: ${accentColor}; font-size: 15px; font-weight: 800; letter-spacing: 1.5px; }

          .main-name-box {
            background: linear-gradient(135deg, #051427 0%, #0d2a4d 60%, #041021 100%);
            height: 64px; width: 720px;
            transform: skewX(-12deg); border-radius: 0 0 8px 8px;
            border: 1px solid rgba(255,255,255,0.25);
            display: flex; align-items: center; justify-content: space-between;
            padding: 0 24px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.6);
          }
          .name-unskew { transform: skewX(12deg); display: flex; align-items: center; gap: 16px; }
          .noc-badge {
            background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.4);
            padding: 4px 10px; border-radius: 4px; color: #ffffff; font-weight: 900; font-size: 18px;
            display: flex; align-items: center; gap: 6px;
          }
          .athlete-name { color: #ffffff; font-size: 28px; font-weight: 900; letter-spacing: 1px; }

          .dive-info-strip {
            margin-top: 4px;
            background: rgba(10, 25, 47, 0.95);
            border: 1px solid rgba(255,255,255,0.2);
            border-radius: 6px; transform: skewX(-12deg);
            width: 720px; padding: 8px 20px;
            display: flex; align-items: center; justify-content: space-between;
            color: #ffffff; font-size: 15px; font-weight: 700;
          }
          .info-unskew { transform: skewX(12deg); display: flex; align-items: center; gap: 18px; }
          .dd-badge { background: ${accentColor}; color: #000; padding: 2px 8px; border-radius: 4px; font-weight: 900; }
        </style>
      </head>
      <body>
        <div class="lower-third-card">
          <div class="header-stripe">
            <span class="header-text">${eventName} Ã¢â‚¬â€ ${roundStr}</span>
            <span class="header-text">${olympicRingsSVG}</span>
          </div>
          <div class="main-name-box">
            <div class="name-unskew">
              <div class="noc-badge"><span>${flag}</span> ${country}</div>
              <div class="athlete-name">${athleteName}</div>
            </div>
            <div class="name-unskew" style="color: ${accentColor}; font-size: 22px; font-weight: 900;">
              ${rank} &nbsp;|&nbsp; ${totalScore}
            </div>
          </div>
          <div class="dive-info-strip">
            <div class="info-unskew">
              <span>DIVE: <strong style="color:${accentColor};">${diveCode}</strong></span>
              <span>${diveDesc}</span>
              <span>POS: <strong>${position}</strong></span>
            </div>
            <div class="info-unskew">
              <span class="dd-badge">DD ${dd}</span>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // Ã¢â€â‚¬Ã¢â€â‚¬ 3. DV010 / DV011 - Scorecard (Individual / Synch) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  if (normId.includes("dv010") || normId.includes("dv011") || normName.includes("scorecard")) {
    const athleteName = (customData.athlete || "TOM DALEY").toUpperCase();
    const country = (customData.country || "GBR").toUpperCase();
    const flag = customData.flag || "Ã°Å¸â€¡Â¬Ã°Å¸â€¡Â§";
    const eventName = (customData.event || "MEN'S 10M PLATFORM").toUpperCase();
    const roundStr = (customData.round || "FINAL").toUpperCase();
    const diveCode = customData.diveCode || "107B";
    const dd = customData.dd || "3.0";
    const jScores = customData.jScores || ["8.5", "9.0", "8.5", "9.0", "8.5", "9.0", "8.5"];
    const diveScore = customData.diveScore || "76.50";
    const totalScore = customData.totalScore || "556.95";
    const rank = customData.rank || "3rd";

    const jItems = jScores.map((score, idx) => `
      <div class="judge-box">
        <span class="j-lbl">J${idx + 1}</span>
        <span class="j-val">${score}</span>
      </div>
    `).join('');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,700;0,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .scorecard-card {
            position: absolute; bottom: 90px; left: 140px;
            width: 820px; background: rgba(5, 18, 36, 0.96);
            border: 2px solid rgba(255,255,255,0.3); border-radius: 10px;
            box-shadow: 0 12px 36px rgba(0,0,0,0.7); overflow: hidden;
          }
          .sc-header {
            background: linear-gradient(90deg, ${primaryColor} 0%, ${secondaryColor} 100%);
            padding: 10px 24px; display: flex; align-items: center; justify-content: space-between;
            color: #ffffff; font-size: 16px; font-weight: 800; letter-spacing: 1px;
          }
          .sc-athlete-row {
            padding: 14px 24px; display: flex; align-items: center; justify-content: space-between;
            background: rgba(255,255,255,0.04); border-bottom: 1px solid rgba(255,255,255,0.1);
          }
          .ath-info { display: flex; align-items: center; gap: 14px; }
          .noc-pill { background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); padding: 4px 10px; border-radius: 4px; color: #fff; font-weight: 900; font-size: 18px; }
          .ath-name { font-size: 26px; font-weight: 900; color: #ffffff; letter-spacing: 1px; }

          .sc-scores-row {
            padding: 16px 24px; display: flex; align-items: center; justify-content: space-between; gap: 8px;
          }
          .judges-group { display: flex; align-items: center; gap: 8px; }
          .judge-box {
            background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.2);
            border-radius: 6px; width: 56px; height: 58px;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
          }
          .j-lbl { font-size: 11px; font-weight: 700; color: ${secondaryColor}; margin-bottom: 2px; }
          .j-val { font-size: 20px; font-weight: 900; color: #ffffff; }

          .totals-group { display: flex; align-items: center; gap: 20px; }
          .total-box { display: flex; flex-direction: column; align-items: flex-end; }
          .tot-lbl { font-size: 12px; font-weight: 800; color: ${accentColor}; text-transform: uppercase; }
          .tot-val { font-size: 32px; font-weight: 900; color: #ffffff; }
        </style>
      </head>
      <body>
        <div class="scorecard-card">
          <div class="sc-header">
            <span>${eventName} Ã¢â‚¬â€ ${roundStr} (DIVE ${diveCode} | DD ${dd})</span>
            ${olympicRingsSVG}
          </div>
          <div class="sc-athlete-row">
            <div class="ath-info">
              <div class="noc-pill"><span>${flag}</span> ${country}</div>
              <div class="ath-name">${athleteName}</div>
            </div>
            <div style="color:${accentColor}; font-size:22px; font-weight:900;">RANK: ${rank}</div>
          </div>
          <div class="sc-scores-row">
            <div class="judges-group">
              ${jItems}
            </div>
            <div class="totals-group">
              <div class="total-box">
                <span class="tot-lbl">DIVE PTS</span>
                <span class="tot-val" style="color:${accentColor};">${diveScore}</span>
              </div>
              <div class="total-box">
                <span class="tot-lbl">TOTAL SCORE</span>
                <span class="tot-val">${totalScore}</span>
              </div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // Ã¢â€â‚¬Ã¢â€â‚¬ 4. DV012 / DV014 - Standings / Results Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  if (normId.includes("dv012") || normId.includes("dv014") || normName.includes("standings") || normName.includes("results")) {
    const athletesList = customData.standings || [
      { rank: "1", name: "CAO YUAN", country: "CHN", flag: "Ã°Å¸â€¡Â¨Ã°Å¸â€¡Â³", score: "582.45" },
      { rank: "2", name: "RIKUTO TAMAI", country: "JPN", flag: "Ã°Å¸â€¡Â¯Ã°Å¸â€¡Âµ", score: "563.40" },
      { rank: "3", name: "TOM DALEY", country: "GBR", flag: "Ã°Å¸â€¡Â¬Ã°Å¸â€¡Â§", score: "556.95" },
      { rank: "4", name: "CASPAR CORER", country: "GBR", flag: "Ã°Å¸â€¡Â¬Ã°Å¸â€¡Â§", score: "520.10" },
      { rank: "5", name: "OLEKSIY SEREDA", country: "UKR", flag: "Ã°Å¸â€¡ÂºÃ°Å¸â€¡Â¦", score: "498.80" }
    ];

    const rows = athletesList.map((ath, idx) => `
      <div class="st-row ${idx === 0 ? 'leader-row' : ''}">
        <div class="st-rank">${ath.rank}</div>
        <div class="st-noc"><span>${ath.flag || ''}</span> ${ath.country}</div>
        <div class="st-name">${ath.name}</div>
        <div class="st-score">${ath.score}</div>
      </div>
    `).join('');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,700;0,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .standings-card {
            position: absolute; top: 120px; right: 140px;
            width: 680px; background: rgba(5, 18, 36, 0.96);
            border: 2px solid rgba(255,255,255,0.3); border-radius: 12px;
            box-shadow: 0 16px 40px rgba(0,0,0,0.75); overflow: hidden;
          }
          .st-header {
            background: linear-gradient(90deg, ${primaryColor} 0%, ${secondaryColor} 100%);
            padding: 14px 24px; display: flex; align-items: center; justify-content: space-between;
            color: #ffffff; font-size: 20px; font-weight: 900; letter-spacing: 1.5px;
          }
          .st-body { padding: 12px 16px; display: flex; flex-direction: column; gap: 8px; }
          .st-row {
            background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12);
            border-radius: 6px; height: 48px; padding: 0 16px;
            display: flex; align-items: center; gap: 16px; color: #ffffff;
          }
          .leader-row { background: rgba(255, 215, 0, 0.15); border-color: ${accentColor}; }
          .st-rank { width: 30px; font-weight: 900; font-size: 20px; color: ${accentColor}; text-align: center; }
          .st-noc { font-weight: 900; font-size: 16px; background: rgba(255,255,255,0.15); padding: 2px 8px; border-radius: 4px; display: flex; align-items: center; gap: 6px; }
          .st-name { flex: 1; font-weight: 800; font-size: 18px; letter-spacing: 0.5px; }
          .st-score { font-weight: 900; font-size: 22px; color: #ffffff; }
        </style>
      </head>
      <body>
        <div class="standings-card">
          <div class="st-header">
            <span>AQUATICS - DIVING STANDINGS</span>
            ${olympicRingsSVG}
          </div>
          <div class="st-body">
            ${rows}
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // Default fallback HTML
  const athleteName = (customData.athlete || "TOM DALEY").toUpperCase();
  const country = (customData.country || "GBR").toUpperCase();
  const flag = customData.flag || "Ã°Å¸â€¡Â¬Ã°Å¸â€¡Â§";
  const eventName = (customData.event || "MEN'S 10M PLATFORM").toUpperCase();
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="width:1920px;height:1080px;background:transparent;font-family:${font};">
      <div style="position:absolute;bottom:100px;left:140px;background:#051427;color:#fff;padding:20px 30px;border-radius:8px;border:2px solid ${primaryColor};">
        <h1 style="color:${accentColor};">${eventName}</h1>
        <h2>${flag} ${country} - ${athleteName}</h2>
      </div>
    </body>
    </html>
  `;
}

export async function generateDivingFabric(templateId = '', templateName = '', data = {}, sport = {}, customColors = {}, createProps, fabric) {
  const normId = (templateId || "").toLowerCase();
  const normName = (templateName || "").toLowerCase();

  if (normId.includes('dv002') || normId.includes('dv003') || normId.includes('dv004') || normId.includes('dv005') || normId.includes('dv006') || normId.includes('dv007')) {
    const group = await generateDiving2Fabric(templateId, data, customColors);
    if (group) return group;
  }

  // London 2012 OBS Diving colour system
  const NAVY   = '#0a1a3d';   // main dark navy background
  const BLUE   = '#1a4bbd';   // header gradient blue
  const BLUE2  = '#1565c0';   // slightly lighter header blue
  const SILVER = '#c8cfd8';   // silver/grey sub-stripe
  const WHITE  = '#ffffff';

  // Data defaults
  const athlete   = (data.athlete   || "TOM DALEY").toUpperCase();
  const noc       = (data.country   || "GBR").toUpperCase();
  const event     = (data.event     || "MEN'S 10M PLATFORM").toUpperCase();
  const round     = (data.round     || "FINAL").toUpperCase();
  const venue     = (data.venue     || sport.venue || "AQUATICS CENTRE").toUpperCase();
  const diveDesc  = (data.diveDesc  || "INWARD 3\u00BD SOMERSAULT").toUpperCase();
  const dd        = data.dd         || "3.0";
  const penalty   = data.penalty    || "0.00";
  const jScores   = data.jScores   || ["7.0", "7.5", "7.0", "7.5", "7.5", "7.5", "7.5"];
  const diveScore = data.diveScore  || "78.75";
  const rank      = data.rank       || "3";

  const objects = [];

  // â”€â”€â”€ Shared helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  // Diving pictogram circle (left badge)
  const makePicto = (left, top, height = 52) => {
    const w = height * 1.0;
    const bg = new fabric.Rect(createProps('rect', {
      left, top, width: w, height,
      fill: BLUE, rx: 4, ry: 4
    }));
    const icon = new fabric.Textbox('ðŸ¤¿', createProps('textbox', {
      left: left + 6, top: top + (height / 2) - 14,
      fontSize: 20, fill: WHITE, width: w - 10
    }));
    return [bg, icon];
  };

  // Olympic rings cluster (right side)
  const makeRings = (left, top) => {
    const ringData = [
      { dx: 0,  dy: 0,  color: '#38bdf8' },
      { dx: 14, dy: 0,  color: '#fbbf24' },
      { dx: 28, dy: 0,  color: WHITE },
      { dx: 7,  dy: 9,  color: '#4ade80' },
      { dx: 21, dy: 9,  color: '#f87171' }
    ];
    return ringData.map(r => new fabric.Circle(createProps('circle', {
      left: left + r.dx, top: top + r.dy,
      radius: 6, fill: 'transparent',
      stroke: r.color, strokeWidth: 2
    })));
  };

  // Standard LT band dimensions (scaled for 1920Ã—1080 preview at ~735px wide)
  // The London 2012 LT sits at bottom of screen: ~140px from left, y~868 top.
  const LT_LEFT   = 140;
  const LT_ROW_H  = 42;   // each row height
  const BAND1_TOP = 868;   // top band (header: pictogram + sport title + rings)
  const BAND2_TOP = BAND1_TOP + LT_ROW_H;
  const BAND3_TOP = BAND2_TOP + LT_ROW_H - 6;

  // â”€â”€â”€ DV002 Venue ID â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  //  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
  //  â”‚ [ðŸ¤¿]  AQUATICS CENTRE              [â—‹â—‹â—‹â—‹â—‹] â”‚  â† single dark blue band with slight gradient
  //  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
  if (normId.includes('dv002') || normName.includes('venue id')) {
    const bw = 580, bh = 52, bl = LT_LEFT + 20, bt = BAND1_TOP + 10;

    const mainBg = new fabric.Rect(createProps('rect', {
      left: bl, top: bt, width: bw, height: bh,
      fill: BLUE, rx: 3, ry: 3
    }));
    // dark gradient underlay
    const underline = new fabric.Rect(createProps('rect', {
      left: bl, top: bt + bh - 4, width: bw, height: 4,
      fill: SILVER
    }));
    const picto = makePicto(bl, bt, bh);
    const venueTxt = new fabric.Textbox(venue, createProps('textbox', {
      left: bl + 58, top: bt + 12,
      fontSize: 22, fontFamily: 'Arial', fontWeight: 'bold',
      fill: WHITE, width: 420, fontStyle: 'italic'
    }));
    const rings = makeRings(bl + bw - 58, bt + 14);
    objects.push(mainBg, underline, ...picto, venueTxt, ...rings);
  }

  // â”€â”€â”€ DV003 Event Schedule â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  //  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
  //  â”‚ [ðŸ¤¿]  DIVING                       [â—‹â—‹â—‹â—‹â—‹] â”‚  â† blue
  //  â”‚       AQUATICS CENTRE                        â”‚  â† silver/grey
  //  â”‚       WOMEN'S SYNCHRONISED 10M PLATFORM - FINAL â”‚  â† navy
  //  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
  else if (normId.includes('dv003') || normName.includes('event schedule')) {
    const bw = 580, bl = LT_LEFT + 20;
    // Band 1: blue header
    const b1 = new fabric.Rect(createProps('rect', {
      left: bl, top: BAND1_TOP, width: bw, height: LT_ROW_H,
      fill: BLUE, rx: 3, ry: 3
    }));
    const picto = makePicto(bl, BAND1_TOP, LT_ROW_H);
    const sportTxt = new fabric.Textbox('DIVING', createProps('textbox', {
      left: bl + 58, top: BAND1_TOP + 10,
      fontSize: 18, fontWeight: 'bold', fontStyle: 'italic',
      fill: WHITE, width: 360, fontFamily: 'Arial'
    }));
    const rings = makeRings(bl + bw - 58, BAND1_TOP + 12);

    // Band 2: silver venue
    const b2 = new fabric.Rect(createProps('rect', {
      left: bl, top: BAND2_TOP, width: bw, height: LT_ROW_H - 8,
      fill: SILVER
    }));
    const venueTxt = new fabric.Textbox(venue, createProps('textbox', {
      left: bl + 8, top: BAND2_TOP + 6,
      fontSize: 14, fontWeight: 'bold', fontStyle: 'italic',
      fill: NAVY, width: bw - 16, fontFamily: 'Arial'
    }));

    // Band 3: navy event
    const b3 = new fabric.Rect(createProps('rect', {
      left: bl, top: BAND3_TOP, width: bw, height: LT_ROW_H - 4,
      fill: NAVY
    }));
    const eventTxt = new fabric.Textbox(`${event} - ${round}`, createProps('textbox', {
      left: bl + 8, top: BAND3_TOP + 8,
      fontSize: 16, fontWeight: 'bold', fontStyle: 'italic',
      fill: WHITE, width: bw - 16, fontFamily: 'Arial'
    }));
    objects.push(b1, ...picto, sportTxt, ...rings, b2, venueTxt, b3, eventTxt);
  }

  // â”€â”€â”€ DV004 Start List â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  //  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
  //  â”‚ [ðŸ¤¿]  MEN'S 3M SPRINGBOARD         [â—‹â—‹â—‹â—‹â—‹] â”‚  â† blue header
  //  â”‚       DIVE ORDER - SEMI-FINAL                â”‚  â† dark sub-header
  //  â”‚ 1  ITA ðŸ³  NICOLA MARCONI                    â”‚  â† alternating rows
  //  â”‚ 2  RUS ðŸ³  ALEKSANDR DOBROSKOK               â”‚
  //  â”‚ ...                                           â”‚
  //  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
  else if (normId.includes('dv004') || normName.includes('start list')) {
    const bw = 580, bl = LT_LEFT + 20, bt = 200;
    const ROW_H = 36;

    // Header blue
    const headBg = new fabric.Rect(createProps('rect', {
      left: bl, top: bt, width: bw, height: LT_ROW_H + 2,
      fill: BLUE, rx: 3, ry: 3
    }));
    const picto = makePicto(bl, bt, LT_ROW_H + 2);
    const eventTxt = new fabric.Textbox(event, createProps('textbox', {
      left: bl + 58, top: bt + 10,
      fontSize: 18, fontWeight: 'bold', fontStyle: 'italic',
      fill: WHITE, width: 380, fontFamily: 'Arial'
    }));
    const rings = makeRings(bl + bw - 60, bt + 12);

    // Sub-header grey
    const subBg = new fabric.Rect(createProps('rect', {
      left: bl, top: bt + LT_ROW_H + 2, width: bw, height: 26,
      fill: '#1e2a4a'
    }));
    const subTxt = new fabric.Textbox(`DIVE ORDER - ${round}`, createProps('textbox', {
      left: bl + 8, top: bt + LT_ROW_H + 8,
      fontSize: 13, fontWeight: 'bold', fontStyle: 'italic',
      fill: '#aed6f1', width: bw - 16, fontFamily: 'Arial'
    }));

    const entries = data.startList || [
      { n: 1, noc: 'ITA', name: 'NICOLA MARCONI' },
      { n: 2, noc: 'RUS', name: 'ALEKSANDR DOBROSKOK' },
      { n: 3, noc: 'GER', name: 'PAVLO ROZENBERG' },
      { n: 4, noc: 'AUS', name: 'MATTHEW MITCHAM' },
      { n: 5, noc: 'COL', name: 'JUAN GUILLERMO URAN' },
      { n: 6, noc: 'CAN', name: 'REUBEN ROSS' },
      { n: 7, noc: 'USA', name: 'TROY DUMAIS' },
      { n: 8, noc: 'GER', name: 'PATRICK HAUSDING' },
      { n: 9, noc: 'JPN', name: 'KEN TERAUCHI' }
    ];
    const rowObjs = [];
    const rowsTop = bt + LT_ROW_H + 2 + 26;
    entries.forEach((e, i) => {
      const ty = rowsTop + i * ROW_H;
      const evenRow = i % 2 === 0;
      const rBg = new fabric.Rect(createProps('rect', {
        left: bl, top: ty, width: bw, height: ROW_H,
        fill: evenRow ? '#0d1f52' : '#0a1840'
      }));
      const numBg = new fabric.Rect(createProps('rect', {
        left: bl, top: ty, width: 26, height: ROW_H,
        fill: BLUE2
      }));
      const numTxt = new fabric.Textbox(String(e.n || e.order || i + 1), createProps('textbox', {
        left: bl + 2, top: ty + 8,
        fontSize: 14, fontWeight: 'bold',
        fill: WHITE, width: 22, textAlign: 'center', fontFamily: 'Arial'
      }));
      const nocTxt = new fabric.Textbox(e.noc, createProps('textbox', {
        left: bl + 32, top: ty + 8,
        fontSize: 13, fontWeight: 'bold',
        fill: WHITE, width: 38, fontFamily: 'Arial'
      }));
      const nameTxt = new fabric.Textbox(e.name || e.athlete, createProps('textbox', {
        left: bl + 90, top: ty + 8,
        fontSize: 15, fontWeight: 'bold', fontStyle: 'italic',
        fill: WHITE, width: bw - 100, fontFamily: 'Arial'
      }));
      rowObjs.push(rBg, numBg, numTxt, nocTxt, nameTxt);
    });
    objects.push(headBg, ...picto, eventTxt, ...rings, subBg, subTxt, ...rowObjs);
  }

  // â”€â”€â”€ DV005 Athlete / Pair ID â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  //  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
  //  â”‚  RUS [flag]  ALEKSANDR DOBROSKOK                       [â—‹â—‹â—‹â—‹â—‹]  â”‚  â† single blue band
  //  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
  else if (normId.includes('dv005') || normName.includes('athlete') || normName.includes('pair id')) {
    const bw = 600, bl = LT_LEFT + 10, bt = BAND1_TOP + 10, bh = 48;
    const mainBg = new fabric.Rect(createProps('rect', {
      left: bl, top: bt, width: bw, height: bh,
      fill: BLUE, rx: 3, ry: 3
    }));
    const nocBg = new fabric.Rect(createProps('rect', {
      left: bl, top: bt, width: 74, height: bh,
      fill: '#1a3a9c'
    }));
    const nocTxt = new fabric.Textbox(noc, createProps('textbox', {
      left: bl + 4, top: bt + 13,
      fontSize: 16, fontWeight: 'bold',
      fill: WHITE, width: 66, fontFamily: 'Arial'
    }));
    // Flag strip (simulated with a colored rectangle)
    const flagStrip = new fabric.Rect(createProps('rect', {
      left: bl + 74, top: bt, width: 40, height: bh,
      fill: '#d32f2f' // simplified flag red
    }));
    const flagStripe2 = new fabric.Rect(createProps('rect', {
      left: bl + 74, top: bt + bh / 2, width: 40, height: bh / 2,
      fill: '#1a3a9c'
    }));
    const nameTxt = new fabric.Textbox(athlete, createProps('textbox', {
      left: bl + 124, top: bt + 10,
      fontSize: 22, fontWeight: 'bold', fontStyle: 'italic',
      fill: WHITE, width: bw - 190, fontFamily: 'Arial'
    }));
    const rings = makeRings(bl + bw - 58, bt + 14);
    objects.push(mainBg, nocBg, nocTxt, flagStrip, flagStripe2, nameTxt, ...rings);
  }

  // â”€â”€â”€ DV008 Dive ID â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  //  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
  //  â”‚  BLR [flag]  SERGEI KUCHMASOV                          [â—‹â—‹â—‹â—‹â—‹]  â”‚  â† blue
  //  â”‚  ROUND 1      DIFFICULTY 3.4           TUCK POSITION            â”‚  â† silver/grey
  //  â”‚  INWARD 3Â½ SOMERSAULT                                            â”‚  â† navy
  //  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
  else if (normId.includes('dv008') || normName.includes('dive id')) {
    const bw = 580, bl = LT_LEFT + 20;
    const bh1 = 42, bh2 = 34, bh3 = 32;

    // Band 1 â€“ blue, noc + name + rings
    const b1 = new fabric.Rect(createProps('rect', {
      left: bl, top: BAND1_TOP, width: bw, height: bh1,
      fill: BLUE, rx: 3, ry: 3
    }));
    const nocBg = new fabric.Rect(createProps('rect', {
      left: bl, top: BAND1_TOP, width: 70, height: bh1,
      fill: '#1a3a9c'
    }));
    const nocTxt = new fabric.Textbox(noc, createProps('textbox', {
      left: bl + 4, top: BAND1_TOP + 11,
      fontSize: 15, fontWeight: 'bold',
      fill: WHITE, width: 62, fontFamily: 'Arial'
    }));
    const flagR = new fabric.Rect(createProps('rect', {
      left: bl + 70, top: BAND1_TOP, width: 36, height: bh1,
      fill: '#c0392b'
    }));
    const flagW = new fabric.Rect(createProps('rect', {
      left: bl + 70, top: BAND1_TOP + bh1 / 3, width: 36, height: bh1 / 3,
      fill: WHITE
    }));
    const nameTxt = new fabric.Textbox(athlete, createProps('textbox', {
      left: bl + 116, top: BAND1_TOP + 9,
      fontSize: 20, fontWeight: 'bold', fontStyle: 'italic',
      fill: WHITE, width: bw - 180, fontFamily: 'Arial'
    }));
    const rings = makeRings(bl + bw - 58, BAND1_TOP + 12);

    // Band 2 â€“ silver/grey: round + difficulty + position
    const b2 = new fabric.Rect(createProps('rect', {
      left: bl, top: BAND1_TOP + bh1, width: bw, height: bh2,
      fill: SILVER
    }));
    const roundTxt = new fabric.Textbox(round, createProps('textbox', {
      left: bl + 6, top: BAND1_TOP + bh1 + 7,
      fontSize: 13, fontWeight: 'bold', fontStyle: 'italic',
      fill: NAVY, width: 120, fontFamily: 'Arial'
    }));
    const ddTxt = new fabric.Textbox(`DIFFICULTY ${dd}`, createProps('textbox', {
      left: bl + 150, top: BAND1_TOP + bh1 + 7,
      fontSize: 13, fontWeight: 'bold', fontStyle: 'italic',
      fill: NAVY, width: 160, fontFamily: 'Arial'
    }));
    const penTxt = new fabric.Textbox(`PENALTY ${penalty}`, createProps('textbox', {
      left: bl + 330, top: BAND1_TOP + bh1 + 7,
      fontSize: 13, fontWeight: 'bold', fontStyle: 'italic',
      fill: NAVY, width: 140, fontFamily: 'Arial'
    }));
    const scoreLbl = new fabric.Textbox(`SCORE ${diveScore}`, createProps('textbox', {
      left: bl + bw - 130, top: BAND1_TOP + bh1 + 7,
      fontSize: 13, fontWeight: 'bold', fontStyle: 'italic',
      fill: NAVY, width: 128, textAlign: 'right', fontFamily: 'Arial'
    }));

    // Band 3 â€“ navy: dive description
    const b3 = new fabric.Rect(createProps('rect', {
      left: bl, top: BAND1_TOP + bh1 + bh2, width: bw, height: bh3,
      fill: NAVY
    }));
    const descTxt = new fabric.Textbox(diveDesc, createProps('textbox', {
      left: bl + 6, top: BAND1_TOP + bh1 + bh2 + 7,
      fontSize: 14, fontWeight: 'bold', fontStyle: 'italic',
      fill: WHITE, width: bw - 12, fontFamily: 'Arial'
    }));
    objects.push(b1, nocBg, nocTxt, flagR, flagW, nameTxt, ...rings, b2, roundTxt, ddTxt, penTxt, scoreLbl, b3, descTxt);
  }

  // â”€â”€â”€ DV010 Scorecard (Individual) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  //  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
  //  â”‚ [3]  RUS [flag]  ALEKSANDR DOBROSKOK                     [â—‹â—‹â—‹â—‹â—‹]  â”‚ â† blue
  //  â”‚  ROUND 1    DIFFICULTY 3.5    PENALTY 0.00       SCORE 78.75      â”‚ â† silver
  //  â”‚  7.0-  7.5-  7.0-  7.5-  7.5   7.5   7.5                         â”‚ â† navy/dark
  //  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
  else if (normId.includes('dv010') || normId.includes('dv011') || normName.includes('scorecard')) {
    const bw = 610, bl = LT_LEFT;
    const bh1 = 44, bh2 = 32, bh3 = 34;

    // Band 1 â€“ blue: rank badge + noc + name + rings
    const b1 = new fabric.Rect(createProps('rect', {
      left: bl, top: BAND1_TOP, width: bw, height: bh1,
      fill: BLUE, rx: 3, ry: 3
    }));
    // Rank box (navy square left of band)
    const rankBox = new fabric.Rect(createProps('rect', {
      left: bl, top: BAND1_TOP, width: 38, height: bh1,
      fill: NAVY, rx: 3, ry: 3
    }));
    const rankTxt = new fabric.Textbox(rank, createProps('textbox', {
      left: bl + 4, top: BAND1_TOP + 9,
      fontSize: 20, fontWeight: 'bold',
      fill: WHITE, width: 30, textAlign: 'center', fontFamily: 'Arial'
    }));
    const nocBg = new fabric.Rect(createProps('rect', {
      left: bl + 38, top: BAND1_TOP, width: 52, height: bh1,
      fill: '#1a3a9c'
    }));
    const nocT = new fabric.Textbox(noc, createProps('textbox', {
      left: bl + 40, top: BAND1_TOP + 12,
      fontSize: 14, fontWeight: 'bold',
      fill: WHITE, width: 48, fontFamily: 'Arial'
    }));
    const flagSt = new fabric.Rect(createProps('rect', {
      left: bl + 90, top: BAND1_TOP, width: 34, height: bh1,
      fill: '#c0392b'
    }));
    const flagMid = new fabric.Rect(createProps('rect', {
      left: bl + 90, top: BAND1_TOP + bh1 / 3, width: 34, height: bh1 / 3,
      fill: WHITE
    }));
    const nameTxt = new fabric.Textbox(athlete, createProps('textbox', {
      left: bl + 132, top: BAND1_TOP + 9,
      fontSize: 20, fontWeight: 'bold', fontStyle: 'italic',
      fill: WHITE, width: bw - 196, fontFamily: 'Arial'
    }));
    const rings = makeRings(bl + bw - 58, BAND1_TOP + 12);

    // Band 2 â€“ silver: round + difficulty + penalty + score
    const b2 = new fabric.Rect(createProps('rect', {
      left: bl, top: BAND1_TOP + bh1, width: bw, height: bh2,
      fill: SILVER
    }));
    const r2fields = [
      { label: `ROUND ${round.replace('ROUND ', '').replace('FINAL', '1')}`, x: bl + 6 },
      { label: `DIFFICULTY ${dd}`, x: bl + 110 },
      { label: `PENALTY ${penalty}`, x: bl + 260 },
      { label: `SCORE ${diveScore}`, x: bl + bw - 120, align: 'right', width: 114 }
    ];
    const r2Objs = r2fields.map(f => new fabric.Textbox(f.label, createProps('textbox', {
      left: f.x, top: BAND1_TOP + bh1 + 7,
      fontSize: 13, fontWeight: 'bold', fontStyle: 'italic',
      fill: NAVY, width: f.width || 140, textAlign: f.align || 'left', fontFamily: 'Arial'
    })));

    // Band 3 â€“ navy: 7 judge scores
    const b3 = new fabric.Rect(createProps('rect', {
      left: bl, top: BAND1_TOP + bh1 + bh2, width: bw, height: bh3,
      fill: NAVY
    }));
    const jObjs = jScores.map((sc, i) => new fabric.Textbox(sc, createProps('textbox', {
      left: bl + 6 + i * 80, top: BAND1_TOP + bh1 + bh2 + 7,
      fontSize: 14, fontWeight: 'bold', fontStyle: 'italic',
      fill: i < 2 ? '#7fb3d3' : WHITE,   // crossed-out judges shown lighter
      width: 76, textAlign: 'center', fontFamily: 'Arial',
      linethrough: i < 2   // lowest 2 are struck through per diving rules
    })));
    objects.push(b1, rankBox, rankTxt, nocBg, nocT, flagSt, flagMid, nameTxt, ...rings, b2, ...r2Objs, b3, ...jObjs);
  }

  // â”€â”€â”€ DV012 Winner / Place ID â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  //  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
  //  â”‚ [ðŸ¤¿]  DIVING                                           [â—‹â—‹â—‹â—‹â—‹]  â”‚ â† blue
  //  â”‚       WINNER - MEN'S 3M SPRINGBOARD                            â”‚ â† silver
  //  â”‚  CHN [flag]  HE CHONG                                           â”‚ â† navy
  //  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
  else if (normId.includes('dv012') || normName.includes('winner') || normName.includes('place id')) {
    const bw = 580, bl = LT_LEFT + 20;
    const bh1 = 42, bh2 = 30, bh3 = 38;

    const b1 = new fabric.Rect(createProps('rect', {
      left: bl, top: BAND1_TOP, width: bw, height: bh1,
      fill: BLUE, rx: 3, ry: 3
    }));
    const picto = makePicto(bl, BAND1_TOP, bh1);
    const sportTxt = new fabric.Textbox('DIVING', createProps('textbox', {
      left: bl + 56, top: BAND1_TOP + 10,
      fontSize: 19, fontWeight: 'bold', fontStyle: 'italic',
      fill: WHITE, width: 360, fontFamily: 'Arial'
    }));
    const rings = makeRings(bl + bw - 58, BAND1_TOP + 12);

    const b2 = new fabric.Rect(createProps('rect', {
      left: bl, top: BAND1_TOP + bh1, width: bw, height: bh2,
      fill: SILVER
    }));
    const winLbl = new fabric.Textbox(`WINNER - ${event}`, createProps('textbox', {
      left: bl + 8, top: BAND1_TOP + bh1 + 6,
      fontSize: 13, fontWeight: 'bold', fontStyle: 'italic',
      fill: NAVY, width: bw - 16, fontFamily: 'Arial'
    }));

    const b3 = new fabric.Rect(createProps('rect', {
      left: bl, top: BAND1_TOP + bh1 + bh2, width: bw, height: bh3,
      fill: NAVY
    }));
    const nocBg3 = new fabric.Rect(createProps('rect', {
      left: bl, top: BAND1_TOP + bh1 + bh2, width: 58, height: bh3,
      fill: BLUE2
    }));
    const nocT3 = new fabric.Textbox(noc, createProps('textbox', {
      left: bl + 2, top: BAND1_TOP + bh1 + bh2 + 9,
      fontSize: 14, fontWeight: 'bold',
      fill: WHITE, width: 54, fontFamily: 'Arial'
    }));
    const flagR3 = new fabric.Rect(createProps('rect', {
      left: bl + 58, top: BAND1_TOP + bh1 + bh2, width: 30, height: bh3,
      fill: '#c0392b'
    }));
    const flagW3 = new fabric.Rect(createProps('rect', {
      left: bl + 58, top: BAND1_TOP + bh1 + bh2 + bh3 / 3, width: 30, height: bh3 / 3,
      fill: WHITE
    }));
    const winName = new fabric.Textbox(athlete, createProps('textbox', {
      left: bl + 96, top: BAND1_TOP + bh1 + bh2 + 7,
      fontSize: 20, fontWeight: 'bold', fontStyle: 'italic',
      fill: WHITE, width: bw - 100, fontFamily: 'Arial'
    }));
    objects.push(b1, ...picto, sportTxt, ...rings, b2, winLbl, b3, nocBg3, nocT3, flagR3, flagW3, winName);
  }

  // â”€â”€â”€ DV014 Top 3â€“5 â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  else if (normId.includes('dv014') || normName.includes('top 3') || normName.includes('top 5')) {
    const bw = 580, bl = LT_LEFT + 20, bt = 260;
    const headH = 44, subH = 28, rowH = 36;

    const headBg = new fabric.Rect(createProps('rect', {
      left: bl, top: bt, width: bw, height: headH,
      fill: BLUE, rx: 3, ry: 3
    }));
    const picto = makePicto(bl, bt, headH);
    const evTxt = new fabric.Textbox(event, createProps('textbox', {
      left: bl + 56, top: bt + 10,
      fontSize: 18, fontWeight: 'bold', fontStyle: 'italic',
      fill: WHITE, width: 380, fontFamily: 'Arial'
    }));
    const rings = makeRings(bl + bw - 58, bt + 12);

    const subBg = new fabric.Rect(createProps('rect', {
      left: bl, top: bt + headH, width: bw, height: subH,
      fill: '#1e2a4a'
    }));
    const subTxt = new fabric.Textbox(`TOP 3 - ${round}`, createProps('textbox', {
      left: bl + 8, top: bt + headH + 6,
      fontSize: 13, fontWeight: 'bold', fontStyle: 'italic',
      fill: '#aed6f1', width: bw - 16, fontFamily: 'Arial'
    }));

    const standings = data.standings || [
      { rank: '1', noc: 'CHN', name: 'CAO YUAN', score: '582.45' },
      { rank: '2', noc: 'JPN', name: 'RIKUTO TAMAI', score: '563.40' },
      { rank: '3', noc: 'GBR', name: 'TOM DALEY', score: '556.95' }
    ];
    const rankBgColors = ['#c8a000', '#9e9e9e', '#cd7f32'];
    const rowObjs = [];
    standings.slice(0, 5).forEach((s, i) => {
      const ty = bt + headH + subH + i * rowH;
      const rBg = new fabric.Rect(createProps('rect', {
        left: bl, top: ty, width: bw, height: rowH,
        fill: i % 2 === 0 ? '#0d1f52' : '#0a1840'
      }));
      const rnkBg = new fabric.Rect(createProps('rect', {
        left: bl, top: ty, width: 26, height: rowH,
        fill: rankBgColors[i] || BLUE2
      }));
      const rnkT = new fabric.Textbox(String(s.rank || i + 1), createProps('textbox', {
        left: bl + 2, top: ty + 8,
        fontSize: 14, fontWeight: 'bold',
        fill: WHITE, width: 22, textAlign: 'center', fontFamily: 'Arial'
      }));
      const nocT = new fabric.Textbox(s.noc || s.country, createProps('textbox', {
        left: bl + 32, top: ty + 8,
        fontSize: 13, fontWeight: 'bold',
        fill: WHITE, width: 50, fontFamily: 'Arial'
      }));
      const flagR = new fabric.Rect(createProps('rect', {
        left: bl + 82, top: ty + 4, width: 28, height: rowH - 8,
        fill: '#c0392b'
      }));
      const nameT = new fabric.Textbox(s.name, createProps('textbox', {
        left: bl + 118, top: ty + 9,
        fontSize: 15, fontWeight: 'bold', fontStyle: 'italic',
        fill: WHITE, width: bw - 230, fontFamily: 'Arial'
      }));
      const scoreT = new fabric.Textbox(s.score, createProps('textbox', {
        left: bl + bw - 100, top: ty + 9,
        fontSize: 16, fontWeight: 'bold',
        fill: WHITE, width: 98, textAlign: 'right', fontFamily: 'Arial'
      }));
      rowObjs.push(rBg, rnkBg, rnkT, nocT, flagR, nameT, scoreT);
    });
    objects.push(headBg, ...picto, evTxt, ...rings, subBg, subTxt, ...rowObjs);
  }

  // â”€â”€â”€ DV015 Standings / Result â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  //  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
  //  â”‚ [ðŸ¤¿]  MEN'S 3M SPRINGBOARD                            [â—‹â—‹â—‹â—‹â—‹]  â”‚ â† blue header
  //  â”‚       PRELIMINARY - STANDINGS AFTER ROUND 6                    â”‚ â† dark sub
  //  â”‚ 1  CHN [f]  HE CHONG                              Q  515.50    â”‚ â† rows
  //  â”‚ ...                                                              â”‚
  //  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
  else if (normId.includes('dv015') || normName.includes('standings') || normName.includes('result')) {
    const bw = 580, bl = LT_LEFT + 20, bt = 200;
    const headH = 44, subH = 28, rowH = 36;

    const headBg = new fabric.Rect(createProps('rect', {
      left: bl, top: bt, width: bw, height: headH,
      fill: BLUE, rx: 3, ry: 3
    }));
    const picto = makePicto(bl, bt, headH);
    const evTxt = new fabric.Textbox(event, createProps('textbox', {
      left: bl + 56, top: bt + 10,
      fontSize: 18, fontWeight: 'bold', fontStyle: 'italic',
      fill: WHITE, width: 380, fontFamily: 'Arial'
    }));
    const rings = makeRings(bl + bw - 58, bt + 12);

    const subBg = new fabric.Rect(createProps('rect', {
      left: bl, top: bt + headH, width: bw, height: subH,
      fill: '#1e2a4a'
    }));
    const subTxt = new fabric.Textbox(`${round} - STANDINGS AFTER ROUND 6`, createProps('textbox', {
      left: bl + 8, top: bt + headH + 6,
      fontSize: 13, fontWeight: 'bold', fontStyle: 'italic',
      fill: '#aed6f1', width: bw - 16, fontFamily: 'Arial'
    }));

    const standings = data.standings || [
      { rank: '1', noc: 'CHN', name: 'HE CHONG', score: '515.50', q: 'Q' },
      { rank: '2', noc: 'CHN', name: 'QIN KAI', score: '502.95', q: 'Q' },
      { rank: '3', noc: 'MEX', name: 'YAHEL CASTILLO', score: '480.65', q: 'Q' },
      { rank: '4', noc: 'RUS', name: 'DMITRY SAUTIN', score: '474.85', q: 'Q' },
      { rank: '5', noc: 'FIN', name: 'JOONA PUHAKKA', score: '469.45', q: 'Q' },
      { rank: '6', noc: 'AUS', name: 'ROBERT NEWBERY', score: '465.15', q: 'Q' },
      { rank: '7', noc: 'USA', name: 'CHRIS COLWILL', score: '464.75', q: 'Q' },
      { rank: '8', noc: 'UKR', name: 'ILLYA KVASHA', score: '461.65', q: 'Q' },
      { rank: '9', noc: 'CAN', name: 'ALEXANDRE DESPATIE', score: '453.60', q: 'Q' },
      { rank: '10', noc: 'JPN', name: 'KEN TERAUCHI', score: '452.80', q: 'Q' }
    ];
    const rowObjs = [];
    standings.slice(0, 10).forEach((s, i) => {
      const ty = bt + headH + subH + i * rowH;
      const rBg = new fabric.Rect(createProps('rect', {
        left: bl, top: ty, width: bw, height: rowH,
        fill: i % 2 === 0 ? '#0d1f52' : '#0a1840'
      }));
      const rnkBg = new fabric.Rect(createProps('rect', {
        left: bl, top: ty, width: 26, height: rowH,
        fill: BLUE2
      }));
      const rnkT = new fabric.Textbox(String(s.rank || i + 1), createProps('textbox', {
        left: bl + 2, top: ty + 8,
        fontSize: 14, fontWeight: 'bold',
        fill: WHITE, width: 22, textAlign: 'center', fontFamily: 'Arial'
      }));
      const nocT = new fabric.Textbox(s.noc || s.country, createProps('textbox', {
        left: bl + 32, top: ty + 8,
        fontSize: 13, fontWeight: 'bold',
        fill: WHITE, width: 46, fontFamily: 'Arial'
      }));
      const flagR = new fabric.Rect(createProps('rect', {
        left: bl + 78, top: ty + 4, width: 28, height: rowH - 8,
        fill: '#c0392b', opacity: 0.85
      }));
      const nameT = new fabric.Textbox(s.name, createProps('textbox', {
        left: bl + 114, top: ty + 9,
        fontSize: 15, fontWeight: 'bold', fontStyle: 'italic',
        fill: WHITE, width: bw - 240, fontFamily: 'Arial'
      }));
      // Q qualifier badge
      const qBg = new fabric.Rect(createProps('rect', {
        left: bl + bw - 110, top: ty + 5, width: 22, height: rowH - 10,
        fill: '#27ae60', rx: 2, ry: 2
      }));
      const qT = new fabric.Textbox(s.q || 'Q', createProps('textbox', {
        left: bl + bw - 110, top: ty + 7,
        fontSize: 13, fontWeight: 'bold',
        fill: WHITE, width: 22, textAlign: 'center', fontFamily: 'Arial'
      }));
      const scoreT = new fabric.Textbox(s.score, createProps('textbox', {
        left: bl + bw - 82, top: ty + 9,
        fontSize: 15, fontWeight: 'bold',
        fill: WHITE, width: 80, textAlign: 'right', fontFamily: 'Arial'
      }));
      rowObjs.push(rBg, rnkBg, rnkT, nocT, flagR, nameT, qBg, qT, scoreT);
    });
    objects.push(headBg, ...picto, evTxt, ...rings, subBg, subTxt, ...rowObjs);
  }

  // â”€â”€â”€ Default: Athlete/Pair ID (same as DV005) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  else {
    const bw = 600, bl = LT_LEFT + 10, bt = BAND1_TOP + 10, bh = 48;
    const mainBg = new fabric.Rect(createProps('rect', {
      left: bl, top: bt, width: bw, height: bh,
      fill: BLUE, rx: 3, ry: 3
    }));
    const nocBg = new fabric.Rect(createProps('rect', {
      left: bl, top: bt, width: 74, height: bh,
      fill: '#1a3a9c'
    }));
    const nocTxt = new fabric.Textbox(noc, createProps('textbox', {
      left: bl + 4, top: bt + 13,
      fontSize: 16, fontWeight: 'bold',
      fill: WHITE, width: 66, fontFamily: 'Arial'
    }));
    const flagStrip = new fabric.Rect(createProps('rect', {
      left: bl + 74, top: bt, width: 40, height: bh,
      fill: '#d32f2f'
    }));
    const flagStripe2 = new fabric.Rect(createProps('rect', {
      left: bl + 74, top: bt + bh / 2, width: 40, height: bh / 2,
      fill: '#1a3a9c'
    }));
    const nameTxt = new fabric.Textbox(athlete, createProps('textbox', {
      left: bl + 124, top: bt + 10,
      fontSize: 22, fontWeight: 'bold', fontStyle: 'italic',
      fill: WHITE, width: bw - 190, fontFamily: 'Arial'
    }));
    const rings = makeRings(bl + bw - 58, bt + 14);
    objects.push(mainBg, nocBg, nocTxt, flagStrip, flagStripe2, nameTxt, ...rings);
  }

  const groupId = generateUniqueId({ type: 'group' });
  return new fabric.Group(objects, {
    id: groupId,
    class: groupId,
    selectable: true,
    hasControls: true,
    hasBorders: true,
    lockMovementX: false,
    lockMovementY: false,
    lockRotation: false,
    lockScalingX: false,
    lockScalingY: false,
    subTargetCheck: true,
    interactive: true,
    objectCaching: false
  });
}
