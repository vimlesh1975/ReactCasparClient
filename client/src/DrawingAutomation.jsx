import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { useEffect } from 'react'

window.automationeditor = window.automationeditor || [];

const DrawingAutomation = ({ i = 0 }) => {
  const { editor, onReady } = useFabricJSEditor();

  window.automationeditor[i] = editor;

  useEffect(() => {
    setTimeout(() => {
      if (window.automationeditor?.[i]?.canvas) {
        window.automationeditor[i].canvas.setZoom(0.16);
      }
    }, 100);

    return () => {
      // cleanup
    }
    //eslint-disable-next-line
  }, [editor])

  return (<div>
    <FabricJSCanvas className='automationcanvas' onReady={onReady} />
  </div>);
};
export default DrawingAutomation;
