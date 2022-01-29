import React from 'react'
// import { fabric } from 'fabric'
import { useSelector } from 'react-redux'
import { endpoint, templateLayers } from './common'


const Help = () => {
  const canvas = useSelector(state => state.canvasReducer.canvas);



  const test = () => {
    endpoint(`play 1-1 [html] http://localhost:3000/ReactCasparClient/drawing`)
    endpoint(`call 1-1 "

    // const circle = new fabric.Circle({
    //   top: 200,
    //   left: 0,
    //   radius: 50,
    //   fill: 'rgb(80, 3, 124)',
    //   cornerSize: 7,
    //   objectCaching: false,
    //   hasRotatingPoint: true,
    //   strokeWidth: 3,
    //   strokeUniform: true,
    // });
   const circle='${canvas}';
    window.editor.canvas.add(circle);
    window.editor.canvas.requestRenderAll();
    \\circle.animate('left', 150, { onChange: window.editor.canvas.renderAll.bind(window.editor.canvas) });
    "
    `)
  }

  return (
    <div>
      <h2>Help</h2>
      <ol>
        <li>It works with all version of Server</li>
        <li> Put as below in casparcg.config file and drag screen consumer below Designer window
          &lt;screen&gt;
          &lt;always-on-top&gt;true&lt;/always-on-top&gt;
          &lt;x&gt;0&lt;/x&gt;
          &lt;y&gt;680&lt;/y&gt;
          &lt;width&gt;690&lt;/width&gt;
          &lt;height&gt;325&lt;/height&gt;

          &lt;/screen&gt;
        </li>

        <li>Select Casparcg Screen Sizes from drop down</li>
        <li>Add some text or rectangle by clicking on buttons and then click Show to Casparcg</li>

        <li>There is right click menu also for drawing mode. </li>


        <li><a href='https://github.com/vimlesh1975/ReactCasparClient' target='_blank' rel="noreferrer">Github Page</a> </li>
        <li><a href='https://vimlesh1975.github.io/ReactCasparClient/' target='_blank' rel="noreferrer">Github Online Client</a> </li>

        <li><a href='https://casparcgforum.org/t/react-caspar-client' target='_blank' rel="noreferrer">Casparcg Forum Topic</a> </li>
        <li><a href='https://bit.ly/3jRrhDL' target='_blank' rel="noreferrer">Latest Build</a> </li>

        <li>test</li>

      </ol>
      <h2>Doesn't work</h2>
      <ol>
        <li>Erase will not work on Images </li>
        <li>Erase will work on Images from local pc </li>
        <li>Images from local pc will be slow </li>
        <li>Emoji is not supported in server2.07 and 2.1 </li>
        <li>Image from local pc method only will get filters. </li>
        <li>Dont use double space in folder or file name. </li>
      </ol>
      <table border='1'><tbody>
        <tr><th>LayerName</th><th>Layer</th></tr>
        {Object.keys(templateLayers).map((val, i) => <tr><td>{val}</td><td>{Object.values(templateLayers)[i]}</td></tr>)}
      </tbody></table>

      <button onClick={test}>Test</button>
    </div>
  )
}

export default Help




