import React, { useEffect, useState, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import studio from '@theatre/studio'
import { getProject, types, val, onChange } from '@theatre/core'
import { useSelector, useDispatch } from 'react-redux'
import { fabric } from "fabric";
import { FaPlay, FaPause, FaStop } from "react-icons/fa";
import { createRect, createTextBox, createCircle, addImage, createTriangle, alignLeft, alignRight, alignCenter, textUnderline, textLineThrough, textItalic, txtBold, textNormal } from '../DrawingController'
import { VscPrimitiveSquare, VscCircleFilled, VscTriangleUp } from "react-icons/vsc";

import { getModifiedObject, findElementWithId, endpoint, templateLayers, shadowOptions, executeScript, hexToRGB, rgbaObjectToHex, screenSizes, buildDate, chNumbers, generalFileName, saveFile } from '../common'

import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";

import SavePannelTheatre from './SavePannelTheatre';
import RecordRTC from 'recordrtc';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import { v4 as uuidv4 } from 'uuid';


import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Papa from "papaparse";
import ExtensionPannel from './ExtensionPannel';

import { Provider } from 'react-redux'

import store from '../store'
import { edit } from '../PathModifier'

export const deleteItem = (canvas) => {
    const aa = canvas.getActiveObjects();
    aa.forEach(element => {
        canvas.remove(element);
        sheet.detachObject(element.id);
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
    console.log(tracksModified)
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
// const findElementWithId = (group, id) => {
//     const objects = group.getObjects();
//     for (let i = 0; i < objects.length; i++) {
//         const element = objects[i];
//         if (element.type === 'group') {
//             const result = findElementWithId(element, id);
//             if (result) {
//                 return result;
//             }
//         } else if (element.id === id) {
//             return element;
//         }
//     }
//     return null;
// };
// eslint-disable-next-line
const findElementWithIdoriginalCanvas = (group, id) => {
    const objects = group;
    for (let i = 0; i < objects.length; i++) {
        const element = objects[i];
        if (element.type === 'group') {
            const result = findElementWithIdoriginalCanvas(element._objects, id);
            if (result) {
                return result;
            }
        } else if (element.id === id) {
            return element;
        }
    }
    return null;
};
const changePropOfObject = (id, str1, str2) => {
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

const DrawingforTheatrejs = () => {
    const { editor, onReady } = useFabricJSEditor();
    const dispatch = useDispatch();



    window.dispatch = dispatch;
    window.editor = editor;

    const extensionConfig = {
        id: "hello-world-extension",
        toolbars: {
            global(set, studio) {
                set([
                    {
                        type: "Icon",
                        title: "Extension",
                        svgSource: "👁",
                        onClick: () => {
                            studio.createPane("Basic");
                        }
                    }
                ])
            },

        },
        panes: [
            {
                class: 'Basic',
                mount({ node }) {
                    // console.log(node)
                    const root = createRoot(node)
                    root.render(
                        <Provider store={store}>
                            <ExtensionPannel sheet={sheet} studio={studio} arrObject={arrObject} />
                        </Provider>
                    )
                    return () => {
                        root.unmount();
                    }
                }
            }
        ],
    };

    studio.extend(extensionConfig, { __experimental_reconfigure: true });


    useEffect(() => {
        setTimeout(() => {
            window.editor.canvas.preserveObjectStacking = true;
            window.editor.canvas.on('selection:cleared', function (e) {
                if (e.deselected) {
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editor])

    return (<div id='aaa' >
        <FabricJSCanvas className={'DrawingforTheatrejs'} onReady={(aa) => {
            onReady(aa);
            aa.wrapperEl.setAttribute("tabindex", "1"); //for canvas to accept focus for keydown delete
        }} />
        {/* <ExtensionPannel sheet={sheet} studio={studio} arrObject={arrObject} /> */}
    </div>);
};

const arrObject = [];

const WebAnimator = () => {

    const video1El = useRef(null);
    const [recording, setRecording] = useState(false);
    const [transcoding, setTranscoding] = useState(false);
    const [fps, setFps] = useState(25);
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const currentscreenSize = useSelector(state => state.currentscreenSizeReducer.currentscreenSize);

    const [duration, setDuration] = useState(2);
    const [loopcount, setLoopcount] = useState(0);
    const [fabric1, setFabric1] = useState('');
    const [coreAndStudio1, setCoreAndStudio1] = useState('');
    const [projectId, setProjectId] = useState('Fabricjs Object Animation')
    const [htmlfileHandle, sethtmlfileHandle] = useState();
    const [idofElement, setIdofElement] = useState('ccg_1');

    const [visibility, setVisibility] = useState(false);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    const [jsfilename, setJsfilename] = useState('main');
    const [showSavePannel, setShowSavePannel] = useState(false);

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
        window.chNumber = chNumber;
        document.title = `RCC WebAnimator_${buildDate}_CH #${chNumber}`;
        return () => {
            // cleanup
        }
    }, [chNumber])

    useEffect(() => {
        if (canvas) {
            fabric.util.addListener(document.body, 'keydown', function (options) {
                if (options.key === 'Delete') {
                    if (document.activeElement === window.editor.canvas.wrapperEl) {
                        deleteItem(canvas);

                    }
                }
            })
        }
        return () => {
            fabric.util.removeListener(document.body, 'keydown', function (options) {
                if (options.key === 'Delete') {
                    if (document.activeElement === window.editor.canvas.wrapperEl) {
                        deleteItem(canvas);

                    }
                }
            })
        }
        // eslint-disable-next-line 
    }, [canvas])


    useEffect(() => {
        if (localStorage.getItem('RCC_currentscreenSize')) { dispatch({ type: 'CHANGE_CURRENTSCREENSIZE', payload: parseInt(localStorage.getItem('RCC_currentscreenSize')) }) }
        document.title = "RCC Web Animator"
        studio.ui.restore();
        return () => {
            // second  
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        studio.onSelectionChange((newSelection) => {
            if ((newSelection.length > 0) && canvas && (newSelection[0].type === 'Theatre_SheetObject_PublicAPI')) {
                const aa = canvas.getObjects().find((item) => {
                    return newSelection[0]?.address?.objectKey === item.id;
                })
                if (aa) {
                    canvas.setActiveObject(aa);
                    canvas.requestRenderAll()
                }
            }
        })
        return () => {
            // second
        }
    }, [canvas])


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
                canvas.sendToBack(element);
            });
            canvas.discardActiveObject();
            canvas.requestRenderAll();
        }

        const bringToFront = canvas => {
            canvas.getActiveObjects().forEach(element => {
                canvas.bringToFront(element);
            });
            canvas.discardActiveObject();
            canvas.requestRenderAll();
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

        const changeId = () => {
            var newid = window.prompt('Please enter New Id:');
            const oldId = studio.selection[0].address.objectKey
            if (newid !== null) {
                // console.log(oldId, newid)
                newid = newid.replace(/\s*\/\s*/g, ' / ')
                console.log(newid)
                const modifiedcanvasContent = (JSON.stringify(canvas.toJSON(['id', 'class', 'selectable']))).replaceAll(oldId, newid)
                const modifiedAnimationContent = (JSON.stringify(studio.createContentOfSaveFile(sheet.address.projectId))).replaceAll(oldId, newid)
                importHtml(modifiedcanvasContent, modifiedAnimationContent)
            } else {
                console.log('User cancelled the input.');
            }
        }
        const clearAllAnimation = () => {
            studio.transaction((api) => {
                api.__experimental_forgetSheet(project.sheet('Sheet 1'))
            })
        }
        const clearObjectsAllAnimation = () => {
            studio.transaction((api) => {
                api.__experimental_forgetObject(getObjectbyId(studio.selection[0].address.objectKey))
            })
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



        return (
            <div className='rightClickMenu'
                style={{ position: 'fixed', left: 1230, top: 15, color: 'white', display: visibility ? "block" : "none", textAlign: 'left' }}
            >

                <ul>
                    <li>Add<ul >
                        <li onClick={() => addItem(addImage)}>Image</li>
                        <li title='only for Video Recording' onClick={() => addItem(addWebCam)}>WebCam</li>
                        <li onClick={() => addItem(createRect)}>Rectangle <VscPrimitiveSquare /></li>
                        <li onClick={() => addItem(createTextBox)}>Text T</li>
                        <li onClick={() => addItem(createCircle)}>Circle <VscCircleFilled /></li>
                        <li onClick={() => addItem(createTriangle)}>Triangle <VscTriangleUp /></li>
                    </ul></li>
                    <li onClick={changeId}>Change Id</li>
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
                        setShowSavePannel(val => !val);
                    }}>{showSavePannel ? 'Hide Save Pannel' : 'Show Save Panel'}</li>
                    <li onClick={allOutofScreen}>All Out of Screen</li>
                    {/* <li onClick={allInScreen}>All on Screen</li> */}

                </ul>
            </div>
        );
    }



    // var initialTop = 100;

    const CsvData = () => {
        const data1 = `image,name,age,email
img/flag/Albania.png,Milind Soman,30,john@example.com
img/flag/Afghanistan.png,Ramaswami Aiyanger,25,jane@example.com
img/flag/Belgium.png,Vimlesh Kumar,48,Vimlersh1975@gmail.com
img/flag/Mauritania.png,Vilash Bhandare,56,vlbhandare@gmail.com
img/flag/Morocco.png,Viresh Kumar,50,Kviresh10@gmail.com`;
        const canvas = useSelector(state => state.canvasReducer.canvas);

        const [headers, setHeaders] = useState(Object.keys(Papa.parse(data1, { header: true }).data[0]))
        const [datas, setDatas] = useState(Papa.parse(data1, { header: true }).data)

        const handleChange = e => {
            if (e.target.files[0]) {
                console.log(e.target.files[0])
                Papa.parse(e.target.files[0], {
                    header: true,
                    complete: responses => {
                        console.log(responses);
                        console.log(Object.keys(responses.data[0]));
                        setDatas(responses.data);
                        setHeaders(Object.keys(responses.data[0]))
                    }
                });
            }

        }

        const updateData = (index) => {
            headers.forEach((header,) => {
                const myelement = canvas.getObjects().find(element => element.id === header)
                if (header.includes('image')) {
                    fabric.Image.fromURL('/ReactCasparClient/' + datas[index][header], img => {
                        img.set({ scaleX: myelement.width / img.width, scaleY: (myelement.height / img.height) })
                        img.cloneAsImage(img1 => {
                            myelement.setSrc(img1.getSrc(), () => {
                                myelement.set({ visible: true });
                                canvas.requestRenderAll();
                            })
                        })
                    })
                }
                else {
                    myelement.set({ text: datas[index][header] })
                }
            })
            canvas.requestRenderAll();
            window.sheet.sequence.position = 0;
            setTimeout(() => {
                playtoCasparcg(templateLayers.theatrejs, 1, 4);
            }, 100);
        }
        const changeImage = (i, j) => {
            // const updatedData = [...datas]
            // // console.log(updatedData[i][headers[j]])
            // // console.log(i, j)
            // updatedData[i][headers[j]] = "vimlesh"
            // setDatas(updatedData)
        }

        return (<div style={{ fontSize: 14 }}>
            <input type="file" onChange={handleChange} />
            <table border='1'>
                <tbody>
                    <tr>
                        {headers.map((row, i) => {
                            return (<th key={i}   >{row}</th>)
                        })}
                        <th>Play</th>
                    </tr>

                    {datas.map((row, i) => {
                        return (<tr key={i}  >{headers.map((header, ii) => {
                            return (<td key={ii}>
                                {(typeof row[header] === 'string' && row[header] !== undefined && row[header].includes('/')) ? <img onClick={() => changeImage(i, ii)} src={'/ReactCasparClient/' + row[header]} alt='dd' width={20} height={20} /> : row[header]}
                            </td>
                            )
                        })}<td><button onClick={() => updateData(i)}>Play</button></td></tr>)
                    })}
                </tbody>
            </table>

            <button onClick={() => {
                headers.forEach((header) => {
                    setTimeout(() => {
                        if (header.includes('image')) {
                            addItem(addImage, header);
                        }
                        else {
                            addItem(createTextBox, header);
                        }
                    }, 100);
                })

            }}>Create Temlplate</button>

            <button onClick={() => {
                headers.forEach((header) => {
                    const myelement = canvas.getObjects().find(element => element.id === header)
                    if (header.includes('image')) {
                        fabric.Image.fromURL('/ReactCasparClient/' + datas[0][header], img => {
                            img.set({ scaleX: myelement.width / img.width, scaleY: (myelement.height / img.height) })
                            img.cloneAsImage(img1 => {
                                myelement.setSrc(img1.getSrc(), () => {
                                    myelement.set({ visible: true });
                                    canvas.requestRenderAll();
                                })
                            })
                        })
                    }
                    else {
                        myelement.set({ text: datas[0][header] })
                    }
                })

                canvas.requestRenderAll();
                playtoCasparcg(templateLayers.theatrejs, 1, 4);

                // const newDatas = datas.map(item => {
                //     return {
                //         ...item,
                //         image: '/ReactCasparClient/' + item.image
                //     };
                // });

                const newDatas = datas.map(item => {
                    const newItem = {};
                    for (const [key, value] of Object.entries(item)) {
                        if (key.includes("image")) {
                            newItem[key] = '/ReactCasparClient/' + value;
                        } else {
                            newItem[key] = value;
                        }
                    }
                    return newItem;
                });

                const scriptforhtml =
                    "if(window.csvInterval){clearInterval(csvInterval)};" +
                    "const headers=" + JSON.stringify(headers).replaceAll('"', "'") + "; " +
                    "let i=1;" +
                    "window.csvInterval=setInterval(() => {" +
                    "sheet_" + templateLayers.theatrejs + ".sequence.position=0;" +
                    "sheet_" + templateLayers.theatrejs + ".sequence.play();" +
                    "headers.forEach(function(header) { " +
                    "const myelement = canvas_" + templateLayers.theatrejs + ".getObjects().find(element => element.id === header); " +
                    "if (header.includes('image')) {" +
                    "fabric.Image.fromURL(" + JSON.stringify(newDatas).replaceAll('"', "'") + "[i][header], img => {" +
                    "img.set({ scaleX: myelement.width / img.width, scaleY: (myelement.height / img.height) });" +
                    "img.cloneAsImage(img1 => {" +
                    "myelement.setSrc(img1.getSrc(), () => {" +
                    "myelement.set({ visible: true });" +
                    "canvas_" + templateLayers.theatrejs + ".requestRenderAll();" +
                    "})" +
                    "})" +
                    "})" +
                    "}" +
                    "else{" +
                    "myelement.set({text:" + JSON.stringify(newDatas).replaceAll('"', "'") + "[i][header]});" +
                    "}" +
                    "canvas_" + templateLayers.theatrejs + ".requestRenderAll();" +
                    "});" +
                    " if (i < " + (newDatas.length - 1) + ") { i += 1; } else { i = 0; }" +
                    " }, " + duration * 1000 + ");"


                executeScript(`${scriptforhtml}`);

                const scriptforCasparcg = "let csvInterval; " +
                    "if(csvInterval){clearInterval(csvInterval)};" +
                    "const headers=" + JSON.stringify(headers).replaceAll('"', "'") + "; " +
                    "let i=1;" +
                    "csvInterval=setInterval(() => {" +
                    "sheet.sequence.position=0;" +
                    "sheet.sequence.play();" +
                    "headers.forEach(function(header) { " +
                    "const myelement = canvas.getObjects().find(element => element.id === header); " +

                    "if (header.includes('image')) {" +
                    "fabric.Image.fromURL(" + JSON.stringify(newDatas).replaceAll('"', "'") + "[i][header], img => {" +
                    "img.set({ scaleX: myelement.width / img.width, scaleY: (myelement.height / img.height) });" +
                    "img.cloneAsImage(img1 => {" +
                    "myelement.setSrc(img1.getSrc(), () => {" +
                    "myelement.set({ visible: true });" +
                    "canvas.requestRenderAll();" +
                    "})" +
                    "})" +
                    "})" +
                    "}" +
                    "else{" +
                    "myelement.set({text:" + JSON.stringify(newDatas).replaceAll('"', "'") + "[i][header]});" +
                    "}" +

                    "canvas.requestRenderAll();" +
                    "});" +
                    " if (i < " + (newDatas.length - 1) + ") { i += 1; } else { i = 0; }" +
                    " }, " + duration * 1000 + ");"

                endpoint(`call ${window.chNumber}-${templateLayers.theatrejs} "${scriptforCasparcg}"`);


            }}>Play All</button>

        </div>)
    }



    const deleteAllObjects = () => {
        canvas.getObjects().forEach(element => {
            if (getObjectbyId(element.id) !== undefined) {
                sheet.detachObject(element.id);
            }
        })
    }

    const rgbaArrayToObject = (fill) => {
        console.log(fill)
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
        canvas.loadFromJSON(jsonContent, () => {
            canvas.getObjects().forEach((element, i) => {
                // console.log(element);

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

                arrObject[i] = sheet.object(element.id, {
                    left: element.left,
                    top: element.top,
                    scaleX: types.number(element.scaleX, { nudgeMultiplier: 0.01 }),
                    scaleY: types.number(element.scaleY, { nudgeMultiplier: 0.01 }),
                    opacity: types.number(element.opacity, { range: [0, 1] }),
                    angle: element.angle,
                    rx: types.number(element.rx ? parseInt(element.rx) : 10, { range: [-360, 360] }),
                    ry: types.number(element.ry ? parseInt(element.rx) : 10, { range: [-360, 360] }),
                    strokeWidth: types.number(element.strokeWidth, { range: [0, 100] }),
                    fontSize: types.number(element.fontSize ? parseInt(element.fontSize) : 30, { range: [0, 100] }),
                    strkdsar: types.number(element.strokeDashArray ? parseInt(element.strokeDashArray) : 0, { range: [0, 1000] }),
                    strkDsOfst: types.number(element.strokeDashOffset ? parseInt(element.strokeDashOffset) : 0, { range: [-1000, 1000] }),
                    ...obj1,

                    skewX: types.number(element.skewX, { range: [-88, 88] }),
                    skewY: types.number(element.skewY, { range: [-60, 60] }),
                });

                arrObject[i].onValuesChange((val) => {
                    var obj2 = {};
                    if (element.fill.type === 'pattern') {
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
        endpoint(`call ${window.chNumber}-${layerNumber} sheet.sequence.pause()`);
        executeScript(`sheet_${layerNumber}.sequence.pause()`);
    }
    const resume = layerNumber => {
        endpoint(`call ${window.chNumber}-${layerNumber} sheet.sequence.play({ iterationCount: ${(parseInt(loopcount) === 0) ? Infinity : parseInt(loopcount)}, range: [0, ${duration}] });
        `)
        executeScript(`sheet_${layerNumber}.sequence.play({ iterationCount: ${(parseInt(loopcount) === 0) ? Infinity : parseInt(loopcount)}, range: [0, ${duration}] })`);
    }
    const playtoCasparcg = (layerNumber, loopcount, duration) => {
        const content = JSON.stringify(canvas.toJSON(['id', 'class', 'selectable']));

        const contentforHtml = content.replaceAll('"', '\\"').replaceAll('\\n', '\\\\n');
        const contentforcasparcg = content.replaceAll('"', '\\"').replaceAll('\\n', ' \\\n');

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
        canvas_${layerNumber}.loadFromJSON(content,()=>{
            const { core } = __TheatreJS_StudioBundle._studio;
            const { _studio } = __TheatreJS_StudioBundle;
            window.studio=_studio;
           
            window.project = core.getProject('${'project' + fabric.Object.__uid++}', {state:${(state1.replaceAll('"', "'")).replaceAll("\\'", '\\"')}});
            window.sheet_${layerNumber} = project.sheet('Sheet 1');
            project.ready.then(() => {
                sheet_${layerNumber}.sequence.play({ iterationCount: ${(parseInt(loopcount) === 0) ? Infinity : parseInt(loopcount)}, range: [0, ${duration}] });
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
        endpoint(`play ${window.chNumber}-${layerNumber} [html] "http://localhost:10000/ReactCasparClient/Theatrejs2"`);
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
        canvas.loadFromJSON(content,()=>{
            const { core } = __TheatreJS_StudioBundle._studio;
            const { _studio } = __TheatreJS_StudioBundle;
            window.studio=_studio;

            window.project = core.getProject('${'project' + fabric.Object.__uid++}', {state:${(state1.replaceAll('"', "'")).replaceAll("\\'", '\\"')}});
            window.sheet = project.sheet('Sheet 1');
            project.ready.then(() => {
                sheet.sequence.play({ iterationCount: ${(parseInt(loopcount) === 0) ? Infinity : parseInt(loopcount)}, range: [0, ${duration}] });
            });
            canvas.getObjects().forEach((element,i) => {
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

    const stopGraphics1 = (layerNumber) => {
        endpoint(`stop ${window.chNumber}-${layerNumber}`);
        executeScript(`document.getElementById('divid_${layerNumber}')?.remove();`);
    }

    const exportHtml = async (overRide = false) => {
        const xx4 = `
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
        const setAllCcgInvisble=element=>{
            if(window.caspar || window.casparcg || window.tickAnimations)  {
              if (element.type==='group'){
                element.getObjects().forEach((element1) => {
                  setAllCcgInvisble(element1);
                })
              }
              else{
                if ((element.id).startsWith("ccg")){
                    element.set({visible: false});
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

        const xx5 = ` arrObject[i].onValuesChange((val) => {
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
                <script>${fabric1}<//script>
                <script>${coreAndStudio1}<//script>
        </head>

        <body style='overflow:hidden'>

    <div><canvas id='canvas' width='1920' height='1080'></canvas></div>
    <script>
    var originalCanvas=[];
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
        studio.initialize();
        studio.ui.hide();
        window.studio=studio;
        const project = core.getProject('${projectId}', {state:${JSON.stringify(studio.createContentOfSaveFile(projectId))}});
        sheet = project.sheet('Sheet 1')
        canvas.loadFromJSON(content, ()=> {
            canvas.forEachObject((obj)=>{
                originalCanvas.push(fabric.util.object.clone(obj,true));
            });
            ${xx4}
            ${xx5}
        })
        });
        project.ready.then(() => {
            sheet.sequence.play({ iterationCount: ${(parseInt(loopcount) === 0) ? Infinity : parseInt(loopcount)}, range: [0, ${duration}] });
        })
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
             for (var idCaspar in dataCaspar) {
                 const aa =findElementWithId(canvas,idCaspar);
                 if (aa){
                    const element = aa;
                    if (element.type === 'image') {
                       fabric.Image.fromURL( escapeHtml(dataCaspar[idCaspar]), img => {
                           img.set({ scaleX: element.width / img.width, scaleY: (element.height / img.height) })
                           img.cloneAsImage(img1 => {
                               element.setSrc(img1.getSrc(), () => {
                                   element.set({ visible: true });
                                    setTimeout(() => {
                                   changePropOfObject(idCaspar, 'scaleX',getPropOfObject(idCaspar, 'scaleX')+0.00001)  ;
                                  }, 10);
                                   canvas.requestRenderAll();
                               })
                           })
                       })
                   }
                    else {
                        const bb =  findElementWithIdoriginalCanvas(originalCanvas,idCaspar);
                       const originalWidth = bb.width;
                       const originalscaleX = bb.scaleX;
                       element.set({ objectCaching: false, text: (dataCaspar[idCaspar]), visible: true, width:originalWidth });
                       changePropOfObject(idCaspar, 'scaleX', originalscaleX);
   
                       if (element.textLines.length > 1) {
                       do {
                           element.set({ width: element.width + 5 });
                       }
                       while (element.textLines.length > 1);
                       changePropOfObject(idCaspar, 'scaleX', originalWidth / element.width);
                       }
                    }
                    canvas.requestRenderAll()
                 }
            }
         }
 
         function update(str) {
             parseCaspar(str); // Parse templateData into an XML object
             dataInsert(dataCaspar); // Insert data
         }
 
         function play(str) {
             parseCaspar(str); // Parse templateData into an XML object
             dataInsert(dataCaspar); // Insert data
         }
         function stop() {
             document.body.innerHTML = '';
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
        const findElementWithIdoriginalCanvas = (group, id) => {
            const objects = group;
            for (let i = 0; i < objects.length; i++) {
                const element = objects[i];
                if (element.type === 'group') {
                    const result = findElementWithIdoriginalCanvas(element._objects, id);
                    if (result) {
                        return result;
                    }
                } else if (element.id === id) {
                    return element;
                }
            }
            return null;
        };
 
         function updatestring(str1, str2) {
            const aa = findElementWithId(canvas,str1);
            if (aa){
                const element = aa;
                const bb =findElementWithIdoriginalCanvas(originalCanvas,str1);
                const originalWidth = bb.width;
                const originalscaleX = bb.scaleX;
                element.set({ objectCaching: false, text: str2, visible: true, width:originalWidth });
                changePropOfObject(str1, 'scaleX', originalscaleX);
                if (element.textLines.length > 1) {
                  do {
                    element.set({ width: element.width + 5 });
                  }
                  while (element.textLines.length > 1);
                  changePropOfObject(str1, 'scaleX', originalWidth / element.width);
                }
                canvas.requestRenderAll();
            }
        }
        function updateimage(str1, str2) {
            const aa = findElementWithId(canvas,str1);
            if (aa){
                const element = aa;
                fabric.Image.fromURL(str2, img => {
                    img.set({ scaleX: element.width / img.width, scaleY: (element.height / img.height) })
                    img.cloneAsImage(img1 => {
                        element.setSrc(img1.getSrc(), () => {
                            element.set({ visible: true });
                            setTimeout(() => {
                               changePropOfObject(str1, 'scaleX',getPropOfObject(str1, 'scaleX')+0.00001)  ;
                                }, 10);
                            canvas.requestRenderAll();
                        })
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
        // var aa1;
        if (overRide) {
            // aa1 = htmlfileHandle;
            // sethtmlfileHandle(aa1)
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

            const pid = `project${fabric.Object.__uid++}`;
            if (animationContetent1 === undefined) {
                animationContetent1 = "{\"sheetsById\":{},\"definitionVersion\":\"0.4.0\",\"revisionHistory\":[\"gjjL6UEXDCUdpAe_\",\"nMdlSYh15PYUGb14\"]}";
            }
            project = getProject(pid, { state: JSON.parse(animationContetent1) });
            setProjectId(pid)

            sheet = project.sheet('Sheet 1');
            initialiseCore(canvasContent1, true);

            project.ready.then(() => {
                // sheet.sequence.play({ iterationCount: Infinity, range: [0, 2] });
                sheet.sequence.play({ iterationCount: (parseInt(loopcount) === 0) ? Infinity : parseInt(loopcount), range: [0, parseFloat(duration)] })
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
        const pid = `project${fabric.Object.__uid++}`;
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
    const addWebCam = canvas => {
        var video1 = new fabric.Image(video1El.current, {
            // width: 1920,
            // height: 1080
        });
        canvas.add(video1).setActiveObject(video1);;

        fabric.util.requestAnimFrame(function render() {
            canvas.renderAll();
            fabric.util.requestAnimFrame(render);
        });

        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(function (stream) {
            video1El.current.srcObject = stream;
            // console.log(stream)
            video1El.current.play();
        });
    }
    const addItem = async (name, id = idofElement) => {
        const idAlreadyExists = findElementWithId(canvas, id);
        if (idAlreadyExists) {
            alert("Id Already exists");
            return
        }

        await name(canvas);

        const element = canvas.getActiveObjects()[0];
        element.set({ id: id.toString(), text: id.toString() });

        setIdofElement('id_' + fabric.Object.__uid++);

        const obj1 = {
            left: 500,
            top: 300,
            opacity: types.number(1, { range: [0, 1] }),
            scaleX: types.number(1, { nudgeMultiplier: 0.01 }),
            scaleY: types.number(1, { nudgeMultiplier: 0.01 }),
            angle: 0,
            rx: types.number(10, { range: [0, 100] }),
            ry: types.number(10, { range: [0, 100] }),
            strokeWidth: types.number(0, { range: [0, 100] }),
            fontSize: types.number(45, { range: [0, 100] }),
            strkdsar: types.number(0, { range: [0, 1000] }, { nudgeMultiplier: 0.1 }),
            strkDsOfst: types.number(0, { range: [-1000, 1000] }),
            fill: types.rgba(hexToRGB(element.type === 'rect' ? '#0000ff' : '#ffffff')),
            stroke: types.rgba(hexToRGB('#000000')),
            shadow: { ...shadowOptions, color: types.rgba(hexToRGB('#000000')), blur: types.number(parseInt(30), { range: [0, 100] }) },
            skewX: types.number(0, { range: [-88, 88] }),
            skewY: types.number(0, { range: [-60, 60] }),
        }



        const i = arrObject.length;
        arrObject[i] = sheet.object(element.id, obj1);
        arrObject[i].onValuesChange((val) => {
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
                fill: val.fill,
                stroke: val.stroke,
                skewX: val.skewX,
                skewY: val.skewY,
            });
            element.setCoords();
            canvas.requestRenderAll();
        })
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
    }


    const saveToLocalStorage = canvas => {
        var aa1 = JSON.stringify(canvas.toJSON(['id', 'class', 'selectable']));
        localStorage.setItem("TheatrepageData", aa1);
    }
    // eslint-disable-next-line 
    const goto = () => {
        sheet.sequence.position = 0.5
        studio.transaction(({ set }) => {
            set(arrObject[0].props.scaleX, 0.5)
        })
        sheet.sequence.play();
        console.log(arrObject[0].value.left)
        onChange(arrObject[0].props.left, (left) => {
            console.log(left)
        })
        console.log('current left is', val(arrObject[0].props.left))
        studio.setSelection([arrObject[1], arrObject[0]])
        canvas.forEachObject((element, i) => {
            studio.transaction(({ set }) => {
                set(arrObject[i].props.left, 50.5)
            })
        })

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
        await ffmpeg.run('-codec:v', 'libvpx-vp9', '-i', 'input.webm', '-codec:v', 'qtrle', '-r', fps.toString(), '-s', getTranscodedVideoSize(), 'output.mov');
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

    // const test = () => {
    //     studio.transaction((api) => {
    //         for (let i = 0; i <= 10; i++) {
    //             sheet.sequence.position = i;
    //             api.set(getObjectbyId('name').props.left, i * 100);
    //         }
    //     })
    // }

    return (<>
        <video
            ref={video1El}
            loop
            // muted
            width="1920"
            height="1080"
            style={{ display: 'none' }}        >

        </video>
        <div style={{ textAlign: 'center' }} onContextMenu={handleClick} onClick={() => setVisibility(false)}>
            <button title='ReactCasparClient Save to localstorage button' onClick={() => {
                deleteAllObjects();
                initialiseCore(localStorage.getItem('RCCpageData'));
            }}>Data from LocalStorage</button>
            {/* <button onClick={test}>test</button> */}
            <button onClick={() => saveToLocalStorage(canvas)}>Save To LocalStorage</button>
            <b>Channel:</b>
            <select onChange={e => changeChannelNumber(e)} value={chNumber}>
                {chNumbers.map((val) => { return <option key={uuidv4()} value={val}>{val}</option> })}
            </select>

            <span>Id:</span>
            <input style={{ width: 100 }} value={idofElement} onChange={e => setIdofElement((e.target.value).replace(/\s*\/\s*/g, ' / '))} />
            <button onClick={() => reset()}>Reset</button>


            <span>Caspar:</span>

            <button onClick={() => {
                sheet.sequence.position = 0;
                setTimeout(() => {
                    playtoCasparcg(templateLayers.theatrejs, loopcount, duration);
                }, 100);
            }}><FaPlay /></button>
            <button onClick={() => pause(templateLayers.theatrejs)}><FaPause /></button>
            <button title='Resume' onClick={() => resume(templateLayers.theatrejs)}><FaPause /><FaPlay /></button>

            <button onClick={() => stopGraphics1(templateLayers.theatrejs)}><FaStop /></button>
            <span>Duration:</span><input type="number" value={duration} style={{ width: 40 }} onChange={e => setDuration(e.target.value)} />
            <span title="Put 0 for Infinity">Loop:</span><input title="Put 0 for Infinity" type="number" value={loopcount} style={{ width: 30 }} onChange={e => setLoopcount(e.target.value)} />

            Js:<input type='text' style={{ width: 60 }} value={jsfilename} onChange={e => setJsfilename(e.target.value)} />
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
            Client Id<input title='For Html Rendrer. Put Unique Id so that other may not interfere' style={{ width: 100 }} type={'text'} value={clientId} onChange={e => {
                dispatch({ type: 'CHANGE_CLIENTID', payload: e.target.value })
            }} />
            <button onClick={() => {
                setShowSavePannel(val => !val);
            }}>{showSavePannel ? 'Hide Save Pannel' : 'Show Save Panel'}</button>
            <button disabled={recording ? true : false} onClick={() => record()}>{recording ? transcoding ? 'Transcoding' : 'Recoreding' : 'Record'} </button>
            FPS:<input type='text' style={{ width: 40 }} value={fps} onChange={e => setFps(e.target.value)} />

            Size: <select value={currentscreenSize} onChange={e => {
                localStorage.setItem('RCC_currentscreenSize', parseInt(e.target.value))
                dispatch({ type: 'CHANGE_CURRENTSCREENSIZE', payload: parseInt(e.target.value) })
            }
            }>  {screenSizes.map((val) => { return <option key={uuidv4()} value={val}>{val}</option> })} </select>
            <div style={{ position: 'absolute', left: 1540, top: 25, zIndex: 101, backgroundColor: 'white', display: !showSavePannel ? 'none' : '' }}>
                <Tabs forceRenderTabPanel={true} >
                    <TabList>
                        <Tab>Save Pannel</Tab>
                        <Tab>Data Pannel</Tab>
                    </TabList>
                    <TabPanel > <SavePannelTheatre
                        importHtml={importHtml}
                        deleteAllObjects={deleteAllObjects}
                        stopGraphics1={stopGraphics1}
                        playtoCasparcg={playtoCasparcg}
                    /></TabPanel>
                    <TabPanel ><CsvData /></TabPanel>
                </Tabs >
            </div>
            <span style={{ position: 'absolute', left: 960, top: 540, fontSize: 40 }}>.</span>
            <DrawingforTheatrejs />
            <ContextMenu x={x} y={y} visibility={visibility} />
        </div>
    </>)
}

export default WebAnimator