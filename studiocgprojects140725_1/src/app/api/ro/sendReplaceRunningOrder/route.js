// Root: src/app/api/ro/sendReplaceRunningOrder/route.js
import { NextResponse } from 'next/server';
import { getMosDevice } from '../../../lib/mosClient';


export async function POST() {
  const device = getMosDevice();
  if (!device) return NextResponse.json({ error: '❌ Not connected to MOS' }, { status: 500 });

  const ro = {
    ID: 'RO001',
    Slug: 'Demo Rundown',
    Channel: 'CH1',
    Stories: [],
    MosExternalMetaData: [],
  };

  try {
    const response = await device.sendReplaceRunningOrder(ro);
    return NextResponse.json({ data: response });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}