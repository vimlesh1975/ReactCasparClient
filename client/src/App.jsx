import { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
import "./App.css";
import React from "react";
import Video from "./Video.jsx";
import Drawing from "./Drawing.jsx";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import DrawingController from "./DrawingController.jsx";
import ImageSequence from './imagesequence/ImageSequence';


// eslint-disable-next-line
import Graphics from "./NRCS/Graphics.jsx";



import { v4 as uuidv4 } from "uuid";

import VideoController from "./VideoController.jsx";
import Help from "./Help.jsx";

import LayersAll from "./LayersAll.jsx";
import VideoPlaylist from "./VideoPlaylist.jsx";
import Scroll from "./Scroll.jsx";
import Automation from "./Automation.jsx";
import { videoLayers } from "./common.js";
import Shapes from "./Shapes.jsx";
import Games from "./Games/Games.jsx";
import Charts from "./Charts.jsx";
import { useSelector, useDispatch } from "react-redux";
import { FaPlay, FaStop } from "react-icons/fa";
import TimeLine1 from "./TimeLine1.jsx";
import PathModifier from "./PathModifier.jsx";
import OnelinerAndBreakingNews from "./OnelinerAndBreakingNews.jsx";
import Effects from "./Effects.jsx";
import JsonReader from "./JsonReader.jsx";

// import UdpClock from './UdpClock';

import ColorGradient2 from "./ColorGradient2.jsx";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
// import Threejs from "./Threejs.jsx";
import Crop from "./Crop";
import CodeImport from "./CodeImport.jsx";

import Tsparticles1 from "./tsparticles/Tsparticles1.jsx";
import HtmlOutput from "./HtmlOutput.jsx";
import GenerativeArts from "./GenerativeArts/GenerativeArts.jsx";
import Data from "./data/Data.jsx";

import {
  screenSizes,
  inAnimationMethods,
  animationMethods,
  chNumbers,
  endpoint,
  address1,
  updateGraphics,
  stopGraphics,
  templateLayers,
  clearHtml,
  languages,
  buildDate,
  startGraphics
} from "./common.js";

const App = () => {
  const canvas = useSelector((state) => state.canvasReducer.canvas);
  const zoom = useSelector((state) => state.canvaszoomReducer.zoom);

  const jsfilename = useSelector((state) => state.jsfilenameReducer.jsfilename);
  const cssfilename = useSelector(
    (state) => state.cssfilenameReducer.cssfilename
  );

  const canvasList = useSelector((state) => state.canvasListReducer.canvasList);
  const currentPage = useSelector(
    (state) => state.currentPageReducer.currentPage
  );

  const [mediaPath, setmediaPath] = useState();
  const refPreviewContainer = useRef();
  const [chNumber, setChNumber] = useState(1);
  const [currentTab, setCurrentTab] = useState("Drawing");
  const [animationMethod, setAnimationMethod] = useState("easenone");
  const [inAnimationMethod, setInAnimationMethod] = useState(
    "slide-in-bck-center"
  );
  const currentscreenSize = useSelector(
    (state) => state.currentscreenSizeReducer.currentscreenSize
  );
  const [solidcaption1, setSolidcaption1] = useState("");
  const [tabindex, settabindex] = useState(0);
  const continuous1 = useSelector(
    (state) => state.speechRecognitionReducer.continuous1
  );
  const currentLanguage = useSelector(
    (state) => state.speechRecognitionReducer.currentLanguage
  );
  const { listening } = useSpeechRecognition();

  const [serverAlive, setServerAlive] = useState(false);


  useEffect(() => {
    setSolidcaption1(localStorage.getItem("RCC_solidCaption1"));
    return () => {
      // cleanup
    };
  }, []);

  useEffect(() => {
    window.inAnimationMethod = inAnimationMethod;
    window.animationMethod = animationMethod;
    return () => {
      // cleanup
    };
  }, [inAnimationMethod, animationMethod]);

  useEffect(() => {
    window.chNumber = chNumber;
    document.title = `${buildDate}_CH #${chNumber}`;
    return () => {
      // cleanup
    };
  }, [chNumber]);

  const connectHandler = () => {
    if (connectbutton.current.style.backgroundColor === "green") {
      axios
        .post(address1 + "/disconnect")
        .then((aa) => { })
        .catch((aa) => {
          console.log("Error", aa);
        });
    } else {
      const data = { host: "127.0.0.1", port: 5250 };
      axios
        .post(address1 + "/connect", data)
        .then((aa) => { })
        .catch((aa) => {
          console.log("Error", aa);
        });
    }
  };
  const dispatch = useDispatch();
  const connectbutton = useRef();

  const refreshMedia = () => {
    axios
      .post(address1 + "/getmedia")
      .then((aa) => {
        dispatch({ type: "CHANGE_MEDIA", payload: aa.data });
      })
      .catch((aa) => {
        console.log("Error", aa);
      });
  };

  useEffect(() => {
    var socket;
    if (window.location.origin !== "https://vimlesh1975.github.io") {
      socket = new socketIOClient(":9000");
    }
    else {
      socket = new socketIOClient("https://octopus-app-gzws3.ondigitalocean.app");
    }

    socket.on("Fromccgsocket", (data) => {
      setmediaPath(data);
    });


    socket.on("newdatabase", (data) => {
      dispatch({ type: "NEWDATABASE", payload: data });
    });

    socket.on("connectionStatus", (data) => {
      if (data === "true") {
        connectbutton.current.style.backgroundColor = "green";
      } else {
        connectbutton.current.style.backgroundColor = "red";
      }
    });

    socket.on('connect', () => {
      console.log('Connected to server');
      setServerAlive(true);

    });

    socket.on('connect_error', (error) => {
      setServerAlive(false);
      connectbutton.current.style.backgroundColor = "red";
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
      setServerAlive(false);
      connectbutton.current.style.backgroundColor = "red";
    });

    return () => {
      socket.disconnect();
      socket.close();
    };

  }, [dispatch]);

  useEffect(() => {
    if (window.location.origin !== "https://vimlesh1975.github.io") {
      refreshMedia();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaPath]);

  const onTabChange = (index, prevIndex) => {
    settabindex(index);
    switch (index) {
      case 0:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
      case 11:
      case 20:
        setCurrentTab("Drawing");
        setTimeout(() => {
          window.dispatchEvent(new Event("resize"));
        }, 100);
        break;
      case 1:
      case 2:
        setCurrentTab("Video");
        break;
      default:
      //nothing
    }
  };

  const onTabChangevdo = (index, prevIndex) => {
    if (index === 0) {
      setCurrentTab("Video");
    } else {
      setCurrentTab("Drawing");
    }
  };

  const changeAnimationMethod = (e) => {
    setAnimationMethod(e.target.value);
  };
  const changeInAnimationMethod = (e) => {
    setInAnimationMethod(e.target.value);
  };

  const changeChannelNumber = (e) => {
    setChNumber(e.target.value);
  };

  const updatePage = () => {
    const updatedcanvasList = canvasList.map((val, i) => {
      return i === currentPage
        ? {
          ...val,
          pageValue: canvas.toJSON(["id", "selectable"]),
          jsfilename: jsfilename,
          cssfilename: cssfilename,
        }
        : val;
    });
    dispatch({ type: "CHANGE_CANVAS_LIST", payload: [...updatedcanvasList] });
  };
  const changeTab = (i) => {
    settabindex(i);
    // console.log(i)
  };
  // const changeTab2 = (i) => {
  //   settabindex2(i);
  //   // console.log(i)
  // };
  window.changeTab = changeTab;
  // window.changeTab2 = changeTab2;
  return (
    <div style={{ minWidth: 1920, minHeight: 1080, top: 0 }}>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div>
          <button
            title="Caspar Server status. Github Client will not connect to casparcg"
            className="connectbutton"
            style={{}}
            ref={connectbutton}
            onClick={connectHandler}
          >
            Connect
          </button>{" "}
          <button
            className="StopChannelButton"
            style={{}}
            onClick={() => {
              Object.values(templateLayers).forEach((layer) =>
                clearHtml(layer)
              );
              // clearHtml()
              endpoint(`clear ${chNumber}`);
              endpoint(`mixer ${chNumber} clear`);
            }}
          >
            Stop Channel
          </button>
          <span title="Socket Server Status"> {serverAlive ? '🟢' : '🔴'}</span>

        </div>

        <div>
          <b>Zoom:</b> {zoom.toFixed(1)} <b>Animation Method: IN </b>
          <select
            onChange={(e) => changeInAnimationMethod(e)}
            value={inAnimationMethod}
          >
            {inAnimationMethods.map((val) => {
              return (
                <option key={uuidv4()} value={val}>
                  {val}
                </option>
              );
            })}
          </select>
          <b> Out: </b>
          <select
            onChange={(e) => changeAnimationMethod(e)}
            value={animationMethod}
          >
            {animationMethods.map((val) => {
              return (
                <option key={uuidv4()} value={val}>
                  {val}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <b>Channel:</b>
          <select onChange={(e) => changeChannelNumber(e)} value={chNumber}>
            {chNumbers.map((val) => {
              return (
                <option key={uuidv4()} value={val}>
                  {val}
                </option>
              );
            })}
          </select>
          <button onClick={() => endpoint(`swap 1 2`)}>Swap CH 1 and 2</button>
          <button onClick={updatePage}>Update Page</button>
        </div>
        <div style={{ minWidth: 500 }}>
          <b> Solid Cap 1: </b>
          <button title="Play to Casparcg or Html"
            onClick={() => {
              startGraphics(canvas, templateLayers.solidCaption1, currentscreenSize);
              setSolidcaption1(canvasList[currentPage]?.pageName);
              localStorage.setItem(
                "RCC_solidCaption1",
                canvasList[currentPage]?.pageName
              );
            }}
          >
            <FaPlay />
          </button>{" "}
          <button
            onClick={() => updateGraphics(canvas, templateLayers.solidCaption1)}
          >
            Update
          </button>
          <button
            onClick={() => {
              stopGraphics(templateLayers.solidCaption1);
              setSolidcaption1("");
              localStorage.setItem("RCC_solidCaption1", "");
            }}
          >
            <FaStop />
          </button>
          <span> {solidcaption1} </span> <b>Languages:</b>{" "}
          <input
            style={{ width: 70 }}
            value={currentLanguage}
            onChange={(e) => {
              dispatch({
                type: "CHANGE_CURRENTLANGUAGE",
                payload: e.target.value,
              });
              if (continuous1 && listening) {
                SpeechRecognition.startListening({
                  continuous: continuous1,
                  language: e.target.value,
                });
              }
            }}
          />
          {/* </div>
      <div> */}
          <select
            style={{ width: 70 }}
            value={currentLanguage}
            onChange={(e) => {
              dispatch({
                type: "CHANGE_CURRENTLANGUAGE",
                payload: e.target.value,
              });

              if (continuous1 && listening) {
                SpeechRecognition.startListening({
                  continuous: continuous1,
                  language: e.target.value,
                });
              }
            }}
          >
            {languages
              .filter((value, index, self) => {
                return self.indexOf(value) === index;
              })
              .map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
        </div>
        <div>
          Size:{" "}
          <select
            value={currentscreenSize}
            onChange={(e) => {
              localStorage.setItem(
                "RCC_currentscreenSize",
                parseInt(e.target.value)
              );
              dispatch({
                type: "CHANGE_CURRENTSCREENSIZE",
                payload: parseInt(e.target.value),
              });
            }}
          >
            {" "}
            {screenSizes.map((val) => {
              return (
                <option key={uuidv4()} value={val}>
                  {val}
                </option>
              );
            })}{" "}
          </select>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          border: "1px dashed blue",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              border: "1px dashed blue",
            }}
          >
            <div>
              <div
                ref={refPreviewContainer}
                id="preview-container"
                className="preview-container"
              >
                <div
                  style={{
                    display: currentTab === "Drawing" ? "none" : "block",
                  }}
                >
                  <Video video={""} layerNumber={videoLayers[0]} />
                  <Video video={""} layerNumber={videoLayers[1]} />
                  <Video video={""} layerNumber={videoLayers[2]} />
                  <Video video={""} layerNumber={videoLayers[4]} />
                  <Video video={""} layerNumber={videoLayers[3]} />
                </div>
                <div
                  style={{
                    display: currentTab === "Drawing" ? "block" : "none",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      left: 506,
                      top: 250,
                      fontSize: 40,
                    }}
                  >
                    .
                  </span>
                  <Drawing />
                </div>
              </div>
              <div style={{ display: 'flex' }}>
                <div style={{ border: '1px solid red' }}>
                  <TimeLine1 />
                </div>
                <div style={{ border: '1px solid red', zIndex: -1 }}>
                  <HtmlOutput scale={0.315} />
                </div>
                <div style={{ display: 'none' }}>
                  <Automation />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Tabs
            selectedIndex={tabindex}
            selectedTabClassName="selectedTab"
            forceRenderTabPanel={true}
            onSelect={(index, prevIndex) => onTabChange(index, prevIndex)}
          >
        {/* // NRCS */}
            {/* <TabList>
              <Tab>Graphics</Tab>
              <Tab className="tabHidden">VDO</Tab>
              <Tab className="tabHidden">VDO Playlist</Tab>
              <Tab>Layers</Tab>
              <Tab >Gradient</Tab>
              <Tab className="tabHidden">BreakingNews</Tab>
              <Tab className="tabHidden">ImgSequence</Tab>
              <Tab className="tabHidden">Scroll</Tab>
              <Tab>Shapes</Tab>
              <Tab className="tabHidden">Games</Tab>
              <Tab className="tabHidden">Charts</Tab>
              <Tab className="tabHidden">Path Modifier</Tab>
              <Tab className="tabHidden">Effects</Tab>
              <Tab className="tabHidden">JsonReader</Tab>
              <Tab>Crop</Tab>
              <Tab className="tabHidden">CodeImport</Tab>
              <Tab className="tabHidden">Tsparticles</Tab>
              <Tab className="tabHidden">Data</Tab>
              <Tab >Help</Tab>
              <Tab className="tabHidden">GA</Tab>
              <Tab>NRCS</Tab>
            </TabList> */}


{/* Chennai Earth station */}
            <TabList>
              <Tab>Graphics</Tab>
              <Tab className="tabHidden">VDO</Tab>
              <Tab className="tabHidden">VDO Playlist</Tab>
              <Tab className="tabHidden">Layers</Tab>
              <Tab  className="tabHidden">Gradient</Tab>
              <Tab className="tabHidden">BreakingNews</Tab>
              <Tab className="tabHidden">ImgSequence</Tab>
              <Tab className="tabHidden">Scroll</Tab>
              <Tab className="tabHidden">Shapes</Tab>
              <Tab className="tabHidden">Games</Tab>
              <Tab className="tabHidden">Charts</Tab>
              <Tab className="tabHidden">Path Modifier</Tab>
              <Tab className="tabHidden">Effects</Tab>
              <Tab className="tabHidden">JsonReader</Tab>
              <Tab className="tabHidden">Crop</Tab>
              <Tab className="tabHidden">CodeImport</Tab>
              <Tab className="tabHidden">Tsparticles</Tab>
              <Tab className="tabHidden">Data</Tab>
              <Tab  className="tabHidden">Help</Tab>
              <Tab className="tabHidden">GA</Tab>
              <Tab>NRCS</Tab>
            </TabList>


            <TabPanel>
              <div style={{ border: "1px dashed blue", width: 900 }}>
                <DrawingController />
              </div>
            </TabPanel>
            <TabPanel>
              <Tabs
                // selectedIndex={tabIndexVideo}
                selectedTabClassName="selectedTab"
                forceRenderTabPanel={true}
                onSelect={(index, prevIndex) => onTabChangevdo(index, prevIndex)}
              >
                <TabList>
                  <Tab>Single Channel Mutiple Layers</Tab>
                  <Tab>Four Channel</Tab>
                </TabList>
                <TabPanel>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      width: 900,
                      marginBottom: 20,
                    }}
                  >
                    <VideoController layerNumber={videoLayers[0]} />
                    <VideoController layerNumber={videoLayers[1]} />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      width: 900,
                    }}
                  >
                    <VideoController layerNumber={videoLayers[2]} />
                    <VideoController layerNumber={videoLayers[3]} />
                  </div>
                </TabPanel>

                <TabPanel>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      width: 900,
                      marginBottom: 20,
                    }}
                  >
                    <VideoController layerNumber={videoLayers[0]} channelNumber={1} />
                    <VideoController layerNumber={videoLayers[0]} channelNumber={2} />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      width: 900,
                    }}
                  >
                    <VideoController layerNumber={videoLayers[0]} channelNumber={3} />
                    <VideoController layerNumber={videoLayers[0]} channelNumber={4} />
                  </div>
                </TabPanel>

              </Tabs>


            </TabPanel>
            <TabPanel>
              <VideoPlaylist />
            </TabPanel>
            <TabPanel>
              <LayersAll compact={false} />
            </TabPanel>
            <TabPanel>
              <ColorGradient2 />
            </TabPanel>
            <TabPanel>
              <OnelinerAndBreakingNews />
            </TabPanel>
            <TabPanel>
              <ImageSequence layer={templateLayers.imgSequenceLayer1} />
              <hr />
              <ImageSequence layer={templateLayers.imgSequenceLayer2} />

            </TabPanel>
            <TabPanel>
              <Scroll />
            </TabPanel>
            <TabPanel>
              <Shapes />
            </TabPanel>
            <TabPanel>
              <Games />
            </TabPanel>
            <TabPanel>
              <Charts />
            </TabPanel>

            <TabPanel>
              <PathModifier />
            </TabPanel>
            <TabPanel>
              <Effects />
            </TabPanel>
            <TabPanel>
              <JsonReader />
            </TabPanel>
            <TabPanel>
              <Crop />
            </TabPanel>
            <TabPanel>
              <CodeImport />
            </TabPanel>
            <TabPanel>
              <Tsparticles1 />
            </TabPanel>

            <TabPanel>
              <Data />
            </TabPanel>
            <TabPanel>
              <Help />
            </TabPanel>
            <TabPanel>
              <GenerativeArts />
            </TabPanel>
            <TabPanel>
              <Graphics />
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default App;
