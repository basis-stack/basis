// TODO: Replace with chalk
import 'colors';
import fs from 'fs';

export default () => {

  const allSettings = {};
  const knownEnvironments = fs.readdirSync(__dirname)
                              .filter(item => item.includes('settings') && !item.includes('gulp.config.js') && !item.includes('settings.js'))
                              .map(envFile => envFile.split('.')[1]);

  knownEnvironments.forEach((env) => {

    try {
      /* eslint-disable global-require */
      const envSetting = require(`./settings.${env}.js`);
      /* eslint-enable global-require */

      allSettings[env] = envSetting.default;
    } catch (e) {

      console.log(`${'[settings]'.yellow} ${'INVALID_ENV'.red}: Unable to import environment settings for '${env}'. Error: ${e.message}`);
    }
  });

  return allSettings;
};