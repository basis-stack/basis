export default {

  taskKeys: {

    // Clean
    clean: 'clean',
    prepareBuild: 'prepare:build',
    finalise: 'finalise',

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
    linkPackages: 'link:packages',
    unlinkPackages: 'unlink:packages',
    compilePackages: 'compile:packages',
    publishPackages: 'publish:packages',

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
    buildIncremental: 'build:incremental',
    buildStatic: 'build:static',

    // Publish
    copyServerScripts: 'copy:server:scripts',
    installRuntimeDependencies: 'install:runtime:dependencies',
    packageArtifacts: 'package:artifacts'
  },

  globs: {

    js: '/**/*.js',
    jsx: '/**/*.jsx',
    notTests: '!**/test/*',
    notNodeModules: '!**/node_modules/**/*.*',
    packageJson: '/**/package.json',
    sass: '/**/*.scss',
    ts: '/**/*.ts',
    tsx: '/**/*.tsx',
    views: '/**/*.ejs'
  },

  tokenKeys: {

    // Deploy
  }
};