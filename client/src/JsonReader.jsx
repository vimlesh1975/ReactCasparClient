import React, { useState } from 'react';
import { fabric } from "fabric";
import { resizeTextWidth, options, shadowOptions } from './common'
import { useSelector } from 'react-redux'

const JsonReader = () => {
    const [dataHeat, setdataHeat] = useState('');
    const [dataResult, setdataResult] = useState('');
    const [dataJson, setDataJson] = useState('');

    const canvas = useSelector(state => state.canvasReducer.canvas);

    const loadJsonHeat = () => {
        fetch('/ReactCasparClient/swimming/heat/1_1.json', {
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
        fetch('/ReactCasparClient/swimming/result/1.json', {
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
                class: 'class_' + fabric.Object.__uid,
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
                class: 'class_' + fabric.Object.__uid,
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
                class: 'class_' + fabric.Object.__uid,

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
                class: 'class_' + fabric.Object.__uid,
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
                class: 'class_' + fabric.Object.__uid,
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
                class: 'class_' + fabric.Object.__uid,
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
                class: 'class_' + fabric.Object.__uid,
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
                class: 'class_' + fabric.Object.__uid,
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
                class: 'class_' + fabric.Object.__uid,
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
                class: 'class_' + fabric.Object.__uid,
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
            class: 'class_' + fabric.Object.__uid,
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
    const getSelectionText = () => {
        var text = "";
        if (window.getSelection) {
            text = window.getSelection().toString();
        } else if (document.selection && document.selection.type !== "Control") {
            text = document.selection.createRange().text;
        }
        addsingletext(text);
    }
    return (<div style={{ overflow: 'scroll', height: 900 }}>
        <div style={{ height: 200, overflow: 'scroll' }}>
            Paste content Here and then Double click on any word to add on canvas:<br />
            <textarea onDoubleClick={getSelectionText} style={{ width: 750, height: 150 }} defaultValue={`1	Archery	Ahmedabad	Sanskardham Venue 1	September 30-October 6 (7 days)
                2	Kho-Kho	Ahmedabad	Sanskardham Venue 2	September 30-October 4 (5 days)
                3	Mallakhambh	Ahmedabad	Sanskardham Venue 2	October 7-11 (5 days)
                4	Rugby 7s	Ahmedabad	Transtadia, Football Ground	September 28-30 (3 days)
                5	Football (M)	Ahmedabad	Transtadia, Football Ground	October 2-11 (10 days)
                6	Football (F)	Ahmedabad	Shahibagh Police Ground	October 1-10 (10 days)
                7	Kabaddi	Ahmedabad	EKA, Transtadia	September 26-October 1 (5 days)
                8	Yogasana	Ahmedabad	EKA, Transtadia	October 6-11 (6 days)
                9	Rowing	Ahmedabad	Sabarmati Venue 1	September 30-October 3 (4 days)
                10	Canoeing	Ahmedabad	Sabarmati Venue 1	October 10-11 (2 days)
                11	RS - Skateboarding	Ahmedabad	Sabarmati Venue 3	September 30-October 1 (2 days)
                12	RS - Artistic Skating	Ahmedabad	Sabarmati Venue 3	September 30-October 1 (2 days)
                13	RS - Inline Skating	Ahmedabad	Sabarmati Venue 3	September 30-October 1 (2 days)
                14	RS - Speed Skating	Ahmedabad	Sabarmati Venue 3	September 30-October 2 (3 days)
                15	Tennis	Ahmedabad	Sabarmati Venue 4	September 29-October 5 (7 days)
                16	Soft Tennis	Ahmedabad	Sabarmati Venue 4	October 7-11 (5 days)
                17	Lawn Bowl	Ahmedabad	Kensville Golf and Country Club	September 26-October 3 (8 days)
                18	Golf	Ahmedabad	Kensville Golf and Country Club	October 6-9 (4 days)
                19	Shooting (Shotgun)	Ahmedabad	Crowne Academy	September 30-October 7 (8 days)
                20	Shooting	Ahmedabad	Rifle Club	September 29-October 3 (5 days)
                21	Cycling (Road)	Gandhinagar	CHH Road	October 8-9 (2 days)
                22	Weightlifting	Gandhinagar	Mahatma Mandir Venue 1	September 30-October 4 (5 days)
                23	Judo	Gandhinagar	Mahatma Mandir Venue 1	October 7-11 (5 days)
                24	Fencing	Gandhinagar	Mahatma Mandir Venue 2	September 30-October 4 (5 days)
                25	Wushu	Gandhinagar	Mahatma Mandir Venue 2	October 8-11 (4 days)
                26	Boxing	Gandhinagar	Mahatma Mandir Venue 3	October 5-12 (8 days)
                27	Wrestling	Gandhinagar	Mahatma Mandir Venue 3	September 30-October 2 (3 days)
                28	Triathlon	Gandhinagar	IIT Gandhinagar	September 30-October 2 (3 days)
                29	Squash	Gandhinagar	IIT Gandhinagar Courts	October 1-5 (5 days)
                30	Athletics	Gandhinagar	IIT Gandhinagar Ground	September 30-October 4 (5 days)
                31	Softball	Gandhinagar	IIT Gandhinagar Ground	October 7-11 (5 days)
                32	Beach Handball	Surat	Dumas Beach	September 30-October 4 (5 days)
                33	Beach Volleyball	Surat	Dumas Beach	October 6-9 (4 days)
                34	Table Tennis	Surat	PDDU Indoor Stadium	September 20-24 (5 days)
                35	Badminton	Surat	PDDU Indoor Stadium	October 1-6 (6 days)
                36	Gymnastics	Vadodara	Sama Sports Complex	September 30-October 4 (5 days)
                37	Handball	Vadodara	Sama Sports Complex	October 7-12 (6 days)
                38	Aquatics	Rajkot	Sardar Patel Complex	October 2-8 (7 days)
                39	Hockey	Rajkot	Saurashtra U & DC Ground 1, 2	October 2-9 (8 days)
                40	Netball	Bhavnagar	MPH, SAG	September 26-30 (5 days)
                41	Basketball 3x3	Bhavnagar	Outdoor Courts, SAG	October 1-3 (3 days)
                42	Basketball 5x5	Bhavnagar	Outdoor Courts, SAG	October 1-6 (6 days)
                43	Volleyball	Bhavnagar	MPH, SAG	October 8-12 (5 days)
                44	Cycling (Track)	Delhi	Velodrome	October 1-4 (4 days)`} />
        </div>
        <div style={{ border: '1px solid red' }}>
            <span>Open Json File:</span><input
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
    </div>)
}

export default JsonReader