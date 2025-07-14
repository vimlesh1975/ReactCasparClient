import { useEffect, useState, useRef, useCallback } from "react";
import {
    getFormattedDatetimeNumber,
    addressmysql,
    templateLayers,
} from "./lib/common";
import Script from "./Script";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { VscTrash, VscMove } from "react-icons/vsc";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Oneliner from "./Oneliner";
// import DataUpdater from "./DataUpdater";

import debounce from "lodash.debounce";
import Timer from "./Timer";

import Spinner from "./spinner/Spinner";
import FlashMessage from "./FlashMessage";


const Nrcs2 = () => {

    const [yScroll, setYScroll] = useState(0.00);
    const [yScroll2, setYScroll2] = useState(0.00);
    const [yBreakingNewsLowerthird, setYBreakingNewsLowerthird] = useState(0.00);
    const [yNewsUpdateLowerthird, setYyNewsUpdateLowerthird] = useState(0.00);
    const [yTwoliner, setYTwoliner] = useState(0.00);
    const [yDateTimeSwitcher, setYDateTimeSwitcher] = useState(0.00);

    const [lines, setLines] = useState([]);
    const [lines2, setLines2] = useState([]);
    const [fileHandle, setFileHandle] = useState(null); // Store file handle
    const [fileHandle2, setFileHandle2] = useState(null); // Store file handle

    const newdatabase = true;

    const [pageName, setPageName] = useState("new Graphics");
    const refPageName = useRef();

    const [runOrderTitles, setRunOrderTitles] = useState([]);
    const [selectedRunOrderTitle, setSelectedRunOrderTitle] = useState("0600 Hrs");
    const [selectedRunOrderTitle2, setSelectedRunOrderTitle2] = useState("0700 Hrs");
    const [slugs, setSlugs] = useState([]);
    const [slugs2, setSlugs2] = useState([]);
    const [ScriptID, setScriptID] = useState("");
    const [ScriptID2, setScriptID2] = useState("");
    const [currentSlug, setCurrentSlug] = useState(-1);
    const [currentSlug2, setCurrentSlug2] = useState(-1);
    const [graphics, setGraphics] = useState([]);
    const [graphics2, setGraphics2] = useState([]);
    const [currentGraphics, setCurrentGraphics] = useState(0);
    const [currentGraphics2, setCurrentGraphics2] = useState(0);
    const [graphicsID, setGraphicsID] = useState("");
    const [currentSlugSlugName, setCurrentSlugSlugName] = useState("");

    const [stopOnNext, setStopOnNext] = useState(false);
    const [live, setLive] = useState(false);

    const [loading, setLoading] = useState(false);  // Initialize loading state to true
    const [loading2, setLoading2] = useState(false);  // Initialize loading state to true
    const [isLoading, setIsLoading] = useState(false);

    const [directoryHandle, setDirectoryHandle] = useState(null);
    const [flashMessage, setFlashMessage] = useState("");
    const [selectedDate, setSelectedDate] = useState(() => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    });

    const [selectedDate2, setSelectedDate2] = useState(() => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    });

    const [showdateandTime, setShowdateandTime] = useState(false);
    const [ltr, setLtr] = useState(true);
    const [databaseConnection, setDatabaseConnection] = useState('false');

    //r3

    const [isClient, setIsClient] = useState(false)
    const [data, setData] = useState([])
    const [selectedProject, setSelectedProject] = useState(null)
    const [selectedScene, setSelectedScene] = useState(null)
    const [exports, setExports] = useState([])
    const [exportValues, setExportValues] = useState({})
    const [savedExportValues, setSavedExportValues] = useState({})
    const [animations, setanimations] = useState([])

    const [command, setCommand] = useState(`engine createscene "ProjectName/SceneName"`)
    const [commandResponse, setCommandResponse] = useState(``)
    const [listloadedscenes, setListloadedscenes] = useState([])
    const [searchQuery, setSearchQuery] = useState('');

    const fullstructure = () => {
        setIsClient(true)
        fetch("/api/fullstructure")
            .then((res) => res.json())
            .then((data) => {
                setData(data.projectData)
                setSelectedProject(data.projectData[0]?.name || null)
            })
            .catch((err) => console.error("Failed to fetch structure", err)
            )
        getloadedscenes()
    }

    const getloadedscenes = () => {
        fetch("/api/sendCommand", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ command: `engine listloadedscenes` })
        })
            .then((res) => res.json())
            .then((data) => {
                const raw = data.responce?.response || ""
                const match = raw.match(/\[(.*?)\]/)
                const list = match?.[1]?.split(',').map(s => s.trim()) || []
                if (list.length > 0 && list[0] !== '') {
                    setListloadedscenes(list)
                }
            })
            .catch((err) => console.error("Failed to fetch scenes", err))
    }

    // r3


    const readFile = async (handle) => {
        if (!handle) return;

        try {
            const file = await handle.getFile(); // Get a fresh file object
            const reader = new FileReader();

            reader.onload = (e) => {
                const content = e.target.result;
                const linesArray = content.split(/\r?\n/).filter(line => line.trim() !== '');
                setLines(linesArray);
            };

            reader.readAsText(file);
        } catch (error) {
            console.error("Error reading file:", error);
        }
    };

    const readFile2 = async (handle2) => {
        if (!handle2) return;

        try {
            const file = await handle2.getFile(); // Get a fresh file object
            const reader = new FileReader();

            reader.onload = (e) => {
                const content = e.target.result;
                const linesArray = content.split(/\r?\n/).filter(line => line.trim() !== '');
                setLines2(linesArray);
            };

            reader.readAsText(file);
        } catch (error) {
            console.error("Error reading file:", error);
        }
    };


    useEffect(() => {
        if (!window.chNumber) return;
        endpoint(`call ${window.chNumber}-${templateLayers.nrcsscroll} startScroll(${JSON.stringify(lines)})`);
        executeScript(`document.getElementById('hindi').contentWindow.postMessage({ action: 'callFunction', data: ${JSON.stringify(lines)} }, '*')`);

    }, [lines])

    useEffect(() => {
        if (!window.chNumber) return;
        endpoint(`call ${window.chNumber}-${templateLayers.urduScroll} setData1(${JSON.stringify(lines2)})`);
        executeScript(`document.getElementById('urdu').contentWindow.postMessage({ action: 'callFunction', data: ${JSON.stringify(lines2)} }, '*')`);
    }, [lines2])


    // TOP OF YOUR COMPONENT
    useEffect(() => {
        if (graphics && graphics[currentGraphics]) {
            const val = graphics[currentGraphics];

            if (!val.gfxtemplatetext) return;

            try {
                const parsed = JSON.parse(val.gfxtemplatetext);
                const pageValue = parsed.pageValue || {};

                setSavedExportValues(pageValue);
                setExportValues(pageValue);

            } catch (e) {
                console.error("Invalid JSON:", e);
            }
        }
    }, [graphics, currentGraphics]);


    const handleFileSelection = async () => {
        try {
            const [handle] = await window.showOpenFilePicker({
                types: [{ description: "Text Files", accept: { "text/plain": [".txt"] } }],
                multiple: false,
            });

            setFileHandle(handle); // Store handle for later updates
            await readFile(handle); // Read file immediately
        } catch (error) {
            console.error("File selection cancelled or failed:", error);
        }
    };

    const handleFileSelection2 = async () => {
        try {
            const [handle2] = await window.showOpenFilePicker({
                types: [{ description: "Text Files", accept: { "text/plain": [".txt"] } }],
                multiple: false,
            });

            setFileHandle2(handle2); // Store handle for later updates
            await readFile2(handle2); // Read file immediately
        } catch (error) {
            console.error("File selection cancelled or failed:", error);
        }
    };

    const handleUpdate = async () => {
        if (fileHandle) {
            await readFile(fileHandle);
        } else {
            console.warn("No file selected.");
        }
    };

    const handleUpdate2 = async () => {
        if (fileHandle2) {
            await readFile2(fileHandle2);
        } else {
            console.warn("No file selected.");
        }
    };


    const handleDateChange = (event) => {
        const date = event.target.value;
        setSelectedDate(date)
    };

    const handleDateChange2 = (event) => {
        const date = event.target.value;
        setSelectedDate2(date)
    };

    const showMessage = (msg) => {
        setFlashMessage(msg);
        // Clear the message after 3 seconds (optional, but prevents stacking messages)
        setTimeout(() => setFlashMessage(""), 3000);
    };



    const getAllKeyValue = () => {

    }

    const timerFunction = async () => {
        if (!live) return;
        await fetchRO();
        try {
            const res = await fetch(
                addressmysql() + `/getGraphics?ScriptID=${ScriptID}`
            );
            const data = await res.json();
            setGraphics(data.items);
        } catch (error) {
            // console.error('Error fetching RunOrderTitles:', error);
        }
    }

    async function fetchNewsID() {
        try {
            const res = await fetch(addressmysql() + "/getNewsID");
            const data = await res.json();
            setRunOrderTitles(data.data);
        } catch (error) {
            // console.error('Error fetching RunOrderTitles:', error);
        }
    }

    useEffect(() => {
        fetchNewsID();
    }, []);

    const fetchRO = useCallback(async () => {
        if (selectedRunOrderTitle === "") {
            return;
        }
        try {
            const res = await fetch(
                addressmysql() + `/ShowRunOrder?NewsId=${selectedRunOrderTitle}&date=${selectedDate}`
            );
            const data = await res.json();
            setSlugs(data.data);
        } catch (error) {
            // console.error('Error fetching data:', error);
        }
    }, [selectedRunOrderTitle, setSlugs, selectedDate]);




    useEffect(() => {
        fetchRO();
    }, [selectedRunOrderTitle, fetchRO]);

    useEffect(() => {
        if (selectedRunOrderTitle2 === "") {
            return;
        }
        async function fetchData() {
            try {
                const res = await fetch(
                    addressmysql() + `/ShowRunOrder?NewsId=${selectedRunOrderTitle2}&date=${selectedDate2}`
                );
                const data = await res.json();
                setSlugs2(data);
            } catch (error) {
                // console.error('Error fetching users:', error);
            }
        }

        fetchData();
    }, [selectedRunOrderTitle2, selectedDate2]);

    useEffect(() => {
        if (!ScriptID) {
            setGraphics([]); // Clear graphics when ScriptID is falsy
            return;
        }

        const controller = new AbortController();
        const signal = controller.signal;

        async function fetchData() {
            try {
                setLoading(true);
                setGraphics([]); // Clear graphics before fetching new data

                const res = await fetch(addressmysql() + `/getGraphics?ScriptID=${ScriptID}`, { signal });

                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }

                const data = await res.json();
                setGraphics(data.items);
                console.log(data.items)

            } catch (error) {
                if (error.name !== "AbortError") {
                    console.error("Error fetching graphics:", error);
                    setGraphics([]); // Ensure graphics is empty on error
                }
            } finally {
                setLoading(false);
            }
        }

        fetchData();

        return () => controller.abort(); // Cleanup on component unmount or re-run
    }, [ScriptID]);

    useEffect(() => {
        if (!ScriptID2) {
            setGraphics([]); // Clear graphics when ScriptID is falsy
            return;
        }

        const controller = new AbortController();
        const signal = controller.signal;

        async function fetchData() {
            try {
                setLoading2(true);
                setGraphics2([]); // Clear graphics before fetching new data
                const res = await fetch(addressmysql() + `/getGraphics?ScriptID=${ScriptID2}`, { signal });
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                const data = await res.json();
                setGraphics2(data);
            } catch (error) {
                if (error.name !== "AbortError") {
                    console.error("Error fetching graphics:", error);
                    setGraphics2([]); // Ensure graphics is empty on error
                }
            } finally {
                setLoading2(false);
            }
        }

        fetchData();

        return () => controller.abort(); // Cleanup on component unmount or re-run
    }, [ScriptID2]);


    const handleSelectionChange = (e) => {
        setSelectedRunOrderTitle(e.target.value);
        setCurrentSlug(-1);
        setScriptID("");
        setCurrentSlugSlugName("");
    };
    const handleSelectionChange2 = (e) => {
        setSelectedRunOrderTitle2(e.target.value);
        setCurrentSlug2(-1);
        setScriptID2("");
    };
    const updateGraphicsToDatabase = async () => {
        if (graphicsID === '') {
            alert('no template is selected')
            return;
        }
        const newGraphics = graphics.map((val) =>
            val.GraphicsID === graphicsID
                ? {
                    ...val,
                    Graphicstext1: JSON.stringify({ pageValue: savedExportValues }),
                }
                : val
        );
        // setGraphics(newGraphics);
        try {
            await fetch(addressmysql() + "/setGraphics", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Graphicstext1: JSON.stringify({ pageValue: savedExportValues }),
                    graphicsID,
                }),
            });
        } catch (error) {
            // console.error('Error saving content:', error);
        }
    };
    const addNew = async () => {
        const GraphicsID = getFormattedDatetimeNumber(); // Generate GraphicsID once
        const aa = Math.floor(Math.random() * 1000); // Generate a random number for the scene
        const newGraphics = [
            ...graphics,
            {
                GraphicsID,
                Graphicstext1: JSON.stringify({ pageValue: exportValues }),
                GraphicsOrder: graphics.length + 1,
                ScriptID,
                GraphicsTemplate: pageName,
                gfxpart2: `${selectedProject}/${selectedScene}`,

            },
        ];
        setGraphics(newGraphics);

        await updateCGEntry();

        try {
            await fetch(addressmysql() + "/insertGraphics", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    GraphicsID,
                    Graphicstext1: JSON.stringify({ pageValue: exportValues }),
                    GraphicsOrder: graphics.length + 1,
                    ScriptID,
                    GraphicsTemplate: pageName,
                    gfxpart2: `${selectedProject}/${selectedScene}`,

                }),
            });
        } catch (error) {
            // console.error('Error saving content:', error);
        }
    };

    const updateCGEntry = async (deleteCG = false) => {
        console.log(slugs[currentSlug].MediaInsert);
        var cgValue = '';
        if (deleteCG) {
            if (slugs[currentSlug].MediaInsert === 'Visuals') {
                return;
            }
            else if (slugs[currentSlug].MediaInsert === '' || slugs[currentSlug].MediaInsert === null) {
                return;
            }
            else if (slugs[currentSlug].MediaInsert === 'Visuals/CG') {
                cgValue = 'Visuals';
            }

            else if (slugs[currentSlug].MediaInsert.includes("CG")) {
                cgValue = (graphics.length === 1) ? null : `${graphics.length - 1} CG`;
            }
            else {
                return;
            }
        }
        else {
            if (slugs[currentSlug].MediaInsert === 'Visuals') {
                cgValue = 'Visuals/CG';
            }
            else if (slugs[currentSlug].MediaInsert === '' || slugs[currentSlug].MediaInsert === null) {
                cgValue = '1 CG';
            }
            else if (slugs[currentSlug].MediaInsert === 'Visuals/CG') {
                return;
            }
            else if (slugs[currentSlug].MediaInsert.includes("CG")) {
                cgValue = `${graphics.length + 1} CG`;
            }
            else {
                return;
            }
        }
        const updatedSlugs = [...slugs];
        updatedSlugs[currentSlug].MediaInsert = cgValue;
        setSlugs(updatedSlugs);
        try {
            await fetch(addressmysql() + "/updateCGEntry", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    cgValue,
                    ScriptID,
                    NewsId: selectedRunOrderTitle,
                    selectedDate
                }),
            });
        } catch (error) {
            // console.error('Error saving content:', error);
        }
    }

    const deleteGraphic = async (GraphicsID) => {
        // if (graphics.length === 1) {
        await updateCGEntry(true);
        // }
        const newGraphics = graphics.filter((val) => val.GraphicsID !== GraphicsID);
        const reorderedItemsWithNewOrder = newGraphics.map((item, index) => ({
            ...item,
            GraphicsOrder: index + 1,
        }));

        setGraphics(reorderedItemsWithNewOrder);

        try {
            await fetch(`${addressmysql()}/deleteGraphics`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ GraphicsID }),
            });

            await updateGraphicsOrder(reorderedItemsWithNewOrder);
        } catch (error) {
            // console.error('Error deleting graphic:', error);
        }
    };

    const updateGraphicsOrder = async (updatedItems) => {
        const requests = updatedItems.map(async (val) => {
            try {
                await fetch(`${addressmysql()}/updateGraphicsOrder`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        GraphicsID: val.GraphicsID,
                        GraphicsOrder: val.GraphicsOrder,
                    }),
                });
            } catch (error) {
                // console.error('Error saving content:', error);
            }
        });

        await Promise.all(requests);
    };

    const handleOnDragEnd = async (result) => {
        if (!result.destination) return;
        const sourceDroppableId = result.source.droppableId;
        const destinationDroppableId = result.destination.droppableId;
        if (destinationDroppableId === 'graphics2') return;
        if ((destinationDroppableId === "graphics2") && (sourceDroppableId === "graphics2")) return;
        if ((destinationDroppableId === "graphics1") && (sourceDroppableId === "graphics2")) {
            await updateCGEntry();
        }
        if (sourceDroppableId === destinationDroppableId) {
            //update currentGraphics
            if (currentGraphics === result.source?.index) {
                setCurrentGraphics(result.destination?.index);
            }
            else if ((currentGraphics >= result.destination?.index) && (currentGraphics < result.source?.index)) {
                setCurrentGraphics(currentGraphics + 1);
            }
            else if ((currentGraphics <= result.destination?.index) && (currentGraphics > result.source?.index)) {
                setCurrentGraphics(currentGraphics - 1);
            }
            // Reordering within the same list
            const updatedItems = Array.from(
                sourceDroppableId === "graphics1" ? graphics : graphics2
            );
            const [reorderedItem] = updatedItems.splice(result.source.index, 1);
            updatedItems.splice(result.destination.index, 0, reorderedItem);

            const reorderedItemsWithNewOrder = updatedItems.map((item, index) => ({
                ...item,
                GraphicsOrder: index + 1,
            }));

            if (sourceDroppableId === "graphics1") {
                setGraphics(reorderedItemsWithNewOrder);
            } else {
                setGraphics2(reorderedItemsWithNewOrder);
            }

            await updateGraphicsOrder(reorderedItemsWithNewOrder);
        } else {
            //update currentGraphics
            if ((currentGraphics >= result.destination?.index)) {
                setCurrentGraphics(currentGraphics + 1);
            }

            // Copying between lists
            const sourceList = Array.from(
                sourceDroppableId === "graphics1" ? graphics : graphics2
            );
            const destinationList = Array.from(
                destinationDroppableId === "graphics1" ? graphics : graphics2
            );

            const [copiedItem] = sourceList.slice(
                result.source.index,
                result.source.index + 1
            );
            const newItem = {
                ...copiedItem,
                GraphicsID: getFormattedDatetimeNumber(), // Generate a new unique ID
                ScriptID: destinationDroppableId === "graphics1" ? ScriptID : ScriptID2, // Change ScriptID based on the destination list
            };

            destinationList.splice(result.destination.index, 0, newItem);
            const reorderedSourceList = sourceList.map((item, index) => ({
                ...item,
                GraphicsOrder: index + 1,
            }));

            const reorderedDestinationList = destinationList.map((item, index) => ({
                ...item,
                GraphicsOrder: index + 1,
            }));

            if (sourceDroppableId === "graphics1") {
                setGraphics(reorderedSourceList);
                setGraphics2(reorderedDestinationList);
            } else {
                setGraphics(reorderedDestinationList);
                setGraphics2(reorderedSourceList);
            }

            await updateGraphicsOrder(reorderedSourceList);
            await updateGraphicsOrder(reorderedDestinationList);

            // Optionally, save the copied item to the database
            try {
                await fetch(`${addressmysql()}/insertGraphics`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newItem),
                });
            } catch (error) {
                // console.error('Error saving copied item:', error);
            }
        }



    };

    const updateGraphicTemplate = async (GraphicsID, newTemplate) => {
        if (!GraphicsID) {
            console.error("GraphicsID is missing or invalid.");
            return;
        }

        const updatedGraphics = graphics.map((graphic) =>
            graphic.GraphicsID === GraphicsID
                ? { ...graphic, GraphicsTemplate: newTemplate }
                : graphic
        );
        setGraphics(updatedGraphics);

        try {
            const response = await fetch(addressmysql() + "/updateGraphicTemplate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ GraphicsID, GraphicsTemplate: newTemplate }),
            });

            if (!response.ok) {
                throw new Error("Failed to update graphic template on server.");
            }
        } catch (error) {
            console.error("Error updating template:", error);
        }
    };
    const handleTemplateChange = debounce((GraphicsID, newTemplate) => {
        console.log(GraphicsID);
        updateGraphicTemplate(GraphicsID, newTemplate);
    }, 100);

    const onTabChange = (index, prevIndex) => {
        switch (index) {
            case 0:
                setTimeout(() => {
                    window.dispatchEvent(new Event("resize"));
                }, 100);
                break;
            default:
            //nothing
        }
    };

    const senToSanvad = async () => {
        const res = await fetch("/api/tcp/allsamvad", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ selectedDate, selectedRunOrderTitle })
        });
    }

    const senToWtVision = async () => {
        const res = await fetch("/api/tcp/allWtVision", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ selectedDate, selectedRunOrderTitle })
        });
    }
    const allnull = async () => {
        const res = await fetch("/api/tcp/allitemcolornull", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ selectedDate, selectedRunOrderTitle })
        });
    }


    return (<div>
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <div>
                <div style={{ display: "flex" }}>
                    <div style={{ minWidth: 450, maxWidth: 450, marginTop: 45 }}>
                        <div>
                            {newdatabase &&
                                <div>
                                    <label htmlFor="date-selector">Select a date: </label>
                                    <input
                                        id="date-selector"
                                        type="date"
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                    />
                                    <button onClick={senToSanvad}>to Samvad</button>
                                    <button onClick={senToWtVision}>to Wt Vision</button>
                                    <button onClick={allnull}>null</button>
                                </div>
                            }
                        </div>
                        <div>
                            Run Orders:
                            <select
                                value={selectedRunOrderTitle}
                                onChange={handleSelectionChange}
                            >
                                <option value="" disabled>
                                    Select a Run Order
                                </option>
                                {runOrderTitles &&
                                    runOrderTitles?.map((runOrderTitle, i) => (
                                        <option key={i} value={runOrderTitle.title}>
                                            {runOrderTitle.title}
                                        </option>
                                    ))}
                            </select>
                            <button onClick={() => fetchNewsID()}>Refresh RO</button>
                            {slugs.length} slugs
                            <label>
                                <input
                                    type="checkbox"
                                    checked={live}
                                    onChange={() => setLive(val => !val)}
                                />
                                Live
                            </label>
                        </div>

                        <div style={{ height: 500, overflow: "auto", border: '1px solid red' }}>
                            {slugs &&
                                slugs?.map((val, i) => (<div
                                    title={val.ScriptID}
                                    onClick={() => {
                                        setScriptID(val.ScriptID);
                                        setCurrentSlug(i);
                                        setCurrentSlugSlugName(val.SlugName);
                                    }}
                                    key={i} style={{
                                        display: 'flex', color: currentSlug === i ? "white" : "black",
                                        backgroundColor: currentSlug === i ? "green" : "#E7DBD8",
                                        margin: 10,
                                    }}>
                                    <div
                                        style={{
                                            minWidth: 320,
                                            maxWidth: 320,
                                        }}
                                    >
                                        {i + 1}{" "}
                                        <label style={{ cursor: "pointer" }}>{val.SlugName}</label>{" "}
                                    </div>
                                    <div>{val.MediaInsert}</div>
                                </div>
                                ))}
                        </div>


                        <div style={{ border: '1px solid red' }}>
                            <button onClick={updateGraphicsToDatabase}>
                                Update Graphics
                            </button>
                            <button onClick={addNew}>Add New</button>
                        </div>

                        <div style={{ maxHeight: 250, minHeight: 250, overflow: "auto", border: '1px solid red' }}>
                            {loading ? <img src="./loader.gif" alt="Loading..." /> :
                                <Droppable droppableId="graphics1">
                                    {(provided) => (
                                        <table {...provided.droppableProps} ref={provided.innerRef}>
                                            <tbody>
                                                {graphics.length ? (
                                                    graphics.map((val, i) => (
                                                        <Draggable
                                                            key={val.GraphicsID}
                                                            draggableId={val.GraphicsID.toString()}
                                                            index={i}
                                                        >
                                                            {(provided, snapshot) => (
                                                                <>
                                                                    <tr
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        onClick={async () => {
                                                                            setGraphicsID(val.GraphicsID);
                                                                            setCurrentGraphics(i);
                                                                            setCurrentGraphics2(-1);
                                                                            setPageName(val.GraphicsTemplate + "_copy");
                                                                            console.log(graphics[i]);
                                                                            getAllKeyValue();
                                                                        }}
                                                                        style={{
                                                                            backgroundColor:
                                                                                currentGraphics === i ? "green" : "#E7DBD8",
                                                                            color:
                                                                                currentGraphics === i ? "white" : "black",
                                                                            margin: 10,
                                                                            padding: 10,
                                                                            ...provided.draggableProps.style,
                                                                        }}
                                                                    >
                                                                        <td>{i + 1}</td>

                                                                        <td {...provided.dragHandleProps}>
                                                                            <VscMove />
                                                                        </td>

                                                                        <td>
                                                                            <button
                                                                                style={{ cursor: "pointer" }}
                                                                                onClick={() => deleteGraphic(val.GraphicsID)}
                                                                            >
                                                                                <VscTrash />
                                                                            </button>
                                                                        </td>

                                                                        <td>
                                                                            <input
                                                                                style={{ width: 340 }}
                                                                                type="text"
                                                                                value={val.GraphicsTemplate}
                                                                                onChange={(e) =>
                                                                                    handleTemplateChange(
                                                                                        val.GraphicsID,
                                                                                        e.target.value
                                                                                    )
                                                                                }
                                                                            />
                                                                        </td>

                                                                        <td>
                                                                            {/* remove the image from here */}
                                                                        </td>
                                                                    </tr>

                                                                    <tr>
                                                                        <td colSpan={5}>
                                                                            <img
                                                                                src={`/api/images/${val.gfxpart2.split("/")[0]}/${val.gfxpart2.split("/")[1]}/thumb.png`}
                                                                                alt="thumb"
                                                                                style={{
                                                                                    width: 300,
                                                                                    height: "auto",
                                                                                    objectFit: "contain",
                                                                                    border: "1px solid #ccc",
                                                                                    marginTop: "4px",
                                                                                }}
                                                                            />
                                                                        </td>
                                                                    </tr>
                                                                </>


                                                            )}
                                                        </Draggable>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td>No Graphics</td>
                                                    </tr>
                                                )}
                                                {provided.placeholder}
                                            </tbody>
                                        </table>
                                    )}
                                </Droppable>
                            }
                        </div>

                    </div>
                    <div>
                        <Tabs
                            forceRenderTabPanel={true}
                        >
                            <TabList>
                                <Tab>Player</Tab>
                                <Tab>Templates</Tab>
                                <Tab>Script</Tab>

                            </TabList>


                            <TabPanel>
                                <div style={{ border: '1px solid blue', display: 'flex' }}>
                                    <div style={{ height: 800, overflow: 'auto', border: '1px solid red', }}>
                                        <table style={{ width: 450, borderCollapse: 'collapse' }}>
                                            <thead>
                                                <tr style={{ backgroundColor: '#f2f2f2' }}>
                                                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Scene Path</th>
                                                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {graphics?.map((val, i) => {
                                                    const [project, scene] = (val.gfxpart2 || "").split("/");

                                                    return (
                                                        <tr key={i}>
                                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>

                                                                {val.gfxpart2}
                                                                <div style={{ border: '1px solid red', backgroundColor: 'grey' }}>
                                                                    <img src={`/api/images/${project}/${scene}/thumb.png`} alt="thumb" width={300} />
                                                                </div>

                                                            </td>
                                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                                                <button
                                                                    onClick={() => {
                                                                        fetch("/api/playwithexportedvalues", {
                                                                            method: "POST",
                                                                            headers: { "Content-Type": "application/json" },
                                                                            body: JSON.stringify({
                                                                                project,
                                                                                scene,
                                                                                timeline: "In",
                                                                                exportedvalues: Object.entries(savedExportValues).map(([name, value]) => ({ name, value: value.value })),

                                                                            }),
                                                                        });
                                                                    }}
                                                                    style={{ marginRight: "10px" }}
                                                                >
                                                                    Play
                                                                </button>
                                                                <button
                                                                    onClick={() => {
                                                                        fetch("/api/timeline", {
                                                                            method: "POST",
                                                                            headers: { "Content-Type": "application/json" },
                                                                            body: JSON.stringify({
                                                                                project,
                                                                                scene,
                                                                                timeline: "Out",
                                                                            }),
                                                                        });
                                                                    }}
                                                                >
                                                                    Stop
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div style={{ height: 800, width: 1000, overflow: 'auto', border: '1px solid red' }}>
                                        <div>
                                            {graphics && graphics[currentGraphics] && (() => {
                                                const val = graphics[currentGraphics];

                                                if (!val.gfxtemplatetext) return null;

                                                let pageValue = {};

                                                try {
                                                    const parsed = JSON.parse(val.gfxtemplatetext);
                                                    pageValue = parsed.pageValue || {};

                                                } catch (e) {
                                                    console.error("Invalid JSON:", e);
                                                    return null;
                                                }

                                                return (
                                                    <div style={{ border: '1px solid #ccc', }}>
                                                        <table border="1" cellPadding="8" cellSpacing="0" style={{ borderCollapse: "collapse" }}>
                                                            <thead>
                                                                <tr>
                                                                    <th>Variable</th>
                                                                    <th>Value</th>
                                                                    <th>Type</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {Object.entries(savedExportValues).map(([key, value]) => {
                                                                    const val = value || {};

                                                                    const handleChange = (newVal) => {
                                                                        setSavedExportValues((prev) => ({
                                                                            ...prev,
                                                                            [key]: {
                                                                                ...prev[key],
                                                                                value: newVal,
                                                                            },
                                                                        }));
                                                                    };

                                                                    let inputField;

                                                                    if (val.type === "String") {
                                                                        inputField = (
                                                                            <textarea
                                                                                style={{ width: 680, height: 60, resize: "vertical" }}
                                                                                value={val?.value || ""}
                                                                                onChange={(e) => handleChange(e.target.value)}
                                                                            />
                                                                        );
                                                                    } else if (val.type === "Bool") {
                                                                        inputField = (
                                                                            <input
                                                                                type="checkbox"
                                                                                checked={val?.value === true || val?.value === "true"}
                                                                                onChange={(e) => handleChange(e.target.checked)}
                                                                            />
                                                                        );
                                                                    } else if (val.type === "Texture") {
                                                                        inputField = (
                                                                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                                                <input
                                                                                    style={{ width: 400 }}
                                                                                    value={val?.value || ""}
                                                                                    onChange={(e) => handleChange(e.target.value)}
                                                                                />
                                                                                <input
                                                                                    type="file"
                                                                                    onChange={(e) => {
                                                                                        if (e.target.files?.[0]) {
                                                                                            const fileName = e.target.files[0].name;
                                                                                            handleChange(fileName);
                                                                                        }
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                        );
                                                                    } else if (val.type === "ColorInt") {
                                                                        let hex = "#000000";
                                                                        if (val?.value !== undefined && val?.value !== "") {
                                                                            let intVal = parseInt(val.value);
                                                                            if (isNaN(intVal)) intVal = 0;
                                                                            hex =
                                                                                "#" +
                                                                                (intVal >>> 0)
                                                                                    .toString(16)
                                                                                    .padStart(8, "0")
                                                                                    .slice(-6);
                                                                        }

                                                                        inputField = (
                                                                            <input
                                                                                type="color"
                                                                                value={hex}
                                                                                onChange={(e) => {
                                                                                    const hexVal = e.target.value;
                                                                                    const intVal = parseInt(hexVal.replace("#", ""), 16);
                                                                                    handleChange(intVal.toString());
                                                                                }}
                                                                            />
                                                                        );
                                                                    } else if (val.type === "Number") {
                                                                        inputField = (
                                                                            <input
                                                                                type="text"
                                                                                style={{ width: 150 }}
                                                                                value={val?.value ?? ""}
                                                                                onChange={(e) => {
                                                                                    const entered = e.target.value;

                                                                                    if (entered === "" || entered === "-") {
                                                                                        handleChange(entered);
                                                                                        return;
                                                                                    }

                                                                                    const num = parseFloat(entered);
                                                                                    if (!isNaN(num)) {
                                                                                        handleChange(num);
                                                                                    }
                                                                                }}
                                                                            />
                                                                        );
                                                                    } else {
                                                                        inputField = (
                                                                            <input
                                                                                style={{ width: 300 }}
                                                                                value={
                                                                                    typeof val?.value === "object"
                                                                                        ? JSON.stringify(val.value)
                                                                                        : val?.value || ""
                                                                                }
                                                                                onChange={(e) => {
                                                                                    let inputVal = e.target.value;
                                                                                    try {
                                                                                        const parsed = JSON.parse(inputVal);
                                                                                        handleChange(parsed);
                                                                                    } catch {
                                                                                        handleChange(inputVal);
                                                                                    }
                                                                                }}
                                                                            />
                                                                        );
                                                                    }

                                                                    return (
                                                                        <tr key={key}>
                                                                            <td>{key}</td>
                                                                            <td>{inputField}</td>
                                                                            <td>{val?.type || ""}</td>
                                                                        </tr>
                                                                    );
                                                                })}
                                                            </tbody>

                                                        </table>
                                                    </div>

                                                );
                                            })()}



                                        </div>

                                    </div>

                                </div>
                            </TabPanel>
                            <TabPanel>
                                <div style={{ border: '1px solid red' }}>
                                    <div>
                                        <div style={{ display: 'flex' }}>
                                            <div style={{ border: '1px solid red', width: 250, }}>
                                                <button onClick={fullstructure}>Get Full Structure</button>
                                                <h2>Project:</h2>
                                                <select
                                                    style={{ width: 240, padding: '6px 12px', marginBottom: '12px' }}
                                                    value={selectedProject || ""}
                                                    onChange={(e) => {
                                                        setSelectedProject(e.target.value)
                                                        setSelectedScene(null)
                                                        setExports([])
                                                        setExportValues({})
                                                        setanimations([])
                                                        // setThumbnail(null)
                                                    }}
                                                >
                                                    <option value="" disabled>Select</option>
                                                    {data.map((project) => (
                                                        <option key={project.name} value={project.name}>{project.name}</option>
                                                    ))}
                                                </select>

                                                {selectedProject && (
                                                    <>
                                                        <h2>Scene:</h2>
                                                        <input
                                                            type="text"
                                                            placeholder="Search scenes..."
                                                            value={searchQuery}
                                                            onChange={(e) => setSearchQuery(e.target.value)}
                                                            style={{
                                                                width: 200,
                                                                padding: '8px',
                                                                marginBottom: '12px',
                                                                fontSize: '16px',
                                                                borderRadius: '4px',
                                                                border: '1px solid #ccc'
                                                            }}
                                                        />
                                                        <div style={{ maxHeight: 700, overflow: 'scroll' }}>
                                                            {data
                                                                .find((p) => p.name === selectedProject)?.scenes
                                                                .filter(scene =>
                                                                    scene.name.toLowerCase().includes(searchQuery.toLowerCase())
                                                                ).map(scene => (
                                                                    <div
                                                                        key={scene.name}
                                                                        onClick={async () => {
                                                                            setSelectedScene(scene.name)

                                                                            const res = await fetch("/api/exports", {
                                                                                method: "POST",
                                                                                headers: { "Content-Type": "application/json" },
                                                                                body: JSON.stringify({ project: selectedProject, scene: scene.name })
                                                                            })

                                                                            const data = await res.json()

                                                                            setExports(data.exports || [])
                                                                            console.log(data)
                                                                            setanimations(data.animations || [])
                                                                            // setThumbnail(data.thumbnail || null)

                                                                            const initialValues = {};

                                                                            data.exports.forEach((exp) => {
                                                                                initialValues[exp.name] = {
                                                                                    value: exp.value,
                                                                                    type: exp.type
                                                                                };
                                                                            });

                                                                            setExportValues(initialValues);

                                                                        }}
                                                                        style={{
                                                                            padding: '6px 12px',
                                                                            marginBottom: '6px',
                                                                            backgroundColor: selectedScene === scene.name ? 'grey' : '#eee',
                                                                            color: selectedScene === scene.name ? 'white' : '#000',
                                                                            cursor: 'pointer',
                                                                            borderRadius: '4px',
                                                                            userSelect: 'none',
                                                                            fontSize: '20px',
                                                                        }}
                                                                    >
                                                                        {scene.name}
                                                                        <img src={scene.thumbnail}></img>
                                                                    </div>
                                                                ))}
                                                        </div>

                                                    </>
                                                )}
                                            </div>
                                            <div style={{ border: '1px solid red', width: 950 }}>
                                                <div>
                                                    <h3>Variables</h3>
                                                    {exports.length > 0 && (
                                                        <div style={{ height: 850, overflow: 'auto' }}>
                                                            <table border="1" cellPadding="8" cellSpacing="0">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Variable</th>
                                                                        <th>Value</th>
                                                                        <th>Type</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {exports.map((exp) => {
                                                                        const val = exportValues[exp.name] || {};

                                                                        const handleChange = (newVal) => {
                                                                            setExportValues((prev) => ({
                                                                                ...prev,
                                                                                [exp.name]: {
                                                                                    ...prev[exp.name],
                                                                                    value: newVal,
                                                                                },
                                                                            }));
                                                                        };

                                                                        let inputField;

                                                                        if (exp.type === "String") {
                                                                            inputField = (
                                                                                <textarea
                                                                                    style={{ width: 680, height: 60, resize: "vertical" }}
                                                                                    value={val?.value || ""}
                                                                                    onChange={(e) => handleChange(e.target.value)}
                                                                                />
                                                                            );
                                                                        } else if (exp.type === "Bool") {
                                                                            inputField = (
                                                                                <input
                                                                                    type="checkbox"
                                                                                    checked={val?.value === true || val?.value === "true"}
                                                                                    onChange={(e) => handleChange(e.target.checked)}
                                                                                />
                                                                            );
                                                                        } else if (exp.type === "Texture") {
                                                                            inputField = (
                                                                                <div
                                                                                    style={{
                                                                                        display: "flex",
                                                                                        alignItems: "center",
                                                                                        gap: "8px",
                                                                                    }}
                                                                                >
                                                                                    <input
                                                                                        style={{ width: 400 }}
                                                                                        value={val?.value || ""}
                                                                                        onChange={(e) => handleChange(e.target.value)}
                                                                                    />
                                                                                    <input
                                                                                        type="file"
                                                                                        onChange={(e) => {
                                                                                            if (e.target.files?.[0]) {
                                                                                                const fileName = e.target.files[0].name;
                                                                                                handleChange(fileName);
                                                                                            }
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                            );
                                                                        } else if (exp.type === "ColorInt") {
                                                                            let hex = "#000000";
                                                                            if (val?.value !== undefined && val?.value !== "") {
                                                                                let intVal = parseInt(val.value);
                                                                                if (isNaN(intVal)) intVal = 0;
                                                                                hex =
                                                                                    "#" +
                                                                                    (intVal >>> 0)
                                                                                        .toString(16)
                                                                                        .padStart(8, "0")
                                                                                        .slice(-6);
                                                                            }

                                                                            inputField = (
                                                                                <input
                                                                                    type="color"
                                                                                    value={hex}
                                                                                    onChange={(e) => {
                                                                                        const hexVal = e.target.value;
                                                                                        const intVal = parseInt(hexVal.replace("#", ""), 16);
                                                                                        handleChange(intVal.toString());
                                                                                    }}
                                                                                />
                                                                            );
                                                                        } else if (exp.type === "Number") {
                                                                            inputField = (
                                                                                <input
                                                                                    type="text"
                                                                                    style={{ width: 150 }}
                                                                                    value={val?.value ?? ""}
                                                                                    onChange={(e) => {
                                                                                        const entered = e.target.value;

                                                                                        if (entered === "" || entered === "-") {
                                                                                            handleChange(entered);
                                                                                            return;
                                                                                        }

                                                                                        const num = parseFloat(entered);
                                                                                        if (!isNaN(num)) {
                                                                                            handleChange(num);
                                                                                        }
                                                                                    }}
                                                                                />
                                                                            );
                                                                        } else {
                                                                            inputField = (
                                                                                <input
                                                                                    style={{ width: 300 }}
                                                                                    value={
                                                                                        typeof val?.value === "object"
                                                                                            ? JSON.stringify(val.value)
                                                                                            : val?.value || ""
                                                                                    }
                                                                                    onChange={(e) => {
                                                                                        let inputVal = e.target.value;
                                                                                        try {
                                                                                            const parsed = JSON.parse(inputVal);
                                                                                            handleChange(parsed);
                                                                                        } catch {
                                                                                            handleChange(inputVal);
                                                                                        }
                                                                                    }}
                                                                                />
                                                                            );
                                                                        }

                                                                        return (
                                                                            <tr key={exp.name}>
                                                                                <td>{exp.name}</td>
                                                                                <td>{inputField}</td>
                                                                                <td>{exp.type}</td>
                                                                            </tr>
                                                                        );
                                                                    })}
                                                                </tbody>

                                                            </table>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>



                                            <div style={{ border: '1px solid red', width: 300 }}>

                                                <h2>Actions</h2>
                                                {selectedScene && (
                                                    <div>

                                                        <div>
                                                            <button
                                                                onClick={async () => {
                                                                    const updates = Object.entries(exportValues).map(([name, value]) => ({ name, value }))
                                                                    const res = await fetch("/api/setExports", {
                                                                        method: "POST",
                                                                        headers: { "Content-Type": "application/json" },
                                                                        body: JSON.stringify({ project: selectedProject, scene: selectedScene, updates })
                                                                    })
                                                                    const result = await res.json()
                                                                    console.log("Export update:", result)
                                                                }}
                                                            >
                                                                Update values
                                                            </button>
                                                        </div>

                                                        <button
                                                            onClick={() => {
                                                                const sceneId = `${selectedProject}/${selectedScene}`
                                                                setListloadedscenes((prev) => prev.filter((item) => item !== sceneId))
                                                                fetch("/api/timeline", {
                                                                    method: "POST",
                                                                    headers: { "Content-Type": "application/json" },
                                                                    body: JSON.stringify({ project: selectedProject, scene: selectedScene, timeline: "Out" })
                                                                })
                                                            }}
                                                        >
                                                            ⏹ Out
                                                        </button>

                                                        <div>
                                                            <button
                                                                onClick={() => {
                                                                    fetch("/api/unloadAllScenes", {
                                                                        method: "POST",
                                                                        headers: { "Content-Type": "application/json" },
                                                                    })
                                                                        .then((res) => res.json())
                                                                        .then(() => setListloadedscenes([]))
                                                                }}
                                                            >
                                                                🧹 Unload All Scenes
                                                            </button>
                                                        </div>

                                                        <div>
                                                            <h3>Animation</h3>
                                                            <table border="1" cellPadding="6" cellSpacing="0">
                                                                <thead>
                                                                    <tr>
                                                                        <th>#</th>
                                                                        <th>Animation</th>
                                                                        <th>Play</th>
                                                                        <th>with new Values</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {animations.map((animation, i) => (
                                                                        <tr key={i}>
                                                                            <td>{i + 1}</td>
                                                                            <td>{animation}</td>
                                                                            <td>
                                                                                <button
                                                                                    onClick={() =>
                                                                                        fetch("/api/timeline", {
                                                                                            method: "POST",
                                                                                            headers: { "Content-Type": "application/json" },
                                                                                            body: JSON.stringify({ project: selectedProject, scene: selectedScene, timeline: animation })
                                                                                        })
                                                                                            .then((res) => res.json())
                                                                                            .then(() => {
                                                                                                const sceneId = `${selectedProject}/${selectedScene}`
                                                                                                // if (!listloadedscenes.includes(sceneId)) {
                                                                                                setListloadedscenes([sceneId])
                                                                                                // }
                                                                                            })
                                                                                    }
                                                                                >
                                                                                    ▶️
                                                                                </button>
                                                                            </td>
                                                                            <td>
                                                                                <button
                                                                                    onClick={() =>
                                                                                        fetch("/api/playwithexportedvalues", {
                                                                                            method: "POST",
                                                                                            headers: { "Content-Type": "application/json" },
                                                                                            body: JSON.stringify({
                                                                                                project: selectedProject,
                                                                                                scene: selectedScene,
                                                                                                timeline: animation,
                                                                                                exportedvalues: Object.entries(exportValues).map(([name, value]) => ({ name, value: value.value }))
                                                                                            })
                                                                                        })
                                                                                            .then((res) => res.json())
                                                                                            .then(() => {
                                                                                                const sceneId = `${selectedProject}/${selectedScene}`
                                                                                                if (!listloadedscenes.includes(sceneId)) {
                                                                                                    setListloadedscenes((prev) => [...prev, sceneId])
                                                                                                }
                                                                                            })
                                                                                    }
                                                                                >
                                                                                    ▶️
                                                                                </button>
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>

                                                        </div>

                                                        <div style={{ border: '1px solid black' }}>
                                                            <div>
                                                                <h3>Command</h3>
                                                                <textarea
                                                                    style={{ width: 280, height: 100 }}
                                                                    type="text"
                                                                    value={command}
                                                                    onChange={(e) => setCommand(e.target.value)}
                                                                    placeholder="Enter command here"
                                                                />
                                                            </div>
                                                            <div>
                                                                <button
                                                                    onClick={async () => {
                                                                        const res = await fetch("/api/sendCommand", {
                                                                            method: "POST",
                                                                            headers: { "Content-Type": "application/json" },
                                                                            body: JSON.stringify({ command })
                                                                        })
                                                                        const result = await res.json()
                                                                        setCommandResponse(JSON.stringify(result))
                                                                    }}
                                                                >
                                                                    Send Command
                                                                </button>
                                                            </div>
                                                            <h3>Response</h3>

                                                            <label>{commandResponse}</label>
                                                        </div>


                                                    </div>
                                                )}
                                            </div>
                                            {/* <div style={{ border: '1px solid red', width: 400 }}>
                                    <h2>Loaded Scenes: {listloadedscenes.length}</h2>
                                    <table border="1" cellPadding="8" cellSpacing="0">
                                        <thead>
                                            <tr>
                                                <th>Loaded Scene</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listloadedscenes.map((scene, index) => (
                                                <tr key={index}>
                                                    <td>{scene}</td>
                                                    <td>
                                                        <button
                                                            onClick={() => {
                                                                setListloadedscenes((prev) => prev.filter((s) => s !== scene))
                                                                fetch("/api/timeline", {
                                                                    method: "POST",
                                                                    headers: { "Content-Type": "application/json" },
                                                                    body: JSON.stringify({
                                                                        project: scene.split('/')[0],
                                                                        scene: scene.split('/')[1],
                                                                        timeline: "Out"
                                                                    })
                                                                })
                                                            }}
                                                        >
                                                            ⏹ Out
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                </div> */}
                                        </div>


                                    </div>
                                </div>
                            </TabPanel>

                            <TabPanel>
                                <div style={{ minHeight: 157, border: '1px solid red' }}>
                                    <Oneliner slugs={slugs} currentStoryNumber={currentSlug} />
                                </div>
                                <div>
                                    <Script
                                        ScriptID={ScriptID}
                                        title={selectedRunOrderTitle}
                                        currentSlugSlugName={currentSlugSlugName}
                                    />
                                </div>
                            </TabPanel>
                        </Tabs>
                    </div>






                </div>
            </div>
        </DragDropContext >
        <div>
            <Timer
                callback={timerFunction}
                interval={5000}
                stopOnNext={stopOnNext}
                setStopOnNext={setStopOnNext}
            />
        </div>
        {isLoading && <Spinner />}
        {flashMessage && <FlashMessage message={flashMessage} />}

    </div >);
};

export default Nrcs2;