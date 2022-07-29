import { useState } from 'react'
import { endpoint } from './common'
import { useSelector, useDispatch } from 'react-redux'
import { fabric } from "fabric";

var currentRow = 1;

export default function CsvReader() {
    const csvArray = ["ccgf0;ccgf1;ccgf2;ccgf3",
        "booker12;a9012a;Rachel;Booker",
        "grey07;b2070b;Laura;Grey",
        "johnson81;c4081c;Craig;Johnson",
        "jenkins46;d9346d;Mary;Jenkins",
        "smith79;e5079e;Jamie;Smith"];
    const currentscreenSize = localStorage.getItem('RCC_currentscreenSize');
    const canvasList = useSelector(state => state.canvasListReducer.canvasList);
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const dispatch = useDispatch();

    const [intervalId, setIntervalId] = useState(0);
    // const [currentRow, setCurrentRow] = useState(0);
    const handleClick = () => {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(0);
            return;
        }

        const newIntervalId = setInterval(() => {
            recallPage('200', 'csv', (csvArray[currentRow].split(';')).map((val1, i) => ({ key: csvArray[0].split(';')[i], value: val1, type: 'text' })));
            if (currentRow < csvArray.length - 1) {

                currentRow += 1;
            }
            else {
                currentRow = 1;
            }
        }, 4000);
        setIntervalId(newIntervalId);
    };

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
                sendToCasparcg(layerNumber)
            });
        }
        else { alert(`${pageName} page not found in canvas list. Make a page with this name, add ${data.length}  text and set id of texts as ${data.map(val => { return val.key })} then update the page`) }
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

    const updateGraphics = layerNumber => {
        endpoint(`call ${window.chNumber}-${layerNumber} "
                aa.innerHTML='${(canvas.toSVG()).replaceAll('"', '\\"')}';
                "`)
    }
    // const stopGraphics = layerNumber => {
    //     endpoint(`mixer ${window.chNumber}-${layerNumber} fill 0 0 0 1 12 ${window.animationMethod}`)
    //     setTimeout(() => {
    //         endpoint(`stop ${window.chNumber}-${layerNumber}`)
    //     }, 1000);
    // }
    return (<div>
        <h3> CSV test</h3>
        {(csvArray.length > 0) &&
            <table border='1'>
                <tbody>
                    {csvArray.map((item, i) =>
                    (<tr key={i}>
                        {(item?.split(';')).map((val, ii) => <td key={ii}>{val}</td>)}
                        {(i !== 0) && <td><button onClick={() => { recallPage('200', 'csv', (item.split(';')).map((val1, iii) => ({ key: csvArray[0].split(';')[iii], value: val1, type: 'text' }))) }}>Show</button></td>}
                    </tr>))
                    }
                </tbody>
            </table>
        }
        <button onClick={
            handleClick
        }>{intervalId ? 'Stop' : 'Start'}</button>

    </div>);
}