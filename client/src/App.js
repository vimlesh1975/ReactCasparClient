import { useState, useEffect, useRef } from 'react'
import socketIOClient from "socket.io-client";
import './App.css';

import Oneliner from './Oneliner';

import React from "react";
import ReactDOM from 'react-dom';

import Clock from './Clock'
import Scroll from './Scroll';
import Video from './Video';

import Drawing from './Drawing';
import { useDispatch } from 'react-redux'
import { endpoint, address1 } from './common'
import axios from 'axios'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import OnelinerTable from './OnelinerTable'

import DrawingController, { addImage } from './DrawingController';

import { Provider } from 'react-redux'
import store from './store'
import { v4 as uuidv4 } from 'uuid';

export default function App(props) {


  const refFontColor = useRef();
  const refStripColor = useRef();
  const dispatch1 = useDispatch()
  const changeStyle1 = () => {
    const newStyle = { color: refFontColor.current.value, backgroundColor: refStripColor.current.value }
    dispatch1({
      type: 'CHANGE_STYLE1',
      payload: newStyle
    });
    localStorage.setItem('ReactCasparClient', JSON.stringify(newStyle))
  }

  const [mediaPath, setmediaPath] = useState()
  // eslint-disable-next-line
  const [remainingTime, setRemainingTime] = useState()
  const [filename, setfilename] = useState('amb')
  const [imageName, setImageName] = useState(`http://${window.location.host}${process.env.PUBLIC_URL}/img/pine-wood-500x500.jpg`)
  const [f0, setF0] = useState('Vimlesh Kumar')
  const [scrollData, setScrollData] = useState('At w3schools.com you will learn how to make a website. They offer free tutorials in all web development technologies.')
  const refPreviewContainer = useRef()
  const [media, setMedia] = useState([])
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
  const [animationMethod, setAnimationMethod] = useState('easeinsine')
  const [currentModule, setCurrentModule] = useState('drawing');

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
  const getPaths = () => {
    axios.post(address1 + '/getPaths').then((aa) => {
      setmediaPath(aa.data)
    }).catch((aa) => { console.log('Error', aa) });
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

  const cahngeText = (e) => {
    if (e.keyCode === 27) {
      var aa = e.target.getAttribute('functionname');
      // eslint-disable-next-line
      eval(aa)(e.target.innerText);
    }
  }

  const onTabChange = (index, prevIndex) => {
    // console.log(index, prevIndex);
    switch (index) {
      case 0:
        setCurrentModule('drawing');
        ReactDOM.render(<Provider store={store}><Drawing /></Provider>, document.getElementById('preview-container'))
        break;
      case 1:
        ReactDOM.render(<Provider store={store}><Oneliner f0={f0} cahngeText={cahngeText} /></Provider>, document.getElementById('preview-container'))
        break;
      case 2:
        ReactDOM.render(<Scroll f0={scrollData} cahngeText={cahngeText} />, document.getElementById('preview-container'))
        break;
      case 3:
        ReactDOM.render(<Clock />, document.getElementById('preview-container'))
        break;
      case 4:
        ReactDOM.render(<Video video={address1 + '/media/amb.mp4'} />, document.getElementById('preview-container'))
        break;
      default:
      //nothing
    }
  }

  const changeAnimationMethod = e => {
    setAnimationMethod(e.target.value)
  }

  return (<React.Fragment>
    <div className='menu_bar'>
      <button className='connectbutton' style={{}} ref={connectbutton} onClick={connectHandler}>Connect</button> <button className='StopChannelButton' style={{}} onClick={() => endpoint(`clear 1`)}>Stop Channel</button>
      <button onClick={getPaths}>GetPaths</button>mediaPath={mediaPath}

      <label htmlFor="favcolor">Font Color:</label>
      <input onChange={changeStyle1} ref={refFontColor} type="color" defaultValue='#ffffff' />
      <label htmlFor="favcolor">Strip Color:</label>
      <input onChange={changeStyle1} ref={refStripColor} type="color" defaultValue='#50037c' />

      Animation Method:<select onChange={e => changeAnimationMethod(e)} value={animationMethod}>
        {animationMethods.map((val) => { return <option key={uuidv4()} value={val}>{val}</option> })}
      </select>
      {animationMethod}
      <span style={{ position: 'absolute', right: '10px' }}><b >Server 2.3 only</b></span>
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
              <Provider store={store}><Drawing /></Provider>
            </div>

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

          </div>

        </div>
      </div>
      <div style={{ width: '38vw', minWidth: '400px' }}>
        <Tabs forceRenderTabPanel={true} onSelect={(index, prevIndex) => onTabChange(index, prevIndex)} >
          <TabList>
            <Tab>Drawing</Tab>
            <Tab>Oneliner</Tab>

            <Tab>Scroll</Tab>
            <Tab>Clock</Tab>

            <Tab>Video</Tab>

            <Tab>Help</Tab>

          </TabList>
          <TabPanel>
            <h2>Drawing</h2>

            <div style={{ border: '4px solid yellow', width: 900 }}>
              <DrawingController />
            </div>
            <div style={{ display: 'flex' }}>
              <div style={{ maxHeight: '200px', overflow: 'scroll', border: '4px solid red' }}>
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
              <div style={{ border: '4px solid green' }}>
                <button onClick={refreshMedia}>Refresh Media</button>{media.length} files<br />
                Selected Image  <button onClick={() => addImage(window.editor.canvas)}>Add This Image</button><br />
                <img src={imageName} alt='' width="300" height="150"></img>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <h2>One Liner</h2>
            <OnelinerTable endpoint={endpoint} />
            <button className='stopButton' onClick={(e) => endpoint(`stop 1-101`)}>Stop</button>
          </TabPanel>
          <TabPanel>
            <h2>Scroll</h2>
            <label htmlFor="w3review">Scroll Content</label><br />
            <textarea id="w3review" defaultValue={scrollData} name="w3review" rows="10" cols="40" onChange={(e) => setScrollData(e.target.value)} />

            <br />
            <button onClick={() => {
              endpoint(`play 1-104 [html] "http://${window.location.host}${process.env.PUBLIC_URL}/scroll/${scrollData}"`)
            }}  >Start</button>

            <button className='stopButton' onClick={() => endpoint(`call 1-104 pauseScroll()`)}>Pause</button>
            <button className='stopButton' onClick={() => endpoint(`call 1-104 resumeScroll()`)}>Resume</button>
            <button className='stopButton' onClick={(e) => endpoint(`stop 1-104`)}>Stop</button>

            <button className='stopButton' onClick={(e) => endpoint(`call 1-104 fontcolor('${refFontColor.current.value}')`)}>Update Color</button>

            Speed<input onChange={(e) => endpoint(`call 1-104 setSpeed(${e.target.value})`)} type="number" id='scrollSpeed' min='-5' max='5' step='0.01' defaultValue='0.05' />
          </TabPanel>
          <TabPanel>
            <h2>Clock</h2>
            <button onClick={() => endpoint(`play 1-105 [html] "http://${window.location.host}${process.env.PUBLIC_URL}/clock"`)}> Clock</button>
            <button className='stopButton' onClick={(e) => endpoint(`stop 1-105`)}>Stop</button>
          </TabPanel>

          <TabPanel>
            <h2>Video</h2>
            <div> <input onChange={(e) => setfilename(e.target.value)} value={filename}></input>
              <button className='palyButton' onClick={() => endpoint(`play 1-1 "${filename}" loop`)}>Play Video</button>
              <button className='stopButton' onClick={() => endpoint(`pause 1-1`)}>Pause</button>
              <button className='stopButton' onClick={() => endpoint(`resume 1-1`)}>Resume</button>
              <button className='stopButton' onClick={() => endpoint(`stop 1-1`)}>Stop</button>
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

    {/* <input
      type='file'
      id='file'
      className='input-file'
      accept='.txt'
      onChange={e => handleFileChosen(e.target.files[0])}
    />
    <button onClick={saveFile}>Save file</button> <br /> */}


  </React.Fragment>);
}