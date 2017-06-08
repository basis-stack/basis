const buildPath = './build';
const appPath = './app';
const packagePath = './package';

export default {
  paths: {
    build: buildPath,
    app: appPath,
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