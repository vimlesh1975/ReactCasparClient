import { NextResponse } from 'next/server';
import { getMosTcpClient } from '../../../lib/mosTcpClient.js';
import { toUTF16BE, fix, mosStart, mos, compressed } from '../../../lib/common.js';
import mysql from 'mysql2/promise';
import { config } from '../../../lib/db.js';

import { MongoClient } from 'mongodb';

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

    //mongo

    const mongoUri = "mongodb://localhost:27017";
    const MongoClient1 = new MongoClient(mongoUri);
    await MongoClient1.connect();

    const db = MongoClient1.db(process.env.PROJECT_NAME);
    const collection = db.collection('Graphics');
    const allDocs = await collection.find().toArray();

    if (allDocs.length > 0) {
      console.log("✅ First document:", allDocs.length);
    } else {
      console.log("⚠️ No documents found.");
    }

    // await MongoClient1.close();
    //mongo


    if (rows.length === 0) {
      return NextResponse.json({ message: "⚠️ No rows found." });
    }

    const client = await getMosTcpClient();

    const roID = `${process.env.MOS_DEVICE_ID}_RO`;
    const roSlug = `${selectedRunOrderTitle}_${selectedDate}`;

    let storiesXml = "";

    for (let i = 0; i < rows.length; i++) {
      const story = rows[i];

      const storyID = story.ScriptID || `STORY${i + 1}`;
      const storySlug = story.SlugName || `Story ${i + 1}`;

      const itemID = `item_${i + 1}`;
      // Repeat Mongo documents if there are fewer than MySQL rows
      const mongoDoc = allDocs[i % allDocs.length];

      const objID = `${mongoDoc._id.Key1},${mongoDoc._id.Key2}`;
      const graphicID = objID;
      const mosID = 'SAMVAD';
      const itemType = 'GraphicPage';
      const thumbnail = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wD/AP+';
      const categoryColor = 'Green';
      const outputChannel = 'Channel 1';
      const autoUpdate = 'true';

      const tags = [
        { tN: 'tHeaderA', tT: '2', tV: story.SlugName || '' },
        { tN: 'tHeaderB', tT: '2', tV: story.SlugName || '' },
        { tN: 'vWindows', tT: 'Float', tV: '6' },
        { tN: 'tTextA01', tT: '2', tV: 'मौसम ने ली करवट 01' },
        { tN: 'tTextB01', tT: '2', tV: 'मौसम ने ली करवट 11' }
      ];

      let tagsXml = tags
        .map(tag =>
          `              <tag tN="${tag.tN}" tT="${tag.tT}">${tag.tV}</tag>`
        )
        .join('\n');

      const itemXml = `
        <item>
          <itemID>${itemID}</itemID>
          <objID>${objID}</objID>
          <mosID>${mosID}</mosID>
          <itemType>${itemType}</itemType>
          <Thumbnail>${thumbnail}</Thumbnail>
          <metadata>
            <graphicID>${graphicID}</graphicID>
            <categoryColor>${categoryColor}</categoryColor>
            <tags>
${tagsXml}
            </tags>
            <color>${categoryColor}</color>
            <outputChannel>${outputChannel}</outputChannel>
            <autoUpdate>${autoUpdate}</autoUpdate>
          </metadata>
        </item>`.trim();

      storiesXml += `
      <story>
        <storyID>${storyID}</storyID>
        <storySlug>${storySlug}</storySlug>
${itemXml}
      </story>`;
    }

    // Build single MOS message
    const mosXml = `
<mos>
  <ncsID>DDNRCS</ncsID>
  <mosID>WTVISION.STUDIO.MOS</mosID>
  <roElementAction operation="INSERT">
    <roID>${roID}</roID>
    <element_target>
      <storyID/>
    </element_target>
    <element_source>
${storiesXml}
    </element_source>
  </roElementAction>
</mos>`.trim();

    // console.log("🚀 Sending single MOS roElementAction INSERT with all stories:\n", mosXml);

    client.write(toUTF16BE(compressed(mosXml)));

    setTimeout(async () => {
      const db1 = MongoClient1.db('slidecg');
      const collection1 = db1.collection('story_items');

      // Update all documents where MosId starts with "item"
      await collection1.updateMany(
        { MosId: { $regex: '^item_' } }, // starts with "item"
        { $set: { Color: null } }
      );
      await MongoClient1.close();
    }, 5000);





    return NextResponse.json({
      message: `✅ Single roElementAction INSERT message sent for roID ${roID}`
    });

  } catch (err) {
    console.error("❌ Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
