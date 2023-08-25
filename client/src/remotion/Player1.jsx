import { Player } from "@remotion/player";
import MyComposition from "./Composition";

export const Player1 = () => {
  return (<div>
    <Player
      component={MyComposition}
      durationInFrames={120}
      compositionWidth={1920}
      compositionHeight={1080}
      fps={25}
      // controls
      loop
      autoPlay
    />
  </div>


  );
};