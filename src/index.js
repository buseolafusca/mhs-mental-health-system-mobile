import React, { Component } from "react";
import ReactDOM from 'react-dom'
import './assets/css/index.css'
import SurveyResult from './layouts/SurveyResult'
import NewSurvey from './layouts/NewSurvey'
import LandingPage from './layouts/LandingPage'
import ReviewPage from './layouts/ReviewPage'
import { ResourcesPage, PlacesPage, SinglePlacePage } from './layouts/ResourcesPage'
import LocationPage from './layouts/LocationPage'
import { LoginForm } from './layouts/LoginPage'
import * as serviceWorker from './serviceWorker'
import { render } from "react-dom";

import {
  Route,
  BrowserRouter as Router,
  Switch
} from 'react-router-dom'

class Routing extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isLoggedIn: false,
      isAuthenticated: false
    }
  }

  userHasAuthenticated = authenticated => {
    console.log("CCC")
    this.setState({ isAuthenticated: authenticated });
  }

  render = () => {
    // if (!this.state.authRequestStarted){
    //   return (
    //     <LoginForm />
    //   )
    // }
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
    const isAuthenticated = false;

    return (
        <Router>

          <Switch>
            <Route
              exact
              path='/'
              render={props => (

                <LoginForm
                  {...props}
                  childProps={childProps}
                />
              )}
            />

            
            
            <Route
              exact
              path="/landingpage"
              render={props => (

                <LandingPage
                  {...props}
                  childProps={childProps}
                />
              )}
            />

            <Route exact path='/questionnaire/:id?' component={NewSurvey} />
            <Route exact path='/locationpage' component={LocationPage} />
            <Route path='/resources/:id/:cat/:place' component={SinglePlacePage} />
            <Route path='/resources/:id/:cat' component={PlacesPage} />
            <Route path='/resources/:id' component={ResourcesPage} />
            <Route path='/result' component={SurveyResult} />
            <Route path='/review' component={ReviewPage} />

          </Switch>
        </Router>
    )
  }
}


render(<Routing />, document.getElementById("root"));
// ReactDOM.render(Routing, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
