// TODO: Replace with chalk
import 'colors';
import fs from 'fs';
import relative from 'require-relative';

export default (configDir) => {

  const allSettings = {};
  const knownEnvironments = fs.readdirSync(configDir)
                              .filter(item => item.includes('settings') && !item.includes('gulp.config.js'))
                              .map(envFile => envFile.split('.')[1]);

  knownEnvironments.forEach((env) => {

    try {

      const envSetting = relative(`./settings.${env}.js`, configDir);
      allSettings[env] = Object.assign(envSetting.default);
    } catch (e) {

      console.log(`${'[settings]'.yellow} ${'INVALID_ENV'.red}: Unable to import environment settings for '${env}'. Error: ${e.message}`);
    }
  });

  return allSettings;
};