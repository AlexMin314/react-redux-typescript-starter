import path = require('path');

const _pathFn = (...paths: string[]): string => path.join(process.cwd(), ...paths);

const paths = {
  root: _pathFn(),
  entry: _pathFn('src', 'index.tsx'),
  src: _pathFn('src'),
  assets: _pathFn('src', 'assets'),
  dist: _pathFn('dist'),
  html: _pathFn('dist', 'index.html'),
  cache: _pathFn('.cache'),
  nodes_modules: _pathFn('node_modules'),
  tsConfig: _pathFn('tsconfig.json'),
  dev: '/',
  prod: '/d2c/',
};

export = paths;
