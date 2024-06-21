import React, { useState } from 'react'
import { saveFile, generalFileName, executeScript, endpoint, startVerticalScroll, templateLayers } from './common'
import { useSelector } from "react-redux";
import { selectAll } from './DrawingController'
import { FaPlay, FaPause, FaStop, } from "react-icons/fa";
import { GrResume } from "react-icons/gr";

const VerticalScrollPlayer = ({ showTemplate = false }) => {

    const canvas = useSelector((state) => state.canvasReducer.canvas);
    const canvasList = useSelector((state) => state.canvasListReducer.canvasList);
    const currentscreenSize = useSelector((state) => state.currentscreenSizeReducer.currentscreenSize);
    const currentPage = useSelector((state) => state.currentPageReducer.currentPage);

    const [verticalSpeed, setVerticalSpeed] = useState(0.7)
    const [verticalScroll, setVerticalScroll] = useState("");

    const onVerticalSpeedChange = (e) => {
        setVerticalSpeed(e.target.value);
        localStorage.setItem("RCC_verticalSpeed", e.target.value);

        endpoint(
            `call ${window.chNumber}-${templateLayers.verticalScroll} "verticalSpeed=${e.target.value}"`
        );
        executeScript(`verticalSpeed=${e.target.value}`);
    };
    const exportVerticalScrollAsHTML = (canvas) => {
        canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
        selectAll(canvas);
        var hh = canvas.getActiveObject()?.getBoundingRect().height + 100;
        var aa = `<!DOCTYPE html>
                            <html lang="en">
                                <head>
                                    <meta charset="UTF-8">
                                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                                <title>Document</title>
                                            </head>
                                            <body>
                                                `;
        aa += "<div>" + canvas.toSVG(["id", "class", "selectable"]) + "</div>";
        aa += `
                                                <script>
                                                    var aa = document.getElementsByTagName('div')[0];
                                                    aa.style.position='absolute';
                                                    document.getElementsByTagName('svg')[0].style.height='${hh}';
                                                    document.getElementsByTagName('svg')[0].setAttribute('viewBox','0 0 1920 ${hh}');
                                                    aa.style.top='100%';
                                                    aa.style.zoom=(${currentscreenSize * 100
            }/1920)+'%';
                                                    document.body.style.overflow='hidden';
                                                    var speed=${verticalSpeed};
                                                    setInterval(function(){
                                                        aa.style.top = (aa.getBoundingClientRect().top - speed) + 'px';
                 }, 1);
                                                </script>
                                                `;
        aa += `
                                            </body>
                                        </html>`;
        const data = new Blob([aa], { type: "text/html" });
        const options = {
            suggestedName: generalFileName(),
            types: [
                {
                    description: 'HTML Files',
                    accept: {
                        'text/html': ['.html'],
                    },
                },
            ],
        };
        saveFile(options, data)
    };

    return (<div>

        <div className="drawingToolsRow1">
            <b> V Scroll: </b>{" "}
            <button
                onClick={() => {
                    startVerticalScroll(templateLayers.verticalScroll, canvas, selectAll, currentscreenSize, verticalSpeed);
                    setVerticalScroll(canvasList[currentPage]?.pageName);
                    localStorage.setItem(
                        "RCC_verticalScroll",
                        canvasList[currentPage]?.pageName
                    );
                }}
            >
                <FaPlay />{" "}
            </button>
            <button
                onClick={() => {
                    endpoint(
                        `call ${window.chNumber}-${templateLayers.verticalScroll} "verticalSpeed=0"`
                    );
                    executeScript(`
                            verticalSpeed=0;
                            `);
                }}
            >
                <FaPause />
            </button>
            <button
                onClick={() => {
                    endpoint(
                        `call ${window.chNumber}-${templateLayers.verticalScroll} "verticalSpeed=${verticalSpeed}"`
                    );
                    executeScript(`verticalSpeed=${verticalSpeed};`);
                }}
            >
                {" "}
                <GrResume />
            </button>
            <button
                onClick={() => {
                    endpoint(
                        `stop ${window.chNumber}-${templateLayers.verticalScroll}`
                    );

                    executeScript(
                        `if(window.intervalVerticalScroll){clearInterval(intervalVerticalScroll)}`
                    );
                    executeScript(
                        `document.getElementById('divid_${templateLayers.verticalScroll}')?.remove()`
                    );

                    setVerticalScroll("");
                    localStorage.setItem("RCC_verticalScroll", "");
                }}
            >
                <FaStop />
            </button>
            S:
            <input
                style={{ width: "40px" }}
                onChange={(e) => onVerticalSpeedChange(e)}
                type="number"
                min="0"
                max="5"
                step="0.01"
                value={verticalSpeed}
            />
            <button onClick={() => exportVerticalScrollAsHTML(canvas)}>
                To HTML
            </button>
            <span> {showTemplate && verticalScroll} </span>
        </div>

    </div>)
}

export default VerticalScrollPlayer
