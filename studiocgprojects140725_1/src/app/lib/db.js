
import mysql from 'mysql2/promise';
// import socket from './socketClient.js';

var mysqlConfig = {};
if (process.env.credentialsfromenv !== '1') {
    const readCredentials = await import('./readCredentials.js');
    mysqlConfig = await readCredentials.mysqlConfig;
}

const configFromEnvFile = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectTimeout: 20000, // 20 seconds
};
export const config = process.env.credentialsfromenv === '1' ? configFromEnvFile : mysqlConfig;
export const newdatabase = process.env.NEWDATABASE === "true"

// console.log(`config loaded from ${process.env.credentialsfromenv === '1' ? 'env file' : 'php file'}`);


try {
    const connection = await mysql.createConnection(config);
    // console.log("✅ Successfully connected to the MySQL database.");
    // socket.emit("databaseConnection1", 'true');
    await connection.end(); // cleanly close after testing
} catch (error) {
    // console.error("❌ MySQL connection error:", error.message);
    // socket.emit('databaseConnection1', 'false');
}