import { NextResponse } from 'next/server';
import { getMosDevice } from '../../../lib/mosClient';


export async function POST() {
  const device = getMosDevice();
  if (!device) return NextResponse.json({ error: '❌ Not connected to MOS' }, { status: 500 });

  try {
    await device.sendMOSObject({ Slug: 'ggg' });
    return NextResponse.json({ message: '🗑️ Sent Mos object' });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}