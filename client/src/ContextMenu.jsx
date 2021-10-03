import useContextMenu from './useContextMenu'
import { gradientStroke, gradientFill, removeShadow, removeFill, removeStroke, createText, createRect, createCircle, createTriangle, deleteSelectedItem, deleteAll, bringToFront, sendToBack, undo, redo, lock, unlockAll, groupObjects, copy, paste, alignLeft, alignRight, alignCenter, textUnderline, textLineThrough, textItalic, txtBold, textNormal, removeBg,  setOpacity } from './DrawingController'
import { VscPrimitiveSquare, VscCircleFilled, VscTriangleUp, VscEdit, VscTrash, VscLock, VscUnlock } from "react-icons/vsc";
import { AiOutlineRedo, AiOutlineUndo } from "react-icons/ai";


const ContextMenu = ({ editor }) => {
  const { xPos, yPos, showMenu } = useContextMenu();
  window.showMenu = showMenu;
  return (<div>
    {showMenu ? (<div className='rightClickMenu' style={{ position: 'absolute', left: xPos, top: yPos, color: 'white' }}>
      <ul  >
        <li onClick={() => deleteSelectedItem(editor.canvas)}>Delete Selected <VscTrash />
          <ul>
            <li onClick={() => deleteAll(editor.canvas)}>Delete All</li>
          </ul>
        </li>
        <li>setOpacity
          <ul>
            <li onClick={() => setOpacity(editor.canvas, 0.1)}>0.1</li>
            <li onClick={() => setOpacity(editor.canvas, 0.2)}>0.2</li>
            <li onClick={() => setOpacity(editor.canvas, 0.3)}>0.3</li>
            <li onClick={() => setOpacity(editor.canvas, 0.4)}>0.4</li>
            <li onClick={() => setOpacity(editor.canvas, 0.5)}>0.5</li>
            <li onClick={() => setOpacity(editor.canvas, 0.6)}>0.6</li>
            <li onClick={() => setOpacity(editor.canvas, 0.7)}>0.7</li>
            <li onClick={() => setOpacity(editor.canvas, 0.8)}>0.8</li>
            <li onClick={() => setOpacity(editor.canvas, 0.9)}>0.9</li>
            <li onClick={() => setOpacity(editor.canvas, 1.0)}>1.0</li>

          </ul>
        </li>
        <li onClick={() => bringToFront(editor.canvas)}>Bring To Front</li>
        <li onClick={() => sendToBack(editor.canvas)}>Send To Back</li>
        <li onClick={() => lock(editor.canvas)}>Lock <VscLock /></li>
        <li onClick={() => unlockAll(editor.canvas)}>Unlock All <VscUnlock /></li>
        <li onClick={() => groupObjects(editor.canvas, true)}>Group Selected</li>
        <li onClick={() => groupObjects(editor.canvas, false)}>UnGroup Selected</li>
        <li>Add<ul >
          <li onClick={() => createText(editor.canvas)}>Text T</li>
          <li onClick={() => createRect(editor.canvas)}>Rectangle <VscPrimitiveSquare /></li>
          <li onClick={() => createCircle(editor.canvas)}>Circle <VscCircleFilled /></li>
          <li onClick={() => createTriangle(editor.canvas)}>Triangle <VscTriangleUp /></li>

        </ul></li>
        <li>Text Align<ul >
          <li onClick={() => alignLeft(editor.canvas)}>Left</li>
          <li onClick={() => alignRight(editor.canvas)}>Right</li>
          <li onClick={() => alignCenter(editor.canvas)}>Center</li>
        </ul></li>
        <li>Text Decoration<ul >
          <li onClick={() => textUnderline(editor.canvas)}>Underline Toggle</li>
          <li onClick={() => textLineThrough(editor.canvas)}>LineThrough Toggle</li>
          <li onClick={() => textItalic(editor.canvas)}>Itallic</li>
          <li onClick={() => txtBold(editor.canvas)}>Bold</li>
          <li onClick={() => textNormal(editor.canvas)}>Normal</li>
        </ul></li>
        <li>Remove<ul >
          <li onClick={() => removeFill(editor.canvas)}> Fill</li>
          <li onClick={() => removeBg(editor.canvas)}> BG</li>
          <li onClick={() => removeStroke(editor.canvas)}> Stroke</li>
          <li onClick={() => removeShadow(editor.canvas)}> shadow</li>
        </ul></li>

        <li>Set Gradient<ul >
          <li onClick={() => gradientFill(editor.canvas)}> Fill</li>
          <li onClick={() => gradientStroke(editor.canvas)}> Stroke</li>
        </ul></li>

        <li onClick={() => redo(editor.canvas)}>Redo <AiOutlineRedo /></li>
        <li onClick={() => undo(editor.canvas)}>Undo <AiOutlineUndo /></li>
        <li onClick={() => copy()}>Copy</li>
        <li onClick={() => paste()}>Paste</li>
        <li>Drawing Mode<ul >
          <li onClick={() => window.toggleModeDrawing(editor.canvas)}>Off<VscEdit /></li>
          <li onClick={() => {
            editor.canvas.isDrawingMode = true;
            window.onDrawingModeChange('Pencil', editor.canvas)
          }}>Pencil <VscEdit /></li>
          <li onClick={() => {
            editor.canvas.isDrawingMode = true;
            window.onDrawingModeChange('Spray', editor.canvas)
          }}>Spray <VscEdit /></li>
          <li onClick={() => {
            editor.canvas.isDrawingMode = true;
            window.onDrawingModeChange('Erase', editor.canvas)
          }}>Erase <VscEdit /></li>
        </ul></li>
      </ul>
    </div>) : ''}
  </div>);
};

export default ContextMenu