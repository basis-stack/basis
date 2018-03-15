import jsonfile from 'jsonfile';
import path from 'path';

import { writeJson } from './utilities';
import constants from './constants';

export default ({ hasServer, hasClient, envSettings, config, packageJson }) => {

  if (!hasServer) {

    return [];
  }

  return [{

    /* Prepare Environment settings file */
    key: constants.taskKeys.createEnvSettings,
    dependencies: [constants.taskKeys.prepareBuild],
    func: (cb) => {

      const outputSettings = Object.assign(envSettings);

      Object.keys(envSettings)
            .forEach((env) => {

              if (outputSettings[env].server !== undefined) {

                delete outputSettings[env].server.frontWithNginx;
                delete outputSettings[env].server.nodeRuntimeVersion;
              }

              if (outputSettings[env].deploy !== undefined) {

                delete outputSettings[env].deploy;
              }

              if (!hasClient) {

                delete outputSettings[env].client;
              }
            });

      const pathName = `${config.paths.build}/config/settings.json`;

      writeJson(config, pathName, outputSettings, cb);
    }
  }, {

    /* Prepare package.json for the server / runtime */
    key: constants.taskKeys.createPackageJson,
    dependencies: [constants.taskKeys.prepareBuild],
    func: (cb) => {

      const outputPackageJson = Object.assign({}, packageJson);
      outputPackageJson.name = envSettings.default.shared.appName;
      delete outputPackageJson.devDependencies;
      delete outputPackageJson.scripts;
      delete outputPackageJson.homepage;
      delete outputPackageJson.bugs;
      delete outputPackageJson.license;
      delete outputPackageJson.author;
      delete outputPackageJson.keywords;
      delete outputPackageJson.repository;
      delete outputPackageJson.description;
      delete outputPackageJson.private;
      delete outputPackageJson.workspaces;

      const depsToNuke = [
        'basis-client',
        'basis-components',
        'basis-testing',
        'history',
        'react',
        'react-dom',
        'react-jss',
        'react-redux',
        'react-router-dom',
        'react-router-redux',
        'redux',
        'redux-logger',
        'redux-thunk',
        'material-ui',
        'prop-types',
        'react-jss'
      ];

      depsToNuke.forEach((d) => {

        delete outputPackageJson.dependencies[d];
      });

      // TODO: Add 'scripts' section with tweaked 'start', 'dev', 'production' scripts (for build dir)

      const targetPath = `${config.paths.build}/package.json`;

      writeJson(config, targetPath, outputPackageJson, cb);
    }
  }];
};