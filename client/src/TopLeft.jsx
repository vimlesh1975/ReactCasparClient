import React, { useEffect, useRef } from 'react'
import Draggable from 'react-draggable';
import { textIntro } from "./Animate";
import { endpoint } from './common'

const TopLeft = ({ f0, cahngeText }) => {
    let intro = useRef(null)
    useEffect(() => {
        textIntro(intro)
    }, [])
    const ddd = (e, data) => {
        endpoint(`mixer 1-103 fill ${data.x / 1024} ${data.y / 576} 1 1`)
    }
    return (<>
        <Draggable onDrag={ddd} >
            <div ref={(el) => (intro = el)} contentEditable functionname='setF0' onKeyUp={(e) => cahngeText(e)} className='graphic' suppressContentEditableWarning={true}
                style={{
                    left: '0px',
                    top: '0px',

                }}
            >
                {f0}
            </div>
        </Draggable >
    </>)
}
export default TopLeft
