import React, { useRef, useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import flvjs from "flv.js";
var flvPlayer;
const VideoPlayer = ({ sourceUrl }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    let player;

    const setupPlayer = () => {
      const videoElement = videoRef.current;
      player = videojs(videoElement, {
        html5: {
          hls: {
            overrideNative: true,
          },
        },
      });

      flvPlayer = flvjs.createPlayer({
        type: "flv",
        url: sourceUrl,
      });

      //   player.src({
      //     src: sourceUrl,
      //     type: "video/flv",
      //   });

      flvPlayer.attachMediaElement(videoElement);
      //   flvPlayer.load();
      //   flvPlayer.play();
    };

    setupPlayer();

    return () => {
      if (player) {
        player.dispose();
      }
    };
  }, [sourceUrl]);

  const preview = () => {
    flvPlayer.load();
    flvPlayer.play();
  };

  return (
    <>
      <button onClick={preview}>Preview</button>
      <div>
        <video
          ref={videoRef}
          className="video-js vjs-default-skin"
          width={500}
        />
      </div>
    </>
  );
};

export default VideoPlayer;
