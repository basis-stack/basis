import jsonfile from 'jsonfile';
import path from 'path';

import { writeJson } from './utilities';
import constants from './constants';

export default context => [{

  /* Prepare Environment settings file */
  key: constants.taskKeys.createEnvSettings,
  dependencies: [constants.taskKeys.prepareBuild],
  func: (cb) => {

    const outputSettings = Object.assign(context.envSettings);

    Object.keys(context.envSettings)
          .forEach((env) => {

            if (outputSettings[env].server !== undefined) {

              delete outputSettings[env].server.frontWithNginx;
              delete outputSettings[env].server.nodeRuntimeVersion;
            }

            if (outputSettings[env].deploy !== undefined) {

              delete outputSettings[env].deploy;
            }

            if (context.config.options.serverOnly) {

              delete outputSettings[env].client;
            }
          });

    const pathName = `${context.config.paths.build}/config/settings.json`;

    writeJson(context.config, pathName, outputSettings, cb);
  }
}, {

  /* Prepare package.json for the server / runtime */
  key: constants.taskKeys.createPackageJson,
  dependencies: [constants.taskKeys.prepareBuild],
  func: (cb) => {

    const outputPackageJson = Object.assign({}, context.packageJson);
    outputPackageJson.name = context.envSettings.default.shared.appName;
    delete outputPackageJson.devDependencies;
    delete outputPackageJson.scripts;
    delete outputPackageJson.homepage;
    delete outputPackageJson.bugs;
    delete outputPackageJson.license;
    delete outputPackageJson.author;
    delete outputPackageJson.keywords;
    delete outputPackageJson.repository;
    delete outputPackageJson.description;

    const depsToNuke = [
      'basis-client',
      'basis-testing',
      'history',
      'react',
      'react-dom',
      'react-redux',
      'react-router-dom',
      'react-router-redux',
      'redux',
      'redux-logger',
      'material-ui',
      'prop-types',
      'react-jss'
    ];

    depsToNuke.forEach((d) => {

      delete outputPackageJson.dependencies[d];
    });

    // TODO: Add 'scripts' section with tweaked 'start', 'dev', 'production' scripts (for build dir)

    const targetPath = `${context.config.paths.build}/package.json`;

    writeJson(context.config, targetPath, outputPackageJson, cb);
  }
}];