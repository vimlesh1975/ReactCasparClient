import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'


const DrawingforTheatrejs = () => {
    const { editor, onReady } = useFabricJSEditor();
    const dispatch = useDispatch();

    window.dispatch = dispatch;
    window.editor = editor;

    useEffect(() => {
        setTimeout(() => {
            window.editor.canvas.preserveObjectStacking = true;
        }, 3000);
        return () => {

        }
        // eslint-disable-next-line
    }, [])



    useEffect(() => {
        dispatch({ type: 'CHANGE_CANVAS', payload: editor?.canvas })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editor])

    return (<div>
        <FabricJSCanvas className={'DrawingforTheatrejs'} onReady={onReady} />
        {/* <ContextMenu canvas={editor?.canvas} /> */}
    </div>);
};
export default DrawingforTheatrejs;
