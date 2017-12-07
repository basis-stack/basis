import changed from 'gulp-changed';
import gulp from 'gulp';

import { logFileWrite } from './utilities';
import constants from './constants';

export default context => [{

  /* Copy vendor fonts to public (static) */
  key: constants.taskKeys.copyFonts,
  func: () => {

    const dest = `${context.config.paths.build}/public/fonts/`;

    return gulp.src(context.config.vendor.fonts)
               .pipe(changed(dest))
               .pipe(gulp.dest(dest))
               .pipe(logFileWrite(context.config));
  }
}];