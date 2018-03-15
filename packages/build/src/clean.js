import del from 'del';
import fs from 'fs-extra';

import { logMessage } from './utilities';
import constants from './constants';

export default ({ config }) => [{

  /* Clean existing build & package artifacts */
  key: constants.taskKeys.clean,
  func: (cb) => {

    const pathsToNuke = [
      config.paths.build,
      config.paths.publish,
      config.paths.temp,
      './deploy'
    ];

    del(pathsToNuke).then((paths) => {

      if (config.options.logFileNames) {

        const pathsText = paths.length === 0 ? 'NONE' : paths.join('\n                    ');
        logMessage('Deleted  ', pathsText);
      }

      cb();
    });
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

    const pathsToNuke = [config.paths.temp];

    del(pathsToNuke).then((paths) => {

      if (config.options.logFileNames) {

        const pathsText = paths.length === 0 ? 'NONE' : paths.join('\n                    ');
        logMessage('Cleaned   ', pathsText);
      }

      cb();
    });
  }
}];