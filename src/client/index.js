import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './app';

const mountNode = document.getElementById('rootComponentMount');
const wrappedApp = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

ReactDOM.render(wrappedApp, mountNode);