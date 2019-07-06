import 'colors';
import path from 'path';
import assetConfig from 'basis-assets';
import jsonfile from 'jsonfile';
import _ from 'lodash';

import getEnvSettings from './settings';
import { runtimeDir, checkPath } from './utilities';
import { getDefaultBuildConfig, getDefaultWebpackConfig } from './config';
import taskSources from './tasks';
import mapToGulp from './tasks/mapToGulp';

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

  mapToGulp(allTasks);

  return allTasks.map(t => t.key);
};