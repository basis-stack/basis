import React from 'react';
import { initialise } from 'basis-client';
import { core } from 'basis-client/modules';
// import { core } from './../../packages/client/modules';

import theme from './../../config/theme';
import shell from './modules/shell';
import TempApp from './modules/shell/components/shell';

const modules = [core.initialise(theme), shell];
const app = <TempApp />;

initialise(modules, app);