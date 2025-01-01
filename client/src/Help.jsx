import React from "react";
// import { fabric } from 'fabric'
// import { useSelector } from 'react-redux'
import { templateLayers } from "./common";
import { v4 as uuidv4 } from "uuid";


// dispatch({ type:'CHANGE_CANVAS',payload:${'canvas'}});
const Help = () => {
  // const canvas = useSelector(state => state.canvasReducer.canvas);
  // const layers = useSelector(state => state.canvasReducer.canvas?.getObjects());

  return (
    <>
      <div style={{ display: "flex" }}>
        <div style={{ width: 600 }}>
          <h3>How to setup</h3>
          <ol>
            <li>Unzip with 7z</li>
            <li>Right Click and Run As Administrator the file in root folder  Right_Click_Run_As_Administrator.bat</li>
            <li>Double click the file in root folder  Start_Both.bat</li>
            <li>Use server <a href="https://drive.google.com/file/d/1V1LZWQmss2O4gqG5wVSHLuW2J9Y8SDoj/view?usp=drive_link">Server dated 23.11.23</a></li>



          </ol>
          <ol>
            <li>Github Client will not connect to casparcg</li>
            <li>This works on every version of casparcg. But All features will work only on 2.3</li>
            <li>
              {" "}
              Put as below in casparcg.config file and drag screen consumer
              below Designer window &lt;screen&gt;
              &lt;always-on-top&gt;true&lt;/always-on-top&gt;
              &lt;x&gt;332&lt;/x&gt; &lt;y&gt;680&lt;/y&gt;
              &lt;width&gt;690&lt;/width&gt; &lt;height&gt;325&lt;/height&gt;
              &lt;/screen&gt;
            </li>

            <li>Select Casparcg Screen Sizes from drop down from top left</li>
            <li>
              Add some text or rectangle by clicking on Elements buttons and then click
              Show to Casparcg
            </li>

            <li>There is right click menu also for drawing mode. </li>

            <li>
              <a
                href="https://github.com/vimlesh1975/ReactCasparClient"
                target="_blank"
                rel="noreferrer"
              >
                Github Page for Source Code
              </a>
            </li>
            <li>
              <a
                href="https://vimlesh1975.github.io/ReactCasparClient/"
                target="_blank"
                rel="noreferrer"
              >
                Github Online Client
              </a>
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
            <li>
              <a
                href="https://bit.ly/3PCcHP6"
                target="_blank"
                rel="noreferrer"
              >
                Special Applications with scroll, clock and breaking news and many games bases on templates made from this client.
              </a>
            </li>
            <li>
              <a
                href="http://bit.ly/2z5xXae"
                target="_blank"
                rel="noreferrer"
              >
                Popular Desktop Application for CasparcgCg
              </a>
            </li>
            <li>Emoji is not supported in server2.07 and 2.1 </li>
            <li>Dont use double space in folder or file name. </li>
          </ol>

        </div>
        <div style={{ maxHeight: 800, width: 320, display: 'none1', overflow: 'auto' }}>
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
