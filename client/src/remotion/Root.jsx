import React from 'react';
import { Composition } from 'remotion';
import { MyComposition } from './MyComposition';
import NrcsScripts from './NrcsScripts';
import Top10ddnews from './Top10ddnews';




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
      {/* {
      comming 60
      stating 337
      stay 337-60=277
      gap 60

      
      } */}
      <Composition
        id="Top10ddnews"
        component={Top10ddnews}
        durationInFrames={3922}
        fps={25}
        width={1920}
        height={1080}
        defaultProps={{ durationPerImage: 277, transitionDuration }}
      />
    </>
  );
};