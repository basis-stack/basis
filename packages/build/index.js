import 'colors';
import gulp from 'gulp';

import assetTasks from './src/assets';
import buildTasks from './src/build';
import cleanTasks from './src/clean';
import clientTasks from './src/client';
import createTasks from './src/create';
import lintTasks from './src/lint';
import packagesTasks from './src/packages';
import serverTasks from './src/server';
import constants from './src/constants';

export { default as getEnvSettings } from './src/settings';
export { logFileWrite, sassOptions } from './src/utilities';

export const initialiseTasks = (config, envSettings, webpackConfig, rootDir) => {

  // TODO: Add validate config step here (and throw error if anything missing)

  const context = {
    config, envSettings, webpackConfig, rootDir
  };
  const taskSources = [assetTasks, buildTasks, cleanTasks, clientTasks, createTasks, lintTasks, packagesTasks, serverTasks];
  const allTasks = taskSources.map(ts => ts(context))
                              .reduce((acc, cur) => acc.concat(cur), []);

  allTasks.forEach((t) => {

    switch (true) {

      case t.dependencies === undefined: {

        gulp.task(t.key, t.func);
        break;
      }

      case t.func === undefined: {

        gulp.task(t.key, t.dependencies);
        break;
      }

      default: {

        gulp.task(t.key, t.dependencies, t.func);
        break;
      }
    }
  });

  return constants.taskKeys;
};