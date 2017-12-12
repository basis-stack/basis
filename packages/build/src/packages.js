import babel from 'gulp-babel';
import gulp from 'gulp';
import merge from 'merge-stream';

import { logFileWrite } from './utilities';
import constants from './constants';

export default context => [{

  /* Compile nested basis packages */
  key: constants.taskKeys.compilePackages,
  dependencies: [constants.taskKeys.lintPackages],
  func: () => {

    const destDir = `${context.config.paths.build}/packages`;

    const sourceStream = gulp.src([`${context.config.paths.packages}${constants.globs.js}`, `${context.config.paths.packages}${constants.globs.jsx}`, constants.globs.notTests])
                             .pipe(babel())
                             .pipe(gulp.dest(destDir))
                             .pipe(logFileWrite(context.config));

    const sassStream = gulp.src([`${context.config.paths.packages}${constants.globs.sass}`])
                           .pipe(gulp.dest(destDir))
                           .pipe(logFileWrite(context.config));

    const packageJsonStream = gulp.src([`${context.config.paths.packages}${constants.globs.packageJson}`])
                                  .pipe(gulp.dest(destDir))
                                  .pipe(logFileWrite(context.config));

    return merge(sourceStream, sassStream, packageJsonStream);
  }
}];