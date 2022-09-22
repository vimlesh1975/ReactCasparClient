import React, { useState } from 'react';
import { fabric } from "fabric";
import { options, shadowOptions } from './common'
import { useSelector } from 'react-redux'
import CsvReader from './CsvReader';
import { resizeTextWidth } from './DrawingController'

const JsonReader = () => {
    const fileName = 'http://localhost:10000/ReactCasparClient/swimming/heat/1_1.json';
    const [dataHeat, setdataHeat] = useState('');
    const [dataResult, setdataResult] = useState('');
    const [dataJson, setDataJson] = useState('');

    const canvas = useSelector(state => state.canvasReducer.canvas);

    // const loadJson = fileName1 => {
    //     console.log(fileName1)
    //     fetch(fileName1, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json'
    //         }
    //     }
    //     )
    //         .then(function (response) {
    //             // console.log(response)
    //             return response.json();

    //         })
    //         .then(function (myJson) {
    //             // console.log(myJson);
    //             setDataJson(myJson);
    //         });
    // }

    const loadJsonHeat = () => {
        fetch(fileName, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        )
            .then(function (response) {
                // console.log(response)
                return response.json();

            })
            .then(function (myJson) {
                // console.log(myJson);
                setdataHeat(myJson);
            });
    }
    const loadJsonResult = () => {
        fetch('http://localhost:10000/ReactCasparClient/swimming/result/1.json', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        )
            .then(function (response) {
                // console.log(response)
                return response.json();
            })
            .then(function (myJson) {
                // console.log(myJson);
                setdataResult(myJson);
            });
    }

    const craeteTemplate = () => {
        dataHeat?.entries?.forEach((val, i) => {

            const text = new fabric.IText(val.lane.toString(), {
                id: 'id_' + fabric.Object.__uid,
                shadow: shadowOptions,
                left: 50,
                top: 0,
                fill: options.currentColor,
                fontFamily: options.currentFont,
                fontWeight: 'bold',
                fontSize: options.currentFontSize,
                editable: true,
                objectCaching: false,
                textAlign: 'left',
                stroke: options.stroke,
                strokeWidth: options.strokeWidth,
            });
            canvas.add(text).setActiveObject(text);
            canvas.renderAll();
            text.animate('top', 50 + i * 40, { onChange: canvas.renderAll.bind(canvas) })


            const text1 = new fabric.IText(val.id.toString() + ' ' + val.nametext.toString(), {
                id: 'id_' + fabric.Object.__uid,
                shadow: shadowOptions,
                left: 100,
                top: 0,
                fill: options.currentColor,
                fontFamily: options.currentFont,
                fontWeight: 'bold',
                fontSize: options.currentFontSize,
                editable: true,
                objectCaching: false,
                textAlign: 'left',
                stroke: options.stroke,
                strokeWidth: options.strokeWidth,
            });
            canvas.add(text1).setActiveObject(text1);
            canvas.renderAll();
            text1.animate('top', 50 + i * 40, { onChange: canvas.renderAll.bind(canvas) })

            const text2 = new fabric.IText(val.clubname.toString(), {
                id: 'id_' + fabric.Object.__uid,
                shadow: shadowOptions,
                left: 500,
                top: 0,
                fill: options.currentColor,
                fontFamily: options.currentFont,
                fontWeight: 'bold',
                fontSize: options.currentFontSize,
                editable: true,
                objectCaching: false,
                textAlign: 'left',
                stroke: options.stroke,
                strokeWidth: options.strokeWidth,
            });
            canvas.add(text2).setActiveObject(text2);
            canvas.renderAll();
            text2.animate('top', 50 + i * 40, { onChange: canvas.renderAll.bind(canvas) })


        });
    }

    const handleFileChosen = (file) => {
        if (file) {
            const fileReader = new FileReader();
            fileReader.onloadend = () => {
                setDataJson(fileReader.result);
            }
            fileReader.readAsText(file);
        }
    }

    const addsingletext = (val1) => {
        console.log(val1)
        const text = new fabric.IText(val1, {
            shadow: shadowOptions,
            id: 'ccg_' + fabric.Object.__uid,
            left: 10,
            top: 25,
            width: 900,
            fill: '#ffffff',
            fontFamily: options.currentFont,
            fontWeight: 'bold',
            fontSize: 50,
            editable: true,
            objectCaching: false,
            textAlign: 'left',
            padding: 5,

        });
        canvas.add(text).setActiveObject(text);
        setTimeout(() => {
            resizeTextWidth(canvas)
        }, 100);
        canvas.requestRenderAll();
    }

    return (<div>
        <div>
            <button onClick={loadJsonHeat}>Load</button>
            <button onClick={craeteTemplate}>LcraeteTemplateoad</button>
            <table border='1'>
                <tbody>
                    <tr><th>lane</th><th>id</th><th>name</th><th>uni</th></tr>
                    {dataHeat?.entries?.map((val, i) =>
                        <tr key={i}><td>{val.lane}</td><td>{val.athleteid}</td><td>{val.nametext}</td><td>{val.clubname}</td></tr>
                    )}
                </tbody>
            </table>

            <button onClick={loadJsonResult}>Load</button>
            <table border='1'>
                <tbody>
                    <tr><th>lane</th><th>id</th><th>name</th><th>uni</th><th>swimtime</th><th>place</th></tr>
                    {dataResult && dataResult.agegroups && dataResult?.agegroups[0]?.results?.map((val, i) =>
                        <tr key={i}><td>{val.lane}</td><td>{val.athleteid}</td><td>{val.nametext}</td><td>{val.clubname}</td><td>{val.swimtime}</td><td>{val.place}</td></tr>
                    )}
                </tbody>
            </table>

        </div>
        <div style={{ border: '1px solid red' }}>
            <CsvReader />
        </div>
        <div style={{ border: '1px solid red' }}>
            <span>Open File:</span><input
                type='file'
                id='file'
                className='input-file'
                accept='.json'
                onChange={e => {
                    handleFileChosen(e.target.files[0]);
                }}
            />
            <div style={{ height: 200, overflow: 'scroll' }}>
                <span>Double click to add on canvas</span>
                <table border='1' style={{ border: '1px solid red' }}>
                    {(dataJson).split('"').filter((val, i) => i % 2 === 1).map((val1, ii) => {
                        return (<>
                            <tr> <td onDoubleClick={() => addsingletext(val1)}>{val1}</td></tr>
                        </>)
                    })}
                </table>
            </div>
        </div>
    </div>)
}

export default JsonReader