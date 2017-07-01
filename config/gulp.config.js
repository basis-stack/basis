const buildPath = './build';
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
    styles: [
      './node_modules/roboto-fontface/css/roboto/roboto-fontface.css',
      './node_modules/@material/typography/dist/mdc.typography.min.css'
    ],
    fonts: [
      // TODO: Bring in material icons font
      './node_modules/roboto-fontface/fonts/Roboto/**/*.{eot,svg,ttf,woff,woff2}'
    ]
  }
};