const delimiter = ':';

function decorateAlias(alias) {

   return `${alias.toUpperCase()}${delimiter} `;
}

function mochaDescribe(prefix, title, contents) {

   // TODO: Cater for async scenarios !!
   return describe(decorateAlias(prefix) + title, contents);
}

function mochaIt(prefix, title, contents) {

   // TODO: Cater for async scenarios !!
   return it(decorateAlias(prefix) + title, contents);
}

export const aliasTypes = {
   a: 'a',
   and: 'and',
   given: 'given',
   for: 'for',
   the: 'the',
   should: 'should',
   then: 'then',
   when: 'when'
};

export function a(title, contents) {

   return mochaDescribe(aliasTypes.a, title, contents);
}

export function the(title, contents) {

   return mochaDescribe(aliasTypes.the, title, contents);
}

export function forA(title, contents) {

   return mochaDescribe(aliasTypes.for, title, contents);
}

export function forAn(title, contents) {

   return mochaDescribe(aliasTypes.for, title, contents);
}

export function forThe(title, contents) {

   return mochaDescribe(aliasTypes.for, title, contents);
}

export function given(title, contents) {

   return mochaDescribe(aliasTypes.given, title, contents);
}

export function when(title, contents) {

   return mochaDescribe(aliasTypes.when, title, contents);
}

export function then(title, contents) {

   return mochaIt(aliasTypes.then, title, contents);
}

export function should(title, contents) {

   return mochaIt(aliasTypes.should, title, contents);
}

export function and(title, contents, leadingAlias = aliasTypes.then) {

   const padding = leadingAlias === aliasTypes.should ? '   ' : ' ';

   return mochaIt(`${padding}${aliasTypes.and}`, title, contents);
}