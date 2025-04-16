const path = require('path');
const HtmlWebpackPulgin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  entry: './src/main.js',
  output: {
    clean: true,
    publicPath: 'http://localhost:8082/',
    path: path.resolve(__dirname, 'dist'),
    // filename: '[name][hash:8].js',
  },
  module: {},
  plugins: [
    new HtmlWebpackPulgin({
      template: './public/index.html',
      filename: 'index.html',
    }),
    new ModuleFederationPlugin({
      filename: 'project2',
      name: 'project2',
      exposes: {
        './createDiv': './src/createDiv',
      },
    }),
  ],
  devServer: {
    port: 8082,
  },
  devtool: false,
  mode: 'development',
};
