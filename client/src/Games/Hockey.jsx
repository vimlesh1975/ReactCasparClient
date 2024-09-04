import React, { useState } from 'react'
import { endpoint, stopGraphics, recallPage, executeScript, generalFileName, saveFile } from '../common'
import { FaPlay, FaStop } from "react-icons/fa";
import { iniplayerList1, iniplayerList2 } from '../hockeyData'
import { useSelector, useDispatch } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { VscMove } from "react-icons/vsc";
import { templateLayers } from "../common";

var xxx;
// import moment from 'moment'

const Hockey = () => {

    const [playerList1, setPlayerList1] = useState(iniplayerList1)
    const [playerList2, setPlayerList2] = useState(iniplayerList2)
    var newplayerList1 = [];
    var newplayerList2 = [];

    const [inPlayer, setInPlayer] = useState('45 Narsimha Chavhan')
    const [outPlayer, setOutPlayer] = useState('48 Vijay Ingle')

    const canvasList = useSelector(state => state.canvasListReducer.canvasList);
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const dispatch = useDispatch();
    const currentscreenSize = useSelector(state => state.currentscreenSizeReducer.currentscreenSize);

    const [currentPlayer1, setCurrentPlayer1] = useState('Vimlesh Kumar 1')
    const [currentPlayer2, setCurrentPlayer2] = useState('Vimlesh Kumar 2')
    const [team1Goal, setTeam1Goal] = useState(88)
    const [team1Logo, setTeam1Logo] = useState('ReactCasparClient/img/flag/Albania.png')
    const [team2Logo, setTeam2Logo] = useState('ReactCasparClient/img/flag/Mauritania.png')

    const [team1, setTeam1] = useState('Albania')
    const [team2, setTeam2] = useState('Mauritania')

    const [team2Goal, setTeam2Goal] = useState(77)

    const [initialMinute, setInitilaMinute] = useState(45)
    const [initialSecond, setInitialSecond] = useState(0)

    const [countUp, setCountUp] = useState(false)

    const onDragEnd1 = (result) => {
        const aa = [...playerList1]
        if (result.destination != null) {
            aa.splice(result.destination?.index, 0, aa.splice(result.source?.index, 1)[0])
            setPlayerList1(aa);
        }
    }
    const onDragEnd2 = (result) => {
        const aa = [...playerList2]
        if (result.destination != null) {
            aa.splice(result.destination?.index, 0, aa.splice(result.source?.index, 1)[0])
            setPlayerList2(aa);
        }
    }



    const pauseClock = (layerNumber) => {
        clearInterval(xxx)
        endpoint(`call ${window.chNumber}-${layerNumber} "
        clearInterval(xxx);
        "`)
        executeScript(`clearInterval(xxx)`)
    }
    const resumeClock = (layerNumber) => {

        //for form
        var startTime = new Date();
        startTime.setMinutes(initialMinute);
        startTime.setSeconds(initialSecond);
        clearInterval(xxx);
        xxx = setInterval(() => {
            countUp ? startTime.setSeconds(startTime.getSeconds() + 1) : startTime.setSeconds(startTime.getSeconds() - 1);
            setInitilaMinute(startTime.getMinutes())
            setInitialSecond(startTime.getSeconds())

        }, 1000);
        //for form end
        const script = `
        startTime.setMinutes(${initialMinute});
        startTime.setSeconds(${initialSecond});
        clearInterval(xxx);
        xxx=setInterval(()=>{
            startTime.setSeconds(startTime.getSeconds() ${countUp ? '+' : '-'} 1);
             var ss1 =  ((startTime.getMinutes()).toString()).padStart(2, '0') + ':' + ((startTime.getSeconds()).toString()).padStart(2, '0');
             cc.textContent  =ss1;
           }, 1000);
        `
        executeScript(script)
        endpoint(`call ${window.chNumber}-${layerNumber} "
        ${script}
        "`)
    }
    const stopClock = layerNumber => {
        clearInterval(xxx);
        stopGraphics(layerNumber);

        executeScript(`if(window.xxx){clearInterval(xxx)}`);
        executeScript(`document.getElementById('divid_${layerNumber}')?.remove()`);

    }
    const showClock = (pageName) => {

        const index = canvasList.findIndex(val => val.pageName === pageName);
        if (index !== -1) {
            const layerNumber = templateLayers.hockeyclockLayer;
            executeScript(`if(window.xxx){clearInterval(xxx)}`);
            executeScript(`document.getElementById('divid_${layerNumber}')?.remove()`);

            //for form
            var startTime = new Date();
            startTime.setMinutes(initialMinute);
            startTime.setSeconds(initialSecond);
            clearInterval(xxx)
            xxx = setInterval(() => {
                countUp ? startTime.setSeconds(startTime.getSeconds() + 1) : startTime.setSeconds(startTime.getSeconds() - 1);
                setInitilaMinute(startTime.getMinutes())
                setInitialSecond(startTime.getSeconds())
            }, 1000);
            //for form

            dispatch({ type: 'CHANGE_CURRENT_PAGE', payload: index })
            canvas.loadFromJSON(canvasList[index].pageValue).then(() => {
                canvas.requestRenderAll();
            });


            endpoint(`mixer ${window.chNumber}-${layerNumber} fill 0 0 0 1 6 ${window.animationMethod}`)
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
                var ss1 =  ((startTime.getMinutes()).toString()).padStart(2, '0') + ':' + ((startTime.getSeconds()).toString()).padStart(2, '0');
                cc.textContent  =ss1;
              }, 1000);
            `
            executeScript(script); //for html
            setTimeout(() => {
                endpoint(`call ${window.chNumber}-${layerNumber} "
                ${script}
                "`)
            }, 300);

            setTimeout(() => {
                endpoint(`mixer ${window.chNumber}-${layerNumber} fill 0 0 1 1 10 ${window.animationMethod}`)
            }, 800);

            setTimeout(() => {
                // updateGraphics(layerNumber);
            }, 1100);
        }
        else { alert(`${pageName} page not found in canvas list. Make a page with this name, add a text and set id of text as f0 then update the page`) }

    }


    const fileSaveAs = (playerList) => {
        var aa = ''
        playerList.forEach(val => {
            aa += val + '\r\n'
        });
        const data = new Blob([aa], { type: 'text/plain' });
        const options = {
            fileExtension: '.txt',
            suggestedName: 'Team_' + generalFileName(),
            types: [
                {
                    description: 'text Files',
                    accept: {
                        'text/plain': ['.txt'],
                    },
                },
            ],
        };
        saveFile(options, data)
    }
    let fileReader;

    const handleFileChosen1 = (file) => {
        if (file) {
            fileReader = new FileReader();
            fileReader.onloadend = handleFileRead1;
            fileReader.readAsText(file);
        }
    }
    const handleFileRead1 = (e) => {
        const content = fileReader.result;
        var aa = content.split('\r\n')
        aa.splice(-1)
        var updatedcanvasList = []
        aa.forEach(element => {
            var cc = element;
            updatedcanvasList.push(cc)
        });
        setPlayerList1(updatedcanvasList);
    };
    const handleFileChosen2 = (file) => {
        if (file) {
            fileReader = new FileReader();
            fileReader.onloadend = handleFileRead2;
            fileReader.readAsText(file);
        }
    }
    const handleFileRead2 = (e) => {
        const content = fileReader.result;
        var aa = content.split('\r\n')
        aa.splice(-1)
        var updatedcanvasList = []
        aa.forEach(element => {
            var cc = element;
            updatedcanvasList.push(cc)
        });
        setPlayerList2(updatedcanvasList);
    };
    return (
        <div>
            <div style={{ display: 'flex' }}>
                <div>
                    <table border='0'>
                        <tbody >
                            <tr>

                                <td><button onClick={() => fileSaveAs(playerList1)}>Save</button></td>
                            </tr>
                            <tr>
                                <td><span>Open File:</span><input
                                    type='file'
                                    id='file'
                                    className='input-file'
                                    accept='.txt'
                                    onChange={e => {
                                        handleFileChosen1(e.target.files[0]);
                                    }}
                                /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <table border='0'>
                        <tbody >
                            <tr>

                                <td><button onClick={() => fileSaveAs(playerList2)}>Save</button></td>
                            </tr>
                            <tr>
                                <td><span>Open File:</span><input
                                    type='file'
                                    id='file'
                                    className='input-file'
                                    accept='.txt'
                                    onChange={e => {
                                        handleFileChosen2(e.target.files[0]);
                                    }}
                                /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div style={{ display: 'flex', width: 830, }}>
                <div>

                    <DragDropContext onDragEnd={onDragEnd1}>
                        <Droppable droppableId="droppable-1" type="PERSON1">
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    style={{ backgroundColor: snapshot.isDraggingOver ? 'yellow' : 'yellowgreen' }}
                                    {...provided.droppableProps}
                                >
                                    <table >
                                        <tbody>
                                            {playerList1.map((val, i) => {
                                                return (
                                                    <Draggable draggableId={"draggable" + i} key={val + i} index={i}>
                                                        {(provided, snapshot) => (
                                                            <tr
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                style={{
                                                                    ...provided.draggableProps.style,
                                                                    backgroundColor: snapshot.isDragging ? 'red' : 'white',
                                                                    boxShadow: snapshot.isDragging ? "0 0 .4rem #666" : "none",
                                                                    // margin: '10px'
                                                                }}
                                                            >
                                                                <td {...provided.dragHandleProps}><VscMove /></td>
                                                                <td><input style={{ border: 'none', borderWidth: 0 }} type='text' defaultValue={val} onClick={() => setCurrentPlayer1(val)}

                                                                    onMouseLeave={e => {
                                                                        newplayerList1 = [...playerList1];
                                                                        newplayerList1[i] = e.target.value;
                                                                        setPlayerList1([...newplayerList1])

                                                                    }}
                                                                />
                                                                </td>
                                                            </tr>
                                                        )
                                                        }
                                                    </Draggable>
                                                )
                                            })}
                                            {provided.placeholder}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                    {currentPlayer1}
                    <br /><button onClick={() => recallPage(templateLayers.hockeygenerallayer, 'PlayerId1', [{ key: 'f0', value: currentPlayer1, type: 'text' }], canvasList, canvas, currentscreenSize)}>PlayerId1 <FaPlay /></button>
                    <br />    <button onClick={() => recallPage(500, 'TeamList', [

                        { key: 'f0', value: team1, type: 'text' },
                        { key: 'f1', value: playerList1[0], type: 'text' },
                        { key: 'f2', value: playerList1[1], type: 'text' },
                        { key: 'f3', value: playerList1[2], type: 'text' },
                        { key: 'f4', value: playerList1[3], type: 'text' },
                        { key: 'f5', value: playerList1[4], type: 'text' },
                        { key: 'f6', value: playerList1[5], type: 'text' },
                        { key: 'f7', value: playerList1[6], type: 'text' },
                        { key: 'f8', value: playerList1[7], type: 'text' },
                        { key: 'f9', value: playerList1[8], type: 'text' },
                        { key: 'f10', value: playerList1[9], type: 'text' },
                        { key: 'f11', value: playerList1[10], type: 'text' },
                        { key: 'f12', value: playerList1[11], type: 'text' },

                    ], canvasList, canvas, currentscreenSize)}>TeamList 1 <FaPlay /></button>

                </div>
                <div>

                    <DragDropContext onDragEnd={onDragEnd2}>
                        <Droppable droppableId="droppable-1" type="PERSON1">
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    style={{ backgroundColor: snapshot.isDraggingOver ? 'yellow' : 'yellowgreen' }}
                                    {...provided.droppableProps}
                                >
                                    <table >
                                        <tbody>
                                            {playerList2.map((val, i) => {
                                                return (
                                                    <Draggable draggableId={"draggable" + i} key={val + i} index={i}>
                                                        {(provided, snapshot) => (
                                                            <tr
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                style={{
                                                                    ...provided.draggableProps.style,
                                                                    backgroundColor: snapshot.isDragging ? 'red' : 'white',
                                                                    boxShadow: snapshot.isDragging ? "0 0 .4rem #666" : "none",
                                                                    // margin: '10px'
                                                                }}
                                                            >
                                                                <td {...provided.dragHandleProps}><VscMove /></td>
                                                                <td><input style={{ border: 'none', borderWidth: 0 }} type='text' defaultValue={val} onClick={() => setCurrentPlayer2(val)}

                                                                    onMouseLeave={e => {
                                                                        newplayerList2 = [...playerList2];
                                                                        newplayerList2[i] = e.target.value;
                                                                        setPlayerList2([...newplayerList2])

                                                                    }}
                                                                />
                                                                </td>
                                                            </tr>
                                                        )
                                                        }
                                                    </Draggable>
                                                )
                                            })}
                                            {provided.placeholder}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                    {currentPlayer2}
                    <br /> <button onClick={() => recallPage(templateLayers.hockeygenerallayer, 'PlayerId2', [{ key: 'f0', value: currentPlayer2, type: 'text' }], canvasList, canvas, currentscreenSize)}>PlayerId2<FaPlay /></button>
                    <br />  <button onClick={() => recallPage(templateLayers.hockeygenerallayer, 'TeamList', [

                        { key: 'f0', value: team2, type: 'text' },
                        { key: 'f1', value: playerList2[0], type: 'text' },
                        { key: 'f2', value: playerList2[1], type: 'text' },
                        { key: 'f3', value: playerList2[2], type: 'text' },
                        { key: 'f4', value: playerList2[3], type: 'text' },
                        { key: 'f5', value: playerList2[4], type: 'text' },
                        { key: 'f6', value: playerList2[5], type: 'text' },
                        { key: 'f7', value: playerList2[6], type: 'text' },
                        { key: 'f8', value: playerList2[7], type: 'text' },
                        { key: 'f9', value: playerList2[8], type: 'text' },
                        { key: 'f10', value: playerList2[9], type: 'text' },
                        { key: 'f11', value: playerList2[10], type: 'text' },
                        { key: 'f12', value: playerList2[11], type: 'text' },

                    ], canvasList, canvas, currentscreenSize)}>TeamList 2 <FaPlay /></button>

                </div>

                <br /> <button style={{ backgroundColor: 'red' }} onClick={() => { stopGraphics(templateLayers.hockeygenerallayer); }} ><FaStop /></button>

                <div>
                    <div style={{ display: 'flex', border: '1px solid blue', margin: 10 }}>
                        <div>
                            {team1} <br />
                            <label>
                                <img src={team1Logo} alt='' width='80' height='80' style={{ border: '3px solid red' }} />
                                <input type="file" onChange={e => {
                                    var reader = new FileReader();
                                    reader.onloadend = () => {
                                        setTeam1Logo(reader.result)
                                    }
                                    reader.readAsDataURL(e.target.files[0]);
                                }} style={{ display: 'none' }} />
                            </label>
                        </div>
                        <div>
                            {team2} <br />
                            <label>
                                <img src={team2Logo} alt='' width='80' height='80' style={{ border: '3px solid red' }} />
                                <input type="file" onChange={e => {
                                    var reader = new FileReader();
                                    reader.onloadend = () => {
                                        setTeam2Logo(reader.result)
                                    }
                                    reader.readAsDataURL(e.target.files[0]);
                                }} style={{ display: 'none' }} />
                            </label>
                        </div>
                        <button onClick={() => recallPage(templateLayers.hockeygenerallayer, 'Versus', [{ key: 'f0', value: team1, type: 'text' }, { key: 'f1', value: team2, type: 'text' }, { key: 'img1', value: team1Logo, type: 'image' }, { key: 'img2', value: team2Logo, type: 'image' }], canvasList, canvas, currentscreenSize)}>Versus</button>
                    </div>
                    <div style={{ display: 'flex', border: '1px solid blue', margin: 10 }}>
                        <div>
                            <input type='text' size="8" value={team1} onChange={e => setTeam1(e.target.value)} /><input type='text' size="1" value={team1Goal} onChange={e => setTeam1Goal(e.target.value)} />
                            <br /><input type='text' size="8" value={team2} onChange={e => setTeam2(e.target.value)} /><input type='text' size="1" value={team2Goal} onChange={e => setTeam2Goal(e.target.value)} />
                        </div>
                        <div>
                            <button onClick={() => recallPage(templateLayers.hockeyscoreLayer, 'Score', [{ key: 'f0', value: team1, type: 'text' }, { key: 'f1', value: team2, type: 'text' }, { key: 'f2', value: team1Goal, type: 'text' }, { key: 'f3', value: team2Goal, type: 'text' }], canvasList, canvas, currentscreenSize)}>Score <FaPlay /></button>
                            <button onClick={() => stopGraphics(templateLayers.hockeyscoreLayer)} > <FaStop /></button>
                        </div>
                    </div>
                    <div>
                        <div style={{ display: 'flex', border: '1px solid blue', margin: 10 }}>
                            <span>Ini. Min </span> <input type='text' size="1" value={initialMinute} onChange={e => setInitilaMinute(e.target.value)} />
                            <span>Ini. Sec </span> <input type='text' size="1" value={initialSecond} onChange={e => setInitialSecond(e.target.value)} />
                            <span>countUp</span> <input type='checkbox' checked={countUp} onChange={e => setCountUp(val => !val)} />
                            <button onClick={() => showClock('Clock')}>Clock <FaPlay /></button>
                            <button onClick={() => pauseClock(templateLayers.hockeyclockLayer)}> Pause </button>
                            <button onClick={() => resumeClock(templateLayers.hockeyclockLayer)}> Resume </button>
                            <button onClick={() => stopClock(templateLayers.hockeyclockLayer)} ><FaStop /></button>
                        </div>
                        <div style={{ display: 'flex', border: '1px solid blue', margin: 10 }}>
                            <div>  <div> <span>IN . .</span><input type='text' value={inPlayer} onChange={e => setInPlayer(e.target.value)} /></div>  <div> <span>OUT</span><input type='text' value={outPlayer} onChange={e => setOutPlayer(e.target.value)} /></div></div>
                            <div> <button onClick={() => recallPage(templateLayers.hockeygenerallayer, 'InOut', [{ key: 'f0', value: inPlayer, type: 'text' }, { key: 'f1', value: outPlayer, type: 'text' }], canvasList, canvas, currentscreenSize)}>IN OUT <FaPlay /></button></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hockey
