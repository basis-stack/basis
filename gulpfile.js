'use strict';

var gulp = require('gulp');
var del = require('del');
var colors = require('colors');
var replace = require('gulp-replace');
var runSequence = require('run-sequence');
var fs = require('fs');
var zip = require('gulp-zip');

var config = require('./config/gulp.config');
var envSettings = require('./config/settings');

/* Clean build artifacts */
gulp.task('clean', function (cb) {

   del([config.paths.build, config.paths.temp]).then(function (paths) {
      var pathsText = paths.length === 0 ? 'NONE' : paths.join('; ');
      console.log('[clean   ]'.yellow + ' Deleted: ' + pathsText.magenta);
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
       .pipe(gulp.dest(config.paths.build + '/scripts'));
});

/* Prepare Environment settings */
gulp.task('environment-settings', function (cb) {

   var settingsContent = JSON.stringify(envSettings, null, '  ');

   fs.writeFile(config.paths.build + '/settings.json', settingsContent, function (err) {

      if (err) { throw err; }
      cb();
   });
});

/* Build entire solution */
gulp.task('build', function (cb) {

   runSequence('prepare-build',
               ['server-scripts', 'environment-settings'],
               cb);
});

/* Package build artifacts */
gulp.task('package', function () {

   return gulp.src(config.paths.build + '/**/*', { dot: true })
              .pipe(zip(envSettings.appName + '.package.' + envSettings.envName + '.zip'))
              .pipe(gulp.dest('./package'));
});

/* Default gulp task */
gulp.task('default', function (cb) {

});