/* eslint-disable global-require */
export const dynamicImport = (moduleName, basePath = './../') => require(`${basePath}${moduleName}`);
/* eslint-enable global-require */

export const terminate = (exitCode = 1) => { process.exit(exitCode); };