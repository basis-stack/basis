import gulp from 'gulp';
import { initialiseTasks } from 'basis-build';

import config from './config/build.config';
import packageJson from './package.json';
import webpackConfig from './config/webpack.config';

const tasks = initialiseTasks(config, packageJson, webpackConfig);

// gulp.task('copy:nginx-config', () => (

//   gulp.src(['./config/nginx.conf'])
//       .pipe(replace('%NGINX_LOCAL_PORT%', envSettings.production.server.webServerPort))
//       .pipe(replace('%NGINX_PUBLIC_PORT%', envSettings.production.server.publicPort))
//       .pipe(gulp.dest(`${config.paths.build}/config`))
//       .pipe(print(getFilePathLogMessage))
// ));

/* Default gulp task */
gulp.task('default', [tasks.buildFull]);