/* 
严格相等 === 
宽松相等 == 
同值相等 Object.is()
 */

/**
 * 严格相等 
 * 会按照 IEEE 754 标准对+0 -0 NaN 做特殊处理，但是不会进行类型转换
 * 浮点数会将 +0 === -0，NaN !== NaN 的结果为true
 * 注意：不会对 +Infinity 和-Infinity 做处理，Infinity严格相等于Infinity
 * 
 * 比较过程：
 * 1. 不同的两个类型，不相等（不会隐式类型转化提现在这里）
 * 2. 对象要指向同一个引用地址才相等
 * 3. 都为null或者都为undefined，相等
 * 4. 任何一个为NaN，不相等
 * 5. 剩余： 
 *    5.1 数字类型要有相同的值， -0 与 +0 相等（Infinity === Infinity Infinity !== -Infinity ）
 *    5.2 字符串相同顺序的相同字节，相等
 *    5.3 布尔值同时为true或者false
 */

console.log(undefined === undefined);
console.log(null === null);
console.log(true === true);
console.log(false === false);
console.log("foo" === "foo");
console.log(0 === 0);
console.log(+0 === -0);
console.log(+0 === 0);
console.log(0 === false); // false
console.log("" === false); // false
console.log("" === 0); // false
console.log("0" === 0); // false
console.log("17" === 17); // false
console.log([1, 2] === "1,2"); // false
console.log(new String("foo") === "foo"); // false
console.log(null === undefined); // false
console.log(null === false); // false
console.log(undefined === false); // false
console.log({} === {}); // false
console.log(0 === null); // false
console.log(0 === NaN); // false
console.log("foo" === NaN); // false
console.log(NaN === NaN); // false
console.log(12.0 === 12); // 这个要注意，会返回true的


/**
 * 宽松相等 == 
 * 宽松相等会尝试进行类型转换，并按照IEEE 754 标准对NaN -0 +0 进行特殊的处理 
 * 比较的过程：
 * 1. 如果是同一种类型的时候：
 *     1.1. 数字类型的时候 相同值 -0 +0 会判断为相等 NaN 与 NaN 不相等
 * 2. 如果有一边为undefined 或者 null 另一边要为其中一个才会为true
 * 3. 如果一个为对象，一个原始值，对象会转化成原始值（String、Number、Boolean、Symbol、BigInt） （Symbol.toPrimitive: (hint)=> {return ...}）
 * 4. 对象转化成原始值之后： 
 *     4.1. 两者之间相同类型，按照1来
 *     4.2. 只有一方为Symbol的时候 false
 *     4.3. 只有一方为Boolean时，转化为Number，再宽松比较
 *     4.4. 一方为Number，一方为String的话，转化为Number再宽松比较
 */

console.log(undefined == undefined);
console.log(null == null);
console.log(true == true);
console.log(false == false);
console.log("foo" == "foo");
console.log(0 == 0);
console.log(+0 == -0);
console.log(+0 == 0);
console.log(0 == false); // 布尔值转化为数字 false -> 0 true
console.log("" == false); // 布尔值转化为数字 "" == 0， 字符串转化为数字 0 == 0 true
console.log("" == 0); // 字符串转化为数字 0 == 0 true
console.log("0" == 0); // 字符串转化为数字 true
console.log("17" == 17); // 字符串转化为数字 true
console.log([1, 2] == "1,2"); // [1,2] 转化成原始类型 "1,2", true
console.log(new String("foo") == "foo"); // true
console.log(null == undefined); // true
console.log(null == false); // false
console.log(undefined == false); // false
console.log({} == {}); // false
console.log(0 == null); // false
console.log(0 == NaN); // false
console.log("foo" == NaN); // false
console.log(NaN == NaN); // false
console.log(12.0 == 12); // 这个要注意，会返回true的



/**
 * 同值相等 Object.is()
 * 不会特殊处理 +0 -0 NaN 其他的和严格相等是一样的
 * Object.is(-0,+0) // false
 * OObject.is(NaN, NaN) // true
 */

console.log(Object.is(undefined, undefined));
console.log(Object.is(null, null));
console.log(Object.is(true, true));
console.log(Object.is(false, false));
console.log(Object.is("foo", "foo"));
console.log(Object.is(0, 0));
console.log(Object.is(+0, -0)); // false 同值相等不会对+0和-0做处理
console.log(Object.is(+0, 0));
console.log(Object.is(0, false)); // false
console.log(Object.is("", false)); // false
console.log(Object.is("", 0)); // false
console.log(Object.is("0", 0)); // false
console.log(Object.is("17", 17)); // false
console.log(Object.is([1, 2], "1,2")); // false
console.log(Object.is(new String("foo"), "foo")); // false
console.log(Object.is(null, undefined)); // false
console.log(Object.is(null, false)); // false
console.log(Object.is(undefined, false)); // false
console.log(Object.is({}, {})); // false
console.log(Object.is(0, null)); // false
console.log(Object.is(0, NaN)); // false
console.log(Object.is("foo" == NaN)); // false
console.log(Object.is(NaN, NaN)); // 这里要注意，同值相等中认为NaN与NaN是相等的 true
console.log(Object.is(12.0, 12)); // 这个要注意，会返回true的


/**
 * 零值相等
 * 零值相等要自己实现，
 * 与严格相等的区别是，它将NaN视为相等的
 * 与同值相等比较，它将+0和-0视为相等的
 * 主要用于 arr.includes() Map Set 方法来比较键的相等性
 */

function sameValueZero (x, y) {
  if (typeof x === "number" && typeof y === "number") {
    // x 和 y 相等（可能是 -0 和 0）或它们都是 NaN
    return x === y || (x !== x && y !== y);
  }
  return x === y;
}