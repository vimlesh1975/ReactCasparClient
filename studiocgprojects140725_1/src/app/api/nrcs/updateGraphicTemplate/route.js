import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { config } from '../../../lib/db.js';

export async function POST(req) {
    try {
        const body = await req.json();
        const { GraphicsID, GraphicsTemplate } = body;

        if (!GraphicsID) {
            return NextResponse.json(
                { error: 'GraphicsID is required' },
                { status: 400 }
            );
        }
        const query = `UPDATE graphics2 SET gfxtemplatename = ? WHERE GraphicsID = ?`;
        const connection = await mysql.createConnection(config);

        await connection.execute(query, [GraphicsTemplate, GraphicsID]);

        return NextResponse.json({
            message: 'Graphic updated successfully',
        });
    } catch (error) {
        console.error('Error updating graphic template:', error);
        return NextResponse.json(
            { error: 'An error occurred while updating the graphic' },
            { status: 500 }
        );
    }
}
