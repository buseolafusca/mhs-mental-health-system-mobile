import React from "react";
import ReactDOM from 'react-dom'
import './assets/css/index.css'
import SurveyResult from './layouts/SurveyResult'
import NewSurvey from './layouts/NewSurvey'
import LandingPage from './layouts/LandingPage'
import ReviewPage from './layouts/ReviewPage'
import { ResourcesPage, PlacesPage, SinglePlacePage } from './layouts/ResourcesPage'
import LocationPage from './layouts/LocationPage'
import {ConnectedLoginForm} from './layouts/LoginPage'
import {ProfilePage} from './layouts/ProfilePage'
import {RegisterPage} from './layouts/RegisterPage'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import rootReducer from "./reducers/RootReducer"
import history from './history'
import {
  Route,
  Router,
  Switch,
  Redirect
} from 'react-router-dom'


const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
  <Router history={history}>
    <Switch>
      <Route exact path="/login" component={ ConnectedLoginForm } />
      <Route exact path="/register" component={ RegisterPage } />
      <Route path="/landingpage" render={(params) => (isLoggedIn() ? ( <LandingPage {...params}/> ) : ( <Redirect to="/login"/> )) } />
      <Route path="/locationpage" render={(params) => (isLoggedIn() ? ( <LocationPage {...params}/> ) : ( <Redirect to="/login"/> )) } />
      <Route path='/questionnaire/:id?' render={(params) => (isLoggedIn() ? ( <NewSurvey {...params}/> ) : ( <Redirect to="/login"/> )) } />
      <Route path='/resources/:id/:cat/:place' render={(params) => (isLoggedIn() ? ( <SinglePlacePage {...params}/> ) : ( <Redirect to="/login"/> )) } />
      <Route path='/resources/:id/:cat' render={(params) => (isLoggedIn() ? ( <PlacesPage {...params}/> ) : ( <Redirect to="/login"/> )) } />
      <Route path='/resources/:id' render={(params) => (isLoggedIn() ? ( <ResourcesPage {...params}/> ) : ( <Redirect to="/login"/> )) } />
      <Route path="/result/:id" render={(params) => (isLoggedIn() ? ( <SurveyResult {...params} /> ) : ( <Redirect to="/login"/> )) } />
      <Route path="/review" render={(params) => (isLoggedIn() ? ( <ReviewPage {...params} /> ) : ( <Redirect to="/login"/> )) } />
      <Route path="/profile" render={(params) => (isLoggedIn() ? ( <ProfilePage {...params} /> ) : ( <Redirect to="/login"/> )) } />
      <Route path='/logout' render={(props) => isLoggedOut() ? (<Redirect to='/login' />) : (<Redirect to='/login' />) } />
      <Redirect from="/" to="/landingpage" />

    </Switch>
  </Router>
  </Provider>,
  document.getElementById("root")
);


function isLoggedIn(){
  console.log('in the isLoggedIn function')
  return sessionStorage.jwt;
}

function isLoggedOut () {
  console.log('in the log out function')
  sessionStorage.removeItem('jwt')
  sessionStorage.removeItem('role')
  return true
}

// ReactDOM.render(Routing, document.getElementById('root'))
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

