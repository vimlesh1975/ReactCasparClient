import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes , Route } from "react-router-dom";
import { Provider } from 'react-redux'
import store from './store'
import Drawing2 from './Drawing2';

window.store = store;
ReactDOM.render(
  <Provider store={store}>
    <Router basename={process.env.PUBLIC_URL}>
      {/* <Router > */}
      <Routes>
        <Route exact path='/' element={<App/>} />
        <Route exact path='/drawing2' element={<Drawing2 canvasOutput={true} />} />
      </Routes>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
