import React, { useEffect, useRef } from 'react'
import { socketAddress, getModifiedObject } from '../common'
import socketIOClient from "socket.io-client";
import Tsparticles2 from '../tsparticles/Tsparticles2';
import * as fabric from 'fabric'

window.fabric = fabric;

window.getModifiedObject = getModifiedObject;
window.hexToRGB = hex => {
    const red = parseInt(hex.slice(1, 3), 16)
    const green = parseInt(hex.slice(3, 5), 16)
    const blue = parseInt(hex.slice(5, 7), 16)
    return { r: red / 255, g: green / 255, b: blue / 255, a: 1 } // return an object
}

document.body.addEventListener('keypress', function (e) {
    // if (e.key.toUpperCase() === "S") { stop(); }
});
// if (window.caspar || window.casparcg || window.tickAnimations) {
//     var css = '[id^=ccg] {display: none; }',
//         head = document.head || document.getElementsByTagName('head')[0],
//         style = document.createElement('style');
//     head.appendChild(style);
//     style.type = 'text/css';
//     if (style.styleSheet) {
//         // This is required for IE8 and below.
//         style.styleSheet.cssText = css;
//     } else {
//         style.appendChild(document.createTextNode(css));
//     }
// }

const elementToObserve = document.body;
const observer = new MutationObserver(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'hidden';
    var aa = document.getElementsByTagName('div')[0];
    aa.style.zoom = (1920 * 100 / 1920) + '%';
    observer.disconnect();
});
observer.observe(elementToObserve, { subtree: true, childList: true })

var dataCaspar = {};

