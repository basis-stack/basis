'use strict';

var buildPath = './build';
var tempPath = './temp';
var appPath = './app';
var packagePath = './package';

module.exports = {
   paths: {
      build: buildPath,
      temp: tempPath,
      app: appPath,
      package: packagePath
   },
   vendor: {
      styles: [],
      fonts: []
   },
   server: {
      scripts: [
         './scripts/set_runtime_dir.sh',
         './scripts/install_platform.sh',
         './scripts/nuke_packages.sh',
         './scripts/install_deps.sh',
         './scripts/startup.sh',
         './scripts/shutdown.sh',
         './scripts/deploy.sh'
      ]
   }
};