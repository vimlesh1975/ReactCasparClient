import useContextMenu from './useContextMenu'
import { cloneAsImage, gradient, removeShadow, removeFill, removeStroke, createTextBox, createRect, createCircle, createTriangle, undo, redo, lock, unlockAll, groupObjects, copy, paste, alignLeft, alignRight, alignCenter, textUnderline, textLineThrough, textItalic, txtBold, textNormal, removeBg, addImage, pasteClipboard } from './DrawingController'
import { VscPrimitiveSquare, VscCircleFilled, VscTriangleUp, VscEdit, VscLock, VscUnlock } from "react-icons/vsc";
import { AiOutlineRedo, AiOutlineUndo } from "react-icons/ai";
import { startPath } from './PathModifier';
import { useState } from 'react';

const ContextMenu = ({ canvas, sendToBack, bringToFront }) => {
  const { xPos, yPos, showMenu } = useContextMenu();
  const [currentGradient, setcurrentGradient] = useState(gradient)

  const getgradientFill = canvas => {
    if (canvas.getActiveObjects()[0]) {
      setcurrentGradient(canvas.getActiveObjects()[0].fill)
    }
  }
  const getgradientStroke = canvas => {
    if (canvas.getActiveObjects()[0]) {
      setcurrentGradient(canvas.getActiveObjects()[0].stroke)
    }
  }
  const gradientFill = canvas => {
    canvas.getActiveObjects().forEach(element => { element.set('fill', currentGradient) });
    canvas.requestRenderAll();
  }
  const gradientStroke = canvas => {
    canvas.getActiveObjects().forEach(element => { element.set('stroke', currentGradient) });
    canvas.requestRenderAll();
  }

  // const addImage = (canvas) => {
  //   var fInput = document.createElement("input"); //hidden input to open filedialog
  //   fInput.setAttribute("type", "file"); //opens files
  //   fInput.setAttribute("accept", "image/*"); ////only useful for inspector debugging
  //   fInput.setAttribute("multiple", true); ////only useful for inspector debugging

  //   fInput.click();
  //   fInput.onchange = (e) => {
  //     Upload(e, canvas)
  //   }
  // }

  window.showMenu = showMenu;
  return (<div>
    {showMenu ? (<div className='rightClickMenu' style={{ position: 'absolute', left: xPos, top: yPos, color: 'white' }}>
      <ul>
        <li>Add<ul >
          <li onClick={() => addImage(canvas)}>Image</li>
          <li onClick={() => createRect(canvas)}>Rectangle <VscPrimitiveSquare /></li>
          <li onClick={() => createTextBox(canvas)}>Text T</li>
          <li onClick={() => createCircle(canvas)}>Circle <VscCircleFilled /></li>
          <li onClick={() => createTriangle(canvas)}>Triangle <VscTriangleUp /></li>
        </ul></li>
        <li onClick={startPath}>Start Path</li>
        <li onClick={window.closePath}>Close Path</li>
        <li onClick={window.edit}>Edit Path</li>
        <li onClick={() => bringToFront(canvas)}>Bring To Front</li>
        <li onClick={() => sendToBack(canvas)}>Send To Back</li>
        <li onClick={() => lock(canvas)}>Lock <VscLock /></li>
        <li onClick={() => unlockAll(canvas)}>Unlock All <VscUnlock /></li>
        <li onClick={() => groupObjects(canvas, true)}>Group Selected</li>
        <li onClick={() => groupObjects(canvas, false)}>UnGroup Selected</li>

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
        <li>Get Gradient<ul >
          <li onClick={() => getgradientFill(canvas)}> Fill</li>
          <li onClick={() => getgradientStroke(canvas)}> Stroke</li>
        </ul></li>
        <li>Set Gradient<ul >
          <li onClick={() => gradientFill(canvas)}> Fill</li>
          <li onClick={() => gradientStroke(canvas)}> Stroke</li>
        </ul></li>

        <li onClick={() => redo(canvas)}>Redo <AiOutlineRedo /></li>
        <li onClick={() => undo(canvas)}>Undo <AiOutlineUndo /></li>
        <li onClick={() => copy(canvas)}>Copy</li>
        <li onClick={() => paste(canvas)}>Paste</li>
        <li onClick={() => pasteClipboard(canvas)}>Paste from Clipboard</li>
        <li onClick={() => cloneAsImage(canvas)}>CloneAsImage</li>
        <li>Drawing Mode<ul >
          <li onClick={() => window.onDrawingModeChange('none', canvas)}>Off<VscEdit /></li>
          <li onClick={() => {
            window.onDrawingModeChange('Pencil', canvas)
          }}>Pencil <VscEdit /></li>
          <li onClick={() => {
            window.onDrawingModeChange('Spray', canvas)
          }}>Spray <VscEdit /></li>
          <li onClick={() => {
            window.onDrawingModeChange('Erase', canvas)
          }}>Erase <VscEdit /></li>
        </ul></li>
      </ul>
    </div>) : ''}
  </div>);
};

export default ContextMenu