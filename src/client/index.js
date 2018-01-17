import React from 'react';
import { initialise, core } from 'basis-client';

import shell from './modules/shell';
import TempApp from './modules/shell/components/shell';

const modules = [core, shell];
const app = <TempApp />;

initialise(modules, app);