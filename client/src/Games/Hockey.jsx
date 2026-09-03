import React, { useState } from 'react';
import { endpoint, stopGraphics, recallPage, executeScript, generalFileName, saveFile, clieentPublicFolder, templateLayers } from '../common';
import { FaPlay, FaStop, FaPause, FaPlus, FaMinus, FaTrash, FaExchangeAlt, FaClock, FaTrophy, FaUsers, FaUpload, FaSave, FaFolderOpen } from "react-icons/fa";
import { GrResume } from "react-icons/gr";
import { iniplayerList1, iniplayerList2 } from '../hockeyData';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { VscMove } from "react-icons/vsc";

var xxx;

const Hockey = () => {
    const [playerList1, setPlayerList1] = useState(iniplayerList1);
    const [playerList2, setPlayerList2] = useState(iniplayerList2);

    const [inPlayer, setInPlayer] = useState('45 Narsimha Chavhan');
    const [outPlayer, setOutPlayer] = useState('48 Vijay Ingle');

    const canvasList = useSelector(state => state.canvasListReducer.canvasList);
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const dispatch = useDispatch();
    const currentscreenSize = useSelector(state => state.currentscreenSizeReducer.currentscreenSize);

    const [currentPlayer1, setCurrentPlayer1] = useState(iniplayerList1[0] || 'Vimlesh Kumar 1');
    const [currentPlayer2, setCurrentPlayer2] = useState(iniplayerList2[0] || 'Vimlesh Kumar 2');
    const [team1Goal, setTeam1Goal] = useState(0);
    const [team1Logo, setTeam1Logo] = useState(clieentPublicFolder() + '/img/flag/Albania.png');
    const [team2Logo, setTeam2Logo] = useState(clieentPublicFolder() + '/img/flag/Mauritania.png');

    const [team1, setTeam1] = useState('Albania');
    const [team2, setTeam2] = useState('Mauritania');

    const [team2Goal, setTeam2Goal] = useState(0);

    const [initialMinute, setInitilaMinute] = useState(15);
    const [initialSecond, setInitialSecond] = useState(0);

    const [countUp, setCountUp] = useState(false);
    const [clockStatus, setClockStatus] = useState('Stopped'); // 'Running' | 'Paused' | 'Stopped'

    // Drag & Drop Handlers
    const onDragEnd1 = (result) => {
        if (!result.destination) return;
        const items = [...playerList1];
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setPlayerList1(items);
    };

    const onDragEnd2 = (result) => {
        if (!result.destination) return;
        const items = [...playerList2];
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setPlayerList2(items);
    };

    // Player Editing
    const updatePlayerName1 = (index, value) => {
        const updated = [...playerList1];
        updated[index] = value;
        setPlayerList1(updated);
    };

    const updatePlayerName2 = (index, value) => {
        const updated = [...playerList2];
        updated[index] = value;
        setPlayerList2(updated);
    };

    const addPlayer1 = () => {
        setPlayerList1([...playerList1, `Player ${playerList1.length + 1}`]);
    };

    const addPlayer2 = () => {
        setPlayerList2([...playerList2, `Player ${playerList2.length + 1}`]);
    };

    const deletePlayer1 = (index) => {
        if (playerList1.length <= 1) return;
        setPlayerList1(playerList1.filter((_, i) => i !== index));
    };

    const deletePlayer2 = (index) => {
        if (playerList2.length <= 1) return;
        setPlayerList2(playerList2.filter((_, i) => i !== index));
    };

    // Clock Controls
    const pauseClock = (layerNumber) => {
        clearInterval(xxx);
        setClockStatus('Paused');
        endpoint(`call ${window.chNumber}-${layerNumber} "
        clearInterval(xxx);
        "`);
        executeScript(`clearInterval(xxx)`);
    };

    const resumeClock = (layerNumber) => {
        setClockStatus('Running');
        var startTime = new Date();
        startTime.setMinutes(initialMinute);
        startTime.setSeconds(initialSecond);
        clearInterval(xxx);
        xxx = setInterval(() => {
            countUp ? startTime.setSeconds(startTime.getSeconds() + 1) : startTime.setSeconds(startTime.getSeconds() - 1);
            setInitilaMinute(startTime.getMinutes());
            setInitialSecond(startTime.getSeconds());
        }, 1000);

        const script = `
        startTime.setMinutes(${initialMinute});
        startTime.setSeconds(${initialSecond});
        clearInterval(xxx);
        xxx=setInterval(()=>{
            startTime.setSeconds(startTime.getSeconds() ${countUp ? '+' : '-'} 1);
            var ss1 = ((startTime.getMinutes()).toString()).padStart(2, '0') + ':' + ((startTime.getSeconds()).toString()).padStart(2, '0');
            cc.textContent = ss1;
        }, 1000);
        `;
        executeScript(script);
        endpoint(`call ${window.chNumber}-${layerNumber} "
        ${script}
        "`);
    };

    const stopClock = (layerNumber) => {
        clearInterval(xxx);
        setClockStatus('Stopped');
        stopGraphics(layerNumber);
        executeScript(`if(window.xxx){clearInterval(xxx)}`);
        executeScript(`document.getElementById('divid_${layerNumber}')?.remove()`);
    };

    const showClock = (pageName) => {
        const index = canvasList.findIndex(val => val.pageName === pageName);
        if (index !== -1) {
            const layerNumber = templateLayers.hockeyclockLayer;
            executeScript(`if(window.xxx){clearInterval(xxx)}`);
            executeScript(`document.getElementById('divid_${layerNumber}')?.remove()`);

            var startTime = new Date();
            startTime.setMinutes(initialMinute);
            startTime.setSeconds(initialSecond);
            clearInterval(xxx);
            setClockStatus('Running');
            xxx = setInterval(() => {
                countUp ? startTime.setSeconds(startTime.getSeconds() + 1) : startTime.setSeconds(startTime.getSeconds() - 1);
                setInitilaMinute(startTime.getMinutes());
                setInitialSecond(startTime.getSeconds());
            }, 1000);

            dispatch({ type: 'CHANGE_CURRENT_PAGE', payload: index });
            canvas.loadFromJSON(canvasList[index].pageValue).then(() => {
                canvas.requestRenderAll();
            });

            endpoint(`mixer ${window.chNumber}-${layerNumber} fill 0 0 0 1 6 ${window.animationMethod}`);
            setTimeout(() => {
                endpoint(`play ${window.chNumber}-${layerNumber} [HTML] xyz.html`);
            }, 250);

            const script = `
            window.aa = document.createElement('div');
            aa.style.position='absolute';
            aa.setAttribute('id','divid_' + '${layerNumber}');
            aa.style.zIndex = ${layerNumber};
            aa.innerHTML=\`${(canvas.toSVG(['id', 'class', 'selectable'])).replaceAll('"', '\\"')}\`;
            document.body.appendChild(aa);
            document.body.style.margin='0';
            document.body.style.padding='0';
            aa.style.zoom=(${currentscreenSize * 100}/1920)+'%';
            document.body.style.overflow='hidden';
            window.cc=document.getElementsByTagName('tspan')[0];
            cc.textContent='';
            window.startTime = new Date();
            startTime.setMinutes(${initialMinute});
            startTime.setSeconds(${initialSecond});
            window.xxx=setInterval(()=>{
               startTime.setSeconds(startTime.getSeconds() ${countUp ? '+' : '-'} 1);
                var ss1 = ((startTime.getMinutes()).toString()).padStart(2, '0') + ':' + ((startTime.getSeconds()).toString()).padStart(2, '0');
                cc.textContent = ss1;
              }, 1000);
            `;
            executeScript(script);
            setTimeout(() => {
                endpoint(`call ${window.chNumber}-${layerNumber} "
                ${script}
                "`);
            }, 300);

            setTimeout(() => {
                endpoint(`mixer ${window.chNumber}-${layerNumber} fill 0 0 1 1 10 ${window.animationMethod}`);
            }, 800);
        } else {
            alert(`${pageName} page not found in canvas list. Make a page with name 'Clock', add a text and set id of text as f0 then update the page`);
        }
    };

    // File IO
    const fileSaveAs = (playerList, teamName) => {
        let content = '';
        playerList.forEach(val => {
            content += val + '\r\n';
        });
        const data = new Blob([content], { type: 'text/plain' });
        const options = {
            fileExtension: '.txt',
            suggestedName: `Hockey_${teamName || 'Team'}_` + generalFileName(),
            types: [{ description: 'Text Files', accept: { 'text/plain': ['.txt'] } }],
        };
        saveFile(options, data);
    };

    const handleFileChosen1 = (file) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            const lines = reader.result.split(/\r?\n/).filter(line => line.trim() !== '');
            if (lines.length > 0) setPlayerList1(lines);
        };
        reader.readAsText(file);
    };

    const handleFileChosen2 = (file) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            const lines = reader.result.split(/\r?\n/).filter(line => line.trim() !== '');
            if (lines.length > 0) setPlayerList2(lines);
        };
        reader.readAsText(file);
    };

    // Styles
    const cardStyle = {
        backgroundColor: '#1e293b',
        borderRadius: '8px',
        border: '1px solid #334155',
        padding: '12px',
        color: '#f8fafc',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
        marginBottom: '12px',
        boxSizing: 'border-box',
        minWidth: 0,
    };

    const sectionHeaderStyle = {
        fontSize: '13px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        color: '#94a3b8',
        marginBottom: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
    };

    const btnBase = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '5px',
        padding: '5px 10px',
        borderRadius: '5px',
        border: 'none',
        fontWeight: '600',
        fontSize: '12px',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        flexShrink: 0,
    };

    const playBtnStyle = {
        ...btnBase,
        backgroundColor: '#10b981',
        color: '#ffffff',
    };

    const stopBtnStyle = {
        ...btnBase,
        backgroundColor: '#ef4444',
        color: '#ffffff',
    };

    const pauseBtnStyle = {
        ...btnBase,
        backgroundColor: '#f59e0b',
        color: '#ffffff',
    };

    const actionBtnStyle = {
        ...btnBase,
        backgroundColor: '#0284c7',
        color: '#ffffff',
    };

    const stepperBtn = {
        width: '28px',
        height: '28px',
        backgroundColor: '#334155',
        color: '#ffffff',
        border: '1px solid #475569',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    };

    const inputBase = {
        backgroundColor: '#0f172a',
        border: '1px solid #334155',
        borderRadius: '4px',
        color: '#ffffff',
        padding: '4px 8px',
        fontSize: '12px',
        boxSizing: 'border-box',
        minWidth: 0,
    };

    return (
        <div style={{ padding: '8px', fontFamily: 'Inter, system-ui, sans-serif', color: '#f8fafc', width: '100%', boxSizing: 'border-box' }}>
            {/* Top Toolbar / Quick Global Status */}
            <div style={{ ...cardStyle, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '16px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        🏑 Field Hockey Playout Control
                    </span>
                    <span style={{ fontSize: '12px', backgroundColor: '#334155', padding: '3px 8px', borderRadius: '12px', color: '#94a3b8' }}>
                        Gen: L{templateLayers.hockeygenerallayer} | Score: L{templateLayers.hockeyscoreLayer} | Clock: L{templateLayers.hockeyclockLayer}
                    </span>
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    <button style={stopBtnStyle} onClick={() => stopGraphics(templateLayers.hockeygenerallayer)}>
                        <FaStop /> Stop General
                    </button>
                    <button style={stopBtnStyle} onClick={() => stopGraphics(templateLayers.hockeyscoreLayer)}>
                        <FaStop /> Stop Score
                    </button>
                    <button style={stopBtnStyle} onClick={() => stopClock(templateLayers.hockeyclockLayer)}>
                        <FaStop /> Stop Clock
                    </button>
                </div>
            </div>

            {/* 3-Column Main Workspace */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px', alignItems: 'start', width: '100%', boxSizing: 'border-box' }}>
                
                {/* LEFT COLUMN: Team 1 Roster */}
                <div style={cardStyle}>
                    <div style={{ ...sectionHeaderStyle, justifyContent: 'space-between' }}>
                        <span style={{ color: '#38bdf8' }}><FaUsers /> Team 1 Roster ({team1})</span>
                        <div style={{ display: 'flex', gap: '4px' }}>
                            <button style={{ ...actionBtnStyle, padding: '3px 6px', fontSize: '11px' }} onClick={() => fileSaveAs(playerList1, team1)} title="Save Roster">
                                <FaSave />
                            </button>
                            <label style={{ ...actionBtnStyle, padding: '3px 6px', fontSize: '11px', cursor: 'pointer' }} title="Load Roster">
                                <FaFolderOpen />
                                <input type="file" accept=".txt" onChange={e => handleFileChosen1(e.target.files[0])} style={{ display: 'none' }} />
                            </label>
                        </div>
                    </div>

                    {/* Team 1 Actions */}
                    <div style={{ display: 'flex', gap: '6px', marginBottom: '8px', flexWrap: 'wrap' }}>
                        <button style={playBtnStyle} onClick={() => recallPage(templateLayers.hockeygenerallayer, 'PlayerId1', [{ key: 'f0', value: currentPlayer1, type: 'text' }], canvasList, canvas, currentscreenSize)}>
                            Player 1 Bug <FaPlay />
                        </button>
                        <button style={actionBtnStyle} onClick={() => recallPage(templateLayers.hockeygenerallayer, 'TeamList', [
                            { key: 'f0', value: team1, type: 'text' },
                            { key: 'f1', value: playerList1[0] || '', type: 'text' },
                            { key: 'f2', value: playerList1[1] || '', type: 'text' },
                            { key: 'f3', value: playerList1[2] || '', type: 'text' },
                            { key: 'f4', value: playerList1[3] || '', type: 'text' },
                            { key: 'f5', value: playerList1[4] || '', type: 'text' },
                            { key: 'f6', value: playerList1[5] || '', type: 'text' },
                            { key: 'f7', value: playerList1[6] || '', type: 'text' },
                            { key: 'f8', value: playerList1[7] || '', type: 'text' },
                            { key: 'f9', value: playerList1[8] || '', type: 'text' },
                            { key: 'f10', value: playerList1[9] || '', type: 'text' },
                            { key: 'f11', value: playerList1[10] || '', type: 'text' },
                            { key: 'f12', value: playerList1[11] || '', type: 'text' },
                        ], canvasList, canvas, currentscreenSize)}>
                            TeamList 1 <FaPlay />
                        </button>
                    </div>

                    <div style={{ fontSize: '12px', marginBottom: '6px', color: '#cbd5e1', padding: '4px 8px', backgroundColor: '#0f172a', borderRadius: '4px', display: 'flex', justifyContent: 'space-between' }}>
                        <span>Active Player:</span> <b style={{ color: '#38bdf8' }}>{currentPlayer1}</b>
                    </div>

                    {/* Drag-and-Drop Player List 1 */}
                    <DragDropContext onDragEnd={onDragEnd1}>
                        <Droppable droppableId="droppable-team1" type="PERSON1">
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    style={{
                                        backgroundColor: snapshot.isDraggingOver ? '#1e3a5f' : '#0f172a',
                                        borderRadius: '6px',
                                        border: '1px solid #334155',
                                        maxHeight: '440px',
                                        overflowY: 'auto',
                                        padding: '4px',
                                        boxSizing: 'border-box',
                                    }}
                                    {...provided.droppableProps}
                                >
                                    {playerList1.map((val, i) => (
                                        <Draggable draggableId={"team1_player_" + i} key={"team1_player_" + i} index={i}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    style={{
                                                        ...provided.draggableProps.style,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '4px',
                                                        padding: '3px 4px',
                                                        marginBottom: '3px',
                                                        borderRadius: '4px',
                                                        backgroundColor: snapshot.isDragging ? '#2563eb' : (currentPlayer1 === val ? '#1e293b' : '#1e293b77'),
                                                        border: currentPlayer1 === val ? '1px solid #38bdf8' : '1px solid transparent',
                                                        boxSizing: 'border-box',
                                                        minWidth: 0,
                                                    }}
                                                >
                                                    <span {...provided.dragHandleProps} style={{ cursor: 'grab', color: '#64748b', flexShrink: 0, display: 'inline-flex', alignItems: 'center' }}>
                                                        <VscMove />
                                                    </span>
                                                    <span style={{ fontSize: '11px', width: '18px', color: '#64748b', textAlign: 'right', flexShrink: 0 }}>{i + 1}.</span>
                                                    <input
                                                        type="text"
                                                        value={val}
                                                        onChange={e => updatePlayerName1(i, e.target.value)}
                                                        onClick={() => setCurrentPlayer1(val)}
                                                        style={{
                                                            ...inputBase,
                                                            flex: 1,
                                                            minWidth: 0,
                                                            padding: '2px 6px',
                                                            backgroundColor: 'transparent',
                                                            border: 'none',
                                                            color: '#f8fafc',
                                                            fontSize: '12px',
                                                            cursor: 'pointer',
                                                        }}
                                                    />
                                                    <button
                                                        type="button"
                                                        style={{ ...btnBase, padding: '2px 5px', fontSize: '10px', backgroundColor: '#0284c7', flexShrink: 0 }}
                                                        onClick={() => setInPlayer(val)}
                                                        title="Set as IN substitution player"
                                                    >
                                                        IN
                                                    </button>
                                                    <button
                                                        type="button"
                                                        style={{ ...btnBase, padding: '2px 5px', fontSize: '10px', backgroundColor: '#e11d48', flexShrink: 0 }}
                                                        onClick={() => setOutPlayer(val)}
                                                        title="Set as OUT substitution player"
                                                    >
                                                        OUT
                                                    </button>
                                                    <button
                                                        type="button"
                                                        style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '2px', flexShrink: 0, display: 'inline-flex', alignItems: 'center' }}
                                                        onClick={() => deletePlayer1(i)}
                                                        title="Delete Player"
                                                    >
                                                        <FaTrash size={10} />
                                                    </button>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>

                    <button
                        type="button"
                        style={{ ...actionBtnStyle, width: '100%', marginTop: '6px', backgroundColor: '#334155' }}
                        onClick={addPlayer1}
                    >
                        <FaPlus size={10} /> Add Player to Team 1
                    </button>
                </div>

                {/* CENTER COLUMN: Match Matchup, Live Score, Clock, Substitutions */}
                <div>
                    {/* Versus Matchup Section */}
                    <div style={cardStyle}>
                        <div style={sectionHeaderStyle}>
                            <FaTrophy style={{ color: '#f59e0b' }} /> Match Setup & Versus
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                            {/* Team 1 Identity */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: 0 }}>
                                <label style={{ fontSize: '11px', color: '#94a3b8' }}>Team 1 Name</label>
                                <input
                                    type="text"
                                    value={team1}
                                    onChange={e => setTeam1(e.target.value)}
                                    style={inputBase}
                                />
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px', flexWrap: 'wrap' }}>
                                    <img src={team1Logo} alt="Team 1 Flag" style={{ width: '48px', height: '32px', objectFit: 'contain', border: '1px solid #475569', borderRadius: '4px', backgroundColor: '#0f172a', flexShrink: 0 }} />
                                    <label style={{ ...actionBtnStyle, fontSize: '11px', padding: '4px 8px', cursor: 'pointer' }}>
                                        <FaUpload /> Flag 1
                                        <input type="file" onChange={e => {
                                            const reader = new FileReader();
                                            reader.onloadend = () => setTeam1Logo(reader.result);
                                            if (e.target.files[0]) reader.readAsDataURL(e.target.files[0]);
                                        }} style={{ display: 'none' }} />
                                    </label>
                                </div>
                            </div>

                            {/* Team 2 Identity */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: 0 }}>
                                <label style={{ fontSize: '11px', color: '#94a3b8' }}>Team 2 Name</label>
                                <input
                                    type="text"
                                    value={team2}
                                    onChange={e => setTeam2(e.target.value)}
                                    style={inputBase}
                                />
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px', flexWrap: 'wrap' }}>
                                    <img src={team2Logo} alt="Team 2 Flag" style={{ width: '48px', height: '32px', objectFit: 'contain', border: '1px solid #475569', borderRadius: '4px', backgroundColor: '#0f172a', flexShrink: 0 }} />
                                    <label style={{ ...actionBtnStyle, fontSize: '11px', padding: '4px 8px', cursor: 'pointer' }}>
                                        <FaUpload /> Flag 2
                                        <input type="file" onChange={e => {
                                            const reader = new FileReader();
                                            reader.onloadend = () => setTeam2Logo(reader.result);
                                            if (e.target.files[0]) reader.readAsDataURL(e.target.files[0]);
                                        }} style={{ display: 'none' }} />
                                    </label>
                                </div>
                            </div>
                        </div>

                        <button
                            style={{ ...playBtnStyle, width: '100%' }}
                            onClick={() => recallPage(templateLayers.hockeygenerallayer, 'Versus', [
                                { key: 'f0', value: team1, type: 'text' },
                                { key: 'f1', value: team2, type: 'text' },
                                { key: 'img1', value: team1Logo, type: 'image' },
                                { key: 'img2', value: team2Logo, type: 'image' }
                            ], canvasList, canvas, currentscreenSize)}
                        >
                            Play Versus Graphic <FaPlay />
                        </button>
                    </div>

                    {/* Live Scoreboard Section */}
                    <div style={cardStyle}>
                        <div style={sectionHeaderStyle}>
                            <FaTrophy style={{ color: '#10b981' }} /> Live Scoreboard
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '10px' }}>
                            {/* Team 1 Score Stepper */}
                            <div style={{ backgroundColor: '#0f172a', padding: '8px', borderRadius: '6px', border: '1px solid #334155', minWidth: 0 }}>
                                <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#38bdf8', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{team1}</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <button style={stepperBtn} onClick={() => setTeam1Goal(val => Math.max(0, parseInt(val || 0) - 1))}><FaMinus size={10} /></button>
                                    <input
                                        type="number"
                                        value={team1Goal}
                                        onChange={e => setTeam1Goal(e.target.value)}
                                        style={{ ...inputBase, width: '50px', textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}
                                    />
                                    <button style={stepperBtn} onClick={() => setTeam1Goal(val => parseInt(val || 0) + 1)}><FaPlus size={10} /></button>
                                </div>
                            </div>

                            {/* Team 2 Score Stepper */}
                            <div style={{ backgroundColor: '#0f172a', padding: '8px', borderRadius: '6px', border: '1px solid #334155', minWidth: 0 }}>
                                <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#f43f5e', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{team2}</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <button style={stepperBtn} onClick={() => setTeam2Goal(val => Math.max(0, parseInt(val || 0) - 1))}><FaMinus size={10} /></button>
                                    <input
                                        type="number"
                                        value={team2Goal}
                                        onChange={e => setTeam2Goal(e.target.value)}
                                        style={{ ...inputBase, width: '50px', textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}
                                    />
                                    <button style={stepperBtn} onClick={() => setTeam2Goal(val => parseInt(val || 0) + 1)}><FaPlus size={10} /></button>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '6px' }}>
                            <button
                                style={{ ...playBtnStyle, flex: 1 }}
                                onClick={() => recallPage(templateLayers.hockeyscoreLayer, 'Score', [
                                    { key: 'f0', value: team1, type: 'text' },
                                    { key: 'f1', value: team2, type: 'text' },
                                    { key: 'f2', value: team1Goal, type: 'text' },
                                    { key: 'f3', value: team2Goal, type: 'text' }
                                ], canvasList, canvas, currentscreenSize)}
                            >
                                Play Score Bug <FaPlay />
                            </button>
                            <button style={stopBtnStyle} onClick={() => stopGraphics(templateLayers.hockeyscoreLayer)}>
                                <FaStop />
                            </button>
                        </div>
                    </div>

                    {/* Match Clock Section */}
                    <div style={cardStyle}>
                        <div style={{ ...sectionHeaderStyle, justifyContent: 'space-between', flexWrap: 'wrap' }}>
                            <span style={{ color: '#fbbf24' }}><FaClock /> Match Clock</span>
                            <span style={{
                                fontSize: '11px',
                                padding: '2px 8px',
                                borderRadius: '10px',
                                backgroundColor: clockStatus === 'Running' ? '#065f46' : (clockStatus === 'Paused' ? '#92400e' : '#334155'),
                                color: clockStatus === 'Running' ? '#34d399' : (clockStatus === 'Paused' ? '#fcd34d' : '#94a3b8'),
                            }}>
                                {clockStatus}: {String(initialMinute).padStart(2, '0')}:{String(initialSecond).padStart(2, '0')}
                            </span>
                        </div>

                        {/* Clock Setup Inputs & Presets */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <label style={{ fontSize: '11px', color: '#94a3b8' }}>Min:</label>
                                <input
                                    type="number"
                                    value={initialMinute}
                                    onChange={e => setInitilaMinute(parseInt(e.target.value) || 0)}
                                    style={{ ...inputBase, width: '45px', textAlign: 'center' }}
                                />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <label style={{ fontSize: '11px', color: '#94a3b8' }}>Sec:</label>
                                <input
                                    type="number"
                                    value={initialSecond}
                                    onChange={e => setInitialSecond(parseInt(e.target.value) || 0)}
                                    style={{ ...inputBase, width: '45px', textAlign: 'center' }}
                                />
                            </div>
                            <label style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', color: '#cbd5e1' }}>
                                <input
                                    type="checkbox"
                                    checked={countUp}
                                    onChange={e => setCountUp(e.target.checked)}
                                />
                                Count Up
                            </label>

                            {/* Quick Quarter Presets */}
                            <div style={{ display: 'flex', gap: '3px', marginLeft: 'auto' }}>
                                <button type="button" style={{ ...actionBtnStyle, padding: '2px 5px', fontSize: '10px' }} onClick={() => { setInitilaMinute(15); setInitialSecond(0); }}>15m</button>
                                <button type="button" style={{ ...actionBtnStyle, padding: '2px 5px', fontSize: '10px' }} onClick={() => { setInitilaMinute(30); setInitialSecond(0); }}>30m</button>
                                <button type="button" style={{ ...actionBtnStyle, padding: '2px 5px', fontSize: '10px' }} onClick={() => { setInitilaMinute(0); setInitialSecond(0); }}>00m</button>
                            </div>
                        </div>

                        {/* Clock Action Triggers */}
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                            <button style={{ ...playBtnStyle, flex: 1, minWidth: '100px' }} onClick={() => showClock('Clock')}>
                                Play Clock <FaPlay />
                            </button>
                            <button style={pauseBtnStyle} onClick={() => pauseClock(templateLayers.hockeyclockLayer)}>
                                <FaPause /> Pause
                            </button>
                            <button style={actionBtnStyle} onClick={() => resumeClock(templateLayers.hockeyclockLayer)}>
                                <GrResume /> Resume
                            </button>
                            <button style={stopBtnStyle} onClick={() => stopClock(templateLayers.hockeyclockLayer)}>
                                <FaStop />
                            </button>
                        </div>
                    </div>

                    {/* Substitution (IN / OUT) Section */}
                    <div style={cardStyle}>
                        <div style={sectionHeaderStyle}>
                            <FaExchangeAlt style={{ color: '#a855f7' }} /> Player Substitution
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                            <div style={{ minWidth: 0 }}>
                                <label style={{ fontSize: '11px', color: '#10b981', fontWeight: 'bold' }}>🟢 IN PLAYER</label>
                                <input
                                    type="text"
                                    value={inPlayer}
                                    onChange={e => setInPlayer(e.target.value)}
                                    style={{ ...inputBase, width: '100%' }}
                                />
                            </div>
                            <div style={{ minWidth: 0 }}>
                                <label style={{ fontSize: '11px', color: '#ef4444', fontWeight: 'bold' }}>🔴 OUT PLAYER</label>
                                <input
                                    type="text"
                                    value={outPlayer}
                                    onChange={e => setOutPlayer(e.target.value)}
                                    style={{ ...inputBase, width: '100%' }}
                                />
                            </div>
                        </div>
                        <button
                            style={{ ...playBtnStyle, width: '100%', backgroundColor: '#8b5cf6' }}
                            onClick={() => recallPage(templateLayers.hockeygenerallayer, 'InOut', [
                                { key: 'f0', value: inPlayer, type: 'text' },
                                { key: 'f1', value: outPlayer, type: 'text' }
                            ], canvasList, canvas, currentscreenSize)}
                        >
                            Play IN/OUT Graphic <FaPlay />
                        </button>
                    </div>
                </div>

                {/* RIGHT COLUMN: Team 2 Roster */}
                <div style={cardStyle}>
                    <div style={{ ...sectionHeaderStyle, justifyContent: 'space-between' }}>
                        <span style={{ color: '#f43f5e' }}><FaUsers /> Team 2 Roster ({team2})</span>
                        <div style={{ display: 'flex', gap: '4px' }}>
                            <button style={{ ...actionBtnStyle, padding: '3px 6px', fontSize: '11px' }} onClick={() => fileSaveAs(playerList2, team2)} title="Save Roster">
                                <FaSave />
                            </button>
                            <label style={{ ...actionBtnStyle, padding: '3px 6px', fontSize: '11px', cursor: 'pointer' }} title="Load Roster">
                                <FaFolderOpen />
                                <input type="file" accept=".txt" onChange={e => handleFileChosen2(e.target.files[0])} style={{ display: 'none' }} />
                            </label>
                        </div>
                    </div>

                    {/* Team 2 Actions */}
                    <div style={{ display: 'flex', gap: '6px', marginBottom: '8px', flexWrap: 'wrap' }}>
                        <button style={playBtnStyle} onClick={() => recallPage(templateLayers.hockeygenerallayer, 'PlayerId2', [{ key: 'f0', value: currentPlayer2, type: 'text' }], canvasList, canvas, currentscreenSize)}>
                            Player 2 Bug <FaPlay />
                        </button>
                        <button style={actionBtnStyle} onClick={() => recallPage(templateLayers.hockeygenerallayer, 'TeamList', [
                            { key: 'f0', value: team2, type: 'text' },
                            { key: 'f1', value: playerList2[0] || '', type: 'text' },
                            { key: 'f2', value: playerList2[1] || '', type: 'text' },
                            { key: 'f3', value: playerList2[2] || '', type: 'text' },
                            { key: 'f4', value: playerList2[3] || '', type: 'text' },
                            { key: 'f5', value: playerList2[4] || '', type: 'text' },
                            { key: 'f6', value: playerList2[5] || '', type: 'text' },
                            { key: 'f7', value: playerList2[6] || '', type: 'text' },
                            { key: 'f8', value: playerList2[7] || '', type: 'text' },
                            { key: 'f9', value: playerList2[8] || '', type: 'text' },
                            { key: 'f10', value: playerList2[9] || '', type: 'text' },
                            { key: 'f11', value: playerList2[10] || '', type: 'text' },
                            { key: 'f12', value: playerList2[11] || '', type: 'text' },
                        ], canvasList, canvas, currentscreenSize)}>
                            TeamList 2 <FaPlay />
                        </button>
                    </div>

                    <div style={{ fontSize: '12px', marginBottom: '6px', color: '#cbd5e1', padding: '4px 8px', backgroundColor: '#0f172a', borderRadius: '4px', display: 'flex', justifyContent: 'space-between' }}>
                        <span>Active Player:</span> <b style={{ color: '#f43f5e' }}>{currentPlayer2}</b>
                    </div>

                    {/* Drag-and-Drop Player List 2 */}
                    <DragDropContext onDragEnd={onDragEnd2}>
                        <Droppable droppableId="droppable-team2" type="PERSON1">
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    style={{
                                        backgroundColor: snapshot.isDraggingOver ? '#3b1d28' : '#0f172a',
                                        borderRadius: '6px',
                                        border: '1px solid #334155',
                                        maxHeight: '440px',
                                        overflowY: 'auto',
                                        padding: '4px',
                                        boxSizing: 'border-box',
                                    }}
                                    {...provided.droppableProps}
                                >
                                    {playerList2.map((val, i) => (
                                        <Draggable draggableId={"team2_player_" + i} key={"team2_player_" + i} index={i}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    style={{
                                                        ...provided.draggableProps.style,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '4px',
                                                        padding: '3px 4px',
                                                        marginBottom: '3px',
                                                        borderRadius: '4px',
                                                        backgroundColor: snapshot.isDragging ? '#e11d48' : (currentPlayer2 === val ? '#1e293b' : '#1e293b77'),
                                                        border: currentPlayer2 === val ? '1px solid #f43f5e' : '1px solid transparent',
                                                        boxSizing: 'border-box',
                                                        minWidth: 0,
                                                    }}
                                                >
                                                    <span {...provided.dragHandleProps} style={{ cursor: 'grab', color: '#64748b', flexShrink: 0, display: 'inline-flex', alignItems: 'center' }}>
                                                        <VscMove />
                                                    </span>
                                                    <span style={{ fontSize: '11px', width: '18px', color: '#64748b', textAlign: 'right', flexShrink: 0 }}>{i + 1}.</span>
                                                    <input
                                                        type="text"
                                                        value={val}
                                                        onChange={e => updatePlayerName2(i, e.target.value)}
                                                        onClick={() => setCurrentPlayer2(val)}
                                                        style={{
                                                            ...inputBase,
                                                            flex: 1,
                                                            minWidth: 0,
                                                            padding: '2px 6px',
                                                            backgroundColor: 'transparent',
                                                            border: 'none',
                                                            color: '#f8fafc',
                                                            fontSize: '12px',
                                                            cursor: 'pointer',
                                                        }}
                                                    />
                                                    <button
                                                        type="button"
                                                        style={{ ...btnBase, padding: '2px 5px', fontSize: '10px', backgroundColor: '#0284c7', flexShrink: 0 }}
                                                        onClick={() => setInPlayer(val)}
                                                        title="Set as IN substitution player"
                                                    >
                                                        IN
                                                    </button>
                                                    <button
                                                        type="button"
                                                        style={{ ...btnBase, padding: '2px 5px', fontSize: '10px', backgroundColor: '#e11d48', flexShrink: 0 }}
                                                        onClick={() => setOutPlayer(val)}
                                                        title="Set as OUT substitution player"
                                                    >
                                                        OUT
                                                    </button>
                                                    <button
                                                        type="button"
                                                        style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '2px', flexShrink: 0, display: 'inline-flex', alignItems: 'center' }}
                                                        onClick={() => deletePlayer2(i)}
                                                        title="Delete Player"
                                                    >
                                                        <FaTrash size={10} />
                                                    </button>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>

                    <button
                        type="button"
                        style={{ ...actionBtnStyle, width: '100%', marginTop: '6px', backgroundColor: '#334155' }}
                        onClick={addPlayer2}
                    >
                        <FaPlus size={10} /> Add Player to Team 2
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Hockey;
