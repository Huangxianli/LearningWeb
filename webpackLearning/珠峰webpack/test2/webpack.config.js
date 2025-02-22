/* 
loader：对模块进行转化，webpack 只能处理 js 和 json 文件，其他文件需要 loader 进行转化
 */

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');

module.exports = {
  entry: {
    main: './src/main.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        /*  use: [
           'style-loader', // 将 转化后的 js 代码插入到新建的 style 标签中  
           'css-loader' // css 文件转化成 js 代码
           // css loader 会处理 url() 和 import 导入的 css 资源和 css 文件，其中的图片会打包生新的文件，但是注意，html 文件中的图片不会被打包,
           'postcss-loadr' // 用于给 css 文件添加浏览器前缀
         ] */
        use: [
          MiniCssExtractPlugin.loader, // 会生成 css 文件，但是要手动的引入
          'css-loader',
          'postcss-loader', // 可以配合 postcss.config.js autoprefixer插件 .browserslistrc 文件使用
        ]
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({ // 该插件会以目标 html 文件生成一个新的 html 文件，并将打包后的文件自动的引入到 html 文件中
      template: './public/index.html',
    }),
  ],
  mode: 'development',
  devtool: false,
}