import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'

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
        setHeaders(canvas.getObjects().map((elements) => elements.id));
        const aa = canvas.getObjects().reduce((acc, obj) => {
            if (obj.type === 'textbox' && obj.id != null) {
                acc[obj.id] = obj.text;
            }
            return acc;
        }, {});
        setData1([aa]);
    }

    const addRows = () => {
        const aa = canvas.getObjects().reduce((acc, obj) => {
            if (obj.type === 'textbox' && obj.id != null) {
                acc[obj.id] = obj.text;
            }
            return acc;
        }, {});

        setData1(data1 => [...data1, aa]);
    }

    return (<div>
        <button onClick={createTable}>Create Table</button>
        <button onClick={addRows}>Add Rows</button>
        <table border='1' >
            <thead>
                <tr>
                    {headers?.map((val, i) => <th key={i}>{val}</th>)}
                    <th>Play</th>
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
                        <td><button onClick={() => setText(rowIndex)}>Play</button></td>
                    </tr>
                ))}
            </tbody>
        </table >
    </div>);
};

export default EditableTable;
