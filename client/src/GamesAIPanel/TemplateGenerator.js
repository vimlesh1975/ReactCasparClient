/**
 * Broadcast Graphic Template Generator
 * Generates 1920x1080 alpha-safe HTML/CSS broadcast templates and native Fabric.js vector objects.
 */

import * as fabric from 'fabric';
import { generateUniqueId } from '../common';

export function resolveCategory(templateType) {
  const normType = (templateType || "").toLowerCase();
  if (normType.includes("wind")) return "wind-indicator";
  if (normType.includes("split") || normType.includes("reaction") || normType.includes("500m")) return "split-times";
  if (normType.includes("attempt") || normType.includes("light")) return "attempt-board";
  if (normType.includes("stats") || normType.includes("player")) return "player-stats";
  if (normType.includes("sub")) return "substitution";
  if (normType.includes("breakdown") || normType.includes("apparatus")) return "score-breakdown";
  if (normType.includes("target") || normType.includes("set") || normType.includes("serve")) return "target-score";
  if (normType.includes("sb") || normType.includes("score")) return "scoreboard";
  if (normType.includes("start") || normType.includes("list") || normType.includes("lineup") || normType.includes("formation")) return "start-list";
  if (normType.includes("result") || normType.includes("tally") || normType.includes("rank") || normType.includes("standing") || normType.includes("order")) return "results-table";
  if (normType.includes("bug")) return "event-bug";
  return "lower-third";
}

