/*
1、可能的情况下，使用类型参数本身，而不是对其进行约束
2、总是尽可能少的使用类型参数
3、如果一个类型的参数只出现在一个地方，请考虑是否真的需要
 */

// 1、使用类型参数本身，而不是对其进行约束
function firstElement2<T>(arr: T[]) {
  // 这种写法更好，会自动的推断出函数返回的类型是 T 
  return arr[0];
}

function firstElement3<T extends any[]>(arr: T) {
  // 这里会推断出返回的类型是 any 
  return arr[0];
}

// 2、尽可能的少使用类型参数
function filter1<T>(arr: T[], fun: (arg: T) => boolean) {
  // 这种写法更好，更少的类型参数可以更好的将各种联系起来，代码更加容易阅读
  return arr.filter(fun);
}
function filter2<T, F extends (arg: T) => boolean>(arr: T[], fun: F) {
  return arr.filter(fun);
}

// 3、如果一个类型参数只出现在一个地方，考虑是否需要
function greet1(str: string) {
  // 这种写法是更好的，泛型是为了关联不同的变量之间的关系
  console.log(str);
}
function greet2<S extends string>(str: S) {
  console.log(str);
}