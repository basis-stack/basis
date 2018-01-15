import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import { reducers, routes } from './modules';
import rootReducer from './rootReducer';

import Shell from './shell';

const history = createHistory();
const navigateMiddleware = routerMiddleware(history);
const store = createStore(rootReducer(reducers), applyMiddleware(logger, navigateMiddleware));

export default (

  <Provider store={store}>
    <Shell history={history} />
  </Provider>
);