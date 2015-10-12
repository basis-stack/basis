var gulp = require('gulp');
var del = require('del');
var colors = require('colors');

var config = require('./config/gulp.config.js');

/* Clean Enviroment */
gulp.task('clean', function (cb) {
   del([config.paths.build, config.paths.temp]).then(function (paths) {
      var pathsText = paths.length === 0 ? 'NONE' : paths.join('; ');
      console.log('[clean]'.yellow + ' Deleted: ' + pathsText);
      cb();
   });
});

gulp.task('default', function () {

});