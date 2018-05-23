import util from 'gulp-util';

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

        if (err) {
          throw new util.PluginError(constants.taskKeys.bundleClient, err);
        }

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

          util.log(`[${constants.taskKeys.bundleClient}] Completed\n ${ouptut}`);
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