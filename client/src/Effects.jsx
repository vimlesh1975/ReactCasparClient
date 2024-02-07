import React, { useState } from 'react'
import { useRef } from 'react';
import { useSelector } from 'react-redux'
import { endpoint, templateLayers, executeScript } from './common'
import { animation } from './animation.js'
import { v4 as uuidv4 } from 'uuid';
import * as d3 from 'd3';
import SvgFilter from 'svg-filter';
import animateJson from './data/animate2.json';
import css from 'css';

const Effects = () => {

    const showCss = (x) => {
        let cssObject = JSON.parse(JSON.stringify(animateJson));
        cssObject.stylesheet.rules = cssObject.stylesheet.rules.map((e) => {
            if (e.name === x) {
                return e
            }
            else if (e.selectors && e.selectors.indexOf(".animate__" + x) > -1) {
                return e
            }
            else if (e.selectors && e.selectors.indexOf(".animate__animated") > -1) {
                return e
            }
            else if (e.selectors && e.selectors.indexOf(":root") > -1) {
                return e
            }
            else {
                return undefined
            }
        }).filter((e) => e !== undefined)

        d3.selectAll('#kkk').selectAll("style").remove();
        d3.selectAll('#kkk')
            .append('style')
            .text(css.stringify(cssObject))
        refkkk.current.className = "";
        refkkk.current.classList.add('animate__animated', "animate__" + x);
        return null;
    }

    const [effect1, seteffec1] = useState('bounce')
    const [videoMixer, setVideoMixer] = useState('0.12 0 0.88 0.77');
    const [templateMixer, setTemplateMixer] = useState('-0.12 0 1.12 1.23');
    const [cued, setCued] = useState(false);
    const [applied, setApplied] = useState(false);
    const refkkk = useRef();
    const currentscreenSize = useSelector(state => state.currentscreenSizeReducer.currentscreenSize);
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const [canvasHtml, setCanvasHtml] = useState(false);
    const [hBlur, setHBlur] = useState(0);
    const [vBlur, setVBlur] = useState(0);

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
        executeScript(`document.getElementById('divid_${layerNumber}')?.remove()`);

        canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
        endpoint(`play ${window.chNumber}-${layerNumber} [HTML] https://localhost:10000/ReactCasparClient/xyz.html`);
        const script = `
        var bb = document.createElement('div');
        bb.style.perspective='1920px';
        bb.style.transformStyle='preserve-3d';
        document.body.appendChild(bb);
        var aa = document.createElement('div');
        aa.style.position='absolute';
        aa.setAttribute('id','divid_' + '${layerNumber}');
        aa.style.zIndex = ${layerNumber};
        aa.innerHTML=\`${(canvas.toSVG()).replaceAll('"', '\\"')}\`;
        bb.appendChild(aa);
        document.body.style.margin='0';
        document.body.style.padding='0';
        aa.style.zoom=(${currentscreenSize * 100}/1920)+'%';
        document.body.style.overflow='hidden';
        `
        executeScript(script);

        endpoint(`call ${window.chNumber}-${layerNumber} "
        ${script}
          
            "`);
        endpoint(`mixer ${window.chNumber}-${layerNumber} opacity 0`)
        endpoint(`mixer ${window.chNumber}-${layerNumber} fill ${templateMixer}`)
    }
    const startGraphics = (canvas, layerNumber) => {
        executeScript(`document.getElementById('divid_${layerNumber}')?.remove()`);

        var inAnimation;

        if (window.inAnimationMethod === 'mix') {
            inAnimation = `@keyframes example {from {opacity:0} to {opacity:1}} div {animation-name: example;  animation-duration: .5s; }`
        }

        else if (((animation.map(val => val.name)).findIndex(val => val === window.inAnimationMethod)) !== -1) {
            inAnimation = animation[((animation.map(val => val.name)).findIndex(val => val === window.inAnimationMethod))].value;
        }

        else if (window.inAnimationMethod === 'lefttoright') {
            inAnimation = ``
            canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
            endpoint(`mixer ${window.chNumber}-${layerNumber} fill 0 0 0 1 6 ${window.animationMethod}`)

            setTimeout(() => {
                endpoint(`play ${window.chNumber}-${layerNumber} [HTML] https://localhost:10000/ReactCasparClient/xyz.html`);
            }, 250);

            const script = `
            var aa = document.createElement('div');
            aa.style.position='absolute';
            aa.setAttribute('id','divid_' + '${layerNumber}');
            aa.style.zIndex = ${layerNumber};
            aa.innerHTML=\`${(refkkk.current.innerHTML).replaceAll('"', '\\"')}\`;
            document.body.appendChild(aa);
            document.body.style.margin='0';
            document.body.style.padding='0';
            aa.style.zoom=(${currentscreenSize * 100}/1920)+'%';
            document.body.style.overflow='hidden';
            var style = document.createElement('style');
            style.textContent = '${inAnimation}';
            document.head.appendChild(style);
            `
            executeScript(script);

            setTimeout(() => {
                endpoint(`call ${window.chNumber}-${layerNumber} "
            ${script}
           
            "`)
            }, 300);

            setTimeout(() => {
                endpoint(`mixer ${window.chNumber}-${layerNumber} fill 0 0 1 1 10 ${window.animationMethod}`)
            }, 800);
            //updateGraphics
            setTimeout(() => {
                endpoint(`call ${window.chNumber}-${layerNumber} "
                aa.innerHTML='${(refkkk.current.innerHTML).replaceAll('"', '\\"')}';
                    "`)
            }, 1100);
            return
        }

        canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
        endpoint(`play ${window.chNumber}-${layerNumber} [HTML] https://localhost:10000/ReactCasparClient/xyz.html`);

        const script = `
        var bb = document.createElement('div');
        bb.style.perspective='1920px';
        bb.style.transformStyle='preserve-3d';
        document.body.appendChild(bb);
        var aa = document.createElement('div');
        aa.style.position='absolute';
        aa.setAttribute('id','divid_' + '${layerNumber}');
        aa.style.zIndex = ${layerNumber};
        aa.innerHTML=\`${(refkkk.current.innerHTML).replaceAll('"', '\\"')}\`;
        bb.appendChild(aa);
        aa.classList.add('animate__animated', 'animate__${effect1}');
        document.body.style.margin='0';
        document.body.style.padding='0';
        aa.style.zoom=(${currentscreenSize * 100}/1920)+'%';
        document.body.style.overflow='hidden';
        `
        executeScript(script);

        endpoint(`call ${window.chNumber}-${layerNumber} "
        ${script}
         
            "`)
    }

    const sendFilter1 = (layerNumber) => {
        const uuid = uuidv4();
        const hh = `<filter id=${uuid} x="0" y="0" width="100%" height="100%">
        <feSpecularLighting result="spec1"  specularExponent="12" lighting-color="yellow">
            <fePointLight x="0" y="0" z="14" >
                 <animate attributeName="x" values="-${canvas?.getActiveObjects()[0]?.width / 2};${canvas?.getActiveObjects()[0]?.width / 2};${canvas?.getActiveObjects()[0]?.width / 2};-${canvas?.getActiveObjects()[0]?.width / 2};-${canvas?.getActiveObjects()[0]?.width / 2}" keyTimes="0; 0.4; 0.5; 0.9; 1" dur="5s" repeatCount="indefinite" />
                 <animate attributeName="y" values="-${canvas?.getActiveObjects()[0]?.height / 2};-${canvas?.getActiveObjects()[0]?.height / 2};${canvas?.getActiveObjects()[0]?.height / 2};${canvas?.getActiveObjects()[0]?.height / 2};-${canvas?.getActiveObjects()[0]?.height / 2}" keyTimes="0; 0.4; 0.5; 0.9; 1" dur="5s"repeatCount="indefinite" />
        </fePointLight>
        </feSpecularLighting>
        <feComposite in="SourceGraphic" in2="spec1" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
      </filter>`
        endpoint(`call ${window.chNumber}-${layerNumber} "
        var dd = document.getElementsByTagName('defs')[0];
        dd.innerHTML +='${hh.replaceAll('"', '\\"')}';
        document.getElementsByTagName('g')[${canvas.getObjects().indexOf(canvas?.getActiveObjects()[0])}].style.filter +='url(#${uuid} )';
        "`);
    }

    const sendFilter2 = (layerNumber) => {
        const uuid = uuidv4();
        const hh = `<filter id=${uuid}  x="0" y="0" width="100%" height="100%">
        <feSpecularLighting result="spec1"  specularExponent="12" lighting-color="yellow">
            <fePointLight x="0" y="0" z="14" >
                 <animate attributeName="x" values="-${canvas?.getActiveObjects()[0]?.width / 2};${canvas?.getActiveObjects()[0]?.width / 2 + 50};${canvas?.getActiveObjects()[0]?.width / 2 + 50}" keyTimes="0;0.5; 1" dur="3s" repeatCount="indefinite" />
        </fePointLight>
        </feSpecularLighting>
        <feComposite in="SourceGraphic" in2="spec1" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
      </filter>`
        endpoint(`call ${window.chNumber}-${layerNumber} "
        var dd = document.getElementsByTagName('defs')[0];
        dd.innerHTML +='${hh.replaceAll('"', '\\"')}';
        document.getElementsByTagName('g')[${canvas.getObjects().indexOf(canvas?.getActiveObjects()[0])}].style.filter +='url(#${uuid} )';
        "`);
    }

    const applyBlurFilter = (h, v) => {
        d3.select('defs').html("");
        var filter = new SvgFilter();

        filter
            .append('blur')
            .attr('stdDeviation', `${h} ${v}`);
        d3.selectAll('defs')
            .append('filter')
            .attr('id', filter.id)
            .html((filter.filter._groups[0][0].innerHTML).trim());
        canvas.getActiveObjects().forEach(element => {
            document.getElementById(element.id).style.filter = filter;
        });
    }

    const [specularExponent, setspecularExponent] = useState(12);
    const [lightingcolor, setlightingcolor] = useState('#ffff00');
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [z, setZ] = useState(14);

    const applySpeculerLightingFilter = () => {
        var filter = new SvgFilter();

        filter

            .append('feSpecularLighting')

            .attr('result', 'spec1')
            .attr('specularExponent', specularExponent)
            .attr('lighting-color', lightingcolor)
            .append('fePointLight')
            .attr('x', x)
            .attr('y', y)
            .attr('z', z);

        filter.append('feComposite')

            .attr('in', 'SourceGraphic')
            .attr('in2', 'spec1')
            .attr('operator', 'arithmetic')

            .attr('k1', 0)
            .attr('k2', 1)
            .attr('k3', 1)
            .attr('k4', 0)

        d3.select('defs').html("");
        d3.selectAll('defs')
            .append('filter')
            .attr('id', filter.id)
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', '100%')
            .attr('height', '100%')
            .html((filter.filter._groups[0][0].innerHTML).trim());
        canvas.getActiveObjects().forEach(element => {
            // document.getElementById(element.id).style.filter += filter;
            document.getElementById(element.id).style.filter = filter;
        });
    }

    return (<div>
        <div style={{ display: 'flex' }}>
            <div style={{ border: '2px solid red' }}>
                <b>L Band squeeze</b>
                <div><button onClick={() => {
                    setVideoMixer(`${((canvas.getActiveObjects())[0].left / 1920).toFixed(2)} 0 ${((1 - canvas.getActiveObjects()[0].left / 1920)).toFixed(2)} ${(canvas.getActiveObjects()[0].height * canvas.getActiveObjects()[0].scaleY / 1080).toFixed(2)}`)
                    setTemplateMixer(`${-((canvas.getActiveObjects())[0].left / 1920).toFixed(2)} 0 ${((1 + canvas.getActiveObjects()[0].left / 1920)).toFixed(2)} ${(2 - canvas.getActiveObjects()[0].height * canvas.getActiveObjects()[0].scaleY / 1080).toFixed(2)}`)
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
                <b>Effects on solid cap 1</b>
                <div>
                    <div>Duration: <input style={{ width: 50 }} type='number' min='0' max='2' step='0.25' value={blinkingDuration} onChange={e => setBlinkingDuration(e.target.value)} /></div>
                    Blinking Effect =  <button onClick={() => sendBlinkingEffect(templateLayers.solidCaption1)}> Apply</button>
                </div>
                <div>
                    Text Size Effect =<button onClick={() => sendSizeEffect(templateLayers.solidCaption1)}>Apply</button>
                </div>
                <div>
                    Text Color Effect= <button onClick={() => sendColorEffect(templateLayers.solidCaption1)}> Apply</button>
                </div>
                <div>Corner Light Effect <button onClick={() => sendFilter1(templateLayers.solidCaption1)}> Apply </button></div>
            </div>

            <div style={{ border: '2px solid red' }}>
                <div> horizontal Light Effect <button onClick={() => sendFilter2(templateLayers.solidCaption1)}> Apply </button></div>
                <div>
                    {effect1}
                    <select onChange={e => {
                        seteffec1(e.target.value);
                        showCss(e.target.value);
                    }}>
                        <optgroup label="Attention Seekers">
                            <option value="bounce">bounce</option>
                            <option value="flash">flash</option>
                            <option value="pulse">pulse</option>
                            <option value="rubberBand">rubberBand</option>
                            <option value="shakeX">shakeX</option>
                            <option value="shakeY">shakeY</option>
                            <option value="headShake">headShake</option>
                            <option value="swing">swing</option>
                            <option value="tada">tada</option>
                            <option value="wobble">wobble</option>
                            <option value="jello">jello</option>
                            <option value="heartBeat">heartBeat</option>
                        </optgroup>
                        <optgroup label="Back Entrances">
                            <option value="backInDown">backInDown</option>
                            <option value="backInLeft">backInLeft</option>
                            <option value="backInRight">backInRight</option>
                            <option value="backInUp">backInUp</option>
                        </optgroup>
                        {/* <optgroup label="Back exits">
                            <option value="backOutDown">backInDown</option>
                            <option value="backOutLeft">backInLeft</option>
                            <option value="backOutRight">backInRight</option>
                            <option value="backOutUp">backInUp</option>
                        </optgroup> */}
                        <optgroup label="Bouncing Entrances">
                            <option value="bounceIn">bounceIn</option>
                            <option value="bounceInDown">bounceInDown</option>
                            <option value="bounceInLeft">bounceInLeft</option>
                            <option value="bounceInRight">bounceInRight</option>
                            <option value="bounceInUp">bounceInUp</option>
                        </optgroup>

                        {/* <optgroup label="Bouncing Exits">
                            <option value="bounceOut">bounceOut</option>
                            <option value="bounceOutDown">bounceOutDown</option>
                            <option value="bounceOutLeft">bounceOutLeft</option>
                            <option value="bounceOutRight">bounceOutRight</option>
                            <option value="bounceOutUp">bounceOutUp</option>
                        </optgroup> */}

                        <optgroup label="Fading Entrances">
                            <option value="fadeIn">fadeIn</option>
                            <option value="fadeInDown">fadeInDown</option>
                            <option value="fadeInDownBig">fadeInDownBig</option>
                            <option value="fadeInLeft">fadeInLeft</option>
                            <option value="fadeInLeftBig">fadeInLeftBig</option>
                            <option value="fadeInRight">fadeInRight</option>
                            <option value="fadeInRightBig">fadeInRightBig</option>
                            <option value="fadeInUp">fadeInUp</option>
                            <option value="fadeInUpBig">fadeInUpBig</option>

                            <option value="fadeInTopLeft">fadeInTopLeft</option>
                            <option value="fadeInTopRight">fadeInTopRight</option>
                            <option value="fadeInBottomLeft">fadeInBottomLeft</option>
                            <option value="fadeInBottomRight">fadeInBottomRight</option>
                        </optgroup>

                        {/* <optgroup label="Fading Exits">
                            <option value="fadeOut">fadeOut</option>
                            <option value="fadeOutDown">fadeOutDown</option>
                            <option value="fadeOutDownBig">fadeOutDownBig</option>
                            <option value="fadeOutLeft">fadeOutLeft</option>
                            <option value="fadeOutLeftBig">fadeOutLeftBig</option>
                            <option value="fadeOutRight">fadeOutRight</option>
                            <option value="fadeOutRightBig">fadeOutRightBig</option>
                            <option value="fadeOutUp">fadeOutUp</option>
                            <option value="fadeOutUpBig">fadeOutUpBig</option>

                            <option value="fadeOutTopLeft">fadeOutTopLeft</option>
                            <option value="fadeOutTopRight">fadeOutTopRight</option>
                            <option value="fadeOutBottomRight">fadeOutBottomRight</option>
                            <option value="fadeOutBottomLeft">fadeOutBottomLeft</option>
                        </optgroup> */}

                        <optgroup label="Flippers">
                            <option value="flip">flip</option>
                            <option value="flipInX">flipInX</option>
                            <option value="flipInY">flipInY</option>
                            {/* <option value="flipOutX">flipOutX</option>
                            <option value="flipOutY">flipOutY</option> */}
                        </optgroup>

                        <optgroup label="Lightspeed">
                            <option value="lightSpeedInRight">lightSpeedInRight</option>
                            <option value="lightSpeedInLeft">lightSpeedInRight</option>
                            {/* <option value="lightSpeedOutRight">lightSpeedOutLeft</option>
                            <option value="lightSpeedOutLeft">lightSpeedOutLeft</option> */}
                        </optgroup>

                        <optgroup label="Rotating Entrances">
                            <option value="rotateIn">rotateIn</option>
                            <option value="rotateInDownLeft">rotateInDownLeft</option>
                            <option value="rotateInDownRight">rotateInDownRight</option>
                            <option value="rotateInUpLeft">rotateInUpLeft</option>
                            <option value="rotateInUpRight">rotateInUpRight</option>
                        </optgroup>

                        {/* <optgroup label="Rotating Exits">
                            <option value="rotateOut">rotateOut</option>
                            <option value="rotateOutDownLeft">rotateOutDownLeft</option>
                            <option value="rotateOutDownRight">rotateOutDownRight</option>
                            <option value="rotateOutUpLeft">rotateOutUpLeft</option>
                            <option value="rotateOutUpRight">rotateOutUpRight</option>
                        </optgroup> */}
                        <optgroup label="Specials">
                            <option value="hinge">hinge</option>
                            <option value="jackInTheBox">jackInTheBox</option>
                            <option value="rollIn">rollIn</option>
                            <option value="rollOut">rollOut</option>
                        </optgroup>
                        <optgroup label="Zoom Entrances">
                            <option value="zoomIn">zoomIn</option>
                            <option value="zoomInDown">zoomInDown</option>
                            <option value="zoomInLeft">zoomInLeft</option>
                            <option value="zoomInRight">zoomInRight</option>
                            <option value="zoomInUp">zoomInUp</option>
                        </optgroup>

                        {/* <optgroup label="Zoom Exits">
                            <option value="zoomOut">zoomOut</option>
                            <option value="zoomOutDown">zoomOutDown</option>
                            <option value="zoomOutLeft">zoomOutLeft</option>
                            <option value="zoomOutRight">zoomOutRight</option>
                            <option value="zoomOutUp">zoomOutUp</option>
                        </optgroup> */}
                        <optgroup label="Sliding Entrances">
                            <option value="slideInUp">slideInUp</option>
                            <option value="slideInDown">slideInDown</option>
                            <option value="slideInLeft">slideInLeft</option>
                            <option value="slideInRight">slideInRight</option>

                        </optgroup>
                        {/* <optgroup label="Sliding Exits">
                            <option value="slideOutUp">slideOutUp</option>
                            <option value="slideOutDown">slideOutDown</option>
                            <option value="slideOutLeft">slideOutLeft</option>
                            <option value="slideOutRight">slideOutRight</option>
                        </optgroup> */}




                    </select>

                </div>
            </div>


        </div>
        <div style={{ border: '2px solid red' }}>
            <b>Static Filter Effects on solid cap 1</b>
            <button onClick={() => {
                refkkk.current.innerHTML = canvas.toSVG();
            }}>load svg from canvas</button>
            <button onClick={() => startGraphics(canvas, templateLayers.solidCaption1)}> Play on Casparcg</button>
        </div>
        H Blur: <input onChange={e => {
            applyBlurFilter(e.target.value, vBlur);
            setHBlur(e.target.value);
        }} type="range" min='0' max='100' step='1' value={hBlur} />
        V Blur: <input onChange={e => {
            applyBlurFilter(hBlur, e.target.value);
            setVBlur(e.target.value);
        }} type="range" min='0' max={100} step='1' value={vBlur} />
        <button onClick={applySpeculerLightingFilter}>applySpeculerLightingFilter</button>

        X: <input style={{ width: 100 }} onChange={e => {
            applySpeculerLightingFilter();
            setX(e.target.value);
        }} type="range" min={-(canvas?.getActiveObjects(0)[0]?.width / 2).toString() ? -(canvas?.getActiveObjects(0)[0]?.width / 2).toString() : 0} max={(canvas?.getActiveObjects(0)[0]?.width / 2).toString()} step='1' value={x} />

        Y: <input style={{ width: 100 }} onChange={e => {
            applySpeculerLightingFilter();
            setY(e.target.value);
        }} type="range" min={-(canvas?.getActiveObjects(0)[0]?.height / 2).toString() ? -(canvas?.getActiveObjects(0)[0]?.height / 2).toString() : 0} max={(canvas?.getActiveObjects(0)[0]?.height / 2).toString()} step='1' value={y} />

        Z: <input style={{ width: 100 }} onChange={e => {
            applySpeculerLightingFilter();
            setZ(e.target.value);
        }} type="range" min='0' max='100' step='1' value={z} />


        specularExponent: <input style={{ width: 100 }} onChange={e => {
            applySpeculerLightingFilter();
            setspecularExponent(e.target.value);
        }} type="range" min='0' max='100' step='1' value={specularExponent} />

        lightingcolor:<input onChange={e => {
            applySpeculerLightingFilter();
            setlightingcolor(e.target.value);
        }} type="color" value={lightingcolor} />

        <div id='kkk' ref={refkkk} style={{ backgroundColor: 'grey', zoom: 0.45, width: 1920, height: 1080 }}>
            {/* dummy */}
        </div>
        <div style={{ width: 860, height: 150, overflow: 'scroll' }} onMouseOver={() => setCanvasHtml(refkkk?.current?.innerHTML)}>
            {canvasHtml}
        </div>
    </div>)
}

export default Effects