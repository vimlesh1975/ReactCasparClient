import React, { useEffect, useState, useRef, useLayoutEffect } from 'react'
import socketIOClient from "socket.io-client";
import { socketAddress, chatScript } from '../common'


const clientId = window.location.pathname.replace('/ReactCasparClient/chat/', '');
// ... (other imports and constants)

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [messages1, setMessages1] = useState('');
    const containerRef = useRef(null);

    useEffect(() => {
        const socket = socketIOClient(socketAddress());

        socket.on("chat", data => {
            if (data.clientId === clientId) {
                setMessages(msg => [...msg, data.data1]);
            }
        });

        return () => {
            socket?.removeListener('chat');
            socket?.off('chat');
            socket?.disconnect();
        };
    }, []);

    useLayoutEffect(() => {
        // Scroll to the bottom when messages change
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [messages]);

    const send = () => {
        if (messages1 !== '') {
            chatScript(messages1, clientId);
            setMessages1('');
        }

    };

    const handleEnterPress = (event) => {
        if (event.key === 'Enter') {
            send();
        }
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', margin: 'auto', maxWidth: '1200px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
            <h1 style={{ textAlign: 'center', color: '#333' }}>Chat</h1>
            <div
                ref={containerRef}
                style={{
                    maxHeight: '400px',
                    height: '60vh',
                    overflowY: 'auto',
                    border: '1px solid #ccc',
                    padding: '10px',
                    borderRadius: '8px',
                    marginBottom: '10px',
                }}
            >
                {messages.map((val, i) => (
                    <p key={i} style={{ backgroundColor: '#f2f2f2', padding: '8px', borderRadius: '4px', marginBottom: '8px' }}>{val}</p>
                ))}
            </div>
            <div>
                <input
                    style={{
                        width: '100%',
                        padding: '10px',
                        boxSizing: 'border-box',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        marginBottom: '10px',
                    }}
                    onKeyDown={handleEnterPress}
                    onChange={(e) => setMessages1(e.target.value)}
                    value={messages1}
                    placeholder="Type here and press Enter to send"
                />
                <button
                    style={{
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        padding: '10px',
                        borderRadius: '4px',
                        border: 'none',
                        cursor: 'pointer',
                        width: '100%',
                    }}
                    onClick={send}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;