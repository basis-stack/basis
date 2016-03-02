'use strict';

var gulp = require('gulp');
var del = require('del');
var colors = require('colors');
var replace = require('gulp-replace');
var runSequence = require('run-sequence');
var fs = require('fs');
var zip = require('gulp-zip');
var rename = require('gulp-rename');
var babel = require("gulp-babel");

var config = require('./config/gulp.config');
var envSettings = require('./config/settings');
var logMessagePrefix = "         + ";

function logMessage(action, context) {

   console.log(logMessagePrefix + action + context.magenta);
}

/* Clean build artifacts */
gulp.task('clean', function (cb) {

   del([config.paths.build, config.paths.temp, config.paths.package]).then(function (paths) {
      var pathsText = paths.length === 0 ? 'NONE' : paths.join(';\n                    ');
      logMessage('Deleted  ', pathsText);
      cb();
   });
});

/* Prepare build directory */
gulp.task('prepare-build', ['clean'], function (cb) {

   fs.mkdir(config.paths.build, function (err) {

      if (err) { throw err; }
      cb();
   });
});


/* Copy server scripts */
gulp.task('server-scripts', function() {

   gulp.src(config.server.scripts)
      //  .pipe(print(function(filepath) {
      //     return '[server-scripts]'.yellow + ' Prepared & copied: ' + filepath;
      //  }))
       .pipe(replace('%APPNAME%', envSettings.appName))
       .pipe(replace('%ENVIRONMENT%', envSettings.envName))
       .pipe(replace('%DEPLOY_USER%', envSettings.deployUser))
       .pipe(replace('%DEPLOY_HOST%', envSettings.deployHost))
       .pipe(replace('%DEPLOY_LOCATION%', envSettings.deployDirectory))
       .pipe(gulp.dest(config.paths.build + '/scripts'));
});

/* Prepare Environment settings file */
gulp.task('environment-settings', function (cb) {

   // TODO: Could this be done with JsonFile instead ???

   var settingsContent = JSON.stringify(envSettings, null, '  ');
   var pathName = config.paths.build + '/settings.json';
   logMessage('Creating ', pathName);

   fs.writeFile(pathName, settingsContent, function (err) {

      if (err) { throw err; }
      cb();
   });
});

/* Prepare package.json for the server / runtime */
gulp.task('package-json', function (cb) {

    // TODO: Replace all this crap with jsonfile package !!!

   fs.readFile('./package.json', function (err, data) {

      if (err) { throw err; }

      var packageJson = JSON.parse(data);
      packageJson.devDependencies = undefined;
      packageJson.scripts = undefined;
      packageJson.homepage = undefined;
      packageJson.bugs = undefined;
      packageJson.license = undefined;
      packageJson.author = undefined;
      packageJson.keywords = undefined;
      packageJson.repository = undefined;
      packageJson.description = undefined;

      var pathName = config.paths.build + '/package.json';
      logMessage('Creating ', pathName);

      fs.writeFile(pathName, JSON.stringify(packageJson, null, '  '), function (err) {

         if (err) { throw err; }
         cb();
      });
   });
});

/* Copy and environmentalise the bootup module */
gulp.task('binaries', function () {

   var destFileName = envSettings.appName + '_' + envSettings.envName;
   var destDir = config.paths.build + '/app/bin/';
   logMessage('Creating ', destDir + destFileName);

   return gulp.src(config.paths.app + '/bin/startup.js')
              .pipe(rename(destFileName))
              .pipe(gulp.dest(destDir));
});

/* Compile server-side express app */
gulp.task('compile-app', function () {

  return gulp.src(config.paths.app + '/app.js')
             .pipe(babel())
             .pipe(gulp.dest(config.paths.build + '/app'));
});

/* Build entire solution */
gulp.task('build', function (cb) {

   runSequence('prepare-build',
               ['server-scripts', 'environment-settings', 'package-json', 'binaries', 'compile-app'],
               cb);
});

/* Package build artifacts */
gulp.task('package', function () {

   var packageFileName = envSettings.appName + '.package.' + envSettings.envName + '.zip';
   logMessage('Creating ', config.paths.package + '/' + packageFileName);

   return gulp.src(config.paths.build + '/**/*', { dot: true })
              .pipe(zip(packageFileName))
              .pipe(gulp.dest(config.paths.package));
});

/* Default gulp task */
gulp.task('default', function (cb) {

});