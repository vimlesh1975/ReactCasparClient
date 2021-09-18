import Draggable from 'react-draggable'; // Both at the same time
import { useRef } from 'react';
import { textIntro } from "./Animate";
import React, { useState, useEffect } from 'react';
import { endpoint } from './common'

export default function Scroll({ f0 = 'Test scroll' }) {
    const [xposition, setXposition] = useState(100);
    const [speed, setSpeed] = useState(0.05)
    const [oldSpeed, setOldSpeed] = useState(0.05)
    const ddd = (e, data) => {
        endpoint(`mixer ${window.chNumber}-104 fill ${data.x / 1024} ${data.y / 576} 1 1`)
    }
    useEffect(() => {
        const timer = setInterval(() => {
            var aa = document.getElementById('scroll');
            if ((aa.offsetWidth + aa.offsetLeft) < 0) {
                setXposition(100)
            }
            setXposition(val => val - speed)
        }, 1);
        return () => {
            clearInterval(timer);
        }
    }, [speed]);

    let intro = useRef(null)
    useEffect(() => {
        textIntro(intro)
    }, [])
    let intro1 = useRef(null)
    useEffect(() => {
        textIntro(intro1)
    }, [])

    window.pauseScroll = () => {
        setOldSpeed(speed);
        setSpeed(0)
    }
    window.resumeScroll = () => {
        setSpeed(oldSpeed)
    }
    window.setSpeed = setSpeed

    return (
        <>
            <Draggable axis='y' onDrag={ddd} >
                <div >

                    <div ref={(el) => (intro = el)} className='graphic'
                        style={{
                            left: 0 + '%',
                            top: '0px',
                            width: '100%',
                            height: '6vh',
                            padding: '5px 0px 5px 0px',
                        }}
                    >
                    </div>

                    <div ref={(el) => (intro1 = el)} className='graphic' id='scroll'
                        style={{
                            left: xposition + '%',
                            top: '0px',
                            backgroundColor: 'transparent',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {f0}
                    </div>

                </div>
            </Draggable>
        </>
    )
}
