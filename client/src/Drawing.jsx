import { useSelector } from 'react-redux'
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import ContextMenu from './ContextMenu'
const Drawing = ({ canvasOutput }) => {
  const { editor, onReady } = useFabricJSEditor();
  const state1 = useSelector(state => state.canvas1Reducer.aa)
  const canvasFromJson = (canvas) => {
    var state2 = state1.replace(new RegExp(String.fromCharCode(2), "g"), '"').replace(new RegExp(String.fromCharCode(3), "g"), ' ').replace(new RegExp(String.fromCharCode(4), "g"), '/').replace(new RegExp(String.fromCharCode(5), "g"), '%')
    const data = (JSON.parse(state2));
    canvas.loadFromJSON(data);
    canvas.requestRenderAll();
  };


  window.ReadToCasparcgfromStore = () => canvasFromJson(editor.canvas)
  window.canvasFromJson = canvasFromJson
  window.editor = editor;
  return (<div>
    <FabricJSCanvas className={canvasOutput ? 'canvasOutput' : 'canvas'} onReady={onReady} />
    <ContextMenu editor={editor} />
  </div>);
};
export default Drawing;
