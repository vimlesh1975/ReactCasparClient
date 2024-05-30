import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { saveFile } from '../common'
import Papa from "papaparse";

const EditableTable = () => {
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const dispatch = useDispatch();
    const [data1, setData1] = useState([]);
    const [headers, setHeaders] = useState([]);

    const handleChange = (e, key, rowIndex) => {
        const aa = [...data1];
        aa[rowIndex][key] = e.target.value;
        setData1(aa);
    };

    const setText = (rowIndex) => {
        canvas.getObjects().forEach((element, i) => {
            element.text = data1[rowIndex][element.id];
        });
        canvas.requestRenderAll();
        dispatch({ type: 'CHANGE_CANVAS', payload: canvas })
    }


    const createTable = () => {
        setHeaders(canvas.getObjects()
            .filter((element) => element.type === 'textbox')
            .map((element) => element.id)
        );
        const aa = canvas.getObjects().reduce((acc, obj) => {
            if (obj.type === 'textbox' && obj.id != null) {
                acc[obj.id] = obj.text + '0';
            }
            return acc;
        }, {});
        setData1([aa]);
    }

    const addRows = () => {
        const aa = canvas.getObjects().reduce((acc, obj) => {
            if (obj.type === 'textbox' && obj.id != null) {
                acc[obj.id] = obj.text + data1.length;
            }
            return acc;
        }, {});

        setData1(data1 => [...data1, aa]);
    }

    const deleteData = (rowIndex) => {
        const aa = [...data1];
        aa.splice(rowIndex, 1);
        setData1(aa);
    }
    const createCSV = () => {
        const rows = data1.map(row => headers.map(header => row[header]).join(','));
        const data = [headers.join(','), ...rows].join('\n')
        const ss = new Date().toLocaleTimeString('en-US', { year: "numeric", month: "numeric", day: "numeric", hour12: false, hour: "numeric", minute: "numeric", second: "numeric" });

        const options = {
            fileExtension: '.txt',
            suggestedName: ss,
            types: [{
                description: 'text file',
                accept: { 'text/plain': ['.txt'] },
            }],
        };
        saveFile(options, data,)
    };

    const openCSV = async () => {
        if (window.showOpenFilePicker) {
            const options = {
                multiple: false,
                types: [
                    {
                        description: 'Text and CSV Files',
                        accept: {
                            'text/plain': ['.txt'],
                            'text/csv': ['.csv'],
                        },
                    },
                ],
            };
            const [aa] = await window.showOpenFilePicker(options);
            const file = await aa.getFile();
            Papa.parse(file, {
                header: true,
                complete: responses => {
                    setData1(responses.data);
                    setHeaders(Object.keys(responses.data[0]))
                }
            });
        }
    };



    return (<div>
        <button onClick={createTable}>Create Table</button>
        <button onClick={addRows}>Add Rows</button>
        <button onClick={createCSV}>Create CSV</button>
        <button onClick={openCSV}>Open CSV</button>
        <div style={{ maxWidth: 900, maxHeight: 600, overflow: 'auto' }}>
            <table>
                <thead>
                    <tr>
                        {headers?.map((val, i) => <th key={i}>{val}</th>)}
                        <th>Set</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {data1.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {Object.entries(row).map(([key, value]) => (
                                <td key={key}>
                                    <input
                                        type="text"
                                        value={value}
                                        onChange={e => handleChange(e, key, rowIndex)}
                                    />
                                </td>
                            ))}
                            <td><button onClick={() => setText(rowIndex)}>Set</button></td>
                            <td><button onClick={() => deleteData(rowIndex)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table >
        </div>
    </div>);
};

export default EditableTable;
