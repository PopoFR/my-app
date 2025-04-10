import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Scene from './components/Scene';
import Viewer from './components/Viewer';
import Neon from './components/Neon';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import reportWebVitals from './reportWebVitals';


ReactDOM.render(
  <React.StrictMode>
    <Router>
        <Switch>
          <Route exact path="/">
            <Scene />
          </Route>
          <Route path="/viewer">
            <Viewer />
          </Route>
          <Route path="/neon">
            <Neon />
          </Route>
        </Switch>
    </Router>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
