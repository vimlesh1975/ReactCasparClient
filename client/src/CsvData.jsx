import React, { useState } from 'react'
import Papa from "papaparse";
import { fabric } from "fabric";
import { shadowOptions, options } from './common'
import { useSelector } from 'react-redux'


const data1 = `name,age,email
John,30,john@example.com
Jane,25,jane@example.com`;

var initialTop = 100;

const CsvData = () => {
    const canvas = useSelector(state => state.canvasReducer.canvas);

    const [headers, setHeaders] = useState(Object.keys(Papa.parse(data1, { header: true }).data[0]))
    const [datas, setDatas] = useState(Papa.parse(data1, { header: true }).data)

    const handleChange = e => {
        if (e.target.files[0]) {
            console.log(e.target.files[0])
            Papa.parse(e.target.files[0], {
                header: true,
                complete: responses => {
                    console.log(responses);
                    console.log(Object.keys(responses.data[0]));
                    setDatas(responses.data);
                    setHeaders(Object.keys(responses.data[0]))
                }
            });
        }

    }
    const createTextBox = (canvas, header, value) => {

        const text = new fabric.Textbox(value.toString(), {
            shadow: shadowOptions,
            id: header,
            class: header,
            left: 103 * 1.87,
            top: initialTop,
            width: 480 * 1.87,
            fill: '#ffffff',
            fontFamily: options.currentFont,
            fontWeight: 'bold',
            fontSize: options.currentFontSize,
            editable: true,
            objectCaching: false,
            textAlign: 'left',
            stroke: '#000000',
            strokeWidth: 0,

        });
        canvas.add(text).setActiveObject(text);

        initialTop += 200;
        canvas.renderAll();
    };
    const updateData = (index) => {
        headers.forEach((header, i) => {
            const myelement = canvas.getObjects().find(element => element.id === header)
            myelement.set({ text: datas[index][headers[i]] })
        })
        canvas.requestRenderAll();
    }
    const changeToImage = (i, j) => {
        const updatedData = [...datas]
        // console.log(updatedData[i][headers[j]])
        // console.log(i, j)
        updatedData[i][headers[j]] = "vimlesh"
        setDatas(updatedData)
    }

    return (<div>
        <div>CsvData</div>
        <input type="file" onChange={handleChange} />
        <table border='1'>
            {headers.map((row, i) => {
                return (<th key={i}   >{row}</th>)
            })}
            <th>Update</th>
            <tbody>
                {datas.map((row, i) => {
                    return (<tr key={i}  >{headers.map((header, ii) => {
                        return (<td onClick={() => changeToImage(i, ii)} key={ii}>
                            {row[header]}
                        </td>
                        )
                    })}<td><button onClick={() => updateData(i)}>Update</button></td></tr>)
                })}
            </tbody>
        </table>

        <button onClick={() => {
            initialTop = 100;
            headers.forEach((header) => {
                createTextBox(canvas, header, header);
            })
        }}>Create Temlplate</button>

    </div>)
}

export default CsvData