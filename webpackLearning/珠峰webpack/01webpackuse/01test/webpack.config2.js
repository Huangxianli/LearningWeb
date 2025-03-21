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
        oneOf: [
          {
            test: /\.css$/, // 注意即使是匹配成功了，如果后续还有 test，则不会停止匹配，直到最后一个匹配成了才停止，全部匹配完了之后开始执行 loader，如果没有特定设置顺序，会从最后一个 loader 执行到第一个 loader，也就是说不特地设置，那么执行顺序一定是从后往前的
            use: ['style-loader', 'css-loader'], // 从后往前执行
            // css-loader：将 css 代码转化成 js 代码
            // style-loader：通过 style 标签将 css 动态的插入到 html 中
          },
        ],
      },
    ],
  },
  mode: 'development',
  devtool: false,
};
