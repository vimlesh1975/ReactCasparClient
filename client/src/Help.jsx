import React from "react";
// import { fabric } from 'fabric'
// import { useSelector } from 'react-redux'
import { templateLayers } from "./common";
import { v4 as uuidv4 } from "uuid";

import Streaming from "./streaming/Streaming";

// dispatch({ type:'CHANGE_CANVAS',payload:${'canvas'}});
const Help = () => {
  // const canvas = useSelector(state => state.canvasReducer.canvas);
  // const layers = useSelector(state => state.canvasReducer.canvas?.getObjects());

  return (
    <>
      <div style={{ display: "flex" }}>
        <div style={{ width: 600 }}>
          <ol>
            <li>Github Client will not connect to casparcg</li>
            <li>It works with all version of Server</li>
            <li>
              {" "}
              Put as below in casparcg.config file and drag screen consumer
              below Designer window &lt;screen&gt;
              &lt;always-on-top&gt;true&lt;/always-on-top&gt;
              &lt;x&gt;0&lt;/x&gt; &lt;y&gt;680&lt;/y&gt;
              &lt;width&gt;690&lt;/width&gt; &lt;height&gt;325&lt;/height&gt;
              &lt;/screen&gt;
            </li>

            <li>Select Casparcg Screen Sizes from drop down</li>
            <li>
              Add some text or rectangle by clicking on buttons and then click
              Show to Casparcg
            </li>

            <li>There is right click menu also for drawing mode. </li>

            <li>
              <a
                href="https://github.com/vimlesh1975/ReactCasparClient"
                target="_blank"
                rel="noreferrer"
              >
                Github Page
              </a>{" "}
            </li>
            <li>
              <a
                href="https://vimlesh1975.github.io/ReactCasparClient/"
                target="_blank"
                rel="noreferrer"
              >
                Github Online Client
              </a>{" "}
            </li>

            <li>
              <a
                href="https://casparcgforum.org/t/react-caspar-client"
                target="_blank"
                rel="noreferrer"
              >
                Casparcg Forum Topic
              </a>{" "}
            </li>
            <li>
              <a href="https://bit.ly/3jRrhDL" target="_blank" rel="noreferrer">
                Latest Build
              </a>{" "}
            </li>
            <li>
              <a
                href="https://www.youtube.com/playlist?list=PLeBXICFOkFQu0OC7vJRew471ape0mp1sR"
                target="_blank"
                rel="noreferrer"
              >
                YouTube videos for How to use different Modules
              </a>{" "}
            </li>

            <li>Erase will work on Images from local pc only</li>
            <li>Emoji is not supported in server2.07 and 2.1 </li>
            <li>Image from local pc method only will get filters. </li>
            <li>Dont use double space in folder or file name. </li>
          </ol>
          <div>
            <Streaming />
          </div>
        </div>
        <div>
          <table border="1">
            <tbody>
              <tr>
                <th>LayerName</th>
                <th>Layer</th>
              </tr>
              {Object.keys(templateLayers).map((val, i) => (
                <tr key={uuidv4()}>
                  <td>{val}</td>
                  <td>{Object.values(templateLayers)[i]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Help;
