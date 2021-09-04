import Draggable from 'react-draggable';

import { useRef, useEffect } from 'react';
import { textIntro } from "./Animate";
import { useSelector } from 'react-redux';
import { endpoint } from './common'

export default function Oneliner({ f0, cahngeText, color, backgroundColor }) {
    const style1 = useSelector(state => state.style1Reducer.style1)
    let intro = useRef(null)
    useEffect(() => {
        textIntro(intro)
    }, [])

    const ddd = (e, data) => {
        endpoint(`mixer 1-101 fill ${data.x / 1024} ${data.y / 576} 1 1`)
    }

    return (<div>

        <Draggable onDrag={ddd} >
            <div id='oneliner' ref={(el) => (intro = el)} contentEditable functionname='setF0' onKeyUp={(e) => cahngeText(e)} className='graphic' suppressContentEditableWarning={true}
                style={{
                    left: '0px',
                    top: '0px',
                    whiteSpace: 'nowrap',
                    color: color ? color : style1.color,
                    backgroundColor: backgroundColor ? backgroundColor : style1.backgroundColor,
                }}
            >
                {f0}
            </div>

        </Draggable>


    </div>)
}
