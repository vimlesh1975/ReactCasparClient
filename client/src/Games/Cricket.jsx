import React from 'react'
import { useState, useEffect } from 'react'
import { templateLayers, recallPage, updateData, stopGraphics } from '../common'
import { useSelector } from 'react-redux'



const Cricket = () => {
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const canvasList = useSelector(state => state.canvasListReducer.canvasList);
    const currentscreenSize = useSelector(state => state.currentscreenSizeReducer.currentscreenSize);


    const [team1, setTeam1] = useState('ONGC Cricket');
    const [info1, setInfo1] = useState('This Over 2 1 0 6 0 1');
    const [info2, setInfo2] = useState('Target 225');
    const [run, setRun] = useState(125);
    const [wicket, setWicket] = useState(2);
    const [over, setOver] = useState(3.2);
    const [autoUpdate, setAutoUpdate] = useState(true)
    const dataCricket = [
        { key: 'teamName', value: team1, type: 'text' },
        { key: 'info1', value: info1, type: 'text' },
        { key: 'info2', value: info2, type: 'text' },

        { key: 'score', value: run + '/' + wicket + '(' + over + ')', type: 'text' },
        { key: 'Wicket', value: wicket, type: 'text' },
        { key: 'overDecimal', value: (over - Math.floor(over)).toFixed(1) * 10, type: 'text' },
    ]

    useEffect(() => {
        if (autoUpdate) {
            updateData(templateLayers.cricketScore, 'cricket_score', dataCricket, canvasList, canvas)
        }
        return () => {
        }
        // eslint-disable-next-line
    }, [run, wicket, over, team1, info1, info2])

    return (<div>


        <div>
            Team1: <input value={team1} style={{ width: 150 }} onChange={e => setTeam1(e.target.value)} />
            Info1: <input value={info1} style={{ width: 150 }} onChange={e => setInfo1(e.target.value)} />
            Info2: <input value={info2} style={{ width: 150 }} onChange={e => setInfo2(e.target.value)} />
            <div>
                Runs: <input value={run} style={{ width: 50 }} onChange={e => setRun(e.target.value)} /> <button onClick={() => {
                    setRun(val => parseInt(val) + 1);
                }}> +</button>
            </div>
            <div>
                Over:  <input value={over} style={{ width: 50 }} onChange={e => setOver(e.target.value)} /> <button onClick={() => {
                    if (over % 1 === 0.5) {
                        setOver(val => (parseFloat(val) + 0.5).toFixed(1));
                    }
                    else {
                        setOver(val => (parseFloat(val) + 0.1).toFixed(1));
                    }

                }}> +</button>
            </div>

            Wicket:  <input value={wicket} style={{ width: 50 }} onChange={e => setRun(e.target.value)} /> <button onClick={() => setWicket(val => parseInt(val) + 1)}> +</button>

        </div>

        <div>
            <button onClick={() => recallPage(templateLayers.cricketScore, 'cricket_score', dataCricket, canvasList, canvas, currentscreenSize)} >Play</button>
            <input type={'checkbox'} checked={autoUpdate} onChange={e => setAutoUpdate(val => !val)} />Auto Update
            <button onClick={() => updateData(templateLayers.cricketScore, 'cricket_score', dataCricket, canvasList, canvas)} >Update</button>
            <button onClick={() => stopGraphics(templateLayers.cricketScore)} >Stop</button>
        </div>

    </div >)
}

export default Cricket