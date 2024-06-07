import React, { useEffect, useState } from 'react'
import { endpoint, executeScript } from './common';

const Mixer = ({ layer, setLayer, layerVisisble }) => {
    const [x, setX] = useState(0.00);
    const [y, setY] = useState(0.00);
    const [scaleX, setScaleX] = useState(1.00);
    const [scaleY, setScaleY] = useState(1.00);

    useEffect(() => {
        endpoint(`mixer ${window.chNumber}-${layer} fill ${x} ${y} ${scaleX} ${scaleY} `);
        const script = `
        const element = document.getElementById('divid_${layer}');
        element.style.transformOrigin = 'top left';
        element.style.transform = \`translate(${x * 1920}px, ${y * 1080}px) scale(${scaleX}, ${scaleY})\`;
        `
        executeScript(`${script}`)
    }, [x, y, scaleX, scaleY, layer])
    return (
        <div style={{ border: '1px solid red', margin: 10 }}>
            <label>Mixer fill: </label>
            <div style={{ display: layerVisisble ? '' : 'none' }}>
                <label>layer: </label> <input style={{ width: 50 }} type='number' value={layer} onChange={e => {
                    setLayer(e.target.value);
                }} />
            </div>

            <div>
                <label>X: </label> <input max={2} step="0.01" style={{ width: 50 }} type='number' value={x} onChange={e => {
                    setX(e.target.value);
                }} />
                <label>Y: </label> <input max={2} step="0.01" style={{ width: 50 }} type='number' value={y} onChange={e => {
                    setY(e.target.value);
                }
                } />
            </div>
            <div>
                <label>scaleX: </label> <input step="0.01" style={{ width: 50 }} type='number' value={scaleX} onChange={e => {
                    setScaleX(e.target.value);
                }} />
                <label>scaleY: </label> <input step="0.01" style={{ width: 50 }} type='number' value={scaleY} onChange={e => {
                    setScaleY(e.target.value);
                }} />
            </div>

            <div>
                <button onClick={() => {
                    setX(0);
                    setY(0);
                    setScaleX(1);
                    setScaleY(1);
                }}> Reset</button>
            </div>

        </div>
    )
}

export default Mixer
