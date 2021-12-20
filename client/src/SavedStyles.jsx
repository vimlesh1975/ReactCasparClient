import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid';

const SavedStyles = () => {
    const [savedStyles, setSavedStyles] = useState([])
    const canvas = useSelector(state => state.canvasReducer.canvas);

    const deleteStyle = val => {
        const updatedsavedStyles = savedStyles.filter((_, i) => {
            return (val !== i)
        });
        setSavedStyles(updatedsavedStyles)
    }
    const modifyStyle = val => {
        if (canvas.getActiveObjects()[0]) {
            const updatedsavedStyles = savedStyles.map((value, i) => {
                if ((canvas.getActiveObjects()[0].type === 'text') || (canvas.getActiveObjects()[0].type === 'i-text') || (canvas.getActiveObjects()[0].type === 'textbox')) {
                    return ((val !== i) ? value : { element:  canvas?.getActiveObjects()[0].toObject() })
                }
                else{
                    var bb = { ...canvas?.getActiveObjects()[0].toObject(), textAlign: 'left', fontFamily: 'Arial', fontWeight: 'bold', fontSize: '20', underline: false, linethrough: false, fontStyle: 'normal' }
                    return ((val !== i) ? value : { element: bb })
                }
            });
            setSavedStyles(updatedsavedStyles)
        }
    }

    const addStyle = () => {
        if (canvas.getActiveObjects()[0]) {
            if ((canvas.getActiveObjects()[0].type === 'text') || (canvas.getActiveObjects()[0].type === 'i-text') || (canvas.getActiveObjects()[0].type === 'textbox')) {
                setSavedStyles([...savedStyles, { element: canvas?.getActiveObjects()[0].toObject() }])
            }
            else {
                var bb = { ...canvas?.getActiveObjects()[0].toObject(), textAlign: 'left', fontFamily: 'Arial', fontWeight: 'bold', fontSize: '30', underline: false, linethrough: false, fontStyle: 'normal' }
                setSavedStyles([...savedStyles, { element: bb }])
            }
        }
    }

    const applyStyle = activeProperty => {
        if (activeProperty !== null) {
            try {
                canvas?.getActiveObjects().forEach(element => {
                    element.set({
                        shadow: {
                            color: activeProperty.shadow.color,
                            blur: activeProperty.shadow.blur,
                            offsetX: activeProperty.shadow.offsetX,
                            offsetY: activeProperty.shadow.offsetY,
                            affectStroke: activeProperty.shadow.affectStroke,
                        },
                        fill: activeProperty.fill,
                        backgroundColor: activeProperty.backgroundColor,
                        editable: true,
                        objectCaching: false,
                        stroke: activeProperty.stroke,
                        strokeWidth: activeProperty.strokeWidth,
                        opacity: activeProperty.opacity,
                        skewX: activeProperty.skewX,
                        skewY: activeProperty.skewY,
                        rx: activeProperty.rx,
                        ry: activeProperty.ry,
                    });
                    if ((element.type === 'text') || (element.type === 'i-text') || (element.type === 'textbox')) {
                        element.set({
                            textAlign: activeProperty.textAlign,
                            fontFamily: activeProperty.fontFamily,
                            fontWeight: activeProperty.fontWeight,
                            // fontSize: activeProperty.fontSize,
                            underline: activeProperty.underline,
                            linethrough: activeProperty.linethrough,
                            fontStyle: activeProperty.fontStyle,
                        })
                    }
                });
            } catch (error) {

            }
            canvas?.requestRenderAll();
        }
    }

    const saveStylesInAFile = () => {
        const element = document.createElement("a");
        var aa = ''
        savedStyles.forEach(val => {
            aa += JSON.stringify({ 'element': val.element }) + '\r\n'
        });
        const file = new Blob([aa], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        const ss = new Date().toLocaleTimeString('en-US', { year: "numeric", month: "numeric", day: "numeric", hour12: false, hour: "numeric", minute: "numeric", second: "numeric" });
        var retVal = prompt("Enter  file name to save : ", ss + '.style');
        if (retVal !== null) {
            element.download = retVal;
            document.body.appendChild(element); // Required for this to work in FireFox
            element.click();
        }
    }

    let fileReader;
    const handleFileRead = (e) => {
        const content = fileReader.result;
        var aa = content.split('\r\n')
        aa.splice(-1)
        var updatedsavedStyles = []
        aa.forEach(element => {
            var cc = JSON.parse(element)
            updatedsavedStyles.push(cc)
        });
        setSavedStyles(updatedsavedStyles)
    };
    const handleFileChosen = (file) => {
        if (file) {
            fileReader = new FileReader();
            fileReader.onloadend = handleFileRead;
            fileReader.readAsText(file);
        }
    }

    return (<div>
        <div className='drawingToolsRow' >
            <button onClick={addStyle}>Add Style</button>
            <button onClick={saveStylesInAFile}>Save Styles in a file</button>
          <input
                type='file'
                id='file'
                className='input-file'
                accept='.style'
                onChange={e => {
                    handleFileChosen(e.target.files[0]);
                }}
            />

            <div style={{ height: 810, width: 380, overflow: 'scroll', border: '1px solid black' }}>

                <table border='1'>
                    <tbody>
                        <tr><th>Sr.</th><th>Style</th><th>Operation</th></tr>
                        {savedStyles.map((val, i) => {
                            return <tr key={uuidv4()}><td>{i+1}</td><td className='styleContainer' style={{minWidth:200, textAlign:'center',alignItems:'center', fontStyle: val.element.fontStyle, fontWeight:val.element.fontWeight, textDecoration:`${val.element.underline?'underline':''} ${val.element.linethrough?'line-through':''}`, transform: `skew(${val.element.skewX}deg,${val.element.skewY}deg)`, WebkitTextStroke: `${(val.element.strokeWidth>2)?2:val.element.strokeWidth}px ${val.element.stroke}`, fontSize: 60, fontFamily: val.element.fontFamily, color: val.element.fill, backgroundColor: val.element.backgroundColor, textShadow: `${val.element.shadow.offsetX / 3}px ${val.element.shadow.offsetY / 3}px ${val.element.shadow.blur}px ${val.element.shadow.color}` }}>Aaक</td><td style={{textAlign:'center',alignItems:'center',}}><button onClick={() => deleteStyle(i)}>Delete</button><br /><button onClick={() => modifyStyle(i)}>Save Here</button><br /><button onClick={() => applyStyle(val.element)}>Apply to Selected</button></td></tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    </div>)
}

export default SavedStyles
