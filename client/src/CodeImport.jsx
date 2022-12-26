import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { fabric } from "fabric";
import { shadowOptions, openaiAddress } from './common'


const CodeImport = () => {
    const [prompt, setPrompt] = useState('Hello How Are You?')
    const [aiAnswer, setAiAnswer] = useState('')


    const [svgcode, setSvgCode] = useState(`<svg height="100" width="100">
    <circle cx="500" cy="500" r="100" stroke="yellow" stroke-width="3" fill="red" />
   <rect x="800" y="800" width="300" height="200" stroke="red" stroke-width="3" fill="yellow" />
  </svg> `)
    const [jsoncode, setJsonCode] = useState(`{"objects":[
        {"type":"circle","left":200,"top":200,"radius":100,"fill":"blue","stroke":"yellow", "strokeWidth":15},
        {"type":"rect","left":800,"top":400,"width":400,"height":250,"stroke":"yellow", "strokeWidth":15, "fill":"red"}
        ]}`)
    const canvas = useSelector(state => state.canvasReducer.canvas);


    const importSvgCode = (ss = svgcode) => {
        if (ss) {
            fabric.loadSVGFromString(ss, function (objects) {
                objects?.forEach(element => {
                    canvas.add(element);
                    element.set({ objectCaching: false, shadow: element.shadow ? element.shadow : shadowOptions, id: 'id_' + fabric.Object.__uid, class: 'class_' + fabric.Object.__uid, });
                    if (element.type === 'text') {
                        // element.set({ left: (element.left - ((element.width) * element.scaleX / 2)), top: (element.top + ((element.height) * element.scaleY / 4)) })
                        element.set({ type: 'textbox' })
                        var textobj = element.toObject();
                        var clonedtextobj = JSON.parse(JSON.stringify(textobj));
                        var aa = new fabric.Textbox(element.text, clonedtextobj);
                        aa.set({ id: element.id, class: element.class, objectCaching: false, shadow: element.shadow ? element.shadow : shadowOptions, width: 1000 });
                        canvas.remove(element)
                        canvas.add(aa);
                    }
                });
            });
            canvas.requestRenderAll();
        }
    }
    const importJsonCode = () => {
        const preCanvas = (canvas.toSVG(['id', 'class', 'selectable'])).replaceAll('"', '\'');
        if (jsoncode) {
            if (JSON.parse(jsoncode).objects) {
                canvas.loadFromJSON(jsoncode, canvas.renderAll.bind(canvas), function (o, element) {
                    element.set({ objectCaching: false, shadow: element.shadow ? element.shadow : shadowOptions, id: 'id_' + fabric.Object.__uid, class: 'class_' + fabric.Object.__uid, });
                    canvas.add(element)
                })
            }
            else {
                canvas.loadFromJSON(`{   "objects": [` + jsoncode + ` ]   }`, canvas.renderAll.bind(canvas), function (o, element) {
                    element.set({ objectCaching: false, shadow: element.shadow ? element.shadow : shadowOptions, id: 'id_' + fabric.Object.__uid, class: 'class_' + fabric.Object.__uid, });
                })
            }
            canvas.requestRenderAll();
        }

        importSvgCode(preCanvas)

    }

    const askOpenAi = async () => {
        // setPrompt('')
        const response = await fetch(openaiAddress(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: prompt
            })
        })

        if (response.ok) {
            const data = await response.json();
            // trims any trailing spaces/'\n' 
            setAiAnswer(data.bot.trim())

        } else {
            const err = await response.text()
            alert(err)
        }
    }

    return (<div>
        <div>
            <h3>Svg Import</h3>
            <textarea style={{ width: '98%', height: 150 }} value={svgcode} onChange={e => setSvgCode(e.target.value)} />
            <button onClick={() => importSvgCode()}>Import SVG</button>
        </div>

        <div>
            <h3>Json Import</h3>
            <textarea style={{ width: '98%', height: 150 }} value={jsoncode} onChange={e => setJsonCode(e.target.value)} />
            <button onClick={importJsonCode}>Import Json</button>
        </div>
        <div>
            <h3>OpenAi Conversation</h3>
            <textarea rows={1} style={{ width: 600 }} value={prompt} onChange={e => setPrompt(e.target.value)} /> <button onClick={askOpenAi}>Ask OpenAi</button>
            <textarea rows={15} style={{ width: 600 }} value={aiAnswer} />
        </div>

    </div>)
}

export default CodeImport