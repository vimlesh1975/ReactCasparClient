// src/app/api/redis-test/route.js
import { NextResponse } from 'next/server';
import { createClient } from 'redis';

export async function GET() {
    const client = createClient({ url: 'redis://127.0.0.1:6379' });

    client.on('error', (err) => console.error('Redis Client Error', err));

    try {
        await client.connect();

        // Set and get a value
        await client.set('hello', 'world');
        const helloValue = await client.get('hello');

        // Get all keys
        const allKeys = await client.keys('*');

        const patterns = ['*rundown*', '*template*', '*cg*', '*slide*'];
        const patternResults = {};

        for (const pattern of patterns) {
            const found = await client.keys(pattern);
            patternResults[pattern] = found;
        }

        const allKeyDetails = [];

        for (const key of allKeys) {
            const type = await client.type(key);
            let value;
            if (type === 'string') {
                value = await client.get(key);
            } else if (type === 'hash') {
                value = await client.hGetAll(key);
            } else {
                value = '(unhandled type)';
            }
            allKeyDetails.push({ key, type, value });
        }

        await client.quit();

        return NextResponse.json({
            message: '✅ Redis Test Completed!',
            helloValue,
            allKeys,
            patternResults,
            allKeyDetails
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: err.message },
            { status: 500 }
        );
    }
}
