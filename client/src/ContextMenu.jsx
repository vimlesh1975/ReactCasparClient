import useContextMenu from './useContextMenu'
import {  gradientStroke, gradientFill, removeShadow, removeFill, removeStroke, createText, createRect, createCircle, createTriangle, bringToFront, sendToBack, undo, redo, lock, unlockAll, groupObjects, copy, paste, alignLeft, alignRight, alignCenter, textUnderline, textLineThrough, textItalic, txtBold, textNormal, removeBg } from './DrawingController'
import { VscPrimitiveSquare, VscCircleFilled, VscTriangleUp, VscEdit, VscLock, VscUnlock } from "react-icons/vsc";
import { AiOutlineRedo, AiOutlineUndo } from "react-icons/ai";
import { startPath } from './PathModifier';
const ContextMenu = ({ canvas }) => {
  const { xPos, yPos, showMenu } = useContextMenu();
  window.showMenu = showMenu;
  return (<div>
    {showMenu ? (<div className='rightClickMenu' style={{ position: 'absolute', left: xPos, top: yPos, color: 'white' }}>
      <ul>
        <li onClick={startPath}>Start Path</li>
        <li onClick={window.closePath}>Close Path</li>
        <li onClick={window.edit}>Edit Path</li>
        <li onClick={() => bringToFront(canvas)}>Bring To Front</li>
        <li onClick={() => sendToBack(canvas)}>Send To Back</li>
        <li onClick={() => lock(canvas)}>Lock <VscLock /></li>
        <li onClick={() => unlockAll(canvas)}>Unlock All <VscUnlock /></li>
        <li onClick={() => groupObjects(canvas, true)}>Group Selected</li>
        <li onClick={() => groupObjects(canvas, false)}>UnGroup Selected</li>
        <li>Add<ul >
          <li onClick={() => createText(canvas)}>Text T</li>
          <li onClick={() => createRect(canvas)}>Rectangle <VscPrimitiveSquare /></li>
          <li onClick={() => createCircle(canvas)}>Circle <VscCircleFilled /></li>
          <li onClick={() => createTriangle(canvas)}>Triangle <VscTriangleUp /></li>
        </ul></li>
        <li>Text Align<ul >
          <li onClick={() => alignLeft(canvas)}>Left</li>
          <li onClick={() => alignRight(canvas)}>Right</li>
          <li onClick={() => alignCenter(canvas)}>Center</li>
        </ul></li>
        <li>Text Decoration<ul >
          <li onClick={() => textUnderline(canvas)}>Underline Toggle</li>
          <li onClick={() => textLineThrough(canvas)}>LineThrough Toggle</li>
          <li onClick={() => textItalic(canvas)}>Itallic</li>
          <li onClick={() => txtBold(canvas)}>Bold</li>
          <li onClick={() => textNormal(canvas)}>Normal</li>
        </ul></li>
        <li>Remove<ul >
          <li onClick={() => removeFill(canvas)}> Fill</li>
          <li onClick={() => removeBg(canvas)}> BG</li>
          <li onClick={() => removeStroke(canvas)}> Stroke</li>
          <li onClick={() => removeShadow(canvas)}> shadow</li>
        </ul></li>

        <li>Set Gradient<ul >
          <li onClick={() => gradientFill(canvas)}> Fill</li>
          <li onClick={() => gradientStroke(canvas)}> Stroke</li>
        </ul></li>

        <li onClick={() => redo(canvas)}>Redo <AiOutlineRedo /></li>
        <li onClick={() => undo(canvas)}>Undo <AiOutlineUndo /></li>
        <li onClick={() => copy(canvas)}>Copy</li>
        <li onClick={() => paste(canvas)}>Paste</li>
        <li>Drawing Mode<ul >
          <li onClick={() => window.toggleModeDrawing(canvas)}>Off<VscEdit /></li>
          <li onClick={() => {
            canvas.isDrawingMode = true;
            window.onDrawingModeChange('Pencil', canvas)
          }}>Pencil <VscEdit /></li>
          <li onClick={() => {
            canvas.isDrawingMode = true;
            window.onDrawingModeChange('Spray', canvas)
          }}>Spray <VscEdit /></li>
          <li onClick={() => {
            canvas.isDrawingMode = true;
            window.onDrawingModeChange('Erase', canvas)
          }}>Erase <VscEdit /></li>
        </ul></li>
      </ul>
    </div>) : ''}
  </div>);
};

export default ContextMenu