import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { useEffect } from 'react'
import { rgbaObjectToHex } from '../common'

window.thumbnaileditorNRCS = [];

const DrawingThumbnailNRCS = ({ i = 0, graphics }) => {
  const { editor, onReady } = useFabricJSEditor();
  const recallPage = (json, canvas) => {
    canvas.loadFromJSON(json).then(() => {
      const aa = canvas.getObjects();
      aa.forEach(element => {
        try {
          // strokeWidth:element.strokeWidth/3 has been put so that zoom will make again multiply by 3
          element.set({ selectable: false, strokeUniform: true, strokeWidth: element.strokeWidth / 3 });
          if (element.fill instanceof Object && typeof element.fill.r === 'number' && typeof element.fill.g === 'number' && typeof element.fill.b === 'number' && typeof element.fill.a === 'number') {
            element.set({ fill: rgbaObjectToHex(element.fill) });
          }
          if (typeof element.stroke === 'object' && element.stroke !== null && 'r' in element.stroke && 'g' in element.stroke && 'b' in element.stroke && 'a' in element.stroke) {
            element.set({ stroke: rgbaObjectToHex(element.stroke) })
          }
          if (typeof element.shadow.color === 'object' && element.shadow.color !== null && 'r' in element.shadow.color && 'g' in element.shadow.color && 'b' in element.shadow.color && 'a' in element.shadow.color) {
            element.set({ shadow: { ...element.shadow, color: rgbaObjectToHex(element.shadow.color) } })
          }
        } catch (error) {
          // alert(error);
          return;
        }
      });
      // canvas.setZoom(0.3)
      canvas.setZoom(0.16)
      canvas.requestRenderAll();
    });
  }

  window.thumbnaileditorNRCS[i] = editor;

  useEffect(() => {
    setTimeout(() => {
      recallPage(JSON.parse(graphics[i].Graphicstext1).pageValue, window.thumbnaileditorNRCS[i].canvas)
    }, 100);

    return () => {
      // cleanup
    }
    // eslint-disable-next-line
  }, [graphics])

  return (<div>
    <FabricJSCanvas className='thumbnailcanvas' onReady={onReady} />
  </div>);
};
export default DrawingThumbnailNRCS;
