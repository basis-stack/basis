module.exports = function (api) {

  api.cache(true);

  const presets = [
    '@babel/preset-env',
    '@babel/preset-react'
  ];

  const plugins = [
    ['@babel/plugin-proposal-decorators', { legacy: true }]
  ];

  const env = {
    test: {
      plugins: ['istanbul']
    }
  };

  return {
    presets,
    plugins,
    env
  };
};