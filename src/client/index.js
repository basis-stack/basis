import React from 'react';
import { initialise } from 'basis-client';
import { core } from 'basis-client/modules';

import theme from '../../config/theme';
import shell from './modules/shell';
import App from './app';

const modules = [
  core.initialise(theme),
  shell.initialise()
];
const app = <App />;

initialise(modules, app);