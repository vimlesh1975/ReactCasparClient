import React, { useState } from 'react';


const JsonReader = () => {
    const [fileName, setFileName] = useState('http://localhost:3000/ReactCasparClient/swimming/heat/1_1.json')
    const [dataHeat, setdataHeat] = useState('');
    const [dataResult, setdataResult] = useState('');

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
                console.log(myJson);
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
                console.log(myJson);
                setdataResult(myJson);
            });
    }


    return (
        <div>
            <button onClick={loadJsonHeat}>Load</button>
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
                        <tr key={i}> <td>{val.lane}</td><td>{val.athleteid}</td><td>{val.nametext}</td><td>{val.clubname}</td><td>{val.swimtime}</td><td>{val.place}</td></tr>
                    )}
                </tbody>
            </table>

        </div>
    )
}

export default JsonReader