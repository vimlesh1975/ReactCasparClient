
import { useState, useEffect, useRef } from 'react'
import socketIOClient from "socket.io-client";
import './App.css';
import React from "react";
import Video from './Video';
import Drawing from './Drawing';
import { endpoint, address1 } from './common'
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
import { useDispatch } from 'react-redux'
import { animationMethods, chNumbers } from './common'
import Layers from './Layers'
import Hockey from './Hockey'
import VideoPlaylist from './VideoPlaylist'
import Test from './Test';

const buildDate = '041121'

const App = () => {
  const [mediaPath, setmediaPath] = useState();
  const refPreviewContainer = useRef();
  const [chNumber, setChNumber] = useState(1);
  const [currentTab, setCurrentTab] = useState('Drawing');

  const [animationMethod, setAnimationMethod] = useState('easeinsine');

  useEffect(() => {
    window.animationMethod = animationMethod;
    return () => {
      // cleanup
    }
  }, [animationMethod])

  useEffect(() => {
    window.chNumber = chNumber;
    document.title = `CH #${chNumber} RCC_${buildDate}`;
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
        setCurrentTab('Drawing')
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
  const changeChannelNumber = e => {
    setChNumber(e.target.value);
  }

  return (<React.Fragment>

    <div className='menu_bar'>
      <button className='connectbutton' style={{}} ref={connectbutton} onClick={connectHandler}>Connect</button> <button className='StopChannelButton' style={{}} onClick={() => {
        endpoint(`clear ${chNumber}`);
        endpoint(`mixer ${chNumber} clear`);

      }}>Stop Channel</button>
      <b> Animation Method: </b><select onChange={e => changeAnimationMethod(e)} value={animationMethod}>
        {animationMethods.map((val) => { return <option key={uuidv4()} value={val}>{val}</option> })}
      </select>
      <b>Channel Number:</b>
      <select onChange={e => changeChannelNumber(e)} value={chNumber}>
        {chNumbers.map((val) => { return <option key={uuidv4()} value={val}>{val}</option> })}
      </select>
      <button onClick={() => endpoint(`swap 1 2`)}>Swap Channels</button>

      <span style={{ position: 'absolute', right: '10px' }}><b >All version of casparcg server</b></span>
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
                <Video video={address1 + '/media/amb.mp4'} layerNumber={1} />
                <Video video={address1 + '/media/CG1080i50.mp4'} layerNumber={2} />
                <Video video={address1 + '/media/go1080p25.mp4'} layerNumber={3} />
                <Video video={address1 + '/media/CG1080i50_A.mp4'} layerNumber={4} />
                <Video video={address1 + '/media/Anchor.png'} layerNumber={5} />


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
              </div>
              <div >
                {/* <Tabs forceRenderTabPanel={true}>
                  <TabList >
                    <Tab >ColorGradient</Tab>
                  </TabList>
                  <TabPanel >
                    <ColorGradient />
                  </TabPanel>
                </Tabs> */}


              </div>
            </div>
          </div>

        </div>
      </div>
      <div >
        <Tabs forceRenderTabPanel={true} onSelect={(index, prevIndex) => onTabChange(index, prevIndex)} >
          <TabList>
            <Tab>Graphics</Tab>
            <Tab>Video</Tab>
            <Tab>Video playlist</Tab>
            <Tab>Layers</Tab>
            <Tab>Hockey</Tab>
            <Tab >ColorGradient</Tab>
            <Tab>Help</Tab>
            <Tab>Test</Tab>

          </TabList>
          <TabPanel>
            <div style={{ border: '1px dashed blue', width: 900 }}>
              <DrawingController />
            </div>
          </TabPanel>
          <TabPanel>
            <div style={{ display: 'flex', justifyContent: 'space-around', width: 900, marginBottom: 50 }}>
              <VideoController layerNumber={1} />
              <VideoController layerNumber={2} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', width: 900 }}>
              <VideoController layerNumber={3} />
              <VideoController layerNumber={4} />
            </div>
          </TabPanel>
          <TabPanel>
            <VideoPlaylist />
          </TabPanel>
          <TabPanel>
            <Layers />
          </TabPanel>
          <TabPanel>
            <Hockey />
          </TabPanel>
          <TabPanel >
            <ColorGradient />
          </TabPanel>
          <TabPanel>
            <Help />
          </TabPanel>
          <TabPanel>
            <Test />
          </TabPanel>
        </Tabs >
      </div >

    </div>

  </React.Fragment >);
}

export default App