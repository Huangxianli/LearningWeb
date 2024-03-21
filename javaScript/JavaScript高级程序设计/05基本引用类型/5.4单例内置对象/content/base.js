/* 
Global
url的 编码 和 解码
encodeURI() decodeURI() 不会编码属于URL组件的特殊符号（不会对元字符和语义字符进行转码）（; , / ? : @ & =+ $ #）（a-z A-Z 0-9 - _ . ! ~ * ' ( )）
encodeURIComponent() decodeURIComponent() 除了语义字符的其他字符都会转码，一般用来处理?后面的内容
 */

function a1 () {
  let url1 = "http://www.wrox.com/illegal value.js#start1_$（_(";
  let encodeUrl1 = encodeURI(url1);
  let encodeUrlComponent1 = encodeURIComponent(url1);
  console.log("a1", encodeUrl1); // http://www.wrox.com/illegal%20value.js#start1_$%EF%BC%88_(
  console.log("a1", encodeUrlComponent1); // http%3A%2F%2Fwww.wrox.com%2Fillegal%20value.js%23start1_%24%EF%BC%88_(
  let decodeUrl1 = decodeURI(encodeUrl1);
  let decodeUrlComponent1 = decodeURIComponent(encodeUrlComponent1);
  console.log("a1", decodeUrl1); // http://www.wrox.com/illegal value.js#start1_$（_(
  console.log("a1", decodeUrlComponent1); // http://www.wrox.com/illegal value.js#start1_$（_(
}
a1();

/* 
eval()
相当于整个es解释器
 */

function a2 () {
  let a = `function b () {
    console.log('b执行了');
  }`
  eval(a); // 上下文就是eval所在的位置的上下文，作用域链和该上下文有相同的作用域
  b(); // b执行了
}
a2();

function a3 () {
  "use strict"
  let a = `function b () {
    console.log('b执行了');
  }`
  eval(a);
  // b(); // 报错 在严格模式下，eval中声明的函数和变量在外面无法访问
}
a3();


/* 
Global对象属性
undefined NaN Infinity 等特殊值都是 Globol的属性
所有引用类型构造函数都是 Object Function Boolean

undefined 特殊值 undefined
NaN 特殊值 NaN
Infinity 特殊值 Infinity
Object Object 的构造函数
Array Array 的构造函数
Function Function 的构造函数
Boolean Boolean 的构造函数
String String 的构造函数
Number Number 的构造函数
Date Date 的构造函数
RegExp RegExp 的构造函数
Symbol Symbol 的伪构造函数
Error Error 的构造函数
EvalError EvalError 的构造函数
RangeError RangeError 的构造函数
ReferenceError ReferenceError 的构造函数
SyntaxError SyntaxError 的构造函数
TypeError TypeError 的构造函数
URIError URIError 的构造函
 */

/* 
window 对象
不可以直接访问Global，使用window对象为Global的代理对象
 */
function a4 () {
  let global = (function () {
    return this;
  })();
  // 这种方式也可以获得global
  console.log(global.encodeURI); // ƒ encodeURI() { [native code] }
}
a4();

/* 
Math
保存数学公式、信息和计算的地方
这上面提供的方法比js自己的实现要快很多
 */

function b1 () {
  let max1 = Math.max(12, 2, 32);
  let min1 = Math.min(12, 2, 32);
  console.log("b1", max1); // 32
  console.log("b1", min1); // 2
}
b1();

// 舍入方法
function b2 () {
  let number1 = 1234.12;
  let number2 = -1234.12;
  let number3 = -1234.55;
  let ceil1 = Math.ceil(number1); // 向上舍入为最接近的整数，让数变更大
  let ceil2 = Math.ceil(number2);
  let floor1 = Math.floor(number1); // 向下舍入为最接近的整数，让数变更小
  let floor2 = Math.floor(number2);
  let round1 = Math.round(number1); // 四舍五入
  let round2 = Math.round(number2);
  let round3 = Math.round(number3);
  let fround1 = Math.fround(0.1); // 返回最接近但单精度的32位浮点数

  console.log("b2", ceil1); // 1235
  console.log("b2", ceil2); // -1234
  console.log("b2", floor1); // 1234
  console.log("b2", floor2); // -1235
  console.log("b2", round1); //  1234
  console.log("b2", round2); // -1234
  console.log("b2", round3); // -1235
  console.log("b2", fround1); // 0.10000000149011612
}
b2();

function b3 () {
  let random1 = Math.random(); // 生成一个 [0,1)的随机数
  console.log("b3", random1); // 0.18534718995447497
  // Math.random() * (最大 - 最小) + 最小 // [最小, 最大)
  // Math.floor( Math.random() * (最大 - 最小 + 1) + 最小 )  // [最小, 最大] 整数
}
b3();

/* 
Math.abs(x) 返回 x 的绝对值
Math.exp(x) 返回 Math.E 的 x 次幂
Math.expm1(x) 等于 Math.exp(x) - 1
Math.log(x) 返回 x 的自然对数
Math.log1p(x) 等于 1 + Math.log(x)
Math.pow(x, power) 返回 x 的 power 次幂
Math.hypot(...nums) 返回 nums 中每个数平方和的平方根
Math.clz32(x) 返回 32 位整数 x 的前置零的数量
Math.sign(x) 返回表示 x 符号的 1、0、-0 或-1
Math.trunc(x) 返回 x 的整数部分，删除所有小数
Math.sqrt(x) 返回 x 的平方根
Math.cbrt(x) 返回 x 的立方根
Math.acos(x) 返回 x 的反余弦
Math.acosh(x) 返回 x 的反双曲余弦
Math.asin(x) 返回 x 的反正弦
Math.asinh(x) 返回 x 的反双曲正弦
Math.atan(x) 返回 x 的反正切
Math.atanh(x) 返回 x 的反双曲正切
Math.atan2(y, x) 返回 y/x 的反正切
Math.cos(x) 返回 x 的余弦
Math.sin(x) 返回 x 的正弦
Math.tan(x) 返回 x 的正切
 */