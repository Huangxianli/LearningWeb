const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: '[name].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.png$/,
        type: 'asset/resource', // 生成文件，同时导出 URL
        // asset/inline 转化成 base64 的格式
        // asset 按照 generator.maxSize 配置决定是否转化成 base64（小于就转化）
        // asset/source 导出资产的源代码
        generator: {
          filename: '../img/[name].[hash][ext]',
        }
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '../css/index.css',
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: '../index.html', // 依赖与 output 的 path 
    })
  ],
  mode: 'development',
  devtool: false,
};