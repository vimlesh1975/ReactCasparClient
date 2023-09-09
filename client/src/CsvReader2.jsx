import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Papa from "papaparse";

import * as fabric from "fabric";
import { sendToCasparcg, templateLayers, findElementWithId } from './common'
import { createTextBox, addImage } from './DrawingController'
// import GsapPlayer from './GsapPlayer';

const data1 = `image,name,age,email
img/flag/Albania.png,Milind Soman,30,john@example.com
img/flag/Afghanistan.png,Ramaswami Aiyanger,25,jane@example.com
img/flag/Belgium.png,Vimlesh Kumar,48,Vimlersh1975@gmail.com
img/flag/Mauritania.png,Vilash Bhandare,56,vlbhandare@gmail.com
img/flag/Morocco.png,Viresh Kumar,50,Kviresh10@gmail.com`;
const CsvReader2 = () => {
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const currentscreenSize = useSelector(state => state.currentscreenSizeReducer.currentscreenSize);

    const [headers, setHeaders] = useState(Object.keys(Papa.parse(data1, { header: true }).data[0]))
    const [datas, setDatas] = useState(Papa.parse(data1, { header: true }).data)

    const handleChange = e => {
        if (e.target.files[0]) {
            console.log(e.target.files[0])
            Papa.parse(e.target.files[0], {
                header: true,
                complete: responses => {
                    // console.log(responses);
                    // console.log(Object.keys(responses.data[0]));
                    setDatas(responses.data);
                    setHeaders(Object.keys(responses.data[0]))
                }
            });
        }

    }

    const updateData = (index, layerNumber) => {
        headers.forEach((header,) => {
            const myelement = findElementWithId(canvas, header)
            if (myelement) {
                if (header.includes('image')) {
                    fabric.Image.fromURL('/ReactCasparClient/' + datas[index][header], img => {
                        img.set({ scaleX: myelement.width / img.width, scaleY: (myelement.height / img.height) })
                        img.cloneAsImage(img1 => {
                            myelement.setSrc(img1.getSrc(), () => {
                                myelement.set({ visible: true });
                                setTimeout(() => {
                                    myelement.set({ fill: '#ff0000' })//dummy 
                                }, 100);
                                canvas.requestRenderAll();
                            })
                        })
                    })
                }
                else {
                    myelement.set({ text: datas[index][header] })
                }
            }

        })
        canvas.requestRenderAll();
        setTimeout(() => {
            sendToCasparcg(layerNumber, canvas, currentscreenSize)
        }, 100);
    }
    const changeImage = (i, j) => {
        // const updatedData = [...datas]
        // // console.log(updatedData[i][headers[j]])
        // // console.log(i, j)
        // updatedData[i][headers[j]] = "vimlesh"
        // setDatas(updatedData)
    }

    // const playAll = (layerNumber) => {
    //     headers.forEach((header) => {
    //         const myelement = canvas.getObjects().find(element => element.id === header)
    //         if (header.includes('image')) {
    //             fabric.Image.fromURL('/ReactCasparClient/' + datas[0][header], img => {
    //                 img.set({ scaleX: myelement.width / img.width, scaleY: (myelement.height / img.height) })
    //                 img.cloneAsImage(img1 => {
    //                     myelement.setSrc(img1.getSrc(), () => {
    //                         myelement.set({ visible: true });
    //                         canvas.requestRenderAll();
    //                     })
    //                 })
    //             })
    //         }
    //         else {
    //             myelement.set({ text: datas[0][header] })
    //         }
    //     })

    //     canvas.requestRenderAll();
    //     // setTimeout(() => {
    //     //     sendToCasparcg(layerNumber, canvas, currentscreenSize)
    //     // }, 100);

    //     const newDatas = datas.map(item => {
    //         const newItem = {};
    //         for (const [key, value] of Object.entries(item)) {
    //             if (key.includes("image")) {
    //                 newItem[key] = '/ReactCasparClient/' + value;
    //             } else {
    //                 newItem[key] = value;
    //             }
    //         }
    //         return newItem;
    //     });

    //     const scriptforhtml =
    //         "if(window.csvInterval){clearInterval(csvInterval)};" +
    //         "const headers=" + JSON.stringify(headers).replaceAll('"', "'") + "; " +
    //         "let i=1;" +
    //         "window.csvInterval=setInterval(() => {" +
    //         "headers.forEach(function(header) { " +
    //         "const myelement = canvas_" + layerNumber + ".getObjects().find(element => element.id === header); " +
    //         "if (header.includes('image')) {" +
    //         "fabric.Image.fromURL(" + JSON.stringify(newDatas).replaceAll('"', "'") + "[i][header], img => {" +
    //         "img.set({ scaleX: myelement.width / img.width, scaleY: (myelement.height / img.height) });" +
    //         "img.cloneAsImage(img1 => {" +
    //         "myelement.setSrc(img1.getSrc(), () => {" +
    //         "myelement.set({ visible: true });" +
    //         "canvas_" + layerNumber + ".requestRenderAll();" +
    //         "})" +
    //         "})" +
    //         "})" +
    //         "}" +
    //         "else{" +
    //         "myelement.set({text:" + JSON.stringify(newDatas).replaceAll('"', "'") + "[i][header]});" +
    //         "}" +
    //         "canvas_" + layerNumber + ".requestRenderAll();" +
    //         "});" +
    //         " if (i < " + (newDatas.length - 1) + ") { i += 1; } else { i = 0; }" +
    //         " }, " + 2 * 1000 + ");"


    //     executeScript(`${scriptforhtml}`);

    //     const scriptforCasparcg = "let csvInterval; " +
    //         "if(csvInterval){clearInterval(csvInterval)};" +
    //         "const headers=" + JSON.stringify(headers).replaceAll('"', "'") + "; " +
    //         "let i=1;" +
    //         "csvInterval=setInterval(() => {" +
    //         "headers.forEach(function(header) { " +
    //         "const myelement = canvas.getObjects().find(element => element.id === header); " +

    //         "if (header.includes('image')) {" +
    //         "fabric.Image.fromURL(" + JSON.stringify(newDatas).replaceAll('"', "'") + "[i][header], img => {" +
    //         "img.set({ scaleX: myelement.width / img.width, scaleY: (myelement.height / img.height) });" +
    //         "img.cloneAsImage(img1 => {" +
    //         "myelement.setSrc(img1.getSrc(), () => {" +
    //         "myelement.set({ visible: true });" +
    //         "canvas.requestRenderAll();" +
    //         "})" +
    //         "})" +
    //         "})" +
    //         "}" +
    //         "else{" +
    //         "myelement.set({text:" + JSON.stringify(newDatas).replaceAll('"', "'") + "[i][header]});" +
    //         "}" +

    //         "canvas.requestRenderAll();" +
    //         "});" +
    //         " if (i < " + (newDatas.length - 1) + ") { i += 1; } else { i = 0; }" +
    //         " }, " + 2 * 1000 + ");"

    //     endpoint(`call ${window.chNumber}-${layerNumber} "${scriptforCasparcg}"`);
    // }
    return (<div style={{ fontSize: 14 }}>
        <input type="file" onChange={handleChange} />
        <table border='1'>
            <tbody>
                <tr>
                    {headers.map((row, i) => {
                        return (<th key={i}   >{row}</th>)
                    })}
                    <th>Play</th>
                </tr>

                {datas.map((row, i) => {
                    return (<tr key={i}  >{headers.map((header, ii) => {
                        return (<td key={ii}>
                            {(typeof row[header] === 'string' && row[header] !== undefined && row[header].includes('/')) ? <img onClick={() => changeImage(i, ii)} src={'/ReactCasparClient/' + row[header]} alt='dd' width={20} height={20} /> : row[header]}
                        </td>
                        )
                    })}<td><button onClick={() => updateData(i, templateLayers.gsap)}>Play</button></td></tr>)
                })}
            </tbody>
        </table>

        <button onClick={() => {
            headers.forEach((header) => {
                setTimeout(() => {
                    if (header.includes('image')) {
                        addImage(canvas, header)
                    }
                    else {
                        createTextBox(canvas, header)
                    }
                }, 100);
            })

        }}>Create Temlplate</button>

        {/* <button onClick={() => playAll(templateLayers.gsap)}>Play All</button> */}
        {/* <div style={{ border: '1px solid red' }}>
            <button onClick={setonCanvas}>Set on canvas</button>
            <GsapPlayer />

        </div> */}

    </div>)
}
export default CsvReader2
