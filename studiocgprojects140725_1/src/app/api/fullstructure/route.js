

import { NextResponse } from 'next/server'
import { getR3Client } from '../../lib/r3client.js'
import fs from 'fs'
import path from 'path'

export async function GET() {
  const r3 = await getR3Client()
  const projects = await r3.getProjects()
  const projectData = []

  for (const project of projects) {
    const scenes = await r3.getScenes(project)
    const sceneData = scenes.map((sceneFullName) => {
      const cleanName = sceneFullName.includes('/')
        ? sceneFullName.split('/')[1]
        : sceneFullName

      // Try reading the thumbnail
      let thumbnail = null
      try {
        const filePath = path.join(
          process.env.R3_PATH || 'C:/Users/Administrator/Documents/R3.Space.Projects/projects',
          project,
          cleanName,
          'thumb.png'
        )
        const fileData = fs.readFileSync(filePath)
        thumbnail = `data:image/png;base64,${fileData.toString('base64')}`
      } catch (err) {
        // No thumb.png or error reading — ignore
        thumbnail = null
      }

      return {
        name: cleanName,
        thumbnail
      }
    })

    projectData.push({
      name: project,
      scenes: sceneData
    })
  }

  return NextResponse.json({ projectData })
}
