import React, { useState } from 'react'
import { endpoint } from './common'
import { v4 as uuidv4 } from 'uuid';
import { FaPlay, FaStop } from "react-icons/fa";
import { playerList1, playerList2 } from './hockeyData'
import { useSelector, useDispatch } from 'react-redux'
import { fabric } from "fabric";

// import moment from 'moment'

const Hockey = () => {
    const canvasList = useSelector(state => state.canvasListReducer.canvasList);
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const dispatch = useDispatch();
    const currentscreenSize = localStorage.getItem('RCC_currentscreenSize');
    const [currentPlayer1, setCurrentPlayer1] = useState('Vimlesh Kumar 1')
    const [currentPlayer2, setCurrentPlayer2] = useState('Vimlesh Kumar 2')
    const [team1, setTeam1] = useState('Mumbai')
    const [team1Goal, setTeam1Goal] = useState(88)
    const [team1Logo, setTeam1Logo] = useState('http://localhost:8080/media/anchor.png')
    const [team2Logo, setTeam2Logo] = useState('http://localhost:8080/media/hd_frame.png')

    const [team2, setTeam2] = useState('Delhi')
    const [team2Goal, setTeam2Goal] = useState(77)

    const [initialMinute, setInitilaMinute] = useState(45)
    const [initialSecond, setInitialSecond] = useState(0)

    const [countUp, setCountUp] = useState(false)

    const recallPage = (pageName, data) => {
        const index = canvasList.findIndex(val => val.pageName === pageName);
        if (index !== -1) {
            dispatch({ type: 'CHANGE_CURRENT_PAGE', payload: index })
            const data1 = data;
            canvas.loadFromJSON(canvasList[index].pageValue, () => {
                data1.forEach(data2 => {
                    canvas.getObjects().forEach((element) => {
                        try {
                            if (element.id === data2.key) {
                                if (data2.type === 'text') {
                                    element.set({ objectCaching: false, text: data2.value.toString() })
                                }
                                else if (data2.type === 'image') {
                                    var i = new Image();
                                    i.onload = function () {
                                        const originalWidth = (element.width) * (element.scaleX);
                                        const originalHeight = (element.height) * (element.scaleY);
                                        element.set({ objectCaching: false, scaleX: (originalWidth / i.width), scaleY: (originalHeight / i.height) })
                                        if (element.type === 'image') {
                                            element.setSrc(data2.value)
                                        }
                                        else if (element.type === 'rect') {
                                            element.set({ width: i.width, height: i.height, fill: new fabric.Pattern({ source: data2.value, repeat: 'no-repeat' }) })
                                        }
                                    };
                                    i.src = data2.value;
                                }
                            }
                        } catch (error) {
                        }
                    });
                });
                sendToCasparcg(500)
            });
        }
        else { alert(`${pageName} page not found in canvas list. Make a page with this name, add ${data.length}  text and set id of texts as ${data.map(val => { return val.key })} then update the page`) }
        setTimeout(() => {
            canvas.requestRenderAll();
        }, 3000);
    }

    const sendToCasparcg = (layerNumber) => {
        endpoint(`mixer ${window.chNumber}-${layerNumber} fill 0 0 0 1 6 ${window.animationMethod}`)
        setTimeout(() => {
            endpoint(`play ${window.chNumber}-${layerNumber} [HTML] xyz.html`);
        }, 250);
        setTimeout(() => {
            endpoint(`call ${window.chNumber}-${layerNumber} "
        var aa = document.createElement('div');
        aa.style.position='absolute';
        aa.innerHTML='${(canvas.toSVG()).replaceAll('"', '\\"')}';
        document.body.appendChild(aa);
        document.body.style.margin='0';
        document.body.style.padding='0';
        aa.style.zoom=(${currentscreenSize * 100}/1024)+'%';
        document.body.style.overflow='hidden';
        "`)
        }, 300);
        setTimeout(() => {
            endpoint(`mixer ${window.chNumber}-${layerNumber} fill 0 0 1 1 10 ${window.animationMethod}`)
        }, 800);

        setTimeout(() => {
            updateGraphics(layerNumber);
        }, 1100);
    }
    const showClock = (pageName) => {
        const index = canvasList.findIndex(val => val.pageName === pageName);
        if (index !== -1) {
            dispatch({ type: 'CHANGE_CURRENT_PAGE', payload: index })
            canvas.loadFromJSON(canvasList[index].pageValue, () => {
                canvas.requestRenderAll();
            });

            const layerNumber = 501;
            endpoint(`mixer ${window.chNumber}-${layerNumber} fill 0 0 0 1 6 ${window.animationMethod}`)
            setTimeout(() => {
                endpoint(`play ${window.chNumber}-${layerNumber} [HTML] xyz.html`);
            }, 250);
            setTimeout(() => {
                endpoint(`call ${window.chNumber}-${layerNumber} "
                var aa = document.createElement('div');
                aa.style.position='absolute';
                aa.innerHTML='${(canvas.toSVG()).replaceAll('"', '\\"')}';
                document.body.appendChild(aa);
                document.body.style.margin='0';
                document.body.style.padding='0';
                aa.style.zoom=(${currentscreenSize * 100}/1024)+'%';
                document.body.style.overflow='hidden';
                var cc=document.getElementsByTagName('tspan')[0];
                cc.textContent='';
                var startTime = new Date();
                startTime.setMinutes(${initialMinute});
                startTime.setSeconds(${initialSecond});
                setInterval(()=>{
                   startTime.setSeconds(startTime.getSeconds() ${countUp ? '+' : '-'} 1);
                    var ss1 =  ((startTime.getMinutes()).toString()).padStart(2, '0') + ':' + ((startTime.getSeconds()).toString()).padStart(2, '0');
                    cc.textContent  =ss1;
                  }, 1000);
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

    const updateGraphics = (layerNumber) => {
        endpoint(`call ${window.chNumber}-${layerNumber} "
            aa.innerHTML='${(canvas.toSVG()).replaceAll('"', '\\"')}';
            "`)
    }
    const stopGraphics = layerNumber => {
        endpoint(`mixer ${window.chNumber}-${layerNumber} fill 0 0 0 1 12 ${window.animationMethod}`)
        setTimeout(() => {
            endpoint(`stop ${window.chNumber}-${layerNumber}`)
        }, 1000);
    }


    return (
        <div>
            <div style={{ display: 'flex' }}>
                <div>
                    {currentPlayer1}

                    <table border='1'>
                        <tbody>
                            {playerList1.map((val, i) => {
                                return (<tr key={uuidv4()}><td
                                    onClick={() => setCurrentPlayer1(val)}
                                    onDoubleClick={() => {
                                        setCurrentPlayer1(val);
                                        recallPage('PlayerId1', [{ key: 'f0', value: val }])
                                    }}>{val}</td></tr>)
                            })}
                        </tbody>
                    </table>
                    <button onClick={() => recallPage('PlayerId1', [{ key: 'f0', value: currentPlayer1, type: 'text' }])}>PlayerId1 <FaPlay /></button>
                    <br />    <button onClick={() => recallPage('TeamList', [

                        { key: 'f0', value: playerList1[0], type: 'text' },
                        { key: 'f1', value: playerList1[1], type: 'text' },
                        { key: 'f2', value: playerList1[2], type: 'text' },
                        { key: 'f3', value: playerList1[3], type: 'text' },
                        { key: 'f4', value: playerList1[4], type: 'text' },
                        { key: 'f5', value: playerList1[5], type: 'text' },
                        { key: 'f6', value: playerList1[6], type: 'text' },
                        { key: 'f7', value: playerList1[7], type: 'text' },
                        { key: 'f8', value: playerList1[8], type: 'text' },
                        { key: 'f9', value: playerList1[9], type: 'text' },
                        { key: 'f10', value: playerList1[10], type: 'text' },
                        { key: 'f11', value: playerList1[11], type: 'text' },
                        { key: 'f12', value: playerList1[12], type: 'text' },

                    ])}>TeamList 1 <FaPlay /></button>

                </div>
                <div>
                    {currentPlayer2}

                    <table border='1'>
                        <tbody>
                            {playerList2.map((val, i) => {
                                return (<tr key={uuidv4()}><td onClick={() => setCurrentPlayer2(val)} onDoubleClick={() => {
                                    setCurrentPlayer2(val);
                                    recallPage('PlayerId2', [{ key: 'f0', value: val }])
                                }}>{val}</td></tr>)
                            })}
                        </tbody>
                    </table>
                    <button onClick={() => recallPage('PlayerId2', [{ key: 'f0', value: currentPlayer2, type: 'text' }])}>PlayerId2<FaPlay /></button>
                    <br />  <button onClick={() => recallPage('TeamList', [

                        { key: 'f0', value: playerList2[0], type: 'text' },
                        { key: 'f1', value: playerList2[1], type: 'text' },
                        { key: 'f2', value: playerList2[2], type: 'text' },
                        { key: 'f3', value: playerList2[3], type: 'text' },
                        { key: 'f4', value: playerList2[4], type: 'text' },
                        { key: 'f5', value: playerList2[5], type: 'text' },
                        { key: 'f6', value: playerList2[6], type: 'text' },
                        { key: 'f7', value: playerList2[7], type: 'text' },
                        { key: 'f8', value: playerList2[8], type: 'text' },
                        { key: 'f9', value: playerList2[9], type: 'text' },
                        { key: 'f10', value: playerList2[10], type: 'text' },
                        { key: 'f11', value: playerList2[11], type: 'text' },
                        { key: 'f12', value: playerList2[12], type: 'text' },

                    ])}>TeamList 2 <FaPlay /></button>
                    <button onClick={() => recallPage('InOut', [{ key: 'f0', value: currentPlayer1, type: 'text' }, { key: 'f1', value: currentPlayer2, type: 'text' }])}>IN OUT <FaPlay /></button>

                </div>

                <br /> <button style={{ backgroundColor: 'red' }} onClick={() => { stopGraphics(500); }} ><FaStop /></button>

                <div>

                    <div style={{ display: 'flex', border: '1px solid blue' }}>
                        <div>
                            Team 1: <input type='text' size="8" value={team1} onChange={e => setTeam1(e.target.value)} /><input type='text' size="1" value={team1Goal} onChange={e => setTeam1Goal(e.target.value)} />
                            <br />Team 2: <input type='text' size="8" value={team2} onChange={e => setTeam2(e.target.value)} /><input type='text' size="1" value={team2Goal} onChange={e => setTeam2Goal(e.target.value)} />
                        </div>
                        <div>
                            <button onClick={() => recallPage('Score', [{ key: 'f0', value: team1, type: 'text' }, { key: 'f1', value: team2, type: 'text' }, { key: 'f2', value: team1Goal, type: 'text' }, { key: 'f3', value: team2Goal, type: 'text' }])}>Score<FaPlay /></button>
                        </div>
                    </div>


                    <div>
                        <div style={{ display: 'flex', border: '1px solid blue' }}>

                            <span>Ini. Min</span> <input type='text' size="1" value={initialMinute} onChange={e => setInitilaMinute(e.target.value)} />
                            <span>Ini. Sec</span> <input type='text' size="1" value={initialSecond} onChange={e => setInitialSecond(e.target.value)} />
                            <span>countUp</span> <input type='checkbox' checked={countUp} onChange={e => setCountUp(val => !val)} />
                            <button onClick={() => showClock('Clock')}>Clock <FaPlay /></button>  <button onClick={() => {
                                stopGraphics(501);
                            }} ><FaStop /></button>

                        </div>


                        <div style={{ display: 'flex', border: '1px solid blue' }}>
                            <div>
                                Team1 Logo: <br />
                                <label>
                                    <img src={team1Logo} alt='' width='80' height='80' />
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
                                Team2 Logo: <br />
                                <label>
                                    <img src={team2Logo} alt='' width='80' height='80' />
                                    <input type="file" onChange={e => {
                                        var reader = new FileReader();
                                        reader.onloadend = () => {
                                            setTeam2Logo(reader.result)
                                        }
                                        reader.readAsDataURL(e.target.files[0]);
                                    }} style={{ display: 'none' }} />
                                </label>
                            </div>
                            <button onClick={() => recallPage('Versus', [{ key: 'f0', value: team1, type: 'text' }, { key: 'f1', value: team2, type: 'text' }, { key: 'img1', value: team1Logo, type: 'image' }, { key: 'img2', value: team2Logo, type: 'image' }])}>Versus</button>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Hockey
