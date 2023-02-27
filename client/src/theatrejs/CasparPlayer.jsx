import React, { useState } from 'react'
import { FaPlay, FaPause, FaStop } from "react-icons/fa";
import { endpoint, executeScript } from '../common'
import { useSelector } from 'react-redux'

const CasparPlayer = ({ playtoCasparcg, layerNumber }) => {

    const canvasList = useSelector(state => state.canvasListReducer.canvasList);
    const currentPage = useSelector(state => state.currentPageReducer.currentPage);
    const [duration, setDuration] = useState(1);
    const [outDuration, setOutDuration] = useState(0.5);
    const [loopcount, setLoopcount] = useState(1);
    const [mypage, setMypage] = useState('');

    const play = (layerNumber) => {
        setMypage(canvasList[currentPage]?.pageName);

        window.sheet.sequence.position = 0;
        setTimeout(() => {
            playtoCasparcg(layerNumber, loopcount, duration);
        }, 100);
    }
    const pause = layerNumber => {
        endpoint(`call 1-${layerNumber} window.sheet.sequence.pause()`);
        executeScript(`window.sheet_${layerNumber}.sequence.pause()`);
    }
    const resume = layerNumber => {
        endpoint(`call 1-${layerNumber} window.sheet.sequence.play({ iterationCount: ${(parseInt(loopcount) === 0) ? Infinity : parseInt(loopcount)}, range: [0, ${duration}] });
        `)
        executeScript(`window.sheet_${layerNumber}.sequence.play({ iterationCount: ${(parseInt(loopcount) === 0) ? Infinity : parseInt(loopcount)}, range: [0, ${duration}] })`);
    }
    const stopGraphics1 = (layerNumber) => {
        setMypage('');

        endpoint(` call 1-${layerNumber} window.sheet.sequence.play({ direction: 'reverse' }); `);
        setTimeout(() => {
        endpoint(`stop 1-${layerNumber}`);
        }, duration * 1000);

        executeScript(`window.sheet_${layerNumber}.sequence.play({ direction: 'reverse' });`);
        setTimeout(() => {
            executeScript(` document.getElementById('divid_${layerNumber}')?.remove(); `);
        }, duration * 1000);

    }

    // const stopAll = () => {
    //     layers.forEach((layerNumber) => {
    //         stopGraphics1(layerNumber);
    //     })
    // }

    const gotoAndReversePlayAndStop = (layerNumber, isstop, isReverse) => {
        endpoint(` call 1-${layerNumber} "
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
                endpoint(`stop 1-${layerNumber}`);
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
                <button title='Reverse Play and Remove' onClick={() => stopGraphics1(layerNumber)}><FaStop /></button>
                <span title='Duration'>D:</span><input title='Time in second' type="number" value={duration} style={{ width: 40 }} onChange={e => setDuration(e.target.value)} />
                <span title="Loop">L:</span><input title="Put 0 for Infinity" type="number" value={loopcount} style={{ width: 30 }} onChange={e => setLoopcount(e.target.value)} />
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