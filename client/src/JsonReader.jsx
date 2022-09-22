import React, { useState } from 'react';
import { fabric } from "fabric";
import { options, shadowOptions } from './common'
import { useSelector } from 'react-redux'
import CsvReader from './CsvReader';
import { resizeTextWidth } from './DrawingController'

const JsonReader = () => {
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
        fetch('http://localhost:10000/ReactCasparClient/swimming/heat/1_1.json', {
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

    const craeteTemplateHeat = () => {
        Array.from(Array(3).keys()).forEach((val, i) => {
            const text = new fabric.Textbox((i === 0) ? 'Lane' : (i === 1) ? 'Name' : 'Uni', {
                id: 'id_' + fabric.Object.__uid,
                shadow: shadowOptions,
                left: (i === 0) ? 50 : (i === 1) ? 200 : 700,
                top: 0,
                fill: options.currentColor,
                fontFamily: options.currentFont,
                fontWeight: 'bold',
                fontSize: 40,
                editable: true,
                objectCaching: false,
                textAlign: 'left',
                stroke: options.stroke,
                strokeWidth: options.strokeWidth,
            });
            canvas.add(text).setActiveObject(text);
            canvas.renderAll();
            text.animate('top', 200 - 60, { onChange: canvas.renderAll.bind(canvas) })
        });

        dataHeat?.entries?.forEach((val, i) => {
            const text = new fabric.Textbox(val.lane.toString(), {
                id: 'id_' + fabric.Object.__uid,
                shadow: shadowOptions,
                left: 50,
                top: 0,
                fill: options.currentColor,
                fontFamily: options.currentFont,
                fontWeight: 'bold',
                fontSize: 30,
                editable: true,
                objectCaching: false,
                textAlign: 'left',
                stroke: options.stroke,
                strokeWidth: options.strokeWidth,
            });
            canvas.add(text).setActiveObject(text);
            canvas.renderAll();
            text.animate('top', 200 + i * 60, { onChange: canvas.renderAll.bind(canvas) })


            const text1 = new fabric.Textbox(val.id.toString() + ' ' + val.nametext.toString(), {
                id: 'id_' + fabric.Object.__uid,
                shadow: shadowOptions,
                left: 150,
                top: 0,
                width: 600,
                fill: options.currentColor,
                fontFamily: options.currentFont,
                fontWeight: 'bold',
                fontSize: 30,
                editable: true,
                objectCaching: false,
                textAlign: 'left',
                stroke: options.stroke,
                strokeWidth: options.strokeWidth,
            });
            canvas.add(text1).setActiveObject(text1);
            canvas.renderAll();
            text1.animate('top', 200 + i * 60, { onChange: canvas.renderAll.bind(canvas) })

            const text2 = new fabric.Textbox(val.clubname.toString(), {
                id: 'id_' + fabric.Object.__uid,
                shadow: shadowOptions,
                left: 700,
                top: 0,
                width: 1100,
                fill: options.currentColor,
                fontFamily: options.currentFont,
                fontWeight: 'bold',
                fontSize: 30,
                editable: true,
                objectCaching: false,
                textAlign: 'left',
                stroke: options.stroke,
                strokeWidth: options.strokeWidth,
            });
            canvas.add(text2).setActiveObject(text2);
            canvas.renderAll();
            text2.animate('top', 200 + i * 60, { onChange: canvas.renderAll.bind(canvas) })


        });
    }

    const craeteTemplateResult = () => {
        Array.from(Array(5).keys()).forEach((val, i) => {
            const text = new fabric.Textbox((i === 0) ? 'Lane' : (i === 1) ? 'Name' : (i === 2) ? 'Uni' : (i === 3) ? 'Time' : 'Place', {
                id: 'id_' + fabric.Object.__uid,
                shadow: shadowOptions,
                left: (i === 0) ? 50 : (i === 1) ? 200 : (i === 2) ? 700 : (i === 3) ? 1600 : 1750,
                top: 0,
                fill: options.currentColor,
                fontFamily: options.currentFont,
                fontWeight: 'bold',
                fontSize: 40,
                editable: true,
                objectCaching: false,
                textAlign: 'left',
                stroke: options.stroke,
                strokeWidth: options.strokeWidth,
            });
            canvas.add(text).setActiveObject(text);
            canvas.renderAll();
            text.animate('top', 200 - 60, { onChange: canvas.renderAll.bind(canvas) })
        });


        dataResult && dataResult.agegroups && dataResult?.agegroups[0]?.results.forEach((val, i) => {
            const text = new fabric.Textbox(val.lane.toString(), {
                id: 'id_' + fabric.Object.__uid,
                shadow: shadowOptions,
                left: 50,
                top: 0,
                fill: options.currentColor,
                fontFamily: options.currentFont,
                fontWeight: 'bold',
                fontSize: 30,
                editable: true,
                objectCaching: false,
                textAlign: 'left',
                stroke: options.stroke,
                strokeWidth: options.strokeWidth,
            });
            canvas.add(text).setActiveObject(text);
            canvas.renderAll();
            text.animate('top', 200 + i * 60, { onChange: canvas.renderAll.bind(canvas) })


            const text1 = new fabric.Textbox(val.id.toString() + ' ' + val.nametext.toString(), {
                id: 'id_' + fabric.Object.__uid,
                shadow: shadowOptions,
                left: 150,
                top: 0,
                width: 600,
                fill: options.currentColor,
                fontFamily: options.currentFont,
                fontWeight: 'bold',
                fontSize: 30,
                editable: true,
                objectCaching: false,
                textAlign: 'left',
                stroke: options.stroke,
                strokeWidth: options.strokeWidth,
            });
            canvas.add(text1).setActiveObject(text1);
            canvas.renderAll();
            text1.animate('top', 200 + i * 60, { onChange: canvas.renderAll.bind(canvas) })

            const text2 = new fabric.Textbox(val.clubname.toString(), {
                id: 'id_' + fabric.Object.__uid,
                shadow: shadowOptions,
                left: 700,
                top: 0,
                width: 850,
                fill: options.currentColor,
                fontFamily: options.currentFont,
                fontWeight: 'bold',
                fontSize: 30,
                editable: true,
                objectCaching: false,
                textAlign: 'left',
                stroke: options.stroke,
                strokeWidth: options.strokeWidth,
            });
            canvas.add(text2).setActiveObject(text2);
            canvas.renderAll();
            text2.animate('top', 200 + i * 60, { onChange: canvas.renderAll.bind(canvas) })

            const text3 = new fabric.Textbox(val.swimtime.toString(), {
                id: 'id_' + fabric.Object.__uid,
                shadow: shadowOptions,
                left: 1600,
                top: 0,
                width: 200,
                fill: options.currentColor,
                fontFamily: options.currentFont,
                fontWeight: 'bold',
                fontSize: 30,
                editable: true,
                objectCaching: false,
                textAlign: 'left',
                stroke: options.stroke,
                strokeWidth: options.strokeWidth,
            });
            canvas.add(text3).setActiveObject(text3);
            canvas.renderAll();
            text3.animate('top', 200 + i * 60, { onChange: canvas.renderAll.bind(canvas) });

            const text4 = new fabric.Textbox(val.place.toString(), {
                id: 'id_' + fabric.Object.__uid,
                shadow: shadowOptions,
                left: 1800,
                top: 0,
                width: 100,
                fill: options.currentColor,
                fontFamily: options.currentFont,
                fontWeight: 'bold',
                fontSize: 30,
                editable: true,
                objectCaching: false,
                textAlign: 'left',
                stroke: options.stroke,
                strokeWidth: options.strokeWidth,
            });
            canvas.add(text4).setActiveObject(text4);
            canvas.renderAll();
            text4.animate('top', 200 + i * 60, { onChange: canvas.renderAll.bind(canvas) })
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
        const text = new fabric.Textbox(val1, {
            shadow: shadowOptions,
            id: 'ccg_' + fabric.Object.__uid,
            left: Math.floor(Math.random() * 1700) + 1,
            top: Math.floor(Math.random() * 1050) + 1,
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

    return (<div style={{ overflow: 'scroll', height: 900 }}>
        <div>
            Heat:  <button onClick={loadJsonHeat}>Load</button>
            <button onClick={craeteTemplateHeat}>Create Template</button>
            <table border='1'>
                <tbody>
                    <tr><th>lane</th><th>id</th><th>name</th><th>uni</th></tr>
                    {dataHeat?.entries?.map((val, i) =>
                        <tr key={i}><td>{val.lane}</td><td>{val.athleteid}</td><td>{val.nametext}</td><td>{val.clubname}</td></tr>
                    )}
                </tbody>
            </table>

            Result:<button onClick={loadJsonResult}>Load</button>
            <button onClick={craeteTemplateResult}>Create Template</button>

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