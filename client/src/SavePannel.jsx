import React, { useState } from 'react'
import { FiFile } from "react-icons/fi";
import { FaSave } from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { VscTrash, VscMove } from "react-icons/vsc";
import { useSelector, useDispatch } from 'react-redux'

var currentFile = 'new';
let fileReader;

const SavePannel = () => {
    const canvasList = useSelector(state => state.canvasListReducer.canvasList);
    const currentPage = useSelector(state => state.currentPageReducer.currentPage);
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const dispatch = useDispatch();

    const [currentFileName, setCurrentFileName] = useState('')

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
        // if (e.code === 'Enter') {
        const updatedcanvasList = canvasList.map((val, i) => {
            return (i === parseInt(e.target.getAttribute('key1'))) ? { 'pageName': e.target.innerText, 'pageValue': val.pageValue } : val;
        });
        dispatch({ type: 'CHANGE_CANVAS_LIST', payload: [...updatedcanvasList] })
        // }

    }
    const onDoubleClickPageName = (event) => {
        event.preventDefault();
        var sel = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(event.target);
        sel.removeAllRanges();
        sel.addRange(range);
    }
    const recallPage = (json, canvas, i) => {
        dispatch({ type: 'CHANGE_CURRENT_PAGE', payload: i })
        canvas.loadFromJSON(json, function () {
            const aa = canvas.getObjects();
            aa.forEach(element => {
                try {
                    element.set({ objectCaching: false })
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
    const handleFileRead2 = (e) => {
        const content = fileReader.result;
        var aa = content.split('\r\n')
        aa.splice(-1)
        var updatedcanvasList = [...canvasList]
        aa.forEach(element => {
            var cc = JSON.parse(element)
            updatedcanvasList.push(cc)
        });
        dispatch({ type: 'CHANGE_CANVAS_LIST', payload: [...updatedcanvasList] })
    };
    const handleFileChosen2 = (file) => {
        if (file) {
            dispatch({ type: 'CHANGE_CURRENT_PAGE', payload: '' })
            fileReader = new FileReader();
            fileReader.onloadend = handleFileRead2;
            fileReader.readAsText(file);
        }
    };
    const handleFileRead = (e) => {
        const content = fileReader.result;
        var aa = content.split('\r\n')
        aa.splice(-1)
        var updatedcanvasList = []
        aa.forEach(element => {
            var cc = JSON.parse(element)
            updatedcanvasList.push(cc)
        });
        dispatch({ type: 'CHANGE_CANVAS_LIST', payload: [...updatedcanvasList] })
    };
    const drawingFileNew = () => {
        var updatedcanvasList = [];
        dispatch({ type: 'CHANGE_CANVAS_LIST', payload: [...updatedcanvasList] })
        setCurrentFileName('')
    }

    const updatePage = () => {
        const updatedcanvasList = canvasList.map((val, i) => {
            return (i === currentPage) ? { 'pageName': val.pageName, 'pageValue': canvas.toJSON(['id', 'selectable']) } : val;
        });
        dispatch({ type: 'CHANGE_CANVAS_LIST', payload: [...updatedcanvasList] })
    }

    const drawingFileSaveAs = () => {
        const element = document.createElement("a");
        var aa = ''
        canvasList.forEach(val => {
            aa += JSON.stringify({ 'pageName': val.pageName, 'pageValue': val.pageValue }) + '\r\n'
        });
        const file = new Blob([aa], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        var ss
        if (currentFile === 'new') {
            ss = new Date().toLocaleTimeString('en-US', { year: "numeric", month: "numeric", day: "numeric", hour12: false, hour: "numeric", minute: "numeric", second: "numeric" });
        } else {
            ss = currentFile;
        }

        var retVal = prompt("Enter  file name to save : ", ss);
        if (retVal !== null) {
            element.download = retVal;
            document.body.appendChild(element); // Required for this to work in FireFox
            element.click();
            setCurrentFileName(retVal)
        }
    }
    const drawingFileSave = () => {
        updatePage(canvas);
        const element = document.createElement("a");
        var aa = ''
        canvasList.forEach(val => {
            aa += JSON.stringify({ 'pageName': val.pageName, 'pageValue': val.pageValue }) + '\r\n'
        });
        const file = new Blob([aa], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);

        element.download = currentFileName;
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }
    const handleFileChosen = (file) => {
        if (file) {
            currentFile = file.name
            dispatch({ type: 'CHANGE_CURRENT_PAGE', payload: '' })
            fileReader = new FileReader();
            fileReader.onloadend = handleFileRead;
            fileReader.readAsText(file);
        }
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
    return (
        <div >
            <div>
                <div className='drawingToolsRow' >
                    <b> Save: </b>
                    <button onClick={drawingFileNew}>File New <FiFile /></button>
                    <button onClick={drawingFileSaveAs}>File Save As<FaSave /></button>
                    <button onClick={drawingFileSave}>File Save<FaSave /></button><br />
                </div>
                <div className='drawingToolsRow' >
                    <span>Open File:</span>  <input
                        type='file'
                        id='file'
                        className='input-file'
                        accept='.txt'
                        onChange={e => {
                            handleFileChosen(e.target.files[0]);
                            if (e.target.files[0]) { setCurrentFileName(e.target.files[0].name); };
                        }}
                    /><br />
                </div>
                <div className='drawingToolsRow' >
                    <span>Add File:</span>  <input
                        type='file'
                        id='file'
                        className='input-file'
                        accept='.txt'
                        onChange={e => handleFileChosen2(e.target.files[0])}
                    /><br />
                </div>
                <div className='drawingToolsRow' >

                    <b> Pages: </b>
                    <button onClick={() => {
                        var ss = new Date().toLocaleTimeString('en-US', { year: "numeric", month: "numeric", day: "numeric", hour12: false, hour: "numeric", minute: "numeric", second: "numeric" });
                        var retVal = prompt("Enter  page name to save : ", ss + "_pageName");
                        if (retVal !== null) {
                            deleteAll(window.editor?.canvas);
                            dispatch({ type: 'CHANGE_CANVAS_LIST', payload: [...canvasList, { 'pageName': retVal, 'pageValue': `${JSON.stringify((window.editor?.canvas.toJSON(['id'])))}` }] })
                            dispatch({ type: 'CHANGE_CURRENT_PAGE', payload: canvasList.length })
                        }
                    }}
                    > Add Blank Page</button>
                    <button onClick={() => {
                        var ss = new Date().toLocaleTimeString('en-US', { year: "numeric", month: "numeric", day: "numeric", hour12: false, hour: "numeric", minute: "numeric", second: "numeric" });
                        var retVal = prompt("Enter  page name to save : ", ss + "_pageName");
                        if (retVal !== null) {
                            dispatch({ type: 'CHANGE_CANVAS_LIST', payload: [...canvasList, { 'pageName': retVal, 'pageValue': `${JSON.stringify((window.editor?.canvas.toJSON(['id'])))}` }] })
                            dispatch({ type: 'CHANGE_CURRENT_PAGE', payload: canvasList.length })
                        }
                    }}

                    ><FaSave /> in New Page</button>

                    <button onClick={() => updatePage()}>Update Page</button>
                </div>
            </div>
            <div style={{ height: 710, width: 380, overflow: 'scroll', border: '1px solid black' }}>

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
                                                            <td>{i + 1}</td><td {...provided.dragHandleProps}><VscMove /></td>
                                                            <td style={{ minWidth: 270, backgroundColor: currentPage === i ? 'green' : 'white', color: currentPage === i ? 'white' : 'black' }} onClick={(e) => {
                                                                recallPage(val.pageValue, window.editor.canvas, i);
                                                            }} key1={i} key2={'vimlesh'} onDoubleClick={onDoubleClickPageName} suppressContentEditableWarning={true} contentEditable onMouseOut={updatePageName} >{val.pageName}
                                                            </td>
                                                            <td><button key1={i} onClick={(e) => deletePage(e)}>  <VscTrash style={{ pointerEvents: 'none' }} /></button></td>

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
