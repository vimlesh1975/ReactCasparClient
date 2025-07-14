// src/app/api/mongodb/items//route.js
import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017'; // adjust if needed
const dbName = 'slidecg';

export async function GET() {
    const client = new MongoClient(uri);

    try {
        await client.connect();

        const db = client.db(dbName);
        const collection = db.collection('story_items');

        const items = await collection.find({}).toArray();

        return NextResponse.json({ items });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    } finally {
        await client.close();
    }
}
