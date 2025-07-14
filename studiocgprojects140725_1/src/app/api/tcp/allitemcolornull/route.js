import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function POST(req) {
    try {
        const MongoClient1 = new MongoClient("mongodb://localhost:27017");
        await MongoClient1.connect();

        const db = MongoClient1.db('slidecg');
        const collection = db.collection('story_items');

        // Update all documents where MosId starts with "item"
        const result = await collection.updateMany(
            { MosId: { $regex: '^item' } }, // starts with "item"
            { $set: { Color: null } }
        );

        await MongoClient1.close();

        return NextResponse.json({
            message: `✅ Updated ${result.modifiedCount} document(s).`,
        });

    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
