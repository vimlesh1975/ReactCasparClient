// src/Table.js
import React from 'react';
var interval;
var ii = 0;

const Table = ({ data1, setAa, aa, updateInPreview, updateTocaspar }) => {
    if (!data1 || data1.length === 0) {
        return <div>No data available</div>;
    }

    const headers = Object.keys(data1[0]);
    const setData = (row) => {
        const bb = [...aa];
        bb.forEach((kk) => {
            kk.value.default = row[kk.key].toString();
        })
        setAa(bb)
    }
    const startTimer = () => {
        interval = setInterval(() => {
            setData(data1[ii]);
            updateInPreview();
            updateTocaspar();
            ii++;
            if (ii > data1.length - 1) {
                ii = 0;
            }
        }, 1000);
    }
    const stopTimer = () => {
        clearInterval(interval);
    }


    return (<div>
        <table border="1">
            <thead>
                <tr>
                    {headers.map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                    <th>Set</th>
                </tr>
            </thead>
            <tbody>
                {data1.map((row, index) => (
                    <tr key={index}>
                        {headers.map((header, index) => (
                            <td key={index}>{row[header]}</td>
                        ))}
                        <td><button onClick={() => {
                            setData(row);
                        }}>Set</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
        <div><button onClick={startTimer}>Start Timer</button></div>
        <div><button onClick={stopTimer}>Stop Timer</button></div>
    </div>

    );
};

export default Table;
