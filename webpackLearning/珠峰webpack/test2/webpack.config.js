/* 
loader：对模块进行转化，webpack 只能处理 js 和 json 文件，其他文件需要 loader 进行转化
 */

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
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ],
  },
  mode: 'development',
  devtool: false,
}