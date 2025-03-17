/* output */

const path = require('path');
module.exports = {
  // entry: './src/notMain.js', // 打包开始的入口，输出的文件默认的就是 main.js 和入口文件的文件名成没有关系
  // entry: ['./src/main.js', './src/main1.js'], // 最后打包的文件会合并成一个 main.js
  entry: { // 使用对象的方式进行打包定打包入口，打包后的文件有，打包后的文件以 key 命名
    mainKey: './src/main.js',
    mainKey1: './src/main1.js',
  },
  output: {
    clean: true,
    path: path.resolve(__dirname, 'dist1/js'),
    filename: '[name].js', // entry 是字符串或者数组形式的时候，name 都默认是 main，和文件的命名和个数没有关系；如果是对象的时候，name 默认是 key，和文件的名称没有关系
  },
  mode: 'development',
  devtool: false,
}