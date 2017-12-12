import changed from 'gulp-changed';
import gulp from 'gulp';

import { logFileWrite } from './utilities';
import constants from './constants';

export default context => [{

  /* Copy vendor & custom fonts to public (static) */
  key: constants.taskKeys.copyFonts,
  func: () => {

    const dest = `${context.config.paths.build}/public/fonts/`;

    return gulp.src(context.config.vendor.fonts.concat(context.config.custom.fonts))
               .pipe(changed(dest))
               .pipe(gulp.dest(dest))
               .pipe(logFileWrite(context.config));
  }

  // TODO: Add image copy task
}];