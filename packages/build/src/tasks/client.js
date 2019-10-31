import constants from './constants';

const handleFatalError = (err, cb) => {

  if (err) {

    if (err.details) {

      console.error(err.details);
    }

    cb(err);
  }
};

const handleCompilationErrors = (stats, info, cb) => {

  if (stats.hasErrors()) {

    console.error(info.errors);
    cb(new Error('Webpack compilation error(s)'));
  }
};

export default ({ hasClient, webpackConfig, config, lint }) => {

  if (!hasClient) {

    return [];
  }

  const bundleClient = {

    /* Bundle client code & assets with Webpack */
    key: constants.taskKeys.bundleClient,
    func: cb => {

      // NOTE: Dynamically import webpack as it is a peer dependency
      // TODO: Put try / catch around this (with friendly message) in case is missing !!
      // eslint-disable-next-line global-require, import/no-unresolved
      const webpack = require('webpack');
      webpack(webpackConfig, (err, stats) => {

        // Fatal webpack errors
        handleFatalError(err, cb);

        const info = stats.toJson();

        // Compilation errors
        handleCompilationErrors(stats, info, cb);

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