import gulp from 'gulp';

import assetTasks from './src/assets';
import cleanTasks from './src/clean';
import clientTasks from './src/client';
import createTasks from './src/create';
import lintTasks from './src/lint';
import packagesTasks from './src/packages';
import serverTasks from './src/server';

export { default as constants } from './src/constants';
export { default as getEnvSettings } from './src/settings';

export const initialiseTasks = (config, envSettings, webpackConfig, rootDir) => {

  const context = {
    config, envSettings, webpackConfig, rootDir
  };
  const taskSources = [assetTasks, cleanTasks, clientTasks, createTasks, lintTasks, packagesTasks, serverTasks];

  const allTasks = taskSources.map(ts => ts(context))
                              .reduce((acc, cur) => acc.concat(cur), []);

  allTasks.forEach((t) => {

    if (t.dependencies) {

      gulp.task(t.key, t.dependencies, t.func);
    } else {

      gulp.task(t.key, t.func);
    }
  });
};