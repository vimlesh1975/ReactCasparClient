// Root: src/app/api/ro/create/route.js

import { NextResponse } from 'next/server';
import { getMosDevice } from '../../../lib/mosClient';


export async function POST() {
  const device = getMosDevice();
  if (!device) return NextResponse.json({ error: '❌ Not connected to MOS' }, { status: 500 });

  const ro = {
    ID: 'RO001',
    Slug: 'Demo Rundown mcs nimma by_ slug',
    Channel: 'CH1',
    Stories: [],
    MosExternalMetaData: [],
  };

  try {
    await device.sendCreateRunningOrder(ro);
    return NextResponse.json({ message: '📤 Sent RO Create' });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}