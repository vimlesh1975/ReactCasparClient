import React, { useEffect, useState } from 'react'
import socketIOClient from "socket.io-client";
import { useSelector, useDispatch } from 'react-redux'
import { fabric } from "fabric";
import { endpoint } from './common'

const Automation = () => {
    const canvasList = useSelector(state => state.canvasListReducer.canvasList);
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const dispatch = useDispatch();
    const currentscreenSize = localStorage.getItem('RCC_currentscreenSize');
    const [allowAutomation, setAllowAutomation] = useState(false)

    useEffect(() => {
        const socket = socketIOClient(':8080');
        if (allowAutomation.toString() === 'true') {
            socket.on("recallPage", data => {
                recallPage(data.layerNumber, data.pageName, JSON.parse(data.data));
            });

            socket.on("updateData", data => {
                updateData(data.layerNumber, JSON.parse(data.data));
            });
            socket.on("stopGraphics", data => {
                stopGraphics(data.layerNumber);
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

    }, [allowAutomation, canvasList])

    const recallPage = (layerNumber, pageName, data) => {
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
                                    const aa = (element.width) * (element.scaleX);
                                    element.set({ objectCaching: false, text: data2.value.toString() })
                                    if (element.width > aa) { element.scaleToWidth(aa) }
                                    canvas.requestRenderAll();
                                }
                                else if (data2.type === 'image') {
                                    var i = new Image();
                                    i.onload = function () {
                                        console.log('img loaded')
                                        const originalWidth = (element.width) * (element.scaleX);
                                        const originalHeight = (element.height) * (element.scaleY);
                                        element.set({ objectCaching: false, scaleX: (originalWidth / i.width), scaleY: (originalHeight / i.height) })
                                        if (element.type === 'image') {
                                            element.setSrc(data2.value)
                                        }
                                        else if (element.type === 'rect') {
                                            element.set({ width: i.width, height: i.height, fill: new fabric.Pattern({ source: data2.value, repeat: 'no-repeat' }) })
                                        }
                                        canvas.requestRenderAll();
                                    };
                                    i.src = data2.value;
                                }
                            }
                            canvas.requestRenderAll();
                        } catch (error) {
                        }
                    });
                });
        canvas.requestRenderAll();
                sendToCasparcg(layerNumber)
            });
        }
        else { alert(`${pageName} page not found in canvas list. Make a page with this name, add ${data.length}  text and set id of texts as ${data.map(val => { return val.key })} then update the page`) }
    }
    const updateGraphics = layerNumber => {
        endpoint(`call ${window.chNumber}-${layerNumber} "
            aa.innerHTML='${(canvas.toSVG()).replaceAll('"', '\\"')}';
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

    const updateData = (layerNumber, data) => {
        const data1 = data;
        data1.forEach(data2 => {
            canvas.getObjects().forEach((element) => {
                try {
                    if (element.id === data2.key) {
                        if (data2.type === 'text') {
                            const aa = (element.width) * (element.scaleX);
                            element.set({ objectCaching: false, text: data2.value.toString() })
                            if (element.width > aa) { element.scaleToWidth(aa) }
                            canvas.requestRenderAll();
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
                                canvas.requestRenderAll();
                            };
                            i.src =data2.value;
                        }
                    }
                    canvas.requestRenderAll();
                } catch (error) {
                }
            });
        });
        canvas.requestRenderAll();
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
    return (
        <div>
            Allow Automation<input type="checkbox" onChange={(e) => setAllowAutomation(val => !val)} defaultChecked={false} />
            {allowAutomation.toString()}

        </div>
    )
}

export default Automation
