export const SET_IS_LOGGING_IN = 'SET_IS_LOGGIN_IN';
export function setIsLoggingIn(state) {
  return {
    type: SET_IS_LOGGING_IN,
    payload: { state },
  };
}
