/**
 * boolean
 * 只有以下的值会转化成false
 * 0 -0 false NaN undefined null "" document.all 0n
 */

/**
 * 强制转化为数字
 * 转化规则：
 * 1. Number，按照原样返回
 * 2. null转化为0
 * 3. undefined转化为NaN
 * 4. true转化为1，false转化为0
 * 5. 字符串，去除掉前后空格后，如果是正常的数值组成的字符串（包括Infinity，-Infinity），转化成对应的数字；只有 "" 和 " "时会转化成0;其他转化成NaN
 * 6. BigInt 和 Symbol 会直接报错，BigInt报错防止精度丢失
 * 7. 对象，转化成原始值（调用 Symbol.toPrimitive("number") valueOf() toString()），再按照前面的转化为数字（如果第一次转化之后还是对象，转化成NaN）
 * 
 * 一元+ 按照上面的规则执行
 * Number() 会按照上面的规则执行，但是BigInt转化为Number时不会报错，但是可能丢失精度
 */

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
+ 运算符 如果有一边为字符串，会将另一个操作符强制转化成字符，这里转化成原始值的顺序 Symbol.toPrimitive("string")，valueOf()，toString()
 */