import assetConfig from 'basis-assets';

export default Object.assign({}, assetConfig, {

  // File paths
  paths: {
    build: './dist',
    client: './src/client',
    package: './package',
    packages: './packages',
    server: './src/server',
    temp: './temp',
    tests: './test'
  },

  // Build options
  options: {
    logFileNames: false
  },

  // Custom assets
  custom: {
    fonts: []

    // TODO: Add images here !!!
  },

  // UI Theme (Material Components Web + React Toolbox colours)
  // TODO: Get these from assetConfig.colours
  theme: {
    primary: '#2196F3',
    primaryDark: '#1976D2',
    secondary: '#ffc400',
    background: '#fff'
  }
});