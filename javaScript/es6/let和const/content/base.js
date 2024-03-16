/* 
let 和 const 声明的变量，在声明之前使用会报错
 */
/* 
a;
let a = 10;
 */

/* 
在for循环中，声明循环体的部分是一个父作用域，循环体内是一个单独的子作用域
 */
/* 
for (let i = 0; i < 3; i++) {
  let i = "abc";
  console.log(i)
}
// 这会打印三次“abc”，不会报错，说明声明部分和循环体部分是两个作用域
 */



/* 
for循环声明区let和var的不同
声明区是父作用域，循环体是子作用域
使用var在声明区声明变量i，相当于声明了一个全局变量i，循环体中的函数的i在查找的时候，会向外找，最终在全局作用域中找到了，最终的值都是10；
使用let在声明区声明变量i，其实循环体循环了多少次，就相当于声明了多少次，每一次都互不干扰，执行函数的时候，会向外找，找到的都是每次声明的i，每次找到的都是之前记录下来的值
 */
/* 
let arr = [];
for (var i = 0; i < 10; i++) {
  arr[i] = function () {
    console.log(i);
  }
}
arr[1]();
arr[2]();
// 10
// 10

let arr1 = [];
for (let i = 0; i < 10; i++) {
  arr1[i] = function () {
    console.log(i);
  }
}

arr1[1]();
arr1[2]();
// 1
// 2
 */


/* 
不存才变量提升
暂时性死区
typeof 也不再是一个绝对安全的操作符

在同一作用域内，不允许重复声明
 */

/* 
// typeof a; // 这里会报错ReferenceError，因为没有变量提升，在变量声名前使用对象会报错
let a;

function temp(a) {
  let a; // 这里就会报错，函数的参数已经被命名为a了
  let b;
  let b; // 这里会报错
}
 */



/* 
块级作用域 
let 和 const 出现前，基本上定义了只有全局作用域和函数作用域 
let 和 const 提供了块级作用域 以 {} 界定

函数只能在定制作用域中声明，不能在块级作用域中声明（但是为了兼容以前旧代码，浏览器还是支持在块级作用域中声明函数）
同时允许有自己的行为
1. 允许在块级作用域中生声明函数
2. 会有和var一样的作用，提升到当前函数作用域或全局作用域的顶端
3. 提升到当前块级作用域的顶端
 */

function f () { console.log('I am outside!'); }
(function () {
  if (false) {
    function f () { console.log('I am inside!'); }
  }
  f(); // 这里在es5中可以顺利运行，但是在es6中会报错
}());

// 上面的代码在es6中的替代
function f () { console.log('I am outside!'); }
(function () {
  let f = undefined; // 主要差异在这里，也是执行f()报错的原因，因为这里f的值是undefined
  if (false) {
    function f () { console.log('I am inside!'); }
  }
  f();
}());

// 如果要在块级作用域中声明函数，最好使用函数表达式，这样不会有变量提升
function f () { console.log('I am outside!'); }
(function () {
  if (false) {
    let f = function () { console.log('I am inside!'); }
  }
  f(); // 这里无论是es5还是es6环境都不会报错，但是输出的是，'I am outside!'
}());

/* 
const 的表现和let差不多，只不过，不能修付的值 （声明的时候就要付值，不然会报错）
如果是对象的话，要不让修改里面 属性的值，可以使用 Object.freeze()
 */


/* 
顶级对象
浏览器中 window
node中 global
在es5中在全局作用域中，使用var声明，会将属性添加到window上，es6中就不会在window上，
 */
