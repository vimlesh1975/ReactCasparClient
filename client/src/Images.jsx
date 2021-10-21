import React, { useState } from 'react'
import { addRoundedCornerImage, Upload } from './DrawingController'
import axios from 'axios'
import { address1 } from './common'
import { useDispatch, useSelector } from 'react-redux'

const Images = () => {
    const dispatch = useDispatch();
    const media = useSelector(state => state.mediaReducer.media)
    const [searchText2, setSearchText2] = useState('');
    const onlineImageUrl = useSelector(state => state.onlineImageUrleReducer.onlineImageUrl);
    const canvas = useSelector(state => state.canvasReducer.canvas);

    const imageName = useSelector(state => state.imageNameReducer.imageName)

    const searchedMedia2 = media.filter((value) => {
        return (value.toLowerCase().search(searchText2.toLowerCase()) > -1)
    })
    const refreshMedia = () => {
        axios.post(address1 + '/getmedia').then((aa) => {
            dispatch({ type: 'CHANGE_MEDIA', payload: aa.data })
        }).catch((aa) => { console.log('Error', aa) });
    }
  

    return (<div>
        <div>
            <b> Image from URL: </b>
            <input onChange={(e) => dispatch({ type: 'CHANGE_ONLINEIMAGE_URL', payload: e.target.value })} size="55" type='text' defaultValue={onlineImageUrl}></input>
            <button onClick={() => addRoundedCornerImage(canvas, onlineImageUrl)}>Add Rounded Rectange Image</button>
        </div>
        <div className='drawingToolsRow' >
            <b> Image from Local PC: </b>
            <input type="file" accept="image/*" onChange={(e) => Upload(e, canvas)} />
        </div>

        <div>
            <button onClick={refreshMedia}>Refresh Media</button>{searchedMedia2.length} files<br />
            <span>search:</span><input type='text' onChange={e => setSearchText2(e.target.value)} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ maxHeight: '160px', maxWidth: '330px', overflow: 'scroll', border: '1px solid red' }}>
                    <table border='1' >
                        <tbody>
                            {searchedMedia2.map((val, i) => {
                                return <tr key={i}><td onClick={(e) => {
                                    // setImageName(address1 + `/media/` + e.target.innerText);
                                    dispatch({ type: 'CHANGE_IMAGENAME', payload: address1 + `/media/` + e.target.innerText })
                                }}>{val}</td></tr>
                            })}
                        </tbody>
                    </table>
                </div>
                <div style={{ border: '1px solid red', display: 'flex', alignContent: 'center', alignItems: 'center' }}>
                    <div>
                        <img src={imageName} alt='' width="90" height="60" style={{ border: '1px solid #555' }}></img>
                    </div>
                    <div>
                        Selected Image<br />
                        <button onClick={() => addRoundedCornerImage(canvas, imageName)}>Add Image</button>

                    </div>
                </div>
            </div>
        </div>

    </div>)
}

export default Images
