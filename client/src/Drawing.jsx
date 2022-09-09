import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import ContextMenu from './ContextMenu'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { useState } from "react";

export const mousedownandmousemoveevent = (canvas) => {
    canvas.on('mouse:down', function (opt) {
        var evt = opt.e;
        if (evt.altKey === true) {
            this.isDragging = true;
            this.selection = false;
            this.lastPosX = evt.clientX;
            this.lastPosY = evt.clientY;
        }
    });
    canvas.on('mouse:move', function (opt) {
        if (this.isDragging) {
            var e = opt.e;
            var vpt = this.viewportTransform;
            vpt[4] += e.clientX - this.lastPosX;
            vpt[5] += e.clientY - this.lastPosY;
            this.requestRenderAll();
            this.lastPosX = e.clientX;
            this.lastPosY = e.clientY;
        }
    });
}

const Drawing = ({ canvasOutput, moveElement, sendToBack, bringToFront }) => {
    const { editor, onReady } = useFabricJSEditor();
    const dispatch = useDispatch();

    const [dlgText, setDlgText] = useState('');
    const [styleDlg, setStyleDlg] = useState({ top: -20, left: 20 })

    window.editor = editor;
    function cancelZoomAndPan(canvas) {
        canvas.on('mouse:wheel', null);
        canvas.on('mouse:down', null);
        canvas.on('mouse:move', null);
        canvas.on('mouse:up', null);
    }
    function xyz(canvas) {
        canvas.on({
            'selection:updated': window.getvalues,
            'selection:created': window.getvalues,
            'object:modified': window.getvalues,
            // 'object:moving': window.getvalues,
            'object:scaling': window.getvalues,
            'object:rotating': window.getvalues,
            // 'object:skewing': window.getvalues,
            'object:resizing': window.getvalues
        });
    }

    function setZoomAndPan(canvas) {
        canvas.on('mouse:wheel', function (opt) {
            var delta = opt.e.deltaY;
            var zoom = canvas.getZoom();
            zoom *= 0.999 ** delta;
            if (zoom > 20) zoom = 20;
            if (zoom < 0.01) zoom = 0.01;

            dispatch({ type: 'CHANGE_CANVAS_ZOOM', payload: zoom })

            canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
            opt.e.preventDefault();
            opt.e.stopPropagation();
        })

        mousedownandmousemoveevent(canvas);

        canvas.on('mouse:up', function (opt) {
            // on mouse up we want to recalculate new interaction
            // for all objects, so we call setViewportTransform
            this.setViewportTransform(this.viewportTransform);
            this.isDragging = false;
            this.selection = true;
        });
    }

    useEffect(() => {
        setTimeout(() => {
            window.editor.canvas.extraProps = ['id', 'selectable']
            setZoomAndPan(window.editor.canvas);
            window.editor.canvas.preserveObjectStacking = true;
            xyz(window.editor.canvas);
            ddd(window.editor.canvas);

        }, 2000);
        return () => {
            cancelZoomAndPan(window.editor.canvas)
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        dispatch({ type: 'CHANGE_CANVAS', payload: editor?.canvas })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editor])


    const ddd = (canvas) => {
        canvas.on('mouse:over', e => {
            if (e.target) {
                setStyleDlg({ left: (e.target.left) * 0.533 - 50, top: (e.target.top) * 0.533 - 70 });
                setDlgText(e.target.id);
            }
        });
        canvas.on('mouse:out', e => {
            if (e.target) {
                setDlgText('');
            }
        });
        canvas.on('mouse:move', e => {
            if (e.target) {
                setStyleDlg({ left: (e.target.left) * 0.533 - 50, top: (e.target.top) * 0.533 - 70 });
            }
        });
    }

    return (<div>
        <FabricJSCanvas className={canvasOutput ? 'canvasOutput' : 'canvas'} onReady={onReady} />
        <ContextMenu canvas={editor?.canvas} moveElement={moveElement} sendToBack={sendToBack} bringToFront={bringToFront} />
        {<div style={{ position: 'absolute', color: 'white', ...styleDlg }}><h2>{dlgText}</h2></div>}
    </div>);
};
export default Drawing;
