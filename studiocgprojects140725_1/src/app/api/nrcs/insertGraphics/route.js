import mysql from 'mysql2/promise';
import { config } from '../../../lib/db.js';
import { NextResponse } from 'next/server';

export async function POST(req) {
    let connection;

    try {
        const body = await req.json();

        const {
            GraphicsID,
            Graphicstext1,
            GraphicsOrder,
            ScriptID,
            GraphicsTemplate,
            gfxpart2
        } = body;

        const values = [
            GraphicsID,
            Graphicstext1,
            GraphicsOrder,
            ScriptID,
            GraphicsTemplate,
            gfxpart2
        ];

        const query = `INSERT INTO graphics2 (GraphicsID, gfxtemplatetext, slno, ScriptID, gfxtemplatename, gfxpart2) VALUES (?, ?, ?, ?, ?, ?)`


        connection = await mysql.createConnection(config);

        await connection.execute(query, values);

        return NextResponse.json(
            { message: '✅ Graphics inserted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: error.message || 'Error inserting graphics' },
            { status: 500 }
        );
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}
