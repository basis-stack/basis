import { expect } from 'chai';
import jsonfile from 'jsonfile';
import del from 'del';

import { the, when, should } from './../testing/specAliases';
import { Config } from './../core/config.js';

the('Config class', () => {

  when('instantiated', () => {

    const settingsFilePath = `${__dirname}/../../settings.json`;
    const stubSettingsJson = { foo: 'FooProp', bar: 'BarProp' };

    before(() => {

      jsonfile.writeFileSync(settingsFilePath, stubSettingsJson);
    });

    after(() => {

      del.sync([settingsFilePath]);
    });

    should('initialise properties from input settings', () => {

      const stubSettings = { a: 'propA', b: 'propB' };
      const config = new Config(stubSettings);

      expect(config.a).to.equal(stubSettings.a);
      expect(config.b).to.equal(stubSettings.b);
    });

    should('default input settings from settings file', () => {

      const config = new Config();

      expect(config.foo).to.equal(stubSettingsJson.foo);
      expect(config.bar).to.equal(stubSettingsJson.bar);
    });
  });
});