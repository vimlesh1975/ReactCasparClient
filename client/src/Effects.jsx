import React, { useState } from 'react'
import { endpoint, templateLayers } from './common'

const Effects = () => {
    const [blinkingDuration, setBlinkingDuration] = useState(1)
    const sendBlinkingEffect = (layerNumber) => {
        const inAnimation = `@keyframes example {50% {opacity:0}} div {animation:example ${blinkingDuration}s linear infinite; }`
        endpoint(`call ${window.chNumber}-${layerNumber} "
        style.textContent = '${inAnimation}';
        "`)
    }
    const sendSizeEffect = (layerNumber) => {
        const inAnimation = `@keyframes example {
        0% { font-size: 25px; }
        100% { font-size: 35px; }
       }
         text {animation:example ${blinkingDuration}s infinite alternate; }`
        endpoint(`call ${window.chNumber}-${layerNumber} "
        style.textContent = '${inAnimation}';
        "`)
    }
    const sendColorEffect = (layerNumber) => {
        const inAnimation = ` @keyframes example {
            0%{ fill:red}
            50%{fill:yellow}
            75%{fill:blue}
            100%  { fill:green}
        }
            text {animation: example ${blinkingDuration}s linear infinite}`
        endpoint(`call ${window.chNumber}-${layerNumber} "
        style.textContent = '${inAnimation}';
        "`)
    }
    
    return (<div>
        <h3>Effects on solid cap 1</h3>
        <div>
            <p>Duration: <input style={{ width: 50 }} type='number' min={0} max={2} step='0.25' value={blinkingDuration} onChange={e => setBlinkingDuration(e.target.value)} /></p>
            Blinking Effect =  <button onClick={() => sendBlinkingEffect(templateLayers.solidCaption1)}> Apply</button>
        </div>
        <div>
        Text Size Effect =<button onClick={() => sendSizeEffect(templateLayers.solidCaption1)}> Apply</button>
        </div>
        <div>
        Text Color Effect= <button onClick={() => sendColorEffect(templateLayers.solidCaption1)}> Apply</button>
        </div>
    </div>)
}

export default Effects