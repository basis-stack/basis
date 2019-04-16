import 'colors';
import gulp from 'gulp';
import path from 'path';
import assetConfig from 'basis-assets';
import jsonfile from 'jsonfile';

import constants from './tasks/constants';
import getEnvSettings from './settings';
import { runtimeDir, checkPath } from './utilities';
import { getDefaultBuildConfig, getDefaultWebpackConfig } from './config';
import taskSources from './tasks';

export { logFileWrite, sassOptions } from './utilities';

const getContext = (config, webpackConfig) => {

  const hasServer = checkPath('src/server');
  const packageJson = jsonfile.readFileSync(path.join(runtimeDir, 'package.json'));

  return {
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
};

export const initialiseTasks = (options = {}, webpackConfig = getDefaultWebpackConfig()) => {

  const config = getDefaultBuildConfig();
  config.options = { ...config.options, ...options };

  const context = getContext(config, webpackConfig);
  const allTasks = taskSources.map(ts => ts(context))
                              .reduce((acc, cur) => acc.concat(cur), []);

  // TODO: Revise this for Gulp 4
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