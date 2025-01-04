/* 
&& 逻辑与 使用强制类型转换，中间运算的时候会转化为Boolean值判断（只是作为中间值比较），不会将最终的值转化为Boolean值
短路操作符
左边为假值的时候，立即终止，返回左边的值
左边为真值的时候，返回右边的值
 */

console.log(true && ""); // ""
console.log(true && NaN); // NaN
console.log(NaN && "name"); // NaN
console.log("1" && "2"); // "2"

console.log(0n && "2"); // 0n
console.log(document.all && "12"); // 返回的是document.all里面的内容，虽然是一个数组，但是强制转化的时候，会把documnet.all转化成false


/* 
|| 逻辑或 强制类型转换
短路操作符
左边为真值时，立即终止，返回左边的值
左边为假值时，返回右边的值
 */

console.log(true || false); // true
console.log(false || "name"); // "name"
console.log("1" || "2"); // "1"

/* 
|| 和 ??（空值合并运算符）的区别
?? 只有在前面为 null undefined 的时候才会返回后面的值
|| 在前面为 假值 的时候就会返回后面的值
 */

console.log(null ?? 12); // 12
console.log(NaN ?? 21); // NaN
console.log(NaN || 21); // 21