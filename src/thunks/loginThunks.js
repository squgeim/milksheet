import * as loginActions from '../actions/loginActions';
import * as userActions from '../actions/userActions';

export function loginUser({ email, password }) {
  return async function _loginThunk(dispatch, getState, { loginService }) {
    dispatch(loginActions.setIsLoggingIn(true));

    try {
      const user = await loginService.login(email, password);
      dispatch(userActions.storeUser(user));
    } catch (err) {
      dispatch(loginActions.loginFailed(err));
    }

    dispatch(loginActions.setIsLoggingIn(false));
  };
}
