const { MosConnection, MosModel } = require("@mos-connection/connector");

const mosID = process.env.MOS_ID;
const mosDeviceID = process.env.MOS_DEVICE_ID;
const mosServerHost = process.env.MOS_IP;
const mosServerPort = parseInt(process.env.MOS_PORT);
// Use globalThis to store the persistent device
globalThis._mos = globalThis._mos || {
  connectedMosDevice: null,
  mosConnection: null,
  isConnecting: false,
};

async function startMosClient() {
  if (globalThis._mos.connectedMosDevice || globalThis._mos.isConnecting) {
    return; // Already connected or connecting
  }

  globalThis._mos.isConnecting = true;

  const mosConnection = new MosConnection({
    mosID,
    heartbeatInterval: 0,
    mosHost: mosServerHost,
    deviceID: mosDeviceID,
    openMosPort: 0,
    acceptsConnections: true,
    debug: false,
    profiles: {
      0: true,
      1: true,
      2: true,
      4: true,
    },
    isNCS: false,
  });

  mosConnection.onConnection((mosDevice) => {
    console.log(`✅ Connected to MOS server:`, mosDevice.idPrimary);
    globalThis._mos.connectedMosDevice = mosDevice;
    globalThis._mos.isConnecting = false;
  });

  mosConnection.on("error", (err) => {
    console.error("❌ MOS Connection error:", err);
  });

  mosConnection.on("warning", (msg) => {
    console.warn("⚠️ MOS Warning:", msg);
  });

  mosConnection.on("rawMessage", (source, type, message) => {
    console.log("📨 rawMessage from", source, type, message);
  });

  globalThis._mos.mosConnection = mosConnection;

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
  return globalThis._mos.connectedMosDevice;
}

module.exports = {
  startMosClient,
  getMosDevice,
  MosModel,
};
