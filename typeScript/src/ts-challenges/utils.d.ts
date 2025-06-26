type ObjectType<T> = {
  [K in keyof T]: T[K] extends object ? ObjectType<T[K]> : T[K];
  // [K in keyof T]: T[K]; 使用这个写法，循环引用类型有问题
};
