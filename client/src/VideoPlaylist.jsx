
import React, { useState } from 'react'
import { endpoint, address1 } from './common'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { VscTrash, VscMove } from "react-icons/vsc";
import { FaPlay, FaStop } from "react-icons/fa";

const layerNumberList = [1, 2, 3, 4, 5]

const VideoPlaylist = () => {
    const [layerNumber, setLayerNumber] = useState(5);


    const dispatch = useDispatch()
    const media = useSelector(state => state.mediaReducer.media)

    const playlist = useSelector(state => state.playlistReducer.playlist)
    const currentFile = useSelector(state => state.currentFileReducer.currentFile);
    const [currentFileinlist, setCurrentFileinlist] = useState();


    const [filename, setfilename] = useState('amb');
    const [searchText, setSearchText] = useState('');
    const refreshMedia = () => {
        axios.post(address1 + '/getmedia').then((aa) => {
            dispatch({ type: 'CHANGE_MEDIA', payload: aa.data })
        }).catch((aa) => { console.log('Error', aa) });
    }
    const searchedMedia =
        media?.filter((value) => {
            return (value.toLowerCase().search(searchText.toLowerCase()) > -1)
        })

    const onDragEnd = (result) => {
        const aa = [...playlist]
        if (result.destination != null) {
            aa.splice(result.destination?.index, 0, aa.splice(result.source?.index, 1)[0])
            dispatch({ type: 'CHANGE_PLAYLIST', payload: aa })
            if (currentFile === result.source?.index) {
                dispatch({ type: 'CHANGE_CURRENT_FILE', payload: result.destination?.index })
            }
            else if ((currentFile >= result.destination?.index) && (currentFile < result.source?.index)) {
                dispatch({ type: 'CHANGE_CURRENT_FILE', payload: currentFile + 1 })
            }
            else if ((currentFile <= result.destination?.index) && (currentFile > result.source?.index)) {
                dispatch({ type: 'CHANGE_CURRENT_FILE', payload: currentFile - 1 })
            }
        }
    }

    const deletePage = (e) => {
        const updatedPlaylist = playlist.filter((_, i) => {
            return (parseInt(e.target.getAttribute('key1')) !== i)
        });
        dispatch({ type: 'CHANGE_PLAYLIST', payload: [...updatedPlaylist] })

    }
    const onDoubleClickMediafile = e => {
        const updatedPlaylist = [...playlist];
        updatedPlaylist.push({ fileName: e.target.innerText });


        dispatch({ type: 'CHANGE_PLAYLIST', payload: [...updatedPlaylist] })

    }
    const changelayerNumber = e => {
        setLayerNumber(e.target.value);
    }
    const setfilenameAndCueonPreview = e => {
        setfilename(((e.target.innerText).replaceAll('\\', '/')).split('.')[0]);
        var video = document.getElementById(`video${layerNumber}`);
        var source = document.getElementsByTagName('source')[layerNumber - 1];

        if ((`${address1}/media/${e.target.innerText}`).match(/\.(jpeg|jpg|bmp|gif|png)$/) != null) {
            video.setAttribute("poster", `${address1}/media/${e.target.innerText}`);
        }
        else {
            video.setAttribute("poster", ``);
            source.setAttribute("src", `${address1}/media/${e.target.innerText}`);
            video.load();
        }
    }
    return (<div style={{ display: 'flex' }}>
        <div style={{ border: '1px solid black' }}>
            <b>Layer: </b>  <select onChange={e => changelayerNumber(e)} value={layerNumber}>
                {layerNumberList.map((val) => { return <option key={uuidv4()} value={val}>{val}</option> })}
            </select><br />
            <div style={{ width: 400 }}>
                File: <input style={{ width: 320 }} onChange={(e) => setfilename(e.target.value)} value={filename}></input>
                <br /> <button className='palyButton' onClick={() => endpoint(`load ${window.chNumber}-${layerNumber} "${filename}"`)}>Cue</button>
                <button className='palyButton' onClick={() => endpoint(`play ${window.chNumber}-${layerNumber} "${filename}"`)}> Play</button>
                <button className='stopButton' onClick={() => endpoint(`pause ${window.chNumber}-${layerNumber}`)}>Pause</button>
                <button className='stopButton' onClick={() => endpoint(`resume ${window.chNumber}-${layerNumber}`)}>Resume</button>
                <button className='stopButton' onClick={() => endpoint(`stop ${window.chNumber}-${layerNumber}`)}>Stop</button>
                <button className='palyButton' onClick={() => endpoint(`play ${window.chNumber}-${layerNumber} "${filename}" loop`)}>Loop Play</button>

            </div>
            <button onClick={refreshMedia}>Refresh Media</button>{searchedMedia.length} files<br />
            <span>search:</span><input style={{ width: 320 }} type='text' onChange={e => setSearchText(e.target.value)} />
            <div style={{ maxHeight: '750px', maxWidth: '400px', overflow: 'scroll' }}>
                <table border='1' >
                    <tbody>
                        {searchedMedia.map((val, i) => {
                            return <tr key={uuidv4()}><td
                                style={{ backgroundColor: currentFileinlist === i ? 'green' : 'white', color: currentFileinlist === i ? 'white' : 'black' }}
                                onDoubleClick={e => onDoubleClickMediafile(e)}
                                onClick={(e) => {
                                    setfilenameAndCueonPreview(e)
                                    setCurrentFileinlist(i)
                                }
                                }>{val}</td></tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>

        <div>
            <b>Playlist</b><br />
            <div style={{ height: 850, width: 470, overflow: 'scroll', border: '1px solid black' }}>

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
                                        {playlist?.map((val, i) => {
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
                                                            <td style={{ minWidth: 250, maxWidth: 250, backgroundColor: currentFile === i ? 'green' : 'white', color: currentFile === i ? 'white' : 'black' }}
                                                                onClick={(e) => {
                                                                    dispatch({ type: 'CHANGE_CURRENT_FILE', payload: i });
                                                                    setfilenameAndCueonPreview(e)

                                                                }} key1={i} key2={'vimlesh'}  >{val.fileName}
                                                            </td>
                                                            <td><button key1={i} onClick={() => endpoint(`load ${window.chNumber}-${layerNumber} "${((val.fileName).replaceAll('\\', '/')).split('.')[0]}"`)} >Cue</button></td>
                                                            <td><button key1={i} onClick={() => endpoint(`play ${window.chNumber}-${layerNumber} "${((val.fileName).replaceAll('\\', '/')).split('.')[0]}"`)} ><FaPlay /></button></td>
                                                            <td><button key1={i} onClick={() => endpoint(`Stop ${window.chNumber}-${layerNumber}`)} ><FaStop /></button></td>
                                                            <td><button key1={i} onClick={(e) => deletePage(e)} ><VscTrash style={{ pointerEvents: 'none' }} /></button></td>

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
    </div>)
}

export default VideoPlaylist

