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
      </Routes>
    </Router>
  </Provider>
);

reportWebVitals();
