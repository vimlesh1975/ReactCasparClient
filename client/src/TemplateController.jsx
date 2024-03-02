import React, { useState } from 'react'
import { endpoint, address1 } from './common'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux'


const TemplateController = ({ layerNumber, channelNumber = null, processContent, setTemplateName, palytocaspar, updateTocaspar, updateInPreview }) => {
    const dispatch = useDispatch()
    const template = useSelector(state => state.templateReducer.template)
    const [filename, setfilename] = useState('');
    const [searchText, setSearchText] = useState('');
    const [currentFileinlist, setCurrentFileinlist] = useState();
    const refreshTemplate = () => {
        axios.post(address1 + '/gettemplate').then((aa) => {
            dispatch({ type: 'CHANGE_TEMPLATE', payload: aa.data })
        }).catch((aa) => { console.log('Error', aa) });
    }
    const searchedTemplate =
        template?.filter((value) => {
            return (value.toLowerCase().search(searchText.toLowerCase()) > -1)
        })
    return (
        <div style={{ border: '1px solid black' }}>
            {channelNumber ? <> <b>Caspar channelNumber: {channelNumber}</b> <b>Layer: {layerNumber}</b></> : <> <b>Layer: {layerNumber}</b></>}
            <br />
            <div style={{ width: 350 }}>
                File: <input style={{ width: 310 }} onChange={(e) => setfilename(e.target.value)} value={filename}></input>
                <br />
                <button className='palyButton' onClick={palytocaspar}> Play</button>
                <button className='palyButton' onClick={updateTocaspar}> Update</button>
                <button className='palyButton' onClick={updateInPreview}>update In Preview</button>


                <button className='stopButton' onClick={() => endpoint(`pause ${channelNumber ? channelNumber : window.chNumber}-${layerNumber} sheet.sequence.pause()`)}>Pause</button>
                <button className='stopButton' onClick={() => endpoint(`resume ${channelNumber ? channelNumber : window.chNumber}-${layerNumber} sheet.sequence.play()`)}>Resume</button>
                <button className='stopButton' onClick={() => endpoint(`stop ${channelNumber ? channelNumber : window.chNumber}-${layerNumber}`)}>Stop</button>

            </div>
            <button onClick={refreshTemplate}>Refresh Template</button>{searchedTemplate.length} files<br />
            <span>search:</span><input style={{ width: 310 }} type='text' onChange={e => setSearchText(e.target.value)} />
            <div style={{ maxHeight: 270, maxWidth: 370, overflow: 'scroll' }}>
                <table border='1' >
                    <tbody>
                        {searchedTemplate.map((val, i) => {
                            return <tr key={uuidv4()}><td
                                style={{ backgroundColor: currentFileinlist === i ? 'green' : 'white', color: currentFileinlist === i ? 'white' : 'black' }}
                                onClick={(e) => {
                                    setfilename(((e.target.innerText).replaceAll('\\', '/')).split('.')[0]);
                                    setCurrentFileinlist(i);
                                    const data = { filePath: e.target.innerText };
                                    axios.post(address1 + '/readfile', data).then((aa) => {
                                        // dispatch({ type: 'CHANGE_TEMPLATE', payload: aa.data })
                                        processContent(aa.data);
                                        setTemplateName(((e.target.innerText).replaceAll('\\', '/')).split('.')[0])
                                    }).catch((aa) => { console.log('Error', aa) });
                                }
                                }>{val}</td></tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TemplateController
