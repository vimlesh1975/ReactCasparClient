import React, { useRef, useEffect } from 'react'
import { useCurrentFrame, useVideoConfig } from 'remotion'
import * as fabric from 'fabric'

const MyComposition = () => {
    const frame = useCurrentFrame();
    const { fps, width, height, durationInFrames } = useVideoConfig()
    const canvasEl = useRef(null);

    useEffect(() => {
        const RCCpageData = localStorage.getItem('RCCpageData')

        const aa = new fabric.Canvas(canvasEl.current)
        aa.loadFromJSON(RCCpageData, () => {
            console.log(aa);
            aa.requestRenderAll()

        })


        return () => {
            // second
        }
    }, [])

    return (<>

        <div style={{ backgroundColor: `hsl(${frame}, 100%, 50%)`, position: 'absolute', left: frame, top: frame, width: 1920, height: 1080 }} >
            <h1>Vimlesh Kumar {frame} VideoConfig={fps}, {width},{height}, {durationInFrames} </h1>
            <canvas width={1920} height={1080} ref={canvasEl}></canvas>
        </div>

    </>)
}

export default MyComposition