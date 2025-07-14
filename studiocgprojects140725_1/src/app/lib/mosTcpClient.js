import net from "net";

let client = null;

export async function getMosTcpClient() {
  const mosServerHost = process.env.MOS_IP;
  const mosServerPort = parseInt(process.env.MOS_PORT);

  return new Promise((resolve, reject) => {
    if (client && !client.destroyed) {
      console.log("✅ Reusing existing MOS TCP connection.");
      return resolve(client);
    }

    client = new net.Socket();

    // bind the local end to localPort (e.g. 12345)
    // client.bind(12345);

    client.connect(mosServerPort, mosServerHost, () => {
      console.log(`✅ Connected to MOS at ${mosServerHost}:${mosServerPort}`);
      resolve(client);
    });

    client.on("data", (data) => {
      console.log("MOS replied:", data.toString());
    });

    client.on("error", (err) => {
      console.error("❌ MOS TCP connection error:", err.message);
      client.destroy();
      client = null;
      reject(err);
    });

    client.on("close", () => {
      console.log("✅ MOS TCP connection closed.");
      client = null;
    });
  });
}
