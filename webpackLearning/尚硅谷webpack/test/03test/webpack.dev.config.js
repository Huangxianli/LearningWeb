const { type } = require('os');
const path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/main.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 小于10kb的图片会被base64处理
          }
        },
        generator: {
          filename: 'imgs/[hash:8][ext][query]',
        }
      },
      {
        test: /\.(ttf|woff2?)$/,
        type: "asset/resource", // 音频资源也可以用这个来处理
        generator: {
          filename: "media/[hash:8][ext][query]",
        },
      },
    ],
  },
  plugins: [],
  mode: 'development'
}