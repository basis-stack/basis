import gulp from 'gulp';
import path from 'path';

import { getEnvSettings, initialiseTasks } from 'basis-build';
// import { getEnvSettings, initialiseTasks } from './packages/build';

import config from './config/build.config';
import webpackConfig from './config/webpack.config';

const rootDir = __dirname;
const envSettings = getEnvSettings(path.join(rootDir, 'config'));
const tasks = initialiseTasks(config, envSettings, webpackConfig, rootDir);

// gulp.task('copy:nginx-config', () => (

//   gulp.src(['./config/nginx.conf'])
//       .pipe(replace('%NGINX_LOCAL_PORT%', envSettings.production.server.webServerPort))
//       .pipe(replace('%NGINX_PUBLIC_PORT%', envSettings.production.server.publicPort))
//       .pipe(gulp.dest(`${config.paths.build}/config`))
//       .pipe(print(getFilePathLogMessage))
// ));

/* Default gulp task */
gulp.task('default', [tasks.buildFull]);
