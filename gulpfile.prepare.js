import babel from 'gulp-babel';
import del from 'del';
import fs from 'fs';
import gulp from 'gulp';
import path from 'path';
import rename from 'gulp-rename';

import config from './config/build.config';
import constants from './packages/build/src/constants';
import { logMessage, runtimeDir } from './packages/build/src/utilities';

const packagesPath = 'packages';

gulp.task('clean:packages', (cb) => {

  const pathsToNuke = fs.readdirSync(path.join(runtimeDir, packagesPath))
                        .map(p => `./${packagesPath}/${p}/dist`);

  del(pathsToNuke).then((paths) => {

    if (config.options.logFileNames) {

      const pathsText = paths.length === 0 ? 'NONE' : paths.join('\n                    ');
      logMessage('Deleted  ', pathsText);
    }

    cb();
  });
});

gulp.task('prepare:packages', ['clean:packages'], () => {

  const srcPath = `${packagesPath}/**/src`;

  return gulp.src([`${srcPath}${constants.globs.js}`, `${srcPath}${constants.globs.jsx}`, constants.globs.notNodeModules, constants.globs.notTests])
             .pipe(babel())
             .pipe(rename((p) => { p.dirname = p.dirname.replace('src', 'dist'); }))
             .pipe(gulp.dest(`./${packagesPath}`));
});