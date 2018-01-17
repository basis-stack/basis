import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { routerMiddleware, ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import rootReducer from './rootReducer';
import ThemeProvider from './themeProvider';

export default (app, moduleData) => {

  const history = createHistory();
  const navigateMiddleware = routerMiddleware(history);
  const store = createStore(rootReducer(moduleData.reducers), applyMiddleware(logger, navigateMiddleware));

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ThemeProvider>
          {/* TODO: Need to pass moduleData.routes down to the app also (using React.cloneElement) */}
          { app }
        </ThemeProvider>
      </ConnectedRouter>
    </Provider>
  );
};