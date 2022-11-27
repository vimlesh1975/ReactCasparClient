import { useState, useEffect, useRef } from 'react'
import socketIOClient from "socket.io-client";
import './App.css';
import React from "react";
import Video from './Video';
import Drawing from './Drawing';
import axios from 'axios'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import DrawingController from './DrawingController';

import { v4 as uuidv4 } from 'uuid';

import VideoController from './VideoController';
import Help from './Help';
import { screenSizes, inAnimationMethods, animationMethods, chNumbers, endpoint, address1, updateGraphics, stopGraphics, templateLayers } from './common'
import Layers from './Layers'
import VideoPlaylist from './VideoPlaylist'
import Twoliner from './Twoliner'
import Scroll from './Scroll'
import Automation from './Automation';
import { videoLayers } from './common'
import Shapes from './Shapes';
import Games from './Games/Games';
import Charts from './Charts';
import { useSelector, useDispatch } from 'react-redux'
import { FaPlay, FaStop } from "react-icons/fa";
import TimeLine1 from './TimeLine1';
import { animation } from './animation.js'
import PathModifier from './PathModifier';
import OnelinerAndBreakingNews from './OnelinerAndBreakingNews';
import Effects from './Effects';
import JsonReader from './JsonReader';
import UdpClock from './UdpClock';

import ColorGradient2 from './ColorGradient2'
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import Threejs from './Threejs';

const buildDate = '271122_1'

