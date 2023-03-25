import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fabric } from "fabric";
import { shadowOptions, openaiAddress } from './common'

const addcommand = `Always Assume window.editor.canvas is avalable as fabricjs canvas . While adding a new object always use color parameter as full 6 digit hexadecimal notation, objectCaching as false and  shadow properties as {color: '#000000',  blur: 30, offsetX: 0, offsetY: 0, affectStroke: false};in object properties. After every code use window.editor.canvas.requestRenderAll();. `
const editCommand = `Assume window.editor.canvas is avalable as fabricjs canvas. Use color parameter as full 6 digit hexadecimal notation. After every code use window.editor.canvas.requestRenderAll();. Use find method of array of canvas.getObjects() to get object by id in canvas. `
const defaultPrompt = `Write code block without explanation to 
Add a red circle with id as 'id1'.
`

const defaultPrompt2 = `Write code block without explanation to 
Move 'id1' 100 to right.
`

const CodeImport = () => {
    const [prompt, setPrompt] = useState(defaultPrompt)
    const [prompt2, setPrompt2] = useState(defaultPrompt2)
    const [aiAnswer, setAiAnswer] = useState('');
    const [errorLog, setErrorLog] = useState('Waht is Fabricjs?');
    const [models, setModels] = useState([]);
    const [selectedModel, setSelectedModel] = useState('text-davinci-003');



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

    const askOpenAi = async (str) => {
        // setPrompt('')
        const response = await fetch(openaiAddress() + 'openai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: str,
                model: selectedModel
            })
        })

        if (response.ok) {
            const data = await response.json();
            // trims any trailing spaces/'\n' 
            setAiAnswer(data.bot.trim())

        } else {
            const err = await response.text()
            // alert(err)
            setAiAnswer(err)
            console.log(err)
        }
    }

    const askOpenAiModels = async () => {
        // setPrompt('')
        const response = await fetch(openaiAddress() + 'openai/models', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            })
        })

        if (response.ok) {
            const data = await response.json();
            // trims any trailing spaces/'\n' 
            // setAiAnswer(data.bot.trim())
            // console.log(data.bot.data)
            setModels(data.bot.data)
            // setModels(['aa', 'bb'])
            // console.log(data.bot.data)


        } else {
            // const err = await response.text()
            // alert(err)
        }
    }


    useEffect(() => {
        askOpenAiModels()
    }, [])

    const executeCode = str => {
        try {
            // eslint-disable-next-line
            eval(str);
        } catch (error) {
            setErrorLog(error);
        }
    }

    const handleKeyDownforadd = (event) => {
        if (event.ctrlKey && event.key === 'Enter') {
            askOpenAi(addcommand + " " + event.target.value)
        }
    }
    const handleKeyDownforedit = (event) => {
        if (event.ctrlKey && event.key === 'Enter') {
            askOpenAi(editCommand + " " + event.target.value)
        }
    }
    const handleKeyDownforCode = (event) => {
        if (event.ctrlKey && event.key === 'Enter') {
            executeCode(event.target.value)
        }
    }

    const handleKeyDownforgeneralquestion = (event) => {
        if (event.ctrlKey && event.key === 'Enter') {
            askOpenAi(event.target.value)
        }
    }


    return (<div>

        <div style={{ border: '3px solid red' }}>
            <b>OpenAi Conversation </b>
            Models: <select onChange={e => setSelectedModel(e.target.value)} value={selectedModel}>
                {models.map((model, i) => (
                    <option key={i} value={model.id}>{model.id}</option>
                ))}
            </select>
            <div style={{ display: 'flex' }}>
                <textarea style={{ width: 750, height: 80 }} value={prompt} onChange={e => setPrompt(e.target.value)} onKeyDown={handleKeyDownforadd} />
                <button onClick={() => askOpenAi(addcommand + " " + prompt)}>Ask OpenAi for Add command</button>
            </div>
            <div style={{ display: 'flex' }}>
                <textarea style={{ width: 750, height: 80 }} value={prompt2} onChange={e => setPrompt2(e.target.value)} onKeyDown={handleKeyDownforedit} />
                <button onClick={() => askOpenAi(editCommand + " " + prompt2)}>Ask OpenAi for Edit command</button>
            </div>
            <div style={{ display: 'flex' }}>
                <textarea style={{ width: 750, height: 200 }} onChange={e => setAiAnswer(e.target.value)} value={aiAnswer} onKeyDown={handleKeyDownforCode} />
                <button onClick={() => executeCode(aiAnswer)}>Execute Code</button><br />
            </div>
            <div style={{ display: 'flex' }}>
                <div>Error Logs:/ general Question<br />
                    <textarea style={{ width: 750, height: 50 }} onChange={e => setErrorLog(e.target.value)} value={errorLog} onKeyDown={handleKeyDownforgeneralquestion} />
                </div>
                <div>
                    <br />
                    <button onClick={() => askOpenAi(errorLog)}>Ask Open Ai About error/ general Question</button><br />
                </div>
            </div>
        </div>
        <div style={{ border: '3px solid blue', marginTop: 20 }}>

            <div style={{ display: 'flex' }}>

                <textarea style={{ width: 750, height: 90 }} value={svgcode} onChange={e => setSvgCode(e.target.value)} />
                <button onClick={() => importSvgCode()}>Import SVG</button>
            </div>

            <div style={{ display: 'flex' }}>

                <textarea style={{ width: 750, height: 90 }} value={jsoncode} onChange={e => setJsonCode(e.target.value)} />
                <button onClick={importJsonCode}>Import Json</button>
            </div>
        </div>
    </div>)
}

export default CodeImport