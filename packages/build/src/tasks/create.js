import { writeJson } from '../utilities';
import constants from './constants';

export default ({ hasServer, hasClient, envSettings, config, packageJson }) => {

  if (!hasServer) {

    return [];
  }

  return [{

    /* Prepare Environment settings file */
    key: constants.taskKeys.createEnvSettings,
    dependencies: [constants.taskKeys.prepareBuild],
    func: (cb) => {

      const outputSettings = Object.assign(envSettings);

      Object.keys(envSettings)
            .forEach((env) => {

              if (outputSettings[env].server !== undefined) {

                delete outputSettings[env].server.frontWithNginx;
                delete outputSettings[env].server.nodeRuntimeVersion;
              }

              if (outputSettings[env].deploy !== undefined) {

                delete outputSettings[env].deploy;
              }

              if (!hasClient) {

                delete outputSettings[env].client;
              }
            });

      outputSettings.default.shared.appName = packageJson.name;
      const pathName = `${config.paths.build}/config/settings.json`;

      writeJson(config, pathName, outputSettings, cb);
    }
  }, {

    /* Prepare package.json for the server / runtime */
    key: constants.taskKeys.createPackageJson,
    dependencies: [constants.taskKeys.prepareBuild],
    func: (cb) => {

      const outputPackageJson = { ...packageJson };
      const keysToNuke = [
        'devDependencies', 'scripts', 'homepage', 'bugs', 'license', 'author',
        'keywords', 'repository', 'description', 'private', 'workspaces'
      ];

      keysToNuke.forEach((ktn) => { delete outputPackageJson[ktn]; });

      let depsToNuke = [
        'basis-client', 'basis-components', 'basis-testing', 'history',
        'react', 'react-dom', 'react-jss', 'react-redux', 'react-router', 'react-router-dom',
        'react-router-redux', 'redux', 'redux-logger', 'redux-thunk', 'connected-react-router',
        '@material-ui/core', '@material-ui/icons', 'prop-types', 'react-jss'
      ];

      if (config.options.runtimeDependenciesToExclude !== undefined && config.options.runtimeDependenciesToExclude.length > 0) {

        depsToNuke = depsToNuke.concat(config.options.runtimeDependenciesToExclude);
      }

      depsToNuke.forEach((d) => { delete outputPackageJson.dependencies[d]; });

      // TODO: Add 'scripts' section with tweaked 'start', 'dev', 'production' scripts (for build dir)

      const targetPath = `${config.paths.build}/package.json`;

      writeJson(config, targetPath, outputPackageJson, cb);
    }
  }];
};