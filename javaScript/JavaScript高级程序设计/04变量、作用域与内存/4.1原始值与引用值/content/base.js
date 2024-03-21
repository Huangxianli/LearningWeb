/* 
原始值：按值访问
引用值：js不允许访问内存位置，因此不能直接操作对象所在的内存空间，操作对象，实际是操作对象的引用，按引用访问
 */

/* 
原始值不能有属性，但是添加的时候也不会报错
 */
function a1 () {
  let string1 = "1";
  string1.name = "lalala";
  console.log("a1", string1.age); // undefined 即使没有手动的为原始值提供age属性，也可以使用这种方式，不会报错
  console.log("a1", string1.name); // undefined 原始值不能有属性，即使手动添加也不会添加成功
}
a1();

/* 
函数中的参数都是 按值传递 的
与变量直接绑定的内存中存的就是“值”；原始类型绑定的该值就是变量原来的值，引用类型绑定的该值是一个指针值
 */
function a2 () {
  function b1 (info) {
    info.name = "lalala";
    info = new Object(); // 这里修改了指针值
    info.name = "jjj";
  }
  let info = {
    name: "ttt",
    age: 12
  };
  b1(info);
  console.log("a2", info); // { name: "lalala", age: 12}
}