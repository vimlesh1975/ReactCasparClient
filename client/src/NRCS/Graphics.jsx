import React, { useEffect, useState } from 'react'
import { address1 } from '../common'
import { useSelector } from "react-redux";

function getFormattedDatetimeNumber(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-based index, so add 1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}${month}${day}${hours}${minutes}${seconds}`;
}

// const datetimeNumber = getFormattedDatetimeNumber();
// console.log(datetimeNumber);

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
        const newGrapphics = graphics.map(val => (val.GraphicsID === graphicsID) ? { ...val, Graphicstext1: JSON.stringify({ pageValue: canvas.toJSON() }) } : val);
        setGraphics(newGrapphics);
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
    }
    const addNew = async () => {
        const newGrapphics = [...graphics, { GraphicsID: getFormattedDatetimeNumber(), Graphicstext1: JSON.stringify({ pageValue: canvas.toJSON() }), GraphicsOrder: graphics.length + 1, ScriptID, GraphicsTemplate: 'vimlesh' }]
        setGraphics(newGrapphics);

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
    }


    return (<div>
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
                <div style={{ maxHeight: 700, overflow: 'auto', }}>
                    {slugs && slugs?.map((val, i) => {
                        return (
                            <div onClick={() => {
                                setScriptID(val.ScriptID);
                                setCurrentSlug(i);
                            }} key={i} style={{ backgroundColor: currentSlug === i ? 'green' : '#E7DBD8', margin: 10 }}>
                                {i} <label style={{ cursor: 'pointer' }}>{val.SlugName} </label> <br />
                            </div>
                        )
                    })}
                </div>
            </div>
            <div>
                {graphics && graphics?.map((val, i) => {
                    return (
                        <div onClick={() => {
                            setGraphicsID(val.GraphicsID);
                            setCurrentGraphics(i);

                            const parsedJSON = JSON.parse(val.Graphicstext1);
                            canvas.loadFromJSON(parsedJSON.pageValue);

                        }} key={i} style={{ backgroundColor: currentGraphics === i ? 'green' : '#E7DBD8', margin: 10 }}>
                            {val.GraphicsOrder} <label style={{ cursor: 'pointer' }}>{val.GraphicsTemplate} </label> <br />
                        </div>
                    )
                })}
            </div>
            <div>
                <button onClick={updateGraphicsToDatabase}>Update</button>
                <button onClick={addNew}>addNew</button>
            </div>
        </div>
    </div>)
}

export default Graphics
