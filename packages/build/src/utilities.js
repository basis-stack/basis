import 'colors';
import fs from 'fs';
import gulpif from 'gulp-if';
import jsonfile from 'jsonfile';
import path from 'path';
import print from 'gulp-print';

export const runtimeDir = process.cwd();
export const logMessagePrefix = '         + ';
export const checkPath = dir => fs.existsSync(path.join(runtimeDir, dir));

export const getStaticDir = config => (

  config.paths.public !== undefined ?
    config.paths.public :
    `${config.paths.build}/public`
);

export const logMessage = (action, actionContext, theConsole = console) => {

  theConsole.log(`${logMessagePrefix}${action}${actionContext.magenta}`);
};

export const logFileWrite = config => {

  const getMessage = filepath => ` Writing ${filepath}`;

  return gulpif(config.options.logFileNames, print(getMessage));
};

export const writeJson = (config, filepath, object, callback) => {

  if (config.options.logFileNames) {

    logMessage('Creating ', filepath);
  }

  jsonfile.writeFile(filepath, object, { spaces: 2 }, err => {

    if (err) { throw err; }

    callback();
  });
};

export const sassOptions = {
  outputStyle: 'compact',
  includePaths: ['node_modules/']
};