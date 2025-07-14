import { getR3Client } from '../../lib/r3client.js'

export async function POST(req) {
    const { project, scene, updates } = await req.json()

    const r3 = await getR3Client();
    const sceneObj = await r3.loadScene(project, scene);

    if (!sceneObj) {
        return new Response(JSON.stringify({ error: "Scene not loaded" }), { status: 404 })
    }

    for (const { name, value } of updates) {
        await sceneObj.setExport(name, value)
    }

    return new Response(JSON.stringify({ status: "Exports updated", updated: updates }))
}
