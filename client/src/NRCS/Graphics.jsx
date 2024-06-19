import React, { useEffect, useState } from 'react'
import { address1 } from '../common'
import { useSelector } from "react-redux";
import GsapPlayer from '../GsapPlayer'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

function getFormattedDatetimeNumber(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-based index, so add 1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}${month}${day}${hours}${minutes}${seconds}`;
}

const Graphics = () => {
    const canvas = useSelector((state) => state.canvasReducer.canvas);
    const [runOrderTitles, setRunOrderTitles] = useState([]);
    const [selectedRunOrderTitle, setSelectedRunOrderTitle] = useState('');
    const [slugs, setSlugs] = useState([]);
    const [ScriptID, setScriptID] = useState('');
    const [currentSlug, setCurrentSlug] = useState(-1);
    const [graphics, setGraphics] = useState([]);
    const [currentGraphics, setCurrentGraphics] = useState(-1);
    const [graphicsID, setGraphicsID] = useState('');

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
        const newGraphics = [...graphics, { GraphicsID: getFormattedDatetimeNumber(), Graphicstext1: JSON.stringify({ pageValue: canvas.toJSON() }), GraphicsOrder: graphics.length + 1, ScriptID, GraphicsTemplate: 'vimlesh' }];
        setGraphics(newGraphics);

        try {
            await fetch(address1 + '/insertGraphics', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ GraphicsID: getFormattedDatetimeNumber(), Graphicstext1: JSON.stringify({ pageValue: canvas.toJSON() }), GraphicsOrder: graphics.length + 1, ScriptID, GraphicsTemplate: 'vimlesh' + graphics.length + 1 }),
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

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <div style={{ minWidth: 300, maxWidth: 300 }}>
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
                            }} key={i} style={{ backgroundColor: currentSlug === i ? 'green' : '#E7DBD8', margin: 10 }}>
                                {i} <label style={{ cursor: 'pointer' }}>{val.SlugName}</label> <br />
                            </div>
                        ))}
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
                                                                {...provided.dragHandleProps}
                                                                onClick={() => {
                                                                    setGraphicsID(val.GraphicsID);
                                                                    setCurrentGraphics(i);
                                                                    const parsedJSON = JSON.parse(val.Graphicstext1);
                                                                    canvas.loadFromJSON(parsedJSON.pageValue);
                                                                }}
                                                                style={{
                                                                    backgroundColor: currentGraphics === i ? 'green' : '#E7DBD8',
                                                                    margin: 10,
                                                                    ...provided.draggableProps.style,
                                                                }}
                                                            >
                                                                <td>{i}</td>
                                                                <td style={{ cursor: 'pointer' }}>{val.GraphicsTemplate}</td>
                                                                <td>
                                                                    <button onClick={() => deleteGraphic(val.GraphicsID)}>Delete</button>
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
                            <button onClick={updateGraphicsToDatabase}>Update</button>
                            <button onClick={addNew}>addNew</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Graphics;
