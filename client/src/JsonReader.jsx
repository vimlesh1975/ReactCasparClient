import React, { useState } from 'react';
import { fabric } from "fabric";
import { options, shadowOptions } from './common'
import { useSelector } from 'react-redux'
import CsvReader from './CsvReader';

const JsonReader = () => {
    const fileName = 'http://localhost:3000/ReactCasparClient/swimming/heat/1_1.json';
    const [dataHeat, setdataHeat] = useState('');
    const [dataResult, setdataResult] = useState('');
    const canvas = useSelector(state => state.canvasReducer.canvas);

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
        fetch('http://localhost:3000/ReactCasparClient/swimming/result/1.json', {
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

            const text = new fabric.Text(val.lane.toString(), {
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


            const text1 = new fabric.Text(val.id.toString() + ' ' + val.nametext.toString(), {
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

            const text2 = new fabric.Text(val.clubname.toString(), {
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

    return (
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

            <CsvReader />
        </div>
    )
}

export default JsonReader