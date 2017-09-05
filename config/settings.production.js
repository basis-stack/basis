export default {

  // Production Environment Overrides (of settings.default)

  server: {
    webServerPort: 8080,
    frontWithNginx: true,
    publicPort: 80
  },

  deploy: {
    deployUser: '<PROD_USER>',
    deployHost: '<PROD_HOST>',
    deployDirectory: '<PROD_PATH>'
  }
};