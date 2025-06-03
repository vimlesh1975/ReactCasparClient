// socket.js
import { io } from "socket.io-client";

const socket = io('https://localhost:9000'); // You can provide your server URL here
export default socket;
