import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import reducer from './reducers';

import * as loginService from './services/loginService';

const services = { loginService };

const store = createStore(
  reducer,
  applyMiddleware(thunk.withExtraArgument(services))
);

export default store;
