// socketClient.js
import { io } from 'socket.io-client';

const socket = io('https://localhost:9000', {
    transports: ['polling'],
});

socket.on('connect', () => console.log('Socket connected:', socket.id));
socket.on('disconnect', () => console.log('Socket disconnected'));
socket.on('connect_error', (err) => console.log('Socket connection error:', err));

export default socket;
