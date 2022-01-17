import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import { fabric } from "fabric";
import { endpoint } from '../common'

const Tennis = () => {
    const canvasList = useSelector(state => state.canvasListReducer.canvasList);
    const currentscreenSize = localStorage.getItem('RCC_currentscreenSize');

    const [t1Set, setT1Set] = useState(1);
    const [t2Set, setT2Set] = useState(2);

    const [t1game, setT1game] = useState(3);
    const [t2game, setT2game] = useState(4);

    const [t1point, setT1point] = useState(15);
    const [t2point, setT2point] = useState(30);

    const [showService, setShowService] = useState(true)
    const [service, setService] = useState('t1')
    const [badminton, setBadminton] = useState(false)


    const team1pointincrease = () => {
        if(badminton){return setT1point(val=>parseInt(val)+1)}
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
        if(badminton){return setT2point(val=>parseInt(val)+1)}
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
        if(badminton){return setT1point(val=>parseInt(val)-1)}
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
        if(badminton){return setT2point(val=>parseInt(val)-1)}
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
    const updateData = (layerNumber, pageName, data) => {
        const index = canvasList.findIndex(val => val.pageName === pageName);
        if (index !== -1) {
            // dispatch({ type: 'CHANGE_CURRENT_PAGE', payload: index })
            const data1 = data;
            window.automationeditor[0].canvas.loadFromJSON(canvasList[index].pageValue, () => {
                data1.forEach(data2 => {
                    window.automationeditor[0].canvas.getObjects().forEach((element) => {
                        try {
                            if (element.id === data2.key) {
                                if (data2.type === 'text') {
                                    element.set({ text: data2.value.toString() })
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
                                else if (data2.type === 'shadow') {
                                    element.set({ shadow: { ...element.shadow, ...data2.value } })
                                }
                                else {
                                    element.set({ [data2.type]: data2.value })
                                }
                            }
                        } catch (error) {
                        }
                    });
                });
                // sendToCasparcg(layerNumber)
                setTimeout(() => {
                    updateGraphics(layerNumber)
                }, 300);

            });
        }
    }

    const recallPage = (layerNumber, pageName, data) => {
        const index = canvasList.findIndex(val => val.pageName === pageName);
        if (index !== -1) {
            // dispatch({ type: 'CHANGE_CURRENT_PAGE', payload: index })
            const data1 = data;
            window.automationeditor[0].canvas.loadFromJSON(canvasList[index].pageValue, () => {
                data1.forEach(data2 => {
                    window.automationeditor[0].canvas.getObjects().forEach((element) => {
                        try {
                            if (element.id === data2.key) {
                                if (data2.type === 'text') {
                                    element.set({ text: data2.value.toString() })
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
                                else if (data2.type === 'shadow') {
                                    element.set({ shadow: { ...element.shadow, ...data2.value } })
                                }
                                else {
                                    element.set({ [data2.type]: data2.value })
                                }
                            }
                        } catch (error) {
                        }
                    });
                });
                sendToCasparcg(layerNumber)
            });
        }
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
    aa.innerHTML='${(window.automationeditor[0].canvas.toSVG()).replaceAll('"', '\\"')}';
    document.body.appendChild(aa);
    document.body.style.margin='0';
    document.body.style.padding='0';
    aa.style.zoom=(${currentscreenSize * 100}/309)+'%';
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
    //aa.innerHTML=\\"<img src='${(window.automationeditor[0].canvas.toDataURL('png'))}' />\\" ; png method
    const updateGraphics = layerNumber => {
        endpoint(`call ${window.chNumber}-${layerNumber} "
    aa.innerHTML='${(window.automationeditor[0].canvas.toSVG()).replaceAll('"', '\\"')}';
        "`)
    }
    const stopGraphics = layerNumber => {
        endpoint(`mixer ${window.chNumber}-${layerNumber} fill 0 0 0 1 12 ${window.animationMethod}`)
        setTimeout(() => {
            endpoint(`stop ${window.chNumber}-${layerNumber}`)
        }, 1000);
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
                    <tr><td><input style={{ width: 30 }} type='text' onChange={e => setT1Set(e.target.value)} value={t1Set} /></td><td><input style={{ width: 30 }} type='text' onChange={e => setT1game(e.target.value)} value={t1game} /></td><td><input style={{ width: 30 }} type='text' onChange={e => setT1point(e.target.value)} value={t1point} /></td><td>  <button onClick={team1pointincrease}>+</button></td><td>  <button onClick={team1pointDecrease}>-</button></td><td> <input onChange={e => setService(e.target.value)} type="radio" checked value='t1' name="service" /></td></tr>
                    <tr><td><input style={{ width: 30 }} type='text' onChange={e => setT2Set(e.target.value)} value={t2Set} /></td><td><input style={{ width: 30 }} type='text' onChange={e => setT2game(e.target.value)} value={t2game} /></td><td><input style={{ width: 30 }} type='text' onChange={e => setT2point(e.target.value)} value={t2point} /></td><td>  <button onClick={team2pointincrease}>+</button></td><td>  <button onClick={team2pointDecrease}>-</button></td><td> <input onChange={e => setService(e.target.value)} type="radio" value='t2' name="service" /></td></tr>
                </tbody>
            </table>
            <button onClick={() => recallPage(96, 'Crunch Scoreboard', [{ key: 'service1', value: (showService && service === 't1') ? 1 : 0, type: 'opacity' }, { key: 'service2', value: (showService && service === 't2') ? 1 : 0, type: 'opacity' }, { key: 't1set', value: t1Set, type: 'text' }, { key: 't2set', value: t2Set, type: 'text' }, { key: 't1game', value: t1game, type: 'text' }, { key: 't2game', value: t2game, type: 'text' }, { key: 't1point', value: t1point, type: 'text' }, { key: 't2point', value: t2point, type: 'text' },])}>Show</button>
            <button onClick={() => updateData(96, 'Crunch Scoreboard', [{ key: 'service1', value: (showService && service === 't1') ? 1 : 0, type: 'opacity' }, { key: 'service2', value: (showService && service === 't2') ? 1 : 0, type: 'opacity' }, { key: 't1set', value: t1Set, type: 'text' }, { key: 't2set', value: t2Set, type: 'text' }, { key: 't1game', value: t1game, type: 'text' }, { key: 't2game', value: t2game, type: 'text' }, { key: 't1point', value: t1point, type: 'text' }, { key: 't2point', value: t2point, type: 'text' },])}>updateData</button>

            <button onClick={() => stopGraphics(96)}>Stop</button>
            <button onClick={resetData}>Reset Data</button>

        </div>
        <div>
        Badminton: <input type='checkbox' checked={badminton} onChange={() => setBadminton(val => !val)}></input>
        </div> 
    </div>
    )
}

export default Tennis
