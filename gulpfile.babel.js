import gulp from 'gulp';
import del from 'del';
// TODO: Replace with chalk !!
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
import concat from 'gulp-concat';

import config from './config/gulp.config';
import getEnvSettings from './config/settings';

const logMessagePrefix = '         + ';
const envSettings = getEnvSettings();

const logMessage = (action, context) => {

  console.log(`${logMessagePrefix}${action}${context.magenta}`);
};

const getFilePathLogMessage = filepath => ` Writing ${filepath}`;

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

  fs.mkdirSync(config.paths.build);
  cb();
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

gulp.task('nginx-config', () => (

  gulp.src('./config/nginx.conf')
      .pipe(print(getFilePathLogMessage))
      .pipe(replace('%NGINX_LOCAL_PORT%', envSettings.production.webServerPort))
      .pipe(replace('%NGINX_PUBLIC_PORT%', envSettings.production.publicPort))
      .pipe(gulp.dest(`${config.paths.build}/config`))
));

/* Prepare Environment settings file */
gulp.task('environment-settings', ['nginx-config'], (cb) => {

  const outputSettings = Object.assign(envSettings);

  Object.keys(envSettings)
        .forEach((env) => {

          delete outputSettings[env].frontWithNginx;
          delete outputSettings[env].nodeRuntimeVersion;
          delete outputSettings[env].deployUser;
          delete outputSettings[env].deployHost;
          delete outputSettings[env].deployDirectory;
        });

  const pathName = `${config.paths.build}/config/settings.json`;
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

    // TODO: Add 'scripts' section with tweaked 'start', 'dev', 'production' scripts (for build dir)

    const pathName = `${config.paths.build}/${fileName}`;
    logMessage('Creating ', pathName);

    jsonfile.writeFile(pathName, outputPackageJson, { spaces: 2 }, (writeError) => {

      if (writeError) { throw writeError; }
      cb();
    });
  });
});

/* Compile server-side app */
gulp.task('compile-app', () => {

  const startupDestFileName = `start_${envSettings.default.appName}`;
  const startupDestDir = `${config.paths.build}/server/bin/`;
  logMessage('Creating ', `${startupDestDir}${startupDestFileName}`);

  const startupFileStream = gulp.src(`${config.paths.server}/bin/startup.js`)
                                .pipe(rename(startupDestFileName))
                                .pipe(babel())
                                .pipe(gulp.dest(`${startupDestDir}`));

  const appFilesStream = gulp.src([`${config.paths.server}/**/*.js`, `${config.paths.server}/**/*.jsx`])
                             .pipe(filter(['**/*.js', '**/*.jsx', '!**/startup.js']))
                             .pipe(babel())
                             .pipe(gulp.dest(`${config.paths.build}/server`))
                             .pipe(print(getFilePathLogMessage));

  return merge(startupFileStream, appFilesStream);
});

/* Copy server-side views */
gulp.task('views', () => {

  const viewsExtension = '*.ejs';

  return gulp.src(`${config.paths.server}/**/${viewsExtension}`)
             .pipe(gulp.dest(`${config.paths.build}/server`));
             // .pipe(print(getFilePathLogMessage));
});

/* Concat and copy vendor assets (fonts, styles, scripts) to static */
gulp.task('vendor-assets', () => {

  const fontsStream = gulp.src(config.vendor.fonts)
                          .pipe(gulp.dest(`${config.paths.build}/static/fonts/`));
                          // .pipe(print(getFilePathLogMessage));

  const stylesStream = gulp.src(config.vendor.styles)
                           .pipe(replace('url(\'../../fonts/Roboto', 'url(\'../fonts'))
                           .pipe(concat('server-vendor.css'))
                           .pipe(gulp.dest(`${config.paths.build}/static/styles`));
                           // .pipe(print(getFilePathLogMessage));

  return merge(fontsStream, stylesStream);
});

/* Lint */
gulp.task('lint', () => (

  gulp.src([`${config.paths.server}/**/*.js`, `${config.paths.server}/**/*.jsx`, `${config.paths.tests}/**/*.js`])
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failOnError())
));

/* Build entire solution */
gulp.task('build', ['prepare-build'], (cb) => {

  runSequence('lint',
              ['environment-settings', 'package-json', 'compile-app', 'views', 'vendor-assets'],
              cb);
});

/* Package build artifacts */
// TODO: Add server-scrips as dependency here
gulp.task('package', () => {

  const packageFileName = `${envSettings.default.appName}.package.zip`;
  logMessage('Creating ', `${config.paths.package}/${packageFileName}`);

  return gulp.src(`${config.paths.build}/**/*`, { dot: true })
             .pipe(zip(packageFileName))
             .pipe(gulp.dest(config.paths.package));
});

/* Default gulp task */
gulp.task('default', ['build'], (cb) => {

});