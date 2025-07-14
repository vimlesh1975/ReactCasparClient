import { NextResponse } from 'next/server';

import mysql from 'mysql2/promise';
import { config, newdatabase } from '../../../lib/db.js';


export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const ScriptID = searchParams.get('ScriptID');
    const NewsId = searchParams.get('NewsId');

    if (!ScriptID) {
        return NextResponse.json(
            { error: 'ScriptID is required' },
            { status: 400 }
        );
    }

    let connection;

    try {
        connection = await mysql.createConnection(config);

        const query = newdatabase
            ? `SELECT Script FROM script WHERE ScriptID = ?`
            : `SELECT Script FROM script WHERE ScriptID = ? AND NewsId = ?`;

        const values = newdatabase
            ? [ScriptID]
            : [ScriptID, NewsId];

        const [rows] = await connection.execute(query, values);

        if (!rows || rows.length === 0) {
            return NextResponse.json(
                { error: 'No content found for given ScriptID' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            rows[0],
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching content:', error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}
