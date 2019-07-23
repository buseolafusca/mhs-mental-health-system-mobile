import React, { Component } from "react";
import ReactDOM from 'react-dom'
import './assets/css/index.css'
import SurveyResult from './layouts/SurveyResult'
import NewSurvey from './layouts/NewSurvey'
import LandingPage from './layouts/LandingPage'
import ReviewPage from './layouts/ReviewPage'
import { ResourcesPage, PlacesPage, SinglePlacePage } from './layouts/ResourcesPage'
import LocationPage from './layouts/LocationPage'
import LoginForm from './layouts/LoginPage'
import * as serviceWorker from './serviceWorker'
import { render } from "react-dom";
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
// const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
  <Router history={history}>
    <Switch>
      <Route exact path="/login" component={ LoginForm } />
      <Route path="/landingpage" component={ LandingPage } />

            <Route path="/locationpage" render={() => (isLoggedIn() ? ( <LocationPage /> ) : ( <Redirect to="/login"/> )) } />

            <Route exact path='/questionnaire/:id?' component={NewSurvey} />
            <Route path='/resources/:id/:cat/:place' component={SinglePlacePage} />
            <Route path='/resources/:id/:cat' component={PlacesPage} />
            <Route path='/resources/:id' component={ResourcesPage} />
            <Route path='/result' component={SurveyResult} />
            <Route path='/review' component={ReviewPage} />
            <Redirect from="/login" to="/landingpage" />



    </Switch>
  </Router>
  </Provider>,
  document.getElementById("root")
);


function isLoggedIn(){
  console.log('in the isLoggedIn function')
  return sessionStorage.jwt;
}


// ReactDOM.render(Routing, document.getElementById('root'))
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()



            // <Route path="/landingpage" render={() => (isLoggedIn() ? ( <LandingPage /> ) : ( <Redirect to="/"/> )) } />
                        // <Route path="/landingpage" component={ LandingPage } />

            // <Route
            //   exact
            //   path='/'
            //   render={props => (

            //     <LoginForm
            //       {...props}
            //       childProps={childProps}
            //     />
            //   )}
            // />

            
            
            // <Route
            //   exact
            //   path="/landingpage"
            //   render={props => (

            //     <LandingPage
            //       {...props}
            //       childProps={childProps}
            //     />
            //   )}
            // />
