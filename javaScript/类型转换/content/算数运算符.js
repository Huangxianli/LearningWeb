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

/*
- 减运算符 会将非数字强制转化为数字，和+操作符是一样的 
 */

/* 
/ 除操作符 被除数 / 除数 也会强制转化成数字
 */

console.log(2 / 1); // 2
console.log(2 / 0); // Infinity
console.log(0 / 0); // NaN
console.log(Infinity / Infinity); // NaN
console.log(0 / 12); // 0


/*
* 乘法操作符 计算两个操作数的乘积 会强制转化成数字 
 */
console.log(Infinity * 0); // NaN
console.log(Infinity * Infinity); // Infinity
console.log(2 * ""); // 0;
console.log(2 * "sda"); // NaN


/* 
% 取模运算符 符号总是和被除数的符号保持一致（左边）
 */
console.log(13 % 0); // NaN
console.log(-13 % { valueOf: () => 1 }); // -0
console.log(0 % 12); // 0

/* 
** 幂运算符
 */
console.log(NaN ** 0); // 1
console.log(Infinity ** 0); // 1