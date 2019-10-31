// TODO: Replace with chalk
import 'colors';
import fs from 'fs';
import relative from 'require-relative';

import defaultSettings from './config/settings.default';

export default configDir => {

  const outputPrefix = '[settings]';
  const allSettings = {};

  if (fs.existsSync(configDir)) {

    const knownEnvironments = fs.readdirSync(configDir)
                                .filter(item => item.includes('settings.'))
                                .map(envFile => envFile.split('.')[1]);

    knownEnvironments.forEach(env => {

      try {

        const envSetting = relative(`./settings.${env}.js`, configDir);
        allSettings[env] = { ...envSetting.default };

      } catch (e) {

        console.log(`${outputPrefix.yellow} ${'INVALID_ENV'.red}: Unable to import environment settings for '${env}'. Error: ${e.message}`);
      }
    });
  }

  if (allSettings.default === undefined) {

    allSettings.default = { ...defaultSettings };

    // TODO: Log warning !!
  }

  console.log(`${outputPrefix.yellow} Loaded environment settings for: ${Object.keys(allSettings).join(', ').green}`);

  return allSettings;
};