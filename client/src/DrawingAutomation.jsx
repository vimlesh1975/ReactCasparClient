import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { useEffect } from 'react'

window.automationeditor = [];

const DrawingAutomation = ({ i = 0 }) => {
  const { editor, onReady } = useFabricJSEditor();

  window.automationeditor[i] = editor;

  useEffect(() => {
    setTimeout(() => {
      // window.automationeditor[0].canvas.setZoom(0.3)
      window.automationeditor[0].canvas.setZoom(0.16)
    }, 100);

    return () => {
      // cleanup
    }
    //eslint-disable-next-line
  }, [])

  return (<div>
    <FabricJSCanvas className='automationcanvas' onReady={onReady} />
  </div>);
};
export default DrawingAutomation;
