import mysql from 'mysql2/promise';
import { config, newdatabase } from '../../../lib/db.js';
import { NextResponse } from 'next/server';

export async function POST(req) {
    let connection;

    try {
        const body = await req.json();

        const { GraphicsID, GraphicsOrder } = body;

        const query = newdatabase
            ? `UPDATE graphics2 SET slno = ? WHERE GraphicsID = ?`
            : `UPDATE graphics2 SET GraphicsOrder = ? WHERE GraphicsID = ?`;

        connection = await mysql.createConnection(config);

        await connection.execute(query, [GraphicsOrder, GraphicsID]);

        return NextResponse.json(
            { message: '✅ graphics2 order updated successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: error.message || 'Error updating graphics order' },
            { status: 500 }
        );
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}
