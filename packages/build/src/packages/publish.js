import { exec, packagesPath } from './utilities';

export default packageDetails => (

  new Promise((resolve, reject) => {

    exec(`cd ${packagesPath}/${packageDetails.dir} && npm publish`)
      .then((result) => {

        resolve({

          success: true,
          message: `Published package ${result.stdout.replace('\n', '').replace('+ ', '').green}`
        });
      })
      .catch((err) => {

        if (err.message.includes('code E403') && (err.message.includes('cannot publish over the previously published') ||
                                                  err.message.includes('cannot modify pre-existing version'))) {

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