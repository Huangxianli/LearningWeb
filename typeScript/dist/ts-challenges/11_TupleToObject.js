// 为什么要加 readonly ？
let a = [1, 2, 3];
let b = [1, 2, 3];
// a = b; // readonly any[] 赋值给 any[] 会报错
b = a; // any[] 可以赋值给 readonly any[]
const a2 = [1];
export default {};
