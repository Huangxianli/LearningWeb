/* babel-polyfill */
// babel 默认只能转换新的语法（例如箭头函数），不能转换新的 API（例如 Iterator ... Array.prototype.find）
module.exports = {
  entry: {
    main: './src/js/main.js',
  },
};
