import babel from 'gulp-babel';
import changed from 'gulp-changed';
import file from 'gulp-file';
import gulp from 'gulp';
import merge from 'merge-stream';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
import sass from 'gulp-sass';

import { logFileWrite, sassOptions } from './utilities';
import constants from './constants';

const themeFileName = 'server-theme.scss';

export default context => [{

  /* Generate core theme (colours) SCSS */
  key: constants.taskKeys.createServerTheme,
  func: () => {

    const getColour = colour => colour.replace('\'', '');

    const themeFileContent =
      `$mdc-theme-primary: ${getColour(context.config.theme.primary)};
       $mdc-theme-secondary: ${getColour(context.config.theme.secondary)};
       $mdc-theme-background: ${getColour(context.config.theme.background)};

       @import 'basis-assets/server/styles/vendors';`;

    return file(themeFileName, themeFileContent, { src: true })
            .pipe(gulp.dest(context.config.paths.temp))
            .pipe(logFileWrite(context.config));
  }
}, {
  /* SASS Server */
  key: constants.taskKeys.sassServer,
  dependencies: [constants.taskKeys.createServerTheme],
  func: () => {

    const basisAssetsPath = './node_modules/basis-assets/server/styles';
    const dest = `${context.config.paths.build}/public/styles`;

    const vendorStream = gulp.src(`${context.config.paths.temp}/${themeFileName}`)
                             .pipe(sass(sassOptions).on('error', sass.logError))
                             .pipe(replace('/roboto/', '/'))
                             .pipe(rename('server-vendor.css'))
                             .pipe(gulp.dest(dest))
                             .pipe(logFileWrite(context.config));

    const coreStream = gulp.src(`${basisAssetsPath}/core.scss`)
                           .pipe(sass(sassOptions).on('error', sass.logError))
                           .pipe(rename('server-core.css'))
                           .pipe(gulp.dest(dest))
                           .pipe(logFileWrite(context.config));

    const mainStream = gulp.src(`${context.config.paths.server}/assets/styles/main.scss`)
                           .pipe(sass(sassOptions).on('error', sass.logError))
                           .pipe(rename('server.css'))
                           .pipe(gulp.dest(dest))
                           .pipe(logFileWrite(context.config));

    return merge(vendorStream, coreStream, mainStream);
  }
}, {

  /* Copy server (express) view templates to views */
  key: constants.taskKeys.copyServerViews,
  func: () => (

    gulp.src(`${context.config.paths.server}${constants.globs.views}`)
        .pipe(changed(context.config.paths.build))
        .pipe(gulp.dest(context.config.paths.build))
        .pipe(logFileWrite(context.config))
  )
}, {

  /* Compile server routes and startup modules */
  key: constants.taskKeys.compileServer,
  dependencies: [constants.taskKeys.lintServer],
  func: () => {

    const startupDestFileName = `start-${context.envSettings.default.shared.appName}`;
    const startupDestDir = `${context.config.paths.build}/bin/`;
    const mainSrc = `import { main } from 'basis-server';
                    main();`;

    const startupFileStream = file(startupDestFileName, mainSrc, { src: true })
                                .pipe(babel())
                                .pipe(gulp.dest(`${startupDestDir}`))
                                .pipe(logFileWrite(context.config));

    const appFilesStream = gulp.src([`${context.config.paths.server}${constants.globs.js}`, `${context.config.paths.server}${constants.globs.jsx}`])
                               .pipe(babel())
                               .pipe(gulp.dest(`${context.config.paths.build}`))
                               .pipe(logFileWrite(context.config));

    return merge(startupFileStream, appFilesStream);
  }
}];