import mysql from 'mysql2/promise';
import { config, newdatabase } from '../../../lib/db.js';
import { NextResponse } from 'next/server';

export async function POST(req) {
    let connection;

    try {
        const body = await req.json();
        console.log(body)

        const { cgValue, ScriptID, NewsId, selectedDate } = body;

        // Emit data to frontend via websocket (if you’re using a socket client, wire it here)
        // e.g. socket.emit('updateCGEntry', { cgValue, ScriptID, NewsId, selectedDate });

        const values = newdatabase
            ? [cgValue, ScriptID]
            : [cgValue, ScriptID, NewsId];

        const query = newdatabase
            ? `UPDATE script SET graphicsid = ? WHERE ScriptID = ?`
            : `UPDATE runorder SET MediaInsert = ? WHERE ScriptID = ? AND NewsId = ?`;

        connection = await mysql.createConnection(config);

        await connection.execute(query, values);

        return NextResponse.json(
            { message: '✅ CG Entry updated successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: error.message || 'Error updating CG entry' },
            { status: 500 }
        );
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}
