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

    /* Lint and build everything */
    key: keys.buildAll,
    dependencies: context.config.options.serverOnly ?
      [keys.buildServer] :
      [keys.buildServer, keys.buildClient]
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
  }];

  if (context.hasPackages && !context.config.options.serverOnly) {

    tasks.push({

      /* Lint packages code and compile all to dist/packages */
      key: keys.buildPackages,
      dependencies: [keys.compilePackages]
    });

    tasks[2].dependencies.push(keys.buildPackages);
  }

  return tasks;
};