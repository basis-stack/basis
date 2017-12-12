export default {

  taskKeys: {

    // Clean
    clean: 'clean',
    prepareBuild: 'prepare:build',
    finalise: 'finalise',

    // Client
    bundleClient: 'bundle:client',
    createClientTheme: 'create:client:theme',
    createReactToolboxConfig: 'create:react-toolbox:config',
    createReactToolboxTheme: 'create:react-toolbox:theme',
    sassClient: 'sass:client',

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
    createServerTheme: 'create:server:theme',
    sassServer: 'sass:server',

    // Build
    buildServer: 'build:server',
    buildPackages: 'build:packages',
    buildClient: 'build:client',
    buildAll: 'build:all',
    buildFull: 'build:full',
    buildIncremental: 'build:incremental'
  },

  globs: {

    js: '/**/*.js',
    jsx: '/**/*.jsx',
    notTests: '!**/test/*',
    packageJson: '/**/package.json',
    sass: '/**/*.scss',
    views: '/**/*.ejs'
  },

  tokenKeys: {

    // Deploy
  }
};