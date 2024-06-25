import React, { } from 'react'
import { Upload } from './common'
import { useSelector } from 'react-redux'
import ImageFilterController from './ImageFilterController'

const Images = () => {
    const canvas = useSelector(state => state.canvasReducer.canvas);
    return (<div>
        <div className='drawingToolsRow' >
            <b> Image from Local PC: </b>
            <input multiple type="file" accept="image/*" onChange={(e) => Upload(e, canvas)} />
        </div>
        <ImageFilterController />
    </div>)
}

export default Images
