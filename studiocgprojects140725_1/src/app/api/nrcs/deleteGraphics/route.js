import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { config } from '../../../lib/db.js';

export async function POST(req) {
    try {
        const body = await req.json();
        const { GraphicsID } = body;

        if (!GraphicsID) {
            return NextResponse.json(
                { error: 'GraphicsID is required' },
                { status: 400 }
            );
        }

        const connection = await mysql.createConnection(config);

        await connection.execute(
            `DELETE FROM graphics2 WHERE GraphicsID = ?`,
            [GraphicsID]
        );

        return NextResponse.json({
            message: 'Graphic deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting graphic:', error);
        return NextResponse.json(
            { error: 'An error occurred while deleting the graphic' },
            { status: 500 }
        );
    }
}
