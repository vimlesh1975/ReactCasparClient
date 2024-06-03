import React, { useState, useRef } from 'react'
import { defaultImageSrc } from '../common';
import TemplateController from '../TemplateController';
import { endpoint } from '../common';


const GddTemplatePlayer = () => {
    const [aa, setAa] = useState([]);
    const [fileName, setFileName] = useState('');
    const [templateName, setTemplateName] = useState('');

    const [htmlContent1, setHtmlContent1] = useState([]);
    const iframeRef = useRef(null);

    async function opentemplateFile() {
        var content;
        var fileReader;

        var fInput = document.createElement("input"); //hidden input to open filedialog
        fInput.setAttribute("type", "file"); //opens files
        fInput.setAttribute("accept", ".html"); ////only useful for inspector debugging
        fInput.setAttribute("multiple", false); ////only useful for inspector debugging

        fInput.click();
        fInput.onchange = (e) => {
            const file = e.target.files[0]
            setFileName(file.name)

            if (file) {
                fileReader = new FileReader();
                fileReader.onloadend = () => {
                    content = fileReader.result;
                    processContent(content)
                }
                fileReader.readAsText(file);
            }
        };
    }
    const processContent = (htmlContent) => {

        setHtmlContent1(htmlContent);
        const iframeWindow = iframeRef.current.contentWindow;
        setTimeout(() => {
            iframeWindow.play && iframeWindow.play();//for loopic
        }, 1000);

        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');
        const scriptElement = doc.querySelector('script[name="graphics-data-definition"]');
        const properties = [];

        if (scriptElement) {
            const bb = JSON.parse(scriptElement.innerHTML)
            for (const key in bb.properties) {
                if (bb.properties.hasOwnProperty(key)) {
                    properties.push({ key, value: bb.properties[key] });
                }
            }
        }
        setAa(properties);
    }

    const modifiyProperties = (e, i) => {
        const updatedAA = [...aa]; // Create a shallow copy of the state array
        updatedAA[i].value.default = e.target.value; // Update the 'default' property based on the input value
        setAa(updatedAA); // Update the state with the modified array
    }
    function handleImageClick(index) {
        const input = document.getElementById(`inputFile_${index}`);
        if (input) {
            input.click();
        }
    }
    function handleFileChange(e, index) {
        const updatedAA = [...aa];
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = function (readerEvent) {
                updatedAA[index].value.default = readerEvent.target.result;
                setAa(updatedAA);
            };

            reader.readAsDataURL(file);
        }
    }

    const updateInPreview = () => {

        const iframeWindow = iframeRef.current.contentWindow;
        let xml = '';
        aa.forEach(val => {
            var val1 = val.value.default;
            if (val1) {
                if (val1.includes("\n")) {
                    val1 = val1.replace(/\n/g, 'CRLF');
                }
            }

            xml += `<componentData id="${val.key}"><data id="text" value="${val1}" /></componentData>`;
        });
        xml = `<templateData>${xml}</templateData>`;
        iframeWindow.update(xml);
    };
    // eslint-disable-next-line
    const palytocaspar = () => {
        let xml = '';
        aa.forEach(val => {
            var val1 = val.value.default;
            if (val1) {
                if (val1.includes("\n")) {
                    val1 = val1.replace(/\n/g, 'CRLF');
                }
            }
            xml += `<componentData id=\\"${val.key}\\"><data id=\\"text\\" value=\\"${val1}\\" /></componentData>`
        })
        xml = `"<templateData>${xml}</templateData>"`
        endpoint(`cg 1-96 add 96 "${templateName}" 1 ${xml}`);
    }
    const updateTocaspar = () => {
        let xml = '';
        aa.forEach(val => {
            var val1 = val.value.default;
            if (val1) {
                if (val1.includes("\n")) {
                    val1 = val1.replace(/\n/g, 'CRLF');
                }
            }
            xml += `<componentData id=\\"${val.key}\\"><data id=\\"text\\" value=\\"${val1}\\" /></componentData>`
        })
        xml = `"<templateData>${xml}</templateData>"`
        endpoint(`cg 1-96 update 96 ${xml}`);
    }

    return (
        <div>
            <h3>Html Template with Graphics Display Data-GDD</h3>
            <TemplateController layerNumber={96} channelNumber={1} processContent={processContent}
                setTemplateName={setTemplateName}
                palytocaspar={palytocaspar}
                updateTocaspar={updateTocaspar}
                updateInPreview={updateInPreview}
            />
            <h4>{fileName}</h4>
            <div style={{ display: 'flex' }}>
                <div style={{ position: 'absolute', left: 370, top: 62, width: 1920, height: 1080, transform: `scale(${0.805})`, transformOrigin: '0 0' }}>
                    <iframe ref={iframeRef} style={{ backgroundColor: 'grey', width: 1920, height: 1080, }} srcDoc={htmlContent1} title='HtmlOutput'></iframe>
                </div>
                <div>
                    <button onClick={opentemplateFile}>Open html from anywhere </button>
                    <div style={{ height: 650, overflow: 'scroll' }}>
                        {aa.map((val, i) => (
                            <div key={i} style={{ border: '2px solid red', width: 300, margin: 20 }}>
                                <div style={{ fontSize: 20, fontWeight: 'bolder' }}>{val.key}</div>
                                {val.value.gddType === 'file-path/image-path' ? (
                                    <>
                                        <img
                                            onClick={() => handleImageClick(i)}
                                            src={val.value.default ? val.value.default : defaultImageSrc}
                                            alt='image1'
                                            style={{ border: '2px solid blue', maxWidth: 40, maxHeight: 30, minWidth: 40, minHeight: 30 }}
                                        />
                                        <input
                                            id={`inputFile_${i}`}
                                            type="file"
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            onChange={e => handleFileChange(e, i)}
                                        />
                                    </>
                                ) : val.value.gddType === 'single-line' ? (
                                    <input
                                        onChange={e => modifiyProperties(e, i)}
                                        style={{ display: 'inline', width: 290 }}
                                        type='text'
                                        value={val.value.default}
                                    />
                                ) : val.value.gddType === 'multi-line' ? (
                                    <textarea
                                        onChange={e => modifiyProperties(e, i)}
                                        style={{ height: 150, width: '95%' }}
                                        value={val.value.default}
                                    />
                                ) : null}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default GddTemplatePlayer
