import babel from 'gulp-babel';
import childProcessPromise from 'child-process-promise';
import gulp from 'gulp';
import fs from 'fs';
import jsonfile from 'jsonfile';
import merge from 'merge-stream';
import path from 'path';
import Rx from 'rxjs/Rx';

import { logFileWrite } from './utilities';
import constants from './constants';

const exec = childProcessPromise.exec;
const logMessagePrefix = '         + ';

const logMessage = (message, success = false) => {

  console.log(`${logMessagePrefix}${success ? 'Success:'.green : 'Info:'.cyan} ${message}`);
};

const doPublish = (config, packageDetails) => (

  new Promise((resolve, reject) => {

    exec(`cd ${config.paths.build}/packages/${packageDetails.dir} && npm publish`)
      .then((result) => {

        resolve({

          success: true,
          message: `Published package ${result.stdout.replace('\n', '').replace('+ ', '').green}`
        });
      })
      .catch((err) => {

        if (err.message.includes('code E403') && err.message.includes('cannot publish over the previously published')) {

          resolve({

            success: false,
            message: `Skipped publish ${packageDetails.name.yellow}${'@'.yellow}${packageDetails.version.yellow} - version already exists`
          });
        } else {

          reject(err);
        }
      });
  })
);

export default context => [{

  /* Compile nested basis packages */
  key: constants.taskKeys.compilePackages,
  dependencies: [constants.taskKeys.lintPackages],
  func: () => {

    const destDir = `${context.config.paths.build}/packages`;

    const sourceStream = gulp.src([`${context.config.paths.packages}${constants.globs.js}`,
      `${context.config.paths.packages}${constants.globs.jsx}`,
      constants.globs.notNodeModules,
      constants.globs.notTests])
                             .pipe(babel())
                             .pipe(gulp.dest(destDir))
                             .pipe(logFileWrite(context.config));

    const sassStream = gulp.src([`${context.config.paths.packages}${constants.globs.sass}`, constants.globs.notNodeModules])
                           .pipe(gulp.dest(destDir))
                           .pipe(logFileWrite(context.config));

    const packageJsonStream = gulp.src([`${context.config.paths.packages}${constants.globs.packageJson}`, constants.globs.notNodeModules])
                                  .pipe(gulp.dest(destDir))
                                  .pipe(logFileWrite(context.config));

    return merge(sourceStream, sassStream, packageJsonStream);
  }
}, {

  /* Publish compiled packages to npm registry */
  key: constants.taskKeys.publishPackages,
  func: (cb) => {

    const runtimeDir = process.cwd();
    const packages = fs.readdirSync(path.join(runtimeDir, `${context.config.paths.build}/packages`))
                       .map((p) => {

                         const packageJson = jsonfile.readFileSync(path.join(runtimeDir, `${context.config.paths.build}/packages/${p}/package.json`));

                         return {
                           dir: p,
                           name: packageJson.name,
                           version: packageJson.version
                         };
                       });

    Rx.Observable
      .from(packages.map(p => doPublish(context.config, p)))
      .mergeAll()
      .toArray()
      .subscribe((results) => {

        results.forEach((r) => { logMessage(r.message, r.success); });
        cb();
      }, (err) => {

        cb(err);
      });
  }
}];