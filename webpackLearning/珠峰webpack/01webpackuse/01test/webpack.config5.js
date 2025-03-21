// 处理 css less sass 等资源
// css-loader 支持处理 import @import url() 等方式导入的 css 文件和 资源文件，css-loader 会将 url 的方式转化成 require() 的方式，不生成文件或修改最终路径
// postcss-loader 支持样式的兼容，自动的添加前缀，可以在 postcss.config.js 中进行配置
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // ​主要用于自动生成 HTML 文件并动态注入 Webpack 打包后的静态资源（JS/CSS）​
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 用于将 css 文件单独的提取出来，使用 <link> 标签引入（这个操作是 mini-css-extract-plugin 做的），这样可以在页面加载的时候，并行的加载 css 的内容
/* 
cross-env NODE_ENV=production
设置一个全局变量 NODE_ENV 它的值是 production

可以通过 process.env.NODE_ENV 来访问
但不是在所有的地方都可以访问到，在浏览器环境中访问不了，如果要在浏览器环境中能访问到，需要通过插件注入到前端代码中

plugins: [
  new webpack.DefinePlugin({
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
  }),
]
 */
const NODE_ENV = process.env.NODE_ENV;
const isProDUction = NODE_ENV === 'production';

module.exports = {
  entry: './src/main5.js',
  output: {
    clean: true,
    path: path.resolve(__dirname, 'dist5/js'),
    filename: '[name].js', // entry 是字符串或者数组形式的时候，name 都默认是 main，和文件的命名和个数没有关系；如果是对象的时候，name 默认是 key，和文件的名称没有关系
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          isProDUction ? MiniCssExtractPlugin.loader : 'style-loader',
          // 'style-loader', // 生成一段代码：创建 <style> 将 css-loader 的产物放到 <style> 中，并且将 <style> 插入到 元素中，使用这种方式会导致最终的打包带 js 特别的大，而且还会出现 FOUC 现象，开始是样式 A，一会之后变成了样式 B（容易出现闪烁问题）；这个时候要使用 mini-css-extract-plugin 来解决
          'css-loader', // 将 css 文件处理成 js 的形式
          'postcss-loader', // 进行样式的兼容
        ],
      },
      {
        test: /\.sass$/,
        use: [
          isProDUction ? MiniCssExtractPlugin.loader : 'style-loader',
          // 'style-loader', // 生成一段代码：创建 <style> 将 css-loader 的产物放到 <style> 中，并且将 <style> 插入到 元素中，使用这种方式会导致最终的打包带 js 特别的大，而且还会出现 FOUC 现象，开始是样式 A，一会之后变成了样式 B（容易出现闪烁问题）；这个时候要使用 mini-css-extract-plugin 来解决
          'css-loader', // 将 css 文件处理成 js 的形式
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          isProDUction ? MiniCssExtractPlugin.loader : 'style-loader',
          // 'style-loader', // 生成一段代码：创建 <style> 将 css-loader 的产物放到 <style> 中，并且将 <style> 插入到 元素中，使用这种方式会导致最终的打包带 js 特别的大，而且还会出现 FOUC 现象，开始是样式 A，一会之后变成了样式 B（容易出现闪烁问题）；这个时候要使用 mini-css-extract-plugin 来解决
          'css-loader', // 将 css 文件处理成 js 的形式
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index5.html',
      filename: 'index.html',
      title: '处理 css 资源',
    }),
    new MiniCssExtractPlugin(),
  ],
  mode: 'development',
  devtool: false,
  devServer: {
    host: 'localhost',
    port: 9001,
    open: false,
    hot: 'only',
    watchFiles: ['src/**/*.js'],
    compress: true,
    static: {
      directory: path.join(__dirname, 'dist4'),
    },
    historyApiFallback: true,
  },
};
