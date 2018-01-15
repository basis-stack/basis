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

    const fileName = 'package.json';
    const sourcePath = path.join(context.rootDir, fileName);

    jsonfile.readFile(sourcePath, (readError, packageJson) => {

      if (readError) { throw readError; }

      const outputPackageJson = Object.assign(packageJson);
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
        'basis-testing',
        'history',
        'react',
        'react-dom',
        'react-redux',
        'react-router-dom',
        'react-router-redux',
        'redux'
      ];

      depsToNuke.forEach((d) => {

        delete outputPackageJson.dependencies[d];
      });

      // TODO: Add 'scripts' section with tweaked 'start', 'dev', 'production' scripts (for build dir)

      const targetPath = `${context.config.paths.build}/${fileName}`;

      writeJson(context.config, targetPath, outputPackageJson, cb);
    });
  }
}];