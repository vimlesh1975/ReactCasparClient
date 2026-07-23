/**
 * Broadcast Graphic Template Generator
 * Generates 1920x1080 alpha-safe HTML/CSS broadcast templates and native Fabric.js vector objects.
 */

import * as fabric from 'fabric';
import { generateUniqueId } from '../common';

const RANDOM_ATHLETES_POOL = [
  { name: "Usain Bolt", country: "JAM" },
  { name: "Michael Phelps", country: "USA" },
  { name: "Yohan Blake", country: "JAM" },
  { name: "Justin Gatlin", country: "USA" },
  { name: "Richard Thompson", country: "TRI" },
  { name: "Ryan Bailey", country: "USA" },
  { name: "Churandy Martina", country: "NED" },
  { name: "Asafa Powell", country: "JAM" },
  { name: "Su Bingtian", country: "CHN" },
  { name: "Marcell Jacobs", country: "ITA" },
  { name: "Andre De Grasse", country: "CAN" },
  { name: "Trayvon Bromell", country: "USA" },
  { name: "Akani Simbine", country: "RSA" },
  { name: "Fred Kerley", country: "USA" },
  { name: "Noah Lyles", country: "USA" }
];

export function get11PlayerLineup(sport) {
  const existing = sport && sport.lineup ? [...sport.lineup] : [];
  const result = [];
  for (let i = 0; i < 11; i++) {
    if (existing[i]) {
      result.push({
        lane: existing[i].lane || (i + 1),
        name: existing[i].name,
        country: existing[i].country || "NOC"
      });
    } else {
      const poolItem = RANDOM_ATHLETES_POOL[i % RANDOM_ATHLETES_POOL.length];
      result.push({
        lane: i + 1,
        name: poolItem.name,
        country: poolItem.country
      });
    }
  }
  return result;
}

export function resolveCategory(templateType, templateName = '') {
  const normType = (templateType || "").toLowerCase();
  const normName = (templateName || "").toLowerCase();
  const combined = `${normType} ${normName}`;

  if (combined.includes("clock") || combined.includes("timer")) return "race-clock";
  if (combined.includes("presenter")) return "medal-presenter";
  if (combined.includes("medal") || combined.includes("medals") || combined.includes("podium")) return "medal-tally";
  if (combined.includes("position")) return "position-on-screen";
  if (combined.includes("venue") || combined.includes("location")) return "venue-id";
  if (combined.includes("weather")) return "weather";
  if (combined.includes("schedule")) return "event-schedule";
  if (combined.includes("wind")) return "wind-indicator";
  if (combined.includes("split") || combined.includes("reaction") || combined.includes("500m")) return "split-times";
  if (combined.includes("attempt") || combined.includes("light")) return "attempt-board";
  if (combined.includes("stats") || combined.includes("player")) return "player-stats";
  if (combined.includes("sub")) return "substitution";
  if (combined.includes("breakdown") || combined.includes("apparatus")) return "score-breakdown";
  if (combined.includes("target") || combined.includes("set") || combined.includes("serve")) return "target-score";
  if (combined.includes("start") || combined.includes("list") || combined.includes("lineup") || combined.includes("formation")) return "start-list";
  if (combined.includes("result") || combined.includes("tally") || combined.includes("rank") || combined.includes("standing") || combined.includes("order")) return "results-table";
  if (combined.includes("bug")) return "event-bug";
  if (combined.includes("sb") || combined.includes("score")) return "scoreboard";
  return "lower-third";
}

