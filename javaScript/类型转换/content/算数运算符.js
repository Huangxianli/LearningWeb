/* 
 + 加法操作符（和一元操作符 + 不同）
 计算数字操作 或 字符串连接的总和
 
 转化过程
 1. 两边都先转化成原始值（按照这个顺序Symbol.toPrimitive(default) valueOf() toString()）
 2. 一边为字符串，另一边强制转化成字符串
 3. 一边BigInt一边不是，抛出TypeError
 4. 转化成数字

 不推荐使用 "" + A 强制转化成字符串
 */

console.log("12" + true); // "12true"
console.log("12" + undefined); // "12undefined"
console.log(12 + true); // 13
console.log(12 + undefined); // NaN
