import 'colors';
import { default as parseArgs } from 'minimist';
import { default as extend } from 'extend';
import { default as defaultSettings } from './settings.default';

const defaultBuildEnv = 'local';

function getEnvironment() {

   const parseOptions = { default: { env: defaultBuildEnv } };
   const processArgs = parseArgs(process.argv.slice(2), parseOptions);

   return processArgs.env;
}

function loadEnvironmentSettings(envName) {

   return require(`./settings.${envName}`);
}

export default (function () {

   const envName = getEnvironment();
   console.log(`${'[settings]'.yellow} Generating environment settings for: ${envName.magenta}`);

   const envSettings = loadEnvironmentSettings(envName);

   return extend(defaultSettings, envSettings, { envName: envName });
}());