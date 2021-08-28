import React, { useRef, useEffect } from 'react'
import Draggable from 'react-draggable'; // Both at the same time
import { textIntro } from "./Animate";
import { endpoint } from './common'


const Twoliner = ({ f0, f1, cahngeText }) => {
    let intro = useRef(null)
    useEffect(() => {
        textIntro(intro)
    }, [])

    const ddd = (e, data) => {
        endpoint(`mixer 1-102 fill ${data.x / 1024} ${data.y / 576} 1 1`)
    }


    return (
        <Draggable onDrag={ddd} >
            <div ref={(el) => (intro = el)} className='graphic'
                style={{
                    left: '0px',
                    top: '0px',
                    border: '2px solid white',

                }}
            >
                <div contentEditable suppressContentEditableWarning={true} functionname='setF0' onKeyUp={(e) => cahngeText(e)}> {f0}</div>
                <div contentEditable suppressContentEditableWarning={true} functionname='setF1' onKeyUp={(e) => cahngeText(e)}> {f1}</div>
            </div>
        </Draggable>
    )
}

export default Twoliner
