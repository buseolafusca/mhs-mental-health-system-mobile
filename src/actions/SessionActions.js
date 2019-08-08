import * as types from './ActionTypes';
import { getAuthenticationToken } from '../services/BackendService';
import history from '../history'

export function loginSuccess() {
  return {type: types.LOG_IN_SUCCESS}
}

export function logInUser(body) {
  return function(dispatch) {
    console.log("DDD")
    return getAuthenticationToken(body).then(response => {
      try {
        sessionStorage.setItem('jwt', response.data.token);
        dispatch(loginSuccess());    
        history.push('/landingpage');
      }
      catch(error) {
        console.error(error);
        alert("Input the correct username and password please")
      }

    }).catch(error => {
      console.log('Session Actions error: ', error)
      throw(error);
    });
  };
}