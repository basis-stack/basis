import changed from 'gulp-changed';
import gulp from 'gulp';
import _ from 'lodash';

import { getStaticDir, logFileWrite } from './utilities';
import constants from './constants';

export default ({ hasClient, config }) => [{

  /* Copy vendor & custom fonts to public (static) */
  key: constants.taskKeys.copyFonts,
  func: () => {

    const dest = `${getStaticDir(config)}/fonts/`;

    if (!hasClient) {

      _.remove(config.vendor.fonts, f => f.includes('font-awesome'));
    }

    const src = config.custom !== undefined &&
                config.custom.fonts !== undefined ?
      config.vendor.fonts.concat(config.custom.fonts) :
      config.vendor.fonts;

    return gulp.src(src)
               .pipe(changed(dest))
               .pipe(gulp.dest(dest))
               .pipe(logFileWrite(config));
  }

  // TODO: Add image copy task
}];