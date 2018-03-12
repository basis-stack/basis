import runSequence from 'run-sequence';

import constants from './constants';

const keys = constants.taskKeys;

export default (context) => { 

  const tasks = [{

    /* Lint server code and build all Server artifacts to dist/ folder */
    key: keys.buildServer,
    dependencies: [
      keys.createEnvSettings,
      keys.createPackageJson,
      keys.compileServer,
      keys.copyServerViews,
      keys.copyFonts,
      keys.sassServer
    ]
  }, {

    /* Lint client code and bundle all code, dependencies and artifacts to bundle.js */
    key: keys.buildClient,
    dependencies: [
      keys.bundleClient
    ]
  }, {

    /* Lint packages code and compile all to dist/packages */
    key: keys.buildPackages,
    dependencies: [keys.compilePackages]
  }, {

    /* Lint and build everything */
    key: keys.buildAll,
    dependencies: []
  }, {

    /* Full clean and rebuild everything */
    key: keys.buildFull,
    func: (cb) => {

      runSequence(keys.clean, keys.buildAll, keys.finalise, cb);
    }
  }, {

    /* Incremental build of everything */
    key: keys.buildIncremental,
    func: (cb) => {

      runSequence(keys.buildAll, cb);
    }
  }, {

    /* Build only static assets (for public folder) */
    key: keys.buildStatic,
    dependencies: [keys.copyFonts, keys.sassServer ]
  }];

  const buildAllDeps = tasks[3].dependencies;

  if (context.hasServer) {
    
    buildAllDeps.push(constants.taskKeys.buildServer);
  } else {

    buildAllDeps.push(constants.taskKeys.copyFonts);
    buildAllDeps.push(constants.taskKeys.sassServer);
  }

  if (context.hasClient) {

    buildAllDeps.push(constants.taskKeys.buildClient);
  }

  if (context.hasPackages) {
    
    buildAllDeps.push(constants.taskKeys.buildPackages);
  }

  return tasks;
};