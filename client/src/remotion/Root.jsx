import React from 'react';
import { Composition } from 'remotion';
import { MyComposition } from './MyComposition';
import NrcsScripts from './NrcsScripts';


const durationPerImage = 100;
const transitionDuration = 10;
export const RemotionRoot = () => {

  return (
    <>
      <Composition
        id="Top10"
        component={MyComposition}
        durationInFrames={25 + durationPerImage * 10 + 25}
        fps={25}
        width={1920}
        height={1080}
        defaultProps={{ durationPerImage, transitionDuration }}
      />

      <Composition
        id="NrcsScripts"
        component={NrcsScripts}
        durationInFrames={25 + durationPerImage * 35 + 25}
        fps={25}
        width={1920}
        height={1080}
        defaultProps={{ durationPerImage, transitionDuration }}

      />

    </>
  );
};