import React, { useState, useRef } from 'react';
import * as fabric from 'fabric';
import { useSelector } from 'react-redux';
import { generateUniqueId } from './common';
import { FaPlus, FaPalette } from "react-icons/fa";

const Strips = () => {
    const canvas = useSelector(state => state.canvasReducer.canvas);

    const [primaryColor, setPrimaryColor] = useState('#00d2ff');
    const [secondaryColor, setSecondaryColor] = useState('#ff007f');
    const [bgColor, setBgColor] = useState('#0f172a');
    const [textColor, setTextColor] = useState('#ffffff');
    const [accentColor, setAccentColor] = useState('#facc15');

    const activeLineModeRef = useRef('2-liner');

    const transformToOneLiner = (objects) => {
        let items = [...objects];

        // 1. Filter elements explicitly marked as subline
        items = items.filter(obj => !obj.isSubLine);

        // Helper to identify text objects
        const isText = (o) => o && (o.text !== undefined || o.type === 'i-text' || o.type === 'text' || o.type === 'textbox');
        const textObjs = items.filter(isText);

        // 2. Filter secondary subtitle/slug text if 2+ text items exist
        if (textObjs.length >= 2) {
            // Find main headline (highest font size)
            let mainHeadline = textObjs[0];
            let maxFontSize = 0;
            textObjs.forEach(t => {
                const size = t.fontSize || 20;
                if (size > maxFontSize) {
                    maxFontSize = size;
                    mainHeadline = t;
                }
            });

            items = items.filter(obj => {
                if (!isText(obj)) return true;
                if (obj === mainHeadline) return true;
                // Keep short left badges (e.g., '24', 'LIVE', 'F1', icons) that are on the same level or above
                if (obj.text && obj.text.length <= 4 && (obj.top || 0) <= (mainHeadline.top || 900) + 10) {
                    return true;
                }
                // Filter out any text placed below the main headline (subtitles, slugs, roles)
                if ((obj.top || 0) > (mainHeadline.top || 880) + 15) {
                    return false;
                }
                return false;
            });
        }

        // 3. Find primary background plate
        let mainPlate = null;
        let maxArea = 0;
        items.forEach(o => {
            const w = o.width || 100;
            const h = o.height || 50;
            const area = w * h;
            if (area > maxArea && (o.type === 'rect' || o.type === 'polygon' || o.type === 'path')) {
                maxArea = area;
                mainPlate = o;
            }
        });

        if (mainPlate) {
            // Filter out secondary bottom slug plates/ribbons below the main plate
            const mainBottom = (mainPlate.top || 870) + (mainPlate.height || 60);
            items = items.filter(o => {
                if (isText(o) || o === mainPlate) return true;
                if (o.top && o.top >= mainBottom - 12 && (o.height || 0) <= 55) {
                    return false;
                }
                return true;
            });

            // If it was a dual-tier top box (top < 850), shift down to lower-third standard position
            if (mainPlate.top && mainPlate.top < 850) {
                const shiftY = 880 - mainPlate.top;
                items.forEach(o => {
                    if (o.top !== undefined) {
                        o.set({ top: o.top + shiftY });
                    }
                });
            }

            // If mainPlate is a tall 2-line rectangle (height >= 85), compact to 65px and center text
            if (mainPlate.type === 'rect' && mainPlate.height && mainPlate.height >= 85) {
                const oldHeight = mainPlate.height;
                const newHeight = 65;
                const diff = oldHeight - newHeight;
                const newTop = (mainPlate.top || 870) + diff / 2;

                items.forEach(o => {
                    if (o.oneLinerProps) {
                        o.set(o.oneLinerProps);
                    } else if (o.type === 'rect' && o.height && o.height >= 85) {
                        o.set({ height: newHeight, top: newTop });
                    } else if (isText(o)) {
                        // Center headline vertically in the compacted plate
                        o.set({ top: newTop + (newHeight - (o.fontSize || 36)) / 2 - 2 });
                    }
                });
            }
        }

        return items;
    };

    const addGroupToCanvas = (objects, explicitLineMode) => {
        if (!canvas || !objects || objects.length === 0) return;

        const lineMode = explicitLineMode || activeLineModeRef.current || '2-liner';
        let itemsToAdd = objects;

        if (lineMode === '1-liner') {
            itemsToAdd = transformToOneLiner(objects);
        }

        itemsToAdd.forEach(obj => {
            const id = generateUniqueId(obj);
            obj.set({ id, class: id, objectCaching: false });
            canvas.add(obj);
        });

        const sel = new fabric.ActiveSelection(itemsToAdd, { canvas });
        canvas.setActiveObject(sel);
        canvas.requestRenderAll();
    };

    // 1. Classic Broadcast Lower Third
    const addClassicLowerThird = () => {
        const bg = new fabric.Rect({
            left: 100,
            top: 870,
            width: 1200,
            height: 110,
            fill: bgColor,
            rx: 6,
            ry: 6,
            stroke: 'rgba(255,255,255,0.15)',
            strokeWidth: 1.5,
        });

        const accentBar = new fabric.Rect({
            left: 100,
            top: 870,
            width: 18,
            height: 110,
            fill: primaryColor,
            rx: 3,
            ry: 3,
        });

        const topHighlight = new fabric.Rect({
            left: 118,
            top: 870,
            width: 1182,
            height: 4,
            fill: secondaryColor,
        });

        const titleText = new fabric.IText('NEWS HEADLINE OR PERSON NAME', {
            left: 140,
            top: 885,
            fontSize: 38,
            fontWeight: 'bold',
            fill: textColor,
            fontFamily: 'Cuprum, sans-serif',
        });

        const subText = new fabric.IText('Designation, Role or Location slug text goes here', {
            left: 142,
            top: 935,
            fontSize: 22,
            fontWeight: 'normal',
            fill: accentColor,
            fontFamily: 'Cuprum, sans-serif',
        });

        addGroupToCanvas([bg, accentBar, topHighlight, titleText, subText]);
    };

    // 2. Dual Tier Split Lower Third
    const addDualTierLowerThird = () => {
        // Top Name Box
        const nameBg = new fabric.Rect({
            left: 120,
            top: 820,
            width: 650,
            height: 65,
            fill: primaryColor,
            rx: 4,
            ry: 4,
        });

        const nameText = new fabric.IText('VIMLESH KUMAR', {
            left: 145,
            top: 832,
            fontSize: 34,
            fontWeight: 'bold',
            fill: '#0f172a',
            fontFamily: 'Cuprum, sans-serif',
        });

        // Bottom Slug Box
        const slugBg = new fabric.Rect({
            left: 120,
            top: 888,
            width: 950,
            height: 55,
            fill: bgColor,
            rx: 4,
            ry: 4,
            stroke: secondaryColor,
            strokeWidth: 2,
        });

        const slugText = new fabric.IText('Senior Broadcast Graphics Engineer | New Delhi', {
            left: 145,
            top: 900,
            fontSize: 24,
            fill: textColor,
            fontFamily: 'Cuprum, sans-serif',
        });

        addGroupToCanvas([nameBg, nameText, slugBg, slugText]);
    };

    // 3. Breaking News Full-Width Bottom Ticker Strip
    const addBreakingNewsTicker = () => {
        const fullBar = new fabric.Rect({
            left: 0,
            top: 980,
            width: 1920,
            height: 100,
            fill: bgColor,
        });

        const topStripe = new fabric.Rect({
            left: 0,
            top: 980,
            width: 1920,
            height: 5,
            fill: secondaryColor,
        });

        const badgeBg = new fabric.Rect({
            left: 0,
            top: 980,
            width: 340,
            height: 100,
            fill: '#dc2626',
        });

        const badgeText = new fabric.IText('⚡ BREAKING NEWS', {
            left: 30,
            top: 1012,
            fontSize: 32,
            fontWeight: 'bold',
            fill: '#ffffff',
            fontFamily: 'Cuprum, sans-serif',
        });

        const tickerText = new fabric.IText('LATEST UPDATES: Broadcast graphics client successfully running live playout on CasparCG channels...', {
            left: 380,
            top: 1014,
            fontSize: 28,
            fill: textColor,
            fontFamily: 'Cuprum, sans-serif',
        });

        addGroupToCanvas([fullBar, topStripe, badgeBg, badgeText, tickerText]);
    };

    // 4. Header / Top Program Bar Strip
    const addTopHeaderStrip = () => {
        const barBg = new fabric.Rect({
            left: 0,
            top: 0,
            width: 1920,
            height: 70,
            fill: bgColor,
        });

        const bottomAccent = new fabric.Rect({
            left: 0,
            top: 66,
            width: 1920,
            height: 4,
            fill: primaryColor,
        });

        const liveBadge = new fabric.Rect({
            left: 40,
            top: 15,
            width: 110,
            height: 40,
            fill: '#ef4444',
            rx: 4,
            ry: 4,
        });

        const liveText = new fabric.IText('● LIVE', {
            left: 62,
            top: 22,
            fontSize: 22,
            fontWeight: 'bold',
            fill: '#ffffff',
            fontFamily: 'Cuprum, sans-serif',
        });

        const titleText = new fabric.IText('SPECIAL BROADCAST REPORT | LIVE ELECTION HEADQUARTERS', {
            left: 175,
            top: 20,
            fontSize: 26,
            fontWeight: 'bold',
            fill: textColor,
            fontFamily: 'Cuprum, sans-serif',
        });

        addGroupToCanvas([barBg, bottomAccent, liveBadge, liveText, titleText]);
    };

    // 5. Angled Modern Cyber Parallelogram Strip
    const addAngledCyberStrip = () => {
        const mainPoly = new fabric.Polygon([
            { x: 100, y: 880 },
            { x: 1300, y: 880 },
            { x: 1240, y: 990 },
            { x: 40, y: 990 }
        ], {
            fill: bgColor,
            stroke: primaryColor,
            strokeWidth: 2,
        });

        const leftAccentPoly = new fabric.Polygon([
            { x: 40, y: 990 },
            { x: 100, y: 880 },
            { x: 140, y: 880 },
            { x: 80, y: 990 }
        ], {
            fill: secondaryColor,
        });

        const text1 = new fabric.IText('CYBER BROADCAST GRAPHICS', {
            left: 160,
            top: 895,
            fontSize: 36,
            fontWeight: 'bold',
            fill: textColor,
            fontFamily: 'Cuprum, sans-serif',
        });

        const text2 = new fabric.IText('REAL-TIME HARDWARE ACCELERATED PLAYOUT', {
            left: 162,
            top: 945,
            fontSize: 22,
            fill: primaryColor,
            fontFamily: 'Cuprum, sans-serif',
        });

        addGroupToCanvas([mainPoly, leftAccentPoly, text1, text2]);
    };

    // 6. Glassmorphic Floating Pill Strip
    const addGlassmorphicPill = () => {
        const pillBg = new fabric.Rect({
            left: 200,
            top: 880,
            width: 1050,
            height: 95,
            fill: 'rgba(30, 41, 59, 0.85)',
            rx: 48,
            ry: 48,
            stroke: 'rgba(255, 255, 255, 0.3)',
            strokeWidth: 2,
        });

        const iconCircle = new fabric.Circle({
            left: 215,
            top: 893,
            radius: 35,
            fill: primaryColor,
        });

        const iconText = new fabric.IText('★', {
            left: 236,
            top: 902,
            fontSize: 40,
            fill: '#0f172a',
        });

        const textTitle = new fabric.IText('EXCLUSIVE INTERVIEW', {
            left: 310,
            top: 898,
            fontSize: 32,
            fontWeight: 'bold',
            fill: textColor,
            fontFamily: 'Cuprum, sans-serif',
        });

        const textSub = new fabric.IText('Live from the Studio Floor with Guest Speakers', {
            left: 312,
            top: 938,
            fontSize: 20,
            fill: '#94a3b8',
            fontFamily: 'Cuprum, sans-serif',
        });

        addGroupToCanvas([pillBg, iconCircle, iconText, textTitle, textSub]);
    };

    // 7. Sports Match Score Bar Strip
    const addSportsScoreStrip = () => {
        const bg = new fabric.Rect({
            left: 460,
            top: 50,
            width: 1000,
            height: 80,
            fill: bgColor,
            rx: 8,
            ry: 8,
            stroke: 'rgba(255,255,255,0.2)',
            strokeWidth: 1.5,
        });

        const team1Bg = new fabric.Rect({
            left: 460,
            top: 50,
            width: 320,
            height: 80,
            fill: '#1e40af',
            rx: 8,
            ry: 8,
        });

        const team1Text = new fabric.IText('INDIA', {
            left: 540,
            top: 72,
            fontSize: 32,
            fontWeight: 'bold',
            fill: '#ffffff',
            fontFamily: 'Cuprum, sans-serif',
        });

        const score1Text = new fabric.IText('248/3', {
            left: 690,
            top: 72,
            fontSize: 32,
            fontWeight: 'bold',
            fill: '#facc15',
            fontFamily: 'Cuprum, sans-serif',
        });

        const vsText = new fabric.IText('VS', {
            left: 940,
            top: 75,
            fontSize: 26,
            fontWeight: 'bold',
            fill: '#94a3b8',
            fontFamily: 'Cuprum, sans-serif',
        });

        const team2Bg = new fabric.Rect({
            left: 1140,
            top: 50,
            width: 320,
            height: 80,
            fill: '#065f46',
            rx: 8,
            ry: 8,
        });

        const score2Text = new fabric.IText('180/6', {
            left: 1160,
            top: 72,
            fontSize: 32,
            fontWeight: 'bold',
            fill: '#facc15',
            fontFamily: 'Cuprum, sans-serif',
        });

        const team2Text = new fabric.IText('AUSTRALIA', {
            left: 1280,
            top: 72,
            fontSize: 32,
            fontWeight: 'bold',
            fill: '#ffffff',
            fontFamily: 'Cuprum, sans-serif',
        });

        addGroupToCanvas([bg, team1Bg, team1Text, score1Text, vsText, team2Bg, score2Text, team2Text]);
    };

    // 8. Minimalist Dual-Line Neon Border Strip
    const addMinimalistNeonStrip = () => {
        const bg = new fabric.Rect({
            left: 100,
            top: 890,
            width: 1400,
            height: 90,
            fill: 'rgba(10, 15, 30, 0.75)',
        });

        const topBorder = new fabric.Rect({
            left: 100,
            top: 890,
            width: 1400,
            height: 3,
            fill: primaryColor,
        });

        const botBorder = new fabric.Rect({
            left: 100,
            top: 977,
            width: 1400,
            height: 3,
            fill: secondaryColor,
        });

        const titleText = new fabric.IText('MINIMALIST NEON STRIP', {
            left: 130,
            top: 905,
            fontSize: 36,
            fontWeight: 'bold',
            fill: textColor,
            fontFamily: 'Cuprum, sans-serif',
        });

        const subText = new fabric.IText('Ultra clean high-contrast lower third framing', {
            left: 132,
            top: 948,
            fontSize: 20,
            fill: '#38bdf8',
            fontFamily: 'Cuprum, sans-serif',
        });

        addGroupToCanvas([bg, topBorder, botBorder, titleText, subText]);
    };

    // 9. Red Alert Hazard / Emergency Notice Strip
    const addAlertHazardStrip = () => {
        const bg = new fabric.Rect({
            left: 100,
            top: 860,
            width: 1300,
            height: 120,
            fill: '#7f1d1d',
            rx: 6,
            ry: 6,
            stroke: '#ef4444',
            strokeWidth: 2,
        });

        const cautionTag = new fabric.Rect({
            left: 100,
            top: 860,
            width: 180,
            height: 120,
            fill: '#dc2626',
            rx: 6,
            ry: 6,
        });

        const cautionIcon = new fabric.IText('⚠️\nALERT', {
            left: 145,
            top: 885,
            fontSize: 28,
            fontWeight: 'bold',
            fill: '#ffffff',
            textAlign: 'center',
            fontFamily: 'Cuprum, sans-serif',
        });

        const titleText = new fabric.IText('HIGH PRIORITY / EMERGENCY ADVISORY', {
            left: 305,
            top: 882,
            fontSize: 36,
            fontWeight: 'bold',
            fill: '#fef08a',
            fontFamily: 'Cuprum, sans-serif',
        });

        const descText = new fabric.IText('Severe weather conditions and public traffic updates for metropolitan regions', {
            left: 308,
            top: 935,
            fontSize: 22,
            fill: '#ffffff',
            fontFamily: 'Cuprum, sans-serif',
        });

        addGroupToCanvas([bg, cautionTag, cautionIcon, titleText, descText]);
    };

    // 10. Election Poll Comparison Bar Strip
    const addElectionPollStrip = () => {
        const bg = new fabric.Rect({
            left: 150,
            top: 870,
            width: 1100,
            height: 110,
            fill: bgColor,
            rx: 8,
            ry: 8,
            stroke: 'rgba(255,255,255,0.2)',
            strokeWidth: 1.5,
        });

        const party1Bar = new fabric.Rect({
            left: 170,
            top: 935,
            width: 480,
            height: 28,
            fill: '#f97316',
            rx: 4,
            ry: 4,
        });

        const party2Bar = new fabric.Rect({
            left: 670,
            top: 935,
            width: 380,
            height: 28,
            fill: '#3b82f6',
            rx: 4,
            ry: 4,
        });

        const party1Label = new fabric.IText('PARTY A: 54.2%', {
            left: 170,
            top: 890,
            fontSize: 30,
            fontWeight: 'bold',
            fill: '#f97316',
            fontFamily: 'Cuprum, sans-serif',
        });

        const party2Label = new fabric.IText('PARTY B: 42.8%', {
            left: 670,
            top: 890,
            fontSize: 30,
            fontWeight: 'bold',
            fill: '#3b82f6',
            fontFamily: 'Cuprum, sans-serif',
        });

        const vsBadge = new fabric.IText('VS', {
            left: 580,
            top: 895,
            fontSize: 22,
            fontWeight: 'bold',
            fill: '#94a3b8',
            fontFamily: 'Cuprum, sans-serif',
        });

        addGroupToCanvas([bg, party1Bar, party2Bar, party1Label, party2Label, vsBadge]);
    };

    // 11. Quote & Speaker Attribution Strip
    const addQuoteSpeakerStrip = () => {
        const bg = new fabric.Rect({
            left: 120,
            top: 840,
            width: 1250,
            height: 140,
            fill: 'rgba(15, 23, 42, 0.92)',
            rx: 8,
            ry: 8,
            stroke: primaryColor,
            strokeWidth: 2,
        });

        const quoteIcon = new fabric.IText('“', {
            left: 145,
            top: 830,
            fontSize: 85,
            fontWeight: 'bold',
            fill: secondaryColor,
            fontFamily: 'Georgia, serif',
        });

        const quoteText = new fabric.IText('"We are committed to delivering the fastest, most reliable live broadcast services."', {
            left: 210,
            top: 865,
            fontSize: 26,
            fontStyle: 'italic',
            fill: textColor,
            fontFamily: 'Cuprum, sans-serif',
        });

        const authorText = new fabric.IText('— SPOKESPERSON NAME | Official Press Briefing', {
            left: 212,
            top: 925,
            fontSize: 22,
            fontWeight: 'bold',
            fill: accentColor,
            fontFamily: 'Cuprum, sans-serif',
        });

        addGroupToCanvas([bg, quoteIcon, quoteText, authorText]);
    };

    // 12. Social Media Handle & Tag Strip
    const addSocialMediaStrip = () => {
        const bg = new fabric.Rect({
            left: 100,
            top: 900,
            width: 900,
            height: 75,
            fill: bgColor,
            rx: 38,
            ry: 38,
            stroke: 'rgba(255,255,255,0.25)',
            strokeWidth: 1.5,
        });

        const badgeIcon = new fabric.Circle({
            left: 110,
            top: 908,
            radius: 29,
            fill: primaryColor,
        });

        const iconSymbol = new fabric.IText('@', {
            left: 124,
            top: 915,
            fontSize: 34,
            fontWeight: 'bold',
            fill: '#0f172a',
        });

        const handleText = new fabric.IText('@ReactCasparPlayout', {
            left: 185,
            top: 914,
            fontSize: 30,
            fontWeight: 'bold',
            fill: textColor,
            fontFamily: 'Cuprum, sans-serif',
        });

        const hashtagText = new fabric.IText('#LiveBroadcastNews', {
            left: 550,
            top: 916,
            fontSize: 26,
            fill: secondaryColor,
            fontFamily: 'Cuprum, sans-serif',
        });

        addGroupToCanvas([bg, badgeIcon, iconSymbol, handleText, hashtagText]);
    };

    // 13. Weather Forecast Strip
    const addWeatherForecastStrip = () => {
        const bg = new fabric.Rect({
            left: 100,
            top: 870,
            width: 1200,
            height: 110,
            fill: bgColor,
            rx: 8,
            ry: 8,
            stroke: 'rgba(255,255,255,0.2)',
            strokeWidth: 1.5,
        });

        const titleHeader = new fabric.Rect({
            left: 100,
            top: 870,
            width: 220,
            height: 110,
            fill: primaryColor,
            rx: 8,
            ry: 8,
        });

        const titleText = new fabric.IText('☀️ WEATHER\nTODAY', {
            left: 130,
            top: 895,
            fontSize: 26,
            fontWeight: 'bold',
            fill: '#0f172a',
            textAlign: 'center',
            fontFamily: 'Cuprum, sans-serif',
        });

        const city1 = new fabric.IText('NEW DELHI\n34°C ☀️ Sunny', {
            left: 360,
            top: 895,
            fontSize: 24,
            fill: textColor,
            fontFamily: 'Cuprum, sans-serif',
        });

        const city2 = new fabric.IText('MUMBAI\n29°C 🌧️ Rain', {
            left: 640,
            top: 895,
            fontSize: 24,
            fill: textColor,
            fontFamily: 'Cuprum, sans-serif',
        });

        const city3 = new fabric.IText('BENGALURU\n24°C ⛅ Cloudy', {
            left: 920,
            top: 895,
            fontSize: 24,
            fill: textColor,
            fontFamily: 'Cuprum, sans-serif',
        });

        addGroupToCanvas([bg, titleHeader, titleText, city1, city2, city3]);
    };

    // 14. Financial Market Ticker Strip
    const addFinancialMarketStrip = () => {
        const bg = new fabric.Rect({
            left: 0,
            top: 990,
            width: 1920,
            height: 90,
            fill: '#0f172a',
        });

        const topBorder = new fabric.Rect({
            left: 0,
            top: 990,
            width: 1920,
            height: 4,
            fill: '#22c55e',
        });

        const badge = new fabric.Rect({
            left: 0,
            top: 990,
            width: 240,
            height: 90,
            fill: '#15803d',
        });

        const badgeText = new fabric.IText('📈 MARKETS', {
            left: 30,
            top: 1018,
            fontSize: 30,
            fontWeight: 'bold',
            fill: '#ffffff',
            fontFamily: 'Cuprum, sans-serif',
        });

        const stat1 = new fabric.IText('SENSEX 73,850 ▲ +420 (+0.57%)', {
            left: 280,
            top: 1020,
            fontSize: 26,
            fontWeight: 'bold',
            fill: '#4ade80',
            fontFamily: 'Cuprum, sans-serif',
        });

        const stat2 = new fabric.IText('NIFTY 22,410 ▲ +115 (+0.51%)', {
            left: 800,
            top: 1020,
            fontSize: 26,
            fontWeight: 'bold',
            fill: '#4ade80',
            fontFamily: 'Cuprum, sans-serif',
        });

        const stat3 = new fabric.IText('GOLD $2,340 ▼ -8 (-0.34%)', {
            left: 1320,
            top: 1020,
            fontSize: 26,
            fontWeight: 'bold',
            fill: '#f87171',
            fontFamily: 'Cuprum, sans-serif',
        });

        addGroupToCanvas([bg, topBorder, badge, badgeText, stat1, stat2, stat3]);
    };

    // 15. Location & Live Timestamp Bug Strip
    const addLocationTimeSlugStrip = () => {
        const bg = new fabric.Rect({
            left: 80,
            top: 60,
            width: 480,
            height: 60,
            fill: bgColor,
            rx: 30,
            ry: 30,
            stroke: primaryColor,
            strokeWidth: 2,
        });

        const dot = new fabric.Circle({
            left: 100,
            top: 78,
            radius: 12,
            fill: '#ef4444',
        });

        const locText = new fabric.IText('📍 NEW DELHI | 03:45 PM IST', {
            left: 135,
            top: 74,
            fontSize: 24,
            fontWeight: 'bold',
            fill: textColor,
            fontFamily: 'Cuprum, sans-serif',
        });

        addGroupToCanvas([bg, dot, locText]);
    };

    // 16. Event Countdown / Announcement Strip
    const addEventCountdownStrip = () => {
        const bg = new fabric.Rect({
            left: 200,
            top: 860,
            width: 1100,
            height: 115,
            fill: bgColor,
            rx: 8,
            ry: 8,
            stroke: secondaryColor,
            strokeWidth: 2,
        });

        const clockBg = new fabric.Rect({
            left: 200,
            top: 860,
            width: 320,
            height: 115,
            fill: secondaryColor,
            rx: 8,
            ry: 8,
        });

        const clockText = new fabric.IText('⏱️ STARTS IN\n02h 45m 30s', {
            left: 240,
            top: 885,
            fontSize: 26,
            fontWeight: 'bold',
            fill: '#ffffff',
            textAlign: 'center',
            fontFamily: 'Cuprum, sans-serif',
        });

        const eventTitle = new fabric.IText('GRAND ELECTION RESULTS NIGHT LIVE', {
            left: 550,
            top: 885,
            fontSize: 32,
            fontWeight: 'bold',
            fill: textColor,
            fontFamily: 'Cuprum, sans-serif',
        });

        const eventSub = new fabric.IText('Non-stop coverage with panel experts and exit polls', {
            left: 552,
            top: 930,
            fontSize: 22,
            fill: accentColor,
            fontFamily: 'Cuprum, sans-serif',
        });

        addGroupToCanvas([bg, clockBg, clockText, eventTitle, eventSub]);
    };

    // 17. Frosted Glass - Sleek Lower Third
    const addFrostedGlassLowerThird = () => {
        const glassBg = new fabric.Rect({
            left: 100,
            top: 860,
            width: 1250,
            height: 120,
            fill: '#ffffff',
            opacity: 0.12,
            rx: 16,
            ry: 16,
            stroke: 'rgba(255, 255, 255, 0.55)',
            strokeWidth: 2,
        });

        const sheen = new fabric.Rect({
            left: 102,
            top: 862,
            width: 1246,
            height: 48,
            fill: '#ffffff',
            opacity: 0.16,
            rx: 14,
            ry: 14,
        });

        const accentPill = new fabric.Rect({
            left: 115,
            top: 875,
            width: 12,
            height: 90,
            fill: primaryColor,
            rx: 6,
            ry: 6,
        });

        const nameText = new fabric.IText('FROSTED GLASS LOWER THIRD', {
            left: 145,
            top: 878,
            fontSize: 38,
            fontWeight: 'bold',
            fill: '#ffffff',
            fontFamily: 'Cuprum, sans-serif',
        });

        const subText = new fabric.IText('Ultra-Modern Translucent Broadcast Plate with Gloss Highlight', {
            left: 147,
            top: 930,
            fontSize: 22,
            fill: accentColor,
            fontFamily: 'Cuprum, sans-serif',
        });

        addGroupToCanvas([glassBg, sheen, accentPill, nameText, subText]);
    };

    // 18. Glassmorphic Dual Floating Pods
    const addGlassDualPods = () => {
        const namePod = new fabric.Rect({
            left: 120,
            top: 820,
            width: 680,
            height: 65,
            fill: '#ffffff',
            opacity: 0.15,
            rx: 14,
            ry: 14,
            stroke: 'rgba(255, 255, 255, 0.6)',
            strokeWidth: 2,
        });

        const nameSheen = new fabric.Rect({
            left: 122,
            top: 822,
            width: 676,
            height: 28,
            fill: '#ffffff',
            opacity: 0.2,
            rx: 12,
            ry: 12,
        });

        const nameText = new fabric.IText('VIMLESH KUMAR', {
            left: 150,
            top: 832,
            fontSize: 34,
            fontWeight: 'bold',
            fill: '#ffffff',
            fontFamily: 'Cuprum, sans-serif',
        });

        const slugPod = new fabric.Rect({
            left: 120,
            top: 895,
            width: 980,
            height: 55,
            fill: bgColor,
            opacity: 0.55,
            rx: 12,
            ry: 12,
            stroke: 'rgba(255, 255, 255, 0.35)',
            strokeWidth: 1.5,
        });

        const slugText = new fabric.IText('Senior Broadcast Playout Engineer | Live Headquarters', {
            left: 150,
            top: 906,
            fontSize: 24,
            fill: primaryColor,
            fontFamily: 'Cuprum, sans-serif',
        });

        addGroupToCanvas([namePod, nameSheen, nameText, slugPod, slugText]);
    };

    // 19. Prism Glass Angled Parallelogram Lower Third
    const addPrismGlassStrip = () => {
        const poly = new fabric.Polygon([
            { x: 100, y: 870 },
            { x: 1320, y: 870 },
            { x: 1250, y: 985 },
            { x: 30, y: 985 }
        ], {
            fill: '#ffffff',
            opacity: 0.12,
            stroke: 'rgba(255, 255, 255, 0.55)',
            strokeWidth: 2,
        });

        const topEdge = new fabric.Polygon([
            { x: 100, y: 870 },
            { x: 1320, y: 870 },
            { x: 1290, y: 915 },
            { x: 70, y: 915 }
        ], {
            fill: '#ffffff',
            opacity: 0.18,
        });

        const leftPrism = new fabric.Polygon([
            { x: 30, y: 985 },
            { x: 100, y: 870 },
            { x: 140, y: 870 },
            { x: 70, y: 985 }
        ], {
            fill: primaryColor,
        });

        const titleText = new fabric.IText('PRISM GLASS BROADCAST STRIP', {
            left: 160,
            top: 885,
            fontSize: 36,
            fontWeight: 'bold',
            fill: '#ffffff',
            fontFamily: 'Cuprum, sans-serif',
        });

        const subText = new fabric.IText('Angled Frosted Glass with Crystal Clear Edge Highlights', {
            left: 162,
            top: 938,
            fontSize: 22,
            fill: secondaryColor,
            fontFamily: 'Cuprum, sans-serif',
        });

        addGroupToCanvas([poly, topEdge, leftPrism, titleText, subText]);
    };

    // 20. Frosted Glass Top Header Bar
    const addFrostedTopHeader = () => {
        const barBg = new fabric.Rect({
            left: 0,
            top: 0,
            width: 1920,
            height: 75,
            fill: bgColor,
            opacity: 0.6,
            stroke: 'rgba(255, 255, 255, 0.3)',
            strokeWidth: 1.5,
        });

        const sheen = new fabric.Rect({
            left: 0,
            top: 0,
            width: 1920,
            height: 32,
            fill: '#ffffff',
            opacity: 0.15,
        });

        const bottomGlow = new fabric.Rect({
            left: 0,
            top: 71,
            width: 1920,
            height: 4,
            fill: primaryColor,
        });

        const glassBadge = new fabric.Rect({
            left: 40,
            top: 14,
            width: 120,
            height: 44,
            fill: '#dc2626',
            opacity: 0.85,
            rx: 22,
            ry: 22,
            stroke: 'rgba(255, 255, 255, 0.5)',
            strokeWidth: 1.5,
        });

        const liveText = new fabric.IText('● LIVE', {
            left: 68,
            top: 23,
            fontSize: 22,
            fontWeight: 'bold',
            fill: '#ffffff',
            fontFamily: 'Cuprum, sans-serif',
        });

        const titleText = new fabric.IText('GLOBAL NEWS HEADLINES | FROSTED GLASS PLAYOUT', {
            left: 185,
            top: 22,
            fontSize: 26,
            fontWeight: 'bold',
            fill: '#ffffff',
            fontFamily: 'Cuprum, sans-serif',
        });

        addGroupToCanvas([barBg, sheen, bottomGlow, glassBadge, liveText, titleText]);
    };

    // 21. Glassmorphic Breaking News Banner
    const addGlassBreakingNews = () => {
        const fullBar = new fabric.Rect({
            left: 0,
            top: 975,
            width: 1920,
            height: 105,
            fill: bgColor,
            opacity: 0.7,
            stroke: 'rgba(255, 255, 255, 0.35)',
            strokeWidth: 2,
        });

        const glassSheen = new fabric.Rect({
            left: 0,
            top: 975,
            width: 1920,
            height: 45,
            fill: '#ffffff',
            opacity: 0.15,
        });

        const topStripe = new fabric.Rect({
            left: 0,
            top: 975,
            width: 1920,
            height: 5,
            fill: '#f59e0b',
        });

        const redGlassBadge = new fabric.Rect({
            left: 0,
            top: 975,
            width: 360,
            height: 105,
            fill: '#dc2626',
            opacity: 0.88,
            stroke: 'rgba(255, 255, 255, 0.5)',
            strokeWidth: 2,
        });

        const badgeText = new fabric.IText('⚡ BREAKING', {
            left: 45,
            top: 1010,
            fontSize: 34,
            fontWeight: 'bold',
            fill: '#ffffff',
            fontFamily: 'Cuprum, sans-serif',
        });

        const tickerText = new fabric.IText('FROSTED GLASS BROADCAST TICKER: Ultra modern transparent graphics running live on CasparCG channels...', {
            left: 390,
            top: 1012,
            fontSize: 28,
            fill: '#ffffff',
            fontFamily: 'Cuprum, sans-serif',
        });

        addGroupToCanvas([fullBar, glassSheen, topStripe, redGlassBadge, badgeText, tickerText]);
    };

    // 22. Glass Capsule Pill Lower Third
    const addGlassPillBadge = () => {
        const pillBg = new fabric.Rect({
            left: 120,
            top: 875,
            width: 1150,
            height: 95,
            fill: '#ffffff',
            opacity: 0.14,
            rx: 48,
            ry: 48,
            stroke: 'rgba(255, 255, 255, 0.55)',
            strokeWidth: 2,
        });

        const pillSheen = new fabric.Rect({
            left: 124,
            top: 878,
            width: 1142,
            height: 42,
            fill: '#ffffff',
            opacity: 0.2,
            rx: 40,
            ry: 40,
        });

        const glassIconCircle = new fabric.Circle({
            left: 135,
            top: 887,
            radius: 35,
            fill: primaryColor,
            opacity: 0.85,
            stroke: 'rgba(255, 255, 255, 0.6)',
            strokeWidth: 2,
        });

        const iconText = new fabric.IText('💎', {
            left: 153,
            top: 896,
            fontSize: 36,
        });

        const titleText = new fabric.IText('FROSTED GLASS FLOATING CAPSULE', {
            left: 230,
            top: 892,
            fontSize: 34,
            fontWeight: 'bold',
            fill: '#ffffff',
            fontFamily: 'Cuprum, sans-serif',
        });

        const subText = new fabric.IText('Translucent Curved Border with Glow Accents', {
            left: 232,
            top: 935,
            fontSize: 20,
            fill: accentColor,
            fontFamily: 'Cuprum, sans-serif',
        });

        addGroupToCanvas([pillBg, pillSheen, glassIconCircle, iconText, titleText, subText]);
    };

    // 23. Cyber Neon Dual-Laser Lower Third
    const addCyberNeonLaserStrip = () => {
        const bg = new fabric.Rect({
            left: 100,
            top: 865,
            width: 1250,
            height: 115,
            fill: 'rgba(8, 12, 28, 0.94)',
            rx: 6,
            ry: 6,
            stroke: 'rgba(0, 243, 255, 0.4)',
            strokeWidth: 1.5,
        });

        // Top Cyan Laser Tube with Glow
        const topLaser = new fabric.Rect({
            left: 100,
            top: 865,
            width: 1250,
            height: 4,
            fill: '#00f3ff',
            shadow: { color: '#00f3ff', blur: 15, offsetX: 0, offsetY: 0 },
        });

        // Bottom Magenta Laser Tube with Glow
        const botLaser = new fabric.Rect({
            left: 100,
            top: 976,
            width: 1250,
            height: 4,
            fill: '#ff007f',
            shadow: { color: '#ff007f', blur: 15, offsetX: 0, offsetY: 0 },
        });

        // Left Neon Block
        const leftNeonPillar = new fabric.Rect({
            left: 100,
            top: 865,
            width: 14,
            height: 115,
            fill: '#00f3ff',
            shadow: { color: '#00f3ff', blur: 20, offsetX: 0, offsetY: 0 },
        });

        const nameText = new fabric.IText('CYBER NEON LASER STRIP', {
            left: 140,
            top: 880,
            fontSize: 38,
            fontWeight: 'bold',
            fill: '#ffffff',
            shadow: { color: '#00f3ff', blur: 10, offsetX: 0, offsetY: 0 },
            fontFamily: 'Cuprum, sans-serif',
        });

        const subText = new fabric.IText('Dual Laser Tubes with High-Intensity Glow Playout', {
            left: 142,
            top: 932,
            fontSize: 22,
            fill: '#ff007f',
            shadow: { color: '#ff007f', blur: 8, offsetX: 0, offsetY: 0 },
            fontFamily: 'Cuprum, sans-serif',
        });

        addGroupToCanvas([bg, topLaser, botLaser, leftNeonPillar, nameText, subText]);
    };

    // 24. Tokyo Neon Underglow Lower Third
    const addTokyoUnderglowStrip = () => {
        const bg = new fabric.Rect({
            left: 120,
            top: 870,
            width: 1200,
            height: 110,
            fill: '#05050d',
            rx: 8,
            ry: 8,
            stroke: '#ff007f',
            strokeWidth: 2,
            shadow: { color: '#ff007f', blur: 30, offsetX: 0, offsetY: 8 },
        });

        const neonBadge = new fabric.Rect({
            left: 140,
            top: 885,
            width: 110,
            height: 34,
            fill: '#ff007f',
            rx: 4,
            ry: 4,
            shadow: { color: '#ff007f', blur: 15, offsetX: 0, offsetY: 0 },
        });

        const badgeText = new fabric.IText('LIVE', {
            left: 172,
            top: 890,
            fontSize: 22,
            fontWeight: 'bold',
            fill: '#ffffff',
            fontFamily: 'Cuprum, sans-serif',
        });

        const nameText = new fabric.IText('TOKYO NEON UNDERGLOW', {
            left: 270,
            top: 885,
            fontSize: 34,
            fontWeight: 'bold',
            fill: '#ffffff',
            fontFamily: 'Cuprum, sans-serif',
        });

        const subText = new fabric.IText('Electric Pink Atmospheric Glow with Cyber Accent Framing', {
            left: 142,
            top: 935,
            fontSize: 22,
            fill: '#38bdf8',
            fontFamily: 'Cuprum, sans-serif',
        });

        addGroupToCanvas([bg, neonBadge, badgeText, nameText, subText]);
    };

    // 25. Matrix Emerald Neon Ticker Strip
    const addMatrixEmeraldTickerStrip = () => {
        const fullBar = new fabric.Rect({
            left: 0,
            top: 980,
            width: 1920,
            height: 100,
            fill: 'rgba(3, 15, 8, 0.95)',
            stroke: '#39ff14',
            strokeWidth: 1.5,
        });

        const topLaser = new fabric.Rect({
            left: 0,
            top: 980,
            width: 1920,
            height: 4,
            fill: '#39ff14',
            shadow: { color: '#39ff14', blur: 20, offsetX: 0, offsetY: 0 },
        });

        const neonBadge = new fabric.Rect({
            left: 0,
            top: 980,
            width: 320,
            height: 100,
            fill: '#15803d',
            stroke: '#39ff14',
            strokeWidth: 2,
            shadow: { color: '#39ff14', blur: 15, offsetX: 0, offsetY: 0 },
        });

        const badgeText = new fabric.IText('⚡ MATRIX FEED', {
            left: 35,
            top: 1012,
            fontSize: 32,
            fontWeight: 'bold',
            fill: '#ffffff',
            fontFamily: 'Cuprum, sans-serif',
        });

        const tickerText = new fabric.IText('EMERALD NEON TICKER: Ultra-vivid green glowing broadcast telemetry streaming live across CasparCG channels...', {
            left: 360,
            top: 1014,
            fontSize: 28,
            fill: '#86efac',
            shadow: { color: '#39ff14', blur: 8, offsetX: 0, offsetY: 0 },
            fontFamily: 'Cuprum, sans-serif',
        });

        addGroupToCanvas([fullBar, topLaser, neonBadge, badgeText, tickerText]);
    };

    // 26. Synthwave Angled Neon Parallelogram Strip
    const addSynthwaveAngledNeonStrip = () => {
        const poly = new fabric.Polygon([
            { x: 100, y: 870 },
            { x: 1320, y: 870 },
            { x: 1250, y: 985 },
            { x: 30, y: 985 }
        ], {
            fill: 'rgba(15, 8, 30, 0.95)',
            stroke: '#b026ff',
            strokeWidth: 2.5,
            shadow: { color: '#b026ff', blur: 25, offsetX: 0, offsetY: 0 },
        });

        const leftLaserWing = new fabric.Polygon([
            { x: 30, y: 985 },
            { x: 100, y: 870 },
            { x: 130, y: 870 },
            { x: 60, y: 985 }
        ], {
            fill: '#00f3ff',
            shadow: { color: '#00f3ff', blur: 15, offsetX: 0, offsetY: 0 },
        });

        const titleText = new fabric.IText('SYNTHWAVE NEON RETRO STRIP', {
            left: 155,
            top: 885,
            fontSize: 36,
            fontWeight: 'bold',
            fill: '#ffffff',
            shadow: { color: '#b026ff', blur: 12, offsetX: 0, offsetY: 0 },
            fontFamily: 'Cuprum, sans-serif',
        });

        const subText = new fabric.IText('Electric Violet & Laser Cyan Dual Frequency Channel', {
            left: 157,
            top: 938,
            fontSize: 22,
            fill: '#00f3ff',
            shadow: { color: '#00f3ff', blur: 8, offsetX: 0, offsetY: 0 },
            fontFamily: 'Cuprum, sans-serif',
        });

        addGroupToCanvas([poly, leftLaserWing, titleText, subText]);
    };

    // 27. Neon Top Laser Header Strip
    const addNeonTopLaserHeader = () => {
        const barBg = new fabric.Rect({
            left: 0,
            top: 0,
            width: 1920,
            height: 75,
            fill: 'rgba(5, 8, 20, 0.95)',
            stroke: 'rgba(0, 243, 255, 0.3)',
            strokeWidth: 1,
        });

        const botLaser = new fabric.Rect({
            left: 0,
            top: 71,
            width: 1920,
            height: 4,
            fill: '#00f3ff',
            shadow: { color: '#00f3ff', blur: 20, offsetX: 0, offsetY: 0 },
        });

        const neonBadge = new fabric.Rect({
            left: 40,
            top: 15,
            width: 120,
            height: 42,
            fill: 'rgba(255, 0, 127, 0.9)',
            rx: 6,
            ry: 6,
            shadow: { color: '#ff007f', blur: 18, offsetX: 0, offsetY: 0 },
        });

        const liveText = new fabric.IText('⚡ LIVE', {
            left: 65,
            top: 22,
            fontSize: 22,
            fontWeight: 'bold',
            fill: '#ffffff',
            fontFamily: 'Cuprum, sans-serif',
        });

        const titleText = new fabric.IText('NEON LASER BROADCAST NETWORK | HIGH-DEF PLAYOUT', {
            left: 185,
            top: 22,
            fontSize: 26,
            fontWeight: 'bold',
            fill: '#ffffff',
            shadow: { color: '#00f3ff', blur: 8, offsetX: 0, offsetY: 0 },
            fontFamily: 'Cuprum, sans-serif',
        });

        addGroupToCanvas([barBg, botLaser, neonBadge, liveText, titleText]);
    };

    // 28. Luxury Royal Gold Lower Third
    const addLuxuryGoldStrip = () => {
        const bg = new fabric.Rect({
            left: 120,
            top: 860,
            width: 1250,
            height: 120,
            fill: '#0a0d14',
            rx: 4,
            ry: 4,
            stroke: '#d4af37',
            strokeWidth: 2,
            shadow: { color: 'rgba(212, 175, 55, 0.3)', blur: 20, offsetX: 0, offsetY: 0 },
        });

        const innerGoldBorder = new fabric.Rect({
            left: 126,
            top: 866,
            width: 1238,
            height: 108,
            fill: 'transparent',
            stroke: 'rgba(212, 175, 55, 0.4)',
            strokeWidth: 1,
        });

        const goldBadge = new fabric.Rect({
            left: 120,
            top: 860,
            width: 140,
            height: 120,
            fill: 'linear-gradient(135deg, #d4af37, #aa7c11)',
            rx: 4,
            ry: 4,
        });

        const goldIcon = new fabric.IText('👑\nGALA', {
            left: 165,
            top: 885,
            fontSize: 26,
            fontWeight: 'bold',
            fill: '#000000',
            textAlign: 'center',
            fontFamily: 'Georgia, serif',
        });

        const nameText = new fabric.IText('HER EXCELLENCY AMBASSADOR', {
            left: 285,
            top: 880,
            fontSize: 36,
            fontWeight: 'bold',
            fill: '#fef08a',
            fontFamily: 'Georgia, serif',
        });

        const subText = new fabric.IText('Keynote Speaker | Global International Summit 2026', {
            left: 288,
            top: 932,
            fontSize: 22,
            fill: '#d4af37',
            fontFamily: 'Cuprum, sans-serif',
        });

        addGroupToCanvas([bg, innerGoldBorder, goldBadge, goldIcon, nameText, subText]);
    };

    // 29. Esports Cyberpunk HUD Strip
    const addEsportsHudStrip = () => {
        const bg = new fabric.Polygon([
            { x: 80, y: 870 },
            { x: 1250, y: 870 },
            { x: 1200, y: 980 },
            { x: 40, y: 980 }
        ], {
            fill: '#090d16',
            stroke: '#06b6d4',
            strokeWidth: 2,
            shadow: { color: '#06b6d4', blur: 20, offsetX: 0, offsetY: 0 },
        });

        const topHazardLine = new fabric.Polygon([
            { x: 80, y: 870 },
            { x: 1250, y: 870 },
            { x: 1230, y: 878 },
            { x: 60, y: 878 }
        ], {
            fill: '#facc15',
        });

        const rankBadge = new fabric.Rect({
            left: 100,
            top: 890,
            width: 140,
            height: 38,
            fill: '#06b6d4',
            rx: 4,
            ry: 4,
        });

        const rankText = new fabric.IText('LVL 99 PRO', {
            left: 122,
            top: 898,
            fontSize: 20,
            fontWeight: 'bold',
            fill: '#000000',
            fontFamily: 'Impact, sans-serif',
        });

        const gamerTag = new fabric.IText('SHADOW_STRIKER // TEAM VALOR', {
            left: 260,
            top: 892,
            fontSize: 34,
            fontWeight: 'bold',
            fill: '#ffffff',
            fontFamily: 'Impact, sans-serif',
        });

        const statText = new fabric.IText('K/D RATIO: 4.85 | WIN STREAK: 14 | MVP MATCH SCORE: 9,450', {
            left: 105,
            top: 940,
            fontSize: 22,
            fontWeight: 'bold',
            fill: '#facc15',
            fontFamily: 'Cuprum, sans-serif',
        });

        addGroupToCanvas([bg, topHazardLine, rankBadge, rankText, gamerTag, statText]);
    };

    // 30. Cinematic 2.39:1 Letterbox Strip
    const addCinematicLetterboxStrip = () => {
        const bg = new fabric.Rect({
            left: 150,
            top: 875,
            width: 1100,
            height: 95,
            fill: 'rgba(0, 0, 0, 0.88)',
            stroke: 'rgba(255, 255, 255, 0.4)',
            strokeWidth: 1,
        });

        const chapterBox = new fabric.Rect({
            left: 150,
            top: 875,
            width: 100,
            height: 95,
            fill: '#ffffff',
        });

        const chapterText = new fabric.IText('ACT\nIII', {
            left: 178,
            top: 895,
            fontSize: 24,
            fontWeight: 'bold',
            fill: '#000000',
            textAlign: 'center',
            fontFamily: 'Georgia, serif',
        });

        const titleText = new fabric.IText('THE FINAL HORIZON', {
            left: 275,
            top: 890,
            fontSize: 34,
            fontWeight: 'bold',
            fill: '#ffffff',
            letterSpacing: 4,
            fontFamily: 'Georgia, serif',
        });

        const creditText = new fabric.IText('Directed & Produced for Global Feature Broadcast Release', {
            left: 278,
            top: 935,
            fontSize: 20,
            fill: '#94a3b8',
            fontFamily: 'Cuprum, sans-serif',
        });

        addGroupToCanvas([bg, chapterBox, chapterText, titleText, creditText]);
    };

    // 31. Live Analytics 4-KPI Horizontal Data Strip
    const addLiveAnalyticsKpiStrip = () => {
        const fullBar = new fabric.Rect({
            left: 0,
            top: 980,
            width: 1920,
            height: 100,
            fill: '#0b1120',
            stroke: 'rgba(56, 189, 248, 0.4)',
            strokeWidth: 1.5,
        });

        const topCyanLine = new fabric.Rect({
            left: 0,
            top: 980,
            width: 1920,
            height: 4,
            fill: '#0284c7',
        });

        const kpi1 = new fabric.IText('👥 2.45M\nLive Viewers', {
            left: 80,
            top: 998,
            fontSize: 22,
            fontWeight: 'bold',
            fill: '#38bdf8',
            textAlign: 'center',
            fontFamily: 'Cuprum, sans-serif',
        });

        const kpi2 = new fabric.IText('💬 89,400\nComments / Min', {
            left: 560,
            top: 998,
            fontSize: 22,
            fontWeight: 'bold',
            fill: '#4ade80',
            textAlign: 'center',
            fontFamily: 'Cuprum, sans-serif',
        });

        const kpi3 = new fabric.IText('📊 94.2%\nAudience Rating', {
            left: 1060,
            top: 998,
            fontSize: 22,
            fontWeight: 'bold',
            fill: '#facc15',
            textAlign: 'center',
            fontFamily: 'Cuprum, sans-serif',
        });

        const kpi4 = new fabric.IText('🔥 #1 TRENDING\nGlobal Broadcast', {
            left: 1540,
            top: 998,
            fontSize: 22,
            fontWeight: 'bold',
            fill: '#f43f5e',
            textAlign: 'center',
            fontFamily: 'Cuprum, sans-serif',
        });

        addGroupToCanvas([fullBar, topCyanLine, kpi1, kpi2, kpi3, kpi4]);
    };

    // 32. Swiss Minimalist Editorial Plate
    const addSwissMinimalistStrip = () => {
        const bg = new fabric.Rect({
            left: 120,
            top: 865,
            width: 1100,
            height: 110,
            fill: '#ffffff',
            rx: 2,
            ry: 2,
            shadow: { color: 'rgba(0,0,0,0.25)', blur: 25, offsetX: 0, offsetY: 8 },
        });

        const blackAccent = new fabric.Rect({
            left: 120,
            top: 865,
            width: 14,
            height: 110,
            fill: '#000000',
        });

        const redTag = new fabric.Rect({
            left: 150,
            top: 880,
            width: 95,
            height: 26,
            fill: '#ef4444',
        });

        const tagText = new fabric.IText('SPECIAL', {
            left: 165,
            top: 885,
            fontSize: 16,
            fontWeight: 'bold',
            fill: '#ffffff',
            fontFamily: 'Helvetica, Arial, sans-serif',
        });

        const nameText = new fabric.IText('EDITORIAL MASTER SERIES', {
            left: 260,
            top: 880,
            fontSize: 34,
            fontWeight: 'bold',
            fill: '#000000',
            fontFamily: 'Helvetica, Arial, sans-serif',
        });

        const subText = new fabric.IText('Clean Swiss Typography Layout for High-End Production', {
            left: 152,
            top: 932,
            fontSize: 22,
            fill: '#475569',
            fontFamily: 'Helvetica, Arial, sans-serif',
        });

        addGroupToCanvas([bg, blackAccent, redTag, tagText, nameText, subText]);
    };

    // 33. BBC / Sky News Style Angled Dual-Tone Split Lower Third
    const addTvNetworkAngledSplit = () => {
        const leftAccent = new fabric.Rect({
            left: 100,
            top: 835,
            width: 12,
            height: 125,
            fill: primaryColor,
            rx: 2,
            ry: 2,
        });

        // Top Name Angled Polygon
        const namePoly = new fabric.Polygon([
            { x: 118, y: 835 },
            { x: 740, y: 835 },
            { x: 700, y: 895 },
            { x: 118, y: 895 }
        ], {
            fill: '#ffffff',
            shadow: { color: 'rgba(0,0,0,0.3)', blur: 15, offsetX: 0, offsetY: 4 },
        });

        const nameText = new fabric.IText('ALEXANDER WRIGHT', {
            left: 140,
            top: 846,
            fontSize: 34,
            fontWeight: 'bold',
            fill: '#0f172a',
            fontFamily: 'Cuprum, sans-serif',
        });

        // Bottom Slug Angled Polygon
        const slugPoly = new fabric.Polygon([
            { x: 118, y: 900 },
            { x: 1120, y: 900 },
            { x: 1080, y: 960 },
            { x: 118, y: 960 }
        ], {
            fill: bgColor,
            stroke: secondaryColor,
            strokeWidth: 1.5,
            shadow: { color: 'rgba(0,0,0,0.4)', blur: 15, offsetX: 0, offsetY: 6 },
        });

        const tagBadge = new fabric.Rect({
            left: 135,
            top: 912,
            width: 90,
            height: 28,
            fill: '#dc2626',
            rx: 4,
            ry: 4,
        });

        const tagText = new fabric.IText('LIVE', {
            left: 160,
            top: 916,
            fontSize: 18,
            fontWeight: 'bold',
            fill: '#ffffff',
            fontFamily: 'Cuprum, sans-serif',
        });

        const slugText = new fabric.IText('Chief Political Correspondent | Reporting from Parliament', {
            left: 240,
            top: 915,
            fontSize: 24,
            fill: textColor,
            fontFamily: 'Cuprum, sans-serif',
        });

        addGroupToCanvas([leftAccent, namePoly, nameText, slugPoly, tagBadge, tagText, slugText]);
    };

    // 34. ESPN / Fox Sports Championship Chamfered Hex Lower Third
    const addEspnChamferedSports = () => {
        const mainPoly = new fabric.Polygon([
            { x: 100, y: 865 },
            { x: 1250, y: 865 },
            { x: 1210, y: 975 },
            { x: 60, y: 975 }
        ], {
            fill: '#0f172a',
            stroke: '#f59e0b',
            strokeWidth: 2,
            shadow: { color: 'rgba(245, 158, 11, 0.4)', blur: 20, offsetX: 0, offsetY: 0 },
        });

        // Top Velocity Line
        const topStripe = new fabric.Polygon([
            { x: 100, y: 865 },
            { x: 1250, y: 865 },
            { x: 1235, y: 873 },
            { x: 85, y: 873 }
        ], {
            fill: '#f59e0b',
        });

        // Hexagonal Badge on Left
        const hexBadge = new fabric.Polygon([
            { x: 70, y: 920 },
            { x: 95, y: 875 },
            { x: 165, y: 875 },
            { x: 190, y: 920 },
            { x: 165, y: 965 },
            { x: 95, y: 965 }
        ], {
            fill: '#dc2626',
            stroke: '#ffffff',
            strokeWidth: 2,
        });

        const hexText = new fabric.IText('MVP\n#07', {
            left: 108,
            top: 890,
            fontSize: 22,
            fontWeight: 'bold',
            fill: '#ffffff',
            textAlign: 'center',
            fontFamily: 'Impact, sans-serif',
        });

        const nameText = new fabric.IText('MARCUS RASHFORD', {
            left: 215,
            top: 882,
            fontSize: 36,
            fontWeight: 'bold',
            fill: '#ffffff',
            fontFamily: 'Impact, sans-serif',
        });

        const statText = new fabric.IText('FORWARD // 28 GOALS THIS SEASON | MATCH RATING: 9.6', {
            left: 217,
            top: 932,
            fontSize: 22,
            fontWeight: 'bold',
            fill: '#f59e0b',
            fontFamily: 'Cuprum, sans-serif',
        });

        addGroupToCanvas([mainPoly, topStripe, hexBadge, hexText, nameText, statText]);
    };

    // 35. CNN / NBC Developing News Tri-Layer Ribbon
    const addNewsDevelopingTriRibbon = () => {
        // Top Mini Badge
        const topBadge = new fabric.Rect({
            left: 120,
            top: 820,
            width: 240,
            height: 35,
            fill: '#dc2626',
            rx: 4,
            ry: 4,
            shadow: { color: 'rgba(220, 38, 38, 0.4)', blur: 10, offsetX: 0, offsetY: 2 },
        });

        const topBadgeText = new fabric.IText('● DEVELOPING STORY', {
            left: 135,
            top: 826,
            fontSize: 18,
            fontWeight: 'bold',
            fill: '#ffffff',
            fontFamily: 'Cuprum, sans-serif',
        });

        // Middle Main Headline Plate
        const mainPlate = new fabric.Rect({
            left: 120,
            top: 860,
            width: 1200,
            height: 65,
            fill: '#0f172a',
            stroke: 'rgba(255,255,255,0.2)',
            strokeWidth: 1,
            shadow: { color: 'rgba(0,0,0,0.5)', blur: 20, offsetX: 0, offsetY: 6 },
        });

        const mainText = new fabric.IText('PRIME MINISTER ADDRESSES SPECIAL PARLIAMENT SESSION', {
            left: 145,
            top: 872,
            fontSize: 32,
            fontWeight: 'bold',
            fill: '#ffffff',
            fontFamily: 'Cuprum, sans-serif',
        });

        // Bottom Sub Ribbon
        const subPlate = new fabric.Rect({
            left: 120,
            top: 928,
            width: 1050,
            height: 48,
            fill: 'linear-gradient(90deg, #1e293b, #0f172a)',
            stroke: primaryColor,
            strokeWidth: 1.5,
        });

        const subText = new fabric.IText('LIVE FROM NEW DELHI | Special Economic Reforms Bill Introduced Today', {
            left: 145,
            top: 938,
            fontSize: 22,
            fill: accentColor,
            fontFamily: 'Cuprum, sans-serif',
        });

        addGroupToCanvas([topBadge, topBadgeText, mainPlate, mainText, subPlate, subText]);
    };

    // 36. Formula 1 Velocity Slanted Racing Strip
    const addF1VelocitySlantedStrip = () => {
        const mainPoly = new fabric.Polygon([
            { x: 120, y: 870 },
            { x: 1250, y: 870 },
            { x: 1180, y: 975 },
            { x: 50, y: 975 }
        ], {
            fill: '#11141c',
            stroke: '#ef4444',
            strokeWidth: 2,
            shadow: { color: '#ef4444', blur: 20, offsetX: 0, offsetY: 0 },
        });

        const speedLine = new fabric.Polygon([
            { x: 120, y: 870 },
            { x: 1250, y: 870 },
            { x: 1235, y: 877 },
            { x: 105, y: 877 }
        ], {
            fill: '#ffffff',
        });

        const numBadge = new fabric.Polygon([
            { x: 80, y: 970 },
            { x: 130, y: 885 },
            { x: 200, y: 885 },
            { x: 150, y: 970 }
        ], {
            fill: '#ef4444',
        });

        const numText = new fabric.IText('44', {
            left: 125,
            top: 900,
            fontSize: 44,
            fontWeight: 'bold',
            fill: '#ffffff',
            fontFamily: 'Impact, sans-serif',
        });

        const driverName = new fabric.IText('LEWIS HAMILTON', {
            left: 220,
            top: 885,
            fontSize: 36,
            fontWeight: 'bold',
            fill: '#ffffff',
            fontFamily: 'Impact, sans-serif',
        });

        const teamText = new fabric.IText('MERCEDES-AMG // GAP: +0.284s | LAP 52/57 | PIT: 1 STOP', {
            left: 222,
            top: 935,
            fontSize: 22,
            fontWeight: 'bold',
            fill: '#38bdf8',
            fontFamily: 'Cuprum, sans-serif',
        });

        addGroupToCanvas([mainPoly, speedLine, numBadge, numText, driverName, teamText]);
    };

    // 37. Bloomberg / Al Jazeera Clean Architectural Plate
    const addBloombergArchitecturalPlate = () => {
        const bg = new fabric.Rect({
            left: 100,
            top: 865,
            width: 1250,
            height: 110,
            fill: '#090d16',
            rx: 0,
            ry: 0,
            stroke: 'rgba(255,255,255,0.2)',
            strokeWidth: 1,
            shadow: { color: 'rgba(0,0,0,0.5)', blur: 20, offsetX: 0, offsetY: 6 },
        });

        const bar1 = new fabric.Rect({
            left: 100,
            top: 865,
            width: 8,
            height: 110,
            fill: '#0284c7',
        });

        const bar2 = new fabric.Rect({
            left: 112,
            top: 865,
            width: 4,
            height: 110,
            fill: '#f59e0b',
        });

        const nameText = new fabric.IText('GLOBAL FINANCIAL BRIEFING', {
            left: 140,
            top: 880,
            fontSize: 34,
            fontWeight: 'bold',
            fill: '#ffffff',
            fontFamily: 'Cuprum, sans-serif',
        });

        const subText = new fabric.IText('Federal Reserve Signals Interest Rate Pause Amid Tech Rally', {
            left: 142,
            top: 930,
            fontSize: 22,
            fill: '#94a3b8',
            fontFamily: 'Cuprum, sans-serif',
        });

        addGroupToCanvas([bg, bar1, bar2, nameText, subText]);
    };

    // 38. Modern Gradient Wave Curved Lower Third
    const addModernGradientWaveLowerThird = () => {
        const bg = new fabric.Rect({
            left: 120,
            top: 865,
            width: 1200,
            height: 110,
            fill: '#0f172a',
            rx: 24,
            ry: 24,
            stroke: primaryColor,
            strokeWidth: 2,
            shadow: { color: primaryColor, blur: 25, offsetX: 0, offsetY: 0 },
        });

        const waveAccent = new fabric.Rect({
            left: 122,
            top: 867,
            width: 25,
            height: 106,
            fill: secondaryColor,
            rx: 12,
            ry: 12,
        });

        const nameText = new fabric.IText('DR. ELENA ROSTOVA', {
            left: 170,
            top: 880,
            fontSize: 36,
            fontWeight: 'bold',
            fill: '#ffffff',
            fontFamily: 'Cuprum, sans-serif',
        });

        const subText = new fabric.IText('Director of Quantum Computing Research | Zurich Institute', {
            left: 172,
            top: 932,
            fontSize: 22,
            fill: accentColor,
            fontFamily: 'Cuprum, sans-serif',
        });

        addGroupToCanvas([bg, waveAccent, nameText, subText]);
    };

    // --- 24 NEWS BROADCAST PACK (12 EXACT STYLES FROM USER TEMPLATE) ---

    // 39. Purple Magenta Live News Strip with Clock
    const addPurpleLiveNewsStrip = () => {
        const topBadge = new fabric.Polygon([
            { x: 120, y: 835 },
            { x: 260, y: 835 },
            { x: 285, y: 865 },
            { x: 120, y: 865 }
        ], {
            fill: '#ffffff',
        });

        const topBadgeText = new fabric.IText('LIVE news', {
            left: 140,
            top: 840,
            fontSize: 20,
            fontWeight: 'bold',
            fill: '#000000',
            fontFamily: 'Cuprum, sans-serif',
        });

        const mainBar = new fabric.Rect({
            left: 120,
            top: 865,
            width: 1050,
            height: 75,
            fill: '#7e22ce',
            shadow: { color: 'rgba(0,0,0,0.3)', blur: 15, offsetX: 0, offsetY: 4 },
        });

        const mainText = new fabric.IText('TÍTULO PRINCIPAL AQUÍ', {
            left: 150,
            top: 878,
            fontSize: 40,
            fontWeight: 'bold',
            fill: '#ffffff',
            fontFamily: 'Impact, sans-serif',
        });

        const clockBadge = new fabric.Polygon([
            { x: 120, y: 940 },
            { x: 290, y: 940 },
            { x: 315, y: 975 },
            { x: 120, y: 975 }
        ], {
            fill: '#3b0764',
        });

        const clockText = new fabric.IText('23:00 PM', {
            left: 150,
            top: 946,
            fontSize: 20,
            fontWeight: 'bold',
            fill: '#c084fc',
            fontFamily: 'Cuprum, sans-serif',
        });

        const slugBar = new fabric.Polygon([
            { x: 295, y: 940 },
            { x: 1170, y: 940 },
            { x: 1170, y: 975 },
            { x: 320, y: 975 }
        ], {
            fill: '#ffffff',
        });

        const slugText = new fabric.IText('LÍNEA SECUNDARIA DEL EDITOR DE FILMORA AQUÍ', {
            left: 345,
            top: 947,
            fontSize: 18,
            fontWeight: 'bold',
            fill: '#475569',
            fontFamily: 'Cuprum, sans-serif',
        });

        addGroupToCanvas([topBadge, topBadgeText, mainBar, mainText, clockBadge, clockText, slugBar, slugText]);
    };

    // 40. Cobalt Blue Sports News with Top Pill
    const addBlueSportsTopPillStrip = () => {
        const leftBadge = new fabric.Polygon([
            { x: 100, y: 870 },
            { x: 230, y: 870 },
            { x: 200, y: 965 },
            { x: 70, y: 965 }
        ], {
            fill: '#0284c7',
        });

        const leftText = new fabric.IText('24\nNEWS', {
            left: 115,
            top: 885,
            fontSize: 28,
            fontWeight: 'bold',
            fill: '#ffffff',
            textAlign: 'center',
            fontFamily: 'Impact, sans-serif',
        });

        const topPill = new fabric.Polygon([
            { x: 225, y: 846 },
            { x: 660, y: 846 },
            { x: 640, y: 870 },
            { x: 225, y: 870 }
        ], {
            fill: '#ffffff',
        });

        const topPillText = new fabric.IText('SECOND LINE HERE', {
            left: 250,
            top: 849,
            fontSize: 16,
            fontWeight: 'bold',
            fill: '#0284c7',
            fontFamily: 'Cuprum, sans-serif',
        });

        const mainBar = new fabric.Polygon([
            { x: 210, y: 870 },
            { x: 1140, y: 870 },
            { x: 1100, y: 965 },
            { x: 180, y: 965 }
        ], {
            fill: '#1d4ed8',
            shadow: { color: 'rgba(29, 78, 216, 0.4)', blur: 15, offsetX: 0, offsetY: 4 },
        });

        const mainText = new fabric.IText('SPORT NEWS', {
            left: 270,
            top: 885,
            fontSize: 48,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: '#ffffff',
            fontFamily: 'Impact, sans-serif',
        });

        addGroupToCanvas([leftBadge, leftText, topPill, topPillText, mainBar, mainText]);
    };

    // 41. Red & Silver Sport News with Slash Dividers
    const addRedSilverSlashSportStrip = () => {
        const leftBadge = new fabric.Polygon([
            { x: 100, y: 870 },
            { x: 280, y: 870 },
            { x: 250, y: 965 },
            { x: 70, y: 965 }
        ], {
            fill: '#dc2626',
        });

        const leftText = new fabric.IText('24\nNEWS', {
            left: 125,
            top: 885,
            fontSize: 28,
            fontWeight: 'bold',
            fill: '#ffffff',
            textAlign: 'center',
            fontFamily: 'Impact, sans-serif',
        });

        const slash1 = new fabric.Polygon([{ x: 235, y: 875 }, { x: 245, y: 875 }, { x: 225, y: 960 }, { x: 215, y: 960 }], { fill: '#ffffff' });
        const slash2 = new fabric.Polygon([{ x: 250, y: 875 }, { x: 260, y: 875 }, { x: 240, y: 960 }, { x: 230, y: 960 }], { fill: '#ffffff' });
        const slash3 = new fabric.Polygon([{ x: 265, y: 875 }, { x: 275, y: 875 }, { x: 255, y: 960 }, { x: 245, y: 960 }], { fill: '#ffffff' });

        const mainBar = new fabric.Polygon([
            { x: 260, y: 870 },
            { x: 1080, y: 870 },
            { x: 1045, y: 965 },
            { x: 230, y: 965 }
        ], {
            fill: '#f1f5f9',
            shadow: { color: 'rgba(0,0,0,0.2)', blur: 12, offsetX: 0, offsetY: 4 },
        });

        const mainText = new fabric.IText('SPORT NEWS', {
            left: 310,
            top: 885,
            fontSize: 48,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: '#0f172a',
            fontFamily: 'Impact, sans-serif',
        });

        const slugBox = new fabric.Polygon([
            { x: 680, y: 965 },
            { x: 1045, y: 965 },
            { x: 1025, y: 1000 },
            { x: 660, y: 1000 }
        ], {
            fill: '#000000',
        });

        const slugText = new fabric.IText('EDITOR', {
            left: 810,
            top: 970,
            fontSize: 20,
            fontWeight: 'bold',
            fill: '#ffffff',
            fontFamily: 'Cuprum, sans-serif',
        });

        addGroupToCanvas([leftBadge, leftText, slash1, slash2, slash3, mainBar, mainText, slugBox, slugText]);
    };

    // 42. Purple Headline with Clock
    const addPurpleHeadTitleClockStrip = () => {
        const topBadge = new fabric.Polygon([
            { x: 120, y: 835 },
            { x: 260, y: 835 },
            { x: 285, y: 865 },
            { x: 120, y: 865 }
        ], {
            fill: '#ffffff',
        });

        const topBadgeText = new fabric.IText('LIVENEWS', {
            left: 135,
            top: 840,
            fontSize: 20,
            fontWeight: 'bold',
            fill: '#000000',
            fontFamily: 'Impact, sans-serif',
        });

        const mainBar = new fabric.Rect({
            left: 120,
            top: 865,
            width: 1000,
            height: 75,
            fill: '#86198f',
        });

        const mainText = new fabric.IText('HEAD TITLE HERE', {
            left: 150,
            top: 878,
            fontSize: 42,
            fontWeight: 'bold',
            fill: '#ffffff',
            fontFamily: 'Impact, sans-serif',
        });

        const clockBadge = new fabric.Polygon([
            { x: 120, y: 940 },
            { x: 290, y: 940 },
            { x: 315, y: 975 },
            { x: 120, y: 975 }
        ], {
            fill: '#4a044e',
        });

        const clockText = new fabric.IText('13:00 PM', {
            left: 150,
            top: 946,
            fontSize: 20,
            fontWeight: 'bold',
            fill: '#e879f9',
            fontFamily: 'Cuprum, sans-serif',
        });

        const slugBar = new fabric.Polygon([
            { x: 295, y: 940 },
            { x: 1120, y: 940 },
            { x: 1120, y: 975 },
            { x: 320, y: 975 }
        ], {
            fill: '#ffffff',
        });

        const slugText = new fabric.IText('EDITOR SECOND LINE HERE', {
            left: 360,
            top: 947,
            fontSize: 18,
            fontWeight: 'bold',
            fill: '#475569',
            fontFamily: 'Cuprum, sans-serif',
        });

        addGroupToCanvas([topBadge, topBadgeText, mainBar, mainText, clockBadge, clockText, slugBar, slugText]);
    };

    // 43. Blue-Red Split Sports News
    const addBlueRedSplitSportStrip = () => {
        const leftBadge = new fabric.Polygon([
            { x: 90, y: 885 },
            { x: 240, y: 885 },
            { x: 210, y: 980 },
            { x: 60, y: 980 }
        ], {
            fill: '#0284c7',
        });

        const leftText = new fabric.IText('24\nNEWS', {
            left: 120,
            top: 900,
            fontSize: 28,
            fontWeight: 'bold',
            fill: '#ffffff',
            textAlign: 'center',
            fontFamily: 'Impact, sans-serif',
        });

        const mainBar = new fabric.Polygon([
            { x: 220, y: 885 },
            { x: 1120, y: 885 },
            { x: 1090, y: 945 },
            { x: 200, y: 945 }
        ], {
            fill: '#1d4ed8',
        });

        const mainText = new fabric.IText('SPORT NEWS', {
            left: 290,
            top: 892,
            fontSize: 40,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: '#ffffff',
            fontFamily: 'Impact, sans-serif',
        });

        const redRibbon = new fabric.Polygon([
            { x: 235, y: 945 },
            { x: 1120, y: 945 },
            { x: 1060, y: 980 },
            { x: 265, y: 980 }
        ], {
            fill: '#ef4444',
        });

        const slugText = new fabric.IText('EDITOR SECOND LINE HERE', {
            left: 310,
            top: 950,
            fontSize: 18,
            fontWeight: 'bold',
            fill: '#ffffff',
            fontFamily: 'Cuprum, sans-serif',
        });

        addGroupToCanvas([leftBadge, leftText, mainBar, mainText, redRibbon, slugText]);
    };

    // 44. Orange Sunset Sport News with Slanted Badge
    const addOrangeSportNewsStrip = () => {
        const leftBadge = new fabric.Polygon([
            { x: 90, y: 885 },
            { x: 240, y: 885 },
            { x: 210, y: 980 },
            { x: 60, y: 980 }
        ], {
            fill: '#f97316',
        });

        const leftText = new fabric.IText('24\nNEWS', {
            left: 120,
            top: 900,
            fontSize: 28,
            fontWeight: 'bold',
            fill: '#ffffff',
            textAlign: 'center',
            fontFamily: 'Impact, sans-serif',
        });

        const mainBar = new fabric.Polygon([
            { x: 220, y: 885 },
            { x: 1120, y: 885 },
            { x: 1090, y: 945 },
            { x: 200, y: 945 }
        ], {
            fill: '#ea580c',
        });

        const mainText = new fabric.IText('SPORT NEWS', {
            left: 290,
            top: 892,
            fontSize: 40,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: '#ffffff',
            fontFamily: 'Impact, sans-serif',
        });

        const whiteRibbon = new fabric.Polygon([
            { x: 235, y: 945 },
            { x: 1140, y: 945 },
            { x: 1110, y: 980 },
            { x: 265, y: 980 }
        ], {
            fill: '#ffffff',
        });

        const slugText = new fabric.IText('EDITOR SECOND LINE HERE', {
            left: 310,
            top: 950,
            fontSize: 18,
            fontWeight: 'bold',
            fill: '#ea580c',
            fontFamily: 'Cuprum, sans-serif',
        });

        addGroupToCanvas([leftBadge, leftText, mainBar, mainText, whiteRibbon, slugText]);
    };

    // 45. Circular Red '24 NEWS' Breaking News Badge
    const addCircle24BreakingNewsStrip = () => {
        const outerCircle = new fabric.Circle({
            left: 90,
            top: 840,
            radius: 56,
            fill: '#dc2626',
            stroke: 'rgba(220, 38, 38, 0.4)',
            strokeWidth: 4,
            shadow: { color: 'rgba(220, 38, 38, 0.4)', blur: 15, offsetX: 0, offsetY: 0 },
        });

        const innerRing = new fabric.Circle({
            left: 98,
            top: 848,
            radius: 48,
            fill: 'transparent',
            stroke: '#ffffff',
            strokeWidth: 2,
        });

        const circleText = new fabric.IText('24\nNEWS', {
            left: 122,
            top: 865,
            fontSize: 26,
            fontWeight: 'bold',
            fill: '#ffffff',
            textAlign: 'center',
            fontFamily: 'Impact, sans-serif',
        });

        const mainPlate = new fabric.Rect({
            left: 175,
            top: 860,
            width: 950,
            height: 60,
            rx: 6,
            ry: 6,
            fill: '#f1f5f9',
            shadow: { color: 'rgba(0,0,0,0.15)', blur: 10, offsetX: 0, offsetY: 2 },
        });

        const mainText = new fabric.IText('BREAKING NEWS', {
            left: 230,
            top: 868,
            fontSize: 42,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: '#0f172a',
            fontFamily: 'Impact, sans-serif',
        });

        const slugBox = new fabric.Rect({
            left: 260,
            top: 924,
            width: 550,
            height: 34,
            rx: 4,
            ry: 4,
            fill: '#000000',
        });

        const slugText = new fabric.IText('EDITOR', {
            left: 510,
            top: 930,
            fontSize: 18,
            fontWeight: 'bold',
            fill: '#ffffff',
            fontFamily: 'Cuprum, sans-serif',
        });

        addGroupToCanvas([outerCircle, innerRing, circleText, mainPlate, mainText, slugBox, slugText]);
    };

    // 46. Blue & Red Dual-Banner Sports Strip
    const addBlueRedDualBannerSportStrip = () => {
        const leftBadge = new fabric.Polygon([
            { x: 90, y: 865 },
            { x: 230, y: 865 },
            { x: 205, y: 960 },
            { x: 65, y: 960 }
        ], {
            fill: '#0284c7',
        });

        const leftText = new fabric.IText('24\nNews', {
            left: 120,
            top: 880,
            fontSize: 26,
            fontWeight: 'bold',
            fill: '#ffffff',
            textAlign: 'center',
            fontFamily: 'Impact, sans-serif',
        });

        const mainBar = new fabric.Polygon([
            { x: 210, y: 865 },
            { x: 1140, y: 865 },
            { x: 1105, y: 925 },
            { x: 190, y: 925 }
        ], {
            fill: '#1d4ed8',
        });

        const mainText = new fabric.IText('NOTICIAS DEPORTIVAS', {
            left: 270,
            top: 872,
            fontSize: 38,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: '#ffffff',
            fontFamily: 'Impact, sans-serif',
        });

        const redRibbon = new fabric.Polygon([
            { x: 215, y: 925 },
            { x: 1120, y: 925 },
            { x: 1090, y: 960 },
            { x: 235, y: 960 }
        ], {
            fill: '#ef4444',
        });

        const slugText = new fabric.IText('LÍNEA SECUNDARIA DEL EDITOR DE FILMORA AQUÍ', {
            left: 280,
            top: 930,
            fontSize: 18,
            fontWeight: 'bold',
            fill: '#ffffff',
            fontFamily: 'Cuprum, sans-serif',
        });

        addGroupToCanvas([leftBadge, leftText, mainBar, mainText, redRibbon, slugText]);
    };

    // 47. Inverted Triangle '24 LIVE' Purple Sport News
    const addInvertedTriangle24SportStrip = () => {
        const leftWing = new fabric.Polygon([
            { x: 120, y: 880 },
            { x: 530, y: 880 },
            { x: 530, y: 960 },
            { x: 140, y: 960 }
        ], {
            fill: '#6b21a8',
        });

        const leftText = new fabric.IText('SPORT', {
            left: 220,
            top: 890,
            fontSize: 48,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: '#ffffff',
            fontFamily: 'Impact, sans-serif',
        });

        const rightWing = new fabric.Polygon([
            { x: 670, y: 880 },
            { x: 1080, y: 880 },
            { x: 1060, y: 960 },
            { x: 670, y: 960 }
        ], {
            fill: '#6b21a8',
        });

        const rightText = new fabric.IText('NEWS', {
            left: 770,
            top: 890,
            fontSize: 48,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: '#ffffff',
            fontFamily: 'Impact, sans-serif',
        });

        const centerTriangle = new fabric.Polygon([
            { x: 480, y: 850 },
            { x: 720, y: 850 },
            { x: 600, y: 995 }
        ], {
            fill: '#ffffff',
            shadow: { color: 'rgba(0,0,0,0.3)', blur: 15, offsetX: 0, offsetY: 4 },
        });

        const centerText = new fabric.IText('24\nLIVE', {
            left: 565,
            top: 865,
            fontSize: 32,
            fontWeight: 'bold',
            fill: '#000000',
            textAlign: 'center',
            fontFamily: 'Impact, sans-serif',
        });

        addGroupToCanvas([leftWing, leftText, rightWing, rightText, centerTriangle, centerText]);
    };

    // 48. Red Slanted '24 News' with Silver Bar
    const addRedSlanted24SilverStrip = () => {
        const leftBadge = new fabric.Polygon([
            { x: 90, y: 870 },
            { x: 260, y: 870 },
            { x: 230, y: 965 },
            { x: 60, y: 965 }
        ], {
            fill: '#dc2626',
        });

        const leftText = new fabric.IText('24\nNews', {
            left: 120,
            top: 885,
            fontSize: 28,
            fontWeight: 'bold',
            fill: '#ffffff',
            textAlign: 'center',
            fontFamily: 'Impact, sans-serif',
        });

        const slash1 = new fabric.Polygon([{ x: 220, y: 875 }, { x: 230, y: 875 }, { x: 210, y: 960 }, { x: 200, y: 960 }], { fill: '#ffffff' });
        const slash2 = new fabric.Polygon([{ x: 235, y: 875 }, { x: 245, y: 875 }, { x: 225, y: 960 }, { x: 215, y: 960 }], { fill: '#ffffff' });

        const mainBar = new fabric.Polygon([
            { x: 240, y: 870 },
            { x: 1040, y: 870 },
            { x: 1010, y: 965 },
            { x: 210, y: 965 }
        ], {
            fill: '#f1f5f9',
            shadow: { color: 'rgba(0,0,0,0.2)', blur: 12, offsetX: 0, offsetY: 4 },
        });

        const mainText = new fabric.IText('NOTICIAS DEPORTIVAS', {
            left: 280,
            top: 888,
            fontSize: 40,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: '#0f172a',
            fontFamily: 'Impact, sans-serif',
        });

        const slugBox = new fabric.Polygon([
            { x: 600, y: 965 },
            { x: 970, y: 965 },
            { x: 950, y: 1000 },
            { x: 580, y: 1000 }
        ], {
            fill: '#000000',
        });

        const slugText = new fabric.IText('EDITOR', {
            left: 740,
            top: 970,
            fontSize: 20,
            fontWeight: 'bold',
            fill: '#ffffff',
            fontFamily: 'Cuprum, sans-serif',
        });

        addGroupToCanvas([leftBadge, leftText, slash1, slash2, mainBar, mainText, slugBox, slugText]);
    };

    // 49. Cyan & Blue Floating 24 Head Title
    const addCyanBlueFloatingHeadTitleStrip = () => {
        const leftBadge = new fabric.Polygon([
            { x: 100, y: 860 },
            { x: 230, y: 860 },
            { x: 205, y: 955 },
            { x: 75, y: 955 }
        ], {
            fill: '#0284c7',
        });

        const leftText = new fabric.IText('24\nNEWS', {
            left: 125,
            top: 875,
            fontSize: 28,
            fontWeight: 'bold',
            fill: '#ffffff',
            textAlign: 'center',
            fontFamily: 'Impact, sans-serif',
        });

        const mainBar = new fabric.Polygon([
            { x: 215, y: 860 },
            { x: 1080, y: 860 },
            { x: 1055, y: 920 },
            { x: 190, y: 920 }
        ], {
            fill: '#1d4ed8',
        });

        const mainText = new fabric.IText('HEAD TITLE HERE', {
            left: 260,
            top: 868,
            fontSize: 38,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: '#ffffff',
            fontFamily: 'Impact, sans-serif',
        });

        const slugPlate = new fabric.Polygon([
            { x: 200, y: 920 },
            { x: 1060, y: 920 },
            { x: 1035, y: 955 },
            { x: 175, y: 955 }
        ], {
            fill: '#ffffff',
        });

        const slugText = new fabric.IText('EDITOR SECOND LINE HERE', {
            left: 280,
            top: 925,
            fontSize: 18,
            fontWeight: 'bold',
            fill: '#0284c7',
            fontFamily: 'Cuprum, sans-serif',
        });

        addGroupToCanvas([leftBadge, leftText, mainBar, mainText, slugPlate, slugText]);
    };

    // 50. Bottom Black & Purple TV Breaking News Strip
    const addBlackPurpleTvBreakingNewsStrip = () => {
        const topBar = new fabric.Rect({
            left: 100,
            top: 855,
            width: 1000,
            height: 32,
            fill: '#000000',
        });

        const topSubText = new fabric.IText('EDITOR SECOND LINE HERE', {
            left: 160,
            top: 860,
            fontSize: 16,
            fontWeight: 'bold',
            fill: '#ffffff',
            fontFamily: 'Cuprum, sans-serif',
        });

        const liveTag = new fabric.Rect({
            left: 980,
            top: 857,
            width: 100,
            height: 28,
            fill: '#ffffff',
        });

        const liveText = new fabric.IText('LIVE', {
            left: 1010,
            top: 862,
            fontSize: 16,
            fontWeight: 'bold',
            fill: '#000000',
            fontFamily: 'Impact, sans-serif',
        });

        const tvBadge = new fabric.Rect({
            left: 100,
            top: 887,
            width: 140,
            height: 75,
            fill: '#ffffff',
        });

        const tvText = new fabric.IText('TV\nNEWS', {
            left: 135,
            top: 895,
            fontSize: 30,
            fontWeight: 'bold',
            fill: '#000000',
            textAlign: 'center',
            fontFamily: 'Impact, sans-serif',
        });

        const purpleBar = new fabric.Rect({
            left: 240,
            top: 887,
            width: 860,
            height: 75,
            fill: '#7e22ce',
        });

        const breakingText = new fabric.IText('BREAKING NEWS', {
            left: 280,
            top: 900,
            fontSize: 46,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: '#ffffff',
            fontFamily: 'Impact, sans-serif',
        });

        addGroupToCanvas([topBar, topSubText, liveTag, liveText, tvBadge, tvText, purpleBar, breakingText]);
    };

    // --- OFFICIAL SOCIAL MEDIA NETWORK LOWER THIRDS (8 PLATFORMS FROM IMAGE) ---

    const createSocialLowerThird = (brandName, iconOrLogo, brandColor, sampleHandle, rightWingColor = null, lineMode = '2-liner') => {
        const wingColor = rightWingColor || brandColor;

        // Left Brand Badge
        const leftBadge = new fabric.Polygon([
            { x: 100, y: 865 },
            { x: 280, y: 865 },
            { x: 360, y: 965 },
            { x: 100, y: 965 }
        ], {
            fill: brandColor,
            shadow: { color: 'rgba(0,0,0,0.3)', blur: 15, offsetX: 0, offsetY: 4 },
        });

        const iconText = new fabric.IText(iconOrLogo, {
            left: 155,
            top: 882,
            fontSize: 50,
            fontWeight: 'bold',
            fill: '#ffffff',
            textAlign: 'center',
            fontFamily: 'Impact, sans-serif',
        });

        // Top Category Tag
        const topTag = new fabric.Polygon([
            { x: 520, y: 846 },
            { x: 820, y: 846 },
            { x: 800, y: 865 },
            { x: 500, y: 865 }
        ], {
            fill: '#334155',
        });

        const topTagText = new fabric.IText('YOUR TEXT TITLE GOES HERE', {
            left: 540,
            top: 850,
            fontSize: 14,
            fontWeight: 'bold',
            fill: '#ffffff',
            fontFamily: 'Cuprum, sans-serif',
        });

        // Main White Plate
        const mainPlate = new fabric.Polygon([
            { x: 230, y: 865 },
            { x: 1080, y: 865 },
            { x: 1140, y: 925 },
            { x: 290, y: 925 }
        ], {
            fill: '#ffffff',
            shadow: { color: 'rgba(0,0,0,0.2)', blur: 15, offsetX: 0, offsetY: 3 },
        });

        const handleText = new fabric.IText(sampleHandle, {
            left: 380,
            top: 895,
            fontSize: 32,
            fontStyle: 'italic',
            fill: '#475569',
            fontFamily: 'Cuprum, sans-serif',
        });

        // Right Brand Wing
        const rightWing = new fabric.Polygon([
            { x: 1080, y: 880 },
            { x: 1110, y: 880 },
            { x: 1160, y: 950 },
            { x: 1130, y: 950 }
        ], {
            fill: wingColor,
        });

        // Bottom Dark Slug Bar
        const bottomSlug = new fabric.Polygon([
            { x: 380, y: 950 },
            { x: 1100, y: 950 },
            { x: 1060, y: 985 },
            { x: 340, y: 985 }
        ], {
            fill: '#1e293b',
        });
        bottomSlug.isSubLine = true;

        const bottomAccentTip = new fabric.Polygon([
            { x: 350, y: 950 },
            { x: 380, y: 950 },
            { x: 340, y: 985 },
            { x: 310, y: 985 }
        ], {
            fill: brandColor,
        });
        bottomAccentTip.isSubLine = true;

        const bottomText = new fabric.IText('write your text here', {
            left: 560,
            top: 955,
            fontSize: 18,
            fill: '#94a3b8',
            fontFamily: 'Cuprum, sans-serif',
        });
        bottomText.isSubLine = true;

        addGroupToCanvas([leftBadge, iconText, topTag, topTagText, mainPlate, handleText, rightWing, bottomSlug, bottomAccentTip, bottomText], lineMode);
    };

    // 61. Instagram
    const addInstagramBrandLowerThird = (lineMode = '2-liner') => {
        createSocialLowerThird('Instagram', '📷', '#e1306c', '@yourusername', '#f77737', lineMode);
    };

    // 62. LinkedIn
    const addLinkedInBrandLowerThird = (lineMode = '2-liner') => {
        createSocialLowerThird('LinkedIn', 'in', '#0077b5', 'www.linkedin.com/username', null, lineMode);
    };

    // 63. Facebook
    const addFacebookBrandLowerThird = (lineMode = '2-liner') => {
        createSocialLowerThird('Facebook', 'f', '#1877f2', 'www.facebook.com/username', null, lineMode);
    };

    // 64. Pinterest
    const addPinterestBrandLowerThird = (lineMode = '2-liner') => {
        createSocialLowerThird('Pinterest', '📌', '#e60023', 'www.pinterest.com/username', null, lineMode);
    };

    // 65. WhatsApp
    const addWhatsAppBrandLowerThird = (lineMode = '2-liner') => {
        createSocialLowerThird('WhatsApp', '📞', '#25d366', '+00 123 456 789', null, lineMode);
    };

    // 66. YouTube
    const addYouTubeBrandLowerThird = (lineMode = '2-liner') => {
        createSocialLowerThird('YouTube', '▶', '#ff0000', 'yourusername', null, lineMode);
    };

    // 67. Twitter
    const addTwitterBrandLowerThird = (lineMode = '2-liner') => {
        createSocialLowerThird('Twitter', '🐦', '#1da1f2', '#yourusername', null, lineMode);
    };

    // 68. Behance
    const addBehanceBrandLowerThird = (lineMode = '2-liner') => {
        createSocialLowerThird('Behance', 'Bē', '#1769ff', 'www.behance.net/username', null, lineMode);
    };

    const [selectedSocialIndex, setSelectedSocialIndex] = useState(0);
    const [socialLineMode, setSocialLineMode] = useState('2-liner');

    const [selectedNews24Index, setSelectedNews24Index] = useState(0);
    const [news24LineMode, setNews24LineMode] = useState('2-liner');

    const [selectedProTvIndex, setSelectedProTvIndex] = useState(0);
    const [proTvLineMode, setProTvLineMode] = useState('2-liner');

    const [selectedGlassIndex, setSelectedGlassIndex] = useState(0);
    const [glassLineMode, setGlassLineMode] = useState('2-liner');

    const [selectedNeonIndex, setSelectedNeonIndex] = useState(0);
    const [neonLineMode, setNeonLineMode] = useState('2-liner');

    const [selectedLuxuryIndex, setSelectedLuxuryIndex] = useState(0);
    const [luxuryLineMode, setLuxuryLineMode] = useState('2-liner');

    const [selectedBroadcastIndex, setSelectedBroadcastIndex] = useState(0);
    const [broadcastLineMode, setBroadcastLineMode] = useState('2-liner');

    const socialOptions = [
        { title: '📸 Instagram Sunset 3D Lower Third', desc: 'Sunset gradient badge with handle & bottom callout', action: addInstagramBrandLowerThird },
        { title: '💼 LinkedIn Blue 3D Lower Third', desc: 'Signature blue LinkedIn badge with profile URL', action: addLinkedInBrandLowerThird },
        { title: '📘 Facebook Royal 3D Lower Third', desc: 'Facebook blue banner with page username', action: addFacebookBrandLowerThird },
        { title: '📌 Pinterest Red 3D Lower Third', desc: 'Red Pinterest emblem with profile handle', action: addPinterestBrandLowerThird },
        { title: '💬 WhatsApp Green 3D Lower Third', desc: 'Vibrant WhatsApp green with contact telephone', action: addWhatsAppBrandLowerThird },
        { title: '▶️ YouTube Creator 3D Lower Third', desc: 'YouTube red play badge with channel name', action: addYouTubeBrandLowerThird },
        { title: '🐦 Twitter / X Cyan 3D Lower Third', desc: 'Twitter cyan bird badge with hashtag slug', action: addTwitterBrandLowerThird },
        { title: '🎨 Behance Blue 3D Lower Third', desc: 'Electric blue Behance portfolio link bar', action: addBehanceBrandLowerThird },
    ];

    const news24Options = [
        { title: '💜 Purple Live News Strip (Clock)', desc: 'Purple bar with top LIVE news badge & clock box', action: addPurpleLiveNewsStrip },
        { title: '🔵 Cobalt Blue Sports (Top Pill)', desc: '24 News angled badge with top second line pill', action: addBlueSportsTopPillStrip },
        { title: '🔴 Red & Silver Slash Sport News', desc: 'Red 24 News with slanted slashes & silver plate', action: addRedSilverSlashSportStrip },
        { title: '🟣 Purple Head Title with Clock', desc: 'Magenta bar with top LIVENEWS & 13:00 PM badge', action: addPurpleHeadTitleClockStrip },
        { title: '🟦 Blue-Red Split Sports News', desc: 'Cobalt blue plate with bottom red chevron ribbon', action: addBlueRedSplitSportStrip },
        { title: '🟠 Orange Sunset Sport News', desc: 'Sunset orange angled strip with bottom white ribbon', action: addOrangeSportNewsStrip },
        { title: '⭕ Circular 24 Breaking News', desc: 'Round red 24 News emblem with silver headline bar', action: addCircle24BreakingNewsStrip },
        { title: '🔷 Blue-Red Dual Banner Sport', desc: 'Blue Noticias Deportivas with red bottom ribbon', action: addBlueRedDualBannerSportStrip },
        { title: '🔺 Inverted Triangle 24 LIVE', desc: 'Center white 24 LIVE triangle between purple wings', action: addInvertedTriangle24SportStrip },
        { title: '⚡ Red Slanted 24 Silver Strip', desc: 'Red 24 News parallelogram with metallic silver plate', action: addRedSlanted24SilverStrip },
        { title: '🔹 Cyan & Blue Floating 24 Head', desc: 'Dual-layer blue & white floating head title', action: addCyanBlueFloatingHeadTitleStrip },
        { title: '📺 Black & Purple TV Breaking News', desc: 'TV News white badge with purple bar & top LIVE tag', action: addBlackPurpleTvBreakingNewsStrip },
    ];

    const proTvOptions = [
        { title: '🌟 BBC / Sky Angled Split L3', desc: 'Floating white name plate with angled dark slug box & live tag', action: addTvNetworkAngledSplit },
        { title: '⚡ ESPN / Fox Sports Hex L3', desc: 'Chamfered hex badge with high-impact headline & player stats', action: addEspnChamferedSports },
        { title: '📢 CNN / NBC Developing Ribbon', desc: '3-tier developing news ribbon with location & source slug', action: addNewsDevelopingTriRibbon },
        { title: '🏎️ F1 Velocity Slanted Strip', desc: '30° slanted racing plates with driver number & gap telemetry', action: addF1VelocitySlantedStrip },
        { title: '🏛️ Bloomberg Architectural Plate', desc: 'Clean graphite plate with dual vertical neon status bars', action: addBloombergArchitecturalPlate },
        { title: '🌊 Modern Gradient Wave L3', desc: 'Curved asymmetric glow plate with vibrant accent wave', action: addModernGradientWaveLowerThird },
    ];

    const glassOptions = [
        { title: '💎 Frosted Glass Lower Third', desc: 'Translucent glass plate with upper gloss sheen & accent pill', action: addFrostedGlassLowerThird },
        { title: '🧊 Glassmorphic Dual Pods', desc: 'Dual floating frosted glass boxes for name & designation', action: addGlassDualPods },
        { title: '✨ Prism Glass Angled Strip', desc: 'Angled frosted glass cutout with crystal edge highlights', action: addPrismGlassStrip },
        { title: '🔝 Frosted Glass Top Header', desc: 'Full-width translucent top banner with glass LIVE badge', action: addFrostedTopHeader },
        { title: '⚡ Glassmorphic Breaking News', desc: 'Frosted glass ticker with red acrylic breaking badge', action: addGlassBreakingNews },
        { title: '💊 Glass Capsule Pill Strip', desc: 'Frosted rounded pill with floating cyan glass icon', action: addGlassPillBadge },
    ];

    const neonOptions = [
        { title: '⚡ Cyber Neon Dual-Laser Strip', desc: 'Glowing Cyan & Magenta laser tubes with corner glow', action: addCyberNeonLaserStrip },
        { title: '🏮 Tokyo Neon Underglow', desc: 'Intense Electric Pink underglow shadow with cyber framing', action: addTokyoUnderglowStrip },
        { title: '🟩 Matrix Emerald Neon Ticker', desc: 'Full-width dark ticker with glowing lime laser lines', action: addMatrixEmeraldTickerStrip },
        { title: '💜 Synthwave Neon Angled Strip', desc: 'Angled synthwave banner with electric violet & cyan glow', action: addSynthwaveAngledNeonStrip },
        { title: '🔝 Neon Top Laser Header', desc: 'Full-width top header with pulsating cyan laser beam', action: addNeonTopLaserHeader },
    ];

    const luxuryOptions = [
        { title: '👑 Luxury Royal Gold Strip', desc: 'Obsidian & metallic gold dual frame with royal badge', action: addLuxuryGoldStrip },
        { title: '🎮 Esports Cyberpunk HUD', desc: 'Angled cyber HUD with player tag, level & live K/D stats', action: addEsportsHudStrip },
        { title: '🎬 Cinematic 2.39:1 Letterbox', desc: 'Wide cinema-grade banner with Act chapter badge', action: addCinematicLetterboxStrip },
        { title: '📊 4-KPI Live Analytics Strip', desc: 'Full-width ticker with Viewers, Rating & Trending metrics', action: addLiveAnalyticsKpiStrip },
        { title: '📰 Swiss Minimalist Editorial', desc: 'High-contrast black & white Swiss typography layout', action: addSwissMinimalistStrip },
    ];

    const broadcastOptions = [
        { title: '📺 Classic Lower Third', desc: 'Left accent bar with title & designation', action: addClassicLowerThird },
        { title: '🏷️ 2-Tier Split Lower Third', desc: 'Stacked name box and slug box', action: addDualTierLowerThird },
        { title: '⚡ Breaking News Ticker', desc: 'Full-width bottom banner with red badge', action: addBreakingNewsTicker },
        { title: '🔝 Top Program Header', desc: 'Top broadcast banner with live badge', action: addTopHeaderStrip },
        { title: '📐 Angled Cyber Strip', desc: 'Parallelogram cutout with dual glow', action: addAngledCyberStrip },
        { title: '💊 Glassmorphic Floating Pill', desc: 'Rounded pill shape with star badge', action: addGlassmorphicPill },
        { title: '🏆 Sports Match Score Bar', desc: 'Dual team boxes with live scores', action: addSportsScoreStrip },
        { title: '✨ Minimalist Neon Strip', desc: 'Dark plate with dual neon border lines', action: addMinimalistNeonStrip },
        { title: '⚠️ Red Alert Hazard Strip', desc: 'Emergency advisory with caution icon', action: addAlertHazardStrip },
        { title: '🗳️ Election Poll Compare', desc: 'Dual party percentage bars with VS tag', action: addElectionPollStrip },
        { title: '💬 Quote & Speaker Strip', desc: 'Large quote marks with author slug', action: addQuoteSpeakerStrip },
        { title: '🌐 Social Handle & Tag', desc: 'Channel social account and hashtag banner', action: addSocialMediaStrip },
        { title: '☀️ Weather Forecast Strip', desc: 'Multi-city temperatures with weather icons', action: addWeatherForecastStrip },
        { title: '📈 Financial Market Ticker', desc: 'Sensex, Nifty & Gold index ticker bar', action: addFinancialMarketStrip },
        { title: '📍 Location & Live Clock', desc: 'Compact location and time badge', action: addLocationTimeSlugStrip },
        { title: '⏱️ Event Countdown Strip', desc: 'Clock countdown box with event headline', action: addEventCountdownStrip },
    ];

    const handleAddSocial = () => {
        activeLineModeRef.current = socialLineMode;
        if (socialOptions[selectedSocialIndex]) {
            socialOptions[selectedSocialIndex].action(socialLineMode);
        }
    };

    const handleAddNews24 = () => {
        activeLineModeRef.current = news24LineMode;
        if (news24Options[selectedNews24Index]) {
            news24Options[selectedNews24Index].action(news24LineMode);
        }
    };

    const handleAddProTv = () => {
        activeLineModeRef.current = proTvLineMode;
        if (proTvOptions[selectedProTvIndex]) {
            proTvOptions[selectedProTvIndex].action(proTvLineMode);
        }
    };

    const handleAddGlass = () => {
        activeLineModeRef.current = glassLineMode;
        if (glassOptions[selectedGlassIndex]) {
            glassOptions[selectedGlassIndex].action(glassLineMode);
        }
    };

    const handleAddNeon = () => {
        activeLineModeRef.current = neonLineMode;
        if (neonOptions[selectedNeonIndex]) {
            neonOptions[selectedNeonIndex].action(neonLineMode);
        }
    };

    const handleAddLuxury = () => {
        activeLineModeRef.current = luxuryLineMode;
        if (luxuryOptions[selectedLuxuryIndex]) {
            luxuryOptions[selectedLuxuryIndex].action(luxuryLineMode);
        }
    };

    const handleAddBroadcast = () => {
        activeLineModeRef.current = broadcastLineMode;
        if (broadcastOptions[selectedBroadcastIndex]) {
            broadcastOptions[selectedBroadcastIndex].action(broadcastLineMode);
        }
    };

    return (
        <div
            className="strips-scroll-container"
            style={{
                padding: '15px 20px 40px 15px',
                fontFamily: 'sans-serif',
                maxWidth: 1020,
                maxHeight: 'calc(100vh - 170px)',
                overflowY: 'auto',
                overflowX: 'hidden',
                boxSizing: 'border-box'
            }}
        >
            <style>{`
                .strips-scroll-container::-webkit-scrollbar {
                    width: 8px;
                }
                .strips-scroll-container::-webkit-scrollbar-track {
                    background: #f1f5f9;
                    border-radius: 4px;
                }
                .strips-scroll-container::-webkit-scrollbar-thumb {
                    background: #94a3b8;
                    border-radius: 4px;
                }
                .strips-scroll-container::-webkit-scrollbar-thumb:hover {
                    background: #64748b;
                }
            `}</style>
            <h3 style={{ margin: '0 0 8px 0' }}>Broadcast Graphic Strips Library</h3>
            <p style={{ margin: '0 0 14px 0', fontSize: 13, color: '#666' }}>
                Pick your colors, select <b>1-Liner / 2-Liner</b> mode, and click <b>Add</b> to place lower thirds directly onto your graphics canvas.
            </p>

            {/* 🎨 Top Color Controls Bar */}
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 16, padding: '10px 14px', background: '#f8fafc', borderRadius: 8, border: '1px solid #cbd5e1', flexWrap: 'wrap' }}>
                <span style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#1e293b' }}>
                    <FaPalette /> Colors:
                </span>

                <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
                    Primary:
                    <input type="color" value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} style={{ cursor: 'pointer' }} />
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
                    Accent:
                    <input type="color" value={secondaryColor} onChange={e => setSecondaryColor(e.target.value)} style={{ cursor: 'pointer' }} />
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
                    Background:
                    <input type="color" value={bgColor.startsWith('#') ? bgColor : '#0f172a'} onChange={e => setBgColor(e.target.value)} style={{ cursor: 'pointer' }} />
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
                    Sub-text:
                    <input type="color" value={accentColor} onChange={e => setAccentColor(e.target.value)} style={{ cursor: 'pointer' }} />
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
                    Text:
                    <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} style={{ cursor: 'pointer' }} />
                </label>
            </div>

            {/* 1. 🌐 Official Social Media Network Strips Pack */}
            <div style={{
                display: 'flex',
                gap: 12,
                alignItems: 'center',
                marginBottom: 12,
                padding: '12px 16px',
                background: 'linear-gradient(135deg, rgba(240, 249, 255, 0.95), rgba(224, 242, 254, 0.8))',
                borderRadius: 8,
                border: '1px solid #0284c7',
                boxShadow: '0 2px 8px rgba(2, 132, 199, 0.15)',
                flexWrap: 'wrap'
            }}>
                <label style={{ fontWeight: 700, fontSize: 14, color: '#0369a1', minWidth: 140, display: 'flex', alignItems: 'center', gap: 6 }}>
                    🌐 Social Media 3D:
                </label>

                <select
                    value={selectedSocialIndex}
                    onChange={e => setSelectedSocialIndex(parseInt(e.target.value))}
                    style={{
                        padding: '8px 12px',
                        fontSize: 14,
                        borderRadius: 6,
                        border: '1px solid #0284c7',
                        minWidth: 280,
                        cursor: 'pointer',
                        fontWeight: 600,
                        backgroundColor: '#ffffff',
                    }}
                >
                    {socialOptions.map((opt, idx) => (
                        <option key={idx} value={idx}>
                            {opt.title}
                        </option>
                    ))}
                </select>

                <select
                    value={socialLineMode}
                    onChange={e => setSocialLineMode(e.target.value)}
                    style={{
                        padding: '8px 10px',
                        fontSize: 13,
                        fontWeight: 700,
                        borderRadius: 6,
                        border: '1px solid #0284c7',
                        cursor: 'pointer',
                        backgroundColor: '#ffffff',
                        color: '#0369a1',
                    }}
                >
                    <option value="2-liner">2-Liner</option>
                    <option value="1-liner">1-Liner</option>
                </select>

                <button
                    onClick={handleAddSocial}
                    style={{
                        padding: '8px 18px',
                        background: 'linear-gradient(135deg, #0284c7, #0369a1)',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: 6,
                        fontWeight: 700,
                        fontSize: 13,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        boxShadow: '0 2px 6px rgba(2, 132, 199, 0.4)',
                    }}
                >
                    <FaPlus /> Add Social Strip
                </button>

                <span style={{ fontSize: 12, color: '#0369a1', fontStyle: 'italic' }}>
                    ({socialOptions[selectedSocialIndex]?.desc})
                </span>
            </div>

            {/* 2. 📺 24 News Broadcast Pack Row */}
            <div style={{
                display: 'flex',
                gap: 12,
                alignItems: 'center',
                marginBottom: 12,
                padding: '12px 16px',
                background: 'linear-gradient(135deg, rgba(254, 226, 226, 0.95), rgba(254, 242, 242, 0.7))',
                borderRadius: 8,
                border: '1px solid #ef4444',
                boxShadow: '0 2px 8px rgba(239, 68, 68, 0.15)',
                flexWrap: 'wrap'
            }}>
                <label style={{ fontWeight: 700, fontSize: 14, color: '#b91c1c', minWidth: 140, display: 'flex', alignItems: 'center', gap: 6 }}>
                    📺 24 News Pack:
                </label>

                <select
                    value={selectedNews24Index}
                    onChange={e => setSelectedNews24Index(parseInt(e.target.value))}
                    style={{
                        padding: '8px 12px',
                        fontSize: 14,
                        borderRadius: 6,
                        border: '1px solid #ef4444',
                        minWidth: 280,
                        cursor: 'pointer',
                        fontWeight: 600,
                        backgroundColor: '#ffffff',
                    }}
                >
                    {news24Options.map((opt, idx) => (
                        <option key={idx} value={idx}>
                            {opt.title}
                        </option>
                    ))}
                </select>

                <select
                    value={news24LineMode}
                    onChange={e => setNews24LineMode(e.target.value)}
                    style={{
                        padding: '8px 10px',
                        fontSize: 13,
                        fontWeight: 700,
                        borderRadius: 6,
                        border: '1px solid #ef4444',
                        cursor: 'pointer',
                        backgroundColor: '#ffffff',
                        color: '#b91c1c',
                    }}
                >
                    <option value="2-liner">2-Liner</option>
                    <option value="1-liner">1-Liner</option>
                </select>

                <button
                    onClick={handleAddNews24}
                    style={{
                        padding: '8px 18px',
                        background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: 6,
                        fontWeight: 700,
                        fontSize: 13,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        boxShadow: '0 2px 6px rgba(220, 38, 38, 0.4)',
                    }}
                >
                    <FaPlus /> Add 24 News Strip
                </button>

                <span style={{ fontSize: 12, color: '#b91c1c', fontStyle: 'italic' }}>
                    ({news24Options[selectedNews24Index]?.desc})
                </span>
            </div>

            {/* 3. 🌟 Pro TV Network Lower Thirds Row */}
            <div style={{
                display: 'flex',
                gap: 12,
                alignItems: 'center',
                marginBottom: 12,
                padding: '12px 16px',
                background: 'linear-gradient(135deg, rgba(238, 242, 255, 0.95), rgba(224, 231, 255, 0.7))',
                borderRadius: 8,
                border: '1px solid #6366f1',
                boxShadow: '0 2px 8px rgba(99, 102, 241, 0.15)',
                flexWrap: 'wrap'
            }}>
                <label style={{ fontWeight: 700, fontSize: 14, color: '#4338ca', minWidth: 140, display: 'flex', alignItems: 'center', gap: 6 }}>
                    🌟 Pro TV Network:
                </label>

                <select
                    value={selectedProTvIndex}
                    onChange={e => setSelectedProTvIndex(parseInt(e.target.value))}
                    style={{
                        padding: '8px 12px',
                        fontSize: 14,
                        borderRadius: 6,
                        border: '1px solid #6366f1',
                        minWidth: 280,
                        cursor: 'pointer',
                        fontWeight: 600,
                        backgroundColor: '#ffffff',
                    }}
                >
                    {proTvOptions.map((opt, idx) => (
                        <option key={idx} value={idx}>
                            {opt.title}
                        </option>
                    ))}
                </select>

                <select
                    value={proTvLineMode}
                    onChange={e => setProTvLineMode(e.target.value)}
                    style={{
                        padding: '8px 10px',
                        fontSize: 13,
                        fontWeight: 700,
                        borderRadius: 6,
                        border: '1px solid #6366f1',
                        cursor: 'pointer',
                        backgroundColor: '#ffffff',
                        color: '#4338ca',
                    }}
                >
                    <option value="2-liner">2-Liner</option>
                    <option value="1-liner">1-Liner</option>
                </select>

                <button
                    onClick={handleAddProTv}
                    style={{
                        padding: '8px 18px',
                        background: 'linear-gradient(135deg, #4f46e5, #4338ca)',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: 6,
                        fontWeight: 700,
                        fontSize: 13,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        boxShadow: '0 2px 6px rgba(79, 70, 229, 0.4)',
                    }}
                >
                    <FaPlus /> Add Pro TV Strip
                </button>

                <span style={{ fontSize: 12, color: '#4338ca', fontStyle: 'italic' }}>
                    ({proTvOptions[selectedProTvIndex]?.desc})
                </span>
            </div>

            {/* 4. 💎 Glass Strips Row */}
            <div style={{
                display: 'flex',
                gap: 12,
                alignItems: 'center',
                marginBottom: 12,
                padding: '12px 16px',
                background: 'linear-gradient(135deg, rgba(240, 249, 255, 0.9), rgba(224, 242, 254, 0.6))',
                borderRadius: 8,
                border: '1px solid #7dd3fc',
                flexWrap: 'wrap'
            }}>
                <label style={{ fontWeight: 700, fontSize: 14, color: '#0369a1', minWidth: 140, display: 'flex', alignItems: 'center', gap: 6 }}>
                    💎 Glass Strips:
                </label>

                <select
                    value={selectedGlassIndex}
                    onChange={e => setSelectedGlassIndex(parseInt(e.target.value))}
                    style={{
                        padding: '8px 12px',
                        fontSize: 14,
                        borderRadius: 6,
                        border: '1px solid #38bdf8',
                        minWidth: 280,
                        cursor: 'pointer',
                        fontWeight: 600,
                        backgroundColor: '#ffffff',
                    }}
                >
                    {glassOptions.map((opt, idx) => (
                        <option key={idx} value={idx}>
                            {opt.title}
                        </option>
                    ))}
                </select>

                <select
                    value={glassLineMode}
                    onChange={e => setGlassLineMode(e.target.value)}
                    style={{
                        padding: '8px 10px',
                        fontSize: 13,
                        fontWeight: 700,
                        borderRadius: 6,
                        border: '1px solid #38bdf8',
                        cursor: 'pointer',
                        backgroundColor: '#ffffff',
                        color: '#0369a1',
                    }}
                >
                    <option value="2-liner">2-Liner</option>
                    <option value="1-liner">1-Liner</option>
                </select>

                <button
                    onClick={handleAddGlass}
                    style={{
                        padding: '8px 18px',
                        background: '#0284c7',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: 6,
                        fontWeight: 700,
                        fontSize: 13,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        boxShadow: '0 2px 4px rgba(2,132,199,0.3)',
                    }}
                >
                    <FaPlus /> Add Glass Strip
                </button>

                <span style={{ fontSize: 12, color: '#0369a1', fontStyle: 'italic' }}>
                    ({glassOptions[selectedGlassIndex]?.desc})
                </span>
            </div>

            {/* 5. ⚡ Neon Light Strips Row */}
            <div style={{
                display: 'flex',
                gap: 12,
                alignItems: 'center',
                marginBottom: 12,
                padding: '12px 16px',
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 10, 40, 0.95))',
                borderRadius: 8,
                border: '1px solid #ff007f',
                boxShadow: '0 0 12px rgba(255, 0, 127, 0.2)',
                flexWrap: 'wrap'
            }}>
                <label style={{ fontWeight: 700, fontSize: 14, color: '#ff007f', minWidth: 140, display: 'flex', alignItems: 'center', gap: 6 }}>
                    ⚡ Neon Strips:
                </label>

                <select
                    value={selectedNeonIndex}
                    onChange={e => setSelectedNeonIndex(parseInt(e.target.value))}
                    style={{
                        padding: '8px 12px',
                        fontSize: 14,
                        borderRadius: 6,
                        border: '1px solid #00f3ff',
                        minWidth: 280,
                        cursor: 'pointer',
                        fontWeight: 600,
                        backgroundColor: '#0f172a',
                        color: '#00f3ff',
                    }}
                >
                    {neonOptions.map((opt, idx) => (
                        <option key={idx} value={idx}>
                            {opt.title}
                        </option>
                    ))}
                </select>

                <select
                    value={neonLineMode}
                    onChange={e => setNeonLineMode(e.target.value)}
                    style={{
                        padding: '8px 10px',
                        fontSize: 13,
                        fontWeight: 700,
                        borderRadius: 6,
                        border: '1px solid #ff007f',
                        cursor: 'pointer',
                        backgroundColor: '#0f172a',
                        color: '#ff007f',
                    }}
                >
                    <option value="2-liner">2-Liner</option>
                    <option value="1-liner">1-Liner</option>
                </select>

                <button
                    onClick={handleAddNeon}
                    style={{
                        padding: '8px 18px',
                        background: 'linear-gradient(135deg, #ff007f, #b026ff)',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: 6,
                        fontWeight: 700,
                        fontSize: 13,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        boxShadow: '0 0 10px rgba(255,0,127,0.5)',
                    }}
                >
                    <FaPlus /> Add Neon Strip
                </button>

                <span style={{ fontSize: 12, color: '#f472b6', fontStyle: 'italic' }}>
                    ({neonOptions[selectedNeonIndex]?.desc})
                </span>
            </div>

            {/* 6. 👑 Luxury, 3D & Esports Row */}
            <div style={{
                display: 'flex',
                gap: 12,
                alignItems: 'center',
                marginBottom: 12,
                padding: '12px 16px',
                background: 'linear-gradient(135deg, rgba(254, 243, 199, 0.8), rgba(253, 230, 138, 0.5))',
                borderRadius: 8,
                border: '1px solid #d97706',
                flexWrap: 'wrap'
            }}>
                <label style={{ fontWeight: 700, fontSize: 14, color: '#b45309', minWidth: 140, display: 'flex', alignItems: 'center', gap: 6 }}>
                    👑 Luxury & Esports:
                </label>

                <select
                    value={selectedLuxuryIndex}
                    onChange={e => setSelectedLuxuryIndex(parseInt(e.target.value))}
                    style={{
                        padding: '8px 12px',
                        fontSize: 14,
                        borderRadius: 6,
                        border: '1px solid #d97706',
                        minWidth: 280,
                        cursor: 'pointer',
                        fontWeight: 600,
                        backgroundColor: '#ffffff',
                    }}
                >
                    {luxuryOptions.map((opt, idx) => (
                        <option key={idx} value={idx}>
                            {opt.title}
                        </option>
                    ))}
                </select>

                <select
                    value={luxuryLineMode}
                    onChange={e => setLuxuryLineMode(e.target.value)}
                    style={{
                        padding: '8px 10px',
                        fontSize: 13,
                        fontWeight: 700,
                        borderRadius: 6,
                        border: '1px solid #d97706',
                        cursor: 'pointer',
                        backgroundColor: '#ffffff',
                        color: '#b45309',
                    }}
                >
                    <option value="2-liner">2-Liner</option>
                    <option value="1-liner">1-Liner</option>
                </select>

                <button
                    onClick={handleAddLuxury}
                    style={{
                        padding: '8px 18px',
                        background: 'linear-gradient(135deg, #d97706, #b45309)',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: 6,
                        fontWeight: 700,
                        fontSize: 13,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        boxShadow: '0 2px 4px rgba(217,119,6,0.3)',
                    }}
                >
                    <FaPlus /> Add Luxury Strip
                </button>

                <span style={{ fontSize: 12, color: '#b45309', fontStyle: 'italic' }}>
                    ({luxuryOptions[selectedLuxuryIndex]?.desc})
                </span>
            </div>

            {/* 7. 📺 Broadcast Strips Row */}
            <div style={{
                display: 'flex',
                gap: 12,
                alignItems: 'center',
                marginBottom: 16,
                padding: '12px 16px',
                background: '#f8fafc',
                borderRadius: 8,
                border: '1px solid #cbd5e1',
                flexWrap: 'wrap'
            }}>
                <label style={{ fontWeight: 700, fontSize: 14, color: '#334155', minWidth: 140, display: 'flex', alignItems: 'center', gap: 6 }}>
                    📺 Regular Strips:
                </label>

                <select
                    value={selectedBroadcastIndex}
                    onChange={e => setSelectedBroadcastIndex(parseInt(e.target.value))}
                    style={{
                        padding: '8px 12px',
                        fontSize: 14,
                        borderRadius: 6,
                        border: '1px solid #94a3b8',
                        minWidth: 280,
                        cursor: 'pointer',
                        fontWeight: 600,
                        backgroundColor: '#ffffff',
                    }}
                >
                    {broadcastOptions.map((opt, idx) => (
                        <option key={idx} value={idx}>
                            {opt.title}
                        </option>
                    ))}
                </select>

                <select
                    value={broadcastLineMode}
                    onChange={e => setBroadcastLineMode(e.target.value)}
                    style={{
                        padding: '8px 10px',
                        fontSize: 13,
                        fontWeight: 700,
                        borderRadius: 6,
                        border: '1px solid #94a3b8',
                        cursor: 'pointer',
                        backgroundColor: '#ffffff',
                        color: '#334155',
                    }}
                >
                    <option value="2-liner">2-Liner</option>
                    <option value="1-liner">1-Liner</option>
                </select>

                <button
                    onClick={handleAddBroadcast}
                    style={{
                        padding: '8px 18px',
                        background: '#475569',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: 6,
                        fontWeight: 700,
                        fontSize: 13,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        boxShadow: '0 2px 4px rgba(71,85,105,0.3)',
                    }}
                >
                    <FaPlus /> Add Broadcast Strip
                </button>

                <span style={{ fontSize: 12, color: '#64748b', fontStyle: 'italic' }}>
                    ({broadcastOptions[selectedBroadcastIndex]?.desc})
                </span>
            </div>
        </div>
    );
};

export default Strips;








