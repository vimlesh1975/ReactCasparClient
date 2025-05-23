import { useEffect, useState } from 'react'
import socketIOClient from "socket.io-client";
import { useSelector } from 'react-redux'
import * as fabric from 'fabric';
import { endpoint, stopGraphics } from './common'
import axios from 'axios';

const Automation = () => {
    const canvas = useSelector((state) => state.canvasReducer.canvas);

    const canvasList = useSelector(state => state.canvasListReducer.canvasList);
    const currentscreenSize = useSelector(state => state.currentscreenSizeReducer.currentscreenSize);

    const [allowAutomation, setAllowAutomation] = useState(false)
    const [dataReceived, setDataReceived] = useState();

    useEffect(() => {
        const socket = socketIOClient(':9000');


        if (allowAutomation.toString() === 'true') {
            socket.on("getCurrentCanvas", data => {
                window.editor?.canvas.getElement().toBlob(blob => {
                    var a = new FileReader();
                    a.onload = function (e) {
                        if (window.location.origin !== 'https://vimlesh1975.github.io') {
                            axios.post('https://localhost:9000/setCurrentCanvas', { data1: e.target.result }).then((aa) => {
                            }).catch((aa) => { console.log('Error', aa) });
                        }
                    }
                    a.readAsDataURL(blob);
                })
            });

            socket.on("getTemplateList", data => {
                console.log('getTemplateList');
                socket.emit("templateList", { data: ['canvasList'] });
                setDataReceived(JSON.stringify(data));
            });
            socket.on("recallPage", data => {
                // console.log(data);
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
        console.log('object')
        try {
            const index = canvasList.findIndex(val => val.pageName.toLowerCase() === pageName.toLowerCase());
            console.log(index)

            if (index !== -1) {
                const data1 = data;
                canvas.loadFromJSON(canvasList[index].pageValue, () => {
                    data1.forEach(data2 => {
                        canvas.getObjects().forEach((element) => {
                            try {
                                element.set({ selectable: false, strokeUniform: true, strokeWidth: element.strokeWidth / 3 });
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
                canvas.requestRenderAll()
            }
            else { alert(`${pageName} page not found in canvas list. Make a page with this name, add ${data.length}  text and set id of texts as ${data.map(val => { return val.key })} then update the page`) }
        } catch (error) {
        }

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
            canvas.getObjects().forEach((element) => {
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
    // const stopGraphics = layerNumber => {
    //     endpoint(`mixer ${window.chNumber}-${layerNumber} fill 0 0 0 1 12 ${window.animationMethod}`)
    //     setTimeout(() => {
    //         endpoint(`stop ${window.chNumber}-${layerNumber}`)
    //     }, 1000);
    // }

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
            <label><input type="checkbox" onChange={(e) => setAllowAutomation(val => !val)} defaultChecked={false} />Allow Automation</label>

            <div>
                <span>Data Recieved</span>
                <br />  <textarea cols={36} rows={45} value={dataReceived} />
            </div>
        </div>
    )
}

export default Automation
