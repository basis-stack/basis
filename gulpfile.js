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
var merge = require('merge-stream');
var filter = require('gulp-filter');
var print = require('gulp-print');
var eslint = require('gulp-eslint');

var config = require('./config/gulp.config');
var envSettings = require('./config/settings');
var logMessagePrefix = "         + ";

console.log('[initiate]'.yellow + ' Creating artifacts for app name: ' + envSettings.appName.magenta);

function logMessage(action, context) {

   console.log(logMessagePrefix + action + context.magenta);
}

function getFilePathLogMessage(filepath) {

   return 'Writing  ' + filepath;
}

/* Clean existing build & package artifacts */
gulp.task('clean', function (cb) {

   del([config.paths.build, config.paths.temp, config.paths.package]).then(function (paths) {
      var pathsText = paths.length === 0 ? 'NONE' : paths.join(';\n                    ');
      logMessage('Deleted  ', pathsText);
      cb();
   });
});

/* Clean temporary build artifacts (from babel compile and test specs) */
gulp.task('clean-temp', function (cb) {

   del([config.paths.temp]).then(function (paths) {
      var pathsText = paths.join(';');
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

   if (envSettings.envName !== 'local') {

      gulp.src('./scripts/*.sh')
          .pipe(print(getFilePathLogMessage))
          .pipe(replace('%APPNAME%', envSettings.appName))
          .pipe(replace('%ENVIRONMENT%', envSettings.envName))
          .pipe(replace('%DEPLOY_USER%', envSettings.deployUser))
          .pipe(replace('%DEPLOY_HOST%', envSettings.deployHost))
          .pipe(replace('%DEPLOY_LOCATION%', envSettings.deployDirectory))
          .pipe(replace('%NODE_RUNTIME_ENV%', envSettings.nodeRuntimeVersion))
          .pipe(replace('%FRONT_WITH_NGINX%', envSettings.frontWithNginx))
          .pipe(gulp.dest(config.paths.build + '/scripts'));
   }
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
      packageJson.name = envSettings.appName;
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

/* Compile server-side app + specs */
gulp.task('compile-app', function () {

  return gulp.src(config.paths.app + '/**/*.js')
             .pipe(filter(['**/*.js', '!**/*Spec.js', '!**/specConstructs.js']))
             .pipe(babel())
             .pipe(gulp.dest(config.paths.temp + '/app'));
});

/* Copy app files and environmentalise the bootup module */
gulp.task('copy-app', ['compile-app'], function () {

   var startupDestFileName = envSettings.appName + '_' + envSettings.envName;
   var startupDestDir = config.paths.build + '/app/bin/';
   logMessage('Creating ', startupDestDir + startupDestFileName);

   var startupFileStream = gulp.src(config.paths.temp + '/app/bin/startup.js')
                               .pipe(rename(startupDestFileName))
                               .pipe(gulp.dest(startupDestDir));

   var appFilesStream = gulp.src(config.paths.temp + '/app/**/*.js')
                            .pipe(filter(['**/*.js', '!**/startup.js']))
                            .pipe(gulp.dest(config.paths.build + '/app'))
                            .pipe(print(getFilePathLogMessage));

   return merge(startupFileStream, appFilesStream);
});

/* Lint */
gulp.task('lint', function () {

   return gulp.src(config.paths.app + '/**/*.js')
              .pipe(eslint())
              .pipe(eslint.format())
              .pipe(eslint.failOnError());
});

/* Build entire solution */
gulp.task('build', function (cb) {

   runSequence('prepare-build',
               'lint',
               ['server-scripts', 'environment-settings', 'package-json', 'copy-app'],
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