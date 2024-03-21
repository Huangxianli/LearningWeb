/* 
引用类型有时候也被称作对象定义
 */

/* 
Date类型将日期保存为自协调世界时（UTC）1970年1月1日0时至今所经过的毫秒数

new Date()
默认是当前时间
其他的时间要传入毫秒数
 */

function a1 () {
  let date1 = new Date();
  console.log("a1", date1); // Thu Mar 21 2024 11:25:54 GMT+0800 (中国标准时间)
}
a1();


/* 
Date.parse()
接受一个表示日期的字符串，尝试将这个日期转化为毫秒
“月/日/年”
“月名 日,年”
“周几 月名 日 年 时:分:秒 时区”

如果传递的并不是表示日期，解析后会返回NaN，在Date()里面，会直接返回当前的日期
 */

function a2 () {
  let date1 = new Date(Date.parse("May 23, 2024"));
  console.log("a2", date1); // Thu May 23 2024 00:00:00 GMT+0800 (中国标准时间)
}
a2();

/* 
Date.UTC()
返回日期的毫秒数
年, 0起点月（0-11）, 日（时（0-23）, 分, 秒）
 */

function a3 () {
  let date1 = new Date(Date.UTC(2024, 2, 21));
  console.log("a3", date1); // Thu Mar 21 2024 08:00:00 GMT+0800 (中国标准时间)
}
a3();


/* 
Date.now()
返回执行时的毫秒数
 */
function a4 () {
  let date1 = Date.now();
  setTimeout(() => {
    let date2 = Date.now();
    console.log("a4", date1); // 1710992680822
    console.log("a4", date2); // 1710992680926
    date1 = null;
  }, 100)
}
a4();