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
import { Provider } from 'react-redux'
import store from './store'
import { v4 as uuidv4 } from 'uuid';
import ColorGradient from './ColorGradient';
import VideoController from './VideoController';
import Help from './Help';
import { screenSizes, inAnimationMethods, animationMethods, chNumbers, endpoint, address1, updateGraphics, stopGraphics, templateLayers } from './common'
import Layers from './Layers'
import VideoPlaylist from './VideoPlaylist'
import Twoliner from './Twoliner'
import BreakingNews from './BreakingNews'
import Automation from './Automation';
import { videoLayers } from './common'
import Shapes from './Shapes';
import Games from './Games/Games';
import Charts from './Charts';
import { useSelector, useDispatch } from 'react-redux'
import { FaPlay, FaStop } from "react-icons/fa";
// import TimeLine1 from './TimeLine1';
import { animation } from './animation.js'
import PathModifier from './PathModifier';

const buildDate = '090322_1'

const App = () => {
  const canvas = useSelector(state => state.canvasReducer.canvas);
  const canvasList = useSelector(state => state.canvasListReducer.canvasList);
  const currentPage = useSelector(state => state.currentPageReducer.currentPage);

  const [mediaPath, setmediaPath] = useState();
  const refPreviewContainer = useRef();
  const [chNumber, setChNumber] = useState(1);
  const [currentTab, setCurrentTab] = useState('Drawing');
  const [animationMethod, setAnimationMethod] = useState('easeinsine');
  const [inAnimationMethod, setInAnimationMethod] = useState('lefttoright');
  const currentscreenSize = useSelector(state => state.currentscreenSizeReducer.currentscreenSize);
  const [solidcaption1, setSolidcaption1] = useState('');

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
        var aa = document.createElement('div');
        aa.style.position='absolute';
        aa.innerHTML='${(canvas.toSVG()).replaceAll('"', '\\"')}';
        document.body.appendChild(aa);
        document.body.style.margin='0';
        document.body.style.padding='0';
        aa.style.zoom=(${currentscreenSize * 100}/1024)+'%';
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
    endpoint(`call ${window.chNumber}-${layerNumber} "
        var bb = document.createElement('div');
        bb.style.perspective='1920px';
        bb.style.transformStyle='preserve-3d';
        document.body.appendChild(bb);
        var aa = document.createElement('div');
        aa.style.position='absolute';
        aa.innerHTML='${(canvas.toSVG()).replaceAll('"', '\\"')}';
        bb.appendChild(aa);
        document.body.style.margin='0';
        document.body.style.padding='0';
        aa.style.zoom=(${currentscreenSize * 100}/1024)+'%';
        document.body.style.overflow='hidden';
        var style = document.createElement('style');
        style.textContent = '${inAnimation}';
        document.head.appendChild(style);
        "`)
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
        // console.log('success', aa)
      }).catch((aa) => { console.log('Error', aa) });
    }
    else {
      const data = { host: 'localhost', port: 5250 }
      axios.post(address1 + '/connect', data).then((aa) => {
        // console.log('success', aa)
      }).catch((aa) => { console.log('Error', aa) });
    }

  }
  const dispatch = useDispatch()
  const connectbutton = useRef();

  const refreshMedia = () => {
    axios.post(address1 + '/getmedia').then((aa) => {
      dispatch({ type: 'CHANGE_MEDIA', payload: aa.data })
    }).catch((aa) => { console.log('Error', aa) });
  }

  useEffect(() => {
    const socket = socketIOClient(':8080');

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
  }, []);

  useEffect(() => {
    refreshMedia()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaPath])



  const onTabChange = (index, prevIndex) => {
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

  const changeAnimationMethod = e => {
    setAnimationMethod(e.target.value);
  }
  const changeInAnimationMethod = e => {
    setInAnimationMethod(e.target.value);
  }

  const changeChannelNumber = e => {
    setChNumber(e.target.value);
  }

  return (<React.Fragment>

    <div className='menu_bar' style={{ display: 'flex', justifyContent: 'space-around', alignItems: '' }}>
      <div>
        <button className='connectbutton' style={{}} ref={connectbutton} onClick={connectHandler}>Connect</button> <button className='StopChannelButton' style={{}} onClick={() => {
          endpoint(`clear ${chNumber}`);
          endpoint(`mixer ${chNumber} clear`);

        }}>Stop Channel</button>
      </div>
      <div  >
        <b>Animation Method: IN </b><select onChange={e => changeInAnimationMethod(e)} value={inAnimationMethod}>
          {inAnimationMethods.map((val) => { return <option key={uuidv4()} value={val}>{val}</option> })}
        </select>
        <b> Out: </b><select onChange={e => changeAnimationMethod(e)} value={animationMethod}>
          {animationMethods.map((val) => { return <option key={uuidv4()} value={val}>{val}</option> })}
        </select>
      </div>
      <div  >
        <b>Channel Number:</b>
        <select onChange={e => changeChannelNumber(e)} value={chNumber}>
          {chNumbers.map((val) => { return <option key={uuidv4()} value={val}>{val}</option> })}
        </select>
        <button onClick={() => endpoint(`swap 1 2`)}>Swap CH 1 and 2</button>
      </div>
      <div style={{ minWidth: 500 }} >
        <b> Solid Caption 1: </b>
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
        <span> {solidcaption1} </span>
      </div>

      <div  >
        <b> Screen Setup: </b>
        Casparcg Screen Sizes  <select value={currentscreenSize} onChange={e => {
          localStorage.setItem('RCC_currentscreenSize', e.target.value)
          dispatch({ type: 'CHANGE_CURRENTSCREENSIZE', payload: e.target.value })
        }
        }>  {screenSizes.map((val) => { return <option key={uuidv4()} value={val}>{val}</option> })} </select>
      </div>
    </div>

    <div style={{
      display: 'flex',
      flexDirection: 'row',
      border: '1px dashed blue',
      height: '100vh',
      flexWrap: 'nowrap'
    }}>
      <div  >
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          border: '1px dashed blue',
          height: '100vh',
          flexWrap: 'nowrap'
        }}>
          <div>
            <div ref={refPreviewContainer} id='preview-container' className='preview-container'>
              <div style={{ display: (currentTab === 'Drawing') ? 'none' : 'block' }}>
                <Video video={''} layerNumber={videoLayers[0]} />
                <Video video={''} layerNumber={videoLayers[1]} />
                <Video video={''} layerNumber={videoLayers[2]} />
                <Video video={''} layerNumber={videoLayers[3]} />
                <Video video={''} layerNumber={videoLayers[4]} />
              </div>
              <div style={{ display: (currentTab === 'Drawing') ? 'block' : 'none' }}>
                <Provider store={store}>
                  <Drawing />
                </Provider>
              </div>
            </div>
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

                {/* <div id='d3' style={{ display: 'none' }}> </div> */}
                {/* <div id='d3' > </div> */}

              </div>
              <div >
                <Automation />
              </div>
            </div>
          </div>

        </div>
      </div>
      <div >
        <Tabs selectedTabClassName='selectedTab' forceRenderTabPanel={true} onSelect={(index, prevIndex) => onTabChange(index, prevIndex)}>
          <TabList>
            <Tab>Graphics</Tab>
            <Tab>VDO</Tab>
            <Tab>VDO Playlist</Tab>
            <Tab>Layers</Tab>
            <Tab >Gradient</Tab>
            <Tab >Twoliner</Tab>
            <Tab >BreakingNews</Tab>
            <Tab >Shapes</Tab>
            <Tab >Games</Tab>
            <Tab >Charts</Tab>
            <Tab >TimeLine</Tab>
            <Tab >Path Modifier</Tab>

            <Tab>Help</Tab>
          </TabList>
          <TabPanel>
            <div style={{ border: '1px dashed blue', width: 900 }}>
              <DrawingController />
            </div>
          </TabPanel>
          <TabPanel>
            <div style={{ display: 'flex', justifyContent: 'space-around', width: 900, marginBottom: 50 }}>
              <VideoController layerNumber={videoLayers[0]} />
              <VideoController layerNumber={videoLayers[1]} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', width: 900 }}>
              <VideoController layerNumber={videoLayers[2]} />
              <VideoController layerNumber={videoLayers[3]} />
            </div>
          </TabPanel>
          <TabPanel>
            <VideoPlaylist />
          </TabPanel>
          <TabPanel>
            <Layers />
          </TabPanel>
          <TabPanel >
            <ColorGradient />
          </TabPanel>
          <TabPanel>
            <Twoliner />
          </TabPanel>
          <TabPanel>
            <BreakingNews />
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
            {/* <TimeLine1 /> */}
          </TabPanel>
          <TabPanel>
            <PathModifier />
          </TabPanel>
          <TabPanel>
            <Help />
          </TabPanel>
        </Tabs >
      </div >

    </div>

  </React.Fragment >);
}

export default App