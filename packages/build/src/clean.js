import del from 'del';
import fs from 'fs-extra';

import { logMessage } from './utilities';
import constants from './constants';

export default context => [{

  /* Clean existing build & package artifacts */
  key: constants.taskKeys.clean,
  func: (cb) => {

    del([context.config.paths.build, context.config.paths.package, './deploy']).then((paths) => {

      const pathsText = paths.length === 0 ? 'NONE' : paths.join(';\n                ');

      if (context.config.options.logFileNames) {
        logMessage('Deleted   ', pathsText);
      }

      cb();
    });
  }
}, {

  /* Prepare build directory */
  key: constants.taskKeys.prepareBuild,
  func: (cb) => {

    fs.ensureDirSync(context.config.paths.build);
    fs.ensureDirSync(`${context.config.paths.build}/config`);
    cb();
  }
}];