const App = () => {
  const canvas = useSelector(state => state.canvasReducer.canvas);
  const zoom = useSelector(state => state.canvaszoomReducer.zoom);

  const jsfilename = useSelector(state => state.jsfilenameReducer.jsfilename);
  const cssfilename = useSelector(state => state.cssfilenameReducer.cssfilename);

  const canvasList = useSelector(state => state.canvasListReducer.canvasList);
  const currentPage = useSelector(state => state.currentPageReducer.currentPage);

  const [mediaPath, setmediaPath] = useState();
  const refPreviewContainer = useRef();
  const [chNumber, setChNumber] = useState(1);
  const [currentTab, setCurrentTab] = useState('Drawing');
  const [animationMethod, setAnimationMethod] = useState('easenone');
  const [inAnimationMethod, setInAnimationMethod] = useState('slide-in-bck-center');
  const currentscreenSize = useSelector(state => state.currentscreenSizeReducer.currentscreenSize);
  const [solidcaption1, setSolidcaption1] = useState('');
  const [tabindex, settabindex] = useState(0)
  const [tabindex2, settabindex2] = useState(0)

  const kf = useSelector(state => state.kfReducer.kf);
  const xpositions = useSelector(state => state.xpositionsReducer.xpositions);

  const continuous1 = useSelector(state => state.speechRecognitionReducer.continuous1);
  const currentLanguage = useSelector(state => state.speechRecognitionReducer.currentLanguage);
  const { listening } = useSpeechRecognition();


  const languages = [
    "en-US",
    "hi-IN",
    "te-IN",
    "ta-IN",
    "mr-IN",
    "gu-IN",
    "	kn-IN",
    "ml-IN",
    "pa-Guru-IN",
    "ur-IN",
    "ar-SA",
    "bn-BD",
    "bn-IN",
    "cs-CZ",
    "da-DK",
    "de-AT",
    "de-CH",
    "de-DE",
    "el-GR",
    "en-AU",
    "en-CA",
    "en-GB",
    "en-IE",
    "en-IN",
    "en-NZ",
    "en-US",
    "en-ZA",
    "es-AR",
    "es-CL",
    "es-CO",
    "es-ES",
    "es-MX",
    "es-US",
    "fi-FI",
    "fr-BE",
    "fr-CA",
    "fr-CH",
    "fr-FR",
    "he-IL",
    "hi-IN",
    "hu-HU",
    "id-ID",
    "it-CH",
    "it-IT",
    "jp-JP",
    "ko-KR",
    "nl-BE",
    "nl-NL",
    "no-NO",
    "pl-PL",
    "pt-BR",
    "pt-PT",
    "ro-RO",
    "ru-RU",
    "sk-SK",
    "sv-SE",
    "ta-IN",
    "ta-LK",
    "th-TH",
    "tr-TR",
    "ur_PK",
    "zh-CN",
    "zh-HK",
    "zh-TW",
    "bh-IN"
  ];

  const moveElement = (sourceIndex, destinationIndex) => {
    const updatedkf = [...kf];
    updatedkf.splice(destinationIndex, 0, updatedkf.splice(sourceIndex, 1)[0]);
    dispatch({ type: 'CHANGE_KF', payload: updatedkf });

    const updatedxpositions = [...xpositions];
    updatedxpositions.splice(destinationIndex, 0, updatedxpositions.splice(sourceIndex, 1)[0]);
    dispatch({ type: 'CHANGE_XPOSITIONS', payload: updatedxpositions });
  }

  const sendToBack = canvas => {
    canvas.getActiveObjects().forEach(element => {
      const sourceIndex = canvas.getObjects().indexOf(element);
      const destinationIndex = 0;
      moveElement(sourceIndex, destinationIndex);
      canvas.sendToBack(element);
    });
    canvas.discardActiveObject();
    canvas.requestRenderAll();
  }

  const bringToFront = canvas => {
    canvas.getActiveObjects().forEach(element => {
      const sourceIndex = canvas.getObjects().indexOf(element);
      const destinationIndex = canvas.getObjects().length - 1;
      moveElement(sourceIndex, destinationIndex);
      canvas.bringToFront(element);
    });
    canvas.discardActiveObject();
    canvas.requestRenderAll();
  }
  const deleteItemfromtimeline = () => {
    const updatedkf = [...kf]
    const updatedxpositions = [...xpositions];
    window.editor.canvas?.getActiveObjects().forEach((element) => {
      const index1 = window.editor.canvas?.getObjects().indexOf(element);
      window.editor.canvas?.remove(element);
      updatedkf.splice(index1, 1);
      updatedxpositions.splice(index1, 1);
    });
    dispatch({ type: 'CHANGE_KF', payload: updatedkf });
    dispatch({ type: 'CHANGE_XPOSITIONS', payload: updatedxpositions });
    window.editor.canvas?.discardActiveObject();
    window.editor.canvas?.requestRenderAll();
  }
  window.deleteItemfromtimeline = deleteItemfromtimeline;


  const startGraphics = (canvas, layerNumber) => {
    var inAnimation;

    if (window.inAnimationMethod === 'mix') {
      inAnimation = `@keyframes example {from {opacity:0} to {opacity:1}} div {animation-name: example;  animation-duration: .5s; }`
    }

    else if (((animation.map(val => val.name)).findIndex(val => val === window.inAnimationMethod)) !== -1) {
      inAnimation = animation[((animation.map(val => val.name)).findIndex(val => val === window.inAnimationMethod))].value;
    }

    else if (window.inAnimationMethod === 'lefttoright') {
      inAnimation = ``
      canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
      endpoint(`mixer ${window.chNumber}-${layerNumber} fill 0 0 0 1 6 ${window.animationMethod}`)

      setTimeout(() => {
        endpoint(`play ${window.chNumber}-${layerNumber} [HTML] xyz.html`);
      }, 250);

      setTimeout(() => {
        endpoint(`call ${window.chNumber}-${layerNumber} "
        var bb = document.createElement('div');
        bb.style.perspective='1920px';
        bb.style.transformStyle='preserve-3d';
        document.body.appendChild(bb);
        var aa = document.createElement('div');
        aa.style.position='absolute';
        aa.innerHTML='${(canvas.toSVG(['id', 'class', 'selectable'])).replaceAll('"', '\\"')}';
        bb.appendChild(aa);
        document.body.style.margin='0';
        document.body.style.padding='0';
        aa.style.zoom=(${currentscreenSize * 100}/1920)+'%';
        document.body.style.overflow='hidden';
        var style = document.createElement('style');
        style.textContent = '${inAnimation}';
        document.head.appendChild(style);
        "`)
      }, 300);

      setTimeout(() => {
        endpoint(`mixer ${window.chNumber}-${layerNumber} fill 0 0 1 1 10 ${window.animationMethod}`)
      }, 800);
      setTimeout(() => {
        updateGraphics(canvas, layerNumber);
      }, 1100);
      return
    }

    canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
    endpoint(`play ${window.chNumber}-${layerNumber} [HTML] xyz.html`);
    setTimeout(() => {
      endpoint(`call ${window.chNumber}-${layerNumber} "
        var bb = document.createElement('div');
        bb.style.perspective='1920px';
        bb.style.transformStyle='preserve-3d';
        document.body.appendChild(bb);
        var aa = document.createElement('div');
        aa.style.position='absolute';
        aa.innerHTML='${(canvas.toSVG(['id', 'class', 'selectable'])).replaceAll('"', '\\"')}';
        bb.appendChild(aa);
        document.body.style.margin='0';
        document.body.style.padding='0';
        aa.style.zoom=(${currentscreenSize * 100}/1920)+'%';
        document.body.style.overflow='hidden';
        var style = document.createElement('style');
        style.textContent = '${inAnimation}';
        document.head.appendChild(style);
        "`)
    }, 100);

    setTimeout(() => {
      updateGraphics(canvas, layerNumber);
    }, 1200);
  }


  useEffect(() => {
    setSolidcaption1(localStorage.getItem('RCC_solidCaption1'));
    return () => {
      // cleanup
    }
  }, [])


  useEffect(() => {
    window.inAnimationMethod = inAnimationMethod;
    window.animationMethod = animationMethod;
    return () => {
      // cleanup
    }
  }, [inAnimationMethod, animationMethod])

  useEffect(() => {
    window.chNumber = chNumber;
    document.title = `${buildDate}_CH #${chNumber}`;
    return () => {
      // cleanup
    }
  }, [chNumber])

  const connectHandler = () => {
    if (connectbutton.current.style.backgroundColor === "green") {
      axios.post(address1 + '/disconnect').then((aa) => {
      }).catch((aa) => { console.log('Error', aa) });
    }
    else {
      const data = { host: 'localhost', port: 5250 }
      axios.post(address1 + '/connect', data).then((aa) => {
      }).catch((aa) => { console.log('Error', aa) });
    }
  }
  const dispatch = useDispatch();
  const connectbutton = useRef();

  const refreshMedia = () => {
    axios.post(address1 + '/getmedia').then((aa) => {
      dispatch({ type: 'CHANGE_MEDIA', payload: aa.data })
    }).catch((aa) => { console.log('Error', aa) });
  }

  useEffect(() => {
    if (window.location.origin !== 'https://vimlesh1975.github.io') {
      const socket = socketIOClient(':9000');
      socket.on("Fromccgsocket", data => {
        setmediaPath(data);
      });
      socket.on("connectionStatus", data => {
        if (data === 'true') {
          connectbutton.current.style.backgroundColor = "green";
        }
        else {
          connectbutton.current.style.backgroundColor = "red";
        }
      });
      return () => {
        socket.disconnect();
      }
    }
  }, []);

  useEffect(() => {
    if (window.location.origin !== 'https://vimlesh1975.github.io') {
      refreshMedia();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaPath])

  const onTabChange = (index, prevIndex) => {
    // changepannelEnable(index);
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
        setCurrentTab('Drawing');
        setTimeout(() => {
          window.dispatchEvent(new Event('resize'))
        }, 100);
        break;
      case 1:
      case 2:
        setCurrentTab('Video')
        break;
      default:
      //nothing
    }
  }
  const onTabChange2 = (index, prevIndex) => {
    settabindex2(index);
    if (index === 0) {
      dispatch({ type: 'CHANGE_PANNEL_ENABLED', payload: true })
    }
    else {
      dispatch({ type: 'CHANGE_PANNEL_ENABLED', payload: false })
    }
  }

  const changeAnimationMethod = e => {
    setAnimationMethod(e.target.value);
  }
  const changeInAnimationMethod = e => {
    setInAnimationMethod(e.target.value);
  }

  const changeChannelNumber = e => {
    setChNumber(e.target.value);
  }

  const updatePage = () => {
    const updatedcanvasList = canvasList.map((val, i) => {
      return (i === currentPage) ? { ...val, 'pageValue': canvas.toJSON(['id', 'selectable']), jsfilename: jsfilename, cssfilename: cssfilename } : val;
    });
    dispatch({ type: 'CHANGE_CANVAS_LIST', payload: [...updatedcanvasList] })
  }
  const changeTab = (i) => {
    settabindex(i)
    // console.log(i)
  }
  const changeTab2 = (i) => {
    settabindex2(i)
    // console.log(i)
  }
  window.changeTab = changeTab;
  window.changeTab2 = changeTab2;
  return (<div style={{ minWidth: 1920, minHeight: 1080, top: 0 }}>

    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <div>
        <button title='Github Client will not connect to casparcg' className='connectbutton' style={{}} ref={connectbutton} onClick={connectHandler}>Connect</button>  <button className='StopChannelButton' style={{}} onClick={() => {
          endpoint(`clear ${chNumber}`);
          endpoint(`mixer ${chNumber} clear`);
        }}>Stop Channel</button>
      </div>

      <div >
        <b>Zoom:</b> {zoom.toFixed(1)}   <b>Animation Method: IN </b><select onChange={e => changeInAnimationMethod(e)} value={inAnimationMethod}>
          {inAnimationMethods.map((val) => { return <option key={uuidv4()} value={val}>{val}</option> })}
        </select>
        <b> Out: </b><select onChange={e => changeAnimationMethod(e)} value={animationMethod}>
          {animationMethods.map((val) => { return <option key={uuidv4()} value={val}>{val}</option> })}
        </select>
      </div>
      <div  >
        <b>Channel:</b>
        <select onChange={e => changeChannelNumber(e)} value={chNumber}>
          {chNumbers.map((val) => { return <option key={uuidv4()} value={val}>{val}</option> })}
        </select>
        <button onClick={() => endpoint(`swap 1 2`)}>Swap CH 1 and 2</button>
        <button onClick={updatePage}>Update Page</button>
      </div>
      <div style={{ minWidth: 500 }} >
        <b> Solid Cap 1: </b>
        <button onClick={() => {
          startGraphics(canvas, templateLayers.solidCaption1);
          setSolidcaption1(canvasList[currentPage]?.pageName);
          localStorage.setItem('RCC_solidCaption1', canvasList[currentPage]?.pageName);
        }
        }><FaPlay /></button>  <button onClick={() => updateGraphics(canvas, templateLayers.solidCaption1)}>Update</button>
        <button onClick={() => {
          stopGraphics(templateLayers.solidCaption1);
          setSolidcaption1('');
          localStorage.setItem('RCC_solidCaption1', '');
        }} ><FaStop /></button>
        <span> {solidcaption1} </span>  <b>Languages:</b> <input style={{ width: 70 }} value={currentLanguage} onChange={e => {
          dispatch({ type: 'CHANGE_CURRENTLANGUAGE', payload: e.target.value });
          if (continuous1 && listening) {
            SpeechRecognition.startListening({
              continuous: continuous1,
              language: e.target.value
            });
          }
        }

        } />
        {/* </div>
      <div> */}
        <select style={{ width: 70 }} value={currentLanguage}
          onChange={(e) => {
            dispatch({ type: 'CHANGE_CURRENTLANGUAGE', payload: e.target.value });

            if (continuous1 && listening) {
              SpeechRecognition.startListening({
                continuous: continuous1,
                language: e.target.value
              });
            }
          }

          }
        >
          {(languages.filter((value, index, self) => { return self.indexOf(value) === index })).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div  >
        Size: <select value={currentscreenSize} onChange={e => {
          localStorage.setItem('RCC_currentscreenSize', e.target.value)
          dispatch({ type: 'CHANGE_CURRENTSCREENSIZE', payload: e.target.value })
        }
        }>  {screenSizes.map((val) => { return <option key={uuidv4()} value={val}>{val}</option> })} </select>
      </div>
    </div>

    <div style={{ display: 'flex', flexDirection: 'row', border: '1px dashed blue' }}>
      <div>
        <div style={{ display: 'flex', flexDirection: 'row', border: '1px dashed blue' }}>
          <div>
            <div ref={refPreviewContainer} id='preview-container' className='preview-container'>
              <div style={{ display: (currentTab === 'Drawing') ? 'none' : 'block' }}>
                <Video video={''} layerNumber={videoLayers[4]} />
                <Video video={''} layerNumber={videoLayers[3]} />
                <Video video={''} layerNumber={videoLayers[2]} />
                <Video video={''} layerNumber={videoLayers[1]} />
                <Video video={''} layerNumber={videoLayers[0]} />
              </div>
              <div style={{ display: (currentTab === 'Drawing') ? 'block' : 'none' }}>
                <span style={{ position: 'absolute', left: 506, top: 250, fontSize: 40 }}>.</span>
                {/* <Provider store={store}> */}
                <Drawing moveElement={moveElement} sendToBack={sendToBack} bringToFront={bringToFront} />
                {/* </Provider> */}
              </div>
            </div>
            <Tabs selectedIndex={tabindex2} selectedTabClassName='selectedTab2' forceRenderTabPanel={true} onSelect={(index, prevIndex) => onTabChange2(index, prevIndex)} >
              <TabList>
                <Tab>Timeline</Tab>
                <Tab>Casparcg Window</Tab>
              </TabList>
              <TabPanel >
                <TimeLine1 deleteItemfromtimeline={deleteItemfromtimeline} />
              </TabPanel>
              <TabPanel >
                <div style={{ display: 'flex' }}>
                  <div style={{ backgroundColor: 'grey', border: '1px solid yellow', maxWidth: 690, minWidth: 690, height: 400 }}>
                    <h4>Put as below in casparcg.config file and drag screen consumer here</h4>
                    <h5>
                      &lt;screen&gt;
                      &lt;always-on-top&gt;true&lt;/always-on-top&gt;
                      &lt;x&gt;0&lt;/x&gt;
                      &lt;y&gt;680&lt;/y&gt;
                      &lt;width&gt;680&lt;/width&gt;
                      &lt;height&gt;325&lt;/height&gt;
                      &lt;/screen&gt;
                    </h5>

                  </div>
                  <div >
                    <Automation />
                  </div>
                </div>

              </TabPanel>
            </Tabs>
          </div>
        </div>
      </div>
      <div >
        <Tabs selectedIndex={tabindex} selectedTabClassName='selectedTab' forceRenderTabPanel={true} onSelect={(index, prevIndex) => onTabChange(index, prevIndex)} >
          <TabList>
            <Tab>Graphics</Tab>
            <Tab>VDO</Tab>
            <Tab>VDO Playlist</Tab>
            <Tab>Layers</Tab>
            <Tab >Gradient</Tab>
            <Tab >Oneliner/BreakingNews</Tab>
            <Tab >Twoliner</Tab>
            <Tab >Scroll</Tab>
            <Tab >Shapes</Tab>
            <Tab >Games</Tab>
            <Tab >Charts</Tab>
            {/* <Tab >TimeLine</Tab> */}
            <Tab >Path Modifier</Tab>
            <Tab >Effects</Tab>
            <Tab >JsonReader</Tab>
            <Tab >Udp Clock</Tab>
            <Tab >Threejs</Tab>
            <Tab>Help</Tab>
          </TabList>
          <TabPanel >
            <div style={{ border: '1px dashed blue', width: 900 }}>
              <DrawingController moveElement={moveElement} sendToBack={sendToBack} bringToFront={bringToFront} deleteItemfromtimeline={deleteItemfromtimeline} />
            </div>
          </TabPanel>
          <TabPanel >
            <div style={{ display: 'flex', justifyContent: 'space-around', width: 900, marginBottom: 50 }}>
              <VideoController layerNumber={videoLayers[0]} />
              <VideoController layerNumber={videoLayers[1]} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', width: 900 }}>
              <VideoController layerNumber={videoLayers[2]} />
              <VideoController layerNumber={videoLayers[3]} />
            </div>
          </TabPanel>
          <TabPanel >
            <VideoPlaylist />
          </TabPanel>
          <TabPanel >
            <Layers moveElement={moveElement} deleteItemfromtimeline={deleteItemfromtimeline} />
          </TabPanel>
          <TabPanel >
            <ColorGradient2 />
          </TabPanel>
          <TabPanel >
            <OnelinerAndBreakingNews />
          </TabPanel>
          <TabPanel >
            <Twoliner />
          </TabPanel>
          <TabPanel >
            <Scroll />
          </TabPanel>
          <TabPanel >
            <Shapes />
          </TabPanel>
          <TabPanel >
            <Games />
          </TabPanel>
          <TabPanel >
            <Charts />
          </TabPanel>

          <TabPanel >
            <PathModifier />
          </TabPanel>
          <TabPanel >
            <Effects />
          </TabPanel>
          <TabPanel >
            <JsonReader />
          </TabPanel>
          <TabPanel >
            <UdpClock />
          </TabPanel>
          <TabPanel >
            <Threejs />
          </TabPanel>

          <TabPanel >
            <Help />
          </TabPanel>
        </Tabs >
      </div >

    </div>

  </div >);
}

export default App