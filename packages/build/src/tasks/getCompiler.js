import gulp from 'gulp';
import gulpif from 'gulp-if';
import path from 'path';
import jsonfile from 'jsonfile';
import rename from 'gulp-rename';

import constants from './constants';
import { checkPath, logFileWrite, runtimeDir } from '../utilities';

const compile = (sources, compileOp) => (

  gulp.src(sources.concat([constants.globs.notNodeModules, constants.globs.notTests]))
      .pipe(compileOp)
);

export default (config, srcPath, destPath, renameOp) => {

  const tsConfigFile = 'tsconfig.json';
  let compiler;

  // TODO: Should this switch be done using a config switch instead ?
  //       Convention alone could fail in certain scenarios (like if both files present, etc)
  if (checkPath(tsConfigFile)) {

    const tsConfig = jsonfile.readFileSync(path.join(runtimeDir, tsConfigFile));

    // NOTE: Dynamically import TypeScript compiler (gulp-typescript) as it is a peer dependency
    // TODO: Put try / catch around this (with friendly message) in case is missing !!
    // eslint-disable-next-line global-require, import/no-unresolved
    const ts = require('gulp-typescript');
    const compileOp = ts(tsConfig.compilerOptions);

    compiler = compile([`${srcPath}${constants.globs.ts}`, `${srcPath}${constants.globs.tsx}`], compileOp);

  } else if (checkPath('.babelrc') || checkPath('babel.config.js')) {

    // NOTE: Dynamically import ES6 compiler (gulp-babel) as it is a peer dependency
    // TODO: Put try / catch around this (with friendly message) in case is missing !!
    // eslint-disable-next-line global-require, import/no-unresolved
    const babel = require('gulp-babel');
    const compileOp = babel();

    compiler = compile([`${srcPath}${constants.globs.js}`, `${srcPath}${constants.globs.jsx}`], compileOp);

  } else throw new Error('No valid compiler config found');

  return compiler.pipe(gulpif(renameOp !== undefined, rename(renameOp)))
                 .pipe(gulp.dest(destPath))
                 .pipe(logFileWrite(config));
};