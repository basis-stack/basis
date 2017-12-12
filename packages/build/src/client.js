import file from 'gulp-file';
import gulp from 'gulp';
import rename from 'gulp-rename';
import path from 'path';
import sass from 'gulp-sass';
import shell from 'gulp-shell';
import util from 'gulp-util';
import webpack from 'webpack';

import constants from './constants';
import { logFileWrite, sassOptions, writeJson } from './utilities';

const reactToolboxConfigFilename = 'react-toolbox.config.json';
const themeFileName = 'client-theme.scss';
const reactToolboxCustomProps = {
  primary: 'color-primary',
  secondary: 'color-accent'
};

const getReactToolboxConfig = config => ({

  include: ['APP_BAR', 'BUTTON'],
  customProperties: {
    [reactToolboxCustomProps.primary]: config.theme.primary,
    [reactToolboxCustomProps.secondary]: config.theme.secondary
  },
  output: config.paths.temp
});

export default context => [{

  /* Create React Toolbox (themr) config file */
  key: constants.taskKeys.createReactToolboxConfig,
  dependencies: [constants.taskKeys.prepareBuild],
  func: (cb) => {

    const pathName = path.join(context.rootDir, context.config.paths.temp, reactToolboxConfigFilename);
    const outputConfig = getReactToolboxConfig(context.config);

    writeJson(context.config, pathName, outputConfig, cb);
  }
}, {

  /* Create React Toolbox theme as a separate asset */
  key: constants.taskKeys.createReactToolboxTheme,
  dependencies: [constants.taskKeys.createReactToolboxConfig],
  func: shell.task([`node node_modules/react-toolbox-themr/bin/builder.js --config ${context.config.paths.temp}/${reactToolboxConfigFilename}`])
}, {

  /* Generate core theme SCSS */
  key: constants.taskKeys.createClientTheme,
  dependencies: [constants.taskKeys.createReactToolboxTheme],
  func: () => {

    const themeFileContent =
      `@import 'theme';
       @import 'basis-assets/client/styles/vendors';`;

    return file(themeFileName, themeFileContent, { src: true })
            .pipe(gulp.dest(context.config.paths.temp))
            .pipe(logFileWrite(context.config));
  }
}, {

  /* Sass client (vendor styles, etc) */
  key: constants.taskKeys.sassClient,
  dependencies: [constants.taskKeys.createClientTheme],
  func: () => {

    // const sourceDir = `${context.config.paths.client}/assets/styles/`;
    const dest = `${context.config.paths.build}/public/styles`;

    return gulp.src(`${context.config.paths.temp}/${themeFileName}`)
               .pipe(sass(sassOptions).on('error', sass.logError))
               .pipe(rename('client-vendor.css'))
               .pipe(gulp.dest(dest))
               .pipe(logFileWrite(context.config));
  }
}, {

  /* Bundle client code & assets with Webpack */
  key: constants.taskKeys.bundleClient,
  dependencies: [
    constants.taskKeys.lintClient,
    constants.taskKeys.createReactToolboxTheme
  ],
  func: (cb) => {

    webpack(context.webpackConfig, (err, stats) => {

      if (err) {
        throw new util.PluginError(constants.taskKeys.bundleClient, err);
      }

      if (context.config.options.logFileNames) {

        const ouptut = stats.toString({
          assets: true,
          chunks: false,
          chunkModules: false,
          colors: true,
          hash: false,
          timings: false,
          version: false
        });

        util.log(`[${constants.taskKeys.bundleClient}] Completed\n ${ouptut}`);
      }

      cb();
    });
  }
}];