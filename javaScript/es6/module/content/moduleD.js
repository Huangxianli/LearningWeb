/* 
CommonJS 输出的是一个值的拷贝，ES6的输出是值的引用（js引擎对脚本静态分析的时候，遇到import，生成一个只读引用，脚本真正执行的时候，根据这个引用，到被加载的那个模块里面去取值；导致import 的值会根据模块内的变动而变动（同步的  ））
CommonJS 运行时加载，ES6编译时输出
CommonJS 模块的require()是同步加载，import是异步加载，有一个独立的模块依赖解析的阶段
*/

// 加入在文件a，和b中都import了D_A，在文件a中调用了changeD_A()，那么文件a，b中的D_A都被同步修改了
let D_A = 0;
function changeD_A () {
  D_A = 1
};

export { D_A, changeD_A };