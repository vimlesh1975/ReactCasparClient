import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'

const EditableTable = () => {
    const canvas = useSelector(state => state.canvasReducer.canvas);
    // const layers = useSelector(state => state.canvasReducer.canvas?.getObjects());
    const dispatch = useDispatch();
    const [data1, setData1] = useState([]);

    const handleChange = (e, i) => {
        const aa = [...data1];
        aa[i] = e.target.value;
        setData1(aa);
    };

    const setText = () => {
        canvas.getObjects().forEach((element, i) => {
            // if (element.id === id) {
            element.text = data1[i];
            // }
        });
        canvas.requestRenderAll();
        dispatch({ type: 'CHANGE_CANVAS', payload: canvas })
    }

    const createTable = () => {
        const aa = [];
        canvas.getObjects().forEach(element => {
            aa.push([{ data: element.text + "1" }])
        });
        setData1(aa)
    }

    const addRows = () => {
        const aa = [...data1];
        canvas.getObjects().forEach(element => {
            aa.push({ data: element.text + "2" })

        });
        setData1(aa)
    }


    return (<div>
        <button onClick={createTable}>Create Table</button>
        <button onClick={addRows}>Add Rows</button>
        <table border='1' >
            <thead>
                <tr>
                    {canvas?.getObjects()?.map((val, i) => <th key={i}>{val['id']}</th>)}
                    <th>Play</th>
                </tr>
            </thead>
            <tbody>


                {data1?.map((element, i) => (<>
                    <tr >
                        <td key={i}>
                            <input
                                type="text"
                                value={element[0].data}
                                onChange={(e) => handleChange(e, i)}
                            />
                        </td>
                        <td><button onClick={() => setText()}>Play</button></td>
                    </tr>
                </>))}



            </tbody>
        </table >
    </div>);
};

export default EditableTable;
