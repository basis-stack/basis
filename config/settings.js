'use strict';

var parseArgs = require('minimist');
var extend = require('extend');
var defaultSettings = require('./settings.default');
require('colors');

var defaultBuildEnv = 'local';

function getEnvironment() {

   var parseOptions = { default: { env: defaultBuildEnv } };
   var processArgs = parseArgs(process.argv.slice(2), parseOptions);

   return processArgs.env;
}

function loadEnvironmentSettings(envName) {

   return require('./settings.' + envName);
}

module.exports = (function () {

   var envName = getEnvironment();
   console.log('[settings]'.yellow + ' Generating environment settings for: ' + envName.magenta);

   var envSettings = loadEnvironmentSettings(envName);

   return extend(defaultSettings, envSettings, { envName: envName });
}());