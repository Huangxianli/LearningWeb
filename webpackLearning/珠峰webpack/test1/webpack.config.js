const path = require('path');

module.exports = {
  entry: {
    main: './src/main.js',
    main1: './src/main1.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js', // 会生成 entry 中配置的入口文件名，这里就会生成 main.js 和 main1.js 两个文件
  },
  mode: 'development',
  devtool: false,
}