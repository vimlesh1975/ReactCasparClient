import React, { useState } from 'react';
import * as fabric from 'fabric';
import { useSelector } from 'react-redux';
import { generateUniqueId, shadowOptions } from './common';
import { FaPlus, FaPalette } from "react-icons/fa";

const Strips = () => {
    const canvas = useSelector(state => state.canvasReducer.canvas);

    const [primaryColor, setPrimaryColor] = useState('#00d2ff');
    const [secondaryColor, setSecondaryColor] = useState('#ff007f');
    const [bgColor, setBgColor] = useState('#0f172a');
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

    const [selectedGlassIndex, setSelectedGlassIndex] = useState(0);
    const [selectedNeonIndex, setSelectedNeonIndex] = useState(0);
    const [selectedLuxuryIndex, setSelectedLuxuryIndex] = useState(0);
    const [selectedBroadcastIndex, setSelectedBroadcastIndex] = useState(0);

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

    const handleAddGlass = () => {
        if (glassOptions[selectedGlassIndex]) {
            glassOptions[selectedGlassIndex].action();
        }
    };

    const handleAddNeon = () => {
        if (neonOptions[selectedNeonIndex]) {
            neonOptions[selectedNeonIndex].action();
        }
    };

    const handleAddLuxury = () => {
        if (luxuryOptions[selectedLuxuryIndex]) {
            luxuryOptions[selectedLuxuryIndex].action();
        }
    };

    const handleAddBroadcast = () => {
        if (broadcastOptions[selectedBroadcastIndex]) {
            broadcastOptions[selectedBroadcastIndex].action();
        }
    };

    return (
        <div style={{ padding: 15, fontFamily: 'sans-serif', maxWidth: 990 }}>
            <h3 style={{ margin: '0 0 8px 0' }}>Broadcast Graphic Strips Library</h3>
            <p style={{ margin: '0 0 16px 0', fontSize: 13, color: '#666' }}>
                Select a strip style from any category below and click <b>Add</b> to place it onto the graphics canvas.
            </p>

            {/* 1. Glass Strips Row */}
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
                        minWidth: 320,
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

            {/* 2. Neon Light Strips Row */}
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
                        minWidth: 320,
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

            {/* 3. Luxury, 3D & Esports Row */}
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
                        minWidth: 320,
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

            {/* 4. Broadcast Strips Row */}
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
                        minWidth: 320,
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

            {/* 5. Color Controls Bar */}
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '10px 14px', background: '#f8fafc', borderRadius: 6, border: '1px solid #e2e8f0', flexWrap: 'wrap' }}>
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
        </div>
    );
};

export default Strips;





