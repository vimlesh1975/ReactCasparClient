import React, { useState, useEffect } from 'react'
import { io } from 'socket.io-client';

const Server = () => {
    const [mosObject, setMosObject] = useState([]);
    useEffect(() => {
        const socket = io(':9000');

        socket.on('onMOSObjects', (data) => {
            console.log('Received ROCreate:', data);
            setMosObject(prev => [...prev, data[0]]);
        });

        return () => {
            socket.disconnect();
        };
    }, []); // Run only once on mount

    const sendMosObject = async () => {
        const dataToSend = {
            clip: 'amb',
        };

        try {
            const response = await fetch('https://localhost:9000/api/send-raw-from-server', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            const result = await response.text();
            console.log(result);
        } catch (error) {
            console.error('Error sending Running Order:', error);
        }
    };


    return (<div>

        <div>Server</div>
        <div>
            <button onClick={sendMosObject}> send to Client</button>

        </div>

        <div>
            <h1>mosObjects</h1>
            {/* <ul>
                {runningOrders.map((ro, idx) => (
                    <li key={idx}>{ro.ID}</li>
                ))}
            </ul> */}
            {JSON.stringify(mosObject, null, 2)}
        </div>
    </div>)
}

export default Server