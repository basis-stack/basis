import 'colors';
import { default as parseArgs } from 'minimist';
import { default as extend } from 'extend';

// TODO: Importing all settings and storing in a Map is pretty daft !!! Need to fix this pattern so is more dynamic as per old require('./settings.blah') model.
import { default as defaultSettings } from './settings.default';
import { default as localSettings } from './settings.local';
import { default as developmentSettings } from './settings.development';
import { default as productionSettings } from './settings.production';

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

export default (function () {

   const envName = getEnvironment();
   console.log(`${'[settings]'.yellow} Generating environment settings for: ${envName.magenta}`);

   const envSettings = loadEnvironmentSettings(envName);

   // TODO: Use native Object.Assign here instead !!
   return extend(defaultSettings, envSettings, { env: envName });
}());