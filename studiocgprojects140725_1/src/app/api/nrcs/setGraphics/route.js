import mysql from 'mysql2/promise';
import { config } from '../../../lib/db.js';
import { NextResponse } from 'next/server';

export async function POST(req) {
    let connection;

    try {
        const body = await req.json();

        const { Graphicstext1, graphicsID } = body;

        const query = `UPDATE graphics SET gfxtemplatetext = ? where GraphicsID=?`;

        connection = await mysql.createConnection(config);

        await connection.execute(query, [Graphicstext1, graphicsID]);

        return NextResponse.json(
            { message: '✅ graphics2 set successfully' },
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
