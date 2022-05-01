import { useState } from 'react'

export default function CsvReader(){
    const [csvFile, setCsvFile] = useState();
    const [csvArray, setCsvArray] = useState([]);
    // [{name: "", age: 0, rank: ""},{name: "", age: 0, rank: ""}]

    const processCSV = (str, delim=',') => {
        // const headers = str.slice(0,str.indexOf('\n')).split(delim);
        // const rows = str.slice(str.indexOf('\n')+1).split('\n');
        // console.log(rows);

        var aa = str.split('\r\n');
        aa.splice(-1);
        var updatedcanvasList = [];
        aa.forEach(element => {
            var cc = element;
            updatedcanvasList.push(cc)
        });
        setCsvArray(updatedcanvasList);
        console.log(updatedcanvasList)
        // const newArray = rows.map( row => {
        //     const values = row.split(delim);
        //     const eachObject = headers.reduce((obj, header, i) => {
        //         obj[header] = values[i];
        //         console.log(obj)
        //         return obj;
        //     }, {})
        //     return eachObject;
        // })

        // setCsvArray(newArray)
    }

    const submit = () => {
        const file = csvFile;
        const reader = new FileReader();

        reader.onload = function(e) {
            const text = e.target.result;
            console.log(text);
            processCSV(text)
        }

        reader.readAsText(file);
    }

    return(
        <form id='csv-form'>
            <input
                type='file'
                accept='.csv'
                id='csvFile'
                onChange={(e) => {
                    setCsvFile(e.target.files[0])
                }}
            >
            </input>
            <br/>
            <button
                onClick={(e) => {
                    e.preventDefault()
                    if(csvFile)submit()
                }}
            >
                Submit
            </button>
            <br/>
            <br/>
            {csvArray.length>0 ? 
            <>
                <table border='1'>
                    {/* <thead>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Rank</th>
                    </thead> */}
                    <tbody>
                        {
                            csvArray.map((item, i) => (<tr>
                              { item.split(',').map((val)=><td>{val}</td>)}
                               </tr> ))
                        }
                    </tbody>
                </table>
            </> : null}
        </form>
    );

}