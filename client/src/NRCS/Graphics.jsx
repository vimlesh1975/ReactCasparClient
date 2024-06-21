import React, { useEffect, useState, useRef } from 'react'
import { shadowOptions, getFormattedDatetimeNumber, address1 } from '../common'
import { useSelector, useDispatch } from "react-redux";
import GsapPlayer from '../GsapPlayer'
import Script from './Script'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { VscTrash, VscMove } from "react-icons/vsc";
import { fabric } from "fabric";
import VerticalScrollPlayer from '../VerticalScrollPlayer'

const Graphics = () => {
    const canvas = useSelector((state) => state.canvasReducer.canvas);
    const canvasList = useSelector(state => state.canvasListReducer.canvasList);
    const [pageName, setPageName] = useState([]);
    const dispatch = useDispatch();
    const refPageName = useRef();


    const [runOrderTitles, setRunOrderTitles] = useState([]);
    const [selectedRunOrderTitle, setSelectedRunOrderTitle] = useState('');
    const [slugs, setSlugs] = useState([]);
    const [ScriptID, setScriptID] = useState('');
    const [currentSlug, setCurrentSlug] = useState(-1);
    const [graphics, setGraphics] = useState([]);
    const [currentGraphics, setCurrentGraphics] = useState(-1);
    const [graphicsID, setGraphicsID] = useState('');
    const [currentSlugSlugName, setCurrentSlugSlugName] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(address1 + '/getNewsID');
                const data = await res.json();
                setRunOrderTitles(data);
            } catch (error) {
                console.error('Error fetching RunOrderTitles:', error);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(address1 + `/show_runorder?param1=${selectedRunOrderTitle}`);
                const data = await res.json();
                setSlugs(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }

        fetchData();
    }, [selectedRunOrderTitle]);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(address1 + `/getGraphics?ScriptID=${ScriptID}`);
                const data = await res.json();
                setGraphics(data);
            } catch (error) {
                console.error('Error fetching RunOrderTitles:', error);
            }
        }

        fetchData();
    }, [ScriptID]);

    const handleSelectionChange = (e) => {
        setSelectedRunOrderTitle(e.target.value);
        setCurrentSlug(-1);
        setScriptID('');
        setCurrentSlugSlugName('');
    };

    const updateGraphicsToDatabase = async () => {
        const newGraphics = graphics.map(val => (val.GraphicsID === graphicsID) ? { ...val, Graphicstext1: JSON.stringify({ pageValue: canvas.toJSON() }) } : val);
        setGraphics(newGraphics);
        try {
            await fetch(address1 + '/setGraphics', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: JSON.stringify({ pageValue: canvas.toJSON() }), graphicsID }),
            });

        } catch (error) {
            console.error('Error saving content:', error);
        }
    };

    const addNew = async () => {
        const newGraphics = [...graphics, { GraphicsID: getFormattedDatetimeNumber(), Graphicstext1: JSON.stringify({ pageValue: canvas.toJSON() }), GraphicsOrder: (graphics.length + 1), ScriptID, GraphicsTemplate: pageName }];
        setGraphics(newGraphics);

        try {
            await fetch(address1 + '/insertGraphics', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ GraphicsID: getFormattedDatetimeNumber(), Graphicstext1: JSON.stringify({ pageValue: canvas.toJSON() }), GraphicsOrder: (graphics.length + 1), ScriptID, GraphicsTemplate: pageName }),
            });

        } catch (error) {
            console.error('Error saving content:', error);
        }
    };

    const deleteGraphic = async (GraphicsID) => {
        const newGraphics = graphics.filter(val => val.GraphicsID !== GraphicsID);
        const reorderedItemsWithNewOrder = newGraphics.map((item, index) => ({
            ...item,
            GraphicsOrder: index + 1,
        }));

        setGraphics(reorderedItemsWithNewOrder);

        try {
            await fetch(`${address1}/deleteGraphics`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ GraphicsID }),
            });

            await updateGraphicsOrder(reorderedItemsWithNewOrder);
        } catch (error) {
            console.error('Error deleting graphic:', error);
        }
    };

    const updateGraphicsOrder = async (updatedItems) => {
        const requests = updatedItems.map(async (val) => {
            try {
                await fetch(`${address1}/updateGraphicsOrder`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ GraphicsID: val.GraphicsID, GraphicsOrder: val.GraphicsOrder }),
                });
            } catch (error) {
                console.error('Error saving content:', error);
            }
        });

        await Promise.all(requests);
    };

    const handleOnDragEnd = async (result) => {
        if (!result.destination) return;

        const updatedItems = Array.from(graphics);
        const [reorderedItem] = updatedItems.splice(result.source.index, 1);
        updatedItems.splice(result.destination.index, 0, reorderedItem);

        // Update the GraphicsOrder based on the new position
        const reorderedItemsWithNewOrder = updatedItems.map((item, index) => ({
            ...item,
            GraphicsOrder: index + 1,
        }));

        setGraphics(reorderedItemsWithNewOrder);

        // Call the update function
        await updateGraphicsOrder(reorderedItemsWithNewOrder);
    };

    const updateGraphicTemplate = async (GraphicsID, newTemplate) => {
        const updatedGraphics = graphics.map(graphic =>
            graphic.GraphicsID === GraphicsID ?
                { ...graphic, GraphicsTemplate: newTemplate } :
                graphic
        );
        setGraphics(updatedGraphics);
        try {
            await fetch(address1 + '/updateGraphicTemplate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ GraphicsID, GraphicsTemplate: newTemplate }),
            });
        } catch (error) {
            console.error('Error updating template:', error);
        }
    };

    const fetchAllContent = async () => {
        const data1 = [];
        const fetchPromises = slugs.map(async (slug, i) => {
            try {
                const res = await fetch(`${address1}/getContent?ScriptID=${slug.ScriptID}`);
                const data = await res.json();
                data1.push(`${i + 1} ${slug.SlugName}`);
                data1.push(`${data.Script}\n`);
            } catch (error) {
                console.error('Error fetching content:', error);
            }
        });

        // Await all fetch promises to complete
        await Promise.all(fetchPromises);

        return data1;
    };

    const addToCanvas = async () => {
        const allContent = await fetchAllContent();


        let currentTop = 500; // Initial top position
        for (let i = 0; i < allContent.length; i++) {
            const fillColor = i % 2 === 0 ? '#ffff00' : '#ffffff';
            const backgroundColor = i % 2 === 0 ? '#0000ff' : ''; // Alternate background color
            const textbox = new fabric.Textbox(allContent[i], {
                id: "ccg_" + fabric.Object.__uid,
                class: "class_" + fabric.Object.__uid,
                shadow: { ...shadowOptions, blur: 0 },
                left: 100,
                top: currentTop,
                width: 1700,
                fill: fillColor,
                backgroundColor,
                fontFamily: 'Arial',
                fontWeight: "bold",
                fontSize: 90,
                editable: true,
                objectCaching: false,
                textAlign: "left",
                stroke: '#000000',
                strokeWidth: 2,
            });

            // Add textbox to canvas
            canvas.add(textbox);

            // Render the canvas to ensure the textbox is drawn and dimensions are available
            canvas.requestRenderAll();

            // Calculate the next top position based on the height of the current textbox
            currentTop += textbox.getBoundingRect().height + 10; // 10 is the spacing between textboxes
        }
    };


    return (
        <div>
            <div style={{ display: 'flex' }}>
                <div style={{ minWidth: 320, maxWidth: 320 }}>
                    <div>
                        Run Orders:<select value={selectedRunOrderTitle} onChange={handleSelectionChange}>
                            <option value="" disabled>Select a Run Order</option>
                            {runOrderTitles && runOrderTitles.map((runOrderTitle, i) => (
                                <option key={i} value={runOrderTitle.title}>{runOrderTitle.title}</option>
                            ))}
                        </select>
                    </div>

                    <div style={{ maxHeight: 700, overflow: 'auto' }}>
                        {slugs && slugs?.map((val, i) => (
                            <div onClick={() => {
                                setScriptID(val.ScriptID);
                                setCurrentSlug(i);
                                setCurrentSlugSlugName(val.SlugName);
                            }} key={i} style={{ color: currentSlug === i ? 'white' : 'black', backgroundColor: currentSlug === i ? 'green' : '#E7DBD8', margin: 10 }}>
                                {i} <label style={{ cursor: 'pointer' }}>{val.SlugName}</label> <br />
                            </div>
                        ))}
                    </div>
                    <div style={{ border: '1px solid red' }}>
                        <button onClick={addToCanvas}>Add to canvas</button>
                        <div>
                            < VerticalScrollPlayer />
                        </div>

                    </div>
                </div>
                <div>
                    <div style={{ border: '1px solid red', height: 50, padding: 5 }}>
                        <GsapPlayer layer1={200} inline={false} />
                    </div>
                    <div style={{ display: 'flex' }}>
                        <div>
                            <DragDropContext onDragEnd={handleOnDragEnd}>
                                <Droppable droppableId="graphics">
                                    {(provided) => (
                                        <table {...provided.droppableProps} ref={provided.innerRef}>
                                            <tbody>
                                                {graphics.map((val, i) => (
                                                    <Draggable key={val.GraphicsID} draggableId={val.GraphicsID.toString()} index={i}>
                                                        {(provided, snapshot) => (
                                                            <tr
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}

                                                                onClick={() => {
                                                                    setGraphicsID(val.GraphicsID);
                                                                    setCurrentGraphics(i);
                                                                    const parsedJSON = JSON.parse(val.Graphicstext1);
                                                                    canvas.loadFromJSON(parsedJSON.pageValue);
                                                                }}
                                                                style={{
                                                                    backgroundColor: currentGraphics === i ? 'green' : '#E7DBD8',
                                                                    color: currentGraphics === i ? 'white' : 'black',
                                                                    margin: 10,
                                                                    ...provided.draggableProps.style,
                                                                }}
                                                            >
                                                                <td>{i}</td>
                                                                <td  {...provided.dragHandleProps}><VscMove /></td>
                                                                <td>
                                                                    <button style={{ cursor: 'pointer' }} onClick={() => deleteGraphic(val.GraphicsID)}><VscTrash /></button>
                                                                </td>
                                                                <td>
                                                                    <input
                                                                        type="text"
                                                                        value={val.GraphicsTemplate}
                                                                        onChange={(e) => updateGraphicTemplate(val.GraphicsID, e.target.value)}
                                                                    />
                                                                </td>

                                                            </tr>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </tbody>
                                        </table>
                                    )}
                                </Droppable>
                            </DragDropContext>

                        </div>

                        <div>
                            <button onClick={updateGraphicsToDatabase}>Update Graphics</button>
                            <div>
                                <button onClick={addNew}>addNew</button>
                                <span>Template:</span> <select ref={refPageName} onChange={e => {
                                    setPageName(canvasList[e.target.selectedIndex].pageName);
                                    dispatch({ type: 'CHANGE_CURRENT_PAGE', payload: e.target.selectedIndex });
                                    window.editor.canvas.loadFromJSON(canvasList[e.target.selectedIndex].pageValue, () => {
                                        const aa = window.editor.canvas.getObjects();
                                        aa.forEach(element => {
                                            try {
                                                element.set({ objectCaching: false })
                                            } catch (error) {
                                                alert(error);
                                                return;
                                            }
                                        });
                                        window.editor.canvas.requestRenderAll();
                                    });

                                }} value={pageName}>
                                    {canvasList.map((val, i) => { return <option key={i} value={val.pageName}>{val.pageName}</option> })}
                                </select>
                            </div>

                        </div>
                    </div>
                    <div>
                        <Script ScriptID={ScriptID} title={selectedRunOrderTitle + ' ' + currentSlugSlugName} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Graphics;
