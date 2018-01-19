import gulp from 'gulp';
import install from 'gulp-install';
import tar from 'gulp-tar';
import gzip from 'gulp-gzip';
import replace from 'gulp-replace';
import extReplace from 'gulp-ext-replace';
import chmod from 'gulp-chmod';
import merge from 'merge-stream';

import constants from './constants';
import { logFileWrite } from './utilities';

const keys = constants.taskKeys;

export default context => [{

  key: keys.copyServerScripts,
  func: () => {

    const scriptsPath = './scripts';
    let deployVariables = '';

    Object.keys(context.envSettings)
          .filter(env => env !== 'local' && env !== 'default')
          .forEach((env) => {

            deployVariables += `\n"${env}")\n` +
                              `  DEPLOY_USER=${context.envSettings[env].deploy.deployUser}\n` +
                              `  DEPLOY_HOST=${context.envSettings[env].deploy.deployHost}\n` +
                              `  DEPLOY_LOCATION=${context.envSettings[env].deploy.deployDirectory}\n` +
                              '  ;;\n';
          });

    const runtimeScripts = gulp.src([`${scriptsPath}/start.sh`, `${scriptsPath}/stop.sh`, `${scriptsPath}/install_platform.sh`])
                               .pipe(replace('%APPNAME%', context.envSettings.default.shared.appName))
                               .pipe(replace('%FRONT_WITH_NGINX%', context.envSettings.default.server.frontWithNginx))
                               .pipe(replace('%NODE_RUNTIME_ENV%', context.envSettings.default.server.nodeRuntimeVersion))
                               .pipe(extReplace(''))
                               .pipe(gulp.dest(context.config.paths.build))
                               .pipe(logFileWrite(context.config));

    const deployScript = gulp.src([`${scriptsPath}/deploy.sh`])
                             .pipe(replace('%APPNAME%', context.envSettings.default.shared.appName))
                             .pipe(replace('%DEPLOY_VARIABLES%', deployVariables))
                             .pipe(extReplace(''))
                             .pipe(chmod(0o755))
                             .pipe(gulp.dest('./'))
                             .pipe(logFileWrite(context.config));

    return merge(runtimeScripts, deployScript);
  }
}, {

  key: keys.installRuntimeDependencies,
  func: () => (

    gulp.src(`${context.config.paths.build}/package.json`)
        .pipe(install())
  )
}, {

  key: keys.packageArtifacts,
  dependencies: [
    keys.copyServerScripts,
    keys.installRuntimeDependencies
  ],
  func: () => {

    const baseFileName = `${context.envSettings.default.shared.appName}.${context.packageJson.version}`;
    const packageFileName = context.config.options.uniqueArtifactName ?
      `${baseFileName}.T${new Date().getTime()}.tar` :
      `${baseFileName}.tar`;

    return gulp.src([`${context.config.paths.build}/**/*`, `!${context.config.paths.build}/packages`, `!${context.config.paths.build}/packages/**`])
               .pipe(tar(packageFileName))
               .pipe(gzip())
               .pipe(gulp.dest(context.config.paths.publish))
               .pipe(logFileWrite(context.config));
  }
}];