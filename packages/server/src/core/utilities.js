import fs from 'fs';
import path from 'path';
import relative from 'require-relative';

export const getRootPath = () => {

  const distDir = 'dist';
  const processDir = process.cwd();
  const hasDist = fs.readdirSync(processDir)
                    .find(f => f === distDir) !== undefined;

  return hasDist ? path.join(processDir, distDir) : processDir;
};

export const dynamicImport = (moduleName, basePath = getRootPath()) => relative(moduleName, basePath);

export const terminate = (exitCode = 1) => { process.exit(exitCode); };

export const getEnvVariable = (key, defaultValue) => {

  if (process.env[key] !== undefined) {
    return process.env[key];
  }

  return defaultValue;
};