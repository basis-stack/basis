import jsonfile from 'jsonfile';
import path from 'path';

import { logMessage } from './utilities';
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
          });

    const pathName = `${context.config.paths.build}/config/settings.json`;

    if (context.config.options.logFileNames) {
      logMessage('Creating ', pathName);
    }

    jsonfile.writeFile(pathName, outputSettings, { spaces: 2 }, (err) => {

      if (err) { throw err; }

      cb();
    });
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

      // TODO: Add 'scripts' section with tweaked 'start', 'dev', 'production' scripts (for build dir)

      const targetPath = `${context.config.paths.build}/${fileName}`;

      if (context.config.options.logFileNames) {
        logMessage('Creating ', targetPath);
      }

      jsonfile.writeFile(targetPath, outputPackageJson, { spaces: 2 }, (writeError) => {

        if (writeError) { throw writeError; }

        cb();
      });
    });
  }
}];