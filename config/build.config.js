import theme from './theme';

export default {

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
    logFileNames: true,
    uniqueArtifactName: true,
    lint: false
  },

  // Custom assets
  custom: {
    fonts: []

    // TODO: Add images here !!!
  },

  // UI Theme (Material Components Web + Material UI colours)
  theme
};