import gulp from 'gulp';

import constants from './constants';
import { checkPath } from '../utilities';

const runLint = (sources, lintOP) => (

  gulp.src(sources.concat([constants.globs.notDist]))
      .pipe(lintOP)
);

export default (srcPath) => {

  let linter;

  // TODO: Should this switch be done using a config switch instead ?
  //       Convention alone could fail in certain scenarios (like if both files present, etc)
  // TODO: Allow for all variations of eslint config here
  if (checkPath('.eslintrc.json')) {

    // NOTE: Dynamically import ES linter (gulp-eslint) as it is a peer dependency
    // TODO: Put try / catch around this (with friendly message) in case is missing !!
    // eslint-disable-next-line global-require, import/no-unresolved
    const eslint = require('gulp-eslint');
    const lintOp = eslint();

    linter = runLint([`${srcPath}${constants.globs.js}`, `${srcPath}${constants.globs.jsx}`], lintOp)
               .pipe(eslint.format())
               .pipe(eslint.failOnError());

  } else if (checkPath('tslint.json')) {

    // NOTE: Dynamically import TS linter (gulp-eslint) as it is a peer dependency
    // TODO: Put try / catch around this (with friendly message) in case is missing !!
    // eslint-disable-next-line global-require, import/no-unresolved
    const tslint = require('gulp-tslint');
    const lintOp = tslint({ formatter: 'prose' });

    linter = runLint([`${srcPath}${constants.globs.ts}`, `${srcPath}${constants.globs.tsx}`], lintOp)
               .pipe(tslint.report());

  } else throw new Error('No valid lint config found');

  return linter;
};