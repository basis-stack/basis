// import colors from 'colors';
// import gulp from 'gulp';
// import install from 'gulp-install';
// import tar from 'gulp-tar';
// import gzip from 'gulp-gzip';
// import replace from 'gulp-replace';
// import extReplace from 'gulp-ext-replace';
// import chmod from 'gulp-chmod';
// import merge from 'merge-stream';

// import constants from './constants';
// import { logFileWrite } from './utilities';

// const keys = constants.taskKeys;

// export default ({ envSettings, config, packageJson }) => [{

//   key: keys.copyServerScripts,
//   func: () => {

//     const scriptsPath = './scripts';
//     let deployVariables = '';

//     Object.keys(envSettings)
//           .filter(env => env !== 'local' && env !== 'default')
//           .forEach((env) => {

//             deployVariables += `\n"${env}")\n` +
//                               `  DEPLOY_USER=${envSettings[env].deploy.deployUser}\n` +
//                               `  DEPLOY_HOST=${envSettings[env].deploy.deployHost}\n` +
//                               `  DEPLOY_LOCATION=${envSettings[env].deploy.deployDirectory}\n` +
//                               '  ;;\n';
//           });

//     const runtimeScripts = gulp.src([`${scriptsPath}/start.sh`, `${scriptsPath}/stop.sh`, `${scriptsPath}/install_platform.sh`])
//                               .pipe(replace('%APPNAME%', envSettings.default.shared.appName))
//                               .pipe(replace('%FRONT_WITH_NGINX%', envSettings.default.server.frontWithNginx))
//                               .pipe(replace('%NODE_RUNTIME_ENV%', envSettings.default.server.nodeRuntimeVersion))
//                               .pipe(extReplace(''))
//                               .pipe(gulp.dest(config.paths.build))
//                               .pipe(logFileWrite(config));

//     const deployScript = gulp.src([`${scriptsPath}/deploy.sh`])
//                             .pipe(replace('%APPNAME%', envSettings.default.shared.appName))
//                             .pipe(replace('%DEPLOY_VARIABLES%', deployVariables))
//                             .pipe(extReplace(''))
//                             .pipe(chmod(0o755))
//                             .pipe(gulp.dest('./'))
//                             .pipe(logFileWrite(config));

//     return merge(runtimeScripts, deployScript);
//   }
// }, {

//   key: keys.installRuntimeDependencies,
//   func: () => (

//     gulp.src(`${config.paths.build}/package.json`)
//         .pipe(install())
//   )
// }, {

//   key: keys.packageArtifacts,
//   dependencies: [
//     keys.copyServerScripts,
//     keys.installRuntimeDependencies
//   ],
//   func: () => {

//     const baseFileName = `${envSettings.default.shared.appName}.${packageJson.version}`;
//     const packageFileName = config.options.uniqueArtifactName ?
//       `${baseFileName}.T${new Date().getTime()}.tar` :
//       `${baseFileName}.tar`;

//     return gulp.src([`${config.paths.build}/**/*`, `!${config.paths.build}/packages`, `!${config.paths.build}/packages/**`])
//               .pipe(tar(packageFileName))
//               .pipe(gzip())
//               .pipe(gulp.dest(config.paths.publish))
//               .pipe(logFileWrite(config));
//   }
// }];