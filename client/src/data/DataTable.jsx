import React from 'react'
import { useSelector } from 'react-redux'
import EditableTable from './EditableTable';
// import { useState } from "react";

const DataTable = () => {
    // const canvas = useSelector(state => state.canvasReducer.canvas);

    return (
        <div>
            DataTable
            <EditableTable />
        </div>
    )
}

export default DataTable