function escapeHtml(unsafe) {
    return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

// Parse templateData into an XML object
function parseCaspar(str) {
    var xmlDoc;
    if (window.DOMParser) {
        var parser = new DOMParser();
        xmlDoc = parser.parseFromString(str, "text/xml");
    }
    dataCaspar = XML2JSON(xmlDoc.documentElement.childNodes);
}


// Make the XML templateData message into a more simple key:value object
function XML2JSON(node) {
    var data = {}; // resulting object
    for (var k = 0; k < node.length; k++) {
        var idCaspar = node[k].getAttribute("id");
        var valCaspar = node[k].childNodes[0].getAttribute("value");
        if (idCaspar !== undefined && valCaspar !== undefined) {
            data[idCaspar] = valCaspar;
        };
    }
    return data;
}

// Main function to insert data
function dataInsert(dataCaspar) {
    for (var idCaspar in dataCaspar) {
        var idTemplate = document.getElementById(idCaspar);
        if (idTemplate !== undefined) {
            var idtext = idTemplate.getElementsByTagName('text')[0];
            var idimage = idTemplate.getElementsByTagName('image')[0];
            if (idtext !== undefined) {
                idTemplate.getElementsByTagName('text')[0].getElementsByTagName('tspan')[0].innerHTML = escapeHtml(dataCaspar[idCaspar]);
                idTemplate.style.display = "block";
                if (idTemplate.getElementsByTagName('extraproperty')[0] !== undefined) {
                    var textalign1 = idTemplate.getElementsByTagName('extraproperty')[0].getAttribute('textalign');
                    var width1 = idTemplate.getElementsByTagName('extraproperty')[0].getAttribute('width');
                    var originalFontSize = idTemplate.getElementsByTagName('extraproperty')[0].getAttribute('originalfontsize');
                    if (textalign1 === 'center') {
                        idTemplate.getElementsByTagName('text')[0].setAttribute('xml:space', 'preserve1');
                        idTemplate.getElementsByTagName('text')[0].style.whiteSpace = "normal";
                        idTemplate.getElementsByTagName('text')[0].getElementsByTagName('tspan')[0].setAttribute('x', '0');
                        idTemplate.getElementsByTagName('text')[0].getElementsByTagName('tspan')[0].setAttribute('text-anchor', 'middle');
                    }
                    if (textalign1 === 'right') {
                        idTemplate.getElementsByTagName('text')[0].setAttribute('xml:space', 'preserve1');
                        idTemplate.getElementsByTagName('text')[0].style.whiteSpace = 'normal';
                        idTemplate.getElementsByTagName('text')[0].getElementsByTagName('tspan')[0].setAttribute('x', width1 / 2);
                        idTemplate.getElementsByTagName('text')[0].getElementsByTagName('tspan')[0].setAttribute('text-anchor', 'end');
                    }
                    idTemplate.getElementsByTagName('text')[0].setAttribute('font-size', originalFontSize);
                    do {
                        var dd = idTemplate.getElementsByTagName('text')[0].getAttribute('font-size');
                        idTemplate.getElementsByTagName('text')[0].setAttribute('font-size', dd - 1);
                        var width2 = idTemplate.getElementsByTagName('text')[0].getElementsByTagName('tspan')[0].getBBox().width;
                    } while (width2 > width1);
                }

            }
            else if (idimage !== undefined) {
                idTemplate.getElementsByTagName('image')[0].setAttribute('xlink:href', escapeHtml(dataCaspar[idCaspar]));
                idTemplate.getElementsByTagName('image')[0].setAttribute('preserveAspectRatio', 'none');
                idTemplate.style.display = "block";
            }
        }
    }
}

// Call for a update of data from CasparCG client
function update(str) {
    parseCaspar(str); // Parse templateData into an XML object
    dataInsert(dataCaspar); // Insert data
}
window.update = update;

// insert data from CasparCg client when activated
// function play(str) {
//     parseCaspar(str); // Parse templateData into an XML object
//     dataInsert(dataCaspar); // Insert data
//     // gwd.actions.timeline.gotoAndPlay('document.body', 'start');
// }




// eslint-disable-next-line 
function stop() {
    document.body.innerHTML = '';
}
const clientId = window.location.pathname.replace('/ReactCasparClient/html/', '');

const Html = () => {
    console.log(clientId)
    const refhtml = useRef();
    const updateHtml = (data) => {
        update(data.replaceAll("\\", ""))
    }
    const scriptEval = () => {
        var scripts = refhtml.current.getElementsByTagName("script");
        for (var i = 0; i < scripts.length; i++) {
            // eslint-disable-next-line 
            eval(scripts[i].innerText);
        }
    }
    const callScript = data => {
        // console.log(JSON.parse(data))
        const ff = JSON.parse(data)
        // eslint-disable-next-line 
        eval(ff[0])
    }




    // eslint-disable-next-line 
    const setColorRect = (id, val) => {
        Array.from(document.getElementsByTagName(id)).forEach(element => {
            element.style.fill = val;
        });
    }

    const executeScript = (str) => {
        if (window.location.origin !== 'https://vimlesh1975.github.io') {
            // console.log(str);
        }
        // str = str.replace(/CRLF/g, '\\n'); // removed on 27.06.2024 for bad control charater some image sequence
        // str = str.replace(/CRLF/g, '\\\\n');

        // eslint-disable-next-line
        eval(str)
    };


    useEffect(() => {
        // const socket = socketIOClient('http://localhost:9000/');
        const socket = socketIOClient(socketAddress());
        socket.on("html", data => {
            // console.log(data)
            if (data.clientId === clientId) {
                refhtml.current.innerHTML = data.data1;
            }
        });
        socket.on("updateHtml", data => {
            // console.log(data)
            if (data.clientId === clientId) {
                updateHtml(data.data);
            }
        });
        socket.on("loadHtml", data => {
            // console.log(data)
            if (data.clientId === clientId) {
                refhtml.current.innerHTML = data.html;
                scriptEval()
                updateHtml(data.data)
            }

        });
        socket.on("callScript", data => {
            if (data.clientId === clientId) {
                callScript(data.data)
            }
        });

        socket.on("executeScript", data => {
            if (data.clientId === clientId) {
                executeScript(data.data1)
            }
        });
        return () => {
            socket?.removeListener('html');
            socket?.off('html');
            socket?.disconnect();
        }
        // eslint-disable-next-line
    }, [])

    return (<>
        <div ref={refhtml}></div>
        <Tsparticles2 />
    </>)
}

export default Html