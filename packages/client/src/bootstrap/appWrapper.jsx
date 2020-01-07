import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import getStore, { history } from './store';
import ThemeProvider from './themeProvider';

export default (app, moduleData, themeConfig) => {

  const store = getStore(moduleData.reducers);

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