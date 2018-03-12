import colors from 'colors';
import gulpif from 'gulp-if';
import jsonfile from 'jsonfile';
import print from 'gulp-print';

export const logMessagePrefix = '         + ';

export const getStaticDir = context => (
  
  context.config.paths.public != undefined ?
    context.config.paths.public :
    `${context.config.paths.build}/public`
);

export const logMessage = (action, context, theConsole = console) => {

  theConsole.log(`${logMessagePrefix}${action}${context.magenta}`);
};

export const logFileWrite = (config) => {

  const getMessage = filepath => ` Writing ${filepath}`;

  return gulpif(config.options.logFileNames, print(getMessage));
};

export const writeJson = (config, path, object, callback) => {

  if (config.options.logFileNames) {

    logMessage('Creating ', path);
  }

  jsonfile.writeFile(path, object, { spaces: 2 }, (err) => {

    if (err) { throw err; }

    callback();
  });
};

export const sassOptions = {
  outputStyle: 'compact',
  includePaths: ['node_modules/']
};