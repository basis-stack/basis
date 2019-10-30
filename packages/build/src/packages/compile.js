import gulp from 'gulp';
import merge from 'merge-stream';
import rename from 'gulp-rename';

import compile from '../tasks/getCompiler';
import constants from '../tasks/constants';
import { logFileWrite } from '../utilities';
import { packagesPath } from './utilities';
import { getDefaultBuildConfig } from '../config';

export default (config = getDefaultBuildConfig()) => {

  const sourceDir = `${packagesPath}/**/src`;
  const destDir = `./${packagesPath}`;
  const renameOp = p => { p.dirname = p.dirname.replace('src', 'dist'); };

  const sourceStream = compile(config, sourceDir, destDir, renameOp);

  const sassStream = gulp.src([`${sourceDir}${constants.globs.sass}`, constants.globs.notNodeModules])
                         .pipe(rename(renameOp))
                         .pipe(gulp.dest(destDir))
                         .pipe(logFileWrite(config));

  return merge(sourceStream, sassStream);
};