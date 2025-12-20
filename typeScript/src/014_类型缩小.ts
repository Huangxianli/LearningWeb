/* 
在很多的情况下，我们的一个变量可能会定义成非单一的数据类型（联合类型），我们在使用的时候，要判断这种使用方式限制在正确的类型下面
*/

function printAll(str: string | string[] | null) {
  // 可以在条件判断里面使用 typeof 进行类型缩小，但是这种类型只适用于 js 内置的类型
  if (typeof str === 'string') {
    // 这里就是一次类型缩小
    console.log(str);
  } else if (typeof str === 'object' && str !== null) {
    for (const s of str) {
      console.log(s);
    }
  } else {
    // 这里会自动的判定 str 为 null
    str;
  }
}
