import { useState, useEffect, useRef } from 'react'
import socketIOClient from "socket.io-client";
import './App.css';
import Oneliner from './Oneliner';
import Twoliner from './Twoliner'
import TopLeft from './TopLeft';
import React from "react";
import Clock from './Clock'
import Scroll from './Scroll';
import Drawing from './Drawing';
import { useDispatch } from 'react-redux'
import { endpoint } from './common'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from 'axios'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import OnelinerTable from './OnelinerTable'

import DrawingController, { addImage } from './DrawingController';


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
  const [imageName, setImageName] = useState('img/pine-wood-500x500.jpg')

  useEffect(() => {
    window.imageName = imageName
    return () => {
      // cleanup
    }
  }, [imageName])

  useEffect(() => {
    var defaultModule = document.getElementById("defaultModule");
    defaultModule.click()
    return () => {
      // cleanup
    }
  }, [])

  const [f0, setF0] = useState('Vimlesh Kumar')
  const [f1, setF1] = useState('Engineering Assistant, DDK Mumbai')
  const [scrollData, setScrollData] = useState('At w3schools.com you will learn how to make a website. They offer free tutorials in all web development technologies.')
  const refPreviewContainer = useRef()
  const [media, setMedia] = useState([])

  const [currenMode, setCurrenMode] = useState('Home')

  const connectHandler = () => {
    if (connectbutton.current.style.backgroundColor === "green") {
      axios.post('http://localhost:8080/disconnect').then((aa) => {
        // console.log('success', aa)
      }).catch((aa) => { console.log('Error', aa) });
    }
    else {
      const data = { host: 'localhost', port: 5250 }
      axios.post('http://localhost:8080/connect', data).then((aa) => {
        // console.log('success', aa)
      }).catch((aa) => { console.log('Error', aa) });
    }

  }
  const getPaths = () => {
    axios.post('http://localhost:8080/getPaths').then((aa) => {
      setmediaPath(aa.data)
    }).catch((aa) => { console.log('Error', aa) });
  }
  const connectbutton = useRef();

  const refreshMedia = () => {
    axios.post('http://localhost:8080/getmedia').then((aa) => {
      setMedia(aa.data)
    }).catch((aa) => { console.log('Error', aa) });
  }

  useEffect(() => {


    return () => {
    }
  }, [])

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

  const cahngeText = (e) => {
    if (e.keyCode === 27) {
      var aa = e.target.getAttribute('functionname');
      // eslint-disable-next-line
      eval(aa)(e.target.innerText);
    }
  }

  // const addTwoliner = () => {
  //   ReactDOM.render(<><div style={{ position: 'relative', left: 180, top: 40 + 70 * twoliner }} ><Twoliner f0={f0} f1={f1} cahngeText={cahngeText} /></div></>, document.getElementById('twoliner' + twoliner));
  //   setTwoliner(val => val + 1)
  // }
  // const addTopleft = () => {
  //   alert('gggggg')
  //   ReactDOM.render(<><Clock /></>, document.getElementById('topleft' + topleft));
  //   setTopleft(val => val + 1)
  // }

  // let fileReader;
  // const handleFileRead = (e) => {
  //   const content = fileReader.result;
  //   var aa = content.split(String.fromCharCode(2))
  //   setfilename(aa[0])
  //   setF0(aa[1])
  //   setF1(aa[2])
  // };
  // const handleFileChosen = (file) => {
  //   fileReader = new FileReader();
  //   fileReader.onloadend = handleFileRead;
  //   fileReader.readAsText(file);
  // };
  // const saveFile = () => {
  //   const element = document.createElement("a");
  //   const file = new Blob([filename, String.fromCharCode(2), f0, String.fromCharCode(2), f1], { type: 'text/plain' });
  //   element.href = URL.createObjectURL(file);
  //   var ss = new Date().toLocaleTimeString('en-US', { year: "numeric", month: "numeric", day: "numeric", hour12: false, hour: "numeric", minute: "numeric", second: "numeric" });
  //   var retVal = prompt("Enter  file name to save : ", ss + "_FileName");
  //   element.download = retVal;
  //   document.body.appendChild(element); // Required for this to work in FireFox
  //   element.click();
  // }



  return (<React.Fragment>
    <div className='menu_bar'>
      <button className='connectbutton' style={{}} ref={connectbutton} onClick={connectHandler}>Connect</button> <button className='StopChannelButton' style={{}} onClick={() => endpoint(`clear 1`)}>Stop Channel</button>
      <button onClick={getPaths}>GetPaths</button>mediaPath={mediaPath}

      <label htmlFor="favcolor">Font Color:</label>
      <input onChange={changeStyle1} ref={refFontColor} type="color" defaultValue='#ffffff' />
      <label htmlFor="favcolor">Strip Color:</label>
      <input onChange={changeStyle1} ref={refStripColor} type="color" defaultValue='#50037c' />
      <span style={{ position: 'absolute', right: '10px' }}><b >Server 2.3 only</b></span>
      {/* remainingTime={parseInt(remainingTime)} */}
    </div>

    <div style={{
      display: 'flex',
      flexDirection: 'row',
      border: '1px dashed blue',
      height: '100vh',
      flexWrap: 'nowrap'
    }}>

      <div style={{ width: '62vw' }} >

        <Router>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            border: '1px dashed blue',
            height: '100vh',
            flexWrap: 'nowrap'
          }}>

            <div>
              <Switch>
                <div ref={refPreviewContainer} id='preview-container' className='preview-container'>

                  <Route exact path='/oneliner' render={() => (<Oneliner f0={f0} cahngeText={cahngeText} />)} />
                  <Route exact path='/twoliner' render={() => (<Twoliner f0={f0} f1={f1} cahngeText={cahngeText} />)} />
                  <Route exact path='/topleft' render={() => (<TopLeft f0={f0} cahngeText={cahngeText} />)} />
                  <Route exact path='/clock' render={() => (<Clock />)} />
                  <Route exact path='/scroll' render={() => (<Scroll />)} />
                  <Route exact path='/drawing' render={() => (<Drawing />)} />
                </div>
              </Switch>
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

            <div>
              <nav className='nav-bar'>
                <ul>
                  <li>
                    <Link to="/" onClick={() => setCurrenMode('Home')}>Home</Link>
                  </li>
                  <li>
                    <Link to="/oneliner" onClick={() => setCurrenMode('Oneliner')}>Oneliner</Link>
                  </li>
                  <li>
                    <Link to="/twoliner" onClick={() => setCurrenMode('Twoliner')}>Twoliner</Link>
                  </li>
                  <li>
                    <Link to="/topleft" onClick={() => setCurrenMode('Top Left')}>Top Left</Link>
                  </li>
                  <li>
                    <Link to="/clock" onClick={() => setCurrenMode('Clock')}>Clock</Link>
                  </li>
                  <li>
                    <Link to="/scroll" onClick={() => setCurrenMode('Scroll')}>Scroll</Link>
                  </li>
                  <li>
                    <Link id='defaultModule' to="/drawing" onClick={() => setCurrenMode('Drawing')}>Drawing</Link>
                  </li>
                 
                </ul>
              </nav>
              <h1> {currenMode}</h1>
            </div>

          </div>
        </Router>
      </div>
      <div style={{ width: '38vw', minWidth: '400px' }}>
        <Tabs forceRenderTabPanel={true}>
          <TabList>
            <Tab>Drawing</Tab>
            <Tab>Oneliner</Tab>
            <Tab>TwoLiner</Tab>
            <Tab>Top left</Tab>
            <Tab>Scroll</Tab>
            <Tab>Clock</Tab>
          
            <Tab>Video</Tab>
          
            <Tab>Help</Tab>

          </TabList>
          <TabPanel>
            <h2>Drawing</h2>

            <div style={{ border: '4px solid yellow' }}>
              <DrawingController />
            </div>
            <div style={{ display: 'flex' }}>
              <div style={{ maxHeight: '200px', overflow: 'scroll', border: '4px solid red' }}>
                <table border='1' >
                  <tbody>
                    {media.map((val, i) => {
                      return <tr key={i}><td onClick={(e) => {
                        setImageName((`http://localhost:8080/media/` + e.target.innerText));
                      }}>{val}</td></tr>
                    })}
                  </tbody>
                </table>
              </div>
              <div style={{ border: '4px solid green' }}>
                <button onClick={refreshMedia}>Refresh Media</button>{media.length} files<br />
                Selected Image  <button onClick={addImage}>Add This Image</button><br />
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
            <h2>Two Liner</h2>
            <div><input onChange={(e) => setF0(e.target.value)} value={f0}></input> </div>
            <div><input size='30' onChange={(e) => setF1(e.target.value)} value={f1}></input></div>
            <button onClick={() => endpoint(`play 1-102 [html] "http://localhost:3000/twoliner/${f0}/${f1}"`)}>two Liner</button>
            <button className='stopButton' onClick={(e) => endpoint(`stop 1-102`)}>Stop</button>
          </TabPanel>

          <TabPanel>
            <h2>Top Left</h2>
            <div><input onChange={(e) => setF0(e.target.value)} value={f0}></input> </div>
            <button onClick={() => endpoint(`play 1-103 [html] "http://localhost:3000/topleft/${f0}"`)}>Top Left</button>
            <button className='stopButton' onClick={(e) => endpoint(`stop 1-103`)}>Stop</button>
          </TabPanel>

          <TabPanel>
            <h2>Scroll</h2>
            <label htmlFor="w3review">Scroll Content</label><br />
            <textarea id="w3review" defaultValue={scrollData} name="w3review" rows="10" cols="40" onChange={(e) => setScrollData(e.target.value)} />

            <br />
            <button onClick={() => {
              endpoint(`play 1-104 [html] "http://localhost:3000/scroll/${scrollData}"`)
            }}  >Start</button>

            <button className='stopButton' onClick={() => endpoint(`call 1-104 pauseScroll()`)}>Pause</button>
            <button className='stopButton' onClick={() => endpoint(`call 1-104 resumeScroll()`)}>Resume</button>
            <button className='stopButton' onClick={(e) => endpoint(`stop 1-104`)}>Stop</button>

            <button className='stopButton' onClick={(e) => endpoint(`call 1-104 fontcolor('${refFontColor.current.value}')`)}>Update Color</button>

            Speed<input onChange={(e) => endpoint(`call 1-104 setSpeed(${e.target.value})`)} type="number" id='scrollSpeed' min='-5' max='5' step='0.01' defaultValue='0.05' />
          </TabPanel>
          <TabPanel>
            <h2>Clock</h2>
            <button onClick={() => endpoint(`play 1-105 [html] "http://localhost:3000/clock"`)}> Clock</button>
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
                    return <tr key={i}><td onClick={(e) => setfilename((e.target.innerText).split('.')[0])}>{val}</td></tr>
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