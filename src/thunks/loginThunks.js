import * as loginActions from '../actions/loginActions';

export function loginUser({ email, password }) {
  return function _loginThunk(dispatch) {
    dispatch(loginActions.setIsLoggingIn(true));

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        dispatch(loginActions.setIsLoggingIn(false));

        resolve(true);
      }, 5000);
    });
  };
}
