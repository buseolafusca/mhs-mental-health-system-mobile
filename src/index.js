import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import SurveyResult from './layouts/SurveyResult';
import NewSurvey from './layouts/NewSurvey';
import LandingPage from './layouts/landingpage';
import { ResourcesPage, PlacesPage, SinglePlacePage } from './layouts/resourcespage';
import LocationPage from './layouts/locationpage';
import * as serviceWorker from './serviceWorker';

import {
  Route,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";


const routing = (
  <Router>      
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/questionnaire/:id?" component={NewSurvey} />
        <Route exact path="/locationpage" component={LocationPage} />
        <Route path="/resources/:id/:cat/:place" component={SinglePlacePage} />
        <Route path="/resources/:id/:cat" component={PlacesPage} />
        <Route path="/resources/:id" component={ResourcesPage} />
        <Route path="/result" component={SurveyResult} />
      </Switch>
  </Router>
);


ReactDOM.render(routing, document.getElementById("root"));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
