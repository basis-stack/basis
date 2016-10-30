import gulp from 'gulp';
import del from 'del';
import colors from 'colors';
import replace from 'gulp-replace';
import runSequence from 'run-sequence';
import fs from 'fs';
import zip from 'gulp-zip';
import rename from 'gulp-rename';
import babel from 'gulp-babel';
import merge from 'merge-stream';
import filter from 'gulp-filter';
import print from 'gulp-print';
import eslint from 'gulp-eslint';
import jsonfile from 'jsonfile';

import { default as config } from './config/gulp.config';
import { default as envSettings } from './config/settings';

const logMessagePrefix = '         + ';

console.log(`${'[initiate]'.yellow} Creating artifacts for app name: ${envSettings.appName.magenta}`);

function logMessage(action, context) {

   console.log(`${logMessagePrefix}${action}${context.magenta}`);
}

function getFilePathLogMessage(filepath) {

   return `Writing   ${filepath}`;
}

/* Clean existing build & package artifacts */
gulp.task('clean', (cb) => {

   del([config.paths.build, config.paths.package]).then((paths) => {
      const pathsText = paths.length === 0 ? 'NONE' : paths.join(';\n                    ');
      logMessage('Deleted  ', pathsText);
      cb();
   });
});

/* Prepare build directory */
gulp.task('prepare-build', ['clean'], (cb) => {

   fs.mkdir(config.paths.build, (err) => {

      if (err) { throw err; }
      cb();
   });
});


/* Copy server scripts */
gulp.task('server-scripts', () => {

   if (envSettings.envName !== 'local') {

      gulp.src('./scripts/*.sh')
          .pipe(print(getFilePathLogMessage))
          .pipe(replace('%APPNAME%', envSettings.appName))
          .pipe(replace('%ENVIRONMENT%', envSettings.envName))
          .pipe(replace('%DEPLOY_USER%', envSettings.deployUser))
          .pipe(replace('%DEPLOY_HOST%', envSettings.deployHost))
          .pipe(replace('%DEPLOY_LOCATION%', envSettings.deployDirectory))
          .pipe(replace('%NODE_RUNTIME_ENV%', envSettings.nodeRuntimeVersion))
          .pipe(replace('%FRONT_WITH_NGINX%', envSettings.frontWithNginx))
          .pipe(gulp.dest(`${config.paths.build}/scripts`));
   }
});

/* Prepare Environment settings file */
gulp.task('environment-settings', (cb) => {

   const outputSettings = Object.assign(envSettings);
   delete outputSettings.frontWithNginx;
   delete outputSettings.nodeRuntimeVersion;
   delete outputSettings.deployUser;
   delete outputSettings.deployHost;
   delete outputSettings.deployDirectory;

   const pathName = `${config.paths.build}/settings.json`;
   logMessage('Creating ', pathName);

   jsonfile.writeFile(pathName, outputSettings, { spaces: 2 }, (err) => {

      if (err) { throw err; }
      cb();
   });
});

/* Prepare package.json for the server / runtime */
gulp.task('package-json', (cb) => {

   const fileName = 'package.json';

   jsonfile.readFile(`./${fileName}`, (err, packageJson) => {

      if (err) { throw err; }

      packageJson.name = envSettings.appName;
      delete packageJson.devDependencies;
      delete packageJson.scripts;
      delete packageJson.homepage;
      delete packageJson.bugs;
      delete packageJson.license;
      delete packageJson.author;
      delete packageJson.keywords;
      delete packageJson.repository;
      delete packageJson.description;

      const pathName = `${config.paths.build}/${fileName}`;
      logMessage('Creating ', pathName);

      jsonfile.writeFile(pathName, packageJson, { spaces: 2 }, (err) => {

         if (err) { throw err; }
         cb();
      });
   });
});

/* Compile server-side app and environmentalise the bootup module */
gulp.task('compile-app', () => {

   const startupDestFileName = `${envSettings.appName}_${envSettings.envName}`;
   const startupDestDir = `${config.paths.build}/app/bin/`;
   logMessage('Creating ', `${startupDestDir}${startupDestFileName}`);

   const startupFileStream = gulp.src(`${config.paths.app}/bin/startup.js`)
                                 .pipe(rename(startupDestFileName))
                                 .pipe(babel())
                                 .pipe(gulp.dest(`${startupDestDir}`));

   const appFilesStream = gulp.src(`${config.paths.app}/**/*.js`)
                              .pipe(filter(['**/*.js', '!**/startup.js', '!**/*Spec.js', '!**/specConstructs.js']))
                              .pipe(babel())
                              .pipe(gulp.dest(`${config.paths.build}/app`))
                              .pipe(print(getFilePathLogMessage));

   return merge(startupFileStream, appFilesStream);
});

/* Lint */
gulp.task('lint', () => {

   return gulp.src(`${config.paths.app}/**/*.js`)
              .pipe(eslint())
              .pipe(eslint.format())
              .pipe(eslint.failOnError());
});

/* Build entire solution */
gulp.task('build', (cb) => {

   runSequence('prepare-build',
               'lint',
               ['server-scripts', 'environment-settings', 'package-json', 'compile-app'],
               cb);
});

/* Package build artifacts */
gulp.task('package', () => {

   const packageFileName = `${envSettings.appName}.package.${envSettings.envName}.zip`;
   logMessage('Creating ', `${config.paths.package}/${packageFileName}`);

   return gulp.src(`${config.paths.build}/**/*`, { dot: true })
              .pipe(zip(packageFileName))
              .pipe(gulp.dest(config.paths.package));
});

/* Default gulp task */
gulp.task('default', ['build'], (cb) => {

});