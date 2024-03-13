/**
 * Number表示浮点数
 * 在js中 Number 遵循 双精度634位二进制格式 IEE 754 ，64位存储
 * 1位符号 52位尾数 11为指数（-1022至1023）
 */


let a = new Number(12);
console.log(typeof a); // "object"

let b = Number(12); // 12
console.log(typeof b); // "number" 

/**
 * 强制转化为数字
 * 转化规则：
 * 1. Number，按照原样返回
 * 2. null转化为0
 * 3. undefined转化为NaN
 * 4. true转化为1，false转化为0
 * 5. 字符串，去除掉前后空格后，如果是正常的数值组成的字符串（包括Infinity，-Infinity），转化成对应的数字；只有 "" 和 " "时会转化成0;其他转化成NaN
 * 6. BigInt 和 Symbol 会直接报错，BigInt报错防止精度丢失
 * 7. 对象，转化成原始值（调用 Symbol.toPrimitive(number) valueOf() toString()），再按照前面的转化为数字（如果第一次转化之后还是对象，转化成NaN）
 * 
 * 一元+ 按照上面的规则执行
 * Number() 会按照上面的规则执行，但是BigInt转化为Number时不会报错，但是可能丢失精度
 */

console.log(Number(12.0)); // 12
console.log(Number(null)); // 0
console.log(Number(undefined)); // NaN
console.log(Number(true)); // 1
console.log(Number(" 12.1 ")); // 12.1
console.log(Number(" dfs")); // NaN
console.log(Number({ [Symbol.toPrimitive]: () => 12 })); // 12


/**
 * Number.parseFloat(string)
 * 只能识别十进制
 * 传入的参数会被强制的转化成 字符串（要注意强制转化规则）， 然后根据字符串来转化成数字
 * 如果 第一个非空白字符 不能转化成数字，返回NaN
 * 截取最长的有效数字
 * 
 * 和全局的parseFloat是一样的
 */

console.log(parseFloat == Number.parseFloat); // true
console.log(Number.parseFloat()); // NaN
console.log(Number.parseFloat("  12.22.33")); // 12.22
console.log(Number.parseFloat(" s12.12dsd")); // NaN
console.log(Number.parseFloat("12.sdsf")); // 12
// console.log(Number.parseFloat(Symbol("12"))); // TypeError
console.log(Number.parseFloat({ [Symbol.toPrimitive]: () => "12" })); // 12


/**
 * Number.parseInt(string, *radix)
 * 传入的参数会被强制的转化成 字符串（要注意强制转化规则），将string当成后面设置的进制数，然后转化成10进制的整数（一个数字一个数字的根据进制转化，如果没有一个转化成功的，返回NaN）
 * radix 可以是 [2, 36] 之间的数，0/undefined（string前面没有0x/0X（会被当成16进制）） 的时候，会被当成10；如果传了第二个参数，以第二个参数为准
 * 
 * 和全局的parseInt方法是一样的
 */

console.log(Number.parseInt === parseInt); // true
console.log(Number.parseInt()); // NaN
console.log(Number.parseInt("021,")); // 21
console.log(Number.parseInt("0xE")); // 14
console.log(Number.parseInt("12", 13)); // 15
console.log(Number.parseInt("31", 3)); // NaN

/**
 * Number.prototye.toString(*radix)
 * 根据传入的进制[2,36]之间，将数转化成对应进制的数字，再转化成字符串;
 * 只有this为数字的时候才掉Number的toString
 */

let c = 12;
console.log(c.toString(9)); // "13"

/**
 * Number.prototype.valueOf()
 * 返回指定Number对象的原始值的数字
 */

/**
 * Number.isFinite()
 * 检查给定值是否是一个有限的有效数字（非 Infinity -Infinity NaN），不会类型转化
 */

/**
 * Number.isNaN()
 * 判断是不是NaN，不会类型转化
 */