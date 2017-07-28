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
      './node_modules/roboto-fontface/fonts/Roboto/**/@(*Light|*Regular|*Medium).{eot,svg,ttf,woff,woff2}',
      './node_modules/material-design-icons-iconfont/dist/fonts/**/*.{eot,svg,ttf,woff,woff2}',
      './node_modules/font-awesome/fonts/*.{eot,svg,ttf,woff,woff2}'
    ]
  }
};