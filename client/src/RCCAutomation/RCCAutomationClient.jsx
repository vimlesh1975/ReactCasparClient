'use client';
import React, { useState } from 'react';

const RCCAutomationClient = () => {
    const [pageName, setPageName] = useState('Twoliner');
    const [fill, setFill] = useState('#ff0000');
    const [backgroundColor, setBackgroundColor] = useState('#ffff00');
    const [shadow, setShadow] = useState('#ff00ff');
    const [initialMinute, setInitialMinute] = useState('30');
    const [initialSecond, setInitialSecond] = useState('50');
    const [countUp, setCountUp] = useState(true);
    const [rowCommand, setRowCommand] = useState(`play 1-1 red\nplay 1-2 blue\nmixer 1-2 fill .3 .4 .3 .4`);
    const [demo, setDemo] = useState('');

    const sendPost = async (url, params) => {
        const res = await fetch(`https://localhost:9000/${url}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(params),
        });
        const text = await res.text();
        setDemo(text);
    };
    // eslint-disable-next-line
    const getCommonData = () => {
        const bb = Math.floor(Math.random() * 100);
        return [
            { key: "f0", value: `https://picsum.photos/id/${bb}/300/200`, type: "text" },
            { key: "img1", value: `https://picsum.photos/id/${bb}/300/200`, type: "image" },
            { key: "f0", value: fill, type: "fill" },
            { key: "f0", value: backgroundColor, type: "backgroundColor" },
            { key: "f0", value: { color: shadow }, type: "shadow" },
            { key: "f0", value: 'aaaaaa', type: "text" },
            { key: "f0", value: 'bbbbbb', type: "text" },
        ];
    };

    const getTemplateList = () => {
        console.log('object')
        sendPost('getTemplateList', {});
    };

    const recallPage = () => {
        sendPost('recallPage', {
            layerNumber: 96,
            pageName,
            data: JSON.stringify([{ key: "f0", value: 'aaaaaa', type: "text" },
            { key: "f1", value: 'bbbbbb', type: "text" },]),
        });
    };

    const updateData = () => {
        sendPost('updateData', {
            layerNumber: 96,
            pageName,
            data: JSON.stringify([{ key: "f0", value: 'aaaaaa', type: "text" },
            { key: "f1", value: 'bbbbbb', type: "text" },]),
        });
    };

    const stopGraphics = () => {
        sendPost('stopGraphics', { layerNumber: 96 });
    };

    const startGameTimer = () => {
        sendPost('startGameTimer', {
            layerNumber: 96,
            pageName: 'gametimer1',
            data: JSON.stringify([{ key: 'gameTimer1', value: `${initialMinute}:${initialSecond}`, type: 'text' }]),
            initialMinute,
            initialSecond,
            countUp,
        });
    };

    const pauseGameTimer = () => {
        sendPost('pauseGameTimer', { layerNumber: 96 });
    };

    const resumeGameTimer = () => {
        sendPost('resumeGameTimer', { layerNumber: 96, countUp });
    };

    const sendAMCPCommand = () => {
        const commands = rowCommand.trim().split('\n');
        commands.forEach(cmd => {
            sendPost('endpoint', { string: cmd });
        });
    };

    return (
        <div>
            <h1>RCCAutomationClientHtml</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>

                <button onClick={getTemplateList}>getTemplateList</button>
                <button onClick={recallPage}>Call page</button>
                <button onClick={updateData}>updateData</button>
                <button onClick={stopGraphics}>stopGraphics</button>
                <div>
                    <label>pageName:</label>
                    <input value={pageName} onChange={(e) => setPageName(e.target.value)} />
                </div>
                <div>
                    <label>Select Fill Color:</label>
                    <input type="color" value={fill} onChange={(e) => setFill(e.target.value)} />
                </div>
                <div>
                    <label>Select backgroundColor:</label>
                    <input type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} />
                </div>
                <div>
                    <label>Select shadow:</label>
                    <input type="color" value={shadow} onChange={(e) => setShadow(e.target.value)} />
                </div>
            </div>

            <div style={{ backgroundColor: 'blanchedalmond', marginTop: '1rem' }}>
                <label>initialMinute</label>
                <input style={{ width: 40 }} value={initialMinute} onChange={(e) => setInitialMinute(e.target.value)} />
                <label>initialSecond</label>
                <input style={{ width: 40 }} value={initialSecond} onChange={(e) => setInitialSecond(e.target.value)} />
                <label>
                    CountUp
                    <input type="checkbox" checked={countUp} onChange={(e) => setCountUp(e.target.checked)} />
                </label>
                <button onClick={startGameTimer}>Show game Timer</button>
                <button onClick={pauseGameTimer}>Pause game Timer</button>
                <button onClick={resumeGameTimer}>Resume game Timer</button>
            </div>

            <div style={{ marginTop: '1rem' }}>
                <label>Row Commands</label>
                <br />
                <textarea
                    style={{ width: 500, height: 150 }}
                    value={rowCommand}
                    onChange={(e) => setRowCommand(e.target.value)}
                />
                <br />
                <button onClick={sendAMCPCommand}>Send</button>
            </div>

            <div>
                <label>{demo}</label>
            </div>
        </div>
    );
};

export default RCCAutomationClient;
