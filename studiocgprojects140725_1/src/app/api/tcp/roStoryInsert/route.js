import { NextResponse } from 'next/server';
import { getMosTcpClient } from '../../../lib/mosTcpClient.js';

import { toUTF16BE, fix, mosStart, mos, compressed } from '../../../lib/common.js';

export async function POST(req) {
  const { roID, storyID } = await req.json();

  const aa = `
   <roElementAction operation="INSERT">
    <roID>${roID}</roID>
    <element_target>
      <storyID/>
    </element_target>
    <element_source>
      <story>
        <storyID>${storyID}</storyID>
        <storySlug>${roID}_${storyID}</storySlug>
      </story>
    </element_source>
  </roElementAction>
`;


  try {
    const client = await getMosTcpClient();

    client.write(toUTF16BE(mosStart + fix + compressed(aa) + mos));
    console.log('client send :' + mosStart + fix + compressed(aa) + mos)

    return NextResponse.json({ message: `✅ roStoryInsert sent for ${roID} ${storyID} ` });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
