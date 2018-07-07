import { combineReducers } from 'redux';

import * as loginActions from '../actions/loginActions';

function isLoggingIn(state = false, { type, payload }) {
  switch (type) {
    case loginActions.SET_IS_LOGGING_IN:
      return payload.state;
    default:
      return state;
  }
}

export default combineReducers({ isLoggingIn });
