/* 
手写bind
1、bind返回一个新的函数，函数中的this为传入的this
2、传入指定的参数，参数会穿插到代用新函数传入的参数的前面
 */
function fun1 (name, age, sex) {
  this.name = name;
  this.age = age;
  this.sex = sex;
}
let obj = {
  name: "",
  age: "",
  sex: ""
}
const fun2 = fun1.bind(obj, "name1");
fun2(undefined, "age1", "sex");
console.log(obj); // {name: 'name1', age: undefined, sex: 'age1'}
fun2("age1", "age2", "age1");
console.log(obj); // {name: 'name1', age: 'age1', sex: 'age2'} // 即使传了全部的参数也是往后排的

console.log("-----------------------------------------------------");
const obj1 = {
  name: "",
  age: "",
  sex: ""
}
let fun3 = fun1.bind(obj1, "name");
fun3();
console.log(obj1); // {name: 'name', age: undefined, sex: undefined}
new fun3("12", "12", "12");
console.log(obj1); // {name: 'name', age: undefined, sex: undefined} 
// 可以看到，new操作符，即使传了参数，也不会改变obj里面的内容

fun1.prototype.test = "123";
let fun4 = fun1.bind(obj1);
let newObj = new fun4();
// fun4.prototype.test1 = "123";
console.log(newObj.test); // "123"
console.log(newObj.test1); // "123"


/* 
1、定义在Function.proptotype上
2、返回一个新的函数，在新函数中调用旧函数，但是这个旧函数在执行时this是应该是新传入的newThis fn.call(newThis,...arg)；fn如何获取到，在调用mybind的时候是fn.myBind()，那么myBind函数中的this就是fn
3、new调用的话，新函数里面的this应该不是再指向传入的newThis了，
4、
 */
Function.prototype.myBind = function (newThis, ...bindrg) {
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  let _self = this;
  let newFun = function (...newFunArg) {
    if (new.target) {
      // return _self.apply(this, [...bindrg, ...newFunArg]);
      return new _self(...bindrg, ...newFunArg)
    }
    return _self.apply(newThis, [...bindrg, ...newFunArg]);
  }
  return newFun
}