const path = require('path');
const EslintWebpackPlugin = require('eslint-webpack-plugin');


module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader', // 将 代码转化成可以在低版本浏览器可以运行的代码 配合 .babelrc 文件 @babel/preset-env 预设一起使用或者使用下面的方式
          /* {
            laoder: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env'
              ]
            }
          } */
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.ts$/,
        use: [
          'babel-loader',
          'ts-loader', // 将 ts 代码转化成 js 代码，配和 tsconfig.json 文件使用
        ],
        exclude: /node_modules/,
      }
    ]
  },
  plugins: [
    new EslintWebpackPlugin({
      extensions: ['.js', '.ts']
    }),
  ],
  mode: 'development',
  devtool: false,
}