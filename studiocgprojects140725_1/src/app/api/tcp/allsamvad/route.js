import { NextResponse } from 'next/server';
import { getMosTcpClient } from '../../../lib/mosTcpClient.js';
import { toUTF16BE, fix, mosStart, mos, compressed } from '../../../lib/common.js';
import mysql from 'mysql2/promise';
import { config } from '../../../lib/db.js';

export async function POST(req) {
  try {
    const { selectedDate, selectedRunOrderTitle } = await req.json();

    const connection = await mysql.createConnection(config);

    const [rows] = await connection.execute(
      `
        SELECT *
        FROM script
        WHERE deleted = 0
          AND bulletinname = ?
          AND bulletindate = ?
      `,
      [selectedRunOrderTitle, selectedDate]
    );

    console.log("✅ Rows fetched:", rows.length);

    if (rows.length === 0) {
      return NextResponse.json({ message: "⚠️ No rows found." });
    }

    const client = await getMosTcpClient();

    // --- Create roReplace ---
    let roReplace = `
  <roReplace>
    <roID>${process.env.MOS_DEVICE_ID}_RO</roID>
    <roSlug>${selectedRunOrderTitle + '_' + selectedDate}</roSlug>
    <roTrigger>MANUAL</roTrigger>
`;

    rows.forEach((story, i) => {
      const storyID = story.ScriptID || `STORY${i + 1}`;
      const storySlug = story.SlugName || `Story ${i + 1}`;
      roReplace += `    <story>
      <storyID>${storyID}</storyID>
      <storySlug>${storySlug}</storySlug>
      <storyNum>${i + 1}</storyNum>
    </story>
`;
    });

    roReplace += `  </roReplace>
`;


    // Send roReplace
    client.write(toUTF16BE(compressed(mosStart + fix + roReplace + mos)));

    // --- Create roStorySend messages for each story ---
    for (let i = 0; i < rows.length; i++) {
      const story = rows[i];
      const storyID = story.ScriptID || `STORY${i + 1}`;
      const storySlug = story.SlugName || `Story ${i + 1}`;
      const storyBody = story.Script?.replace(/<[^>]+>/g, "") || "";

      const roStorySend = `
  <roStorySend>
        <roID>${process.env.MOS_DEVICE_ID}_RO</roID>
    <storyID>${storyID}</storyID>
    <storySlug>${storySlug}</storySlug>
    <storyNum>${i + 1}</storyNum>
    <storyBody>${storyBody}</storyBody>
  </roStorySend>
`;


      client.write(toUTF16BE(compressed(mosStart + fix + roStorySend + mos)));
    }

    return NextResponse.json({
      message: `✅ roReplace and ${rows.length} roStorySend messages sent for roID ${selectedRunOrderTitle + '_' + selectedDate}`,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
