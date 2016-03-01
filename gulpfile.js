'use strict';

var gulp = require('gulp');
var del = require('del');
var colors = require('colors');
var replace = require('gulp-replace');
var print = require('gulp-print');
var runSequence = require('run-sequence');
var fs = require('fs');

var config = require('./config/gulp.config');
var envSettings = require('./config/settings');

/* Clean Build Artifacts */
gulp.task('clean', function (cb) {

   del([config.paths.build, config.paths.temp]).then(function (paths) {
      var pathsText = paths.length === 0 ? 'NONE' : paths.join('; ');
      console.log('[clean   ]'.yellow + ' Deleted: ' + pathsText.magenta);
      cb();
   });
});

/* Copy Server Scripts */
gulp.task('server-scripts', function() {

   gulp.src(config.server.scripts)
      //  .pipe(print(function(filepath) {
      //     return '[server-scripts]'.yellow + ' Prepared & copied: ' + filepath;
      //  }))
       .pipe(replace('%APPNAME%', envSettings.appName))
       .pipe(replace('%ENVIRONMENT%', envSettings.envName))
       .pipe(gulp.dest(config.paths.build + '/scripts'));
});

/* Prepare Environment settings */
gulp.task('environment-settings', function (cb) {

	//   var settingsContent = 'module.exports = {};';

   //   fs.writeFile(config.paths.build + '/settings.js', settingsContent, function (err) {

   //      cb();
   //   });
   cb();
});

/* Build entire solution */
gulp.task('build', function (cb) {

   runSequence('clean',
               ['server-scripts', 'environment-settings'],
               cb);
});


gulp.task('default', function (cb) {

});