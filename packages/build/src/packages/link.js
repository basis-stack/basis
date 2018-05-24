import { exec, packagesPath } from './utilities';

export default (config, packageDetails, link = true) => {

  const cmd = link ?
    `cd ${packagesPath}/${packageDetails.dir} && yarn link && cd ../.. && yarn link ${packageDetails.name}` :
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