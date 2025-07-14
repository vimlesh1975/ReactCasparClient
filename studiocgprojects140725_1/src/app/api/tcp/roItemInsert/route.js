import { NextResponse } from 'next/server';
import { getMosTcpClient } from '../../../lib/mosTcpClient.js';

import { toUTF16BE, fix, mosStart, mos, compressed } from '../../../lib/common.js';

export async function POST(req) {
  const { roID, storyID, itemID } = await req.json();

  const aa = `
     <roElementAction operation="INSERT">
            <roID>${roID}</roID>
            <element_target>
                  <storyID>${storyID}</storyID>
                <itemID>t44</itemID>
            </element_target>
            <element_source>
              <item>
                  <itemID>${itemID}</itemID>
                  <itemSlug>NHL PKG</itemSlug>
                  <objID>M19873</objID>
                  <mosID>testmos</mosID>
<objPaths />
                  <itemEdStart>0</itemEdStart>
                  <itemEdDur>700</itemEdDur>
                  <itemUserTimingDur>690</itemUserTimingDur>
              </item>
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
