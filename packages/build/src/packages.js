import childProcessPromise from 'child-process-promise';
import gulp from 'gulp';
import fs from 'fs';
import jsonfile from 'jsonfile';
import merge from 'merge-stream';
import path from 'path';
import Rx from 'rxjs/Rx';

import { logFileWrite, runtimeDir } from './utilities';
import constants from './constants';
import compile from './getCompiler';

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

        // TODO: Add check for Artifactory error message also: cannot modify pre-existing version'
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

const linkPackages = (config, packageDetails, link = true) => {

  const cmd = link ?
    `cd packages/${packageDetails.dir} && yarn link && cd ../.. && yarn link ${packageDetails.name}` :
    `yarn unlink ${packageDetails.name}`;
  const message = link ?
    `Linked nested package ${packageDetails.name}@${packageDetails.version}` :
    `Unlinked nested package ${packageDetails.name}@${packageDetails.version}`;

  return new Promise((resolve, reject) => {

    exec(cmd)
      .then((result) => {

        resolve({

          success: true,
          message
        });
      })
      .catch((err) => {

        reject(err);
      });
  });
};

const runCmdForPackages = (packages, cmdOp, cb) => {

  Rx.Observable
    .from(packages.map(cmdOp))
    .mergeAll()
    .toArray()
    .subscribe((results) => {

      results.forEach((r) => { logMessage(r.message, r.success); });
      cb();
    }, (err) => {

      cb(err);
    });
};

export default ({ hasPackages, config, lint }) => {

  if (!hasPackages) {

    return [];
  }

  const packages = fs.readdirSync(path.join(runtimeDir, 'packages'))
                     .map((p) => {

                       const packageJson = jsonfile.readFileSync(path.join(runtimeDir, `packages/${p}/package.json`));

                       return {
                         dir: p,
                         name: packageJson.name,
                         version: packageJson.version
                       };
                     });

  return [{

    // TODO: Add linting as dep only if specified (as per server)
    // if (lint) {

    //   compilePackages.dependencies = [constants.taskKeys.lintPackages];
    // }

    /* Compile nested basis packages */
    key: constants.taskKeys.compilePackages,
    dependencies: [constants.taskKeys.lintPackages],
    func: () => {

      const destDir = `${config.paths.build}/packages`;

      const sourceStream = compile(config, './packages', destDir);

      const sassStream = gulp.src([`./packages${constants.globs.sass}`, constants.globs.notNodeModules])
                            .pipe(gulp.dest(destDir))
                            .pipe(logFileWrite(config));

      const packageJsonStream = gulp.src([`./packages${constants.globs.packageJson}`, constants.globs.notNodeModules])
                                    .pipe(gulp.dest(destDir))
                                    .pipe(logFileWrite(config));

      return merge(sourceStream, sassStream, packageJsonStream);
    }
  }, {

    /* Publish compiled packages to npm registry */
    key: constants.taskKeys.publishPackages,
    func: (cb) => {

      runCmdForPackages(packages, p => doPublish(config, p), cb);
    }
  }, {

    /* Link sub packages */
    key: constants.taskKeys.linkPackages,
    func: (cb) => {

      runCmdForPackages(packages, p => linkPackages(config, p), cb);
    }
  }, {

    /* Unlink sub packages */
    key: constants.taskKeys.unlinkPackages,
    func: (cb) => {

      runCmdForPackages(packages, p => linkPackages(config, p, false), cb);
    }
  }];
};