import * as storage from '../utils/storage';

import * as userActions from '../actions/userActions';

const defaultUser = storage.get('user') || {};

function userReducer(state = defaultUser, { type, payload }) {
  switch (type) {
    case userActions.STORE_USER:
      return payload.user;
    default:
      return state;
  }
}

export default userReducer;
