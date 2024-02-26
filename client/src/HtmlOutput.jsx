import React from 'react'
import { useSelector } from "react-redux";

const HtmlOutput = ({ scale }) => {
    const clientId = useSelector((state) => state.clientIdReducer.clientId);

    return (
        <div style={{ position: 'absolute', width: 1920, height: 1080, transform: `scale(${scale})`, transformOrigin: '0 0' }}>
            <iframe style={{ backgroundColor: 'grey', width: 1920, height: 1080, }} src={"/ReactCasparClient/html/" + clientId} title='HtmlOutput'></iframe>
        </div>
    )
}

export default HtmlOutput