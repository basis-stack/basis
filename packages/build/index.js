import 'colors';
import gulp from 'gulp';
import path from 'path';
import assetConfig from 'basis-assets';

import assetTasks from './src/assets';
import buildTasks from './src/build';
import cleanTasks from './src/clean';
import clientTasks from './src/client';
import createTasks from './src/create';
import lintTasks from './src/lint';
import packagesTasks from './src/packages';
import serverTasks from './src/server';
import publishTasks from './src/publish';
import constants from './src/constants';
import getEnvSettings from './src/settings';
import { runtimeDir, checkPath } from './src/utilities';

export { logFileWrite, sassOptions } from './src/utilities';

export const initialiseTasks = (config, packageJson, webpackConfig) => {

  // TODO: Add validate config step here (and throw error if anything missing)

  const hasServer = checkPath('src/server');

  const context = {
    config: { ...config, ...assetConfig },
    runtimeDir,
    envSettings: hasServer ? getEnvSettings(path.join(runtimeDir, 'config')) : undefined,
    packageJson,
    webpackConfig,
    hasPackages: checkPath('packages'),
    hasServer,
    hasClient: checkPath('src/client'),
    lint: config.options.lint !== undefined ? config.options.lint : true
  };

  const taskSources = [assetTasks, buildTasks, cleanTasks, clientTasks, createTasks, lintTasks, packagesTasks, serverTasks, publishTasks];
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