import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom';

import rootReducer from './reducers/rootReducer';
import App from './app';

const mountNode = document.getElementById('rootComponentMount');
const store = createStore(rootReducer);

const wrappedApp = (

  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(wrappedApp, mountNode);