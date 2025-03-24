const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: './src/js/main.js',
  },
  output: {
    clean: true,
    path: path.resolve(__dirname, 'dist2'),
    filename: './js/[name].[hash:8].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  mode: 'development',
  devtool: 'cheap-source-map',
};
