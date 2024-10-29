import React, { useEffect, useState, useRef } from "react";
import {
  generateUniqueId,
  shadowOptions,
  getFormattedDatetimeNumber,
  addressmysql,
} from "../common";
import { useSelector, useDispatch } from "react-redux";
import GsapPlayer from "../GsapPlayer";
import Script from "./Script";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { VscTrash, VscMove } from "react-icons/vsc";
import * as fabric from "fabric";
import VerticalScrollPlayer from "../VerticalScrollPlayer";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Oneliner from "./Oneliner";
import DataUpdater from "./DataUpdater";

import debounce from "lodash.debounce";

const Graphics = () => {
  const canvas = useSelector((state) => state.canvasReducer.canvas);
  const canvasList = useSelector((state) => state.canvasListReducer.canvasList);
  const [pageName, setPageName] = useState("new Graphics");
  const dispatch = useDispatch();
  const refPageName = useRef();

  const [runOrderTitles, setRunOrderTitles] = useState([]);
  const [selectedRunOrderTitle, setSelectedRunOrderTitle] = useState("");
  const [selectedRunOrderTitle2, setSelectedRunOrderTitle2] = useState("");
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

  async function fetchRO() {
    try {
      const res = await fetch(addressmysql() + "/getNewsID");
      const data = await res.json();
      setRunOrderTitles(data);
    } catch (error) {
      // console.error('Error fetching RunOrderTitles:', error);
    }
  }

  useEffect(() => {
    fetchRO();
  }, []);

  useEffect(() => {
    if (selectedRunOrderTitle === "") {
      return;
    }
    async function fetchData() {
      try {
        const res = await fetch(
          addressmysql() + `/show_runorder?param1=${selectedRunOrderTitle}`
        );
        const data = await res.json();
        setSlugs(data);
      } catch (error) {
        // console.error('Error fetching users:', error);
      }
    }

    fetchData();
  }, [selectedRunOrderTitle]);

  useEffect(() => {
    if (selectedRunOrderTitle2 === "") {
      return;
    }
    async function fetchData() {
      try {
        const res = await fetch(
          addressmysql() + `/show_runorder?param1=${selectedRunOrderTitle2}`
        );
        const data = await res.json();
        setSlugs2(data);
      } catch (error) {
        // console.error('Error fetching users:', error);
      }
    }

    fetchData();
  }, [selectedRunOrderTitle2]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          addressmysql() + `/getGraphics?ScriptID=${ScriptID}`
        );
        const data = await res.json();
        setGraphics(data);
      } catch (error) {
        // console.error('Error fetching RunOrderTitles:', error);
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

    // updateSlugs(cgValue);
    // console.log(slugs[currentSlug].MediaInsert, cgValue, ScriptID, selectedRunOrderTitle)

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

  const deleteGraphic2 = async (GraphicsID) => {
    const newGraphics = graphics2.filter(
      (val) => val.GraphicsID !== GraphicsID
    );
    const reorderedItemsWithNewOrder = newGraphics.map((item, index) => ({
      ...item,
      GraphicsOrder: index + 1,
    }));

    setGraphics2(reorderedItemsWithNewOrder);

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

    if ((destinationDroppableId === "graphics1") && (sourceDroppableId === "graphics2")) {
      await updateCGEntry();
    }

    if (sourceDroppableId === destinationDroppableId) {
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
    console.log(GraphicsID, newTemplate);
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
    updateGraphicTemplate(GraphicsID, newTemplate);
  }, 100);

  const updateGraphicTemplate2 = async (GraphicsID, newTemplate) => {
    const updatedGraphics = graphics2.map((graphic) =>
      graphic.GraphicsID === GraphicsID
        ? { ...graphic, GraphicsTemplate: newTemplate }
        : graphic
    );
    setGraphics2(updatedGraphics);
    try {
      await fetch(addressmysql() + "/updateGraphicTemplate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ GraphicsID, GraphicsTemplate: newTemplate }),
      });
    } catch (error) {
      // console.error('Error updating template:', error);
    }
  };

  const fetchAllContent = async () => {
    const data1 = new Array(slugs.length * 2); // Creating an array with double the length to store index and script content
    slugs.forEach((slug, i) => {
      data1[i * 2] = `${i + 1} ${slug.SlugName}`;
      data1[i * 2 + 1] = `${slug.Script}\n_ _ _ _ _ _ _\n`;
    });
    return data1.filter((item) => item !== undefined); // Filter out any undefined entries
  };

  const addToCanvas = async () => {
    const allContent = await fetchAllContent();

    let currentTop = 500; // Initial top position
    for (let i = 0; i < allContent.length; i++) {
      const id = generateUniqueId({ type: "textbox" });
      const fillColor = i % 2 === 0 ? "#ffff00" : "#ffffff";
      const backgroundColor = i % 2 === 0 ? "#0000ff" : ""; // Alternate background color
      const textbox = new fabric.Textbox(allContent[i], {
        id: id,
        class: id,
        shadow: { ...shadowOptions, blur: 0 },
        left: 100,
        top: currentTop,
        width: 1700,
        fill: fillColor,
        backgroundColor,
        fontFamily: "Arial",
        fontWeight: "bold",
        fontSize: 90,
        editable: true,
        objectCaching: false,
        textAlign: "left",
        stroke: "#000000",
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

  const refreshRO = () => {
    fetchRO();
  }
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div>
        <div style={{ display: "flex" }}>
          <div style={{ minWidth: 450, maxWidth: 450, marginTop: 45 }}>
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
              <button onClick={refreshRO}>Refresh RO</button>
              {slugs.length} slugs

            </div>


            <div style={{ maxHeight: 332, minHeight: 332, overflow: "auto", border: '1px solid red' }}>
              {slugs &&
                slugs?.map((val, i) => (<div key={i} style={{
                  display: 'flex', color: currentSlug === i ? "white" : "black",
                  backgroundColor: currentSlug === i ? "green" : "#E7DBD8",
                  margin: 10,
                }}>
                  <div
                    onClick={() => {
                      setScriptID(val.ScriptID);
                      setCurrentSlug(i);
                      setCurrentSlugSlugName(val.SlugName);
                    }}

                    style={{
                      minWidth: 320
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
              <GsapPlayer layer1={200} inline={false} />
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
                                    currentGraphics === i ? "green" : "#E7DBD8",
                                  color:
                                    currentGraphics === i ? "white" : "black",
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
            </div>
            <div style={{ border: "1px solid red" }}>
              <button onClick={addToCanvas}>
                Add Sripts to canvas for Teleprompting
              </button>
              <div>
                <VerticalScrollPlayer />
              </div>
              {/* <button onClick={updateCGEntry}> updateCGEntry</button> */}

            </div>
          </div>
          <div>
            <Tabs selectedTabClassName="selectedTab" forceRenderTabPanel={true}>
              <TabList>

                <Tab>DataUpdater</Tab>
                <Tab>Copy Graphics</Tab>
                <Tab>Oneliner and Script</Tab>

              </TabList>
              <TabPanel>
                <DataUpdater />
              </TabPanel>
              <TabPanel>
                <div style={{ minWidth: 450, maxWidth: 450 }}>
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
                          minWidth: 320
                        }}
                      >
                        {i + 1}{" "}
                        <label style={{ cursor: "pointer" }}>
                          {val.SlugName}
                        </label>{" "}  {val.MediaInsert}
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
                                      <button
                                        style={{ cursor: "pointer" }}
                                        onClick={() =>
                                          deleteGraphic2(val.GraphicsID)
                                        }
                                      >
                                        <VscTrash />
                                      </button>
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        value={val.GraphicsTemplate}
                                        onChange={(e) =>
                                          updateGraphicTemplate2(
                                            val.GraphicsID,
                                            e.target.value
                                          )
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
    </DragDropContext>
  );
};

export default Graphics;
