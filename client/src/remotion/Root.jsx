import React from 'react';
import { Composition } from 'remotion';
import { MyComposition, myCompSchema } from './MyComposition';
// const durationPerImage = 100;
// const transitionDuration = 5;

export const RemotionRoot = () => {
  const durationPerImage = 100;
  const transitionDuration = 5;
  return (
    <>
      <Composition
        id="video"
        component={MyComposition}
        durationInFrames={durationPerImage * 10}
        fps={25}
        schema={myCompSchema}
        width={1920}
        height={1080}
        defaultProps={{ durationPerImage, transitionDuration }}
      />
    </>
  );
};