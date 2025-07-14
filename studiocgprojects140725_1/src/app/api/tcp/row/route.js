import { NextResponse } from 'next/server';
import { getMosTcpClient } from '../../../lib/mosTcpClient.js';

import { toUTF16BE, fix, mosStart, mos, compressed } from '../../../lib/common.js';

export async function POST(req) {
    const { rowmosmessage } = await req.json();


    try {
        const client = await getMosTcpClient();

        client.write(toUTF16BE(compressed(rowmosmessage)));
        console.log('client send :' + compressed(rowmosmessage))

        return NextResponse.json({ message: `✅ roStoryInsert sent for ${rowmosmessage} ` });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
