import colors from 'colors';

export const logMessagePrefix = '         + ';

export const logMessage = (action, context, theConsole = console) => {

  theConsole.log(`${logMessagePrefix}${action}${context.magenta}`);
};

export const getFilePathLogMessage = filepath => ` Writing ${filepath}`;