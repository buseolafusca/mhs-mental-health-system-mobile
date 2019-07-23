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
import { createBrowserHistory } from 'history'

import {
  Route,
  Router,
  Switch,
  Redirect
} from 'react-router-dom'


const store = createStore(rootReducer, applyMiddleware(thunk));
const history = createBrowserHistory();


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
      <Provider store={store}>

        <Router history={history}>

          <Switch>

            <Route path="/" component={ LoginForm } />
            <Route path="/landingpage" render={() => (isLoggedIn() ? ( <LandingPage /> ) : ( <Redirect to="/"/> )) } />



            <Route exact path='/questionnaire/:id?' component={NewSurvey} />
            <Route exact path='/locationpage' component={LocationPage} />
            <Route path='/resources/:id/:cat/:place' component={SinglePlacePage} />
            <Route path='/resources/:id/:cat' component={PlacesPage} />
            <Route path='/resources/:id' component={ResourcesPage} />
            <Route path='/result' component={SurveyResult} />
            <Route path='/review' component={ReviewPage} />

          </Switch>
        </Router>
      </Provider>

    )
  }
}

function isLoggedIn(){
  console.log('in the isLoggedIn function')
  return sessionStorage.jwt;
}

function requireAuth(nextState, replace) {
  console.log('in the require auth function')
  if (!sessionStorage.jwt) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}


render(<Routing />, document.getElementById("root"));
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
