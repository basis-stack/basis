import changed from 'gulp-changed';
import gulp from 'gulp';
import _ from 'lodash';

import { getStaticDir, logFileWrite } from './utilities';
import constants from './constants';

export default context => [{

  /* Copy vendor & custom fonts to public (static) */
  key: constants.taskKeys.copyFonts,
  func: () => {

    const dest = `${getStaticDir(context)}/fonts/`;

    if (!context.hasClient) {

      _.remove(context.config.vendor.fonts, f => f.includes('font-awesome'));
    }

    const src = context.config.custom !== undefined &&
                context.config.custom.fonts !== undefined ?
      context.config.vendor.fonts.concat(context.config.custom.fonts) :
      context.config.vendor.fonts;

    return gulp.src(src)
               .pipe(changed(dest))
               .pipe(gulp.dest(dest))
               .pipe(logFileWrite(context.config));
  }

  // TODO: Add image copy task
}];