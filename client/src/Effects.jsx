import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { endpoint, templateLayers } from './common'

const Effects = () => {
    const [videoMixer, setVideoMixer] = useState('0.11 0 0.89 0.78')
    const [templateMixerMixer, setTemplateMixerMixer] = useState('-0.11 0 1.11 1.22')
    const [templateLoadingDelay, setTemplateLoadingDelay] = useState(2500)

    
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

        // endpoint(`mixer ${window.chNumber}-${templateLayers.solidCaption1} fill -.31 0 2.4 1.35 50 linear`)
        endpoint(`mixer ${window.chNumber}-${templateLayers.solidCaption1} fill ${templateMixerMixer} 25 linear`)
        endpoint(`mixer ${window.chNumber}-${templateLayers.solidCaption1} opacity 0 25 linear`)
        setTimeout(() => {
            endpoint(`stop ${window.chNumber}-${templateLayers.solidCaption1}`);
            endpoint(`mixer ${window.chNumber}-${templateLayers.solidCaption1} clear`);
        }, 1000);
    }



    const sendLBandEffect = () => {
        startGraphics(canvas, templateLayers.solidCaption1);

        setTimeout(() => {
            endpoint(`mixer ${window.chNumber}-${1} fill ${videoMixer} 25 linear`)
        }, templateLoadingDelay);

    }

    const startGraphics = (canvas, layerNumber) => {
        var inAnimation;
        inAnimation = `@keyframes slide-in-bck-center{0%{transform:translateZ(600px);opacity:1}100%{transform:translateZ(0);opacity:1}} div {animation:slide-in-bck-center 0.7s cubic-bezier(.25,.46,.45,.94) both}`
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
            var style = document.createElement('style');
            style.textContent = '${inAnimation}';
            document.head.appendChild(style);
            "`)
    }


    return (<div>

        <div style={{ border: '2px solid red' }}>
            <h3>L Band squeeze</h3>

            <div>    <button onClick={() => {
                setVideoMixer(`${((canvas.getActiveObjects())[0].left / 1024).toFixed(2)} 0 ${((1 - canvas.getActiveObjects()[0].left / 1024)).toFixed(2)} ${(canvas.getActiveObjects()[0].height * canvas.getActiveObjects()[0].scaleY / 576).toFixed(2)}`)
                setTemplateMixerMixer(`${-((canvas.getActiveObjects())[0].left / 1024).toFixed(2)} 0 ${((1 + canvas.getActiveObjects()[0].left / 1024)).toFixed(2)} ${(2 - canvas.getActiveObjects()[0].height * canvas.getActiveObjects()[0].scaleY / 576).toFixed(2)}`)
            }}>Get Video Position by selected element</button>
            </div>
            <div> video mixer: <input value={videoMixer} onChange={e => setVideoMixer(e.target.value)} /></div>
            <div>   template mixer: <input value={templateMixerMixer} onChange={e => setTemplateMixerMixer(e.target.value)} /></div>
            <div>   template loading Delay: <input value={templateLoadingDelay} onChange={e => setTemplateLoadingDelay(e.target.value)} /></div>
            <div>
                L Band Effect= <button onClick={() => sendLBandEffect(templateLayers.solidCaption1)}> Apply</button>
                <button onClick={() => stopLBandEffect(templateLayers.solidCaption1)}>Stop</button>
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
                Text Size Effect =<button onClick={() => sendSizeEffect(templateLayers.solidCaption1)}>Play L Band with Effect</button>
            </div>
            <div>
                Text Color Effect= <button onClick={() => sendColorEffect(templateLayers.solidCaption1)}> Apply</button>
            </div>

        </div>

    </div>)
}

export default Effects