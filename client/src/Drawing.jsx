import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import ContextMenu from './ContextMenu'
import { useEffect } from 'react';
const Drawing = ({ canvasOutput }) => {
    const { editor, onReady } = useFabricJSEditor();
   
    window.editor = editor;
    function cancesetZoomAndPan(canvas) {
        canvas.on('mouse:wheel', null);
        canvas.on('mouse:down', null);
        canvas.on('mouse:move', null);
        canvas.on('mouse:up', null);
    }

    function setZoomAndPan(canvas) {
        canvas.on('mouse:wheel', function (opt) {
            var delta = opt.e.deltaY;
            var zoom = canvas.getZoom();
            zoom *= 0.999 ** delta;
            if (zoom > 20) zoom = 20;
            if (zoom < 0.01) zoom = 0.01;
            // canvas.setZoom(zoom);
            canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
            opt.e.preventDefault();
            opt.e.stopPropagation();
        })

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
            setZoomAndPan(window.editor.canvas);
        }, 2000);
        return () => {
            cancesetZoomAndPan(window.editor.canvas)
        }
    }, [])

    return (<div>
        <FabricJSCanvas className={canvasOutput ? 'canvasOutput' : 'canvas'} onReady={onReady} />
        <ContextMenu editor={editor} />
    </div>);
};
export default Drawing;
