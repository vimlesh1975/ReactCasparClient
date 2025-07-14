// Root: src/app/api/ro/connect/route.js

import { NextResponse } from 'next/server';
import { startMosClient } from '../../../lib/mosClient';

export async function POST() {
  try {
    await startMosClient();
    return NextResponse.json({ message: '🔌 Connected to MOS server' });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}