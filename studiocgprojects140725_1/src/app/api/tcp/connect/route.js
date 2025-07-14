import { NextResponse } from 'next/server';
import { getMosTcpClient } from '../../../lib/mosTcpClient.js';
import { toUTF16BE, compressed } from '../../../lib/common.js';

export async function POST() {
  const mosID = process.env.MOS_ID;
  const ncsID = process.env.MOS_DEVICE_ID;

  try {
    const client = await getMosTcpClient();

    const initMessage = `<mos>
  <mosID>${mosID}</mosID>
  <ncsID>${ncsID}</ncsID>
</mos>`;

    client.write(toUTF16BE(compressed(initMessage)));

    return NextResponse.json({ message: '✅ Connected and MOS init sent.' });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
