import * as types from './ActionTypes';
import { getAuthenticationToken } from '../services/BackendService';
import { createBrowserHistory } from 'history';
 
const history = createBrowserHistory();

export function loginSuccess() {
  return {type: types.LOG_IN_SUCCESS}
}

export function logInUser(body) {
  return function(dispatch) {
    console.log("DDD")
    return getAuthenticationToken(body).then(response => {
        console.log("response");

        console.log(response);
        sessionStorage.setItem('jwt', response.data.token);
        dispatch(loginSuccess());        
        history.push('/landingpage');


    }).catch(error => {
      console.log('Session Actions error: ', error)
      throw(error);
    });
  };
}