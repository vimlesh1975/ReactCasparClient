import React, { useEffect, useState, useCallback } from 'react'
import studio from '@theatre/studio'
import { getProject, types, val, onChange } from '@theatre/core'
import { useSelector, useDispatch } from 'react-redux'
import * as fabric from 'fabric'
import { FaPlay, FaPause, FaStop } from "react-icons/fa";

import { setPrimitivePropAsSequenced, generateUniqueNumber, _clipboard, copy, alignLeft, alignRight, alignCenter, textUnderline, textLineThrough, textItalic, txtBold, textNormal, createTriangle, createCircle, createRect, createRandomeStrip, addImage, moveSelected, Direction, createTextBox, generateUniqueId, getGdd, stopGraphics1, updateText, getModifiedObject, findElementWithId, endpoint, templateLayers, shadowOptions, executeScript, hexToRGB, rgbaObjectToHex, screenSizes, buildDate, chNumbers, generalFileName, saveFile } from '../common'

import { VscPrimitiveSquare, VscCircleFilled, VscTriangleUp } from "react-icons/vsc";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import SavePannelTheatre from './SavePannelTheatre';
import RecordRTC from 'recordrtc';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import { v4 as uuidv4 } from 'uuid';

import ElementList from './ElementList';
import DataUpdatePanel from './DataUpdatePanel';
import TheatreEditableTable from './TheatreEditableTable';
import TheatreImageSequence from './TheatreImageSequence';

import { edit } from '../PathModifier'
import HtmlOutput from '../HtmlOutput'
import { Rnd } from 'react-rnd';
import * as d from '@theatre/dataverse'


// import split from 'graphemesplit'
// fabric.util.string.graphemeSplit.prototype = split



const loopcount = 1;

const setclipPathWhileImportingWebAnimator = (canvas) => {
    var objects = canvas.getObjects();
    objects.forEach((object) => {
        object.set({
            objectCaching: false,
        });
        if (object.clipPath) {
            const clipPathObject = objects.find((element) => element.id === object.clipPath.id);
            clipPathObject.set({ absolutePositioned: true });
            object.set({ clipPath: clipPathObject });
        }
    });
    canvas.requestRenderAll();
}

const strinSetclipPathWhileImporting = (layerNumber) => {
    return `var objects = canvas${layerNumber}.getObjects();
    objects.forEach((object) => {
    if (object.clipPath) {
    const clipPathObject = objects.find((element) => element.id === object.clipPath.id);
    clipPathObject.set({ absolutePositioned: true });
    object.set({ clipPath: clipPathObject });
    }
    });
    canvas${layerNumber}.requestRenderAll();`
}



export const deleteItem = (canvas) => {
    const aa = canvas.getActiveObjects();
    aa.forEach(element => {
        canvas.remove(element);
        sheet.detachObject(element.id);

        // clearObjectsAllAnimation
        studio.transaction((api) => {
            api.__experimental_forgetObject(getObjectbyId(element.id));
        })
    });
    canvas.discardActiveObject();
    canvas.requestRenderAll();
}

function getKeyframes(sheet, tracks, objectKey) {
    const json = studio.createContentOfSaveFile(sheet.address.projectId);
    const { trackData, trackIdByPropPath } = json.sheetsById[sheet.address.sheetId].sequence.tracksByObject[objectKey];
    const keyframes = tracks.reduce((result, track) => {
        if (Array.isArray(track)) {
            const [prop1, prop2] = track;
            result[`${prop1},${prop2}`] = trackData[trackIdByPropPath[`["${prop1}","${prop2}"]`]]?.keyframes?.map(k => {
                return { position: k.position, value: k.value };
            });
        } else {
            result[track] = trackData[trackIdByPropPath[`["${track}"]`]]?.keyframes?.map(k => {
                return { position: k.position, value: k.value };
            });
        }
        return result;
    }, {});
    return keyframes;  // Return the keyframes as well, if needed
}

const deletrTracks = (tracks) => {

    const tracksModified = [...tracks]
    tracks.forEach((track) => {
        getObjectbyId(studio.selection[0].address.objectKey).value[track] && Object.keys(getObjectbyId(studio.selection[0].address.objectKey).value[track])?.forEach((val) => {
            tracksModified.push([track, val]);
        })
    })
    const keyframes = getKeyframes(sheet, tracksModified, studio.selection[0].address.objectKey);
    studio.transaction((api) => {
        tracksModified.forEach((track) => {
            if (Array.isArray(track)) {
                const trackforPosition = track.join(',')
                const [prop1, prop2] = track;

                keyframes[trackforPosition]?.forEach((val) => {
                    sheet.sequence.position = val.position
                    api.unset(getObjectbyId(studio.selection[0].address.objectKey).props[prop1][prop2]);
                })
            }
            else {
                keyframes[track]?.forEach((val) => {
                    sheet.sequence.position = val.position
                    api.unset(getObjectbyId(studio.selection[0].address.objectKey).props[track]);
                })
            }
        })
    })
}

studio.initialize();
studio.ui.hide();


var project = getProject('Fabricjs Object Animation');
var sheet;
const getNewII = (newi, ii) => {
    if (ii === 0) return 0;
    if (ii === 1) return newi * 10 + 'x';
    if (ii === 2) return newi * 10 + 'y';
    if (ii === 3) return newi * 10 + 1 + 'x';
    if (ii === 4) return newi * 10 + 1 + 'y';
    if (ii === 5) return newi * 10 + 2 + 'x';
    if (ii === 6) return newi * 10 + 2 + 'y';
};
export const syncProps = (mypath, myObj) => {
    studio.transaction(({ set }) => {
        mypath.path.forEach((val, i) => {
            const newi = i + 1;
            val.forEach((val1, ii) => {
                const newii = getNewII(newi, ii);
                if (newii !== 0) set(myObj.props['Point' + newi][newii], val1);
            });
        });
    });
};


var mouseDown = 0;
document.body.onmousedown = function () {
    mouseDown = 1;
}
document.body.onmouseup = function () {
    mouseDown = 0;
}

export const getObjectbyId = id => {
    return arrObject.find(object => object.address.objectKey === id)
}


export const changePropOfObject = (id, str1, str2) => {
    const objs = arrObject.find(object => {
        return (object.address.objectKey === id)
    });
    if (objs) {
        const obj = objs;
        studio.transaction(({ set }) => {
            set(obj.props[str1], str2);
        });
    }
    else {
        const aa = findElementWithId(window.canvas, id);
        if (aa) {
            aa.set({ str1: str2 })
            window.canvas.requestRenderAll();
        }
    }
};

export const getPropOfObject = (id, str1) => {
    const objs = arrObject.find(object => {
        return (object.address.objectKey === id)
    });
    if (objs) {
        const obj = objs;
        return obj.value[str1];
    }
    else {
        const aa = findElementWithId(window.canvas, id);
        if (aa) {
            return aa[str1];
        }
    }
};

