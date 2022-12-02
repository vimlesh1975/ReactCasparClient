import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { fabric } from "fabric";
import { endpoint, tempAlert, templateLayers, updateGraphics, stopGraphics, sendtohtml } from '../common'
const Kabaddi = () => {
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const canvasList = useSelector(state => state.canvasListReducer.canvasList);
    const currentscreenSize = useSelector(state => state.currentscreenSizeReducer.currentscreenSize);

    const [team1, setteam1] = useState('MUMBAI');
    const [score1, setScore1] = useState(22);
    const [team1Status, setteam1Status] = useState([0, 0, 0, 1, 1, 1, 1]);


    const [team2, setteam2] = useState('BANGALORE');
    const [score2, setScore2] = useState(32);
    const [team2Status, setteam2Status] = useState([0, 1, 1, 1, 1, 1, 1]);

    const [half, setHalf] = useState('1ST');
    const dataKabaddi = [
        { key: 'TEAM1', value: team1, type: 'text' },
        { key: 'TEAM2', value: team2, type: 'text' },
        { key: 'SCORE1', value: score1, type: 'text' },
        { key: 'SCORE2', value: score2, type: 'text' },
        { key: 'HALF', value: half, type: 'text' },
        { key: '10', value: team1Status[0] ? '0DDF1A' : 'red', type: 'fill' },
        { key: '11', value: team1Status[1] ? '0DDF1A' : 'red', type: 'fill' },
        { key: '12', value: team1Status[2] ? '0DDF1A' : 'red', type: 'fill' },
        { key: '13', value: team1Status[3] ? '0DDF1A' : 'red', type: 'fill' },
        { key: '14', value: team1Status[4] ? '0DDF1A' : 'red', type: 'fill' },
        { key: '15', value: team1Status[5] ? '0DDF1A' : 'red', type: 'fill' },
        { key: '16', value: team1Status[6] ? '0DDF1A' : 'red', type: 'fill' },

        { key: '20', value: team2Status[0] ? '0DDF1A' : 'red', type: 'fill' },
        { key: '21', value: team2Status[1] ? '0DDF1A' : 'red', type: 'fill' },
        { key: '22', value: team2Status[2] ? '0DDF1A' : 'red', type: 'fill' },
        { key: '23', value: team2Status[3] ? '0DDF1A' : 'red', type: 'fill' },
        { key: '24', value: team2Status[4] ? '0DDF1A' : 'red', type: 'fill' },
        { key: '25', value: team2Status[5] ? '0DDF1A' : 'red', type: 'fill' },
        { key: '26', value: team2Status[6] ? '0DDF1A' : 'red', type: 'fill' },
    ];

    const recallPage = (layerNumber, pageName, data) => {
        const index = canvasList.findIndex(val => val.pageName === pageName);
        if (index !== -1) {
            const data1 = data;
            canvas.loadFromJSON(canvasList[index].pageValue, () => {
                data1.forEach(data2 => {
                    canvas.getObjects().forEach((element) => {
                        element.set({ selectable: false, strokeUniform: false });
                        try {
                            if (element.id === data2.key) {
                                if (data2.type === 'text') {
                                    const originalWidth = element.width;
                                    element.set({ objectCaching: false, text: data2.value.toString() })
                                    if (element.textLines.length > 1) {
                                        do {
                                            element.set({ width: element.width + 5 });
                                        }
                                        while (element.textLines.length > 1);
                                        element.set({ scaleX: originalWidth / element.width });
                                    }
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
                canvas.requestRenderAll();
                sendToCasparcg(layerNumber)
            });
        }
        else { tempAlert('Pagename not avalaible', 1000) }
    }
    const sendToCasparcg = (layerNumber) => {
        sendtohtml(canvas);//for html

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
    aa.style.zoom=(${currentscreenSize * 100}/1920)+'%';
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
    //aa.innerHTML=\\"<img src='${(canvas.toDataURL('png'))}' />\\" ; png method
    // const updateGraphics = layerNumber => {
    //     sendtohtml(canvas);//for html
    //     endpoint(`call ${window.chNumber}-${layerNumber} "
    // aa.innerHTML='${(canvas.toSVG()).replaceAll('"', '\\"')}';
    //     "`)
    // }
    // const stopGraphics = layerNumber => {
    //     endpoint(`mixer ${window.chNumber}-${layerNumber} fill 0 0 0 1 12 ${window.animationMethod}`)
    //     setTimeout(() => {
    //         endpoint(`stop ${window.chNumber}-${layerNumber}`)
    //     }, 1000);
    // }
    const updateData = (layerNumber, pageName, data) => {
        const index = canvasList.findIndex(val => val.pageName === pageName);
        if (index !== -1) {
            // dispatch({ type: 'CHANGE_CURRENT_PAGE', payload: index })
            const data1 = data;
            canvas.loadFromJSON(canvasList[index].pageValue, () => {
                data1.forEach(data2 => {
                    canvas.getObjects().forEach((element) => {
                        element.set({ selectable: false, strokeUniform: false });
                        try {
                            if (element.id === data2.key) {
                                if (data2.type === 'text') {
                                    const originalWidth = element.width;
                                    element.set({ objectCaching: false, text: data2.value.toString() })
                                    if (element.textLines.length > 1) {
                                        do {
                                            element.set({ width: element.width + 5 });
                                        }
                                        while (element.textLines.length > 1);
                                        element.set({ scaleX: originalWidth / element.width });
                                    }
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

                canvas.requestRenderAll();
                setTimeout(() => {
                    updateGraphics(canvas, layerNumber)
                }, 300);

            });
        }
    }
    const refteam1status = useRef()
    return (<div>
        <div style={{ display: 'flex' }}>
            <div>
                <input onChange={e => setteam1(e.target.value)} style={{ textAlign: 'center' }} type='text' value={team1} />
                <input onChange={e => setScore1(e.target.value)} style={{ width: 40, textAlign: 'center' }} type='number' value={score1} />
                <br />
                {team1Status.map((val, i) => <input disabled key={i} key1={i}
                    onChange={e => {
                        const updatedStatus = [...team1Status];
                        updatedStatus[i] = e.target.checked;
                        setteam1Status(updatedStatus);
                    }} type='checkbox' checked={val} />)}
                <input ref={refteam1status} style={{ width: 30, textAlign: 'center' }} type={'number'} min={0} max={7} defaultValue={team1Status.filter(Boolean).length} onChange={e => setteam1Status(val => Array.from(val).map((val1, i) => (6 - i < e.target.value) ? 1 : 0))} />

            </div>
            <button onClick={() => {
                setScore1(val => parseInt(val) + 1);
                // refteam1status.current.value -= 1;
                // setteam2Status([0, 0, 1, 1, 1, 1, 1])
            }}>+1 </button>
            <input onChange={e => setHalf(e.target.value)} style={{ width: 30, textAlign: 'center' }} type='text' value={half} />
            <button onClick={() => setScore2(val => parseInt(val) + 1)}>+1 </button>


            <div>
                <input onChange={e => setScore2(e.target.value)} style={{ width: 40, textAlign: 'center' }} type='number' value={score2} />
                <input onChange={e => setteam2(e.target.value)} style={{ textAlign: 'center' }} type='text' value={team2} />
                <div style={{ textAlign: 'right' }}>  {team2Status.map((val, i) => <input disabled key={i} onChange={e => {
                    const updatedStatus = [...team2Status];
                    updatedStatus[i] = e.target.checked;
                    setteam2Status(updatedStatus);
                }} type='checkbox' checked={val} />)}
                    <input style={{ width: 30, textAlign: 'center' }} type={'number'} min={0} max={7} defaultValue={team1Status.filter(Boolean).length} onChange={e => setteam2Status(val => Array.from(val).map((val1, i) => (6 - i < e.target.value) ? 1 : 0))} />

                </div>
            </div>
        </div>

        <div>
            <button onClick={() => recallPage(templateLayers.kabaddiScore, 'kabaddi', dataKabaddi)} >Play</button>
            <button onClick={() => updateData(templateLayers.kabaddiScore, 'kabaddi', dataKabaddi)} >Update</button>
            <button onClick={() => stopGraphics(templateLayers.kabaddiScore)} >Stop</button>
        </div>
    </div>)
}

export default Kabaddi