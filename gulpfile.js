'use strict';

var gulp = require('gulp');
var del = require('del');
var colors = require('colors');
var replace = require('gulp-replace');
var print = require('gulp-print');
var runSequence = require('run-sequence');

var config = require('./config/gulp.config');
var envSettings = require('./config/settings');

/* Clean Enviroment */
gulp.task('clean', function (cb) {

   del([config.paths.build, config.paths.temp]).then(function (paths) {
      var pathsText = paths.length === 0 ? 'NONE' : paths.join('; ');
      console.log('[clean   ]'.yellow + ' Deleted: ' + pathsText);
      cb();
   });
});

/* Copy Server Scripts */
gulp.task('server-scripts', function() {

   gulp.src(config.server.scripts)
      //  .pipe(print(function(filepath) {
      //     return '[server-scripts]'.yellow + ' Prepared & copied: ' + filepath;
      //  }))
       .pipe(replace('%APPNAME%', 'blabla'))
       .pipe(gulp.dest(config.paths.build + '/scripts'));
});

/* Build entire solution */
gulp.task('build', function (cb) {

   runSequence('clean',
               ['server-scripts'],
               cb);
});


gulp.task('default', function (cb) {

});