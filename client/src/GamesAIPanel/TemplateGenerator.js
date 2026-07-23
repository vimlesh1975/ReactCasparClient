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

export function resolveCategory(templateType, templateName = '', templateId = '') {
  const normType = (templateType || "").toLowerCase();
  const normName = (templateName || "").toLowerCase();
  const normId = (templateId || "").toLowerCase();
  const combined = `${normType} ${normName} ${normId}`;

  // ── Hockey (HO) templates → reuse Football (FB) graphic categories ──
  if (combined.includes("ho035") || (combined.includes("hockey") && combined.includes("flower") && combined.includes("presenter"))) return "football-flower-presenter";
  if (combined.includes("ho034") || (combined.includes("hockey") && combined.includes("medal") && combined.includes("presenter"))) return "football-medal-presenter";
  if (combined.includes("ho033") || (combined.includes("hockey") && combined.includes("medals") && combined.includes("list"))) return "football-medals-list";
  if (combined.includes("ho032") || (combined.includes("hockey") && combined.includes("medal") && combined.includes("id"))) return "football-medal-id";
  if (combined.includes("ho031") || (combined.includes("hockey") && combined.includes("ceremony") && combined.includes("id"))) return "football-ceremony-id";
  if (combined.includes("ho030") || (combined.includes("hockey") && combined.includes("final") && combined.includes("rank"))) return "football-final-rank";
  if (combined.includes("ho029") || (combined.includes("hockey") && combined.includes("bracket") && combined.includes("gold"))) return "football-bracket-finals";
  if (combined.includes("ho028") || (combined.includes("hockey") && combined.includes("advance") && combined.includes("semi"))) return "football-advance-quarterfinals";
  if (combined.includes("ho027") || (combined.includes("hockey") && combined.includes("shoot-out") && combined.includes("crunch"))) return "football-pso-crunch";
  if (combined.includes("ho026") || (combined.includes("hockey") && combined.includes("shoot-out") && combined.includes("scoreboard"))) return "football-pso-scoreboard";
  if (combined.includes("ho025") || (combined.includes("hockey") && combined.includes("goal") && combined.includes("summary"))) return "football-goal-summary";
  if (combined.includes("ho024") || (combined.includes("hockey") && combined.includes("scoreboard"))) return "football-match-result";
  if (combined.includes("ho023") || (combined.includes("hockey") && combined.includes("match") && combined.includes("statistics"))) return "football-match-statistics";
  if (combined.includes("ho022") || (combined.includes("hockey") && combined.includes("crunch") && combined.includes("stat"))) return "football-crunch-stats";
  if (combined.includes("ho021") || (combined.includes("hockey") && combined.includes("tournament") && combined.includes("player") && combined.includes("stat"))) return "football-tournament-player-stats";
  if (combined.includes("ho020") || (combined.includes("hockey") && combined.includes("match") && combined.includes("player") && combined.includes("stat"))) return "football-player-stats";
  if (combined.includes("ho036") || (combined.includes("hockey") && combined.includes("crunch") && combined.includes("scoreboard"))) return "football-crunch-scoreboard";
  if (combined.includes("ho015") || (combined.includes("hockey") && combined.includes("coach") && combined.includes("id"))) return "football-coach-id";
  if (combined.includes("ho014") || (combined.includes("hockey") && combined.includes("captain") && combined.includes("id")) || (combined.includes("hockey") && combined.includes("goalkeeper") && combined.includes("id"))) return "football-captain-id";
  if (combined.includes("ho013") || (combined.includes("hockey") && combined.includes("player") && combined.includes("id"))) return "football-player-id";
  if (combined.includes("ho017") || (combined.includes("hockey") && combined.includes("umpires") && combined.includes("list"))) return "football-officials-list";
  if (combined.includes("ho016") || (combined.includes("hockey") && combined.includes("umpire") && combined.includes("id"))) return "football-official-id";
  if (combined.includes("ho012") || (combined.includes("hockey") && combined.includes("previous") && combined.includes("results"))) return "football-previous-results";
  if (combined.includes("ho011") || (combined.includes("hockey") && combined.includes("substitutes") && combined.includes("list"))) return "football-substitutes-list";
  if (combined.includes("ho010") || (combined.includes("hockey") && combined.includes("starting") && combined.includes("lineup"))) return "football-starting-lineup";
  if (combined.includes("ho009") || (combined.includes("hockey") && combined.includes("team") && combined.includes("id"))) return "team-id-single";
  if (combined.includes("ho008") || (combined.includes("hockey") && combined.includes("standings"))) return "football-group-standings";
  if (combined.includes("ho007") || (combined.includes("hockey") && combined.includes("pool") && combined.includes("list"))) return "group-list-teams";
  if (combined.includes("ho006") || (combined.includes("hockey") && combined.includes("match") && combined.includes("id"))) return "match-id-teams";
  if (combined.includes("fb037") || (combined.includes("football") && combined.includes("flower") && combined.includes("presenter"))) return "football-flower-presenter";
  if (combined.includes("fb036") || (combined.includes("football") && combined.includes("medal") && combined.includes("presenter"))) return "football-medal-presenter";
  if (combined.includes("fb035") || (combined.includes("football") && combined.includes("medals") && combined.includes("list"))) return "football-medals-list";
  if (combined.includes("fb034") || (combined.includes("football") && combined.includes("medal") && combined.includes("id"))) return "football-medal-id";
  if (combined.includes("fb033") || (combined.includes("football") && combined.includes("ceremony") && combined.includes("id"))) return "football-ceremony-id";
  if (combined.includes("fb032") || (combined.includes("football") && combined.includes("final") && combined.includes("rank"))) return "football-final-rank";
  if (combined.includes("fb031") || (combined.includes("football") && combined.includes("bracket") && combined.includes("gold"))) return "football-bracket-finals";
  if (combined.includes("fb030") || (combined.includes("football") && combined.includes("bracket") && combined.includes("semi"))) return "football-bracket-semifinals";
  if (combined.includes("fb028") || (combined.includes("football") && combined.includes("shoot-out") && combined.includes("crunch"))) return "football-pso-crunch";
  if (combined.includes("fb026") || (combined.includes("football") && combined.includes("additional") && combined.includes("time"))) return "football-additional-time";
  if (combined.includes("fb029") || (combined.includes("football") && combined.includes("advance") && combined.includes("quarter-finals"))) return "football-advance-quarterfinals";
  if (combined.includes("fb027") || (combined.includes("football") && combined.includes("penalty") && combined.includes("shoot-out"))) return "football-pso-scoreboard";
  if (combined.includes("fb025") || (combined.includes("football") && combined.includes("goal") && combined.includes("summary"))) return "football-goal-summary";
  if (combined.includes("fb024") || (combined.includes("football") && (combined.includes("result") || combined.includes("pso")))) return "football-match-result";
  if (combined.includes("fb023") || (combined.includes("football") && combined.includes("match") && combined.includes("statistics"))) return "football-match-statistics";
  if (combined.includes("fb022") || (combined.includes("football") && combined.includes("crunch") && combined.includes("stat"))) return "football-crunch-stats";
  if (combined.includes("fb016") || (combined.includes("football") && combined.includes("coach") && combined.includes("id"))) return "football-coach-id";
  if (combined.includes("fb015") || (combined.includes("football") && combined.includes("captain") && combined.includes("id")) || (combined.includes("football") && combined.includes("goalkeeper") && combined.includes("id"))) return "football-captain-id";
  if (combined.includes("fb019") || (combined.includes("football") && combined.includes("substitution") && combined.includes("id"))) return "football-substitution-single";
  if (combined.includes("fb018") || (combined.includes("football") && combined.includes("substitution"))) return "football-substitution-event";
  if (combined.includes("fb021") || (combined.includes("football") && combined.includes("tournament") && combined.includes("player") && combined.includes("stat"))) return "football-tournament-player-stats";
  if (combined.includes("fb020") || (combined.includes("football") && combined.includes("match") && combined.includes("player") && combined.includes("stat"))) return "football-player-stats";
  if (combined.includes("fb017") || (combined.includes("football") && (combined.includes("crunch") || combined.includes("scoreboard")))) return "football-crunch-scoreboard";
  if (combined.includes("fb014") || (combined.includes("football") && combined.includes("player") && combined.includes("id"))) return "football-player-id";
  if (combined.includes("fb013") || (combined.includes("football") && combined.includes("officials") && combined.includes("list"))) return "football-officials-list";
  if (combined.includes("fb012") || (combined.includes("football") && combined.includes("official") && combined.includes("id"))) return "football-official-id";
  if (combined.includes("fb011") || (combined.includes("football") && combined.includes("previous") && combined.includes("results"))) return "football-previous-results";
  if (combined.includes("fb010") || (combined.includes("football") && combined.includes("substitutes") && combined.includes("list"))) return "football-substitutes-list";
  if (combined.includes("fb009") || (combined.includes("football") && combined.includes("starting") && combined.includes("lineup"))) return "football-starting-lineup";
  if (combined.includes("fb008") || (combined.includes("football") && (combined.includes("team id") || combined.includes("team-id")))) return "team-id-single";
  if (combined.includes("fb007") || (combined.includes("football") && (combined.includes("standings") || combined.includes("group standings")))) return "football-group-standings";
  if (combined.includes("fb006") || (combined.includes("football") && (combined.includes("group list") || combined.includes("group-list")))) return "group-list-teams";
  if (combined.includes("fb005") || (combined.includes("football") && (combined.includes("match id") || combined.includes("match-id")))) return "match-id-teams";
  if (combined.includes("sw024") || (combined.includes("clock") && combined.includes("at finish"))) return "clock-at-finish";
  if (combined.includes("sw023") || (combined.includes("clock") && combined.includes("before finish"))) return "clock-before-finish";
  if (combined.includes("sw022") || (combined.includes("clock") && combined.includes("at split"))) return "clock-at-split";
  if (combined.includes("sw021") || (combined.includes("clock") && combined.includes("before split"))) return "clock-before-split";
  if (combined.includes("clock") || combined.includes("timer") || combined.includes("sw020")) return "race-clock";
  if (combined.includes("presenter") || combined.includes("sw018") || combined.includes("sw019")) return "medal-presenter";
  if (combined.includes("non-competition") || combined.includes("area") || combined.includes("warm up") || combined.includes("warm-up")) return "non-comp-area";
  if (combined.includes("ceremony id") || combined.includes("ceremony") || combined.includes("sw015")) return "ceremony-id";
  if (combined.includes("medal id") || combined.includes("medal-id") || combined.includes("sw016")) return "medal-id-single";
  if (combined.includes("lane indicator") || combined.includes("lane-indicator") || combined.includes("sw009")) return "lane-indicator";
  if (combined.includes("winner") || combined.includes("place id") || combined.includes("sw011")) return "winner-place-id";
  if (combined.includes("advance") || combined.includes("sw013")) return "advance-all-to-phase";
  if (combined.includes("result") || combined.includes("sw012")) return "event-results-full";
  if (combined.includes("team list") || combined.includes("sw007") || (combined.includes("team") && combined.includes("lane"))) return "team-list-by-lane";
  if (combined.includes("lane id") || combined.includes("lane-id") || combined.includes("sw006") || (combined.includes("lane") && !combined.includes("team"))) return "lane-id";
  if (combined.includes("records") || combined.includes("sw008")) return "event-records";
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

  const category = resolveCategory(templateType, templateName, templateId);

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
    case "event-schedule": {
      const scheduleEntries = [
        { time: "09:00", name: "Opening Warm-Up & Practice Session", status: "COMPLETED", class: "status-done" },
        { time: "09:30", name: data.event || "Preliminary Round / Heats", status: "COMPLETED", class: "status-done" },
        { time: "10:45", name: "Quarter-Finals Phase 1", status: "COMPLETED", class: "status-done" },
        { time: "11:30", name: "Quarter-Finals Phase 2", status: "COMPLETED", class: "status-done" },
        { time: "14:00", name: "Semi-Finals Heat 1", status: "LIVE", class: "status-live" },
        { time: "14:45", name: "Semi-Finals Heat 2", status: "UPCOMING", class: "status-next" },
        { time: "16:30", name: "Gold Medal Final Match", status: "UPCOMING", class: "status-next" },
        { time: "17:15", name: "Victory Ceremony & Medal Presentation", status: "UPCOMING", class: "status-next" }
      ];

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
              position: absolute; top: 100px; left: 90px; width: 780px;
              background: rgba(15,23,42,0.96); border-radius: 12px; overflow: hidden;
              border: 1px solid rgba(255,255,255,0.18); color: white;
              box-shadow: 0 15px 40px rgba(0,0,0,0.6);
            }
            .sched-head {
              background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor});
              padding: 14px 24px; font-size: 22px; font-weight: 900;
              border-bottom: 4px solid ${accentColor}; display: flex; justify-content: space-between; align-items: center;
            }
            .sched-body { padding: 6px 0; }
            .sched-row {
              display: flex; align-items: center; justify-content: space-between;
              padding: 10px 24px; border-bottom: 1px solid rgba(255,255,255,0.06); font-size: 15px; font-weight: 700;
            }
            .sched-row:nth-child(even) { background: rgba(255,255,255,0.02); }
            .sched-row:last-child { border-bottom: none; }
            .sched-time { color: ${accentColor}; font-weight: 900; width: 75px; }
            .sched-name { flex: 1; margin: 0 16px; color: #ffffff; }
            .sched-badge {
              font-size: 11px; font-weight: 800; padding: 3px 10px; border-radius: 20px;
              text-transform: uppercase; letter-spacing: 0.5px;
            }
            .status-done { background: rgba(34,197,94,0.2); color: #4ade80; border: 1px solid rgba(74,222,128,0.4); }
            .status-live { background: rgba(56,189,248,0.25); color: #38bdf8; border: 1px solid rgba(56,189,248,0.5); }
            .status-next { background: rgba(250,204,21,0.2); color: #facc15; border: 1px solid rgba(250,204,21,0.4); }
          </style>
        </head>
        <body>
          <div class="sched-card">
            <div class="sched-head">
              <span>🗓️ EVENT SCHEDULE</span>
              <span style="font-size:15px; color:${accentColor};">${sportTitle} • ${venueTitle}</span>
            </div>
            <div class="sched-body">
              ${scheduleEntries.map(e => `
                <div class="sched-row">
                  <span class="sched-time">${e.time}</span>
                  <span class="sched-name">${e.name}</span>
                  <span class="sched-badge ${e.class}">${e.status}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </body>
        </html>
      `;
    }
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
              <span>${data.athlete || "MICHAEL PHELPS"} (${data.country || code})</span>
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
            <div style="font-size:13px; color:#94a3b8; line-height:1.5;">${data.athlete || 'MICHAEL PHELPS'}<br>${data.country || code}</div>
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
            <div style="font-size:14px; color:#e2e8f0; font-weight:700; line-height:1.6;">${data.athlete || 'MICHAEL PHELPS'}<br><span style="color:#94a3b8;">${data.country || 'NOC'}</span></div>
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
              <div style="font-size: 26px;">${data.athlete || "MICHAEL PHELPS"} (${data.country || code})</div>
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
              <span class="athlete-name">${data.athlete || data.athleteA || "MICHAEL PHELPS"}</span>
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
              <div class="crew-name">${data.athlete || data.teamA || "DAVID DAVIES & K.A. PAYNE"}</div>
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
              <span class="champ-name">${data.athlete || "USAIN BOLT"}</span>
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
              <div class="person-name">${data.athlete || "BOB BOWMAN"}</div>
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
            ${[
              { name: "MICHAEL PHELPS", noc: "USA 🇺🇸" },
              { name: "CHAD LE CLOS", noc: "RSA 🇿🇦" },
              { name: "EVGENY KOROTYSHKIN", noc: "RUS 🇷🇺" },
              { name: "MILORAD ČAVIĆ", noc: "SRB 🇷🇸" },
              { name: "TYLER MCGILL", noc: "USA 🇺🇸" },
              { name: "STEFFEN DEIBLER", noc: "GER 🇩🇪" }
            ].map((ath, i) => `
              <div class="draw-row">
                <div class="lane-badge">${i + 1}</div>
                <span style="flex:1;">${ath.name}</span>
                <span style="color:#94a3b8;font-size:14px;">${ath.noc}</span>
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
            <div class="clock-badge-box" style="background: linear-gradient(180deg, #00508c 0%, #002b54 50%, #001938 100%); padding: 8px 18px; border: 1px solid #001f3f;">
              <svg width="60" height="28" viewBox="0 0 100 50" fill="none" stroke="#ffd700" stroke-width="5" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.9));">
                <circle cx="20" cy="20" r="14" />
                <circle cx="50" cy="20" r="14" />
                <circle cx="80" cy="20" r="14" />
                <circle cx="35" cy="32" r="14" />
                <circle cx="65" cy="32" r="14" />
              </svg>
            </div>
          </div>
        </body>
        </html>
      `;
    }

    case "football-additional-time": {
      const labelStr = (data.label || "ADDITIONAL TIME").toUpperCase();
      const timeVal = data.time || data.value || "4:00";

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,700;1,900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: 'Outfit', sans-serif; }
            
            .add-time-wrapper {
              position: absolute;
              bottom: 90px;
              left: 120px;
              display: flex;
              align-items: center;
              animation: slideIn 0.4s ease-out;
            }
            @keyframes slideIn { from { transform: translateX(-40px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

            .silver-label {
              height: 38px;
              background: linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%);
              color: #002850;
              font-size: 15px;
              font-weight: 900;
              font-style: italic;
              padding: 0 20px;
              border-radius: 4px 0 0 4px;
              transform: skewX(-15deg);
              display: flex;
              align-items: center;
              box-shadow: 0 4px 12px rgba(0,0,0,0.4);
              letter-spacing: 1px;
            }
            .time-val {
              height: 38px;
              background: linear-gradient(180deg, #004077 0%, #001f3f 100%);
              border: 1px solid #001228;
              color: #ffffff;
              font-size: 20px;
              font-weight: 900;
              font-style: italic;
              padding: 0 24px;
              border-radius: 0 4px 4px 0;
              transform: skewX(-15deg);
              display: flex;
              align-items: center;
              box-shadow: 0 4px 12px rgba(0,0,0,0.4);
              margin-left: 2px;
            }
          </style>
        </head>
        <body>
          <div class="add-time-wrapper">
            <div class="silver-label"><span style="transform: skewX(15deg);">${labelStr}</span></div>
            <div class="time-val"><span style="transform: skewX(15deg);">${timeVal}</span></div>
          </div>
        </body>
        </html>
      `;
    }

    case "football-pso-crunch": {
      const team1Noc = (data.team1Noc || data.noc1 || "NGR").toUpperCase();
      const team1Flag = data.team1Flag || data.flag1 || "🇳🇬";
      const team1Val = data.team1Val !== undefined ? data.team1Val : "2";

      const team2Noc = (data.team2Noc || data.noc2 || "ARG").toUpperCase();
      const team2Flag = data.team2Flag || data.flag2 || "🇦🇷";
      const team2Val = data.team2Val !== undefined ? data.team2Val : "1";

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,700;1,900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: 'Outfit', sans-serif; }
            
            .pso-crunch-wrapper {
              position: absolute;
              top: 100px;
              left: 120px;
              width: 280px;
              display: flex;
              flex-direction: column;
              gap: 2px;
              animation: slideIn 0.4s ease-out;
            }
            @keyframes slideIn { from { transform: translateY(-30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

            .pso-c-row {
              height: 38px;
              background: linear-gradient(180deg, #004077 0%, #001f3f 100%);
              border: 1px solid #001228;
              border-radius: 4px;
              transform: skewX(-15deg);
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 0 14px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.5);
            }
            .info-left {
              display: flex;
              align-items: center;
              gap: 8px;
              transform: skewX(15deg);
            }
            .noc-text { font-size: 17px; font-weight: 900; font-style: italic; color: #ffffff; }
            .flag-box { font-size: 17px; }
            .score-val { font-size: 20px; font-weight: 900; font-style: italic; color: #ffffff; transform: skewX(15deg); }
            
            .shots-flex {
              display: flex;
              gap: 4px;
              transform: skewX(15deg);
            }
            .s-box { width: 18px; height: 16px; border-radius: 2px; }
            .s-box.g { background: #22c55e; }
            .s-box.m { background: #ef4444; }

            .sub-pill {
              align-self: center;
              background: linear-gradient(180deg, #002850 0%, #001736 100%);
              border: 1px solid rgba(255,255,255,0.1);
              color: #ffffff;
              font-size: 12px;
              font-weight: 900;
              font-style: italic;
              padding: 2px 20px;
              border-radius: 4px;
              transform: skewX(-15deg);
              margin-top: 1px;
            }
          </style>
        </head>
        <body>
          <div class="pso-crunch-wrapper">
            <div class="pso-c-row">
              <div class="info-left">
                <span class="noc-text">${team1Noc}</span>
                <span class="flag-box">${team1Flag}</span>
              </div>
              <span class="score-val">${team1Val}</span>
              <div class="shots-flex">
                <div class="s-box m"></div>
                <div class="s-box g"></div>
                <div class="s-box g"></div>
              </div>
            </div>

            <div class="pso-c-row">
              <div class="info-left">
                <span class="noc-text">${team2Noc}</span>
                <span class="flag-box">${team2Flag}</span>
              </div>
              <span class="score-val">${team2Val}</span>
              <div class="shots-flex">
                <div class="s-box m"></div>
                <div class="s-box g"></div>
              </div>
            </div>

            <div class="sub-pill"><span style="transform: skewX(15deg); display:inline-block;">SHOOT-OUT</span></div>
          </div>
        </body>
        </html>
      `;
    }

    case "football-bracket-semifinals":
    case "football-bracket-finals": {
      const isFinals = category === "football-bracket-finals";
      const eventTitle = (data.event || "MEN'S FOOTBALL").toUpperCase();
      const subTitle = (data.subTitle || (isFinals ? "SEMI-FINALS ➔ GOLD MEDAL MATCH" : "QUARTER-FINALS ➔ SEMI-FINALS")).toUpperCase();

      const pairsList = isFinals ? [
        { t1Noc: "NGR", t1Flag: "🇳🇬", t1Name: "NIGERIA", t2Noc: "BEL", t2Flag: "🇧🇪", t2Name: "BELGIUM", advNoc: "NGR", advFlag: "🇳🇬", advName: "NIGERIA" },
        { t1Noc: "ARG", t1Flag: "🇦🇷", t1Name: "ARGENTINA", t2Noc: "BRA", t2Flag: "🇧🇷", t2Name: "BRAZIL", advNoc: "ARG", advFlag: "🇦🇷", advName: "ARGENTINA" }
      ] : [
        { t1Noc: "BRA", t1Flag: "🇧🇷", t1Name: "BRAZIL", t2Noc: "CMR", t2Flag: "🇨🇲", t2Name: "CAMEROON", advNoc: "BRA", advFlag: "🇧🇷", advName: "BRAZIL" },
        { t1Noc: "ITA", t1Flag: "🇮🇹", t1Name: "ITALY", t2Noc: "BEL", t2Flag: "🇧🇪", t2Name: "BELGIUM", advNoc: "BEL", advFlag: "🇧🇪", advName: "BELGIUM" },
        { t1Noc: "ARG", t1Flag: "🇦🇷", t1Name: "ARGENTINA", t2Noc: "NED", t2Flag: "🇳🇱", t2Name: "NETHERLANDS", advNoc: "ARG", advFlag: "🇦🇷", advName: "ARGENTINA" },
        { t1Noc: "NGR", t1Flag: "🇳🇬", t1Name: "NIGERIA", t2Noc: "CIV", t2Flag: "🇨🇮", t2Name: "COTE D'IVOIRE", advNoc: "NGR", advFlag: "🇳🇬", advName: "NIGERIA" }
      ];

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,700;1,900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: 'Outfit', sans-serif; }
            
            .bkt-wrapper {
              position: absolute;
              bottom: 90px;
              left: 90px;
              width: 1050px;
              display: flex;
              flex-direction: column;
              gap: 3px;
              animation: slideIn 0.4s ease-out;
            }
            @keyframes slideIn { from { transform: translateX(-80px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

            .bkt-head {
              height: 60px;
              background: linear-gradient(180deg, #00508c 0%, #002b54 50%, #001938 100%);
              border: 2px solid #001f3f;
              border-radius: 6px;
              transform: skewX(-15deg);
              box-shadow: 0 10px 30px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.4);
              padding: 0 24px;
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
            .head-left {
              display: flex;
              align-items: center;
              gap: 16px;
              transform: skewX(15deg);
            }
            .sport-icon { font-size: 26px; line-height: 1; }
            .title-box { display: flex; flex-direction: column; }
            .event-title {
              font-size: 24px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              letter-spacing: 1.2px;
              text-transform: uppercase;
              text-shadow: 0 2px 4px rgba(0,0,0,0.6);
            }
            .sub-pill {
              background: linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%);
              color: #002850;
              font-size: 13px;
              font-weight: 900;
              font-style: italic;
              padding: 1px 16px;
              border-radius: 4px;
              letter-spacing: 1px;
              margin-top: 2px;
              width: 480px;
            }
            .rings-svg { transform: skewX(15deg); }

            .bkt-pair-container {
              display: flex;
              flex-direction: column;
              gap: 4px;
              margin-bottom: 4px;
            }
            .bkt-row {
              height: 38px;
              background: linear-gradient(180deg, #002850 0%, #001736 100%);
              border: 1px solid rgba(255,255,255,0.1);
              border-radius: 4px;
              transform: skewX(-15deg);
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 0 20px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.4);
            }
            .team-left {
              display: flex;
              align-items: center;
              gap: 12px;
              transform: skewX(15deg);
            }
            .noc-code { font-size: 18px; font-weight: 900; font-style: italic; color: #ffffff; width: 40px; }
            .flag-box { font-size: 20px; color: #ffffff; }
            .team-fullname { font-size: 19px; font-weight: 900; font-style: italic; color: #ffffff; text-transform: uppercase; letter-spacing: 1px; }

            .adv-box {
              position: absolute;
              right: 20px;
              width: 320px;
              height: 44px;
              background: linear-gradient(180deg, #003e73 0%, #001e3d 100%);
              border: 1px solid #38bdf8;
              border-radius: 6px;
              transform: skewX(-15deg);
              display: flex;
              align-items: center;
              padding: 0 16px;
              box-shadow: 0 6px 16px rgba(0,0,0,0.6);
            }
          </style>
        </head>
        <body>
          <div class="bkt-wrapper">
            <div class="bkt-head">
              <div class="head-left">
                <span class="sport-icon">⚽</span>
                <div class="title-box">
                  <span class="event-title">${eventTitle}</span>
                  <div class="sub-pill">
                    <span>${subTitle}</span>
                  </div>
                </div>
              </div>
              <svg class="rings-svg" width="75" height="34" viewBox="0 0 100 50" fill="none" stroke="#ffd700" stroke-width="5" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.9));">
                <circle cx="20" cy="20" r="14" />
                <circle cx="50" cy="20" r="14" />
                <circle cx="80" cy="20" r="14" />
                <circle cx="35" cy="32" r="14" />
                <circle cx="65" cy="32" r="14" />
              </svg>
            </div>

            ${pairsList.map(p => `
              <div style="position: relative; margin-bottom: 6px;">
                <div class="bkt-pair-container">
                  <div class="bkt-row" style="width: 580px;">
                    <div class="team-left">
                      <span class="noc-code">${p.t1Noc}</span>
                      <span class="flag-box">${p.t1Flag}</span>
                      <span class="team-fullname">${p.t1Name}</span>
                    </div>
                  </div>
                  <div class="bkt-row" style="width: 580px;">
                    <div class="team-left">
                      <span class="noc-code">${p.t2Noc}</span>
                      <span class="flag-box">${p.t2Flag}</span>
                      <span class="team-fullname">${p.t2Name}</span>
                    </div>
                  </div>
                </div>

                <div class="adv-box" style="top: 20px;">
                  <div class="team-left">
                    <span class="noc-code">${p.advNoc}</span>
                    <span class="flag-box">${p.advFlag}</span>
                    <span class="team-fullname">${p.advName}</span>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </body>
        </html>
      `;
    }

    case "football-final-rank": {
      const eventTitle = (data.event || "MEN'S FOOTBALL").toUpperCase();
      const subTitle = (data.subTitle || "FINAL RANK").toUpperCase();

      const rankList = Array.isArray(data.ranks) ? data.ranks : [
        { rank: "1", noc: "ARG", flag: "🇦🇷", name: "ARGENTINA" },
        { rank: "2", noc: "NGR", flag: "🇳🇬", name: "NIGERIA" },
        { rank: "3", noc: "BRA", flag: "🇧🇷", name: "BRAZIL" },
        { rank: "4", noc: "BEL", flag: "🇧🇪", name: "BELGIUM" },
        { rank: "5", noc: "ITA", flag: "🇮🇹", name: "ITALY" },
        { rank: "6", noc: "CIV", flag: "🇨🇮", name: "COTE D'IVOIRE" },
        { rank: "7", noc: "NED", flag: "🇳🇱", name: "NETHERLANDS" },
        { rank: "8", noc: "CMR", flag: "🇨🇲", name: "CAMEROON" }
      ];

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,700;1,900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: 'Outfit', sans-serif; }
            
            .rank-wrapper {
              position: absolute;
              bottom: 90px;
              left: 90px;
              width: 1050px;
              display: flex;
              flex-direction: column;
              gap: 3px;
              animation: slideIn 0.4s ease-out;
            }
            @keyframes slideIn { from { transform: translateX(-80px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

            .rank-head {
              height: 60px;
              background: linear-gradient(180deg, #00508c 0%, #002b54 50%, #001938 100%);
              border: 2px solid #001f3f;
              border-radius: 6px;
              transform: skewX(-15deg);
              box-shadow: 0 10px 30px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.4);
              padding: 0 24px;
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
            .head-left {
              display: flex;
              align-items: center;
              gap: 16px;
              transform: skewX(15deg);
            }
            .sport-icon { font-size: 26px; line-height: 1; }
            .title-box { display: flex; flex-direction: column; }
            .event-title {
              font-size: 24px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              letter-spacing: 1.2px;
              text-transform: uppercase;
              text-shadow: 0 2px 4px rgba(0,0,0,0.6);
            }
            .sub-pill {
              background: linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%);
              color: #002850;
              font-size: 13px;
              font-weight: 900;
              font-style: italic;
              padding: 1px 16px;
              border-radius: 4px;
              letter-spacing: 1px;
              margin-top: 2px;
              width: 480px;
            }
            .rings-svg { transform: skewX(15deg); }

            .rank-row {
              height: 40px;
              background: linear-gradient(180deg, #002850 0%, #001736 100%);
              border: 1px solid rgba(255,255,255,0.1);
              border-radius: 4px;
              transform: skewX(-15deg);
              display: flex;
              align-items: center;
              padding: 0 24px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.4);
            }
            .rank-badge {
              width: 32px;
              height: 28px;
              background: linear-gradient(180deg, #dc2626 0%, #991b1b 100%);
              color: #ffffff;
              font-size: 18px;
              font-weight: 900;
              font-style: italic;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 3px;
              transform: skewX(15deg);
              box-shadow: 0 2px 4px rgba(0,0,0,0.4);
            }
            .row-info {
              display: flex;
              align-items: center;
              gap: 14px;
              transform: skewX(15deg);
              margin-left: 16px;
            }
            .noc-code { font-size: 19px; font-weight: 900; font-style: italic; color: #ffffff; width: 45px; }
            .flag-box { font-size: 20px; color: #ffffff; }
            .team-fullname { font-size: 20px; font-weight: 900; font-style: italic; color: #ffffff; text-transform: uppercase; letter-spacing: 1.2px; }
          </style>
        </head>
        <body>
          <div class="rank-wrapper">
            <div class="rank-head">
              <div class="head-left">
                <span class="sport-icon">⚽</span>
                <div class="title-box">
                  <span class="event-title">${eventTitle}</span>
                  <div class="sub-pill">
                    <span>${subTitle}</span>
                  </div>
                </div>
              </div>
              <svg class="rings-svg" width="75" height="34" viewBox="0 0 100 50" fill="none" stroke="#ffd700" stroke-width="5" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.9));">
                <circle cx="20" cy="20" r="14" />
                <circle cx="50" cy="20" r="14" />
                <circle cx="80" cy="20" r="14" />
                <circle cx="35" cy="32" r="14" />
                <circle cx="65" cy="32" r="14" />
              </svg>
            </div>

            ${rankList.map(rk => `
              <div class="rank-row">
                <div class="rank-badge">${rk.rank}</div>
                <div class="row-info">
                  <span class="noc-code">${rk.noc}</span>
                  <span class="flag-box">${rk.flag}</span>
                  <span class="team-fullname">${rk.name}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </body>
        </html>
      `;
    }

    case "football-ceremony-id": {
      const eventTitle = (data.event || "MEN'S FOOTBALL").toUpperCase();
      const subTitle = (data.subTitle || "VICTORY CEREMONY").toUpperCase();

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,700;1,900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: 'Outfit', sans-serif; }
            
            .c-wrapper {
              position: absolute;
              bottom: 90px;
              left: 90px;
              width: 860px;
              display: flex;
              flex-direction: column;
              gap: 3px;
              animation: slideIn 0.4s ease-out;
            }
            @keyframes slideIn { from { transform: translateX(-80px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

            .c-head {
              height: 56px;
              background: linear-gradient(180deg, #00508c 0%, #002b54 50%, #001938 100%);
              border: 2px solid #001f3f;
              border-radius: 6px;
              transform: skewX(-15deg);
              box-shadow: 0 10px 30px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.4);
              padding: 0 24px;
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
            .head-left {
              display: flex;
              align-items: center;
              gap: 16px;
              transform: skewX(15deg);
            }
            .sport-icon { font-size: 26px; line-height: 1; }
            .event-title {
              font-size: 26px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              letter-spacing: 1.5px;
              text-transform: uppercase;
            }
            .rings-svg { transform: skewX(15deg); }

            .c-sub {
              height: 44px;
              background: linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%);
              color: #002850;
              border-radius: 4px;
              transform: skewX(-15deg);
              display: flex;
              align-items: center;
              padding: 0 24px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.4);
            }
            .sub-text {
              transform: skewX(15deg);
              font-size: 22px;
              font-weight: 900;
              font-style: italic;
              letter-spacing: 1.2px;
              text-transform: uppercase;
            }
          </style>
        </head>
        <body>
          <div class="c-wrapper">
            <div class="c-head">
              <div class="head-left">
                <span class="sport-icon">⚽</span>
                <span class="event-title">${eventTitle}</span>
              </div>
              <svg class="rings-svg" width="75" height="34" viewBox="0 0 100 50" fill="none" stroke="#ffd700" stroke-width="5" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.9));">
                <circle cx="20" cy="20" r="14" />
                <circle cx="50" cy="20" r="14" />
                <circle cx="80" cy="20" r="14" />
                <circle cx="35" cy="32" r="14" />
                <circle cx="65" cy="32" r="14" />
              </svg>
            </div>

            <div class="c-sub">
              <span class="sub-text">${subTitle}</span>
            </div>
          </div>
        </body>
        </html>
      `;
    }

    case "football-medal-id": {
      const countryCode = (data.country || data.noc || "ARG").toUpperCase();
      const flagStr = data.flag || "🇦🇷";
      const teamName = (data.name || "ARGENTINA").toUpperCase();
      const subTitle = (data.subTitle || "GOLD - MEN'S FOOTBALL").toUpperCase();

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,700;1,900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: 'Outfit', sans-serif; }
            
            .med-wrapper {
              position: absolute;
              bottom: 90px;
              left: 90px;
              width: 860px;
              display: flex;
              flex-direction: column;
              gap: 3px;
              animation: slideIn 0.4s ease-out;
            }
            @keyframes slideIn { from { transform: translateX(-80px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

            .med-head {
              height: 56px;
              background: linear-gradient(180deg, #00508c 0%, #002b54 50%, #001938 100%);
              border: 2px solid #001f3f;
              border-radius: 6px;
              transform: skewX(-15deg);
              box-shadow: 0 10px 30px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.4);
              padding: 0 24px;
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
            .head-left {
              display: flex;
              align-items: center;
              gap: 16px;
              transform: skewX(15deg);
            }
            .noc-code { font-size: 24px; font-weight: 900; font-style: italic; color: #ffffff; letter-spacing: 1px; }
            .flag-box { font-size: 24px; color: #ffffff; }
            .team-name { font-size: 28px; font-weight: 900; font-style: italic; color: #ffffff; text-transform: uppercase; letter-spacing: 1.5px; }
            .rings-svg { transform: skewX(15deg); }

            .med-sub {
              height: 44px;
              background: linear-gradient(180deg, #002850 0%, #001736 100%);
              border: 1px solid rgba(255,255,255,0.1);
              border-radius: 4px;
              transform: skewX(-15deg);
              display: flex;
              align-items: center;
              gap: 12px;
              padding: 0 24px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.4);
            }
            .gold-badge { font-size: 22px; transform: skewX(15deg); }
            .sub-text {
              transform: skewX(15deg);
              font-size: 22px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              letter-spacing: 1.2px;
              text-transform: uppercase;
            }
          </style>
        </head>
        <body>
          <div class="med-wrapper">
            <div class="med-head">
              <div class="head-left">
                <span class="noc-code">${countryCode}</span>
                <span class="flag-box">${flagStr}</span>
                <span class="team-name">${teamName}</span>
              </div>
              <svg class="rings-svg" width="75" height="34" viewBox="0 0 100 50" fill="none" stroke="#ffd700" stroke-width="5" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.9));">
                <circle cx="20" cy="20" r="14" />
                <circle cx="50" cy="20" r="14" />
                <circle cx="80" cy="20" r="14" />
                <circle cx="35" cy="32" r="14" />
                <circle cx="65" cy="32" r="14" />
              </svg>
            </div>

            <div class="med-sub">
              <span class="gold-badge">🥇</span>
              <span class="sub-text">${subTitle}</span>
            </div>
          </div>
        </body>
        </html>
      `;
    }

    case "football-medals-list": {
      const eventTitle = (data.event || "MEN'S FOOTBALL").toUpperCase();
      const subTitle = (data.subTitle || "VICTORY CEREMONY").toUpperCase();

      const winnersList = Array.isArray(data.winners) ? data.winners : [
        { medal: "🥇", noc: "ARG", flag: "🇦🇷", name: "ARGENTINA" },
        { medal: "🥈", noc: "NGR", flag: "🇳🇬", name: "NIGERIA" },
        { medal: "🥉", noc: "BRA", flag: "🇧🇷", name: "BRAZIL" }
      ];

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,700;1,900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: 'Outfit', sans-serif; }
            
            .meds-wrapper {
              position: absolute;
              bottom: 90px;
              left: 90px;
              width: 1050px;
              display: flex;
              flex-direction: column;
              gap: 3px;
              animation: slideIn 0.4s ease-out;
            }
            @keyframes slideIn { from { transform: translateX(-80px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

            .meds-head {
              height: 60px;
              background: linear-gradient(180deg, #00508c 0%, #002b54 50%, #001938 100%);
              border: 2px solid #001f3f;
              border-radius: 6px;
              transform: skewX(-15deg);
              box-shadow: 0 10px 30px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.4);
              padding: 0 24px;
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
            .head-left {
              display: flex;
              align-items: center;
              gap: 16px;
              transform: skewX(15deg);
            }
            .sport-icon { font-size: 26px; line-height: 1; }
            .title-box { display: flex; flex-direction: column; }
            .event-title {
              font-size: 24px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              letter-spacing: 1.2px;
              text-transform: uppercase;
              text-shadow: 0 2px 4px rgba(0,0,0,0.6);
            }
            .sub-pill {
              background: linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%);
              color: #002850;
              font-size: 13px;
              font-weight: 900;
              font-style: italic;
              padding: 1px 16px;
              border-radius: 4px;
              letter-spacing: 1px;
              margin-top: 2px;
              width: 480px;
            }
            .rings-svg { transform: skewX(15deg); }

            .med-row {
              height: 42px;
              background: linear-gradient(180deg, #002850 0%, #001736 100%);
              border: 1px solid rgba(255,255,255,0.1);
              border-radius: 4px;
              transform: skewX(-15deg);
              display: flex;
              align-items: center;
              padding: 0 24px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.4);
            }
            .medal-icon { font-size: 22px; transform: skewX(15deg); }
            .row-info {
              display: flex;
              align-items: center;
              gap: 14px;
              transform: skewX(15deg);
              margin-left: 16px;
            }
            .noc-code { font-size: 20px; font-weight: 900; font-style: italic; color: #ffffff; width: 45px; }
            .flag-box { font-size: 22px; color: #ffffff; }
            .team-fullname { font-size: 22px; font-weight: 900; font-style: italic; color: #ffffff; text-transform: uppercase; letter-spacing: 1.2px; }
          </style>
        </head>
        <body>
          <div class="meds-wrapper">
            <div class="meds-head">
              <div class="head-left">
                <span class="sport-icon">⚽</span>
                <div class="title-box">
                  <span class="event-title">${eventTitle}</span>
                  <div class="sub-pill">
                    <span>${subTitle}</span>
                  </div>
                </div>
              </div>
              <svg class="rings-svg" width="75" height="34" viewBox="0 0 100 50" fill="none" stroke="#ffd700" stroke-width="5" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.9));">
                <circle cx="20" cy="20" r="14" />
                <circle cx="50" cy="20" r="14" />
                <circle cx="80" cy="20" r="14" />
                <circle cx="35" cy="32" r="14" />
                <circle cx="65" cy="32" r="14" />
              </svg>
            </div>

            ${winnersList.map(w => `
              <div class="med-row">
                <span class="medal-icon">${w.medal}</span>
                <div class="row-info">
                  <span class="noc-code">${w.noc}</span>
                  <span class="flag-box">${w.flag}</span>
                  <span class="team-fullname">${w.name}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </body>
        </html>
      `;
    }

    case "football-medal-presenter":
    case "football-flower-presenter": {
      const isFlower = category === "football-flower-presenter";
      const nameStr = (data.presenter || data.name || (isFlower ? "MR JULIO GRONDONA" : "JACQUES ROGGE")).toUpperCase();
      const titleStr = (data.title || data.role || (isFlower ? "SENIOR VICE PRESIDENT, FIFA" : "IOC PRESIDENT, BELGIUM")).toUpperCase();

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,700;1,900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: 'Outfit', sans-serif; }
            
            .pres-wrapper {
              position: absolute;
              bottom: 90px;
              left: 90px;
              width: 860px;
              display: flex;
              flex-direction: column;
              gap: 3px;
              animation: slideIn 0.4s ease-out;
            }
            @keyframes slideIn { from { transform: translateX(-80px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

            .pres-head {
              height: 56px;
              background: linear-gradient(180deg, #00508c 0%, #002b54 50%, #001938 100%);
              border: 2px solid #001f3f;
              border-radius: 6px;
              transform: skewX(-15deg);
              box-shadow: 0 10px 30px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.4);
              padding: 0 24px;
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
            .pres-name {
              transform: skewX(15deg);
              font-size: 28px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              text-transform: uppercase;
              letter-spacing: 1.5px;
              text-shadow: 0 2px 4px rgba(0,0,0,0.6);
            }
            .rings-svg { transform: skewX(15deg); }

            .pres-sub {
              height: 44px;
              background: linear-gradient(180deg, #002850 0%, #001736 100%);
              border: 1px solid rgba(255,255,255,0.1);
              border-radius: 4px;
              transform: skewX(-15deg);
              display: flex;
              align-items: center;
              padding: 0 24px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.4);
            }
            .sub-title {
              transform: skewX(15deg);
              font-size: 22px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              letter-spacing: 1.2px;
              text-transform: uppercase;
            }
          </style>
        </head>
        <body>
          <div class="pres-wrapper">
            <div class="pres-head">
              <span class="pres-name">${nameStr}</span>
              <svg class="rings-svg" width="75" height="34" viewBox="0 0 100 50" fill="none" stroke="#ffd700" stroke-width="5" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.9));">
                <circle cx="20" cy="20" r="14" />
                <circle cx="50" cy="20" r="14" />
                <circle cx="80" cy="20" r="14" />
                <circle cx="35" cy="32" r="14" />
                <circle cx="65" cy="32" r="14" />
              </svg>
            </div>

            <div class="pres-sub">
              <span class="sub-title">${titleStr}</span>
            </div>
          </div>
        </body>
        </html>
      `;
    }

    case "football-pso-scoreboard": {
      const eventTitle = (data.event || "MEN'S FOOTBALL").toUpperCase();
      const subTitle = (data.subTitle || "GOLD MEDAL MATCH - PENALTY SHOOT-OUT").toUpperCase();

      const team1Noc = (data.team1Noc || data.noc1 || "NGR").toUpperCase();
      const team1Flag = data.team1Flag || data.flag1 || "🇳🇬";
      const team1Name = (data.team1Name || data.name1 || "NIGERIA").toUpperCase();
      const team1Score = data.team1Score !== undefined ? data.team1Score : "2";
      const team1Shots = Array.isArray(data.team1Shots) ? data.team1Shots : ["G", "M", "G"];

      const team2Noc = (data.team2Noc || data.noc2 || "ARG").toUpperCase();
      const team2Flag = data.team2Flag || data.flag2 || "🇦🇷";
      const team2Name = (data.team2Name || data.name2 || "ARGENTINA").toUpperCase();
      const team2Score = data.team2Score !== undefined ? data.team2Score : "1";
      const team2Shots = Array.isArray(data.team2Shots) ? data.team2Shots : ["M", "G"];

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,700;1,900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: 'Outfit', sans-serif; }
            
            .pso-wrapper {
              position: absolute;
              bottom: 90px;
              left: 90px;
              width: 1050px;
              display: flex;
              flex-direction: column;
              gap: 3px;
              animation: slideIn 0.4s ease-out;
            }
            @keyframes slideIn { from { transform: translateX(-80px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

            .pso-head {
              height: 60px;
              background: linear-gradient(180deg, #00508c 0%, #002b54 50%, #001938 100%);
              border: 2px solid #001f3f;
              border-radius: 6px;
              transform: skewX(-15deg);
              box-shadow: 0 10px 30px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.4);
              padding: 0 24px;
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
            .head-left {
              display: flex;
              align-items: center;
              gap: 16px;
              transform: skewX(15deg);
            }
            .sport-icon { font-size: 26px; line-height: 1; }
            .title-box { display: flex; flex-direction: column; }
            .event-title {
              font-size: 24px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              letter-spacing: 1.2px;
              text-transform: uppercase;
              text-shadow: 0 2px 4px rgba(0,0,0,0.6);
            }
            .sub-pill {
              background: linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%);
              color: #002850;
              font-size: 13px;
              font-weight: 900;
              font-style: italic;
              padding: 1px 16px;
              border-radius: 4px;
              letter-spacing: 1px;
              margin-top: 2px;
              width: 520px;
            }
            .rings-svg { transform: skewX(15deg); }

            .pso-team-row {
              height: 42px;
              background: linear-gradient(180deg, #002850 0%, #001736 100%);
              border: 1px solid rgba(255,255,255,0.1);
              border-radius: 4px;
              transform: skewX(-15deg);
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 0 24px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.4);
            }
            .team-left {
              display: flex;
              align-items: center;
              gap: 14px;
              transform: skewX(15deg);
            }
            .noc-code { font-size: 20px; font-weight: 900; font-style: italic; color: #ffffff; width: 45px; }
            .flag-box { font-size: 22px; color: #ffffff; }
            .team-fullname { font-size: 22px; font-weight: 900; font-style: italic; color: #ffffff; text-transform: uppercase; letter-spacing: 1.2px; }
            
            .pso-right {
              display: flex;
              align-items: center;
              gap: 16px;
              transform: skewX(15deg);
            }
            .pso-score { font-size: 24px; font-weight: 900; font-style: italic; color: #ffffff; width: 30px; text-align: right; }

            .shots-bar {
              display: flex;
              align-items: center;
              gap: 6px;
            }
            .shot-box {
              width: 28px;
              height: 22px;
              border-radius: 3px;
              transform: skewX(-15deg);
              box-shadow: 0 2px 4px rgba(0,0,0,0.4);
            }
            .shot-box.goal { background: linear-gradient(180deg, #22c55e 0%, #15803d 100%); border: 1px solid #16a34a; }
            .shot-box.miss { background: linear-gradient(180deg, #ef4444 0%, #b91c1c 100%); border: 1px solid #dc2626; }
          </style>
        </head>
        <body>
          <div class="pso-wrapper">
            <div class="pso-head">
              <div class="head-left">
                <span class="sport-icon">⚽</span>
                <div class="title-box">
                  <span class="event-title">${eventTitle}</span>
                  <div class="sub-pill">
                    <span>${subTitle}</span>
                  </div>
                </div>
              </div>
              <svg class="rings-svg" width="75" height="34" viewBox="0 0 100 50" fill="none" stroke="#ffd700" stroke-width="5" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.9));">
                <circle cx="20" cy="20" r="14" />
                <circle cx="50" cy="20" r="14" />
                <circle cx="80" cy="20" r="14" />
                <circle cx="35" cy="32" r="14" />
                <circle cx="65" cy="32" r="14" />
              </svg>
            </div>

            <div class="pso-team-row">
              <div class="team-left">
                <span class="noc-code">${team1Noc}</span>
                <span class="flag-box">${team1Flag}</span>
                <span class="team-fullname">${team1Name}</span>
              </div>
              <div class="pso-right">
                <span class="pso-score">${team1Score}</span>
                <div class="shots-bar">
                  ${team1Shots.map(s => `<div class="shot-box ${s === 'G' || s === true ? 'goal' : 'miss'}"></div>`).join('')}
                </div>
              </div>
            </div>

            <div class="pso-team-row">
              <div class="team-left">
                <span class="noc-code">${team2Noc}</span>
                <span class="flag-box">${team2Flag}</span>
                <span class="team-fullname">${team2Name}</span>
              </div>
              <div class="pso-right">
                <span class="pso-score">${team2Score}</span>
                <div class="shots-bar">
                  ${team2Shots.map(s => `<div class="shot-box ${s === 'G' || s === true ? 'goal' : 'miss'}"></div>`).join('')}
                </div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `;
    }

    case "football-advance-quarterfinals": {
      const eventTitle = (data.event || "MEN'S FOOTBALL").toUpperCase();
      const subTitle = (data.subTitle || "FIRST ROUND ➔ QUARTER-FINALS").toUpperCase();

      const teamsList = Array.isArray(data.teams) ? data.teams : [
        { noc: "ARG", flag: "🇦🇷", name: "ARGENTINA", w: "3", l: "0", d: "0" },
        { noc: "ITA", flag: "🇮🇹", name: "ITALY", w: "2", l: "0", d: "1" },
        { noc: "BRA", flag: "🇧🇷", name: "BRAZIL", w: "3", l: "0", d: "0" },
        { noc: "NGR", flag: "🇳🇬", name: "NIGERIA", w: "2", l: "0", d: "1" },
        { noc: "CIV", flag: "🇨🇮", name: "COTE D'IVOIRE", w: "2", l: "1", d: "0" },
        { noc: "BEL", flag: "🇧🇪", name: "BELGIUM", w: "2", l: "1", d: "0" },
        { noc: "NED", flag: "🇳🇱", name: "NETHERLANDS", w: "1", l: "0", d: "2" },
        { noc: "CMR", flag: "🇨🇲", name: "CAMEROON", w: "1", l: "0", d: "2" }
      ];

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,700;1,900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: 'Outfit', sans-serif; }
            
            .adv-wrapper {
              position: absolute;
              bottom: 90px;
              left: 90px;
              width: 1050px;
              display: flex;
              flex-direction: column;
              gap: 3px;
              animation: slideIn 0.4s ease-out;
            }
            @keyframes slideIn { from { transform: translateX(-80px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

            .adv-head {
              height: 60px;
              background: linear-gradient(180deg, #00508c 0%, #002b54 50%, #001938 100%);
              border: 2px solid #001f3f;
              border-radius: 6px;
              transform: skewX(-15deg);
              box-shadow: 0 10px 30px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.4);
              padding: 0 24px;
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
            .head-left {
              display: flex;
              align-items: center;
              gap: 16px;
              transform: skewX(15deg);
            }
            .sport-icon { font-size: 26px; line-height: 1; }
            .title-box { display: flex; flex-direction: column; }
            .event-title {
              font-size: 24px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              letter-spacing: 1.2px;
              text-transform: uppercase;
              text-shadow: 0 2px 4px rgba(0,0,0,0.6);
            }
            .sub-pill-row {
              display: flex;
              align-items: center;
              justify-content: space-between;
              background: linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%);
              color: #002850;
              font-size: 13px;
              font-weight: 900;
              font-style: italic;
              padding: 1px 16px;
              border-radius: 4px;
              letter-spacing: 1px;
              margin-top: 2px;
              width: 580px;
            }
            .wld-col-hdr {
              display: flex;
              gap: 24px;
              margin-right: 8px;
            }
            .rings-svg { transform: skewX(15deg); }

            .adv-row {
              height: 40px;
              background: linear-gradient(180deg, #002850 0%, #001736 100%);
              border: 1px solid rgba(255,255,255,0.1);
              border-radius: 4px;
              transform: skewX(-15deg);
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 0 28px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.4);
            }
            .team-left-info {
              display: flex;
              align-items: center;
              gap: 14px;
              transform: skewX(15deg);
            }
            .noc-code { font-size: 19px; font-weight: 900; font-style: italic; color: #ffffff; width: 45px; }
            .flag-box { font-size: 20px; color: #ffffff; }
            .team-fullname { font-size: 20px; font-weight: 900; font-style: italic; color: #ffffff; text-transform: uppercase; letter-spacing: 1.2px; }
            
            .wld-vals {
              display: flex;
              align-items: center;
              gap: 28px;
              transform: skewX(15deg);
              font-size: 20px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
            }
            .wld-vals span { width: 16px; text-align: center; }
          </style>
        </head>
        <body>
          <div class="adv-wrapper">
            <div class="adv-head">
              <div class="head-left">
                <span class="sport-icon">⚽</span>
                <div class="title-box">
                  <span class="event-title">${eventTitle}</span>
                  <div class="sub-pill-row">
                    <span>${subTitle}</span>
                    <div class="wld-col-hdr">
                      <span>W</span>
                      <span>L</span>
                      <span>D</span>
                    </div>
                  </div>
                </div>
              </div>
              <svg class="rings-svg" width="75" height="34" viewBox="0 0 100 50" fill="none" stroke="#ffd700" stroke-width="5" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.9));">
                <circle cx="20" cy="20" r="14" />
                <circle cx="50" cy="20" r="14" />
                <circle cx="80" cy="20" r="14" />
                <circle cx="35" cy="32" r="14" />
                <circle cx="65" cy="32" r="14" />
              </svg>
            </div>

            ${teamsList.map(tm => `
              <div class="adv-row">
                <div class="team-left-info">
                  <span class="noc-code">${tm.noc}</span>
                  <span class="flag-box">${tm.flag}</span>
                  <span class="team-fullname">${tm.name}</span>
                </div>
                <div class="wld-vals">
                  <span>${tm.w}</span>
                  <span>${tm.l}</span>
                  <span>${tm.d}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </body>
        </html>
      `;
    }

    case "football-goal-summary": {
      const team1Noc = (data.team1Noc || data.noc1 || "NGR").toUpperCase();
      const team1Flag = data.team1Flag || data.flag1 || "🇳🇬";
      const team2Noc = (data.team2Noc || data.noc2 || "BEL").toUpperCase();
      const team2Flag = data.team2Flag || data.flag2 || "🇧🇪";
      const finalScore = data.score || "4 - 1";

      const goalsList = Array.isArray(data.goals) ? data.goals : [
        { side: "left", shirt: "13", scorer: "O. ADEFEMI", minute: "17'", runningScore: "1-0" },
        { side: "left", shirt: "7", scorer: "C. OGBUKE OBASI", minute: "59'", runningScore: "2-0" },
        { side: "left", shirt: "7", scorer: "C. OGBUKE OBASI", minute: "72'", runningScore: "3-0" },
        { side: "left", shirt: "2", scorer: "C. OKONKWO", minute: "78'", runningScore: "4-0" },
        { side: "right", shirt: "13", scorer: "L. CIMAN", minute: "88'", runningScore: "4-1" }
      ];

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,700;1,900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: 'Outfit', sans-serif; }
            
            .goals-wrapper {
              position: absolute;
              bottom: 90px;
              left: 90px;
              width: 1050px;
              display: flex;
              flex-direction: column;
              gap: 3px;
              animation: slideIn 0.4s ease-out;
            }
            @keyframes slideIn { from { transform: translateX(-80px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

            .goals-head {
              height: 60px;
              background: linear-gradient(180deg, #00508c 0%, #002b54 50%, #001938 100%);
              border: 2px solid #001f3f;
              border-radius: 6px;
              transform: skewX(-15deg);
              box-shadow: 0 10px 30px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.4);
              padding: 0 24px;
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
            .head-team {
              display: flex;
              align-items: center;
              gap: 12px;
              transform: skewX(15deg);
            }
            .noc-code { font-size: 24px; font-weight: 900; font-style: italic; color: #ffffff; letter-spacing: 1px; }
            .flag-box { font-size: 24px; color: #ffffff; }
            .score-pill {
              background: linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%);
              color: #002850;
              font-size: 22px;
              font-weight: 900;
              font-style: italic;
              padding: 2px 32px;
              border-radius: 4px;
              letter-spacing: 2px;
              transform: skewX(15deg);
              box-shadow: 0 2px 8px rgba(0,0,0,0.4);
            }

            .goal-row {
              height: 42px;
              background: linear-gradient(180deg, #002850 0%, #001736 100%);
              border: 1px solid rgba(255,255,255,0.1);
              border-radius: 4px;
              transform: skewX(-15deg);
              display: flex;
              align-items: center;
              padding: 0 24px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.4);
            }
            .goal-col-left {
              flex: 1;
              display: flex;
              align-items: center;
              gap: 12px;
              transform: skewX(15deg);
            }
            .goal-col-mid {
              width: 140px;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 16px;
              transform: skewX(15deg);
            }
            .goal-col-right {
              flex: 1;
              display: flex;
              align-items: center;
              justify-content: flex-end;
              gap: 12px;
              transform: skewX(15deg);
            }

            .shirt-num { font-size: 18px; font-weight: 900; font-style: italic; color: #38bdf8; }
            .scorer-name { font-size: 19px; font-weight: 900; font-style: italic; color: #ffffff; text-transform: uppercase; letter-spacing: 1px; }
            .goal-min { font-size: 17px; font-weight: 900; font-style: italic; color: #38bdf8; }
            .running-sc { font-size: 19px; font-weight: 900; font-style: italic; color: #ffffff; }
          </style>
        </head>
        <body>
          <div class="goals-wrapper">
            <div class="goals-head">
              <div class="head-team">
                <span class="noc-code">${team1Noc}</span>
                <span class="flag-box">${team1Flag}</span>
              </div>
              <div class="score-pill">
                <span>${finalScore}</span>
              </div>
              <div class="head-team">
                <span class="noc-code">${team2Noc}</span>
                <span class="flag-box">${team2Flag}</span>
              </div>
            </div>

            ${goalsList.map(g => {
              const isLeft = g.side !== "right";
              return `
                <div class="goal-row">
                  <div class="goal-col-left">
                    ${isLeft ? `
                      <span class="shirt-num">${g.shirt}</span>
                      <span class="scorer-name">${(g.scorer || '').toUpperCase()}</span>
                    ` : ''}
                  </div>
                  <div class="goal-col-mid">
                    ${isLeft ? `<span class="goal-min">${g.minute}</span>` : ''}
                    <span class="running-sc">${g.runningScore}</span>
                    ${!isLeft ? `<span class="goal-min">${g.minute}</span>` : ''}
                  </div>
                  <div class="goal-col-right">
                    ${!isLeft ? `
                      <span class="scorer-name">${(g.scorer || '').toUpperCase()}</span>
                      <span class="shirt-num">${g.shirt}</span>
                    ` : ''}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </body>
        </html>
      `;
    }

    case "football-match-result": {
      const eventTitle = (data.event || "MEN'S FOOTBALL").toUpperCase();
      const matchStage = (data.stage || data.subTitle || "BRONZE MEDAL MATCH").toUpperCase();
      const matchStatus = (data.status || data.period || "2ND HALF").toUpperCase();

      const team1Noc = (data.team1Noc || data.noc1 || "BEL").toUpperCase();
      const team1Flag = data.team1Flag || data.flag1 || "🇧🇪";
      const team1Name = (data.team1Name || data.name1 || "BELGIUM").toUpperCase();
      const team1Score = data.team1Score !== undefined ? data.team1Score : "0";
      const team1Pso = data.team1Pso !== undefined ? `(${data.team1Pso})` : "";

      const team2Noc = (data.team2Noc || data.noc2 || "BRA").toUpperCase();
      const team2Flag = data.team2Flag || data.flag2 || "🇧🇷";
      const team2Name = (data.team2Name || data.name2 || "BRAZIL").toUpperCase();
      const team2Score = data.team2Score !== undefined ? data.team2Score : "2";
      const team2Pso = data.team2Pso !== undefined ? `(${data.team2Pso})` : "";

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,700;1,900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: 'Outfit', sans-serif; }
            
            .m-res-wrapper {
              position: absolute;
              bottom: 90px;
              left: 90px;
              width: 1050px;
              display: flex;
              flex-direction: column;
              gap: 3px;
              animation: slideIn 0.4s ease-out;
            }
            @keyframes slideIn { from { transform: translateX(-80px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

            .m-res-head {
              height: 60px;
              background: linear-gradient(180deg, #00508c 0%, #002b54 50%, #001938 100%);
              border: 2px solid #001f3f;
              border-radius: 6px;
              transform: skewX(-15deg);
              box-shadow: 0 10px 30px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.4);
              padding: 0 24px;
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
            .head-left {
              display: flex;
              align-items: center;
              gap: 16px;
              transform: skewX(15deg);
            }
            .sport-icon { font-size: 26px; line-height: 1; }
            .title-box { display: flex; flex-direction: column; }
            .event-title {
              font-size: 24px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              letter-spacing: 1.2px;
              text-transform: uppercase;
              text-shadow: 0 2px 4px rgba(0,0,0,0.6);
            }
            .sub-pill-row {
              display: flex;
              align-items: center;
              justify-content: space-between;
              background: linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%);
              color: #002850;
              font-size: 13px;
              font-weight: 900;
              font-style: italic;
              padding: 1px 16px;
              border-radius: 4px;
              letter-spacing: 1px;
              margin-top: 2px;
              width: 500px;
            }
            .rings-svg { transform: skewX(15deg); }

            .team-score-row {
              height: 42px;
              background: linear-gradient(180deg, #002850 0%, #001736 100%);
              border: 1px solid rgba(255,255,255,0.1);
              border-radius: 4px;
              transform: skewX(-15deg);
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 0 28px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.4);
            }
            .team-left-info {
              display: flex;
              align-items: center;
              gap: 14px;
              transform: skewX(15deg);
            }
            .noc-code { font-size: 20px; font-weight: 900; font-style: italic; color: #ffffff; width: 45px; }
            .flag-box { font-size: 22px; color: #ffffff; }
            .team-fullname { font-size: 22px; font-weight: 900; font-style: italic; color: #ffffff; text-transform: uppercase; letter-spacing: 1.2px; }
            
            .score-right-info {
              display: flex;
              align-items: center;
              gap: 10px;
              transform: skewX(15deg);
            }
            .pso-text { font-size: 18px; font-weight: 900; font-style: italic; color: #ffd700; }
            .score-num { font-size: 24px; font-weight: 900; font-style: italic; color: #ffffff; width: 30px; text-align: right; }
          </style>
        </head>
        <body>
          <div class="m-res-wrapper">
            <div class="m-res-head">
              <div class="head-left">
                <span class="sport-icon">⚽</span>
                <div class="title-box">
                  <span class="event-title">${eventTitle}</span>
                  <div class="sub-pill-row">
                    <span>${matchStage}</span>
                    <span>${matchStatus}</span>
                  </div>
                </div>
              </div>
              <svg class="rings-svg" width="75" height="34" viewBox="0 0 100 50" fill="none" stroke="#ffd700" stroke-width="5" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.9));">
                <circle cx="20" cy="20" r="14" />
                <circle cx="50" cy="20" r="14" />
                <circle cx="80" cy="20" r="14" />
                <circle cx="35" cy="32" r="14" />
                <circle cx="65" cy="32" r="14" />
              </svg>
            </div>

            <div class="team-score-row">
              <div class="team-left-info">
                <span class="noc-code">${team1Noc}</span>
                <span class="flag-box">${team1Flag}</span>
                <span class="team-fullname">${team1Name}</span>
              </div>
              <div class="score-right-info">
                ${team1Pso ? `<span class="pso-text">${team1Pso}</span>` : ''}
                <span class="score-num">${team1Score}</span>
              </div>
            </div>

            <div class="team-score-row">
              <div class="team-left-info">
                <span class="noc-code">${team2Noc}</span>
                <span class="flag-box">${team2Flag}</span>
                <span class="team-fullname">${team2Name}</span>
              </div>
              <div class="score-right-info">
                ${team2Pso ? `<span class="pso-text">${team2Pso}</span>` : ''}
                <span class="score-num">${team2Score}</span>
              </div>
            </div>
          </div>
        </body>
        </html>
      `;
    }

    case "football-match-statistics": {
      const team1Noc = (data.team1Noc || data.noc1 || "BEL").toUpperCase();
      const team1Flag = data.team1Flag || data.flag1 || "🇧🇪";
      const team2Noc = (data.team2Noc || data.noc2 || "BRA").toUpperCase();
      const team2Flag = data.team2Flag || data.flag2 || "🇧🇷";
      const subTitle = (data.subTitle || "MATCH STATISTICS").toUpperCase();

      const statsList = Array.isArray(data.stats) ? data.stats : [
        { label: "GOALS / SHOTS ON GOAL", val1: "0 / 8", val2: "3 / 9" },
        { label: "CORNERS", val1: "7", val2: "1" },
        { label: "FREE KICKS", val1: "0", val2: "1" },
        { label: "FOULS", val1: "21", val2: "13" },
        { label: "OFFSIDES", val1: "2", val2: "5" },
        { label: "CARDS", val1: "🟨 0  🟨 0  🟥 0", val2: "🟨 4  🟨 0  🟥 1", isCards: true },
        { label: "BALL POSSESSION", val1: "51%", val2: "49%" }
      ];

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,700;1,900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: 'Outfit', sans-serif; }
            
            .match-stats-wrapper {
              position: absolute;
              bottom: 90px;
              left: 90px;
              width: 1050px;
              display: flex;
              flex-direction: column;
              gap: 3px;
              animation: slideIn 0.4s ease-out;
            }
            @keyframes slideIn { from { transform: translateX(-80px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

            .m-stats-head {
              height: 60px;
              background: linear-gradient(180deg, #00508c 0%, #002b54 50%, #001938 100%);
              border: 2px solid #001f3f;
              border-radius: 6px;
              transform: skewX(-15deg);
              box-shadow: 0 10px 30px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.4);
              padding: 0 24px;
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
            .head-team {
              display: flex;
              align-items: center;
              gap: 12px;
              transform: skewX(15deg);
            }
            .noc-code { font-size: 24px; font-weight: 900; font-style: italic; color: #ffffff; letter-spacing: 1px; }
            .flag-box { font-size: 24px; color: #ffffff; }
            .title-pill {
              background: linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%);
              color: #002850;
              font-size: 15px;
              font-weight: 900;
              font-style: italic;
              padding: 4px 24px;
              border-radius: 4px;
              letter-spacing: 1.2px;
              transform: skewX(15deg);
              box-shadow: 0 2px 8px rgba(0,0,0,0.4);
            }

            .m-stats-row {
              height: 42px;
              background: linear-gradient(180deg, #002850 0%, #001736 100%);
              border: 1px solid rgba(255,255,255,0.1);
              border-radius: 4px;
              transform: skewX(-15deg);
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 0 28px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.4);
            }
            .row-val-left {
              flex: 1;
              transform: skewX(15deg);
              font-size: 20px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              text-align: left;
            }
            .row-label {
              flex: 2;
              transform: skewX(15deg);
              font-size: 18px;
              font-weight: 900;
              font-style: italic;
              color: #38bdf8;
              text-align: center;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            .row-val-right {
              flex: 1;
              transform: skewX(15deg);
              font-size: 20px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              text-align: right;
            }
          </style>
        </head>
        <body>
          <div class="match-stats-wrapper">
            <div class="m-stats-head">
              <div class="head-team">
                <span class="noc-code">${team1Noc}</span>
                <span class="flag-box">${team1Flag}</span>
              </div>
              <div class="title-pill">
                <span>${subTitle}</span>
              </div>
              <div class="head-team">
                <span class="noc-code">${team2Noc}</span>
                <span class="flag-box">${team2Flag}</span>
              </div>
            </div>

            ${statsList.map(st => `
              <div class="m-stats-row">
                <span class="row-val-left">${st.val1}</span>
                <span class="row-label">${st.label}</span>
                <span class="row-val-right">${st.val2}</span>
              </div>
            `).join('')}
          </div>
        </body>
        </html>
      `;
    }

    case "football-crunch-stats": {
      const statLabel = (data.statLabel || data.label || "SHOTS ON GOAL").toUpperCase();

      const team1Noc = (data.team1Noc || data.noc1 || "ARG").toUpperCase();
      const team1Flag = data.team1Flag || data.flag1 || "🇦🇷";
      const team1Val = data.team1Val !== undefined ? data.team1Val : (data.val1 !== undefined ? data.val1 : "5");

      const team2Noc = (data.team2Noc || data.noc2 || "BRA").toUpperCase();
      const team2Flag = data.team2Flag || data.flag2 || "🇧🇷";
      const team2Val = data.team2Val !== undefined ? data.team2Val : (data.val2 !== undefined ? data.val2 : "4");

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,700;1,900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: 'Outfit', sans-serif; }
            
            .crunch-stat-wrapper {
              position: absolute;
              bottom: 90px;
              left: 120px;
              width: 260px;
              display: flex;
              flex-direction: column;
              gap: 2px;
              animation: slideIn 0.4s ease-out;
            }
            @keyframes slideIn { from { transform: translateX(-40px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

            .stat-inset-pill {
              align-self: center;
              background: linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%);
              color: #002850;
              font-size: 13px;
              font-weight: 900;
              font-style: italic;
              padding: 3px 20px;
              border-radius: 4px 4px 0 0;
              transform: skewX(-15deg);
              letter-spacing: 1px;
              box-shadow: 0 -2px 6px rgba(0,0,0,0.3);
              margin-bottom: -3px;
              z-index: 2;
            }

            .team-row {
              height: 38px;
              background: linear-gradient(180deg, #004077 0%, #002244 50%, #001228 100%);
              border: 1px solid #001f3f;
              border-radius: 4px;
              transform: skewX(-15deg);
              box-shadow: 0 4px 14px rgba(0,0,0,0.6);
              padding: 0 16px;
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
            .team-info {
              display: flex;
              align-items: center;
              gap: 10px;
              transform: skewX(15deg);
            }
            .noc-text {
              font-size: 18px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              letter-spacing: 0.5px;
            }
            .flag-box { font-size: 18px; }
            .val-text {
              font-size: 22px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              transform: skewX(15deg);
              min-width: 24px;
              text-align: right;
            }
          </style>
        </head>
        <body>
          <div class="crunch-stat-wrapper">
            <div class="stat-inset-pill">
              <span style="display:inline-block; transform: skewX(15deg);">${statLabel}</span>
            </div>

            <div class="team-row">
              <div class="team-info">
                <span class="noc-text">${team1Noc}</span>
                <span class="flag-box">${team1Flag}</span>
              </div>
              <span class="val-text">${team1Val}</span>
            </div>

            <div class="team-row">
              <div class="team-info">
                <span class="noc-text">${team2Noc}</span>
                <span class="flag-box">${team2Flag}</span>
              </div>
              <span class="val-text">${team2Val}</span>
            </div>
          </div>
        </body>
        </html>
      `;
    }

    case "football-coach-id": {
      const countryCode = (data.country || data.noc || "ARG").toUpperCase();
      const flagStr = data.flag || "🇦🇷";
      const coachName = (data.coach || data.name || "SERGIO BATISTA").toUpperCase();
      const roleTitle = (data.role || data.title || "COACH").toUpperCase();

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,700;1,900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: 'Outfit', sans-serif; }
            
            .c-id-wrapper {
              position: absolute;
              bottom: 90px;
              left: 90px;
              width: 860px;
              display: flex;
              flex-direction: column;
              gap: 3px;
              animation: slideIn 0.4s ease-out;
            }
            @keyframes slideIn { from { transform: translateX(-80px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

            .c-id-head {
              height: 56px;
              background: linear-gradient(180deg, #00508c 0%, #002b54 50%, #001938 100%);
              border: 2px solid #001f3f;
              border-radius: 6px;
              transform: skewX(-15deg);
              box-shadow: 0 10px 30px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.4);
              padding: 0 24px;
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
            .head-left {
              display: flex;
              align-items: center;
              gap: 16px;
              transform: skewX(15deg);
            }
            .country-code { font-size: 24px; font-weight: 900; font-style: italic; color: #ffffff; letter-spacing: 1px; }
            .flag-box { font-size: 24px; color: #ffffff; }
            .coach-name {
              font-size: 28px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              text-transform: uppercase;
              letter-spacing: 1.5px;
              text-shadow: 0 2px 4px rgba(0,0,0,0.6);
            }
            .rings-svg { transform: skewX(15deg); }

            .c-id-sub {
              height: 44px;
              background: linear-gradient(180deg, #002850 0%, #001736 100%);
              border: 1px solid rgba(255,255,255,0.1);
              border-radius: 4px;
              transform: skewX(-15deg);
              display: flex;
              align-items: center;
              padding: 0 24px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.4);
            }
            .role-title-text {
              transform: skewX(15deg);
              font-size: 22px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              letter-spacing: 1.2px;
              text-transform: uppercase;
            }
          </style>
        </head>
        <body>
          <div class="c-id-wrapper">
            <div class="c-id-head">
              <div class="head-left">
                <span class="country-code">${countryCode}</span>
                <span class="flag-box">${flagStr}</span>
                <span class="coach-name">${coachName}</span>
              </div>
              <svg class="rings-svg" width="75" height="34" viewBox="0 0 100 50" fill="none" stroke="#ffd700" stroke-width="5" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.9));">
                <circle cx="20" cy="20" r="14" />
                <circle cx="50" cy="20" r="14" />
                <circle cx="80" cy="20" r="14" />
                <circle cx="35" cy="32" r="14" />
                <circle cx="65" cy="32" r="14" />
              </svg>
            </div>

            <div class="c-id-sub">
              <span class="role-title-text">${roleTitle}</span>
            </div>
          </div>
        </body>
        </html>
      `;
    }

    case "football-captain-id": {
      const countryCode = (data.country || data.noc || "ARG").toUpperCase();
      const flagStr = data.flag || "🇦🇷";
      const shirtNum = data.shirt || data.bib || "10";
      const playerName = (data.athlete || data.player || data.name || "JUAN RIQUELME").toUpperCase();
      const roleTitle = (data.role || data.title || "CAPTAIN").toUpperCase();

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,700;1,900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: 'Outfit', sans-serif; }
            
            .c-id-wrapper {
              position: absolute;
              bottom: 90px;
              left: 90px;
              width: 860px;
              display: flex;
              flex-direction: column;
              gap: 3px;
              animation: slideIn 0.4s ease-out;
            }
            @keyframes slideIn { from { transform: translateX(-80px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

            .c-id-head {
              height: 56px;
              background: linear-gradient(180deg, #00508c 0%, #002b54 50%, #001938 100%);
              border: 2px solid #001f3f;
              border-radius: 6px;
              transform: skewX(-15deg);
              box-shadow: 0 10px 30px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.4);
              padding: 0 24px;
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
            .head-left {
              display: flex;
              align-items: center;
              gap: 16px;
              transform: skewX(15deg);
            }
            .country-code { font-size: 24px; font-weight: 900; font-style: italic; color: #ffffff; letter-spacing: 1px; }
            .flag-box { font-size: 24px; color: #ffffff; }
            .shirt-num { font-size: 26px; font-weight: 900; font-style: italic; color: #38bdf8; margin-left: 4px; }
            .player-name {
              font-size: 28px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              text-transform: uppercase;
              letter-spacing: 1.5px;
              text-shadow: 0 2px 4px rgba(0,0,0,0.6);
            }
            .rings-svg { transform: skewX(15deg); }

            .c-id-sub {
              height: 44px;
              background: linear-gradient(180deg, #002850 0%, #001736 100%);
              border: 1px solid rgba(255,255,255,0.1);
              border-radius: 4px;
              transform: skewX(-15deg);
              display: flex;
              align-items: center;
              padding: 0 24px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.4);
            }
            .role-title-text {
              transform: skewX(15deg);
              font-size: 22px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              letter-spacing: 1.2px;
              text-transform: uppercase;
            }
          </style>
        </head>
        <body>
          <div class="c-id-wrapper">
            <div class="c-id-head">
              <div class="head-left">
                <span class="country-code">${countryCode}</span>
                <span class="flag-box">${flagStr}</span>
                <span class="shirt-num">${shirtNum}</span>
                <span class="player-name">${playerName}</span>
              </div>
              <svg class="rings-svg" width="75" height="34" viewBox="0 0 100 50" fill="none" stroke="#ffd700" stroke-width="5" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.9));">
                <circle cx="20" cy="20" r="14" />
                <circle cx="50" cy="20" r="14" />
                <circle cx="80" cy="20" r="14" />
                <circle cx="35" cy="32" r="14" />
                <circle cx="65" cy="32" r="14" />
              </svg>
            </div>

            <div class="c-id-sub">
              <span class="role-title-text">${roleTitle}</span>
            </div>
          </div>
        </body>
        </html>
      `;
    }

    case "football-substitution-single": {
      const countryCode = (data.country || data.noc || "ARG").toUpperCase();
      const flagStr = data.flag || "🇦🇷";
      const shirtNum = data.shirt || data.bib || "7";
      const playerName = (data.athlete || data.player || data.name || "JOSE SOSA").toUpperCase();
      const subType = (data.subType || data.direction || "in").toLowerCase();
      const isOut = subType === "out" || subType === "off";

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,700;1,900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: 'Outfit', sans-serif; }
            
            .sub-id-wrapper {
              position: absolute;
              bottom: 90px;
              left: 90px;
              width: 780px;
              height: 56px;
              background: linear-gradient(180deg, #00508c 0%, #002b54 50%, #001938 100%);
              border: 2px solid #001f3f;
              border-radius: 6px;
              transform: skewX(-15deg);
              box-shadow: 0 10px 30px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.4);
              padding: 0 16px 0 24px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              animation: slideIn 0.4s ease-out;
            }
            @keyframes slideIn { from { transform: skewX(-15deg) translateX(-80px); opacity: 0; } to { transform: skewX(-15deg) translateX(0); opacity: 1; } }

            .sub-id-left {
              display: flex;
              align-items: center;
              gap: 16px;
              transform: skewX(15deg);
            }
            .country-code { font-size: 24px; font-weight: 900; font-style: italic; color: #ffffff; letter-spacing: 1px; }
            .flag-box { font-size: 24px; color: #ffffff; }
            .shirt-num { font-size: 26px; font-weight: 900; font-style: italic; color: #38bdf8; margin-left: 4px; }
            .player-name {
              font-size: 28px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              text-transform: uppercase;
              letter-spacing: 1.5px;
              text-shadow: 0 2px 4px rgba(0,0,0,0.6);
            }
            .arrow-badge {
              transform: skewX(15deg);
              width: 32px;
              height: 32px;
              border-radius: 4px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 20px;
              font-weight: 900;
              color: #ffffff;
              box-shadow: 0 2px 6px rgba(0,0,0,0.4);
            }
            .arrow-out { background: linear-gradient(180deg, #ef4444 0%, #991b1b 100%); }
            .arrow-in { background: linear-gradient(180deg, #10b981 0%, #065f46 100%); }
          </style>
        </head>
        <body>
          <div class="sub-id-wrapper">
            <div class="sub-id-left">
              <span class="country-code">${countryCode}</span>
              <span class="flag-box">${flagStr}</span>
              <span class="shirt-num">${shirtNum}</span>
              <span class="player-name">${playerName}</span>
            </div>
            <div class="arrow-badge ${isOut ? 'arrow-out' : 'arrow-in'}">
              ${isOut ? '↙' : '↗'}
            </div>
          </div>
        </body>
        </html>
      `;
    }

    case "football-substitution-event": {
      const countryCode = (data.country || data.noc || "ARG").toUpperCase();
      const flagStr = data.flag || "🇦🇷";
      const teamName = (data.teamName || data.name || "ARGENTINA").toUpperCase();

      const playerOutShirt = data.outShirt || data.shirtOut || "10";
      const playerOutName = (data.outName || data.playerOut || "JUAN RIQUELME").toUpperCase();

      const playerInShirt = data.inShirt || data.shirtIn || "7";
      const playerInName = (data.inName || data.playerIn || "JOSE SOSA").toUpperCase();

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,700;1,900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: 'Outfit', sans-serif; }
            
            .sub-evt-wrapper {
              position: absolute;
              bottom: 90px;
              left: 90px;
              width: 680px;
              display: flex;
              flex-direction: column;
              gap: 3px;
              animation: slideIn 0.4s ease-out;
            }
            @keyframes slideIn { from { transform: translateX(-80px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

            .sub-head-bar {
              height: 52px;
              background: linear-gradient(180deg, #00508c 0%, #002b54 50%, #001938 100%);
              border: 2px solid #001f3f;
              border-radius: 6px;
              transform: skewX(-15deg);
              box-shadow: 0 10px 30px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.4);
              padding: 0 24px;
              display: flex;
              align-items: center;
              gap: 16px;
            }
            .head-inner {
              display: flex;
              align-items: center;
              gap: 16px;
              transform: skewX(15deg);
            }
            .country-code { font-size: 24px; font-weight: 900; font-style: italic; color: #ffffff; letter-spacing: 1px; }
            .flag-box { font-size: 24px; color: #ffffff; }
            .team-title {
              font-size: 26px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              letter-spacing: 1.5px;
              text-transform: uppercase;
              text-shadow: 0 2px 4px rgba(0,0,0,0.6);
            }

            .sub-row {
              height: 42px;
              background: linear-gradient(180deg, #002850 0%, #001736 100%);
              border: 1px solid rgba(255,255,255,0.1);
              border-radius: 4px;
              transform: skewX(-15deg);
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 0 16px 0 24px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.4);
            }
            .row-left {
              display: flex;
              align-items: center;
              gap: 14px;
              transform: skewX(15deg);
            }
            .shirt-num {
              font-size: 22px;
              font-weight: 900;
              font-style: italic;
              color: #38bdf8;
              width: 30px;
              text-align: right;
            }
            .player-name {
              font-size: 22px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              text-transform: uppercase;
              letter-spacing: 1.2px;
            }
            .arrow-badge {
              transform: skewX(15deg);
              width: 28px;
              height: 28px;
              border-radius: 4px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 18px;
              font-weight: 900;
              color: #ffffff;
              box-shadow: 0 2px 6px rgba(0,0,0,0.4);
            }
            .arrow-out { background: linear-gradient(180deg, #ef4444 0%, #991b1b 100%); }
            .arrow-in { background: linear-gradient(180deg, #10b981 0%, #065f46 100%); }
          </style>
        </head>
        <body>
          <div class="sub-evt-wrapper">
            <div class="sub-head-bar">
              <div class="head-inner">
                <span class="country-code">${countryCode}</span>
                <span class="flag-box">${flagStr}</span>
                <span class="team-title">${teamName}</span>
              </div>
            </div>

            <div class="sub-row">
              <div class="row-left">
                <span class="shirt-num">${playerOutShirt}</span>
                <span class="player-name">${playerOutName}</span>
              </div>
              <div class="arrow-badge arrow-out">↙</div>
            </div>

            <div class="sub-row">
              <div class="row-left">
                <span class="shirt-num">${playerInShirt}</span>
                <span class="player-name">${playerInName}</span>
              </div>
              <div class="arrow-badge arrow-in">↗</div>
            </div>
          </div>
        </body>
        </html>
      `;
    }

    case "football-tournament-player-stats": {
      const topTag = (data.tag || "TOURNAMENT").toUpperCase();
      const countryCode = (data.country || data.noc || "ARG").toUpperCase();
      const flagStr = data.flag || "🇦🇷";
      const shirtNum = data.shirt || data.bib || "9";
      const playerName = (data.athlete || data.player || data.name || "EZEQUIEL LAVEZZI").toUpperCase();
      const statLabel = (data.statLabel || data.label || "GOALS").toUpperCase();
      const statValue = data.statValue !== undefined ? data.statValue : (data.value !== undefined ? data.value : "2");

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,700;1,900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: 'Outfit', sans-serif; }
            
            .tourn-stat-wrapper {
              position: absolute;
              bottom: 90px;
              left: 90px;
              width: 860px;
              display: flex;
              flex-direction: column;
              gap: 3px;
              animation: slideIn 0.4s ease-out;
            }
            @keyframes slideIn { from { transform: translateX(-80px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

            .top-inset-pill {
              align-self: flex-start;
              margin-left: 50px;
              background: linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%);
              color: #002850;
              font-size: 13px;
              font-weight: 900;
              font-style: italic;
              padding: 3px 18px;
              border-radius: 4px 4px 0 0;
              transform: skewX(-15deg);
              letter-spacing: 1px;
              box-shadow: 0 -2px 6px rgba(0,0,0,0.3);
              margin-bottom: -4px;
              z-index: 2;
            }

            .p-stat-head {
              height: 56px;
              background: linear-gradient(180deg, #00508c 0%, #002b54 50%, #001938 100%);
              border: 2px solid #001f3f;
              border-radius: 6px;
              transform: skewX(-15deg);
              box-shadow: 0 10px 30px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.4);
              padding: 0 24px;
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
            .head-left {
              display: flex;
              align-items: center;
              gap: 16px;
              transform: skewX(15deg);
            }
            .country-code { font-size: 24px; font-weight: 900; font-style: italic; color: #ffffff; letter-spacing: 1px; }
            .flag-box { font-size: 24px; color: #ffffff; }
            .shirt-num { font-size: 26px; font-weight: 900; font-style: italic; color: #38bdf8; margin-left: 4px; }
            .player-name {
              font-size: 28px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              text-transform: uppercase;
              letter-spacing: 1.5px;
              text-shadow: 0 2px 4px rgba(0,0,0,0.6);
            }
            .rings-svg { transform: skewX(15deg); }

            .p-stat-sub {
              height: 44px;
              background: linear-gradient(180deg, #002850 0%, #001736 100%);
              border: 1px solid rgba(255,255,255,0.1);
              border-radius: 4px;
              transform: skewX(-15deg);
              display: flex;
              align-items: center;
              gap: 16px;
              padding: 0 24px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.4);
            }
            .stat-label-text {
              transform: skewX(15deg);
              font-size: 22px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              letter-spacing: 1px;
            }
            .stat-val-text {
              transform: skewX(15deg);
              font-size: 22px;
              font-weight: 900;
              font-style: italic;
              color: #38bdf8;
              margin-left: 10px;
            }
          </style>
        </head>
        <body>
          <div class="tourn-stat-wrapper">
            <div class="top-inset-pill">
              <span style="display:inline-block; transform: skewX(15deg);">${topTag}</span>
            </div>
            <div class="p-stat-head">
              <div class="head-left">
                <span class="country-code">${countryCode}</span>
                <span class="flag-box">${flagStr}</span>
                <span class="shirt-num">${shirtNum}</span>
                <span class="player-name">${playerName}</span>
              </div>
              <svg class="rings-svg" width="75" height="34" viewBox="0 0 100 50" fill="none" stroke="#ffd700" stroke-width="5" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.9));">
                <circle cx="20" cy="20" r="14" />
                <circle cx="50" cy="20" r="14" />
                <circle cx="80" cy="20" r="14" />
                <circle cx="35" cy="32" r="14" />
                <circle cx="65" cy="32" r="14" />
              </svg>
            </div>

            <div class="p-stat-sub">
              <span class="stat-label-text">${statLabel}</span>
              <span class="stat-val-text">${statValue}</span>
            </div>
          </div>
        </body>
        </html>
      `;
    }

    case "football-player-stats": {
      const countryCode = (data.country || data.noc || "ARG").toUpperCase();
      const flagStr = data.flag || "🇦🇷";
      const shirtNum = data.shirt || data.bib || "16";
      const playerName = (data.athlete || data.player || data.name || "SERGIO AGUERO").toUpperCase();
      const statLabel = (data.statLabel || data.label || "GOALS").toUpperCase();
      const statValue = data.statValue !== undefined ? data.statValue : (data.value !== undefined ? data.value : "2");

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,700;1,900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: 'Outfit', sans-serif; }
            
            .p-stat-wrapper {
              position: absolute;
              bottom: 90px;
              left: 90px;
              width: 860px;
              display: flex;
              flex-direction: column;
              gap: 3px;
              animation: slideIn 0.4s ease-out;
            }
            @keyframes slideIn { from { transform: translateX(-80px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

            .p-stat-head {
              height: 56px;
              background: linear-gradient(180deg, #00508c 0%, #002b54 50%, #001938 100%);
              border: 2px solid #001f3f;
              border-radius: 6px;
              transform: skewX(-15deg);
              box-shadow: 0 10px 30px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.4);
              padding: 0 24px;
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
            .head-left {
              display: flex;
              align-items: center;
              gap: 16px;
              transform: skewX(15deg);
            }
            .country-code { font-size: 24px; font-weight: 900; font-style: italic; color: #ffffff; letter-spacing: 1px; }
            .flag-box { font-size: 24px; color: #ffffff; }
            .shirt-num { font-size: 26px; font-weight: 900; font-style: italic; color: #38bdf8; margin-left: 4px; }
            .player-name {
              font-size: 28px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              text-transform: uppercase;
              letter-spacing: 1.5px;
              text-shadow: 0 2px 4px rgba(0,0,0,0.6);
            }
            .rings-svg { transform: skewX(15deg); }

            .p-stat-sub {
              height: 44px;
              background: linear-gradient(180deg, #002850 0%, #001736 100%);
              border: 1px solid rgba(255,255,255,0.1);
              border-radius: 4px;
              transform: skewX(-15deg);
              display: flex;
              align-items: center;
              gap: 16px;
              padding: 0 24px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.4);
            }
            .stat-label-text {
              transform: skewX(15deg);
              font-size: 22px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              letter-spacing: 1px;
            }
            .stat-val-text {
              transform: skewX(15deg);
              font-size: 22px;
              font-weight: 900;
              font-style: italic;
              color: #38bdf8;
              margin-left: 10px;
            }
          </style>
        </head>
        <body>
          <div class="p-stat-wrapper">
            <div class="p-stat-head">
              <div class="head-left">
                <span class="country-code">${countryCode}</span>
                <span class="flag-box">${flagStr}</span>
                <span class="shirt-num">${shirtNum}</span>
                <span class="player-name">${playerName}</span>
              </div>
              <svg class="rings-svg" width="75" height="34" viewBox="0 0 100 50" fill="none" stroke="#ffd700" stroke-width="5" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.9));">
                <circle cx="20" cy="20" r="14" />
                <circle cx="50" cy="20" r="14" />
                <circle cx="80" cy="20" r="14" />
                <circle cx="35" cy="32" r="14" />
                <circle cx="65" cy="32" r="14" />
              </svg>
            </div>

            <div class="p-stat-sub">
              <span class="stat-label-text">${statLabel}</span>
              <span class="stat-val-text">${statValue}</span>
            </div>
          </div>
        </body>
        </html>
      `;
    }

    case "football-crunch-scoreboard": {
      const team1Noc = (data.team1Noc || data.noc1 || "NGR").toUpperCase();
      const team1Flag = data.team1Flag || data.flag1 || "🇳🇬";
      const team1Score = data.team1Score !== undefined ? data.team1Score : "2";

      const team2Noc = (data.team2Noc || data.noc2 || "CIV").toUpperCase();
      const team2Flag = data.team2Flag || data.flag2 || "🇨🇮";
      const team2Score = data.team2Score !== undefined ? data.team2Score : "0";

      const matchTime = data.time || data.clock || "21:45";
      const matchPeriod = (data.period || data.half || "1ST").toUpperCase();

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,700;1,900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: 'Outfit', sans-serif; }
            
            .crunch-wrapper {
              position: absolute;
              top: 90px;
              left: 120px;
              width: 240px;
              display: flex;
              flex-direction: column;
              gap: 2px;
              animation: fadeInDown 0.4s ease-out;
            }
            @keyframes fadeInDown { from { transform: translateY(-30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

            .team-row {
              height: 36px;
              background: linear-gradient(180deg, #004077 0%, #002244 50%, #001228 100%);
              border: 1px solid #001f3f;
              border-radius: 4px;
              transform: skewX(-15deg);
              box-shadow: 0 4px 14px rgba(0,0,0,0.6);
              padding: 0 12px;
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
            .team-info {
              display: flex;
              align-items: center;
              gap: 8px;
              transform: skewX(15deg);
            }
            .noc-text {
              font-size: 17px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              letter-spacing: 0.5px;
            }
            .flag-box { font-size: 16px; }
            .score-val {
              font-size: 20px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              transform: skewX(15deg);
              min-width: 24px;
              text-align: right;
            }

            .timer-row {
              height: 32px;
              display: flex;
              gap: 2px;
              transform: skewX(-15deg);
            }
            .time-pill {
              flex: 1.4;
              background: linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%);
              border-radius: 4px;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 2px 8px rgba(0,0,0,0.4);
            }
            .time-text {
              transform: skewX(15deg);
              font-size: 16px;
              font-weight: 900;
              font-style: italic;
              color: #001736;
              letter-spacing: 1px;
            }
            .period-pill {
              flex: 1;
              background: linear-gradient(180deg, #003366 0%, #001530 100%);
              border-radius: 4px;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 2px 8px rgba(0,0,0,0.4);
            }
            .period-text {
              transform: skewX(15deg);
              font-size: 16px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              letter-spacing: 1px;
            }
          </style>
        </head>
        <body>
          <div class="crunch-wrapper">
            <div class="team-row">
              <div class="team-info">
                <span class="noc-text">${team1Noc}</span>
                <span class="flag-box">${team1Flag}</span>
              </div>
              <span class="score-val">${team1Score}</span>
            </div>

            <div class="team-row">
              <div class="team-info">
                <span class="noc-text">${team2Noc}</span>
                <span class="flag-box">${team2Flag}</span>
              </div>
              <span class="score-val">${team2Score}</span>
            </div>

            <div class="timer-row">
              <div class="time-pill">
                <span class="time-text">${matchTime}</span>
              </div>
              <div class="period-pill">
                <span class="period-text">${matchPeriod}</span>
              </div>
            </div>
          </div>
        </body>
        </html>
      `;
    }

    case "football-player-id": {
      const countryCode = (data.country || data.noc || "ARG").toUpperCase();
      const flagStr = data.flag || "🇦🇷";
      const shirtNum = data.shirt || data.bib || "5";
      const playerName = (data.athlete || data.player || data.name || "FERNANDO GAGO").toUpperCase();
      const cardColor = data.card ? (data.card.toLowerCase().includes("yellow") ? "#eab308" : "#ef4444") : null;

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,700;1,900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: 'Outfit', sans-serif; }
            
            .p-id-wrapper {
              position: absolute;
              bottom: 90px;
              left: 90px;
              width: 860px;
              height: 56px;
              background: linear-gradient(180deg, #00508c 0%, #002b54 50%, #001938 100%);
              border: 2px solid #001f3f;
              border-radius: 6px;
              transform: skewX(-15deg);
              box-shadow: 0 10px 30px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.4);
              padding: 0 24px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              animation: slideIn 0.4s ease-out;
            }
            @keyframes slideIn { from { transform: skewX(-15deg) translateX(-80px); opacity: 0; } to { transform: skewX(-15deg) translateX(0); opacity: 1; } }

            .p-id-left {
              display: flex;
              align-items: center;
              gap: 16px;
              transform: skewX(15deg);
            }
            .country-code {
              font-size: 24px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              letter-spacing: 1px;
            }
            .flag-box {
              font-size: 24px;
              color: #ffffff;
            }
            .shirt-num {
              font-size: 26px;
              font-weight: 900;
              font-style: italic;
              color: #38bdf8;
              margin-left: 4px;
            }
            .player-name {
              font-size: 28px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              text-transform: uppercase;
              letter-spacing: 1.5px;
              text-shadow: 0 2px 4px rgba(0,0,0,0.6);
            }
            .p-id-right {
              display: flex;
              align-items: center;
              gap: 16px;
              transform: skewX(15deg);
            }
            .card-badge {
              width: 14px;
              height: 22px;
              background: ${cardColor || '#ef4444'};
              border-radius: 2px;
              transform: skewX(-10deg);
              box-shadow: 0 2px 6px rgba(0,0,0,0.5);
            }
            .rings-svg {
              transform: skewX(15deg);
            }
          </style>
        </head>
        <body>
          <div class="p-id-wrapper">
            <div class="p-id-left">
              <span class="country-code">${countryCode}</span>
              <span class="flag-box">${flagStr}</span>
              <span class="shirt-num">${shirtNum}</span>
              <span class="player-name">${playerName}</span>
            </div>
            <div class="p-id-right">
              ${cardColor || data.card ? `<div class="card-badge"></div>` : ''}
              <svg class="rings-svg" width="75" height="34" viewBox="0 0 100 50" fill="none" stroke="#ffd700" stroke-width="5" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.9));">
                <circle cx="20" cy="20" r="14" />
                <circle cx="50" cy="20" r="14" />
                <circle cx="80" cy="20" r="14" />
                <circle cx="35" cy="32" r="14" />
                <circle cx="65" cy="32" r="14" />
              </svg>
            </div>
          </div>
        </body>
        </html>
      `;
    }

    case "football-officials-list": {
      const eventTitle = (data.event || "MEN'S FOOTBALL").toUpperCase();
      const subTitle = (data.subTitle || "OFFICIALS").toUpperCase();
      const officialsList = Array.isArray(data.officials) ? data.officials : [
        { noc: "URU", flag: "🇺🇾", name: "MARTIN VAZQUEZ", role: "REFEREE" },
        { noc: "URU", flag: "🇺🇾", name: "MAURICIO ESPINOSA", role: "ASSISTANT REFEREE 1" },
        { noc: "URU", flag: "🇺🇾", name: "MIGUEL NIEVAS", role: "ASSISTANT REFEREE 2" },
        { noc: "FRA", flag: "🇫🇷", name: "STEPHANE LANNOY", role: "4TH OFFICIAL" }
      ];

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,700;1,900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: 'Outfit', sans-serif; }
            
            .off-list-wrapper {
              position: absolute;
              bottom: 90px;
              left: 90px;
              width: 1050px;
              display: flex;
              flex-direction: column;
              gap: 3px;
              animation: slideIn 0.4s ease-out;
            }
            @keyframes slideIn { from { transform: translateX(-80px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

            .off-list-head {
              height: 60px;
              background: linear-gradient(180deg, #00508c 0%, #002b54 50%, #001938 100%);
              border: 2px solid #001f3f;
              border-radius: 6px;
              transform: skewX(-15deg);
              box-shadow: 0 10px 30px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.4);
              padding: 0 24px;
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
            .head-left {
              display: flex;
              align-items: center;
              gap: 16px;
              transform: skewX(15deg);
            }
            .sport-icon { font-size: 26px; line-height: 1; }
            .title-box { display: flex; flex-direction: column; }
            .event-title {
              font-size: 24px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              letter-spacing: 1.2px;
              text-transform: uppercase;
              text-shadow: 0 2px 4px rgba(0,0,0,0.6);
            }
            .sub-pill {
              background: linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%);
              color: #002850;
              font-size: 13px;
              font-weight: 900;
              font-style: italic;
              padding: 1px 12px;
              border-radius: 4px;
              letter-spacing: 1px;
              display: inline-block;
              margin-top: 2px;
            }
            .rings-svg { transform: skewX(15deg); }

            .off-row {
              height: 42px;
              background: linear-gradient(180deg, #002850 0%, #001736 100%);
              border: 1px solid rgba(255,255,255,0.1);
              border-radius: 4px;
              transform: skewX(-15deg);
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 0 24px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.4);
            }
            .row-left {
              display: flex;
              align-items: center;
              gap: 14px;
              transform: skewX(15deg);
            }
            .off-noc { font-size: 19px; font-weight: 900; font-style: italic; color: #ffffff; width: 45px; }
            .off-flag { font-size: 20px; color: #ffffff; }
            .off-name { font-size: 20px; font-weight: 900; font-style: italic; color: #ffffff; text-transform: uppercase; letter-spacing: 1.2px; }
            .row-right-role {
              font-size: 19px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              text-transform: uppercase;
              letter-spacing: 1px;
              transform: skewX(15deg);
            }
          </style>
        </head>
        <body>
          <div class="off-list-wrapper">
            <div class="off-list-head">
              <div class="head-left">
                <span class="sport-icon">⚽</span>
                <div class="title-box">
                  <span class="event-title">${eventTitle}</span>
                  <span class="sub-pill">${subTitle}</span>
                </div>
              </div>
              <svg class="rings-svg" width="75" height="34" viewBox="0 0 100 50" fill="none" stroke="#ffd700" stroke-width="5" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.9));">
                <circle cx="20" cy="20" r="14" />
                <circle cx="50" cy="20" r="14" />
                <circle cx="80" cy="20" r="14" />
                <circle cx="35" cy="32" r="14" />
                <circle cx="65" cy="32" r="14" />
              </svg>
            </div>

            ${officialsList.map(off => `
              <div class="off-row">
                <div class="row-left">
                  <span class="off-noc">${(off.noc || '').toUpperCase()}</span>
                  <span class="off-flag">${off.flag || ''}</span>
                  <span class="off-name">${(off.name || '').toUpperCase()}</span>
                </div>
                <span class="row-right-role">${(off.role || '').toUpperCase()}</span>
              </div>
            `).join('')}
          </div>
        </body>
        </html>
      `;
    }

    case "football-official-id": {
      const countryCode = (data.country || data.noc || "URU").toUpperCase();
      const flagStr = data.flag || "🇺🇾";
      const officialName = (data.officialName || data.name || "MAURICIO ESPINOSA").toUpperCase();
      const roleTitle = (data.role || data.title || "ASSISTANT REFEREE 1").toUpperCase();

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,700;1,900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: 'Outfit', sans-serif; }
            
            .off-wrapper {
              position: absolute;
              bottom: 90px;
              left: 90px;
              width: 1050px;
              display: flex;
              flex-direction: column;
              gap: 3px;
              animation: slideIn 0.4s ease-out;
            }
            @keyframes slideIn { from { transform: translateX(-80px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

            .off-head {
              height: 56px;
              background: linear-gradient(180deg, #00508c 0%, #002b54 50%, #001938 100%);
              border: 2px solid #001f3f;
              border-radius: 6px;
              transform: skewX(-15deg);
              box-shadow: 0 10px 30px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.4);
              padding: 0 24px;
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
            .head-left {
              display: flex;
              align-items: center;
              gap: 16px;
              transform: skewX(15deg);
            }
            .noc-code { font-size: 24px; font-weight: 900; font-style: italic; color: #ffffff; letter-spacing: 1px; }
            .flag-box { font-size: 24px; color: #ffffff; }
            .off-name {
              font-size: 28px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              text-transform: uppercase;
              letter-spacing: 1.5px;
              text-shadow: 0 2px 4px rgba(0,0,0,0.6);
            }
            .rings-svg { transform: skewX(15deg); }

            .off-sub-bar {
              height: 44px;
              background: linear-gradient(180deg, #002850 0%, #001736 100%);
              border: 1px solid rgba(255,255,255,0.1);
              border-radius: 4px;
              transform: skewX(-15deg);
              display: flex;
              align-items: center;
              padding: 0 24px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.4);
            }
            .off-role {
              transform: skewX(15deg);
              font-size: 22px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              text-transform: uppercase;
              letter-spacing: 1.2px;
            }
          </style>
        </head>
        <body>
          <div class="off-wrapper">
            <div class="off-head">
              <div class="head-left">
                <span class="noc-code">${countryCode}</span>
                <span class="flag-box">${flagStr}</span>
                <span class="off-name">${officialName}</span>
              </div>
              <svg class="rings-svg" width="75" height="34" viewBox="0 0 100 50" fill="none" stroke="#ffd700" stroke-width="5" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.9));">
                <circle cx="20" cy="20" r="14" />
                <circle cx="50" cy="20" r="14" />
                <circle cx="80" cy="20" r="14" />
                <circle cx="35" cy="32" r="14" />
                <circle cx="65" cy="32" r="14" />
              </svg>
            </div>

            <div class="off-sub-bar">
              <span class="off-role">${roleTitle}</span>
            </div>
          </div>
        </body>
        </html>
      `;
    }

    case "football-previous-results": {
      const teamNoc = (data.noc || data.country || "CMR").toUpperCase();
      const teamFlag = data.flag || "🇨🇲";
      const teamName = (data.teamName || data.name || "CAMEROON").toUpperCase();
      const teamRecord = data.record || "1 - 0 - 2";
      const subTitle = (data.subTitle || "PREVIOUS RESULTS").toUpperCase();

      const resultsList = Array.isArray(data.results) ? data.results : [
        { oppNoc: "KOR", oppFlag: "🇰🇷", oppName: "KOREA", group: "GROUP D", score: "1-1", outcome: "D" },
        { oppNoc: "HON", oppFlag: "🇭🇳", oppName: "HONDURAS", group: "GROUP D", score: "1-0", outcome: "W" },
        { oppNoc: "ITA", oppFlag: "🇮🇹", oppName: "ITALY", group: "GROUP D", score: "0-0", outcome: "D" }
      ];

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,700;1,900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: 'Outfit', sans-serif; }
            
            .prev-wrapper {
              position: absolute;
              bottom: 90px;
              left: 90px;
              width: 1050px;
              display: flex;
              flex-direction: column;
              gap: 3px;
              animation: slideIn 0.4s ease-out;
            }
            @keyframes slideIn { from { transform: translateX(-80px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

            .prev-head {
              height: 60px;
              background: linear-gradient(180deg, #00508c 0%, #002b54 50%, #001938 100%);
              border: 2px solid #001f3f;
              border-radius: 6px;
              transform: skewX(-15deg);
              box-shadow: 0 10px 30px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.4);
              padding: 0 24px;
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
            .head-left {
              display: flex;
              align-items: center;
              gap: 16px;
              transform: skewX(15deg);
            }
            .noc-code { font-size: 24px; font-weight: 900; font-style: italic; color: #ffffff; }
            .flag-box { font-size: 24px; color: #ffffff; }
            .title-box { display: flex; flex-direction: column; }
            .team-title {
              font-size: 24px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              letter-spacing: 1.2px;
              text-transform: uppercase;
              text-shadow: 0 2px 4px rgba(0,0,0,0.6);
            }
            .sub-pill {
              background: linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%);
              color: #002850;
              font-size: 13px;
              font-weight: 900;
              font-style: italic;
              padding: 1px 12px;
              border-radius: 4px;
              letter-spacing: 1px;
              display: inline-block;
              margin-top: 2px;
            }
            .rings-svg { transform: skewX(15deg); }

            .prev-row {
              height: 42px;
              background: linear-gradient(180deg, #002850 0%, #001736 100%);
              border: 1px solid rgba(255,255,255,0.1);
              border-radius: 4px;
              transform: skewX(-15deg);
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 0 24px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.4);
            }
            .row-left {
              display: flex;
              align-items: center;
              gap: 14px;
              transform: skewX(15deg);
            }
            .opp-noc { font-size: 19px; font-weight: 900; font-style: italic; color: #ffffff; width: 45px; }
            .opp-flag { font-size: 20px; color: #ffffff; }
            .opp-name { font-size: 20px; font-weight: 900; font-style: italic; color: #ffffff; text-transform: uppercase; letter-spacing: 1.2px; }
            .row-right {
              display: flex;
              align-items: center;
              gap: 24px;
              transform: skewX(15deg);
            }
            .match-group { font-size: 18px; font-weight: 900; font-style: italic; color: #38bdf8; text-transform: uppercase; letter-spacing: 1px; }
            .match-score { font-size: 20px; font-weight: 900; font-style: italic; color: #ffffff; letter-spacing: 1px; }
            .match-outcome { font-size: 20px; font-weight: 900; font-style: italic; color: #ffd700; width: 20px; text-align: center; }
          </style>
        </head>
        <body>
          <div class="prev-wrapper">
            <div class="prev-head">
              <div class="head-left">
                <span class="noc-code">${teamNoc}</span>
                <span class="flag-box">${teamFlag}</span>
                <div class="title-box">
                  <span class="team-title">${teamName} (${teamRecord})</span>
                  <span class="sub-pill">${subTitle}</span>
                </div>
              </div>
              <svg class="rings-svg" width="75" height="34" viewBox="0 0 100 50" fill="none" stroke="#ffd700" stroke-width="5" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.9));">
                <circle cx="20" cy="20" r="14" />
                <circle cx="50" cy="20" r="14" />
                <circle cx="80" cy="20" r="14" />
                <circle cx="35" cy="32" r="14" />
                <circle cx="65" cy="32" r="14" />
              </svg>
            </div>

            ${resultsList.map(res => `
              <div class="prev-row">
                <div class="row-left">
                  <span class="opp-noc">${(res.oppNoc || '').toUpperCase()}</span>
                  <span class="opp-flag">${res.oppFlag || ''}</span>
                  <span class="opp-name">${(res.oppName || '').toUpperCase()}</span>
                </div>
                <div class="row-right">
                  <span class="match-group">${(res.group || '').toUpperCase()}</span>
                  <span class="match-score">${res.score || ''}</span>
                  <span class="match-outcome" style="color: ${res.outcome === 'W' ? '#10b981' : res.outcome === 'L' ? '#ef4444' : '#ffd700'}">${res.outcome || ''}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </body>
        </html>
      `;
    }

    case "football-substitutes-list": {
      const teamNoc = (data.noc || data.country || "NZL").toUpperCase();
      const teamFlag = data.flag || "🇳🇿";
      const teamName = (data.teamName || data.name || "NEW ZEALAND").toUpperCase();
      const subTitle = (data.subTitle || "SUBSTITUTES").toUpperCase();

      const leftSubs = Array.isArray(data.leftSubs) ? data.leftSubs : [
        { shirt: "5", name: "RYAN NELSEN" },
        { shirt: "11", name: "JEREMY BROCKIE" },
        { shirt: "13", name: "SHAUN VAN ROOYEN" },
        { shirt: "14", name: "COLE TINKLER" }
      ];

      const rightSubs = Array.isArray(data.rightSubs) ? data.rightSubs : [
        { shirt: "15", name: "GREG DRAPER" },
        { shirt: "17", name: "SAM MESSAM" },
        { shirt: "18", name: "LIAM LITTLE", pos: "GK" }
      ];

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,700;1,900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: 'Outfit', sans-serif; }
            
            .subs-wrapper {
              position: absolute;
              bottom: 90px;
              left: 90px;
              width: 1050px;
              display: flex;
              flex-direction: column;
              gap: 3px;
              animation: slideIn 0.4s ease-out;
            }
            @keyframes slideIn { from { transform: translateX(-80px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

            .subs-head {
              height: 60px;
              background: linear-gradient(180deg, #00508c 0%, #002b54 50%, #001938 100%);
              border: 2px solid #001f3f;
              border-radius: 6px;
              transform: skewX(-15deg);
              box-shadow: 0 10px 30px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.4);
              padding: 0 24px;
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
            .head-left {
              display: flex;
              align-items: center;
              gap: 16px;
              transform: skewX(15deg);
            }
            .noc-code { font-size: 24px; font-weight: 900; font-style: italic; color: #ffffff; }
            .flag-box { font-size: 24px; color: #ffffff; }
            .title-box { display: flex; flex-direction: column; }
            .team-title {
              font-size: 24px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              letter-spacing: 1.2px;
              text-transform: uppercase;
              text-shadow: 0 2px 4px rgba(0,0,0,0.6);
            }
            .sub-pill {
              background: linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%);
              color: #002850;
              font-size: 13px;
              font-weight: 900;
              font-style: italic;
              padding: 1px 12px;
              border-radius: 4px;
              letter-spacing: 1px;
              display: inline-block;
              margin-top: 2px;
            }
            .rings-svg { transform: skewX(15deg); }

            .subs-row {
              height: 42px;
              background: linear-gradient(180deg, #002850 0%, #001736 100%);
              border: 1px solid rgba(255,255,255,0.1);
              border-radius: 4px;
              transform: skewX(-15deg);
              display: flex;
              align-items: center;
              padding: 0 24px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.4);
            }
            .col-half {
              flex: 1;
              display: flex;
              align-items: center;
              gap: 12px;
              transform: skewX(15deg);
            }
            .shirt-num {
              font-size: 18px;
              font-weight: 900;
              font-style: italic;
              color: #38bdf8;
              width: 24px;
              text-align: right;
            }
            .p-name {
              font-size: 19px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            .p-pos {
              font-size: 14px;
              font-weight: 900;
              font-style: italic;
              color: #ffd700;
              margin-left: 6px;
            }
          </style>
        </head>
        <body>
          <div class="subs-wrapper">
            <div class="subs-head">
              <div class="head-left">
                <span class="noc-code">${teamNoc}</span>
                <span class="flag-box">${teamFlag}</span>
                <div class="title-box">
                  <span class="team-title">${teamName}</span>
                  <span class="sub-pill">${subTitle}</span>
                </div>
              </div>
              <svg class="rings-svg" width="75" height="34" viewBox="0 0 100 50" fill="none" stroke="#ffd700" stroke-width="5" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.9));">
                <circle cx="20" cy="20" r="14" />
                <circle cx="50" cy="20" r="14" />
                <circle cx="80" cy="20" r="14" />
                <circle cx="35" cy="32" r="14" />
                <circle cx="65" cy="32" r="14" />
              </svg>
            </div>

            ${Array.from({ length: 4 }).map((_, idx) => {
              const lp = leftSubs[idx];
              const rp = rightSubs[idx];

              return `
                <div class="subs-row">
                  <div class="col-half">
                    ${lp ? `
                      <span class="p-name">${lp.name}</span>
                      ${lp.pos ? `<span class="p-pos">${lp.pos}</span>` : ''}
                    ` : ''}
                  </div>
                  <div class="col-half">
                    ${rp ? `
                      <span class="p-name">${rp.name}</span>
                      ${rp.pos ? `<span class="p-pos">${rp.pos}</span>` : ''}
                    ` : ''}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </body>
        </html>
      `;
    }

    case "football-starting-lineup": {
      const teamNoc = (data.noc || data.country || "NZL").toUpperCase();
      const teamFlag = data.flag || "🇳🇿";
      const teamName = (data.teamName || data.name || "NEW ZEALAND").toUpperCase();
      const subTitle = (data.subTitle || "STARTING LINEUP").toUpperCase();

      const leftPlayers = Array.isArray(data.leftPlayers) ? data.leftPlayers : [
        { shirt: "1", name: "JACOB SPOONLEY", pos: "GK" },
        { shirt: "2", name: "AARON SCOTT", pos: "C" },
        { shirt: "3", name: "IAN HOGG" },
        { shirt: "4", name: "COLE PEVERLEY" },
        { shirt: "6", name: "MICHAEL BOXALL" },
        { shirt: "7", name: "SIMON ELLIOTT" },
        { shirt: "8", name: "CRAIG HENDERSON" }
      ];

      const rightPlayers = Array.isArray(data.rightPlayers) ? data.rightPlayers : [
        { shirt: "9", name: "DANIEL ELLENSOHN" },
        { shirt: "10", name: "CHRIS KILLEN" },
        { shirt: "12", name: "STEVEN OLD" },
        { shirt: "16", name: "SAM JENKINS" }
      ];

      const coachName = (data.coach || "STU JACOBS").toUpperCase();

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,700;1,900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: 'Outfit', sans-serif; }
            
            .lineup-wrapper {
              position: absolute;
              bottom: 90px;
              left: 90px;
              width: 1050px;
              display: flex;
              flex-direction: column;
              gap: 3px;
              animation: slideIn 0.4s ease-out;
            }
            @keyframes slideIn { from { transform: translateX(-80px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

            .lineup-head {
              height: 60px;
              background: linear-gradient(180deg, #00508c 0%, #002b54 50%, #001938 100%);
              border: 2px solid #001f3f;
              border-radius: 6px;
              transform: skewX(-15deg);
              box-shadow: 0 10px 30px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.4);
              padding: 0 24px;
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
            .head-left {
              display: flex;
              align-items: center;
              gap: 16px;
              transform: skewX(15deg);
            }
            .noc-code { font-size: 24px; font-weight: 900; font-style: italic; color: #ffffff; }
            .flag-box { font-size: 24px; color: #ffffff; }
            .title-box { display: flex; flex-direction: column; }
            .team-title {
              font-size: 24px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              letter-spacing: 1.2px;
              text-transform: uppercase;
              text-shadow: 0 2px 4px rgba(0,0,0,0.6);
            }
            .sub-pill {
              background: linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%);
              color: #002850;
              font-size: 13px;
              font-weight: 900;
              font-style: italic;
              padding: 1px 12px;
              border-radius: 4px;
              letter-spacing: 1px;
              display: inline-block;
              margin-top: 2px;
            }
            .rings-svg { transform: skewX(15deg); }

            .lineup-row {
              height: 38px;
              background: linear-gradient(180deg, #002850 0%, #001736 100%);
              border: 1px solid rgba(255,255,255,0.1);
              border-radius: 4px;
              transform: skewX(-15deg);
              display: flex;
              align-items: center;
              padding: 0 24px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.4);
            }
            .col-half {
              flex: 1;
              display: flex;
              align-items: center;
              gap: 12px;
              transform: skewX(15deg);
            }
            .shirt-num {
              font-size: 18px;
              font-weight: 900;
              font-style: italic;
              color: #38bdf8;
              width: 24px;
              text-align: right;
            }
            .p-name {
              font-size: 18px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            .p-pos {
              font-size: 14px;
              font-weight: 900;
              font-style: italic;
              color: #ffd700;
              margin-left: 6px;
            }
            .coach-label {
              font-size: 14px;
              font-weight: 900;
              font-style: italic;
              color: #cbd5e1;
              letter-spacing: 1px;
              margin-left: 36px;
            }
          </style>
        </head>
        <body>
          <div class="lineup-wrapper">
            <div class="lineup-head">
              <div class="head-left">
                <span class="noc-code">${teamNoc}</span>
                <span class="flag-box">${teamFlag}</span>
                <div class="title-box">
                  <span class="team-title">${teamName}</span>
                  <span class="sub-pill">${subTitle}</span>
                </div>
              </div>
              <svg class="rings-svg" width="75" height="34" viewBox="0 0 100 50" fill="none" stroke="#ffd700" stroke-width="5" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.9));">
                <circle cx="20" cy="20" r="14" />
                <circle cx="50" cy="20" r="14" />
                <circle cx="80" cy="20" r="14" />
                <circle cx="35" cy="32" r="14" />
                <circle cx="65" cy="32" r="14" />
              </svg>
            </div>

            ${Array.from({ length: 7 }).map((_, idx) => {
              const lp = leftPlayers[idx];
              const rp = rightPlayers[idx];
              const isCoachLabelRow = idx === 5;
              const isCoachNameRow = idx === 6;

              return `
                <div class="lineup-row">
                  <div class="col-half">
                    ${lp ? `
                      <span class="shirt-num">${lp.shirt}</span>
                      <span class="p-name">${lp.name}</span>
                      ${lp.pos ? `<span class="p-pos">${lp.pos}</span>` : ''}
                    ` : ''}
                  </div>
                  <div class="col-half">
                    ${rp ? `
                      <span class="shirt-num">${rp.shirt}</span>
                      <span class="p-name">${rp.name}</span>
                      ${rp.pos ? `<span class="p-pos">${rp.pos}</span>` : ''}
                    ` : isCoachLabelRow ? `
                      <span class="coach-label">COACH</span>
                    ` : isCoachNameRow ? `
                      <span class="p-name" style="margin-left:36px;">${coachName}</span>
                    ` : ''}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </body>
        </html>
      `;
    }

    case "team-id-single": {
      const countryCode = (data.country || data.noc || "BEL").toUpperCase();
      const flagStr = data.flag || "🇧🇪";
      const teamName = (data.teamName || data.name || "BELGIUM").toUpperCase();

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,700;1,900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: 'Outfit', sans-serif; }
            
            .team-id-wrapper {
              position: absolute;
              bottom: 90px;
              left: 90px;
              width: 860px;
              height: 56px;
              background: linear-gradient(180deg, #00508c 0%, #002b54 50%, #001938 100%);
              border: 2px solid #001f3f;
              border-radius: 6px;
              transform: skewX(-15deg);
              box-shadow: 0 10px 30px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.4);
              padding: 0 24px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              animation: slideIn 0.4s ease-out;
            }
            @keyframes slideIn { from { transform: skewX(-15deg) translateX(-80px); opacity: 0; } to { transform: skewX(-15deg) translateX(0); opacity: 1; } }

            .team-id-left {
              display: flex;
              align-items: center;
              gap: 16px;
              transform: skewX(15deg);
            }
            .country-code {
              font-size: 24px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              letter-spacing: 1px;
            }
            .flag-box {
              font-size: 24px;
              color: #ffffff;
            }
            .team-name {
              font-size: 28px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              text-transform: uppercase;
              letter-spacing: 1.5px;
              text-shadow: 0 2px 4px rgba(0,0,0,0.6);
            }
            .rings-svg {
              transform: skewX(15deg);
            }
          </style>
        </head>
        <body>
          <div class="team-id-wrapper">
            <div class="team-id-left">
              <span class="country-code">${countryCode}</span>
              <span class="flag-box">${flagStr}</span>
              <span class="team-name">${teamName}</span>
            </div>
            <svg class="rings-svg" width="75" height="34" viewBox="0 0 100 50" fill="none" stroke="#ffd700" stroke-width="5" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.9));">
              <circle cx="20" cy="20" r="14" />
              <circle cx="50" cy="20" r="14" />
              <circle cx="80" cy="20" r="14" />
              <circle cx="35" cy="32" r="14" />
              <circle cx="65" cy="32" r="14" />
            </svg>
          </div>
        </body>
        </html>
      `;
    }

    case "football-group-standings": {
      const eventTitle = (data.event || "MEN'S FOOTBALL").toUpperCase();
      const subTitle = (data.subTitle || "STANDINGS - GROUP D").toUpperCase();
      const standingsList = Array.isArray(data.standings) ? data.standings : [
        { rank: "1", noc: "ITA", flag: "🇮🇹", name: "ITALY", w: "2", l: "0", d: "0", f: "6", a: "0", pts: "6" },
        { rank: "2", noc: "CMR", flag: "🇨🇲", name: "CAMEROON", w: "1", l: "0", d: "1", f: "2", a: "1", pts: "4" },
        { rank: "3", noc: "KOR", flag: "🇰🇷", name: "KOREA", w: "0", l: "1", d: "1", f: "1", a: "4", pts: "1" },
        { rank: "4", noc: "HON", flag: "🇭🇳", name: "HONDURAS", w: "0", l: "2", d: "0", f: "0", a: "4", pts: "0" }
      ];

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,700;1,900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: 'Outfit', sans-serif; }
            
            .fb-standings-wrapper {
              position: absolute;
              bottom: 90px;
              left: 90px;
              width: 1050px;
              display: flex;
              flex-direction: column;
              gap: 3px;
              animation: slideIn 0.4s ease-out;
            }
            @keyframes slideIn { from { transform: translateX(-80px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

            .fb-standings-head {
              height: 60px;
              background: linear-gradient(180deg, #00508c 0%, #002b54 50%, #001938 100%);
              border: 2px solid #001f3f;
              border-radius: 6px;
              transform: skewX(-15deg);
              box-shadow: 0 10px 30px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.4);
              padding: 0 24px;
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
            .head-left {
              display: flex;
              align-items: center;
              gap: 16px;
              transform: skewX(15deg);
            }
            .sport-icon { font-size: 26px; line-height: 1; }
            .title-box { display: flex; flex-direction: column; }
            .event-title {
              font-size: 24px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              letter-spacing: 1.2px;
              text-transform: uppercase;
              text-shadow: 0 2px 4px rgba(0,0,0,0.6);
            }
            .sub-pill {
              background: linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%);
              color: #002850;
              font-size: 13px;
              font-weight: 900;
              font-style: italic;
              padding: 1px 12px;
              border-radius: 4px;
              letter-spacing: 1px;
              display: inline-block;
              margin-top: 2px;
            }
            .head-right {
              display: flex;
              align-items: center;
              gap: 20px;
              transform: skewX(15deg);
            }
            .stats-col-headers {
              display: flex;
              gap: 16px;
              font-size: 18px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              letter-spacing: 1px;
            }
            .stats-col-headers span { width: 28px; text-align: center; }
            .rings-svg { margin-left: 10px; }

            .st-row {
              height: 42px;
              background: linear-gradient(180deg, #002850 0%, #001736 100%);
              border: 1px solid rgba(255,255,255,0.1);
              border-radius: 4px;
              transform: skewX(-15deg);
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 0 24px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.4);
            }
            .row-left {
              display: flex;
              align-items: center;
              gap: 12px;
              transform: skewX(15deg);
            }
            .rank-badge {
              background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
              color: #ffffff;
              font-size: 18px;
              font-weight: 900;
              font-style: italic;
              width: 28px;
              height: 28px;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 4px;
            }
            .team-noc {
              font-size: 19px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              width: 45px;
            }
            .team-flag {
              font-size: 20px;
              color: #ffffff;
            }
            .team-name {
              font-size: 20px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              text-transform: uppercase;
              letter-spacing: 1.2px;
            }
            .row-right-stats {
              display: flex;
              gap: 16px;
              font-size: 20px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              transform: skewX(15deg);
            }
            .row-right-stats span { width: 28px; text-align: center; }
          </style>
        </head>
        <body>
          <div class="fb-standings-wrapper">
            <div class="fb-standings-head">
              <div class="head-left">
                <span class="sport-icon">⚽</span>
                <div class="title-box">
                  <span class="event-title">${eventTitle}</span>
                  <span class="sub-pill">${subTitle}</span>
                </div>
              </div>
              <div class="head-right">
                <div class="stats-col-headers">
                  <span>W</span><span>L</span><span>D</span><span>F</span><span>A</span><span>PTS</span>
                </div>
                <svg class="rings-svg" width="75" height="34" viewBox="0 0 100 50" fill="none" stroke="#ffd700" stroke-width="5" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.9));">
                  <circle cx="20" cy="20" r="14" />
                  <circle cx="50" cy="20" r="14" />
                  <circle cx="80" cy="20" r="14" />
                  <circle cx="35" cy="32" r="14" />
                  <circle cx="65" cy="32" r="14" />
                </svg>
              </div>
            </div>

            ${standingsList.map(st => `
              <div class="st-row">
                <div class="row-left">
                  <span class="rank-badge">${st.rank}</span>
                  <span class="team-noc">${(st.noc || '').toUpperCase()}</span>
                  <span class="team-flag">${st.flag || ''}</span>
                  <span class="team-name">${(st.name || '').toUpperCase()}</span>
                </div>
                <div class="row-right-stats">
                  ${(st.q || st.qualified || (data.showQ && Number(st.rank) <= 3)) ? '<span style="color:#10b981; font-weight:900; width:22px;">Q</span>' : '<span style="width:22px;"></span>'}
                  <span>${st.w ?? 0}</span>
                  <span>${st.l ?? 0}</span>
                  <span>${st.d ?? 0}</span>
                  <span>${st.f ?? 0}</span>
                  <span>${st.a ?? 0}</span>
                  <span>${st.pts ?? 0}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </body>
        </html>
      `;
    }

    case "group-list-teams": {
      const eventTitle = (data.event || "MEN'S FOOTBALL").toUpperCase();
      const subTitle = (data.subTitle || "GROUP C").toUpperCase();
      const teamsList = Array.isArray(data.teams) ? data.teams : [
        { noc: "BEL", flag: "🇧🇪", name: "BELGIUM" },
        { noc: "BRA", flag: "🇧🇷", name: "BRAZIL" },
        { noc: "CHN", flag: "🇨🇳", name: "CHINA" },
        { noc: "NZL", flag: "🇳🇿", name: "NEW ZEALAND" }
      ];

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,700;1,900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: 'Outfit', sans-serif; }
            
            .group-list-wrapper {
              position: absolute;
              bottom: 90px;
              left: 90px;
              width: 960px;
              display: flex;
              flex-direction: column;
              gap: 3px;
              animation: slideIn 0.4s ease-out;
            }
            @keyframes slideIn { from { transform: translateX(-80px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

            .group-list-head {
              height: 56px;
              background: linear-gradient(180deg, #00508c 0%, #002b54 50%, #001938 100%);
              border: 2px solid #001f3f;
              border-radius: 6px;
              transform: skewX(-15deg);
              box-shadow: 0 10px 30px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.4);
              padding: 0 24px;
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
            .head-left {
              display: flex;
              align-items: center;
              gap: 16px;
              transform: skewX(15deg);
            }
            .sport-icon { font-size: 26px; line-height: 1; }
            .title-box { display: flex; flex-direction: column; }
            .event-title {
              font-size: 24px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              letter-spacing: 1.2px;
              text-transform: uppercase;
              text-shadow: 0 2px 4px rgba(0,0,0,0.6);
            }
            .sub-pill {
              background: linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%);
              color: #002850;
              font-size: 13px;
              font-weight: 900;
              font-style: italic;
              padding: 1px 12px;
              border-radius: 4px;
              letter-spacing: 1px;
              display: inline-block;
              margin-top: 2px;
            }
            .rings-svg { transform: skewX(15deg); }

            .team-row {
              height: 42px;
              background: linear-gradient(180deg, #002850 0%, #001736 100%);
              border: 1px solid rgba(255,255,255,0.1);
              border-radius: 4px;
              transform: skewX(-15deg);
              display: flex;
              align-items: center;
              padding: 0 24px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.4);
              gap: 14px;
            }
            .team-noc {
              transform: skewX(15deg);
              font-size: 19px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              width: 50px;
            }
            .team-flag {
              transform: skewX(15deg);
              font-size: 20px;
              color: #ffffff;
            }
            .team-name {
              transform: skewX(15deg);
              font-size: 20px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              text-transform: uppercase;
              letter-spacing: 1.2px;
            }
          </style>
        </head>
        <body>
          <div class="group-list-wrapper">
            <div class="group-list-head">
              <div class="head-left">
                <span class="sport-icon">⚽</span>
                <div class="title-box">
                  <span class="event-title">${eventTitle}</span>
                  <span class="sub-pill">${subTitle}</span>
                </div>
              </div>
              <svg class="rings-svg" width="75" height="34" viewBox="0 0 100 50" fill="none" stroke="#ffd700" stroke-width="5" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.9));">
                <circle cx="20" cy="20" r="14" />
                <circle cx="50" cy="20" r="14" />
                <circle cx="80" cy="20" r="14" />
                <circle cx="35" cy="32" r="14" />
                <circle cx="65" cy="32" r="14" />
              </svg>
            </div>

            ${teamsList.map(tm => `
              <div class="team-row">
                <span class="team-noc">${(tm.noc || '').toUpperCase()}</span>
                <span class="team-flag">${tm.flag || ''}</span>
                <span class="team-name">${(tm.name || '').toUpperCase()}</span>
              </div>
            `).join('')}
          </div>
        </body>
        </html>
      `;
    }

    case "match-id-teams": {
      const eventTitle = (data.event || "MEN'S FOOTBALL").toUpperCase();
      const subTitle = (data.subTitle || "FIRST ROUND - GROUP A").toUpperCase();
      const team1Noc = (data.team1Noc || data.homeNoc || "AUS").toUpperCase();
      const team1Flag = data.team1Flag || data.homeFlag || "🇦🇺";
      const team1Name = (data.team1Name || data.homeTeam || "AUSTRALIA").toUpperCase();
      const team2Noc = (data.team2Noc || data.awayNoc || "SRB").toUpperCase();
      const team2Flag = data.team2Flag || data.awayFlag || "🇷🇸";
      const team2Name = (data.team2Name || data.awayTeam || "SERBIA").toUpperCase();

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,700;1,900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: 'Outfit', sans-serif; }
            
            .match-id-wrapper {
              position: absolute;
              bottom: 90px;
              left: 90px;
              width: 960px;
              display: flex;
              flex-direction: column;
              gap: 3px;
              animation: slideIn 0.4s ease-out;
            }
            @keyframes slideIn { from { transform: translateX(-80px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

            .match-id-head {
              height: 56px;
              background: linear-gradient(180deg, #00508c 0%, #002b54 50%, #001938 100%);
              border: 2px solid #001f3f;
              border-radius: 6px;
              transform: skewX(-15deg);
              box-shadow: 0 10px 30px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.4);
              padding: 0 24px;
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
            .head-left {
              display: flex;
              align-items: center;
              gap: 16px;
              transform: skewX(15deg);
            }
            .sport-icon {
              font-size: 26px;
              line-height: 1;
            }
            .title-box {
              display: flex;
              flex-direction: column;
            }
            .event-title {
              font-size: 24px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              letter-spacing: 1.2px;
              text-transform: uppercase;
              text-shadow: 0 2px 4px rgba(0,0,0,0.6);
            }
            .sub-pill {
              background: linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%);
              color: #002850;
              font-size: 13px;
              font-weight: 900;
              font-style: italic;
              padding: 1px 12px;
              border-radius: 4px;
              letter-spacing: 1px;
              display: inline-block;
              margin-top: 2px;
            }
            .rings-svg {
              transform: skewX(15deg);
            }

            .team-row {
              height: 44px;
              background: linear-gradient(180deg, #002850 0%, #001736 100%);
              border: 1px solid rgba(255,255,255,0.1);
              border-radius: 4px;
              transform: skewX(-15deg);
              display: flex;
              align-items: center;
              padding: 0 24px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.4);
              gap: 14px;
            }
            .team-noc {
              transform: skewX(15deg);
              font-size: 20px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              width: 50px;
            }
            .team-flag {
              transform: skewX(15deg);
              font-size: 22px;
              color: #ffffff;
            }
            .team-name {
              transform: skewX(15deg);
              font-size: 22px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              text-transform: uppercase;
              letter-spacing: 1.2px;
            }
          </style>
        </head>
        <body>
          <div class="match-id-wrapper">
            <div class="match-id-head">
              <div class="head-left">
                <span class="sport-icon">⚽</span>
                <div class="title-box">
                  <span class="event-title">${eventTitle}</span>
                  <span class="sub-pill">${subTitle}</span>
                </div>
              </div>
              <svg class="rings-svg" width="75" height="34" viewBox="0 0 100 50" fill="none" stroke="#ffd700" stroke-width="5" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.9));">
                <circle cx="20" cy="20" r="14" />
                <circle cx="50" cy="20" r="14" />
                <circle cx="80" cy="20" r="14" />
                <circle cx="35" cy="32" r="14" />
                <circle cx="65" cy="32" r="14" />
              </svg>
            </div>

            <div class="team-row">
              <span class="team-noc">${team1Noc}</span>
              <span class="team-flag">${team1Flag}</span>
              <span class="team-name">${team1Name}</span>
            </div>

            <div class="team-row">
              <span class="team-noc">${team2Noc}</span>
              <span class="team-flag">${team2Flag}</span>
              <span class="team-name">${team2Name}</span>
            </div>
          </div>
        </body>
        </html>
      `;
    }

    case "clock-at-finish": {
      const wrTime = data.wrTime || "3:40.08";
      const orTime = data.orTime || "3:40.59";
      const clockStr = data.time || "3:41.60";

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,700;1,900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: 'Outfit', sans-serif; }
            
            .left-record-stack {
              position: absolute;
              bottom: 90px;
              left: 90px;
              display: flex;
              flex-direction: column;
              gap: 4px;
              animation: slideInLeft 0.4s ease-out;
            }
            @keyframes slideInLeft { from { transform: translateX(-60px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
            .record-row-bar {
              display: flex;
              align-items: center;
              justify-content: space-between;
              height: 42px;
              width: 240px;
              background: linear-gradient(180deg, #00508c 0%, #002b54 50%, #001938 100%);
              border: 2px solid #001f3f;
              border-radius: 6px;
              transform: skewX(-15deg);
              box-shadow: 0 8px 24px rgba(0,0,0,0.5);
              padding: 0 16px;
            }
            .wr-badge {
              transform: skewX(15deg);
              background: linear-gradient(135deg, #ffd700, #b8860b);
              color: #000000;
              font-size: 13px;
              font-weight: 900;
              font-style: italic;
              padding: 2px 10px;
              border-radius: 10px;
            }
            .or-badge {
              transform: skewX(15deg);
              background: linear-gradient(135deg, #e2e8f0, #94a3b8);
              color: #000000;
              font-size: 13px;
              font-weight: 900;
              font-style: italic;
              padding: 2px 10px;
              border-radius: 10px;
            }
            .target-val {
              transform: skewX(15deg);
              font-size: 24px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              letter-spacing: 1px;
            }

            .right-clock-group {
              position: absolute;
              bottom: 90px;
              right: 90px;
              display: flex;
              align-items: center;
              border-radius: 6px;
              overflow: hidden;
              box-shadow: 0 8px 24px rgba(0,0,0,0.5);
              animation: slideInRight 0.4s ease-out;
            }
            @keyframes slideInRight { from { transform: translateX(60px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
            .time-pill {
              background: linear-gradient(180deg, #ffffff 0%, #dbeafe 45%, #cbd5e1 100%);
              color: #002850;
              padding: 8px 30px;
              font-size: 34px;
              font-weight: 900;
              font-style: italic;
              transform: skewX(-15deg);
              z-index: 2;
              border: 2px solid #001f3f;
              border-right: none;
              min-width: 170px;
              text-align: center;
            }
            .rings-bar {
              background: linear-gradient(180deg, #00508c 0%, #002b54 50%, #001938 100%);
              padding: 8px 20px 8px 28px;
              transform: skewX(-15deg);
              margin-left: -12px;
              z-index: 1;
              border: 2px solid #001f3f;
              display: flex;
              align-items: center;
            }
          </style>
        </head>
        <body>
          <div class="left-record-stack">
            <div class="record-row-bar">
              <span class="wr-badge">WR</span>
              <span class="target-val">${wrTime}</span>
            </div>
            <div class="record-row-bar">
              <span class="or-badge">OR</span>
              <span class="target-val">${orTime}</span>
            </div>
          </div>

          <div class="right-clock-group">
            <div class="time-pill"><span style="transform: skewX(15deg); display: inline-block;">${clockStr}</span></div>
            <div class="rings-bar">
              <svg width="60" height="28" viewBox="0 0 100 50" fill="none" stroke="#ffd700" stroke-width="5" style="transform: skewX(15deg); filter: drop-shadow(0 2px 4px rgba(0,0,0,0.9));">
                <circle cx="20" cy="20" r="14" />
                <circle cx="50" cy="20" r="14" />
                <circle cx="80" cy="20" r="14" />
                <circle cx="35" cy="32" r="14" />
                <circle cx="65" cy="32" r="14" />
              </svg>
            </div>
          </div>
        </body>
        </html>
      `;
    }

    case "clock-before-finish": {
      const wrTime = data.wrTime || "47.24";
      const orTime = data.orTime || "47.27";
      const clockStr = data.time || "47.1";

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,700;1,900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: 'Outfit', sans-serif; }
            
            .left-record-stack {
              position: absolute;
              bottom: 90px;
              left: 90px;
              display: flex;
              flex-direction: column;
              gap: 4px;
              animation: slideInLeft 0.4s ease-out;
            }
            @keyframes slideInLeft { from { transform: translateX(-60px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
            .record-row-bar {
              display: flex;
              align-items: center;
              justify-content: space-between;
              height: 42px;
              width: 220px;
              background: linear-gradient(180deg, #00508c 0%, #002b54 50%, #001938 100%);
              border: 2px solid #001f3f;
              border-radius: 6px;
              transform: skewX(-15deg);
              box-shadow: 0 8px 24px rgba(0,0,0,0.5);
              padding: 0 16px;
            }
            .wr-badge {
              transform: skewX(15deg);
              background: linear-gradient(135deg, #ffd700, #b8860b);
              color: #000000;
              font-size: 13px;
              font-weight: 900;
              font-style: italic;
              padding: 2px 10px;
              border-radius: 10px;
            }
            .or-badge {
              transform: skewX(15deg);
              background: linear-gradient(135deg, #e2e8f0, #94a3b8);
              color: #000000;
              font-size: 13px;
              font-weight: 900;
              font-style: italic;
              padding: 2px 10px;
              border-radius: 10px;
            }
            .target-val {
              transform: skewX(15deg);
              font-size: 24px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              letter-spacing: 1px;
            }

            .right-clock-group {
              position: absolute;
              bottom: 90px;
              right: 90px;
              display: flex;
              align-items: center;
              border-radius: 6px;
              overflow: hidden;
              box-shadow: 0 8px 24px rgba(0,0,0,0.5);
              animation: slideInRight 0.4s ease-out;
            }
            @keyframes slideInRight { from { transform: translateX(60px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
            .time-pill {
              background: linear-gradient(180deg, #ffffff 0%, #dbeafe 45%, #cbd5e1 100%);
              color: #002850;
              padding: 8px 30px;
              font-size: 32px;
              font-weight: 900;
              font-style: italic;
              transform: skewX(-15deg);
              z-index: 2;
              border: 2px solid #001f3f;
              border-right: none;
              min-width: 140px;
              text-align: center;
            }
            .rings-bar {
              background: linear-gradient(180deg, #00508c 0%, #002b54 50%, #001938 100%);
              padding: 8px 20px 8px 28px;
              transform: skewX(-15deg);
              margin-left: -12px;
              z-index: 1;
              border: 2px solid #001f3f;
              display: flex;
              align-items: center;
            }
          </style>
        </head>
        <body>
          <div class="left-record-stack">
            <div class="record-row-bar">
              <span class="wr-badge">WR</span>
              <span class="target-val">${wrTime}</span>
            </div>
            <div class="record-row-bar">
              <span class="or-badge">OR</span>
              <span class="target-val">${orTime}</span>
            </div>
          </div>

          <div class="right-clock-group">
            <div class="time-pill"><span style="transform: skewX(15deg); display: inline-block;">${clockStr}</span></div>
            <div class="rings-bar">
              <svg width="60" height="28" viewBox="0 0 100 50" fill="none" stroke="#ffd700" stroke-width="5" style="transform: skewX(15deg); filter: drop-shadow(0 2px 4px rgba(0,0,0,0.9));">
                <circle cx="20" cy="20" r="14" />
                <circle cx="50" cy="20" r="14" />
                <circle cx="80" cy="20" r="14" />
                <circle cx="35" cy="32" r="14" />
                <circle cx="65" cy="32" r="14" />
              </svg>
            </div>
          </div>
        </body>
        </html>
      `;
    }

    case "clock-at-split": {
      const laneNum = String(data.lane || "4");
      const countryCode = (data.country || "AUS").toUpperCase();
      const flagStr = data.flag || "🇦🇺";
      const swimmerName = (data.athlete || data.swimmer || "SULLIVAN").toUpperCase();
      const splitRecord = data.splitRecord || "22.48";
      const deltaStr = data.delta || "-0.01";
      const lapStr = data.lap || data.distance || "50M";
      const clockStr = data.time || "22.47";

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,700;1,900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: 'Outfit', sans-serif; }
            
            .top-swimmer-bug {
              position: absolute;
              top: 70px;
              left: 90px;
              display: flex;
              align-items: center;
              height: 42px;
              background: linear-gradient(180deg, #00508c 0%, #002b54 50%, #001938 100%);
              border: 2px solid #001f3f;
              border-radius: 6px;
              transform: skewX(-15deg);
              box-shadow: 0 8px 24px rgba(0,0,0,0.5);
              padding: 0 20px;
              animation: slideInTop 0.4s ease-out;
            }
            @keyframes slideInTop { from { transform: skewX(-15deg) translateY(-30px); opacity: 0; } to { transform: skewX(-15deg) translateY(0); opacity: 1; } }
            .lane-num {
              transform: skewX(15deg);
              font-size: 22px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              margin-right: 12px;
            }
            .noc-code {
              transform: skewX(15deg);
              font-size: 20px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              margin-right: 10px;
            }
            .flag-box {
              transform: skewX(15deg);
              font-size: 22px;
              margin-right: 16px;
              color: #ffffff;
            }
            .swimmer-name {
              transform: skewX(15deg);
              font-size: 22px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              text-transform: uppercase;
              letter-spacing: 1px;
            }

            .bottom-split-delta {
              position: absolute;
              bottom: 90px;
              left: 90px;
              display: flex;
              align-items: center;
              border-radius: 6px;
              overflow: hidden;
              box-shadow: 0 8px 24px rgba(0,0,0,0.5);
              animation: slideInLeft 0.4s ease-out;
            }
            @keyframes slideInLeft { from { transform: translateX(-60px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
            .split-main-bar {
              display: flex;
              align-items: center;
              height: 48px;
              background: linear-gradient(180deg, #00508c 0%, #002b54 50%, #001938 100%);
              border: 2px solid #001f3f;
              transform: skewX(-15deg);
              padding: 0 18px;
              z-index: 2;
            }
            .wr-badge {
              transform: skewX(15deg);
              background: linear-gradient(135deg, #ffd700, #b8860b);
              color: #000000;
              font-size: 13px;
              font-weight: 900;
              font-style: italic;
              padding: 2px 10px;
              border-radius: 10px;
              margin-right: 12px;
            }
            .split-label {
              transform: skewX(15deg);
              font-size: 22px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              margin-right: 24px;
            }
            .split-time {
              transform: skewX(15deg);
              font-size: 24px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
            }
            .delta-pill {
              background: linear-gradient(135deg, ${deltaStr.startsWith('+') ? '#dc2626 0%, #991b1b 100%' : '#059669 0%, #047857 100%'});
              color: #ffffff;
              font-size: 22px;
              font-weight: 900;
              font-style: italic;
              padding: 8px 24px;
              transform: skewX(-15deg);
              margin-left: -12px;
              z-index: 1;
              border: 2px solid ${deltaStr.startsWith('+') ? '#991b1b' : '#047857'};
            }
            .delta-txt { transform: skewX(15deg); display: inline-block; }

            .right-clock-group {
              position: absolute;
              bottom: 90px;
              right: 90px;
              display: flex;
              flex-direction: column;
              align-items: flex-end;
              gap: 3px;
              animation: slideInRight 0.4s ease-out;
            }
            @keyframes slideInRight { from { transform: translateX(60px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
            .top-lap-pill {
              background: linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%);
              color: #002850;
              font-size: 20px;
              font-weight: 900;
              font-style: italic;
              padding: 3px 20px;
              border-radius: 4px;
              transform: skewX(-15deg);
              letter-spacing: 1px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.4);
            }
            .lap-txt { transform: skewX(15deg); }
            .clock-bottom-row {
              display: flex;
              align-items: center;
              border-radius: 6px;
              overflow: hidden;
              box-shadow: 0 8px 24px rgba(0,0,0,0.5);
            }
            .time-pill {
              background: linear-gradient(180deg, #ffffff 0%, #dbeafe 45%, #cbd5e1 100%);
              color: #002850;
              padding: 8px 30px;
              font-size: 32px;
              font-weight: 900;
              font-style: italic;
              transform: skewX(-15deg);
              z-index: 2;
              border: 2px solid #001f3f;
              border-right: none;
              min-width: 140px;
              text-align: center;
            }
            .rings-bar {
              background: linear-gradient(180deg, #00508c 0%, #002b54 50%, #001938 100%);
              padding: 8px 20px 8px 28px;
              transform: skewX(-15deg);
              margin-left: -12px;
              z-index: 1;
              border: 2px solid #001f3f;
              display: flex;
              align-items: center;
            }
          </style>
        </head>
        <body>
          <div class="top-swimmer-bug">
            <span class="lane-num">${laneNum}</span>
            <span class="noc-code">${countryCode}</span>
            <span class="flag-box">${flagStr}</span>
            <span class="swimmer-name">${swimmerName}</span>
          </div>

          <div class="bottom-split-delta">
            <div class="split-main-bar">
              <span class="wr-badge">WR</span>
              <span class="split-label">SPLIT</span>
              <span class="split-time">${splitRecord}</span>
            </div>
            <div class="delta-pill"><span class="delta-txt">${deltaStr}</span></div>
          </div>

          <div class="right-clock-group">
            <div class="top-lap-pill"><span class="lap-txt">${lapStr}</span></div>
            <div class="clock-bottom-row">
              <div class="time-pill"><span style="transform: skewX(15deg); display: inline-block;">${clockStr}</span></div>
              <div class="rings-bar">
                <svg width="60" height="28" viewBox="0 0 100 50" fill="none" stroke="#ffd700" stroke-width="5" style="transform: skewX(15deg); filter: drop-shadow(0 2px 4px rgba(0,0,0,0.9));">
                  <circle cx="20" cy="20" r="14" />
                  <circle cx="50" cy="20" r="14" />
                  <circle cx="80" cy="20" r="14" />
                  <circle cx="35" cy="32" r="14" />
                  <circle cx="65" cy="32" r="14" />
                </svg>
              </div>
            </div>
          </div>
        </body>
        </html>
      `;
    }

    case "clock-before-split": {
      const targetTime = data.targetTime || data.splitTime || "22.44";
      const lapStr = data.lap || data.distance || "50M";
      const clockStr = data.time || "19.4";

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,700;1,900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: 'Outfit', sans-serif; }
            
            .left-split-target {
              position: absolute;
              bottom: 90px;
              left: 90px;
              display: flex;
              align-items: center;
              height: 48px;
              background: linear-gradient(180deg, #00508c 0%, #002b54 50%, #001938 100%);
              border: 2px solid #001f3f;
              border-radius: 6px;
              transform: skewX(-15deg);
              box-shadow: 0 8px 24px rgba(0,0,0,0.5);
              padding: 0 18px;
              animation: slideInLeft 0.4s ease-out;
            }
            @keyframes slideInLeft { from { transform: skewX(-15deg) translateX(-60px); opacity: 0; } to { transform: skewX(-15deg) translateX(0); opacity: 1; } }
            .wr-badge {
              transform: skewX(15deg);
              background: linear-gradient(135deg, #ffd700, #b8860b);
              color: #000000;
              font-size: 13px;
              font-weight: 900;
              font-style: italic;
              padding: 2px 10px;
              border-radius: 10px;
              margin-right: 12px;
            }
            .split-label {
              transform: skewX(15deg);
              font-size: 22px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              margin-right: 24px;
              letter-spacing: 1px;
            }
            .target-time {
              transform: skewX(15deg);
              font-size: 24px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              letter-spacing: 1px;
            }

            .right-clock-group {
              position: absolute;
              bottom: 90px;
              right: 90px;
              display: flex;
              flex-direction: column;
              align-items: flex-end;
              gap: 3px;
              animation: slideInRight 0.4s ease-out;
            }
            @keyframes slideInRight { from { transform: translateX(60px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
            .top-lap-pill {
              background: linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%);
              color: #002850;
              font-size: 20px;
              font-weight: 900;
              font-style: italic;
              padding: 3px 20px;
              border-radius: 4px;
              transform: skewX(-15deg);
              letter-spacing: 1px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.4);
            }
            .lap-txt { transform: skewX(15deg); }
            .clock-bottom-row {
              display: flex;
              align-items: center;
              border-radius: 6px;
              overflow: hidden;
              box-shadow: 0 8px 24px rgba(0,0,0,0.5);
            }
            .time-pill {
              background: linear-gradient(180deg, #ffffff 0%, #dbeafe 45%, #cbd5e1 100%);
              color: #002850;
              padding: 8px 30px;
              font-size: 32px;
              font-weight: 900;
              font-style: italic;
              transform: skewX(-15deg);
              z-index: 2;
              border: 2px solid #001f3f;
              border-right: none;
              min-width: 140px;
              text-align: center;
            }
            .rings-bar {
              background: linear-gradient(180deg, #00508c 0%, #002b54 50%, #001938 100%);
              padding: 8px 20px 8px 28px;
              transform: skewX(-15deg);
              margin-left: -12px;
              z-index: 1;
              border: 2px solid #001f3f;
              display: flex;
              align-items: center;
            }
          </style>
        </head>
        <body>
          <div class="left-split-target">
            <span class="wr-badge">WR</span>
            <span class="split-label">SPLIT</span>
            <span class="target-time">${targetTime}</span>
          </div>

          <div class="right-clock-group">
            <div class="top-lap-pill"><span class="lap-txt">${lapStr}</span></div>
            <div class="clock-bottom-row">
              <div class="time-pill"><span style="transform: skewX(15deg); display: inline-block;">${clockStr}</span></div>
              <div class="rings-bar">
                <svg width="60" height="28" viewBox="0 0 100 50" fill="none" stroke="#ffd700" stroke-width="5" style="transform: skewX(15deg); filter: drop-shadow(0 2px 4px rgba(0,0,0,0.9));">
                  <circle cx="20" cy="20" r="14" />
                  <circle cx="50" cy="20" r="14" />
                  <circle cx="80" cy="20" r="14" />
                  <circle cx="35" cy="32" r="14" />
                  <circle cx="65" cy="32" r="14" />
                </svg>
              </div>
            </div>
          </div>
        </body>
        </html>
      `;
    }

    case "ceremony-id": {
      const eventTitle = (data.event || "WOMEN'S 200M BUTTERFLY").toUpperCase();
      const subTitle = (data.subTitle || "VICTORY CEREMONY").toUpperCase();

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,700;1,900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: 'Outfit', sans-serif; }
            .ceremony-wrapper {
              position: absolute;
              bottom: 90px;
              left: 90px;
              width: 1100px;
              display: flex;
              flex-direction: column;
              animation: slideIn 0.4s ease-out;
            }
            @keyframes slideIn { from { transform: translateX(-80px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
            .ceremony-head {
              display: flex;
              align-items: center;
              justify-content: space-between;
              height: 58px;
              background: linear-gradient(180deg, #00508c 0%, #002b54 50%, #001938 100%);
              border: 2px solid #001f3f;
              border-radius: 6px;
              transform: skewX(-15deg);
              box-shadow: 0 10px 30px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.4);
              padding: 0 24px;
            }
            .event-title {
              transform: skewX(15deg);
              font-size: 32px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              letter-spacing: 1.5px;
              display: flex;
              align-items: center;
              gap: 14px;
            }
            .rings-svg {
              transform: skewX(15deg);
            }
            .ceremony-sub {
              transform: skewX(-15deg);
              background: linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%);
              color: #002850;
              font-size: 20px;
              font-weight: 900;
              font-style: italic;
              padding: 4px 20px;
              border-radius: 4px;
              margin-top: 3px;
              width: fit-content;
              text-transform: uppercase;
              letter-spacing: 1px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.4);
            }
            .sub-txt {
              transform: skewX(15deg);
            }
          </style>
        </head>
        <body>
          <div class="ceremony-wrapper">
            <div class="ceremony-head">
              <span class="event-title"><span>🏊</span> ${eventTitle}</span>
              <svg class="rings-svg" width="75" height="34" viewBox="0 0 100 50" fill="none" stroke="#ffd700" stroke-width="5" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.9));">
                <circle cx="20" cy="20" r="14" />
                <circle cx="50" cy="20" r="14" />
                <circle cx="80" cy="20" r="14" />
                <circle cx="35" cy="32" r="14" />
                <circle cx="65" cy="32" r="14" />
              </svg>
            </div>
            <div class="ceremony-sub">
              <span class="sub-txt">${subTitle}</span>
            </div>
          </div>
        </body>
        </html>
      `;
    }

    case "medal-id-single": {
      const countryCode = (data.country || "CHN").toUpperCase();
      const flagStr = data.flag || "🇨🇳";
      const athleteName = (data.athlete || "LIU ZIGE").toUpperCase();
      const medalType = (data.medal || "GOLD").toUpperCase();
      const eventTitle = (data.event || "WOMEN'S 200M BUTTERFLY").toUpperCase();

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,700;1,900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: 'Outfit', sans-serif; }
            .medal-id-wrapper {
              position: absolute;
              bottom: 90px;
              left: 90px;
              width: 1100px;
              display: flex;
              flex-direction: column;
              gap: 3px;
              animation: slideIn 0.4s ease-out;
            }
            @keyframes slideIn { from { transform: translateX(-80px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
            .medal-id-head {
              display: flex;
              align-items: center;
              height: 56px;
              background: linear-gradient(180deg, #00508c 0%, #002b54 50%, #001938 100%);
              border: 2px solid #001f3f;
              border-radius: 6px;
              transform: skewX(-15deg);
              box-shadow: 0 10px 30px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.4);
              padding: 0 24px;
            }
            .country-code {
              transform: skewX(15deg);
              font-size: 24px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              margin-right: 12px;
              letter-spacing: 1px;
            }
            .flag-box {
              transform: skewX(15deg);
              font-size: 28px;
              margin-right: 20px;
              display: flex;
              align-items: center;
              color: #ffffff;
            }
            .athlete-name {
              transform: skewX(15deg);
              font-size: 30px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              text-transform: uppercase;
              letter-spacing: 1.5px;
              flex: 1;
              text-shadow: 0 2px 4px rgba(0,0,0,0.6);
            }
            .rings-svg {
              transform: skewX(15deg);
              margin-left: 12px;
            }
            .medal-sub-bar {
              height: 44px;
              background: linear-gradient(180deg, #002850 0%, #001736 100%);
              border: 1px solid rgba(255,255,255,0.1);
              border-radius: 4px;
              transform: skewX(-15deg);
              display: flex;
              align-items: center;
              padding: 0 24px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.4);
            }
            .medal-badge-icon {
              transform: skewX(15deg);
              font-size: 24px;
              margin-right: 12px;
            }
            .sub-text {
              transform: skewX(15deg);
              font-size: 22px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              text-transform: uppercase;
              letter-spacing: 1.2px;
            }
          </style>
        </head>
        <body>
          <div class="medal-id-wrapper">
            <div class="medal-id-head">
              <span class="country-code">${countryCode}</span>
              <span class="flag-box">${flagStr}</span>
              <span class="athlete-name">${athleteName}</span>
              <svg class="rings-svg" width="75" height="34" viewBox="0 0 100 50" fill="none" stroke="#ffd700" stroke-width="5" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.9));">
                <circle cx="20" cy="20" r="14" />
                <circle cx="50" cy="20" r="14" />
                <circle cx="80" cy="20" r="14" />
                <circle cx="35" cy="32" r="14" />
                <circle cx="65" cy="32" r="14" />
              </svg>
            </div>
            <div class="medal-sub-bar">
              <span class="medal-badge-icon">${medalType.includes('SILVER') ? '🥈' : medalType.includes('BRONZE') ? '🥉' : '🥇'}</span>
              <span class="sub-text">${medalType} - ${eventTitle}</span>
            </div>
          </div>
        </body>
        </html>
      `;
    }

    case "advance-all-to-phase": {
      const eventName = (data.event || "WOMEN'S 200M BUTTERFLY").toUpperCase();
      const subTitle = (data.subTitle || "SEMI-FINALS ➔ FINAL").toUpperCase();

      const resultsList = Array.isArray(data.results) ? data.results : [
        { rank: "1", noc: "CHN", flag: "🇨🇳", athlete: "LIU ZIGE", time: "2:06.25" },
        { rank: "2", noc: "AUS", flag: "🇦🇺", athlete: "JESSICAH SCHIPPER", time: "2:06.34" },
        { rank: "3", noc: "CHN", flag: "🇨🇳", athlete: "JIAO LIUYANG", time: "2:06.78" },
        { rank: "4", noc: "POL", flag: "🇵🇱", athlete: "OTYLIA JEDRZEJCZAK", time: "2:06.96" },
        { rank: "4", noc: "JPN", flag: "🇯🇵", athlete: "YUKO NAKANISHI", time: "2:06.96" },
        { rank: "6", noc: "USA", flag: "🇺🇸", athlete: "KATHLEEN HERSEY", time: "2:07.73" },
        { rank: "7", noc: "FRA", flag: "🇫🇷", athlete: "AURORE MONGEL", time: "2:09.58" },
        { rank: "8", noc: "USA", flag: "🇺🇸", athlete: "ELAINE BREEDEN", time: "2:10.60" }
      ];

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,700;1,900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: 'Outfit', sans-serif; }
            .adv-wrapper {
              position: absolute;
              bottom: 70px;
              left: 90px;
              width: 1120px;
              display: flex;
              flex-direction: column;
              gap: 2px;
              animation: slideIn 0.4s ease-out;
            }
            @keyframes slideIn { from { transform: translateX(-80px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
            .adv-head {
              display: flex;
              flex-direction: column;
              background: linear-gradient(180deg, #00508c 0%, #002b54 50%, #001938 100%);
              border: 2px solid #001f3f;
              border-radius: 6px;
              transform: skewX(-15deg);
              box-shadow: 0 10px 30px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.4);
              padding: 8px 24px;
            }
            .head-top-row {
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
            .event-title {
              transform: skewX(15deg);
              font-size: 30px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              letter-spacing: 1px;
              display: flex;
              align-items: center;
              gap: 12px;
            }
            .sub-adv-bar {
              transform: skewX(15deg);
              background: linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%);
              color: #002850;
              font-size: 18px;
              font-weight: 900;
              font-style: italic;
              padding: 3px 16px;
              border-radius: 4px;
              margin-top: 4px;
              width: fit-content;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            .rings-svg {
              transform: skewX(15deg);
            }
            .adv-row {
              height: 42px;
              background: linear-gradient(180deg, #002850 0%, #001736 100%);
              border: 1px solid rgba(255,255,255,0.1);
              border-radius: 4px;
              transform: skewX(-15deg);
              display: flex;
              align-items: center;
              padding: 0 20px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.4);
            }
            .rank-badge {
              transform: skewX(15deg);
              background: #dc2626;
              color: #ffffff;
              font-size: 18px;
              font-weight: 900;
              font-style: italic;
              width: 24px;
              height: 24px;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 3px;
              margin-right: 12px;
            }
            .adv-noc {
              transform: skewX(15deg);
              font-size: 20px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              margin-right: 8px;
            }
            .adv-flag {
              transform: skewX(15deg);
              font-size: 24px;
              margin-right: 16px;
              color: #ffffff;
            }
            .adv-name {
              transform: skewX(15deg);
              font-size: 22px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              text-transform: uppercase;
              flex: 1;
              letter-spacing: 1px;
            }
            .adv-time {
              transform: skewX(15deg);
              font-size: 24px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              letter-spacing: 1px;
            }
          </style>
        </head>
        <body>
          <div class="adv-wrapper">
            <div class="adv-head">
              <div class="head-top-row">
                <span class="event-title"><span>🏊</span> ${eventName}</span>
                <svg class="rings-svg" width="75" height="34" viewBox="0 0 100 50" fill="none" stroke="#ffd700" stroke-width="5" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.9));">
                  <circle cx="20" cy="20" r="14" />
                  <circle cx="50" cy="20" r="14" />
                  <circle cx="80" cy="20" r="14" />
                  <circle cx="35" cy="32" r="14" />
                  <circle cx="65" cy="32" r="14" />
                </svg>
              </div>
              <div class="sub-adv-bar">${subTitle}</div>
            </div>
            ${resultsList.slice(0, 8).map(r => `
              <div class="adv-row">
                <span class="rank-badge">${r.rank}</span>
                <span class="adv-noc">${r.noc}</span>
                <span class="adv-flag">${r.flag}</span>
                <span class="adv-name">${r.athlete}</span>
                <span class="adv-time">${r.time}</span>
              </div>
            `).join('')}
          </div>
        </body>
        </html>
      `;
    }

    case "event-results-full": {
      const eventName = (data.event || "WOMEN'S 200M BUTTERFLY").toUpperCase();
      const subTitle = (data.subTitle || "RESULT - SEMI-FINAL 2").toUpperCase();

      const resultsList = Array.isArray(data.results) ? data.results : [
        { rank: "1", noc: "CHN", flag: "🇨🇳", athlete: "LIU ZIGE", time: "2:06.25" },
        { rank: "2", noc: "AUS", flag: "🇦🇺", athlete: "JESSICAH SCHIPPER", time: "2:06.34" },
        { rank: "3", noc: "POL", flag: "🇵🇱", athlete: "OTYLIA JEDRZEJCZAK", time: "2:06.78" },
        { rank: "4", noc: "JPN", flag: "🇯🇵", athlete: "YUKO NAKANISHI", time: "2:06.96" },
        { rank: "4", noc: "USA", flag: "🇺🇸", athlete: "KATHLEEN HERSEY", time: "2:06.96" },
        { rank: "6", noc: "USA", flag: "🇺🇸", athlete: "ELAINE BREEDEN", time: "2:07.73" },
        { rank: "7", noc: "AUS", flag: "🇦🇺", athlete: "SAMANTHA HAMILL", time: "2:09.58" },
        { rank: "8", noc: "GBR", flag: "🇬🇧", athlete: "ELLEN GANDY", time: "2:10.60" }
      ];

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,700;1,900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: 'Outfit', sans-serif; }
            .res-wrapper {
              position: absolute;
              bottom: 70px;
              left: 90px;
              width: 1120px;
              display: flex;
              flex-direction: column;
              gap: 2px;
              animation: slideIn 0.4s ease-out;
            }
            @keyframes slideIn { from { transform: translateX(-80px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
            .res-head {
              display: flex;
              flex-direction: column;
              background: linear-gradient(180deg, #00508c 0%, #002b54 50%, #001938 100%);
              border: 2px solid #001f3f;
              border-radius: 6px;
              transform: skewX(-15deg);
              box-shadow: 0 10px 30px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.4);
              padding: 8px 24px;
            }
            .head-top-row {
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
            .event-title {
              transform: skewX(15deg);
              font-size: 30px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              letter-spacing: 1px;
              display: flex;
              align-items: center;
              gap: 12px;
            }
            .sub-result-bar {
              transform: skewX(15deg);
              background: linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%);
              color: #002850;
              font-size: 18px;
              font-weight: 900;
              font-style: italic;
              padding: 3px 16px;
              border-radius: 4px;
              margin-top: 4px;
              width: fit-content;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            .rings-svg {
              transform: skewX(15deg);
            }
            .res-row {
              height: 42px;
              background: linear-gradient(180deg, #002850 0%, #001736 100%);
              border: 1px solid rgba(255,255,255,0.1);
              border-radius: 4px;
              transform: skewX(-15deg);
              display: flex;
              align-items: center;
              padding: 0 20px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.4);
            }
            .rank-badge {
              transform: skewX(15deg);
              background: #dc2626;
              color: #ffffff;
              font-size: 18px;
              font-weight: 900;
              font-style: italic;
              width: 24px;
              height: 24px;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 3px;
              margin-right: 12px;
            }
            .res-noc {
              transform: skewX(15deg);
              font-size: 20px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              margin-right: 8px;
            }
            .res-flag {
              transform: skewX(15deg);
              font-size: 24px;
              margin-right: 16px;
              color: #ffffff;
            }
            .res-name {
              transform: skewX(15deg);
              font-size: 22px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              text-transform: uppercase;
              flex: 1;
              letter-spacing: 1px;
            }
            .res-time {
              transform: skewX(15deg);
              font-size: 24px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              letter-spacing: 1px;
            }
          </style>
        </head>
        <body>
          <div class="res-wrapper">
            <div class="res-head">
              <div class="head-top-row">
                <span class="event-title"><span>🏊</span> ${eventName}</span>
                <svg class="rings-svg" width="75" height="34" viewBox="0 0 100 50" fill="none" stroke="#ffd700" stroke-width="5" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.9));">
                  <circle cx="20" cy="20" r="14" />
                  <circle cx="50" cy="20" r="14" />
                  <circle cx="80" cy="20" r="14" />
                  <circle cx="35" cy="32" r="14" />
                  <circle cx="65" cy="32" r="14" />
                </svg>
              </div>
              <div class="sub-result-bar">${subTitle}</div>
            </div>
            ${resultsList.slice(0, 8).map(r => `
              <div class="res-row">
                <span class="rank-badge">${r.rank}</span>
                <span class="res-noc">${r.noc}</span>
                <span class="res-flag">${r.flag}</span>
                <span class="res-name">${r.athlete}</span>
                <span class="res-time">${r.time}</span>
              </div>
            `).join('')}
          </div>
        </body>
        </html>
      `;
    }

    case "winner-place-id": {
      const sportName = (sportTitle || "SWIMMING").toUpperCase();
      const headerLabel = (data.headerLabel || "WINNER - MEN'S 4X200M FREESTYLE RELAY").toUpperCase();
      const countryCode = (data.country || "USA").toUpperCase();
      const flagStr = data.flag || "🇺🇸";
      const winnerName = (data.winnerName || data.countryName || data.athlete || "UNITED STATES").toUpperCase();
      const badgeText = data.badge || "WR";
      const timeStr = data.time || "6:58.56";

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,700;1,900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: 'Outfit', sans-serif; }
            .winner-wrapper {
              position: absolute;
              bottom: 90px;
              left: 90px;
              width: 1100px;
              display: flex;
              flex-direction: column;
              gap: 3px;
              animation: slideIn 0.4s ease-out;
            }
            @keyframes slideIn { from { transform: translateX(-80px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
            .winner-head {
              display: flex;
              flex-direction: column;
              background: linear-gradient(180deg, #00508c 0%, #002b54 50%, #001938 100%);
              border: 2px solid #001f3f;
              border-radius: 6px;
              transform: skewX(-15deg);
              box-shadow: 0 10px 30px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.4);
              padding: 10px 24px;
            }
            .head-top-row {
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
            .sport-title {
              transform: skewX(15deg);
              font-size: 32px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              letter-spacing: 1px;
              display: flex;
              align-items: center;
              gap: 12px;
            }
            .sub-event-bar {
              transform: skewX(15deg);
              background: linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%);
              color: #002850;
              font-size: 20px;
              font-weight: 900;
              font-style: italic;
              padding: 4px 16px;
              border-radius: 4px;
              margin-top: 6px;
              width: fit-content;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            .rings-svg {
              transform: skewX(15deg);
            }
            .winner-row {
              height: 52px;
              background: linear-gradient(180deg, #002850 0%, #001736 100%);
              border: 1px solid rgba(255,255,255,0.1);
              border-radius: 4px;
              transform: skewX(-15deg);
              display: flex;
              align-items: center;
              padding: 0 24px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.4);
            }
            .win-noc {
              transform: skewX(15deg);
              font-size: 24px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              margin-right: 10px;
            }
            .win-flag {
              transform: skewX(15deg);
              font-size: 28px;
              margin-right: 20px;
              color: #ffffff;
            }
            .win-name {
              transform: skewX(15deg);
              font-size: 28px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              text-transform: uppercase;
              flex: 1;
              letter-spacing: 1.5px;
              text-shadow: 0 2px 4px rgba(0,0,0,0.6);
            }
            .badge-wr {
              transform: skewX(15deg);
              background: linear-gradient(135deg, #ffd700, #b8860b);
              color: #000000;
              font-size: 14px;
              font-weight: 900;
              font-style: italic;
              padding: 3px 12px;
              border-radius: 12px;
              margin-right: 16px;
            }
            .win-time {
              transform: skewX(15deg);
              font-size: 30px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              letter-spacing: 1.5px;
            }
          </style>
        </head>
        <body>
          <div class="winner-wrapper">
            <div class="winner-head">
              <div class="head-top-row">
                <span class="sport-title"><span>🏊</span> ${sportName}</span>
                <svg class="rings-svg" width="75" height="34" viewBox="0 0 100 50" fill="none" stroke="#ffd700" stroke-width="5" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.9));">
                  <circle cx="20" cy="20" r="14" />
                  <circle cx="50" cy="20" r="14" />
                  <circle cx="80" cy="20" r="14" />
                  <circle cx="35" cy="32" r="14" />
                  <circle cx="65" cy="32" r="14" />
                </svg>
              </div>
              <div class="sub-event-bar">${headerLabel}</div>
            </div>
            <div class="winner-row">
              <span class="win-noc">${countryCode}</span>
              <span class="win-flag">${flagStr}</span>
              <span class="win-name">${winnerName}</span>
              <span class="badge-wr">${badgeText}</span>
              <span class="win-time">${timeStr}</span>
            </div>
          </div>
        </body>
        </html>
      `;
    }

    case "lane-indicator": {
      const laneText = `LANE ${data.lane || "1"}`;
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,800;1,900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: 'Outfit', sans-serif; }
            .lane-ind-bug {
              position: absolute;
              top: 70px;
              left: 90px;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              padding: 10px 42px;
              background: linear-gradient(180deg, #ffffff 0%, #dbeafe 45%, #cbd5e1 100%);
              border: 2px solid #0f172a;
              border-radius: 20px;
              transform: skewX(-14deg);
              box-shadow: 0 8px 24px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.9);
              animation: fadeIn 0.4s ease-out;
            }
            @keyframes fadeIn { from { opacity: 0; transform: skewX(-14deg) translateY(-20px); } to { opacity: 1; transform: skewX(-14deg) translateY(0); } }
            .lane-ind-text {
              transform: skewX(14deg);
              font-size: 28px;
              font-weight: 900;
              font-style: italic;
              color: #031b4e;
              letter-spacing: 1.5px;
              text-transform: uppercase;
              white-space: nowrap;
              text-shadow: 0 1px 1px rgba(255,255,255,0.9);
            }
          </style>
        </head>
        <body>
          <div class="lane-ind-bug">
            <span class="lane-ind-text">${laneText}</span>
          </div>
        </body>
        </html>
      `;
    }

    case "event-records": {
      const sportName = (sportTitle || "SWIMMING").toUpperCase();
      const eventName = (data.event || "WOMEN'S 200M BUTTERFLY").toUpperCase();

      const wrRow = { noc: "AUS", flag: "🇦🇺", athlete: "JESSICAH SCHIPPER", year: "2006", badge: "WR", time: "2:05.40" };
      const orRow = { noc: "USA", flag: "🇺🇸", athlete: "MISTY HYMAN", year: "2000", badge: "OR", time: "2:05.88" };

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,700;1,900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: 'Outfit', sans-serif; }
            .records-wrapper {
              position: absolute;
              bottom: 90px;
              left: 90px;
              width: 1100px;
              display: flex;
              flex-direction: column;
              gap: 3px;
              animation: slideIn 0.4s ease-out;
            }
            @keyframes slideIn { from { transform: translateX(-80px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
            .records-head {
              display: flex;
              flex-direction: column;
              background: linear-gradient(180deg, #00508c 0%, #002b54 50%, #001938 100%);
              border: 2px solid #001f3f;
              border-radius: 6px;
              transform: skewX(-15deg);
              box-shadow: 0 10px 30px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.4);
              padding: 10px 24px;
            }
            .head-top-row {
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
            .sport-title {
              transform: skewX(15deg);
              font-size: 32px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              letter-spacing: 1px;
              display: flex;
              align-items: center;
              gap: 12px;
            }
            .sub-event-bar {
              transform: skewX(15deg);
              background: linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%);
              color: #002850;
              font-size: 20px;
              font-weight: 900;
              font-style: italic;
              padding: 4px 16px;
              border-radius: 4px;
              margin-top: 6px;
              width: fit-content;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            .rings-svg {
              transform: skewX(15deg);
            }
            .record-row {
              height: 48px;
              background: linear-gradient(180deg, #002850 0%, #001736 100%);
              border: 1px solid rgba(255,255,255,0.1);
              border-radius: 4px;
              transform: skewX(-15deg);
              display: flex;
              align-items: center;
              padding: 0 24px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.4);
            }
            .rec-noc {
              transform: skewX(15deg);
              font-size: 22px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              margin-right: 10px;
            }
            .rec-flag {
              transform: skewX(15deg);
              font-size: 26px;
              margin-right: 18px;
              color: #ffffff;
            }
            .rec-name {
              transform: skewX(15deg);
              font-size: 24px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              text-transform: uppercase;
              flex: 1;
              letter-spacing: 1px;
            }
            .rec-year {
              transform: skewX(15deg);
              font-size: 22px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              margin-right: 14px;
            }
            .badge-wr {
              transform: skewX(15deg);
              background: linear-gradient(135deg, #ffd700, #b8860b);
              color: #000000;
              font-size: 14px;
              font-weight: 900;
              font-style: italic;
              padding: 3px 10px;
              border-radius: 12px;
              margin-right: 16px;
            }
            .badge-or {
              transform: skewX(15deg);
              background: linear-gradient(135deg, #e2e8f0, #94a3b8);
              color: #000000;
              font-size: 14px;
              font-weight: 900;
              font-style: italic;
              padding: 3px 10px;
              border-radius: 12px;
              margin-right: 16px;
            }
            .rec-time {
              transform: skewX(15deg);
              font-size: 26px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              letter-spacing: 1px;
            }
          </style>
        </head>
        <body>
          <div class="records-wrapper">
            <div class="records-head">
              <div class="head-top-row">
                <span class="sport-title"><span>🏊</span> ${sportName}</span>
                <svg class="rings-svg" width="75" height="34" viewBox="0 0 100 50" fill="none" stroke="#ffd700" stroke-width="5" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.9));">
                  <circle cx="20" cy="20" r="14" />
                  <circle cx="50" cy="20" r="14" />
                  <circle cx="80" cy="20" r="14" />
                  <circle cx="35" cy="32" r="14" />
                  <circle cx="65" cy="32" r="14" />
                </svg>
              </div>
              <div class="sub-event-bar">${eventName}</div>
            </div>
            ${[wrRow, orRow].map(r => `
              <div class="record-row">
                <span class="rec-noc">${r.noc}</span>
                <span class="rec-flag">${r.flag}</span>
                <span class="rec-name">${r.athlete}</span>
                <span class="rec-year">${r.year}</span>
                <span class="${r.badge === 'WR' ? 'badge-wr' : 'badge-or'}">${r.badge}</span>
                <span class="rec-time">${r.time}</span>
              </div>
            `).join('')}
          </div>
        </body>
        </html>
      `;
    }

    case "team-list-by-lane": {
      const laneNum = String(data.lane || "5");
      const countryCode = (data.country || "AUS").toUpperCase();
      const flagStr = data.flag || "🇦🇺";
      const teamName = (data.teamName || data.countryName || "AUSTRALIA").toUpperCase();
      const members = Array.isArray(data.members) ? data.members : ["NICK FFROST", "GRANT BRITS", "KIRK PALMER", "LEITH BRODIE"];

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,700;1,900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: 'Outfit', sans-serif; }
            .team-lane-wrapper {
              position: absolute;
              bottom: 90px;
              left: 90px;
              width: 1100px;
              display: flex;
              flex-direction: column;
              gap: 3px;
              animation: slideIn 0.4s ease-out;
            }
            @keyframes slideIn { from { transform: translateX(-80px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
            .team-lane-head {
              display: flex;
              align-items: center;
              height: 56px;
              background: linear-gradient(180deg, #00508c 0%, #002b54 50%, #001938 100%);
              border: 2px solid #001f3f;
              border-radius: 6px;
              transform: skewX(-15deg);
              box-shadow: 0 10px 30px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.4);
              padding: 0 24px;
            }
            .lane-num {
              transform: skewX(15deg);
              font-size: 26px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              margin-right: 14px;
              width: 24px;
              text-align: center;
            }
            .country-code {
              transform: skewX(15deg);
              font-size: 24px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              margin-right: 14px;
              letter-spacing: 1px;
            }
            .flag-box {
              transform: skewX(15deg);
              font-size: 28px;
              margin-right: 20px;
              display: flex;
              align-items: center;
              color: #ffffff;
            }
            .team-name {
              transform: skewX(15deg);
              font-size: 30px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              text-transform: uppercase;
              letter-spacing: 1.5px;
              flex: 1;
              text-shadow: 0 2px 4px rgba(0,0,0,0.6);
            }
            .rings-svg {
              transform: skewX(15deg);
              margin-left: 12px;
            }
            .member-row {
              height: 44px;
              background: linear-gradient(180deg, #002850 0%, #001736 100%);
              border: 1px solid rgba(255,255,255,0.1);
              border-radius: 4px;
              transform: skewX(-15deg);
              display: flex;
              align-items: center;
              padding: 0 28px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.4);
            }
            .member-name {
              transform: skewX(15deg);
              font-size: 22px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              text-transform: uppercase;
              letter-spacing: 1.2px;
            }
          </style>
        </head>
        <body>
          <div class="team-lane-wrapper">
            <div class="team-lane-head">
              <span class="lane-num">${laneNum}</span>
              <span class="country-code">${countryCode}</span>
              <span class="flag-box">${flagStr}</span>
              <span class="team-name">${teamName}</span>
              <svg class="rings-svg" width="75" height="34" viewBox="0 0 100 50" fill="none" stroke="#ffd700" stroke-width="5" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.9));">
                <circle cx="20" cy="20" r="14" />
                <circle cx="50" cy="20" r="14" />
                <circle cx="80" cy="20" r="14" />
                <circle cx="35" cy="32" r="14" />
                <circle cx="65" cy="32" r="14" />
              </svg>
            </div>
            ${members.slice(0, 4).map(m => `
              <div class="member-row">
                <span class="member-name">${m}</span>
              </div>
            `).join('')}
          </div>
        </body>
        </html>
      `;
    }

    case "lane-id": {
      const laneNum = String(data.lane || "4");
      const countryCode = (data.country || "POL").toUpperCase();
      const flagStr = data.flag || "🇵🇱";
      const athleteName = (data.athlete || "OTYLIA JEDRZEJCZAK").toUpperCase();

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,700;1,900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: 'Outfit', sans-serif; }
            .lane-id-bar {
              position: absolute;
              bottom: 90px;
              left: 90px;
              display: flex;
              align-items: center;
              width: 1100px;
              height: 56px;
              background: linear-gradient(180deg, #00508c 0%, #002b54 50%, #001938 100%);
              border: 2px solid #001f3f;
              border-radius: 6px;
              transform: skewX(-15deg);
              box-shadow: 0 10px 30px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.4);
              padding: 0 24px;
              animation: slideIn 0.4s ease-out;
            }
            @keyframes slideIn { from { transform: skewX(-15deg) translateX(-80px); opacity: 0; } to { transform: skewX(-15deg) translateX(0); opacity: 1; } }
            .lane-num {
              transform: skewX(15deg);
              font-size: 26px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              margin-right: 14px;
              width: 24px;
              text-align: center;
            }
            .country-code {
              transform: skewX(15deg);
              font-size: 24px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              margin-right: 14px;
              letter-spacing: 1px;
            }
            .flag-box {
              transform: skewX(15deg);
              font-size: 28px;
              margin-right: 20px;
              display: flex;
              align-items: center;
              color: #ffffff;
            }
            .athlete-name {
              transform: skewX(15deg);
              font-size: 30px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              text-transform: uppercase;
              letter-spacing: 1.5px;
              flex: 1;
              text-shadow: 0 2px 4px rgba(0,0,0,0.6);
            }
            .rings-svg {
              transform: skewX(15deg);
              margin-left: 12px;
            }
          </style>
        </head>
        <body>
          <div class="lane-id-bar">
            <span class="lane-num">${laneNum}</span>
            <span class="country-code">${countryCode}</span>
            <span class="flag-box">${flagStr}</span>
            <span class="athlete-name">${athleteName}</span>
            <svg class="rings-svg" width="75" height="34" viewBox="0 0 100 50" fill="none" stroke="#ffd700" stroke-width="5" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.9));">
              <circle cx="20" cy="20" r="14" />
              <circle cx="50" cy="20" r="14" />
              <circle cx="80" cy="20" r="14" />
              <circle cx="35" cy="32" r="14" />
              <circle cx="65" cy="32" r="14" />
            </svg>
          </div>
        </body>
        </html>
      `;
    }

    case "non-comp-area": {
      const areaName = (data.areaName || "WARM UP POOL").toUpperCase();
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,800;1,900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: 'Outfit', sans-serif; }
            .non-comp-bug {
              position: absolute;
              top: 70px;
              left: 90px;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              padding: 10px 42px;
              background: linear-gradient(180deg, #ffffff 0%, #dbeafe 45%, #cbd5e1 100%);
              border: 2px solid #0f172a;
              border-radius: 20px;
              transform: skewX(-14deg);
              box-shadow: 0 8px 24px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.9);
              animation: fadeIn 0.4s ease-out;
            }
            @keyframes fadeIn { from { opacity: 0; transform: skewX(-14deg) translateY(-20px); } to { opacity: 1; transform: skewX(-14deg) translateY(0); } }
            .non-comp-text {
              transform: skewX(14deg);
              font-size: 28px;
              font-weight: 900;
              font-style: italic;
              color: #031b4e;
              letter-spacing: 1.5px;
              text-transform: uppercase;
              white-space: nowrap;
              text-shadow: 0 1px 1px rgba(255,255,255,0.9);
            }
          </style>
        </head>
        <body>
          <div class="non-comp-bug">
            <span class="non-comp-text">${areaName}</span>
          </div>
        </body>
        </html>
      `;
    }

    case "medal-presenter": {
      const isFlower = (templateName || "").toLowerCase().includes("flower") || (templateId || "").toLowerCase().includes("019");
      const defaultName = isFlower ? "MR BILL MATSON" : "JACQUES ROGGE";
      const defaultTitle = isFlower ? "VICE PRESIDENT, FINA" : "IOC PRESIDENT, BELGIUM";

      const presenterName = (data.presenter || data.athlete || defaultName).toUpperCase();
      const presenterTitle = (data.title || data.designation || defaultTitle).toUpperCase();

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:ital,wght@1,700;1,900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: 1920px; height: 1080px; overflow: hidden; background: transparent; font-family: 'Outfit', sans-serif; }
            .pres-wrapper {
              position: absolute;
              bottom: 90px;
              left: 90px;
              width: 1100px;
              display: flex;
              flex-direction: column;
              gap: 3px;
              animation: slideIn 0.4s ease-out;
            }
            @keyframes slideIn { from { transform: translateX(-80px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
            .pres-head {
              display: flex;
              align-items: center;
              justify-content: space-between;
              height: 56px;
              background: linear-gradient(180deg, #00508c 0%, #002b54 50%, #001938 100%);
              border: 2px solid #001f3f;
              border-radius: 6px;
              transform: skewX(-15deg);
              box-shadow: 0 10px 30px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.4);
              padding: 0 24px;
            }
            .pres-name {
              transform: skewX(15deg);
              font-size: 30px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              letter-spacing: 1.5px;
              text-transform: uppercase;
              text-shadow: 0 2px 4px rgba(0,0,0,0.6);
            }
            .rings-svg {
              transform: skewX(15deg);
            }
            .pres-sub-bar {
              height: 44px;
              background: linear-gradient(180deg, #002850 0%, #001736 100%);
              border: 1px solid rgba(255,255,255,0.1);
              border-radius: 4px;
              transform: skewX(-15deg);
              display: flex;
              align-items: center;
              padding: 0 24px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.4);
            }
            .pres-title {
              transform: skewX(15deg);
              font-size: 22px;
              font-weight: 900;
              font-style: italic;
              color: #ffffff;
              text-transform: uppercase;
              letter-spacing: 1.2px;
            }
          </style>
        </head>
        <body>
          <div class="pres-wrapper">
            <div class="pres-head">
              <span class="pres-name">${presenterName}</span>
              <svg class="rings-svg" width="75" height="34" viewBox="0 0 100 50" fill="none" stroke="#ffd700" stroke-width="5" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.9));">
                <circle cx="20" cy="20" r="14" />
                <circle cx="50" cy="20" r="14" />
                <circle cx="80" cy="20" r="14" />
                <circle cx="35" cy="32" r="14" />
                <circle cx="65" cy="32" r="14" />
              </svg>
            </div>
            <div class="pres-sub-bar">
              <span class="pres-title">${presenterTitle}</span>
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
            <div class="res-row"><span class="badge-gold">1 GOLD</span><span style="margin-left:20px;flex:1;">${data.athlete || "MICHAEL PHELPS"}</span><span>${data.country || "USA"}</span><span style="margin-left:20px;color:${accentColor};">${data.time || data.score || "1st"}</span></div>
            <div class="res-row"><span class="badge-silver">2 SILV</span><span style="margin-left:20px;flex:1;">CHAD LE CLOS</span><span>RSA</span><span style="margin-left:20px;">+0.12</span></div>
            <div class="res-row"><span class="badge-bronze">3 BRNZ</span><span style="margin-left:20px;flex:1;">EVGENY KOROTYSHKIN</span><span>RUS</span><span style="margin-left:20px;">+0.35</span></div>
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
            ${[{pos:'🥇 1',name:data.athlete||'MICHAEL PHELPS',noc:data.country||'USA',res:data.time||'3:33.10'},{pos:'2',name:'CHAD LE CLOS',noc:'RSA',res:'+0.12'},{pos:'3',name:'EVGENY KOROTYSHKIN',noc:'RUS',res:'+0.35'},{pos:'4',name:'MILORAD ČAVIĆ',noc:'SRB',res:'+0.72'},{pos:'5',name:'TYLER MCGILL',noc:'USA',res:'+1.01'},{pos:'6',name:'STEFFEN DEIBLER',noc:'GER',res:'+1.45'}].map(r => `
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
            <div class="cmp-row"><span>${data.athlete || 'MICHAEL PHELPS'} <span class="pos">#1</span></span><span style="color:${accentColor};">${data.time || '52.3s'}</span><span>1:52.4</span><span style="color:${accentColor};">${data.score || '3:33.1'}</span></div>
            <div class="cmp-row"><span>CHAD LE CLOS <span class="pos">#2</span></span><span>52.8s</span><span>1:53.1</span><span>+0.12</span></div>
            <div class="cmp-row"><span>EVGENY KOROTYSHKIN <span class="pos">#3</span></span><span>53.0s</span><span>1:53.5</span><span>+0.35</span></div>
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

  const category = resolveCategory(templateType, templateName, templateId);
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
      const scheduleEntries = [
        { time: "09:00", name: "Opening Warm-Up Session", status: "COMPLETED", color: "#4ade80" },
        { time: "09:30", name: data.event || "Preliminary Round / Heats", status: "COMPLETED", color: "#4ade80" },
        { time: "10:45", name: "Quarter-Finals Phase 1", status: "COMPLETED", color: "#4ade80" },
        { time: "11:30", name: "Quarter-Finals Phase 2", status: "COMPLETED", color: "#4ade80" },
        { time: "14:00", name: "Semi-Finals Heat 1", status: "LIVE", color: "#38bdf8" },
        { time: "14:45", name: "Semi-Finals Heat 2", status: "UPCOMING", color: "#facc15" },
        { time: "16:30", name: "Gold Medal Final Match", status: "UPCOMING", color: "#facc15" },
        { time: "17:15", name: "Victory Ceremony", status: "UPCOMING", color: "#facc15" }
      ];

      const cardBg = new fabric.Rect(createProps('rect', {
        left: 90, top: 100, width: 780, height: 450, fill: '#0f172a', rx: 12, ry: 12
      }));
      const headBg = new fabric.Rect(createProps('rect', {
        left: 90, top: 100, width: 780, height: 55, fill: primaryColor, rx: 12, ry: 12
      }));
      const headAccent = new fabric.Rect(createProps('rect', {
        left: 90, top: 151, width: 780, height: 4, fill: accentColor
      }));
      const titleText = new fabric.Textbox("🗓️ EVENT SCHEDULE", createProps('textbox', {
        left: 110, top: 115, fontSize: 20, fontWeight: 'bold', fill: '#ffffff', width: 340
      }));
      const venueText = new fabric.Textbox(`${sportTitle} • ${venueTitle}`, createProps('textbox', {
        left: 420, top: 117, fontSize: 14, fontWeight: 'bold', fill: accentColor, width: 430, textAlign: 'right'
      }));

      objects.push(cardBg, headBg, headAccent, titleText, venueText);

      scheduleEntries.forEach((entry, idx) => {
        const y = 165 + idx * 46;
        const rowBg = new fabric.Rect(createProps('rect', {
          left: 90, top: y, width: 780, height: 44, fill: idx % 2 === 0 ? '#1e293b' : '#0f172a'
        }));
        const timeTxt = new fabric.Textbox(entry.time, createProps('textbox', {
          left: 110, top: y + 12, fontSize: 15, fontWeight: 'bold', fill: accentColor, width: 70
        }));
        const nameTxt = new fabric.Textbox(entry.name, createProps('textbox', {
          left: 190, top: y + 12, fontSize: 15, fontWeight: 'bold', fill: '#ffffff', width: 460
        }));
        const badgeTxt = new fabric.Textbox(entry.status, createProps('textbox', {
          left: 660, top: y + 13, fontSize: 12, fontWeight: 'bold', fill: entry.color, width: 190, textAlign: 'right'
        }));
        objects.push(rowBg, timeTxt, nameTxt, badgeTxt);
      });
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
      const athleteText = new fabric.Textbox(`${(data.athlete || "MICHAEL PHELPS").toUpperCase()} (${(data.country || code).toUpperCase()})`, createProps('textbox', {
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
        const nameText = new fabric.Textbox((data.athlete || data.athleteA || "MICHAEL PHELPS").toUpperCase(), createProps('textbox', {
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
        const crewName = new fabric.Textbox((data.athlete || data.teamA || "DAVID DAVIES & K.A. PAYNE").toUpperCase(), createProps('textbox', {
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
        const champName = new fabric.Textbox((data.athlete || "USAIN BOLT").toUpperCase(), createProps('textbox', {
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
        const personName = new fabric.Textbox((data.athlete || "BOB BOWMAN").toUpperCase(), createProps('textbox', {
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

        const heatAthletes = [
          { name: "MICHAEL PHELPS", noc: "USA" },
          { name: "CHAD LE CLOS", noc: "RSA" },
          { name: "EVGENY KOROTYSHKIN", noc: "RUS" },
          { name: "MILORAD ČAVIĆ", noc: "SRB" },
          { name: "TYLER MCGILL", noc: "USA" },
          { name: "STEFFEN DEIBLER", noc: "GER" }
        ];
        heatAthletes.forEach((ath, idx) => {
          const n = idx + 1;
          const y = 180 + idx * 45;
          const rowBg = new fabric.Rect(createProps('rect', {
            left: 1270, top: y, width: 560, height: 44, fill: n % 2 === 0 ? '#1e293b' : '#0a0e1e'
          }));
          const circle = new fabric.Circle(createProps('circle', {
            left: 1285, top: y + 7, radius: 15, fill: secondaryColor
          }));
          const laneText = new fabric.Textbox(String(n), createProps('textbox', {
            left: 1285, top: y + 13, fontSize: 16, fontWeight: 'bold', fill: accentColor, width: 30, textAlign: 'center'
          }));
          const nameText = new fabric.Textbox(ath.name, createProps('textbox', {
            left: 1330, top: y + 12, fontSize: 17, fontWeight: 'bold', fill: '#ffffff', width: 350
          }));
          const nocText = new fabric.Textbox(ath.noc, createProps('textbox', {
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
        const goldAthlete = new fabric.Textbox((data.athlete || "MICHAEL PHELPS").toUpperCase(), createProps('textbox', {
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
        const silverAthlete = new fabric.Textbox("CHAD LE CLOS", createProps('textbox', {
          left: 220, top: 274, fontSize: 20, fontWeight: 'bold', fill: '#ffffff', width: 380
        }));
        const silverNoc = new fabric.Textbox("RSA", createProps('textbox', {
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
        const bronzeAthlete = new fabric.Textbox("EVGENY KOROTYSHKIN", createProps('textbox', {
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
          { pos: '🥇 1', name: (data.athlete || 'MICHAEL PHELPS').toUpperCase(), noc: data.country || 'USA', res: data.time || '3:33.10' },
          { pos: '2', name: 'CHAD LE CLOS', noc: 'RSA', res: '+0.12' },
          { pos: '3', name: 'EVGENY KOROTYSHKIN', noc: 'RUS', res: '+0.35' },
          { pos: '4', name: 'MILORAD ČAVIĆ', noc: 'SRB', res: '+0.72' },
          { pos: '5', name: 'TYLER MCGILL', noc: 'USA', res: '+1.01' },
          { pos: '6', name: 'STEFFEN DEIBLER', noc: 'GER', res: '+1.45' }
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

        const r2Name = new fabric.Textbox("CHAD LE CLOS #2", createProps('textbox', { left: 1150, top: 262, fontSize: 16, fontWeight: 'bold', fill: '#ffffff', width: 250 }));
        const r2C2 = new fabric.Textbox('52.8s', createProps('textbox', { left: 1410, top: 262, fontSize: 16, fontWeight: 'bold', fill: '#ffffff', width: 120 }));
        const r2C3 = new fabric.Textbox('1:53.1', createProps('textbox', { left: 1540, top: 262, fontSize: 16, fontWeight: 'bold', fill: '#ffffff', width: 120 }));
        const r2C4 = new fabric.Textbox('+0.12', createProps('textbox', { left: 1670, top: 262, fontSize: 16, fontWeight: 'bold', fill: '#ffffff', width: 140, textAlign: 'right' }));

        const r3Name = new fabric.Textbox("EVGENY KOROTYSHKIN #3", createProps('textbox', { left: 1150, top: 302, fontSize: 16, fontWeight: 'bold', fill: '#ffffff', width: 250 }));
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

    case 'football-additional-time': {
      const labelStr = (data.label || "ADDITIONAL TIME").toUpperCase();
      const timeVal = String(data.time || data.value || "4:00");

      const lBg = new fabric.Rect(createProps('rect', {
        left: 120, top: 900, width: 160, height: 38, fill: '#ffffff', rx: 4, ry: 4, skewX: -15
      }));
      const lTxt = new fabric.Textbox(labelStr, createProps('textbox', {
        left: 125, top: 911, fontSize: 13, fontWeight: 'bold', fontStyle: 'italic', fill: '#002850', width: 150
      }));
      const vBg = new fabric.Rect(createProps('rect', {
        left: 282, top: 900, width: 100, height: 38, fill: '#003366', rx: 4, ry: 4, skewX: -15
      }));
      const vTxt = new fabric.Textbox(timeVal, createProps('textbox', {
        left: 282, top: 908, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 100, textAlign: 'center'
      }));

      objects.push(lBg, lTxt, vBg, vTxt);
      break;
    }

    case 'football-pso-crunch': {
      const team1Noc = (data.team1Noc || data.noc1 || "NGR").toUpperCase();
      const team1Flag = data.team1Flag || data.flag1 || "🇳🇬";
      const team1Val = String(data.team1Val !== undefined ? data.team1Val : "2");

      const team2Noc = (data.team2Noc || data.noc2 || "ARG").toUpperCase();
      const team2Flag = data.team2Flag || data.flag2 || "🇦🇷";
      const team2Val = String(data.team2Val !== undefined ? data.team2Val : "1");

      const r1Bg = new fabric.Rect(createProps('rect', { left: 120, top: 100, width: 280, height: 38, fill: '#003366', rx: 4, ry: 4, skewX: -15 }));
      const r1Noc = new fabric.Textbox(team1Noc, createProps('textbox', { left: 135, top: 109, fontSize: 16, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 40 }));
      const r1Flag = new fabric.Textbox(team1Flag, createProps('textbox', { left: 180, top: 107, fontSize: 16, fill: '#ffffff', width: 30 }));
      const r1Val = new fabric.Textbox(team1Val, createProps('textbox', { left: 235, top: 107, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 25 }));

      const r1g1 = new fabric.Rect(createProps('rect', { left: 290, top: 109, width: 18, height: 16, fill: '#ef4444', rx: 2, ry: 2, skewX: -15 }));
      const r1g2 = new fabric.Rect(createProps('rect', { left: 312, top: 109, width: 18, height: 16, fill: '#22c55e', rx: 2, ry: 2, skewX: -15 }));
      const r1g3 = new fabric.Rect(createProps('rect', { left: 334, top: 109, width: 18, height: 16, fill: '#22c55e', rx: 2, ry: 2, skewX: -15 }));

      const r2Bg = new fabric.Rect(createProps('rect', { left: 120, top: 140, width: 280, height: 38, fill: '#001a38', rx: 4, ry: 4, skewX: -15 }));
      const r2Noc = new fabric.Textbox(team2Noc, createProps('textbox', { left: 135, top: 149, fontSize: 16, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 40 }));
      const r2Flag = new fabric.Textbox(team2Flag, createProps('textbox', { left: 180, top: 147, fontSize: 16, fill: '#ffffff', width: 30 }));
      const r2Val = new fabric.Textbox(team2Val, createProps('textbox', { left: 235, top: 147, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 25 }));

      const r2g1 = new fabric.Rect(createProps('rect', { left: 290, top: 149, width: 18, height: 16, fill: '#ef4444', rx: 2, ry: 2, skewX: -15 }));
      const r2g2 = new fabric.Rect(createProps('rect', { left: 312, top: 149, width: 18, height: 16, fill: '#22c55e', rx: 2, ry: 2, skewX: -15 }));

      const subBg = new fabric.Rect(createProps('rect', { left: 180, top: 180, width: 160, height: 22, fill: '#001e3d', rx: 4, ry: 4, skewX: -15 }));
      const subTxt = new fabric.Textbox("SHOOT-OUT", createProps('textbox', { left: 180, top: 184, fontSize: 11, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 160, textAlign: 'center' }));

      objects.push(r1Bg, r1Noc, r1Flag, r1Val, r1g1, r1g2, r1g3, r2Bg, r2Noc, r2Flag, r2Val, r2g1, r2g2, subBg, subTxt);
      break;
    }

    case 'football-bracket-semifinals':
    case 'football-bracket-finals': {
      const isFinals = category === 'football-bracket-finals';
      const eventTitle = (data.event || "MEN'S FOOTBALL").toUpperCase();
      const subTitle = (data.subTitle || (isFinals ? "SEMI-FINALS ➔ GOLD MEDAL MATCH" : "QUARTER-FINALS ➔ SEMI-FINALS")).toUpperCase();

      const pairsList = isFinals ? [
        { t1Noc: "NGR", t1Flag: "🇳🇬", t1Name: "NIGERIA", t2Noc: "BEL", t2Flag: "🇧🇪", t2Name: "BELGIUM", advNoc: "NGR", advFlag: "🇳🇬", advName: "NIGERIA" },
        { t1Noc: "ARG", t1Flag: "🇦🇷", t1Name: "ARGENTINA", t2Noc: "BRA", t2Flag: "🇧🇷", t2Name: "BRAZIL", advNoc: "ARG", advFlag: "🇦🇷", advName: "ARGENTINA" }
      ] : [
        { t1Noc: "BRA", t1Flag: "🇧🇷", t1Name: "BRAZIL", t2Noc: "CMR", t2Flag: "🇨🇲", t2Name: "CAMEROON", advNoc: "BRA", advFlag: "🇧🇷", advName: "BRAZIL" },
        { t1Noc: "ITA", t1Flag: "🇮🇹", t1Name: "ITALY", t2Noc: "BEL", t2Flag: "🇧🇪", t2Name: "BELGIUM", advNoc: "BEL", advFlag: "🇧🇪", advName: "BELGIUM" },
        { t1Noc: "ARG", t1Flag: "🇦🇷", t1Name: "ARGENTINA", t2Noc: "NED", t2Flag: "🇳🇱", t2Name: "NETHERLANDS", advNoc: "ARG", advFlag: "🇦🇷", advName: "ARGENTINA" },
        { t1Noc: "NGR", t1Flag: "🇳🇬", t1Name: "NIGERIA", t2Noc: "CIV", t2Flag: "🇨🇮", t2Name: "COTE D'IVOIRE", advNoc: "NGR", advFlag: "🇳🇬", advName: "NIGERIA" }
      ];

      // Header Bar
      const headBg = new fabric.Rect(createProps('rect', {
        left: 90, top: 560, width: 960, height: 60, fill: '#003366', rx: 6, ry: 6,
        stroke: '#001938', strokeWidth: 2, skewX: -15
      }));
      const iconTxt = new fabric.Textbox("⚽", createProps('textbox', { left: 110, top: 574, fontSize: 24, fill: '#ffffff', width: 35 }));
      const titleTxt = new fabric.Textbox(eventTitle, createProps('textbox', { left: 155, top: 568, fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 400 }));
      const pillBg = new fabric.Rect(createProps('rect', { left: 155, top: 594, width: 480, height: 20, fill: '#ffffff', rx: 4, ry: 4, skewX: -15 }));
      const pillTxt = new fabric.Textbox(subTitle, createProps('textbox', { left: 165, top: 596, fontSize: 12, fontWeight: 'bold', fontStyle: 'italic', fill: '#002850', width: 460 }));

      const ringColor = '#ffd700';
      const r1 = new fabric.Circle(createProps('circle', { left: 950, top: 573, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r2 = new fabric.Circle(createProps('circle', { left: 970, top: 573, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r3 = new fabric.Circle(createProps('circle', { left: 990, top: 573, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r4 = new fabric.Circle(createProps('circle', { left: 960, top: 582, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r5 = new fabric.Circle(createProps('circle', { left: 980, top: 582, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));

      objects.push(headBg, iconTxt, titleTxt, pillBg, pillTxt, r1, r2, r3, r4, r5);

      pairsList.forEach((p, idx) => {
        const topOffset = 625 + (idx * 85);

        const r1Bg = new fabric.Rect(createProps('rect', { left: 90, top: topOffset, width: 560, height: 38, fill: '#001e3d', rx: 4, ry: 4, stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, skewX: -15 }));
        const t1Noc = new fabric.Textbox(p.t1Noc, createProps('textbox', { left: 110, top: topOffset + 8, fontSize: 17, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 45 }));
        const t1Flag = new fabric.Textbox(p.t1Flag, createProps('textbox', { left: 160, top: topOffset + 6, fontSize: 18, fill: '#ffffff', width: 35 }));
        const t1Name = new fabric.Textbox((p.t1Name || '').toUpperCase(), createProps('textbox', { left: 205, top: topOffset + 8, fontSize: 17, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 300 }));

        const r2Bg = new fabric.Rect(createProps('rect', { left: 90, top: topOffset + 42, width: 560, height: 38, fill: '#001736', rx: 4, ry: 4, stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, skewX: -15 }));
        const t2Noc = new fabric.Textbox(p.t2Noc, createProps('textbox', { left: 110, top: topOffset + 50, fontSize: 17, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 45 }));
        const t2Flag = new fabric.Textbox(p.t2Flag, createProps('textbox', { left: 160, top: topOffset + 48, fontSize: 18, fill: '#ffffff', width: 35 }));
        const t2Name = new fabric.Textbox((p.t2Name || '').toUpperCase(), createProps('textbox', { left: 205, top: topOffset + 50, fontSize: 17, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 300 }));

        const advBg = new fabric.Rect(createProps('rect', { left: 680, top: topOffset + 20, width: 370, height: 42, fill: '#003e73', rx: 6, ry: 6, stroke: '#38bdf8', strokeWidth: 1, skewX: -15 }));
        const advNoc = new fabric.Textbox(p.advNoc, createProps('textbox', { left: 700, top: topOffset + 30, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 45 }));
        const advFlag = new fabric.Textbox(p.advFlag, createProps('textbox', { left: 750, top: topOffset + 28, fontSize: 18, fill: '#ffffff', width: 35 }));
        const advName = new fabric.Textbox((p.advName || '').toUpperCase(), createProps('textbox', { left: 795, top: topOffset + 30, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 240 }));

        objects.push(r1Bg, t1Noc, t1Flag, t1Name, r2Bg, t2Noc, t2Flag, t2Name, advBg, advNoc, advFlag, advName);
      });
      break;
    }

    case 'football-final-rank': {
      const eventTitle = (data.event || "MEN'S FOOTBALL").toUpperCase();
      const subTitle = (data.subTitle || "FINAL RANK").toUpperCase();

      const rankList = Array.isArray(data.ranks) ? data.ranks : [
        { rank: "1", noc: "ARG", flag: "🇦🇷", name: "ARGENTINA" },
        { rank: "2", noc: "NGR", flag: "🇳🇬", name: "NIGERIA" },
        { rank: "3", noc: "BRA", flag: "🇧🇷", name: "BRAZIL" },
        { rank: "4", noc: "BEL", flag: "🇧🇪", name: "BELGIUM" },
        { rank: "5", noc: "ITA", flag: "🇮🇹", name: "ITALY" },
        { rank: "6", noc: "CIV", flag: "🇨🇮", name: "COTE D'IVOIRE" },
        { rank: "7", noc: "NED", flag: "🇳🇱", name: "NETHERLANDS" },
        { rank: "8", noc: "CMR", flag: "🇨🇲", name: "CAMEROON" }
      ];

      // Header Bar
      const headBg = new fabric.Rect(createProps('rect', {
        left: 90, top: 580, width: 960, height: 60, fill: '#003366', rx: 6, ry: 6,
        stroke: '#001938', strokeWidth: 2, skewX: -15
      }));
      const iconTxt = new fabric.Textbox("⚽", createProps('textbox', { left: 110, top: 594, fontSize: 24, fill: '#ffffff', width: 35 }));
      const titleTxt = new fabric.Textbox(eventTitle, createProps('textbox', { left: 155, top: 588, fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 400 }));
      const pillBg = new fabric.Rect(createProps('rect', { left: 155, top: 614, width: 480, height: 20, fill: '#ffffff', rx: 4, ry: 4, skewX: -15 }));
      const pillTxt = new fabric.Textbox(subTitle, createProps('textbox', { left: 165, top: 616, fontSize: 12, fontWeight: 'bold', fontStyle: 'italic', fill: '#002850', width: 460 }));

      const ringColor = '#ffd700';
      const r1 = new fabric.Circle(createProps('circle', { left: 950, top: 593, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r2 = new fabric.Circle(createProps('circle', { left: 970, top: 593, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r3 = new fabric.Circle(createProps('circle', { left: 990, top: 593, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r4 = new fabric.Circle(createProps('circle', { left: 960, top: 602, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r5 = new fabric.Circle(createProps('circle', { left: 980, top: 602, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));

      objects.push(headBg, iconTxt, titleTxt, pillBg, pillTxt, r1, r2, r3, r4, r5);

      rankList.forEach((rk, idx) => {
        const topOffset = 644 + (idx * 42);

        const rowBg = new fabric.Rect(createProps('rect', { left: 90, top: topOffset, width: 960, height: 40, fill: idx % 2 === 0 ? '#001e3d' : '#001736', rx: 4, ry: 4, stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, skewX: -15 }));
        const rkBadge = new fabric.Rect(createProps('rect', { left: 105, top: topOffset + 6, width: 30, height: 26, fill: '#dc2626', rx: 3, ry: 3, skewX: -15 }));
        const rkTxt = new fabric.Textbox(String(rk.rank), createProps('textbox', { left: 105, top: topOffset + 10, fontSize: 16, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 30, textAlign: 'center' }));
        const nocTxt = new fabric.Textbox(rk.noc, createProps('textbox', { left: 155, top: topOffset + 9, fontSize: 17, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 45 }));
        const flagTxt = new fabric.Textbox(rk.flag, createProps('textbox', { left: 205, top: topOffset + 7, fontSize: 18, fill: '#ffffff', width: 35 }));
        const nameTxt = new fabric.Textbox((rk.name || '').toUpperCase(), createProps('textbox', { left: 250, top: topOffset + 9, fontSize: 17, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 400 }));

        objects.push(rowBg, rkBadge, rkTxt, nocTxt, flagTxt, nameTxt);
      });
      break;
    }

    case 'football-ceremony-id': {
      const eventTitle = (data.event || "MEN'S FOOTBALL").toUpperCase();
      const subTitle = (data.subTitle || "VICTORY CEREMONY").toUpperCase();

      const headBg = new fabric.Rect(createProps('rect', { left: 90, top: 840, width: 860, height: 56, fill: '#003366', rx: 6, ry: 6, stroke: '#001938', strokeWidth: 2, skewX: -15 }));
      const iconTxt = new fabric.Textbox("⚽", createProps('textbox', { left: 115, top: 854, fontSize: 24, fill: '#ffffff', width: 35 }));
      const eventTxt = new fabric.Textbox(eventTitle, createProps('textbox', { left: 160, top: 850, fontSize: 24, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 600 }));

      const ringColor = '#ffd700';
      const r1 = new fabric.Circle(createProps('circle', { left: 860, top: 853, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r2 = new fabric.Circle(createProps('circle', { left: 880, top: 853, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r3 = new fabric.Circle(createProps('circle', { left: 900, top: 853, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r4 = new fabric.Circle(createProps('circle', { left: 870, top: 862, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r5 = new fabric.Circle(createProps('circle', { left: 890, top: 862, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));

      const subBg = new fabric.Rect(createProps('rect', { left: 90, top: 900, width: 860, height: 44, fill: '#ffffff', rx: 4, ry: 4, skewX: -15 }));
      const subTxt = new fabric.Textbox(subTitle, createProps('textbox', { left: 115, top: 910, fontSize: 20, fontWeight: 'bold', fontStyle: 'italic', fill: '#002850', width: 600 }));

      objects.push(headBg, iconTxt, eventTxt, r1, r2, r3, r4, r5, subBg, subTxt);
      break;
    }

    case 'football-medal-id': {
      const countryCode = (data.country || data.noc || "ARG").toUpperCase();
      const flagStr = data.flag || "🇦🇷";
      const teamName = (data.name || "ARGENTINA").toUpperCase();
      const subTitle = (data.subTitle || "GOLD - MEN'S FOOTBALL").toUpperCase();

      const headBg = new fabric.Rect(createProps('rect', { left: 90, top: 840, width: 860, height: 56, fill: '#003366', rx: 6, ry: 6, stroke: '#001938', strokeWidth: 2, skewX: -15 }));
      const nocTxt = new fabric.Textbox(countryCode, createProps('textbox', { left: 115, top: 852, fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 55 }));
      const flagTxt = new fabric.Textbox(flagStr, createProps('textbox', { left: 175, top: 850, fontSize: 24, fill: '#ffffff', width: 40 }));
      const nameTxt = new fabric.Textbox(teamName, createProps('textbox', { left: 225, top: 850, fontSize: 24, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 550 }));

      const ringColor = '#ffd700';
      const r1 = new fabric.Circle(createProps('circle', { left: 860, top: 853, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r2 = new fabric.Circle(createProps('circle', { left: 880, top: 853, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r3 = new fabric.Circle(createProps('circle', { left: 900, top: 853, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r4 = new fabric.Circle(createProps('circle', { left: 870, top: 862, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r5 = new fabric.Circle(createProps('circle', { left: 890, top: 862, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));

      const subBg = new fabric.Rect(createProps('rect', { left: 90, top: 900, width: 860, height: 44, fill: '#001e3d', rx: 4, ry: 4, stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, skewX: -15 }));
      const medTxt = new fabric.Textbox("🥇", createProps('textbox', { left: 115, top: 908, fontSize: 20, fill: '#ffffff', width: 30 }));
      const subTxt = new fabric.Textbox(subTitle, createProps('textbox', { left: 155, top: 910, fontSize: 20, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 600 }));

      objects.push(headBg, nocTxt, flagTxt, nameTxt, r1, r2, r3, r4, r5, subBg, medTxt, subTxt);
      break;
    }

    case 'football-medals-list': {
      const eventTitle = (data.event || "MEN'S FOOTBALL").toUpperCase();
      const subTitle = (data.subTitle || "VICTORY CEREMONY").toUpperCase();

      const winnersList = Array.isArray(data.winners) ? data.winners : [
        { medal: "🥇", noc: "ARG", flag: "🇦🇷", name: "ARGENTINA" },
        { medal: "🥈", noc: "NGR", flag: "🇳🇬", name: "NIGERIA" },
        { medal: "🥉", noc: "BRA", flag: "🇧🇷", name: "BRAZIL" }
      ];

      // Header Bar
      const headBg = new fabric.Rect(createProps('rect', { left: 90, top: 760, width: 960, height: 60, fill: '#003366', rx: 6, ry: 6, stroke: '#001938', strokeWidth: 2, skewX: -15 }));
      const iconTxt = new fabric.Textbox("⚽", createProps('textbox', { left: 110, top: 774, fontSize: 24, fill: '#ffffff', width: 35 }));
      const titleTxt = new fabric.Textbox(eventTitle, createProps('textbox', { left: 155, top: 768, fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 400 }));
      const pillBg = new fabric.Rect(createProps('rect', { left: 155, top: 794, width: 480, height: 20, fill: '#ffffff', rx: 4, ry: 4, skewX: -15 }));
      const pillTxt = new fabric.Textbox(subTitle, createProps('textbox', { left: 165, top: 796, fontSize: 12, fontWeight: 'bold', fontStyle: 'italic', fill: '#002850', width: 460 }));

      const ringColor = '#ffd700';
      const r1 = new fabric.Circle(createProps('circle', { left: 950, top: 773, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r2 = new fabric.Circle(createProps('circle', { left: 970, top: 773, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r3 = new fabric.Circle(createProps('circle', { left: 990, top: 773, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r4 = new fabric.Circle(createProps('circle', { left: 960, top: 782, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r5 = new fabric.Circle(createProps('circle', { left: 980, top: 782, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));

      objects.push(headBg, iconTxt, titleTxt, pillBg, pillTxt, r1, r2, r3, r4, r5);

      winnersList.forEach((w, idx) => {
        const topOffset = 825 + (idx * 44);

        const rowBg = new fabric.Rect(createProps('rect', { left: 90, top: topOffset, width: 960, height: 42, fill: idx % 2 === 0 ? '#001e3d' : '#001736', rx: 4, ry: 4, stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, skewX: -15 }));
        const mTxt = new fabric.Textbox(w.medal, createProps('textbox', { left: 110, top: topOffset + 8, fontSize: 20, fill: '#ffffff', width: 30 }));
        const nocTxt = new fabric.Textbox(w.noc, createProps('textbox', { left: 150, top: topOffset + 10, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 45 }));
        const flagTxt = new fabric.Textbox(w.flag, createProps('textbox', { left: 200, top: topOffset + 8, fontSize: 20, fill: '#ffffff', width: 35 }));
        const nameTxt = new fabric.Textbox((w.name || '').toUpperCase(), createProps('textbox', { left: 245, top: topOffset + 10, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 500 }));

        objects.push(rowBg, mTxt, nocTxt, flagTxt, nameTxt);
      });
      break;
    }

    case 'football-medal-presenter':
    case 'football-flower-presenter': {
      const isFlower = category === 'football-flower-presenter';
      const nameStr = (data.presenter || data.name || (isFlower ? "MR JULIO GRONDONA" : "JACQUES ROGGE")).toUpperCase();
      const titleStr = (data.title || data.role || (isFlower ? "SENIOR VICE PRESIDENT, FIFA" : "IOC PRESIDENT, BELGIUM")).toUpperCase();

      const headBg = new fabric.Rect(createProps('rect', { left: 90, top: 840, width: 860, height: 56, fill: '#003366', rx: 6, ry: 6, stroke: '#001938', strokeWidth: 2, skewX: -15 }));
      const nameTxt = new fabric.Textbox(nameStr, createProps('textbox', { left: 115, top: 850, fontSize: 24, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 650 }));

      const ringColor = '#ffd700';
      const r1 = new fabric.Circle(createProps('circle', { left: 860, top: 853, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r2 = new fabric.Circle(createProps('circle', { left: 880, top: 853, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r3 = new fabric.Circle(createProps('circle', { left: 900, top: 853, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r4 = new fabric.Circle(createProps('circle', { left: 870, top: 862, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r5 = new fabric.Circle(createProps('circle', { left: 890, top: 862, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));

      const subBg = new fabric.Rect(createProps('rect', { left: 90, top: 900, width: 860, height: 44, fill: '#001e3d', rx: 4, ry: 4, stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, skewX: -15 }));
      const subTxt = new fabric.Textbox(titleStr, createProps('textbox', { left: 115, top: 910, fontSize: 20, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 650 }));

      objects.push(headBg, nameTxt, r1, r2, r3, r4, r5, subBg, subTxt);
      break;
    }

    case 'football-pso-scoreboard': {
      const eventTitle = (data.event || "MEN'S FOOTBALL").toUpperCase();
      const subTitle = (data.subTitle || "GOLD MEDAL MATCH - PENALTY SHOOT-OUT").toUpperCase();

      const team1Noc = (data.team1Noc || data.noc1 || "NGR").toUpperCase();
      const team1Flag = data.team1Flag || data.flag1 || "🇳🇬";
      const team1Name = (data.team1Name || data.name1 || "NIGERIA").toUpperCase();
      const team1Score = String(data.team1Score !== undefined ? data.team1Score : "2");

      const team2Noc = (data.team2Noc || data.noc2 || "ARG").toUpperCase();
      const team2Flag = data.team2Flag || data.flag2 || "🇦🇷";
      const team2Name = (data.team2Name || data.name2 || "ARGENTINA").toUpperCase();
      const team2Score = String(data.team2Score !== undefined ? data.team2Score : "1");

      // Header Bar
      const headBg = new fabric.Rect(createProps('rect', {
        left: 90, top: 820, width: 960, height: 60, fill: '#003366', rx: 6, ry: 6,
        stroke: '#001938', strokeWidth: 2, skewX: -15
      }));
      const iconTxt = new fabric.Textbox("⚽", createProps('textbox', {
        left: 110, top: 834, fontSize: 24, fill: '#ffffff', width: 35
      }));
      const titleTxt = new fabric.Textbox(eventTitle, createProps('textbox', {
        left: 155, top: 828, fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 400
      }));
      const pillBg = new fabric.Rect(createProps('rect', {
        left: 155, top: 854, width: 520, height: 20, fill: '#ffffff', rx: 4, ry: 4, skewX: -15
      }));
      const pillTxt = new fabric.Textbox(subTitle, createProps('textbox', {
        left: 165, top: 856, fontSize: 12, fontWeight: 'bold', fontStyle: 'italic', fill: '#002850', width: 500
      }));

      const ringColor = '#ffd700';
      const r1 = new fabric.Circle(createProps('circle', { left: 950, top: 833, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r2 = new fabric.Circle(createProps('circle', { left: 970, top: 833, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r3 = new fabric.Circle(createProps('circle', { left: 990, top: 833, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r4 = new fabric.Circle(createProps('circle', { left: 960, top: 842, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r5 = new fabric.Circle(createProps('circle', { left: 980, top: 842, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));

      // Row 1 Team 1
      const t1Bg = new fabric.Rect(createProps('rect', {
        left: 90, top: 885, width: 960, height: 42, fill: '#001e3d', rx: 4, ry: 4,
        stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, skewX: -15
      }));
      const t1NocTxt = new fabric.Textbox(team1Noc, createProps('textbox', {
        left: 110, top: 895, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 45
      }));
      const t1FlagTxt = new fabric.Textbox(team1Flag, createProps('textbox', {
        left: 160, top: 893, fontSize: 20, fill: '#ffffff', width: 35
      }));
      const t1NameTxt = new fabric.Textbox(team1Name, createProps('textbox', {
        left: 205, top: 895, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 400
      }));
      const t1ScrTxt = new fabric.Textbox(team1Score, createProps('textbox', {
        left: 850, top: 895, fontSize: 20, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 30, textAlign: 'right'
      }));

      // Shot boxes Team 1
      const g1 = new fabric.Rect(createProps('rect', { left: 900, top: 896, width: 28, height: 20, fill: '#22c55e', rx: 3, ry: 3, skewX: -15 }));
      const m1 = new fabric.Rect(createProps('rect', { left: 934, top: 896, width: 28, height: 20, fill: '#ef4444', rx: 3, ry: 3, skewX: -15 }));
      const g2 = new fabric.Rect(createProps('rect', { left: 968, top: 896, width: 28, height: 20, fill: '#22c55e', rx: 3, ry: 3, skewX: -15 }));

      // Row 2 Team 2
      const t2Bg = new fabric.Rect(createProps('rect', {
        left: 90, top: 930, width: 960, height: 42, fill: '#001736', rx: 4, ry: 4,
        stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, skewX: -15
      }));
      const t2NocTxt = new fabric.Textbox(team2Noc, createProps('textbox', {
        left: 110, top: 940, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 45
      }));
      const t2FlagTxt = new fabric.Textbox(team2Flag, createProps('textbox', {
        left: 160, top: 938, fontSize: 20, fill: '#ffffff', width: 35
      }));
      const t2NameTxt = new fabric.Textbox(team2Name, createProps('textbox', {
        left: 205, top: 940, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 400
      }));
      const t2ScrTxt = new fabric.Textbox(team2Score, createProps('textbox', {
        left: 850, top: 940, fontSize: 20, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 30, textAlign: 'right'
      }));

      // Shot boxes Team 2
      const t2m1 = new fabric.Rect(createProps('rect', { left: 900, top: 941, width: 28, height: 20, fill: '#ef4444', rx: 3, ry: 3, skewX: -15 }));
      const t2g1 = new fabric.Rect(createProps('rect', { left: 934, top: 941, width: 28, height: 20, fill: '#22c55e', rx: 3, ry: 3, skewX: -15 }));

      objects.push(headBg, iconTxt, titleTxt, pillBg, pillTxt, r1, r2, r3, r4, r5, t1Bg, t1NocTxt, t1FlagTxt, t1NameTxt, t1ScrTxt, g1, m1, g2, t2Bg, t2NocTxt, t2FlagTxt, t2NameTxt, t2ScrTxt, t2m1, t2g1);
      break;
    }

    case 'football-advance-quarterfinals': {
      const eventTitle = (data.event || "MEN'S FOOTBALL").toUpperCase();
      const subTitle = (data.subTitle || "FIRST ROUND ➔ QUARTER-FINALS").toUpperCase();

      const teamsList = Array.isArray(data.teams) ? data.teams : [
        { noc: "ARG", flag: "🇦🇷", name: "ARGENTINA", w: "3", l: "0", d: "0" },
        { noc: "ITA", flag: "🇮🇹", name: "ITALY", w: "2", l: "0", d: "1" },
        { noc: "BRA", flag: "🇧🇷", name: "BRAZIL", w: "3", l: "0", d: "0" },
        { noc: "NGR", flag: "🇳🇬", name: "NIGERIA", w: "2", l: "0", d: "1" },
        { noc: "CIV", flag: "🇨🇮", name: "COTE D'IVOIRE", w: "2", l: "1", d: "0" },
        { noc: "BEL", flag: "🇧🇪", name: "BELGIUM", w: "2", l: "1", d: "0" },
        { noc: "NED", flag: "🇳🇱", name: "NETHERLANDS", w: "1", l: "0", d: "2" },
        { noc: "CMR", flag: "🇨🇲", name: "CAMEROON", w: "1", l: "0", d: "2" }
      ];

      // Header Bar
      const headBg = new fabric.Rect(createProps('rect', {
        left: 90, top: 580, width: 960, height: 60, fill: '#003366', rx: 6, ry: 6,
        stroke: '#001938', strokeWidth: 2, skewX: -15
      }));
      const iconTxt = new fabric.Textbox("⚽", createProps('textbox', {
        left: 110, top: 594, fontSize: 24, fill: '#ffffff', width: 35
      }));
      const titleTxt = new fabric.Textbox(eventTitle, createProps('textbox', {
        left: 155, top: 588, fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 400
      }));
      const pillBg = new fabric.Rect(createProps('rect', {
        left: 155, top: 614, width: 580, height: 20, fill: '#ffffff', rx: 4, ry: 4, skewX: -15
      }));
      const pillTxt = new fabric.Textbox(subTitle, createProps('textbox', {
        left: 165, top: 616, fontSize: 12, fontWeight: 'bold', fontStyle: 'italic', fill: '#002850', width: 300
      }));
      const wldHdr = new fabric.Textbox("W    L    D", createProps('textbox', {
        left: 630, top: 616, fontSize: 12, fontWeight: 'bold', fontStyle: 'italic', fill: '#002850', width: 100, textAlign: 'right'
      }));

      const ringColor = '#ffd700';
      const r1 = new fabric.Circle(createProps('circle', { left: 950, top: 593, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r2 = new fabric.Circle(createProps('circle', { left: 970, top: 593, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r3 = new fabric.Circle(createProps('circle', { left: 990, top: 593, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r4 = new fabric.Circle(createProps('circle', { left: 960, top: 602, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r5 = new fabric.Circle(createProps('circle', { left: 980, top: 602, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));

      objects.push(headBg, iconTxt, titleTxt, pillBg, pillTxt, wldHdr, r1, r2, r3, r4, r5);

      teamsList.forEach((tm, idx) => {
        const topOffset = 644 + (idx * 42);

        const rowBg = new fabric.Rect(createProps('rect', {
          left: 90, top: topOffset, width: 960, height: 40, fill: idx % 2 === 0 ? '#001e3d' : '#001736', rx: 4, ry: 4,
          stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, skewX: -15
        }));
        const nocTxt = new fabric.Textbox(tm.noc, createProps('textbox', {
          left: 110, top: topOffset + 9, fontSize: 17, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 45
        }));
        const flagTxt = new fabric.Textbox(tm.flag, createProps('textbox', {
          left: 160, top: topOffset + 7, fontSize: 18, fill: '#ffffff', width: 35
        }));
        const nameTxt = new fabric.Textbox((tm.name || '').toUpperCase(), createProps('textbox', {
          left: 205, top: topOffset + 9, fontSize: 17, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 400
        }));

        const wVal = new fabric.Textbox(String(tm.w), createProps('textbox', {
          left: 880, top: topOffset + 9, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 25, textAlign: 'center'
        }));
        const lVal = new fabric.Textbox(String(tm.l), createProps('textbox', {
          left: 930, top: topOffset + 9, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 25, textAlign: 'center'
        }));
        const dVal = new fabric.Textbox(String(tm.d), createProps('textbox', {
          left: 980, top: topOffset + 9, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 25, textAlign: 'center'
        }));

        objects.push(rowBg, nocTxt, flagTxt, nameTxt, wVal, lVal, dVal);
      });
      break;
    }

    case 'football-goal-summary': {
      const team1Noc = (data.team1Noc || data.noc1 || "NGR").toUpperCase();
      const team1Flag = data.team1Flag || data.flag1 || "🇳🇬";
      const team2Noc = (data.team2Noc || data.noc2 || "BEL").toUpperCase();
      const team2Flag = data.team2Flag || data.flag2 || "🇧🇪";
      const finalScore = data.score || "4 - 1";

      const goalsList = Array.isArray(data.goals) ? data.goals : [
        { side: "left", shirt: "13", scorer: "O. ADEFEMI", minute: "17'", runningScore: "1-0" },
        { side: "left", shirt: "7", scorer: "C. OGBUKE OBASI", minute: "59'", runningScore: "2-0" },
        { side: "left", shirt: "7", scorer: "C. OGBUKE OBASI", minute: "72'", runningScore: "3-0" },
        { side: "left", shirt: "2", scorer: "C. OKONKWO", minute: "78'", runningScore: "4-0" },
        { side: "right", shirt: "13", scorer: "L. CIMAN", minute: "88'", runningScore: "4-1" }
      ];

      // Header Bar
      const headBg = new fabric.Rect(createProps('rect', {
        left: 90, top: 620, width: 960, height: 56, fill: '#003366', rx: 6, ry: 6,
        stroke: '#001938', strokeWidth: 2, skewX: -15
      }));
      const t1Noc = new fabric.Textbox(team1Noc, createProps('textbox', {
        left: 110, top: 632, fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 50
      }));
      const t1Flag = new fabric.Textbox(team1Flag, createProps('textbox', {
        left: 165, top: 630, fontSize: 22, fill: '#ffffff', width: 35
      }));

      const pillBg = new fabric.Rect(createProps('rect', {
        left: 470, top: 630, width: 200, height: 34, fill: '#ffffff', rx: 4, ry: 4, skewX: -15
      }));
      const pillTxt = new fabric.Textbox(finalScore, createProps('textbox', {
        left: 470, top: 634, fontSize: 20, fontWeight: 'bold', fontStyle: 'italic', fill: '#002850', width: 200, textAlign: 'center'
      }));

      const t2Noc = new fabric.Textbox(team2Noc, createProps('textbox', {
        left: 920, top: 632, fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 50
      }));
      const t2Flag = new fabric.Textbox(team2Flag, createProps('textbox', {
        left: 975, top: 630, fontSize: 22, fill: '#ffffff', width: 35
      }));

      objects.push(headBg, t1Noc, t1Flag, pillBg, pillTxt, t2Noc, t2Flag);

      goalsList.forEach((g, idx) => {
        const topOffset = 680 + (idx * 44);
        const isLeft = g.side !== "right";

        const rowBg = new fabric.Rect(createProps('rect', {
          left: 90, top: topOffset, width: 960, height: 42, fill: idx % 2 === 0 ? '#001e3d' : '#001736', rx: 4, ry: 4,
          stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, skewX: -15
        }));
        objects.push(rowBg);

        if (isLeft) {
          const sTxt = new fabric.Textbox(String(g.shirt), createProps('textbox', {
            left: 110, top: topOffset + 10, fontSize: 16, fontWeight: 'bold', fontStyle: 'italic', fill: '#38bdf8', width: 25
          }));
          const pTxt = new fabric.Textbox((g.scorer || '').toUpperCase(), createProps('textbox', {
            left: 140, top: topOffset + 10, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 300
          }));
          const mTxt = new fabric.Textbox(g.minute, createProps('textbox', {
            left: 460, top: topOffset + 10, fontSize: 16, fontWeight: 'bold', fontStyle: 'italic', fill: '#38bdf8', width: 40, textAlign: 'right'
          }));
          const scTxt = new fabric.Textbox(g.runningScore, createProps('textbox', {
            left: 520, top: topOffset + 10, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 80, textAlign: 'center'
          }));
          objects.push(sTxt, pTxt, mTxt, scTxt);
        } else {
          const scTxt = new fabric.Textbox(g.runningScore, createProps('textbox', {
            left: 520, top: topOffset + 10, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 80, textAlign: 'center'
          }));
          const mTxt = new fabric.Textbox(g.minute, createProps('textbox', {
            left: 610, top: topOffset + 10, fontSize: 16, fontWeight: 'bold', fontStyle: 'italic', fill: '#38bdf8', width: 40, textAlign: 'left'
          }));
          const pTxt = new fabric.Textbox((g.scorer || '').toUpperCase(), createProps('textbox', {
            left: 700, top: topOffset + 10, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 300, textAlign: 'right'
          }));
          const sTxt = new fabric.Textbox(String(g.shirt), createProps('textbox', {
            left: 1010, top: topOffset + 10, fontSize: 16, fontWeight: 'bold', fontStyle: 'italic', fill: '#38bdf8', width: 25, textAlign: 'right'
          }));
          objects.push(scTxt, mTxt, pTxt, sTxt);
        }
      });
      break;
    }

    case 'football-match-result': {
      const eventTitle = (data.event || "MEN'S FOOTBALL").toUpperCase();
      const matchStage = (data.stage || data.subTitle || "BRONZE MEDAL MATCH").toUpperCase();
      const matchStatus = (data.status || data.period || "2ND HALF").toUpperCase();

      const team1Noc = (data.team1Noc || data.noc1 || "BEL").toUpperCase();
      const team1Flag = data.team1Flag || data.flag1 || "🇧🇪";
      const team1Name = (data.team1Name || data.name1 || "BELGIUM").toUpperCase();
      const team1Score = String(data.team1Score !== undefined ? data.team1Score : "0");

      const team2Noc = (data.team2Noc || data.noc2 || "BRA").toUpperCase();
      const team2Flag = data.team2Flag || data.flag2 || "🇧🇷";
      const team2Name = (data.team2Name || data.name2 || "BRAZIL").toUpperCase();
      const team2Score = String(data.team2Score !== undefined ? data.team2Score : "2");

      // Header Bar
      const headBg = new fabric.Rect(createProps('rect', {
        left: 90, top: 820, width: 960, height: 60, fill: '#003366', rx: 6, ry: 6,
        stroke: '#001938', strokeWidth: 2, skewX: -15
      }));
      const iconTxt = new fabric.Textbox("⚽", createProps('textbox', {
        left: 110, top: 834, fontSize: 24, fill: '#ffffff', width: 35
      }));
      const titleTxt = new fabric.Textbox(eventTitle, createProps('textbox', {
        left: 155, top: 828, fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 400
      }));
      const pillBg = new fabric.Rect(createProps('rect', {
        left: 155, top: 854, width: 500, height: 20, fill: '#ffffff', rx: 4, ry: 4, skewX: -15
      }));
      const pillStage = new fabric.Textbox(matchStage, createProps('textbox', {
        left: 165, top: 856, fontSize: 12, fontWeight: 'bold', fontStyle: 'italic', fill: '#002850', width: 240
      }));
      const pillStat = new fabric.Textbox(matchStatus, createProps('textbox', {
        left: 415, top: 856, fontSize: 12, fontWeight: 'bold', fontStyle: 'italic', fill: '#002850', width: 230, textAlign: 'right'
      }));

      const ringColor = '#ffd700';
      const r1 = new fabric.Circle(createProps('circle', { left: 950, top: 833, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r2 = new fabric.Circle(createProps('circle', { left: 970, top: 833, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r3 = new fabric.Circle(createProps('circle', { left: 990, top: 833, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r4 = new fabric.Circle(createProps('circle', { left: 960, top: 842, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r5 = new fabric.Circle(createProps('circle', { left: 980, top: 842, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));

      // Row 1 Team 1
      const t1Bg = new fabric.Rect(createProps('rect', {
        left: 90, top: 885, width: 960, height: 42, fill: '#001e3d', rx: 4, ry: 4,
        stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, skewX: -15
      }));
      const t1NocTxt = new fabric.Textbox(team1Noc, createProps('textbox', {
        left: 110, top: 895, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 45
      }));
      const t1FlagTxt = new fabric.Textbox(team1Flag, createProps('textbox', {
        left: 160, top: 893, fontSize: 20, fill: '#ffffff', width: 35
      }));
      const t1NameTxt = new fabric.Textbox(team1Name, createProps('textbox', {
        left: 205, top: 895, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 400
      }));
      const t1ScrTxt = new fabric.Textbox(team1Score, createProps('textbox', {
        left: 920, top: 895, fontSize: 20, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 30, textAlign: 'right'
      }));

      // Row 2 Team 2
      const t2Bg = new fabric.Rect(createProps('rect', {
        left: 90, top: 930, width: 960, height: 42, fill: '#001736', rx: 4, ry: 4,
        stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, skewX: -15
      }));
      const t2NocTxt = new fabric.Textbox(team2Noc, createProps('textbox', {
        left: 110, top: 940, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 45
      }));
      const t2FlagTxt = new fabric.Textbox(team2Flag, createProps('textbox', {
        left: 160, top: 938, fontSize: 20, fill: '#ffffff', width: 35
      }));
      const t2NameTxt = new fabric.Textbox(team2Name, createProps('textbox', {
        left: 205, top: 940, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 400
      }));
      const t2ScrTxt = new fabric.Textbox(team2Score, createProps('textbox', {
        left: 920, top: 940, fontSize: 20, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 30, textAlign: 'right'
      }));

      objects.push(headBg, iconTxt, titleTxt, pillBg, pillStage, pillStat, r1, r2, r3, r4, r5, t1Bg, t1NocTxt, t1FlagTxt, t1NameTxt, t1ScrTxt, t2Bg, t2NocTxt, t2FlagTxt, t2NameTxt, t2ScrTxt);
      break;
    }

    case 'football-match-statistics': {
      const team1Noc = (data.team1Noc || data.noc1 || "BEL").toUpperCase();
      const team1Flag = data.team1Flag || data.flag1 || "🇧🇪";
      const team2Noc = (data.team2Noc || data.noc2 || "BRA").toUpperCase();
      const team2Flag = data.team2Flag || data.flag2 || "🇧🇷";
      const subTitle = (data.subTitle || "MATCH STATISTICS").toUpperCase();

      const statsList = Array.isArray(data.stats) ? data.stats : [
        { label: "GOALS / SHOTS ON GOAL", val1: "0 / 8", val2: "3 / 9" },
        { label: "CORNERS", val1: "7", val2: "1" },
        { label: "FREE KICKS", val1: "0", val2: "1" },
        { label: "FOULS", val1: "21", val2: "13" },
        { label: "OFFSIDES", val1: "2", val2: "5" },
        { label: "CARDS", val1: "🟨 0  🟨 0  🟥 0", val2: "🟨 4  🟨 0  🟥 1" },
        { label: "BALL POSSESSION", val1: "51%", val2: "49%" }
      ];

      // Header Bar
      const headBg = new fabric.Rect(createProps('rect', {
        left: 90, top: 620, width: 960, height: 56, fill: '#003366', rx: 6, ry: 6,
        stroke: '#001938', strokeWidth: 2, skewX: -15
      }));
      const t1Noc = new fabric.Textbox(team1Noc, createProps('textbox', {
        left: 110, top: 632, fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 50
      }));
      const t1Flag = new fabric.Textbox(team1Flag, createProps('textbox', {
        left: 165, top: 630, fontSize: 22, fill: '#ffffff', width: 35
      }));

      const pillBg = new fabric.Rect(createProps('rect', {
        left: 450, top: 632, width: 240, height: 30, fill: '#ffffff', rx: 4, ry: 4, skewX: -15
      }));
      const pillTxt = new fabric.Textbox(subTitle, createProps('textbox', {
        left: 450, top: 638, fontSize: 13, fontWeight: 'bold', fontStyle: 'italic', fill: '#002850', width: 240, textAlign: 'center'
      }));

      const t2Noc = new fabric.Textbox(team2Noc, createProps('textbox', {
        left: 920, top: 632, fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 50
      }));
      const t2Flag = new fabric.Textbox(team2Flag, createProps('textbox', {
        left: 975, top: 630, fontSize: 22, fill: '#ffffff', width: 35
      }));

      objects.push(headBg, t1Noc, t1Flag, pillBg, pillTxt, t2Noc, t2Flag);

      statsList.forEach((st, idx) => {
        const topOffset = 680 + (idx * 44);

        const rowBg = new fabric.Rect(createProps('rect', {
          left: 90, top: topOffset, width: 960, height: 42, fill: idx % 2 === 0 ? '#001e3d' : '#001736', rx: 4, ry: 4,
          stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, skewX: -15
        }));
        const v1Txt = new fabric.Textbox(String(st.val1), createProps('textbox', {
          left: 110, top: topOffset + 10, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 250, textAlign: 'left'
        }));
        const lblTxt = new fabric.Textbox((st.label || '').toUpperCase(), createProps('textbox', {
          left: 360, top: topOffset + 10, fontSize: 16, fontWeight: 'bold', fontStyle: 'italic', fill: '#38bdf8', width: 420, textAlign: 'center'
        }));
        const v2Txt = new fabric.Textbox(String(st.val2), createProps('textbox', {
          left: 780, top: topOffset + 10, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 250, textAlign: 'right'
        }));

        objects.push(rowBg, v1Txt, lblTxt, v2Txt);
      });
      break;
    }

    case 'football-crunch-stats': {
      const statLabel = (data.statLabel || data.label || "SHOTS ON GOAL").toUpperCase();

      const team1Noc = (data.team1Noc || data.noc1 || "ARG").toUpperCase();
      const team1Flag = data.team1Flag || data.flag1 || "🇦🇷";
      const team1Val = String(data.team1Val !== undefined ? data.team1Val : (data.val1 !== undefined ? data.val1 : "5"));

      const team2Noc = (data.team2Noc || data.noc2 || "BRA").toUpperCase();
      const team2Flag = data.team2Flag || data.flag2 || "🇧🇷";
      const team2Val = String(data.team2Val !== undefined ? data.team2Val : (data.val2 !== undefined ? data.val2 : "4"));

      // Top Pill
      const pillBg = new fabric.Rect(createProps('rect', {
        left: 170, top: 885, width: 160, height: 22, fill: '#ffffff', rx: 4, ry: 4, skewX: -15
      }));
      const pillTxt = new fabric.Textbox(statLabel, createProps('textbox', {
        left: 170, top: 888, fontSize: 12, fontWeight: 'bold', fontStyle: 'italic', fill: '#002850', width: 160, textAlign: 'center'
      }));

      // Team 1 Row
      const t1Bg = new fabric.Rect(createProps('rect', {
        left: 120, top: 906, width: 260, height: 38, fill: '#002b54', rx: 4, ry: 4,
        stroke: '#001938', strokeWidth: 1, skewX: -15
      }));
      const t1Noc = new fabric.Textbox(team1Noc, createProps('textbox', {
        left: 135, top: 915, fontSize: 17, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 45
      }));
      const t1Flag = new fabric.Textbox(team1Flag, createProps('textbox', {
        left: 185, top: 913, fontSize: 18, fill: '#ffffff', width: 30
      }));
      const t1Val = new fabric.Textbox(team1Val, createProps('textbox', {
        left: 330, top: 913, fontSize: 20, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 35, textAlign: 'right'
      }));

      // Team 2 Row
      const t2Bg = new fabric.Rect(createProps('rect', {
        left: 120, top: 946, width: 260, height: 38, fill: '#001a38', rx: 4, ry: 4,
        stroke: '#001938', strokeWidth: 1, skewX: -15
      }));
      const t2Noc = new fabric.Textbox(team2Noc, createProps('textbox', {
        left: 135, top: 955, fontSize: 17, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 45
      }));
      const t2Flag = new fabric.Textbox(team2Flag, createProps('textbox', {
        left: 185, top: 953, fontSize: 18, fill: '#ffffff', width: 30
      }));
      const t2Val = new fabric.Textbox(team2Val, createProps('textbox', {
        left: 330, top: 953, fontSize: 20, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 35, textAlign: 'right'
      }));

      objects.push(pillBg, pillTxt, t1Bg, t1Noc, t1Flag, t1Val, t2Bg, t2Noc, t2Flag, t2Val);
      break;
    }

    case 'football-coach-id': {
      const countryCode = (data.country || data.noc || "ARG").toUpperCase();
      const flagStr = data.flag || "🇦🇷";
      const coachName = (data.coach || data.name || "SERGIO BATISTA").toUpperCase();
      const roleTitle = (data.role || data.title || "COACH").toUpperCase();

      // Header Bar
      const headBg = new fabric.Rect(createProps('rect', {
        left: 90, top: 840, width: 860, height: 56, fill: '#003366', rx: 6, ry: 6,
        stroke: '#001938', strokeWidth: 2, skewX: -15
      }));
      const nocTxt = new fabric.Textbox(countryCode, createProps('textbox', {
        left: 115, top: 852, fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 55
      }));
      const flagTxt = new fabric.Textbox(flagStr, createProps('textbox', {
        left: 175, top: 850, fontSize: 24, fill: '#ffffff', width: 40
      }));
      const nameTxt = new fabric.Textbox(coachName, createProps('textbox', {
        left: 225, top: 850, fontSize: 24, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 550
      }));

      const ringColor = '#ffd700';
      const r1 = new fabric.Circle(createProps('circle', { left: 860, top: 853, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r2 = new fabric.Circle(createProps('circle', { left: 880, top: 853, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r3 = new fabric.Circle(createProps('circle', { left: 900, top: 853, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r4 = new fabric.Circle(createProps('circle', { left: 870, top: 862, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r5 = new fabric.Circle(createProps('circle', { left: 890, top: 862, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));

      // Sub Bar
      const subBg = new fabric.Rect(createProps('rect', {
        left: 90, top: 900, width: 860, height: 44, fill: '#001e3d', rx: 4, ry: 4,
        stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, skewX: -15
      }));
      const rTxt = new fabric.Textbox(roleTitle, createProps('textbox', {
        left: 115, top: 910, fontSize: 20, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 400
      }));

      objects.push(headBg, nocTxt, flagTxt, nameTxt, r1, r2, r3, r4, r5, subBg, rTxt);
      break;
    }

    case 'football-captain-id': {
      const countryCode = (data.country || data.noc || "ARG").toUpperCase();
      const flagStr = data.flag || "🇦🇷";
      const shirtNum = String(data.shirt || data.bib || "10");
      const playerName = (data.athlete || data.player || data.name || "JUAN RIQUELME").toUpperCase();
      const roleTitle = (data.role || data.title || "CAPTAIN").toUpperCase();

      // Header Bar
      const headBg = new fabric.Rect(createProps('rect', {
        left: 90, top: 840, width: 860, height: 56, fill: '#003366', rx: 6, ry: 6,
        stroke: '#001938', strokeWidth: 2, skewX: -15
      }));
      const nocTxt = new fabric.Textbox(countryCode, createProps('textbox', {
        left: 115, top: 852, fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 55
      }));
      const flagTxt = new fabric.Textbox(flagStr, createProps('textbox', {
        left: 175, top: 850, fontSize: 24, fill: '#ffffff', width: 40
      }));
      const sTxt = new fabric.Textbox(shirtNum, createProps('textbox', {
        left: 225, top: 850, fontSize: 24, fontWeight: 'bold', fontStyle: 'italic', fill: '#38bdf8', width: 40
      }));
      const nameTxt = new fabric.Textbox(playerName, createProps('textbox', {
        left: 275, top: 850, fontSize: 24, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 500
      }));

      const ringColor = '#ffd700';
      const r1 = new fabric.Circle(createProps('circle', { left: 860, top: 853, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r2 = new fabric.Circle(createProps('circle', { left: 880, top: 853, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r3 = new fabric.Circle(createProps('circle', { left: 900, top: 853, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r4 = new fabric.Circle(createProps('circle', { left: 870, top: 862, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r5 = new fabric.Circle(createProps('circle', { left: 890, top: 862, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));

      // Sub Bar
      const subBg = new fabric.Rect(createProps('rect', {
        left: 90, top: 900, width: 860, height: 44, fill: '#001e3d', rx: 4, ry: 4,
        stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, skewX: -15
      }));
      const rTxt = new fabric.Textbox(roleTitle, createProps('textbox', {
        left: 115, top: 910, fontSize: 20, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 400
      }));

      objects.push(headBg, nocTxt, flagTxt, sTxt, nameTxt, r1, r2, r3, r4, r5, subBg, rTxt);
      break;
    }

    case 'football-substitution-single': {
      const countryCode = (data.country || data.noc || "ARG").toUpperCase();
      const flagStr = data.flag || "🇦🇷";
      const shirtNum = String(data.shirt || data.bib || "7");
      const playerName = (data.athlete || data.player || data.name || "JOSE SOSA").toUpperCase();
      const subType = (data.subType || data.direction || "in").toLowerCase();
      const isOut = subType === "out" || subType === "off";

      const barBg = new fabric.Rect(createProps('rect', {
        left: 90, top: 890, width: 780, height: 56, fill: '#003366', rx: 6, ry: 6,
        stroke: '#001938', strokeWidth: 2, skewX: -15
      }));
      const nocTxt = new fabric.Textbox(countryCode, createProps('textbox', {
        left: 115, top: 902, fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 55
      }));
      const flagTxt = new fabric.Textbox(flagStr, createProps('textbox', {
        left: 175, top: 900, fontSize: 24, fill: '#ffffff', width: 40
      }));
      const sTxt = new fabric.Textbox(shirtNum, createProps('textbox', {
        left: 225, top: 900, fontSize: 24, fontWeight: 'bold', fontStyle: 'italic', fill: '#38bdf8', width: 40
      }));
      const nameTxt = new fabric.Textbox(playerName, createProps('textbox', {
        left: 275, top: 900, fontSize: 24, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 500
      }));

      const badgeBg = new fabric.Rect(createProps('rect', {
        left: 820, top: 902, width: 32, height: 32, fill: isOut ? '#ef4444' : '#10b981', rx: 4, ry: 4, skewX: -15
      }));
      const badgeArr = new fabric.Textbox(isOut ? "↙" : "↗", createProps('textbox', {
        left: 820, top: 905, fontSize: 20, fontWeight: 'bold', fill: '#ffffff', width: 32, textAlign: 'center'
      }));

      objects.push(barBg, nocTxt, flagTxt, sTxt, nameTxt, badgeBg, badgeArr);
      break;
    }

    case 'football-substitution-event': {
      const countryCode = (data.country || data.noc || "ARG").toUpperCase();
      const flagStr = data.flag || "🇦🇷";
      const teamName = (data.teamName || data.name || "ARGENTINA").toUpperCase();

      const playerOutShirt = String(data.outShirt || data.shirtOut || "10");
      const playerOutName = (data.outName || data.playerOut || "JUAN RIQUELME").toUpperCase();

      const playerInShirt = String(data.inShirt || data.shirtIn || "7");
      const playerInName = (data.inName || data.playerIn || "JOSE SOSA").toUpperCase();

      // Header Bar
      const headBg = new fabric.Rect(createProps('rect', {
        left: 90, top: 820, width: 680, height: 52, fill: '#003366', rx: 6, ry: 6,
        stroke: '#001938', strokeWidth: 2, skewX: -15
      }));
      const nocTxt = new fabric.Textbox(countryCode, createProps('textbox', {
        left: 115, top: 832, fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 55
      }));
      const flagTxt = new fabric.Textbox(flagStr, createProps('textbox', {
        left: 175, top: 830, fontSize: 24, fill: '#ffffff', width: 40
      }));
      const nameTxt = new fabric.Textbox(teamName, createProps('textbox', {
        left: 225, top: 830, fontSize: 24, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 400
      }));

      // Player OUT Row
      const outBg = new fabric.Rect(createProps('rect', {
        left: 90, top: 875, width: 680, height: 42, fill: '#001e3d', rx: 4, ry: 4,
        stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, skewX: -15
      }));
      const outNum = new fabric.Textbox(playerOutShirt, createProps('textbox', {
        left: 115, top: 885, fontSize: 20, fontWeight: 'bold', fontStyle: 'italic', fill: '#38bdf8', width: 30, textAlign: 'right'
      }));
      const outTxt = new fabric.Textbox(playerOutName, createProps('textbox', {
        left: 155, top: 885, fontSize: 20, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 450
      }));
      const outBadge = new fabric.Rect(createProps('rect', {
        left: 720, top: 882, width: 28, height: 28, fill: '#ef4444', rx: 4, ry: 4, skewX: -15
      }));
      const outArr = new fabric.Textbox("↙", createProps('textbox', {
        left: 720, top: 884, fontSize: 18, fontWeight: 'bold', fill: '#ffffff', width: 28, textAlign: 'center'
      }));

      // Player IN Row
      const inBg = new fabric.Rect(createProps('rect', {
        left: 90, top: 920, width: 680, height: 42, fill: '#001736', rx: 4, ry: 4,
        stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, skewX: -15
      }));
      const inNum = new fabric.Textbox(playerInShirt, createProps('textbox', {
        left: 115, top: 930, fontSize: 20, fontWeight: 'bold', fontStyle: 'italic', fill: '#38bdf8', width: 30, textAlign: 'right'
      }));
      const inTxt = new fabric.Textbox(playerInName, createProps('textbox', {
        left: 155, top: 930, fontSize: 20, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 450
      }));
      const inBadge = new fabric.Rect(createProps('rect', {
        left: 720, top: 927, width: 28, height: 28, fill: '#10b981', rx: 4, ry: 4, skewX: -15
      }));
      const inArr = new fabric.Textbox("↗", createProps('textbox', {
        left: 720, top: 929, fontSize: 18, fontWeight: 'bold', fill: '#ffffff', width: 28, textAlign: 'center'
      }));

      objects.push(headBg, nocTxt, flagTxt, nameTxt, outBg, outNum, outTxt, outBadge, outArr, inBg, inNum, inTxt, inBadge, inArr);
      break;
    }

    case 'football-tournament-player-stats': {
      const topTag = (data.tag || "TOURNAMENT").toUpperCase();
      const countryCode = (data.country || data.noc || "ARG").toUpperCase();
      const flagStr = data.flag || "🇦🇷";
      const shirtNum = String(data.shirt || data.bib || "9");
      const playerName = (data.athlete || data.player || data.name || "EZEQUIEL LAVEZZI").toUpperCase();
      const statLabel = (data.statLabel || data.label || "GOALS").toUpperCase();
      const statValue = String(data.statValue !== undefined ? data.statValue : (data.value !== undefined ? data.value : "2"));

      // Top Inset Pill
      const tagBg = new fabric.Rect(createProps('rect', {
        left: 140, top: 818, width: 130, height: 22, fill: '#ffffff', rx: 4, ry: 4, skewX: -15
      }));
      const tagTxt = new fabric.Textbox(topTag, createProps('textbox', {
        left: 140, top: 821, fontSize: 12, fontWeight: 'bold', fontStyle: 'italic', fill: '#002850', width: 130, textAlign: 'center'
      }));

      // Header Bar
      const headBg = new fabric.Rect(createProps('rect', {
        left: 90, top: 840, width: 860, height: 56, fill: '#003366', rx: 6, ry: 6,
        stroke: '#001938', strokeWidth: 2, skewX: -15
      }));
      const nocTxt = new fabric.Textbox(countryCode, createProps('textbox', {
        left: 115, top: 852, fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 55
      }));
      const flagTxt = new fabric.Textbox(flagStr, createProps('textbox', {
        left: 175, top: 850, fontSize: 24, fill: '#ffffff', width: 40
      }));
      const sTxt = new fabric.Textbox(shirtNum, createProps('textbox', {
        left: 225, top: 850, fontSize: 24, fontWeight: 'bold', fontStyle: 'italic', fill: '#38bdf8', width: 40
      }));
      const nameTxt = new fabric.Textbox(playerName, createProps('textbox', {
        left: 275, top: 850, fontSize: 24, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 500
      }));

      const ringColor = '#ffd700';
      const r1 = new fabric.Circle(createProps('circle', { left: 860, top: 853, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r2 = new fabric.Circle(createProps('circle', { left: 880, top: 853, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r3 = new fabric.Circle(createProps('circle', { left: 900, top: 853, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r4 = new fabric.Circle(createProps('circle', { left: 870, top: 862, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r5 = new fabric.Circle(createProps('circle', { left: 890, top: 862, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));

      // Sub Bar
      const subBg = new fabric.Rect(createProps('rect', {
        left: 90, top: 900, width: 860, height: 44, fill: '#001e3d', rx: 4, ry: 4,
        stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, skewX: -15
      }));
      const lTxt = new fabric.Textbox(statLabel, createProps('textbox', {
        left: 115, top: 910, fontSize: 20, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 120
      }));
      const vTxt = new fabric.Textbox(statValue, createProps('textbox', {
        left: 240, top: 910, fontSize: 20, fontWeight: 'bold', fontStyle: 'italic', fill: '#38bdf8', width: 100
      }));

      objects.push(tagBg, tagTxt, headBg, nocTxt, flagTxt, sTxt, nameTxt, r1, r2, r3, r4, r5, subBg, lTxt, vTxt);
      break;
    }

    case 'football-player-stats': {
      const countryCode = (data.country || data.noc || "ARG").toUpperCase();
      const flagStr = data.flag || "🇦🇷";
      const shirtNum = String(data.shirt || data.bib || "16");
      const playerName = (data.athlete || data.player || data.name || "SERGIO AGUERO").toUpperCase();
      const statLabel = (data.statLabel || data.label || "GOALS").toUpperCase();
      const statValue = String(data.statValue !== undefined ? data.statValue : (data.value !== undefined ? data.value : "2"));

      // Header Bar
      const headBg = new fabric.Rect(createProps('rect', {
        left: 90, top: 840, width: 860, height: 56, fill: '#003366', rx: 6, ry: 6,
        stroke: '#001938', strokeWidth: 2, skewX: -15
      }));
      const nocTxt = new fabric.Textbox(countryCode, createProps('textbox', {
        left: 115, top: 852, fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 55
      }));
      const flagTxt = new fabric.Textbox(flagStr, createProps('textbox', {
        left: 175, top: 850, fontSize: 24, fill: '#ffffff', width: 40
      }));
      const sTxt = new fabric.Textbox(shirtNum, createProps('textbox', {
        left: 225, top: 850, fontSize: 24, fontWeight: 'bold', fontStyle: 'italic', fill: '#38bdf8', width: 40
      }));
      const nameTxt = new fabric.Textbox(playerName, createProps('textbox', {
        left: 275, top: 850, fontSize: 24, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 500
      }));

      const ringColor = '#ffd700';
      const r1 = new fabric.Circle(createProps('circle', { left: 860, top: 853, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r2 = new fabric.Circle(createProps('circle', { left: 880, top: 853, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r3 = new fabric.Circle(createProps('circle', { left: 900, top: 853, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r4 = new fabric.Circle(createProps('circle', { left: 870, top: 862, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r5 = new fabric.Circle(createProps('circle', { left: 890, top: 862, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));

      // Sub Bar
      const subBg = new fabric.Rect(createProps('rect', {
        left: 90, top: 900, width: 860, height: 44, fill: '#001e3d', rx: 4, ry: 4,
        stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, skewX: -15
      }));
      const lTxt = new fabric.Textbox(statLabel, createProps('textbox', {
        left: 115, top: 910, fontSize: 20, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 120
      }));
      const vTxt = new fabric.Textbox(statValue, createProps('textbox', {
        left: 240, top: 910, fontSize: 20, fontWeight: 'bold', fontStyle: 'italic', fill: '#38bdf8', width: 100
      }));

      objects.push(headBg, nocTxt, flagTxt, sTxt, nameTxt, r1, r2, r3, r4, r5, subBg, lTxt, vTxt);
      break;
    }

    case 'football-crunch-scoreboard': {
      const team1Noc = (data.team1Noc || data.noc1 || "NGR").toUpperCase();
      const team1Flag = data.team1Flag || data.flag1 || "🇳🇬";
      const team1Score = data.team1Score !== undefined ? String(data.team1Score) : "2";

      const team2Noc = (data.team2Noc || data.noc2 || "CIV").toUpperCase();
      const team2Flag = data.team2Flag || data.flag2 || "🇨🇮";
      const team2Score = data.team2Score !== undefined ? String(data.team2Score) : "0";

      const matchTime = data.time || data.clock || "21:45";
      const matchPeriod = (data.period || data.half || "1ST").toUpperCase();

      // Team 1 Row
      const t1Bg = new fabric.Rect(createProps('rect', {
        left: 120, top: 90, width: 240, height: 36, fill: '#002b54', rx: 4, ry: 4,
        stroke: '#001938', strokeWidth: 1, skewX: -15
      }));
      const t1Noc = new fabric.Textbox(team1Noc, createProps('textbox', {
        left: 135, top: 98, fontSize: 16, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 45
      }));
      const t1Flag = new fabric.Textbox(team1Flag, createProps('textbox', {
        left: 180, top: 96, fontSize: 16, fill: '#ffffff', width: 30
      }));
      const t1Scr = new fabric.Textbox(team1Score, createProps('textbox', {
        left: 305, top: 96, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 35, textAlign: 'right'
      }));

      // Team 2 Row
      const t2Bg = new fabric.Rect(createProps('rect', {
        left: 120, top: 128, width: 240, height: 36, fill: '#001a38', rx: 4, ry: 4,
        stroke: '#001938', strokeWidth: 1, skewX: -15
      }));
      const t2Noc = new fabric.Textbox(team2Noc, createProps('textbox', {
        left: 135, top: 136, fontSize: 16, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 45
      }));
      const t2Flag = new fabric.Textbox(team2Flag, createProps('textbox', {
        left: 180, top: 134, fontSize: 16, fill: '#ffffff', width: 30
      }));
      const t2Scr = new fabric.Textbox(team2Score, createProps('textbox', {
        left: 305, top: 134, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 35, textAlign: 'right'
      }));

      // Timer Row
      const timeBg = new fabric.Rect(createProps('rect', {
        left: 120, top: 166, width: 140, height: 32, fill: '#ffffff', rx: 4, ry: 4, skewX: -15
      }));
      const timeTxt = new fabric.Textbox(matchTime, createProps('textbox', {
        left: 120, top: 172, fontSize: 15, fontWeight: 'bold', fontStyle: 'italic', fill: '#001736', width: 140, textAlign: 'center'
      }));

      const perBg = new fabric.Rect(createProps('rect', {
        left: 262, top: 166, width: 98, height: 32, fill: '#002850', rx: 4, ry: 4, skewX: -15
      }));
      const perTxt = new fabric.Textbox(matchPeriod, createProps('textbox', {
        left: 262, top: 172, fontSize: 15, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 98, textAlign: 'center'
      }));

      objects.push(t1Bg, t1Noc, t1Flag, t1Scr, t2Bg, t2Noc, t2Flag, t2Scr, timeBg, timeTxt, perBg, perTxt);
      break;
    }

    case 'football-player-id': {
      const countryCode = (data.country || data.noc || "ARG").toUpperCase();
      const flagStr = data.flag || "🇦🇷";
      const shirtNum = String(data.shirt || data.bib || "5");
      const playerName = (data.athlete || data.player || data.name || "FERNANDO GAGO").toUpperCase();
      const hasCard = !!data.card;
      const cardColor = data.card && data.card.toLowerCase().includes("yellow") ? "#eab308" : "#ef4444";

      const barBg = new fabric.Rect(createProps('rect', {
        left: 90, top: 890, width: 860, height: 56, fill: '#003366', rx: 6, ry: 6,
        stroke: '#001938', strokeWidth: 2, skewX: -15
      }));
      const nocTxt = new fabric.Textbox(countryCode, createProps('textbox', {
        left: 115, top: 902, fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 55
      }));
      const flagTxt = new fabric.Textbox(flagStr, createProps('textbox', {
        left: 175, top: 900, fontSize: 24, fill: '#ffffff', width: 40
      }));
      const sTxt = new fabric.Textbox(shirtNum, createProps('textbox', {
        left: 225, top: 900, fontSize: 24, fontWeight: 'bold', fontStyle: 'italic', fill: '#38bdf8', width: 40
      }));
      const nameTxt = new fabric.Textbox(playerName, createProps('textbox', {
        left: 275, top: 900, fontSize: 24, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 500
      }));

      if (hasCard) {
        const cardBadge = new fabric.Rect(createProps('rect', {
          left: 830, top: 906, width: 14, height: 22, fill: cardColor, rx: 2, ry: 2, skewX: -10
        }));
        objects.push(cardBadge);
      }

      const ringColor = '#ffd700';
      const r1 = new fabric.Circle(createProps('circle', { left: 860, top: 903, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r2 = new fabric.Circle(createProps('circle', { left: 880, top: 903, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r3 = new fabric.Circle(createProps('circle', { left: 900, top: 903, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r4 = new fabric.Circle(createProps('circle', { left: 870, top: 912, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r5 = new fabric.Circle(createProps('circle', { left: 890, top: 912, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));

      objects.push(barBg, nocTxt, flagTxt, sTxt, nameTxt, r1, r2, r3, r4, r5);
      break;
    }

    case 'football-officials-list': {
      const eventTitle = (data.event || "MEN'S FOOTBALL").toUpperCase();
      const subTitle = (data.subTitle || "OFFICIALS").toUpperCase();
      const officialsList = Array.isArray(data.officials) ? data.officials : [
        { noc: "URU", flag: "🇺🇾", name: "MARTIN VAZQUEZ", role: "REFEREE" },
        { noc: "URU", flag: "🇺🇾", name: "MAURICIO ESPINOSA", role: "ASSISTANT REFEREE 1" },
        { noc: "URU", flag: "🇺🇾", name: "MIGUEL NIEVAS", role: "ASSISTANT REFEREE 2" },
        { noc: "FRA", flag: "🇫🇷", name: "STEPHANE LANNOY", role: "4TH OFFICIAL" }
      ];

      // Header Bar
      const headBg = new fabric.Rect(createProps('rect', {
        left: 90, top: 740, width: 960, height: 56, fill: '#003366', rx: 6, ry: 6,
        stroke: '#001938', strokeWidth: 2, skewX: -15
      }));
      const iconTxt = new fabric.Textbox("⚽", createProps('textbox', {
        left: 110, top: 752, fontSize: 24, fill: '#ffffff', width: 35
      }));
      const titleTxt = new fabric.Textbox(eventTitle, createProps('textbox', {
        left: 155, top: 748, fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 400
      }));
      const pillBg = new fabric.Rect(createProps('rect', {
        left: 155, top: 774, width: 140, height: 18, fill: '#ffffff', rx: 4, ry: 4, skewX: -15
      }));
      const pillTxt = new fabric.Textbox(subTitle, createProps('textbox', {
        left: 155, top: 776, fontSize: 11, fontWeight: 'bold', fontStyle: 'italic', fill: '#002850', width: 140, textAlign: 'center'
      }));

      const ringColor = '#ffd700';
      const r1 = new fabric.Circle(createProps('circle', { left: 950, top: 753, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r2 = new fabric.Circle(createProps('circle', { left: 970, top: 753, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r3 = new fabric.Circle(createProps('circle', { left: 990, top: 753, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r4 = new fabric.Circle(createProps('circle', { left: 960, top: 762, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r5 = new fabric.Circle(createProps('circle', { left: 980, top: 762, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));

      objects.push(headBg, iconTxt, titleTxt, pillBg, pillTxt, r1, r2, r3, r4, r5);

      officialsList.forEach((off, idx) => {
        const topOffset = 800 + (idx * 44);

        const rowBg = new fabric.Rect(createProps('rect', {
          left: 90, top: topOffset, width: 960, height: 42, fill: idx % 2 === 0 ? '#001e3d' : '#001736', rx: 4, ry: 4,
          stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, skewX: -15
        }));
        const oNoc = new fabric.Textbox((off.noc || '').toUpperCase(), createProps('textbox', {
          left: 110, top: topOffset + 10, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 45
        }));
        const oFlag = new fabric.Textbox(off.flag || '', createProps('textbox', {
          left: 160, top: topOffset + 8, fontSize: 20, fill: '#ffffff', width: 35
        }));
        const oName = new fabric.Textbox((off.name || '').toUpperCase(), createProps('textbox', {
          left: 200, top: topOffset + 10, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 400
        }));
        const rRole = new fabric.Textbox((off.role || '').toUpperCase(), createProps('textbox', {
          left: 620, top: topOffset + 10, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 320, textAlign: 'right'
        }));

        objects.push(rowBg, oNoc, oFlag, oName, rRole);
      });
      break;
    }

    case 'football-official-id': {
      const countryCode = (data.country || data.noc || "URU").toUpperCase();
      const flagStr = data.flag || "🇺🇾";
      const officialName = (data.officialName || data.name || "MAURICIO ESPINOSA").toUpperCase();
      const roleTitle = (data.role || data.title || "ASSISTANT REFEREE 1").toUpperCase();

      // Header Bar
      const headBg = new fabric.Rect(createProps('rect', {
        left: 90, top: 840, width: 960, height: 56, fill: '#003366', rx: 6, ry: 6,
        stroke: '#001938', strokeWidth: 2, skewX: -15
      }));
      const nocTxt = new fabric.Textbox(countryCode, createProps('textbox', {
        left: 110, top: 852, fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 50
      }));
      const flagTxt = new fabric.Textbox(flagStr, createProps('textbox', {
        left: 165, top: 850, fontSize: 22, fill: '#ffffff', width: 35
      }));
      const nameTxt = new fabric.Textbox(officialName, createProps('textbox', {
        left: 210, top: 850, fontSize: 24, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 600
      }));

      const ringColor = '#ffd700';
      const r1 = new fabric.Circle(createProps('circle', { left: 950, top: 853, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r2 = new fabric.Circle(createProps('circle', { left: 970, top: 853, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r3 = new fabric.Circle(createProps('circle', { left: 990, top: 853, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r4 = new fabric.Circle(createProps('circle', { left: 960, top: 862, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r5 = new fabric.Circle(createProps('circle', { left: 980, top: 862, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));

      // Sub Bar
      const subBg = new fabric.Rect(createProps('rect', {
        left: 90, top: 900, width: 960, height: 44, fill: '#001e3d', rx: 4, ry: 4,
        stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, skewX: -15
      }));
      const roleTxt = new fabric.Textbox(roleTitle, createProps('textbox', {
        left: 110, top: 910, fontSize: 20, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 800
      }));

      objects.push(headBg, nocTxt, flagTxt, nameTxt, r1, r2, r3, r4, r5, subBg, roleTxt);
      break;
    }

    case 'football-previous-results': {
      const teamNoc = (data.noc || data.country || "CMR").toUpperCase();
      const teamFlag = data.flag || "🇨🇲";
      const teamName = (data.teamName || data.name || "CAMEROON").toUpperCase();
      const teamRecord = data.record || "1 - 0 - 2";
      const subTitle = (data.subTitle || "PREVIOUS RESULTS").toUpperCase();

      const resultsList = Array.isArray(data.results) ? data.results : [
        { oppNoc: "KOR", oppFlag: "🇰🇷", oppName: "KOREA", group: "GROUP D", score: "1-1", outcome: "D" },
        { oppNoc: "HON", oppFlag: "🇭🇳", oppName: "HONDURAS", group: "GROUP D", score: "1-0", outcome: "W" },
        { oppNoc: "ITA", oppFlag: "🇮🇹", oppName: "ITALY", group: "GROUP D", score: "0-0", outcome: "D" }
      ];

      // Header Bar
      const headBg = new fabric.Rect(createProps('rect', {
        left: 90, top: 740, width: 960, height: 56, fill: '#003366', rx: 6, ry: 6,
        stroke: '#001938', strokeWidth: 2, skewX: -15
      }));
      const nocTxt = new fabric.Textbox(teamNoc, createProps('textbox', {
        left: 110, top: 752, fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 50
      }));
      const flagTxt = new fabric.Textbox(teamFlag, createProps('textbox', {
        left: 165, top: 750, fontSize: 22, fill: '#ffffff', width: 35
      }));
      const titleTxt = new fabric.Textbox(`${teamName} (${teamRecord})`, createProps('textbox', {
        left: 210, top: 748, fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 500
      }));
      const pillBg = new fabric.Rect(createProps('rect', {
        left: 210, top: 774, width: 160, height: 18, fill: '#ffffff', rx: 4, ry: 4, skewX: -15
      }));
      const pillTxt = new fabric.Textbox(subTitle, createProps('textbox', {
        left: 210, top: 776, fontSize: 11, fontWeight: 'bold', fontStyle: 'italic', fill: '#002850', width: 160, textAlign: 'center'
      }));

      const ringColor = '#ffd700';
      const r1 = new fabric.Circle(createProps('circle', { left: 950, top: 753, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r2 = new fabric.Circle(createProps('circle', { left: 970, top: 753, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r3 = new fabric.Circle(createProps('circle', { left: 990, top: 753, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r4 = new fabric.Circle(createProps('circle', { left: 960, top: 762, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r5 = new fabric.Circle(createProps('circle', { left: 980, top: 762, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));

      objects.push(headBg, nocTxt, flagTxt, titleTxt, pillBg, pillTxt, r1, r2, r3, r4, r5);

      resultsList.forEach((res, idx) => {
        const topOffset = 800 + (idx * 44);

        const rowBg = new fabric.Rect(createProps('rect', {
          left: 90, top: topOffset, width: 960, height: 42, fill: idx % 2 === 0 ? '#001e3d' : '#001736', rx: 4, ry: 4,
          stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, skewX: -15
        }));
        const oNoc = new fabric.Textbox((res.oppNoc || '').toUpperCase(), createProps('textbox', {
          left: 110, top: topOffset + 10, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 45
        }));
        const oFlag = new fabric.Textbox(res.oppFlag || '', createProps('textbox', {
          left: 160, top: topOffset + 8, fontSize: 20, fill: '#ffffff', width: 35
        }));
        const oName = new fabric.Textbox((res.oppName || '').toUpperCase(), createProps('textbox', {
          left: 200, top: topOffset + 10, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 400
        }));

        const grpTxt = new fabric.Textbox((res.group || '').toUpperCase(), createProps('textbox', {
          left: 700, top: topOffset + 10, fontSize: 16, fontWeight: 'bold', fontStyle: 'italic', fill: '#38bdf8', width: 120, textAlign: 'right'
        }));
        const scrTxt = new fabric.Textbox(res.score || '', createProps('textbox', {
          left: 835, top: topOffset + 10, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 60, textAlign: 'center'
        }));
        const outTxt = new fabric.Textbox(res.outcome || '', createProps('textbox', {
          left: 905, top: topOffset + 10, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic',
          fill: res.outcome === 'W' ? '#10b981' : res.outcome === 'L' ? '#ef4444' : '#ffd700',
          width: 30, textAlign: 'center'
        }));

        objects.push(rowBg, oNoc, oFlag, oName, grpTxt, scrTxt, outTxt);
      });
      break;
    }

    case 'football-substitutes-list': {
      const teamNoc = (data.noc || data.country || "NZL").toUpperCase();
      const teamFlag = data.flag || "🇳🇿";
      const teamName = (data.teamName || data.name || "NEW ZEALAND").toUpperCase();
      const subTitle = (data.subTitle || "SUBSTITUTES").toUpperCase();

      const leftSubs = Array.isArray(data.leftSubs) ? data.leftSubs : [
        { shirt: "5", name: "RYAN NELSEN" },
        { shirt: "11", name: "JEREMY BROCKIE" },
        { shirt: "13", name: "SHAUN VAN ROOYEN" },
        { shirt: "14", name: "COLE TINKLER" }
      ];

      const rightSubs = Array.isArray(data.rightSubs) ? data.rightSubs : [
        { shirt: "15", name: "GREG DRAPER" },
        { shirt: "17", name: "SAM MESSAM" },
        { shirt: "18", name: "LIAM LITTLE", pos: "GK" }
      ];

      // Header Bar
      const headBg = new fabric.Rect(createProps('rect', {
        left: 90, top: 740, width: 960, height: 56, fill: '#003366', rx: 6, ry: 6,
        stroke: '#001938', strokeWidth: 2, skewX: -15
      }));
      const nocTxt = new fabric.Textbox(teamNoc, createProps('textbox', {
        left: 110, top: 752, fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 50
      }));
      const flagTxt = new fabric.Textbox(teamFlag, createProps('textbox', {
        left: 165, top: 750, fontSize: 22, fill: '#ffffff', width: 35
      }));
      const titleTxt = new fabric.Textbox(teamName, createProps('textbox', {
        left: 210, top: 748, fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 400
      }));
      const pillBg = new fabric.Rect(createProps('rect', {
        left: 210, top: 774, width: 140, height: 18, fill: '#ffffff', rx: 4, ry: 4, skewX: -15
      }));
      const pillTxt = new fabric.Textbox(subTitle, createProps('textbox', {
        left: 210, top: 776, fontSize: 11, fontWeight: 'bold', fontStyle: 'italic', fill: '#002850', width: 140, textAlign: 'center'
      }));

      const ringColor = '#ffd700';
      const r1 = new fabric.Circle(createProps('circle', { left: 950, top: 753, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r2 = new fabric.Circle(createProps('circle', { left: 970, top: 753, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r3 = new fabric.Circle(createProps('circle', { left: 990, top: 753, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r4 = new fabric.Circle(createProps('circle', { left: 960, top: 762, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r5 = new fabric.Circle(createProps('circle', { left: 980, top: 762, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));

      objects.push(headBg, nocTxt, flagTxt, titleTxt, pillBg, pillTxt, r1, r2, r3, r4, r5);

      Array.from({ length: 4 }).forEach((_, idx) => {
        const topOffset = 800 + (idx * 44);
        const lp = leftSubs[idx];
        const rp = rightSubs[idx];

        const rowBg = new fabric.Rect(createProps('rect', {
          left: 90, top: topOffset, width: 960, height: 42, fill: idx % 2 === 0 ? '#001e3d' : '#001736', rx: 4, ry: 4,
          stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, skewX: -15
        }));
        objects.push(rowBg);

        // Left Column
        if (lp) {
          const pTxt = new fabric.Textbox(String(lp.name), createProps('textbox', {
            left: 110, top: topOffset + 10, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 360
          }));
          objects.push(pTxt);
          if (lp.pos) {
            const posTxt = new fabric.Textbox(String(lp.pos), createProps('textbox', {
              left: 450, top: topOffset + 10, fontSize: 14, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffd700', width: 30
            }));
            objects.push(posTxt);
          }
        }

        // Right Column
        if (rp) {
          const pTxt = new fabric.Textbox(String(rp.name), createProps('textbox', {
            left: 560, top: topOffset + 10, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 360
          }));
          objects.push(pTxt);
          if (rp.pos) {
            const posTxt = new fabric.Textbox(String(rp.pos), createProps('textbox', {
              left: 900, top: topOffset + 10, fontSize: 14, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffd700', width: 30
            }));
            objects.push(posTxt);
          }
        }
      });
      break;
    }

    case 'football-starting-lineup': {
      const teamNoc = (data.noc || data.country || "NZL").toUpperCase();
      const teamFlag = data.flag || "🇳🇿";
      const teamName = (data.teamName || data.name || "NEW ZEALAND").toUpperCase();
      const subTitle = (data.subTitle || "STARTING LINEUP").toUpperCase();

      const leftPlayers = Array.isArray(data.leftPlayers) ? data.leftPlayers : [
        { shirt: "1", name: "JACOB SPOONLEY", pos: "GK" },
        { shirt: "2", name: "AARON SCOTT", pos: "C" },
        { shirt: "3", name: "IAN HOGG" },
        { shirt: "4", name: "COLE PEVERLEY" },
        { shirt: "6", name: "MICHAEL BOXALL" },
        { shirt: "7", name: "SIMON ELLIOTT" },
        { shirt: "8", name: "CRAIG HENDERSON" }
      ];

      const rightPlayers = Array.isArray(data.rightPlayers) ? data.rightPlayers : [
        { shirt: "9", name: "DANIEL ELLENSOHN" },
        { shirt: "10", name: "CHRIS KILLEN" },
        { shirt: "12", name: "STEVEN OLD" },
        { shirt: "16", name: "SAM JENKINS" }
      ];
      const coachName = (data.coach || "STU JACOBS").toUpperCase();

      // Header Bar
      const headBg = new fabric.Rect(createProps('rect', {
        left: 90, top: 620, width: 960, height: 56, fill: '#003366', rx: 6, ry: 6,
        stroke: '#001938', strokeWidth: 2, skewX: -15
      }));
      const nocTxt = new fabric.Textbox(teamNoc, createProps('textbox', {
        left: 110, top: 632, fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 50
      }));
      const flagTxt = new fabric.Textbox(teamFlag, createProps('textbox', {
        left: 165, top: 630, fontSize: 22, fill: '#ffffff', width: 35
      }));
      const titleTxt = new fabric.Textbox(teamName, createProps('textbox', {
        left: 210, top: 628, fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 400
      }));
      const pillBg = new fabric.Rect(createProps('rect', {
        left: 210, top: 654, width: 160, height: 18, fill: '#ffffff', rx: 4, ry: 4, skewX: -15
      }));
      const pillTxt = new fabric.Textbox(subTitle, createProps('textbox', {
        left: 210, top: 656, fontSize: 11, fontWeight: 'bold', fontStyle: 'italic', fill: '#002850', width: 160, textAlign: 'center'
      }));

      const ringColor = '#ffd700';
      const r1 = new fabric.Circle(createProps('circle', { left: 950, top: 633, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r2 = new fabric.Circle(createProps('circle', { left: 970, top: 633, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r3 = new fabric.Circle(createProps('circle', { left: 990, top: 633, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r4 = new fabric.Circle(createProps('circle', { left: 960, top: 642, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r5 = new fabric.Circle(createProps('circle', { left: 980, top: 642, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));

      objects.push(headBg, nocTxt, flagTxt, titleTxt, pillBg, pillTxt, r1, r2, r3, r4, r5);

      Array.from({ length: 7 }).forEach((_, idx) => {
        const topOffset = 680 + (idx * 40);
        const lp = leftPlayers[idx];
        const rp = rightPlayers[idx];

        const rowBg = new fabric.Rect(createProps('rect', {
          left: 90, top: topOffset, width: 960, height: 38, fill: idx % 2 === 0 ? '#001e3d' : '#001736', rx: 4, ry: 4,
          stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, skewX: -15
        }));
        objects.push(rowBg);

        // Left Column
        if (lp) {
          const sTxt = new fabric.Textbox(String(lp.shirt), createProps('textbox', {
            left: 110, top: topOffset + 9, fontSize: 16, fontWeight: 'bold', fontStyle: 'italic', fill: '#38bdf8', width: 25, textAlign: 'right'
          }));
          const pTxt = new fabric.Textbox(String(lp.name), createProps('textbox', {
            left: 145, top: topOffset + 9, fontSize: 16, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 320
          }));
          objects.push(sTxt, pTxt);
          if (lp.pos) {
            const posTxt = new fabric.Textbox(String(lp.pos), createProps('textbox', {
              left: 450, top: topOffset + 9, fontSize: 14, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffd700', width: 30
            }));
            objects.push(posTxt);
          }
        }

        // Right Column
        if (rp) {
          const sTxt = new fabric.Textbox(String(rp.shirt), createProps('textbox', {
            left: 560, top: topOffset + 9, fontSize: 16, fontWeight: 'bold', fontStyle: 'italic', fill: '#38bdf8', width: 25, textAlign: 'right'
          }));
          const pTxt = new fabric.Textbox(String(rp.name), createProps('textbox', {
            left: 595, top: topOffset + 9, fontSize: 16, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 320
          }));
          objects.push(sTxt, pTxt);
        } else if (idx === 5) {
          const cLabel = new fabric.Textbox("COACH", createProps('textbox', {
            left: 595, top: topOffset + 9, fontSize: 14, fontWeight: 'bold', fontStyle: 'italic', fill: '#cbd5e1', width: 100
          }));
          objects.push(cLabel);
        } else if (idx === 6) {
          const cName = new fabric.Textbox(coachName, createProps('textbox', {
            left: 595, top: topOffset + 9, fontSize: 16, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 320
          }));
          objects.push(cName);
        }
      });
      break;
    }

    case 'team-id-single': {
      const countryCode = (data.country || data.noc || "BEL").toUpperCase();
      const flagStr = data.flag || "🇧🇪";
      const teamName = (data.teamName || data.name || "BELGIUM").toUpperCase();

      const barBg = new fabric.Rect(createProps('rect', {
        left: 90, top: 890, width: 860, height: 56, fill: '#003366', rx: 6, ry: 6,
        stroke: '#001938', strokeWidth: 2, skewX: -15
      }));
      const nocTxt = new fabric.Textbox(countryCode, createProps('textbox', {
        left: 115, top: 902, fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 55
      }));
      const flagTxt = new fabric.Textbox(flagStr, createProps('textbox', {
        left: 175, top: 900, fontSize: 24, fill: '#ffffff', width: 40
      }));
      const nameTxt = new fabric.Textbox(teamName, createProps('textbox', {
        left: 230, top: 900, fontSize: 24, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 550
      }));

      const ringColor = '#ffd700';
      const r1 = new fabric.Circle(createProps('circle', { left: 860, top: 903, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r2 = new fabric.Circle(createProps('circle', { left: 880, top: 903, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r3 = new fabric.Circle(createProps('circle', { left: 900, top: 903, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r4 = new fabric.Circle(createProps('circle', { left: 870, top: 912, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r5 = new fabric.Circle(createProps('circle', { left: 890, top: 912, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));

      objects.push(barBg, nocTxt, flagTxt, nameTxt, r1, r2, r3, r4, r5);
      break;
    }

    case 'football-group-standings': {
      const eventTitle = (data.event || "MEN'S FOOTBALL").toUpperCase();
      const subTitle = (data.subTitle || "STANDINGS - GROUP D").toUpperCase();
      const standingsList = Array.isArray(data.standings) ? data.standings : [
        { rank: "1", noc: "ITA", flag: "🇮🇹", name: "ITALY", w: "2", l: "0", d: "0", f: "6", a: "0", pts: "6" },
        { rank: "2", noc: "CMR", flag: "🇨🇲", name: "CAMEROON", w: "1", l: "0", d: "1", f: "2", a: "1", pts: "4" },
        { rank: "3", noc: "KOR", flag: "🇰🇷", name: "KOREA", w: "0", l: "1", d: "1", f: "1", a: "4", pts: "1" },
        { rank: "4", noc: "HON", flag: "🇭🇳", name: "HONDURAS", w: "0", l: "2", d: "0", f: "0", a: "4", pts: "0" }
      ];

      // Primary Header Bar
      const headBg = new fabric.Rect(createProps('rect', {
        left: 90, top: 740, width: 950, height: 56, fill: '#003366', rx: 6, ry: 6,
        stroke: '#001938', strokeWidth: 2, skewX: -15
      }));
      const iconTxt = new fabric.Textbox("⚽", createProps('textbox', {
        left: 110, top: 752, fontSize: 24, fill: '#ffffff', width: 35
      }));
      const titleTxt = new fabric.Textbox(eventTitle, createProps('textbox', {
        left: 155, top: 748, fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 400
      }));
      const pillBg = new fabric.Rect(createProps('rect', {
        left: 155, top: 774, width: 180, height: 18, fill: '#ffffff', rx: 4, ry: 4, skewX: -15
      }));
      const pillTxt = new fabric.Textbox(subTitle, createProps('textbox', {
        left: 155, top: 776, fontSize: 11, fontWeight: 'bold', fontStyle: 'italic', fill: '#002850', width: 180, textAlign: 'center'
      }));

      // Column Headers
      const colHeaders = ["W", "L", "D", "F", "A", "PTS"];
      colHeaders.forEach((ch, idx) => {
        const chTxt = new fabric.Textbox(ch, createProps('textbox', {
          left: 680 + (idx * 35), top: 758, fontSize: 16, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 30, textAlign: 'center'
        }));
        objects.push(chTxt);
      });

      // Olympic Rings
      const ringColor = '#ffd700';
      const r1 = new fabric.Circle(createProps('circle', { left: 930, top: 753, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r2 = new fabric.Circle(createProps('circle', { left: 950, top: 753, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r3 = new fabric.Circle(createProps('circle', { left: 970, top: 753, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r4 = new fabric.Circle(createProps('circle', { left: 940, top: 762, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r5 = new fabric.Circle(createProps('circle', { left: 960, top: 762, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));

      objects.push(headBg, iconTxt, titleTxt, pillBg, pillTxt, r1, r2, r3, r4, r5);

      standingsList.forEach((st, idx) => {
        const topOffset = 800 + (idx * 45);
        const rowBg = new fabric.Rect(createProps('rect', {
          left: 90, top: topOffset, width: 950, height: 42, fill: idx % 2 === 0 ? '#001e3d' : '#001736', rx: 4, ry: 4,
          stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, skewX: -15
        }));
        const rBadge = new fabric.Rect(createProps('rect', {
          left: 108, top: topOffset + 7, width: 26, height: 26, fill: '#dc2626', rx: 4, ry: 4, skewX: -15
        }));
        const rTxt = new fabric.Textbox(String(st.rank), createProps('textbox', {
          left: 108, top: topOffset + 10, fontSize: 16, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 26, textAlign: 'center'
        }));
        const tNoc = new fabric.Textbox((st.noc || '').toUpperCase(), createProps('textbox', {
          left: 145, top: topOffset + 10, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 50
        }));
        const tFlag = new fabric.Textbox(st.flag || '', createProps('textbox', {
          left: 195, top: topOffset + 8, fontSize: 20, fill: '#ffffff', width: 35
        }));
        const tName = new fabric.Textbox((st.name || '').toUpperCase(), createProps('textbox', {
          left: 235, top: topOffset + 10, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 400
        }));

        objects.push(rowBg, rBadge, rTxt, tNoc, tFlag, tName);

        if (st.q || st.qualified || (data.showQ && Number(st.rank) <= 3)) {
          const qTxt = new fabric.Textbox("Q", createProps('textbox', {
            left: 645, top: topOffset + 10, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', fill: '#10b981', width: 25, textAlign: 'center'
          }));
          objects.push(qTxt);
        }

        const vals = [st.w, st.l, st.d, st.f, st.a, st.pts];
        vals.forEach((v, vIdx) => {
          const vTxt = new fabric.Textbox(String(v ?? 0), createProps('textbox', {
            left: 680 + (vIdx * 35), top: topOffset + 10, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 30, textAlign: 'center'
          }));
          objects.push(vTxt);
        });
      });
      break;
    }

    case 'group-list-teams': {
      const eventTitle = (data.event || "MEN'S FOOTBALL").toUpperCase();
      const subTitle = (data.subTitle || "GROUP C").toUpperCase();
      const teamsList = Array.isArray(data.teams) ? data.teams : [
        { noc: "BEL", flag: "🇧🇪", name: "BELGIUM" },
        { noc: "BRA", flag: "🇧🇷", name: "BRAZIL" },
        { noc: "CHN", flag: "🇨🇳", name: "CHINA" },
        { noc: "NZL", flag: "🇳🇿", name: "NEW ZEALAND" }
      ];

      // Primary Header Bar
      const headBg = new fabric.Rect(createProps('rect', {
        left: 90, top: 740, width: 860, height: 56, fill: '#003366', rx: 6, ry: 6,
        stroke: '#001938', strokeWidth: 2, skewX: -15
      }));
      const iconTxt = new fabric.Textbox("⚽", createProps('textbox', {
        left: 110, top: 752, fontSize: 24, fill: '#ffffff', width: 35
      }));
      const titleTxt = new fabric.Textbox(eventTitle, createProps('textbox', {
        left: 155, top: 748, fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 500
      }));
      const pillBg = new fabric.Rect(createProps('rect', {
        left: 155, top: 774, width: 140, height: 18, fill: '#ffffff', rx: 4, ry: 4, skewX: -15
      }));
      const pillTxt = new fabric.Textbox(subTitle, createProps('textbox', {
        left: 155, top: 776, fontSize: 11, fontWeight: 'bold', fontStyle: 'italic', fill: '#002850', width: 140, textAlign: 'center'
      }));

      // Olympic Rings
      const ringColor = '#ffd700';
      const r1 = new fabric.Circle(createProps('circle', { left: 860, top: 753, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r2 = new fabric.Circle(createProps('circle', { left: 880, top: 753, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r3 = new fabric.Circle(createProps('circle', { left: 900, top: 753, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r4 = new fabric.Circle(createProps('circle', { left: 870, top: 762, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r5 = new fabric.Circle(createProps('circle', { left: 890, top: 762, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));

      objects.push(headBg, iconTxt, titleTxt, pillBg, pillTxt, r1, r2, r3, r4, r5);

      teamsList.forEach((tm, idx) => {
        const topOffset = 800 + (idx * 45);
        const rowBg = new fabric.Rect(createProps('rect', {
          left: 90, top: topOffset, width: 860, height: 42, fill: idx % 2 === 0 ? '#001e3d' : '#001736', rx: 4, ry: 4,
          stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, skewX: -15
        }));
        const tNoc = new fabric.Textbox((tm.noc || '').toUpperCase(), createProps('textbox', {
          left: 110, top: topOffset + 10, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 50
        }));
        const tFlag = new fabric.Textbox(tm.flag || '', createProps('textbox', {
          left: 165, top: topOffset + 8, fontSize: 20, fill: '#ffffff', width: 35
        }));
        const tName = new fabric.Textbox((tm.name || '').toUpperCase(), createProps('textbox', {
          left: 210, top: topOffset + 10, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 600
        }));

        objects.push(rowBg, tNoc, tFlag, tName);
      });
      break;
    }

    case 'match-id-teams': {
      const eventTitle = (data.event || "MEN'S FOOTBALL").toUpperCase();
      const subTitle = (data.subTitle || "FIRST ROUND - GROUP A").toUpperCase();
      const team1Noc = (data.team1Noc || data.homeNoc || "AUS").toUpperCase();
      const team1Flag = data.team1Flag || data.homeFlag || "🇦🇺";
      const team1Name = (data.team1Name || data.homeTeam || "AUSTRALIA").toUpperCase();
      const team2Noc = (data.team2Noc || data.awayNoc || "SRB").toUpperCase();
      const team2Flag = data.team2Flag || data.awayFlag || "🇷🇸";
      const team2Name = (data.team2Name || data.awayTeam || "SERBIA").toUpperCase();

      // Primary Header Bar
      const headBg = new fabric.Rect(createProps('rect', {
        left: 90, top: 830, width: 860, height: 56, fill: '#003366', rx: 6, ry: 6,
        stroke: '#001938', strokeWidth: 2, skewX: -15
      }));
      const iconTxt = new fabric.Textbox("⚽", createProps('textbox', {
        left: 110, top: 842, fontSize: 24, fill: '#ffffff', width: 35
      }));
      const titleTxt = new fabric.Textbox(eventTitle, createProps('textbox', {
        left: 155, top: 838, fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 500
      }));
      const pillBg = new fabric.Rect(createProps('rect', {
        left: 155, top: 864, width: 220, height: 18, fill: '#ffffff', rx: 4, ry: 4, skewX: -15
      }));
      const pillTxt = new fabric.Textbox(subTitle, createProps('textbox', {
        left: 155, top: 866, fontSize: 11, fontWeight: 'bold', fontStyle: 'italic', fill: '#002850', width: 220, textAlign: 'center'
      }));

      // Olympic Rings
      const ringColor = '#ffd700';
      const r1 = new fabric.Circle(createProps('circle', { left: 860, top: 843, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r2 = new fabric.Circle(createProps('circle', { left: 880, top: 843, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r3 = new fabric.Circle(createProps('circle', { left: 900, top: 843, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r4 = new fabric.Circle(createProps('circle', { left: 870, top: 852, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r5 = new fabric.Circle(createProps('circle', { left: 890, top: 852, radius: 10, stroke: ringColor, strokeWidth: 2, fill: '' }));

      // Team Row 1
      const row1Bg = new fabric.Rect(createProps('rect', {
        left: 90, top: 890, width: 860, height: 44, fill: '#001e3d', rx: 4, ry: 4,
        stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, skewX: -15
      }));
      const t1Noc = new fabric.Textbox(team1Noc, createProps('textbox', {
        left: 110, top: 900, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 50
      }));
      const t1Flag = new fabric.Textbox(team1Flag, createProps('textbox', {
        left: 165, top: 898, fontSize: 20, fill: '#ffffff', width: 35
      }));
      const t1Name = new fabric.Textbox(team1Name, createProps('textbox', {
        left: 210, top: 900, fontSize: 20, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 600
      }));

      // Team Row 2
      const row2Bg = new fabric.Rect(createProps('rect', {
        left: 90, top: 938, width: 860, height: 44, fill: '#001736', rx: 4, ry: 4,
        stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, skewX: -15
      }));
      const t2Noc = new fabric.Textbox(team2Noc, createProps('textbox', {
        left: 110, top: 948, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 50
      }));
      const t2Flag = new fabric.Textbox(team2Flag, createProps('textbox', {
        left: 165, top: 946, fontSize: 20, fill: '#ffffff', width: 35
      }));
      const t2Name = new fabric.Textbox(team2Name, createProps('textbox', {
        left: 210, top: 948, fontSize: 20, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 600
      }));

      objects.push(headBg, iconTxt, titleTxt, pillBg, pillTxt, r1, r2, r3, r4, r5, row1Bg, t1Noc, t1Flag, t1Name, row2Bg, t2Noc, t2Flag, t2Name);
      break;
    }

    case 'clock-at-finish': {
      const wrTime = data.wrTime || "3:40.08";
      const orTime = data.orTime || "3:40.59";
      const clockStr = data.time || "3:41.60";

      // Row 1 WR Target
      const wrBg = new fabric.Rect(createProps('rect', {
        left: 90, top: 870, width: 240, height: 40, fill: '#003366', rx: 6, ry: 6,
        stroke: '#001938', strokeWidth: 2, skewX: -15
      }));
      const wrBadge = new fabric.Rect(createProps('rect', {
        left: 105, top: 879, width: 42, height: 22, fill: '#ffd700', rx: 11, ry: 11, skewX: -15
      }));
      const wrTxt = new fabric.Textbox("WR", createProps('textbox', {
        left: 105, top: 882, fontSize: 13, fontWeight: 'bold', fontStyle: 'italic', fill: '#000000', width: 42, textAlign: 'center'
      }));
      const wrVal = new fabric.Textbox(wrTime, createProps('textbox', {
        left: 170, top: 878, fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 140, textAlign: 'right'
      }));

      // Row 2 OR Target
      const orBg = new fabric.Rect(createProps('rect', {
        left: 90, top: 914, width: 240, height: 40, fill: '#003366', rx: 6, ry: 6,
        stroke: '#001938', strokeWidth: 2, skewX: -15
      }));
      const orBadge = new fabric.Rect(createProps('rect', {
        left: 105, top: 923, width: 42, height: 22, fill: '#e2e8f0', rx: 11, ry: 11, skewX: -15
      }));
      const orTxt = new fabric.Textbox("OR", createProps('textbox', {
        left: 105, top: 926, fontSize: 13, fontWeight: 'bold', fontStyle: 'italic', fill: '#000000', width: 42, textAlign: 'center'
      }));
      const orVal = new fabric.Textbox(orTime, createProps('textbox', {
        left: 170, top: 922, fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 140, textAlign: 'right'
      }));

      // Right Clock Bar
      const clockBg = new fabric.Rect(createProps('rect', {
        left: 1510, top: 884, width: 180, height: 48, fill: '#dbeafe', rx: 6, ry: 6,
        stroke: '#001938', strokeWidth: 2, skewX: -15
      }));
      const clockTxt = new fabric.Textbox(clockStr, createProps('textbox', {
        left: 1520, top: 893, fontSize: 26, fontWeight: 'bold', fontStyle: 'italic', fill: '#002850', width: 160, textAlign: 'center'
      }));
      const ringsBg = new fabric.Rect(createProps('rect', {
        left: 1675, top: 884, width: 100, height: 48, fill: '#003366', rx: 6, ry: 6,
        stroke: '#001938', strokeWidth: 2, skewX: -15
      }));

      const ringColor = '#ffd700';
      const r1 = new fabric.Circle(createProps('circle', { left: 1690, top: 893, radius: 8, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r2 = new fabric.Circle(createProps('circle', { left: 1708, top: 893, radius: 8, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r3 = new fabric.Circle(createProps('circle', { left: 1726, top: 893, radius: 8, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r4 = new fabric.Circle(createProps('circle', { left: 1699, top: 901, radius: 8, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r5 = new fabric.Circle(createProps('circle', { left: 1717, top: 901, radius: 8, stroke: ringColor, strokeWidth: 2, fill: '' }));

      objects.push(wrBg, wrBadge, wrTxt, wrVal, orBg, orBadge, orTxt, orVal, clockBg, clockTxt, ringsBg, r1, r2, r3, r4, r5);
      break;
    }

    case 'clock-before-finish': {
      const wrTime = data.wrTime || "47.24";
      const orTime = data.orTime || "47.27";
      const clockStr = data.time || "47.1";

      // Row 1 WR Target
      const wrBg = new fabric.Rect(createProps('rect', {
        left: 90, top: 870, width: 220, height: 40, fill: '#003366', rx: 6, ry: 6,
        stroke: '#001938', strokeWidth: 2, skewX: -15
      }));
      const wrBadge = new fabric.Rect(createProps('rect', {
        left: 105, top: 879, width: 42, height: 22, fill: '#ffd700', rx: 11, ry: 11, skewX: -15
      }));
      const wrTxt = new fabric.Textbox("WR", createProps('textbox', {
        left: 105, top: 882, fontSize: 13, fontWeight: 'bold', fontStyle: 'italic', fill: '#000000', width: 42, textAlign: 'center'
      }));
      const wrVal = new fabric.Textbox(wrTime, createProps('textbox', {
        left: 170, top: 878, fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 120, textAlign: 'right'
      }));

      // Row 2 OR Target
      const orBg = new fabric.Rect(createProps('rect', {
        left: 90, top: 914, width: 220, height: 40, fill: '#003366', rx: 6, ry: 6,
        stroke: '#001938', strokeWidth: 2, skewX: -15
      }));
      const orBadge = new fabric.Rect(createProps('rect', {
        left: 105, top: 923, width: 42, height: 22, fill: '#e2e8f0', rx: 11, ry: 11, skewX: -15
      }));
      const orTxt = new fabric.Textbox("OR", createProps('textbox', {
        left: 105, top: 926, fontSize: 13, fontWeight: 'bold', fontStyle: 'italic', fill: '#000000', width: 42, textAlign: 'center'
      }));
      const orVal = new fabric.Textbox(orTime, createProps('textbox', {
        left: 170, top: 922, fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 120, textAlign: 'right'
      }));

      // Right Clock Bar
      const clockBg = new fabric.Rect(createProps('rect', {
        left: 1530, top: 884, width: 160, height: 48, fill: '#dbeafe', rx: 6, ry: 6,
        stroke: '#001938', strokeWidth: 2, skewX: -15
      }));
      const clockTxt = new fabric.Textbox(clockStr, createProps('textbox', {
        left: 1540, top: 893, fontSize: 26, fontWeight: 'bold', fontStyle: 'italic', fill: '#002850', width: 140, textAlign: 'center'
      }));
      const ringsBg = new fabric.Rect(createProps('rect', {
        left: 1675, top: 884, width: 100, height: 48, fill: '#003366', rx: 6, ry: 6,
        stroke: '#001938', strokeWidth: 2, skewX: -15
      }));

      const ringColor = '#ffd700';
      const r1 = new fabric.Circle(createProps('circle', { left: 1690, top: 893, radius: 8, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r2 = new fabric.Circle(createProps('circle', { left: 1708, top: 893, radius: 8, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r3 = new fabric.Circle(createProps('circle', { left: 1726, top: 893, radius: 8, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r4 = new fabric.Circle(createProps('circle', { left: 1699, top: 901, radius: 8, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r5 = new fabric.Circle(createProps('circle', { left: 1717, top: 901, radius: 8, stroke: ringColor, strokeWidth: 2, fill: '' }));

      objects.push(wrBg, wrBadge, wrTxt, wrVal, orBg, orBadge, orTxt, orVal, clockBg, clockTxt, ringsBg, r1, r2, r3, r4, r5);
      break;
    }

    case 'clock-at-split': {
      const laneNum = String(data.lane || "4");
      const countryCode = (data.country || "AUS").toUpperCase();
      const flagStr = data.flag || "🇦🇺";
      const swimmerName = (data.athlete || data.swimmer || "SULLIVAN").toUpperCase();
      const splitRecord = data.splitRecord || "22.48";
      const deltaStr = data.delta || "-0.01";
      const lapStr = data.lap || data.distance || "50M";
      const clockStr = data.time || "22.47";

      // Top-Left Leader Bug
      const topBg = new fabric.Rect(createProps('rect', {
        left: 90, top: 70, width: 340, height: 42, fill: '#003366', rx: 6, ry: 6,
        stroke: '#001938', strokeWidth: 2, skewX: -15
      }));
      const laneTxt = new fabric.Textbox(laneNum, createProps('textbox', {
        left: 105, top: 80, fontSize: 20, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 25
      }));
      const nocTxt = new fabric.Textbox(countryCode, createProps('textbox', {
        left: 135, top: 80, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 50
      }));
      const flagTxt = new fabric.Textbox(flagStr, createProps('textbox', {
        left: 190, top: 78, fontSize: 22, fill: '#ffffff', width: 40
      }));
      const nameTxt = new fabric.Textbox(swimmerName, createProps('textbox', {
        left: 235, top: 80, fontSize: 20, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 180
      }));

      // Bottom-Left Split Delta
      const leftBg = new fabric.Rect(createProps('rect', {
        left: 90, top: 890, width: 260, height: 46, fill: '#003366', rx: 6, ry: 6,
        stroke: '#001938', strokeWidth: 2, skewX: -15
      }));
      const wrBadge = new fabric.Rect(createProps('rect', {
        left: 105, top: 901, width: 42, height: 22, fill: '#ffd700', rx: 11, ry: 11, skewX: -15
      }));
      const wrTxt = new fabric.Textbox("WR", createProps('textbox', {
        left: 105, top: 904, fontSize: 13, fontWeight: 'bold', fontStyle: 'italic', fill: '#000000', width: 42, textAlign: 'center'
      }));
      const splitTxt = new fabric.Textbox("SPLIT", createProps('textbox', {
        left: 160, top: 901, fontSize: 20, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 70
      }));
      const timeTxt = new fabric.Textbox(splitRecord, createProps('textbox', {
        left: 235, top: 900, fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 100, textAlign: 'right'
      }));

      const deltaBg = new fabric.Rect(createProps('rect', {
        left: 340, top: 890, width: 110, height: 46, fill: deltaStr.startsWith('+') ? '#dc2626' : '#059669', rx: 6, ry: 6,
        stroke: '#047857', strokeWidth: 2, skewX: -15
      }));
      const deltaTxt = new fabric.Textbox(deltaStr, createProps('textbox', {
        left: 340, top: 900, fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 110, textAlign: 'center'
      }));

      // Right Top Lap Pill
      const lapBg = new fabric.Rect(createProps('rect', {
        left: 1640, top: 852, width: 100, height: 26, fill: '#ffffff', rx: 4, ry: 4, skewX: -15
      }));
      const lapTxt = new fabric.Textbox(lapStr, createProps('textbox', {
        left: 1640, top: 855, fontSize: 16, fontWeight: 'bold', fontStyle: 'italic', fill: '#002850', width: 100, textAlign: 'center'
      }));

      // Right Clock Bar
      const clockBg = new fabric.Rect(createProps('rect', {
        left: 1530, top: 884, width: 160, height: 48, fill: '#dbeafe', rx: 6, ry: 6,
        stroke: '#001938', strokeWidth: 2, skewX: -15
      }));
      const clockTxt = new fabric.Textbox(clockStr, createProps('textbox', {
        left: 1540, top: 893, fontSize: 26, fontWeight: 'bold', fontStyle: 'italic', fill: '#002850', width: 140, textAlign: 'center'
      }));
      const ringsBg = new fabric.Rect(createProps('rect', {
        left: 1675, top: 884, width: 100, height: 48, fill: '#003366', rx: 6, ry: 6,
        stroke: '#001938', strokeWidth: 2, skewX: -15
      }));

      const ringColor = '#ffd700';
      const r1 = new fabric.Circle(createProps('circle', { left: 1690, top: 893, radius: 8, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r2 = new fabric.Circle(createProps('circle', { left: 1708, top: 893, radius: 8, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r3 = new fabric.Circle(createProps('circle', { left: 1726, top: 893, radius: 8, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r4 = new fabric.Circle(createProps('circle', { left: 1699, top: 901, radius: 8, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r5 = new fabric.Circle(createProps('circle', { left: 1717, top: 901, radius: 8, stroke: ringColor, strokeWidth: 2, fill: '' }));

      objects.push(topBg, laneTxt, nocTxt, flagTxt, nameTxt, leftBg, wrBadge, wrTxt, splitTxt, timeTxt, deltaBg, deltaTxt, lapBg, lapTxt, clockBg, clockTxt, ringsBg, r1, r2, r3, r4, r5);
      break;
    }

    case 'clock-before-split': {
      const targetTime = data.targetTime || data.splitTime || "22.44";
      const lapStr = data.lap || data.distance || "50M";
      const clockStr = data.time || "19.4";

      // Left Split Target Pill
      const leftBg = new fabric.Rect(createProps('rect', {
        left: 90, top: 890, width: 280, height: 46, fill: '#003366', rx: 6, ry: 6,
        stroke: '#001938', strokeWidth: 2, skewX: -15
      }));
      const wrBadge = new fabric.Rect(createProps('rect', {
        left: 105, top: 901, width: 42, height: 22, fill: '#ffd700', rx: 11, ry: 11, skewX: -15
      }));
      const wrTxt = new fabric.Textbox("WR", createProps('textbox', {
        left: 105, top: 904, fontSize: 13, fontWeight: 'bold', fontStyle: 'italic', fill: '#000000', width: 42, textAlign: 'center'
      }));
      const splitTxt = new fabric.Textbox("SPLIT", createProps('textbox', {
        left: 160, top: 901, fontSize: 20, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 70
      }));
      const timeTxt = new fabric.Textbox(targetTime, createProps('textbox', {
        left: 240, top: 900, fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 110, textAlign: 'right'
      }));

      // Right Top Lap Pill
      const lapBg = new fabric.Rect(createProps('rect', {
        left: 1640, top: 852, width: 100, height: 26, fill: '#ffffff', rx: 4, ry: 4, skewX: -15
      }));
      const lapTxt = new fabric.Textbox(lapStr, createProps('textbox', {
        left: 1640, top: 855, fontSize: 16, fontWeight: 'bold', fontStyle: 'italic', fill: '#002850', width: 100, textAlign: 'center'
      }));

      // Right Clock Bar
      const clockBg = new fabric.Rect(createProps('rect', {
        left: 1530, top: 884, width: 160, height: 48, fill: '#dbeafe', rx: 6, ry: 6,
        stroke: '#001938', strokeWidth: 2, skewX: -15
      }));
      const clockTxt = new fabric.Textbox(clockStr, createProps('textbox', {
        left: 1540, top: 893, fontSize: 26, fontWeight: 'bold', fontStyle: 'italic', fill: '#002850', width: 140, textAlign: 'center'
      }));
      const ringsBg = new fabric.Rect(createProps('rect', {
        left: 1675, top: 884, width: 100, height: 48, fill: '#003366', rx: 6, ry: 6,
        stroke: '#001938', strokeWidth: 2, skewX: -15
      }));

      const ringColor = '#ffd700';
      const r1 = new fabric.Circle(createProps('circle', { left: 1690, top: 893, radius: 8, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r2 = new fabric.Circle(createProps('circle', { left: 1708, top: 893, radius: 8, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r3 = new fabric.Circle(createProps('circle', { left: 1726, top: 893, radius: 8, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r4 = new fabric.Circle(createProps('circle', { left: 1699, top: 901, radius: 8, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r5 = new fabric.Circle(createProps('circle', { left: 1717, top: 901, radius: 8, stroke: ringColor, strokeWidth: 2, fill: '' }));

      objects.push(leftBg, wrBadge, wrTxt, splitTxt, timeTxt, lapBg, lapTxt, clockBg, clockTxt, ringsBg, r1, r2, r3, r4, r5);
      break;
    }

    case 'ceremony-id': {
      const eventTitle = (data.event || "WOMEN'S 200M BUTTERFLY").toUpperCase();
      const subTitle = (data.subTitle || "VICTORY CEREMONY").toUpperCase();

      const mainBar = new fabric.Rect(createProps('rect', {
        left: 90, top: 880, width: 1100, height: 56, fill: '#003366', rx: 6, ry: 6,
        stroke: '#001938', strokeWidth: 2, skewX: -15
      }));
      const iconTxt = new fabric.Textbox("🏊", createProps('textbox', {
        left: 115, top: 890, fontSize: 26, fill: '#ffffff', width: 35
      }));
      const titleTxt = new fabric.Textbox(eventTitle, createProps('textbox', {
        left: 155, top: 891, fontSize: 28, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 750
      }));

      // Sub Pill
      const pillBg = new fabric.Rect(createProps('rect', {
        left: 155, top: 938, width: 260, height: 26, fill: '#ffffff', rx: 4, ry: 4, skewX: -15
      }));
      const pillTxt = new fabric.Textbox(subTitle, createProps('textbox', {
        left: 165, top: 941, fontSize: 15, fontWeight: 'bold', fontStyle: 'italic', fill: '#002850', width: 240
      }));

      // 5 Gold Rings
      const ringColor = '#ffd700';
      const r1 = new fabric.Circle(createProps('circle', { left: 1075, top: 893, radius: 9, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r2 = new fabric.Circle(createProps('circle', { left: 1095, top: 893, radius: 9, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r3 = new fabric.Circle(createProps('circle', { left: 1115, top: 893, radius: 9, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r4 = new fabric.Circle(createProps('circle', { left: 1085, top: 902, radius: 9, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r5 = new fabric.Circle(createProps('circle', { left: 1105, top: 902, radius: 9, stroke: ringColor, strokeWidth: 2, fill: '' }));

      objects.push(mainBar, iconTxt, titleTxt, pillBg, pillTxt, r1, r2, r3, r4, r5);
      break;
    }

    case 'medal-id-single': {
      const countryCode = (data.country || "CHN").toUpperCase();
      const flagStr = data.flag || "🇨🇳";
      const athleteName = (data.athlete || "LIU ZIGE").toUpperCase();
      const medalType = (data.medal || "GOLD").toUpperCase();
      const eventTitle = (data.event || "WOMEN'S 200M BUTTERFLY").toUpperCase();

      const mainBar = new fabric.Rect(createProps('rect', {
        left: 90, top: 880, width: 1100, height: 56, fill: '#003366', rx: 6, ry: 6,
        stroke: '#001938', strokeWidth: 2, skewX: -15
      }));
      const nocTxt = new fabric.Textbox(countryCode, createProps('textbox', {
        left: 115, top: 894, fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 60
      }));
      const flagTxt = new fabric.Textbox(flagStr, createProps('textbox', {
        left: 180, top: 891, fontSize: 26, fill: '#ffffff', width: 45
      }));
      const nameTxt = new fabric.Textbox(athleteName, createProps('textbox', {
        left: 235, top: 892, fontSize: 28, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 750
      }));

      // Sub Bar
      const subBar = new fabric.Rect(createProps('rect', {
        left: 90, top: 938, width: 1100, height: 42, fill: '#001c3d', rx: 4, ry: 4,
        stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, skewX: -15
      }));
      const medalBadge = new fabric.Textbox(medalType.includes('SILVER') ? '🥈' : medalType.includes('BRONZE') ? '🥉' : '🥇', createProps('textbox', {
        left: 115, top: 946, fontSize: 20, width: 35
      }));
      const subTxt = new fabric.Textbox(`${medalType} - ${eventTitle}`, createProps('textbox', {
        left: 155, top: 948, fontSize: 20, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 950
      }));

      // 5 Gold Rings
      const ringColor = '#ffd700';
      const r1 = new fabric.Circle(createProps('circle', { left: 1075, top: 893, radius: 9, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r2 = new fabric.Circle(createProps('circle', { left: 1095, top: 893, radius: 9, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r3 = new fabric.Circle(createProps('circle', { left: 1115, top: 893, radius: 9, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r4 = new fabric.Circle(createProps('circle', { left: 1085, top: 902, radius: 9, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r5 = new fabric.Circle(createProps('circle', { left: 1105, top: 902, radius: 9, stroke: ringColor, strokeWidth: 2, fill: '' }));

      objects.push(mainBar, nocTxt, flagTxt, nameTxt, subBar, medalBadge, subTxt, r1, r2, r3, r4, r5);
      break;
    }

    case 'advance-all-to-phase': {
      const eventName = (data.event || "WOMEN'S 200M BUTTERFLY").toUpperCase();
      const subTitle = (data.subTitle || "SEMI-FINALS ➔ FINAL").toUpperCase();

      const resultsList = Array.isArray(data.results) ? data.results : [
        { rank: "1", noc: "CHN", flag: "🇨🇳", athlete: "LIU ZIGE", time: "2:06.25" },
        { rank: "2", noc: "AUS", flag: "🇦🇺", athlete: "JESSICAH SCHIPPER", time: "2:06.34" },
        { rank: "3", noc: "CHN", flag: "🇨🇳", athlete: "JIAO LIUYANG", time: "2:06.78" },
        { rank: "4", noc: "POL", flag: "🇵🇱", athlete: "OTYLIA JEDRZEJCZAK", time: "2:06.96" },
        { rank: "4", noc: "JPN", flag: "🇯🇵", athlete: "YUKO NAKANISHI", time: "2:06.96" },
        { rank: "6", noc: "USA", flag: "🇺🇸", athlete: "KATHLEEN HERSEY", time: "2:07.73" },
        { rank: "7", noc: "FRA", flag: "🇫🇷", athlete: "AURORE MONGEL", time: "2:09.58" },
        { rank: "8", noc: "USA", flag: "🇺🇸", athlete: "ELAINE BREEDEN", time: "2:10.60" }
      ];

      // Header Bar
      const headBar = new fabric.Rect(createProps('rect', {
        left: 90, top: 580, width: 1120, height: 70, fill: '#003366', rx: 6, ry: 6,
        stroke: '#001938', strokeWidth: 2, skewX: -15
      }));
      const iconTxt = new fabric.Textbox("🏊", createProps('textbox', {
        left: 115, top: 587, fontSize: 26, fill: '#ffffff', width: 35
      }));
      const titleTxt = new fabric.Textbox(eventName, createProps('textbox', {
        left: 155, top: 586, fontSize: 28, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 680
      }));

      // Sub-Header Pill
      const pillBg = new fabric.Rect(createProps('rect', {
        left: 155, top: 618, width: 340, height: 24, fill: '#ffffff', rx: 4, ry: 4, skewX: -15
      }));
      const pillTxt = new fabric.Textbox(subTitle, createProps('textbox', {
        left: 165, top: 620, fontSize: 14, fontWeight: 'bold', fontStyle: 'italic', fill: '#002850', width: 320
      }));

      // 5 Gold Rings
      const ringColor = '#ffd700';
      const r1 = new fabric.Circle(createProps('circle', { left: 1095, top: 590, radius: 9, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r2 = new fabric.Circle(createProps('circle', { left: 1115, top: 590, radius: 9, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r3 = new fabric.Circle(createProps('circle', { left: 1135, top: 590, radius: 9, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r4 = new fabric.Circle(createProps('circle', { left: 1105, top: 599, radius: 9, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r5 = new fabric.Circle(createProps('circle', { left: 1125, top: 599, radius: 9, stroke: ringColor, strokeWidth: 2, fill: '' }));

      objects.push(headBar, iconTxt, titleTxt, pillBg, pillTxt, r1, r2, r3, r4, r5);

      // 8 Result Rows
      resultsList.slice(0, 8).forEach((r, idx) => {
        const y = 654 + idx * 42;
        const rowBar = new fabric.Rect(createProps('rect', {
          left: 90, top: y, width: 1120, height: 38, fill: '#001c3d', rx: 4, ry: 4,
          stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, skewX: -15
        }));
        const rBadge = new fabric.Rect(createProps('rect', {
          left: 105, top: y + 8, width: 24, height: 22, fill: '#dc2626', rx: 3, ry: 3, skewX: -15
        }));
        const rTxt = new fabric.Textbox(r.rank, createProps('textbox', {
          left: 105, top: y + 10, fontSize: 15, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 24, textAlign: 'center'
        }));
        const nocTxt = new fabric.Textbox(r.noc, createProps('textbox', {
          left: 140, top: y + 9, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 50
        }));
        const flagTxt = new fabric.Textbox(r.flag, createProps('textbox', {
          left: 195, top: y + 7, fontSize: 22, fill: '#ffffff', width: 40
        }));
        const nameTxt = new fabric.Textbox(r.athlete, createProps('textbox', {
          left: 245, top: y + 9, fontSize: 20, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 600
        }));
        const timeTxt = new fabric.Textbox(r.time, createProps('textbox', {
          left: 950, top: y + 8, fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 140, textAlign: 'right'
        }));

        objects.push(rowBar, rBadge, rTxt, nocTxt, flagTxt, nameTxt, timeTxt);
      });
      break;
    }

    case 'event-results-full': {
      const eventName = (data.event || "WOMEN'S 200M BUTTERFLY").toUpperCase();
      const subTitle = (data.subTitle || "RESULT - SEMI-FINAL 2").toUpperCase();

      const resultsList = Array.isArray(data.results) ? data.results : [
        { rank: "1", noc: "CHN", flag: "🇨🇳", athlete: "LIU ZIGE", time: "2:06.25" },
        { rank: "2", noc: "AUS", flag: "🇦🇺", athlete: "JESSICAH SCHIPPER", time: "2:06.34" },
        { rank: "3", noc: "POL", flag: "🇵🇱", athlete: "OTYLIA JEDRZEJCZAK", time: "2:06.78" },
        { rank: "4", noc: "JPN", flag: "🇯🇵", athlete: "YUKO NAKANISHI", time: "2:06.96" },
        { rank: "4", noc: "USA", flag: "🇺🇸", athlete: "KATHLEEN HERSEY", time: "2:06.96" },
        { rank: "6", noc: "USA", flag: "🇺🇸", athlete: "ELAINE BREEDEN", time: "2:07.73" },
        { rank: "7", noc: "AUS", flag: "🇦🇺", athlete: "SAMANTHA HAMILL", time: "2:09.58" },
        { rank: "8", noc: "GBR", flag: "🇬🇧", athlete: "ELLEN GANDY", time: "2:10.60" }
      ];

      // Header Bar
      const headBar = new fabric.Rect(createProps('rect', {
        left: 90, top: 580, width: 1120, height: 70, fill: '#003366', rx: 6, ry: 6,
        stroke: '#001938', strokeWidth: 2, skewX: -15
      }));
      const iconTxt = new fabric.Textbox("🏊", createProps('textbox', {
        left: 115, top: 587, fontSize: 26, fill: '#ffffff', width: 35
      }));
      const titleTxt = new fabric.Textbox(eventName, createProps('textbox', {
        left: 155, top: 586, fontSize: 28, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 680
      }));

      // Sub-Header Pill
      const pillBg = new fabric.Rect(createProps('rect', {
        left: 155, top: 618, width: 340, height: 24, fill: '#ffffff', rx: 4, ry: 4, skewX: -15
      }));
      const pillTxt = new fabric.Textbox(subTitle, createProps('textbox', {
        left: 165, top: 620, fontSize: 14, fontWeight: 'bold', fontStyle: 'italic', fill: '#002850', width: 320
      }));

      // 5 Gold Rings
      const ringColor = '#ffd700';
      const r1 = new fabric.Circle(createProps('circle', { left: 1095, top: 590, radius: 9, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r2 = new fabric.Circle(createProps('circle', { left: 1115, top: 590, radius: 9, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r3 = new fabric.Circle(createProps('circle', { left: 1135, top: 590, radius: 9, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r4 = new fabric.Circle(createProps('circle', { left: 1105, top: 599, radius: 9, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r5 = new fabric.Circle(createProps('circle', { left: 1125, top: 599, radius: 9, stroke: ringColor, strokeWidth: 2, fill: '' }));

      objects.push(headBar, iconTxt, titleTxt, pillBg, pillTxt, r1, r2, r3, r4, r5);

      // 8 Result Rows
      resultsList.slice(0, 8).forEach((r, idx) => {
        const y = 654 + idx * 42;
        const rowBar = new fabric.Rect(createProps('rect', {
          left: 90, top: y, width: 1120, height: 38, fill: '#001c3d', rx: 4, ry: 4,
          stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, skewX: -15
        }));
        const rBadge = new fabric.Rect(createProps('rect', {
          left: 105, top: y + 8, width: 24, height: 22, fill: '#dc2626', rx: 3, ry: 3, skewX: -15
        }));
        const rTxt = new fabric.Textbox(r.rank, createProps('textbox', {
          left: 105, top: y + 10, fontSize: 15, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 24, textAlign: 'center'
        }));
        const nocTxt = new fabric.Textbox(r.noc, createProps('textbox', {
          left: 140, top: y + 9, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 50
        }));
        const flagTxt = new fabric.Textbox(r.flag, createProps('textbox', {
          left: 195, top: y + 7, fontSize: 22, fill: '#ffffff', width: 40
        }));
        const nameTxt = new fabric.Textbox(r.athlete, createProps('textbox', {
          left: 245, top: y + 9, fontSize: 20, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 600
        }));
        const timeTxt = new fabric.Textbox(r.time, createProps('textbox', {
          left: 950, top: y + 8, fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 140, textAlign: 'right'
        }));

        objects.push(rowBar, rBadge, rTxt, nocTxt, flagTxt, nameTxt, timeTxt);
      });
      break;
    }

    case 'winner-place-id': {
      const sportName = (sportTitle || "SWIMMING").toUpperCase();
      const headerLabel = (data.headerLabel || "WINNER - MEN'S 4X200M FREESTYLE RELAY").toUpperCase();
      const countryCode = (data.country || "USA").toUpperCase();
      const flagStr = data.flag || "🇺🇸";
      const winnerName = (data.winnerName || data.countryName || data.athlete || "UNITED STATES").toUpperCase();
      const badgeText = data.badge || "WR";
      const timeStr = data.time || "6:58.56";

      // Header Bar
      const headBar = new fabric.Rect(createProps('rect', {
        left: 90, top: 670, width: 1100, height: 75, fill: '#003366', rx: 6, ry: 6,
        stroke: '#001938', strokeWidth: 2, skewX: -15
      }));
      const iconTxt = new fabric.Textbox("🏊", createProps('textbox', {
        left: 115, top: 678, fontSize: 28, fill: '#ffffff', width: 40
      }));
      const titleTxt = new fabric.Textbox(sportName, createProps('textbox', {
        left: 160, top: 677, fontSize: 30, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 650
      }));

      // Sub-Header Pill
      const pillBg = new fabric.Rect(createProps('rect', {
        left: 160, top: 712, width: 480, height: 26, fill: '#ffffff', rx: 4, ry: 4, skewX: -15
      }));
      const pillTxt = new fabric.Textbox(headerLabel, createProps('textbox', {
        left: 170, top: 715, fontSize: 16, fontWeight: 'bold', fontStyle: 'italic', fill: '#002850', width: 460
      }));

      // 5 Gold Rings
      const ringColor = '#ffd700';
      const r1 = new fabric.Circle(createProps('circle', { left: 1075, top: 683, radius: 9, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r2 = new fabric.Circle(createProps('circle', { left: 1095, top: 683, radius: 9, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r3 = new fabric.Circle(createProps('circle', { left: 1115, top: 683, radius: 9, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r4 = new fabric.Circle(createProps('circle', { left: 1085, top: 692, radius: 9, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r5 = new fabric.Circle(createProps('circle', { left: 1105, top: 692, radius: 9, stroke: ringColor, strokeWidth: 2, fill: '' }));

      // Winner Row
      const rowBar = new fabric.Rect(createProps('rect', {
        left: 90, top: 752, width: 1100, height: 48, fill: '#001c3d', rx: 4, ry: 4,
        stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, skewX: -15
      }));
      const nocTxt = new fabric.Textbox(countryCode, createProps('textbox', {
        left: 110, top: 762, fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 50
      }));
      const flagTxt = new fabric.Textbox(flagStr, createProps('textbox', {
        left: 165, top: 760, fontSize: 26, fill: '#ffffff', width: 45
      }));
      const nameTxt = new fabric.Textbox(winnerName, createProps('textbox', {
        left: 220, top: 762, fontSize: 24, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 550
      }));

      // Badge
      const badgeBg = new fabric.Rect(createProps('rect', {
        left: 840, top: 763, width: 45, height: 24, fill: '#ffd700', rx: 12, ry: 12, skewX: -15
      }));
      const badgeTxt = new fabric.Textbox(badgeText, createProps('textbox', {
        left: 840, top: 766, fontSize: 13, fontWeight: 'bold', fontStyle: 'italic', fill: '#000000', width: 45, textAlign: 'center'
      }));

      const timeTxt = new fabric.Textbox(timeStr, createProps('textbox', {
        left: 900, top: 761, fontSize: 26, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 140, textAlign: 'right'
      }));

      objects.push(headBar, iconTxt, titleTxt, pillBg, pillTxt, r1, r2, r3, r4, r5, rowBar, nocTxt, flagTxt, nameTxt, badgeBg, badgeTxt, timeTxt);
      break;
    }

    case 'lane-indicator': {
      const laneText = `LANE ${data.lane || "1"}`;

      const pillBg = new fabric.Rect(createProps('rect', {
        left: 90, top: 70, width: 220, height: 50, fill: '#dbeafe', rx: 20, ry: 20,
        stroke: '#0f172a', strokeWidth: 2, skewX: -14
      }));
      const mainText = new fabric.Textbox(laneText, createProps('textbox', {
        left: 100, top: 82, fontSize: 24, fontWeight: 'bold', fontStyle: 'italic', fill: '#031b4e', width: 200, textAlign: 'center'
      }));

      objects.push(pillBg, mainText);
      break;
    }

    case 'event-records': {
      const sportName = (sportTitle || "SWIMMING").toUpperCase();
      const eventName = (data.event || "WOMEN'S 200M BUTTERFLY").toUpperCase();

      const wrRow = { noc: "AUS", flag: "🇦🇺", athlete: "JESSICAH SCHIPPER", year: "2006", badge: "WR", time: "2:05.40" };
      const orRow = { noc: "USA", flag: "🇺🇸", athlete: "MISTY HYMAN", year: "2000", badge: "OR", time: "2:05.88" };

      // Header Bar
      const headBar = new fabric.Rect(createProps('rect', {
        left: 90, top: 670, width: 1100, height: 75, fill: '#003366', rx: 6, ry: 6,
        stroke: '#001938', strokeWidth: 2, skewX: -15
      }));
      const iconTxt = new fabric.Textbox("🏊", createProps('textbox', {
        left: 115, top: 678, fontSize: 28, fill: '#ffffff', width: 40
      }));
      const titleTxt = new fabric.Textbox(sportName, createProps('textbox', {
        left: 160, top: 677, fontSize: 30, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 650
      }));

      // Sub-Header Pill
      const pillBg = new fabric.Rect(createProps('rect', {
        left: 160, top: 712, width: 380, height: 26, fill: '#ffffff', rx: 4, ry: 4, skewX: -15
      }));
      const pillTxt = new fabric.Textbox(eventName, createProps('textbox', {
        left: 170, top: 715, fontSize: 16, fontWeight: 'bold', fontStyle: 'italic', fill: '#002850', width: 360
      }));

      // 5 Gold Rings
      const ringColor = '#ffd700';
      const r1 = new fabric.Circle(createProps('circle', { left: 1075, top: 683, radius: 9, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r2 = new fabric.Circle(createProps('circle', { left: 1095, top: 683, radius: 9, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r3 = new fabric.Circle(createProps('circle', { left: 1115, top: 683, radius: 9, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r4 = new fabric.Circle(createProps('circle', { left: 1085, top: 692, radius: 9, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r5 = new fabric.Circle(createProps('circle', { left: 1105, top: 692, radius: 9, stroke: ringColor, strokeWidth: 2, fill: '' }));

      objects.push(headBar, iconTxt, titleTxt, pillBg, pillTxt, r1, r2, r3, r4, r5);

      // Record Rows (WR & OR)
      [wrRow, orRow].forEach((rec, idx) => {
        const y = 752 + idx * 48;
        const rowBar = new fabric.Rect(createProps('rect', {
          left: 90, top: y, width: 1100, height: 44, fill: '#001c3d', rx: 4, ry: 4,
          stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, skewX: -15
        }));
        const nocTxt = new fabric.Textbox(rec.noc, createProps('textbox', {
          left: 110, top: y + 10, fontSize: 20, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 50
        }));
        const flagTxt = new fabric.Textbox(rec.flag, createProps('textbox', {
          left: 165, top: y + 8, fontSize: 24, fill: '#ffffff', width: 40
        }));
        const nameTxt = new fabric.Textbox(rec.athlete, createProps('textbox', {
          left: 215, top: y + 10, fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 500
        }));
        const yearTxt = new fabric.Textbox(rec.year, createProps('textbox', {
          left: 770, top: y + 10, fontSize: 20, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 60
        }));

        // Badge
        const badgeBg = new fabric.Rect(createProps('rect', {
          left: 840, top: y + 10, width: 45, height: 24, fill: rec.badge === 'WR' ? '#ffd700' : '#e2e8f0', rx: 12, ry: 12, skewX: -15
        }));
        const badgeTxt = new fabric.Textbox(rec.badge, createProps('textbox', {
          left: 840, top: y + 13, fontSize: 13, fontWeight: 'bold', fontStyle: 'italic', fill: '#000000', width: 45, textAlign: 'center'
        }));

        const timeTxt = new fabric.Textbox(rec.time, createProps('textbox', {
          left: 900, top: y + 9, fontSize: 24, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 140, textAlign: 'right'
        }));

        objects.push(rowBar, nocTxt, flagTxt, nameTxt, yearTxt, badgeBg, badgeTxt, timeTxt);
      });
      break;
    }

    case 'team-list-by-lane': {
      const laneNum = String(data.lane || "5");
      const countryCode = (data.country || "AUS").toUpperCase();
      const flagStr = data.flag || "🇦🇺";
      const teamName = (data.teamName || data.countryName || "AUSTRALIA").toUpperCase();
      const members = Array.isArray(data.members) ? data.members : ["NICK FFROST", "GRANT BRITS", "KIRK PALMER", "LEITH BRODIE"];

      // Header Bar
      const headBar = new fabric.Rect(createProps('rect', {
        left: 90, top: 680, width: 1100, height: 52, fill: '#003366', rx: 6, ry: 6,
        stroke: '#001938', strokeWidth: 2, skewX: -15
      }));
      const laneTxt = new fabric.Textbox(laneNum, createProps('textbox', {
        left: 110, top: 693, fontSize: 24, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 30
      }));
      const nocTxt = new fabric.Textbox(countryCode, createProps('textbox', {
        left: 145, top: 693, fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 60
      }));
      const flagTxt = new fabric.Textbox(flagStr, createProps('textbox', {
        left: 215, top: 690, fontSize: 26, fill: '#ffffff', width: 45
      }));
      const nameTxt = new fabric.Textbox(teamName, createProps('textbox', {
        left: 270, top: 691, fontSize: 28, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 750
      }));

      // 5 Gold Rings
      const ringColor = '#ffd700';
      const r1 = new fabric.Circle(createProps('circle', { left: 1075, top: 693, radius: 9, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r2 = new fabric.Circle(createProps('circle', { left: 1095, top: 693, radius: 9, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r3 = new fabric.Circle(createProps('circle', { left: 1115, top: 693, radius: 9, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r4 = new fabric.Circle(createProps('circle', { left: 1085, top: 702, radius: 9, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r5 = new fabric.Circle(createProps('circle', { left: 1105, top: 702, radius: 9, stroke: ringColor, strokeWidth: 2, fill: '' }));

      objects.push(headBar, laneTxt, nocTxt, flagTxt, nameTxt, r1, r2, r3, r4, r5);

      // Member Rows
      members.slice(0, 4).forEach((m, idx) => {
        const y = 738 + idx * 46;
        const rowBar = new fabric.Rect(createProps('rect', {
          left: 90, top: y, width: 1100, height: 42, fill: '#001c3d', rx: 4, ry: 4,
          stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, skewX: -15
        }));
        const memTxt = new fabric.Textbox(m.toUpperCase(), createProps('textbox', {
          left: 120, top: y + 10, fontSize: 20, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 900
        }));
        objects.push(rowBar, memTxt);
      });
      break;
    }

    case 'lane-id': {
      const laneNum = String(data.lane || "4");
      const countryCode = (data.country || "POL").toUpperCase();
      const flagStr = data.flag || "🇵🇱";
      const athleteName = (data.athlete || "OTYLIA JEDRZEJCZAK").toUpperCase();

      const mainBar = new fabric.Rect(createProps('rect', {
        left: 90, top: 880, width: 1100, height: 56, fill: '#003366', rx: 6, ry: 6,
        stroke: '#001938', strokeWidth: 2, skewX: -15
      }));
      const laneTxt = new fabric.Textbox(laneNum, createProps('textbox', {
        left: 110, top: 894, fontSize: 24, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 30
      }));
      const nocTxt = new fabric.Textbox(countryCode, createProps('textbox', {
        left: 145, top: 894, fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 60
      }));
      const flagTxt = new fabric.Textbox(flagStr, createProps('textbox', {
        left: 215, top: 891, fontSize: 26, fill: '#ffffff', width: 45
      }));
      const nameTxt = new fabric.Textbox(athleteName, createProps('textbox', {
        left: 270, top: 892, fontSize: 28, fontWeight: 'bold', fontStyle: 'italic', fill: '#ffffff', width: 750
      }));

      // 5 Gold Olympic Rings for Fabric Canvas
      const ringColor = '#ffd700';
      const r1 = new fabric.Circle(createProps('circle', { left: 1075, top: 893, radius: 9, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r2 = new fabric.Circle(createProps('circle', { left: 1095, top: 893, radius: 9, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r3 = new fabric.Circle(createProps('circle', { left: 1115, top: 893, radius: 9, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r4 = new fabric.Circle(createProps('circle', { left: 1085, top: 902, radius: 9, stroke: ringColor, strokeWidth: 2, fill: '' }));
      const r5 = new fabric.Circle(createProps('circle', { left: 1105, top: 902, radius: 9, stroke: ringColor, strokeWidth: 2, fill: '' }));

      objects.push(mainBar, laneTxt, nocTxt, flagTxt, nameTxt, r1, r2, r3, r4, r5);
      break;
    }

    case 'non-comp-area': {
      const areaName = (data.areaName || "WARM UP POOL").toUpperCase();

      const pillBg = new fabric.Rect(createProps('rect', {
        left: 90, top: 70, width: 340, height: 50, fill: '#dbeafe', rx: 20, ry: 20,
        stroke: '#0f172a', strokeWidth: 2, skewX: -14
      }));
      const mainText = new fabric.Textbox(areaName, createProps('textbox', {
        left: 110, top: 82, fontSize: 24, fontWeight: 'bold', fontStyle: 'italic', fill: '#031b4e', width: 300, textAlign: 'center'
      }));

      objects.push(pillBg, mainText);
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
