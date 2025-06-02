import { CasparCG, Options, AMCP } from 'casparcg-connection';

import io from 'socket.io-client';
const socket = io('http://localhost:5000');
var aa = null;
if (aa === null) { aa = new CasparCG(process.env.CASPAR_HOST, 5250); }
aa.queueMode = Options.QueueMode.SEQUENTIAL;
aa.onConnectionChanged = () => {
  socket.emit('ServerConnectionStatus', aa.connected);
  console.log('ServerConnectionStatus ' + aa.connected);
};
aa.onDisconnected = () => {
  socket.emit('ServerConnectionStatus', false);
};
aa.onConnected = () => {
  socket.emit('ServerConnectionStatus', true);
};



export async function POST(req, res) {
  socket.emit('ServerConnectionStatus', aa.connected);
  const body = await req.json();
  // console.log(body)
  if (body.action === 'endpoint') {
    if (aa) {
      try {
        aa.do(new AMCP.CustomCommand(body.command));
      } catch (error) {
      }
    }
    return new Response('');
  }
  if (body.action === 'connect') {
    if (!aa.connected) {
      aa.connect();
    }
    return new Response(true);
  }
  if (body.action === 'disconnect') {
    if (aa.connected) {
      aa.disconnect();
    }
    return new Response(false);
  }
  return new Response('');
}
