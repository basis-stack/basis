const buildPath = './dist';
const clientPath = './src/client';
const packagesPath = './packages';
const serverPath = './src/server';
const testsPath = './test';
// TODO: Change this so doesn't conflict with individual npm packages
const packagePath = './package';

export default {

  // File paths
  paths: {
    build: buildPath,
    client: clientPath,
    package: packagePath,
    packages: packagesPath,
    server: serverPath,
    tests: testsPath
  },

  // Vendor assets
  vendor: {
    fonts: [
      './node_modules/roboto-fontface/fonts/roboto/**/@(*Light|*Regular|*Medium).{eot,svg,ttf,woff,woff2}',
      './node_modules/material-design-icons-iconfont/dist/fonts/**/*.{eot,svg,ttf,woff,woff2}',
      './node_modules/font-awesome/fonts/*.{eot,svg,ttf,woff,woff2}'
    ]
  },

  // Options
  options: {
    logFileNames: false
  }
};