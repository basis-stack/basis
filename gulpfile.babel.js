import gulp from 'gulp';
import { initialiseTasks } from 'basis-build';

import config from './config/build.config';
import packageJson from './package.json';
import webpackConfig from './config/webpack.config';

const tasks = initialiseTasks(config, packageJson, webpackConfig);

// /* Default gulp task */
gulp.task('default', [tasks.buildFull]);