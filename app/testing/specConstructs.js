const delimiter = ':';

function mochaDescribe(prefix, title, contents) {

   // TODO: Cater for async scenarios !!
   return describe(prefix + title, contents);
}

function mochaIt(prefix, title, contents) {

   // TODO: Cater for async scenarios !!
   return it(prefix + title, contents);
}

export function a(title, contents) {

   return mochaDescribe(`A${delimiter} `, title, contents);
}

export function the(title, contents) {

   return mochaDescribe(`The${delimiter} `, title, contents);
}

export function forA(title, contents) {

   return mochaDescribe(`For${delimiter} `, title, contents);
}

export function forAn(title, contents) {

   return mochaDescribe(`For${delimiter} `, title, contents);
}

export function forThe(title, contents) {

   return mochaDescribe(`For${delimiter} `, title, contents);
}

export function given(title, contents) {

   return mochaDescribe(`Given${delimiter} `, title, contents);
}

export function when(title, contents) {

   return mochaDescribe(`When${delimiter} `, title, contents);
}

export function then(title, contents) {

   return mochaIt(`Then${delimiter} `, title, contents);
}

export function and(title, contents) {

   return mochaIt(` And${delimiter} `, title, contents);
}

export function should(title, contents) {

   return mochaIt(`Should${delimiter} `, title, contents);
}