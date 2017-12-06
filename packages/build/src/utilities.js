import colors from 'colors';
import gulpif from 'gulp-if';
import print from 'gulp-print';

export const logMessagePrefix = '         + ';

export const logMessage = (action, context, theConsole = console) => {

  theConsole.log(`${logMessagePrefix}${action}${context.magenta}`);
};

export const logFileWrite = (config) => {

  const getMessage = filepath => ` Writing ${filepath}`;

  return gulpif(config.options.logFileNames, print(getMessage));
};