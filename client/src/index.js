import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Oneliner from './Oneliner';

import Clock from './Clock';
import Scroll from './Scroll';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Provider } from 'react-redux'
import store from './store'
import Drawing from './Drawing';


window.store = store;

ReactDOM.render(

  <Provider store={store}>
    <Router basename={process.env.PUBLIC_URL}>
      {/* <Router > */}

      <Switch>
        <Route exact path='/' render={() => (<App />)} />
        <Route exact path='/oneliner/:f0/:color/:backgroundColor' render={({ match }) => (<Oneliner f0={match.params.f0} color={match.params.color} backgroundColor={match.params.backgroundColor} />)} />
        <Route exact path='/clock' render={() => (<Clock />)} />
        <Route exact path='/scroll/:f0' render={({ match }) => (<Scroll f0={match.params.f0} />)} />
        <Route exact path='/drawing' render={() => <Drawing canvasOutput={true} />} />
      </Switch>
    </Router>
  </Provider>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
