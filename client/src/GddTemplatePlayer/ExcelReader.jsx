import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import Table from './Table';

const ExcelReader = ({ data1, setAa, aa, updateInPreview, updateTocaspar }) => {
    const [data, setData] = useState(data1);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const arrayBuffer = e.target.result;
            const workbook = XLSX.read(arrayBuffer, { type: 'array' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const json = XLSX.utils.sheet_to_json(worksheet);
            setData(json);
        };

        reader.readAsArrayBuffer(file);
    };

    return (
        <div>
            <label> Read Excel File having same header</label><br />
            <label> as template field variable</label>
            <input type="file" onChange={handleFileUpload} />
            <Table data1={data} setAa={setAa} aa={aa} updateInPreview={updateInPreview} updateTocaspar={updateTocaspar} />
        </div>
    );
};

export default ExcelReader;
