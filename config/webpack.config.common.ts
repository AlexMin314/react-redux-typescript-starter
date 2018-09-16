import webpack = require('webpack');
import paths = require('./paths');
import resolveTsPathsToAlias = require('./resolveTsPathsToAlias');
const ENV = require('./config.json');

import ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const SimpleProgressPlugin = require('webpack-simple-progress-plugin');

export = (env: string) => {
  const isDev = env[0] === 'development';
  const cpus = require('os').cpus().length;
  const maxThread = cpus > 4
    ? cpus - 3
    : cpus > 3
      ? cpus - 2
      : 1;
  const extraThread = cpus > 4 ? 2 : 1;
  return {
    loaders: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'tslint-loader',
        enforce: 'pre',
        options: {
          failOnHint: true,
          emitErrors: true,
          formattersDirectory: 'node_modules/tslint-formatter-beauty',
          formatter: 'beauty',
        },
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: maxThread,
              workerParallelJobs: 50,
              poolTimeout: isDev ? 'Infinity' : 500,
            },
          },
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.(jpg|png|gif|ico|bmp|svg)$/,
        exclude: /font/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'assets/images/[name].[hash:8].[ext]',
              fallback: 'file-loader',
            },
          },
        ],
      },
      {
        test: /\.(svg|woff|woff2|eot|ttf|otf)$/,
        exclude: /images/,
        use: {
          loader: 'file-loader',
          options: { name: 'assets/fonts/[name].[hash:8].[ext]' },
        },
      },
    ],
    plugins: [
      new SimpleProgressPlugin(),
      new ForkTsCheckerWebpackPlugin({
        tsconfig: paths.tsConfig,
        checkSyntacticErrors: true, // for thread-loader
        workers: extraThread,
      }),
      new webpack.ProvidePlugin({
        moment: 'moment',
      }),
      new webpack.EnvironmentPlugin({
        NODE_ENV: env[0],
        SERVER_ENV: env[1] || '',
        SERVER_PORT: ENV.SERVER_PORT,
        LOG_P: ENV.LOGGER_PW,
        BUILD_DATE: new Date(),
        BASE_DEV: ENV.BASE_DEV,
        BASE_PROD: ENV.BASE_PROD,
      }),
    ],
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      symlinks: false,
      alias: {
        ...resolveTsPathsToAlias(),
      },
    },
  };
};
