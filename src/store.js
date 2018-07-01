import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import reducer from './reducers';

const services = {};

const store = createStore(reducer, applyMiddleware(thunk.withExtraArgument(services)));

export default store;