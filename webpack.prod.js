/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = merge(common, {
  performance: {
    hints: false,
  },
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'Production',
    }),
    new UglifyJSPlugin({
      uglifyOptions: {
        dead_code: true,
        output: {
          comments: false,
        },
      },
    }),
    new webpack.DefinePlugin({
      DEV: 'false',
    }),
    new StyleLintPlugin({
      configFile: './.stylelintrc',
      syntax: 'scss',
    }),
  ],
});
