import { series, task } from 'gulp';
import { initialiseTasks } from 'basis-build';

const options = { logFileNames: true };
initialiseTasks(options);

// Default gulp task
task('default', series(['build:full']));
