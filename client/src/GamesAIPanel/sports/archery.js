/**
 * London 2012 Archery (AR) Broadcast Graphic Templates
 * Exact text, layout, and styling from reference images AR002 through AR038.
 */

import { generateUniqueId } from '../../common';

export function generateArcheryHTML(templateId = '', templateName = '', customData = {}, sport = {}, styleOptions = {}) {
  const font = styleOptions.fontFamily || "'Outfit', 'Roboto Condensed', 'Segoe UI', sans-serif";

  const normId = (templateId || "").toUpperCase();
  const normName = (templateName || "").toUpperCase();
  const combined = `${normId} ${normName}`;

  // Base Olympic Rings SVG
  const olympicRingsSVG = `
    <svg class="olympic-rings" viewBox="0 0 100 45" width="52" height="24" style="fill:none; stroke:#ffffff; stroke-width:3.5;">
      <circle cx="15" cy="16" r="11"/>
      <circle cx="38" cy="16" r="11"/>
      <circle cx="61" cy="16" r="11"/>
      <circle cx="84" cy="16" r="11"/>
      <circle cx="26.5" cy="27" r="11"/>
      <circle cx="49.5" cy="27" r="11"/>
      <circle cx="72.5" cy="27" r="11"/>
    </svg>
  `;

  // Archer Pictograph SVG Icon
  const archerPictographSVG = `
    <svg viewBox="0 0 100 100" width="34" height="34" style="fill:none; stroke:#ffffff; stroke-width:5; stroke-linecap:round;">
      <circle cx="35" cy="25" r="8" fill="#ffffff" stroke="none"/>
      <path d="M 30 38 L 55 45 L 30 55 M 35 75 L 45 55 L 60 70 M 20 50 L 78 50 M 65 25 C 55 40 55 60 65 75"/>
    </svg>
  `;

  // ── 1. AR002 / Venue ID ──────────────────────────────────────────────────
  if (combined.includes("AR002") || combined.includes("VENUE")) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .venue-container {
            position: absolute; bottom: 120px; left: 160px;
            display: flex; align-items: center;
          }

          .pictograph-badge {
            background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
            border: 2px solid rgba(255,255,255,0.6);
            border-radius: 6px 0 0 6px;
            width: 65px; height: 60px;
            display: flex; align-items: center; justify-content: center;
            transform: skewX(-15deg);
            z-index: 2; box-shadow: -4px 6px 16px rgba(0,0,0,0.5);
          }

          .venue-bar {
            background: linear-gradient(135deg, #092552 0%, #16407d 60%, #081d3d 100%);
            border: 2px solid rgba(255,255,255,0.5);
            border-left: none;
            border-radius: 0 10px 10px 0;
            height: 52px; width: 680px;
            display: flex; align-items: center; justify-content: space-between;
            padding: 0 20px 0 30px;
            transform: skewX(-15deg); margin-left: -8px;
            box-shadow: 6px 8px 24px rgba(0,0,0,0.6);
          }

          .venue-text {
            transform: skewX(15deg);
            color: #ffffff; font-size: 26px; font-weight: 900; font-style: italic;
            letter-spacing: 0.5px; text-shadow: 0 2px 4px rgba(0,0,0,0.5);
          }

          .rings-wrapper { transform: skewX(15deg); }
        </style>
      </head>
      <body>
        <div class="venue-container">
          <div class="pictograph-badge">
            <div style="transform: skewX(15deg);">${archerPictographSVG}</div>
          </div>
          <div class="venue-bar">
            <div class="venue-text">LORD'S CRICKET GROUND</div>
            <div class="rings-wrapper">${olympicRingsSVG}</div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ── 2. AR003 / Weather ───────────────────────────────────────────────────
  if (combined.includes("AR003") || combined.includes("WEATHER")) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,700;1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .weather-board {
            position: absolute; bottom: 140px; left: 160px;
            width: 520px;
            display: flex; flex-direction: column; gap: 2px;
          }

          .header-bar {
            background: linear-gradient(135deg, #092552 0%, #16407d 60%, #081d3d 100%);
            border: 2px solid rgba(255,255,255,0.5);
            border-radius: 8px 8px 0 0;
            height: 52px; padding: 0 20px;
            display: flex; align-items: center; justify-content: space-between;
            transform: skewX(-12deg);
            box-shadow: 0 6px 18px rgba(0,0,0,0.5);
          }

          .header-left {
            transform: skewX(12deg);
            display: flex; align-items: center; gap: 12px;
            color: #ffffff; font-size: 24px; font-weight: 900; font-style: italic; letter-spacing: 1px;
          }

          .subheader-bar {
            background: linear-gradient(180deg, #ffffff 0%, #dbefe9 30%, #a8d5e5 70%, #ffffff 100%);
            border: 1px solid rgba(255,255,255,0.8);
            height: 28px; padding-left: 20px;
            display: flex; align-items: center;
            transform: skewX(-12deg);
          }

          .subheader-text {
            transform: skewX(12deg);
            color: #092552; font-size: 15px; font-weight: 900; font-style: italic; letter-spacing: 2px;
          }

          .weather-row {
            background: linear-gradient(135deg, #0d2f66 0%, #184b94 100%);
            border: 1px solid rgba(255,255,255,0.2);
            height: 38px; padding: 0 20px;
            display: flex; align-items: center; justify-content: space-between;
            transform: skewX(-12deg);
          }

          .row-left {
            transform: skewX(12deg);
            display: flex; align-items: center; gap: 10px;
            color: #ffffff; font-size: 17px; font-weight: 900; font-style: italic; letter-spacing: 0.5px;
          }

          .row-val {
            transform: skewX(12deg);
            color: #ffffff; font-size: 18px; font-weight: 900; font-style: italic;
          }

          .icon-symbol { font-size: 20px; width: 26px; text-align: center; }
        </style>
      </head>
      <body>
        <div class="weather-board">
          <div class="header-bar">
            <div class="header-left">
              <span>☀️</span>
              <span>ARCHERY</span>
            </div>
            <div style="transform: skewX(12deg);">${olympicRingsSVG}</div>
          </div>

          <div class="subheader-bar">
            <div class="subheader-text">WEATHER</div>
          </div>

          <div class="weather-row">
            <div class="row-left"><span class="icon-symbol">🌡️</span><span>TEMPERATURE</span></div>
            <div class="row-val">31°C</div>
          </div>

          <div class="weather-row">
            <div class="row-left"><span class="icon-symbol">🌧️</span><span>24 HOUR RAIN FORECAST</span></div>
            <div class="row-val">2MM</div>
          </div>

          <div class="weather-row">
            <div class="row-left"><span class="icon-symbol">💧</span><span>HUMIDITY</span></div>
            <div class="row-val">77%</div>
          </div>

          <div class="weather-row">
            <div class="row-left"><span class="icon-symbol">🧭</span><span>WIND DIRECTION</span></div>
            <div class="row-val">EAST NORTH EAST</div>
          </div>

          <div class="weather-row">
            <div class="row-left"><span class="icon-symbol">💨</span><span>WIND SPEED</span></div>
            <div class="row-val">5KM/H</div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ── 3. AR004 / Event Schedule ────────────────────────────────────────────
  if (combined.includes("AR004") || combined.includes("SCHEDULE")) {
    const isVariantB = combined.endsWith("B") || (templateId && templateId.toLowerCase().endsWith("b"));

    if (isVariantB) {
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,700;1,800;1,900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

            .schedule-board {
              position: absolute; bottom: 140px; left: 160px;
              width: 650px;
              display: flex; flex-direction: column; gap: 2px;
            }

            .top-bar {
              background: linear-gradient(135deg, #092552 0%, #16407d 60%, #081d3d 100%);
              border: 2px solid rgba(255,255,255,0.5);
              border-radius: 8px 8px 0 0;
              height: 54px; padding: 0 20px;
              display: flex; align-items: center; justify-content: space-between;
              transform: skewX(-12deg);
              box-shadow: 0 6px 18px rgba(0,0,0,0.5);
            }

            .top-left {
              transform: skewX(12deg);
              display: flex; align-items: center; gap: 14px;
              color: #ffffff; font-size: 26px; font-weight: 900; font-style: italic; letter-spacing: 1px;
            }

            .venue-sub-bar {
              background: linear-gradient(180deg, #ffffff 0%, #dbefe9 30%, #a8d5e5 70%, #ffffff 100%);
              border: 1px solid rgba(255,255,255,0.8);
              height: 28px; padding-left: 20px;
              display: flex; align-items: center;
              transform: skewX(-12deg);
            }

            .venue-sub-text {
              transform: skewX(12deg);
              color: #092552; font-size: 15px; font-weight: 900; font-style: italic; letter-spacing: 1.5px;
            }

            .schedule-row {
              background: linear-gradient(135deg, #0d2f66 0%, #184b94 100%);
              border: 1px solid rgba(255,255,255,0.2);
              height: 38px; padding: 0 20px;
              display: flex; align-items: center;
              transform: skewX(-12deg);
            }

            .row-text {
              transform: skewX(12deg);
              color: #ffffff; font-size: 19px; font-weight: 900; font-style: italic; letter-spacing: 0.5px;
            }
          </style>
        </head>
        <body>
          <div class="schedule-board">
            <div class="top-bar">
              <div class="top-left">
                ${archerPictographSVG}
                <span>ARCHERY</span>
              </div>
              <div style="transform: skewX(12deg);">${olympicRingsSVG}</div>
            </div>

            <div class="venue-sub-bar">
              <div class="venue-sub-text">LORD'S CRICKET GROUND</div>
            </div>

            <div class="schedule-row"><div class="row-text">MEN'S TEAM - QUARTER-FINALS</div></div>
            <div class="schedule-row"><div class="row-text">MEN'S TEAM - SEMI-FINALS</div></div>
            <div class="schedule-row"><div class="row-text">MEN'S TEAM - BRONZE MEDAL MATCH</div></div>
            <div class="schedule-row"><div class="row-text">MEN'S TEAM - GOLD MEDAL MATCH</div></div>
          </div>
        </body>
        </html>
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

          .schedule-board {
            position: absolute; bottom: 140px; left: 160px;
            width: 650px;
            display: flex; flex-direction: column; gap: 2px;
          }

          .top-bar {
            background: linear-gradient(135deg, #092552 0%, #16407d 60%, #081d3d 100%);
            border: 2px solid rgba(255,255,255,0.5);
            border-radius: 8px 8px 0 0;
            height: 54px; padding: 0 20px;
            display: flex; align-items: center; justify-content: space-between;
            transform: skewX(-12deg);
            box-shadow: 0 6px 18px rgba(0,0,0,0.5);
          }

          .top-left {
            transform: skewX(12deg);
            display: flex; align-items: center; gap: 14px;
            color: #ffffff; font-size: 26px; font-weight: 900; font-style: italic; letter-spacing: 1px;
          }

          .venue-sub-bar {
            background: linear-gradient(180deg, #ffffff 0%, #dbefe9 30%, #a8d5e5 70%, #ffffff 100%);
            border: 1px solid rgba(255,255,255,0.8);
            height: 28px; padding-left: 20px;
            display: flex; align-items: center;
            transform: skewX(-12deg);
          }

          .venue-sub-text {
            transform: skewX(12deg);
            color: #092552; font-size: 15px; font-weight: 900; font-style: italic; letter-spacing: 1.5px;
          }

          .schedule-row {
            background: linear-gradient(135deg, #0d2f66 0%, #184b94 100%);
            border: 1px solid rgba(255,255,255,0.2);
            height: 38px; padding: 0 20px;
            display: flex; align-items: center;
            transform: skewX(-12deg);
          }

          .row-text {
            transform: skewX(12deg);
            color: #ffffff; font-size: 19px; font-weight: 900; font-style: italic; letter-spacing: 0.5px;
          }
        </style>
      </head>
      <body>
        <div class="schedule-board">
          <div class="top-bar">
            <div class="top-left">
              ${archerPictographSVG}
              <span>ARCHERY</span>
            </div>
            <div style="transform: skewX(12deg);">${olympicRingsSVG}</div>
          </div>

          <div class="venue-sub-bar">
            <div class="venue-sub-text">LORD'S CRICKET GROUND</div>
          </div>

          <div class="schedule-row">
            <div class="row-text">MEN'S RANKING ROUND</div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ── 4. AR005 / Athlete ID ────────────────────────────────────────────────
  if (combined.includes("AR005") || combined.includes("ATHLETE")) {
    const isVariantB = combined.endsWith("B") || (templateId && templateId.toLowerCase().endsWith("b"));

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .lt-container {
            position: absolute; bottom: 120px; left: 160px;
            display: flex; align-items: center;
            background: linear-gradient(135deg, #092552 0%, #16407d 60%, #081d3d 100%);
            border: 2px solid rgba(255,255,255,0.5);
            border-radius: 8px;
            height: 52px; width: 720px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.6);
            transform: skewX(-15deg);
          }

          .lt-inner {
            transform: skewX(15deg);
            display: flex; align-items: center; justify-content: space-between;
            width: 100%; height: 100%; padding: 0 20px;
          }

          .athlete-left { display: flex; align-items: center; gap: 14px; }
          .noc-code { color: #ffffff; font-weight: 900; font-size: 24px; font-style: italic; }
          .flag-box { font-size: 26px; }
          .athlete-name { color: #ffffff; font-weight: 900; font-size: 26px; font-style: italic; letter-spacing: 0.5px; }

          .right-sec { display: flex; align-items: center; gap: 16px; }
          .dsq-badge {
            background: #ffffff; color: #092552;
            font-weight: 900; font-size: 18px; font-style: italic;
            padding: 2px 10px; border-radius: 4px;
          }
        </style>
      </head>
      <body>
        <div class="lt-container">
          <div class="lt-inner">
            <div class="athlete-left">
              <span class="noc-code">RUS</span>
              <span class="flag-box">🇷🇺</span>
              <span class="athlete-name">ANDREY ABRAMOV</span>
            </div>
            <div class="right-sec">
              ${isVariantB ? `<div class="dsq-badge">DSQ</div>` : ''}
              ${olympicRingsSVG}
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ── 5. AR006 / Coach ID ──────────────────────────────────────────────────
  if (combined.includes("AR006") || combined.includes("COACH")) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .coach-container {
            position: absolute; bottom: 120px; left: 160px;
            display: flex; flex-direction: column; gap: 2px;
            width: 720px;
          }

          .top-bar {
            background: linear-gradient(135deg, #092552 0%, #16407d 60%, #081d3d 100%);
            border: 2px solid rgba(255,255,255,0.5);
            border-radius: 8px 8px 0 0;
            height: 52px; padding: 0 20px;
            display: flex; align-items: center; justify-content: space-between;
            transform: skewX(-15deg);
            box-shadow: 0 6px 18px rgba(0,0,0,0.5);
          }

          .top-inner {
            transform: skewX(15deg);
            display: flex; align-items: center; justify-content: space-between;
            width: 100%; height: 100%;
          }

          .coach-left { display: flex; align-items: center; gap: 14px; }
          .noc-code { color: #ffffff; font-weight: 900; font-size: 24px; font-style: italic; }
          .flag-box { font-size: 26px; }
          .coach-name { color: #ffffff; font-weight: 900; font-size: 26px; font-style: italic; letter-spacing: 0.5px; }

          .bottom-bar {
            background: linear-gradient(135deg, #061836 0%, #0a234a 100%);
            border: 1px solid rgba(255,255,255,0.3);
            border-top: none;
            height: 28px; padding-left: 20px;
            display: flex; align-items: center;
            transform: skewX(-15deg);
          }

          .bottom-text {
            transform: skewX(15deg);
            color: #ffffff; font-size: 15px; font-weight: 900; font-style: italic; letter-spacing: 2px;
          }
        </style>
      </head>
      <body>
        <div class="coach-container">
          <div class="top-bar">
            <div class="top-inner">
              <div class="coach-left">
                <span class="noc-code">ITA</span>
                <span class="flag-box">🇮🇹</span>
                <span class="coach-name">FILIPPO CLINI</span>
              </div>
              <div>${olympicRingsSVG}</div>
            </div>
          </div>
          <div class="bottom-bar">
            <div class="bottom-text">COACH</div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ── 6. AR007 / Arrow Speed Bug ───────────────────────────────────────────
  if (combined.includes("AR007") || combined.includes("SPEED")) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .speed-bug {
            position: absolute; top: 120px; left: 160px;
            background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 50%, #94a3b8 100%);
            border: 2px solid #ffffff;
            border-radius: 20px;
            padding: 6px 24px;
            display: flex; align-items: center; gap: 8px;
            box-shadow: 0 8px 20px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.8);
            transform: skewX(-15deg);
          }

          .speed-text {
            transform: skewX(15deg);
            color: #0f2b5c;
            font-size: 20px; font-weight: 900; font-style: italic; letter-spacing: 1px;
          }
        </style>
      </head>
      <body>
        <div class="speed-bug">
          <div class="speed-text">SPEED 125KM/H</div>
        </div>
      </body>
      </html>
    `;
  }

  // ── 7. AR008 / Bracket to Phase ──────────────────────────────────────────
  if (combined.includes("AR008") || combined.includes("BRACKET TO PHASE")) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,700;1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .bracket-board {
            position: absolute; top: 180px; left: 50%; transform: translateX(-50%);
            width: 820px; display: flex; flex-direction: column; gap: 2px;
          }

          .top-bar {
            background: linear-gradient(135deg, #092552 0%, #16407d 60%, #081d3d 100%);
            border: 2px solid rgba(255,255,255,0.5);
            border-radius: 8px 8px 0 0;
            height: 52px; padding: 0 20px;
            display: flex; align-items: center; justify-content: space-between;
            transform: skewX(-12deg);
          }

          .top-left {
            transform: skewX(12deg); display: flex; align-items: center; gap: 12px;
            color: #ffffff; font-size: 24px; font-weight: 900; font-style: italic;
          }

          .sub-bar {
            background: linear-gradient(180deg, #ffffff 0%, #dbefe9 30%, #a8d5e5 70%, #ffffff 100%);
            height: 28px; padding-left: 20px; display: flex; align-items: center;
            transform: skewX(-12deg);
          }

          .sub-text {
            transform: skewX(12deg); color: #092552; font-size: 15px; font-weight: 900; font-style: italic; letter-spacing: 1px;
          }

          .match-row {
            background: linear-gradient(135deg, #0d2f66 0%, #184b94 100%);
            border: 1px solid rgba(255,255,255,0.2);
            height: 38px; display: flex; align-items: center;
            transform: skewX(-12deg); padding: 0 16px;
          }

          .row-inner { transform: skewX(12deg); display: flex; align-items: center; justify-content: space-between; width: 100%; color: white; font-weight: 900; font-style: italic; font-size: 17px; }
          .col-left { display: flex; align-items: center; gap: 10px; width: 50%; }
          .col-right { display: flex; align-items: center; gap: 10px; width: 50%; }
        </style>
      </head>
      <body>
        <div class="bracket-board">
          <div class="top-bar">
            <div class="top-left">${archerPictographSVG}<span>MEN'S INDIVIDUAL</span></div>
            <div style="transform: skewX(12deg);">${olympicRingsSVG}</div>
          </div>
          <div class="sub-bar"><div class="sub-text">1/32 ELIMINATIONS ➔ 1/16 ELIMINATIONS</div></div>

          <div class="match-row">
            <div class="row-inner">
              <div class="col-left"><span>GBR 🇬🇧</span><span>SIMON TERRY</span></div>
              <div class="col-right"><span>FIN 🇫🇮</span><span>MATTI HATAVA</span></div>
            </div>
          </div>
          <div class="match-row">
            <div class="row-inner">
              <div class="col-left"><span>FIN 🇫🇮</span><span>MATTI HATAVA</span></div>
              <div class="col-right"></div>
            </div>
          </div>
          <div class="match-row">
            <div class="row-inner">
              <div class="col-left"><span>AUS 🇦🇺</span><span>MATTHEW GRAY</span></div>
              <div class="col-right"><span>MAS 🇲🇾</span><span>CHU SIAN CHENG</span></div>
            </div>
          </div>
          <div class="match-row">
            <div class="row-inner">
              <div class="col-left"><span>MAS 🇲🇾</span><span>CHU SIAN CHENG</span></div>
              <div class="col-right"></div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ── 8. AR009 / Bracket to Gold Medal Match ──────────────────────────────
  if (combined.includes("AR009") || combined.includes("GOLD MEDAL MATCH")) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,700;1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .bracket-board {
            position: absolute; top: 220px; left: 50%; transform: translateX(-50%);
            width: 820px; display: flex; flex-direction: column; gap: 2px;
          }

          .top-bar {
            background: linear-gradient(135deg, #092552 0%, #16407d 60%, #081d3d 100%);
            border: 2px solid rgba(255,255,255,0.5);
            border-radius: 8px 8px 0 0;
            height: 52px; padding: 0 20px;
            display: flex; align-items: center; justify-content: space-between;
            transform: skewX(-12deg);
          }

          .top-left {
            transform: skewX(12deg); display: flex; align-items: center; gap: 12px;
            color: #ffffff; font-size: 24px; font-weight: 900; font-style: italic;
          }

          .sub-bar {
            background: linear-gradient(180deg, #ffffff 0%, #dbefe9 30%, #a8d5e5 70%, #ffffff 100%);
            height: 28px; padding-left: 20px; display: flex; align-items: center;
            transform: skewX(-12deg);
          }

          .sub-text {
            transform: skewX(12deg); color: #092552; font-size: 15px; font-weight: 900; font-style: italic; letter-spacing: 1px;
          }

          .match-row {
            background: linear-gradient(135deg, #0d2f66 0%, #184b94 100%);
            border: 1px solid rgba(255,255,255,0.2);
            height: 38px; display: flex; align-items: center;
            transform: skewX(-12deg); padding: 0 16px;
          }

          .row-inner { transform: skewX(12deg); display: flex; align-items: center; justify-content: space-between; width: 100%; color: white; font-weight: 900; font-style: italic; font-size: 17px; }
          .col-left { display: flex; align-items: center; gap: 10px; width: 50%; }
          .col-right { display: flex; align-items: center; gap: 10px; width: 50%; }
        </style>
      </head>
      <body>
        <div class="bracket-board">
          <div class="top-bar">
            <div class="top-left">${archerPictographSVG}<span>MEN'S INDIVIDUAL</span></div>
            <div style="transform: skewX(12deg);">${olympicRingsSVG}</div>
          </div>
          <div class="sub-bar"><div class="sub-text">SEMI-FINALS ➔ GOLD MEDAL MATCH</div></div>

          <div class="match-row">
            <div class="row-inner">
              <div class="col-left"><span>MEX 🇲🇽</span><span>JUAN RENE SERRANO</span></div>
              <div class="col-right"><span>KOR 🇰🇷</span><span>PARK KYUNG-MO</span></div>
            </div>
          </div>
          <div class="match-row">
            <div class="row-inner">
              <div class="col-left"><span>KOR 🇰🇷</span><span>PARK KYUNG-MO</span></div>
              <div class="col-right"></div>
            </div>
          </div>
          <div class="match-row">
            <div class="row-inner">
              <div class="col-left"><span>UKR 🇺🇦</span><span>VIKTOR RUBAN</span></div>
              <div class="col-right"><span>UKR 🇺🇦</span><span>VIKTOR RUBAN</span></div>
            </div>
          </div>
          <div class="match-row">
            <div class="row-inner">
              <div class="col-left"><span>RUS 🇷🇺</span><span>BAIR BADENOV</span></div>
              <div class="col-right"></div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ── 9. AR010 / Final Rank ────────────────────────────────────────────────
  if (combined.includes("AR010") || combined.includes("FINAL RANK")) {
    const isVariantB = combined.endsWith("B") || (templateId && templateId.toLowerCase().endsWith("b"));

    if (isVariantB) {
      const teamRows = [
        { rank: "1", noc: "KOR", flag: "🇰🇷", name: "KOREA" },
        { rank: "2", noc: "ITA", flag: "🇮🇹", name: "ITALY" },
        { rank: "3", noc: "CHN", flag: "🇨🇳", name: "CHINA" },
        { rank: "4", noc: "UKR", flag: "🇺🇦", name: "UKRAINE" },
        { rank: "5", noc: "POL", flag: "🇵🇱", name: "POLAND" },
        { rank: "6", noc: "RUS", flag: "🇷🇺", name: "RUSSIAN FEDERATION" }
      ];

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,700;0,800;1,900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

            .full-board {
              position: absolute; top: 220px; left: 50%; transform: translateX(-50%);
              width: 860px; display: flex; flex-direction: column; gap: 3px;
            }

            .header-bar {
              background: linear-gradient(135deg, #092552 0%, #16407d 60%, #081d3d 100%);
              border: 2px solid rgba(255,255,255,0.5);
              border-radius: 8px 8px 0 0;
              padding: 12px 24px;
              display: flex; align-items: center; justify-content: space-between;
              color: white; transform: skewX(-12deg);
              box-shadow: 0 8px 24px rgba(0,0,0,0.6);
            }

            .header-title { transform: skewX(12deg); font-size: 26px; font-weight: 900; font-style: italic; letter-spacing: 1px; display: flex; align-items: center; gap: 12px; }

            .sub-header {
              background: linear-gradient(180deg, #ffffff 0%, #dbefe9 30%, #a8d5e5 70%, #ffffff 100%);
              color: #092552; padding: 4px 24px;
              font-size: 15px; font-weight: 900; font-style: italic; letter-spacing: 2px;
              transform: skewX(-12deg); border-left: 4px solid #0080ff;
            }

            .rank-row {
              background: linear-gradient(135deg, #0d2f66 0%, #184b94 100%);
              border: 1px solid rgba(255,255,255,0.2);
              height: 42px; display: flex; align-items: center;
              transform: skewX(-12deg); overflow: hidden;
              box-shadow: 0 4px 12px rgba(0,0,0,0.4);
            }

            .row-inner { transform: skewX(12deg); display: flex; align-items: center; width: 100%; height: 100%; }
            .rank-badge {
              background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
              color: white; font-weight: 900; font-size: 20px; font-style: italic;
              width: 45px; height: 100%; display: flex; align-items: center; justify-content: center;
              transform: skewX(-12deg); margin-left: -5px; border-right: 2px solid white;
            }

            .rank-num { transform: skewX(12deg); }
            .noc-code { color: white; font-weight: 900; font-size: 19px; width: 60px; margin-left: 14px; }
            .flag-box { font-size: 22px; margin-right: 12px; }
            .athlete-name { color: white; font-weight: 900; font-size: 20px; font-style: italic; letter-spacing: 0.5px; }
          </style>
        </head>
        <body>
          <div class="full-board">
            <div class="header-bar">
              <div class="header-title">${archerPictographSVG}<span>MEN'S TEAM</span></div>
              <div style="transform: skewX(12deg);">${olympicRingsSVG}</div>
            </div>
            <div class="sub-header"><div style="transform:skewX(12deg);">FINAL RANK</div></div>

            ${teamRows.map(r => `
              <div class="rank-row">
                <div class="row-inner">
                  <div class="rank-badge"><span class="rank-num">${r.rank}</span></div>
                  <span class="noc-code">${r.noc}</span>
                  <span class="flag-box">${r.flag}</span>
                  <span class="athlete-name">${r.name}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </body>
        </html>
      `;
    }

    const indRows = [
      { rank: "1", noc: "UKR", flag: "🇺🇦", name: "VIKTOR RUBAN" },
      { rank: "2", noc: "KOR", flag: "🇰🇷", name: "PARK KYUNG-MO" },
      { rank: "3", noc: "RUS", flag: "🇷🇺", name: "BAIR BADENOV" },
      { rank: "4", noc: "MEX", flag: "🇲🇽", name: "JUAN RENE SERRANO" },
      { rank: "5", noc: "JPN", flag: "🇯🇵", name: "RYUICHI MORIYA" },
      { rank: "5", noc: "USA", flag: "🇺🇸", name: "VICTOR WUNDERLE" },
      { rank: "5", noc: "CUB", flag: "🇨🇺", name: "JUAN CARLOS STEVENS" },
      { rank: "5", noc: "MAS", flag: "🇲🇾", name: "CHU SIAN CHENG" }
    ];

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,700;0,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .full-board {
            position: absolute; top: 200px; left: 50%; transform: translateX(-50%);
            width: 860px; display: flex; flex-direction: column; gap: 3px;
          }

          .header-bar {
            background: linear-gradient(135deg, #092552 0%, #16407d 60%, #081d3d 100%);
            border: 2px solid rgba(255,255,255,0.5);
            border-radius: 8px 8px 0 0;
            padding: 12px 24px;
            display: flex; align-items: center; justify-content: space-between;
            color: white; transform: skewX(-12deg);
            box-shadow: 0 8px 24px rgba(0,0,0,0.6);
          }

          .header-title { transform: skewX(12deg); font-size: 26px; font-weight: 900; font-style: italic; letter-spacing: 1px; display: flex; align-items: center; gap: 12px; }

          .sub-header {
            background: linear-gradient(180deg, #ffffff 0%, #dbefe9 30%, #a8d5e5 70%, #ffffff 100%);
            color: #092552; padding: 4px 24px;
            font-size: 15px; font-weight: 900; font-style: italic; letter-spacing: 2px;
            transform: skewX(-12deg); border-left: 4px solid #0080ff;
          }

          .rank-row {
            background: linear-gradient(135deg, #0d2f66 0%, #184b94 100%);
            border: 1px solid rgba(255,255,255,0.2);
            height: 42px; display: flex; align-items: center;
            transform: skewX(-12deg); overflow: hidden;
            box-shadow: 0 4px 12px rgba(0,0,0,0.4);
          }

          .row-inner { transform: skewX(12deg); display: flex; align-items: center; width: 100%; height: 100%; }
          .rank-badge {
            background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
            color: white; font-weight: 900; font-size: 20px; font-style: italic;
            width: 45px; height: 100%; display: flex; align-items: center; justify-content: center;
            transform: skewX(-12deg); margin-left: -5px; border-right: 2px solid white;
          }

          .rank-num { transform: skewX(12deg); }
          .noc-code { color: white; font-weight: 900; font-size: 19px; width: 60px; margin-left: 14px; }
          .flag-box { font-size: 22px; margin-right: 12px; }
          .athlete-name { color: white; font-weight: 900; font-size: 20px; font-style: italic; letter-spacing: 0.5px; }
        </style>
      </head>
      <body>
        <div class="full-board">
          <div class="header-bar">
            <div class="header-title">${archerPictographSVG}<span>MEN'S INDIVIDUAL</span></div>
            <div style="transform: skewX(12deg);">${olympicRingsSVG}</div>
          </div>
          <div class="sub-header"><div style="transform:skewX(12deg);">FINAL RANK</div></div>

          ${indRows.map(r => `
            <div class="rank-row">
              <div class="row-inner">
                <div class="rank-badge"><span class="rank-num">${r.rank}</span></div>
                <span class="noc-code">${r.noc}</span>
                <span class="flag-box">${r.flag}</span>
                <span class="athlete-name">${r.name}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </body>
      </html>
    `;
  }

  // ── 10. AR011 / Ceremony ID ──────────────────────────────────────────────
  if (combined.includes("AR011") || combined.includes("CEREMONY")) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .ceremony-container {
            position: absolute; bottom: 120px; left: 160px;
            display: flex; flex-direction: column; gap: 2px;
            width: 720px;
          }

          .top-bar {
            background: linear-gradient(135deg, #092552 0%, #16407d 60%, #081d3d 100%);
            border: 2px solid rgba(255,255,255,0.5);
            border-radius: 8px 8px 0 0;
            height: 52px; padding: 0 20px;
            display: flex; align-items: center; justify-content: space-between;
            transform: skewX(-15deg);
          }

          .top-inner {
            transform: skewX(15deg); display: flex; align-items: center; justify-content: space-between; width: 100%;
          }

          .title-text { color: #ffffff; font-size: 26px; font-weight: 900; font-style: italic; letter-spacing: 0.5px; display: flex; align-items: center; gap: 12px; }

          .bottom-bar {
            background: linear-gradient(180deg, #ffffff 0%, #dbefe9 30%, #a8d5e5 70%, #ffffff 100%);
            border: 1px solid rgba(255,255,255,0.8);
            height: 28px; padding-left: 20px; display: flex; align-items: center;
            transform: skewX(-15deg);
          }

          .bottom-text { transform: skewX(15deg); color: #092552; font-size: 15px; font-weight: 900; font-style: italic; letter-spacing: 2px; }
        </style>
      </head>
      <body>
        <div class="ceremony-container">
          <div class="top-bar">
            <div class="top-inner">
              <div class="title-text">${archerPictographSVG}<span>MEN'S INDIVIDUAL</span></div>
              <div>${olympicRingsSVG}</div>
            </div>
          </div>
          <div class="bottom-bar">
            <div class="bottom-text">VICTORY CEREMONY</div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ── 11. AR012 / Medal ID ─────────────────────────────────────────────────
  if (combined.includes("AR012") || combined.includes("MEDAL ID")) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .medal-container {
            position: absolute; bottom: 120px; left: 160px;
            display: flex; flex-direction: column; gap: 2px;
            width: 720px;
          }

          .top-bar {
            background: linear-gradient(135deg, #092552 0%, #16407d 60%, #081d3d 100%);
            border: 2px solid rgba(255,255,255,0.5);
            border-radius: 8px 8px 0 0;
            height: 52px; padding: 0 20px;
            display: flex; align-items: center; justify-content: space-between;
            transform: skewX(-15deg);
          }

          .top-inner { transform: skewX(15deg); display: flex; align-items: center; justify-content: space-between; width: 100%; }
          .athlete-left { display: flex; align-items: center; gap: 14px; }
          .noc-code { color: #ffffff; font-weight: 900; font-size: 24px; font-style: italic; }
          .flag-box { font-size: 26px; }
          .athlete-name { color: #ffffff; font-weight: 900; font-size: 26px; font-style: italic; letter-spacing: 0.5px; }

          .bottom-bar {
            background: linear-gradient(135deg, #061836 0%, #0a234a 100%);
            border: 1px solid rgba(255,255,255,0.3);
            border-top: none;
            height: 28px; padding-left: 20px; display: flex; align-items: center; gap: 8px;
            transform: skewX(-15deg);
          }

          .bottom-text { transform: skewX(15deg); color: #ffffff; font-size: 15px; font-weight: 900; font-style: italic; letter-spacing: 1.5px; }
          .gold-icon { font-size: 16px; transform: skewX(15deg); }
        </style>
      </head>
      <body>
        <div class="medal-container">
          <div class="top-bar">
            <div class="top-inner">
              <div class="athlete-left">
                <span class="noc-code">UKR</span>
                <span class="flag-box">🇺🇦</span>
                <span class="athlete-name">VIKTOR RUBAN</span>
              </div>
              <div>${olympicRingsSVG}</div>
            </div>
          </div>
          <div class="bottom-bar">
            <span class="gold-icon">🥇</span>
            <div class="bottom-text">GOLD - MEN'S INDIVIDUAL</div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ── 12. AR013 / Medals List ──────────────────────────────────────────────
  if (combined.includes("AR013") || combined.includes("MEDALS LIST")) {
    const medalRows = [
      { type: "🥇", noc: "UKR", flag: "🇺🇦", name: "VIKTOR RUBAN" },
      { type: "🥈", noc: "KOR", flag: "🇰🇷", name: "PARK KYUNG-MO" },
      { type: "🥉", noc: "RUS", flag: "🇷🇺", name: "BAIR BADENOV" }
    ];

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,700;1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .medals-board {
            position: absolute; bottom: 140px; left: 160px;
            width: 680px; display: flex; flex-direction: column; gap: 2px;
          }

          .top-bar {
            background: linear-gradient(135deg, #092552 0%, #16407d 60%, #081d3d 100%);
            border: 2px solid rgba(255,255,255,0.5);
            border-radius: 8px 8px 0 0;
            height: 52px; padding: 0 20px;
            display: flex; align-items: center; justify-content: space-between;
            transform: skewX(-12deg);
          }

          .top-left { transform: skewX(12deg); display: flex; align-items: center; gap: 12px; color: white; font-size: 24px; font-weight: 900; font-style: italic; }

          .sub-bar {
            background: linear-gradient(180deg, #ffffff 0%, #dbefe9 30%, #a8d5e5 70%, #ffffff 100%);
            height: 28px; padding-left: 20px; display: flex; align-items: center;
            transform: skewX(-12deg);
          }

          .sub-text { transform: skewX(12deg); color: #092552; font-size: 15px; font-weight: 900; font-style: italic; letter-spacing: 1.5px; }

          .medal-row {
            background: linear-gradient(135deg, #0d2f66 0%, #184b94 100%);
            border: 1px solid rgba(255,255,255,0.2);
            height: 40px; display: flex; align-items: center;
            transform: skewX(-12deg); padding: 0 16px;
          }

          .row-inner { transform: skewX(12deg); display: flex; align-items: center; gap: 12px; color: white; font-weight: 900; font-style: italic; font-size: 19px; }
        </style>
      </head>
      <body>
        <div class="medals-board">
          <div class="top-bar">
            <div class="top-left">${archerPictographSVG}<span>MEN'S INDIVIDUAL</span></div>
            <div style="transform: skewX(12deg);">${olympicRingsSVG}</div>
          </div>
          <div class="sub-bar"><div class="sub-text">VICTORY CEREMONY</div></div>

          ${medalRows.map(r => `
            <div class="medal-row">
              <div class="row-inner">
                <span style="font-size:20px;">${r.type}</span>
                <span>${r.noc}</span>
                <span>${r.flag}</span>
                <span>${r.name}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </body>
      </html>
    `;
  }

  // ── 13. AR014 / Medal Presenter ID ───────────────────────────────────────
  if (combined.includes("AR014") || combined.includes("MEDAL PRESENTER")) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .presenter-container {
            position: absolute; bottom: 120px; left: 160px;
            display: flex; flex-direction: column; gap: 2px;
            width: 720px;
          }

          .top-bar {
            background: linear-gradient(135deg, #092552 0%, #16407d 60%, #081d3d 100%);
            border: 2px solid rgba(255,255,255,0.5);
            border-radius: 8px 8px 0 0;
            height: 52px; padding: 0 20px;
            display: flex; align-items: center; justify-content: space-between;
            transform: skewX(-15deg);
          }

          .top-inner { transform: skewX(15deg); display: flex; align-items: center; justify-content: space-between; width: 100%; }
          .presenter-name { color: #ffffff; font-weight: 900; font-size: 26px; font-style: italic; letter-spacing: 0.5px; }

          .bottom-bar {
            background: linear-gradient(135deg, #061836 0%, #0a234a 100%);
            border: 1px solid rgba(255,255,255,0.3);
            border-top: none;
            height: 28px; padding-left: 20px; display: flex; align-items: center;
            transform: skewX(-15deg);
          }

          .bottom-text { transform: skewX(15deg); color: #ffffff; font-size: 15px; font-weight: 900; font-style: italic; letter-spacing: 1.5px; }
        </style>
      </head>
      <body>
        <div class="presenter-container">
          <div class="top-bar">
            <div class="top-inner">
              <span class="presenter-name">JACQUES ROGGE</span>
              <div>${olympicRingsSVG}</div>
            </div>
          </div>
          <div class="bottom-bar">
            <div class="bottom-text">IOC PRESIDENT, BELGIUM</div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ── 14. AR015 / Flower Presenter ID ──────────────────────────────────────
  if (combined.includes("AR015") || combined.includes("FLOWER PRESENTER")) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .presenter-container {
            position: absolute; bottom: 120px; left: 160px;
            display: flex; flex-direction: column; gap: 2px;
            width: 720px;
          }

          .top-bar {
            background: linear-gradient(135deg, #092552 0%, #16407d 60%, #081d3d 100%);
            border: 2px solid rgba(255,255,255,0.5);
            border-radius: 8px 8px 0 0;
            height: 52px; padding: 0 20px;
            display: flex; align-items: center; justify-content: space-between;
            transform: skewX(-15deg);
          }

          .top-inner { transform: skewX(15deg); display: flex; align-items: center; justify-content: space-between; width: 100%; }
          .presenter-name { color: #ffffff; font-weight: 900; font-size: 26px; font-style: italic; letter-spacing: 0.5px; }

          .bottom-bar {
            background: linear-gradient(135deg, #061836 0%, #0a234a 100%);
            border: 1px solid rgba(255,255,255,0.3);
            border-top: none;
            height: 28px; padding-left: 20px; display: flex; align-items: center;
            transform: skewX(-15deg);
          }

          .bottom-text { transform: skewX(15deg); color: #ffffff; font-size: 15px; font-weight: 900; font-style: italic; letter-spacing: 1.5px; }
        </style>
      </head>
      <body>
        <div class="presenter-container">
          <div class="top-bar">
            <div class="top-inner">
              <span class="presenter-name">MR JAMES L. EASTON</span>
              <div>${olympicRingsSVG}</div>
            </div>
          </div>
          <div class="bottom-bar">
            <div class="bottom-text">HONORARY PRESIDENT, FITA</div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ── 15. AR016a / Records (Individual) ───────────────────────────────────
  if (combined.includes("AR016A") || (combined.includes("AR016") && !combined.includes("B"))) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,700;1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .records-board {
            position: absolute; bottom: 140px; left: 160px;
            width: 720px; display: flex; flex-direction: column; gap: 2px;
          }

          .top-bar {
            background: linear-gradient(135deg, #092552 0%, #16407d 60%, #081d3d 100%);
            border: 2px solid rgba(255,255,255,0.5);
            border-radius: 8px 8px 0 0;
            height: 52px; padding: 0 20px;
            display: flex; align-items: center; justify-content: space-between;
            transform: skewX(-12deg);
          }

          .top-left { transform: skewX(12deg); display: flex; align-items: center; gap: 12px; color: white; font-size: 24px; font-weight: 900; font-style: italic; }

          .sub-bar {
            background: linear-gradient(180deg, #ffffff 0%, #dbefe9 30%, #a8d5e5 70%, #ffffff 100%);
            height: 28px; padding-left: 20px; display: flex; align-items: center;
            transform: skewX(-12deg);
          }

          .sub-text { transform: skewX(12deg); color: #092552; font-size: 15px; font-weight: 900; font-style: italic; letter-spacing: 1.5px; }

          .record-row {
            background: linear-gradient(135deg, #0d2f66 0%, #184b94 100%);
            border: 1px solid rgba(255,255,255,0.2);
            height: 40px; display: flex; align-items: center; justify-content: space-between;
            transform: skewX(-12deg); padding: 0 20px;
          }

          .row-left { transform: skewX(12deg); display: flex; align-items: center; gap: 12px; color: white; font-weight: 900; font-style: italic; font-size: 19px; }
          .row-right { transform: skewX(12deg); display: flex; align-items: center; gap: 10px; color: white; font-weight: 900; font-style: italic; font-size: 19px; }

          .wr-badge { background: #eab308; color: #092552; padding: 1px 6px; border-radius: 4px; font-size: 14px; font-weight: 900; }
          .or-badge { background: #94a3b8; color: #092552; padding: 1px 6px; border-radius: 4px; font-size: 14px; font-weight: 900; }
        </style>
      </head>
      <body>
        <div class="records-board">
          <div class="top-bar">
            <div class="top-left">${archerPictographSVG}<span>ARCHERY</span></div>
            <div style="transform: skewX(12deg);">${olympicRingsSVG}</div>
          </div>
          <div class="sub-bar"><div class="sub-text">MEN'S INDIVIDUAL - 72 ARROWS</div></div>

          <div class="record-row">
            <div class="row-left"><span>KOR</span><span>🇰🇷</span><span>IM DONG-HYUN</span></div>
            <div class="row-right"><span>2004</span><span class="wr-badge">WR</span><span>687</span></div>
          </div>
          <div class="record-row">
            <div class="row-left"><span>ITA</span><span>🇮🇹</span><span>MICHELE FRANGILLI</span></div>
            <div class="row-right"><span>1996</span><span class="or-badge">OR</span><span>684</span></div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ── 16. AR016b / Records (Team) ──────────────────────────────────────────
  if (combined.includes("AR016B")) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,700;1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .records-board {
            position: absolute; bottom: 140px; left: 160px;
            width: 720px; display: flex; flex-direction: column; gap: 2px;
          }

          .top-bar {
            background: linear-gradient(135deg, #092552 0%, #16407d 60%, #081d3d 100%);
            border: 2px solid rgba(255,255,255,0.5);
            border-radius: 8px 8px 0 0;
            height: 52px; padding: 0 20px;
            display: flex; align-items: center; justify-content: space-between;
            transform: skewX(-12deg);
          }

          .top-left { transform: skewX(12deg); display: flex; align-items: center; gap: 12px; color: white; font-size: 24px; font-weight: 900; font-style: italic; }

          .sub-bar {
            background: linear-gradient(180deg, #ffffff 0%, #dbefe9 30%, #a8d5e5 70%, #ffffff 100%);
            height: 28px; padding-left: 20px; display: flex; align-items: center;
            transform: skewX(-12deg);
          }

          .sub-text { transform: skewX(12deg); color: #092552; font-size: 15px; font-weight: 900; font-style: italic; letter-spacing: 1.5px; }

          .record-row {
            background: linear-gradient(135deg, #0d2f66 0%, #184b94 100%);
            border: 1px solid rgba(255,255,255,0.2);
            height: 40px; display: flex; align-items: center; justify-content: space-between;
            transform: skewX(-12deg); padding: 0 20px;
          }

          .row-left { transform: skewX(12deg); display: flex; align-items: center; gap: 12px; color: white; font-weight: 900; font-style: italic; font-size: 19px; }
          .row-right { transform: skewX(12deg); display: flex; align-items: center; gap: 10px; color: white; font-weight: 900; font-style: italic; font-size: 19px; }

          .wr-badge { background: #eab308; color: #092552; padding: 1px 6px; border-radius: 4px; font-size: 14px; font-weight: 900; }
          .or-badge { background: #94a3b8; color: #092552; padding: 1px 6px; border-radius: 4px; font-size: 14px; font-weight: 900; }
        </style>
      </head>
      <body>
        <div class="records-board">
          <div class="top-bar">
            <div class="top-left">${archerPictographSVG}<span>ARCHERY</span></div>
            <div style="transform: skewX(12deg);">${olympicRingsSVG}</div>
          </div>
          <div class="sub-bar"><div class="sub-text">MEN'S TEAM - 24 ARROWS</div></div>

          <div class="record-row">
            <div class="row-left"><span>KOR</span><span>🇰🇷</span><span>KOREA</span></div>
            <div class="row-right"><span>2007</span><span class="wr-badge">WR</span><span>231</span></div>
          </div>
          <div class="record-row">
            <div class="row-left"><span>KOR</span><span>🇰🇷</span><span>KOREA</span></div>
            <div class="row-right"><span>2008</span><span class="or-badge">OR</span><span>224</span></div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ── 17. AR017 / Ranking Round Score ──────────────────────────────────────
  if (normId.includes("AR017")) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .score-container {
            position: absolute; bottom: 120px; left: 160px;
            display: flex; flex-direction: column; gap: 2px;
            width: 720px;
          }

          .top-bar {
            background: linear-gradient(135deg, #092552 0%, #16407d 60%, #081d3d 100%);
            border: 2px solid rgba(255,255,255,0.5);
            border-radius: 8px 8px 0 0;
            height: 52px; padding: 0 20px;
            display: flex; align-items: center; justify-content: space-between;
            transform: skewX(-15deg);
          }

          .top-inner { transform: skewX(15deg); display: flex; align-items: center; justify-content: space-between; width: 100%; }

          .athlete-left { display: flex; align-items: center; gap: 14px; }
          .rank-badge { background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); color: white; padding: 2px 10px; font-weight: 900; font-size: 22px; font-style: italic; border-radius: 4px; }
          .noc-code { color: #ffffff; font-weight: 900; font-size: 24px; font-style: italic; }
          .flag-box { font-size: 26px; }
          .athlete-name { color: #ffffff; font-weight: 900; font-size: 26px; font-style: italic; letter-spacing: 0.5px; }

          .bottom-bar {
            background: linear-gradient(135deg, #061836 0%, #0a234a 100%);
            border: 1px solid rgba(255,255,255,0.3);
            border-top: none;
            height: 28px; padding: 0 20px; display: flex; align-items: center; justify-content: space-between;
            transform: skewX(-15deg);
          }

          .bottom-inner { transform: skewX(15deg); display: flex; align-items: center; gap: 12px; color: white; font-weight: 900; font-style: italic; font-size: 15px; letter-spacing: 1.5px; }
          .wr-badge { background: #eab308; color: #092552; padding: 1px 6px; border-radius: 4px; font-size: 14px; font-weight: 900; }
        </style>
      </head>
      <body>
        <div class="score-container">
          <div class="top-bar">
            <div class="top-inner">
              <div class="athlete-left">
                <span class="rank-badge">1</span>
                <span class="noc-code">MEX</span>
                <span class="flag-box">🇲🇽</span>
                <span class="athlete-name">JUAN RENE SERRANO</span>
              </div>
              <div>${olympicRingsSVG}</div>
            </div>
          </div>
          <div class="bottom-bar">
            <div class="bottom-inner">
              <span>RANKING ROUND 688</span>
              <span class="wr-badge">WR</span>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ── 18. AR018 / Standings ────────────────────────────────────────────────
  if (combined.includes("AR018") || combined.includes("STANDINGS")) {
    const rows = [
      { rank: "1", noc: "MEX", flag: "🇲🇽", name: "JUAN RENE SERRANO", wr: true, score: "688" },
      { rank: "2", noc: "IND", flag: "🇮🇳", name: "MANGAL SINGH CHAMPIA", wr: false, score: "678" },
      { rank: "3", noc: "UKR", flag: "🇺🇦", name: "VIKTOR RUBAN", wr: false, score: "678" },
      { rank: "4", noc: "KOR", flag: "🇰🇷", name: "PARK KYUNG-MO", wr: false, score: "676" },
      { rank: "5", noc: "MAS", flag: "🇲🇾", name: "WAN KHALMIZAM", wr: false, score: "674" },
      { rank: "6", noc: "RUS", flag: "🇷🇺", name: "BALJINIMA TSYREMPILOV", wr: false, score: "671" },
      { rank: "7", noc: "GBR", flag: "🇬🇧", name: "SIMON TERRY", wr: false, score: "670" },
      { rank: "8", noc: "KOR", flag: "🇰🇷", name: "IM DONG-HYUN", wr: false, score: "670" },
      { rank: "9", noc: "CHN", flag: "🇨🇳", name: "JIANG LIN", wr: false, score: "670" },
      { rank: "10", noc: "KOR", flag: "🇰🇷", name: "LEE CHANG-HWAN", wr: false, score: "669" }
    ];

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,700;0,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .full-board {
            position: absolute; top: 160px; left: 50%; transform: translateX(-50%);
            width: 880px; display: flex; flex-direction: column; gap: 2px;
          }

          .header-bar {
            background: linear-gradient(135deg, #092552 0%, #16407d 60%, #081d3d 100%);
            border: 2px solid rgba(255,255,255,0.5);
            border-radius: 8px 8px 0 0; padding: 10px 20px;
            display: flex; align-items: center; justify-content: space-between;
            color: white; transform: skewX(-12deg);
          }

          .header-title { transform: skewX(12deg); font-size: 24px; font-weight: 900; font-style: italic; display: flex; align-items: center; gap: 12px; }

          .sub-header {
            background: linear-gradient(180deg, #ffffff 0%, #dbefe9 30%, #a8d5e5 70%, #ffffff 100%);
            color: #092552; padding: 4px 20px; font-size: 15px; font-weight: 900; font-style: italic; letter-spacing: 1.5px;
            transform: skewX(-12deg);
          }

          .standings-row {
            background: linear-gradient(135deg, #0d2f66 0%, #184b94 100%);
            border: 1px solid rgba(255,255,255,0.2);
            height: 38px; display: flex; align-items: center;
            transform: skewX(-12deg); overflow: hidden;
          }

          .row-inner { transform: skewX(12deg); display: flex; align-items: center; justify-content: space-between; width: 100%; height: 100%; padding-right: 16px; }
          .left-sec { display: flex; align-items: center; height: 100%; }

          .rank-badge {
            background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
            color: white; font-weight: 900; font-size: 18px; font-style: italic;
            width: 40px; height: 100%; display: flex; align-items: center; justify-content: center;
            transform: skewX(-12deg); margin-left: -4px; border-right: 2px solid white;
          }

          .rank-num { transform: skewX(12deg); }
          .noc-code { color: white; font-weight: 900; font-size: 18px; width: 50px; margin-left: 12px; }
          .flag-box { font-size: 20px; margin-right: 10px; }
          .athlete-name { color: white; font-weight: 900; font-size: 19px; font-style: italic; }

          .right-sec { display: flex; align-items: center; gap: 8px; color: white; font-weight: 900; font-size: 19px; font-style: italic; }
          .wr-badge { background: #eab308; color: #092552; padding: 1px 6px; border-radius: 4px; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="full-board">
          <div class="header-bar">
            <div class="header-title">${archerPictographSVG}<span>MEN'S INDIVIDUAL</span></div>
            <div style="transform: skewX(12deg);">${olympicRingsSVG}</div>
          </div>
          <div class="sub-header"><div style="transform:skewX(12deg);">STANDINGS - RANKING ROUND</div></div>

          ${rows.map(r => `
            <div class="standings-row">
              <div class="row-inner">
                <div class="left-sec">
                  <div class="rank-badge"><span class="rank-num">${r.rank}</span></div>
                  <span class="noc-code">${r.noc}</span>
                  <span class="flag-box">${r.flag}</span>
                  <span class="athlete-name">${r.name}</span>
                </div>
                <div class="right-sec">
                  ${r.wr ? `<span class="wr-badge">WR</span>` : ''}
                  <span>${r.score}</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </body>
      </html>
    `;
  }

  // ── 19. AR019a / AR019b Match ID ─────────────────────────────────────────
  if (combined.includes("AR019")) {
    const isVariantB = combined.includes("AR019B") || combined.includes("TEAM");

    if (isVariantB) {
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,700;1,800;1,900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

            .match-board {
              position: absolute; bottom: 140px; left: 160px;
              width: 680px; display: flex; flex-direction: column; gap: 2px;
            }

            .top-bar {
              background: linear-gradient(135deg, #092552 0%, #16407d 60%, #081d3d 100%);
              border: 2px solid rgba(255,255,255,0.5);
              border-radius: 8px 8px 0 0;
              height: 52px; padding: 0 20px;
              display: flex; align-items: center; justify-content: space-between;
              transform: skewX(-12deg);
            }

            .top-left { transform: skewX(12deg); display: flex; align-items: center; gap: 12px; color: white; font-size: 24px; font-weight: 900; font-style: italic; }

            .sub-bar {
              background: linear-gradient(180deg, #ffffff 0%, #dbefe9 30%, #a8d5e5 70%, #ffffff 100%);
              height: 28px; padding-left: 20px; display: flex; align-items: center;
              transform: skewX(-12deg);
            }

            .sub-text { transform: skewX(12deg); color: #092552; font-size: 15px; font-weight: 900; font-style: italic; letter-spacing: 1.5px; }

            .team-row {
              background: linear-gradient(135deg, #0d2f66 0%, #184b94 100%);
              border: 1px solid rgba(255,255,255,0.2);
              height: 40px; display: flex; align-items: center;
              transform: skewX(-12deg); padding: 0 20px;
            }

            .row-inner { transform: skewX(12deg); display: flex; align-items: center; gap: 14px; color: white; font-weight: 900; font-style: italic; font-size: 20px; }
          </style>
        </head>
        <body>
          <div class="match-board">
            <div class="top-bar">
              <div class="top-left">${archerPictographSVG}<span>MEN'S TEAM</span></div>
              <div style="transform: skewX(12deg);">${olympicRingsSVG}</div>
            </div>
            <div class="sub-bar"><div class="sub-text">GOLD MEDAL MATCH</div></div>

            <div class="team-row"><div class="row-inner"><span>KOR</span><span>🇰🇷</span><span>KOREA</span></div></div>
            <div class="team-row"><div class="row-inner"><span>ITA</span><span>🇮🇹</span><span>ITALY</span></div></div>
          </div>
        </body>
        </html>
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

          .match-board {
            position: absolute; bottom: 140px; left: 160px;
            width: 680px; display: flex; flex-direction: column; gap: 2px;
          }

          .top-bar {
            background: linear-gradient(135deg, #092552 0%, #16407d 60%, #081d3d 100%);
            border: 2px solid rgba(255,255,255,0.5);
            border-radius: 8px 8px 0 0;
            height: 52px; padding: 0 20px;
            display: flex; align-items: center; justify-content: space-between;
            transform: skewX(-12deg);
          }

          .top-left { transform: skewX(12deg); display: flex; align-items: center; gap: 12px; color: white; font-size: 24px; font-weight: 900; font-style: italic; }

          .sub-bar {
            background: linear-gradient(180deg, #ffffff 0%, #dbefe9 30%, #a8d5e5 70%, #ffffff 100%);
            height: 28px; padding-left: 20px; display: flex; align-items: center;
            transform: skewX(-12deg);
          }

          .sub-text { transform: skewX(12deg); color: #092552; font-size: 15px; font-weight: 900; font-style: italic; letter-spacing: 1.5px; }

          .match-row {
            background: linear-gradient(135deg, #0d2f66 0%, #184b94 100%);
            border: 1px solid rgba(255,255,255,0.2);
            height: 40px; display: flex; align-items: center;
            transform: skewX(-12deg); padding: 0 20px;
          }

          .row-inner { transform: skewX(12deg); display: flex; align-items: center; gap: 14px; color: white; font-weight: 900; font-style: italic; font-size: 20px; }
        </style>
      </head>
      <body>
        <div class="match-board">
          <div class="top-bar">
            <div class="top-left">${archerPictographSVG}<span>MEN'S INDIVIDUAL</span></div>
            <div style="transform: skewX(12deg);">${olympicRingsSVG}</div>
          </div>
          <div class="sub-bar"><div class="sub-text">1/8 ELIMINATION</div></div>

          <div class="match-row"><div class="row-inner"><span>UKR</span><span>🇺🇦</span><span>VIKTOR RUBAN</span></div></div>
          <div class="match-row"><div class="row-inner"><span>POL</span><span>🇵🇱</span><span>JACEK PROC</span></div></div>
        </div>
      </body>
      </html>
    `;
  }

  // ── 20. AR020a / AR020b Previous Results ─────────────────────────────────
  if (combined.includes("AR020") || combined.includes("PREVIOUS RESULTS")) {
    const isVariantB = combined.includes("AR020B") || combined.includes("TEAM");

    if (isVariantB) {
      const teamRes = [
        { noc: "CAN", flag: "🇨🇦", name: "CANADA", round: "1/8", score: "219-217" },
        { noc: "MAS", flag: "🇲🇾", name: "MALAYSIA", round: "QF", score: "218-213" },
        { noc: "UKR", flag: "🇺🇦", name: "UKRAINE", round: "SF", score: "DSQ" }
      ];

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,700;1,800;1,900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

            .res-board {
              position: absolute; bottom: 140px; left: 160px;
              width: 680px; display: flex; flex-direction: column; gap: 2px;
            }

            .top-bar {
              background: linear-gradient(135deg, #092552 0%, #16407d 60%, #081d3d 100%);
              border: 2px solid rgba(255,255,255,0.5);
              border-radius: 8px 8px 0 0;
              height: 52px; padding: 0 20px;
              display: flex; align-items: center; justify-content: space-between;
              transform: skewX(-12deg);
            }

            .top-left { transform: skewX(12deg); display: flex; align-items: center; gap: 12px; color: white; font-size: 24px; font-weight: 900; font-style: italic; }

            .sub-bar {
              background: linear-gradient(180deg, #ffffff 0%, #dbefe9 30%, #a8d5e5 70%, #ffffff 100%);
              height: 28px; padding-left: 20px; display: flex; align-items: center;
              transform: skewX(-12deg);
            }

            .sub-text { transform: skewX(12deg); color: #092552; font-size: 15px; font-weight: 900; font-style: italic; letter-spacing: 1.5px; }

            .res-row {
              background: linear-gradient(135deg, #0d2f66 0%, #184b94 100%);
              border: 1px solid rgba(255,255,255,0.2);
              height: 38px; display: flex; align-items: center; justify-content: space-between;
              transform: skewX(-12deg); padding: 0 20px;
            }

            .row-left { transform: skewX(12deg); display: flex; align-items: center; gap: 12px; color: white; font-weight: 900; font-style: italic; font-size: 19px; }
            .row-right { transform: skewX(12deg); display: flex; align-items: center; gap: 16px; color: white; font-weight: 900; font-style: italic; font-size: 19px; }
          </style>
        </head>
        <body>
          <div class="res-board">
            <div class="top-bar">
              <div class="top-left"><span>ITA</span><span>🇮🇹</span><span>ITALY</span></div>
              <div style="transform: skewX(12deg);">${olympicRingsSVG}</div>
            </div>
            <div class="sub-bar"><div class="sub-text">PREVIOUS RESULTS</div></div>

            ${teamRes.map(r => `
              <div class="res-row">
                <div class="row-left"><span>${r.noc}</span><span>${r.flag}</span><span>${r.name}</span></div>
                <div class="row-right"><span>${r.round}</span><span>${r.score}</span></div>
              </div>
            `).join('')}
          </div>
        </body>
        </html>
      `;
    }

    const indRes = [
      { noc: "EGY", flag: "🇪🇬", name: "MAGED YOUSSEF", round: "1/32", score: "7-1" },
      { noc: "AUS", flag: "🇦🇺", name: "MICHAEL NARAY", round: "1/16", score: "6-3" },
      { noc: "POL", flag: "🇵🇱", name: "JACEK PROC", round: "1/8", score: "6-2" },
      { noc: "JPN", flag: "🇯🇵", name: "RYUICHI MORIYA", round: "QF", score: "6-1" },
      { noc: "RUS", flag: "🇷🇺", name: "BAIR BADENOV", round: "SF", score: "6-0" }
    ];

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,700;1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .res-board {
            position: absolute; bottom: 140px; left: 160px;
            width: 680px; display: flex; flex-direction: column; gap: 2px;
          }

          .top-bar {
            background: linear-gradient(135deg, #092552 0%, #16407d 60%, #081d3d 100%);
            border: 2px solid rgba(255,255,255,0.5);
            border-radius: 8px 8px 0 0;
            height: 52px; padding: 0 20px;
            display: flex; align-items: center; justify-content: space-between;
            transform: skewX(-12deg);
          }

          .top-left { transform: skewX(12deg); display: flex; align-items: center; gap: 12px; color: white; font-size: 24px; font-weight: 900; font-style: italic; }

          .sub-bar {
            background: linear-gradient(180deg, #ffffff 0%, #dbefe9 30%, #a8d5e5 70%, #ffffff 100%);
            height: 28px; padding-left: 20px; display: flex; align-items: center;
            transform: skewX(-12deg);
          }

          .sub-text { transform: skewX(12deg); color: #092552; font-size: 15px; font-weight: 900; font-style: italic; letter-spacing: 1.5px; }

          .res-row {
            background: linear-gradient(135deg, #0d2f66 0%, #184b94 100%);
            border: 1px solid rgba(255,255,255,0.2);
            height: 38px; display: flex; align-items: center; justify-content: space-between;
            transform: skewX(-12deg); padding: 0 20px;
          }

          .row-left { transform: skewX(12deg); display: flex; align-items: center; gap: 12px; color: white; font-weight: 900; font-style: italic; font-size: 19px; }
          .row-right { transform: skewX(12deg); display: flex; align-items: center; gap: 16px; color: white; font-weight: 900; font-style: italic; font-size: 19px; }
        </style>
      </head>
      <body>
        <div class="res-board">
          <div class="top-bar">
            <div class="top-left"><span>UKR</span><span>🇺🇦</span><span>VIKTOR RUBAN</span></div>
            <div style="transform: skewX(12deg);">${olympicRingsSVG}</div>
          </div>
          <div class="sub-bar"><div class="sub-text">PREVIOUS RESULTS</div></div>

          ${indRes.map(r => `
            <div class="res-row">
              <div class="row-left"><span>${r.noc}</span><span>${r.flag}</span><span>${r.name}</span></div>
              <div class="row-right"><span>${r.round}</span><span>${r.score}</span></div>
            </div>
          `).join('')}
        </div>
      </body>
      </html>
    `;
  }

  // ── 21. AR021a / AR021b In-Match ID ──────────────────────────────────────
  if (combined.includes("AR021") || combined.includes("IN-MATCH ID")) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .lt-container {
            position: absolute; bottom: 120px; left: 160px;
            display: flex; align-items: center;
            background: linear-gradient(135deg, #092552 0%, #16407d 60%, #081d3d 100%);
            border: 2px solid rgba(255,255,255,0.5);
            border-radius: 8px;
            height: 52px; width: 620px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.6);
            transform: skewX(-15deg);
          }

          .lt-inner {
            transform: skewX(15deg);
            display: flex; align-items: center; gap: 16px;
            width: 100%; height: 100%; padding: 0 20px;
          }

          .noc-code { color: #ffffff; font-weight: 900; font-size: 24px; font-style: italic; }
          .flag-box { font-size: 26px; }
          .athlete-name { color: #ffffff; font-weight: 900; font-size: 26px; font-style: italic; letter-spacing: 0.5px; }
        </style>
      </head>
      <body>
        <div class="lt-container">
          <div class="lt-inner">
            <span class="noc-code">JPN</span>
            <span class="flag-box">🇯🇵</span>
            <span class="athlete-name">HIROSHI YAMAMOTO</span>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ── 22. AR022a / AR022b Crunch Scoreboard ────────────────────────────────
  if (normId.includes("AR022")) {
    const isVariantB = combined.includes("AR022B") || combined.includes("NAMES");

    if (isVariantB) {
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

            .crunch-bug {
              position: absolute; top: 100px; left: 160px;
              width: 320px; display: flex; flex-direction: column; gap: 2px;
            }

            .row {
              background: linear-gradient(135deg, #092552 0%, #16407d 100%);
              border: 1.5px solid rgba(255,255,255,0.6);
              height: 38px; padding: 0 12px;
              display: flex; align-items: center; justify-content: space-between;
              transform: skewX(-15deg); color: white; font-weight: 900; font-style: italic;
            }

            .row-inner { transform: skewX(15deg); display: flex; align-items: center; justify-content: space-between; width: 100%; }
            .left-sec { display: flex; align-items: center; gap: 8px; font-size: 16px; }
            .right-sec { display: flex; align-items: center; gap: 8px; font-size: 18px; }

            .active-arrow { color: #facc15; font-size: 16px; font-weight: 900; }

            .tab-bar {
              background: linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%);
              height: 24px; padding: 0 12px;
              display: flex; align-items: center; justify-content: center;
              transform: skewX(-15deg); border-radius: 0 0 6px 6px;
            }

            .tab-text { transform: skewX(15deg); color: #092552; font-size: 13px; font-weight: 900; font-style: italic; letter-spacing: 1px; }
          </style>
        </head>
        <body>
          <div class="crunch-bug">
            <div class="row">
              <div class="row-inner">
                <div class="left-sec"><span>MEX</span><span>🇲🇽</span><span>SERRANO</span></div>
                <div class="right-sec"><span class="active-arrow">◀</span><span>4</span><span>15</span></div>
              </div>
            </div>
            <div class="row">
              <div class="row-inner">
                <div class="left-sec"><span>RUS</span><span>🇷🇺</span><span>BADENOV</span></div>
                <div class="right-sec"><span>4</span><span>14</span></div>
              </div>
            </div>
            <div class="tab-bar">
              <div class="tab-text">SET 5</div>
            </div>
          </div>
        </body>
        </html>
      `;
    }

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .crunch-bug {
            position: absolute; top: 100px; left: 160px;
            width: 240px; display: flex; flex-direction: column; gap: 2px;
          }

          .row {
            background: linear-gradient(135deg, #092552 0%, #16407d 100%);
            border: 1.5px solid rgba(255,255,255,0.6);
            height: 36px; padding: 0 12px;
            display: flex; align-items: center; justify-content: space-between;
            transform: skewX(-15deg); color: white; font-weight: 900; font-style: italic;
          }

          .row-inner { transform: skewX(15deg); display: flex; align-items: center; justify-content: space-between; width: 100%; }
          .left-sec { display: flex; align-items: center; gap: 6px; font-size: 16px; }
          .right-sec { display: flex; align-items: center; gap: 8px; font-size: 18px; }

          .active-arrow { color: #facc15; font-size: 16px; font-weight: 900; }

          .tab-bar {
            background: linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%);
            height: 24px; padding: 0 12px;
            display: flex; align-items: center; justify-content: center;
            transform: skewX(-15deg); border-radius: 0 0 6px 6px;
          }

          .tab-text { transform: skewX(15deg); color: #092552; font-size: 13px; font-weight: 900; font-style: italic; letter-spacing: 1px; }
        </style>
      </head>
      <body>
        <div class="crunch-bug">
          <div class="row">
            <div class="row-inner">
              <div class="left-sec"><span>MEX</span><span>🇲🇽</span></div>
              <div class="right-sec"><span>2</span><span>26</span></div>
            </div>
          </div>
          <div class="row">
            <div class="row-inner">
              <div class="left-sec"><span>RUS</span><span>🇷🇺</span></div>
              <div class="right-sec"><span class="active-arrow">◀</span><span>0</span><span>19</span></div>
            </div>
          </div>
          <div class="tab-bar">
            <div class="tab-text">SET 2</div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ── 23. AR023 / Scorecard by Set ─────────────────────────────────────────
  if (combined.includes("AR023") || combined.includes("SCORECARD BY SET")) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,700;1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .card-board {
            position: absolute; bottom: 140px; left: 160px;
            width: 720px; display: flex; flex-direction: column; gap: 2px;
          }

          .top-bar {
            background: linear-gradient(135deg, #092552 0%, #16407d 60%, #081d3d 100%);
            border: 2px solid rgba(255,255,255,0.5);
            border-radius: 8px 8px 0 0;
            height: 52px; padding: 0 20px;
            display: flex; align-items: center; justify-content: space-between;
            transform: skewX(-12deg);
          }

          .top-left { transform: skewX(12deg); display: flex; align-items: center; gap: 12px; color: white; font-size: 24px; font-weight: 900; font-style: italic; }

          .sub-bar {
            background: linear-gradient(180deg, #ffffff 0%, #dbefe9 30%, #a8d5e5 70%, #ffffff 100%);
            height: 28px; padding: 0 20px; display: flex; align-items: center; justify-content: space-between;
            transform: skewX(-12deg); color: #092552; font-size: 14px; font-weight: 900; font-style: italic;
          }

          .sub-inner { transform: skewX(12deg); display: flex; justify-content: space-between; width: 100%; }

          .scores-row {
            background: linear-gradient(135deg, #0d2f66 0%, #184b94 100%);
            border: 1px solid rgba(255,255,255,0.2);
            height: 40px; padding: 0 20px; display: flex; align-items: center; justify-content: space-between;
            transform: skewX(-12deg); color: white; font-weight: 900; font-style: italic; font-size: 18px;
          }

          .row-inner { transform: skewX(12deg); display: flex; justify-content: space-between; width: 100%; }
        </style>
      </head>
      <body>
        <div class="card-board">
          <div class="top-bar">
            <div class="top-left"><span>RUS</span><span>🇷🇺</span><span>BAIR BADENOV</span></div>
            <div style="transform: skewX(12deg);">${olympicRingsSVG}</div>
          </div>
          <div class="sub-bar">
            <div class="sub-inner">
              <span>SET 1</span><span>SET 2</span><span>SET 3</span><span>SET 4</span><span>SET 5</span><span>SET PTS</span>
            </div>
          </div>

          <div class="scores-row">
            <div class="row-inner">
              <span>10  9  9  28</span>
              <span>10  9     19</span>
              <span></span>
              <span></span>
              <span></span>
              <span>0</span>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ── 24. AR024 / Scoreboard Match Result ──────────────────────────────────
  if (combined.includes("AR024") || combined.includes("SCOREBOARD MATCH RESULT")) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,700;1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .score-board {
            position: absolute; bottom: 140px; left: 160px;
            width: 720px; display: flex; flex-direction: column; gap: 2px;
          }

          .top-bar {
            background: linear-gradient(135deg, #092552 0%, #16407d 60%, #081d3d 100%);
            border: 2px solid rgba(255,255,255,0.5);
            border-radius: 8px 8px 0 0;
            height: 52px; padding: 0 20px;
            display: flex; align-items: center; justify-content: space-between;
            transform: skewX(-12deg);
          }

          .top-left { transform: skewX(12deg); display: flex; align-items: center; gap: 12px; color: white; font-size: 24px; font-weight: 900; font-style: italic; }

          .sub-bar {
            background: linear-gradient(180deg, #ffffff 0%, #dbefe9 30%, #a8d5e5 70%, #ffffff 100%);
            height: 28px; padding: 0 20px; display: flex; align-items: center; justify-content: space-between;
            transform: skewX(-12deg); color: #092552; font-size: 15px; font-weight: 900; font-style: italic;
          }

          .sub-inner { transform: skewX(12deg); display: flex; justify-content: space-between; width: 100%; }

          .score-row {
            background: linear-gradient(135deg, #0d2f66 0%, #184b94 100%);
            border: 1px solid rgba(255,255,255,0.2);
            height: 40px; padding: 0 20px; display: flex; align-items: center; justify-content: space-between;
            transform: skewX(-12deg); color: white; font-weight: 900; font-style: italic; font-size: 19px;
          }

          .row-inner { transform: skewX(12deg); display: flex; justify-content: space-between; align-items: center; width: 100%; }
          .left-sec { display: flex; align-items: center; gap: 12px; }
          .right-sec { display: flex; align-items: center; gap: 16px; }
        </style>
      </head>
      <body>
        <div class="score-board">
          <div class="top-bar">
            <div class="top-left">${archerPictographSVG}<span>MEN'S INDIVIDUAL</span></div>
            <div style="transform: skewX(12deg);">${olympicRingsSVG}</div>
          </div>
          <div class="sub-bar">
            <div class="sub-inner">
              <span>BRONZE MEDAL MATCH</span>
              <div style="display:flex; gap:20px;">
                <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>SET PTS</span>
              </div>
            </div>
          </div>

          <div class="score-row">
            <div class="row-inner">
              <div class="left-sec"><span>MEX</span><span>🇲🇽</span><span>JUAN RENE SERRANO</span></div>
              <div class="right-sec"><span style="color:#4ade80;">29</span><span style="color:#4ade80;">28</span><span>4</span></div>
            </div>
          </div>
          <div class="score-row">
            <div class="row-inner">
              <div class="left-sec"><span>RUS</span><span>🇷🇺</span><span>BAIR BADENOV</span></div>
              <div class="right-sec"><span>28</span><span>27</span><span>0</span></div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ── 25. AR025 / Shoot-Off Scoreboard ──────────────────────────────────────
  if (normId.includes("AR025")) {
    const isVariantB = normId.endsWith("B") || normId.includes("AR025B");

    if (isVariantB) {
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,700;1,800;1,900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

            .shoot-board {
              position: absolute; bottom: 140px; left: 160px;
              width: 680px; display: flex; flex-direction: column; gap: 2px;
            }

            .top-bar {
              background: linear-gradient(135deg, #092552 0%, #16407d 60%, #081d3d 100%);
              border: 2px solid rgba(255,255,255,0.5);
              border-radius: 8px 8px 0 0;
              height: 52px; padding: 0 20px;
              display: flex; align-items: center; justify-content: space-between;
              transform: skewX(-12deg);
            }

            .top-left { transform: skewX(12deg); display: flex; align-items: center; gap: 12px; color: white; font-size: 24px; font-weight: 900; font-style: italic; }

            .sub-bar {
              background: linear-gradient(180deg, #ffffff 0%, #dbefe9 30%, #a8d5e5 70%, #ffffff 100%);
              height: 28px; padding-left: 20px; display: flex; align-items: center;
              transform: skewX(-12deg);
            }

            .sub-text { transform: skewX(12deg); color: #092552; font-size: 15px; font-weight: 900; font-style: italic; letter-spacing: 1.5px; }

            .shoot-row {
              background: linear-gradient(135deg, #0d2f66 0%, #184b94 100%);
              border: 1px solid rgba(255,255,255,0.2);
              height: 40px; padding: 0 20px; display: flex; align-items: center; justify-content: space-between;
              transform: skewX(-12deg); color: white; font-weight: 900; font-style: italic; font-size: 20px;
            }

            .row-inner { transform: skewX(12deg); display: flex; justify-content: space-between; align-items: center; width: 100%; }
            .left-sec { display: flex; align-items: center; gap: 12px; }
          </style>
        </head>
        <body>
          <div class="shoot-board">
            <div class="top-bar">
              <div class="top-left">${archerPictographSVG}<span>MEN'S INDIVIDUAL</span></div>
              <div style="transform: skewX(12deg);">${olympicRingsSVG}</div>
            </div>
            <div class="sub-bar"><div class="sub-text">SHOOT-OFF - 1/16 ELIMINATION</div></div>

            <div class="shoot-row">
              <div class="row-inner">
                <div class="left-sec"><span>UKR</span><span>🇺🇦</span><span>VIKTOR RUBAN</span></div>
                <span>10</span>
              </div>
            </div>
            <div class="shoot-row">
              <div class="row-inner">
                <div class="left-sec"><span>AUS</span><span>🇦🇺</span><span>MICHAEL NARAY</span></div>
                <span>10*</span>
              </div>
            </div>
          </div>
        </body>
        </html>
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

          .shoot-board {
            position: absolute; bottom: 140px; left: 160px;
            width: 680px; display: flex; flex-direction: column; gap: 2px;
          }

          .top-bar {
            background: linear-gradient(135deg, #092552 0%, #16407d 60%, #081d3d 100%);
            border: 2px solid rgba(255,255,255,0.5);
            border-radius: 8px 8px 0 0;
            height: 52px; padding: 0 20px;
            display: flex; align-items: center; justify-content: space-between;
            transform: skewX(-12deg);
          }

          .top-left { transform: skewX(12deg); display: flex; align-items: center; gap: 12px; color: white; font-size: 24px; font-weight: 900; font-style: italic; }

          .sub-bar {
            background: linear-gradient(180deg, #ffffff 0%, #dbefe9 30%, #a8d5e5 70%, #ffffff 100%);
            height: 28px; padding-left: 20px; display: flex; align-items: center;
            transform: skewX(-12deg);
          }

          .sub-text { transform: skewX(12deg); color: #092552; font-size: 15px; font-weight: 900; font-style: italic; letter-spacing: 1.5px; }

          .shoot-row {
            background: linear-gradient(135deg, #0d2f66 0%, #184b94 100%);
            border: 1px solid rgba(255,255,255,0.2);
            height: 40px; padding: 0 20px; display: flex; align-items: center; justify-content: space-between;
            transform: skewX(-12deg); color: white; font-weight: 900; font-style: italic; font-size: 20px;
          }

          .row-inner { transform: skewX(12deg); display: flex; justify-content: space-between; align-items: center; width: 100%; }
          .left-sec { display: flex; align-items: center; gap: 12px; }
        </style>
      </head>
      <body>
        <div class="shoot-board">
          <div class="top-bar">
            <div class="top-left">${archerPictographSVG}<span>MEN'S INDIVIDUAL</span></div>
            <div style="transform: skewX(12deg);">${olympicRingsSVG}</div>
          </div>
          <div class="sub-bar"><div class="sub-text">SHOOT-OFF - BRONZE MEDAL MATCH</div></div>

          <div class="shoot-row">
            <div class="row-inner">
              <div class="left-sec"><span>MEX</span><span>🇲🇽</span><span>JUAN RENE SERRANO</span></div>
              <span>10</span>
            </div>
          </div>
          <div class="shoot-row">
            <div class="row-inner">
              <div class="left-sec"><span>RUS</span><span>🇷🇺</span><span>BAIR BADENOV</span></div>
              <span>9</span>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ── 26. AR026 / Winner ID ────────────────────────────────────────────────
  if (normId.includes("AR026")) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,700;1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .winner-board {
            position: absolute; bottom: 140px; left: 160px;
            width: 680px; display: flex; flex-direction: column; gap: 2px;
          }

          .top-bar {
            background: linear-gradient(135deg, #092552 0%, #16407d 60%, #081d3d 100%);
            border: 2px solid rgba(255,255,255,0.5);
            border-radius: 8px 8px 0 0;
            height: 52px; padding: 0 20px;
            display: flex; align-items: center; justify-content: space-between;
            transform: skewX(-12deg);
          }

          .top-left { transform: skewX(12deg); display: flex; align-items: center; gap: 12px; color: white; font-size: 24px; font-weight: 900; font-style: italic; }

          .sub-bar {
            background: linear-gradient(180deg, #ffffff 0%, #dbefe9 30%, #a8d5e5 70%, #ffffff 100%);
            height: 28px; padding-left: 20px; display: flex; align-items: center;
            transform: skewX(-12deg);
          }

          .sub-text { transform: skewX(12deg); color: #092552; font-size: 15px; font-weight: 900; font-style: italic; letter-spacing: 1.5px; }

          .winner-row {
            background: linear-gradient(135deg, #0d2f66 0%, #184b94 100%);
            border: 1px solid rgba(255,255,255,0.2);
            height: 40px; padding: 0 20px; display: flex; align-items: center;
            transform: skewX(-12deg); color: white; font-weight: 900; font-style: italic; font-size: 20px;
          }

          .row-inner { transform: skewX(12deg); display: flex; align-items: center; gap: 14px; }
        </style>
      </head>
      <body>
        <div class="winner-board">
          <div class="top-bar">
            <div class="top-left">${archerPictographSVG}<span>MEN'S INDIVIDUAL</span></div>
            <div style="transform: skewX(12deg);">${olympicRingsSVG}</div>
          </div>
          <div class="sub-bar"><div class="sub-text">MATCH WINNER - 1/16 ELIMINATION</div></div>

          <div class="winner-row">
            <div class="row-inner"><span>UKR</span><span>🇺🇦</span><span>VIKTOR RUBAN</span></div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ── 27. AR027 / Clock ────────────────────────────────────────────────────
  if (combined.includes("AR027") || combined.includes("CLOCK")) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .clock-pill {
            position: absolute; bottom: 120px; left: 240px;
            background: linear-gradient(180deg, #ffffff 0%, #cbd5e1 50%, #94a3b8 100%);
            border: 2px solid #ffffff;
            border-radius: 18px;
            padding: 4px 28px;
            box-shadow: 0 8px 20px rgba(0,0,0,0.5);
            transform: skewX(-15deg);
          }

          .clock-text {
            transform: skewX(15deg);
            color: #0f2b5c; font-size: 24px; font-weight: 900; font-style: italic;
          }
        </style>
      </head>
      <body>
        <div class="clock-pill">
          <div class="clock-text">16</div>
        </div>
      </body>
      </html>
    `;
  }

  // ── 28. AR028 / Team List ────────────────────────────────────────────────
  if (combined.includes("AR028") || combined.includes("TEAM LIST")) {
    const members = ["VIKTOR RUBAN", "MARKIYAN IVASHKO", "OLEKSANDR SERDYUK"];

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,700;1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .team-board {
            position: absolute; bottom: 140px; left: 160px;
            width: 650px; display: flex; flex-direction: column; gap: 2px;
          }

          .top-bar {
            background: linear-gradient(135deg, #092552 0%, #16407d 60%, #081d3d 100%);
            border: 2px solid rgba(255,255,255,0.5);
            border-radius: 8px 8px 0 0;
            height: 52px; padding: 0 20px;
            display: flex; align-items: center; justify-content: space-between;
            transform: skewX(-12deg);
          }

          .top-left { transform: skewX(12deg); display: flex; align-items: center; gap: 12px; color: white; font-size: 24px; font-weight: 900; font-style: italic; }

          .member-row {
            background: linear-gradient(135deg, #0d2f66 0%, #184b94 100%);
            border: 1px solid rgba(255,255,255,0.2);
            height: 38px; display: flex; align-items: center;
            transform: skewX(-12deg); padding: 0 20px;
          }

          .row-inner { transform: skewX(12deg); color: white; font-weight: 900; font-style: italic; font-size: 19px; }
        </style>
      </head>
      <body>
        <div class="team-board">
          <div class="top-bar">
            <div class="top-left"><span>UKR</span><span>🇺🇦</span><span>UKRAINE</span></div>
            <div style="transform: skewX(12deg);">${olympicRingsSVG}</div>
          </div>
          ${members.map(m => `
            <div class="member-row">
              <div class="row-inner">${m}</div>
            </div>
          `).join('')}
        </div>
      </body>
      </html>
    `;
  }

  // ── 29. AR029 / Crunch Scoreboard (Ends) ─────────────────────────────────
  if (combined.includes("AR029")) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .crunch-bug {
            position: absolute; top: 100px; left: 160px;
            width: 240px; display: flex; flex-direction: column; gap: 2px;
          }

          .row {
            background: linear-gradient(135deg, #092552 0%, #16407d 100%);
            border: 1.5px solid rgba(255,255,255,0.6);
            height: 36px; padding: 0 12px;
            display: flex; align-items: center; justify-content: space-between;
            transform: skewX(-15deg); color: white; font-weight: 900; font-style: italic;
          }

          .row-inner { transform: skewX(15deg); display: flex; align-items: center; justify-content: space-between; width: 100%; }
          .left-sec { display: flex; align-items: center; gap: 6px; font-size: 16px; }
          .right-sec { display: flex; align-items: center; gap: 8px; font-size: 18px; }

          .active-arrow { color: #facc15; font-size: 16px; font-weight: 900; }

          .tab-bar {
            background: linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%);
            height: 24px; padding: 0 12px;
            display: flex; align-items: center; justify-content: center;
            transform: skewX(-15deg); border-radius: 0 0 6px 6px;
          }

          .tab-text { transform: skewX(15deg); color: #092552; font-size: 13px; font-weight: 900; font-style: italic; letter-spacing: 1px; }
        </style>
      </head>
      <body>
        <div class="crunch-bug">
          <div class="row">
            <div class="row-inner">
              <div class="left-sec"><span>CHN</span><span>🇨🇳</span></div>
              <div class="right-sec"><span class="active-arrow">◀</span><span>9/24</span><span>85</span></div>
            </div>
          </div>
          <div class="row">
            <div class="row-inner">
              <div class="left-sec"><span>UKR</span><span>🇺🇦</span></div>
              <div class="right-sec"><span>9/24</span><span>83</span></div>
            </div>
          </div>
          <div class="tab-bar">
            <div class="tab-text">END 2</div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ── 30. AR030 / Scorecard by End ─────────────────────────────────────────
  if (combined.includes("AR030")) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,700;1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .card-board {
            position: absolute; bottom: 140px; left: 160px;
            width: 720px; display: flex; flex-direction: column; gap: 2px;
          }

          .top-bar {
            background: linear-gradient(135deg, #092552 0%, #16407d 60%, #081d3d 100%);
            border: 2px solid rgba(255,255,255,0.5);
            border-radius: 8px 8px 0 0;
            height: 52px; padding: 0 20px;
            display: flex; align-items: center; justify-content: space-between;
            transform: skewX(-12deg);
          }

          .top-left { transform: skewX(12deg); display: flex; align-items: center; gap: 12px; color: white; font-size: 24px; font-weight: 900; font-style: italic; }

          .sub-bar {
            background: linear-gradient(180deg, #ffffff 0%, #dbefe9 30%, #a8d5e5 70%, #ffffff 100%);
            height: 28px; padding: 0 20px; display: flex; align-items: center; justify-content: space-between;
            transform: skewX(-12deg); color: #092552; font-size: 14px; font-weight: 900; font-style: italic;
          }

          .sub-inner { transform: skewX(12deg); display: flex; justify-content: space-between; width: 100%; }

          .scores-row {
            background: linear-gradient(135deg, #0d2f66 0%, #184b94 100%);
            border: 1px solid rgba(255,255,255,0.2);
            height: 40px; padding: 0 20px; display: flex; align-items: center; justify-content: space-between;
            transform: skewX(-12deg); color: white; font-weight: 900; font-style: italic; font-size: 18px;
          }

          .row-inner { transform: skewX(12deg); display: flex; justify-content: space-between; width: 100%; }
        </style>
      </head>
      <body>
        <div class="card-board">
          <div class="top-bar">
            <div class="top-left"><span>ITA</span><span>🇮🇹</span><span>ITALY</span></div>
            <div style="transform: skewX(12deg);">${olympicRingsSVG}</div>
          </div>
          <div class="sub-bar">
            <div class="sub-inner">
              <span>END 1</span><span>END 2</span><span>END 3</span><span>END 4</span><span>TOTAL</span>
            </div>
          </div>

          <div class="scores-row">
            <div class="row-inner">
              <span>56</span>
              <span>55</span>
              <span></span>
              <span></span>
              <span>111</span>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ── 31. AR031 / Scoreboard ───────────────────────────────────────────────
  if (normId.includes("AR031")) {
    const isVariantB = normId.endsWith("B") || normId.includes("AR031B");

    if (isVariantB) {
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,700;1,800;1,900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

            .score-board {
              position: absolute; bottom: 140px; left: 160px;
              width: 720px; display: flex; flex-direction: column; gap: 2px;
            }

            .top-bar {
              background: linear-gradient(135deg, #092552 0%, #16407d 60%, #081d3d 100%);
              border: 2px solid rgba(255,255,255,0.5);
              border-radius: 8px 8px 0 0;
              height: 52px; padding: 0 20px;
              display: flex; align-items: center; justify-content: space-between;
              transform: skewX(-12deg);
            }

            .top-left { transform: skewX(12deg); display: flex; align-items: center; gap: 12px; color: white; font-size: 24px; font-weight: 900; font-style: italic; }

            .sub-bar {
              background: linear-gradient(180deg, #ffffff 0%, #dbefe9 30%, #a8d5e5 70%, #ffffff 100%);
              height: 28px; padding: 0 20px; display: flex; align-items: center; justify-content: space-between;
              transform: skewX(-12deg); color: #092552; font-size: 15px; font-weight: 900; font-style: italic;
            }

            .sub-inner { transform: skewX(12deg); display: flex; justify-content: space-between; width: 100%; }

            .score-row {
              background: linear-gradient(135deg, #0d2f66 0%, #184b94 100%);
              border: 1px solid rgba(255,255,255,0.2);
              height: 40px; padding: 0 20px; display: flex; align-items: center; justify-content: space-between;
              transform: skewX(-12deg); color: white; font-weight: 900; font-style: italic; font-size: 19px;
            }

            .row-inner { transform: skewX(12deg); display: flex; justify-content: space-between; align-items: center; width: 100%; }
            .left-sec { display: flex; align-items: center; gap: 12px; }
            .mid-sec { display: flex; align-items: center; gap: 14px; }
            .right-sec { display: flex; align-items: center; gap: 16px; }
            .active-arrow { color: #facc15; font-size: 16px; }
            .or-badge { background: #94a3b8; color: #092552; padding: 1px 6px; border-radius: 4px; font-size: 13px; font-weight: 900; }
          </style>
        </head>
        <body>
          <div class="score-board">
            <div class="top-bar">
              <div class="top-left">${archerPictographSVG}<span>MEN'S TEAM</span></div>
              <div style="transform: skewX(12deg);">${olympicRingsSVG}</div>
            </div>
            <div class="sub-bar">
              <div class="sub-inner">
                <span>GOLD MEDAL MATCH</span>
                <span>TOTAL</span>
              </div>
            </div>

            <div class="score-row">
              <div class="row-inner">
                <div class="left-sec"><span>KOR</span><span>🇰🇷</span><span>KOREA</span></div>
                <div class="mid-sec"><span>9</span><span>9</span><span>9</span><span>9</span><span>10</span><span>9</span><span>END 4 53</span></div>
                <div class="right-sec"><span class="or-badge">OR</span><span>225</span></div>
              </div>
            </div>
            <div class="score-row">
              <div class="row-inner">
                <div class="left-sec"><span>ITA</span><span>🇮🇹</span><span>ITALY</span><span class="active-arrow">◀</span></div>
                <div class="mid-sec"><span>9</span><span>10</span><span>10</span><span>9</span><span>10</span><span>END 4 48</span></div>
                <div class="right-sec"><span>218</span></div>
              </div>
            </div>
          </div>
        </body>
        </html>
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

          .score-board {
            position: absolute; bottom: 140px; left: 160px;
            width: 720px; display: flex; flex-direction: column; gap: 2px;
          }

          .top-bar {
            background: linear-gradient(135deg, #092552 0%, #16407d 60%, #081d3d 100%);
            border: 2px solid rgba(255,255,255,0.5);
            border-radius: 8px 8px 0 0;
            height: 52px; padding: 0 20px;
            display: flex; align-items: center; justify-content: space-between;
            transform: skewX(-12deg);
          }

          .top-left { transform: skewX(12deg); display: flex; align-items: center; gap: 12px; color: white; font-size: 24px; font-weight: 900; font-style: italic; }

          .sub-bar {
            background: linear-gradient(180deg, #ffffff 0%, #dbefe9 30%, #a8d5e5 70%, #ffffff 100%);
            height: 28px; padding: 0 20px; display: flex; align-items: center; justify-content: space-between;
            transform: skewX(-12deg); color: #092552; font-size: 15px; font-weight: 900; font-style: italic;
          }

          .sub-inner { transform: skewX(12deg); display: flex; justify-content: space-between; width: 100%; }

          .score-row {
            background: linear-gradient(135deg, #0d2f66 0%, #184b94 100%);
            border: 1px solid rgba(255,255,255,0.2);
            height: 40px; padding: 0 20px; display: flex; align-items: center; justify-content: space-between;
            transform: skewX(-12deg); color: white; font-weight: 900; font-style: italic; font-size: 19px;
          }

          .row-inner { transform: skewX(12deg); display: flex; justify-content: space-between; align-items: center; width: 100%; }
          .left-sec { display: flex; align-items: center; gap: 12px; }
          .mid-sec { display: flex; align-items: center; gap: 14px; }
          .right-sec { display: flex; align-items: center; gap: 16px; }
          .active-arrow { color: #facc15; font-size: 16px; }
        </style>
      </head>
      <body>
        <div class="score-board">
          <div class="top-bar">
            <div class="top-left">${archerPictographSVG}<span>MEN'S TEAM</span></div>
            <div style="transform: skewX(12deg);">${olympicRingsSVG}</div>
          </div>
          <div class="sub-bar">
            <div class="sub-inner">
              <span>BRONZE MEDAL MATCH</span>
              <span>TOTAL</span>
            </div>
          </div>

          <div class="score-row">
            <div class="row-inner">
              <div class="left-sec"><span>CHN</span><span>🇨🇳</span><span>CHINA</span><span class="active-arrow">◀</span></div>
              <div class="mid-sec"><span>10</span><span>10</span><span>9</span><span>END 2 29</span></div>
              <div class="right-sec"><span>85</span></div>
            </div>
          </div>
          <div class="score-row">
            <div class="row-inner">
              <div class="left-sec"><span>UKR</span><span>🇺🇦</span><span>UKRAINE</span></div>
              <div class="mid-sec"><span>10</span><span>10</span><span>10</span><span>END 2 30</span></div>
              <div class="right-sec"><span>83</span></div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ── 32. AR032 / Match Result ─────────────────────────────────────────────
  if (combined.includes("AR032")) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,700;1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .score-board {
            position: absolute; bottom: 140px; left: 160px;
            width: 720px; display: flex; flex-direction: column; gap: 2px;
          }

          .top-bar {
            background: linear-gradient(135deg, #092552 0%, #16407d 60%, #081d3d 100%);
            border: 2px solid rgba(255,255,255,0.5);
            border-radius: 8px 8px 0 0;
            height: 52px; padding: 0 20px;
            display: flex; align-items: center; justify-content: space-between;
            transform: skewX(-12deg);
          }

          .top-left { transform: skewX(12deg); display: flex; align-items: center; gap: 12px; color: white; font-size: 24px; font-weight: 900; font-style: italic; }

          .sub-bar {
            background: linear-gradient(180deg, #ffffff 0%, #dbefe9 30%, #a8d5e5 70%, #ffffff 100%);
            height: 28px; padding-left: 20px; display: flex; align-items: center;
            transform: skewX(-12deg);
          }

          .sub-text { transform: skewX(12deg); color: #092552; font-size: 15px; font-weight: 900; font-style: italic; letter-spacing: 1.5px; }

          .score-row {
            background: linear-gradient(135deg, #0d2f66 0%, #184b94 100%);
            border: 1px solid rgba(255,255,255,0.2);
            height: 40px; padding: 0 20px; display: flex; align-items: center; justify-content: space-between;
            transform: skewX(-12deg); color: white; font-weight: 900; font-style: italic; font-size: 19px;
          }

          .row-inner { transform: skewX(12deg); display: flex; justify-content: space-between; align-items: center; width: 100%; }
          .left-sec { display: flex; align-items: center; gap: 12px; }
          .wr-badge { background: #eab308; color: #092552; padding: 1px 6px; border-radius: 4px; font-size: 14px; margin-right: 8px; }
        </style>
      </head>
      <body>
        <div class="score-board">
          <div class="top-bar">
            <div class="top-left">${archerPictographSVG}<span>MEN'S TEAM</span></div>
            <div style="transform: skewX(12deg);">${olympicRingsSVG}</div>
          </div>
          <div class="sub-bar"><div class="sub-text">RESULT - 1/8 ELIMINATION</div></div>

          <div class="score-row">
            <div class="row-inner">
              <div class="left-sec"><span>CAN</span><span>🇨🇦</span><span>CANADA</span></div>
              <span>217</span>
            </div>
          </div>
          <div class="score-row">
            <div class="row-inner">
              <div class="left-sec"><span>ITA</span><span>🇮🇹</span><span>ITALY</span></div>
              <div><span class="wr-badge">WR</span><span>232</span></div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ── 33. AR033 / Winner ID ────────────────────────────────────────────────
  if (combined.includes("AR033")) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,700;1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .winner-board {
            position: absolute; bottom: 140px; left: 160px;
            width: 680px; display: flex; flex-direction: column; gap: 2px;
          }

          .top-bar {
            background: linear-gradient(135deg, #092552 0%, #16407d 60%, #081d3d 100%);
            border: 2px solid rgba(255,255,255,0.5);
            border-radius: 8px 8px 0 0;
            height: 52px; padding: 0 20px;
            display: flex; align-items: center; justify-content: space-between;
            transform: skewX(-12deg);
          }

          .top-left { transform: skewX(12deg); display: flex; align-items: center; gap: 12px; color: white; font-size: 24px; font-weight: 900; font-style: italic; }

          .sub-bar {
            background: linear-gradient(180deg, #ffffff 0%, #dbefe9 30%, #a8d5e5 70%, #ffffff 100%);
            height: 28px; padding-left: 20px; display: flex; align-items: center;
            transform: skewX(-12deg);
          }

          .sub-text { transform: skewX(12deg); color: #092552; font-size: 15px; font-weight: 900; font-style: italic; letter-spacing: 1.5px; }

          .winner-row {
            background: linear-gradient(135deg, #0d2f66 0%, #184b94 100%);
            border: 1px solid rgba(255,255,255,0.2);
            height: 40px; padding: 0 20px; display: flex; align-items: center; justify-content: space-between;
            transform: skewX(-12deg); color: white; font-weight: 900; font-style: italic; font-size: 20px;
          }

          .row-inner { transform: skewX(12deg); display: flex; justify-content: space-between; align-items: center; width: 100%; }
          .left-sec { display: flex; align-items: center; gap: 14px; }
        </style>
      </head>
      <body>
        <div class="winner-board">
          <div class="top-bar">
            <div class="top-left">${archerPictographSVG}<span>MEN'S TEAM</span></div>
            <div style="transform: skewX(12deg);">${olympicRingsSVG}</div>
          </div>
          <div class="sub-bar"><div class="sub-text">MATCH WINNER - 1/8 ELIMINATION</div></div>

          <div class="winner-row">
            <div class="row-inner">
              <div class="left-sec"><span>ITA</span><span>🇮🇹</span><span>ITALY</span></div>
              <span>219</span>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ── 34. AR034 / Clocks (with NOC) ────────────────────────────────────────
  if (normId.includes("AR034")) {
    const isVariantB = normId.endsWith("B") || normId.includes("AR034B");
    const timeVal = isVariantB ? "98" : "102";
    const nocCode = isVariantB ? "KOR" : "FRA";
    const flagIcon = isVariantB ? "🇰🇷" : "🇫🇷";

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .clock-container {
            position: absolute; bottom: 120px; left: 240px;
            display: flex; align-items: center;
            background: linear-gradient(180deg, #ffffff 0%, #cbd5e1 50%, #94a3b8 100%);
            border: 2px solid #ffffff;
            border-radius: 18px;
            box-shadow: 0 8px 20px rgba(0,0,0,0.5);
            transform: skewX(-15deg);
            overflow: hidden;
          }

          .clock-val {
            padding: 4px 20px; color: #0f2b5c; font-size: 24px; font-weight: 900; font-style: italic;
            transform: skewX(15deg);
          }

          .noc-badge {
            background: linear-gradient(135deg, #092552 0%, #16407d 100%);
            color: white; padding: 6px 16px; font-size: 20px; font-weight: 900; font-style: italic;
            display: flex; align-items: center; gap: 8px;
          }

          .noc-inner { transform: skewX(15deg); display: flex; align-items: center; gap: 6px; }
        </style>
      </head>
      <body>
        <div class="clock-container">
          <div class="clock-val">${timeVal}</div>
          <div class="noc-badge">
            <div class="noc-inner">
              <span>${nocCode}</span>
              <span>${flagIcon}</span>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ── 35. AR035 / Shoot-Off Scoreboard (Team) ──────────────────────────────
  if (normId.includes("AR035")) {
    const isVariantB = normId.endsWith("B") || normId.includes("AR035B");

    if (isVariantB) {
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,700;1,800;1,900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

            .shoot-board {
              position: absolute; bottom: 140px; left: 160px;
              width: 720px; display: flex; flex-direction: column; gap: 2px;
            }

            .top-bar {
              background: linear-gradient(135deg, #092552 0%, #16407d 60%, #081d3d 100%);
              border: 2px solid rgba(255,255,255,0.5);
              border-radius: 8px 8px 0 0;
              height: 52px; padding: 0 20px;
              display: flex; align-items: center; justify-content: space-between;
              transform: skewX(-12deg);
            }

            .top-left { transform: skewX(12deg); display: flex; align-items: center; gap: 12px; color: white; font-size: 24px; font-weight: 900; font-style: italic; }

            .sub-bar {
              background: linear-gradient(180deg, #ffffff 0%, #dbefe9 30%, #a8d5e5 70%, #ffffff 100%);
              height: 28px; padding: 0 20px; display: flex; align-items: center; justify-content: space-between;
              transform: skewX(-12deg); color: #092552; font-size: 15px; font-weight: 900; font-style: italic;
            }

            .sub-inner { transform: skewX(12deg); display: flex; justify-content: space-between; width: 100%; }

            .shoot-row {
              background: linear-gradient(135deg, #0d2f66 0%, #184b94 100%);
              border: 1px solid rgba(255,255,255,0.2);
              height: 40px; padding: 0 20px; display: flex; align-items: center; justify-content: space-between;
              transform: skewX(-12deg); color: white; font-weight: 900; font-style: italic; font-size: 19px;
            }

            .row-inner { transform: skewX(12deg); display: flex; justify-content: space-between; align-items: center; width: 100%; }
            .left-sec { display: flex; align-items: center; gap: 12px; }
            .right-sec { display: flex; align-items: center; gap: 16px; }
          </style>
        </head>
        <body>
          <div class="shoot-board">
            <div class="top-bar">
              <div class="top-left">${archerPictographSVG}<span>MEN'S TEAM</span></div>
              <div style="transform: skewX(12deg);">${olympicRingsSVG}</div>
            </div>
            <div class="sub-bar">
              <div class="sub-inner">
                <span>SHOOT-OFF - GOLD MEDAL MATCH</span>
                <div style="display:flex; gap:20px;">
                  <span>1</span><span>2</span><span>3</span><span>TOTAL</span>
                </div>
              </div>
            </div>

            <div class="shoot-row">
              <div class="row-inner">
                <div class="left-sec"><span>KOR</span><span>🇰🇷</span><span>KOREA</span></div>
                <div class="right-sec"><span>9</span><span>8</span><span>10</span><span>27</span></div>
              </div>
            </div>
            <div class="shoot-row">
              <div class="row-inner">
                <div class="left-sec"><span>ITA</span><span>🇮🇹</span><span>ITALY</span></div>
                <div class="right-sec"><span>9</span><span>8</span><span>10</span><span>27*</span></div>
              </div>
            </div>
          </div>
        </body>
        </html>
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

          .shoot-board {
            position: absolute; bottom: 140px; left: 160px;
            width: 720px; display: flex; flex-direction: column; gap: 2px;
          }

          .top-bar {
            background: linear-gradient(135deg, #092552 0%, #16407d 60%, #081d3d 100%);
            border: 2px solid rgba(255,255,255,0.5);
            border-radius: 8px 8px 0 0;
            height: 52px; padding: 0 20px;
            display: flex; align-items: center; justify-content: space-between;
            transform: skewX(-12deg);
          }

          .top-left { transform: skewX(12deg); display: flex; align-items: center; gap: 12px; color: white; font-size: 24px; font-weight: 900; font-style: italic; }

          .sub-bar {
            background: linear-gradient(180deg, #ffffff 0%, #dbefe9 30%, #a8d5e5 70%, #ffffff 100%);
            height: 28px; padding: 0 20px; display: flex; align-items: center; justify-content: space-between;
            transform: skewX(-12deg); color: #092552; font-size: 15px; font-weight: 900; font-style: italic;
          }

          .sub-inner { transform: skewX(12deg); display: flex; justify-content: space-between; width: 100%; }

          .shoot-row {
            background: linear-gradient(135deg, #0d2f66 0%, #184b94 100%);
            border: 1px solid rgba(255,255,255,0.2);
            height: 40px; padding: 0 20px; display: flex; align-items: center; justify-content: space-between;
            transform: skewX(-12deg); color: white; font-weight: 900; font-style: italic; font-size: 19px;
          }

          .row-inner { transform: skewX(12deg); display: flex; justify-content: space-between; align-items: center; width: 100%; }
          .left-sec { display: flex; align-items: center; gap: 12px; }
          .right-sec { display: flex; align-items: center; gap: 16px; }
        </style>
      </head>
      <body>
        <div class="shoot-board">
          <div class="top-bar">
            <div class="top-left">${archerPictographSVG}<span>MEN'S TEAM</span></div>
            <div style="transform: skewX(12deg);">${olympicRingsSVG}</div>
          </div>
          <div class="sub-bar">
            <div class="sub-inner">
              <span>SHOOT-OFF - BRONZE MEDAL MATCH</span>
              <div style="display:flex; gap:20px;">
                <span>1</span><span>2</span><span>3</span><span>TOTAL</span>
              </div>
            </div>
          </div>

          <div class="shoot-row">
            <div class="row-inner">
              <div class="left-sec"><span>CHN</span><span>🇨🇳</span><span>CHINA</span></div>
              <div class="right-sec"><span>9</span><span>8</span><span>10</span><span>27</span></div>
            </div>
          </div>
          <div class="shoot-row">
            <div class="row-inner">
              <div class="left-sec"><span>UKR</span><span>🇺🇦</span><span>UKRAINE</span></div>
              <div class="right-sec"><span>9</span><span>8</span><span>9</span><span>26</span></div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ── 36. AR036 / Team ID ──────────────────────────────────────────────────
  if (normId.includes("AR036")) {
    const isVariantB = normId.endsWith("B") || normId.includes("AR036B");

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .lt-container {
            position: absolute; bottom: 120px; left: 160px;
            display: flex; align-items: center;
            background: linear-gradient(135deg, #092552 0%, #16407d 60%, #081d3d 100%);
            border: 2px solid rgba(255,255,255,0.5);
            border-radius: 8px;
            height: 52px; width: 680px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.6);
            transform: skewX(-15deg);
          }

          .lt-inner {
            transform: skewX(15deg);
            display: flex; align-items: center; justify-content: space-between;
            width: 100%; height: 100%; padding: 0 20px;
          }

          .team-left { display: flex; align-items: center; gap: 14px; }
          .noc-code { color: #ffffff; font-weight: 900; font-size: 24px; font-style: italic; }
          .flag-box { font-size: 26px; }
          .team-name { color: #ffffff; font-weight: 900; font-size: 26px; font-style: italic; letter-spacing: 0.5px; }
          .dsq-badge { background: #dc2626; color: white; padding: 2px 10px; border-radius: 4px; font-weight: 900; font-size: 16px; font-style: italic; }
        </style>
      </head>
      <body>
        <div class="lt-container">
          <div class="lt-inner">
            <div class="team-left">
              <span class="noc-code">GER</span>
              <span class="flag-box">🇩🇪</span>
              <span class="team-name">GERMANY</span>
            </div>
            <div style="display: flex; align-items: center; gap: 12px;">
              ${isVariantB ? '<span class="dsq-badge">DSQ</span>' : ''}
              ${olympicRingsSVG}
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ── 37. AR037 / Wind Indicator ───────────────────────────────────────────
  if (normId.includes("AR037")) {
    const isVariantB = normId.endsWith("B") || normId.includes("AR037B");

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .timer-pill {
            position: absolute; bottom: 120px; left: 240px;
            background: linear-gradient(180deg, #ffffff 0%, #cbd5e1 50%, #94a3b8 100%);
            border: 2px solid #ffffff;
            border-radius: 18px;
            padding: 4px 20px;
            box-shadow: 0 8px 20px rgba(0,0,0,0.5);
            transform: skewX(-15deg);
            display: flex; align-items: center;
          }

          .timer-text {
            transform: skewX(15deg);
            color: #0f2b5c; font-size: 22px; font-weight: 900; font-style: italic;
          }

          .wind-widget {
            position: absolute; bottom: 120px; right: 280px;
            display: flex; flex-direction: column; align-items: center;
          }

          .target-graphic {
            width: 90px; height: 110px;
            position: relative; display: flex; flex-direction: column; align-items: center;
          }

          .target-circle {
            width: 70px; height: 70px; border-radius: 50%;
            background: radial-gradient(circle, #facc15 0%, #facc15 25%, #ef4444 25%, #ef4444 50%, #3b82f6 50%, #3b82f6 75%, #0f172a 75%);
            border: 3px solid #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.5);
            z-index: 2;
          }

          .target-stand {
            width: 60px; height: 40px; background: #1e3a8a;
            clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);
            margin-top: -15px; display: flex; align-items: center; justify-content: center;
            border: 1px solid rgba(255,255,255,0.4);
          }

          .arrow-dir {
            color: white; font-size: 20px; transform: rotate(-45deg); font-weight: 900;
          }

          .speed-pill {
            background: linear-gradient(180deg, #ffffff 0%, #cbd5e1 50%, #94a3b8 100%);
            border: 2px solid #ffffff; border-radius: 14px;
            padding: 2px 20px; box-shadow: 0 6px 16px rgba(0,0,0,0.5);
            transform: skewX(-15deg); margin-top: 4px;
          }

          .speed-text {
            transform: skewX(15deg);
            color: #0f2b5c; font-size: 20px; font-weight: 900; font-style: italic;
          }
        </style>
      </head>
      <body>
        <div class="timer-pill">
          <div class="timer-text">${isVariantB ? '98 KOR 🇰🇷' : '12'}</div>
        </div>

        <div class="wind-widget">
          <div class="target-graphic">
            <div class="target-circle"></div>
            <div class="target-stand">
              <span class="arrow-dir" style="transform: ${isVariantB ? 'rotate(180deg)' : 'rotate(-135deg)'};">➔</span>
            </div>
          </div>
          <div class="speed-pill">
            <div class="speed-text">1.5M/S</div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ── 38. AR038 / Ranking Round Score (with Rank) ──────────────────────────
  if (combined.includes("AR038")) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,800;1,900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

          .score-container {
            position: absolute; bottom: 120px; left: 160px;
            display: flex; flex-direction: column; gap: 2px;
            width: 720px;
          }

          .top-bar {
            background: linear-gradient(135deg, #092552 0%, #16407d 60%, #081d3d 100%);
            border: 2px solid rgba(255,255,255,0.5);
            border-radius: 8px 8px 0 0;
            height: 52px; padding: 0 20px;
            display: flex; align-items: center; justify-content: space-between;
            transform: skewX(-15deg);
          }

          .top-inner { transform: skewX(15deg); display: flex; align-items: center; justify-content: space-between; width: 100%; }

          .athlete-left { display: flex; align-items: center; gap: 14px; }
          .noc-code { color: #ffffff; font-weight: 900; font-size: 24px; font-style: italic; }
          .flag-box { font-size: 26px; }
          .athlete-name { color: #ffffff; font-weight: 900; font-size: 26px; font-style: italic; letter-spacing: 0.5px; }

          .bottom-bar {
            background: linear-gradient(135deg, #061836 0%, #0a234a 100%);
            border: 1px solid rgba(255,255,255,0.3);
            border-top: none;
            height: 28px; padding: 0 20px; display: flex; align-items: center; justify-content: space-between;
            transform: skewX(-15deg); width: 340px;
          }

          .bottom-inner { transform: skewX(15deg); display: flex; align-items: center; gap: 12px; color: white; font-weight: 900; font-style: italic; font-size: 15px; letter-spacing: 1px; }
          .rank-badge { background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); color: white; padding: 1px 8px; font-weight: 900; font-size: 16px; font-style: italic; border-radius: 4px; }
        </style>
      </head>
      <body>
        <div class="score-container">
          <div class="top-bar">
            <div class="top-inner">
              <div class="athlete-left">
                <span class="noc-code">EGY</span>
                <span class="flag-box">🇪🇬</span>
                <span class="athlete-name">MAGED YOUSSEF</span>
              </div>
              <div>${olympicRingsSVG}</div>
            </div>
          </div>
          <div class="bottom-bar">
            <div class="bottom-inner">
              <span>RANKING ROUND</span>
              <span class="rank-badge">62</span>
              <span>605</span>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // Fallback default
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,800;1,900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: ${font}; }

        .lt-container {
          position: absolute; bottom: 120px; left: 160px;
          display: flex; align-items: center;
          background: linear-gradient(135deg, #092552 0%, #16407d 60%, #081d3d 100%);
          border: 2px solid rgba(255,255,255,0.5);
          border-radius: 8px;
          height: 52px; width: 720px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.6);
          transform: skewX(-15deg);
        }

        .lt-inner {
          transform: skewX(15deg);
          display: flex; align-items: center; justify-content: space-between;
          width: 100%; height: 100%; padding: 0 20px;
        }

        .athlete-left { display: flex; align-items: center; gap: 14px; }
        .noc-code { color: #ffffff; font-weight: 900; font-size: 24px; font-style: italic; }
        .flag-box { font-size: 26px; }
        .athlete-name { color: #ffffff; font-weight: 900; font-size: 26px; font-style: italic; letter-spacing: 0.5px; }
      </style>
    </head>
    <body>
      <div class="lt-container">
        <div class="lt-inner">
          <div class="athlete-left">
            <span class="noc-code">RUS</span>
            <span class="flag-box">🇷🇺</span>
            <span class="athlete-name">ANDREY ABRAMOV</span>
          </div>
          <div>${olympicRingsSVG}</div>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function generateArcheryFabric(templateId = '', templateName = '', data = {}, sport = {}, styleOptions = {}, createProps, fabric) {
  const normId = (templateId || "").toUpperCase();

  const primaryColor = styleOptions?.primaryColor || '#092552';
  const secondaryColor = styleOptions?.secondaryColor || '#16407d';

  const objects = [];

  function createRings(rightX = 780, topY = 890) {
    const circles = [];
    const rings = [
      { cx: 0, cy: 0, color: '#38bdf8' },
      { cx: 16, cy: 0, color: '#fbbf24' },
      { cx: 32, cy: 0, color: '#ffffff' },
      { cx: 8, cy: 10, color: '#4ade80' },
      { cx: 24, cy: 10, color: '#f87171' }
    ];
    rings.forEach((r) => {
      circles.push(new fabric.Circle(createProps('circle', {
        left: rightX + r.cx,
        top: topY + r.cy,
        radius: 7,
        fill: 'transparent',
        stroke: r.color,
        strokeWidth: 2
      })));
    });
    return circles;
  }

  // ── AR002 / Venue ID ─────────────────────────────────────────────────────
  if (normId.includes("AR002")) {
    const bar = new fabric.Rect(createProps('rect', {
      left: 160, top: 880, width: 680, height: 52, fill: primaryColor, rx: 6, ry: 6, skewX: -15, stroke: 'rgba(255,255,255,0.4)', strokeWidth: 1.5
    }));
    const txt = new fabric.Textbox("🎯 LORD'S CRICKET GROUND", createProps('textbox', {
      left: 180, top: 892, fontSize: 24, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 480
    }));
    const rings = createRings(770, 892);
    objects.push(bar, txt, ...rings);
  }

  // ── AR003 / Weather ───────────────────────────────────────────────────────
  else if (normId.includes("AR003") || normId.includes("WEATHER")) {
    const headBg = new fabric.Rect(createProps('rect', { left: 160, top: 560, width: 520, height: 52, fill: primaryColor, rx: 6, ry: 6, skewX: -12, stroke: 'rgba(255,255,255,0.4)', strokeWidth: 1.5 }));
    const titleTxt = new fabric.Textbox("☀️ ARCHERY", createProps('textbox', { left: 180, top: 572, fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 300 }));
    const rings = createRings(610, 572);

    const subBg = new fabric.Rect(createProps('rect', { left: 160, top: 614, width: 520, height: 28, fill: '#ffffff', rx: 3, ry: 3, skewX: -12 }));
    const subTxt = new fabric.Textbox("WEATHER", createProps('textbox', { left: 180, top: 619, fontSize: 15, fontWeight: 'bold', fontStyle: 'italic', fill: '#092552', width: 480 }));

    const weatherRows = [
      { label: "🌡️ TEMPERATURE", val: "31°C" },
      { label: "🌧️ 24 HOUR RAIN FORECAST", val: "2MM" },
      { label: "💧 HUMIDITY", val: "77%" },
      { label: "🧭 WIND DIRECTION", val: "EAST NORTH EAST" },
      { label: "💨 WIND SPEED", val: "5KM/H" }
    ];

    weatherRows.forEach((row, idx) => {
      const topOffset = 644 + (idx * 40);
      const rowBg = new fabric.Rect(createProps('rect', { left: 160, top: topOffset, width: 520, height: 38, fill: secondaryColor, rx: 3, ry: 3, skewX: -12, stroke: 'rgba(255,255,255,0.2)', strokeWidth: 1 }));
      const labelTxt = new fabric.Textbox(row.label, createProps('textbox', { left: 180, top: topOffset + 9, fontSize: 16, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 320 }));
      const valTxt = new fabric.Textbox(row.val, createProps('textbox', { left: 500, top: topOffset + 9, fontSize: 17, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 160, textAlign: 'right' }));
      objects.push(rowBg, labelTxt, valTxt);
    });

    objects.push(headBg, titleTxt, ...rings, subBg, subTxt);
  }

  // ── AR004 / Event Schedule (Variant A / Variant B) ───────────────────────
  else if (normId.includes("AR004")) {
    const isVariantB = normId.endsWith("B") || normId.includes("AR004B");

    const headBg = new fabric.Rect(createProps('rect', { left: 160, top: 620, width: 650, height: 54, fill: primaryColor, rx: 6, ry: 6, skewX: -12, stroke: 'rgba(255,255,255,0.4)', strokeWidth: 1.5 }));
    const titleTxt = new fabric.Textbox("🎯 ARCHERY", createProps('textbox', { left: 180, top: 633, fontSize: 24, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 350 }));
    const rings = createRings(720, 633);

    const subBg = new fabric.Rect(createProps('rect', { left: 160, top: 676, width: 650, height: 28, fill: '#ffffff', rx: 3, ry: 3, skewX: -12 }));
    const subTxt = new fabric.Textbox("LORD'S CRICKET GROUND", createProps('textbox', { left: 180, top: 681, fontSize: 15, fontWeight: 'bold', fontStyle: 'italic', fill: '#092552', width: 600 }));

    const rowsData = isVariantB ? [
      "MEN'S TEAM - QUARTER-FINALS",
      "MEN'S TEAM - SEMI-FINALS",
      "MEN'S TEAM - BRONZE MEDAL MATCH",
      "MEN'S TEAM - GOLD MEDAL MATCH"
    ] : [
      "MEN'S RANKING ROUND"
    ];

    rowsData.forEach((rowStr, idx) => {
      const topOffset = 706 + (idx * 40);
      const rowBg = new fabric.Rect(createProps('rect', { left: 160, top: topOffset, width: 650, height: 38, fill: secondaryColor, rx: 3, ry: 3, skewX: -12, stroke: 'rgba(255,255,255,0.2)', strokeWidth: 1 }));
      const rowTxt = new fabric.Textbox(rowStr, createProps('textbox', { left: 180, top: topOffset + 9, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 610 }));
      objects.push(rowBg, rowTxt);
    });

    objects.push(headBg, titleTxt, ...rings, subBg, subTxt);
  }

  // ── AR005 / Athlete ID (Variant A / Variant B with DSQ) ──────────────────
  else if (normId.includes("AR005")) {
    const isVariantB = normId.endsWith("B") || normId.includes("AR005B");

    const bar = new fabric.Rect(createProps('rect', { left: 160, top: 880, width: 720, height: 52, fill: primaryColor, rx: 6, ry: 6, skewX: -15, stroke: 'rgba(255,255,255,0.4)', strokeWidth: 1.5 }));
    const athTxt = new fabric.Textbox("RUS 🇷🇺 ANDREY ABRAMOV", createProps('textbox', { left: 180, top: 892, fontSize: 24, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 460 }));

    if (isVariantB) {
      const dsqBg = new fabric.Rect(createProps('rect', { left: 690, top: 891, width: 55, height: 30, fill: '#ffffff', rx: 4, ry: 4, skewX: -15 }));
      const dsqTxt = new fabric.Textbox("DSQ", createProps('textbox', { left: 690, top: 896, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', fill: '#092552', width: 55, textAlign: 'center' }));
      const rings = createRings(765, 892);
      objects.push(bar, athTxt, dsqBg, dsqTxt, ...rings);
    } else {
      const rings = createRings(770, 892);
      objects.push(bar, athTxt, ...rings);
    }
  }

  // ── AR006 / Coach ID ─────────────────────────────────────────────────────
  else if (normId.includes("AR006")) {
    const topBar = new fabric.Rect(createProps('rect', { left: 160, top: 840, width: 720, height: 52, fill: primaryColor, rx: 0, ry: 0, skewX: -15, stroke: 'rgba(255,255,255,0.4)', strokeWidth: 1.5 }));
    const nameTxt = new fabric.Textbox("ITA 🇮🇹 FILIPPO CLINI", createProps('textbox', { left: 180, top: 852, fontSize: 24, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 480 }));
    const rings = createRings(790, 852);

    const subBar = new fabric.Rect(createProps('rect', { left: 160, top: 893, width: 720, height: 28, fill: '#061836', rx: 0, ry: 0, skewX: -15, stroke: 'rgba(255,255,255,0.2)', strokeWidth: 1 }));
    const subTxt = new fabric.Textbox("COACH", createProps('textbox', { left: 180, top: 899, fontSize: 15, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 600, letterSpacing: 2 }));

    objects.push(topBar, nameTxt, ...rings, subBar, subTxt);
  }

  // ── AR007 / Arrow Speed Bug ───────────────────────────────────────────────
  else if (normId.includes("AR007")) {
    const pill = new fabric.Rect(createProps('rect', { left: 160, top: 120, width: 280, height: 46, fill: '#e2e8f0', rx: 18, ry: 18, skewX: -15, stroke: '#ffffff', strokeWidth: 2 }));
    const speedTxt = new fabric.Textbox("SPEED 125KM/H", createProps('textbox', { left: 175, top: 132, fontSize: 20, fontWeight: 'bold', fontStyle: 'italic', fill: '#0f2b5c', width: 250, textAlign: 'center' }));

    objects.push(pill, speedTxt);
  }

  // ── AR008 / Bracket to Phase (1/32 → 1/16) ──────────────────────────────
  else if (normId.includes("AR008")) {
    const cx = 550; // Centre-region anchor
    const headBg = new fabric.Rect(createProps('rect', { left: cx, top: 180, width: 820, height: 52, fill: primaryColor, rx: 6, ry: 6, skewX: -12, stroke: 'rgba(255,255,255,0.4)', strokeWidth: 1.5 }));
    const titleTxt = new fabric.Textbox("🎯 MEN'S INDIVIDUAL", createProps('textbox', { left: cx + 18, top: 192, fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 500 }));
    const rings = createRings(cx + 720, 192);

    const subBg = new fabric.Rect(createProps('rect', { left: cx, top: 234, width: 820, height: 28, fill: '#ffffff', rx: 3, ry: 3, skewX: -12 }));
    const subTxt = new fabric.Textbox("1/32 ELIMINATIONS ➔ 1/16 ELIMINATIONS", createProps('textbox', { left: cx + 18, top: 239, fontSize: 15, fontWeight: 'bold', fontStyle: 'italic', fill: '#092552', width: 780 }));

    const matchRows = [
      ["GBR 🇬🇧 SIMON TERRY", "FIN 🇫🇮 MATTI HATAVA"],
      ["FIN 🇫🇮 MATTI HATAVA", ""],
      ["AUS 🇦🇺 MATTHEW GRAY", "MAS 🇲🇾 CHU SIAN CHENG"],
      ["MAS 🇲🇾 CHU SIAN CHENG", ""]
    ];
    matchRows.forEach(([left, right], idx) => {
      const top = 264 + idx * 40;
      const rowBg = new fabric.Rect(createProps('rect', { left: cx, top, width: 820, height: 38, fill: secondaryColor, rx: 3, ry: 3, skewX: -12, stroke: 'rgba(255,255,255,0.2)', strokeWidth: 1 }));
      const leftTxt = new fabric.Textbox(left, createProps('textbox', { left: cx + 18, top: top + 9, fontSize: 17, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 380 }));
      const rightTxt = new fabric.Textbox(right, createProps('textbox', { left: cx + 420, top: top + 9, fontSize: 17, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 380 }));
      objects.push(rowBg, leftTxt, rightTxt);
    });

    objects.push(headBg, titleTxt, ...rings, subBg, subTxt);
  }

  // ── AR009 / Bracket to Gold Medal Match (Semi → Gold) ────────────────────
  else if (normId.includes("AR009")) {
    const cx = 550;
    const headBg = new fabric.Rect(createProps('rect', { left: cx, top: 220, width: 820, height: 52, fill: primaryColor, rx: 6, ry: 6, skewX: -12, stroke: 'rgba(255,255,255,0.4)', strokeWidth: 1.5 }));
    const titleTxt = new fabric.Textbox("🎯 MEN'S INDIVIDUAL", createProps('textbox', { left: cx + 18, top: 232, fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 500 }));
    const rings = createRings(cx + 720, 232);

    const subBg = new fabric.Rect(createProps('rect', { left: cx, top: 274, width: 820, height: 28, fill: '#ffffff', rx: 3, ry: 3, skewX: -12 }));
    const subTxt = new fabric.Textbox("SEMI-FINALS ➔ GOLD MEDAL MATCH", createProps('textbox', { left: cx + 18, top: 279, fontSize: 15, fontWeight: 'bold', fontStyle: 'italic', fill: '#092552', width: 780 }));

    const matchRows = [
      ["MEX 🇲🇽 JUAN RENE SERRANO", "KOR 🇰🇷 PARK KYUNG-MO"],
      ["KOR 🇰🇷 PARK KYUNG-MO", ""],
      ["UKR 🇺🇦 VIKTOR RUBAN", "UKR 🇺🇦 VIKTOR RUBAN"],
      ["RUS 🇷🇺 BAIR BADENOV", ""]
    ];
    matchRows.forEach(([left, right], idx) => {
      const top = 304 + idx * 40;
      const rowBg = new fabric.Rect(createProps('rect', { left: cx, top, width: 820, height: 38, fill: secondaryColor, rx: 3, ry: 3, skewX: -12, stroke: 'rgba(255,255,255,0.2)', strokeWidth: 1 }));
      const leftTxt = new fabric.Textbox(left, createProps('textbox', { left: cx + 18, top: top + 9, fontSize: 17, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 380 }));
      const rightTxt = new fabric.Textbox(right, createProps('textbox', { left: cx + 420, top: top + 9, fontSize: 17, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 380 }));
      objects.push(rowBg, leftTxt, rightTxt);
    });

    objects.push(headBg, titleTxt, ...rings, subBg, subTxt);
  }

  // ── AR010 / Final Rank (A=Individual 8-wide, B=Team 6-wide) ──────────────
  else if (normId.includes("AR010")) {
    const isVarB10 = normId.endsWith("B") || normId.includes("AR010B");
    const ev10 = isVarB10 ? "MEN'S TEAM" : "MEN'S INDIVIDUAL";
    const cx10 = 550;
    const top10 = isVarB10 ? 220 : 200;
    const h10 = new fabric.Rect(createProps('rect', { left: cx10, top: top10, width: 860, height: 52, fill: primaryColor, rx: 6, ry: 6, skewX: -12, stroke: 'rgba(255,255,255,0.4)', strokeWidth: 1.5 }));
    const t10 = new fabric.Textbox(`🎯 ${ev10}`, createProps('textbox', { left: cx10 + 18, top: top10 + 12, fontSize: 24, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 600 }));
    const r10 = createRings(cx10 + 760, top10 + 12);
    const sb10 = new fabric.Rect(createProps('rect', { left: cx10, top: top10 + 54, width: 860, height: 28, fill: '#ffffff', rx: 3, skewX: -12 }));
    const st10 = new fabric.Textbox("FINAL RANK", createProps('textbox', { left: cx10 + 18, top: top10 + 59, fontSize: 15, fontWeight: 'bold', fontStyle: 'italic', fill: '#092552', width: 820 }));
    objects.push(h10, t10, ...r10, sb10, st10);
    const rows10 = isVarB10 ? [
      { rank:'1', text:'KOR 🇰🇷  KOREA' },
      { rank:'2', text:'ITA 🇮🇹  ITALY' },
      { rank:'3', text:'CHN 🇨🇳  CHINA' },
      { rank:'4', text:'UKR 🇺🇦  UKRAINE' },
      { rank:'5', text:'POL 🇵🇱  POLAND' },
      { rank:'6', text:'RUS 🇷🇺  RUSSIAN FEDERATION' }
    ] : [
      { rank:'1', text:'UKR 🇺🇦  VIKTOR RUBAN' },
      { rank:'2', text:'KOR 🇰🇷  PARK KYUNG-MO' },
      { rank:'3', text:'RUS 🇷🇺  BAIR BADENOV' },
      { rank:'4', text:'MEX 🇲🇽  JUAN RENE SERRANO' },
      { rank:'5', text:'JPN 🇯🇵  RYUICHI MORIYA' },
      { rank:'5', text:'USA 🇺🇸  VICTOR WUNDERLE' },
      { rank:'5', text:'CUB 🇨🇺  JUAN CARLOS STEVENS' },
      { rank:'5', text:'MAS 🇲🇾  CHU SIAN CHENG' }
    ];
    rows10.forEach(({ rank, text }, idx) => {
      const top = top10 + 84 + idx * 44;
      const rkBg = new fabric.Rect(createProps('rect', { left: cx10, top, width: 45, height: 42, fill: '#dc2626', rx: 0 }));
      const rkTxt = new fabric.Textbox(rank, createProps('textbox', { left: cx10 + 5, top: top + 10, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 35, textAlign: 'center' }));
      const rBg = new fabric.Rect(createProps('rect', { left: cx10 + 45, top, width: 815, height: 42, fill: secondaryColor, skewX: -12 }));
      const rTxt = new fabric.Textbox(text, createProps('textbox', { left: cx10 + 58, top: top + 10, fontSize: 19, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 780 }));
      objects.push(rkBg, rkTxt, rBg, rTxt);
    });
  }

  // ── AR011 / Ceremony ID (Event name + VICTORY CEREMONY sub-bar) ──────────
  else if (normId.includes("AR011")) {
    const topBar11 = new fabric.Rect(createProps('rect', { left: 160, top: 840, width: 720, height: 52, fill: primaryColor, rx: 0, skewX: -15, stroke: 'rgba(255,255,255,0.4)', strokeWidth: 1.5 }));
    const nameTxt11 = new fabric.Textbox("🎯 MEN'S INDIVIDUAL", createProps('textbox', { left: 180, top: 852, fontSize: 24, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 480 }));
    const rings11 = createRings(790, 852);
    const sub11 = new fabric.Rect(createProps('rect', { left: 160, top: 893, width: 720, height: 28, fill: '#a8d5e5', rx: 0, skewX: -15, stroke: 'rgba(255,255,255,0.6)', strokeWidth: 1 }));
    const st11 = new fabric.Textbox("VICTORY CEREMONY", createProps('textbox', { left: 180, top: 899, fontSize: 15, fontWeight: 'bold', fontStyle: 'italic', fill: '#092552', width: 600 }));
    objects.push(topBar11, nameTxt11, ...rings11, sub11, st11);
  }

  // ── AR012 / Medal ID (athlete name + GOLD sub-bar) ───────────────────────
  else if (normId.includes("AR012")) {
    const topBar12 = new fabric.Rect(createProps('rect', { left: 160, top: 840, width: 720, height: 52, fill: primaryColor, rx: 0, skewX: -15, stroke: 'rgba(255,255,255,0.4)', strokeWidth: 1.5 }));
    const nameTxt12 = new fabric.Textbox("UKR 🇺🇦 VIKTOR RUBAN", createProps('textbox', { left: 180, top: 852, fontSize: 24, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 480 }));
    const rings12 = createRings(790, 852);
    const sub12 = new fabric.Rect(createProps('rect', { left: 160, top: 893, width: 720, height: 28, fill: '#061836', rx: 0, skewX: -15, stroke: 'rgba(255,255,255,0.2)', strokeWidth: 1 }));
    const st12 = new fabric.Textbox("🥇  GOLD - MEN'S INDIVIDUAL", createProps('textbox', { left: 180, top: 899, fontSize: 15, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 640 }));
    objects.push(topBar12, nameTxt12, ...rings12, sub12, st12);
  }

  // ── AR013 / Medals List (Victory Ceremony, left-panel, 3 medal rows) ─────
  else if (normId.includes("AR013")) {
    const h13 = new fabric.Rect(createProps('rect', { left: 160, top: 700, width: 680, height: 52, fill: primaryColor, rx: 6, ry: 6, skewX: -12, stroke: 'rgba(255,255,255,0.4)', strokeWidth: 1.5 }));
    const t13 = new fabric.Textbox("🎯 MEN'S INDIVIDUAL", createProps('textbox', { left: 180, top: 712, fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 450 }));
    const r13 = createRings(760, 712);
    const sb13 = new fabric.Rect(createProps('rect', { left: 160, top: 754, width: 680, height: 28, fill: '#a8d5e5', rx: 3, skewX: -12 }));
    const st13 = new fabric.Textbox("VICTORY CEREMONY", createProps('textbox', { left: 180, top: 759, fontSize: 15, fontWeight: 'bold', fontStyle: 'italic', fill: '#092552', width: 640 }));
    objects.push(h13, t13, ...r13, sb13, st13);
    [
      { medal:'🥇', noc:'UKR', flag:'🇺🇦', name:'VIKTOR RUBAN' },
      { medal:'🥈', noc:'KOR', flag:'🇰🇷', name:'PARK KYUNG-MO' },
      { medal:'🥉', noc:'RUS', flag:'🇷🇺', name:'BAIR BADENOV' }
    ].forEach(({ medal, noc, flag, name }, idx) => {
      const top = 784 + idx * 42;
      const rBg = new fabric.Rect(createProps('rect', { left: 160, top, width: 680, height: 40, fill: secondaryColor, rx: 3, skewX: -12 }));
      const rTxt = new fabric.Textbox(`${medal}  ${noc} ${flag}  ${name}`, createProps('textbox', { left: 178, top: top + 10, fontSize: 19, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 640 }));
      objects.push(rBg, rTxt);
    });
  }

  // ── AR014 / Medal Presenter ID (JACQUES ROGGE / IOC PRESIDENT) ───────────
  else if (normId.includes("AR014")) {
    const topBar14 = new fabric.Rect(createProps('rect', { left: 160, top: 840, width: 720, height: 52, fill: primaryColor, rx: 0, skewX: -15, stroke: 'rgba(255,255,255,0.4)', strokeWidth: 1.5 }));
    const nameTxt14 = new fabric.Textbox("JACQUES ROGGE", createProps('textbox', { left: 180, top: 852, fontSize: 25, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 460 }));
    const rings14 = createRings(790, 852);
    const sub14 = new fabric.Rect(createProps('rect', { left: 160, top: 893, width: 720, height: 28, fill: '#061836', rx: 0, skewX: -15, stroke: 'rgba(255,255,255,0.2)', strokeWidth: 1 }));
    const st14 = new fabric.Textbox("IOC PRESIDENT, BELGIUM", createProps('textbox', { left: 180, top: 899, fontSize: 15, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 640 }));
    objects.push(topBar14, nameTxt14, ...rings14, sub14, st14);
  }

  // ── AR015 / Flower Presenter ID (MR JAMES L. EASTON / HONORARY PRESIDENT) ─
  else if (normId.includes("AR015")) {
    const topBar15 = new fabric.Rect(createProps('rect', { left: 160, top: 840, width: 720, height: 52, fill: primaryColor, rx: 0, skewX: -15, stroke: 'rgba(255,255,255,0.4)', strokeWidth: 1.5 }));
    const nameTxt15 = new fabric.Textbox("MR JAMES L. EASTON", createProps('textbox', { left: 180, top: 852, fontSize: 25, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 460 }));
    const rings15 = createRings(790, 852);
    const sub15 = new fabric.Rect(createProps('rect', { left: 160, top: 893, width: 720, height: 28, fill: '#061836', rx: 0, skewX: -15, stroke: 'rgba(255,255,255,0.2)', strokeWidth: 1 }));
    const st15 = new fabric.Textbox("HONORARY PRESIDENT, FITA", createProps('textbox', { left: 180, top: 899, fontSize: 15, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 640 }));
    objects.push(topBar15, nameTxt15, ...rings15, sub15, st15);
  }

  // ── AR016 / Records (A=Individual 72 Arrows, B=Team 24 Arrows) ───────────
  else if (normId.includes("AR016")) {
    const isVarB16 = normId.includes("AR016B");
    const sub16 = isVarB16 ? "MEN'S TEAM - 24 ARROWS" : "MEN'S INDIVIDUAL - 72 ARROWS";
    const rec16 = isVarB16 ? [
      { noc:'KOR', flag:'🇰🇷', name:'KOREA',             year:'2007', badge:'WR', score:'231' },
      { noc:'KOR', flag:'🇰🇷', name:'KOREA',             year:'2008', badge:'OR', score:'224' }
    ] : [
      { noc:'KOR', flag:'🇰🇷', name:'IM DONG-HYUN',     year:'2004', badge:'WR', score:'687' },
      { noc:'ITA', flag:'🇮🇹', name:'MICHELE FRANGILLI', year:'1996', badge:'OR', score:'684' }
    ];
    const h16 = new fabric.Rect(createProps('rect', { left: 160, top: 700, width: 720, height: 52, fill: primaryColor, rx: 6, skewX: -12, stroke: 'rgba(255,255,255,0.4)', strokeWidth: 1.5 }));
    const t16 = new fabric.Textbox("🎯 ARCHERY", createProps('textbox', { left: 180, top: 712, fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 450 }));
    const r16 = createRings(770, 712);
    const sb16 = new fabric.Rect(createProps('rect', { left: 160, top: 754, width: 720, height: 28, fill: '#a8d5e5', rx: 3, skewX: -12 }));
    const st16 = new fabric.Textbox(sub16, createProps('textbox', { left: 180, top: 759, fontSize: 15, fontWeight: 'bold', fontStyle: 'italic', fill: '#092552', width: 680 }));
    objects.push(h16, t16, ...r16, sb16, st16);
    rec16.forEach(({ noc, flag, name, year, badge, score }, idx) => {
      const top = 784 + idx * 42;
      const rBg = new fabric.Rect(createProps('rect', { left: 160, top, width: 720, height: 40, fill: secondaryColor, rx: 3, skewX: -12 }));
      const lT = new fabric.Textbox(`${noc} ${flag}  ${name}`, createProps('textbox', { left: 178, top: top + 10, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 380 }));
      const bBg = new fabric.Rect(createProps('rect', { left: 710, top: top + 8, width: 36, height: 24, fill: badge === 'WR' ? '#eab308' : '#94a3b8', rx: 4 }));
      const bTxt = new fabric.Textbox(badge, createProps('textbox', { left: 712, top: top + 11, fontSize: 13, fontWeight: 'bold', fill: '#092552', width: 32, textAlign: 'center' }));
      const rT2 = new fabric.Textbox(`${year}   ${score}`, createProps('textbox', { left: 750, top: top + 10, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 120, textAlign: 'right' }));
      objects.push(rBg, lT, bBg, bTxt, rT2);
    });
  }

  // ── AR017 / Ranking Round Score (rank badge + WR sub-bar) ────────────────
  else if (normId.includes("AR017")) {
    const bar17 = new fabric.Rect(createProps('rect', { left: 160, top: 840, width: 720, height: 52, fill: primaryColor, rx: 0, skewX: -15, stroke: 'rgba(255,255,255,0.4)', strokeWidth: 1.5 }));
    const rkBg17 = new fabric.Rect(createProps('rect', { left: 162, top: 843, width: 44, height: 46, fill: '#dc2626', rx: 0 }));
    const rkTxt17 = new fabric.Textbox("1", createProps('textbox', { left: 166, top: 852, fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 36, textAlign: 'center' }));
    const ath17 = new fabric.Textbox("MEX 🇲🇽  JUAN RENE SERRANO", createProps('textbox', { left: 215, top: 852, fontSize: 24, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 440 }));
    const rng17 = createRings(790, 852);
    const sub17 = new fabric.Rect(createProps('rect', { left: 160, top: 893, width: 720, height: 28, fill: '#061836', rx: 0, skewX: -15, stroke: 'rgba(255,255,255,0.2)', strokeWidth: 1 }));
    const wrBg17 = new fabric.Rect(createProps('rect', { left: 543, top: 897, width: 32, height: 20, fill: '#eab308', rx: 3 }));
    const wrT17 = new fabric.Textbox("WR", createProps('textbox', { left: 544, top: 899, fontSize: 12, fontWeight: 'bold', fill: '#092552', width: 30, textAlign: 'center' }));
    const st17 = new fabric.Textbox("RANKING ROUND  688", createProps('textbox', { left: 180, top: 899, fontSize: 15, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 360 }));
    objects.push(bar17, rkBg17, rkTxt17, ath17, ...rng17, sub17, st17, wrBg17, wrT17);
  }

  // ── AR018 / Standings (10-row centred board with red rank badges + WR) ───
  else if (normId.includes("AR018")) {
    const cx18 = 530;
    const hBg18 = new fabric.Rect(createProps('rect', { left: cx18, top: 160, width: 880, height: 48, fill: primaryColor, rx: 6, skewX: -12, stroke: 'rgba(255,255,255,0.4)', strokeWidth: 1.5 }));
    const hTxt18 = new fabric.Textbox("🎯 MEN'S INDIVIDUAL", createProps('textbox', { left: cx18 + 18, top: 172, fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 600 }));
    const rng18 = createRings(cx18 + 780, 172);
    const sBg18 = new fabric.Rect(createProps('rect', { left: cx18, top: 210, width: 880, height: 28, fill: '#a8d5e5', rx: 3, skewX: -12 }));
    const sT18 = new fabric.Textbox("RANKING ROUND STANDINGS", createProps('textbox', { left: cx18 + 18, top: 215, fontSize: 15, fontWeight: 'bold', fontStyle: 'italic', fill: '#092552', width: 840 }));
    objects.push(hBg18, hTxt18, ...rng18, sBg18, sT18);
    [
      { rank:'1',  noc:'MEX', flag:'🇲🇽', name:'JUAN RENE SERRANO',       wr:true,  score:'688' },
      { rank:'2',  noc:'IND', flag:'🇮🇳', name:'MANGAL SINGH CHAMPIA',    wr:false, score:'678' },
      { rank:'3',  noc:'UKR', flag:'🇺🇦', name:'VIKTOR RUBAN',            wr:false, score:'678' },
      { rank:'4',  noc:'KOR', flag:'🇰🇷', name:'PARK KYUNG-MO',           wr:false, score:'676' },
      { rank:'5',  noc:'MAS', flag:'🇲🇾', name:'WAN KHALMIZAM',           wr:false, score:'674' },
      { rank:'6',  noc:'RUS', flag:'🇷🇺', name:'BALJINIMA TSYREMPILOV',  wr:false, score:'671' },
      { rank:'7',  noc:'GBR', flag:'🇬🇧', name:'SIMON TERRY',             wr:false, score:'670' },
      { rank:'8',  noc:'KOR', flag:'🇰🇷', name:'IM DONG-HYUN',            wr:false, score:'670' },
      { rank:'9',  noc:'CHN', flag:'🇨🇳', name:'JIANG LIN',               wr:false, score:'670' },
      { rank:'10', noc:'KOR', flag:'🇰🇷', name:'LEE CHANG-HWAN',          wr:false, score:'669' }
    ].forEach(({ rank, noc, flag, name, wr, score }, idx) => {
      const top = 240 + idx * 38;
      const rBg = new fabric.Rect(createProps('rect', { left: cx18, top, width: 40, height: 38, fill: '#dc2626' }));
      const rTxt = new fabric.Textbox(rank, createProps('textbox', { left: cx18 + 2, top: top + 9, fontSize: 17, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 36, textAlign: 'center' }));
      const rowBg = new fabric.Rect(createProps('rect', { left: cx18 + 40, top, width: 840, height: 38, fill: secondaryColor, skewX: -12 }));
      const lT = new fabric.Textbox(`${noc} ${flag}  ${name}`, createProps('textbox', { left: cx18 + 54, top: top + 10, fontSize: 17, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 600 }));
      const sT = new fabric.Textbox(score, createProps('textbox', { left: cx18 + 780, top: top + 10, fontSize: 17, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 80, textAlign: 'right' }));
      objects.push(rBg, rTxt, rowBg, lT, sT);
      if (wr) {
        const wBg = new fabric.Rect(createProps('rect', { left: cx18 + 740, top: top + 9, width: 28, height: 20, fill: '#eab308', rx: 3 }));
        const wT = new fabric.Textbox('WR', createProps('textbox', { left: cx18 + 741, top: top + 11, fontSize: 12, fontWeight: 'bold', fill: '#092552', width: 26, textAlign: 'center' }));
        objects.push(wBg, wT);
      }
    });
  }

  // ── AR022 / Set Scoreboard ───────────────────────────────────────────────
  else if (normId.includes("AR022")) {
    const headBg = new fabric.Rect(createProps('rect', { left: 160, top: 740, width: 760, height: 52, fill: primaryColor, rx: 6, ry: 6, skewX: -15, stroke: 'rgba(255,255,255,0.4)', strokeWidth: 1.5 }));
    const titleTxt = new fabric.Textbox("🏹 MEN'S INDIVIDUAL - GOLD MEDAL MATCH", createProps('textbox', { left: 180, top: 752, fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 560 }));
    const rings = createRings(850, 752);

    const r1Bg = new fabric.Rect(createProps('rect', { left: 160, top: 796, width: 760, height: 42, fill: secondaryColor, rx: 3, ry: 3, skewX: -15 }));
    const r1Txt = new fabric.Textbox("KOR 🇰🇷 OH JIN-HYEK                      7 (29, 29, 29, 28)", createProps('textbox', { left: 180, top: 806, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 720 }));

    const r2Bg = new fabric.Rect(createProps('rect', { left: 160, top: 840, width: 760, height: 42, fill: secondaryColor, rx: 3, ry: 3, skewX: -15 }));
    const r2Txt = new fabric.Textbox("JPN 🇯🇵 TAKAHARU FURUKAWA               1 (26, 28, 29, 25)", createProps('textbox', { left: 180, top: 850, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 720 }));

    objects.push(headBg, titleTxt, ...rings, r1Bg, r1Txt, r2Bg, r2Txt);
  }

  // ── AR025 / Shoot-Off Scoreboard (Individual) ────────────────────────────
  else if (normId.includes("AR025")) {
    const isVariantB = normId.endsWith("B") || normId.includes("AR025B");
    const subTitle = isVariantB ? "SHOOT-OFF - 1/16 ELIMINATION" : "SHOOT-OFF - BRONZE MEDAL MATCH";
    const archer1 = isVariantB ? "UKR 🇺🇦 VIKTOR RUBAN                   10" : "MEX 🇲🇽 JUAN RENE SERRANO              10";
    const archer2 = isVariantB ? "AUS 🇦🇺 MICHAEL NARAY                 10*" : "RUS 🇷🇺 BAIR BADENOV                      9";

    const headBg = new fabric.Rect(createProps('rect', { left: 160, top: 740, width: 720, height: 52, fill: primaryColor, rx: 6, ry: 6, skewX: -15, stroke: 'rgba(255,255,255,0.4)', strokeWidth: 1.5 }));
    const titleTxt = new fabric.Textbox("🏹 MEN'S INDIVIDUAL", createProps('textbox', { left: 180, top: 752, fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 520 }));
    const rings = createRings(810, 752);

    const subBg = new fabric.Rect(createProps('rect', { left: 160, top: 794, width: 720, height: 32, fill: '#ffffff', rx: 3, ry: 3, skewX: -15 }));
    const subTxt = new fabric.Textbox(subTitle, createProps('textbox', { left: 180, top: 800, fontSize: 15, fontWeight: 'bold', fontStyle: 'italic', fill: '#092552', width: 680 }));

    const r1Bg = new fabric.Rect(createProps('rect', { left: 160, top: 828, width: 720, height: 40, fill: secondaryColor, rx: 3, ry: 3, skewX: -15 }));
    const r1Txt = new fabric.Textbox(archer1, createProps('textbox', { left: 180, top: 838, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 680 }));

    const r2Bg = new fabric.Rect(createProps('rect', { left: 160, top: 870, width: 720, height: 40, fill: secondaryColor, rx: 3, ry: 3, skewX: -15 }));
    const r2Txt = new fabric.Textbox(archer2, createProps('textbox', { left: 180, top: 880, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 680 }));

    objects.push(headBg, titleTxt, ...rings, subBg, subTxt, r1Bg, r1Txt, r2Bg, r2Txt);
  }

  // ── AR026 / Winner ID ────────────────────────────────────────────────────
  else if (normId.includes("AR026")) {
    const bar = new fabric.Rect(createProps('rect', { left: 160, top: 880, width: 720, height: 52, fill: primaryColor, rx: 6, ry: 6, skewX: -15, stroke: 'rgba(255,255,255,0.4)', strokeWidth: 1.5 }));
    const athTxt = new fabric.Textbox("MATCH WINNER   KOR 🇰🇷 OH JIN-HYEK", createProps('textbox', { left: 180, top: 892, fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 560 }));
    const rings = createRings(810, 892);

    objects.push(bar, athTxt, ...rings);
  }

  // ── AR031 / Team Scoreboard ──────────────────────────────────────────────
  else if (normId.includes("AR031")) {
    const isVariantB = normId.endsWith("B") || normId.includes("AR031B");
    const subTitle = isVariantB ? "GOLD MEDAL MATCH" : "BRONZE MEDAL MATCH";
    const team1 = isVariantB ? "KOR 🇰🇷 KOREA (OR)                         225" : "CHN 🇨🇳 CHINA                                85";
    const team2 = isVariantB ? "ITA 🇮🇹 ITALY                               218" : "UKR 🇺🇦 UKRAINE                              83";

    const headBg = new fabric.Rect(createProps('rect', { left: 160, top: 740, width: 720, height: 52, fill: primaryColor, rx: 6, ry: 6, skewX: -15, stroke: 'rgba(255,255,255,0.4)', strokeWidth: 1.5 }));
    const titleTxt = new fabric.Textbox("🏹 MEN'S TEAM", createProps('textbox', { left: 180, top: 752, fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 520 }));
    const rings = createRings(810, 752);

    const subBg = new fabric.Rect(createProps('rect', { left: 160, top: 794, width: 720, height: 32, fill: '#ffffff', rx: 3, ry: 3, skewX: -15 }));
    const subTxt = new fabric.Textbox(subTitle, createProps('textbox', { left: 180, top: 800, fontSize: 15, fontWeight: 'bold', fontStyle: 'italic', fill: '#092552', width: 680 }));

    const r1Bg = new fabric.Rect(createProps('rect', { left: 160, top: 828, width: 720, height: 40, fill: secondaryColor, rx: 3, ry: 3, skewX: -15 }));
    const r1Txt = new fabric.Textbox(team1, createProps('textbox', { left: 180, top: 838, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 680 }));

    const r2Bg = new fabric.Rect(createProps('rect', { left: 160, top: 870, width: 720, height: 40, fill: secondaryColor, rx: 3, ry: 3, skewX: -15 }));
    const r2Txt = new fabric.Textbox(team2, createProps('textbox', { left: 180, top: 880, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 680 }));

    objects.push(headBg, titleTxt, ...rings, subBg, subTxt, r1Bg, r1Txt, r2Bg, r2Txt);
  }

  // ── AR033 / Team Winner ID ───────────────────────────────────────────────
  else if (normId.includes("AR033")) {
    const bar = new fabric.Rect(createProps('rect', { left: 160, top: 880, width: 680, height: 52, fill: primaryColor, rx: 6, ry: 6, skewX: -15, stroke: 'rgba(255,255,255,0.4)', strokeWidth: 1.5 }));
    const athTxt = new fabric.Textbox("MATCH WINNER   ITA 🇮🇹 ITALY   219", createProps('textbox', { left: 180, top: 892, fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 520 }));
    const rings = createRings(770, 892);

    objects.push(bar, athTxt, ...rings);
  }

  // ── AR034 / Clocks (with NOC) ────────────────────────────────────────────
  else if (normId.includes("AR034")) {
    const isVariantB = normId.endsWith("B") || normId.includes("AR034B");
    const valStr = isVariantB ? "98" : "102";
    const nocStr = isVariantB ? "KOR 🇰🇷" : "FRA 🇫🇷";

    const pillBg = new fabric.Rect(createProps('rect', { left: 240, top: 880, width: 220, height: 48, fill: '#ffffff', rx: 18, ry: 18, skewX: -15, stroke: '#0f2b5c', strokeWidth: 2 }));
    const valTxt = new fabric.Textbox(valStr, createProps('textbox', { left: 255, top: 890, fontSize: 24, fontWeight: 'bold', fontStyle: 'italic', fill: '#0f2b5c', width: 60 }));
    const badgeBg = new fabric.Rect(createProps('rect', { left: 320, top: 880, width: 140, height: 48, fill: primaryColor, rx: 18, ry: 18, skewX: -15 }));
    const nocTxt = new fabric.Textbox(nocStr, createProps('textbox', { left: 335, top: 890, fontSize: 20, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 110, textAlign: 'center' }));

    objects.push(pillBg, valTxt, badgeBg, nocTxt);
  }

  // ── AR035 / Shoot-Off Scoreboard (Team) ──────────────────────────────────
  else if (normId.includes("AR035")) {
    const isVariantB = normId.endsWith("B") || normId.includes("AR035B");
    const subTitle = isVariantB ? "SHOOT-OFF - GOLD MEDAL MATCH" : "SHOOT-OFF - BRONZE MEDAL MATCH";
    const team1 = isVariantB ? "KOR 🇰🇷 KOREA                        9    8   10    27" : "CHN 🇨🇳 CHINA                        9    8   10    27";
    const team2 = isVariantB ? "ITA 🇮🇹 ITALY                        9    8   10    27*" : "UKR 🇺🇦 UKRAINE                      9    8    9    26";

    const headBg = new fabric.Rect(createProps('rect', { left: 160, top: 740, width: 720, height: 52, fill: primaryColor, rx: 6, ry: 6, skewX: -15, stroke: 'rgba(255,255,255,0.4)', strokeWidth: 1.5 }));
    const titleTxt = new fabric.Textbox("🏹 MEN'S TEAM", createProps('textbox', { left: 180, top: 752, fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 520 }));
    const rings = createRings(810, 752);

    const subBg = new fabric.Rect(createProps('rect', { left: 160, top: 794, width: 720, height: 32, fill: '#ffffff', rx: 3, ry: 3, skewX: -15 }));
    const subTxt = new fabric.Textbox(subTitle, createProps('textbox', { left: 180, top: 800, fontSize: 15, fontWeight: 'bold', fontStyle: 'italic', fill: '#092552', width: 680 }));

    const r1Bg = new fabric.Rect(createProps('rect', { left: 160, top: 828, width: 720, height: 40, fill: secondaryColor, rx: 3, ry: 3, skewX: -15 }));
    const r1Txt = new fabric.Textbox(team1, createProps('textbox', { left: 180, top: 838, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 680 }));

    const r2Bg = new fabric.Rect(createProps('rect', { left: 160, top: 870, width: 720, height: 40, fill: secondaryColor, rx: 3, ry: 3, skewX: -15 }));
    const r2Txt = new fabric.Textbox(team2, createProps('textbox', { left: 180, top: 880, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 680 }));

    objects.push(headBg, titleTxt, ...rings, subBg, subTxt, r1Bg, r1Txt, r2Bg, r2Txt);
  }

  // ── AR036 / Team ID ──────────────────────────────────────────────────────
  else if (normId.includes("AR036")) {
    const isVariantB = normId.endsWith("B") || normId.includes("AR036B");
    const textStr = isVariantB ? "GER 🇩🇪 GERMANY  (DSQ)" : "GER 🇩🇪 GERMANY";

    const bar = new fabric.Rect(createProps('rect', { left: 160, top: 880, width: 680, height: 52, fill: primaryColor, rx: 6, ry: 6, skewX: -15, stroke: 'rgba(255,255,255,0.4)', strokeWidth: 1.5 }));
    const athTxt = new fabric.Textbox(textStr, createProps('textbox', { left: 180, top: 892, fontSize: 24, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 520 }));
    const rings = createRings(770, 892);

    objects.push(bar, athTxt, ...rings);
  }

  // ── AR037 / Wind Indicator ───────────────────────────────────────────────
  else if (normId.includes("AR037")) {
    const isVariantB = normId.endsWith("B") || normId.includes("AR037B");
    const timerStr = isVariantB ? "98 KOR 🇰🇷" : "12";

    const pillBg = new fabric.Rect(createProps('rect', { left: 240, top: 880, width: 160, height: 48, fill: '#ffffff', rx: 18, ry: 18, skewX: -15, stroke: '#0f2b5c', strokeWidth: 2 }));
    const valTxt = new fabric.Textbox(timerStr, createProps('textbox', { left: 255, top: 892, fontSize: 20, fontWeight: 'bold', fontStyle: 'italic', fill: '#0f2b5c', width: 130, textAlign: 'center' }));

    const targetBg = new fabric.Circle(createProps('circle', { left: 1540, top: 820, radius: 35, fill: '#ef4444', stroke: '#ffffff', strokeWidth: 3 }));
    const centerYellow = new fabric.Circle(createProps('circle', { left: 1557, top: 837, radius: 18, fill: '#facc15' }));
    const speedPill = new fabric.Rect(createProps('rect', { left: 1515, top: 895, width: 120, height: 32, fill: '#ffffff', rx: 12, ry: 12, skewX: -15, stroke: '#0f2b5c', strokeWidth: 2 }));
    const speedTxt = new fabric.Textbox("1.5M/S", createProps('textbox', { left: 1515, top: 900, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', fill: '#0f2b5c', width: 120, textAlign: 'center' }));

    objects.push(pillBg, valTxt, targetBg, centerYellow, speedPill, speedTxt);
  }

  // ── AR038 / Ranking Round Score (with Rank) ──────────────────────────────
  else if (normId.includes("AR038")) {
    const bar = new fabric.Rect(createProps('rect', { left: 160, top: 880, width: 740, height: 52, fill: primaryColor, rx: 6, ry: 6, skewX: -15, stroke: 'rgba(255,255,255,0.4)', strokeWidth: 1.5 }));
    const athTxt = new fabric.Textbox("RANK 1   KOR 🇰🇷 IM DONG-HYUN   SCORE: 699 (WR)", createProps('textbox', { left: 180, top: 892, fontSize: 20, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 580 }));
    const rings = createRings(830, 892);

    objects.push(bar, athTxt, ...rings);
  }

  // Default fallback for any remaining AR templates
  else {
    const bar = new fabric.Rect(createProps('rect', { left: 160, top: 880, width: 680, height: 52, fill: primaryColor, rx: 6, ry: 6, skewX: -15, stroke: 'rgba(255,255,255,0.4)', strokeWidth: 1.5 }));
    const titleTxt = new fabric.Textbox(`🎯 ${normId} ${templateName || "ARCHERY GRAPHIC"}`, createProps('textbox', { left: 180, top: 892, fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 500 }));
    const rings = createRings(770, 892);

    objects.push(bar, titleTxt, ...rings);
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

