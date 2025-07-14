import { getR3Client } from '../../lib/r3client.js'

export async function POST(req) {
    const { command } = await req.json()

    const r3 = await getR3Client()

    const aa = await r3.sendCommand(command)
    // console.log(aa)

    return new Response(JSON.stringify({ responce: aa }))
}
