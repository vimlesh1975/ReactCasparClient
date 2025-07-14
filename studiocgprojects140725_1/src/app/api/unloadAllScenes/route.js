import { getR3Client } from '../../lib/r3client.js'

export async function POST(req) {
    const r3 = await getR3Client();
    await r3.unloadAllScenes();
    return new Response(JSON.stringify({ status: "All scenes unloaded" }), { status: 200 })
}
