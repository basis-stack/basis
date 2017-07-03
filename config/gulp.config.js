const buildPath = './dist';
const serverPath = './src/server';
const testsPath = './test';
const packagePath = './package';

export default {
  paths: {
    build: buildPath,
    server: serverPath,
    tests: testsPath,
    package: packagePath
  },
  vendor: {
    fonts: [
      // TODO: Bring in material icons font
      './node_modules/roboto-fontface/fonts/Roboto/**/@(*Light|*Regular|*Medium).{eot,svg,ttf,woff,woff2}'
    ]
  }
};