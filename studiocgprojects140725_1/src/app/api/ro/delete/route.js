// Root: src/app/api/ro/delete/route.js


import { NextResponse } from 'next/server';
import { getMosDevice } from '../../../lib/mosClient';


export async function POST() {
  const device = getMosDevice();
  if (!device) return NextResponse.json({ error: '❌ Not connected to MOS' }, { status: 500 });

  try {
    await device.sendDeleteRunningOrder('RO001');
    return NextResponse.json({ message: '🗑️ Sent RO Delete' });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}