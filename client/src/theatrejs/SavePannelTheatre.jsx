import React, { useEffect, useState } from 'react'
import { FiFile } from "react-icons/fi";
import { FaSave } from "react-icons/fa";
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { VscTrash, VscMove } from "react-icons/vsc";
import { useSelector, useDispatch } from 'react-redux'
import DrawingThumbnailTheatrejs from './DrawingThumbnailTheatrejs'
import CasparPlayer from './CasparPlayer';
import { theatreLayers, stopAllTheatreLayes } from '../common'

var currentFile = 'new';
let fileReader;

const SavePannel = ({ importHtml, deleteAllObjects, playtoCasparcg }) => {
    const canvasList = useSelector(state => state.canvasListReducer.canvasList);
    const currentPage = useSelector(state => state.currentPageReducer.currentPage);
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const jsfilename = useSelector(state => state.jsfilenameReducer.jsfilename);
    const cssfilename = useSelector(state => state.cssfilenameReducer.cssfilename);
    const jsfilename2 = useSelector(state => state.jsfilenameReducer2.jsfilename2);
    const cssfilename2 = useSelector(state => state.cssfilenameReducer2.cssfilename2);
    const [listView, setListView] = useState(true);
    const dispatch = useDispatch();
    const [currentFileName, setCurrentFileName] = useState()
    // const showExtensionPanel = useSelector(state => state.showExtensionPanelReducer.showExtensionPanel);


    useEffect(() => {
        setTimeout(() => {
            if (window.location.origin !== 'https://vimlesh1975.github.io') {
                fetch(`${process.env.PUBLIC_URL}/data/defaultTheatre.the`)
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
                fetch(`/ReactCasparClient/data/defaultTheatre.the`)
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

    const recallPage = (json, canvas, i, jsfilename1, cssfilename1, jsfilename2, cssfilename2, animationTheatrejs) => {
        dispatch({ type: 'CHANGE_CURRENT_PAGE', payload: i });

        dispatch({ type: 'CHANGE_JSFILENAME', payload: (jsfilename1 === undefined) ? 'main' : jsfilename1 });;
        dispatch({ type: 'CHANGE_CSSFILENAME', payload: (cssfilename1 === undefined) ? 'main' : cssfilename1 });

        dispatch({ type: 'CHANGE_JSFILENAME2', payload: (jsfilename2 === undefined) ? 'main2' : jsfilename2 });;
        dispatch({ type: 'CHANGE_CSSFILENAME2', payload: (cssfilename2 === undefined) ? 'main2' : cssfilename2 });

        importHtml(json, animationTheatrejs)

        dispatch({ type: 'SHOW_EXTENSIONPANNEL', payload: false });
    }

    const updatePage = () => {
        const updatedcanvasList = canvasList.map((val, i) => {
            return (i === currentPage) ? { ...val, 'pageValue': canvas.toJSON(['id', 'selectable', 'class']), animationTheatrejs: JSON.stringify(window.studio.createContentOfSaveFile(window.projectId)) } : val;
        });
        dispatch({ type: 'CHANGE_CANVAS_LIST', payload: [...updatedcanvasList] })
    }
    const deleteAll = canvas => {
        const aa = canvas.getObjects()
        aa.forEach(element => { canvas.remove(element) });
        canvas.discardActiveObject();
        canvas.requestRenderAll();

    }

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

    async function drawingFileSaveAs() {
        const element = document.createElement("a");
        var aa = ''
        canvasList.forEach(val => {
            aa += JSON.stringify({ ...val, pageName: val.pageName, pageValue: val.pageValue, animation: val.animation, jsfilename: val.jsfilename, cssfilename: val.cssfilename, jsfilename2: jsfilename2, cssfilename2: cssfilename2, animationTheatrejs: val.animationTheatrejs }) + '\r\n'
        });
        const file = new Blob([aa], { type: 'text/the' });
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
                description: 'the file',
                accept: { 'text/the': ['.the'] },
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
            aa += JSON.stringify({ ...val, pageName: val.pageName, pageValue: val.pageValue, animation: val.animation, jsfilename: val.jsfilename, cssfilename: val.cssfilename, jsfilename2: val.jsfilename2, cssfilename2: val.cssfilename2, animationTheatrejs: val.animationTheatrejs }) + '\r\n'
        });
        const file = new Blob([aa], { type: 'text/the' });

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
                <div style={{ textAlign: 'left' }} >
                    <b> Save: </b>
                    <button title="Will discard list" onClick={drawingFileNew}>File New <FiFile /></button>
                    <button title="Save as new name" onClick={drawingFileSaveAs}>File Save As<FaSave /></button>
                    {currentFileName && <button title="Overwrite" onClick={drawingFileSave}>File Save<FaSave /></button>}
                </div>

                <div style={{ textAlign: 'left' }}>
                    <button title="Will discard list and open list" onClick={importCanvaslist}>Open File</button>{currentFileName?.name}
                </div>
                <div style={{ textAlign: 'left' }} >
                    <span title="Will append list">Add File:</span>  <input
                        type='file'
                        id='file'
                        className='input-file'
                        accept='.the'
                        multiple
                        onChange={e => handleFileChosen2(e.target.files)}
                    /><br />
                </div>
                <div style={{ textAlign: 'left' }} >

                    {canvasList.length}  <b> Pages: </b>
                    <button onClick={() => {
                        var ss = new Date().toLocaleTimeString('en-US', { year: "numeric", month: "numeric", day: "numeric", hour12: false, hour: "numeric", minute: "numeric", second: "numeric" });
                        var retVal = prompt("Enter  page name to save : ", ss + "_pageName");
                        if (retVal !== null) {
                            deleteAllObjects();
                            deleteAll(window.editor?.canvas);
                            dispatch({ type: 'CHANGE_CANVAS_LIST', payload: [...canvasList, { pageName: retVal, pageValue: `${JSON.stringify((window.editor?.canvas.toJSON(['id', 'selectable', 'class'])))}`, animation: '', jsfilename: jsfilename, cssfilename: cssfilename, jsfilename2: jsfilename2, cssfilename2: cssfilename2, animationTheatrejs: JSON.stringify(window.studio.createContentOfSaveFile(window.projectId)) }] })
                            dispatch({ type: 'CHANGE_CURRENT_PAGE', payload: canvasList.length })
                        }
                    }}
                    > Add Blank</button>
                    <button onClick={() => {
                        var ss = new Date().toLocaleTimeString('en-US', { year: "numeric", month: "numeric", day: "numeric", hour12: false, hour: "numeric", minute: "numeric", second: "numeric" });
                        var retVal = prompt("Enter  page name to save : ", ss + "_pageName");
                        if (retVal !== null) {
                            dispatch({ type: 'CHANGE_CANVAS_LIST', payload: [...canvasList, { pageName: retVal, pageValue: `${JSON.stringify((window.editor?.canvas.toJSON(['id', 'selectable', 'class'])))}`, animation: '', jsfilename: jsfilename, cssfilename: cssfilename, jsfilename2: jsfilename2, cssfilename2: cssfilename2, animationTheatrejs: JSON.stringify(window.studio.createContentOfSaveFile(window.projectId)) }] })
                            dispatch({ type: 'CHANGE_CURRENT_PAGE', payload: canvasList.length })
                        }
                    }}

                    >Save in New</button>

                    <button onClick={() => updatePage()}>Update</button>Curr Pg{currentPage + 1}
                </div>
                <div style={{ textAlign: 'left' }} >
                    <button onClick={() => setListView(val => !val)}>{listView ? 'ListView' : 'Thumbnail View'}</button>
                </div>
            </div>
            <div style={{ height: 820, width: 380, overflow: 'scroll', border: '1px solid black' }}>
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
                                                                        localStorage.clear();
                                                                        recallPage(val.pageValue, window.editor.canvas, i, val.jsfilename, val.cssfilename, val.jsfilename2, val.cssfilename2, val.animationTheatrejs);
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
                                                                        {/* <div>
                                                                            <button key1={i} onClick={() => {
                                                                                recallPage(val.pageValue, canvas, i, val.jsfilename, val.cssfilename, val.jsfilename2, val.cssfilename2, val.animationTheatrejs)
                                                                                setTimeout(() => {
                                                                                    window.sheet.sequence.position = 0;
                                                                                }, 1000);
                                                                                setTimeout(() => {
                                                                                    playtoCasparcg(templateLayers.theatrejs);
                                                                                }, 2000);
                                                                            }}>  <FaPlay style={{ pointerEvents: 'none' }} /></button>
                                                                        </div>
                                                                        <div>
                                                                            <button key1={i} onClick={() => stopGraphics1(templateLayers.theatrejs)}>  <FaStop style={{ pointerEvents: 'none' }} /></button>
                                                                        </div> */}
                                                                    </div>
                                                                </td>
                                                                    <td>
                                                                        <div style={{ display: 'table-cell' }} className='thumbnail-preview-container' onClick={(e) => { recallPage(val.pageValue, window.editor.canvas, i, val.jsfilename, val.cssfilename, val.jsfilename2, val.cssfilename2, val.animationTheatrejs) }}>
                                                                            <DrawingThumbnailTheatrejs i={i} />
                                                                        </div>
                                                                        <input type='text' style={{ minWidth: 305, backgroundColor: currentPage === i ? 'green' : 'white', color: currentPage === i ? 'white' : 'black' }} onClick={(e) => {
                                                                            recallPage(val.pageValue, window.editor.canvas, i, val.jsfilename, val.cssfilename, val.jsfilename2, val.cssfilename2, val.animationTheatrejs);
                                                                        }} key1={i} onDoubleClick={e => e.target.setSelectionRange(0, e.target.value.length)} value={val.pageName} onChange={updatePageName}
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
                {theatreLayers.map((layer, i) => {
                    return (<div key={i}>
                        <div style={{ display: 'inline-block' }}><CasparPlayer playtoCasparcg={playtoCasparcg} layerNumber={layer} /></div>
                    </div>)
                })}
                <button style={{ backgroundColor: 'red', color: 'white', fontSize: 15 }} onClick={stopAllTheatreLayes}>Stop All Theatre Layes</button>
            </div>

        </div>
    )
}

export default SavePannel
