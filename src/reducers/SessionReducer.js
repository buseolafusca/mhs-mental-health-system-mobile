import * as types from '../actions/ActionTypes';
import initialState from './InitialState';
import history from '../history.js';
import { push } from 'react-router-redux'

export default function sessionReducer(state = initialState.session, action) {
  switch(action.type) {
    case types.LOG_IN_SUCCESS:
        history.push('/');
      return !!sessionStorage.jwt
    default: 
      return state;
  }
}