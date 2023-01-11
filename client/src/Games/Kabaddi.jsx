import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { templateLayers, stopGraphics, recallPage, updateData } from '../common'
const Kabaddi = () => {
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const canvasList = useSelector(state => state.canvasListReducer.canvasList);
    const currentscreenSize = useSelector(state => state.currentscreenSizeReducer.currentscreenSize);

    const [team1, setteam1] = useState('MUMBAI');
    const [score1, setScore1] = useState(22);
    const [team1Status1, setteam1Status1] = useState(4);
    const [autoUpdate, setAutoUpdate] = useState(false)


    const [team2, setteam2] = useState('BANGALORE');
    const [score2, setScore2] = useState(32);
    const [team2Status1, setteam2Status1] = useState(5);

    const [half, setHalf] = useState('1ST');
    const dataKabaddi = [
        { key: 'TEAM1', value: team1, type: 'text' },
        { key: 'TEAM2', value: team2, type: 'text' },
        { key: 'SCORE1', value: score1, type: 'text' },
        { key: 'SCORE2', value: score2, type: 'text' },
        { key: 'HALF', value: half, type: 'text' },
        { key: '10', value: (team1Status1 > 6) ? '#0DDF1A' : 'red', type: 'fill' },
        { key: '11', value: (team1Status1 > 5) ? '#0DDF1A' : 'red', type: 'fill' },
        { key: '12', value: (team1Status1 > 4) ? '#0DDF1A' : 'red', type: 'fill' },
        { key: '13', value: (team1Status1 > 3) ? '#0DDF1A' : 'red', type: 'fill' },
        { key: '14', value: (team1Status1 > 2) ? '#0DDF1A' : 'red', type: 'fill' },
        { key: '15', value: (team1Status1 > 1) ? '#0DDF1A' : 'red', type: 'fill' },
        { key: '16', value: (team1Status1 > 0) ? '#0DDF1A' : 'red', type: 'fill' },

        { key: '20', value: (team2Status1 > 6) ? '#0DDF1A' : 'red', type: 'fill' },
        { key: '21', value: (team2Status1 > 5) ? '#0DDF1A' : 'red', type: 'fill' },
        { key: '22', value: (team2Status1 > 4) ? '#0DDF1A' : 'red', type: 'fill' },
        { key: '23', value: (team2Status1 > 3) ? '#0DDF1A' : 'red', type: 'fill' },
        { key: '24', value: (team2Status1 > 2) ? '#0DDF1A' : 'red', type: 'fill' },
        { key: '25', value: (team2Status1 > 1) ? '#0DDF1A' : 'red', type: 'fill' },
        { key: '26', value: (team2Status1 > 0) ? '#0DDF1A' : 'red', type: 'fill' },
    ];

    // const recallPage = (layerNumber, pageName, data) => {
    //     const index = canvasList.findIndex(val => val.pageName === pageName);
    //     if (index !== -1) {
    //         const data1 = data;
    //         canvas.loadFromJSON(canvasList[index].pageValue, () => {
    //             data1.forEach(data2 => {
    //                 canvas.getObjects().forEach((element) => {
    //                     element.set({ selectable: false, strokeUniform: false });
    //                     try {
    //                         if (element.id === data2.key) {
    //                             if (data2.type === 'text') {
    //                                 const originalWidth = element.width;
    //                                 element.set({ objectCaching: false, text: data2.value.toString() })
    //                                 if (element.textLines.length > 1) {
    //                                     do {
    //                                         element.set({ width: element.width + 5 });
    //                                     }
    //                                     while (element.textLines.length > 1);
    //                                     element.set({ scaleX: originalWidth / element.width });
    //                                 }
    //                             }
    //                             else if (data2.type === 'image') {
    //                                 var i = new Image();
    //                                 i.onload = function () {
    //                                     const originalWidth = (element.width) * (element.scaleX);
    //                                     const originalHeight = (element.height) * (element.scaleY);
    //                                     element.set({ objectCaching: false, scaleX: (originalWidth / i.width), scaleY: (originalHeight / i.height) })
    //                                     if (element.type === 'image') {
    //                                         element.setSrc(data2.value)
    //                                     }
    //                                     else if (element.type === 'rect') {
    //                                         element.set({ width: i.width, height: i.height, fill: new fabric.Pattern({ source: data2.value, repeat: 'no-repeat' }) })
    //                                     }
    //                                 };
    //                                 i.src = data2.value;
    //                             }
    //                             else if (data2.type === 'shadow') {
    //                                 element.set({ shadow: { ...element.shadow, ...data2.value } })
    //                             }
    //                             else {
    //                                 element.set({ [data2.type]: data2.value })
    //                             }
    //                         }
    //                     } catch (error) {
    //                     }
    //                 });
    //             });
    //             canvas.requestRenderAll();
    //             sendToCasparcg(layerNumber)
    //         });
    //     }
    //     else { tempAlert('Pagename not avalaible', 1000) }
    // }
    // const sendToCasparcg = (layerNumber) => {
    //     canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);

    //     executeScript(`document.getElementById('divid_${layerNumber}')?.remove()`);

    //     endpoint(`mixer ${window.chNumber}-${layerNumber} fill 0 0 0 1 6 ${window.animationMethod}`)
    //     setTimeout(() => {
    //         endpoint(`play ${window.chNumber}-${layerNumber} [HTML] xyz.html`);
    //     }, 250);
    //     const script = `
    //     var aa = document.createElement('div');
    //     aa.style.position='absolute';
    //     aa.setAttribute('id','divid_' + '${layerNumber}');
    //     aa.style.zIndex = ${layerNumber};
    //     aa.innerHTML=\`${(canvas.toSVG()).replaceAll('"', '\\"')}\`;
    //     document.body.appendChild(aa);
    //     document.body.style.margin='0';
    //     document.body.style.padding='0';
    //     aa.style.zoom=(${currentscreenSize * 100}/1920)+'%';
    //     document.body.style.overflow='hidden';
    //     `
    //     executeScript(script);

    //     setTimeout(() => {
    //         endpoint(`call ${window.chNumber}-${layerNumber} "
    //         ${script}
    //         "`)
    //     }, 300);
    //     setTimeout(() => {
    //         endpoint(`mixer ${window.chNumber}-${layerNumber} fill 0 0 1 1 10 ${window.animationMethod}`)
    //     }, 800);

    //     setTimeout(() => {
    //         updateGraphics(layerNumber);
    //     }, 1100);
    // }

    // const updateData = (layerNumber, pageName, data) => {
    //     const index = canvasList.findIndex(val => val.pageName === pageName);
    //     if (index !== -1) {
    //         const data1 = data;
    //         canvas.loadFromJSON(canvasList[index].pageValue, () => {
    //             data1.forEach(data2 => {
    //                 canvas.getObjects().forEach((element) => {
    //                     element.set({ selectable: false, strokeUniform: false });
    //                     try {
    //                         if (element.id === data2.key) {
    //                             if (data2.type === 'text') {
    //                                 const originalWidth = element.width;
    //                                 element.set({ objectCaching: false, text: data2.value.toString() })
    //                                 if (element.textLines.length > 1) {
    //                                     do {
    //                                         element.set({ width: element.width + 5 });
    //                                     }
    //                                     while (element.textLines.length > 1);
    //                                     element.set({ scaleX: originalWidth / element.width });
    //                                 }
    //                             }
    //                             else if (data2.type === 'image') {
    //                                 var i = new Image();
    //                                 i.onload = function () {
    //                                     const originalWidth = (element.width) * (element.scaleX);
    //                                     const originalHeight = (element.height) * (element.scaleY);
    //                                     element.set({ objectCaching: false, scaleX: (originalWidth / i.width), scaleY: (originalHeight / i.height) })
    //                                     if (element.type === 'image') {
    //                                         element.setSrc(data2.value)
    //                                     }
    //                                     else if (element.type === 'rect') {
    //                                         element.set({ width: i.width, height: i.height, fill: new fabric.Pattern({ source: data2.value, repeat: 'no-repeat' }) })
    //                                     }
    //                                 };
    //                                 i.src = data2.value;
    //                             }
    //                             else if (data2.type === 'shadow') {
    //                                 element.set({ shadow: { ...element.shadow, ...data2.value } })
    //                             }
    //                             else {
    //                                 element.set({ [data2.type]: data2.value })
    //                             }
    //                         }
    //                     } catch (error) {
    //                     }
    //                 });
    //             });

    //             canvas.requestRenderAll();
    //             setTimeout(() => {
    //                 updateGraphics(canvas, layerNumber)
    //             }, 300);

    //         });
    //     }
    // }

    useEffect(() => {
        if (autoUpdate) {
            updateData(templateLayers.kabaddiScore, 'kabaddi', dataKabaddi, canvasList, canvas)
        }

        return () => {
        }
        // eslint-disable-next-line
    }, [team1Status1, team2Status1, score1, score2])

    return (<div>
        <div style={{ display: 'flex' }}>
            <div>
                <input onChange={e => setteam1(e.target.value)} style={{ textAlign: 'center' }} type='text' value={team1} />
                <input onChange={e => setScore1(e.target.value)} style={{ width: 40, textAlign: 'center' }} type='number' value={score1} />
                <div style={{ textAlign: 'left' }}>
                    <input style={{ width: 30, textAlign: 'center' }} type={'number'} min={0} max={7} value={team1Status1} onChange={e => setteam1Status1(e.target.value)} />
                </div>
            </div>
            <button onClick={() => {
                if (team2Status1 > 1) {
                    setScore1(val => parseInt(val) + 1);
                    setteam2Status1(val => val - 1)
                }
                else {
                    setScore1(val => parseInt(val) + 1 + 2);
                    setteam2Status1(7)
                }

            }}>+1 </button>
            <button onClick={() => {
                if (team1Status1 > 1) {
                    setScore2(val => parseInt(val) + 1);
                    setteam1Status1(val => parseInt(val) - 1);
                }
                else {
                    setScore2(val => parseInt(val) + 1 + 2);
                    setteam1Status1(7);
                }

            }}>Out</button>
            <button onClick={() => {
                setScore1(val => parseInt(val) + 1);

            }}>Bonus</button>
            <input onChange={e => setHalf(e.target.value)} style={{ width: 30, textAlign: 'center' }} type='text' value={half} />
            <button onClick={() => {
                if (team1Status1 > 1) {
                    setScore2(val => parseInt(val) + 1);
                    setteam1Status1(val => val - 1)
                }
                else {
                    setScore2(val => parseInt(val) + 1 + 2);
                    setteam1Status1(7)
                }

            }}>+1 </button>
            <button onClick={() => {
                if (team2Status1 > 1) {
                    setScore1(val => parseInt(val) + 1);
                    setteam2Status1(val => parseInt(val) - 1);
                }
                else {
                    setScore1(val => parseInt(val) + 1 + 2);
                    setteam2Status1(7);
                }

            }}>Out</button>
            <button onClick={() => {
                setScore2(val => parseInt(val) + 1);

            }}>Bonus</button>

            <div>
                <input onChange={e => setScore2(e.target.value)} style={{ width: 40, textAlign: 'center' }} type='number' value={score2} />
                <input onChange={e => setteam2(e.target.value)} style={{ textAlign: 'center' }} type='text' value={team2} />
                <div style={{ textAlign: 'right' }}>

                    <input style={{ width: 30, textAlign: 'center' }} type={'number'} min={0} max={7} value={team2Status1} onChange={e => setteam2Status1(e.target.value)} />

                </div>
            </div>
        </div>

        <div>
            <button onClick={() => recallPage(templateLayers.kabaddiScore, 'kabaddi', dataKabaddi, canvasList, canvas, currentscreenSize)} >Play</button>
            <input type={'checkbox'} checked={autoUpdate} onChange={e => setAutoUpdate(val => !val)} />Auto Update
            <button onClick={() => updateData(templateLayers.kabaddiScore, 'kabaddi', dataKabaddi, canvasList, canvas)} >Update</button>
            <button onClick={() => stopGraphics(templateLayers.kabaddiScore)} >Stop</button>
        </div>
    </div>)
}

export default Kabaddi