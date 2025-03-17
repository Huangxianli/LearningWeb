/* devServer */
// 注意要下载 webpack-dev-server

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // ​主要用于自动生成 HTML 文件并动态注入 Webpack 打包后的静态资源（JS/CSS）​

module.exports = {
  entry: {
    mainKey: './src/main.js',
    mainKey1: './src/main1.js',
  },
  output: {
    clean: true,
    path: path.resolve(__dirname, 'dist4/js'),
    filename: '[name].js', // entry 是字符串或者数组形式的时候，name 都默认是 main，和文件的命名和个数没有关系；如果是对象的时候，name 默认是 key，和文件的名称没有关系
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // 以哪个文件为模板
      filename: 'index.html', // 输出文件的路径和名称，相对于 output.path
      title: '测试',
    }),
  ],
  mode: 'development',
  devtool: false,
  devServer: {
    host: 'localhost',
    port: 9000,
    open: false,
    hot: true,
    static: {
      directory: path.join(__dirname, 'dist4'), // 添加静态资源目录配置
    },
  },
}