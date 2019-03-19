import gulp from 'gulp';
import { initialiseTasks } from 'basis-build';

const options = { logFileNames: false };
const tasks = initialiseTasks(options);

// Default gulp task
gulp.task('default', [tasks.buildFull]);