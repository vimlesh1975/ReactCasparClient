import React, { useState, useEffect, useCallback } from 'react'
import { addressmysql } from '../common'
import { Audio, Sequence, AbsoluteFill, Img, useCurrentFrame, interpolate, Video } from 'remotion';
import aa from './aa.mp3';
import video from './png/TOP10.mp4'; // Static background image
import audio2 from './png/videoplayback.m4a'; // Static background image

import { continueRender, delayRender } from "remotion";

const Top10ddnews = ({ durationPerImage, transitionDuration }) => {
    const [slugs, setSlugs] = useState([]);
    const [handle] = useState(() => delayRender());

    const fetchRO = useCallback(async () => {
        try {
            const res = await fetch(
                addressmysql() + `/show_runorder?param1=${'C1_2108_1900'}`
            );
            const data = await res.json();
            setSlugs(data.slice(0, 10)); // Take only the first 10 elements
            continueRender(handle);
        } catch (error) {
            // console.error('Error fetching data:', error);
        }
    }, []);

    useEffect(() => {
        fetchRO()
    }, [])

    const Top5news = () => {
        return (
            <>
                <Sequence
                    key={10}
                    from={60 + ((10) * (durationPerImage + 60) + 25)}
                    durationInFrames={durationPerImage}
                >
                    <SlidingImage2
                        slug={slugs}
                        index={0}
                        durationPerImage={durationPerImage - 30}
                        transitionDuration={transitionDuration}
                    />
                </Sequence>
                <Sequence
                    key={10 + 1}
                    from={60 + ((10 + 1) * (durationPerImage + 60) - 20)}
                    durationInFrames={durationPerImage}
                >
                    <SlidingImage2
                        slug={slugs}
                        index={5}
                        durationPerImage={durationPerImage + 30}
                        transitionDuration={transitionDuration}
                    />
                </Sequence>
            </>);

    }

    const SlidingImage2 = ({ slug, index, durationPerImage, transitionDuration }) => {
        const frame = useCurrentFrame();

        // Calculate the horizontal position based on the frame
        const translateX = interpolate(
            frame,
            [0, transitionDuration, durationPerImage - transitionDuration, durationPerImage],
            [1920, 0, 0, -1920], // Slide in from right, stay, then slide out to left
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );

        return (
            <div style={{ transform: `translateX(${translateX}px)`, fontWeight: 'bold', }}>
                <div style={{ fontSize: 70, position: 'absolute', top: 200, left: 250, textAlign: 'left', width: 1920 }}>{slug[index]?.SlugName}</div>
                <div style={{ fontSize: 70, position: 'absolute', top: 340, left: 250, textAlign: 'left', width: 1920 }}>{slug[index + 1]?.SlugName}</div>
                <div style={{ fontSize: 70, position: 'absolute', top: 480, left: 250, textAlign: 'left', width: 1920 }}>{slug[index + 2]?.SlugName}</div>
                <div style={{ fontSize: 70, position: 'absolute', top: 620, left: 250, textAlign: 'left', width: 1920 }}>{slug[index + 3]?.SlugName}</div>
                <div style={{ fontSize: 70, position: 'absolute', top: 760, left: 250, textAlign: 'left', width: 1920 }}>{slug[index + 4]?.SlugName}</div>
            </div >
        );
    };



    return (
        <AbsoluteFill>
            <AbsoluteFill>
                <Video src={video} />
            </AbsoluteFill>

            {/* Render the audio */}
            <Audio src={audio2} volume={0.1} />
            {/* <Sequence from={3624}>
                <Audio src={aa} volume={0.1} />
            </Sequence> */}
            {/* Sequence images with slide effect */}
            {slugs.map((slug, index) => {
                return (
                    <Sequence
                        key={index}
                        from={60 + (index * (durationPerImage + 60))}
                        durationInFrames={durationPerImage}
                    >
                        <SlidingImage
                            slug={slug}
                            index={index}
                            durationPerImage={durationPerImage}
                            transitionDuration={transitionDuration}
                        />
                    </Sequence>
                );
            })}

            {/* // two more Sequence */}
            <Top5news />

        </AbsoluteFill>
    )
}

// Component for the slide effect
const SlidingImage = ({ slug, index, durationPerImage, transitionDuration }) => {
    const frame = useCurrentFrame();

    // Calculate the horizontal position based on the frame
    const translateX = interpolate(
        frame,
        [0, transitionDuration, durationPerImage - transitionDuration, durationPerImage],
        [1920, 0, 0, -1920], // Slide in from right, stay, then slide out to left
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );

    return (
        <div style={{ transform: `translateX(${translateX}px)`, fontWeight: 'bold', }}>
            <div style={{ fontSize: 70, position: 'absolute', top: 220, textAlign: 'center', width: 1920 }}>{slug.SlugName}</div>
            <div style={{ fontSize: 120, marginTop: 350, marginLeft: 160, maxWidth: 1600, maxHeight: 476, overflow: 'hidden' }}>{slug.Script}</div>
        </div>
    );
};



export default Top10ddnews