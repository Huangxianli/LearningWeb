/* input */

module.exports = {
  entry: './src/notMain.js', // 打包开始的入口，输出的文件默认的就是 main.js 和入口文件的文件名成没有关系
  // entry: ['./src/main.js', './src/main1.js'], // 最后打包的文件会合并成一个，即使是设置了 output 也是一个
  // entry: { // 使用对象的方式进行打包定打包入口，打包后的文件有，打包后的文件以 key 命名
  //   main: './src/main.js',
  //   main1: './src/main1.js',
  // },
  output: {
    clean: true,
  },
  mode: 'development',
  devtool: false,
}