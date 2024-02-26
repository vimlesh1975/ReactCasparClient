import React, { useState, useRef } from 'react'
import { endpoint } from '../common';
import sha256 from 'crypto-js/sha256';




const GddTemplatePlayer = () => {
    const [aa, setAa] = useState([]);

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
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');
        const scriptElement = doc.querySelector('script[name="graphics-data-definition"]');
        const bb = JSON.parse(scriptElement.innerHTML)
        const properties = [];
        for (const key in bb.properties) {
            if (bb.properties.hasOwnProperty(key)) {
                properties.push({ key, value: bb.properties[key] });
            }
        }
        setAa(properties)
    }

    const modifiyProperties = (e, i) => {
        const updatedAA = [...aa]; // Create a shallow copy of the state array
        updatedAA[i].value.default = e.target.value; // Update the 'default' property based on the input value
        setAa(updatedAA); // Update the state with the modified array
    }
    function handleImageClick(index) {
        // Programmatically trigger the input file click
        const input = document.getElementById(`inputFile_${index}`);
        if (input) {
            input.click();
        }
    }
    function handleFileChange(e, index) {
        const updatedAA = [...aa];
        const file = e.target.files[0];

        if (file) {
            // Assuming you want to set the image source directly to the base64 representation
            const reader = new FileReader();
            reader.onload = function (readerEvent) {
                updatedAA[index].value.default = readerEvent.target.result;
                setAa(updatedAA);
            };

            reader.readAsDataURL(file);
        }
    }


    const callFunctionInIframe = () => {
        const iframeWindow = iframeRef.current.contentWindow;
        aa.forEach(val => {
            if (val.value.gddType === 'file-path/image-path') {
                iframeWindow.updateimage(val.key, val.value.default)
            }
            else {
                iframeWindow.updatestring(val.key, val.value.default)
            }
        })
        // let xml = '';
        // aa.forEach(val => {
        //     xml += `<componentData id=\\"${val.key}\\"><data id=\\"text\\" value=\\"${val.value.default}\\" /></componentData>`
        // })
        // xml = `'<templateData>${xml}</templateData>'`
        // console.log(xml)
        // iframeWindow.update(xml);



    };
    // eslint-disable-next-line
    const palytocaspar = () => {
        let xml = '';
        aa.forEach(val => {
            xml += `<componentData id=\\"${val.key}\\"><data id=\\"text\\" value=\\"${val.value.default}\\" /></componentData>`
        })
        xml = `<templateData>${xml}</templateData>`

        // Create a Blob with the HTML content
        const blob = new Blob([htmlContent1], { type: 'text/html' });

        // Create a data URL from the Blob
        const dataUrl = URL.createObjectURL(blob);

        // Open the data URL in a new tab or window
        window.open(dataUrl, '_blank');

        // Generate a unique hash based on the content
        const hash = sha256(htmlContent1).toString();

        // Use the hash as part of the virtual file address
        const virtualFileAddress = `/files/${hash}/file.html`;

        endpoint(`play 1-96 [html] "${'https://localhost:10000/ReactCasparClient' + virtualFileAddress}"`);
        endpoint(`play 1-96 [html] "${dataUrl}"`);
        endpoint(`call 1-96 update('${xml}')`);
    }
    return (
        <div>
            <h1>GddTemplate Preview</h1>
            <div style={{ display: 'flex' }}>
                <div style={{ position: 'absolute', left: 350, top: 50, width: 1920, height: 1080, transform: `scale(${0.8})`, transformOrigin: '0 0' }}>
                    <iframe ref={iframeRef} style={{ backgroundColor: 'grey', width: 1920, height: 1080, }} srcDoc={htmlContent1} title='HtmlOutput'></iframe>
                </div>
                <div>
                    <button onClick={opentemplateFile}>Open a html Template</button>
                    <div>
                        <button onClick={callFunctionInIframe}>PreView with New data</button>
                        {/* <button onClick={palytocaspar}>Play to caspar with New data</button> */}
                    </div>
                    <div style={{ height: 800, overflow: 'scroll' }}>
                        {aa.map((val, i) => (
                            <div key={i} style={{ border: '2px solid red', width: 300, height: 50, margin: 20 }}>
                                <span style={{ fontSize: 20 }}>{val.key}</span>
                                {val.value.gddType === 'file-path/image-path' ? (
                                    <>
                                        <img
                                            onClick={() => handleImageClick(i)}
                                            src={val.value.default}
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
                                        style={{ display: 'inline' }}
                                        type='text'
                                        value={val.value.default}
                                    />
                                ) : val.value.gddType === 'multi-line' ? (
                                    <textarea
                                        onChange={e => modifiyProperties(e, i)}
                                        style={{ display: 'inline', width: '100%' }}
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
