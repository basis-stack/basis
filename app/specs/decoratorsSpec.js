import 'reflect-metadata';
import { expect } from 'chai';

import { the, should } from './utils/specAliases';
import { Controller, Get, Post } from './../core/decorators';

class StubTargetClass {

  methodA() {}
  methodB() {}
}

the('Controller decorator', () => {

  should('attach rootPath metadata to the target class', () => {

    const path = '/some-root-path';

    Controller(path)(StubTargetClass);

    expect(Reflect.getMetadata('http:rootPath', StubTargetClass)).to.equal(path);
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
});

the('Post decorator', () => {

  should('attach http method (\'post\') & path metadata to the target class method', () => {

    const path = '/some-post-path';

    Post(path)(StubTargetClass.prototype, 'methodB', null);

    const instance = new StubTargetClass();

    expect(Reflect.getMetadata('http:method', instance, 'methodB')).to.equal('post');
    expect(Reflect.getMetadata('http:path', instance, 'methodB')).to.equal(path);
  });
});