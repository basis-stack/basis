import webpack from 'webpack';
import util from 'gulp-util';

import constants from './constants';

export default context => [{

  /* Bundle client code & assets with Webpack */
  key: constants.taskKeys.bundleClient,
  dependencies: null,
  func: (cb) => {

    webpack(context.webpackConfig, (err, stats) => {

      if (err) {
        throw new util.PluginError(constants.taskKeys.bundleClient, err);
      }

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

      cb();
    });
  }
}];