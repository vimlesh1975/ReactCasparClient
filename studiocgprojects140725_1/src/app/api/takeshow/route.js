import { NextResponse } from 'next/server';

export async function POST(req) {
    const body = await req.json();
    console.log("🔗 Request Body:", body);
    const url = `http://localhost:9900/api/graphics/mos/rundown/load/${body.showId}`;

    try {
        const token = 'your-valid-auth-token'; // replace with actual token

        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({}),
        });

        const data = await res.json();

        console.log("✅ Layers Data:", data);

        return NextResponse.json(data);
    } catch (err) {
        console.error("❌ Error fetching layers:", err.message);
        return NextResponse.json(
            { error: err.message },
            { status: 500 }
        );
    }
}
