/* 
Symbol() 是不支持使用 new操作符的
 */

let a = Symbol();
let b = Symbol("aa");
let c = Symbol("cc");
console.log(b === c); // false
console.log(b == c); // false
console.log(typeof c); // "symbol"

/* 
获取对象自己而非原型上的的symbol属性
Object.getOwnPropertySymbols(obj)
 */

let d = {
  [Symbol.toPrimitive]: () => false,
  [Symbol(123)]: false,
}
console.log(Object.getOwnPropertySymbols(d)); // [Symbol(Symbol.toPrimitive), Symbol(123)]