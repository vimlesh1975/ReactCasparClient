import { getR3Client } from '../../lib/r3client.js'

import fs from 'fs'

export async function POST(req) {
    const { project, scene } = await req.json()

    const r3 = await getR3Client();
    const sceneObj = await r3.getScene(project, scene, true);

    if (!sceneObj) {
        return new Response(JSON.stringify({ error: "Scene not found" }), { status: 404 })
    }

    const exportList = await sceneObj.getExports()
    const response = exportList.response.map(item => ({
        name: item.Name,
        type: item.Type,
        value: item.Value
    }))

    var animations = await sceneObj.getAnimations();
    // Convert string → array if necessary
    if (typeof animations === "string") {
        animations = animations
            .replace(/[\[\]]/g, '')            // remove [ and ]
            .split(',')
            .map(s => s.trim())                // trim each animation name
            .filter(s => s.length > 0);        // remove empty strings
    }

    return new Response(JSON.stringify({ status: "OK", exports: response, animations }))
}

