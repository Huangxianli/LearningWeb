/**
 * Boolean()
 * 0 -0 false NaN undefined null "" 
 */


/**
 * 使用 new Boolean() 的时候，获取到值都是一个对象（包装对象）
 * 要获取包装对象的原始值的时候，用valueOf() 别用Boolean()
 * 使用Boolean() 强制类型转化，并不是获取其原始值再转化
 */

let a = Boolean([]);
console.log(a);
console.log(a.valueOf());

let b = new Boolean([]);
console.log(b);
console.log(Boolean(b)); // true
console.log(b.toString()); // "true" （字符串）
console.log(b.valueOf()); // true

let c = new Boolean(false);
console.log(Boolean(c)); // true  这里是应为c是一个对象，会转化成true
console.log(c.toString()); // "false"
console.log(c.valueOf()); // false


let d = false;
console.log(d.toString()); // "false"


/**
 * Boolean.prototype.toString()
 * 返回 "true" or "false" 字符串
 * 该方法覆盖了Object的toString方法
 */

let e = new Boolean(1);
console.log(e.toString()); // "true"

let f = false;
console.log(f.toString()); // "false"

/**
 * Boolean.prototype.valueOf()
 * 返回 true or false， 返回Boolean对象的原始值
 */

let g = new Boolean(false);
console.log(g.valueOf()); // false
let h = false;
console.log(h.valueOf()); // false
