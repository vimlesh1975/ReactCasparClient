import React from 'react'

const Server = () => {

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


    </div>)
}

export default Server