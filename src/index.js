import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SurveyResult from './SurveyResult';
import NewSurvey from './NewSurvey';
import * as serviceWorker from './serviceWorker';
import {
  Route,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";


const routing = (
  <Router>
    <div>
      
      <Switch>
        <Route exact path="/" component={NewSurvey} />
        <Route path="/result" component={SurveyResult} />
      </Switch>
    </div>
  </Router>
);


ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
