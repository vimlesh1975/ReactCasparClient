import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  // generateUniqueId,
  // shadowOptions,
  getFormattedDatetimeNumber,
  addressmysql,
  templateLayers,
  selectAll,
  endpoint, executeScript
} from "../common";
import { useSelector, useDispatch } from "react-redux";
import GsapPlayer from "../GsapPlayer";
import Script from "./Script";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { VscTrash, VscMove } from "react-icons/vsc";
// import * as fabric from "fabric";
// import VerticalScrollPlayer from "../VerticalScrollPlayer";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Oneliner from "./Oneliner";
import DataUpdater from "./DataUpdater";

import debounce from "lodash.debounce";
import Timer from "./Timer";

import Thumbnailview from "./Thumbnailview";
import Spinner from "../spinner/Spinner";
import FlashMessage from "../FlashMessage";


const Graphics = () => {

  const [yScroll, setYScroll] = useState(0.00);
  const [yBreakingNewsLowerthird, setYBreakingNewsLowerthird] = useState(0.00);
  const [yNewsUpdateLowerthird, setYyNewsUpdateLowerthird] = useState(0.00);
  const [yTwoliner, setYTwoliner] = useState(0.00);
  const [yDateTimeSwitcher, setYDateTimeSwitcher] = useState(0.00);

  const [lines, setLines] = useState([]);
  const [fileHandle, setFileHandle] = useState(null); // Store file handle

  const canvas = useSelector((state) => state.canvasReducer.canvas);
  const canvasList = useSelector((state) => state.canvasListReducer.canvasList);
  const newdatabase = useSelector((state) => state.newdatabaseReducer.newdatabase);

  const [pageName, setPageName] = useState("new Graphics");
  const dispatch = useDispatch();
  const refPageName = useRef();

  const [runOrderTitles, setRunOrderTitles] = useState([]);
  const [selectedRunOrderTitle, setSelectedRunOrderTitle] = useState("0700 Hrs");
  const [selectedRunOrderTitle2, setSelectedRunOrderTitle2] = useState("0600 Hrs");
  const [slugs, setSlugs] = useState([]);
  const [slugs2, setSlugs2] = useState([]);
  const [ScriptID, setScriptID] = useState("");
  const [ScriptID2, setScriptID2] = useState("");
  const [currentSlug, setCurrentSlug] = useState(-1);
  const [currentSlug2, setCurrentSlug2] = useState(-1);
  const [graphics, setGraphics] = useState([]);
  const [graphics2, setGraphics2] = useState([]);
  const [currentGraphics, setCurrentGraphics] = useState(-1);
  const [currentGraphics2, setCurrentGraphics2] = useState(-1);
  const [graphicsID, setGraphicsID] = useState("");
  const [currentSlugSlugName, setCurrentSlugSlugName] = useState("");

  const [stopOnNext, setStopOnNext] = useState(false);
  const [live, setLive] = useState(false);

  const [loading, setLoading] = useState(true);  // Initialize loading state to true
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

  const NrcsBreakingText = useSelector((state) => state.NrcsBreakingTextReducer.NrcsBreakingText);
  const [showdateandTime, setShowdateandTime] = useState(true);

  const readFile = async (handle) => {
    if (!handle) return;

    try {
      const file = await handle.getFile(); // Get a fresh file object
      const reader = new FileReader();

      reader.onload = (e) => {
        const content = e.target.result;
        const linesArray = content.split(/\r?\n/);
        setLines(linesArray);
      };

      reader.readAsText(file);
    } catch (error) {
      console.error("Error reading file:", error);
    }
  };


  useEffect(() => {
    endpoint(`call ${window.chNumber}-${templateLayers.nrcsscroll} startScroll(${JSON.stringify(lines)})`);
  }, [lines])

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

  const handleUpdate = async () => {
    if (fileHandle) {
      await readFile(fileHandle);
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

  const exportTotalEachPagetoHTML = async () => {
    try {
      const aa = await Promise.all(
        slugs.map(async (slug) => {
          const res = await fetch(
            addressmysql() + `/getGraphics?ScriptID=${slug.ScriptID}`
          );
          const data = await res.json();
          return data;
        })
      );

      console.log(aa); // `aa` is now an array of all fetched results.

      // Sequentially process each fetched value with exportEachPagetoHTML
      for (const val of aa) {
        await exportEachPagetoHTML(val);
      }

      // If parallel processing is acceptable, use:
      // await Promise.all(aa.map((val) => exportEachPagetoHTML(val)));

      console.log("All pages have been exported.");
    } catch (error) {
      console.error("Error exporting pages:", error);
    }
  };


  const exportEachPagetoHTML = async (canvasList, number = '') => {
    setIsLoading(true); // Show spinner
    try {
      // Prompt user to select a folder for saving files
      // const directoryHandle = await window.showDirectoryPicker();
      // if (!directoryHandle) return; // User cancelled the folder selection

      if (!directoryHandle) {
        await setDirectory();
        // return;
      }

      // Helper function to process and save each canvas item
      const processAndSaveCanvasItem = async (val, index) => {
        return new Promise((resolve, reject) => {
          canvas.loadFromJSON(JSON.parse(val.Graphicstext1).pageValue).then(() => {
            selectAll(canvas);

            const activeObj = canvas.getActiveObject();
            const ww = activeObj?.getBoundingRect().width + 100 || 1920;
            const hh = activeObj?.getBoundingRect().height + 100 || 1080;

            // Set canvas dimensions
            const newWidth = Math.max(1920, ww);
            const newHeight = Math.max(1080, hh);
            canvas.setDimensions({ width: newWidth, height: newHeight });
            canvas.renderAll();

            // Convert to SVG
            const svgString = canvas.toSVG();

            // Reset canvas dimensions
            if (newWidth !== 1920 || newHeight !== 1080) {
              canvas.setDimensions({ width: 1920, height: 1080 });
              canvas.renderAll();
            }

            canvas.discardActiveObject();
            canvas.requestRenderAll();

            // Generate HTML content
            const htmlContent = `
              <!DOCTYPE html>
              <html>
              <head>
                <meta charset="UTF-8">
                <title>Exported SVG - Page ${index + 1}</title>
                <style>
                body{
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    overflow: hidden;
                }
                </style>
                <link rel="stylesheet" href="main.css">
                <link rel="stylesheet" href="main2.css">
              </head>
              <body>
                <div>${svgString}</div>
              </body>
              <script src="main.js" defer></script>
              <script src="main2.js" defer></script>
              </html>
            `;

            resolve(htmlContent);
          }).catch(reject);
        });
      };

      // Loop through canvasList and save each as an HTML file
      for (const [index, val] of canvasList.entries()) {

        if (val.Graphicstext1) {
          const htmlContent = await processAndSaveCanvasItem(val, index);
          const fileName = `${val.ScriptID}_${(number === '') ? (index + 1) : (number + 1)}_${(val.GraphicsTemplate).replace(/[\\/:*?"<>|]/g, "_")}.html`;
          const fileHandle = await directoryHandle.getFileHandle(fileName, { create: true });
          const writable = await fileHandle.createWritable();
          await writable.write(htmlContent);
          await writable.close();
        }

      }

      console.log("All files have been saved successfully.");
    } catch (error) {
      console.error("Error exporting pages to individual HTML files:", error);
      alert(error);
    } finally {
      setIsLoading(false); // Hide spinner
      showMessage('Done');
    }
  };


  const getAllKeyValue = () => {
    const aa = []
    canvas.getObjects().forEach((element) => {
      var type = (element.type === 'i-text' || element.type === 'textbox' || element.type === 'text') ? 'text' : element.type;
      if (type === 'text') {
        if (element.textLines.length > 1) {
          aa.push({ key: element.id, value: element.text, type: 'textarea', fontFamily: element.fontFamily });
        }
        else {
          aa.push({ key: element.id, value: element.text, type: 'text', fontFamily: element.fontFamily });
        }
      }
      if (type === 'image') {
        aa.push({ key: element.id, value: element.src, type: 'image' })
      }
    });
    // settextNodes(aa);
    dispatch({ type: "CHANGE_TEXT_NODES", payload: aa });
  }

  const timerFunction = async () => {
    if (!live) return;
    await fetchRO();
    try {
      const res = await fetch(
        addressmysql() + `/getGraphics?ScriptID=${ScriptID}`
      );
      const data = await res.json();
      // console.log(data);
      setGraphics(data);
    } catch (error) {
      // console.error('Error fetching RunOrderTitles:', error);
    }
  }

  async function fetchNewsID() {
    try {
      const res = await fetch(addressmysql() + "/getNewsID");
      const data = await res.json();
      setRunOrderTitles(data);
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
        addressmysql() + `/show_runorder?param1=${selectedRunOrderTitle}&param2=${selectedDate}`
      );
      const data = await res.json();
      setSlugs(data);
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
          addressmysql() + `/show_runorder?param1=${selectedRunOrderTitle2}&param2=${selectedDate2}`
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
    async function fetchData() {
      try {
        setLoading(true);  // Start loading
        const res = await fetch(
          addressmysql() + `/getGraphics?ScriptID=${ScriptID}`
        );
        const data = await res.json();
        setGraphics(data);
      } catch (error) {
        // Handle the error (optional)
        // console.error('Error fetching RunOrderTitles:', error);
      } finally {
        setLoading(false);  // Stop loading when data is set or if an error occurs
      }
    }

    fetchData();
  }, [ScriptID]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          addressmysql() + `/getGraphics?ScriptID=${ScriptID2}`
        );
        const data = await res.json();
        setGraphics2(data);
      } catch (error) {
        // console.error('Error fetching RunOrderTitles:', error);
      }
    }

    fetchData();
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
          Graphicstext1: JSON.stringify({ pageValue: canvas.toJSON() }),
        }
        : val
    );
    setGraphics(newGraphics);
    try {
      await fetch(addressmysql() + "/setGraphics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: JSON.stringify({ pageValue: canvas.toJSON() }),
          graphicsID,
        }),
      });
    } catch (error) {
      // console.error('Error saving content:', error);
    }
  };
  const addNew = async () => {
    const GraphicsID = getFormattedDatetimeNumber(); // Generate GraphicsID once
    const newGraphics = [
      ...graphics,
      {
        GraphicsID,
        Graphicstext1: JSON.stringify({ pageValue: canvas.toJSON() }),
        GraphicsOrder: graphics.length + 1,
        ScriptID,
        GraphicsTemplate: pageName,
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
          Graphicstext1: JSON.stringify({ pageValue: canvas.toJSON() }),
          GraphicsOrder: graphics.length + 1,
          ScriptID,
          GraphicsTemplate: pageName,
        }),
      });
    } catch (error) {
      // console.error('Error saving content:', error);
    }
  };

  const updateCGEntry = async (deleteCG = false) => {
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
      else if ((slugs[currentSlug].MediaInsert) === 'CG') {
        cgValue = null;
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
        cgValue = 'CG';
      }
      else if (slugs[currentSlug].MediaInsert === 'Visuals/CG') {
        return;
      }
      else if ((slugs[currentSlug].MediaInsert) === 'CG') {
        return
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
          NewsId: selectedRunOrderTitle
        }),
      });
    } catch (error) {
      // console.error('Error saving content:', error);
    }
  }

  const deleteGraphic = async (GraphicsID) => {
    if (graphics.length === 1) {
      await updateCGEntry(true);
    }
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


  const playScroll = () => {
    const url = `https://localhost:10000/ReactCasparClient/HorizontalScrollWithTopic/${selectedDate}`;
    endpoint(`play ${window.chNumber}-${templateLayers.nrcsscroll} [html] ${url}`);
    endpoint(`mixer ${window.chNumber}-${templateLayers.nrcsscroll} fill 0.015 ${yScroll} 0.97 1`);
    endpoint(`call ${window.chNumber}-${templateLayers.nrcsscroll} "setShowdateandTime(${showdateandTime})"`);
    const script = `
    document.getElementById('divid_${templateLayers.nrcsscroll}')?.remove();
    window.Scrollfromtextfile = document.createElement('div');
    Scrollfromtextfile.style.position='absolute';
    Scrollfromtextfile.style.zIndex = '${templateLayers.nrcsscroll}';
    Scrollfromtextfile.setAttribute('id','divid_' + '${templateLayers.nrcsscroll}');
    document.body.appendChild(Scrollfromtextfile);
    window.iframe=document.createElement('iframe');
    iframe.src = '${url}';
    iframe.width = '1920';
    iframe.height = '1080';
    Scrollfromtextfile.appendChild(iframe);
    `
   executeScript(script);

   setTimeout(() => {
    executeScript(`Scrollfromtextfile.getElementsByTagName('iframe')[0].contentWindow.postMessage({ action: 'callFunction', data: ${showdateandTime} }, '*')`);
  }, 2000);

  }

  const playScrollfromtextfile = () => {
    const url = `https://localhost:10000/ReactCasparClient/HorizontalScroll`;
    endpoint(`play ${window.chNumber}-${templateLayers.nrcsscroll} [html] ${url}`);

    setTimeout(() => {
      endpoint(`call ${window.chNumber}-${templateLayers.nrcsscroll} startScroll(${JSON.stringify(lines)})`);
    }, 1000);
    endpoint(`mixer ${window.chNumber}-${templateLayers.nrcsscroll} fill 0.015 ${yScroll} 0.97 1`);

    const script = `
     document.getElementById('divid_${templateLayers.nrcsscroll}')?.remove();
     window.Scrollfromtextfile = document.createElement('div');
     Scrollfromtextfile.style.position='absolute';
     Scrollfromtextfile.style.zIndex = '${templateLayers.nrcsscroll}';
     Scrollfromtextfile.setAttribute('id','divid_' + '${templateLayers.nrcsscroll}');
     document.body.appendChild(Scrollfromtextfile);
     window.iframe=document.createElement('iframe');
     iframe.src = '${url}';
     iframe.width = '1920';
     iframe.height = '1080';
     Scrollfromtextfile.appendChild(iframe);
     `
    executeScript(script);
    setTimeout(() => {
      executeScript(`Scrollfromtextfile.getElementsByTagName('iframe')[0].contentWindow.postMessage({ action: 'callFunction', data: ${JSON.stringify(lines)} }, '*')`);
    }, 2000);

  }

  const stopScroll = () => {
    endpoint(
      `stop ${window.chNumber}-${templateLayers.nrcsscroll}`
    );

    const script = `document.getElementById('divid_${templateLayers.nrcsscroll}')?.remove();`
    executeScript(script);
  }

  const playBreakingNews = () => {
    const url=`https://localhost:10000/ReactCasparClient/BreakingNews/${selectedDate}`;
    endpoint(`play ${window.chNumber}-${templateLayers.nrcsBreakingNews} [html] ${url}`);
    endpoint(`mixer ${window.chNumber}-${templateLayers.nrcsBreakingNews} fill 0.015 ${yBreakingNewsLowerthird} 0.97 1`);

    const script = `
    document.getElementById('divid_${templateLayers.nrcsBreakingNews}')?.remove();
    window.DateTimeSwitcher = document.createElement('div');
    DateTimeSwitcher.style.position='absolute';
    DateTimeSwitcher.style.zIndex = '${templateLayers.nrcsBreakingNews}';
    DateTimeSwitcher.setAttribute('id','divid_' + '${templateLayers.nrcsBreakingNews}');
    document.body.appendChild(DateTimeSwitcher);
    window.iframe=document.createElement('iframe');
    iframe.src = '${url}';
    iframe.width = '1920';
    iframe.height = '1080';
    DateTimeSwitcher.appendChild(iframe);
    `
   executeScript(script);
  }
  const stopBreakingNews = () => {
    endpoint(
      `stop ${window.chNumber}-${templateLayers.nrcsBreakingNews}`
    );
    const script = `document.getElementById('divid_${templateLayers.nrcsBreakingNews}')?.remove();`
    executeScript(script);
  }

  const playNewsUpdate = () => {
    const url=`https://localhost:10000/ReactCasparClient/NewsUpdate/${selectedDate}`;
    endpoint(`play ${window.chNumber}-${templateLayers.nrcsNewsUpdate} [html] ${url}`);
    endpoint(`mixer ${window.chNumber}-${templateLayers.nrcsNewsUpdate} fill 0.015 ${yNewsUpdateLowerthird} 0.97 1`);

    const script = `
    document.getElementById('divid_${templateLayers.nrcsNewsUpdate}')?.remove();
    window.DateTimeSwitcher = document.createElement('div');
    DateTimeSwitcher.style.position='absolute';
    DateTimeSwitcher.style.zIndex = '${templateLayers.nrcsNewsUpdate}';
    DateTimeSwitcher.setAttribute('id','divid_' + '${templateLayers.nrcsNewsUpdate}');
    document.body.appendChild(DateTimeSwitcher);
    window.iframe=document.createElement('iframe');
    iframe.src = '${url}';
    iframe.width = '1920';
    iframe.height = '1080';
    DateTimeSwitcher.appendChild(iframe);
    `
   executeScript(script);
  }
  const stopNewsUpdate = () => {
    endpoint(
      `stop ${window.chNumber}-${templateLayers.nrcsNewsUpdate}`
    );
    const script = `document.getElementById('divid_${templateLayers.nrcsNewsUpdate}')?.remove();`
    executeScript(script);

  }


  const playDateTimeSwitcher = () => {
    const url = `https://localhost:10000/ReactCasparClient/DateTimeSwitcher`;

    endpoint(`play ${window.chNumber}-${templateLayers.nrcsDateTimeSwitcher} [html] ${url}`);
    endpoint(`mixer ${window.chNumber}-${templateLayers.nrcsDateTimeSwitcher} fill 0.015 ${yDateTimeSwitcher} 0.97 1`);

    const script = `
     document.getElementById('divid_${templateLayers.nrcsDateTimeSwitcher}')?.remove();
     window.DateTimeSwitcher = document.createElement('div');
     DateTimeSwitcher.style.position='absolute';
     DateTimeSwitcher.style.zIndex = '${templateLayers.nrcsDateTimeSwitcher}';
     DateTimeSwitcher.setAttribute('id','divid_' + '${templateLayers.nrcsDateTimeSwitcher}');
     document.body.appendChild(DateTimeSwitcher);
     window.iframe=document.createElement('iframe');
     iframe.src = '${url}';
     iframe.width = '1920';
     iframe.height = '1080';
     DateTimeSwitcher.appendChild(iframe);
     `
    executeScript(script);

  }
  const stopDateTimeSwitcher = () => {
    endpoint(
      `stop ${window.chNumber}-${templateLayers.nrcsDateTimeSwitcher}`
    );
    const script = `document.getElementById('divid_${templateLayers.nrcsDateTimeSwitcher}')?.remove();`
    executeScript(script);
  }

  const playTwoliner = () => {
    const url=`https://localhost:10000/ReactCasparClient/Twoliner/${selectedDate}`;
    endpoint(`play ${window.chNumber}-${templateLayers.nrcsTwoliner} [html] ${url}`);
    endpoint(`mixer ${window.chNumber}-${templateLayers.nrcsTwoliner} fill 0.015 ${yTwoliner} 0.97 1`);
    endpoint(`mixer ${window.chNumber}-${templateLayers.nrcsTwoliner} opacity 0`);
    setTimeout(() => {
      endpoint(`call ${window.chNumber}-${templateLayers.nrcsTwoliner} "dispatch({ type: 'NRCSBREAKINGTEXT', payload: ${NrcsBreakingText} })"`);
    }, 100);
    setTimeout(() => {
      endpoint(`mixer ${window.chNumber}-${templateLayers.nrcsTwoliner} opacity 1`);
    }, 3000);

    const script = `
    document.getElementById('divid_${templateLayers.nrcsTwoliner}')?.remove();
    window.DateTimeSwitcher = document.createElement('div');
    DateTimeSwitcher.style.position='absolute';
    DateTimeSwitcher.style.zIndex = '${templateLayers.nrcsTwoliner}';
    DateTimeSwitcher.setAttribute('id','divid_' + '${templateLayers.nrcsTwoliner}');
    document.body.appendChild(DateTimeSwitcher);
    window.iframe=document.createElement('iframe');
    iframe.src = '${url}';
    iframe.width = '1920';
    iframe.height = '1080';
    DateTimeSwitcher.appendChild(iframe);
    `
   executeScript(script);


  }
  const stopTwoliner = () => {
    endpoint(
      `stop ${window.chNumber}-${templateLayers.nrcsTwoliner}`
    );
    const script = `document.getElementById('divid_${templateLayers.nrcsTwoliner}')?.remove();`
    executeScript(script);
  }

  const playFullPageBreakingNews = () => {
    const url=`https://localhost:10000/ReactCasparClient/FullPageBreakingNews/${selectedDate}`;
    endpoint(`play ${window.chNumber}-${templateLayers.nrcsFullPageBreakingNews} [html] ${url}`);
    const script = `
    document.getElementById('divid_${templateLayers.nrcsFullPageBreakingNews}')?.remove();
    window.DateTimeSwitcher = document.createElement('div');
    DateTimeSwitcher.style.position='absolute';
    DateTimeSwitcher.style.zIndex = '${templateLayers.nrcsFullPageBreakingNews}';
    DateTimeSwitcher.setAttribute('id','divid_' + '${templateLayers.nrcsFullPageBreakingNews}');
    document.body.appendChild(DateTimeSwitcher);
    window.iframe=document.createElement('iframe');
    iframe.src = '${url}';
    iframe.width = '1920';
    iframe.height = '1080';
    DateTimeSwitcher.appendChild(iframe);
    `
   executeScript(script);
  }
  const stopFullPageBreakingNews = () => {
    endpoint(
      `stop ${window.chNumber}-${templateLayers.nrcsFullPageBreakingNews}`
    );
    const script = `document.getElementById('divid_${templateLayers.nrcsFullPageBreakingNews}')?.remove();`
    executeScript(script);
  }



  const setDirectory = async () => {
    try {
      const handle = await window.showDirectoryPicker();
      setDirectoryHandle(handle); // Save the directory handle in state
      console.log("Directory selected:", handle);
    } catch (error) {
      console.error("Directory selection canceled or failed:", error);
    }
  }

  async function deleteOllFiles() {
    const now = new Date();
    try {
      for await (const [name, handle] of directoryHandle.entries()) {
        if (handle.kind === 'file' && name.endsWith('.html')) {
          const first15 = name.slice(0, 15);
          const asInteger = parseInt(first15, 10);

          if (!isNaN(asInteger)) {

            const file = await handle.getFile();
            const lastModifiedDate = new Date(file.lastModified);
            // Calculate the age of the file in days
            const fileAgeInDays = (now - lastModifiedDate) / (1000 * 60 * 60 * 24);

            if (fileAgeInDays > 0) {
              try {
                // Uncomment to enable deletion
                await directoryHandle.removeEntry(name);
                console.log(`File "${name}" deleted.`);
              } catch (deleteError) {
                console.error(`Failed to delete "${name}":`, deleteError);
              }
            }

          }
        }
      }
    } catch (error) {
      console.error('Error iterating through directory:', error);
    }
  }


  const handleChange = (event) => {
    const value = event.target.value === 'true';  // Convert string to boolean
    dispatch({ type: 'NRCSBREAKINGTEXT', payload: value });
  };

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
                  runOrderTitles.map((runOrderTitle, i) => (
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


            <div style={{ maxHeight: 332, minHeight: 332, overflow: "auto", border: '1px solid red' }}>
              {slugs &&
                slugs?.map((val, i) => (<div
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

            {/* <h4>Graphics</h4> */}
            <div style={{ border: "1px solid red", height: 60, padding: 5 }}>
              <GsapPlayer layer1={templateLayers.NRCSgsap} inline={false} />
            </div >
            <div style={{ border: '1px solid red' }}>
              <button onClick={updateGraphicsToDatabase}>
                Update Graphics
              </button>

              <button onClick={addNew}>Add New</button>
              <span>Template:</span>{" "}
              <select
                ref={refPageName}
                onChange={(e) => {
                  setPageName(canvasList[e.target.selectedIndex].pageName);
                  dispatch({
                    type: "CHANGE_CURRENT_PAGE",
                    payload: e.target.selectedIndex,
                  });
                  window.editor.canvas
                    .loadFromJSON(
                      canvasList[e.target.selectedIndex].pageValue
                    )
                    .then(() => {
                      const aa = window.editor.canvas.getObjects();
                      aa.forEach((element) => {
                        try {
                          element.set({ objectCaching: false });
                        } catch (error) {
                          alert(error);
                          return;
                        }
                      });
                      window.editor.canvas.requestRenderAll();
                    });
                }}
                value={pageName}
              >
                {canvasList.map((val, i) => {
                  return (
                    <option key={i} value={val.pageName}>
                      {val.pageName}
                    </option>
                  );
                })}
              </select>
            </div>

            <div style={{ maxHeight: 250, minHeight: 250, overflow: "auto", border: '1px solid red' }}>
              {loading ? <img src="/ReactCasparClient/loader.gif" alt="Loading..." /> :
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
                                <tr
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  onClick={async () => {
                                    setGraphicsID(val.GraphicsID);
                                    setCurrentGraphics(i);
                                    setCurrentGraphics2(-1);
                                    setPageName(val.GraphicsTemplate + '_copy');
                                    const parsedJSON = JSON.parse(
                                      val.Graphicstext1
                                    );
                                    await canvas.loadFromJSON(
                                      parsedJSON.pageValue
                                    );
                                    canvas.requestRenderAll();
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
                                      onClick={() =>
                                        deleteGraphic(val.GraphicsID)
                                      }
                                    >
                                      <VscTrash />
                                    </button>
                                  </td>
                                  <td>
                                    <input
                                      style={{ width: 340 }}
                                      type="text"
                                      value={val.GraphicsTemplate}
                                      onChange={(e) => handleTemplateChange(val.GraphicsID, e.target.value)
                                      }
                                    />
                                  </td>
                                </tr>
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


            <div style={{ border: "1px solid red" }}>
              {/* <button onClick={addToCanvas}>
                Add Sripts to canvas for Teleprompting
              </button> */}
              <div>
                {/* <VerticalScrollPlayer /> */}

                {directoryHandle && <><button onClick={() => exportTotalEachPagetoHTML(graphics)}>exportTotalEachPagetoHTML</button><button onClick={() => exportEachPagetoHTML(graphics)}>exportEachPagetoHTML</button> <button onClick={deleteOllFiles}>Delete Old files</button> </>}
                <button onClick={setDirectory}>Set Directory</button>{directoryHandle && directoryHandle.name}
              </div>

            </div>
          </div>
          <div>
            <Tabs
              selectedTabClassName="selectedTab"
              forceRenderTabPanel={true}
              onSelect={(index, prevIndex) => onTabChange(index, prevIndex)}
            >
              <TabList>
                <Tab>Thumbnailview</Tab>
                <Tab>DataUpdater</Tab>
                <Tab>Copy </Tab>
                <Tab>Script</Tab>
                <Tab>Scroll</Tab>
              </TabList>
              <TabPanel>
                <Thumbnailview graphics={graphics} currentPage={currentGraphics} setCurrentGraphics={setCurrentGraphics} getAllKeyValue={getAllKeyValue} loading={loading} directoryHandle={directoryHandle} exportEachPagetoHTML={exportEachPagetoHTML} />
              </TabPanel>
              <TabPanel>
                <DataUpdater updateGraphicsToDatabase={updateGraphicsToDatabase} getAllKeyValue={getAllKeyValue} />
              </TabPanel>
              <TabPanel>
                <div style={{ minWidth: 450, maxWidth: 450 }}>
                  <div>
                    {newdatabase &&
                      <div>
                        <label htmlFor="date-selector">Select a date: </label>
                        <input
                          id="date-selector"
                          type="date"
                          value={selectedDate2}
                          onChange={handleDateChange2}
                        />
                      </div>
                    }
                  </div>

                  Run Orders:
                  <select
                    value={selectedRunOrderTitle2}
                    onChange={handleSelectionChange2}
                  >
                    <option value="" disabled>
                      Select a Run Order
                    </option>
                    {runOrderTitles &&
                      runOrderTitles.map((runOrderTitle, i) => (
                        <option key={i} value={runOrderTitle.title}>
                          {runOrderTitle.title}
                        </option>
                      ))}
                  </select>
                  {slugs2.length} slugs
                </div>
                <div
                  style={{ maxHeight: 430, minHeight: 430, overflow: "auto", border: '1px solid red' }}
                >

                  {slugs2 &&
                    slugs2?.map((val, i) => (<div key={i} style={{
                      display: 'flex', color: currentSlug2 === i ? "white" : "black",
                      backgroundColor: currentSlug2 === i ? "green" : "#E7DBD8",
                      margin: 10,
                    }}>
                      <div
                        onClick={() => {
                          setScriptID2(val.ScriptID);
                          setCurrentSlug2(i);
                        }}
                        key={i}
                        style={{
                          minWidth: 320,
                          maxWidth: 320,
                        }}
                      >
                        {i + 1}{" "}
                        <label style={{ cursor: "pointer" }}>
                          {val.SlugName}
                        </label>{" "}
                      </div>
                      <div>{val.MediaInsert}</div>
                    </div>
                    ))}
                </div>
                <div
                  style={{ maxHeight: 250, minHeight: 250, overflow: "auto", border: '1px solid red' }}
                >
                  <Droppable droppableId="graphics2">
                    {(provided) => (
                      <table
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        <tbody>
                          {graphics2.length ? (
                            graphics2.map((val, i) => (
                              <Draggable
                                key={val.GraphicsID}
                                draggableId={val.GraphicsID.toString()}
                                index={i}
                              >
                                {(provided, snapshot) => (
                                  <tr
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    onClick={async () => {
                                      setCurrentGraphics2(i);
                                      setPageName(val.GraphicsTemplate + '_copy');
                                      const parsedJSON = JSON.parse(
                                        val.Graphicstext1
                                      );
                                      await canvas.loadFromJSON(
                                        parsedJSON.pageValue
                                      );
                                      canvas.requestRenderAll();
                                    }}
                                    style={{
                                      backgroundColor:
                                        currentGraphics2 === i
                                          ? "green"
                                          : "#E7DBD8",
                                      color:
                                        currentGraphics2 === i
                                          ? "white"
                                          : "black",
                                      margin: 10,
                                      padding: 10,
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    <td>{i}</td>
                                    <td {...provided.dragHandleProps}>
                                      <VscMove />
                                    </td>

                                    <td>
                                      <input
                                        style={{ pointerEvents: 'none', width: 370 }}
                                        readonly
                                        type="text"
                                        value={val.GraphicsTemplate}
                                      />
                                    </td>
                                  </tr>
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
              <TabPanel>
                <div>
                  <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                    <thead>
                      <tr>
                        <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Feature</th>
                        <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ border: '1px solid black', padding: '8px', fontWeight: 'bolder' }}>
                          Scroll
                          <br />
                          <input type="checkbox" id="vehicle1" name="vehicle1" checked={showdateandTime} onChange={() => setShowdateandTime(val => !val)} />
                          <label for="vehicle1">Show Dtae and Time Also</label>
                        </td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                          <button onClick={playScroll} style={{ marginRight: '8px' }}>Play</button>
                          <button onClick={stopScroll}>Stop</button>
                          <div style={{ border: '1px solid red', margin: 5 }}>
                            <div>
                              <label>Y: </label> <input max={2} step="0.01" style={{ width: 50 }} type='number' value={yScroll} onChange={e => {
                                setYScroll(e.target.value);
                                endpoint(`mixer ${window.chNumber}-${templateLayers.nrcsscroll} fill 0.015 ${e.target.value} 0.97 1`);
                              }
                              } />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ border: '1px solid black', padding: '8px', fontWeight: 'bolder' }}>
                          Scroll from text file
                          <br />
                          <button
                            onClick={handleFileSelection}
                          >
                            Select File
                          </button>
                          {fileHandle && fileHandle.name}
                          {fileHandle && <button
                            onClick={handleUpdate}
                          >
                            Update
                          </button>}
                        </td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                          <button onClick={playScrollfromtextfile} style={{ marginRight: '8px' }}>Play</button>
                          <button onClick={stopScroll}>Stop</button>
                          <div style={{ border: '1px solid red', margin: 5 }}>
                            <div>
                              <label>Y: </label> <input max={2} step="0.01" style={{ width: 50 }} type='number' value={yScroll} onChange={e => {
                                setYScroll(e.target.value);
                                endpoint(`mixer ${window.chNumber}-${templateLayers.nrcsscroll} fill 0.015 ${e.target.value} 0.97 1`);
                              }
                              } />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ border: '1px solid black', padding: '8px', fontWeight: 'bolder' }}>BreakingNews Lower Third</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                          <button onClick={playBreakingNews} style={{ marginRight: '8px' }}>Play</button>
                          <button onClick={stopBreakingNews}>Stop</button>
                          {/* <Mixerfill layer={templateLayers.nrcsBreakingNews} /> */}
                          <div style={{ border: '1px solid red', margin: 5 }}>
                            <div>
                              <label>Y: </label> <input max={2} step="0.01" style={{ width: 50 }} type='number' value={yBreakingNewsLowerthird} onChange={e => {
                                setYBreakingNewsLowerthird(e.target.value);
                                endpoint(`mixer ${window.chNumber}-${templateLayers.nrcsBreakingNews} fill 0.015 ${e.target.value} 0.97 1`);
                              }
                              } />
                            </div>
                          </div>

                        </td>
                      </tr>

                      <tr>
                        <td style={{ border: '1px solid black', padding: '8px', fontWeight: 'bolder' }}>News Update Lower Third</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                          <button onClick={playNewsUpdate} style={{ marginRight: '8px' }}>Play</button>
                          <button onClick={stopNewsUpdate}>Stop</button>
                          <div style={{ border: '1px solid red', margin: 5 }}>
                            <div>
                              <label>Y: </label> <input max={2} step="0.01" style={{ width: 50 }} type='number' value={yNewsUpdateLowerthird} onChange={e => {
                                setYyNewsUpdateLowerthird(e.target.value);
                                endpoint(`mixer ${window.chNumber}-${templateLayers.nrcsNewsUpdate} fill 0.015 ${e.target.value} 0.97 1`);
                              }
                              } />
                            </div>
                          </div>
                        </td>
                      </tr>


                      <tr>
                        <td style={{ border: '1px solid black', padding: '8px', fontWeight: 'bolder' }}>
                          Twoliner
                          <br />

                          <label>
                            <input
                              type="radio"
                              value={true}
                              checked={NrcsBreakingText === true}
                              onChange={handleChange}
                            />
                            Breaking News
                          </label>
                          <label>
                            <input
                              type="radio"
                              value={false}
                              checked={NrcsBreakingText === false}
                              onChange={handleChange}
                            />
                            News Update
                          </label>


                        </td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                          <button onClick={playTwoliner} style={{ marginRight: '8px' }}>Play</button>
                          <button onClick={stopTwoliner}>Stop</button>

                          <div style={{ border: '1px solid red', margin: 5 }}>
                            <div>
                              <label>Y: </label> <input max={2} step="0.01" style={{ width: 50 }} type='number' value={yTwoliner} onChange={e => {
                                setYTwoliner(e.target.value);
                                endpoint(`mixer ${window.chNumber}-${templateLayers.nrcsTwoliner} fill 0.015 ${e.target.value} 0.97 1`);
                              }
                              } />
                            </div>
                          </div>

                        </td>
                      </tr>
                      <tr>
                        <td style={{ border: '1px solid black', padding: '8px', fontWeight: 'bolder' }}>DateTimeSwitcher</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                          <button onClick={playDateTimeSwitcher} style={{ marginRight: '8px' }}>Play</button>
                          <button onClick={stopDateTimeSwitcher}>Stop</button>

                          <div style={{ border: '1px solid red', margin: 5 }}>
                            <div>
                              <label>Y: </label> <input max={2} step="0.01" style={{ width: 50 }} type='number' value={yDateTimeSwitcher} onChange={e => {
                                setYDateTimeSwitcher(e.target.value);
                                endpoint(`mixer ${window.chNumber}-${templateLayers.nrcsDateTimeSwitcher} fill 0.015 ${e.target.value} 0.97 1`);
                              }
                              } />
                            </div>
                          </div>

                        </td>
                      </tr>
                      <tr>
                        <td style={{ border: '1px solid black', padding: '8px', fontWeight: 'bolder' }}>FullPageBreakingNews</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                          <button onClick={playFullPageBreakingNews} style={{ marginRight: '8px' }}>Play</button>
                          <button onClick={stopFullPageBreakingNews}>Stop</button>
                        </td>
                      </tr>


                    </tbody>
                  </table>
                </div>

              </TabPanel>

            </Tabs>
          </div>
        </div>
      </div>
    </DragDropContext>
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
    {/* {newdatabase} */}
  </div>);
};

export default Graphics;
