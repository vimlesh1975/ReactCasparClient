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
    const [currentPlayer1, setCurrentPlayer1] = useState('Vimlesh Kumar')

    const recallPage = (pageName, key, val) => {
        const index = canvasList.findIndex(val => val.pageName === pageName);
        if (index !== -1) {
            dispatch({ type: 'CHANGE_CURRENT_PAGE', payload: index })
            canvas.loadFromJSON(canvasList[index].pageValue, () => {
                const aa = canvas.getObjects();
                aa.forEach(element => {
                    try {
                        element.set({ objectCaching: false })
                        if (element.id === key) {
                            element.set({ text: val.toString() })
                        }
                    } catch (error) {
                        alert(error);
                        return;
                    }
                });
                canvas.requestRenderAll();
            });

            // changeText(key, val)

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
            {currentPlayer1}
            <div style={{ display: 'flex' }}>
                <div>
                    <table border='1'>
                        <tbody>
                            {playerList1.map((val, i) => {
                                return (<tr key={uuidv4()}><td
                                    onClick={() => setCurrentPlayer1(val)}
                                    onDoubleClick={() => {
                                        setCurrentPlayer1(val);
                                        recallPage('PlayerId1', 'f0', val)
                                    }}>{val}</td></tr>)
                            })}
                        </tbody>
                    </table>

                </div>
                <div>

                    <table border='1'>
                        <tbody>
                            {playerList2.map((val, i) => {
                                return (<tr key={uuidv4()}><td onClick={() => setCurrentPlayer1(val)} onDoubleClick={() => {
                                    setCurrentPlayer1(val);
                                    recallPage('PlayerId2', 'f0', val)
                                }}>{val}</td></tr>)
                            })}
                        </tbody>
                    </table>

                </div>
            </div>

            <div >
                <button onClick={() => recallPage('PlayerId1', 'f0', currentPlayer1)}>Template PlayerId1 <FaPlay /></button>
                <button onClick={() => {
                    stopGraphics(500);
                }} ><FaStop /></button>
                <button onClick={() => recallPage('PlayerId2', 'f0', currentPlayer1)}>Template PlayerId2<FaPlay /></button>
                <button onClick={() => {
                    stopGraphics(500);
                }} ><FaStop /></button>
            </div>


        </div>
    )
}

export default Hockey
