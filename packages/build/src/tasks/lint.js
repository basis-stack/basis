import constants from './constants';
import lint from './getLinter';

export default ({ hasServer, hasClient, hasPackages, config }) => {

  const lintAllDeps = [];

  if (hasServer) {

    lintAllDeps.push(constants.taskKeys.lintServer);
  }

  if (hasClient) {

    lintAllDeps.push(constants.taskKeys.lintClient);
  }

  if (hasPackages) {

    lintAllDeps.push(constants.taskKeys.lintPackages);
  }

  return [{

    /* Lint Client */
    key: constants.taskKeys.lintClient,
    func: () => lint(config.paths.client)
  }, {

    /* Lint Server */
    key: constants.taskKeys.lintServer,
    func: () => lint(config.paths.server)
  }, {

    /* Lint Packages */
    key: constants.taskKeys.lintPackages,
    func: () => lint('./packages')
  }, {

    /* Lint All */
    key: constants.taskKeys.lintAll,
    dependencies: lintAllDeps
  }];
};