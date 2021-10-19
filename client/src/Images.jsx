import React, { useState, useEffect } from 'react'
import { addRoundedCornerImage, Upload } from './DrawingController'
import axios from 'axios'
import { address1 } from './common'
import { useDispatch, useSelector } from 'react-redux'

const Images = () => {
    const dispatch = useDispatch();
    const media = useSelector(state => state.mediaReducer.media)
    const [searchText2, setSearchText2] = useState('');
    const [onlineImageUrl, setOnlineImageUrl] = useState('https://fixthephoto.com/images/content/shirt-fabric-texture-471614080378.jpg')
    const [imageName, setImageName] = useState(`http://${window.location.host}${process.env.PUBLIC_URL}/img/pine-wood-500x500.jpg`)

    const searchedMedia2 = media.filter((value) => {
        return (value.toLowerCase().search(searchText2.toLowerCase()) > -1)
    })
    const refreshMedia = () => {
        axios.post(address1 + '/getmedia').then((aa) => {
            dispatch({ type: 'CHANGE_MEDIA', payload: aa.data })
        }).catch((aa) => { console.log('Error', aa) });
    }
    useEffect(() => {
        window.imageName = imageName;
        return () => {
            // cleanup
        }
    }, [imageName])

    return (<div>
        <div>
            <b> Image from URL: </b>
            <input onChange={(e) => setOnlineImageUrl(e.target.value)} size="55" type='text' defaultValue={onlineImageUrl}></input>
            <button onClick={() => addRoundedCornerImage(window.editor.canvas, onlineImageUrl)}>Add Rounded Rectange Image</button>
        </div>
        <div className='drawingToolsRow' >
            <b> Image from Local PC: </b>
            <input type="file" accept="image/*" onChange={e => Upload(e)} />
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
                                    setImageName((address1 + `/media/` + e.target.innerText));
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
                        <button onClick={() => addRoundedCornerImage(window.editor.canvas, window.imageName)}>Add Image</button>
                    </div>
                </div>
            </div>
        </div>

    </div>)
}

export default Images
