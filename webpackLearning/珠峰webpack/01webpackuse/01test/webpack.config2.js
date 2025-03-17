/* loader */
// Loader 可以将非 JS 模块（如CSS、图片等）转换为 Webpack 可以处理的有效模块
// loader 是一个函数，将传入的内容转化成一个新的内容

const path = require('path');
module.exports = {
  entry: './src/main2.js',
  output: {
    clean: true,
    path: path.resolve(__dirname, 'dist2/js'),
    filename: '[name].js', // entry 是字符串或者数组形式的时候，name 都默认是 main，和文件的命名和个数没有关系；如果是对象的时候，name 默认是 key，和文件的名称没有关系
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // 从后往前执行
        // css-loader：将 css 代码转化成 js 代码
        // style-loader：通过 style 标签将 css 动态的插入到 html 中
      }
    ],
  },
  mode: 'development',
  devtool: false,
}