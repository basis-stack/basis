import { series, task } from 'gulp';
import { initialiseTasks } from 'basis-build';

const options = { logFileNames: true, lint: true };
const tasks = initialiseTasks(options);

// Default gulp task
// task('default', series([tasks.buildFull]));