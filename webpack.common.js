/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { version } = require('./package.json');

module.exports = {
  entry: {
    vendor: '@babel/polyfill',
    app: './src/index.jsx',
  },
  output: {
    filename: `b-[name]_v-${version}.bundle.js`,
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '/',
  },
  optimization: {
    splitChunks: { // CommonsChunkPlugin()
      name: 'common',
    },
  },
  plugins: [
    new CleanWebpackPlugin(['build'], {
      root: process.cwd(),
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/env', { modules: false }],
              '@babel/react',
            ],
          },
        },
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|otf)$/,
        loader: 'url-loader',
      },
    ],
  },
};
