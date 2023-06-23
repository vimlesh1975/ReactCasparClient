import React, { useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import flvjs from "flv.js";
var flvPlayer;
const VideoPlayer = ({ sourceUrl }) => {
  const videoRef = useRef(null);
  const [streamingUrl, setStreamingUrl] = useState(sourceUrl);

  const preview = () => {
    const videoElement = videoRef.current;
    videojs(videoElement, {
      html5: {
        hls: {
          overrideNative: true,
        },
      },
    });

    flvPlayer = flvjs.createPlayer({
      type: "flv",
      url: streamingUrl,
    });

    flvPlayer.attachMediaElement(videoElement);
    flvPlayer.load();
    flvPlayer.play();
  };

  return (
    <>
      <div>
        <video
          ref={videoRef}
          className="video-js vjs-default-skin"
          width={500}
        />
      </div>
      <strong>Url:</strong>
      <input
        value={streamingUrl}
        type="text"
        style={{ width: 450 }}
        onChange={(e) => setStreamingUrl(e.target.value)}
      />
      <button onClick={preview}>Preview</button>
    </>
  );
};

export default VideoPlayer;
