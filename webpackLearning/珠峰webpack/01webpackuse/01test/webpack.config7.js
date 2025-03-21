/* 图片处理 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { type } = require('os');

module.exports = {
  entry: './src/main7.js',
  output: {
    path: path.resolve(__dirname, 'dist7'),
    filename: './js/[name].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.png$/,
        type: 'asset/resource', // 生成单独的文件，并导出 URL
        // type: 'asset/inline', // 导出资产的数据 URL（base64）（一定会变大）
        // type: 'asset/source', // 导出资产的源代码，将文件内容直接作为字符串内联到代码中
        // type: 'asset', // 根据文件大小限制，选择导出数据 URL 还是生成单独的文件
        // parser: {
        //   dataUrlCondition: {
        //     maxSize: 4 * 1024, // 4KB 以下内联
        //   },
        // },
        generator: {
          filename: 'images/[name].[hash:8][ext]', // 输出路径
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
  ],
  mode: 'development',
  devtool: false,
};
