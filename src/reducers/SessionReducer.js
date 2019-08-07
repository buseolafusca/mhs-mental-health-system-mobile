import * as types from '../actions/ActionTypes';
import initialState from './InitialState';

export default function sessionReducer(state = initialState.session, action) {
  switch(action.type) {
    case types.LOG_IN_SUCCESS:
      return !!sessionStorage.jwt
    default: 
      return state;
  }
}