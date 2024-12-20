import React, { useState, useEffect, useCallback } from 'react'
import { addressmysql } from '../common'
import { Audio, Sequence, AbsoluteFill, Img, useCurrentFrame, interpolate, Video } from 'remotion';
import video from './png/TOP10.mp4'; // Static background image

import audio2 from './png/videoplayback.m4a'; // Static background image

import { continueRender, delayRender } from "remotion";
import ScaledText2 from './ScaledText2';
import ScaledMultilineText from './ScaledMultilineText';

const Top10ddnews = ({ durationPerImage, transitionDuration }) => {
    const [slugs, setSlugs] = useState([]);
    const [handle] = useState(() => delayRender());

    const fetchRO = useCallback(async () => {
        try {
            const res = await fetch(
                `https://localhost:9000/show_runorderremotion?param1=${'express 100'}`

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
            [1920, 0, 0, 1920], // Slide in from right, stay, then slide out to left
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );

        return (
            <div style={{ transform: `translateX(${translateX}px)`, fontWeight: 'bold', }}>
                {[...Array(5)].map((val, i) => {
                    return (
                        <div style={{ fontSize: 70, position: 'absolute', top: (i * 140 + 200), left: 250, }}>
                            <ScaledText2
                                text={slug[index + i] && slug[index + i]?.SlugName}
                                // text={slug[index + i] && slug[index + i]?.SlugName + slug[index + i]?.SlugName + slug[index + i]?.SlugName }
                                containerWidth={1400}
                                alignment="left"
                            />
                        </div>
                    )
                })}
            </div >
        );
    };



    return (
        <AbsoluteFill>
            <AbsoluteFill>
                <Video src={video} />
            </AbsoluteFill>

            {/* Render the audio */}
            <Audio src={audio2} volume={1} />

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
        [1920, 0, 0, 1920], // Slide in from right, stay, then slide out to left
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );

    return (
        <div style={{ transform: `translateX(${translateX}px)`, fontWeight: 'bold', }}>
            <div style={{ fontSize: 85, position: 'absolute', top: 214, left: 230 }}>
                <ScaledText2
                    // text={slug.SlugName + slug.SlugName + slug.SlugName}
                    text={slug.SlugName}
                    containerWidth={1500}
                    alignment="center"
                />
            </div>

            {/* <div style={{ fontSize: 120, position: 'absolute', top: 350, left: 110, maxWidth: 1700, width: 1800, maxHeight: 476, overflow: 'hidden', textAlign: 'center' }}>{slug.Script}</div> */}

            <div style={{ position: 'absolute', top: 350, left: 130, }}>
                <ScaledMultilineText
                    // text={slug.Script + slug.Script }
                    // text={'पोलंडमध्ये पंतप्रधानांनी मॉन्टे कॅसिनो इथल्या युद्धस्मारकाला देखील दिली भेट'} 
                    text={slug.Script}
                    containerWidth={1650}
                    containerHeight={480}
                    alignment="center"
                />
            </div>
        </div>
    );
};



export default Top10ddnews