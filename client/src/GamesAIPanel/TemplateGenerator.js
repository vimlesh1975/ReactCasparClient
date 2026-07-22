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

export function generateBroadcastHTML(sport, templateType, customData = {}, styleOptions = {}, templateId = '') {
  const primaryColor = styleOptions.primaryColor || sport.primaryColor || "#005b96";
  const secondaryColor = styleOptions.secondaryColor || sport.secondaryColor || "#003366";
  const accentColor = styleOptions.accentColor || sport.accentColor || "#ffd700";
  const font = styleOptions.fontFamily || "'Outfit', 'Roboto', 'Segoe UI', sans-serif";

  const data = { ...sport.dataFields, ...customData };
  const sportTitle = sport.name.toUpperCase();
  const venueTitle = sport.venue.toUpperCase();
  const code = sport.code;

  const category = resolveCategory(templateType);

  // Derive a 1-based variant index from the template ID numeric suffix
  // e.g. CF001 → 1, AT003 → 3, SW007 → 7  → mapped to variant 1-5
  const idNum = parseInt((templateId || '').replace(/\D/g, '')) || 1;
  // We use a 5-variant cycle so each template in a sub-category looks different
  const variant = ((idNum - 1) % 5) + 1;

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
