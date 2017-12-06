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

export default context => [{

  /* Lint Client */
  key: constants.taskKeys.lintClient,
  dependencies: null,
  func: () => lint(getSource(context.config.paths.client))
}, {

  /* Lint Server */
  key: constants.taskKeys.lintServer,
  dependencies: null,
  func: () => lint(getSource(context.config.paths.server))
}, {

  /* Lint Packages */
  key: constants.taskKeys.lintPackages,
  dependencies: null,
  func: () => lint(getSource(context.config.paths.packages))
}, {

  /* Lint All */
  key: constants.taskKeys.lintAll,
  dependencies: [constants.taskKeys.lintClient, constants.taskKeys.lintServer, constants.taskKeys.lintPackages],
  func: () => {}
}];