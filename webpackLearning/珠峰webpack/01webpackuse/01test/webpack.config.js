/* input */

module.exports = {
  entry: './src/notMain.js', // 打包开始的入口，输出的文件默认的就是 main.js 和入口文件的文件名成没有关系
  // entry: ['./src/main.js', './src/main1.js'], // 最后打包的文件会合并成一个，即使是设置了 output 也是一个
  // entry: { // 使用对象的方式进行打包定打包入口，打包后的文件有，打包后的文件以 key 命名
  //   main: './src/main.js',
  //   main1: './src/main1.js',
  // },
  // entry: {
  //   maim: () => './src/main.js',
  // }
  // entry: ()=> './src/main.js',
  entry: {
    main: './src/main.js',
    main1: {
      import: './src/main1.js',
      dependOn: 'main', // mian1 依赖 main，如果实际的代码中，main1 中的代码依赖 main 中的代码，那么 main1 在打包的时候，不会把在 main1 中用到的 main 中的代码实际的打包到 main1 中，只会进行一个引用，引用 main，以减少 main1 的打包体积
      runtime: 'runtime-main1', // 设置 main1 对应的 runtime chunk，如果不设置，运行时代码会打包到 bundle 中，如果设置的话，会将运行时代码抽离成一个单独的文件，多个 chunk 设置同一个 runtime 名称，会合并生成同一个 runtime 文件，避免在每个文件中重复的注入运行时代码，从而减小文件的体积（webpack 打包出来的模块是 commonjs 模块，浏览器不认识，运行时就是为了解决这个问题）
      // 浏览器支持 es module，不支持 commonjs；commonjs 是 nodejs 支持的
    },
  },
  output: {
    clean: true,
  },
  mode: 'development',
  devtool: false,
};
