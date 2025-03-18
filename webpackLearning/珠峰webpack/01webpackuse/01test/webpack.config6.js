/* babel-loader ts-loader eslint-webpack-plugin */
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
        use: [
          {
            loader: 'babel-loader',
            options: { // 也可以写在 .babelrc babel.config.js 中
              presets: [
                '@babel/preset-env', // 已经定义好的插件集
              ],
              /*presets: [
                  '@babel/preset-typescript' // 如果这样写的话，就不需要额外的加 ts-loader 了
                ], */
            }
          },
          'ts-loader',
        ]
      }
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      hot: true,
      compress: true,
    }),
    new EslintWebpackPlugin({ // 要配合 .eslintrc 文件一起使用
      context: path.resolve(__dirname, '.'),
      extensions: ['.js', '.ts'], // 那些文件要检查
    })
  ],
  mode: 'development',
  devtool: false,
}