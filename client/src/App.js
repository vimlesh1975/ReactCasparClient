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
import DrawingController, { addImage } from './DrawingController';
import { Provider } from 'react-redux'
import store from './store'
import { v4 as uuidv4 } from 'uuid';
export default function App(props) {

  const [mediaPath, setmediaPath] = useState();
  // eslint-disable-next-line
  const [remainingTime, setRemainingTime] = useState()
  const [filename, setfilename] = useState('amb');
  const [imageName, setImageName] = useState(`http://${window.location.host}${process.env.PUBLIC_URL}/img/pine-wood-500x500.jpg`)
  const refPreviewContainer = useRef();
  const [media, setMedia] = useState([]);
  const chNumbers = [1, 2, 3, 4, 5, 6];

  const [chNumber, setChNumber] = useState(1);
  const [currentTab, setCurrentTab] = useState('Drawing');

  const animationMethods = [
    'linear',
    'easenone',
    'easeinquad',
    'easeoutquad',
    'easeinoutquad',
    'easeoutinquad',
    'easeincubic',
    'easeoutcubic',
    'easeinoutcubic',
    'easeoutincubic',
    'easeinquart',
    'easeoutquart',
    'easeinoutquart',
    'easeoutinquart',
    'easeinquint',
    'easeoutquint',
    'easeinoutquint',
    'easeoutinquint',
    'easeinsine',
    'easeoutsine',
    'easeinoutsine',
    'easeoutinsine',
    'easeinexpo',
    'easeoutexpo',
    'easeinoutexpo',
    'easeoutinexpo',
    'easeincirc',
    'easeoutcirc',
    'easeinoutcirc',
    'easeoutincirc',
    "easeinelastic",
    "easeoutelastic",
    "easeinoutelastic",
    "easeoutinelastic",
    "easeinback",
    "easeoutback",
    "easeinoutback",
    "easeoutintback",
    "easeoutbounce",
    "easeinbounce",
    "easeinoutbounce",
    "easeoutinbounce",
  ]
  const channelModes = ['PAL', '1080i5000', '720p2500'];
  const [channelMode, setChannelMode] = useState('PAL')
  const [animationMethod, setAnimationMethod] = useState('easeinsine');

  useEffect(() => {
    window.imageName = imageName;
    return () => {
      // cleanup
    }
  }, [imageName])

  useEffect(() => {
    window.animationMethod = animationMethod;
    return () => {
      // cleanup
    }
  }, [animationMethod])

  useEffect(() => {
    window.chNumber = chNumber;
    document.title = `CH #${chNumber} React Caspar Client`;
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

  const connectbutton = useRef();

  const refreshMedia = () => {
    axios.post(address1 + '/getmedia').then((aa) => {
      setMedia(aa.data)
    }).catch((aa) => { console.log('Error', aa) });
  }

  useEffect(() => {
    const socket = socketIOClient(':8080');
    socket.on("FromAPI", data => {
      setRemainingTime(data);
    });
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
    return () => {
      // cleanup
    }
  }, [mediaPath])

  const onTabChange = (index, prevIndex) => {
    switch (index) {
      case 0:
        setCurrentTab('Drawing')
        break;
      case 1:
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
  const changeChannelMode = e => {
    setChannelMode(e.target.value);
    endpoint(`set ${chNumber} mode ${e.target.value}`)
  }

  return (<React.Fragment>

    <div className='menu_bar'>
      <button className='connectbutton' style={{}} ref={connectbutton} onClick={connectHandler}>Connect</button> <button className='StopChannelButton' style={{}} onClick={() => endpoint(`clear ${chNumber}`)}>Stop Channel</button>
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
      <div style={{ width: '1035px' }} >
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          border: '1px dashed blue',
          height: '100vh',
          flexWrap: 'nowrap'
        }}>

          <div>
            <div ref={refPreviewContainer} id='preview-container' className='preview-container'>

              <div style={{ display: (currentTab === 'Drawing') ? 'none' : 'block' }}> <Video video={address1 + '/media/amb.mp4'} /></div><div style={{ display: (currentTab === 'Drawing') ? 'block' : 'none' }}><Provider store={store}><Drawing /></Provider></div>
            </div>
            <div style={{ display: 'flex' }}>
              <div style={{ backgroundColor: 'grey', border: '2px solid yellow', width: 700, height: 400 }}>
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
              <div>
                <b>Select image from casparcg media folder: </b><br />
                <button onClick={refreshMedia}>Refresh Media</button>{media.length} files<br />
                <div style={{ display: 'flex', flexDirection: 'column' }}>

                  <div style={{ maxHeight: '160px', maxWidth: '315px', overflow: 'scroll', border: '4px solid red' }}>

                    <table border='1' >
                      <tbody>
                        {media.map((val, i) => {
                          return <tr key={i}><td onClick={(e) => {
                            setImageName((address1 + `/media/` + e.target.innerText));
                          }}>{val}</td></tr>
                        })}
                      </tbody>
                    </table>

                  </div>

                  <div style={{ border: '4px solid red', display: 'flex', alignContent: 'center', alignItems: 'center' }}>
                    <div>
                      <img src={imageName} alt='' width="200" height="130" style={{ border: '3px solid #555' }}></img>
                    </div>
                    <div>
                      Selected Image <br />
                      <button onClick={() => addImage(window.editor.canvas)}>Add This Image</button>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
      <div style={{ width: '38vw', minWidth: '400px' }}>
        <Tabs forceRenderTabPanel={true} onSelect={(index, prevIndex) => onTabChange(index, prevIndex)} >
          <TabList>
            <Tab>Drawing</Tab>
            <Tab>Video</Tab>
            <Tab>Test</Tab>
            <Tab>Help</Tab>
          </TabList>
          <TabPanel>
            <div style={{ border: '4px solid yellow', width: 900 }}>
              <DrawingController />
            </div>
          </TabPanel>
          <TabPanel>
            <h2>Video</h2>
            <div> <input onChange={(e) => setfilename(e.target.value)} value={filename}></input>
              <button className='palyButton' onClick={() => endpoint(`load ${chNumber}-1 "${filename}"`)}>Cue</button>
              <button className='palyButton' onClick={() => endpoint(`play ${chNumber}-1 "${filename}" loop`)}>Play</button>
              <button className='stopButton' onClick={() => endpoint(`pause ${chNumber}-1`)}>Pause</button>
              <button className='stopButton' onClick={() => endpoint(`resume ${chNumber}-1`)}>Resume</button>
              <button className='stopButton' onClick={() => endpoint(`stop ${chNumber}-1`)}>Stop</button>
            </div>
            <button onClick={refreshMedia}>Refresh Media</button>{media.length} files<br />
            <div style={{ maxHeight: '300px', maxWidth: '400px', overflow: 'scroll' }}>
              <table border='1' >
                <tbody>
                  {media.map((val, i) => {
                    return <tr key={i}><td onClick={(e) => {
                      setfilename((e.target.innerText).split('.')[0]);
                      var video = document.getElementById('video');
                      var source = document.getElementsByTagName('source')[0];

                      if ((`${address1}/media/${e.target.innerText}`).match(/\.(jpeg|jpg|bmp|gif|png)$/) != null) {
                        video.setAttribute("poster", `${address1}/media/${e.target.innerText}`);
                      }
                      else {
                        video.setAttribute("poster", ``);
                        source.setAttribute("src", `${address1}/media/${e.target.innerText}`);
                        video.load();
                      }
                    }
                    }>{val}</td></tr>
                  })}
                </tbody>
              </table>
            </div>
          </TabPanel>
          <TabPanel>
            <h2>Test</h2>
            <b>Set Video Mode to This Channel:</b>
            <select onChange={e => changeChannelMode(e)} value={channelMode}>
              {channelModes.map((val) => { return <option key={uuidv4()} value={val}>{val}</option> })}
            </select>
          </TabPanel>
          <TabPanel>
            <h2>Help</h2>
            <ol>
              <li>It works only with server 2.3</li>
              <li> Put as below in casparcg.config file and drag screen consumer below Designer window
                &lt;screen&gt;
                &lt;always-on-top&gt;true&lt;/always-on-top&gt;
                &lt;x&gt;0&lt;/x&gt;
                &lt;y&gt;680&lt;/y&gt;
                &lt;width&gt;690&lt;/width&gt;
                &lt;height&gt;325&lt;/height&gt;

                &lt;/screen&gt;
              </li>

              <li>Select same mode and tab menu </li>
              <li>By defalut Drawing mode will open</li>
              <li>In drawing mode first we need to click initialise drawing button</li>
              <li>Select Casparcg Screen Sizes from drop down and click set</li>
              <li>Add some text or rectangle by clicking on buttons and then click Show to Casparcg</li>

              <li>There is right click menu also for drawing mode. </li>
              <li><a href='https://github.com/vimlesh1975/ReactCasparClient' target='_blank' rel="noreferrer">Github Page</a> </li>
              <li><a href='https://vimlesh1975.github.io/ReactCasparClient/' target='_blank' rel="noreferrer">Github Online Client</a> </li>

              <li><a href='https://casparcgforum.org/t/react-caspar-client' target='_blank' rel="noreferrer">Casparcg Forum Topic</a> </li>
              <li><a href='https://bit.ly/3jRrhDL' target='_blank' rel="noreferrer">Latest Build</a> </li>

              <li>test</li>
            </ol>
          </TabPanel>
        </Tabs >
      </div >

    </div>

  </React.Fragment >);
}