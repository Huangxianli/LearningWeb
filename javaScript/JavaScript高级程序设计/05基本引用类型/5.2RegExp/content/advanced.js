/* 
只有使用了g（全局） y（从lastIndex后查找） 才会修改 正则表达式的lastIndex的值
每次匹配都是从lastIndex开始查找的（即使换了字符串）
 */


/* 
exec()
指定一个字符串执行一个模糊匹配
返回一个数组（带 input 和 index（本次字符串匹配的开始位置） 属性 groups 命名捕获组对象{名称: 捕获组} indices：只有标记了d标志位才会有[]） or null
会修改regExp的lastIndex值
regExp 加 g 不加g，数组中都会返回捕获组匹配到的
*/
function a1 () {
  console.log("-------------------------------------------------------------------");
  let string1 = "abc abc abcd";
  let reg1 = /abc/g;
  let reg3 = /abc/y;
  let reg5 = /abc/;
  let exec1 = reg1.exec(string1);
  console.log("a1", exec1); // ["abc"] index: 0
  console.log("a1", reg1.lastIndex); // 3 正则表达式的lastIndex属性，表示的是下一次匹配开始的位置
  let exec2 = reg1.exec(string1);
  console.log("a1", exec2); // ["abc"] index: 4
  let exec3 = reg3.exec(string1);
  console.log("a1", exec3);
  console.log("a1", reg3.lastIndex); // 3
  let exec4 = reg3.exec(string1);
  console.log("a1", exec4); // null 这里好奇怪
  let exec5 = reg5.exec(string1);
  console.log("a1", exec5); // ["abc"] index: 0
  console.log("a1", reg5.lastIndex); // 0
  let exec6 = reg5.exec(string1);
  console.log("a1", exec6); // ["abc"] index: 0
  console.log("a1", reg5.lastIndex); // 0 只有使用了g y 才会修改 正则表达式的lastIndex的值
  let string7 = "My name is Hahaha";
  let reg7 = /My (name) (is) (Hahaha)/g;
  let exec7 = reg7.exec(string7);
  console.log("a1", exec7); // ['My name is Hahaha', 'name', 'is', 'Hahaha'] index: 0
}
a1();


/* 
test()
执行一个检索，查看正则表达式指定的字符串是否匹配
返回true false
会修改regExp的lastIndex值（要使用 g y）
 */
function a2 () {
  console.log("-------------------------------------------------------------------");
  let reg1 = /atr/g;
  let string1 = "atrdsatr";
  let test1 = reg1.test(string1);
  console.log("a2", test1); // true
  console.log("a2", reg1.lastIndex); // 3
  let test2 = reg1.test(string1);
  console.log("a2", test2); //true
  console.log("a2", reg1.lastIndex); // 8

}
a2();


/* 
match()
检索字符串与正则表达式的匹配结果
Strig.prototype.mathch(regExp);
返回一个数组
只有不加 g， 数组中才会返回捕获组匹配到的字符
 */
function a3 () {
  console.log("-------------------------------------------------------------------");
  let reg1 = /^a\w*/gm;
  let reg2 = /^a\w*/m;
  let string1 = `a12312
a23`;
  let match1 = string1.match(reg1);
  console.log("a3", match1); // ['a12312', 'a23']
  let match2 = string1.match(reg2);
  console.log("a3", match2); // ["a12312"] input: `a12312\na23` index: 0 group: undefined 这里的reg2没有加g，表示只会返回第一个完整匹配几期相关捕获组，加g的不会返回捕获组等信息

  let reg3 = /(?<name>hahah) is god/;
  let reg4 = /(?<name>hahah) is god/g;
  let string3 = "hahah is god !";
  let match3 = string3.match(reg3);
  let match4 = string3.match(reg4);
  console.log("a3", match3); // ['hahah is god', 'hahah'] group: {name: "hahah"} Index: 0
  console.log("a3", match4); // ['hahah is god'] 加了g之后就不会返回不捕获组的信息，包括数组里面也不会返回
}
a3();


/* 
matchAll()
在一个字符串中查找所有匹配，返回一个迭代器，即使没有匹配到也是返回一个迭代器
String.prototype.matchAll(regExp)
一定要加 g
lastIndex在字符串扫描后不会改变
 */
function a4 () {
  console.log("-------------------------------------------------------------------");
  let reg1 = /(?<name>hahaha|lalala) is god/g;
  let reg2 = /aaaa/g;
  let string1 = "hahaha is god and lalala is god";
  let matchAllTemp1 = [...string1.matchAll(reg1)];
  let matchAll1_1 = matchAllTemp1[0];
  console.log("a4", matchAll1_1); // ['hahaha is god', 'hahaha'] groups: {name: "hahaha"} index: 0
  let matchAll1_2 = matchAllTemp1[1];
  console.log("a4", matchAll1_2); // [lalala is god', 'lalala'] groups: {name: "lalala"} index: 18
  let matchAllTemp2 = [...string1.matchAll(reg2)];
  console.log("a4", matchAllTemp2) // []
}
a4();

/* 
search()
在字符串中执行正则的搜索，寻找匹配项，并返回首次匹配成功的索引 -1
 */
function a5 () {
  console.log("-------------------------------------------------------------------");
  let reg1 = /hahah/;
  let string1 = "what is your name ? hahah ";
  let search1 = string1.search(reg1);
  console.log("a5", search1); // 20
}
a5();

/* 
replace(string|regExp, string)
String.prototype.replace() 
在字符串中查找，并用后面的内容去替换
 */
function a6 () {
  console.log("-------------------------------------------------------------------");
  let reg1 = /aaa/g;
  let string1 = "aaa bbb ccc aaa";
  let replace1_1 = string1.replace(reg1, "lll");
  console.log("a6", replace1_1); // "lll bbb ccc lll"
  let replace1_2 = string1.replace("aaa", "111");
  console.log("a6", replace1_2); // "111 bbb ccc aaa" 只弄了一个
}
a6();


/* 
^ 
匹配输入的开始，如果多行标志被设置为true，那么也匹配换行符紧跟的位置
如果作为 第一个字符 出现在 一个 字符合集 模式的时候，有不同的含义 （反向字符集）
 */

function b1 () {
  console.log("-------------------------------------------------------------------");
  let string1 = `
ahuu ass
asss`;
  let string3 = `huu ass
asss`;
  let reg1 = /^a/mg;
  let reg2 = /^a/g;
  let reg3 = /^a/mg;
  let exec1 = reg1.exec(string1);
  let exec2 = reg2.exec(string1);
  let exec3 = reg3.exec(string3);
  let match1 = string1.match(reg1);
  let match2 = string1.match(reg2);
  console.log("b1", exec1); // ["a"] index: 1 input: "ahuu ass\nasss"
  console.log("b1", exec2); // null // 这里没有加 m
  console.log("b1", exec3); // ["a"] index: 8 input: "huu ass\nasss" // 这里加了 m 会匹配换行符紧跟的位置
  console.log("b1", match1); // ["a", "a"] // 这里加了m 会将换行当成边界值
  console.log("b1", match2); // null // 这里没加m 不会将换行当成边界值，所以匹配不到 ahuu 和 asss 中的 a
}
b1();

