const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: './src/js/main.js',
  },
  output: {
    clean: true,
    path: path.resolve(__dirname, 'dist3'),
    filename: './js/[name].[hash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  mode: 'development',
  // devtool: 'cheap-source-map', // 如果使用这个打包，在这个文件的配置下，在源代码处看，代码是转化成了 es 5后的格式
  devtool: 'cheap-module-source-map', // 自己写的格式
};