export function generateBroadcastHTML(sport, templateType, customData = {}, styleOptions = {}) {
  const primaryColor = styleOptions.primaryColor || sport.primaryColor || "#005b96";
  const secondaryColor = styleOptions.secondaryColor || sport.secondaryColor || "#003366";
  const accentColor = styleOptions.accentColor || sport.accentColor || "#ffd700";
  const font = styleOptions.fontFamily || "'Outfit', 'Roboto', 'Segoe UI', sans-serif";

  const data = { ...sport.dataFields, ...customData };
  const sportTitle = sport.name.toUpperCase();
  const venueTitle = sport.venue.toUpperCase();
  const code = sport.code;

  const category = resolveCategory(templateType);

  switch (category) {
    case "wind-indicator":
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@600;800;900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }
            .wind-bug {
              position: absolute; bottom: 90px; right: 90px;
              background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor});
              color: white; padding: 12px 24px; border-radius: 8px;
              border-left: 6px solid ${accentColor}; box-shadow: 0 10px 30px rgba(0,0,0,0.5);
              display: flex; align-items: center; gap: 15px; font-weight: 800;
            }
          </style>
        </head>
        <body>
          <div class="wind-bug">
            <span style="color:${accentColor}; font-size: 24px;">💨 WIND</span>
            <span style="font-size: 28px;">${data.wind || "+1.5 m/s"}</span>
            <span style="font-size: 16px; opacity: 0.8;">${code}</span>
          </div>
        </body>
        </html>
      `;

    case "split-times":
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@600;800;900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }
            .split-card {
              position: absolute; top: 150px; left: 90px; width: 650px;
              background: rgba(15, 23, 42, 0.95); border-radius: 12px; overflow: hidden;
              border: 1px solid rgba(255,255,255,0.2); color: white;
            }
            .split-head {
              background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor});
              padding: 14px 20px; font-size: 22px; font-weight: 900; border-bottom: 4px solid ${accentColor};
              display: flex; justify-content: space-between;
            }
            .split-row {
              display: flex; justify-content: space-between; padding: 12px 20px;
              border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 18px; font-weight: 700;
            }
          </style>
        </head>
        <body>
          <div class="split-card">
            <div class="split-head">
              <span>${data.athlete || "COMPETITOR"} (${data.country || code})</span>
              <span style="color:${accentColor};">SPLIT TIMES</span>
            </div>
            <div class="split-row"><span>50m Split</span><span style="color:${accentColor};">23.45s</span></div>
            <div class="split-row"><span>100m Split</span><span style="color:${accentColor};">48.12s (+0.10)</span></div>
            <div class="split-row"><span>Reaction Time</span><span>0.64s</span></div>
          </div>
        </body>
        </html>
      `;

    case "attempt-board":
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@600;800;900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }
            .attempt-card {
              position: absolute; bottom: 90px; left: 90px;
              background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor});
              color: white; padding: 16px 28px; border-radius: 10px;
              border-bottom: 6px solid ${accentColor}; box-shadow: 0 10px 30px rgba(0,0,0,0.5);
              display: flex; align-items: center; gap: 20px; font-weight: 800;
            }
            .light { width: 22px; height: 22px; border-radius: 50%; display: inline-block; }
            .light-white { background: #ffffff; box-shadow: 0 0 10px #ffffff; }
            .light-red { background: #ef4444; box-shadow: 0 0 10px #ef4444; }
          </style>
        </head>
        <body>
          <div class="attempt-card">
            <div>
              <div style="font-size: 26px;">${data.athlete || "COMPETITOR"} (${data.country || code})</div>
              <div style="font-size: 16px; opacity: 0.8;">ATTEMPT: ${data.snatch || data.height || "175 kg"}</div>
            </div>
            <div style="display: flex; gap: 8px;">
              <span class="light light-white"></span>
              <span class="light light-white"></span>
              <span class="light light-red"></span>
            </div>
          </div>
        </body>
        </html>
      `;

    case "lower-third":
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800;900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body {
              width: 1920px;
              height: 1080px;
              overflow: hidden;
              background: transparent;
              font-family: ${font};
            }
            .lt-wrapper {
              position: absolute;
              bottom: 90px;
              left: 90px;
              display: flex;
              flex-direction: column;
              animation: slideIn 0.5s ease-out forwards;
            }
            @keyframes slideIn {
              from { transform: translateX(-100px); opacity: 0; }
              to { transform: translateX(0); opacity: 1; }
            }
            .top-bar {
              display: flex;
              align-items: center;
              background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor});
              color: white;
              padding: 10px 24px;
              border-left: 8px solid ${accentColor};
              border-radius: 4px 12px 0 0;
              box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            }
            .sport-code {
              background: ${accentColor};
              color: #000;
              font-weight: 900;
              padding: 4px 10px;
              border-radius: 4px;
              font-size: 18px;
              margin-right: 14px;
              letter-spacing: 1px;
            }
            .athlete-name {
              font-size: 34px;
              font-weight: 800;
              letter-spacing: 1px;
              text-transform: uppercase;
              text-shadow: 1px 1px 4px rgba(0,0,0,0.4);
            }
            .flag-badge {
              font-size: 28px;
              margin-left: 16px;
            }
            .bottom-bar {
              background: rgba(15, 23, 42, 0.92);
              color: #e2e8f0;
              padding: 8px 24px;
              font-size: 20px;
              font-weight: 600;
              border-radius: 0 0 12px 4px;
              display: flex;
              gap: 20px;
              border-left: 8px solid rgba(255,255,255,0.2);
              backdrop-filter: blur(8px);
            }
            .accent-text { color: ${accentColor}; font-weight: 800; }
          </style>
        </head>
        <body>
          <div class="lt-wrapper">
            <div class="top-bar">
              <span class="sport-code">${code}</span>
              <span class="athlete-name">${data.athlete || data.athleteA || "COMPETITOR NAME"}</span>
              <span class="flag-badge">${data.flag || "🏳️"} ${data.country || ""}</span>
            </div>
            <div class="bottom-bar">
              <span>${data.event || sportTitle}</span>
              ${data.rank ? `• <span class="accent-text">RANK: ${data.rank}</span>` : ''}
              ${data.time ? `• <span>TIME: ${data.time}</span>` : ''}
              ${data.score ? `• <span>SCORE: ${data.score}</span>` : ''}
            </div>
          </div>
        </body>
        </html>
      `;

    case "scoreboard":
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@600;800;900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body {
              width: 1920px;
              height: 1080px;
              overflow: hidden;
              background: transparent;
              font-family: ${font};
            }
            .sb-wrapper {
              position: absolute;
              top: 70px;
              left: 90px;
              display: flex;
              align-items: stretch;
              background: rgba(15, 23, 42, 0.95);
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 12px 35px rgba(0,0,0,0.6);
              border: 1px solid rgba(255,255,255,0.15);
              color: white;
            }
            .header-badge {
              background: ${primaryColor};
              padding: 12px 18px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              font-weight: 900;
              font-size: 16px;
              letter-spacing: 1px;
              border-right: 3px solid ${accentColor};
            }
            .team-box {
              display: flex;
              align-items: center;
              padding: 0 20px;
              gap: 15px;
              font-size: 24px;
              font-weight: 800;
            }
            .score-num {
              background: ${secondaryColor};
              color: ${accentColor};
              font-size: 28px;
              font-weight: 900;
              padding: 6px 14px;
              border-radius: 4px;
              min-width: 45px;
              text-align: center;
            }
            .divider { width: 1px; background: rgba(255,255,255,0.2); }
            .clock-box {
              background: rgba(30, 41, 59, 0.9);
              padding: 0 18px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              font-size: 16px;
              font-weight: 700;
              color: #94a3b8;
            }
            .clock-time { color: ${accentColor}; font-size: 20px; font-weight: 900; }
          </style>
        </head>
        <body>
          <div class="sb-wrapper">
            <div class="header-badge">
              <span>${code}</span>
              <span style="font-size:11px; opacity:0.8;">LOND 2012</span>
            </div>
            <div class="team-box">
              <span>${data.teamA || data.athleteA || "TEAM A"}</span>
              <span class="score-num">${data.scoreA || "0"}</span>
            </div>
            <div class="divider"></div>
            <div class="team-box">
              <span class="score-num">${data.scoreB || "0"}</span>
              <span>${data.teamB || data.athleteB || "TEAM B"}</span>
            </div>
            <div class="clock-box">
              <span>${data.period || "LIVE"}</span>
              <span class="clock-time">${data.clock || "00:00"}</span>
            </div>
          </div>
        </body>
        </html>
      `;

    case "start-list":
      const lineup = sport.lineup || [
        { lane: 1, name: "Competitor A", country: "GBR", time: "--" },
        { lane: 2, name: "Competitor B", country: "USA", time: "--" },
        { lane: 3, name: "Competitor C", country: "JAM", time: "--" },
        { lane: 4, name: "Competitor D", country: "GER", time: "--" },
        { lane: 5, name: "Competitor E", country: "FRA", time: "--" },
        { lane: 6, name: "Competitor F", country: "AUS", time: "--" }
      ];

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@600;800;900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body {
              width: 1920px;
              height: 1080px;
              overflow: hidden;
              background: transparent;
              font-family: ${font};
            }
            .sl-container {
              position: absolute;
              top: 150px;
              left: 90px;
              width: 800px;
              background: rgba(15, 23, 42, 0.95);
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 15px 40px rgba(0,0,0,0.7);
              border: 1px solid rgba(255,255,255,0.15);
              color: white;
            }
            .sl-header {
              background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor});
              padding: 16px 24px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-bottom: 4px solid ${accentColor};
            }
            .sl-title { font-size: 26px; font-weight: 900; text-transform: uppercase; }
            .sl-subtitle { font-size: 16px; color: ${accentColor}; font-weight: 700; }
            .row {
              display: flex;
              align-items: center;
              padding: 12px 24px;
              border-bottom: 1px solid rgba(255,255,255,0.08);
              font-size: 20px;
              font-weight: 700;
            }
            .row:nth-child(even) { background: rgba(255,255,255,0.03); }
            .lane-num {
              background: ${secondaryColor};
              color: ${accentColor};
              width: 36px;
              height: 36px;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
              margin-right: 20px;
              font-weight: 900;
              font-size: 18px;
            }
            .name { flex: 1; text-transform: uppercase; }
            .noc { background: rgba(255,255,255,0.1); padding: 4px 10px; border-radius: 4px; font-size: 16px; font-weight: 800; }
          </style>
        </head>
        <body>
          <div class="sl-container">
            <div class="sl-header">
              <div>
                <div class="sl-title">${sportTitle}</div>
                <div class="sl-subtitle">${data.event || 'START LIST'}</div>
              </div>
              <div style="font-weight:900; font-size:24px; color:${accentColor};">${code}</div>
            </div>
            ${lineup.map(item => `
              <div class="row">
                <div class="lane-num">${item.lane || item.rank || '•'}</div>
                <div class="name">${item.name}</div>
                <div class="noc">${item.country}</div>
              </div>
            `).join('')}
          </div>
        </body>
        </html>
      `;

    case "medal-tally":
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@600;800;900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body {
              width: 1920px;
              height: 1080px;
              overflow: hidden;
              background: transparent;
              font-family: ${font};
            }
            .tally-card {
              position: absolute;
              top: 180px;
              right: 100px;
              width: 550px;
              background: rgba(15, 23, 42, 0.95);
              border-radius: 12px;
              overflow: hidden;
              border: 1px solid rgba(255,255,255,0.2);
              box-shadow: 0 15px 40px rgba(0,0,0,0.6);
              color: white;
            }
            .tally-head {
              background: linear-gradient(135deg, ${primaryColor}, #0f172a);
              padding: 18px 24px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              border-bottom: 3px solid ${accentColor};
            }
            .head-title { font-size: 22px; font-weight: 900; letter-spacing: 1px; }
            .item-row {
              display: flex;
              align-items: center;
              padding: 14px 24px;
              border-bottom: 1px solid rgba(255,255,255,0.08);
              font-weight: 700;
              font-size: 20px;
            }
            .gold { color: #ffd700; }
            .silver { color: #c0c0c0; }
            .bronze { color: #cd7f32; }
            .cnt { margin-left: auto; display: flex; gap: 20px; font-weight: 900; }
          </style>
        </head>
        <body>
          <div class="tally-card">
            <div class="tally-head">
              <span class="head-title">MEDAL STANDINGS • LONDON 2012</span>
              <span style="color:${accentColor}; font-weight:900;">OBS</span>
            </div>
            <div class="item-row">
              <span>1. USA 🇺🇸</span>
              <div class="cnt">
                <span class="gold">46</span>
                <span class="silver">28</span>
                <span class="bronze">29</span>
              </div>
            </div>
            <div class="item-row">
              <span>2. CHINA 🇨🇳</span>
              <div class="cnt">
                <span class="gold">38</span>
                <span class="silver">31</span>
                <span class="bronze">22</span>
              </div>
            </div>
            <div class="item-row">
              <span>3. GREAT BRITAIN 🇬🇧</span>
              <div class="cnt">
                <span class="gold">29</span>
                <span class="silver">17</span>
                <span class="bronze">19</span>
              </div>
            </div>
          </div>
        </body>
        </html>
      `;

    case "results-table":
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@600;800;900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body {
              width: 1920px;
              height: 1080px;
              overflow: hidden;
              background: transparent;
              font-family: ${font};
            }
            .res-card {
              position: absolute;
              top: 150px;
              left: 90px;
              width: 750px;
              background: rgba(15, 23, 42, 0.95);
              border-radius: 12px;
              overflow: hidden;
              border: 1px solid rgba(255,255,255,0.2);
              color: white;
            }
            .res-head {
              background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor});
              padding: 16px 24px;
              font-size: 24px;
              font-weight: 900;
              border-bottom: 4px solid ${accentColor};
              display: flex;
              justify-content: space-between;
            }
            .res-row {
              display: flex;
              align-items: center;
              padding: 12px 24px;
              border-bottom: 1px solid rgba(255,255,255,0.08);
              font-size: 20px;
              font-weight: 700;
            }
            .badge-gold { background: #ffd700; color: #000; padding: 2px 10px; border-radius: 4px; font-weight: 900; }
            .badge-silver { background: #c0c0c0; color: #000; padding: 2px 10px; border-radius: 4px; font-weight: 900; }
            .badge-bronze { background: #cd7f32; color: #000; padding: 2px 10px; border-radius: 4px; font-weight: 900; }
          </style>
        </head>
        <body>
          <div class="res-card">
            <div class="res-head">
              <span>${sportTitle} RESULTS</span>
              <span style="color:${accentColor};">${code}</span>
            </div>
            <div class="res-row">
              <span class="badge-gold">1 GOLD</span>
              <span style="margin-left: 20px; flex: 1;">${data.athlete || "ATHLETE A"}</span>
              <span>${data.country || "USA"}</span>
              <span style="margin-left: 20px; color:${accentColor};">${data.time || data.score || "1st"}</span>
            </div>
            <div class="res-row">
              <span class="badge-silver">2 SILV</span>
              <span style="margin-left: 20px; flex: 1;">COMPETITOR B</span>
              <span>GBR</span>
              <span style="margin-left: 20px;">+0.12</span>
            </div>
            <div class="res-row">
              <span class="badge-bronze">3 BRNZ</span>
              <span style="margin-left: 20px; flex: 1;">COMPETITOR C</span>
              <span>GER</span>
              <span style="margin-left: 20px;">+0.35</span>
            </div>
          </div>
        </body>
        </html>
      `;

    case "event-bug":
    default:
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@600;800;900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body {
              width: 1920px;
              height: 1080px;
              overflow: hidden;
              background: transparent;
              font-family: ${font};
            }
            .bug-wrapper {
              position: absolute;
              top: 70px;
              right: 90px;
              background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor});
              color: white;
              padding: 10px 24px;
              border-radius: 6px;
              border-right: 6px solid ${accentColor};
              box-shadow: 0 10px 30px rgba(0,0,0,0.5);
              display: flex;
              align-items: center;
              gap: 15px;
            }
            .bug-code {
              background: ${accentColor};
              color: #000;
              font-weight: 900;
              padding: 4px 8px;
              border-radius: 4px;
              font-size: 16px;
            }
            .bug-text {
              font-size: 20px;
              font-weight: 800;
              letter-spacing: 1px;
              text-transform: uppercase;
            }
            .bug-sub {
              font-size: 13px;
              color: #cbd5e1;
              font-weight: 600;
            }
          </style>
        </head>
        <body>
          <div class="bug-wrapper">
            <span class="bug-code">${code}</span>
            <div>
              <div class="bug-text">${sportTitle}</div>
              <div class="bug-sub">${venueTitle}</div>
            </div>
          </div>
        </body>
        </html>
      `;
  }
}

/**
 * Generate Native Fabric.js Vector Graphic Objects
 */
export function createFabricGraphicGroup(sport, templateType, customData = {}, customColors = {}) {
  const primaryColor = customColors.primaryColor || sport.primaryColor || "#005b96";
  const secondaryColor = customColors.secondaryColor || sport.secondaryColor || "#003366";
  const accentColor = customColors.accentColor || sport.accentColor || "#ffd700";

  const data = { ...sport.dataFields, ...customData };
  const sportTitle = sport.name.toUpperCase();
  const venueTitle = sport.venue.toUpperCase();
  const code = sport.code;

  const objects = [];

  const createProps = (type, extra = {}) => {
    const id = generateUniqueId({ type });
    return {
      id,
      class: id,
      objectCaching: false,
      opacity: 1,
      visible: true,
      ...extra
    };
  };

  switch (resolveCategory(templateType)) {
    case 'lower-third': {
      const topBg = new fabric.Rect(createProps('rect', {
        left: 100, top: 850, width: 800, height: 70, fill: primaryColor, rx: 8, ry: 8
      }));
      const accentBorder = new fabric.Rect(createProps('rect', {
        left: 100, top: 850, width: 12, height: 70, fill: accentColor
      }));
      const codePill = new fabric.Rect(createProps('rect', {
        left: 125, top: 865, width: 65, height: 40, fill: accentColor, rx: 6, ry: 6
      }));
      const codeText = new fabric.Textbox(code, createProps('textbox', {
        left: 135, top: 872, fontSize: 20, fontWeight: 'bold', fill: '#000000', width: 45, textAlign: 'center'
      }));
      const nameText = new fabric.Textbox(data.athlete || data.athleteA || "COMPETITOR NAME", createProps('textbox', {
        left: 205, top: 865, fontSize: 32, fontWeight: 'bold', fill: '#ffffff', width: 550
      }));
      const countryText = new fabric.Textbox(data.country || "", createProps('textbox', {
        left: 770, top: 868, fontSize: 24, fontWeight: 'bold', fill: accentColor, width: 110, textAlign: 'right'
      }));

      const bottomBg = new fabric.Rect(createProps('rect', {
        left: 100, top: 925, width: 750, height: 50, fill: '#0f172a', rx: 6, ry: 6
      }));
      const bottomAccent = new fabric.Rect(createProps('rect', {
        left: 100, top: 925, width: 12, height: 50, fill: '#ffffff', opacity: 0.5
      }));
      const eventText = new fabric.Textbox(data.event || sportTitle, createProps('textbox', {
        left: 125, top: 935, fontSize: 20, fontWeight: 'bold', fill: '#e2e8f0', width: 450
      }));
      const infoText = new fabric.Textbox(
        data.rank ? `RANK: ${data.rank}` : (data.time ? `TIME: ${data.time}` : (data.score ? `SCORE: ${data.score}` : '')),
        createProps('textbox', {
          left: 580, top: 935, fontSize: 20, fontWeight: 'bold', fill: accentColor, width: 250, textAlign: 'right'
        })
      );

      objects.push(topBg, accentBorder, codePill, codeText, nameText, countryText, bottomBg, bottomAccent, eventText, infoText);
      break;
    }

    case 'scoreboard': {
      const mainBg = new fabric.Rect(createProps('rect', {
        left: 100, top: 100, width: 750, height: 80, fill: '#0f172a', rx: 10, ry: 10
      }));
      const badgeBg = new fabric.Rect(createProps('rect', {
        left: 100, top: 100, width: 100, height: 80, fill: primaryColor
      }));
      const badgeAccent = new fabric.Rect(createProps('rect', {
        left: 196, top: 100, width: 4, height: 80, fill: accentColor
      }));
      const codeText = new fabric.Textbox(code, createProps('textbox', {
        left: 100, top: 120, fontSize: 22, fontWeight: 'bold', fill: '#ffffff', width: 100, textAlign: 'center'
      }));
      const teamA = new fabric.Textbox(data.teamA || data.athleteA || "TEAM A", createProps('textbox', {
        left: 215, top: 124, fontSize: 24, fontWeight: 'bold', fill: '#ffffff', width: 195
      }));
      const scoreABg = new fabric.Rect(createProps('rect', {
        left: 420, top: 118, width: 55, height: 44, fill: secondaryColor, rx: 6, ry: 6
      }));
      const scoreAText = new fabric.Textbox(String(data.scoreA || "0"), createProps('textbox', {
        left: 420, top: 124, fontSize: 26, fontWeight: 'bold', fill: accentColor, width: 55, textAlign: 'center'
      }));
      const scoreBBg = new fabric.Rect(createProps('rect', {
        left: 490, top: 118, width: 55, height: 44, fill: secondaryColor, rx: 6, ry: 6
      }));
      const scoreBText = new fabric.Textbox(String(data.scoreB || "0"), createProps('textbox', {
        left: 490, top: 124, fontSize: 26, fontWeight: 'bold', fill: accentColor, width: 55, textAlign: 'center'
      }));
      const teamB = new fabric.Textbox(data.teamB || data.athleteB || "TEAM B", createProps('textbox', {
        left: 560, top: 124, fontSize: 24, fontWeight: 'bold', fill: '#ffffff', width: 165
      }));
      const clockBg = new fabric.Rect(createProps('rect', {
        left: 730, top: 100, width: 120, height: 80, fill: '#1e293b'
      }));
      const periodText = new fabric.Textbox(data.period || "LIVE", createProps('textbox', {
        left: 730, top: 115, fontSize: 14, fontWeight: 'bold', fill: '#94a3b8', width: 120, textAlign: 'center'
      }));
      const clockText = new fabric.Textbox(data.clock || "00:00", createProps('textbox', {
        left: 730, top: 140, fontSize: 20, fontWeight: 'bold', fill: accentColor, width: 120, textAlign: 'center'
      }));

      objects.push(mainBg, badgeBg, badgeAccent, codeText, teamA, scoreABg, scoreAText, scoreBBg, scoreBText, teamB, clockBg, periodText, clockText);
      break;
    }

    case 'start-list': {
      const lineup = sport.lineup || [
        { lane: 1, name: "COMPETITOR A", country: "GBR" },
        { lane: 2, name: "COMPETITOR B", country: "USA" },
        { lane: 3, name: "COMPETITOR C", country: "JAM" },
        { lane: 4, name: "COMPETITOR D", country: "GER" },
        { lane: 5, name: "COMPETITOR E", country: "FRA" },
        { lane: 6, name: "COMPETITOR F", country: "AUS" }
      ];

      const cardBg = new fabric.Rect(createProps('rect', {
        left: 100, top: 200, width: 800, height: 75 + lineup.length * 55, fill: '#0f172a', rx: 12, ry: 12
      }));
      const headerBg = new fabric.Rect(createProps('rect', {
        left: 100, top: 200, width: 800, height: 75, fill: primaryColor, rx: 12, ry: 12
      }));
      const headerAccent = new fabric.Rect(createProps('rect', {
        left: 100, top: 270, width: 800, height: 5, fill: accentColor
      }));
      const titleText = new fabric.Textbox(sportTitle, createProps('textbox', {
        left: 130, top: 215, fontSize: 26, fontWeight: 'bold', fill: '#ffffff', width: 550
      }));
      const subtitleText = new fabric.Textbox(data.event || 'START LIST', createProps('textbox', {
        left: 130, top: 245, fontSize: 16, fontWeight: 'bold', fill: accentColor, width: 550
      }));
      const codeHeader = new fabric.Textbox(code, createProps('textbox', {
        left: 750, top: 220, fontSize: 26, fontWeight: 'bold', fill: accentColor, width: 120, textAlign: 'center'
      }));

      objects.push(cardBg, headerBg, headerAccent, titleText, subtitleText, codeHeader);

      lineup.forEach((item, idx) => {
        const y = 275 + idx * 55;
        const rowBg = new fabric.Rect(createProps('rect', {
          left: 100, top: y, width: 800, height: 52, fill: idx % 2 === 0 ? '#1e293b' : '#0f172a'
        }));
        const circle = new fabric.Circle(createProps('circle', {
          left: 120, top: y + 8, radius: 18, fill: secondaryColor
        }));
        const laneText = new fabric.Textbox(String(item.lane || item.rank || (idx + 1)), createProps('textbox', {
          left: 120, top: y + 15, fontSize: 16, fontWeight: 'bold', fill: accentColor, width: 36, textAlign: 'center'
        }));
        const nameText = new fabric.Textbox(item.name.toUpperCase(), createProps('textbox', {
          left: 175, top: y + 13, fontSize: 20, fontWeight: 'bold', fill: '#ffffff', width: 600
        }));
        const nocBg = new fabric.Rect(createProps('rect', {
          left: 800, top: y + 12, width: 70, height: 28, fill: '#334155', rx: 4, ry: 4
        }));
        const nocText = new fabric.Textbox(item.country, createProps('textbox', {
          left: 800, top: y + 16, fontSize: 16, fontWeight: 'bold', fill: '#ffffff', width: 70, textAlign: 'center'
        }));

        objects.push(rowBg, circle, laneText, nameText, nocBg, nocText);
      });
      break;
    }

    case 'results-table': {
      const cardBg = new fabric.Rect(createProps('rect', {
        left: 100, top: 200, width: 750, height: 270, fill: '#0f172a', rx: 12, ry: 12
      }));
      const headerBg = new fabric.Rect(createProps('rect', {
        left: 100, top: 200, width: 750, height: 70, fill: primaryColor, rx: 12, ry: 12
      }));
      const headerAccent = new fabric.Rect(createProps('rect', {
        left: 100, top: 265, width: 750, height: 5, fill: accentColor
      }));
      const titleText = new fabric.Textbox(`${sportTitle} RESULTS`, createProps('textbox', {
        left: 130, top: 220, fontSize: 24, fontWeight: 'bold', fill: '#ffffff', width: 500
      }));
      const codeHeader = new fabric.Textbox(code, createProps('textbox', {
        left: 720, top: 220, fontSize: 24, fontWeight: 'bold', fill: accentColor, width: 100, textAlign: 'center'
      }));

      // Gold
      const goldPill = new fabric.Rect(createProps('rect', {
        left: 125, top: 290, width: 90, height: 30, fill: '#ffd700', rx: 4, ry: 4
      }));
      const goldPillText = new fabric.Textbox("1 GOLD", createProps('textbox', {
        left: 125, top: 295, fontSize: 16, fontWeight: 'bold', fill: '#000000', width: 90, textAlign: 'center'
      }));
      const goldAthlete = new fabric.Textbox(data.athlete || "ATHLETE A", createProps('textbox', {
        left: 240, top: 292, fontSize: 20, fontWeight: 'bold', fill: '#ffffff', width: 400
      }));
      const goldNoc = new fabric.Textbox(data.country || "USA", createProps('textbox', {
        left: 650, top: 292, fontSize: 18, fontWeight: 'bold', fill: '#cbd5e1', width: 80
      }));
      const goldTime = new fabric.Textbox(data.time || data.score || "1st", createProps('textbox', {
        left: 730, top: 292, fontSize: 20, fontWeight: 'bold', fill: accentColor, width: 100, textAlign: 'right'
      }));

      // Silver
      const silverPill = new fabric.Rect(createProps('rect', {
        left: 125, top: 353, width: 90, height: 30, fill: '#c0c0c0', rx: 4, ry: 4
      }));
      const silverPillText = new fabric.Textbox("2 SILV", createProps('textbox', {
        left: 125, top: 358, fontSize: 16, fontWeight: 'bold', fill: '#000000', width: 90, textAlign: 'center'
      }));
      const silverAthlete = new fabric.Textbox("COMPETITOR B", createProps('textbox', {
        left: 240, top: 355, fontSize: 20, fontWeight: 'bold', fill: '#ffffff', width: 400
      }));
      const silverNoc = new fabric.Textbox("GBR", createProps('textbox', {
        left: 650, top: 355, fontSize: 18, fontWeight: 'bold', fill: '#cbd5e1', width: 80
      }));
      const silverTime = new fabric.Textbox("+0.12", createProps('textbox', {
        left: 730, top: 355, fontSize: 20, fontWeight: 'bold', fill: '#ffffff', width: 100, textAlign: 'right'
      }));

      // Bronze
      const bronzePill = new fabric.Rect(createProps('rect', {
        left: 125, top: 416, width: 90, height: 30, fill: '#cd7f32', rx: 4, ry: 4
      }));
      const bronzePillText = new fabric.Textbox("3 BRNZ", createProps('textbox', {
        left: 125, top: 421, fontSize: 16, fontWeight: 'bold', fill: '#000000', width: 90, textAlign: 'center'
      }));
      const bronzeAthlete = new fabric.Textbox("COMPETITOR C", createProps('textbox', {
        left: 240, top: 418, fontSize: 20, fontWeight: 'bold', fill: '#ffffff', width: 400
      }));
      const bronzeNoc = new fabric.Textbox("GER", createProps('textbox', {
        left: 650, top: 418, fontSize: 18, fontWeight: 'bold', fill: '#cbd5e1', width: 80
      }));
      const bronzeTime = new fabric.Textbox("+0.35", createProps('textbox', {
        left: 730, top: 418, fontSize: 20, fontWeight: 'bold', fill: '#ffffff', width: 100, textAlign: 'right'
      }));

      objects.push(cardBg, headerBg, headerAccent, titleText, codeHeader, goldPill, goldPillText, goldAthlete, goldNoc, goldTime, silverPill, silverPillText, silverAthlete, silverNoc, silverTime, bronzePill, bronzePillText, bronzeAthlete, bronzeNoc, bronzeTime);
      break;
    }

    case 'medal-tally': {
      const cardBg = new fabric.Rect(createProps('rect', {
        left: 1150, top: 200, width: 620, height: 290, fill: '#0f172a', rx: 12, ry: 12
      }));
      const headerBg = new fabric.Rect(createProps('rect', {
        left: 1150, top: 200, width: 620, height: 70, fill: primaryColor, rx: 12, ry: 12
      }));
      const headerAccent = new fabric.Rect(createProps('rect', {
        left: 1150, top: 265, width: 620, height: 5, fill: accentColor
      }));
      const titleText = new fabric.Textbox("MEDAL STANDINGS • LONDON 2012", createProps('textbox', {
        left: 1175, top: 222, fontSize: 22, fontWeight: 'bold', fill: '#ffffff', width: 480
      }));
      const codeHeader = new fabric.Textbox("OBS", createProps('textbox', {
        left: 1680, top: 222, fontSize: 22, fontWeight: 'bold', fill: accentColor, width: 70, textAlign: 'center'
      }));

      const goldHdr = new fabric.Textbox("GOLD", createProps('textbox', {
        left: 1560, top: 280, fontSize: 14, fontWeight: 'bold', fill: '#ffd700', width: 60, textAlign: 'center'
      }));
      const silvHdr = new fabric.Textbox("SILV", createProps('textbox', {
        left: 1620, top: 280, fontSize: 14, fontWeight: 'bold', fill: '#c0c0c0', width: 60, textAlign: 'center'
      }));
      const brnzHdr = new fabric.Textbox("BRNZ", createProps('textbox', {
        left: 1680, top: 280, fontSize: 14, fontWeight: 'bold', fill: '#cd7f32', width: 60, textAlign: 'center'
      }));

      // Row 1 USA
      const row1Name = new fabric.Textbox("1. UNITED STATES (USA)", createProps('textbox', {
        left: 1175, top: 310, fontSize: 18, fontWeight: 'bold', fill: '#ffffff', width: 370
      }));
      const row1G = new fabric.Textbox("46", createProps('textbox', { left: 1560, top: 310, fontSize: 20, fontWeight: 'bold', fill: '#ffd700', width: 60, textAlign: 'center' }));
      const row1S = new fabric.Textbox("28", createProps('textbox', { left: 1620, top: 310, fontSize: 20, fontWeight: 'bold', fill: '#c0c0c0', width: 60, textAlign: 'center' }));
      const row1B = new fabric.Textbox("29", createProps('textbox', { left: 1680, top: 310, fontSize: 20, fontWeight: 'bold', fill: '#cd7f32', width: 60, textAlign: 'center' }));

      // Row 2 CHN
      const row2Name = new fabric.Textbox("2. CHINA (CHN)", createProps('textbox', {
        left: 1175, top: 360, fontSize: 18, fontWeight: 'bold', fill: '#ffffff', width: 370
      }));
      const row2G = new fabric.Textbox("38", createProps('textbox', { left: 1560, top: 360, fontSize: 20, fontWeight: 'bold', fill: '#ffd700', width: 60, textAlign: 'center' }));
      const row2S = new fabric.Textbox("31", createProps('textbox', { left: 1620, top: 360, fontSize: 20, fontWeight: 'bold', fill: '#c0c0c0', width: 60, textAlign: 'center' }));
      const row2B = new fabric.Textbox("22", createProps('textbox', { left: 1680, top: 360, fontSize: 20, fontWeight: 'bold', fill: '#cd7f32', width: 60, textAlign: 'center' }));

      // Row 3 GBR
      const row3Name = new fabric.Textbox("3. GREAT BRITAIN (GBR)", createProps('textbox', {
        left: 1175, top: 410, fontSize: 18, fontWeight: 'bold', fill: '#ffffff', width: 370
      }));
      const row3G = new fabric.Textbox("29", createProps('textbox', { left: 1560, top: 410, fontSize: 20, fontWeight: 'bold', fill: '#ffd700', width: 60, textAlign: 'center' }));
      const row3S = new fabric.Textbox("17", createProps('textbox', { left: 1620, top: 410, fontSize: 20, fontWeight: 'bold', fill: '#c0c0c0', width: 60, textAlign: 'center' }));
      const row3B = new fabric.Textbox("19", createProps('textbox', { left: 1680, top: 410, fontSize: 20, fontWeight: 'bold', fill: '#cd7f32', width: 60, textAlign: 'center' }));

      objects.push(cardBg, headerBg, headerAccent, titleText, codeHeader, goldHdr, silvHdr, brnzHdr, row1Name, row1G, row1S, row1B, row2Name, row2G, row2S, row2B, row3Name, row3G, row3S, row3B);
      break;
    }

    case 'event-bug':
    default: {
      const bugBg = new fabric.Rect(createProps('rect', {
        left: 1250, top: 100, width: 550, height: 70, fill: primaryColor, rx: 8, ry: 8
      }));
      const rightBorder = new fabric.Rect(createProps('rect', {
        left: 1792, top: 100, width: 8, height: 70, fill: accentColor
      }));
      const codePill = new fabric.Rect(createProps('rect', {
        left: 1270, top: 115, width: 50, height: 40, fill: accentColor, rx: 4, ry: 4
      }));
      const codeText = new fabric.Textbox(code, createProps('textbox', {
        left: 1270, top: 124, fontSize: 18, fontWeight: 'bold', fill: '#000000', width: 50, textAlign: 'center'
      }));
      const titleText = new fabric.Textbox(sportTitle, createProps('textbox', {
        left: 1340, top: 115, fontSize: 22, fontWeight: 'bold', fill: '#ffffff', width: 440
      }));
      const venueText = new fabric.Textbox(venueTitle, createProps('textbox', {
        left: 1340, top: 142, fontSize: 14, fontWeight: 'bold', fill: '#cbd5e1', width: 440
      }));

      objects.push(bugBg, rightBorder, codePill, codeText, titleText, venueText);
      break;
    }
  }

  const groupId = generateUniqueId({ type: 'group' });
  const group = new fabric.Group(objects, {
    id: groupId,
    class: groupId,
    subTargetCheck: true,
    objectCaching: false
  });

  return group;
}
