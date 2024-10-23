import { createStore, compose } from 'redux';
import { appReducer } from './reducers/app-reducer';

const reducer = appReducer;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers());
