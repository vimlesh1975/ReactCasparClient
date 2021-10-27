import React, { useState } from 'react'
import { endpoint } from './common'
import { v4 as uuidv4 } from 'uuid';
import { FaPlay, FaStop } from "react-icons/fa";
import { playerList1, playerList2 } from './hockeyData'
import { useSelector, useDispatch } from 'react-redux'


const Hockey = () => {
    const canvasList = useSelector(state => state.canvasListReducer.canvasList);
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const dispatch = useDispatch();
    const currentscreenSize = localStorage.getItem('RCC_currentscreenSize');
    const [currentPlayer1, setCurrentPlayer1] = useState('Vimlesh Kumar 1')
    const [currentPlayer2, setCurrentPlayer2] = useState('Vimlesh Kumar 2')


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
                // canvas.requestRenderAll();
            });
        }
        else { alert(`${pageName} page not found in canvas list. Make a page with this name, add a text and set id of text as f0 then update the page`) }
    }


    // const showClock = (pageName, key, val) => {
    //     const index = canvasList.findIndex(val => val.pageName === pageName);
    //     if (index !== -1) {
    //         dispatch({ type: 'CHANGE_CURRENT_PAGE', payload: index })
    //         canvas.loadFromJSON(canvasList[index].pageValue, () => {
    //             const aa = canvas.getObjects();
    //             aa.forEach(element => {
    //                 try {
    //                     element.set({ objectCaching: false })
    //                     if (element.id === key) {
    //                         element.set({ text: val.toString() })
    //                     }
    //                 } catch (error) {
    //                     alert(error);
    //                     return;
    //                 }
    //             });
    //             canvas.requestRenderAll();
    //         });

    //         const layerNumber = 501;
    //         endpoint(`mixer ${window.chNumber}-${layerNumber} fill 0 0 0 1 6 ${window.animationMethod}`)
    //         setTimeout(() => {
    //             endpoint(`play ${window.chNumber}-${layerNumber} [HTML] xyz.html`);
    //         }, 250);
    //         setTimeout(() => {
    //             endpoint(`call ${window.chNumber}-${layerNumber} "
    //             var aa = document.createElement('div');
    //             aa.style.position='absolute';
    //             aa.innerHTML='${(canvas.toSVG()).replaceAll('"', '\\"')}';
    //             document.body.appendChild(aa);
    //             document.body.style.margin='0';
    //             document.body.style.padding='0';
    //             aa.style.zoom=(${currentscreenSize * 100}/1024)+'%';
    //             document.body.style.overflow='hidden';
    //             var cc=document.getElementsByTagName('tspan')[0];
    //             cc.textContent='';
    //             var startTime = new Date();
    //             setInterval(function() {
    //                 var diff = (new Date()).getTime() - startTime.getTime();
    //                 var date_diff = new Date(diff - 30 * 60 * 1000);
    //                 var ss1 = date_diff.toLocaleString('en-US', { minute: '2-digit', second: '2-digit' }) + ':' + String(date_diff.getMilliseconds()).padStart(3, '0');
    //                 cc.textContent  =ss1;
    //               }, 40);
    //             "`)
    //         }, 300);

    //         setTimeout(() => {
    //             endpoint(`mixer ${window.chNumber}-${layerNumber} fill 0 0 1 1 10 ${window.animationMethod}`)
    //         }, 800);

    //         setTimeout(() => {
    //             // updateGraphics(layerNumber);
    //         }, 1100);
    //     }
    //     else { alert(`${pageName} page not found in canvas list. Make a page with this name, add a text and set id of text as f0 then update the page`) }

    // }

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

                </div>
            </div>

            <div >
                <button onClick={() => recallPage('PlayerId1', [{ key: 'f0', value: currentPlayer1 }])}>Template PlayerId1 <FaPlay /></button>
                <button onClick={() => recallPage('PlayerId2', [{ key: 'f0', value: currentPlayer2 }])}>Template PlayerId2<FaPlay /></button>
                <button onClick={() => recallPage('InOut', [{ key: 'f0', value: currentPlayer1 }, { key: 'f1', value: currentPlayer2 }])}>Template IN OUT<FaPlay /></button>

                {/* <button onClick={() => showClock('Clock', 'f0', '12:10')}>Clock<FaPlay /></button>
                <button onClick={() => {
                    stopGraphics(501);
                }} ><FaStop /></button> */}

            </div>

            <button onClick={() => {
                stopGraphics(500);
            }} ><FaStop /></button>
        </div>
    )
}

export default Hockey
