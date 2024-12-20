import React, { useState, useEffect, useCallback } from 'react'
// import { addressmysql } from '../common'
import { Audio, Sequence, AbsoluteFill, Img, useCurrentFrame, interpolate } from 'remotion';
import aa from './aa.mp3';
import background from './png/background2.png'; // Static background image
import { continueRender, delayRender } from "remotion";

const NrcsScripts = ({ durationPerImage, transitionDuration }) => {
    const [slugs, setSlugs] = useState([]);
    const [handle] = useState(() => delayRender());

    const fetchRO = useCallback(async () => {
        // console.log('first')
        // console.log(addressmysql())
        try {
            const res = await fetch(
          `https://localhost:9000/show_runorderremotion?param1=${'C1_2108_1900'}`
            );
            const data = await res.json();
            setSlugs(data);
            continueRender(handle);
        } catch (error) {
            // console.error('Error fetching data:', error);
        }
    }, []);

    useEffect(() => {
        fetchRO()
    }, [])

    return (
        <AbsoluteFill>
            <div style={{ fontSize: 100, marginTop: 950, backgroundColor: 'white', maxWidth: 350 }}>TOP 10</div>
            {/* Static background image */}
            <Img
                src={background}
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    zIndex: -1, // Place it behind all other elements
                }}
            />

            {/* Render the audio */}
            <Audio src={aa} volume={0.05} />

            {/* Sequence images with slide effect */}
            {slugs.map((slug, index) => {
                return (
                    <Sequence
                        key={index}
                        from={25 + (index * durationPerImage)}
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
        <div style={{ transform: `translateX(${translateX}px)`, }}>
            <AbsoluteFill  >
                <svg width="500" height="500" xmlns="http://www.w3.org/2000/svg" >
                    <circle cx="200" cy="200" r="100" fill="#1faabd" stroke="white" strokeWidth="3" />
                </svg>

            </AbsoluteFill>
            <div style={{ fontSize: 100, position: 'absolute', top: 140, left: 125, width: 1920, maxWidth: 150, textAlign: 'center', }}>{index}</div>
            <div style={{ fontSize: 60, position: 'absolute', top: 50, textAlign: 'center', width: 1920 }}>{slug.SlugName}</div>
            <div style={{ fontSize: 50, marginTop: 190, marginLeft: 350, maxWidth: 1250, maxHeight: 600, overflow: 'hidden' }}>{slug.Script}</div>
        </div>
    );
};


export default NrcsScripts