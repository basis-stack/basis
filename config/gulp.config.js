const buildPath = './dist';
const serverPath = './src/server';
const testsPath = './test';

// TODO: Change this so doesn't conflict with individual npm packages
const packagePath = './package';

const packagesPath = './packages';

export default {
  paths: {
    build: buildPath,
    server: serverPath,
    tests: testsPath,
    package: packagePath,
    packages: packagesPath
  },
  vendor: {
    fonts: [
      './node_modules/roboto-fontface/fonts/roboto/**/@(*Light|*Regular|*Medium).{eot,svg,ttf,woff,woff2}',
      './node_modules/material-design-icons-iconfont/dist/fonts/**/*.{eot,svg,ttf,woff,woff2}',
      './node_modules/font-awesome/fonts/*.{eot,svg,ttf,woff,woff2}'
    ]
  }
};