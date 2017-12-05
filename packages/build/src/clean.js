import del from 'del';
import fs from 'fs';

import { logMessage } from './utilities';
import constants from './constants';

export default config => [{

  /* Clean existing build & package artifacts */
  key: constants.taskKeys.clean,
  dependencies: null,
  func: (cb) => {

    del([config.paths.build, config.paths.package, './deploy']).then((paths) => {

      const pathsText = paths.length === 0 ? 'NONE' : paths.join(';\n                ');
      logMessage('Deleted   ', pathsText);
      cb();
    });
  }
}, {

  /* Prepare build directory */
  key: constants.taskKeys.prepareBuild,
  dependencies: [constants.taskKeys.clean],
  func: (cb) => {

    fs.mkdirSync(config.paths.build);
    fs.mkdirSync(`${config.paths.build}/config`);
    cb();
  }
}];