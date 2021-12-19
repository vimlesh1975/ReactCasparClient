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
        const updatedsavedStyles = savedStyles.map((value, i) => {
            return ((val !== i) ? value : { element: canvas?.getActiveObject().toObject() })
        });
        setSavedStyles(updatedsavedStyles)
    }
    const addStyle = () => {
        if (canvas.getActiveObjects()[0]) {
            if ((canvas.getActiveObjects()[0].type === 'text') || (canvas.getActiveObjects()[0].type === 'i-text') || (canvas.getActiveObjects()[0].type === 'textbox')) {
                setSavedStyles([...savedStyles, { element: canvas?.getActiveObjects()[0].toObject() }])
            }
            else {
                var aa = canvas?.getActiveObjects()[0].toObject()
                var bb = { ...aa, textAlign: 'left', fontFamily: 'Arial', fontWeight: 'bold', fontSize: '20', underline: false, linethrough: false, fontStyle: 'normal' }
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
                        editable: activeProperty.editable,
                        objectCaching: activeProperty.objectCaching,
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
                            fontSize: activeProperty.fontSize,
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

    return (<div>
        <div className='drawingToolsRow' >
            <button onClick={addStyle}>Add Style</button>
            <table border='1'>
                <tbody>
                    <tr><th>Sr.</th><th>Style</th><th>Operation</th></tr>
                    {savedStyles.map((val, i) => {
                        return <tr key={uuidv4()}><td>{i}</td><td className='styleContainer' style={{ transform: `skew(${val.element.skewX}deg,${val.element.skewY}deg)`, WebkitTextStroke: `${val.element.strokeWidth}px ${val.element.stroke}`, fontSize: 60, fontFamily: val.element.fontFamily, color: val.element.fill, backgroundColor: val.element.backgroundColor, textShadow: `${val.element.shadow.offsetX / 3}px ${val.element.shadow.offsetY / 3}px ${val.element.shadow.blur}px ${val.element.shadow.color}` }}>Aaक</td><td><button onClick={() => deleteStyle(i)}>Delete</button><br /><button onClick={() => modifyStyle(i)}>Save Here</button><br /><button onClick={() => applyStyle(val.element)}>Apply to Selected</button></td></tr>
                    })}
                </tbody>
            </table>
        </div>
    </div>)
}

export default SavedStyles
