import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import ContextMenu from './ContextMenu'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useState } from "react";
import { fabric } from "fabric";
import { Uploaddropedfile, createTextBoxforDragedText } from "./DrawingController";

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
const allelements = ['Line', 'Circle', 'Triangle', 'Ellipse', 'Rect', 'Polygon', 'Group', 'Textbox', 'Image', 'Path'];

function handleDrop(e, canvas) {
    e.preventDefault();
    console.log(e)
    if (e.dataTransfer.getData("Text")) {
        // console.log(e.dataTransfer.getData("Text"));
        createTextBoxforDragedText(canvas, e.dataTransfer.getData("Text"), e.offsetX, e.offsetY)
    }
    if (e.dataTransfer.items) {
        [...e.dataTransfer.items].forEach((item, i) => {
            if (item.kind === 'file') {
                const file = item.getAsFile();
                Uploaddropedfile(file, canvas)
            }
        });
    } else {
        [...e.dataTransfer.files].forEach((file, i) => {
            console.log(file);
        });
    }
}

const Drawing = ({ canvasOutput, moveElement, sendToBack, bringToFront }) => {
    const { editor, onReady } = useFabricJSEditor();
    const dispatch = useDispatch();

    const [dlgText, setDlgText] = useState('');
    const [styleDlg, setStyleDlg] = useState({ display: 'none' })
    // const zoom = useSelector(state => state.canvaszoomReducer.zoom);


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
    const extendproperty = () => {
        allelements.forEach((val) => {
            if (fabric[val].prototype) {
                fabric[val].prototype._toSVG = (function (_toSVG) {
                    return function () {
                        var svg = _toSVG.call(this);
                        if (val === 'Textbox') {
                            if (this.textAlign) {
                                svg.splice(1, 0, `<extraproperty textAlign="${this.textAlign}" width="${this.width}" originalFontSize="${this.fontSize}"></extraproperty>\n`);
                            }
                            if (this.class) {
                                svg.splice(3, 0, 'class="' + this.class + '" ');
                            }
                        }
                        else {
                            if (this.class) {
                                svg.splice(2, 0, 'class="' + this.class + '" ');
                            }
                        }
                        return svg;
                    }
                })(fabric[val].prototype._toSVG);
            }
        })
    }
    const removeExtendproperty = () => {
        allelements.forEach((val) => {
            if (fabric[val].prototype) {
                fabric[val].prototype._toSVG = (function (_toSVG) {
                    return function () {
                        var svg = _toSVG.call(this);
                        if (val === 'Textbox') {
                            if (this.textAlign) {
                                svg.splice(1, 1);
                            }
                            if (this.class) {
                                svg.splice(2, 1);
                            }
                        }
                        else {
                            if (this.class) {
                                svg.splice(2, 1);
                            }
                        }
                        return svg;
                    }
                })(fabric[val].prototype._toSVG);
            }
        })
    }

    useEffect(() => {
        setTimeout(() => {
            window.editor.canvas.extraProps = ['id', 'selectable', 'class']
            fabric.SHARED_ATTRIBUTES.push('class');
            extendproperty();

            setZoomAndPan(window.editor.canvas);
            window.editor.canvas.preserveObjectStacking = true;
            xyz(window.editor.canvas);
            ddd(window.editor.canvas);

        }, 3000);
        return () => {
            cancelZoomAndPan(window.editor.canvas);
            removeExtendproperty()
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        dispatch({ type: 'CHANGE_CANVAS', payload: editor?.canvas });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editor])


    const ddd = (canvas) => {
        canvas.on('mouse:over', e => {
            if (e.target) {
                setStyleDlg({ left: (e.target.left) * 0.533 - 100, top: (e.target.top) * 0.533 });
                setDlgText(e.target.id);
                setTimeout(() => {
                    setStyleDlg({ display: 'none' })
                }, 2000);
            }
        });
        canvas.on('mouse:out', e => {
            if (e.target) {
                setStyleDlg({ display: 'none' })
            }
        });
        canvas.on('mouse:move', e => {
            if (e.target) {
                setStyleDlg({ left: (e.target.left) * 0.533 - 100, top: (e.target.top) * 0.533 });
            }
        });
        canvas.on('drop', (e) => handleDrop(e.e, canvas), false);
    }

    return (<div>
        <FabricJSCanvas className={canvasOutput ? 'canvasOutput' : 'canvas'} onReady={onReady} />
        {/* <div style={{ zoom: zoom }}> <svg width={1920 * 0.533} height={1080 * 0.533}> <rect x='100' y='100' width="800" height="400" style={{ fill: 'transparent', stroke: "red", strokeWidth: 2 }} /></svg></div> */}
        <ContextMenu canvas={editor?.canvas} moveElement={moveElement} sendToBack={sendToBack} bringToFront={bringToFront} />
        {<span style={{ backgroundColor: 'black', fontSize: 18, fontWeight: 'bold', padding: '0px 5px 6px 5px', position: 'absolute', color: 'white', ...styleDlg }}>{dlgText}</span>}
    </div>);
};
export default Drawing;
