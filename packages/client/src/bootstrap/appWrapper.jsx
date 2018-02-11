import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { routerMiddleware, ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import rootReducer from './rootReducer';
import ThemeProvider from './themeProvider';

export default (app, moduleData) => {

  const history = createHistory();
  const navigateMiddleware = routerMiddleware(history);
  const store = createStore(rootReducer(moduleData.reducers), applyMiddleware(logger, navigateMiddleware, thunk));

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ThemeProvider>
          {/*
            TODO: Should we pass anything else down to the App ? History ?
                  Not sure on this, passing history down could encourage navigation & path checking outside of Redux state.
                  This could lead to inconsistentcies in history and state.
          */}
          { React.cloneElement(app, { routes: moduleData.routes }) }
        </ThemeProvider>
      </ConnectedRouter>
    </Provider>
  );
};