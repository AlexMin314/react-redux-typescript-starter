import webpack = require('webpack');
import path = require('path');
import paths = require('./paths');
import IP = require('ip');
const chalk = require('chalk');

import common = require('./webpack.config.common');
import devServer = require('./devServer');
const ENV = require('./config.json');

import HtmlWebpackPlugin = require('html-webpack-plugin');
import FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
import HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const { BaseHrefWebpackPlugin } = require('base-href-webpack-plugin');

export = (env: string) => {
  const port = ENV.FRONT_PORT || 3000;
  const ip = IP.address();
  const envs = env.split(':');
  const commons = common(env);
  return {
    mode: envs[0],
    devtool: 'cheap-module-eval-source-map',
    watch: true,
    entry: {
      app: ['@babel/polyfill', path.resolve(process.cwd(), 'src/index.tsx')],
    },
    output: {
      path: paths.dist,
      filename: '[name].js',
      chunkFilename: '[name].bundle.js',
      publicPath: '/',
    },
    module: {
      rules: [
        ...commons.loaders,
      ],
    },
    plugins: [
      ...commons.plugins,
      new HardSourceWebpackPlugin({
        cacheDirectory: `${paths.cache}/hard-source/[confighash]`,
        environmentHash: {
          root: paths.root,
          directories: [],
          files: ['package-lock.json', '.babelrc', 'tslint.json', 'tsconfig.json'],
        },
        info: {
          mode: 'none',
          level: 'debug',
        },
        configHash (webpackConfig) {
          const hash = require('node-object-hash')({ sort: false }).hash(webpackConfig);
          return `${envs[0]}-${envs[1]}-${envs[2]};-${hash}`;
        },
        cachePrune: {
          maxAge: 1 * 4 * 60 * 60 * 1000,
          sizeThreshold: 50 * 1024 * 1024,
        },
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: paths.html,
      }),
      new BaseHrefWebpackPlugin({
        baseHref: ENV.BASE_DEV,
      }),
      new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
          messages: [
            `${chalk.inverse(' App is running: ')}\n
    [INTERNAL] : http://localhost:${port}\n    [EXTERNAL] : http://${ip}:${port}
    [ENV]: ${envs[0]}, [SERVER ENV]: ${envs[1]}${envs[2] ? `:${envs[2]}` : ''}\n`,
            'Please check README for more npm scripts',
          ],
          notes: [],
        },
      }),
      new webpack.HotModuleReplacementPlugin(),
    ],
    resolve: {
      ...commons.resolve,
    },
    optimization: {
      runtimeChunk: {
        name: 'manifest',
      },
      removeAvailableModules: false,
      removeEmptyChunks: false,
      splitChunks: false,
    },
    devServer: devServer(envs),
  };
};
