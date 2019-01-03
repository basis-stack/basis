import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware, ConnectedRouter } from 'connected-react-router';

import createRootReducer from './rootReducer';
import ThemeProvider from './themeProvider';

export default (app, moduleData, themeConfig) => {

  const history = createBrowserHistory();
  const navigateMiddleware = routerMiddleware(history);
  const store = createStore(createRootReducer(history, moduleData.reducers),
                            applyMiddleware(navigateMiddleware, thunk, logger));

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>     
        <ThemeProvider themeConfig={themeConfig}>
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