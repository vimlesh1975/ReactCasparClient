import React, { useState } from "react";
import { endpoint, streamingAddress } from "../common";
import VideoPlayer from "./VideoPlayer ";

const Streaming = () => {
  const [streamingUrl, setStreamingUrl] = useState(
    "add 1 stream rtmp://" + window.location.host.split(':')[0] + "/live/STREAM_NAME -codec:v libx264 -codec:a aac -strict -2  -b:a 128k -x264opts:v keyint=45 -ar:a 48000 -tune:v zerolatency -preset:v ultrafast -b:v 1500k -minrate:v 1500k -maxrate:v 1500k -bufsize:v 1500k -filter:v format=pix_fmts=yuv420p,scale=400:300 -filter:a pan=stereo|c0=c0|c1=c1 -format flv"
  );

  const starRtmpStreaming = () => {
    endpoint(streamingUrl);
  };

  return (
    <div>
      <div>
        <button onClick={starRtmpStreaming}>
          Start rtmp Streaming from Casparcg{" "}
        </button>{" "}
        <strong>Command:</strong>
      </div>
      <textarea
        value={streamingUrl}
        type="text"
        style={{ width: 550, height: 80 }}
        onChange={(e) => setStreamingUrl(e.target.value)}
        multiple={true}
      />

      <VideoPlayer sourceUrl={streamingAddress() + "/live/STREAM_NAME.flv"} />
    </div>
  );
};

export default Streaming;
