import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Scene from './components/Scene';
import Viewer from './components/Viewer';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";



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
        </Switch>
    </Router>

  </React.StrictMode>,
  document.getElementById('root')
);
