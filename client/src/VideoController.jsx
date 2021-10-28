import React, { useState } from 'react'
import { endpoint, address1 } from './common'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux'


const VideoController = ({ layerNumber }) => {
    const dispatch = useDispatch()
    const media = useSelector(state => state.mediaReducer.media)
    const [filename, setfilename] = useState('amb');
    const [searchText, setSearchText] = useState('');
    const [currentFileinlist, setCurrentFileinlist] = useState();
    const refreshMedia = () => {
        axios.post(address1 + '/getmedia').then((aa) => {
            dispatch({ type: 'CHANGE_MEDIA', payload: aa.data })
        }).catch((aa) => { console.log('Error', aa) });
    }
    const searchedMedia =
        media?.filter((value) => {
            return (value.toLowerCase().search(searchText.toLowerCase()) > -1)
        })
    return (
        <div style={{ border: '1px solid black' }}>
            <b>Layer: {layerNumber}</b><br />
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
            <div style={{ maxHeight: '300px', maxWidth: '400px', overflow: 'scroll' }}>
                <table border='1' >
                    <tbody>
                        {searchedMedia.map((val, i) => {
                            return <tr key={uuidv4()}><td
                                style={{ backgroundColor: currentFileinlist === i ? 'green' : 'white', color: currentFileinlist === i ? 'white' : 'black' }}
                                onClick={(e) => {
                                    setfilename(((e.target.innerText).replaceAll('\\', '/')).split('.')[0]);
                                    var video = document.getElementById(`video${layerNumber}`);
                                    var source = document.getElementsByTagName('source')[layerNumber - 1];
                                    setCurrentFileinlist(i)

                                    if ((`${address1}/media/${e.target.innerText}`).match(/\.(jpeg|jpg|bmp|gif|png)$/) != null) {
                                        video.setAttribute("poster", `${address1}/media/${e.target.innerText}`);
                                    }
                                    else {
                                        video.setAttribute("poster", ``);
                                        source.setAttribute("src", `${address1}/media/${e.target.innerText}`);
                                        video.load();
                                    }
                                }
                                }>{val}</td></tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default VideoController
