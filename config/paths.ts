import path = require('path');

const _pathFn = (...paths) => path.join(process.cwd(), ...paths);

const paths = {
  root: _pathFn(),
  entry: _pathFn('src', 'index.tsx'),
  tsConfig: _pathFn('tsconfig.json'),
  src: _pathFn('src'),
  assets: _pathFn('src/assets'),
  dist: _pathFn('dist'),
  html: _pathFn('dist', 'index.html'),
  cache: _pathFn('.cache'),
  nodes_modules: _pathFn('node_modules'),
  modules: _pathFn('src/modules'),
  utils: _pathFn('src/modules/_Core/utils'),
  configs: _pathFn('src/modules/_Core/configs'),
  constants: _pathFn('src/modules/_Core/constants'),
  logger: _pathFn('src/modules/_Core/store/middlewares/logger'),
  dev: '/',
  prod: '/d2c/',
};

export = paths;
