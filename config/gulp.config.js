'use strict';

var buildPath = './build';
var tempPath = './temp';
var appPath = './app';

module.exports = {
   paths: {
      build: buildPath,
      temp: tempPath,
      app: appPath
   },
   vendor: {
      styles: [],
      fonts: []
   },
   server: {
      scripts: [
         './scripts/startup.sh',
         './scripts/shutdown.sh',
         './scripts/deploy.sh'
      ]
   }
};