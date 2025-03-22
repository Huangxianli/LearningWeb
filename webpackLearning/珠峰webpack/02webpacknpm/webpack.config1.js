/* 打包成一个库 */
const path = require('path');
const webpackMerge = require('webpack-merge');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

console.log(
  '11111111111111111111111111111111111111111111',
  process.env.NODE_ENV
);
const baseConfig = {
  entry: {
    main1: './src/js/main1.js',
  },
  output: {
    clean: true,
    library: 'testPackge', // 打包之后库的名称
    libraryExport: 'add', // 只导出 add
    path: path.resolve(__dirname, 'dist1'),
    filename: 'js/[name][hash:8].js',
  },
  externals: [
    // 这个属性表明，打包的时候，jquery 的实际代码不会打包到这个包里面，要求用户在使用这个包的时候，已经存在了 里面的包
    // 要配合 package.json 的 peerDependencies: { jquery: '1.1.1'} 一起使用
    {
      jquery: {
        commonjs: 'jquery',
        amd: 'jquery',
      },
    },
  ],
  module: {
    rules: [
      {
        test: /\.css/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/main.css',
    }),
  ],
  mode: 'development',
  devtool: false,
};

module.exports = [
  webpackMerge.merge(baseConfig, {
    output: {
      filename: 'js/[name]-common.js',
      library: {
        name: 'testPackge',
        type: 'commonjs',
      },
    },
  }),
  webpackMerge.merge(baseConfig, {
    output: {
      filename: 'js/[name]-amd.js',
      library: {
        name: 'testPackge',
        type: 'amd',
      },
    },
  }),
];

/* 
区分环境
mode: none development production
在命令行 --mode=development 这样会覆盖 webpack 选项 mode 的值，会决定实际要打包的源代码中的 process.env.NODE_ENV 的值，不会影响到 webpack.config.js 文件上
插件 webpack.DefinePlugin({ // 这个也是覆盖掉源代码里面的定义的变量
  'process.env.NODE_ENV': JSON.stringify('development'), // 注意一定要加 JSON.stringify()，不然 development 会被当成一个变量
})

cross-env： cross-env NODE_ENV=production // 这样是设置 node 的变量 process.env.NODE_ENV 的值，如果是浏览器中执行，获取到的是 undefiend

module.exports=(env, argv) => {}
npx webpack --env mode=production 这样就是将第一个参数 env 的 mode 属性 设置成 production，注意不是设置 process.env.NODE_ENV
 */
