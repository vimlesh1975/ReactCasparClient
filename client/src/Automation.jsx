import React, { useEffect, useState } from 'react'
import socketIOClient from "socket.io-client";
import { useSelector } from 'react-redux'
import { fabric } from "fabric";
import { endpoint } from './common'
import DrawingAutomation from './DrawingAutomation';

const Automation = () => {
    const canvasList = useSelector(state => state.canvasListReducer.canvasList);
    const currentscreenSize = useSelector(state => state.currentscreenSizeReducer.currentscreenSize);

    const [allowAutomation, setAllowAutomation] = useState(false)
    const [dataReceived, setDataReceived] = useState();

    useEffect(() => {
        const socket = socketIOClient(':8080');
        if (allowAutomation.toString() === 'true') {
            socket.on("recallPage", data => {
                recallPage(data.layerNumber, data.pageName, JSON.parse(data.data));
                setDataReceived(JSON.stringify(data));
            });

            socket.on("updateData", data => {
                updateData(data.layerNumber, JSON.parse(data.data));
                setDataReceived(JSON.stringify(data));

            });
            socket.on("stopGraphics", data => {
                stopGraphics(data.layerNumber);
                setDataReceived(JSON.stringify(data));
            });
            socket.on("startGameTimer", data => {
                recallPage(data.layerNumber, data.pageName, JSON.parse(data.data));
                startGameTimer(data.layerNumber, data.initialMinute, data.initialSecond, data.countUp);
                setDataReceived(JSON.stringify(data));
            });
            socket.on("pauseGameTimer", data => {
                pauseGameTimer(data.layerNumber);
                setDataReceived(JSON.stringify(data));
            });
            socket.on("resumeGameTimer", data => {
                resumeGameTimer(data.layerNumber, data.countUp);
                setDataReceived(JSON.stringify(data));
            });

        }
        else {
            socket?.removeListener('recallPage');
            socket?.off('recallPage');
            socket?.disconnect();
        }
        return () => {
            socket?.removeListener('recallPage');
            socket?.off('recallPage');
            socket?.disconnect();
        }
        // eslint-disable-next-line
    }, [allowAutomation, canvasList])

    const recallPage = (layerNumber, pageName, data) => {
        try {
            const index = canvasList.findIndex(val => val.pageName.toLowerCase() === pageName.toLowerCase());
            if (index !== -1) {
                const data1 = data;
                window.automationeditor[0].canvas.loadFromJSON(canvasList[index].pageValue, () => {
                    data1.forEach(data2 => {
                        window.automationeditor[0].canvas.getObjects().forEach((element) => {
                            try {
                                element.set({ selectable: false, strokeUniform: true,strokeWidth:element.strokeWidth/3 });
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
            else { alert(`${pageName} page not found in canvas list. Make a page with this name, add ${data.length}  text and set id of texts as ${data.map(val => { return val.key })} then update the page`) }
        } catch (error) {
        }

    }
    const updateGraphics = layerNumber => {
        endpoint(`call ${window.chNumber}-${layerNumber} "
        aa.innerHTML='${(window.automationeditor[0].canvas.toSVG()).replaceAll('"', '\\"')}';
            "`)
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

    const updateData = (layerNumber, data) => {
        const data1 = data;
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
        setTimeout(() => {
            updateGraphics(layerNumber)
        }, 300);

    }
    const stopGraphics = layerNumber => {
        endpoint(`mixer ${window.chNumber}-${layerNumber} fill 0 0 0 1 12 ${window.animationMethod}`)
        setTimeout(() => {
            endpoint(`stop ${window.chNumber}-${layerNumber}`)
        }, 1000);
    }

    const startGameTimer = (layerNumber = 96, initialMinute = 45, initialSecond = 0, countUp = false) => {
        setTimeout(() => {
            endpoint(`call ${window.chNumber}-${layerNumber} "
            var cc=document.getElementById('gameTimer1').getElementsByTagName('tspan')[0];
            var startTime = new Date();
            startTime.setMinutes(${initialMinute});
            startTime.setSeconds(${initialSecond});
            var xxx=setInterval(()=>{
               startTime.setSeconds(startTime.getSeconds() ${(countUp === 'true') ? '+' : '-'} 1);
                var ss1 =  ((startTime.getMinutes()).toString()).padStart(2, '0') + ':' + ((startTime.getSeconds()).toString()).padStart(2, '0');
                cc.textContent  =ss1;
              }, 1000);
            "`)

        }, 1500);
    }

    const pauseGameTimer = (layerNumber) => {

        endpoint(`call ${window.chNumber}-${layerNumber} "
           clearInterval(xxx);
            "`)
    }
    const resumeGameTimer = (layerNumber, countUp) => {
        endpoint(`call ${window.chNumber}-${layerNumber} "
        clearInterval(xxx);
         xxx=setInterval(()=>{
            startTime.setSeconds(startTime.getSeconds() ${(countUp === 'true') ? '+' : '-'} 1);
             var ss1 =  ((startTime.getMinutes()).toString()).padStart(2, '0') + ':' + ((startTime.getSeconds()).toString()).padStart(2, '0');
             cc.textContent  =ss1;
           }, 1000);
         "`)
    }


    return (
        <div>
            <label> Allow Automation<input type="checkbox" onChange={(e) => setAllowAutomation(val => !val)} defaultChecked={false} /></label>
            <div style={{ opacity: 100 }} className='automation-preview-container' >
                <DrawingAutomation i={0} />
            </div>
            <div>
                <span>Data Recieved</span>
                <br />  <textarea cols={40} rows={8} value={dataReceived} />
            </div>
        </div>
    )
}

export default Automation
