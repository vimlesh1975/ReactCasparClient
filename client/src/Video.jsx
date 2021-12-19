import React, { useState } from 'react';
import { endpoint } from './common';
import { Rnd } from 'react-rnd';


const Video = ({ video, layerNumber }) => {
    const [videoWidth, setVideoWidth] = useState(450);
    const [videoHeight, setVideoHeight] = useState(15);
    const [videoX, setVideoX] = useState(0);
    const [videoY, setVideoY] = useState(0);
    const [operateOnline, setOperateOnline] = useState(false);

    return (<>
        <Rnd
            size={{ width: videoWidth, height: videoHeight }}
            position={{ x: videoX, y: videoY }}
            enableResizing={{ right: true, bottom: true }}
            onDrag={(e, d) => {
                setVideoX(d.x);
                setVideoY(d.y);
                if (operateOnline) { endpoint(`mixer ${window.chNumber}-${layerNumber} fill ${d.x / 1024} ${d.y / 576} ${videoWidth / 1024} ${videoHeight / 576}`) };
            }}
            onResize={(e, direction, ref, delta, position) => {
                setVideoWidth(parseInt(ref.style.width));
                setVideoHeight(parseInt(ref.style.height));
                if (operateOnline) { endpoint(`mixer ${window.chNumber}-${layerNumber} fill ${videoX / 1024} ${videoY / 576} ${parseInt(ref.style.width) / 1024} ${parseInt(ref.style.height) / 576}`) };

            }}
        >
            <div>
                <div className="box" style={{ width: videoWidth, height: videoHeight, backgroundColor: 'white' }} >
                    <video id={`video${layerNumber}`} width={videoWidth} height={videoHeight} style={{ objectFit: 'fill' }} controls muted>
                        <source src={video} type="video/mp4" />
                    </video>
                    <div style={{ backgroundColor: 'white' }}>
                        <b style={{ display: 'inline' }}>{layerNumber}</b>
                        <label htmlFor={`vehicle${layerNumber}`}> Operate Online</label>
                        <input id={`vehicle${layerNumber}`} type="checkbox" value={operateOnline} onChange={e => setOperateOnline(val => !val)} />
                        <button onClick={() => {
                            setVideoWidth(1024);
                            setVideoHeight(576);
                            setVideoX(0);
                            setVideoY(0);
                            if (operateOnline) {
                                endpoint(`mixer ${window.chNumber}-${layerNumber} fill 0 0 1 1`);
                            };

                        }}>Make Full Screen</button>
                        <button onClick={() => {
                            setVideoWidth(450);
                            setVideoHeight(15);
                            setVideoX(0);
                            setVideoY(0);
                            if (operateOnline) {
                                endpoint(`mixer ${window.chNumber}-${layerNumber} fill 0 0 1 1`);
                            };

                        }}>Make Very Samall</button>
                    </div>
                </div>
            </div>
        </Rnd>
    </>)
}

export default Video
