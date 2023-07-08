import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid';
import { generalFileName, saveFile } from './common'

const SavedStyles = () => {

    const [savedStyles, setSavedStyles] = useState([{ "element": { "type": "textbox", "version": "4.6.0", "originX": "left", "originY": "top", "left": 58, "top": 450, "width": 867, "height": 85.43, "fill": "#0d0c0e", "stroke": "#e0fd08", "strokeWidth": 1, "strokeDashArray": null, "strokeLineCap": "butt", "strokeDashOffset": 0, "strokeLineJoin": "miter", "strokeUniform": false, "strokeMiterLimit": 4, "scaleX": 1, "scaleY": 1, "angle": 0, "flipX": false, "flipY": false, "opacity": 0.9, "shadow": { "color": "#cef50a", "blur": "19", "offsetX": "0", "offsetY": "0", "affectStroke": false, "nonScaling": false }, "visible": true, "backgroundColor": "", "fillRule": "nonzero", "paintFirst": "fill", "globalCompositeOperation": "source-over", "skewX": 0, "skewY": 0, "fontFamily": "Arial", "fontWeight": "bold", "fontSize": "35", "text": "दूरदर्शन से विमलेश कुमार Vimlesh Kumar From Doordarshan", "underline": false, "overline": false, "linethrough": false, "textAlign": "left", "fontStyle": "normal", "lineHeight": 1.16, "textBackgroundColor": "", "charSpacing": 0, "styles": {}, "direction": "ltr", "path": null, "pathStartOffset": 0, "pathSide": "left", "minWidth": 20, "splitByGrapheme": false } }
        , { "element": { "type": "textbox", "version": "4.6.0", "originX": "left", "originY": "top", "left": 58, "top": 450, "width": 867, "height": 85.43, "fill": "#e70808", "stroke": "#e0fd08", "strokeWidth": 1, "strokeDashArray": null, "strokeLineCap": "butt", "strokeDashOffset": 0, "strokeLineJoin": "miter", "strokeUniform": false, "strokeMiterLimit": 4, "scaleX": 1, "scaleY": 1, "angle": 0, "flipX": false, "flipY": false, "opacity": 0.9, "shadow": { "color": "black", "blur": 30, "offsetX": 0, "offsetY": 0, "affectStroke": false, "nonScaling": false }, "visible": true, "backgroundColor": "", "fillRule": "nonzero", "paintFirst": "fill", "globalCompositeOperation": "source-over", "skewX": 0, "skewY": 0, "fontFamily": "Goudy Old Style", "fontWeight": "bold", "fontSize": "35", "text": "दूरदर्शन से विमलेश कुमार Vimlesh Kumar From Doordarshan", "underline": false, "overline": false, "linethrough": false, "textAlign": "left", "fontStyle": "normal", "lineHeight": 1.16, "textBackgroundColor": "", "charSpacing": 0, "styles": {}, "direction": "ltr", "path": null, "pathStartOffset": 0, "pathSide": "left", "minWidth": 20, "splitByGrapheme": false } }
        , { "element": { "type": "textbox", "version": "4.6.0", "originX": "left", "originY": "top", "left": 208, "top": 179, "width": 480, "height": 263.24, "fill": "#bb0707", "stroke": "#ffffff", "strokeWidth": 2, "strokeDashArray": null, "strokeLineCap": "butt", "strokeDashOffset": 0, "strokeLineJoin": "miter", "strokeUniform": false, "strokeMiterLimit": 4, "scaleX": 1, "scaleY": 1, "angle": 0, "flipX": false, "flipY": false, "opacity": 0.9, "shadow": { "color": "#f2c10d", "blur": "8", "offsetX": 0, "offsetY": 0, "affectStroke": false, "nonScaling": false }, "visible": true, "backgroundColor": "", "fillRule": "nonzero", "paintFirst": "fill", "globalCompositeOperation": "source-over", "skewX": 0, "skewY": 0, "fontFamily": "Arial", "fontWeight": "bold", "fontSize": "52", "text": "दूरदर्शन से विमलेश कुमार Vimlesh Kumar From Doordarshan", "underline": false, "overline": false, "linethrough": false, "textAlign": "center", "fontStyle": "normal", "lineHeight": 1.16, "textBackgroundColor": "", "charSpacing": 0, "styles": {}, "direction": "ltr", "path": null, "pathStartOffset": 0, "pathSide": "left", "minWidth": 20, "splitByGrapheme": false } }
        , { "element": { "type": "textbox", "version": "4.6.0", "originX": "left", "originY": "top", "left": 208, "top": 179, "width": 480, "height": 263.24, "fill": "#e0fd08", "stroke": "#e70808", "strokeWidth": 0, "strokeDashArray": null, "strokeLineCap": "butt", "strokeDashOffset": 0, "strokeLineJoin": "miter", "strokeUniform": false, "strokeMiterLimit": 4, "scaleX": 1, "scaleY": 1, "angle": 0, "flipX": false, "flipY": false, "opacity": 0.9, "shadow": { "color": "#ffffff", "blur": "11", "offsetX": 0, "offsetY": 0, "affectStroke": false, "nonScaling": false }, "visible": true, "backgroundColor": "", "fillRule": "nonzero", "paintFirst": "fill", "globalCompositeOperation": "source-over", "skewX": 0, "skewY": 0, "fontFamily": "Arial", "fontWeight": "bold", "fontSize": "52", "text": "दूरदर्शन से विमलेश कुमार Vimlesh Kumar From Doordarshan", "underline": true, "overline": false, "linethrough": false, "textAlign": "center", "fontStyle": "normal", "lineHeight": 1.16, "textBackgroundColor": "", "charSpacing": 0, "styles": {}, "direction": "ltr", "path": null, "pathStartOffset": 0, "pathSide": "left", "minWidth": 20, "splitByGrapheme": false } }
        , { "element": { "type": "textbox", "version": "4.6.0", "originX": "left", "originY": "top", "left": 205, "top": 177, "width": 480, "height": 263.24, "fill": "#e3e3e3", "stroke": "#e70808", "strokeWidth": 0, "strokeDashArray": null, "strokeLineCap": "butt", "strokeDashOffset": 0, "strokeLineJoin": "miter", "strokeUniform": false, "strokeMiterLimit": 4, "scaleX": 1, "scaleY": 1, "angle": 0, "flipX": false, "flipY": false, "opacity": 0.9, "shadow": { "color": "#0463fb", "blur": "11", "offsetX": 0, "offsetY": 0, "affectStroke": false, "nonScaling": false }, "visible": true, "backgroundColor": "", "fillRule": "nonzero", "paintFirst": "fill", "globalCompositeOperation": "source-over", "skewX": 0, "skewY": 0, "fontFamily": "Arial", "fontWeight": "bold", "fontSize": "52", "text": "दूरदर्शन से विमलेश कुमार Vimlesh Kumar From Doordarshan", "underline": true, "overline": false, "linethrough": false, "textAlign": "center", "fontStyle": "italic", "lineHeight": 1.16, "textBackgroundColor": "", "charSpacing": 0, "styles": {}, "direction": "ltr", "path": null, "pathStartOffset": 0, "pathSide": "left", "minWidth": 20, "splitByGrapheme": false } }
        , { "element": { "type": "textbox", "version": "4.6.0", "originX": "left", "originY": "top", "left": 205, "top": 177, "width": 480, "height": 195.08, "fill": "#e3e3e3", "stroke": "#e70808", "strokeWidth": 0, "strokeDashArray": null, "strokeLineCap": "butt", "strokeDashOffset": 0, "strokeLineJoin": "miter", "strokeUniform": false, "strokeMiterLimit": 4, "scaleX": 1, "scaleY": 1, "angle": 0, "flipX": false, "flipY": false, "opacity": 0.9, "shadow": { "color": "#0463fb", "blur": "11", "offsetX": 0, "offsetY": 0, "affectStroke": false, "nonScaling": false }, "visible": true, "backgroundColor": "", "fillRule": "nonzero", "paintFirst": "fill", "globalCompositeOperation": "source-over", "skewX": 0, "skewY": 0, "fontFamily": "Gigi", "fontWeight": "bold", "fontSize": "52", "text": "दूरदर्शन से विमलेश कुमार Vimlesh Kumar From Doordarshan", "underline": true, "overline": false, "linethrough": false, "textAlign": "center", "fontStyle": "italic", "lineHeight": 1.16, "textBackgroundColor": "", "charSpacing": 0, "styles": {}, "direction": "ltr", "path": null, "pathStartOffset": 0, "pathSide": "left", "minWidth": 20, "splitByGrapheme": false } }
        , { "element": { "type": "textbox", "version": "4.6.0", "originX": "left", "originY": "top", "left": 456, "top": 51, "width": 480, "height": 195.08, "fill": "#e3e3e3", "stroke": "#9f8232", "strokeWidth": 1, "strokeDashArray": null, "strokeLineCap": "butt", "strokeDashOffset": 0, "strokeLineJoin": "miter", "strokeUniform": false, "strokeMiterLimit": 4, "scaleX": 1, "scaleY": 1, "angle": 0, "flipX": false, "flipY": false, "opacity": 0.9, "shadow": { "color": "#04fb9c", "blur": "11", "offsetX": 0, "offsetY": 0, "affectStroke": false, "nonScaling": false }, "visible": true, "backgroundColor": "", "fillRule": "nonzero", "paintFirst": "fill", "globalCompositeOperation": "source-over", "skewX": 0, "skewY": 0, "fontFamily": "Gigi", "fontWeight": "bold", "fontSize": "52", "text": "दूरदर्शन से विमलेश कुमार Vimlesh Kumar From Doordarshan", "underline": true, "overline": false, "linethrough": false, "textAlign": "center", "fontStyle": "italic", "lineHeight": 1.16, "textBackgroundColor": "", "charSpacing": 0, "styles": {}, "direction": "ltr", "path": null, "pathStartOffset": 0, "pathSide": "left", "minWidth": 20, "splitByGrapheme": false } }
        , { "element": { "type": "textbox", "version": "4.6.0", "originX": "left", "originY": "top", "left": 456, "top": 51, "width": 480, "height": 195.08, "fill": "#8d329f", "stroke": "#fef6f6", "strokeWidth": 1, "strokeDashArray": null, "strokeLineCap": "butt", "strokeDashOffset": 0, "strokeLineJoin": "miter", "strokeUniform": false, "strokeMiterLimit": 4, "scaleX": 1, "scaleY": 1, "angle": 0, "flipX": false, "flipY": false, "opacity": 0.9, "shadow": { "color": "#04fb9c", "blur": "5", "offsetX": 0, "offsetY": 0, "affectStroke": false, "nonScaling": false }, "visible": true, "backgroundColor": "", "fillRule": "nonzero", "paintFirst": "fill", "globalCompositeOperation": "source-over", "skewX": 0, "skewY": 0, "fontFamily": "Gigi", "fontWeight": "normal", "fontSize": "52", "text": "दूरदर्शन से विमलेश कुमार Vimlesh Kumar From Doordarshan", "underline": true, "overline": false, "linethrough": false, "textAlign": "center", "fontStyle": "italic", "lineHeight": 1.16, "textBackgroundColor": "", "charSpacing": 0, "styles": {}, "direction": "ltr", "path": null, "pathStartOffset": 0, "pathSide": "left", "minWidth": 20, "splitByGrapheme": false } }
    ])
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
                    return ((val !== i) ? value : { element: canvas?.getActiveObjects()[0].toObject() })
                }
                else {
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
        var aa = ''
        savedStyles.forEach(val => {
            aa += JSON.stringify({ 'element': val.element }) + '\r\n'
        });
        const data = new Blob([aa], { type: 'text/plain' });
        const options = {
            suggestedName: 'Style_' + generalFileName(),
            types: [
                {
                    description: 'text Files',
                    accept: {
                        'text/plain': ['.style'],
                    },
                },
            ],
        };
        saveFile(options, data)
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
                            return <tr key={uuidv4()}><td>{i + 1}</td><td className='styleContainer' style={{ minWidth: 200, textAlign: 'center', alignItems: 'center', fontStyle: val.element.fontStyle, fontWeight: val.element.fontWeight, textDecoration: `${val.element.underline ? 'underline' : ''} ${val.element.linethrough ? 'line-through' : ''}`, transform: `skew(${val.element.skewX}deg,${val.element.skewY}deg)`, WebkitTextStroke: `${(val.element.strokeWidth > 2) ? 2 : val.element.strokeWidth}px ${val.element.stroke}`, fontSize: 60, fontFamily: val.element.fontFamily, color: val.element.fill, backgroundColor: val.element.backgroundColor, textShadow: `${val.element.shadow.offsetX / 3}px ${val.element.shadow.offsetY / 3}px ${val.element.shadow.blur}px ${val.element.shadow.color}` }}>Aaक</td><td style={{ textAlign: 'center', alignItems: 'center', }}><button onClick={() => deleteStyle(i)}>Delete</button><br /><button onClick={() => modifyStyle(i)}>Save Here</button><br /><button onClick={() => applyStyle(val.element)}>Apply to Selected</button></td></tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    </div>)
}

export default SavedStyles
