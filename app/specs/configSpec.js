import { expect } from 'chai';
import * as sinon from 'sinon';

import { the, when, should } from './utils/specAliases';
import Config, { __RewireAPI__ as ConfigAPI } from './../core/config';

the('Config class', () => {

  when('created (from settings file)', () => {

    const stubJsonfile = { readFileSync: () => {} };
    const settingsFilePath = 'SomeFilePath';
    const stubSettingsJson = { foo: 'FooProp', bar: 'BarProp' };

    sinon.stub(stubJsonfile, 'readFileSync').returns(stubSettingsJson);

    let config;

    before(() => {

      ConfigAPI.__Rewire__('jsonfile', stubJsonfile);

      config = Config.createFromSettingsFile(settingsFilePath);
    });

    after(() => {

      ConfigAPI.__ResetDependency__('jsonfile');
    });

    should('initialise properties from settings in settings file', () => {

      expect(config.foo).to.equal(stubSettingsJson.foo);
      expect(config.bar).to.equal(stubSettingsJson.bar);
    });
  });
});