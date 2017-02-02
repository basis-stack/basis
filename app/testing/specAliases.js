function mochaDescribe(prefix, title, contents) {

   return describe(`${prefix} ${title}`, contents);
}

function mochaIt(prefix, title, contents) {

   const prefixText = prefix !== '' ? `${prefix} ` : '';

   return it(`${prefixText}${title}`, contents);
}

export const aliasTypes = {
   a: 'A',
   and: 'and',
   for: 'For',
   given: 'given',
   the: 'The',
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

   return mochaIt('', title, contents);
}

export function should(...args) {

   if (args.length === 1) {
      return mochaDescribe(aliasTypes.should, '', args[0]);
   } else {
      return mochaIt(aliasTypes.should, args[0], args[1]);
   }
}

export function and(title, contents, leadingAlias = aliasTypes.then) {

   //const padding = leadingAlias === aliasTypes.should ? '   ' : ' ';

   return mochaIt('', title, contents);
}