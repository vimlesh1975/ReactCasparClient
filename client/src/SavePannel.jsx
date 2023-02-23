import React, { useEffect, useState } from 'react'
import { FiFile } from "react-icons/fi";
import { FaSave } from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { VscTrash, VscMove } from "react-icons/vsc";
import { useSelector, useDispatch } from 'react-redux'
import DrawingThumbnail from './DrawingThumbnail'
import { FaPlay, FaStop } from "react-icons/fa";
import { endpoint, stopGraphics, updateGraphics, templateLayers, executeScript } from './common'
import { animation } from './animation.js'
import { fabric } from "fabric";

// import defaultCanvasList from './data/defaultCanvasList.txt'


var currentFile = 'new';
let fileReader;

const SavePannel = () => {
    const canvasList = useSelector(state => state.canvasListReducer.canvasList);
    const currentPage = useSelector(state => state.currentPageReducer.currentPage);
    const canvas = useSelector(state => state.canvasReducer.canvas);

    const jsfilename = useSelector(state => state.jsfilenameReducer.jsfilename);
    const cssfilename = useSelector(state => state.cssfilenameReducer.cssfilename);
    const jsfilename2 = useSelector(state => state.jsfilenameReducer2.jsfilename2);
    const cssfilename2 = useSelector(state => state.cssfilenameReducer2.cssfilename2);

    const [listView, setListView] = useState(true);
    const dispatch = useDispatch();
    const currentscreenSize = useSelector(state => state.currentscreenSizeReducer.currentscreenSize);


    const [currentFileName, setCurrentFileName] = useState()

    const startGraphics = (canvas, layerNumber) => {
        canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);

        var inAnimation;
        if (window.inAnimationMethod === 'mix') {
            inAnimation = `@keyframes example {from {opacity:0} to {opacity:1}} div {animation-name: example;  animation-duration: .5s; }`
        }

        else if (((animation.map(val => val.name)).findIndex(val => val === window.inAnimationMethod)) !== -1) {
            inAnimation = animation[((animation.map(val => val.name)).findIndex(val => val === window.inAnimationMethod))].value;
        }
        else if (window.inAnimationMethod === 'lefttoright') {
            inAnimation = ``
            // canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
            endpoint(`mixer ${window.chNumber}-${layerNumber} fill 0 0 0 1 6 ${window.animationMethod}`)

            setTimeout(() => {
                endpoint(`play ${window.chNumber}-${layerNumber} [HTML] xyz.html`);
            }, 250);
            const script = `
                            var aa = document.createElement('div');
                            aa.style.position='absolute';
                            aa.setAttribute('id','divid_' + '${layerNumber}');
                            aa.style.zIndex = ${layerNumber};
                            aa.innerHTML=\`${(canvas.toSVG()).replaceAll('"', '\\"')}\`;
                            document.body.appendChild(aa);
                            document.body.style.margin='0';
                            document.body.style.padding='0';
                            aa.style.zoom=(${currentscreenSize * 100}/1920)+'%';
                            document.body.style.overflow='hidden';
                            var style = document.createElement('style');
                            style.textContent = '${inAnimation}';
                            document.head.appendChild(style);
                        `
            executeScript(script);
            setTimeout(() => {
                endpoint(`call ${window.chNumber}-${layerNumber} "
        ${script}
            "`)
            }, 300);

            setTimeout(() => {
                endpoint(`mixer ${window.chNumber}-${layerNumber} fill 0 0 1 1 10 ${window.animationMethod}`)
            }, 800);
            setTimeout(() => {
                updateGraphics(canvas, layerNumber);
            }, 1100);
            return
        }

        endpoint(`play ${window.chNumber}-${layerNumber} [HTML] xyz.html`);
        const script = `
                    var bb = document.createElement('div');
                    bb.style.perspective='1920px';
                    bb.style.transformStyle='preserve-3d';
                    document.body.appendChild(bb);
                    var aa = document.createElement('div');
                    aa.style.position='absolute';
                    aa.setAttribute('id','divid_' + '${layerNumber}');
                    aa.style.zIndex = ${layerNumber};
                    aa.innerHTML=\`${(canvas.toSVG()).replaceAll('"', '\\"')}\`;
                    bb.appendChild(aa);
                    document.body.style.margin='0';
                    document.body.style.padding='0';
                    aa.style.zoom=(${currentscreenSize * 100}/1920)+'%';
                    document.body.style.overflow='hidden';
                    var style = document.createElement('style');
                    style.textContent = '${inAnimation}';
                    document.head.appendChild(style);
                `
        executeScript(script);

        setTimeout(() => {
            endpoint(`call ${window.chNumber}-${layerNumber} "
        ${script}
            "`)
        }, 100);
        setTimeout(() => {
            updateGraphics(canvas, layerNumber);
        }, 1200);

    }

    useEffect(() => {
        setTimeout(() => {
            if (window.location.origin !== 'https://vimlesh1975.github.io') {
                fetch(`${process.env.PUBLIC_URL}/data/defaultCanvasList.txt`)
                    .then((r) => r.text())
                    .then(text => {
                        var aa = text.split('\r\n');
                        aa.splice(-1);
                        var updatedcanvasList = [];
                        aa.forEach(element => {
                            var cc = JSON.parse(element);
                            updatedcanvasList.push(cc);
                        });
                        dispatch({ type: 'CHANGE_CANVAS_LIST', payload: updatedcanvasList })
                    })
            }
            else {
                fetch(`/ReactCasparClient/data/defaultCanvasList.txt`)
                    .then((r) => r.text())
                    .then(text => {
                        var aa = text.split('\n');
                        aa.splice(-1);
                        var updatedcanvasList = [];
                        aa.forEach(element => {
                            var cc = JSON.parse(element);
                            updatedcanvasList.push(cc);
                        });
                        dispatch({ type: 'CHANGE_CANVAS_LIST', payload: updatedcanvasList })
                    })
            }

        }, 2000);

        return () => {
            // cleanup
        }
        // eslint-disable-next-line
    }, [])

    const deletePage = e => {
        if (currentPage > e.target.getAttribute('key1')) {
            dispatch({ type: 'CHANGE_CURRENT_PAGE', payload: currentPage - 1 })
        }
        else if (currentPage === parseInt(e.target.getAttribute('key1'))) {
            dispatch({ type: 'CHANGE_CURRENT_PAGE', payload: null })
        }
        const updatedcanvasList = canvasList.filter((_, i) => {
            return (parseInt(e.target.getAttribute('key1')) !== i)
        });
        dispatch({ type: 'CHANGE_CANVAS_LIST', payload: [...updatedcanvasList] })
    }
    const updatePageName = e => {
        const updatedcanvasList = canvasList.map((val, i) => {
            return (i === parseInt(e.target.getAttribute('key1'))) ? { ...val, 'pageName': e.target.value } : val;
        });
        dispatch({ type: 'CHANGE_CANVAS_LIST', payload: [...updatedcanvasList] })

    }

    const recallPage = (json, canvas, i, jsfilename1, cssfilename1, jsfilename2, cssfilename2) => {
        dispatch({ type: 'CHANGE_CURRENT_PAGE', payload: i });

        dispatch({ type: 'CHANGE_JSFILENAME', payload: (jsfilename1 === undefined) ? 'main' : jsfilename1 });;
        dispatch({ type: 'CHANGE_CSSFILENAME', payload: (cssfilename1 === undefined) ? 'main' : cssfilename1 });

        dispatch({ type: 'CHANGE_JSFILENAME2', payload: (jsfilename2 === undefined) ? 'main2' : jsfilename2 });;
        dispatch({ type: 'CHANGE_CSSFILENAME2', payload: (cssfilename2 === undefined) ? 'main2' : cssfilename2 });

        canvas.loadFromJSON(json, function () {
            const aa = canvas.getObjects();
            aa.forEach(element => {
                try {
                    element.set({ id: element.id ? element.id : 'id_' + fabric.Object.__uid++, class: element.class ? element.class : 'class_' + fabric.Object.__uid++, objectCaching: false });
                    element.on('mousedblclick', () => {
                        window.edit();
                    })
                } catch (error) {
                    alert(error);
                    return;
                }
            });
            canvas.renderAll();
        });
    }

    const deleteAll = canvas => {
        const aa = canvas.getObjects()
        aa.forEach(element => { canvas.remove(element) });
        canvas.discardActiveObject();
        canvas.requestRenderAll();

    }
    // const handleFileRead2 = (e) => {
    //     const content = fileReader.result;
    //     var aa = content.split('\r\n')
    //     aa.splice(-1)
    //     var updatedcanvasList = [...canvasList]
    //     aa.forEach(element => {
    //         var cc = JSON.parse(element)
    //         updatedcanvasList.push(cc)
    //     });
    //     dispatch({ type: 'CHANGE_CANVAS_LIST', payload: [...updatedcanvasList] })
    // };
    const handleFileChosen2 = async (files) => {
        if (files) {
            var updatedcanvasList = [...canvasList]
            for (let file of files) {
                const content = await readFile(file)
                var aa = content.split('\r\n')
                aa.splice(-1)
                aa.forEach(element => {
                    var cc = JSON.parse(element)
                    updatedcanvasList.push(cc)
                });
            }
            dispatch({ type: 'CHANGE_CANVAS_LIST', payload: updatedcanvasList })
        }
    }
    const readFile = (file) => {
        return new Promise((resolve, reject) => {
            fileReader = new FileReader();
            fileReader.onloadend = () => {
                resolve(fileReader.result);
            }
            fileReader.readAsText(file);
        });
    }
    const drawingFileNew = () => {
        var updatedcanvasList = [];
        dispatch({ type: 'CHANGE_CANVAS_LIST', payload: [...updatedcanvasList] })
        setCurrentFileName('')
    }

    const updatePage = () => {
        const updatedcanvasList = canvasList.map((val, i) => {
            return (i === currentPage) ? { ...val, 'pageValue': canvas.toJSON(['id', 'selectable', 'class']), jsfilename: jsfilename, cssfilename: cssfilename, jsfilename2: jsfilename2, cssfilename2: cssfilename2 } : val;
        });
        dispatch({ type: 'CHANGE_CANVAS_LIST', payload: [...updatedcanvasList] })
    }

    async function drawingFileSaveAs() {
        const element = document.createElement("a");
        var aa = ''
        canvasList.forEach(val => {
            aa += JSON.stringify({ pageName: val.pageName, pageValue: val.pageValue, animation: val.animation, jsfilename: val.jsfilename, cssfilename: val.cssfilename, jsfilename2: jsfilename2, cssfilename2: cssfilename2 }) + '\r\n'
        });
        const file = new Blob([aa], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        var ss
        if (currentFile === 'new') {
            ss = new Date().toLocaleTimeString('en-US', { year: "numeric", month: "numeric", day: "numeric", hour12: false, hour: "numeric", minute: "numeric", second: "numeric" });
        } else {
            ss = currentFileName?.name;
        }
        const options = {
            suggestedName: ss,
            types: [{
                description: 'text file',
                accept: { 'text/plain': ['.txt'] },
            }],
        };
        const aa1 = await window.showSaveFilePicker(options);
        const writable = await aa1.createWritable();
        setCurrentFileName(aa1);
        await writable.write(file);
        await writable.close();

    }
    async function drawingFileSave() {
        updatePage(canvas);
        var aa = ''
        canvasList.forEach(val => {
            aa += JSON.stringify({ pageName: val.pageName, pageValue: val.pageValue, animation: val.animation, jsfilename: val.jsfilename, cssfilename: val.cssfilename, jsfilename2: val.jsfilename2, cssfilename2: val.cssfilename2 }) + '\r\n'
        });
        const file = new Blob([aa], { type: 'text/plain' });

        const writable = await currentFileName.createWritable();

        await writable.write(file);
        await writable.close();

    }

    const onDragEnd = (result) => {
        const aa = [...canvasList]
        if (result.destination != null) {
            aa.splice(result.destination?.index, 0, aa.splice(result.source?.index, 1)[0])
            dispatch({ type: 'CHANGE_CANVAS_LIST', payload: aa })
            if (currentPage === result.source?.index) {
                dispatch({ type: 'CHANGE_CURRENT_PAGE', payload: result.destination?.index })
            }
            else if ((currentPage >= result.destination?.index) && (currentPage < result.source?.index)) {
                dispatch({ type: 'CHANGE_CURRENT_PAGE', payload: currentPage + 1 })
            }
            else if ((currentPage <= result.destination?.index) && (currentPage > result.source?.index)) {
                dispatch({ type: 'CHANGE_CURRENT_PAGE', payload: currentPage - 1 })
            }
        }
    }

    async function importCanvaslist() {
        const [aa] = await window.showOpenFilePicker();
        setCurrentFileName(aa);
        currentFile = aa.name
        dispatch({ type: 'CHANGE_CURRENT_PAGE', payload: '' })
        console.log(aa)
        if (aa) {
            const file = await aa.getFile();
            const content = await file.text();
            var aa1 = content.split('\r\n')
            aa1.splice(-1)
            var updatedcanvasList = []
            aa1.forEach(element => {
                var cc = JSON.parse(element)
                updatedcanvasList.push(cc)
            });
            dispatch({ type: 'CHANGE_CANVAS_LIST', payload: [...updatedcanvasList] })
        }
    }

    return (
        <div >
            <div>
                <div className='drawingToolsRow' >
                    <b> Save: </b>
                    <button title="Will discard list" onClick={drawingFileNew}>File New <FiFile /></button>
                    <button title="Save as new name" onClick={drawingFileSaveAs}>File Save As<FaSave /></button>
                    {currentFileName && <button title="Overwrite" onClick={drawingFileSave}>File Save<FaSave /></button>}
                </div>

                <div className='drawingToolsRow' >
                    <button title="Will discard list and open list" onClick={importCanvaslist}>Open File</button>{currentFileName?.name}
                </div>
                <div className='drawingToolsRow' >
                    <span title="Will append list">Add File:</span>  <input
                        type='file'
                        id='file'
                        className='input-file'
                        accept='.txt'
                        multiple
                        onChange={e => handleFileChosen2(e.target.files)}
                    /><br />
                </div>
                <div className='drawingToolsRow' >

                    {canvasList.length}  <b> Pages: </b>
                    <button onClick={() => {
                        var ss = new Date().toLocaleTimeString('en-US', { year: "numeric", month: "numeric", day: "numeric", hour12: false, hour: "numeric", minute: "numeric", second: "numeric" });
                        var retVal = prompt("Enter  page name to save : ", ss + "_pageName");
                        if (retVal !== null) {
                            deleteAll(window.editor?.canvas);
                            dispatch({ type: 'CHANGE_CANVAS_LIST', payload: [...canvasList, { pageName: retVal, pageValue: `${JSON.stringify((window.editor?.canvas.toJSON(['id', 'selectable', 'class'])))}`, animation: '', jsfilename: jsfilename, cssfilename: cssfilename, jsfilename2: jsfilename2, cssfilename2: cssfilename2 }] })
                            dispatch({ type: 'CHANGE_CURRENT_PAGE', payload: canvasList.length })
                        }
                    }}
                    > Add Blank</button>
                    <button onClick={() => {
                        var ss = new Date().toLocaleTimeString('en-US', { year: "numeric", month: "numeric", day: "numeric", hour12: false, hour: "numeric", minute: "numeric", second: "numeric" });
                        var retVal = prompt("Enter  page name to save : ", ss + "_pageName");
                        if (retVal !== null) {
                            dispatch({ type: 'CHANGE_CANVAS_LIST', payload: [...canvasList, { pageName: retVal, pageValue: `${JSON.stringify((window.editor?.canvas.toJSON(['id', 'selectable', 'class'])))}`, animation: '', jsfilename: jsfilename, cssfilename: cssfilename, jsfilename2: jsfilename2, cssfilename2: cssfilename2 }] })
                            dispatch({ type: 'CHANGE_CURRENT_PAGE', payload: canvasList.length })
                        }
                    }}

                    >Save in New</button>

                    <button onClick={() => updatePage()}>Update</button>Curr Pg{currentPage + 1}
                </div>
                <button onClick={() => setListView(val => !val)}>{listView ? 'ListView' : 'Thumbnail View'}</button>

            </div>
            <div style={{ height: 690, width: 380, overflow: 'scroll', border: '1px solid black' }}>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable-1" type="PERSON">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={{ backgroundColor: snapshot.isDraggingOver ? 'yellow' : 'yellowgreen' }}
                                {...provided.droppableProps}
                            >
                                <table border='1'>
                                    <tbody>
                                        {canvasList.map((val, i) => {
                                            return (
                                                <Draggable draggableId={"draggable" + i} key={val + i} index={i}>
                                                    {(provided, snapshot) => (
                                                        <tr
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            style={{
                                                                ...provided.draggableProps.style,
                                                                backgroundColor: snapshot.isDragging ? 'red' : 'white',
                                                                boxShadow: snapshot.isDragging ? "0 0 .4rem #666" : "none",
                                                                // margin: '10px'
                                                            }}
                                                        >

                                                            {listView ? <><td>
                                                                <span>{i + 1}</span>
                                                                <span style={{ marginLeft: 10 }}  {...provided.dragHandleProps}><VscMove /></span>
                                                                <button style={{ marginLeft: 10 }} key1={i} onClick={(e) => deletePage(e)}>  <VscTrash style={{ pointerEvents: 'none' }} /></button>
                                                            </td>
                                                                <td>
                                                                    <input type='text' style={{ border: 'none', borderWidth: 0, minWidth: 245, backgroundColor: currentPage === i ? 'green' : 'white', color: currentPage === i ? 'white' : 'black' }} onClick={(e) => {
                                                                        recallPage(val.pageValue, window.editor.canvas, i, val.jsfilename, val.cssfilename, val.jsfilename2, val.cssfilename2);
                                                                    }} key1={i} key2={'vimlesh'} onDoubleClick={e => e.target.setSelectionRange(0, e.target.value.length)} value={val.pageName} onChange={updatePageName}
                                                                    />
                                                                </td></> :

                                                                <><td>
                                                                    <div style={{ backgroundColor: currentPage === i ? 'green' : 'white', color: currentPage === i ? 'white' : 'black', display: 'flex', height: 200, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', placeItems: 'center' }}>
                                                                        <div style={{ border: '2px solid grey', minWidth: 20, textAlign: 'center' }}>
                                                                            {i + 1}
                                                                        </div>
                                                                        <div>
                                                                            <span {...provided.dragHandleProps}><VscMove /></span>
                                                                        </div>
                                                                        <div>
                                                                            <button key1={i} onClick={(e) => deletePage(e)}>  <VscTrash style={{ pointerEvents: 'none' }} /></button>
                                                                        </div>
                                                                        <div>
                                                                            <button key1={i} onClick={() => {
                                                                                recallPage(val.pageValue, canvas, i, val.jsfilename, val.cssfilename, val.jsfilename2, val.cssfilename2)
                                                                                startGraphics(canvas, templateLayers.savePannelPlayer);
                                                                            }}>  <FaPlay style={{ pointerEvents: 'none' }} /></button>
                                                                        </div>
                                                                        <div>
                                                                            <button key1={i} onClick={() => stopGraphics(templateLayers.savePannelPlayer)}>  <FaStop style={{ pointerEvents: 'none' }} /></button>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                    <td>
                                                                        <div style={{ display: 'table-cell' }} className='thumbnail-preview-container' onClick={(e) => { recallPage(val.pageValue, window.editor.canvas, i, val.jsfilename, val.cssfilename, val.jsfilename2, val.cssfilename2) }}>
                                                                            <DrawingThumbnail i={i} />
                                                                        </div>
                                                                        <input type='text' style={{ minWidth: 305, backgroundColor: currentPage === i ? 'green' : 'white', color: currentPage === i ? 'white' : 'black' }} onClick={(e) => {
                                                                            recallPage(val.pageValue, window.editor.canvas, i, val.jsfilename, val.cssfilename, val.jsfilename2, val.cssfilename2);
                                                                        }} key1={i} key2={'vimlesh'} onDoubleClick={e => e.target.setSelectionRange(0, e.target.value.length)} value={val.pageName} onChange={updatePageName}
                                                                        />
                                                                    </td></>}
                                                        </tr>
                                                    )
                                                    }
                                                </Draggable>
                                            )
                                        })}
                                        {provided.placeholder}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </div>
    )
}

export default SavePannel
