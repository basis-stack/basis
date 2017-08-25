import 'reflect-metadata';
import { expect } from 'chai';
import * as sinon from 'sinon';
import _ from 'lodash';

import { the, should, when,
         assertInstance, assertWasCalled } from './../../packages/testing';

import { Controller, Get, Post, __RewireAPI__ as DecoratorsAPI } from './../../src/server/core/decorators';

class StubTargetClass {

  methodA() {}
  methodB() {}
  methodC() {}
  methodD() {}
}

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

    const path = '/some-get-path';

    Get(path)(StubTargetClass.prototype, 'methodA', null);

    const instance = new StubTargetClass();

    expect(Reflect.getMetadata('http:method', instance, 'methodA')).to.equal('get');
    expect(Reflect.getMetadata('http:path', instance, 'methodA')).to.equal(path);
  });

  should('default path to empty string if not supplied', () => {

    Get()(StubTargetClass.prototype, 'methodC', null);

    const instance = new StubTargetClass();

    expect(Reflect.getMetadata('http:path', instance, 'methodC')).to.equal('');
  });
});

the('Post decorator', () => {

  should('attach http method (\'post\') & path metadata to the target class method', () => {

    const path = '/some-post-path';

    Post(path)(StubTargetClass.prototype, 'methodB', null);

    const instance = new StubTargetClass();

    expect(Reflect.getMetadata('http:method', instance, 'methodB')).to.equal('post');
    expect(Reflect.getMetadata('http:path', instance, 'methodB')).to.equal(path);
  });

  should('default path to empty string if not supplied', () => {

    Post()(StubTargetClass.prototype, 'methodD', null);

    const instance = new StubTargetClass();

    expect(Reflect.getMetadata('http:path', instance, 'methodD')).to.equal('');
  });
});