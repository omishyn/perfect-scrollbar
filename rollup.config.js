'use strict';

const path = require('path');
const minify = require('rollup-plugin-babel-minify');
const buble = require('rollup-plugin-buble');

const version = require('./package.json').version;
const banner =
  `/*!
 * om-perfect-scrollbar v${version}
 * Copyright ${new Date().getFullYear()} AMC BI Team & OM, MDBootstrap and Contributors
 * Licensed under MIT
 */
`;

const resolve = _path => path.resolve(__dirname, _path);

const outputs = [
  {
    file: resolve('dist/perfect-scrollbar.js'),
    format: 'umd',
    banner,
    name: 'PerfectScrollbar'
  },
  {
    file: resolve('dist/perfect-scrollbar.min.js'),
    format: 'umd',
    banner,
    name: 'PerfectScrollbar',
    min: true
  },
  {
    file: resolve('dist/perfect-scrollbar.common.js'),
    format: 'cjs',
    banner
  },
  {
    file: resolve('dist/perfect-scrollbar.esm.js'),
    format: 'es',
    banner
  }
];

const plugins = buble();

const shouldMinify = (output) => {
  return output.min ? minify() : null
};

module.exports = outputs.map(output => {
  return {
    input: path.resolve(__dirname, `./src/index.js`),
    output,
    plugins: [
      plugins,
      shouldMinify(output)
    ]
  }
});
