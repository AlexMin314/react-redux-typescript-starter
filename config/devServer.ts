import paths = require('./paths');
const chalk = require('chalk');
const ENV = require('./config.json');

export = (envs: string[]) => ({
  port: ENV.FRONT_PORT,
  hot: true,
  host: '0.0.0.0',
  disableHostCheck: true,
  contentBase: paths.src,
  historyApiFallback: true,
  compress: true,
  stats: 'none',
  quiet: true,
  noInfo: true,
  clientLogLevel: 'none',
  before () {
    console.log(
      '\n',
      chalk.bgCyan.black('\n DEV SERVER '),
      chalk.cyan('Starting the development server...\n'),
      '\n',
      chalk.inverse('\n ENV STATUS '),
      chalk.white(`ENV: ${envs[0]}, SERVER: ${envs[1]}${envs[2] ? `:${envs[2]}` : ''}\n`),
      '\n',
    );
  },
});
