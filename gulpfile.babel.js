import gulp from 'gulp';
import path from 'path';
import runSequence from 'run-sequence';
import { constants, getEnvSettings, initialiseTasks } from 'basis-build';

// import replace from 'gulp-replace';
// import merge from 'merge-stream';
// import install from 'gulp-install';
// import extReplace from 'gulp-ext-replace';
// import tar from 'gulp-tar';
// import gzip from 'gulp-gzip';
// import chmod from 'gulp-chmod';

import config from './config/gulp.config';
import webpackConfig from './config/webpack.config';

// TODO: Get from basis-build once published
// import { constants, getEnvSettings, initialiseTasks } from './packages/build';

const rootDir = __dirname;
const envSettings = getEnvSettings(path.join(rootDir, 'config'));

initialiseTasks(config, envSettings, webpackConfig, rootDir);

/* Copy server scripts */
// gulp.task('copy:server-scripts', () => {

//   const scriptsPath = './scripts';
//   let deployVariables = '';

//   Object.keys(envSettings)
//         .filter(env => env !== 'local' && env !== 'default')
//         .forEach((env) => {

//           deployVariables += `\n"${env}")\n` +
//                             `  DEPLOY_USER=${envSettings[env].deploy.deployUser}\n` +
//                             `  DEPLOY_HOST=${envSettings[env].deploy.deployHost}\n` +
//                             `  DEPLOY_LOCATION=${envSettings[env].deploy.deployDirectory}\n` +
//                             '  ;;\n';
//         });

//   const runtimeScripts = gulp.src([`${scriptsPath}/start.sh`, `${scriptsPath}/stop.sh`])
//                             .pipe(replace('%APPNAME%', envSettings.default.shared.appName))
//                             .pipe(replace('%FRONT_WITH_NGINX%', envSettings.default.server.frontWithNginx))
//                             .pipe(extReplace(''))
//                             .pipe(gulp.dest(config.paths.build))
//                             .pipe(print(getFilePathLogMessage));

//   const deployScript = gulp.src([`${scriptsPath}/deploy.sh`])
//                           .pipe(replace('%APPNAME%', envSettings.default.shared.appName))
//                           .pipe(replace('%DEPLOY_VARIABLES%', deployVariables))
//                           .pipe(extReplace(''))
//                           .pipe(chmod(0o755))
//                           .pipe(gulp.dest('./'))
//                           .pipe(print(getFilePathLogMessage));

//   return merge(runtimeScripts, deployScript);
// });

// gulp.task('copy:nginx-config', () => (

//   gulp.src(['./config/nginx.conf'])
//       .pipe(replace('%NGINX_LOCAL_PORT%', envSettings.production.server.webServerPort))
//       .pipe(replace('%NGINX_PUBLIC_PORT%', envSettings.production.server.publicPort))
//       .pipe(gulp.dest(`${config.paths.build}/config`))
//       .pipe(print(getFilePathLogMessage))
// ));

/* Build entire solution */
gulp.task('build', [constants.taskKeys.prepareBuild], (cb) => {

  runSequence('lint:all',
              ['create:env-settings', 'create:package-json', 'compile:server', 'compile:packages', 'copy:server:views', 'bundle:client', 'copy:fonts', 'sass:server'],
              cb);
});

// /* Install runtime dependencies */
// gulp.task('install:runtime-dependencies', () => (

//   gulp.src(`${config.paths.build}/package.json`)
//       .pipe(install())
// ));

// /* Package build artifacts */
// gulp.task('package', ['install:runtime-dependencies', 'copy:server-scripts'], () => {

//   const packageFileName = `${envSettings.default.shared.appName}.package.tar`;
//   logMessage('Creating ', `${config.paths.package}/${packageFileName}`);

//   // TODO: Exclude packages dir from package zip

//   return gulp.src([`${config.paths.build}/**/*`, `!${config.paths.build}/packages/**/*`])
//             .pipe(tar(packageFileName))
//             .pipe(gzip())
//             .pipe(gulp.dest(config.paths.package));
// });

/* Default gulp task */
gulp.task('default', ['build'], (cb) => {

});