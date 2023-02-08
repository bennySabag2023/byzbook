const path = require('path');
const webpack = require('webpack'); //to access built-in plugins

module.exports = {
  entry: './server.js',
  mode: 'production',
  target: 'node',
  module: {
    rules: [{ test: /\.txt$/, use: 'raw-loader' }],
  },
  output: {
    path: __dirname,
    filename: 'server.bundle.js'
  }
};