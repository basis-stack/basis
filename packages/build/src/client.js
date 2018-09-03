import constants from './constants';

export default ({ hasClient, webpackConfig, config, lint }) => {

  if (!hasClient) {

    return [];
  }

  const bundleClient = {

    /* Bundle client code & assets with Webpack */
    key: constants.taskKeys.bundleClient,
    func: (cb) => {

      // eslint-disable-next-line global-require, import/no-unresolved
      const webpack = require('webpack');

      webpack(webpackConfig, (err, stats) => {

        // Fatal webpack errors
        if (err) {

          if (err.details) {

            console.error(err.details);
          }

          cb(err);
        }

        const info = stats.toJson();

        // Compilation errors
        if (stats.hasErrors()) {

          console.error(info.errors);
          cb(new Error('Webpack compilation error(s)'));
        }

        // Compilation warnings
        // if (stats.hasWarnings()) {

        //   console.warn(info.warnings);
        // }

        if (config.options.logFileNames) {

          const ouptut = stats.toString({
            assets: true,
            chunks: false,
            chunkModules: false,
            colors: true,
            hash: false,
            timings: false,
            version: false
          });

          console.log(ouptut);
        }

        cb();
      });
    }
  };

  if (lint) {

    bundleClient.dependencies = [constants.taskKeys.lintClient];
  }

  return [bundleClient];
};