import { NextResponse } from 'next/server';
import { getDb } from '../../../lib/mongo.js';

export async function POST() {
    try {
        const db = await getDb();
        var collection = db.collection('story_items');
        var result = await collection.deleteMany({});

        collection = db.collection('stories');
        result = await collection.deleteMany({});

        collection = db.collection('shows');
        result = await collection.deleteMany({});

        return NextResponse.json({
            message: `Deleted ${result.deletedCount} items from DDD collection.`,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: 'Failed to delete documents.' },
            { status: 500 }
        );
    }
}
