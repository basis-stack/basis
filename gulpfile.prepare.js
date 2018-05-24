import gulp from 'gulp';

import config from './config/build.config';
import constants from './packages/build/src/constants';
import { cleanPackages } from './packages/build/src/clean';
import compilePackages from './packages/build/src/packages/compile';

const keys = constants.taskKeys;

gulp.task(keys.cleanPackages, (cb) => { cleanPackages(config, cb); });
gulp.task(keys.compilePackages, [keys.cleanPackages], () => compilePackages(config));