import 'colors';
import parseArgs from 'minimist';

import defaultSettings from './settings.default';
import localSettings from './settings.local';
import developmentSettings from './settings.development';
import productionSettings from './settings.production';

const defaultBuildEnv = 'local';
const settingsMap = new Map();
settingsMap.set('local', localSettings);
settingsMap.set('development', developmentSettings);
settingsMap.set('production', productionSettings);

function getEnvironment() {

  const parseOptions = { default: { env: defaultBuildEnv } };
  const processArgs = parseArgs(process.argv.slice(2), parseOptions);

  return processArgs.env;
}

function loadEnvironmentSettings(envName) {

  // TODO: Need to check we actually settings for input env and fail if not
  return settingsMap.get(envName);
}

export default () => {

  // TODO: Change this so that it exposts a single settings object as per below, so that the config at runtime can pick the right settings using the NODE_ENV varible.
  /*

  {
    default: { default settings },
    local: { local overrides },
    development: { development overrides },
    production: { production overrides }
  }

  */


  const envName = getEnvironment();
  console.log(`${'[settings]'.yellow} Generating environment settings for: ${envName.magenta}`);

  const envSettings = loadEnvironmentSettings(envName);

  return Object.assign(defaultSettings, envSettings, { env: envName });
};