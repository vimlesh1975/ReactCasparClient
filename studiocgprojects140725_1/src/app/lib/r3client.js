import { R3SpaceEngine } from 'wtv-r3-space-engine'

let r3 = null

export async function getR3Client() {
    if (!r3) {
        const host = process.env.R3_HOST || 'localhost'
        const port = parseInt(process.env.R3_PORT || '9010', 10)

        r3 = new R3SpaceEngine(host, port)
        await r3.connect()
        r3.setDebug(true)


        // const sceneObj = await r3.loadScene(project, scene)
        // sceneObj.takeOnline()

    }
    return r3
}
