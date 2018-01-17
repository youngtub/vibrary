'use strict';

var path = require('path');
var webpack = require('webpack');

var config = {
  entry: './ui/Index.jsx',
  output: { path: __dirname + '/ui', filename: 'bundle.js' },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
        options: {
          minify: true
        }
      },
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2016', 'react'],
          plugins: ["transform-class-properties"]
        }
      }
      ]
  },
  node: {
    fs: 'empty'
  },
  watch: true
};

module.exports = config;
