import gulp from 'gulp';
import del from 'del';
// TODO: Replace with chalk !!
import colors from 'colors';
import replace from 'gulp-replace';
import runSequence from 'run-sequence';
import fs from 'fs';
import rename from 'gulp-rename';
import babel from 'gulp-babel';
import merge from 'merge-stream';
import print from 'gulp-print';
import eslint from 'gulp-eslint';
import jsonfile from 'jsonfile';
import webpack from 'webpack';
import util from 'gulp-util';
import sass from 'gulp-sass';
import install from 'gulp-install';
import extReplace from 'gulp-ext-replace';
import tar from 'gulp-tar';
import gzip from 'gulp-gzip';
import chmod from 'gulp-chmod';
import file from 'gulp-file';

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

  del([config.paths.build, config.paths.package, './deploy']).then((paths) => {

    const pathsText = paths.length === 0 ? 'NONE' : paths.join(';\n                ');
    logMessage('Deleted   ', pathsText);
    cb();
  });
});

/* Prepare build directory */
gulp.task('prepare:build', ['clean'], (cb) => {

  fs.mkdirSync(config.paths.build);
  fs.mkdirSync(`${config.paths.build}/config`);
  cb();
});

/* Copy server scripts */
gulp.task('copy:server-scripts', () => {

  const scriptsPath = './scripts';
  let deployVariables = '';

  Object.keys(envSettings)
        .filter(env => env !== 'local' && env !== 'default')
        .forEach((env) => {

          deployVariables += `\n"${env}")\n` +
                             `  DEPLOY_USER=${envSettings[env].deployUser}\n` +
                             `  DEPLOY_HOST=${envSettings[env].deployHost}\n` +
                             `  DEPLOY_LOCATION=${envSettings[env].deployDirectory}\n` +
                             '  ;;\n';
        });

  const runtimeScripts = gulp.src([`${scriptsPath}/start.sh`, `${scriptsPath}/stop.sh`])
                             .pipe(replace('%APPNAME%', envSettings.default.appName))
                             .pipe(replace('%FRONT_WITH_NGINX%', envSettings.default.frontWithNginx))
                             .pipe(extReplace(''))
                             .pipe(gulp.dest(config.paths.build))
                             .pipe(print(getFilePathLogMessage));

  const deployScript = gulp.src([`${scriptsPath}/deploy.sh`])
                           .pipe(replace('%APPNAME%', envSettings.default.appName))
                           .pipe(replace('%DEPLOY_VARIABLES%', deployVariables))
                           .pipe(extReplace(''))
                           .pipe(chmod(0o755))
                           .pipe(gulp.dest('./'))
                           .pipe(print(getFilePathLogMessage));

  return merge(runtimeScripts, deployScript);
});

gulp.task('copy:nginx-config', () => (

  gulp.src(['./config/nginx.conf'])
      .pipe(replace('%NGINX_LOCAL_PORT%', envSettings.production.webServerPort))
      .pipe(replace('%NGINX_PUBLIC_PORT%', envSettings.production.publicPort))
      .pipe(gulp.dest(`${config.paths.build}/config`))
      .pipe(print(getFilePathLogMessage))
));

/* Prepare Environment settings file */
gulp.task('create:env-settings', (cb) => {

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

  const startupDestFileName = `start-${envSettings.default.appName}`;
  const startupDestDir = `${config.paths.build}/bin/`;
  const mainSrc = `import { main } from 'basis-server';
                   main();`;

  const startupFileStream = file(startupDestFileName, mainSrc, { src: true })
                              .pipe(babel())
                              .pipe(gulp.dest(`${startupDestDir}`))
                              .pipe(print(getFilePathLogMessage));

  const appFilesStream = gulp.src([`${config.paths.server}/**/*.js`, `${config.paths.server}/**/*.jsx`])
                             .pipe(babel())
                             .pipe(gulp.dest(`${config.paths.build}`))
                             .pipe(print(getFilePathLogMessage));

  return merge(startupFileStream, appFilesStream);
});

/* Compile nested basis packages */
gulp.task('compile:packages', () => {

  const destDir = `${config.paths.build}/packages`;

  const sourceStream = gulp.src([`${config.paths.packages}/**/*.js`, `${config.paths.packages}/**/*.jsx`, '!**/test/*'])
                           .pipe(babel())
                           .pipe(gulp.dest(destDir))
                           .pipe(print(getFilePathLogMessage));

  const packageJsonStream = gulp.src(`${config.paths.packages}/**/package.json`)
                                .pipe(gulp.dest(destDir))
                                .pipe(print(getFilePathLogMessage));

  return merge(sourceStream, packageJsonStream);
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
                           .pipe(replace('/roboto/', '/'))
                           .pipe(rename('server-vendor.css'))
                           .pipe(gulp.dest(`${config.paths.build}/public/styles`))
                           .pipe(print(getFilePathLogMessage));

  const contentStream = gulp.src(`${config.paths.server}/assets/styles/main.scss`)
                            .pipe(sass(options).on('error', sass.logError))
                            .pipe(rename('server.css'))
                            .pipe(gulp.dest(`${config.paths.build}/public/styles`))
                            .pipe(print(getFilePathLogMessage));

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

  gulp.src(['./src/**/*.js', './src/**/*.jsx', `${config.paths.tests}/**/*.js`, `${config.paths.packages}/**/*.js`, `${config.paths.packages}/**/*.jsx`])
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failOnError())
));

/* Build entire solution */
gulp.task('build', ['prepare:build'], (cb) => {

  runSequence('lint:all',
              ['create:env-settings', 'create:package-json', 'compile:server', 'compile:packages', 'copy:views', 'bundle:client', 'copy:fonts', 'sass:server'],
              cb);
});

/* Install runtime dependencies */
gulp.task('install:runtime-dependencies', () => (

  gulp.src(`${config.paths.build}/package.json`)
      .pipe(install())
));

/* Package build artifacts */
gulp.task('package', ['install:runtime-dependencies', 'copy:server-scripts'], () => {

  const packageFileName = `${envSettings.default.appName}.package.tar`;
  logMessage('Creating ', `${config.paths.package}/${packageFileName}`);

  // TODO: Exclude packages dir from package zip

  return gulp.src([`${config.paths.build}/**/*`, `!${config.paths.build}/packages/**/*`])
             .pipe(tar(packageFileName))
             .pipe(gzip())
             .pipe(gulp.dest(config.paths.package));
});

/* Default gulp task */
gulp.task('default', ['build'], (cb) => {

});