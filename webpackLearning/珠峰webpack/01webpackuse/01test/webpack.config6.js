/* babel-loader ts-loader eslint-webpack-plugin */
/**
 * babel-loader 可以将 ts（依赖预设 @babel/preset-typescript） 或者 js 处理成指定 es 版本的 js 代码
 *
 * eslint-webpack-plugin 是用来检查代码的规范
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: './src/main6.ts',
  output: {
    clean: true,
    path: path.resolve(__dirname, 'dist6'),
    filename: './js/[name].js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              // 也可以写在 .babelrc babel.config.js 中
              presets: [
                '@babel/preset-env', // 已经定义好的插件集
              ],
            },
          },
          'ts-loader',
        ],
      },
      // {
      //   test: /\.ts$/,
      //   exclude: /node_modules/,
      //   use: [
      //     {
      //       loader: 'babel-loader',
      //       options: {
      //         // 也可以写在 .babelrc babel.config.js 中
      //         // presets: [
      //         //   '@babel/preset-typescript' // 如果这样写的话，就不需要额外的加 ts-loader 了
      //         // ],
      //       },
      //     },
      //   ],
      // },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      hot: true,
      compress: true,
    }),
    new EslintWebpackPlugin({
      // 要配合 .eslintrc 文件一起使用
      context: path.resolve(__dirname, '.'),
      extensions: ['.js', '.ts'], // 哪些文件要检查
    }),
  ],
  mode: 'development',
  devtool: false,
};
