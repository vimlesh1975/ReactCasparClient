const { MosConnection, MosModel } = require('@mos-connection/connector');

const mosID = 'MOS_SERVER_ID';
const mosDeviceID = 'NEWSROOM_ID';
const mosServerHost = '127.0.0.1';
const mosServerPort = 10540;

let connectedMosDevice = null;
let primaryConnectionRef = null; // 👈 global or exported variable

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


        mosDevice.onMOSObjects(async (objs) => {
            // console.dir(objs, { depth: null });
            console.log('log from mos client ' + objs[0]?.ID._mosString128);
            return {
                ID: objs[0]?.ID,      // Use object ID from first object
                Rev: 0,               // Revision number (you can adjust if needed)
                Status: 'OK'          // or 'NACK' for negative acknowledgment
            };
        });

        // Store the primary raw connection for use elsewhere
        const rawConnection = mosConnection._ncsConnections[mosServerHost];
        if (rawConnection && rawConnection.connection) {
            primaryConnectionRef = rawConnection;
        }



    });




    mosConnection.on('rawMessage', (_source, _type, _message) => {
        console.log('rawMessage from client', _source, _type, _message)
    })

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


    const mosDevice = await mosConnection.getDevice(connectedMosDevice.idPrimary);
    // const mosDevice = await mosConnection.getDevice('MOS_SERVER_ID');
    console.log('dskjghlisudhisudfgb ' + mosDevice);

    mosDevice.onMOSObjects(async (objs) => {
        // console.dir(objs, { depth: null });
        console.log('log from mos client ' + objs[0]?.ID._mosString128);
        return {
            ID: objs[0]?.ID,      // Use object ID from first object
            Rev: 0,               // Revision number (you can adjust if needed)
            Status: 'OK'          // or 'NACK' for negative acknowledgment
        };
    });


    // Optional: Disable heartbeats
    const primary = mosConnection._ncsConnections[mosServerHost];
    if (primary) {
        primary.disableHeartbeats();
    }

}

function getMosDevice() {
    return connectedMosDevice;
}

function getMosPrimaryConnection() {
    return primaryConnectionRef;
}
module.exports = {
    startMosClient,
    getMosDevice,
    MosModel,
    getMosPrimaryConnection
};
