import React from 'react'
// import { fabric } from 'fabric'
import { useSelector } from 'react-redux'
import { endpoint, templateLayers } from './common'
import { v4 as uuidv4 } from 'uuid';
// dispatch({ type:'CHANGE_CANVAS',payload:${'canvas'}});
const Help = () => {
  const canvas = useSelector(state => state.canvasReducer.canvas);
  // const layers = useSelector(state => state.canvasReducer.canvas?.getObjects());

  const test = () => {
    endpoint(`play 1-108 [html] http://localhost:3000/ReactCasparClient/drawing2`)
    endpoint(`call 1-108 "
    const circle =new fabric.Rect({
     width: ${canvas.item(0).width},
     height: ${canvas.item(0).height},
     left: ${canvas.item(0).left},
     top: ${canvas.item(0).top},
     fill:'yellow',
     stroke:'${canvas.item(0).stroke}',
     strokeWidth:${canvas.item(0).strokeWidth},
     rx:${canvas.item(0).rx},
     ry:${canvas.item(0).ry},

    });
    window.editor.canvas.add(circle);
    window.editor.canvas.requestRenderAll();
    console.log(window.editor.canvas.item.length)
    "
    `)
  }

  return (<div>
    <h2>Help</h2>
    <div style={{ display: 'flex' }}>
      <div style={{ width: 600 }}>
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
      </div>
      <div>
        <h2>Doesn't work</h2>
        <ol>
          <li>Erase will work on Images from local pc only</li>
          <li>Images from local pc will be slow </li>
          <li>Emoji is not supported in server2.07 and 2.1 </li>
          <li>Image from local pc method only will get filters. </li>
          <li>Dont use double space in folder or file name. </li>
        </ol>
      </div>
    </div>
    <div>
      <table border='1'><tbody>
        <tr><th>LayerName</th><th>Layer</th></tr>
        {Object.keys(templateLayers).map((val, i) => <tr key={uuidv4()}><td>{val}</td><td>{Object.values(templateLayers)[i]}</td></tr>)}
      </tbody></table>
    </div>
    <button style={{ display: 'none1' }} onClick={test}>Test</button>
  </div>)
}

export default Help




