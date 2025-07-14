import { NextResponse } from 'next/server';
import { getMosTcpClient } from '../../../lib/mosTcpClient.js';

import { toUTF16BE, fix, mosStart, mos, compressed } from '../../../lib/common.js';

export async function POST(req) {
   const { roID } = await req.json();

   try {
      const client = await getMosTcpClient();

      const roCreateMsg = `
     <roCreate>
      <roID>${roID}</roID>
      <roSlug>${roID}_Slug</roSlug>
      </roCreate>
    `

      client.write(toUTF16BE(mosStart + fix + compressed(roCreateMsg) + mos));

      return NextResponse.json({ message: `✅ roCreate sent for ${roID}` });
   } catch (err) {
      return NextResponse.json({ error: err.message }, { status: 500 });
   }
}
