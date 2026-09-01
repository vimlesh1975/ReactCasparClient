import React, { useState } from 'react';
import * as fabric from 'fabric';
import { useSelector } from 'react-redux';
import { generateUniqueId, shadowOptions } from './common';
import { FaPlus, FaTrash, FaPalette } from "react-icons/fa";

const Strips = () => {
    const canvas = useSelector(state => state.canvasReducer.canvas);

    const [primaryColor, setPrimaryColor] = useState('#00d2ff');
    const [secondaryColor, setSecondaryColor] = useState('#ff007f');
    const [bgColor, setBgColor] = useState('rgba(15, 23, 42, 0.88)');
    const [textColor, setTextColor] = useState('#ffffff');
    const [accentColor, setAccentColor] = useState('#facc15');

    const addGroupToCanvas = (objects, options = {}) => {
        if (!canvas) return;
        objects.forEach(obj => {
            const id = generateUniqueId(obj);
            obj.set({ id, class: id, objectCaching: false });
        });

        const id = generateUniqueId({ type: 'group' });
        const group = new fabric.Group(objects, {
            id,
            class: id,
            subTargetCheck: true,
            shadow: { ...shadowOptions, blur: 20 },
            ...options
        });

        canvas.add(group);
        canvas.setActiveObject(group);
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

    const [selectedStripIndex, setSelectedStripIndex] = useState(0);

    const stripOptions = [
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

    const handleAddSelected = () => {
        if (stripOptions[selectedStripIndex]) {
            stripOptions[selectedStripIndex].action();
        }
    };

    return (
        <div style={{ padding: 15, fontFamily: 'sans-serif', maxWidth: 900 }}>
            <h3 style={{ margin: '0 0 10px 0' }}>Broadcast Graphic Strips Library</h3>
            <p style={{ margin: '0 0 15px 0', fontSize: 13, color: '#666' }}>
                Select any broadcast strip from the dropdown and click <b>Add to Canvas</b> to place it onto the graphics canvas.
            </p>

            {/* Strip Selector & Add Action */}
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 15, padding: 12, background: '#f1f5f9', borderRadius: 8, border: '1px solid #cbd5e1', flexWrap: 'wrap' }}>
                <label style={{ fontWeight: 600, fontSize: 14 }}>Select Strip:</label>
                <select
                    value={selectedStripIndex}
                    onChange={e => setSelectedStripIndex(parseInt(e.target.value))}
                    style={{
                        padding: '8px 12px',
                        fontSize: 15,
                        borderRadius: 6,
                        border: '1px solid #94a3b8',
                        minWidth: 320,
                        cursor: 'pointer',
                        fontWeight: 600,
                        backgroundColor: '#ffffff',
                    }}
                >
                    {stripOptions.map((opt, idx) => (
                        <option key={idx} value={idx}>
                            {opt.title}
                        </option>
                    ))}
                </select>

                <button
                    onClick={handleAddSelected}
                    style={{
                        padding: '9px 20px',
                        background: '#2563eb',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: 6,
                        fontWeight: 700,
                        fontSize: 14,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        boxShadow: '0 2px 4px rgba(37,99,235,0.3)',
                    }}
                >
                    <FaPlus /> Add to Canvas
                </button>

                <span style={{ fontSize: 13, color: '#64748b', fontStyle: 'italic', marginLeft: 6 }}>
                    ({stripOptions[selectedStripIndex]?.desc})
                </span>
            </div>

            {/* Color Controls */}
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', padding: 10, background: '#f8fafc', borderRadius: 6, border: '1px solid #e2e8f0', flexWrap: 'wrap' }}>
                <span style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
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
                    Sub-text:
                    <input type="color" value={accentColor} onChange={e => setAccentColor(e.target.value)} style={{ cursor: 'pointer' }} />
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
                    Text:
                    <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} style={{ cursor: 'pointer' }} />
                </label>
            </div>
        </div>
    );
};

export default Strips;


