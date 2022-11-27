import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux'
import store from './store'
import Drawing2 from './Drawing2';
// import Threejs from './Threejs';
import Threejs2 from './Threejs2';
import HTML from './htmlrenderer/Html'

window.store = store;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route exact path='/' element={<App />} />
        <Route exact path='/drawing2' element={<Drawing2 canvasOutput={true} />} />
        <Route exact path='/html' element={<HTML />} />
        {/* <Route exact path='/threejs' element={<Threejs />} /> */}
        <Route exact path='/threejs2' element={<Threejs2 />} />
      </Routes>
    </Router>
  </Provider>
);

reportWebVitals();