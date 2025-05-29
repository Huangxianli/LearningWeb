"use strict";
/*
bigInt 是非常大的整数 的数据类型，BigInt 是在 es2020 后才有的，如果要使用的话，要将 tsconfig.json 文件中将 target 改为 es2020 及以上
 */
let bigInt1 = BigInt(100);
// bigInt1 = 123;
bigInt1 = 123n;
const symbol1 = Symbol('name');
