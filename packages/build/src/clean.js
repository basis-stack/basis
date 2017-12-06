import del from 'del';
import fs from 'fs';

import { logMessage } from './utilities';
import constants from './constants';

export default context => [{

  /* Clean existing build & package artifacts */
  key: constants.taskKeys.clean,
  dependencies: null,
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
  dependencies: [constants.taskKeys.clean],
  func: (cb) => {

    fs.mkdirSync(context.config.paths.build);
    fs.mkdirSync(`${context.config.paths.build}/config`);
    cb();
  }
}];