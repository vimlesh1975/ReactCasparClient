import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const Test = () => {
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const [xx, setXx] = useState('दूरदर्शन से विमलेश कुमार Vimlesh Kumar From Doordarshan 123')
    const test = () => {
        canvas.getActiveObjects().forEach(element => {
            // console.log('width', element.width, 'scalex', element.scaleX)
            // const aa = (element.width)
            const aa = (element.width) * (element.scaleX);
            element.set({ text: xx })
            if (element.width > aa) { element.scaleToWidth(aa) }

        })
        canvas.requestRenderAll();

    }
    return (
        <div>
            <input type='text' style={{ width: 500 }} value={xx} onChange={e => {
                setXx(e.target.value)


            }} />  <button on onClick={test}>Test</button>

        </div>
    )
}

export default Test
