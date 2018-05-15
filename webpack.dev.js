/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'Dev',
    }),
    new webpack.DefinePlugin({
      DEV: 'true',
    }),
    new StyleLintPlugin({
      configFile: './.stylelintrc',
      syntax: 'scss',
      emitErrors: false,
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].scss',
      chunkFilename: '[id].scss',
    }),
  ],
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './build',
    hot: true,
  },
});
