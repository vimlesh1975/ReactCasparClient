const { MosConnection, MosModel } = require('@mos-connection/connector');

const mosID = 'MOS_SERVER_ID';
const mosDeviceID = 'NEWSROOM_ID';
const mosServerHost = '127.0.0.1';
const mosServerPort = 10540;

let connectedMosDevice = null;

async function startMosClient() {
    const mosConnection = new MosConnection({
        mosID,
        heartbeatInterval: 0,
        mosHost: mosServerHost,
        deviceID: mosDeviceID,
        openMosPort: 0,
        acceptsConnections: false,
        debug: false,
        profiles: {
            '0': true,
            '1': true,
            '2': true,
            '4': true
        },
        isNCS: false,
    });

    mosConnection.onConnection((mosDevice) => {
        console.log(`✅ Connected to MOS server on  ${mosDevice}`);
        connectedMosDevice = mosDevice;
        // mosDevice.sendDeleteRunningOrder
    });

    // mosConnection.on('rawMessage', (_source, _type, _message) => {
    //     console.log('rawMessage from client', _source, _type, _message)
    // })

    mosConnection.on('error', (err) => {
        console.error('❌ MOS Connection error:', err);
    });

    mosConnection.on('warning', (msg) => {
        console.warn('⚠️ MOS Warning:', msg);
    });

    await mosConnection.init();

    await mosConnection.connect({
        primary: {
            id: mosDeviceID,
            host: mosServerHost,
            port: mosServerPort,
        },
    });

    const primary = mosConnection._ncsConnections[mosServerHost];
    if (primary) {
        primary.disableHeartbeats();
    }
}

function getMosDevice() {
    return connectedMosDevice;
}
module.exports = {
    startMosClient,
    getMosDevice,
    MosModel,

};
