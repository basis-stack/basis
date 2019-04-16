import del from 'del';
import fs from 'fs-extra';
import path from 'path';

import { logMessage, runtimeDir } from './../utilities';
import constants from './constants';
import { getDefaultBuildConfig } from './../config';

const packagesPath = 'packages';
const deletePaths = (logFileNames, paths, completePrefix = 'Deleted  ') => (

  del(paths).then((dpa) => {

    if (logFileNames) {

      const pathsText = dpa.length === 0 ? 'NONE' : dpa.join('\n                    ');
      logMessage(completePrefix, pathsText);
    }
  })
);

export const cleanPackages = (config = getDefaultBuildConfig(), cb) => {

  const pathsToNuke = fs.readdirSync(path.join(runtimeDir, packagesPath))
                        .map(p => `./${packagesPath}/${p}/dist`);

  deletePaths(config.options.logFileNames, pathsToNuke)
    .then(cb);
};

export default ({ config }) => [{

  /* Clean existing build & package artifacts */
  key: constants.taskKeys.clean,
  func: (cb) => {

    const pathsToNuke = [config.paths.build, config.paths.publish, config.paths.temp, './deploy'];

    deletePaths(config.options.logFileNames, pathsToNuke)
      .then(cb);
  }
}, {

  /* Prepare build directory(s) */
  key: constants.taskKeys.prepareBuild,
  func: (cb) => {

    const pathsToPrepare = [
      config.paths.build,
      `${config.paths.build}/config`,
      config.paths.temp
    ];

    pathsToPrepare.forEach((p) => { fs.ensureDirSync(p); });
    cb();
  }
}, {

  /* Finalise the build by deleting any temp resources */
  key: constants.taskKeys.finalise,
  func: (cb) => {

    deletePaths(config.options.logFileNames, [config.paths.temp], 'Cleaned   ')
      .then(cb);
  }
}];