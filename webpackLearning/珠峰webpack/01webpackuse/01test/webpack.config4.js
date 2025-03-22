/* devServer */
// 注意要下载 webpack-dev-server，里面已经内置了 express

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // ​主要用于自动生成 HTML 文件并动态注入 Webpack 打包后的静态资源（JS/CSS）​

module.exports = {
  entry: {
    mainKey: './src/main.js',
    mainKey1: './src/main1.js',
  },
  output: {
    clean: true,
    path: path.resolve(__dirname, 'dist4/js'),
    filename: '[name].js', // entry 是字符串或者数组形式的时候，name 都默认是 main，和文件的命名和个数没有关系；如果是对象的时候，name 默认是 key，和文件的名称没有关系
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // 以哪个文件为模板
      filename: 'index.html', // 注意，如果使用了 webpack-dev-server 这里的路径就不能 ./ ../ 这种
      title: '测试',
    }),
  ],
  mode: 'development',
  devtool: false,
  devServer: {
    // 注意在开发环境使用这个，不会有实际的产物输出，都是放在运行内存中
    host: 'localhost',
    port: 9000,
    open: false,
    hot: 'only', // 热模块替换功能：在运行时更新模块、不需要完全刷新页面、保持应用状态
    // false 修改文件会自动刷新浏览器
    // 'only' 不会触发浏览器的刷新
    // true 如果支持的 HMR 的文件被修改了不触发浏览器页面刷新，如果不支持 HRM 的文件的被修改了，触发浏览器的刷新
    watchFiles: ['src/**/*.js'], // 监听文件的变化，如果里面的文件变化了，重新编译
    compress: true, // 启用 gzip 压缩，注意要超过特定的大小才会启动 gzip 压缩
    static: {
      directory: path.join(__dirname, 'dist4'), // 添加静态资源目录配置
    },
    historyApiFallback: true, // 在访问网页的时候，不管访问哪个路径，都会重定向到 index.html 中，然后由应用本身的前端路由来处理
    proxy: [
      // 服务代理
      {
        context: ['/api'],
        target: 'http://localhost:3000',
        // pathRewrite: { '^/api': 'api/users' },
        changeOrigin: true,
      },
    ],
    // setupMiddlewares(middlewares, { app }) {
    //   // 可以实现 mock 功能
    //   app.get('/api/users', (req, res) => {
    //     res.json([
    //       {
    //         id: 1,
    //         name: 1,
    //       },
    //     ]);
    //   });
    //   return middlewares;
    // },
  },
};
