import { series, task } from 'gulp';

import constants from './packages/build/src/tasks/constants';
import { cleanPackages } from './packages/build/src/tasks/clean';
import compilePackages from './packages/build/src/packages/compile';
import { linkPackages } from './packages/build/src/packages';

const keys = constants.taskKeys;

task(keys.cleanPackages, cb => { cleanPackages(undefined, cb); });
task(keys.compilePackages, () => compilePackages(undefined));
task(keys.preparePackages, series(keys.cleanPackages, keys.compilePackages));
task(keys.linkPackages, linkPackages);