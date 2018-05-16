import babel from 'gulp-babel';
import gulp from 'gulp';
import gulpif from 'gulp-if';
import path from 'path';
import jsonfile from 'jsonfile';
import ts from 'gulp-typescript';
import rename from 'gulp-rename';

import constants from './constants';
import { checkPath, logFileWrite, runtimeDir } from './utilities';

export default (config, srcPath, destPath, renameOp) => {

  // TODO: Should this switch be done using a config switch instead ?
  //       Convention alone could fail in certain scenarios (like if both files present, etc)

  const tsConfigFile = 'tsconfig.json';
  let compiler;

  if (checkPath(tsConfigFile)) {

    const tsConfig = jsonfile.readFileSync(path.join(runtimeDir, tsConfigFile));

    compiler = gulp.src([`${srcPath}${constants.globs.ts}`, `${srcPath}${constants.globs.tsx}`, constants.globs.notNodeModules, constants.globs.notTests])
                   .pipe(ts(tsConfig.compilerOptions));

  } else if (checkPath('.babelrc')) {

    compiler = gulp.src([`${srcPath}${constants.globs.js}`, `${srcPath}${constants.globs.jsx}`, constants.globs.notNodeModules, constants.globs.notTests])
                   .pipe(babel());

  } else throw new Error('No valid compiler config found');

  return compiler.pipe(gulpif(renameOp !== undefined, rename(renameOp)))
                 .pipe(gulp.dest(destPath))
                 .pipe(logFileWrite(config));
};