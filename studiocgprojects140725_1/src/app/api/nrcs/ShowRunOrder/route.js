import mysql from 'mysql2/promise';
import { config, newdatabase } from '../../../lib/db.js';
// import socket from '../socketClient.js';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const NewsId = searchParams.get('NewsId');
  const date = searchParams.get('date');
  if (NewsId === '') {
    return new Response(JSON.stringify({ error: '' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  let connection;

  try {
    connection = await mysql.createConnection(config);
    const query = newdatabase ? `SELECT *, 
    slno AS RunOrder, 
    createdtime AS CreatedTime, 
    scriptmodifiedtime as ScriptLastModifiedTime,
    approved AS Approval, 
    graphicsid as MediaInsert,
    dropstory AS DropStory
    FROM script 
    WHERE deleted = 0 AND bulletinname = ? AND bulletindate = ? 
    ORDER BY RunOrder;`: `CALL show_runorder(?)`


    try {
      const [rows] = await connection.query(query, [NewsId, date]);
      // socket.emit("databaseConnection1", 'true');

      return new Response(JSON.stringify({ data: newdatabase ? rows : rows[0] }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } finally {
      if (connection) {
        await connection.end(); // Close the database connection
      }

    }
  } catch (error) {
    // socket.emit("databaseConnection1", 'false');

    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