const DrawingforTheatrejs = ({ importHtml, playtoCasparcg, generateTheatreID, FPS }) => {
    const { editor, onReady } = useFabricJSEditor();
    const dispatch = useDispatch();
    const showExtensionPanel = useSelector(state => state.showExtensionPanelReducer.showExtensionPanel);
    const showSavePanel = useSelector(state => state.showSavePanelReducer.showSavePanel);
    const showDataUpdatePanel = useSelector(state => state.showDataUpdatePanelReducer.showDataUpdatePanel);
    const showHtmlOutput = useSelector(state => state.showHtmlOutputReducer.showHtmlOutput);
    const showDataTable = useSelector(state => state.showDataTableReducer.showDataTable);
    const showImgSeq = useSelector(state => state.showImgSeqReducer.showImgSeq);

    window.dispatch = dispatch;
    window.editor = editor;

    const extensionConfig = {
        id: "hello-world-extension",
        toolbars: {
            global(set, studio) {
                set([
                    {
                        type: "Icon",
                        title: `Element List`,
                        svgSource: `E L`,
                        onClick: () => {
                            dispatch({ type: 'SHOW_EXTENSIONPANNEL', payload: !showExtensionPanel });
                        }
                    },
                    {
                        type: "Icon",
                        title: "Save Panel",
                        svgSource: `S P`,
                        onClick: () => {
                            dispatch({ type: 'SHOW_SAVEPANEL', payload: !showSavePanel });
                        }
                    },
                    {
                        type: "Icon",
                        title: "Data Update Panel",
                        svgSource: `D U`,
                        onClick: () => {
                            dispatch({ type: 'SHOW_DATA_UPDATE', payload: !showDataUpdatePanel });
                        }
                    },
                    {
                        type: "Icon",
                        title: "Html Output",
                        svgSource: `H O`,
                        onClick: () => {
                            dispatch({ type: 'SHOW_HTML_OUTPUT', payload: !showHtmlOutput });
                        }
                    },
                    {
                        type: "Icon",
                        title: "Data Table",
                        svgSource: `D T`,
                        onClick: () => {
                            dispatch({ type: 'SHOW_DATA_TABLE', payload: !showDataTable });
                        }
                    },
                    {
                        type: "Icon",
                        title: "iMG SEQ",
                        svgSource: `I S`,
                        onClick: () => {
                            dispatch({ type: 'SHOW_IMG_SEQ', payload: !showImgSeq });
                        }
                    }
                ])
            },

        },
        panes: [],
    };

    studio.extend(extensionConfig, { __experimental_reconfigure: true });


    useEffect(() => {
        setTimeout(() => {
            window.editor.canvas.preserveObjectStacking = true;
            window.editor.canvas.on('selection:cleared', function (e) {
                if (e.deselected && e.deselected.length > 1) {
                    e.deselected.forEach((element) => {
                        changePropOfObject(element.id, 'left', element.left);
                        changePropOfObject(element.id, 'top', element.top);
                        changePropOfObject(element.id, 'scaleX', element.scaleX);
                        changePropOfObject(element.id, 'scaleY', element.scaleY);
                        changePropOfObject(element.id, 'angle', element.angle);
                    })
                }
            });
        }, 3000);
        return () => {
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        dispatch({ type: 'CHANGE_CANVAS', payload: editor?.canvas });
    }, [editor, dispatch])





    return (<div id='aaa' >
        <FabricJSCanvas className={'DrawingforTheatrejs'} onReady={(aa) => {
            onReady(aa);
            aa.wrapperEl.setAttribute("tabindex", "1"); //for canvas to accept focus for keydown delete
        }} />
        {showExtensionPanel && <ElementList sheet={sheet} studio={studio} arrObject={arrObject} importHtml={importHtml} />}

        <Rnd enableResizing={{}}
            default={{
                x: 1070,
                y: 50,

            }}
            dragHandleClassName="my-drag-handle2"
        >

            <div style={{ backgroundColor: 'grey', display: showDataUpdatePanel ? '' : 'none' }}>
                <div className='my-drag-handle2' style={{ width: 450, height: 20, backgroundColor: 'white' }} >
                    Drag me
                    <button style={{ position: 'absolute', right: 0 }} onClick={() => dispatch({ type: 'SHOW_DATA_UPDATE', payload: !showDataUpdatePanel })}>X</button>
                </div>
                <DataUpdatePanel sheet={sheet} studio={studio} arrObject={arrObject} importHtml={importHtml} />
            </div>
        </Rnd >


        <Rnd enableResizing={{}}
            default={{
                x: 0,
                y: 300,

            }}
            dragHandleClassName="my-drag-handle"
        >
            <div style={{ backgroundColor: 'grey', display: showHtmlOutput ? '' : 'none' }}>
                <div className='my-drag-handle' style={{ width: 1056, height: 20, backgroundColor: 'white' }} >
                    Drag me
                    <button style={{ position: 'absolute', right: 0 }} onClick={() => dispatch({ type: 'SHOW_HTML_OUTPUT', payload: !showHtmlOutput })}>X</button>
                </div>
                <HtmlOutput scale={0.55} />
            </div>
        </Rnd >

        <Rnd enableResizing={{}}
            default={{
                x: 0,
                y: 300,

            }}
            dragHandleClassName="my-drag-handle"
        >
            <div style={{ backgroundColor: '#99c8d8', display: showDataTable ? '' : 'none' }}>
                <div className='my-drag-handle' style={{ width: 1700, height: 20, backgroundColor: 'white' }} >
                    Drag me
                    <button style={{ position: 'absolute', right: 0 }} onClick={() => dispatch({ type: 'SHOW_DATA_TABLE', payload: !showDataTable })}>X</button>
                </div>
                <TheatreEditableTable playtoCasparcg={playtoCasparcg} />
            </div>
        </Rnd >

        <Rnd enableResizing={{}}
            default={{
                x: 0,
                y: 300,

            }}
            dragHandleClassName="my-drag-handle"
        >
            <div style={{ backgroundColor: '#99c8d8', display: showImgSeq ? '' : 'none' }}>
                <div className='my-drag-handle' style={{ width: 800, height: 20, backgroundColor: 'white' }} >
                    Drag me
                    <button style={{ position: 'absolute', right: 0 }} onClick={() => dispatch({ type: 'SHOW_IMG_SEQ', payload: !showImgSeq })}>X</button>
                </div>
                <TheatreImageSequence sheet={sheet} generateTheatreID={generateTheatreID} fps={FPS} />
            </div>
        </Rnd >


    </div >);
};

const arrObject = [];
const arrObjectProps = [];
window.arrObject = arrObject;
window.arrObjectProps = arrObjectProps;

const loopDirection = [{ direction: 'normal', notation: 'N' }, { direction: 'reverse', notation: 'R' }, { direction: 'alternate', notation: 'A' }, { direction: 'alternateReverse', notation: 'AR' }]


const WebAnimator = () => {

    const [recording, setRecording] = useState(false);
    const [transcoding, setTranscoding] = useState(false);

    const FPS = useSelector(state => state.FPSReducer.FPS);
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const currentscreenSize = useSelector(state => state.currentscreenSizeReducer.currentscreenSize);

    const [duration, setDuration] = useState(1);
    const [fabric1, setFabric1] = useState('');
    const [coreAndStudio1, setCoreAndStudio1] = useState('');
    const [projectId, setProjectId] = useState('Fabricjs Object Animation')
    const [htmlfileHandle, sethtmlfileHandle] = useState();
    const [idofElement, setIdofElement] = useState('ccg_1');

    const [visibility, setVisibility] = useState(false);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    const [jsfilename, setJsfilename] = useState('main');
    // const [showSavePannel, setShowSavePannel] = useState(false);
    const showSavePanel = useSelector(state => state.showSavePanelReducer.showSavePanel);


    const [chNumber, setChNumber] = useState(1);

    const clientId = useSelector(state => state.clientIdReducer.clientId);
    window.clientId = clientId;

    sheet = project.sheet('Sheet 1');


    window.studio = studio;
    window.projectId = projectId;
    window.sheet = sheet;

    const dispatch = useDispatch();

    const changeChannelNumber = e => {
        setChNumber(e.target.value);
    }

    useEffect(() => {
        setTimeout(() => {
            if (FPS !== undefined && !isNaN(FPS)) {
                studio.transaction((api) => {
                    api.set(sheet.sequence.pointer.subUnitsPerUnit, parseInt(FPS)) // make it 30fps
                })
            }
        }, 2000);
    }, [FPS])

    useEffect(() => {
        window.chNumber = chNumber;
        document.title = `RCC WebAnimator_${buildDate}_CH #${chNumber}`;
        return () => {
            // cleanup
        }
    }, [chNumber])

    useEffect(() => {
        if (canvas) {
            const handleKeyDown = (options) => {
                if (options.key === 'Delete' && document.activeElement === window.editor.canvas.wrapperEl) {
                    deleteItem(canvas);
                }
            };

            // fabric.util.addListener(document.body, 'keydown', handleKeyDown);
            document.body.addEventListener('keydown', handleKeyDown);


            return () => {
                // fabric.util.removeListener(document.body, 'keydown', handleKeyDown);
                document.body.removeEventListener('keydown', handleKeyDown);

            };
        }
        // eslint-disable-next-line 
    }, [canvas]);



    useEffect(() => {
        if (localStorage.getItem('RCC_currentscreenSize')) { dispatch({ type: 'CHANGE_CURRENTSCREENSIZE', payload: parseInt(localStorage.getItem('RCC_currentscreenSize')) }) }
        studio.ui.restore();
        return () => {
            // second  
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        const handleSelectionChange = (newSelection) => {
            if (newSelection.length > 0 && canvas && newSelection[0]?.type === 'Theatre_SheetObject_PublicAPI') {
                const selectedObject = canvas.getObjects().find(item => newSelection[0]?.address?.objectKey === item.id);
                if (selectedObject) {
                    canvas.setActiveObject(selectedObject);
                    canvas.requestRenderAll();
                }
            }
        };

        // Add event listener
        studio.onSelectionChange(handleSelectionChange);

        // Cleanup function
        return () => {
            // Use a workaround for removing the event listener if there is no `offSelectionChange` method
            studio.onSelectionChange(() => { });
        };
    }, [canvas]);



    useEffect(() => {
        setTimeout(() => {
            var fetchfabricjs;
            if (window.location.origin !== 'https://vimlesh1975.github.io') {
                fetchfabricjs = `${process.env.PUBLIC_URL}/js/fabric.min.js`;
            }
            else {
                fetchfabricjs = `/ReactCasparClient/js/fabric.min.js`;
            }
            fetch(fetchfabricjs)
                .then((r) => r.text())
                .then(text => {
                    setFabric1(text);
                })
        }, 2000);

        setTimeout(() => {
            var fetchcoreAndStudio1;
            if (window.location.origin !== 'https://vimlesh1975.github.io') {
                fetchcoreAndStudio1 = `${process.env.PUBLIC_URL}/js/core-and-studio.js`;
            }
            else {
                fetchcoreAndStudio1 = `/ReactCasparClient/js/core-and-studio.js`;
            }
            fetch(fetchcoreAndStudio1)
                .then((r) => r.text())
                .then(text => {
                    setCoreAndStudio1(text);
                })
        }, 3000);

        return () => {
            // cleanup
        }
        // eslint-disable-next-line
    }, [])

    const ContextMenu = ({ x, y, visibility }) => {
        const canvas = useSelector(state => state.canvasReducer.canvas);

        const sendToBack = canvas => {
            canvas.getActiveObjects().forEach(element => {
                canvas.sendObjectToBack(element);
            });
            reloadPage();
        }

        const bringToFront = canvas => {
            canvas.getActiveObjects().forEach(element => {
                canvas.bringObjectToFront(element);
            });
            reloadPage();
        }

        const reloadPage = () => {
            const modifiedcanvasContent = (JSON.stringify(canvas.toJSON(['id', 'class', 'selectable'])))
            const modifiedAnimationContent = (JSON.stringify(studio.createContentOfSaveFile(sheet.address.projectId)))
            importHtml(modifiedcanvasContent, modifiedAnimationContent)
        }

        const allOutofScreen = () => {
            canvas.getObjects().forEach((element, i) => {
                // if (i < canvas.getObjects().length / 2) {
                if (i % 2 === 0) {
                    studio.transaction((api) => {
                        api.set(getObjectbyId(element.id).props.left, -1500);
                    })
                }
                else {
                    studio.transaction((api) => {
                        api.set(getObjectbyId(element.id).props.left, 2500);
                    })
                }
            })
        }




        const changeId = (newValue) => {
            var newid = window.prompt('Please enter New Id:', newValue);
            const oldId = studio.selection[0].address.objectKey
            if (newid !== null && newid !== "") {
                newid = newid.replace(/\s*\/\s*/g, ' / ')
                const modifiedcanvasContent = (JSON.stringify(canvas.toJSON(['id', 'class', 'selectable']))).replaceAll(oldId, newid)
                const modifiedAnimationContent = (JSON.stringify(studio.createContentOfSaveFile(sheet.address.projectId))).replaceAll(oldId, newid)
                importHtml(modifiedcanvasContent, modifiedAnimationContent)
            }
        }
        const setSequenceLength = () => {
            var newid = window.prompt('Please enter New length:', val(sheet.sequence.pointer.length));
            if (newid !== null && newid !== "") {
                studio.transaction((api) => {
                    api.set(sheet.sequence.pointer.length, parseFloat(newid));
                })
            }
        }

        const clearAllAnimation = () => {
            studio.transaction((api) => {
                api.__experimental_forgetSheet(sheet);
            })
        }
        const clearObjectsAllAnimation = () => {
            if (studio.selection[0]?.type === 'Theatre_SheetObject_PublicAPI') {
                studio.transaction((api) => {
                    api.__experimental_forgetObject(studio.selection[0]);
                })
            }
        }

        const lockUnlock1 = (canvas) => {
            canvas.getActiveObjects().forEach((element) => {
                element.set({
                    lockMovementX: !element.lockMovementX,
                    lockMovementY: !element.lockMovementY,

                    lockScalingX: !element.lockScalingX,
                    lockScalingY: !element.lockScalingY,
                    lockRotation: !element.lockRotation,
                })

                // element.selectable = !element.selectable
            })
            canvas.requestRenderAll();
            dispatch({ type: "CHANGE_CANVAS", payload: canvas });
        }

        const visibleInVisible1 = (canvas) => {
            canvas.getActiveObjects().forEach((element) => {
                element.visible = !element.visible
            })
            canvas.requestRenderAll();
            dispatch({ type: "CHANGE_CANVAS", payload: canvas });
        }
        // async function delayPromise() {
        //     return new Promise(resolve => setTimeout(resolve, 2000));
        // }

        const paste = async (canvas) => {
            if (_clipboard) {
                let left = 0;
                let top = 0;
                try {
                    const objects = await fabric.util.enlivenObjects([_clipboard]);
                    let aa = [];
                    const objectType = _clipboard.type;
                    if (objectType === "ActiveSelection") {
                        aa = objects[0]._objects;
                    } else {
                        aa = objects;
                    }
                    aa.forEach((object, i) => {
                        left += 100;
                        top += 100;
                        var id = generateUniqueId({ type: object.type.toLowerCase() });
                        while (findElementWithId(canvas, id)) {
                            id = generateUniqueId({ type: object.type.toLowerCase() });
                        }

                        object.set({
                            left: left,
                            top: top,
                            id: id,
                            class: id,
                            evented: true,
                        });
                        canvas.add(object);
                        canvas?.setActiveObject(object);
                        generateTheatreIDforCopiedElement(id, i);
                        canvas?.discardActiveObject();
                        canvas.requestRenderAll();
                    });
                } catch (error) {
                    console.error("Error during paste operation:", error);
                }
            } else {
                console.log("Clipboard is empty, nothing to paste");
            }
        };




        const handleKeyDown = useCallback((event) => {

            const { key, keyCode, ctrlKey, altKey } = event;
            const activeObjects = window.editor.canvas?.getActiveObjects();
            if (document.activeElement === window.editor.canvas.wrapperEl) {
                switch (keyCode) {
                    case 37: // Left arrow key
                        moveSelected(Direction.LEFT);
                        activeObjects.forEach(element => {
                            const obj = getObjectbyId(element.id);
                            studio.transaction(({ set }) => {
                                set(obj.props.left, element.left);
                                set(obj.props.top, element.top);
                            });
                        })
                        break;
                    case 38: // Up arrow key
                        moveSelected(Direction.UP);
                        activeObjects.forEach(element => {
                            const obj = getObjectbyId(element.id);
                            studio.transaction(({ set }) => {
                                set(obj.props.left, element.left);
                                set(obj.props.top, element.top);
                            });
                        })
                        break;
                    case 39: // Right arrow key
                        moveSelected(Direction.RIGHT);
                        activeObjects.forEach(element => {
                            const obj = getObjectbyId(element.id);
                            studio.transaction(({ set }) => {
                                set(obj.props.left, element.left);
                                set(obj.props.top, element.top);
                            });
                        })
                        break;
                    case 40: // Down arrow key
                        moveSelected(Direction.DOWN);
                        activeObjects.forEach(element => {
                            const obj = getObjectbyId(element.id);
                            studio.transaction(({ set }) => {
                                set(obj.props.left, element.left);
                                set(obj.props.top, element.top);
                            });
                        })
                        break;
                    default:
                        break;
                }

                if (ctrlKey) {
                    if (key.toLowerCase() === 'c') {
                        const item = activeObjects[0];
                        if (!(item?.type === 'textbox' && item?.isEditing)) {
                            copy(window.editor.canvas);
                        }
                    } else if (key.toLowerCase() === 'v') {
                        const item = activeObjects[0];
                        if (!(item?.type === 'textbox' && item?.isEditing)) {
                            paste(window.editor.canvas);
                        }
                    }
                }
                else if (altKey) {
                    canvas.getObjects().forEach((item) => {
                        item.set('centeredScaling', true);
                    });
                }
            }
            // eslint-disable-next-line
        }, []);
        const handleKeyUp = useCallback((event) => {
            const { altKey } = event;
            if (altKey) {
                window.editor.canvas.getObjects().forEach((item) => {
                    item.set('centeredScaling', false);
                });
                window.editor.canvas.renderAll();
            }
        }, []);

        useEffect(() => {
            document.body.addEventListener('keydown', handleKeyDown);
            document.body.addEventListener('keyup', handleKeyUp);
            return () => {
                document.body.removeEventListener('keydown', handleKeyDown);
                document.body.removeEventListener('keyup', handleKeyUp);
            };
        }, [handleKeyDown, handleKeyUp]);


        const appendDatafromLocalStorage = () => {
            const oldData = canvas.toJSON(['id', 'class', 'selectable']);//'importing true
            deleteAllObjects();
            initialiseCore(localStorage.getItem('RCCpageData'));
            const newData = canvas.toJSON(['id', 'class', 'selectable']);//'importing true

            // Check and update IDs in newData if they already exist in oldData
            newData.objects.forEach(newObject => {
                const matchingOldObject = oldData.objects.find(oldObject => oldObject.id === newObject.id);
                if (matchingOldObject) {
                    // If ID already exists, assign a new ID
                    newObject.id = generateUniqueId(newObject) // Implement a function to generate a new unique ID
                }
            });

            oldData.objects = oldData.objects.concat(newData.objects);
            deleteAllObjects();
            initialiseCore(JSON.stringify(oldData), true);
        }

        return (
            <div className='rightClickMenu'
                style={{ zIndex: 200, position: 'fixed', left: 120, top: 15, color: 'white', display: visibility ? "block" : "none", textAlign: 'left' }}
            >

                <ul>
                    <li>Add<ul >
                        <li onClick={() => addItem(addImage)}>Image</li>
                        <li onClick={() => addItem(createRect)}>Rectangle <VscPrimitiveSquare /></li>
                        <li onClick={() => addItem(createRandomeStrip)}>Randome Path Strip <VscPrimitiveSquare /></li>
                        <li onClick={() => addItem(createTextBox)}>Text T</li>
                        <li onClick={() => addItem(createCircle)}>Circle <VscCircleFilled /></li>
                        <li onClick={() => addItem(createTriangle)}>Triangle <VscTriangleUp /></li>
                        <li onClick={appendDatafromLocalStorage}>Append Data from LocalStorage <VscTriangleUp /></li>

                    </ul></li>
                    <li>setPrimitivePropAsSequenced<ul>
                        <li onClick={() => {
                            // const tracks = Object.keys(getObjectbyId(studio.selection[0].address.objectKey).value);
                            // setPrimitivePropAsSequenced(tracks)
                        }}>All</li>
                        {getObjectbyId(studio?.selection?.[0]?.address?.objectKey)?.value && (Object.keys(getObjectbyId(studio?.selection?.[0]?.address?.objectKey)?.value))?.map(((val1, index) => {
                            return <li key={index} onClick={() => {
                                const obj = getObjectbyId(studio?.selection?.[0]?.address?.objectKey);
                                setPrimitivePropAsSequenced(obj, obj.props[val1]);
                            }
                            }>{val1}</li>
                        }))}
                    </ul></li>
                    <li>Edit<ul >
                        <li onClick={() => copy(canvas)}>Copy</li>
                        <li onClick={() => {
                            paste(canvas);
                        }}>Paste</li>
                    </ul></li>
                    <li>Set As Mask to
                        <ul>
                            {canvas && canvas.getObjects().map((element, i) => {
                                return (
                                    (canvas.getActiveObjects()[0] !== element) && <li key={i} onClick={() => {
                                        if (canvas.getActiveObjects().length > 0) {
                                            const clipPath = canvas.getActiveObjects()[0];
                                            clipPath.set({ globalCompositeOperation: 'destination-out', absolutePositioned: true, shadow: { ...shadowOptions, blur: 0 } });
                                            canvas.sendObjectToBack(clipPath);
                                            element.set("clipPath", clipPath);
                                            reloadPage();
                                        }
                                    }}>{element.type}-{element.id}</li>
                                )
                            })}
                        </ul>
                    </li>
                    <li onClick={() => changeId((studio?.selection?.[0]?.address?.objectKey))}>Change Id</li>
                    <li onClick={setSequenceLength}>Set sequence length</li>
                    <li onClick={clearAllAnimation}>Clear All Animations</li>
                    <li onClick={clearObjectsAllAnimation}>Clear Objects All Animations</li>

                    <li>Delete KeyFrames<ul>
                        <li onClick={() => {
                            const tracks = Object.keys(getObjectbyId(studio.selection[0].address.objectKey).value);
                            deletrTracks(tracks)
                        }}>All</li>
                        {getObjectbyId(studio?.selection?.[0]?.address?.objectKey)?.value && (Object.keys(getObjectbyId(studio?.selection?.[0]?.address?.objectKey)?.value))?.map(((val1, index) => {
                            return <li key={index} onClick={() => {
                                const tracks = [val1];
                                deletrTracks(tracks);
                            }
                            }>{val1}</li>
                        }))}
                    </ul></li>
                    <li onClick={() => {
                        studio.transaction((api) => {
                            const aa = canvas.getActiveObjects();
                            if (aa.length === 1) {
                                api.unset(getObjectbyId(aa[0].id).props);
                            }
                        })
                    }}>Reset All to Default</li>

                    <li onClick={() => deleteItem(canvas)}>Delete Object</li>
                    <li onClick={() => lockUnlock1(canvas)}>LockUnlock Object</li>
                    <li onClick={() => visibleInVisible1(canvas)}>Visibility of Object</li>



                    <li>Text Align<ul >
                        <li onClick={() => alignLeft(canvas)}>Left</li>
                        <li onClick={() => alignRight(canvas)}>Right</li>
                        <li onClick={() => alignCenter(canvas)}>Center</li>
                    </ul></li>
                    <li>Text Decoration<ul >
                        <li onClick={() => textUnderline(canvas)}>Underline Toggle</li>
                        <li onClick={() => textLineThrough(canvas)}>LineThrough Toggle</li>
                        <li onClick={() => textItalic(canvas)}>Itallic Toggle</li>
                        <li onClick={() => txtBold(canvas)}>Bold</li>
                        <li onClick={() => textNormal(canvas)}>Normal</li>
                    </ul></li>
                    <li onClick={() => bringToFront(canvas)}>Bring To Front</li>
                    <li onClick={() => sendToBack(canvas)}>Send To Back</li>
                    <li onClick={record}>Record</li>
                    <li onClick={() => {
                        dispatch({ type: 'SHOW_SAVEPANNEL', payload: !showSavePanel });
                    }}>{showSavePanel ? 'Hide Save Pannel' : 'Show Save Panel'}</li>
                    <li onClick={allOutofScreen}>All Out of Screen</li>
                </ul>
            </div>
        );
    }


    const deleteAllObjects = () => {
        canvas.getObjects().forEach(element => {
            if (getObjectbyId(element.id) !== undefined) {
                sheet.detachObject(element.id);// this is nessecarry to delete
            }
        })
    }

    const rgbaArrayToObject = (fill) => {
        const color = new fabric.Color(fill);
        const rgbaArray = color.getSource();
        // Normalize the RGBA values to a range between 0 and 1
        const normalizedValues = rgbaArray.map((value) => value / 255);

        // Create an object with properties for red, green, blue, and alpha
        const rgbaObject = {
            r: normalizedValues[0],
            g: normalizedValues[1],
            b: normalizedValues[2],
            a: normalizedValues[3] * 255,
        };
        return rgbaObject;
    }

    const initialiseCore = (jsonContent, importing = false) => {
        canvas.loadFromJSON(jsonContent).then((object) => {
            setclipPathWhileImportingWebAnimator(canvas);
            canvas.getObjects().forEach((element, i) => {
                if ((element.fill === null)) {
                    element.set({ fill: '#555252' })
                }
                if (element.stroke === null) {
                    element.set({ stroke: '#000000' })
                }
                var obj1 = {};
                var isColorObjectfill;
                var isColorObjectStroke;

                if (importing) {
                    isColorObjectfill = (element.fill.type !== 'linear');
                    isColorObjectStroke = (element.stroke.type !== 'linear');

                    if (element.fill.type === 'pattern') {
                        // do nothing
                    }
                    else if (isColorObjectfill) {
                        obj1 = {
                            ...obj1,
                            fill: (typeof element.fill === 'object' && element.fill !== null && 'r' in element.fill && 'g' in element.fill && 'b' in element.fill && 'a' in element.fill) ? types.rgba(element.fill) : types.rgba(rgbaArrayToObject(element.fill)),
                        };
                    }
                    else {
                        const colorStops = element.fill.colorStops.map((colorStop) => {
                            return {
                                offset: types.number(parseFloat(colorStop.offset), { range: [0, 1] }),
                                color: ((colorStop.color).toString().startsWith("rgb")) ? types.rgba(rgbaArrayToObject(colorStop.color)) : types.rgba(hexToRGB(colorStop.color)),
                                opacity: types.number(colorStop.opacity ? parseFloat(colorStop.opacity) : 1, { range: [0, 1] })
                            };
                        });
                        obj1 = {
                            ...obj1,
                            ...colorStops,
                            coords: {
                                x1: types.number(element.fill.coords.x1, { range: [0, 1] }),
                                y1: types.number(element.fill.coords.y1, { range: [0, 1] }),
                                x2: types.number(element.fill.coords.x2, { range: [0, 1] }),
                                y2: types.number(element.fill.coords.y2, { range: [0, 1] })
                            }
                        };
                    }

                    if (isColorObjectStroke) {
                        obj1 = {
                            ...obj1,
                            stroke: (typeof element.stroke === 'object' && element.stroke !== null && 'r' in element.stroke && 'g' in element.stroke && 'b' in element.stroke && 'a' in element.stroke) ? types.rgba(element.stroke) : types.rgba(rgbaArrayToObject(element.stroke)),
                        };
                    }
                    obj1 = {
                        ...obj1,
                        shadow: { ...element.shadow, color: (typeof element.shadow.color === 'object' && element.shadow.color !== null && 'r' in element.shadow.color && 'g' in element.shadow.color && 'b' in element.shadow.color && 'a' in element.shadow.color) ? types.rgba(element.shadow.color) : types.rgba(rgbaArrayToObject(element.shadow.color)) },
                    };

                }
                else {
                    if (!element.shadow?.color.toString().startsWith("#")) {
                        element.set({ shadow: { ...element.shadow, color: '#000000' } })
                    }
                    isColorObjectfill = (typeof (element.fill) !== 'object');
                    isColorObjectStroke = (typeof (element.stroke) !== 'object');
                    if (isColorObjectfill) {
                        obj1 = {
                            ...obj1,
                            fill: types.rgba(hexToRGB(element.fill ? element.fill : '#ff0000')),
                        };
                    }
                    else if (element.fill.type === 'pattern') {
                    }
                    else {
                        const colorStops = element.fill.colorStops.map((colorStop) => {
                            return {
                                offset: types.number(parseFloat(colorStop.offset), { range: [0, 1] }),
                                color: ((colorStop.color).toString().startsWith("rgb")) ? types.rgba(rgbaArrayToObject(colorStop.color)) : types.rgba(hexToRGB(colorStop.color)),
                                opacity: types.number(parseFloat((colorStop.opacity === undefined) ? 1 : colorStop.opacity), { range: [0, 1] })
                            };
                        });
                        obj1 = {
                            ...obj1,
                            ...colorStops,
                            coords: {
                                x1: types.number(element.fill.coords.x1, { range: [0, 1] }),
                                y1: types.number(element.fill.coords.y1, { range: [0, 1] }),
                                x2: types.number(element.fill.coords.x2, { range: [0, 1] }),
                                y2: types.number(element.fill.coords.y2, { range: [0, 1] })
                            }
                        };
                    }

                    if (isColorObjectStroke) {
                        obj1 = {
                            ...obj1,
                            stroke: types.rgba(hexToRGB(element.stroke ? element.stroke : '#000000')),
                        };
                    }
                    obj1 = {
                        ...obj1,
                        shadow: { ...shadowOptions, color: types.rgba(hexToRGB(element.shadow.color)), blur: types.number(parseInt(element.shadow.blur), { range: [0, 100] }) },
                    };

                }

                if (element.type === 'path') {
                    const pathProps = getModifiedObject(element)
                    obj1 = { ...obj1, ...pathProps }
                }
                arrObjectProps[i] = {
                    left: element.left,
                    top: element.top,
                    scaleX: types.number(element.scaleX, { nudgeMultiplier: 0.01 }),
                    scaleY: types.number(element.scaleY, { nudgeMultiplier: 0.01 }),
                    opacity: types.number(element.opacity, { range: [0, 1] }),
                    angle: element.angle,
                    rx: types.number(element.rx ? parseInt(element.rx) : 10, { range: [-360, 360] }),
                    ry: types.number(element.ry ? parseInt(element.rx) : 10, { range: [-360, 360] }),
                    fontSize: types.number(element.fontSize ? parseInt(element.fontSize) : 30, { range: [0, 100] }),
                    strkdsar: types.number(element.strokeDashArray ? parseInt(element.strokeDashArray) : 0, { range: [0, 1000] }),
                    strkDsOfst: types.number(element.strokeDashOffset ? parseInt(element.strokeDashOffset) : 0, { range: [-1000, 1000] }),
                    ...obj1,
                    strokeWidth: types.number(element.strokeWidth, { range: [0, 100] }),
                    skewX: types.number(element.skewX, { range: [-88, 88] }),
                    skewY: types.number(element.skewY, { range: [-60, 60] }),
                };
                arrObject[i] = sheet.object(element.id, arrObjectProps[i])

                onChange(sheet.sequence.pointer.position, (position) => {
                    if (element.id === 'imgSeqGroup1') {
                        element.getObjects().forEach((image, index) => {
                            image.set({ opacity: index === parseInt((position) * 30) ? 1 : 0 });
                        });
                        canvas.requestRenderAll();
                    }
                });

                arrObject[i].onValuesChange((val) => {
                    var obj2 = {};
                    if (element.fill?.type === 'pattern') {
                        // do nothing
                    }

                    else if (isColorObjectfill) {
                        obj2 = {
                            ...obj2,
                            fill: val.fill,
                        };
                    }

                    else {
                        obj2 = {
                            ...obj2,
                            fill: new fabric.Gradient({
                                type: element.fill.type,
                                gradientUnits: element.fill.gradientUnits,
                                coords: {
                                    x1: val.coords.x1,
                                    y1: val.coords.y1,
                                    x2: val.coords.x2,
                                    y2: val.coords.y2
                                },
                                colorStops: Array.from({
                                    length: element.fill.colorStops.length
                                }).map((_, i) => {
                                    return {
                                        offset: val[i].offset,
                                        color: rgbaObjectToHex(val[i].color),
                                        opacity: val[i].opacity
                                    };
                                }),
                                id: element.fill.id
                            })
                        };
                    }
                    if (isColorObjectStroke) {
                        obj2 = {
                            ...obj2,
                            stroke: val.stroke,
                        };
                    }
                    element.set({
                        left: val.left,
                        top: val.top,
                        scaleX: val.scaleX,
                        scaleY: val.scaleY,
                        opacity: val.opacity,
                        angle: val.angle,
                        rx: val.rx,
                        ry: val.ry,
                        strokeWidth: val.strokeWidth,
                        fontSize: val.fontSize,
                        strokeDashArray: [val.strkdsar, val.strkdsar],
                        strokeDashOffset: val.strkDsOfst,
                        shadow: val.shadow,
                        ...obj2,
                        skewX: val.skewX,
                        skewY: val.skewY,
                    });
                    if (element.type === 'path') {
                        const newPath = [...element.path];
                        newPath.forEach((_, i) => {
                            const newi = i + 1;
                            const ss = [];
                            if (val['Point' + newi][0]) ss.push(val['Point' + newi][0]);
                            if (val['Point' + newi][newi * 10 + 'x'])
                                ss.push(val['Point' + newi][newi * 10 + 'x']);
                            if (val['Point' + newi][newi * 10 + 'y'])
                                ss.push(val['Point' + newi][newi * 10 + 'y']);
                            if (val['Point' + newi][newi * 10 + 1 + 'x'])
                                ss.push(val['Point' + newi][newi * 10 + 1 + 'x']);
                            if (val['Point' + newi][newi * 10 + 1 + 'y'])
                                ss.push(val['Point' + newi][newi * 10 + 1 + 'y']);
                            if (val['Point' + newi][newi * 10 + 2 + 'x'])
                                ss.push(val['Point' + newi][newi * 10 + 2 + 'x']);
                            if (val['Point' + newi][newi * 10 + 2 + 'y'])
                                ss.push(val['Point' + newi][newi * 10 + 2 + 'y']);
                            newPath[i] = ss;
                        });
                        element.set({ path: newPath, objectCaching: false, })
                    }

                    element.setCoords();
                    canvas.requestRenderAll();
                });
                const onMouseMove = (obj, event) => {
                    if (mouseDown === 1) {
                        studio.transaction(({ set }) => {
                            set(obj.props.left, event.target.left);
                            set(obj.props.top, event.target.top);
                            set(obj.props.angle, event.target.angle);
                        });
                    }
                };
                const onScaling = (obj, event) => {
                    studio.transaction(({ set }) => {
                        set(obj.props.scaleX, event.transform.target.scaleX);
                        set(obj.props.scaleY, event.transform.target.scaleY);
                    });
                };

                element.on('mousedown', () => studio.setSelection([arrObject[i]]), false);
                element.on('mousemove', (e) => onMouseMove(arrObject[i], e), false);
                element.on('scaling', (e) => onScaling(arrObject[i], e), false);
                element.on('mousedblclick', () => edit(dispatch), false)

            })
        })
    }
    const reset = () => {
        localStorage.removeItem('theatre-0.4.persistent');
        window.location.reload();
    }
    const pause = layerNumber => {
        endpoint(`call ${window.chNumber}-${layerNumber} window.sheet.sequence.pause()`);
        executeScript(`sheet_${layerNumber}.sequence.pause()`);
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

    const playtoCasparcg = (layerNumber, loopcount, duration, enableLoopAnimation, loopAnimationStart, loopAnimationEnd, selectedOption) => {
        const content = JSON.stringify(canvas.toJSON(['id', 'class', 'selectable']));
        const contentforHtml = content.replaceAll('"', '\\"').replaceAll('\\n', '\\\\n');
        const contentforcasparcg = content.replaceAll('"', '\\"').replaceAll('\\n', 'CRLF');
        const state1 = (JSON.stringify(studio.createContentOfSaveFile(projectId)));
        const scriptforHTML = `
        localStorage.removeItem('theatre-0.4.persistent');
        window.canvas_${layerNumber}?.getObjects().forEach(element => {
            sheet_${layerNumber}?.detachObject(element.id);
        });
        var mouseDown = 0;
        document.body.onmousedown = function () {
            mouseDown = 1;
        };
        document.body.onmouseup = function () {
            mouseDown = 0;
        };

        document.getElementById('divid_${layerNumber}')?.remove();
        var aa = document.createElement('div');
        aa.style.position='absolute';
        aa.setAttribute('id','divid_' + '${layerNumber}');
        document.body.style.overflow='hidden';
        document.body.style.zoom=(${currentscreenSize * 100}/1920)+'%';
        aa.innerHTML += \`<canvas id='canvas_${layerNumber}' width='1920' height='1080'></canvas>;\`;
        document.body.appendChild(aa);
        var canvas_${layerNumber} = new fabric.Canvas('canvas_${layerNumber}');
       
        window.canvas_${layerNumber}=canvas_${layerNumber};
        canvas_${layerNumber}.preserveObjectStacking = true;
        var content =\`${contentforHtml}\`;
        const shadowOptions = {
            color: '#000000',
            blur: 30,
            offsetX: 0,
            offsetY: 0,
            affectStroke: false
        };
       
        const rgbaObjectToHex = (rgba) => {
            let r = Math.round(rgba.r * 255).toString(16).padStart(2, '0');
            let g = Math.round(rgba.g * 255).toString(16).padStart(2, '0');
            let b = Math.round(rgba.b * 255).toString(16).padStart(2, '0');
            let hex = '#' + r + g + b;
            return hex;
        };
        const arrObject = [];
        window.changePropOfObject = (id, str1, str2) => {
            const objs = arrObject.find(object => {
                return (object.address.objectKey === id)
            });
            if (objs) {
                const obj = objs;
                window.studio.transaction(({ set }) => {
                    set(obj.props[str1], str2);
                });
            }
        };
        window.getPropOfObject = (id, str1) => {
            const objs = arrObject.find(object => {
                return (object.address.objectKey === id)
            });
            if (objs) {
                const obj = objs;
                return obj.value[str1];
            }
            else{
                const aa = findElementWithId(window.canvas, id);
                if (aa) {
                    return aa[str1];
                }
            }
        };
        canvas_${layerNumber}.loadFromJSON(content).then(() => {
            ${strinSetclipPathWhileImporting('_' + layerNumber)}

            const { core } = __TheatreJS_StudioBundle._studio;

            const rafDriver =core.createRafDriver({ name: 'a custom 25fps raf driver' });
            setInterval(() => {
            rafDriver.tick(performance.now());
            }, ${1000 / FPS});

            const { _studio } = __TheatreJS_StudioBundle;
            window.studio=_studio;
           
            window.project = core.getProject('${'project' + generateUniqueNumber()}', {state:${(state1.replaceAll('"', "'")).replaceAll("\\'", '\\"')}});
            window.sheet_${layerNumber} = project.sheet('Sheet 1');

            core.onChange(sheet_${layerNumber}.sequence.pointer.position, (position) => {
            const aa5=canvas_${layerNumber}.getObjects().find((element=>element.id==='imgSeqGroup1'));
            aa5 && aa5.getObjects().forEach((image, index) => {
                image.set({ opacity: index === parseInt((position) * ${FPS}) ? 1 : 0 });
            });
            canvas_${layerNumber}.requestRenderAll();
           });

            project.ready.then(() => {
                window.sheet_${layerNumber}.sequence.play({rafDriver,range:[0,${duration}]}).then(()=>${enableLoopAnimation} && window.sheet_${layerNumber}.sequence.play({rafDriver,range:[${loopAnimationStart},${loopAnimationEnd}],iterationCount: Infinity,direction: '${selectedOption}'}));
            });
           
            canvas_${layerNumber}.getObjects().forEach((element,i) => {
              var obj1 = {};
              const isnotGradientfill = (element.fill.type!=='linear');
              if (element.fill.type === 'pattern') {
                }
              else if (isnotGradientfill) {
                  obj1 = {
                      ...obj1,
                      fill: core.types.rgba(element.fill),
                  };
              }
              else {
                const colorStops = element.fill.colorStops.map((colorStop) => {
                    return {
                        offset: core.types.number(colorStop.offset, { range: [0, 1] }),
                        color: core.types.rgba(hexToRGB(colorStop.color)),
                        opacity: core.types.number(colorStop.opacity, { range: [0, 1] })
                    };
                });
                obj1 = {
                    ...obj1,
                    ...colorStops,
                    coords: {
                        x1: core.types.number(element.fill.coords.x1, { range: [0, 1] }),
                        y1: core.types.number(element.fill.coords.y1, { range: [0, 1] }),
                        x2: core.types.number(element.fill.coords.x2, { range: [0, 1] }),
                        y2: core.types.number(element.fill.coords.y2, { range: [0, 1] })
                    }
                };
            }
              const isnotGradientstroke= (element.stroke.type!=='linear');
              if (isnotGradientstroke) {
                  obj1 = {
                      ...obj1,
                      stroke: core.types.rgba(element.stroke),
                  };
              }
              if (element.type === 'path') {
                const pathProps = getModifiedObject(element)
                obj1 = { ...obj1, ...pathProps }
              }
              arrObject[i] = sheet_${layerNumber}.object(element.id, {
                    left: element.left,
                    top: element.top,
                    opacity: core.types.number(element.opacity, { nudgeMultiplier: 0.1 }),
                    scaleX: core.types.number(element.scaleX, { nudgeMultiplier: 0.01 }),
                    scaleY: core.types.number(element.scaleY, { nudgeMultiplier: 0.01 }),
                    angle: element.angle,
                    rx: core.types.number(element.rx? element.rx : 10, { range: [0, 100] }),
                    ry: core.types.number(element.ry? element.rx : 10, { range: [0, 100] }),
                    strokeWidth: core.types.number(element.strokeWidth, { range: [0, 100] }),
                    fontSize: core.types.number(element.fontSize? parseInt(element.fontSize) : 30, { range: [0, 100] }),
                    strkdsar: core.types.number(element.strokeDashArray? parseInt(element.strokeDashArray) : 0, { range: [0, 1000] }),
                    strkDsOfst: core.types.number(element.strokeDashOffset? parseInt(element.strokeDashOffset) : 0, { range: [-1000, 1000] }),
                    shadow: { ...shadowOptions, color:(core.types.rgba(element.shadow.color)) , blur: core.types.number(parseInt(element.shadow.blur), { range: [0, 100] }) },
                    ...obj1,
                    skewX: core.types.number(element.skewX, { range: [-60, 60] }),
                    skewY: core.types.number(element.skewY, { range: [-60, 60] }),

                });
                arrObject[i].onValuesChange((val) => {
                    var obj2 = {};
                    if (element.fill.type === 'pattern') {
                    }
                    else if (isnotGradientfill) {
                        obj2 = {
                            ...obj2,
                            fill: val.fill,
                        };
                    }
                    else {
                        obj2 = {
                            ...obj2,
                            fill: new fabric.Gradient({
                                type: element.fill.type,
                                gradientUnits: element.fill.gradientUnits,
                                coords: {
                                    x1: val.coords.x1,
                                    y1: val.coords.y1,
                                    x2: val.coords.x2,
                                    y2: val.coords.y2
                                },
                                colorStops: Array.from({
                                    length: element.fill.colorStops.length
                                }).map((_, i) => {
                                    return {
                                        offset: val[i].offset,
                                        color: rgbaObjectToHex(val[i].color),
                                        opacity: val[i].opacity
                                    };
                                }),
                                id: element.fill.id
                            })
                        };
                    }
                    if (isnotGradientstroke) {
                        obj2 = {
                            ...obj2,
                            stroke: val.stroke,
                        };
                    }
                        element.set({
                            left: val.left,
                            top: val.top,
                          
                            opacity: val.opacity,
                            scaleX: val.scaleX,
                            scaleY: val.scaleY,
                            angle: val.angle,
                            rx: val.rx,
                            ry: val.ry,
                            strokeWidth: val.strokeWidth,
                            fontSize: val.fontSize,
                            strokeDashArray: [val.strkdsar, val.strkdsar],
                            strokeDashOffset: val.strkDsOfst,
                            shadow: val.shadow,
                           ...obj2,
                            skewX: val.skewX,
                            skewY: val.skewY,
                        });

                        if (element.type === 'path') {
                            const newPath = [...element.path];
                            newPath.forEach((_, i) => {
                                const newi = i + 1;
                                const ss = [];
                                if (val['Point' + newi][0]) ss.push(val['Point' + newi][0]);
                                if (val['Point' + newi][newi * 10 + 'x'])
                                    ss.push(val['Point' + newi][newi * 10 + 'x']);
                                if (val['Point' + newi][newi * 10 + 'y'])
                                    ss.push(val['Point' + newi][newi * 10 + 'y']);
                                if (val['Point' + newi][newi * 10 + 1 + 'x'])
                                    ss.push(val['Point' + newi][newi * 10 + 1 + 'x']);
                                if (val['Point' + newi][newi * 10 + 1 + 'y'])
                                    ss.push(val['Point' + newi][newi * 10 + 1 + 'y']);
                                if (val['Point' + newi][newi * 10 + 2 + 'x'])
                                    ss.push(val['Point' + newi][newi * 10 + 2 + 'x']);
                                if (val['Point' + newi][newi * 10 + 2 + 'y'])
                                    ss.push(val['Point' + newi][newi * 10 + 2 + 'y']);
                                newPath[i] = ss;
                            });
                            element.set({ path: newPath, objectCaching: false, })
                        }
                        element.setCoords();
                        canvas_${layerNumber}.requestRenderAll();
                });
                        const onMouseMove = (obj, event) => {
                            if (mouseDown === 1) {
                                studio.transaction(({ set }) => {
                                    set(obj.props.left, event.target.left);
                                    set(obj.props.top, event.target.top);
                                    set(obj.props.angle, event.target.angle);
                                });
                            }
                        };
                        const onScaling = (obj, event) => {
                            studio.transaction(({ set }) => {
                                set(obj.props.scaleX, event.transform.target.scaleX);
                                set(obj.props.scaleY, event.transform.target.scaleY);
                            });
                        };
                      
                        const onMousedown = (obj, event) => {
                        };
                        element.on('mousedown', (e) => onMousedown(arrObject[i], e), false);
                        element.on('mousemove', (e) => onMouseMove(arrObject[i], e), false);
                        element.on('scaling', (e) => onScaling(arrObject[i], e), false);

            });
        });
        `
        executeScript(scriptforHTML);
        endpoint(`play ${window.chNumber}-${layerNumber} [html] "https://localhost:10000/ReactCasparClient/Theatrejs2"`);
        // endpoint(`call ${window.chNumber}-${layerNumber} "${scriptforCasparcg}"`)
        endpoint(`call ${window.chNumber}-${layerNumber} "
        localStorage.removeItem('theatre-0.4.persistent');
      
        var mouseDown = 0;
        document.body.onmousedown = function () {
            mouseDown = 1;
        };
        document.body.onmouseup = function () {
            mouseDown = 0;
        };
        if(document.getElementById('divid_${layerNumber}')){
            document.getElementById('divid_${layerNumber}').remove();
        }
        var aa = document.createElement('div');
        aa.style.position='absolute';
        aa.setAttribute('id','divid_' + '${layerNumber}');
        document.body.style.overflow='hidden';
        document.body.style.zoom=(${currentscreenSize * 100}/1920)+'%';
        aa.innerHTML += \`<canvas id='canvas' width='1920' height='1080'></canvas>;\`;
        document.body.appendChild(aa);
        var canvas = new fabric.Canvas('canvas');

        window.canvas=canvas;
        window.canvas\\?.getObjects().forEach(element => {
            sheet\\?.detachObject(element.id);
        });
        canvas.preserveObjectStacking = true;
        var content =\`${contentforcasparcg}\`;
        const shadowOptions = {
            color: '#000000',
            blur: 30,
            offsetX: 0,
            offsetY: 0,
            affectStroke: false
        };
        const rgbaObjectToHex = (rgba) => {
            let r = Math.round(rgba.r * 255).toString(16).padStart(2, '0');
            let g = Math.round(rgba.g * 255).toString(16).padStart(2, '0');
            let b = Math.round(rgba.b * 255).toString(16).padStart(2, '0');
            let hex = '#' + r + g + b;
            return hex;
        };
        const arrObject = [];
        window.changePropOfObject = (id, str1, str2) => {
            const objs = arrObject.find(object => {
                return (object.address.objectKey === id)
            });
            if (objs) {
                const obj = objs;
                window.studio.transaction(({ set }) => {
                    set(obj.props[str1], str2);
                });
            }
        };
        window.getPropOfObject = (id, str1) => {
            const objs = arrObject.find(object => {
                return (object.address.objectKey === id)
            });
            if (objs) {
                const obj = objs;
                return obj.value[str1];
            }
            else{
                const aa = findElementWithId(window.canvas, id);
                if (aa) {
                    return aa[str1];
                }
            }
        };
        canvas.loadFromJSON(content).then(() => {
            ${strinSetclipPathWhileImporting('')}
            const { core } = __TheatreJS_StudioBundle._studio;
        

            const rafDriver =core.createRafDriver({ name: 'a custom 25fps raf driver' });
            setInterval(() => {
            rafDriver.tick(performance.now());
            }, ${1000 / FPS});

            const { _studio } = __TheatreJS_StudioBundle;
            window.studio=_studio;

            window.project = core.getProject('${'project' + generateUniqueNumber()}', {state:${(state1.replaceAll('"', "'")).replaceAll("\\'", '\\"')}});
            window.sheet = project.sheet('Sheet 1');

            core.onChange(sheet.sequence.pointer.position, (position) => {
            const aa5=canvas.getObjects().find((element=>element.id==='imgSeqGroup1'));
            aa5 && aa5.getObjects().forEach((image, index) => {
                image.set({ opacity: index === parseInt((position) * ${FPS}) ? 1 : 0 });
            });
            canvas.requestRenderAll();
           });

            project.ready.then(() => {
                window.sheet.sequence.play({rafDriver,range:[0,${duration}]}).then(()=>${enableLoopAnimation} && window.sheet.sequence.play({rafDriver,range:[${loopAnimationStart},${loopAnimationEnd}],iterationCount: Infinity,direction: '${selectedOption}'}));
            });
            canvas.getObjects().forEach((element,i) => {
                if(element.type==='textbox'){
                    element.set({text:CRLFtobackslashn(element.text)});
                }
                var obj1 = {};
                const isnotGradientfill = (element.fill.type!=='linear');
                if (element.fill.type === 'pattern') {
                }
                else if (isnotGradientfill) {
                    obj1 = {
                        ...obj1,
                        fill: core.types.rgba(element.fill),
                    };
                }
                else {
                    const colorStops = element.fill.colorStops.map((colorStop) => {
                        return {
                            offset: core.types.number(colorStop.offset, { range: [0, 1] }),
                            color: core.types.rgba(hexToRGB(colorStop.color)),
                            opacity: core.types.number(colorStop.opacity, { range: [0, 1] })
                        };
                    });
                    obj1 = {
                        ...obj1,
                        ...colorStops,
                        coords: {
                            x1: core.types.number(element.fill.coords.x1, { range: [0, 1] }),
                            y1: core.types.number(element.fill.coords.y1, { range: [0, 1] }),
                            x2: core.types.number(element.fill.coords.x2, { range: [0, 1] }),
                            y2: core.types.number(element.fill.coords.y2, { range: [0, 1] })
                        }
                    };
                }
                const isnotGradientstroke= (element.stroke.type!=='linear');
                if (isnotGradientstroke) {
                    obj1 = {
                        ...obj1,
                        stroke: core.types.rgba(element.stroke),
                    };
                }
                if (element.type === 'path') {
                    const pathProps = getModifiedObject(element);
                    obj1 = { ...obj1, ...pathProps };
                };
                arrObject[i] = sheet.object(element.id, {
                    left: element.left,
                    top: element.top,
                    opacity: core.types.number(element.opacity, { nudgeMultiplier: 0.1 }),
                    scaleX: core.types.number(element.scaleX, { nudgeMultiplier: 0.01 }),
                    scaleY: core.types.number(element.scaleY, { nudgeMultiplier: 0.01 }),
                    angle: element.angle,
                    rx: core.types.number(element.rx? element.rx : 10, { range: [0, 100] }),
                    ry: core.types.number(element.ry? element.rx : 10, { range: [0, 100] }),
                    strokeWidth: core.types.number(element.strokeWidth, { range: [0, 100] }),
                    fontSize: core.types.number(element.fontSize? parseInt(element.fontSize) : 30, { range: [0, 100] }),
                    strkdsar: core.types.number(element.strokeDashArray? parseInt(element.strokeDashArray) : 0, { range: [0, 1000] }),
                    strkDsOfst: core.types.number(element.strokeDashOffset? parseInt(element.strokeDashOffset) : 0, { range: [-1000, 1000] }),
                    shadow: { ...shadowOptions, color:(core.types.rgba(element.shadow.color)) , blur: core.types.number(parseInt(element.shadow.blur), { range: [0, 100] }) },
                    ...obj1,
                    skewX: core.types.number(element.skewX, { range: [-60, 60] }),
                    skewY: core.types.number(element.skewY, { range: [-60, 60] }),

                });
                arrObject[i].onValuesChange((val) => {
                    var obj2 = {};
                    if (element.fill.type === 'pattern') {
                    }
                    
                    else if (isnotGradientfill) {
                        obj2 = {
                            ...obj2,
                            fill: val.fill,
                        };
                    }
                    else {
                        obj2 = {
                            ...obj2,
                            fill: new fabric.Gradient({
                                type: element.fill.type,
                                gradientUnits: element.fill.gradientUnits,
                                coords: {
                                    x1: val.coords.x1,
                                    y1: val.coords.y1,
                                    x2: val.coords.x2,
                                    y2: val.coords.y2
                                },
                                colorStops: Array.from({
                                    length: element.fill.colorStops.length
                                }).map((_, i) => {
                                    return {
                                        offset: val[i].offset,
                                        color: rgbaObjectToHex(val[i].color),
                                        opacity: val[i].opacity
                                    };
                                }),
                                id: element.fill.id
                            })
                        };
                    }
                    if (isnotGradientstroke) {
                        obj2 = {
                            ...obj2,
                            stroke: val.stroke,
                        };
                    }
                        element.set({
                            left: val.left,
                            top: val.top,
                          
                            opacity: val.opacity,
                            scaleX: val.scaleX,
                            scaleY: val.scaleY,
                            angle: val.angle,
                            rx: val.rx,
                            ry: val.ry,
                            strokeWidth: val.strokeWidth,
                            fontSize: val.fontSize,
                            strokeDashArray: [val.strkdsar, val.strkdsar],
                            strokeDashOffset: val.strkDsOfst,
                            shadow: val.shadow,
                           ...obj2,
                            skewX: val.skewX,
                            skewY: val.skewY,
                        });
                        if (element.type === 'path') {
                            const newPath = [...element.path];
                            newPath.forEach((_, i) => {
                                const newi = i + 1;
                                const ss = [];
                                if (val['Point' + newi][0]) ss.push(val['Point' + newi][0]);
                                if (val['Point' + newi][newi * 10 + 'x'])
                                    ss.push(val['Point' + newi][newi * 10 + 'x']);
                                if (val['Point' + newi][newi * 10 + 'y'])
                                    ss.push(val['Point' + newi][newi * 10 + 'y']);
                                if (val['Point' + newi][newi * 10 + 1 + 'x'])
                                    ss.push(val['Point' + newi][newi * 10 + 1 + 'x']);
                                if (val['Point' + newi][newi * 10 + 1 + 'y'])
                                    ss.push(val['Point' + newi][newi * 10 + 1 + 'y']);
                                if (val['Point' + newi][newi * 10 + 2 + 'x'])
                                    ss.push(val['Point' + newi][newi * 10 + 2 + 'x']);
                                if (val['Point' + newi][newi * 10 + 2 + 'y'])
                                    ss.push(val['Point' + newi][newi * 10 + 2 + 'y']);
                                newPath[i] = ss;
                            });
                            element.set({ path: newPath, objectCaching: false, });
                        };
                        element.setCoords();
                        canvas.requestRenderAll();
                });
                        const onMouseMove = (obj, event) => {
                            if (mouseDown === 1) {
                                studio.transaction(({ set }) => {
                                    set(obj.props.left, event.target.left);
                                    set(obj.props.top, event.target.top);
                                    set(obj.props.angle, event.target.angle);
                                });
                            }
                        };
                        const onScaling = (obj, event) => {
                            studio.transaction(({ set }) => {
                                set(obj.props.scaleX, event.transform.target.scaleX);
                                set(obj.props.scaleY, event.transform.target.scaleY);
                            });
                        };
                      
                        const onMousedown = (obj, event) => {
                        };
                        element.on('mousedown', (e) => onMousedown(arrObject[i], e), false);
                        element.on('mousemove', (e) => onMouseMove(arrObject[i], e), false);
                        element.on('scaling', (e) => onScaling(arrObject[i], e), false);
            });
        });
        "`)
    }

    const exportHtml = async (overRide = false) => {
        const mainPageData = JSON.stringify({ duration, enableLoopAnimation, loopAnimationStart, loopAnimationEnd, selectedOption, jsfilename, FPS, currentscreenSize })
        const gdd = getGdd(canvas, 'RCCWebAnimator');
        const xx4 = `
        document.body.addEventListener('keypress', function(e) {
            if(e.key.toUpperCase() === "S") { stop(); }
          });
        const getModifiedObject = (path1) => {
            const aa = {};
            path1.path.forEach((element, i) => {
              const newi = i + 1;
          
              const originalArray = element;
              const myObject = { ...originalArray };
          
              // Create a new object with modified keys
              const modifiedObject = {};
              for (const key in myObject) {
                if (key === '1') {
                  modifiedObject[newi * 10 + 'x'] = myObject[key];
                } else if (key === '2') {
                  modifiedObject[newi * 10 + 'y'] = myObject[key];
                } else if (key === '3') {
                  modifiedObject[newi * 10 + 1 + 'x'] = myObject[key];
                } else if (key === '4') {
                  modifiedObject[newi * 10 + 1 + 'y'] = myObject[key];
                } else if (key === '5') {
                  modifiedObject[newi * 10 + 2 + 'x'] = myObject[key];
                } else if (key === '6') {
                  modifiedObject[newi * 10 + 2 + 'y'] = myObject[key];
                } else {
                  modifiedObject[key] = myObject[key];
                }
              }
          
              aa['Point' + newi] = modifiedObject;
            });
            return aa;
          };
        window.changePropOfObject = (id, str1, str2) => {
            const objs = arrObject.find(object => {
                return (object.address.objectKey === id)
            });
            if (objs) {
                const obj = objs;
                studio.transaction(({ set }) => {
                    set(obj.props[str1], str2);
                });
            }
            else {
                const aa = findElementWithId(window.canvas, id);
                if (aa) {
                    aa.set(str1, str2)
                    window.canvas.requestRenderAll();
                }
            }
        };
        window.getPropOfObject = (id, str1) => {
            const objs = arrObject.find(object => {
                return (object.address.objectKey === id)
            });
            if (objs) {
                const obj = objs;
                return obj.value[str1];
            }
            else{
                const aa = findElementWithId(window.canvas, id);
                if (aa) {
                    return aa[str1];
                }
            }
        };
        const setAllCcgInvisble = element => {
            if (window.caspar || window.casparcg || window.tickAnimations) {
                if ((element.id).startsWith("ccg")) {
                    if (element.type === 'group') {
                        element.getObjects().forEach((element1) => {
                        setAllCcgInvisble(element1);
                        })
                    }
                    else {
                    element.set({ visible: false });
                    }
                }
            }
        }
        canvas.getObjects().forEach((element,i) => {
            setAllCcgInvisble(element);
           
            var obj1 = {};
            const isnotGradientfill = (element.fill.type!=='linear');
            if (element.fill.type === 'pattern') {
                
            }
            else if (isnotGradientfill) {
                obj1 = {
                    ...obj1,
                    fill: core.types.rgba(element.fill),
                };
            }
            else {
                const colorStops = element.fill.colorStops.map((colorStop) => {
                    return {
                        offset: core.types.number(colorStop.offset, { range: [0, 1] }),
                        color: core.types.rgba(hexToRGB(colorStop.color)),
                        opacity: core.types.number(colorStop.opacity, { range: [0, 1] })
                    };
                });
                obj1 = {
                    ...obj1,
                    ...colorStops,
                    coords: {
                        x1: core.types.number(element.fill.coords.x1, { range: [0, 1] }),
                        y1: core.types.number(element.fill.coords.y1, { range: [0, 1] }),
                        x2: core.types.number(element.fill.coords.x2, { range: [0, 1] }),
                        y2: core.types.number(element.fill.coords.y2, { range: [0, 1] })
                    }
                };
            }
            const isnotGradientstroke= (element.stroke.type!=='linear');
            if (isnotGradientstroke) {
                obj1 = {
                    ...obj1,
                    stroke: core.types.rgba(element.stroke),
                };
            }
            if (element.type === 'path') {
                const pathProps = getModifiedObject(element)
                obj1 = { ...obj1, ...pathProps }
            }
            arrObject[i] = sheet.object(element.id, {
                left: element.left,
                left: element.left,
                top: element.top,
                opacity: core.types.number(element.opacity, { nudgeMultiplier: 0.1 }),
                scaleX: core.types.number(element.scaleX, { nudgeMultiplier: 0.01 }),
                scaleY: core.types.number(element.scaleY, { nudgeMultiplier: 0.01 }),
                angle: element.angle,
               
                rx: core.types.number(element.rx ? element.rx : 10, { range: [0, 100] }),
                ry: core.types.number(element.ry ? element.rx : 10, { range: [0, 100] }),
                strokeWidth: core.types.number(element.strokeWidth, { range: [0, 100] }),
               
                fontSize: core.types.number(element.fontSize ? parseInt(element.fontSize) : 30, { range: [0, 100] }),
                strkdsar: core.types.number(element.strokeDashArray ? parseInt(element.strokeDashArray) : 0, { range: [0, 1000] }),
                strkDsOfst: core.types.number(element.strokeDashOffset ? parseInt(element.strokeDashOffset) : 0, { range: [-1000, 1000] }),
                shadow: { ...shadowOptions, color: core.types.rgba(element.shadow.color), blur: core.types.number(parseInt(element.shadow.blur), { range: [0, 100] }) },
                ...obj1,
                skewX: core.types.number(element.skewX, { range: [-60, 60] }),
                skewY: core.types.number(element.skewY, { range: [-60, 60] }),
            });`

        const xx5 = ` 
         core.onChange(sheet.sequence.pointer.position, (position) => {
            const aa5=canvas.getObjects().find((element=>element.id==='imgSeqGroup1'));
            aa5 && aa5.getObjects().forEach((image, index) => {
                image.set({ opacity: index === parseInt((position) * ${FPS}) ? 1 : 0 });
            });
            canvas.requestRenderAll();
           });

        arrObject[i].onValuesChange((val) => {
            var obj2 = {};
            if (element.fill.type === 'pattern') {
            }
            else if (isnotGradientfill) {
                obj2 = {
                    ...obj2,
                    fill: val.fill,
                };
            }
            else {
                obj2 = {
                    ...obj2,
                    fill: new fabric.Gradient({
                        type: element.fill.type,
                        gradientUnits: element.fill.gradientUnits,
                        coords: {
                            x1: val.coords.x1,
                            y1: val.coords.y1,
                            x2: val.coords.x2,
                            y2: val.coords.y2
                        },
                        colorStops: Array.from({
                            length: element.fill.colorStops.length
                        }).map((_, i) => {
                            return {
                                offset: val[i].offset,
                                color: rgbaObjectToHex(val[i].color),
                                opacity: val[i].opacity
                            };
                        }),
                        id: element.fill.id
                    })
                };
            }
            if (isnotGradientstroke) {
                obj2 = {
                    ...obj2,
                    stroke: val.stroke,
                };
            }
                        element.set({
                            left: val.left,
                            top: val.top,
                            opacity: val.opacity,
                            scaleX: val.scaleX,
                            scaleY: val.scaleY,
                            angle: val.angle,
                            rx: val.rx,
                            ry: val.ry,
                            strokeWidth: val.strokeWidth,
                            fontSize: val.fontSize,
                            strokeDashArray: [val.strkdsar, val.strkdsar],
                            strokeDashOffset: val.strkDsOfst,
                            shadow: val.shadow,
                           ...obj2,
                            skewX: val.skewX,
                            skewY: val.skewY,
                });
                if (element.type === 'path') {
                    const newPath = [...element.path];
                    newPath.forEach((_, i) => {
                        const newi = i + 1;
                        const ss = [];
                        if (val['Point' + newi][0]) ss.push(val['Point' + newi][0]);
                        if (val['Point' + newi][newi * 10 + 'x'])
                            ss.push(val['Point' + newi][newi * 10 + 'x']);
                        if (val['Point' + newi][newi * 10 + 'y'])
                            ss.push(val['Point' + newi][newi * 10 + 'y']);
                        if (val['Point' + newi][newi * 10 + 1 + 'x'])
                            ss.push(val['Point' + newi][newi * 10 + 1 + 'x']);
                        if (val['Point' + newi][newi * 10 + 1 + 'y'])
                            ss.push(val['Point' + newi][newi * 10 + 1 + 'y']);
                        if (val['Point' + newi][newi * 10 + 2 + 'x'])
                            ss.push(val['Point' + newi][newi * 10 + 2 + 'x']);
                        if (val['Point' + newi][newi * 10 + 2 + 'y'])
                            ss.push(val['Point' + newi][newi * 10 + 2 + 'y']);
                        newPath[i] = ss;
                    });
                    element.set({ path: newPath, objectCaching: false, })
                }
                element.setCoords();
                canvas.requestRenderAll();
            });
            const onMouseMove = (obj, event) => {
                if (mouseDown === 1) {
                    studio.transaction(({ set }) => {
                        set(obj.props.left, event.target.left);
                        set(obj.props.top, event.target.top);
                        set(obj.props.angle, event.target.angle);
                    });
                }
            };
            const onScaling = (obj, event) => {
                studio.transaction(({ set }) => {
                    set(obj.props.scaleX, event.transform.target.scaleX);
                    set(obj.props.scaleY, event.transform.target.scaleY);
                });
            };
           
            element.on('mousedown', () => studio.setSelection([arrObject[i]]), false);
            element.on('mousemove', (e) => onMouseMove(arrObject[i], e), false);
            element.on('scaling', (e) => onScaling(arrObject[i], e), false);
            `
        const aa =
            `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
                ${gdd}
                <script>const mainPageData=${mainPageData}<//script>
                <script>${fabric1}<//script>
                <script>${coreAndStudio1}<//script>
        </head>

        <body style='overflow:hidden; margin:0;'>

    <div><canvas id='canvas' width='1920' height='1080'></canvas></div>
    <script>
    const arrObject = [];
    var sheet;
    </script>
    <script type="module">
        localStorage.removeItem('theatre-0.4.persistent');
        var mouseDown = 0;
        document.body.onmousedown = function () {
            mouseDown = 1;
        };
        document.body.onmouseup = function () {
            mouseDown = 0;
        };
    const hexToRGB = hex => {
        const red = parseInt(hex.slice(1, 3), 16)
        const green = parseInt(hex.slice(3, 5), 16)
        const blue = parseInt(hex.slice(5, 7), 16)
        return {r:red/255, g:green/255, b:blue/255, a:1} // return an object
        // return [ r, g, b ]
    }
    const rgbaObjectToHex = (rgba) => {
        let r = Math.round(rgba.r * 255).toString(16).padStart(2, "0");
        let g = Math.round(rgba.g * 255).toString(16).padStart(2, "0");
        let b = Math.round(rgba.b * 255).toString(16).padStart(2, "0");
        let hex = "#" + r + g + b;
        return hex;
    }
         const shadowOptions = {
            color: '#000000',
            blur: 30,
            offsetX: 0,
            offsetY: 0,
            affectStroke: false
        };
        var canvas = new fabric.Canvas('canvas');
        document.body.style.zoom=(${currentscreenSize * 100}/1920)+'%';
        window.canvas=canvas;
        canvas.preserveObjectStacking = true;
        const content =${JSON.stringify(canvas.toJSON(['id', 'class', 'selectable']))};
        const { core, studio } = Theatre;
        window.content=content;

        const rafDriver =core.createRafDriver({ name: 'a custom 25fps raf driver' });
        setInterval(() => {
        rafDriver.tick(performance.now());
        }, ${1000 / FPS});

        studio.initialize();
        studio.ui.hide();
        window.studio=studio;
        const project = core.getProject('${projectId}', {state:${JSON.stringify(studio.createContentOfSaveFile(projectId))}});
        sheet = project.sheet('Sheet 1')
        canvas.loadFromJSON(content).then(() => {
            ${strinSetclipPathWhileImporting('')}
            ${xx4}
            ${xx5}
        })
        });
        project.ready.then(() => {
            window.sheet.sequence.play({rafDriver, range:[0,${duration}]}).then(()=>${enableLoopAnimation} && window.sheet.sequence.play({rafDriver, range:[${loopAnimationStart},${loopAnimationEnd}],iterationCount: Infinity,direction: '${selectedOption}'}));
        });
         <//script>
         <script>
         var dataCaspar = {};
         function escapeHtml(unsafe) {
             return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
         }
         function parseCaspar(str) {
             var xmlDoc;
             if (window.DOMParser) {
                 parser = new DOMParser();
                 xmlDoc = parser.parseFromString(str, "text/xml");
             }
             dataCaspar = XML2JSON(xmlDoc.documentElement.childNodes);
         }
         function XML2JSON(node) {
             var data = {}; // resulting object
             for (k = 0; k < node.length; k++) {
                 var idCaspar = node[k].getAttribute("id");
                 var valCaspar = node[k].childNodes[0].getAttribute("value");
                 if (idCaspar != undefined && valCaspar != undefined) {
                     data[idCaspar] = valCaspar;
                 };
             }
             return data;
         }
         function dataInsert(dataCaspar) {
            setTimeout(() => {
             for (var idCaspar in dataCaspar) {
                 const aa =findElementWithId(canvas,idCaspar);
                 if (aa){
                    const element = aa;
                   if (element.type === 'image') {
                       fabric.Image.fromURL( escapeHtml(dataCaspar[idCaspar])).then((img) => {
                           img.set({ scaleX: element.width / img.width, scaleY: (element.height / img.height) });
                               element.setSrc(img.cloneAsImage().getSrc()).then( () => {
                                   element.set({ visible: true });
                                    setTimeout(() => {
                                   changePropOfObject(idCaspar, 'scaleX',getPropOfObject(idCaspar, 'scaleX')+0.00001)  ;
                                  }, 10);
                                   canvas.requestRenderAll();
                               })
                       })
                   }
                    else {
                        const bb = findElementWithIdoriginalCanvas(idCaspar);
                        if ((bb.fontSize)*2 >bb.height) {
                            const originalWidth = bb.width;
                            const originalscaleX = bb.scaleX;
                            element.set({ objectCaching: false, text: (dataCaspar[idCaspar]), visible: true, width: originalWidth });
                            changePropOfObject(idCaspar, 'scaleX', originalscaleX);
            
                            if (element.textLines.length > 1) {
                              do {
                                element.set({ width: element.width + 5 });
                              }
                              while (element.textLines.length > 1);
                              changePropOfObject(idCaspar, 'scaleX', originalWidth / element.width);
                            }
                          }
                          else {
                            element.set({ objectCaching: false, text: (dataCaspar[idCaspar]).replace(/CRLF/g, '\\n'), visible: true});
                                    changePropOfObject(idCaspar, 'scaleY', bb.scaleY);
                                    if (element.height>bb.height){
                                    changePropOfObject(idCaspar, 'scaleY', bb.height / element.height);
                                    }
                          }
                    }
                    canvas.requestRenderAll()
                 }
            }
        }, 10);
         }
 
         function update(str) {
             parseCaspar(str); 
             dataInsert(dataCaspar); 
         }
 
         function play(str) {
             parseCaspar(str); 
             dataInsert(dataCaspar); 
         }
         function stop() {
            window.sheet.sequence.play({ direction: 'reverse' }).then(()=>document.body.innerHTML = '');
         }
         function next() {
            window.sheet.sequence.play();
        }
        function hello() {
            console.log('invoked hello funtion')
        }
        function goto(framenumber) {
            window.sheet.sequence.position=framenumber/30;
        }
        function goToAndPlay(framenumber) {
            window.sheet.sequence.position=framenumber/30;
            window.sheet.sequence.play();
        }
        
         const findElementWithId = (group, id) => {
            const objects = group.getObjects();
            for (let i = 0; i < objects.length; i++) {
              const element = objects[i];
              if (element.type === 'group') {
                const result = findElementWithId(element, id);
                if (result) {
                  return result;
                }
              } else if (element.id === id) {
                return element;
              }
            }
            return null;
        };

        const findElementWithIdoriginalCanvas = (id) => {
                function findObjectInGroup(objects, id) {
                for (let obj of objects) {
                if (obj.id === id) return obj; 
                if (obj.type === 'Group' && obj.objects)
                 { 
                    const foundInGroup = findObjectInGroup(obj.objects, id);
                    if (foundInGroup) return foundInGroup;
                 }
            }
            return null;
            }
            return findObjectInGroup(content.objects, id);
        }
 
         function updatestring(str1, str2) {
            const aa = findElementWithId(canvas,str1);
            if (aa)
            {
                const element = aa;
                const bb = findElementWithIdoriginalCanvas(str1);
                if ((bb.fontSize)*2 > bb.height) {
                    const originalWidth = bb.width;
                    const originalscaleX = bb.scaleX;
                    element.set({ objectCaching: false, text: str2, visible: true, width: originalWidth });
                    changePropOfObject(str1, 'scaleX', originalscaleX);
    
                    if (element.textLines.length > 1) {
                      do {
                        element.set({ width: element.width + 5 });
                      }
                      while (element.textLines.length > 1);
                      changePropOfObject(str1, 'scaleX', originalWidth / element.width);
                    }
                  }
                  else {
                    element.set({ objectCaching: false, text: (str2).replace(/CRLF/g, '\\n'), visible: true, });
                    changePropOfObject(str1, 'scaleY', bb.scaleY);
                    if (element.height>bb.height){
                      changePropOfObject(str1, 'scaleY', bb.height / element.height);
                    }
                  }
            }
                canvas.requestRenderAll();
        }
        function updateimage(str1, str2) {
            const aa = findElementWithId(canvas,str1);
            if (aa){
                const element = aa;
                fabric.Image.fromURL(str2).then(img => {
                    img.set({ scaleX: element.width / img.width, scaleY: (element.height / img.height) })
                   element.setSrc(img.cloneAsImage().getSrc()).then( () => {
                        element.set({ visible: true });
                                setTimeout(() => {
                                   changePropOfObject(idCaspar, 'scaleX',getPropOfObject(idCaspar, 'scaleX')+0.00001)  ;
                                }, 10);
                        canvas.requestRenderAll();
                    })
                })
            }
        }
     <//script>
         </body>
         <script src='${jsfilename}.js'></script>
     </html>`

        const bb = aa.replaceAll('<//', '</')
        const file = new Blob([bb], { type: 'text/html' });
        const options = {
            fileExtension: '.html',
            suggestedName: generalFileName(),
            excludeAcceptAllOption: true,
            types: [{
                description: 'Html file',
                accept: { 'text/html': ['.html'] },
            }],
        };
        if (overRide) {
            saveFile(null, file, htmlfileHandle)
        }
        else {
            sethtmlfileHandle(await saveFile(options, file));
        }
    }

    const importHtml = async (canvasContent1, animationContetent1) => {
        localStorage.removeItem('theatre-0.4.persistent');
        if (canvasContent1) {
            deleteAllObjects();
            deleteProject(projectId);
            const randomNumber = Math.floor(Math.random() * (5000 - 50 + 1)) + 50;
            const pid = `project${randomNumber}`;
            if (animationContetent1 === undefined) {
                animationContetent1 = "{\"sheetsById\":{},\"definitionVersion\":\"0.4.0\",\"revisionHistory\":[\"gjjL6UEXDCUdpAe_\",\"nMdlSYh15PYUGb14\"]}";
            }
            project = getProject(pid, { state: JSON.parse(animationContetent1) });
            setProjectId(pid)

            sheet = project.sheet('Sheet 1');
            initialiseCore(canvasContent1, true);

            project.ready.then(() => {
                sheet.sequence.play({ range: [0, parseFloat(duration)] }).then(() => sheet.sequence.play({ iterationCount: enableLoopAnimation ? Infinity : 1, range: [parseFloat(loopAnimationStart), parseFloat(loopAnimationEnd)], direction: selectedOption }));
            });
        }
        else {
            const pickerOpts = {
                multiple: false,
                excludeAcceptAllOption: true,
                types: [
                    {
                        description: 'HTML files',
                        accept: {
                            'text/html': ['.html']
                        }
                    },
                ],
            };

            if (window.showOpenFilePicker) {
                const [aa] = await window.showOpenFilePicker(pickerOpts);
                if (aa) {
                    sethtmlfileHandle(aa);
                    deleteAllObjects();
                    deleteProject(projectId);

                    const file = await aa.getFile();
                    const content = await file.text();
                    processContent(content)
                }
            } else {
                var fInput = document.createElement("input"); //hidden input to open filedialog
                fInput.setAttribute("type", "file"); //opens files
                fInput.setAttribute("accept", ".html"); ////only useful for inspector debugging
                fInput.setAttribute("multiple", false); ////only useful for inspector debugging

                fInput.click();
                fInput.onchange = (e) => {
                    var fileReader;
                    var content;
                    const file = e.target.files[0]
                    if (file) {
                        fileReader = new FileReader();
                        fileReader.onloadend = () => {
                            content = fileReader.result;
                            processContent(content)
                        }
                        fileReader.readAsText(file);
                    }
                };
            }
        }
    }
    const processContent = (content) => {
        var canvasContent = content.split('const content =')[1].split(']};')[0] + ']}';
        var animationContetent = content.split('{state:')[1].split('});')[0];
        if ((content.split("<script src='").length > 1) && (content.split("<script src='")[1].split('.')).length > 1) {
            const jsfilename1 = content.split("<script src='")[1].split('.')[0];
            setJsfilename(jsfilename1);
        }
        try {
            const { duration, enableLoopAnimation, loopAnimationStart, loopAnimationEnd, selectedOption, jsfilename, FPS, currentscreenSize } = JSON.parse((content.split('const mainPageData=')[1]).split('</script>')[0]);
            setDuration(duration);
            setEnableLoopAnimation(enableLoopAnimation);
            setLoopAnimationStart(loopAnimationStart);
            setLoopAnimationEnd(loopAnimationEnd);
            setSelectedOption(selectedOption);
            setJsfilename(jsfilename);
            dispatch({ type: 'CHANGE_FPS', payload: FPS });
            dispatch({ type: 'CHANGE_CURRENTSCREENSIZE', payload: currentscreenSize })
        } catch (error) {

        }
        const randomNumber = Math.floor(Math.random() * (5000 - 50 + 1)) + 50;
        const pid = `project${randomNumber}`;
        project = getProject(pid, { state: JSON.parse(animationContetent) });
        setProjectId(pid)

        sheet = project.sheet('Sheet 1');
        project.ready.then(() => {
            // sheet.sequence.play({ iterationCount: Infinity, range: [0, 2] });
        });
        initialiseCore(canvasContent, true);
    }
    const findElementWithId = (group, id) => {
        const objects = group.getObjects();
        for (let i = 0; i < objects.length; i++) {
            const element = objects[i];
            if (element.type === 'group') {
                const result = findElementWithId(element, id);
                if (result) {
                    return result;
                }
            } else if (element.id === id) {
                return element;
            }
        }
        return null;
    };

    const addItem = async (name, id = idofElement) => {
        const idAlreadyExists = findElementWithId(canvas, id);
        if (idAlreadyExists) {
            alert("Id Already exists");
            return
        }
        await name(canvas);
        generateTheatreID(id)
    }

    const setOnValueChange = (element, i) => {

        onChange(sheet.sequence.pointer.position, (position) => {
            if (element.type === 'group') {
                element.getObjects().forEach((image, index) => {
                    image.set({ opacity: index === parseInt((position) * FPS) ? 1 : 0 });
                });
                canvas.requestRenderAll();
            }
        });

        arrObject[i].onValuesChange((val) => {
            var obj2 = {};

            if (element.fill && element.fill.type === 'linear') {
                obj2 = {
                    ...obj2,
                    fill: new fabric.Gradient({
                        type: element.fill.type,
                        gradientUnits: element.fill.gradientUnits,
                        coords: {
                            x1: val.coords.x1,
                            y1: val.coords.y1,
                            x2: val.coords.x2,
                            y2: val.coords.y2
                        },
                        colorStops: Array.from({
                            length: element.fill.colorStops.length
                        }).map((_, i) => {
                            return {
                                offset: val[i].offset,
                                color: rgbaObjectToHex(val[i].color),
                                opacity: val[i].opacity
                            };
                        }),
                        id: element.fill.id
                    })
                };
            }
            else {
                obj2 = { fill: val.fill }
            }

            element.set({
                left: val.left,
                top: val.top,
                opacity: val.opacity,
                scaleX: val.scaleX,
                scaleY: val.scaleY,
                angle: val.angle,
                rx: val.rx,
                ry: val.ry,
                strokeWidth: val.strokeWidth,
                fontSize: val.fontSize,
                strokeDashArray: [val.strkdsar, val.strkdsar],
                strokeDashOffset: val.strkDsOfst,
                shadow: val.shadow,
                ...obj2,
                stroke: val.stroke,
                skewX: val.skewX,
                skewY: val.skewY,
            });
            if (element.type === 'path') {
                const newPath = [...element.path];
                newPath.forEach((_, i) => {
                    const newi = i + 1;
                    const ss = [];
                    if (val['Point' + newi][0]) ss.push(val['Point' + newi][0]);
                    if (val['Point' + newi][newi * 10 + 'x'])
                        ss.push(val['Point' + newi][newi * 10 + 'x']);
                    if (val['Point' + newi][newi * 10 + 'y'])
                        ss.push(val['Point' + newi][newi * 10 + 'y']);
                    if (val['Point' + newi][newi * 10 + 1 + 'x'])
                        ss.push(val['Point' + newi][newi * 10 + 1 + 'x']);
                    if (val['Point' + newi][newi * 10 + 1 + 'y'])
                        ss.push(val['Point' + newi][newi * 10 + 1 + 'y']);
                    if (val['Point' + newi][newi * 10 + 2 + 'x'])
                        ss.push(val['Point' + newi][newi * 10 + 2 + 'x']);
                    if (val['Point' + newi][newi * 10 + 2 + 'y'])
                        ss.push(val['Point' + newi][newi * 10 + 2 + 'y']);
                    newPath[i] = ss;
                });
                element.set({ path: newPath, objectCaching: false, })
            }
            element.setCoords();
            canvas.requestRenderAll();
        });
        const onMouseMove = (obj, event) => {
            if (mouseDown === 1) {
                studio.transaction(({ set }) => {
                    set(obj.props.left, event.target.left);
                    set(obj.props.top, event.target.top);
                    set(obj.props.angle, event.target.angle);
                });
            }
        };
        const onScaling = (obj, event) => {
            studio.transaction(({ set }) => {
                set(obj.props.scaleX, event.transform.target.scaleX);
                set(obj.props.scaleY, event.transform.target.scaleY);
            });
        };

        element.on('mousedown', () => studio.setSelection([arrObject[i]]), false);
        element.on('mousemove', (e) => onMouseMove(arrObject[i], e), false);
        element.on('scaling', (e) => onScaling(arrObject[i], e), false);

        studio.setSelection([arrObject[i]])
    }

    const generateTheatreID = (id = idofElement) => {

        const element = canvas.getActiveObjects()[0];
        element.set({ id: id.toString(), text: id.toString() });

        if (element.type === 'path') {
            element.on('mousedblclick', () => edit(dispatch), false)
        }

        setIdofElement(generateUniqueId({ type: 'id' }));

        if ((element.fill === null)) {
            element.set({ fill: '#555252' })
        }

        if (element.stroke === null) {
            element.set({ stroke: '#000000' })
        }

        var obj1 = {};
        var isColorObjectfill;
        var isColorObjectStroke;

        if (4 !== 5) {
            isColorObjectfill = (element.fill.type !== 'linear');
            isColorObjectStroke = (element.stroke.type !== 'linear');

            if (element.fill.type === 'pattern') {
                // do nothing
            }

            else if (isColorObjectfill) {
                obj1 = {
                    ...obj1,
                    fill: (typeof element.fill === 'object' && element.fill !== null && 'r' in element.fill && 'g' in element.fill && 'b' in element.fill && 'a' in element.fill) ? types.rgba(element.fill) : types.rgba(rgbaArrayToObject(element.fill)),
                };
            }
            else {
                const colorStops = element.fill.colorStops.map((colorStop) => {
                    return {
                        offset: types.number(parseFloat(colorStop.offset), { range: [0, 1] }),
                        color: ((colorStop.color).toString().startsWith("rgb")) ? types.rgba(rgbaArrayToObject(colorStop.color)) : types.rgba(hexToRGB(colorStop.color)),
                        opacity: types.number(colorStop.opacity ? parseFloat(colorStop.opacity) : 1, { range: [0, 1] })
                    };
                });
                obj1 = {
                    ...obj1,
                    ...colorStops,
                    coords: {
                        x1: types.number(element.fill.coords.x1, { range: [0, 1] }),
                        y1: types.number(element.fill.coords.y1, { range: [0, 1] }),
                        x2: types.number(element.fill.coords.x2, { range: [0, 1] }),
                        y2: types.number(element.fill.coords.y2, { range: [0, 1] })
                    }
                };
            }

            if (isColorObjectStroke) {
                obj1 = {
                    ...obj1,
                    stroke: (typeof element.stroke === 'object' && element.stroke !== null && 'r' in element.stroke && 'g' in element.stroke && 'b' in element.stroke && 'a' in element.stroke) ? types.rgba(element.stroke) : types.rgba(rgbaArrayToObject(element.stroke)),
                };
            }
            obj1 = {
                ...obj1,
                shadow: { ...element.shadow, color: (typeof element.shadow.color === 'object' && element.shadow.color !== null && 'r' in element.shadow.color && 'g' in element.shadow.color && 'b' in element.shadow.color && 'a' in element.shadow.color) ? types.rgba(element.shadow.color) : types.rgba(rgbaArrayToObject(element.shadow.color)) },
            };

        }
        else {
            if (!element.shadow?.color.toString().startsWith("#")) {
                element.set({ shadow: { ...element.shadow, color: '#000000' } })
            }
            isColorObjectfill = (typeof (element.fill) !== 'object');
            isColorObjectStroke = (typeof (element.stroke) !== 'object');
            if (isColorObjectfill) {
                obj1 = {
                    ...obj1,
                    fill: types.rgba(hexToRGB(element.fill ? element.fill : '#ff0000')),
                };
            }
            else if (element.fill.type === 'pattern') {
            }
            else {
                const colorStops = element.fill.colorStops.map((colorStop) => {
                    return {
                        offset: types.number(parseFloat(colorStop.offset), { range: [0, 1] }),
                        color: ((colorStop.color).toString().startsWith("rgb")) ? types.rgba(rgbaArrayToObject(colorStop.color)) : types.rgba(hexToRGB(colorStop.color)),
                        opacity: types.number(parseFloat((colorStop.opacity === undefined) ? 1 : colorStop.opacity), { range: [0, 1] })
                    };
                });
                obj1 = {
                    ...obj1,
                    ...colorStops,
                    coords: {
                        x1: types.number(element.fill.coords.x1, { range: [0, 1] }),
                        y1: types.number(element.fill.coords.y1, { range: [0, 1] }),
                        x2: types.number(element.fill.coords.x2, { range: [0, 1] }),
                        y2: types.number(element.fill.coords.y2, { range: [0, 1] })
                    }
                };
            }

            if (isColorObjectStroke) {
                obj1 = {
                    ...obj1,
                    stroke: types.rgba(hexToRGB(element.stroke ? element.stroke : '#000000')),
                };
            }
            obj1 = {
                ...obj1,
                shadow: { ...shadowOptions, color: types.rgba(hexToRGB(element.shadow.color)), blur: types.number(parseInt(element.shadow.blur), { range: [0, 100] }) },
            };

        }

        if (element.type === 'path') {
            const pathProps = getModifiedObject(element)
            obj1 = { ...obj1, ...pathProps }
        }

        const i = arrObject.length;
        arrObjectProps[i] = {
            left: element.left,
            top: element.top,
            scaleX: types.number(element.scaleX, { nudgeMultiplier: 0.01 }),
            scaleY: types.number(element.scaleY, { nudgeMultiplier: 0.01 }),
            opacity: types.number(element.opacity, { range: [0, 1] }),
            angle: element.angle,
            rx: types.number(element.rx ? parseInt(element.rx) : 10, { range: [-360, 360] }),
            ry: types.number(element.ry ? parseInt(element.rx) : 10, { range: [-360, 360] }),
            fontSize: types.number(element.fontSize ? parseInt(element.fontSize) : 30, { range: [0, 100] }),
            strkdsar: types.number(element.strokeDashArray ? parseInt(element.strokeDashArray) : 0, { range: [0, 1000] }),
            strkDsOfst: types.number(element.strokeDashOffset ? parseInt(element.strokeDashOffset) : 0, { range: [-1000, 1000] }),
            ...obj1,
            strokeWidth: types.number(element.strokeWidth, { range: [0, 100] }),
            skewX: types.number(element.skewX, { range: [-88, 88] }),
            skewY: types.number(element.skewY, { range: [-60, 60] }),
        };
        arrObject[i] = sheet.object(element.id, arrObjectProps[i]);
        setOnValueChange(element, i)
    }
    const generateTheatreIDforCopiedElement = (id, multiSelectedIndex = 0) => {
        const element = canvas.getActiveObjects()[0];
        element.set({ id: id.toString(), text: id.toString(), });
        canvas.requestRenderAll();
        if (element.type === 'path') {
            element.on('mousedblclick', () => edit(dispatch), false)
        }
        setIdofElement(generateUniqueId({ type: "id" }));
        const i = arrObject.length;
        var indexOfSelectedElement;
        var elementBeingCopied;
        if (_clipboard.objects) {
            elementBeingCopied = _clipboard.objects[multiSelectedIndex];
        }
        else {
            elementBeingCopied = _clipboard;
        }

        indexOfSelectedElement = (canvas.getObjects()).findIndex(obj => obj.id === elementBeingCopied.id);
        arrObjectProps[i] = arrObjectProps[indexOfSelectedElement];
        var objectBeingCopied = val(arrObject[indexOfSelectedElement].props);

        console.log(objectBeingCopied);
        arrObject[i] = sheet.object(element.id, {
            ...arrObjectProps[i],
            left: Math.min(objectBeingCopied.left + 100, 1700),
            top: Math.max(objectBeingCopied.top - 100, 50),
            opacity: types.number(objectBeingCopied.opacity, { range: [0, 1] }),
            scaleX: types.number(objectBeingCopied.scaleX, { nudgeMultiplier: 0.01 }),
            scaleY: types.number(objectBeingCopied.scaleY, { nudgeMultiplier: 0.01 }),
            angle: objectBeingCopied.angle,
            rx: types.number(objectBeingCopied.rx, { range: [-360, 360] }),
            ry: types.number(objectBeingCopied.ry, { range: [-360, 360] }),
            fontSize: types.number(objectBeingCopied.fontSize, { range: [0, 100] }),
            strkDsOfst: types.number(parseInt(objectBeingCopied.strkDsOfst), { range: [-1000, 1000] }),

            stroke: types.rgba({ r: objectBeingCopied.stroke.r, g: objectBeingCopied.stroke.g, b: objectBeingCopied.stroke.b, a: objectBeingCopied.stroke.a }),
            strokeWidth: types.number(objectBeingCopied.strokeWidth, { range: [0, 100] }),
            skewX: types.number(parseInt(objectBeingCopied.skewX), { range: [-88, 88] }),
            skewY: types.number(parseInt(objectBeingCopied.skewY), { range: [-88, 88] }),
            shadow: { ...shadowOptions, color: types.rgba({ r: objectBeingCopied.shadow.color.r, g: objectBeingCopied.shadow.color.g, b: objectBeingCopied.shadow.color.b, a: objectBeingCopied.shadow.color.a }), blur: types.number(parseInt(objectBeingCopied.shadow.blur), { range: [0, 100] }), offsetX: types.number(parseInt(objectBeingCopied.shadow.offsetX)), offsetY: types.number(parseInt(objectBeingCopied.shadow.offsetY)), affectStroke: objectBeingCopied.shadow.affectStroke },

        });
        setOnValueChange(element, i)
    }

    const saveToLocalStorage = canvas => {
        var aa1 = JSON.stringify(canvas.toJSON(['id', 'class', 'selectable']));
        localStorage.setItem("TheatrepageData", aa1);
    }

    const handleClick = e => {
        e.preventDefault();
        setVisibility(true);
        setX(e.clientX);
        setY(e.clientY);
    };
    const record = () => {
        // canvas.setBackgroundColor('#00ff00');
        canvas.discardActiveObject();
        canvas.requestRenderAll()
        var config = {
            type: 'video',
            mimeType: 'video/webm;codecs=vp9',
            canvas: {
                alpha: true
            }
        };

        var recorder = new RecordRTC(canvas.getElement().captureStream(), config);
        sheet.sequence.position = 0;
        sheet.sequence.play({ iterationCount: (parseInt(loopcount) === 0) ? Infinity : parseInt(loopcount), range: [0, parseFloat(duration)] })

        const dd = setInterval(() => {
            canvas.requestRenderAll()
        }, 100);
        recorder.setRecordingDuration(parseFloat(duration) * 1000, () => {
            clearInterval(dd);
            // canvas.setBackgroundColor('#00ff0000');
            canvas.requestRenderAll()
            const blob = recorder.getBlob();
            handleProcess(blob)
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "canvas-recording_for_browser.webm";
            a.click();
            // setRecording(false);
        })
        recorder.startRecording();
        setRecording(true);
    }
    const getTranscodedVideoSize = () => {
        if (currentscreenSize === 1024) {
            return '1024x576';
        } else if (currentscreenSize === 1280) {
            return '1280x720';
        }
        else if (currentscreenSize === 1920) {
            return '1920x1080';
        } else if (currentscreenSize === 2048) {
            return '2048x1080';
        } else if (currentscreenSize === 3840) {
            return '3840x2160';
        } else if (currentscreenSize === 4096) {
            return '4096x2160';
        }
        else {
            // Handle other cases here
            return '1920x1080';
        }
    };

    const handleProcess = async (blob1) => {
        setTranscoding(true);
        const ffmpeg = createFFmpeg({
            // log: true,
            log: false,
        });
        await ffmpeg.load();
        await ffmpeg.FS('writeFile', 'input.webm', await fetchFile(blob1));
        // await ffmpeg.run('-i', 'input.webm', '-codec:v', 'libx264', '-r', fps.toString(), 'output.mp4');
        await ffmpeg.run('-codec:v', 'libvpx-vp9', '-i', 'input.webm', '-codec:v', 'qtrle', '-r', FPS.toString(), '-s', getTranscodedVideoSize(), 'output.mov');
        // await ffmpeg.run('-i', 'input.webm', '-codec:v', 'prores_ks', '-pix_fmt', 'yuva444p10le', '-r', '25', 'output.mov');
        const processedData = ffmpeg.FS('readFile', 'output.mov');
        const processedBlob1 = new Blob([processedData.buffer], { type: 'video/mov' });
        const url = URL.createObjectURL(processedBlob1);
        const a = document.createElement("a");
        a.href = url;
        a.download = "canvas-recording_qtrle.mov";
        a.click();
        setRecording(false);
    };

    const deleteProject = (projectid) => {
        const studioPrivate = window.__TheatreJS_StudioBundle._studio
        const coreAtom = d.getPointerParts(studioPrivate._coreBits.projectsP).root
        delete coreAtom._currentState.projects[projectid];
    }

    const [loopAnimationStart, setLoopAnimationStart] = useState(0);
    const [loopAnimationEnd, setLoopAnimationEnd] = useState(1.5);
    const [enableLoopAnimation, setEnableLoopAnimation] = useState(true);
    const [selectedOption, setSelectedOption] = useState('alternate');

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    return (<>
        <div style={{}} onContextMenu={handleClick} onClick={() => setVisibility(false)}>
            <div style={{ position: 'absolute', left: 0, top: 0, zIndex: 49, backgroundColor: 'white', height: 25, width: 1920 }}></div>
            <div style={{ position: 'absolute', left: 0, top: 0, zIndex: 50, textAlign: 'center' }}>
                <button title='Data from Local Storage' onClick={() => {
                    deleteAllObjects();
                    initialiseCore(localStorage.getItem('RCCpageData'));
                }}>DataFrom Lo.Strg</button>

                <button title='Save to Local Storage' onClick={() => saveToLocalStorage(canvas)}>SaveTo Lo.Strg</button>
                <b>Ch:</b>
                <select onChange={e => changeChannelNumber(e)} value={chNumber}>
                    {chNumbers.map((val) => { return <option key={uuidv4()} value={val}>{val}</option> })}
                </select>

                <span>Id:</span>
                <input style={{ width: 75 }} value={idofElement} onChange={e => setIdofElement((e.target.value).replace(/\s*\/\s*/g, ' / '))} />
                <button onClick={() => reset()}>Reset</button>


                <span>Caspar:</span>

                <button onClick={() => {
                    sheet.sequence.position = 0;
                    setTimeout(() => {
                        playtoCasparcg(templateLayers.theatrejs, loopcount, duration, enableLoopAnimation, loopAnimationStart, loopAnimationEnd, selectedOption);
                    }, 100);
                }}><FaPlay /></button>
                <button onClick={() => pause(templateLayers.theatrejs)}><FaPause /></button>
                <button title='Resume' onClick={() => resume(templateLayers.theatrejs)}><FaPause /><FaPlay /></button>
                <button title='Update Text' onClick={() => {
                    updateText(canvas, templateLayers.theatrejs)
                }}>Update</button>

                <button onClick={() => stopGraphics1(templateLayers.theatrejs)}><FaStop /></button>
                <span title='Duration in Second'>D:</span><input title='Duration in Second' type="number" value={duration} style={{ width: 40 }} onChange={e => setDuration(e.target.value)} />
                <input type='checkbox' checked={enableLoopAnimation} onChange={() => setEnableLoopAnimation(val => !val)} /><span>Loop Anim</span>
                <span >Start:</span><input title='Time in second' type="number" value={loopAnimationStart} style={{ width: 40 }} onChange={e => { if (e.target.value < loopAnimationEnd) setLoopAnimationStart(e.target.value) }} />
                <span >End:</span><input title='Time in second' type="number" value={loopAnimationEnd} style={{ width: 40 }} onChange={e => { if (e.target.value > loopAnimationStart) setLoopAnimationEnd(e.target.value) }} />

                {loopDirection.map((option, index) => (
                    <label key={index} title={option.direction}>
                        <input
                            type="radio"
                            value={option.direction}
                            checked={selectedOption === option.direction}
                            onChange={handleOptionChange}
                        />
                        {option.notation}
                    </label>
                ))}

                <span style={{ marginLeft: 5 }}>js:</span><input type='text' style={{ width: 60 }} value={jsfilename} onChange={e => setJsfilename(e.target.value)} />
                Html:
                <button onClick={() => {
                    sheet.sequence.position = 0;
                    setTimeout(() => {
                        exportHtml();
                    }, 1000);
                }}>Export</button>
                {htmlfileHandle && <button onClick={() => {
                    sheet.sequence.position = 0;
                    setTimeout(() => {
                        exportHtml(true);
                    }, 1000);
                }}>Overwrite</button>}
                {htmlfileHandle?.name}
                <button onClick={() => importHtml()}>Import</button>
                <span title='Html Client Id for html outPut'>Client Id</span><input title='For Html Rendrer. Put Unique Id so that other may not interfere' style={{ width: 50 }} type={'text'} value={clientId} onChange={e => {
                    dispatch({ type: 'CHANGE_CLIENTID', payload: e.target.value })
                }} />
                <button disabled={recording ? true : false} onClick={() => record()}>{recording ? transcoding ? 'Transcoding' : 'Recoreding' : 'Record'} </button>
                FPS:<input
                    min={10}
                    type="number"
                    step={1}
                    style={{ width: 40 }}
                    value={FPS}
                    onChange={e => {
                        const value = e.target.value;
                        if (value !== '' && !isNaN(value)) {
                            dispatch({ type: 'CHANGE_FPS', payload: parseFloat(value) });
                        }
                    }}
                    onBlur={e => {
                        if (e.target.value === '') {
                            dispatch({ type: 'CHANGE_FPS', payload: 10 });
                        }
                    }}
                />

                Size: <select value={currentscreenSize} onChange={e => {
                    localStorage.setItem('RCC_currentscreenSize', parseInt(e.target.value))
                    dispatch({ type: 'CHANGE_CURRENTSCREENSIZE', payload: parseInt(e.target.value) })
                }
                }>  {screenSizes.map((val) => { return <option key={uuidv4()} value={val}>{val}</option> })} </select>
                <button onClick={() => {
                    console.log(arrObject[0]);
                    console.log(canvas.getActiveObjects()[0]);

                }}>.</button>
            </div>
            <div style={{ position: 'absolute', left: 1540, top: 25, zIndex: 101, backgroundColor: 'white', display: !showSavePanel ? 'none' : '' }}>
                <SavePannelTheatre
                    importHtml={importHtml}
                    deleteAllObjects={deleteAllObjects}
                    stopGraphics1={stopGraphics1}
                    playtoCasparcg={playtoCasparcg}
                />
            </div>
            <span style={{ position: 'absolute', left: 960, top: 540, fontSize: 40 }}>.</span>
            <DrawingforTheatrejs importHtml={importHtml} playtoCasparcg={playtoCasparcg} generateTheatreID={generateTheatreID} fps={FPS} />
            <ContextMenu x={x} y={y} visibility={visibility} />
        </div>
    </>)
}

export default WebAnimator