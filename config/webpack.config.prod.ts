import webpack = require('webpack');
import paths = require('./paths');

import common = require('./webpack.config.common');
const ENV = require('./config.json');

import CleanWebpackPlugin = require('clean-webpack-plugin');
import HtmlWebpackPlugin = require('html-webpack-plugin');
import DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
import CompressionPlugin = require('compression-webpack-plugin');
import UglifyJsPlugin = require('uglifyjs-webpack-plugin');
import OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
import AssetsPlugin = require('assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { BaseHrefWebpackPlugin } = require('base-href-webpack-plugin');

export = (env) => {
  const envs = env.split(':');
  const commons = common(env);
  const isAnalysis = envs[1] === 'analysis';
  return {
    mode: envs[0],
    devtool: false,
    bail: true,
    entry: {
      app: ['@babel/polyfill', paths.entry],
    },
    output: {
      path: paths.dist,
      filename: '[name].[hash].js',
      chunkFilename: '[name].[chunkhash].bundle.js',
    },
    stats: {
      colors: true,
      children: false,
      chunks: false,
      modules: false,
      excludeAssets: [/assets/],
    },
    performance: {
      hints: false,
    },
    module: {
      rules: [
        ...commons.loaders,
      ],
    },
    plugins: [
      ...commons.plugins,
      new CleanWebpackPlugin('dist', {
        root: process.cwd(),
      }),
      isAnalysis &&
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: './stats-analyzer.html',
        openAnalyzer: true,
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: paths.html,
        minify: {
          caseSensitive: true,
          collapseWhitespace: true,
          collapseInlineTagWhitespace: true,
          keepClosingSlash: true,
          removeComments: true,
          removeRedundantAttributes: true,
          preserveLineBreaks: true,
        },
      }),
      new BaseHrefWebpackPlugin({
        baseHref: ENV.BASE_PROD,
      }),
      new webpack.HashedModuleIdsPlugin(),
      new AssetsPlugin({ path: paths.cache }),
      new DuplicatePackageCheckerPlugin(),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new CompressionPlugin({
        test: /\.(js|css|html)$/,
      }),
    ].filter(Boolean),
    resolve: {
      ...commons.resolve,
    },
    optimization: {
      runtimeChunk: {
        name: 'manifest',
      },
      occurrenceOrder: true,
      minimizer: [
        new UglifyJsPlugin({
          exclude: [/\.min\.js$/gi],
          parallel: true,
          uglifyOptions: {
            ecma: 5,
            compress: {
              warnings: false,
              drop_console: true,
            },
            safari10: true,
            ie8: true,
          },
        }),
        new OptimizeCSSAssetsPlugin({}),
      ],
      splitChunks: {
        chunks: 'all',
        name: 'client',
        cacheGroups: {
          commons: {
            name: 'commons',
            chunks: 'initial',
            minChunks: 2,
          },
        },
      },
    },
  };
};
