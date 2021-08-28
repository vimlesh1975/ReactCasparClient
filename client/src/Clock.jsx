import Draggable from 'react-draggable'; // Both at the same time
import { textIntro } from "./Animate";
import React, { useState, useEffect, useRef } from 'react';
import { endpoint } from './common'


export default function Clock() {

    const locale = 'en';
    const [today, setDate] = useState(new Date());
    const ddd = (e, data) => {
        endpoint(`mixer 1-105 fill ${data.x / 1024} ${data.y / 576} 1 1`)
    }
    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date());
        }, 1000);
        return () => {
            clearInterval(timer);
        }
    }, []);
    const time = today.toLocaleTimeString(locale, { hour: 'numeric', hour12: false, minute: 'numeric', second: 'numeric' });
    let intro = useRef(null)
    useEffect(() => {
        textIntro(intro)
    }, [])
    return (
        <Draggable onDrag={ddd}>
            <div id='clock' ref={(el) => (intro = el)} className='graphic'
                style={{
                    left: '0px',
                    top: '0px',

                }}
            >
                {time}
            </div>
        </Draggable>
    )
}
