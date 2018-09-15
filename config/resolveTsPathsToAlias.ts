import path = require('path');
const { paths } = require('../tsconfig.json').compilerOptions;

const resolveTsPathsToAlias = () => Object.keys(paths)
  .reduce((a, pathKey) => {
    if (pathKey.includes('*')) {
      a[pathKey.replace('/*', '')] = path.resolve(process.cwd(), paths[pathKey][0].replace('/*', ''));
    }
    return a;
  }, {});

export = resolveTsPathsToAlias;
