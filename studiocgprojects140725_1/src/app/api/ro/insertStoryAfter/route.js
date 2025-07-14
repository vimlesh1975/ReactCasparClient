// Root: src/app/api/ro/insertStoryAfter/route.js
import { NextResponse } from 'next/server';
import { getMosDevice } from '../../../lib/mosClient';


export async function POST(req) {
  const body = await req.json();
  const device = getMosDevice();
  if (!device) return NextResponse.json({ error: '❌ Not connected to MOS' }, { status: 500 });

  try {
    const { roID, newStoryID, slug } = body;
    const story = {
      ID: newStoryID,
      Slug: slug,
      Items: [
        {
          ID: 'ITEM001',
          Slug: 'Lower Third',
          ObjectID: 'lower_third_template',
          MOSAbstract: 'Anchor name lower third',
          EditorialStart: 50,
          EditorialEnd: 550,
          EditorialDuration: 700,
          UserTimingDuration: 690
        }
      ]
    };
    await device.sendROInsertStories(roID, [story], true);
    return NextResponse.json({ message: `Story ${story.ID} inserted` });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
