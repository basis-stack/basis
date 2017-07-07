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
import webpack from 'webpack';
import util from 'gulp-util';
import sass from 'gulp-sass';

import config from './config/gulp.config';
import getEnvSettings from './config/settings';
import webpackConfig from './config/webpack.config';

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
gulp.task('prepare:build', ['clean'], (cb) => {

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

gulp.task('copy:nginx-config', () => (

  gulp.src(['./config/nginx.conf'])
      .pipe(replace('%NGINX_LOCAL_PORT%', envSettings.production.webServerPort))
      .pipe(replace('%NGINX_PUBLIC_PORT%', envSettings.production.publicPort))
      .pipe(gulp.dest(`${config.paths.build}/config`))
      .pipe(print(getFilePathLogMessage))
));

/* Prepare Environment settings file */
gulp.task('create:env-settings', ['copy:nginx-config'], (cb) => {

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
gulp.task('create:package-json', (cb) => {

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
gulp.task('compile:server', () => {

  const startupDestFileName = `start_${envSettings.default.appName}`;
  const startupDestDir = `${config.paths.build}/bin/`;

  const startupFileStream = gulp.src(`${config.paths.server}/bin/startup.js`)
                                .pipe(rename(startupDestFileName))
                                .pipe(babel())
                                .pipe(gulp.dest(`${startupDestDir}`))
                                .pipe(print(getFilePathLogMessage));

  const appFilesStream = gulp.src([`${config.paths.server}/**/*.js`, `${config.paths.server}/**/*.jsx`])
                             .pipe(filter(['**/*.js', '**/*.jsx', '!**/startup.js']))
                             .pipe(babel())
                             .pipe(gulp.dest(`${config.paths.build}`))
                             .pipe(print(getFilePathLogMessage));

  return merge(startupFileStream, appFilesStream);
});

/* Copy server-side views */
gulp.task('copy:views', () => {

  const viewsExtension = '*.ejs';

  return gulp.src(`${config.paths.server}/**/${viewsExtension}`)
             .pipe(gulp.dest(`${config.paths.build}`))
             .pipe(print(getFilePathLogMessage));
});

/* Concat and copy vendor assets (fonts, styles, scripts) to static */
gulp.task('copy:fonts', () => (

  gulp.src(config.vendor.fonts)
      .pipe(gulp.dest(`${config.paths.build}/public/fonts/`))
));

gulp.task('sass:server', () => {

  const options = {
    outputStyle: 'compact',
    includePaths: ['node_modules/']
  };

  const vendorStream = gulp.src(`${config.paths.server}/assets/styles/vendors.scss`)
                           .pipe(sass(options).on('error', sass.logError))
                           .pipe(replace('/Roboto/', '/'))
                           .pipe(rename('server-vendor.css'))
                           .pipe(gulp.dest(`${config.paths.build}/public/styles`));

  const contentStream = gulp.src(`${config.paths.server}/assets/styles/main.scss`)
                            .pipe(sass(options).on('error', sass.logError))
                            .pipe(rename('server.css'))
                            .pipe(gulp.dest(`${config.paths.build}/public/styles`));

  return merge(vendorStream, contentStream);
});

/* Bundle client assets with Webpack */
gulp.task('bundle:client', (cb) => {

  webpack(webpackConfig, (err, stats) => {

    if (err) {
      throw new util.PluginError('bundle:client', err);
    }

    const ouptut = stats.toString({ assets: true, chunks: false, chunkModules: false, colors: true, hash: false, timings: false, version: false });
    util.log(`[bundle:client] Completed\n ${ouptut}`);

    cb();
  });
});

/* Lint */
gulp.task('lint:all', () => (

  gulp.src(['./src/**/*.js', './src/**/*.jsx', `${config.paths.tests}/**/*.js`])
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failOnError())
));

/* Build entire solution */
gulp.task('build', ['prepare:build'], (cb) => {

  runSequence('lint:all',
              ['create:env-settings', 'create:package-json', 'compile:server', 'copy:views', 'bundle:client', 'copy:fonts', 'sass:server'],
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