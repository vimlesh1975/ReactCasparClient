import React, {useEffect} from 'react'
import socketIOClient from "socket.io-client";

const Xyz = () => {

    useEffect(() => {
        var socket;
        if (window.location.origin !== "https://vimlesh1975.github.io") {
            socket = new socketIOClient(":9000");
        }
        else {
            socket = new socketIOClient("https://octopus-app-gzws3.ondigitalocean.app");
        }

        socket.on("DataFromCanvas", (data) => {
            console.log(data)
        });
    })
    return (
        <div style={{ backgroundColor: 'yellow', fontSize: 100 }}>Hello Xyz</div>
    )
}

export default Xyz