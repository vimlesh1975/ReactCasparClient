/**
 * London 2012 Archery (AR) Broadcast Graphic Templates
 * Exact text, layout, and styling from reference images AR002 through AR038.
 */

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
