/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/notMain.js":
/*!************************!*\
  !*** ./src/notMain.js ***!
  \************************/
/***/ (() => {

console.log('notMain.js');

/***/ }),

/***/ "./webpack.config1.js":
/*!****************************!*\
  !*** ./webpack.config1.js ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var __dirname = "/";
const path = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'path'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
module.exports = {
  entry: './src/notMain.js', // 打包开始的入口，输出的文件默认的就是 main.js 和入口文件的文件名成没有关系
  // entry: ['./src/main.js', './src/main1.js'], // 如果没有设置出口，那么最后打包的文件会合并成一个
  // entry: { // 使用对象的方式进行打包定打包入口，打包后的文件有，打包后的文件以 key 命名
  //   main: './src/main.js',
  //   main1: './src/main1.js',
  // },
  output: {
    clean: true,
    path: path.resolve(__dirname, 'dist1/js'),
    name: '[name].js',
  },
  mode: 'development',
  devtool: false,
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	__webpack_require__("./src/notMain.js");
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./webpack.config1.js");
/******/ 	
/******/ })()
;