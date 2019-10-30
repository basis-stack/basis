import fs from 'fs';
import path from 'path';

import constants from './constants';
import { dynamicImport, getRootPath } from './utilities';

const getModule = (key, logger) => {

  let module;

  try {

    module = dynamicImport(`./modules/${key}`).default;

    if (module.initRoutes === undefined && module.initChannels === undefined) {

      // TODO: Should we warn or should we error ??
      logger.warn(`${constants.text.logging.startupPrefix} INVALID_MODULE: unable to initialise module '${key}'. No init methods found.`);
      module = undefined;
    }
  } catch (err) {

    // TODO: As per above, should we warn or should we error ??
    logger.warn(`${constants.text.logging.startupPrefix} INVALID_MODULE: unable to import module '${key}'. Error: ${err.message}`);
  }

  return module === undefined ? undefined : { key, ...module };
};

export default container => {

  const logger = container.resolve(container.instanceKeys.logger);
  const modulesPath = 'modules';

  const modules = fs.readdirSync(path.join(getRootPath(), modulesPath))
                    .map(key => getModule(key, logger));

  return modules.filter(m => m !== undefined);
};