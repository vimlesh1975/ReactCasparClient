import React, { useState } from 'react';
import { endpoint } from './common';
import { Rnd } from 'react-rnd';

const Video = (props) => {
    const [videoWidth, setVideoWidth] = useState(1024);
    const [videoHeight, setVideoHeight] = useState(576);
    const [videoX, setVideoX] = useState(0);
    const [videoY, setVideoY] = useState(0);

    return (<>
        <Rnd
            size={{ width: videoWidth, height: videoHeight }}
            position={{ x: videoX, y: videoY }}
            enableResizing={{ right: true, bottom: true }}
            onDrag={(e, d) => {
                setVideoX(d.x);
                setVideoY(d.y)
                endpoint(`mixer 1-1 fill ${d.x / 1024} ${d.y / 576} ${videoWidth / 1024} ${videoHeight / 576}`)
            }}
            onResize={(e, direction, ref, delta, position) => {

                setVideoWidth(parseInt(ref.style.width));
                setVideoHeight(parseInt(ref.style.height));
                endpoint(`mixer 1-1 fill ${videoX / 1024} ${videoY / 576} ${parseInt(ref.style.width) / 1024} ${parseInt(ref.style.height) / 576}`)
            }}
        >
            <div>
                <div className="box" style={{ width: videoWidth, height: videoHeight, backgroundColor: 'white' }} >
                    <video id='video' width={videoWidth} height={videoHeight} style={{ objectFit: 'fill' }} controls>
                        <source src={props.video} type="video/mp4" />
                    </video>
                </div>
            </div>
        </Rnd>
    </>)
}

export default Video
