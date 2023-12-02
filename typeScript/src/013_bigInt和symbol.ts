/*
bigInt 是非常大的整数 的数据类型，BigInt是在是es2020后才有的，如果要使用的话，要将tsconfig.json文件中将 target 改为 es2020及以上
 */

let bigInt1: bigint = BigInt(100);
// bigInt1 = 123;
bigInt1 = 123n;


const symbol1: symbol = Symbol("name");