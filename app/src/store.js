import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

import reducer from './reducers';

import * as loginService from './services/loginService';

const services = { loginService };

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk.withExtraArgument(services)))
);

export default store;
