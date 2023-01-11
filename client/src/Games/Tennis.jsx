import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import { stopGraphics, recallPage, updateData, templateLayers } from '../common'

const Tennis = () => {
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const canvasList = useSelector(state => state.canvasListReducer.canvasList);
    const currentscreenSize = useSelector(state => state.currentscreenSizeReducer.currentscreenSize);
    const [t1Set, setT1Set] = useState(1);
    const [t2Set, setT2Set] = useState(2);

    const [t1game, setT1game] = useState(3);
    const [t2game, setT2game] = useState(4);

    const [t1point, setT1point] = useState(15);
    const [t2point, setT2point] = useState(30);

    const [showService, setShowService] = useState(true)
    const [service, setService] = useState(true)
    const [badminton, setBadminton] = useState(false)


    const team1pointincrease = () => {
        if (badminton) {
            setT1point(val => parseInt(val) + 1);
            setService(true);
            return
        }
        if ((t1point === '40') && (t2point === '40')) {
            setT1point('AD');
        }
        else if (t1point === 'AD') {
            setT1point('0');
            setT2point('0');
            setT1game(val => parseInt(val) + 1)
        }
        else if ((t1point === '40') && (t2point !== '40') && (t2point !== 'AD')) {
            setT1point('0');
            setT2point('0');
            setT1game(val => parseInt(val) + 1)

        }
        else if ((t1point === '40') && (t2point === 'AD')) {
            setT2point('40');
        }
        else if (parseInt(t1point) === 30) {
            setT1point('40');
        }
        else {
            setT1point(val => parseInt(val) + 15);
        }
    }
    const team2pointincrease = () => {
        if (badminton) {
            setT2point(val => parseInt(val) + 1);
            setService(false);
            return

        }
        if ((t1point === '40') && (t2point === '40')) {
            setT2point('AD');
        }
        else if (t2point === 'AD') {
            setT2point('0');
            setT1point('0');
            setT2game(val => parseInt(val) + 1)
        }
        else if ((t2point === '40') && (t1point !== '40') && (t1point !== 'AD')) {
            setT2point('0');
            setT1point('0');
            setT2game(val => parseInt(val) + 1)

        }
        else if ((t2point === '40') && (t1point === 'AD')) {
            setT1point('40');
        }
        else if (parseInt(t2point) === 30) {
            setT2point('40');
        }
        else {
            setT2point(val => parseInt(val) + 15);
        }
    }
    const team1pointDecrease = () => {
        if (badminton) { return setT1point(val => parseInt(val) - 1) }
        if (t1point === 'AD') {
            setT1point('40');
        }
        else if (t1point === '40') {
            setT1point('30');
        }
        else if (parseInt(t1point) !== 0) {
            setT1point(val => parseInt(val) - 15);
        }

    }

    const team2pointDecrease = () => {
        if (badminton) { return setT2point(val => parseInt(val) - 1) }
        if (t2point === 'AD') {
            setT2point('40');
        }
        else if (t2point === '40') {
            setT2point('30');
        }
        else if (parseInt(t2point) !== 0) {
            setT2point(val => parseInt(val) - 15);
        }
    }

    const resetData = () => {
        setT1Set(0);
        setT2Set(0);
        setT1game(0);
        setT2game(0);
        setT1point(0);
        setT2point(0);
    }
    return (<div>
        <div>
            <h1> Score</h1>
            <table border='1' style={{ border: '1px solid green' }}>
                <tbody>
                    <tr><th>Set</th><th>Game</th><th>Point</th><th>+</th><th>-</th><th>showService: <input type='checkbox' checked={showService} onChange={() => setShowService(val => !val)}></input></th></tr>
                    <tr><td><input style={{ width: 30 }} type='text' onChange={e => setT1Set(e.target.value)} value={t1Set} /></td><td><input style={{ width: 30 }} type='text' onChange={e => setT1game(e.target.value)} value={t1game} /></td><td><input style={{ width: 30 }} type='text' onChange={e => setT1point(e.target.value)} value={t1point} /></td><td>  <button onClick={team1pointincrease}>+</button></td><td>  <button onClick={team1pointDecrease}>-</button></td><td> <input onChange={e => setService(!service)} type="radio" checked={service} value='t1' name="service" /></td></tr>
                    <tr><td><input style={{ width: 30 }} type='text' onChange={e => setT2Set(e.target.value)} value={t2Set} /></td><td><input style={{ width: 30 }} type='text' onChange={e => setT2game(e.target.value)} value={t2game} /></td><td><input style={{ width: 30 }} type='text' onChange={e => setT2point(e.target.value)} value={t2point} /></td><td>  <button onClick={team2pointincrease}>+</button></td><td>  <button onClick={team2pointDecrease}>-</button></td><td> <input onChange={e => setService(!service)} type="radio" checked={!service} value='t2' name="service" /></td></tr>
                </tbody>
            </table>
            <button onClick={() => recallPage(templateLayers.tennisScore, 'Crunch Scoreboard', [{ key: 'service1', value: (showService && service) ? 1 : 0, type: 'opacity' }, { key: 'service2', value: (showService && !service) ? 1 : 0, type: 'opacity' }, { key: 't1set', value: t1Set, type: 'text' }, { key: 't2set', value: t2Set, type: 'text' }, { key: 't1game', value: t1game, type: 'text' }, { key: 't2game', value: t2game, type: 'text' }, { key: 't1point', value: t1point, type: 'text' }, { key: 't2point', value: t2point, type: 'text' },], canvasList, canvas, currentscreenSize)}>Show</button>
            <button onClick={() => updateData(templateLayers.tennisScore, 'Crunch Scoreboard', [{ key: 'service1', value: (showService && service) ? 1 : 0, type: 'opacity' }, { key: 'service2', value: (showService && !service) ? 1 : 0, type: 'opacity' }, { key: 't1set', value: t1Set, type: 'text' }, { key: 't2set', value: t2Set, type: 'text' }, { key: 't1game', value: t1game, type: 'text' }, { key: 't2game', value: t2game, type: 'text' }, { key: 't1point', value: t1point, type: 'text' }, { key: 't2point', value: t2point, type: 'text' },], canvasList, canvas)}>updateData</button>
            <button onClick={() => stopGraphics(templateLayers.tennisScore)}>Stop</button>
            <button onClick={resetData}>Reset Data</button>

        </div>
        <div>
            Badminton: <input type='checkbox' checked={badminton} onChange={() => setBadminton(val => !val)}></input>
        </div>
    </div>
    )
}

export default Tennis
