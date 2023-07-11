import React from 'react'
import { useSelector } from "react-redux";


const HtmlOutput = () => {
    const clientId = useSelector((state) => state.clientIdReducer.clientId);

    return (
        // <Html />
        <div style={{ position: 'absolute' }}>
            <iframe style={{ backgroundColor: 'red', overflow: 'hidden', width: 1920, height: 1080, transform: 'scale(.28)', transformOrigin: '0 0' }} src={"/ReactCasparClient/html/" + clientId} title='HtmlOutput'></iframe>

        </div>

    )
}

export default HtmlOutput