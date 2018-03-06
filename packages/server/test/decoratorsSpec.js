import 'reflect-metadata';
import { expect } from 'chai';
import * as sinon from 'sinon';
import _ from 'lodash';

import { the, should, when,
        assertInstance, assertWasCalled } from './../../testing';

import { Authenticate, Controller, Get, Head, Post, Put, Delete, Options, __RewireAPI__ as DecoratorsAPI } from './../src/core/decorators';

class StubTargetClass {

  methodA() {}
  methodB() {}
  methodC() {}
  methodD() {}
  methodE() {}
  methodF() {}
  methodG() {}
  methodH() {}
  methodI() {}
  methodJ() {}
  methodK() {}
  methodL() {}
}

const assetMethodDecorator = (decorator, stubMethod, withPath = true) => {

  const httpMethodName = decorator.name.toLowerCase();
  const expectedPath = withPath ? `/some-${httpMethodName}-path` : '';

  if (withPath) {

    decorator(expectedPath)(StubTargetClass.prototype, stubMethod, null);
  } else {

    decorator()(StubTargetClass.prototype, stubMethod, null);
  }

  const instance = new StubTargetClass();

  expect(Reflect.getMetadata('http:method', instance, stubMethod)).to.equal(httpMethodName);
  expect(Reflect.getMetadata('http:path', instance, stubMethod)).to.equal(expectedPath);
};

the('Authenticate decorator', () => {

  const stubOptions = {};

  before(() => {

    Authenticate('some-auth-strategy', stubOptions)(StubTargetClass);
  });

  should('attach authenticate metadata to the target class', () => {

    expect(Reflect.getMetadata('http:authenticate', StubTargetClass)).to.equal(true);
    expect(Reflect.getMetadata('http:authStrategy', StubTargetClass)).to.equal('some-auth-strategy');
    expect(Reflect.getMetadata('http:authOptions', StubTargetClass)).to.equal(stubOptions);
  });
});

the('Controller decorator', () => {

  const stubBindRoutes = sinon.spy();
  const path = '/some-root-path';

  before(() => {

    DecoratorsAPI.__Rewire__('bindRoutes', stubBindRoutes);

    Controller(path)(StubTargetClass);
  });

  after(() => {

    DecoratorsAPI.__ResetDependency__('bindRoutes');
  });

  should('attach rootPath metadata to the target class', () => {

    expect(Reflect.getMetadata('http:rootPath', StubTargetClass)).to.equal(path);
  });

  should('attach an initialise factory method to the target class', () => {

    expect(StubTargetClass.initialise).to.not.be.undefined;
    expect(_.isFunction(StubTargetClass.initialise)).to.equal(true);
  });

  when('target class initialise invoked', () => {

    const stubRouter = {};
    let result;

    before(() => {

      result = StubTargetClass.initialise(stubRouter);
    });

    should('return a new instance of the target class', () => {

      assertInstance(result, StubTargetClass);
    });

    should('bind controller methods to the express router', () => {

      assertWasCalled(stubBindRoutes);
    });
  });
});

the('Get decorator', () => {

  should('attach http method (\'get\') & path metadata to the target class method', () => {

    assetMethodDecorator(Get, 'methodA');
  });

  should('default path to empty string if not supplied', () => {

    assetMethodDecorator(Get, 'methodB', false);
  });
});

the('Head decorator', () => {

  should('attach http method (\'head\') & path metadata to the target class method', () => {

    assetMethodDecorator(Head, 'methodC');
  });

  should('default path to empty string if not supplied', () => {

    assetMethodDecorator(Head, 'methodD', false);
  });
});

the('Post decorator', () => {

  should('attach http method (\'post\') & path metadata to the target class method', () => {

    assetMethodDecorator(Post, 'methodE');
  });

  should('default path to empty string if not supplied', () => {

    assetMethodDecorator(Post, 'methodF', false);
  });
});

the('Put decorator', () => {

  should('attach http method (\'put\') & path metadata to the target class method', () => {

    assetMethodDecorator(Put, 'methodG');
  });

  should('default path to empty string if not supplied', () => {

    assetMethodDecorator(Put, 'methodH', false);
  });
});

the('Delete decorator', () => {

  should('attach http method (\'delete\') & path metadata to the target class method', () => {

    assetMethodDecorator(Delete, 'methodI');
  });

  should('default path to empty string if not supplied', () => {

    assetMethodDecorator(Delete, 'methodJ', false);
  });
});

the('Options decorator', () => {

  should('attach http method (\'options\') & path metadata to the target class method', () => {

    assetMethodDecorator(Options, 'methodK');
  });

  should('default path to empty string if not supplied', () => {

    assetMethodDecorator(Options, 'methodL', false);
  });
});