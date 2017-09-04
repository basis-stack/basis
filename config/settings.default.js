export default {

  // Shared settings across client & server
  shared: {
    appName: 'basis'
  },

  // Server specific settings
  server: {
    webServerPort: 3000,
    frontWithNginx: false,
    nodeRuntimeVersion: 6.10,
    logPath: '~/logs/'
  },

  // Client specific settings
  client: {
  },

  // Deploy settings
  deploy: {
  }
};