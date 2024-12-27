import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Drawing2 from './Drawing2';
// import Threejs from './Threejs';
import Threejs2 from './Threejs2';
import HTML from './htmlrenderer/Html';
import Chat from './chat/Chat';
import WebAnimator from './theatrejs/WebAnimator';
import Theatrejs2 from './theatrejs/Theatrejs2';
import CanvasPlayer from './CanvasPlayer';
import Tsparticles2 from './tsparticles/Tsparticles2';
import GddTemplatePlayer from './GddTemplatePlayer/GddTemplatePlayer';
import HorizontalScroll from './NRCS/HorizontalScroll'
import HorizontalScrollWithTopic from './NRCS/HorizontalScrollWithTopic'
import BreakingNews from './NRCS/BreakingNews'
import DateTimeSwitcher from './NRCS/DateTimeSwitcher'
import Twoliner from './NRCS/Twoliner'



window.store = store;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route
          exact
          path="/drawing2"
          element={<Drawing2 canvasOutput={true} />}
        />
        <Route path="/html/*" element={<HTML />} />
        <Route path="/chat/*" element={<Chat />} />
        {/* <Route exact path='/threejs' element={<Threejs />} /> */}
        <Route exact path="/threejs2" element={<Threejs2 />} />
        <Route exact path="/WebAnimator" element={<WebAnimator />} />
        <Route exact path="/Theatrejs2" element={<Theatrejs2 />} />
        <Route exact path="/CanvasPlayer" element={<CanvasPlayer />} />
        <Route exact path="/Tsparticles2" element={<Tsparticles2 />} />
        <Route exact path="/GddTemplatePlayer" element={<GddTemplatePlayer />} />
        <Route exact path="/HorizontalScroll" element={<HorizontalScroll />} />
        <Route exact path="/HorizontalScrollWithTopic" element={<HorizontalScrollWithTopic />} />
        <Route exact path="/BreakingNews" element={<BreakingNews />} />
        <Route exact path="/DateTimeSwitcher" element={<DateTimeSwitcher />} />
        <Route exact path="/Twoliner" element={<Twoliner />} />
      </Routes>
    </Router>
  </Provider>
);

reportWebVitals();
