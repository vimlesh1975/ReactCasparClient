import React from 'react'
import uuid from "uuid";
const aa = [1, 2, 3, 4, 5];
const BlankDiv = () => {
    return (<>
        {aa.map((val, index) => {
            return (<>
                <div key={uuid.v4()} id={`twoliner${val}`}></div>
                <div key={uuid.v4()} id={`topleft${val}`}></div>
            </>)
        })}
    </>)
}

export default BlankDiv
