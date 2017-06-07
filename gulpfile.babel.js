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

import config from './config/gulp.config';
import getEnvSettings from './config/settings';

const logMessagePrefix = '         + ';
const envSettings = getEnvSettings();

function logMessage(action, context) {

  console.log(`${logMessagePrefix}${action}${context.magenta}`);
}

function getFilePathLogMessage(filepath) {

  return `Writing  ${filepath}`;
}

/* Clean existing build & package artifacts */
gulp.task('clean', (cb) => {

  del([config.paths.build, config.paths.package]).then((paths) => {

    const pathsText = paths.length === 0 ? 'NONE' : paths.join(';\n                ');
    logMessage('Deleted   ', pathsText);
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
gulp.task('server-scripts', (cb) => {

  // TODO: Rethink this stuff given new env settings mechanism

  // if (envSettings.env !== 'local') {

  //   gulp.src('./scripts/*.sh')
  //       .pipe(print(getFilePathLogMessage))
  //       .pipe(replace('%APPNAME%', envSettings.appName))
  //       .pipe(replace('%ENVIRONMENT%', envSettings.env))
  //       .pipe(replace('%DEPLOY_USER%', envSettings.deployUser))
  //       .pipe(replace('%DEPLOY_HOST%', envSettings.deployHost))
  //       .pipe(replace('%DEPLOY_LOCATION%', envSettings.deployDirectory))
  //       .pipe(replace('%NODE_RUNTIME_ENV%', envSettings.nodeRuntimeVersion))
  //       .pipe(replace('%FRONT_WITH_NGINX%', envSettings.frontWithNginx))
  //       .pipe(gulp.dest(`${config.paths.build}/scripts`));
  //   cb();
  // }

  cb();
});

/* Prepare Environment settings file */
gulp.task('environment-settings', (cb) => {

  const outputSettings = Object.assign(envSettings);

  Object.keys(envSettings)
        .forEach((env) => {

          delete outputSettings[env].frontWithNginx;
          delete outputSettings[env].nodeRuntimeVersion;
          delete outputSettings[env].deployUser;
          delete outputSettings[env].deployHost;
          delete outputSettings[env].deployDirectory;
        });

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

  jsonfile.readFile(`./${fileName}`, (readError, packageJson) => {

    if (readError) { throw readError; }

    const outputPackageJson = Object.assign(packageJson);
    outputPackageJson.name = envSettings.default.appName;
    delete outputPackageJson.devDependencies;
    delete outputPackageJson.scripts;
    delete outputPackageJson.homepage;
    delete outputPackageJson.bugs;
    delete outputPackageJson.license;
    delete outputPackageJson.author;
    delete outputPackageJson.keywords;
    delete outputPackageJson.repository;
    delete outputPackageJson.description;

    const pathName = `${config.paths.build}/${fileName}`;
    logMessage('Creating ', pathName);

    jsonfile.writeFile(pathName, outputPackageJson, { spaces: 2 }, (writeError) => {

      if (writeError) { throw writeError; }
      cb();
    });
  });
});

/* Compile server-side app and environmentalise the bootup module */
gulp.task('compile-app', () => {

  const startupDestFileName = `start_${envSettings.default.appName}`;
  const startupDestDir = `${config.paths.build}/app/bin/`;
  logMessage('Creating ', `${startupDestDir}${startupDestFileName}`);

  const startupFileStream = gulp.src(`${config.paths.app}/bin/startup.js`)
                                .pipe(rename(startupDestFileName))
                                .pipe(babel())
                                .pipe(gulp.dest(`${startupDestDir}`));

  const appFilesStream = gulp.src(`${config.paths.app}/**/*.js`)
                             .pipe(filter(['**/*.js', '!**/startup.js', '!**/*Spec.js', '!**/specAliases.js', '!**/specAssertions.js', '!**/fakes.js']))
                             .pipe(babel())
                             .pipe(gulp.dest(`${config.paths.build}/app`))
                             .pipe(print(getFilePathLogMessage));

  return merge(startupFileStream, appFilesStream);
});

/* Copy server-side views */
gulp.task('views', () => {

  const viewsExtension = '*.hbs';

  return gulp.src(`${config.paths.app}/**/${viewsExtension}`)
             .pipe(gulp.dest(`${config.paths.build}/app`))
             .pipe(print(getFilePathLogMessage));
});

/* Lint */
gulp.task('lint', () => {

  const lintStream = gulp.src(`${config.paths.app}/**/*.js`)
                         .pipe(eslint())
                         .pipe(eslint.format())
                         .pipe(eslint.failOnError());

  return lintStream;
});

/* Build entire solution */
gulp.task('build', (cb) => {

  runSequence('prepare-build',
              'lint',
              [/* 'server-scripts', */'environment-settings', 'package-json', 'compile-app', 'views'],
              cb);
});

/* Package build artifacts */
gulp.task('package', () => {

  const packageFileName = `${envSettings.appName}.package.${envSettings.env}.zip`;
  logMessage('Creating ', `${config.paths.package}/${packageFileName}`);

  return gulp.src(`${config.paths.build}/**/*`, { dot: true })
             .pipe(zip(packageFileName))
             .pipe(gulp.dest(config.paths.package));
});

/* Default gulp task */
gulp.task('default', ['build'], (cb) => {

});