// socket.js
import { io } from "socket.io-client";
import { addressforwebteleprompter } from '../common';

const socket = io(addressforwebteleprompter); // You can provide your server URL here
export default socket;
