import useContextMenu from './useContextMenu'
import { createText, createRect, createCircle, createTriangle, deleteItem, bringToFront, sendToBack, undo, redo, lock, unlockAll, toggleMode, groupObjects, savetoCasparcgStore, copy, paste, alignLeft, alignRight, alignCenter, textUnderline, textLineThrough, textItalic, txtBold, textNormal, removeBg, addImage, setGradientColor } from './DrawingController'
const ContextMenu = ({ editor }) => {
  const { xPos, yPos, showMenu } = useContextMenu();
  return (<>
    {showMenu ? (<div className='rightClickMenu' style={{ position: 'absolute', left: xPos, top: yPos, color: 'white' }}>
      <ul  >

        <li onClick={() => savetoCasparcgStore(editor.canvas)}>Show to Casparcg</li>

        <li onClick={() => deleteItem(editor.canvas)}>Delete</li>

        <li onClick={() => bringToFront(editor.canvas)}>Bring To Front</li>
        <li onClick={() => sendToBack(editor.canvas)}>Send To Back</li>

        <li onClick={() => lock(editor.canvas)}>Lock</li>
        <li onClick={() => unlockAll(editor.canvas)}>Unlock All</li>

        <li onClick={() => groupObjects(editor.canvas, true)}>Group All</li>
        <li onClick={() => groupObjects(editor.canvas, false)}>Un Group All</li>

        <li>Add<ul >
          <li onClick={() => createText(editor.canvas)}>Text</li>
          <li onClick={() => createRect(editor.canvas)}>Rectangle</li>
          <li onClick={() => createCircle(editor.canvas)}>Circle</li>
          <li onClick={() => createTriangle(editor.canvas)}>Triangle</li>
          <li onClick={() => addImage()}>Image</li>
        </ul></li>
        <li>Text Align<ul >
          <li onClick={() => alignLeft(editor.canvas)}>Left</li>
          <li onClick={() => alignRight(editor.canvas)}>Right</li>
          <li onClick={() => alignCenter(editor.canvas)}>Center</li>
        </ul></li>

        <li>Text Decoration<ul >
          <li onClick={() => textUnderline(editor.canvas)}>Underline</li>
          <li onClick={() => textLineThrough(editor.canvas)}>LineThrough</li>
          <li onClick={() => textItalic(editor.canvas)}>Itallic</li>
          <li onClick={() => txtBold(editor.canvas)}>Bold</li>
          <li onClick={() => textNormal(editor.canvas)}>Normal</li>
          <li onClick={() => removeBg(editor.canvas)}>Remove BG</li>
          <li onClick={() => setGradientColor(editor.canvas)}>setGradientColor</li>



        </ul></li>


        <li onClick={() => redo(editor.canvas)}>Redo</li>
        <li onClick={() => undo(editor.canvas)}>Undo</li>

        <li onClick={() => copy()}>Copy</li>
        <li onClick={() => paste()}>Paste</li>

        <li onClick={() => toggleMode("drawing", editor.canvas)}>Toggle Drawing Mode</li>



      </ul>
    </div>) : ''}
  </>);
};

export default ContextMenu