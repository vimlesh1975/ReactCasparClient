import Draggable, { DraggableCore } from 'react-draggable'; // Both at the same time
import { Resizable, ResizableBox } from 'react-resizable';
import React, { useState } from 'react';
import { endpoint } from './common'



const Video = (props) => {
    const [videoWidth, setVideoWidth] = useState(1024);
    const [videoHeight, setVideoHeight] = useState(576);

    const onResize = (event, { element, size }) => {
        setVideoWidth(size.width);
        setVideoHeight(size.height)
        endpoint(`mixer 1-1 fill 0 0 ${videoWidth / 1024} ${videoHeight / 576}`)

        // this.setState({ width: size.width, height: size.height });
    };
    const ddd = (e, data) => {
        endpoint(`mixer 1-1 fill ${data.x / 1024} ${data.y / 576} ${videoWidth / 1024} ${videoHeight / 576}`)
    }

    return (<>
        {/* <Draggable onDrag={ddd}> */}
        <Resizable className="box" width={videoWidth} height={videoHeight} onResize={onResize} resizer='All'>
            <div className="box" style={{ backgroundColor: 'red', width: videoWidth, height: videoHeight }} >
                <video id='video' width={videoWidth} height={videoHeight} style={{ objectFit: 'fill' }}>
                    <source src={props.video} type="video/mp4" />
                </video>
            </div>
        </Resizable>
        {/* </Draggable> */}
    </>)
}

export default Video
