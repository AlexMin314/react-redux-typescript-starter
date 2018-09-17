const TSDocgenPlugin = require('react-docgen-typescript-webpack-plugin');

export = (baseConfig: any, env: any, config: any) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
  });
  config.plugins.push(new TSDocgenPlugin());
  config.resolve.extensions.push('.ts', '.tsx');
  config.stats = 'none';
  return config;
};
