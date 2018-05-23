import gulp from 'gulp';

import constants from './constants';
import { checkPath } from './utilities';

export default (srcPath) => {

  let linter;

  // TODO: Should this switch be done using a config switch instead ?
  //       Convention alone could fail in certain scenarios (like if both files present, etc)

  // TODO: Allow for all variations of eslint config here
  if (checkPath('.eslintrc.json')) {

    // eslint-disable-next-line global-require, import/no-unresolved
    const eslint = require('gulp-eslint');

    linter = gulp.src([`${srcPath}${constants.globs.js}`, `${srcPath}${constants.globs.jsx}`, constants.globs.notDist])
                 .pipe(eslint())
                 .pipe(eslint.format())
                 .pipe(eslint.failOnError());

  } else if (checkPath('tslint.json')) {

    // eslint-disable-next-line global-require, import/no-unresolved
    const tslint = require('gulp-tslint');

    linter = gulp.src([`${srcPath}${constants.globs.ts}`, `${srcPath}${constants.globs.tsx}`, constants.globs.notDist])
                 .pipe(tslint({ formatter: 'prose' }))
                 .pipe(tslint.report());

  } else throw new Error('No valid lint config found');

  return linter;
};