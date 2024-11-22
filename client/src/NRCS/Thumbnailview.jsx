import React, { } from 'react'
import { useSelector } from 'react-redux'
import DrawingThumbnailNRCS from './DrawingThumbnailNRCS'
import { FaPlay, FaStop } from "react-icons/fa";
import { startGraphics, stopGraphics, templateLayers, rgbaObjectToHex, updateGraphics, endpoint } from '../common'

const Thumbnailview = ({ graphics, currentPage, setCurrentGraphics, getAllKeyValue, loading }) => {
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const currentscreenSize = useSelector(state => state.currentscreenSizeReducer.currentscreenSize);

    const recallPage = (
        json,
        canvas,
    ) => {
        return new Promise((resolve, reject) => {
            try {
                // Load the canvas from JSON
                canvas.loadFromJSON(json).then(() => {
                    const objects = canvas.getObjects();

                    // Process each object in the canvas
                    objects.forEach((element) => {
                        try {
                            //  disable object caching
                            element.set({
                                objectCaching: false,
                            });

                            // Convert fill, stroke, and shadow color from RGBA to hex if necessary
                            if (isRGBAObject(element.fill)) {
                                element.set({ fill: rgbaObjectToHex(element.fill) });
                            }
                            if (isRGBAObject(element.stroke)) {
                                element.set({ stroke: rgbaObjectToHex(element.stroke) });
                            }
                            if (element.shadow && isRGBAObject(element.shadow.color)) {
                                element.set({ shadow: { ...element.shadow, color: rgbaObjectToHex(element.shadow.color) } });
                            }

                            // Add a double-click event to trigger the edit function
                            element.on('mousedblclick', () => {
                                window.edit();
                            });
                        } catch (error) {
                            console.error('Error processing element:', error);
                        }
                    });

                    // Trigger a render after all changes
                    canvas.requestRenderAll();
                    getAllKeyValue();

                    // Resolve the promise after the canvas is rendered
                    resolve();
                }).catch((err) => {
                    console.error('Error loading canvas from JSON:', err);
                    reject(err);
                });
            } catch (error) {
                console.error('Error recalling page:', error);
                reject(error);
            }
        });
    };

    // Helper function to check if the color is an RGBA object
    const isRGBAObject = (color) => color && typeof color === 'object' && 'r' in color && 'g' in color && 'b' in color && 'a' in color;

    return (<div >
        <div>
            {graphics.length}  <b> Pages: </b>
        </div>
        <div style={{ height: 750, width: 380, overflow: 'scroll', border: '1px solid black' }}>
            {loading ? <img src="/ReactCasparClient/loader.gif" alt="Loading..." /> :
                <table border='1'>
                    <tbody>
                        {graphics.map((val, i) => {
                            return (<tr key={i}>
                                <><td>
                                    <div style={{ backgroundColor: currentPage === i ? 'green' : 'white', color: currentPage === i ? 'white' : 'black', display: 'flex', height: 200, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', placeItems: 'center' }}>
                                        <div style={{ border: '2px solid grey', minWidth: 20, textAlign: 'center' }}>
                                            {i + 1}
                                        </div>

                                        <div>
                                            <button title='Page Play' onClick={() => {
                                                setCurrentGraphics(i);
                                                recallPage((JSON.parse(val.Graphicstext1)).pageValue, canvas).then(() =>
                                                    startGraphics(canvas, templateLayers.NRCSThumnailplayer, currentscreenSize))
                                            }}>  <FaPlay style={{ pointerEvents: 'none' }} /></button>
                                        </div>
                                        <div>
                                            <button title='Update' onClick={() => {
                                                recallPage((JSON.parse(val.Graphicstext1)).pageValue, canvas).then(() => {
                                                    setCurrentGraphics(i);
                                                    updateGraphics(canvas, templateLayers.NRCSThumnailplayer)
                                                }
                                                )
                                            }}>U</button>
                                        </div>
                                        <div>
                                            <button title='Template Play' onClick={() => {
                                                endpoint(
                                                    `play ${window.chNumber}-${templateLayers.NRCSThumnailplayer} [HTML] "${val.ScriptID}_${i + 1}_${(val.GraphicsTemplate).replace(/[\\/:*?"<>|]/g, "_")}" mix 40`
                                                );
                                            }}>TP</button>
                                        </div>


                                        <div>
                                            <button onClick={() => stopGraphics(templateLayers.NRCSThumnailplayer)}>  <FaStop style={{ pointerEvents: 'none' }} /></button>
                                        </div>
                                    </div>
                                </td>
                                    <td>
                                        <div style={{ display: 'table-cell' }} className='thumbnail-preview-container' onClick={(e) => {

                                            setCurrentGraphics(i);
                                            recallPage((JSON.parse(val.Graphicstext1)).pageValue, window.editor.canvas, i, val.jsfilename, val.cssfilename, val.jsfilename2, val.cssfilename2)
                                        }}>
                                            {canvas && <DrawingThumbnailNRCS i={i} graphics={graphics} />}
                                        </div>
                                        <span style={{ minWidth: 305, backgroundColor: currentPage === i ? 'green' : 'white', color: currentPage === i ? 'white' : 'black' }}
                                            value={val.GraphicsTemplate}
                                        >{val.GraphicsTemplate}</span>
                                    </td></>
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
            }
        </div>
    </div>)
}

export default Thumbnailview
