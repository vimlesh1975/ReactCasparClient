import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

window.thumbnaileditor = [];

const DrawingThumbnail = ({ i = 0 }) => {
  const { editor, onReady } = useFabricJSEditor();
  const canvasList = useSelector(state => state.canvasListReducer.canvasList);
  const recallPage = (json, canvas) => {
    canvas.loadFromJSON(json, () => {
      const aa = canvas.getObjects();
      aa.forEach(element => {
        try {
          element.set({ selectable: false,strokeUniform: false })
        } catch (error) {
          alert(error);
          return;
        }
      });
      canvas.setZoom(0.3)
      canvas.requestRenderAll();
    });
  }

  window.thumbnaileditor[i] = editor;

  useEffect(() => {
    setTimeout(() => {
      recallPage(canvasList[i].pageValue, window.thumbnaileditor[i].canvas)
    }, 100);

    return () => {
      // cleanup
    }
    // eslint-disable-next-line
  }, [canvasList])

  return (<div>
    <FabricJSCanvas className='thumbnailcanvas' onReady={onReady} />
  </div>);
};
export default DrawingThumbnail;
