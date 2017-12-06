export default {

  taskKeys: {

    // Clean
    clean: 'clean',
    prepareBuild: 'prepare:build',

    // Client
    bundleClient: 'bundle:client',

    // Create
    createPackageJson: 'create:package-json',
    createEnvSettings: 'create:env-settings',

    // Assets
    copyFonts: 'copy:fonts',

    // Lint
    lintClient: 'lint:client',
    lintPackages: 'lint:packages',
    lintServer: 'lint:server',
    lintAll: 'lint:all',

    // Packages
    compilePackages: 'compile:packages',

    // Server
    compileServer: 'compile:server',
    copyServerViews: 'copy:server:views',
    sassServer: 'sass:server'
  },

  globs: {

    js: '/**/*.js',
    jsx: '/**/*.jsx',
    notTests: '!**/test/*',
    packageJson: '/**/package.json',
    views: '/**/*.ejs'
  }
};