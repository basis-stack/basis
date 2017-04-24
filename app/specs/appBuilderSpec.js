import { expect } from 'chai';
import * as sinon from 'sinon';
import { the, when, withScenario, should } from './utils/specAliases';

import { createStubObject, getStubContainer } from './utils/fakes';
import { AppBuilder, __RewireAPI__ as AppBuilderAPI } from './../middleware/appBuilder';

the('appBuilder', () => {

  const stubConfig = {};
  const stubLogger = { logStream: {} };
  const stubContainer = getStubContainer(stubConfig, stubLogger);
  const stubApp = createStubObject(['set, use']);

  let builder;

  before(() => {

//     stubApp = { set: () => {}, use: () => {} };
//     builder = new AppBuilder(stubApp);
  });

//   when('useHandlebars called', () => {

//     let setMethodSpy;
//     let result;

//     beforeEach(() => {

//       setMethodSpy = sinon.spy(stubApp, 'set');
//       result = builder.useHandlebars();
//     });

//     then('views path should be set to app views directory', () => {

//       const firstSetCall = setMethodSpy.getCall(0);

//       expect(firstSetCall.args[0]).to.equal('views');
//       expect(firstSetCall.args[1]).to.equal(path.join(__dirname, '/../views'));
//     });

//     and('view engine should be set to hbs', () => {

//       const secondSetCall = setMethodSpy.getCall(1);

//       expect(secondSetCall.args[0]).to.equal('view engine');
//       expect(secondSetCall.args[1]).to.equal('hbs');
//     });

//     and('should return the builder instance', () => {

//       expect(result).to.equal(builder);
//     });
//   });

//   // when('handleErrors called', () => {

//   //   const useMethodSpy = sinon.spy(stubApp, 'use');
//   //   const result = builder.handleErrors();

//   //   then('A', () => {

//   //     const firstUseCall = useMethodSpy.getCall(0);

//   //     expect(firstUseCall.args[0]).to.equal({});
//   //   });

//   //   then('B', () => {

//   //     const secondUseCall = useMethodSpy.getCall(1);

//   //     expect(secondUseCall.args[0]).to.equal({});
//   //   });

//   //   and('should return the builder instance', () => {

//   //     expect(result).to.equal(builder);
//   //   });
//   // });

//   // given('app settings object', () => {

//   //   when('useSettings called', () => {

//   //     const stubSettings = {};
//   //     const result = builder.useSettings(stubSettings);

//   //     then('settings object should be stored on the app', () => {

//   //       const buildResult = builder.result;
//   //       expect(buildResult.settings).to.equal(stubSettings);
//   //     });

//   //     and('should return the builder instance', () => {

//   //       expect(result).to.equal(builder);
//   //     });
//   //   });
//   // });
});