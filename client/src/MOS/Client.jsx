import React from 'react'

const Client = () => {

    const sendMosObject = async () => {
        const dataToSend = {
            clip: 'amb',
        };

        try {
            const response = await fetch('https://localhost:9000/api/sendMosObject', {
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

    const sendRoCreate = async () => {
        const dataToSend = {
            clip: 'amb',
        };

        try {
            const response = await fetch('https://localhost:9000/api/sendRoCreate', {
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

        <div>
            Client
        </div>
        <div>
            <button onClick={sendMosObject}> send to Mos Object</button>
        </div>

        <div>
            <button onClick={sendRoCreate}> send to rocreate</button>
        </div>

    </div>)
}

export default Client