import eslint from 'gulp-eslint';
import gulp from 'gulp';
import tslint from 'gulp-tslint';

import constants from './constants';
import { checkPath } from './utilities';

export default (srcPath) => {

  let linter;

  // TODO: Should this switch be done using a config switch instead ?
  //       Convention alone could fail in certain scenarios (like if both files present, etc)

  // TODO: Allow for all variations of eslint config here
  if (checkPath('.eslintrc.json')) {

    linter = gulp.src([`${srcPath}${constants.globs.js}`, `${srcPath}${constants.globs.jsx}`])
                 .pipe(eslint())
                 .pipe(eslint.format())
                 .pipe(eslint.failOnError());

  } else if (checkPath('tslint.json')) {

    linter = gulp.src([`${srcPath}${constants.globs.ts}`, `${srcPath}${constants.globs.tsx}`])
                 .pipe(tslint({ formatter: 'prose' }))
                 .pipe(tslint.report());

  } else throw new Error('No valid lint config found');

  return linter;
};