import * as userActions from '../actions/userActions';

function userReducer(state = {}, { type, payload }) {
  switch (type) {
    case userActions.STORE_USER:
      return payload.user;
    default:
      return state;
  }
}

export default userReducer;
