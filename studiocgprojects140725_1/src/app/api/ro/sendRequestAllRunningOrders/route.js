// Root: src/app/api/ro/sendRequestAllRunningOrders/route.js
import { NextResponse } from 'next/server';
import { getMosDevice } from '../../../lib/mosClient';


export async function POST() {
  const device = getMosDevice();
  if (!device) return NextResponse.json({ error: '❌ Not connected to MOS' }, { status: 500 });

  try {
    await device.sendRequestAllRunningOrders();
    return NextResponse.json({ message: '🗑️ Sent sendRequestAllRunningOrders' });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}