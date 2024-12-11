import React, { useEffect, useState, useRef } from 'react';
import { Audio, Sequence, AbsoluteFill, Img, useCurrentFrame, interpolate } from 'remotion';
import pg1 from './png/pg1.png';
import pg2 from './png/pg2.png';
import pg3 from './png/pg3.png';
import pg4 from './png/pg4.png';
import pg5 from './png/pg5.png';
import pg6 from './png/pg6.png';
import pg7 from './png/pg7.png';
import pg8 from './png/pg8.png';
import pg9 from './png/pg9.png';
import pg10 from './png/pg10.png';
import aa from './aa.mp3';
import background from './png/background.png'; // Static background image
import background2 from './png/BG2.gif'; // Static background image

import { Gif } from "@remotion/gif";


import { continueRender, delayRender } from "remotion";


// import { z } from "zod";

// export const myCompSchema = z.object({
//   durationPerImage: z.number(),
//   transitionDuration: z.number(),
// });

const images = [pg1, pg2, pg3, pg4, pg5, pg6, pg7, pg8, pg9, pg10];

export const MyComposition = ({ durationPerImage, transitionDuration }) => {

  const [handle] = useState(() => delayRender());
  const ref = useRef(null);

  useEffect(() => {
    continueRender(handle);
  }, [])



  // const durationPerImage = 100; // Frames per image (4 seconds at 25 FPS)
  // const transitionDuration = 5; // Frames for the slide animation

  return (
    <AbsoluteFill>
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

      <Gif
        ref={ref}
        src={background2}
        width={1920}
        height={1080}
        fit="cover"
        playbackRate={1}
      />

      {/* Render the audio */}
      <Audio src={aa} volume={0.05} />

      {/* Sequence images with slide effect */}
      {images.map((image, index) => {
        return (
          <Sequence
            key={index}
            from={25 + (index * durationPerImage)}
            durationInFrames={durationPerImage}
          >
            <SlidingImage
              src={image}
              durationPerImage={durationPerImage}
              transitionDuration={transitionDuration}
            />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

// Component for the slide effect
const SlidingImage = ({ src, durationPerImage, transitionDuration }) => {
  const frame = useCurrentFrame();

  // Calculate the horizontal position based on the frame
  const translateX = interpolate(
    frame,
    [0, transitionDuration, durationPerImage - transitionDuration, durationPerImage],
    [1920, 0, 0, -1920], // Slide in from right, stay, then slide out to left
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <Img
      src={src}
      style={{
        width: '100%',
        height: '100%',
        transform: `translateX(${translateX}px)`,
      }}
    />
  );
};
