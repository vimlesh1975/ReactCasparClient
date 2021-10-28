import React, { useState } from 'react'
import { endpoint } from './common'
import { v4 as uuidv4 } from 'uuid';
import { FaPlay, FaStop } from "react-icons/fa";
import { playerList1, playerList2 } from './hockeyData'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'


const Hockey = () => {
    const canvasList = useSelector(state => state.canvasListReducer.canvasList);
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const dispatch = useDispatch();
    const currentscreenSize = localStorage.getItem('RCC_currentscreenSize');
    const [currentPlayer1, setCurrentPlayer1] = useState('Vimlesh Kumar 1')
    const [currentPlayer2, setCurrentPlayer2] = useState('Vimlesh Kumar 2')
    const [team1, setTeam1] = useState('Mumbai')
    const [team1Goal, setTeam1Goal] = useState(88)
    const [team2, setTeam2] = useState('Delhi')
    const [team2Goal, setTeam2Goal] = useState(77)

    const [initialMinute, setInitilaMinute] = useState(45)
    const [initialSecond, setInitialSecond] = useState(10)

    const [countUp, setCountUp] = useState(true)


    const recallPage = (pageName, data) => {
        const index = canvasList.findIndex(val => val.pageName === pageName);
        if (index !== -1) {
            dispatch({ type: 'CHANGE_CURRENT_PAGE', payload: index })
            var data1 = data;
            canvas.loadFromJSON(canvasList[index].pageValue, () => {
                data1.forEach(data2 => {
                    canvas.getObjects().forEach((element) => {
                        try {
                            if (element.id === data2.key) {
                                element.set({ text: data2.value.toString() })
                            }
                        } catch (error) {
                        }
                    });
                });

                const layerNumber = 500;
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
                canvas.requestRenderAll();
            });
        }
        else { alert(`${pageName} page not found in canvas list. Make a page with this name, add ${data.length}  text and set id of texts as ${data.map(val => { return val.key })} then update the page`) }
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

                setInterval(function() {
                    var diff =${(initialMinute * 60 + initialSecond) * 1000} ${countUp ? '+' : '-'} ((new Date()).getTime() - startTime.getTime());
                    var date_diff = new Date(diff);
                    var ss1 = date_diff.toLocaleString('en-US', { minute: '2-digit', second: '2-digit' });
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
                    <button onClick={() => recallPage('PlayerId1', [{ key: 'f0', value: currentPlayer1 }])}>PlayerId1 <FaPlay /></button>
                    <br />    <button onClick={() => recallPage('TeamList', [

                        { key: 'f0', value: playerList1[0] },
                        { key: 'f1', value: playerList1[1] },
                        { key: 'f2', value: playerList1[2] },
                        { key: 'f3', value: playerList1[3] },
                        { key: 'f4', value: playerList1[4] },
                        { key: 'f5', value: playerList1[5] },
                        { key: 'f6', value: playerList1[6] },
                        { key: 'f7', value: playerList1[7] },
                        { key: 'f8', value: playerList1[8] },
                        { key: 'f9', value: playerList1[9] },
                        { key: 'f10', value: playerList1[10] },
                        { key: 'f11', value: playerList1[11] },
                        { key: 'f12', value: playerList1[12] },

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
                    <button onClick={() => recallPage('PlayerId2', [{ key: 'f0', value: currentPlayer2 }])}>PlayerId2<FaPlay /></button>
                    <br />  <button onClick={() => recallPage('TeamList', [

                        { key: 'f0', value: playerList2[0] },
                        { key: 'f1', value: playerList2[1] },
                        { key: 'f2', value: playerList2[2] },
                        { key: 'f3', value: playerList2[3] },
                        { key: 'f4', value: playerList2[4] },
                        { key: 'f5', value: playerList2[5] },
                        { key: 'f6', value: playerList2[6] },
                        { key: 'f7', value: playerList2[7] },
                        { key: 'f8', value: playerList2[8] },
                        { key: 'f9', value: playerList2[9] },
                        { key: 'f10', value: playerList2[10] },
                        { key: 'f11', value: playerList2[11] },
                        { key: 'f12', value: playerList2[12] },

                    ])}>TeamList 2 <FaPlay /></button>

                </div>
                <div>
                    <button onClick={() => recallPage('InOut', [{ key: 'f0', value: currentPlayer1 }, { key: 'f1', value: currentPlayer2 }])}>IN OUT <FaPlay /></button>
                    <button onClick={() => {
                        stopGraphics(500);
                    }} ><FaStop /></button>
                    <b>Score:</b>
                    <br />Team 1: <input type='text' size="8" value={team1} onChange={e => setTeam1(e.target.value)} /><input type='text' size="1" value={team1Goal} onChange={e => setTeam1Goal(e.target.value)} />
                    <br />Team 2: <input type='text' size="8" value={team2} onChange={e => setTeam2(e.target.value)} /><input type='text' size="1" value={team2Goal} onChange={e => setTeam2Goal(e.target.value)} />
                    <button onClick={() => recallPage('Score', [{ key: 'f0', value: team1 }, { key: 'f1', value: team2 }, { key: 'f2', value: team1Goal }, { key: 'f3', value: team2Goal }])}>Score<FaPlay /></button>
                    <div >
                        <button onClick={() => showClock('Clock')}>Clock <FaPlay /></button>  <button onClick={() => {
                            stopGraphics(501);
                        }} ><FaStop /></button>
                        <span>Initial Minute</span> <input type='text' size="1" value={initialMinute} onChange={e => setInitilaMinute(e.target.value)} />
                        <span>Initial Second</span> <input type='text' size="1" value={initialSecond} onChange={e => setInitialSecond(e.target.value)} />
                        <span>countUp</span> <input type='checkbox' checked={countUp} onChange={e => setCountUp(val => !val)} />


                    </div>
                </div>
            </div>


        </div>
    )
}

export default Hockey
