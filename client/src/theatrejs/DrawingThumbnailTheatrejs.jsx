import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { rgbaObjectToHex } from '../common'

window.thumbnaileditor = [];




const DrawingThumbnailTheatrejs = ({ i = 0 }) => {
  const { editor, onReady } = useFabricJSEditor();
  const canvasList = useSelector(state => state.canvasListReducer.canvasList);
  const recallPage = (json, canvas) => {
    canvas.loadFromJSON(json, () => {
      const aa = canvas.getObjects();
      aa.forEach(element => {
        try {
          // strokeWidth:element.strokeWidth/3 has been put so that zoom will make again multiply by 3
          element.set({ selectable: false, strokeUniform: true, strokeWidth: element.strokeWidth / 3 });
          console.log(element.fill.r)
          if (element.fill.r) {
            element.set({ fill: rgbaObjectToHex(element.fill) });
          }

        } catch (error) {
          // alert(error);
          return;
        }
      });
      canvas.setZoom(0.16)
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
export default DrawingThumbnailTheatrejs;
