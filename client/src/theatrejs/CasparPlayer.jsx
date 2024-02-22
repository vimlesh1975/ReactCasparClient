import React, { useState } from 'react'
import { FaPlay, FaPause, FaStop } from "react-icons/fa";
import { stopGraphics1, updateText, endpoint, executeScript } from '../common'
import { useSelector } from 'react-redux'

const loopDirection = ['normal', 'reverse', 'alternate', 'AR']
const loopcount = 1;


const CasparPlayer = ({ playtoCasparcg, layerNumber }) => {
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const canvasList = useSelector(state => state.canvasListReducer.canvasList);
    const currentPage = useSelector(state => state.currentPageReducer.currentPage);
    const [duration, setDuration] = useState(1);
    const [outDuration, setOutDuration] = useState(1);
    // const [loopcount, setLoopcount] = useState(1);
    const [mypage, setMypage] = useState('');
    const [loopAnimationStart, setLoopAnimationStart] = useState(0);
    const [loopAnimationEnd, setLoopAnimationEnd] = useState(1.5);
    const [enableLoopAnimation, setEnableLoopAnimation] = useState(true);

    const [selectedOption, setSelectedOption] = useState('alternate');

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const play = (layerNumber) => {
        setMypage(canvasList[currentPage]?.pageName);

        window.sheet.sequence.position = 0;
        setTimeout(() => {
            playtoCasparcg(layerNumber, loopcount, duration, enableLoopAnimation, loopAnimationStart, loopAnimationEnd, selectedOption);
        }, 100);

    }
    const pause = layerNumber => {
        endpoint(`call ${window.chNumber}-${layerNumber} window.sheet.sequence.pause()`);
        executeScript(`window.sheet_${layerNumber}.sequence.pause()`);
    }
    const resume = layerNumber => {
        if (enableLoopAnimation) {
            endpoint(`call ${window.chNumber}-${layerNumber} window.sheet.sequence.play({ iterationCount: Infinity, range: [${loopAnimationStart},${loopAnimationEnd}] ,direction: '${selectedOption}' });
        `)
            executeScript(`window.sheet_${layerNumber}.sequence.play({ iterationCount: Infinity, range: [${loopAnimationStart},${loopAnimationEnd}] ,direction: '${selectedOption}'})`);

        }
        else {
            endpoint(`call ${window.chNumber}-${layerNumber} window.sheet.sequence.play({ iterationCount: ${(parseInt(loopcount) === 0) ? Infinity : parseInt(loopcount)}, range: [0, ${duration}] });
        `)
            executeScript(`window.sheet_${layerNumber}.sequence.play({ iterationCount: ${(parseInt(loopcount) === 0) ? Infinity : parseInt(loopcount)}, range: [0, ${duration}] })`);
        }
    }

    const gotoAndReversePlayAndStop = (layerNumber, isstop, isReverse) => {
        endpoint(` call ${window.chNumber}-${layerNumber} "
        window.sheet.sequence.position=${outDuration}; 
        window.sheet.sequence.play({ direction: \`${isReverse ? 'reverse' : 'normal'}\` });
         "`);
        executeScript(`
        window.sheet_${layerNumber}.sequence.position=${outDuration}; 
        window.sheet_${layerNumber}.sequence.play({ direction: \`${isReverse ? 'reverse' : 'normal'}\`  });
        `);
        if (isstop) {
            setMypage('');

            setTimeout(() => {
                endpoint(`stop ${window.chNumber}-${layerNumber}`);
            }, outDuration * 1000);
            setTimeout(() => {
                executeScript(` document.getElementById('divid_${layerNumber}')?.remove(); `);
            }, outDuration * 1000);
        }
    }

    return (
        <div style={{ border: '1px solid red', margin: 5, padding: 5 }}>
            <div>
                <button onClick={() => play(layerNumber)}><FaPlay /></button>
                <button onClick={() => pause(layerNumber)}><FaPause /></button>
                <button title='Resume' onClick={() => resume(layerNumber)}><FaPause /><FaPlay /></button>
                <button title='Update Text' onClick={() => {
                    updateText(canvas, layerNumber)
                }}>Update</button>

                <button title='Reverse Play and Remove' onClick={() => stopGraphics1(layerNumber)}><FaStop /></button>
                <span title='Duration'>D:</span><input title='Time in second' type="number" value={duration} style={{ width: 40 }} onChange={e => setDuration(e.target.value)} />
                <label>Layer: {layerNumber}</label>
                {/* <span title="Loop">L:</span><input title="Put 0 for Infinity" type="number" value={loopcount} style={{ width: 30 }} onChange={e => setLoopcount(e.target.value)} /> */}
            </div>
            <div>
                <input type='checkbox' checked={enableLoopAnimation} onChange={() => setEnableLoopAnimation(val => !val)} /><span>Enable Loop Anim</span>
                <span >Start:</span><input title='Time in second' type="number" value={loopAnimationStart} style={{ width: 30 }} onChange={e => { if (e.target.value < loopAnimationEnd) setLoopAnimationStart(e.target.value) }} />
                <span >End:</span><input title='Time in second' type="number" value={loopAnimationEnd} style={{ width: 35 }} onChange={e => { if (e.target.value > loopAnimationStart) setLoopAnimationEnd(e.target.value) }} />
            </div>
            <div>
                {loopDirection.map((option, index) => (
                    <label key={index}>
                        <input
                            type="radio"
                            value={option}
                            checked={selectedOption === option}
                            onChange={handleOptionChange}
                        />
                        {option}
                    </label>
                ))}
            </div>
            {(mypage !== '') && <div>
                <div >
                    <button onClick={() => gotoAndReversePlayAndStop(layerNumber, false, false)}>GotoAndPlay</button>
                    <span title='outDuration'>D:</span><input title='Time in second' type="number" value={outDuration} style={{ width: 40 }} onChange={e => setOutDuration(e.target.value)} />
                    <button onClick={() => gotoAndReversePlayAndStop(layerNumber, false, true)}>GotoAndReversePlay</button>
                </div>
                <div >
                    <button onClick={() => gotoAndReversePlayAndStop(layerNumber, true, false)}>GotoAndPlay + Stop</button>
                    <button onClick={() => gotoAndReversePlayAndStop(layerNumber, true, true)}>GotoAndReversePlay + Stop</button>
                </div>

            </div>}
            <div style={{ fontSize: 20, fontWeight: 'bold' }}>{mypage}</div>
        </div>
    )
}

export default CasparPlayer