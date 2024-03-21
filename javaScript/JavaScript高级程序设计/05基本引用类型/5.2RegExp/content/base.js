/* 
g：global 全局模式
i：ignoreCase 忽略大小写
m：multiline 多行模式，查找到第一行文末的时候还会继续查找
y：sticky 粘附模式，从lastIndex之后找
u：unicode 启用unicode匹配
s：dotAll 匹配任何字符（\n）
 */

function a1 () {
  let reg1 = /at/gi; // 不区分大小写的匹配 at
  let reg2 = /\[a\]/gi; // 不区分大小写的匹配 [a]
  // 要用反斜杠转义符号 ( [ { \ ^ $ | ) ] } ? * + . 
  let reg3 = new RegExp("\\[at\\]", "gi"); // 这里需要二次转义
  console.log("a1", reg1); // /at/gi
  console.log("a1", reg2); // /\[a\]/gi
  console.log("a1", reg3); // /\[at\]/gi
}
a1();

/* 
可以基于已有的正则表达式修改其 标记
 */
function a2 () {
  let reg1 = /at/g;
  let reg2 = new RegExp(reg1, "i");
  console.log("a2", reg1); // /at/g
  console.log("a2", reg2); // /at/i
}
a2();

/* 
global：布尔值，表示是否设置了 g 标记。
ignoreCase：布尔值，表示是否设置了 i 标记。
unicode：布尔值，表示是否设置了 u 标记。
sticky：布尔值，表示是否设置了 y 标记。
lastIndex：整数，表示在源字符串中下一次搜索的开始位置，始终从 0 开始。
multiline：布尔值，表示是否设置了 m 标记。
dotAll：布尔值，表示是否设置了 s 标记。
source：正则表达式的字面量字符串（不是传给构造函数的模式字符串），没有开头和结尾的
斜杠。
flags：正则表达式的标记字符串。始终以字面量而非传入构造函数的字符串模式形式返回（没
有前后斜杠）
 */

function a3 () {
  let reg1 = new RegExp("at", "i");
  console.log("a3", reg1.flags); // "i"
  console.log("a3", reg1.source); // "at"
  console.log("a3", reg1.lastIndex); // 0
}
a3();

/* 
exec()
配合捕获组使用，
匹配到了，返回包含第一个匹配信息的数组；没有则返回null
虽然返回的是数组，但是有两个属性 index（字符串中匹配的起始位置） input（要查找的字符串）
 */
function a4 () {
  let reg1 = new RegExp("at.", "g");
  let string1 = "halaatatatlalal";
  let matches1 = reg1.exec(string1);
  console.log("a4", matches1); // ['ata'] index: 4, input: 'halaatatatlalal', groups: undefined
  console.log("a4", matches1.index); // 4
  console.log("a4", matches1.input); // "halaatatatlalal"     
}
a4();
