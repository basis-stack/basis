import assetConfig from 'basis-assets';
import theme from './theme';

export default {

  // Basis Asset config
  ...assetConfig,

  // File paths
  paths: {
    build: './dist',
    client: './src/client',
    publish: './publish',
    server: './src/server',
    temp: './temp'
  },

  // Build options
  options: {
    logFileNames: false,
    serverOnly: false,
    uniqueArtifactName: true
  },

  // Custom assets
  custom: {
    fonts: []

    // TODO: Add images here !!!
  },

  // UI Theme (Material Components Web + Material UI colours)
  theme
};