import React, { useEffect, useState } from 'react'
import { FiFile } from "react-icons/fi";
import { FaSave } from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { VscTrash, VscMove } from "react-icons/vsc";
import { useSelector, useDispatch } from 'react-redux'
import DrawingThumbnail from './DrawingThumbnail'
import { FaPlay, FaStop } from "react-icons/fa";
import { startGraphics, stopGraphics, updateGraphics, templateLayers, rgbaObjectToHex, saveFile } from './common'

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

    const deletePage = index => {
        if (currentPage > index) {
            dispatch({ type: 'CHANGE_CURRENT_PAGE', payload: currentPage - 1 })
        }
        else if (currentPage === index) {
            dispatch({ type: 'CHANGE_CURRENT_PAGE', payload: null })
        }
        const updatedcanvasList = canvasList.filter((_, i) => {
            return (index !== i)
        });
        dispatch({ type: 'CHANGE_CANVAS_LIST', payload: updatedcanvasList })
    }
    const updatePageName = (e, index) => {
        const updatedcanvasList = canvasList.map((val, i) => {
            return (i === index) ? { ...val, 'pageName': e.target.value } : val;
        });
        dispatch({ type: 'CHANGE_CANVAS_LIST', payload: updatedcanvasList })

    }

    const recallPage = (
        json,
        canvas,
        i,
        jsfilename1 = 'main',
        cssfilename1 = 'main',
        jsfilename2 = 'main2',
        cssfilename2 = 'main2'
    ) => {
        return new Promise((resolve, reject) => {
            try {
                // Dispatch actions for current page, js/css filenames
                dispatch({ type: 'CHANGE_CURRENT_PAGE', payload: i });
                dispatch({ type: 'CHANGE_JSFILENAME', payload: jsfilename1 });
                dispatch({ type: 'CHANGE_CSSFILENAME', payload: cssfilename1 });
                dispatch({ type: 'CHANGE_JSFILENAME2', payload: jsfilename2 });
                dispatch({ type: 'CHANGE_CSSFILENAME2', payload: cssfilename2 });

                // Load the canvas from JSON
                canvas.loadFromJSON(json).then(() => {
                    const objects = canvas.getObjects();

                    // Process each object in the canvas
                    objects.forEach((element) => {
                        try {
                            //  disable object caching
                            element.set({
                                objectCaching: false,
                            });

                            // Convert fill, stroke, and shadow color from RGBA to hex if necessary
                            if (isRGBAObject(element.fill)) {
                                element.set({ fill: rgbaObjectToHex(element.fill) });
                            }
                            if (isRGBAObject(element.stroke)) {
                                element.set({ stroke: rgbaObjectToHex(element.stroke) });
                            }
                            if (element.shadow && isRGBAObject(element.shadow.color)) {
                                element.set({ shadow: { ...element.shadow, color: rgbaObjectToHex(element.shadow.color) } });
                            }

                            // Add a double-click event to trigger the edit function
                            element.on('mousedblclick', () => {
                                window.edit();
                            });
                        } catch (error) {
                            console.error('Error processing element:', error);
                        }
                    });

                    // Trigger a render after all changes
                    canvas.requestRenderAll();

                    // Resolve the promise after the canvas is rendered
                    resolve();
                }).catch((err) => {
                    console.error('Error loading canvas from JSON:', err);
                    reject(err);
                });
            } catch (error) {
                console.error('Error recalling page:', error);
                reject(error);
            }
        });
    };

    // Helper function to check if the color is an RGBA object
    const isRGBAObject = (color) => color && typeof color === 'object' && 'r' in color && 'g' in color && 'b' in color && 'a' in color;


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
                    const lastFourLetters = (cc.pageName).substring(cc.pageName.length - 4);
                    if (lastFourLetters === '.txt') {
                        const cc1 = { ...cc, pageName: cc.pageName.slice(0, -4) }
                        updatedcanvasList.push(cc1)
                    }
                    else {
                        updatedcanvasList.push(cc)
                    }
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
        dispatch({ type: 'CHANGE_CANVAS_LIST', payload: [] })
        setCurrentFileName('')
    }

    const updatePage = () => {
        const updatedcanvasList = canvasList.map((val, i) => {
            return (i === currentPage) ? { ...val, 'pageValue': canvas.toJSON(['id', 'selectable', 'class']), jsfilename: jsfilename, cssfilename: cssfilename, jsfilename2: jsfilename2, cssfilename2: cssfilename2 } : val;
        });
        dispatch({ type: 'CHANGE_CANVAS_LIST', payload: updatedcanvasList })
    }

    async function drawingFileSaveAs() {
        updatePage(canvas);
        // const element = document.createElement("a");
        var aa = ''
        canvasList.forEach(val => {
            aa += JSON.stringify({ ...val, pageName: val.pageName, pageValue: val.pageValue, animation: val.animation, jsfilename: val.jsfilename, cssfilename: val.cssfilename, jsfilename2: jsfilename2, cssfilename2: cssfilename2 }) + '\r\n'
        });
        const data = new Blob([aa], { type: 'text/plain' });
        // element.href = URL.createObjectURL(data);
        var ss
        if (currentFile === 'new') {
            ss = (new Date().toLocaleTimeString('en-US', { year: "numeric", month: "numeric", day: "numeric", hour12: false, hour: "numeric", minute: "numeric", second: "numeric" })).replace(/[\\/:*?"<>|]/g, "_");
        } else {
            ss = currentFileName?.name;
        }
        const options = {
            fileExtension: '.txt',
            suggestedName: ss,
            types: [{
                description: 'text file',
                accept: { 'text/plain': ['.txt'] },
            }],
        };
        setCurrentFileName(await saveFile(options, data));
    }
    async function drawingFileSave() {
        updatePage(canvas);
        var aa = ''
        canvasList.forEach(val => {
            aa += JSON.stringify({ ...val, pageName: val.pageName, pageValue: val.pageValue, animation: val.animation, jsfilename: val.jsfilename, cssfilename: val.cssfilename, jsfilename2: val.jsfilename2, cssfilename2: val.cssfilename2 }) + '\r\n'
        });
        const data = new Blob([aa], { type: 'text/plain' });
        saveFile(null, data, currentFileName)
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
        var content;
        if (window.showOpenFilePicker) {
            const [aa] = await window.showOpenFilePicker();
            setCurrentFileName(aa);
            currentFile = aa.name
            dispatch({ type: 'CHANGE_CURRENT_PAGE', payload: '' })
            const file = await aa.getFile();
            content = await file.text();
            processContent(content)
        }
        else {
            var fInput = document.createElement("input"); //hidden input to open filedialog
            fInput.setAttribute("type", "file"); //opens files
            fInput.setAttribute("accept", ".txt"); ////only useful for inspector debugging
            fInput.setAttribute("multiple", false); ////only useful for inspector debugging

            fInput.click();
            fInput.onchange = (e) => {
                const file = e.target.files[0]
                if (file) {
                    fileReader = new FileReader();
                    fileReader.onloadend = () => {
                        content = fileReader.result;
                        processContent(content)
                    }
                    fileReader.readAsText(file);
                }
            };
        }

    }
    const processContent = (content) => {
        var aa1 = content.split('\r\n')
        aa1.splice(-1)
        var updatedcanvasList = []
        aa1.forEach(element => {
            var cc = JSON.parse(element)
            const lastFourLetters = (cc.pageName).substring(cc.pageName.length - 4);
            if (lastFourLetters === '.txt') {
                const cc1 = { ...cc, pageName: cc.pageName.slice(0, -4) }
                updatedcanvasList.push(cc1)
            }
            else {
                updatedcanvasList.push(cc)
            }
        });
        dispatch({ type: 'CHANGE_CANVAS_LIST', payload: updatedcanvasList })
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
                        var ss = (new Date().toLocaleTimeString('en-US', { year: "numeric", month: "numeric", day: "numeric", hour12: false, hour: "numeric", minute: "numeric", second: "numeric" })).replace(/[\\/:*?"<>|]/g, "_");
                        var retVal = prompt("Enter  page name to save : ", ss + "_pageName");
                        if (retVal !== null) {
                            deleteAll(window.editor?.canvas);
                            dispatch({ type: 'CHANGE_CANVAS_LIST', payload: [...canvasList, { pageName: retVal, pageValue: `${JSON.stringify((window.editor?.canvas.toJSON(['id', 'selectable', 'class'])))}`, animation: '', jsfilename: jsfilename, cssfilename: cssfilename, jsfilename2: jsfilename2, cssfilename2: cssfilename2 }] })
                            dispatch({ type: 'CHANGE_CURRENT_PAGE', payload: canvasList.length })
                        }
                    }}
                    > Add Blank</button>
                    <button onClick={() => {
                        var ss = (new Date().toLocaleTimeString('en-US', { year: "numeric", month: "numeric", day: "numeric", hour12: false, hour: "numeric", minute: "numeric", second: "numeric" })).replace(/[\\/:*?"<>|]/g, "_");
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
            <div style={{ height: 645, width: 380, overflow: 'scroll', border: '1px solid black' }}>
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
                                                                <button style={{ marginLeft: 10 }} onClick={() => deletePage(i)}>  <VscTrash style={{ pointerEvents: 'none' }} /></button>
                                                            </td>
                                                                <td>
                                                                    <input type='text' style={{ border: 'none', borderWidth: 0, minWidth: 245, backgroundColor: currentPage === i ? 'green' : 'white', color: currentPage === i ? 'white' : 'black' }} onClick={(e) => {
                                                                        recallPage(val.pageValue, window.editor.canvas, i, val.jsfilename, val.cssfilename, val.jsfilename2, val.cssfilename2);
                                                                    }} onDoubleClick={e => e.target.setSelectionRange(0, e.target.value.length)} value={val.pageName} onChange={e => updatePageName(e, i)}
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
                                                                            <button onClick={() => deletePage(i)}>  <VscTrash style={{ pointerEvents: 'none' }} /></button>
                                                                        </div>
                                                                        <div>
                                                                            <button onClick={() => {
                                                                                recallPage(val.pageValue, canvas, i, val.jsfilename, val.cssfilename, val.jsfilename2, val.cssfilename2).then(() =>
                                                                                    startGraphics(canvas, templateLayers.savePannelPlayer, currentscreenSize))
                                                                            }}>  <FaPlay style={{ pointerEvents: 'none' }} /></button>
                                                                        </div>

                                                                        <div>
                                                                            <button title='Update' onClick={() => {
                                                                                recallPage(val.pageValue, canvas, i, val.jsfilename, val.cssfilename, val.jsfilename2, val.cssfilename2).then(() => {
                                                                                    updateGraphics(canvas, templateLayers.savePannelPlayer);
                                                                                }
                                                                                )
                                                                            }}>U</button>
                                                                        </div>

                                                                        <div>
                                                                            <button onClick={() => stopGraphics(templateLayers.savePannelPlayer)}>  <FaStop style={{ pointerEvents: 'none' }} /></button>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                    <td>
                                                                        <div style={{ display: 'table-cell' }} className='thumbnail-preview-container' onClick={(e) => { recallPage(val.pageValue, window.editor.canvas, i, val.jsfilename, val.cssfilename, val.jsfilename2, val.cssfilename2) }}>
                                                                            <DrawingThumbnail i={i} />
                                                                        </div>
                                                                        <input type='text' style={{ minWidth: 305, backgroundColor: currentPage === i ? 'green' : 'white', color: currentPage === i ? 'white' : 'black' }} onClick={(e) => {
                                                                            recallPage(val.pageValue, window.editor.canvas, i, val.jsfilename, val.cssfilename, val.jsfilename2, val.cssfilename2);
                                                                        }} onDoubleClick={e => e.target.setSelectionRange(0, e.target.value.length)} value={val.pageName} onChange={e => updatePageName(e, i)}
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
