import React, { useEffect, useRef } from 'react'
import socketIOClient from "socket.io-client";

const Html = () => {
    const refhtml = useRef();
    const updateHtml = (data) => {
        console.log(data)
        document.getElementById((JSON.parse(data.data))[0].key).getElementsByTagName('text')[0].getElementsByTagName('tspan')[0].innerHTML = (JSON.parse(data.data))[0].value;
    }
    window.updateHtml = updateHtml;

    useEffect(() => {
        const socket = socketIOClient(':9000');
        socket.on("html", data => {
            refhtml.current.innerHTML = data.data1;
        });
        socket.on("updateHtml", data => {
            updateHtml(data);
        });
        return () => {
            socket?.removeListener('html');
            socket?.off('html');
            socket?.disconnect();
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div ref={refhtml}></div>
    )
}

export default Html