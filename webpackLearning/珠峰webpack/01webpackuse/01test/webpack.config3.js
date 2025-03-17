/* plugin */
// 插件是一种用于扩展 Webpack 功能的机制，通过插件可以在 Webpack 打包过程中执行额外的任务或进行优化

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // ​主要用于自动生成 HTML 文件并动态注入 Webpack 打包后的静态资源（JS/CSS）​

module.exports = {
  entry: {
    mainKey: './src/main.js',
    mainKey1: './src/main1.js',
  },
  // entry: [ // 在注明一次，entry 为数组，最终会打包成一个 main.js 文件
  //   './src/main.js',
  //   './src/main1.js'
  // ],
  output: {
    clean: true,
    path: path.resolve(__dirname, 'dist3/js'),
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
      filename: '../index.html', // 输出文件的路径和名称，相对于 output.path
      title: '测试',
      chunks: ['mainKey'], // html 文件中引入那些 chunks，如果不写的话，引入所有打包出来的
    }),
    new HtmlWebpackPlugin({
      template: './src/index1.html',
      filename: '../index1.html',
      title: '测试1',
      chunks: ['mainKey1'],
    }),
  ],
  mode: 'development',
  devtool: false,
}