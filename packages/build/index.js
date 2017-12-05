import gulp from 'gulp';

import getCleanTasks from './src/clean';

export { default as constants } from './src/constants';
export { default as getEnvSettings } from './src/settings';
export { logMessage, getFilePathLogMessage } from './src/utilities';

export const initialiseTasks = (config) => {

  // TODO: Scale this for all task files !!!
  const cleanTasks = getCleanTasks(config);

  cleanTasks.forEach((t) => {

    if (t.dependencies) {

      gulp.task(t.key, t.dependencies, t.func);
    } else {

      gulp.task(t.key, t.func);
    }
  });
};