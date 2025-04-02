const path = require('path');
const HtmlWebpackPulgin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  entry: './src/main.js',
  output: {
    clean: true,
    publicPath: 'http://localhost:8081/',
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
      filename: 'project1',
      name: 'project1',
      exposes: {
        createBtn: './src/createBtn',
      },
      remotes: {
        project2: 'project2@http://localhost:8082/project2',
      },
    }),
  ],
  devServer: {
    port: 8081,
  },
  devtool: false,
  mode: 'development',
};
