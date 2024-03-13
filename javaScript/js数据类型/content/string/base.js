/**
 * String()
 */

let a = String("123");
console.log(a); // "123"

let b = new String("123");
console.log(b); // { 0: "1", 1: "2", 2: "3" }
console.log(typeof b); // "object"


/**
 * 访问字符串中的摸一个位置的字符
 * String.prototype.charAt(index)
 * string[index] // 这种方式是只读的
 */

let c = "012345";
let d = c.charAt(1);
console.log(d); // "1"

/* 
字符串的强制转换
1. 字符串类型按照原样返回
2. undefined 转化成 "undefined"，
3. null 转换成 "null"，
4. Number类型 会按照调用 toString(10) 返回
5. BigInt类型 会按照调用 toString(10) 返回
6. Symbol类型 会抛出TypeError的错误
7. 对象类型 会转化成原始类型（Symbol.toPrimitive("string")，toString()，valueOf()），然后转化成字符串


`` 模板字符串 会强制字符串的转换
String() 会强制转化，只是Symbol不会抛错，而是返回 "Symbol(description)"
+ 运算符 如果有一边为字符串，会将另一个操作符强制转化成字符
 */

console.log(String(null)); // "null"
console.log(String(0x12));  // "18"
console.log(String({ [Symbol.toPrimitive]: () => 12 })); // "12"
console.log(`${012}`); // "10", 0开头，调用toString(10)，会将转化前的数当成8进制
console.log(`${{ [Symbol.toPrimitive]: () => 12 }}`); // "12"