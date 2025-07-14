// Root: src/app/api/ro/sendROInsertItems/route.js
import { NextResponse } from 'next/server';
import { getMosDevice } from '../../../lib/mosClient';


export async function POST() {
  const device = getMosDevice();
  if (!device) return NextResponse.json({ error: '❌ Not connected to MOS' }, { status: 500 });

  const Items = [
    {
      ID: 'ITEM002',
      Slug: 'Lower Third2',
      ObjectID: 'lower_third_template2',
      MOSAbstract: 'Anchor name lower third2',
      EditorialStart: 70,
      EditorialEnd: 550,
      EditorialDuration: 700
    }
  ];

  try {
    await device.sendROInsertItems({
      RunningOrderID: 'RO001',
      StoryID: 'STORY001',
      ItemID: 'ITEM001'
    }, Items, false);
    return NextResponse.json({ message: 'Item inserted' });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
