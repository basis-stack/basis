import eslint from 'gulp-eslint';
import gulp from 'gulp';

import constants from './constants';

const getSource = path => [`${path}${constants.globs.js}`, `${path}${constants.globs.jsx}`];

const lint = src => (

  gulp.src(src)
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failOnError())
);

export default (context) => {
  
  const lintAllDeps = context.hasPackages ?
    [constants.taskKeys.lintClient, constants.taskKeys.lintServer, constants.taskKeys.lintPackages] :
    [constants.taskKeys.lintClient, constants.taskKeys.lintServer];

  return [{

    /* Lint Client */
    key: constants.taskKeys.lintClient,
    func: () => lint(getSource(context.config.paths.client))
  }, {

    /* Lint Server */
    key: constants.taskKeys.lintServer,
    func: () => lint(getSource(context.config.paths.server))
  }, {

    /* Lint Packages */
    key: constants.taskKeys.lintPackages,
    func: () => lint(getSource(context.config.paths.packages))
  }, {

    /* Lint All */
    key: constants.taskKeys.lintAll,
    dependencies: lintAllDeps
  }];
};