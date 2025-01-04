/*
一个模块就是一个独立的文件
文件内部的所有变量，外部无法获取；如果要让外部能够读取模块内的变量，要export该变量
 */


// export const A = 12;
let A = 12;
export { A }; // 这两种写法是等价的，配合import { A } from ''; 并且在import的文件中A是不能直接修改的

export { A as A1 }; // import { A1 } from '';

// export规定是对外的接口，必须与模块内部变量建立一一对应关系
export { A as A2 };
export { A as A3 };
// export 1; // 这是不允许的 
let B = 12;
// export B; // 这是不允许的，没有通过变量，而是直接传递的12，是一个值
// export 可以可以对外输出的接口有 function class variables

// export出去的接口，可以获取到模块内部实时的值
let c = 1;
setTimeout(() => {
  c = 2;
}, 2000);
function setC () { // 如果在外部调用该方法，c的值最终也会在该模块反映出来，c的值在模块内外是同步的
  c = 3;
}
export { c, setC }; // 记住二次 export {} c的值在模块内外是同步的，和commonJs不同

// export default c; // 这种写法不会同步修改，可以理解为default才是接口，c只是将值赋值给了default
// export default A; // 一个模块里面只能有一个export default

// export default function foo () { }; // 可以接受
// export default let foo = 12; // 报错
// export default class foo { }; // 可以接受
// 可以粗暴的理解为 给 default 接口赋值，所以第二个是不正确的语法
// import anyVar from ''; || import { default as anyVar } from '';