import childProcessPromise from 'child-process-promise';
import fs from 'fs';
import jsonfile from 'jsonfile';
import path from 'path';

import { runtimeDir } from '../utilities';

const logMessagePrefix = '         + ';

export const exec = childProcessPromise.exec;
export const packagesPath = 'packages';

export const logMessage = (message, success = false) => {

  console.log(`${logMessagePrefix}${success ? 'Success:'.green : 'Info:'.cyan} ${message}`);
};

export const getPackages = () => (

  fs.readdirSync(path.join(runtimeDir, packagesPath))
    .map((p) => {

      const packageJson = jsonfile.readFileSync(path.join(runtimeDir, `${packagesPath}/${p}/package.json`));

      return {
        dir: p,
        name: packageJson.name,
        version: packageJson.version
      };
    })
);