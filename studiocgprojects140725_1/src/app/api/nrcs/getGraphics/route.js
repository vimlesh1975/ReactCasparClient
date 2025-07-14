import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { config, newdatabase } from '../../../lib/db.js';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const ScriptID = searchParams.get('ScriptID');

    if (!ScriptID) {
      return NextResponse.json({ error: 'Missing ScriptID' }, { status: 400 });
    }

    const query = newdatabase
      ? `
        SELECT *, 
          slno as GraphicsOrder, 
          gfxtemplatetext as Graphicstext1, 
          gfxtemplatename as GraphicsTemplate  
        FROM graphics2 
        WHERE ScriptID = ? 
          AND gfxtemplatetext IS NOT NULL 
        ORDER BY GraphicsOrder
      `
      : `
        SELECT * 
        FROM graphics2 
        WHERE ScriptID = ? 
          AND GraphicsText1 IS NOT NULL 
        ORDER BY GraphicsOrder
      `;

    const connection = await mysql.createConnection(config);
    const [rows] = await connection.execute(query, [ScriptID]);

    return NextResponse.json({ items: rows });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Error fetching graphics' },
      { status: 500 }
    );
  }
}
