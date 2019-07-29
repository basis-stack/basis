import webpackConfig from './webpack.config';

const defaultPaths = {

  build: './dist',
  client: './src/client',

  // TODO: Is this (publish dir) even required anymore with new docker deploy model ??
  publish: './publish',
  server: './src/server',

  // TODO: Depricate all theme / MDC stuff (hence this temp dir not needed) !!
  temp: './temp'
};

const defaultOptions = {

  logFileNames: true,
  // uniqueArtifactName: true,
  lint: true,
  runtimeDependenciesToExclude: []
};

// TODO: Depricate all theme / MDC stuff !!
const defaultTheme = {

  primary: '#2196F3',
  secondary: '#ffc400',
  background: '#fff',
  appBar: '#1976D2'
};

export const getDefaultBuildConfig = () => ({

  paths: defaultPaths,
  options: defaultOptions,
  theme: defaultTheme
});

export const getDefaultWebpackConfig = () => webpackConfig;