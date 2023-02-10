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
            window.editor.canvas.on('selection:created', function (e) {
                console.log('Multiple objects selected: ', e.selected);
            });
            window.editor.canvas.on('selection:cleared', function (e) {
                // console.log(e)
                if (e.deselected) {
                    e.deselected.forEach((val) => {
                        console.log(val.left)
                    })
                }
            });

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
