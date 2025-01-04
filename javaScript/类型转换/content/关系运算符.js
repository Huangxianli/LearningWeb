/* 
< 
左操作符在右操作符之前转换
1. 强制转化为原始值 （symbol.toPrimitive("number") valueOf() toString()）
2. 如果都是字符串，比较Unicode码位
3. 否则转化为数字比较
    3.1. true为1 false为0
    3.2. null 为 0 
    3.3. undefined 为 NaN
    3.4. 字符串转换成数值
4. 如果有一个NaN 返回 false
5. 比较大小，BigInt可以和数值一起比较
 */

console.log("12" < "13"); // true
console.log(NaN < "12"); // false
console.log(true < 12); // true

/*
> 
 */

/* 
<=
 */

/* 
>=
 */