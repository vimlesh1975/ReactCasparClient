import { NextResponse } from 'next/server';
import { getMosTcpClient } from '../../../lib/mosTcpClient.js';
import { toUTF16BE, fix, mosStart, mos, compressed } from '../../../lib/common.js';
import mysql from 'mysql2/promise';
import { config } from '../../../lib/db.js'; // 👈 import MySQL config

export async function POST(req) {
  try {
    const { roID } = await req.json();

    const connection = await mysql.createConnection(config); // ✅ use shared config

    const [rows] = await connection.execute(`
      SELECT *
      FROM script
      WHERE deleted = 0
        AND bulletinname = ?
        AND bulletindate = ?
    `, ['0700 Hrs', '2025-07-11']);

    console.log("✅ Rows fetched:", rows.length);

    if (rows.length === 0) {
      return NextResponse.json({ message: "⚠️ No rows found." });
    }

    const client = await getMosTcpClient();

    let roCreateMsg = `<roElementAction operation="INSERT"><roID>${roID}</roID><element_target><storyID/></element_target><element_source>`;

    for (let s = 1; s <= 1; s++) {
      const story = rows[s - 1];
      const storyID = story.ScriptID || `STORY${s}`;
      const storySlug = story.SlugName || `Story ${s}`;

      roCreateMsg += `<story>
      <storyID>${storyID}</storyID>
      <storySlug>${storySlug}</storySlug>
      <storyNum>${s}</storyNum>
      <storyBody>${story.Script}</storyBody>
       <mosExternalMetadata>
          <mosPayload>
            <storyData>
              <prompter>
                <text>Evacuations underway in coastal areas. Category 4 storm expected by 8PM.</text>
                <speed>120</speed> <!-- Words per minute -->
                <fontSize>18</fontSize>
              </prompter>
              <metadata>
                <field name="Producer">Jane Doe</field>
                <field name="Priority">High</field>
              </metadata>
            </storyData>
          </mosPayload>
        </mosExternalMetadata>
    `;

      const itemID = story.SlugName || `ITEM${s}`;
      const itemSlug = story.Script || 'Default Item Script';

      roCreateMsg += `<item>
      <itemID>${itemID}</itemID>
      <objID>lower_third_template</objID>
      <mosID/>
      <itemSlug>${itemSlug}</itemSlug>
      <assetID>08bbb87d-c40e-409f-be92-06d538327548</assetID>
      <itemEdStart>50</itemEdStart>
      <itemEdDur>700</itemEdDur>
      <itemUserTimingDur>690</itemUserTimingDur>
      </item>`;

      roCreateMsg += `</story>`;
    }

    roCreateMsg += `</element_source></roElementAction>`;

    console.log("✅ roCreateMsg:", roCreateMsg);

    client.write(toUTF16BE(mosStart + fix + compressed(roCreateMsg) + mos));

    return NextResponse.json({
      message: `✅ roCreate sent for ${roID}`,
      stories: rows.length
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
