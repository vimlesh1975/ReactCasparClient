import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { endpoint, templateLayers } from './common'

const Effects = () => {
    const [videoMixer, setVideoMixer] = useState('0.11 0 0.89 0.78');
    const [templateMixer, setTemplateMixer] = useState('-0.11 0 1.11 1.22');
    const [cued, setCued] = useState(false);
    const [applied, setApplied] = useState(false);

    const currentscreenSize = useSelector(state => state.currentscreenSizeReducer.currentscreenSize);
    const canvas = useSelector(state => state.canvasReducer.canvas);

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

    const stopLBandEffect = () => {
        endpoint(`mixer ${window.chNumber}-${1} fill 0 0 1 1 25 linear`);
        endpoint(`mixer ${window.chNumber}-${templateLayers.LBand} fill ${templateMixer} 25 linear`)
        endpoint(`mixer ${window.chNumber}-${templateLayers.LBand} opacity 0 25 linear`)
        setTimeout(() => {
            endpoint(`stop ${window.chNumber}-${templateLayers.LBand}`);
            endpoint(`mixer ${window.chNumber}-${templateLayers.LBand} clear`);
        }, 1000);
    }



    const sendLBandEffect = () => {
        endpoint(`mixer ${window.chNumber}-${templateLayers.LBand} opacity 1`)
        endpoint(`mixer ${window.chNumber}-${1} fill ${videoMixer} 25 linear`)
        endpoint(`mixer ${window.chNumber}-${templateLayers.LBand} fill 0 0 1 1 25 linear`)

    }
    const cueLBandEffect = () => {
        cueGraphics(canvas, templateLayers.LBand);
    }
    const cueGraphics = (canvas, layerNumber) => {
        canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
        endpoint(`play ${window.chNumber}-${layerNumber} [HTML] xyz.html`);
        endpoint(`call ${window.chNumber}-${layerNumber} "
            var bb = document.createElement('div');
            bb.style.perspective='1920px';
            bb.style.transformStyle='preserve-3d';
            document.body.appendChild(bb);
            var aa = document.createElement('div');
            aa.style.position='absolute';
            aa.innerHTML='${(canvas.toSVG()).replaceAll('"', '\\"')}';
            bb.appendChild(aa);
            document.body.style.margin='0';
            document.body.style.padding='0';
            aa.style.zoom=(${currentscreenSize * 100}/1024)+'%';
            document.body.style.overflow='hidden';
            "`);
        endpoint(`mixer ${window.chNumber}-${layerNumber} opacity 0`)
        endpoint(`mixer ${window.chNumber}-${layerNumber} fill ${templateMixer}`)
    }

    const hh = `<filter id="demo1"  x="0" y="0" width="100%" height="100%">
    <feSpecularLighting result="spec1"  specularExponent="12" lighting-color="yellow">
        <fePointLight x="0" y="0" z="14" >
             <animate attributeName="x" values="-240;240;240;-240;-240" keyTimes="0; 0.4; 0.5; 0.9; 1" dur="5s" repeatCount="indefinite" />
             <animate attributeName="y" values="-40;-40;40;40;-40" dur="5s" keyTimes="0; 0.4; 0.5; 0.9; 1" repeatCount="indefinite" />
    </fePointLight>
    </feSpecularLighting>
    <feComposite in="SourceGraphic" in2="spec1" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
  </filter>`

    const sendFilter = (layerNumber) => {
        endpoint(`call ${window.chNumber}-${layerNumber} "
        var dd = document.getElementsByTagName('defs')[0];
        dd.innerHTML='${hh.replaceAll('"', '\\"')}';
        "`);
        endpoint(`call ${window.chNumber}-${layerNumber} "
        document.getElementsByTagName('g')[0].style.filter='url(#demo1)';
        "`);
    }


    return (<div>

        <div style={{ border: '2px solid red' }}>
            <h3>L Band squeeze</h3>

            <div>    <button onClick={() => {
                setVideoMixer(`${((canvas.getActiveObjects())[0].left / 1024).toFixed(2)} 0 ${((1 - canvas.getActiveObjects()[0].left / 1024)).toFixed(2)} ${(canvas.getActiveObjects()[0].height * canvas.getActiveObjects()[0].scaleY / 576).toFixed(2)}`)
                setTemplateMixer(`${-((canvas.getActiveObjects())[0].left / 1024).toFixed(2)} 0 ${((1 + canvas.getActiveObjects()[0].left / 1024)).toFixed(2)} ${(2 - canvas.getActiveObjects()[0].height * canvas.getActiveObjects()[0].scaleY / 576).toFixed(2)}`)
            }}>Get Video Position by selected element</button>
            </div>
            <div> video mixer: <input disabled value={videoMixer} onChange={e => setVideoMixer(e.target.value)} /></div>
            <div>
                L Band Effect=
                {!cued && <button onClick={() => {
                    cueLBandEffect(templateLayers.solidCaption1);
                    setTimeout(() => {
                        setCued(true);
                    }, 2500);
                }}>Cue</button>}
                {cued && !applied && <button onClick={() => {
                    sendLBandEffect(templateLayers.solidCaption1);
                    setTimeout(() => {
                        setApplied(true);
                    }, 1000);

                }}> Apply</button>}
                {cued && applied && <button onClick={() => {
                    stopLBandEffect(templateLayers.solidCaption1);
                    setCued(false);
                    setApplied(false);
                }}>Stop</button>}
            </div>
            <div>  </div>

        </div>

        <div style={{ border: '2px solid red' }}>
            <h3>Effects on solid cap 1</h3>
            <div>
                <p>Duration: <input style={{ width: 50 }} type='number' min={0} max={2} step='0.25' value={blinkingDuration} onChange={e => setBlinkingDuration(e.target.value)} /></p>
                Blinking Effect =  <button onClick={() => sendBlinkingEffect(templateLayers.solidCaption1)}> Apply</button>
            </div>
            <div>
                Text Size Effect =<button onClick={() => sendSizeEffect(templateLayers.solidCaption1)}>Apply</button>
            </div>
            <div>
                Text Color Effect= <button onClick={() => sendColorEffect(templateLayers.solidCaption1)}> Apply</button>
            </div>

        </div>
        <div style={{ border: '2px solid red' }}>
            <h3>Filter Effects on solid cap 1</h3>
            Moving Light Effect= <button onClick={() => sendFilter(templateLayers.solidCaption1)}> Apply</button>

        </div>

    </div>)
}

export default Effects