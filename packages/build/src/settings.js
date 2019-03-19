// TODO: Replace with chalk
import 'colors';
import fs from 'fs';
import relative from 'require-relative';

export default (configDir) => {

  // If no config dir, then just default settings.local

  const outputPrefix = '[settings]';
  const allSettings = {};
  const knownEnvironments = fs.readdirSync(configDir)
                              .filter(item => item.includes('settings') && !item.includes('gulp.config.js'))
                              .map(envFile => envFile.split('.')[1]);

  knownEnvironments.forEach((env) => {

    try {

      const envSetting = relative(`./settings.${env}.js`, configDir);
      allSettings[env] = Object.assign(envSetting.default);

    } catch (e) {

      console.log(`${outputPrefix.yellow} ${'INVALID_ENV'.red}: Unable to import environment settings for '${env}'. Error: ${e.message}`);
    }
  });

  console.log(`${outputPrefix.yellow} Loaded environment settings for: ${knownEnvironments.join(', ').green}`);

  return allSettings;
};