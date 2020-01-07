import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import getRootReducer from './rootReducer';

export const history = createBrowserHistory();

export default reducers => {

  const rootReducer = getRootReducer(history, reducers);
  const navigateMiddleware = routerMiddleware(history);

  return createStore(rootReducer, {},
                     compose(applyMiddleware(navigateMiddleware, thunk, logger)));
};