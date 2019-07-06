import changed from 'gulp-changed';
import file from 'gulp-file';
import gulp from 'gulp';
import gulpif from 'gulp-if';
import merge from 'merge-stream';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
import sass from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';

import { getStaticDir, logFileWrite, sassOptions } from '../utilities';
import constants from './constants';
import compile from './getCompiler';

const themeFileName = 'server-theme.scss';

export default ({ config, hasServer, envSettings, lint, packageJson }) => {

  const createServerTheme = {

    /* Generate core theme (colours) SCSS */
    key: constants.taskKeys.createServerTheme,
    func: () => {

      const getColour = colour => colour.replace('\'', '');
      const theme = config.theme !== undefined ?
        config.theme :
        { primary: '#1976d2', secondary: '#f9a825', background: '#fff' };

      const themeFileContent =
        `$mdc-theme-primary: ${getColour(theme.primary)};
         $mdc-theme-secondary: ${getColour(theme.secondary)};
         $mdc-theme-background: ${getColour(theme.background)};

         @import 'basis-assets/dist/server/styles/vendors';`;

      return file(themeFileName, themeFileContent, { src: true })
              .pipe(gulp.dest(config.paths.temp))
              .pipe(logFileWrite(config));
    }
  };

  const sassServer = {

    /* SASS Server */
    key: constants.taskKeys.sassServer,
    dependencies: [constants.taskKeys.createServerTheme],
    func: () => {

      const basisAssetsPath = './node_modules/basis-assets/dist/server/styles';
      const dest = `${getStaticDir(config)}/styles`;
      const vendorFileName = hasServer ? 'server-vendor' : 'vendor';

      const vendorStream = gulp.src(`${config.paths.temp}/${themeFileName}`)
                               .pipe(sass(sassOptions).on('error', sass.logError))
                               .pipe(replace('/roboto/', '/'))
                               .pipe(rename(`${vendorFileName}.css`))
                               .pipe(gulp.dest(dest))
                               .pipe(logFileWrite(config))
                               .pipe(cleanCSS())
                               .pipe(rename(`${vendorFileName}.min.css`))
                               .pipe(gulp.dest(dest))
                               .pipe(logFileWrite(config));

      if (!hasServer) {

        return vendorStream;
      }

      const coreStream = gulp.src(`${basisAssetsPath}/core.scss`)
                             .pipe(sass(sassOptions).on('error', sass.logError))
                             .pipe(rename('server-core.css'))
                             .pipe(gulp.dest(dest))
                             .pipe(logFileWrite(config));

      const mainStream = gulp.src(`${config.paths.server}/assets/styles/main.scss`)
                             .pipe(sass(sassOptions).on('error', sass.logError))
                             .pipe(rename('server.css'))
                             .pipe(gulp.dest(dest))
                             .pipe(logFileWrite(config));

      return merge(vendorStream, coreStream, mainStream);
    }
  };

  if (!hasServer) {

    return [createServerTheme, sassServer];
  }

  const compileServer = {

    /* Compile server routes and startup modules */
    key: constants.taskKeys.compileServer,
    func: () => {

      const startupDestFileName = `start-${packageJson.name}`;
      const startupDestDir = `${config.paths.build}/bin/`;
      const mainSrc = 'require(\'basis-server\').main();';

      const startupFileStream = file(startupDestFileName, mainSrc, { src: true })
                                  .pipe(gulp.dest(`${startupDestDir}`))
                                  .pipe(logFileWrite(config));

      const appFilesStream = compile(config, config.paths.server, config.paths.build);

      return merge(startupFileStream, appFilesStream);
    }
  };

  if (lint) {

    compileServer.dependencies = [constants.taskKeys.lintServer];
  }

  return [
    createServerTheme,
    compileServer,
    sassServer, {

      /* Copy server (express) view templates to views */
      key: constants.taskKeys.copyServerViews,
      func: () => {

        const clientVendorStyleTag = '  <link href="styles/client-vendor.css" rel="stylesheet">\n';
        const src = config.options.serverOnly ?
          [`${config.paths.server}${constants.globs.views}`, `!${config.paths.server}/views/app.ejs`] :
          `${config.paths.server}${constants.globs.views}`;

        return gulp.src(src)
                   .pipe(changed(config.paths.build))
                   .pipe(gulpif(config.options.serverOnly, replace(clientVendorStyleTag, '')))
                   .pipe(gulp.dest(config.paths.build))
                   .pipe(logFileWrite(config));
      }
    }
  ];
};