export function generateBroadcastHTML(sport, templateType, customData = {}, styleOptions = {}, templateId = '', templateName = '') {
  const primaryColor = styleOptions.primaryColor || sport.primaryColor || "#005b96";
  const secondaryColor = styleOptions.secondaryColor || sport.secondaryColor || "#003366";
  const accentColor = styleOptions.accentColor || sport.accentColor || "#ffd700";
  const font = styleOptions.fontFamily || "'Outfit', 'Roboto', 'Segoe UI', sans-serif";

  const data = { ...sport.dataFields, ...customData };
  const sportTitle = sport.name.toUpperCase();
  const venueTitle = (data.venue || sport.venue || "OLYMPIC STADIUM").toUpperCase();
  const locationName = (data.location || "LONDON, UNITED KINGDOM").toUpperCase();
  const code = sport.code;

  const category = resolveCategory(templateType, templateName);

  // Derive a 1-based variant index from the template ID numeric suffix
  // e.g. CF001 → 1, AT003 → 3, SW007 → 7  → mapped to variant 1-5
  const idNum = parseInt((templateId || '').replace(/\D/g, '')) || 1;
  // We use a 5-variant cycle so each template in a sub-category looks different
  const variant = ((idNum - 1) % 5) + 1;

  switch (category) {
    case "position-on-screen": {
      const athlete1 = data.athlete || data.athleteA || "MICHAEL PHELPS";
      const country1 = data.country || "USA";
      const time1 = data.time || "50.58";
      const rank1 = data.rank || "1st";

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@600;800;900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }
            .pos-card {
              position: absolute; top: 70px; left: 90px;
              display: flex; align-items: center; gap: 0;
              border-radius: 8px; overflow: hidden;
              box-shadow: 0 10px 30px rgba(0,0,0,0.6);
            }
            .pos-label {
              background: ${primaryColor}; color: white; padding: 12px 20px;
              font-size: 14px; font-weight: 900; letter-spacing: 2px;
              border-right: 3px solid ${accentColor}; text-transform: uppercase;
            }
            .pos-item {
              background: rgba(15,23,42,0.95); color: white; padding: 10px 24px;
              font-size: 20px; font-weight: 900; border-right: 1px solid rgba(255,255,255,0.1);
              display: flex; align-items: center; gap: 12px;
            }
            .pos-item.leading { background: ${secondaryColor}; color: ${accentColor}; }
            .pos-rank { font-size: 16px; background: ${accentColor}; color: #000; padding: 2px 8px; border-radius: 4px; font-weight: 900; }
            .pos-time { font-size: 15px; color: #cbd5e1; font-weight: 700; margin-left: 8px; }
            .pos-code { background: ${accentColor}; color: #000; padding: 12px 18px; font-size: 15px; font-weight: 900; }
          </style>
        </head>
        <body>
          <div class="pos-card">
            <div class="pos-label">LIVE POSITION</div>
            <div class="pos-item leading">
              <span class="pos-rank">${rank1}</span>
              <span>${athlete1.toUpperCase()} (${country1.toUpperCase()})</span>
              <span class="pos-time">${time1}</span>
            </div>
            <div class="pos-item">
              <span style="color:#94a3b8;">2nd</span>
              <span>CHAD LE CLOS (RSA)</span>
              <span class="pos-time">+0.25</span>
            </div>
            <div class="pos-item">
              <span style="color:#94a3b8;">3rd</span>
              <span>MILORAD ČAVIĆ (SRB)</span>
              <span class="pos-time">+0.66</span>
            </div>
            <div class="pos-code">${code}</div>
          </div>
        </body>
        </html>
      `;
    }
    case "venue-id":
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@600;800;900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }
            .venue-container {
              position: absolute; bottom: 120px; left: 120px;
              display: flex; flex-direction: column;
              box-shadow: 0 20px 50px rgba(0,0,0,0.6);
            }
            .venue-main-bar {
              background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor});
              color: white; padding: 16px 36px; border-radius: 8px 8px 0 0;
              border-left: 8px solid ${accentColor};
              display: flex; align-items: center; gap: 20px;
            }
            .venue-icon { font-size: 32px; color: ${accentColor}; }
            .venue-title { font-size: 34px; font-weight: 900; letter-spacing: 1px; text-transform: uppercase; }
            .venue-sub-bar {
              background: rgba(15,23,42,0.95); color: #cbd5e1;
              padding: 10px 36px; border-radius: 0 0 8px 8px;
              border-left: 8px solid ${primaryColor};
              font-size: 18px; font-weight: 800; letter-spacing: 1.5px;
              display: flex; justify-content: space-between; align-items: center; gap: 20px;
            }
            .venue-code { background: ${accentColor}; color: #000000; padding: 2px 8px; border-radius: 4px; font-weight: 900; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="venue-container">
            <div class="venue-main-bar">
              <span class="venue-icon">🏟️</span>
              <span class="venue-title">${venueTitle}</span>
            </div>
            <div class="venue-sub-bar">
              <span>📍 ${locationName} • ${sportTitle}</span>
              <span class="venue-code">${code}</span>
            </div>
          </div>
        </body>
        </html>
      `;
    case "event-schedule":
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@600;800;900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }
            .sched-card {
              position: absolute; top: 140px; left: 90px; width: 720px;
              background: rgba(15,23,42,0.95); border-radius: 12px; overflow: hidden;
              border: 1px solid rgba(255,255,255,0.2); color: white;
              box-shadow: 0 15px 40px rgba(0,0,0,0.6);
            }
            .sched-head {
              background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor});
              padding: 16px 24px; font-size: 22px; font-weight: 900;
              border-bottom: 4px solid ${accentColor}; display: flex; justify-content: space-between; align-items: center;
            }
            .sched-body { padding: 12px 0; }
            .sched-row {
              display: flex; align-items: center; justify-content: space-between;
              padding: 14px 24px; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 16px; font-weight: 700;
            }
            .sched-row:last-child { border-bottom: none; }
            .sched-time { color: ${accentColor}; font-weight: 900; width: 80px; }
            .sched-name { flex: 1; margin: 0 16px; color: #ffffff; }
            .sched-badge {
              font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 20px;
              text-transform: uppercase; letter-spacing: 0.5px;
            }
            .status-done { background: rgba(34,197,94,0.2); color: #4ade80; border: 1px solid rgba(74,222,128,0.4); }
            .status-live { background: rgba(56,189,248,0.2); color: #38bdf8; border: 1px solid rgba(56,189,248,0.4); }
            .status-next { background: rgba(250,204,21,0.2); color: #facc15; border: 1px solid rgba(250,204,21,0.4); }
          </style>
        </head>
        <body>
          <div class="sched-card">
            <div class="sched-head">
              <span>🗓️ EVENT SCHEDULE</span>
              <span style="font-size:16px; color:${accentColor};">${sportTitle} • ${venueTitle}</span>
            </div>
            <div class="sched-body">
              <div class="sched-row">
                <span class="sched-time">09:30</span>
                <span class="sched-name">${data.event || "Preliminary Round / Heats"}</span>
                <span class="sched-badge status-done">COMPLETED</span>
              </div>
              <div class="sched-row">
                <span class="sched-time">10:45</span>
                <span class="sched-name">Quarter-Finals Draw</span>
                <span class="sched-badge status-done">COMPLETED</span>
              </div>
              <div class="sched-row">
                <span class="sched-time">14:00</span>
                <span class="sched-name">Semi-Finals Phase</span>
                <span class="sched-badge status-live">LIVE / NEXT</span>
              </div>
              <div class="sched-row">
                <span class="sched-time">16:30</span>
                <span class="sched-name">Gold Medal Final & Victory Ceremony</span>
                <span class="sched-badge status-next">UPCOMING</span>
              </div>
            </div>
          </div>
        </body>
        </html>
      `;
    case "weather":
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@600;800;900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }
            .weather-card {
              position: absolute; top: 150px; left: 90px; width: 680px;
              background: rgba(15,23,42,0.95); border-radius: 12px; overflow: hidden;
              border: 1px solid rgba(255,255,255,0.2); color: white;
              box-shadow: 0 15px 40px rgba(0,0,0,0.6);
            }
            .weather-head {
              background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor});
              padding: 16px 24px; font-size: 22px; font-weight: 900;
              border-bottom: 4px solid ${accentColor}; display: flex; justify-content: space-between; align-items: center;
            }
            .weather-body { padding: 20px 24px; display: flex; flex-direction: column; gap: 16px; }
            .weather-main { display: flex; justify-content: space-between; align-items: center; padding-bottom: 16px; border-bottom: 1px solid rgba(255,255,255,0.1); }
            .weather-temp { font-size: 44px; font-weight: 900; color: ${accentColor}; }
            .weather-cond { font-size: 20px; font-weight: 700; color: #f1f5f9; display: flex; align-items: center; gap: 8px; }
            .weather-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
            .weather-item { background: rgba(255,255,255,0.05); padding: 12px 16px; border-radius: 8px; display: flex; justify-content: space-between; font-size: 16px; font-weight: 700; }
            .weather-label { color: #94a3b8; text-transform: uppercase; font-size: 12px; letter-spacing: 1px; }
          </style>
        </head>
        <body>
          <div class="weather-card">
            <div class="weather-head">
              <span>☀️ WEATHER & CONDITIONS</span>
              <span style="font-size:16px; color:${accentColor};">${venueTitle}</span>
            </div>
            <div class="weather-body">
              <div class="weather-main">
                <div>
                  <div class="weather-label">AIR TEMPERATURE</div>
                  <div class="weather-temp">${data.temp || data.temperature || "24°C / 75°F"}</div>
                </div>
                <div class="weather-cond">
                  <span>⛅ ${data.condition || "Partly Cloudy"}</span>
                </div>
              </div>
              <div class="weather-grid">
                <div class="weather-item">
                  <div>
                    <div class="weather-label">WIND SPEED</div>
                    <div style="color:#ffffff;">${data.wind || "12 km/h NW"}</div>
                  </div>
                  <span style="font-size: 20px;">💨</span>
                </div>
                <div class="weather-item">
                  <div>
                    <div class="weather-label">HUMIDITY</div>
                    <div style="color:#ffffff;">${data.humidity || "58%"}</div>
                  </div>
                  <span style="font-size: 20px;">💧</span>
                </div>
                <div class="weather-item">
                  <div>
                    <div class="weather-label">TRACK / WATER TEMP</div>
                    <div style="color:#ffffff;">${data.trackTemp || "26°C / 79°F"}</div>
                  </div>
                  <span style="font-size: 20px;">🌡️</span>
                </div>
                <div class="weather-item">
                  <div>
                    <div class="weather-label">BAROMETER</div>
                    <div style="color:#ffffff;">${data.pressure || "1013 hPa"}</div>
                  </div>
                  <span style="font-size: 20px;">📊</span>
                </div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `;

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

    case "split-times": {
      // Variant 1: Standard split times card (column layout)
      if (variant <= 3) return `
        <!DOCTYPE html><html><head><meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@600;800;900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }
          .split-card { position: absolute; top: 150px; left: 90px; width: 650px; background: rgba(15,23,42,0.95); border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,0.2); color: white; }
          .split-head { background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor}); padding: 14px 20px; font-size: 22px; font-weight: 900; border-bottom: 4px solid ${accentColor}; display: flex; justify-content: space-between; }
          .split-row { display: flex; justify-content: space-between; padding: 12px 20px; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 18px; font-weight: 700; }
        </style></head><body>
          <div class="split-card">
            <div class="split-head">
              <span>${data.athlete || "COMPETITOR"} (${data.country || code})</span>
              <span style="color:${accentColor};">SPLIT TIMES</span>
            </div>
            <div class="split-row"><span>${variant === 1 ? '50m Split' : variant === 2 ? '250m Split' : '500m Split'}</span><span style="color:${accentColor};">${data.time || '23.45s'}</span></div>
            <div class="split-row"><span>${variant === 1 ? '100m Split' : variant === 2 ? '500m Split' : '1000m Split'}</span><span style="color:${accentColor};">${variant === 1 ? '48.12s (+0.10)' : variant === 2 ? '1:52.40 (+0.15)' : '3:48.80'}</span></div>
            <div class="split-row"><span>Reaction Time</span><span>0.64s</span></div>
          </div>
        </body></html>`;

      // Variant 4: Reaction time / speed bug
      if (variant === 4) return `
        <!DOCTYPE html><html><head><meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@600;800;900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }
          .rt-bug { position: absolute; bottom: 90px; right: 90px; background: ${primaryColor}; color: white; padding: 14px 28px; border-radius: 8px; border-right: 8px solid ${accentColor}; box-shadow: 0 10px 30px rgba(0,0,0,0.5); display: flex; align-items: center; gap: 20px; }
          .rt-label { font-size: 14px; font-weight: 900; color: ${accentColor}; letter-spacing: 2px; }
          .rt-value { font-size: 42px; font-weight: 900; }
          .rt-unit { font-size: 16px; color: rgba(255,255,255,0.7); }
        </style></head><body>
          <div class="rt-bug">
            <div>
              <div class="rt-label">START REACTION</div>
              <div class="rt-value">${data.time || '0.136'}<span class="rt-unit">s</span></div>
            </div>
            <div style="font-size:13px; color:#94a3b8; line-height:1.5;">${data.athlete || 'ATHLETE'}<br>${data.country || code}</div>
          </div>
        </body></html>`;

      // Variant 5: Stroke rate / speed trap bug
      return `
        <!DOCTYPE html><html><head><meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@600;800;900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }
          .speed-bug { position: absolute; top: 70px; right: 90px; background: rgba(10,14,30,0.95); color: white; padding: 12px 24px; border-radius: 8px; border-top: 4px solid ${accentColor}; box-shadow: 0 10px 30px rgba(0,0,0,0.5); display: flex; gap: 20px; align-items: center; }
          .speed-block { text-align: center; }
          .speed-val { font-size: 36px; font-weight: 900; color: ${accentColor}; }
          .speed-lbl { font-size: 12px; font-weight: 800; color: #94a3b8; letter-spacing: 1px; }
          .divider { width: 1px; background: rgba(255,255,255,0.15); align-self: stretch; }
        </style></head><body>
          <div class="speed-bug">
            <div style="font-size:13px; font-weight:900; color:#94a3b8; writing-mode:vertical-rl; transform:rotate(180deg); letter-spacing:2px;">${code}</div>
            <div class="divider"></div>
            <div class="speed-block">
              <div class="speed-val">${data.time || '44.7'}</div>
              <div class="speed-lbl">km/h</div>
            </div>
            <div class="divider"></div>
            <div style="font-size:14px; color:#e2e8f0; font-weight:700; line-height:1.6;">${data.athlete || 'ATHLETE'}<br><span style="color:#94a3b8;">${data.country || 'NOC'}</span></div>
          </div>
        </body></html>`;
    }

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

    case "lower-third": {
      // ── Variant 1: Standard Athlete ID (Name / Country / Event) ──
      if (variant === 1) return `
        <!DOCTYPE html><html><head><meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800;900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }
          .lt-wrapper { position: absolute; bottom: 90px; left: 90px; display: flex; flex-direction: column; animation: slideIn 0.5s ease-out forwards; }
          @keyframes slideIn { from { transform: translateX(-100px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
          .top-bar { display: flex; align-items: center; background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor}); color: white; padding: 10px 24px; border-left: 8px solid ${accentColor}; border-radius: 4px 12px 0 0; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
          .sport-code { background: ${accentColor}; color: #000; font-weight: 900; padding: 4px 10px; border-radius: 4px; font-size: 18px; margin-right: 14px; }
          .athlete-name { font-size: 34px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; }
          .flag-badge { font-size: 28px; margin-left: 16px; }
          .bottom-bar { background: rgba(15,23,42,0.92); color: #e2e8f0; padding: 8px 24px; font-size: 20px; font-weight: 600; border-radius: 0 0 12px 4px; display: flex; gap: 20px; border-left: 8px solid rgba(255,255,255,0.2); }
          .accent-text { color: ${accentColor}; font-weight: 800; }
        </style></head><body>
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
        </body></html>`;

      // ── Variant 2: Crew / Team Profile Card (dual-name card) ──
      if (variant === 2) return `
        <!DOCTYPE html><html><head><meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800;900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }
          .crew-card { position: absolute; bottom: 90px; left: 90px; display: flex; align-items: stretch; animation: riseIn 0.5s ease-out forwards; }
          @keyframes riseIn { from { transform: translateY(40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
          .flag-col { background: ${accentColor}; width: 80px; display: flex; align-items: center; justify-content: center; font-size: 44px; border-radius: 10px 0 0 10px; }
          .content-col { background: linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%); padding: 14px 24px; min-width: 500px; border-radius: 0 10px 10px 0; border-top: 4px solid ${accentColor}; }
          .sport-tag { font-size: 13px; font-weight: 900; color: ${accentColor}; letter-spacing: 2px; margin-bottom: 4px; }
          .crew-name { font-size: 30px; font-weight: 900; color: #fff; text-transform: uppercase; letter-spacing: 1px; }
          .crew-sub { font-size: 17px; font-weight: 600; color: rgba(255,255,255,0.75); margin-top: 4px; }
        </style></head><body>
          <div class="crew-card">
            <div class="flag-col">${data.flag || "🏳️"}</div>
            <div class="content-col">
              <div class="sport-tag">${code} • ${data.country || "TEAM"}</div>
              <div class="crew-name">${data.athlete || data.teamA || "CREW NAME"}</div>
              <div class="crew-sub">${data.event || sportTitle} ${data.rank ? '• RANK: ' + data.rank : ''}</div>
            </div>
          </div>
        </body></html>`;

      // ── Variant 3: Olympic / World Champion Card ──
      if (variant === 3) return `
        <!DOCTYPE html><html><head><meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800;900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }
          .champ-card { position: absolute; bottom: 90px; left: 90px; animation: slideIn 0.6s cubic-bezier(0.22,1,0.36,1) forwards; }
          @keyframes slideIn { from { transform: translateX(-80px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
          .gold-bar { height: 6px; background: linear-gradient(90deg, ${accentColor}, #fff8, transparent); border-radius: 3px; margin-bottom: 6px; width: 600px; }
          .name-row { background: rgba(5,10,20,0.92); color: white; padding: 12px 24px 8px 20px; border-left: 8px solid ${accentColor}; display: flex; align-items: center; gap: 16px; }
          .champion-badge { background: ${accentColor}; color: #000; font-size: 12px; font-weight: 900; padding: 3px 10px; border-radius: 20px; text-transform: uppercase; letter-spacing: 1px; }
          .champ-name { font-size: 36px; font-weight: 900; text-transform: uppercase; }
          .detail-row { background: ${primaryColor}; color: white; padding: 8px 20px 8px 28px; font-size: 18px; font-weight: 700; display: flex; gap: 18px; }
          .hl { color: ${accentColor}; }
        </style></head><body>
          <div class="champ-card">
            <div class="gold-bar"></div>
            <div class="name-row">
              <span class="champion-badge">🥇 CHAMPION</span>
              <span class="champ-name">${data.athlete || "ATHLETE NAME"}</span>
              <span style="font-size:28px;">${data.flag || "🏳️"}</span>
            </div>
            <div class="detail-row">
              <span>${data.country || code}</span>
              <span>•</span>
              <span>${data.event || sportTitle}</span>
              ${data.time ? `<span>• <span class="hl">${data.time}</span></span>` : ''}
              ${data.score ? `<span>• <span class="hl">${data.score}</span></span>` : ''}
            </div>
          </div>
        </body></html>`;

      // ── Variant 4: Coach / Official ID Card ──
      if (variant === 4) return `
        <!DOCTYPE html><html><head><meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800;900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }
          .coach-card { position: absolute; bottom: 90px; left: 90px; display: flex; flex-direction: row; border-radius: 10px; overflow: hidden; box-shadow: 0 12px 40px rgba(0,0,0,0.6); animation: popIn 0.4s ease-out; }
          @keyframes popIn { from { transform: scale(0.92); opacity: 0; } to { transform: scale(1); opacity: 1; } }
          .role-col { background: ${accentColor}; width: 14px; }
          .info-block { background: rgba(10,14,30,0.93); padding: 16px 28px; color: white; }
          .role-label { font-size: 13px; font-weight: 900; color: ${accentColor}; letter-spacing: 2px; margin-bottom: 6px; }
          .person-name { font-size: 32px; font-weight: 900; text-transform: uppercase; }
          .person-sub { font-size: 17px; color: #94a3b8; margin-top: 4px; }
          .country-tag { display: inline-block; background: ${primaryColor}; color: white; padding: 3px 12px; border-radius: 4px; font-size: 15px; font-weight: 800; margin-top: 6px; }
        </style></head><body>
          <div class="coach-card">
            <div class="role-col"></div>
            <div class="info-block">
              <div class="role-label">HEAD COACH • ${code}</div>
              <div class="person-name">${data.athlete || "COACH NAME"}</div>
              <div class="person-sub">${data.event || sportTitle}</div>
              <span class="country-tag">${data.flag || "🏳️"} ${data.country || "NOC"}</span>
            </div>
          </div>
        </body></html>`;

      // ── Variant 5: National Team / Country Profile Card ──
      return `
        <!DOCTYPE html><html><head><meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800;900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }
          .team-card { position: absolute; bottom: 90px; left: 90px; animation: wipeIn 0.5s ease-out; }
          @keyframes wipeIn { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0 0% 0 0); } }
          .team-header { background: linear-gradient(90deg, ${primaryColor}, ${secondaryColor}); color: white; padding: 10px 28px; display: flex; align-items: center; gap: 16px; border-radius: 8px 8px 0 0; border-bottom: 4px solid ${accentColor}; }
          .team-flag { font-size: 40px; }
          .team-name { font-size: 32px; font-weight: 900; text-transform: uppercase; }
          .team-sub-row { background: rgba(0,0,0,0.75); color: #cbd5e1; padding: 8px 28px; font-size: 18px; font-weight: 600; border-radius: 0 0 8px 8px; display: flex; gap: 24px; }
          .hl { color: ${accentColor}; font-weight: 800; }
        </style></head><body>
          <div class="team-card">
            <div class="team-header">
              <span class="team-flag">${data.flag || "🏳️"}</span>
              <span class="team-name">${data.country || data.athlete || "TEAM"}</span>
              <span style="margin-left:auto; background:${accentColor}; color:#000; font-weight:900; padding:4px 12px; border-radius:4px; font-size:16px;">${code}</span>
            </div>
            <div class="team-sub-row">
              <span>${data.event || sportTitle}</span>
              ${data.rank ? `<span>WORLD RANK <span class="hl">#${data.rank}</span></span>` : ''}
              ${data.time ? `<span>BEST <span class="hl">${data.time}</span></span>` : ''}
            </div>
          </div>
        </body></html>`;
    }

    case "scoreboard": {
      // Variant 1 & 4: Classic team matchup scoreboard (horizontal bug)
      if (variant === 1 || variant === 4) return `
        <!DOCTYPE html><html><head><meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@600;800;900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }
          .sb-wrapper { position: absolute; top: 70px; left: 90px; display: flex; align-items: stretch; background: rgba(15,23,42,0.95); border-radius: 8px; overflow: hidden; box-shadow: 0 12px 35px rgba(0,0,0,0.6); border: 1px solid rgba(255,255,255,0.15); color: white; }
          .header-badge { background: ${primaryColor}; padding: 12px 18px; display: flex; flex-direction: column; justify-content: center; align-items: center; font-weight: 900; font-size: 16px; border-right: 3px solid ${accentColor}; }
          .team-box { display: flex; align-items: center; padding: 0 20px; gap: 15px; font-size: 24px; font-weight: 800; }
          .score-num { background: ${secondaryColor}; color: ${accentColor}; font-size: 28px; font-weight: 900; padding: 6px 14px; border-radius: 4px; min-width: 45px; text-align: center; }
          .divider { width: 1px; background: rgba(255,255,255,0.2); }
          .clock-box { background: rgba(30,41,59,0.9); padding: 0 18px; display: flex; flex-direction: column; justify-content: center; align-items: center; font-size: 16px; font-weight: 700; color: #94a3b8; }
          .clock-time { color: ${accentColor}; font-size: 20px; font-weight: 900; }
        </style></head><body>
          <div class="sb-wrapper">
            <div class="header-badge"><span>${code}</span><span style="font-size:11px;opacity:0.8;">LOND 2012</span></div>
            <div class="team-box"><span>${data.teamA || data.athleteA || "TEAM A"}</span><span class="score-num">${data.scoreA || "0"}</span></div>
            <div class="divider"></div>
            <div class="team-box"><span class="score-num">${data.scoreB || "0"}</span><span>${data.teamB || data.athleteB || "TEAM B"}</span></div>
            <div class="clock-box"><span>${data.period || "LIVE"}</span><span class="clock-time">${data.clock || "00:00"}</span></div>
          </div>
        </body></html>`;

      // Variant 2 & 5: Lane draw / heat start list (compact card)
      if (variant === 2 || variant === 5) return `
        <!DOCTYPE html><html><head><meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@600;800;900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }
          .draw-card { position: absolute; top: 120px; right: 90px; width: 560px; background: rgba(10,14,30,0.95); border-radius: 10px; overflow: hidden; border: 1px solid rgba(255,255,255,0.12); color: white; box-shadow: 0 14px 40px rgba(0,0,0,0.6); }
          .draw-head { background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor}); padding: 14px 20px; font-size: 20px; font-weight: 900; border-bottom: 4px solid ${accentColor}; display: flex; justify-content: space-between; }
          .draw-row { display: flex; align-items: center; padding: 10px 20px; border-bottom: 1px solid rgba(255,255,255,0.06); font-size: 17px; font-weight: 700; }
          .lane-badge { background: ${secondaryColor}; color: ${accentColor}; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 14px; font-weight: 900; flex-shrink: 0; }
        </style></head><body>
          <div class="draw-card">
            <div class="draw-head"><span>HEAT DRAW • ${sportTitle}</span><span style="color:${accentColor};">${code}</span></div>
            ${[1,2,3,4,5,6].map(n => `
              <div class="draw-row">
                <div class="lane-badge">${n}</div>
                <span style="flex:1;">COMPETITOR ${n}</span>
                <span style="color:#94a3b8;font-size:14px;">NOC${n}</span>
              </div>`).join('')}
          </div>
        </body></html>`;

      // Variant 3: Live lane position / running order bug
      return `
        <!DOCTYPE html><html><head><meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@600;800;900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }
          .pos-card { position: absolute; top: 70px; left: 90px; display: flex; align-items: center; gap: 0; border-radius: 8px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
          .pos-label { background: ${primaryColor}; color: white; padding: 12px 18px; font-size: 13px; font-weight: 900; letter-spacing: 2px; border-right: 3px solid ${accentColor}; }
          .pos-item { background: rgba(15,23,42,0.95); color: white; padding: 10px 20px; font-size: 22px; font-weight: 900; border-right: 1px solid rgba(255,255,255,0.1); }
          .pos-item.leading { background: ${secondaryColor}; color: ${accentColor}; }
          .pos-time { font-size: 14px; color: #94a3b8; font-weight: 600; }
        </style></head><body>
          <div class="pos-card">
            <div class="pos-label">LIVE<br>POSITION</div>
            <div class="pos-item leading">1. ${data.athleteA || data.teamA || data.athlete || 'LEADER'}<br><span class="pos-time">${data.time || 'LEADING'}</span></div>
            <div class="pos-item">2. ${data.athleteB || data.teamB || 'CHALLENGER'}<br><span class="pos-time">+0.52</span></div>
            <div class="pos-item" style="border-right:none;">3. THIRD<br><span class="pos-time">+1.24</span></div>
            <div style="background:${accentColor};color:#000;padding:10px 16px;font-size:13px;font-weight:900;">${code}</div>
          </div>
        </body></html>`;
    }

    case "start-list": {
      const lineup = get11PlayerLineup(sport);

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
              top: 100px;
              left: 90px;
              width: 820px;
              background: rgba(15, 23, 42, 0.96);
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 15px 40px rgba(0,0,0,0.7);
              border: 1px solid rgba(255,255,255,0.15);
              color: white;
            }
            .sl-header {
              background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor});
              padding: 14px 24px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-bottom: 4px solid ${accentColor};
            }
            .sl-title { font-size: 24px; font-weight: 900; text-transform: uppercase; }
            .sl-subtitle { font-size: 15px; color: ${accentColor}; font-weight: 700; }
            .row {
              display: flex;
              align-items: center;
              padding: 8px 24px;
              border-bottom: 1px solid rgba(255,255,255,0.08);
              font-size: 17px;
              font-weight: 700;
            }
            .row:last-child { border-bottom: none; }
            .row:nth-child(even) { background: rgba(255,255,255,0.03); }
            .lane-num {
              background: ${secondaryColor};
              color: ${accentColor};
              width: 32px;
              height: 32px;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
              margin-right: 18px;
              font-size: 15px;
              font-weight: 900;
              border: 1px solid ${accentColor};
            }
            .name { flex: 1; text-transform: uppercase; font-size: 17px; letter-spacing: 0.5px; }
            .noc {
              background: rgba(255,255,255,0.1);
              padding: 3px 10px;
              border-radius: 4px;
              font-size: 14px;
              font-weight: 800;
              letter-spacing: 1px;
            }
          </style>
        </head>
        <body>
          <div class="sl-container">
            <div class="sl-header">
              <div>
                <div class="sl-title">${sportTitle}</div>
                <div class="sl-subtitle">${data.event || "START LIST - FINAL DRAW"}</div>
              </div>
              <span style="font-size: 24px; font-weight: 900; color: ${accentColor};">${code}</span>
            </div>
            ${lineup.map(item => `
              <div class="row">
                <div class="lane-num">${item.lane}</div>
                <div class="name">${item.name}</div>
                <div class="noc">${item.country}</div>
              </div>
            `).join('')}
          </div>
        </body>
        </html>
      `;
    }

    case "race-clock": {
      const normName = (templateName || "").toLowerCase();
      const normId = (templateId || "").toLowerCase();

      const isSW130 = normName.includes("finish with standings") || normId.includes("130");
      const isSW129 = normName.includes("standings") || normId.includes("129");
      const isSW128 = normName.includes("split point") || normName.includes("finish") || normName.includes("lap") || normId.includes("128");
      const isSW126 = normName.includes("delta") || normId.includes("126");

      const hasLeftLap = isSW128 || isSW129 || isSW130;
      const hasDelta = isSW126 || isSW129 || isSW130;

      const clockTime = data.time || data.clock || (isSW130 ? "1:59:27.7" : isSW129 ? "59:40" : isSW126 ? "1:21:14" : isSW128 ? "59:20" : "36:41");
      const deltaTime = data.delta || (isSW130 ? "+0:01" : isSW129 ? "+0:12" : "+0:07");
      const lapText = data.lap || data.splitInfo || (isSW130 ? "FINISH" : "LAP 3 OF 6");

      const standingsList = data.standings || [
        { rank: "1", country: "RUS", flag: "🇷🇺", bib: "12", name: "L. ILCHENKO", time: isSW130 ? "1:59:27.7" : "59:28.6" },
        { rank: "2", country: "GBR", flag: "🇬🇧", bib: "21", name: "K.A. PAYNE", time: "+0.9" },
        { rank: "3", country: "GBR", flag: "🇬🇧", bib: "2", name: "C. PATTEN", time: "+2.1" },
        { rank: "4", country: "GER", flag: "🇩🇪", bib: "18", name: "A. MAURER", time: "+5.2" },
        { rank: "5", country: "BRA", flag: "🇧🇷", bib: "1", name: "A. CUNHA", time: "+6.1" },
        { rank: "6", country: "SUI", flag: "🇨🇭", bib: "15", name: "S. OBERSON", time: "+7.9" },
        { rank: "7", country: "BRA", flag: "🇧🇷", bib: "20", name: "P. OKIMOTO", time: "+10.2" }
      ];

      const leaderRow = standingsList[0];

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@700;900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body {
              width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font};
            }
            .standings-container {
              position: absolute; top: 70px; left: 90px;
              display: flex; gap: 24px;
            }
            .standings-col {
              display: flex; flex-direction: column; gap: 4px;
              width: 500px;
            }
            .standings-row {
              background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor});
              color: white; padding: 6px 18px; border-radius: 4px;
              display: flex; align-items: center; justify-content: space-between;
              font-size: 18px; font-weight: 900; font-style: italic;
              box-shadow: 0 4px 15px rgba(0,0,0,0.4);
              clip-path: polygon(0 0, 96% 0, 100% 100%, 0 100%);
            }
            .single-leader-bar {
              position: absolute; top: 70px; left: 90px;
              width: 500px;
              background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor});
              color: white; padding: 6px 18px; border-radius: 4px;
              display: flex; align-items: center; justify-content: space-between;
              font-size: 18px; font-weight: 900; font-style: italic;
              box-shadow: 0 4px 15px rgba(0,0,0,0.4);
              clip-path: polygon(0 0, 96% 0, 100% 100%, 0 100%);
            }
            .rank-badge { background: #dc2626; color: white; min-width: 26px; height: 26px; display: flex; align-items: center; justify-content: center; border-radius: 3px; font-size: 15px; }
            .row-left { display: flex; align-items: center; gap: 10px; }
            .noc-flag { display: flex; align-items: center; gap: 4px; }
            .bib-num { opacity: 0.8; font-size: 15px; }
            .row-time { color: ${accentColor}; font-weight: 900; }

            .left-lap-bug {
              position: absolute; top: ${isSW129 ? '255px' : isSW130 ? '125px' : '70px'}; left: 90px;
              background: linear-gradient(180deg, #ffffff, #cbd5e1);
              color: #003366;
              padding: 8px 24px;
              font-size: 24px;
              font-weight: 900;
              font-style: italic;
              letter-spacing: 1.5px;
              border-radius: 6px;
              box-shadow: 0 10px 30px rgba(0,0,0,0.5);
              clip-path: polygon(0 0, 100% 0, 88% 100%, 0 100%);
              border: 1px solid rgba(0,0,0,0.1);
            }
            .clock-bug {
              position: absolute; top: ${isSW129 ? '250px' : isSW130 ? '125px' : '70px'}; ${isSW129 ? 'left: 614px;' : 'right: 90px;'}
              display: flex; align-items: center; gap: 0;
              box-shadow: 0 10px 30px rgba(0,0,0,0.5);
              border-radius: 8px; overflow: hidden;
            }
            .delta-box {
              background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor});
              color: white;
              padding: 10px 24px;
              font-size: 32px;
              font-weight: 900;
              font-style: italic;
              letter-spacing: 1px;
              display: flex; align-items: center; justify-content: center;
              clip-path: polygon(0 0, 100% 0, 85% 100%, 0 100%);
              z-index: 2;
            }
            .clock-time-box {
              background: linear-gradient(180deg, #ffffff, #cbd5e1);
              color: #003366;
              padding: 10px 32px;
              margin-left: ${hasDelta ? '-16px' : '0'};
              font-size: 38px;
              font-weight: 900;
              font-style: italic;
              letter-spacing: 2px;
              display: flex; align-items: center; justify-content: center;
              clip-path: polygon(0 0, 100% 0, 86% 100%, 0 100%);
              min-width: 180px;
              z-index: 1;
            }
            .clock-badge-box {
              background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor});
              color: white;
              padding: 10px 24px 10px 32px;
              margin-left: -20px;
              display: flex; align-items: center; justify-content: center;
              font-size: 24px; font-weight: 900; font-style: italic;
              border-radius: 0 8px 8px 0;
            }
          </style>
        </head>
        <body>
          ${isSW130 ? `
            <div class="single-leader-bar">
              <div class="row-left">
                <span class="rank-badge">${leaderRow.rank}</span>
                <span class="noc-flag">${leaderRow.country} ${leaderRow.flag}</span>
                <span class="bib-num">${leaderRow.bib}</span>
                <span>${leaderRow.name}</span>
              </div>
              <span class="row-time" style="color:#ffffff;">${leaderRow.time}</span>
            </div>
          ` : isSW129 ? `
            <div class="standings-container">
              <div class="standings-col">
                ${standingsList.slice(0, 4).map((st, i) => `
                  <div class="standings-row">
                    <div class="row-left">
                      <span class="rank-badge">${st.rank}</span>
                      <span class="noc-flag">${st.country} ${st.flag}</span>
                      <span class="bib-num">${st.bib}</span>
                      <span>${st.name}</span>
                    </div>
                    <span class="row-time" style="${i > 0 ? 'color:#ffffff;' : ''}">${st.time}</span>
                  </div>
                `).join('')}
              </div>
              ${standingsList.length > 4 ? `
                <div class="standings-col">
                  ${standingsList.slice(4).map(st => `
                    <div class="standings-row">
                      <div class="row-left">
                        <span class="rank-badge">${st.rank}</span>
                        <span class="noc-flag">${st.country} ${st.flag}</span>
                        <span class="bib-num">${st.bib}</span>
                        <span>${st.name}</span>
                      </div>
                      <span class="row-time" style="color:#ffffff;">${st.time}</span>
                    </div>
                  `).join('')}
                </div>
              ` : ''}
            </div>
          ` : ''}
          ${hasLeftLap ? `<div class="left-lap-bug">${lapText}</div>` : ''}
          <div class="clock-bug">
            ${hasDelta ? `<div class="delta-box">${deltaTime}</div>` : ''}
            <div class="clock-time-box">${clockTime}</div>
            <div class="clock-badge-box">
              <span style="color:${accentColor};">${code}</span>
            </div>
          </div>
        </body>
        </html>
      `;
    }
    case "medal-presenter": {
      const isFlower = (templateName || "").toLowerCase().includes("flower");
      const defaultName = isFlower ? "MR BILL MATSON" : "JACQUES ROGGE";
      const defaultTitle = isFlower ? "VICE-PRESIDENT, FINA" : "IOC PRESIDENT, BELGIUM";

      const presenterName = (data.presenter || data.athlete || defaultName).toUpperCase();
      const presenterTitle = (data.title || data.designation || defaultTitle).toUpperCase();

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
            .presenter-container {
              position: absolute;
              bottom: 120px;
              left: 120px;
              width: 860px;
              display: flex;
              flex-direction: column;
              box-shadow: 0 20px 50px rgba(0,0,0,0.7);
            }
            .presenter-main-bar {
              background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor});
              color: white;
              padding: 14px 32px;
              border-radius: 6px 6px 0 0;
              display: flex;
              justify-content: space-between;
              align-items: center;
              clip-path: polygon(0 0, 96% 0, 100% 100%, 0 100%);
              border-bottom: 2px solid rgba(255,255,255,0.2);
            }
            .presenter-name {
              font-size: 32px;
              font-weight: 900;
              letter-spacing: 1.5px;
              font-style: italic;
              text-transform: uppercase;
              text-shadow: 0 2px 8px rgba(0,0,0,0.5);
            }
            .presenter-code { font-size: 24px; font-weight: 900; color: ${accentColor}; }
            .presenter-sub-bar {
              background: linear-gradient(180deg, #0a1329, #0f172a);
              color: #cbd5e1;
              padding: 10px 32px;
              border-radius: 0 0 6px 6px;
              font-size: 19px;
              font-weight: 800;
              letter-spacing: 1.5px;
              font-style: italic;
              text-transform: uppercase;
              border-top: 1px solid rgba(255,255,255,0.1);
            }
          </style>
        </head>
        <body>
          <div class="presenter-container">
            <div class="presenter-main-bar">
              <span class="presenter-name">${presenterName}</span>
              <span class="presenter-code">${code}</span>
            </div>
            <div class="presenter-sub-bar">
              <span>${presenterTitle}</span>
            </div>
          </div>
        </body>
        </html>
      `;
    }
    case "medal-tally": {
      const eventName = (data.event || `${sportTitle} FINAL`).toUpperCase();
      const goldAthlete = (data.goldAthlete || data.athlete || "MAARTEN VAN DER WEIJDEN").toUpperCase();
      const goldNoc = (data.goldCountry || data.country || "NED").toUpperCase();
      const goldFlag = data.goldFlag || "🇳🇱";

      const silverAthlete = (data.silverAthlete || "DAVID DAVIES").toUpperCase();
      const silverNoc = (data.silverCountry || "GBR").toUpperCase();
      const silverFlag = data.silverFlag || "🇬🇧";

      const bronzeAthlete = (data.bronzeAthlete || "THOMAS LURZ").toUpperCase();
      const bronzeNoc = (data.bronzeCountry || "GER").toUpperCase();
      const bronzeFlag = data.bronzeFlag || "🇩🇪";

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
            .medal-card {
              position: absolute;
              bottom: 120px;
              left: 120px;
              width: 820px;
              display: flex;
              flex-direction: column;
              box-shadow: 0 20px 50px rgba(0,0,0,0.7);
            }
            .medal-head-bar {
              background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor});
              color: white;
              padding: 14px 28px;
              border-radius: 8px 8px 0 0;
              display: flex;
              justify-content: space-between;
              align-items: center;
              clip-path: polygon(0 0, 97% 0, 100% 100%, 0 100%);
              border-bottom: 2px solid rgba(255,255,255,0.2);
            }
            .head-title {
              font-size: 26px;
              font-weight: 900;
              letter-spacing: 1px;
              text-transform: uppercase;
              font-style: italic;
              display: flex;
              align-items: center;
              gap: 15px;
            }
            .head-code { font-size: 22px; font-weight: 900; color: ${accentColor}; }
            .medal-sub-bar {
              background: linear-gradient(180deg, #f8fafc, #cbd5e1);
              color: #0f172a;
              padding: 8px 28px;
              font-size: 15px;
              font-weight: 900;
              letter-spacing: 2px;
              text-transform: uppercase;
              font-style: italic;
              border-bottom: 2px solid ${accentColor};
            }
            .medal-row {
              background: linear-gradient(90deg, #0a1329, #0f172a);
              color: white;
              padding: 10px 20px;
              display: flex;
              align-items: center;
              gap: 16px;
              border-bottom: 1px solid rgba(255,255,255,0.1);
              font-size: 20px;
              font-weight: 900;
              font-style: italic;
            }
            .medal-row:last-child {
              border-radius: 0 0 8px 8px;
              border-bottom: none;
            }
            .medal-icon {
              width: 34px;
              height: 34px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 16px;
              font-weight: 900;
              box-shadow: 0 4px 10px rgba(0,0,0,0.4);
            }
            .gold-badge { background: linear-gradient(135deg, #ffd700, #b8860b); color: #000; border: 2px solid #fff; }
            .silver-badge { background: linear-gradient(135deg, #e2e8f0, #64748b); color: #000; border: 2px solid #fff; }
            .bronze-badge { background: linear-gradient(135deg, #d97706, #78350f); color: #fff; border: 2px solid #fff; }
            .noc-text { color: #f8fafc; font-size: 18px; width: 45px; }
            .flag-box { font-size: 20px; margin-right: 6px; }
            .athlete-name { text-transform: uppercase; letter-spacing: 1px; flex: 1; }
          </style>
        </head>
        <body>
          <div class="medal-card">
            <div class="medal-head-bar">
              <div class="head-title">
                <span>🏊</span>
                <span>${eventName}</span>
              </div>
              <div class="head-code">${code}</div>
            </div>
            <div class="medal-sub-bar">
              <span>VICTORY CEREMONY</span>
            </div>
            <div class="medal-row">
              <div class="medal-icon gold-badge">🥇</div>
              <div class="noc-text">${goldNoc}</div>
              <div class="flag-box">${goldFlag}</div>
              <div class="athlete-name">${goldAthlete}</div>
            </div>
            <div class="medal-row">
              <div class="medal-icon silver-badge">🥈</div>
              <div class="noc-text">${silverNoc}</div>
              <div class="flag-box">${silverFlag}</div>
              <div class="athlete-name">${silverAthlete}</div>
            </div>
            <div class="medal-row">
              <div class="medal-icon bronze-badge">🥉</div>
              <div class="noc-text">${bronzeNoc}</div>
              <div class="flag-box">${bronzeFlag}</div>
              <div class="athlete-name">${bronzeAthlete}</div>
            </div>
          </div>
        </body>
        </html>
      `;
    }

    case "results-table": {
      // Variant 1 & 4: Classic podium top-3 results card
      if (variant === 1 || variant === 4) return `
        <!DOCTYPE html><html><head><meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@600;800;900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }
          .res-card { position: absolute; top: 150px; left: 90px; width: 750px; background: rgba(15,23,42,0.95); border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,0.2); color: white; }
          .res-head { background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor}); padding: 16px 24px; font-size: 24px; font-weight: 900; border-bottom: 4px solid ${accentColor}; display: flex; justify-content: space-between; }
          .res-row { display: flex; align-items: center; padding: 12px 24px; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 20px; font-weight: 700; }
          .badge-gold { background: #ffd700; color: #000; padding: 2px 10px; border-radius: 4px; font-weight: 900; }
          .badge-silver { background: #c0c0c0; color: #000; padding: 2px 10px; border-radius: 4px; font-weight: 900; }
          .badge-bronze { background: #cd7f32; color: #000; padding: 2px 10px; border-radius: 4px; font-weight: 900; }
        </style></head><body>
          <div class="res-card">
            <div class="res-head"><span>${sportTitle} RESULTS</span><span style="color:${accentColor};">${code}</span></div>
            <div class="res-row"><span class="badge-gold">1 GOLD</span><span style="margin-left:20px;flex:1;">${data.athlete || "ATHLETE A"}</span><span>${data.country || "USA"}</span><span style="margin-left:20px;color:${accentColor};">${data.time || data.score || "1st"}</span></div>
            <div class="res-row"><span class="badge-silver">2 SILV</span><span style="margin-left:20px;flex:1;">COMPETITOR B</span><span>GBR</span><span style="margin-left:20px;">+0.12</span></div>
            <div class="res-row"><span class="badge-bronze">3 BRNZ</span><span style="margin-left:20px;flex:1;">COMPETITOR C</span><span>GER</span><span style="margin-left:20px;">+0.35</span></div>
          </div>
        </body></html>`;

      // Variant 2 & 5: Extended 6-finisher results table
      if (variant === 2 || variant === 5) return `
        <!DOCTYPE html><html><head><meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@600;800;900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }
          .full-card { position: absolute; top: 100px; left: 90px; width: 900px; background: rgba(10,14,30,0.97); border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,0.15); color: white; box-shadow: 0 14px 40px rgba(0,0,0,0.6); }
          .full-head { background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor}); padding: 14px 24px; font-size: 22px; font-weight: 900; border-bottom: 4px solid ${accentColor}; display: flex; justify-content: space-between; }
          .full-row { display: flex; align-items: center; padding: 10px 24px; border-bottom: 1px solid rgba(255,255,255,0.06); font-size: 18px; font-weight: 700; }
          .full-row:nth-child(even) { background: rgba(255,255,255,0.03); }
          .pos { width: 36px; font-size: 22px; font-weight: 900; color: ${accentColor}; }
          .noc { background: rgba(255,255,255,0.12); padding: 2px 8px; border-radius: 4px; font-size: 14px; margin-left: auto; }
          .result { color: ${accentColor}; font-size: 18px; margin-left: 20px; min-width: 80px; text-align: right; }
        </style></head><body>
          <div class="full-card">
            <div class="full-head"><span>${sportTitle} FINAL RESULTS</span><span style="color:${accentColor};">${code}</span></div>
            ${[{pos:'🥇 1',name:data.athlete||'ATHLETE A',noc:data.country||'USA',res:data.time||'3:33.10'},{pos:'2',name:'COMPETITOR B',noc:'GBR',res:'+0.12'},{pos:'3',name:'COMPETITOR C',noc:'GER',res:'+0.35'},{pos:'4',name:'COMPETITOR D',noc:'FRA',res:'+0.72'},{pos:'5',name:'COMPETITOR E',noc:'AUS',res:'+1.01'},{pos:'6',name:'COMPETITOR F',noc:'CHN',res:'+1.45'}].map(r => `
              <div class="full-row">
                <span class="pos">${r.pos}</span>
                <span style="flex:1;margin-left:12px;">${r.name}</span>
                <span class="noc">${r.noc}</span>
                <span class="result">${r.res}</span>
              </div>`).join('')}
          </div>
        </body></html>`;

      // Variant 3: Split comparison table (multi-checkpoint)
      return `
        <!DOCTYPE html><html><head><meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@600;800;900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }
          .cmp-card { position: absolute; top: 120px; right: 90px; width: 700px; background: rgba(10,14,30,0.95); border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,0.15); color: white; box-shadow: 0 14px 40px rgba(0,0,0,0.6); }
          .cmp-head { background: ${primaryColor}; padding: 14px 20px; font-size: 20px; font-weight: 900; border-bottom: 4px solid ${accentColor}; display: flex; justify-content: space-between; }
          .cmp-row { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; padding: 10px 20px; border-bottom: 1px solid rgba(255,255,255,0.06); font-size: 16px; font-weight: 700; }
          .cmp-row.head { background: rgba(255,255,255,0.07); font-size: 13px; color: #94a3b8; font-weight: 900; }
          .pos { color: ${accentColor}; }
        </style></head><body>
          <div class="cmp-card">
            <div class="cmp-head"><span>SPLIT COMPARISON</span><span style="color:${accentColor};">${code}</span></div>
            <div class="cmp-row head"><span>ATHLETE</span><span>250m</span><span>500m</span><span>FINISH</span></div>
            <div class="cmp-row"><span>${data.athlete || 'LEADER'} <span class="pos">#1</span></span><span style="color:${accentColor};">${data.time || '52.3s'}</span><span>1:52.4</span><span style="color:${accentColor};">${data.score || '3:33.1'}</span></div>
            <div class="cmp-row"><span>COMP B <span class="pos">#2</span></span><span>52.8s</span><span>1:53.1</span><span>+0.12</span></div>
            <div class="cmp-row"><span>COMP C <span class="pos">#3</span></span><span>53.0s</span><span>1:53.5</span><span>+0.35</span></div>
          </div>
        </body></html>`;
    }

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
 * Generate Native Fabric.js Vector Graphic Objects matching HTML preview variants
 */
export function createFabricGraphicGroup(sport, templateType, customData = {}, customColors = {}, templateId = '', templateName = '') {
  const primaryColor = customColors.primaryColor || sport.primaryColor || "#005b96";
  const secondaryColor = customColors.secondaryColor || sport.secondaryColor || "#003366";
  const accentColor = customColors.accentColor || sport.accentColor || "#ffd700";

  const data = { ...sport.dataFields, ...customData };
  const sportTitle = sport.name.toUpperCase();
  const venueTitle = sport.venue.toUpperCase();
  const code = sport.code;

  const category = resolveCategory(templateType, templateName);
  const idNum = parseInt((templateId || '').replace(/\D/g, '')) || 1;
  const variant = ((idNum - 1) % 5) + 1;

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

  switch (category) {
    case 'position-on-screen': {
      const athlete1 = data.athlete || data.athleteA || "MICHAEL PHELPS";
      const country1 = data.country || "USA";
      const time1 = data.time || "50.58";
      const rank1 = data.rank || "1st";

      const posLabel = new fabric.Rect(createProps('rect', {
        left: 90, top: 70, width: 130, height: 50, fill: primaryColor, rx: 6, ry: 6
      }));
      const posLabelText = new fabric.Textbox("LIVE POS", createProps('textbox', {
        left: 90, top: 85, fontSize: 13, fontWeight: 'bold', fill: '#ffffff', width: 130, textAlign: 'center'
      }));

      const item1Bg = new fabric.Rect(createProps('rect', {
        left: 220, top: 70, width: 280, height: 50, fill: secondaryColor
      }));
      const item1Text = new fabric.Textbox(`${rank1} ${athlete1.toUpperCase()} (${country1.toUpperCase()}) ${time1}`, createProps('textbox', {
        left: 230, top: 83, fontSize: 15, fontWeight: 'bold', fill: accentColor, width: 260
      }));

      const item2Bg = new fabric.Rect(createProps('rect', {
        left: 500, top: 70, width: 240, height: 50, fill: '#0f172a'
      }));
      const item2Text = new fabric.Textbox("2nd CHAD LE CLOS (RSA)", createProps('textbox', {
        left: 510, top: 83, fontSize: 15, fontWeight: 'bold', fill: '#ffffff', width: 220
      }));

      const codeBadge = new fabric.Rect(createProps('rect', {
        left: 740, top: 70, width: 60, height: 50, fill: accentColor
      }));
      const codeText = new fabric.Textbox(code, createProps('textbox', {
        left: 740, top: 85, fontSize: 15, fontWeight: 'bold', fill: '#000000', width: 60, textAlign: 'center'
      }));

      objects.push(posLabel, posLabelText, item1Bg, item1Text, item2Bg, item2Text, codeBadge, codeText);
      break;
    }
    case 'venue-id': {
      const venueName = (data.venue || sport.venue || "OLYMPIC STADIUM").toUpperCase();
      const locationName = (data.location || "LONDON, UNITED KINGDOM").toUpperCase();

      const mainBar = new fabric.Rect(createProps('rect', {
        left: 120, top: 840, width: 640, height: 65, fill: primaryColor, rx: 6, ry: 6
      }));
      const accentBorder = new fabric.Rect(createProps('rect', {
        left: 120, top: 840, width: 8, height: 110, fill: accentColor
      }));
      const iconText = new fabric.Textbox("🏟️", createProps('textbox', {
        left: 140, top: 852, fontSize: 30, fill: accentColor, width: 50
      }));
      const titleText = new fabric.Textbox(venueName, createProps('textbox', {
        left: 195, top: 854, fontSize: 28, fontWeight: 'bold', fill: '#ffffff', width: 540
      }));

      const subBar = new fabric.Rect(createProps('rect', {
        left: 120, top: 905, width: 640, height: 45, fill: '#0f172a', rx: 4, ry: 4
      }));
      const subText = new fabric.Textbox(`📍 ${locationName}  •  ${sportTitle}`, createProps('textbox', {
        left: 140, top: 917, fontSize: 16, fontWeight: 'bold', fill: '#cbd5e1', width: 520
      }));
      const codePill = new fabric.Rect(createProps('rect', {
        left: 690, top: 914, width: 50, height: 26, fill: accentColor, rx: 4, ry: 4
      }));
      const codeText = new fabric.Textbox(code, createProps('textbox', {
        left: 690, top: 919, fontSize: 13, fontWeight: 'bold', fill: '#000000', width: 50, textAlign: 'center'
      }));

      objects.push(mainBar, subBar, accentBorder, iconText, titleText, subText, codePill, codeText);
      break;
    }
    case 'event-schedule': {
      const cardBg = new fabric.Rect(createProps('rect', {
        left: 90, top: 140, width: 720, height: 320, fill: '#0f172a', rx: 12, ry: 12
      }));
      const headBg = new fabric.Rect(createProps('rect', {
        left: 90, top: 140, width: 720, height: 55, fill: primaryColor, rx: 12, ry: 12
      }));
      const headAccent = new fabric.Rect(createProps('rect', {
        left: 90, top: 191, width: 720, height: 4, fill: accentColor
      }));
      const titleText = new fabric.Textbox("🗓️ EVENT SCHEDULE", createProps('textbox', {
        left: 110, top: 155, fontSize: 20, fontWeight: 'bold', fill: '#ffffff', width: 340
      }));
      const venueText = new fabric.Textbox(`${sportTitle} • ${venueTitle}`, createProps('textbox', {
        left: 420, top: 157, fontSize: 14, fontWeight: 'bold', fill: accentColor, width: 370, textAlign: 'right'
      }));

      // Row 1
      const r1Time = new fabric.Textbox("09:30", createProps('textbox', { left: 110, top: 215, fontSize: 16, fontWeight: 'bold', fill: accentColor, width: 80 }));
      const r1Name = new fabric.Textbox(data.event || "Preliminary Round / Heats", createProps('textbox', { left: 200, top: 215, fontSize: 16, fontWeight: 'bold', fill: '#ffffff', width: 380 }));
      const r1Badge = new fabric.Textbox("COMPLETED", createProps('textbox', { left: 600, top: 215, fontSize: 12, fontWeight: 'bold', fill: '#4ade80', width: 180, textAlign: 'right' }));

      // Row 2
      const r2Time = new fabric.Textbox("10:45", createProps('textbox', { left: 110, top: 265, fontSize: 16, fontWeight: 'bold', fill: accentColor, width: 80 }));
      const r2Name = new fabric.Textbox("Quarter-Finals Draw", createProps('textbox', { left: 200, top: 265, fontSize: 16, fontWeight: 'bold', fill: '#ffffff', width: 380 }));
      const r2Badge = new fabric.Textbox("COMPLETED", createProps('textbox', { left: 600, top: 265, fontSize: 12, fontWeight: 'bold', fill: '#4ade80', width: 180, textAlign: 'right' }));

      // Row 3
      const r3Time = new fabric.Textbox("14:00", createProps('textbox', { left: 110, top: 315, fontSize: 16, fontWeight: 'bold', fill: accentColor, width: 80 }));
      const r3Name = new fabric.Textbox("Semi-Finals Phase", createProps('textbox', { left: 200, top: 315, fontSize: 16, fontWeight: 'bold', fill: '#ffffff', width: 380 }));
      const r3Badge = new fabric.Textbox("LIVE / NEXT", createProps('textbox', { left: 600, top: 315, fontSize: 12, fontWeight: 'bold', fill: '#38bdf8', width: 180, textAlign: 'right' }));

      // Row 4
      const r4Time = new fabric.Textbox("16:30", createProps('textbox', { left: 110, top: 365, fontSize: 16, fontWeight: 'bold', fill: accentColor, width: 80 }));
      const r4Name = new fabric.Textbox("Gold Medal Final & Ceremony", createProps('textbox', { left: 200, top: 365, fontSize: 16, fontWeight: 'bold', fill: '#ffffff', width: 380 }));
      const r4Badge = new fabric.Textbox("UPCOMING", createProps('textbox', { left: 600, top: 365, fontSize: 12, fontWeight: 'bold', fill: '#facc15', width: 180, textAlign: 'right' }));

      objects.push(
        cardBg, headBg, headAccent, titleText, venueText,
        r1Time, r1Name, r1Badge,
        r2Time, r2Name, r2Badge,
        r3Time, r3Name, r3Badge,
        r4Time, r4Name, r4Badge
      );
      break;
    }
    case 'weather': {
      const cardBg = new fabric.Rect(createProps('rect', {
        left: 90, top: 150, width: 680, height: 280, fill: '#0f172a', rx: 12, ry: 12
      }));
      const headBg = new fabric.Rect(createProps('rect', {
        left: 90, top: 150, width: 680, height: 55, fill: primaryColor, rx: 12, ry: 12
      }));
      const headAccent = new fabric.Rect(createProps('rect', {
        left: 90, top: 201, width: 680, height: 4, fill: accentColor
      }));
      const titleText = new fabric.Textbox("☀️ WEATHER & CONDITIONS", createProps('textbox', {
        left: 110, top: 165, fontSize: 20, fontWeight: 'bold', fill: '#ffffff', width: 340
      }));
      const venueText = new fabric.Textbox(venueTitle, createProps('textbox', {
        left: 450, top: 167, fontSize: 15, fontWeight: 'bold', fill: accentColor, width: 300, textAlign: 'right'
      }));

      const tempLabel = new fabric.Textbox("AIR TEMPERATURE", createProps('textbox', {
        left: 110, top: 220, fontSize: 12, fontWeight: 'bold', fill: '#94a3b8', width: 250
      }));
      const tempVal = new fabric.Textbox(data.temp || data.temperature || "24°C / 75°F", createProps('textbox', {
        left: 110, top: 238, fontSize: 38, fontWeight: 'bold', fill: accentColor, width: 250
      }));
      const condText = new fabric.Textbox(`⛅ ${data.condition || "Partly Cloudy"}`, createProps('textbox', {
        left: 420, top: 242, fontSize: 22, fontWeight: 'bold', fill: '#ffffff', width: 330, textAlign: 'right'
      }));

      const divider = new fabric.Rect(createProps('rect', {
        left: 110, top: 295, width: 640, height: 1, fill: '#334155'
      }));

      const item1Bg = new fabric.Rect(createProps('rect', { left: 110, top: 310, width: 305, height: 50, fill: 'rgba(255,255,255,0.05)', rx: 6, ry: 6 }));
      const item1Lbl = new fabric.Textbox("WIND SPEED", createProps('textbox', { left: 120, top: 315, fontSize: 10, fontWeight: 'bold', fill: '#94a3b8', width: 200 }));
      const item1Val = new fabric.Textbox(`💨  ${data.wind || "12 km/h NW"}`, createProps('textbox', { left: 120, top: 330, fontSize: 15, fontWeight: 'bold', fill: '#ffffff', width: 280 }));

      const item2Bg = new fabric.Rect(createProps('rect', { left: 445, top: 310, width: 305, height: 50, fill: 'rgba(255,255,255,0.05)', rx: 6, ry: 6 }));
      const item2Lbl = new fabric.Textbox("HUMIDITY", createProps('textbox', { left: 455, top: 315, fontSize: 10, fontWeight: 'bold', fill: '#94a3b8', width: 200 }));
      const item2Val = new fabric.Textbox(`💧  ${data.humidity || "58%"}`, createProps('textbox', { left: 455, top: 330, fontSize: 15, fontWeight: 'bold', fill: '#ffffff', width: 280 }));

      const item3Bg = new fabric.Rect(createProps('rect', { left: 110, top: 370, width: 305, height: 50, fill: 'rgba(255,255,255,0.05)', rx: 6, ry: 6 }));
      const item3Lbl = new fabric.Textbox("TRACK / WATER TEMP", createProps('textbox', { left: 120, top: 375, fontSize: 10, fontWeight: 'bold', fill: '#94a3b8', width: 200 }));
      const item3Val = new fabric.Textbox(`🌡️  ${data.trackTemp || "26°C / 79°F"}`, createProps('textbox', { left: 120, top: 390, fontSize: 15, fontWeight: 'bold', fill: '#ffffff', width: 280 }));

      const item4Bg = new fabric.Rect(createProps('rect', { left: 445, top: 370, width: 305, height: 50, fill: 'rgba(255,255,255,0.05)', rx: 6, ry: 6 }));
      const item4Lbl = new fabric.Textbox("BAROMETER", createProps('textbox', { left: 455, top: 375, fontSize: 10, fontWeight: 'bold', fill: '#94a3b8', width: 200 }));
      const item4Val = new fabric.Textbox(`📊  ${data.pressure || "1013 hPa"}`, createProps('textbox', { left: 455, top: 390, fontSize: 15, fontWeight: 'bold', fill: '#ffffff', width: 280 }));

      objects.push(
        cardBg, headBg, headAccent, titleText, venueText,
        tempLabel, tempVal, condText, divider,
        item1Bg, item1Lbl, item1Val,
        item2Bg, item2Lbl, item2Val,
        item3Bg, item3Lbl, item3Val,
        item4Bg, item4Lbl, item4Val
      );
      break;
    }
    case 'wind-indicator': {
      const bugBg = new fabric.Rect(createProps('rect', {
        left: 1450, top: 890, width: 380, height: 80, fill: primaryColor, rx: 8, ry: 8
      }));
      const leftBorder = new fabric.Rect(createProps('rect', {
        left: 1450, top: 890, width: 6, height: 80, fill: accentColor
      }));
      const labelText = new fabric.Textbox("💨 WIND", createProps('textbox', {
        left: 1475, top: 912, fontSize: 24, fontWeight: 'bold', fill: accentColor, width: 140
      }));
      const valueText = new fabric.Textbox(data.wind || "+1.5 m/s", createProps('textbox', {
        left: 1615, top: 910, fontSize: 28, fontWeight: 'bold', fill: '#ffffff', width: 140
      }));
      const codeText = new fabric.Textbox(code, createProps('textbox', {
        left: 1755, top: 918, fontSize: 16, fontWeight: 'bold', fill: '#cbd5e1', width: 60, textAlign: 'right'
      }));
      objects.push(bugBg, leftBorder, labelText, valueText, codeText);
      break;
    }

    case 'split-times': {
      if (variant <= 3) {
        // Variant 1-3: Standard split times card
        const cardBg = new fabric.Rect(createProps('rect', {
          left: 90, top: 150, width: 650, height: 220, fill: '#0f172a', rx: 12, ry: 12
        }));
        const headBg = new fabric.Rect(createProps('rect', {
          left: 90, top: 150, width: 650, height: 55, fill: primaryColor, rx: 12, ry: 12
        }));
        const headAccent = new fabric.Rect(createProps('rect', {
          left: 90, top: 201, width: 650, height: 4, fill: accentColor
        }));
        const athleteText = new fabric.Textbox(`${(data.athlete || "COMPETITOR").toUpperCase()} (${(data.country || code).toUpperCase()})`, createProps('textbox', {
          left: 110, top: 165, fontSize: 22, fontWeight: 'bold', fill: '#ffffff', width: 420
        }));
        const titleText = new fabric.Textbox("SPLIT TIMES", createProps('textbox', {
          left: 540, top: 165, fontSize: 18, fontWeight: 'bold', fill: accentColor, width: 180, textAlign: 'right'
        }));

        const splitLabel1 = variant === 1 ? '50m Split' : variant === 2 ? '250m Split' : '500m Split';
        const splitVal1 = data.time || '23.45s';
        const splitLabel2 = variant === 1 ? '100m Split' : variant === 2 ? '500m Split' : '1000m Split';
        const splitVal2 = variant === 1 ? '48.12s (+0.10)' : variant === 2 ? '1:52.40 (+0.15)' : '3:48.80';

        const row1Bg = new fabric.Rect(createProps('rect', { left: 90, top: 205, width: 650, height: 45, fill: 'transparent' }));
        const r1L = new fabric.Textbox(splitLabel1, createProps('textbox', { left: 110, top: 215, fontSize: 18, fontWeight: 'bold', fill: '#ffffff', width: 300 }));
        const r1V = new fabric.Textbox(splitVal1, createProps('textbox', { left: 450, top: 215, fontSize: 18, fontWeight: 'bold', fill: accentColor, width: 270, textAlign: 'right' }));

        const row2Bg = new fabric.Rect(createProps('rect', { left: 90, top: 250, width: 650, height: 45, fill: 'transparent' }));
        const r2L = new fabric.Textbox(splitLabel2, createProps('textbox', { left: 110, top: 260, fontSize: 18, fontWeight: 'bold', fill: '#ffffff', width: 300 }));
        const r2V = new fabric.Textbox(splitVal2, createProps('textbox', { left: 450, top: 260, fontSize: 18, fontWeight: 'bold', fill: accentColor, width: 270, textAlign: 'right' }));

        const row3Bg = new fabric.Rect(createProps('rect', { left: 90, top: 295, width: 650, height: 45, fill: 'transparent' }));
        const r3L = new fabric.Textbox("Reaction Time", createProps('textbox', { left: 110, top: 305, fontSize: 18, fontWeight: 'bold', fill: '#ffffff', width: 300 }));
        const r3V = new fabric.Textbox("0.64s", createProps('textbox', { left: 450, top: 305, fontSize: 18, fontWeight: 'bold', fill: '#ffffff', width: 270, textAlign: 'right' }));

        objects.push(cardBg, headBg, headAccent, athleteText, titleText, row1Bg, r1L, r1V, row2Bg, r2L, r2V, row3Bg, r3L, r3V);
      } else if (variant === 4) {
        // Variant 4: Reaction time bug
        const bugBg = new fabric.Rect(createProps('rect', {
          left: 1400, top: 880, width: 430, height: 110, fill: primaryColor, rx: 8, ry: 8
        }));
        const rightBorder = new fabric.Rect(createProps('rect', {
          left: 1822, top: 880, width: 8, height: 110, fill: accentColor
        }));
        const labelText = new fabric.Textbox("START REACTION", createProps('textbox', {
          left: 1425, top: 895, fontSize: 14, fontWeight: 'bold', fill: accentColor, width: 200
        }));
        const valText = new fabric.Textbox(`${data.time || '0.136'}s`, createProps('textbox', {
          left: 1425, top: 920, fontSize: 42, fontWeight: 'bold', fill: '#ffffff', width: 200
        }));
        const infoText = new fabric.Textbox(`${(data.athlete || 'ATHLETE').toUpperCase()}\n${(data.country || code).toUpperCase()}`, createProps('textbox', {
          left: 1650, top: 920, fontSize: 14, fontWeight: 'bold', fill: '#94a3b8', width: 160
        }));
        objects.push(bugBg, rightBorder, labelText, valText, infoText);
      } else {
        // Variant 5: Speed trap bug
        const bugBg = new fabric.Rect(createProps('rect', {
          left: 1450, top: 70, width: 380, height: 90, fill: '#0a0e1e', rx: 8, ry: 8
        }));
        const topBorder = new fabric.Rect(createProps('rect', {
          left: 1450, top: 70, width: 380, height: 4, fill: accentColor
        }));
        const codeText = new fabric.Textbox(code, createProps('textbox', {
          left: 1470, top: 95, fontSize: 14, fontWeight: 'bold', fill: '#94a3b8', width: 50
        }));
        const speedVal = new fabric.Textbox(data.time || '44.7', createProps('textbox', {
          left: 1530, top: 85, fontSize: 36, fontWeight: 'bold', fill: accentColor, width: 100
        }));
        const speedLbl = new fabric.Textbox('km/h', createProps('textbox', {
          left: 1530, top: 125, fontSize: 12, fontWeight: 'bold', fill: '#94a3b8', width: 100
        }));
        const infoText = new fabric.Textbox(`${(data.athlete || 'ATHLETE').toUpperCase()}\n${(data.country || 'NOC').toUpperCase()}`, createProps('textbox', {
          left: 1650, top: 95, fontSize: 14, fontWeight: 'bold', fill: '#e2e8f0', width: 160
        }));
        objects.push(bugBg, topBorder, codeText, speedVal, speedLbl, infoText);
      }
      break;
    }

    case 'attempt-board': {
      const cardBg = new fabric.Rect(createProps('rect', {
        left: 90, top: 860, width: 600, height: 100, fill: primaryColor, rx: 10, ry: 10
      }));
      const bottomAccent = new fabric.Rect(createProps('rect', {
        left: 90, top: 954, width: 600, height: 6, fill: accentColor
      }));
      const athleteText = new fabric.Textbox(`${(data.athlete || "COMPETITOR").toUpperCase()} (${(data.country || code).toUpperCase()})`, createProps('textbox', {
        left: 115, top: 875, fontSize: 26, fontWeight: 'bold', fill: '#ffffff', width: 420
      }));
      const attemptText = new fabric.Textbox(`ATTEMPT: ${data.snatch || data.height || "175 kg"}`, createProps('textbox', {
        left: 115, top: 915, fontSize: 16, fontWeight: 'bold', fill: '#cbd5e1', width: 420
      }));

      const light1 = new fabric.Circle(createProps('circle', { left: 550, top: 895, radius: 11, fill: '#ffffff' }));
      const light2 = new fabric.Circle(createProps('circle', { left: 580, top: 895, radius: 11, fill: '#ffffff' }));
      const light3 = new fabric.Circle(createProps('circle', { left: 610, top: 895, radius: 11, fill: '#ef4444' }));

      objects.push(cardBg, bottomAccent, athleteText, attemptText, light1, light2, light3);
      break;
    }

    case 'lower-third': {
      if (variant === 1) {
        // ── Variant 1: Standard Athlete ID (Name / Country / Event) ──
        const topBg = new fabric.Rect(createProps('rect', {
          left: 90, top: 860, width: 750, height: 60, fill: primaryColor, rx: 6, ry: 6
        }));
        const accentBorder = new fabric.Rect(createProps('rect', {
          left: 90, top: 860, width: 8, height: 60, fill: accentColor
        }));
        const codePill = new fabric.Rect(createProps('rect', {
          left: 110, top: 872, width: 55, height: 35, fill: accentColor, rx: 4, ry: 4
        }));
        const codeText = new fabric.Textbox(code, createProps('textbox', {
          left: 110, top: 878, fontSize: 18, fontWeight: 'bold', fill: '#000000', width: 55, textAlign: 'center'
        }));
        const nameText = new fabric.Textbox((data.athlete || data.athleteA || "COMPETITOR NAME").toUpperCase(), createProps('textbox', {
          left: 180, top: 872, fontSize: 34, fontWeight: 'bold', fill: '#ffffff', width: 450
        }));
        const countryText = new fabric.Textbox(`${data.flag || "🏳️"} ${data.country || ""}`, createProps('textbox', {
          left: 630, top: 875, fontSize: 26, fontWeight: 'bold', fill: '#ffffff', width: 190, textAlign: 'right'
        }));

        const bottomBg = new fabric.Rect(createProps('rect', {
          left: 90, top: 920, width: 700, height: 45, fill: '#0f172a', rx: 4, ry: 4
        }));
        const bottomAccent = new fabric.Rect(createProps('rect', {
          left: 90, top: 920, width: 8, height: 45, fill: '#ffffff', opacity: 0.2
        }));
        const eventText = new fabric.Textbox(data.event || sportTitle, createProps('textbox', {
          left: 115, top: 930, fontSize: 20, fontWeight: 'bold', fill: '#e2e8f0', width: 400
        }));
        const infoText = new fabric.Textbox(
          data.rank ? `RANK: ${data.rank}` : (data.time ? `TIME: ${data.time}` : (data.score ? `SCORE: ${data.score}` : '')),
          createProps('textbox', {
            left: 520, top: 930, fontSize: 20, fontWeight: 'bold', fill: accentColor, width: 250, textAlign: 'right'
          })
        );
        objects.push(topBg, accentBorder, codePill, codeText, nameText, countryText, bottomBg, bottomAccent, eventText, infoText);
      } else if (variant === 2) {
        // ── Variant 2: Crew / Team Profile Card ──
        const flagCol = new fabric.Rect(createProps('rect', {
          left: 90, top: 860, width: 80, height: 110, fill: accentColor, rx: 8, ry: 8
        }));
        const flagText = new fabric.Textbox(data.flag || "🏳️", createProps('textbox', {
          left: 90, top: 890, fontSize: 44, width: 80, textAlign: 'center'
        }));

        const contentCol = new fabric.Rect(createProps('rect', {
          left: 170, top: 860, width: 600, height: 110, fill: primaryColor, rx: 8, ry: 8
        }));
        const topBorder = new fabric.Rect(createProps('rect', {
          left: 170, top: 860, width: 600, height: 4, fill: accentColor
        }));
        const sportTag = new fabric.Textbox(`${code} • ${data.country || "TEAM"}`, createProps('textbox', {
          left: 195, top: 870, fontSize: 13, fontWeight: 'bold', fill: accentColor, width: 550
        }));
        const crewName = new fabric.Textbox((data.athlete || data.teamA || "CREW NAME").toUpperCase(), createProps('textbox', {
          left: 195, top: 890, fontSize: 30, fontWeight: 'bold', fill: '#ffffff', width: 550
        }));
        const crewSub = new fabric.Textbox(`${data.event || sportTitle} ${data.rank ? '• RANK: ' + data.rank : ''}`, createProps('textbox', {
          left: 195, top: 930, fontSize: 17, fontWeight: 'bold', fill: '#cbd5e1', width: 550
        }));
        objects.push(flagCol, flagText, contentCol, topBorder, sportTag, crewName, crewSub);
      } else if (variant === 3) {
        // ── Variant 3: Olympic / World Champion Card ──
        const goldBar = new fabric.Rect(createProps('rect', {
          left: 90, top: 855, width: 600, height: 6, fill: accentColor, rx: 3, ry: 3
        }));
        const nameRow = new fabric.Rect(createProps('rect', {
          left: 90, top: 865, width: 650, height: 60, fill: '#050a14'
        }));
        const accentBorder = new fabric.Rect(createProps('rect', {
          left: 90, top: 865, width: 8, height: 60, fill: accentColor
        }));
        const badgeBg = new fabric.Rect(createProps('rect', {
          left: 110, top: 880, width: 110, height: 30, fill: accentColor, rx: 15, ry: 15
        }));
        const badgeText = new fabric.Textbox("🥇 CHAMPION", createProps('textbox', {
          left: 110, top: 885, fontSize: 12, fontWeight: 'bold', fill: '#000000', width: 110, textAlign: 'center'
        }));
        const champName = new fabric.Textbox((data.athlete || "ATHLETE NAME").toUpperCase(), createProps('textbox', {
          left: 235, top: 876, fontSize: 34, fontWeight: 'bold', fill: '#ffffff', width: 420
        }));
        const flagText = new fabric.Textbox(data.flag || "🏳️", createProps('textbox', {
          left: 665, top: 878, fontSize: 28, width: 60, textAlign: 'center'
        }));

        const detailRow = new fabric.Rect(createProps('rect', {
          left: 90, top: 925, width: 600, height: 45, fill: primaryColor
        }));
        const detailText = new fabric.Textbox(`${data.country || code} • ${data.event || sportTitle} ${data.time ? '• ' + data.time : ''} ${data.score ? '• ' + data.score : ''}`, createProps('textbox', {
          left: 115, top: 935, fontSize: 18, fontWeight: 'bold', fill: '#ffffff', width: 560
        }));
        objects.push(goldBar, nameRow, accentBorder, badgeBg, badgeText, champName, flagText, detailRow, detailText);
      } else if (variant === 4) {
        // ── Variant 4: Coach / Official ID Card ──
        const roleCol = new fabric.Rect(createProps('rect', {
          left: 90, top: 850, width: 14, height: 120, fill: accentColor
        }));
        const infoBlock = new fabric.Rect(createProps('rect', {
          left: 104, top: 850, width: 550, height: 120, fill: '#0a0e1e'
        }));
        const roleLabel = new fabric.Textbox(`HEAD COACH • ${code}`, createProps('textbox', {
          left: 130, top: 862, fontSize: 13, fontWeight: 'bold', fill: accentColor, width: 500
        }));
        const personName = new fabric.Textbox((data.athlete || "COACH NAME").toUpperCase(), createProps('textbox', {
          left: 130, top: 882, fontSize: 32, fontWeight: 'bold', fill: '#ffffff', width: 500
        }));
        const personSub = new fabric.Textbox(data.event || sportTitle, createProps('textbox', {
          left: 130, top: 922, fontSize: 17, fontWeight: 'bold', fill: '#94a3b8', width: 500
        }));
        const countryTagBg = new fabric.Rect(createProps('rect', {
          left: 130, top: 948, width: 100, height: 26, fill: primaryColor, rx: 4, ry: 4
        }));
        const countryTagText = new fabric.Textbox(`${data.flag || "🏳️"} ${data.country || "NOC"}`, createProps('textbox', {
          left: 130, top: 952, fontSize: 14, fontWeight: 'bold', fill: '#ffffff', width: 100, textAlign: 'center'
        }));
        objects.push(roleCol, infoBlock, roleLabel, personName, personSub, countryTagBg, countryTagText);
      } else {
        // ── Variant 5: National Team / Country Profile Card ──
        const headerBg = new fabric.Rect(createProps('rect', {
          left: 90, top: 860, width: 600, height: 60, fill: primaryColor, rx: 8, ry: 8
        }));
        const topBorder = new fabric.Rect(createProps('rect', {
          left: 90, top: 916, width: 600, height: 4, fill: accentColor
        }));
        const flagText = new fabric.Textbox(data.flag || "🏳️", createProps('textbox', {
          left: 110, top: 870, fontSize: 38, width: 50
        }));
        const teamName = new fabric.Textbox((data.country || data.athlete || "TEAM").toUpperCase(), createProps('textbox', {
          left: 170, top: 872, fontSize: 32, fontWeight: 'bold', fill: '#ffffff', width: 390
        }));
        const codeBadge = new fabric.Rect(createProps('rect', {
          left: 580, top: 875, width: 80, height: 30, fill: accentColor, rx: 4, ry: 4
        }));
        const codeText = new fabric.Textbox(code, createProps('textbox', {
          left: 580, top: 880, fontSize: 16, fontWeight: 'bold', fill: '#000000', width: 80, textAlign: 'center'
        }));

        const subRowBg = new fabric.Rect(createProps('rect', {
          left: 90, top: 920, width: 600, height: 45, fill: '#000000', opacity: 0.75
        }));
        const subRowText = new fabric.Textbox(`${data.event || sportTitle} ${data.rank ? '• RANK #' + data.rank : ''} ${data.time ? '• BEST ' + data.time : ''}`, createProps('textbox', {
          left: 115, top: 932, fontSize: 18, fontWeight: 'bold', fill: '#cbd5e1', width: 550
        }));
        objects.push(headerBg, topBorder, flagText, teamName, codeBadge, codeText, subRowBg, subRowText);
      }
      break;
    }

    case 'scoreboard': {
      if (variant === 1 || variant === 4) {
        // Variant 1 & 4: Classic team matchup scoreboard (horizontal bug)
        const mainBg = new fabric.Rect(createProps('rect', {
          left: 90, top: 70, width: 750, height: 80, fill: '#0f172a', rx: 8, ry: 8
        }));
        const badgeBg = new fabric.Rect(createProps('rect', {
          left: 90, top: 70, width: 100, height: 80, fill: primaryColor
        }));
        const badgeAccent = new fabric.Rect(createProps('rect', {
          left: 187, top: 70, width: 3, height: 80, fill: accentColor
        }));
        const codeText = new fabric.Textbox(code, createProps('textbox', {
          left: 90, top: 90, fontSize: 20, fontWeight: 'bold', fill: '#ffffff', width: 100, textAlign: 'center'
        }));
        const subText = new fabric.Textbox("LOND 2012", createProps('textbox', {
          left: 90, top: 115, fontSize: 11, fontWeight: 'bold', fill: '#94a3b8', width: 100, textAlign: 'center'
        }));

        const teamA = new fabric.Textbox((data.teamA || data.athleteA || "TEAM A").toUpperCase(), createProps('textbox', {
          left: 205, top: 95, fontSize: 24, fontWeight: 'bold', fill: '#ffffff', width: 185
        }));
        const scoreABg = new fabric.Rect(createProps('rect', {
          left: 395, top: 88, width: 55, height: 44, fill: secondaryColor, rx: 4, ry: 4
        }));
        const scoreAText = new fabric.Textbox(String(data.scoreA || "0"), createProps('textbox', {
          left: 395, top: 94, fontSize: 28, fontWeight: 'bold', fill: accentColor, width: 55, textAlign: 'center'
        }));
        const scoreBBg = new fabric.Rect(createProps('rect', {
          left: 465, top: 88, width: 55, height: 44, fill: secondaryColor, rx: 4, ry: 4
        }));
        const scoreBText = new fabric.Textbox(String(data.scoreB || "0"), createProps('textbox', {
          left: 465, top: 94, fontSize: 28, fontWeight: 'bold', fill: accentColor, width: 55, textAlign: 'center'
        }));
        const teamB = new fabric.Textbox((data.teamB || data.athleteB || "TEAM B").toUpperCase(), createProps('textbox', {
          left: 535, top: 95, fontSize: 24, fontWeight: 'bold', fill: '#ffffff', width: 185
        }));
        const clockBg = new fabric.Rect(createProps('rect', {
          left: 720, top: 70, width: 120, height: 80, fill: '#1e293b'
        }));
        const periodText = new fabric.Textbox(data.period || "LIVE", createProps('textbox', {
          left: 720, top: 85, fontSize: 14, fontWeight: 'bold', fill: '#94a3b8', width: 120, textAlign: 'center'
        }));
        const clockText = new fabric.Textbox(data.clock || "00:00", createProps('textbox', {
          left: 720, top: 110, fontSize: 20, fontWeight: 'bold', fill: accentColor, width: 120, textAlign: 'center'
        }));
        objects.push(mainBg, badgeBg, badgeAccent, codeText, subText, teamA, scoreABg, scoreAText, scoreBBg, scoreBText, teamB, clockBg, periodText, clockText);
      } else if (variant === 2 || variant === 5) {
        // Variant 2 & 5: Heat draw / start list compact card
        const cardBg = new fabric.Rect(createProps('rect', {
          left: 1270, top: 120, width: 560, height: 350, fill: '#0a0e1e', rx: 10, ry: 10
        }));
        const headBg = new fabric.Rect(createProps('rect', {
          left: 1270, top: 120, width: 560, height: 60, fill: primaryColor, rx: 10, ry: 10
        }));
        const headAccent = new fabric.Rect(createProps('rect', {
          left: 1270, top: 176, width: 560, height: 4, fill: accentColor
        }));
        const headText = new fabric.Textbox(`HEAT DRAW • ${sportTitle}`, createProps('textbox', {
          left: 1290, top: 135, fontSize: 20, fontWeight: 'bold', fill: '#ffffff', width: 400
        }));
        const headCode = new fabric.Textbox(code, createProps('textbox', {
          left: 1730, top: 135, fontSize: 20, fontWeight: 'bold', fill: accentColor, width: 80, textAlign: 'right'
        }));
        objects.push(cardBg, headBg, headAccent, headText, headCode);

        [1,2,3,4,5,6].forEach(n => {
          const y = 180 + (n - 1) * 45;
          const rowBg = new fabric.Rect(createProps('rect', {
            left: 1270, top: y, width: 560, height: 44, fill: n % 2 === 0 ? '#1e293b' : '#0a0e1e'
          }));
          const circle = new fabric.Circle(createProps('circle', {
            left: 1285, top: y + 7, radius: 15, fill: secondaryColor
          }));
          const laneText = new fabric.Textbox(String(n), createProps('textbox', {
            left: 1285, top: y + 13, fontSize: 16, fontWeight: 'bold', fill: accentColor, width: 30, textAlign: 'center'
          }));
          const nameText = new fabric.Textbox(`COMPETITOR ${n}`, createProps('textbox', {
            left: 1330, top: y + 12, fontSize: 17, fontWeight: 'bold', fill: '#ffffff', width: 350
          }));
          const nocText = new fabric.Textbox(`NOC${n}`, createProps('textbox', {
            left: 1730, top: y + 14, fontSize: 14, fontWeight: 'bold', fill: '#94a3b8', width: 80, textAlign: 'right'
          }));
          objects.push(rowBg, circle, laneText, nameText, nocText);
        });
      } else {
        // Variant 3: Live lane position bug
        const posLabel = new fabric.Rect(createProps('rect', {
          left: 90, top: 70, width: 110, height: 75, fill: primaryColor
        }));
        const posAccent = new fabric.Rect(createProps('rect', {
          left: 197, top: 70, width: 3, height: 75, fill: accentColor
        }));
        const posLabelText = new fabric.Textbox("LIVE\nPOSITION", createProps('textbox', {
          left: 90, top: 85, fontSize: 13, fontWeight: 'bold', fill: '#ffffff', width: 110, textAlign: 'center'
        }));

        const item1Bg = new fabric.Rect(createProps('rect', {
          left: 200, top: 70, width: 220, height: 75, fill: secondaryColor
        }));
        const item1Name = new fabric.Textbox(`1. ${(data.athleteA || data.teamA || data.athlete || 'LEADER').toUpperCase()}`, createProps('textbox', {
          left: 215, top: 82, fontSize: 20, fontWeight: 'bold', fill: accentColor, width: 190
        }));
        const item1Time = new fabric.Textbox(data.time || 'LEADING', createProps('textbox', {
          left: 215, top: 112, fontSize: 14, fontWeight: 'bold', fill: '#94a3b8', width: 190
        }));

        const item2Bg = new fabric.Rect(createProps('rect', {
          left: 420, top: 70, width: 200, height: 75, fill: '#0f172a'
        }));
        const item2Name = new fabric.Textbox(`2. ${(data.athleteB || data.teamB || 'CHALLENGER').toUpperCase()}`, createProps('textbox', {
          left: 435, top: 82, fontSize: 20, fontWeight: 'bold', fill: '#ffffff', width: 170
        }));
        const item2Time = new fabric.Textbox('+0.52', createProps('textbox', {
          left: 435, top: 112, fontSize: 14, fontWeight: 'bold', fill: '#94a3b8', width: 170
        }));

        const codeBadge = new fabric.Rect(createProps('rect', {
          left: 620, top: 70, width: 70, height: 75, fill: accentColor
        }));
        const codeText = new fabric.Textbox(code, createProps('textbox', {
          left: 620, top: 95, fontSize: 18, fontWeight: 'bold', fill: '#000000', width: 70, textAlign: 'center'
        }));
        objects.push(posLabel, posAccent, posLabelText, item1Bg, item1Name, item1Time, item2Bg, item2Name, item2Time, codeBadge, codeText);
      }
      break;
    }

    case 'start-list': {
      const lineup = get11PlayerLineup(sport);

      const cardBg = new fabric.Rect(createProps('rect', {
        left: 90, top: 100, width: 820, height: 60 + lineup.length * 44, fill: '#0f172a', rx: 12, ry: 12
      }));
      const headerBg = new fabric.Rect(createProps('rect', {
        left: 90, top: 100, width: 820, height: 60, fill: primaryColor, rx: 12, ry: 12
      }));
      const headerAccent = new fabric.Rect(createProps('rect', {
        left: 90, top: 156, width: 820, height: 4, fill: accentColor
      }));
      const titleText = new fabric.Textbox(sportTitle, createProps('textbox', {
        left: 115, top: 110, fontSize: 22, fontWeight: 'bold', fill: '#ffffff', width: 550
      }));
      const subtitleText = new fabric.Textbox(data.event || 'START LIST - FINAL DRAW', createProps('textbox', {
        left: 115, top: 134, fontSize: 14, fontWeight: 'bold', fill: accentColor, width: 550
      }));
      const codeHeader = new fabric.Textbox(code, createProps('textbox', {
        left: 760, top: 118, fontSize: 22, fontWeight: 'bold', fill: accentColor, width: 120, textAlign: 'center'
      }));

      objects.push(cardBg, headerBg, headerAccent, titleText, subtitleText, codeHeader);

      lineup.forEach((item, idx) => {
        const y = 160 + idx * 44;
        const rowBg = new fabric.Rect(createProps('rect', {
          left: 90, top: y, width: 820, height: 42, fill: idx % 2 === 0 ? '#1e293b' : '#0f172a'
        }));
        const circle = new fabric.Circle(createProps('circle', {
          left: 110, top: y + 6, radius: 15, fill: secondaryColor
        }));
        const laneText = new fabric.Textbox(String(item.lane), createProps('textbox', {
          left: 110, top: y + 11, fontSize: 14, fontWeight: 'bold', fill: accentColor, width: 30, textAlign: 'center'
        }));
        const nameText = new fabric.Textbox(item.name.toUpperCase(), createProps('textbox', {
          left: 155, top: y + 10, fontSize: 17, fontWeight: 'bold', fill: '#ffffff', width: 580
        }));
        const nocBg = new fabric.Rect(createProps('rect', {
          left: 810, top: y + 8, width: 80, height: 26, fill: '#334155', rx: 4, ry: 4
        }));
        const nocText = new fabric.Textbox(item.country, createProps('textbox', {
          left: 810, top: y + 12, fontSize: 14, fontWeight: 'bold', fill: '#ffffff', width: 80, textAlign: 'center'
        }));

        objects.push(rowBg, circle, laneText, nameText, nocBg, nocText);
      });
      break;
    }

    case 'results-table': {
      if (variant === 1 || variant === 4) {
        // Variant 1 & 4: Classic podium top-3 results card
        const cardBg = new fabric.Rect(createProps('rect', {
          left: 90, top: 150, width: 750, height: 260, fill: '#0f172a', rx: 12, ry: 12
        }));
        const headerBg = new fabric.Rect(createProps('rect', {
          left: 90, top: 150, width: 750, height: 60, fill: primaryColor, rx: 12, ry: 12
        }));
        const headerAccent = new fabric.Rect(createProps('rect', {
          left: 90, top: 206, width: 750, height: 4, fill: accentColor
        }));
        const titleText = new fabric.Textbox(`${sportTitle} RESULTS`, createProps('textbox', {
          left: 115, top: 168, fontSize: 24, fontWeight: 'bold', fill: '#ffffff', width: 500
        }));
        const codeHeader = new fabric.Textbox(code, createProps('textbox', {
          left: 715, top: 168, fontSize: 24, fontWeight: 'bold', fill: accentColor, width: 100, textAlign: 'right'
        }));

        // Gold
        const goldPill = new fabric.Rect(createProps('rect', {
          left: 115, top: 222, width: 90, height: 30, fill: '#ffd700', rx: 4, ry: 4
        }));
        const goldPillText = new fabric.Textbox("1 GOLD", createProps('textbox', {
          left: 115, top: 227, fontSize: 16, fontWeight: 'bold', fill: '#000000', width: 90, textAlign: 'center'
        }));
        const goldAthlete = new fabric.Textbox((data.athlete || "ATHLETE A").toUpperCase(), createProps('textbox', {
          left: 220, top: 224, fontSize: 20, fontWeight: 'bold', fill: '#ffffff', width: 380
        }));
        const goldNoc = new fabric.Textbox(data.country || "USA", createProps('textbox', {
          left: 610, top: 224, fontSize: 18, fontWeight: 'bold', fill: '#cbd5e1', width: 60
        }));
        const goldTime = new fabric.Textbox(data.time || data.score || "1st", createProps('textbox', {
          left: 680, top: 224, fontSize: 20, fontWeight: 'bold', fill: accentColor, width: 130, textAlign: 'right'
        }));

        // Silver
        const silverPill = new fabric.Rect(createProps('rect', {
          left: 115, top: 272, width: 90, height: 30, fill: '#c0c0c0', rx: 4, ry: 4
        }));
        const silverPillText = new fabric.Textbox("2 SILV", createProps('textbox', {
          left: 115, top: 277, fontSize: 16, fontWeight: 'bold', fill: '#000000', width: 90, textAlign: 'center'
        }));
        const silverAthlete = new fabric.Textbox("COMPETITOR B", createProps('textbox', {
          left: 220, top: 274, fontSize: 20, fontWeight: 'bold', fill: '#ffffff', width: 380
        }));
        const silverNoc = new fabric.Textbox("GBR", createProps('textbox', {
          left: 610, top: 274, fontSize: 18, fontWeight: 'bold', fill: '#cbd5e1', width: 60
        }));
        const silverTime = new fabric.Textbox("+0.12", createProps('textbox', {
          left: 680, top: 274, fontSize: 20, fontWeight: 'bold', fill: '#ffffff', width: 130, textAlign: 'right'
        }));

        // Bronze
        const bronzePill = new fabric.Rect(createProps('rect', {
          left: 115, top: 322, width: 90, height: 30, fill: '#cd7f32', rx: 4, ry: 4
        }));
        const bronzePillText = new fabric.Textbox("3 BRNZ", createProps('textbox', {
          left: 115, top: 327, fontSize: 16, fontWeight: 'bold', fill: '#000000', width: 90, textAlign: 'center'
        }));
        const bronzeAthlete = new fabric.Textbox("COMPETITOR C", createProps('textbox', {
          left: 220, top: 324, fontSize: 20, fontWeight: 'bold', fill: '#ffffff', width: 380
        }));
        const bronzeNoc = new fabric.Textbox("GER", createProps('textbox', {
          left: 610, top: 324, fontSize: 18, fontWeight: 'bold', fill: '#cbd5e1', width: 60
        }));
        const bronzeTime = new fabric.Textbox("+0.35", createProps('textbox', {
          left: 680, top: 324, fontSize: 20, fontWeight: 'bold', fill: '#ffffff', width: 130, textAlign: 'right'
        }));

        objects.push(cardBg, headerBg, headerAccent, titleText, codeHeader, goldPill, goldPillText, goldAthlete, goldNoc, goldTime, silverPill, silverPillText, silverAthlete, silverNoc, silverTime, bronzePill, bronzePillText, bronzeAthlete, bronzeNoc, bronzeTime);
      } else if (variant === 2 || variant === 5) {
        // Variant 2 & 5: Extended 6-finisher results table
        const cardBg = new fabric.Rect(createProps('rect', {
          left: 90, top: 100, width: 900, height: 380, fill: '#0a0e1e', rx: 12, ry: 12
        }));
        const headerBg = new fabric.Rect(createProps('rect', {
          left: 90, top: 100, width: 900, height: 55, fill: primaryColor, rx: 12, ry: 12
        }));
        const headerAccent = new fabric.Rect(createProps('rect', {
          left: 90, top: 151, width: 900, height: 4, fill: accentColor
        }));
        const titleText = new fabric.Textbox(`${sportTitle} FINAL RESULTS`, createProps('textbox', {
          left: 115, top: 116, fontSize: 22, fontWeight: 'bold', fill: '#ffffff', width: 600
        }));
        const codeHeader = new fabric.Textbox(code, createProps('textbox', {
          left: 860, top: 116, fontSize: 22, fontWeight: 'bold', fill: accentColor, width: 100, textAlign: 'right'
        }));
        objects.push(cardBg, headerBg, headerAccent, titleText, codeHeader);

        const resultsData = [
          { pos: '🥇 1', name: (data.athlete || 'ATHLETE A').toUpperCase(), noc: data.country || 'USA', res: data.time || '3:33.10' },
          { pos: '2', name: 'COMPETITOR B', noc: 'GBR', res: '+0.12' },
          { pos: '3', name: 'COMPETITOR C', noc: 'GER', res: '+0.35' },
          { pos: '4', name: 'COMPETITOR D', noc: 'FRA', res: '+0.72' },
          { pos: '5', name: 'COMPETITOR E', noc: 'AUS', res: '+1.01' },
          { pos: '6', name: 'COMPETITOR F', noc: 'CHN', res: '+1.45' }
        ];

        resultsData.forEach((r, idx) => {
          const y = 155 + idx * 52;
          const rowBg = new fabric.Rect(createProps('rect', {
            left: 90, top: y, width: 900, height: 50, fill: idx % 2 === 0 ? '#1e293b' : '#0a0e1e'
          }));
          const posText = new fabric.Textbox(r.pos, createProps('textbox', {
            left: 110, top: y + 13, fontSize: 20, fontWeight: 'bold', fill: accentColor, width: 50
          }));
          const nameText = new fabric.Textbox(r.name, createProps('textbox', {
            left: 170, top: y + 13, fontSize: 18, fontWeight: 'bold', fill: '#ffffff', width: 500
          }));
          const nocText = new fabric.Textbox(r.noc, createProps('textbox', {
            left: 700, top: y + 14, fontSize: 15, fontWeight: 'bold', fill: '#cbd5e1', width: 60
          }));
          const resText = new fabric.Textbox(r.res, createProps('textbox', {
            left: 770, top: y + 13, fontSize: 18, fontWeight: 'bold', fill: accentColor, width: 190, textAlign: 'right'
          }));
          objects.push(rowBg, posText, nameText, nocText, resText);
        });
      } else {
        // Variant 3: Split comparison table
        const cardBg = new fabric.Rect(createProps('rect', {
          left: 1130, top: 120, width: 700, height: 260, fill: '#0a0e1e', rx: 12, ry: 12
        }));
        const headerBg = new fabric.Rect(createProps('rect', {
          left: 1130, top: 120, width: 700, height: 55, fill: primaryColor, rx: 12, ry: 12
        }));
        const headerAccent = new fabric.Rect(createProps('rect', {
          left: 1130, top: 171, width: 700, height: 4, fill: accentColor
        }));
        const titleText = new fabric.Textbox("SPLIT COMPARISON", createProps('textbox', {
          left: 1150, top: 135, fontSize: 20, fontWeight: 'bold', fill: '#ffffff', width: 450
        }));
        const codeHeader = new fabric.Textbox(code, createProps('textbox', {
          left: 1730, top: 135, fontSize: 20, fontWeight: 'bold', fill: accentColor, width: 80, textAlign: 'right'
        }));

        const colHeadBg = new fabric.Rect(createProps('rect', {
          left: 1130, top: 175, width: 700, height: 35, fill: '#1e293b'
        }));
        const col1 = new fabric.Textbox("ATHLETE", createProps('textbox', { left: 1150, top: 184, fontSize: 13, fontWeight: 'bold', fill: '#94a3b8', width: 250 }));
        const col2 = new fabric.Textbox("250m", createProps('textbox', { left: 1410, top: 184, fontSize: 13, fontWeight: 'bold', fill: '#94a3b8', width: 120 }));
        const col3 = new fabric.Textbox("500m", createProps('textbox', { left: 1540, top: 184, fontSize: 13, fontWeight: 'bold', fill: '#94a3b8', width: 120 }));
        const col4 = new fabric.Textbox("FINISH", createProps('textbox', { left: 1670, top: 184, fontSize: 13, fontWeight: 'bold', fill: '#94a3b8', width: 140, textAlign: 'right' }));

        const r1Name = new fabric.Textbox(`${(data.athlete || 'LEADER').toUpperCase()} #1`, createProps('textbox', { left: 1150, top: 222, fontSize: 16, fontWeight: 'bold', fill: '#ffffff', width: 250 }));
        const r1C2 = new fabric.Textbox(data.time || '52.3s', createProps('textbox', { left: 1410, top: 222, fontSize: 16, fontWeight: 'bold', fill: accentColor, width: 120 }));
        const r1C3 = new fabric.Textbox('1:52.4', createProps('textbox', { left: 1540, top: 222, fontSize: 16, fontWeight: 'bold', fill: '#ffffff', width: 120 }));
        const r1C4 = new fabric.Textbox(data.score || '3:33.1', createProps('textbox', { left: 1670, top: 222, fontSize: 16, fontWeight: 'bold', fill: accentColor, width: 140, textAlign: 'right' }));

        const r2Name = new fabric.Textbox("COMP B #2", createProps('textbox', { left: 1150, top: 262, fontSize: 16, fontWeight: 'bold', fill: '#ffffff', width: 250 }));
        const r2C2 = new fabric.Textbox('52.8s', createProps('textbox', { left: 1410, top: 262, fontSize: 16, fontWeight: 'bold', fill: '#ffffff', width: 120 }));
        const r2C3 = new fabric.Textbox('1:53.1', createProps('textbox', { left: 1540, top: 262, fontSize: 16, fontWeight: 'bold', fill: '#ffffff', width: 120 }));
        const r2C4 = new fabric.Textbox('+0.12', createProps('textbox', { left: 1670, top: 262, fontSize: 16, fontWeight: 'bold', fill: '#ffffff', width: 140, textAlign: 'right' }));

        const r3Name = new fabric.Textbox("COMP C #3", createProps('textbox', { left: 1150, top: 302, fontSize: 16, fontWeight: 'bold', fill: '#ffffff', width: 250 }));
        const r3C2 = new fabric.Textbox('53.0s', createProps('textbox', { left: 1410, top: 302, fontSize: 16, fontWeight: 'bold', fill: '#ffffff', width: 120 }));
        const r3C3 = new fabric.Textbox('1:53.5', createProps('textbox', { left: 1540, top: 302, fontSize: 16, fontWeight: 'bold', fill: '#ffffff', width: 120 }));
        const r3C4 = new fabric.Textbox('+0.35', createProps('textbox', { left: 1670, top: 302, fontSize: 16, fontWeight: 'bold', fill: '#ffffff', width: 140, textAlign: 'right' }));

        objects.push(cardBg, headerBg, headerAccent, titleText, codeHeader, colHeadBg, col1, col2, col3, col4, r1Name, r1C2, r1C3, r1C4, r2Name, r2C2, r2C3, r2C4, r3Name, r3C2, r3C3, r3C4);
      }
      break;
    }

    case 'race-clock': {
      const normName = (templateName || "").toLowerCase();
      const normId = (templateId || "").toLowerCase();

      const isSW130 = normName.includes("finish with standings") || normId.includes("130");
      const isSW129 = normName.includes("standings") || normId.includes("129");
      const isSW128 = normName.includes("split point") || normName.includes("finish") || normName.includes("lap") || normId.includes("128");
      const isSW126 = normName.includes("delta") || normId.includes("126");

      const hasLeftLap = isSW128 || isSW129 || isSW130;
      const hasDelta = isSW126 || isSW129 || isSW130;

      const clockTime = data.time || data.clock || (isSW130 ? "1:59:27.7" : isSW129 ? "59:40" : isSW126 ? "1:21:14" : isSW128 ? "59:20" : "36:41");
      const deltaTime = data.delta || (isSW130 ? "+0:01" : isSW129 ? "+0:12" : "+0:07");
      const lapText = data.lap || data.splitInfo || (isSW130 ? "FINISH" : "LAP 3 OF 6");

      const standingsList = data.standings || [
        { rank: "1", country: "RUS", flag: "🇷🇺", bib: "12", name: "L. ILCHENKO", time: isSW130 ? "1:59:27.7" : "59:28.6" },
        { rank: "2", country: "GBR", flag: "🇬🇧", bib: "21", name: "K.A. PAYNE", time: "+0.9" },
        { rank: "3", country: "GBR", flag: "🇬🇧", bib: "2", name: "C. PATTEN", time: "+2.1" },
        { rank: "4", country: "GER", flag: "🇩🇪", bib: "18", name: "A. MAURER", time: "+5.2" },
        { rank: "5", country: "BRA", flag: "🇧🇷", bib: "1", name: "A. CUNHA", time: "+6.1" },
        { rank: "6", country: "SUI", flag: "🇨🇭", bib: "15", name: "S. OBERSON", time: "+7.9" },
        { rank: "7", country: "BRA", flag: "🇧🇷", bib: "20", name: "P. OKIMOTO", time: "+10.2" }
      ];

      const leaderRow = standingsList[0];
      const clockY = isSW129 ? 250 : isSW130 ? 125 : 70;

      if (isSW130) {
        const leadBar = new fabric.Rect(createProps('rect', { left: 90, top: 70, width: 480, height: 38, fill: primaryColor, rx: 4, ry: 4 }));
        const leadRankBg = new fabric.Rect(createProps('rect', { left: 98, top: 75, width: 24, height: 28, fill: '#dc2626', rx: 3, ry: 3 }));
        const leadRankTxt = new fabric.Textbox(leaderRow.rank, createProps('textbox', { left: 98, top: 79, fontSize: 14, fontWeight: 'bold', fill: '#ffffff', width: 24, textAlign: 'center' }));
        const leadInfo = new fabric.Textbox(`${leaderRow.country} ${leaderRow.flag}  ${leaderRow.bib} ${leaderRow.name}`, createProps('textbox', { left: 130, top: 79, fontSize: 14, fontWeight: 'bold', fill: '#ffffff', width: 290 }));
        const leadTime = new fabric.Textbox(leaderRow.time, createProps('textbox', { left: 430, top: 79, fontSize: 15, fontWeight: 'bold', fill: '#ffffff', width: 130, textAlign: 'right' }));
        objects.push(leadBar, leadRankBg, leadRankTxt, leadInfo, leadTime);
      } else if (isSW129) {
        standingsList.slice(0, 4).forEach((st, i) => {
          const rowY = 70 + i * 44;
          const leadBar = new fabric.Rect(createProps('rect', { left: 90, top: rowY, width: 480, height: 38, fill: primaryColor, rx: 4, ry: 4 }));
          const leadRankBg = new fabric.Rect(createProps('rect', { left: 98, top: rowY + 5, width: 24, height: 28, fill: '#dc2626', rx: 3, ry: 3 }));
          const leadRankTxt = new fabric.Textbox(st.rank, createProps('textbox', { left: 98, top: rowY + 9, fontSize: 14, fontWeight: 'bold', fill: '#ffffff', width: 24, textAlign: 'center' }));
          const leadInfo = new fabric.Textbox(`${st.country} ${st.flag}  ${st.bib} ${st.name}`, createProps('textbox', { left: 130, top: rowY + 9, fontSize: 14, fontWeight: 'bold', fill: '#ffffff', width: 290 }));
          const leadTime = new fabric.Textbox(st.time, createProps('textbox', { left: 430, top: rowY + 9, fontSize: 15, fontWeight: 'bold', fill: i === 0 ? accentColor : '#ffffff', width: 130, textAlign: 'right' }));
          objects.push(leadBar, leadRankBg, leadRankTxt, leadInfo, leadTime);
        });
        standingsList.slice(4).forEach((st, i) => {
          const rowY = 70 + i * 44;
          const leadBar = new fabric.Rect(createProps('rect', { left: 614, top: rowY, width: 480, height: 38, fill: primaryColor, rx: 4, ry: 4 }));
          const leadRankBg = new fabric.Rect(createProps('rect', { left: 622, top: rowY + 5, width: 24, height: 28, fill: '#dc2626', rx: 3, ry: 3 }));
          const leadRankTxt = new fabric.Textbox(st.rank, createProps('textbox', { left: 622, top: rowY + 9, fontSize: 14, fontWeight: 'bold', fill: '#ffffff', width: 24, textAlign: 'center' }));
          const leadInfo = new fabric.Textbox(`${st.country} ${st.flag}  ${st.bib} ${st.name}`, createProps('textbox', { left: 654, top: rowY + 9, fontSize: 14, fontWeight: 'bold', fill: '#ffffff', width: 290 }));
          const leadTime = new fabric.Textbox(st.time, createProps('textbox', { left: 954, top: rowY + 9, fontSize: 15, fontWeight: 'bold', fill: '#ffffff', width: 130, textAlign: 'right' }));
          objects.push(leadBar, leadRankBg, leadRankTxt, leadInfo, leadTime);
        });
      }

      if (hasLeftLap) {
        const lapBg = new fabric.Rect(createProps('rect', { left: 90, top: clockY, width: 180, height: 44, fill: '#e2e8f0', rx: 6, ry: 6 }));
        const lapTxt = new fabric.Textbox(lapText, createProps('textbox', { left: 90, top: clockY + 10, fontSize: 18, fontWeight: 'bold', fill: '#003366', fontStyle: 'italic', width: 180, textAlign: 'center' }));
        objects.push(lapBg, lapTxt);
      }

      let rightX = isSW129 ? 614 : 1720;
      if (hasDelta) {
        rightX = isSW129 ? 614 : 1600;
        const deltaBg = new fabric.Rect(createProps('rect', { left: isSW129 ? 614 : 1480, top: clockY, width: 110, height: 48, fill: primaryColor, rx: 6, ry: 6 }));
        const deltaTxt = new fabric.Textbox(deltaTime, createProps('textbox', { left: isSW129 ? 614 : 1480, top: clockY + 10, fontSize: 20, fontWeight: 'bold', fill: '#ffffff', fontStyle: 'italic', width: 110, textAlign: 'center' }));
        objects.push(deltaBg, deltaTxt);
        rightX = isSW129 ? 710 : 1600;
      }

      const timeBg = new fabric.Rect(createProps('rect', { left: rightX, top: clockY, width: 140, height: 48, fill: '#e2e8f0', rx: 6, ry: 6 }));
      const timeText = new fabric.Textbox(clockTime, createProps('textbox', { left: rightX, top: clockY + 8, fontSize: 24, fontWeight: 'bold', fill: '#003366', fontStyle: 'italic', width: 140, textAlign: 'center' }));

      const codeBg = new fabric.Rect(createProps('rect', { left: rightX + 130, top: clockY, width: 80, height: 48, fill: primaryColor, rx: 6, ry: 6 }));
      const codeText = new fabric.Textbox(code, createProps('textbox', { left: rightX + 130, top: clockY + 12, fontSize: 18, fontWeight: 'bold', fill: accentColor, fontStyle: 'italic', width: 80, textAlign: 'center' }));

      objects.push(timeBg, timeText, codeBg, codeText);
      break;
    }
    case 'medal-presenter': {
      const isFlower = (templateName || "").toLowerCase().includes("flower");
      const defaultName = isFlower ? "MR BILL MATSON" : "JACQUES ROGGE";
      const defaultTitle = isFlower ? "VICE-PRESIDENT, FINA" : "IOC PRESIDENT, BELGIUM";

      const presenterName = (data.presenter || data.athlete || defaultName).toUpperCase();
      const presenterTitle = (data.title || data.designation || defaultTitle).toUpperCase();

      const mainBar = new fabric.Rect(createProps('rect', {
        left: 120, top: 880, width: 780, height: 50, fill: primaryColor, rx: 6, ry: 6
      }));
      const nameText = new fabric.Textbox(presenterName, createProps('textbox', {
        left: 145, top: 893, fontSize: 24, fontWeight: 'bold', fill: '#ffffff', fontStyle: 'italic', width: 640
      }));
      const codeHeader = new fabric.Textbox(code, createProps('textbox', {
        left: 810, top: 893, fontSize: 20, fontWeight: 'bold', fill: accentColor, width: 70, textAlign: 'right'
      }));

      const subBar = new fabric.Rect(createProps('rect', {
        left: 120, top: 932, width: 780, height: 38, fill: '#0a1329', rx: 4, ry: 4
      }));
      const subText = new fabric.Textbox(presenterTitle, createProps('textbox', {
        left: 145, top: 942, fontSize: 16, fontWeight: 'bold', fill: '#cbd5e1', fontStyle: 'italic', width: 730
      }));

      objects.push(mainBar, nameText, codeHeader, subBar, subText);
      break;
    }
    case 'medal-tally': {
      const eventName = (data.event || `${sportTitle} FINAL`).toUpperCase();
      const goldAthlete = (data.goldAthlete || data.athlete || "MAARTEN VAN DER WEIJDEN").toUpperCase();
      const goldNoc = (data.goldCountry || data.country || "NED").toUpperCase();
      const goldFlag = data.goldFlag || "🇳🇱";

      const silverAthlete = (data.silverAthlete || "DAVID DAVIES").toUpperCase();
      const silverNoc = (data.silverCountry || "GBR").toUpperCase();
      const silverFlag = data.silverFlag || "🇬🇧";

      const bronzeAthlete = (data.bronzeAthlete || "THOMAS LURZ").toUpperCase();
      const bronzeNoc = (data.bronzeCountry || "GER").toUpperCase();
      const bronzeFlag = data.bronzeFlag || "🇩🇪";

      const mainBar = new fabric.Rect(createProps('rect', {
        left: 120, top: 820, width: 820, height: 50, fill: primaryColor, rx: 6, ry: 6
      }));
      const iconText = new fabric.Textbox("🏊", createProps('textbox', {
        left: 140, top: 832, fontSize: 24, fill: '#ffffff', width: 40
      }));
      const titleText = new fabric.Textbox(eventName, createProps('textbox', {
        left: 185, top: 833, fontSize: 22, fontWeight: 'bold', fill: '#ffffff', width: 680
      }));
      const codeHeader = new fabric.Textbox(code, createProps('textbox', {
        left: 870, top: 833, fontSize: 20, fontWeight: 'bold', fill: accentColor, width: 60, textAlign: 'right'
      }));

      const subBar = new fabric.Rect(createProps('rect', {
        left: 120, top: 870, width: 820, height: 32, fill: '#cbd5e1', rx: 2, ry: 2
      }));
      const subText = new fabric.Textbox("VICTORY CEREMONY", createProps('textbox', {
        left: 140, top: 877, fontSize: 14, fontWeight: 'bold', fill: '#0f172a', width: 780
      }));

      // Row 1 (Gold)
      const r1Bg = new fabric.Rect(createProps('rect', { left: 120, top: 902, width: 820, height: 42, fill: '#0a1329' }));
      const r1Badge = new fabric.Circle(createProps('circle', { left: 135, top: 908, radius: 15, fill: '#ffd700' }));
      const r1BadgeTxt = new fabric.Textbox("🥇", createProps('textbox', { left: 135, top: 914, fontSize: 13, width: 30, textAlign: 'center' }));
      const r1Noc = new fabric.Textbox(`${goldNoc} ${goldFlag}`, createProps('textbox', { left: 180, top: 913, fontSize: 16, fontWeight: 'bold', fill: '#ffffff', width: 110 }));
      const r1Name = new fabric.Textbox(goldAthlete, createProps('textbox', { left: 300, top: 913, fontSize: 17, fontWeight: 'bold', fill: '#ffffff', width: 630 }));

      // Row 2 (Silver)
      const r2Bg = new fabric.Rect(createProps('rect', { left: 120, top: 944, width: 820, height: 42, fill: '#0f172a' }));
      const r2Badge = new fabric.Circle(createProps('circle', { left: 135, top: 950, radius: 15, fill: '#e2e8f0' }));
      const r2BadgeTxt = new fabric.Textbox("🥈", createProps('textbox', { left: 135, top: 956, fontSize: 13, width: 30, textAlign: 'center' }));
      const r2Noc = new fabric.Textbox(`${silverNoc} ${silverFlag}`, createProps('textbox', { left: 180, top: 955, fontSize: 16, fontWeight: 'bold', fill: '#ffffff', width: 110 }));
      const r2Name = new fabric.Textbox(silverAthlete, createProps('textbox', { left: 300, top: 955, fontSize: 17, fontWeight: 'bold', fill: '#ffffff', width: 630 }));

      // Row 3 (Bronze)
      const r3Bg = new fabric.Rect(createProps('rect', { left: 120, top: 986, width: 820, height: 42, fill: '#0a1329', rx: 6, ry: 6 }));
      const r3Badge = new fabric.Circle(createProps('circle', { left: 135, top: 992, radius: 15, fill: '#d97706' }));
      const r3BadgeTxt = new fabric.Textbox("🥉", createProps('textbox', { left: 135, top: 998, fontSize: 13, width: 30, textAlign: 'center' }));
      const r3Noc = new fabric.Textbox(`${bronzeNoc} ${bronzeFlag}`, createProps('textbox', { left: 180, top: 997, fontSize: 16, fontWeight: 'bold', fill: '#ffffff', width: 110 }));
      const r3Name = new fabric.Textbox(bronzeAthlete, createProps('textbox', { left: 300, top: 997, fontSize: 17, fontWeight: 'bold', fill: '#ffffff', width: 630 }));

      objects.push(
        mainBar, iconText, titleText, codeHeader, subBar, subText,
        r1Bg, r1Badge, r1BadgeTxt, r1Noc, r1Name,
        r2Bg, r2Badge, r2BadgeTxt, r2Noc, r2Name,
        r3Bg, r3Badge, r3BadgeTxt, r3Noc, r3Name
      );
      break;
    }

    case 'event-bug':
    default: {
      const bugBg = new fabric.Rect(createProps('rect', {
        left: 1280, top: 70, width: 550, height: 70, fill: primaryColor, rx: 6, ry: 6
      }));
      const rightBorder = new fabric.Rect(createProps('rect', {
        left: 1824, top: 70, width: 6, height: 70, fill: accentColor
      }));
      const codePill = new fabric.Rect(createProps('rect', {
        left: 1300, top: 85, width: 50, height: 40, fill: accentColor, rx: 4, ry: 4
      }));
      const codeText = new fabric.Textbox(code, createProps('textbox', {
        left: 1300, top: 94, fontSize: 18, fontWeight: 'bold', fill: '#000000', width: 50, textAlign: 'center'
      }));
      const titleText = new fabric.Textbox(sportTitle, createProps('textbox', {
        left: 1365, top: 85, fontSize: 20, fontWeight: 'bold', fill: '#ffffff', width: 440
      }));
      const venueText = new fabric.Textbox(venueTitle, createProps('textbox', {
        left: 1365, top: 110, fontSize: 13, fontWeight: 'bold', fill: '#cbd5e1', width: 440
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
